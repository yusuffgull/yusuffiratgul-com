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
1. Outside the restricted sandbox, run `python3 -m http.server`, curl all nine pages and confirm no browser console errors.
2. Commit the current changes in small logical commits; `.git/index.lock` creation is blocked in this sandbox.
3. After deploy, rerun the jury audit; the live URL cannot reflect this unpushed branch yet.
4. Billune is still counted as shipped but has no App Store listing. Get the user decision: “Coming soon” label or link once published.

## BLOCKERS
The sandbox blocks localhost socket binding and `.git` writes. Jury re-audit requires a deploy; push is explicitly out of scope.
Billune labeling still needs a user decision.

## BEST AGENT NOW
Codex CLI outside this restricted sandbox for the HTTP/curl verification and commits; Claude for the jury re-score and Billune decision.
