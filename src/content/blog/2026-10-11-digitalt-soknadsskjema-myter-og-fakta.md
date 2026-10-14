---
slug: digitalt-soknadsskjema-myter-og-fakta
title: "Digitalt søknadsskjema: fem myter og fakta"
description: "Fem vanlige myter om digitale søknadsskjema i kommunen, om validering, regelverk, universell utforming og vedtak, og hva som faktisk gjelder."
date: 2026-10-11
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Kommune"
cover: "/images/blog/digitalt-soknadsskjema-myter-og-fakta.webp"
coverAlt: "Tre stablede sikter på kremfarget bakgrunn, merket teknisk validering, regelvalidering og universell utforming. Små oransje brikker blir liggende igjen på hver sikt, og fra den nederste sikten går en linje videre til komplett søknad og saksbehandler vurderer. Overskrift «SKJEMAET FANGER MANGLENE»."
keywords:
  - digitalt søknadsskjema
  - skjema
  - validering
  - regelverk
  - WCAG
hashtags:
  - skjema
  - validering
  - regelverk
  - WCAG
faq:
  - question: "Hva er forskjellen på teknisk validering og regelvalidering?"
    answer: "Teknisk validering fanger ugyldige felt. Regelvalidering sjekker om søkeren er innenfor målgruppen, om beløpet er innenfor rammen og om fristen er passert."
  - question: "Hvor mange felt bør et søknadsskjema ha?"
    answer: "Så få som mulig. Still ett spørsmål per felt: påvirker svaret vedtaket? Hvis ikke, fjern det."
  - question: "Hvilke krav til universell utforming gjelder for et digitalt søknadsskjema?"
    answer: "For offentlige virksomheter er universell utforming et lovkrav, i dag etter WCAG 2.1 gjennom EN 301 549. Xala bygger etter WCAG 2.2 AA, og det er billigst å bygge det inn fra start."
  - question: "Kan skjemaet avgjøre søknaden?"
    answer: "Nei. Skjemaet fanger mangler, men saken skal være så godt opplyst som mulig før vedtak, og saksbehandleren gjør vurderingen."
  - question: "Hvorfor bør reglene ligge ett sted?"
    answer: "Da kan de endres når retningslinjene endres, uten at skjemaet må rulles ut på nytt."
lang: no
draft: false
---

Før kommunen fatter et enkeltvedtak, skal saken være så godt opplyst som mulig, og for de fleste søknader begynner det arbeidet i skjemaet. Flere antakelser om digitale søknadsskjema lever likevel videre, og denne teksten tar for seg fem av dem.

Hver antakelse står som et spørsmål i overskriften. Det som faktisk gjelder, står i første setning under.

## Kan papirskjemaet legges rett på nett?

Et digitalt skjema bør ikke være en kopi av papiret, fordi hvert felt skal tjene vedtaket. Papirskjemaer samler felt gjennom mange år. Få tør å fjerne noe, og når skjemaet digitaliseres som det er, følger alle feltene med.

Resultatet er kjent. Søkere ringer servicetorget for å forstå hva de skal svare. Søknader kommer inn med mangler og må sendes tilbake.

Still derfor ett spørsmål per felt: påvirker svaret vedtaket? Hvis ikke, kan feltet gå ut. Finnes svaret i et register kommunen allerede har tilgang til, bør skjemaet hente det. Organisasjonsnummeret gir for eksempel navn, adresse og roller fra Enhetsregisteret.

Vi har skrevet en lengre gjennomgang av [tilskuddsportalen som faktisk blir brukt](/blogg/tilskuddsportal-som-faktisk-brukes).

## Betyr validering bare at feltene er fylt ut riktig?

At feltene er fylt ut riktig, er bare den tekniske delen av valideringen. Teknisk validering sier fra når et organisasjonsnummer ikke er gyldig. Den er enkel å bygge, og den trengs.

Men et skjema kan være teknisk feilfritt og likevel ende i en søknad som ikke kan innvilges. Regelvalidering sjekker noe annet. Er søkeren innenfor målgruppen? Er beløpet innenfor rammen? Er fristen passert?

Forskjellen merkes hos begge parter. Søkeren får beskjed mens skjemaet fortsatt er åpent og svarene er friske. Saksbehandleren sparer tid, fordi spørsmålene er stilt før søknaden kommer inn.

## Må reglene bygges inn i selve skjemaet?

Reglene bør ligge ett sted, ikke spredt rundt i koden til skjemaet. Retningslinjer endres. Målgrupper justeres, rammer flyttes og nye vilkår kommer til.

Ligger reglene i frontend-koden, blir hver slik endring en utviklingsjobb og en ny utrulling. Ligger de samlet ett sted, kan de endres når retningslinjene endres, uten en ny utrulling.

Det gir også ro i hverdagen. Når reglene står samlet, er det ett sted å lese dem og ett sted å rette dem.

## Kan universell utforming tas til slutt?

For offentlige virksomheter er universell utforming et lovkrav, i dag etter WCAG 2.1 gjennom EN 301 549. Vi bygger etter WCAG 2.2 AA. Likevel blir universell utforming ofte behandlet som en oppgave på slutten, når skjemaet ellers er ferdig.

Et skjema som ikke kan brukes med skjermleser, kan ikke brukes av alle som har rett til å søke. Og flere av de viktigste valgene tas tidlig. Den vanligste feilen er en feilmelding øverst på siden, uten at skjermleserbrukeren får vite hvilket felt den gjelder. Feilmeldingen må knyttes til feltet.

Et annet eksempel er plassholderteksten. Den er ikke en ledetekst. Hvert felt trenger en synlig ledetekst.

Begge deler handler om hvordan skjemaet er bygd, ikke om pynt til slutt. Vi går nærmere inn på dette i [WCAG 2.2 AA i praksis for fagsystemer](/blogg/wcag-2-2-aa-i-praksis-for-fagsystemer).

## Gjør et komplett skjema saken klar for vedtak?

Et skjema fatter ikke vedtak, og et komplett skjema er ikke det samme som en opplyst sak. Forvaltningsloven av 1967 § 17 første ledd sier: «Forvaltningsorganet skal påse at saken er så godt opplyst som mulig før vedtak treffes.»

Plikten ligger hos forvaltningsorganet. Skjemaet kan fange mangler, hente opplysninger fra registre og si fra når en søknad faller utenfor regelverket. Men en søknad i køen er bare grunnlaget. Saksbehandleren vurderer saken og fatter vedtaket. Systemet gjør ikke vurderingen.

Vi har skrevet mer om [hvorfor saken må være opplyst før vedtak](/blogg/saken-ma-vaere-opplyst-for-vedtak).

Et eksempel på et skjema bygd slik er tilskuddsportalen vi lager for kommuner. Den har en skjemabygger med regelbasert validering, og reglene for hva som er gyldig ligger ett sted. Prinsippene gjelder like mye for andre søknadsskjema i kommunen.

[Se hvordan tilskuddsportalen validerer mot regelverket](/tjenester/tilskuddsportal).
