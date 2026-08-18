import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';
import productsData from '@/data/products.json';
import { catalogProducts } from '@/lib/products';

type Language = 'no' | 'en' | 'ar';

/**
 * The products, on the front page.
 *
 * Reads products.json, the same file /produkter renders and the same file each
 * product page is generated from. It used to hold its own hardcoded copy of the
 * list, with its own icons, its own status labels and its own external URLs —
 * including https://digiskjema.no and https://xaheen.com, neither of which
 * resolves. So the homepage sent people to a connection error while the
 * products page, fixed separately, sent them to a working page. Two lists
 * describing the same four things will always drift; there is one now.
 */
export default function ProductsTeaser() {
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const products = catalogProducts(productsData[language] ?? productsData.no);
  const iconFor = (name?: string | null): LucideIcon =>
    resolveIcon(name, 'Package');

  return (
    <section
      id="products-teaser"
      aria-labelledby="products-teaser-heading"
      className="border-y border-border bg-muted/30 py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="section-header">
          <p className="mb-5 eyebrow">
            {t('teasers.products.eyebrow', 'Produkter')}
          </p>
          <h2
            id="products-teaser-heading"
            className="section-heading"
          >
            {t('teasers.products.title')}
          </h2>
          <p className="section-lead mt-5 max-w-[52ch]">
            {t('teasers.products.description')}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((product) => {
            const Icon = iconFor(product.icon);
            const comingSoon = product.status === 'coming-soon';
            return (
              <li key={product.id}>
                <Link
                  to={`/produkter/${product.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="card-icon group-hover:bg-primary/20">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="card-heading">
                      {product.title}
                    </h3>
                    {comingSoon && (
                      <span className="ms-auto shrink-0 rounded-full border border-border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {t('products.comingSoon', 'Kommer')}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 flex-1 card-body md:text-base">
                    {product.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary">
                    {t('products.readMore', 'Les mer')}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <Link
            to="/produkter"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('teasers.products.viewAll')}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
