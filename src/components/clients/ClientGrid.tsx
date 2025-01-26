import ClientCard from './ClientCard';
import type { Database } from '@/integrations/supabase/types';

type Client = Database['public']['Tables']['clients']['Row'];

interface ClientGridProps {
  clients: Client[];
  columns: number;
  rows: number;
}

const ClientGrid = ({ clients, columns, rows }: ClientGridProps) => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          name={client.name}
          logoUrl={client.logo_url}
        />
      ))}
    </div>
  );
};

export default ClientGrid;