---
slug: personvern-i-nytt-fagsystem-sjekkliste
title: "Personvern i nytt fagsystem: én sjekkliste"
description: "Trenger, minimerer, dokumenterer, sletter. Én sjekkliste for personvern når kommunen får nytt fagsystem, fra hvilke opplysninger til hvor dataene ligger."
date: 2026-10-18
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/personvern-i-nytt-fagsystem-sjekkliste.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: et apotekskap med seks små skuffer merket trengs, minimer, grunnlag, slett, avtale og EU/EØS. Fem skuffer er lukket med en hake, og skuffen slett står halvveis åpen i oransje. Overskrift «SEKS SKUFFER FØR START»."
keywords:
  - personvern
  - dataminimering
  - sletterutiner
  - behandlingsgrunnlag
  - databehandleravtale
hashtags:
  - personvern
  - dataminimering
  - sletterutiner
  - databehandleravtale
lang: no
draft: false
faq:
  - question: "Hvem har ansvaret for personvernet i et nytt fagsystem?"
    answer: "Kommunen er behandlingsansvarlig, og leverandøren er databehandler etter avtale med kommunen."
  - question: "Må vi ha en databehandleravtale med leverandøren?"
    answer: "Ja, når leverandøren behandler personopplysninger på vegne av kommunen."
  - question: "Hva betyr dataminimering i praksis?"
    answer: "At systemet bare samler inn opplysninger som trengs for formålet, og at resten ikke etterspørres."
  - question: "Kan sletting gjøres manuelt?"
    answer: "Det kan det, men det er sårbart. Det er bedre at systemet støtter sletting etter faste regler."
  - question: "Må dataene ligge i Norge?"
    answer: "Kravet varierer, men for offentlige kunder er det vanlig å holde dataene innenfor EU/EØS."
---

Kartlegger. Minimerer. Dokumenterer. Setter opp sletterutiner. Slik står det i vårt eget svar om personvern, og sammen med avtalen og stedet dataene ligger, blir det en sjekkliste som passer på én side.

Når kommunen får et nytt fagsystem, er det fristende å la personvernet bli et punkt i siste fase, rett før systemet settes i drift. Da er datamodellen ferdig og skjemaene laget, og det som burde vært et designvalg, blir en lapp som limes på til slutt. Sjekklisten under er laget for å brukes tidlig, mens det fortsatt er enkelt å endre.

## Sjekklisten: seks punkter før systemet tas i bruk

Tabellen kan skrives ut og brukes alene. Hvert punkt har et svar som noen må eie, og et tidspunkt i prosjektet der svaret bør være på plass.

| Punkt | Hva dere sjekker | Hvem eier svaret | Når i prosjektet |
|---|---|---|---|
| Hvilke personopplysninger trengs | At hvert felt i systemet har et formål som kan forklares | Fagavdelingen, med støtte fra personvernombudet | Før kravspesifikasjonen er ferdig |
| Minimere innsamlingen | At skjemaer og datakilder ikke henter mer enn formålet krever | Fagavdelingen og leverandøren sammen | Når skjemaer og datamodell tegnes |
| Behandlingsgrunnlag dokumentert | At grunnlaget for hver behandling står skriftlig, og at de registrerte får informasjon | Kommunen som behandlingsansvarlig | Før de første opplysningene registreres |
| Sletterutiner satt opp | At systemet kan slette eller anonymisere etter regel, ikke bare ved manuell rydding | Kommunen bestemmer regelen, leverandøren bygger den | Før systemet settes i drift |
| Databehandleravtale inngått | At avtalen dekker akkurat denne leverandøren og denne behandlingen | Kommunen, med innkjøp og jurist | Før leverandøren får tilgang til ekte data |
| Data innenfor EU/EØS | At dere vet hvor dataene lagres, og at det er dokumentert | Kommunen, med leverandøren som kilde | Når driftsmodell og lagring velges |

Resten av artikkelen forklarer det som ikke får plass i en rute.

## Hvilke personopplysninger systemet faktisk trenger

Kartleggingen starter med feltene, ikke med lovteksten. Gå gjennom hvert felt systemet skal ha, og still tre spørsmål: hva brukes opplysningen til, hvem leser den, og hva skjer i saken hvis den mangler? Et felt som ingen kan svare på, er et felt som ikke trengs.

Det vanligste problemet er arv. Feltlisten fra systemet dere går bort fra, kopieres inn fordi den finnes, ikke fordi noen har vurdert den. Et nytt fagsystem er en sjelden anledning til å stille spørsmålet på nytt.

Se også etter fritekstfelt. De er nyttige for saksbehandleren, men de samler inn opplysninger ingen har planlagt for. Spør om fritekst trengs der den står, eller om et strukturert valg gjør samme jobben.

## Mindre innsamling gir mindre å beskytte

Dataminimering høres ut som en juridisk plikt, og det er det. Men det er også det enkleste sikkerhetstiltaket dere har. En opplysning som aldri samles inn, kan ikke komme på avveie, trenger ingen sletterutine og trenger ikke forklares for den registrerte.

I praksis handler det om små valg i skjema og datamodell. Spør bare én gang om det samme. Ikke gjør felt obligatoriske fordi det er greit å ha dem. Hent ikke en hel person fra et register når saken bare trenger én opplysning. Og la standardvalget være det som samler minst.

Det lønner seg å la fagavdelingen og leverandøren gjøre denne gjennomgangen sammen. Fagavdelingen vet hva saken trenger, og leverandøren vet hva systemet henter i bakgrunnen.

## Behandlingsgrunnlaget skal stå skriftlig

Hver behandling av personopplysninger trenger et grunnlag, og grunnlaget skal kunne vises fram. Som vi skriver om [automatisering og AI](/tjenester/automatisering-og-ai): automatisert behandling av personopplysninger krever et rettslig grunnlag og informasjon til den registrerte.

Det samme gjelder også når behandlingen ikke er automatisert. Skriv ned formålet, grunnlaget og hvilke opplysninger som inngår, og legg det der både fagavdelingen og personvernombudet finner det. Et grunnlag som bare finnes i hodet til prosjektlederen, forsvinner når prosjektet er ferdig.

Den andre halvdelen er informasjonen til de registrerte. Avklar hvor den skal stå, for eksempel i skjemaet eller i kommunens personvernerklæring, og at den beskriver det systemet faktisk gjør.

## Sletterutinene må bygges, ikke bare skrives

En sletterutine på papir er et løfte. En sletterutine i systemet er en funksjon. Forskjellen merkes først når noen spør om opplysningene fortsatt finnes.

At rutinen er bygget, betyr at systemet kan slette eller anonymisere opplysninger etter en regel kommunen har bestemt, uten at noen må huske å gjøre det. Spør leverandøren om regelen kan settes per sakstype, om sletting kan skje automatisk, og om det blir dokumentert at den har skjedd.

Husk at noe skal bevares. Deler av en sak skal arkiveres, og da må regelen skille mellom det som skal arkiveres og det som skal slettes. Anonymisering kan være et godt mellomvalg når opplysningene trengs til statistikk, men ikke lenger trenger å kunne knyttes til en person.

## Avtalen og stedet dataene ligger

Når leverandøren behandler personopplysninger på vegne av kommunen, trengs en databehandleravtale. Den bør dekke akkurat denne behandlingen og denne leverandøren, også underleverandørene. Hvorfor én avtale sjelden dekker alle, har vi skrevet om i [Databehandleravtale: én avtale dekker ikke alle leverandørene](/blogg/databehandleravtale-flere-leverandorer).

Det siste punktet er hvor dataene ligger. For offentlige kunder holder vi data innenfor EU/EØS, og det bør være dokumentert, ikke antatt. Hvilke valg det innebærer når løsningen kjører i skyen, går vi gjennom i [Azure for offentlig sektor: hvor data ligger, og hva dere må kunne dokumentere](/blogg/azure-for-offentlig-sektor-krav-og-valg).

[Les hvordan vi legger personvern inn i arkitekturen fra start.](/faq)
