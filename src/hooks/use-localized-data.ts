import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type TableNames = keyof Database['public']['Tables'];
type SupportedLanguage = Database['public']['Enums']['supported_language'];

interface UseLocalizedDataOptions {
  queryKey: string;
  table: TableNames;
  select?: string;
  relationships?: string;
  orderBy?: string;
  enabled?: boolean;
}

export function useLocalizedData<T>({
  queryKey,
  table,
  select = '*',
  relationships,
  orderBy = 'sort_order',
  enabled = true
}: UseLocalizedDataOptions) {
  const { i18n } = useTranslation();
  // Map any English variant to 'en', otherwise use 'no'
  const currentLanguage = (i18n.language.toLowerCase().startsWith('en') ? 'en' : 'no') as SupportedLanguage;

  return useQuery<T[], Error>({
    queryKey: [queryKey, currentLanguage],
    queryFn: async (): Promise<T[]> => {
      const query = supabase
        .from(table)
        .select(relationships ? `${select}, ${relationships}` : select)
        .eq('language', currentLanguage)
        .order(orderBy, { ascending: true });

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch ${table}`);
      }

      return (data || []) as T[];
    },
    enabled: enabled && !!i18n.language
  });
}