export type Language = 'no' | 'en' | 'ar';

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductCapability {
  title: string;
  body: string;
}

export interface ProductSection {
  heading: string;
  body: string;
}

export interface ProductCopy {
  tagline: string;
  intro: string;
  whatHeading?: string;
  what?: string;
  doesHeading?: string;
  does?: string;
  doesNotHeading?: string;
  doesNot?: string;
  capabilityHeading?: string;
  capabilities?: ProductCapability[];
  sections?: ProductSection[];
  faq?: ProductFaq[];
  features?: string[];
}

export interface ProductDetails {
  slug: string;
  serviceSlug?: string;
  caseSlugs?: string[];
  postSlugs?: string[];
  no: ProductCopy;
  en: ProductCopy;
  ar: ProductCopy;
}

export function productCopy(details: ProductDetails, language: Language): ProductCopy {
  return details[language] ?? details.no;
}
