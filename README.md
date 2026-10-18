# yusuffiratgul.com

Static site for Yusuf Fırat Gül's apps: privacy policy + support pages (linked from App Store Connect),
`app-ads.txt` for AdMob, and a small home page. Plain HTML/CSS, no build step.

| Path | Purpose |
|---|---|
| `/` | Home, app list, contact |
| `/sort-cafe/` `/merge-mine/` `/bloom-blocks/` | Privacy Policy (`#privacy`) + Support (`#support`) |
| `/neydi-neydi/` | Gizlilik (`#gizlilik`) + Destek (`#destek`), English section `#privacy` |
| `/sekine/` | Gizlilik (`#gizlilik`) + Destek (`#destek`), English section `#privacy` |
| `/app-ads.txt` | `google.com, pub-9225214452759054, DIRECT, f08c47fec0942fa0` |

## Hosting
GitHub Pages from `main` (root), custom domain via `CNAME`. DNS at Cloudflare (registrar + DNS, **DNS only /
grey cloud**): four `A` records for `@` → `185.199.108-111.153`, `CNAME www → yusuffgull.github.io`. HTTPS is
enforced (certificate issued by GitHub; if it ever stalls, re-set the custom domain in the Pages settings).

## Editing rules
- Policy changes: bump the "Last updated" date on that page; keep the App Store Connect Privacy label in sync.
- The three ASC URLs per app: Support `/<app>/`, Marketing `/`, Privacy `/<app>/#privacy`.
- Contact email: yusuff.gull@icloud.com.
