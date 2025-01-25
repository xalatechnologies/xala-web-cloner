import { Github, Twitter, Linkedin, Globe, Copyright } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden">
      {/* Background with gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-xala-primary via-xala-secondary to-black opacity-90" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-xala-accent/10 rounded-full blur-3xl animate-float-1" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-xala-accent/10 rounded-full blur-3xl animate-float-2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-xala-accent to-blue-400 bg-clip-text text-transparent">
              Xala
            </h3>
            <p className="text-xala-text/80 leading-relaxed">
              Transforming ideas into digital reality with cutting-edge solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 bg-xala-secondary/50 rounded-lg hover:bg-xala-accent/20 transition-all duration-300 group">
                <Github className="w-5 h-5 text-xala-text/60 group-hover:text-xala-accent" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-xala-secondary/50 rounded-lg hover:bg-xala-accent/20 transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-xala-text/60 group-hover:text-xala-accent" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-xala-secondary/50 rounded-lg hover:bg-xala-accent/20 transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-xala-text/60 group-hover:text-xala-accent" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-xala-accent">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-xala-text/60 hover:text-xala-accent transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full group-hover:w-2.5 transition-all duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xala-text/60 hover:text-xala-accent transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full group-hover:w-2.5 transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-xala-text/60 hover:text-xala-accent transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full group-hover:w-2.5 transition-all duration-300" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xala-text/60 hover:text-xala-accent transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full group-hover:w-2.5 transition-all duration-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-xala-accent">Services</h3>
            <ul className="space-y-3">
              <li className="text-xala-text/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full" />
                Web Development
              </li>
              <li className="text-xala-text/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full" />
                Mobile Apps
              </li>
              <li className="text-xala-text/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full" />
                Cloud Solutions
              </li>
              <li className="text-xala-text/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-xala-accent/50 rounded-full" />
                AI Integration
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-xala-accent">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 group">
                <Globe className="w-4 h-4 text-xala-accent group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-xala-text/60">info@xala.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-xala-text/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-xala-text/60">
              <Copyright className="w-4 h-4" />
              <span>{currentYear} Xala. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-sm text-xala-text/60">
              <Link to="/privacy" className="hover:text-xala-accent transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-xala-accent transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-xala-accent transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;