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
      let measured = 0;
      const unmatched: string[] = [];
      for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
        let card: Element | null = h;
        let steps = 0;
        let found = false;
        while (card && steps < 8) {
          const cs = getComputedStyle(card);
          if (cs.borderTopWidth !== '0px' || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            found = true;
            break;
          }
          card = card.parentElement;
          steps++;
        }
        // A walk that runs out of ancestors must not silently measure against
        // whatever element it landed on: that edge is the container, not the
        // card, and the assertion would pass without saying anything.
        if (!found || !card) {
          unmatched.push((h.textContent || '').trim().slice(0, 40));
          continue;
        }
        measured++;
        const over = Math.round(
          h.getBoundingClientRect().right - card.getBoundingClientRect().right
        );
        if (over > worst) {
          worst = over;
          who = (h.textContent || '').trim().slice(0, 40);
        }
      }
      return { worst, who, measured, unmatched };
    });

    expect(
      worst.unmatched,
      `no card edge found for ${worst.unmatched.length} heading(s) within 8 steps: ` +
        `${worst.unmatched.slice(0, 3).join(' | ')}${worst.unmatched.length > 3 ? ' | …' : ''}`,
    ).toHaveLength(0);
    expect(worst.measured, 'no heading was measured').toBeGreaterThan(0);
    expect(worst.worst, `«${worst.who}» escapes its card by ${worst.worst}px`).toBeLessThanOrEqual(1);
  });
}

// /blogg repeats the homepage failure: a listing title's min-content widens
// its grid cell, and Chromium hyphenation hides it. Measure the document with
// clientWidth (a scrollbar must not look like overflow) and the painted glyphs
// with a Range — a squeezed grid child reports a clean box while the word
// still sticks out of the row.
test('/blogg does not overflow at 320px without hyphenation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/blogg/');

  await expect(page.locator('ol h3').first()).toBeVisible();

  await page.addStyleTag({
    content: 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}',
  });
  await page.waitForTimeout(250);

  const measured = await page.evaluate(() => {
    const root = document.documentElement;
    const docOverflow = root.scrollWidth - root.clientWidth;

    let worst = 0;
    let who = '';
    let count = 0;
    const unmatched: string[] = [];
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      let card: Element | null = h;
      let steps = 0;
      let found = false;
      while (card && steps < 8) {
        const cs = getComputedStyle(card);
        const bordered =
          cs.borderTopWidth !== '0px' ||
          cs.borderRightWidth !== '0px' ||
          cs.borderBottomWidth !== '0px' ||
          cs.borderLeftWidth !== '0px';
        if (bordered || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          found = true;
          break;
        }
        card = card.parentElement;
        steps++;
      }
      // Same guard as the homepage cases: an exhausted walk means the card
      // edge is unknown, so refuse to measure instead of guessing at a node.
      if (!found || !card) {
        unmatched.push((h.textContent || '').trim().slice(0, 40));
        continue;
      }
      const range = document.createRange();
      range.selectNodeContents(h);
      let inkRight = -Infinity;
      for (const rect of range.getClientRects()) {
        if (rect.right > inkRight) inkRight = rect.right;
      }
      if (!Number.isFinite(inkRight)) continue;
      count++;
      const over = Math.round(inkRight - card.getBoundingClientRect().right);
      if (over > worst) {
        worst = over;
        who = (h.textContent || '').trim().slice(0, 40);
      }
    }

    return { docOverflow, worst, who, count, unmatched };
  });

  expect(
    measured.unmatched,
    `no card edge found for ${measured.unmatched.length} heading(s) within 8 steps: ` +
      `${measured.unmatched.slice(0, 3).join(' | ')}${measured.unmatched.length > 3 ? ' | …' : ''}`,
  ).toHaveLength(0);
  expect(measured.count, 'no listing title was measured').toBeGreaterThan(0);
  expect(
    measured.docOverflow,
    `document overflow ${measured.docOverflow}px; «${measured.who}» escapes its card by ${measured.worst}px`,
  ).toBeLessThanOrEqual(0);
  expect(
    measured.worst,
    `«${measured.who}» escapes its card by ${measured.worst}px`,
  ).toBeLessThanOrEqual(1);
});

test('/blogg keeps a long compound inside the listing row at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/blogg/');

  await expect(page.locator('ol h3').first()).toBeVisible();

  await page.addStyleTag({
    content: 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}',
  });

  // Replace the title's own text node rather than its sibling <svg>, so this
  // fixture keeps working if the icon moves. Refuse to continue if there is no
  // text node to write into: a silent no-op would make this case vacuous.
  const fixture = await page.evaluate(() => {
    const h3 = document.querySelector('ol h3');
    if (!h3) return 'no listing title';
    const text = [...h3.childNodes].find(
      (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0,
    );
    if (!text) return 'first listing title has no text node';
    const compound = 'Tilgjengelighetserklæringssaksbehandlingsplattform';
    text.textContent = compound;
    return h3.textContent?.includes(compound) ? 'ok' : 'replacement did not apply';
  });
  expect(fixture, 'the synthetic title was not injected').toBe('ok');

  await page.waitForTimeout(250);

  const measured = await page.evaluate(() => {
    const root = document.documentElement;
    const docOverflow = root.scrollWidth - root.clientWidth;

    let worst = 0;
    let who = '';
    let count = 0;
    const unmatched: string[] = [];
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      let card: Element | null = h;
      let steps = 0;
      let found = false;
      while (card && steps < 8) {
        const cs = getComputedStyle(card);
        const bordered =
          cs.borderTopWidth !== '0px' ||
          cs.borderRightWidth !== '0px' ||
          cs.borderBottomWidth !== '0px' ||
          cs.borderLeftWidth !== '0px';
        if (bordered || cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          found = true;
          break;
        }
        card = card.parentElement;
        steps++;
      }
      if (!found || !card) {
        unmatched.push((h.textContent || '').trim().slice(0, 40));
        continue;
      }
      const range = document.createRange();
      range.selectNodeContents(h);
      let inkRight = -Infinity;
      for (const rect of range.getClientRects()) {
        if (rect.right > inkRight) inkRight = rect.right;
      }
      if (!Number.isFinite(inkRight)) continue;
      count++;
      const over = Math.round(inkRight - card.getBoundingClientRect().right);
      if (over > worst) {
        worst = over;
        who = (h.textContent || '').trim().slice(0, 40);
      }
    }

    return { docOverflow, worst, who, count, unmatched };
  });

  expect(measured.unmatched, `no card edge found for ${measured.unmatched.length} heading(s)`).toHaveLength(0);
  expect(measured.count, 'no heading was measured').toBeGreaterThan(0);
  expect(
    measured.docOverflow,
    `long compound widens the document by ${measured.docOverflow}px; «${measured.who}» escapes its card by ${measured.worst}px`,
  ).toBeLessThanOrEqual(0);
  expect(
    measured.worst,
    `long compound escapes its card by ${measured.worst}px`,
  ).toBeLessThanOrEqual(1);
});
