import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const CoreProducts = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('core-products');
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

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
            {section.products.map((product, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                <div className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                             backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                             hover:shadow-lg hover:shadow-[#9b87f5]/10">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors">
                    {product.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-${section?.columns || 3} gap-8`}>
        {section.products.map((product, index) => (
          <div key={index} className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                     backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                     hover:shadow-lg hover:shadow-[#9b87f5]/10">
            <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
              {product.title}
            </h3>
            <p className="text-white/70 group-hover:text-white/90 transition-colors">
              {product.description}
            </p>
          </div>
        ))}
      </div>
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
