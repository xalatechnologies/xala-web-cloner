---
slug: nar-ki-agenten-tar-feil
title: "Når KI-agenten tar feil, rett beskrivelsen før koden"
seoTitle: "Feil fra KI-agenter: finn steget feilen kom inn"
description: "Når en KI-agent leverer feil kode, ligger feilen ofte tidligere i løpet. Finn steget den kom inn, rett beskrivelsen der, og la agenten bygge på nytt."
date: 2026-11-04
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/nar-ki-agenten-tar-feil.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: et fiskebeindiagram med fem steg fra idé til gjennomgang og en oransje pil som sporer en feil i koden tilbake til spesifikasjonen."
keywords:
  - feil fra KI-agenter
  - KI-agenter
  - rotårsak
  - spesifikasjon
  - systemutvikling
lang: no
draft: false
faq:
  - question: "Hvorfor gjør en KI-agent samme feil flere ganger?"
    answer: "Fordi den bygger fra samme beskrivelse hver gang, og feilen står fortsatt der."
  - question: "Skal man rette koden eller spesifikasjonen når en KI-agent tar feil?"
    answer: "Begge kan trenges, men spesifikasjonen må rettes for at feilen ikke skal komme tilbake."
  - question: "Hva er en rotårsak i systemutvikling?"
    answer: "Steget der feilen kom inn, ikke stedet den ble oppdaget."
  - question: "Kan kodegjennomgang alene fange feil fra KI-agenter?"
    answer: "Den fanger mye, men den oppdager feil. Den forhindrer dem ikke."
  - question: "Hva bør en IT-leder spørre en leverandør som bruker KI-agenter?"
    answer: "Hvordan feil spores tilbake i løpet, og hvor rettingen skjer."
---

Et tenkt eksempel: et skjema godtar en dato i feil format. Utvikleren ber KI-agenten rette det, og rettingen er på plass etter få minutter. Uka etter bygger agenten et nytt skjema, og den samme feilen er tilbake.

Ingen gjorde noe galt i koden. Beskrivelsen sa aldri hvilket format som gjaldt. En agent som bygger på nytt fra samme beskrivelse, gjør samme feil igjen. Spørsmålet etter en feil er derfor ikke hvem som gjorde den, men hvilket steg som slapp den gjennom. Svaret finnes ved å gå bakover i løpet, ett steg om gangen.

## Gjennomgangen er stedet feilen ble oppdaget, sjelden der den oppstod

Feilen dukker opp når noen tester skjemaet. Det er lett å tro at det er her problemet hører hjemme. Men gjennomgangen fant feilen. Den laget den ikke.

En gjennomgang som bare retter det den ser, blir en evig opprydding. Det nyttige spørsmålet er et annet: hvorfor slapp dette gjennom tidligere?

## Koden gjør som regel nøyaktig det den ble bedt om

Ser man på koden, følger den instruksen. Agenten fikk ikke vite at datoen skulle ha et bestemt format, så den valgte et selv.

Å lappe koden alene løser dagens feil. Neste bygg fra den samme beskrivelsen tar den med seg tilbake. En kodeendring uten en endring lenger opp er en retting som må gjentas.

## En plan uten grensetilfeller lar feilen gå rett igjennom

Planen beskriver hva skjemaet skal gjøre når alt går som forventet. Den sier lite om tomme felt, datoer skrevet på ulike måter eller filer som er større enn vanlig.

Det er i slike kanter feil gjerne bor. Finnes ikke grensetilfellet i planen, finnes det heller ikke i koden. Mangler det, er det planen som må få en linje til.

## Spesifikasjonen er der de fleste feil kan stoppes

Spesifikasjonen sa at skjemaet skulle ta imot en dato. Den sa ikke hvilken. Et ønske som «brukervennlig dato» kan ikke sjekkes. Et krav som «datoen skrives som dag, måned, år» kan sjekkes med ja eller nei.

Krav som kan besvares med ja eller nei, gir agenten noe å bygge mot og gjennomgangen noe å sjekke mot. Det bygger på tanken om at hvert steg etterlater noe som kan leses, beskrevet i [Når agenten skriver koden](/blogg/nar-agenten-skriver-koden). Rettes kravet her, rettes alle senere bygg samtidig.

## Noen feil sitter i selve idéen

Av og til er beskrivelsen presis, planen grundig og koden riktig, og resultatet er likevel feil. Oppgaven var formulert feil fra starten. Kanskje trengte ikke brukerne et nytt skjema i det hele tatt.

Da hjelper ingen kodeendring. Det som må rettes, er spørsmålet løpet startet med. Det er det dyreste stedet å finne en feil, og det viktigste.

## Rett der feilen kom inn, så forsvinner den fra neste kjøring

Når beskrivelsen rettes, blir neste kjøring riktig av seg selv. Det er fordelen med et løp som kan gjentas: en retting oppstrøms virker hver gang løpet kjøres. Tanken er beskrevet i [AI-fabrikken som idé](/blogg/ai-fabrikken-som-ide).

Dette er et utviklingsarbeid på idéstadiet, ikke et ferdig system. Regelen er likevel enkel: når en KI-agent tar feil, spor feilen bakover og rett den i steget der den kom inn.

[Hvordan håndteres feil når KI-agenter er med i utviklingen? Ta kontakt med Xala.](/kontakt)
