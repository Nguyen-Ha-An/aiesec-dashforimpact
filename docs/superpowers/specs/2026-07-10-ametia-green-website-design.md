# Ametia Green — Website Prototype Design

Date: 2026-07-10
Status: Approved by user, pending implementation plan

## 1. Purpose & scope

A static, informational prototype website for **Ametia Green**, a sustainable-leaning
capsule fashion line for young Vietnamese office workers. The site presents the brand,
7 products, and a simulated "green ecosystem" (packaging concept, production journey,
gamified loyalty passport, and an impact fund). No backend, no real auth, no real
payments, no external APIs. Fully static, deployed to GitHub Pages.

Not in scope: real user accounts, real payments/wallets, a real points ledger, a CMS,
or any server-side logic. Every "interactive" surface is either a client-side-only
simulation (event RSVP modal) or a static illustrative mockup (Green Passport, Green
Loop Fund).

## 2. Project location & repo

- New standalone directory: `~/Desktop/ametia-green-website` (own git repo, fully
  decoupled from the unrelated VPRC-Website Next.js codebase currently checked out at
  `~/Desktop/VPRC-Website-main`).
- Remote: `https://github.com/Nguyen-Ha-An/aiesec-dashforimpact.git` (confirmed empty
  before starting). Default branch `main`.
- Git identity for commits: `An Nguyen <89681531+Nguyen-Ha-An@users.noreply.github.com>`
  (matches the GitHub account associated with the remote).
- Final deployed URL: `https://nguyen-ha-an.github.io/aiesec-dashforimpact/`
  (a GitHub Pages *project* site, not a `username.github.io` root site — this drives the
  `base` path handling described in §7).
- GitHub Pages will be switched to "GitHub Actions" source via `gh api` once the
  workflow is pushed (user opted for this to be automatic).

## 3. Tech stack

- **Astro** + TypeScript, static output (`output: 'static'`, default).
- Plain, hand-written **CSS** (no Tailwind, no component framework) using CSS custom
  properties for design tokens. Mobile-first responsive breakpoints.
- **`astro-icon`** + **`@iconify-json/ph`** (Phosphor icon set) for all iconography —
  bundled at build time, zero runtime network calls, so it doesn't violate the "no
  external API" requirement while avoiding hand-rolled icon SVGs.
- **Self-hosted fonts**: Be Vietnam Pro (display + body, full Vietnamese diacritic
  coverage) and JetBrains Mono (SKU codes / QR labels / small tags), vendored as static
  font files under `public/fonts/`, loaded via `@font-face` with `font-display: swap`.
  No Google Fonts `<link>` in production.
- No client-side framework (no React/Vue). Any interactivity (event RSVP modal, QR
  simulation reveal, mobile nav toggle) is vanilla TypeScript in `<script>` tags scoped
  per Astro component.
- All product/event/fund data lives in typed TypeScript modules under `src/data/`.

## 4. Visual design system

Brief inference: premium-consumer editorial/informational site, minimalist-premium and
calm, not fast-fashion. Dial values: `DESIGN_VARIANCE 6` (offset/asymmetric but
restrained), `MOTION_INTENSITY 4` (fluid CSS transitions + scroll-reveal via
IntersectionObserver, no scroll-hijacking, no pinned choreography — consistent with the
"static, non-interactive" decision for the Green Passport), `VISUAL_DENSITY 3`
(art-gallery airy, generous whitespace, large imagery blocks).

**Palette** (CSS custom properties in `src/styles/tokens.css`):

| Token | Hex | Use |
|---|---|---|
| `--color-cream` | `#F4F0E6` | Page background |
| `--color-cream-card` | `#FAF8F2` | Card / raised surface background |
| `--color-moss` | `#445939` | Primary accent, links, primary CTA |
| `--color-moss-dark` | `#34432C` | Hover/active state for primary accent |
| `--color-sage` | `#B7C9A0` | Secondary accent, tags, highlight fills |
| `--color-coffee` | `#5B4632` | Tertiary accent, dividers, secondary borders |
| `--color-charcoal` | `#23221D` | Primary text, dark surfaces |
| `--color-charcoal-soft` | `#55534A` | Secondary/muted text |

One accent (moss green) used consistently as the primary interactive color across the
whole site (Color Consistency Lock). One corner-radius scale: cards/images `12px`,
buttons `999px` (pill), inputs `8px` (Shape Consistency Lock). Dark mode: charcoal-based
surfaces with the same accent, respecting `prefers-color-scheme`.

**Typography**: Be Vietnam Pro for headings and body (weights 400/500/600/700).
Headline scale `clamp(2rem, 5vw, 3.25rem)` for hero, standard modular scale below that.
Body max-width `65ch`. JetBrains Mono only for SKU codes, QR captions, and small
meta-tags — never for body copy.

**Layout discipline**: asymmetric split hero on the homepage (not centered). No two
consecutive sections share the same layout family; max 2 consecutive image/text
zigzags anywhere. The 4-step ecosystem summary on the homepage is a 4-cell asymmetric
bento (exactly 4 cells, no filler). `/he-sinh-thai/` uses 4 distinct layout families
for its 4 steps (asymmetric image+text once, horizontal process timeline, tiered
membership cards, stat/metric showcase) so the page doesn't read as templated
repetition.

**Images**: no image-generation tool is available in this session and the user will
supply real product photography later, matched by filename convention. Rather than
hotlinking stock photography (would violate the "no external API" requirement), all
placeholder visuals are hand-built abstract SVG/CSS compositions in the brand palette
(botanical line motifs, gradient textures) via a reusable `<PlaceholderArt>` component
that also renders the exact expected filename as a caption in an eye-catching but
clearly-a-placeholder way. See §9 for the image directory convention and README.

**Accessibility**: WCAG AA contrast on all text/buttons/forms, `prefers-reduced-motion`
respected for all transitions above dial threshold, semantic landmarks
(`<nav>`, `<main>`, `<footer>`), alt text on every image/placeholder, focus-visible
states styled explicitly (not suppressed).

## 5. Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero (slogan "Mặc lâu hơn. Chọn rõ hơn."), short brand intro, 7-product grid, 4-step ecosystem bento preview, CTA to `/he-sinh-thai/` |
| `/gioi-thieu/` | Brand positioning: responsible applied fashion for young professionals, easy to mix-and-match, built to last, transparent sourcing |
| `/he-sinh-thai/` | The 4-step ecosystem in depth: Mở khóa (packaging concept), Khám phá (sourcing → production → cutting/finishing → packaging/shipping), Tham gia (Green Passport simulation, 3 tiers), Lan tỏa (Green Loop Fund preview) |
| `/su-kien/` | Workshop / clothing take-back event listing, card grid, simulated RSVP modal |
| `/ho-chieu-xanh/` | Full simulated customer passport profile: tier, badges, journey milestones, prioritized care/repair/return/community actions |
| `/green-loop-fund/` | Illustrative fund balance, per-project progress, weekly update log — all labeled "Dữ liệu minh họa cho prototype" |
| `/san-pham/<slug>/` × 7 | One page per product (see §6) |
| `/404` | Custom not-found page, on-brand, links back to `/` |

All 7 product slugs: `ao-thun-form-rong`, `ao-so-mi-tay-ngan`, `ao-khoac-mong`,
`quan-dai-ong-suong`, `quan-short`, `tui-tote`, `mu-luoi-trai`.

## 6. Product data model & content

`src/data/products.ts` exports a typed `Product[]`. Fields per product: `slug, name,
price, sku, materials (string, verbatim from the source pricing table), features[],
care[], timeline: {stage, description}[], story: {title, body[]}` (material-journey
narrative, per user's chosen storytelling frame — each story is told from the material's
point of view: where it came from, why it was chosen, how it became this product).

Ground-truth pricing/material table (already provided by user, used verbatim):

1. Áo thun form rộng — 599.000 VNĐ — 60% bông hữu cơ & 40% sợi bã cà phê tái chế, mềm
   mại, thấm hút mồ hôi, khử mùi tự nhiên và chống tia UV.
2. Áo sơ mi tay ngắn — 699.000 VNĐ — 100% cotton hữu cơ, chất vải nhẹ, thoáng khí.
3. Áo khoác mỏng — 1.190.000 VNĐ — 100% polyester tái chế, trọng lượng nhẹ, chống gió
   và chống nhăn.
4. Quần dài ống suông — 990.000 VNĐ — 100% polyester tái chế, bền, nhanh khô và dễ bảo
   quản.
5. Quần short — 799.000 VNĐ — 100% polyester tái chế, co giãn nhẹ.
6. Túi tote — 299.000 VNĐ — Canvas tái chế, chịu lực tốt.
7. Mũ lưỡi trai — 269.000 VNĐ — 100% cotton hữu cơ, kiểu dáng tối giản, dễ phối với
   nhiều trang phục.

Every unverified claim (e.g. "khử mùi tự nhiên", "chống tia UV") is rendered with a
visible "Thông tin mô phỏng" label per the user's requirement, since these are prototype
claims, not certified product claims.

Each product page includes: hero image slot + name/price, materials, usage features,
care instructions (grouped icon list, not a bare bulleted list), a production journey
timeline component seeded from `timeline[]` and narrated with the product's `story`,
the SKU, a "Quét QR để khám phá" button, and a `<QrSimulator>` that renders a
generated QR-look SVG pattern plus the page's own canonical URL as text (no external QR
generation API).

## 7. Deploy & GitHub Pages base path

`astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://nguyen-ha-an.github.io',
  base: '/aiesec-dashforimpact/',
});
```
All internal links and asset references go through a small `withBase()` helper (backed
by `import.meta.env.BASE_URL`) so nothing breaks when served from a repo subpath instead
of domain root.

`.github/workflows/deploy-pages.yml`: triggers on push to `main`; job steps —
`actions/checkout`, `actions/setup-node` (Node 20, npm cache), `npm ci`,
`npm run build`, `actions/configure-pages`, `actions/upload-pages-artifact` (path
`dist`), `actions/deploy-pages`. Permissions: `contents: read`, `pages: write`,
`id-token: write`. Concurrency group `pages` with `cancel-in-progress: false`.

Before the first push, `npm run build` is run locally and must succeed. After pushing,
Pages source is switched to "GitHub Actions" via `gh api -X POST
repos/Nguyen-Ha-An/aiesec-dashforimpact/pages -f build_type=workflow` (per user's
choice to automate this step).

## 8. Simulated interactivity (explicitly non-persistent, no network calls)

- **Event RSVP** (`/su-kien/`): clicking "Đăng ký" opens a modal confirming a simulated
  registration; no `fetch`, no form POST, closes on confirm/cancel.
- **Green Passport** (`/ho-chieu-xanh/`, and the preview in `/he-sinh-thai/`): fully
  static display of one sample profile (fixed tier, fixed badge/progress data) — no
  buttons that mutate state, per user's explicit choice for a simpler, safer static
  mockup over a localStorage-backed demo.
- **QR simulation**: static generated SVG pattern + visible URL text, not a scannable
  real QR encoder, captioned "Mô phỏng — dẫn đến URL sản phẩm này".

## 9. Image handling

- `public/images/products/<slug>.jpg` — one real photo per product, to be supplied by
  the user later. Until present, `<PlaceholderArt slug="...">` renders an abstract
  on-brand SVG placeholder with the exact expected filename visibly captioned.
- `public/images/events/<event-slug>.jpg` — same convention for event cards.
- A `public/images/README.md` documents the full expected file list (all 7 product
  slugs + event slugs), required aspect ratio/dimensions, and states explicitly: do not
  regenerate, crop, or re-encode any photo the user supplies — drop it in as-is.

## 10. Out of scope / explicit non-claims

- No absolute/unverified environmental claims ("phân hủy hoàn toàn", "không nhựa",
  "100% bền vững"). Anything not independently verifiable is labeled "Thông tin mô
  phỏng" or "Dữ liệu minh họa cho prototype".
- No real backend, database, auth, payment, Apple/Google Wallet, or points ledger.
- No third-party analytics, fonts-by-CDN, image CDNs, or QR-generation APIs.
