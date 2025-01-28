import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Language } from '@/types/chat';

export function useFeatureCards() {
  const { data: features } = useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('language', 'en' as Language)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return features;
}