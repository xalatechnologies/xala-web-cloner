---
slug: wcag-2-2-aa-i-praksis-for-fagsystemer
title: "WCAG 2.2 AA i praksis: det som faktisk feller offentlige løsninger"
description: "Kravet er kjent. Det som feller løsninger i en tilgjengelighetstest er som regel fire ting, og alle fire er arkitekturvalg."
date: 2026-08-11
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/wcag-2-2-aa-i-praksis-for-fagsystemer.webp"
keywords: ["WCAG 2.2 AA", "universell utforming", "tilgjengelighet", "offentlig sektor", "skjemaløsning"]
lang: no
draft: false
---

Universell utforming er et krav for offentlige digitale tjenester, ikke en ambisjon. Likevel er det få krav som oftere behandles som en oppgave på slutten av prosjektet.

Det er dyrt, fordi de fleste bruddene ikke er stylingfeil. De er konsekvenser av valg som ble tatt i arkitekturen.

## Feilmeldinger som ikke er knyttet til feltet

Den vanligste feilen i et skjema er en feilmelding som står øverst på siden og sier at noe er galt, uten at en skjermleserbruker får vite hvilket felt det gjelder.

Feilmeldingen må være programmatisk knyttet til feltet, med `aria-describedby`, og feltet må merkes med `aria-invalid`. Det er noen linjer kode hvis skjemaet er bygget for det, og en omskriving hvis det ikke er det.

## Tastaturnavigasjon som stopper

Alt som kan gjøres med mus, skal kunne gjøres med tastatur. Det høres selvsagt ut, men egendefinerte komponenter er der det ryker: en nedtrekksliste bygget av `div`-er, en modal som ikke fanger fokus, en tabell med klikkbare rader uten tabindex.

Bruk plattformens egne kontroller der de finnes. En `select` er kjedelig og fungerer overalt, også med hjelpemidler ingen av oss tester med.

## Kontrast som ikke holder i begge temaer

Kontrastkravet er 4,5:1 for vanlig tekst og 3:1 for stor tekst. Det som ryker i praksis, er lyse fargetoner brukt på lyse flater, ofte fordi paletten ble laget for mørk bakgrunn og senere gjenbrukt i lys modus.

Mål det maskinelt og mål det på det som faktisk males på skjermen, ikke på fargekoden i CSS-en. En gradient, et overlegg eller et halvgjennomsiktig kort endrer resultatet.

## Ledetekster som forsvinner

En plassholdertekst er ikke en ledetekst. Den forsvinner når brukeren begynner å skrive, og den leses ikke alltid opp.

Hvert felt trenger en synlig `label`. Det gjelder også søkefelt, filtre og skjemaer som «ser åpenbare ut», fordi det som er åpenbart visuelt ikke nødvendigvis er det for noen som navigerer med tastatur eller skjermleser.

## Test med hjelpemiddel, ikke bare med verktøy

Automatiske verktøy fanger kanskje halvparten av bruddene. De ser ikke at rekkefølgen i tabben er ulogisk, at en feilmelding aldri annonseres, eller at en knapp heter «Les mer» tolv ganger på samme side.

Sett av tid til å navigere gjennom de viktigste flytene med tastatur og med skjermleser. Det tar en time og finner det verktøyene ikke ser.

## Ofte stilte spørsmål

### Hva koster det å bygge inn universell utforming fra start?

Lite, når det er en del av komponentvalgene. Å rette i etterkant koster vesentlig mer, fordi bruddene som regel sitter i egendefinerte komponenter som må bygges om, ikke i CSS-en som kan justeres.

### Holder det å bruke et komponentbibliotek som sier det er tilgjengelig?

Det hjelper mye, men det er ikke nok. Biblioteket sikrer at komponenten oppfører seg riktig; det kan ikke sikre at dere gir feltet en ledetekst, at rekkefølgen er logisk, eller at kontrasten holder i deres palett.

### Må interne fagsystemer også oppfylle kravene?

Kravene i forskriften gjelder først og fremst løsninger rettet mot innbyggere, men saksbehandlere har også rett til et arbeidsverktøy de kan bruke. I praksis anbefaler vi samme nivå, blant annet fordi det er billigere enn å ha to standarder i samme kodebase.

### Hvordan dokumenterer vi samsvar i en anskaffelse?

Med en tilgjengelighetserklæring som beskriver hvilke krav som er oppfylt, hvilke som ikke er det, og hvorfor. En ærlig erklæring med kjente avvik er mer troverdig, og mer nyttig, enn en som hevder full oppfyllelse uten dokumentasjon.
