import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";
import { useSection } from "@/hooks/use-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { type Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'];

const CoreProducts = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('core-products');
  
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching products for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_screenshots(*)
        `)
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as (Product & { product_screenshots: any[] })[];
    },
    enabled: !!i18n.language
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-xala-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-xala-secondary rounded-xl p-6">
                <Skeleton className="h-12 w-12 mb-4" />
                <Skeleton className="h-6 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-6" />
                <Skeleton className="h-48 w-full mb-6" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const renderContent = () => {
    if (section?.carousel) {
      return (
        <Carousel
          opts={{
            align: "center",
            loop: true,
            dragFree: true,
            skipSnaps: true,
          }}
          plugins={section.autoscroll ? [plugin.current] : []}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products?.map((product) => (
              <CarouselItem 
                key={product.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-${section?.columns || 3} gap-8`}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-xala-primary relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">
            {section?.title || t('coreProducts.title')}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {section?.description || t('coreProducts.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

// Helper component to maintain consistent card rendering
const ProductCard = ({ product }: { product: Product & { product_screenshots: any[] } }) => {
  const { t } = useTranslation();
  
  return (
    <div className="group flex flex-col h-full bg-xala-secondary rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        {product.icon && (
          <div className="w-12 h-12 text-xala-accent">
            <img src={product.icon} alt={product.title} className="w-full h-full object-contain" />
          </div>
        )}
        <span className="text-sm text-xala-accent font-semibold">
          {product.metrics}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-xala-accent">
        {product.title}
      </h3>
      
      <p className="text-xala-text mb-6">
        {product.description}
      </p>

      {/* Product image */}
      <div className="flex-grow mb-6">
        {product.product_screenshots?.[0] ? (
          <img
            src={product.product_screenshots[0].image_url}
            alt={product.product_screenshots[0].alt_text}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>
      
      <Button
        variant="outline"
        className="group w-full bg-transparent border border-xala-accent text-xala-accent hover:bg-xala-accent hover:text-white transition-all duration-300 mt-auto"
      >
        {t('coreProducts.learnMore')}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default CoreProducts;