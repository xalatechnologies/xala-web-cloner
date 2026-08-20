import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useLegalContent } from '../use-legal-content';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { language: 'no' } }),
}));

describe('useLegalContent', () => {
  it('keeps a section lead when items are also present', () => {
    const { result } = renderHook(() => useLegalContent({ type: 'privacy' }));
    const processors = result.current.data?.sections.find((section) => section.id === 'processors');
    expect(processors?.description).toContain('Godta alle');
    expect(processors?.items?.map((entry) => entry.id)).toEqual([
      'google-ads',
      'ga4',
      'clarity',
      'plausible',
    ]);
  });

  it('turns a content-only section into a single untitled item', () => {
    const { result } = renderHook(() => useLegalContent({ type: 'privacy' }));
    const intro = result.current.data?.sections.find((section) => section.id === 'intro');
    expect(intro?.items).toHaveLength(1);
    expect(intro?.items?.[0].title).toBeUndefined();
    expect(intro?.items?.[0].content).toContain('Xala Technologies AS');
  });
});
