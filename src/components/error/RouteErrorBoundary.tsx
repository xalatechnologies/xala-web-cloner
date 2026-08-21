import { Component, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Keeps a failed route from taking the document down with it.
 *
 * On 21 Aug 2026 a reader in Sandefjord landed on xala.no, read the page, and
 * followed a contextual link. `assets/CaserPage-BJrlDSWZ.js` answered 404, the
 * rejected dynamic import came back out of `lazy()` during render, and with no
 * boundary above `<Routes>` React re-threw it at the top level: an uncaught
 * `TypeError: Failed to fetch dynamically imported module` and an unmounted
 * tree. The run's evidence records a blank page — word count zero, no heading —
 * from that click onward, and the journey's no-page-errors check failed on the
 * exception.
 *
 * A code-split route can always fail this way: the chunk names live in the
 * index.html the tab is holding, and a deploy replaces them. So the boundary
 * does two things. A chunk that is merely stale is recovered by reloading the
 * document once, which revalidates index.html and picks up the current names —
 * the visitor gets the page they clicked. Anything else renders a real page
 * with a way onward instead of an empty <div id="root">.
 *
 * Either way the error stops here rather than reaching the window.
 */

/** Set once per tab, so a chunk that is genuinely gone cannot loop the reload. */
const RELOAD_KEY = 'xala:chunk-reload';

/**
 * A dynamic import that could not be fetched, in each engine's wording.
 * Deliberately narrow: only these reload, everything else shows the fallback.
 */
const MISSING_CHUNK = [
  'failed to fetch dynamically imported module',
  'error loading dynamically imported module',
  'importing a module script failed',
  'unable to preload css',
];

function isMissingChunk(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '');
  const lower = message.toLowerCase();
  return MISSING_CHUNK.some((phrase) => lower.includes(phrase));
}

/**
 * sessionStorage throws outright when storage is blocked, and this runs inside
 * componentDidCatch — a throw here would be the uncaught exception all over
 * again. Treat an unreadable store as "already reloaded" and show the fallback.
 */
function claimReload(): boolean {
  try {
    if (window.sessionStorage.getItem(RELOAD_KEY)) return false;
    window.sessionStorage.setItem(RELOAD_KEY, '1');
    return true;
  } catch {
    return false;
  }
}

/**
 * Plain <a>, not <Link>: the boundary stays failed for the rest of its life, so
 * a client-side navigation out of here would keep rendering this fallback. A
 * document load also refetches index.html, which is the thing that was stale.
 */
const LINK_CLASS =
  'inline-flex min-h-12 items-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function RouteErrorFallback() {
  const { t } = useTranslation();

  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-background px-4 py-32">
      <div className="space-y-8 text-center">
        <h1 className="text-4xl font-semibold text-foreground">{t('error.oops', 'Ops!')}</h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          {t('error.somethingWentWrong', 'Noe gikk galt. Prøv igjen, eller gå til forsiden.')}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3">
          <a href={typeof window === 'undefined' ? '/' : window.location.pathname} className={LINK_CLASS}>
            {t('common.tryAgain', 'Prøv igjen')}
          </a>
          <a href="/" className={LINK_CLASS}>
            {t('common.goHome', 'Til forsiden')}
          </a>
        </nav>
      </div>
    </main>
  );
}

type Props = { children: ReactNode };
type State = { failed: boolean };

export default class RouteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    if (isMissingChunk(error) && claimReload()) window.location.reload();
  }

  render() {
    return this.state.failed ? <RouteErrorFallback /> : this.props.children;
  }
}

export { RELOAD_KEY };
