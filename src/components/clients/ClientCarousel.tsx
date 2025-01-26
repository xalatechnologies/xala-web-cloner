import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import ClientCard from './ClientCard';
import type { Database } from '@/integrations/supabase/types';

type Client = Database['public']['Tables']['clients']['Row'];

interface ClientCarouselProps {
  clients: Client[];
  columns: number;
  autoscroll: boolean;
}

const ClientCarousel = ({ clients, columns, autoscroll }: ClientCarouselProps) => {
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
        {clients.map((client) => (
          <CarouselItem 
            key={client.id}
            className={`pl-4 basis-full md:basis-1/${columns}`}
          >
            <ClientCard
              name={client.name}
              logoUrl={client.logo_url}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ClientCarousel;