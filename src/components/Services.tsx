import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import ServiceGrid from './services/ServiceGrid';
import MainLayout from './layouts/MainLayout';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

const Services = () => {
  const { t, i18n } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('services');

  const currentLanguage = (i18n.language.toLowerCase().split('-')[0] === 'en' ? 'en' : 'no') as SupportedLanguage;

  const { data: services = [], isLoading: isServicesLoading } = useQuery({
    queryKey: ['services', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch services');
      }

      return data || [];
    }
  });

  const isLoading = isSectionLoading || isServicesLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      );
    }

    if (!services.length) {
      return (
        <div className="text-center text-foreground py-16">
          <p className="text-xl">{t('No services available')}</p>
        </div>
      );
    }

    return <ServiceGrid services={services} initialRows={section?.rows || 2} cols={section?.columns || 3} />;
  };

  if (!section) return null;

  return (
    <MainLayout pageId="services">
      <section id="services" className="py-24 bg-background hero-gradient dark:bg-background">
        <div className="container">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="text-xl leading-8 text-muted-foreground">
                {section.description}
              </p>
            </div>
            {renderContent()}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;