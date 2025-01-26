import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import ClientGrid from './clients/ClientGrid';
import ClientCarousel from './clients/ClientCarousel';

const Clients = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('clients');

  const { data: clients, isLoading } = useQuery({
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${section?.columns || 4}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${section?.rows || 2}, minmax(0, 1fr))`
          }}
        >
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-40">
              <Skeleton className="w-full h-full rounded-xl bg-xala-secondary/50" />
            </div>
          ))}
        </div>
      );
    }

    if (!clients) return null;

    return section?.carousel ? (
      <ClientCarousel 
        clients={clients}
        columns={section.columns || 4}
        autoscroll={section.autoscroll || false}
      />
    ) : (
      <ClientGrid 
        clients={clients}
        columns={section.columns || 4}
        rows={section.rows || 2}
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