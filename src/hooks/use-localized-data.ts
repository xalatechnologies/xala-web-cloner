import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Language } from '@/types/chat';

export function useLocalizedData<T>(
  tableName: string,
  language: Language = 'en',
  options: {
    select?: string;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  } = {}
) {
  const { select = '*', orderBy = 'sort_order', orderDirection = 'asc' } = options;

  return useQuery({
    queryKey: ['localized-data', tableName, language, select, orderBy, orderDirection],
    queryFn: async () => {
      const query = supabase
        .from(tableName)
        .select(select)
        .eq('language', language)
        .order(orderBy, { ascending: orderDirection === 'asc' });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as T[];
    }
  });
}