import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductGrid from './products/ProductGrid';
import { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

// Fallback products when database is empty
const getFallbackProducts = (language: SupportedLanguage) => {
  const isNorwegian = language === 'no';

  return [
    {
      id: 'norchain',
      title: 'Norchain',
      description: isNorwegian
        ? 'Komplett blockchain-operativsystem med L1-infrastruktur, NorPay betalingsløsninger, og NorLedger for sporbarhet.'
        : 'Complete blockchain operating system with L1 infrastructure, NorPay payment solutions, and NorLedger for traceability.',
      image_url: '/lovable-uploads/9b91e49d-aca0-47e2-afa3-2544f823e714.png',
      icon: 'Link',
      language,
      sort_order: 1,
      status: 'active' as const,
      external_url: 'https://norchain.org',
      created_at: null,
      updated_at: null,
    },
    {
      id: 'digilist',
      title: 'Digilist',
      description: isNorwegian
        ? 'Enterprise SaaS-plattform for digital boligutleie. Komplett løsning for leiekontrakter, kommunikasjon og dokumenthåndtering.'
        : 'Enterprise SaaS platform for digital rental management. Complete solution for contracts, communication, and document handling.',
      image_url: '/lovable-uploads/6f1758b7-5d86-4778-bb7f-c619930b9d56.png',
      icon: 'Building2',
      language,
      sort_order: 2,
      status: 'active' as const,
      external_url: 'https://digilist.no',
      created_at: null,
      updated_at: null,
    },
    {
      id: 'digiskjema',
      title: 'Digiskjema',
      description: isNorwegian
        ? 'AI-drevet digital skjemaløsning for automatisering av dokumentprosesser og intelligent dataekstraksjon.'
        : 'AI-powered digital form solution for document process automation and intelligent data extraction.',
      image_url: '/lovable-uploads/8d2f448c-b059-4f5b-84cd-633eab629206.png',
      icon: 'FileText',
      language,
      sort_order: 3,
      status: 'active' as const,
      external_url: 'https://digiskjema.no',
      created_at: null,
      updated_at: null,
    },
    {
      id: 'xaheen',
      title: 'Xaheen',
      description: isNorwegian
        ? 'AI-drevet applikasjonsbygger som transformerer ideer til fungerende applikasjoner på minutter.'
        : 'AI-powered application builder that transforms ideas into working applications in minutes.',
      image_url: '/lovable-uploads/57d981d8-9e47-4404-8f30-3436767048b7.png',
      icon: 'Sparkles',
      language,
      sort_order: 4,
      status: 'active' as const,
      external_url: 'https://xaheen.com',
      created_at: null,
      updated_at: null,
    },
  ];
};

const CoreProducts = () => {
  const { t, i18n } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('core-products');
  const currentLanguage = (i18n.language.toLowerCase().split('-')[0] === 'en' ? 'en' : 'no') as SupportedLanguage;

  const { data: dbProducts = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch products');
      }

      return data || [];
    }
  });

  const isLoading = isSectionLoading || isProductsLoading;

  // Use database products if available, otherwise use fallback
  const products = dbProducts.length > 0 ? dbProducts : getFallbackProducts(currentLanguage);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!products.length) {
      return (
        <div className="text-center text-muted-foreground">
          <p>{t('No products available')}</p>
        </div>
      );
    }

    return (
      <ProductGrid
        products={products}
        initialRows={section?.rows || 2}
        cols={section?.columns || 2}
      />
    );
  };

  // Fallback section data
  const sectionTitle = section?.title || (currentLanguage === 'no' ? 'Våre produkter' : 'Our Products');
  const sectionDescription = section?.description || (currentLanguage === 'no'
    ? 'Innovative løsninger bygget for å drive vekst og transformere industrier'
    : 'Innovative solutions built to drive growth and transform industries');

  return (
    <section id="core-products" className="py-20 bg-background relative overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {sectionTitle}
            </h2>
            <p className="text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              {sectionDescription}
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default CoreProducts;