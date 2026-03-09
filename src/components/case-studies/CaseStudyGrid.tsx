import CaseStudyCard from './CaseStudyCard';
import { BaseGrid } from '../ui/base-grid';
import type { GridConfig } from '@/types/section';

interface CaseStudy {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  slug?: string | null;
  case_study_metrics: any[];
}

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
      slug={study.slug ?? undefined}
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