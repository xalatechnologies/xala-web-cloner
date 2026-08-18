import { useState, useEffect, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ArrowRight, Search } from 'lucide-react';
import { useMenuItems } from '@/hooks/use-menu-items';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

/** Two-digit index, so the drawer reads like a parts list rather than a list. */
const ordinal = (index: number) => String(index + 1).padStart(2, '0');

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const SEARCH_LABEL = 'Søk i artikler';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: menuItems } = useMenuItems();

  const navItems = (menuItems || []).filter(
    (item) => item.href !== '/' && item.href !== '/kontakt'
  );
  const contactItem = (menuItems || []).find((item) => item.href === '/kontakt');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // Reading position, shown as a hairline under the bar. Cheap to compute
      // and it makes long case-study pages legible at a glance.
      const span = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(span > 0 ? Math.min(1, y / span) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Vector rather than the 6x PNGs: crisp at any size, a fraction of the
  // bytes, and the mark is a single fill so it can carry the palette. One
  // bronze per scheme, each contrast-checked against its own background.
  const logoSrc = theme === 'dark' ? '/logo-xala-dark.svg' : '/logo-xala-light.svg';

  // The site had no search box anywhere outside /blogg and /caser, so a reader
  // landing on the front page had no way to look anything up. The articles are
  // the only body of text worth searching, so the bar hands off to the blog
  // index, which already filters on ?q= and renders the result as a shareable
  // URL rather than transient state.
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const needle = query.trim();
    setIsOpen(false);
    navigate(needle ? `/blogg?q=${encodeURIComponent(needle)}` : '/blogg');
  };

  const searchForm = (id: string, className: string) => (
    <form role="search" action="/blogg" method="get" onSubmit={submitSearch} className={className}>
      <label htmlFor={id} className="sr-only">
        {SEARCH_LABEL}
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id={id}
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={SEARCH_LABEL}
        className={`min-h-11 w-full rounded-lg border border-border/70 bg-background/60 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground ${FOCUS}`}
      />
    </form>
  );

  const isActive = (href: string) => location.pathname === href;
  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'py-6 bg-transparent'
        }`}
      >
        {/* Instrument hairline: the accent at the very top edge, always there,
            never loud. Anchors the bar to the top of the viewport. */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className={`flex-shrink-0 group rounded-md ${FOCUS}`} aria-label="Xala Technologies">
              <img
                src={logoSrc}
                alt="Xala Technologies"
                className={`w-auto transition-all duration-500 group-hover:brightness-110 ${
                  scrolled ? 'h-11' : 'h-14'
                }`}
              />
            </Link>

            {/* Centre: nav links */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`group relative px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] rounded-md transition-colors duration-200 ${FOCUS} ${
                      isActive(item.href)
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {/* Underline draws in from the left on hover; the active
                        item keeps it. Replaces a border-colour swap that read
                        the same as every other hover on the page. */}
                    <span
                      aria-hidden
                      className={`absolute bottom-1 left-4 right-4 h-[2px] origin-left bg-primary transition-transform duration-300 ease-out ${
                        isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: search + controls + CTA */}
            <div className="flex items-center gap-2">
              {searchForm('nav-sok', 'relative hidden md:block w-44 lg:w-52')}

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className={`inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ${FOCUS}`}
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {contactItem && (
                <Link
                  to={contactItem.href}
                  className={`group hidden lg:inline-flex items-center gap-2 ml-1 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] rounded-lg bg-primary text-primary-foreground transition-all duration-200 hover:shadow-[0_0_28px_hsl(var(--primary)/0.35)] ${FOCUS}`}
                >
                  {contactItem.name}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                className={`lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-foreground hover:bg-accent transition-colors ${FOCUS}`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress. Only once scrolled, so it never sits at zero width
            drawing attention to itself on load. */}
        {scrolled && (
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] bg-primary/70 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        )}
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-6">
              <img src={logoSrc} alt="Xala Technologies" className="h-11 w-auto" />
            </div>

            <div className="flex-1 flex flex-col justify-center px-8">
              <p className="mb-8 eyebrow">
                Xala Technologies
              </p>

              {searchForm('nav-sok-drawer', 'relative mb-8 w-full md:hidden')}

              {[{ id: 'home', href: '/', name: t('nav.home', 'Hjem') }, ...navItems].map((item, index) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`group flex items-baseline gap-4 py-3 border-b border-border/40 transition-colors ${FOCUS} ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {/* aria-hidden: decorative numbering, and without it the
                      accessible name of the link becomes "01 Hjem". */}
                  <span
                    aria-hidden
                    className="text-xs font-bold tabular-nums text-muted-foreground/70"
                  >
                    {ordinal(index)}
                  </span>
                  <span className="text-2xl font-semibold tracking-tight">{item.name}</span>
                  <ArrowRight className="ml-auto w-4 h-4 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>

            <div className="px-8 pb-10 space-y-4">
              {contactItem && (
                <Link
                  to={contactItem.href}
                  className={`flex items-center justify-center gap-2 w-full py-4 text-sm font-semibold uppercase tracking-[0.1em] rounded-xl bg-primary text-primary-foreground ${FOCUS}`}
                >
                  {contactItem.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
