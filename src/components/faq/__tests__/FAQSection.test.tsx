import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, afterEach } from 'vitest';
import FAQSection from '../FAQSection';
import { FAQ_TOPICS, faqsFor } from '../faqs';
import faqData from '@/data/faq.json';

const language = { current: 'no' };

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
    i18n: { get language() { return language.current; } },
  }),
}));

function renderFAQ() {
  return render(
    <HelmetProvider>
      <FAQSection />
    </HelmetProvider>
  );
}

function jsonLdBlocks() {
  return [...document.head.querySelectorAll('script[type="application/ld+json"]')].map((el) =>
    JSON.parse(el.textContent ?? '')
  );
}

afterEach(() => {
  document.head.querySelectorAll('script,meta,link,title').forEach((el) => el.remove());
  language.current = 'no';
});

describe('faqsFor', () => {
  it('resolves each supported language, including regional tags', () => {
    expect(faqsFor('no')).toBe(faqData.no);
    expect(faqsFor('nb-NO')).toBe(faqData.no);
    expect(faqsFor('en-GB')).toBe(faqData.en);
    expect(faqsFor('ar')).toBe(faqData.ar);
  });

  it('falls back to Norwegian for anything unknown', () => {
    expect(faqsFor('de')).toBe(faqData.no);
    expect(faqsFor('')).toBe(faqData.no);
  });
});

describe('FAQ content', () => {
  const languages = ['no', 'en', 'ar'] as const;

  it('answers the same questions in every language', () => {
    const ids = faqData.no.map((f) => f.id);
    expect(ids.length).toBeGreaterThanOrEqual(6);
    for (const lang of languages) {
      expect(faqData[lang].map((f) => f.id)).toEqual(ids);
    }
  });

  it('gives every question a substantive answer', () => {
    // Arabic ends questions with U+061F, not '?'.
    const questionMark = /[?؟]$/;
    for (const lang of languages) {
      for (const faq of faqData[lang]) {
        expect(questionMark.test(faq.question), `${lang}/${faq.id} is not a question`).toBe(true);
        // Answer-engine extracts need a real answer, not one clause.
        expect(faq.answer.length, `${lang}/${faq.id} answer too short`).toBeGreaterThan(120);
      }
    }
  });

  it('uses unique ids so the accordion keys cannot collide', () => {
    for (const lang of languages) {
      const ids = faqData[lang].map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('keeps FAQ topics disjoint so two pages cannot emit the same FAQPage', () => {
    const seen = new Set<string>();
    for (const [topic, ids] of Object.entries(FAQ_TOPICS)) {
      for (const id of ids) {
        expect(seen.has(id), `${id} appears in more than one topic (found again in ${topic})`).toBe(
          false
        );
        seen.add(id);
      }
    }
    expect(FAQ_TOPICS.pricing).toContain('kostnad');
    expect(FAQ_TOPICS.process).not.toContain('kostnad');
  });
});

describe('FAQSection', () => {
  it('renders every question as visible text', () => {
    renderFAQ();

    for (const faq of faqData.no) {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    }
  });

  it('emits FAQPage structured data matching the questions on the page', async () => {
    renderFAQ();

    await waitFor(() => expect(jsonLdBlocks().length).toBe(1));

    const [schema] = jsonLdBlocks();
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(faqData.no.length);

    // Every question in the markup must be one shown on the page — this is the
    // condition Google actually enforces.
    const rendered = faqData.no.map((f) => f.question);
    for (const entry of schema.mainEntity) {
      expect(entry['@type']).toBe('Question');
      expect(rendered).toContain(entry.name);
      expect(entry.acceptedAnswer.text.length).toBeGreaterThan(120);
    }
  });

  it('switches both the copy and the schema with the language', async () => {
    language.current = 'en';
    renderFAQ();

    expect(screen.getByText(faqData.en[0].question)).toBeInTheDocument();
    await waitFor(() => expect(jsonLdBlocks().length).toBe(1));
    expect(jsonLdBlocks()[0].mainEntity[0].name).toBe(faqData.en[0].question);
  });

  it('exposes the section with an accessible heading', () => {
    renderFAQ();

    const section = document.querySelector('section#faq');
    expect(section).toHaveAttribute('aria-labelledby', 'faq-heading');
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'faq-heading');
  });
});
