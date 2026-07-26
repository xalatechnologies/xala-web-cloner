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
import BlogTeaser from '../components/teasers/BlogTeaser';
import ContactTeaser from '../components/teasers/ContactTeaser';
import FinalCTA from '../components/FinalCTA';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { i18n } = useTranslation();

  // The rotating word names the product families themselves, taken from the
  // work in the case studies and the product line: saksbehandling, Nordre
  // Follo's tilskudds- and bevillingsportal, Digiskjema's form solutions, the
  // integration and automation work. Not a technology list — a buyer searching
  // for "bevillingsportal" should see the word they searched for.
  const getHeroWords = () => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    if (lang.startsWith('en')) return ['case management systems', 'grant portals', 'licensing portals', 'digital forms', 'process automation', 'integrations'];
    if (lang.startsWith('ar')) return ['أنظمة معالجة الطلبات', 'بوابات المنح', 'بوابات التراخيص', 'النماذج الرقمية', 'أتمتة العمليات', 'التكاملات'];
    return ['saksbehandlingssystemer', 'tilskuddsportaler', 'bevillingsportaler', 'skjemaløsninger', 'prosessautomatisering', 'integrasjoner'];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main" className="flex-1">
        <VideoHero words={getHeroWords()} />
        <Clients />
        <ValueProps />
        <ServicesTeaser />
        <ProductsTeaser />
        <NorchainSection />
        <ProcessTeaser />
        <TechTeaser />
        <BlogTeaser />
        <ContactTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;