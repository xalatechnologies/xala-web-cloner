import CaseStudyCard from './CaseStudyCard';
import ExpandableGrid from '../ui/expandable-grid';
import type { Database } from '@/integrations/supabase/types';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_metrics: Database['public']['Tables']['case_study_metrics']['Row'][];
};

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  initialRows?: number;
}

const CaseStudyGrid = ({ caseStudies, initialRows }: CaseStudyGridProps) => {
  const studyCards = caseStudies.map((study) => (
    <CaseStudyCard
      key={study.id}
      title={study.title}
      description={study.description}
      imageUrl={study.image_url}
      icon={study.icon}
    />
  ));

  return (
    <ExpandableGrid 
      items={studyCards}
      initialRows={initialRows}
    />
  );
};

export default CaseStudyGrid;