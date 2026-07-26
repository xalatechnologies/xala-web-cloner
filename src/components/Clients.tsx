import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import ClientMarquee from './clients/ClientMarquee';
import clientsData from '@/data/clients.json';

const Clients = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('clients');

  return (
    <section id="clients" className="py-20 md:py-24 relative overflow-hidden bg-background highlight-gradient section-styled">
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
          {/* 120s made the logos look frozen; 40s reads as motion without distracting. */}
          <ClientMarquee clients={clientsData} rows={2} speedSeconds={40} />
        </div>
      </div>
    </section>
  );
};

export default Clients;