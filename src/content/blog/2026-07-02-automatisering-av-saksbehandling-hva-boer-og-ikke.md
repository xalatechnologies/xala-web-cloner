---
slug: automatisering-av-saksbehandling-hva-boer-og-ikke
title: "Automatisering av saksbehandling: hva som kan automatiseres, og hva som må bli hos saksbehandleren"
seoTitle: "Automatisering av saksbehandling"
description: "Regelstyrte steg og registerinnhenting kan automatiseres. Skjønnsvedtak kan ikke. Forvaltningsloven åpner for helautomatiserte vedtak når hjemmelen er der og utfallet kan begrunnes."
date: 2026-07-02
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/automatisering-av-saksbehandling-hva-boer-og-ikke.webp"
keywords: ["automatisering av saksbehandling", "automatisert saksbehandling", "helautomatiserte vedtak", "forvaltningsloven", "offentlig sektor"]
lang: no
draft: false
---

## Kort svar

Regelstyrte steg og registerinnhenting kan automatiseres. Skjønnsvedtak kan ikke. Ny forvaltningslov (lov 20. juni 2025 nr. 81, Prop. 79 L) åpner for helautomatiserte vedtak når hjemmelen er der og utfallet kan begrunnes. Begynn med arbeidet rundt vedtaket, ikke vedtaket selv. Det er skillet [Digdir](https://www.digdir.no/datadeling/hel-eller-delvis-automatisering/2901) kaller hel eller delvis automatisering. [Prop. 79 L kap. 8](https://www.regjeringen.no/no/dokumenter/prop.-79-l-20242025/id3094317/?ch=32) lovfester det. [Forskriftsarbeidet](https://www.regjeringen.no/no/dokumenter/forskrift-om-automatisert-saksbehandling-i-forvaltningen-invitasjon-til-a-gi-innspill/id3117749/) følger.

Automatisering i saksbehandling diskuteres ofte som ett spørsmål. Det er to, og de har forskjellige svar. Det første er om en avgjørelse kan tas maskinelt. Det andre er om arbeidet rundt avgjørelsen kan tas maskinelt. Nesten alltid er svaret nei på det første og ja på det andre. Prosjekter som blander dem, bruker tiden på feil sted.

## Skillet går ved skjønn

Et vedtak som følger av regelverket alene (er søkeren innenfor målgruppen, er fristen overholdt, er beløpet innenfor rammen) kan i prinsippet fattes automatisk. Den vedtatte nye forvaltningsloven (lov 20. juni 2025 nr. 81) §§ 11 til 13 åpner for det, forutsatt at hjemmelen er på plass og at avgjørelsen kan begrunnes og etterprøves. For automatiserte avgjørelser som rammes av personvernforordningen artikkel 22, kreves særlig hjemmel.

Et vedtak som forutsetter en vurdering (er dette forsvarlig, er søkeren egnet, er tiltaket i tråd med formålet) kan det ikke. Ikke fordi teknologien mangler, men fordi ansvaret ikke kan flyttes.

I praksis er de fleste ordninger en blanding: en regelstyrt del som kan avgjøres maskinelt, og en skjønnsdel som ikke kan. Å skille dem tidlig er det viktigste designvalget i prosjektet. Digdir bruker det samme skillet: hel automatisering der rettsanvendelsen kan kjøres uten menneske, delvis der skjønnet blir hos saksbehandleren.

## Begynn med arbeidet rundt vedtaket

Selv der vedtaket krever skjønn, er mesteparten av tidsbruken mekanisk:

- innhenting av opplysninger fra registre
- kontroll av at søknaden er komplett
- fristoppfølging og purringer
- statusvarsler til søkeren
- journalføring og arkivering
- sammenstilling av grunnlaget saksbehandleren skal vurdere

Ingenting av dette krever skjønn. Alt kan automatiseres uten å flytte vedtakskompetansen, og det er her de fleste timene ligger. Et prosjekt som starter med å automatisere selve vedtaket, hopper over den delen som faktisk flytter liggetid.

## Automatiserte vedtak må kunne forklares

Der man faktisk automatiserer et vedtak, følger et krav som ofte undervurderes: parten har rett til å forstå hvorfor. Prop. 79 L lovfester forklaring og, der artikkel 22 slår inn, manuell kontroll. Organet skal også dokumentere det rettslige innholdet i systemene som treffer automatiserte avgjørelser.

Det betyr at reglene må være uttrykt slik at de kan gjengis i klartekst, ikke bare kjøres. En regelmotor som kan produsere «avslag fordi X» er langt mer verdt enn en som bare produserer «avslag». Også internt, den dagen noen skal svare på en klage.

## Mennesket i sløyfa er et designvalg

«Menneske i sløyfa» betyr lite hvis mennesket får hundre saker med et forhåndsutfylt forslag og en godkjenn-knapp. Da er kontrollen formell, ikke reell.

Skal en saksbehandler faktisk overprøve, må hen se hva systemet la vekt på, kunne endre det, og ha tid til det. Det er like mye et spørsmål om arbeidsmengde som om grensesnitt.

## Mål liggetid, ikke antall steg

Det er lett å telle hvor mange steg som er automatisert. Det som betyr noe for søkeren er hvor lang tid det tar fra innsending til svar.

De to henger mindre sammen enn man skulle tro. Et prosjekt som automatiserer ti interne steg, men lar saken vente tre uker på en uttalelse, har ikke flyttet noe som helst.

## Ofte stilte spørsmål

### Hva bør automatiseres i saksbehandling, og hva bør ikke?

Automatiser det som følger av regler som kan skrives ned uttømmende: frister, purringer, statusvarsler, kontroll av vedlegg og innhenting av data fra registre. La skjønnsvurderinger være hos saksbehandleren. Skillet går ikke ved hvor komplisert oppgaven er, men ved om utfallet kan utledes av regelverket alene.

### Er automatiserte vedtak lovlige i norsk forvaltning?

Ja, helautomatiserte vedtak er tillatt når hjemmelen er der, men de må kunne begrunnes. Ny forvaltningslov (lov 20. juni 2025 nr. 81, Prop. 79 L §§ 11 til 13) sier det samme, og krever forklaring og dokumentasjon av det rettslige innholdet. I praksis må regelmotoren kunne gjengi i klartekst hvorfor et utfall ble som det ble, ikke bare produsere utfallet.

### Hvordan måler vi om automatiseringen faktisk virker?

Mål liggetiden fra innsending til svar, ikke antall automatiserte steg. De to henger mindre sammen enn man tror: et prosjekt kan automatisere ti interne steg og likevel la saken vente tre uker på en uttalelse.

### Hva vil det si at mennesket er «i sløyfa»?

Reell kontroll krever at saksbehandleren ser hva systemet la vekt på, kan endre det, og har tid til å gjøre det. Hundre forhåndsutfylte forslag med en godkjenn-knapp gir formell kontroll, ikke faktisk kontroll. Det er like mye et spørsmål om arbeidsmengde som om grensesnitt.

## Relaterte artikler

- [Agentiske arbeidsflyter i saksbehandling: hvor de hører hjemme, og hvor de ikke gjør det](https://xala.no/blogg/agentiske-arbeidsflyter-i-saksbehandling). En agent som kan handle på egen hånd er nyttig i forarbeidet og farlig i vedtaket. Skillet er verdt å gjøre eksplisitt.

Kartlegging av hvilke steg som er regelstyrt og hvilke som er skjønn, er det første steget. Det er det vi gjør i [modernisering av fagsystemer](/tjenester/modernisering-av-fagsystemer).
