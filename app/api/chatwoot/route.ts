import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import crypto from 'crypto';
import { findRelevantSections, getAllKnowledge } from '@/lib/knowledge-base';
import {
  detectRelevantContent,
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

// Verify Chatwoot webhook signature
function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  const webhookSecret = process.env.CHATWOOT_WEBHOOK_SECRET;

  // If no secret configured, skip verification (dev mode) but log warning
  if (!webhookSecret) {
    console.warn('[Chatwoot] No webhook secret configured - skipping signature verification');
    return true;
  }

  if (!signature) {
    console.error('[Chatwoot] Missing webhook signature');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Chatwoot webhook types
interface ChatwootWebhook {
  event: string;
  id?: number;
  content?: string;
  content_type?: string;
  content_attributes?: Record<string, unknown>;
  message_type?: 'incoming' | 'outgoing' | 'activity' | 'template';
  created_at?: string;
  private?: boolean;
  source_id?: string | null;
  sender?: {
    id: number;
    name: string;
    email?: string | null;
    type?: string;
  };
  conversation?: {
    id: number;
    account_id: number;
    inbox_id: number;
    status?: string;
  };
  account?: {
    id: number;
    name: string;
  };
  current_conversation?: {
    messages?: Array<{ id: number }>;
  };
  meta?: {
    assignee?: {
      id: number;
      name: string;
      email?: string;
      type?: string;
    };
  };
  assignee?: {
    id: number;
    name: string;
    email?: string;
    type?: string;
  };
}

// Quick reply options
const FOLLOWUP_OPTIONS = [
  { title: "More Questions", value: "I have another question" },
  { title: "Get a Quote", value: "I'd like to get a quote" },
  { title: "Talk to Human", value: "I'd like to speak with a representative" }
];

// System prompt - optimized for accuracy and helpfulness
const SYSTEM_PROMPT = `You are a helpful customer service assistant for Water Wise Group, a company specializing in Aqua2use greywater recycling systems.

CRITICAL PRICING - Use ONLY these exact prices:
- Aqua2use GWDD Gravity: $625
- Aqua2use GWDD with Pump: $945
- Aqua2use Pro: $2,695
- Replacement Filters: $219.95
- Replacement Pump: $389
- Drip Irrigation Kit: $199.95

GUIDELINES:
- Be friendly, helpful, and concise (2-4 sentences max)
- NEVER invent or guess prices, specifications, or features
- If unsure, say "I'd recommend contacting our team at (678) 809-3008 for the most accurate information"
- For order status, shipping, or warranty claims, direct to sales@waterwisegroup.com
- Stay focused on greywater and Water Wise Group topics

AFTER your response, add content suggestions if relevant:
[SUGGEST: product:keyword] or [SUGGEST: solution:keyword] or [SUGGEST: article:keyword]

Examples:
- Discussing pricing → [SUGGEST: product:aqua2use]
- RV question → [SUGGEST: solution:rv]
- What is greywater → [SUGGEST: article:what is]

Only add SUGGEST if directly relevant. Don't force it.

KNOWLEDGE BASE:
`;

// Check conversation status from Chatwoot API (not in-memory)
async function getConversationStatus(accountId: number, conversationId: number): Promise<string | null> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) return null;

  try {
    const response = await fetch(
      `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}`,
      {
        headers: { 'api_access_token': apiToken }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.status || null;
    }
  } catch (error) {
    console.error('[Chatwoot] Failed to get conversation status:', error);
  }

  return null;
}

// Generate AI response with error handling
async function generateResponse(userMessage: string): Promise<string> {
  try {
    // Find relevant sections from knowledge base
    const relevantSections = findRelevantSections(userMessage, 4);

    let context: string;
    if (relevantSections.length > 0) {
      context = relevantSections.map(s => `## ${s.title}\n${s.content}`).join('\n\n');
    } else {
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
      max_tokens: 400,
      temperature: 0.3, // Lower temperature for factual accuracy
    });

    return response.choices[0]?.message?.content || getFallbackResponse();
  } catch (error) {
    console.error('[Chatwoot] OpenAI error:', error);
    return getFallbackResponse();
  }
}

function getFallbackResponse(): string {
  return "I apologize, but I'm having trouble right now. Please contact our team directly at (678) 809-3008 or sales@waterwisegroup.com for assistance.";
}

async function sendChatwootMessage(
  accountId: number,
  conversationId: number,
  message: string,
  options?: {
    withFollowupOptions?: boolean;
    handoff?: boolean;
  }
): Promise<boolean> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) {
    console.error('[Chatwoot] Configuration missing');
    return false;
  }

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

  const payload: Record<string, unknown> = {
    content: message,
    message_type: 'outgoing',
    private: false,
  };

  if (options?.withFollowupOptions) {
    payload.content_type = 'input_select';
    payload.content_attributes = { items: FOLLOWUP_OPTIONS };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': apiToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('[Chatwoot] Failed to send message:', await response.text());
      return false;
    }

    if (options?.handoff) {
      await handoffToHuman(accountId, conversationId);
    }

    return true;
  } catch (error) {
    console.error('[Chatwoot] Error sending message:', error);
    return false;
  }
}

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

  if (!chatwootUrl || !apiToken || cards.length === 0) return;

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': apiToken,
      },
      body: JSON.stringify({
        content: '',
        message_type: 'outgoing',
        private: false,
        content_type: 'cards',
        content_attributes: { items: cards }
      }),
    });

    if (!response.ok) {
      console.error('[Chatwoot] Failed to send cards:', await response.text());
    }
  } catch (error) {
    console.error('[Chatwoot] Error sending cards:', error);
  }
}

function parseContentSuggestions(response: string): {
  cleanResponse: string;
  suggestedProducts: ProductCard[];
  suggestedSolutions: SolutionCard[];
  suggestedArticles: ArticleCard[];
} {
  const suggestPattern = /\[SUGGEST:\s*([^\]]+)\]/gi;
  const matches = [...response.matchAll(suggestPattern)];

  const suggestedProducts: ProductCard[] = [];
  const suggestedSolutions: SolutionCard[] = [];
  const suggestedArticles: ArticleCard[] = [];

  for (const match of matches) {
    const suggestions = match[1].split(',').map(s => s.trim());

    for (const suggestion of suggestions) {
      const parts = suggestion.split(':');
      if (parts.length !== 2) continue;

      const [type, keyword] = parts.map(s => s.trim().toLowerCase());

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

  const cleanResponse = response.replace(suggestPattern, '').trim();

  return {
    cleanResponse,
    suggestedProducts: suggestedProducts.slice(0, 2),
    suggestedSolutions: suggestedSolutions.slice(0, 1),
    suggestedArticles: suggestedArticles.slice(0, 1)
  };
}

async function handoffToHuman(accountId: number, conversationId: number): Promise<void> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) return;

  try {
    await fetch(
      `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/toggle_status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': apiToken,
        },
        body: JSON.stringify({ status: 'open' }),
      }
    );
  } catch (error) {
    console.error('[Chatwoot] Handoff error:', error);
  }
}

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

  const payload: Record<string, string> = {};
  if (name) payload.name = name;
  if (email) payload.email = email;
  if (phone) payload.phone_number = phone;

  try {
    await fetch(
      `${chatwootUrl}/api/v1/accounts/${accountId}/contacts/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': apiToken,
        },
        body: JSON.stringify(payload),
      }
    );
  } catch (error) {
    console.error('[Chatwoot] Update contact error:', error);
  }
}

// Human request detection patterns
const HUMAN_REQUEST_PATTERNS = [
  'talk to human', 'speak to human', 'human agent', 'real person',
  'customer service', 'representative', 'talk to someone', 'speak to someone',
  'live agent', 'human please', 'operator', 'speak with someone', 'agent please'
];

// Detect if message is contact info submission
function isContactInfoSubmission(message: string): { isContact: boolean; name?: string; email?: string; phone?: string } {
  const cleanContent = message.replace(/<[^>]*>/g, '').trim();
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = cleanContent.match(emailRegex);

  if (!emailMatch) {
    return { isContact: false };
  }

  const messageWords = cleanContent.split(/\s+/).length;

  // Must be short (under 20 words) and not look like a question
  if (messageWords >= 20 || cleanContent.includes('?') || cleanContent.toLowerCase().includes('check out')) {
    return { isContact: false };
  }

  const email = emailMatch[0];
  const beforeEmail = cleanContent.substring(0, cleanContent.indexOf(email)).trim();

  const name = beforeEmail
    .replace(/^(my name is|i'm|i am|name:|hi,?|hello,?|it's|its)\s*/i, '')
    .replace(/[,.\s]+$/, '')
    .trim() || 'Customer';

  const phoneRegex = /[\d\s\-().]{10,}/;
  const phoneMatch = cleanContent.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0].trim() : undefined;

  return { isContact: true, name, email, phone };
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify webhook signature
    const signature = request.headers.get('x-chatwoot-signature');
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload: ChatwootWebhook = JSON.parse(rawBody);

    // Basic validation
    if (!payload.event || !payload.conversation?.id || !payload.account?.id) {
      return NextResponse.json({ status: 'invalid_payload' });
    }

    const accountId = payload.account.id;
    const conversationId = payload.conversation.id;

    console.log(`[Chatwoot] ${payload.event} - Conv: ${conversationId}`);

    // Handle non-message events
    if (payload.event === 'conversation_created') {
      return NextResponse.json({ status: 'ok' });
    }

    // Only process incoming messages from contacts
    if (payload.event !== 'message_created' || payload.message_type !== 'incoming') {
      return NextResponse.json({ status: 'ignored' });
    }

    // Check sender type
    const senderType = payload.sender?.type?.toLowerCase();
    if (senderType === 'user' || senderType === 'agent_bot' || senderType === 'agentbot') {
      return NextResponse.json({ status: 'ignored' });
    }

    // Check if conversation is being handled by human (query API, not in-memory)
    const status = await getConversationStatus(accountId, conversationId);
    if (status === 'open') {
      console.log(`[Chatwoot] Conv ${conversationId} is open (human handling)`);
      return NextResponse.json({ status: 'human_handling' });
    }

    // Get message content safely
    const messageContent = payload.content?.replace(/<[^>]*>/g, '').trim() || '';

    if (!messageContent) {
      return NextResponse.json({ status: 'empty_message' });
    }

    // Check for contact info submission
    const contactInfo = isContactInfoSubmission(messageContent);
    if (contactInfo.isContact && contactInfo.email) {
      console.log(`[Chatwoot] Contact info: ${contactInfo.name}`);

      if (payload.sender?.id) {
        await updateContactInfo(accountId, payload.sender.id, contactInfo.name!, contactInfo.email, contactInfo.phone);
      }

      await sendChatwootMessage(
        accountId,
        conversationId,
        `Thank you, ${contactInfo.name}! I'll connect you with our team now. Someone will be with you shortly.\n\nYou can also reach us at:\n📞 (678) 809-3008\n📧 sales@waterwisegroup.com`,
        { handoff: true }
      );

      return NextResponse.json({ status: 'handoff_with_contact' });
    }

    // Check if user wants human
    const messageLower = messageContent.toLowerCase();
    const wantsHuman = HUMAN_REQUEST_PATTERNS.some(p => messageLower.includes(p));

    if (wantsHuman) {
      await sendChatwootMessage(
        accountId,
        conversationId,
        `I'd be happy to connect you with our team! Please share your name and email so they can follow up with you.\n\nFor example: "John Smith, john@email.com"`
      );
      return NextResponse.json({ status: 'contact_info_requested' });
    }

    // Generate AI response
    const aiResponse = await generateResponse(messageContent);
    const { cleanResponse, suggestedProducts, suggestedSolutions, suggestedArticles } = parseContentSuggestions(aiResponse);

    // Send main response
    await sendChatwootMessage(accountId, conversationId, cleanResponse);

    // Build and send cards
    const allSuggested = [...suggestedProducts, ...suggestedSolutions, ...suggestedArticles];
    let cardsToSend = formatAsCards(allSuggested);

    if (cardsToSend.length === 0) {
      const detected = detectRelevantContent(messageContent);
      const detectedItems = [...detected.products, ...detected.solutions, ...detected.articles];
      if (detectedItems.length > 0) {
        cardsToSend = formatAsCards(detectedItems.slice(0, 2));
      }
    }

    if (cardsToSend.length > 0) {
      await sendChatwootCards(accountId, conversationId, cardsToSend);
    }

    // First message follow-up
    const isFirstMessage = (payload.current_conversation?.messages?.length || 0) <= 1;
    if (isFirstMessage) {
      await sendChatwootMessage(
        accountId,
        conversationId,
        "What else can I help you with?",
        { withFollowupOptions: true }
      );
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('[Chatwoot] Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Water Wise Group Chat Bot',
    version: '2.0',
    timestamp: new Date().toISOString()
  });
}
