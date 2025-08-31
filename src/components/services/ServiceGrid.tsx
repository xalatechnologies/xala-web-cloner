import ServiceCard from './ServiceCard';
import ExpandableGrid from '../ui/expandable-grid';
import { Tables } from "@/integrations/supabase/types";

interface ServiceGridProps {
  services: Tables<'services'>[];
  initialRows?: number;
  cols?: number;
}

const ServiceGrid = ({ services, initialRows, cols }: ServiceGridProps) => {
  const serviceCards = services.map((service) => (
    <ServiceCard
      key={service.id}
      icon={service.icon}
      title={service.title}
      description={service.description}
      // Pass image prop if available (would need to be added to the services table)
      image={service.image_url || undefined}
      // Pass language prop to handle Norwegian titles
      language={service.language}
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