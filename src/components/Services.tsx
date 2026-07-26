import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import ServiceGrid from './services/ServiceGrid';
import servicesData from '@/data/services.json';

type Language = 'no' | 'en' | 'ar';

const Services = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('services');

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  // Get services from JSON
  const services = servicesData[currentLanguage] || servicesData.no;

  const renderContent = () => {
    if (!services.length) {
      return (
        <div className="text-center text-foreground py-16">
          <p className="text-xl">{t('No services available')}</p>
        </div>
      );
    }

    return <ServiceGrid services={services} language={currentLanguage} initialRows={2} cols={3} />;
  };

  // Section data with fallbacks
  const sectionTitle = section?.title || t('services.title', 'Our Services');
  const sectionDescription = section?.description || t('services.description', '');

  // Head tags come from RouteSEO, mounted once per route in App.tsx.
  return (
    <>
      <section id="services" className="py-24 bg-background hero-gradient dark:bg-background">
        <div className="container">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {sectionTitle}
              </h2>
              <p className="text-xl leading-8 text-muted-foreground">
                {sectionDescription}
              </p>
            </div>
            {renderContent()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;