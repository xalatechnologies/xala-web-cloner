import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import ServiceGrid from './services/ServiceGrid';
import servicesData from '@/data/services.json';

type Language = 'no' | 'en' | 'ar';

interface ServicesProps {
  /**
   * Heading level for the section title. The page that hosts this section owns
   * the h1; this stays an h1 only where the section leads the page.
   */
  headingLevel?: 'h1' | 'h2';
}

const Services = ({ headingLevel = 'h1' }: ServicesProps) => {
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

    return (
      <ServiceGrid
        services={services}
        language={currentLanguage}
        readMoreLabel={t('servicePage.readMoreCategory', 'Se hele tjenesten')}
      />
    );
  };

  const Heading = headingLevel;

  // Section data with fallbacks
  const sectionTitle = section?.title || t('services.title', 'Our Services');
  const sectionDescription = section?.description || t('services.description', '');

  // Head tags come from RouteSEO, mounted once per route in App.tsx.
  return (
    <>
      <section
        id="services"
        className="pb-16 pt-10 md:pb-24 md:pt-14 bg-background hero-gradient dark:bg-background"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <div className="flex flex-col gap-12">
            {/* Left-aligned rather than centred: the page header above it is
                left-aligned, and two stacked centred blocks read as two
                unrelated pages glued together. The lead sits beside the heading
                from lg up so the intro spans the same width as the cards. */}
            <div className="section-header">
              <p className="mb-5 eyebrow">
                {t('services.eyebrow', 'Hva vi leverer')}
              </p>
              <Heading
                id="services-heading"
                className="section-heading"
              >
                {sectionTitle}
              </Heading>
              <p className="section-lead mt-5 max-w-[52ch]">
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