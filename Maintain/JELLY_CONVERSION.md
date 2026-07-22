# Jelly UI Conversion Paradigms — CodeEditorLand/WebSite

## Established Patterns (July 2026)

### 1. Card → `<jelly-card>`

```tsx
// Every card conversion follows this exact shape:
<jelly-card
  className="..." // NO bg-card, NO border, NO flex/gap/items-center!
  style={{
    "--jelly-fill": "var(--Card)",        // surface fill → design token
    "--jelly-radius": "0",               // flat aesthetic
    "--jelly-card-padding-block": "0",   // zero internal jelly padding
    "--jelly-card-padding-inline": "0",
    "--jelly-card-font-size": "inherit", // prevent Jelly font cascade
    "--jelly-card-color": "inherit",     // prevent Jelly text color
  } as React.CSSProperties}
>
  {/* Flex layouts MUST live in an inner wrapper — they don't reach slotted content */}
  <div className="flex flex-col gap-6">
    {/* original card content */}
  </div>
</jelly-card>
```

### 2. Badge → `<jelly-badge>`

```tsx
<jelly-badge
  variant="platinum"    // Jelly palette anchor (overridden by --jelly-fill)
  shape="square"        // flat rectangle
  style={{
    "--jelly-fill": "var(--Mute)",           // custom fill
    "--jelly-label": "var(--MuteForeground)", // custom text color
    "--jelly-badge-radius": "0px",
    "--jelly-badge-font-size": "inherit",
  } as React.CSSProperties}
>
  {label}
</jelly-badge>
```

### 3. RichText Enrichment Badges
Use `--jelly-fill: transparent` to let Tailwind `bg-*` classes show through:
```tsx
<jelly-badge
  variant="platinum"
  shape="square"
  className={tailwindColorClasses}  // e.g. "bg-blue-50 text-blue-700"
  style={{
    "--jelly-fill": "transparent",
    "--jelly-label": "currentColor",
    "--jelly-badge-radius": "0px",
    "--jelly-badge-font-size": "0.78em",
  } as React.CSSProperties}
/>
```

### 4. Colored Accent Border → `--jelly-color-border-default`
```tsx
style={{
  "--jelly-color-border-default": accentColor,
  // NO CSS borderTop/borderLeft — jelly canvas handles the border
}}
```

### 5. Removals (always required)
- ❌ `bg-card` / `bg-[var(--Card)]` — jelly paints this
- ❌ `border`, `borderTop`, `borderLeft` — jelly paints this
- ❌ `flex`, `flex-col`, `gap-*`, `items-center` on jelly host — move inside
- ❌ `StaccatoCard`, `StaccatoBorderShimmer`, `StaccatoBadge`
- ❌ `hover:bg-*` — jelly hover wobble replaces CSS hover

### 6. JellyUI Fork Modifications
Located at `Vendor/JellyUI/` (our fork: DependencyCodeEditorLand/Jelly)

- **card/index.ts**: Added hover loop (`startHoverLoop`/`stopHoverLoop`),
  configurable border via `--jelly-card-border: none`
- **badge/index.ts**: Added hover loop
- **card/card.css**: Split `font` shorthand into configurable properties
  (`--jelly-card-font-family`, `--jelly-card-font-size`,
  `--jelly-card-font-weight`, `--jelly-card-line-height`, `--jelly-card-color`)
- **badge/badge.css**: Font size via `--jelly-badge-font-size`

### 7. Files Converted

| File | What | Jelly Elements |
|------|------|---------------|
| `UI/Card.tsx` | Card component | `<jelly-card>` |
| `UI/Badge.tsx` | Badge component | `<jelly-badge>` |
| `UI/Button.tsx` | Height bumps (h-9→h-10) | `<jelly-button>` |
| `UI/RichText.tsx` | Term enrichment | `<jelly-badge>` |
| `DynamicHeroSection.tsx` | Protocol cards | `<jelly-card squish>` |
| `DynamicFeatures.tsx` | Feature cards | `<jelly-card>` |
| `DynamicTestimonials.tsx` | Both variants | `<jelly-card>` |
| `DynamicPricing.tsx` | Pricing cards + badges | `<jelly-card>` + `<jelly-badge>` |
| `DynamicCard.tsx` | Generic card wrapper | `<Card>` → `<jelly-card>` + Style prop |
| `DynamicPlatformGrid.tsx` | Download cards | `<DynamicCard>` with jelly border |
| `DynamicBadge.tsx` | Dynamic badge wrapper | `<Badge>` → `<jelly-badge>` |
| `DynamicPortal.tsx` | Portal badges | `<jelly-badge>` |
| `Auth0AccountGate.tsx` | Coming Soon badge | `<jelly-badge>` |
| `DynamicTransparency.tsx` | Transparency badges | `<Badge>` → `<jelly-badge>` |
| `Doc.astro` | Quick links, entry cards, pills | `<jelly-card squish>` + `<jelly-badge>` |
| `[...Slug].astro` | Prev/Next nav | `<jelly-card squish>` |
| `Noise/Stylesheet.css` | Removed card border CSS | — |
| `Base.astro` | Shiki+Mermaid dark CSS, jelly.js path | — |
| `astro.config.ts` | Shiki dual-theme | — |
| `Route/Integration.ts` | `_redirects` pass-through | — |
| `BuildJellyUIVendor.sh` | Copy to `Asset/JellyUI/` | — |

### 8. Debugging Tips
- Client-rendered pages (Portal, Dashboard, Download) show 0 jelly in static HTML
  → check at runtime after React hydration
- If Jelly UI doesn't work remotely but works locally: Cloudflare CDN cache or
  `_redirects` catch-all `/* → /Visit/` intercepting static assets
- To force JellyUI rebuild: delete `Vendor/JellyUI/dist/.BuiltFrom`
- Submodule commits need manual `git update-index --cacheinfo` to update parent
