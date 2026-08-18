---
slug: redusert-foreldrebetaling-uten-fagsystemintegrasjon
title: "Redusert foreldrebetaling uten fagsystemintegrasjon: tilgang er ikke det samme som oppslag i saken"
seoTitle: "Redusert foreldrebetaling: uten fagsystemintegrasjon"
description: "Kommunen kan ha digital tilgang til skatt uten at inntekten ligger i fagsystemet. Da blir oppslaget manuelt. Xala er integrasjonslaget, ikke Fiks."
date: 2026-08-10
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
readingMinutes: 3
tag: "IT-leder"
cover: "/images/blog/redusert-foreldrebetaling-uten-fagsystemintegrasjon.webp"
keywords: ["redusert foreldrebetaling", "foreldrebetaling", "skatteetaten", "ks digital", "saksbehandling", "offentlig sektor"]
lang: no
draft: false
---

Klokken er 21:40. Fagsystemet har saken, men ikke inntektsfeltet. Skatten ligger i en Fiks-fane i en annen nettleser. I saken ligger et vedlegg som ikke skulle vært der, fordi skjemaet fortsatt ber om det.

Det er ikke et hjemmelsproblem. Det er et integrasjonsproblem.

## Tilgang er ikke oppslag i saken

[KS Digital](https://ksdigital.no/tjenestene/segmentsamarbeid/redusert-foreldrebetaling/) skriver at 302 kommuner har digital tilgang til skatteopplysningene for redusert foreldrebetaling.

Samme side er tydelig på det neste: tilgang betyr ikke at kommunen har lagt til rette for å ta imot og bruke opplysningene. Saksbehandler trenger et digitalt grensesnitt. KS Digital lister tre: fagsystem hos leverandør, Fiks skatte- og inntektsopplysninger, eller en løsning kommunen lager selv. Uten ett av dem blir oppslaget manuelt, selv om API-et er åpent.

Xala er integrasjonslaget mellom Skatteetaten eller Fiks og fagsystemet dere allerede har. Xala er ikke Fiks. Xala er ikke fagsystemet. Xala driver ikke søknadsportalen.

## Ett oppslag inn i saken, ikke et nytt skjema

Det som kan automatiseres først, er å legge inntekten der saksbehandleren allerede jobber. Ett oppslag mot Fiks eller leverandørens Skatteetaten-integrasjon, skrevet inn i saken. Ikke et nytt søknadsskjema, og ikke en ny runde der familien laster opp det kommunen allerede kan hente. [Prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) er kun én gang: familien skal ikke laste opp det kommunen allerede kan slå opp. [Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å bruke fellesløsningen: ikke bygg et kommunalt inntektsregister eller en ny portal. Koble Fiks eller Skatteetaten inn i fagsystemet dere allerede har.

Det som ikke skal automatiseres, er å behandle «vi har fått tilgang» som «vi bruker tilgangen». KS Digital skiller de to. En bekreftelse på API-tilgang uten felt i fagsystemet er fortsatt nattarbeid i to vinduer.

## Kommunen er behandlingsansvarlig

KS Digital: kommunen er behandlingsansvarlig og skal ha databehandleravtale med leverandøren når fagsystemet henter på vegne av kommunen. Kommunen svarer for at vedtaket bruker riktige opplysninger.

Det dataminimerte grepet i saksnotatet er like konkret. Logg hvem som slo opp, når, og at oppslaget gikk mot det avgrensede settet KS Digital beskriver. Ikke lim inn hele skattemeldingen. Digdir kaller det [dataminimering](https://www.digdir.no/datadeling/vurdere-tilgang-til-data/2254): samle og vis bare det formålet krever.

Varsling om nytt oppgjør hjelper bare hvis noen faktisk slår opp. KS Digital sier at saksbehandler likevel må gjøre oppslaget for å se endringen. Mangler funksjonen i fagsystemet, er det et leverandørkrav, ikke et nytt skjema til foresatte.

## Hva det betyr for søker og saksbehandler

Saksbehandleren får en sak uten inntekt i bildet, og må hoppe til Fiks eller be om vedlegg. Det er manuell kontroll av noe som allerede kan ligge i saken.

Søkeren merker det som et skjema som fortsatt ber om dokumentasjon, selv om kommunen «har tilgang». Familien gjør jobben fordi grensesnittet mangler, ikke fordi hjemmelen mangler.

## Ofte stilte spørsmål

### Hva betyr det at kommunen har digital tilgang, men ikke fagsystemintegrasjon?

At API-et er åpnet, men inntekten ikke kommer inn i saken. Saksbehandler må da slå opp et annet sted, eller be foresatte legge ved dokumentasjon. KS Digital skiller tilgang fra integrasjon i fagsystemet eller bruk av Fiks register.

### Må vi bytte fagsystem for å bruke skatteopplysningene?

Nei. KS Digital lister fagsystem, Fiks, eller egen løsning som digitalt grensesnitt. Jobben er å få oppslaget inn i den saken saksbehandleren allerede har, ikke å lage en ny portal.

### Hva skal logges når noen slår opp inntekt?

Hvem, når, og at oppslaget gikk mot det dataminimerte settet. Kommunen er behandlingsansvarlig. Lim ikke hele skattemeldingen inn i saksnotatet.

### Hva gjør Xala, og hva gjør vi ikke?

Vi bygger integrasjonslaget mot Skatteetaten eller Fiks, inn i fagsystemet. Vi er ikke Fiks, vi er ikke fagsystemleverandøren, og vi eier ikke en kommunal søknadsportal.

Kartlegging av om inntekten faktisk ligger i saken, eller bare i en tilgangsavtale, er det første steget. Det tar vi når dere tar [kontakt](/kontakt).
