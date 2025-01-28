import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations } from '@/types/chat';

const defaultTranslations: ChatTranslations = {
  'chat.title': 'Chat with us',
  'chat.status.thinking': 'Thinking...',
  'chat.status.online': 'Online',
  'chat.input.placeholder': 'Type your message...',
  'chat.input.button': 'Send',
  'chat.errors.failed_to_send': 'Failed to send message'
};

export function useChatTranslations(language: string = 'en') {
  return useQuery({
    queryKey: ['chat-translations', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('translations')
        .eq('section_name', 'chat')
        .eq('language', language)
        .maybeSingle();

      if (error) {
        console.error('Error fetching chat translations:', error);
        return defaultTranslations;
      }

      return data?.translations 
        ? (data.translations as unknown as ChatTranslations) 
        : defaultTranslations;
    },
    initialData: defaultTranslations
  });
}

export type { ChatTranslations };