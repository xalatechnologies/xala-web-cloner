---
slug: tilgangsstyring-i-fagsystemet-grensetilfeller
title: "Tilgangsstyring i fagsystemet: fem grensetilfeller"
seoTitle: "Tilgangsstyring i fagsystemet: fem grensetilfeller"
description: "Tilgangsstyring i fagsystemet holder når den tåler unntakene: vikaren, den inhabile, den som slutter, leverandøren, KI-verktøyet. Slik settes rollene opp."
date: 2026-10-24
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/tilgangsstyring-i-fagsystemet-grensetilfeller.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: konsentriske ringer rundt en oransje kjerne merket rolle, med etikettene vikar, inhabil, slutter, leverandør og KI. Overskrift «TILGANGSSTYRING: FEM GRENSETILFELLER»."
keywords:
  - tilgangsstyring i fagsystemet
  - rollebasert tilgang
  - tilgangskontroll
  - identitetsløsning
  - leverandørtilgang
hashtags:
  - tilgangskontroll
  - identitetsløsning
  - leverandørtilgang
lang: no
draft: false
faq:
  - question: "Hva er rollebasert tilgang?"
    answer: "At rettigheter gis til roller, som saksbehandler eller leder for en ordning, og at personer får roller. Når en person bytter jobb, byttes rollen, ikke mange enkeltrettigheter."
  - question: "Hva betyr minste privilegium?"
    answer: "At hver bruker og hvert verktøy får akkurat den tilgangen oppgaven krever, og ikke mer."
  - question: "Bør fagsystemet ha egne brukere ved siden av virksomhetens identitetsløsning?"
    answer: "Ansatte bør logge inn med virksomhetens identitetsløsning, slik at en stengt konto også stenger fagsystemet. Rollene i fagsystemet styrer hva de ser."
  - question: "Skal leverandøren kunne lese sakene?"
    answer: "Bare når en konkret oppgave krever det, og da som en egen rolle som er avtalt og kan trekkes tilbake."
  - question: "Kan et KI-verktøy få bredere tilgang enn brukeren?"
    answer: "Nei. Verktøyet bør aldri se mer enn personen som bruker det, og tilgangen bør håndheves i systemet, ikke i verktøyet."
---

Det er juli. Vikaren trenger tre saker, men får hele ordningen. Ingen gjorde noe galt. Rollen var bare laget for den faste.

Tilgang skal følge rollen og ordningen, ikke personen. Den regelen er lett å skrive ned. Den blir først testet når noen ikke passer inn i den vanlige rollen. Her er fem slike tilfeller, og hvordan regelen holder i hvert av dem.

## Hovedregelen: tilgang følger rolle og ordning, ikke navn

En ny saksbehandler starter. Noen spør hvem saksbehandleren skal ligne på, og kopierer rettighetene til en kollega.

Det er der det glipper. Rettighetene bør høre til en rolle, som saksbehandler for en bestemt ordning, og personen bør få rollen. Da gis roller per ordning, ikke tilgang per navn. Det kalles minste privilegium: hver bruker får det oppgaven krever, og ikke mer.

Rollene koster lite når de er bygget inn i datamodellen fra start. Lagt på et ferdig system blir de en omskriving.

## Vikaren får rollen for en periode, ikke en kopi av kollegaen

Den faste går ut i permisjon. Vikaren får en kopi av kontoen, og kopien blir liggende lenge etter at vikariatet er over.

En vikar bør få den samme rollen som andre i ordningen, men som en midlertidig rolle med sluttdato i systemet. Datoen settes når rollen gis, ikke når noen husker å rydde.

Sluttdato for en midlertidig rolle bør settes når rollen gis.

## Den inhabile mister saken, ikke resten av jobben

En saksbehandler oppdager at søkeren er en bekjent. Saken skal over til en kollega, men resten av porteføljen er like riktig som før.

Etter forvaltningsloven 1967 § 6 skal den som er inhabil, ikke behandle saken. Tilgangen bør derfor sperres for den ene saken, mens rollen i ordningen står. Saken følger med til kollegaen, sammen med beskjeden om at forrige saksbehandler er inhabil. Hvordan det overføres, er det skrevet om i [Ved inhabilitet skal saken følge med](/blogg/saken-bytter-behandler-ved-inhabilitet).

Inhabilitet er et unntak på saksnivå, og systemet bør kunne sperre på saksnivå.

## Den som slutter, skal miste tilgangen der identiteten bor

En ansatt slutter på fredag. Kontoen stenges i virksomhetens katalog, men fagsystemet har sin egen bruker som fortsatt virker.

Ansatte bør logge inn i fagsystemet med virksomhetens egen identitetsløsning. Når kontoen stenges der, skal fagsystemet følge uten et eget steg. Innlogging for innbyggere utenfra er en annen sak, som er gått gjennom i [ID-porten eller Maskinporten: hva velger du](/blogg/id-porten-eller-maskinporten-hva-velger-du).

Én konto å stenge er bedre enn mange å huske.

## Leverandøren får tilgang til drift, ikke til sakene

Noe feiler en kveld, og leverandøren logger inn for å finne feilen. Med samme tilgang som en saksbehandler ser leverandøren også alle sakene.

Leverandørtilgang bør være en egen rolle, avtalt i forvaltningsavtalen. Den gir tilgang til drift og feilsøking. Trenger en oppgave innsyn i en sak, bør det gis for den oppgaven og trekkes tilbake etterpå.

Leverandøren bør få det som trengs for å holde systemet oppe, og ikke mer.

## KI-verktøyet ser aldri mer enn brukeren bak det

En saksbehandler ber et KI-verktøy oppsummere sine saker. Verktøyet er koblet til systemet med en bred tjenestekonto og kan lese alle ordninger.

Tilgangsstyringen hører til systemet, ikke til modellen. Verktøyet skal arve rettighetene til personen som bruker det, med autorisasjon per operasjon og lesetilgang først. Mer om hvordan det settes opp, står i [MCP og verktøytilgang for interne KI-verktøy](/blogg/mcp-og-verktoytilgang-for-interne-ai-verktoy).

KI-verktøyet bør få brukerens rolle, ikke en egen og bredere en.

Tilgangsstyring som er tenkt inn fra start, tåler unntakene uten nye regler.

[Se hvordan tilgangsstyringen holdes ved like etter lansering.](/tjenester/forvaltning-og-drift)
