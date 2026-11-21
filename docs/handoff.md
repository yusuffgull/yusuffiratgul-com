# Handoff

## CURRENT TASK
Portfolio redesign is live (main 50bbca8, pushed 2026-11-21). Started an Awwwards-style review
with the `jury` plugin (juliobsz/skills, installed at user scope). The SEO/metadata audit finished
(12 FAIL / 47 WARN); the screenshot + blind-critic scoring was not finished (context cleared to
save usage). Re-run later: `/jury https://yusuffiratgul.com` in a fresh session.

## DONE
- CV/portfolio home (EN `/`, TR `/tr/`), restyled policy pages via style.css, sitemap, hreflang
- Merged to main and pushed; GitHub Pages build verified, live pages return 200
- jury + awwwards plugins installed; jury audit run on the live site

## NEXT (Codex-ready, low/medium risk)
Hard rule: never change policy page URLs, the `#privacy/#support/#gizlilik/#destek` anchors,
policy text, `CNAME` or `app-ads.txt`. Edits in both `index.html` and `tr/index.html` must mirror.
1. Six policy pages (`sekine/ billune/ neydi-neydi/ sort-cafe/ merge-mine/ bloom-blocks/`):
   add a `<meta name="description">` (50-160 chars) and wrap the existing content in `<main>`
   (audit FAIL). Also add canonical, og:title, og:description.
2. All pages: add a favicon link (an SVG `yfg.` mark in the site's ink/accent colours).
3. `/` and `/tr/`: add `twitter:card` and an `og:image` (1200x630, warm paper style, store under
   `assets/og/`).
4. `/tr/`: shorten the meta description to <=160 chars.
5. Replace em/en dashes in visible text on `/` (13) and `/tr/` (9) with commas, colons or
   rewrites; the audit flags them as an AI-writing tell.
6. Verify: `python3 -m http.server`, open every page, no console errors; then re-run the audit:
   `cd ~/.cache/jury && node ~/.claude/plugins/cache/juliobsz/jury/*/scripts/audit.mjs https://yusuffiratgul.com`
   (after deploy) — FAIL count should be 0.
7. Billune: still counted as "shipped" but has no App Store listing. Needs the user's decision
   ("Coming soon" label vs. link once published). Do not guess.

## BLOCKERS
Item 7 needs a user decision. Push to the public repo needs explicit user OK.

## BEST AGENT NOW
Codex CLI for items 1-6 (mechanical HTML/meta work); Claude for the jury re-score and item 7.
