import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:5199';
const POST = '/blogg/tilskuddsportal-som-faktisk-brukes';

const browser = await chromium.launch();
const errors = [];
const results = {};

async function page(path, width = 1440, height = 900) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const p = await ctx.newPage();
  p.on('console', (m) => m.type() === 'error' && errors.push(`${path}: ${m.text()}`));
  p.on('pageerror', (e) => errors.push(`${path}: ${e.message}`));
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  return { p, ctx };
}

// ---- blog index ----
{
  const { p, ctx } = await page('/blogg');
  results.index = await p.evaluate(() => {
    const rows = [...document.querySelectorAll('main ol > li')];
    return {
      h1: document.querySelectorAll('h1').length,
      h1Text: document.querySelector('h1')?.textContent?.trim(),
      rows: rows.length,
      hasSearch: !!document.querySelector('#blogg-sok'),
      tagButtons: document.querySelectorAll('[aria-label="Filtrer på tema"] button').length,
      count: document.querySelector('[aria-live="polite"]')?.textContent?.trim(),
      firstTitle: rows[0]?.querySelector('h3')?.textContent?.trim(),
      readingTimes: rows.map((r) => r.textContent.match(/(\d+) min lesetid/)?.[1]).filter(Boolean),
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  // search actually filters
  await p.fill('#blogg-sok', 'bevilling');
  await p.waitForTimeout(250);
  results.search = await p.evaluate(() => ({
    url: location.search,
    rows: document.querySelectorAll('main ol > li').length,
    title: document.querySelector('main ol > li h3')?.textContent?.trim(),
  }));

  // no-match empty state
  await p.fill('#blogg-sok', 'zzzzqqq');
  await p.waitForTimeout(250);
  results.empty = await p.evaluate(() => document.body.innerText.includes('Ingen treff.'));

  await ctx.close();
}

// ---- blog index, mobile ----
{
  const { p, ctx } = await page('/blogg', 375, 812);
  results.indexMobile = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  await ctx.close();
}

// ---- post page ----
{
  const { p, ctx } = await page(POST);
  results.post = await p.evaluate(() => {
    const tocs = [...document.querySelectorAll('nav[aria-label="I denne artikkelen"]')];
      const visibleTocs = tocs.filter((n) => n.getClientRects().length > 0);
      const toc = [...(visibleTocs[0]?.querySelectorAll('a') ?? [])];
    const ids = new Set([...document.querySelectorAll('h2[id], h3[id]')].map((h) => h.id));
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent)
    );
    const faq = ld.find((x) => x['@type'] === 'FAQPage');
    return {
      h1: document.querySelectorAll('h1').length,
      main: document.querySelectorAll('main').length,
      tocLinks: toc.length,
      tocCopiesInDom: tocs.length,
      tocCopiesVisible: visibleTocs.length,
      deadTocLinks: toc
        .map((a) => a.getAttribute('href').slice(1))
        .filter((id) => !ids.has(id)),
      faqQuestions: faq ? faq.mainEntity.length : 0,
      faqFirst: faq?.mainEntity?.[0]?.name,
      faqAnswersNonEmpty: faq ? faq.mainEntity.every((q) => q.acceptedAnswer.text.length > 60) : false,
      schemas: ld.map((x) => x['@type'] ?? (x['@graph'] ? '@graph' : '?')),
      relatedServices: [...document.querySelectorAll('aside[aria-labelledby="relevant-heading"] a')].map(
        (a) => a.getAttribute('href')
      ),
      share: [...document.querySelectorAll('main aside[aria-label="Artikkelinfo"] a[target="_blank"]')].length,
      relatedPosts: document.querySelectorAll('main aside[aria-label="Artikkelinfo"] li a').length,
      canonical: document.querySelector('link[rel=canonical]')?.href,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  // TOC scroll-spy: scroll to the third heading, expect it to become current.
  // Scoped to the *visible* TOC: the sidebar copy and the in-article mobile
  // copy are both in the DOM, and only one is displayed at a given width.
  if (results.post.tocLinks >= 3) {
    await p.evaluate(() => {
      const h = document.querySelectorAll('h2[id]')[2];
      h?.scrollIntoView();
      window.scrollBy(0, -100);
    });
    await p.waitForTimeout(500);
    results.scrollSpy = await p.evaluate(() => {
      const active = [...document.querySelectorAll('nav[aria-label="I denne artikkelen"] a[aria-current]')]
        .filter((a) => a.getClientRects().length > 0);
      return active.length ? active[0].textContent.trim() : null;
    });
  }

  await ctx.close();
}

// ---- post page, mobile ----
{
  const { p, ctx } = await page(POST, 375, 812);
  results.postMobile = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    tocVisible: !!document.querySelector('nav[aria-label="I denne artikkelen"]'),
  }));
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify({ results, errors }, null, 2));
