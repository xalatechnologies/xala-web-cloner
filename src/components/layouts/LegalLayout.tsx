import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'no' ? nb : enUS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-xala-primary/5 to-transparent">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-xala-primary mb-6">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-xala-text/60">
            <Clock className="w-4 h-4" />
            <span>{t('lastUpdated')}:</span>
            <time dateTime={lastUpdated}>
              {format(new Date(lastUpdated), 'PPP', { locale })}
            </time>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12 md:space-y-16">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-xala-text/10 text-center text-sm text-xala-text/60">
          <p> {new Date().getFullYear()} Xala Technologies AS. {t('legal.allRightsReserved')}</p>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
