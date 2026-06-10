# Brand Manual

**Product:** Code Editor Land (FIDDEE)  
**Source of truth:** `Source/Stylesheet/Base.css`, `tailwind.config.js`,
`Source/Function/Noise/Stylesheet.css`, `Source/Stylesheet/Global.css`  
**Audience:** Contributors, designers, contractors

---

## 1. Design Philosophy

Code Editor Land is a technical, precise product. The visual language reads
systems-software: flat surfaces, grid structure, sharp corners, and a
dual-theme that promotes the protocol spine colors to neon accents in dark mode.

- **Dual theme - light and dark, both first-class.** `darkMode: "class"` is
  configured. Light mode: flat white, austere. Dark mode: near-black canvas,
  hairline grid rules, restrained neon accents (cyberpunk-HUD). Override tokens
  live in the `.dark {}` block in `Source/Stylesheet/Base.css`.
- **No drop shadows.** Elevation is communicated through surface layering and
  hairline borders, not shadows. Dark mode may use a single subtle glow on
  focus/hover only.
- **No rounded corners by default.** Cards are flat (`rounded-none`). Buttons
  and inputs keep the logo-aligned 6px. No gradients in light mode.
- **Saturated protocol colors** are never used as page backgrounds. In light
  mode they appear as chips, badges, and left-border accents. In dark mode they
  become neon accents - glow only on interaction, not at rest.
- **Static, grid-aligned layout.** The Staccato noise engine's parallax,
  tilt (per-card seed rotate), and scroll-parallax transforms are permanently
  zeroed. No noise-driven motion in new sections.

---

## 2. Identity & Positioning

| Field                    | Content                                  |
| ------------------------ | ---------------------------------------- |
| Product name             | Code Editor Land                         |
| Internal codename        | FIDDEE                                   |
| Active production domain | `editor.land`                            |
| Grace-hold domain        | `editor.land`                            |
| Communication style      | Flat, local-first, transparency-oriented |
| Primary font (sans)      | Geist (`--FontSans`)                     |
| Primary font (mono)      | Geist Mono (`--FontMono`)                |
| Display font (serif)     | Instrument Serif (`--FontSerif`)         |

---

## 3. Core Design Principles

### 3.1 Flat White Surfaces

Every major surface starts at `#ffffff`. Depth is indicated by neutral zinc
scales (`Surface1`-`Surface4`) or semantic color tints.

### 3.2 Semantic Tokens Over Literal Values

Never hardcode `#ffffff` or `#1a1a1a` in components. Token → Tailwind mapping is
defined in `tailwind.config.js`.

### 3.3 Local-First Priority

The dashboard and account portal must support sign-in optional flows. Staccato
motion is enabled regardless of auth state.

### 3.4 Component-First Naming

Classes are named by what they do, not by their tech stack:

- `StaccatoCard` not `Div`
- `DynamicDashboardUser` not `AuthPanel`

---

## 4. Token Architecture

CSS custom properties live in `:root` inside `Source/Stylesheet/Base.css`.

```
:root {
  --Background
  --Foreground
  --Card / --CardForeground
  --Popover / --PopoverForeground
  --Primary / --PrimaryForeground
  --Secondary / --SecondaryForeground
  --Mute / --MuteForeground
  --Accent / --AccentForeground
  --Destruct / --DestructForeground
  --Border
  --Input
  --Ring
  --BackgroundWhite
  --InputBackground
  --PopoverBackground
  --Surface0 ... --Surface4
  ...
}
```

Tokens are grouped by category (`Spine*`, `Extension*`, `Language*`, `Runtime*`,
`Database*`, `Cloud*`, `Tool*`, `OS*`, `Platform*`, `Provider*`, `Chart*`).

---

## 5. Surface & Depth Rules

| Layer    | Token          | Value     | When to use             |
| -------- | -------------- | --------- | ----------------------- |
| Base     | `--Background` | `#ffffff` | Page root               |
| Card     | `--Card`       | `#ffffff` | Card interior           |
| Elevated | `--Secondary`  | `#f4f4f5` | Hover, elevated panels  |
| Subtle   | `--Mute`       | `#fafafa` | Disabled, subtle panels |
| Input    | `--Input`      | `#ffffff` | Form fields             |

---

## 6. Motion & Personality Policy

- **Calm/static motion.** The Staccato noise engine's scatter, tilt, and
  scroll-parallax are permanently neutralized via an always-on block in
  `Source/Function/Noise/Stylesheet.css` that zeroes those transforms. Named
  card classes (`.FeatureCard`, `.PricingCard`, etc.) force `transform: none`.
- Do not reintroduce parallax, per-card seed rotate, or noise-driven animation.
- New sections must be static and grid-aligned.
- `prefers-reduced-motion`: all transforms disabled, opacity set to 1.
- Hover states use border-color or opacity shifts only - no translate/scale.

---

## 7. Accessibility Commitments

- Skip-to-content link present on every page.
- Focus ring: 2px solid `--Primary`, offset 2px.
- Selection highlight: `bg-yellow-400 text-black`.
- Body links underlined unless they are nav/logo/icon/social/button.
- Prefers-reduced-motion: all transforms disabled, opacity set to 1, filters
  removed.

---

## 8. Implementation Maps

| Directory                                | Purpose                                         |
| ---------------------------------------- | ----------------------------------------------- |
| `Source/Stylesheet/Base.css`             | Design tokens, component classes                |
| `Source/Stylesheet/Global.css`           | Global reset, motion imports, utility selectors |
| `Source/Function/Noise/Stylesheet.css`   | Staccato motion classes                         |
| `Source/Function/Noise/Staccato.ts`      | Simplex-noise engine                            |
| `Source/Function/Configuration/Noise.ts` | Speed/channel tuning                            |

---

## 9. Internationalization Baseline

- 5 locales: `en`, `bg`, `de`, `fr`, `es`.
- 8 namespaces: `common`, `home`, `download`, `account`, `header`, `footer`,
  `meta`, `verify`.
- No hardcoded strings in production UI components.

---

## 10. Testing Baseline

- Vitest located under `Source/Test/`.
- Auth routes covered by `Source/Test/Route/ServiceWorkerAuth.test.ts`.
- Color/output audits: check `ripgrep` results before whitespace refactors.

---

## 11. Related Documents

| Document                  | Topic                                              |
| ------------------------- | -------------------------------------------------- |
| `ColorSystem.md`          | Token palette, category families, chart colors     |
| `Typography.md`           | Font stack, sizing, rendering                      |
| `SpacingLayout.md`        | Grid, container, spacing units                     |
| `ShapeEdgeSystem.md`      | Border, radius, elevation policy                   |
| `LogoAssets.md`           | Logo, favicon, OpenGraph conventions               |
| `ComponentReference.md`   | Card, Button, Badge, Input, Nav, Divider           |
| `StaccatoSystem.md`       | Classes, noise channels, attention, reduced motion |
| `StateFeedbackColors.md`  | Error, destructive, success, warning hues          |
| `LayoutPatterns.md`       | Page shell, hero, grids, dashboard                 |
| `Accessibility.md`        | Focus, selection, underlines, reduced motion       |
| `MotionPerformance.md`    | Commit throttle, lerp, amplitude policy            |
| `Internationalization.md` | Locales, namespaces, translation rules             |
| `NamingVisualLanguage.md` | Tone, naming conventions, visual policy            |
