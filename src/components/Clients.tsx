import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const clients = [
  {
    name: "SSB",
    logo: "/clients/ssb.svg",
    color: "#274247"
  },
  {
    name: "Sykehuspartner",
    logo: "/clients/sykehuspartner.svg",
    color: "#003087"
  },
  {
    name: "Norwegian",
    logo: "/clients/norwegian.svg",
    color: "#b12a0b"
  },
  {
    name: "Altinn",
    logo: "/clients/altinn.svg",
    color: "#0062BA"
  },
  {
    name: "NHN",
    logo: "/clients/nhn.svg",
    color: "#003087"
  },
  {
    name: "NOV",
    logo: "/clients/nov2.svg",
    color: "#ED3124"
  },
];

const Clients = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Futuristic background with gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary">
        <div className="absolute inset-0">
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
            loop: false,
            dragFree: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {clients.map((client, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div 
                  className="group relative h-40 flex items-center justify-center p-2 rounded-xl"
                >
                  {/* Card background */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-sm border border-white/20" />
                  
                  {/* Logo */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      filter: 'brightness(1.2) contrast(1.2)',
                    }}
                  />

                  {/* Hover text */}
                  <div className="absolute bottom-1 left-0 w-full text-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
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