import { analyticsAllowed, useConsent } from '../gdpr/consent';
import Analytics from './Analytics';

interface ConsentedAnalyticsProps {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
  plausibleDomain?: string;
}

/**
 * Mounts the analytics tags once, for the whole app, and only after the visitor
 * has accepted analytics cookies.
 *
 * Two things were wrong before. The tags were only reachable through
 * <SEO analytics={...}>, and Contact.tsx was the single component that passed
 * that prop — so Google Analytics, Clarity and Plausible loaded on /kontakt and
 * nowhere else. And they loaded without reference to the consent banner.
 */
const ConsentedAnalytics = (props: ConsentedAnalyticsProps) => {
  const consent = useConsent();
  if (!analyticsAllowed(consent)) return null;
  return <Analytics {...props} />;
};

export default ConsentedAnalytics;
