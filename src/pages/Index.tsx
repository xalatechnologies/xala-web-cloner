import Navbar from '../components/Navbar';
import VideoHero from '../components/hero/VideoHero';
import Clients from '../components/Clients';
import ValueProps from '../components/ValueProps';
import Footer from '../components/Footer';
import ServicesTeaser from '../components/teasers/ServicesTeaser';
import ProductsTeaser from '../components/teasers/ProductsTeaser';
import NorchainSection from '../components/NorchainSection';
import ProcessTeaser from '../components/teasers/ProcessTeaser';
import TechTeaser from '../components/teasers/TechTeaser';
import ContactTeaser from '../components/teasers/ContactTeaser';
import FinalCTA from '../components/FinalCTA';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { i18n } = useTranslation();

  const getHeroWords = () => {
    if (i18n.language === 'en') return ['AI', 'cloud', 'apps', 'data'];
    if (i18n.language === 'ar') return ['الذكاء', 'السحابة', 'التطبيقات', 'البيانات'];
    return ['AI', 'sky', 'apper', 'data'];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <VideoHero words={getHeroWords()} />
        <Clients />
        <ValueProps />
        <ServicesTeaser />
        <ProductsTeaser />
        <NorchainSection />
        <ProcessTeaser />
        <TechTeaser />
        <ContactTeaser />
        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;