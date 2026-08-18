import { faqJsonLd, type FaqItem } from '@/lib/blog/toc';
import { stripMarkdownLinks } from '@/lib/plainText';
import type { CaseStudy, CaseStudyFaqItem } from '@/types/caseStudy';

export function caseStudyFaqItems(study: Pick<CaseStudy, 'faq'>): FaqItem[] {
  return (study.faq ?? []).map((item: CaseStudyFaqItem) => ({
    question: item.question,
    answer: stripMarkdownLinks(item.answer),
  }));
}

/** FAQPage for this case only. Null when the case has no FAQ of its own. */
export function caseStudyFaqJsonLd(
  url: string,
  study: Pick<CaseStudy, 'faq'>
): Record<string, unknown> | null {
  return faqJsonLd(url, caseStudyFaqItems(study));
}
