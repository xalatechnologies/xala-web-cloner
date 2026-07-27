/**
 * Per-page SEO copy.
 *
 * There is one entry per real route, including the error page — anything
 * missing here ships without a title or description, which is what happened
 * while this file only covered five ids against fourteen routes.
 *
 * Copy is grounded in what the site actually contains: services and products
 * come from src/data/{services,products}.json, the named clients from
 * src/data/clients.json. Keep titles at roughly 60 characters and descriptions
 * at 150–160 so search results are not truncated.
 */

type Language = 'no' | 'en' | 'ar';

type PageId =
  | 'home'
  | 'services'
  | 'products'
  | 'cases'
  | 'caseStudy'
  | 'process'
  | 'technology'
  | 'about'
  | 'contact'
  | 'careers'
  | 'status'
  | 'transparency'
  | 'blog'
  | 'blogPost'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'notFound';

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
}

const seoContent: Record<Language, Record<PageId, SEOContent>> = {
  no: {
    home: {
      title: 'Xala Technologies | Skreddersydd programvare og AI',
      description:
        'Norsk systemutviklingshus i Asker. Vi bygger skreddersydd programvare, AI-løsninger, skytjenester og systemintegrasjon for offentlig sektor og næringsliv.',
      keywords:
        'systemutvikling, skreddersydd programvare, AI-utvikling, skyløsninger, systemintegrasjon, cybersikkerhet, Asker, Norge, offentlig sektor'
    },
    services: {
      title: 'Tjenester | Xala Technologies',
      description:
        'Saksbehandlingssystemer, tilskudds- og bevillingsportaler, integrasjoner mot nasjonale felleskomponenter, modernisering av fagsystemer, automatisering og forvaltning.',
      keywords:
        'saksbehandlingssystem, tilskuddsportal, bevillingsportal, integrasjon Altinn, Maskinporten, modernisering fagsystem, automatisering saksbehandling, systemutvikling offentlig sektor'
    },
    products: {
      title: 'Produkter | Xala Technologies',
      description:
        'Norchain, Xaheen AI Builder og DigiList — egne produkter utviklet av Xala Technologies for norsk offentlig sektor og næringsliv.',
      keywords: 'Norchain, Xaheen AI Builder, DigiList, norske programvareprodukter, AI-verktøy, digitale plattformer'
    },
    cases: {
      title: 'Kundecaser | Xala Technologies',
      description:
        'Se hva vi har levert for SSB, Norsk helsenett, Altinn, Nordre Follo kommune, SpareBank 1, Telia, UNICEF og andre oppdragsgivere.',
      keywords: 'kundecaser, referanser, prosjekter, offentlig sektor, SSB, Altinn, Norsk helsenett, digitalisering'
    },
    caseStudy: {
      title: 'Kundecase | Xala Technologies',
      description:
        'Gjennomgang av et kundeprosjekt: utfordringen, løsningen vi bygde, teknologivalgene bak den og de målbare resultatene.',
      keywords: 'kundecase, prosjekt, referanse, systemutvikling, resultater, teknologivalg'
    },
    process: {
      title: 'Slik jobber vi | Xala Technologies',
      description:
        'Fra idé til drift: hvordan vi kartlegger behov, utvikler i korte sykluser, tester og forvalter løsningen sammen med kunden.',
      keywords: 'arbeidsmetode, smidig utvikling, prosjektmetodikk, systemutvikling, forvaltning, samarbeid'
    },
    technology: {
      title: 'Teknologi | Xala Technologies',
      description:
        'Teknologistakken vi bygger på: React og TypeScript, Node.js, Python, Go og Rust, Azure, AWS og Google Cloud, Docker og Kubernetes.',
      keywords: 'React, TypeScript, Node.js, Python, Go, Rust, Azure, AWS, Kubernetes, PostgreSQL, TensorFlow, teknologistack'
    },
    about: {
      title: 'Om oss | Xala Technologies',
      description:
        'Xala Technologies AS er et systemutviklingshus i Asker. Møt teamet, og les om hvorfor kunder i offentlig sektor velger oss.',
      keywords: 'om Xala Technologies, systemutviklingshus, team, teknologieksperter, Asker, Nesbru, Norge'
    },
    contact: {
      title: 'Kontakt | Xala Technologies',
      description:
        'Ta kontakt med Xala Technologies AS i Asker. Fortell oss om prosjektet, så svarer vi med hvordan vi kan hjelpe.',
      keywords: 'kontakt, teknologikonsultasjon, IT-rådgivning, tilbud, Asker, Nesbru, Norge'
    },
    careers: {
      title: 'Karriere | Xala Technologies',
      description:
        'Vil du utvikle programvare hos oss? Se åpne stillinger i Xala Technologies og hvordan det er å jobbe i teamet vårt i Asker.',
      keywords: 'karriere, jobb, stillinger, utviklerjobb, systemutvikler, Asker, Norge, IT-jobb'
    },
    status: {
      title: 'Driftsstatus | Xala Technologies',
      description:
        'Hvordan Xala Technologies følger opp driften av løsningene vi har levert, varsler ved hendelser, og rapporterer oppetid til kundene.',
      keywords: 'driftsstatus, oppetid, hendelser, drift, forvaltning, SLA'
    },
    transparency: {
      title: 'Åpenhet om drift og sikkerhet | Xala Technologies',
      description:
        'Åpenhet om oppetids- og SLA-forpliktelser, ISO 27001-sertifisering og hvordan sikkerhet er forankret i det vi leverer.',
      keywords: 'åpenhet, SLA, oppetid, ISO 27001, sikkerhet, forvaltning'
    },
    blog: {
      title: 'Fagartikler | Xala Technologies',
      description:
        'Fagartikler om systemutvikling, AI, skyarkitektur, systemintegrasjon og digitalisering av offentlig sektor.',
      keywords: 'fagartikler, blogg, systemutvikling, AI, skyarkitektur, digitalisering, offentlig sektor'
    },
    blogPost: {
      title: 'Fagartikkel | Xala Technologies',
      description:
        'Fagartikkel fra utviklerne i Xala Technologies om systemutvikling, arkitektur og digitalisering.',
      keywords: 'fagartikkel, systemutvikling, arkitektur, AI, digitalisering'
    },
    privacy: {
      title: 'Personvernerklæring | Xala Technologies',
      description:
        'Hvordan Xala Technologies AS behandler personopplysninger, hvilke rettigheter du har, og hvordan du kan bruke dem.',
      keywords: 'personvern, personvernerklæring, GDPR, personopplysninger, databehandling'
    },
    terms: {
      title: 'Vilkår for bruk | Xala Technologies',
      description: 'Vilkårene som gjelder for bruk av nettstedet og tjenestene til Xala Technologies AS.',
      keywords: 'vilkår, brukervilkår, betingelser, avtale'
    },
    cookies: {
      title: 'Informasjonskapsler | Xala Technologies',
      description:
        'Hvilke informasjonskapsler nettstedet vårt bruker, hva de brukes til, og hvordan du styrer dem selv.',
      keywords: 'informasjonskapsler, cookies, sporing, samtykke, personvern'
    },
    notFound: {
      title: 'Siden finnes ikke | Xala Technologies',
      description: 'Vi fant ikke siden du lette etter. Gå til forsiden, eller ta kontakt om du mener noe mangler.',
      keywords: 'siden finnes ikke, 404'
    }
  },

  en: {
    home: {
      title: 'Xala Technologies | Custom Software and AI',
      description:
        'Norwegian software house in Asker. We build custom software, AI solutions, cloud services and system integration for the public sector and private business.',
      keywords:
        'software development, custom software, AI development, cloud solutions, system integration, cybersecurity, Asker, Norway, public sector'
    },
    services: {
      title: 'Services | Xala Technologies',
      description:
        'Case management systems, grant and licensing portals, integrations with Norwegian national components, legacy modernisation, automation and long-term operations.',
      keywords:
        'case management system, grant portal, licensing portal, Altinn integration, Maskinporten, legacy modernisation, caseworking automation, public sector software Norway'
    },
    products: {
      title: 'Products | Xala Technologies',
      description:
        'Norchain, Xaheen AI Builder and DigiList — products built by Xala Technologies for the Norwegian public sector and private business.',
      keywords: 'Norchain, Xaheen AI Builder, DigiList, Norwegian software products, AI tooling, digital platforms'
    },
    cases: {
      title: 'Case Studies | Xala Technologies',
      description:
        'What we have delivered for Statistics Norway, Norsk helsenett, Altinn, Nordre Follo, SpareBank 1, Telia, UNICEF and others.',
      keywords: 'case studies, references, projects, public sector, Statistics Norway, Altinn, digitalisation'
    },
    caseStudy: {
      title: 'Case Study | Xala Technologies',
      description:
        'A walk through one client project: the problem, the solution we built, the technology choices behind it and the measurable outcome.',
      keywords: 'case study, project, reference, software development, outcomes, technology choices'
    },
    process: {
      title: 'How We Work | Xala Technologies',
      description:
        'From idea to operations: how we map requirements, build in short cycles, test, and maintain the solution together with the client.',
      keywords: 'process, agile development, project methodology, software delivery, maintenance, collaboration'
    },
    technology: {
      title: 'Technology | Xala Technologies',
      description:
        'The stack we build on: React and TypeScript, Node.js, Python, Go and Rust, Azure, AWS and Google Cloud, Docker and Kubernetes.',
      keywords: 'React, TypeScript, Node.js, Python, Go, Rust, Azure, AWS, Kubernetes, PostgreSQL, TensorFlow, tech stack'
    },
    about: {
      title: 'About Us | Xala Technologies',
      description:
        'Xala Technologies AS is a software house in Asker, Norway. Meet the team and read why public sector clients choose us.',
      keywords: 'about Xala Technologies, software house, team, technology experts, Asker, Nesbru, Norway'
    },
    contact: {
      title: 'Contact | Xala Technologies',
      description:
        'Get in touch with Xala Technologies AS in Asker, Norway. Tell us about your project and we will reply with how we can help.',
      keywords: 'contact, technology consultation, IT consulting, request a quote, Asker, Nesbru, Norway'
    },
    careers: {
      title: 'Careers | Xala Technologies',
      description:
        'Want to build software with us? See open roles at Xala Technologies and what it is like to work in our team in Asker.',
      keywords: 'careers, jobs, open roles, developer job, software engineer, Asker, Norway, IT jobs'
    },
    status: {
      title: 'Status | Xala Technologies',
      description:
        'How Xala Technologies follows up the operation of the solutions we deliver, alerts on incidents, and reports uptime to clients.',
      keywords: 'status, uptime, incidents, operations, maintenance, SLA'
    },
    transparency: {
      title: 'Transparency on Operations | Xala Technologies',
      description:
        'Openness about our uptime and SLA commitments, ISO 27001 certification, and how security is built into what we deliver.',
      keywords: 'transparency, SLA, uptime, ISO 27001, security, operations'
    },
    blog: {
      title: 'Articles | Xala Technologies',
      description:
        'Articles on software development, AI, cloud architecture, system integration and digitalisation of the public sector.',
      keywords: 'articles, blog, software development, AI, cloud architecture, digitalisation, public sector'
    },
    blogPost: {
      title: 'Article | Xala Technologies',
      description: 'An article from the engineers at Xala Technologies on software development, architecture and digitalisation.',
      keywords: 'article, software development, architecture, AI, digitalisation'
    },
    privacy: {
      title: 'Privacy Policy | Xala Technologies',
      description:
        'How Xala Technologies AS processes personal data, what rights you have, and how to exercise them.',
      keywords: 'privacy, privacy policy, GDPR, personal data, data processing'
    },
    terms: {
      title: 'Terms of Use | Xala Technologies',
      description: 'The terms that apply to your use of the Xala Technologies AS website and services.',
      keywords: 'terms, terms of use, conditions, agreement'
    },
    cookies: {
      title: 'Cookies | Xala Technologies',
      description: 'Which cookies this site uses, what they are used for, and how you can control them yourself.',
      keywords: 'cookies, tracking, consent, privacy'
    },
    notFound: {
      title: 'Page Not Found | Xala Technologies',
      description: 'We could not find the page you were looking for. Head back to the front page, or get in touch.',
      keywords: 'page not found, 404'
    }
  },

  ar: {
    home: {
      title: 'زالا تكنولوجيز | برمجيات مخصصة وحلول ذكاء اصطناعي',
      description:
        'شركة نرويجية لتطوير البرمجيات في أسكر. نبني برمجيات مخصصة وحلول ذكاء اصطناعي وخدمات سحابية وتكامل أنظمة للقطاع العام والشركات.',
      keywords: 'تطوير البرمجيات, برمجيات مخصصة, الذكاء الاصطناعي, الحلول السحابية, تكامل الأنظمة, الأمن السيبراني, النرويج'
    },
    services: {
      title: 'خدماتنا | زالا تكنولوجيز',
      description:
        'أنظمة إدارة القضايا، بوابات المنح والتراخيص، التكامل مع المكوّنات الوطنية النرويجية، تحديث الأنظمة القائمة، الأتمتة والتشغيل طويل الأمد.',
      keywords: 'نظام إدارة القضايا, بوابة المنح, بوابة التراخيص, تكامل Altinn, Maskinporten, تحديث الأنظمة, أتمتة المعالجة, برمجيات القطاع العام'
    },
    products: {
      title: 'منتجاتنا | زالا تكنولوجيز',
      description: 'نورتشين، وزاهين AI Builder، ودیجي‌ليست — منتجات من تطوير زالا تكنولوجيز للقطاع العام والشركات في النرويج.',
      keywords: 'نورتشين, زاهين, ديجي ليست, منتجات برمجية, أدوات ذكاء اصطناعي, منصات رقمية'
    },
    cases: {
      title: 'دراسات حالة | زالا تكنولوجيز',
      description:
        'ما أنجزناه لجهات مثل هيئة الإحصاء النرويجية، والشبكة الصحية النرويجية، وألتين، وسباريبانك 1، وتيليا، ويونيسف.',
      keywords: 'دراسات حالة, مشاريع, مراجع, القطاع العام, التحول الرقمي'
    },
    caseStudy: {
      title: 'دراسة حالة | زالا تكنولوجيز',
      description: 'عرض تفصيلي لمشروع واحد: التحدي، والحل الذي بنيناه، والخيارات التقنية وراءه، والنتائج القابلة للقياس.',
      keywords: 'دراسة حالة, مشروع, مرجع, تطوير البرمجيات, النتائج'
    },
    process: {
      title: 'كيف نعمل | زالا تكنولوجيز',
      description: 'من الفكرة إلى التشغيل: كيف نحدد الاحتياجات، ونطوّر بدورات قصيرة، ونختبر، وندير الحل مع العميل.',
      keywords: 'منهجية العمل, التطوير المرن, إدارة المشاريع, التشغيل, التعاون'
    },
    technology: {
      title: 'التقنيات | زالا تكنولوجيز',
      description:
        'التقنيات التي نبني عليها: React وTypeScript، وNode.js، وPython وGo وRust، وAzure وAWS وGoogle Cloud، وDocker وKubernetes.',
      keywords: 'React, TypeScript, Node.js, Python, Go, Rust, Azure, AWS, Kubernetes, PostgreSQL, TensorFlow'
    },
    about: {
      title: 'من نحن | زالا تكنولوجيز',
      description: 'زالا تكنولوجيز شركة لتطوير البرمجيات في أسكر بالنرويج. تعرّف على الفريق ولماذا يختارنا عملاء القطاع العام.',
      keywords: 'من نحن, شركة تطوير برمجيات, الفريق, خبراء التقنية, أسكر, النرويج'
    },
    contact: {
      title: 'اتصل بنا | زالا تكنولوجيز',
      description: 'تواصل مع زالا تكنولوجيز في أسكر بالنرويج. أخبرنا عن مشروعك وسنوضح لك كيف يمكننا المساعدة.',
      keywords: 'اتصل بنا, استشارة تقنية, استشارات تقنية معلومات, عرض سعر, النرويج'
    },
    careers: {
      title: 'الوظائف | زالا تكنولوجيز',
      description: 'هل ترغب في تطوير البرمجيات معنا؟ تعرّف على الوظائف المتاحة في زالا تكنولوجيز وطبيعة العمل في فريقنا.',
      keywords: 'وظائف, فرص عمل, مطور برمجيات, مهندس برمجيات, النرويج'
    },
    status: {
      title: 'حالة التشغيل | زالا تكنولوجيز',
      description:
        'كيف تتابع زالا تكنولوجيز تشغيل الحلول التي نقدمها، وتنبّه العملاء عند وقوع حوادث، وتُبلغهم بمعدل التشغيل بانتظام.',
      keywords: 'حالة التشغيل, معدل التشغيل, الحوادث, التشغيل, الصيانة'
    },
    transparency: {
      title: 'الشفافية في التشغيل والأمن | زالا تكنولوجيز',
      description:
        'شفافية حول التزامات معدل التشغيل واتفاقيات مستوى الخدمة، وشهادة ISO 27001، وكيف يُبنى الأمن في كل ما نقدمه.',
      keywords: 'الشفافية, اتفاقية مستوى الخدمة, معدل التشغيل, آيزو 27001, الأمن'
    },
    blog: {
      title: 'مقالات | زالا تكنولوجيز',
      description: 'مقالات في تطوير البرمجيات، والذكاء الاصطناعي، والهندسة السحابية، وتكامل الأنظمة، ورقمنة القطاع العام.',
      keywords: 'مقالات, مدونة, تطوير البرمجيات, ذكاء اصطناعي, هندسة سحابية, التحول الرقمي'
    },
    blogPost: {
      title: 'مقال | زالا تكنولوجيز',
      description: 'مقال من مهندسي زالا تكنولوجيز حول تطوير البرمجيات والهندسة المعمارية والتحول الرقمي.',
      keywords: 'مقال, تطوير البرمجيات, هندسة معمارية, ذكاء اصطناعي'
    },
    privacy: {
      title: 'سياسة الخصوصية | زالا تكنولوجيز',
      description: 'كيف تعالج زالا تكنولوجيز البيانات الشخصية، وما هي حقوقك، وكيف يمكنك استخدامها.',
      keywords: 'الخصوصية, سياسة الخصوصية, اللائحة العامة لحماية البيانات, البيانات الشخصية'
    },
    terms: {
      title: 'شروط الاستخدام | زالا تكنولوجيز',
      description:
        'الشروط والأحكام التي تحكم استخدامك لموقع زالا تكنولوجيز وخدماتها، بما في ذلك حقوق الملكية الفكرية وحدود المسؤولية.',
      keywords: 'الشروط, شروط الاستخدام, الأحكام, الاتفاقية'
    },
    cookies: {
      title: 'ملفات تعريف الارتباط | زالا تكنولوجيز',
      description: 'ملفات تعريف الارتباط التي يستخدمها الموقع، والغرض منها، وكيف يمكنك التحكم بها.',
      keywords: 'ملفات تعريف الارتباط, التتبع, الموافقة, الخصوصية'
    },
    notFound: {
      title: 'الصفحة غير موجودة | زالا تكنولوجيز',
      description: 'لم نتمكن من العثور على الصفحة المطلوبة. عد إلى الصفحة الرئيسية أو تواصل معنا.',
      keywords: 'الصفحة غير موجودة, 404'
    }
  }
};

/** Falls back to Norwegian, the site's default language, for unknown input. */
export const getPageSEO = (pageId: PageId, language: Language): SEOContent => {
  const byLanguage = seoContent[language] ?? seoContent.no;
  return byLanguage[pageId] ?? seoContent.no[pageId] ?? seoContent.no.home;
};

export const getAllPageIds = (): PageId[] => {
  return Object.keys(seoContent.no) as PageId[];
};

export type { Language, PageId, SEOContent };
