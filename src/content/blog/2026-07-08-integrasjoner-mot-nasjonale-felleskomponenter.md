---
slug: integrasjoner-mot-nasjonale-felleskomponenter
title: "Integrasjoner mot nasjonale felleskomponenter: det som tar tid"
description: "Altinn, Folkeregisteret og KS Fiks er godt dokumentert. Det som overrasker prosjektene er tilgangsstyring, testmiljøer og feilhåndtering."
date: 2026-07-08
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
tag: "Arkitekt"
cover: "/images/blog/integrasjoner-mot-nasjonale-felleskomponenter.png"
keywords: ["systemintegrasjon", "altinn", "folkeregisteret", "ks fiks", "maskinporten", "offentlig sektor"]
lang: no
draft: false
---

Å kalle et API hos en nasjonal felleskomponent er sjelden det vanskelige. Dokumentasjonen er god, og selve integrasjonen er ofte gjort på et par dager.

Det som tar tid i prosjektene er tre andre ting, og de er verdt å planlegge for før man estimerer.

## Tilgang er en prosess, ikke en konfigurasjon

Maskinporten-scopes, virksomhetssertifikater, avtaler om databehandling og delegeringer må på plass før den første ekte forespørselen kan sendes. Flere av disse har ledetid målt i uker, ikke timer, og noen krever signatur fra noen som ikke sitter i prosjektet.

Start søknadene i uke én. Koden er sjelden flaskehalsen.

## Testmiljøene ligner, men er ikke like

Testmiljøene er reelle og nyttige, men datagrunnlaget er syntetisk. Det betyr at kombinasjoner som finnes i produksjon — sammensatte roller, historiske organisasjonsformer, personer med sperret adresse — ofte ikke finnes i test.

Konsekvensen er at feilhåndtering er den delen som er dårligst dekket når løsningen settes i drift. Bygg derfor logikken for «uventet svar» like grundig som for det forventede, og logg nok til at en sak kan rekonstrueres i ettertid.

## Nedetid hos andre er en normaltilstand

En felleskomponent vil være utilgjengelig av og til. Spørsmålet er ikke om, men hva løsningen din gjør da.

To valg avgjør opplevelsen:

1. **Kan saksgangen fortsette uten oppslaget?** Ofte kan den det — data kan hentes senere og saken merkes som ufullstendig i mellomtiden. Det er nesten alltid bedre enn å blokkere innsending.
2. **Hva ser brukeren?** «Teknisk feil» sender folk til telefonen. «Vi får ikke kontakt med Folkeregisteret akkurat nå — søknaden din er lagret, prøv igjen om en time» gjør det ikke.

## Cache det som er trygt å cache

Enhetsregisteret endrer seg sjelden i løpet av en saksbehandling. Folkeregisteret kan endre seg når som helst, og har strengere krav til hvor lenge data kan oppbevares.

Skill mellom de to. En felles cache-strategi for «eksterne data» ender enten med utdaterte opplysninger i vedtak, eller unødvendige oppslag mot registre med kvoter.

## Skriv ned hva du er avhengig av

Det høres trivielt ut, men få prosjekter har en samlet oversikt over hvilke eksterne tjenester løsningen faktisk kaller, med hvilke scopes, mot hvilke avtaler, og hvem som eier dem.

Den oversikten er det første noen spør etter ved en sikkerhetsgjennomgang — og det første du selv trenger den dagen noe slutter å virke.

## Ofte stilte spørsmål

### Hvor lang tid tar det å få tilgang til nasjonale felleskomponenter?

Regn med at tilgang er en prosess med avtaler, roller og godkjenninger — ikke en konfigurasjonsjobb som kan gjøres i sprint to. Start søknadene tidlig og parallelt med utviklingen, ellers blir tilgangen den kritiske stien i prosjektet.

### Hva gjør vi når Folkeregisteret eller Altinn er nede?

Behandle nedetid hos andre som en normaltilstand, ikke et unntak. Still to spørsmål for hvert oppslag: kan saksgangen fortsette uten det, og hva ser brukeren? Data kan ofte hentes senere og saken merkes som ufullstendig — det er nesten alltid bedre enn å blokkere innsending.

### Kan vi mellomlagre data fra registrene?

Det avhenger av registeret. Enhetsregisteret endrer seg sjelden i løpet av en saksbehandling og tåler mellomlagring godt. Folkeregisteret kan endre seg når som helst og har strengere krav til oppbevaring. En felles cache-strategi for «eksterne data» ender enten med utdaterte opplysninger i vedtak eller unødvendige oppslag mot registre med kvoter.

### Hvorfor holder det ikke å teste mot testmiljøene?

Testmiljøene ligner produksjon, men er ikke like — de har andre datasett, andre responstider og andre feilmoduser. Planlegg for at noe oppfører seg annerledes første gang det treffer ekte data.
