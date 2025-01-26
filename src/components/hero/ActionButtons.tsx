import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

interface ActionButtonsProps {
  onSectionClick: (sectionId: string) => void;
}

const ActionButtons = ({ onSectionClick }: ActionButtonsProps) => {
  const { i18n } = useTranslation();

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['menuItems', i18n.language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('language', i18n.language as Database['public']['Enums']['supported_language'])
        .in('href', ['/contact', '/work-process', '/about'])
        .order('sort_order');
      
      if (error) {
        console.error('Error fetching menu items:', error);
        return [];
      }
      
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 w-40 bg-white/5 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      {menuItems?.map((item, index) => (
        <Button
          key={item.id}
          onClick={() => onSectionClick(item.href.replace('/', ''))}
          className={`group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105
            ${index === 0 
              ? 'shadow-lg shadow-xala-accent/20 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5] text-white'
              : 'bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm border border-white/20'
            }`}
        >
          {item.name}
          <ArrowRight 
            className={`ml-2 w-5 h-5 ${index === 0 
              ? 'group-hover:translate-x-1 transition-transform' 
              : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all'
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;