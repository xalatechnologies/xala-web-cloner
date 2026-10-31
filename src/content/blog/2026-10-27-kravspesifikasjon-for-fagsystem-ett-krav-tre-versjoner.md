---
slug: kravspesifikasjon-for-fagsystem-ett-krav-tre-versjoner
title: "Kravspesifikasjon for fagsystem: ett krav i tre versjoner"
seoTitle: "Kravspesifikasjon for fagsystem: ett krav i tre steg"
description: "Et godt krav sier hva systemet skal gjøre, hvordan det testes og hva leverandøren må legge ved. Ett krav følges gjennom tre versjoner til et testbart krav."
date: 2026-10-27
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Kommune"
cover: "/images/blog/kravspesifikasjon-for-fagsystem-ett-krav-tre-versjoner.webp"
coverAlt: "Stige med tre trinn der samme krav blir skarpere: ønske nederst, standard i midten og test øverst"
keywords:
  - kravspesifikasjon
  - kravspesifikasjon for fagsystem
  - anskaffelse av fagsystem
  - anskaffelse
  - fagsystem
  - testbare krav
  - universell utforming
  - tilgjengelighet
hashtags:
  - kravspesifikasjon
  - anskaffelse
  - fagsystem
  - tilgjengelighet
lang: no
draft: false
faq:
  - question: "Hva er en kravspesifikasjon for et fagsystem?"
    answer: "Dokumentet der kommunen beskriver hva systemet skal gjøre, slik at leverandørene kan svare og løsningen kan testes."
  - question: "Hva skiller et godt krav fra et svakt?"
    answer: "Et godt krav kan testes, peker på en standard der den finnes, og sier hva leverandøren må legge ved i svaret."
  - question: "Hvilket krav til universell utforming gjelder for offentlige løsninger?"
    answer: "For løsninger innbyggerne bruker, er kravet WCAG 2.1 via EN 301 549."
  - question: "Må et fagsystem for ansatte være universelt utformet?"
    answer: "Det er som regel utenfor forskriften, men kommunen kan stille kravet i anskaffelsen likevel."
  - question: "Bør kravspesifikasjonen beskrive løsningen?"
    answer: "Nei. Den bør beskrive behovet og hvordan det testes, så leverandøren kan foreslå løsningen."
---

Fem leverandører svarer «oppfylt» på samme krav. Evalueringen stopper. Ingen av svarene kan testes, og ingen av dem er feil.

Et krav alle kan si ja til, skiller ingen. Her følges ett krav gjennom tre versjoner, fra ønske til noe kommunen faktisk kan prøve.

## Et krav alle kan svare ja på, skiller ingen leverandører

Ord som «moderne», «fleksibelt» og «intuitivt» står i mange kravspesifikasjoner. De beskriver noe alle ønsker, og derfor svarer alle ja. Evalueringen ender i pris og presentasjon, ikke i hva systemet gjør.

Et krav må kunne gi ulike svar fra ulike leverandører. Ellers er det en hilsen, ikke et krav.

Spør om kravet kan besvares med nei. Kan det ikke det, sier det ingenting.

## Første versjon beskriver et ønske, ikke en egenskap

*Systemet skal være brukervennlig og universelt utformet.*

Leverandøren svarer «oppfylt» og legger ved en skjermdump. Kommunen har ingen måte å si at svaret er svakt, fordi kravet ikke sier hva brukervennlig betyr eller hvem som skal bruke det.

Et ønske er et godt utgangspunkt for et krav. Det er ikke et krav i seg selv.

## Andre versjon peker på en standard som kan måles

*Innbyggerdelen av systemet skal oppfylle WCAG 2.1 via EN 301 549.*

Nå finnes det en målestokk. Leverandøren kan ikke lenger svare med et adjektiv, og kommunen kan sammenligne svarene. For offentlige virksomheter er dette kravet for løsninger innbyggerne bruker. Systemer som ansatte bruker i arbeidet, er som regel utenfor forskriften, men kommunen kan stille det samme kravet likevel. Hvordan dette ser ut i arkitekturen, står i [universell utforming i praksis for fagsystemer](/blogg/wcag-2-2-aa-i-praksis-for-fagsystemer).

En standard gjør kravet målbart. Den sier fortsatt ikke hvordan det skal bevises.

## Tredje versjon sier hvem som tester, og hva svaret skal vise

*Innbyggerdelen skal oppfylle WCAG 2.1 via EN 301 549. Leverandøren legger ved en testrapport for løsningen som tilbys, og kommunen kan teste selv før akseptanse.*

Nå har kravet en eier og et bevis. Svaret må inneholde et dokument som kan leses, og akseptansetesten har et grunnlag. En leverandør som ikke har testet, ser det allerede når kravet leses.

Et krav er ferdig skrevet når det er klart hva som skal ligge ved svaret.

## Samme stige virker på integrasjon og datalagring

*Systemet skal ha API* blir til *systemet skal kunne levere og motta data via dokumentert API, og konfigurasjon er data, ikke kode*. Det første kan alle si ja til. Det andre kan testes, og hva som skjer når et system mangler slike grensesnitt, står i [Fagsystem uten API: hvordan kobler du det likevel?](/blogg/fagsystem-uten-api).

Datalagring følger samme vei: fra «data skal lagres trygt» til hvor data ligger, og hva leverandøren må dokumentere i svaret.

En kravspesifikasjon er et testgrunnlag, ikke en ønskeliste.

[Se hvordan Xala bygger fagsystemer der konfigurasjon er data, ikke kode.](/tjenester/saas-applikasjonsutvikling)
