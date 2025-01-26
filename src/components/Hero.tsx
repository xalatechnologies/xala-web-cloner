import { useEffect, useState } from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server, ArrowRight, Cloud as CloudIcon, Code, BarChart as ChartIcon, Sparkles, Star, StarHalf } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

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

  // Floating icons component
  const FloatingIcons = () => (
    <>
      {/* Top left cluster */}
      <div className="absolute top-20 left-20 animate-float-1">
        <Brain className="w-8 h-8 text-xala-accent/30" />
      </div>
      <div className="absolute top-40 left-40 animate-float-2">
        <CircuitBoard className="w-6 h-6 text-xala-accent/20" />
      </div>
      
      {/* Top right cluster */}
      <div className="absolute top-32 right-24 animate-float-3">
        <Cpu className="w-10 h-10 text-xala-accent/25" />
      </div>
      <div className="absolute top-60 right-40 animate-float-1">
        <Database className="w-7 h-7 text-xala-accent/30" />
      </div>

      {/* Sparkling stars */}
      <div className="absolute top-1/4 left-1/3 animate-float-2">
        <Sparkles className="w-5 h-5 text-yellow-400/40" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-float-3">
        <Star className="w-4 h-4 text-yellow-400/30" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float-1">
        <StarHalf className="w-6 h-6 text-yellow-400/35" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float-2">
        <Sparkles className="w-5 h-5 text-yellow-400/40" />
      </div>

      {/* Bottom clusters */}
      <div className="absolute bottom-32 left-1/4 animate-float-3">
        <Network className="w-9 h-9 text-xala-accent/25" />
      </div>
      <div className="absolute bottom-40 right-1/3 animate-float-2">
        <Server className="w-8 h-8 text-xala-accent/30" />
      </div>
    </>
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
      
      {/* Add floating icons */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto my-12">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <Brain className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">{t('hero.features.aiSolutions')}</h3>
                <p className="text-sm text-xala-text/80">{t('hero.features.aiDesc')}</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <CloudIcon className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">{t('hero.features.cloudIntegration')}</h3>
                <p className="text-sm text-xala-text/80">{t('hero.features.cloudDesc')}</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <Code className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">{t('hero.features.customDev')}</h3>
                <p className="text-sm text-xala-text/80">{t('hero.features.customDevDesc')}</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <ChartIcon className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">{t('hero.features.dataAnalytics')}</h3>
                <p className="text-sm text-xala-text/80">{t('hero.features.dataDesc')}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-6 rounded-lg font-medium 
                       transition-all transform hover:scale-105
                       shadow-lg shadow-xala-accent/20
                       bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB]
                       hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5]
                       text-white"
            >
              {t('hero.getInTouch')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('work-process')}
              variant="outline"
              className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                       hover:bg-white/10 transition-all backdrop-blur-sm
                       border border-white/20"
            >
              {t('hero.ourProcess')}
              <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="outline"
              className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                       hover:bg-white/10 transition-all backdrop-blur-sm
                       border border-white/20"
            >
              {t('hero.aboutUs')}
              <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;