import type { CaseStudy } from '@/types/caseStudy';

export const norwegianAirCaseStudy: CaseStudy = {
  slug: 'norwegian-airlines-enterprise-platform',
  title: 'Norwegian Air Shuttle',
  subtitle:
    'Building and integrating a connected digital workplace across collaboration, identity, and HR platforms',
  client: 'Norwegian Air Shuttle',
  industry: 'Aviation / Enterprise IT / Digital Workplace',
  sector: 'Aviation / airline enterprise',
  deliveryModel: 'Enterprise integration and collaboration consultancy',
  deliveryPeriod: '2018–2022',
  duration: '4 years',
  budget: 'NOK 6–10M',
  status: 'Delivered',
  team: {
    size: 7,
    composition: [
      { role: 'Team Leader', count: 1 },
      { role: 'Project Manager', count: 1 },
      { role: 'Architect', count: 1 },
      { role: 'Developer', count: 2 },
      { role: 'Tester', count: 2 },
    ],
  },
  role: [
    'Architecture',
    'Development',
    'Enterprise integrations',
    'Deployment support',
    'Technical consulting',
  ],
  logoUrl: '/clients/norwegian.svg',
  imageUrl: '/clients/norwegian.svg',

  summary:
    'Norwegian Air Shuttle operates in a highly dynamic environment where efficient internal communication, secure identity handling, and reliable employee information flows are essential. Xala contributed to enterprise digital workplace initiatives by helping connect SharePoint, Facebook Workplace, Active Directory on-prem, and SAP SuccessFactors into a more unified and scalable collaboration and integration landscape.',

  challenge: [
    'Disconnected employee data across multiple specialized systems introduced at different times for different business needs, creating fragmentation across HR, communications, and identity platforms.',
    'Manual or semi-manual synchronization processes between platforms created administrative overhead and inconsistency in employee records across systems.',
    'Inconsistent access management arising from limited interoperability between collaboration tools, identity services, and HR systems.',
    'Fragmented internal communication environments making it difficult for employees across roles and geographies to collaborate effectively.',
    'Limited interoperability between collaboration and HR platforms, with no stable enterprise integration layer connecting SharePoint, Facebook Workplace, Active Directory on-prem, and SAP SuccessFactors.',
    'Need for stable enterprise integrations in a high-activity operational environment where data consistency and reliability are critical to day-to-day operations.',
  ],

  objectives: [
    'Improve integration between core internal platforms — SharePoint, Facebook Workplace, Active Directory, and SAP SuccessFactors',
    'Strengthen internal communication and collaboration capabilities across the organization',
    'Support more reliable synchronization of employee information across HR and identity systems',
    'Improve identity and access consistency across enterprise platforms',
    'Reduce fragmentation between HR, intranet, and internal communication tools',
    'Build a more scalable and maintainable enterprise platform foundation',
    'Support secure access operations across the distributed workforce',
  ],

  scope: [
    'Enterprise digital workplace',
    'SharePoint-based intranet and portals',
    'Facebook Workplace communication integration',
    'Active Directory on-prem identity alignment',
    'SAP SuccessFactors HR data synchronization',
    'Enterprise integration middleware and APIs',
  ],
  coreTechnologies: [
    'SharePoint Online / Microsoft 365',
    'Facebook Workplace',
    'Active Directory on-prem',
    'SAP SuccessFactors',
    '.NET enterprise services',
    'Microsoft Graph API and integration services',
  ],

  solution: {
    overview:
      'The solution centered on creating a more unified digital workplace ecosystem by connecting major enterprise platforms used inside the organization. Xala contributed as an architecture, development, and integration engineering partner across the collaboration, identity, HR, and integration service layers — helping Norwegian Air Shuttle move from disconnected systems toward a more coherent internal platform landscape.',
    modules: [
      'SharePoint-based internal portal and intranet support',
      'Facebook Workplace communication integration',
      'Active Directory on-prem identity and access alignment',
      'SAP SuccessFactors HR data synchronization',
      'Enterprise API and integration middleware layer',
      'Employee data synchronization services',
      'User provisioning and access control flows',
      'Document and information access services',
      'Integration monitoring and operational support',
    ],
    users: [
      'Employees across all internal departments',
      'HR teams and administrators',
      'Internal communication teams',
      'IT administrators and platform teams',
      'Operational staff and management',
    ],
  },

  architecture: {
    presentation: [
      'SharePoint intranet and internal portals',
      'Facebook Workplace communication channels',
      'Internal content and document access',
      'Role-based navigation and information surfaces',
    ],
    services: [
      'Enterprise integration services',
      'Identity synchronization service',
      'Data exchange and synchronization logic',
      'Backend APIs for cross-system communication',
      'Operational monitoring and alerting',
    ],
    integrations: [
      'Active Directory on-prem (identity source)',
      'SAP SuccessFactors (HR data)',
      'Facebook Workplace API (communication)',
      'SharePoint API / Microsoft Graph',
      'Internal enterprise system APIs',
    ],
    data: [
      'Enterprise data synchronization store',
      'SharePoint document libraries',
      'HR data exchange layer',
      'Audit and operational logs',
    ],
    infrastructure: [
      'Enterprise hosting environment',
      'Microsoft 365 / SharePoint Online',
      'Deployment support infrastructure',
      'Operational integration services',
    ],
    security: [
      'Active Directory on-prem authentication foundation',
      'Enterprise access control and user provisioning',
      'RBAC aligned to organizational HR data',
      'Audit logging across integration flows',
      'GDPR-compliant employee data handling',
    ],
  },

  technologies: {
    frontend: ['SharePoint (intranet / portals)', 'Facebook Workplace'],
    backend: ['.NET services', 'Enterprise APIs', 'Middleware / integration services', 'C#'],
    databases: ['Enterprise integration data store', 'SharePoint document libraries'],
    cloud: ['Microsoft 365', 'SharePoint Online', 'Enterprise hosting environment', 'Deployment support'],
    identity: ['Active Directory on-prem', 'Authentication / access control', 'User provisioning'],
    integrations: ['SAP SuccessFactors', 'Microsoft Graph API', 'Facebook Workplace API', 'Active Directory LDAP'],
    devops: ['Deployment support', 'Integration validation and testing', 'Platform release support', 'Monitoring'],
  },

  integrationHighlights: [
    'Active Directory on-prem — Core identity and access foundation for user provisioning, permissions handling, and enterprise access control',
    'SAP SuccessFactors — HR data and employee information source synchronized with internal collaboration systems',
    'Facebook Workplace — Internal communication and social collaboration platform integrated with enterprise identity',
    'SharePoint — Internal portal and document management layer for structured information access and intranet services',
    'Enterprise APIs — Backend integration services enabling cross-system data exchange, synchronization, and operational consistency',
  ],

  timeline: [
    {
      phase: 'Discovery',
      description:
        'Assessment of enterprise platforms, internal communication needs, identity landscape, and integration challenges across collaboration, HR, and access control systems.',
    },
    {
      phase: 'Architecture',
      description:
        'Definition of the target interaction model between SharePoint, Facebook Workplace, Active Directory on-prem, and SAP SuccessFactors, including integration boundaries and data flow responsibilities.',
    },
    {
      phase: 'Implementation',
      description:
        'Development of integration logic, synchronization services, and platform connectivity across collaboration, identity, and HR systems.',
    },
    {
      phase: 'Validation',
      description:
        'Testing of synchronization flows, access handling, cross-platform consistency, and operational readiness across the integrated platform landscape.',
    },
    {
      phase: 'Deployment',
      description:
        'Rollout support and controlled introduction of changes into the enterprise environment with deployment stabilization.',
    },
    {
      phase: 'Operational Improvement',
      description:
        'A more structured and maintainable digital workplace foundation established for internal users, with stronger platform interoperability and reduced operational fragmentation.',
    },
  ],

  outcomes: [
    'Better connected internal platforms with reduced fragmentation between collaboration, HR, and identity systems across the enterprise.',
    'Improved flow of employee-related data through structured synchronization between SAP SuccessFactors and connected enterprise platforms.',
    'Stronger alignment between access control and business systems through Active Directory integration and consistent user provisioning.',
    'More consistent collaboration and communication environment across SharePoint and Facebook Workplace for employees at all levels.',
    'Reduced fragmentation in enterprise workplace tooling, giving teams a more coherent internal information and communication landscape.',
    'Stronger technical foundation for internal platform evolution, with a maintainable enterprise integration architecture supporting future growth.',
  ],

  capabilities: [
    'Enterprise collaboration platform integration',
    'SharePoint-based internal portal support',
    'Facebook Workplace communication integration',
    'Active Directory on-prem identity alignment',
    'SAP SuccessFactors interoperability',
    'Employee data synchronization support',
    'Platform connectivity across collaboration, HR, and identity systems',
    'Stronger internal access and communication consistency',
    'Maintainable enterprise integration architecture',
    'Deployment support in enterprise environments',
    'Technical consulting on platform alignment and scalability',
  ],

  heroImage: {
    alt: 'Illustration of an enterprise digital workplace for an airline with collaboration tools, identity systems, HR integrations, and connected internal platforms.',
    brief:
      'Create a premium enterprise hero image representing an airline\'s internal digital workplace and integration landscape. Combine subtle aviation context (abstract aircraft or airport cues) with enterprise collaboration visuals — internal dashboards, connected system nodes, identity/access symbols, and communication platform cues. Mood: efficient, connected, secure, operational, enterprise-grade. Avoid consumer travel visuals or generic booking imagery.',
  },

  architectureDiagram: {
    title: 'Norwegian Air Shuttle — Enterprise Workplace Integration Architecture',
    brief:
      'Layered enterprise integration diagram: Users (Employees, HR teams, communication teams, admins, operational staff) → Collaboration Platforms (SharePoint intranet, Facebook Workplace) → Identity & Access (Active Directory on-prem, authentication, user provisioning) → Integration Services (Enterprise APIs, synchronization services, middleware) → Business Systems (SAP SuccessFactors, internal enterprise systems, communication/document services) → Operations (deployment support, monitoring, administration, data consistency). Enterprise architecture style with clear arrows between HR, identity, and collaboration systems.',
    layers: [
      {
        name: 'Users',
        components: ['Employees', 'HR Teams', 'Communication Teams', 'Administrators', 'Operational Staff'],
      },
      {
        name: 'Collaboration',
        components: ['SharePoint Intranet / Portals', 'Facebook Workplace'],
      },
      {
        name: 'Identity & Access',
        components: ['Active Directory on-prem', 'Authentication / Access Control', 'User Provisioning'],
      },
      {
        name: 'Integration Services',
        components: ['Enterprise APIs', 'Synchronization Services', 'Middleware / Integration Logic'],
      },
      {
        name: 'Business Systems',
        components: ['SAP SuccessFactors', 'Internal Enterprise Systems', 'Communication & Document Services'],
      },
      {
        name: 'Operations',
        components: ['Deployment Support', 'Monitoring', 'Administration', 'Data Consistency'],
      },
    ],
  },

  seo: {
    title: 'Norwegian Air Shuttle: digital arbeidsplass | Xala',
    description:
      'See how Xala supported Norwegian Air Shuttle with enterprise architecture, SharePoint, Facebook Workplace, Active Directory, SAP SuccessFactors integrations, and digital workplace modernization.',
  },

  card: {
    title: 'Norwegian Air Shuttle',
    excerpt:
      'Connecting SharePoint, Facebook Workplace, Active Directory, and SAP SuccessFactors into a stronger enterprise collaboration and digital workplace ecosystem.',
  },
  translations: {
    no: {
      subtitle: 'Integrering av SharePoint, Facebook Workplace, Active Directory og SAP SuccessFactors til en sømløs digital arbeidsplass for et ledende europeisk flyselskap',
      summary: 'Norwegian Air Shuttle trengte en enhetlig digital arbeidsplass som samlet fragmenterte verktøy — SharePoint, Facebook Workplace, Active Directory og SAP SuccessFactors — til en sømløs medarbeideropplevelse. Xala arkitekterte og leverte integrasjonslaget som knyttet disse systemene sammen, og eliminerte informasjonssiloer for tusenvis av flyansatte på tvers av kontinenter.',
      challenge: [
        'Medarbeidere opererte på tvers av fire separate systemer uten integrasjon, noe som skapte informasjonssiloer og ineffektiv kommunikasjon.',
        'Flyoperasjoner krever sanntidskommunikasjon og innholdsoppdateringer på tvers av kabinpersonell, piloter og bakkepersonell globalt.',
        'SAP SuccessFactors HR-data var isolert fra SharePoint-innholdsportalen og Facebook Workplace-kommunikasjonslaget.',
        'Sikkerhetstilgangskontroll måtte koordineres på tvers av Active Directory, SharePoint-tillatelser og tredjepartssystemer.',
        'Høy tilgjengelighet var kritisk for operasjonskritiske meldingssystemer som betjener et av Europas travleste flyselskaper.',
      ],
      objectives: [
        'Skape en sømløs digital arbeidsplass ved å integrere fire enterprise-systemer',
        'Eliminere informasjonssiloer mellom HR-, kommunikasjons- og innholdsforvaltningsplattformer',
        'Muliggjøre sanntids tverrkanal kommunikasjon for flyoperasjonspersonell',
        'Implementere ensartet tilgangskontroll via Active Directory på tvers av alle integrerte systemer',
        'Levere skalerbar enterprise-integrasjonsarkitektur som støtter fremtidig plattformutvidelse',
      ],
      solution: {
        overview: 'Xala arkitekterte et integrasjonslag mellom mellomledd som koblet SharePoint, Facebook Workplace, Active Directory og SAP SuccessFactors via .NET-baserte tilpassede koblinger og API-broer. Dette muliggjorde sentralisert identitetsstyring, enhetlig innholdslevering og sanntids kommunikasjonssynkronisering på tvers av alle plattformer.',
      },
      outcomes: [
        'Sømløs single sign-on på tvers av SharePoint, Facebook Workplace og SAP SuccessFactors via Active Directory',
        'Sanntids kommunikasjonssynkronisering mellom Facebook Workplace og SharePoint-innholdslagene',
        'HR-data fra SAP SuccessFactors tilgjengelig direkte i SharePoint-personalportalen',
        'Redusert kontekstutvekslingskostnader for flyansatte med en enkelt, sømløs digital arbeidsplass',
        'Skalerbar integrasjonsarkitektur som enkelt kan utvides til fremtidige enterprise-systemer',
      ],
      card: { excerpt: 'Koblet SharePoint, Facebook Workplace, Active Directory og SAP SuccessFactors til en enhetlig digital arbeidsplass for et ledende europeisk flyselskap.' },
      seo: { description: 'Se hvordan Xala integrerte SharePoint, Active Directory og SAP SuccessFactors til en sømløs digital arbeidsplass for Norwegian Air Shuttle.' },
    },
    ar: {
      subtitle: 'دمج SharePoint وFacebook Workplace وActive Directory وSAP SuccessFactors في مكان عمل رقمي موحد لشركة طيران أوروبية رائدة',
      summary: 'احتاجت Norwegian Air Shuttle إلى مكان عمل رقمي موحد يجمع الأدوات المتفرقة في تجربة موظف سلسة. صممت Xala وقدمت طبقة التكامل التي ربطت هذه الأنظمة معًا، وأزالت صوامع المعلومات لآلاف موظفي الطيران عبر القارات.',
      challenge: [
        'كان الموظفون يعملون عبر أربعة أنظمة منفصلة دون تكامل، مما أدى إلى صوامع معلومات وتواصل غير فعّال.',
        'تتطلب عمليات الطيران تواصلًا في الوقت الفعلي وتحديثات للمحتوى عبر طاقم الطائرة والطيارين وموظفي الأرض على مستوى العالم.',
        'كانت بيانات الموارد البشرية في SAP SuccessFactors معزولة عن بوابة المحتوى في SharePoint وطبقة التواصل في Facebook Workplace.',
        'كان لا بد من تنسيق التحكم في الوصول الأمني عبر Active Directory وصلاحيات SharePoint وأنظمة الطرف الثالث.',
        'كان التوفر العالي أمرًا بالغ الأهمية لأنظمة المراسلة الحيوية التي تخدم أحد أكثر شركات الطيران ازدحامًا في أوروبا.',
      ],
      outcomes: [
        'تسجيل دخول موحد سلس عبر SharePoint وFacebook Workplace وSAP SuccessFactors عبر Active Directory',
        'مزامنة الاتصالات في الوقت الفعلي بين طبقتي Facebook Workplace وSharePoint',
        'بيانات الموارد البشرية من SAP SuccessFactors متاحة مباشرة في بوابة الموظفين في SharePoint',
        'تقليل تكاليف تبديل السياق لموظفي الطيران بمكان عمل رقمي موحد واحد',
        'بنية تكامل قابلة للتوسع يمكن توسيعها بسهولة لأنظمة المؤسسات المستقبلية',
      ],
      card: { excerpt: 'ربط SharePoint وFacebook Workplace وActive Directory وSAP SuccessFactors في مكان عمل رقمي موحد لشركة طيران أوروبية رائدة.' },
      seo: { description: 'اكتشف كيف دمجت Xala SharePoint وFacebook Workplace وActive Directory وSAP SuccessFactors في مكان عمل رقمي سلس لـ Norwegian Air Shuttle.' },
    },
  },
};
