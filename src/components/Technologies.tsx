import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import TechnologyGrid from './technologies/TechnologyGrid';
import technologiesData from '@/data/technologies.json';

const Technologies = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('technologies');

  // Technologies are language-independent (just icons and names)
  const technologies = technologiesData;

  const renderContent = () => {
    if (!technologies.length) {
      return (
        <div className="text-center text-xala-text">
          {t('technologies.noData', 'No technologies available')}
        </div>
      );
    }

    return (
      <TechnologyGrid
        technologies={technologies as any}
        initialRows={2}
        cols={3}
      />
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background dark:bg-gradient-to-b dark:from-xala-secondary dark:via-xala-primary dark:to-xala-secondary highlight-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            {section?.title || t('technologies.title', 'Technologies We Use')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-6">
            {section?.description || t('technologies.description', '')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default Technologies;