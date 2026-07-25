import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];
type MenuItem = Database['public']['Tables']['menu_items']['Row'];

export function useMenuItems() {
  const { i18n } = useTranslation();

  // The menu_items table is served from the Supabase project in
  // src/integrations/supabase/client.ts, which is currently unreachable
  // (non-functional pending a decision to restore or drop it). Callers
  // should use the returned isError/data state to fall back to a
  // hardcoded menu instead of relying on this ever resolving.
  return useQuery({
    queryKey: ['menuItems', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as SupportedLanguage;

      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch menu items');
      }

      return (data || []) as MenuItem[];
    },
    enabled: !!i18n.language,
    retry: false,
  });
}
