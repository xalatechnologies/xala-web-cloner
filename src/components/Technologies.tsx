import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import TechnologyGrid from './technologies/TechnologyGrid';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

interface Technology {
  id: string;
  title: string;
  description: string | null;
  language: SupportedLanguage;
  category: string;
  sort_order: number;
  icon: string;
  created_at: string | null;
  updated_at: string | null;
  technology_tools: {
    id: string;
    name: string;
    description: string | null;
    language: SupportedLanguage;
    sort_order: number;
    technology_id: string;
    created_at: string | null;
    updated_at: string | null;
  }[];
}

const Technologies = () => {
  const { t, i18n } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('technologies');
  const currentLanguage = i18n.language.toLowerCase().startsWith('en') ? 'en' : 'no' as SupportedLanguage;

  const { data: technologies = [], isLoading: isTechnologiesLoading } = useQuery({
    queryKey: ['technologies', currentLanguage],
    queryFn: async () => {
      const { data: techData, error: techError } = await supabase
        .from('technologies')
        .select(`
          *,
          technology_tools (*)
        `)
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (techError) {
        throw new Error('Failed to fetch technologies');
      }

      return (techData || []) as Technology[];
    },
  });

  const isLoading = isSectionLoading || isTechnologiesLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    if (!technologies.length) {
      return (
        <div className="text-center text-xala-text">
          {t('technologies.noData')}
        </div>
      );
    }

    return (
      <TechnologyGrid 
        technologies={technologies} 
        initialRows={section?.rows || 2}
        cols={section?.columns || 3}
      />
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-xala-secondary via-xala-primary to-xala-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {section?.title || t('technologies.title')}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {section?.description || t('technologies.description')}
          </p>
        </div>
        
        {renderContent()}
      </div>
    </section>
  );
};

export default Technologies;