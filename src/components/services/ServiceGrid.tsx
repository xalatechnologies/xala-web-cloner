import ServiceCard from './ServiceCard';

/** Shape of an entry in src/data/services.json. */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** The platform types built under this category. */
  platforms?: { title: string; description: string; slug?: string }[];
  /** Landing page for this category. */
  slug?: string;
}

interface ServiceGridProps {
  services: Service[];
  /** Label for each category's read-more link. */
  readMoreLabel?: string;
  /** Active UI language, used for Norwegian title hyphenation. */
  language?: string;
}

const ServiceGrid = ({ services, language, readMoreLabel }: ServiceGridProps) => {
  const serviceCards = services.map((service) => (
    <ServiceCard
      key={service.id}
      icon={service.icon}
      title={service.title}
      description={service.description}
      platforms={service.platforms}
      slug={service.slug}
      readMoreLabel={readMoreLabel}
      language={language}
    />
  ));

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{serviceCards}</div>
  );
};

export default ServiceGrid;