import { Copyright } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden bg-xala-primary border-t border-white/5">
      <div className="container mx-auto px-4 py-6">
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
    </footer>
  );
};

export default Footer;