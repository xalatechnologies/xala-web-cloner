---
slug: sprakmodeller-i-offentlig-forvaltning-hva-som-krever-avklaring
title: "Språkmodeller i offentlig forvaltning: fire avklaringer før dere begynner"
description: "De tekniske spørsmålene er sjelden det som stopper et prosjekt. Det er de fire under."
date: 2026-10-06
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/sprakmodeller-i-offentlig-forvaltning-hva-som-krever-avklaring.webp"
keywords: ["språkmodeller", "LLM", "KI offentlig sektor", "personvern", "behandlingsgrunnlag", "Claude"]
lang: no
draft: false
---

Interessen for språkmodeller i forvaltningen er reell, og de fleste pilotene stopper ikke på teknologien. De stopper på fire spørsmål som burde vært avklart før første linje kode.

## Hva er behandlingsgrunnlaget

Skal modellen se personopplysninger, må behandlingen ha et grunnlag i personvernforordningen, og den registrerte skal informeres.

Det er ikke et hinder, men det er en jobb, og den bør gjøres av noen som kan regelverket før prosjektet er halvveis. Et alternativ som ofte fungerer: la modellen jobbe på anonymiserte eller pseudonymiserte data, og la mennesket koble tilbake.

## Hvor behandles dataene

Kjøres modellen i en region dere har akseptert, hos en leverandør dere har en databehandleravtale med, og brukes forespørslene til å trene modellen videre?

Det siste er verdt å lese i avtalen framfor å anta. Svaret varierer mellom leverandører og mellom produkttyper hos samme leverandør.

## Hva skjer når den tar feil

Den tar feil. Spørsmålet er hva systemet gjør da.

Er svaret et utkast et menneske leser, er konsekvensen liten. Er svaret noe som sendes ut automatisk, er den stor. Design for at feilen skal være billig, i stedet for å håpe at den ikke kommer.

## Hvordan vet dere at det virker

En pilot uten måling blir en meningsutveksling. Bestem på forhånd hva som skal måles: tid brukt per sak, andel svar som brukes uendret, antall returnerte saker.

Sett også et nullpunkt før dere begynner. Uten det er det umulig å skille effekten av modellen fra effekten av at noen ryddet i rutinene samtidig.

## Om leverandørvalg

Markedet endrer seg fort, og modellene fra Anthropic, OpenAI og Google flytter seg forbi hverandre i kvalitet flere ganger i året. Det er et argument for å bygge slik at modellen kan byttes.

Legg modellkallet bak et eget grensesnitt i koden. Da er bytte av leverandør en konfigurasjonsendring, ikke et prosjekt, og dere er ikke låst til et valg tatt på et gitt tidspunkt.

## Ofte stilte spørsmål

### Kan vi bruke en språkmodell på saksdokumenter med personopplysninger?

Det avhenger av behandlingsgrunnlaget og av hvor modellen kjøres. Mange kommer lengst ved å pseudonymisere før dataene sendes, og la kobling tilbake til person skje lokalt. Avklar det med personvernombudet før piloten, ikke etter.

### Bør vi kjøre modellen selv?

Sjelden. Egen drift av store modeller er kostbart og krever kompetanse de fleste ikke har. En leverandør med databehandleravtale, kjent region og et løfte om at data ikke brukes til trening, dekker de fleste behovene.

### Hva slags oppgaver egner seg best?

Sammenstilling, oppsummering, utkast og søk på tvers av mange dokumenter. Altså oppgaver der et menneske uansett skulle lest gjennom noe, og der modellen gjør lesingen kortere framfor å erstatte vurderingen.

### Hvordan unngår vi at modellen finner på ting?

Ved å be den svare fra oppgitt kildemateriale i stedet for fra hukommelsen, og ved å vise kilden sammen med svaret. Et svar uten kilde bør behandles som et forslag, ikke som et faktum, uansett hvor selvsikkert det er formulert.
