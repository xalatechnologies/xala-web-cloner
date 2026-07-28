import type { CaseStudy } from '@/types/caseStudy';

export const ssbCaseStudy: CaseStudy = {
  slug: 'ssb-legacy-system-modernization',
  title: 'SSB',
  subtitle:
    'Modernizing legacy public-sector systems through architecture renewal, platform migration, and maintainable .NET Core delivery',
  client: 'SSB (Statistics Norway)',
  industry: 'Public Sector / Government / Enterprise Modernization',
  sector: 'Public Sector',
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
    'Modernization',
    'Integration',
    'Testing',
    'Deployment Support',
    'Technical Consulting',
  ],
  scope: [
    'Legacy Java-to-.NET Core migration',
    'Public-sector system modernization',
    'Architecture renewal & refactoring',
    'Enterprise integration uplift',
    'Scalable platform foundation',
  ],
  coreTechnologies: [
    '.NET Core & C#',
    'Java (legacy source)',
    'Microsoft Azure',
    'SQL Server',
    'REST APIs',
    'CI/CD pipelines',
  ],
  logoUrl: '/clients/ssb.svg',
  imageUrl: '/clients/ssb.svg',

  summary:
    'Statistics Norway depends on robust and maintainable digital systems to support critical public-sector functions. Xala contributed to modernization work focused on renewing legacy systems, including migration from Java-based solutions to .NET Core, helping improve maintainability, scalability, and long-term technical sustainability in a demanding government environment.',

  challenge: [
    'Aging Java-based applications had accumulated increasing maintenance burden over time, making them harder to evolve, integrate, and support.',
    'Need to modernize critical systems without disrupting core public-sector business processes that relied on the existing implementations.',
    'Limited flexibility in legacy architecture restricted the ability to adapt systems to changing requirements and integration needs.',
    'Requirement to preserve core business logic with high fidelity while moving to a modern platform and updated technology stack.',
    'Integration challenges between legacy and modern components during the transition period required careful coordination.',
    'Need for improved testing and release confidence across migrated functionality to maintain operational reliability throughout the modernization process.',
    'Technical debt and long-term platform risk needed to be addressed without introducing instability during the transition.',
  ],

  objectives: [
    'Modernize legacy public-sector systems and reduce dependency on aging Java-based technology',
    'Migrate critical functionality from Java to .NET Core with preserved business logic and operational continuity',
    'Improve maintainability and scalability of the system landscape',
    'Create a more structured and supportable architecture for long-term evolution',
    'Reduce technical debt and long-term platform risk',
    'Strengthen testing and deployment confidence across migrated services',
    'Support reliable transition from legacy to modern technology without disrupting critical operations',
    'Provide a better foundation for future development and integrations',
  ],

  solution: {
    overview:
      'The work centred on modernizing legacy application capabilities and establishing a stronger technical foundation for SSB. Xala contributed as an architecture, development, and modernization partner — supporting the migration from Java-based legacy systems to .NET Core, with careful attention to business logic preservation, integration continuity, and release quality throughout the transition.',
    modules: [
      'Legacy system assessment and scope definition',
      'Java-to-.NET Core service migration and redevelopment',
      'Architecture modernization and service boundary redesign',
      'Business logic renewal and validation',
      'Integration layer between modernized and legacy components',
      'Regression and migration testing framework',
      'Deployment and transition support',
      'Maintainable .NET Core backend services',
    ],
    users: [
      'Internal users and analysts',
      'Administrators and operational stakeholders',
      'IT teams and platform engineers',
      'Business process owners dependent on modernized systems',
    ],
  },

  architecture: {
    presentation: [
      'Existing interfaces and internal system consumers',
      'Connected digital channels and service consumers',
      'Operational and reporting surfaces',
    ],
    services: [
      '.NET Core services replacing legacy Java components',
      'Renewed business logic modules',
      'Modern backend service components',
      'Migration and transition support services',
    ],
    integrations: [
      'APIs connecting modernized services to surrounding systems',
      'Legacy connectors for transition-period coexistence',
      'Migration support services for controlled cutover',
      'Enterprise integration patterns for stable interoperability',
    ],
    data: [
      'SQL Server (business data, application state)',
      'Operational and reporting data',
      'Historical data continuity through migration',
    ],
    infrastructure: [
      'Azure hosting environment',
      'Modern deployment infrastructure',
      'Testing and validation layer',
      'Operational monitoring and readiness',
    ],
    security: [
      'Access control aligned to public-sector requirements',
      'Secure service design in government environment',
      'Data integrity and continuity through migration',
      'Audit logging for business-critical transitions',
    ],
  },

  technologies: {
    backend: ['.NET Core', 'C#', 'Modern backend services', 'Migrated business logic components'],
    databases: ['SQL Server', 'Structured operational data', 'Reporting and historical data'],
    cloud: ['Microsoft Azure', 'Enterprise hosting and deployment support'],
    integrations: [
      'APIs',
      'Enterprise integration services',
      'Legacy transition connectors',
    ],
    devops: [
      'Functional testing and regression validation',
      'Migration-related quality assurance',
      'Deployment support and transition management',
      'Operational monitoring',
    ],
  },

  integrationHighlights: [
    'Java-to-.NET Core Migration Layer — Controlled transition services enabling coexistence and progressive cutover between legacy and modernized components',
    '.NET Core Backend Services — Renewed implementation of business-critical logic previously tied to Java-based applications',
    'API Integration Layer — Structured communication between modernized services and surrounding enterprise systems',
    'SQL Server Data Services — Continuity of business data, application state, and reporting throughout the migration process',
  ],

  timeline: [
    {
      phase: 'Legacy Assessment',
      description:
        'Existing Java-based systems and technical dependencies were analyzed to understand business responsibilities, complexity, and modernization priorities.',
    },
    {
      phase: 'Requirement Analysis',
      description:
        'Business-critical functionality, migration scope, and modernization requirements were clarified with attention to preserving operational continuity.',
    },
    {
      phase: 'Architecture',
      description:
        'A target architecture was defined to support modernization, maintainability, and controlled transition — covering service boundaries, migration approach, and integration patterns.',
    },
    {
      phase: 'Development and Migration',
      description:
        'Core services and business logic were modernized and reimplemented in .NET Core, with careful attention to functional equivalence and integration readiness.',
    },
    {
      phase: 'Integration',
      description:
        'Modernized services were connected with surrounding systems and validated to ensure correct behavior across the transition period.',
    },
    {
      phase: 'Testing and Stabilization',
      description:
        'Regression testing and quality assurance activities improved confidence in migrated functionality and release readiness.',
    },
    {
      phase: 'Deployment and Transition',
      description:
        'The engagement contributed to a stronger and more maintainable public-sector system foundation, with controlled rollout and improved long-term technical sustainability.',
    },
  ],

  outcomes: [
    'Improved maintainability of core application logic through migration to modern .NET Core-based architecture.',
    'Reduced dependency on aging legacy technology, lowering long-term maintenance burden and platform risk.',
    'Stronger technical structure for future evolution, with cleaner service boundaries and more supportable implementation patterns.',
    'Better foundation for integration and continued modernization across the SSB system landscape.',
    'Improved quality and confidence during migration and release processes through structured testing and validation.',
    'Stronger long-term sustainability for business-critical systems in a demanding public-sector environment.',
  ],

  capabilities: [
    'Legacy system modernization and architecture renewal',
    'Java-to-.NET Core migration support',
    'Maintainable backend service redevelopment',
    'Business logic preservation through migration',
    'API-based integration between legacy and modern components',
    'Regression testing and migration quality assurance',
    'Deployment support and transition management',
    'Scalable foundation for future public-sector development',
    'Technical consulting on modernization strategy and delivery quality',
  ],

  heroImage: {
    alt: 'Illustration of a public-sector legacy modernization platform showing migration from Java-based systems to modern .NET Core architecture.',
    brief:
      'Create a premium enterprise hero image representing modernization of legacy public-sector systems, showing a transition from older technology to a modern, maintainable digital architecture. Communicate renewal, stability, structured migration, and government-grade reliability. Include subtle legacy-to-modern transition cues, connected backend/service modules, public-sector enterprise system overlays, and structured architecture visuals. Mood: stable, modernizing, reliable, structured, enterprise-public-sector. Blue/slate/white palette. Avoid outdated server-room clichés, dramatic old-vs-new split effects, flashy startup aesthetics, or generic corporate stock scenes.',
  },

  architectureDiagram: {
    title: 'SSB — Legacy Modernization and Java-to-.NET Core Migration Architecture',
    brief:
      'Layered enterprise diagram showing before/after migration structure: Users (Internal users, Administrators, Analysts, Operational stakeholders) → Interfaces/Channels (Existing interfaces, Internal systems, Connected service consumers) → Modernized Application Services (.NET Core services, Renewed business logic, Service modules, Modern backend) → Transition/Integration Layer (APIs, Legacy connectors, Migration support services) → Data Layer (SQL Server, Legacy Java components, Operational data, Reporting/historical data) → Infrastructure/Delivery (Azure/hosting, Testing layer, Deployment support, Monitoring). Blue/slate/white palette with clear separation between legacy and target architecture.',
    layers: [
      {
        name: 'Users',
        components: [
          'Internal Users',
          'Administrators',
          'Analysts',
          'Operational Stakeholders',
        ],
      },
      {
        name: 'Interfaces & Channels',
        components: [
          'Existing Interfaces',
          'Internal Systems',
          'Connected Service Consumers',
          'Operational Views',
        ],
      },
      {
        name: 'Modernized Services (.NET Core)',
        components: [
          '.NET Core Services',
          'Renewed Business Logic',
          'Service Modules',
          'Modern Backend Components',
        ],
      },
      {
        name: 'Transition & Integration Layer',
        components: [
          'APIs',
          'Legacy Connectors',
          'Migration Support Services',
          'Enterprise Integration',
        ],
      },
      {
        name: 'Data Layer',
        components: [
          'SQL Server',
          'Legacy Java Components',
          'Operational Data',
          'Reporting & Historical Data',
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
    title: 'SSB Case Study | Xala',
    description:
      'See how Xala supported SSB with legacy modernization, Java-to-.NET Core migration, architecture renewal, testing, and maintainable public-sector system delivery.',
  },

  card: {
    title: 'SSB',
    excerpt:
      'Modernizing legacy public-sector systems through Java-to-.NET Core migration, structured architecture renewal, and maintainable enterprise delivery.',
  },
  translations: {
    no: {
      subtitle: 'Modernisering av arvede offentlige systemer gjennom arkitekturfornyelse, plattformmigrering og vedlikeholdbar .NET Core-leveranse',
      summary: 'Statistisk sentralbyrå (SSB) er avhengig av robuste og vedlikeholdbare digitale systemer for å støtte kritiske offentlige funksjoner. Xala bidro til moderniseringsarbeid fokusert på fornying av eldre systemer — inkludert migrering fra Java-baserte løsninger til .NET Core — og hjalp med å forbedre vedlikeholdbarhet, skalerbarhet og langsiktig teknisk bærekraft.',
      challenge: [
        'Eldre Java-baserte systemer hadde høy teknisk gjeld som kompliserte vedlikehold og videreutvikling.',
        'Migrering av kritiske statistikksystemer krever nulltoleransetilnærming til datatap og funksjonell regresjon.',
        'Komplekse datarørledninger og statistiske arbeidsflyter måtte bevares gjennom migreringsprosessen.',
        'Behov for modernisert arkitektur som støtter kontinuerlig levering og DevOps-praksis.',
        'Offentlig sektors krav til sikkerhet, revisjon og datastyring i et Azure-skybasert miljø.',
      ],
      objectives: [
        'Migrere eldre Java-applikasjoner til .NET Core-plattformen',
        'Fornye arkitektur for forbedret vedlikeholdbarhet og skalerbarhet',
        'Bevare datafunksjonalitet og statistisk nøyaktighet gjennom migreringsprosessen',
        'Forbedre CI/CD-kapasiteter og støtte for DevOps-praksis',
        'Styrke langsiktig teknisk bærekraft for offentlige dataplatformer',
      ],
      solution: {
        overview: 'Arbeidet fokuserte på planmessig migrering av eldre Java-systemer til .NET Core, med arkitekturfornyelse og CI/CD-forbedringer. Xala bidro til analyse, migrering og testing — og sikret funksjonell paritet og forbedret vedlikeholdbarhet gjennom moderniseringsprosessen.',
      },
      outcomes: [
        'Eldre Java-systemer migrert til .NET Core med bevart funksjonalitet.',
        'Forbedret vedlikeholdbarhet og redusert teknisk gjeld.',
        'Modernisert arkitektur som støtter kontinuerlig levering.',
        'Styrket langsiktig teknisk bærekraft for SSBs digitale plattform.',
      ],
      card: { excerpt: 'Modernisering av arvede offentlige systemer gjennom Java-til-.NET Core-migrering, strukturert arkitekturfornyelse og vedlikeholdbar enterprise-leveranse.' },
      seo: { description: 'Se hvordan Xala støttet SSB med Java-til-.NET Core-migrering, arkitekturfornyelse og modernisering av offentlige systemer.' },
    },
    ar: {
      subtitle: 'تحديث الأنظمة الحكومية القديمة من خلال تجديد الهندسة المعمارية وترحيل المنصة وتقديم .NET Core القابل للصيانة',
      summary: 'تعتمد SSB (الإحصاء النرويجي) على أنظمة رقمية قوية وقابلة للصيانة لدعم الوظائف الحكومية الحيوية. ساهمت Xala في عمل التحديث المركّز على تجديد الأنظمة القديمة، بما في ذلك الترحيل من حلول Java إلى .NET Core.',
      outcomes: [
        'ترحيل أنظمة Java القديمة إلى .NET Core مع الحفاظ على الوظائف.',
        'تحسين قابلية الصيانة وتقليل الديون التقنية.',
        'بنية حديثة تدعم التسليم المستمر.',
        'تعزيز الاستدامة التقنية طويلة الأمد للمنصة الرقمية لـ SSB.',
      ],
      card: { excerpt: 'تحديث الأنظمة الحكومية القديمة من خلال ترحيل Java إلى .NET Core وتجديد الهندسة المعمارية وتسليم مؤسسي قابل للصيانة.' },
      seo: { description: 'اكتشف كيف دعمت Xala SSB بترحيل Java إلى .NET Core وتجديد الهندسة المعمارية وتحديث الأنظمة الحكومية.' },
    },
  },
};
