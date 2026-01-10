import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { findRelevantSections, getAllKnowledge } from '@/lib/knowledge-base';
import {
  detectRelevantContent,
  getProductRecommendations,
  formatAsCards,
  products,
  solutions,
  articles,
  type ProductCard,
  type SolutionCard,
  type ArticleCard
} from '@/lib/chat-content-catalog';

// Lazy initialize OpenAI client to avoid build-time errors
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Chatwoot webhook types
interface ChatwootWebhook {
  event: string;
  id: number;
  content: string;
  content_type: string;
  content_attributes: Record<string, unknown>;
  message_type: 'incoming' | 'outgoing' | 'activity' | 'template';
  created_at: string;
  private: boolean;
  source_id: string | null;
  sender: {
    id: number;
    name: string;
    email: string | null;
    type?: string;  // Can be 'contact', 'Contact', 'user', 'agent_bot', 'AgentBot', or undefined
  };
  conversation: {
    id: number;
    account_id: number;
    inbox_id: number;
    status?: string;  // 'open', 'pending', 'resolved', etc.
  };
  account: {
    id: number;
    name: string;
  };
  current_conversation?: {
    messages: Array<{ id: number }>;
  };
  // For conversation_updated events
  meta?: {
    assignee?: {
      id: number;
      name: string;
      email: string;
      type?: string; // 'user' for human agents
    };
  };
  changed_attributes?: Array<{
    assignee_id?: { current_value: number | null; previous_value: number | null };
    status?: { current_value: string; previous_value: string };
  }>;
  // For conversation_assigned events
  assignee?: {
    id: number;
    name: string;
    email: string;
    type?: string;
  };
}

// Track conversations that have been handed off to humans
const handedOffConversations = new Set<number>();

// Track conversations where we've already notified about human agent joining
// Note: This tracking may be lost on serverless cold starts, but it's still useful for warm instances
const humanJoinNotified = new Set<number>();

// Quick reply options for conversation starters
const STARTER_OPTIONS = [
  { title: "Product Info", value: "Tell me about your greywater systems" },
  { title: "Pricing", value: "What are your prices?" },
  { title: "Installation Help", value: "How do I install a greywater system?" },
  { title: "Talk to Human", value: "I'd like to speak with a representative" }
];

// Quick reply options for follow-up
const FOLLOWUP_OPTIONS = [
  { title: "More Questions", value: "I have another question" },
  { title: "Get a Quote", value: "I'd like to get a quote" },
  { title: "Talk to Human", value: "I'd like to speak with a representative" }
];

// System prompt for the AI
const SYSTEM_PROMPT = `You are a helpful customer service assistant for Water Wise Group, a company specializing in greywater recycling systems. Your role is to:

1. Answer questions about our Aqua2use greywater systems and products
2. Help customers understand how greywater systems work
3. Provide information about installation, maintenance, and troubleshooting
4. Share details about pricing, shipping, and warranties
5. Explain greywater regulations and legal considerations

Guidelines:
- Be friendly, professional, and concise
- Keep responses under 3-4 sentences when possible - the system will automatically show relevant product cards and links
- If you don't know something specific, offer to connect them with our support team at (678) 809-3008 or sales@waterwisegroup.com
- For complex technical issues or order status inquiries, recommend they contact support directly
- Never make up product specifications or prices - use only the information provided
- If asked about topics unrelated to greywater or Water Wise Group, politely redirect to water conservation topics

IMPORTANT: After your response, add a line with content suggestions in this format:
[SUGGEST: product|solution|article:keyword]

Examples:
- If discussing the gravity system, add: [SUGGEST: product:gravity]
- If someone mentions RV or camper, add: [SUGGEST: solution:rv]
- If explaining what greywater is, add: [SUGGEST: article:what is]
- If discussing installation for homes, add: [SUGGEST: solution:home]
- If discussing pricing, add: [SUGGEST: product:affordable]

You can suggest multiple items: [SUGGEST: product:gravity, solution:home]

If no specific content is relevant, don't add the SUGGEST line.

Here is the knowledge base you should use to answer questions:

`;

async function generateResponse(userMessage: string): Promise<string> {
  // Find relevant sections from knowledge base
  const relevantSections = findRelevantSections(userMessage, 4);

  let context: string;
  if (relevantSections.length > 0) {
    context = relevantSections.map(s => `## ${s.title}\n${s.content}`).join('\n\n');
  } else {
    // If no specific match, provide general knowledge
    context = getAllKnowledge();
  }

  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT + context,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "I apologize, but I'm having trouble generating a response. Please contact our support team at (678) 809-3008 for assistance.";
}

async function sendChatwootMessage(
  accountId: number,
  conversationId: number,
  message: string,
  options?: {
    withStarterOptions?: boolean;
    withFollowupOptions?: boolean;
    handoff?: boolean;
  }
): Promise<void> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) {
    console.error('Chatwoot configuration missing');
    return;
  }

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

  // Build the message payload
  interface MessagePayload {
    content: string;
    message_type: string;
    private: boolean;
    content_type?: string;
    content_attributes?: {
      items: Array<{ title: string; value: string }>;
    };
  }

  const payload: MessagePayload = {
    content: message,
    message_type: 'outgoing',
    private: false,
  };

  // Add quick replies if requested
  if (options?.withStarterOptions) {
    payload.content_type = 'input_select';
    payload.content_attributes = {
      items: STARTER_OPTIONS
    };
  } else if (options?.withFollowupOptions) {
    payload.content_type = 'input_select';
    payload.content_attributes = {
      items: FOLLOWUP_OPTIONS
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_access_token': apiToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to send Chatwoot message:', errorText);
  }

  // If handoff requested, change conversation status to open for human agent
  if (options?.handoff) {
    await handoffToHuman(accountId, conversationId);
  }
}

// Send cards with images to Chatwoot
async function sendChatwootCards(
  accountId: number,
  conversationId: number,
  cards: Array<{
    title: string;
    description: string;
    media_url?: string;
    actions: Array<{ type: string; text: string; uri: string }>;
  }>
): Promise<void> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken || cards.length === 0) {
    return;
  }

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

  const payload = {
    content: 'Here are some helpful resources:',
    message_type: 'outgoing',
    private: false,
    content_type: 'cards',
    content_attributes: {
      items: cards
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_access_token': apiToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to send Chatwoot cards:', errorText);
  }
}

// Parse AI response for content suggestions
function parseContentSuggestions(response: string): {
  cleanResponse: string;
  suggestedProducts: ProductCard[];
  suggestedSolutions: SolutionCard[];
  suggestedArticles: ArticleCard[];
} {
  const suggestPattern = /\[SUGGEST:\s*([^\]]+)\]/gi;
  const matches = response.matchAll(suggestPattern);

  const suggestedProducts: ProductCard[] = [];
  const suggestedSolutions: SolutionCard[] = [];
  const suggestedArticles: ArticleCard[] = [];

  for (const match of matches) {
    const suggestions = match[1].split(',').map(s => s.trim());

    for (const suggestion of suggestions) {
      const [type, keyword] = suggestion.split(':').map(s => s.trim().toLowerCase());

      if (type === 'product' && keyword) {
        const product = products.find(p =>
          p.keywords.some(k => k.includes(keyword) || keyword.includes(k))
        );
        if (product && !suggestedProducts.find(p => p.id === product.id)) {
          suggestedProducts.push(product);
        }
      } else if (type === 'solution' && keyword) {
        const solution = solutions.find(s =>
          s.keywords.some(k => k.includes(keyword) || keyword.includes(k))
        );
        if (solution && !suggestedSolutions.find(s => s.id === solution.id)) {
          suggestedSolutions.push(solution);
        }
      } else if (type === 'article' && keyword) {
        const article = articles.find(a =>
          a.keywords.some(k => k.includes(keyword) || keyword.includes(k))
        );
        if (article && !suggestedArticles.find(a => a.id === article.id)) {
          suggestedArticles.push(article);
        }
      }
    }
  }

  // Remove the SUGGEST tags from the response
  const cleanResponse = response.replace(suggestPattern, '').trim();

  return {
    cleanResponse,
    suggestedProducts: suggestedProducts.slice(0, 2),
    suggestedSolutions: suggestedSolutions.slice(0, 1),
    suggestedArticles: suggestedArticles.slice(0, 1)
  };
}

async function handoffToHuman(
  accountId: number,
  conversationId: number
): Promise<void> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) return;

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/toggle_status`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_access_token': apiToken,
    },
    body: JSON.stringify({
      status: 'open'
    }),
  });
}

// Ask for contact info before handoff (using simple text message)
async function askForContactInfo(
  accountId: number,
  conversationId: number
): Promise<void> {
  const message = `I'd be happy to connect you with our team! To help them reach you, please share your name and email address.

For example: "John Smith, john@email.com"

You can also include your phone number if you'd like a call back.`;

  await sendChatwootMessage(accountId, conversationId, message);
}

// Update contact info in Chatwoot
async function updateContactInfo(
  accountId: number,
  contactId: number,
  name: string,
  email: string,
  phone?: string
): Promise<void> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) return;

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/contacts/${contactId}`;

  const payload: { name?: string; email?: string; phone_number?: string } = {};
  if (name) payload.name = name;
  if (email) payload.email = email;
  if (phone) payload.phone_number = phone;

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'api_access_token': apiToken,
    },
    body: JSON.stringify(payload),
  });
}

async function sendStarterOptions(
  accountId: number,
  conversationId: number
): Promise<void> {
  // Simple prompt with quick options - no lengthy welcome message
  const starterMessage = `How can I help you today?`;
  await sendChatwootMessage(accountId, conversationId, starterMessage, { withStarterOptions: true });
}

export async function POST(request: NextRequest) {
  try {
    const payload: ChatwootWebhook = await request.json();

    // Log webhook event for monitoring
    console.log(`[Chatwoot] ${payload.event} - Conversation: ${payload.conversation?.id}`);

    // Note: conversation_created fires when first message is sent, NOT when widget opens
    // Use Chatwoot Campaigns for proactive welcome messages instead
    if (payload.event === 'conversation_created') {
      console.log('Conversation created (first message sent)');
      // Don't send starter options here - they would appear after user's message
      // Welcome message should come from a Chatwoot Campaign
      return NextResponse.json({ status: 'conversation_created' });
    }

    // Handle conversation_assigned event - detect when a human agent is assigned
    if (payload.event === 'conversation_assigned') {
      const assignee = payload.assignee;

      // Only notify if assignee is a human user (not an agent_bot)
      // Human agents have email addresses and type 'user'
      if (assignee && assignee.name && assignee.email) {
        console.log(`[Chatwoot] Human agent assigned: ${assignee.name}`);

        // Mark this conversation as handed off
        handedOffConversations.add(payload.conversation.id);

        // Notify the customer that a human has joined
        const agentJoinedMessage = `Great news! ${assignee.name} from our team has joined the conversation and will be assisting you from here. Thank you for your patience!`;

        await sendChatwootMessage(
          payload.account.id,
          payload.conversation.id,
          agentJoinedMessage
        );

        return NextResponse.json({ status: 'agent_joined_notification_sent' });
      }

      return NextResponse.json({ status: 'conversation_assigned' });
    }

    // Handle conversation updated event
    if (payload.event === 'conversation_updated') {
      // Check if an agent was just assigned via meta.assignee
      const assignee = payload.meta?.assignee;

      // Only notify if assignee is a human user (has email = human agent)
      if (assignee && assignee.name && assignee.email) {
        console.log(`[Chatwoot] Human agent joined via update: ${assignee.name}`);

        // Mark this conversation as handed off
        handedOffConversations.add(payload.conversation.id);

        // Notify the customer that a human has joined
        const agentJoinedMessage = `Great news! ${assignee.name} from our team has joined the conversation and will be assisting you from here. Thank you for your patience!`;

        await sendChatwootMessage(
          payload.account.id,
          payload.conversation.id,
          agentJoinedMessage
        );

        return NextResponse.json({ status: 'agent_joined_notification_sent' });
      }

      return NextResponse.json({ status: 'conversation_updated' });
    }

    // Detect when a human agent sends their first message in a conversation
    // This is a more reliable way to notify the customer that help has arrived
    if (payload.event === 'message_created' &&
        payload.message_type === 'outgoing' &&
        payload.sender?.type === 'user') {

      const conversationId = payload.conversation.id;
      const agentName = payload.sender.name;

      // Only send notification once per conversation
      if (!humanJoinNotified.has(conversationId)) {
        humanJoinNotified.add(conversationId);
        handedOffConversations.add(conversationId);
        console.log(`[Chatwoot] Human agent ${agentName} joined conversation ${conversationId}`);

        // Send notification BEFORE the agent's message appears
        const agentJoinedMessage = `Great news! ${agentName} from our team has joined the conversation and will be assisting you from here.`;

        await sendChatwootMessage(
          payload.account.id,
          conversationId,
          agentJoinedMessage
        );
      }

      // Don't block the agent's actual message from being processed
      return NextResponse.json({ status: 'human_agent_message' });
    }

    // Only respond to incoming messages from contacts (not our own messages or agent messages)
    const senderType = payload.sender?.type;
    const isFromContact = senderType === 'contact' || senderType === 'Contact' ||
                          (!senderType && payload.message_type === 'incoming');
    const isAgentOrBot = senderType === 'user' || senderType === 'agent_bot' || senderType === 'AgentBot';

    if (
      payload.event !== 'message_created' ||
      payload.message_type !== 'incoming' ||
      isAgentOrBot ||
      !isFromContact
    ) {
      return NextResponse.json({ status: 'ignored' });
    }

    // Check if conversation is being handled by a human agent
    if (payload.conversation?.status === 'open' || handedOffConversations.has(payload.conversation.id)) {
      return NextResponse.json({ status: 'human_handling' });
    }

    // Check if message looks like contact info being provided (short message with email)
    // This is a stateless approach - we detect contact info regardless of conversation state
    // Strip HTML tags from content for processing
    const cleanContent = payload.content.replace(/<[^>]*>/g, '').trim();
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailMatch = cleanContent.match(emailRegex);
    const messageWords = cleanContent.split(/\s+/).length;

    // If message is short (under 20 words) and contains an email, treat as contact info submission
    if (emailMatch && messageWords < 20) {
      const email = emailMatch[0];
      const beforeEmail = cleanContent.substring(0, cleanContent.indexOf(email)).trim();
      // Extract name - remove common prefixes and clean up
      const name = beforeEmail
        .replace(/^(my name is|i'm|i am|name:|hi,?|hello,?|it's|its)\s*/i, '')
        .replace(/[,.\s]+$/, '')
        .trim() || 'Customer';

      // Try to extract phone number
      const phoneRegex = /[\d\s\-().]{10,}/;
      const phoneMatch = cleanContent.match(phoneRegex);
      const phone = phoneMatch ? phoneMatch[0].trim() : undefined;

      console.log(`[Chatwoot] Contact info detected - Name: ${name}, Email: ${email}`);

      // Update contact info in Chatwoot
      if (payload.sender?.id) {
        await updateContactInfo(
          payload.account.id,
          payload.sender.id,
          name,
          email,
          phone
        );
      }

      // Complete handoff
      const handoffMessage = `Thank you, ${name}! I'll connect you with a member of our team now. A customer service representative will be with you shortly.

In the meantime, you can also reach us at:
📞 (678) 809-3008
📧 sales@waterwisegroup.com

Thank you for your patience!`;

      await sendChatwootMessage(
        payload.account.id,
        payload.conversation.id,
        handoffMessage,
        { handoff: true }
      );

      return NextResponse.json({ status: 'handoff_with_contact' });
    }

    // Don't respond to empty messages
    if (!payload.content || payload.content.trim() === '') {
      return NextResponse.json({ status: 'ignored' });
    }

    console.log(`[Chatwoot] Message from ${payload.sender.name}: ${payload.content.substring(0, 50)}...`);

    // Check if user wants to talk to a human
    const humanRequestPatterns = [
      'talk to human',
      'speak to human',
      'human agent',
      'real person',
      'customer service',
      'representative',
      'talk to someone',
      'speak to someone',
      'live agent',
      'human please',
      'operator'
    ];

    const messageLC = payload.content.toLowerCase();
    const wantsHuman = humanRequestPatterns.some(pattern => messageLC.includes(pattern));

    if (wantsHuman) {
      // Ask for contact info before handoff
      await askForContactInfo(
        payload.account.id,
        payload.conversation.id
      );

      return NextResponse.json({ status: 'contact_info_requested' });
    }

    // Generate AI response
    const aiResponse = await generateResponse(payload.content);

    // Parse AI response for content suggestions
    const {
      cleanResponse,
      suggestedProducts,
      suggestedSolutions,
      suggestedArticles
    } = parseContentSuggestions(aiResponse);

    // Check if this is the first real message (after welcome) to add helpful follow-up
    const isFirstMessage = payload.current_conversation?.messages?.length === 1;

    // Send response back to Chatwoot
    await sendChatwootMessage(
      payload.account.id,
      payload.conversation.id,
      cleanResponse
    );

    // Build cards from AI suggestions
    const allSuggested = [
      ...suggestedProducts,
      ...suggestedSolutions,
      ...suggestedArticles
    ];

    // If AI didn't suggest anything, try automatic detection from user message
    let cardsToSend = formatAsCards(allSuggested);

    if (cardsToSend.length === 0) {
      // Fallback: detect relevant content from user's message
      const detected = detectRelevantContent(payload.content);
      const detectedItems = [
        ...detected.products,
        ...detected.solutions,
        ...detected.articles
      ];
      if (detectedItems.length > 0) {
        cardsToSend = formatAsCards(detectedItems.slice(0, 2));
      }
    }

    // Send cards if we have any (with slight delay for better UX)
    if (cardsToSend.length > 0) {
      setTimeout(async () => {
        await sendChatwootCards(
          payload.account.id,
          payload.conversation.id,
          cardsToSend
        );
      }, 800);
    }

    // After the first response, ask for contact info and show follow-up options
    if (isFirstMessage) {
      setTimeout(async () => {
        await sendChatwootMessage(
          payload.account.id,
          payload.conversation.id,
          "If you'd like us to follow up with more details, feel free to share your name and email. Otherwise, what else can I help you with?",
          { withFollowupOptions: true }
        );
      }, cardsToSend.length > 0 ? 2500 : 1500);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Chatwoot webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Water Wise Group Chatwoot Bot',
    timestamp: new Date().toISOString()
  });
}
