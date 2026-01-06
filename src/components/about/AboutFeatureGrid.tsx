import AboutFeatureCard from './AboutFeatureCard';
import ExpandableGrid from '../ui/expandable-grid';

interface AboutFeatureGridProps {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  initialRows?: number;
}

const AboutFeatureGrid = ({ features, initialRows = 1 }: AboutFeatureGridProps) => {
  return (
    <ExpandableGrid
      items={features.map((feature, index) => (
        <AboutFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
      initialRows={initialRows}
    />
  );
};

export default AboutFeatureGrid;