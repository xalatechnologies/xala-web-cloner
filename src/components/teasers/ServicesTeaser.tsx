
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brain, Cloud, Laptop, Smartphone, ChevronRight } from 'lucide-react';

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
    <section className="py-16 md:py-20 bg-background section-styled">
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
              <div
                key={index}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                                group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/10 
                                transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon aligned with title in a row */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative shrink-0">
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 bg-primary/25 rounded-xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300 pl-0 md:pl-[68px]">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/tjenester"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('teasers.services.viewAll')}
            <ChevronRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}