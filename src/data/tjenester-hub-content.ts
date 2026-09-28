/**
 * /tjenester hub body copy — shared by the React page and the static prerender.
 *
 * Inline links use markdown: [label](/path) or [label](https://…).
 */

export const TJENESTER_HUB_LEAD =
  "Innbyggeren sender. Saksbehandleren åpner saken. Loggen er der. Vedtaket er et menneske.";

export interface HubDefinitionItem {
  question: string;
  answer: string;
}

export interface HubSection {
  heading: string;
  paragraphs?: string[];
  definitionList?: HubDefinitionItem[];
}

export const TJENESTER_HUB_SECTIONS: HubSection[] = [
  {
    heading: "Haugen er ikke mottak",
    paragraphs: [
      "Dokumentsenteret åpner innboksen. Ti e-poster. Tre vedlegg som heter «søknad.pdf». Noen spør: hva gjelder dette?",
      "E-post er ikke mottak. Haugen er ikke saken.",
      "SvarInn, eDialog og skjemaet i portalen skal lande på saken. Med metadata. Hva det gjelder. Hvem som sendte. Når. Da slutter dokumentsenteret å gjette.",
      "SvarUt er når svaret går ut. Det er ikke døra inn.",
      "Innbyggeren sender inn. Saksbehandleren har kontroll og revisjonslogg. Saken ligger i fagsystemet og i Noark.",
    ],
  },
  {
    heading: "Portaler som er i drift",
    paragraphs: [
      "Tre portaler. De er levert. De kan spre til neste kommune.",
      "[Bevillingsportal](/produkter/bevillingsportal). Søknad om skjenke- og salgsbevilling. Høringene går parallelt. Søkeren ser ærlig status. Noark fra start. Portalen fatter ikke vedtaket.",
      "[Tilskuddsportal](/produkter/tilskuddsportal). Søkeren blir ferdig. Saksbehandleren får et komplett grunnlag. Kø, ikke innboks. Portalen fatter ikke vedtaket.",
      "[Redusert foreldrebetaling](/produkter/redusert-foreldrebetaling). Henter oppgjør inn i saken når det finnes. Unntaket står. Varig nedgang er en vurdering. Xala kjører ikke SFO-portalen.",
      "Digilist er i drift på [digilist.no](https://digilist.no). Booking av lokaler. En annen jobb enn sak og vedtak.",
    ],
  },
  {
    heading: "Nordre Follo",
    paragraphs: [
      "Hen står ikke i døra med perm. Hen sender tilskuddssøknaden hjemmefra. På bevillingen går høringene mens hen venter. Statusen er ærlig. Ingen «vi sjekker og ringer tilbake».",
      "Saksbehandleren åpner én sak. Ikke tre e-poster. Køen viser hva som venter. Loggen viser hvem som så hva.",
      "Nordre Follo kommune har tilskuddsportal og bevillingsportal. Det er leveransen vi kan stå inne for. Ikke flere kommuner. Ikke et kronerbeløp.",
      "Les [casen](/caser/nordre-follo-tilskuddsportal-bevillingsportal). Flere oppdrag ligger under [kundecaser](/caser).",
    ],
  },
  {
    heading: "Integrasjoner vi faktisk kobler",
    paragraphs: [
      "Saken kan kobles til ID-porten, Maskinporten, Altinn, Folkeregisteret og Noark 5.",
      "Det er de fem. Ikke en lang liste over alt som finnes.",
      "Kommunen eier saken. Xala eier ikke Altinn. Vi har bidratt der.",
      "Digdir har prinsipper for hvordan det offentlige skal bygge digitale tjenester. To av dem er særlig viktige for saksbehandlingssystemer: [prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) (del og gjenbruk data) og [prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) (del og gjenbruk løsninger). Vi følger dem. Automatisering, brukeropplevelse, universell utforming, Digdirs veiledere, NSM sine grunnprinsipper og EUs direktiv om cybersikkerhet er standarder vi bygger inn fra start. Les mer på [/transparens](/transparens).",
    ],
  },
  {
    heading: "Når KI er med i saksbehandlingen",
    paragraphs: [
      "KI kan skrive et utkast. Den fatter ikke vedtaket. Data blir i fagsystemet.",
      "Hvis kunstig intelligens er med i løsningen, skal dere kunne svare på tre ting:",
    ],
    definitionList: [
      { question: "Ble KI brukt her?", answer: "Ja eller nei." },
      {
        question: "Hvordan?",
        answer:
          "Klassifisering, oppsummering, søk, oversettelse, generering av utkast. Eksempel: «KI foreslår kategori. Saksbehandleren bestemmer.»",
      },
      {
        question: "Hvilke logger ligger i saken?",
        answer: "Hvem spurte. Hva KI svarte. Hva saksbehandleren valgte. Det er ikke valgfritt å logge.",
      },
    ],
  },
  {
    heading: "Vanlige spørsmål",
    definitionList: [
      {
        question: "Hva er et saksbehandlingssystem?",
        answer:
          "Fagsystemet inneholder faglogikken for det vedtaket handler om — skjenkelovens krav, tilskuddets vilkår, opptaksreglene for barnehagen. Saksbehandlingssystemet er flyten rundt vedtaket: hvem som så hva, når hen gjorde det, hva som ligger i historikken. Ofte er de to delene i samme løsning.",
      },
      {
        question: "Er e-post det samme som mottak?",
        answer:
          "Nei. E-post er en haug. Mottak er strukturert. SvarInn og eDialog er innkommende meldinger med metadata. SvarUt er når svaret går ut fra kommunen til innbyggeren.",
      },
      {
        question: "Hvilke portaler har Xala i drift?",
        answer:
          "Tre portaler: [Bevillingsportal](/produkter/bevillingsportal) (søknad om skjenke- og salgsbevilling), [Tilskuddsportal](/produkter/tilskuddsportal) (tilskuddssøknad til kommune), og [Redusert foreldrebetaling](/produkter/redusert-foreldrebetaling) (søknad om moderasjon). Digilist er også i drift, men det er et bestillingssystem, ikke en saksbehandlingsløsning.",
      },
      {
        question: "Hva har dere levert i Nordre Follo?",
        answer:
          "Nordre Follo kommune har tilskuddsportal og bevillingsportal i drift. Innbyggeren søker hjemmefra. Saksbehandleren åpner én sak med alt inne. Køen viser hva som venter. Les mer om leveransen i [casen](/caser/nordre-follo-tilskuddsportal-bevillingsportal).",
      },
      {
        question: "Hvilke integrasjoner bygger dere?",
        answer:
          "Vi kobler til ID-porten, Maskinporten, Altinn, Folkeregisteret og Noark 5. Det er de fem. Vi eier ikke Altinn, men vi har bidratt der. Vi følger Digdirs [prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) (del og gjenbruk data) og [prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) (del og gjenbruk løsninger).",
      },
      {
        question: "Hva gjør dere med KI i saksbehandling?",
        answer:
          "KI kan skrive et utkast. Den fatter ikke vedtaket. Data blir i fagsystemet. Dere skal alltid kunne svare på tre ting: Ble KI brukt her? Hvordan? Hvilke logger ligger i saken? Det er ikke valgfritt å logge.",
      },
    ],
  },
];

export const TJENESTER_HUB_CTA = {
  title: "Se det i en sak dere kjenner",
  descriptionBefore: "Book en demo på ",
  contactPath: "/kontakt",
};

export const TJENESTER_HUB_NEXT_STEPS = [
  {
    to: "/slik-vi-jobber",
    titleKey: "servicesPage.next.process.title",
    blurbKey: "servicesPage.next.process.blurb",
    fallbackTitle: "Slik vi jobber",
    fallbackBlurb: "Fem etapper, og hva hver av dem gir dere.",
  },
  {
    to: "/caser",
    titleKey: "servicesPage.next.cases.title",
    blurbKey: "servicesPage.next.cases.blurb",
    fallbackTitle: "Kundecaser",
    fallbackBlurb: "Hva vi har levert til stat, helse og kommune.",
  },
  {
    to: "/teknologi",
    titleKey: "servicesPage.next.tech.title",
    blurbKey: "servicesPage.next.tech.blurb",
    fallbackTitle: "Teknologien vi bygger på",
    fallbackBlurb: "Plattformene løsningene står på, og hvorfor.",
  },
] as const;
