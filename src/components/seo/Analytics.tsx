import { Helmet } from 'react-helmet-async';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
  plausibleDomain?: string;
  /** Google Ads account tag, `AW-…`. Only passed once marketing is consented. */
  googleAdsId?: string;
}

export const Analytics = ({
  googleAnalyticsId,
  microsoftClarityId,
  plausibleDomain,
  googleAdsId
}: AnalyticsProps) => {
  // One loader for every Google id on the page. GA4 and Google Ads are the same
  // library reading the same dataLayer, so the script is fetched once and each
  // id gets its own config line. Pasting Google's copy-paste snippet next to the
  // existing one would run the bootstrap twice and redefine gtag(), which is
  // where double-counted page views come from.
  const googleIds = [googleAnalyticsId, googleAdsId].filter(Boolean) as string[];

  return (
    <Helmet>
      {googleIds.length > 0 && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}`} />
      )}
      {googleIds.length > 0 && (
        <script>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Consent Mode v2. This component only renders once the visitor
              // has accepted, so the denied defaults hold for a single tick
              // before the update grants — but the order still matters: Google
              // treats a tag that never declared defaults differently from one
              // that declared and then updated them.
              //
              // The trade-off worth knowing: a visitor who declines gets no tag
              // at all, so Google never hears a denied signal and cannot model
              // their conversions or add them to an EEA audience. That is the
              // cost of not loading anything without consent, and it is the
              // deliberate choice here. Loading the tag for everyone with
              // ad_storage denied is the other valid reading of Consent Mode;
              // switching to it means mounting this outside the consent gate.
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
              gtag('consent', 'update', {
                'ad_storage': ${googleAdsId ? "'granted'" : "'denied'"},
                'ad_user_data': ${googleAdsId ? "'granted'" : "'denied'"},
                'ad_personalization': ${googleAdsId ? "'granted'" : "'denied'"},
                'analytics_storage': ${googleAnalyticsId ? "'granted'" : "'denied'"}
              });

              gtag('js', new Date());
              ${googleAnalyticsId
                ? `gtag('config', '${googleAnalyticsId}', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
              });`
                : ''}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ''}
            `}
        </script>
      )}

      {/* Microsoft Clarity */}
      {microsoftClarityId && (
        <script>
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityId}");
          `}
        </script>
      )}

      {/* Plausible Analytics (Privacy-Focused) */}
      {plausibleDomain && (
        <script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}

      {/* Cookie Consent Integration */}
      <script>
        {`
          window.cookieConsentConfig = {
            analytics: {
              ga: ${!!googleAnalyticsId},
              clarity: ${!!microsoftClarityId},
              plausible: ${!!plausibleDomain}
            },
            marketing: {
              googleAds: ${!!googleAdsId}
            }
          };
        `}
      </script>
    </Helmet>
  );
};

export default Analytics;
