import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '@/lib/blog/seo';

/**
 * The head tags that are true of every page, rendered from one place.
 *
 * Six routes manage their own <Helmet> because their metadata depends on
 * content RouteSEO cannot see — a blog post's title, a case study's cover. They
 * owned the tags they needed and silently omitted the ones they had in common:
 * no og:locale, no twitter:card, no hreflang, and on five of them no og:image
 * at all, so a link to any service or product page shared as a bare grey box.
 *
 * The old head audit reported "no problems" throughout, because it only checked
 * canonical, og:url, og:title and description. Six routes were missing four
 * tags each and nothing said so.
 *
 * Splitting universal from per-page is what stops it recurring: a new
 * self-managed page gets these by construction rather than by remembering.
 * Anything a page overrides — og:image for a post with its own cover — wins,
 * because the page's Helmet mounts below this one.
 */
interface UniversalHeadProps {
  /** Absolute URL of this page. Drives the self-referencing hreflang pair. */
  canonicalUrl: string;
}

/** The site's default share image, for pages with nothing more specific. */
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

const UniversalHead = ({ canonicalUrl }: UniversalHeadProps) => (
  <Helmet>
    {/* Bokmål, stated rather than inferred. This is what Google matches a
        Norwegian query against, and it was previously "no" — the macrolanguage
        — on every route except the four that set their own. */}
    <html lang="nb-NO" />
    <meta property="og:locale" content="nb_NO" />
    <meta property="og:site_name" content="Xala Technologies AS" />

    {/* A single-language site still says so explicitly: x-default has nowhere
        else to point, and leaving both out invites Google to guess. */}
    <link rel="alternate" hrefLang="nb-NO" href={canonicalUrl} />
    <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

    {/* Without a card type, X renders a bare link with no image.
        property= matches the static shell so Helmet replaces it. */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="og:image" content={DEFAULT_OG_IMAGE} />
    <meta property="twitter:image" content={DEFAULT_OG_IMAGE} />

    {/* Answer engines: the machine-readable summary of the whole site. */}
    <link rel="alternate" type="text/plain" href={`${SITE_ORIGIN}/llms.txt`} title="llms.txt" />
    <link
      rel="alternate"
      type="application/rss+xml"
      href={`${SITE_ORIGIN}/blogg/rss.xml`}
      title="Xala Technologies — fagartikler"
    />
  </Helmet>
);

export default UniversalHead;
