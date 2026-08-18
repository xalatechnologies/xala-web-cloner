import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import ProductGrid from './products/ProductGrid';
import productsData from '@/data/products.json';
import { catalogProducts } from '@/lib/products';

type Language = 'no' | 'en' | 'ar';

interface CoreProductsProps {
  /**
   * Heading level for the section title. The page hosting this section
   * owns the h1; this stays an h1 only where the section leads the page.
   */
  headingLevel?: 'h1' | 'h2';
}

const CoreProducts = ({ headingLevel = 'h1' }: CoreProductsProps = {}) => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('core-products');
  const Heading = headingLevel;

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  // Get products from JSON
  const products = catalogProducts(productsData[currentLanguage] || productsData.no);

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
        products={products}
        initialRows={Math.ceil(products.length / 2)}
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
            <Heading className="section-heading">
              {sectionTitle}
            </Heading>
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