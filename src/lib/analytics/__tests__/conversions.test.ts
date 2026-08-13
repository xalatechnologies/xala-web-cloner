import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * The rule worth pinning: a mailto is not a conversion.
 *
 * `submitForm` returns 'mailto' when it has only opened the visitor's mail
 * client, which is an intent and not a lead — the message may never be sent.
 * Reporting it to Google Ads would train the account to buy clicks from people
 * who never wrote to us, and that mistake is invisible until months of spend
 * have gone through it.
 */
async function loadModule(labels: Record<string, string> = {}) {
  vi.resetModules();
  vi.stubEnv('VITE_ADS_LABEL_CONTACT', labels.contact ?? '');
  vi.stubEnv('VITE_ADS_LABEL_APPLICATION', labels.application ?? '');
  return import('../conversions');
}

describe('trackConversion', () => {
  beforeEach(() => {
    // Absent by default: the tag mounts only after consent, so "no gtag" is the
    // normal case rather than the edge case.
    delete (window as { gtag?: unknown }).gtag;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    delete (window as { gtag?: unknown }).gtag;
  });

  it('does not throw when the visitor declined and no tag is loaded', async () => {
    const { trackConversion } = await loadModule({ contact: 'abc123' });
    expect(() => trackConversion('contact', 'posted')).not.toThrow();
    expect(trackConversion('contact', 'posted')).toBe(false);
  });

  it('reports a posted submission to Google Ads with the configured label', async () => {
    const gtag = vi.fn();
    (window as { gtag?: unknown }).gtag = gtag;
    const { trackConversion } = await loadModule({ contact: 'abc123' });

    expect(trackConversion('contact', 'posted')).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead');
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: 'AW-18385967405/abc123',
    });
  });

  it('never reports a mailto handoff as a conversion', async () => {
    const gtag = vi.fn();
    (window as { gtag?: unknown }).gtag = gtag;
    const { trackConversion } = await loadModule({ contact: 'abc123' });

    expect(trackConversion('contact', 'mailto')).toBe(false);
    const sentToAds = gtag.mock.calls.some(([, action]) => action === 'conversion');
    expect(sentToAds).toBe(false);
    // Still visible in GA4, so the gap between "opened the mail client" and
    // "we received something" can be measured rather than guessed at.
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead_mailto');
  });

  it('sends the committed contact label when no env var is configured', async () => {
    // The production path, and the one that was broken by construction: the
    // deploy builds on a runner with no env file, so a label that lived only
    // in .env.local would have reached local builds and never production —
    // indistinguishable from working, recording nothing.
    const gtag = vi.fn();
    (window as { gtag?: unknown }).gtag = gtag;
    const { trackConversion } = await loadModule();

    expect(trackConversion('contact', 'posted')).toBe(true);
    expect(gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: 'AW-18385967405/1l7dCKGNk-EcEK2yjr9E',
    });
  });

  it('fires the GA4 event but no Ads conversion while the label is unset', async () => {
    const gtag = vi.fn();
    (window as { gtag?: unknown }).gtag = gtag;
    const { trackConversion } = await loadModule();

    expect(trackConversion('application', 'posted')).toBe(false);
    expect(gtag).toHaveBeenCalledWith('event', 'submit_application');
    const sentToAds = gtag.mock.calls.some(([, action]) => action === 'conversion');
    expect(sentToAds).toBe(false);
  });
});
