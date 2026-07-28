---
slug: teknologivalg-for-fagsystemer-som-skal-vare
title: "Teknologivalg for systemer som skal leve i ti år"
description: "Et fagsystem lever lenger enn rammeverkene som var populære da det ble bygget. Det bør påvirke valget."
date: 2026-09-08
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/teknologivalg-for-fagsystemer-som-skal-vare.png"
keywords: ["teknologivalg", ".NET", "React", "TypeScript", "arkitektur", "teknisk gjeld", "fagsystem"]
lang: no
draft: false
---

Et fagsystem i offentlig sektor lever typisk lenger enn karrieren til de som bygget det. Det er en ubehagelig tanke når man velger rammeverk, og den bør være med i valget.

## Velg kjedelig der det teller

Kjernen i systemet, der dataene og reglene bor, bør bygges på noe som fortsatt finnes om ti år, har sikkerhetsoppdateringer, og som det er mulig å rekruttere til.

Vi bruker .NET og C# der. Ikke fordi det er spennende, men fordi det er godt vedlikeholdt, sterkt typet, godt dokumentert, og fordi det er lett å finne folk som kan det i Norge.

## Vær villig til å være moderne i kantene

Grensesnittet har kortere levetid enn kjernen, og det er greit. React og TypeScript er et rimelig valg i dag, og hvis frontenden må skrives om om seks år, er det en overkommelig jobb så lenge den snakker med et stabilt API.

Det er derfor grensesnittet mot kjernen betyr mer enn hvilket rammeverk grensesnittet er skrevet i.

## Antall avhengigheter er en langtidskostnad

Hver pakke er noe noen må oppdatere, og noe som kan bli forlatt. En avhengighet som sparer tre dagers arbeid i dag, men er uvedlikeholdt om to år, er ikke en besparelse.

Vurder hver avhengighet på vedlikehold og utbredelse, ikke bare på hva den gjør. Standardbiblioteket er kjedeligere og lever lenger.

## Databasen overlever koden

Kode skrives om. Data blir liggende. Datamodellen er derfor det valget som har lengst konsekvens, og det som er dyrest å endre senere.

Vi bruker PostgreSQL som standard. Bruk tid på modellen, navngi ting slik at neste utvikler forstår dem, og la databasen håndheve det som skal være sant, ikke bare applikasjonen.

## Skriv ned hvorfor, ikke bare hva

Om fem år kommer noen til å lure på hvorfor dere valgte som dere gjorde. Uten en begrunnelse ender de med å gjette, og gjetting fører enten til unødvendige omskrivinger eller til at et dårlig valg blir stående fordi ingen tør røre det.

En kort beslutningslogg med valg, alternativer og begrunnelse koster en time og sparer uker.

## Ofte stilte spørsmål

### Hvorfor .NET og ikke Node eller Java?

Alle tre kan bygge et godt fagsystem. Vi lander på .NET fordi typesystemet fanger mye i kompileringen, fordi det er godt vedlikeholdt av en stor aktør, og fordi det er lett å rekruttere til i Norge. Java er et fullt forsvarlig alternativ av samme grunner.

### Er det galt å velge et nytt og spennende rammeverk?

Ikke nødvendigvis, men still spørsmålet: hvem vedlikeholder dette om fem år, og hvor mange andre bruker det? For et grensesnitt som uansett skrives om, er risikoen lav. For kjernen i et system som skal leve i ti år, er den høy.

### Hva med lavkode-plattformer?

De kan være riktige for avgrensede interne arbeidsflyter. For et fagsystem som er avhengig av integrasjoner, arkivering og sporbare vedtak, ender de ofte i en blindvei der det som mangler ikke kan bygges innenfor plattformen.

### Hvordan unngår vi teknisk gjeld?

Man unngår den ikke, man betjener den. Sett av tid til oppdateringer i hver leveranse i stedet for å samle dem opp til et prosjekt. Gjeld som betales løpende er en driftskostnad; gjeld som samles opp blir et moderniseringsprosjekt.
