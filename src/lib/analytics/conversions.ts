/**
 * Telling Google Ads that something worth paying for happened.
 *
 * Three rules decide the shape of this file.
 *
 * **Only a confirmed outcome counts.** `submitForm` returns `'posted'` when an
 * endpoint accepted the message and `'mailto'` when it merely handed the text to
 * the visitor's mail client. Only the first is a lead: the second means a mail
 * window opened, which is not the same as a mail being sent, and counting it
 * would teach the Ads account to buy clicks from people who never wrote to us.
 * Call sites pass the outcome and this module decides.
 *
 * **It has to be safe to call when nothing is loaded.** The tags mount only
 * after the visitor accepts cookies, so on most page loads `gtag` does not
 * exist. Every call therefore checks, and a visitor who declined simply
 * produces no event.
 *
 * **A missing label is not an error.** The Ads account has one label per
 * conversion action, and those do not exist until someone creates them. Until
 * the env vars are set the GA4 event still fires — so the funnel is visible in
 * Analytics from day one — and the Ads conversion quietly does not. That is the
 * intended half-configured state, not a bug to guard against.
 */
import { GOOGLE_ADS_ID } from './ids';
import type { SubmitOutcome } from '@/lib/forms/submit';

/** The things on this site worth counting as a conversion. */
export type ConversionName = 'contact' | 'application';

/**
 * GA4 event names. `generate_lead` is one of GA4's recommended events, so it
 * lands in the standard reports rather than needing a custom definition.
 */
const GA_EVENT: Record<ConversionName, string> = {
  contact: 'generate_lead',
  application: 'submit_application',
};

/**
 * Conversion labels from the Ads account, as `AW-18385967405/<label>`.
 * Create the conversion action in Google Ads, copy the label, set the env var,
 * redeploy. No code change.
 */
const LABEL: Record<ConversionName, string | undefined> = {
  contact: import.meta.env.VITE_ADS_LABEL_CONTACT,
  application: import.meta.env.VITE_ADS_LABEL_APPLICATION,
};

function hasGtag(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Report a completed form submission.
 *
 * Returns whether an Ads conversion was sent, which is what the tests assert
 * on — there is no other observable difference between "declined cookies",
 * "no label configured" and "mailto, so not a lead yet".
 */
export function trackConversion(name: ConversionName, outcome: SubmitOutcome): boolean {
  // A mailto handed off is an intent, not a lead. Recorded in GA4 so the drop
  // between "opened the mail client" and "we received something" stays visible,
  // never sent to Ads as a conversion.
  if (outcome !== 'posted') {
    if (hasGtag()) {
      window.gtag('event', `${GA_EVENT[name]}_mailto`);
    }
    return false;
  }

  if (!hasGtag()) return false;

  window.gtag('event', GA_EVENT[name]);

  const label = LABEL[name];
  if (!label) return false;

  window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}` });
  return true;
}
