import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import type { SupportedLanguage } from "@/types/section";

interface UseLocalizedDataOptions {
  queryKey: string;
  table: string;
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
  const currentLanguage = i18n.language.toLowerCase() as SupportedLanguage;

  return useQuery<T[], Error>({
    queryKey: [queryKey, currentLanguage],
    queryFn: async (): Promise<T[]> => {
      console.log(`Fetching ${table} for language:`, currentLanguage);
      
      const query = supabase
        .from(table)
        .select(relationships ? `${select}, ${relationships}` : select)
        .eq('language', currentLanguage)
        .order(orderBy, { ascending: true });

      const { data, error } = await query;

      if (error) {
        console.error(`Error fetching ${table}:`, error);
        throw error;
      }

      return (data || []) as T[];
    },
    enabled: enabled && !!i18n.language
  });
}
