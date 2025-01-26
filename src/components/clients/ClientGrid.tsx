import ClientCard from './ClientCard';
import ExpandableGrid from '../ui/expandable-grid';
import type { Database } from '@/integrations/supabase/types';

type Client = Database['public']['Tables']['clients']['Row'];

interface ClientGridProps {
  clients: Client[];
}

const ClientGrid = ({ clients }: ClientGridProps) => {
  const clientCards = clients.map((client) => (
    <ClientCard
      key={client.id}
      name={client.name}
      logoUrl={client.logo_url}
    />
  ));

  return (
    <ExpandableGrid 
      items={clientCards}
      initialRows={1}
    />
  );
};

export default ClientGrid;