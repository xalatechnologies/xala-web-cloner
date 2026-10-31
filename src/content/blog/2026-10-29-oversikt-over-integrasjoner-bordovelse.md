---
slug: oversikt-over-integrasjoner-bordovelse
title: "Oversikt over integrasjoner: test den med en bordøvelse"
seoTitle: "Oversikt over integrasjoner: en bordøvelse"
description: "En oversikt over integrasjoner er god nok når den svarer på fire spørsmål når en kobling stopper: hva er koblet, med hvilken tilgang, avtale og eier."
date: 2026-10-29
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/oversikt-over-integrasjoner-bordovelse.webp"
coverAlt: "Teknisk infografikk på kremfarget bakgrunn: et koblingspanel med fire porter merket Hva er koblet, Tilgang, Avtale og Eier, der eierkoblingen ender i en oransje boks merket Ukjent."
keywords:
  - oversikt over integrasjoner
  - systemintegrasjon
  - integrasjonslag
  - avhengighetsoversikt
  - overvåking av integrasjoner
  - overvåking
hashtags:
  - systemintegrasjon
  - integrasjonslag
  - avhengighetsoversikt
  - overvåking
lang: no
draft: false
faq:
  - question: "Hva er en oversikt over integrasjoner?"
    answer: "En samlet liste over hvilke tjenester løsningen kaller, med hvilken tilgang, mot hvilke avtaler og hvem som eier hver kobling."
  - question: "Hvorfor trenger kommunen en slik oversikt?"
    answer: "Fordi det er det første noen spør etter når en kobling stopper, og det første som etterspørres i en sikkerhetsgjennomgang."
  - question: "Hva er en bordøvelse?"
    answer: "En øvelse rundt et bord der teamet svarer på en tenkt hendelse bare ved hjelp av det de har skrevet ned."
  - question: "Hvem bør eie en integrasjon?"
    answer: "Én rolle i kommunen og én hos leverandøren, slik at noen får varsel og noen kan rette feilen."
  - question: "Holder det å ha oversikten i et regneark?"
    answer: "Det holder som start, så lenge den er oppdatert og alle vet hvor den ligger."
  - question: "Hva bør skje når en ekstern tjeneste er nede?"
    answer: "Overvåkingen bør varsle før innbyggerne merker det, og saken bør kunne vente i kø med en status folk forstår."
---

Et ark ligger på bordet i møterommet: «Søknadene kommer ikke inn i fagsystemet.» Én åpner wikien. Én åpner koden. Én ringer leverandøren. Ingen åpner oversikten over integrasjoner, fordi den ikke finnes.

En slik oversikt er ikke dokumentasjon for arkivet. Den er det første verktøyet dere tar fram når noe stopper. Den beste måten å teste den på er en bordøvelse: ett kort på bordet, og teamet får bare svare med det som står skrevet. Fire runder, ett spørsmål hver.

## Første runde viser om dere vet hva som faktisk er koblet

Ordstyreren spør: hvilke tjenester kaller løsningen, og hvilke kaller den? Teamet leter etter en liste. Ofte finner de en tegning fra prosjektstart og et par koblinger ingen har skrevet ned siden.

Mangler listen, blir feilsøkingen en runde med gjetting. Folk leser kode for å finne ut hva systemet snakker med.

Feltene som skal inn: tjenesten, retningen og om meldingen går direkte eller via kø. Samles koblingene i et [integrasjonslag](/blogg/systemintegrasjon-i-kommunen-myter-og-fakta), er listen lettere å holde ved like.

Kan dere ikke nevne alle koblingene, kan dere heller ikke vite hvilken som stoppet.

## Andre runde avslører tilgangen ingen husker å fornye

Neste spørsmål: med hvilken tilgang snakker løsningen med registeret? Hvilke scopes, hvilket sertifikat? Her blir det ofte stille.

Et sertifikat som går ut, stopper flyten like effektivt som et brudd. Forskjellen er at utløpet sto i kalenderen hele tiden, bare ikke i noens kalender.

Feltene som skal inn: hvilken tilgang koblingen bruker, og når den sist ble fornyet.

Et sertifikat som går ut, er en planlagt hendelse. Behandle det slik.

## Tredje runde finner avtalen som ligger bak koblingen

Tredje spørsmål: hvilken avtale hviler koblingen på, og hvem hos den andre parten tar telefonen? Teamet blar i e-post og innkjøpsmapper.

Uten avtalen vet dere ikke hva dere har krav på, eller hvem dere skal kontakte. Feilen blir liggende mens noen leter etter et navn.

Feltene som skal inn: avtalen og kontaktpunktet hos den andre parten.

En kobling uten avtale i oversikten er en kobling dere bare håper på.

## Fjerde runde stopper ved spørsmålet om hvem som eier den

Siste spørsmål: hvem eier koblingen i kommunen, og hvem eier den hos leverandøren? Svaret er ofte et navn på en person som har byttet jobb.

Skriv rollen, ikke personen. Da overlever oversikten neste omorganisering. Hver kobling bør også ha overvåking og varsling som går til den rollen, og en plan for nye forsøk, tidsavbrudd og reserveløsning per tjeneste. Det samme poenget avslutter [fagsystem uten API](/blogg/fagsystem-uten-api): en integrasjon er ferdig når neste person ser hva som er koblet og hvem som eier det.

En kobling uten eier får ingen varsel og ingen retting.

## Øvelsen kan gjentas jevnlig

Kjør den enkelt. Én ordstyrer, ett kort med en tenkt hendelse, og bare oversikten åpen på skjermen. Ingen wiki, ingen kode, ingen telefon. Hvert hull dere finner, blir et nytt felt eller en ny rad.

Bytt kort neste gang. La en ny i teamet svare. Oversikten er ferdig når en ny person kan svare på alle fire rundene uten å ringe noen.

[Fortell oss hva dere har koblet i dag, så hjelper vi dere med oversikten.](/tjenester/systemintegrasjon)
