import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { findRelevantSections, getAllKnowledge } from '@/lib/knowledge-base';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
}

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

  const response = await openai.chat.completions.create({
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
  message: string
): Promise<void> {
  const chatwootUrl = process.env.CHATWOOT_URL;
  const apiToken = process.env.CHATWOOT_BOT_TOKEN;

  if (!chatwootUrl || !apiToken) {
    console.error('Chatwoot configuration missing');
    return;
  }

  const url = `${chatwootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api_access_token': apiToken,
    },
    body: JSON.stringify({
      content: message,
      message_type: 'outgoing',
      private: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to send Chatwoot message:', errorText);
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: ChatwootWebhook = await request.json();

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

    // Generate AI response
    const aiResponse = await generateResponse(payload.content);

    // Send response back to Chatwoot
    await sendChatwootMessage(
      payload.account.id,
      payload.conversation.id,
      aiResponse
    );

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
