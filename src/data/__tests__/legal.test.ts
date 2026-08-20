import { describe, expect, it } from 'vitest';
import legal from '../legal.json';

const VENDORS = ['Google Ads', 'GA4', 'Microsoft Clarity', 'Plausible'] as const;

function privacy(lang: 'no' | 'en' | 'ar') {
  return legal[lang].privacy;
}

function cookies(lang: 'no' | 'en' | 'ar') {
  return legal[lang].cookies;
}

function section(doc: { sections: Array<{ id: string; content?: string; items?: Array<{ id: string; title?: string; content: string }> }> }, id: string) {
  const found = doc.sections.find((entry) => entry.id === id);
  if (!found) throw new Error(`missing section ${id}`);
  return found;
}

function item(
  doc: { sections: Array<{ id: string; items?: Array<{ id: string; content: string }> }> },
  sectionId: string,
  itemId: string,
) {
  const found = section(doc, sectionId).items?.find((entry) => entry.id === itemId);
  if (!found) throw new Error(`missing item ${sectionId}.${itemId}`);
  return found;
}

describe('legal.json privacy and cookies (XWEB-198)', () => {
  it('updates NO and EN lastUpdated, and leaves Arabic dates alone', () => {
    expect(privacy('no').lastUpdated).toBe('2026-08-20');
    expect(privacy('en').lastUpdated).toBe('2026-08-20');
    expect(cookies('no').lastUpdated).toBe('2026-08-20');
    expect(cookies('en').lastUpdated).toBe('2026-08-20');
    expect(privacy('ar').lastUpdated).toBe('2025-01-15');
    expect(cookies('ar').lastUpdated).toBe('2026-08-13');
  });

  it('names the four consent-gated vendors in NO and EN privacy', () => {
    for (const lang of ['no', 'en'] as const) {
      const usage = item(privacy(lang), 'collection', 'usage-data').content;
      const cookie = item(privacy(lang), 'collection', 'cookies').content;
      const processors = section(privacy(lang), 'processors');
      const blob = [usage, cookie, processors.content, ...(processors.items ?? []).map((entry) => entry.content)].join(
        '\n',
      );
      for (const vendor of VENDORS) {
        expect(blob, `${lang} privacy missing ${vendor}`).toContain(vendor);
      }
      expect(processors.items?.map((entry) => entry.id)).toEqual(['google-ads', 'ga4', 'clarity', 'plausible']);
    }
    expect(item(privacy('no'), 'collection', 'cookies').content).toContain('[informasjonskapsler](/cookies)');
    expect(item(privacy('en'), 'collection', 'cookies').content).toContain('[cookies](/cookies)');
  });

  it('names the same four vendors on the cookies page and drops social media', () => {
    for (const lang of ['no', 'en'] as const) {
      const third = section(cookies(lang), 'third-party');
      expect(third.items?.map((entry) => entry.id)).toEqual(['google-ads', 'ga4', 'clarity', 'plausible']);
      expect(third.items?.some((entry) => entry.id === 'social-media')).toBe(false);
      const banner = item(cookies(lang), 'management', 'cookie-banner').content;
      for (const vendor of VENDORS) {
        expect(banner).toContain(vendor);
      }
    }
    expect(item(cookies('no'), 'types', 'analytics').content).toContain('Dette er ikke anonymt');
    expect(item(cookies('en'), 'types', 'analytics').content).toContain('This is not anonymous');
  });

  it('quotes the live banner keys and does not invent a reject button', () => {
    const noBlob = JSON.stringify({ privacy: privacy('no'), cookies: cookies('no') });
    const enBlob = JSON.stringify({ privacy: privacy('en'), cookies: cookies('en') });
    expect(noBlob).toContain('Godta alle');
    expect(noBlob).toContain('Kun nødvendige');
    expect(noBlob.toLowerCase()).not.toContain('avvis');
    expect(enBlob).toContain('Accept all');
    expect(enBlob).toContain('Necessary only');
    expect(enBlob.toLowerCase()).not.toMatch(/\breject\b/);
    expect(noBlob).not.toMatch(/anonymisert/i);
    expect(enBlob).not.toMatch(/anonymized/i);
    expect(noBlob.toLowerCase()).not.toContain('sosiale medier');
    expect(enBlob).not.toContain('Social Media');
  });

  it('keeps tema under functional and does not move it to essential', () => {
    const essential = item(cookies('no'), 'types', 'essential').content.toLowerCase();
    const functional = item(cookies('no'), 'types', 'functional').content.toLowerCase();
    expect(functional).toContain('tema');
    expect(essential).not.toContain('tema');
  });
});
