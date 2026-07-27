import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { PageCTA } from '../components/layouts/PageFrame';
import servicePages from '@/data/service-pages.json';
import { caserEntries } from '@/data/caser-page-entries';
import { localizedCardExcerpt } from '@/data/case-studies/localized';
import { allPosts } from '@/lib/blog';
import { findPost } from '@/lib/blog/posts';
import { BLOG_PATH, ORG_ID, SITE_ORIGIN } from '@/lib/blog/seo';

type Language = 'no' | 'en' | 'ar';

interface Capability {
  title: string;
  body: string;
}
interface FaqItem {
  question: string;
  answer: string;
}
interface LocalisedPage {
  features?: string[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  problemHeading: string;
  problem: string;
  capabilityHeading: string;
  capabilities: Capability[];
  faq: FaqItem[];
}
interface ServicePage {
  slug: string;
  icon: string;
  kind?: 'category' | 'platform';
  parent?: string;
  children?: string[];
  caseSlugs: string[];
  postSlugs: string[];
  no: LocalisedPage;
  en: LocalisedPage;
  ar: LocalisedPage;
}

/**
 * A page per head term.
 *
 * The services page lists six things a visitor could want, which is the right
 * shape for someone browsing and the wrong shape for someone searching. A card
 * in a grid cannot outrank a competitor's dedicated page however much better
 * its content is, because it is a third of a page about six subjects rather
 * than a page about one.
 *
 * Each of these answers one query properly: what the thing is, where it usually
 * goes wrong, what we build into it, and the questions people actually ask. The
 * FAQ is rendered and marked up from the same array, so the FAQPage schema
 * cannot describe a question the page does not show.
 *
 * Proof is linked rather than restated: the case studies and the blog posts on
 * the subject already exist, and linking them is also what tells a crawler
 * these pages are the hub of a topic rather than isolated leaves.
 */
export default function TjenesteDetaljPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const page = (servicePages as Record<string, ServicePage>)[slug];
  const posts = useMemo(() => allPosts(), []);

  if (!page) return <NotFound />;

  const copy = page[language] ?? page.no;
  const url = `${SITE_ORIGIN}/tjenester/${page.slug}`;
  const Icon = (Icons[page.icon as keyof typeof Icons] as LucideIcon) || Icons.CircleDot;

  const pageMap = servicePages as Record<string, ServicePage>;
  const localised = (candidate: ServicePage) => candidate[language] ?? candidate.no;

  const children = (page.children ?? [])
    .map((childSlug) => pageMap[childSlug])
    .filter((child): child is ServicePage => Boolean(child));
  const parent = page.parent ? pageMap[page.parent] : undefined;

  const cases = page.caseSlugs
    .map((caseSlug) => caserEntries.find((entry) => entry.slug === caseSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const related = page.postSlugs
    .map((postSlug) => findPost(posts, postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: copy.title,
      description: copy.metaDescription,
      url,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'Norge' },
      serviceType: copy.title,
    },
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
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{copy.metaTitle}</title>
        <meta name="description" content={copy.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={copy.metaTitle} />
        <meta property="og:description" content={copy.metaDescription} />
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
            to={parent ? `/tjenester/${parent.slug}` : '/tjenester'}
            className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="underline-offset-4 group-hover:underline">
              {parent ? localised(parent).title : t('servicePage.back', 'Alle tjenester')}
            </span>
          </Link>
        </div>

        <header className="container mx-auto px-4 pb-4 pt-6">
          <div className="flex items-center gap-3">
            <span className="card-icon">
              <Icon aria-hidden="true" />
            </span>
            <h1 className="page-heading">
              {copy.title}
            </h1>
          </div>
          <p className="mt-6 max-w-[62ch] section-lead">
            {copy.intro}
          </p>
        </header>

        <section
          aria-labelledby="problem-heading"
          className="border-y border-border bg-muted/30 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <h2
              id="problem-heading"
              className="max-w-[24ch] subsection-heading"
            >
              {copy.problemHeading}
            </h2>
            <p className="mt-5 max-w-[62ch] section-lead">
              {copy.problem}
            </p>
          </div>
        </section>

        <section aria-labelledby="capability-heading" className="container mx-auto px-4 py-14 md:py-20">
          <h2
            id="capability-heading"
            className="subsection-heading"
          >
            {copy.capabilityHeading}
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {copy.capabilities.map((capability) => (
              <li
                key={capability.title}
                className="rounded-2xl border border-border bg-card p-6 md:p-7"
              >
                <h3 className="card-heading">
                  {capability.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{capability.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {copy.features && copy.features.length > 0 && (
          <section
            aria-labelledby="features-heading"
            className="border-t border-border bg-muted/30 py-14 md:py-20"
          >
            <div className="container mx-auto px-4">
              <h2
                id="features-heading"
                className="subsection-heading"
              >
                {t('servicePage.featuresTitle', 'Funksjonalitet')}
              </h2>
              {/*
                A concrete list, not adjectives. This is the part a buyer
                compares against a competitor's page and the part an answer
                engine can lift verbatim when asked what the thing does.
              */}
              <ul className="mt-10 grid gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                {copy.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {children.length > 0 && (
          <section aria-labelledby="children-heading" className="container mx-auto px-4 py-14 md:py-20">
            <h2
              id="children-heading"
              className="subsection-heading"
            >
              {t('servicePage.childrenTitle', 'Løsninger vi bygger på denne plattformen')}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {children.map((child) => {
                const childCopy = localised(child);
                return (
                  <li key={child.slug}>
                    <Link
                      to={`/tjenester/${child.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                    >
                      <span className="flex items-center gap-2 card-heading">
                        {childCopy.title}
                        <ArrowRight
                          className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                        {childCopy.intro}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {cases.length > 0 && (
          <section
            aria-labelledby="cases-heading"
            className="border-y border-border bg-muted/30 py-14 md:py-20"
          >
            <div className="container mx-auto px-4">
              <h2
                id="cases-heading"
                className="subsection-heading"
              >
                {t('servicePage.casesTitle', 'Vi har gjort dette før')}
              </h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {cases.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      to={`/caser/${entry.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                    >
                      <h3 className="card-heading">{entry.title}</h3>
                      <p className="mt-4 flex-1 card-body">
                        {localizedCardExcerpt(entry.slug, i18n.language) ?? entry.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {t('caseStudy.readMore', 'Les case')}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

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

          {related.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow">
                {t('servicePage.readMore', 'Les mer om dette')}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {related.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`${BLOG_PATH}/${post.slug}`}
                      className="group inline-flex items-baseline gap-2 text-foreground hover:text-primary"
                    >
                      <ArrowRight
                        className="h-4 w-4 shrink-0 translate-y-0.5 text-primary transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                      <span className="underline-offset-4 group-hover:underline">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <PageCTA
          id="tjeneste-cta"
          title={t('servicePage.ctaTitle', 'Står dere i dette nå?')}
          description={t(
            'servicePage.ctaDescription',
            'Fortell oss hva dere har i dag, så sier vi hva vi ville gjort først og hva vi ville ventet med.'
          )}
          primary={{ to: '/kontakt', label: t('servicePage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/slik-vi-jobber', label: t('servicePage.ctaProcess', 'Slik vi jobber') }}
        />
      </main>

      <Footer />
    </div>
  );
}
