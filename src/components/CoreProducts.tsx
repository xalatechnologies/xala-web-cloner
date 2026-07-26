import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import ProductGrid from './products/ProductGrid';
import productsData from '@/data/products.json';

type Language = 'no' | 'en' | 'ar';

const CoreProducts = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('core-products');

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  // Get products from JSON
  const products = productsData[currentLanguage] || productsData.no;

  const renderContent = () => {
    if (!products.length) {
      return (
        <div className="text-center text-muted-foreground">
          <p>{t('No products available')}</p>
        </div>
      );
    }

    return (
      <ProductGrid
        products={products as any}
        initialRows={2}
        cols={2}
      />
    );
  };

  // Section data with fallbacks
  const sectionTitle = section?.title || t('products.title', currentLanguage === 'no' ? 'Våre produkter' : currentLanguage === 'ar' ? 'منتجاتنا' : 'Our Products');
  const sectionDescription = section?.description || t('products.description', '');

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