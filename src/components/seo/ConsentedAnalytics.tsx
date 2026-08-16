import { analyticsAllowed, useConsent } from '../gdpr/consent';
import Analytics from './Analytics';

interface ConsentedAnalyticsProps {
  microsoftClarityId?: string;
  plausibleDomain?: string;
}

/**
 * Mounts gtag, Clarity and Plausible once, for the whole app, and only after
 * the visitor has accepted cookies. Essential-only, reject, and the default
 * before a choice leave every tracker unloaded.
 */
const ConsentedAnalytics = ({ microsoftClarityId, plausibleDomain }: ConsentedAnalyticsProps) => {
  const consent = useConsent();
  if (!analyticsAllowed(consent)) return null;
  return <Analytics microsoftClarityId={microsoftClarityId} plausibleDomain={plausibleDomain} />;
};

export default ConsentedAnalytics;
