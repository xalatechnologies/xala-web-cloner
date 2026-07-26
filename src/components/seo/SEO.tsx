import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '@/lib/blog/seo';
import { getPageSEO } from './seoContent';
import type { Language, PageId } from './seoContent';
import {
  generateOrganizationSchema,
  generateTeamSchema,
  generateServicesSchema,
  generateProductsSchema,
  generateContactSchema
} from './structuredData';
// generateCareerSchema / generateEventsSchema are intentionally not imported:
// PageId has no 'careers' or 'events' member, so their switch branches were
// unreachable. Both remain exported from enhancedSchemas.ts for whenever those
// pages get a real pageId.
import {
  generateTechnologyStackSchema,
  generateCaseStudySchema,
  generateBreadcrumbSchema,
  type TechnologyStack,
  type CaseStudy
} from './enhancedSchemas';

/** A JSON-LD block. Schemas differ per @type, so the union is structural. */
type JsonLd = Record<string, unknown>;

interface SEOProps {
  pageId: PageId;
  language: Language;
  ogImage?: string;
  /** Absolute URL of *this* page. Defaults to the site root, which is only
   *  correct for the front page — RouteSEO always passes the real one. */
  canonicalUrl?: string;
  /** 'article' for blog posts and case studies, 'website' otherwise. */
  ogType?: 'website' | 'article';
  /** Keep thin or duplicate pages (404, legal) out of the index. */
  noIndex?: boolean;
  /** Overrides the canned copy — used for per-post blog titles. */
  titleOverride?: string;
  descriptionOverride?: string;
  teamMembers?: Array<{
    name: string;
    role: string;
    image: string;
    sameAs?: string[];
  }>;
  services?: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
  products?: Array<{
    name: string;
    description: string;
    image?: string;
    category?: string;
  }>;
  technologies?: TechnologyStack[];
  caseStudies?: CaseStudy[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const defaultProps = {
  ogImage: '/og-image.png',
  canonicalUrl: SITE_ORIGIN,
};

export const SEO = ({
  pageId,
  language,
  ogImage = defaultProps.ogImage,
  canonicalUrl = defaultProps.canonicalUrl,
  ogType = 'website',
  noIndex = false,
  titleOverride,
  descriptionOverride,
  teamMembers,
  services,
  products,
  technologies,
  caseStudies,
  breadcrumbs
}: SEOProps) => {
  const canned = getPageSEO(pageId, language);
  const title = titleOverride ?? canned.title;
  const description = descriptionOverride ?? canned.description;
  const keywords = canned.keywords;

  // Generate appropriate schema based on page
  const getSchemaMarkup = (): JsonLd[] => {
    // Annotated, not inferred: without this the array takes the Organization
    // schema's exact shape and every other schema fails to push.
    const schemas: JsonLd[] = [generateOrganizationSchema(description, canonicalUrl)];

    // Add breadcrumbs schema if available
    if (breadcrumbs) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    switch (pageId) {
      // The team is presented on /om-oss; there is no separate team route.
      case 'about':
        if (teamMembers) {
          schemas.push(generateTeamSchema(teamMembers));
        }
        break;
      case 'services':
        if (services) {
          schemas.push(generateServicesSchema(services));
        }
        if (technologies) {
          schemas.push(generateTechnologyStackSchema(technologies));
        }
        break;
      case 'products':
        if (products) {
          schemas.push(generateProductsSchema(products));
        }
        if (caseStudies) {
          schemas.push(generateCaseStudySchema(caseStudies));
        }
        break;
      case 'contact':
        schemas.push(generateContactSchema(canonicalUrl));
        break;
    }

    return schemas;
  };

  // og:image must be absolute — crawlers reject a bare path like /og-image.png.
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}${ogImage}`;

  const ogLocale = language === 'no' ? 'nb_NO' : language === 'ar' ? 'ar_AR' : 'en_US';

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Xala Technologies AS" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow'} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* theme-color intentionally omitted: index.html owns it, and declaring
            it in both places drifted (#0F1117 there vs #6E3BF4 here).

            Bing/Yandex verification tags likewise removed — they emitted the
            literal strings YOUR-BING-VERIFICATION-CODE and
            YOUR-YANDEX-VERIFICATION-CODE into every page. Add them back only
            with real values. */}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteOgImage} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:site_name" content="Xala Technologies AS" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={absoluteOgImage} />

        {/* Canonical. No per-language hreflang alternates: one URL serves all
            three languages via client-side switching, so the previous
            /no/<pageId> and /en/<pageId> alternates pointed at URLs that have
            never existed and would be reported as 404s. */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Answer engines: the machine-readable summary of the whole site. */}
        <link rel="alternate" type="text/plain" href={`${SITE_ORIGIN}/llms.txt`} title="llms.txt" />
        <link rel="alternate" type="application/rss+xml" href={`${SITE_ORIGIN}/blogg/rss.xml`} title="Xala Technologies — fagartikler" />

        {/* Structured Data */}
        {getSchemaMarkup().map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
    </>
  );
};

export default SEO;
