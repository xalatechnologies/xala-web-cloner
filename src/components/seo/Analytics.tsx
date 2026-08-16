import { useEffect } from 'react';
import { GOOGLE_ADS_ID, GOOGLE_ANALYTICS_ID } from '@/lib/analytics/ids';

interface AnalyticsProps {
  microsoftClarityId?: string;
  plausibleDomain?: string;
}

/** Marks the nodes this component owns, so cleanup removes those and nothing else. */
const MARKER = 'data-xala-analytics';

/**
 * Loads gtag, Clarity and Plausible after the visitor has accepted cookies.
 *
 * The Google tag used to live in index.html and fire for every visitor, which
 * made «Kun nødvendige» a no-op for advertising and analytics. It is gated
 * here with the other trackers: first HTML, reject, and essential-only must
 * not inject gtag.js. Accepting all still loads the same two existing ids.
 *
 * These scripts are appended directly rather than through react-helmet-async,
 * which silently never commits a <script> — that bug is why the tags on this
 * site never loaded at all until 13 Aug 2026.
 */
export const Analytics = ({ microsoftClarityId, plausibleDomain }: AnalyticsProps) => {
  useEffect(() => {
    const added: HTMLScriptElement[] = [];

    const append = (attrs: Record<string, string>, body?: string): void => {
      const node = document.createElement('script');
      node.setAttribute(MARKER, '');
      for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
      if (body) node.text = body;
      document.head.appendChild(node);
      added.push(node);
    };

    // One loader serves both the Ads and GA4 ids, same snippet as before —
    // only the moment it is injected has changed.
    append({
      async: '',
      src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`,
    });
    append(
      {},
      `window.dataLayer = window.dataLayer || [];` +
        `function gtag(){dataLayer.push(arguments);}` +
        `gtag('js', new Date());` +
        `gtag('config', '${GOOGLE_ADS_ID}');` +
        `gtag('config', '${GOOGLE_ANALYTICS_ID}', { 'anonymize_ip': true });`
    );

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

    return () => {
      // Removing the node stops the next page view, not this one: a tag that
      // already ran has set its cookies and spawned its own scripts.
      for (const node of added) node.remove();
    };
  }, [microsoftClarityId, plausibleDomain]);

  return null;
};

export default Analytics;
