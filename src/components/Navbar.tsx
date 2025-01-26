import { useState } from 'react';
import Logo from './navbar/Logo';
import Controls from './navbar/Controls';
import NavigationMenu from './navbar/NavigationMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'NO'>('EN');

  const sections = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Core Products", href: "#core-products" },
    { name: "Technologies", href: "#technologies" },
    { name: "Work Process", href: "#work-process" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'NO' : 'EN');
  };

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
              sections={sections}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;