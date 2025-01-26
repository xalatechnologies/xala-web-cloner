import { Code2, Brain, Layout, Palette, Server, Terminal } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

const iconMap = {
  Code2,
  Brain,
  Layout,
  Palette,
  Server,
  Terminal
};

const Technologies = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('technologies');
  
  const { data: technologies = [] } = useQuery({
    queryKey: ['technologies', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as SupportedLanguage;
      console.log('Fetching technologies for language:', currentLanguage);
      
      const { data: techData, error } = await supabase
        .from('technologies')
        .select(`
          *,
          technology_tools(*)
        `)
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching technologies:', error);
        throw error;
      }

      return techData || [];
    },
  });

  return (
    <section className="py-20 bg-xala-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {section?.title || t('technologies.title')}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {section?.description || t('technologies.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech) => {
            const IconComponent = iconMap[tech.icon as keyof typeof iconMap];
            return (
              <div
                key={tech.id}
                className="p-6 bg-xala-secondary rounded-xl border border-gray-800 hover:border-xala-accent/50 transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    {IconComponent && <IconComponent className="w-8 h-8 text-xala-accent" />}
                    <h3 className="text-xl font-semibold text-xala-accent">{tech.title}</h3>
                  </div>
                  {tech.description && (
                    <p className="text-xala-text mb-6">{tech.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tech.technology_tools?.map((tool) => (
                      <span
                        key={tool.id}
                        className="px-3 py-1 bg-xala-primary rounded-full text-sm text-xala-text"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;