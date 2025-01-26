import ServiceCard from "./ServiceCard";
import { Tables } from "@/integrations/supabase/types";

interface ServiceGridProps {
  services: Tables<'services'>[];
  columns: number;
  rows: number;
}

const ServiceGrid = ({ services, columns, rows }: ServiceGridProps) => {
  return (
    <div 
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
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