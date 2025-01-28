import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatTranslations, Language } from '@/types/chat';

const defaultTranslations: ChatTranslations = {
  'chat.title': 'Chat with AI',
  'chat.status.thinking': 'AI is thinking...',
  'chat.status.online': 'Online',
  'chat.input.placeholder': 'Type your message...',
  'chat.input.button': 'Send',
  'chat.errors.failed_to_send': 'Failed to send message'
};

export function useChatTranslations() {
  const { data } = useQuery({
    queryKey: ['chat-translations'],
    queryFn: async () => {
      const { data: translations, error } = await supabase
        .from('sections')
        .select('*')
        .eq('section_name', 'chat')
        .eq('language', 'en' as Language)
        .maybeSingle();

      if (error) {
        console.error('Error fetching translations:', error);
        return defaultTranslations;
      }

      return translations?.translations as ChatTranslations || defaultTranslations;
    }
  });

  return data || defaultTranslations;
}