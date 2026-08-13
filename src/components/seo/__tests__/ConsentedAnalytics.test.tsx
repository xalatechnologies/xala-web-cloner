import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ConsentedAnalytics from '../ConsentedAnalytics';
import { CONSENT_KEY } from '../../gdpr/consent';
import { GOOGLE_ADS_ID, GOOGLE_ANALYTICS_ID } from '@/lib/analytics/ids';

const IDS = { microsoftClarityId: 'clarity-test', plausibleDomain: 'example.test' };
const scripts = () => [...document.head.querySelectorAll('script')];
const headText = () => scripts().map(s => s.src + ' ' + s.text).join('\n');

/**
 * The Google tag has to be in index.html, not injected after consent.
 *
 * A tag that only appears once someone presses "Godta alle" is invisible to
 * Google Ads and Tag Assistant, because neither presses it — so the account
 * reports the tag as not installed. This asserts the file, since nothing else
 * in the suite would notice it being moved back.
 */
describe('the Google tag in index.html', () => {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');

  it('loads gtag.js unconditionally in the head', () => {
    expect(html).toContain('googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID);
    expect(html.indexOf('gtag/js')).toBeLessThan(html.indexOf('</head>'));
  });

  it('configures both the Ads and GA4 ids', () => {
    expect(html).toContain(`gtag('config', '${GOOGLE_ADS_ID}')`);
    expect(html).toContain(`gtag('config', '${GOOGLE_ANALYTICS_ID}'`);
  });
});

describe('ConsentedAnalytics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.head.innerHTML = '';
  });

  it('injects nothing before the visitor has answered', () => {
    render(<ConsentedAnalytics {...IDS} />);
    expect(scripts()).toHaveLength(0);
  });

  it('injects nothing when the visitor chose essential only', () => {
    window.localStorage.setItem(CONSENT_KEY, 'essential-only');
    render(<ConsentedAnalytics {...IDS} />);
    expect(scripts()).toHaveLength(0);
  });

  it('injects Clarity and Plausible once the visitor accepted all', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    expect(headText()).toContain('clarity.ms');
    expect(headText()).toContain('plausible.io');
  });

  it('never injects a second copy of the Google tag', () => {
    // It is already in index.html; loading it again would redefine gtag() and
    // double-count page views.
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    expect(headText()).not.toContain('googletagmanager');
  });

  it('removes its own nodes on unmount', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    const { unmount } = render(<ConsentedAnalytics {...IDS} />);
    const ours = () => document.head.querySelectorAll('[data-xala-analytics]');
    expect(ours().length).toBeGreaterThan(0);
    unmount();
    expect(ours()).toHaveLength(0);
  });
});
