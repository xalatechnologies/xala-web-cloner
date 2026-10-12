---
slug: fagsystem-uten-api
title: "Fagsystem uten API: hvordan kobler du det likevel?"
description: "Har fagsystemet ikke et API, finnes det som regel en database, en fil eller en eksportjobb. Slik velger du vei, steg for steg, med hvis og så."
date: 2026-10-12
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/fagsystem-uten-api.webp"
coverAlt: "Infografikk: sporveksel ovenfra på kremfarget bakgrunn, sporet fagsystem deler seg i API, database, fil og eksportjobb, som møtes i stasjonen fasade og går ut gjennom tunnelen meldingskø. Overskrift «FINNES IKKE API? FINN SPORET»."
keywords:
  - integrasjon uten API
  - integrasjon
  - API
  - meldingskø
  - arkitektur
hashtags:
  - integrasjon
  - API
  - meldingskø
  - arkitektur
lang: no
draft: false
faq:
  - question: "Kan vi koble mot et fagsystem som ikke har API?"
    answer: "Som regel ja. Det finnes nesten alltid en database, en filutveksling eller en eksportjobb å bygge på."
  - question: "Må vi vente på at leverandøren lager et API?"
    answer: "Nei. En fasade foran det gamle systemet kan gi dere et grensesnitt uten å vente."
  - question: "Når passer en meldingskø?"
    answer: "Når utvekslingen ikke må skje samtidig. Køen lar systemene utveksle data asynkront."
  - question: "Hva skjer hvis det andre systemet er nede?"
    answer: "Der saken kan gå videre uten oppslaget, går den videre og merkes som ufullstendig. Brukeren får en melding som sier hva som skjedde."
  - question: "Hva bør vi dokumentere?"
    answer: "Hvilke tjenester løsningen kaller, med hvilke scopes, mot hvilke avtaler, og hvem som eier dem."
---

Hva gjør dere når systemet dere skal koble mot, ikke har et API? Som regel finnes det likevel en vei inn, og hvilken vei det blir, avhenger av hvor dataene faktisk ligger.

Det er derfor denne teksten er bygd som en rekke valg. Hver del starter med en situasjon dere kan kjenne igjen, og ender med hva vi ville gjort i den situasjonen. Ta dem i rekkefølge, for svaret på det første spørsmålet avgjør hvilke av de neste som gjelder.

## Hvis du ikke vet hvor dataene går, så følg dem først

Da er første jobb å følge dataene, ikke å velge teknologi. Hvor kommer de inn, hvor går de ut, og hvem oppdager det hvis de stopper?

Det siste spørsmålet er det som oftest mangler svar. Mange integrasjoner fungerer helt til den dagen de ikke gjør det, og da viser det seg at ingen eier ansvaret for å merke det. Når dere vet hvor dataene kommer fra og hvem som følger med, vet dere også hvilket grensesnitt dere faktisk har å jobbe med. Alt annet i denne teksten bygger på det svaret.

## Hvis systemet har et API, så bruk det bak tilgangsstyring

Da er saken enkel: bruk det. Men legg kallene bak en API-gateway med tilgangsstyring, slik at det er tydelig hvem som får kalle hva.

Gatewayen gir dere ett sted å styre tilgang og ett sted å se trafikken, i stedet for at hver løsning snakker direkte med fagsystemet på egen hånd. Mange av de vanlige misforståelsene om integrasjon starter med antagelsen om at et API løser alt. Vi har skrevet om noen av dem i [fem myter om systemintegrasjon i kommunen](https://xala.no/blogg/systemintegrasjon-i-kommunen-myter-og-fakta).

## Hvis det ikke finnes et API, så se etter databasen, filen eller eksportjobben

Da finnes det som regel en database, en filutveksling eller en eksportjobb. Det er der dere starter.

I stedet for å vente på at leverandøren lager et API, kan dere bygge en fasade foran det gamle systemet. Fasaden er et integrasjonslag: den henter fra databasen, leser filen eller plukker opp eksporten, og tilbyr et ryddig grensesnitt utad. Resten av løsningen trenger ikke vite hvordan dataene faktisk kommer ut av fagsystemet. Hvilken av de tre veiene som passer best, avhenger av systemet dere står foran, og det er noe dere finner ut når dere har fulgt dataene.

## Hvis mottakeren ikke må svare med en gang, så legg en meldingskø imellom

Da passer en meldingskø for asynkron utveksling. Systemet som sender, legger meldingen i køen, og mottakeren henter den når den er klar.

Det betyr at de to systemene ikke må være tilgjengelige samtidig. Et fagsystem som bare leverer data via en nattlig eksport, og en løsning som vil ha data når brukeren trykker, kan leve side om side med en kø imellom. Spørsmålet å stille er om svaret må komme mens brukeren venter. Hvis ikke, er køen ofte den roligste veien.

## Hvis kallet kan feile, så bestem retry, timeout og fallback per tjeneste

Da må dere bestemme retry, timeout og fallback for hver tjeneste, ikke én felles regel for alt. Legg også på overvåking og varsling ved nedetid hos tredjepart.

Ulike systemer feiler på ulike måter, og en regel som passer det ene, kan gi kø eller hengende kall mot det andre. Det samme gjelder når dere kobler mot nasjonale tjenester; vi har skrevet mer om det i [integrasjoner mot nasjonale felleskomponenter](https://xala.no/blogg/integrasjoner-mot-nasjonale-felleskomponenter). Poenget her er enklere: hver avhengighet trenger sin egen plan for når den ikke svarer.

## Hvis saken kan gå videre uten oppslaget, så ikke blokker innsending

Da skal innsendingen ikke stoppe. Vi spør for hvert oppslag om saksgangen kan fortsette uten det, og hva brukeren ser.

Data kan ofte hentes senere, og saken merkes som ufullstendig. Det som ikke fungerer, er en feilmelding som bare sier «teknisk feil». Den gir telefoner. En melding som sier hva som skjedde, og at søknaden er lagret, gjør det ikke. Når to systemer ikke snakker sammen, ender saksbehandleren ofte med å sy sammen bildet selv, som vi beskrev i [To faner er ikke én sak](https://xala.no/blogg/public-360-og-fagsystem-snakker-ikke).

## Hvis du har valgt vei, så skriv ned avhengigheten

Da er siste steg å skrive ned hva dere har koblet: hvilke tjenester som kalles, med hvilke scopes, mot hvilke avtaler, og hvem som eier dem.

Få prosjekter har en samlet oversikt over hvilke eksterne tjenester løsningen kaller. Det er likevel det første noen spør etter ved en sikkerhetsgjennomgang. En integrasjon mot et system uten API er ikke ferdig når dataene flyter. Den er ferdig når neste person kan se hva som er koblet, og hvem som eier det.

[Se hvordan vi bygger integrasjoner mot fagsystemer](https://xala.no/tjenester/systemintegrasjon)
