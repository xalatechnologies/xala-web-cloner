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
      <nav className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="#home" className="flex items-center gap-3 group">
              <Logo className="w-10 h-10 text-white transition-all duration-300 group-hover:text-xala-accent" />
              <span className="text-3xl font-bold bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_200%] group-hover:animate-gradient-x">
                Xala
              </span>
            </a>
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
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 text-white transition-all duration-300 group-hover:text-xala-accent" />
            <span className="text-3xl font-bold bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_200%] group-hover:animate-gradient-x">
              Xala
            </span>
          </a>
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