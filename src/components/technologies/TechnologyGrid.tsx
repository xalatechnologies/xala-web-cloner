import TechnologyCard from './TechnologyCard';
import SectionGrid from '../ui/section-grid';
import { Database } from '@/integrations/supabase/types';

type Technology = Database['public']['Tables']['technologies']['Row'] & {
  technology_tools: Database['public']['Tables']['technology_tools']['Row'][];
};

interface TechnologyGridProps {
  technologies: Technology[];
  columns: number;
  rows: number;
}

const TechnologyGrid = ({ technologies, columns, rows }: TechnologyGridProps) => {
  return (
    <SectionGrid columns={columns} rows={rows}>
      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          icon={tech.icon}
          title={tech.title}
          description={tech.description || undefined}
          tools={tech.technology_tools}
        />
      ))}
    </SectionGrid>
  );
};

export default TechnologyGrid;