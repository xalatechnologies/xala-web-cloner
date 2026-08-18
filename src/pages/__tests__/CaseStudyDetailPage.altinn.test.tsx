import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CaseStudyDetailPage from '../CaseStudyDetailPage';
import { altinnCaseStudy } from '@/data/case-studies/altinn';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);

function jsonLdBlocks() {
  return [...document.head.querySelectorAll('script[type="application/ld+json"]')].map((el) =>
    JSON.parse(el.textContent ?? '')
  );
}

function renderAltinn() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/caser/altinn']}>
        <Routes>
          <Route path="/caser/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

afterEach(() => {
  document.head.querySelectorAll('script,meta,link,title').forEach((el) => el.remove());
});

describe('/caser/altinn', () => {
  it('keeps the existing /caser/altinn URL and approved Norwegian title', () => {
    renderAltinn();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Altinn 3 og Altinn Studio: hva Xala bidro med hos Digdir'
    );
    expect(screen.getByText('Digitaliseringsdirektoratet (Digdir)')).toBeInTheDocument();
  });

  it('puts Kort svar on the first screen with Digdir citations', () => {
    renderAltinn();
    const lead = document.getElementById('kort-svar');
    expect(lead).toBeTruthy();
    expect(lead!.compareDocumentPosition(screen.getByRole('heading', { level: 1 }))).toBe(
      Node.DOCUMENT_POSITION_PRECEDING
    );
    expect(lead!.textContent).toMatch(/Xala eier ikke Altinn/);
    expect(lead!.querySelector('a[href="https://docs.altinn.studio/nb/community/about/"]')).toBeTruthy();
    expect(
      lead!.querySelector('a[href="https://samarbeid.digdir.no/altinn/ta-i-bruk-altinn-3/2333"]')
    ).toBeTruthy();
  });

  it('renders the four approved FAQs and emits only that FAQPage', async () => {
    renderAltinn();
    for (const item of altinnCaseStudy.faq ?? []) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
    const faq = document.getElementById('faq');
    expect(faq).toBeTruthy();
    expect(faq!.querySelector('a[href="/kontakt"]')?.textContent).toBe('Kontakt');
    expect(faq!.querySelector('a[href="/caser"]')?.textContent).toBe('caser');

    await waitFor(() => expect(jsonLdBlocks().some((block) => block['@type'] === 'FAQPage')).toBe(true));
    const faqPages = jsonLdBlocks().filter((block) => block['@type'] === 'FAQPage');
    expect(faqPages).toHaveLength(1);
    expect(faqPages[0]['@id']).toBe('https://xala.no/caser/altinn#faq');
    expect(faqPages[0].mainEntity).toHaveLength(4);
  });

  it('does not show stripped uptime, cost or budget claims', () => {
    renderAltinn();
    expect(document.body.textContent).not.toMatch(/99[,.]99/);
    expect(document.body.textContent).not.toMatch(/70\s?%/);
    expect(document.body.textContent).not.toMatch(/NOK\s?15/);
  });
});
