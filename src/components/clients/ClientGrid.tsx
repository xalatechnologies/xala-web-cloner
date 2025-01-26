import ClientCard from './ClientCard';
import SectionGrid from '../ui/section-grid';
import type { Database } from '@/integrations/supabase/types';

type Client = Database['public']['Tables']['clients']['Row'];

interface ClientGridProps {
  clients: Client[];
  columns: number;
  rows: number;
}

const ClientGrid = ({ clients, columns, rows }: ClientGridProps) => {
  return (
    <SectionGrid columns={columns} rows={rows}>
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          name={client.name}
          logoUrl={client.logo_url}
        />
      ))}
    </SectionGrid>
  );
};

export default ClientGrid;