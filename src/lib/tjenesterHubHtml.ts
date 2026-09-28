/**
 * The no-JS /tjenester hub body.
 *
 * Same textual content the SPA renders from no.json and tjenester-hub-content.
 * The prerender composes this inside staticRouteHtml (H1, lede, Hovedmeny, styles).
 */
import {
  TJENESTER_HUB_CTA,
  TJENESTER_HUB_LEAD,
  TJENESTER_HUB_NEXT_STEPS,
  TJENESTER_HUB_SECTIONS,
} from "@/data/tjenester-hub-content";
import no from "@/i18n/locales/no.json";
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

/** Hub prose below the static shell header, nav and lede. */
export function tjenesterHubBodyHtml(): string {
  return `<p class="lead">${escapeHtml(TJENESTER_HUB_LEAD)}</p>
${sectionsHtml()}
${nextStepsHtml()}`;
}

/** Full hub body when not wrapped in staticRouteHtml (tests). */
export function tjenesterHubHtml(): string {
  return tjenesterHubBodyHtml();
}

/** Lede under the H1 — what verify-dist compares to the React page. */
export function tjenesterHubLede(): string {
  return no.servicesPage.description;
}
