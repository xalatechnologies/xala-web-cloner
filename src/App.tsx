import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyRoute } from './lib/lazy-route';
import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import { GDPRNotification } from './components/gdpr/GDPRNotification';
import { ChatWidget } from './components/chat/ChatWidget';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import RouteErrorBoundary from './components/error/RouteErrorBoundary';
import RouteSEO from './components/seo/RouteSEO';
import ConsentedAnalytics from './components/seo/ConsentedAnalytics';
import { MICROSOFT_CLARITY_ID, PLAUSIBLE_DOMAIN } from './lib/analytics/ids';

const Home = lazyRoute(() => import('./pages/Index'));
const PrivacyPolicy = lazyRoute(() => import('./pages/PrivacyPolicy'));
const Terms = lazyRoute(() => import('./pages/Terms'));
const CookiesPolicy = lazyRoute(() => import('./pages/CookiesPolicy'));
const TjenesterPage = lazyRoute(() => import('./pages/TjenesterPage'));
const ProdukterPage = lazyRoute(() => import('./pages/ProdukterPage'));
const ProduktDetaljPage = lazyRoute(() => import('./pages/ProduktDetaljPage'));
const TjenesteDetaljPage = lazyRoute(() => import('./pages/TjenesteDetaljPage'));
const CaserPage = lazyRoute(() => import('./pages/CaserPage'));
const SlikViJobberPage = lazyRoute(() => import('./pages/SlikViJobberPage'));
const PriserPage = lazyRoute(() => import('./pages/PriserPage'));
const FaqPage = lazyRoute(() => import('./pages/FaqPage'));
const StatusPage = lazyRoute(() => import('./pages/StatusPage'));
const TransparensPage = lazyRoute(() => import('./pages/TransparensPage'));
const TeknologiPage = lazyRoute(() => import('./pages/TeknologiPage'));
const OmOssPage = lazyRoute(() => import('./pages/OmOssPage'));
const KontaktPage = lazyRoute(() => import('./pages/KontaktPage'));
const BookDemoPage = lazyRoute(() => import('./pages/BookDemoPage'));
const KarrierePage = lazyRoute(() => import('./pages/KarrierePage'));
const CaseStudyDetailPage = lazyRoute(() => import('./pages/CaseStudyDetailPage'));
const BloggPage = lazyRoute(() => import('./pages/BloggPage'));
const BloggPostPage = lazyRoute(() => import('./pages/BloggPostPage'));
const NotFound = lazyRoute(() => import('./pages/NotFound'));

// All trackers, including gtag, mount only after the visitor accepts cookies.
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
          {/* A code-split route whose chunk a deploy has replaced rejects
              during render; without a boundary React re-throws that as an
              uncaught exception and unmounts the whole tree. */}
          <RouteErrorBoundary>
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
                <Route path="/use-cases" element={<Navigate to="/caser" replace />} />
                <Route path="/slik-vi-jobber" element={<SlikViJobberPage />} />
                <Route path="/priser" element={<PriserPage />} />
                <Route path="/pris" element={<Navigate to="/priser" replace />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/transparens" element={<TransparensPage />} />
                <Route path="/transparency" element={<Navigate to="/transparens" replace />} />
                <Route path="/teknologi" element={<TeknologiPage />} />
                <Route path="/om-oss" element={<OmOssPage />} />
                <Route path="/kontakt" element={<KontaktPage />} />
                <Route path="/book-demo" element={<BookDemoPage />} />
                {/* Restored likewise — Footer links to /karriere. */}
                <Route path="/karriere" element={<KarrierePage />} />
                <Route path="/blogg" element={<BloggPage />} />
                <Route path="/blogg/:slug" element={<BloggPostPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/personvern" element={<Navigate to="/privacy" replace />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<CookiesPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <GDPRNotification />
              <ChatWidget />
            </Suspense>
          </RouteErrorBoundary>
        </Router>
      </HelmetProvider>
    </AppProviders>
  );
};

export { analyticsConfig };
export default App;