import { ReactNode } from 'react';
import SEO from '../seo/SEO';
import type { Language } from '../seo/seoContent';

interface MainLayoutProps {
  children: ReactNode;
  pageId: 'home' | 'services' | 'team' | 'contact' | 'products';
  language?: string;
  analytics?: {
    googleAnalyticsId?: string;
    microsoftClarityId?: string;
    plausibleDomain?: string;
  };
}

export const MainLayout = ({
  children,
  pageId,
  language = 'no',
  analytics
}: MainLayoutProps) => {
  // Normalize language code to match our supported languages
  const normalizeLanguage = (lang: string): Language => {
    // Convert to lowercase and get the first part before any dash
    const normalizedLang = lang.toLowerCase().split('-')[0];
    
    // Map to supported languages
    switch (normalizedLang) {
      case 'nb':
      case 'nn':
      case 'no':
        return 'no';
      default:
        return 'en';
    }
  };

  // Common breadcrumbs structure
  const getBreadcrumbs = () => {
    const basePath = 'https://xala.no';
    const items = [{ name: 'Home', url: basePath }];
    
    if (pageId !== 'home') {
      items.push({
        name: pageId.charAt(0).toUpperCase() + pageId.slice(1),
        url: `${basePath}/${pageId}`
      });
    }
    
    return items;
  };

  return (
    <>
      <SEO
        pageId={pageId}
        language={normalizeLanguage(language)}
        breadcrumbs={getBreadcrumbs()}
        analytics={analytics}
      />
      {children}
    </>
  );
};

export default MainLayout;
