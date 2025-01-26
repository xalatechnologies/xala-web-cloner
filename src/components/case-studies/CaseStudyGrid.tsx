import CaseStudyCard from './CaseStudyCard';
import type { Database } from '@/integrations/supabase/types';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_metrics: Database['public']['Tables']['case_study_metrics']['Row'][];
};

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  columns: number;
  rows: number;
}

const CaseStudyGrid = ({ caseStudies, columns, rows }: CaseStudyGridProps) => {
  return (
    <div 
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {caseStudies.map((study) => (
        <CaseStudyCard
          key={study.id}
          title={study.title}
          description={study.description}
          imageUrl={study.image_url}
          icon={study.icon}
        />
      ))}
    </div>
  );
};

export default CaseStudyGrid;