import TechnologyCard from './TechnologyCard';
import ExpandableGrid from '../ui/expandable-grid';

interface Technology {
  id: string;
  name: string;
  category: string;
  icon: string;
}

interface TechnologyGridProps {
  technologies: Technology[];
  initialRows?: number;
  cols?: number;
}

const TechnologyGrid = ({ technologies, initialRows = 2, cols = 3 }: TechnologyGridProps) => {
  const technologyCards = technologies.map((tech) => (
    <TechnologyCard
      key={tech.id}
      name={tech.name}
      category={tech.category}
      icon={tech.icon}
    />
  ));

  return (
    <ExpandableGrid
      items={technologyCards}
      initialRows={initialRows}
      cols={cols}
    />
  );
};

export default TechnologyGrid;