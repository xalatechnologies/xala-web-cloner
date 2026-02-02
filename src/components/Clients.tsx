import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import ClientMarquee from './clients/ClientMarquee';
import clientsData from '@/data/clients.json';

// Convert JSON data to expected format
interface Client {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

const Clients = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('clients');

  // Use static JSON data - no loading, no Supabase
  const clients: Client[] = clientsData.map(c => ({
    id: c.id,
    name: c.name,
    logo_url: c.logoUrl,
    website_url: c.websiteUrl,
  }));

  return (
    <section id="clients" className="py-20 md:py-24 relative overflow-hidden bg-background highlight-gradient section-styled">
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
            {section?.title || t('clients.title')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            {section?.description || t('clients.description')}
          </p>
        </div>

        <div className="space-y-12">
          <ClientMarquee clients={clients as any} rows={2} speedSeconds={120} />
        </div>
      </div>
    </section>
  );
};

export default Clients;