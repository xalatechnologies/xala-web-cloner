import type { CaseStudy } from '@/types/caseStudy';

export const unochaCaseStudy: CaseStudy = {
  slug: 'unocha-global-mapping-emergency-stockpiles',
  title: 'UNOCHA',
  subtitle:
    'Delivering a global platform for mapping emergency stockpiles, strengthening humanitarian logistics, and improving crisis-response visibility',
  client: 'UNOCHA (United Nations Office for the Coordination of Humanitarian Affairs)',
  industry: 'International Organizations / Humanitarian Logistics / Crisis Response Technology',
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
    'Global emergency stockpile mapping',
    'Humanitarian logistics visibility',
    'Cross-organization resource coordination',
    'Crisis-response decision support',
    'Secure humanitarian data handling',
  ],
  coreTechnologies: [
    'React & TypeScript',
    '.NET backend services',
    'Microsoft Azure',
    'REST APIs',
    'Mapping & geospatial tools',
    'SQL Server',
  ],
  logoUrl: '/clients/ocha.png',
  imageUrl: '/clients/ocha.png',

  summary:
    'In humanitarian response, speed and visibility are critical. Xala contributed to a platform for global mapping of emergency stockpiles, helping improve how humanitarian stakeholders track essential resources, coordinate across regions, and support decision-making during crises. The solution strengthened digital visibility into emergency inventory, logistics readiness, and cross-organizational coordination through a secure, scalable, and maintainable platform foundation.',

  challenge: [
    'Limited visibility into distributed emergency stockpiles made it difficult for humanitarian responders to quickly understand what resources existed, where they were, and how they could be mobilized.',
    'Fragmented data across regions, organizations, and data sources reduced coordination effectiveness and delayed response planning.',
    'Difficulty comparing inventory availability and readiness across geographically distributed storage locations.',
    'Need for better operational reporting and decision support tools suited to humanitarian logistics workflows.',
    'Requirement for a scalable global mapping and coordination solution that remained practical and usable in crisis-response contexts.',
    'Importance of platform reliability and data accuracy during scenarios where delays in information access have direct operational consequences.',
    'Requirement for a secure and structured platform suitable for international organizational use across multiple stakeholder types.',
  ],

  objectives: [
    'Improve visibility into global emergency stockpiles through map-driven and structured inventory views',
    'Support mapping and location-based understanding of humanitarian resources across regions',
    'Strengthen reporting and operational decision support for humanitarian planning',
    'Improve coordination across humanitarian stakeholders and partner organizations',
    'Enable more structured inventory and readiness tracking',
    'Provide a scalable and maintainable logistics platform foundation',
    'Support reliable access to critical resource information during crises',
  ],

  solution: {
    overview:
      'The work centred on delivering a digital platform that improved visibility and coordination across global emergency stockpiles. Xala contributed across the full solution lifecycle — covering architecture, requirement analysis, development, integration, testing, and deployment support — to help create a structured and maintainable platform for humanitarian logistics visibility and crisis-response coordination.',
    modules: [
      'Global emergency stockpile map interface',
      'Location-based resource visibility and inventory views',
      'Inventory status and readiness tracking',
      'Reporting and operational decision-support dashboards',
      'Cross-region coordination and shared visibility',
      'Administrative tools and data validation workflows',
      'Backend logistics support services',
      'API-based integrations with supporting data sources',
      'Role-based access control and secure data handling',
    ],
    users: [
      'Humanitarian coordinators and logistics teams',
      'Analysts and operational planners',
      'Administrators and data managers',
      'Partner organization stakeholders',
    ],
  },

  architecture: {
    presentation: [
      'Global map interface with stockpile location markers',
      'Inventory and status dashboards',
      'Reporting and analytics views',
      'Administrative tools and data management interfaces',
    ],
    services: [
      '.NET backend services for mapping and inventory logic',
      'Inventory workflow and status management',
      'Reporting and analytics services',
      'Data validation and operational coordination logic',
    ],
    integrations: [
      'GIS / mapping integrations for geospatial data',
      'API-based connections to humanitarian data sources',
      'Reporting connectors and coordination services',
      'Inventory and system integrations',
    ],
    data: [
      'SQL Server (stockpile records, inventory status, location metadata)',
      'Reporting and audit data',
      'Operational history and coordination logs',
    ],
    infrastructure: [
      'Microsoft Azure (hosting and deployment)',
      'Testing and validation layer',
      'Deployment support infrastructure',
      'Operational monitoring and readiness',
    ],
    security: [
      'Role-based access control for humanitarian users',
      'Secure data handling for international operational use',
      'Controlled access to sensitive logistics information',
      'Audit logging across critical workflows',
    ],
  },

  technologies: {
    frontend: ['React', 'TypeScript', 'Map/GIS visualization components', 'Reporting dashboards'],
    backend: ['.NET', 'C#', 'Mapping logic services', 'Inventory and reporting APIs'],
    databases: ['SQL Server', 'Stockpile and inventory data store', 'Reporting and audit data'],
    cloud: ['Microsoft Azure', 'Azure hosting and deployment', 'Operational monitoring'],
    integrations: ['GIS / mapping integrations', 'Humanitarian data source APIs', 'Reporting connectors'],
    devops: ['Deployment support', 'Testing and quality assurance', 'Operational readiness validation'],
  },

  integrationHighlights: [
    'GIS / Mapping Integrations — Geospatial data services enabling map-driven visibility into global stockpile locations and distributions',
    '.NET Backend Services — Core application logic for inventory tracking, reporting, and coordination workflows',
    'React / TypeScript Frontend — Interactive global map interface and reporting dashboards for humanitarian operational use',
    'API Integrations — Structured connections to supporting humanitarian and inventory-related data sources',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Global stockpile mapping, inventory visibility, and reporting requirements were analyzed and translated into structured platform specifications suited to humanitarian logistics operations.',
    },
    {
      phase: 'Architecture',
      description:
        'Solution architecture was defined to support geospatial visibility, operational reporting, and maintainable logistics workflows — including service boundaries, mapping integration patterns, and data flow design.',
    },
    {
      phase: 'Development',
      description:
        'Frontend and backend services were implemented for mapping, inventory tracking, reporting dashboards, and decision-support functionality.',
    },
    {
      phase: 'Integration',
      description:
        'Mapping components, reporting services, and supporting data source integrations were connected and validated for reliable operational use.',
    },
    {
      phase: 'Testing',
      description:
        'Quality assurance strengthened accuracy, usability, and trust in logistics-related workflows — with focus on data correctness, map reliability, and reporting quality.',
    },
    {
      phase: 'Deployment and Stabilization',
      description:
        'The engagement contributed to a stronger digital foundation for humanitarian stockpile visibility and crisis-response coordination, supporting controlled rollout for international operational use.',
    },
  ],

  outcomes: [
    'Improved overview of distributed emergency stockpiles, replacing fragmented data with a structured and map-driven visibility platform.',
    'Stronger support for logistics planning and crisis-response readiness through better inventory and status tracking.',
    'Better operational reporting and visibility across humanitarian stakeholders and partner organizations.',
    'More structured coordination across regions and organizations, supporting shared understanding of emergency resource availability.',
    'Stronger technical foundation for future humanitarian logistics capabilities, with a maintainable and scalable platform.',
    'Improved maintainability and scalability of critical operational services supporting international humanitarian operations.',
  ],

  capabilities: [
    'Global emergency stockpile mapping',
    'Location-based resource visibility',
    'Inventory and readiness tracking',
    'Humanitarian reporting and dashboard support',
    'Logistics decision support',
    'API-based and GIS integration',
    'Secure role-based access',
    'Cross-region coordination support',
    'Scalable and maintainable operational architecture',
    'Deployment support for international humanitarian use',
  ],

  heroImage: {
    alt: 'Illustration of a global humanitarian logistics platform with stockpile mapping, inventory visibility, reporting dashboards, and crisis-response coordination.',
    brief:
      'Create a premium humanitarian-enterprise hero image representing a global platform for mapping emergency stockpiles, tracking critical resources, and supporting crisis-response coordination. Include abstract world map or regional map overlays, stockpile location markers, inventory dashboard interface cues, connected humanitarian logistics modules, and clean data and reporting visuals. Mood: coordinated, global, reliable, operational. Blue / slate / sand / teal palette with map-centric enterprise design. Avoid disaster imagery, chaotic crisis scenes, military-looking visuals, or cluttered map interfaces.',
  },

  architectureDiagram: {
    title: 'UNOCHA — Global Emergency Stockpile Mapping Platform Architecture',
    brief:
      'Layered enterprise diagram: Users (Humanitarian coordinators, Logistics teams, Analysts, Administrators, Partner stakeholders) → Frontend Interfaces (Global map interface, Inventory dashboards, Reporting views, Administrative tools) → Application Services (.NET backend, Mapping logic, Inventory services, Reporting & analytics, Validation workflows) → Integration Layer (APIs, GIS/mapping integrations, Reporting connectors, Inventory/system integrations) → Data Layer (SQL Server, Stockpile records, Location metadata, Inventory status, Reporting and audit data) → Infrastructure/Delivery (Azure hosting, Testing layer, Deployment support, Monitoring). Global humanitarian operations aesthetic, blue/slate/teal palette.',
    layers: [
      {
        name: 'Users',
        components: [
          'Humanitarian Coordinators',
          'Logistics Teams',
          'Analysts',
          'Administrators',
          'Partner Stakeholders',
        ],
      },
      {
        name: 'Frontend Interfaces',
        components: [
          'Global Map Interface',
          'Inventory Dashboards',
          'Reporting Views',
          'Administrative Tools',
        ],
      },
      {
        name: 'Application Services',
        components: [
          '.NET Backend Services',
          'Mapping Logic',
          'Inventory Services',
          'Reporting & Analytics',
          'Validation Workflows',
        ],
      },
      {
        name: 'Integration Layer',
        components: [
          'APIs',
          'GIS / Mapping Integrations',
          'Reporting Connectors',
          'Inventory System Integrations',
        ],
      },
      {
        name: 'Data Layer',
        components: [
          'SQL Server',
          'Stockpile Records',
          'Location Metadata',
          'Inventory Status',
          'Reporting & Audit Data',
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
    title: 'UNOCHA: kartlegging av beredskapslager | Xala',
    description:
      'See how Xala supported UNOCHA with a global emergency stockpile mapping platform covering logistics visibility, inventory reporting, GIS integration, and humanitarian crisis-response coordination.',
  },

  card: {
    title: 'UNOCHA',
    excerpt:
      'Delivering a global platform for mapping emergency stockpiles, improving humanitarian logistics visibility, and strengthening crisis-response coordination.',
  },
  translations: {
    no: {
      subtitle: 'Leveranse av en global plattform for kartlegging av beredskapslager, styrking av humanistisk logistikk og forbedring av kriseresponssiktbarhet',
      summary: 'I humanitær respons er hastighet og oversikt kritisk. Xala bidro til en plattform for global kartlegging av beredskapslager som hjelper humanitære aktører med å spore essensielle ressurser, koordinere på tvers av regioner og støtte beslutningsprosesser under kriser. Løsningen styrket digital oversikt over nødlager, logistikkberedskap og tverorganisasjonell koordinering.',
      challenge: [
        'Begrenset oversikt over distribuerte beredskapslager gjorde det vanskelig for humanitære respondenter å raskt forstå hvilke ressurser som fantes, hvor de var og hvordan de kunne mobiliseres.',
        'Fragmenterte data på tvers av regioner, organisasjoner og datakilder reduserte koordineringseffektiviteten.',
        'Vanskeligheter med å sammenligne lagertilgjengelighet og beredskap på tvers av geografisk distribuerte lagringslokasjoner.',
        'Behovet for sanntidssiktbarhet inn i humanitære lagerdata for å støtte rask kriserespons.',
        'Pålitelige integrasjoner på tvers av humanitære organisasjoners systemer og datakilder.',
      ],
      objectives: [
        'Levere en global platform for kartlegging og siktbarhet av beredskapslager',
        'Forbedre humanitær logistikkkoordinering på tvers av regioner og organisasjoner',
        'Støtte datadrevne beslutningsprosesser under humanitære kriser',
        'Muliggjøre sanntids lageroppdateringer og koordinering for feltteam',
        'Styrke sikkerheten rundt sensitiv humanitær data',
      ],
      solution: {
        overview: 'Arbeidet fokuserte på å levere en sikker og skalerbar plattform for global kartlegging av beredskapslager. Xala bidro til arkitektur, utvikling, kartintegrasjoner og sikkerhetsimplementering — og hjalp med å forbedre logistikksiktbarhet og koordineringskapasiteter for humanitære operasjoner.',
      },
      outcomes: [
        'Global plattform for beredskapslager levert med forbedret siktbarhet på tvers av regioner.',
        'Bedre koordinering av humanitær logistikk via sanntids lagerdata.',
        'Forbedret datadrevet beslutningsstøtte for humanitære respondenter.',
        'Sterkere datasikkerhet og tilgangskontroll for humanitær data.',
      ],
      card: { excerpt: 'Global plattform for kartlegging av beredskapslager som forbedrer humanistisk logistikksiktbarhet og styrker koordinering av kriserespons.' },
      seo: { description: 'Se hvordan Xala støttet UNOCHA med en global plattform for kartlegging av beredskapslager, og bedre oversikt over logistikk i kriserespons.' },
    },
    ar: {
      subtitle: 'تقديم منصة عالمية لرسم خرائط مخزونات الطوارئ وتعزيز اللوجستيات الإنسانية وتحسين رؤية الاستجابة للأزمات',
      summary: 'في الاستجابة الإنسانية، السرعة والرؤية أمران بالغا الأهمية. ساهمت Xala في منصة لرسم خرائط مخزونات الطوارئ العالمية، مما يساعد أصحاب المصلحة الإنسانيين على تتبع الموارد الأساسية والتنسيق عبر المناطق.',
      outcomes: [
        'تسليم منصة مخزون الطوارئ العالمية مع تحسين الرؤية عبر المناطق.',
        'تحسين تنسيق اللوجستيات الإنسانية عبر بيانات المخزون في الوقت الفعلي.',
        'تحسين دعم القرار المبني على البيانات للمستجيبين الإنسانيين.',
        'أمان أقوى للبيانات والتحكم في الوصول للبيانات الإنسانية.',
      ],
      card: { excerpt: 'منصة عالمية لرسم خرائط مخزونات الطوارئ تعزز الرؤية اللوجستية الإنسانية وتقوي تنسيق الاستجابة للأزمات.' },
      seo: { description: 'اكتشف كيف دعمت Xala UNOCHA بمنصة عالمية لرسم خرائط مخزونات الطوارئ وتحسين الرؤية اللوجستية الإنسانية.' },
    },
  },
};
