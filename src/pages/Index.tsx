import Navbar from '../components/Navbar';
import VideoHero from '../components/hero/VideoHero';
import Clients from '../components/Clients';
import ValueProps from '../components/ValueProps';
import Footer from '../components/Footer';
import ServicesTeaser from '../components/teasers/ServicesTeaser';
import ProductsTeaser from '../components/teasers/ProductsTeaser';
import DigilistSection from '../components/DigilistSection';
import ProcessTeaser from '../components/teasers/ProcessTeaser';
import TechTeaser from '../components/teasers/TechTeaser';
import BlogTeaser from '../components/teasers/BlogTeaser';
import ContactTeaser from '../components/teasers/ContactTeaser';
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
        <DigilistSection />
        <ProcessTeaser />
        <TechTeaser />
        <BlogTeaser />
        {/*
          One closing call to action, not two. ContactTeaser ("Klar for en
          prat?") was immediately followed by FinalCTA ("Klar til å
          transformere din bedrift?") — the same ask twice in a row, and the
          second one in the vaguest language on the page. ContactTeaser stays
          because it carries the actual contact details; FinalCTA is still
          available for pages that need a closing band.
        */}
        <ContactTeaser />
      </main>
      <Footer />
    </div>
  );
};

export default Index;