import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '../components/blog/PostCard';
import NotFound from './NotFound';
import { allPosts } from '@/lib/blog';
import { findPost, relatedPosts } from '@/lib/blog/posts';
import { BLOG_PATH, ORGANIZATION, articleJsonLd, formatDate, postMeta } from '@/lib/blog/seo';

export default function BloggPostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const posts = useMemo(() => allPosts(), []);
  const post = useMemo(() => findPost(posts, slug), [posts, slug]);
  const related = useMemo(() => (post ? relatedPosts(posts, post) : []), [posts, post]);

  // A slug that does not resolve must be a real 404 for crawlers, not a blog
  // page with empty content — a soft 404 gets the whole section devalued.
  if (!post) return <NotFound />;

  const meta = postMeta(post);

  return (
    <div className="min-h-screen flex flex-col">
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
      </Helmet>

      <Navbar />

      <main className="pt-20 flex-1">
        <article className="container mx-auto px-4 py-12 md:py-16">
          <nav aria-label="Brødsmuler" className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              Forside
            </Link>
            <span aria-hidden="true"> / </span>
            <Link to={BLOG_PATH} className="hover:underline">
              Blogg
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{post.title}</span>
          </nav>

          <header className="mx-auto max-w-3xl">
            {post.tag && (
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.tag}
              </span>
            )}
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              {post.role && <span>· {post.role}</span>}
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min lesetid</span>
            </div>
          </header>

          {post.cover && (
            <img
              src={post.cover}
              alt=""
              className="mx-auto mt-10 aspect-[16/9] w-full max-w-4xl rounded-2xl object-cover"
              loading="eager"
              decoding="async"
            />
          )}

          <div className="prose prose-lg dark:prose-invert mx-auto mt-10 max-w-3xl prose-headings:scroll-mt-24 prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          <aside className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border/40 bg-muted/40 p-8">
            <h2 className="text-xl font-semibold">Snakk med oss om dette</h2>
            <p className="mt-2 text-muted-foreground">
              {ORGANIZATION} bygger løsninger som denne for offentlig sektor og næringsliv. Ta en uforpliktende
              prat om hva dere står i.
            </p>
            <Link
              to="/kontakt"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Kontakt oss
            </Link>
          </aside>
        </article>

        {related.length > 0 && (
          <section className="container mx-auto px-4 pb-20" aria-labelledby="relaterte">
            <h2 id="relaterte" className="mb-6 text-2xl font-semibold">
              Relaterte artikler
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
