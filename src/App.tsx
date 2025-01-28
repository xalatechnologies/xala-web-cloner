import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProviders from './components/providers/AppProviders';
import { GDPRNotification } from './components/gdpr/GDPRNotification';
import { ChatWidget } from './components/chat/ChatWidget';
import Home from './pages/Index';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiesPolicy from './pages/CookiesPolicy';

const App = () => {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
        </Routes>
        <GDPRNotification />
        <ChatWidget />
      </Router>
    </AppProviders>
  );
};

export default App;