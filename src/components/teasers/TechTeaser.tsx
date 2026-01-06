import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TechTeaser() {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('teasers.tech.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('teasers.tech.description')}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['React', 'TypeScript', 'Azure', 'AWS', 'Node.js', 'Python'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <Link 
              to="/teknologi" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              {t('teasers.tech.viewTechnology')}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}