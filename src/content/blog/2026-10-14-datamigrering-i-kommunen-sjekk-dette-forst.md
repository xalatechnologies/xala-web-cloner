---
slug: datamigrering-i-kommunen-sjekk-dette-forst
title: "Datamigrering i kommunen: sjekk dette først"
description: "Skal kommunen flytte data fra et gammelt fagsystem? Sjekk dette først: hvilke data, hvem eier dem, hva som skal arkiveres og hvordan dere avstemmer."
date: 2026-10-14
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Kommune"
cover: "/images/blog/datamigrering-i-kommunen-sjekk-dette-forst.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: et transportbånd med flyttekasser merket saker, vedlegg, arkiv og personer, fra hyllen gammelt mot en oransje tellemaskin merket avstemt. Én kasse ligger under en lupe merket stikkprøve. Overskrift «FØR DERE FLYTTER: TELL KASSENE»."
keywords:
  - datamigrering
  - migrering
  - fagsystem
  - avstemming
  - arkiv
hashtags:
  - datamigrering
  - fagsystem
  - avstemming
  - arkiv
lang: no
draft: false
faq:
  - question: "Må vi flytte alle gamle data?"
    answer: "Nei. Flytt det som trengs for løpende saker, og avklar hva som skal til arkiv i stedet."
  - question: "Hvem skal godkjenne at migreringen er riktig?"
    answer: "Den som eier fagområdet, ikke bare den som kjører migreringsjobben."
  - question: "Kan vi teste migreringen med ekte personopplysninger?"
    answer: "Bare i et miljø med samme tilgangsstyring som produksjonsmiljøet."
  - question: "Hva betyr avstemming?"
    answer: "Å sjekke at antall, summer og utvalgte saker er like i det gamle og det nye systemet."
  - question: "Hvorfor prises migrering for seg?"
    answer: "Fordi den har egne forutsetninger og egen risiko, som Xala også skriver på sin FAQ."
---

«Kartleggingen er ofte den mest verdifulle leveransen i seg selv.» Den setningen står på Xalas side om modernisering, og den gjelder enda mer når det er dataene, ikke koden, som skal flyttes.

Et nytt fagsystem kan bygges ferdig og testes grundig, men det er dataene fra det gamle systemet som avgjør om saksbehandlerne kan jobbe dagen etter. Derfor lønner det seg å stille noen spørsmål før en eneste rad flyttes. Listen under er i den rekkefølgen vi mener de bør sjekkes. For hvert punkt står det hva dere sjekker, hvordan dere ser at svaret er godt nok, og hva det betyr hvis svaret mangler.

## Først: hvilke data finnes, og hvilke skal faktisk flyttes

Sjekk hva det gamle systemet faktisk inneholder: saker, vedlegg, personregistre, kodeverk, logger og felt som brukes til noe annet enn navnet tilsier. Mange systemer har levd lenge nok til at ingen har full oversikt.

Svaret er godt nok når dere har en liste over datatyper, hvor de ligger, og en beslutning for hver: flyttes, arkiveres eller slettes. Følg dataene. Hvor kommer de inn, hvor går de ut, og hvem oppdager det hvis de stopper?

Mangler listen, flytter dere enten for mye eller for lite. Begge deler oppdages som regel først når en saksbehandler leter etter noe som ikke er der.

## Så: hvem eier dataene, og hvem kan si at de er riktige

Sjekk hvem som eier hvert fagområde i dataene. Det er sjelden IT. Det er den som er ansvarlig for tjenesten, og som kjenner igjen en riktig sak når de ser den.

Svaret er godt nok når hver datatype har en navngitt fagansvarlig som skal godkjenne avstemmingen. IT kan kjøre jobben, men det er fagansvarlig som kan si at resultatet stemmer.

Mangler eieren, blir migreringen godkjent av den som har minst grunnlag for å vurdere innholdet. Feil som bare en fagperson ville sett, slipper da gjennom.

## Hva som må arkiveres før det gamle systemet slås av

Sjekk hvilke saker som er avsluttet, og som etter arkivplikten skal til arkiv i stedet for inn i det nye systemet. Det gamle systemet kan ikke slås av før dette er avklart med arkivtjenesten.

Svaret er godt nok når arkivtjenesten har godkjent hva som avleveres, i hvilket format, og hvem som gjør det. Hvordan arkivering kan følge saksgangen i et moderne system, har vi skrevet om i [Noark 5 i moderne fagsystemer](https://xala.no/blogg/noark-5-arkivering-i-moderne-fagsystemer).

Mangler avklaringen, risikerer dere å slå av et system som fortsatt er den eneste kilden til avsluttede saker.

## Personopplysninger og tilgang i testmiljøet

Sjekk hvor prøvemigreringene skal kjøres, og hvem som har tilgang dit. En migrering må testes med data som ligner de ekte, og ofte er det de ekte dataene som brukes.

Svaret er godt nok når testmiljøet har samme tilgangsstyring som produksjon, og det er skrevet ned hvem som kan se dataene og når kopiene slettes.

Mangler dette, ligger personopplysninger i et miljø med svakere vern enn det de kom fra. Det er en risiko som ikke har noe med det nye systemet å gjøre.

## Hvordan dere avstemmer at alt kom med

Sjekk hvordan dere skal vise at alt kom med. Avstemming betyr å sammenligne det gamle og det nye systemet: antall saker, summer der det finnes beløp, og stikkprøver der fagansvarlig åpner utvalgte saker i begge systemene.

Svaret er godt nok når metoden er bestemt før migreringen starter, og når avvik får en eier. Kjører dere systemene parallelt en periode, kan dere også sammenligne resultatene de gir for de samme sakene.

Mangler en avstemmingsmetode, er det ingen som kan si at migreringen er ferdig. Dere vet bare at jobben har kjørt.

## Hvorfor migrering bør ligge som egen post i anskaffelsen

Sjekk om datamigreringen er beskrevet som en egen leveranse i anskaffelsen, eller om den er antatt å følge med. Migrering har egne forutsetninger og egen risiko, og den avhenger av hvordan det gamle systemet ser ut innvendig.

Svaret er godt nok når migreringen har egen beskrivelse, egne akseptkriterier og en avstemming som skal godkjennes. Xala skriver det samme på sin FAQ: datamigrering fra et eksisterende system prises som egen post, fordi den har egne forutsetninger og egen risiko.

Mangler den egne posten, blir migreringen fort det som skvises når tiden blir knapp, selv om det er den delen brukerne merker først.

[Se hvordan Xala kartlegger dataflyten og migrerer med avstemming](https://xala.no/tjenester/modernisering-av-fagsystemer)
