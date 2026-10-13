---
slug: driftbarhet-lansering-er-midtveis
title: "Driftbarhet: lansering er midtveis, ikke målstreken"
description: "Driftbarhet avgjøres før lansering. Slik skiller et fagsystem planlagt for demo seg fra ett planlagt for drift: overvåking, logging og oppdateringer."
date: 2026-10-09
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/driftbarhet-lansering-er-midtveis.webp"
coverAlt: "Buebro sett fra siden på kremfarget bakgrunn. Venstre halvdel er en tynn linje merket prosjekt, høyre halvdel er fem steiner merket overvåking, logging, oppdateringer, dokumentasjon og gjenoppretting, som fortsetter mot drift. Sluttsteinen øverst er merket lansering. Overskrift «LANSERING ER MIDTVEIS»."
keywords:
  - driftbarhet
  - driftbarhet i fagsystemer
  - forvaltning av fagsystemer
  - overvåking og logging
faq:
  - question: "Hva er driftbarhet?"
    answer: "Driftbarhet er hvor godt et system lar seg drifte, overvåke, oppdatere og endre etter at det er satt i drift. Hos Xala er det et designvalg som tas før lansering, ikke noe som legges på etterpå."
  - question: "Hvorfor kalle lansering midtveis?"
    answer: "Fordi de fleste kostnadene i et fagsystems levetid kommer etter at det er satt i drift. Prosjektet er bare første del av livet til systemet."
  - question: "Hva bør være på plass før lansering?"
    answer: "Overvåking, logging og varsling. Rutiner for å oppdatere avhengigheter løpende. Dokumentasjon av arkitektur, avhengigheter og driftsrutiner som holdes oppdatert. Og en sikkerhetskopi der gjenopprettingen er testet."
  - question: "Hvorfor holder det ikke å ta sikkerhetskopi?"
    answer: "En kopi som aldri er gjenopprettet, er ikke prøvd. Dere vet ikke om den virker før dere har gjenopprettet fra den. Derfor må gjenopprettingen testes, ikke bare kopieringen."
  - question: "Kan dere drifte i Norge?"
    answer: "Ja. Vi drifter på Azure og kan legge både data og behandling i norske regioner der det er et krav i anskaffelsen."
lang: no
draft: false
---

En demo skal virke én dag. Et fagsystem skal virke hver dag i mange år.

Det som skiller de to, er driftbarhet. Og den avgjøres før lansering, ikke etter.

## To planer for samme fagsystem

Tenk dere to planer for det samme systemet. Samme krav, samme brukere, samme lanseringsdato.

I den første planen er lansering målstreken. Prosjektet er ferdig når systemet er i produksjon. Alt som handler om drift, kommer etterpå.

I den andre planen er lansering midtveis. Prosjektet bygger systemet, og samtidig bygger det det som skal til for å holde systemet i gang.

Forskjellen ser liten ut på lanseringsdagen. Den blir stor etterpå. De fleste kostnadene i et fagsystems levetid kommer etter at det er satt i drift. Likevel planlegges mange prosjekter som om lanseringen er slutten.

Resten av posten følger de to planene side om side.

## Overvåking: brukerne melder feilen, eller dere ser den først

I den første planen blir feilen kjent når noen tar kontakt. En saksbehandler får ikke lagret. En innbygger får en feilmelding. Da starter letingen, og den starter på etterskudd.

I den andre planen vet dere at noe er galt før brukerne melder det. Det gjelder også når feilen ligger hos en tredjepart som systemet er avhengig av. Et fagsystem henter og sender data til andre tjenester. Når en av dem svikter, skal det synes hos dere først.

Det krever at overvåkingen er tenkt inn i hvordan systemet er bygd. Den er vanskelig å skru på i ettertid.

## Logging lagt på i etterkant er logging der det er dyrest

I den første planen kommer loggingen etter lansering. Ofte etter den første feilen som ingen klarte å forklare. Da skal den inn i kode som allerede er i bruk, og det som skjedde før, er borte.

I den andre planen er logging og varsling med fra start. Hver del av systemet sier fra om hva den gjør. Når noe går galt, finnes sporene allerede.

Det er samme arbeid i begge planene. Forskjellen er når det gjøres. Etterpå er stedet der det er dyrest.

## Oppdateringer kommer løpende, ikke når noe har skjedd

I den første planen oppdateres avhengighetene når det har oppstått et problem. Et sikkerhetsvarsel. En tjeneste som ikke lenger er støttet. Da er det mange versjoner å ta igjen på en gang, under tidspress.

I den andre planen oppdateres avhengighetene løpende. Små steg, ofte, mens det er rolig. Hvert steg er lite nok til å forstå.

Hvor mye denne jobben koster over tid, avhenger også av valgene som ble gjort tidlig. Vi har skrevet om [hvorfor antall avhengigheter er en langtidskostnad](https://xala.no/blogg/teknologivalg-for-fagsystemer-som-skal-vare).

## Dokumentasjonen følger systemet, ikke prosjektslutt

I den første planen skrives dokumentasjonen når prosjektet avsluttes. Så blir den stående. Systemet endrer seg, men dokumentet gjør det ikke. Etter en stund beskriver det et system som ikke finnes lenger.

I den andre planen oppdateres arkitektur, avhengigheter og driftsrutiner når systemet endres. Dokumentasjonen er en del av endringen, ikke et eget prosjekt.

Det er forskjellen på et dokument som ble levert og et dokument som brukes.

## En sikkerhetskopi er først verdt noe når gjenopprettingen er testet

I den første planen tas det sikkerhetskopi. Det står i planen, og det skjer. Men ingen har prøvd å hente noe tilbake.

I den andre planen testes også gjenopprettingen. Dere vet at kopien kan brukes, og dere vet hva som må gjøres når den skal brukes.

En kopi som aldri er gjenopprettet, er en antakelse. Den dagen den trengs, er en dårlig dag å finne det ut.

## Regelverket endres etter lansering, og systemet må følge med

I den første planen blir hver regelverksendring et nytt prosjekt. Noen må sette seg inn i koden på nytt. Ingen tør å endre mye, fordi ingen vet hva som henger sammen.

I den andre planen er videreutvikling en del av driften. Et fagsystem endres i hele sin levetid. Regelverk endres, integrasjoner endres, folk slutter. Det er lettere å følge med når teamet allerede kjenner koden.

Det hjelper også å ha [tester som gjør at endringer kan gjøres trygt](https://xala.no/blogg/testautomatisering-for-fagsystemer).

## Driftbarhet bestemmes før lanseringsdagen

Gå tilbake til de to planene. På lanseringsdagen ser systemene like ut. Begge virker. Begge er i produksjon.

Forskjellen ligger i alt som skjer etterpå. Den ene planen må bygge overvåking, logging, oppdateringsrutiner og dokumentasjon i et system som allerede er i bruk. Den andre har det på plass.

Derfor er driftbarhet et designvalg hos oss. Vi tar det tidlig, fordi det er da det er billigst. Og fordi vi blir værende etter lansering. Hendelser i drift er heller ikke like, og [ulike hendelser trenger ulik responstid](https://xala.no/blogg/responstid-per-hendelsestype).

Lansering er ikke målstreken. Den er midtveis.

[Se hva Xala gjør etter lansering, i forvaltning og drift av fagsystemer](https://xala.no/tjenester/forvaltning-og-drift).
