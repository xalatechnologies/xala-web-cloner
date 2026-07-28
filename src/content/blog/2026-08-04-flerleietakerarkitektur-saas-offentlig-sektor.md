---
slug: flerleietakerarkitektur-saas-offentlig-sektor
title: "Flerleietaker eller egen installasjon: valget som avgjør driftskostnaden"
description: "Skal hver kunde ha sin egen installasjon, eller skal alle dele én? Valget tas tidlig, og det er dyrt å snu."
date: 2026-08-04
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/flerleietakerarkitektur-saas-offentlig-sektor.webp"
keywords: ["flerleietaker", "multi-tenant", "SaaS offentlig sektor", "driftskostnad", "programvarearkitektur"]
lang: no
draft: false
---

Når en løsning skal brukes av flere kommuner, flere etater eller flere virksomheter, kommer spørsmålet tidlig: skal hver kunde ha sin egen installasjon, eller skal alle dele én?

Svaret virker teknisk. Konsekvensene er økonomiske, og de kommer først etter at de tre første kundene er på plass.

## Én installasjon per kunde er enkelt i starten

Den første kunden får sin egen database, sin egen konfigurasjon og sin egen utrulling. Det er lett å forstå, lett å teste og lett å selge inn. Ingen risikerer å se andres data, fordi det ikke finnes noen andre i den installasjonen.

Problemet kommer med kunde nummer fem. En sikkerhetsoppdatering skal nå rulles ut fem ganger. Fem miljøer skal overvåkes. Og når kunde to har en spesialtilpasning kunde fire ikke har, er kodebasene i praksis ikke lenger den samme.

## Flerleietaker er dyrere først og billigere etterpå

I en flerleietakerplattform deler alle kundene kodebase, drift og overvåking, men ikke data. En sikkerhetsfiks rulles ut én gang. Overvåkingen er ett sted. Ny funksjonalitet blir tilgjengelig for alle samtidig.

Kostnaden ligger foran: datamodellen må skille kundene fra første rad, tilgangsstyringen må vite hvilken leietaker en forespørsel gjelder, og alt som er forskjellig mellom kunder må være konfigurasjon i stedet for kode.

## Isolasjon må være i datamodellen, ikke i spørringene

Det vanligste feilgrepet er å legge til en `tenant_id`-kolonne og huske å filtrere på den. Det holder helt til noen glemmer det én gang.

Isolasjonen bør ligge et sted der den ikke kan glemmes: egen database per leietaker, eget skjema, eller radnivåsikkerhet som databasen håndhever. Forskjellen er mellom en feil som gir tom skjerm og en feil som viser en kommune en annen kommunes saker.

## Konfigurasjon som data, ikke som kode

Priser, roller, skjemaer, frister og regler er forskjellige per kunde. Ligger de i koden, blir hver ny kunde et utviklingsprosjekt, og hver endring en utrulling.

Ligger de som data, kan en ny kunde settes opp av dere selv, på en ettermiddag. Det er den forskjellen som avgjør om plattformen skalerer eller om den bare vokser.

## Onboarding er testen

Still ett spørsmål når arkitekturen skal vurderes: kan dere sette opp en ny kunde uten å involvere en utvikler?

Er svaret ja, har dere en plattform. Er svaret «vi må lage det først», har dere et produkt som selges én gang om gangen, uansett hva det kalles i markedsføringen.

## Ofte stilte spørsmål

### Kan en eksisterende løsning gjøres om til flerleietaker?

Ofte, men det er en reell omskriving av datamodellen og tilgangsstyringen, ikke en konfigurasjonsendring. Vi kartlegger hvor kundedata skilles i dag, og hva som må endres, før vi anbefaler det. Noen ganger er svaret at en ny plattform ved siden av er billigere enn å bygge om den gamle.

### Er flerleietaker forsvarlig når kundene er kommuner?

Ja, det er den vanligste modellen for kommunale fagsystemer i dag. Kravet er at isolasjonen håndheves av databasen eller plattformen, ikke av at utviklerne husker å filtrere, og at dere kan dokumentere det i en anskaffelse eller en revisjon.

### Hvordan håndteres kunder som vil ha noe helt eget?

Ved å skille mellom konfigurasjon og særkode. Konfigurasjon hører hjemme i plattformen. Særkode som bare én kunde bruker, bør ligge som en utvidelse med et definert grensesnitt, ellers blir den til teknisk gjeld alle andre kunder betaler for.

### Kan plattformen driftes i norske regioner?

Ja. Vi drifter på Azure og kan legge både data og behandling i norske regioner der anskaffelsen krever det, med dokumentasjon av hvor data ligger og hvem som har tilgang.
