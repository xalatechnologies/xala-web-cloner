import { Database } from '@/integrations/supabase/types';
import { Menu, X, Settings, Code, Briefcase, Target, Info, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useBusinessNavigation, useBusinessServices } from '@/i18n/business-content';
import { MenuItem } from '../Navbar';
import { Link } from 'react-router-dom';

interface NavigationMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: MenuItem[];
}

const NavigationMenu = ({ isOpen, setIsOpen, items }: NavigationMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const businessNav = useBusinessNavigation();
  const businessServices = useBusinessServices();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const getTranslationKey = (name: string) => {
    const key = name.toLowerCase().replace(/\s+/g, '');
    return `nav.${key}`;
  };

  // Main navigation items for the hamburger menu
  const mainNavItems = [
    {
      name: t('nav.services'),
      href: '/tjenester',
      icon: Settings
    },
    {
      name: t('nav.products'),
      href: '/produkter',
      icon: Code
    },
    {
      name: t('nav.cases'),
      href: '/caser',
      icon: Briefcase
    },
    {
      name: t('nav.workProcess'),
      href: '/slik-vi-jobber',
      icon: Target
    },
    {
      name: t('nav.technology'),
      href: '/teknologi',
      icon: Code
    },
    // {
    //   name: t('nav.team'),
    //   href: '/om-oss/team',
    //   icon: Users
    // },
    {
      name: t('nav.about'),
      href: '/om-oss',
      icon: Info
    },
    {
      name: t('nav.contact'),
      href: '/kontakt',
      icon: Phone,
      isPrimary: true
    }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-xala-text hover:text-xala-accent focus:outline-none transition-colors relative group"
        aria-expanded="false"
      >
        <div className="relative">
          {isOpen ? (
            <X size={24} className="transform transition-transform duration-300 rotate-90 group-hover:rotate-180" />
          ) : (
            <Menu size={24} className="transform transition-transform duration-300 group-hover:rotate-90" />
          )}
          <div className="absolute inset-0 bg-xala-accent/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>

      <div 
        ref={menuRef}
        className={`absolute top-full left-0 w-full backdrop-blur-lg transform transition-all duration-500 ease-in-out bg-[linear-gradient(135deg,hsl(var(--card))_0%,hsl(var(--muted))_100%)] border-t border-border/50 shadow-xl ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Navigation Grid - Optimized for 2 rows */}
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* First 4 items - First row on large screens */}
            {mainNavItems.slice(0, 4).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group cursor-pointer p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] border block shadow-md hover:shadow-lg bg-card/90 border-border/50 hover:border-border min-w-0 backdrop-blur-sm nav-item-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-muted/80 group-hover:bg-primary/20 transition-colors duration-200">
                      <IconComponent 
                        size={20} 
                        className="transition-colors text-foreground group-hover:text-primary" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium transition-colors text-foreground truncate group-hover:text-primary">
                        {item.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {/* Last 4 items - Second row on large screens */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="grid grid-cols-4 gap-5 max-w-4xl mx-auto">
                {mainNavItems.slice(4).map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group cursor-pointer p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] border block shadow-md hover:shadow-lg min-w-0 backdrop-blur-sm nav-item-hover ${
                        item.isPrimary 
                          ? 'bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30 hover:border-primary/50' 
                          : 'bg-card/90 border-border/50 hover:border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg transition-colors duration-200 ${
                          item.isPrimary 
                            ? 'bg-primary/20 group-hover:bg-primary/30' 
                            : 'bg-muted/80 group-hover:bg-primary/20'
                        }`}>
                          <IconComponent 
                            size={20} 
                            className={`transition-colors ${
                              item.isPrimary 
                                ? 'text-primary group-hover:text-primary/80' 
                                : 'text-foreground group-hover:text-primary'
                            }`} 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-base font-medium transition-colors truncate ${
                            item.isPrimary 
                              ? 'text-primary group-hover:text-primary/80' 
                              : 'text-foreground group-hover:text-primary'
                          }`}>
                            {item.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile and tablet: show last 4 items normally */}
            {mainNavItems.slice(4).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={`mobile-${item.name}`}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`lg:hidden group cursor-pointer p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] border block shadow-md hover:shadow-lg min-w-0 backdrop-blur-sm nav-item-hover ${
                    item.isPrimary 
                      ? 'bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30 hover:border-primary/50' 
                      : 'bg-card/90 border-border/50 hover:border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg transition-colors duration-200 ${
                      item.isPrimary 
                        ? 'bg-primary/20 group-hover:bg-primary/30' 
                        : 'bg-muted/80 group-hover:bg-primary/20'
                    }`}>
                      <IconComponent 
                        size={20} 
                        className={`transition-colors ${
                          item.isPrimary 
                            ? 'text-primary group-hover:text-primary/80' 
                            : 'text-foreground group-hover:text-primary'
                        }`} 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-base font-medium transition-colors truncate ${
                        item.isPrimary 
                          ? 'text-primary group-hover:text-primary/80' 
                          : 'text-foreground group-hover:text-primary'
                      }`}>
                        {item.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Fallback: Database menu items if available */}
          {mainNavItems.length === 0 && items.length > 0 && (
            <div className="grid gap-6">
              {items.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-foreground hover:text-primary transform transition-all duration-300 hover:translate-x-2 relative group block"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;