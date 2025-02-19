interface FAQ {
  question: string;
  answer: string;
}

interface Review {
  author: string;
  reviewBody: string;
  reviewRating: number;
  datePublished: string;
}

interface Award {
  name: string;
  description: string;
  awardedBy: string;
  date: string;
}

interface Partnership {
  name: string;
  description: string;
  partnerType: string;
  url?: string;
  logo?: string;
}

interface Certification {
  name: string;
  description: string;
  issuedBy: string;
  validUntil: string;
  url?: string;
}

interface Project {
  name: string;
  description: string;
  client: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  image?: string;
  url?: string;
}

export const generateFAQSchema = (faqs: FAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateReviewSchema = (reviews: Review[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: reviews.map((review, index) => ({
    '@type': 'Review',
    position: index + 1,
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating,
      bestRating: 5
    },
    datePublished: review.datePublished
  }))
});

export const generateAwardsSchema = (awards: Award[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: awards.map((award, index) => ({
    '@type': 'Award',
    position: index + 1,
    name: award.name,
    description: award.description,
    awardedBy: {
      '@type': 'Organization',
      name: award.awardedBy
    },
    date: award.date
  }))
});

export const generatePartnershipsSchema = (partnerships: Partnership[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: partnerships.map((partnership, index) => ({
    '@type': 'Organization',
    position: index + 1,
    name: partnership.name,
    description: partnership.description,
    '@id': partnership.url,
    logo: partnership.logo,
    partnerType: partnership.partnerType
  }))
});

export const generateCertificationsSchema = (certifications: Certification[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: certifications.map((cert, index) => ({
    '@type': 'EducationalOccupationalCredential',
    position: index + 1,
    name: cert.name,
    description: cert.description,
    credentialCategory: 'certification',
    validFrom: cert.issuedBy,
    validUntil: cert.validUntil,
    url: cert.url
  }))
});

export const generateProjectsSchema = (projects: Project[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((project, index) => ({
    '@type': 'Project',
    position: index + 1,
    name: project.name,
    description: project.description,
    client: {
      '@type': 'Organization',
      name: project.client
    },
    startDate: project.startDate,
    endDate: project.endDate,
    keywords: project.technologies.join(', '),
    image: project.image,
    url: project.url
  }))
});

export type {
  FAQ,
  Review,
  Award,
  Partnership,
  Certification,
  Project
};
