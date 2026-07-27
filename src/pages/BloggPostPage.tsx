import { useMemo, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '../components/blog/PostCard';
import ArticleToc from '../components/blog/ArticleToc';
import ShareLinks from '../components/blog/ShareLinks';
import NotFound from './NotFound';
import { allPosts } from '@/lib/blog';
import { findPost, relatedPosts } from '@/lib/blog/posts';
import { extractFaq, extractHeadings, faqJsonLd } from '@/lib/blog/toc';
import { relatedServices } from '@/lib/blog/relatedServices';
import { BLOG_PATH, ORGANIZATION, articleJsonLd, formatDate, postMeta, postUrl } from '@/lib/blog/seo';
import { slugify } from '@/lib/slug';

/** Text of a ReactMarkdown child tree, for deriving a heading's anchor id. */
function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return nodeText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

export default function BloggPostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const posts = useMemo(() => allPosts(), []);
  const post = useMemo(() => findPost(posts, slug), [posts, slug]);
  const related = useMemo(() => (post ? relatedPosts(posts, post) : []), [posts, post]);
  const headings = useMemo(() => (post ? extractHeadings(post.body) : []), [post]);
  const faq = useMemo(() => (post ? extractFaq(post.body) : []), [post]);
  const services = useMemo(() => (post ? relatedServices(post) : []), [post]);

  // A slug that does not resolve must be a real 404 for crawlers, not a blog
  // page with empty content — a soft 404 gets the whole section devalued.
  if (!post) return <NotFound />;

  const meta = postMeta(post);
  const url = postUrl(post);
  const faqSchema = faqJsonLd(url, faq);

  // Anchor ids come from the same slugify() the TOC used, so every link in the
  // sidebar lands on a heading that exists.
  const anchored = (Tag: 'h2' | 'h3') =>
    function Heading({ children, ...props }: { children?: ReactNode }) {
      return (
        <Tag id={slugify(nodeText(children))} className="scroll-mt-28" {...props}>
          {children}
        </Tag>
      );
    };

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <html lang={post.lang === 'en' ? 'en' : 'no'} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        <meta name="author" content={post.author} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        {meta.image && <meta property="og:image" content={meta.image} />}
        <meta property="article:published_time" content={post.date} />
        {post.tag && <meta property="article:section" content={post.tag} />}
        <meta name="twitter:card" content={meta.image ? 'summary_large_image' : 'summary'} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd(post))}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-20">
        <article className="container mx-auto px-4 py-10 md:py-14">
          {/* Breadcrumb and section label share one line: the top of an article
              should get to the headline fast. */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <nav aria-label="Brødsmuler" className="min-w-0 text-sm text-muted-foreground">
              <Link
                to={BLOG_PATH}
                className="group inline-flex min-h-11 items-center gap-2 hover:text-foreground"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                <span className="underline-offset-4 group-hover:underline">Tilbake til blogg</span>
              </Link>
            </nav>
            {post.tag && (
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                {post.tag}
              </span>
            )}
          </div>

          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:gap-x-16 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0">
              <header>
                <h1 className="max-w-[22ch] text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.25rem]">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-5 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{post.author}</span>
                  {post.role && <span>{post.role}</span>}
                  <span aria-hidden="true" className="text-primary">
                    ·
                  </span>
                  <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
                  <span aria-hidden="true" className="text-primary">
                    ·
                  </span>
                  <span>{post.readingMinutes} min lesetid</span>
                </div>
              </header>

              {post.cover && (
                <figure className="mt-10">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
                    <img
                      src={post.cover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {post.tag ?? 'Illustrasjon'}
                  </figcaption>
                </figure>
              )}

              {/* On small screens the sidebar TOC is far below the fold, so the
                  article carries its own copy at the point of use. */}
              {headings.length >= 2 && (
                <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 lg:hidden">
                  <ArticleToc headings={headings} />
                </div>
              )}

              <div className="prose prose-lg mt-10 max-w-[68ch] dark:prose-invert prose-headings:scroll-mt-28 prose-a:text-primary">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{ h2: anchored('h2'), h3: anchored('h3') }}
                >
                  {post.body}
                </ReactMarkdown>
              </div>

              {services.length > 0 && (
                <aside aria-labelledby="relevant-heading" className="mt-14 max-w-[68ch] border-t border-border pt-8">
                  <h2
                    id="relevant-heading"
                    className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary"
                  >
                    Relevant hos oss
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {services.map((service) => (
                      <li key={service.href}>
                        <Link
                          to={service.href}
                          className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                        >
                          <ArrowRight
                            className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                          <span>
                            <span className="block font-medium text-foreground">{service.label}</span>
                            <span className="mt-0.5 block text-sm text-muted-foreground">
                              {service.blurb}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>

            <aside aria-label="Artikkelinfo">
              <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:border-l lg:border-border lg:pl-8">
                <div className="hidden lg:block">
                  <ArticleToc headings={headings} />
                </div>

                {related.length > 0 && (
                  <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                      Relaterte artikler
                    </p>
                    <ul className="flex flex-col divide-y divide-border border-y border-border">
                      {related.map((item) => (
                        <li key={`${item.lang}/${item.slug}`}>
                          <Link
                            to={`${BLOG_PATH}/${item.slug}`}
                            className="group flex flex-col gap-1.5 py-3.5"
                          >
                            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              {item.tag ?? 'Artikkel'}
                            </span>
                            <span className="text-[1.05rem] font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                              {item.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ShareLinks url={url} title={post.title} />
              </div>
            </aside>
          </div>
        </article>

        {/* Full-bleed closing CTA. The previous boxed version sat inside the
            text column and read as one more paragraph. */}
        <section aria-labelledby="artikkel-cta" className="border-t border-border bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Neste steg</p>
              <h2 id="artikkel-cta" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Står dere i noe av dette?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {ORGANIZATION} bygger saksbehandlingssystemer, portaler og integrasjoner for offentlig
                sektor og næringsliv — og forvalter dem videre etter lansering. Ta en uforpliktende prat.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/kontakt"
                className="inline-flex min-h-[3rem] items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Kontakt oss
              </Link>
              <Link
                to="/caser"
                className="inline-flex min-h-[3rem] items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Se kundecaser
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="container mx-auto px-4 py-14 md:py-20" aria-labelledby="relaterte">
            <h2 id="relaterte" className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
              Fortsett å lese
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={`${item.lang}/${item.slug}`} post={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
