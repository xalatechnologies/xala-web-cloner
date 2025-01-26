import React from 'react';
import { Brain, CloudCog, Code2, BarChart2, Shield, Laptop, LineChart, Globe2, Cpu, Layout, Code } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, Enums } from '@/integrations/supabase/types';
import { Skeleton } from '../ui/skeleton';
import { useTranslation } from 'react-i18next';

type SupportedLanguage = Enums<'supported_language'>;

const iconMap = {
  Brain,
  CloudCog,
  Code2,
  BarChart2,
  Shield,
  Laptop,
  LineChart,
  Globe2,
  Cpu,
  Layout,
  Code
};

type IconName = keyof typeof iconMap;

const FeatureCards = () => {
  const { i18n } = useTranslation();

  const { data: features, isLoading, error } = useQuery({
    queryKey: ['featured-services', i18n.language],
    queryFn: async () => {
      console.log('Starting to fetch featured services...');
      console.log('Current language:', i18n.language);
      
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

  if (error) {
    console.error('Query error:', error);
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto my-12">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="h-full p-6 rounded-xl bg-white/5 animate-pulse"
          >
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10" />
                <div className="h-4 w-24 bg-white/10 rounded" />
              </div>
              <div className="h-12 w-full bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto my-12">
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
    className="group h-full p-8 rounded-xl bg-gradient-to-br from-white/[0.075] via-white/[0.035] to-transparent 
                backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 
                transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-xala-accent/10"
  >
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="p-4 rounded-lg bg-gradient-to-br from-xala-accent/20 via-xala-accent/10 to-transparent 
                     group-hover:from-xala-accent/80 group-hover:via-xala-accent/60 group-hover:to-[#D946EF]/40 
                     transition-all duration-500"
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-xala-accent group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-base text-xala-text/80 group-hover:text-white/90 transition-colors leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default FeatureCards;