# Ametia Green Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a fully functional, static Astro + TypeScript prototype website for Ametia Green (13 routes, 7 product pages, simulated interactivity) and deploy it to GitHub Pages via GitHub Actions.

**Architecture:** Astro static site generation, no client framework. Vanilla TypeScript for the handful of interactive widgets (nav toggle, RSVP modal). All content data lives in typed `src/data/*.ts` modules consumed by pages/components. Vitest + Astro's Container API test data integrity and key rendered content per page.

**Tech Stack:** Astro 7.0, TypeScript, astro-icon 1.1 + @iconify-json/ph 1.2 (Phosphor icons), Vitest 4.1, self-hosted Be Vietnam Pro + JetBrains Mono fonts (already vendored under `public/fonts/`), hand-written CSS with custom properties.

## Global Constraints

- Static output only (`output: 'static'`); no server, no database, no real auth/payment.
- `astro.config.mjs`: `site: 'https://nguyen-ha-an.github.io'`, `base: '/aiesec-dashforimpact/'`. Every internal `<a href>`/asset path goes through the `withBase()` helper (Task 2).
- No external API calls at runtime (fonts self-hosted, icons bundled at build time, QR is a generated SVG pattern, not a real encoder/API).
- All visible content in Vietnamese.
- No absolute/unverified environmental claims. Any unverifiable claim ("khử mùi tự nhiên", "chống tia UV", "chống nhăn", etc., taken from the source pricing table) or simulated data must carry a visible "Thông tin mô phỏng" or "Dữ liệu minh họa cho prototype" label.
- Palette tokens: `--color-cream #F4F0E6`, `--color-cream-card #FAF8F2`, `--color-moss #445939`, `--color-moss-dark #34432C`, `--color-sage #B7C9A0`, `--color-coffee #5B4632`, `--color-charcoal #23221D`, `--color-charcoal-soft #55534A`.
- Mobile-first CSS, breakpoints `600px` / `900px` / `1200px`.
- Product ground-truth data (name, price, materials) is copied verbatim from the user-supplied pricing table — never altered.
- Product images: `public/images/products/<slug>.jpg`, not yet supplied by user. `<PlaceholderArt>` renders until real files land; nothing regenerates or crops a user-supplied photo.

## File Structure

```
ametia-green-website/
  astro.config.mjs
  package.json
  tsconfig.json
  vitest.config.ts
  public/
    fonts/                     (already vendored)
    images/products/README.md
    images/events/README.md
  src/
    lib/
      base.ts                  withBase() helper
      qrPattern.ts              deterministic SVG QR-look generator
    data/
      products.ts               7 products, typed
      events.ts                 sample workshop/take-back events
      fund.ts                   Green Loop Fund sample data
    styles/
      tokens.css                design tokens (colors, spacing, radii, type scale)
      fonts.css                 @font-face rules -> public/fonts
      global.css                base element styles, utility classes
    components/
      Layout.astro
      Header.astro
      Footer.astro
      ProductCard.astro
      ProductTimeline.astro
      PlaceholderArt.astro
      QrSimulator.astro
      EventCard.astro
      PassportTierCard.astro
      FundProjectProgress.astro
      MissionBadge.astro
    pages/
      index.astro
      gioi-thieu/index.astro
      he-sinh-thai/index.astro
      su-kien/index.astro
      ho-chieu-xanh/index.astro
      green-loop-fund/index.astro
      san-pham/[slug].astro
      404.astro
  tests/
    unit/base.test.ts
    unit/qrPattern.test.ts
    unit/products-data.test.ts
    render/pages.test.ts        Astro Container API render + assertions
  .github/workflows/deploy-pages.yml
```

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `vitest.config.ts`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm run test`, `npm run check` scripts available to every later task.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "ametia-green-website",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^7.0.7",
    "astro-icon": "^1.1.5",
    "@iconify-json/ph": "^1.2.2"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.9",
    "typescript": "^5.7.3",
    "vitest": "^4.1.10"
  }
}
```

Note: `typescript` is pinned to the `^5.7.3` line (not the `7.x` preview line `npm view` returned) because `@astrojs/check` and Astro 7's tooling target TS 5.x; this is a deliberate downgrade from "latest," not an oversight.

- [ ] **Step 2: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nguyen-ha-an.github.io',
  base: '/aiesec-dashforimpact/',
  output: 'static',
  trailingSlash: 'always',
});
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*", "tests/**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

- [ ] **Step 4: Write `.gitignore`**

```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 5: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
```

- [ ] **Step 6: Install and verify dev server boots**

Run: `npm install && npx astro --version`
Expected: prints an Astro version string, no error.

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore vitest.config.ts package-lock.json
git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Design tokens, fonts, base-path helper

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/fonts.css`, `src/styles/global.css`, `src/lib/base.ts`
- Test: `tests/unit/base.test.ts`

**Interfaces:**
- Produces: `withBase(path: string): string` — exported from `src/lib/base.ts`, prefixes a root-relative path with `import.meta.env.BASE_URL`, collapsing any double slash. Every later `.astro` file's internal links and non-`public/fonts` asset refs use this.
- Produces: CSS custom properties consumed by every component: `--color-cream`, `--color-cream-card`, `--color-moss`, `--color-moss-dark`, `--color-sage`, `--color-coffee`, `--color-charcoal`, `--color-charcoal-soft`, `--font-display`, `--font-body`, `--font-mono`, `--radius-card` (12px), `--radius-pill` (999px), `--radius-input` (8px), `--space-1` through `--space-8` (4px base scale).

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/base.test.ts
import { describe, it, expect } from 'vitest';
import { withBase } from '../../src/lib/base';

describe('withBase', () => {
  it('prefixes a root-relative path with the configured base', () => {
    expect(withBase('/gioi-thieu/')).toBe('/aiesec-dashforimpact/gioi-thieu/');
  });

  it('collapses a double slash when path already starts with the base', () => {
    expect(withBase('/')).toBe('/aiesec-dashforimpact/');
  });

  it('handles nested paths without a leading slash', () => {
    expect(withBase('san-pham/tui-tote/')).toBe('/aiesec-dashforimpact/san-pham/tui-tote/');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/base.test.ts`
Expected: FAIL — `Cannot find module '../../src/lib/base'`

- [ ] **Step 3: Write `src/lib/base.ts`**

```ts
const BASE = '/aiesec-dashforimpact/';

export function withBase(path: string): string {
  const trimmed = path.replace(/^\/+/, '');
  if (trimmed === '') return BASE;
  return `${BASE}${trimmed}`.replace(/([^:])\/{2,}/g, '$1/');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/base.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Write `src/styles/tokens.css`**

```css
:root {
  --color-cream: #F4F0E6;
  --color-cream-card: #FAF8F2;
  --color-moss: #445939;
  --color-moss-dark: #34432C;
  --color-sage: #B7C9A0;
  --color-coffee: #5B4632;
  --color-charcoal: #23221D;
  --color-charcoal-soft: #55534A;

  --font-display: 'Be Vietnam Pro', system-ui, sans-serif;
  --font-body: 'Be Vietnam Pro', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --radius-card: 12px;
  --radius-pill: 999px;
  --radius-input: 8px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-cream: #23221D;
    --color-cream-card: #2B2A24;
    --color-charcoal: #F4F0E6;
    --color-charcoal-soft: #C9C6BA;
    --color-sage: #8FA377;
  }
}
```

- [ ] **Step 6: Write `src/styles/fonts.css`**

```css
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-400-vn.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-400-la.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-500-vn.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-500-la.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-600-vn.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-600-la.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-700-vn.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
@font-face {
  font-family: 'Be Vietnam Pro';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/be-vietnam-pro-700-la.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122;
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/jetbrains-mono-400-vn.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/jetbrains-mono-400-la.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122;
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/jetbrains-mono-500-vn.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/aiesec-dashforimpact/fonts/jetbrains-mono-500-la.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122;
}
```

Note: `src` uses a hardcoded `/aiesec-dashforimpact/` prefix rather than `withBase()` because CSS `url()` cannot call a TS helper — this is the one place the base path is duplicated, and it must stay in sync with `astro.config.mjs`'s `base` value.

- [ ] **Step 7: Write `src/styles/global.css`** (base element resets, container utility, button/link styles, focus-visible ring, `prefers-reduced-motion` guard)

```css
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--color-cream);
  color: var(--color-charcoal);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
}
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 var(--space-3);
}
p { margin: 0 0 var(--space-4); max-width: 65ch; }
a { color: var(--color-moss); }
img, svg { max-width: 100%; display: block; }
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4);
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border-radius: var(--radius-pill);
  padding: var(--space-3) var(--space-5);
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;
}
.btn:active { transform: scale(0.98); }
.btn-primary { background: var(--color-moss); color: var(--color-cream-card); }
.btn-primary:hover { background: var(--color-moss-dark); }
.btn-secondary { background: transparent; color: var(--color-moss); border-color: var(--color-moss); }
:focus-visible { outline: 2px solid var(--color-moss); outline-offset: 2px; }
.mock-label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: var(--color-sage);
  color: var(--color-charcoal);
  border-radius: var(--radius-input);
  padding: 2px 8px;
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
@media (min-width: 600px) { .container { padding-inline: var(--space-6); } }
```

- [ ] **Step 8: Commit**

```bash
git add src/styles src/lib tests/unit/base.test.ts
git commit -m "feat: design tokens, self-hosted fonts, base-path helper"
```

---

### Task 3: Layout shell (Header, Footer, Layout)

**Files:**
- Create: `src/components/Layout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`

**Interfaces:**
- Consumes: `withBase()` from Task 2, CSS tokens from Task 2.
- Produces: `Layout.astro` props `{ title: string; description: string }`, wraps a `<slot />` with `<Header />` + `<main>` + `<Footer />`. Every page task wraps its content in this.

- [ ] **Step 1: Write `src/components/Header.astro`** — logo/wordmark link to `/`, nav links to all 6 top-level routes plus `/su-kien/`, mobile hamburger toggle (vanilla `<script>`, toggles a `.is-open` class, aria-expanded), nav renders on one line at desktop (`max-height: 72px`).

- [ ] **Step 2: Write `src/components/Footer.astro`** — brand blurb, secondary nav, "Dữ liệu minh họa cho prototype. Không thu thập thông tin cá nhân." disclosure line, current year.

- [ ] **Step 3: Write `src/components/Layout.astro`**

```astro
---
import Header from './Header.astro';
import Footer from './Footer.astro';
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} · Ametia Green</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Manual verify**

Run: `npm run dev`, open `/aiesec-dashforimpact/` in a browser (once Task 10 adds `index.astro`; for now, verify no build error with a throwaway `src/pages/index.astro` that just renders `<Layout title="Test" description="Test"><p>ok</p></Layout>`).

- [ ] **Step 5: Commit**

```bash
git add src/components/Layout.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: shared Layout, Header, Footer"
```

---

### Task 4: Icon setup + PlaceholderArt

**Files:**
- Create: `src/components/PlaceholderArt.astro`
- Modify: `astro.config.mjs` (add `astro-icon` integration)

**Interfaces:**
- Produces: `<Icon name="ph:leaf" />` usable anywhere via `astro-icon`.
- Produces: `<PlaceholderArt seed={string} caption={string} expectedFile={string} aspect={'square'|'portrait'|'wide'} />` — deterministic abstract botanical SVG (derived from `seed` so each product/section gets a distinct but stable placeholder), with `expectedFile` rendered as a small caption chip.

- [ ] **Step 1: Add integration to `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://nguyen-ha-an.github.io',
  base: '/aiesec-dashforimpact/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [icon()],
});
```

- [ ] **Step 2: Write `src/components/PlaceholderArt.astro`** — uses a small deterministic hash of `seed` to pick a hue-rotate/pattern-offset within the brand palette so the same product always renders the same placeholder, draws 2-3 overlapping organic blob/leaf `<path>` shapes plus a dashed border, and overlays a `.mock-label`-styled `<figcaption>` reading `Ảnh mẫu — thay bằng {expectedFile}`.

- [ ] **Step 3: Manual verify** — drop `<PlaceholderArt seed="ao-thun-form-rong" caption="Áo thun form rộng" expectedFile="ao-thun-form-rong.jpg" aspect="portrait" />` into the throwaway test page from Task 3, confirm it renders an SVG with visible caption text.

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/components/PlaceholderArt.astro package.json package-lock.json
git commit -m "feat: astro-icon integration and PlaceholderArt component"
```

---

### Task 5: Product data + material-journey stories

**Files:**
- Create: `src/data/products.ts`
- Test: `tests/unit/products-data.test.ts`

**Interfaces:**
- Produces:
```ts
export interface ProductTimelineStep { stage: string; description: string; }
export interface ProductStory { title: string; paragraphs: string[]; }
export interface Product {
  slug: string;
  name: string;
  priceVnd: number;       // e.g. 599000
  sku: string;            // e.g. "AG-ATH-001"
  materials: string;       // verbatim from source table
  features: string[];
  care: string[];
  timeline: ProductTimelineStep[];
  story: ProductStory;
}
export const products: Product[];
export function getProductBySlug(slug: string): Product | undefined;
```
- The 7 `slug` values are exactly: `ao-thun-form-rong`, `ao-so-mi-tay-ngan`, `ao-khoac-mong`, `quan-dai-ong-suong`, `quan-short`, `tui-tote`, `mu-luoi-trai` — later tasks (routing, `getStaticPaths`) depend on this exact set.

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/products-data.test.ts
import { describe, it, expect } from 'vitest';
import { products, getProductBySlug } from '../../src/data/products';

const EXPECTED_SLUGS = [
  'ao-thun-form-rong', 'ao-so-mi-tay-ngan', 'ao-khoac-mong',
  'quan-dai-ong-suong', 'quan-short', 'tui-tote', 'mu-luoi-trai',
];

describe('products data', () => {
  it('has exactly 7 products with the expected slugs', () => {
    expect(products).toHaveLength(7);
    expect(products.map((p) => p.slug).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it('matches the source pricing table exactly', () => {
    expect(getProductBySlug('ao-thun-form-rong')?.priceVnd).toBe(599000);
    expect(getProductBySlug('ao-so-mi-tay-ngan')?.priceVnd).toBe(699000);
    expect(getProductBySlug('ao-khoac-mong')?.priceVnd).toBe(1190000);
    expect(getProductBySlug('quan-dai-ong-suong')?.priceVnd).toBe(990000);
    expect(getProductBySlug('quan-short')?.priceVnd).toBe(799000);
    expect(getProductBySlug('tui-tote')?.priceVnd).toBe(299000);
    expect(getProductBySlug('mu-luoi-trai')?.priceVnd).toBe(269000);
  });

  it('every product has a non-empty story with at least 3 paragraphs, a timeline with at least 4 stages, and a unique SKU', () => {
    const skus = new Set<string>();
    for (const p of products) {
      expect(p.story.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(p.timeline.length).toBeGreaterThanOrEqual(4);
      expect(p.materials.length).toBeGreaterThan(0);
      skus.add(p.sku);
    }
    expect(skus.size).toBe(7);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/products-data.test.ts`
Expected: FAIL — `Cannot find module '../../src/data/products'`

- [ ] **Step 3: Write `src/data/products.ts`**

Populate all 7 products with the exact verbatim materials/price from the source table (§6 of the design spec). Each `story` is told from the material's point of view (material-journey frame, per the user's chosen narrative direction): where the fiber/material originated, why Ametia Green chose it, how it was transformed into fabric, and how it became this specific product — 3-5 short paragraphs, no absolute environmental claims, ending any unverified claim with a `[mô phỏng]` marker the UI renders as a `.mock-label`. Each `timeline` has 5 stages matching the production journey described in the spec: `Nguồn nguyên liệu`, `Dệt & xử lý vải`, `Cắt may`, `Hoàn thiện & kiểm tra`, `Đóng gói & vận chuyển`, each with a 1-2 sentence description specific to that product's materials. `sku` format: `AG-<3-letter product code>-001` (e.g. `AG-ATR-001` for áo thun form rộng, `AG-SMI-001` for áo sơ mi, `AG-KHM-001` áo khoác mỏng, `AG-QDS-001` quần dài ống suông, `AG-QSH-001` quần short, `AG-TUI-001` túi tote, `AG-MLT-001` mũ lưỡi trai). `features` (3-4 bullets) come from the materials description (e.g. "thấm hút mồ hôi", "chống gió", "co giãn nhẹ"). `care` (3-4 bullets) are realistic garment-care instructions appropriate to the material (e.g. cotton-blend → "giặt máy ở 30°C", "không dùng thuốc tẩy"; recycled polyester outerwear → "lau sạch bằng khăn ẩm", "phơi nơi thoáng, tránh ánh nắng trực tiếp").

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/products-data.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/products.ts tests/unit/products-data.test.ts
git commit -m "feat: product data with material-journey stories for all 7 products"
```

---

### Task 6: Events and Fund data

**Files:**
- Create: `src/data/events.ts`, `src/data/fund.ts`

**Interfaces:**
- Produces (`events.ts`):
```ts
export interface AmetiaEvent {
  slug: string; name: string; date: string; location: string;
  description: string; status: 'sap-dien-ra' | 'dang-mo-dang-ky' | 'da-ket-thuc';
  imageSlug: string;
}
export const events: AmetiaEvent[]; // 4-5 illustrative workshop / take-back events
```
- Produces (`fund.ts`):
```ts
export interface FundProject { name: string; description: string; goalVnd: number; raisedVnd: number; }
export interface FundWeekUpdate { weekLabel: string; note: string; }
export interface GreenLoopFundData {
  balanceVnd: number; itemsCollected: number; projects: FundProject[]; weeklyUpdates: FundWeekUpdate[];
}
export const fundData: GreenLoopFundData;
```

- [ ] **Step 1: Write `src/data/events.ts`** with 4-5 events (2 workshops on repair/care, 1-2 clothing take-back drives, mixed statuses across the three enum values), organic non-round numbers where relevant, realistic Vietnamese venue names (not "Acme Hall").

- [ ] **Step 2: Write `src/data/fund.ts`** with a plausible non-round `balanceVnd` (e.g. `18450000`), `itemsCollected` (e.g. `327`), 3 `projects` with partial progress (`raisedVnd < goalVnd` for at least one, one fully funded), and 6 `weeklyUpdates` with distinct dated-sounding `weekLabel`s (e.g. `Tuần 27, 2026`) and short notes.

- [ ] **Step 3: Manual verify** — `npx tsc --noEmit -p tsconfig.json` passes with no type errors referencing these files.

- [ ] **Step 4: Commit**

```bash
git add src/data/events.ts src/data/fund.ts
git commit -m "feat: sample events and Green Loop Fund illustrative data"
```

---

### Task 7: QR pattern generator + QrSimulator component

**Files:**
- Create: `src/lib/qrPattern.ts`, `src/components/QrSimulator.astro`
- Test: `tests/unit/qrPattern.test.ts`

**Interfaces:**
- Produces: `generateQrPattern(seed: string, size?: number): boolean[][]` — deterministic square boolean grid (default `size = 21`) derived from a simple string hash of `seed`, used to render filled/empty cells as an SVG grid that *looks* like a QR code but is explicitly labeled as a simulation.
- Produces: `<QrSimulator url={string} label={string} />` renders the SVG grid plus the visible `url` text and a caption "Mô phỏng — không phải mã QR thật".

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/qrPattern.test.ts
import { describe, it, expect } from 'vitest';
import { generateQrPattern } from '../../src/lib/qrPattern';

describe('generateQrPattern', () => {
  it('returns a square grid of the requested size', () => {
    const grid = generateQrPattern('tui-tote', 21);
    expect(grid).toHaveLength(21);
    expect(grid.every((row) => row.length === 21)).toBe(true);
  });

  it('is deterministic for the same seed', () => {
    expect(generateQrPattern('tui-tote')).toEqual(generateQrPattern('tui-tote'));
  });

  it('differs across seeds', () => {
    expect(generateQrPattern('tui-tote')).not.toEqual(generateQrPattern('mu-luoi-trai'));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/qrPattern.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write `src/lib/qrPattern.ts`**

```ts
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function generateQrPattern(seed: string, size = 21): boolean[][] {
  let state = hashString(seed) || 1;
  const next = () => {
    state ^= state << 13; state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5; state >>>= 0;
    return state;
  };
  const grid: boolean[][] = [];
  for (let y = 0; y < size; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < size; x++) {
      row.push(next() % 100 < 46);
    }
    grid.push(row);
  }
  return grid;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/qrPattern.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Write `src/components/QrSimulator.astro`** — imports `generateQrPattern`, renders an inline `<svg viewBox="0 0 210 210">` of 10px cells colored `var(--color-charcoal)` on `var(--color-cream-card)`, three corner "finder pattern" squares drawn explicitly (not random) so it visually reads as QR-like, the `url` prop printed below in `font-mono`, and a `.mock-label` reading "Mô phỏng - không phải mã QR thật".

- [ ] **Step 6: Commit**

```bash
git add src/lib/qrPattern.ts src/components/QrSimulator.astro tests/unit/qrPattern.test.ts
git commit -m "feat: deterministic QR-look pattern generator and QrSimulator component"
```

---

### Task 8: Remaining shared components

**Files:**
- Create: `src/components/ProductCard.astro`, `src/components/ProductTimeline.astro`, `src/components/EventCard.astro`, `src/components/PassportTierCard.astro`, `src/components/FundProjectProgress.astro`, `src/components/MissionBadge.astro`

**Interfaces:**
- Consumes: `Product`, `AmetiaEvent`, `FundProject` types from Tasks 5-6; `withBase()` from Task 2; `PlaceholderArt` from Task 4.
- Produces:
  - `<ProductCard product={Product} />` — image slot (`PlaceholderArt` keyed by `product.slug`), name, formatted price (`toLocaleString('vi-VN')` + " VNĐ"), link to `withBase('san-pham/' + product.slug + '/')`.
  - `<ProductTimeline steps={ProductTimelineStep[]} />` — vertical timeline list with connector line, stage name + description per step.
  - `<EventCard event={AmetiaEvent} />` — image, name, formatted date, location, description, status pill, "Đăng ký" button with `data-event-slug` attribute (wired up by a page-level `<script>` in Task 13, not here).
  - `<PassportTierCard tier={'Mầm Non'|'Cây Trưởng Thành'|'Cây Cổ Thụ'} active={boolean} description={string} />`.
  - `<FundProjectProgress project={FundProject} />` — name, description, a percentage bar built from `raisedVnd/goalVnd` (no filled-background-track dashboard look — thin single-color bar, no grey track behind it), formatted raised/goal amounts.
  - `<MissionBadge label={string} done={boolean} />` — small badge used on `/ho-chieu-xanh/` and the `/he-sinh-thai/` Tham gia section; `done` toggles a filled vs. outline icon state, purely static (no click handler, per the user's "static display only" decision).

- [ ] **Step 1: Write all six components** per the interfaces above, each using only tokens from Task 2 and the icon set from Task 4.

- [ ] **Step 2: Manual verify** — extend the throwaway test page to render one instance of each component with representative data from Tasks 5-6, run `npm run dev`, confirm no console errors and all six render visibly.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProductCard.astro src/components/ProductTimeline.astro src/components/EventCard.astro src/components/PassportTierCard.astro src/components/FundProjectProgress.astro src/components/MissionBadge.astro
git commit -m "feat: product, event, passport, and fund display components"
```

---

### Task 9: Render-test harness (Astro Container API)

**Files:**
- Create: `tests/render/helpers.ts`
- Modify: `package.json` (add `@astrojs/container` scripts if needed — check Astro 7's container API export path first)

**Interfaces:**
- Produces: `renderPage(Component, props?): Promise<string>` — thin wrapper around `experimental_AstroContainer` that returns rendered HTML, reused by every page-content task's tests from here on.

- [ ] **Step 1: Verify the container API import path for the installed Astro version**

Run: `node -e "console.log(Object.keys(require('astro/container')))"`
Expected: lists `experimental_AstroContainer` (or `AstroContainer` if it has graduated out of experimental in 7.0 — confirm the actual export name before writing Step 2, since this determines the exact import).

- [ ] **Step 2: Write `tests/render/helpers.ts`**

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

export async function renderComponent(Component: any, options: { props?: Record<string, unknown> } = {}) {
  const container = await AstroContainer.create();
  return container.renderToString(Component, options);
}
```

(If Step 1 shows the export graduated to `AstroContainer` without the `experimental_` prefix, use that name instead — this is a mechanical rename, not a design change.)

- [ ] **Step 3: Smoke-test the harness**

```ts
// tests/render/smoke.test.ts
import { describe, it, expect } from 'vitest';
import { renderComponent } from './helpers';
import Layout from '../../src/components/Layout.astro';

describe('render harness smoke test', () => {
  it('renders Layout with a slot-free child count of 0 without throwing', async () => {
    const html = await renderComponent(Layout, { props: { title: 'Test', description: 'Test page' } });
    expect(html).toContain('Test · Ametia Green');
  });
});
```

Run: `npx vitest run tests/render/smoke.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add tests/render/helpers.ts tests/render/smoke.test.ts
git commit -m "test: Astro Container API render-test harness"
```

---

### Task 10: Homepage (`/`)

**Files:**
- Create: `src/pages/index.astro`
- Test: `tests/render/pages.test.ts` (this task adds the first `describe` block; later page tasks append to the same file)

**Content brief:**
- Asymmetric split hero: left column = slogan **"Mặc lâu hơn. Chọn rõ hơn."** as `<h1>`, a 2-sentence brand intro (max ~40 words) positioning Ametia Green as trách nhiệm/dễ phối/minh bạch, one primary CTA button "Khám phá hành trình sản phẩm" linking to `withBase('he-sinh-thai/')`; right column = large `<PlaceholderArt seed="hero" aspect="portrait" expectedFile="hero-collection.jpg">`.
- Short "Về Ametia Green" blurb section (2-3 sentences) linking to `/gioi-thieu/` with a "Tìm hiểu thêm" link (not a duplicate CTA — this is a text link, not a pill button, to avoid duplicate-CTA-intent with the hero button).
- Product grid section, heading "Bộ sưu tập Green Capsule", `<ProductCard>` × 7 from `products` data, responsive grid (`1` column mobile, `2` at 600px, `3` at 900px).
- 4-step ecosystem bento preview: exactly 4 cells (Mở khóa, Khám phá, Tham gia, Lan tỏa), each a short label + one-line description + link into the relevant `/he-sinh-thai/#<anchor>` section, asymmetric sizing (first cell spans 2 columns on desktop).

- [ ] **Step 1: Write the failing test** (append to `tests/render/pages.test.ts`, creating the file if it doesn't exist)

```ts
import { describe, it, expect } from 'vitest';
import { renderComponent } from './helpers';
import IndexPage from '../../src/pages/index.astro';
import { products } from '../../src/data/products';

describe('/ (homepage)', () => {
  it('renders the slogan, all 7 product names, and the ecosystem CTA link', async () => {
    const html = await renderComponent(IndexPage);
    expect(html).toContain('Mặc lâu hơn. Chọn rõ hơn.');
    for (const p of products) {
      expect(html).toContain(p.name);
    }
    expect(html).toContain('/aiesec-dashforimpact/he-sinh-thai/');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/render/pages.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write `src/pages/index.astro`** implementing the content brief above, wrapped in `<Layout title="Trang chủ" description="...">`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/render/pages.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro tests/render/pages.test.ts
git commit -m "feat: homepage with hero, product grid, ecosystem preview"
```

---

### Task 11: Trang giới thiệu (`/gioi-thieu/`)

**Files:**
- Create: `src/pages/gioi-thieu/index.astro`
- Modify: `tests/render/pages.test.ts` (append `describe('/gioi-thieu/'...)`)

**Content brief:** Mission narrative in 3-4 short sections (not one wall of text): (1) who Ametia Green is for — người trẻ đi làm cần trang phục dễ phối, bền, không chạy theo xu hướng nhanh; (2) design philosophy — capsule wardrobe, dễ phối, dùng lâu; (3) transparency commitment — minh bạch nguồn gốc nguyên liệu, gắn nhãn rõ thông tin nào là mô phỏng; (4) explicit non-claim: "Đây là bản dựng thử nghiệm (prototype) trình bày ý tưởng sản phẩm và mô hình vận hành, một số dữ liệu là minh họa." Use a vertical stack layout (headline + body, per Section 4 Split-Header Ban — no left-headline/right-paragraph corner layout), one supporting `<PlaceholderArt>`.

- [ ] **Step 1: Write the failing test** — asserts the page contains the phrase "người trẻ đi làm" and the word "minh bạch" and the prototype-disclaimer sentence.
- [ ] **Step 2: Run test, verify fail.**
- [ ] **Step 3: Write `src/pages/gioi-thieu/index.astro`** per the content brief.
- [ ] **Step 4: Run test, verify pass.**
- [ ] **Step 5: Commit** (`git add src/pages/gioi-thieu tests/render/pages.test.ts && git commit -m "feat: trang gioi thieu"`)

---

### Task 12: Trang hệ sinh thái (`/he-sinh-thai/`)

**Files:**
- Create: `src/pages/he-sinh-thai/index.astro`
- Modify: `tests/render/pages.test.ts`

**Content brief** (4 sections, 4 distinct layout families, each with an `id` anchor matching the homepage bento links: `#mo-khoa`, `#kham-pha`, `#tham-gia`, `#lan-toa`):

1. **Mở khóa** (`#mo-khoa`, asymmetric image+text): prototype packaging concept using rong biển (seaweed-derived film) and bã cà phê (spent coffee grounds), a `.mock-label`-tagged callout stating explicitly this is "**Ý tưởng vật liệu đang được thử nghiệm** - chưa xác nhận khả năng phân hủy hoàn toàn hay đặc tính không nhựa", `<PlaceholderArt seed="packaging-concept">`.
2. **Khám phá** (`#kham-pha`, horizontal scroll-snap process timeline, distinct from #1's layout): 4 stops — Nguồn gốc nguyên liệu, Quy trình sản xuất, Cắt may và hoàn thiện, Đóng gói và vận chuyển — each a short paragraph.
3. **Tham gia** (`#tham-gia`, tiered card layout): 3 unequal `<PassportTierCard>`s — Mầm Non (mới bắt đầu, badge count thấp), Cây Trưởng Thành (tích lũy vài nhiệm vụ), Cây Cổ Thụ (hoàn thành phần lớn nhiệm vụ) — with sample mission list per tier using `<MissionBadge>`, static progress display, explicit caption "Đây là giao diện mô phỏng - không có tài khoản thật." Link to `/ho-chieu-xanh/` for "Xem hồ sơ đầy đủ".
4. **Lan tỏa** (`#lan-toa`, stat/metric showcase, distinct from all above): large display numbers for `fundData.balanceVnd` and `fundData.itemsCollected`, 1-2 `<FundProjectProgress>` teasers, `.mock-label` "Dữ liệu minh họa cho prototype", link to `/green-loop-fund/` for "Xem chi tiết quỹ".

- [ ] **Step 1: Write the failing test** — asserts presence of all 4 section ids (`id="mo-khoa"` etc.), the "Ý tưởng vật liệu đang được thử nghiệm" phrase, the "Đây là giao diện mô phỏng" phrase, and the "Dữ liệu minh họa cho prototype" phrase.
- [ ] **Step 2: Run test, verify fail.**
- [ ] **Step 3: Write `src/pages/he-sinh-thai/index.astro`** per the content brief, importing `PassportTierCard`, `MissionBadge`, `FundProjectProgress`, `fundData`.
- [ ] **Step 4: Run test, verify pass.**
- [ ] **Step 5: Commit**

---

### Task 13: Trang sự kiện (`/su-kien/`) + RSVP modal

**Files:**
- Create: `src/pages/su-kien/index.astro`
- Modify: `tests/render/pages.test.ts`
- Test: `tests/unit/rsvp-modal.test.ts` (jsdom-based behavior test)

**Content brief:** Heading + intro sentence, `<EventCard>` grid from `events` data, a single shared `<dialog>`-based confirmation modal at the bottom of the page (not per-card) that any "Đăng ký" button opens via a vanilla `<script>` reading `data-event-slug`/`data-event-name` off the clicked button, populating the modal's event-name text, and showing a message confirming this is a simulated registration with no data sent. Modal closes on a "Đóng" button or `Escape`.

- [ ] **Step 1: Write the render test** — asserts each event's `name` appears, and a `<dialog>` element with a specific `id="rsvp-dialog"` exists.
- [ ] **Step 2: Write the failing jsdom behavior test**

```ts
// tests/unit/rsvp-modal.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
```

Note: this step requires adding `jsdom` as a devDependency (`npm install -D jsdom`) since the default `node` test environment has no DOM. Write the test to load a minimal HTML fixture containing one `<button data-event-slug="a" data-event-name="Workshop A" class="rsvp-open">` and the `<dialog id="rsvp-dialog">`, import the modal's open/close logic as a plain exported function from a new `src/lib/rsvpModal.ts` (extracted so it's testable outside a `<script>` tag), and assert clicking the button sets the dialog's visible event-name text and `open` attribute, and calling the close handler removes it.

- [ ] **Step 3: Extract `src/lib/rsvpModal.ts`** exporting `initRsvpModal(doc: Document): void`, called from the page's inline `<script>` with `initRsvpModal(document)`.
- [ ] **Step 4: Run both tests, verify pass.**
- [ ] **Step 5: Write `src/pages/su-kien/index.astro`** wiring `EventCard` buttons + the shared dialog + `<script>import { initRsvpModal } from '../../lib/rsvpModal'; initRsvpModal(document);</script>`.
- [ ] **Step 6: Commit**

---

### Task 14: Trang Hộ chiếu xanh (`/ho-chieu-xanh/`)

**Files:**
- Create: `src/pages/ho-chieu-xanh/index.astro`
- Modify: `tests/render/pages.test.ts`

**Content brief:** One static sample profile (fixed, non-interactive per the user's decision): display name (a realistic Vietnamese name, not "Nguyễn Văn A"), tier = "Cây Trưởng Thành", a `<PassportTierCard>` for the active tier plus greyed-out previews of the other two, a grid of `<MissionBadge>` (mix of `done` true/false) covering the 5 prioritized action types from the spec — chăm sóc, tìm hiểu, sửa chữa, thu hồi, tham gia cộng đồng — a static progress bar toward the next tier, and a prominent disclosure: "Đây là hồ sơ mô phỏng để minh họa trải nghiệm - không có tài khoản hoặc dữ liệu thật."

- [ ] **Step 1: Write the failing test** — asserts "Cây Trưởng Thành" appears, all 5 action-type labels appear, and the disclosure sentence appears.
- [ ] **Step 2: Run test, verify fail.**
- [ ] **Step 3: Write the page** per the content brief.
- [ ] **Step 4: Run test, verify pass.**
- [ ] **Step 5: Commit**

---

### Task 15: Trang Green Loop Fund (`/green-loop-fund/`)

**Files:**
- Create: `src/pages/green-loop-fund/index.astro`
- Modify: `tests/render/pages.test.ts`

**Content brief:** Intro sentence explaining the fund's purpose (tái đầu tư từ sản phẩm thu hồi vào các dự án cộng đồng/môi trường), large balance/items-collected stat block, `<FundProjectProgress>` for every `fundData.projects` entry, a reverse-chronological weekly update list (distinct layout from the stat block above it - not another `divide-y` list of >5 rows; group by month or use a compact log with a left rail of week labels), `.mock-label` "Dữ liệu minh họa cho prototype" visible near the top of the page, not just buried in the footer.

- [ ] **Step 1: Write the failing test** — asserts every `fundData.projects[].name` appears, the formatted balance appears, and "Dữ liệu minh họa cho prototype" appears.
- [ ] **Step 2: Run test, verify fail.**
- [ ] **Step 3: Write the page.**
- [ ] **Step 4: Run test, verify pass.**
- [ ] **Step 5: Commit**

---

### Task 16: Product pages (`/san-pham/[slug]/`)

**Files:**
- Create: `src/pages/san-pham/[slug].astro`
- Modify: `tests/render/pages.test.ts`

**Interfaces:**
- Consumes: `products`, `getProductBySlug` from Task 5; `ProductTimeline`, `QrSimulator`, `PlaceholderArt` from Tasks 4/7/8.
- Uses Astro's `getStaticPaths()` returning one path per product slug — this is what produces the 7 genuinely separate static routes the spec requires (`san-pham/ao-thun-form-rong/index.html`, etc.) while keeping one template, not 7 duplicated files.

**Content brief per page:** hero image slot (`PlaceholderArt` keyed by `product.slug`), name + formatted price, "Thành phần chất liệu" (verbatim `materials`), "Đặc điểm sử dụng" (`features` as an icon-led list, not a bare `<ul>`), "Hướng dẫn chăm sóc" (`care`, same treatment), `<ProductTimeline steps={product.timeline}>` under a "Hành trình sản xuất" heading, the material-journey `story` rendered as 3-5 paragraphs under a "Câu chuyện chất liệu" heading, `sku` shown in `font-mono`, a "Quét QR để khám phá" button that reveals (via a small inline `<script>` toggling a `hidden` attribute — no framework state needed) the `<QrSimulator url={withBase('san-pham/' + product.slug + '/')} label={product.name}>` beneath it. Any feature claim not independently verifiable gets a `.mock-label` "Thông tin mô phỏng" next to it.

- [ ] **Step 1: Write the failing test**

```ts
describe('/san-pham/[slug]/', () => {
  it('renders one page per product with correct price, SKU, and QR target URL', async () => {
    for (const p of products) {
      const html = await renderComponent(ProductPage, { params: { slug: p.slug }, props: {} });
      expect(html).toContain(p.name);
      expect(html).toContain(p.sku);
      expect(html).toContain(p.materials);
      expect(html).toContain(`/aiesec-dashforimpact/san-pham/${p.slug}/`);
    }
  });
});
```

(Adjust the container call signature to match whatever `getStaticPaths`-backed dynamic routes require under the Container API confirmed in Task 9 — Astro's container docs show route params passed via a second `renderToString` argument; verify the exact shape against the installed version before finalizing this step.)

- [ ] **Step 2: Run test, verify fail.**
- [ ] **Step 3: Write `src/pages/san-pham/[slug].astro`** per the content brief, with:

```astro
---
import { products, getProductBySlug } from '../../data/products';

export function getStaticPaths() {
  return products.map((product) => ({ params: { slug: product.slug }, props: { product } }));
}

const { product } = Astro.props;
---
```

- [ ] **Step 4: Run test, verify pass.**
- [ ] **Step 5: Full build check**

Run: `npm run build`
Expected: `dist/san-pham/ao-thun-form-rong/index.html`, `.../ao-so-mi-tay-ngan/index.html`, `.../ao-khoac-mong/index.html`, `.../quan-dai-ong-suong/index.html`, `.../quan-short/index.html`, `.../tui-tote/index.html`, `.../mu-luoi-trai/index.html` all exist.

- [ ] **Step 6: Commit**

---

### Task 17: 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Write `src/pages/404.astro`** — on-brand message ("Không tìm thấy trang này"), a link back to `withBase('/')`, wrapped in `<Layout>`.
- [ ] **Step 2: Manual verify** — `npm run build`, confirm `dist/404.html` exists.
- [ ] **Step 3: Commit**

---

### Task 18: Images directory scaffold + README

**Files:**
- Create: `public/images/products/README.md`, `public/images/events/README.md`

**Content:** List every expected filename (7 product slugs + `.jpg`, event slugs from `src/data/events.ts` + `.jpg`), required aspect ratio (portrait ~4:5 for products, wide ~3:2 for events) and a minimum pixel width (1200px), and an explicit instruction: drop files in with the exact filename, do not crop/resize/re-encode/recompress supplied photos — the site will display them as-is via `<img>` at their natural dimensions constrained by CSS `max-width: 100%`.

- [ ] **Step 1: Write both README files** with the exact filename lists derived from `src/data/products.ts` and `src/data/events.ts`.
- [ ] **Step 2: Commit**

```bash
git add public/images/products/README.md public/images/events/README.md
git commit -m "docs: image drop-in instructions for products and events"
```

---

### Task 19: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 1: Write the workflow file exactly as above.**
- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy-pages.yml
git commit -m "ci: GitHub Actions workflow to build and deploy to GitHub Pages"
```

---

### Task 20: Full-site verification and link check

**Files:**
- Create: `tests/render/link-check.test.ts` (or a plain Node script `scripts/check-links.mjs` run as part of `npm run build` verification, not part of `npm test`, since it needs a built `dist/`)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all `tests/unit/*` and `tests/render/*` files pass.

- [ ] **Step 2: Run the full build**

Run: `npm run build`
Expected: exits 0, `dist/` contains `index.html`, `404.html`, and all 12 named page directories plus `fonts/*.woff2` copied from `public/`.

- [ ] **Step 3: Write and run `scripts/check-links.mjs`** — a small Node script (no new dependency; use `node:fs` + a regex over `href="..."` and `src="..."` in every `dist/**/*.html`) that resolves every internal link against the actual files present in `dist/` and fails (non-zero exit) if any internal link points to a path with no corresponding `index.html`/file. Run it against the build output from Step 2.

Run: `node scripts/check-links.mjs`
Expected: prints `0 broken internal links` and exits 0.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-links.mjs
git commit -m "test: internal link checker over the built site"
```

---

### Task 21: Push and deploy

- [ ] **Step 1: Push to the connected remote**

Run: `git push origin main`

- [ ] **Step 2: Enable GitHub Pages via Actions**

Run: `gh api -X POST repos/Nguyen-Ha-An/aiesec-dashforimpact/pages -f build_type=workflow` (if Pages is already enabled from a prior run, this call 409s — treat that as success, not failure).

- [ ] **Step 3: Watch the workflow run**

Run: `gh run watch $(gh run list --workflow=deploy-pages.yml --limit=1 --json databaseId --jq '.[0].databaseId')`
Expected: run completes with conclusion `success`.

- [ ] **Step 4: Verify the live URL**

Run: `curl -s -o /dev/null -w "%{http_code}" https://nguyen-ha-an.github.io/aiesec-dashforimpact/`
Expected: `200`.

- [ ] **Step 5: Report the final URL and the image checklist to the user** (no commit — this is a reporting step).

---

## Self-Review Notes

- **Spec coverage:** every route, every product field, the packaging-concept disclaimer, the Green Passport 3-tier static simulation, the Green Loop Fund illustrative data, the RSVP simulation, the QR simulation, base-path handling, the GitHub Actions workflow, and the image README are each covered by a task above.
- **Placeholder scan:** no TBD/TODO; content briefs specify exact structure, counts, and required phrases rather than vague instructions; the one intentionally-deferred value (exact Astro Container API export name in Task 9) is deferred because it's a version-dependent fact to confirm at execution time, not a design gap, and Step 1 of that task exists specifically to resolve it before writing code.
- **Type consistency:** `Product`, `AmetiaEvent`, `FundProject`/`GreenLoopFundData` shapes defined once in Tasks 5-6 and referenced by identical names in every later task; `withBase()` signature fixed in Task 2 and used unchanged everywhere.
