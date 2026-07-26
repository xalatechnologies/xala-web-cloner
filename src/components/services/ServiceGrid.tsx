import ServiceCard from './ServiceCard';
import ExpandableGrid from '../ui/expandable-grid';

/** Shape of an entry in src/data/services.json. */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServiceGridProps {
  services: Service[];
  /** Active UI language, used for Norwegian title hyphenation. */
  language?: string;
  initialRows?: number;
  cols?: number;
}

const ServiceGrid = ({ services, language, initialRows, cols }: ServiceGridProps) => {
  const serviceCards = services.map((service) => (
    <ServiceCard
      key={service.id}
      icon={service.icon}
      title={service.title}
      description={service.description}
      image={service.image || undefined}
      language={language}
    />
  ));

  return (
    <div className="mt-12">
      <ExpandableGrid 
        items={serviceCards}
        initialRows={initialRows}
        cols={cols}
      />
    </div>
  );
};

export default ServiceGrid;