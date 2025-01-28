import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Language, LegalType } from '@/types/chat';

export function useLegalContent(type: LegalType) {
  const { data: sections, isLoading: sectionsLoading } = useQuery({
    queryKey: ['legal-sections', type],
    queryFn: async () => {
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('legal_sections')
        .select('*')
        .eq('type', type)
        .eq('language', 'en' as Language)
        .order('sort_order', { ascending: true });

      if (sectionsError) throw sectionsError;
      return sectionsData;
    },
  });

  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: ['legal-content', type],
    queryFn: async () => {
      const { data: contentData, error: contentError } = await supabase
        .from('legal_content')
        .select('*')
        .eq('type', type)
        .eq('language', 'en' as Language)
        .order('sort_order', { ascending: true });

      if (contentError) throw contentError;
      return contentData;
    },
  });

  return { 
    sections: sections || [], 
    content: content || [],
    isLoading: sectionsLoading || contentLoading 
  };
}