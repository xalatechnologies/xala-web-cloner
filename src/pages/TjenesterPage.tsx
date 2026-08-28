import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import FAQSection from '../components/faq/FAQSection';
import { FAQ_TOPICS } from '../components/faq/faqs';
import Footer from '../components/Footer';
import { PageHeader } from '../components/layouts/PageFrame';
import { generateServicesSchema } from '@/components/seo/sectionSchemas';
import { ORGANIZATION, ORG_ID, SITE_ORIGIN } from '@/lib/blog/seo';
import { SERVICES_PAGE_HEADING } from '@/lib/staticRouteHeading';
import servicesData from '@/data/services.json';

type Language = 'no' | 'en' | 'ar';

/** Where a reader goes after deciding a service is relevant. */
const NEXT_STEPS = [
  {
    to: '/slik-vi-jobber',
    key: 'servicesPage.next.process',
    fallbackTitle: 'Slik vi jobber',
    fallbackBlurb: 'Fem etapper, og hva hver av dem gir dere.',
  },
  {
    to: '/caser',
    key: 'servicesPage.next.cases',
    fallbackTitle: 'Kundecaser',
    fallbackBlurb: 'Hva vi har levert til stat, helse og kommune.',
  },
  {
    to: '/teknologi',
    key: 'servicesPage.next.tech',
    fallbackTitle: 'Teknologien vi bygger på',
    fallbackBlurb: 'Plattformene løsningene står på, og hvorfor.',
  },
] as const;

export default function TjenesterPage() {
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  // Derived from the catalogue the page renders, so the markup cannot describe
  // a service the page does not show.
  const schema = useMemo(
    () =>
      generateServicesSchema(servicesData[language] ?? servicesData.no, {
        url: `${SITE_ORIGIN}/tjenester`,
        organizationId: ORG_ID,
        name: t('services.title', 'Våre tjenester'),
      }),
    [language, t]
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Only structured data here — the route's title, description and
          canonical come from RouteSEO, which owns this path. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('servicesPage.eyebrow', 'Tjenester')}
          title={t('servicesPage.title', SERVICES_PAGE_HEADING)}
          description={t(
            'servicesPage.description',
            'Vi bygger saksbehandlingssystem og fagsystem, pluss integrasjon og modernisering, for offentlig sektor.'
          )}
        />

        <section className="container mx-auto px-4 py-14 md:py-20">
          <div className="prose prose-neutral mx-auto max-w-4xl dark:prose-invert">
            <p className="lead">
              Innbyggeren sender. Saksbehandleren åpner saken. Loggen er der. Vedtaket er et menneske.
            </p>

            <h2>Haugen er ikke mottak</h2>
            <p>
              Dokumentsenteret åpner innboksen. Ti e-poster. Tre vedlegg som heter «søknad.pdf». Noen spør: hva gjelder dette?
            </p>
            <p>
              E-post er ikke mottak. Haugen er ikke saken.
            </p>
            <p>
              SvarInn, eDialog og skjemaet i portalen skal lande på saken. Med metadata. Hva det gjelder. Hvem som sendte. Når. Da slutter dokumentsenteret å gjette.
            </p>
            <p>
              SvarUt er når svaret går ut. Det er ikke døra inn.
            </p>
            <p>
              Innbyggeren sender inn. Saksbehandleren har kontroll og revisjonslogg. Saken ligger i fagsystemet og i Noark.
            </p>

            <h2>Portaler som er i drift</h2>
            <p>
              Tre portaler. De er levert. De kan spre til neste kommune.
            </p>
            <p>
              <strong>Bevillingsportal</strong> (<Link to="/produkter/bevillingsportal">/produkter/bevillingsportal</Link>). Søknad om skjenke- og salgsbevilling. Høringene går parallelt. Søkeren ser ærlig status. Noark fra start. Portalen fatter ikke vedtaket.
            </p>
            <p>
              <strong>Tilskuddsportal</strong> (<Link to="/produkter/tilskuddsportal">/produkter/tilskuddsportal</Link>). Søkeren blir ferdig. Saksbehandleren får et komplett grunnlag. Kø, ikke innboks. Portalen fatter ikke vedtaket.
            </p>
            <p>
              <strong>Redusert foreldrebetaling</strong> (<Link to="/produkter/redusert-foreldrebetaling">/produkter/redusert-foreldrebetaling</Link>). Henter oppgjør inn i saken når det finnes. Unntaket står. Varig nedgang er en vurdering. Xala kjører ikke SFO-portalen.
            </p>
            <p>
              <strong>Digilist</strong> is in drift on digilist.no. Booking av lokaler. En annen jobb enn sak og vedtak.
            </p>

            <h2>Nordre Follo</h2>
            <p>
              Hen står ikke i døra med perm. Hen sender tilskuddssøknaden hjemmefra. På bevillingen går høringene mens hen venter. Statusen er ærlig. Ingen «vi sjekker og ringer tilbake».
            </p>
            <p>
              Saksbehandleren åpner én sak. Ikke tre e-poster. Køen viser hva som venter. Loggen viser hvem som så hva.
            </p>
            <p>
              Nordre Follo kommune har tilskuddsportal og bevillingsportal. Det er leveransen vi kan stå inne for. Ikke flere kommuner. Ikke et kronerbeløp.
            </p>
            <p>
              Link to <Link to="/caser/nordre-follo-tilskuddsportal-bevillingsportal">/caser/nordre-follo-tilskuddsportal-bevillingsportal</Link> and <Link to="/caser">/caser</Link>.
            </p>

            <h2>Integrasjoner vi faktisk kobler</h2>
            <p>
              Saken kan kobles til ID-porten, Maskinporten, Altinn, Folkeregisteret og Noark 5.
            </p>
            <p>
              Det er de fem. Ikke en lang liste over alt som finnes.
            </p>
            <p>
              Kommunen eier saken. Xala eier ikke Altinn. Vi har bidratt der.
            </p>
            <p>
              Digdir har prinsipper for hvordan det offentlige skal bygge digitale tjenester. To av dem er særlig viktige for saksbehandlingssystemer: <a href="https://www.digdir.no/digitale-felleslosninger/prinsipp-4-bruk-felleslosninger/2088" target="_blank" rel="noopener noreferrer">prinsipp 4 (bruk fellesløsninger)</a> og <a href="https://www.digdir.no/digitale-felleslosninger/prinsipp-5-del-og-gjenbruk-data/2089" target="_blank" rel="noopener noreferrer">prinsipp 5 (del og gjenbruk data)</a>. Vi følger dem.
            </p>
            <p>
              Universell utforming (UU), Digdirs krav, NSM sine grunnprinsipper for IKT-sikkerhet og EUs direktiv om cybersikkerhet er standarder vi bygger inn fra start. Les mer på <Link to="/transparens">/transparens</Link>.
            </p>

            <h2>Tre spørsmål når KI er med</h2>
            <p>
              Hvis kunstig intelligens er med i løsningen, skal dere kunne svare på tre ting:
            </p>
            <ol>
              <li><strong>Ble KI brukt her?</strong> Ja eller nei.</li>
              <li><strong>Hvordan?</strong> Klassifisering, oppsummering, søk, oversettelse, generering av utkast. Eksempel: «KI foreslår kategori. Saksbehandleren bestemmer.»</li>
              <li><strong>Hvilke logger finnes?</strong> Hvem spurte. Hva KI svarte. Hva saksbehandleren valgte. Det er ikke valgfritt å logge.</li>
            </ol>

            <h2>Vanlige spørsmål</h2>
            <dl>
              <dt><strong>Er e-post det samme som mottak?</strong></dt>
              <dd>
                Nei. E-post er en haug. Mottak er strukturert. SvarInn og eDialog er innkommende meldinger med metadata. SvarUt er når svaret går ut fra kommunen til innbyggeren.
              </dd>

              <dt><strong>Hva er forskjellen på saksbehandlingssystem og fagsystem?</strong></dt>
              <dd>
                Fagsystemet inneholder faglogikken for det vedtaket handler om — skjenkelovens krav, tilskuddets vilkår, opptaksreglene for barnehagen. Saksbehandlingssystemet er flyten rundt vedtaket: hvem som så hva, når hen gjorde det, hva som ligger i historikken. Ofte er de to delene i samme løsning.
              </dd>

              <dt><strong>Hvor lang tid tar det å bygge en tilskuddsportal?</strong></dt>
              <dd>
                Første leveranse: 4–7 måneder fra signering til portalen er i drift. Det dekker kartlegging, design, utvikling, testing, integrasjon med Noark og ID-porten, og opplæring av saksbehandlerne. Tid avhenger av antall skjemaer, hvor mange sakstyper, og om det finnes integrasjoner utover de fem vi alltid kobler.
              </dd>

              <dt><strong>Hva koster det?</strong></dt>
              <dd>
                Det står ikke her. Les <Link to="/priser">/priser</Link> for hva som driver kostnaden, hva som inngår, og hvordan vi estimerer etter kartlegging.
              </dd>

              <dt><strong>Hvem drifter løsningen etterpå?</strong></dt>
              <dd>
                Xala. Det er ikke en valgfri tjeneste. Hver løsning vi leverer har drifts- og forvaltningsavtale fra dag én.
              </dd>

              <dt><strong>Kan vi se det i en sak vi kjenner?</strong></dt>
              <dd>
                Ja. Book en demo på <Link to="/kontakt">/kontakt</Link>. Vi setter opp en case dere kjenner igjen, og dere ser flyten fra innbyggeren sender til saksbehandleren lukker saken.
              </dd>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="tjenester-neste"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <h2
              id="tjenester-neste"
              className="subsection-heading"
            >
              Se det i en sak dere kjenner
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Book en demo på <Link to="/kontakt" className="text-primary underline-offset-4 hover:underline">/kontakt</Link>.
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {NEXT_STEPS.map((step) => (
                <li key={step.to}>
                  <Link
                    to={step.to}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="flex items-center gap-2 card-heading">
                      {t(`${step.key}.title`, step.fallbackTitle)}
                      <ArrowRight
                        className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-3 card-body">
                      {t(`${step.key}.blurb`, step.fallbackBlurb)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FAQSection only={FAQ_TOPICS.services} includeSchema={false} />
      </main>

      <Footer />
    </div>
  );
}
