import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations, Language } from '@/types/chat';

export function useChatTranslations() {
  const { data } = useQuery({
    queryKey: ['chat-translations'],
    queryFn: async () => {
      const { data: translations, error } = await supabase
        .from('chat_translations')
        .select('*')
        .eq('language', 'en' as Language)
        .single();

      if (error) {
        return {
          'chat.title': 'Chat with AI',
          'chat.status.thinking': 'AI is thinking...',
          'chat.status.online': 'Online',
          'chat.input.placeholder': 'Type your message...',
          'chat.input.button': 'Send',
          'chat.errors.failed_to_send': 'Failed to send message'
        } as ChatTranslations;
      }

      return translations as ChatTranslations;
    }
  });

  return data || {
    'chat.title': 'Chat with AI',
    'chat.status.thinking': 'AI is thinking...',
    'chat.status.online': 'Online',
    'chat.input.placeholder': 'Type your message...',
    'chat.input.button': 'Send',
    'chat.errors.failed_to_send': 'Failed to send message'
  };
}