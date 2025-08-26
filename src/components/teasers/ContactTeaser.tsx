import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactTeaser() {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-16 bg-primary dark:bg-gradient-to-br dark:from-background dark:via-muted dark:to-background text-primary-foreground dark:text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('teasers.contact.title')}
        </h2>
        <p className="text-lg text-primary-foreground/90 dark:text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('teasers.contact.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-medium">{t('teasers.contact.contactInfo.email.title')}</div>
            <div className="text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.email.value')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📞</div>
            <div className="font-medium">{t('teasers.contact.contactInfo.phone.title')}</div>
            <div className="text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.phone.value')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="font-medium">{t('teasers.contact.contactInfo.responseTime.title')}</div>
            <div className="text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.responseTime.value')}</div>
          </div>
        </div>
        
        <Link 
          to="/kontakt" 
          className="inline-flex items-center px-8 py-3 border border-primary-foreground/20 dark:border-border text-base font-medium rounded-md text-primary-foreground dark:text-foreground bg-primary-foreground/10 dark:bg-accent hover:bg-primary-foreground/20 dark:hover:bg-accent/80 backdrop-blur-sm transition-colors"
        >
          {t('teasers.contact.getInTouch')}
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}