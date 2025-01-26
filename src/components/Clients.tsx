import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Clients = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('clients');
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }
      
      return data;
    }
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${section?.columns || 4}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${section?.rows || 2}, minmax(0, 1fr))`
          }}
        >
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-40">
              <Skeleton className="w-full h-full rounded-xl bg-xala-secondary/50" />
            </div>
          ))}
        </div>
      );
    }

    if (section?.carousel) {
      return (
        <Carousel
          opts={{
            align: "center",
            loop: true,
            dragFree: true,
            skipSnaps: true,
          }}
          plugins={section.autoscroll ? [plugin.current] : []}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {clients?.map((client) => (
              <CarouselItem 
                key={client.id} 
                className={`pl-2 md:pl-4 basis-full md:basis-1/${section?.columns || 4}`}
              >
                <div 
                  className="group relative h-40 flex items-center justify-center p-4 rounded-xl"
                >
                  <div className="absolute inset-0 rounded-xl bg-xala-secondary border border-xala-accent/20" />
                  
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      filter: 'brightness(0) invert(1)',
                    }}
                  />

                  <div className="absolute bottom-1 left-0 w-full text-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-sm text-white font-medium">
                      {client.name}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div 
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${section?.columns || 4}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${section?.rows || 2}, minmax(0, 1fr))`
        }}
      >
        {clients?.map((client) => (
          <div 
            key={client.id}
            className="group relative h-40 flex items-center justify-center p-4 rounded-xl"
          >
            <div className="absolute inset-0 rounded-xl bg-xala-secondary border border-xala-accent/20" />
            
            <img
              src={client.logo_url}
              alt={client.name}
              className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
              style={{ 
                filter: 'brightness(0) invert(1)',
              }}
            />

            <div className="absolute bottom-1 left-0 w-full text-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-sm text-white font-medium">
                {client.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 text-white">
            {section?.title || t('clients.title')}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {section?.description || t('clients.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default Clients;