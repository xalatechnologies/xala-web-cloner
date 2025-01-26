import ServiceCard from "./ServiceCard";
import SectionGrid from '../ui/section-grid';
import { Tables } from "@/integrations/supabase/types";

interface ServiceGridProps {
  services: Tables<'services'>[];
  columns: number;
  rows: number;
}

const ServiceGrid = ({ services, columns, rows }: ServiceGridProps) => {
  return (
    <SectionGrid columns={columns} rows={rows}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
        />
      ))}
    </SectionGrid>
  );
};

export default ServiceGrid;