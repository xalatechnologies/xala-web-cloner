---
slug: revisjonsspor-i-fagsystemet
title: "Revisjonsspor i fagsystemet: det ledelsen spør om"
description: "Hvem så saken, hvem endret den, og kan vi bevise det? Svar på de vanligste spørsmålene ledelsen stiller IT-lederen om revisjonsspor i fagsystemet."
date: 2026-10-15
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/revisjonsspor-i-fagsystemet.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: en kvitteringsrull ruller ut av en kasseskuff med linjene åpnet, endret, vedtak og klage. Linjen vedtak er markert i oransje under en lupe med teksten hvem, når, hvorfor. Overskrift «KVITTERINGEN NOEN BER OM»."
keywords:
  - revisjonsspor
  - sporbarhet
  - tilgangsstyring
  - personvern
  - fagsystem
hashtags:
  - revisjonsspor
  - sporbarhet
  - tilgangsstyring
  - personvern
lang: no
draft: false
faq:
  - question: "Hva er et revisjonsspor?"
    answer: "En logg som viser hvem som gjorde hva i systemet, og når det skjedde, slik at hendelsen kan etterprøves."
  - question: "Logger systemet også lesing, ikke bare endringer?"
    answer: "Det bør det gjøre der saken inneholder personopplysninger, og det må avklares når systemet bygges."
  - question: "Hvem bør ha tilgang til loggen?"
    answer: "Noen få roller med et tjenstlig behov, og aldri bare de som selv blir logget."
  - question: "Hvor lenge skal loggen lagres?"
    answer: "Det er en avklaring virksomheten selv må gjøre, sammen med personvernombudet."
  - question: "Hjelper revisjonssporet ved en klage?"
    answer: "Ja, det viser hvem som behandlet saken og på hvilket grunnlag."
---

Et revisjonsspor er som kvitteringsrullen i et kassaapparat: ingen leser den mens alt stemmer, og alle vil ha den den dagen noe ikke gjør det.

Den dagen kommer gjerne som et spørsmål fra ledelsen. En kommunedirektør vil vite om noen har sett en sak de ikke skulle se. En kommunalsjef vil vite hvem som endret et vedtak. Et personvernombud vil vite om oppslag kan etterprøves. Under har vi samlet spørsmålene IT-lederen oftest får, med et kort svar først og deretter hva du bør kunne vise fram.

## Kan vi se hvem som har åpnet en sak?

Kort svar: bare hvis systemet logger lesing, ikke bare endringer. Mange systemer registrerer når noe lagres, men ikke når noen blar gjennom en sak.

Det du bør kunne vise fram, er et oppslag i loggen for én konkret sak: hvilke brukere som har åpnet den, og når. Gjelder saken personopplysninger, er det nettopp lesingen ledelsen spør om. Kan du ikke svare, vet du at dette må avklares før neste anskaffelse eller videreutvikling.

## Kan vi se hva som ble endret, og hvem som gjorde det?

Kort svar: det bør du kunne, for hvert felt som betyr noe for vedtaket. Det holder ikke å vite at saken ble endret. Ledelsen vil vite hva som sto der før, hva som står der nå, og hvem som gjorde endringen.

Det du bør kunne vise fram, er historikken for en sak fra mottak til vedtak. Sporet skal kunne vise hvilket grunnlag som lå der da vedtaket ble fattet. Selve begrunnelsen hører hjemme i vedtaket, og det har vi skrevet om i [Vedtaket skal si hvorfor](/blogg/automatisert-vedtak-forklaring-og-manuell-kontroll).

Ved en klage etter forvaltningsloven av 1967 er det dette sporet som viser hvordan saken faktisk ble behandlet. Det er det første noen spør om, og det kan ikke rekonstrueres i ettertid.

## Er revisjonssporet det samme som arkivet?

Kort svar: nei. Arkivet tar vare på dokumentene og saken som helhet. Revisjonssporet viser hva som skjedde med saken i systemet, og hvem som gjorde det.

Det du bør kunne vise fram, er at begge deler finnes, og at ingen tror det ene erstatter det andre. Hvordan arkivering kan følge saksgangen, står i [Noark 5 i moderne fagsystemer](/blogg/noark-5-arkivering-i-moderne-fagsystemer).

## Hvem får lese loggen, og hvem kan endre den?

Kort svar: få skal lese den, og ingen av dem den logger skal kunne endre den. En logg som saksbehandleren selv kan redigere, beviser ingenting.

Det du bør kunne vise fram, er hvilke roller som har tilgang til loggen, og at tilgangen styres på samme måte som tilgangen til sakene. Tilgangsstyring per saksområde eller per ordning gjør det lettere å svare presist. Bruker virksomheten [ISO 27001](/blogg/iso-27001-i-praksis-for-utviklingsprosjekter), er dette en del av den samme styringen av tilganger.

## Hva sier personvernforordningen om dette?

Kort svar: at behandling av personopplysninger skal kunne etterprøves. Når noen slår opp i en sak om en innbygger, må virksomheten kunne dokumentere at oppslaget var nødvendig for å løse en oppgave.

Det du bør kunne vise fram, er at revisjonssporet dekker oppslag i personopplysninger, og at personvernombudet vet hvordan loggen brukes. Hvor lenge loggen skal ligge, er en avklaring virksomheten må gjøre selv, sammen med personvernombudet.

## Kan vi legge det inn senere hvis vi trenger det?

Kort svar: sjelden. Det er for sent å legge inn sporbarhet etterpå, fordi hendelsene som allerede har skjedd, aldri ble registrert.

Det du bør kunne vise fram, er at sporbarhet er bygd inn i datamodellen fra starten, ikke lagt på som en rapport til slutt. Står du foran en ny løsning, er det her du bør stille kravet.

[Se hvordan plattformen gir full sporbarhet og tilgangsstyring per ordning.](/tjenester/saksbehandlingsplattform)
