import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import VideoHero from '../VideoHero';
import { DEFAULT_HERO_WORDS } from '../words';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

function renderHero(words: string[]) {
  return render(
    <MemoryRouter>
      <VideoHero videoSrc="" words={words} />
    </MemoryRouter>
  );
}

function visibleText(el: Element | null) {
  return (el?.textContent ?? '').replace(/\u00AD/g, '');
}

function rotatingWord() {
  return document.querySelector('#home h1 .text-primary');
}

describe('VideoHero rotating word overflow', () => {
  it('forces saksbehandlingssystemer — a shorter rotator is not a pass', () => {
    // QA: a 375px check can miss overflow if "integrasjoner" is on screen.
    renderHero(['saksbehandlingssystemer']);

    const word = rotatingWord();
    expect(word).not.toBeNull();
    expect(visibleText(word)).toBe('saksbehandlingssystemer');
    expect(word!.className).toContain('max-w-full');
    expect(word!.className).toContain('[overflow-wrap:anywhere]');
    expect(word!.className).not.toMatch(/nowrap/);
  });

  it.each([...DEFAULT_HERO_WORDS])('keeps %s wrappable inside the heading column', (word) => {
    renderHero([word]);

    const el = rotatingWord();
    expect(visibleText(el)).toBe(word);
    expect(el!.className).toContain('max-w-full');
    expect(el!.className).toContain('[overflow-wrap:anywhere]');
  });

  it('still uses the existing hero type scale from sm and up', () => {
    renderHero(['saksbehandlingssystemer']);

    const h1 = document.querySelector('#home h1');
    expect(h1?.className).toContain('sm:text-5xl');
    expect(h1?.className).toContain('md:text-6xl');
    expect(h1?.className).toContain('lg:text-7xl');
  });

  // GEOQA #45: lcp-below 1200ms failed on xala.no's landing page. The heading
  // is the largest text on it, so it is the LCP element, and it used to mount
  // at opacity 0 behind a 0.3s entrance delay — time added straight onto the
  // measurement. An entrance animation is fine anywhere else in the hero.
  it('paints the heading immediately rather than fading it in', () => {
    renderHero(['saksbehandlingssystemer']);

    const h1 = document.querySelector('#home h1') as HTMLElement;
    expect(h1).not.toBeNull();
    expect(h1.style.opacity).not.toBe('0');
    expect(rotatingWord()).not.toHaveStyle({ opacity: 0 });
  });

  it('opens on saksbehandlingssystemer when using the default rotator list', () => {
    render(
      <MemoryRouter>
        <VideoHero videoSrc="" />
      </MemoryRouter>
    );

    expect(DEFAULT_HERO_WORDS[0]).toBe('saksbehandlingssystemer');
    expect(visibleText(rotatingWord())).toBe('saksbehandlingssystemer');
  });
});
