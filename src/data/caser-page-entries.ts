export interface CaserEntry {
  id: string;
  title: string;
  description: string;
  /** Client logo. Optional: not every client has one in public/clients/. */
  imageUrl?: string;
  slug?: string;
  sector: string;
  tags: string[];
}

export const caserEntries: CaserEntry[] = [
  {
    id: 'altinn',
    title: 'Altinn',
    description:
      'Xala contributed to development and modernization of Altinn 3 at Digdir, including Altinn Studio, on Azure and Kubernetes.',
    imageUrl: '/clients/altinn.svg',
    slug: 'altinn',
    sector: 'Public Sector',
    tags: ['.NET', 'Azure', 'Kubernetes', 'React', 'ID-porten'],
  },
  {
    id: 'norwegian',
    title: 'Norwegian Air Shuttle',
    description:
      "Connected SharePoint, Facebook Workplace, Active Directory, and SAP SuccessFactors into a unified enterprise digital workplace for a major European airline.",
    imageUrl: '/clients/norwegian.svg',
    slug: 'norwegian-airlines-enterprise-platform',
    sector: 'Aviation',
    tags: ['SharePoint', 'SAP', 'Active Directory', '.NET', 'Facebook Workplace'],
  },
  {
    id: 'sparebank1',
    title: 'SpareBank 1',
    description:
      'Supporting secure banking systems, enterprise integrations, and scalable digital services in a regulated financial environment.',
    imageUrl: '/clients/sparebank.png',
    slug: 'sparebank-1-banking-systems',
    sector: 'Finance',
    tags: ['.NET', 'SQL Server', 'Integration', 'APIs', 'Security'],
  },
  {
    id: 'furst',
    title: 'Fürst Medisinsk Laboratorium',
    description:
      'Supporting a secure healthcare communication platform for medical professionals through scalable architecture, backend services, and enterprise integrations.',
    imageUrl: '/clients/furst.png',
    slug: 'furst-forum',
    sector: 'Healthcare',
    tags: ['Healthcare', 'Communication Platform', 'Integrations', 'Enterprise Services', 'Secure Access'],
  },
  {
    id: 'ruter',
    title: 'Ruter',
    description:
      'Supporting an autonomous bus prototype deployed in Drammen and Ski through digital platform services, operational monitoring, and smart mobility architecture.',
    imageUrl: '/clients/ruter.png',
    slug: 'ruter-autonomous-bus-platform',
    sector: 'Public Transport',
    tags: ['Smart Mobility', '.NET', 'Azure', 'Transport Tech', 'Monitoring'],
  },
  {
    id: 'nordre-follo',
    title: 'Nordre Follo Municipality',
    description:
      'Delivering digital grant and licensing portals with modern architecture, React and .NET implementation, and alignment to municipal architecture principles.',
    imageUrl: '/clients/nordre-follo.svg',
    slug: 'nordre-follo-tilskuddsportal-bevillingsportal',
    sector: 'Public Sector',
    tags: ['Municipality', 'Public Sector', 'React', '.NET', 'Workflow Portals'],
  },
  {
    id: 'sykehuspartner',
    title: 'Sykehuspartner',
    description:
      'Modernizing healthcare collaboration and research workflows through SharePoint, SPFx, .NET Core APIs, and Azure integrations.',
    imageUrl: '/clients/sykehuspartner.svg',
    slug: 'sykehuspartner-forskningsportal',
    sector: 'Healthcare',
    tags: ['SharePoint', 'SPFx', '.NET Core', 'Azure', 'Integration'],
  },
  {
    id: 'nov',
    title: 'NOV',
    description:
      'Industrial IoT platform for real-time communication, monitoring, and data transmission across drilling equipment and rig systems using MQTT, Azure IoT, and SignalR.',
    imageUrl: '/clients/nov2.svg',
    slug: 'nov-industrial-iot-drilling-platform',
    sector: 'Energy',
    tags: ['Industrial IoT', 'Azure IoT', 'MQTT', '.NET', 'Real-Time'],
  },
  {
    id: 'unicef',
    title: 'UNICEF Afghanistan',
    description:
      'Child protection and birth registration platform supporting vulnerable child case workflows, secure data handling, and humanitarian reporting.',
    imageUrl: '/clients/unicef.png',
    slug: 'unicef-afghanistan-child-protection-birth-registration',
    sector: 'NGO / International',
    tags: ['Child Protection', 'Birth Registration', 'Case Management', 'Humanitarian', 'Secure Data'],
  },
  {
    id: 'unicef-liberia',
    title: 'UNICEF Liberia',
    description:
      'Delivering a secure platform for child protection, registration, anti-trafficking support, and reintegration workflows in a humanitarian context.',
    imageUrl: '/clients/unicef.png',
    slug: 'unicef-liberia-child-protection-registration-reintegration',
    sector: 'NGO / International',
    tags: ['Child Protection', 'Reintegration', 'Humanitarian Tech', 'Secure Case Workflows'],
  },
  {
    id: 'ocha',
    title: 'UNOCHA',
    description:
      'Global platform for mapping emergency stockpiles, improving humanitarian logistics visibility, and strengthening crisis-response coordination.',
    imageUrl: '/clients/ocha.png',
    slug: 'unocha-global-mapping-emergency-stockpiles',
    sector: 'NGO / International',
    tags: ['Humanitarian Logistics', 'Mapping', 'React', '.NET', 'Azure'],
  },
  {
    id: 'ssb',
    title: 'SSB',
    description:
      'Modernizing legacy public-sector systems through Java-to-.NET Core migration, structured architecture renewal, and maintainable enterprise delivery.',
    imageUrl: '/clients/ssb.svg',
    slug: 'ssb-legacy-system-modernization',
    sector: 'Public Sector',
    tags: ['.NET Core', 'Java Migration', 'Azure', 'Modernization', 'Integration'],
  },
  {
    id: 'telia',
    title: 'Telia',
    description:
      'Supporting telecommunications services, enterprise integrations, and scalable digital platform delivery in a high-availability telecom environment.',
    imageUrl: '/clients/telia.png',
    slug: 'telia-telecommunications-platform',
    sector: 'Telecom',
    tags: ['.NET', 'Azure', 'Integration', 'Enterprise', 'APIs'],
  },
  {
    id: 'norsk-helsenett',
    title: 'Norsk Helsenett',
    description:
      "Supporting secure healthcare infrastructure, integrations, and digital services for Norway's connected national health ecosystem.",
    imageUrl: '/clients/nhn.svg',
    slug: 'norsk-helsenett-healthcare-infrastructure',
    sector: 'Healthcare',
    tags: ['.NET', 'Azure', 'Integration', 'Security', 'APIs'],
  },
  {
    id: 'usaid',
    title: 'USAID',
    description:
      'Supporting digital development workflows, reporting, and coordinated service delivery in an international program environment.',
    imageUrl: '/clients/usaid.png',
    slug: 'usaid-digital-development-platform',
    sector: 'NGO / International',
    tags: ['React', '.NET', 'Azure', 'Integration', 'APIs'],
  },
  {
    id: 'globalconnect',
    title: 'GlobalConnect',
    description:
      'Delivering telecommunications infrastructure services, operational integrations, and scalable digital platform capabilities for enterprise connectivity.',
    imageUrl: '/clients/globelconnect.png',
    slug: 'globalconnect-telecommunications-platform',
    sector: 'Telecom',
    tags: ['.NET', 'Azure', 'Integration', 'Enterprise', 'APIs'],
  },
  {
    id: 'tds',
    title: 'TDS – Taxi Portal',
    description:
      'Delivering a digital transport platform for taxi workflows, operational coordination, backend services, and scalable mobility support.',
    slug: 'tds-taxi-portal',
    sector: 'Public Transport',
    tags: ['.NET', 'SQL Server', 'Azure', 'Transport Tech', 'Workflow Systems'],
  },
];

export const ALL_SECTORS = [
  'Public Sector',
  'Aviation',
  'Finance',
  'Healthcare',
  'Legal / Tech',
  'Public Transport',
  'Energy',
  'NGO / International',
  'Telecom',
] as const;

export const ALL_TAGS = [
  '.NET',
  'Azure',
  'SharePoint',
  'SAP',
  'Active Directory',
  'Kubernetes',
  'React',
  'ID-porten',
  'AI',
  'Integration',
  'Enterprise',
  'Cloud',
  'Data Platform',
  'Security',
  'APIs',
] as const;
