import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const clients = [
  {
    name: "Altinn",
    logo: "/lovable-uploads/54dff2fe-2407-411e-9d96-afe8fbed9cbc.png",
  },
  {
    name: "OCHA",
    logo: "/lovable-uploads/8d2f448c-b059-4f5b-84cd-633eab629206.png",
  },
  {
    name: "TDS",
    logo: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png",
  },
  {
    name: "Telia",
    logo: "/lovable-uploads/c700956f-8871-4608-bdd4-64d966038aea.png",
  },
  {
    name: "UNICEF",
    logo: "/lovable-uploads/c48882ae-197a-439d-9406-c6f62200e111.png",
  },
];

const Clients = () => {
  const plugin = useRef(
    Autoplay({ 
      delay: 6000,
      stopOnInteraction: false, 
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Futuristic background with gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_500px_at_50%_50%,#38bdf8,transparent)]" />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_400px_at_80%_20%,#38bdf8,transparent)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Our Clients
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Partnering with industry leaders to drive innovation and create impactful solutions.
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[...clients, ...clients].map((client, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div 
                  className="group relative h-40 flex items-center justify-center p-6 rounded-xl"
                >
                  {/* Futuristic card background */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:from-white/[0.12] group-hover:to-white/[0.06]" />
                  
                  {/* Animated glow effect */}
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  {/* Logo */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="relative max-w-[140px] max-h-[70px] object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                  />

                  {/* Hover text */}
                  <div className="absolute bottom-2 left-0 w-full text-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-sm text-blue-300 font-medium">
                      {client.name}
                    </span>
                  </div>
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