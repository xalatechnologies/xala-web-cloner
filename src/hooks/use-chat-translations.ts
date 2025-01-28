import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

export interface ChatTranslations {
  'chat.title': string;
  'chat.status.thinking': string;
  'chat.status.online': string;
  'chat.input.placeholder': string;
  'chat.input.button': string;
  'chat.errors.failed_to_send': string;
}

export function useChatTranslations() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.toLowerCase().startsWith('en') ? 'en' : 'no';

  const { data: translationsData } = useQuery({
    queryKey: ['chat-translations', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('translations')
        .eq('language', currentLanguage)
        .eq('title', 'Chat Widget')
        .single();

      if (error) {
        console.error('Failed to fetch chat translations:', error);
        return null;
      }

      return data?.translations as ChatTranslations;
    },
  });

  const translations: ChatTranslations = translationsData || {
    'chat.title': 'Chat',
    'chat.status.thinking': 'Thinking...',
    'chat.status.online': 'Online',
    'chat.input.placeholder': 'Type a message...',
    'chat.input.button': 'Send',
    'chat.errors.failed_to_send': 'Failed to send message',
  };

  return {
    translations,
    isLoading: !translationsData,
  };
}