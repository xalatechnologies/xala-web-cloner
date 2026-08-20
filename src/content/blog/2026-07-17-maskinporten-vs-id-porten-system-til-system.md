---
slug: maskinporten-vs-id-porten-system-til-system
title: "Feil dør: når registeroppslaget går gjennom ID-porten"
seoTitle: "Feil dør: når registeroppslaget går gjennom ID-porten"
description: "Personen er inne. Fagsystemet har ingen token. Åpne Maskinporten, ikke ID-porten."
date: 2026-07-17
author: "Ibrahim Rahmani"
role: "IT-leder"
readingMinutes: 3
cover: "/images/blog/maskinporten-vs-id-porten-system-til-system.webp"
draft: false
lang: no
tag: "IT-leder"
keywords:
  - maskinporten
  - id-porten
  - folkeregister
  - virksomhetssertifikat
  - saksbehandling
cta: /kontakt
---

En person er logget inn. Fagsystemet prøver å hente Folkeregister eller skattegrunnlag med den sesjonen. APIet sier nei, eller oppslaget forlater aldri nettleseren. ID-porten logger inn et menneske. Maskinporten slipper inn et system. Et registeroppslag i saksbehandling er hjemmelsbasert, ikke et BankID-klikk. Xala kan koble Maskinporten inn i fagsystemet. Xala eier ikke døren.

Søkeren venter mens husstand eller inntekt tastes av en skjerm. Maskindøren ble aldri åpnet.

## Kort svar

Åpne Maskinporten for registeroppslaget. JWT-grant med virksomhetssertifikat. Token fra Maskinporten. Bearer mot APIet. Scope på klienten etter at rettighetspakken er gitt. Test i testmiljø. Forny sertifikatene. Deleger API til leverandøren i Altinn hvis noen bruker en.

Ikke logg saksbehandleren inn som systemet. Ikke send et ID-porten id_token til Folkeregisteret, Skatteetaten eller KS Fiks. Ikke hopp over rettighetspakke, hjemmel, tilslutningserklæring eller påkobling fordi «vi kan allerede logge inn». Ikke be Digdir om å tildele scopes for hånd.

[Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å bruke Maskinporten for register-API, ikke ID-porten. ID-porten er en fellesløsning. Den er ikke egnet for system-til-system. [Prinsipp 6](https://www.digdir.no/digital-samhandling/prinsipp-6-lag-digitale-losninger-som-stotter-samhandling/1063) er token, rettighetspakke, hjemmel og Altinn-delegering. En BankID-sesjon er ikke det samspillet. [Prinsipp 2](https://www.digdir.no/digital-samhandling/prinsipp-2-ta-arkitekturbeslutninger-pa-rett-niva/1056) er at pulten ikke velger ID-porten for et Skatteetaten- eller Folkeregister-API. Døren ble splittet nasjonalt i 2019.

Definisjonen er et annet steg. Det er skrevet i [ID-porten eller Maskinporten: hva velger du](/blogg/id-porten-eller-maskinporten-hva-velger-du). Her er det feil dør ved pulten.

## To dører på Folkeregister-siden

[Skatteetaten](https://www.skatteetaten.no/deling/folkeregisteret/intro/fa-tilgang/) viser to veier på samme side.

Nettleseren: oppslag på skatteetaten.no. Tjenesten er delegert til personen som slår opp. Det er et menneske som ser.

Maskinen: «Virksomheten kobler på tjenestene med Maskinporten.» «Skatteetaten bruker Maskinporten for tilgangskontroll og autentisering for utveksling av data mellom virksomheter.»

Å blande dem er feilen. Nettleseren er ikke fagsystemintegrasjonen.

Hvem som bor i huset, er et annet steg. Det er skrevet i [Spør ikke om husstanden](/blogg/folkeregister-husholdning-foreldrebetaling). Her er døren.

## Hva Digdir sier er hjemmelsbasert

[Digdir](https://docs.digdir.no/docs/idporten/idporten/idporten_overordnet.html): «API-tilgangen kan være innloggingsbasert (implisitt samtykke) eller brukerstyrt (eksplisitt samtykke). I begge tilfeller gjelder autorisasjonen kun for en enkelt innbygger, ulikt Maskinporten som er tiltenkt hjemmelsbasert datadeling.»

[Maskinporten](https://samarbeid.digdir.no/maskinporten/dette-er-maskinporten/96): «Når datautvekslinga skal skje mellom maskiner sørger Maskinporten for å verifisere kven som er kven.» Tokenet er bundet til organisasjonsnummer. [Digdir](https://docs.digdir.no/docs/Maskinporten/maskinporten_auth_server-to-server-oauth2): for informasjonsverdier «regulert av lovhjemmel, og ikke krever samtykke av brukeren.» client_amr: virksomhetssertifikat.

[Digdir](https://docs.digdir.no/docs/idporten/oidc/oidc_auth_server-to-server-oauth2): «ID-porten tilbyr ikke lenger støtte for “Maskinporten-i-ID-porten”.» I 2019 ble Maskinporten egen oauth2-issuer. «Kunder som fremdeles bruker JWT-grants mot den gamle ID-porten må gå over til å benytte Maskinporten.»

[Digitaliseringsrundskrivet](https://www.regjeringen.no/no/dokumenter/digitaliseringsrundskrivet/id3103320/): ID-porten er krav for innlogging. Maskinporten er anbefaling for datautveksling mellom virksomheter. Rundskrivet gjelder departementene og statens organer først. Det er ikke et krav mot kommunen her.

## Hva id_token ikke er

[Digdir](https://docs.digdir.no/docs/idporten/oidc/oidc_protocol_id_token.html): id_token «tells you “who the user is”, but not “what the user can access”.» «It is not intended to be passed around to enable API access towards other parties/systems.»

Personen ved pulten, også via Ansattporten eller Entra, er ikke API-konsumenten.

Token er ikke rettighetspakke. Rettighetspakke er ikke hjemmel. Maskinporten viser hvilken virksomhet som ringer. Registeret sjekker pakken likevel.

## Hva som kan kobles, og hva som blir manuelt

Det som kan kobles: JWT-grant, token fra Maskinporten, Bearer mot APIet. Scope etter rettighetspakke. Altinn-delegering til leverandør. Logg hvilken virksomhet, hvilket scope, hvilket formål. [Bruksvilkår 4.1.2.2](https://samarbeid.digdir.no/felleslosninger/bruksvilkar-offentlige-kunder/70): bare personell og systemer med tjenstlig behov får tokenet. Kommunen er behandlingsansvarlig. Ikke lagre hele registeret «for sikkerhets skyld».

Det som ikke skal automatiseres: å logge saksbehandleren inn som systemet. Ikke å hoppe over hjemmel, rettighetspakke, tilslutningserklæring eller påkobling. Test i testmiljø. Forny test- og produksjonssertifikat. Digdir tildeler ikke API-tilganger for hånd. Xala avgjør ikke saken.

Xala kan koble Maskinporten inn i fagsystemet dere har. Xala eier ikke døren.

## Ofte stilte spørsmål

**Kan ID-porten brukes til maskin-til-maskin?**
Nei. ID-porten logger inn et menneske. Maskinporten slipper inn et system. Det er skrevet i [ID-porten eller Maskinporten: hva velger du](/blogg/id-porten-eller-maskinporten-hva-velger-du). Her sto fagsystemet uten token, og registeret fikk aldri en virksomhet å slippe inn.

**Er nettleseroppslaget på skatteetaten.no integrasjonen?**
Nei. Oppslaget på skatteetaten.no er den delegerte personen som ser. Fagsystemet kobler på med Maskinporten og et virksomhetssertifikat. Nettleseren er ikke integrasjonen.

**Gir tokenet rettighetspakken?**
Nei. Tokenet viser hvilken virksomhet som ringer. Registeret sjekker rettighetspakken likevel. Hjemmelen kommer først, før noen scope blir gitt.

**Kan Xala eie Maskinporten eller fatte vedtaket?**
Nei. Xala kan koble Maskinporten inn i fagsystemet dere har. Xala eier ikke døren. Vedtaket og behandlingsansvaret blir hos kommunen.

Trenger dere at fagsystemet åpner maskindøren, start på [kontakt](/kontakt).
