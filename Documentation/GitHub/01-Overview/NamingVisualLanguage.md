# Naming & Visual Language

**Philosophy anchor:** flat-white, local-first, transparency-oriented, Staccato
personality layer

---

## 1. Tone

- **Flat and honest.** The site reads black/white/gray first, with color as
  signal. Dual theme (light flat-white, dark cyberpunk-HUD) - both first-class.
- **Static, grid-aligned.** The prescribed fix for sparse sections is tighter
  typography, stronger grid structure, and clearer eyebrow labels - not adding
  noise-driven motion. Staccato position transforms are permanently neutralized
  (see `StaccatoSystem.md §0`).
- **Local-first first.** Auth and account UI must not assume sign-in is
  mandatory.

---

## 2. Component Naming Conventions

### 2.1 Prefix Rules

| Prefix                                       | Applies to                         | Example                                           |
| -------------------------------------------- | ---------------------------------- | ------------------------------------------------- |
| `Staccato*`                                  | Motion-decorated elements          | `StaccatoButton`, `StaccatoCard`, `StaccatoBadge` |
| `Dynamic*`                                   | Client-side rendered React islands | `DynamicHeroSection`, `DynamicPricing`            |
| `Feature*` / `PricingCard*` / `MasonryCard*` | Semantic card variants             | `FeatureCard`, `PricingCard`, `TestimonialCard`   |

### 2.2 Rule: Behavior Before Tech Stack

Name classes by what they do, not by implementation:

- ✅ `StaccatoNavLink`
- ✅ `DynamicDashboardUser`
- ❌ `FlexDiv`
- ❌ `ReactDivBlue`

---

## 3. CSS Class Ordering (JSX)

Preferred order for long className attributes:

```tsx
className={clsx(
  "StaccatoBase StaccatoMotion",
  layoutClasses,          // grid / flex / space-y / mx-auto / max-w-*
  themeClasses,           // bg-white / text-foreground / border / p-6
  stateClasses            // hover:bg-red-50 / focus:outline-2 / disabled:opacity-50
)}
```

Rationale: motion declared first ensures seed/vars override helper classes if
specificity ever collides.

---

## 4. Semantic Color Usage Policy

- Saturated protocol colors → chips, badges, icon pairs, small status
  indicators. They must **not** appear as:
    - page background
    - `<body>` fill
    - large surface area
    - text on white at large scale (headline sans opacity guard)

- Neutral palette (`#1a1a1a`, `#fafafa`, `#f4f4f5`) carries the page weight.

---

## 5. Token Naming Convention

CSS custom property names:

```
--[Category][Name]
--[Category][Name]Mute
--[Category][Name]Surface
--[Category][Name]Fore
```

Categories (organized by `Base.css` section):

- Neutral: `Background`, `Foreground`, `Card`, `Popover`, `Primary`,
  `Secondary`, `Mute`, `Accent`, `Destruct`, `Border`, `Input`, `Ring`
- Spine: `SpinegRPC`, `SpineIPC`, `SpineTCP`, `SpineWASM`
- Auth Tier: `TierCloud`, `TierProvider`, `TierLocalFirst`
- Framework / Extension: `Extension*`
- Language: `Language*`
- Runtime: `Runtime*`
- Database: `Database*`
- Cloud: `Cloud*`
- Tool: `Tool*`
- OS: `OS*`
- Platform: `Platform*`
- Provider: `Provider*`
- Chart: `Chart1` … `Chart8`

---

## 6. File Naming

- PascalCase for React island components: `DynamicHeroSection.tsx`,
  `DynamicPricing.tsx`.
- PascalCase for exported Astro pages: `Dashboard.astro`, `OpenGraph.svg.ts`.
- Kebab-case or camelCase for internal utilities: `tailwind.config.js`,
  `Noise.ts`, `Staccato.ts`.

---

## 7. Domain & Product References

- Product display name: **Code Editor Land**.
- Internal/code reference: **FIDDEE**.
- Active domain: `editor.land`.
- Grace-hold domain: `editor.land`.
- Message channel / AI gateway: `@nikolahristov_hermes_bot` (Telegram DM).
- Codebase term: preference for **“Land”** over verbose branding in dev
  conversation.

---

## 8. Documentation Naming

All brand/manual documents are PascalCase and live under:

```
WebSite/Documentation/GitHub/
├── BrandManual.md
├── ColorSystem.md
├── Typography.md
├── SpacingLayout.md
├── ShapeEdgeSystem.md
├── LogoAssets.md
├── ComponentReference.md
├── StaccatoSystem.md
├── StateFeedbackColors.md
├── LayoutPatterns.md
├── Accessibility.md
├── MotionPerformance.md
├── Internationalization.md
└── NamingVisualLanguage.md
```

Core principle: one topic per file, PascalCase filename, linked cross-references
at the bottom.

---

## 9. Related Documents

- `BrandManual.md`
- `NamingVisualLanguage.md` ← you are here
- `ColorSystem.md`, `ShapeEdgeSystem.md`, `StaccatoSystem.md`,
  `Internationalization.md`
