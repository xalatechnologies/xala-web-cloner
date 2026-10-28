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
    const noInk: string[] = [];
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
      // A heading whose Range yields no rects has nothing to measure, and
      // skipping it silently is the same trap as the walk above: the test
      // would pass by not looking. Collect it and assert the list is empty.
      if (!Number.isFinite(inkRight)) {
        noInk.push((h.textContent || '').trim().slice(0, 40));
        continue;
      }
      count++;
      const over = Math.round(inkRight - card.getBoundingClientRect().right);
      if (over > worst) {
        worst = over;
        who = (h.textContent || '').trim().slice(0, 40);
      }
    }

    return { docOverflow, worst, who, count, unmatched, noInk };
  });

  expect(
    measured.unmatched,
    `no card edge found for ${measured.unmatched.length} heading(s) within 8 steps: ` +
      `${measured.unmatched.slice(0, 3).join(' | ')}${measured.unmatched.length > 3 ? ' | …' : ''}`,
  ).toHaveLength(0);
  expect(
    measured.noInk,
    `no painted text found for ${measured.noInk.length} heading(s): ` +
      `${measured.noInk.slice(0, 3).join(' | ')}${measured.noInk.length > 3 ? ' | …' : ''}`,
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
    const noInk: string[] = [];
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
      // A heading whose Range yields no rects has nothing to measure, and
      // skipping it silently is the same trap as the walk above: the test
      // would pass by not looking. Collect it and assert the list is empty.
      if (!Number.isFinite(inkRight)) {
        noInk.push((h.textContent || '').trim().slice(0, 40));
        continue;
      }
      count++;
      const over = Math.round(inkRight - card.getBoundingClientRect().right);
      if (over > worst) {
        worst = over;
        who = (h.textContent || '').trim().slice(0, 40);
      }
    }

    return { docOverflow, worst, who, count, unmatched, noInk };
  });

  expect(measured.unmatched, `no card edge found for ${measured.unmatched.length} heading(s)`).toHaveLength(0);
  expect(
    measured.noInk,
    `no painted text found for ${measured.noInk.length} heading(s): ` +
      `${measured.noInk.slice(0, 3).join(' | ')}${measured.noInk.length > 3 ? ' | …' : ''}`,
  ).toHaveLength(0);
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

// /produkter repeats the same failure, but the card row has two children that
// can escape: the title and the «Kommer» badge. Both are measured separately
// because they are different boxes with different widths, and at 320px the
// badge is the second-worst escape on the page after the title.
//
// The section that holds these cards sets overflow:hidden, so the document
// never reports horizontal overflow here even while glyphs are painted past a
// card's border. A zero document width is therefore not evidence that nothing
// escaped: the per-card Range probe below is the only assertion that sees it.
const produkterCardEscape = async (page: import('@playwright/test').Page) =>
  page.evaluate(() => {
    const rows: Array<{
      title: string;
      child: string;
      escape: number;
      /** Border-box right edge minus the card's, for the bordered badge span. */
      badgeBoxEscape: number;
    }> = [];
    const unmatched: string[] = [];
    const noInk: string[] = [];

    const inkRightOf = (el: Element) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      let right = -Infinity;
      for (const rect of range.getClientRects()) {
        if (rect.right > right) right = rect.right;
      }
      return right;
    };

    for (const heading of document.querySelectorAll('#core-products h3.card-heading')) {
      const title = (heading.textContent || '').trim().slice(0, 40);

      // Resolve the card by structure, not by sniffing computed styles. The
      // card is the <a class="group"> from Link, or a <div class="group">
      // when a product has no slug. A border/background walk is fragile in a
      // way that fails silently: it compares against one literal spelling of
      // "transparent", and a browser that reports the colour without spaces
      // makes the walk consume the heading itself — after which every heading
      // measures against its own right edge and the case passes on a build
      // that is 72px broken. closest() cannot do that; the identity guard
      // below is belt-and-braces.
      const card: Element | null = heading.closest('a, .group');
      if (!card || card === heading) {
        unmatched.push(title);
        continue;
      }
      const cardRight = card.getBoundingClientRect().right;

      // The title and the badge are siblings inside the icon/title/badge row.
      // Measure each child of that row on its own ink, skipping the icon,
      // which is a fixed 48px box and is never the thing that overflows.
      const row = heading.parentElement;
      const measured: Element[] = [heading];
      if (row) {
        for (const child of Array.from(row.children)) {
          if (child === heading) continue;
          if (child.classList.contains('card-icon')) continue;
          if (!(child.textContent || '').trim()) continue;
          measured.push(child);
        }
      }

      for (const el of measured) {
        const child = el === heading ? 'heading' : 'badge';
        const inkRight = inkRightOf(el);
        if (!Number.isFinite(inkRight)) {
          noInk.push(`${title} :: ${child}`);
          continue;
        }
        rows.push({
          title,
          child,
          escape: Math.round((inkRight - cardRight) * 100) / 100,
          // The badge is a bordered span, so its border box — not its glyph
          // ink — is what a person actually sees. For the title this stays
          // NaN and is never read: a squeezed h3 has a clean box while its
          // text still spills, which is why the title is measured on ink.
          badgeBoxEscape:
            el === heading
              ? Number.NaN
              : Math.round((el.getBoundingClientRect().right - cardRight) * 100) / 100,
        });
      }
    }

    const worstOf = (child: string) => {
      const only = rows.filter((r) => r.child === child);
      return only.length ? Math.max(...only.map((r) => r.escape)) : 0;
    };

    const badgeRows = rows.filter((r) => r.child === 'badge');

    return {
      unmatched,
      noInk,
      count: rows.length,
      worstHeading: worstOf('heading'),
      worstBadge: worstOf('badge'),
      // worstOf() returns 0 when there is no badge at all, and 0 satisfies a
      // "<= 1" assertion. /produkter renders exactly ONE «Kommer» badge
      // (Digiskjema, 1 of 6 cards), so if that product stops being
      // comingSoon the "and badge" half of these cases would quietly assert
      // nothing. The count is asserted alongside so that cannot happen
      // silently.
      badgeCount: badgeRows.length,
      // The badge is a bordered span, so its BORDER box is what a person
      // sees. Measured directly, in addition to its glyph ink.
      worstBadgeBox: badgeRows.length
        ? Math.max(...badgeRows.map((r) => r.badgeBoxEscape))
        : null,
      escapeCount: rows.filter((r) => r.escape > 1).length,
    };
  });

// Real content. The widths are chosen for what they prove, not evenly. 320
// and 375 are below the wrap edge, where the base build spills by 72.09 and
// 17.09. 1024 and 1100 are inside the 1024-1134 wrap band, where the base
// build spills by 37.44 and 12.09 — so both wrap bands are covered by a
// case that fails without the fix. 768 and 1280 sit in the nowrap stretches
// where the base build is already clean, and are here to prove the fix does
// not leak into widths it was not meant to touch.
for (const width of [320, 375, 768, 1024, 1100, 1280]) {
  test(`product cards contain their title and badge at ${width}px without hyphenation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/produkter/');

    await expect(page.locator('#core-products h3.card-heading').first()).toBeVisible();

    await page.addStyleTag({
      content: 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);

    const result = await produkterCardEscape(page);

    expect(
      result.unmatched,
      `no card edge found for ${result.unmatched.length} product card(s) (closest('a, .group') returned no card): ` +
        `${result.unmatched.slice(0, 3).join(' | ')}${result.unmatched.length > 3 ? ' | …' : ''}`,
    ).toHaveLength(0);
    expect(
      result.noInk,
      `no painted text found for ${result.noInk.length} card child(ren): ` +
        `${result.noInk.slice(0, 3).join(' | ')}${result.noInk.length > 3 ? ' | …' : ''}`,
    ).toHaveLength(0);
    expect(result.count, 'no product card text was measured').toBeGreaterThan(0);
    // Guard the badge assertion below: worstBadge is 0 when there is no badge,
    // and 0 passes. One «Kommer» badge is rendered (Digiskjema); if that ever
    // stops being so, this fails loudly instead of passing vacuously.
    expect(result.badgeCount, 'no «Kommer» badge was measured, so the badge assertion would be vacuous').toBeGreaterThan(0);
    expect(result.worstHeading, `a product title escapes its card by ${result.worstHeading}px`).toBeLessThanOrEqual(1);
    expect(result.worstBadge, `a «Kommer» badge escapes its card by ${result.worstBadge}px`).toBeLessThanOrEqual(1);
    // The badge's border box is what a person sees, so assert it too.
    expect(result.worstBadgeBox, `a «Kommer» badge border box escapes its card by ${result.worstBadgeBox}px`).toBeLessThanOrEqual(1);
    // A count rather than a max: when it fails, the message says how many
    // things escaped, which the single worst value cannot.
    expect(result.escapeCount, `${result.escapeCount} product card element(s) escape their card`).toBe(0);
  });
}

// One synthetic compound at 320px only. From 392px up the row is deliberately
// nowrap, so an injected compound of this length still escapes at wide widths
// by design; asserting it there would demand a fix we did not ship. Real
// content at those widths is covered by the loop above.
test('/produkter keeps a long compound inside the card at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/produkter/');

  await expect(page.locator('#core-products h3.card-heading').first()).toBeVisible();

  await page.addStyleTag({
    content: 'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;}',
  });

  // Replace the title's own text node rather than its sibling <svg>, so the
  // fixture keeps working if the icon moves. Refuse to continue if there is no
  // text node: a silent no-op would make this case vacuous.
  const fixture = await page.evaluate(() => {
    const h3 = document.querySelector('#core-products h3.card-heading');
    if (!h3) return 'no product title';
    const text = [...h3.childNodes].find(
      (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0,
    );
    if (!text) return 'first product title has no text node';
    const compound = 'sammenstillingsarkitektur';
    text.textContent = compound;
    return h3.textContent?.includes(compound) ? 'ok' : 'replacement did not apply';
  });
  expect(fixture, 'the synthetic title was not injected').toBe('ok');

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);

  const result = await produkterCardEscape(page);

  expect(result.unmatched, `no card edge found for ${result.unmatched.length} product card(s)`).toHaveLength(0);
  expect(result.noInk, `no painted text found for ${result.noInk.length} card child(ren)`).toHaveLength(0);
  expect(result.worstHeading, `long compound escapes its card by ${result.worstHeading}px`).toBeLessThanOrEqual(1);
  expect(result.escapeCount, `${result.escapeCount} product card element(s) escape their card`).toBe(0);
});
