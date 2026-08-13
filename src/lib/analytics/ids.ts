/**
 * The measurement ids for xala.no, in one place.
 *
 * They were inline in App.tsx, which was fine while only the tag loader read
 * them. Reporting a conversion needs the Google Ads id too, from a module that
 * App.tsx must not import back — hence a leaf with no imports of its own.
 *
 * These are public by design: every one of them ships in the browser bundle and
 * is visible in view-source on any site that uses them. They are identifiers,
 * not secrets, which is why they are committed rather than read from env. The
 * conversion *labels* are env-configured, not because they are secret either,
 * but because they do not exist until someone creates the conversion actions in
 * the Ads account.
 */

/** Google Analytics 4. */
export const GOOGLE_ANALYTICS_ID = 'G-NFGNKJDHHW';

/** Microsoft Clarity — session replay and heatmaps. */
export const MICROSOFT_CLARITY_ID = 'q15abxku18';

/** Plausible — cookieless traffic counting. */
export const PLAUSIBLE_DOMAIN = 'xala.no';

/**
 * Google Ads. The `AW-` prefix is the account-level tag: it attributes
 * conversions to ad clicks and builds remarketing audiences. On its own it
 * records no conversions — each conversion action has a label, and the label
 * is what `trackConversion` sends. See conversions.ts.
 */
export const GOOGLE_ADS_ID = 'AW-18385967405';

/**
 * Conversion labels, one per action created in the Ads account.
 *
 * Committed rather than env-configured, and that is a correction rather than a
 * preference. The deploy workflow runs `pnpm build` on a GitHub runner with no
 * env file, and `VITE_` values are baked in at build time — so a label that
 * lives only in `.env.local` reaches a local build and never production. It
 * would have looked exactly like a working configuration and recorded nothing.
 *
 * They are public in the same way the tag id is: both ship in the bundle and
 * are readable with view-source on any site running them. `VITE_ADS_LABEL_*`
 * still overrides, for testing against a different action.
 *
 * `contact` is the "Skjema for potensielle salg sendt inn" action. Careful with
 * the second character — it is a lowercase L, not a one.
 */
export const ADS_LABEL_CONTACT = '1l7dCKGNk-EcEK2yjr9E';

/** No conversion action exists for job applications yet. */
export const ADS_LABEL_APPLICATION = '';
