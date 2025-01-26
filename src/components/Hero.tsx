import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalaxyBackground from './hero/GalaxyBackground';
import FloatingIcons from './hero/FloatingIcons';
import FeatureCards from './hero/FeatureCards';
import ActionButtons from './hero/ActionButtons';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
      
      <GalaxyBackground />
      <FloatingIcons />
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-8 text-center">
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-xala-accent">
              {t('hero.welcome')}
              <span className="ml-2 text-white/50">✨</span>
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
            {t('hero.title')}{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] text-transparent bg-clip-text">
                {t('hero.excellence')}
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-xala-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-xala-text/90 max-w-3xl mx-auto leading-relaxed font-light">
            {t('hero.description')}
          </p>
          
          <FeatureCards />
          <ActionButtons onSectionClick={scrollToSection} />
        </div>
      </div>
    </section>
  );
};

export default Hero;