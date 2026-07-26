import { useEffect, useState } from 'react';

/**
 * Cookie-consent state, and the one place that decides whether analytics may
 * load.
 *
 * The banner has always written this key, but nothing read it — picking
 * "essential only" changed nothing and the analytics tags loaded regardless.
 * Anything that sets consent must go through `setConsent` so subscribers hear
 * about it in the same tick.
 */
export const CONSENT_KEY = 'gdpr-accepted';
export const CONSENT_EVENT = 'gdpr-consent-changed';

export type Consent = 'all' | 'essential' | 'unset';

/** Historic values written by the banner: 'true' and 'essential-only'. */
export function readConsent(): Consent {
  if (typeof window === 'undefined') return 'unset';
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (raw === 'true') return 'all';
    if (raw === 'essential-only') return 'essential';
    return 'unset';
  } catch {
    // Private browsing can throw on localStorage access; treat as no consent.
    return 'unset';
  }
}

export function setConsent(consent: Exclude<Consent, 'unset'>): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent === 'all' ? 'true' : 'essential-only');
  } catch {
    // Ignore: the in-memory event below still updates this session.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

/** True only once the visitor has actively accepted analytics cookies. */
export function analyticsAllowed(consent: Consent): boolean {
  return consent === 'all';
}

export function useConsent(): Consent {
  const [consent, setLocal] = useState<Consent>(() => readConsent());

  useEffect(() => {
    const sync = () => setLocal(readConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    // Another tab may accept on the visitor's behalf.
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return consent;
}
