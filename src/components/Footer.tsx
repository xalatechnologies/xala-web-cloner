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
      console.log('Fetching footer menu items for language:', currentLang);
      
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

  return (
    <footer className="w-full py-4 px-4 md:px-8 relative overflow-hidden bg-xala-primary border-t border-white/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-xala-text/60">
            <Copyright className="w-4 h-4" />
            <span>{currentYear} Xala. {t('footer.rights')}</span>
          </div>
          <div className="flex space-x-6 text-sm text-xala-text/60">
            {menuItems?.map((item) => (
              <Link 
                key={item.id}
                to={item.href} 
                className="hover:text-xala-accent transition-colors duration-300"
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