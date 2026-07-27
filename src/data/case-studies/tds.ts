import type { CaseStudy } from '@/types/caseStudy';

export const tdsCaseStudy: CaseStudy = {
  slug: 'tds-taxi-portal',
  title: 'Transport Data Systems – Taxi Portal',
  subtitle:
    'Delivering a digital transport platform for taxi-related workflows, operational coordination, and scalable service management',
  client: 'Transport Data Systems (TDS)',
  industry: 'Transport Technology / Mobility Platforms / Enterprise Digital Services',
  sector: 'Public Transport',
  deliveryModel: 'Consultancy delivery',
  duration: '12–24 months',
  budget: 'Confidential',
  status: 'Delivered',
  team: {
    size: 6,
    composition: [
      { role: 'Team Leader', count: 1 },
      { role: 'Project Manager', count: 1 },
      { role: 'Developer', count: 2 },
      { role: 'Tester', count: 2 },
    ],
  },
  role: [
    'Architecture',
    'Requirement Analysis',
    'Development',
    'Integration',
    'Testing',
    'Deployment Support',
    'Technical Consulting',
  ],
  scope: [
    'Taxi workflow & operations portal',
    'Transport service coordination',
    'Driver & dispatch management',
    'Booking & trip data handling',
    'Reporting & operational visibility',
  ],
  coreTechnologies: [
    '.NET & C#',
    'SQL Server',
    'Microsoft Azure',
    'REST APIs',
    'React & TypeScript',
    'Workflow automation',
  ],
  logoUrl: undefined,

  summary:
    'Transport services depend on digital platforms that can coordinate workflows, handle operational data, and support multiple stakeholders efficiently. Xala contributed to the Taxi Portal for Transport Data Systems (TDS), supporting architecture, development, integrations, testing, and deployment-related activities for a transport platform designed to improve operational structure and digital service delivery.',

  challenge: [
    'Taxi and transport-service environments involve multiple actors, operational states, and coordination points that become inefficient without structured digital support.',
    'Coordination between users, administrators, and operational processes required a unified platform with clear workflow structure.',
    'Requirement for maintainable backend and platform logic that could be evolved without accumulating technical debt.',
    'Improving visibility into status and operational handling across distributed transport-service processes.',
    'Integrating supporting services and internal workflows in a transport coordination context.',
    'Creating a scalable platform foundation suited for continued transport-service evolution and future feature development.',
  ],

  objectives: [
    'Digitize and improve taxi-related operational workflows through structured platform support',
    'Strengthen service coordination and platform structure for transport-related processes',
    'Support maintainable backend and integration architecture for long-term platform evolution',
    'Improve visibility into transport-service processes and operational status',
    'Provide a scalable foundation for continued platform development',
    'Support reliable testing and deployment for operational use',
  ],

  solution: {
    overview:
      'The work centred on strengthening a digital platform for taxi-related service coordination. Xala contributed as an architecture, development, and integration partner — delivering backend services, workflow support, operational coordination capabilities, and integrations that improved the structure and scalability of the TDS transport platform.',
    modules: [
      'Taxi portal and workflow support interfaces',
      'Backend services for transport-related business logic',
      'Operational coordination and status handling modules',
      'Administration tools and management interfaces',
      'API-based integrations with supporting services',
      'Dashboard and operational visibility tools',
      'Testing and deployment support',
      'Scalable platform foundation for future development',
    ],
    users: [
      'Administrators and operational managers',
      'Service coordinators and workflow handlers',
      'Platform stakeholders and business users',
      'IT and integration engineering teams',
    ],
  },

  architecture: {
    presentation: [
      'Taxi portal and workflow views',
      'Administration tools and management interfaces',
      'Operational dashboards and status views',
    ],
    services: [
      '.NET backend services and business logic',
      'Workflow management and coordination services',
      'Status handling and process modules',
      'Operational support services',
    ],
    integrations: [
      'APIs for transport-service integrations',
      'Transport-service system connectors',
      'Operational service integrations',
      'Supporting platform service connections',
    ],
    data: [
      'SQL Server (workflow data, status records)',
      'Operational and coordination data',
      'Reporting and historical data',
    ],
    infrastructure: [
      'Microsoft Azure (hosting and deployment)',
      'Testing layer and operational validation',
      'Deployment support infrastructure',
    ],
    security: [
      'Access control for portal and admin interfaces',
      'Secure API communication',
      'Data integrity for workflow and operational records',
    ],
  },

  technologies: {
    backend: ['.NET', 'C#', 'Workflow logic services', 'Transport platform modules'],
    databases: ['SQL Server', 'Workflow and status data', 'Operational and reporting records'],
    cloud: ['Microsoft Azure', 'Azure hosting and deployment support'],
    integrations: ['REST APIs', 'Transport-service connectors', 'Operational service integrations'],
    devops: [
      'Functional testing and workflow validation',
      'Deployment support',
      'Operational readiness and monitoring',
    ],
  },

  integrationHighlights: [
    'REST APIs — Structured integration between the taxi portal and supporting transport-service systems',
    '.NET Backend Services — Core workflow management, coordination logic, and operational support for the TDS transport platform',
    'Azure Infrastructure — Scalable hosting and deployment foundation enabling operational stability and future growth',
    'Operational Dashboards — Visibility tools providing real-time insight into workflow status and transport-service coordination',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Taxi and transport workflow needs were analyzed and translated into structured platform requirements covering coordination, status handling, and operational visibility.',
    },
    {
      phase: 'Architecture',
      description:
        'A maintainable solution architecture was defined for transport workflows, service coordination, and integrations — with clear service boundaries and scalable implementation patterns.',
    },
    {
      phase: 'Development',
      description:
        'Core backend and platform services were implemented for taxi workflow support, operational coordination, and administration.',
    },
    {
      phase: 'Integration',
      description:
        'Connected services and operational workflows were integrated and validated for correct data flow and process behavior.',
    },
    {
      phase: 'Testing',
      description:
        'Quality assurance improved correctness, reliability, and operational readiness across taxi-related workflows and coordination services.',
    },
    {
      phase: 'Deployment and Stabilization',
      description:
        'The engagement contributed to a stronger digital foundation for transport-service operations, with improved workflow structure and platform scalability.',
    },
  ],

  outcomes: [
    'Improved digital handling of taxi-related workflows, replacing fragmented coordination with structured platform support.',
    'Stronger operational coordination across administrators, service coordinators, and platform stakeholders.',
    'Better visibility into workflow and status information through operational dashboards and reporting tools.',
    'Maintainable architecture providing a solid foundation for future platform growth and feature development.',
    'Stronger readiness for continued transport-service modernization and operational evolution.',
  ],

  capabilities: [
    'Taxi workflow digitization and portal support',
    'Operational coordination services',
    'Maintainable .NET backend architecture',
    'API-based transport-service integrations',
    'Workflow and status handling',
    'Dashboard and operational visibility support',
    'Testing and deployment support',
    'Scalable transport-platform foundation',
  ],

  heroImage: {
    alt: 'Illustration of a transport platform for taxi workflows with operational dashboards, connected services, and digital coordination tools.',
    brief:
      'Create a premium transport-tech hero image representing a taxi and transport operations platform with workflow coordination, dashboards, and connected digital services. Include route or flow-inspired transport cues, dashboard and workflow overlays, connected digital service modules, and subtle mobility or fleet context. Mood: structured, reliable, modern, operational, mobility-focused. Blue/slate/teal palette with clean enterprise composition. Avoid consumer taxi booking app visuals, flashy consumer mobility branding, or cluttered fleet imagery.',
  },

  architectureDiagram: {
    title: 'TDS — Taxi Portal and Transport Platform Architecture',
    brief:
      'Layered platform diagram: Users (Administrators, Operational users, Service coordinators, Platform stakeholders) → Frontend Interfaces (Taxi portal, Workflow views, Administration tools, Operational dashboards) → Application Services (.NET backend, Workflow logic, Coordination services, Status handling) → Integration Layer (APIs, Transport-service connectors, Operational integrations) → Data Layer (SQL Server, Workflow data, Status records, Operational and reporting data) → Infrastructure/Delivery (Azure hosting, Testing layer, Deployment support, Monitoring). Clean transport-tech enterprise style, blue/slate/teal palette.',
    layers: [
      {
        name: 'Users',
        components: [
          'Administrators',
          'Operational Users',
          'Service Coordinators',
          'Platform Stakeholders',
        ],
      },
      {
        name: 'Frontend Interfaces',
        components: [
          'Taxi Portal',
          'Workflow Views',
          'Administration Tools',
          'Operational Dashboards',
        ],
      },
      {
        name: 'Application Services',
        components: [
          '.NET Backend Services',
          'Workflow Logic',
          'Coordination Services',
          'Status Handling Modules',
        ],
      },
      {
        name: 'Integration Layer',
        components: [
          'REST APIs',
          'Transport-Service Connectors',
          'Operational Integrations',
          'Supporting Services',
        ],
      },
      {
        name: 'Data Layer',
        components: [
          'SQL Server',
          'Workflow Data',
          'Status Records',
          'Operational & Reporting Data',
        ],
      },
      {
        name: 'Infrastructure & Delivery',
        components: [
          'Azure Hosting',
          'Testing Layer',
          'Deployment Support',
          'Monitoring & Readiness',
        ],
      },
    ],
  },

  seo: {
    title: 'TDS Taxi Portal Case Study | Xala Technologies',
    description:
      'See how Xala supported Transport Data Systems with a taxi portal and transport platform covering workflow services, integrations, operational dashboards, testing, and deployment support.',
  },

  card: {
    title: 'TDS – Taxi Portal',
    excerpt:
      'Delivering a digital transport platform for taxi workflows, operational coordination, backend services, and scalable mobility support.',
  },
  translations: {
    no: {
      subtitle: 'Leveranse av en digital transportplattform for taxi-relaterte arbeidsflyter, driftskoordinering og skalerbar tjenesteadministrasjon',
      summary: 'Transporttjenester er avhengig av digitale plattformer som kan koordinere arbeidsflyter, håndtere driftsdata og betjene multiple interessenter effektivt. Xala bidro til Taxi Portal for Transport Data Systems (TDS), og støttet arkitektur, utvikling, integrasjoner, testing og utrullingsrelaterte aktiviteter for en transportplattform designet for å forbedre driftsstruktur og digital tjenesteleveranse.',
      challenge: [
        'Taxi- og transportmiljøer involverer multiple aktører, driftstilstander og koordineringspunkter som uten strukturert digital støtte blir ineffektive.',
        'Behov for håndtering av turer, sjåfør og disponeringer i en enkelt vedlikeholdbar plattform.',
        'Integrasjoner med transportregistre, betalingssystemer og administrative databaser.',
        'Skalerbarhet til å støtte voksende transportnettverks- og forretningsutvidelse.',
        'Sanntids driftssynlighet for disponeringsteam og ledelse.',
      ],
      objectives: [
        'Levere digitale arbeidsflyt- og administrasjonskapasiteter for taxioperasjoner',
        'Støtte integrasjoner med transportregistre og driftssystemer',
        'Forbedre driftssynlighet og koordinering for disponeringsteam',
        'Levere skalerbar backend-arkitektur for transportplattformvekst',
        'Styrke vedlikeholdbarhet og leveringskvalitet',
      ],
      solution: {
        overview: 'Taxi Portal leverte digitale arbeidsflytkapasiteter for TDSs transportdrift. Xala bidro til arkitektur, utvikling og integrasjonsarbeid — og implementerte tururhåndtering, driftskoordinering og rapporteringskapasiteter tilpasset transporttjenestemiljøet.',
      },
      outcomes: [
        'Digital taxiportal levert med strukturerte arbeidsflytkapasiteter.',
        'Forbedret driftskoordinering for disponeringsteam og sjåfører.',
        'Sterkere integrasjoner med transportregistre og driftssystemer.',
        'Forbedret skalerbarhet for transportplattformvekst.',
      ],
      card: { excerpt: 'Leveranse av en digital transportplattform for taxi-relaterte arbeidsflyter, driftskoordinering og skalerbar tjenesteadministrasjon.' },
      seo: { description: 'Se hvordan Xala leverte Taxi Portal for TDS med digitale arbeidsflytkapasiteter, backend-tjenester og skalerbar transportplattformleveranse.' },
    },
    ar: {
      subtitle: 'تقديم منصة نقل رقمية لسير عمل سيارات الأجرة والتنسيق التشغيلي وإدارة الخدمات القابلة للتوسع',
      summary: 'تعتمد خدمات النقل على منصات رقمية يمكنها تنسيق سير العمل والتعامل مع البيانات التشغيلية وخدمة أصحاب المصلحة المتعددين بكفاءة. ساهمت Xala في Taxi Portal لـ Transport Data Systems (TDS).',
      outcomes: [
        'تسليم بوابة سيارات الأجرة الرقمية مع قدرات سير العمل المنظمة.',
        'تحسين التنسيق التشغيلي لفرق الإيفاد والسائقين.',
        'تكاملات أقوى مع سجلات النقل والأنظمة التشغيلية.',
        'تحسين قابلية التوسع لنمو منصة النقل.',
      ],
      card: { excerpt: 'تقديم منصة نقل رقمية لسير عمل سيارات الأجرة والتنسيق التشغيلي وإدارة الخدمات القابلة للتوسع.' },
      seo: { description: 'اكتشف كيف قدمت Xala Taxi Portal لـ TDS مع قدرات سير العمل الرقمية وخدمات الخلفية وتسليم منصة النقل القابلة للتوسع.' },
    },
  },
};
