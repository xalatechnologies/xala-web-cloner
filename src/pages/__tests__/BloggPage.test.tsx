import { fireEvent, render } from '@testing-library/react';
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

function renderBloggPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/blogg']}>
        <BloggPage />
      </MemoryRouter>
    </HelmetProvider>
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
