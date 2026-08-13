import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ConsentedAnalytics from '../ConsentedAnalytics';
import { CONSENT_KEY } from '../../gdpr/consent';

/**
 * The gate and the injection, both pinned.
 *
 * Two failures have already happened here and each one was invisible to a
 * green suite.
 *
 * 1. The banner wrote its answer to localStorage and nothing read it back, so
 *    the tags ignored what the visitor pressed.
 * 2. The tags went through react-helmet-async, which silently never committed
 *    a `<script>` — so nothing loaded at all, for anyone, ever. Rendering the
 *    component was not the same as the tag being present, and only the DOM
 *    knows the difference.
 *
 * So these tests assert on `document.head` itself, and the gate was
 * mutation-checked: delete it and two of these fail. That is verified rather
 * than assumed, because an earlier version of this file passed with the gate
 * deleted — a negative assertion wrapped in `waitFor` is satisfied before the
 * thing it guards has had a chance to happen. There is no `waitFor` here:
 * Testing Library's `render` flushes effects inside `act`, so the injection
 * has already run by the time it returns.
 */
const IDS = {
  googleAnalyticsId: 'G-TEST',
  microsoftClarityId: 'clarity-test',
  plausibleDomain: 'example.test',
  googleAdsId: 'AW-TEST'
};

const scripts = () => [...document.head.querySelectorAll('script')];
const headText = () => scripts().map(s => s.src + ' ' + s.text).join('\n');

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

  it('injects the Google Ads tag once the visitor accepted all', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    const text = headText();
    expect(text).toContain('AW-TEST');
    expect(text).toContain('googletagmanager.com/gtag/js');
    expect(text).toContain('clarity.ms');
    expect(text).toContain('plausible.io');
  });

  it('fetches the gtag.js library exactly once for two Google ids', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    const loaders = document.head.querySelectorAll(
      'script[src*="googletagmanager.com/gtag/js"]'
    );
    expect(loaders).toHaveLength(1);
  });

  it('configures the Ads id in an inline script with a body', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    const inline = scripts().filter(s => !s.src);
    expect(inline.length).toBeGreaterThan(0);
    for (const s of inline) expect(s.text.length).toBeGreaterThan(0);
    expect(inline.some(s => s.text.includes("gtag('config', 'AW-TEST')"))).toBe(true);
  });

  it('declares Consent Mode defaults before granting them', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    render(<ConsentedAnalytics {...IDS} />);
    const boot = scripts().find(s => s.text.includes("gtag('consent'"))?.text ?? '';
    const defaultAt = boot.indexOf("gtag('consent', 'default'");
    const updateAt = boot.indexOf("gtag('consent', 'update'");
    const configAt = boot.indexOf("gtag('config', 'AW-TEST')");
    expect(defaultAt).toBeGreaterThan(-1);
    expect(updateAt).toBeGreaterThan(defaultAt);
    expect(configAt).toBeGreaterThan(updateAt);
    expect(boot).toContain("'ad_user_data':'granted'");
  });

  it('removes its own nodes on unmount, but cannot recall a tag that already ran', () => {
    window.localStorage.setItem(CONSENT_KEY, 'true');
    const { unmount } = render(<ConsentedAnalytics {...IDS} />);
    const ours = () => document.head.querySelectorAll('[data-xala-analytics]');
    expect(ours().length).toBeGreaterThan(0);

    unmount();
    expect(ours()).toHaveLength(0);

    // What is left is the point. Clarity's snippet runs on append and inserts
    // its own <script src="clarity.ms/tag/…">, which this component never
    // owned and cannot clean up — and by then it has set its cookies too.
    // Unmounting stops the next page view, it does not undo this one. Consent
    // withdrawal that actually withdraws needs a reload; the code comment in
    // Analytics.tsx says so and this asserts it stays true.
    const orphaned = scripts().filter(s => !s.hasAttribute('data-xala-analytics'));
    expect(orphaned.some(s => s.src.includes('clarity.ms'))).toBe(true);
  });
});
