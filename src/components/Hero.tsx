import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import GalaxyBackground from './hero/GalaxyBackground';
import FloatingIcons from './hero/FloatingIcons';
import FeatureCards from './hero/FeatureCards';
import ActionButtons from './hero/ActionButtons';
import { useSection } from '@/hooks/use-section';
import { Skeleton } from './ui/skeleton';
import GradientText from './ui/gradient-text';
import { useBusinessHero } from '@/i18n/business-content';
import { Badge } from './ui/badge';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const { data: _heroSection, isLoading: heroLoading } = useSection('hero');
  const { data: welcomeSection, isLoading: welcomeLoading } = useSection('hero_welcome');
  const businessHero = useBusinessHero();

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
    <section id="home" className="relative min-h-[60vh] pt-24 sm:pt-[6%] flex items-center justify-center overflow-hidden py-[5%] bg-background">
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(16,24,40,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
      
      <GalaxyBackground />
      <FloatingIcons />
      
      <div className={`max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-2.5 sm:space-y-4 text-center">
          <div className="inline-block">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent text-accent-foreground backdrop-blur-sm border border-border text-sm font-medium">
              {welcomeSection?.title || (i18n.language === 'no' ? 'Velkommen' : 'Welcome')}
              <Sparkles className="ml-1 w-4 h-4 opacity-70" />
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-14 w-3/4 mx-auto" />
              <Skeleton className="h-16 w-2/3 mx-auto" />
            </div>
          ) : (
            <>
              {/* Business Hero Title */}
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
                {renderGradientTitle(businessHero.title)}
              </h1>

              {/* Business Partnership Subtitle */}
              <h2 className="text-xl sm:text-2xl text-primary font-medium mb-4">
                {businessHero.subtitle}
              </h2>

              {/* Business Value Description */}
              <p className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto leading-relaxed font-light">
                {businessHero.description}
              </p>

              {/* Business Value Propositions */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge variant="secondary" className="hover:bg-muted">
                  {businessHero.value.partnership}
                </Badge>
                <Badge variant="secondary" className="hover:bg-muted">
                  {businessHero.value.transformation}
                </Badge>
                <Badge variant="secondary" className="hover:bg-muted">
                  {businessHero.value.results}
                </Badge>
                <Badge variant="secondary" className="hover:bg-muted">
                  {businessHero.value.innovation}
                </Badge>
              </div>
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