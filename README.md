# yusuffiratgul.com

Static site for Yusuf Fırat Gül: a CV/portfolio home page (EN + TR) plus the app policy pages
(privacy policy + support, linked from App Store Connect), `app-ads.txt` for AdMob, and a sitemap.
Plain HTML/CSS/JS, no build step.

| Path | Purpose |
|---|---|
| `/` | Home (CV/portfolio, app list, contact), English |
| `/tr/` | Turkish mirror of home |
| `/sort-cafe/` `/merge-mine/` `/bloom-blocks/` | Privacy Policy (`#privacy`) + Support (`#support`) |
| `/neydi-neydi/` | Gizlilik (`#gizlilik`) + Destek (`#destek`), English section `#privacy` |
| `/sekine/` | Gizlilik (`#gizlilik`) + Destek (`#destek`), English section `#privacy` |
| `/billune/` | Privacy Policy (`#privacy`) + Support (`#support`), Turkish section `#gizlilik` / `#destek` |
| `/app-ads.txt` | `google.com, pub-9225214452759054, DIRECT, f08c47fec0942fa0` |
| `/sitemap.xml` | Sitemap for `/` and `/tr/` (with hreflang en/tr/x-default) and the six app pages |
| `site.js` | Small progressive-enhancement script for the home page (the page is readable with JS off) |
| `assets/` | Self-hosted fonts (SIL OFL), 3dicons illustrations (CC0), app icons from App Store artwork |
| `docs/design.md` | Design spec for the home page (tokens, layout, constraints) |

## Hosting
GitHub Pages from `main` (root), custom domain via `CNAME`. DNS at Cloudflare (registrar + DNS, **DNS only /
grey cloud**): four `A` records for `@` → `185.199.108-111.153`, `CNAME www → yusuffgull.github.io`. HTTPS is
enforced (certificate issued by GitHub; if it ever stalls, re-set the custom domain in the Pages settings).

## Editing rules
- Policy changes: bump the "Last updated" date on that page; keep the App Store Connect Privacy label in sync.
- The three ASC URLs per app: Support `/<app>/`, Marketing `/`, Privacy `/<app>/#privacy`.
- Home copy changes go into both `index.html` and `tr/index.html`.
- Contact email: yusuff.gull@icloud.com.
