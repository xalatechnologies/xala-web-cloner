import { Github, Twitter, Linkedin, Globe, Copyright } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-xala-primary to-xala-secondary py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-xala-accent">Xala</h3>
            <p className="text-xala-text/80">
              Transforming ideas into digital reality with cutting-edge solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-xala-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xala-text/60 hover:text-xala-accent transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-xala-accent">Services</h3>
            <ul className="space-y-2">
              <li className="text-xala-text/60">Web Development</li>
              <li className="text-xala-text/60">Mobile Apps</li>
              <li className="text-xala-text/60">Cloud Solutions</li>
              <li className="text-xala-text/60">AI Integration</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-xala-accent">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-xala-accent" />
              <span className="text-xala-text/60">info@xala.com</span>
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