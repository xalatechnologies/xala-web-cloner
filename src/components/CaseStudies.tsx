import { ArrowRight, BookOpen, ChartBar, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";
import { type Database } from "@/integrations/supabase/types";

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

const CaseStudies = () => {
  const { t, i18n } = useTranslation();
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching case studies for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('case_studies')
        .select(`
          *,
          case_study_metrics(*)
        `)
        .eq('language', currentLanguage)
        .eq('status', 'published')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as (CaseStudy & { case_study_metrics: any[] })[];
    },
    enabled: !!i18n.language
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-xala-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-xala-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-xala-accent mb-4">
            {t('caseStudies.title')}
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto">
            {t('caseStudies.description')}
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
            dragFree: true,
            skipSnaps: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {caseStudies?.map((study) => (
              <CarouselItem 
                key={study.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card 
                  className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm 
                           border border-white/10 hover:border-xala-accent/50 transition-all duration-300"
                >
                  <CardContent className="p-0">
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={study.image_url}
                        alt={study.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xala-accent">
                        {study.icon && (
                          <img 
                            src={study.icon} 
                            alt="" 
                            className="w-6 h-6"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-xala-accent mb-3">
                        {study.title}
                      </h3>
                      <p className="text-xala-text/70 mb-4">
                        {study.description}
                      </p>
                      
                      {/* Read more link */}
                      <div className="flex items-center gap-2 text-xala-accent group/link cursor-pointer">
                        <span className="font-medium">
                          {t('caseStudies.readMore')}
                        </span>
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default CaseStudies;