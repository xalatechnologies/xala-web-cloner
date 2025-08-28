import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import ClientGrid from './clients/ClientGrid';
import ClientMarquee from './clients/ClientMarquee';
import type { Database } from '@/integrations/supabase/types';

const Clients = () => {
  const { t } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('clients');

  const { data: clients = [], isLoading: isClientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch clients');
      }

      return data || [];
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

    // Fallback list sourced from public/clients folder to ensure logos render
    const fallbackClients: Array<Pick<Database['public']['Tables']['clients']['Row'], 'id' | 'name' | 'logo_url' | 'website_url' | 'language' | 'sort_order'>> = [
      { id: 'ssb', name: 'Statistics Norway', logo_url: '/clients/ssb.svg', website_url: 'https://www.ssb.no', language: 'en', sort_order: 10 },
      { id: 'nhn', name: 'Norsk Helsenett', logo_url: '/clients/nhn.svg', website_url: 'https://www.nhn.no', language: 'en', sort_order: 20 },
      { id: 'sykehuspartner', name: 'Sykehuspartner', logo_url: '/clients/sykehuspartner.svg', website_url: 'https://www.sykehuspartner.no', language: 'en', sort_order: 30 },
      { id: 'nov', name: 'NOV', logo_url: '/clients/nov2.svg', website_url: 'https://www.nov.com', language: 'en', sort_order: 40 },
      { id: 'ocha', name: 'OCHA', logo_url: '/clients/ocha.png', website_url: 'https://www.unocha.org', language: 'en', sort_order: 50 },
      { id: 'globalconnect', name: 'GlobalConnect', logo_url: '/clients/globelconnect.png', website_url: 'https://www.globalconnect.no', language: 'en', sort_order: 60 },
      { id: 'furst', name: 'Fürst', logo_url: '/clients/furst.png', website_url: 'https://www.furst.no', language: 'en', sort_order: 70 },
      { id: 'usaid', name: 'USAID', logo_url: '/clients/usaid.png', website_url: 'https://www.usaid.gov', language: 'en', sort_order: 80 },
      { id: 'norwegian', name: 'Norwegian', logo_url: '/clients/norwegian.svg', website_url: 'https://www.norwegian.com', language: 'en', sort_order: 90 },
      { id: 'altinn', name: 'Altinn', logo_url: '/clients/altinn.svg', website_url: 'https://www.altinn.no', language: 'en', sort_order: 100 },
      { id: 'unicef', name: 'UNICEF', logo_url: '/clients/unicef.png', website_url: 'https://www.unicef.org', language: 'en', sort_order: 110 },
      { id: 'nordre-follo', name: 'Nordre Follo kommune', logo_url: '/clients/nordre-follo.svg', website_url: 'https://www.nordrefollo.kommune.no', language: 'en', sort_order: 120 },
      { id: 'ruter', name: 'Ruter', logo_url: '/clients/ruter.png', website_url: 'https://www.ruter.no', language: 'en', sort_order: 140 },
      { id: 'sparebank', name: 'SpareBank 1', logo_url: '/clients/sparebank.png', website_url: 'https://www.sparebank1.no', language: 'en', sort_order: 150 },
    ];

    const fallbackMap = new Map(fallbackClients.map(fc => [fc.name.toLowerCase(), fc]));
    const normalizedDb = (clients || []).map((c) => {
      const key = (c.name || '').toLowerCase();
      const fb = fallbackMap.get(key);
      // Prefer local /clients assets if DB path missing or not set
      const logo = (!c.logo_url || c.logo_url.trim() === '' || !c.logo_url.startsWith('/clients/')) && fb
        ? fb.logo_url
        : c.logo_url;
      return { ...c, logo_url: logo } as Database['public']['Tables']['clients']['Row'];
    });

    const present = new Set(normalizedDb.map(c => (c.name || '').toLowerCase()));
    const mergedClients = [
      ...normalizedDb,
      ...fallbackClients.filter(fc => !present.has(fc.name.toLowerCase()))
    ] as unknown as Database['public']['Tables']['clients']['Row'][];

    // Marquee presentation for delightful motion; falls back to static grid if motion is reduced
    return (
      <div className="space-y-12">
        <ClientMarquee clients={mergedClients} rows={2} speedSeconds={120} />
      </div>
    );
  };

  return (
    <section id="clients" className="py-20 md:py-24 relative overflow-hidden bg-background">
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

        {renderContent()}
      </div>
    </section>
  );
};

export default Clients;