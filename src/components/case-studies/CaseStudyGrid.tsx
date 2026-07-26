import CaseStudyCard from './CaseStudyCard';
import { BaseGrid } from '../ui/base-grid';

interface GridConfig {
  initialRows?: number;
  cols?: number;
}

/** Mirrors CaseStudyCard's `metrics` contract, which is the only consumer. */
export interface CaseStudyMetric {
  id: string;
  name: string;
  value: string;
  category: string;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  slug?: string | null;
  case_study_metrics: CaseStudyMetric[];
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