import { fireEvent, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import BloggPage from '../BloggPage';
import { allPosts } from '@/lib/blog';
import { publishedPosts } from '@/lib/blog/posts';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderBloggPage(entry = '/blogg') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[entry]}>
        <BloggPage />
      </MemoryRouter>
    </HelmetProvider>
  );
}

/** Every result a reader could open, in the order they are offered. */
function resultLinks(container: HTMLElement) {
  return Array.from(container.querySelectorAll('main section a, main ol li a')).map((link) =>
    link.getAttribute('href')
  );
}

describe('BloggPage cover frames', () => {
  it('sizes the cover frame to the generated cover\'s own 1200x630 ratio, so object-cover has nothing to crop', () => {
    const withCover = publishedPosts(allPosts()).find((post) => post.cover);
    expect(withCover).toBeTruthy();

    const { container } = renderBloggPage();

    const img = container.querySelector(`img[src="${withCover!.cover}"]`);
    expect(img).toBeTruthy();

    // scripts/make-blog-cover.mjs bakes the title in near the left edge of a
    // 1200x630 canvas. Any frame narrower than that ratio (e.g. 4:3) makes
    // object-cover crop the sides and slice into the title text.
    const frame = img!.parentElement!;
    expect(frame.className).toContain('aspect-[40/21]');
    expect(frame.className).not.toContain('aspect-[4/3]');
    // Hover zoom re-crops the baked-in title; keep the cover at 1:1 with the frame.
    expect(img!.className).not.toContain('group-hover:scale');
  });
});

describe('BloggPage search', () => {
  it('picks up a query submitted from the navbar while the page is already mounted', () => {
    const { container } = renderBloggPage();

    const pageBox = container.querySelector<HTMLInputElement>('#blogg-sok')!;
    const navBox = container.querySelector<HTMLInputElement>('#nav-sok')!;

    // The router reuses this component when the navbar navigates to
    // /blogg?q=…, so the state initialiser never runs a second time and the
    // typed query used to land in the URL and nowhere else.
    fireEvent.change(navBox, { target: { value: 'tilskuddsportal' } });
    fireEvent.submit(navBox.closest('form')!);

    expect(pageBox.value).toBe('tilskuddsportal');
  });

  it('leaves a trailing space alone while the reader is still typing', () => {
    const { container } = renderBloggPage();

    const pageBox = container.querySelector<HTMLInputElement>('#blogg-sok')!;

    // The URL carries the trimmed query, so a naive sync back from the URL
    // deletes the space the reader just typed between two words.
    fireEvent.change(pageBox, { target: { value: 'tilskudd ' } });

    expect(pageBox.value).toBe('tilskudd ');
  });
});

describe('BloggPage results for a query the articles cannot answer', () => {
  it('opens the page the query names instead of ending at "Ingen treff."', () => {
    // The navbar hands every query here, and here knew about 25 articles and
    // nothing else — so a reader searching for the price page got an empty
    // state with no first result to open.
    const { container, queryByText } = renderBloggPage('/blogg?q=priser');

    expect(queryByText('Ingen treff.')).not.toBeInTheDocument();
    expect(resultLinks(container)[0]).toBe('/priser');
  });

  it('keeps the article results, and puts the page above them', () => {
    const { container } = renderBloggPage('/blogg?q=integrasjon');

    const links = resultLinks(container);
    expect(links[0]).toBe('/tjenester');
    expect(links.some((href) => href?.startsWith('/blogg/'))).toBe(true);
  });

  it('offers somewhere to go when nothing matches at all', () => {
    const { container, getByText } = renderBloggPage('/blogg?q=zzzzzz');

    expect(getByText('Ingen treff.')).toBeInTheDocument();
    // An apology with no link out is a dead end; the site itself is the answer.
    const suggestions = within(container).getByRole('heading', { name: 'Prøv en av disse sidene' });
    expect(suggestions).toBeInTheDocument();
    expect(resultLinks(container)[0]).toBe('/');
  });

  it('leaves the unfiltered listing alone', () => {
    const { container } = renderBloggPage();

    // No query, no page section: this is the blog index, not a results page.
    expect(container.querySelectorAll('main section a').length).toBe(0);
    expect(resultLinks(container).every((href) => href?.startsWith('/blogg/'))).toBe(true);
  });
});
