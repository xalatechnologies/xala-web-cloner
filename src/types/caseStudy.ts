export interface CaseStudyTechStack {
  frontend?: string[];
  backend?: string[];
  databases?: string[];
  cloud?: string[];
  identity?: string[];
  integrations?: string[];
  devops?: string[];
}

export interface CaseStudyArchitecture {
  presentation?: string[];
  services?: string[];
  integrations?: string[];
  data?: string[];
  infrastructure?: string[];
  security?: string[];
}

export interface CaseStudySolution {
  overview: string;
  modules: string[];
  users?: string[];
}

export interface CaseStudyTimelinePhase {
  phase: string;
  description: string;
}

export interface CaseStudyArchitectureLayer {
  name: string;
  components: string[];
}

export interface CaseStudyTeamMember {
  role: string;
  count: number;
}

export interface CaseStudyLocale {
  title?: string;
  client?: string;
  industry?: string;
  sector?: string;
  deliveryModel?: string;
  duration?: string;
  budget?: string;
  status?: string;
  subtitle?: string;
  summary?: string;
  challenge?: string[];
  objectives?: string[];
  solution?: Partial<CaseStudySolution>;
  timeline?: CaseStudyTimelinePhase[];
  outcomes?: string[];
  capabilities?: string[];
  scope?: string[];
  role?: string[];
  architecture?: CaseStudyArchitecture;
  architectureDiagram?: Partial<{
    title: string;
    brief: string;
    layers: CaseStudyArchitectureLayer[];
  }>;
  card?: Partial<{ title: string; excerpt: string }>;
  seo?: Partial<{ title: string; description: string }>;
  coreTechnologies?: string[];
  technologies?: CaseStudyTechStack;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  sector?: string;
  deliveryModel?: string;
  partnerModel?: string;
  deliveryPeriod?: string;
  duration?: string;
  budget?: string;
  team?: {
    size: number;
    composition: CaseStudyTeamMember[];
  };
  estimatedTeamSize?: string;
  status?: string;
  scope?: string[];
  coreTechnologies?: string[];
  role: string[];
  logoUrl?: string;
  imageUrl?: string;
  summary: string;
  challenge: string[];
  objectives: string[];
  solution: CaseStudySolution;
  architecture: CaseStudyArchitecture;
  technologies: CaseStudyTechStack;
  integrationHighlights?: string[];
  timeline: CaseStudyTimelinePhase[];
  outcomes: string[];
  capabilities: string[];
  heroImage: {
    alt: string;
    brief: string;
  };
  architectureDiagram: {
    title: string;
    brief: string;
    layers?: CaseStudyArchitectureLayer[];
  };
  seo: {
    title: string;
    description: string;
  };
  card: {
    title: string;
    excerpt: string;
  };
  translations?: Partial<Record<'no' | 'ar', CaseStudyLocale>>;
}
