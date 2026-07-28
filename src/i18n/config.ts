import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import no from './locales/no.json';

/**
 * Norwegian only, deliberately.
 *
 * The site shipped three locales behind a switcher, but all three served the
 * same URL: Google saw one Norwegian page per route and never had an English
 * page to index. The English and Arabic copy cost 66 KB in every bundle and
 * earned no search traffic, because search traffic needs an address.
 *
 * Concentrating on one language is also the stronger position for the market
 * this sells into — Norwegian public sector — and the seventeen articles are
 * Norwegian anyway. en.json and ar.json stay in the repo, still guarded by
 * locales.test.ts, so re-enabling them is a config change rather than a
 * retranslation. Doing that properly means prefixed URLs and hreflang, not a
 * client-side switch.
 */
i18n.use(initReactI18next).init({
  lng: 'no',
  fallbackLng: 'no',
  supportedLngs: ['no'],
  resources: {
    no: { translation: no },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
