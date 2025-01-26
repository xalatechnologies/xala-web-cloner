import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Brain, CloudCog, Code2, BarChart2, Shield, Laptop, LineChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, Enums } from '@/integrations/supabase/types';

type SupportedLanguage = Enums<'supported_language'>;

const iconMap = {
  Brain,
  CloudCog,
  Code2,
  BarChart2,
  Shield,
  Laptop,
  LineChart,
};

type IconName = keyof typeof iconMap;

const FeatureCards = () => {
  const { i18n } = useTranslation();
  
  const { data: features, isLoading } = useQuery({
    queryKey: ['featured-services', i18n.language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('language', i18n.language as SupportedLanguage)
        .eq('featured', true)
        .order('sort_order')
        .limit(4);
      
      if (error) {
        console.error('Error fetching featured services:', error);
        throw error;
      }
      
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto my-12">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="p-6 rounded-xl bg-white/5 animate-pulse"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10" />
              <div className="h-4 w-24 bg-white/10 rounded" />
              <div className="h-12 w-full bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto my-12">
      {features?.map((feature) => {
        const IconComponent = iconMap[feature.icon as IconName];
        if (!IconComponent) {
          console.warn(`Icon ${feature.icon} not found in iconMap`);
          return null;
        }
        return (
          <FeatureCard
            key={feature.id}
            icon={<IconComponent className="w-8 h-8 text-xala-accent group-hover:text-white transition-colors" />}
            title={feature.title}
            description={feature.description}
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
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div 
    className="group p-6 rounded-xl bg-gradient-to-br from-white/[0.075] via-white/[0.035] to-transparent 
                backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 
                transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-xala-accent/10"
  >
    <div className="flex flex-col items-center gap-4">
      <div 
        className="p-3 rounded-lg bg-gradient-to-br from-xala-accent/20 via-xala-accent/10 to-transparent 
                   group-hover:from-xala-accent/80 group-hover:via-xala-accent/60 group-hover:to-[#D946EF]/40 
                   transition-all duration-500"
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-xala-accent group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-sm text-center text-xala-text/80 group-hover:text-white/90 transition-colors">
        {description}
      </p>
    </div>
  </div>
);

export default FeatureCards;