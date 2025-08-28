import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactTeaser() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 md:py-24 bg-primary dark:bg-gradient-to-br dark:from-background dark:via-muted dark:to-background text-primary-foreground dark:text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 font-heading">
          {t('teasers.contact.title')}
        </h2>
        <p className="text-xl md:text-2xl text-primary-foreground/90 dark:text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          {t('teasers.contact.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 dark:bg-accent backdrop-blur-sm surface">
            <div className="text-3xl mb-4">📧</div>
            <div className="text-2xl font-bold mb-2 font-heading">{t('teasers.contact.contactInfo.email.title')}</div>
            <div className="text-xl text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.email.value')}</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 dark:bg-accent backdrop-blur-sm surface">
            <div className="text-3xl mb-4">📞</div>
            <div className="text-2xl font-bold mb-2 font-heading">{t('teasers.contact.contactInfo.phone.title')}</div>
            <div className="text-xl text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.phone.value')}</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 dark:bg-accent backdrop-blur-sm surface">
            <div className="text-3xl mb-4">📍</div>
            <div className="text-2xl font-bold mb-2 font-heading">{t('teasers.contact.contactInfo.address.title')}</div>
            <div className="text-xl text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.address.value')}</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/kontakt"
            className="inline-flex items-center px-10 py-5 border border-transparent text-xl font-medium rounded-pill text-primary-foreground dark:text-foreground bg-card hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group btn-primary"
          >
            {t('teasers.contact.getInTouch')}
            <svg className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
          <Link
            to="/caser"
            className="inline-flex items-center px-10 py-5 border border-primary-foreground/30 dark:border-border text-xl font-medium rounded-pill text-primary-foreground dark:text-foreground bg-primary-foreground/10 dark:bg-accent hover:bg-primary-foreground/20 dark:hover:bg-accent/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group btn-ghost"
          >
            {t('teasers.contact.viewCases')}
            <svg className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}