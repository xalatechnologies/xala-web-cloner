import ClientCard from './ClientCard';
import ExpandableGrid from '../ui/expandable-grid';
import type { Database } from '@/integrations/supabase/types';

type Client = Database['public']['Tables']['clients']['Row'];

interface ClientGridProps {
  clients: Client[];
  initialRows?: number;
}

const ClientGrid = ({ clients, initialRows }: ClientGridProps) => {
  const clientCards = clients.map((client) => (
    <ClientCard
      key={client.id}
      name={client.name}
      logoUrl={client.logo_url}
    />
  ));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
      {clientCards}
    </div>
  );
};

export default ClientGrid;