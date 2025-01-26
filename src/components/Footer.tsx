import { Copyright } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();

  // Force a re-render when language changes
  useEffect(() => {
    console.log('Footer component language:', i18n.language);
  }, [i18n.language]);

  return (
    <footer className="w-full relative overflow-hidden bg-xala-primary border-t border-white/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-xala-text/60">
            <Copyright className="w-4 h-4" />
            <span>{currentYear} Xala. {t('footer.rights')}</span>
          </div>
          <div className="flex space-x-6 text-sm text-xala-text/60">
            <Link to="/privacy" className="hover:text-xala-accent transition-colors duration-300">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-xala-accent transition-colors duration-300">
              {t('footer.terms')}
            </Link>
            <Link to="/cookies" className="hover:text-xala-accent transition-colors duration-300">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;