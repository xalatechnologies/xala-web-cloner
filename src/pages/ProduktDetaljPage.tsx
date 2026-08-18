import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { PageCTA } from '../components/layouts/PageFrame';
import ProductRelated from '../components/products/ProductRelated';
import productsData from '@/data/products.json';
import detailsData from '@/data/product-details.json';
import servicePages from '@/data/service-pages.json';
import { productCopy, type Language, type ProductDetails } from '@/lib/product-details';
import { ORG_ID, SITE_ORIGIN } from '@/lib/blog/seo';

/**
 * One page per product.
 *
 * Listed products carry the same depth as a tjeneste page: what it is, what it
 * does, what it does not, features, FAQ, and links to the matching service,
 * case and blog where those already exist. Unlisted products keep a shorter
 * page so the URL still resolves.
 */
export default function ProduktDetaljPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const product = (productsData[language] ?? productsData.no).find((item) => item.slug === slug);
  const details = (detailsData as Record<string, ProductDetails>)[product?.id ?? ''];

  if (!product || !details) return <NotFound />;

  const copy = productCopy(details, language);
  const Icon = resolveIcon(product.icon, 'Package');
  const url = `${SITE_ORIGIN}/produkter/${slug}`;
  const isLive = product.status !== 'coming-soon' && Boolean(product.url);
  const features = copy.features?.length ? copy.features : product.features;
  const servicePage = details.serviceSlug
    ? (servicePages as Record<string, { slug: string; no: { title: string }; en: { title: string }; ar: { title: string } }>)[
        details.serviceSlug
      ]
    : undefined;
  const serviceTitle = servicePage ? (servicePage[language] ?? servicePage.no).title : undefined;

  const schema = [
    {
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
      ...(features?.length ? { featureList: features } : {}),
    },
    ...(copy.faq?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: copy.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          },
        ]
      : []),
  ];

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
        {schema.map((block) => (
          <script key={String(block['@id'])} type="application/ld+json">
            {JSON.stringify(block)}
          </script>
        ))}
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
          <div className="flex items-start gap-3">
            <span className="card-icon mt-1.5 shrink-0">
              <Icon aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              {product.title}
              <span className="mt-3 block max-w-[20ch] text-xl font-semibold leading-snug text-muted-foreground md:text-2xl">
                {copy.tagline}
              </span>
            </h1>
            {!isLive && product.status === 'coming-soon' && (
              <span className="mt-2 shrink-0 rounded-full border border-border px-3 py-1 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('products.comingSoon', 'Kommer')}
              </span>
            )}
          </div>
          <p className="mt-6 max-w-[62ch] section-lead">{copy.intro}</p>
        </header>

        {(copy.what || copy.does || copy.doesNot) && (
          <section className="border-y border-border bg-muted/30 py-14 md:py-20">
            <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-3">
              {copy.what && (
                <div>
                  <h2 className="subsection-heading">{copy.whatHeading}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{copy.what}</p>
                </div>
              )}
              {copy.does && (
                <div>
                  <h2 className="subsection-heading">{copy.doesHeading}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{copy.does}</p>
                </div>
              )}
              {copy.doesNot && (
                <div>
                  <h2 className="subsection-heading">{copy.doesNotHeading}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{copy.doesNot}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {copy.sections?.map((block) => (
          <section key={block.heading} className="container mx-auto px-4 py-10">
            <h2 className="subsection-heading">{block.heading}</h2>
            <p className="mt-3 max-w-[62ch] leading-relaxed text-muted-foreground">{block.body}</p>
          </section>
        ))}

        {copy.capabilities?.length ? (
          <section aria-labelledby="capability-heading" className="container mx-auto px-4 py-14 md:py-20">
            <h2 id="capability-heading" className="subsection-heading">
              {copy.capabilityHeading}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {copy.capabilities.map((capability) => (
                <li key={capability.title} className="rounded-2xl border border-border bg-card p-6 md:p-7">
                  <h3 className="card-heading">{capability.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{capability.body}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {features?.length ? (
          <section
            aria-labelledby="features-heading"
            className="border-t border-border bg-muted/30 py-14 md:py-20"
          >
            <div className="container mx-auto px-4">
              <h2 id="features-heading" className="subsection-heading">
                {t('productPage.features', 'Dette inngår')}
              </h2>
              <ul className="mt-10 grid gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {isLive && (
          <div className="container mx-auto px-4 pt-10">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t('productPage.visit', 'Besøk nettstedet')}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t('common.newTab', '(åpnes i ny fane)')}</span>
            </a>
          </div>
        )}

        <ProductRelated
          serviceSlug={details.serviceSlug}
          serviceTitle={serviceTitle}
          caseSlugs={details.caseSlugs}
          postSlugs={details.postSlugs}
        />

        {copy.faq?.length ? (
          <section aria-labelledby="faq-heading" className="container mx-auto px-4 py-14 md:py-20">
            <h2 id="faq-heading" className="subsection-heading">
              {t('servicePage.faqTitle', 'Ofte stilte spørsmål')}
            </h2>
            <dl className="mt-10 max-w-[70ch] divide-y divide-border border-y border-border">
              {copy.faq.map((item) => (
                <div key={item.question} className="py-6">
                  <dt className="card-heading">{item.question}</dt>
                  <dd className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <PageCTA
          id="produkt-cta"
          title={t('productPage.ctaTitle', 'Vil dere se det i praksis?')}
          description={t(
            'productPage.ctaDescription',
            'Ta kontakt, så viser vi hvordan produktet løser oppgaven dere står i.'
          )}
          primary={{ to: '/kontakt', label: t('productPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/produkter', label: t('productPage.back', 'Alle produkter') }}
        >
          <p className="mt-4 max-w-2xl text-foreground">
            {t('productPage.closingBefore', 'Det tar vi når dere tar ')}
            <Link to="/kontakt" className="font-semibold text-primary underline-offset-4 hover:underline">
              {t('productPage.closingLink', 'kontakt')}
            </Link>
            {t('productPage.closingAfter', '.')}
          </p>
        </PageCTA>
      </main>

      <Footer />
    </div>
  );
}
