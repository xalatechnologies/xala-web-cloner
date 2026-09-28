/**
 * The no-JS /tjenester/:slug body.
 *
 * Same textual content the SPA renders from service-pages.json. The prerender
 * writes this into #root so crawlers and the first paint see the H1, intro,
 * sections and FAQ — not an empty shell that only fills after React runs.
 */
import servicePages from "@/data/service-pages.json";
import { caserEntries } from "@/data/caser-page-entries";
import { localizedCardExcerpt } from "@/data/case-studies/localized";
import { findPost } from "@/lib/blog/posts";
import { BLOG_PATH } from "@/lib/blog/seo";
import type { BlogPost } from "@/lib/blog/types";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

interface Capability {
  title: string;
  body: string;
}
interface FaqItem {
  question: string;
  answer: string;
}
interface LocalisedPage {
  features?: string[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  problemHeading: string;
  problem: string;
  capabilityHeading: string;
  capabilities: Capability[];
  faq: FaqItem[];
}
export interface ServicePage {
  slug: string;
  parent?: string;
  children?: string[];
  caseSlugs: string[];
  postSlugs: string[];
  no: LocalisedPage;
}

export interface ServicePageHtmlOptions {
  posts: readonly BlogPost[];
}

export function servicePageHtml(slug: string, options: ServicePageHtmlOptions): string {
  const pageMap = servicePages as Record<string, ServicePage>;
  const page = pageMap[slug];
  if (!page) throw new Error(`servicePageHtml: unknown slug "${slug}"`);

  const copy = page.no;
  const parent = page.parent ? pageMap[page.parent] : undefined;
  const backHref = parent ? `/tjenester/${parent.slug}` : "/tjenester";
  const backLabel = parent ? pageMap[page.parent!].no.title : "Alle tjenester";

  const children = (page.children ?? [])
    .map((childSlug) => pageMap[childSlug])
    .filter((child): child is ServicePage => Boolean(child));

  const cases = page.caseSlugs
    .map((caseSlug) => caserEntries.find((entry) => entry.slug === caseSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const related = page.postSlugs
    .map((postSlug) => findPost([...options.posts], postSlug))
    .filter((post): post is BlogPost => Boolean(post));

  const capabilities = copy.capabilities
    .map(
      (capability) =>
        `<li><h3>${escapeHtml(capability.title)}</h3><p>${escapeHtml(capability.body)}</p></li>`,
    )
    .join("\n");

  const features =
    copy.features && copy.features.length > 0
      ? `<section aria-labelledby="features-heading">
<h2 id="features-heading">Funksjonalitet</h2>
<ul>${copy.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
</section>`
      : "";

  const childrenSection =
    children.length > 0
      ? `<section aria-labelledby="children-heading">
<h2 id="children-heading">Løsninger vi bygger på denne plattformen</h2>
<ul>${children
  .map(
    (child) =>
      `<li><a href="/tjenester/${escapeHtml(child.slug)}"><h3>${escapeHtml(child.no.title)}</h3></a><p>${escapeHtml(child.no.intro)}</p></li>`,
  )
  .join("")}</ul>
</section>`
      : "";

  const casesSection =
    cases.length > 0
      ? `<section aria-labelledby="cases-heading">
<h2 id="cases-heading">Vi har gjort dette før</h2>
<ul>${cases
  .map((entry) => {
    const excerpt = localizedCardExcerpt(entry.slug, "no") ?? entry.description;
    return `<li><a href="/caser/${escapeHtml(entry.slug ?? entry.id)}"><h3>${escapeHtml(entry.title)}</h3></a><p>${escapeHtml(excerpt)}</p></li>`;
  })
  .join("")}</ul>
</section>`
      : "";

  const faqItems = copy.faq
    .map(
      (item) =>
        `<div><dt>${escapeHtml(item.question)}</dt><dd>${escapeHtml(item.answer)}</dd></div>`,
    )
    .join("\n");

  const relatedPosts =
    related.length > 0
      ? `<div><p>Les mer om dette</p><ul>${related
          .map(
            (post) =>
              `<li><a href="${BLOG_PATH}/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a></li>`,
          )
          .join("")}</ul></div>`
      : "";

  return `<div class="min-h-screen flex flex-col"><main id="main">
<nav aria-label="Tilbake"><a href="${escapeHtml(backHref)}">${escapeHtml(backLabel)}</a></nav>
<header>
<h1 class="page-heading">${escapeHtml(copy.title)}</h1>
<p>${escapeHtml(copy.intro)}</p>
</header>
<section aria-labelledby="problem-heading">
<h2 id="problem-heading">${escapeHtml(copy.problemHeading)}</h2>
<p>${escapeHtml(copy.problem)}</p>
</section>
<section aria-labelledby="capability-heading">
<h2 id="capability-heading">${escapeHtml(copy.capabilityHeading)}</h2>
<ul>${capabilities}</ul>
</section>
${features}
${childrenSection}
${casesSection}
<section aria-labelledby="faq-heading">
<h2 id="faq-heading">Ofte stilte spørsmål</h2>
<dl>${faqItems}</dl>
${relatedPosts}
</section>
<section aria-labelledby="tjeneste-cta">
<h2 id="tjeneste-cta">Står dere i dette nå?</h2>
<p>Fortell oss hva dere har i dag, så sier vi hva vi ville gjort først og hva vi ville ventet med.</p>
<p><a href="/kontakt">Kontakt oss</a> · <a href="/slik-vi-jobber">Slik vi jobber</a></p>
</section>
</main></div>`;
}
