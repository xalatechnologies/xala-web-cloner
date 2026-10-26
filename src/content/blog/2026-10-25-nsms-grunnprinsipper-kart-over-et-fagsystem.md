---
slug: nsms-grunnprinsipper-kart-over-et-fagsystem
title: "NSMs grunnprinsipper: kart over et fagsystem i drift"
seoTitle: "NSM-grunnprinsipper: kart over fagsystemet"
description: "Fire deler i NSMs grunnprinsipper for IKT-sikkerhet. Slik kan de legges over ett fagsystem som et kart med adresse i arkitekturen og eier i drift."
date: 2026-10-25
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/nsms-grunnprinsipper-kart-over-et-fagsystem.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: kompassrose med N, Ø, S og V, fagsystem i midten og fire felt merket identifisere og kartlegge, beskytte og opprettholde, oppdage, og håndtere og gjenopprette. Overskrift «KART OVER FAGSYSTEMET»."
keywords:
  - NSMs grunnprinsipper
  - grunnprinsipper
  - grunnprinsipper for IKT-sikkerhet
  - IKT-sikkerhet
  - IKT-sikkerhet i kommunen
  - sikkerhet i fagsystemet
  - overvåking
  - overvåking og logging
  - logging
hashtags:
  - grunnprinsipper
  - IKT-sikkerhet
  - overvåking
  - logging
lang: no
draft: false
faq:
  - question: "Hva er NSMs grunnprinsipper for IKT-sikkerhet?"
    answer: "Et sett anbefalte tiltak fra Nasjonal sikkerhetsmyndighet, ordnet i fire kategorier: identifisere og kartlegge, beskytte og opprettholde, oppdage, og håndtere og gjenopprette."
  - question: "Er grunnprinsippene et krav for kommunen?"
    answer: "De er anbefalinger og et vanlig utgangspunkt. Hva som kreves i en anskaffelse, avgjør kommunen selv."
  - question: "Hvem eier sikkerheten når en leverandør drifter fagsystemet?"
    answer: "Ansvaret fordeles i forvaltningsavtalen, så hver del av kartet bør ha en navngitt eier hos kommunen eller leverandøren."
  - question: "Hvordan henger grunnprinsippene sammen med ISO 27001?"
    answer: "ISO 27001 er et styringssystem som kan sertifiseres. Grunnprinsippene er konkrete tiltak som passer inn i det arbeidet."
  - question: "Hvor ofte bør kartet oppdateres?"
    answer: "Hver gang systemet endres, som en del av endringen og ikke som et eget prosjekt."
---

Rammeverket ligger i en mappe. Systemet går i drift. Ingen har lagt det ene over det andre.

NSMs grunnprinsipper for IKT-sikkerhet blir nyttige først når hver del har en adresse i arkitekturen og en eier i forvaltningsavtalen. De fire kategoriene kan legges over ett fagsystem som et kart med fire felt.

## Grunnprinsippene virker først når de har en adresse i systemet

Prinsippene er ordnet i fire kategorier. Identifisere og kartlegge handler om å vite hva systemet består av. Beskytte og opprettholde handler om å sikre det. Oppdage handler om å se når noe går galt. Håndtere og gjenopprette handler om å komme tilbake etterpå.

Arkitektens jobb er ikke å gjenta listen. Jobben er å gi hver kategori en plass i systemet og et navn som eier den i drift.

Et rammeverk uten adresse er et dokument, ikke et vern.

## Identifisere og kartlegge: start med det fagsystemet henter fra andre

Et fagsystem står sjelden alene. Det henter data fra registre, sender til arkiv og snakker med betaling og innlogging. Kartet som bare viser egen kode, mangler halvparten.

Kartleggingen bør derfor starte med integrasjonene og tredjepartene, og med hvor data ligger og behandles. Region er et valg som kan dokumenteres i anskaffelsen, ikke noe som bare skjer.

Tegnet på at det mangler: ingen kan svare på hva som stopper når en ekstern tjeneste faller ut.

## Beskytte og opprettholde: bygg vernet inn i datamodellen

Beskyttelse lagt på utsiden av et ferdig system blir en omskriving. Bygget inn i datamodellen fra start koster den lite. Det gjelder sporbarhet, logging og hvem som eier hvilke data.

Tilgang bør følge rolle og ordning, ikke navn. Oppdateringer og sikkerhetsfikser hører til forvaltningen, ikke til et eget prosjekt når noen husker det.

Tegnet på at det mangler: sikkerheten beskrives som et lag rundt systemet, ikke som en del av det.

## Oppdage: vit at noe er galt før brukerne melder det

En saksbehandler ringer og sier at noe henger. Da er det allerede for sent å oppdage feilen. Overvåking og varsling skal melde fra før brukerne merker feilen, også når feilen ligger hos en tredjepart.

Overvåking og logging legges ofte på i etterkant, der det er dyrest. Hvorfor det bør planlegges før lansering, er omtalt i [Driftbarhet: lansering er midtveis, ikke målstreken](/blogg/driftbarhet-lansering-er-midtveis).

Tegnet på at det mangler: den første varslingen kommer fra en bruker.

## Håndtere og gjenopprette: bevis at det virker ved å teste

En sikkerhetskopi er bare verdt noe hvis den kan hentes tilbake. Det kan bare bekreftes ved en faktisk gjenoppretting, og en feilet test er et funn, ikke et nederlag. Hvordan testen legges opp, står i [Gjenopprettingstest: slik vet dere at backupen virker](/blogg/gjenopprettingstest-av-backup).

Håndteringen trenger også en eier: hvem bestemmer, hvem varsler, og hvem snakker med kommunen mens systemet er nede.

Tegnet på at det mangler: gjenoppretting står i avtalen, men har aldri vært prøvd.

## Kartet holder bare hvis dokumentasjonen følger endringene

Et kart som var riktig ved lansering, blir feil ved første endring. Dokumentasjon som holdes ved like, er det som gjør kartet brukbart etter et år i drift. Det er også det som gjør exit uten innlåsing mulig, fordi en ny leverandør kan lese hva som finnes.

Kartet oppdateres som en del av hver endring, ikke som en egen øvelse.

Kartet er et arbeidsdokument, ikke et vedlegg.

[Se hva en forvaltningsavtale med Xala dekker](/tjenester/forvaltning-og-drift).
