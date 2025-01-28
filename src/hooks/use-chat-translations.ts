import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations } from '@/types/chat';

const defaultTranslations: ChatTranslations = {
  'chat.title': 'Chat Assistant',
  'chat.status.thinking': 'Thinking...',
  'chat.status.online': 'Online',
  'chat.input.placeholder': 'Type a message...',
  'chat.input.button': 'Chat',
  'chat.errors.failed_to_send': 'Failed to send message'
};

export function useChatTranslations() {
  const { data: translations } = useQuery({
    queryKey: ['chat-translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('translations')
        .eq('section_name', 'Chat Widget')
        .single();

      if (error) {
        console.error('Error fetching chat translations:', error);
        return defaultTranslations;
      }

      return (data?.translations as ChatTranslations) || defaultTranslations;
    },
    initialData: defaultTranslations
  });

  return translations;
}

export type { ChatTranslations };