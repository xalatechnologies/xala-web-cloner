import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import PostCard from '@/components/blog/PostCard';
import { allPosts } from '@/lib/blog';
import { publishedPosts } from '@/lib/blog/posts';

/** Three is the most that still reads as a row rather than an index. */
const MAX_POSTS = 3;

/**
 * The latest writing, on the front page.
 *
 * The blog shipped without any route into it from the homepage, so the only way
 * to reach it was the nav. Articles are the cheapest proof that a consultancy
 * knows its domain, and they were invisible to anyone who landed on the front
 * page and scrolled.
 *
 * Renders nothing at all when there are no published posts — an empty "latest
 * articles" section advertises that nobody has written anything.
 */
export default function BlogTeaser() {
  const { t, i18n } = useTranslation();

  const posts = useMemo(() => {
    const lang = i18n.language?.toLowerCase().startsWith('en') ? 'en' : 'no';
    // Fall back to Norwegian rather than showing an empty section: the posts
    // are written in Norwegian first and a translation may not exist yet.
    const loaded = allPosts();
    const forLang = publishedPosts(loaded, lang);
    return (forLang.length ? forLang : publishedPosts(loaded, 'no')).slice(0, MAX_POSTS);
  }, [i18n.language]);

  if (!posts.length) return null;

  return (
    <Section tone="muted" size="md" labelledBy="blog-teaser-heading">
      <div className="section-header">
        <p className="mb-5 eyebrow">
          {t('teasers.blog.eyebrow', 'Fagartikler')}
        </p>
        <h2
          id="blog-teaser-heading"
          className="section-heading"
        >
          {t('teasers.blog.title', 'Det vi skriver om')}
        </h2>
        <p className="section-lead mt-5 max-w-[52ch]">
          {t('teasers.blog.description', 'Erfaringer fra prosjektene våre — arkitektur, modernisering og digitalisering av saksbehandling.')}
        </p>
      </div>

      {/*
        Column count follows the post count. A single post in a three-column
        grid reads as two missing posts; on its own row it reads as one article.
      */}
      <div
        className={`mt-12 grid gap-6 ${
          posts.length === 1
            ? 'mx-auto max-w-2xl grid-cols-1'
            : posts.length === 2
              ? 'md:grid-cols-2'
              : 'md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {posts.map((post) => (
          <PostCard key={`${post.lang}/${post.slug}`} post={post} />
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/blogg"
          className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-all duration-200 hover:border-primary/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t('teasers.blog.viewAll', 'Se alle fagartikler')}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}
