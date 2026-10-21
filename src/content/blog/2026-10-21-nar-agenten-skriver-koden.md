---
slug: nar-agenten-skriver-koden
title: "Når agenten skriver koden, må hvert steg kunne leses"
seoTitle: "Systemutvikling med KI-agenter: hvert steg leses"
description: "Når agenter skriver koden, flytter menneskets jobb fra å skrive til å lese. Derfor må hvert steg i utviklingsløpet etterlate noe en person kan gå gjennom."
date: 2026-10-21
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/nar-agenten-skriver-koden.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: en kanal med seks sluser merket idé, spesifikasjon, plan, diff, godkjent og i drift. En båt formet som en kodeblokk ligger ved diff-slusen bak en oransje port. Slusene for godkjent og i drift har hake. Overskrift «HVERT STEG KAN LESES»."
keywords:
  - systemutvikling med KI-agenter
  - KI-agenter
  - utviklingsløp
  - sporbarhet
  - kodegjennomgang
hashtags:
  - utviklingsløp
  - sporbarhet
  - kodegjennomgang
lang: no
draft: false
faq:
  - question: "Hva endrer seg i systemutvikling når KI-agenter skriver koden?"
    answer: "Arbeidet flytter seg fra å skrive til å lese og vurdere, så hvert steg må etterlate noe en person kan gå gjennom."
  - question: "Hva er et artefakt i utviklingsløpet?"
    answer: "Noe et steg etterlater som kan leses i ettertid, for eksempel en spesifikasjon, en plan, en diff eller en godkjenning."
  - question: "Er det trygt å la en KI-agent skrive kode til et offentlig system?"
    answer: "Det avhenger av kontrollen rundt, og et menneske bør godkjenne endringen før den går i produksjon."
  - question: "Må vi som kunde lese alt KI-agenten lager?"
    answer: "Nei, men dere bør kunne, og leverandøren bør kunne vise hvem som har lest hva."
  - question: "Bruker dere KI-agenter i egne prosjekter?"
    answer: "Ja, i eget arbeid som denne bloggen, med et menneske som godkjenner før noe publiseres. Måten vi gjør det på er fortsatt under utvikling."
---

Vi tror at et utviklingsløp der KI-agenter skriver koden, står og faller på én ting: at hvert steg etterlater noe et menneske kan lese. Det er en overbevisning vi jobber etter, ikke et ferdig system vi selger.

Selve løpet er ikke nytt. Idé, spesifikasjon, plan, kode, gjennomgang og drift har vært stegene i systemutvikling lenge. Det som er nytt, er hvor arbeidet skjer. Når en utvikler skrev alt selv, kunne mye av begrunnelsen leve i hodet til den som skrev. Når en KI-agent skriver koden, finnes det ikke noe hode å spørre etterpå. Det som ikke står skrevet, har ingen kontrollert.

Det flytter jobben for mennesket. Det knappe er ikke lenger å skrive. Det knappe er å lese og vurdere. Under går vi gjennom stegene slik vi ser dem: hva som endrer seg, hva hvert steg etterlater, og hvordan det ser ut hos oss i dag.

## Ideen må stå skriftlig før noen bygger

En idé som bare finnes i en samtale, kan ikke gjennomgås. Med en KI-agent i løpet blir det tydeligere enn før. KI-agenten bygger på det den får, og en løs beskjed i et chatvindu gir et løst resultat som ingen kan holde opp mot noe.

Det steget etterlater, er en skriftlig idé: hva som skal lages, for hvem og hvorfor. Den leses av den som skal godkjenne arbeidet, før arbeidet starter.

Hos oss starter hvert blogginnlegg med en skriftlig brief. Ingen KI-agent begynner på et utkast uten den. Briefen sier hvem innlegget er for, hvilken vinkel det har, og hvilke sider på nettstedet det ikke skal gjenta. At intensjonen må gjøres tydelig før noen skriver kode, har vi omtalt som en vane i [KI på gamle vaner holder ikke](/blogg/ki-pa-gamle-vaner-holder-ikke). Her er poenget enklere: står ideen ikke skriftlig, finnes det ingenting å kontrollere mot.

## Spesifikasjonen er det første KI-agenten kan holdes ansvarlig for

En KI-agent kan bare holdes ansvarlig for det som står. Ønsker som aldri ble skrevet ned, kan den verken oppfylle eller bryte. Derfor er spesifikasjonen det første punktet i løpet der det gir mening å spørre om arbeidet ble gjort riktig.

Det steget etterlater, er regler som kan sjekkes. Ikke «skriv godt», men krav som enten er oppfylt eller ikke. Spesifikasjonen leses av KI-agenten som gjør arbeidet, og av den som kontrollerer det etterpå.

I briefene våre betyr det konkrete grenser: hvor lang tittelen kan være, hvilken tagg innlegget får, hvilke ord som ikke skal brukes, og hvilke eksisterende sider som ikke skal gjentas. Alt dette kan en kontroll gå gjennom linje for linje. De tekniske rammene rundt koden er et eget tema, som vi skriver om i [Når KI skriver fortere enn skjønnet](/blogg/sele-rundt-ki-i-saksbehandling). Spesifikasjonen sier hva akkurat denne oppgaven skal oppnå.

## Planen viser hvordan, før koden finnes

Før en KI-agent endrer noe, kan den si hva den har tenkt å gjøre. Det er billig å be om, og det er det siste tidspunktet der en feil retning nesten ikke koster noe.

Det steget etterlater, er en kort plan: hva som skal endres, i hvilke filer, og hva som ikke skal røres. Den leses av den som eier oppgaven, og den skal kunne leses på et par minutter. En plan som tar like lang tid å lese som koden, har mistet poenget.

Hos oss er planen ofte bare noen linjer. Det viktigste i den er gjerne det siste punktet, hva som ikke skal røres. Det er der en KI-agent som vil være hjelpsom, oftest går for langt.

## Koden kommer som en diff, ikke som en samtale

«Jeg har fikset det» i en melding er ikke noe å lese. Det er en påstand. Når en KI-agent har gjort jobben, skal resultatet komme i en form som viser nøyaktig hva som er endret.

Det steget etterlater, er et endringsforslag (pull request) med en diff: linjene som er lagt til, og linjene som er fjernet. Den leses av den som gjennomgår endringen, og den blir liggende som spor etterpå. Testene hører hjemme i den samme diffen. Hvilke tester som er verdt å skrive, har vi gått gjennom i [Testautomatisering for fagsystemer](/blogg/testautomatisering-for-fagsystemer).

Hos oss kommer hvert nytt innlegg som et endringsforslag mot nettstedet. Det er ikke publisert før endringen er gjennomgått og slått sammen.

## Gjennomgangen gjelder én versjon

En godkjenning som ikke peker på en konkret diff, er bare en mening. Endrer koden seg etter at noen har sagt ja, finnes det ingenting å lese som fortsatt stemmer.

Det steget etterlater, er en eksplisitt godkjenning knyttet til én versjon: hvem som godkjente, og hvilken diff som ble sett. Den leses av den som eier leveransen før noe slås sammen.

Hos oss gjelder ja-et den diffen som ligger i endringsforslaget. Kommer en ny endring etterpå, starter gjennomgangen på nytt.

## Etter lansering spør vi om det virket, ikke om det ble levert

At noe er slått sammen, betyr ikke at det virker der folk ser det. Mellom en godkjent diff og siden brukerne faktisk får, ligger bygging, publisering og alt som kan gå galt på veien.

Det steget etterlater, er en sjekk av det som er i drift, skrevet ned som et resultat. Den leses av den som eier leveransen, og den svarer på ett spørsmål: virket det?

Hos oss går en egen sjekk gjennom den levende siden etter publisering. Er tittelen og overskriften de som ble godkjent, og finnes siden i nettstedskartet? Først da kaller vi innlegget ferdig. Overvåking og logging i drift er et større tema, som vi skriver om i [Driftbarhet: lansering er midtveis, ikke målstreken](/blogg/driftbarhet-lansering-er-midtveis).

## Det vi ikke vet ennå

Mer å lese betyr at lesingen selv blir flaskehalsen. Når KI-agenter kan lage endringer raskere enn et menneske rekker å gå gjennom dem, hjelper det lite at hvert steg etterlater noe. Noen må fortsatt lese det.

Vi vet ikke ennå hvor mye av gjennomgangen som trygt kan gjøres av en annen KI-agent, og hvor et menneske alltid må inn. I dag godkjenner et menneske hver endring før den slås sammen, og det holder vi fast ved til vi vet mer.

Dette er en del av et operativsystem for utviklingsarbeid som vi bygger, og det er ikke ferdig. Det vi deler her, er troen vi bygger etter, ikke en oppskrift som er bevist.

For en IT-leder som kjøper utvikling fra en leverandør som bruker KI-agenter, finnes det ett spørsmål som rekker langt: «Hva kan jeg lese fra hvert steg?» Er svaret uklart, er kontrollen det også.

[Les hvordan vi jobber fra behov til drift.](/slik-vi-jobber)
