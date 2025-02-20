import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalaxyBackground from './hero/GalaxyBackground';
import FloatingIcons from './hero/FloatingIcons';
import FeatureCards from './hero/FeatureCards';
import ActionButtons from './hero/ActionButtons';
import { useSection } from '@/hooks/use-section';
import { Skeleton } from './ui/skeleton';
import GradientText from './ui/gradient-text';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const { data: heroSection, isLoading: heroLoading } = useSection('hero');
  const { data: welcomeSection, isLoading: welcomeLoading } = useSection('hero_welcome');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderGradientTitle = (title: string) => {
    const words = title.split(' ');
    
    return (
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
        {words.map((word, index) => (
          <span key={index}>
            {index === words.length - 1 ? (
              <GradientText>{word}</GradientText>
            ) : (
              <span className="text-xala-text">{word} </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const isLoading = heroLoading || welcomeLoading;

  return (
    <section id="home" className="relative min-h-[60vh] pt-20 sm:pt-[5%] flex items-center justify-center overflow-hidden py-[5%]">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
      
      <GalaxyBackground />
      <FloatingIcons />
      
      <div className={`max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-2.5 sm:space-y-4 text-center">
          <div className="inline-block">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-xala-accent">
              {welcomeSection?.title || (i18n.language === 'no' ? 'Velkommen' : 'Welcome')}
              <span className="ml-1 text-white/50">✨</span>
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-14 w-3/4 mx-auto" />
              <Skeleton className="h-16 w-2/3 mx-auto" />
            </div>
          ) : (
            <>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
                {heroSection?.title && renderGradientTitle(heroSection.title)}
              </h1>

              <p className="text-lg sm:text-xl text-xala-text/90 max-w-2xl mx-auto leading-relaxed font-light">
                {heroSection?.description}
              </p>
            </>
          )}
          
          <div className="mt-8 sm:mt-12">
            <FeatureCards />
          </div>
          <div className="mt-6 sm:mt-8">
            <ActionButtons onSectionClick={handleSectionClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;