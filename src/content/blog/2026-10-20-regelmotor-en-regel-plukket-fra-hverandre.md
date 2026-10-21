---
slug: regelmotor-en-regel-plukket-fra-hverandre
title: "Regelmotor: én regel plukket fra hverandre"
seoTitle: "Regelmotor: én regel plukket fra hverandre"
description: "En regelmotor er verdt noe først når hver regel kan si hvorfor. Her er én regel delt opp: grunnlag, betingelse, utfall, forklaring og test."
date: 2026-10-20
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/regelmotor-en-regel-plukket-fra-hverandre.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: et gammeldags stempel tegnet i fem deler side om side, merket grunnlag, betingelse, utfall, forklaring og test. Avtrykket med teksten «fordi …» er oransje. Overskrift «ÉN REGEL, FEM DELER»."
keywords:
  - regelmotor
  - regelmotor fagsystem
  - forklarbarhet
  - regeltester
  - regelverk som kode
hashtags:
  - regelmotor
  - forklarbarhet
  - regeltester
lang: no
draft: false
faq:
  - question: "Hva er en regelmotor?"
    answer: "Det er den delen av systemet som avgjør et utfall ut fra opplysninger og skrevne regler, uten skjønn."
  - question: "Kan en regelmotor avgjøre en sak alene?"
    answer: "Bare der utfallet følger av regelverket alene og hjemmelen er på plass. Skjønn skal ligge hos et menneske."
  - question: "Hvorfor må regelen kunne forklare utfallet?"
    answer: "Fordi enkeltvedtak skal grunngis etter forvaltningsloven, og fordi noen kommer til å klage."
  - question: "Hvordan testes regler?"
    answer: "Som rene funksjoner, med kjente opplysninger inn og et forventet utfall ut."
  - question: "Hva skjer når regelverket endres?"
    answer: "Reglene endres og versjoneres, men systemet rundt står som før."
---

En regelmotor er den delen av fagsystemet som tar opplysninger inn og gir et utfall ut, uten at noen trykker på en knapp i mellom.

Det høres enkelt ut, og det er det også, helt til noen spør hvorfor utfallet ble som det ble. Da viser det seg om regelen var bygget eller bare skrevet. For å se forskjellen tar vi én tenkt regel og plukker den fra hverandre: «søkeren må bo i kommunen». Den har ingen kunde og ingen ordning med navn. Den har fem deler, og hver av dem kan gå galt på sin måte.

## Grunnlaget: hvilke opplysninger regelen får lov til å lese

Før regelen kan si noe om bosted, må den ha en opplysning om bosted. Grunnlaget er listen over hva regelen får lese, og hvor hver opplysning kommer fra.

Når grunnlaget er uklart, begynner regelen å lese det som tilfeldigvis ligger i saken. Et felt søkeren fylte ut, en adresse fra en gammel sak, en verdi noen la inn for hånd. Utfallet kan bli riktig, men ingen kan si hvorfor det ble riktig.

Arkitekten bør kreve at hver opplysning regelen bruker, er sporbar til kilden sin og til tidspunktet den ble hentet. Regelen leser bare det som står på listen.

## Betingelsen: regelverket skrevet slik at det kan kjøres

Betingelsen er selve regelen: bor søkeren i kommunen, ja eller nei. Her skal regelverket stå slik at maskinen kan kjøre det og et menneske kan lese det.

Det som går galt, er at skjønn sniker seg inn. «Bor i kommunen» blir til «har tilknytning til kommunen», og plutselig skal regelen vurdere noe den ikke kan vurdere. På tjenestesiden vår sier vi det slik: «Skillet går ikke ved hvor komplisert oppgaven er, men ved om utfallet kan utledes av regelverket alene.»

Arkitekten bør kreve at betingelsen bare inneholder det som kan utledes av regelverket alene. Resten sendes videre. Reglene må også kunne gjengis i klartekst, ikke bare kjøres.

## Utfallet: ja, nei eller send til et menneske

De fleste tenker på utfallet som to muligheter. Søkeren oppfyller kravet, eller ikke. Men en god regel har et tredje utfall: til vurdering.

Uten det tredje utfallet må regelen tvinge uklare saker inn i ja eller nei. Mangler opplysningen om bosted, eller er den motstridende, blir det et nei som egentlig var et «vet ikke».

Til vurdering er et designvalg, ikke en feil. Arkitekten bør kreve at regelen sier fra når den ikke kan avgjøre, og at saken da går til en saksbehandler. Hvor grensen bør gå, har vi skrevet om i [Elektronisk saksbehandling: hva som kan automatiseres](/blogg/automatisering-av-saksbehandling-hva-boer-og-ikke).

## Forklaringen: utfallet må kunne si hvorfor

Et utfall som bare sier «avslag», hjelper ingen. Ikke søkeren, ikke saksbehandleren, og ikke den som skal behandle klagen. Vi sier det slik på tjenestesiden: «En regelmotor som kan produsere "avslag fordi X" er langt mer verdt enn en som bare produserer "avslag".»

Forklaringen er ikke pynt. Etter forvaltningsloven av 1967 § 24 skal enkeltvedtak grunngis. Hvis regelen ikke kan si hvilken opplysning og hvilken betingelse som ga utfallet, må noen rekonstruere det i etterkant.

Arkitekten bør kreve at hvert utfall kommer med sin egen forklaring: hvilken regel, hvilke opplysninger og hvilken versjon. Mer om krav til forklaring og manuell kontroll står i [Vedtaket skal si hvorfor](/blogg/automatisert-vedtak-forklaring-og-manuell-kontroll).

## Testen: hver regel er en ren funksjon

En regel som er bygget slik, er lett å teste. Gitt disse opplysningene blir utfallet dette. Søkeren bor i kommunen, utfallet er ja. Søkeren bor et annet sted, utfallet er nei. Opplysningen mangler, utfallet er til vurdering.

Slike tester «er billige å skrive» og «kjører på millisekunder», som vi skrev i [Testautomatisering for fagsystemer](/blogg/testautomatisering-for-fagsystemer). Det som går galt uten dem, er at en endring et annet sted flytter utfallet uten at noen merker det.

Arkitekten bør kreve at hver regel har tester for alle tre utfall, og at testene kjører hver gang noe endres.

## Når regelverket endres

Regelverk står ikke stille. Kravet om bosted kan få et unntak, eller en ny betingelse. Da er det fristende å bygge noe nytt.

Men hvis regelen er bygget som beskrevet over, er endringen liten. På tjenestesiden for saksbehandlingsplattformen sier vi det slik: «Nytt regelverk gir nytt skjema og nye regler, ikke et nytt system.»

Det som må være på plass, er versjonering. Den gamle regelen beholdes, den nye får en ny versjon, og hvert utfall viser hvilken versjon som ga det. Da kan en klage på en eldre sak behandles mot regelen som gjaldt den gangen.

[Se hvordan vi bygger regler som kan forklare utfallet sitt.](/tjenester/automatisering-og-ai)
