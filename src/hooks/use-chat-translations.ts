import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations } from '@/types/chat';

const defaultTranslations: ChatTranslations = {
  'chat.title': 'Chat with us',
  'chat.status.thinking': 'Thinking...',
  'chat.status.online': 'Online',
  'chat.input.placeholder': 'Type your message...',
  'chat.button.send': 'Send',
  'chat.button.retry': 'Retry'
};

export function useChatTranslations(language: string = 'en') {
  return useQuery({
    queryKey: ['chat-translations', language],
    queryFn: async () => {
      const { data: translations, error } = await supabase
        .from('content')
        .select('translations')
        .eq('language', language)
        .eq('type', 'chat')
        .single();

      if (error) {
        console.error('Error fetching chat translations:', error);
        return defaultTranslations;
      }

      return translations?.translations 
        ? (translations.translations as unknown as ChatTranslations) 
        : defaultTranslations;
    }
  });
}