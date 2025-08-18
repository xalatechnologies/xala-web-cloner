import React from 'react';
import { ArrowDown, Calendar, Lightbulb } from 'lucide-react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '../ui/skeleton';
import { useTranslation } from 'react-i18next';
import { useBusinessHero } from '@/i18n/business-content';
import type { Tables, Enums } from '@/integrations/supabase/types';

type SupportedLanguage = Enums<'supported_language'>;

interface ActionButtonsProps {
  onSectionClick: (sectionId: string) => void;
}

const ActionButtons = ({ onSectionClick }: ActionButtonsProps) => {
  const { i18n } = useTranslation();
  const businessHero = useBusinessHero();
  
  const { data: buttons, isLoading } = useQuery({
    queryKey: ['hero-buttons', i18n.language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('location', 'hero')
        .eq('language', i18n.language.toLowerCase() as SupportedLanguage)
        .order('sort_order');

      if (error) {
        return [];
      }

      return data;
    }
  });

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  const handleConsultationClick = () => {
    // Navigate to contact form with business consultation pre-selected
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      // Could also pre-populate the form with consultation request
    }
  };

  const handleSolutionsClick = () => {
    // Navigate to services section
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14 w-40" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch w-full max-w-4xl mx-auto">
      {/* Primary CTA: Business Consultation */}
      <Button
        onClick={handleConsultationClick}
        className="group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105 flex-1 min-w-[200px]
          shadow-lg shadow-xala-accent/20 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] 
          hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5] text-white"
      >
        <span className="flex items-center gap-2 text-base sm:text-lg">
          <Calendar className="w-5 h-5" />
          {businessHero.cta.secondary}
        </span>
      </Button>

      {/* Secondary CTA: Explore Solutions */}
      <Button
        onClick={handleSolutionsClick}
        className="group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105 flex-1 min-w-[200px]
          bg-card text-card-foreground hover:bg-muted border border-border dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
      >
        <span className="flex items-center gap-2 text-base sm:text-lg">
          <Lightbulb className="w-5 h-5" />
          {businessHero.cta.primary}
        </span>
      </Button>

      {/* Fallback: Database-driven buttons if available */}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {buttons.slice(0, 1).map((button) => (
            <Button
              key={button.id}
              onClick={() => handleClick(button.href)}
              variant="outline"
              className="group px-6 py-4 rounded-lg font-medium transition-all 
                bg-card text-card-foreground hover:bg-muted border border-border dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <span className="flex items-center gap-2 text-sm">
                {button.name}
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionButtons;