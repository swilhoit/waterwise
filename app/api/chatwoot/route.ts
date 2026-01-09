import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { findRelevantSections, getAllKnowledge } from '@/lib/knowledge-base';

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
    type: 'contact' | 'user';
  };
  conversation: {
    id: number;
    account_id: number;
    inbox_id: number;
  };
  account: {
    id: number;
    name: string;
  };
  current_conversation?: {
    messages: Array<{ id: number }>;
  };
}

// Quick reply options for the welcome message
const QUICK_REPLIES = [
  { title: "Product Info", value: "Tell me about your greywater systems and which one is right for me" },
  { title: "Pricing", value: "What are your prices and what's included?" },
  { title: "Installation", value: "How difficult is installation? Do I need a plumber?" },
  { title: "Talk to Human", value: "I'd like to speak with a customer service representative" }
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
- If you don't know something specific, offer to connect them with our support team at (678) 809-3008 or sales@waterwisegroup.com
- For complex technical issues or order status inquiries, recommend they contact support directly
- Never make up product specifications or prices - use only the information provided
- If asked about topics unrelated to greywater or Water Wise Group, politely redirect to water conservation topics

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
    withQuickReplies?: boolean;
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
  if (options?.withQuickReplies) {
    payload.content_type = 'input_select';
    payload.content_attributes = {
      items: QUICK_REPLIES
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

async function sendWelcomeMessage(
  accountId: number,
  conversationId: number
): Promise<void> {
  const welcomeMessage = `👋 Welcome to Water Wise Group! I'm your AI assistant, here to help you learn about greywater recycling systems.

How can I help you today?`;

  await sendChatwootMessage(accountId, conversationId, welcomeMessage, { withQuickReplies: true });
}

export async function POST(request: NextRequest) {
  try {
    const payload: ChatwootWebhook = await request.json();

    // Handle conversation created event - send welcome message
    if (payload.event === 'conversation_created') {
      console.log('New conversation started, sending welcome message');
      await sendWelcomeMessage(
        payload.account.id,
        payload.conversation.id
      );
      return NextResponse.json({ status: 'welcome_sent' });
    }

    // Only respond to incoming messages from contacts (not our own messages or agent messages)
    if (
      payload.event !== 'message_created' ||
      payload.message_type !== 'incoming' ||
      payload.sender?.type !== 'contact'
    ) {
      return NextResponse.json({ status: 'ignored' });
    }

    // Don't respond to empty messages
    if (!payload.content || payload.content.trim() === '') {
      return NextResponse.json({ status: 'ignored' });
    }

    console.log(`Received message from ${payload.sender.name}: ${payload.content}`);

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
      const handoffMessage = `I'll connect you with a member of our team right away. A customer service representative will be with you shortly.

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
      return NextResponse.json({ status: 'handoff' });
    }

    // Generate AI response
    const aiResponse = await generateResponse(payload.content);

    // Check if this is the first real message (after welcome) to add helpful follow-up
    const isFirstMessage = payload.current_conversation?.messages?.length === 1;

    // Send response back to Chatwoot
    await sendChatwootMessage(
      payload.account.id,
      payload.conversation.id,
      aiResponse
    );

    // After answering, offer quick replies for follow-up (on first substantive exchange)
    if (isFirstMessage) {
      setTimeout(async () => {
        await sendChatwootMessage(
          payload.account.id,
          payload.conversation.id,
          "Is there anything else I can help you with?",
          { withQuickReplies: true }
        );
      }, 1500);
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
