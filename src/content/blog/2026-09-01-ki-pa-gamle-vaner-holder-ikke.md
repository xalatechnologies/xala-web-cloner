---
slug: ki-pa-gamle-vaner-holder-ikke
title: "KI på gamle vaner holder ikke"
seoTitle: "KI på gamle vaner holder ikke"
description: "Kommunen kjøpte KI. Innboksen er den samme. Uka ble ikke lettere. Gevinsten sitter i vanene, ikke i verktøyet. Clare Liguori sa det. Vi bygger saksgangen."
date: 2026-09-01
author: "Ibrahim Rahmani"
role: "IT-leder"
readingMinutes: 5
cover: "/images/blog/ki-pa-gamle-vaner-holder-ikke.webp"
draft: false
lang: no
tag: "IT-leder"
keywords:
  - kunstigintelligens
  - saksbehandling
  - offentlig sektor
  - digitalisering
  - kommunal
cta: /kontakt
---

Kommunen kjøpte KI. Saksbehandleren fikk et felt til.

Innboksen er den samme. Søknaden lander som i går. Uka ble ikke lettere.

Gevinsten sitter ikke i verktøyet. Den sitter i vanene. Spruter dere KI på den gamle løkka, blir dere like trege. Endrer dere løkka, kan farten flytte seg.

Det sa [Clare Liguori](https://www.youtube.com/watch?v=pqlWNihgdjI), senior principal engineer i AWS, på AI Engineer 28. august 2026. Hun snakket om lag inne i Amazon. Ikke om Xala. Tallene er hennes.

## Samme assistent. Ulike vaner.

Amazon Stores kjørte et pilotprogram med femti helt vanlige team. Blandet erfaring. Eksisterende kodebaser. Vanlige backlogger. Ingen håndplukkede stjerner. Ingen spesialbetingelser.

Halvparten av teamene la KI oppå arbeidsmåten de allerede hadde. De fikk litt, eller ingenting.

Den andre halvparten endret hvordan de jobbet. Median gevinst: 4,5 ganger raskere utrulling til produksjon. Noen team passerte 10 ganger. Perfect Order Experience leverer funksjoner på en ettermiddag som tok to uker før. WW Grocery kutter designdokumenter fra fem dager til noen timer.

Et annet eksempel er Bedrock Mantle. Seks ingeniører. 76 dager. Et prosjekt som var estimert til 30 utviklere over 12 til 18 måneder. Commits gikk fra 2 per uke til 40 per utvikler. Det er Amazons tall, målt på commit-hastighet og utrulling. Ikke Xala. Ikke kommunen.

Prime Video-teamet gjorde en ti-dagers sprint i ett rom uten on-call, uten møter, uten kontekstbytte. Der fikk de nesten 6 ganger gjennomstrømning. Liguori er ærlig på forbeholdet: det er ikke hverdagen. On-call, møter og fire parallelle saker er det kommunen kjenner. Poenget er ikke at dere skal kopiere sprinten. Poenget er at verktøyet var det samme. Vanene var ikke.

## Hva de faktisk endret

De beste teamene delte fem vaner. Alle handler om å gi agenten kontekst og ta friksjon ut av løkka — ikke om å jobbe overtid.

**Invester i kontekst.** Prosjektet skal være lesbart for modellen. Steeringsfiler, konvensjoner, tester, kommentarer som blir værende. Hopper dere over dette, gjør agenten de samme feilene igjen.

**Sakte ned for å komme raskere.** De første ukene føltes tregere. Teamene kodet om repo, skrev spesifikasjoner, la til tester. De som ga opp i uke to så aldri den sammensatte effekten. De som holdt ut, fikk fart.

**Mat agenten i stedet for å passe den.** En jevn kø av velavgrensede oppgaver. Flere agenter parallelt. Gjennomgang asynkront. Arbeidet flytter seg mens noen er i møte eller på telefon. Kveldsjakten på den perfekte prompten er friksjon, ikke en overtidsløfte.

**Gjør intensjonen eksplisitt før kode.** Hva betyr «ferdig»? Noen team rapporterer at de skriver 1 til 2 prosent av koden for hånd, men pusher langt flere commits. Forskjellen er at agenten vet hva den skal levere.

**Flytt testing til venstre.** Integrasjonstester lokalt. Selvkorrigering før pipeline. Kodegjennomgang handler om grensesnitt og arkitektur, ikke navngivning.

Det er vaner. Ikke et nytt verktøy i et gammelt felt.

## Det kommunen kjenner igjen

Saksbehandleren kopierer fortsatt søknadstekst inn i en chatbot. Svaret limes inn i et vedtaksutkast. Ingen logg i saken. Ingen kobling til fagsystemet. Ingen spor over hva modellen så.

Innboksen er fortsatt mottak. Søknaden videresendes som e-post. «Mangler logg i saken» er en påminnelse om at verktøyet ikke endret løkka.

KI-feltet i saksbehandlingssystemet er nytt. Arbeidsflyten er den samme: mottak, manuell videresending, lim inn, lagre, håp. Det er KI på gamle vaner. Verktøyet var det samme i betydningen at løkka ikke flyttet seg.

Kommunen trenger ikke en sjette chatbot. Den trenger at søknaden lander i saken, at vedlegg valideres mot krav, at status er synlig, og at loggen holder.

## Det Xala faktisk bygger

Xala selger ikke et KI-produkt som erstatter saksbehandleren. Vi bygger saksgangen: portaler og [tjenester](/tjenester) som gjør løkka tydelig. [Priser](/priser) ligger åpent.

I Nordre Follo har vi levert [Bevillingsportal](/produkter/bevillingsportal), [Tilskuddsportal](/produkter/tilskuddsportal) og arbeid med [Redusert foreldrebetaling](/produkter/redusert-foreldrebetaling). Søkeren fyller ut i en flate folk forstår. Saksbehandleren får en flyt med kontroll og logg. Portalene kan kobles til kommunens systemer via API. Det er én kommune i caset. Ikke flere.

Tre spørsmål vi stiller før vi legger KI inn i en slik flyt:

1. Hva skal modellen se — og hva skal den aldri se?
2. Hvor stopper autonomien før et menneske tar stilling?
3. Hva logges, slik at saken kan etterprøves?

[Prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) handler om å dele og gjenbruke data. Det holder ikke som et avsnitt i en arkitekturbeskrivelse når en agent henter dem på maskinfart. [Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) handler om å gjenbruke løsningene dere har — ikke å reise en ny KI-stabel ved siden av fagsystemet.

Rammen rundt agenten er skrevet i [Når KI skriver fortere enn skjønnet](/blogg/sele-rundt-ki-i-saksbehandling). Hvor agenten hører hjemme i saken, er skrevet i [Agentiske arbeidsflyter i saksbehandling](/blogg/agentiske-arbeidsflyter-i-saksbehandling). Her er det vanene rundt løkka.

## Vanlige spørsmål

**Hvorfor blir ikke uka lettere når vi har kjøpt KI?**
Fordi KI uten nye vaner er bare et nytt verktøy. Gevinsten sitter i vanene, ikke i lisensen.

**Må vi bytte KI-verktøy for å få effekt?**
Nei. I Amazon Stores brukte ni av ti lag samme assistent. Forskjellen var hvordan de jobbet.

**Hva må vi endre før KI hjelper saksbehandleren?**
Skriv konteksten. Si hensikten. Gi jobben, ikke sitt og pass. Test tidlig. Og tål at det går sakte først.

**Fatter KI vedtaket i kommunen?**
Nei. KI kan skrive et utkast. Skjønnet og vedtaket ligger hos saksbehandleren. Loggen skal vise hva som ble brukt.

**Hva har Xala levert, hvis dette ikke er et Amazon-løfte?**
Tilskuddsportal og bevillingsportal i Nordre Follo. [Les casen](/caser/nordre-follo-tilskuddsportal-bevillingsportal). Tallene i Clare Liguoris foredrag er Amazons, ikke våre.

**Hvor blir saksdata av når KI er med?**
I fagsystemet. De limes ikke inn i en offentlig chatbot. Tre spørsmål i saken: ble KI brukt, hvordan, og hvilke logger ligger der.

## Endre løkka. Ikke feltet.

Verktøyet var det samme hos Amazon. Forskjellen var vanene. Kommunen som kjøper KI uten å endre mottak, logg og kobling til fagsystemet, kjøper et nytt felt — ikke en ny uke.

Trenger dere å se hvordan saksgangen kan se ut i praksis, [book en demo](/book-demo) eller start på [kontakt](/kontakt).

## Relaterte artikler

- [Tjenester](/tjenester)
- [Nordre Follo: tilskudds- og bevillingsportal](/caser/nordre-follo-tilskuddsportal-bevillingsportal)
