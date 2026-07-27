import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface ShareLinksProps {
  url: string;
  title: string;
  label?: string;
}

const CHIP =
  'inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * Share targets for an article.
 *
 * LinkedIn first, deliberately: this is B2B writing for public-sector and
 * enterprise readers, and that is where they pass links to each other.
 *
 * "Kopier lenke" is included because it is what people actually use — pasting
 * into Teams or an email beats any share dialog. It degrades to nothing
 * visible-but-broken when the Clipboard API is unavailable (non-secure origin,
 * older browser): the button reports failure rather than silently doing nothing.
 */
export default function ShareLinks({ url, title, label = 'Del artikkelen' }: ShareLinksProps) {
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle');

  const targets = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'X',
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: 'E-post',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied('done');
    } catch {
      setCopied('failed');
    }
    window.setTimeout(() => setCopied('idle'), 2500);
  };

  return (
    <div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{label}</p>
      <div className="flex flex-wrap gap-2">
        {targets.map((target) => (
          <a
            key={target.label}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            className={CHIP}
          >
            {target.label}
            <span className="sr-only"> (åpnes i ny fane)</span>
          </a>
        ))}
        <button type="button" onClick={copy} className={CHIP}>
          {copied === 'done' ? (
            <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied === 'done' ? 'Kopiert' : copied === 'failed' ? 'Kopiering feilet' : 'Kopier lenke'}
        </button>
      </div>
      {/* Announced to screen readers, which otherwise get no signal that the
          button did anything — the label change alone is not announced. */}
      <p aria-live="polite" className="sr-only">
        {copied === 'done' ? 'Lenken er kopiert' : copied === 'failed' ? 'Kunne ikke kopiere lenken' : ''}
      </p>
    </div>
  );
}
