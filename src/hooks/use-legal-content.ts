import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type LegalSection = Database['public']['Tables']['legal_sections']['Row'];
export type LegalContent = Database['public']['Tables']['legal_content']['Row'];

interface UseLegalContentProps {
  type: 'privacy' | 'terms' | 'cookies';
}

export const useLegalContent = ({ type }: UseLegalContentProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.toLowerCase().startsWith('en') ? 'en' : 'no';

  return useQuery({
    queryKey: ['legal', type, currentLanguage],
    queryFn: async () => {
      // First get all sections for this legal type
      const { data: sections, error: sectionsError } = await supabase
        .from('legal_sections')
        .select('*')
        .eq('type', type)
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (sectionsError) throw sectionsError;

      // Then get all content for these sections
      const { data: content, error: contentError } = await supabase
        .from('legal_content')
        .select('*')
        .eq('type', type)
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (contentError) throw contentError;

      // Organize content by section
      const organizedContent = sections?.map(section => ({
        ...section,
        items: content?.filter(item => item.section_id === section.id) || []
      }));

      return {
        sections: organizedContent || [],
        lastUpdated: sections?.[0]?.updated_at || new Date().toISOString()
      };
    }
  });
};