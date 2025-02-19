import { Helmet } from 'react-helmet-async';
import { getPageSEO } from './seoContent';
import type { Language, PageId } from './seoContent';
import {
  generateOrganizationSchema,
  generateTeamSchema,
  generateServicesSchema,
  generateProductsSchema,
  generateContactSchema
} from './structuredData';
import {
  generateTechnologyStackSchema,
  generateCaseStudySchema,
  generateCareerSchema,
  generateEventsSchema,
  generateBreadcrumbSchema,
  type TechnologyStack,
  type CaseStudy,
  type JobPosting,
  type Event
} from './enhancedSchemas';
import Analytics from './Analytics';

interface SEOProps {
  pageId: PageId;
  language: Language;
  ogImage?: string;
  canonicalUrl?: string;
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
  jobPostings?: JobPosting[];
  events?: Event[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  analytics?: {
    googleAnalyticsId?: string;
    microsoftClarityId?: string;
    plausibleDomain?: string;
  };
}

const defaultProps = {
  ogImage: '/og-image.png',
  canonicalUrl: 'https://xala.no',
};

export const SEO = ({
  pageId,
  language,
  ogImage = defaultProps.ogImage,
  canonicalUrl = defaultProps.canonicalUrl,
  teamMembers,
  services,
  products,
  technologies,
  caseStudies,
  jobPostings,
  events,
  breadcrumbs,
  analytics
}: SEOProps) => {
  const { title, description, keywords } = getPageSEO(pageId, language);

  // Generate appropriate schema based on page
  const getSchemaMarkup = () => {
    const schemas = [generateOrganizationSchema(description, canonicalUrl)];

    // Add breadcrumbs schema if available
    if (breadcrumbs) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    switch (pageId) {
      case 'team':
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
      case 'careers':
        if (jobPostings) {
          schemas.push(generateCareerSchema(jobPostings));
        }
        break;
      case 'events':
        if (events) {
          schemas.push(generateEventsSchema(events));
        }
        break;
    }

    return schemas;
  };

  const alternateLanguageUrls = {
    no: `${canonicalUrl}/no${pageId === 'home' ? '' : `/${pageId}`}`,
    en: `${canonicalUrl}/en${pageId === 'home' ? '' : `/${pageId}`}`
  };

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
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#6E3BF4" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="YOUR-BING-VERIFICATION-CODE" />
        
        {/* Yandex Webmaster Tools */}
        <meta name="yandex-verification" content="YOUR-YANDEX-VERIFICATION-CODE" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={language === 'no' ? 'nb_NO' : 'en_US'} />
        <meta property="og:locale:alternate" content={language === 'no' ? 'en_US' : 'nb_NO'} />
        <meta property="og:site_name" content="Xala Technologies AS" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
        <meta name="twitter:creator" content="@xalatechnologies" />
        <meta name="twitter:site" content="@xalatechnologies" />

        {/* LinkedIn */}
        <meta property="linkedin:card" content="summary_large_image" />
        <meta property="linkedin:title" content={title} />
        <meta property="linkedin:description" content={description} />
        <meta property="linkedin:image" content={ogImage} />

        {/* Canonical and Alternate Language URLs */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="no" href={alternateLanguageUrls.no} />
        <link rel="alternate" hrefLang="en" href={alternateLanguageUrls.en} />
        <link rel="alternate" hrefLang="x-default" href={alternateLanguageUrls.en} />

        {/* Structured Data */}
        {getSchemaMarkup().map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      {/* Analytics Integration */}
      {analytics && <Analytics {...analytics} />}
    </>
  );
};

export default SEO;
