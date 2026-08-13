import { analyticsAllowed, marketingAllowed, useConsent } from '../gdpr/consent';
import Analytics from './Analytics';

interface ConsentedAnalyticsProps {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
  plausibleDomain?: string;
  googleAdsId?: string;
}

/**
 * Mounts the analytics and advertising tags once, for the whole app, and only
 * after the visitor has accepted the cookies each one needs.
 *
 * Two things were wrong before. The tags were only reachable through
 * <SEO analytics={...}>, and Contact.tsx was the single component that passed
 * that prop — so Google Analytics, Clarity and Plausible loaded on /kontakt and
 * nowhere else. And they loaded without reference to the consent banner.
 *
 * The purposes are kept apart on the way in rather than upstream, so the two
 * predicates stay the only place the rule lives. Today they agree, because the
 * banner offers accept-all or essential-only and nothing between; when it grows
 * a "statistics only" choice, an id simply stops being passed and no tag has to
 * learn about consent.
 */
const ConsentedAnalytics = ({
  googleAnalyticsId,
  microsoftClarityId,
  plausibleDomain,
  googleAdsId
}: ConsentedAnalyticsProps) => {
  const consent = useConsent();
  const analytics = analyticsAllowed(consent);
  const marketing = marketingAllowed(consent);

  if (!analytics && !marketing) return null;

  return (
    <Analytics
      googleAnalyticsId={analytics ? googleAnalyticsId : undefined}
      microsoftClarityId={analytics ? microsoftClarityId : undefined}
      plausibleDomain={analytics ? plausibleDomain : undefined}
      googleAdsId={marketing ? googleAdsId : undefined}
    />
  );
};

export default ConsentedAnalytics;
