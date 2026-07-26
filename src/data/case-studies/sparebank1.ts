import type { CaseStudy } from '@/types/caseStudy';

export const spareBank1CaseStudy: CaseStudy = {
  slug: 'sparebank-1-banking-systems',
  title: 'SpareBank 1',
  subtitle:
    'Supporting secure banking systems, integrations, and enterprise digital services in a regulated financial environment',
  client: 'SpareBank 1',
  industry: 'Banking / Financial Services / Enterprise Technology',
  sector: 'Banking / financial services',
  deliveryModel: 'Enterprise banking systems consultancy and development',
  deliveryPeriod: '2019–2023',
  duration: '4 years',
  budget: 'NOK 5–9M',
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
    'Development',
    'Integration',
    'Technical Consulting',
  ],
  logoUrl: '/clients/sparebank.png',
  imageUrl: '/clients/sparebank.png',

  summary:
    'SpareBank 1 operates in one of the most demanding digital environments in Norway, where security, reliability, interoperability, and compliance are central to every technical decision. Xala contributed to banking-related system development and enterprise integrations, helping strengthen digital services, internal operational capabilities, and the technical foundation required for secure and scalable financial platforms.',

  challenge: [
    'Integrating modern services with established enterprise and banking systems that had to remain stable and compliant throughout.',
    'Maintaining security and reliability across multiple technical layers in a highly regulated financial environment.',
    'Supporting internal operational systems with consistent and auditable data flows.',
    'Designing solutions that remain maintainable over time as the platform continues to evolve.',
    'Handling the complexity of business-critical environments where even small architectural weaknesses can have outsized operational consequences.',
    'Ensuring integration quality between systems, services, and operational processes in a context where correctness and traceability are non-negotiable.',
  ],

  objectives: [
    'Strengthen interoperability between banking-related systems and enterprise services',
    'Support secure and reliable service implementation across the platform',
    'Improve structure and maintainability in enterprise solutions',
    'Enable scalable internal digital services that support day-to-day banking operations',
    'Support high-quality data exchange and integration patterns',
    'Contribute to a stronger technical foundation for continued modernization in a regulated environment',
  ],

  scope: [
    'Secure enterprise banking backend services',
    'Banking-related business logic and process support',
    'API-based integration between internal systems',
    'Internal operational tools and dashboards',
    'Structured data flows and reporting',
  ],
  coreTechnologies: [
    '.NET enterprise services',
    'REST APIs',
    'SQL Server',
    'Enterprise integration patterns',
    'Secure authentication and access control',
  ],

  solution: {
    overview:
      'The work centred on helping strengthen digital banking and enterprise support systems through better structure, secure implementation, and integration readiness. Xala contributed as an architecture, development, and integration partner — helping SpareBank 1 evolve core enterprise capabilities without compromising operational quality or compliance posture.',
    modules: [
      'Secure enterprise backend services',
      'Banking-related business logic and process support',
      'API-based integration layer between systems',
      'Internal operational digital tools',
      'Structured data flows and service communication',
      'Authentication and access control foundations',
      'Monitoring and operational support patterns',
      'Maintainable technical architecture for long-term evolution',
    ],
    users: [
      'Internal banking users and operational teams',
      'Administrators and platform managers',
      'Business support functions',
      'IT and integration engineering teams',
    ],
  },

  architecture: {
    presentation: [
      'Internal digital tools and operational dashboards',
      'Service interfaces for business workflows',
      'Reporting and operational views',
      'Admin and management interfaces',
    ],
    services: [
      '.NET business services and process logic',
      'Service orchestration and routing',
      'Internal platform modules',
      'Backend API layer',
      'Notification and operational event services',
    ],
    integrations: [
      'Internal enterprise APIs',
      'Banking-adjacent system connectors',
      'Secure service communication patterns',
      'Enterprise integration services',
    ],
    data: [
      'SQL Server (business data, operational state)',
      'Structured reporting data',
      'Service processing and audit data',
    ],
    infrastructure: [
      'Enterprise runtime environments',
      'Deployment and release support',
      'Operational monitoring and maintenance',
    ],
    security: [
      'Authentication and access control',
      'Secure enterprise service design',
      'Data integrity and traceability controls',
      'Compliance-aware implementation practices',
      'Audit logging across critical flows',
    ],
  },

  technologies: {
    backend: ['.NET', 'C#', 'Enterprise business services', 'REST APIs', 'Service orchestration'],
    databases: ['SQL Server', 'Operational data store', 'Reporting data layer'],
    integrations: [
      'Internal enterprise APIs',
      'Banking-adjacent system integrations',
      'Secure service communication patterns',
    ],
    devops: [
      'Deployment support',
      'Operational monitoring',
      'Testing and validation of services and integrations',
    ],
    identity: ['Authentication and access control', 'Secure enterprise service design'],
  },

  integrationHighlights: [
    'Internal Enterprise APIs — Controlled communication between banking-related systems and supporting operational platforms',
    'Banking-Adjacent System Connectors — Reliable integration patterns enabling structured data exchange across enterprise services',
    'Secure Service Communication — Authentication and access control embedded throughout integration flows for compliance and traceability',
    '.NET Backend Services — Core business logic and process orchestration supporting internal operational capabilities',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Business and technical requirements were clarified in relation to banking-related services and enterprise systems, with particular attention to compliance expectations and operational constraints.',
    },
    {
      phase: 'Architecture',
      description:
        'Solution structure and integration patterns were defined for secure and maintainable delivery, including service boundaries, API design, and data flow responsibilities.',
    },
    {
      phase: 'Development',
      description:
        'Core backend and enterprise service implementation was delivered, covering business logic, process support, and internal operational functionality.',
    },
    {
      phase: 'Integration',
      description:
        'APIs and system communication flows were connected and validated, ensuring reliable interoperability between banking-related systems and supporting enterprise platforms.',
    },
    {
      phase: 'Testing',
      description:
        'Services and integrations were tested to improve quality, reliability, and confidence — with particular focus on security, data correctness, and compliance readiness.',
    },
    {
      phase: 'Operational Foundation',
      description:
        'The work contributed to a stronger and more scalable basis for enterprise financial systems, with improved maintainability, integration consistency, and platform readiness for continued evolution.',
    },
  ],

  outcomes: [
    'Improved interoperability between internal systems, reducing fragmentation in enterprise data flows and service communication.',
    'Stronger technical consistency in enterprise services, with cleaner architecture boundaries and more maintainable implementation patterns.',
    'Better support for secure operational workflows, with authentication and access control embedded throughout the delivery.',
    'Maintainable and scalable backend implementation that supports ongoing platform evolution without accumulating technical debt.',
    'Improved readiness for continued digital modernization in a regulated financial environment.',
    'Stronger integration reliability between banking-adjacent systems and internal enterprise platforms.',
  ],

  capabilities: [
    'Secure enterprise service development',
    'Banking-related system support and integration',
    'API-based integrations and service communication',
    'Structured data handling and operational data flows',
    'Maintainable backend architecture',
    'Improved interoperability between enterprise systems',
    'Reliable service communication patterns',
    'Authentication and access control integration',
    'Compliance-aware delivery in regulated environments',
    'Stronger foundation for digital financial operations',
  ],

  heroImage: {
    alt: 'Illustration of secure banking systems with enterprise integrations, data flows, and scalable digital financial services.',
    brief:
      'Create a premium enterprise hero image representing secure financial systems, structured data flows, and modern banking platform engineering. Combine abstract banking and finance context with enterprise dashboard overlays, secure service connection visuals, and subtle authentication cues. Mood: trustworthy, stable, secure, modern, enterprise-grade. Blue / slate / white palette with architecture-first layout. Avoid retail banking ad style, smiling-customer stock visuals, consumer payment app aesthetics, or overly futuristic neon visuals.',
  },

  architectureDiagram: {
    title: 'SpareBank 1 — Secure Banking Systems and Integration Architecture',
    brief:
      'Layered enterprise diagram: Users (Internal banking users, Administrators, Operations teams, Business support users) → Channels (Internal digital tools, Operational dashboards, Service interfaces, Reporting views) → Application Services (.NET business services, Process logic, Service orchestration, Internal platform modules) → Integration Layer (APIs, Enterprise integration services, Internal system connectors, Secure service communication) → Data Layer (SQL Server, Operational data, Business data, Reporting data) → Security / Operations (Authentication, Access control, Monitoring, Deployment, Compliance). Enterprise architecture style with clear boundaries and secure data flow indicators.',
    layers: [
      {
        name: 'Users',
        components: [
          'Internal Banking Users',
          'Administrators',
          'Operations Teams',
          'Business Support Users',
        ],
      },
      {
        name: 'Channels & Interfaces',
        components: [
          'Internal Digital Tools',
          'Operational Dashboards',
          'Service Interfaces',
          'Reporting & Workflow Views',
        ],
      },
      {
        name: 'Application Services',
        components: [
          '.NET Business Services',
          'Process Logic',
          'Service Orchestration',
          'Internal Platform Modules',
        ],
      },
      {
        name: 'Integration Layer',
        components: [
          'APIs',
          'Enterprise Integration Services',
          'Internal System Connectors',
          'Secure Service Communication',
        ],
      },
      {
        name: 'Data Layer',
        components: [
          'SQL Server',
          'Operational Data',
          'Business Data',
          'Reporting Data',
        ],
      },
      {
        name: 'Security & Operations',
        components: [
          'Authentication & Access Control',
          'Monitoring',
          'Deployment Support',
          'Compliance Controls',
        ],
      },
    ],
  },

  seo: {
    title: 'SpareBank 1 Case Study | Xala Technologies',
    description:
      'See how Xala supported SpareBank 1 with banking system development, enterprise integrations, secure digital services, and maintainable financial platform architecture in a regulated environment.',
  },

  card: {
    title: 'SpareBank 1',
    excerpt:
      'Supporting secure banking systems, enterprise integrations, and scalable digital services in a regulated financial environment.',
  },
  translations: {
    no: {
      subtitle: 'Støtte for sikre banksystemer, enterprise-integrasjoner og skalerbare digitale tjenester i et regulert finansmiljø',
      summary: 'SpareBank 1 opererer i et strengt regulert finansmiljø der sikkerhet, pålitelighet og samsvar er kritisk. Xala bidro til bankplattformarbeid gjennom arkitektur, utvikling, integrasjoner, testing og utrullingsstøtte — og hjalp med å styrke sikre digitale finanstjenester og vedlikeholdbar backend-kapasitet i et finansteknologimiljø med høy tillit.',
      challenge: [
        'Finansielle tjenester krever sikker håndtering av sensitive kundedata og transaksjoner med nulltoleranse for databrudd.',
        'Komplekse bankintegrasjoner på tvers av kjernebankplatformer, betalingssystemer og regulatoriske rapporteringsgrensesnitt.',
        'Behov for vedlikeholdbar arkitektur som kan utvikle seg i takt med regulatoriske krav og bankproduktutvidelse.',
        'Strenge ytelse- og tilgjengelighetskrav for digital banktjeneste som betjener et stort kundegrunnlag.',
        'Sikker tilgangskontroll og identitetsstyring på tvers av bankens digitale plattformkomponenter.',
      ],
      objectives: [
        'Styrke sikre digitale banktjenester og backend-plattformkapasiteter',
        'Forbedre interoperabilitet mellom kjernebankplatformer og digitale tjenestelag',
        'Støtte vedlikeholdbar arkitektur for langsiktig plattformutvikling',
        'Levere pålitelige integrasjoner på tvers av bankens tjenester og datasystemer',
        'Forbedre testkvalitet og utrullingsklargjøring for finansielle plattformkomponenter',
      ],
      solution: {
        overview: 'Arbeidet fokuserte på å levere sikre backend-tjenester, integrasjoner og vedlikeholdbare plattformkapasiteter i støtte av SpareBank 1s digitale bankplattform. Xala bidro som arkitektur-, utvikling- og integrasjonspartner — og fokuserte på sikker tjenesteimplementering, bankinteroperabilitet og et sterkere teknisk fundament for digitale finanstjenester.',
      },
      outcomes: [
        'Forbedret teknisk struktur for bankplattformtjenester med bedre tjenesteintegritet.',
        'Sterkere interoperabilitet mellom kjernebankkomponenter og digitale tjenestelag.',
        'Bedre støtte for sikker tjenesteleveranse i samsvar med finansielle samsvarkrav.',
        'Forbedret vedlikeholdbarhet for kontinuerlig bankplattformutvikling.',
      ],
      card: { excerpt: 'Støtte for sikre banksystemer, enterprise-integrasjoner og skalerbare digitale tjenester i et regulert finansmiljø.' },
      seo: { description: 'Se hvordan Xala støttet SpareBank 1 med sikre banksystemer, enterprise-integrasjoner og skalerbar digital tjenesteleveranse.' },
    },
    ar: {
      subtitle: 'دعم الأنظمة المصرفية الآمنة وتكاملات المؤسسات والخدمات الرقمية القابلة للتوسع في بيئة مالية منظمة',
      summary: 'تعمل SpareBank 1 في بيئة مالية شديدة التنظيم حيث الأمان والموثوقية والامتثال أمر بالغ الأهمية. ساهمت Xala في عمل المنصة المصرفية من خلال الهندسة والتطوير والتكاملات والاختبار ودعم النشر.',
      challenge: [
        'تتطلب الخدمات المالية التعامل الآمن مع البيانات الحساسة للعملاء والمعاملات مع عدم التسامح مع خروقات البيانات.',
        'تكاملات مصرفية معقدة عبر منصات الخدمات المصرفية الأساسية وأنظمة الدفع وواجهات التقارير التنظيمية.',
        'الحاجة إلى بنية قابلة للصيانة يمكنها التطور مع المتطلبات التنظيمية وتوسع المنتجات المصرفية.',
        'متطلبات صارمة للأداء والتوفر للخدمات المصرفية الرقمية التي تخدم قاعدة عملاء كبيرة.',
        'التحكم الآمن في الوصول وإدارة الهوية عبر مكونات المنصة الرقمية المصرفية.',
      ],
      outcomes: [
        'تحسين البنية التقنية لخدمات المنصة المصرفية مع تحسين نزاهة الخدمة.',
        'قابلية تشغيل بيني أقوى بين مكونات الخدمات المصرفية الأساسية وطبقات الخدمات الرقمية.',
        'دعم أفضل لتقديم الخدمات الآمنة بما يتماشى مع متطلبات الامتثال المالي.',
        'تحسين قابلية الصيانة لاستمرار تطوير المنصة المصرفية.',
      ],
      card: { excerpt: 'دعم الأنظمة المصرفية الآمنة وتكاملات المؤسسات والخدمات الرقمية القابلة للتوسع في بيئة مالية منظمة.' },
      seo: { description: 'اكتشف كيف دعمت Xala SpareBank 1 بأنظمة مصرفية آمنة وتكاملات مؤسسية وتقديم خدمات رقمية قابلة للتوسع.' },
    },
  },
};
