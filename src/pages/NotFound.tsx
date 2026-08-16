import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const SUGGESTED_LINKS = [
  { to: '/', key: 'nav.home', fallback: 'Hjem' },
  { to: '/caser', key: 'nav.cases', fallback: 'Caser' },
  { to: '/blogg', key: 'teasers.blog.eyebrow', fallback: 'Fagartikler' },
  { to: '/kontakt', key: 'nav.contact', fallback: 'Kontakt' },
] as const;

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main id="main" className="flex flex-1 items-center justify-center px-4 pb-16 pt-32">
        <div className="space-y-8 text-center">
          <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-9xl font-bold text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-foreground">
            {t('error.pageNotFound')}
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            {t('error.pageNotFoundDescription')}
          </p>
          <nav
            aria-label={t('error.pageNotFound')}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {SUGGESTED_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex min-h-12 items-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t(link.key, link.fallback)}
              </Link>
            ))}
          </nav>
          <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('common.goBack')}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
