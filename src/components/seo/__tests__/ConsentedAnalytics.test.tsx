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
 * First HTML must not load advertising or analytics gtag. The banner says
 * «Kun nødvendige» loads none of the trackers; a tag in index.html would
 * make that copy false before anyone has chosen.
 */
describe('the Google tag is not in first HTML', () => {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');

  it('does not load gtag.js in the document head', () => {
    expect(html).not.toContain('googletagmanager.com/gtag/js');
    expect(html).not.toContain(GOOGLE_ADS_ID);
    expect(html).not.toContain(GOOGLE_ANALYTICS_ID);
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
    expect(headText()).not.toContain('googletagmanager');
  });

  it('injects nothing when the visitor chose essential only', () => {
    window.localStorage.setItem(CONSENT_KEY, 'essential-only');
    render(<ConsentedAnalytics {...IDS} />);
    expect(scripts()).toHaveLength(0);
    expect(headText()).not.toContain('googletagmanager');
    expect(headText()).not.toContain(GOOGLE_ADS_ID);
    expect(headText()).not.toContain(GOOGLE_ANALYTICS_ID);
  });

  it('injects gtag, Clarity and Plausible once the visitor accepted all', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    expect(headText()).toContain('googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID);
    expect(headText()).toContain(`gtag('config', '${GOOGLE_ADS_ID}')`);
    expect(headText()).toContain(`gtag('config', '${GOOGLE_ANALYTICS_ID}'`);
    expect(headText()).toContain('clarity.ms');
    expect(headText()).toContain('plausible.io');
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
