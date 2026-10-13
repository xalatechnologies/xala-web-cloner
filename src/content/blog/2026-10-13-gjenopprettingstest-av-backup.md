---
slug: gjenopprettingstest-av-backup
title: "Gjenopprettingstest: slik vet dere at backupen virker"
description: "En sikkerhetskopi er bare verdt noe hvis den kan hentes tilbake. Slik planlegger, kjører og dokumenterer IT-ledere en gjenopprettingstest, steg for steg."
date: 2026-10-13
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/gjenopprettingstest-av-backup.webp"
coverAlt: "Infografikk på kremfarget bakgrunn: et nøkkelknippe foran en dør, der bare den oransje nøkkelen merket testet står i låsen med grønn hake, mens nøklene natt og uke har spørsmålstegn. Etiketter kopi, gjenoppretting, kontroll og logg. Overskrift «HAR DERE PRØVD NØKKELEN?»."
keywords:
  - gjenopprettingstest
  - sikkerhetskopi
  - backup
  - beredskap
  - drift
hashtags:
  - backup
  - sikkerhetskopi
  - beredskap
  - drift
lang: no
draft: false
faq:
  - question: "Hvor ofte bør vi teste gjenoppretting?"
    answer: "Så ofte at dere vet at rutinen virker etter hver større endring i systemet. Det finnes ingen fast frist som passer alle."
  - question: "Holder det at leverandøren sier at backupen kjører?"
    answer: "Nei. En jobb som har kjørt, viser ikke at dataene kan hentes tilbake og brukes."
  - question: "Kan vi teste med ekte data?"
    answer: "Ja, men i et lukket miljø med samme tilgangsstyring som produksjon, fordi kopien inneholder ekte personopplysninger."
  - question: "Hvem bør være med på testen?"
    answer: "Drift, systemeier og en fagbruker som kan kjenne igjen riktige data."
  - question: "Hva gjør vi hvis testen feiler?"
    answer: "Skriv ned avviket, rett det og kjør testen på nytt. En feilet test er et funn, ikke et nederlag."
---

Mandag morgen svarer ikke fagsystemet, og driftsleverandøren sier at siste sikkerhetskopi er fra natt til søndag. Det neste spørsmålet er det ingen har prøvd å svare på før: hvor lang tid tar det å få den tilbake, og er alt med?

En sikkerhetskopi som aldri er hentet tilbake, er et løfte, ikke en garanti. Den eneste måten å vite at backupen virker på, er å gjenopprette den på forhånd, i ro og orden. Under går vi gjennom en gjenopprettingstest i sju steg. For hvert steg står det hva dere gjør, hva dere skriver ned, og hvordan dere ser at steget er ferdig.

## Steg 1: Bestem hva som skal kunne hentes tilbake

Start med å liste opp hva som faktisk må tilbake for at tjenesten skal virke. Det er sjelden bare databasen. Vedlegg, dokumentlager, konfigurasjon, nøkler og integrasjonsoppsett hører ofte med.

Skriv ned hver del, hvor den ligger, og hvem som eier den. Steget er ferdig når systemeier og drift er enige om at listen er komplett.

## Steg 2: Avgjør hvor mye data dere tåler å miste, og hvor lenge dere tåler å vente

Her kommer to begreper inn. RPO handler om hvor mye data dere tåler å miste, altså hvor gammel den siste brukbare kopien kan være. RTO handler om hvor lenge tjenesten kan være nede før det blir et alvorlig problem for brukerne.

Det er virksomheten som bestemmer disse to, ikke leverandøren. Svaret avhenger av hva tjenesten brukes til, og hva det koster når den står stille. Skriv ned begge med ord som fagfolkene kjenner seg igjen i. Steget er ferdig når systemeier har godkjent dem.

## Steg 3: Velg en kopi og et miljø å gjenopprette til

Velg en konkret kopi, gjerne ikke den nyeste, slik at dere også ser om eldre kopier holder. Gjenopprett aldri mot produksjon. Bruk et eget testmiljø.

Testmiljøet må ha samme tilgangsstyring som produksjon, fordi kopien inneholder ekte personopplysninger. Skriv ned hvilken kopi dere valgte, og hvem som har tilgang til miljøet. Steget er ferdig når miljøet er klart og tilgangene er kontrollert.

## Steg 4: Kjør gjenopprettingen og ta tiden

Følg den dokumenterte rutinen, ikke det dere husker. Hvis rutinen mangler et trinn, er det et funn i seg selv.

Ta tiden fra dere starter til tjenesten svarer, og noter hvor det stoppet opp. Tiden dere måler, sammenligner dere med det dere skrev ned i steg 2. Steget er ferdig når systemet kjører i testmiljøet.

## Steg 5: Sjekk at dataene faktisk stemmer

At databasen starter, betyr ikke at dataene er hele. La en fagbruker åpne saker og kjenne igjen innholdet. Sjekk at vedlegg kan åpnes, at revisjonsspor er med, og at arkivreferanser peker dit de skal.

Skriv ned hva dere sjekket, og hva som manglet. Steget er ferdig når fagbrukeren bekrefter at dataene ser riktige ut.

## Steg 6: Skriv ned resultatet og avvikene

Samle resultatet i en kort rapport: hvilken kopi, hvilket miljø, hvor lang tid det tok, hva som virket, og hva som ikke gjorde det. Hvert avvik får en eier og en plan for retting.

Oppdater driftsdokumentasjonen med det dere lærte. En rutine som ble endret under testen, skal ikke bare leve i hodet til den som kjørte den. Steget er ferdig når rapporten er lagret der neste person finner den.

## Steg 7: Legg neste test i forvaltningsavtalen

En test som ikke er avtalt, blir lett utsatt. Gjør gjenopprettingstesten til en fast del av forvaltningsavtalen, på samme måte som oppetid og hendelser rapporteres gjennom den.

Avtal hvem som tar initiativ, hvem som deltar, og at større endringer i systemet utløser en ny test. Hvis dere også jobber med sikkerhetsstyring, passer testen naturlig inn i det arbeidet, slik vi beskriver i [ISO 27001 i praksis](/blogg/iso-27001-i-praksis-for-utviklingsprosjekter). Steget er ferdig når neste test har en eier i avtalen.

Backup er en del av driften som varer lenge etter lansering, noe vi har skrevet mer om i [Driftbarhet: lansering er midtveis](/blogg/driftbarhet-lansering-er-midtveis).

[Se hva en forvaltningsavtale med sikkerhetskopiering og gjenopprettingstest dekker](/tjenester/forvaltning-og-drift)
