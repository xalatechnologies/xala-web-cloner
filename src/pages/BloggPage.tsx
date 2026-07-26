import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '../components/blog/PostCard';
import { allPosts } from '@/lib/blog';
import { allTags, publishedPosts } from '@/lib/blog/posts';
import { BLOG_PATH, ORGANIZATION, SITE_ORIGIN, blogJsonLd } from '@/lib/blog/seo';

const TITLE = `Blogg | ${ORGANIZATION}`;
const DESCRIPTION =
  'Fagartikler om systemutvikling, Microsoft 365 og SharePoint, Azure, integrasjon og AI — skrevet for beslutningstakere i offentlig sektor og næringsliv.';

export default function BloggPage() {
  const posts = useMemo(() => publishedPosts(allPosts()), []);
  const tags = useMemo(() => allTags(posts), [posts]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visible = activeTag ? posts.filter((p) => p.tag === activeTag) : posts;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_ORIGIN}${BLOG_PATH}`} />
        <link rel="alternate" type="application/rss+xml" title={TITLE} href={`${SITE_ORIGIN}${BLOG_PATH}/rss.xml`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_ORIGIN}${BLOG_PATH}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(blogJsonLd(posts))}</script>
      </Helmet>

      <Navbar />

      <main className="pt-20 flex-1">
        <header className="container mx-auto px-4 py-12 md:py-16">
          <nav aria-label="Brødsmuler" className="mb-6 text-sm text-muted-foreground">
            <a href="/" className="hover:underline">
              Forside
            </a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Blogg</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Blogg</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{DESCRIPTION}</p>
        </header>

        {tags.length > 1 && (
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer på tema">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                aria-pressed={activeTag === null}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  activeTag === null
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/60 hover:border-primary/50'
                }`}
              >
                Alle
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  aria-pressed={tag === activeTag}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    tag === activeTag
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/60 hover:border-primary/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pb-20">
          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border/60 p-12 text-center text-muted-foreground">
              Ingen artikler her ennå.
            </p>
          ) : (
            <>
              {/* PostCard renders an h3, which is right on the post page where
                  it sits under "Relaterte artikler". Here it would jump straight
                  from the page h1, so the grid gets its own heading — visually
                  hidden, since the page title already says what these are. */}
              <h2 className="sr-only">Alle artikler</h2>
              <div className="grid gap-6 md:grid-cols-2">
              {visible.map((post, index) => (
                <PostCard key={`${post.lang}/${post.slug}`} post={post} featured={index === 0 && !activeTag} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
