import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations } from '@/types/chat';

export function useChatTranslations() {
  const { data: section } = useQuery({
    queryKey: ['chat-translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('translations')
        .eq('section_name', 'Chat Widget')
        .single();

      if (error) {
        console.error('Failed to fetch chat translations:', error);
        return null;
      }

      return data;
    },
  });

  const defaultTranslations: ChatTranslations = {
    'chat.title': 'Chat',
    'chat.status.thinking': 'Thinking...',
    'chat.status.online': 'Online',
    'chat.input.placeholder': 'Type a message...',
    'chat.input.button': 'Chat',
    'chat.errors.failed_to_send': 'Failed to send message',
  };

  return {
    translations: (section?.translations as ChatTranslations) || defaultTranslations,
  };
}

export type { ChatTranslations };