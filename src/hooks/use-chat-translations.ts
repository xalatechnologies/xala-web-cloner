import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface ChatTranslations {
  'chat.title': string;
  'chat.status.thinking': string;
  'chat.status.online': string;
  'chat.input.placeholder': string;
  'chat.input.button': string;
  'chat.errors.failed_to_send': string;
}

type Section = Database['public']['Tables']['sections']['Row'] & {
  translations: ChatTranslations;
};

export function useChatTranslations() {
  const { i18n, t } = useTranslation();
  // Normalize language code to just 'en' or 'no'
  const currentLanguage = i18n.language.toLowerCase().startsWith('en') ? 'en' : 'no';

  const { data: section, isLoading } = useQuery<Section | null>({
    queryKey: ['chat-translations', currentLanguage],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('sections')
          .select('*')
          .eq('language', currentLanguage)
          .eq('section_name', 'chat-widget')
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Failed to fetch chat translations:', error);
          return null;
        }

        return data as Section;
      } catch (error) {
        console.error('Failed to fetch chat translations:', error);
        return null;
      }
    },
  });

  const translations = section?.translations || {
    'chat.title': t('chat.title'),
    'chat.status.thinking': t('chat.status.thinking'),
    'chat.status.online': t('chat.status.online'),
    'chat.input.placeholder': t('chat.input.placeholder'),
    'chat.input.button': t('chat.input.button'),
    'chat.errors.failed_to_send': t('chat.errors.failed_to_send'),
  };

  return {
    translations,
    isLoading,
  };
}
