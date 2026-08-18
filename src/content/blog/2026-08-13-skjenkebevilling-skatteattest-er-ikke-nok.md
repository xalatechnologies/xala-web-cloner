---
slug: skjenkebevilling-skatteattest-er-ikke-nok
title: "Skjenkebevilling: skatteattesten søkeren henter selv er ikke nok"
seoTitle: "Skjenkebevilling: skatteattest er ikke nok"
description: "En selvhentet skatteattest viser visse restanser på utstedelsesdagen. Den erstatter ikke uttalelse fra Skatteetaten."
date: 2026-08-13
author: "Ibrahim Rahmani"
role: "Grunnlegger, Xala Technologies"
readingMinutes: 3
tag: "IT-leder"
cover: "/images/blog/skjenkebevilling-skatteattest-er-ikke-nok.webp"
keywords: ["skjenkebevilling", "skatteattest", "skatteetaten", "alkoholloven", "bevilling", "offentlig sektor"]
lang: no
draft: false
---

I mappa ligger en skatteattest lastet opp i forrige uke. «Ingen restanser». Saken er merket komplett. En skatteattest søkeren henter selv viser bare visse restanser på utstedelsesdagen. Helsedirektoratet skriver det. Den erstatter ikke uttalelse fra Skatteetaten. Xala kan strukturere innhentingen mot etaten. Xala eier ikke bevillingsportalen. Xala gir ikke bevillingen.

Søkeren har gjort det skjemaet ba om, og venter. Saksbehandleren sitter med et PDF som ikke viser det vandelen krever.

## Kort svar

Be om uttalelse fra Skatteetaten. Ikke et obligatorisk vedleggsfelt for skatteattest.

[Prinsipp 4](https://www.digdir.no/digital-samhandling/prinsipp-4-del-og-gjenbruk-data/1061) er kun én gang: hent det etaten allerede har, ikke det søkeren lastet opp. [Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å bruke etatens uttalelse inn i fagsystemet dere har, ikke å bygge en ny skjenkeportal.

## Hva Helsedir faktisk sier om selvhentet attest

I [rundskrivet til alkoholloven § 1-7, punkt 1.7.4](https://www.helsedirektoratet.no/rundskriv/alkoholloven/kapittel-1-alminnelige-bestemmelser/-1-7.bevilling-for-salg-og-skjenking) står det at en skatteattest som søkeren innhenter selv, «ikke gir noen fullstendig oversikt over bevillingssøkers skatte- og avgiftsmessige situasjon, men kun gir en oversikt over visse typer restanser på et gitt tidspunkt (utstedelsestidspunktet)».

Det er hele poenget. Attesten er et øyeblikksbilde av visse restanser. Den er ikke etatens uttalelse.

## Hva § 1-7 krever og hva den bare åpner for

[Alkoholloven § 1-7 andre ledd](https://lovdata.no/lov/1989-06-02-27/§1-7) sier at kommunen *skal* innhente uttalelse fra sosialtjenesten og politiet før søknaden avgjøres. Den *kan* også innhente uttalelse fra skatte- og avgiftsmyndighetene.

Helsedir skriver likevel at uttalelsen i de fleste tilfeller er nødvendig for å ta stilling til vandelskravet i [§ 1-7b](https://lovdata.no/lov/1989-06-02-27/§1-7b). Når kommunen ber, plikter etatene å gi relevante opplysninger uten hinder av taushetsplikt, etter [§ 1-15](https://lovdata.no/lov/1989-06-02-27/§1-15).

Politi og sosial er et annet steg. Det er skrevet i [Skjenkebevilling: uttalelse fra politi og sosial kommer før vedtaket](/blogg/skjenkebevilling-uttalelse-fra-politi-og-sosial). Denne teksten handler bare om skatteattesten.

## Hva attesten ikke viser

Helsedir lister fem ting en slik attest ikke opplyser om:

- skatte- eller avgiftskrav som er oppstått eller beregnet, men ikke forfalt på utstedelsestidspunktet
- skatte- eller avgiftskrav som er oppstått eller forfalt etter utstedelsestidspunktet (forskuddstrekk, arbeidsgiveravgift og merverdiavgift forfaller annenhver måned)
- forhold tilknyttet andre virksomheter bevillingssøker er eller har vært involvert i
- historikk for bevillingssøkers skatte- og avgiftssituasjon
- skatte- eller avgiftsrestanser andre steder i landet når attesten er utstedt av skatteoppkreveren i kommunen

Etaten skal bare uttale seg om forholdet til skatte-, avgifts- og regnskapslovgivningen. Uttalelsen kan omfatte nåværende og tidligere overtredelser og restanser, også andre selskaper og privatøkonomi når det kan henge sammen med næringen.

## Hva som kan automatiseres, og hva som blir manuelt

Det som kan automatiseres, er bestillingen til etaten. Kommunen ber. Etaten svarer. Oppslaget logges: at det gikk til etaten, når, og at det var det § 1-7 og § 1-15 peker på. [NSM](https://nsm.no/hold-deg-oppdatert/meninger/logging-du-ma-vite-hva-som-skjer-og-hva-som-har-skjedd) er at dere må vite hva som skjedde. Arkiver ikke søkerens PDF «for sikkerhets skyld» som om den var etatens uttalelse.

Søkeren har rett til å kjenne uttalelsene, etter [forvaltningsloven § 18](https://lovdata.no/lov/1967-02-10-10/§18). Helsedir: uttalelsen er ikke et enkeltvedtak og kan ikke påklages.

Hvis skjemaet i det hele tatt har et felt for attest, er det valgfritt. [Designsystemets feilmønster](https://designsystemet.no/no/patterns/errors) sier at feilmeldingen skal peke på det som faktisk mangler. Den skal ikke si «last opp skatteattest», og «Send inn» skal ikke blokkeres for et manglende PDF.

Det som ikke skal automatiseres, er å behandle en selvhentet attest som «vandelen er ok». Heller ikke selve vandelsvedtaket. § 1-7b er skjønn. Helsedir skriver at brudd ikke gir automatisk avslag, at kommunen vurderer vekten, og at forhold eldre enn 10 år ikke skal tillegges vekt. Kommunen skal gjøre en selvstendig vurdering etter at uttalelsen er inne.

Xala kan strukturere innhentingen. Xala er ikke Skatteetaten.

## Ofte stilte spørsmål

### Er en skatteattest søkeren henter selv nok til å vurdere vandel?

Nei. Helsedirektoratet skriver at den bare viser visse restanser på utstedelsesdagen. Den erstatter ikke uttalelse fra skatte- og avgiftsmyndighetene.

### Må kommunen alltid be Skatteetaten?

Loven sier *kan*, ikke *skal*. Helsedir skriver likevel at uttalelsen i de fleste tilfeller er nødvendig for å ta stilling til § 1-7b.

### Kan kommunen bare stole på «ingen restanser» i PDF-en?

Nei. Attesten viser ikke uforfalte krav, senere forfall, andre virksomheter, historikk eller restanser andre steder.

### Kan vandelsvurderingen automatiseres når uttalelsen er inne?

Nei. § 1-7b er skjønn. Kommunen skal gjøre en selvstendig vurdering. Brudd gir ikke automatisk avslag.

### Hva gjør Xala her?

Xala kan strukturere innhentingen mot skatte- og avgiftsmyndighetene. Xala eier ikke bevillingsportalen. Xala gir ikke bevillingen.

## Relaterte artikler

- [Skjenkebevilling: uttalelse fra politi og sosial kommer før vedtaket](/blogg/skjenkebevilling-uttalelse-fra-politi-og-sosial)
- [Automatisering av saksbehandling: hva som kan automatiseres, og hva som må bli hos saksbehandleren](/blogg/automatisering-av-saksbehandling-hva-boer-og-ikke)

Trenger dere innhenting mot skatte- og avgiftsmyndighetene, start på [kontakt](/kontakt).
