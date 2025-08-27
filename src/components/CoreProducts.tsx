import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductGrid from './products/ProductGrid';
import { Skeleton } from './ui/skeleton';
import { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

const CoreProducts = () => {
  const { t, i18n } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('core-products');
  const currentLanguage = (i18n.language.toLowerCase().split('-')[0] === 'en' ? 'en' : 'no') as SupportedLanguage;

  const { data: products = [], isLoading: isProductsLoading } = useQuery({
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    if (!products.length) {
      return (
        <div className="text-center text-xala-text">
          <p>{t('No products available')}</p>
        </div>
      );
    }

    return (
      <ProductGrid 
        products={products} 
        initialRows={section?.rows || 2}
        cols={section?.columns || 3}
      />
    );
  };

  if (!section) return null;

  return (
    <section id="core-products" className="py-20 bg-background relative overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight gradient-text sm:text-4xl">
              {section.title}
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              {section.description}
            </p>
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default CoreProducts;