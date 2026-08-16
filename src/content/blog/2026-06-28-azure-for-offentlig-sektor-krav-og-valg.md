---
slug: azure-for-offentlig-sektor-krav-og-valg
title: "Azure for offentlig sektor: hvor data ligger, og hva dere må kunne dokumentere"
seoTitle: "Azure for offentlig sektor: krav og datalagring"
description: "Skyvalget er sjelden teknisk. Det handler om hva dere kan svare på når noen spør hvor personopplysningene befinner seg."
date: 2026-06-28
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/azure-for-offentlig-sektor-krav-og-valg.webp"
keywords: ["Azure", "offentlig sektor", "databehandleravtale", "norske regioner", "GDPR", "skytjenester"]
lang: no
draft: false
---

Diskusjonen om sky i offentlig sektor har flyttet seg. Spørsmålet er sjelden lenger om, men hvor, under hvilke betingelser, og hva dere kan dokumentere.

## Region er en beslutning, ikke en standardverdi

Azure har regioner i Norge. Å velge dem er et bevisst valg, ikke noe som skjer av seg selv, og standardvalget i et oppsett er ofte et helt annet sted.

Velg region eksplisitt, skriv det ned, og sjekk det på nytt etter oppsettet. Vi har sett tjenester havne i Nord-Europa fordi ingen endret standardverdien i en malfil.

## Ikke alle tjenester finnes i alle regioner

Dette er den vanligste ubehagelige overraskelsen. En tjeneste dere har designet rundt, finnes kanskje ikke i norsk region, eller finnes i en eldre versjon.

Sjekk tilgjengeligheten før arkitekturen låses. Alternativet er å oppdage det når løsningen skal settes opp, og da er valget mellom å bytte tjeneste eller å bytte region.

## Databehandleravtalen skal beskrive virkeligheten

Avtalen er ikke et vedlegg som fylles ut på slutten. Den skal beskrive hvilke personopplysninger som behandles, hvor de ligger, hvem som har tilgang, og hva som skjer ved en hendelse.

Skriv den mens arkitekturen er fersk. Da stemmer den, og den blir samtidig en nyttig sjekkliste: hvis dere ikke klarer å beskrive en dataflyt i avtalen, er den sannsynligvis heller ikke godt nok forstått.

## Tilgang er noe som skal kunne vises fram

Hvem i deres organisasjon kan se produksjonsdata? Hvem hos leverandøren? Hva logges når noen gjør det?

Det er de tre spørsmålene i en sikkerhetsgjennomgang, og de er lette å svare på hvis tilgangsstyringen er satt opp med roller og logging fra start. De er ubehagelige hvis svaret er at alle utviklerne har hatt tilgang siden 2023.

## Kostnadskontroll hører til arkitekturen

Skykostnader vokser stille. En tjeneste som skalerer automatisk er praktisk helt til noen kjører en løkke som kaller den en million ganger.

Sett budsjettvarsler, merk ressurser med hvilket prosjekt de tilhører, og se på forbruket månedlig. Det er en driftsrutine, ikke en engangsjobb, og den hører hjemme i forvaltningsavtalen.

## Ofte stilte spørsmål

### Kan personopplysninger lagres i Azure?

Ja, med et gyldig behandlingsgrunnlag, en databehandleravtale og dokumentasjon av hvor data ligger. Norske regioner gjør vurderingen enklere fordi data da ikke overføres ut av EØS i normal drift, men avtalen og dokumentasjonen kreves uansett.

### Hva med amerikanske leverandører og overføring til tredjeland?

Vurderingen gjøres per løsning og bør skrives ned. Vi bruker norske eller europeiske regioner der det er et krav i anskaffelsen, og dokumenterer hvilke tjenester som eventuelt innebærer overføring, slik at dere kan ta stilling til dem enkeltvis.

### Er sky billigere enn egen drift?

Ikke nødvendigvis, og det er sjelden hovedargumentet. Gevinsten ligger i at dere slipper å eie maskinvare, kan skalere ved behov og får sikkerhetsoppdateringer på plattformnivå. Kostnaden blir lett høyere enn ventet uten aktiv oppfølging.

### Kan vi kombinere sky og lokal drift?

Ja, og det er vanlig i en overgangsfase. Et fagsystem kan flyttes modul for modul mens noe fortsatt kjører lokalt. Det krever at integrasjonene mellom de to sidene er designet for at nettverket noen ganger er nede.
