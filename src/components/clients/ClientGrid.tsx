import ClientCard from './ClientCard';

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

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