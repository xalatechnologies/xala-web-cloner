---
slug: testautomatisering-for-fagsystemer
title: "Testautomatisering for fagsystemer: hva som er verdt å automatisere"
seoTitle: "Testautomatisering for fagsystemer"
description: "Full dekning er ikke målet. Målet er å vite at en endring ikke brøt et vedtak som er fattet riktig i ti år."
date: 2026-09-15
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/testautomatisering-for-fagsystemer.webp"
keywords: ["testautomatisering", "regresjonstesting", "kvalitetssikring", "fagsystem", "tilgjengelighetstesting"]
lang: no
draft: false
---

Et fagsystem endres i hele sin levetid. Regelverk endres, integrasjoner endres, folk slutter. Testene er det som gjør at endringene kan gjøres av noen som ikke var med da systemet ble bygget.

## Regelmotoren først

Er det ett sted testene betaler seg, er det i reglene som avgjør utfallet av en sak. De er rene funksjoner: gitt disse opplysningene, blir vedtaket dette.

Slike tester er billige å skrive, kjører på millisekunder, og de fanger nøyaktig den feilen som er dyrest å oppdage sent: at systemet fatter feil vedtak.

## Integrasjoner testes mot kontrakten, ikke mot registeret

Det er fristende å teste mot testmiljøet til Folkeregisteret. Det gjør testene trege og avhengige av at noen andres miljø er oppe.

Test mot en kontrakt i stedet: en definisjon av hva tjenesten svarer. Kjør så en liten mengde ekte kall som en egen jobb, jevnlig, for å oppdage at kontrakten har endret seg. Da har dere raske tester og likevel varsling når virkeligheten flytter seg.

## Én ende-til-ende-test per kritisk flyt

Ende-til-ende-tester er trege og de knekker av grunner som ikke er feil. Men noen få er uunnværlige, fordi de tester det brukeren faktisk gjør.

Velg de flytene der en feil ville vært alvorlig: innsending av søknad, fatting av vedtak, arkivering. Ikke prøv å dekke alt. Fem gode er bedre enn femti ustabile som alle har lært seg å ignorere.

## Tilgjengelighet hører til i testene

Automatiske tilgjengelighetssjekker fanger ikke alt, men de fanger regresjoner: en knapp som mistet ledeteksten, en kontrast som ble justert litt for lyst.

Kjør dem i samme steg som resten. En sjekk som må startes manuelt, blir kjørt de første ukene og deretter aldri.

## Testdata som ikke er personopplysninger

Det er lett å kopiere produksjonsdata til test. Det er også en av de vanligste måtene personopplysninger havner et sted de ikke skulle vært.

Generer syntetiske data som ligner nok. Det tar en dag å bygge og fjerner et helt problem, inkludert spørsmålet om hvem som har tilgang til testmiljøet.

## Ofte stilte spørsmål

### Hvor mye testdekning bør vi ha?

Prosenttallet er ikke målet, og et høyt tall kan skjule at det viktigste ikke er dekket. Vi ser heller etter at reglene som avgjør vedtak er godt dekket, at kritiske flyter har en ende-til-ende-test, og at en feil som er funnet én gang har fått en test som fanger den igjen.

### Bør testene kjøre ved hver endring?

Ja. Tester som kjøres sjelden, blir ikke vedlikeholdt, og en test ingen stoler på er verre enn ingen test, fordi den koster tid uten å gi trygghet.

### Hvem skriver testene?

Utviklerne skriver enhets- og integrasjonstester. En tester eller QA-rolle er verdt mye på flytene, tilgjengeligheten og på å finne det ingen tenkte på. De to erstatter ikke hverandre.

### Hva med testing av arkivering?

Test at det som journalføres faktisk lar seg hente ut igjen. Et prøveuttrekk i testmiljøet avdekker manglende metadata mens det ennå er en utviklingsoppgave, ikke en avvikssak ved tilsyn.
