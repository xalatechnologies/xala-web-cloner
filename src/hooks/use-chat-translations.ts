import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ChatTranslations = {
  'chat.title': string;
  'chat.status.thinking': string;
  'chat.status.online': string;
  'chat.input.placeholder': string;
  'chat.input.button': string;
  'chat.errors.failed_to_send': string;
};

export function useChatTranslations() {
  const { data, isLoading } = useQuery({
    queryKey: ['chat-translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('translations')
        .eq('section_name', 'chat')
        .single();

      if (error) throw error;

      return {
        translations: data?.translations as ChatTranslations || {
          'chat.title': 'Chat',
          'chat.status.thinking': 'Thinking...',
          'chat.status.online': 'Online',
          'chat.input.placeholder': 'Type a message...',
          'chat.input.button': 'Chat',
          'chat.errors.failed_to_send': 'Failed to send message'
        }
      };
    }
  });

  return {
    translations: data?.translations || {},
    isLoading
  };
}