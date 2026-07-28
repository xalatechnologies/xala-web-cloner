---
slug: noark-5-arkivering-i-moderne-fagsystemer
title: "Noark 5 i moderne fagsystemer: arkivering som følger av saksgangen"
description: "Arkivering blir dyr når den tenkes på til slutt. Bygget inn i datamodellen er den nesten gratis."
date: 2026-08-25
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/noark-5-arkivering-i-moderne-fagsystemer.webp"
keywords: ["Noark 5", "arkivering", "arkivplikt", "journalføring", "saksbehandling", "offentlig sektor"]
lang: no
draft: false
---

Arkivplikten er ikke til forhandling for offentlige virksomheter, men den behandles ofte som en integrasjon som skal på plass mot slutten av prosjektet. Det er der kostnaden oppstår.

## Problemet med å arkivere i etterkant

Bygger man saksbehandlingsløsningen først og tenker arkiv etterpå, må integrasjonen rekonstruere en journalpost fra data som aldri ble strukturert for formålet.

Hvem var parten? Hva var saken? Hvilket dokument er selve vedtaket, og hvilke er vedlegg? Systemet vet det kanskje visuelt, men ikke i datamodellen. Da blir integrasjonen full av gjetting, og gjetting i arkivet er en revisjonsanmerkning som venter på å skje.

## Sak, dokument og part fra første rad

De tre begrepene i Noark er ikke kompliserte: en sak, dokumentene i saken, og partene den gjelder. Legger dere de tre inn i datamodellen fra start, er arkivering en konsekvens av saksgangen i stedet for en jobb på slutten.

Det betyr at når en søknad kommer inn, opprettes saken. Når et vedlegg lastes opp, er det et dokument i saken. Når vedtaket fattes, er det et dokument med en bestemt rolle. Ingenting av dette må rekonstrueres senere.

## Journalføring skal skje når noe skjer

Journalføringsplikten inntrer når et dokument kommer inn eller går ut, ikke når noen husker å trykke på en knapp. Bygg det som en konsekvens av handlingen: innsending journalfører, utsending journalfører, vedtak journalfører.

Manuell journalføring blir alltid ujevn, og ujevnheten oppdages først ved innsyn eller tilsyn.

## Skjerming og innsyn er en del av modellen

Ikke alt skal være offentlig. Personopplysninger, taushetsbelagte opplysninger og forretningshemmeligheter skal skjermes, og skjermingen skal begrunnes med hjemmel.

Det er en datamodellbeslutning, ikke en visningsbeslutning. Skjermingsgrad hører til dokumentet, ikke til skjermbildet som viser det.

## Uttrekk er sluttspillet

Et arkivsystem skal en dag kunne levere et uttrekk. Det er lettere å teste tidlig enn å oppdage sent at noe mangler.

Be om et prøveuttrekk før løsningen settes i produksjon, ikke ti år etterpå når systemet skal avvikles og ingen av dem som bygget det fortsatt jobber der.

## Ofte stilte spørsmål

### Må alle fagsystemer arkivere etter Noark 5?

Ikke alle, men alle som behandler arkivpliktig materiale. Saksbehandling som ender i vedtak er som regel arkivpliktig. Er dere i tvil, avklar det med arkivtjenesten før arkitekturen bestemmes, ikke etter.

### Kan vi bruke kommunens eksisterende arkivsystem?

Som regel ja, og det er ofte det riktige. Fagsystemet arkiverer mot det eksisterende Noark-kjernen gjennom grensesnittet den tilbyr. Det dere må avklare tidlig er hvilken versjon og hvilket grensesnitt, fordi de varierer mellom leverandører.

### Hva med dokumenter som endres underveis?

Et dokument som er journalført skal ikke endres. Nye versjoner blir nye dokumenter med en relasjon til det forrige. Bygger dere redigering direkte på det arkiverte dokumentet, bryter dere sporbarheten arkivet finnes for.

### Hvordan tester vi at arkiveringen faktisk virker?

Ved å ta et prøveuttrekk i et testmiljø og få arkivtjenesten til å se på det. Det avdekker manglende metadata og feil relasjoner mens det ennå er en utviklingsoppgave og ikke en avvikssak.
