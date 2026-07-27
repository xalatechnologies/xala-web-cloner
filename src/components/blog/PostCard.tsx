import { Link } from 'react-router-dom';
import { BLOG_PATH, formatDate } from '@/lib/blog/seo';
import type { BlogPost } from '@/lib/blog/types';

interface PostCardProps {
  post: BlogPost;
  /** The first card on the index gets the visual weight and the h2. */
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {post.cover && (
        <Link
          to={`${BLOG_PATH}/${post.slug}`}
          className={`block overflow-hidden bg-muted ${featured ? 'md:w-1/2' : ''}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
              featured ? 'md:min-h-[18rem]' : 'aspect-[16/9]'
            }`}
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {post.tag && (
            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{post.tag}</span>
          )}
          <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min</span>
        </div>

        <h3 className={`card-heading leading-snug ${featured ? 'md:text-2xl' : ''}`}>
          <Link to={`${BLOG_PATH}/${post.slug}`} className="after:absolute after:inset-0 hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>

        <span className="text-sm font-medium text-primary">
          Les artikkelen <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
