import { useState } from 'react';
import { Link } from 'react-router-dom';
import Controls from './navbar/Controls';
import NavigationMenu from './navbar/NavigationMenu';
import { Skeleton } from './ui/skeleton';
import type { Database } from '@/integrations/supabase/types';
import { useMenuItems } from '@/hooks/use-menu-items';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

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
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const { data: menuItems, isLoading } = useMenuItems();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    // Language is now handled by i18n library
  };

  // Select logo based on theme
  const logoSrc = theme === 'dark'
    ? '/LOGO/PNG/Asset 3@6x.png'  // White logo for dark mode
    : '/LOGO/PNG/Asset 4@6x.png'; // Green logo for light mode

  if (isLoading) {
    return (
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 supports-[backdrop-filter]:bg-white/70 backdrop-blur-xl border-b border-border/20 shadow-sm dark:bg-black/40 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center group">
              <img
                src={logoSrc}
                alt="Xala Technologies"
                className="h-12 sm:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex">
                <Controls
                  isDarkMode={isDarkMode}
                  language={i18n.language === 'en' ? 'EN' : 'NO'}
                  onThemeToggle={toggleTheme}
                  onLanguageToggle={toggleLanguage}
                />
              </div>
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
    <nav className="fixed top-0 inset-x-0 z-50 
                    bg-white/80 supports-[backdrop-filter]:bg-white/70 backdrop-blur-xl 
                    border-b border-border/20 shadow-sm
                    dark:bg-black/40 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-lg dark:shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <img
              src={logoSrc}
              alt="Xala Technologies"
              className="h-12 sm:h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
          </Link>
          <div className="flex items-center gap-2">
            {/* Desktop controls */}
            <div className="hidden md:flex">
              <Controls
                isDarkMode={isDarkMode}
                language={i18n.language === 'en' ? 'EN' : 'NO'}
                onThemeToggle={toggleTheme}
                onLanguageToggle={toggleLanguage}
              />
            </div>
            {/* Mobile controls - show to the left of hamburger */}
            <div className="flex md:hidden">
              <Controls
                isDarkMode={isDarkMode}
                language={i18n.language === 'en' ? 'EN' : 'NO'}
                onThemeToggle={toggleTheme}
                onLanguageToggle={toggleLanguage}
              />
            </div>
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