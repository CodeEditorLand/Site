# Brand Manual

**Product:** Code Editor Land (FIDDEE)  
**Source of truth:** `Source/Stylesheet/Base.css`, `tailwind.config.js`,
`Source/Function/Noise/Stylesheet.css`, `Source/Stylesheet/Global.css`  
**Audience:** Contributors, designers, contractors

---

## 1. Design Philosophy

Code Editor Land is a flat-white, local-first product. Visual noise is
intentional and governed by the Staccato system; everything else is restrained.

- **No dark mode** product-wide. The default palette is light.
- **No drop shadows.** Shadows are intentionally absent; elevation is
  communicated through surface layering and the Staccato motion system.
- **No rounded corners by default.** Cards are flat (`rounded-none`). Buttons
  and inputs share the same flat policy. `rounded-full` appears only on a
  spinner and the OAuth success confirmation avatar.
- **Saturated protocol colors** are never used as page backgrounds. They are
  reserved for chips, badges, icons, and pathway indicators.

---

## 2. Identity & Positioning

| Field                    | Content                                  |
| ------------------------ | ---------------------------------------- |
| Product name             | Code Editor Land                         |
| Internal codename        | FIDDEE                                   |
| Active production domain | `land.playform.cloud`                    |
| Grace-hold domain        | `editor.land`                            |
| Communication style      | Flat, local-first, transparency-oriented |
| Primary font             | Albert Sans (`--font-sans`)              |

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

- The Staccato layer is always enabled (unless `prefers-reduced-motion`).
- Motion is non-blocking and optimized via `requestAnimationFrame` + commit
  throttling.
- Seed-based transforms are static after page load; only opacity/border filter
  channels animate continuously.
- Hover on any parent `a`, `button`, or `[role="button"]` drains noise signals
  from child `StaccatoIcon` and `StaccatoBadge`.

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
