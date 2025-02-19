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