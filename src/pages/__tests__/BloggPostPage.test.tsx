import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import BloggPostPage from '../BloggPostPage';
import { topicHashtagLine } from '@/lib/blog/topics';
import { SHARE_LABEL } from '@/lib/blog/share';
import { allPosts } from '@/lib/blog';
import { findPost } from '@/lib/blog/posts';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

// ArticleToc's scroll-spy needs IntersectionObserver; jsdom does not have one.
class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);

const SLUG = 'automatisering-av-saksbehandling-hva-boer-og-ikke';

function renderPost(slug = SLUG) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/blogg/${slug}`]}>
        <Routes>
          <Route path="/blogg/:slug" element={<BloggPostPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('BloggPostPage lead vs cover', () => {
  it('puts Kort svar (Digdir / Prop. 79 L / forskrift) above the cover, not below it', () => {
    const { container } = renderPost();

    const lead = screen.getByRole('heading', { level: 2, name: 'Kort svar' });
    const cover = container.querySelector(`img[src="/images/blog/${SLUG}.webp"]`);
    expect(cover).toBeTruthy();

    const position = lead.compareDocumentPosition(cover!);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const article = container.querySelector('article');
    const text = article?.textContent ?? '';
    expect(text).toContain(
      'Regelstyrte steg og registerinnhenting kan automatiseres. Skjønnsvedtak kan ikke.'
    );
    expect(text).toContain('Digdir');
    expect(text).toContain('Prop. 79 L');
    expect(text).toContain('Forskriftsarbeidet');
    expect(text.match(/## Kort svar|Kort svar/g)?.filter((m) => m === 'Kort svar').length).toBeGreaterThanOrEqual(1);
  });

  it('does not rewrite the Kort svar paragraph', () => {
    renderPost();

    expect(
      screen.getByText(/Ny forvaltningslov \(lov 20\. juni 2025 nr\. 81, Prop\. 79 L\)/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Begynn med arbeidet rundt vedtaket, ikke vedtaket selv/)
    ).toBeInTheDocument();
  });

  it('compacts the first-screen stack so the three citations stay in the lead box', () => {
    const { container } = renderPost();

    const box = container.querySelector('[data-article-lead]');
    expect(box).toBeTruthy();
    expect(box!.querySelector('a[href*="digdir.no"]')?.textContent).toBe('Digdir');
    expect(box!.querySelector('a[href*="prop.-79-l"]')?.textContent).toBe('Prop. 79 L kap. 8');
    expect(box!.querySelector('a[href*="forskrift-om-automatisert"]')?.textContent).toBe(
      'Forskriftsarbeidet'
    );

    // Layout only: the approved type scale is one step down from page-heading
    // / relaxed deck so the box fits a 1280×800 first screen.
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.className.split(/\s+/)).not.toContain('page-heading');
    expect(heading.className).toContain('page-heading-no-hyphens');
    expect(heading.className).toMatch(/2\.5rem/);
    expect(box!.className).toMatch(/py-3/);
    expect(box!.className).toMatch(/px-4/);
  });

  it('prerenders the lead above the cover so first HTML matches the SPA', () => {
    const prerender = readFileSync(resolve(__dirname, '../../../scripts/prerender-blog.ts'), 'utf8');
    expect(prerender).toContain('splitLeadSection');
    const leadAt = prerender.indexOf('${leadHtml}');
    const coverAt = prerender.indexOf('${cover}');
    expect(leadAt).toBeGreaterThan(-1);
    expect(coverAt).toBeGreaterThan(-1);
    expect(leadAt).toBeLessThan(coverAt);
  });

  it('leaves a post without Kort svar in the existing header → cover → body order', () => {
    const { container } = renderPost('agentiske-arbeidsflyter-i-saksbehandling');

    expect(screen.queryByRole('heading', { level: 2, name: 'Kort svar' })).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 1 });
    const cover = container.querySelector(
      'img[src="/images/blog/agentiske-arbeidsflyter-i-saksbehandling.webp"]'
    );
    const firstBodyHeading = screen.getByRole('heading', { level: 2, name: 'Skillet går ved vedtaket' });

    expect(cover).toBeTruthy();
    expect(heading.compareDocumentPosition(cover!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(cover!.compareDocumentPosition(firstBodyHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

const GEBYR_SLUG = 'skjenkebevilling-gebyr-og-omsetningsoppgave';

describe('BloggPostPage topic hashtags and share row', () => {
  it('shows 3–5 Norwegian topic hashtags as the last line, not IT-leder', () => {
    const post = findPost(allPosts(), GEBYR_SLUG);
    expect(post).toBeTruthy();
    const line = topicHashtagLine(post!);

    renderPost(GEBYR_SLUG);

    expect(line).toBe('#skjenkebevilling #gebyr #omsetningsoppgave #visma #alkoholloven');
    expect(screen.getByText(line)).toBeInTheDocument();
    expect(screen.queryByText(/#IT-leder/)).not.toBeInTheDocument();
    expect(screen.getByText(SHARE_LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'LinkedIn (åpnes i ny fane)' }),
    ).toHaveAttribute('href', expect.stringContaining('linkedin.com/sharing/share-offsite'));
  });

  it('shows exactly one hashtag line on the sele post, plus Del artikkelen', () => {
    const slug = 'sele-rundt-ki-i-saksbehandling';
    const post = findPost(allPosts(), slug);
    expect(post).toBeTruthy();
    const line = topicHashtagLine(post!);

    const { container } = renderPost(slug);

    expect(line).toBe('#selerundtKI #kunstigintelligenskommune #arkitekturprinsipper #saksbehandling');
    const article = container.querySelector('article');
    const hashtagParas = [...(article?.querySelectorAll('p') ?? [])].filter((node) =>
      /^#[\p{L}][\p{L}\p{N}-]*(?:\s+#[\p{L}][\p{L}\p{N}-]*)+$/u.test(node.textContent?.trim() ?? ''),
    );
    expect(hashtagParas).toHaveLength(1);
    expect(hashtagParas[0].textContent).toBe(line);
    expect(hashtagParas[0].className).toMatch(/text-muted-foreground/);
    expect(screen.queryByText(/#kunstigintelligens #arkitekturprinsipper/)).not.toBeInTheDocument();
    expect(screen.getByText(SHARE_LABEL)).toBeInTheDocument();
  });

  it('puts post-specific keywords and matching article:tag in the document head', async () => {
    renderPost(GEBYR_SLUG);

    await waitFor(() => {
      const keywords = document.head.querySelector('meta[name="keywords"]')?.getAttribute('content');
      expect(keywords).toContain('skjenkebevilling');
      expect(keywords).not.toContain('skreddersydd programvare');
    });

    const tags = [...document.head.querySelectorAll('meta[property="article:tag"]')].map((el) =>
      el.getAttribute('content'),
    );
    expect(tags).toEqual([
      'skjenkebevilling',
      'gebyr',
      'omsetningsoppgave',
      'visma',
      'alkoholloven',
    ]);
    expect(tags).not.toContain('IT-leder');
  });
});

const EBYGGESAK_SLUG = 'ebyggesak-manuell-henting-fra-altinn';
const EBYGGESAK_TITLE = 'Byggesøknaden skal inn i saken, ikke i Altinn';

/**
 * XWEB-196: at 1280px the article H1 hyphenated "saken" as "sa-ken".
 * Copy stays draft 15; hyphenation is off so the word wraps whole.
 * Distinct from XWEB-183 (/produkter "kommune") — that PageHeader is untouched.
 */
describe('BloggPostPage article H1 hyphenation', () => {
  it('keeps saken whole on the eByggesak display H1 and turns hyphenation off', () => {
    renderPost(EBYGGESAK_SLUG);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(EBYGGESAK_TITLE);
    expect(heading.textContent).toContain('saken');
    expect(heading.textContent).not.toMatch(/sa[\u00AD-]ken/);
    expect(heading.className).toContain('page-heading-no-hyphens');
    expect(heading.className).not.toContain('max-w-[18ch]');
    expect(heading.className).not.toContain('max-w-[20ch]');
  });

  it('prerenders the article H1 with hyphenation off so first HTML matches the SPA', () => {
    const prerender = readFileSync(resolve(__dirname, '../../../scripts/prerender-blog.ts'), 'utf8');
    expect(prerender).toMatch(/<h1 class="page-heading-no-hyphens">\$\{escapeHtml\(post\.title\)\}<\/h1>/);
  });
});
