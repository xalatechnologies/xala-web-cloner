import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { allPosts } from '@/lib/blog';
import { allTags, publishedPosts } from '@/lib/blog/posts';
import { ALL_TAGS, filterBlogPosts } from '@/lib/blog/search';
import { getPageSEO } from '@/components/seo/seoContent';
import { matchSitePages, suggestedSitePages, type SitePage } from '@/lib/search/pages';
import { BLOG_PATH, SITE_ORIGIN, blogJsonLd, formatDate } from '@/lib/blog/seo';

const listing = getPageSEO('blog', 'no');
const TITLE = listing.title;
const DESCRIPTION = listing.description;

const PAGE_SIZE = 8;
const ALL = ALL_TAGS;

export default function BloggPage() {
  const posts = useMemo(() => publishedPosts(allPosts()), []);
  const tags = useMemo(() => [ALL, ...allTags(posts)], [posts]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [activeTag, setActiveTag] = useState(() => searchParams.get('tag') ?? ALL);
  const [page, setPage] = useState(() => {
    const parsed = Number.parseInt(searchParams.get('page') ?? '1', 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  });

  // The navbar search submits to /blogg?q=…, and when the reader is already on
  // this page the router reuses the mounted component, so the initialiser above
  // never runs again. Follow the URL when it changes from somewhere other than
  // this box. The comparison is against the trimmed field, because the writer
  // below trims before it writes: without that, typing a trailing space would
  // come straight back as a URL change and delete the space under the cursor.
  const urlQuery = searchParams.get('q') ?? '';
  const typedQuery = useRef(query);
  useEffect(() => {
    if (typedQuery.current.trim() === urlQuery) return;
    typedQuery.current = urlQuery;
    setQuery(urlQuery);
    setPage(1);
  }, [urlQuery]);

  // Search and filter state lives in the URL so a filtered view is a link
  // somebody can send. `replace` keeps the back button pointing at the page
  // the reader arrived from rather than at every keystroke.
  useEffect(() => {
    typedQuery.current = query;
    const next = new URLSearchParams();
    if (query.trim()) next.set('q', query.trim());
    if (activeTag !== ALL) next.set('tag', activeTag);
    if (page > 1) next.set('page', String(page));
    setSearchParams(next, { replace: true });
  }, [query, activeTag, page, setSearchParams]);

  const filtered = useMemo(
    () => filterBlogPosts(posts, { query, tag: activeTag }),
    [posts, query, activeTag],
  );

  // The navbar hands every query here, so this is the site's search results
  // page whether or not the answer is an article. Searching for a product, the
  // price page or contact used to end at "Ingen treff." with nothing to open.
  const pageHits = useMemo(() => matchSitePages(query), [query]);
  const suggestions = useMemo(
    () => (query.trim() && pageHits.length === 0 && !filtered.length ? suggestedSitePages() : []),
    [query, pageHits, filtered]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Clamped rather than reset: narrowing the filter while on page 3 should show
  // the last page of the new result set, not silently jump to an empty one.
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setActiveTag(ALL);
    setPage(1);
  };

  // Deliberately plainer than an article row: a page is a destination, not a
  // piece of reading, and the eye should be able to tell them apart in one
  // list. The whole row is the link, so it is one target rather than three.
  const pageList = (id: string, heading: string, pages: SitePage[]) => (
    <section aria-labelledby={id} className="pt-10">
      <h2 id={id} className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {heading}
      </h2>
      <ul className="mt-4 border-t border-border">
        {pages.map((page) => (
          <li key={page.path} className="border-b border-border">
            <Link
              to={page.path}
              className="group block px-2 py-5 transition-colors hover:bg-muted/40 md:px-5"
            >
              <h3 className="text-lg font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                {page.title}
                <ArrowUpRight
                  className="ml-2 inline-block h-4 w-4 -translate-x-2 align-baseline text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </h3>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                {page.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_ORIGIN}${BLOG_PATH}`} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={TITLE}
          href={`${SITE_ORIGIN}${BLOG_PATH}/rss.xml`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_ORIGIN}${BLOG_PATH}`} />
        <script type="application/ld+json">{JSON.stringify(blogJsonLd(posts))}</script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-20">
        <header className="container mx-auto px-4 py-12 md:py-16">
          <nav aria-label="Brødsmuler" className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="inline-flex min-h-11 items-center hover:text-foreground hover:underline">
              Forside
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Blogg</span>
          </nav>
          <p className="mb-5 eyebrow">
            Fagartikler
          </p>
          <h1 className="max-w-[18ch] page-heading">
            Erfaringer fra systemer i drift
          </h1>
          <p className="mt-6 max-w-2xl section-lead">{DESCRIPTION}</p>
        </header>

        <div className="container mx-auto px-4">
          <div className="border-y border-border py-5 md:py-6">
            <div className="grid items-center gap-5 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <label htmlFor="blogg-sok" className="sr-only">
                  Søk i artikler og sider
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="blogg-sok"
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Søk: tilskuddsportal, integrasjon, Altinn …"
                    className="min-h-11 w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-10 text-base text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setPage(1);
                      }}
                      aria-label="Tøm søk"
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {tags.length > 1 && (
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer på tema">
                    {tags.map((tag) => {
                      const isActive = tag === activeTag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setActiveTag(tag);
                            setPage(1);
                          }}
                          aria-pressed={isActive}
                          className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border bg-card text-foreground hover:border-primary/50'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <p
              aria-live="polite"
              className="mt-4 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span>
                {filtered.length === posts.length
                  ? `${posts.length} artikler`
                  : `${filtered.length} av ${posts.length} artikler`}
              </span>
              {totalPages > 1 && (
                <span>
                  Side {currentPage} av {totalPages}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20">
          {/* Above the articles: a query that names a page is answered by that
              page, and the reader should not have to read past eight articles
              to find it. */}
          {pageHits.length > 0 && pageList('sok-sider', 'Sider', pageHits)}

          {visible.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-2xl font-bold tracking-tight">
                {pageHits.length > 0 ? 'Ingen treff i artiklene.' : 'Ingen treff.'}
              </p>
              <p className="mt-3 text-muted-foreground">Prøv et annet søkeord, eller fjern filteret.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
              >
                Nullstill
              </button>
              {/* A search that matches nothing is still a reader looking for
                  something; hand them the site rather than an apology. */}
              {suggestions.length > 0 && (
                <div className="mx-auto mt-12 max-w-3xl text-left">
                  {pageList('sok-forslag', 'Prøv en av disse sidene', suggestions)}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* The page h1 already says what these are, so the list heading is
                  for structure only — it keeps the h1 → h2 → h3 chain intact. */}
              <h2 className="sr-only">Alle artikler</h2>
              <ol className="border-t border-border">
                {visible.map((post) => (
                  <li key={`${post.lang}/${post.slug}`} className="border-b border-border">
                    <Link
                      to={`${BLOG_PATH}/${post.slug}`}
                      className="group relative block py-8 transition-colors hover:bg-muted/40 md:py-10"
                    >
                      {/* Hairline that draws in on hover — the row's only
                          decoration, so the eye follows the text, not a box. */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 top-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100"
                      />
                      <div className="grid gap-5 px-2 md:px-5 lg:grid-cols-12 lg:gap-8">
                        {post.cover && (
                          <div className="order-2 lg:order-1 lg:col-span-3">
                            {/* Covers are generated at 1200x630 (40:21) with the title baked in near the left edge; a narrower frame made object-cover crop into that text. */}
                            <div className="relative aspect-[40/21] overflow-hidden rounded-xl border border-border bg-muted">
                              <img
                                src={post.cover}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className="order-1 lg:order-2 lg:col-span-2">
                          <div className="flex items-start gap-4 lg:block">
                            {post.tag && (
                              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                {post.tag}
                              </span>
                            )}
                            <time
                              dateTime={post.date}
                              className="block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground lg:mt-2"
                            >
                              {formatDate(post.date, post.lang)}
                            </time>
                          </div>
                        </div>
                        <div className={`order-3 ${post.cover ? 'lg:col-span-7' : 'lg:col-span-10'}`}>
                          <h3 className="subsection-heading leading-tight transition-transform duration-300 group-hover:translate-x-1">
                            {post.title}
                            <ArrowUpRight
                              className="ml-2 inline-block h-5 w-5 -translate-x-2 align-baseline text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </h3>
                          <p className="mt-3 max-w-[60ch] leading-relaxed text-muted-foreground">
                            {post.description}
                          </p>
                          <p className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            <span>{post.author}</span>
                            <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
                            <span>{post.readingMinutes} min lesetid</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>

              {totalPages > 1 && (
                <nav
                  aria-label="Sidenavigasjon"
                  className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"
                >
                  <button
                    type="button"
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft
                      className="h-4 w-4 transition-transform group-enabled:group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">Forrige</span>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                      <button
                        key={number}
                        type="button"
                        onClick={() => setPage(number)}
                        aria-current={number === currentPage ? 'page' : undefined}
                        aria-label={`Side ${number}`}
                        className={`inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-lg px-2 text-sm font-medium tabular-nums transition-colors ${
                          number === currentPage
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">Neste</span>
                    <ChevronRight
                      className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
