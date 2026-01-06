import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export async function sendChatMessage(message: string, language: string): Promise<ChatResponse> {
  try {
    // Store the message in Supabase
    const { error: dbError } = await supabase
      .from('chat_messages')
      .insert([{
        content: message,
        role: 'user',
        language,
        created_at: new Date().toISOString()
      }]);

    if (dbError) throw dbError;

    // Call your LLM endpoint here
    const response = await fetch('/api/llm/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from LLM');
    }

    const data = await response.json();
    
    // Store the AI response
    const { error: responseError } = await supabase
      .from('chat_messages')
      .insert([{
        content: data.message,
        role: 'assistant',
        language,
        created_at: new Date().toISOString()
      }]);

    if (responseError) throw responseError;

    return { message: data.message };
  } catch (error) {
    console.error('Chat error:', error);
    return {
      message: 'An error occurred while processing your message.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
