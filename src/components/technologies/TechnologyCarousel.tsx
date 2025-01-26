import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import TechnologyCard from './TechnologyCard';
import { Database } from '@/integrations/supabase/types';

type Technology = Database['public']['Tables']['technologies']['Row'] & {
  technology_tools: Database['public']['Tables']['technology_tools']['Row'][];
};

interface TechnologyCarouselProps {
  technologies: Technology[];
  columns: number;
  autoscroll: boolean;
}

const TechnologyCarousel = ({ technologies, columns, autoscroll }: TechnologyCarouselProps) => {
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
        {technologies.map((tech) => (
          <CarouselItem 
            key={tech.id}
            className={`pl-2 md:pl-4 basis-full md:basis-1/${columns}`}
          >
            <TechnologyCard
              icon={tech.icon}
              title={tech.title}
              description={tech.description || undefined}
              tools={tech.technology_tools}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TechnologyCarousel;