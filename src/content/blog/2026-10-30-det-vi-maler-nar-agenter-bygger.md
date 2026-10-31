---
slug: det-vi-maler-nar-agenter-bygger
title: "Når agenter bygger, måler vi det som kommer tilbake"
seoTitle: "Kvalitet i KI-assistert utvikling: hva vi måler"
description: "Levert arbeid sier lite om kvalitet når agenter bygger. Det som kommer tilbake sier mer: rettelser, feilende tester og lesetid. Slik måler vi det."
date: 2026-10-30
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/det-vi-maler-nar-agenter-bygger.webp"
coverAlt: "Teknisk infografikk på kremfarget bakgrunn: fire målestaver i en elv merket Tilbake, Rettet, Feilet og Lest, hver med en blindsone, og en oransje strøm som går tilbake oppover."
keywords:
  - kvalitet
  - måling
  - testautomatisering
hashtags:
  - kvalitet
  - måling
  - testautomatisering
lang: no
draft: false
faq:
  - question: "Hvordan måler man kvalitet når KI-agenter skriver kode?"
    answer: "Ved å se på det som kommer tilbake: arbeid som gjøres om, rettelser fra mennesker, tester som feiler og tiden gjennomgangen tar."
  - question: "Er antall leveranser et godt mål?"
    answer: "Ikke alene. En agent kan levere mye som senere må gjøres om. Antall leveranser sier nesten ingenting."
  - question: "Hvorfor skal en ny test feile først?"
    answer: "Fordi en test som aldri har feilet, ikke viser at den faktisk sjekker det den skal."
  - question: "Kan tallene jukses?"
    answer: "Ja. Et tall som blir et mål, kan optimeres uten at kvaliteten blir bedre. Derfor ser vi på flere sammen."
  - question: "Hva bør vi spørre en leverandør som bruker KI-agenter?"
    answer: "Hvilke målinger de har på kvalitet, og hva hver av dem ikke fanger."
  - question: "Er dette et ferdig produkt fra Xala?"
    answer: "Nei. Det er en måte vi arbeider på nå, og den utvikler seg fortsatt."
---

En uke der alt ble levert. Hver oppgave er merket ferdig, og tavla er grønn. Uka etter kommer mange av dem tilbake for å gjøres om.

Ferdig er ikke et kvalitetsmål. Når agenter skriver mye kode fort, sier antall leveranser nesten ingenting. Kvaliteten viser seg i det som kommer tilbake. Her er fire ting vi teller, og hva hver av dem skjuler.

## Arbeid som kommer tilbake, sier mer enn arbeid som blir levert

Vi teller oppgaver som gjenåpnes eller sendes tilbake. Det er det enkleste signalet vi har: noe så ferdig ut, men var det ikke.

Et høyt tall forteller at oppgavene var for uklare eller for store. Det er nyttig å vite tidlig.

Blindsonen: et lavt tall kan bety at ingen sjekket. Ingen retur er ikke det samme som god kvalitet.

## En rettelse fra et menneske er en måling, ikke et nederlag

Når et menneske retter noe, skriver vi ned hva som ble rettet og hvorfor. En rettelse som kommer igjen, blir en regel eller en test, slik at den ikke trengs neste gang.

Tenk deg et team der den samme feilen rettes for hånd i uke etter uke. Når den skrives ned, kan den bli en automatisk sjekk som kjører før arbeidet går videre. Rettelsen blir en regel.

Blindsonen: rettelser som gjøres stille, telles ikke. Retter noen raskt selv uten å si fra, ser tallet bedre ut enn virkeligheten.

## En test som feiler før endringen, viser at den tester noe

En ny test skal feile før koden endres. Ellers vet du ikke om den måler noe. En test som aldri har vært rød, kan like gjerne sjekke ingenting.

Det handler om få og gode tester, ikke mange. Vi har skrevet mer om det i [Testautomatisering for fagsystemer](/blogg/testautomatisering-for-fagsystemer): fem gode tester er bedre enn femti ustabile. Automatiske tilgjengelighetssjekker mot WCAG 2.1, som kreves via EN 301 549, hører til i samme løp. De fanger regresjoner, men ikke alt.

Blindsonen: dekningsprosent. Høy dekning sier at koden ble kjørt, ikke at noe ble sjekket.

## Tiden det tar å lese, er prisen på farten

Agenten skriver fort. Et menneske må fortsatt lese det som kommer ut. Den tiden er en reell kostnad, og vi teller den.

Tar gjennomgangen lengre tid enn å skrive selv, er oppgaven for stor. Del den opp. Hvert steg skal kunne leses for seg, slik vi beskrev i [Systemutvikling med KI-agenter: hvert steg leses](/blogg/nar-agenten-skriver-koden).

Blindsonen: rask lesing kan bety slurv. Kort lesetid er bare bra hvis noen faktisk leste.

## Et tall som blir et mål, slutter å måle

Hvert tall kan jukses, også av en agent som optimerer for det. Be om færre returer, og du får færre returer, ikke nødvendigvis bedre arbeid.

Et arbeid kan bestå alle automatiske sjekker og likevel bli stoppet av den som leser det. Tallene er grønne, men innholdet holder ikke.

Derfor ser vi på flere målinger sammen, og vi spør alltid etter ett konkret tilfelle bak tallet.

For en arkitekt som vurderer en leverandør: spør hvilke målinger de har, og hva hver av dem skjuler. Et ærlig svar om blindsonen er et bedre tegn enn et pent tall.

## Det vi ikke har løst

Vi har ikke faste terskler. Vi vet ikke ennå hvilke målinger som holder over tid, og hvilke som bare var nyttige en periode.

Én ting holder vi fra hverandre. Det som skal kunne etterprøves etter forvaltningsloven, gjelder vedtakene i systemet, ikke målingene av utviklingsarbeidet. De to bør ikke blandes.

Dette er en del av operativsystemet for utviklingsarbeid som Ibrahim bygger nå, og det endrer seg mens vi lærer.

[Les mer om hvem vi er og hvordan vi tenker om utvikling.](/om-oss)
