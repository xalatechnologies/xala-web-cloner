import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FinalCTA() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 md:py-24 bg-background bg-sky-bottom">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading">
          {t('finalCTA.title')}
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light max-w-4xl mx-auto">
          {t('finalCTA.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <Link
            to="/kontakt"
            className="inline-flex items-center px-10 py-5 border border-transparent text-xl font-medium rounded-pill text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group btn-primary"
          >
            {t('finalCTA.startConversation')}
            <svg className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
          <Link
            to="/caser"
            className="inline-flex items-center px-10 py-5 border border-border text-xl font-medium rounded-pill text-foreground bg-background hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group btn-ghost"
          >
            {t('finalCTA.viewCases')}
            <svg className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="text-muted-foreground">
          <p className="text-lg">
            {t('finalCTA.callUs')} <span className="font-bold text-xl">+47 123 45 678</span> {t('finalCTA.emailUs')}{' '}
            <span className="font-bold text-xl">hei@xala.no</span>
          </p>
        </div>
      </div>
    </section>
  );
}