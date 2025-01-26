import ServiceCard from './ServiceCard';
import ExpandableGrid from '../ui/expandable-grid';
import { Tables } from "@/integrations/supabase/types";

interface ServiceGridProps {
  services: Tables<'services'>[];
  initialRows?: number;
}

const ServiceGrid = ({ services, initialRows }: ServiceGridProps) => {
  const serviceCards = services.map((service) => (
    <ServiceCard
      key={service.id}
      icon={service.icon}
      title={service.title}
      description={service.description}
    />
  ));

  return (
    <ExpandableGrid 
      items={serviceCards}
      initialRows={initialRows}
    />
  );
};

export default ServiceGrid;