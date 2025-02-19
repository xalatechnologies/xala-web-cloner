interface TechnologyStack {
  name: string;
  description: string;
  url?: string;
  category: string;
}

interface CaseStudy {
  name: string;
  description: string;
  client: string;
  image?: string;
  results: string[];
  technologies: string[];
}

interface JobPosting {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  validThrough: string;
  skills: string[];
}

interface Event {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image?: string;
}

export const generateTechnologyStackSchema = (technologies: TechnologyStack[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: technologies.map((tech, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: tech.name,
      description: tech.description,
      applicationCategory: tech.category,
      url: tech.url
    }
  }))
});

export const generateCaseStudySchema = (caseStudies: CaseStudy[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: caseStudies.map((study, index) => ({
    '@type': 'Article',
    position: index + 1,
    headline: study.name,
    description: study.description,
    image: study.image,
    author: {
      '@type': 'Organization',
      name: 'Xala Technologies AS'
    },
    publisher: {
      '@type': 'Organization',
      name: study.client
    },
    keywords: study.technologies.join(', '),
    articleBody: study.results.join('. ')
  }))
});

export const generateCareerSchema = (jobs: JobPosting[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: jobs.map((job, index) => ({
    '@type': 'JobPosting',
    position: index + 1,
    title: job.title,
    description: job.description,
    employmentType: job.employmentType,
    validThrough: job.validThrough,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'NO'
      }
    },
    skills: job.skills.join(', '),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Xala Technologies AS'
    }
  }))
});

export const generateEventsSchema = (events: Event[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: events.map((event, index) => ({
    '@type': 'Event',
    position: index + 1,
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location,
        addressCountry: 'NO'
      }
    },
    image: event.image,
    organizer: {
      '@type': 'Organization',
      name: 'Xala Technologies AS'
    }
  }))
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export type {
  TechnologyStack,
  CaseStudy,
  JobPosting,
  Event
};
