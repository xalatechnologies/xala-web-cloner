import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from './ProductCard';
import type { Tables } from '@/integrations/supabase/types';

interface ProductCarouselProps {
  products: Tables<'products'>[];
  autoscroll?: boolean;
  columns?: number;
}

const ProductCarousel = ({ products, autoscroll = false, columns = 3 }: ProductCarouselProps) => {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
        dragFree: true,
        skipSnaps: true,
      }}
      plugins={autoscroll ? [plugin.current] : []}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product) => (
          <CarouselItem 
            key={product.id} 
            className="pl-2 md:pl-4"
            style={{ flex: `0 0 ${100 / columns}%` }}
          >
            <ProductCard
              title={product.title}
              description={product.description}
              icon={product.icon}
              image_url={product.image_url}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;