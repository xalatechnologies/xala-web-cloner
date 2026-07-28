import type { CaseStudy } from '@/types/caseStudy';

export const sykehuspartnerCaseStudy: CaseStudy = {
  slug: 'sykehuspartner-forskningsportal',
  title: 'Sykehuspartner',
  subtitle:
    'Delivering a modern research and collaboration platform for healthcare through SharePoint, SPFx, .NET Core, and Azure integrations',
  client: 'Sykehuspartner',
  industry: 'Healthcare / Public Sector / Enterprise Technology',
  sector: 'Healthcare / public sector',
  deliveryModel: 'Research portal and collaboration platform delivery',
  duration: '18 months',
  budget: 'NOK 3–5M',
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
  logoUrl: '/clients/sykehuspartner.svg',
  imageUrl: '/clients/sykehuspartner.svg',

  summary:
    'Sykehuspartner supports critical digital services for the Norwegian healthcare sector, where secure collaboration, structured information management, and reliable integrations are essential. Xala contributed to the development of a modern research portal and healthcare collaboration capabilities through SharePoint, SPFx, .NET Core APIs, and Azure-based integrations, helping create a stronger platform for research-related workflows and digital cooperation.',

  challenge: [
    'Fragmented access to research-related information across teams and systems that were not originally designed to work together seamlessly.',
    'Limited structure for collaboration across healthcare professionals, researchers, and administrators with different responsibilities and access needs.',
    'Need for modern user experiences on top of established Microsoft platforms without disrupting existing operational workflows.',
    'Requirement for secure custom APIs and integration logic that go beyond standard SharePoint capabilities.',
    'Balancing usability with healthcare-related expectations for stability, control, and auditability.',
    'Creating a scalable and maintainable platform foundation that supports future growth and evolution in a regulated environment.',
  ],

  objectives: [
    'Modernize healthcare-related collaboration and research workflows through structured digital tooling',
    'Create a more structured and user-friendly research portal built on Microsoft technologies',
    'Enable better integration between SharePoint portal experiences and custom backend services',
    'Support maintainable and scalable architecture aligned with enterprise healthcare expectations',
    'Strengthen information access and collaboration across research stakeholders',
    'Improve the technical foundation for future platform enhancements and extensions',
  ],

  scope: [
    'Healthcare research portal',
    'SharePoint-based collaboration platform',
    'SPFx web parts and extensions',
    '.NET Core APIs for portal capabilities',
    'Azure Function-based backend integrations',
  ],
  coreTechnologies: [
    'SharePoint Online',
    'SPFx (SharePoint Framework)',
    'React in SPFx',
    '.NET Core APIs',
    'Azure Functions',
    'SQL Server and SharePoint data stores',
  ],

  solution: {
    overview:
      'The work centred on building a modern digital collaboration and research support platform in a healthcare context. Xala contributed as an architecture, development, and integration partner — delivering SharePoint-based portal experiences, SPFx components, custom .NET Core APIs, and Azure Function-based integration services that together created a more structured and capable platform for healthcare research and collaboration.',
    modules: [
      'Research portal with structured content and workflow support',
      'SharePoint-based user interfaces and information surfaces',
      'SPFx web part and extension development',
      'Custom .NET Core API layer for portal functionality',
      'Azure Function-based integration and processing services',
      'Collaboration interfaces for researchers and administrators',
      'Structured data services and content management',
      'Backend integration logic connecting portal to enterprise systems',
    ],
    users: [
      'Researchers and research administrators',
      'Healthcare professionals and clinical teams',
      'Internal administrators and platform managers',
      'IT and integration engineering teams',
    ],
  },

  architecture: {
    presentation: [
      'SharePoint portal and modern pages',
      'SPFx web parts and extensions',
      'Collaboration interfaces and research views',
      'Admin and management surfaces',
    ],
    services: [
      '.NET Core APIs for custom portal functionality',
      'Business logic and process support services',
      'Portal support and content services',
      'Notification and workflow event handling',
    ],
    integrations: [
      'Azure Functions for backend processing and integration',
      'API-based service connectors',
      'Workflow support and event handling',
      'Enterprise platform integrations',
    ],
    data: [
      'SQL Server / structured enterprise data services',
      'SharePoint lists and document libraries',
      'Portal state and workflow data',
      'Content metadata and structured information',
    ],
    infrastructure: [
      'Azure-based services and hosting',
      'Microsoft 365 / SharePoint Online',
      'Enterprise hosting and support patterns',
      'Operational monitoring and maintenance',
    ],
    security: [
      'Microsoft 365 identity and access foundation',
      'Role-based access control for portal and services',
      'Secure API layer with authentication',
      'Compliance-aware implementation in healthcare context',
      'Audit logging across critical workflows',
    ],
  },

  technologies: {
    frontend: ['SharePoint', 'SPFx (SharePoint Framework)', 'Modern SharePoint pages', 'React (SPFx)'],
    backend: ['.NET Core', 'C#', 'Custom portal APIs', 'Business logic services'],
    databases: ['SQL Server', 'SharePoint lists and document libraries', 'Structured enterprise data services'],
    cloud: ['Azure Functions', 'Microsoft Azure', 'Microsoft 365 / SharePoint Online'],
    identity: ['Microsoft 365 identity', 'Role-based access control', 'Secure API authentication'],
    integrations: ['Azure Functions', 'Backend API integrations', 'Service connectors', 'Workflow support services'],
    devops: ['Deployment support', 'Testing and validation of components and APIs', 'Operational monitoring'],
  },

  integrationHighlights: [
    'Azure Functions — Backend processing and integration services connecting portal experiences with enterprise systems',
    'SharePoint / Microsoft Graph — Core platform for portal content, user management, and collaboration surfaces',
    'Custom .NET Core APIs — Business-specific logic and data services extending standard SharePoint capabilities',
    'SPFx Extensions — Modern, maintainable client-side components for structured healthcare portal experiences',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Research portal and collaboration needs were clarified with technical and functional scope, including healthcare-specific requirements for stability, access control, and information structure.',
    },
    {
      phase: 'Architecture',
      description:
        'Solution structure was designed across SharePoint, SPFx, custom APIs, and Azure integrations — defining service boundaries, component responsibilities, and integration patterns.',
    },
    {
      phase: 'Development',
      description:
        'SPFx components, SharePoint solutions, and custom .NET Core APIs were implemented, delivering both frontend portal experiences and supporting backend services.',
    },
    {
      phase: 'Integration',
      description:
        'Portal components, APIs, and Azure Function-based services were connected and validated, ensuring reliable communication and correct data flows across the platform.',
    },
    {
      phase: 'Testing',
      description:
        'The solution was tested to strengthen quality, maintainability, and platform readiness — with focus on component behaviour, API correctness, and integration stability.',
    },
    {
      phase: 'Operational Foundation',
      description:
        'The engagement contributed to a stronger digital platform for healthcare research and collaboration, with improved maintainability, scalability, and readiness for future extension.',
    },
  ],

  outcomes: [
    'Improved digital access to research-related content and workflows, replacing fragmented information access with a structured portal experience.',
    'Stronger collaboration support across healthcare professionals, researchers, and administrators through a unified SharePoint-based platform.',
    'Better integration between portal experiences and backend services through custom .NET Core APIs and Azure Functions.',
    'Maintainable and scalable implementation on Microsoft technologies, aligned with enterprise healthcare expectations.',
    'Improved readiness for future extension and modernization with a clean architecture foundation.',
    'More consistent and secure information access across stakeholder groups through role-based portal structure.',
  ],

  capabilities: [
    'Research portal development on Microsoft technologies',
    'SharePoint and SPFx-based user experiences',
    'Custom .NET Core API development',
    'Azure Function-based integrations',
    'Structured healthcare collaboration support',
    'Maintainable Microsoft-platform architecture',
    'Improved information access and workflow structure',
    'Role-based access and secure portal design',
    'Scalable enterprise platform foundation',
    'Technical consulting in healthcare and regulated environments',
  ],

  heroImage: {
    alt: 'Illustration of a healthcare research portal with collaboration tools, SharePoint-based interfaces, APIs, and Azure-powered services.',
    brief:
      'Create a premium enterprise hero image representing a healthcare collaboration and research portal built on Microsoft technologies. Communicate secure collaboration, structured information access, and modern healthcare platform engineering. Include healthcare and research context, portal/dashboard overlays, connected modules or service layers, subtle Microsoft ecosystem cues, and collaboration visuals. Mood: trustworthy, professional, modern, collaborative, healthcare-grade. Blue / teal / slate palette. Avoid generic hospital stock photos, clinical treatment scenes, overly busy medical imagery, or consumer-health app aesthetics.',
  },

  architectureDiagram: {
    title: 'Sykehuspartner — Research Portal and Healthcare Collaboration Architecture',
    brief:
      'Layered enterprise diagram: Users (Researchers, Healthcare professionals, Administrators, Internal stakeholders) → Frontend/Portal (SharePoint portal, SPFx web parts, Collaboration interfaces, Research information views) → Application Services (.NET Core APIs, Business logic services, Portal support services) → Integration Layer (Azure Functions, API integrations, Service connectors, Workflow support) → Data Layer (SQL Server, Portal data, Workflow data, Content and metadata) → Operations/Platform (Enterprise hosting, Monitoring, Maintenance, Scalability support). Clean Microsoft-platform-inspired architecture with teal/blue palette.',
    layers: [
      {
        name: 'Users',
        components: [
          'Researchers',
          'Healthcare Professionals',
          'Administrators',
          'Internal Stakeholders',
        ],
      },
      {
        name: 'Frontend & Portal',
        components: [
          'SharePoint Portal',
          'SPFx Web Parts',
          'Collaboration Interfaces',
          'Research Information Views',
        ],
      },
      {
        name: 'Application Services',
        components: [
          '.NET Core APIs',
          'Business Logic Services',
          'Portal Support Services',
          'Workflow Handling',
        ],
      },
      {
        name: 'Integration Layer',
        components: [
          'Azure Functions',
          'API Integrations',
          'Service Connectors',
          'Workflow Support',
        ],
      },
      {
        name: 'Data Layer',
        components: [
          'SQL Server',
          'Portal Data',
          'Workflow Data',
          'Content & Metadata',
        ],
      },
      {
        name: 'Operations & Platform',
        components: [
          'Enterprise Hosting',
          'Monitoring',
          'Maintenance',
          'Scalability Support',
        ],
      },
    ],
  },

  seo: {
    title: 'Sykehuspartner Case Study | Xala',
    description:
      'See how Xala supported Sykehuspartner with a research portal, SharePoint and SPFx development, .NET Core APIs, Azure integrations, and healthcare collaboration platform modernization.',
  },

  card: {
    title: 'Sykehuspartner',
    excerpt:
      'Modernizing healthcare collaboration and research workflows through SharePoint, SPFx, .NET Core APIs, and Azure integrations.',
  },
  translations: {
    no: {
      subtitle: 'Modernisering av arbeidsflyt for helsesamarbeid og forskning via SharePoint, SPFx, .NET Core API-er og Azure-integrasjoner',
      summary: 'Sykehuspartner støtter et bredt nettverk av norske sykehus og helseforetak med IKT-tjenester. Xala bidro til modernisering av SharePoint-baserte samarbeid og forskningsportaler, og implementerte SPFx-webdeler, .NET Core API-er og Azure-integrasjoner for å forbedre intern arbeidsflyt og klinisk samarbeid.',
      challenge: [
        'Fragmentert informasjonshåndtering på tvers av sykehusavdelinger og helseforetak reduserte samarbeidseffektiviteten.',
        'Legacy SharePoint-løsninger trengte modernisering til SPFx og moderne API-mønstre uten å forstyrre daglig klinisk drift.',
        'Sikkerhetsintegrasjoner måtte møte helsesektorens krav til databeskyttelse og tilgangskontroll.',
        'Forskningsportal arbeidsflyt trengte å forene data fra multiple kilder — kliniske systemer, HR og administrativ data.',
        'Kontinuitetskrav i en helse-IKT-kontekst der nedetid direkte påvirker sykehusoperasjoner.',
      ],
      objectives: [
        'Modernisere SharePoint-portaler med SPFx-webdeler og moderne React-baserte grensesnitt',
        'Levere .NET Core API-lag for sikker backend-dataintegrasjon',
        'Forbedre samarbeidsarbeidsflyt for kliniske og administrative team',
        'Implementere Azure-baserte integrasjoner med sykehus-IKT-systemer',
        'Styrke informasjonskvalitet og tilgjengelighet for helseforskningsmiljøer',
      ],
      solution: {
        overview: 'Arbeidet fokuserte på modernisering av SharePoint-plattformkomponenter med SPFx-webdeler, levering av .NET Core API-lag og integrering av Azure-tjenester for å støtte Sykehuspartners samarbeid og forskningsportalbehov. Xala bidro til arkitektur, utvikling og integrasjonsarbeid.',
      },
      outcomes: [
        'Moderniserte SharePoint-portaler med SPFx-webdeler som forbedrer brukeropplevelse for kliniske team.',
        'Forbedret backend-dataintegritet via .NET Core API-lag koblet til Azure-tjenester.',
        'Sterkere samarbeidsarbeidsflyt for helseforsknings- og administrative team.',
        'Bedre vedlikeholdbarhet for plattformutvikling i en helse-IKT-sammenheng.',
      ],
      card: { excerpt: 'Modernisering av samarbeid og forskningsarbeidsflyt i helsevesenet via SharePoint, SPFx, .NET Core API-er og Azure-integrasjoner.' },
      seo: { description: 'Se hvordan Xala moderniserte Sykehuspartners helsesamarbeid og forskningsportaler med SharePoint SPFx, .NET Core og Azure-integrasjoner.' },
    },
    ar: {
      subtitle: 'تحديث سير عمل التعاون والبحث في الرعاية الصحية عبر SharePoint وSPFx وواجهات برمجة تطبيقات .NET Core وتكاملات Azure',
      summary: 'تدعم Sykehuspartner شبكة واسعة من المستشفيات والمؤسسات الصحية النرويجية بخدمات تقنية المعلومات. ساهمت Xala في تحديث بوابات التعاون والبحث المستندة إلى SharePoint.',
      outcomes: [
        'بوابات SharePoint المحدّثة بمكونات الويب SPFx التي تحسن تجربة المستخدم لفرق العيادات.',
        'تحسين نزاهة بيانات الخلفية عبر طبقة واجهة برمجة تطبيقات .NET Core المرتبطة بخدمات Azure.',
        'سير عمل تعاون أقوى لفرق أبحاث الرعاية الصحية والإدارية.',
        'قابلية صيانة أفضل لتطوير المنصة في سياق تقنية معلومات الرعاية الصحية.',
      ],
      card: { excerpt: 'تحديث سير عمل التعاون والبحث في الرعاية الصحية عبر SharePoint وSPFx وواجهات برمجة تطبيقات .NET Core وتكاملات Azure.' },
      seo: { description: 'اكتشف كيف حدّثت Xala بوابات التعاون والبحث في Sykehuspartner باستخدام SharePoint SPFx و.NET Core وتكاملات Azure.' },
    },
  },
};
