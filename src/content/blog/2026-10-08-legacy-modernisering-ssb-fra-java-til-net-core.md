---
slug: legacy-modernisering-ssb-fra-java-til-net-core
title: "Legacy-modernisering: først samme svar, så ny plattform"
seoTitle: "Legacy-modernisering: SSB fra Java til .NET Core"
description: "SSB flyttet eldre Java-systemer til .NET Core med bevart funksjonalitet. Slik bidro Xala: kartlegging, overgang side om side og regresjonstester."
date: 2026-10-08
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/legacy-modernisering-ssb-fra-java-til-net-core.webp"
coverAlt: "Strektegning i gull på nesten svart bakgrunn: en skålvekt i balanse med tre like kuber i hver skål. Bare omdreiningspunktet lyser."
keywords:
  - legacy modernisering
  - migrering
  - teknisk gjeld
  - regresjonstesting
  - offentlig sektor
  - legacy-system modernisering
  - Java til .NET Core
hashtags:
  - legacy modernisering
  - migrering
  - teknisk gjeld
  - regresjonstesting
  - offentlig sektor
faq:
  - question: "Hva er legacy-modernisering?"
    answer: "Det er å flytte eldre systemer over på en ny plattform uten å miste data eller funksjonalitet underveis. I SSB-caset betydde det å migrere Java-baserte systemer til .NET Core med bevart funksjonalitet."
  - question: "Hva gjorde Xala hos SSB?"
    answer: "Xala bidro med analyse, migrering og testing da eldre Java-baserte systemer ble flyttet til .NET Core. Bidraget omfattet også arkitektur, integrasjon og støtte ved utrullingen."
  - question: "Hvordan unngår man funksjonell regresjon i en migrering?"
    answer: "I SSB-caset ble systemene og avhengighetene kartlagt først. Deretter ble forretningslogikken skrevet på nytt med vekt på samme oppførsel, og et eget rammeverk for regresjons- og migreringstesting kontrollerte resultatet."
  - question: "Hvor stort var teamet, og hvor lang tid tok det?"
    answer: "Caset oppgir et team på seks personer: en teamleder, en prosjektleder, to utviklere og to testere. Leveranseperioden er oppgitt som 12 til 24 måneder."
  - question: "Hva kostet moderniseringen?"
    answer: "Budsjettet er konfidensielt og står ikke i caset. Vi oppgir derfor ingen tall."
lang: no
draft: false
---

Tenk deg at en statistikk kjøres i det nye systemet for første gang. Tallet er nesten likt det gamle, men ikke helt. Ingen kan si hvilket som er riktig.

Scenen er tenkt, men det er den du må unngå når et gammelt system skal flyttes. Regelen er enkel: Vis at det nye gir samme svar som det gamle før du forbedrer noe.

Statistisk sentralbyrå (SSB) flyttet eldre Java-systemer til .NET Core med det kravet. Xala bidro blant annet med analyse, migrering og testing. Nedenfor går vi gjennom caset steg for steg, bare med det som står i det publiserte caset.

## Utgangspunktet var Java-systemer med høy teknisk gjeld

SSB er avhengig av robuste digitale systemer for viktige offentlige oppgaver. Flere av dem var bygd på eldre Java-baserte løsninger.

Systemene var i bruk, men teknisk gjeld gjorde vedlikehold og videreutvikling tungt. Teknisk gjeld er gamle løsninger og snarveier som gjør hver endring dyrere enn den burde være.

Samtidig kunne ikke alt bare legges om. Systemene hentet, flyttet og regnet på data i mange steg før tallene var ferdige. De stegene måtte virke likt hele veien.

## Kravet var null datatap og ingen funksjonell regresjon

Caset beskriver kravet til migreringen som nulltoleranse for datatap og for funksjonell regresjon. Det er et strengt krav.

Funksjonell regresjon betyr at noe som virket før, ikke virker likt etterpå. En beregning gir et annet svar. En rapport mangler et felt. For en statistikkprodusent er tallene selve leveransen. Et avvik i en beregning er ikke en kosmetisk feil.

Derfor var det ikke nok at de nye systemene fungerte. De skulle gjøre det samme som de gamle. Caset sier eksplisitt at datafunksjonalitet og statistisk nøyaktighet skulle bevares gjennom migreringen.

## Kartleggingen kom før den første linjen ny kode

Arbeidet startet med de eksisterende Java-systemene. De ble analysert sammen med de tekniske avhengighetene. Målet var å forstå ansvar, kompleksitet og hva som burde moderniseres først.

Deretter ble kravene avklart. Hvilken funksjonalitet er forretningskritisk, og hva skal være med i migreringen? Kravanalysen hadde særlig vekt på at driften skulle fortsette mens arbeidet pågikk.

Først da ble det tegnet opp hvordan det nye skulle se ut: hvilke deler det skulle bestå av, i hvilken rekkefølge de skulle flyttes, og hvordan de skulle snakke med systemene rundt.

Rekkefølgen er poenget. Når kravet er at ingenting skal forsvinne, må du vite hva som finnes før du flytter det.

## Forretningslogikken ble skrevet på nytt i .NET Core, med samme oppførsel

Reglene systemene regner etter, ble skrevet på nytt i .NET Core og C#. Det som tidligere lå i Java-applikasjonene, fikk en ny utgave.

Målet var funksjonell likhet. Den nye koden skulle oppføre seg som den gamle, også i tilfellene ingen husker å nevne i et kravdokument. Det er en annen oppgave enn å skrive et nytt system fra bunnen. Forbedringer kan komme senere, når likheten er bekreftet.

Det nye kjører i Microsoft Azure med SQL Server som database. Systemene snakker sammen via API-er, og nye versjoner bygges og testes automatisk (CI/CD). Forretningsdata og rapportering skulle henge sammen gjennom hele prosessen.

Denne posten handler ikke om selve språkvalget. Det har vi skrevet om i en egen artikkel om [hvorfor vi velger .NET for systemer som skal vare](/blogg/teknologivalg-for-fagsystemer-som-skal-vare).

## Gammelt og nytt kjørte side om side i overgangen

Et system som skal være i drift hele veien, kan ikke byttes ut på én dag. I SSB-caset ble det bygd et overgangslag mellom de moderniserte tjenestene og de gamle Java-komponentene.

Laget var en mellomstasjon. Nye deler kunne snakke med gamle deler, og funksjoner kunne flyttes én etter én. Hver ny del ble koblet til systemene rundt og sjekket før neste.

Slik jobber vi generelt med modernisering: Gammelt og nytt kjører parallelt, vi sammenligner svarene, og vi ruller ut litt om gangen med mulighet til å gå tilbake. Det er ikke en beskrivelse av hva som ble gjort hos SSB. [Slik moderniserer vi et fagsystem uten driftsstans](/blogg/modernisere-fagsystem-uten-driftsstans).

## Regresjonstester bar tilliten til det som ble flyttet

Når kravet er null funksjonell regresjon, må noen kunne vise at kravet er oppfylt. I SSB-caset var det jobben til et eget rammeverk for regresjons- og migreringstesting.

Ifølge caset besto teamet av seks personer: en teamleder, en prosjektleder, to utviklere og to testere. To av seks var altså testere.

Regresjonstesting og kvalitetssikring ga økt trygghet for at den migrerte funksjonaliteten virket, og for at hver leveranse var klar til å tas i bruk.

Vi har skrevet egne råd om [hva som er verdt å automatisere i testene](/blogg/testautomatisering-for-fagsystemer).

## Resultatet var samme funksjonalitet på en plattform som kan videreutvikles

Arbeidet ble avsluttet med kontrollert utrulling og støtte i overgangen. Status i caset er levert.

Caset oppgir fire resultater. Eldre Java-systemer er migrert til .NET Core, og funksjonaliteten er bevart. Systemet er lettere å rette og endre, og den tekniske gjelden er redusert. Plattformen er bygd for jevnlige leveranser, og den står sterkere for årene som kommer.

Legg merke til hva som står først. Ikke ny funksjonalitet, men bevart funksjonalitet. I en migrering som denne er det selve målet. Det nye ligger i plattformen: den er lettere å vedlikeholde og klar for kontinuerlig levering.

Les [hele SSB-caset](/caser/ssb-legacy-system-modernization) for leveransene og arkitekturen i detalj.

## Dette står ikke i caset

Et case er en oppsummering, ikke en prosjektrapport.

Budsjettet er konfidensielt. Leveranseperioden er oppgitt som 12 til 24 måneder, ikke som en eksakt varighet. Caset har ingen tall for ytelse og ingen tall for besparelser. Vi fyller ikke de hullene med anslag.

Det caset viser, er rekkefølgen og kravene. Kartlegging før kode. Samme oppførsel før forbedringer. Gammelt og nytt side om side i overgangen. Tester som kan vise at ingenting forsvant. Står du med et eldre system som må flyttes uten at data eller funksjonalitet går tapt, er det der vi ville begynt samtalen.

[Se hvordan Xala moderniserer fagsystemer uten driftsstans](/tjenester/modernisering-av-fagsystemer).
