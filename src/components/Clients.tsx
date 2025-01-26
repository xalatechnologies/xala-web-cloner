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
    logo: "/lovable-uploads/dd06a11f-80af-4780-a3eb-d6211b88ba5e.png",
  },
  {
    name: "Statistics Norway",
    logo: "/lovable-uploads/ea66315b-13e9-4a09-a8cb-c851dc16edff.png",
  },
  {
    name: "Altinn",
    logo: "/lovable-uploads/54dff2fe-2407-411e-9d96-afe8fbed9cbc.png",
  },
  {
    name: "FURST",
    logo: "/lovable-uploads/6f1758b7-5d86-4778-bb7f-c619930b9d56.png",
  },
  {
    name: "Sykehuspartner",
    logo: "/lovable-uploads/fd28caf6-8552-4d12-86e4-3f3c6d533ccb.png",
  },
  {
    name: "Norwegian",
    logo: "/lovable-uploads/94726c81-955d-46ad-9968-825b4e908817.png",
  },
  {
    name: "UNICEF",
    logo: "/lovable-uploads/c48882ae-197a-439d-9406-c6f62200e111.png",
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
    name: "SpareBank 1",
    logo: "/lovable-uploads/9b91e49d-aca0-47e2-afa3-2544f823e714.png",
  },
  {
    name: "Ruter",
    logo: "/lovable-uploads/92252a14-97d7-47a9-90e2-5a291b94b99f.png",
  },
];

const Clients = () => {
  const plugin = useRef(
    Autoplay({ 
      delay: 4000, // Increased to 4 seconds for smoother transitions
      stopOnInteraction: false, 
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
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
            align: "center",
            loop: true,
            skipSnaps: false,
            dragFree: false,
            containScroll: "trimSnaps",
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
                <div className="group h-32 flex items-center justify-center p-4 rounded-lg bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-[120px] max-h-[60px] object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
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