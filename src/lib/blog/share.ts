/**
 * Share targets for an article. Shared by ShareLinks (SPA) and the prerender
 * so first HTML and the hydrated row point at the same places.
 */
export const SHARE_LABEL = "Del artikkelen";

export interface ShareTarget {
  label: string;
  href: string;
}

export function shareTargets(url: string, title: string): ShareTarget[] {
  return [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "E-post",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The share row a crawler reads. Clipboard copy needs JavaScript, so it is
 * omitted here and added by ShareLinks after hydrate.
 */
export function shareRowHtml(url: string, title: string, label = SHARE_LABEL): string {
  const links = shareTargets(url, title)
    .map(
      (target) =>
        `<a href="${escapeHtml(target.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(target.label)}</a>`,
    )
    .join("");
  return `<aside aria-label="${escapeHtml(label)}"><p>${escapeHtml(label)}</p>${links}</aside>`;
}
