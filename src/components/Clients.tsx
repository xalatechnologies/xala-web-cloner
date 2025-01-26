import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import ClientGrid from './clients/ClientGrid';

const Clients = () => {
  const { t } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('clients');

  const { data: clients, isLoading: isClientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }
      
      return data;
    }
  });

  const isLoading = isSectionLoading || isClientsLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-40">
              <Skeleton className="w-full h-full rounded-xl bg-xala-secondary/50" />
            </div>
          ))}
        </div>
      );
    }

    if (!clients?.length) {
      return (
        <div className="text-center text-xala-text">
          {t('clients.noClients')}
        </div>
      );
    }

    return (
      <ClientGrid 
        clients={clients}
      />
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 text-white">
            {section?.title || t('clients.title')}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {section?.description || t('clients.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default Clients;