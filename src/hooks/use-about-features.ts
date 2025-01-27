import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

export function useAboutFeatures() {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['aboutFeatures', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as SupportedLanguage;
      console.log('Fetching about features for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('about_features')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching about features:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!i18n.language,
  });
}
