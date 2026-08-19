---
slug: sele-rundt-ki-i-saksbehandling
title: "Når KI skriver fortere enn skjønnet"
seoTitle: "Når KI skriver fortere enn skjønnet"
description: "KI kan skrive kode og utkast. Kommunen trenger en sele: invarianter, porter og skjønn."
date: 2026-08-20
author: "Ibrahim Rahmani"
role: "IT-leder"
readingMinutes: 4
cover: "/images/blog/sele-rundt-ki-i-saksbehandling.webp"
category: arkitektur
draft: false
lang: no
tag: "IT-leder"
tags:
  - kunstig intelligens
  - arkitekturprinsipper
  - saksbehandling
keywords:
  - sele rundt KI
  - kunstig intelligens kommune
  - arkitekturprinsipper
  - saksbehandling
cta: /kontakt
---

En agent skriver om i fagsystemet. En annen lager utkast til et vedtaksbrev. Begge er ferdige før saksbehandleren har åpnet mappa. Genereringen skalerer. Skjønnet gjør det ikke. Kommunen trenger en sele: invarianter, arkitekturprinsipper som kjørbar politikk, NSM-krav som porter, og autonomi etter risiko. En PDF om arkitektur er ikke selen.

Dette er ikke en ny saksbehandlingsmotor. Det er rammen rundt den som skriver.

## Kort svar

Bygg selen før dere slipper agenten løs. Skriv ned det som alltid skal holde. Gjør det om til tester og porter. La et internt verktøy gå lenger enn et oppslag i skatt, ID eller et vedtak. Mennesket blir værende der utfallet rammer innbyggeren.

Ikke la agenten være sin egen kontrollør. Ikke gi samme frihet til et internt søk og til et enkeltvedtak. Ikke late som Xala eier en ferdig sele.

[Prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) er å dele og gjenbruke data. Det holder ikke som et avsnitt i en arkitekturbeskrivelse når en agent henter dem på maskinfart. [Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å gjenbruke løsningene dere har, ikke å reise en ny KI-stabel ved siden av. [Prinsipp 2](https://www.digdir.no/digital-samhandling/prinsipp-2-ta-arkitekturbeslutninger-pa-rett-niva/1056) er at kommunen beslutter hvor autonomien slutter. Det er ikke et leverandørvalg.

Hvor agenten hører hjemme i saken, er skrevet i [Agentiske arbeidsflyter i saksbehandling](/blogg/agentiske-arbeidsflyter-i-saksbehandling). Fire avklaringer før første linje er skrevet i [Språkmodeller i offentlig forvaltning](/blogg/sprakmodeller-i-offentlig-forvaltning-hva-som-krever-avklaring). Her er det rammen rundt den som skriver.

## Gnisten, og hva den ikke er

I august 2026 skrev [Samir Kumar Sahoo](https://medium.com/@sahoo.samir/the-rise-of-the-harness-engineer-why-ai-coding-agents-create-a-new-engineering-discipline-e6dc7928eba1) at generering av kode skalerer fortere enn ingeniørskjønnet. Han kaller disiplinen harness engineering. På norsk: selen rundt agenten. Invarianter. Kjørbar politikk. Autonomi etter risiko. Tester som faktisk stanser en endring.

Det er gnisten. Det er ikke en Silicon Valley-oppskrift for kommunen. Sahoo skriver om kodeagenter. I en kommune skriver agenten også utkast til saksbehandling. Samme misforhold. Høyere risiko.

## Invarianter, ikke hukommelse

En invariant er noe som skal holde uansett hvem som endrer systemet. Tjenester krysser ikke avtalte grenser. Personopplysninger havner ikke i logger. Bare godkjente biblioteker kommer inn. Et vedtak skal kunne begrunnes med regler noen kan lese.

Slikt har bodd i hodet på arkitekten. Det skalerer ikke når flere agenter skriver samtidig. Da må kunnskapen ut av hukommelsen og inn i tester, statisk analyse, avhengighetsregler og porter i bygget.

Sahoo er tydelig på ett punkt: ikke la agenten være sitt eget politi. Modellen er sannsynlighetsbasert. Mange av reglene deres er det ikke. «Modul A skal aldri avhenge av modul C» er en sjekk, ikke et håp.

## Arkitektur som kjørbar politikk

[Digdirs råd for ansvarlig KI](https://www.digdir.no/kunstig-intelligens/rad-ansvarlig-utvikling-og-bruk-av-kunstig-intelligens-i-offentlig-sektor/4272) starter med risikovurdering for den konkrete bruken. [Veiledningen](https://www.digdir.no/kunstig-intelligens/veiledning-ki-i-offentlig-sektor/4132) er råd, ikke en ferdig sele. Prinsippene må kunne feile en bygging. Ellers er de dokumentasjon.

[Digitaliseringsrundskrivet](https://www.regjeringen.no/no/dokumenter/digitaliseringsrundskrivet/id3103320/) punkt 1.3: det er et mål at alle offentlige virksomheter bruker kunstig intelligens i oppgaveløsningen innen 2030. Virksomheten bør ha rutiner, og de ansatte skal kjenne dem. Rundskrivet peker selv på Digdirs veileder og [NSMs grunnprinsipper for IKT-sikkerhet](https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/introduksjon/hva-er-nsms-grunnprinsipper-for-ikt-sikkerhet/) som hjelpemiddel. Det binder staten først. Kommunen eier likevel rutinene sine.

[KS sin plan for KI i kommunal sektor](https://www.ks.no/fagomrader/digitalisering/kunstig-intelligens-ki/plan-for-bruk-av-kunstig-intelligens-i-kommunal-sektor-2025/) sier at hver kommune bør ha en handlingsplan for KI. Tiltak 1 er en KI-pilot for trygg saksbehandling. Mange kommuner er usikre på hvordan det gjøres forsvarlig. Planen er retning. Selen er det som stanser en endring.

## NSM som porter, ikke som hefte

[NSM](https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/introduksjon/hva-er-nsms-grunnprinsipper-for-ikt-sikkerhet/) deler IKT-sikkerhet i fire: identifisere og kartlegge, beskytte og opprettholde, oppdage, håndtere og gjenopprette. Versjon 2.1 er den anbefalte. «Beskytte og opprettholde» er eksplisitt ved endringer. En agent som skriver kode eller utkast er en endring.

Da er grunnprinsippene porter: hvem fikk se hva, hvilke hemmeligheter kom inn i konteksten, hvilke avhengigheter ble lagt til, hva ble logget. En veileder i en mappe stanser ingenting.

Hva agenten får lov til å se, er skrevet i [Model Context Protocol](/blogg/mcp-og-verktoytilgang-for-interne-ai-verktoy).

## Autonomi etter risiko

Ikke all generering fortjener samme frihet. Et internt søk i egne rutiner er én ting. Et oppslag mot skatt eller Folkeregister, en endring i ID-løpet, eller et utkast som kan bli vedtak, er noe annet.

Lav risiko: agenten kan foreslå, teste og lage et endringsforslag. Mennesket ser på det som feilet. Middels: gjennomgang før noe lander i saken. Høy: ekspert, sikkerhet og eksplisitt godkjenning. Målet er ikke å fjerne mennesket. Det er å bruke det der risikoen er høy.

Skillet ved vedtaket er allerede skrevet. Helautomatiserte vedtak krever regler, ikke en modells skjønn. Det står i [Automatisering av saksbehandling](/blogg/automatisering-av-saksbehandling-hva-boer-og-ikke).

## Hva som kan kables, og hva som blir manuelt

Det som kan kables: invariantene. Portene. Konteksten agenten får. Testene som feiler når en grense krysses. Loggen over hva som ble slått opp.

Det som blir manuelt: formålet. Hvilken autonomi denne oppgaven tåler. Underskriften på vedtaket. DPIA når det kreves. Xala kan kable porter og kontekst i systemene dere har. Xala eier ikke selen. Xala fatter ikke vedtaket.

Start i det små. Ett kodegrunnlag, eller ett internt bruksområde. Fem til ti invarianter. Mål hva som feiler. Juster. Det er Sahoos oppskrift, oversatt til kommunen. Ikke en fabrikk på dag én.

## Ofte stilte spørsmål

**Er selen et nytt fagsystem?**
Nei. Det er tester, porter, kontekst og en beslutning om autonomi rundt det dere allerede har.

**Kan agenten fatte vedtak hvis portene er grønne?**
Nei. Porter kan stanse en ulovlig endring. De gjør ikke en språkmodell til hjemmel. Vedtaket er skrevet i [Agentiske arbeidsflyter i saksbehandling](/blogg/agentiske-arbeidsflyter-i-saksbehandling).

**Er Digitaliseringsrundskrivet et pålegg til kommunen om å innføre agenter?**
Nei. Punkt 1.3 setter et mål for offentlige virksomheter og peker på rutiner. Rundskrivet binder staten først. Kommunen eier likevel risikoen i egne saker.

**Kan Xala levere selen som et produkt?**
Nei. Xala kan kable porter og kontekst. Kommunen eier invariantene og formålet.

Trenger dere at selen blir synlig i systemene dere har, start på [kontakt](/kontakt).
