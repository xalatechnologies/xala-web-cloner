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

  // The rotating word now names a deliverable rather than a technology, so the
  // sentence reads "We build <fagsystemer> that last" — a claim about what the
  // client receives instead of a list of buzzwords. Matched on prefix because
  // i18next reports regional tags like nb-NO and en-GB.
  const getHeroWords = () => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    if (lang.startsWith('en')) return ['systems', 'AI solutions', 'cloud services', 'integrations'];
    if (lang.startsWith('ar')) return ['أنظمة الأعمال', 'حلول الذكاء', 'خدمات سحابية', 'تكاملات'];
    return ['fagsystemer', 'AI-løsninger', 'skytjenester', 'integrasjoner'];
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