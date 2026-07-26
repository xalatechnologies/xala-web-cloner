import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ArrowRight } from 'lucide-react';
import { useMenuItems } from '@/hooks/use-menu-items';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { i18n, t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { data: menuItems } = useMenuItems();

  const navItems = (menuItems || []).filter(
    (item) => item.href !== '/' && item.href !== '/kontakt'
  );
  const contactItem = (menuItems || []).find((item) => item.href === '/kontakt');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const lang = i18n.language || 'no';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [i18n.language]);

  const logoSrc = theme === 'dark'
    ? '/LOGO/PNG/Asset 3@6x.png'
    : '/LOGO/PNG/Asset 4@6x.png';

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 bg-background/70 backdrop-blur-2xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 relative group">
              <img
                src={logoSrc}
                alt="Xala Technologies"
                className={`w-auto transition-all duration-500 ${scrolled ? 'h-7' : 'h-9'}`}
              />
            </Link>

            {/* Center: Nav links — full-width spread */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-all duration-200 rounded-md group ${
                      isActive(item.href)
                        ? 'text-foreground'
                        : 'text-muted-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {/* Active indicator — subtle bottom dot */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
                        isActive(item.href)
                          ? 'w-1 h-1 opacity-100'
                          : 'w-0 h-0 opacity-0 group-hover:w-1 group-hover:h-1 group-hover:opacity-40'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              {/* Language toggle */}
              <button
                onClick={() => {
                  const next = i18n.language === 'en' ? 'no' : 'en';
                  i18n.changeLanguage(next);
                  localStorage.setItem('i18nextLng', next);
                }}
                className="px-2 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle language"
              >
                {i18n.language === 'en' ? 'NO' : 'EN'}
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-4 bg-border/60" />

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-4 bg-border/60" />

              {/* CTA — desktop */}
              {contactItem && (
                <Link
                  to={contactItem.href}
                  className="hidden lg:inline-flex items-center gap-1.5 ml-1 px-5 py-2 text-[13px] font-semibold rounded-lg bg-foreground text-background hover:opacity-90 transition-all duration-200"
                >
                  {contactItem.name}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}

              {/* Hamburger — mobile */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-4">
              <img src={logoSrc} alt="Xala Technologies" className="h-7 w-auto" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile links — centered, large */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-2">
              <Link
                to="/"
                className={`py-3 text-2xl font-semibold tracking-tight transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {t('nav.home', 'Hjem')}
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`py-3 text-2xl font-semibold tracking-tight transition-colors ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile CTA at bottom */}
            {contactItem && (
              <div className="px-8 pb-10">
                <Link
                  to={contactItem.href}
                  className="flex items-center justify-center gap-2 w-full py-4 text-base font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all"
                >
                  {contactItem.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;