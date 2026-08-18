import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();


  const companyLinks = [
    { name: t('footer.links.about'), href: '/om-oss' },
    { name: t('footer.links.careers'), href: '/karriere' },
    { name: t('footer.links.faq', 'Ofte stilte spørsmål'), href: '/faq' },
    { name: t('footer.links.contact'), href: '/kontakt' },
  ];

  const serviceLinks = [
    { name: t('nav.services'), href: '/tjenester' },
    { name: t('nav.products'), href: '/produkter' },
    { name: t('nav.cases'), href: '/caser' },
    { name: t('nav.prices', 'Priser'), href: '/priser' },
    { name: t('nav.technology'), href: '/teknologi' },
  ];

  const legalLinks = [
    { name: t('footer.links.privacy') || 'Privacy', href: '/privacy' },
    { name: t('footer.links.terms') || 'Terms', href: '/terms' },
    { name: t('footer.links.cookies', 'Informasjonskapsler'), href: '/cookies' },
  ];

  // Every product points at its own page on this site. Two of the four
  // external domains (xaheen.com, digiskjema.no) do not resolve at all, so
  // linking outward sent people to a connection error from every page — and
  // for the two that do resolve it handed the authority to another domain.
  const products = [
    { name: 'Digilist', href: '/produkter/digilist', soon: false },
    { name: 'Digiskjema', href: '/produkter/digiskjema', soon: true },
    { name: 'Xaheen', href: '/produkter/xaheen', soon: true },
    { name: 'Norchain', href: '/produkter/norchain', soon: true },
  ];

  // Localized section headers
  const sectionHeaders = {
    company: t('footer.company'),
    solutions: t('footer.solutions'),
    products: t('footer.productsHeader'),
  };

  // Localized description
  const description = t('footer.description');

  // Localized location
  const location = t('footer.location');

  return (
    <footer className="relative overflow-hidden bg-stone-900 dark:bg-stone-950 text-white">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center min-h-11 mb-6">
              {/* The footer bar is dark in both themes, so it always takes the
                  light-on-dark mark — the same file the navbar uses in dark
                  mode. The previous src (/xala-logo-white.svg) has never
                  existed: an onError handler hid the broken image, so the only
                  symptom was a 404 on every page load and a footer showing the
                  company name twice once you removed the handler. */}
              <img src="/logo-xala-dark.svg" alt="Xala Technologies" className="h-10 w-auto" />
            </Link>
            <p className="text-base md:text-lg text-stone-300 mb-6 max-w-sm leading-relaxed">
              {description}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:info@xala.no" className="flex items-center gap-3 min-h-11 text-base text-stone-300 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@xala.no</span>
              </a>
              <a href="tel:+4796665001" className="flex items-center gap-3 min-h-11 text-base text-stone-300 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span dir="ltr">+47 966 65 001</span>
              </a>
              <div className="flex items-center gap-3 text-base text-stone-300">
                <MapPin className="w-5 h-5" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider mb-4">{sectionHeaders.company}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center min-h-11 text-base text-stone-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider mb-4">{sectionHeaders.solutions}</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center min-h-11 text-base text-stone-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider mb-4">{sectionHeaders.products}</h3>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-base text-stone-300 hover:text-primary transition-colors duration-200 min-h-11 inline-flex items-center gap-2"
                  >
                    {link.name}
                    {link.soon && (
                      <span className="rounded-full border border-stone-600 px-2 py-0.5 text-xs uppercase tracking-wider text-stone-400">
                        {t('products.comingSoon', 'Kommer')}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-800 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-stone-400 text-sm">
            {/* currentYear is computed at the top of this component; the year
                was hardcoded here and would have gone stale on 1 January. */}
            <span>© {currentYear} Xala Technologies AS</span>
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex items-center min-h-11 hover:text-primary transition-colors"
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
              aria-label="Xala Technologies på LinkedIn"
              className="w-11 h-11 rounded-full bg-stone-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/xalatechnologies"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xala Technologies på GitHub"
              className="w-11 h-11 rounded-full bg-stone-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/NorChaiin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xala Technologies på X"
              className="w-11 h-11 rounded-full bg-stone-800 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
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