---
name: land-design
description:
    The Code Editor Land website design language and design-system map. Load
    when changing typography, color tokens, themes (light/dark), component
    styling, or building/editing any Astro page or React UI component in this
    repo. Covers the cyberpunk-HUD + light dual-theme direction, the Geist /
    Geist Mono / Instrument Serif type stack, the
    DesignToken→Base→Tailwind→shadcn token pipeline, and component
    composition/extraction conventions.
---

# Code Editor Land - Design Language & System

Authoritative reference for the visual language of this site and the
architecture that implements it. Read this before touching fonts, colors,
themes, or component styling so changes stay coherent with the system instead of
fighting it.

The product: **"VS Code, without Electron"** - a Rust-core, Tauri-shell,
Effect-TS editor with gRPC/IPC/WASM protocol spines. Audience is
systems-software developers. The design language must read as **technical,
precise, and confident**, never decorative.

## The design direction (canonical decisions)

These were chosen deliberately. Do not drift from them without an explicit
decision to.

1. **Dual theme - light + dark, both first-class.** Light mode is required and
   stays the austere flat-white system that exists today. Dark mode is a
   **cyberpunk terminal-HUD**: near-black canvas, hairline grid rules,
   restrained neon accents. A toggle switches them. `darkMode: "class"` is
   already configured in `tailwind.config.js`.
2. **"Polished and minimal" cyberpunk, not neon-slop.** The HUD reads cyberpunk
   through _structure_ (mono chrome, grid lines, sharp corners, technical
   labels) and _restraint_ (accents glow only on interaction), not through
   saturated color everywhere.
3. **Typography - three faces, each with a job:**
    - **Instrument Serif** - large display headlines (hero, section titles). The
      "fancy" high-contrast voice. Used sparingly and big.
    - **Geist Mono** - HUD chrome: eyebrows, labels, tags, metadata, code. The
      technical voice.
    - **Geist (sans)** - body copy and UI text. Replaces Albert Sans. See
      [Reference/Typography.md](Reference/Typography.md).
4. **Sharp corners stay.** `--BorderRadius: 0` for cards/surfaces; only
   buttons/inputs keep the logo-aligned 6px. No shadows or gradients in light
   mode; dark mode may use a single subtle glow on focus/hover only.
5. **Protocol-spine palette = the accent system.** gRPC green `#22c55e`, IPC
   blue `#3b82f6`, TCP orange `#f97316`, WASM purple `#a855f7`. These are
   already tokenized; in dark mode they become the neon accents. Each has
   Primary / Mute / Surface / Fore variants. See
   [Reference/Theme.md](Reference/Theme.md).
6. **Voice - marketing-led top-of-funnel, technical in docs.** The current
   default English copy is needlessly technical/hedged; standardize on a
   confident benefit-led voice for hero/ features/pricing and keep
   deep-technical prose for docs. See [Reference/Copy.md](Reference/Copy.md).

## Current status

- **Implemented (in progress).** Fonts, dual-theme tokens, theme toggle, the
  hero overhaul, the calm/static motion pass, the modern tech-stack grid,
  section eyebrows, feature card accent system, logo replacement, footer
  refinement, and badge strip token pass are live. Remaining: theme-blind status
  colors in Dashboard/DynamicAccountProfile/DynamicContactForm, emoji→icon swap,
  copy pass. See **Implementation learnings** below.
- **Errors fixed:** missing peer deps `@testing-library/dom` and `react-is` are
  now declared devDependencies (the `.npmrc` has `legacy-peer-deps=true`, which
  skips peer install, so peers of test libraries must be declared explicitly or
  Astro's dep optimizer fails).

## Implementation learnings (hard-won - read before editing)

- **The real header is `Source/Component/Layout/Header.tsx`**, NOT
  `DynamicHeader.tsx`. Pages import `Header` from
  `Source/Component/Layout/Header` and render it `client:load`. Its background
  lives in `Source/Component/Layout/Header/Stylesheet.css` (`.Header`), now a
  frosted `color-mix(var(--Background) 78%)` + `backdrop-filter` bar. The theme
  toggle (`Source/Component/UI/ThemeToggle.tsx`) is wired into Header.tsx's
  action cluster.
- **Hot reload works (Vite HMR).** CSS + component edits hot-reload. Only
  `tailwind.config.js` / `astro.config.ts` changes need a dev-server restart.
  Don't restart for ordinary edits.
- **Hard-coded `bg-white` was everywhere (~110 sites).** Swept to `bg-card`
  (maps to `var(--Card)`), so cards/surfaces follow the theme. `bg-black/50`
  modal scrims are legitimate and were left. Hex literals: only `#EB5424` (Auth0
  brand) remains, intentionally. CSS hex (`#ffffff`) in Header/Footer/Portal
  stylesheets was tokenized too.
- **PITFALL - never set `background-color` on `.StaccatoCard` in plain
  (unlayered) CSS.** Unlayered rules beat Tailwind's `@layer utilities`, so a
  `.StaccatoCard { background }` rule overrode `bg-primary` on `IconTooltip`
  (which reuses `.StaccatoCard`) → dark-on-dark tooltips. Card definition
  (hairline border + hover glow) is scoped to the _named_ card classes
  (`.FeatureCard`, `.PricingCard`, `.TestimonialCard`, `.TransparencyCard`,
  `.MasonryCard`) instead.
- **Calm/static motion is a core decision.** The `Staccato`/`Attention` noise
  engine's scatter, tilt (per-card seed `rotate`), and scroll-parallax read as
  dated ("2010"). They're neutralised: an always-on block in
  `Source/Function/Noise/Stylesheet.css` zeroes the parallax/translate/rotate
  transforms; the named card classes force `transform: none`; and the hero scene
  animation is disabled (orbital cards sit static). Keep new sections static and
  grid-aligned - do not reintroduce noise-driven motion.
- **Hero tech stack: orbital diagram → HUD grid.** The old hub-and-spokes
  orbital (`DynamicHeroSection.tsx`) was replaced with a
  `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` of bordered tiles:
  spine-accent edge bar + tinted lucide icon + mono uppercase label. Static,
  grid-aligned. Pattern to reuse for other "diagram" sections.
- **Hero title is only `TitleHighlight`** ("Land") - `HomePage.tsx` sets no main
  `Title`. The big serif word is the headline by design; not a bug.
- **Section spacing:** content sections used `min-h-[100dvh] … justify-center`
  which ballooned sparse sections into huge empty bands. Removed →
  `w-full py-24 sm:py-32` (content-sized). The hero dropped `lg:min-h-[200dvh]`
  (the parallax scroll region).
- **Nav consolidated** from 7 links to 4 (Features, Docs, Download, GitHub).
  Blog/Contributing live in the footer; Dashboard is post-sign-in / via Portal.
- **Icons:** `lucide-react` (`"icon": "lucide"` in components.json) is the
  standard. Use it for all glyphs - no emoji in UI. Stray emoji (codename
  tooltips, element-card `Emoji` field, Footer/Dashboard inline) are being
  swapped to lucide.
- **Theme-blind colors:** `index.astro` badge strip is now fixed - all chips use
  spine tokens (`var(--SpinegRPC*)`, `var(--SpineIPC*)`, `var(--Border)`, etc.)
  via inline `style=`. Remaining theme-blind utilities are concentrated in
  `Dashboard.astro`, `DynamicAccountProfile`, `DynamicLocalFirstScan`,
  `RichText`, `DynamicContactForm` - need `dark:` variants or semantic status
  tokens.
- **`DynamicBadge` dot colors** were theme-blind (`bg-green-500` etc.). Now use
  `DotColorTokenMap` with spine CSS variables via
  `style={{ backgroundColor: … }}`.
- **Footer architecture - two separate components:**
    - `Source/Component/Layout/Footer.tsx` - the **real** site footer, rendered
      in `Base.astro` via `<Footer client:idle />`. Has brand, columns, NLnet
      funding notice, bottom bar.
    - `Source/Component/Dynamic/DynamicFooter.tsx` - used on non-homepage pages
      only.
    - Both share the same `.Footer { background-color: var(--Background) }` CSS
      (no gray bg).
    - `Layout/Footer.tsx` column headers use
      `font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground`.
    - NLnet funding notice uses `border-l-2` with
      `borderLeftColor: var(--SpinegRPC)` - not a gray box.
    - Brand description uses `whitespace-pre-line` to render `\n\n` as paragraph
      breaks.

## Architecture map (where things live)

The token pipeline is already a clean shadcn-style extraction. Respect these
layers:

| Layer              | File                                       | Role                                                                                                                                                            |
| ------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Raw scales         | `Source/Function/TailWind/DesignToken.css` | Color ramps (50-950), spacing scale, tech-color aliases. No semantics.                                                                                          |
| Semantic tokens    | `Source/Stylesheet/Base.css`               | `--Background`, `--Foreground`, `--Primary`, spine `*Mute/*Surface/*Fore`, component classes (`.Button*`, `.Badge*`, `.Card`). **Dark mode overrides go here.** |
| Tailwind bridge    | `tailwind.config.js`                       | Maps tokens → utilities (`bg-background`, `text-spine-grpc`). `fontFamily`, `darkMode: "class"`, safelist.                                                      |
| shadcn config      | `components.json`                          | PascalCase aliases: components → `./Source/Component`, utils → `CN.ts`.                                                                                         |
| Primitives         | `Source/Component/UI/*.tsx`                | ~50 shadcn primitives (Button, Card, Badge, Dialog…). PascalCase filenames.                                                                                     |
| Feature components | `Source/Component/Dynamic/*.tsx`           | 41 composed components (Hero, Features, Pricing…).                                                                                                              |
| Global CSS         | `Source/Stylesheet/Global.css`             | `html`/`body` base, font-family, scrollbar, selection, heading rules.                                                                                           |
| Font loading       | `Source/Layout/Base.astro`                 | Google Fonts preconnect/preload pattern.                                                                                                                        |
| Copy / i18n        | `Source/Library/I18n/Locale/<Lang>/*.json` | Localized strings (En, Bg, De, Es, Fr).                                                                                                                         |

Reference files:

- [Reference/Typography.md](Reference/Typography.md) - fonts, loading, heading
  rollout.
- [Reference/Theme.md](Reference/Theme.md) - light + dark cyberpunk tokens,
  accents, glow, toggle.
- [Reference/Architecture.md](Reference/Architecture.md) - token pipeline +
  composition/extraction.
- [Reference/Copy.md](Reference/Copy.md) - voice system (marketing vs
  technical) + rewrites + glossary.

## Quickstart - run & screenshot

```bash
npm install # peers now declared; needs legacy-peer-deps (already in .npmrc)
npm run Run # astro dev --host  →  http://localhost:9999/
```

To review visually, drive Chrome DevTools MCP against `http://localhost:9999/`
and screenshot. The dev server is the source of truth - verify visual changes
against `http://localhost:9999/` before assuming the production domain
`editor.land` reflects your edits.

## Implementation roadmap (deferred until approved)

1. **Fonts** - add Geist, Geist Mono, Instrument Serif to the Google Fonts
   request in `Base.astro`; define `--FontSans/--FontMono/--FontSerif` in
   `Base.css`; map `fontFamily` in `tailwind.config.js`. Drop Albert Sans.
   ([Reference/Typography.md](Reference/Typography.md))
2. **Heading rollout** - serif applies to _display_ headings (hero + section
   H1/H2) via a `.Display`/`font-serif` convention; small UI/card/dashboard
   headings stay Geist sans. Don't blanket-serif all 55 heading tags.
3. **Dark theme** - add a `.dark` override block in `Base.css` mapping the
   semantic surface tokens to the cyberpunk HUD palette; promote spine colors to
   neon. ([Reference/Theme.md](Reference/Theme.md))
4. **Theme toggle** - wire a class toggle on `<html>` with persisted
   preference + system default; respect `prefers-color-scheme`.
5. **HUD details** - hairline grid backdrop, mono eyebrows/labels,
   interaction-only glow.
6. **Copy pass** - rewrite hero/features/pricing strings to the marketing-led
   voice across all five locales; move technical detail + caveats to docs.
   ([Reference/Copy.md](Reference/Copy.md))
7. **Validate** - screenshot light + dark across hero, features, pricing, docs,
   dashboard.

## Logo

`Public/Asset/Logo/Glyph/Land.svg` - 32×32 black square (`#151515`) with a white
L mark (vertical bar + horizontal base). Self-contained across light and dark -
no CSS filter or inversion needed. The black background recedes in dark mode
leaving the white L floating. Do not add `filter: invert()` rules; the mark is
intentionally always-black-bg.

## Section eyebrow pattern

Every content section title block uses a mono `//` eyebrow **above** the `<h2>`.
Pattern:

```tsx
<p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--MuteForeground)]">
	<span className="text-[var(--SpinegRPCFore)]">//</span> Section Name
</p>
```

Established in hero (`// Tech Stack`) and rolled out to Features, Roadmap,
Architecture, Download. Apply to any new section heading. The green `//` is the
gRPC spine accent - it anchors every section to the technical HUD language.

## Feature card accent system

Feature/content cards use two signals from the `FeatureColorMap` (feature ID →
spine token):

1. **Left border**:
   `style={{ borderLeftColor: FeatureColor, borderLeftWidth: "2px" }}` -
   overrides the uniform `1px var(--Border)` on the left side only.
2. **Icon container bg**:
   `style={{ backgroundColor: FeatureColorMuteMap[Feature.Id] }}` - uses the
   `*Mute` tinted background (12% spine color on white / 18% on dark).

The `FeatureColorMuteMap` maps feature IDs to tokens like
`var(--ExtensionRustMute)`, `var(--SpineWASMMute)` etc. Testimonial/masonry
cards already had the left-border pattern (`borderLeftColor: AccentColor`).
Feature cards now match. Keep this pattern consistent across any new card type
that represents a technology or element.

## Section backgrounds

**No alternating gray stripe.** Features and Architecture previously used
`bg-[var(--Mute)]`. All content sections now use the plain white canvas
(`bg-background` or no bg class). The visual hierarchy comes from the card
borders and accent colors, not section backgrounds.

## Conventions (non-negotiable in this repo)

- **PascalCase** for component files, CSS custom properties, and most
  identifiers.
- Style through **tokens**, never hard-coded hex in components - add a token if
  one is missing.
- Keep light mode flat: **no shadows, no gradients, no rounded corners** (except
  button/input 6px).
- Prefer extending the existing primitive/token over inventing a parallel one.
- **No alternating section backgrounds** - no `bg-[var(--Mute)]` on section
  wrappers.
- **Every section heading gets a `//` eyebrow** in Geist Mono uppercase.
