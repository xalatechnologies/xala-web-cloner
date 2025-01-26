import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductGrid from './products/ProductGrid';
import { Skeleton } from './ui/skeleton';

const CoreProducts = () => {
  const { t } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('core-products');

  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const isLoading = isSectionLoading || isProductsLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <Skeleton 
              key={index}
              className="h-[400px] rounded-xl bg-white/5"
            />
          ))}
        </div>
      );
    }

    if (!products.length) {
      return (
        <div className="text-center text-white/70">
          {t('coreProducts.noProducts')}
        </div>
      );
    }

    return (
      <ProductGrid 
        products={products}
      />
    );
  };

  return (
    <section id="core-products" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {section?.title || t('coreProducts.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {section?.description || t('coreProducts.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default CoreProducts;