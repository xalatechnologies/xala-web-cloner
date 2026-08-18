/**
 * Linking an article to the pages it is actually about.
 *
 * Blog posts are the pages that pick up long-tail search traffic; the service
 * and product pages are the ones that need it. A post that links only back to
 * the blog index is a dead end for both the reader who just decided they have
 * this problem and the crawler deciding how important /tjenester is.
 *
 * Matching is on the post's own words — slug, title, tag and keywords — so a
 * new post gets its links from what it is about, with no per-post wiring.
 *
 * Every `href` here is a literal internal path, which means the internal-links
 * guard checks it against the real route table. A link added here that has no
 * route fails the suite rather than shipping as a 404.
 */
import type { BlogPost } from './types';

export interface RelatedTarget {
  href: string;
  label: string;
  /** Why the reader would want this, one line. */
  blurb: string;
}

interface Rule extends RelatedTarget {
  match: RegExp;
}

const RULES: Rule[] = [
  {
    href: '/tjenester',
    label: 'Systemutvikling og integrasjon',
    blurb: 'Saksbehandlingssystemer, portaler og integrasjoner — bygget og forvaltet.',
    match: /saksbehandl|portal|tilskudd|bevilling|skjema|vedtak|fagsystem|integrasjon|felleskomponent|altinn|api/i,
  },
  {
    href: '/teknologi',
    label: 'Teknologien vi bygger på',
    blurb: 'Azure, .NET og React — og hvorfor vi velger som vi gjør.',
    match: /azure|sky|cloud|arkitektur|\.net|react|database|plattform|modernis|teknisk gjeld|migrer/i,
  },
  {
    href: '/produkter',
    label: 'Våre produkter',
    blurb: 'Digilist, Digiskjema og Xaheen.',
    match: /norchain|xaheen|digilist|booking|blockchain|ai|kunstig intelligens|maskinl(æ|ae)ring|produkt/i,
  },
  {
    href: '/slik-vi-jobber',
    label: 'Slik vi jobber',
    blurb: 'Fra kartlegging til drift — og hvem som eier hva underveis.',
    match: /prosess|leveranse|smidig|team|forvaltning|drift|samarbeid|anskaff|anbud|kravspesifikasjon/i,
  },
  {
    href: '/caser',
    label: 'Kundecaser',
    blurb: 'Hva vi har levert til stat, helse og kommune.',
    match: /kommune|stat|offentlig|helse|etat|referanse|case|kunde/i,
  },
];

/** Shown when nothing matches — never an empty section. */
const FALLBACK: RelatedTarget = {
  href: '/tjenester',
  label: 'Systemutvikling og integrasjon',
  blurb: 'Saksbehandlingssystemer, portaler og integrasjoner — bygget og forvaltet.',
};

/**
 * Up to `limit` pages relevant to a post, ranked by how many of its own words
 * hit the rule.
 *
 * Ranked rather than first-match: a post about a tilskuddsportal for a kommune
 * matches both the services rule and the cases rule, and which one appears
 * first should be decided by the post's emphasis, not by the order this array
 * happens to be written in.
 */
export function relatedServices(
  post: Pick<BlogPost, 'slug' | 'title' | 'tag' | 'keywords'>,
  limit = 2
): RelatedTarget[] {
  const haystack = [post.slug, post.title, post.tag ?? '', ...(post.keywords ?? [])]
    .join(' ')
    .toLowerCase();

  const scored = RULES.map((rule) => {
    const global = new RegExp(rule.match.source, 'gi');
    const hits = haystack.match(global)?.length ?? 0;
    return { target: { href: rule.href, label: rule.label, blurb: rule.blurb }, hits };
  })
    .filter((entry) => entry.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  if (!scored.length) return [FALLBACK];
  return scored.slice(0, limit).map((entry) => entry.target);
}
