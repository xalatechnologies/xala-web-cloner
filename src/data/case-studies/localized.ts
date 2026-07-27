import { caseStudyBySlug } from './index';

export type CaseLang = 'no' | 'en' | 'ar';

/** i18next hands back tags like 'nb-NO'; collapse to the three we author in. */
export function normalizeCaseLang(raw: string | undefined): CaseLang {
  const lang = raw?.toLowerCase() ?? 'no';
  if (lang.startsWith('ar')) return 'ar';
  if (lang.startsWith('en')) return 'en';
  return 'no';
}

/**
 * The card blurb for a case study, in the reader's language.
 *
 * Every case study already carried a Norwegian `card.excerpt` — the
 * translations were written and then not used. The /caser index reads from
 * caser-page-entries.ts, a separate list whose `description` field has no
 * language dimension at all, so all seventeen cards showed English text on a
 * Norwegian site. The most persuasive page on the site, in the wrong language,
 * with the right words sitting one file away.
 *
 * Reading from the case study rather than copying its text here keeps one
 * source: the blurb on the index and the blurb on the detail page cannot drift.
 *
 * Falls back to the base (English) excerpt when a language is missing, and
 * returns undefined when the slug resolves to nothing — the caller then keeps
 * whatever it already had rather than rendering an empty card.
 */
export function localizedCardExcerpt(
  slug: string | undefined,
  language: string
): string | undefined {
  if (!slug) return undefined;
  const study = caseStudyBySlug(slug);
  if (!study) return undefined;

  const lang = normalizeCaseLang(language);
  if (lang === 'en') return study.card?.excerpt;

  return study.translations?.[lang]?.card?.excerpt ?? study.card?.excerpt;
}
