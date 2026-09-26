---
slug: digdir-arkitekturprinsipper-i-praksis-for-kommunen
title: "Digdirs arkitekturprinsipper: sju spørsmål kommunen kan stille før den kjøper"
seoTitle: "Arkitekturprinsippene står i konkurransegrunnlaget"
description: "Digdirs sju arkitekturprinsipper blir nyttige når hvert prinsipp gjøres om til ett spørsmål leverandøren må svare på med noe du kan se i løsningen."
date: 2026-09-26
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/digdir-arkitekturprinsipper-i-praksis-for-kommunen.webp"
keywords:
  - digdir arkitekturprinsipper
  - arkitekturprinsipper kommune
  - overordnede arkitekturprinsipper
  - arkitekturprinsipper offentlig sektor
lang: no
draft: false
---

En rådgiver i kommunen skal kjøpe en ny tilskuddsportal. Konkurransegrunnlaget sier at løsningen «skal følge Digdirs arkitekturprinsipper». Tilbudene kommer inn. Alle har krysset av for ja.

Ingen vet helt hva de har sagt ja til. Heller ikke kommunen.

**Et prinsipp du ikke kan sjekke, er et ønske. Gjør hvert prinsipp om til ett spørsmål og be om noe du kan se.**

Resten av denne artikkelen er sju slike spørsmål. Ett per prinsipp.

## Hva er Digdirs arkitekturprinsipper?

Det er sju overordnede prinsipper fra Digdir for digitalisering av offentlig sektor. De skal gjøre det lettere for løsninger å samhandle, på tvers av virksomheter og sektorer.

Slik skriver Digdir dem:

- «Ta utgangspunkt i brukernes behov»
- «Ta arkitektur-beslutninger på rett nivå»
- «Bidra til digitaliseringsvennlige regelverk»
- «Del og gjenbruk data»
- «Del og gjenbruk løsninger»
- «Lag digitale løsninger som støtter samhandling»
- «Sørg for tillit til oppgaveløsningen»

Prinsippene er Digdirs, ikke Xalas. Den fulle teksten finner du hos Digdir: [Overordnede arkitekturprinsipper](https://www.digdir.no/digital-samhandling/overordnede-arkitekturprinsipper/1065). Vi omskriver dem ikke her. Vi viser hvordan du kan bruke dem.

## Hvorfor et avkrysningsfelt ikke er nok

Et ja i en tabell koster tilbyderen ingenting. Det er like lett å skrive for den som har gjort jobben, som for den som ikke har det.

Kommunen trenger spørsmål som gir et svar du kan åpne, klikke på eller lese. En demo. En dokumentasjonsside. En logg. Da blir prinsippene noe du kan sammenligne, ikke noe alle er enige om.

Spørsmålene under er skrevet for det. Bruk dem i konkurransegrunnlaget, i demoen og i kontraktsmøtet.

## Brukernes behov: kan innbyggeren fullføre søknaden på mobilen?

Tenk på en frivillig i idrettslaget. Hen søker tilskudd på mobilen, på bussen hjem. Hvis skjemaet stopper halvveis, eller knappen ikke virker med skjermleser, blir det en telefon til servicetorget i stedet.

Første prinsipp handler om å ta utgangspunkt i brukernes behov. Digdir skriver at tjenestene skal kunne brukes av alle, uavhengig av alder og funksjonsevne. Det er universell utforming, sagt enkelt.

Be om tre ting:

- En demo der noen fullfører en søknad på en vanlig mobil.
- En demo der noen bruker bare tastaturet, uten mus.
- Tilgjengelighetserklæringen for løsningen.

Svarer tilbyderen med en lysbildepresentasjon, har du fått et svar likevel. Vil du gå dypere på kravene, les [WCAG i praksis for fagsystemer](https://xala.no/blogg/wcag-2-2-aa-i-praksis-for-fagsystemer).

## Rett nivå og regelverk: hvem bestemmer hva?

Satsen for et tilskudd endres i kommunestyret. Fristen flyttes en uke. Saksbehandleren vil bare oppdatere den. I mange løsninger betyr det en bestilling til leverandøren, et tilbud og noen ukers venting.

Her møtes to prinsipper. «Ta arkitektur-beslutninger på rett nivå» handler om at beslutninger bør tas så nær oppgaven og brukerne som mulig. «Bidra til digitaliseringsvennlige regelverk» handler om at regler må kunne utvikle seg. Begge treffer det samme spørsmålet i hverdagen: hvem kan endre hva?

Spør tilbyderen rett ut:

- Hvilke regler kan kommunen endre selv? Satser, frister, kriterier, tekster i skjemaet.
- Hvilke endringer krever at leverandøren endrer koden?

Svaret bør være at det som varierer fra kommune til kommune og fra år til år, er innstillinger kommunen eier. Da kan saksbehandleren endre en frist uten en endringsordre. Og når regelverket endres, henger løsningen med.

## Del og gjenbruk data: spør bare én gang

Søkeren taster inn navn, adresse og organisasjonsnummer. Så laster hen opp en utskrift fra Enhetsregisteret. Det offentlige visste alt dette fra før.

«Del og gjenbruk data» betyr i praksis at løsningen henter det det offentlige allerede har, i stedet for å be innbyggeren oppgi det på nytt. For personer er Folkeregisteret den naturlige kilden. For lag og foreninger er det Enhetsregisteret.

Spør:

- Hvilke opplysninger henter løsningen selv, og fra hvilket register?
- Hvilke felt må søkeren fortsatt fylle ut, og hvorfor?

Et godt svar er kort og konkret. Organisasjonsnummeret gir navn, adresse og roller. Søkeren skriver ikke inn det kommunen kan slå opp.

## Del og gjenbruk løsninger: bruk fellesløsningene

Innbyggeren har allerede en måte å logge inn på offentlige tjenester. Hen trenger ikke et nytt brukernavn og passord til kommunens tilskuddsportal.

«Del og gjenbruk løsninger» betyr å bruke fellesløsningene der de passer. ID-porten for innlogging. Maskinporten når systemer snakker med hverandre. Altinn og eFormidling der tjenesten krever det. Arkiv via Noark, så saken havner der den skal.

Still ett spørsmål med to deler:

- Hvilke fellesløsninger bruker dere, og hva har dere bygget selv?
- For det dere har bygget selv: hvorfor?

Det finnes gode grunner til å bygge noe selv. Men grunnen bør kunne sies i én setning. Hvordan integrasjonene faktisk driftes, med tilgang, testmiljø og nedetid, har vi skrevet om i [integrasjoner mot nasjonale felleskomponenter](https://xala.no/blogg/integrasjoner-mot-nasjonale-felleskomponenter).

En ærlig presisering: Xala bidro hos Digdir til utvikling og modernisering av Altinn, inkludert Altinn Studio. Xala eier ikke Altinn. Det står i [Altinn-casen vår](https://xala.no/caser/altinn).

## Samhandling: kan data komme ut igjen?

Om noen år vil kommunen bytte løsning, eller koble den til et nytt system. Da er spørsmålet enkelt. Får vi dataene våre ut, i et format andre kan bruke?

«Lag digitale løsninger som støtter samhandling» betyr at løsningen skal kunne snakke med andre løsninger, i offentlig og privat sektor. Det er det motsatte av innlåsing.

Be om dette før dere signerer:

- API-dokumentasjonen. Ikke en beskrivelse av den, men selve dokumentasjonen.
- En forklaring på hvordan kommunen eksporterer alle sine data.
- Hvem som eier dataene når avtalen er over.

Finnes ikke dokumentasjonen før kontrakten, er det lite som tyder på at den kommer etterpå.

## Tillit: hva står i loggen når noen spør?

En søker ringer. Hen fikk avslag og vil vite hvorfor. Saksbehandleren åpner saken og ser hvem som gjorde hva, og når. Hvilke opplysninger som lå til grunn. Hvilket steg som gikk automatisk, og hvem som fattet vedtaket. Samtalen tar noen minutter, ikke en uke med leting i e-post.

«Sørg for tillit til oppgaveløsningen» handler om at innbyggere og ansatte skal kunne stole på det som skjer i løsningen. I hverdagen betyr det tre ting du kan se:

- En logg over hvem som gjorde hva, og når.
- Tilgangsstyring, så bare de som skal se en sak, ser den.
- Automatiske steg som kan forklares, og som saksbehandleren kan overstyre.

Be tilbyderen vise loggen for en testsak i demoen. Spør også hvordan de tenker sikkerhet fra start, for eksempel med NSMs grunnprinsipper for IKT-sikkerhet som rettesnor. Mer om automatiserte steg og manuell kontroll finner du i [automatisert vedtak: forklaring og manuell kontroll](https://xala.no/blogg/automatisert-vedtak-forklaring-og-manuell-kontroll).

## Slik gjør Xala det

Vi bygger løsninger som skal tåle disse spørsmålene. Ikke fordi de står i et konkurransegrunnlag, men fordi det er det som gjør hverdagen lettere for saksbehandleren og innbyggeren.

I [Tilskuddsportal](https://xala.no/produkter/tilskuddsportal) spør skjemaet bare om det som påvirker vedtaket. Det lagrer underveis. Reglene ligger ett sted, så de kan endres når retningslinjene endres. Universell utforming ligger inne fra start. Saksbehandleren får en kø, ikke en innboks.

I [Bevillingsportal](https://xala.no/produkter/bevillingsportal) går høringene parallelt. Frister, purringer og dokumentasjon av hvem som gjorde hva og når automatiseres. Skjønnsvurderingen ligger hos saksbehandleren. Portalen fatter ikke vedtaket. Noark ligger i datamodellen fra start.

[Arkitekturprinsipper](https://xala.no/produkter/arkitekturprinsipper) er produktet vi bygger når en kommune skal følge Digdirs sju arkitekturprinsipper i egne løsninger. Det peker på Digdir og omskriver ikke prinsippene. Det hjelper kommunen å holde dem i valgene som faktisk bygges, for eksempel med konfigurasjon som data, så kommunen kan sette opp regler og skjemaer selv.

For Nordre Follo kommune leverte vi digitale tilskudds- og bevillingsportaler, med en arkitektur som følger Nordre Follo kommunes prinsipper. Portalene har rollestyrt tilgang og API-er som kobler portalene til kommunale systemer. [Les casen om Nordre Follo](https://xala.no/caser/nordre-follo-tilskuddsportal-bevillingsportal).

Vi er ikke Digdir. Prinsippene står hos dem.

## Sju spørsmål på ett ark

Lim dette inn i neste anskaffelse. Be om et svar du kan se, ikke et kryss.

- **Ta utgangspunkt i brukernes behov:** Kan dere vise en søknad fullført på mobil og med bare tastatur, og hvor er tilgjengelighetserklæringen?
- **Ta arkitektur-beslutninger på rett nivå:** Hvilke beslutninger og innstillinger eier kommunen selv, og hvilke ligger hos dere?
- **Bidra til digitaliseringsvennlige regelverk:** Kan saksbehandleren endre satser, frister og kriterier uten en endringsordre?
- **Del og gjenbruk data:** Hvilke opplysninger henter løsningen fra registre, og hvilke må søkeren fortsatt fylle ut?
- **Del og gjenbruk løsninger:** Hvilke fellesløsninger bruker dere, og hvorfor har dere bygget resten selv?
- **Lag digitale løsninger som støtter samhandling:** Kan vi se API-dokumentasjonen og eksportløsningen før vi signerer?
- **Sørg for tillit til oppgaveløsningen:** Kan dere vise loggen for en testsak, og hvordan saksbehandleren overstyrer et automatisk steg?

Et prinsipp du ikke kan sjekke, er et ønske. Med disse sju spørsmålene kan du sjekke.

## Vanlige spørsmål

**Hvor mange arkitekturprinsipper har Digdir?**
Digdir har sju overordnede arkitekturprinsipper, fra «Ta utgangspunkt i brukernes behov» til «Sørg for tillit til oppgaveløsningen». Alle sju står på [Digdirs side om prinsippene](https://www.digdir.no/digital-samhandling/overordnede-arkitekturprinsipper/1065).

**Er arkitekturprinsippene lovpålagte for kommuner?**
Nei, for kommuner er de anbefalte prinsipper, ikke lov. Digdir skriver at prinsippene er obligatoriske for statlig sektor og anbefalte for kommunesektoren, og at de er en støtte til arbeid med virksomhetsarkitektur.

**Hvordan bruker vi arkitekturprinsippene i en anskaffelse?**
Gjør hvert prinsipp om til ett konkret spørsmål og be tilbyderen vise svaret i løsningen, ikke bare krysse av. Listen over, med sju spørsmål, er et godt sted å starte.

**Hva betyr «del og gjenbruk data» i praksis?**
Det betyr at løsningen henter opplysninger det offentlige allerede har, slik at innbyggeren slipper å oppgi dem på nytt. Et organisasjonsnummer kan for eksempel gi navn, adresse og roller fra Enhetsregisteret.

**Hvilke fellesløsninger bør en kommunal løsning bruke?**
Typisk ID-porten for innlogging, Maskinporten mellom systemer og en arkivkobling etter Noark, avhengig av tjenesten. Altinn og eFormidling kan også være aktuelle.

**Er Xala en del av Digdir?**
Nei, Digdir eier prinsippene. Xala bygger løsninger og et produkt som hjelper kommunen å følge dem.

## Neste steg

Vil du se hvordan prinsippene kan holdes i løsningen, ikke bare i dokumentet? [Se hvordan Arkitekturprinsipper hjelper kommunen å følge Digdirs prinsipper](https://xala.no/produkter/arkitekturprinsipper).

Står dere foran en anskaffelse nå? [Snakk med oss om dette](https://xala.no/kontakt).
