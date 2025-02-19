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

  const currentLanguage = i18n.language.toLowerCase() as SupportedLanguage;

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
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    if (!services.length) {
      return (
        <div className="text-center text-xala-text">
          <p>{t('No services available')}</p>
        </div>
      );
    }

    return <ServiceGrid services={services} initialRows={section?.rows || 2} cols={section?.columns || 3} />;
  };

  if (!section) return null;

  return (
    <MainLayout pageId="services">
      <section id="services" className="py-20 bg-xala-secondary relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {section.title}
              </h2>
              <p className="text-lg leading-8 text-xala-text">
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