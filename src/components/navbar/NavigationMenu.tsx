import { Database } from '@/integrations/supabase/types';
import { Menu, X, Calendar, Lightbulb, Target, Users, MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useBusinessNavigation, useBusinessServices } from '@/i18n/business-content';
import { MenuItem } from '../Navbar';

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

  // Business-focused navigation items
  const businessNavItems = [
    {
      name: businessNav.challenge,
      href: '#services',
      icon: Target,
      description: 'Discover how we solve business challenges',
      isChallenge: true
    },
    {
      name: businessNav.solutions,
      href: '#services',
      icon: Lightbulb,
      description: businessServices.digitalTransformation.outcome.substring(0, 60) + '...'
    },
    {
      name: businessNav.outcomes,
      href: '#case-studies',
      icon: Target,
      description: 'See measurable business results from our partnerships'
    },
    {
      name: businessNav.partnership,
      href: '#about',
      icon: Users,
      description: 'Learn about our collaborative approach'
    },
    {
      name: businessNav.consultation,
      href: '#contact',
      icon: Calendar,
      description: 'Schedule a free business consultation',
      isPrimary: true
    }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
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
        className={`absolute top-full left-0 w-full backdrop-blur-lg transform transition-all duration-500 ease-in-out bg-[linear-gradient(135deg,hsl(var(--card))_0%,hsl(var(--muted))_100%)] ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Business Challenge Header */}
          <div className="mb-8 text-center">
            <h3 className="text-xl font-semibold text-primary mb-2">
              {businessNav.challenge}
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose your business transformation journey
            </p>
          </div>

          {/* Business Navigation Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {businessNavItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`group cursor-pointer p-4 rounded-lg transition-all duration-300 hover:scale-105 border [transition:opacity_500ms,transform_500ms] ${
                    item.isPrimary 
                      ? 'bg-[linear-gradient(90deg,hsla(var(--primary),0.15),hsla(280,65%,60%,0.15))] border-primary' 
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${item.isPrimary ? 'bg-[hsla(var(--primary),0.15)]' : 'bg-muted'}`}>
                      <IconComponent 
                        size={20} 
                        className={`transition-colors ${item.isPrimary ? 'text-primary' : 'text-foreground'}`} 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 transition-colors ${item.isPrimary ? 'text-primary' : 'text-foreground'}`}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.isPrimary && (
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        <Calendar size={12} />
                        Free consultation
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fallback: Original menu items if business nav is empty */}
          {businessNavItems.length === 0 && items.length > 0 && (
            <div className="grid gap-6">
              {items.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-foreground hover:text-primary transform transition-all duration-300 hover:translate-x-2 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;