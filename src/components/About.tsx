import { Brain, Rocket, Users, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import AboutFeatureGrid from './about/AboutFeatureGrid';
import AboutFeatureCarousel from './about/AboutFeatureCarousel';

const About = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('about');

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('about.features.innovation.title'),
      description: t('about.features.innovation.description')
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: t('about.features.future.title'),
      description: t('about.features.future.description')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('about.features.client.title'),
      description: t('about.features.client.description')
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: t('about.features.technical.title'),
      description: t('about.features.technical.description')
    }
  ];

  const renderContent = () => {
    if (section?.carousel) {
      return (
        <AboutFeatureCarousel
          features={features}
          columns={section?.columns || 4}
          autoscroll={section?.autoscroll || false}
        />
      );
    }

    return (
      <AboutFeatureGrid
        features={features}
        columns={section?.columns || 4}
      />
    );
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-[#1a1f3d] to-xala-primary opacity-90" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2MiwgODQsIDI0MiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#0EA5E9] text-transparent bg-clip-text">
            {section?.title || t('about.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {section?.description || t('about.description')}
          </p>
        </div>

        {/* Features Grid or Carousel */}
        {renderContent()}

        {/* Vision Statement */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#9b87f5]/10 via-[#D946EF]/10 to-[#0EA5E9]/10 
                      border border-white/10 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              {t('about.vision.title')}
            </h3>
            <p className="text-lg text-white/80 leading-relaxed">
              {t('about.vision.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;