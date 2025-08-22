import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import type { Database } from "@/integrations/supabase/types";
import type { Section } from "@/types/section";
import { useLocalizedData } from "@/hooks/use-localized-data";
import { LoadingSpinner } from "./ui/loading-spinner";
import CaseStudyGrid from './case-studies/CaseStudyGrid';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_metrics: Database['public']['Tables']['case_study_metrics']['Row'][];
};

const CaseStudies = () => {
  const { t } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('case-studies');

  const { data: caseStudies = [], isLoading: isCaseStudiesLoading } = useLocalizedData<CaseStudy>({
    queryKey: 'case-studies',
    table: 'case_studies',
    relationships: 'case_study_metrics(*)',
    orderBy: 'sort_order'
  });

  const isLoading = isSectionLoading || isCaseStudiesLoading;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!caseStudies.length) {
      return (
        <div className="text-center text-xala-text">
          <p>{t('No case studies available')}</p>
        </div>
      );
    }

    return (
      <CaseStudyGrid 
        caseStudies={caseStudies}
        initialRows={section?.rows || 1}
        cols={section?.columns || 3}
      />
    );
  };

  if (!section) return null;

  return (
    <section id="case-studies" className="py-20 bg-background relative overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {section.title}
            </h2>
            <p className="text-lg leading-8 text-text-muted">
              {section.description}
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;