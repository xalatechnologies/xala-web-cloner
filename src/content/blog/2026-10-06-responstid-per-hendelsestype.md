---
slug: responstid-per-hendelsestype
title: "Responstid i driftsavtalen: ulik frist per type hendelse"
seoTitle: "Responstid i driftsavtalen: ulik frist per hendelse"
description: "En god driftsavtale har ulike responstider for sikkerhetshendelser, driftsstans og vanlige henvendelser. Slik avtaler Xala fristene, og hvorfor."
date: 2026-10-06
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/responstid-per-hendelsestype.webp"
coverAlt: "Diagram av et prisme. Én stråle merket henvendelse kommer inn fra venstre og deles i tre: sikkerhetshendelse i oransje, driftsstans og ordinær henvendelse i grått. Overskrift «ULIK HENDELSE, ULIK FRIST»."
keywords:
  - responstid driftsavtale
  - forvaltningsavtale responstid
  - responstid sikkerhetshendelse
faq:
  - question: "Hva er responstid i en driftsavtale?"
    answer: "Responstid er fristen leverandøren har for å reagere på en hendelse. Hos Xala avtales den per type hendelse i forvaltningsavtalen, ikke som én frist for alt."
  - question: "Hvorfor bør responstiden være ulik for ulike hendelser?"
    answer: "Fordi hendelsene haster ulikt. Sikkerhetshendelser, driftsstans og ordinære henvendelser får derfor hver sin frist hos Xala."
  - question: "Hvor mange timer bør responstiden være?"
    answer: "Timene avtales per avtale og oppgis ikke som et fast tall. Hos Xala står fristene i forvaltningsavtalen, ulikt for hver type hendelse."
  - question: "Har Xala en offentlig statusside?"
    answer: "Nei. Oppetid og hendelser rapporteres til kunden gjennom driftsavtalen, ikke som et sanntids dashbord."
  - question: "Må vi ha forvaltningsavtale med Xala?"
    answer: "Nei. De fleste kundene velger det, men Xala kan også overlevere til deres eget utviklingsteam med dokumentasjon og opplæring."
lang: no
draft: false
---

En god driftsavtale gir sikkerhetshendelser, driftsstans og vanlige henvendelser hver sin responstid. Derfor avtaler vi ulike frister per hendelsestype i forvaltningsavtalen. Under forklarer vi to valg vi sier nei til, og hva vi gjør i stedet.

## Én felles responstid er valget vi sier nei til

Det enkleste er å skrive én responstid i avtalen og la den gjelde alt. Én frist er lett å formulere, lett å måle og lett å forklare for dem som skal godkjenne avtalen.

Vi velger det bort. Én frist for alt gjør at hendelser som haster ulikt, blir behandlet likt. Enten får et vanlig spørsmål samme hast som et sikkerhetsvarsel, og teamet bruker kreftene feil. Eller så får et sikkerhetsvarsel samme ro som et spørsmål om en rapport. Det er verre.

I stedet avtaler vi ulike frister for tre typer: sikkerhetshendelser, driftsstans og ordinære henvendelser. Hver type får sin egen frist, og alle tre står i forvaltningsavtalen.

## Sikkerhetshendelser følges opp innen egne frister

Et sikkerhetsvarsel kan ikke vente i samme kø som et spørsmål om et skjermbilde. Derfor følger vi opp sikkerhetsvarsler innen avtalte frister som gjelder denne typen.

Fristen er bare halve jobben. Den andre halvdelen er å ikke vente på at noe skal skje. Hos oss oppdateres avhengigheter løpende, ikke når noe har skjedd. Da blir sikkerhetsfristen noe dere har når det trengs, ikke en grunn til å utsette vedlikeholdet til neste hendelse.

## Driftsstans skal oppdages før brukerne melder den

En responstid for driftsstans begynner når noen vet at systemet står. Er det brukerne som oppdager det først, har fristen i praksis startet for sent.

Målet vårt er at dere skal vite at noe er galt før brukerne melder det. Det gjelder også når feilen ligger hos en tredjepart dere er avhengige av. Et fagsystem henter ofte data fra andre tjenester, og [nedetid hos andre](https://xala.no/tjenester/integrasjoner) er noe avtalen bør ta høyde for.

Derfor hører overvåking og varsling med i forvaltningen. En driftsstans får sin egen frist, og den fristen er bare verdt noe hvis stansen blir sett tidlig.

## Ordinære henvendelser har sin egen frist

De fleste henvendelser er verken sikkerhet eller stans. Det kan være et spørsmål om hvordan noe virker, et ønske om en endring eller en regel som må justeres. Regelverk endres, og systemet må følge med.

Også disse henvendelsene har en avtalt frist. Den er bare ikke den samme som for de to andre typene. Et vanlig spørsmål skal få svar innen det som er avtalt, uten å låne hasten fra en sikkerhetshendelse og uten å skyve den til side.

## Vi har heller ingen offentlig statusside

Det andre valget vi sier nei til, er et offentlig dashbord med oppetid. Det frister fordi det ser åpent ut. Alle kan se grønt eller rødt, når som helst.

Vi har [ingen offentlig statusside](https://xala.no/status). Oppetid og hendelser rapporteres til kunden gjennom driftsavtalen, ikke som et sanntids dashbord. Rapporteringen går til dere som kunde, ikke til en side alle kan åpne.

## Fristene hører hjemme i forvaltningsavtalen

Hos oss avtales responstidene i forvaltningsavtalen. Den dekker oppdateringer og sikkerhetsfikser, overvåking og varsling, videreutvikling og dokumentasjon som holdes ved like. Fristene står sammen med arbeidet de gjelder.

Forvaltningsavtale er likevel ikke påkrevd. De fleste kundene våre velger det, men vi kan også overlevere til deres eget utviklingsteam med dokumentasjon og opplæring. Vi låser ingen inn.

Valget henger sammen med hvordan systemet bygges. Et system som skal driftes i ti år, designes annerledes enn ett som skal demonstreres én gang. Les mer om teknologivalg for et [system som skal leve i ti år](https://xala.no/blogg/teknologivalg-for-fagsystemer-som-skal-vare).

## Tre typer hendelser, tre frister i avtalen

En responstid i driftsavtalen bør skille mellom sikkerhetshendelser, driftsstans og ordinære henvendelser. Hos oss får hver type sin egen frist, avtalt i forvaltningsavtalen. Se [hva en forvaltningsavtale med Xala dekker](https://xala.no/tjenester/forvaltning-og-drift).
