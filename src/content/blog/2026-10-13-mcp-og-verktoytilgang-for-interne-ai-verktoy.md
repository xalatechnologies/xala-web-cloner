---
slug: mcp-og-verktoytilgang-for-interne-ai-verktoy
title: "Model Context Protocol: hvordan interne AI-verktøy får tilgang til systemene deres"
seoTitle: "Model Context Protocol for interne AI-verktøy"
description: "Den vanskelige delen av et internt AI-verktøy er ikke modellen. Det er hva den får lov til å se."
date: 2026-10-13
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/mcp-og-verktoytilgang-for-interne-ai-verktoy.webp"
keywords: ["Model Context Protocol", "MCP", "Claude", "AI-verktøy", "integrasjon", "tilgangsstyring"]
lang: no
draft: false
---

Når en språkmodell skal brukes på virksomhetens egne data, blir spørsmålet raskt praktisk: hvordan får den tilgang, og hvordan begrenses den?

Model Context Protocol, MCP, er en åpen standard fra Anthropic for nettopp dette. Den beskriver hvordan et verktøy tilbyr funksjoner og data til en modell på en ensartet måte.

## Problemet MCP løser

Uten en standard bygger hvert verktøy sin egen integrasjon mot hver modell. Fem verktøy og to modeller blir ti koblinger, og hver av dem har sin egen måte å håndtere autentisering og feil på.

Med en felles protokoll tilbyr verktøyet sine funksjoner én gang, og modeller som snakker protokollen kan bruke dem. Det er den samme gevinsten et API-grensesnitt gir mellom systemer.

## Tilgangsstyring hører til serveren, ikke til modellen

Dette er det viktigste punktet, og det som oftest gjøres feil.

En MCP-server som eksponerer «søk i saksarkivet» skal håndheve hvem som har lov til å søke, og i hva. Det er ikke modellens jobb å avstå fra å spørre. Bygg tilgangskontrollen der den ikke kan omgås, akkurat som i ethvert annet grensesnitt.

## Lesetilgang først

Et internt verktøy som kan lese er nyttig med en gang og risikoen er lav. Et verktøy som kan skrive, endre eller sende, må gjennom en helt annen vurdering.

Start med lesing. Legg til skriving når rutinene for logging, godkjenning og tilbakerulling er på plass, og gjør det én operasjon om gangen.

## Logg hvert verktøykall

Når modellen har kalt fire funksjoner for å komme fram til et svar, er de fire kallene sporet. Uten dem kan dere ikke svare på hva som ble slått opp, av hvem, og på hvilket grunnlag.

For en virksomhet som behandler personopplysninger, er det ikke valgfritt. Det er det samme kravet som gjelder ethvert annet oppslag i en fagløsning.

## Hvor det er verdt å begynne

De beste førstebruksområdene er interne og lesende: søk på tvers av intern dokumentasjon, oppslag i egne systemer, sammenstilling av opplysninger et menneske uansett skulle funnet fram.

Gevinsten er reell, feilene er billige, og dere lærer hvordan tilgang, logging og evaluering bør se ut før noe av dette møter en innbygger.

## Ofte stilte spørsmål

### Hva er Model Context Protocol?

En åpen standard fra Anthropic for hvordan verktøy og datakilder tilbyr funksjonalitet til språkmodeller. Den definerer et felles grensesnitt, slik at en integrasjon kan gjenbrukes på tvers av modeller og klienter i stedet for å bygges på nytt for hver.

### Er dette bundet til Claude?

Protokollen er åpen og implementeres av flere klienter. I praksis er poenget nettopp at integrasjonen mot deres systemer ikke skal være bundet til én leverandør, som også gjør det lettere å bytte modell senere.

### Hvordan hindrer vi at verktøyet lekker data?

Ved å behandle MCP-serveren som ethvert annet API: autentisering, autorisasjon per operasjon, minst mulig rettigheter og full logging. Modellen skal ikke ha tilgang til noe brukeren bak den ikke har.

### Kan dette brukes mot fagsystemer med sensitive opplysninger?

Ja, med samme forsiktighet som ellers. Begynn med lesetilgang på avgrensede datasett, avklar behandlingsgrunnlaget, og logg alt. Vi anbefaler å bygge det første bruksområdet internt før noe rettes mot innbyggere.
