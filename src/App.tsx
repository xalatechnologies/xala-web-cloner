import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import { GDPRNotification } from './components/gdpr/GDPRNotification';
import { ChatWidget } from './components/chat/ChatWidget';
import Home from './pages/Index';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiesPolicy from './pages/CookiesPolicy';
import TjenesterPage from './pages/TjenesterPage';
import ProdukterPage from './pages/ProdukterPage';
import CaserPage from './pages/CaserPage';
import SlikViJobberPage from './pages/SlikViJobberPage';
import TeknologiPage from './pages/TeknologiPage';
import OmOssPage from './pages/OmOssPage';
// import TeamPage from './pages/TeamPage';
import KontaktPage from './pages/KontaktPage';

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
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tjenester" element={<TjenesterPage />} />
              <Route path="/produkter" element={<ProdukterPage />} />
              <Route path="/caser" element={<CaserPage />} />
              <Route path="/slik-vi-jobber" element={<SlikViJobberPage />} />
              <Route path="/teknologi" element={<TeknologiPage />} />
              <Route path="/om-oss" element={<OmOssPage />} />
              {/* <Route path="/om-oss/team" element={<TeamPage />} /> */}
              <Route path="/kontakt" element={<KontaktPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
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