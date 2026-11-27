# Handoff

## CURRENT TASK
SEO/metadata NEXT items 1-5 are implemented on `fix/seo-meta`: six policy pages now have descriptions,
canonicals, Open Graph metadata and `<main>` landmarks; every page has the new SVG favicon; both home
pages use a 1200x630 OG image, Twitter cards and dash-free copy; the Turkish description is under 160
characters. Static parsing and internal target/anchor checks pass. The sandbox blocks both `.git` writes
and localhost socket binding, so changes remain uncommitted and the required HTTP/curl check could not run.

## DONE
- CV/portfolio home (EN `/`, TR `/tr/`), restyled policy pages via style.css, sitemap, hreflang
- Merged redesign to main and pushed; GitHub Pages build verified, live pages return 200
- jury + awwwards plugins installed; initial jury audit run on the live site
- Added descriptions, canonicals, og:title, og:description and `<main>` to all six policy pages
- Added an SVG `yfg.` favicon to all nine HTML pages
- Added a 1200x630 warm-paper OG image and Twitter large-card metadata to `/` and `/tr/`
- Shortened the Turkish meta description to 137 characters
- Rewrote visible em/en dashes on `/` and `/tr/`; both files now contain zero
- Parsed all nine pages and resolved 20 unique internal files/anchors; `app-ads.txt` and `CNAME` diffs are empty

## NEXT
1. Billune is counted in "six apps shipped" but has no App Store listing: user decides "Coming soon" label or link once published.
2. Optional (needs real data): one problem/idea/outcome line per app card (downloads, ratings).
3. Repo stays PUBLIC: GitHub free plan cannot serve Pages from a private repo (App Store policy URLs depend on it).

## JURY (2026-11-27)
- Round 1 (live, before fixes): critic 6.7, jury estimate ~7.8.
- Round 2 (local, after SEO + jury fixes): critic 7.0, jury estimate ~8.1. Mobile LCP ~1 s, CLS 0, axe 0, audit 0 FAIL.
- Round 2 polish pushed (0cb3ad4): locale-correct card labels, skip links on app pages, card morph view transition.
- Known tool artefacts: email CTA "no hover" (capture is blank), 404 "Error response" (local python server; Pages serves 404.html).

## BLOCKERS
Yok

## BEST AGENT NOW
Claude: remaining items are user decisions.
