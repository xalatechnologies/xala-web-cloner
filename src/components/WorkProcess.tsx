import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";
import * as Icons from "lucide-react";
import { LucideIcon, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const WorkProcess = () => {
  const { t, i18n } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('work-process');
  
  const { data: processes, isLoading: isProcessesLoading } = useQuery({
    queryKey: ['work-processes', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as "en" | "no";
      console.log('Fetching work processes for language:', currentLanguage);
      
      let query = await supabase
        .from('work_processes')
        .select('*')
        .eq('language', currentLanguage)
        .order('step_number', { ascending: true });

      if (query.error || !query.data?.length) {
        console.log('Falling back to English for work processes');
        query = await supabase
          .from('work_processes')
          .select('*')
          .eq('language', 'en')
          .order('step_number', { ascending: true });
      }

      if (query.error) {
        console.error('Error fetching work processes:', query.error);
        throw query.error;
      }

      return query.data || [];
    },
  });

  const getIconComponent = (iconName: string): LucideIcon => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
    return IconComponent || Icons.HelpCircle;
  };

  const isLoading = isSectionLoading || isProcessesLoading;
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    })
  );

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/10">
                <Skeleton className="h-8 w-8 mb-6" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const columns = section?.columns || 3;
  const rows = section?.rows || 1;
  const shouldUseCarousel = section?.carousel || false;
  const enableAutoscroll = section?.autoscroll || false;

  const renderProcessCard = (process: any, index: number, totalProcesses: number) => {
    const Icon = getIconComponent(process.icon);
    
    return (
      <div key={process.id} className="relative group flex items-center">
        <div
          className="flex-1 relative h-full"
          style={{
            animation: 'fade-in 0.5s ease-out forwards',
            opacity: 0
          }}
        >
          <div className="h-full relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 
                        hover:border-xala-accent/50 transition-all duration-500 group-hover:transform group-hover:scale-105
                        group-hover:shadow-2xl group-hover:shadow-xala-accent/20">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-xala-accent rounded-full flex items-center justify-center
                          transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold">{String(process.step_number).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-xala-accent relative">
                <div className="absolute inset-0 bg-xala-accent/20 filter blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-xala-accent">{process.title}</h3>
            </div>

            <p className="text-xala-text/70">{process.description}</p>
          </div>
        </div>
        
        {/* Add arrow if not the last item in the row */}
        {index < totalProcesses - 1 && (index + 1) % columns !== 0 && (
          <div className="flex-shrink-0 px-4 text-xala-accent">
            <ArrowRight className="w-6 h-6 animate-pulse" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="work-process" className="py-24 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5 animate-pulse"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl animate-float-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/30 rounded-full filter blur-3xl animate-float-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            {section?.title || t('workProcess.title')}
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto text-lg">
            {section?.description || t('workProcess.description')}
          </p>
        </div>

        {shouldUseCarousel ? (
          <Carousel
            plugins={enableAutoscroll ? [plugin.current] : []}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {processes?.map((process, index) => (
                <CarouselItem 
                  key={process.id}
                  className="pl-2 md:pl-4"
                  style={{ flex: `0 0 ${100 / columns}%` }}
                >
                  {renderProcessCard(process, index, processes.length)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div 
            className="grid gap-8"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
            }}
          >
            {processes?.map((process, index) => renderProcessCard(process, index, processes.length))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkProcess;
