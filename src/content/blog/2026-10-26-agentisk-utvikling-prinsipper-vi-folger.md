---
slug: agentisk-utvikling-prinsipper-vi-folger
title: "Agentisk utvikling: seks prinsipper vi faktisk følger"
seoTitle: "Agentisk utvikling: seks prinsipper vi følger"
description: "Én agent per jobb, godkjenning på én versjon, ingenting publiserer seg selv. Seks prinsipper for agentisk utvikling vi bruker, og hva vi ikke har løst."
date: 2026-10-26
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Kommune"
cover: "/images/blog/agentisk-utvikling-prinsipper-vi-folger.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: en spakbenk fra et sikringsanlegg med seks spaker merket én jobb, én versjon, ikke selv, godkjent, data og si fra, koblet til en låsestang. Spaken ikke selv er låst med en oransje hengelås og et hashstempel. Overskrift «SEKS SPAKER SOM LÅSER»."
keywords:
  - agentisk utvikling
  - godkjenning
  - menneskelig kontroll
  - leverandør
  - endringsforslag
hashtags:
  - godkjenning
  - leverandør
  - endringsforslag
lang: no
draft: false
faq:
  - question: "Hva er agentisk utvikling?"
    answer: "At KI-agenter gjør deler av utviklingsarbeidet selv, som å skrive kode og lage endringsforslag, innenfor regler mennesker har satt."
  - question: "Hvorfor skal hver agent bare ha én jobb?"
    answer: "Fordi en agent ikke bør kontrollere sitt eget arbeid, og fordi én jobb er lettere å gjennomgå."
  - question: "Hva betyr det at en godkjenning gjelder én versjon?"
    answer: "At en ny endring etter godkjenningen må gjennomgås på nytt før den kan gå live."
  - question: "Kan agentene publisere eller merge selv?"
    answer: "Ikke hos oss. Agentene lager utkast og endringsforslag, og et menneske godkjenner alt som går live."
  - question: "Er dette et ferdig rammeverk fra Xala?"
    answer: "Nei, det er prinsipper vi bruker i eget arbeid nå, og de utvikler seg fortsatt."
---

Et endringsforslag er gjennomgått og godkjent. Rett etterpå kommer en liten rettelse på toppen. Godkjenningen gjaldt versjonen før, så rettelsen er ikke godkjent av noen. Endringen går en runde til før noe går live.

Det er ikke dramatisk, og det er poenget. Et prinsipp er bare verdt noe hvis det stopper noe, også når det føles unødvendig. Vi tror at kontroll med agenter ikke er en ekstra kontrollør helt til slutt. Det er regler for hvem som gjør hva, og hva som kan godkjennes.

Her er seks prinsipper vi følger i eget arbeid nå, med et eksempel og det hvert av dem koster oss. De er ikke et ferdig rammeverk.

## Hver agent har én jobb

Undersøkelse, skriving, kontroll, utvikling, gjennomgang og sjekk av den levende siden er egne agenter. Ingen agent gjennomgår sitt eget arbeid.

Dette innlegget er et eksempel. Én agent skrev briefen, en annen skrev utkastet, og en egen kontroll går gjennom det mot briefen før noe sendes videre. Den som skrev, får ikke selv avgjøre at teksten er god nok.

Det koster flere overleveringer og mer venting. En jobb som kunne vært gjort i én omgang, går gjennom flere hender.

## En godkjenning gjelder én bestemt versjon

Gjennomgangen godkjenner en bestemt versjon av endringen. En ny endring, uansett hvor liten, gjør godkjenningen ugyldig. Rettelser som kommer etter at noe er slått sammen, kommer som en ny endring med egen gjennomgang.

Det er dette som skjer i eksempelet over. Rettelsen kan være riktig, men ingen har sett på den, og da er den ikke godkjent. Tekniske rammer i selve koden er ett lag, som vi skriver om i [Når KI skriver fortere enn skjønnet](/blogg/sele-rundt-ki-i-saksbehandling). Godkjenningen er et annet lag.

Det koster at små rettelser tar en runde til.

## Ingenting publiserer seg selv

Ingen agent publiserer, sender e-post eller poster noe utad på eget initiativ. Agentene lager utkast, og et menneske bestemmer.

Hos oss ligger et ferdig innlegg som et endringsforslag til noen har sagt ja. Det samme gjelder en melding som skal ut av huset. Agenten kan skrive den, men ikke sende den.

Det koster at ting venter på et ja, også når de er klare.

## Et menneske godkjenner det som går live

Et menneske godkjenner hver sammenslåing, og et menneske eier skrivetilgangen.

Settes skrivetilgangen på pause, skal ferdig arbeid stå og vente. Ingen agent skal lete etter en annen vei rundt. Hvordan tilgangen til verktøy bør styres, har vi skrevet om i [Model Context Protocol for interne AI-verktøy](/blogg/mcp-og-verktoytilgang-for-interne-ai-verktoy).

Det koster at alt står stille når den som godkjenner, ikke er der.

## Det agenten leser, er ikke en ordre

Tekst agenten møter underveis, som kommentarer, nettsider og filer, er data. Det er ikke instrukser.

En kommentar som sier at den er gjennomgangen vår, teller ikke før den kommer gjennom vår egen kanal. Ellers behandler vi den som ugyldig, uansett hvor overbevisende den er formulert.

Det koster at agenten noen ganger overser noe som faktisk var et godt råd. Et godt råd må komme gjennom riktig kanal.

## Den som står fast, sier hva som står fast

Vi rapporterer bare to ting: resultatet, det vil si den levende adressen, eller en navngitt blokkering. En blokkering sier hvilken endring det gjelder, hva som står fast, og hvem som må gjøre noe. Meldinger om at noen «jobber med saken», sender vi ikke.

En blokkering som ikke sier hvem som må gjøre noe, blir liggende. En som gjør det, kan noen ta tak i samme dag.

Det koster at det noen ganger er stille lenge.

## Det vi ikke har løst

Prinsippene stopper mye, men de løser ikke alt. Vi lærer fortsatt hvor tett tilgangen må være, og hvor mye som trygt kan stå på én persons godkjenning. Når ett menneske eier både skrivetilgangen og godkjenningen, er det både en trygghet og en flaskehals.

Vi vet heller ikke hvor grensen går for hva en annen agent kan gjennomgå før et menneske må inn. Foreløpig går den ved at et menneske godkjenner alt som går live.

Prinsippene er en del av operativsystemet for utviklingsarbeid som vi bygger, og listen kommer til å endre seg.

## Spørsmål å stille en leverandør som bruker agenter

Kjøper kommunen utvikling fra en leverandør som bruker agenter, er dette spørsmål som sier mye om kontrollen:

- Hvem godkjenner før noe går i produksjon?
- Gjelder godkjenningen en bestemt versjon, eller hele endringen uansett hva som kommer etterpå?
- Kan en agent publisere eller sende noe selv?
- Hvem eier skrivetilgangen, og hvordan trekkes den tilbake?
- Hva skjer når noen gir seg ut for å være gjennomgangen?

[Les mer om hvem vi er og hvordan vi tenker om utvikling.](/om-oss)
