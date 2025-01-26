import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '../ui/skeleton';
import { useTranslation } from 'react-i18next';
import type { Tables } from '@/integrations/supabase/types';

interface ActionButtonsProps {
  onSectionClick: (sectionId: string) => void;
}

const ActionButtons = ({ onSectionClick }: ActionButtonsProps) => {
  const { i18n } = useTranslation();
  
  const { data: buttons, isLoading } = useQuery({
    queryKey: ['hero-buttons', i18n.language],
    queryFn: async () => {
      console.log('Fetching hero buttons for language:', i18n.language);
      
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('location', 'hero')
        .eq('language', i18n.language.toLowerCase())
        .order('sort_order');

      if (error) {
        console.error('Error fetching hero buttons:', error);
        return [];
      }

      return data;
    }
  });

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
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      {buttons?.map((button, index) => (
        <Button
          key={button.id}
          onClick={() => onSectionClick(button.href)}
          className={`group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105
            ${index === 0 
              ? 'shadow-lg shadow-xala-accent/20 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5] text-white'
              : 'bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm border border-white/20'
            }`}
        >
          <span className="flex items-center gap-2">
            {button.name}
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;