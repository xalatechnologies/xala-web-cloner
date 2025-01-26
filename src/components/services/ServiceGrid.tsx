import ServiceCard from './ServiceCard';
import ExpandableGrid from '../ui/expandable-grid';
import { Tables } from "@/integrations/supabase/types";

interface ServiceGridProps {
  services: Tables<'services'>[];
}

const ServiceGrid = ({ services }: ServiceGridProps) => {
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
      initialRows={1}
    />
  );
};

export default ServiceGrid;