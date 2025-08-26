import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServicesTeaser() {
  const { t } = useTranslation();
  
  const services = [
    {
      title: t('teasers.services.aiMachineLearning.title'),
      description: t('teasers.services.aiMachineLearning.description'),
      icon: '🤖'
    },
    {
      title: t('teasers.services.cloudSolutions.title'),
      description: t('teasers.services.cloudSolutions.description'),
      icon: '☁️'
    },
    {
      title: t('teasers.services.webDevelopment.title'),
      description: t('teasers.services.webDevelopment.description'),
      icon: '💻'
    },
    {
      title: t('teasers.services.mobileDevelopment.title'),
      description: t('teasers.services.mobileDevelopment.description'),
      icon: '📱'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('teasers.services.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('teasers.services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/tjenester" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            {t('teasers.services.viewAll')}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}