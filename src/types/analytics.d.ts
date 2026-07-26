/**
 * Ambient declarations for third-party analytics globals.
 *
 * These are injected by <script> tags rather than imported, so TypeScript has
 * no way to know they exist. Every call site in useAnalytics.ts guards with
 * `typeof x !== 'undefined'` because none of them is guaranteed to be loaded —
 * the declarations describe the shape, not a promise that the tag is present.
 */

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

/** Google Analytics 4 — https://developers.google.com/tag-platform/gtagjs/reference */
declare function gtag(command: 'event', action: string, params?: AnalyticsProps): void;
declare function gtag(command: 'set' | 'config' | 'consent', ...args: unknown[]): void;
declare function gtag(command: 'js', date: Date): void;

/** Microsoft Clarity — https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api */
declare function clarity(
  command: 'event' | 'set' | 'identify' | 'consent' | 'upgrade',
  ...args: unknown[]
): void;

/** Plausible — https://plausible.io/docs/custom-event-goals */
declare function plausible(
  event: string,
  options?: { props?: AnalyticsProps; callback?: () => void }
): void;
