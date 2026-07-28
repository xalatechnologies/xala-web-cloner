import type { CaseStudy } from '@/types/caseStudy';

export const unicefLiberiaCaseStudy: CaseStudy = {
  slug: 'unicef-liberia-child-protection-registration-reintegration',
  title: 'UNICEF Liberia',
  subtitle:
    'Delivering a secure platform for child protection, registration, anti-trafficking support, and reintegration workflows',
  client: 'UNICEF Liberia',
  industry: 'International Development / Humanitarian Technology / Child Protection',
  sector: 'NGO / International',
  deliveryModel: 'Consultancy delivery',
  duration: '12–24 months',
  budget: 'Confidential',
  status: 'Delivered',
  scope: [
    'Child protection',
    'Birth registration',
    'Anti-trafficking support',
    'Vulnerable child case workflows',
    'Demobilization and reintegration support',
    'Humanitarian reporting',
    'Multi-agency coordination',
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
    'Reporting services',
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
    'In child-protection programs, digital platforms must support sensitive case handling, reliable coordination, and long-term follow-up for vulnerable children. Xala contributed to a UNICEF Liberia solution supporting birth registration, child protection workflows, anti-trafficking support, and demobilization and reintegration processes for children associated with armed groups, helping establish a structured digital foundation for coordination, reporting, and protection-focused service delivery.',

  challenge: [
    'Child-protection stakeholders faced fragmented child-related data and inconsistent records across services and institutions.',
    'It was difficult to track vulnerable children across different interventions, programmes, and time periods.',
    'Existing tools provided limited digital support for structured protection case handling and follow-up.',
    'Anti-trafficking work required better support for identification, follow-up, and coordinated responses.',
    'Demobilization and reintegration processes for children associated with armed groups needed more reliable workflow and status tracking.',
    'Reporting and monitoring were constrained by limited structure and consolidation of child-protection data.',
    'Sensitive child-protection information required secure and controlled access aligned with protection principles.',
    'The platform needed to be maintainable and scalable as humanitarian programme demands evolved over time.',
  ],

  objectives: [
    'Strengthen birth registration and identity-related workflows.',
    'Support structured child-protection case handling and follow-up.',
    'Improve identification and long-term follow-up of vulnerable children.',
    'Enable digital support for anti-trafficking case processes.',
    'Support demobilization, rehabilitation, and reintegration workflows for children associated with armed groups.',
    'Improve monitoring, reporting, and cross-stakeholder visibility for child-protection programmes.',
    'Strengthen secure management of sensitive child-related data.',
    'Build a scalable and maintainable humanitarian platform foundation.',
  ],

  solution: {
    overview:
      'The solution was delivered as a child protection, registration, and reintegration platform supporting registration, case management, anti-trafficking support, and reintegration-related workflows. Xala contributed to architecture, development, integration, testing, and deployment support to help UNICEF Liberia establish a secure and structured platform for vulnerable child services.',
    modules: [
      'Registration workflows for birth and identity-related information',
      'Child protection case-management module',
      'Vulnerable child identification and follow-up workflows',
      'Anti-trafficking case support workflows',
      'Demobilization and reintegration workflow support for children associated with armed groups',
      'Reporting and monitoring module for humanitarian programmes',
      'Multi-agency coordination and case overview capabilities',
    ],
    users: [
      'Field workers and child-protection teams',
      'UNICEF Liberia programme staff and coordinators',
      'Partner organizations involved in child protection and reintegration work',
      'Administrators and analysts responsible for reporting and oversight',
    ],
  },

  architecture: {
    presentation: [
      'Web-based interfaces for registration, case handling, and reporting',
      'Role-specific views for field workers, coordinators, and administrators',
      'Structured workflows for protection, anti-trafficking, and reintegration processes',
    ],
    services: [
      '.NET backend services supporting registration and child-protection workflows',
      'Case-management logic for vulnerable child follow-up and status tracking',
      'Validation and business rules for sensitive case flows',
      'Reporting services for programme indicators and operational monitoring',
    ],
    integrations: [
      'APIs for communication between platform modules',
      'Authentication services for secure access control',
      'Reporting and coordination services connecting to humanitarian endpoints where appropriate',
    ],
    data: [
      'SQL Server for registration and protection case data',
      'Structured storage for workflow state, follow-up status, and intervention records',
      'Reporting and audit datasets supporting oversight and accountability',
    ],
    infrastructure: [
      'Azure-based hosting for scalability and operational stability',
      'Testing and deployment infrastructure supporting humanitarian operations',
      'Monitoring and operational readiness capabilities',
    ],
    security: [
      'Role-based access control for sensitive child-protection data',
      'Controlled visibility for different user groups and agencies',
      'Audit-friendly logging and data-protection practices suitable for humanitarian contexts',
    ],
  },

  technologies: {
    frontend: ['React', 'TypeScript'],
    backend: ['.NET'],
    databases: ['SQL Server'],
    cloud: ['Azure'],
    identity: ['Authentication services', 'Role-based authorization'],
    integrations: ['APIs', 'Reporting and coordination services'],
    devops: ['Monitoring', 'Backup and recovery routines', 'Release and configuration management'],
  },

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Registration, child-protection, anti-trafficking, and reintegration workflows were analysed and translated into structured platform requirements together with UNICEF and partners.',
    },
    {
      phase: 'Architecture',
      description:
        'Solution architecture was defined to support secure case handling, reporting, and long-term maintainability across registration, protection, and reintegration processes.',
    },
    {
      phase: 'Development',
      description:
        'Frontend and backend services were implemented for child-related workflows, including registration, protection cases, anti-trafficking support, and reintegration tracking.',
    },
    {
      phase: 'Integration',
      description:
        'Platform modules and connected services were integrated and validated for reliable data flow, role-based access, and case progression.',
    },
    {
      phase: 'Testing',
      description:
        'Quality assurance strengthened correctness, usability, and trust in sensitive humanitarian workflows and reporting outputs.',
    },
    {
      phase: 'Deployment and Stabilization',
      description:
        'The engagement supported rollout and long-term operational readiness for child-protection and reintegration operations in Liberia.',
    },
  ],

  outcomes: [
    'Improved structure for registration and protection workflows in a humanitarian and development setting.',
    'Stronger support for vulnerable-child follow-up and case tracking across services and programmes.',
    'Better digital support for anti-trafficking and reintegration processes involving children associated with armed groups.',
    'Improved reporting and coordination across humanitarian stakeholders working with vulnerable children.',
    'Stronger security and control around sensitive child-related information through role-based access and audit-friendly design.',
    'Better long-term maintainability for humanitarian digital services through scalable architecture and modern technologies.',
  ],

  capabilities: [
    'Digital birth registration workflows',
    'Child protection case-management support',
    'Vulnerable child identification and follow-up',
    'Anti-trafficking workflow support',
    'Demobilization and reintegration process support',
    'Reporting and monitoring for humanitarian programmes',
    'Secure role-based access and case-data handling',
    'Multi-agency coordination support',
    'Maintainable and scalable humanitarian platform architecture',
  ],

  heroImage: {
    alt: 'Illustration of a humanitarian digital platform for child protection, registration, anti-trafficking support, and reintegration workflows.',
    brief:
      'Create a premium humanitarian-enterprise hero image representing a digital platform for child protection, registration, anti-trafficking support, and reintegration workflows. Show abstract case-management and reporting interfaces, registration and identity cues, and connected humanitarian service modules. Use a calm blue / green / slate / sand palette and a dignified, protective visual tone. Avoid distressing imagery or generic charity campaign visuals.',
  },

  architectureDiagram: {
    title: 'UNICEF Liberia – Child Protection, Registration, and Reintegration Platform Architecture',
    brief:
      'Layered architecture diagram: Users (Field workers, Child-protection teams, Coordinators, Administrators, Partner stakeholders) → Frontend Workflows (Registration portal, Child protection case workflows, Anti-trafficking support views, Reintegration tracking interfaces, Reporting dashboards) → Application Services (.NET backend services, Case-management logic, Validation services, Workflow orchestration, Reporting services) → Integration Layer (APIs, Authentication services, Reporting connectors, Supporting agency/system integrations) → Data Layer (SQL Server, Registration records, Protection case data, Workflow state, Reporting and audit data) → Infrastructure / Delivery (Azure hosting, Testing layer, Deployment support, Monitoring / operational readiness).',
    layers: [
      {
        name: 'Users',
        components: ['Field Workers', 'Child-Protection Teams', 'Coordinators', 'Administrators', 'Partner Stakeholders'],
      },
      {
        name: 'Frontend Workflows',
        components: [
          'Registration Portal',
          'Child Protection Case Workflows',
          'Anti-Trafficking Support Views',
          'Reintegration Tracking Interfaces',
          'Reporting Dashboards',
        ],
      },
      {
        name: 'Application Services',
        components: ['.NET Backend Services', 'Case-Management Logic', 'Validation Services', 'Workflow Orchestration', 'Reporting Services'],
      },
      {
        name: 'Integration Layer',
        components: ['APIs', 'Authentication Services', 'Reporting Connectors', 'Supporting Agency/System Integrations'],
      },
      {
        name: 'Data Layer',
        components: ['SQL Server', 'Registration Records', 'Protection Case Data', 'Workflow State', 'Reporting & Audit Data'],
      },
      {
        name: 'Infrastructure / Delivery',
        components: ['Azure Hosting', 'Testing Layer', 'Deployment Support', 'Monitoring / Operational Readiness'],
      },
    ],
  },

  seo: {
    title: 'UNICEF Liberia Case Study | Xala',
    description:
      'See how Xala supported UNICEF Liberia with a child protection, registration, and reintegration platform covering anti-trafficking workflows, reporting, and secure humanitarian case management.',
  },

  card: {
    title: 'UNICEF Liberia',
    excerpt:
      'Delivering a secure platform for child protection, registration, anti-trafficking support, and reintegration workflows in a humanitarian context.',
  },
  translations: {
    no: {
      subtitle: 'Leveranse av en sikker plattform for barnebeskyttelse, registrering, støtte mot menneskehandel og reintegrasjonsarbeidsflyter i en humanitær kontekst',
      summary: 'I Liberia arbeider UNICEF med barnebeskyttelse, anti-trafficking og reintegrasjonsprogrammer i et krevende humanitært miljø. Xala bidro til en sikker plattform som støtter disse programmene digitalt — med strukturerte saksarbeidsflyter, registreringsprosesser og koordinering mellom UNICEF, myndigheter og lokale beskyttelsespartnere.',
      challenge: [
        'Barn i risiko for menneskehandel krever hurtig identifikasjon og koordinert beskyttelsesrespons på tvers av organisasjoner.',
        'Reintegrasjonsprogrammer innebærer komplekse flerfase arbeidsflyter som krever strukturert digital saksoppfølging.',
        'Sensitive data om trafficking-ofre og sårbare barn krever sterke sikkerhetskontroller og begrenset tilgang.',
        'Koordinering mellom UNICEF, regjeringen og lokale partnere trengte strukturerte digitale kommunikasjonsflyter.',
        'Feltarbeidere trenger brukervennlige digitale verktøy tilpasset en ressursbegrenset operasjonell kontekst.',
      ],
      objectives: [
        'Levere digitale saksarbeidsflyter for barnebeskyttelse og anti-traffickingprogrammer',
        'Støtte reintegrasjonsoppfølging gjennom strukturerte digitale prosesser',
        'Sikre sikker datahåndtering for sensitive saker om trafficking og barnebeskyttelse',
        'Forbedre koordinering mellom UNICEF, myndigheter og lokale beskyttelsespartnere',
        'Styrke humanitær rapportering og programmonitorering',
      ],
      solution: {
        overview: 'Plattformen leverte digitale arbeidsflyter for UNICEF Liberias barnebeskyttelses- og anti-traffickingprogrammer. Xala bidro til arkitektur, utvikling og sikkerhetsimplementering — med fokus på strukturert sakshåndtering, sikker datahåndtering og koordineringskapasiteter.',
      },
      outcomes: [
        'Sikker digital plattform levert for barnebeskyttelse og anti-traffickingprogrammer.',
        'Strukturerte reintegrasjonsarbeidsflyter som forbedrer saksoppfølgingskapasitet.',
        'Bedre koordinering mellom UNICEF, myndigheter og lokale partnere i beskyttelsesprogrammer.',
        'Sterkere datasikkerhet for sensitive saker om trafficking og barnebeskyttelse.',
      ],
      card: { excerpt: 'Leveranse av en sikker plattform for barnebeskyttelse, registrering, anti-trafficking og reintegrasjonsarbeidsflyter i en humanitær kontekst.' },
      seo: { description: 'Se hvordan Xala støttet UNICEF Liberia med en digital barnebeskyttelses- og anti-traffickingplattform, sikkert saksarbeid og reintegrasjonsarbeidsflyter.' },
    },
    ar: {
      subtitle: 'تقديم منصة آمنة لحماية الطفل والتسجيل ودعم مكافحة الاتجار بالبشر وسير عمل إعادة التأهيل في سياق إنساني',
      summary: 'في ليبيريا، تعمل UNICEF على برامج حماية الطفل ومكافحة الاتجار بالبشر وإعادة التأهيل في بيئة إنسانية صعبة. ساهمت Xala في منصة آمنة تدعم هذه البرامج رقميًا.',
      outcomes: [
        'تسليم منصة رقمية آمنة لبرامج حماية الطفل ومكافحة الاتجار بالبشر.',
        'سير عمل منظم لإعادة التأهيل يحسن قدرة متابعة الحالات.',
        'تنسيق أفضل بين UNICEF والحكومات والشركاء المحليين في برامج الحماية.',
        'أمان أقوى للبيانات في قضايا الاتجار بالبشر وحماية الطفل الحساسة.',
      ],
      card: { excerpt: 'تقديم منصة آمنة لحماية الطفل والتسجيل ودعم مكافحة الاتجار وسير عمل إعادة التأهيل في سياق إنساني.' },
      seo: { description: 'اكتشف كيف دعمت Xala UNICEF ليبيريا بمنصة رقمية لحماية الطفل ومكافحة الاتجار بالبشر وسير عمل إعادة التأهيل الآمنة.' },
    },
  },
};

