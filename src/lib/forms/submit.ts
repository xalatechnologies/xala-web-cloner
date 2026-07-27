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
 * The fallback exists so the form is never dead. It is not the intended
 * destination. Set the variable and it stops being used.
 *
 * On personal data: the POST path means applicant details pass through whoever
 * runs the endpoint, which is a processor relationship under GDPR. The mailto
 * path involves no third party at all. Worth deciding deliberately rather than
 * by default.
 */
export type SubmitOutcome = 'posted' | 'mailto';

export interface MailtoFallback {
  to: string;
  subject: string;
  body: string;
}

export function formEndpoint(): string | undefined {
  const configured = import.meta.env.VITE_FORM_ENDPOINT;
  return typeof configured === 'string' && configured.trim() ? configured.trim() : undefined;
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
