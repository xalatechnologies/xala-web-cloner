import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import TeamMemberCard from './TeamMemberCard';
import type { Database } from '@/integrations/supabase/types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];

interface TeamCarouselProps {
  members: TeamMember[];
  columns: number;
  autoscroll: boolean;
}

const TeamCarousel = ({ members, columns, autoscroll }: TeamCarouselProps) => {
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
        {members.map((member) => (
          <CarouselItem 
            key={member.id}
            className={`pl-2 md:pl-4 basis-full md:basis-1/${columns}`}
          >
            <TeamMemberCard
              name={member.name}
              role={member.role}
              description={member.description}
              imageUrl={member.image_url}
              linkedinUrl={member.linkedin_url}
              email={member.email}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TeamCarousel;