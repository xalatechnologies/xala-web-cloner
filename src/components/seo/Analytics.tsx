import { useEffect } from 'react';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
  plausibleDomain?: string;
  /** Google Ads account tag, `AW-…`. Only passed once marketing is consented. */
  googleAdsId?: string;
}

/** Marks the nodes this component owns, so cleanup removes those and nothing else. */
const MARKER = 'data-xala-analytics';

/**
 * Loads the analytics and advertising tags, by putting them in the document
 * itself rather than describing them to a head manager.
 *
 * **This used to go through react-helmet-async, and it silently did nothing.**
 * Not a subtle degradation — GA4, Clarity and Plausible never loaded on
 * xala.no at all, for as long as the tags have been configured. Measured on
 * production 2026-08-13 with cookies accepted: `window.gtag`, `window.clarity`
 * and `window.plausible` all undefined, zero requests to any of the three, and
 * `window.cookieConsentConfig` unset even though that script had no condition
 * on it. Reproduced against a production build with a MutationObserver on
 * `<head>`: this component rendered with the right ids, and Helmet performed
 * **zero** head mutations. Helmet's `<meta>` output from RouteSEO worked
 * throughout, so the library was alive — it just never commits `<script>`,
 * including a plain `src`-only tag with no inline body.
 *
 * So scripts are appended directly. Three details make that correct rather
 * than merely different:
 *
 * - **Inline scripts are built with `createElement` and appended.** Execution
 *   is triggered by insertion, so the body has to be set before the append —
 *   `.text` here. (Setting `.innerHTML` on the element instead would work
 *   identically; what is genuinely inert is parsing `<script>` *markup* into
 *   some container's `innerHTML`, which never runs. Worth knowing which of the
 *   two rules is the real one before reaching for either.)
 * - **The loader is fetched once for every Google id.** GA4 and Google Ads are
 *   the same library over the same dataLayer; a second copy of Google's
 *   snippet would redefine `gtag()` and double-count page views.
 * - **Cleanup removes the nodes, and that is not the same as undoing them.**
 *   Once gtag has run it has set its cookies and the library stays in memory;
 *   removing the tag stops the next page view, not this one. Withdrawing
 *   consent properly needs a reload, which is why the banner is the only thing
 *   that grants and the gate above decides mount, not this component.
 */
export const Analytics = ({
  googleAnalyticsId,
  microsoftClarityId,
  plausibleDomain,
  googleAdsId
}: AnalyticsProps) => {
  useEffect(() => {
    const added: HTMLScriptElement[] = [];

    const append = (
      attrs: Record<string, string>,
      body?: string
    ): void => {
      const node = document.createElement('script');
      node.setAttribute(MARKER, '');
      for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
      // .text, never innerHTML — an inline script assigned through innerHTML
      // never executes.
      if (body) node.text = body;
      document.head.appendChild(node);
      added.push(node);
    };

    const googleIds = [googleAnalyticsId, googleAdsId].filter(Boolean) as string[];

    if (googleIds.length > 0) {
      append({ async: '', src: `https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}` });

      // Consent Mode v2. This component mounts only after the visitor has
      // accepted, so the denied defaults hold for one tick before the update
      // grants them — but Google treats a tag that declared defaults and then
      // updated differently from one that never declared any, so the order is
      // kept.
      //
      // Known trade-off: a visitor who declines gets no tag, so Google hears
      // no denied signal and cannot model their conversion or place them in an
      // EEA audience. That is the price of loading nothing without consent.
      // Loading the tag for everyone with ad_storage denied is the other valid
      // reading of Consent Mode, and would mean mounting outside the gate.
      append(
        {},
        [
          'window.dataLayer = window.dataLayer || [];',
          'function gtag(){dataLayer.push(arguments);}',
          `gtag('consent', 'default', {'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});`,
          `gtag('consent', 'update', {` +
            `'ad_storage':'${googleAdsId ? 'granted' : 'denied'}',` +
            `'ad_user_data':'${googleAdsId ? 'granted' : 'denied'}',` +
            `'ad_personalization':'${googleAdsId ? 'granted' : 'denied'}',` +
            `'analytics_storage':'${googleAnalyticsId ? 'granted' : 'denied'}'});`,
          `gtag('js', new Date());`,
          googleAnalyticsId
            ? `gtag('config', '${googleAnalyticsId}', {'anonymize_ip': true, 'cookie_flags': 'SameSite=None;Secure'});`
            : '',
          googleAdsId ? `gtag('config', '${googleAdsId}');` : ''
        ]
          .filter(Boolean)
          .join('\n')
      );
    }

    if (microsoftClarityId) {
      append(
        {},
        `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};` +
          `t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;` +
          `y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})` +
          `(window, document, "clarity", "script", "${microsoftClarityId}");`
      );
    }

    if (plausibleDomain) {
      append({
        defer: '',
        'data-domain': plausibleDomain,
        src: 'https://plausible.io/js/script.js'
      });
    }

    append(
      {},
      `window.cookieConsentConfig = ${JSON.stringify({
        analytics: {
          ga: !!googleAnalyticsId,
          clarity: !!microsoftClarityId,
          plausible: !!plausibleDomain
        },
        marketing: { googleAds: !!googleAdsId }
      })};`
    );

    return () => {
      for (const node of added) node.remove();
    };
  }, [googleAnalyticsId, microsoftClarityId, plausibleDomain, googleAdsId]);

  return null;
};

export default Analytics;
