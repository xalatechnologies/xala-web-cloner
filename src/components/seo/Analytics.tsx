import { useEffect } from 'react';

interface AnalyticsProps {
  microsoftClarityId?: string;
  plausibleDomain?: string;
}

/** Marks the nodes this component owns, so cleanup removes those and nothing else. */
const MARKER = 'data-xala-analytics';

/**
 * Loads Clarity and Plausible after the visitor has accepted cookies.
 *
 * The Google tag is NOT here — it lives in index.html and loads for everyone,
 * because a tag that only appears after someone presses "Godta alle" is
 * invisible to Google Ads and Tag Assistant, which never press it. Loading it
 * here as well would run Google's snippet twice, redefining gtag() and
 * double-counting page views.
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
