import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { caserEntries } from '@/data/caser-page-entries';
import { localizedCardExcerpt } from '@/data/case-studies/localized';
import { findPost } from '@/lib/blog/posts';
import { allPosts } from '@/lib/blog';
import { BLOG_PATH } from '@/lib/blog/seo';

interface ProductRelatedProps {
  serviceSlug?: string;
  serviceTitle?: string;
  caseSlugs?: string[];
  postSlugs?: string[];
}

/**
 * Proof that already exists elsewhere on the site: the matching tjeneste page,
 * the Nordre Follo case, and the blog posts that already state the same facts.
 */
export default function ProductRelated({
  serviceSlug,
  serviceTitle,
  caseSlugs = [],
  postSlugs = [],
}: ProductRelatedProps) {
  const { t, i18n } = useTranslation();
  const posts = allPosts();

  const cases = caseSlugs
    .map((slug) => caserEntries.find((entry) => entry.slug === slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const related = postSlugs
    .map((slug) => findPost(posts, slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  if (!serviceSlug && cases.length === 0 && related.length === 0) return null;

  return (
    <>
      {serviceSlug && serviceTitle ? (
        <section aria-labelledby="related-service-heading" className="container mx-auto px-4 py-14 md:py-20">
          <h2 id="related-service-heading" className="subsection-heading">
            {t('productPage.relatedService', 'Slik vi bygger det')}
          </h2>
          <Link
            to={`/tjenester/${serviceSlug}`}
            className="group mt-8 flex max-w-[62ch] flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <span className="flex items-center gap-2 card-heading">
              {serviceTitle}
              <ArrowRight
                className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(
                'productPage.relatedServiceBody',
                'Tjenestesiden beskriver hvordan vi bygger portalen. Produktsiden er produktet.'
              )}
            </span>
          </Link>
        </section>
      ) : null}

      {cases.length > 0 && (
        <section
          aria-labelledby="product-cases-heading"
          className="border-y border-border bg-muted/30 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <h2 id="product-cases-heading" className="subsection-heading">
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

      {related.length > 0 && (
        <div className="container mx-auto px-4 pb-4">
          <p className="eyebrow">{t('servicePage.readMore', 'Les mer om dette')}</p>
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
    </>
  );
}
