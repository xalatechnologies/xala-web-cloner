/**
 * The no-JS /tjenester hub body.
 *
 * Same textual content the SPA renders from no.json and tjenester-hub-content.
 */
import {
  TJENESTER_HUB_CTA,
  TJENESTER_HUB_LEAD,
  TJENESTER_HUB_NEXT_STEPS,
  TJENESTER_HUB_SECTIONS,
} from "@/data/tjenester-hub-content";
import no from "@/i18n/locales/no.json";
import { SERVICES_PAGE_HEADING } from "@/lib/staticRouteHeading";
import { escapeHtml, richInlineHtml } from "@/lib/richInlineHtml";

function definitionListHtml(items: { question: string; answer: string }[]): string {
  const rows = items
    .map(
      (item) =>
        `<dt><strong>${escapeHtml(item.question)}</strong></dt><dd>${richInlineHtml(item.answer)}</dd>`,
    )
    .join("\n");
  return `<dl>${rows}</dl>`;
}

function sectionsHtml(): string {
  return TJENESTER_HUB_SECTIONS
    .map((section) => {
      const paragraphs = (section.paragraphs ?? [])
        .map((paragraph) => `<p>${richInlineHtml(paragraph)}</p>`)
        .join("\n");
      const list = section.definitionList ? definitionListHtml(section.definitionList) : "";
      return `<h2>${escapeHtml(section.heading)}</h2>\n${paragraphs}${list}`;
    })
    .join("\n");
}

const NEXT_STEP_KEYS: Record<string, "process" | "cases" | "tech"> = {
  "/slik-vi-jobber": "process",
  "/caser": "cases",
  "/teknologi": "tech",
};

function nextStepsHtml(): string {
  const cards = TJENESTER_HUB_NEXT_STEPS
    .map((step) => {
      const key = NEXT_STEP_KEYS[step.to];
      const title = no.servicesPage.next[key]?.title ?? step.fallbackTitle;
      const blurb = no.servicesPage.next[key]?.blurb ?? step.fallbackBlurb;
      return `<li><a href="${escapeHtml(step.to)}"><span>${escapeHtml(title)}</span></a><p>${escapeHtml(blurb)}</p></li>`;
    })
    .join("\n");
  return `<section aria-labelledby="tjenester-neste">
<h2 id="tjenester-neste">${escapeHtml(TJENESTER_HUB_CTA.title)}</h2>
<p>${escapeHtml(TJENESTER_HUB_CTA.descriptionBefore)}<a href="${escapeHtml(TJENESTER_HUB_CTA.contactPath)}">${escapeHtml(TJENESTER_HUB_CTA.contactPath)}</a>.</p>
<ul>${cards}</ul>
</section>`;
}

export function tjenesterHubHtml(): string {
  const description = no.servicesPage.description;
  const eyebrow = no.servicesPage.eyebrow;

  return `<div class="min-h-screen flex flex-col"><main id="main">
<header>
<p>${escapeHtml(eyebrow)}</p>
<h1 class="page-heading">${escapeHtml(SERVICES_PAGE_HEADING)}</h1>
<p>${escapeHtml(description)}</p>
</header>
<section>
<p class="lead">${escapeHtml(TJENESTER_HUB_LEAD)}</p>
${sectionsHtml()}
</section>
${nextStepsHtml()}
</main></div>`;
}

/** Lede under the H1 — what verify-dist compares to the React page. */
export function tjenesterHubLede(): string {
  return no.servicesPage.description;
}
