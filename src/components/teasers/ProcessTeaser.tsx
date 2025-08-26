import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProcessTeaser() {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/80 to-primary/60 dark:bg-gradient-to-br dark:from-background dark:via-muted dark:to-background text-primary-foreground dark:text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('teasers.process.title')}
            </h2>
            <p className="text-lg text-primary-foreground/90 dark:text-muted-foreground mb-6">
              {t('teasers.process.description')}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">01</div>
                <div className="text-sm text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.process.steps.mapping')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">02</div>
                <div className="text-sm text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.process.steps.design')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">03</div>
                <div className="text-sm text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.process.steps.development')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">04</div>
                <div className="text-sm text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.process.steps.delivery')}</div>
              </div>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <Link 
              to="/slik-vi-jobber" 
              className="inline-flex items-center px-6 py-3 border border-primary-foreground/20 dark:border-border text-base font-medium rounded-md text-primary-foreground dark:text-foreground bg-primary-foreground/10 dark:bg-accent hover:bg-primary-foreground/20 dark:hover:bg-accent/80 backdrop-blur-sm transition-colors"
            >
              {t('teasers.process.readProcess')}
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