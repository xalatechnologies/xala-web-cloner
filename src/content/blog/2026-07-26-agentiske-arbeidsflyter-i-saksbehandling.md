---
slug: agentiske-arbeidsflyter-i-saksbehandling
title: "Agentiske arbeidsflyter i saksbehandling: hvor de hører hjemme, og hvor de ikke gjør det"
seoTitle: "Agentiske arbeidsflyter i saksbehandling"
description: "En agent som kan handle på egen hånd er nyttig i forarbeidet og farlig i vedtaket. Skillet er verdt å gjøre eksplisitt."
date: 2026-07-26
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/agentiske-arbeidsflyter-i-saksbehandling.webp"
keywords: ["agentiske arbeidsflyter", "AI-agenter", "saksbehandling", "automatisering", "forvaltningsloven", "KI i offentlig sektor"]
lang: no
draft: false
---

En agentisk arbeidsflyt er en der en språkmodell ikke bare svarer, men handler: den henter data, kaller verktøy, vurderer resultatet og gjør neste steg. Det er en reell endring fra en chatbot, og det er derfor spørsmålet om hvor de hører hjemme er blitt praktisk.

## Skillet går ved vedtaket

Et forvaltningsvedtak må kunne begrunnes, etterprøves og påklages. Det setter en grense som ikke er teknisk: utfallet må kunne utledes av regler noen kan lese, ikke av en modells vurdering.

Det betyr ikke at modeller er ubrukelige i saksbehandling. Det betyr at de hører hjemme før vedtaket, ikke i det.

## Forarbeidet er der gevinsten ligger

Det som tar tid i en sak er sjelden selve vurderingen. Det er å finne fram, lese gjennom, sammenstille og lete etter det som mangler.

En agent som leser vedleggene i en søknad og lager en liste over hva som mangler mot kravene i regelverket, sparer reell tid uten å ta en eneste beslutning. Saksbehandleren får et bedre utgangspunkt og bestemmer fortsatt selv.

## Verktøy, ikke frihet

En agent blir nyttig når den har verktøy med tydelige grenser: slå opp i dette registeret, les dette dokumentet, skriv et utkast til dette feltet.

Den blir uhåndterlig når den får generell tilgang og et vagt mål. Da er det ingen som kan svare på hva den gjorde, og «vi vet ikke helt» er ikke et akseptabelt svar når det gjelder personopplysninger.

## Loggfør det agenten gjorde, ikke bare hva den svarte

Hvis en agent har kalt fire verktøy for å komme fram til et forslag, er de fire kallene en del av begrunnelsen. De bør logges på lik linje med resten av saksbehandlingen.

Det er også det som gjør det mulig å finne ut hva som gikk galt den dagen noe går galt, og å svare på et innsynskrav om hvordan opplysningene ble behandlet.

## Start med et internt bruksområde

Det tryggeste stedet å lære er internt, der feil ikke rammer en innbygger. Sammenstilling av dokumentasjon, søk på tvers av interne kilder, utkast til standardsvar.

Når rutinene for logging, tilgang og evaluering sitter der, er terskelen til innbyggerrettede bruksområder mye lavere.

## Ofte stilte spørsmål

### Kan en AI-agent fatte vedtak?

Helautomatiserte vedtak er tillatt i norsk forvaltning, men de må kunne begrunnes med regler. En språkmodells vurdering er ikke en slik begrunnelse. Bruk regelmotor for utfallet og modellen til å forberede grunnlaget.

### Hvordan hindrer vi at agenten gjør noe uventet?

Ved å gi den få og veldefinerte verktøy i stedet for generell tilgang, ved å kreve bekreftelse for handlinger som endrer noe, og ved å logge hvert verktøykall. En agent uten skriverettigheter kan ikke gjøre skade som ikke kan rulles tilbake.

### Hva med personopplysninger i modellen?

Avklar behandlingsgrunnlaget først, og velg en leverandør og en driftsmodell der dere vet hvor data behandles og om de brukes til trening. Det er et innkjøps- og arkitekturvalg, ikke noe som kan ordnes i etterkant.

### Hvordan måler vi om det faktisk hjelper?

På liggetid og på hvor mange saker som må returneres for manglende dokumentasjon. Antall automatiserte steg er ikke et mål. Vi har skrevet mer om det skillet i innlegget om automatisering av saksbehandling.
