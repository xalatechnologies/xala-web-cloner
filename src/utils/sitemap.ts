import { getAllPageIds } from '../components/seo/seoContent.js';
import type { Language } from '../components/seo/seoContent.js';

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    href: string;
    hreflang: string;
  }[];
}

const BASE_URL = 'https://xala.no';
const SUPPORTED_LANGUAGES: Language[] = ['no', 'en'];

export const generateSitemapXml = (): string => {
  const urls: UrlEntry[] = [];
  const pages = getAllPageIds();
  const currentDate = new Date().toISOString();

  // Generate URL entries for each page and language combination
  pages.forEach(pageId => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      const path = pageId === 'home' ? '' : `/${pageId}`;
      const urlPath = lang === 'en' ? path : `/${lang}${path}`;
      
      // Generate language alternates for this page
      const alternates = SUPPORTED_LANGUAGES.map(altLang => ({
        href: `${BASE_URL}${altLang === 'en' ? path : `/${altLang}${path}`}`,
        hreflang: altLang === 'no' ? 'nb' : altLang
      }));

      // Add x-default alternate for homepage
      if (pageId === 'home' && lang === 'en') {
        alternates.push({
          href: BASE_URL,
          hreflang: 'x-default'
        });
      }

      urls.push({
        loc: `${BASE_URL}${urlPath}`,
        lastmod: currentDate,
        changefreq: pageId === 'home' ? 'daily' : 'weekly',
        priority: getPriority(pageId),
        alternates
      });
    });
  });

  return generateXml(urls);
};

const getPriority = (pageId: string): number => {
  switch (pageId) {
    case 'home':
      return 1.0;
    case 'services':
    case 'products':
      return 0.8;
    case 'team':
      return 0.7;
    case 'contact':
      return 0.6;
    default:
      return 0.5;
  }
};

const generateXml = (urls: UrlEntry[]): string => {
  const urlElements = urls.map(url => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority ? `<priority>${url.priority}</priority>` : ''}
      ${url.alternates?.map(alt => 
        `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
      ).join('\n      ')}
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urlElements}
</urlset>`;
};
