import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const clients = [
  {
    name: "NOV",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "Statistics Norway",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "Altinn",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "FURST",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "Sykehuspartner",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "Norwegian",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "UNICEF",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "OCHA",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "TDS",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "Telia",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "SpareBank 1",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
  {
    name: "Ruter",
    logo: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png",
  },
];

const Clients = () => {
  const plugin = useRef(
    Autoplay({ delay: 0, stopOnInteraction: false, stopOnMouseEnter: false, rootNode: (emblaRoot) => emblaRoot.parentElement })
  );

  return (
    <section className="py-20 bg-gradient-to-b from-xala-primary to-xala-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Our Clients
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Partnering with visionary clients to drive innovation, efficiency, and sustainable growth.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: true,
            dragFree: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[...clients, ...clients].map((client, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/6 transition-opacity duration-500"
              >
                <div className="h-32 flex items-center justify-center p-4">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-[100px] max-h-[50px] object-contain opacity-80 transition-opacity duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Clients;