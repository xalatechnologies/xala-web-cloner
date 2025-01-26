import { useState, useEffect, useRef } from 'react';
import { Menu, X, Brain, Github, Linkedin, Twitter, Sun, Moon, Globe } from 'lucide-react';
import { Toggle } from './ui/toggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'NO'>('EN');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "https://github.com/xala-technologies",
      label: "GitHub"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "https://linkedin.com/company/xala-technologies",
      label: "LinkedIn"
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "https://twitter.com/xala_tech",
      label: "Twitter"
    }
  ];

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
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Theme implementation would go here
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'NO' : 'EN');
    // Language implementation would go here
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-gradient-to-r from-xala-primary/80 via-xala-secondary/80 to-xala-primary/80 border-b border-xala-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <Brain 
                size={48} 
                className="text-xala-accent rotate-3 transition-all duration-300 group-hover:rotate-6" 
                strokeWidth={1.5} 
              />
              <Brain 
                size={48} 
                className="absolute top-0 left-0 text-[#D946EF] rotate-[-3deg] opacity-50 transition-all duration-300 group-hover:rotate-[-6deg]" 
                strokeWidth={1.5} 
              />
              <Brain 
                size={48} 
                className="absolute top-0 left-0 text-white/10 rotate-[6deg] transition-all duration-300 group-hover:rotate-[9deg]" 
                strokeWidth={1.5} 
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_200%] group-hover:animate-gradient-x">
              Xala Technologies
            </span>
          </a>
          
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

            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xala-text hover:text-xala-accent transition-colors duration-300 hover:scale-110 transform"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            {/* Hamburger Menu Button */}
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
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
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
                {section.name}
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-xala-accent transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>
          
          {/* Mobile Social Icons */}
          <div className="flex items-center space-x-6 mt-8 md:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xala-text hover:text-xala-accent transition-colors duration-300 hover:scale-125 transform p-2"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;