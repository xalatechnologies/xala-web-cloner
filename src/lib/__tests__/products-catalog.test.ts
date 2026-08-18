import { describe, expect, it } from 'vitest';
import productsData from '@/data/products.json';
import { getPageSEO } from '@/components/seo/seoContent';
import { catalogProducts } from '@/lib/products';
import no from '@/i18n/locales/no.json';

/**
 * /produkter title, description and cards must name the same product set.
 * After Norchain's outbound TLS host was unmarked, the listing is the three
 * cards that remain — not a fourth product the copy still claims is live.
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

  it('lists three cards after Norchain is left out of the listing story', () => {
    expect(cards).toHaveLength(3);
    expect(names).toEqual(['Xaheen AI Builder', 'DigiList', 'Digiskjema']);
    expect(cards.every((product) => product.id !== 'norchain')).toBe(true);
    expect(no.productsPage.description).toMatch(/^Tre /);
  });

  it('names the same three products in title, H1, description and lead', () => {
    for (const name of ['Digilist', 'Digiskjema', 'Xaheen']) {
      expect(listingCopy, `${name} missing from listing copy`).toMatch(new RegExp(name, 'i'));
    }
    expect(listingCopy).not.toMatch(/Norchain/i);
    expect(getPageSEO('products', 'no').title).toBe(no.productsPage.title + ' | Xala');
  });

  it('does not mark Norchain live or send visitors to norchain.org', () => {
    const norchain = productsData.no.find((product) => product.id === 'norchain');
    expect(norchain).toBeTruthy();
    expect(norchain!.status).toBe('coming-soon');
    expect(norchain!.listed).toBe(false);
    expect(norchain!).not.toHaveProperty('url');
  });
});
