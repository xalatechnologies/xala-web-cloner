---
slug: modernisere-fagsystem-uten-driftsstans
title: "Modernisering av fagsystemer uten driftsstans"
seoTitle: "Modernisering av fagsystemer uten driftsstans"
description: "Modernisering av fagsystemer uten driftsstans: Slik gjør du det modul for modul, med full drift underveis, uten én stor overgangsdato."
date: 2026-07-25
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/modernisere-fagsystem-uten-driftsstans.webp"
keywords: ["fagsystem", "modernisering av fagsystemer", "strangler", "uten driftsstans", "offentlig sektor"]
---

Fagsystemet gjør jobben. Det har gjort det i årevis. Men ingen tør å røre det lenger. Leverandøren er borte, dokumentasjonen er tynn, og hver endring tar lengre tid enn den forrige. Samtidig vokser teknisk gjeld, og virksomheten er sårbar for den dagen noe stopper.

## Hva er et fagsystem?

Et fagsystem er programvaren som gjør kjerneoppgavene i et fagfelt. Det er ikke et generisk kontorverktøy. Saksbehandleren bruker det hver dag for å registrere, behandle og vedta saker. Når fagsystemet er gammelt, langsomt eller uoversiktlig, er det innbyggeren som venter.

Xala moderniserer fagsystemer modul for modul, med full drift underveis. Vi legger en fasade foran det gamle, flytter én avgrenset funksjon om gangen, og gir virksomheten kontroll og sporbarhet i hver eneste overgang. Det betyr ingen stor omleggingsdato, ingen driftsstans, og ingen tvungen avhengighet til én leverandør.

## Bytt ut modul for modul, ikke alt på én gang

Alternativet er å la det nye systemet vokse rundt det gamle. Mønsteret kalles strangler fig, etter treet som vokser rundt verten sin og til slutt overtar plassen. I praksis:

1. Legg en fasade foran det gamle systemet, typisk et API-lag eller en gateway. All trafikk går gjennom fasaden, men rutes videre til det gamle systemet som før.
2. Velg én avgrenset funksjon, bygg den på nytt, og la fasaden rute akkurat den funksjonen til den nye implementasjonen.
3. Gjenta. For hver runde krymper det gamle systemet, og du sitter aldri med en overgang som må lykkes hundre prosent på én dag.

Poenget er ikke teknologien i fasaden. Poenget er at du får lov til å ta feil i liten skala, og at hver modul du flytter gir deg kunnskap du bruker på den neste.

## Start med lesing, ikke skriving

Rekkefølgen betyr mye. Begynn med funksjoner som leser data og ikke endrer noe: rapporter, oppslag, søk, eksport. De har lav risiko, du kan kjøre gammel og ny side om side og sammenligne resultatene, og du får bygget integrasjonene og autentiseringen ferdig før noe kritisk står på spill.

Skrivende funksjoner kommer etterpå, og der er det verdt å kjøre en periode med dobbeltskriving: den nye modulen skriver til begge datakilder mens den gamle fortsatt er fasit. Da oppdager du avvikene mens de er billige.

## Vær ærlig om integrasjonene

Erfaringsmessig er det ikke fagsystemet som er vanskelig, det er alt som henger i det. Et system som har stått i ti år har gjerne rapporter noen henter manuelt, en filoverføring til et regnskapssystem, en integrasjon mot en felleskomponent, og et par Excel-ark som i praksis er del av arbeidsflyten.

Koble det som allerede virker. Ikke bygg et nytt register ved siden av. Kartlegg dette før du starter, ikke underveis. Den enkleste øvelsen er å følge dataene: hvor kommer de inn, hvor går de ut, og hvem oppdager det hvis de stopper. Svarene på det siste spørsmålet er ofte de viktigste, fordi de peker på integrasjoner ingen har dokumentert.

## Hva dette betyr for anskaffelsen

For offentlige virksomheter har rekkefølgen også en anskaffelsesside. En modulvis modernisering passer dårlig med én stor fastpriskontrakt, og bedre med en avtale som gir rom for å levere i etapper, for eksempel en SSA-S eller en smidig utviklingsavtale der omfanget avtales per leveranse. Da kan de første modulene finansiere læringen som gjør estimatene på de neste realistiske.

Det gir også en reell exit: hvis samarbeidet ikke fungerer, har du et fungerende system og en dokumentert fasade, ikke et halvferdig prosjekt.

## Kort oppsummert

Et gammelt fagsystem er sjelden ett problem. Det er en samling avhengigheter som er blitt usynlige fordi de har fungert lenge. Strangler-mønsteret løser ikke det, men det gjør at du oppdager dem én om gangen, mens driften går.


## Ofte stilte spørsmål

### Kan et fagsystem moderniseres uten driftsstans?

Ja, men ikke ved å bytte alt på én gang. Strangler-mønsteret lar deg erstatte modul for modul bak en fasade, slik at driften går mens systemet endres. Du unngår ikke risikoen, men du møter den én avhengighet om gangen i stedet for alle samtidig.

### Hvor bør vi begynne?

Start med lesing, ikke skriving. Rapporter, oppslag og visninger kan flyttes uten å endre hvordan data oppstår, og de gir en reell produksjonstest av den nye plattformen før noe kritisk står på spill.

### Hvordan finner vi integrasjonene ingen har dokumentert?

Følg dataene: hvor kommer de inn, hvor går de ut, og hvem oppdager det hvis de stopper. Svaret på det siste spørsmålet er ofte det viktigste, fordi det peker på avhengigheter som er blitt usynlige nettopp fordi de har fungert lenge.

### Hvilken kontraktsform passer for en modulvis modernisering?

En modulvis leveranse passer dårlig med én stor fastpriskontrakt, og bedre med en avtale som gir rom for etapper, for eksempel SSA-S eller en smidig utviklingsavtale der omfanget avtales per leveranse. Da kan de første modulene finansiere læringen som gjør estimatene på de neste realistiske.

### Hva er et fagsystem?

Et fagsystem er programvaren som gjør kjerneoppgavene i et fagfelt. Det er ikke et generisk kontorverktøy, men den spesialiserte løsningen saksbehandleren bruker hver dag for å registrere, behandle og vedta saker. Når fagsystemet er gammelt, langsomt eller uoversiktlig, er det innbyggeren som venter.
