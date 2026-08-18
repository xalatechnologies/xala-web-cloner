import { describe, expect, it } from 'vitest';
import productsData from '@/data/products.json';
import detailsData from '@/data/product-details.json';
import { getPageSEO } from '@/components/seo/seoContent';
import { catalogProducts } from '@/lib/products';
import { allPosts } from '@/lib/blog';
import no from '@/i18n/locales/no.json';
import type { ProductDetails } from '@/lib/product-details';

/**
 * /produkter title, description and cards must name the same product set.
 * Listed cards are the six products in this order. Xaheen and Norchain keep
 * their pages and stay out of the listing.
 */
const LISTED_TITLES = [
  'Bevillingsportal',
  'Tilskuddsportal',
  'Redusert foreldrebetaling',
  'Arkitekturprinsipper',
  'Digilist',
  'Digiskjema',
] as const;

const LISTED_IDS = [
  'bevillingsportal',
  'tilskuddsportal',
  'redusert-foreldrebetaling',
  'arkitekturprinsipper',
  'digilist',
  'digiskjema',
] as const;

describe('product catalogue listing', () => {
  const cards = catalogProducts(productsData.no);
  const names = cards.map((product) => product.title);
  const listingCopy = [
    getPageSEO('products', 'no').title,
    getPageSEO('products', 'no').description,
    no.productsPage.title,
    no.productsPage.description,
  ].join(' ');

  it('lists the six products in the agreed order', () => {
    expect(cards).toHaveLength(6);
    expect(names).toEqual([...LISTED_TITLES]);
    expect(cards.every((product) => product.id !== 'norchain')).toBe(true);
    expect(cards.every((product) => product.id !== 'xaheen')).toBe(true);
  });

  it('names the same six products in title, H1, description and lead', () => {
    for (const name of LISTED_TITLES) {
      expect(listingCopy, `${name} missing from listing copy`).toMatch(new RegExp(name, 'i'));
    }
    expect(listingCopy).not.toMatch(/Xaheen/i);
    expect(listingCopy).not.toMatch(/Norchain/i);
    expect(listingCopy).not.toMatch(/Fire produkter/);
    expect(listingCopy).toMatch(/Seks produkter/);
    expect(getPageSEO('products', 'no').title).toBe(no.productsPage.title + ' | Xala');
  });

  it('keeps Xaheen and Norchain as unlisted pages', () => {
    for (const language of ['no', 'en', 'ar'] as const) {
      const xaheen = productsData[language].find((product) => product.id === 'xaheen');
      const norchain = productsData[language].find((product) => product.id === 'norchain');
      expect(xaheen).toBeTruthy();
      expect(xaheen!.listed).toBe(false);
      expect(xaheen!.slug).toBe('xaheen');
      expect(norchain).toBeTruthy();
      expect(norchain!.status).toBe('coming-soon');
      expect(norchain!.listed).toBe(false);
      expect(norchain!).not.toHaveProperty('url');
    }
  });

  it('does not invent a live Digiskjema URL or rename Digilist', () => {
    const digiskjema = productsData.no.find((product) => product.id === 'digiskjema');
    const digilist = productsData.no.find((product) => product.id === 'digilist');
    expect(digiskjema!.status).toBe('coming-soon');
    expect(digiskjema!).not.toHaveProperty('url');
    expect(digilist!.title).toBe('Digilist');
    expect(digilist!.url).toBe('https://digilist.no');
  });

  it('spells Arkitekturprinsipper with two p-s', () => {
    expect(productsData.no.some((product) => product.slug === 'arkitekturprinsipper')).toBe(true);
    expect(JSON.stringify(productsData)).not.toMatch(/prinsippper/);
    expect(JSON.stringify(detailsData)).not.toMatch(/prinsippper/);
  });
});

describe('product detail copy', () => {
  const details = detailsData as Record<string, ProductDetails>;

  it('gives every listed product a full page, not a one-paragraph card', () => {
    for (const id of LISTED_IDS) {
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

  it('links the two new products to existing blogs and invents no tjeneste page', () => {
    expect(details['redusert-foreldrebetaling'].serviceSlug).toBeUndefined();
    expect(details.arkitekturprinsipper.serviceSlug).toBeUndefined();
    expect(details['redusert-foreldrebetaling'].postSlugs).toEqual([
      'redusert-foreldrebetaling-sfo-varig-nedgang',
      'redusert-foreldrebetaling-sfo-skattemelding-for-1-august',
      'redusert-foreldrebetaling-uten-fagsystemintegrasjon',
      'redusert-foreldrebetaling-dokumentasjon-fra-foresatte',
    ]);
    expect(details.arkitekturprinsipper.postSlugs).toEqual([
      'flerleietakerarkitektur-saas-offentlig-sektor',
    ]);
    const published = new Set(allPosts().map((post) => post.slug));
    for (const slug of [
      ...(details['redusert-foreldrebetaling'].postSlugs ?? []),
      ...(details.arkitekturprinsipper.postSlugs ?? []),
    ]) {
      expect(published.has(slug), `${slug} is not a published post`).toBe(true);
    }
  });

  it('keeps Xaheen details so /produkter/xaheen still resolves', () => {
    expect(details.xaheen.no.intro.length).toBeGreaterThan(40);
    expect(details.xaheen.slug).toBe('xaheen');
  });

  it('does not invent kroner, SLA or em dashes in the new product copy', () => {
    const listed = LISTED_IDS.map((id) => JSON.stringify(details[id].no)).join('\n');
    expect(listed).not.toMatch(/—/);
    expect(listed).not.toMatch(/kr\s?\d/i);
    expect(listed).not.toMatch(/99[,.]99\s?%/);
    expect(listed).not.toMatch(/\bSLA\b/);
    expect(listed).not.toMatch(/DigiList/);
    expect(listed).not.toMatch(/692\s?465/);
    expect(listed).not.toMatch(/KS 356/);
    expect(listed).toMatch(/Tilskuddsportal/);
    expect(listed).toMatch(/Redusert foreldrebetaling/);
    expect(listed).toMatch(/Arkitekturprinsipper/);
  });
});
