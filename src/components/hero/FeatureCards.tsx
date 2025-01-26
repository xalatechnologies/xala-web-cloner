import React from 'react';
import { Brain, CloudIcon, Code, BarChart as ChartIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureCards = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto my-12">
      <FeatureCard
        icon={<Brain />}
        title={t('hero.features.aiSolutions')}
        description={t('hero.features.aiDesc')}
      />
      <FeatureCard
        icon={<CloudIcon />}
        title={t('hero.features.cloudIntegration')}
        description={t('hero.features.cloudDesc')}
      />
      <FeatureCard
        icon={<Code />}
        title={t('hero.features.customDev')}
        description={t('hero.features.customDevDesc')}
      />
      <FeatureCard
        icon={<ChartIcon />}
        title={t('hero.features.dataAnalytics')}
        description={t('hero.features.dataDesc')}
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
        {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-xala-accent" })}
      </div>
      <h3 className="text-lg font-semibold text-xala-accent">{title}</h3>
      <p className="text-sm text-xala-text/80">{description}</p>
    </div>
  </div>
);

export default FeatureCards;