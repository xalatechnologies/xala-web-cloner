import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateOrganizationSchema } from '../structuredData';
import { generateServicesSchema } from '../sectionSchemas';
import { ORG_ID, SITE_ORIGIN } from '@/lib/blog/seo';

/**
 * One company, one node.
 *
 * schema.org resolves identity through `@id`. Two Organization nodes with the
 * same name and no shared id are two companies as far as a consumer is
 * concerned — which is what the site published: a rich Organization in
 * index.html carrying @id, and a thinner one from generateOrganizationSchema
 * carrying none. Whatever a knowledge graph made of that, it was not "these
 * are the same firm".
 */
const INDEX_HTML = readFileSync(resolve(__dirname, '../../../..', 'index.html'), 'utf8');

describe('organization identity', () => {
  it('uses one @id everywhere it names the company', () => {
    const generated = generateOrganizationSchema('beskrivelse', SITE_ORIGIN);
    expect(generated['@id']).toBe(ORG_ID);
    expect(INDEX_HTML).toContain(`"@id": "${ORG_ID}"`);
  });

  it('has exactly one Organization node in the static shell', () => {
    const orgs = INDEX_HTML.match(/"@type":\s*"Organization"/g) ?? [];
    expect(orgs).toHaveLength(1);
  });

  it('publishes a WebSite node at #website so WebPage isPartOf resolves', () => {
    expect(INDEX_HTML).toContain('"@type": "WebSite"');
    expect(INDEX_HTML).toContain('"@id": "https://xala.no/#website"');
  });

  it('points service offerings at that same organization', () => {
    const schema = generateServicesSchema(
      [{ id: 'x', title: 'En tjeneste', description: 'Beskrivelse.' }],
      { url: `${SITE_ORIGIN}/tjenester`, organizationId: ORG_ID, name: 'Tjenester' }
    );

    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0].itemOffered.provider).toEqual({ '@id': ORG_ID });
    expect(schema.numberOfItems).toBe(1);
  });

  it('gives each service a stable, page-scoped @id', () => {
    const schema = generateServicesSchema(
      [
        { id: 'a', title: 'A', description: 'a' },
        { id: 'b', title: 'B', description: 'b' },
      ],
      { url: `${SITE_ORIGIN}/tjenester`, organizationId: ORG_ID, name: 'Tjenester' }
    );

    const ids = schema.itemListElement.map((offer) => offer.itemOffered['@id']);
    expect(ids).toEqual([`${SITE_ORIGIN}/tjenester#a`, `${SITE_ORIGIN}/tjenester#b`]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
