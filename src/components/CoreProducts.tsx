import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";

const CoreProducts = () => {
  const { t } = useTranslation();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_screenshots(*)
        `)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-xala-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

  return (
    <section className="py-20 bg-xala-primary relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">
            {t('coreProducts.title')}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {t('coreProducts.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col h-full bg-xala-secondary rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreProducts;