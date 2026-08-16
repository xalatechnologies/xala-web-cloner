import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import { GDPRNotification } from './components/gdpr/GDPRNotification';
import { ChatWidget } from './components/chat/ChatWidget';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import RouteSEO from './components/seo/RouteSEO';
import ConsentedAnalytics from './components/seo/ConsentedAnalytics';
import { MICROSOFT_CLARITY_ID, PLAUSIBLE_DOMAIN } from './lib/analytics/ids';

const Home = lazy(() => import('./pages/Index'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const TjenesterPage = lazy(() => import('./pages/TjenesterPage'));
const ProdukterPage = lazy(() => import('./pages/ProdukterPage'));
const ProduktDetaljPage = lazy(() => import('./pages/ProduktDetaljPage'));
const TjenesteDetaljPage = lazy(() => import('./pages/TjenesteDetaljPage'));
const CaserPage = lazy(() => import('./pages/CaserPage'));
const SlikViJobberPage = lazy(() => import('./pages/SlikViJobberPage'));
const PriserPage = lazy(() => import('./pages/PriserPage'));
const TeknologiPage = lazy(() => import('./pages/TeknologiPage'));
const OmOssPage = lazy(() => import('./pages/OmOssPage'));
const KontaktPage = lazy(() => import('./pages/KontaktPage'));
const KarrierePage = lazy(() => import('./pages/KarrierePage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const BloggPage = lazy(() => import('./pages/BloggPage'));
const BloggPostPage = lazy(() => import('./pages/BloggPostPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The Google tag lives in index.html so it loads for every visitor; only these
// two are consent-gated.
const analyticsConfig = {
  microsoftClarityId: MICROSOFT_CLARITY_ID,
  plausibleDomain: PLAUSIBLE_DOMAIN
};

const App = () => {
  return (
    <AppProviders>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          {/* Outside Suspense so head tags are present on first paint rather
              than only after the lazy page chunk resolves. */}
          <RouteSEO />
          {/* Site-wide and consent-gated, rather than only on /kontakt. */}
          <ConsentedAnalytics {...analyticsConfig} />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tjenester" element={<TjenesterPage />} />
              <Route path="/tjenester/:slug" element={<TjenesteDetaljPage />} />
              <Route path="/produkter" element={<ProdukterPage />} />
              <Route path="/produkter/:slug" element={<ProduktDetaljPage />} />
              <Route path="/caser" element={<CaserPage />} />
              {/* Restored: the squash-merge of #7 dropped this route while
                  CaseStudyCard and CaserPage kept linking to /caser/:slug,
                  so all 18 case study cards led to the 404 page. */}
              <Route path="/caser/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/slik-vi-jobber" element={<SlikViJobberPage />} />
              <Route path="/priser" element={<PriserPage />} />
              <Route path="/pris" element={<Navigate to="/priser" replace />} />
              <Route path="/teknologi" element={<TeknologiPage />} />
              <Route path="/om-oss" element={<OmOssPage />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              {/* Restored likewise — Footer links to /karriere. */}
              <Route path="/karriere" element={<KarrierePage />} />
              <Route path="/blogg" element={<BloggPage />} />
              <Route path="/blogg/:slug" element={<BloggPostPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GDPRNotification />
            <ChatWidget />
          </Suspense>
        </Router>
      </HelmetProvider>
    </AppProviders>
  );
};

export { analyticsConfig };
export default App;