import Navbar from '../components/Navbar';
import VideoHero from '../components/hero/VideoHero';
import Clients from '../components/Clients';
import ValueProps from '../components/ValueProps';
import Footer from '../components/Footer';
import ServicesTeaser from '../components/teasers/ServicesTeaser';
import ProductsTeaser from '../components/teasers/ProductsTeaser';
import ProcessTeaser from '../components/teasers/ProcessTeaser';
import TeamTeaser from '../components/teasers/TeamTeaser';
import TechTeaser from '../components/teasers/TechTeaser';
import ContactTeaser from '../components/teasers/ContactTeaser';
import FinalCTA from '../components/FinalCTA';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { i18n } = useTranslation();
  
  // Dynamic words that change based on language
  const getHeroWords = () => {
    return i18n.language === 'en' 
      ? ["AI", "cloud", "apps", "data"]
      : ["AI", "sky", "apper", "data"];
  };

  return (
    <div className="min-h-screen flex flex-col bg-xala-primary">
      <Navbar />
      <div className="flex-1">
        <VideoHero words={getHeroWords()} />
        <Clients />
        <ValueProps />
        <ServicesTeaser />
        <ProductsTeaser />
        <ProcessTeaser />
        <TeamTeaser />
        <TechTeaser />
        <FinalCTA />
        <ContactTeaser />
      </div>
      <Footer />
    </div>
  );
};

export default Index;