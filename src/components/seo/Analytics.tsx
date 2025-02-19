import { Helmet } from 'react-helmet-async';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
  plausibleDomain?: string;
}

export const Analytics = ({
  googleAnalyticsId,
  microsoftClarityId,
  plausibleDomain
}: AnalyticsProps) => {
  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
              });
            `}
          </script>
        </>
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
            }
          };
        `}
      </script>
    </Helmet>
  );
};

export default Analytics;
