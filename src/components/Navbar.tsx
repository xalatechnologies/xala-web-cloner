import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Logo from './navbar/Logo';
import Controls from './navbar/Controls';
import NavigationMenu from './navbar/NavigationMenu';
import { Skeleton } from './ui/skeleton';
import type { Database } from '@/integrations/supabase/types';
import { useMenuItems } from '@/hooks/use-menu-items';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  language: SupportedLanguage;
  sort_order: number;
  parent_id: string | null;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'NO'>('NO');

  const { data: menuItems, isLoading } = useMenuItems();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'NO' : 'EN');
  };

  if (isLoading) {
    return (
      <nav className="fixed w-full z-50 backdrop-blur-md bg-gradient-to-r from-xala-primary/80 via-xala-secondary/80 to-xala-primary/80 border-b border-xala-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />
            <div className="flex items-center gap-4">
              <Controls 
                isDarkMode={isDarkMode}
                language={language}
                onThemeToggle={toggleTheme}
                onLanguageToggle={toggleLanguage}
              />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-gradient-to-r from-xala-primary/80 via-xala-secondary/80 to-xala-primary/80 border-b border-xala-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="flex items-center gap-4">
            <Controls 
              isDarkMode={isDarkMode}
              language={language}
              onThemeToggle={toggleTheme}
              onLanguageToggle={toggleLanguage}
            />
            
            <NavigationMenu 
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              items={menuItems || []}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;