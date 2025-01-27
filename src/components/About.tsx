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
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-lg bg-xala-secondary/20">
                <Skeleton className="h-12 w-12 mb-4" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
            ))}
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
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{aboutSection?.title}</h2>
          <p className="text-lg text-xala-text/80">{aboutSection?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features?.map((feature) => (
            <AboutFeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        {visionSection && (
          <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#9b87f5]/10 via-[#D946EF]/10 to-[#0EA5E9]/10 
                      border border-white/10 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                {visionSection.title}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
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