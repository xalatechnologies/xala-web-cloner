
import { useTranslation } from 'react-i18next';
import { Zap, TrendingUp, Lightbulb, Heart } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

export default function ValueProps() {
  const { t } = useTranslation();

  const values = [
    {
      title: t('valueProps.fastDelivery.title'),
      description: t('valueProps.fastDelivery.description'),
      icon: Zap
    },
    {
      title: t('valueProps.scalableSolutions.title'),
      description: t('valueProps.scalableSolutions.description'),
      icon: TrendingUp
    },
    {
      title: t('valueProps.expertise.title'),
      description: t('valueProps.expertise.description'),
      icon: Lightbulb
    },
    {
      title: t('valueProps.fullService.title'),
      description: t('valueProps.fullService.description'),
      icon: Heart
    }
  ];

  return (
    <Section tone="muted" size="md" styled container={false}>
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="section-heading mb-6">
            {t('valueProps.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t('valueProps.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <SurfaceCard key={index}>
                <div className="flex items-center gap-4 mb-5">
                  <CardIcon>
                    <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </CardIcon>
                  <h3 className="card-heading group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300 pl-0 md:pl-[68px]">
                  {value.description}
                </p>
              </SurfaceCard>
            );
          })}
        </div>
      </div>
    </Section>
  );
}