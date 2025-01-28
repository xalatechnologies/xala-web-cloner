import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Language, LegalType, LegalSection } from '@/types/chat';

export function useLegalContent(type: LegalType) {
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['legal-sections', type],
    queryFn: async () => {
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('legal_sections')
        .select(`
          *,
          items:legal_content(*)
        `)
        .eq('type', type)
        .eq('language', 'en' as Language)
        .order('sort_order', { ascending: true });

      if (sectionsError) throw sectionsError;
      return sectionsData as LegalSection[];
    },
  });

  return { sections, isLoading };
}