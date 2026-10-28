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
for (const width of [768, 1024]) {
  test(`no heading escapes its card at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('#products-teaser-heading')).toBeVisible();
    await page.addStyleTag({ content: 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}' });
    await page.waitForTimeout(250);

    const worst = await page.evaluate(() => {
      let worst = 0;
      let who = '';
      for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
        let card = h;
        let steps = 0;
        while (card && steps < 8) {
          const cs = getComputedStyle(card);
          if (cs.borderTopWidth !== '0px' || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') break;
          card = card.parentElement;
          steps++;
        }
        if (!card) continue;
        const over = Math.round(
          h.getBoundingClientRect().right - card.getBoundingClientRect().right
        );
        if (over > worst) {
          worst = over;
          who = (h.textContent || '').trim().slice(0, 40);
        }
      }
      return { worst, who };
    });

    expect(worst.worst, `«${worst.who}» escapes its card by ${worst.worst}px`).toBeLessThanOrEqual(1);
  });
}
