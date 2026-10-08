---
slug: legacy-modernisering-ssb-fra-java-til-net-core
title: "Legacy-modernisering i praksis: SSB fra Java til .NET Core"
seoTitle: "Legacy-modernisering: SSB fra Java til .NET Core"
description: "SSB flyttet eldre Java-systemer til .NET Core med bevart funksjonalitet. Slik bidro Xala: kartlegging, overgang side om side og regresjonstester."
date: 2026-10-08
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/legacy-modernisering-ssb-fra-java-til-net-core.webp"
coverAlt: "Gull strektegning på nesten svart bakgrunn: en skålvekt i balanse med tre like kuber i hver skål. Bare omdreiningspunktet lyser i gull."
keywords:
  - legacy-system modernisering
  - legacy modernisering
  - modernisering av legacy-systemer
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

Legacy-modernisering er ikke å skrive gammel kode på nytt og håpe at den gjør det samme. Det er å bytte plattform uten å miste data eller funksjonalitet underveis. Moderniseringen hos Statistisk sentralbyrå (SSB) er et eksempel på nettopp det kravet.

Xala bidro i arbeidet, blant annet med analyse, migrering og testing, da eldre Java-baserte løsninger ble flyttet til .NET Core. Under går vi gjennom caset i den rekkefølgen arbeidet ble gjort, bare med det som står i det publiserte caset.

## Utgangspunktet var Java-systemer med høy teknisk gjeld

SSB er avhengig av robuste digitale systemer for viktige offentlige oppgaver. Flere av dem var bygd på eldre Java-baserte løsninger.

Problemet var ikke at systemene hadde sluttet å virke. Problemet var teknisk gjeld. Den gjorde både vedlikehold og videreutvikling tungt.

Samtidig kunne ikke alt bare legges om. Systemene bar komplekse datarørledninger og statistiske arbeidsflyter. De måtte bevares gjennom hele migreringen.

## Kravet var null datatap og ingen funksjonell regresjon

Caset beskriver kravet til migreringen som nulltoleranse for datatap og for funksjonell regresjon. Det er et strengt krav.

Funksjonell regresjon betyr at noe som virket før, ikke virker likt etterpå. En beregning gir et annet svar. En rapport mangler et felt. For en statistikkprodusent er tallene selve leveransen. Et avvik i en beregning er ikke en kosmetisk feil.

Derfor var det ikke nok at de nye systemene fungerte. De skulle gjøre det samme som de gamle. Caset sier eksplisitt at datafunksjonalitet og statistisk nøyaktighet skulle bevares gjennom migreringen.

## Kartleggingen kom før den første linjen ny kode

Arbeidet startet med de eksisterende Java-systemene. De ble analysert sammen med de tekniske avhengighetene. Målet var å forstå ansvar, kompleksitet og hva som burde moderniseres først.

Deretter ble kravene avklart. Hvilken funksjonalitet er forretningskritisk, og hva skal være med i migreringen? Kravanalysen hadde særlig vekt på at driften skulle fortsette mens arbeidet pågikk.

Først da ble målarkitekturen definert. Den beskrev tjenestegrensene, hvordan migreringen skulle gjøres og hvilke integrasjonsmønstre de nye tjenestene skulle bruke mot systemene rundt.

Rekkefølgen er poenget. Når kravet er at ingenting skal forsvinne, må dere vite hva som finnes før dere flytter det.

## Forretningslogikken ble skrevet på nytt i .NET Core, med samme oppførsel

Kjernetjenestene og forretningslogikken ble reimplementert i .NET Core og C#. Logikk som tidligere var bundet til Java-applikasjonene, fikk en ny implementasjon.

Målet var funksjonell likhet. Den nye koden skulle oppføre seg som den gamle, også i tilfellene ingen husker å nevne i et kravdokument. Det er en annen oppgave enn å skrive et nytt system fra bunnen. Forbedringer kan komme senere, når likheten er bekreftet.

Plattformen rundt besto av Microsoft Azure, SQL Server, REST-API-er og CI/CD. Forretningsdata og rapportering skulle henge sammen gjennom hele prosessen.

Denne posten handler ikke om selve språkvalget. Det har vi skrevet om i en egen artikkel om [hvorfor vi velger .NET for systemer som skal vare](https://xala.no/blogg/teknologivalg-for-fagsystemer-som-skal-vare).

## Gammelt og nytt kjørte side om side i overgangen

Et system som skal være i drift hele veien, kan ikke byttes ut på én dag. I SSB-caset ble det bygd et overgangslag mellom de moderniserte tjenestene og de gamle Java-komponentene.

Laget besto av API-er, koblinger til eldre komponenter og tjenester som støttet selve migreringen. Det lot gammelt og nytt fungere side om side, med gradvis overgang. De nye tjenestene ble koblet til systemene rundt og validert, slik at de oppførte seg riktig gjennom hele overgangsperioden.

Parallellkjøring med sammenligning av resultater og rullende utrulling med mulighet for tilbakerulling er en del av hvordan vi jobber med modernisering. Caset sier ikke at tilbakerulling ble brukt hos SSB, og det påstår vi heller ikke her.

## Regresjonstester bar tilliten til det som ble flyttet

Når kravet er null funksjonell regresjon, må noen kunne vise at kravet er oppfylt. I SSB-caset var det jobben til et eget rammeverk for regresjons- og migreringstesting.

Ifølge caset besto teamet av seks personer: en teamleder, en prosjektleder, to utviklere og to testere. To av seks var altså testere.

Regresjonstesting og kvalitetssikring ga økt trygghet for at den migrerte funksjonaliteten virket, og for at hver leveranse var klar til å tas i bruk.

Vi har skrevet egne råd om [hva som er verdt å automatisere i testene](https://xala.no/blogg/testautomatisering-for-fagsystemer).

## Resultatet var samme funksjonalitet på en plattform som kan videreutvikles

Arbeidet ble avsluttet med kontrollert utrulling og støtte i overgangen. Status i caset er levert.

Caset oppgir fire resultater. Eldre Java-systemer er migrert til .NET Core, og funksjonaliteten er bevart. Vedlikeholdbarheten er bedre, og den tekniske gjelden er redusert. Arkitekturen er modernisert og støtter kontinuerlig levering. Og SSBs digitale plattform har fått sterkere teknisk bærekraft på lang sikt.

Legg merke til hva som står først. Ikke ny funksjonalitet, men bevart funksjonalitet. I en migrering som denne er det selve målet. Det nye ligger i plattformen: den er lettere å vedlikeholde og klar for kontinuerlig levering.

Les [hele SSB-caset](https://xala.no/caser/ssb-legacy-system-modernization) for leveransene og arkitekturen i detalj.

## Dette sier caset ikke

Et case er en oppsummering, ikke en prosjektrapport.

Budsjettet er konfidensielt. Leveranseperioden er oppgitt som 12 til 24 måneder, ikke som en eksakt varighet. Caset har ingen tall for ytelse og ingen tall for besparelser. Vi fyller ikke de hullene med anslag.

Det caset viser, er rekkefølgen og kravene. Kartlegging før kode. Samme oppførsel før forbedringer. Gammelt og nytt side om side i overgangen. Tester som kan vise at ingenting forsvant. Står dere selv med et eldre system som må flyttes uten at data eller funksjonalitet går tapt, er det der vi ville begynt samtalen.

[Se hvordan Xala moderniserer fagsystemer uten driftsstans](https://xala.no/tjenester/modernisering-av-fagsystemer).
