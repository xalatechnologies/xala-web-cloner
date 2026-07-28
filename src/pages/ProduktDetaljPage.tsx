import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { PageCTA } from '../components/layouts/PageFrame';
import productsData from '@/data/products.json';
import detailsData from '@/data/product-details.json';
import { ORG_ID, SITE_ORIGIN } from '@/lib/blog/seo';

type Language = 'no' | 'en' | 'ar';

/**
 * One page per product.
 *
 * The products only existed as four-line cards on /produkter, two of which
 * linked to domains that do not resolve. A product with no page of its own has
 * nowhere to rank, nothing to link to and nothing for an answer engine to
 * quote — so the two unlaunched ones were, as far as search is concerned,
 * invisible, and the launched one sent its authority to a separate domain.
 *
 * Each page carries SoftwareApplication schema tied to the same Organization
 * @id the rest of the site uses, so the products resolve as things this company
 * makes rather than as unrelated names.
 */
export default function ProduktDetaljPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const product = (productsData[language] ?? productsData.no).find((item) => item.slug === slug);
  const details = (detailsData as Record<string, Record<string, unknown>>)[product?.id ?? ''];

  if (!product || !details) return <NotFound />;

  const copy = (details[language] ?? details.no) as {
    tagline: string;
    intro: string;
    sections: { heading: string; body: string }[];
  };

  const Icon = resolveIcon(product.icon, 'Package');
  const url = `${SITE_ORIGIN}/produkter/${slug}`;
  const isLive = product.status !== 'coming-soon' && Boolean(product.url);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}#product`,
    name: product.title,
    description: product.description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    publisher: { '@id': ORG_ID },
    ...(product.url ? { sameAs: product.url } : {}),
    ...(product.features?.length ? { featureList: product.features } : {}),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{`${product.title} | Xala Technologies`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={`${product.title} | Xala Technologies`} />
        <meta property="og:description" content={product.description} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <div className="container mx-auto px-4 pt-10">
          <Link
            to="/produkter"
            className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="underline-offset-4 group-hover:underline">
              {t('productPage.back', 'Alle produkter')}
            </span>
          </Link>
        </div>

        <header className="container mx-auto px-4 pb-4 pt-6 md:pb-6">
          <div className="flex items-center gap-3">
            <span className="card-icon">
              <Icon aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              {product.title}
            </h1>
            {!isLive && (
              <span className="rounded-full border border-border px-3 py-1 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('products.comingSoon', 'Kommer')}
              </span>
            )}
          </div>
          <p className="mt-6 max-w-2xl section-lead">
            {copy.tagline}
          </p>
        </header>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="max-w-[62ch] text-lg leading-relaxed text-foreground">{copy.intro}</p>

              {copy.sections.map((block) => (
                <div key={block.heading} className="mt-10">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {block.heading}
                  </h2>
                  <p className="mt-3 max-w-[62ch] leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                </div>
              ))}

              {isLive && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('productPage.visit', 'Besøk nettstedet')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{t('common.newTab', '(åpnes i ny fane)')}</span>
                </a>
              )}
            </div>

            {product.features?.length ? (
              <aside className="lg:col-span-5">
                <h2 className="subsection-heading">
                  {t('productPage.features', 'Dette inngår')}
                </h2>
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 py-3.5">
                      <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </section>

        <PageCTA
          id="produkt-cta"
          title={t('productPage.ctaTitle', 'Vil dere se det i praksis?')}
          description={t(
            'productPage.ctaDescription',
            'Ta kontakt, så viser vi hvordan produktet løser oppgaven dere står i.'
          )}
          primary={{ to: '/kontakt', label: t('productPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/produkter', label: t('productPage.back', 'Alle produkter') }}
        />
      </main>

      <Footer />
    </div>
  );
}
