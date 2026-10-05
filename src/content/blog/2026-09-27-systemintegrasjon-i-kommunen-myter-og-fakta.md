---
slug: systemintegrasjon-i-kommunen-myter-og-fakta
title: "Fem myter om systemintegrasjon som koster kommunen tid"
seoTitle: "Systemintegrasjon i kommunen: 5 myter og fakta"
description: "Systemintegrasjon er ikke et engangsprosjekt. Den må tåle nedetid, hente bare nødvendige data og forvaltes. Fem myter i kommunene, og hva som gjelder."
date: 2026-09-27
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/systemintegrasjon-i-kommunen-myter-og-fakta.webp"
keywords:
  - systemintegrasjon
  - systemintegrasjon kommune
  - integrasjon fagsystem
  - saksbehandling
lang: no
draft: false
---

Systemintegrasjon betyr at to eller flere systemer utveksler opplysninger uten at et menneske kopierer dem. I kommunen avgjør det om saksbehandleren jobber i én sak eller i fem faner. Her er fem myter vi hører ofte, og hva som faktisk gjelder.

Er du usikker på hva selve fagsystemet gjør, kan du starte med [hva et saksbehandlingssystem er](https://xala.no/blogg/hva-er-et-saksbehandlingssystem).

Tre ord går igjen i teksten. Et **API** er en fast dør inn til et system, der andre systemer kan spørre og få svar. En **kø** er et venterom for meldinger som ikke kom fram ennå. Et **integrasjonslag** er ett felles sted der koblingene samles, i stedet for at hvert system snakker med alle de andre.

## Første myte: «Integrasjonen er ferdig når den er satt i drift»

Et halvt år etter lansering slutter søknadene å komme inn i fagsystemet. Ingen merker noe. Så ringer en innbygger og spør hvorfor saken hennes har stått stille i tre uker.

**Fakta:** En integrasjon er en avtale mellom to systemer som begge endrer seg. Den andre parten lanserer en ny versjon. Et sertifikat går ut. Et felt får nytt navn. Hver slik endring kan stoppe flyten uten at noen på kommunens side har gjort noe galt. Derfor må koblingen følges med på, og noen må eie den etter lansering.

**Slik gjør vi det:** Hver kobling har overvåking og varsling. Stopper den, får noen beskjed med en gang, ikke når telefonen ringer. Vi blir også med videre etter lansering, gjennom [forvaltning og drift](https://xala.no/tjenester/forvaltning-og-drift).

Det gjør hverdagen lettere fordi saksbehandleren får vite om feilen før innbyggeren gjør det.

## Andre myte: «Når det andre systemet er nede, stopper saken»

Fredag ettermiddag svarer ikke registeret. Saksbehandleren får en rød feilmelding uten forklaring, legger saken til side og håper det løser seg over helgen.

**Fakta:** En god [systemintegrasjon](/tjenester/systemintegrasjon) regner med at andre systemer av og til er nede. Meldingen legges i en kø og sendes på nytt automatisk når tjenesten svarer igjen. Imens viser saken en tydelig status, for eksempel «venter på svar fra registeret». Det er ikke en feil. Det er en tilstand saken kan stå i.

**Slik gjør vi det:** Vi avgjør for hver kobling hva saken kan gjøre mens svaret uteblir. Ofte kan søknaden sendes inn og saken jobbes videre med, mens oppslaget venter i køen. Statusmeldingen er skrevet på vanlig norsk og fungerer også med skjermleser og tastatur, fordi universell utforming gjelder feilmeldinger like mye som skjemaer.

Saksbehandleren kan jobbe videre, og innbyggeren ser at saken går, selv om et system et annet sted har en dårlig dag.

## Tredje myte: «Punkt til punkt er raskest, vi kobler bare direkte»

Den første direkte koblingen tok en uke. Den femte tok en måned, fordi hver ny kobling måtte ta hensyn til de fire som allerede fantes. Da en av dem feilet, visste ingen hvor de skulle begynne å lete.

**Fakta:** Kobler du hvert system direkte til hvert annet, får du et nett ingen har oversikt over. Logikk, logging og feilhåndtering havner spredt i mange små koblinger. Et felles integrasjonslag samler dette på ett sted.

**Slik gjør vi det:** Fagsystemet snakker med ett integrasjonslag, ikke med hvert system hver for seg. Laget har åpne, dokumenterte API-er, slik at kommunen kan koble på nye systemer senere, også fra andre leverandører, uten å starte på nytt.

Neste kobling blir enklere å bygge, og IT i kommunen vet hvor de skal lete når noe feiler.

## Fjerde myte: «Hent alt, så har vi det»

Integrasjonen henter hele personprofilen fra registeret. Saken trenger bare adresse og hvem som bor i husstanden. Resten ligger lagret i fagsystemet, uten at noen bruker det.

**Fakta:** Hent bare det saken trenger. Personvernregelverket kaller det dataminimering. Gi også integrasjonen minst mulig tilgang, og logg hvem som hentet hva og når. NSMs grunnprinsipper for IKT-sikkerhet peker i samme retning, med vekt på tilgangsstyring og logging.

**Slik gjør vi det:** Tilgang gis per formål. Felt saken ikke trenger, hentes ikke. Hvert oppslag havner i en revisjonslogg, så kommunen kan svare når noen spør hvem som så på opplysningene deres. Vil du vite mer om tilgang og testmiljøer mot registrene, har vi skrevet om [integrasjoner mot nasjonale felleskomponenter](https://xala.no/blogg/integrasjoner-mot-nasjonale-felleskomponenter).

Det gir mindre å beskytte, enklere innsynssvar og tryggere behandling for innbyggeren.

## Femte myte: «Integrasjon er et IT-spørsmål»

IT har koblet systemene. Så kommer det første svaret fra registeret tilbake tomt. Ingen har bestemt hva saken skal gjøre da. Saksbehandleren sender en e-post og ber søkeren om opplysningen på nytt.

**Fakta:** Hver kobling trenger en faglig regel ved siden av den tekniske. Hva gjør saken når data mangler eller spriker? Hvem eier feilen, og hvem sier fra til søkeren? Er det avklart, slipper innbyggeren å oppgi det samme to ganger. Det er kun én gang-prinsippet i praksis.

**Slik gjør vi det:** Fagfolk og utviklere avklarer sammen hva som skal skje i saken før koblingen bygges. Kontrollen blir liggende hos saksbehandleren. Integrasjonen henter og sender, men den tar ikke beslutningen.

Et eksempel er tilskudds- og bevillingsportalene vi leverte for Nordre Follo kommune. Ifølge casen ble arbeidsflytene analysert sammen med kommunale interessenter og omsatt til tjeneste- og systemkrav, og portalene ble koblet til kommunale systemer gjennom API-er. [Les casen om Nordre Follo](https://xala.no/caser/nordre-follo-tilskuddsportal-bevillingsportal).

Når journal og sak ikke henger sammen, ser du hvor dyrt det blir å hoppe over den faglige regelen. Det har vi skrevet om i [to faner er ikke én sak](https://xala.no/blogg/public-360-og-fagsystem-snakker-ikke).

Færre omveier for saksbehandleren betyr raskere svar til innbyggeren.

## Det du kan ta med deg

En integrasjon er ikke bare en teknisk kobling. Den er drift som noen eier, en kø som tåler nedetid, et felles lag med åpne API-er, et oppslag som henter lite og logger alt, og en faglig regel for når svaret uteblir. Mangler en av delene, er det saksbehandleren som betaler med tid.

Neste gang noen sier at integrasjonen er ferdig, spør hvem som får beskjed når den stopper.

## Vanlige spørsmål

**Hva er systemintegrasjon?**
Systemintegrasjon betyr at to eller flere systemer utveksler opplysninger automatisk, slik at ingen må kopiere dem manuelt. I kommunen gjelder det for eksempel fagsystem, arkiv, registre og innbyggerportal.

**Hvilke integrasjoner er viktige for et saksbehandlingssystem?**
De viktigste er de som henter opplysninger saken trenger, som registeroppslag, sender dokumenter til arkiv og gir innbyggeren status. Mer om de nasjonale fellesløsningene finner du i [integrasjoner mot nasjonale felleskomponenter](https://xala.no/blogg/integrasjoner-mot-nasjonale-felleskomponenter).

**Hva skjer med saken når et annet system er nede?**
Med kø og nye forsøk venter saken på svar i stedet for å stoppe, og saksbehandleren ser status. Når tjenesten er oppe igjen, sendes meldingen automatisk.

**Hva er forskjellen på punkt til punkt og et integrasjonslag?**
Punkt til punkt kobler hvert system direkte til hvert annet, mens et integrasjonslag samler koblingene ett sted. Det siste gir én plass for logging, feilhåndtering og nye koblinger.

**Hvem har ansvaret når en integrasjon feiler?**
Det bør være avtalt før lansering, både teknisk og faglig. Noen retter feilen, og noen bestemmer hva som skjer i saken imens.

**Hvor mye data bør en integrasjon hente?**
Bare det saken trenger, og med logging av hvem som hentet hva. Da er det mindre å beskytte og lettere å svare på innsyn.

## Neste steg

Skal dere koble et fagsystem til flere systemer? [Se hvordan vi bygger integrasjoner som tåler nedetid](https://xala.no/tjenester/systemintegrasjon).

Vil du heller se det i en løsning? [Book en demo](https://xala.no/book-demo).
