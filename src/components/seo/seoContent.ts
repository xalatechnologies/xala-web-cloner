type Language = 'no' | 'en';
type PageId = 'home' | 'services' | 'team' | 'contact' | 'products';

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
}

const seoContent: Record<Language, Record<PageId, SEOContent>> = {
  no: {
    home: {
      title: 'Xala Technologies AS | Innovative Teknologiløsninger | Oslo',
      description: 'Vi bygger innovative løsninger som driver vekst og forvandler ideer til virkelighet med banebrytende teknologi. Spesialister i AI, webapplikasjoner og enterprise-systemer.',
      keywords: 'Xala Technologies, teknologiløsninger, AI-utvikling, webapplikasjoner, enterprise-systemer, Oslo, Norge, innovativ teknologi, digital transformasjon'
    },
    services: {
      title: 'Våre Tjenester | Xala Technologies AS | AI og Webapplikasjoner',
      description: 'Utforsk våre spesialiserte tjenester innen AI-utvikling, webapplikasjoner, enterprise-systemer og digital transformasjon. Skreddersydde løsninger for din bedrift.',
      keywords: 'AI-tjenester, webutvikling, enterprise-løsninger, digital transformasjon, teknologikonsulting, systemintegrasjon, Norge'
    },
    team: {
      title: 'Vårt Team | Xala Technologies AS | Eksperter i Teknologi',
      description: 'Møt vårt dedikerte team av teknologieksperter og utviklere. Vi kombinerer erfaring og innovasjon for å levere fremragende resultater.',
      keywords: 'teknologieksperter, utviklerteam, IT-konsulenter, teknologiledelse, Oslo, Norge'
    },
    products: {
      title: 'Produkter | Xala Technologies AS | Innovative Løsninger',
      description: 'Opplev våre innovative produkter og løsninger. Fra AI-drevne verktøy til skalerbare enterprise-systemer.',
      keywords: 'teknologiprodukter, AI-løsninger, enterprise-systemer, digitale verktøy, programvareløsninger'
    },
    contact: {
      title: 'Kontakt Oss | Xala Technologies AS | Oslo',
      description: 'Ta kontakt med Xala Technologies AS for å diskutere dine teknologibehov. Vi er her for å hjelpe deg med din digitale transformasjon.',
      keywords: 'kontakt, teknologikonsultasjon, IT-rådgivning, Oslo, Norge'
    }
  },
  en: {
    home: {
      title: 'Xala Technologies AS | Innovative Technology Solutions | Oslo',
      description: 'We build innovative solutions that drive growth and transform ideas into reality with cutting-edge technology. Specialists in AI, web applications, and enterprise systems.',
      keywords: 'Xala Technologies, technology solutions, AI development, web applications, enterprise systems, Oslo, Norway, innovative technology, digital transformation'
    },
    services: {
      title: 'Our Services | Xala Technologies AS | AI and Web Applications',
      description: 'Explore our specialized services in AI development, web applications, enterprise systems, and digital transformation. Tailored solutions for your business.',
      keywords: 'AI services, web development, enterprise solutions, digital transformation, technology consulting, system integration, Norway'
    },
    team: {
      title: 'Our Team | Xala Technologies AS | Technology Experts',
      description: 'Meet our dedicated team of technology experts and developers. We combine experience and innovation to deliver outstanding results.',
      keywords: 'technology experts, development team, IT consultants, technology leadership, Oslo, Norway'
    },
    products: {
      title: 'Products | Xala Technologies AS | Innovative Solutions',
      description: 'Experience our innovative products and solutions. From AI-powered tools to scalable enterprise systems.',
      keywords: 'technology products, AI solutions, enterprise systems, digital tools, software solutions'
    },
    contact: {
      title: 'Contact Us | Xala Technologies AS | Oslo',
      description: 'Get in touch with Xala Technologies AS to discuss your technology needs. We\'re here to help with your digital transformation.',
      keywords: 'contact, technology consultation, IT consulting, Oslo, Norway'
    }
  }
};

export const getPageSEO = (pageId: PageId, language: Language): SEOContent => {
  return seoContent[language][pageId];
};

export const getAllPageIds = (): PageId[] => {
  return Object.keys(seoContent.en) as PageId[];
};

export type { Language, PageId, SEOContent };
