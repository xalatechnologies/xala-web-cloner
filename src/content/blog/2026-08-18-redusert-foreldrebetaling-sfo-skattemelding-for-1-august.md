---
slug: redusert-foreldrebetaling-sfo-skattemelding-for-1-august
title: "Redusert foreldrebetaling i SFO: når skattemeldingen må inn før 1. august"
seoTitle: "Redusert foreldrebetaling i SFO: før 1. august"
description: "Rekker ikke skatteoppgjøret, skal kommunen be om skattemeldingen før 1. august. Integrasjon henter oppgjør når det finnes. Den sletter ikke unntaket."
date: 2026-08-18
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
readingMinutes: 3
tag: "IT-leder"
cover: "/images/blog/redusert-foreldrebetaling-sfo-skattemelding-for-1-august.webp"
keywords: ["redusert foreldrebetaling", "foreldrebetaling", "SFO", "skattemelding", "skatteetaten", "offentlig sektor"]
lang: no
draft: false
---

Første sjekk er om skatteoppgjøret finnes. Rekker det ikke, skal kommunen be om skattemeldingen før 1. august. Integrasjon henter oppgjøret når det finnes. Den sletter ikke unntaket.

Det står i [Opplæringsforskriften § 2-5](https://lovdata.no/dokument/SF/forskrift/2024-06-03-900/%C2%A72-5). Det gjelder SFO.

## Hva § 2-5 faktisk sier

Kommunen kan, uten hinder av taushetsplikt, hente grunnlaget for siste fastsetting av formues- og inntektsskatt for husholdningen fra skattemyndighetene. [Udir](https://www.udir.no/regelverkstolkninger/opplaring/forskrift-om-grunnskoleopplaringa-og-den-vidaregaande-opplaringa-opplaringsforskrifta/forste-delen--grunnskoleopplaring/kapittel-2-leksehjelp-og-skolefritidsordning/-2-5-behandling-av-soknader-om-redusert-foreldrebetaling-for-skolefritidsordninga/) sier det samme: kommunen kan hente opplysningene, i stedet for at foresatte må levere dem selv.

Først da, og bare hvis skattemyndighetene ikke kan utlevere grunnlaget og kommunen av den grunn ikke rekker vedtak før 1. august, skal den be søker levere siste års skattemelding og opplysninger om skattepliktige inntekter som ikke er forhåndsutfylt.

Rekkefølgen er hent oppgjøret, så spør. Ikke spør, så hent.

## Skattemelding er ikke oppgjør

Skattemeldingen er et utkast. Oppgjøret er fastsettingen. § 2-5 ber kommunen hente siste fastsetting. Den ber ikke kommunen behandle et utkast som om det var oppgjør.

Et utkast kan mangle poster, eller vise et annet tall enn det som blir fastsatt. Det er derfor unntaket finnes: når oppgjøret ikke kan utleveres i tide, skal kommunen be om skattemeldingen. Når oppgjøret finnes, er det oppgjøret som gjelder.

## Integrasjonen henter oppgjør. Den sletter ikke unntaket.

Det som kan automatiseres, er å hente oppgjøret inn i saken når Skatteetaten kan utlevere det. Ett oppslag, skrevet inn der saksbehandleren allerede jobber. [Prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) er å gjenbruke data fra autoritative kilder. [Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å bruke fellesløsningen, ikke å bygge en ny SFO-portal.

Det som ikke skal automatiseres bort, er unntaket. Rekker ikke oppgjøret, skal kommunen fortsatt be om skattemeldingen før 1. august. Integrasjonen sletter ikke den plikten. Den fyller feltet når oppgjøret finnes, og lar unntaket stå når det ikke gjør det.

Xala bygger hentingen inn i fagsystemet. Xala kjører ikke SFO-portalen. Xala er ikke Fiks, Altinn, Digisos eller Startskudd.

[Dataminimering](https://www.digdir.no/datadeling/vurdere-tilgang-til-data/2254): vis det formålet krever. Ikke lim inn hele skattemeldingen i saksnotatet når oppgjøret allerede ligger i saken.

## Hva det betyr for søker og saksbehandler

Saksbehandleren får en sak der oppgjøret enten ligger i feltet, eller unntaket er synlig: be om skattemelding fordi oppgjøret ikke kan utleveres i tide. Ikke en sak der skjemaet ber om vedlegg uansett.

Søkeren merker det som at familien bare blir bedt om skattemelding når oppgjøret ikke rekker. Ikke som et fast vedleggskrav i SFO-skjemaet.

## Ofte stilte spørsmål

### Når skal kommunen be om skattemelding for SFO?

Når skattemyndighetene ikke kan utlevere grunnlaget for siste fastsetting, og kommunen av den grunn ikke rekker vedtak før 1. august. Det står i § 2-5. Finnes oppgjøret, skal det hentes. Skattemeldingen er unntaket, ikke hovedregelen.

### Er skattemeldingen det samme som skatteoppgjøret?

Nei. Skattemeldingen er et utkast. Oppgjøret er fastsettingen. Integrasjonen skal hente oppgjøret når det finnes. Den skal ikke behandle utkastet som om det var fastsatt.

### Sletter integrasjonen unntaket når oppgjøret kommer?

Nei. Integrasjon henter oppgjør når det finnes. Den sletter ikke unntaket. Rekker ikke oppgjøret, skal kommunen fortsatt be om skattemeldingen før 1. august.

### Hva gjør Xala, og hva gjør Xala ikke?

Vi bygger hentingen inn i fagsystemet dere allerede har. Vi kjører ikke SFO-portalen, og vi eier ikke Fiks, Altinn, Digisos eller Startskudd.

Kartlegging av om fagsystemet henter oppgjøret før det ber om skattemelding, er det første steget. Det tar vi i [kontakt](/kontakt).
