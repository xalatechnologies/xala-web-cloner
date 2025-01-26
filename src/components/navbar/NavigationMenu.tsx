import { Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface NavigationMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sections: Array<{ name: string; href: string; }>;
}

const NavigationMenu = ({ isOpen, setIsOpen, sections }: NavigationMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

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
        className={`absolute top-full left-0 w-full bg-gradient-to-br from-xala-primary/95 via-xala-secondary/95 to-xala-primary/95 backdrop-blur-lg transform transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <a
                key={section.name}
                href={section.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-xala-text hover:text-xala-accent transform transition-all duration-300 hover:translate-x-2 relative group"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: `opacity 500ms ease ${index * 100}ms, transform 500ms ease ${index * 100}ms`
                }}
              >
                {t(getTranslationKey(section.name))}
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-xala-accent transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;