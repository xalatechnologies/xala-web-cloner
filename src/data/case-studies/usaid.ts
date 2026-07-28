import type { CaseStudy } from '@/types/caseStudy';

export const usaidCaseStudy: CaseStudy = {
  slug: 'usaid-digital-development-platform',
  title: 'USAID',
  subtitle:
    'Supporting digital development workflows, reporting, and coordinated service delivery in an international program environment',
  client: 'USAID',
  industry: 'International Development / Digital Public Services / Enterprise Technology',
  sector: 'NGO / International',
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
    'International development program workflows',
    'Structured reporting & decision support',
    'Cross-organization coordination platform',
    'API-based service integrations',
    'Secure data handling for sensitive programs',
  ],
  coreTechnologies: [
    'React & TypeScript',
    '.NET & C#',
    'Microsoft Azure',
    'SQL Server',
    'REST APIs',
    'Reporting dashboards',
  ],
  logoUrl: '/clients/usaid.png',
  imageUrl: '/clients/usaid.png',

  summary:
    'USAID-related digital platforms must support structured workflows, reporting, and coordination across complex international development contexts. Xala contributed through architecture, development, integrations, testing, and deployment support — helping strengthen maintainable digital services for international development and program operations.',

  challenge: [
    'Multi-stakeholder program coordination requiring structured digital workflows and reliable information flows.',
    'Structured reporting and decision-support needs across distributed international development programs.',
    'Reliable integrations across services and operational systems in complex cross-organizational contexts.',
    'Requirement for maintainable platform architecture suited to evolving program requirements.',
    'Need for secure and scalable digital foundations supporting sensitive program data.',
    'Supporting operational visibility and coordination across international development workflows.',
  ],

  objectives: [
    'Strengthen digital program workflows and operational coordination capabilities',
    'Improve reporting and decision-support tooling for international development programs',
    'Support maintainable backend and frontend architecture for long-term platform evolution',
    'Improve long-term scalability and delivery quality',
    'Provide reliable integrations across program services and data sources',
  ],

  solution: {
    overview:
      'The work centred on delivering digital workflow support, backend services, reporting capabilities, and integrations in a USAID international development context. Xala contributed as an architecture, development, and integration partner — helping improve technical structure, service connectivity, and scalable delivery support for program-oriented digital services.',
    modules: [
      'Digital program workflow support and coordination',
      'Reporting and decision-support dashboards',
      'Backend service logic for program operations',
      'API-based integration between systems and services',
      'Data handling and structured information flows',
      'Operational visibility and monitoring',
      'Testing and deployment support',
    ],
    users: [
      'Program managers and coordinators',
      'Reporting and analytics teams',
      'Administrators and IT teams',
      'Partner organizations and stakeholders',
    ],
  },

  architecture: {
    presentation: [
      'Program workflow interfaces',
      'Reporting and analytics dashboards',
      'Administration and coordination tools',
      'Operational status views',
    ],
    services: [
      '.NET backend services',
      'Workflow and program logic',
      'Reporting and data services',
      'Coordination and integration logic',
    ],
    integrations: [
      'Program system APIs',
      'Reporting service connectors',
      'Data source integrations',
      'Operational platform connections',
    ],
    data: [
      'SQL Server (program data, workflow records)',
      'Reporting and analytics data',
      'Operational and coordination data',
    ],
    infrastructure: [
      'Microsoft Azure',
      'Enterprise hosting and deployment support',
      'Operational monitoring infrastructure',
    ],
    security: [
      'Access control for program data and workflows',
      'Secure API communication',
      'Data integrity for sensitive program information',
      'Compliance-aware implementation',
    ],
  },

  technologies: {
    frontend: ['React', 'TypeScript', 'Reporting dashboards', 'Workflow interfaces'],
    backend: ['.NET', 'C#', 'Program workflow services', 'Reporting logic'],
    databases: ['SQL Server', 'Program and workflow data', 'Reporting data store'],
    cloud: ['Microsoft Azure', 'Enterprise hosting'],
    integrations: ['REST APIs', 'Program system connectors', 'Reporting service integrations'],
    devops: ['Functional testing', 'Deployment support', 'Operational monitoring'],
  },

  integrationHighlights: [
    'REST APIs — Structured integration between USAID platform services and program data sources',
    '.NET Backend Services — Core workflow and reporting logic for international development program support',
    'React / TypeScript Frontend — Reporting dashboards and workflow interfaces for program coordinators and stakeholders',
    'Azure Infrastructure — Scalable and reliable hosting foundation for international development digital services',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description: 'Program workflow needs, reporting requirements, and integration scope were analyzed and structured.',
    },
    {
      phase: 'Architecture',
      description: 'Solution architecture was defined covering workflow services, reporting capabilities, and integration patterns.',
    },
    {
      phase: 'Development',
      description: 'Backend services, reporting tools, and workflow support capabilities were implemented.',
    },
    {
      phase: 'Integration',
      description: 'Program systems and reporting services were connected and validated for reliable operation.',
    },
    {
      phase: 'Testing',
      description: 'Quality assurance improved correctness, reliability, and operational readiness across program workflows.',
    },
    {
      phase: 'Deployment and Stabilization',
      description: 'The engagement contributed to a stronger digital foundation for USAID program delivery and operational coordination.',
    },
  ],

  outcomes: [
    'Stronger digital structure for program delivery with improved workflow coordination.',
    'Improved reporting and decision-support capabilities for international development operations.',
    'Better technical maintainability supporting continued platform evolution.',
    'Improved readiness for future growth and service expansion across development programs.',
  ],

  capabilities: [
    'Digital program workflow support',
    'Reporting and dashboard capabilities',
    'Backend service development',
    'API-based integration',
    'Scalable international development platform foundation',
    'Secure data handling',
    'Testing and deployment support',
    'Technical consulting in international contexts',
  ],

  heroImage: {
    alt: 'Illustration of an international development digital platform with program workflows, reporting dashboards, and coordinated service delivery.',
    brief:
      'Premium enterprise-humanitarian hero image representing international development digital services, program coordination, and structured reporting platforms. Include workflow interface overlays, reporting dashboard cues, connected service modules. Mood: structured, reliable, impactful, professional. Blue/slate/sand palette. Avoid generic aid imagery.',
  },

  architectureDiagram: {
    title: 'USAID — Digital Development and International Program Support Architecture',
    brief:
      'Layered diagram: Users (Program managers, Reporting teams, Admins, Partners) → Interfaces (Workflow views, Reporting dashboards, Admin tools) → Application Services (.NET, React/TypeScript, Reporting logic) → Integration Layer (APIs, Program connectors) → Data Layer (SQL Server, Reporting data) → Infrastructure (Azure). Professional international development aesthetic.',
    layers: [
      { name: 'Users', components: ['Program Managers', 'Reporting Teams', 'Administrators', 'Partner Organizations'] },
      { name: 'Interfaces', components: ['Program Workflows', 'Reporting Dashboards', 'Admin Tools', 'Coordination Views'] },
      { name: 'Application Services', components: ['.NET Backend Services', 'Workflow Logic', 'Reporting Services', 'React/TypeScript Frontend'] },
      { name: 'Integration Layer', components: ['REST APIs', 'Program System Connectors', 'Reporting Integrations', 'Data Sources'] },
      { name: 'Data Layer', components: ['SQL Server', 'Program Data', 'Reporting Data', 'Operational Records'] },
      { name: 'Infrastructure', components: ['Azure Hosting', 'Testing', 'Deployment Support', 'Monitoring'] },
    ],
  },

  seo: {
    title: 'USAID Case Study | Xala',
    description:
      'See how Xala supported USAID with digital development platform services, program workflow support, reporting capabilities, and international development digital services.',
  },

  card: {
    title: 'USAID',
    excerpt:
      'Supporting digital development workflows, reporting, and coordinated service delivery in an international program environment.',
  },
  translations: {
    no: {
      subtitle: 'Støtte for digitale utviklingsarbeidsflyter, rapportering og koordinert tjenesteleveranse i et internasjonalt programdriftsmiljø',
      summary: 'USAID-relaterte digitale plattformer må støtte strukturerte arbeidsflyter, rapportering og koordinering på tvers av komplekse internasjonale bistandskontekster. Xala bidro gjennom arkitektur, utvikling, integrasjoner, testing og utrullingsstøtte — og hjalp med å styrke vedlikeholdbare digitale tjenester for internasjonal bistand og programdrift.',
      challenge: [
        'Koordinering av flerestakeholder-programmer som krever strukturerte digitale arbeidsflyter og pålitelige informasjonsflyter.',
        'Strukturerte rapporterings- og beslutningsstøttebehov på tvers av distribuerte internasjonale bistandsprogrammer.',
        'Pålitelige integrasjoner på tvers av tjenester og operasjonssystemer i komplekse tverorganisasjonelle kontekster.',
        'Krav om vedlikeholdbar plattformarkitektur tilpasset utviklende programkrav.',
        'Behov for sikker og skalerbar digital grunnlag som støtter sensitive programdata.',
      ],
      objectives: [
        'Styrke digitale programarbeidsflyter og driftskoordineringskapasiteter',
        'Forbedre rapporterings- og beslutningsstøtteverktøy for internasjonale bistandsprogrammer',
        'Støtte vedlikeholdbar backend- og frontend-arkitektur for langsiktig plattformutvikling',
        'Forbedre langsiktig skalerbarhet og leveringskvalitet',
        'Gi pålitelige integrasjoner på tvers av programtjenester og datakilder',
      ],
      solution: {
        overview: 'Arbeidet fokuserte på å levere digital arbeidsflyttstøtte, backend-tjenester, rapporteringskapasiteter og integrasjoner i en USAID internasjonal bistandskontekst. Xala bidro som arkitektur-, utvikling- og integrasjonspartner — og hjalp med å forbedre teknisk struktur, tjenestetilkobling og skalerbar leveransstøtte.',
      },
      outcomes: [
        'Sterkere digital struktur for programleveranse med forbedret arbeidsflytkoordinering.',
        'Forbedrede rapporterings- og beslutningsstøttekapasiteter for internasjonale bistandsoperasjoner.',
        'Bedre teknisk vedlikeholdbarhet som støtter fortsatt plattformutvikling.',
        'Forbedret beredskap for fremtidig vekst på tvers av bistandsprogrammer.',
      ],
      card: { excerpt: 'Støtte for digitale utviklingsarbeidsflyter, rapportering og koordinert tjenesteleveranse i et internasjonalt programdriftsmiljø.' },
      seo: { description: 'Se hvordan Xala støttet USAID med digitale utviklingsplattformtjenester, programarbeidsflyttstøtte og internasjonal bistandsleveranse.' },
    },
    ar: {
      subtitle: 'دعم سير عمل التنمية الرقمية والتقارير وتقديم الخدمات المنسقة في بيئة تشغيل برامج دولية',
      summary: 'يجب أن تدعم المنصات الرقمية المتعلقة بـ USAID سير العمل المنظم والتقارير والتنسيق عبر سياقات التنمية الدولية المعقدة. ساهمت Xala من خلال الهندسة والتطوير والتكاملات والاختبار ودعم النشر.',
      challenge: [
        'تنسيق البرامج متعددة أصحاب المصلحة الذي يتطلب سير عمل رقمي منظم وتدفقات معلومات موثوقة.',
        'احتياجات التقارير المنظمة ودعم القرار عبر برامج التنمية الدولية الموزعة.',
        'تكاملات موثوقة عبر الخدمات والأنظمة التشغيلية في سياقات معقدة عبر المنظمات.',
        'متطلبات بنية منصة قابلة للصيانة مناسبة للمتطلبات البرنامجية المتطورة.',
        'الحاجة إلى أساس رقمي آمن وقابل للتوسع يدعم بيانات البرنامج الحساسة.',
      ],
      outcomes: [
        'بنية رقمية أقوى لتسليم البرامج مع تحسين تنسيق سير العمل.',
        'تحسين قدرات التقارير ودعم القرار للعمليات الإنمائية الدولية.',
        'قابلية صيانة تقنية أفضل تدعم التطوير المستمر للمنصة.',
        'تحسين الاستعداد للنمو المستقبلي عبر البرامج الإنمائية.',
      ],
      card: { excerpt: 'دعم سير عمل التنمية الرقمية والتقارير وتقديم الخدمات المنسقة في بيئة تشغيل برامج دولية.' },
      seo: { description: 'اكتشف كيف دعمت Xala USAID بخدمات المنصة الرقمية للتنمية ودعم سير عمل البرامج وتسليم الخدمات الإنمائية الدولية.' },
    },
  },
};
