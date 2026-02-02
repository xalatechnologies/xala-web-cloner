import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brain, Cloud, Laptop, Smartphone } from 'lucide-react';

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
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('teasers.services.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('teasers.services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index} 
                className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
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
            <svg className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}