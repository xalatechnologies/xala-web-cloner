import { render } from '@testing-library/react';
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
