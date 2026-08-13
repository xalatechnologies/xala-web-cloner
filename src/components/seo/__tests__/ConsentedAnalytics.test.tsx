import { render, waitFor } from '@testing-library/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, beforeEach } from 'vitest';
import ConsentedAnalytics from '../ConsentedAnalytics';
import { CONSENT_KEY } from '../../gdpr/consent';

/**
 * The gate, pinned.
 *
 * This repo has already shipped the failure once: the banner wrote its answer
 * to localStorage and nothing read it back, so the tags loaded whatever the
 * visitor pressed. Nothing in the type system or the build catches that — the
 * component still renders, the tags still work, and only a visitor's network
 * tab shows the difference. So it gets a test that fails if the gate is
 * removed, rather than a comment asking the next person not to remove it.
 */
const IDS = {
  googleAnalyticsId: 'G-TEST',
  microsoftClarityId: 'clarity-test',
  plausibleDomain: 'example.test',
  googleAdsId: 'AW-TEST'
};

/**
 * Renders the gate behind a sentinel, and resolves only once Helmet has
 * actually written to <head>.
 *
 * The barrier is the whole point. Without it, `await waitFor(() =>
 * expect(head).not.toContain('googletagmanager'))` passes on its first
 * evaluation — at that moment Helmet has not flushed and the head is empty, so
 * the assertion is true for the wrong reason. Verified: with the consent gate
 * deleted, the earlier version of these tests still passed. The sentinel is
 * emitted by the same Helmet pass as the tags, so once it is present, anything
 * the gate allowed through is present too.
 */
async function renderGate() {
  render(
    <HelmetProvider>
      <Helmet>
        <meta name="test-helmet-flushed" content="yes" />
      </Helmet>
      <ConsentedAnalytics {...IDS} />
    </HelmetProvider>
  );
  await waitFor(() => {
    expect(document.head.querySelector('meta[name="test-helmet-flushed"]')).not.toBeNull();
  });
}

/** Everything Helmet put in <head>, as one searchable string. */
function headText(): string {
  return document.head.innerHTML;
}

describe('ConsentedAnalytics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.head.innerHTML = '';
  });

  it('loads nothing at all before the visitor has answered', async () => {
    await renderGate();
    expect(headText()).not.toContain('googletagmanager');
    expect(headText()).not.toContain('AW-TEST');
    expect(headText()).not.toContain('clarity.ms');
    expect(headText()).not.toContain('plausible.io');
  });

  it('loads nothing when the visitor chose essential only', async () => {
    window.localStorage.setItem(CONSENT_KEY, 'essential-only');
    await renderGate();
    expect(headText()).not.toContain('googletagmanager');
    expect(headText()).not.toContain('AW-TEST');
  });

  it('loads the Google Ads tag once the visitor accepted all', async () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    await renderGate();
    expect(headText()).toContain('AW-TEST');
    expect(headText()).toContain('googletagmanager');
    expect(headText()).toContain('clarity.ms');
    expect(headText()).toContain('plausible.io');
  });

  it('fetches the gtag.js library exactly once for two Google ids', async () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    await renderGate();
    expect(headText()).toContain('AW-TEST');
    // Both GA4 and Ads run off one loader and one dataLayer. A second copy of
    // Google's own snippet would redefine gtag() and double-count page views.
    const loaders = document.head.querySelectorAll(
      'script[src*="googletagmanager.com/gtag/js"]'
    );
    expect(loaders).toHaveLength(1);
  });

  it('declares Consent Mode defaults before granting them', async () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    await renderGate();
    expect(headText()).toContain('AW-TEST');
    const inline = headText();
    const defaultAt = inline.indexOf("gtag('consent', 'default'");
    const updateAt = inline.indexOf("gtag('consent', 'update'");
    const configAt = inline.indexOf("gtag('config', 'AW-TEST')");
    expect(defaultAt).toBeGreaterThan(-1);
    expect(updateAt).toBeGreaterThan(defaultAt);
    expect(configAt).toBeGreaterThan(updateAt);
    expect(inline).toContain("'ad_user_data': 'granted'");
  });
});
