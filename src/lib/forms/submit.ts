/**
 * Sending a form from a site with no backend of its own.
 *
 * Two paths, and which one runs is a deployment decision rather than a code
 * change:
 *
 *  - If `VITE_FORM_ENDPOINT` is set, the form POSTs JSON there and the visitor
 *    never leaves the page. Any of the usual endpoints work: Formspree,
 *    Web3Forms, Formcarry, or something self-hosted.
 *  - If it is not set, the browser's own mail client carries the message. That
 *    always works and needs no account, but it is visibly not a form
 *    submission: the visitor lands in their mail app and has to press send.
 *
 * **This used to default to mailto, and the reasoning has changed.** The old
 * argument was that a POST endpoint puts enquiry and applicant details through
 * whoever runs it — a processor relationship nobody asked for — while the mail
 * client involves no third party at all.
 *
 * What that argument missed is that mailto has no outcome. `window.open` on a
 * machine with no registered mail handler does nothing, and the form said
 * "sent" regardless, so the enquiry was lost twice over: we never received it
 * and the sender never thought to follow up. It also meant no submission could
 * ever be counted, so Google Ads had no conversion to bid on.
 *
 * The endpoint is now `/api/contact` — **same-origin, on our own VPS**, which
 * keeps the substance of the original privacy argument. It delivers through
 * Resend, which was already this organisation's mail channel, on the EU region.
 * So the message passes through exactly one processor that was already
 * processing it, rather than a new form-handling service. And the mail a
 * visitor's own client would have sent went through their provider anyway.
 *
 * The mailto branch stays as the fallback for any build where no endpoint is
 * configured, and the two outcomes are still reported separately, because
 * "handed to a mail client" and "the server accepted it" are not the same
 * claim.
 */
export type SubmitOutcome = 'posted' | 'mailto';

export interface MailtoFallback {
  to: string;
  subject: string;
  body: string;
}

/**
 * Same-origin by default, so no build-time secret or CI variable is needed and
 * there is no CORS preflight. `VITE_FORM_ENDPOINT` overrides it; setting it to
 * `off` restores the mailto behaviour without editing code.
 */
export const DEFAULT_FORM_ENDPOINT = '/api/contact';

export function formEndpoint(): string | undefined {
  const configured = import.meta.env.VITE_FORM_ENDPOINT;
  if (typeof configured === 'string' && configured.trim()) {
    const value = configured.trim();
    return value === 'off' ? undefined : value;
  }
  return DEFAULT_FORM_ENDPOINT;
}

export async function submitForm(
  payload: Record<string, unknown>,
  fallback: MailtoFallback
): Promise<SubmitOutcome> {
  const endpoint = formEndpoint();

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    // Throw rather than report success on a 4xx. A form that says "sent" when
    // the endpoint rejected it loses the message silently, which is the worst
    // of the available outcomes.
    if (!response.ok) {
      throw new Error(`Form endpoint responded ${response.status}`);
    }
    return 'posted';
  }

  const href = `mailto:${fallback.to}?subject=${encodeURIComponent(
    fallback.subject
  )}&body=${encodeURIComponent(fallback.body)}`;
  window.open(href, '_self');
  return 'mailto';
}
