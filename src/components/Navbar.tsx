import { useState } from 'react';
import { Menu, X, Brain, Github, Linkedin, Twitter } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Technologies", href: "#technologies" },
    { name: "Work Process", href: "#work-process" },
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

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-gradient-to-r from-xala-primary/80 via-xala-secondary/80 to-xala-primary/80 border-b border-xala-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
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
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex space-x-8">
              {sections.map((section) => (
                <a
                  key={section.name}
                  href={section.href}
                  className="text-xala-text hover:text-xala-accent px-3 py-2 text-sm font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-xala-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {section.name}
                </a>
              ))}
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pl-8 border-l border-xala-accent/20">
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
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-xala-text hover:text-xala-accent focus:outline-none transition-colors"
              aria-expanded="false"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-xala-primary/95 backdrop-blur-md border-b border-xala-accent/20 animate-fade-in">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {sections.map((section) => (
              <a
                key={section.name}
                href={section.href}
                onClick={() => setIsOpen(false)}
                className="text-xala-text hover:text-xala-accent block px-3 py-2 text-base font-medium transition-colors"
              >
                {section.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 px-3 py-4 border-t border-xala-accent/20 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xala-text hover:text-xala-accent transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;