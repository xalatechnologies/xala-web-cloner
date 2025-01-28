import { supabase } from '@/integrations/supabase/client';

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
      language: language === 'no' ? 'no' : 'en',
      systemPrompt: language === 'no'
        ? `Du er en AI-assistent for Xala Technologies. Du er spesialisert på å hjelpe kunder med AI-løsninger, skyintegrasjon og dataanalyse. Svar alltid på norsk.`
        : `You are an AI assistant for Xala Technologies, specializing in helping customers with AI solutions, cloud integration, and data analytics.`
    };

    console.log('Sending request to Edge Function:', payload);

    // Call existing chat-ai Edge Function
    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: payload,
    });

    console.log('Edge Function response:', { data, error });

    if (error) {
      console.error('Edge Function error:', error);
      throw new Error(error.message || 'Edge Function error');
    }

    // Check for error in the response data
    if (data?.error) {
      console.error('Edge Function returned error:', data.error);
      throw new Error(data.error);
    }

    // Handle both possible response formats
    const responseText = data?.response || data?.choices?.[0]?.message?.content;

    if (!responseText) {
      console.error('No valid response in data:', data);
      throw new Error('No valid response from Edge Function');
    }

    return {
      message: responseText
    };
  } catch (error) {
    console.error('LLM error:', error);
    const errorMessage = language === 'no'
      ? 'Det oppstod en feil under behandling av meldingen din.'
      : 'An error occurred while processing your message.';
    throw new Error(errorMessage);
  }
}
