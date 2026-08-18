import { describe, expect, it } from 'vitest';
import productsData from '@/data/products.json';
import detailsData from '@/data/product-details.json';
import { getPageSEO } from '@/components/seo/seoContent';
import { catalogProducts } from '@/lib/products';
import no from '@/i18n/locales/no.json';
import type { ProductDetails } from '@/lib/product-details';

/**
 * /produkter title, description and cards must name the same product set.
 * Listed cards are the four products in this order. Xaheen and Norchain keep
 * their pages and stay out of the listing.
 */
describe('product catalogue listing', () => {
  const cards = catalogProducts(productsData.no);
  const names = cards.map((product) => product.title);
  const listingCopy = [
    getPageSEO('products', 'no').title,
    getPageSEO('products', 'no').description,
    no.productsPage.title,
    no.productsPage.description,
  ].join(' ');

  it('lists the four products in the agreed order', () => {
    expect(cards).toHaveLength(4);
    expect(names).toEqual(['Bevillingsportal', 'Tilskuddsportal', 'Digilist', 'Digiskjema']);
    expect(cards.every((product) => product.id !== 'norchain')).toBe(true);
    expect(cards.every((product) => product.id !== 'xaheen')).toBe(true);
  });

  it('names the same four products in title, H1, description and lead', () => {
    for (const name of ['Bevillingsportal', 'Tilskuddsportal', 'Digilist', 'Digiskjema']) {
      expect(listingCopy, `${name} missing from listing copy`).toMatch(new RegExp(name, 'i'));
    }
    expect(listingCopy).not.toMatch(/Xaheen/i);
    expect(listingCopy).not.toMatch(/Norchain/i);
    expect(getPageSEO('products', 'no').title).toBe(no.productsPage.title + ' | Xala');
  });

  it('keeps Xaheen and Norchain as unlisted pages', () => {
    const xaheen = productsData.no.find((product) => product.id === 'xaheen');
    const norchain = productsData.no.find((product) => product.id === 'norchain');
    expect(xaheen).toBeTruthy();
    expect(xaheen!.listed).toBe(false);
    expect(xaheen!.slug).toBe('xaheen');
    expect(norchain).toBeTruthy();
    expect(norchain!.status).toBe('coming-soon');
    expect(norchain!.listed).toBe(false);
    expect(norchain!).not.toHaveProperty('url');
  });

  it('does not invent a live Digiskjema URL or rename Digilist', () => {
    const digiskjema = productsData.no.find((product) => product.id === 'digiskjema');
    const digilist = productsData.no.find((product) => product.id === 'digilist');
    expect(digiskjema!.status).toBe('coming-soon');
    expect(digiskjema!).not.toHaveProperty('url');
    expect(digilist!.title).toBe('Digilist');
    expect(digilist!.url).toBe('https://digilist.no');
  });
});

describe('product detail copy', () => {
  const details = detailsData as Record<string, ProductDetails>;

  it('gives every listed product a full page, not a one-paragraph card', () => {
    for (const id of ['bevillingsportal', 'tilskuddsportal', 'digilist', 'digiskjema']) {
      const copy = details[id].no;
      expect(copy.what, `${id} missing what`).toBeTruthy();
      expect(copy.does, `${id} missing does`).toBeTruthy();
      expect(copy.doesNot, `${id} missing doesNot`).toBeTruthy();
      expect(copy.capabilities?.length, `${id} missing capabilities`).toBeGreaterThanOrEqual(4);
      expect(copy.faq?.length, `${id} missing faq`).toBeGreaterThanOrEqual(3);
    }
  });

  it('links the two portals to the existing tjeneste, case and blog', () => {
    expect(details.bevillingsportal.serviceSlug).toBe('bevillingsportal');
    expect(details.tilskuddsportal.serviceSlug).toBe('tilskuddsportal');
    expect(details.bevillingsportal.caseSlugs).toContain(
      'nordre-follo-tilskuddsportal-bevillingsportal'
    );
    expect(details.tilskuddsportal.caseSlugs).toContain(
      'nordre-follo-tilskuddsportal-bevillingsportal'
    );
    expect(details.bevillingsportal.postSlugs).toContain('bevillingsportal-fra-soknad-til-vedtak');
    expect(details.tilskuddsportal.postSlugs).toContain('tilskuddsportal-som-faktisk-brukes');
  });

  it('keeps Xaheen details so /produkter/xaheen still resolves', () => {
    expect(details.xaheen.no.intro.length).toBeGreaterThan(40);
    expect(details.xaheen.slug).toBe('xaheen');
  });

  it('does not invent kroner, SLA or em dashes in the new product copy', () => {
    const listed = ['bevillingsportal', 'tilskuddsportal', 'digilist', 'digiskjema']
      .map((id) => JSON.stringify(details[id].no))
      .join('\n');
    expect(listed).not.toMatch(/—/);
    expect(listed).not.toMatch(/kr\s?\d/i);
    expect(listed).not.toMatch(/99[,.]99\s?%/);
    expect(listed).not.toMatch(/\bSLA\b/);
    expect(listed).not.toMatch(/DigiList/);
    expect(listed).toMatch(/Tilskuddsportal/);
  });
});
