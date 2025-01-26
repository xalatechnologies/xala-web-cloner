import ServiceCard from "./ServiceCard";
import { Tables } from "@/integrations/supabase/types";

interface ServiceGridProps {
  services: Tables<'services'>[];
  columns: number;
  rows: number;
}

const ServiceGrid = ({ services, columns, rows }: ServiceGridProps) => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;