import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ChevronRight } from 'lucide-react';

export default function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-muted via-background to-muted dark:from-muted/50 dark:via-background dark:to-muted/50 text-foreground section-styled">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
          {t('finalCTA.title')}
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light max-w-4xl mx-auto">
          {t('finalCTA.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <Link
            to="/kontakt"
            className="inline-flex items-center px-10 py-5 border border-transparent text-xl font-medium rounded-xl text-foreground dark:text-foreground bg-card hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group dark:hover:text-primary"
          >
            {t('finalCTA.startConversation')}
            <MessageCircle className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/caser"
            className="inline-flex items-center px-10 py-5 border border-border text-xl font-medium rounded-xl text-foreground bg-card hover:bg-accent backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group hover:text-primary"
          >
            {t('finalCTA.viewCases')}
            <ChevronRight className="ms-3 h-6 w-6 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="text-muted-foreground">
          <p className="text-lg">
            {t('finalCTA.callUs')} <span dir="ltr" className="font-bold text-xl">+47 966 65 001</span> {t('finalCTA.emailUs')}{' '}
            <span className="font-bold text-xl">Info@xala.no</span>
          </p>
        </div>
      </div>
    </section>
  );
}