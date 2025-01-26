import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sections: Array<{ name: string; href: string; }>;
}

const NavigationMenu = ({ isOpen, setIsOpen, sections }: NavigationMenuProps) => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-md text-xala-text hover:text-xala-accent"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Desktop navigation */}
      <div className="hidden lg:flex lg:gap-x-8">
        {sections.map((section, index) => (
          <a
            key={index}
            href={section.href}
            className="text-xala-text hover:text-xala-accent transition-colors duration-300"
          >
            {t(section.name)}
          </a>
        ))}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-xala-primary border-b border-xala-accent/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {sections.map((section, index) => (
              <a
                key={index}
                href={section.href}
                className="block px-3 py-2 text-xala-text hover:text-xala-accent transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {t(section.name)}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationMenu;