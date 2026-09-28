/**
 * The no-JS /produkter/:slug body.
 *
 * Same textual content the SPA renders from products.json, product-details.json
 * and no.json labels.
 */
import { caserEntries } from "@/data/caser-page-entries";
import { localizedCardExcerpt } from "@/data/case-studies/localized";
import productsData from "@/data/products.json";
import detailsData from "@/data/product-details.json";
import servicePages from "@/data/service-pages.json";
import no from "@/i18n/locales/no.json";
import { findPost } from "@/lib/blog/posts";
import { BLOG_PATH } from "@/lib/blog/seo";
import type { BlogPost } from "@/lib/blog/types";
import { productCopy, type ProductDetails } from "@/lib/product-details";
import { escapeHtml } from "@/lib/richInlineHtml";

export interface ProductPageHtmlOptions {
  posts: readonly BlogPost[];
}

const labels = {
  back: no.productPage.back,
  features: no.productPage.features,
  visit: no.productPage.visit,
  faqTitle: no.servicePage.faqTitle,
  relatedService: no.productPage.relatedService,
  relatedServiceBody: no.productPage.relatedServiceBody,
  casesTitle: no.servicePage.casesTitle,
  readMore: no.servicePage.readMore,
  caseReadMore: no.caseStudy.readMore,
  ctaTitle: no.productPage.ctaTitle,
  ctaDescription: no.productPage.ctaDescription,
  ctaContact: no.productPage.ctaContact,
  closingBefore: no.productPage.closingBefore,
  closingLink: no.productPage.closingLink,
  closingAfter: no.productPage.closingAfter,
};

export function productPageHtml(slug: string, options: ProductPageHtmlOptions): string {
  const product = productsData.no.find((item) => item.slug === slug);
  const details = (detailsData as Record<string, ProductDetails>)[product?.id ?? ""];
  if (!product || !details) throw new Error(`productPageHtml: unknown slug "${slug}"`);

  const copy = productCopy(details, "no");
  const features = copy.features?.length ? copy.features : product.features;
  const isLive = product.status !== "coming-soon" && Boolean(product.url);
  const servicePage = details.serviceSlug
    ? (servicePages as Record<string, { slug: string; no: { title: string } }>)[details.serviceSlug]
    : undefined;
  const serviceTitle = servicePage?.no.title;

  const whatBlock = copy.what
    ? `<div><h2>${escapeHtml(copy.whatHeading ?? "")}</h2><p>${escapeHtml(copy.what)}</p></div>`
    : "";
  const doesBlock = copy.does
    ? `<div><h2>${escapeHtml(copy.doesHeading ?? "")}</h2><p>${escapeHtml(copy.does)}</p></div>`
    : "";
  const doesNotBlock = copy.doesNot
    ? `<div><h2>${escapeHtml(copy.doesNotHeading ?? "")}</h2><p>${escapeHtml(copy.doesNot)}</p></div>`
    : "";
  const whatSection =
    whatBlock || doesBlock || doesNotBlock
      ? `<section>${whatBlock}${doesBlock}${doesNotBlock}</section>`
      : "";

  const sections = (copy.sections ?? [])
    .map(
      (block) =>
        `<section><h2>${escapeHtml(block.heading)}</h2><p>${escapeHtml(block.body)}</p></section>`,
    )
    .join("\n");

  const capabilities = copy.capabilities?.length
    ? `<section aria-labelledby="capability-heading">
<h2 id="capability-heading">${escapeHtml(copy.capabilityHeading ?? "")}</h2>
<ul>${copy.capabilities
  .map(
    (capability) =>
      `<li><h3>${escapeHtml(capability.title)}</h3><p>${escapeHtml(capability.body)}</p></li>`,
  )
  .join("\n")}</ul>
</section>`
    : "";

  const featuresSection = features?.length
    ? `<section aria-labelledby="features-heading">
<h2 id="features-heading">${escapeHtml(labels.features)}</h2>
<ul>${features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
</section>`
    : "";

  const visitLink =
    isLive && product.url
      ? `<p><a href="${escapeHtml(product.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(labels.visit)}</a></p>`
      : "";

  const relatedService =
    details.serviceSlug && serviceTitle
      ? `<section aria-labelledby="related-service-heading">
<h2 id="related-service-heading">${escapeHtml(labels.relatedService)}</h2>
<p><a href="/tjenester/${escapeHtml(details.serviceSlug)}">${escapeHtml(serviceTitle)}</a></p>
<p>${escapeHtml(labels.relatedServiceBody)}</p>
</section>`
      : "";

  const cases = (details.caseSlugs ?? [])
    .map((caseSlug) => caserEntries.find((entry) => entry.slug === caseSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const casesSection =
    cases.length > 0
      ? `<section aria-labelledby="product-cases-heading">
<h2 id="product-cases-heading">${escapeHtml(labels.casesTitle)}</h2>
<ul>${cases
  .map((entry) => {
    const excerpt = localizedCardExcerpt(entry.slug, "no") ?? entry.description;
    return `<li><a href="/caser/${escapeHtml(entry.slug ?? entry.id)}"><h3>${escapeHtml(entry.title)}</h3></a><p>${escapeHtml(excerpt)}</p><span>${escapeHtml(labels.caseReadMore)}</span></li>`;
  })
  .join("\n")}</ul>
</section>`
      : "";

  const related = (details.postSlugs ?? [])
    .map((postSlug) => findPost([...options.posts], postSlug))
    .filter((post): post is BlogPost => Boolean(post));

  const relatedPosts =
    related.length > 0
      ? `<div><p>${escapeHtml(labels.readMore)}</p><ul>${related
          .map(
            (post) =>
              `<li><a href="${BLOG_PATH}/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a></li>`,
          )
          .join("")}</ul></div>`
      : "";

  const faq =
    copy.faq && copy.faq.length > 0
      ? `<section aria-labelledby="faq-heading">
<h2 id="faq-heading">${escapeHtml(labels.faqTitle)}</h2>
<dl>${copy.faq
  .map(
    (item) =>
      `<div><dt>${escapeHtml(item.question)}</dt><dd>${escapeHtml(item.answer)}</dd></div>`,
  )
  .join("\n")}</dl>
</section>`
      : "";

  return `<div class="min-h-screen flex flex-col"><main id="main">
<nav aria-label="Tilbake"><a href="/produkter">${escapeHtml(labels.back)}</a></nav>
<header>
<h1>${escapeHtml(product.title)}<span>${escapeHtml(copy.tagline)}</span></h1>
<p>${escapeHtml(copy.intro)}</p>
</header>
${whatSection}
${sections}
${capabilities}
${featuresSection}
${visitLink}
${relatedService}
${casesSection}
${relatedPosts}
${faq}
<section aria-labelledby="produkt-cta">
<h2 id="produkt-cta">${escapeHtml(labels.ctaTitle)}</h2>
<p>${escapeHtml(labels.ctaDescription)}</p>
<p><a href="/kontakt">${escapeHtml(labels.ctaContact)}</a> · <a href="/produkter">${escapeHtml(labels.back)}</a></p>
<p>${escapeHtml(labels.closingBefore)}<a href="/kontakt">${escapeHtml(labels.closingLink)}</a>${escapeHtml(labels.closingAfter)}</p>
</section>
</main></div>`;
}
