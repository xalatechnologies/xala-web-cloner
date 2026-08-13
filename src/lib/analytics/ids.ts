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
