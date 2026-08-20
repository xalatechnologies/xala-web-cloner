---
slug: ebyggesak-mange-leverandorer
title: "Når byggesøknaden har fem dører og saken har tre"
seoTitle: "Når byggesøknaden har fem dører og saken har tre"
description: "Fem søknadsløsninger inn. Tre eByggesak-systemer ut. Kommunen sitter i midten."
date: 2026-07-18
author: "Ibrahim Rahmani"
role: "IT-leder"
readingMinutes: 3
cover: "/images/blog/ebyggesak-mange-leverandorer.webp"
draft: false
lang: no
tag: "IT-leder"
keywords:
  - ebyggesak
  - ebyggesoknad
  - fellestjenester
  - dibk
  - kommune
cta: /kontakt
---

Klokka 08:40. En søknad fra Norkart. En fra Ambita. En fra Holte. [DiBK](https://www.dibk.no/om-direktoratet-for-byggkvalitet/direktoratet-for-byggkvalitet-40-ar-) skiller eByggesøknad og eByggesak. Fem søknadsløsninger i markedet. Tre saksbehandlingssystemer. Søknaden kommer i et felles format, men kommunen sitter likevel mellom leverandørene. Xala kan kable mottaket. Xala eier ikke eByggesak.

Søkeren sendte i én av fem. Søkeren vet ikke hvilket av de tre eByggesak-systemene som tar saken, eller om den landet i Altinn.

## Kort svar

Pek på mottaksveien og formatet. Hvilken søknadsløsning sendte. Hvilket FtPB-format kom. Hvilken av de tre mottaksveiene kommunen bruker. Hvilket av de tre eByggesak-systemene skal få de strukturerte dataene. Kabl FtPB. Ikke bygg en sjette søknad. Ikke bygg et fjerde eByggesak.

Ikke late som Xala er en fjerde eByggesak. Ikke late som Xala er en sjette søknadsløsning. Ikke late som Xala erstatter FtPB. Kommunen velger leverandør og mottak. Kommunen finner ikke opp et fjerde format.

[Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å bruke FtPB dere allerede har, ikke å binde dere til én leverandør. [Prinsipp 6](https://www.digdir.no/digital-samhandling/prinsipp-6-lag-digitale-losninger-som-stotter-samhandling/1063) er at søknadssystemet og sak/arkiv snakker via FtPB-API-ene. [Prinsipp 2](https://www.digdir.no/digital-samhandling/prinsipp-2-ta-arkitekturbeslutninger-pa-rett-niva/1056) er at format og mottak er sektorbeslutninger. Kommunen velger blant tre eByggesak og tre mottaksveier.

## To produkter

DiBK, 2014: arbeidet med eByggesak (kommunal digital saksbehandling) og eByggesøknad (digitale søknadsløsninger) starter. Det er to produkter. ByggSøk stengte for nye søknader 1. oktober 2020. I 2025 skiftet Fellestjenester BYGG navn til Fellestjenester plan og bygg.

eByggesak er «den nye generasjonen saksbehandlingssystem for kommunal byggesaksbehandling». eByggesøknad er det søkeren fyller ut. Kommunen eier ikke det skillet. DiBK gjør det.

## Fem inn, tre ut

[DiBK](https://www.dibk.no/saksbehandling-tilsyn-og-kontroll/digitalisering-av-byggesak/fellestjenester-plan-og-bygg--enklere-og-smartere-planforslag-og-byggesoknader): «I dag er det fem leverandører som tilbyr søknadsløsninger i markedet basert på støtte fra Fellestjenester bygg.» Den setningen navngir dem ikke.

[Søknadsskjemaene](https://www.dibk.no/soknad-og-skjema/soknadsskjemaer-for-byggesak) gjør det: Byggesøknaden.no (Ambita og Norconsult), eByggesøk (Norkart), EG Byggsøk (EG Holte), MAKS-søk (Arkitektbedriftene), og Byggesøknad for fagfolk (Oslo kommune). Oslo er den femte. [Siden for proffbrukere](https://www.dibk.no/verktoy-og-veivisere/andre-fagomrader/fellestjenester-bygg/tjenestene/tjenester-for-proffbrukere) viser også en tjeneste for ansvarsrett og håndverk. Det er ikke en slått sammen liste på seks.

[DiBK](https://www.dibk.no/saksbehandling-tilsyn-og-kontroll/gjor-kommunen-din-klar-for-digitale-byggesoknader): «I dag finnes det tre leverandører som tilbyr slike systemer: Acos Websak Eiendom; Sikri Elements eByggesak; TietoEvry Plan & Build 360.» [Leverandørsiden](https://www.dibk.no/saksbehandling-tilsyn-og-kontroll/ebyggesaksleverandorer) bruker også Acos Eiendom+ og Tieto Plan & Build 360. Det er de samme tre. Ikke en fjerde.

Formatet er felles. Hvilket system som tar imot, avhenger likevel av mottaksvei og hvilken leverandør kommunen kjøpte.

## Tre mottaksveier

DiBK: kommunen kan motta direkte i eByggesak, gjennom SvarInn, eller via Altinn. Det er hvorfor kommunen sitter i midten. Her er det fem inn og tre ut.

Nedlastingen er skrevet i [Byggesøknaden skal inn i saken, ikke i Altinn](/blogg/ebyggesak-manuell-henting-fra-altinn). Innboksen er skrevet i [Innboksen er ikke mottak](/blogg/altinn-innboks-manuelt-mellomlager). SvarInn som mangler, er skrevet i [SvarInn er ikke slått på](/blogg/ks-fiks-svarinn-mangler). Når saken er inne og likevel uten eier, er det skrevet i [Søknaden skal fordeles samme dag](/blogg/ebyggesak-saker-ligger-ufordelt).

[DiBK om mottak](https://www.dibk.no/saksbehandling-tilsyn-og-kontroll/har-kommunen-mottatt-en-digital-byggesoknad): «XML-filene er meint for leverandør av eByggesak og ikkje skal lesast av saksbehandlar.»

## Hva FtPB faktisk gjør

DiBK: «alle eByggesøknader sendes kommunene i et felles format og utseende, uavhengig av hvilket søknadssystem som er valgt.»

[NPS 3.1 krav 003](https://www.dibk.no/saksbehandling-tilsyn-og-kontroll/ebyggesaksleverandorer): godkjenning som dokumenterer sjekklister, import og gjenbruk av søknadsdata, og dataflyt via FtPB-API-ene.

Det er formatet. Det er ikke et fjerde eByggesak. Det er ikke en sjette søknad.

## Hva som kan kables, og hva som blir manuelt

Det som kan kables: navngitt mottaksvei og formatmapping. Hvilken søknadsløsning sendte. Hvilket FtPB-format kom. Hvilken mottaksvei kommunen bruker. Hvilket av de tre eByggesak-systemene som skal ha dataene. Logg hvilket system som tok imot hva. Kommunen er behandlingsansvarlig. Databehandleravtale med eByggesak-leverandøren og med søknadsløsningen.

Det som ikke skal automatiseres: å bygge en sjette søknad. Ikke et fjerde eByggesak. Ikke å late som Xala erstatter FtPB. Vedtaket blir hos saksbehandleren. Xala fatter ikke tillatelsen.

Xala kan kable mottaket inn i eByggesak dere har. Xala eier ikke eByggesak. Xala eier ikke FtPB.

## Ofte stilte spørsmål

**Må kommunen ha ett av de tre eByggesak-systemene?**
Nei. DiBK skriver at kommunen kan motta via eByggesak, SvarInn eller Altinn. Uten eByggesak blir veien SvarInn eller Altinn, og XML-filene er ment for leverandøren, ikke for saksbehandleren.

**Er Oslo en sjette søknadsløsning?**
Nei. Søknadsskjemaene navngir Oslo som femte. Proff-siden viser også en tjeneste for ansvarsrett og håndverk. DiBK teller fem. Det er ikke en slått sammen liste på seks.

**Er dette det samme som å laste ned fra Altinn?**
Nei. Nedlastingen er skrevet i [Byggesøknaden skal inn i saken, ikke i Altinn](/blogg/ebyggesak-manuell-henting-fra-altinn). Her er det fem inn og tre ut, ikke klikket i innboksen.

**Kan Xala eie eByggesak eller fatte vedtaket?**
Nei. Xala kan kable mottaket inn i eByggesak dere har. Xala eier ikke eByggesak. Xala eier ikke FtPB. Vedtaket blir hos saksbehandleren.

Trenger dere at formatet lander i eByggesak dere har, start på [kontakt](/kontakt).
