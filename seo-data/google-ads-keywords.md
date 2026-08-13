# Google Ads keyword sheet

`google-ads-keywords.csv` is a build sheet for a Google Ads account for xala.no,
in Google Ads Editor import format. Unlike the JSON files beside it, it is not a
measurement — nothing writes it on a schedule. It was authored once, from the
measurements in this directory, and it needs a human to change it.

## Importing it

Google Ads Editor → Account → Import → From file. The columns are the ones
Editor expects: `Campaign`, `Ad Group`, `Keyword`, `Criterion Type`, `Max CPC`,
`Final URL`. Rows whose `Criterion Type` is `Campaign Negative Phrase` import as
campaign-level negatives rather than keywords.

131 keywords across 7 campaigns, plus 172 negatives.

## Two things to know before spending anything

**Almost every keyword is exact match, on purpose.** Broad and phrase match in
this vocabulary pull in three audiences the account must never pay for: citizens
applying for a grant or a licence, students writing coursework, and job seekers.
Only the recruitment campaign uses phrase match, because there the wide net is
the point.

**The bare service terms belong to applicants, not buyers.** In the SerpAPI run
of 28 July 2026, page one for `tilskuddsportal` is Helsedirektoratet and the
grant portals of Bergen, Asker and Trondheim; page one for `bevillingsportal`
and `skjenkebevilling system` is Helsedirektoratet and individual kommuner.
Those are pages where a person *applies* for something. Every keyword in the
tilskudd and bevilling campaign therefore carries a buyer's qualifier —
`leverandør`, `for kommuner`, `system for` — and that campaign gets eight
place-name negatives on top of the shared list. Read its search-terms report
weekly for the first month and expect to add negatives faster than keywords.

## What it is grounded in

- `search-console.json` — Search Console, `sc-domain:xala.no`, 14 Jul – 11 Aug
  2026. Tiering and the choice of which clusters are worth bidding on come from
  here. Worth knowing: every non-brand click in that window is zero.
- `rankings.json` — the **SerpAPI run of 28 July 2026**, which is the last run
  that returned real SERPs. Every DataForSEO run from 10 August onward returns
  28 rows with no results at all, because the account is out of credit. Do not
  read a rank number out of those runs.
- `keywords.json` — the competitor list. Five of the eight names in the
  conquesting campaign come from here.
- The route table: `sitemap.xml`, `src/data/service-pages.json`,
  `products.json`, `careers-roles.json`. Every `Final URL` points at a page that
  exists.

## What is deliberately absent

`Max CPC` is blank in every row. No source in this repo carries cost, competition
or search-volume data — `keywords.json` has an empty `keywords: []` array,
because the volume pull was configured and never ran. Keyword Planner returns
both, free, once an Ads account exists. Nothing here should be turned into a
budget before that.

There are no product keywords. Digilist and Norchain have their own domains, and
`products.json` marks Digiskjema and Xaheen `coming-soon`.
