import type { CaseStudy } from '@/types/caseStudy';

export const novCaseStudy: CaseStudy = {
  slug: 'nov-industrial-iot-drilling-platform',
  title: 'NOV',
  subtitle:
    'Delivering an industrial IoT platform for real-time communication, monitoring, and data transmission across drilling equipment and rig systems',
  client: 'NOV',
  industry: 'Industrial IoT / Energy Technology / Enterprise Systems',
  sector: 'Energy',
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
    'Industrial IoT platform for drilling equipment',
    'Real-time telemetry & data transmission',
    'Rig-to-cloud connectivity',
    'Operational monitoring & alerting',
    'Event-driven message architecture',
  ],
  coreTechnologies: [
    'Azure IoT Hub',
    'MQTT protocol',
    'SignalR (real-time)',
    'Azure Service Bus',
    '.NET & C#',
    'WebSockets',
    'Microsoft Azure',
  ],
  logoUrl: '/clients/nov2.svg',
  imageUrl: '/clients/nov2.svg',

  summary:
    'In industrial environments, real-time visibility into equipment data is critical for operational control, monitoring, and decision support. Xala contributed to IoT-focused platform work for NOV involving communication with drill pipes and rig equipment, using technologies such as MQTT, Azure IoT, Service Bus, WebSockets, and SignalR to support reliable real-time data transmission and industrial monitoring capabilities.',

  challenge: [
    'Collecting and transmitting real-time data from connected industrial equipment reliably in an operationally critical drilling environment.',
    'Ensuring reliable communication across multiple messaging and transport mechanisms including MQTT, WebSockets, and Azure Service Bus.',
    'Handling integration between IoT devices, backend processing services, and operational monitoring interfaces.',
    'Creating maintainable architecture capable of handling high-volume event-driven message processing at industrial scale.',
    'Providing real-time visibility for industrial monitoring and operational decision support without introducing latency or reliability risks.',
    'Ensuring scalability as the volume of connected devices, messages, and real-time data streams grows over time.',
    'Supporting robust communication in environments where data gaps or delays have direct operational consequences.',
  ],

  objectives: [
    'Enable real-time communication with drill pipes and rig equipment through reliable IoT messaging',
    'Improve visibility into industrial equipment data for operational monitoring and decision support',
    'Support scalable messaging and event-driven backend processing for high-volume telemetry',
    'Strengthen IoT platform architecture and long-term maintainability',
    'Provide reliable operational monitoring capabilities across connected industrial systems',
    'Support integration between devices, backend services, and monitoring interfaces',
    'Create a future-ready foundation for industrial monitoring and control solutions',
  ],

  solution: {
    overview:
      'The work centred on delivering an industrial IoT platform for communication, monitoring, and real-time operational visibility across NOV drilling equipment and rig systems. Xala contributed across architecture, development, integration, and testing — implementing event-driven backend services, real-time data transmission using MQTT and Azure IoT, live communication channels via WebSockets and SignalR, and scalable message handling through Azure Service Bus.',
    modules: [
      'Equipment communication layer for drill pipes and rig systems',
      'MQTT-based device messaging and protocol support',
      'Azure IoT connectivity and device management',
      'Azure Service Bus message routing and processing',
      'WebSocket and SignalR real-time communication channels',
      '.NET backend services for event processing and business logic',
      'Operational monitoring dashboards and live data surfaces',
      'API-based integration with operational systems',
      'Scalable telemetry data storage and retrieval',
    ],
    users: [
      'Operational engineers and monitoring teams',
      'Rig supervisors and equipment operators',
      'Platform administrators and IT teams',
      'Backend service consumers and integrated systems',
    ],
  },

  architecture: {
    presentation: [
      'Operational monitoring dashboards',
      'Live equipment status interfaces',
      'Real-time data visualization views',
      'Administrative and configuration tools',
    ],
    services: [
      '.NET backend services for event processing',
      'Message orchestration and routing logic',
      'Monitoring and telemetry services',
      'Business logic and workflow handling',
    ],
    integrations: [
      'MQTT broker for device communication',
      'Azure IoT Hub for device connectivity',
      'Azure Service Bus for reliable message transport',
      'WebSocket and SignalR for live client communication',
      'APIs for operational system integration',
    ],
    data: [
      'Telemetry data store (equipment readings and events)',
      'Event records and message history',
      'Equipment state and operational metadata',
      'Historical and reporting data',
    ],
    infrastructure: [
      'Microsoft Azure (hosting and IoT services)',
      'Azure IoT Hub and Service Bus infrastructure',
      'Deployment and operational support',
      'Monitoring and system health tracking',
    ],
    security: [
      'Device authentication and secure IoT connectivity',
      'Access control for monitoring and operational interfaces',
      'Secure message transport across communication channels',
      'Audit logging for critical operational events',
    ],
  },

  technologies: {
    backend: ['.NET', 'C#', 'Event-driven backend services', 'Message processing logic'],
    databases: ['Telemetry data store', 'Event records', 'Equipment state and operational data'],
    cloud: ['Microsoft Azure', 'Azure IoT Hub', 'Azure Service Bus', 'Azure hosting'],
    integrations: [
      'MQTT (device communication protocol)',
      'Azure IoT Hub',
      'Azure Service Bus',
      'WebSockets',
      'SignalR',
      'REST APIs',
    ],
    devops: [
      'Functional testing and real-time flow validation',
      'Reliability testing for operational messaging',
      'Deployment support and operational readiness',
    ],
  },

  integrationHighlights: [
    'MQTT — Core IoT communication protocol for reliable device-to-platform messaging from drill pipes and rig equipment',
    'Azure IoT Hub — Cloud-based device connectivity and telemetry ingestion for industrial equipment communication',
    'Azure Service Bus — Reliable, scalable message routing and event processing between IoT services and backend systems',
    'WebSockets / SignalR — Real-time bidirectional communication channels for live data streaming to monitoring interfaces',
    '.NET Backend Services — Event processing, message orchestration, and business logic supporting industrial IoT workflows',
  ],

  timeline: [
    {
      phase: 'Requirement Analysis',
      description:
        'Device communication requirements, real-time monitoring needs, messaging patterns, and operational constraints were analyzed and translated into structured platform specifications.',
    },
    {
      phase: 'Architecture',
      description:
        'The IoT solution architecture was defined to support reliable device communication, scalable event-driven processing, and real-time data streaming — covering messaging protocols, service boundaries, and integration patterns.',
    },
    {
      phase: 'Development',
      description:
        'Backend services, messaging flows, real-time communication channels, and monitoring-related capabilities were implemented using .NET, Azure IoT, MQTT, Service Bus, WebSockets, and SignalR.',
    },
    {
      phase: 'Integration',
      description:
        'IoT communication channels, messaging infrastructure, and operational monitoring systems were connected and validated for reliable live data flow.',
    },
    {
      phase: 'Testing',
      description:
        'Quality assurance improved reliability, correctness, and confidence in real-time industrial workflows, with specific focus on message delivery guarantees and monitoring accuracy.',
    },
    {
      phase: 'Deployment and Stabilization',
      description:
        'The engagement contributed to a stronger digital foundation for industrial IoT and monitoring services, with controlled rollout and operational readiness for industrial use.',
    },
  ],

  outcomes: [
    'Improved real-time transmission of live equipment data from drill pipes and rig systems to platform services.',
    'Stronger operational monitoring and awareness through reliable live data channels and structured event processing.',
    'Better scalability for industrial messaging and event processing as device and message volumes grow.',
    'More maintainable IoT platform architecture with cleaner service boundaries and modern messaging patterns.',
    'Improved integration between devices, backend services, and operational monitoring interfaces.',
    'Stronger foundation for future industrial monitoring, control, and analytics capabilities.',
  ],

  capabilities: [
    'Industrial IoT communication and device connectivity',
    'MQTT-based equipment messaging',
    'Azure IoT Hub integration',
    'Azure Service Bus event processing',
    'WebSocket and SignalR real-time streaming',
    'Scalable backend event-processing architecture',
    'Operational monitoring and visibility',
    'API-based integration support',
    'Maintainable industrial IoT platform foundation',
    'Deployment support for industrial environments',
  ],

  heroImage: {
    alt: 'Illustration of an industrial IoT platform with connected rig equipment, live telemetry flows, real-time communication channels, and operational monitoring dashboards.',
    brief:
      'Create a premium enterprise-industrial hero image representing connected rig equipment, live telemetry flows, and real-time industrial monitoring. Communicate reliability, operational visibility, event-driven architecture, and modern IoT platform engineering. Include industrial equipment or rig-inspired abstract elements, live data signal/telemetry overlays, connected nodes or message flow lines, and monitoring interface cues. Mood: technical, reliable, live, industrial, enterprise-grade. Dark blue/slate/steel palette with real-time data flow emphasis. Avoid oil-rig marketing clichés, unsafe or dramatic industrial scenes, or overly dark sci-fi visuals.',
  },

  architectureDiagram: {
    title: 'NOV — Industrial IoT and Real-Time Equipment Data Architecture',
    brief:
      'Layered IoT diagram: Devices (Drill pipes, Rig equipment, Industrial endpoints, Sensors) → Communication Channels (MQTT, Azure IoT, Azure Service Bus, WebSockets, SignalR) → Application Services (.NET backend, Event processing, Message orchestration, Monitoring services) → Integration Layer (APIs, Operational systems, Monitoring dashboards) → Data Layer (Telemetry data, Event records, Equipment state, Historical/reporting data) → Infrastructure/Operations (Azure hosting, Testing layer, Deployment support, Monitoring). Industrial-tech aesthetic, dark blue/slate/steel palette with live signal and data flow cues.',
    layers: [
      {
        name: 'Devices',
        components: [
          'Drill Pipes',
          'Rig Equipment',
          'Industrial Endpoints',
          'Sensors & Connected Components',
        ],
      },
      {
        name: 'Communication Channels',
        components: [
          'MQTT',
          'Azure IoT Hub',
          'Azure Service Bus',
          'WebSockets',
          'SignalR',
        ],
      },
      {
        name: 'Application Services',
        components: [
          '.NET Backend Services',
          'Event Processing',
          'Message Orchestration',
          'Monitoring Services',
          'Business Logic',
        ],
      },
      {
        name: 'Integration Layer',
        components: [
          'REST APIs',
          'Operational Systems',
          'Monitoring Dashboards',
          'Service Integrations',
        ],
      },
      {
        name: 'Data Layer',
        components: [
          'Telemetry Data',
          'Event Records',
          'Equipment State',
          'Historical & Reporting Data',
        ],
      },
      {
        name: 'Infrastructure & Operations',
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
    title: 'NOV Case Study | Xala Technologies',
    description:
      'See how Xala supported NOV with an industrial IoT platform using Azure IoT, MQTT, Service Bus, WebSockets, and SignalR for real-time monitoring and drilling equipment data transmission.',
  },

  card: {
    title: 'NOV',
    excerpt:
      'Delivering an industrial IoT platform for real-time communication, monitoring, and data transmission across drilling equipment and rig systems.',
  },
  translations: {
    no: {
      subtitle: 'Leveranse av en industriell IoT-plattform for sanntidskommunikasjon, overvåking og dataoverføring på tvers av boreutstyr og riggssystemer',
      summary: 'I industrielle miljøer er sanntidssiktbarhet inn i utstyrdata kritisk for driftstyring, overvåking og beslutningsstøtte. Xala bidro til IoT-fokusert plattformarbeid for NOV som involverte kommunikasjon med borestrenger og riggutstyr — ved hjelp av teknologier som MQTT, Azure IoT, Service Bus, WebSockets og SignalR for å støtte pålitelig sanntidsdataoverføring og industriell overvåkningskapasitet.',
      challenge: [
        'Innsamling og overføring av sanntidsdata fra tilkoblet industrielt utstyr pålitelig i et driftskritisk boringsmiljø.',
        'Lav latens meldingsoverføring mellom borestrenger og overvåkingssystemer med strenge pålitelighets- og tilgjengelighetskrav.',
        'Håndtering av høy telemetrivolum fra multiple tilkoblede riggkomponenter og utstyrsenheter.',
        'Sikker skyintegrasjon for industrielle IoT-data med korrekt tilgangskontroll.',
        'Skalerbar arkitektur som kan vokse med antall tilkoblede enheter og datavolum.',
      ],
      objectives: [
        'Bygge pålitelig sanntidskommunikasjonsinfrastruktur for tilkoblet boreutstyr',
        'Implementere MQTT-basert meldingsprotokoll for lave latensdataoverføringer',
        'Integrere Azure IoT Hub og Service Bus for skybasert hendelseshåndtering',
        'Levere SignalR-drevne sanntids-dashboardoppdateringer for riggoperatører',
        'Sikre skalerbar IoT-plattformarkitektur for industriell vekst',
      ],
      solution: {
        overview: 'Plattformen utnyttet Azure IoT Hub, MQTT-protokoll og Azure Service Bus for å skape en robust hendelsesdrevet kommunikasjonsinfrastruktur for NOVs industrielle boreutstyr. SignalR aktiverte sanntids-WebSocket-oppdateringer til overvåkningsdashboards, mens .NET-bakgrunnsarbeidere håndterte telemetriprosessering og hendelsesdistribusjon.',
        modules: [
          'Azure IoT Hub — sentralisert enhetsregistrering og meldingsinntak',
          'MQTT-protokoll — lavlatensmeldingsoverføring fra borestrenger og riggutstyr',
          'Azure Service Bus — hendelsesdrevet meldingskø og distribusjonsinfrastruktur',
          'SignalR — sanntids WebSocket-oppdateringer til operatørdashboards',
          '.NET bakgrunnsarbeidere — telemetriprosessering og hendelsesruting',
          'Azure skyinfrastruktur — skalerbar hosting og IoT plattformfundament',
          'Industriell utstyrsintegrasjon — kommunikasjonslag med rigg og borekomponenter',
        ],
      },
      outcomes: [
        'Pålitelig sanntidsdataoverføring fra industrielt boreutstyr oppnådd.',
        'Lav latens MQTT-meldingsinfrastruktur levert for kritiske riggkommunikasjoner.',
        'Azure IoT Hub og Service Bus integrert for skalerbar skybasert hendelseshåndtering.',
        'SignalR-drevne sanntidsdashboards muliggjorde raskere driftsrespons.',
        'Skalerbar IoT-plattformfundament etablert for fremtidig enhetstilkobling.',
      ],
      capabilities: [
        'Industriell IoT-plattformutvikling',
        'MQTT-protokoll og meldingsinfrastruktur',
        'Azure IoT Hub-integrasjon',
        'Azure Service Bus hendelsesorientert arkitektur',
        'SignalR sanntidskommunikasjon',
        'Telemetriprosessering og -administrasjon',
        'Skalerbar IoT-skyarkitektur',
        'Industriell utstyrstilkobling',
      ],
      card: { excerpt: 'Industriell IoT-plattform for sanntidskommunikasjon, overvåking og dataoverføring på tvers av boreutstyr og riggsystemer ved bruk av MQTT, Azure IoT og SignalR.' },
      seo: { description: 'Se hvordan Xala leverte en industriell IoT-plattform for NOV med Azure IoT Hub, MQTT, SignalR og sanntids overvåking av boreoperasjoner.' },
    },
    ar: {
      subtitle: 'تقديم منصة إنترنت الأشياء الصناعية للتواصل في الوقت الفعلي والمراقبة ونقل البيانات عبر معدات الحفر وأنظمة الحفارات',
      summary: 'في البيئات الصناعية، الرؤية في الوقت الفعلي لبيانات المعدات أمر بالغ الأهمية للتحكم التشغيلي والمراقبة ودعم القرار. ساهمت Xala في عمل المنصة المركّز على إنترنت الأشياء لـ NOV، الذي تضمن التواصل مع أعمدة الحفر ومعدات الحفارات باستخدام MQTT وAzure IoT وService Bus وWebSockets وSignalR.',
      outcomes: [
        'تحقيق نقل بيانات موثوق في الوقت الفعلي من معدات الحفر الصناعية.',
        'تسليم بنية تحتية لرسائل MQTT منخفضة الكمون للاتصالات الحيوية للحفارات.',
        'دمج Azure IoT Hub وService Bus للتعامل مع الأحداث المستندة إلى السحابة وقابلة للتوسع.',
        'لوحات معلومات SignalR في الوقت الفعلي مكّنت استجابة تشغيلية أسرع.',
        'تأسيس منصة إنترنت الأشياء القابلة للتوسع لتوصيل الأجهزة في المستقبل.',
      ],
      card: { excerpt: 'منصة إنترنت الأشياء الصناعية للتواصل في الوقت الفعلي والمراقبة ونقل البيانات عبر معدات الحفر وأنظمة الحفارات باستخدام MQTT وAzure IoT وSignalR.' },
      seo: { description: 'اكتشف كيف قدمت Xala منصة إنترنت الأشياء الصناعية لـ NOV مع Azure IoT Hub وMQTT وSignalR والمراقبة في الوقت الفعلي لعمليات الحفر.' },
    },
  },
};
