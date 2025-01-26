import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AboutFeatureCard from './AboutFeatureCard';

interface AboutFeatureCarouselProps {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  columns: number;
  autoscroll: boolean;
}

const AboutFeatureCarousel = ({ features, columns, autoscroll }: AboutFeatureCarouselProps) => {
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
        {features.map((feature, index) => (
          <CarouselItem 
            key={index}
            className={`pl-4 basis-full md:basis-1/${columns}`}
          >
            <AboutFeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AboutFeatureCarousel;