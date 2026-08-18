import type { CaseStudy } from '@/types/caseStudy';
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

/**
 * Title and description a crawler should see for this case study.
 *
 * The base `seo` object is English ("Nordre Follo Municipality Case Study").
 * Norwegian descriptions were already written under translations.no.seo, but
 * the prerender and the detail-page Helmet both read the English fields, so
 * every nb-NO case URL shipped an English card. Titles that still use the
 * "Case Study" template are rewritten rather than invented: the English
 * marketing sentence stays for en, and Altinn's existing 99,99 % copy is
 * left untouched because it lives on the Norwegian description.
 */
export function localizedSeo(
  study: Pick<CaseStudy, 'seo' | 'summary' | 'translations'>,
  language: string
): { title: string; description: string } {
  const lang = normalizeCaseLang(language);
  const locale = lang === 'en' ? undefined : study.translations?.[lang];
  const description = locale?.seo?.description ?? study.seo.description ?? study.summary;
  const authored = locale?.seo?.title ?? study.seo.title;
  return {
    title: lang === 'no' ? norwegianCaseTitle(authored) : authored,
    description,
  };
}

/** Drop the English "Case Study" template from an nb-NO title. */
export function norwegianCaseTitle(title: string): string {
  if (!/case study/i.test(title)) return title;
  return title
    .replace(/\s*Case Study\s*/gi, ' ')
    .replace(/\bMunicipality\b/g, 'kommune')
    .replace(/\s+\|/g, ' |')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
