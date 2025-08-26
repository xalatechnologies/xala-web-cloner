import { Copyright } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type SupportedLanguage = Database['public']['Enums']['supported_language'];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();

  const { data: menuItems } = useQuery({
    queryKey: ['footer-menu', i18n.language],
    queryFn: async () => {
      const currentLang = i18n.language.toLowerCase() as SupportedLanguage;
      
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('language', currentLang)
        .eq('location', 'footer')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // Fallback navigation links if database is not available
  const fallbackLinks = [
    { name: 'Tjenester', href: '/tjenester' },
    { name: 'Produkter', href: '/produkter' },
    { name: 'Caser', href: '/caser' },
    { name: 'Slik vi jobber', href: '/slik-vi-jobber' },
    { name: 'Teknologi', href: '/teknologi' },
    { name: 'Om oss', href: '/om-oss' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Personvern', href: '/privacy' },
    { name: 'Vilkår', href: '/terms' }
  ];

  return (
    <footer className="w-full py-4 px-4 md:px-8 relative overflow-hidden bg-background text-foreground border-t border-border dark:bg-xala-primary dark:border-white/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          
          {/* Left side - Company info */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Copyright className="w-4 h-4" />
              <span>{currentYear} Xala Technologies. {t('footer.rights')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Innovativ teknologi for fremtidens bedrifter
            </p>
          </div>

          {/* Right side - Navigation links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {(menuItems && menuItems.length > 0 ? menuItems : fallbackLinks).map((item) => (
              <Link 
                key={item.href}
                to={item.href} 
                className="hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;