import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Logo from './navbar/Logo';
import Controls from './navbar/Controls';
import NavigationMenu from './navbar/NavigationMenu';
import { Skeleton } from './ui/skeleton';
import type { Database } from '@/integrations/supabase/types';
import { useMenuItems } from '@/hooks/use-menu-items';
import { useTranslation } from 'react-i18next';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  language: SupportedLanguage;
  sort_order: number;
  parent_id: string | null;
}

// Hardcoded fallback so a Supabase outage never strips all navigation
// links (mirrors Footer.tsx's fallbackLinks pattern/content).
const FALLBACK_MENU_ITEMS: MenuItem[] = [
  { id: 'fallback-tjenester', name: 'Tjenester', href: '/tjenester', language: 'no', sort_order: 1, parent_id: null },
  { id: 'fallback-produkter', name: 'Produkter', href: '/produkter', language: 'no', sort_order: 2, parent_id: null },
  { id: 'fallback-caser', name: 'Caser', href: '/caser', language: 'no', sort_order: 3, parent_id: null },
  { id: 'fallback-slik-vi-jobber', name: 'Slik vi jobber', href: '/slik-vi-jobber', language: 'no', sort_order: 4, parent_id: null },
  { id: 'fallback-teknologi', name: 'Teknologi', href: '/teknologi', language: 'no', sort_order: 5, parent_id: null },
  { id: 'fallback-om-oss', name: 'Om oss', href: '/om-oss', language: 'no', sort_order: 6, parent_id: null },
  { id: 'fallback-kontakt', name: 'Kontakt', href: '/kontakt', language: 'no', sort_order: 7, parent_id: null },
  { id: 'fallback-privacy', name: 'Personvern', href: '/privacy', language: 'no', sort_order: 8, parent_id: null },
  { id: 'fallback-terms', name: 'Vilkår', href: '/terms', language: 'no', sort_order: 9, parent_id: null },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { i18n } = useTranslation();

  // menu_items is backed by the currently-unreachable Supabase project
  // (see src/integrations/supabase/client.ts) — fall back to a hardcoded
  // menu whenever the query is empty or errors out.
  const { data: menuItems, isLoading, isError } = useMenuItems();
  const navItems = !isError && menuItems && menuItems.length > 0 ? menuItems : FALLBACK_MENU_ITEMS;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    // Language is now handled by i18n library
  };

  if (isLoading) {
    return (
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 supports-[backdrop-filter]:bg-white/80 backdrop-blur border-b border-border/30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center group">
              <div className="relative flex items-center">
                <span className="text-4xl sm:text-5xl font-bold flex items-center light-xala-text">
                  <span className="opacity-0">X</span><span className="ml-[8%]">ALA</span>
                  <span className="text-lg sm:text-xl ml-2 sm:ml-3 font-medium -translate-y-1 tracking-wider font-['Tiro_Devanagari_Sanskrit'] italic light-xala-subtext">Technologies</span>
                </span>
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <Logo className="w-11 h-11 sm:w-14 sm:h-14 text-foreground transition-all duration-300 group-hover:text-xala-accent logo-path" />
                </div>
              </div>
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
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 supports-[backdrop-filter]:bg-white/80 backdrop-blur border-b border-border/30 shadow-sm dark:bg-transparent dark:border-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <div className="relative flex items-center">
              <span className="text-4xl sm:text-5xl font-bold flex items-center light-xala-text">
                <span className="opacity-0">X</span><span className="ml-[8%]">ALA</span>
                <span className="text-lg sm:text-xl ml-2 sm:ml-3 font-medium -translate-y-1 tracking-wider font-['Tiro_Devanagari_Sanskrit'] italic light-xala-subtext">Technologies</span>
              </span>
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <Logo className="w-11 h-11 sm:w-14 sm:h-14 text-foreground transition-all duration-300 group-hover:text-xala-accent logo-path" />
              </div>
            </div>
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
            <NavigationMenu 
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              items={navItems}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;