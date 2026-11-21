# Design spec — yusuffiratgul.com (portfolio)

Source of truth for the 2026-11 redesign. Research basis: scrolltide.co, supahero.io,
navbar.gallery, footer.design, cta.gallery, styles.refero.design (Craft "warm paper"), 3dicons.co.

## Constraints
- Plain HTML + one `style.css` + one `site.js`. No build step, no frameworks, no CDN at runtime.
- App Store Connect URLs are frozen: `/<app>/`, `#privacy`, `#support`, `#gizlilik`, `#destek`,
  `/app-ads.txt`. Policy pages are **not edited**; they are restyled only through `style.css`
  (they use `.wrap`, `.top`, `.lead`, `.muted`, `.chips`, `table`, `.contact`, `footer`,
  `body.<app>` accent classes). Every homepage-only rule is scoped under `body.home`.
- Everything readable with JS off. All motion inside `@media (prefers-reduced-motion: no-preference)`.
- No "available for hire" claim (owner is employed full-time).

## Tokens
```
light                         dark
--paper   #fff3e7             #17120d
--card    #ffffff             #221b14
--ink     #030302             #f6ece0
--graphite#41413f             #c9bcae
--line    #e6d9c9             #3a3027
--accent  #ff4500             #ff6a33   (sparingly: links on hover, scan line, ✓, one CTA)
--mint    #9bd8a9   --marigold #fde99b   --peri #b8caf5   --blush #f7c6b5   --sand #ecd9bf
--mono    ui-monospace, "SF Mono", Menlo, Consolas, monospace
--serif   "Fraunces", Georgia, serif         (headings, ≥24px only, opsz auto)
--sans    "Figtree", system-ui, sans-serif    (body/UI)
radius: 20px cards, 12px small, 999px pills. shadow: 0 1px 0 rgba(3,3,2,.04), 0 12px 32px -18px rgba(3,3,2,.18)
spacing base 4px; section gap clamp(80px, 12vw, 128px); content max 1120px; text max 64ch
```
Per-app accents (light / dark pastel tile): sort-cafe `#f3d2b3`, merge-mine `#fde99b`,
bloom-blocks `#9bd8a9`, sekine `#a9dcd4`, neydi-neydi `#d5c6f2`, billune `#b8caf5`.
Policy pages keep `--accent` per app but use darker inks for AA text contrast.

Paper texture: one inline SVG `feTurbulence` noise as `background-image` on `body` at ~4% opacity
(data URI, <1KB). No gradients anywhere else.

## Signature: the ID-card hero
The owner builds eKYC (ID document NFC/OCR/MRZ, face match, liveness). The hero is a
**TD1-style identity card** rendered in HTML/CSS (not an image):

```
┌───────────────────────────────────────────────────────┐
│ REPUBLIC OF CODE · DEVELOPER ID           TUR  ▣ chip │
│ ┌──────┐  SURNAME / Soyadı       GÜL                   │
│ │ YFG  │  GIVEN NAMES / Adı      YUSUF FIRAT           │
│ │photo │  ROLE / Rol             BACKEND ENGINEER      │
│ └──────┘  ISSUED / Veriliş       2020 · SOFTTECH       │
│           ALSO                   6 APPS ON APP STORE   │
│ I<TURGUL<<YUSUF<FIRAT<<<<<<<<<<<<<<<<<<<<<<<<          │
│ BACKEND<ENG<<JAVA<SPRING<<IOS<SWIFT<<<<<<<<            │
│ 2020<<SOFTTECH<<ISTANBUL<<<<<<<<<<<<<<<<<<<<0          │
└───────────────────────────────────────────────────────┘
   [ Verify ▸ ]   → after run:  ✓ NFC  ✓ MRZ  ✓ FACE  ✓ LIVENESS
                                success rate  30% → 90%
```
- Markup: `<figure class="idcard">` with a `<dl>` for fields and `<pre class="mrz" aria-hidden="true">`
  for the MRZ (a visually-hidden sentence explains it). Photo slot = monogram "YFG" in Fraunces
  on a `--peri` tile with a faint guilloche (repeating-radial-gradient lines are allowed here as
  the only decorative pattern — it's the security print of a real card).
- Slight 3D: card has `transform: rotate(-2deg)`; on pointer move (desktop, motion allowed)
  tilt ±4° via CSS vars `--rx/--ry` set by JS.
- `Verify ▸` is a real `<button>`. On click: a 2px `--accent` scan line sweeps top→bottom
  (900ms), then the 4 checks appear one by one (120ms stagger), then the counter animates
  30 → 90 (%) over 800ms. `aria-live="polite"` region announces "Verification passed. Success
  rate raised from 30% to 90%." Button label becomes `Verify again ↺`.
- Reduced motion / no JS: checks and "30% → 90%" are rendered statically (default HTML state is
  the final state; JS resets to the "unverified" state only when it can animate).
- Card stays readable at 340px wide: MRZ font-size `clamp(9px, 2.6vw, 14px)`, `overflow:hidden`,
  letter-spacing .08em.

## Page structure (EN `/`, TR `/tr/` mirror; `<body class="home">`)
Section headers are document field labels: small mono caps `01 — EXPERIENCE / Deneyim`
then a Fraunces heading.

1. **Header** (sticky, paper bg, 1px bottom line when scrolled). Left: `yfg.` wordmark (Fraunces
   600) → `/`. Right: Work · Apps · Stack · Contact (text links) and `EN / TR` in mono
   (active underlined, `hreflang` links). Small mono status at far left under wordmark on
   desktop only: `IST · Softtech`. Mobile (<720px): links collapse into a text button `Menu`
   opening a full-screen `<dialog>` with big Fraunces links; EN/TR stays visible in the bar.
   Hide on scroll down, show on scroll up (JS, motion-allowed only).
2. **Hero** — two columns ≥960px (text left 5/12, card right 7/12), stacked on mobile (card
   second). Copy below.
3. **01 Experience** — Softtech timeline row + highlights as a numbered list with the metric
   pulled out big (`30% → 90%` in Fraunces). Then earlier work + Education as a quieter row.
4. **02 Apps** — intro line, then 6 cards stacked with `position: sticky; top: calc(80px + n*14px)`
   (n = index) so they pile up while scrolling (no JS needed; IntersectionObserver only adds a
   `.is-past` class that scales previous cards to .96 and dims them, motion-allowed only).
   Card: pastel tile left (app icon 96px rounded 22%, from `assets/apps/`), right: name,
   one-line pitch, spec sheet `<dl class="spec">` (mono labels, tabular-nums), links
   `Privacy & Support →` (`/<app>/`) and `App Store ↗` (only if a URL is known).
   On mobile the sticky stacking is disabled (plain list) below 720px.
5. **03 Stack** — four groups in a 2×2 grid, each a `<ul class="chips">` of text chips. One
   3dicon per group heading max (lock = backend/security, puzzle = mobile; clock/wallet only on
   Sekine/Billune cards if icons exist). Icons decorative: `alt=""`, `width/height`, `loading=lazy`.
6. **04 Contact** — huge Fraunces line `Let's talk.`; the email as a button that copies to
   clipboard (`navigator.clipboard`, label swaps to `Copied ✓` for 2s; falls back to `mailto:`
   when clipboard is unavailable — it's an `<a href="mailto:…">` enhanced by JS). Under it:
   `LinkedIn ↗` and one line about response time.
7. **Footer** — 3 columns: Pages / Apps (links to the 6 policy pages) / Elsewhere (LinkedIn,
   email). Mono line: `Istanbul — <time>14:32</time> (UTC+3)` updated each 30s via
   `Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Istanbul',hour:'2-digit',minute:'2-digit'})`.
   Colophon: `Hand-written HTML & CSS. No build step, no trackers. Set in Fraunces & Figtree.
   Hosted on GitHub Pages. Updated November 2026.` Then the oversized wordmark
   `yusuf fırat gül` (`font-size: clamp(3.5rem, 15vw, 14rem); line-height:.8`, clipped at the
   bottom with overflow hidden on the footer).

## EN copy (final — use verbatim)
- `<title>` Yusuf Fırat Gül — Backend engineer & iOS maker
- meta description: Software engineer at Softtech in Istanbul building Java/Spring identity
  verification (eKYC) services for banks, insurers and fintechs. Also ships six iOS apps.
- Hero eyebrow (mono): `SOFTWARE ENGINEER · ISTANBUL`
- Hero H1: `I build the part of the bank app that checks you're really you.`
- Hero lede: `Backend engineer at Softtech since 2020 — Java 21 and Spring Boot microservices for
  remote onboarding: NFC chip reading, OCR/MRZ, face recognition and liveness. After hours I
  design and ship small iOS apps.`
- Hero links: `See the work ↓` (#work) · `Apps ↓` (#apps)

**01 Experience** — heading `Six years in identity verification and banking.`
- Row: `Softtech` · `Software Engineer, full-time` · `Sep 2020 — present` · `Istanbul`
- Pulled metric: `30% → 90%` caption `verification success rate after I redesigned the
  flow — face-recognition retries and fuzzy MRZ/OCR matching.`
- Highlights (`<ol>`):
  1. `Java 21 / Spring Boot 3 microservices for remote customer onboarding and eKYC, used by
     banking, insurance and fintech clients.`
  2. `Built and stabilised a GPU-accelerated OCR service on multi-GPU Linux servers (CUDA,
     cuDNN, multiprocessing) and wired it into the Java services.`
  3. `Leading the SQL Server table-partitioning migration of the production database.`
  4. `Monitoring and performance-panel REST APIs — paginated, dynamically filtered with the JPA
     Criteria API, portable across PostgreSQL and SQL Server.`
  5. `UAT and client work through go-live: requirement clarification, defect triage, SQL
     migration scripts, error-analysis reports.`
  6. `TDD with JUnit, Mockito and TestNG; shipped through Jenkins, XL Release, Docker and
     Kubernetes/Helm; CVE remediation from SBOM scans.`
- Earlier at Softtech: `Backend services for leasing and factoring, investment and open-banking
  products — Java, Spring, REST, MSSQL, Elasticsearch/Kibana.`
- Education: `Trakya University — B.Sc. Computer Engineering, 2015–2020. GDG Edirne,
  Trakya University IT & Technology Club.`

**02 Apps** — heading `Six apps, built and shipped on my own.` intro `Designed, coded,
localised and supported end to end. Each one keeps your data on your device.`
| slug | name | pitch | spec (Platform / Built with / Data / Revenue / Notable) |
|---|---|---|---|
| sekine | Sekine | Prayer times and adhan, on iPhone, Apple Watch and the lock screen. | iOS 17 · watchOS 10 / SwiftUI, Adhan / App Group defaults, offline / StoreKit 2, no ads / WidgetKit (StandBy, lock screen), Iftar Live Activity, background refresh, time-sensitive alerts · TR, EN |
| billune | Billune | Subscription and bill tracker that never leaves your phone. | iOS · Android / React Native, Expo Router, TypeScript / SQLite + Drizzle, offline-first / One-time unlock / Local reminders, dark mode · EN, TR |
| neydi-neydi | Neydi Neydi? | A Turkish definition-and-word game for 2–4 friends on one phone. | iOS 17 / SwiftUI, no third-party UI / On-device / AdMob + StoreKit / 1,905 original clues, pass-the-phone turns, letter hints cost points |
| sort-cafe | Sort Café | A cosy coffee-sorting puzzle. | iOS 17 · iPad / SwiftUI, shared PortfolioCore package / On-device / AdMob + StoreKit 2 / Daily rewards, café decor |
| merge-mine | Merge Mine | Merge gems, dig deeper. | iOS 17 · iPad / SwiftUI, PortfolioCore / On-device / AdMob + StoreKit 2 / Mine upgrades, tiers, daily reward streak |
| bloom-blocks | Bloom Blocks | A calm block puzzle that grows a garden. | iOS 17 · iPad / SwiftUI, PortfolioCore / On-device / AdMob + StoreKit 2 / Unlockable garden themes, coins, opt-in rescues |

**03 Stack** — heading `What I work with.`
- Backend: Java 21 · Spring Boot 3 · Spring Data JPA · Criteria API · REST · SQL Server · PostgreSQL · Elasticsearch · Kibana
- Delivery & infra: Docker · Kubernetes · Helm · Jenkins · XL Release · Linux · CUDA / cuDNN · SBOM / CVE scanning
- Quality: TDD · JUnit · Mockito · TestNG · UAT
- Apple & mobile: Swift · SwiftUI · WidgetKit · ActivityKit · StoreKit 2 · watchOS · XcodeGen · React Native · Expo · TypeScript

**04 Contact** — `Let's talk.` sub: `About backend work, identity verification, or one of the
apps. I usually reply within two days.` button: `yusuff.gull@icloud.com` · link
`LinkedIn ↗` → https://www.linkedin.com/in/yusuf-firat-gul/

## TR copy
Translate the EN copy naturally (not literally); keep product and tech names in English.
H1: `Banka uygulamasında "gerçekten sen misin?" diye soran kısmı yazıyorum.`
Section labels: Deneyim · Uygulamalar · Teknolojiler · İletişim. CTA: `Konuşalım.`
`<html lang="tr">`, Intl locale `tr-TR`, clipboard label `Kopyalandı ✓`.

## App Store links (verified via iTunes lookup, seller YUSUF FIRAT GUL, 2026-11-21)
Use storefront-neutral URLs. Billune is **not on the App Store** → no App Store link on its card.
- sort-cafe → https://apps.apple.com/app/id6802574022
- merge-mine → https://apps.apple.com/app/id6806251107
- bloom-blocks → https://apps.apple.com/app/id6810299019
- sekine → https://apps.apple.com/app/id6796900944
- neydi-neydi → https://apps.apple.com/app/id6824321948
Icons: `assets/apps/<slug>.webp` (256px; none for billune → use a `--peri` tile with "B" monogram
in Fraunces). Theme icons: `assets/icons/{lock,puzzle,clock,wallet}.webp` (240px, CC0).
Fonts: `assets/fonts/{fraunces,figtree}-latin{,-ext}.woff2`, unicode-ranges in `assets/fonts/ranges.txt`
(variable wght; Fraunces 300–700, Figtree 400–700; no opsz axis — don't use font-variation opsz).
