import { describe, expect, it } from 'vitest';
import { listingPageNumber } from '../listingPage';

describe('listingPageNumber', () => {
  it('reads page, then side, and ignores junk', () => {
    expect(listingPageNumber(new URLSearchParams('page=2'))).toBe(2);
    expect(listingPageNumber(new URLSearchParams('side=3'))).toBe(3);
    expect(listingPageNumber(new URLSearchParams('page=2&side=9'))).toBe(2);
    expect(listingPageNumber(new URLSearchParams())).toBe(1);
    expect(listingPageNumber(new URLSearchParams('page=0'))).toBe(1);
    expect(listingPageNumber(new URLSearchParams('page=no'))).toBe(1);
  });
});
