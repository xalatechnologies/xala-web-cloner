import TechnologyCard from './TechnologyCard';
import ExpandableGrid from '../ui/expandable-grid';
import { Database } from '@/integrations/supabase/types';

type Technology = Database['public']['Tables']['technologies']['Row'] & {
  technology_tools: Database['public']['Tables']['technology_tools']['Row'][];
};

interface TechnologyGridProps {
  technologies: Technology[];
}

const TechnologyGrid = ({ technologies }: TechnologyGridProps) => {
  const technologyCards = technologies.map((tech) => (
    <TechnologyCard
      key={tech.id}
      icon={tech.icon}
      title={tech.title}
      description={tech.description || undefined}
      tools={tech.technology_tools}
    />
  ));

  return (
    <ExpandableGrid 
      items={technologyCards}
      initialRows={1}
    />
  );
};

export default TechnologyGrid;