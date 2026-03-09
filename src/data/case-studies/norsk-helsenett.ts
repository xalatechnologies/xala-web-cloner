import type { CaseStudy } from '@/types/caseStudy';

export const norskHelsenettCaseStudy: CaseStudy = {
  slug: 'norsk-helsenett-healthcare-infrastructure',
  title: 'Norsk Helsenett',
  subtitle:
    'Supporting secure healthcare infrastructure, integrations, and digital services for a connected national health ecosystem',
  client: 'Norsk Helsenett',
  industry: 'Healthcare Infrastructure / Public Digital Services / Enterprise Technology',
  sector: 'Healthcare',
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
    'National healthcare infrastructure platform',
    'Secure healthcare service integration',
    'Interoperability across health systems',
    'Authentication & access control',
    'Compliance-aligned backend services',
  ],
  coreTechnologies: [
    '.NET & C#',
    'Microsoft Azure',
    'SQL Server',
    'REST APIs',
    'Healthcare system connectors',
    'National health registry APIs',
    'Identity & access management',
  ],
  logoUrl: '/clients/nhn.svg',
  imageUrl: '/clients/nhn.svg',

  summary:
    'Norsk Helsenett plays a critical role in Norway\'s national digital health infrastructure, connecting healthcare providers, public health services, and administrative systems. Xala contributed to healthcare-related platform work through architecture, development, integrations, testing, and deployment support — helping strengthen secure digital services and maintainable backend capabilities in a healthcare-connected environment.',

  challenge: [
    'Secure handling of healthcare-connected workflows in an environment with high trust and compliance expectations.',
    'Interoperability across multiple systems in Norway\'s national health infrastructure landscape.',
    'Need for maintainable architecture in a highly trusted environment where reliability directly affects healthcare operations.',
    'Requirement for reliable backend services and integrations connecting healthcare providers and administrative systems.',
    'Strong operational and security expectations across all platform components and service interactions.',
    'Balancing innovation and modernization with the stability required by critical national health infrastructure.',
  ],

  objectives: [
    'Support secure digital healthcare services in a national health infrastructure context',
    'Strengthen interoperability and service integrations across connected health systems',
    'Improve maintainability and scalability of platform services',
    'Provide a stronger technical foundation for connected health services',
    'Support reliable and secure backend capabilities aligned with healthcare compliance expectations',
  ],

  solution: {
    overview:
      'The work centred on delivering secure backend services, integrations, and maintainable platform capabilities in support of Norsk Helsenett\'s digital health infrastructure. Xala contributed as an architecture, development, and integration partner — focusing on secure service implementation, healthcare interoperability, and a stronger technical foundation for connected national health services.',
    modules: [
      'Secure backend service development',
      'Healthcare service integration support',
      'Interoperability architecture and service connectivity',
      'Authentication and access control integration',
      'API-based integration between health systems',
      'Operational monitoring and support',
      'Testing and deployment support',
    ],
    users: [
      'Healthcare providers and administrative teams',
      'IT administrators and platform engineers',
      'Integration and operations teams',
      'Public health service stakeholders',
    ],
  },

  architecture: {
    presentation: [
      'Service interfaces and administrative tools',
      'Operational dashboards and monitoring views',
      'Health service access surfaces',
    ],
    services: [
      '.NET backend services',
      'Healthcare workflow logic',
      'Secure service processing',
      'Integration and interoperability services',
    ],
    integrations: [
      'Healthcare system APIs',
      'National health registry connectors',
      'Authentication and identity services',
      'Enterprise service integrations',
    ],
    data: [
      'SQL Server (service data, operational records)',
      'Audit and compliance data',
      'Healthcare-related structured data stores',
    ],
    infrastructure: [
      'Microsoft Azure',
      'Secure enterprise hosting',
      'Operational monitoring and deployment support',
    ],
    security: [
      'Secure authentication and access control',
      'Healthcare-grade data handling',
      'Compliance-aligned service design',
      'Audit logging for critical operations',
      'Encrypted data in transit and at rest',
    ],
  },

  technologies: {
    backend: ['.NET', 'C#', 'Healthcare service logic', 'Secure integration services'],
    databases: ['SQL Server', 'Healthcare data stores', 'Audit and operational records'],
    cloud: ['Microsoft Azure', 'Secure enterprise hosting'],
    integrations: ['REST APIs', 'Healthcare system connectors', 'Authentication services', 'National health APIs'],
    devops: ['Functional testing', 'Security validation', 'Deployment support', 'Operational monitoring'],
    identity: ['Authentication and access control', 'Secure service identity', 'Role-based access'],
  },

  integrationHighlights: [
    'Healthcare System APIs — Structured integration connecting Norsk Helsenett platform services with national health registries and providers',
    '.NET Secure Backend Services — Core service logic for healthcare-connected workflows, access control, and interoperability support',
    'Authentication Integration — Secure identity and access control aligned with healthcare compliance and operational expectations',
    'Azure Infrastructure — Reliable and secure hosting foundation supporting critical national health digital services',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description: 'Healthcare infrastructure needs, security requirements, and integration scope were analyzed and structured.',
    },
    {
      phase: 'Architecture',
      description: 'Solution architecture was defined covering secure service design, interoperability patterns, and maintainable implementation.',
    },
    {
      phase: 'Development',
      description: 'Secure backend services and integration capabilities were implemented for national health infrastructure support.',
    },
    {
      phase: 'Integration',
      description: 'Healthcare systems, authentication services, and operational platforms were connected and validated.',
    },
    {
      phase: 'Testing',
      description: 'Security, compliance, and functional quality assurance improved confidence in healthcare-connected services.',
    },
    {
      phase: 'Deployment and Stabilization',
      description: 'The engagement contributed to a stronger and more secure digital foundation for Norsk Helsenett\'s national health infrastructure.',
    },
  ],

  outcomes: [
    'Improved technical structure for healthcare-connected platform services.',
    'Stronger interoperability between health systems and national infrastructure components.',
    'Better support for secure service delivery aligned with healthcare compliance requirements.',
    'Improved maintainability for healthcare infrastructure systems supporting continued evolution.',
    'Stronger foundation for connected national health services.',
  ],

  capabilities: [
    'Healthcare service integration support',
    'Secure backend service development',
    'Interoperability architecture',
    'Authentication and access control integration',
    'Maintainable healthcare infrastructure foundation',
    'Compliance-aware delivery',
    'API-based health system integration',
    'Operational readiness support',
  ],

  heroImage: {
    alt: 'Illustration of a national healthcare infrastructure platform with secure service integrations, connected health systems, and digital health services.',
    brief:
      'Premium enterprise-healthcare hero image representing secure national health infrastructure, service integrations, and digital health platform engineering. Teal/blue/slate palette, clinical precision aesthetic, secure connectivity cues. Avoid generic hospital imagery.',
  },

  architectureDiagram: {
    title: 'Norsk Helsenett — Secure Healthcare Infrastructure and Digital Service Architecture',
    brief:
      'Layered enterprise diagram: Users (Healthcare providers, Admins, IT teams) → Interfaces → Application Services (.NET secure backend) → Integration Layer (Healthcare APIs, authentication, national health connectors) → Data Layer (SQL Server, healthcare data) → Infrastructure (Azure secure hosting). Healthcare infrastructure aesthetic.',
    layers: [
      { name: 'Users', components: ['Healthcare Providers', 'Administrators', 'IT Teams', 'Public Health Services'] },
      { name: 'Interfaces', components: ['Service Interfaces', 'Admin Tools', 'Operational Views', 'Health Access Surfaces'] },
      { name: 'Application Services', components: ['.NET Secure Backend', 'Healthcare Logic', 'Interoperability Services', 'Monitoring'] },
      { name: 'Integration Layer', components: ['Healthcare APIs', 'National Health Connectors', 'Authentication Services', 'Enterprise Integrations'] },
      { name: 'Data Layer', components: ['SQL Server', 'Healthcare Data', 'Audit Records', 'Operational Data'] },
      { name: 'Infrastructure', components: ['Azure Secure Hosting', 'Testing', 'Deployment Support', 'Compliance Monitoring'] },
    ],
  },

  seo: {
    title: 'Norsk Helsenett Case Study | Xala Technologies',
    description:
      'See how Xala supported Norsk Helsenett with secure healthcare infrastructure services, system integrations, backend development, and digital health platform delivery.',
  },

  card: {
    title: 'Norsk Helsenett',
    excerpt:
      'Supporting secure healthcare infrastructure, integrations, and digital services for Norway\'s connected national health ecosystem.',
  },
  translations: {
    no: {
      subtitle: 'Støtte for sikker helseinfrastruktur, integrasjoner og digitale tjenester for Norges sammenkoblede nasjonale helseøkosystem',
      summary: 'Norsk Helsenett spiller en kritisk rolle i Norges nasjonale digitale helseinfrastruktur, og kobler helsetjenesteleverandører, offentlige helsetjenester og administrative systemer. Xala bidro til helserelatert plattformarbeid gjennom arkitektur, utvikling, integrasjoner, testing og utrullingsstøtte — og hjalp med å styrke sikre digitale tjenester og vedlikeholdbar backend-kapasitet.',
      challenge: [
        'Sikker håndtering av helserelaterte arbeidsflyter i et miljø med høye tillits- og samsvarkrav.',
        'Interoperabilitet på tvers av multiple systemer i Norges nasjonale helseinfrastrukturlandskap.',
        'Behov for vedlikeholdbar arkitektur i et svært betrodd miljø der pålitelighet direkte påvirker helseoperasjoner.',
        'Krav til pålitelige backend-tjenester og integrasjoner som kobler helsetjenesteleverandører og administrative systemer.',
        'Sterke drifts- og sikkerhetskrav på tvers av alle plattformkomponenter og tjenesteinteraksjoner.',
      ],
      objectives: [
        'Støtte sikre digitale helsetjenester i en nasjonal helseinfrastrukturkontekst',
        'Styrke interoperabilitet og tjenesteintegrasjoner på tvers av sammenkoblede helsesystemer',
        'Forbedre vedlikeholdbarhet og skalerbarhet for plattformtjenester',
        'Gi et sterkere teknisk fundament for sammenkoblede helsetjenester',
        'Støtte pålitelige og sikre backend-kapasiteter tilpasset helsesamsvarforventninger',
      ],
      solution: {
        overview: 'Arbeidet fokuserte på å levere sikre backend-tjenester, integrasjoner og vedlikeholdbare plattformkapasiteter til støtte for Norsk Helsenetts digitale helseinfrastruktur. Xala bidro som arkitektur-, utvikling- og integrasjonspartner — med fokus på sikker tjenesteimplementering, helseinteroperabilitet og et sterkere teknisk fundament.',
      },
      outcomes: [
        'Forbedret teknisk struktur for helserelaterte plattformtjenester.',
        'Sterkere interoperabilitet mellom helsesystemer og nasjonale infrastrukturkomponenter.',
        'Bedre støtte for sikker tjenesteleveranse tilpasset helsesamsvarskrav.',
        'Forbedret vedlikeholdbarhet for helseinfrastruktursystemer.',
        'Sterkere fundament for sammenkoblede nasjonale helsetjenester.',
      ],
      card: { excerpt: 'Støtte for sikker helseinfrastruktur, integrasjoner og digitale tjenester for Norges sammenkoblede nasjonale helseøkosystem.' },
      seo: { description: 'Se hvordan Xala støttet Norsk Helsenett med sikker helseinfrastruktur, systemintegrasjoner og digital helsetjenesteplattformleveranse.' },
    },
    ar: {
      subtitle: 'دعم البنية التحتية الصحية الآمنة والتكاملات والخدمات الرقمية لنظام الرعاية الصحية الوطني المتصل في النرويج',
      summary: 'تلعب Norsk Helsenett دورًا محوريًا في البنية التحتية الصحية الرقمية الوطنية في النرويج، وتربط مزودي الرعاية الصحية والخدمات الصحية العامة والأنظمة الإدارية. ساهمت Xala في عمل المنصة المتعلق بالرعاية الصحية من خلال الهندسة والتطوير والتكاملات.',
      outcomes: [
        'تحسين البنية التقنية لخدمات المنصة المتعلقة بالرعاية الصحية.',
        'قابلية تشغيل بيني أقوى بين أنظمة الرعاية الصحية ومكونات البنية التحتية الوطنية.',
        'دعم أفضل لتقديم الخدمات الآمنة بما يتماشى مع متطلبات الامتثال الصحي.',
        'تحسين قابلية الصيانة لأنظمة البنية التحتية الصحية.',
        'أساس أقوى للخدمات الصحية الوطنية المتصلة.',
      ],
      card: { excerpt: 'دعم البنية التحتية الصحية الآمنة والتكاملات والخدمات الرقمية لنظام الرعاية الصحية الوطني المتصل في النرويج.' },
      seo: { description: 'اكتشف كيف دعمت Xala Norsk Helsenett بخدمات البنية التحتية الصحية الآمنة وتكاملات الأنظمة وتسليم منصة الخدمات الصحية الرقمية.' },
    },
  },
};
