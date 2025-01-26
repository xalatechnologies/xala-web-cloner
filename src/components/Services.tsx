import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Code2, Cpu, Database, Globe2, Layout, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, Enums } from '@/integrations/supabase/types';

type SupportedLanguage = Enums<'supported_language'>;

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Code2: <Code2 className="w-8 h-8" />,
  Globe2: <Globe2 className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />
};

const Services = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('services');
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const { data: services = [] } = useQuery({
    queryKey: ['services', i18n.language as SupportedLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('language', i18n.language as SupportedLanguage)
        .order('sort_order');

      if (error) {
        console.error('Error fetching services:', error);
        return [];
      }

      return data;
    }
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
            {services.map((service) => (
              <CarouselItem 
                key={service.id}
                className={`pl-2 md:pl-4 basis-full md:basis-1/${section?.columns || 3}`}
              >
                <div 
                  className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                           backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                           hover:shadow-lg hover:shadow-[#9b87f5]/10"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-transparent 
                                flex items-center justify-center text-[#9b87f5] group-hover:text-white
                                group-hover:from-[#9b87f5] group-hover:to-[#D946EF] transition-all duration-500">
                      {iconMap[service.icon]}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-${section?.columns || 3} gap-8`}>
        {services.map((service) => (
          <div 
            key={service.id}
            className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                     backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                     hover:shadow-lg hover:shadow-[#9b87f5]/10"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-transparent 
                          flex items-center justify-center text-[#9b87f5] group-hover:text-white
                          group-hover:from-[#9b87f5] group-hover:to-[#D946EF] transition-all duration-500">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
                {service.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/90 transition-colors">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-[#1a1f3d] to-xala-primary opacity-90" />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2MiwgODQsIDI0MiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#0EA5E9] text-transparent bg-clip-text">
            {section?.title || t('services.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {section?.description || t('services.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default Services;