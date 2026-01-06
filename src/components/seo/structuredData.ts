interface TeamMember {
  name: string;
  role: string;
  image: string;
  sameAs?: string[];
}

interface Service {
  name: string;
  description: string;
  image?: string;
}

interface Product {
  name: string;
  description: string;
  image?: string;
  category?: string;
}

export const generateOrganizationSchema = (
  description: string,
  url: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Xala Technologies AS',
  url,
  logo: `${url}/logo.png`,
  description,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NO',
    addressLocality: 'Oslo'
  },
  sameAs: [
    'https://www.linkedin.com/company/xala-technologies',
    'https://twitter.com/xalatechnologies'
  ]
});

export const generateTeamSchema = (members: TeamMember[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  employee: members.map(member => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    image: member.image,
    sameAs: member.sameAs
  }))
});

export const generateServicesSchema = (services: Service[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  service: services.map(service => ({
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Xala Technologies AS'
    },
    image: service.image
  }))
});

export const generateProductsSchema = (products: Product[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    itemListElement: products.map((product, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category
    }))
  }
});

export const generateContactSchema = (url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+47-XXX-XX-XXX',
    contactType: 'customer service',
    areaServed: ['NO', 'EU'],
    availableLanguage: ['Norwegian', 'English']
  }
});
