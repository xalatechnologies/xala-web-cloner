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
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
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