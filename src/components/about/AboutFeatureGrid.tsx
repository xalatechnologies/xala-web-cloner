import AboutFeatureCard from './AboutFeatureCard';

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
    <div 
      className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}
    >
      {features.map((feature, index) => (
        <AboutFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default AboutFeatureGrid;