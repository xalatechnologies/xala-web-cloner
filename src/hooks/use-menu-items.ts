import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];
type MenuItem = Database['public']['Tables']['menu_items']['Row'];

export function useMenuItems() {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['menuItems', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as SupportedLanguage;
      console.log('Fetching menu items for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching menu items:', error);
        throw error;
      }

      return (data || []) as MenuItem[];
    },
    enabled: !!i18n.language,
  });
}
