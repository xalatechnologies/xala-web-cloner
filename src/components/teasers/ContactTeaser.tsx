import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Clock, ChevronRight } from 'lucide-react';

export default function ContactTeaser() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-24 bg-primary dark:bg-gradient-to-br dark:from-background dark:via-muted dark:to-background text-primary-foreground dark:text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          {t('teasers.contact.title')}
        </h2>
        <p className="text-xl md:text-2xl text-primary-foreground/90 dark:text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          {t('teasers.contact.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 dark:bg-accent backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-primary-foreground/90 dark:text-foreground" />
            </div>
            <div className="text-2xl font-bold mb-2">{t('teasers.contact.contactInfo.email.title')}</div>
            <div dir="ltr" className="text-xl text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.email.value')}</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 dark:bg-accent backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Phone className="w-12 h-12 text-primary-foreground/90 dark:text-foreground" />
            </div>
            <div className="text-2xl font-bold mb-2">{t('teasers.contact.contactInfo.phone.title')}</div>
            <div dir="ltr" className="text-xl text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.contactInfo.phone.value')}</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/10 dark:bg-accent backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Clock className="w-12 h-12 text-primary-foreground/90 dark:text-foreground" />
            </div>
            <div className="text-2xl font-bold mb-2">{t('teasers.contact.responseTime.title')}</div>
            <div className="text-xl text-primary-foreground/80 dark:text-muted-foreground">{t('teasers.contact.responseTime.value')}</div>
          </div>
        </div>

        <Link
          to="/kontakt"
          className="inline-flex items-center px-10 py-5 border border-primary-foreground/20 dark:border-border text-xl font-medium rounded-xl text-primary-foreground dark:text-foreground bg-primary-foreground/10 dark:bg-accent hover:bg-primary-foreground/20 dark:hover:bg-accent/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 dark:hover:text-amber-500"
        >
          {t('teasers.contact.getInTouch')}
          <ChevronRight className="ms-3 h-6 w-6 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}