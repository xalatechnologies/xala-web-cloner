import CaseStudyCard from './CaseStudyCard';
import { BaseGrid } from '../ui/base-grid';
import type { Database } from '@/integrations/supabase/types';
import type { GridConfig } from '@/types/section';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_metrics: Database['public']['Tables']['case_study_metrics']['Row'][];
};

interface CaseStudyGridProps extends GridConfig {
  caseStudies: CaseStudy[];
}

const CaseStudyGrid = ({ caseStudies, initialRows = 1, cols = 3 }: CaseStudyGridProps) => {
  const studyCards = caseStudies.map((study) => (
    <CaseStudyCard
      key={study.id}
      title={study.title}
      description={study.description}
      imageUrl={study.image_url}
      icon={study.icon}
      metrics={study.case_study_metrics}
    />
  ));

  return (
    <BaseGrid 
      items={studyCards}
      initialRows={initialRows}
      cols={cols}
    />
  );
};

export default CaseStudyGrid;