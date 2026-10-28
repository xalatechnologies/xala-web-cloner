import { expect, test } from '@playwright/test';

// The homepage only scrolls sideways on browsers that cannot hyphenate
// Norwegian (older WebKit, Android WebViews, in-app browsers). Chromium
// hyphenates, so it hides the bug; each test pins the failing condition.
// The page must also be laid out before scrollWidth means anything.
for (const width of [320, 360, 375, 390]) {
  test(`homepage does not scroll sideways at ${width}px when hyphenation is unavailable`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');

    await expect(page.locator('#products-teaser-heading')).toBeVisible();

    await page.addStyleTag({
      content: 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}',
    });
    await page.waitForTimeout(250);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - window.innerWidth;
    });

    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}
