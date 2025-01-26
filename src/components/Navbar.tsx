import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from './navbar/Logo';
import Controls from './navbar/Controls';
import NavigationMenu from './navbar/NavigationMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<'EN' | 'NO'>(i18n.language === 'en' ? 'EN' : 'NO');

  const sections = [
    { name: "navigation.home", href: "#home" },
    { name: "navigation.about", href: "#about" },
    { name: "navigation.coreProducts", href: "#core-products" },
    { name: "navigation.technologies", href: "#technologies" },
    { name: "navigation.workProcess", href: "#work-process" },
    { name: "navigation.caseStudies", href: "#case-studies" },
    { name: "navigation.team", href: "#team" },
    { name: "navigation.contact", href: "#contact" }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'NO' : 'EN';
    setLanguage(newLang);
    i18n.changeLanguage(newLang.toLowerCase());
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