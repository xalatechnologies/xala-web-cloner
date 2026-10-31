---
slug: ki-agenten-starter-blank
title: "KI-agenten starter blank: det den vet, må stå skrevet"
seoTitle: "Kontekst for KI-agenter: det som må stå skrevet"
description: "En KI-agent husker ikke forrige oppgave. Det den skal vite om huset, rollen og arbeidet, må stå skrevet der den leser. Her er lagene etter levetid."
date: 2026-10-28
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/ki-agenten-starter-blank.webp"
coverAlt: "Kremfarget bakgrunn: fem gjennomsiktige glasslag i perspektiv, merket Husregler nederst, deretter Rolle, Arbeidsmåter, Logg og Oppgave øverst"
keywords:
  - kontekst
  - dokumentasjon
  - kunnskapsoverføring
hashtags:
  - kontekst
  - dokumentasjon
  - kunnskapsoverføring
lang: no
draft: false
faq:
  - question: "Husker en KI-agent tidligere oppgaver?"
    answer: "Ikke av seg selv. Det den skal vite fra før, må stå skrevet der den leser."
  - question: "Hva er kontekst for en KI-agent?"
    answer: "Alt agenten leser før den begynner, som regler, rolle, arbeidsmåter, logg og selve oppgaven."
  - question: "Hvem skriver konteksten?"
    answer: "Mennesker eier reglene og rollene, mens logg og arbeidsmåter kan foreslås av agentene og godkjennes av et menneske."
  - question: "Er dette det samme som dokumentasjon?"
    answer: "Mye av det er det, og det som skrives for agenten, kan leses av neste utvikler også."
  - question: "Er dette et ferdig produkt fra Xala?"
    answer: "Nei. Innlegget beskriver arbeidspraksis under utvikling, ikke et ferdig produkt eller rammeverk fra Xala."
---

En agent får en oppgave den løste i går. Den stiller de samme spørsmålene som i går, og gjør den samme feilen som ble rettet i går. Ingenting er galt med agenten. Rettelsen sto i en samtale, ikke i noe den leser.

En KI-agent starter hver oppgave blank. Det som ikke står skrevet der den leser, finnes ikke for den. Kunnskapen om et system må ut av hodene og samtalene og inn i tekst med kjent levetid. Her er lagene, fra det som gjelder lengst til det som gjelder kortest.

## Husreglene gjelder hver gang, så de står først

Det nederste laget er reglene som gjelder alle oppgaver: hvilket språk som brukes, hva som aldri publiseres uten at et menneske har sagt ja, og hvilke ord som ikke brukes. De endres sjelden, og et menneske eier dem.

Når en regel mangler her, oppdages det først når den er brutt. Regler som må holde, bør også stå som tester, slik det er beskrevet i [Når KI skriver fortere enn skjønnet](/blogg/sele-rundt-ki-i-saksbehandling).

Det som gjelder alltid, skal leses først.

## Rollen sier hva agenten skal la være

Over husreglene ligger rollen. Hver agent har en skrevet beskrivelse av hva den gjør, og like viktig, hva den ikke gjør. Rollen gjelder så lenge oppgavene er av samme slag.

En agent som skriver forslag til endringer, skal kanskje aldri slå dem sammen selv. Den grensen står i rollen, ikke i hver oppgave.

En rolle uten grenser blir til alt.

## Arbeidsmåter skrives ned når de har virket to ganger

Det tredje laget er oppskriftene. Når en måte å løse noe på har virket, skrives den ned slik at neste agent kan følge den. Ikke før. En oppskrift som skrives på forhånd, beskriver det som er antatt, ikke det som virket.

Prisen er at noe læres to ganger. Det er billigere enn å skrive ned en gjetning som blir regel.

Skriv ned det som virket, ikke det som håpes skal virke.

## Loggen er det eneste minnet mellom to dager

Det fjerde laget er en kort logg over hva som ble gjort og hva som ble besluttet. Den gjelder til arbeidet er avsluttet, og agenten selv kan foreslå hva som skal stå der.

Står det i loggen at et spørsmål ble avklart i går, trenger ingen å avklare det på nytt i dag. Slik gjøres ikke samme arbeid to ganger, selv om ingen agent husker forrige uke.

Uten logg starter hver dag på nytt.

## Oppgaven er det eneste som skal være nytt

Øverst ligger oppgaven. Den gjelder kortest, og den er det eneste som skal være nytt hver gang. Står resten skrevet, kan oppgaven være kort. Hver oppgave bør også etterlate noe som kan leses, slik det er beskrevet i [Systemutvikling med KI-agenter: hvert steg leses](/blogg/nar-agenten-skriver-koden).

For en IT-leder er poenget enkelt: det som skrives for agenten, er også dokumentasjon neste utvikler kan lese. Kunnskapsoverføring blir en del av arbeidet, ikke et prosjekt til slutt.

Jo mer som står fast under, jo kortere kan oppgaven være.

## Det som fortsatt er uavklart

Lagene vokser. Gammel tekst blir feil uten at noen merker det, og en agent leser en utdatert regel like trofast som en ny. Ennå er det uklart hvem som skal rydde, eller hvor ofte.

Skriftlig kontekst for agenter må vedlikeholdes som annen dokumentasjon, ellers blir feil regler stående.

[Se hvordan Xala bygger fagsystemer med testbare leveranser.](/tjenester/saas-applikasjonsutvikling)
