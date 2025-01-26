import React from 'react';
import { Brain, CloudCog, Code2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, Enums } from '@/integrations/supabase/types';
import { useTranslation } from 'react-i18next';

type SupportedLanguage = Enums<'supported_language'>;

const iconMap = {
  Brain,
  CloudCog,
  Code2
};

type IconName = keyof typeof iconMap;

const FeatureCards = () => {
  const { i18n } = useTranslation();

  const { data: features, isLoading } = useQuery({
    queryKey: ['featured-services', i18n.language],
    queryFn: async () => {
      console.log('Fetching featured services...');
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('featured', true)
        .eq('language', i18n.language.toLowerCase() as SupportedLanguage)
        .order('sort_order')
        .limit(3);
      
      if (error) {
        console.error('Error fetching featured services:', error);
        return [];
      }
      
      console.log('Fetched featured services:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-12">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="h-full p-6 rounded-2xl bg-white/5 animate-pulse backdrop-blur-sm border border-white/5"
          >
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white/10" />
                <div className="h-6 w-32 bg-white/10 rounded" />
              </div>
              <div className="h-24 w-full bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-12 perspective-1000">
      {features?.map((feature, index) => {
        const IconComponent = iconMap[feature.icon as IconName];
        if (!IconComponent) {
          console.warn(`Icon ${feature.icon} not found in iconMap`);
          return null;
        }
        return (
          <FeatureCard
            key={feature.id}
            icon={<IconComponent className="w-[200%] h-[200%] text-xala-accent/5 group-hover:text-white/5 transition-all duration-700" />}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        );
      })}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <div 
    className={`group relative h-full p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent 
                backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 
                transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-xala-accent/20
                animate-fade-in cursor-pointer overflow-hidden text-left`}
    style={{ 
      animationDelay: `${index * 200}ms`,
      transform: `perspective(1000px) rotateY(${index * 5}deg)`
    }}
  >
    {/* Background icon */}
    <div className="absolute -right-1/4 -bottom-1/4 transform scale-100 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12">
      {icon}
    </div>
    
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-xala-accent/0 via-[#9b87f5]/0 to-[#D946EF]/0 
                    group-hover:from-xala-accent/20 group-hover:via-[#9b87f5]/10 group-hover:to-[#D946EF]/5 
                    transition-all duration-700 rounded-3xl opacity-0 group-hover:opacity-100" />
    
    {/* Glowing orb effect */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-xala-accent/30 rounded-full blur-3xl 
                    group-hover:bg-xala-accent/40 transform group-hover:scale-150 transition-all duration-700 opacity-0 group-hover:opacity-100" />
    
    {/* Animated border */}
    <div className="absolute inset-0 rounded-3xl border border-xala-accent/0 group-hover:border-xala-accent/30 
                    transition-all duration-700" />

    <div className="relative flex flex-col h-full z-10">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-white to-xala-accent/80 
                     bg-clip-text text-transparent group-hover:from-xala-accent group-hover:via-white group-hover:to-[#D946EF]
                     transition-all duration-700 tracking-tight mb-6">
        {title}
      </h3>
      <p className="text-lg text-xala-text/70 group-hover:text-white/90 transition-colors duration-700 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default FeatureCards;