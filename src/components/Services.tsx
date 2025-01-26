import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ServiceGrid from './services/ServiceGrid';
import { Skeleton } from './ui/skeleton';
import type { Tables, Enums } from '@/integrations/supabase/types';

type SupportedLanguage = Enums<'supported_language'>;

const Services = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('services');

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', i18n.language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('language', i18n.language as SupportedLanguage)
        .order('sort_order');
      
      if (error) {
        console.error('Error fetching services:', error);
        return [];
      }
      
      return data;
    }
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-64">
              <Skeleton className="w-full h-full rounded-xl bg-white/5" />
            </div>
          ))}
        </div>
      );
    }

    if (!services?.length) {
      return (
        <div className="text-center text-white/70">
          {t('services.noServices')}
        </div>
      );
    }

    return (
      <ServiceGrid 
        services={services}
        initialRows={section?.rows || 1}
      />
    );
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-[#1a1f3d] to-xala-primary opacity-90" />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2MiwgODQsIDI0MiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#0EA5E9] text-transparent bg-clip-text">
            {section?.title || t('services.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {section?.description || t('services.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default Services;