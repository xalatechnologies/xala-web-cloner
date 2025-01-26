import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import ProductCard from './ProductCard';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCarouselProps {
  products: Product[];
  columns: number;
  autoscroll: boolean;
}

const ProductCarousel = ({ products, columns, autoscroll }: ProductCarouselProps) => {
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
              imageUrl={product.image_url}
              icon={product.icon}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;