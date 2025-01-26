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
        align: "start",
        loop: true,
        skipSnaps: false,
        slidesToScroll: columns,
      }}
      plugins={autoscroll ? [plugin.current] : []}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem 
            key={product.id} 
            className={`pl-4 basis-full md:basis-1/${columns}`}
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