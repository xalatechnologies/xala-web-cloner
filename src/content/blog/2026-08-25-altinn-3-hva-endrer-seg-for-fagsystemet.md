---
slug: altinn-3-hva-endrer-seg-for-fagsystemet
title: "Altinn 3: hva som endrer seg for fagsystemet"
seoTitle: "Altinn 3: hva som endrer seg for fagsystemet"
description: "Altinn 3: Altinn II er stengt 19. juni 2026. Sluttbrukersystemet må kobles til Altinn 3. Et fagsystem som kaller de gamle endepunktene får ikke sendt inn."
date: 2026-08-25
author: "Ibrahim Rahmani"
role: "IT-leder"
readingMinutes: 3
cover: "/images/blog/altinn-3-hva-endrer-seg-for-fagsystemet.webp"
draft: false
lang: no
tag: "IT-leder"
keywords:
  - altinn 3
  - sluttbrukersystem
  - fagsystem
  - digitalisering
cta: /kontakt
---

Klokka 09:40. Fagsystemet poster mot et Altinn II-endepunkt. Svaret kommer ikke.

Fagsystemet mot Altinn II er stengt.

Registrer sluttbrukersystemet på Altinn 3. Ikke hold en privat II-pipe.

[Digdir](https://samarbeid.digdir.no/altinn/ta-i-bruk-altinn-3/2333) skrudde av Altinn II i juni 2026. Tjenester måtte reetableres på Altinn 3, eller avvikles. Et fagsystem som fortsatt kaller de gamle endepunktene, får ikke data og får ikke sendt inn. Xala kan koble sluttbrukersystemet. Xala eier ikke Altinn.

Saksbehandleren venter på en innsending som aldri lander.

## Pek det på Altinn 3

[Prinsipp 5](https://www.digdir.no/digital-samhandling/prinsipp-5-del-og-gjenbruk-losninger/1062) er å bruke Altinn 3, fellesløsningen dere allerede skal bruke. Ikke å holde en privat Altinn II-pipe.

[Prinsipp 6](https://www.digdir.no/digital-samhandling/prinsipp-6-lag-digitale-losninger-som-stotter-samhandling/1063) er at fagsystemet snakker med App API, Dialogporten og tilgangspakker.

Ikke late som det gamle virksomhetssertifikatet fortsatt er døren. Ikke late som Xala eier Altinn 3.

Hva Xala bidro med hos Digdir, står i [Altinn 3 og Altinn Studio: hva Xala bidro med hos Digdir](/caser/altinn). Her er det fagsystemet som fortsatt kaller II.

## Hva som sluttet 19. juni

[Digdir om avviklingen](https://samarbeid.digdir.no/felleslosninger/viktig-informasjon-om-avvikling-av-altinn-ii/3560): «19. juni 2026: Altinn II stenges. Etter denne datoen vil det ikke lenger være mulig å bruke tjenester eller hente data fra løsningen.»

Innsendingstjenester som skulle videre, «må utvikles på nytt i Altinn Studio». Meldingstjenester må opprettes som ressurs, med nye grensesnitt.

«Tjenesteeiers arkiv» blir ikke videreført. Tjenesteeier har i Altinn 3 «kun tilgang til data om sine tjenester via API.» Når II ble stengt, mistet tjenesteeiere tilgangen til historiske data sendt inn gjennom Altinn II.

Roller fra II: delegering stoppet 19. juni 2026. Selv rollene avvikles 31. desember 2026. I Altinn 3 erstattes de av tilgangspakker.

Dette er ikke en nedtelling. Døren er allerede stengt.

## Hva sluttbrukersystemet må gjøre

[Digdir](https://samarbeid.digdir.no/altinn/ta-i-bruk-sluttbrukersystem/2409): et sluttbrukersystem er et system koblet til Altinn, brukt til å hente meldinger, sende inn data eller bruke andre funksjoner. Det gjelder både kommersielle systemer og interne løsninger. Begge må onboardes.

[Fire steg](https://samarbeid.digdir.no/altinn/kom-i-gang-med-integrasjon-mot-altinn-3/2868): signer bruksvilkårene. Få tilgang til API-scopes. Autentiser via Maskinporten eller ID-porten. Utvikle integrasjon mot API-ene dere faktisk trenger.

For leverandører med flere kunder anbefaler Digdir Maskinporten sammen med systembruker. Resten av den døren er et annet steg.

Noen etat-scopes kommer fra etaten, ikke fra Digdir. De tildeles ikke av seg selv.

Test i TT02 før dere peker produksjon dit.

## Innsending og melding nå

Innsending fra sluttbrukersystemet går mot App API. Meldinger hentes via Dialogporten.

[Altinn 3](https://docs.altinn.studio/nb/community/about/) er tredje generasjon plattform for å utvikle og kjøre digitale tjenester. Digdir eier den. En setning er nok. Ikke bygg Altinn om igjen. Koble sluttbrukersystemet.

Xala kan koble sluttbrukersystemet inn i fagsystemet dere har. Xala eier ikke Altinn 3. Xala eier ikke Altinn Studio. Xala eier ikke Dialogporten.

Sitter filen i innboksen i stedet, er det et annet steg. Det er skrevet i [Innboksen er ikke mottak](/blogg/altinn-innboks-manuelt-mellomlager). Her er det at fagsystemet fortsatt kaller II.

## Hva som blir manuelt

Ikke automatiser etat-scopes dere ikke har fått. Ikke late som testdata i TT02 er produksjon. Ikke late som II-roller lever etter 31. desember 2026.

Ikke bygg et privat arkiv «for sikkerhets skyld». Historikken fra II ligger ikke i et tjenesteeierarkiv lenger. Data om tjenestene hentes via API.

Xala kan koble sluttbrukersystemet. Xala eier ikke Altinn. Xala fatter ikke vedtaket.

## Ofte stilte spørsmål

**Kan fagsystemet fortsatt kalle Altinn II?**
Nei. Digdir stengte Altinn II 19. juni 2026. Etter den datoen går det ikke an å bruke tjenester eller hente data fra løsningen.

**Må innsendingstjenester skrives på nytt?**
Ja, hvis de skulle videre. Digdir skriver at innsendingstjenester må utvikles på nytt i Altinn Studio, eller avvikles. Det er ikke en flytting av det gamle skjemaet.

**Er sluttbrukersystemet bare for leverandører?**
Nei. Digdir teller både kommersielle systemer og interne løsninger. Begge må onboardes med bruksvilkår, scopes og tilgangspakker.

**Eier Xala Altinn 3?**
Nei. Xala kan koble sluttbrukersystemet. Xala eier ikke Altinn 3. Xala eier ikke Altinn Studio. Xala eier ikke Dialogporten.

Trenger dere at fagsystemet snakker med Altinn 3, start på [kontakt](/kontakt).
