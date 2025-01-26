import { User, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

type TeamMember = Database['public']['Tables']['team_members']['Row'];

const Teams = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('team');
  // Convert the language code to match the supported_language enum
  const currentLanguage = i18n.language.toLowerCase().split('-')[0] as Database['public']['Enums']['supported_language'];
  
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members', currentLanguage],
    queryFn: async () => {
      console.log('Fetching team members for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }

      return data as TeamMember[];
    }
  });

  return (
    <section id="team" className="py-24 bg-xala-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-60"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-xala-accent mb-6">
            {section?.title || t('team.title')}
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto text-lg">
            {section?.description || t('team.description')}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white/5 rounded-2xl h-96"></div>
            ))}
          </div>
        ) : (
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
              {teamMembers?.map((member) => (
                <CarouselItem 
                  key={member.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 transition-all duration-500 hover:border-xala-accent/50 hover:shadow-2xl hover:shadow-xala-accent/10">
                    <div className="relative aspect-square mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-xala-secondary to-xala-primary">
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-xala-accent mb-3">{member.name}</h3>
                      <p className="text-xala-text/90 font-semibold mb-4 text-lg">{member.role}</p>
                      <p className="text-sm text-xala-text/70 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                        {member.description}
                      </p>
                    </div>

                    <div className="absolute top-6 right-6 flex space-x-3">
                      {member.linkedin_url && (
                        <a 
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
                        >
                          <Linkedin className="w-5 h-5 text-xala-accent" />
                        </a>
                      )}
                      <a 
                        href={`mailto:${member.email}`}
                        className="p-2.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
                      >
                        <Mail className="w-5 h-5 text-xala-accent" />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Teams;