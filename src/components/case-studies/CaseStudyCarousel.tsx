import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import CaseStudyCard from './CaseStudyCard';
import type { Database } from '@/integrations/supabase/types';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'] & {
  case_study_metrics: Database['public']['Tables']['case_study_metrics']['Row'][];
};

interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
  columns: number;
  autoscroll: boolean;
}

const CaseStudyCarousel = ({ caseStudies, columns, autoscroll }: CaseStudyCarouselProps) => {
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
        align: "center",
        loop: true,
        dragFree: true,
        skipSnaps: true,
      }}
      plugins={autoscroll ? [plugin.current] : []}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {caseStudies.map((study) => (
          <CarouselItem 
            key={study.id}
            className={`pl-2 md:pl-4 basis-full md:basis-1/${columns}`}
          >
            <CaseStudyCard
              title={study.title}
              description={study.description}
              imageUrl={study.image_url}
              icon={study.icon}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CaseStudyCarousel;