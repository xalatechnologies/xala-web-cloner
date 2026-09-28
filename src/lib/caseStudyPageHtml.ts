/**
 * The no-JS /caser/:slug body.
 *
 * Same textual content the SPA renders from case study data + no.json labels.
 */
import { caseStudyBySlug } from "@/data/case-studies";
import { localizeCaseStudy } from "@/data/case-studies/localized";
import no from "@/i18n/locales/no.json";
import { escapeHtml } from "@/lib/escapeHtml";
import { PRERENDER_BACK_NAV_ARIA_LABEL } from "@/lib/prerenderLabels";
import { richInlineHtml, richParagraphsHtml } from "@/lib/richInlineHtml";
import type { CaseStudy } from "@/types/caseStudy";

const labels = no.caseStudy;

function listItems(items: string[]): string {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function metaRow(label: string, value: string): string {
  return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function teamComposition(cs: CaseStudy): string | undefined {
  if (!cs.team?.composition.length) return undefined;
  return cs.team.composition
    .map((member) => {
      if (member.count <= 1) return member.role;
      return `${member.count} ${member.role}${member.role.endsWith("s") ? "" : "s"}`;
    })
    .join(", ");
}

export function caseStudyPageHtmlFromStudy(cs: CaseStudy): string {
  const durationLabel = cs.duration ?? cs.deliveryPeriod;
  const teamCompositionLabel = teamComposition(cs);
  const teamSizeLabel = cs.estimatedTeamSize ?? (cs.team ? String(cs.team.size) : undefined);
  const challengePreview = cs.challenge.slice(0, 3);

  const metaRows = [
    metaRow(labels.meta.client, cs.client),
    cs.sector ? metaRow(labels.meta.sector, cs.sector) : "",
    metaRow(labels.meta.industry, cs.industry),
    cs.deliveryModel ? metaRow(labels.meta.deliveryModel, cs.deliveryModel) : "",
    cs.partnerModel ? metaRow(labels.meta.partnerModel, cs.partnerModel) : "",
    durationLabel ? metaRow(labels.meta.duration, durationLabel) : "",
    metaRow(labels.meta.role, cs.role.join(", ")),
    teamCompositionLabel ? metaRow(labels.meta.teamComposition, teamCompositionLabel) : "",
    teamSizeLabel ? metaRow(labels.meta.teamSize, teamSizeLabel) : "",
    cs.status ? metaRow(labels.meta.status, cs.status) : "",
    cs.budget ? metaRow(labels.meta.budget, cs.budget) : "",
  ]
    .filter(Boolean)
    .join("\n");

  const kortSvar = cs.kortSvar
    ? `<section id="kort-svar">
<h2>${escapeHtml(labels.sections.kortSvar.heading)}</h2>
${richParagraphsHtml(cs.kortSvar)}
</section>`
    : "";

  const scope =
    cs.scope && cs.scope.length > 0
      ? `<div><p>${escapeHtml(labels.meta.scope)}</p><ul>${listItems(cs.scope)}</ul></div>`
      : "";

  const coreTech =
    cs.coreTechnologies && cs.coreTechnologies.length > 0
      ? `<div><p>${escapeHtml(labels.meta.coreTechnologies)}</p><ul>${listItems(cs.coreTechnologies)}</ul></div>`
      : "";

  const objectives =
    cs.objectives.length > 0
      ? `<section id="objectives">
<h2>${escapeHtml(labels.sections.objectives.heading)}</h2>
<ul>${listItems(cs.objectives)}</ul>
</section>`
      : "";

  const solutionUsers =
    cs.solution.users && cs.solution.users.length > 0
      ? `<div><h3>${escapeHtml(labels.sections.solution.users)}</h3><ul>${listItems(cs.solution.users)}</ul></div>`
      : "";

  const solution = `<section id="solution">
<h2>${escapeHtml(labels.sections.solution.heading)}</h2>
<p>${escapeHtml(cs.solution.overview)}</p>
<div>
<h3>${escapeHtml(labels.sections.solution.modules)}</h3>
<ul>${listItems(cs.solution.modules)}</ul>
${solutionUsers}
</div>
</section>`;

  const archLayers = cs.architectureDiagram.layers ?? [];
  const archLayerHtml = archLayers
    .map(
      (layer) =>
        `<div><h3>${escapeHtml(layer.name)}</h3><ul>${listItems(layer.components)}</ul></div>`,
    )
    .join("\n");

  const archEntries = [
    { label: labels.archLayers.presentation, items: cs.architecture.presentation },
    { label: labels.archLayers.services, items: cs.architecture.services },
    { label: labels.archLayers.integrations, items: cs.architecture.integrations },
    { label: labels.archLayers.data, items: cs.architecture.data },
    { label: labels.archLayers.infrastructure, items: cs.architecture.infrastructure },
    { label: labels.archLayers.security, items: cs.architecture.security },
  ].filter((entry) => entry.items && entry.items.length > 0);

  const archDetailHtml = archEntries
    .map((entry) => `<div><h3>${escapeHtml(entry.label)}</h3><ul>${listItems(entry.items!)}</ul></div>`)
    .join("\n");

  const architecture = `<section id="architecture">
<h2>${escapeHtml(cs.architectureDiagram.title)}</h2>
${archLayerHtml}
${archDetailHtml}
</section>`;

  const techEntries = [
    { label: labels.techCategories.frontend, items: cs.technologies.frontend },
    { label: labels.techCategories.backend, items: cs.technologies.backend },
    { label: labels.techCategories.databases, items: cs.technologies.databases },
    { label: labels.techCategories.cloud, items: cs.technologies.cloud },
    { label: labels.techCategories.identity, items: cs.technologies.identity },
    { label: labels.techCategories.integrations, items: cs.technologies.integrations },
    { label: labels.techCategories.devops, items: cs.technologies.devops },
  ].filter((entry) => entry.items && entry.items.length > 0);

  const techHtml = techEntries
    .map((entry) => `<div><h3>${escapeHtml(entry.label)}</h3><ul>${listItems(entry.items!)}</ul></div>`)
    .join("\n");

  const tech = techEntries.length
    ? `<section id="tech">
<h2>${escapeHtml(labels.sections.tech.heading)}</h2>
${techHtml}
</section>`
    : "";

  const integrations =
    cs.integrationHighlights && cs.integrationHighlights.length > 0
      ? `<section id="integrations">
<h2>${escapeHtml(labels.sections.integrations.heading)}</h2>
<ul>${cs.integrationHighlights
  .map((item) => {
    const [system, desc] = item.split(" — ");
    const body = desc
      ? `<strong>${escapeHtml(system)}</strong><p>${escapeHtml(desc)}</p>`
      : `<strong>${escapeHtml(system)}</strong>`;
    return `<li>${body}</li>`;
  })
  .join("\n")}</ul>
</section>`
      : "";

  const timeline = cs.timeline.length
    ? `<section id="timeline">
<h2>${escapeHtml(labels.sections.timeline.heading)}</h2>
<ul>${cs.timeline
  .map(
    (phase) =>
      `<li><h3>${escapeHtml(phase.phase)}</h3><p>${escapeHtml(phase.description)}</p></li>`,
  )
  .join("\n")}</ul>
</section>`
    : "";

  const outcomes = cs.outcomes.length
    ? `<section id="outcomes">
<h2>${escapeHtml(labels.sections.outcomes.heading)}</h2>
<ul>${listItems(cs.outcomes)}</ul>
</section>`
    : "";

  const capabilities = cs.capabilities.length
    ? `<section id="capabilities">
<h2>${escapeHtml(labels.sections.capabilities.heading)}</h2>
<ul>${listItems(cs.capabilities)}</ul>
</section>`
    : "";

  const faq =
    cs.faq && cs.faq.length > 0
      ? `<section id="faq" aria-labelledby="faq-heading">
<h2 id="faq-heading">${escapeHtml(labels.sections.faq.heading)}</h2>
<dl>${cs.faq
  .map(
    (item) =>
      `<div><dt>${escapeHtml(item.question)}</dt><dd>${richInlineHtml(item.answer)}</dd></div>`,
  )
  .join("\n")}</dl>
${cs.videre ? `<div>${richParagraphsHtml(cs.videre)}</div>` : ""}
</section>`
      : "";

  const cta = `<section aria-labelledby="case-cta">
<h2 id="case-cta">${escapeHtml(labels.cta.heading)}</h2>
<p>${escapeHtml(labels.cta.description)}</p>
<p><a href="/kontakt">${escapeHtml(labels.cta.contact)}</a> · <a href="/caser">${escapeHtml(labels.cta.allCases)}</a></p>
</section>`;

  return `<div class="min-h-screen flex flex-col"><main id="main">
<nav aria-label="${escapeHtml(PRERENDER_BACK_NAV_ARIA_LABEL)}"><a href="/caser">${escapeHtml(labels.backToAll)}</a> / <span>${escapeHtml(cs.title)}</span></nav>
<header>
<p>${escapeHtml(cs.industry)}</p>
${cs.deliveryPeriod ? `<p>${escapeHtml(cs.deliveryPeriod)}</p>` : ""}
<h1>${escapeHtml(cs.title)}</h1>
${kortSvar}
<p>${escapeHtml(cs.subtitle)}</p>
<ul>${cs.role.map((role) => `<li>${escapeHtml(role)}</li>`).join("")}</ul>
</header>
<section id="overview">
<h2>${escapeHtml(labels.sections.overview.heading)}</h2>
<p>${escapeHtml(cs.summary)}</p>
</section>
<section id="challenge">
<h2>${escapeHtml(labels.sections.challenge.heading)}</h2>
<ol>${challengePreview.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
</section>
${scope}${coreTech}
<section aria-labelledby="project-details">
<p id="project-details">${escapeHtml(labels.projectDetails)}</p>
<dl>${metaRows}</dl>
</section>
${objectives}
${solution}
${architecture}
${tech}
${integrations}
${timeline}
${outcomes}
${capabilities}
${faq}
${cta}
</main></div>`;
}

export function caseStudyPageHtml(slug: string): string {
  const study = caseStudyBySlug(slug);
  if (!study) throw new Error(`caseStudyPageHtml: unknown slug "${slug}"`);
  return caseStudyPageHtmlFromStudy(localizeCaseStudy(study, "no"));
}
