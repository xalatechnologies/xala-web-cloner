import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

type SupportedLanguage = Database['public']['Enums']['supported_language'];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

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

  const companyLinks = [
    { name: isEnglish ? 'About Us' : 'Om oss', href: '/om-oss' },
    { name: isEnglish ? 'Team' : 'Teamet', href: '/team' },
    { name: isEnglish ? 'Careers' : 'Karriere', href: '/karriere' },
    { name: isEnglish ? 'Contact' : 'Kontakt', href: '/kontakt' },
  ];

  const serviceLinks = [
    { name: isEnglish ? 'Services' : 'Tjenester', href: '/tjenester' },
    { name: isEnglish ? 'Products' : 'Produkter', href: '/produkter' },
    { name: isEnglish ? 'Cases' : 'Caser', href: '/caser' },
    { name: isEnglish ? 'Technology' : 'Teknologi', href: '/teknologi' },
  ];

  const legalLinks = [
    { name: isEnglish ? 'Privacy' : 'Personvern', href: '/privacy' },
    { name: isEnglish ? 'Terms' : 'Vilkår', href: '/terms' },
    { name: isEnglish ? 'Cookies' : 'Cookies', href: '/cookies' },
  ];

  const products = [
    { name: 'Digilist', href: 'https://digilist.no', external: true },
    { name: 'Digiskjema', href: 'https://digiskjema.no', external: true },
    { name: 'Xaheen', href: 'https://xaheen.com', external: true },
    { name: 'Norchain', href: 'https://norchain.org', external: true },
  ];

  // Localized section headers
  const sectionHeaders = {
    company: isEnglish ? 'Company' : 'Selskap',
    solutions: isEnglish ? 'Solutions' : 'Løsninger',
    products: isEnglish ? 'Products' : 'Produkter',
  };

  // Localized description
  const description = isEnglish
    ? 'We create innovative technology solutions that drive business growth and digital transformation.'
    : 'Vi skaper innovative teknologiløsninger som driver forretningsvekst og digital transformasjon.';

  // Localized location
  const location = isEnglish ? 'Oslo, Norway' : 'Oslo, Norge';

  return (
    <footer className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 text-white">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/xala-logo-white.svg"
                alt="Xala Technologies"
                className="h-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-2xl font-bold text-white">Xala Technologies</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              {description}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:info@xala.no" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@xala.no</span>
              </a>
              <a href="tel:+4796665001" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+47 966 65 001</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{sectionHeaders.company}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{sectionHeaders.solutions}</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{sectionHeaders.products}</h3>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {link.name}
                    <span className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-500 text-sm">
            <span>© {currentYear} Xala Technologies AS. {t('footer.rights')}</span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/2558426"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/xalatechnologies"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/xalatech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;