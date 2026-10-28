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

// ---------------------------------------------------------------------------
// /priser — CostDriver row headings at narrow widths.
//
// THE DEFECT
// Each cost driver is a card whose heading row is
//   <div className="mb-5 flex items-center gap-4">   <CardIcon /> <h3.card-heading>
// The row is `nowrap` and the h3 defaults to `min-width: auto`, so the h3
// refuses to shrink below its longest unbreakable word, and that word paints out
// of the card. Measured on main (d3898fa4) in system Chrome 156 — the engine that
// ships an empty `hyphen-data/`, which is what makes the defect visible — with
// `hyphens: none` forced:
//   past the card BORDER:        +34.34 at 320, +14.34 at 340, +4.34 at 350,
//                                +1.34 at 353, clean from 354 up.
//   past the card CONTENT BOX:   +67.34 at 320, +47.34 at 340, +37.34 at 350,
//                                +34.34 at 353, +33.34 at 354, +27.34 at 360,
//                                +12.34 at 375, +7.34 at 380, +3.34 at 384,
//                                +2.34 at 385, +1.34 at 386, +0.34 at 387,
//                                and clean at 388 (-0.66).
//
// THE FIX (scoped, and nothing else on the page)
// Row: `max-[386px]:flex-wrap`, h3: `max-[386px]:min-w-0`. When the icon and the
// title cannot both fit, the title drops to its own line and gets the card's full
// content width, where it fits whole. Only the 8 CostDriver row headings get it;
// the 2 `h3.card-heading` headings in the scope cards keep `nowrap` and are
// asserted untouched below.
//
// WHY THE BAND ENDS AT 386 AND NOT 387
// At 387 on main the only remaining defect is 0.34px of ink that lands inside the
// card's 32px right padding — 31.66px short of the border, crossing nothing,
// invisible. Extending the band to 387 to recover it costs 255px of page height
// and grows four cards, up to 72px each, because at that width the wrap gives the
// icon a line of its own. Three of those four cards are clean on main. Paying
// 255px for 0.34px is the same over-scope the `max-sm` band was rejected for, so
// the band stops at 386 and 387 is byte-identical to main — verified, not
// assumed, and asserted in the out-of-band case below.
//
// WHY THE BAND IS 386 AND NOT max-sm
// A wider band is not free, and the cost is visible. With `max-sm` (<=639),
// wherever the title does not fit beside the icon the row wraps, so the icon takes
// one line and the title takes the next — a full extra line on every affected
// card, at widths where main is clean on BOTH edges. Measured, per card:
//   414px: page height 8212 -> 8396 (+184), 3 of 8 cards grow:
//            Nasjonale felleskomponenter  280.78 -> 352.78 (+72.00)  base -26.66
//            Flerleietaker eller egen     228.78 -> 300.78 (+72.00)  base -42.83
//            Forvaltning etter lansering  254.78 -> 294.39 (+39.61)  base -52.20
//   500px: page height 7555 -> 7666 (+111), 2 of 8 cards grow:
//            Nasjonale felleskomponenter  228.78 -> 268.39 (+39.61)  base -112.66
//            Flerleietaker eller egen     202.78 -> 274.78 (+72.00)  base -64.70
// Every card that grows there has a NEGATIVE base escape — the title was already
// comfortably inside the card. That is pure cost, at the top of the band, which
// is why 388/389/414/500 are asserted inert below.
//
// MEASURING BOTH EDGES
// An ink-only assertion against the card border calls the base build clean at
// widths where it is visibly broken, because the border sits 32px outside the
// content edge:
//   320px  «Datamigrering»              border -17.75  content +15.25
//   360px  «Nasjonale felleskomponenter» border  -5.66  content +27.34
//   375px  «Nasjonale felleskomponenter» border -20.66  content +12.34
//   385px  «Nasjonale felleskomponenter» border -30.66  content  +2.34
//   386px  «Nasjonale felleskomponenter» border -31.66  content  +1.34
// A border-only assertion therefore passes all five. Note «Datamigrering» is the
// case at 320 only; from 360 up a different heading carries it. Every case below
// asserts ink against the border box AND the content box for that reason.
//
// MID-WORD BREAKS
// Containing the title with min-w-0 alone forces the h3 to shrink beside the
// icon, and `overflow-wrap: break-word` then splits words that did not need to
// split: 3 mid-word breaks at 320px on a min-w-0-only build. The wrap avoids that
// by giving the title a full-width line instead of a squeezed one. One break
// pre-exists on main at 375px — the «SSA-S eller SSA-L» row splits «SSA-L» — and
// the fix resolves it rather than tolerating it: that row wraps instead of
// splitting, so the strict zero-break assertion holds everywhere. The word is
// named here rather than filtered out of the detector, so a future regression
// that reintroduces it fails by name.
//
// ENGINE
// Two engines are in play and they disagree by a rounding step, so every number
// above is attributed. These figures are system Chrome 156 (empty hyphen-data,
// 2dp precision). The CI runner uses BUNDLED Chromium, which hyphenates Norwegian
// and reads whole pixels; it is forced to `hyphens: none` below so the defect
// still shows, and its readings sit about a pixel right of system Chrome's. The
// assertions hold in both: in-band cases fail on main by tens of pixels, and
// out-of-band cases assert COMPUTED STYLE rather than ink — deliberately, because
// bundled Chromium reads main at +2 at 388 and +6 at 768, so an out-of-band ink
// assertion would fail on the fix as well as on main and prove nothing.
// ---------------------------------------------------------------------------

// The cost driver headings, and only them: the row is the direct parent.
const COST_ROW_HEADINGS = '.mb-5.flex.items-center > h3.card-heading';

// A band change is a real change: these two strings are the whole fix, and the
// cases below fail if either moves.
const ROW_FIX_CLASS = 'max-[386px]:flex-wrap';
const HEADING_FIX_CLASS = 'max-[386px]:min-w-0';

/** Ink of each CostDriver heading against its card, in px, plus broken words. */
async function measureCostRow(page: import('@playwright/test').Page) {
  return page.evaluate(
    ({ selector }) => {
      // A heading inside a scroll container gets its escape erased by
      // Playwright's own auto-scroll before we read it, so reset first.
      for (const el of Array.from(document.querySelectorAll('*'))) {
        if (el.scrollLeft !== 0) el.scrollLeft = 0;
      }
      const scrolling = Array.from(document.querySelectorAll('*')).filter(
        (el) => el.scrollLeft !== 0,
      ).length;

      let worstBorder = -Infinity;
      let worstContent = -Infinity;
      let whoBorder = '';
      let whoContent = '';
      let maxCardHeight = 0;
      let measured = 0;
      const unmatched: string[] = [];
      const noInk: string[] = [];
      const breaks: string[] = [];
      const escaping: string[] = [];
      let hyphensForced = true;

      for (const heading of Array.from(document.querySelectorAll(selector))) {
        const label = (heading.textContent || '').trim().slice(0, 40);
        if (getComputedStyle(heading).hyphens !== 'none') hyphensForced = false;

        // Nearest ancestor that draws a border: the card. Fail closed if none.
        let card: Element | null = heading;
        let steps = 0;
        let found = false;
        while (card && steps < 10) {
          const cs = getComputedStyle(card);
          if (parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderLeftWidth) > 0) {
            found = true;
            break;
          }
          card = card.parentElement;
          steps++;
        }
        if (!found || !card) {
          unmatched.push(label);
          continue;
        }

        const cs = getComputedStyle(card);
        const cardRect = card.getBoundingClientRect();
        const paddingRight = parseFloat(cs.paddingRight);
        const borderRight = parseFloat(cs.borderRightWidth);
        const contentRight = cardRect.right - borderRight - paddingRight;
        maxCardHeight = Math.max(maxCardHeight, cardRect.height);

        // A rect-based read goes blind once min-w-0 squeezes the box, so ink
        // comes from the text range, never from the h3's own rect.
        const range = document.createRange();
        range.selectNodeContents(heading);
        const rects = Array.from(range.getClientRects());
        let inkRight = -Infinity;
        for (const rect of rects) if (rect.right > inkRight) inkRight = rect.right;
        if (!Number.isFinite(inkRight)) {
          noInk.push(label);
          continue;
        }
        measured++;

        const vsBorder = inkRight - cardRect.right;
        const vsContent = inkRight - contentRight;
        if (vsContent > 1) escaping.push(`${label} +${Math.round(vsContent * 100) / 100}`);
        if (vsBorder > worstBorder) {
          worstBorder = vsBorder;
          whoBorder = label;
        }
        if (vsContent > worstContent) {
          worstContent = vsContent;
          whoContent = label;
        }

        // Word-level break detector: a word on more than one line was split.
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const text = node.textContent || '';
          const words = text.matchAll(/\S+/g);
          for (const match of words) {
            const word = match[0];
            if (word.length < 2) continue;
            const wordRange = document.createRange();
            wordRange.setStart(node, match.index as number);
            wordRange.setEnd(node, (match.index as number) + word.length);
            const tops = new Set(
              Array.from(wordRange.getClientRects()).map((r) => Math.round(r.top)),
            );
            if (tops.size > 1) breaks.push(word);
          }
        }
      }

      // Read the viewport last so nothing can resize it mid-measurement.
      return {
        worstBorder: Math.round(worstBorder * 100) / 100,
        worstContent: Math.round(worstContent * 100) / 100,
        whoBorder,
        whoContent,
        maxCardHeight: Math.round(maxCardHeight * 100) / 100,
        pageHeight: document.documentElement.scrollHeight,
        measured,
        unmatched,
        noInk,
        breaks,
        escaping,
        scrolling,
        hyphensForced,
        viewport: window.innerWidth,
        hashes: Array.from(document.querySelectorAll(selector)).map((h) => {
          const cs = getComputedStyle(h);
          const parent = getComputedStyle(h.parentElement as Element);
          return { minWidth: cs.minWidth, flexWrap: parent.flexWrap };
        }),
      };
    },
    { selector: COST_ROW_HEADINGS },
  );
}

/**
 * Non-row `h3.card-heading` nodes — the two scope cards. They must be untouched:
 * min-w-0 there would change their layout for nothing (and they already compute
 * `min-width: 0px` on main, so it would not even be the load-bearing line).
 */
async function measureScopeCards(page: import('@playwright/test').Page) {
  return page.evaluate((selector) => {
    const all = Array.from(document.querySelectorAll('h3.card-heading'));
    const rows = new Set(Array.from(document.querySelectorAll(selector)));
    const others = all.filter((h) => !rows.has(h));
    return {
      total: all.length,
      row: rows.size,
      others: others.length,
      othersWrap: others.map((h) =>
        h.parentElement ? getComputedStyle(h.parentElement).flexWrap : 'none',
      ),
      // The two scope-card h3s compute min-width:0px on main already, so the only
      // thing this change could do to them is wrap their row. Recorded so nobody
      // later credits min-w-0 with doing work it does not do here.
      othersMinWidth: others.map((h) => getComputedStyle(h).minWidth),
      labels: others.map((h) => (h.textContent || '').trim().slice(0, 30)),
    };
  }, COST_ROW_HEADINGS);
}

// Widths inside the band: both edges must hold, both utilities must be on, and no
// word may break. 353/354 and 384/385/386 are here because main's content escape
// crosses the 1px tolerance between them, so the band may not drift off the edge.
const IN_BAND = [320, 340, 350, 353, 354, 360, 375, 380, 384, 385, 386];
// Widths at or above the band end: the fix must be completely inert. 387 is the
// critical one — it is the width the band deliberately does not cover, and it
// must render exactly as main does. 388/389 are clean on main anyway; 414 and 500
// are where the max-sm band cost three and two cards an extra line.
const OUT_OF_BAND = [387, 388, 389, 414, 500, 640, 768, 1024, 1280];

for (const width of IN_BAND) {
  test(`/priser cost-driver headings stay inside their card at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/priser');
    await expect(page.locator(COST_ROW_HEADINGS).first()).toBeVisible();

    // Chromium may hyphenate Norwegian, which hides the escape and turns a real
    // break into a hyphen. Force it off, then assert it took effect below.
    await page.addStyleTag({
      content:
        'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;-webkit-hyphens:none !important;}',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);

    const m = await measureCostRow(page);

    expect(m.unmatched, `no card border found within 10 steps for ${m.unmatched.length}: ${m.unmatched.slice(0, 3).join(' | ')}`).toHaveLength(0);
    expect(m.noInk, `no painted text found for ${m.noInk.length} heading(s)`).toHaveLength(0);
    expect(m.hyphensForced, 'hyphens were not forced to none, so this width measures the wrong thing').toBe(true);
    expect(m.scrolling, 'a scroll container was still scrolled, which masks the escape').toBe(0);
    // Without this, a selector that matched nothing would pass silently.
    expect(m.measured, 'no cost-driver heading was measured').toBeGreaterThan(0);
    expect(m.viewport).toBe(width);

    // The fix has to actually be on here. At the top of the band main escapes by
    // only 1.34px, which squeaks under the 1px ink tolerance, so the ink
    // assertion alone cannot catch a regressed band at the edge — these can.
    for (const h of m.hashes) {
      expect(h.minWidth, `${HEADING_FIX_CLASS} is not active at ${width}px`).toBe('0px');
      expect(h.flexWrap, `${ROW_FIX_CLASS} is not active at ${width}px`).toBe('wrap');
    }

    expect(
      m.worstBorder,
      `«${m.whoBorder}» paints ${m.worstBorder}px past the card border at ${width}px`,
    ).toBeLessThanOrEqual(1);
    expect(
      m.worstContent,
      `«${m.whoContent}» paints ${m.worstContent}px past the card content box at ${width}px`,
    ).toBeLessThanOrEqual(1);
    expect(
      m.breaks,
      `mid-word break(s) at ${width}px: ${m.breaks.join(', ')} (the wrap should make these unnecessary)`,
    ).toHaveLength(0);
  });
}

for (const width of OUT_OF_BAND) {
  test(`/priser cost-driver headings are unchanged from 387px up at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/priser');
    await expect(page.locator(COST_ROW_HEADINGS).first()).toBeVisible();
    await page.addStyleTag({
      content:
        'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;-webkit-hyphens:none !important;}',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);

    const m = await measureCostRow(page);

    expect(m.unmatched, `no card border found within 10 steps for ${m.unmatched.length}`).toHaveLength(0);
    expect(m.noInk, `no painted text found for ${m.noInk.length} heading(s)`).toHaveLength(0);
    expect(m.measured, 'no cost-driver heading was measured').toBeGreaterThan(0);
    expect(m.hyphensForced, 'hyphens were not forced to none').toBe(true);
    // Both utilities computing off is what makes this width byte-identical to
    // main: they are the entire diff, so nothing else can move the layout. The
    // per-width rect comparison against main is in the PR body; these are the two
    // lines CI can see, and they are what the 387px case is really asserting.
    for (const h of m.hashes) {
      expect(h.minWidth, `${HEADING_FIX_CLASS} is leaking past the band at ${width}px`).toBe('auto');
      expect(h.flexWrap, `${ROW_FIX_CLASS} is leaking past the band at ${width}px`).toBe('nowrap');
    }
    // Ink is deliberately NOT asserted here. Main paints into the card's own right
    // padding at some of these widths with nothing this change touches (system
    // Chrome +3.34 at 768; bundled Chromium +2 at 388 and +6 at 768), so an
    // out-of-band ink assertion would fail on the fix as well as on main and prove
    // nothing. Byte-identity is the claim at these widths and it rests on the two
    // utility assertions above.
    expect(m.breaks, `mid-word break(s) at ${width}px: ${m.breaks.join(', ')}`).toHaveLength(0);
  });
}

test('/priser cost-driver rows wrap and shrink only inside the band, scope cards untouched', async ({ page }) => {
  // The fix is two utilities on one row shape. If they were applied to every
  // `.card-heading`, the two scope cards would restack for no reason; this case
  // pins the scope so a later edit cannot quietly widen it.
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/priser');
  await expect(page.locator(COST_ROW_HEADINGS).first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);

  const scope = await measureScopeCards(page);
  expect(scope.row, 'the cost-driver row count changed').toBe(8);
  expect(scope.others, 'expected the two scope-card headings to exist').toBe(2);
  expect(scope.othersWrap, `scope-card headings were restyled: ${scope.labels.join(' | ')}`).toEqual([
    'nowrap',
    'nowrap',
  ]);
  // These read 0px on main as well; asserting it keeps the body honest about what
  // min-w-0 is and is not doing on the scope cards.
  expect(scope.othersMinWidth, 'scope-card min-width changed, which the fix does not need').toEqual([
    '0px',
    '0px',
  ]);

  const m = await measureCostRow(page);
  expect(m.measured).toBe(8);
  for (const h of m.hashes) {
    expect(h.minWidth, 'the cost-driver heading is not shrinking').toBe('0px');
    expect(h.flexWrap, 'the cost-driver row cannot wrap').toBe('wrap');
  }
});

// A word that genuinely fits the card whole and is still long enough to be the
// binding case: 219.59px against the card's content box at these widths, so it is
// never split and any break means the row failed to give it a full-width line.
//
// The three long compounds used to argue for a wider band cannot serve here.
// «Tilgjengelighetserklæringen» (326.31px), «Saksbehandlingsplattform» (304.84px)
// and «sammenstillingsarkitektur» (301.14px) are each WIDER than the card's entire
// content box at every width in this band (222px at 320 rising to 277px at 375).
// They can never fit on one line, so they always split, and any negative ink
// reading for them describes the broken first segment rather than a word that fit.
// «Vedlikeholdsavtale» fits, which is what makes it a clean test of containment.
//
// INJECTED INK PAST THE CONTENT BOX, and this is also the honest cost of stopping
// at 386 rather than 387:
//   width          385       386       387       388
//   main         +4.59     +3.59     +2.59     +1.59
//   max-[353px]  +4.59     +3.59     +2.59     +1.59   (inactive above 353)
//   max-[386px] -67.41    -68.41     +2.59     +1.59   (THIS band)
//   max-[387px] -67.41    -68.41    -69.41     +1.59
// At 387 the 386 band reads exactly what main reads (+2.59) because the band is
// inactive there — the two are literally identical at that width. 387px is the
// only width where a 387 band does anything, and it buys a containment that costs
// 255px of page height, which is why it was not taken. The residual +2.59 is
// 2.59px into a 32px padding, ~29px short of the border, crossing nothing.
//
// The guard is bounded by the band and the page is NOT future-proof: at 388 the
// word escapes on every build here, including this one (+1.59). These cases prove
// the band's edges are where the code says they are; they do not promise
// containment for an arbitrarily long future product name.
const DRIFT_WORD = 'Vedlikeholdsavtale';

for (const width of [385, 386]) {
  test(`/priser cost-driver row keeps a longer word inside the card at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/priser');
    await expect(page.locator(COST_ROW_HEADINGS).first()).toBeVisible();
    await page.addStyleTag({
      content:
        'h1,h2,h3,h4,h5,h6,.heading{hyphens:none !important;-webkit-hyphens:none !important;}',
    });
    await page.evaluate(() => document.fonts.ready);

    await page.evaluate(
      ({ selector, word }) => {
        const heading = document.querySelector(selector);
        if (!heading) throw new Error('cost-driver heading not found');
        const textNode = Array.from(heading.childNodes).find(
          (n) => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 0,
        );
        if (!textNode) throw new Error('cost-driver heading has no text node to inject into');
        textNode.textContent = word;
      },
      { selector: COST_ROW_HEADINGS, word: DRIFT_WORD },
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);

    const m = await measureCostRow(page);
    expect(m.measured).toBeGreaterThan(0);
    expect(m.hyphensForced).toBe(true);
    expect(
      m.worstContent,
      `with «${DRIFT_WORD}» injected the heading paints ${m.worstContent}px past the card content box at ${width}px, so this band fails open`,
    ).toBeLessThanOrEqual(1);
    expect(
      m.worstBorder,
      `with «${DRIFT_WORD}» injected the heading paints ${m.worstBorder}px past the card border at ${width}px`,
    ).toBeLessThanOrEqual(1);
    // This word fits the content box whole, so any break means the row failed to
    // give it a full-width line when it needed one.
    expect(
      m.breaks,
      `«${DRIFT_WORD}» was split at ${width}px even though it fits whole: ${m.breaks.join(', ')}`,
    ).toHaveLength(0);
  });
}
