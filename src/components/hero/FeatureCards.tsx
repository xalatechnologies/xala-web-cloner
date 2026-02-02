import React from 'react';
import { Brain, CloudCog, Code2, HelpCircle } from 'lucide-react';
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
  const currentLanguage = i18n.language;

  const { data: features = [], isLoading } = useQuery({
    queryKey: ['featured-services', currentLanguage],
    queryFn: async () => {
      const languageCode = currentLanguage.split('-')[0].toLowerCase();

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('featured', true)
        .eq('language', languageCode)
        .order('sort_order')
        .limit(3);

      if (error) {
        console.error('Error fetching featured services:', error);
        return [];
      }

      return data || [];
    }
  });

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) {
      return <HelpCircle className="w-6 h-6" />;
    }
    return <IconComponent className="w-6 h-6" />;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-12">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-full p-6 rounded-2xl bg-card animate-pulse border border-border"
          >
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted" />
                <div className="h-6 w-32 bg-muted rounded" />
              </div>
              <div className="h-24 w-full bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-12 perspective-1000">
      {features?.map((feature, index) => {
        return (
          <FeatureCard
            key={feature.id}
            icon={getIconComponent(feature.icon as IconName)}
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
    className={`group relative h-full p-6 rounded-3xl bg-card text-card-foreground border border-border hover:border-primary/50 
                transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20
                animate-fade-in cursor-pointer overflow-hidden text-left dark:bg-gradient-to-br dark:from-white/[0.08] dark:via-white/[0.04] dark:to-transparent`}
  >
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-[linear-gradient(135deg,hsla(var(--primary),0)_0%,hsla(280,65%,60%,0)_100%)] 
                    group-hover:bg-[linear-gradient(135deg,hsla(var(--primary),0.2)_0%,hsla(280,65%,60%,0.1)_100%)] transition-all duration-700 rounded-3xl opacity-0 group-hover:opacity-100" />

    {/* Glowing orb effect */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl 
                    group-hover:bg-primary/40 transform group-hover:scale-150 transition-all duration-700 opacity-0 group-hover:opacity-100" />

    {/* Animated border */}
    <div className="absolute inset-0 rounded-[2rem_0.5rem_2rem_2rem] border border-primary/0 group-hover:border-primary/30 
                    transition-all duration-700" />

    <div className="relative flex flex-col h-full z-10">
      <div className="flex justify-center mb-6">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl 
                        bg-gradient-to-br from-primary/20 via-primary/10 to-transparent
                        group-hover:from-primary/30 group-hover:via-primary/15 group-hover:to-transparent
                        group-hover:scale-110 transition-all duration-500">
          {/* Icon glow effect */}
          <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-primary">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary/80 
                     bg-clip-text text-transparent group-hover:from-primary group-hover:via-foreground group-hover:to-[#D946EF]
                     transition-all duration-700 tracking-tight mb-4">
        {title}
      </h3>
      <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors duration-700 leading-relaxed">
        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
      </p>
    </div>
  </div>
);

export default FeatureCards;