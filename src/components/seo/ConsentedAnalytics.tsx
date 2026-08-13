import { analyticsAllowed, useConsent } from '../gdpr/consent';
import Analytics from './Analytics';

interface ConsentedAnalyticsProps {
  microsoftClarityId?: string;
  plausibleDomain?: string;
}

/**
 * Mounts Clarity and Plausible once, for the whole app, and only after the
 * visitor has accepted cookies.
 *
 * The Google tag is not gated here — it is in index.html and loads for every
 * visitor, so Google Ads can detect it.
 */
const ConsentedAnalytics = ({ microsoftClarityId, plausibleDomain }: ConsentedAnalyticsProps) => {
  const consent = useConsent();
  if (!analyticsAllowed(consent)) return null;
  return <Analytics microsoftClarityId={microsoftClarityId} plausibleDomain={plausibleDomain} />;
};

export default ConsentedAnalytics;
