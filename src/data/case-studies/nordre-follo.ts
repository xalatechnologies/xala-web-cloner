import type { CaseStudy } from '@/types/caseStudy';

export const nordreFolloCaseStudy: CaseStudy = {
  slug: 'nordre-follo-tilskuddsportal-bevillingsportal',
  title: 'Nordre Follo Municipality',
  subtitle:
    'Delivering digital grant and licensing portals aligned with municipal architecture principles and modern public-sector service design',
  client: 'Nordre Follo Municipality',
  industry: 'Public Sector / Municipal Digital Services / Enterprise Technology',
  sector: 'Public sector / municipal services',
  deliveryModel: 'Consultancy delivery',
  duration: '12–18 months',
  budget: 'Confidential',
  status: 'Delivered',
  scope: [
    'Tilskuddsportal',
    'Bevillingsportal',
    'Municipal digital services',
    'Architecture principles',
    'Citizen and administration workflows',
  ],
  role: [
    'Architecture',
    'Requirement analysis',
    'Development',
    'Integration',
    'Testing',
    'Deployment support',
    'Technical consulting',
  ],
  coreTechnologies: [
    'React',
    'TypeScript',
    '.NET',
    'SQL Server',
    'Azure',
    'APIs',
    'Authentication services',
    'Municipal integrations',
  ],
  team: {
    size: 6,
    composition: [
      { role: 'Team Leader', count: 1 },
      { role: 'Project Manager', count: 1 },
      { role: 'Developer', count: 2 },
      { role: 'Tester', count: 2 },
    ],
  },
  estimatedTeamSize: '6+',

  summary:
    'Nordre Follo Municipality needed modern digital solutions to simplify application handling, improve transparency, and strengthen administrative workflows. Xala contributed to the delivery of a Tilskuddsportal and Bevillingsportal, supporting architecture, development, integrations, and public-sector design principles to create maintainable and user-friendly digital municipal services.',

  challenge: [
    'Manual or semi-manual handling of grant and licensing applications created unnecessary administrative overhead and risked inconsistencies.',
    'Applicants and municipal case handlers had limited transparency into process status and case progress.',
    'Grant and licensing processes needed more structure and standardization to work well across departments and regulations.',
    'The municipality required maintainable and scalable public-sector architecture that aligned with municipal architecture principles.',
    'Digital solutions had to support both external users and internal administrators with clear, usable experiences.',
    'New services had to fit into an existing municipal system landscape and operational environment without increasing complexity.',
  ],

  objectives: [
    'Digitize grant and licensing workflows for citizens, organizations, and administrators.',
    'Improve the applicant experience by providing clear, guided digital processes.',
    'Strengthen transparency and process visibility for both applicants and internal case handlers.',
    'Reduce manual administrative effort and fragmented handling of applications.',
    'Support maintainable and scalable architecture aligned with municipal principles.',
    'Create a technical foundation for future municipal digital services beyond grants and licensing.',
  ],

  solution: {
    overview:
      'The engagement focused on building modern municipal portals for grant (Tilskuddsportal) and licensing (Bevillingsportal) services. Xala contributed across architecture, requirement analysis, development, testing, integration, and deployment support — with explicit focus on public-sector architecture principles, maintainability, and usability for both citizens and administrators.',
    modules: [
      'Tilskuddsportal for grant-related workflows',
      'Bevillingsportal for licensing and permit workflows',
      'Applicant-facing digital forms and status handling',
      'Administrative case-handling interfaces',
      'Backend workflow and validation services',
      'API-based integrations with municipal systems',
      'Authentication and access control integration',
      'Testing and deployment support capabilities',
    ],
    users: [
      'Citizens applying for municipal grants or licenses',
      'Organizations seeking municipal funding or permissions',
      'Municipal case handlers managing applications and cases',
      'Municipal administrators and managers overseeing workflows and service quality',
    ],
  },

  architecture: {
    presentation: [
      'React- and TypeScript-based Tilskuddsportal',
      'React- and TypeScript-based Bevillingsportal',
      'Applicant-facing workflows and forms',
      'Administrative and case-handling interfaces',
    ],
    services: [
      '.NET backend services for workflow handling',
      'Validation and business rules services',
      'Case-handling support services',
      'Notification and supporting service components',
    ],
    integrations: [
      'APIs connecting portals to municipal systems',
      'Authentication services for secure citizen and staff access',
      'Notification and supporting operational services',
    ],
    data: [
      'SQL Server for application and case data',
      'Structured data services for workflow state and metadata',
      'Status and audit records supporting administrative processes',
    ],
    infrastructure: [
      'Azure-based hosting environment',
      'Deployment and release support for municipal operations',
      'Monitoring and operational readiness for public-sector use',
    ],
    security: [
      'Authentication services integrated with municipal identity solutions',
      'Role-based access control for applicants, case handlers, and administrators',
      'Secure handling of application and case-related data',
    ],
  },

  technologies: {
    frontend: ['React', 'TypeScript'],
    backend: ['.NET'],
    databases: ['SQL Server'],
    cloud: ['Azure'],
    identity: ['Authentication services', 'Role-based access control'],
    integrations: ['APIs', 'Municipal system integrations'],
    devops: ['Testing and validation', 'Deployment support', 'Monitoring and operational readiness'],
  },

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Grant and licensing workflows were analyzed together with municipal stakeholders and translated into structured service and system requirements for the Tilskuddsportal and Bevillingsportal.',
    },
    {
      phase: 'Architecture',
      description:
        'Solution architecture was defined in alignment with municipal architecture principles, including portal structure, service boundaries, data responsibilities, and integration points.',
    },
    {
      phase: 'Development',
      description:
        'Frontend and backend capabilities for applicant and administrative workflows were implemented using React, TypeScript, .NET, and SQL Server on Azure.',
    },
    {
      phase: 'Integration',
      description:
        'Portal services were integrated with surrounding municipal systems, authentication services, and supporting operational components, and validated for reliable operation.',
    },
    {
      phase: 'Testing',
      description:
        'Functional testing and validation improved usability, correctness, and operational confidence for both applicant and administrative journeys.',
    },
    {
      phase: 'Deployment and Stabilization',
      description:
        'The engagement supported controlled rollout of the portals and contributed to a stronger digital foundation for municipal service delivery.',
    },
  ],

  outcomes: [
    'More efficient digital handling of grants and licenses through structured online workflows.',
    'Improved transparency for applicants and administrators with clearer status and process visibility.',
    'Reduced reliance on manual, paper-based, or email-driven processes in grant and licensing handling.',
    'Stronger architecture for future municipal service expansion, aligned with public-sector principles.',
    'Better usability and consistency in public-facing workflows for citizens and organizations.',
  ],

  capabilities: [
    'Digital grant application workflows',
    'Digital licensing and permit workflows',
    'Applicant-facing and administrative portal experiences',
    '.NET-based workflow and business services',
    'API-based municipal integrations',
    'Structured SQL-backed data handling',
    'Azure-based hosting and deployment support',
    'Architecture aligned with municipal principles',
    'Integrated testing and operational readiness practices',
  ],

  heroImage: {
    alt: 'Illustration of municipal digital service portals for grants and licensing with structured workflows, administrative tools, and secure public-sector architecture.',
    brief:
      'Create a premium enterprise hero image representing modern municipal digital services for grants and licensing. Show citizen and administrator interaction with structured workflows, dashboards, and portal modules. Use a Scandinavian public-sector visual language with a blue / green / slate palette, clean layouts, and clear, accessible UI elements. Communicate trust, structure, and civic service rather than corporate or political imagery.',
  },

  architectureDiagram: {
    title: 'Nordre Follo – Municipal Grant and Licensing Portal Architecture',
    brief:
      'Layered architecture diagram with six rows: Users (Citizens, Organizations, Municipal case handlers, Administrators) → Frontend Portals (Tilskuddsportal, Bevillingsportal, Applicant workflows, Administration interfaces) → Application Services (.NET backend services, Validation logic, Workflow services, Case-handling support) → Integration Layer (APIs, Municipal systems, Authentication services, Notification / supporting services) → Data Layer (SQL Server, Application data, Case data, Metadata and status records) → Infrastructure / Delivery (Azure hosting, Testing layer, Deployment support, Monitoring / operational readiness).',
    layers: [
      {
        name: 'Users',
        components: ['Citizens', 'Organizations', 'Municipal Case Handlers', 'Administrators'],
      },
      {
        name: 'Frontend Portals',
        components: ['Tilskuddsportal', 'Bevillingsportal', 'Applicant Workflows', 'Administration Interfaces'],
      },
      {
        name: 'Application Services',
        components: ['.NET Backend Services', 'Validation Logic', 'Workflow Services', 'Case-Handling Support'],
      },
      {
        name: 'Integration Layer',
        components: ['APIs', 'Municipal Systems', 'Authentication Services', 'Notification / Supporting Services'],
      },
      {
        name: 'Data Layer',
        components: ['SQL Server', 'Application Data', 'Case Data', 'Metadata and Status Records'],
      },
      {
        name: 'Infrastructure / Delivery',
        components: ['Azure Hosting', 'Testing Layer', 'Deployment Support', 'Monitoring / Operational Readiness'],
      },
    ],
  },

  seo: {
    title: 'Nordre Follo Municipality Case Study | Xala Technologies',
    description:
      'See how Xala supported Nordre Follo Municipality with a Tilskuddsportal and Bevillingsportal, modern architecture, React and .NET development, integrations, testing, and deployment support.',
  },

  card: {
    title: 'Nordre Follo Municipality',
    excerpt:
      'Delivering digital grant and licensing portals with modern architecture, React and .NET implementation, and alignment to municipal architecture principles.',
  },
  translations: {
    no: {
      subtitle: 'Leveranse av digitale tilskudds- og bevillingsportaler med moderne arkitektur, React og .NET-implementasjon, og tilpasning til kommunale arkitekturprinsipper',
      summary: 'Nordre Follo kommune trengte moderne digitale portaler for å håndtere tilskuddssøknader og bevillinger — og erstatte manuelle prosesser med strukturerte digitale arbeidsflyter. Xala leverte React og .NET-baserte portaler med samsvar til kommunale arkitekturprinsipper, og forbedret tjenestekvalitet og effektivitet for innbyggere og saksbehandlere.',
      challenge: [
        'Manuelle tilskudds- og bevillingsprosesser var tidkrevende for både saksbehandlere og innbyggere.',
        'Behov for digitale portaler som fulgte kommunale arkitekturprinsipper og integrasjonsstandarder.',
        'Sikker innbyggerautentisering og autorisasjon for offentlige tjenesteportaler.',
        'Arbeidsflytautomatisering for søknadsbehandling, godkjenning og varsling på tvers av kommunale team.',
        'Tilgjengelighet og brukervennlighet som en offentlig digital tjeneste tilgjengelig for alle innbyggere.',
      ],
      objectives: [
        'Digitalisere tilskuddssøknads- og bevillingsprosesser med brukervennlige portaler',
        'Implementere arbeidsflyt- og godkjenningsstøtte for kommunale saksbehandlere',
        'Sikre samsvar med kommunale arkitekturprinsipper og integrasjonsstandarder',
        'Levere sikker innbyggerautentisering og rollestyrte tilgangskontroller',
        'Forbedre tjenesteeffektivitet og innbyggertilfredshet for kommunale portaler',
      ],
      solution: {
        overview: 'Xala leverte digitale portaler for tilskudd og bevillinger bygget med React og .NET, og en arkitektur som følger Nordre Follo kommunes prinsipper. Portalene inkluderer arbeidsflytsstøtte for søknadsbehandling, rollestyrt tilgang for saksbehandlere og innbyggervendte skjemaer med innebygd validering.',
      },
      outcomes: [
        'Digitale tilskudds- og bevillingsportaler levert som erstatning for manuelle prosesser.',
        'Redusert behandlingstid for søknader via strukturert arbeidsflyt og automatisering.',
        'Forbedret innbyggeropplevelse med brukervennlige skjemaer og søknadssporingskapasiteter.',
        'Samsvar med kommunale arkitekturprinsipper som letter fremtidig plattformintegrasjon.',
      ],
      card: { excerpt: 'Leveranse av digitale tilskudds- og bevillingsportaler med moderne arkitektur, React og .NET-implementasjon, og samsvar med kommunale arkitekturprinsipper.' },
      seo: { description: 'Se hvordan Xala leverte digitale tilskudds- og bevillingsportaler for Nordre Follo kommune med React, .NET og kommunale arkitekturprinsipper.' },
    },
    ar: {
      subtitle: 'تقديم بوابات المنح والتراخيص الرقمية بهندسة حديثة وتنفيذ React و.NET ومواءمة مع مبادئ البنية البلدية',
      summary: 'احتاجت بلدية Nordre Follo إلى بوابات رقمية حديثة لإدارة طلبات المنح والتراخيص — واستبدال العمليات اليدوية بسير عمل رقمي منظم. قدمت Xala بوابات مبنية على React و.NET مع الامتثال لمبادئ البنية البلدية.',
      outcomes: [
        'تسليم بوابات المنح والتراخيص الرقمية كبديل للعمليات اليدوية.',
        'تقليل وقت معالجة الطلبات من خلال سير العمل المنظم والأتمتة.',
        'تحسين تجربة المواطن مع نماذج سهلة الاستخدام وإمكانيات تتبع الطلبات.',
        'الامتثال لمبادئ البنية البلدية مما يسهل تكامل المنصة مستقبلًا.',
      ],
      card: { excerpt: 'تقديم بوابات المنح والتراخيص الرقمية بهندسة حديثة وتنفيذ React و.NET ومواءمة مع مبادئ البنية البلدية.' },
      seo: { description: 'اكتشف كيف قدمت Xala بوابات المنح والتراخيص الرقمية لبلدية Nordre Follo باستخدام React و.NET ومبادئ البنية البلدية.' },
    },
  },
};

