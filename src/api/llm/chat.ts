import { supabase } from '@/integrations/supabase/client';

const isDev = process.env.NODE_ENV === 'development';
const EDGE_FUNCTION_URL = isDev 
  ? 'http://localhost:8000'
  : 'https://ttvpsjeucewnenjevfhh.functions.supabase.co/chat-ai';

export async function generateResponse(message: string, language: string) {
  try {
    if (!message?.trim()) {
      throw new Error(
        language === 'no'
          ? 'Meldingen kan ikke være tom.'
          : 'Message cannot be empty.'
      );
    }

    const payload = {
      message: message.trim(),
      language: language === 'no' ? 'no' : 'en'
    };

    console.log('Sending request to Edge Function:', payload);

    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: payload,
    });

    console.log('Edge Function response:', { data, error });

    if (error) {
      console.error('Edge Function error:', error);
      throw new Error(error.message || 'Edge Function error');
    }

    if (data?.error) {
      console.error('Edge Function returned error:', data.error);
      throw new Error(data.error);
    }

    if (!data?.message) {
      console.error('No message in response:', data);
      throw new Error('No valid response from Edge Function');
    }

    return { message: data.message };
  } catch (error) {
    console.error('LLM error:', error);
    const errorMessage = language === 'no'
      ? 'Det oppstod en feil under behandling av meldingen din.'
      : 'An error occurred while processing your message.';
    throw new Error(errorMessage);
  }
}
