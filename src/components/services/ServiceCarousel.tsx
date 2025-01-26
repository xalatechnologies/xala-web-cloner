import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import ServiceCard from "./ServiceCard";
import { Tables } from "@/integrations/supabase/types";

interface ServiceCarouselProps {
  services: Tables<'services'>[];
  columns: number;
  autoscroll: boolean;
}

const ServiceCarousel = ({ services, columns, autoscroll }: ServiceCarouselProps) => {
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
        {services.map((service) => (
          <CarouselItem 
            key={service.id}
            className={`pl-4 basis-full md:basis-1/${columns}`}
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ServiceCarousel;