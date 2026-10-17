---
slug: ett-system-per-ordning-misforstaelsen
title: "Ett system per ordning er misforståelsen som koster"
description: "Mange kommuner kjøper ett system per ordning. Kostnaden ligger ikke i det første, men i det tredje. Slik ser en felles saksmodell ut for arkitekten."
date: 2026-10-17
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/ett-system-per-ordning-misforstaelsen-v3.webp"
coverAlt: "Illustrasjon i sort og gull: én felles saksramme som rommer flere adskilte ordningsceller."
keywords:
  - felles saksmodell
  - plattform
  - ordning
  - arkitektur
  - gjenbruk
hashtags:
  - plattform
  - ordning
  - arkitektur
  - gjenbruk
lang: no
draft: false
faq:
  - question: "Passer alle ordninger på én plattform?"
    answer: "De som følger mønsteret søknad, vurdering, vedtak og arkiv passer godt, for eksempel tilskudd, bevillinger og dispensasjoner. Det samme gjelder når kommunen starter et tilsyn."
  - question: "Blir ikke én plattform et stort og sårbart system?"
    answer: "Én plattform samler risikoen, men også innsatsen. En sikkerhetsfiks gjelder alle ordningene samtidig, i stedet for at hver må fikses for seg, på hver leverandørs tidsplan."
  - question: "Hva om to ordninger har helt ulike regler?"
    answer: "Regler og skjemaer er det som er forskjellig, og det bør ligge som konfigurasjon, ikke som et nytt system."
  - question: "Kan vi beholde eksisterende systemer?"
    answer: "Ja, men hver ny ordning bør vurderes mot den felles modellen før dere kjøper et nytt system."
  - question: "Hvor bør vi begynne?"
    answer: "Med én ordning, tegnet slik at den neste kan bruke samme modell."
---

Det er tredje gang i år en avdeling kommer til deg med et nytt system som skal kobles til arkivet. Ny ordning, nytt regelverk, nytt system. Hver gang høres det ryddig ut, og hver gang ender kommunen med enda en kobling som må forvaltes.

Misforståelsen er at hver ordning er så ulik de andre at den trenger sitt eget system. Den er lett å tro på, og den koster lite den første gangen. Regningen kommer senere, og den havner hos arkitekten.

## Hvorfor det virker riktig å kjøpe ett system per ordning

Fra innsiden ser hver ordning unik ut. Tilskudd til kultur har andre kriterier enn skjenkebevillinger, og en dispensasjon etter plan- og bygningsloven vurderes av andre fagfolk enn når kommunen fører tilsyn. Hver avdeling har sitt eget regelverk, sine egne skjemaer og sitt eget språk.

Kjøpene skjer dessuten til ulik tid. Én avdeling får et behov og et budsjett, finner et system som passer akkurat deres ordning, og tar det i bruk. Ingen gjør noe galt. Det er summen av mange fornuftige enkeltbeslutninger som blir dyr.

## Det tredje systemet er der kostnaden ligger

Det første systemet koster det det koster. Det andre ser også overkommelig ut. Men hvert system må kobles mot arkivet, mot innlogging og mot registrene, og hver av disse koblingene må forvaltes for seg. Kostnaden ligger ikke i det første systemet, den ligger i det tredje.

Det betyr at flere ting vokser samtidig. Saksbehandleren må lære flere arbeidsflater. Rapportering på tvers av ordninger blir et eget prosjekt, fordi dataene ligger i ulike modeller. Og når en sårbarhet må tettes, må den tettes i hvert system, på hver leverandørs tidsplan.

## Hva som faktisk er forskjellig fra ordning til ordning

Når du ser nøye etter, er forskjellene mellom ordninger konsentrert på noen få steder:

- **Reglene.** Hvem kan søke, hva som kreves, og hva som utløser avslag.
- **Skjemaene.** Hvilke opplysninger søkeren må gi, og hvilke vedlegg som skal med.
- **Vurderingskriteriene.** Hva saksbehandleren skal legge vekt på, og hvordan det dokumenteres.
- **Hvem som vurderer.** Hvilken avdeling, hvilke roller og hvem som fatter vedtaket.

Alt dette endres når regelverket endres. Derfor hører det hjemme som konfigurasjon, ikke som kode i et eget system. Nytt regelverk bør gi nytt skjema og nye regler, ikke et nytt system. Hvordan det ser ut når pågangen topper seg, har vi skrevet om i [Skalerbarhet betyr at fristdagen ikke blir et prosjekt](/blogg/skalerbarhet-males-pa-fristdagen).

## Hva som er likt: søknad, vurdering, vedtak og arkiv

Under forskjellene ligger et mønster som går igjen: noen søker, noen vurderer, noen fatter et vedtak, og alt skal arkiveres. Det mønsteret har de samme byggesteinene uansett ordning:

- **Saken** med sin identitet, status og historikk.
- **Partene**, altså søkeren og eventuelle andre som berøres.
- **Dokumentene** som kommer inn og går ut.
- **Fristene** som saken må forholde seg til.
- **Vedtaket**, med begrunnelse, hjemmel og opplysning om klageadgang. Dette er krav i forvaltningsloven, og kravene gjelder likt for alle ordningene.
- **Arkivet**, der alt skal ende.

Dette er ikke konfigurasjon. Det er selve modellen, og den trenger bare å finnes én gang.

## Slik tegner arkitekten en felles saksmodell

Tegningen trenger ikke starte med teknologi. Den starter med begreper.

Tegn én sakstype som bærer det som er felles: parter, dokumenter, frister, vedtak og historikk. Det som er spesifikt for en ordning, som feltene i skjemaet og vurderingskriteriene, legges som data knyttet til saken, ikke som en ny tabell eller et nytt system.

Tegn roller og tilgang som felles begreper, men gi tilgangen per ordning. Saksbehandleren for kulturtilskudd skal ikke se skjenkesakene, men begge skal jobbe i samme kø, med samme søk og samme historikk.

Tegn vedtaksmalene felles, slik at begrunnelse, hjemmel og klageadgang håndteres likt på tvers. Og tegn ett sett koblinger mot arkiv, innlogging og registre, som alle ordningene bruker. Det er der gjenbruken faktisk sparer arbeid. Prinsippene bak dette finner du i [Arkitekturprinsipper](/produkter/arkitekturprinsipper).

## Start med én ordning, men tegn for den neste

Du trenger ikke flytte alt på en gang. Vi anbefaler tvert imot å starte med én ordning. Den første ordningen betaler for plattformen, og den neste koster en brøkdel, fordi koblingene allerede står.

Forutsetningen er at den første ordningen tegnes som den første av flere, ikke som et eget system med en plattform rundt. Still derfor ett spørsmål ved hver beslutning: ville den neste ordningen kunne bruke dette som det er? Hvis svaret er nei, er det et tegn på at noe ordningsspesifikt har sneket seg inn i den felles modellen.

Eksisterende systemer kan få leve videre. Men hver ny ordning bør vurderes mot den felles modellen før kommunen kjøper et nytt system.

[Se hvordan plattformen lar flere ordninger dele én saksmodell.](/tjenester/saksbehandlingsplattform)
