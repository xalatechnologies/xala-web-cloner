import TechnologyCard from './TechnologyCard';
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
    <div 
      className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}
    >
      {technologies.map((tech) => (
        <TechnologyCard
          key={tech.id}
          icon={tech.icon}
          title={tech.title}
          description={tech.description || undefined}
          tools={tech.technology_tools}
        />
      ))}
    </div>
  );
};

export default TechnologyGrid;