import { useQuery } from '@tanstack/react-query';
import { Code, Shield, LineChart, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { type Database } from '@/integrations/supabase/types';
import ServiceBackground from './services/ServiceBackground';
import { useSection } from '@/hooks/use-section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const iconMap: { [key: string]: React.ReactNode } = {
  Code: <Code className="w-12 h-12 text-xala-accent mb-4" />,
  Shield: <Shield className="w-12 h-12 text-xala-accent mb-4" />,
  LineChart: <LineChart className="w-12 h-12 text-xala-accent mb-4" />,
  Laptop: <Laptop className="w-12 h-12 text-xala-accent mb-4" />
};

const Services = () => {
  const { i18n } = useTranslation();
  const { data: section } = useSection('services');
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching services for language:', currentLanguage);
      
      let query = await supabase
        .from('services')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (query.error) {
        console.error('Error fetching services:', query.error);
        throw query.error;
      }

      return query.data || [];
    },
  });

  const renderContent = () => {
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
            {services?.map((service) => (
              <CarouselItem 
                key={service.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ServiceCard service={service} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-${section?.columns || 4} gap-8`}>
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-xala-secondary relative">
        <ServiceBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-xala-primary/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-xala-primary/20 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="p-6 bg-xala-primary/80 backdrop-blur-sm rounded-lg animate-pulse"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-xala-accent/20 rounded-lg mb-4" />
                  <div className="h-6 w-32 bg-xala-accent/20 rounded mb-3" />
                  <div className="h-4 w-full bg-xala-accent/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-xala-secondary relative">
      <ServiceBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">
            {section?.title || 'Our Services'}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {section?.description || 'We deliver comprehensive technology solutions to help your business succeed in the digital age'}
          </p>
        </div>
        {renderContent()}
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: Database['public']['Tables']['services']['Row'] }) => {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];
  
  return (
    <div className="p-6 bg-xala-primary/80 backdrop-blur-sm rounded-lg hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        {IconComponent}
        <h3 className="text-xl font-semibold mb-3 text-xala-accent">{service.title}</h3>
        <p className="text-xala-text">{service.description}</p>
      </div>
    </div>
  );
};

export default Services;