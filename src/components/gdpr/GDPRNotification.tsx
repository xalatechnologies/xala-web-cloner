import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cookie, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONSENT_KEY, setConsent } from './consent';

export function GDPRNotification() {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);

  // Check if user has already accepted GDPR
  useEffect(() => {
    const hasAcceptedGDPR = localStorage.getItem(CONSENT_KEY);
    if (!hasAcceptedGDPR) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowNotification(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Content based on language - using i18n
  const content = {
    title: t('gdpr.title'),
    content: t('gdpr.content'),
    acceptText: t('gdpr.acceptAll'),
    declineText: t('gdpr.essentialOnly'),
    learnMore: t('gdpr.learnMore')
  };

  // Routed through setConsent so the analytics mount actually reacts to the
  // choice — writing localStorage directly left the banner decorative.
  const handleAccept = () => {
    setConsent('all');
    setShowNotification(false);
  };

  const handleDecline = () => {
    setConsent('essential');
    setShowNotification(false);
  };

  if (!showNotification) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "animate-in slide-in-from-bottom-full duration-500"
      )}
    >
      {/* Solid dark background for guaranteed contrast */}
      <div className="absolute inset-0 bg-slate-900 border-t border-slate-700" />

      <div className="relative container mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">

          {/* Icon and content */}
          <div className="flex items-start gap-4 flex-1">
            <div className="shrink-0 p-3 rounded-xl bg-primary/20 hidden sm:block">
              <Cookie className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary sm:hidden" />
                <h3 className="font-semibold text-white text-lg">
                  {content.title}
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                {content.content}{' '}
                <Link
                  to="/cookies"
                  className="text-primary hover:underline font-medium"
                >
                  {content.learnMore}
                </Link>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 lg:flex-none border-slate-600 text-white hover:bg-slate-800 hover:text-white bg-transparent"
            >
              {content.declineText}
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 lg:flex-none bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              {content.acceptText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
