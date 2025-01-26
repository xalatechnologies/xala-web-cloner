import { useState } from 'react';
import { Toggle } from './ui/toggle';
import { Button } from './ui/button';
import { Globe, Moon, Sun, Menu } from 'lucide-react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'EN' ? 'NO' : 'EN');
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-xala-primary/80 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-xala-accent">MyLogo</div>
          
          {/* Right side controls group */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Toggle
              aria-label="Toggle theme"
              pressed={isDarkMode}
              onPressedChange={toggleTheme}
              className="hover:bg-xala-secondary/50"
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Toggle>

            {/* Language Toggle */}
            <Toggle
              aria-label="Toggle language"
              pressed={language === 'NO'}
              onPressedChange={toggleLanguage}
              className="hover:bg-xala-secondary/50"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm">{language}</span>
            </Toggle>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-2 pb-4">
              <li><a href="#home" className="text-xala-text block px-4 py-2 hover:bg-xala-secondary/50 rounded">Home</a></li>
              <li><a href="#about" className="text-xala-text block px-4 py-2 hover:bg-xala-secondary/50 rounded">About</a></li>
              <li><a href="#services" className="text-xala-text block px-4 py-2 hover:bg-xala-secondary/50 rounded">Services</a></li>
              <li><a href="#contact" className="text-xala-text block px-4 py-2 hover:bg-xala-secondary/50 rounded">Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;