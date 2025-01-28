import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Language } from '@/types/chat';

type TableName = 'services' | 'products' | 'case_studies' | 'technologies' | 'about_features' | 'team_members';

interface UseLocalizedDataOptions {
  queryKey: string;
  table: TableName;
  relationships?: string;
  orderBy?: string;
}

export function useLocalizedData<T>({ queryKey, table, relationships, orderBy }: UseLocalizedDataOptions) {
  const language: Language = 'en'; // Default to English

  const query = useQuery({
    queryKey: [queryKey, language],
    queryFn: async () => {
      let queryBuilder = supabase
        .from(table)
        .select(relationships || '*')
        .eq('language', language);

      if (orderBy) {
        queryBuilder = queryBuilder.order(orderBy);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;
      return data as T[];
    }
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error
  };
}