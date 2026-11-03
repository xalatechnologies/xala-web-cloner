---
slug: tydelige-grenser-i-koden-for-ki-agenter
title: "KI-agenter trenger en kodebase med tydelige grenser"
seoTitle: "Arkitektur for KI-agenter: grenser i koden"
description: "En KI-agent jobber tryggest i en kodebase med tydelige grenser. Små moduler, faste grensesnitt og en rolig kjerne gjør hver endring lett å lese og stoppe."
date: 2026-11-06
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/tydelige-grenser-i-koden-for-ki-agenter.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: et skipsskrog delt med vanntette skott i åpen sone, grensesnitt og kjerne, der en oransje endring holdes inne i ett rom."
keywords:
  - arkitektur for KI-agenter
  - KI-agenter
  - modulær arkitektur
  - grensesnitt
  - kodebase
lang: no
draft: false
faq:
  - question: "Hvorfor betyr arkitekturen noe for KI-agenter?"
    answer: "Fordi grensene i koden avgjør hvor langt en endring sprer seg, og dermed hvor lett den er å lese og stoppe."
  - question: "Hva er en modulær arkitektur?"
    answer: "En kodebase delt i avgrensede deler som snakker sammen gjennom faste grensesnitt."
  - question: "Skal KI-agenter få endre alt i kodebasen?"
    answer: "Nei. Det er lurt å skille mellom deler der de kan jobbe fritt og deler som krever ekstra gjennomgang."
  - question: "Hva er et grensesnitt i denne sammenhengen?"
    answer: "Avtalen for hvordan to deler av systemet snakker sammen, som bare bør endres med vilje."
  - question: "Må hele systemet bygges om før man bruker KI-agenter?"
    answer: "Nei. Man kan begynne med å markere kjernen og grensesnittene i systemet man har."
---

Et tenkt eksempel: en KI-agent får beskjed om å legge til ett felt i et skjema. Endringsforslaget som kommer tilbake, berører mange filer: databasen, to integrasjoner og en felles hjelpefunksjon som flere andre deler bruker.

Agenten gjorde ikke noe feil. Kodebasen hadde ingen grense som sa hvor endringen burde stoppe. Hvor godt en KI-agent jobber, avhenger ikke bare av instruksen, men av huset den jobber i. Det er en arkitekturbeslutning, ikke en promptbeslutning. Et nyttig bilde er et kart med tre soner: en åpen sone, en grense og en kjerne.

## En liten oppgave bør gi en liten endring

Ett nytt felt burde bety noen få linjer i ett skjermbilde. Når det i stedet blir en endring på tvers av systemet, sier det mer om kodebasen enn om agenten.

Størrelsen på en endring er derfor et arkitektursignal. En liten endring er lettere å lese, lettere å teste og lettere å stoppe, slik det er beskrevet i [Når agenten skriver koden](/blogg/nar-agenten-skriver-koden). Blir små oppgaver stadig store, er det grensene som må sees på.

## I den åpne sonen kan KI-agenten jobbe fritt

Noen deler av et system står mest for seg selv: et skjermbilde, en rapport, en avgrenset modul med egne tester. En endring der treffer lite annet.

Her kan en KI-agent få jobbe fritt. Testene sier om noe brakk, og feilen holder seg innenfor modulen. Jo større den åpne sonen er, jo mer av arbeidet kan gå raskt uten at noe annet står på spill.

## Grensesnittet er en avtale som bare endres med vilje

Mellom modulene, og mot andre systemer, ligger grensesnittene. De beskriver hvordan to deler snakker sammen. Endres et grensesnitt, må alle som bruker det, tilpasse seg.

Derfor bør en endring her være en egen beslutning, aldri en bieffekt av en annen oppgave. Ber en oppgave i den åpne sonen om å endre et grensesnitt, er det et tegn på at oppgaven bør stoppes og vurderes på nytt.

## Kjernen endres sjelden og leses alltid ekstra nøye

Innerst ligger det som mange deler bygger på: tilgang, data og felles logikk. En feil her merkes overalt.

Kjernen bør endres sjelden, og hver endring bør få ekstra blikk. Det betyr ikke at en KI-agent aldri kan foreslå noe der. Det betyr at forslaget leses som en endring i fundamentet, ikke som en rask retting.

## Uten grenser sprer hver endring seg

Delte hjelpefunksjoner og skjulte avhengigheter er det som gjør en liten oppgave stor. En funksjon som brukes overalt, blir rørt av alle, og ingen vet helt hva som henger på den.

En agent som følger tråden, gjør det den skal: den retter alt som henger sammen. Uten grenser henger alt sammen. Resultatet er endringer som er vanskelige å lese og nesten umulige å stoppe halvveis.

## Tegn grensene før agentene slippes til

Hele systemet trenger ikke bygges om. Et godt første steg er å markere kjernen og grensesnittene i det systemet som finnes. Resten er åpen sone.

Kartet trenger ikke være perfekt. Det må bare finnes, slik at både agent og gjennomgang vet hvilken sone en endring havner i. Hvem som godkjenner hva, er et annet lag, beskrevet i [seks prinsipper for agentisk utvikling](/blogg/agentisk-utvikling-seks-prinsipper). Dette er et arbeid på idéstadiet, men regelen er enkel: tegn grensene først, så holder endringene seg små.

[Hvordan kan kodebasen gjøres klar for KI-agenter? Ta kontakt med Xala.](/kontakt)
