import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import { GDPRNotification } from './components/gdpr/GDPRNotification';
import { ChatWidget } from './components/chat/ChatWidget';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import RouteSEO from './components/seo/RouteSEO';
import ConsentedAnalytics from './components/seo/ConsentedAnalytics';

const Home = lazy(() => import('./pages/Index'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const TjenesterPage = lazy(() => import('./pages/TjenesterPage'));
const ProdukterPage = lazy(() => import('./pages/ProdukterPage'));
const CaserPage = lazy(() => import('./pages/CaserPage'));
const SlikViJobberPage = lazy(() => import('./pages/SlikViJobberPage'));
const TeknologiPage = lazy(() => import('./pages/TeknologiPage'));
const OmOssPage = lazy(() => import('./pages/OmOssPage'));
const KontaktPage = lazy(() => import('./pages/KontaktPage'));
const KarrierePage = lazy(() => import('./pages/KarrierePage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const TransparensPage = lazy(() => import('./pages/TransparensPage'));
const BloggPage = lazy(() => import('./pages/BloggPage'));
const BloggPostPage = lazy(() => import('./pages/BloggPostPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const analyticsConfig = {
  googleAnalyticsId: "G-NFGNKJDHHW",
  microsoftClarityId: "q15abxku18",
  plausibleDomain: 'xala.no'
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
              <Route path="/produkter" element={<ProdukterPage />} />
              <Route path="/caser" element={<CaserPage />} />
              {/* Restored: the squash-merge of #7 dropped this route while
                  CaseStudyCard and CaserPage kept linking to /caser/:slug,
                  so all 18 case study cards led to the 404 page. */}
              <Route path="/caser/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/slik-vi-jobber" element={<SlikViJobberPage />} />
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
              <Route path="/transparens" element={<TransparensPage />} />
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