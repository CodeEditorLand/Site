# Architecture — Token Pipeline & Component Conventions

How the design system is wired, and the rules for composing/extracting components.

## Token pipeline (one direction, no shortcuts)

```
DesignToken.css            raw ramps + spacing + tech aliases (no semantics)
        │
        ▼
Base.css  :root / .dark    semantic tokens (--Background, --Primary, spine *Fore/*Mute/*Surface)
        │                  + component classes (.Button*, .Badge*, .Card, .Input)
        ▼
tailwind.config.js         token → utility bridge (bg-background, text-spine-grpc), fontFamily, safelist
        │
        ▼
components.json            shadcn aliases (PascalCase): components→Source/Component, utils→CN.ts
        │
        ▼
Source/Component/UI/*.tsx  ~50 primitives (Button, Card, Badge, Dialog, …)
        │
        ▼
Source/Component/Dynamic/*.tsx   41 feature components composed from primitives
```

**Rule:** a component never reaches past its layer. Components read semantic tokens or Tailwind
utilities — never raw ramps, never literal hex. If a needed value is missing, add a **semantic
token** in `Base.css` (and its dark counterpart), not a one-off hex in the component.

## Why dark mode is cheap here

Because every component already consumes semantic tokens, re-skinning for dark mode is almost
entirely a `Base.css` `.dark` override job (see [Theme.md](Theme.md)). Resist adding
`dark:` utility variants scattered across components — that fragments the system. Keep theme
logic centralized in the token layer; use `dark:` utilities only for the rare structural
difference (e.g. showing the HUD grid backdrop only in dark).

## Tailwind safelist

`tailwind.config.js` safelists the spine/ext/platform color utilities because they're applied
dynamically (e.g. `DynamicHeroSection` derives a card's accent from its title text at runtime,
and `Source/Function/Scroll/Layout.astro` injects classes). **If you add a new dynamically
applied color utility, add it to the safelist** or it will be purged from the build.

## Component composition / extraction conventions

The `Dynamic/` components are feature-level and some are large (e.g. `DynamicHeroSection` mixes
layout, a noise/animation engine, and per-card accent logic). When extracting:

- **Primitives → `Source/Component/UI/`.** Anything generic and reusable (a `Tag`, an
  `Eyebrow`, a `GlowCard`, a `ThemeToggle`) belongs here, styled purely from tokens.
- **Feature pieces → `Source/Component/Dynamic/`.** Compose primitives; keep
  product-specific logic here.
- **Pull non-visual logic out of view components.** The noise/animation engine in
  `DynamicHeroSection` already lives in `Source/Function/Noise/` — follow that pattern: hooks
  and engines in `Source/Function/`, presentation in components.
- **Interfaces** live in `Source/Component/Dynamic/Interface/` (`Property/Hero.ts` etc.) — keep
  prop contracts there, not inline.
- Match the surrounding code: **PascalCase** identifiers/props, token-driven styling, no
  shadows/gradients/rounded in light mode.

When introducing the cyberpunk HUD, prefer **new primitives** (`Eyebrow`, `GridBackdrop`,
`GlowCard`, `ThemeToggle`) over inlining HUD markup into each `Dynamic` component — so the
language stays consistent and reusable.

## Content / copy tone (related, tracked separately)

There are **two English copy variants**: the default site copy reads as *needlessly
super-technical*, while a **more marketing-toned English variant exists** (reachable via the
language selector / older translation). The redesign should standardize on the
**marketing-toned, benefit-led voice** for top-of-funnel pages (hero, features, pricing) and
reserve the deep-technical voice for docs. Reconcile these in `Source/Library/I18n/` and
`Source/Content/` rather than leaving two competing English strings. Tone is part of the design
language: serif display headline + benefit-led sentence + mono technical sub-label is the
intended rhythm.
