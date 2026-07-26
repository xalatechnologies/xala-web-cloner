import type { CaseStudy } from '@/types/caseStudy';

export const unicefAfghanistanCaseStudy: CaseStudy = {
  slug: 'unicef-afghanistan-child-protection-birth-registration',
  title: 'UNICEF Afghanistan',
  subtitle:
    'Supporting child protection, birth registration, and vulnerable child case workflows through secure digital platform delivery',
  client: 'UNICEF Afghanistan',
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
    'Reintegration workflows',
    'Vulnerable child case management',
    'Humanitarian reporting',
    'Secure case handling',
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
    'In complex humanitarian contexts, digital systems must do more than register information — they must support protection, coordination, and long-term follow-up for vulnerable children. Xala contributed to a UNICEF Afghanistan platform supporting birth registration, child protection workflows, anti-trafficking support, and demobilization and reintegration processes for children associated with armed groups, helping create a structured and secure digital foundation for multi-agency humanitarian action.',

  challenge: [
    'Birth registration and child protection processes were often fragmented across paper, local systems, and organizational silos, reducing visibility into the situation of vulnerable children.',
    'Field workers, social services, and authorities needed better support for tracking children at risk, including those affected by trafficking, displacement, or association with armed groups.',
    'Case-handling workflows were complex and involved multiple steps, stakeholders, and data-sharing requirements.',
    'The platform had to ensure secure handling of sensitive child data in line with humanitarian and protection standards.',
    'Reporting and monitoring for child protection programmes required more structured data, consistent workflows, and consolidated views.',
    'Coordination between agencies, field staff, and government counterparts needed better digital support without increasing operational risk.',
  ],

  objectives: [
    'Support digital birth registration processes in a way that fits humanitarian and national contexts.',
    'Enable structured child protection case management workflows for vulnerable children.',
    'Improve identification, tracking, and follow-up for at-risk children within protection programmes.',
    'Support case workflows related to anti-trafficking and protection interventions.',
    'Provide digital support for demobilization and reintegration workflows for children associated with armed groups.',
    'Enable secure reporting and monitoring for child protection programmes across stakeholders.',
    'Strengthen coordination across humanitarian, social, and governmental actors through better data and workflow support.',
  ],

  solution: {
    overview:
      'The solution was framed as a child protection and birth registration platform rather than a narrow registry system. Xala contributed to architecture, backend capabilities, and data structures that supported digital birth registration alongside child protection case workflows, vulnerable child tracking, and secure reporting for UNICEF and its partners.',
    modules: [
      'Digital birth registration support module',
      'Child protection case management module',
      'Vulnerable child identification and follow-up workflows',
      'Anti-trafficking and protection support workflows',
      'Demobilization and reintegration support workflows for children associated with armed groups',
      'Reporting and monitoring module for child protection programmes',
      'Multi-agency coordination and case-tracking views',
    ],
    users: [
      'Field workers and social workers in child protection programmes',
      'UNICEF programme staff and protection specialists',
      'Government counterparts and civil registration authorities (where applicable)',
      'Partner organizations contributing to protection and reintegration efforts',
      'Programme managers and analysts responsible for monitoring and reporting',
    ],
  },

  architecture: {
    presentation: [
      'Web-based user interfaces for field workers and programme staff',
      'Case management and child profile views',
      'Birth registration and identity data entry screens',
      'Programme reporting and monitoring dashboards',
    ],
    services: [
      'Backend services for birth registration and child protection cases',
      'Workflow and status management services',
      'Validation and business rules for protection and registration processes',
      'Reporting and aggregation services for programme indicators',
    ],
    integrations: [
      'APIs for data exchange with partner or governmental systems where appropriate',
      'Authentication and access management services',
      'Integration touchpoints for importing or exporting structured case data',
    ],
    data: [
      'Secure storage for child protection case data and birth registration records',
      'Structured models for child profiles, case histories, and interventions',
      'Programme monitoring data and aggregated reporting datasets',
    ],
    infrastructure: [
      'Secure hosting environment appropriate for humanitarian data',
      'Backup and recovery support for critical protection data',
      'Operational monitoring for platform health and performance',
    ],
    security: [
      'Role-based access control aligned with protection principles',
      'Controlled access to sensitive child-level data based on roles and responsibilities',
      'Audit-friendly logging for case access and changes',
      'Data protection practices aligned with UNICEF and humanitarian data guidelines',
    ],
  },

  technologies: {
    frontend: ['React', 'TypeScript'],
    backend: ['.NET'],
    databases: ['SQL Server'],
    cloud: ['Azure'],
    identity: ['Authentication services', 'Role-based authorization'],
    integrations: ['REST APIs', 'Data import/export connectors', 'Reporting and coordination services'],
    devops: ['Monitoring', 'Backup and recovery routines', 'Release and configuration management'],
  },

  timeline: [
    {
      phase: 'Discovery and Requirements',
      description:
        'Understanding existing birth registration processes, child protection workflows, and data needs across UNICEF, partners, and authorities.',
    },
    {
      phase: 'Architecture and Design',
      description:
        'Designing the target platform architecture, data model, and workflow support with a focus on protection principles and secure case handling.',
    },
    {
      phase: 'Platform Implementation',
      description:
        'Implementing backend services, data structures, and user flows for birth registration, child protection cases, and programme reporting.',
    },
    {
      phase: 'Integration and Data Alignment',
      description:
        'Connecting the platform to relevant systems where appropriate and aligning data structures with programme and reporting needs.',
    },
    {
      phase: 'Testing and Hardening',
      description:
        'Validating workflows, security controls, and reporting outputs to support safe use in protection contexts.',
    },
    {
      phase: 'Deployment and Programme Support',
      description:
        'Supporting rollout, initial use, and iterative adjustments as the platform was adopted within child protection and registration programmes.',
    },
  ],

  outcomes: [
    'Stronger digital support for birth registration in a humanitarian and development context.',
    'More structured child protection case management workflows for vulnerable children.',
    'Improved ability to track and follow up on at-risk children across programmes and locations.',
    'Support for workflows related to trafficking prevention, protection interventions, and reintegration of children associated with armed groups.',
    'Better reporting and monitoring on child protection programmes through structured data.',
    'Improved coordination between UNICEF, partners, and authorities through shared, structured information.',
  ],

  capabilities: [
    'Digital birth registration workflows',
    'Child protection case management support',
    'Vulnerable child identification and follow-up',
    'Anti-trafficking support workflows',
    'Demobilization and reintegration process support',
    'Secure case data handling in protection contexts',
    'Reporting and monitoring for child protection programmes',
    'Multi-agency coordination and case tracking support',
    'Humanitarian data platform architecture for sensitive use cases',
  ],

  heroImage: {
    alt: 'Illustration of a child protection and birth registration platform with secure case management, reporting dashboards, and humanitarian data workflows.',
    brief:
      'Create a premium humanitarian-sector hero image representing a child protection and birth registration platform. Show digital case cards, child profiles, and workflow views in a calm, trustworthy interface. Include subtle cues of humanitarian and social service collaboration, without exposing any real identities. Use a professional, modest colour palette suitable for UNICEF and child protection contexts. Avoid sensational imagery; focus on dignity, protection, and structured support.',
  },

  architectureDiagram: {
    title: 'UNICEF Afghanistan – Child Protection and Birth Registration Platform Architecture',
    brief:
      'Layered diagram: Users (Field workers, Child-protection officers, Coordinators, Administrators, Humanitarian stakeholders) → Frontend Workflows (Birth registration portal, Child protection case workflows, Anti-trafficking support views, Reintegration tracking interfaces, Reporting dashboards) → Application Services (.NET backend services, Case-management logic, Validation services, Workflow orchestration, Reporting services) → Integration Layer (APIs, Authentication services, Humanitarian reporting connectors, Supporting agency/system integrations) → Data Layer (SQL Server, Registration data, Protection case data, Workflow state, Reporting and audit data) → Infrastructure / Delivery (Azure hosting, Testing layer, Deployment support, Monitoring / operational readiness).',
    layers: [
      {
        name: 'Users',
        components: ['Field Workers', 'Social Workers', 'UNICEF Programme Staff', 'Government Counterparts'],
      },
      {
        name: 'Web Application',
        components: ['Case Management UI', 'Birth Registration Forms', 'Programme Reporting Dashboards'],
      },
      {
        name: 'Application Services',
        components: ['Case Management Service', 'Workflow Engine', 'Validation and Rules', 'Reporting Service'],
      },
      {
        name: 'Integration Layer',
        components: ['APIs', 'Authentication Services', 'Data Import/Export'],
      },
      {
        name: 'Data Layer',
        components: ['Case and Registration Database', 'Reporting Data Store'],
      },
      {
        name: 'Operations & Security',
        components: ['Hosting Environment', 'Monitoring', 'Backup & Recovery', 'RBAC', 'Audit Logging'],
      },
    ],
  },

  seo: {
    title: 'UNICEF Afghanistan Case Study | Xala Technologies',
    description:
      'See how Xala supported UNICEF Afghanistan with a child protection and birth registration platform covering anti-trafficking workflows, reintegration support, reporting, and secure humanitarian case management.',
  },

  card: {
    title: 'UNICEF Afghanistan',
    excerpt:
      'Child protection and birth registration platform supporting vulnerable child case workflows, secure data handling, and humanitarian reporting.',
  },
  translations: {
    no: {
      subtitle: 'En plattform for barnebeskyttelse og fødselsregistrering som støtter sårbare barns saksarbeidsflyter, sikker datahåndtering og humanitær rapportering',
      summary: 'I Afghanistan er barn blant de mest sårbare menneskene i en av verdens mest utfordrende humanitære kontekster. Xala bidro til en plattform som støtter barnebeskyttelse og fødselsregistrering — og hjelper UNICEF og partnere med å håndtere saksinformasjon, identifisere sårbare barn og koordinere beskyttelsesrespons gjennom sikre digitale arbeidsflyter.',
      challenge: [
        'Barn uten fødselsregistrering er usynlige for myndighetene, og mangler grunnleggende rettigheter og tilgang til tjenester.',
        'Saksarbeidere trenger strukturerte digitale verktøy for å håndtere barnebeskyttelsessaker i et krevende og ressursbegrenset feltmiljø.',
        'Sensitive barnedata krever strenge sikkerhets- og tilgangskontroller for å beskytte sårbare individer.',
        'Koordinering mellom UNICEF, offentlige myndigheter og lokale partnere krever strukturerte digitale kommunikasjonsflyter.',
        'Humanitær rapportering og donorovervåking krever pålitelig datainnsamling og dashboardkapasiteter.',
      ],
      objectives: [
        'Levere en sikker saksarbeidsflytplattform for barnebeskyttelse og registreringsarbeid',
        'Muliggjøre strukturert fødselsregistrering som kobler barn til offentlige identitetssystemer',
        'Støtte sikker håndtering av sårbare barnedata med rollestyrt tilgang',
        'Forbedre koordinering mellom UNICEF, myndigheter og felttjenesteorganisasjoner',
        'Levere humanitære rapporterings- og overvåkningskapasiteter for programledelse',
      ],
      solution: {
        overview: 'Plattformen leverte digitale saksarbeidsflyter for barnebeskyttelse og fødselsregistreringsprogrammer i Afghanistan. Xala bidro til arkitektur, utvikling og integrasjonsarbeid — med fokus på sikker databehandling, strukturerte arbeidsflyter og pålitelig rapporterings- og koordineringskapasiteter.',
      },
      outcomes: [
        'Sikker digital plattform levert for barnebeskyttelse og fødselsregistreringsprogram.',
        'Strukturerte saksarbeidsflyter som forbedrer feltsaksarbeidere evne til å håndtere beskyttelsessaker.',
        'Forbedret datasynlighet og rapporteringskapasitet for UNICEF-programledelse.',
        'Sterkere koordinering mellom UNICEF, myndigheter og lokale humanitære partnere.',
      ],
      card: { excerpt: 'Barnebeskyttelses- og fødselsregistreringsplattform som støtter sårbare barns saksarbeidsflyter, sikker datahåndtering og humanitær rapportering.' },
      seo: { description: 'Se hvordan Xala støttet UNICEF Afghanistan med en digital barnebeskyttelses- og fødselsregistreringsplattform, sikkert saksarbeid og humanitær koordinering.' },
    },
    ar: {
      subtitle: 'منصة لحماية الطفل وتسجيل المواليد تدعم سير عمل قضايا الأطفال الضعفاء والتعامل الآمن مع البيانات والتقارير الإنسانية',
      summary: 'في أفغانستان، يُعدّ الأطفال من بين أكثر الناس هشاشة في أحد أصعب السياقات الإنسانية في العالم. ساهمت Xala في منصة تدعم حماية الطفل وتسجيل المواليد — مما يساعد UNICEF والشركاء على إدارة معلومات الحالات وتحديد الأطفال الضعفاء وتنسيق استجابة الحماية.',
      outcomes: [
        'تسليم منصة رقمية آمنة لبرامج حماية الطفل وتسجيل المواليد.',
        'سير عمل منظم للحالات يحسن قدرة عمال الميدان على إدارة قضايا الحماية.',
        'تحسين رؤية البيانات وقدرة التقارير لإدارة برامج UNICEF.',
        'تنسيق أقوى بين UNICEF والحكومات والشركاء الإنسانيين المحليين.',
      ],
      card: { excerpt: 'منصة لحماية الطفل وتسجيل المواليد تدعم سير عمل قضايا الأطفال الضعفاء والتعامل الآمن مع البيانات والتقارير الإنسانية.' },
      seo: { description: 'اكتشف كيف دعمت Xala UNICEF أفغانستان بمنصة رقمية لحماية الطفل وتسجيل المواليد والعمل الميداني الآمن للحالات.' },
    },
  },
};

