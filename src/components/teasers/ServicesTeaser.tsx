
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brain, Cloud, Laptop, Smartphone, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

export default function ServicesTeaser() {
  const { t } = useTranslation();

  const services = [
    {
      title: t('teasers.services.aiMachineLearning.title'),
      description: t('teasers.services.aiMachineLearning.description'),
      icon: Brain
    },
    {
      title: t('teasers.services.cloudSolutions.title'),
      description: t('teasers.services.cloudSolutions.description'),
      icon: Cloud
    },
    {
      title: t('teasers.services.webDevelopment.title'),
      description: t('teasers.services.webDevelopment.description'),
      icon: Laptop
    },
    {
      title: t('teasers.services.mobileDevelopment.title'),
      description: t('teasers.services.mobileDevelopment.description'),
      icon: Smartphone
    }
  ];

  return (
    <Section tone="default" size="sm" styled container={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('teasers.services.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('teasers.services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <SurfaceCard key={index}>
                <div className="flex items-center gap-4 mb-5">
                  <CardIcon>
                    <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </CardIcon>
                  <h3 className="text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300 pl-0 md:pl-[68px]">
                  {service.description}
                </p>
              </SurfaceCard>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/tjenester"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('teasers.services.viewAll')}
            <ChevronRight className="ms-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  );
}