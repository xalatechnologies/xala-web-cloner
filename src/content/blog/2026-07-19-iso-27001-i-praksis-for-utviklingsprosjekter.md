---
slug: iso-27001-i-praksis-for-utviklingsprosjekter
title: "ISO 27001 i praksis: hva sertifiseringen faktisk krever av et utviklingsprosjekt"
seoTitle: "ISO 27001 i utviklingsprosjekter"
description: "Sertifiseringen er ikke et stempel. Den er en samling rutiner som må være synlige i måten koden blir til på."
date: 2026-07-19
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "IT-leder"
cover: "/images/blog/iso-27001-i-praksis-for-utviklingsprosjekter.webp"
keywords: ["ISO 27001", "informasjonssikkerhet", "SOC 2", "sikkerhet", "anskaffelse", "sporbarhet"]
lang: no
draft: false
---

ISO 27001 nevnes ofte i anskaffelser, og like ofte som et krysspunkt i en sjekkliste. Det som faktisk betyr noe for et utviklingsprosjekt, er et lite antall rutiner som må være på plass hele veien.

## Tilgang skal være minst mulig og etterprøvbar

Hvem har tilgang til produksjonsdata, hvorfor, og hvordan vet dere det?

Standard praksis er at ingen har stående tilgang, at tilgang gis for en avgrenset periode og med en grunn, og at det logges. Det høres tungt ut, men det er lettere enn å svare på hvorfor en tidligere ansatt fortsatt hadde tilgang i seks måneder.

## Endringer skal kunne spores til en beslutning

En endring i produksjon skal kunne følges bakover: hvem godkjente den, hva ble endret, og hvordan ble den testet.

Det er som regel allerede sant i et prosjekt med kodegjennomgang og automatisk utrulling. Poenget er at det skal kunne vises fram, ikke at det må gjøres på en bestemt måte.

## Avhengigheter er en del av angrepsflaten

De fleste sårbarheter i moderne systemer kommer fra pakker prosjektet bruker, ikke fra koden som er skrevet i huset.

Skann avhengigheter automatisk, oppdater dem løpende, og ha en rutine for hva som skjer når det kommer et alvorlig varsel en fredag ettermiddag. Rutinen er poenget; verktøyet er detaljer.

## Hendelser skal ha en rutine, ikke en improvisasjon

Det viktigste dokumentet er det korteste: hva gjør vi når noe har skjedd. Hvem varsles, hvem bestemmer, hva sier vi til kunden, og innen hvilken frist.

Personvernforordningen har en frist på 72 timer for varsling av brudd til tilsynsmyndigheten. Den fristen løper enten dere har en rutine eller ikke.

## Sikkerhet er billigst som designvalg

Tilgangsstyring, sporbarhet og logging bygget inn i datamodellen koster lite. Lagt på et ferdig system koster det en omskriving.

Det er den samme observasjonen som gjelder universell utforming og arkivering, og det er ikke tilfeldig: alle tre er egenskaper ved hvordan systemet er bygget, ikke funksjoner som kan legges til.

## Ofte stilte spørsmål

### Hva betyr det at Xala er ISO 27001-sertifisert?

At vi har et styringssystem for informasjonssikkerhet som er revidert av en uavhengig tredjepart, med rutiner for tilgang, endringer, hendelseshåndtering og risikovurdering. I praksis betyr det at vi kan dokumentere hvordan vi jobber når dere blir bedt om det i en anskaffelse.

### Er ISO 27001 det samme som SOC 2?

Nei. ISO 27001 er en internasjonal standard for styringssystemet; SOC 2 er en amerikansk revisjonsrapport om kontroller hos en tjenesteleverandør. De overlapper mye i innhold, og europeiske anskaffelser spør oftest etter ISO 27001.

### Må leverandøren vår være sertifisert?

Ikke nødvendigvis, men dere må kunne dokumentere at behandlingen av personopplysninger er forsvarlig. En sertifisering forenkler den dokumentasjonen betydelig, særlig i offentlige anskaffelser.

### Hva bør vi kreve i en anskaffelse?

Be om konkrete ting framfor merkelapper: hvordan gis og fjernes tilgang, hvordan spores endringer, hvor lang tid tar varsling ved brudd, og hvordan håndteres sårbarheter i avhengigheter. Svarene på de fire sier mer enn et sertifikatnummer.
