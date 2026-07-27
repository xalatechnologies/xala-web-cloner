import ServiceCard from './ServiceCard';

/** Shape of an entry in src/data/services.json. */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** The platform types built under this category. */
  platforms?: { title: string; description: string; slug?: string }[];
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
      platforms={service.platforms}
      language={language}
    />
  ));

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{serviceCards}</div>
  );
};

export default ServiceGrid;