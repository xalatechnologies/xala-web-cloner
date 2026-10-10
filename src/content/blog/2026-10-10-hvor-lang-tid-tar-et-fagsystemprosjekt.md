---
slug: hvor-lang-tid-tar-et-fagsystemprosjekt
title: "Hvor lang tid tar et fagsystemprosjekt?"
description: "En avgrenset leveranse tar vanligvis 6 til 12 uker fra oppstart til produksjon. Her er tidslinjen: kartlegging, første sprint, tilgang og delleveranser."
date: 2026-10-10
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/hvor-lang-tid-tar-et-fagsystemprosjekt.webp"
coverAlt: "Timeglass på kremfarget bakgrunn. Øvre kolbe er merket kartlegging, halsen første sprint, og sanden i nedre kolbe ligger i tre lag merket miljøer, delleveranse og produksjon. En stiplet linje ved siden av er merket tilgang. Overskrift «FRA OPPSTART TIL PRODUKSJON»."
keywords:
  - hvor lang tid tar et it-prosjekt
  - fagsystemprosjekt
  - delleveranser
  - tidsplan for fagsystem
faq:
  - question: "Hvor lang tid tar et fagsystemprosjekt?"
    answer: "En avgrenset leveranse tar vanligvis 6 til 12 uker fra oppstart til produksjon. Større fagsystemer deles opp i delleveranser som settes i drift underveis."
  - question: "Når ser vi noe som virker?"
    answer: "Tidlig. Vi setter opp miljøer og leveranseløp i første sprint, slik at dere ser fungerende programvare lenge før prosjektet er ferdig."
  - question: "Hvorfor starte søknadene om tilgang så tidlig?"
    answer: "Tilgang til felleskomponentene er en prosess som tar tid, og den styres ikke av utviklingen. Starter søknadene sent, blir tilgangen den kritiske stien i prosjektet."
  - question: "Hva gjør tidslinjen lengre?"
    answer: "Mange sakstyper, mange integrasjoner og arkivkrav gir en annen leveranse enn et avgrenset prosjekt. Datamigrering fra et eksisterende system og integrasjoner dere ikke har avtale og tilgang til, har egne forutsetninger og egen risiko."
  - question: "Må hele systemet være ferdig før det tas i bruk?"
    answer: "Nei. Større fagsystemer settes i drift del for del. Da får dere verdi før hele prosjektet er ferdig."
lang: no
draft: false
---

Denne teksten følger et avgrenset fagsystemprosjekt fra kartleggingsmøtet til produksjon, og viser hva som skjer når. Det som gjør tidslinjen lengre, kommer til slutt.

Tidslinjen er bygd på det vi faktisk har publisert om hvordan vi leverer. Den har ett tall, og det er et typisk tall, ikke et løfte. Resten er rekkefølge. Rekkefølgen er ofte viktigere enn antall uker, fordi det er den som avgjør hva som kan gjøres samtidig.

## Før oppstart: et kort kartleggingsmøte og et estimat med forutsetninger

Det første som skjer, er et kort kartleggingsmøte. Der går vi gjennom hva systemet skal gjøre, hvem som skal bruke det og hva det må snakke med.

Etter møtet kommer et estimat. Det har tydelige forutsetninger. Forutsetningene er like viktige som selve estimatet, fordi de viser hva tidslinjen hviler på. Endrer en forutsetning seg, endrer tidslinjen seg også.

Allerede her skilles to typer leveranser. Et avgrenset prosjekt er én ting. Et fagsystem med mange sakstyper, mange integrasjoner og arkivkrav er en annen. De to har ikke samme tidslinje, og det er bedre å si det i første møte enn å oppdage det underveis.

## Første sprint: miljøer og leveranseløp står

Den første sprinten bruker vi på grunnmuren. Miljøene settes opp. Leveranseløpet settes opp, slik at ny kode kommer ut i et miljø der den kan prøves.

Det høres lite synlig ut. Effekten er det motsatte. Når løpet står, ser dere fungerende programvare tidlig.

Det samme gjelder integrasjoner. Rådet vårt er enkelt: [sett opp integrasjonen mot testmiljøet i første sprint](https://xala.no/blogg/id-porten-eller-maskinporten-hva-velger-du), selv om resten av løsningen ikke er klar.

## Parallelt fra start: søknadene om tilgang til felleskomponentene

Noe av arbeidet går ikke i sprinter. Søknadene om tilgang til nasjonale felleskomponenter følger sin egen prosess, og den styres ikke av utviklingsteamet.

Derfor starter vi dem tidlig og parallelt med utviklingen. Venter man til koden er klar, blir tilgangen den kritiske stien i prosjektet. Da står et ferdig system og venter på en godkjenning.

Vi har skrevet mer om [hvorfor tilgang tar tid](https://xala.no/blogg/integrasjoner-mot-nasjonale-felleskomponenter). Poenget her er bare tidspunktet. Søknadene hører hjemme i starten av planen, ikke på slutten.

## Underveis: fungerende programvare dere kan ta stilling til

Resten av prosjektet er utvikling i delleveranser, med test underveis. Begge deler er med i estimatet fra start.

For dere betyr det at dere ikke venter på en stor presentasjon til slutt. Dere ser programvaren mens den blir til. Dere kan prøve den, si fra om noe er feil og ta stilling til det som er laget.

Det gjør tidslinjen mer forutsigbar. Feil som oppdages tidlig, er små. Feil som oppdages på slutten, flytter datoer.

## Etter 6 til 12 uker: en avgrenset leveranse er i produksjon

En avgrenset leveranse tar vanligvis 6 til 12 uker fra oppstart til produksjon. Det er vårt publiserte, typiske tall. Ordet vanligvis står der med vilje.

Produksjonssetting er en del av leveransen, ikke noe som kommer etterpå. Det samme er dokumentasjonen. Den skal være god nok til at dere kan overta den.

Når denne milepælen er nådd, er systemet i bruk. Det er her denne tidslinjen slutter for et avgrenset prosjekt.

## Etterpå: større fagsystemer settes i drift del for del

Et større fagsystem passer ikke inn i ett slikt løp. Det deles derfor opp i delleveranser som settes i drift underveis.

Fordelen er at dere får verdi før hele prosjektet er ferdig. Den første delen er i bruk mens den neste utvikles.

Delleveranser påvirker også avtalen. Vi har en egen tekst om [hvordan delleveranser passer i kontrakten](https://xala.no/blogg/ssa-s-eller-ssa-l-kontraktsvalg-for-smidig-utvikling).

## Det som går på egen klokke: datamigrering og integrasjoner uten avtale

To ting står utenfor tidslinjen over. Det ene er datamigrering fra et eksisterende system. Det andre er integrasjoner dere ikke allerede har avtale og tilgang til.

Begge har egne forutsetninger og egen risiko. Hvor lang tid en migrering tar, avhenger av dataene som ligger der i dag. Hvor lang tid en integrasjon uten avtale tar, avhenger av en part utenfor prosjektet. Ingen av delene kan planlegges godt før de er kartlagt.

Derfor behandler vi dem som egne løp. Det gjør tidslinjen over ærlig. Og det gjør det lettere å se hva som faktisk forlenger et prosjekt.

[Se hvordan Xala jobber fra behov til drift](https://xala.no/slik-vi-jobber).
