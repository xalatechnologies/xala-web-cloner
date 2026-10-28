import { expect, test } from '@playwright/test';

// The bug only shows on browsers that cannot hyphenate Norwegian (older WebKit,
// Android WebViews, in-app browsers). Playwright's Chromium DOES ship hyph-nb,
// so it hides the defect: each test pins that condition with hyphens:none.
// Without the visibility wait, goto resolves before React lays out and every
// assertion reads 0 on a broken build.
const NO_HYPHENS = 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}';

for (const width of [320, 360, 375, 390]) {
  test(`homepage does not scroll sideways at ${width}px without hyphenation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await expect(page.locator('#products-teaser-heading')).toBeVisible();
    await page.addStyleTag({ content: NO_HYPHENS });
    await page.waitForTimeout(250);

    // clientWidth, not innerWidth: mobile device profiles inflate innerWidth.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}

// A document-level probe cannot see a heading that leaves its own card while
// staying inside the viewport. That defect is live on main at 768px today, so
// this measures text against the card, not the page against the window.
test('no heading text escapes its card at 768px without hyphenation', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/');
  await expect(page.locator('#products-teaser-heading')).toBeVisible();
  await page.addStyleTag({ content: NO_HYPHENS });
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
      const cardRight = card.getBoundingClientRect().right;
      const range = document.createRange();
      range.selectNodeContents(h);
      let textRight = 0;
      for (const r of range.getClientRects()) textRight = Math.max(textRight, r.right);
      const over = Math.round(textRight - cardRight);
      if (over > worst) {
        worst = over;
        who = (h.textContent || '').trim().slice(0, 30);
      }
    }
    return { worst, who };
  });

  expect(worst.worst, `«${worst.who}» escapes its card by ${worst.worst}px`).toBeLessThanOrEqual(1);
});
