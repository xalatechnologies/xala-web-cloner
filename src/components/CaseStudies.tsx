import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";
import { type Database }  from "@/integrations/supabase/types";
import CaseStudyGrid from './case-studies/CaseStudyGrid';
import CaseStudyCarousel from './case-studies/CaseStudyCarousel';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_metrics: Database['public']['Tables']['case_study_metrics']['Row'][];
};

const CaseStudies = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('case-studies');

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching case studies for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('case_studies')
        .select(`
          *,
          case_study_metrics(*)
        `)
        .eq('language', currentLanguage)
        .eq('status', 'published')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as CaseStudy[];
    },
    enabled: !!i18n.language
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-xala-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!caseStudies) return null;

  return (
    <section className="py-20 bg-xala-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-xala-accent mb-4">
            {section?.title || t('caseStudies.title')}
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto">
            {section?.description || t('caseStudies.description')}
          </p>
        </div>

        {section?.carousel ? (
          <CaseStudyCarousel 
            caseStudies={caseStudies}
            columns={section.columns || 3}
            autoscroll={section.autoscroll || false}
          />
        ) : (
          <CaseStudyGrid 
            caseStudies={caseStudies}
            columns={section.columns || 3}
            rows={section.rows || 1}
          />
        )}
      </div>
    </section>
  );
};

export default CaseStudies;