import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import TechnologyGrid from './technologies/TechnologyGrid';
import technologiesData from '@/data/technologies.json';

interface TechnologiesProps {
  /**
   * Heading level for the section title. The page hosting this section
   * owns the h1; this stays an h1 only where the section leads the page.
   */
  headingLevel?: 'h1' | 'h2';
}

const Technologies = ({ headingLevel = 'h1' }: TechnologiesProps = {}) => {
  const { t } = useTranslation();
  const { data: section } = useSection('technologies');
  const Heading = headingLevel;

  // Technologies are language-independent (just icons and names)
  const technologies = technologiesData;

  const renderContent = () => {
    if (!technologies.length) {
      return (
        <div className="text-center text-muted-foreground">
          {t('technologies.noData', 'No technologies available')}
        </div>
      );
    }

    return (
      <TechnologyGrid
        technologies={technologies}
        initialRows={2}
        cols={3}
      />
    );
  };

  // The section's dark: gradient stops referenced undefined xala-* colours, so
  // the gradient rendered transparent. Dropped rather than re-coloured, to keep
  // the rendered result identical.
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background highlight-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <Heading className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            {section?.title || t('technologies.title', 'Technologies We Use')}
          </Heading>
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