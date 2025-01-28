import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations } from '@/types/chat';

export function useChatTranslations(language: string = 'en') {
  const { data: translations } = useQuery({
    queryKey: ['chat-translations', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('translations')
        .eq('section_name', 'Chat Widget')
        .single();

      if (error) {
        console.error('Error fetching chat translations:', error);
        return getDefaultTranslations();
      }

      return (data?.translations as ChatTranslations) || getDefaultTranslations();
    },
  });

  return translations || getDefaultTranslations();
}

function getDefaultTranslations(): ChatTranslations {
  return {
    'chat.title': 'Xala AI Assistant',
    'chat.status.thinking': 'Thinking...',
    'chat.status.online': 'Online',
    'chat.input.placeholder': 'Type your message...',
    'chat.input.button': 'Chat with Xala AI',
    'chat.errors.failed_to_send': 'Failed to send message'
  };
}