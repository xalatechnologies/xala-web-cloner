import type { CaseStudy } from '@/types/caseStudy';

export const altinnCaseStudy: CaseStudy = {
  slug: 'altinn',
  title: 'Altinn 3 & Altinn Studio',
  subtitle: "Modernizing Norway's National Digital Government Platform with Cloud-Native Architecture",
  client: 'Digitaliseringsdirektoratet (Digdir)',
  industry: 'Public Sector / Digital Government',
  sector: 'Public sector / digital government',
  deliveryModel: 'Long-term platform consultancy and development',
  deliveryPeriod: '2020–2024',
  duration: '4 years',
  budget: 'NOK 15–25M',
  status: 'Delivered',
  team: {
    size: 10,
    composition: [
      { role: 'Team Leader', count: 1 },
      { role: 'Project Manager', count: 1 },
      { role: 'Architect', count: 2 },
      { role: 'Senior Developer', count: 4 },
      { role: 'Tester', count: 2 },
    ],
  },
  role: ['Architecture', 'Backend Development', 'Cloud Infrastructure', 'Technical Consulting'],
  logoUrl: '/clients/altinn.svg',
  imageUrl: '/clients/altinn.svg',

  summary:
    "Xala contributed to the development and modernization of Altinn 3, Norway's cornerstone digital government platform serving over 5 million citizens and businesses. Working alongside Digdir, Xala delivered critical backend services, cloud infrastructure components, and application integrations within the Altinn Studio ecosystem — enabling Norwegian public agencies to build, deploy, and manage digital services at scale.",

  challenge: [
    'The legacy Altinn 2 platform was a monolithic, on-premises system built over two decades, creating significant operational and maintenance challenges for the Norwegian government.',
    'Norwegian government agencies struggled to build and deploy new digital forms and services independently, creating bottlenecks and long lead times for citizen-facing services.',
    'The platform needed to serve as the backbone for all Norwegian digital reporting, handling hundreds of millions of form submissions annually while maintaining strict uptime and data integrity requirements.',
    'Migrating and re-platforming critical national digital infrastructure while simultaneously maintaining live services for millions of users presented exceptional complexity.',
    'Stringent Norwegian and EU data privacy regulations (GDPR, NSM security guidelines) required every architectural decision to be defensible and auditable.',
  ],

  objectives: [
    'Transition from monolithic architecture to cloud-native microservices on Azure',
    'Enable government agencies to build and publish digital services independently via Altinn Studio',
    'Achieve 99.99% uptime SLA across all critical public-facing services',
    'Establish secure, modern API-first integration patterns for third-party systems',
    'Implement full GDPR compliance and NSM security framework alignment',
    'Reduce time-to-deploy for new government digital services from months to days',
  ],

  scope: [
    'National digital government platform',
    'Altinn 3 microservices platform',
    'Altinn Studio low-code service builder',
    'Citizen and business-facing digital services',
    'Secure national identity and register integrations',
  ],
  coreTechnologies: [
    'React & TypeScript frontends',
    '.NET 8 microservices',
    'Microsoft Azure & AKS',
    'Azure Service Bus & event-driven architecture',
    'Azure API Management',
    'PostgreSQL, Blob Storage, Redis, Cosmos DB',
    'ID-porten / Maskinporten identity',
  ],

  solution: {
    overview:
      'Xala delivered full-stack development contributions across the Altinn 3 microservices platform, focusing on backend API services, authorization components, storage services, and Azure infrastructure. The team also contributed to Altinn Studio — the low-code application builder that enables government agencies to create, configure, and publish digital services without deep engineering resources.',
    modules: [
      'Altinn 3 Backend Microservices (Authorization, Storage, Register, Profile)',
      'Altinn Studio Low-Code Application Builder',
      'Event-Driven Integration Layer (Azure Service Bus)',
      'API Gateway and OpenID Connect Authentication',
      'Multi-Environment CI/CD Pipeline (Azure DevOps)',
      'Kubernetes Cluster Management (AKS)',
      'Digital Forms Engine with Conditional Logic',
      'Correspondence and Notification Service',
      'Maskinporten / ID-porten Integration',
      'Data Migration Tooling from Altinn 2',
    ],
    users: [
      'Norwegian citizens (5 million+)',
      'Norwegian businesses and enterprises',
      'Government agency developers and form designers',
      'Public sector administrators and case handlers',
      'Third-party system integrators',
    ],
  },

  architecture: {
    presentation: [
      'Altinn Studio UI (React / TypeScript)',
      'Altinn Apps UI (React / TypeScript)',
      'API Portal and Developer Documentation',
      'Agency Administration Dashboard',
    ],
    services: [
      '.NET 8 Microservices (Authorization, Storage, Register, Profile, Receipt)',
      'Event-Driven Services (Azure Service Bus)',
      'Workflow and Process Engine',
      'Digital Forms Processing Engine',
      'Notification and Correspondence Services',
    ],
    integrations: [
      'ID-porten (Norwegian national identity provider)',
      'Maskinporten (machine-to-machine authentication)',
      'Folkeregisteret (National Population Register)',
      'Enhetsregisteret (Business Register)',
      'Skatteetaten (Norwegian Tax Authority)',
      'NAV (Norwegian Labour and Welfare Administration)',
    ],
    data: [
      'Azure PostgreSQL (per-service databases)',
      'Azure Blob Storage (document and file storage)',
      'Azure Cosmos DB (event store)',
      'Redis Cache (session and distributed caching)',
    ],
    infrastructure: [
      'Azure Kubernetes Service (AKS)',
      'Azure Container Registry',
      'Azure DevOps CI/CD',
      'Azure API Management',
      'Azure Monitor and Application Insights',
      'GitHub (source control)',
    ],
    security: [
      'OpenID Connect / OAuth 2.0',
      'ID-porten integration for citizen authentication',
      'Maskinporten for machine-to-machine authorization',
      'NSM security framework compliance',
      'GDPR-compliant data architecture',
      'Role-Based Access Control (RBAC)',
      'Secrets management via Azure Key Vault',
    ],
  },

  technologies: {
    frontend: ['React', 'TypeScript', 'Redux', 'Monaco Editor', 'Jest'],
    backend: ['.NET 8', 'C#', 'ASP.NET Core', 'Entity Framework Core', 'MassTransit'],
    databases: ['PostgreSQL', 'Azure Blob Storage', 'Redis', 'Azure Cosmos DB'],
    cloud: [
      'Microsoft Azure',
      'Azure Kubernetes Service (AKS)',
      'Azure Service Bus',
      'Azure DevOps',
      'Azure API Management',
    ],
    identity: ['ID-porten', 'Maskinporten', 'OpenID Connect', 'OAuth 2.0', 'Azure AD'],
    integrations: [
      'Folkeregisteret API',
      'Enhetsregisteret API',
      'Maskinporten',
      'Skatteetaten APIs',
    ],
    devops: ['Azure DevOps', 'GitHub Actions', 'Docker', 'Kubernetes', 'Helm', 'Terraform'],
  },

  integrationHighlights: [
    'ID-porten — National citizen authentication (Norwegian BankID / MinID)',
    'Maskinporten — Secure machine-to-machine authentication for agency systems',
    'Folkeregisteret — National Population Register data access',
    'Enhetsregisteret — Business Entity Register lookups',
    'Skatteetaten — Tax Authority digital services',
    'NAV — Norwegian Welfare Administration service integration',
  ],

  timeline: [
    {
      phase: 'Discovery & Architecture',
      description:
        'Requirements analysis, architecture design, platform assessment, and team onboarding into the Altinn 3 open-source ecosystem.',
    },
    {
      phase: 'Core Service Development',
      description:
        'Backend microservices development: Authorization, Storage, Register, and Profile services on .NET and Azure.',
    },
    {
      phase: 'Altinn Studio Contributions',
      description:
        'Development of form editor features, conditional logic engine, and agency dashboard components within Altinn Studio.',
    },
    {
      phase: 'Integration Layer',
      description:
        'Implementation of ID-porten, Maskinporten, and Norwegian register integrations. Event-driven messaging via Azure Service Bus.',
    },
    {
      phase: 'Infrastructure & Security',
      description:
        'AKS cluster configuration, Azure DevOps pipelines, Key Vault setup, and NSM security framework compliance validation.',
    },
    {
      phase: 'Testing & Hardening',
      description:
        'End-to-end testing, load testing, security penetration testing, and GDPR compliance audit.',
    },
    {
      phase: 'Go-Live & Continuous Delivery',
      description:
        'Phased migration from Altinn 2, production monitoring, and ongoing iterative delivery across platform sprints.',
    },
  ],

  outcomes: [
    'Platform serves over 5 million Norwegian citizens and hundreds of thousands of businesses with high-availability digital government services.',
    'Government agencies can build and publish new digital services in days rather than months, dramatically reducing time-to-deployment.',
    'Achieved 99.99% uptime across critical platform services, meeting national digital infrastructure standards.',
    'Altinn Studio enables non-developer staff at government agencies to independently create forms, workflows, and digital processes.',
    'Full GDPR compliance and NSM security framework alignment across all platform components.',
    'Event-driven architecture enables real-time data exchange between Norwegian government registries and agency systems.',
    'Open-source collaboration model established, enabling ongoing community contributions and public auditability.',
  ],

  capabilities: [
    'Cloud-native microservices on Azure Kubernetes Service',
    'Low-code application builder for government agencies',
    'Secure national identity integration (ID-porten / Maskinporten)',
    'Event-driven inter-service communication',
    'Multi-agency RBAC and authorization',
    'Digital forms engine with conditional logic',
    'Document storage and correspondence management',
    'Automated CI/CD with multi-environment promotion',
    'GDPR-compliant data architecture',
    'Open-source development on GitHub',
  ],

  heroImage: {
    alt: "Altinn 3 digital government platform — cloud architecture and citizen services",
    brief:
      'Clean, authoritative composition showing layered digital government services. Norwegian public sector aesthetic — blue and white tones. Stylized representation of citizen-government digital interaction: mobile/desktop screens showing form completion, overlaid with architectural elements (microservices nodes, cloud icons, API connections). Background should evoke trust, security, and national infrastructure.',
  },

  architectureDiagram: {
    title: 'Altinn 3 Platform Architecture',
    brief:
      'Layered architecture with 6 horizontal tiers: Users (Citizens, Businesses, Agency Developers, Administrators) → Frontend (Altinn Studio UI, Altinn Apps UI, Agency Dashboard, API Portal) → API Gateway (Azure API Management, OpenID Connect, Rate limiting) → Microservices (Authorization, Storage, Register, Profile, Notification, Workflow) → Integration Layer (ID-porten, Maskinporten, Folkeregisteret, Enhetsregisteret, Skatteetaten, Azure Service Bus) → Data Layer (PostgreSQL per service, Azure Blob Storage, Redis Cache, Azure Cosmos DB). Security rail: Azure Key Vault, NSM Compliance, GDPR Controls, Azure AD.',
    layers: [
      {
        name: 'Users & Channels',
        components: ['Citizens', 'Businesses', 'Agency Developers', 'Administrators'],
      },
      {
        name: 'Frontend',
        components: ['Altinn Studio UI', 'Altinn Apps UI', 'Agency Dashboard', 'API Portal'],
      },
      {
        name: 'API Gateway',
        components: ['Azure API Management', 'OpenID Connect', 'Rate Limiting'],
      },
      {
        name: 'Microservices',
        components: ['Authorization', 'Storage', 'Register', 'Profile', 'Notification', 'Workflow'],
      },
      {
        name: 'Integration Layer',
        components: [
          'ID-porten',
          'Maskinporten',
          'Folkeregisteret',
          'Enhetsregisteret',
          'Skatteetaten',
          'Azure Service Bus',
        ],
      },
      {
        name: 'Data Layer',
        components: ['PostgreSQL', 'Azure Blob Storage', 'Redis', 'Azure Cosmos DB'],
      },
    ],
  },

  seo: {
    title: "Altinn 3: skyplattform for digital forvaltning | Xala",
    description:
      "Xala contributed to modernizing Norway's national digital government platform Altinn 3 with cloud-native microservices on Azure, serving 5 million citizens with 99.99% uptime and enabling agencies to deploy digital services independently.",
  },

  card: {
    title: 'Altinn 3 & Altinn Studio',
    excerpt:
      "Cloud-native modernization of Norway's national digital government platform, serving 5 million citizens across all Norwegian public-sector digital services.",
  },
  translations: {
    no: {
      subtitle: 'Modernisering av Norges nasjonale digitale offentlige plattform med skybasert arkitektur',
      summary: 'Xala bidro til utvikling og modernisering av Altinn 3, Norges hjørnesteinplattform for digital forvaltning som betjener over 5 millioner innbyggere og bedrifter. I samarbeid med Digdir leverte vi viktige arkitektur-, utviklings- og skyinfrastrukturbidrag for en moderne, containerpakket, hendelsesorientert plattform bygget på Azure og Kubernetes.',
      challenge: [
        'Det eldre Altinn 2-systemet var en monolittisk, on-premises løsning bygget over to tiår, med store drifts- og vedlikeholdsutfordringer for norske myndigheter.',
        'Modernisering av kritisk nasjonal infrastruktur som betjener millioner av daglige transaksjoner, uten å forstyrre eksisterende tjenester.',
        'Migrering av hundrevis av statlige tjenester til den nye plattformen med full bakoverkompatibilitet.',
        'Oppfyllelse av strenge norske krav til sikkerhet, personvern og offentlig administrasjon i en skybasert arkitektur.',
        'Skalering av plattformen for å håndtere toppbelastninger under nasjonale skatteinnleveringsperioder og offentlige tjenesteutgivelser.',
      ],
      objectives: [
        'Levere en sky-native arkitektur på Azure og Kubernetes som erstatter den eldre monolittiske plattformen',
        'Muliggjøre kontinuerlig deployment og uavhengige tjenesteutgivelser for hundrevis av statlige tjenester',
        'Oppnå 99,99 % oppetid SLA for nasjonalt kritisk offentlig infrastruktur',
        'Implementere event-drevet kommunikasjon via Azure Service Bus og API-gateway-mønstre',
        'Levere Altinn Studio — en lavkode tjenestebygger for ikke-tekniske statlige tjenestedesignere',
      ],
      solution: {
        overview: 'Løsningen innebar migrering av Altinn fra en monolittisk on-premises applikasjon til en moderne mikrotjenestearkitektur på Azure Kubernetes Service. Xala bidro til viktige deler av plattformkjernen, API-infrastrukturen og DevOps-rørledningene som muliggjorde skalerbar, hendelsesdrevet tjenesteutgivelse.',
        modules: [
          'Mikrotjenestearkitektur på Azure Kubernetes Service (AKS)',
          'Azure API Management — API-gateway og sikkerhetslaget',
          'Azure Service Bus — hendelsesdrevet kommunikasjonslag',
          'Altinn Studio — lavkode tjenestebygger for offentlig sektor',
          'React & TypeScript — innbygger- og bedriftsvendte grensesnitt',
          '.NET 8 mikrotjenester — kjerneforretningslogikk og databehandling',
          'CI/CD-rørledninger — Azure DevOps og automatisert testinfrastruktur',
        ],
        users: ['Norske innbyggere og bedrifter (5M+)', 'Statlige tjenesteeiere og designere', 'Digdir plattformingeniører', 'Tredjeparts applikasjonsutviklere'],
      },
      timeline: [
        { phase: 'Oppdagelse og arkitektur', description: 'Kartlegging av legacy-systemets avhengigheter, definisjon av mikrotjenestedomener og fastsettelse av Azure-infrastrukturarkitektur med AKS og Service Bus.' },
        { phase: 'Kjerne plattformbygging', description: 'Utvikling av kjernemikrotjenestene, API-gateway-mønstrene og CI/CD-rørledningene som underbygger Altinn 3-plattformfundamentet.' },
        { phase: 'Altinn Studio-utvikling', description: 'Bygging av den visuelle lavkode tjenestebyggeren som gjør det mulig for ikke-tekniske statlige designere å lage og publisere digitale tjenester.' },
        { phase: 'Tjenesteindusjon og testing', description: 'Migrering av tidlige statlige tjenester til den nye plattformen, og utføring av ytelse-, last- og sikkerhetstesting.' },
        { phase: 'Nasjonalt utrykk', description: 'Full produksjonsutrulling med null nedetid migrering for millioner av aktive brukere og hundrevis av statlige tjenester.' },
        { phase: 'Kontinuerlig forbedring', description: 'Løpende plattformoptimalisering, ytelsestuning og funksjonsleveranse i takt med ny etterspørsel fra offentlig sektor.' },
      ],
      outcomes: [
        '99,99 % oppetid oppnådd over produksjonslevetiden for nasjonal offentlig infrastruktur',
        'Hundrevis av statlige tjenester migrert til den nye sky-native plattformen med full bakoverkompatibilitet',
        'Altinn Studio muliggjorde ikke-tekniske offentlige designere å lansere digitale tjenester selvstendig',
        '70 % reduksjon i infrastrukturkostnader sammenlignet med on-premises drift',
        'Skalerbar arkitektur som håndterer nasjonale toppbelastninger på tvers av skatteperioder og tjenesteutgivelser',
      ],
      capabilities: [
        'Sky-native arkitektur på Azure & Kubernetes',
        'Mikrotjenestedesign og domenedeling',
        'Azure Service Bus hendelsesdrevet integrasjon',
        'Azure API Management & sikkerhet',
        'Lavkode plattformbygging (Altinn Studio)',
        'CI/CD og DevOps automatisering',
        'Sikker nasjonal identitets- og registerintegrasjon',
        'Ytelsesskalering for offentlig infrastruktur',
      ],
      scope: [
        'Nasjonal digital forvaltningsplattform',
        'Altinn 3 mikrotjenesteplattform',
        'Altinn Studio lavkode tjenestebygger',
        'Innbygger- og bedriftsvendte digitale tjenester',
        'Sikre nasjonale identitets- og registerintegrasjoner',
      ],
      card: { excerpt: 'Transformerte Norges nasjonale digitale forvaltningsplattform — sky-native arkitektur på Azure og Kubernetes som betjener 5M+ innbyggere med 99,99 % oppetid.' },
      seo: { description: 'Se hvordan Xala moderniserte Altinn 3 med Azure og Kubernetes, og leverte 99,99 % oppetid for Norges nasjonale plattform for digital forvaltning.' },
    },
    ar: {
      subtitle: 'تحديث المنصة الرقمية الحكومية الوطنية النرويجية بهندسة سحابية حديثة',
      summary: 'ساهمت Xala في تطوير وتحديث Altinn 3، منصة الحكومة الرقمية الأساسية في النرويج التي تخدم أكثر من 5 ملايين مواطن وشركة. بالتعاون مع Digdir، قدمنا مساهمات محورية في الهندسة المعمارية والتطوير والبنية التحتية السحابية لمنصة حديثة مبنية على Azure وKubernetes.',
      challenge: [
        'كان نظام Altinn 2 القديم نظامًا متكاملًا يعمل على الخوادم المحلية، مما أوجد تحديات تشغيلية وصيانة كبيرة للحكومة النرويجية.',
        'تحديث بنية تحتية وطنية حيوية تخدم ملايين المعاملات اليومية دون تعطيل الخدمات القائمة.',
        'ترحيل مئات الخدمات الحكومية إلى المنصة الجديدة مع الحفاظ على التوافق مع الإصدارات السابقة.',
        'تلبية متطلبات الأمان والخصوصية والإدارة الحكومية النرويجية الصارمة في بنية سحابية.',
        'توسيع نطاق المنصة للتعامل مع ذروة الحمل خلال مواسم تقديم الضرائب وإطلاق الخدمات العامة.',
      ],
      objectives: [
        'تقديم بنية سحابية على Azure وKubernetes تحل محل المنصة القديمة',
        'تمكين النشر المستمر وإصدارات الخدمات المستقلة لمئات الخدمات الحكومية',
        'تحقيق اتفاقية مستوى الخدمة 99.99% لبنية تحتية وطنية حيوية',
        'تنفيذ الاتصال القائم على الأحداث عبر Azure Service Bus وأنماط بوابة API',
        'تقديم Altinn Studio — أداة بناء خدمات منخفضة الكود لمصممي الخدمات الحكومية غير التقنيين',
      ],
      solution: {
        overview: 'تضمنت الحل ترحيل Altinn من تطبيق متكامل محلي إلى بنية خدمات مصغرة حديثة على Azure Kubernetes Service. ساهمت Xala في المكونات الأساسية للمنصة وبنية API والخطوط الآلية لـ DevOps.',
      },
      scope: [
        'منصة حكومية رقمية وطنية',
        'منصة الخدمات المصغّرة Altinn 3',
        'أداة بناء الخدمات منخفضة الكود Altinn Studio',
        'خدمات رقمية موجّهة للمواطنين والشركات',
        'تكاملات آمنة مع سجلات الهوية والسجلات الوطنية',
      ],
      timeline: [
        { phase: 'الاستكشاف والهندسة المعمارية', description: 'حصر اعتماديات النظام القديم، وتحديد نطاقات الخدمات المصغّرة، وإقرار بنية Azure التحتية مع AKS وService Bus.' },
        { phase: 'بناء المنصة الأساسية', description: 'تطوير الخدمات المصغّرة الأساسية وأنماط بوابة الـAPI وخطوط CI/CD التي يقوم عليها أساس منصة Altinn 3.' },
        { phase: 'تطوير Altinn Studio', description: 'بناء أداة بناء الخدمات المرئية منخفضة الكود التي تمكّن المصممين الحكوميين غير التقنيين من إنشاء الخدمات الرقمية ونشرها.' },
        { phase: 'إدخال الخدمات والاختبار', description: 'ترحيل الخدمات الحكومية الأولى إلى المنصة الجديدة، وإجراء اختبارات الأداء والحمل والأمن.' },
        { phase: 'الإطلاق الوطني', description: 'نشر إنتاجي كامل بترحيل دون توقّف لملايين المستخدمين النشطين ومئات الخدمات الحكومية.' },
        { phase: 'التحسين المستمر', description: 'تحسين مستمر للمنصة وضبط الأداء وتسليم الميزات بالتوازي مع الطلب الجديد من القطاع العام.' },
      ],
      outcomes: [
        'تحقيق 99.99% من وقت التشغيل عبر عمر الإنتاج للبنية التحتية الحكومية الوطنية',
        'ترحيل مئات الخدمات الحكومية إلى المنصة السحابية الجديدة مع الحفاظ على التوافق الكامل',
        'مكّن Altinn Studio المصممين الحكوميين غير التقنيين من إطلاق الخدمات الرقمية باستقلالية',
        'تخفيض تكاليف البنية التحتية بنسبة 70% مقارنة بالتشغيل المحلي',
        'بنية قابلة للتوسع تتعامل مع ذروة الأحمال الوطنية عبر مواسم الضرائب وإطلاق الخدمات',
      ],
      card: { excerpt: 'حوّل المنصة الرقمية الحكومية الوطنية النرويجية — بنية سحابية على Azure وKubernetes تخدم أكثر من 5 ملايين مواطن بنسبة توفر 99.99%.' },
      seo: { description: 'اكتشف كيف حدّثت Xala منصة Altinn 3 ببنية Azure وKubernetes السحابية، وحققت 99.99% وقت تشغيل للمنصة الرقمية الحكومية الوطنية النرويجية.' },
    },
  },
};
