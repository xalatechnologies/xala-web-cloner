import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import AboutFeatureCard from './about/AboutFeatureCard';
import { useAboutFeatures } from '@/hooks/use-about-features';
import { Skeleton } from './ui/skeleton';

const About = () => {
  const { t } = useTranslation();
  const { data: aboutSection } = useSection('about');
  const { data: visionSection } = useSection('vision');
  const { data: features, isLoading: isFeaturesLoading } = useAboutFeatures();

  const isLoading = isFeaturesLoading;

  if (isLoading) {
    return (
      <section id="about" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-lg bg-muted">
                <Skeleton className="h-12 w-12 mb-4" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
            ))}
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-5/6 mx-auto mt-2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-background hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground">{aboutSection?.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">{aboutSection?.description}</p>
        </div>

        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl w-full">
            {features?.map((feature) => (
              <AboutFeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>

        {visionSection && (
          <div className="mt-12 sm:mt-20 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border dark:bg-gradient-to-r dark:from-[#9b87f5]/10 dark:via-[#D946EF]/10 dark:to-[#0EA5E9]/10">
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
                {visionSection.title}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {visionSection.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;