import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FinalCTA() {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 dark:bg-gradient-to-br dark:from-background dark:via-muted dark:to-background text-primary-foreground dark:text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {t('finalCTA.title')}
        </h2>
        <p className="text-xl md:text-2xl text-primary-foreground/90 dark:text-muted-foreground mb-8 leading-relaxed">
          {t('finalCTA.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/kontakt"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-primary-foreground dark:text-foreground bg-card hover:bg-accent transition-colors shadow-lg"
          >
            {t('finalCTA.startConversation')}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
          <Link
            to="/caser"
            className="inline-flex items-center px-8 py-4 border border-primary-foreground/30 dark:border-border text-lg font-medium rounded-lg text-primary-foreground dark:text-foreground bg-primary-foreground/10 dark:bg-accent hover:bg-primary-foreground/20 dark:hover:bg-accent/80 backdrop-blur-sm transition-colors"
          >
            {t('finalCTA.viewCases')}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="mt-8 text-primary-foreground/70 dark:text-muted-foreground">
          <p className="text-sm">
            {t('finalCTA.callUs')} <span className="font-semibold">+47 123 45 678</span> {t('finalCTA.emailUs')}{' '}
            <span className="font-semibold">hei@xala.no</span>
          </p>
        </div>
      </div>
    </section>
  );
}