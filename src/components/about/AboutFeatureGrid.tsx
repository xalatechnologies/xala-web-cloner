import AboutFeatureCard from './AboutFeatureCard';
import SectionGrid from '../ui/section-grid';

interface AboutFeatureGridProps {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  columns: number;
  rows: number;
}

const AboutFeatureGrid = ({ features, columns, rows }: AboutFeatureGridProps) => {
  return (
    <SectionGrid columns={columns} rows={rows}>
      {features.map((feature, index) => (
        <AboutFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </SectionGrid>
  );
};

export default AboutFeatureGrid;