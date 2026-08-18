---
slug: redusert-foreldrebetaling-dokumentasjon-fra-foresatte
title: "Redusert foreldrebetaling: når foresatte fortsatt må legge ved dokumentasjon"
seoTitle: "Redusert foreldrebetaling: dokumentasjon"
description: "Hvis kommunen ikke henter inntekt selv, må foresatte legge ved dokumentasjon. § 3e lar kommunen hente skatt. Mange har tilgang, men ber likevel om vedlegg."
date: 2026-08-06
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
readingMinutes: 4
tag: "IT-leder"
cover: "/images/blog/redusert-foreldrebetaling-dokumentasjon-fra-foresatte.webp"
keywords: ["redusert foreldrebetaling", "foreldrebetaling", "skatteetaten", "ks digital", "saksbehandling", "offentlig sektor"]
lang: no
draft: false
---

## Kort svar

Hvis kommunen ikke henter inntekt selv, må foresatte legge ved dokumentasjon. [Forskriften § 3e](https://lovdata.no/dokument/SF/forskrift/2005-12-16-1478/%C2%A73e) lar kommunen hente skatt direkte. [KS Digital](https://ksdigital.no/tjenestene/segmentsamarbeid/redusert-foreldrebetaling/): over 300 kommuner har digital tilgang i 2026, men mange ber fortsatt familien om vedlegg. Xala bygger integrasjonen mot Skatteetaten eller Fiks. Xala driver ikke portalen.

Det konkrete grepet er å hente skatt først. Be om skattemelding bare når Skatteetaten ikke kan utlevere, og vedtaket ellers ikke rekker 1. august. Det er det § 3e faktisk sier. Det er også [dataminimering](https://www.digdir.no/datadeling/vurdere-tilgang-til-data/2254): ikke samle inn det kommunen allerede kan hente. [Prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) sier det samme: gjenbruk data fra autoritative kilder, slik at foresatte ikke må oppgi det det offentlige allerede vet. [Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er neste steg: bruk Fiks eller Skatteetatens deling der de er egnet, i stedet for å samle inn vedlegg på nytt.

## Hva § 3e faktisk sier

Kommunen skal innhente det den trenger for å behandle søknaden. Den kan, uten hinder av taushetsplikt, hente grunnlaget for siste fastsetting av formues- og inntektsskatt fra skattemyndighetene.

Først da, og bare hvis opplysningene ikke kan utleveres og kommunen av den grunn ikke rekker vedtak før 1. august, skal den be søker levere siste års skattemelding. Merknaden til § 3e åpner for annen dokumentasjon når husholdningen ikke har skatteopplysninger, typisk ved kort botid.

Rekkefølgen er altså hent, så spør. Ikke spør, så hent.

## Hva KS Digital beskriver i 2026

Tidligere måtte kommunene hente opplysningene fra foresatte. Nå kan de hente dem fra Skatteetaten, via Fiks register eller et fagsystem med integrasjon.

KS Digital skiller mellom tilgang og bruk. Over 300 kommuner har digital tilgang. Ikke alle har integrasjon i fagsystemet eller bruker Fiks register. En stor andel henter derfor fortsatt opplysningene fra søker, og familiene må legge ved dokumentasjon.

Der hentingen er digital, skriver KS Digital at småbarnsforeldre slipper å dele mer personopplysninger enn nødvendig. Datasettet er avgrenset til det som trengs for vedtaket. Det er samme prinsipp Digdir peker på: samle bare inn det formålet krever.

## Hva det betyr for søker og saksbehandler

For foresatte er smerten konkret. De må finne skattemelding eller annen inntektsdokumentasjon, laste den opp, og ofte få den i retur fordi den er feil år eller feil husholdning. Det er arbeid kommunen er gitt hjemmel til å gjøre selv.

For saksbehandleren blir saken veiledning og vedleggskontroll. KS Digital sier at kommuner med digital tilgang slipper de manuelle rundene med å hente riktig dokumentasjon og veilede foreldre. Uten integrasjon blir det likevel den jobben som fyller køen, ikke selve 6 prosent-vurderingen.

Udir er tydelig på at [kommunen har ansvaret](https://www.udir.no/regelverk-og-tilsyn/barnehage/foreldrebetaling) for moderasjonsordningene, også i private barnehager. Ansvaret flyttes ikke til familien fordi fagsystemet mangler et oppslag.

## Hva som kan automatiseres, og hva som ikke kan

Seks prosent av husholdningens samlede inntekt er en [regel i § 3b](https://www.udir.no/regelverkstolkninger/barnehage/forskrift-om-foreldrebetaling-i-barnehager/-3b.-reduksjon-i-foreldrebetalingen-ved-lav-inntekt). Når inntekten ligger i siste fastsetting, kan beregningen kjøres uten at noen leser et vedlegg.

Det som blir igjen hos saksbehandleren, er det forskriften ikke kan utlede alene: kort botid uten skatteopplysninger, og skjønn som krever mer enn registeret. KS Digital sier det samme. Automatisering av hentingen fjerner dokumentasjonsrunden. Den fjerner ikke vedtaket.

Xala bygger integrasjonen mot Skatteetaten eller Fiks, slik at fagsystemet kan hente det § 3e åpner for. Xala eier ikke en kommunal søknadsportal, og vi kjører den ikke.

## Ofte stilte spørsmål

### Må foresatte legge ved dokumentasjon for redusert foreldrebetaling?

Bare når kommunen ikke får utlevert skatteopplysningene, eller når husholdningen ikke har slike opplysninger. Kommunen skal først innhente det den trenger selv, jf. § 3e. At søknadsskjemaet fortsatt ber om vedlegg, betyr ikke at loven krever det.

### Kan kommunen hente skatt uten at familien laster opp skattemelding?

Ja. § 3e gir kommunen hjemmel til å hente siste fastsetting fra skattemyndighetene uten hinder av taushetsplikt. KS Digital beskriver tilgangen via Fiks eller fagsystem. Tilgang alene er ikke nok. Oppslaget må faktisk brukes før noen ber om vedlegg.

### Hva er 6 prosent-regelen?

Kommunen skal gi reduksjon slik at foreldrebetalingen per barn utgjør maksimalt seks prosent av husholdningens samlede inntekter, når maksprisen ellers blir høyere. Det står i § 3b. Kommunen har ansvaret, også for barn i private barnehager.

### Hva gjør Xala her?

Vi bygger integrasjonen mot Skatteetaten eller Fiks, slik at kommunen kan hente det den allerede har hjemmel til. Vi driver ikke søknadsportalen, og vi eier ikke Altinn, Digisos eller Startskudd.

## Relaterte artikler

- [Automatisering av saksbehandling: hva som kan automatiseres, og hva som må bli hos saksbehandleren](/blogg/automatisering-av-saksbehandling-hva-boer-og-ikke). Skillet mellom regelstyrte steg og skjønn er det samme her.

Kartlegging av om fagsystemet faktisk henter skatt før det ber om vedlegg, er det første steget. Det tar vi i [kontakt](/kontakt).
