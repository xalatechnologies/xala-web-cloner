import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Brain, CloudCog, Code2, BarChart2, Shield, Laptop, LineChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, Enums } from '@/integrations/supabase/types';

type SupportedLanguage = Enums<'supported_language'>;

const iconMap = {
  Brain: Brain,
  CloudCog: CloudCog,
  Code2: Code2,
  BarChart2: BarChart2,
  Shield: Shield,
  Laptop: Laptop,
  LineChart: LineChart,
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
        .order('sort_order');
      
      if (error) {
        console.error('Error fetching featured services:', error);
        throw error;
      }
      
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto my-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 animate-pulse">
            <div className="h-32"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto my-12">
      {features?.map((feature) => {
        const IconComponent = iconMap[feature.icon as IconName];
        if (!IconComponent) {
          console.warn(`Icon ${feature.icon} not found in iconMap`);
          return null;
        }
        return (
          <FeatureCard
            key={feature.id}
            icon={<IconComponent className="w-8 h-8 text-xala-accent" />}
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
  <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-xala-accent">{title}</h3>
      <p className="text-sm text-xala-text/80">{description}</p>
    </div>
  </div>
);

export default FeatureCards;