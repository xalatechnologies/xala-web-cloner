---
slug: id-porten-eller-maskinporten-hva-velger-du
title: "ID-porten eller Maskinporten: hvilken du trenger, og når du trenger begge"
seoTitle: "ID-porten eller Maskinporten: hva velger du"
description: "De løser to forskjellige problemer. Velger du feil, oppdager du det først når tilgangssøknaden er sendt."
date: 2026-06-14
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/id-porten-eller-maskinporten-hva-velger-du.webp"
keywords: ["ID-porten", "Maskinporten", "autentisering", "Digdir", "felleskomponenter", "OAuth"]
lang: no
draft: false
---

To av de nasjonale felleskomponentene handler om tilgang, og de forveksles ofte. Forskjellen er enkel når den først er sagt: ID-porten identifiserer et menneske. Maskinporten identifiserer et system.

## ID-porten er for innbyggeren

Når en person skal logge inn for å søke om noe, se sin egen sak eller signere, er det ID-porten. Brukeren autentiseres med BankID eller et annet godkjent middel, og løsningen får vite hvem personen er.

Det viktige valget her er hvor mye dere faktisk trenger. Et fødselsnummer gir tilgang til opplysninger dere kanskje ikke har hjemmel til å bruke. Be om det laveste sikkerhetsnivået og det minste settet med opplysninger som løser oppgaven.

## Maskinporten er for systemet

Når fagsystemet deres skal hente data fra et register uten at et menneske er involvert, er det Maskinporten. Systemet får et token basert på virksomhetssertifikat, og tokenet sier hvilken virksomhet som spør og hva den har lov til å hente.

Det er her scopes kommer inn. Et scope er en avgrenset tillatelse, og dere søker om hvert enkelt. Å be om flere enn dere trenger forsinker søknaden og gjør sikkerhetsgjennomgangen tyngre.

## De fleste løsninger trenger begge

En typisk tilskuddsportal bruker ID-porten for at søkeren skal logge inn, og Maskinporten for å hente organisasjonsopplysninger fra Enhetsregisteret mens søknaden fylles ut.

Det betyr to sett avtaler, to sett roller og to søknadsløp. Begge bør startes samtidig med utviklingen, ikke etter at løsningen er ferdig.

## Tilgang er en prosess, ikke en konfigurasjon

Dette er det som overrasker flest. Avtaler skal signeres, roller skal delegeres i Altinn, og virksomhetssertifikater skal på plass. Ingen av delene går fort fordi noen har det travelt.

Vi har sett prosjekter der utviklingen var ferdig og løsningen sto i tre uker og ventet på en tilgang ingen hadde søkt om. Legg søknadene inn i planen på lik linje med utviklingsoppgavene.

## Test i riktig miljø, tidlig

Både ID-porten og Maskinporten har testmiljøer, og de ligner produksjon uten å være like. Andre testdata, andre responstider og noen ganger andre feilmeldinger.

Sett opp integrasjonen mot testmiljøet i første sprint, selv om resten av løsningen ikke er klar. Da oppdager dere avvikene mens det fortsatt er billig å håndtere dem.

## Ofte stilte spørsmål

### Kan vi bruke ID-porten til maskin-til-maskin-integrasjon?

Nei. ID-porten forutsetter at et menneske autentiserer seg. For systemintegrasjon uten bruker er Maskinporten riktig komponent, og å forsøke å strekke ID-porten til formålet gir en løsning som ikke går gjennom en sikkerhetsgjennomgang.

### Hvor lang tid tar det å få tilgang?

Det varierer med virksomhet og med hvilke scopes dere søker om. Regn i uker, ikke dager, og start prosessen samtidig med utviklingen. Vi hjelper til med å beskrive hvilke scopes løsningen faktisk trenger, som ofte er færre enn den første listen.

### Trenger vi virksomhetssertifikat?

For Maskinporten, ja. Sertifikatet identifiserer virksomheten som ber om tokenet, og det må fornyes. Sett en påminnelse: et utløpt sertifikat stopper alle integrasjonene samtidig, og det skjer alltid på et ubeleilig tidspunkt.

### Hva med innlogging for saksbehandlere?

Der brukes som regel virksomhetens egen identitetsløsning, typisk Entra ID, ikke ID-porten. ID-porten er for innbyggere og næringsdrivende som logger inn utenfra.
