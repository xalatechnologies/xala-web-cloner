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
  // Normalize language code to handle all English variants (en-GB, en-US, etc.)
  const currentLanguage = (i18n.language.toLowerCase().split('-')[0] === 'en' ? 'en' : 'no') as SupportedLanguage;

  return useQuery<T[], Error>({
    queryKey: [queryKey, currentLanguage],
    queryFn: async (): Promise<T[]> => {
      const query = supabase
        .from(table as any) // Type assertion needed since table names are dynamic
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
