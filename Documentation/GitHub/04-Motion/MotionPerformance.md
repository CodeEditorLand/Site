# Motion Performance
**Authority:** `Source/Function/Noise/Staccato.ts`, `Source/Function/Configuration/Noise.ts`,  
`Source/Function/Noise/Stylesheet.css`, `Source/Layout/Base.astro`

---

## 1. Budget Philosophy

Motion is present by default, but its cost is bounded:

```ts
Speed:  0.0001     // slow evolution, not flicker
Step:   20         // few committed states
COMMIT_INTERVAL = 500ms
```

Noise state changes are intentionally slow and quantized so each 500 ms commit shows visible movement.

---

## 2. Render Pipeline

```
simplex-noise (CPU) → quantize → setProperty (CSS var)
    ↓
Browser CSS evaluates transition (1.2s / 1.4s / 0.5s)
    ↓
Composite / paint only; no layout on noise-driven updates.
```

Rule: noise channels must never animate layout properties (`width`, `height`, `padding`, `gap`). The `StaccatoMorphPadding` / `StaccatoMorphGap` variants are explicitly commented out in `Stylesheet.css`.

---

## 3. Throttle & Timing Defaults

| Component | Lerp | Frequency |
|-----------|------|-----------|
| Card entry / hover | `1.2s` | Every 500 ms noise commit |
| Button | `0.5s ease` | Every 500 ms |
| Nav | `0.5s ease` | Every 500 ms |
| Hero | `1.4s cubic-bezier(...)` | Every 500 ms |
| Opacity / breath | `0.6s`-`1.6s ease` | Every 500 ms |
| Parallax | Scroll-linked | Scroll frame rate |

---

## 4. Enter Animation Policy

Intersection observer entry uses:

```css
@keyframes StaccatoFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: var(--AttentionOpacity, 1);
         transform: translate(var(--AttentionOffsetX,0), var(--AttentionOffsetY,0)) ... }
}
```

- Duration: `1s ease-out both`.
- Placeholder height via `contain-intrinsic-block-size` keeps scrollbar stable.

---

## 5. prefers-reduced-motion Behavior

- Staccato engine is not even started if the media query matches.
- All transform/transition/filter/animation rules are force-overridden to `none` or `1!important`.
- Cursor blink (`StaccatoCursor`) is hidden.

Implementation in `Base.astro`:

```ts
const ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!ReducedMotion) {
  const Staccato = await import("@Function/Noise/Staccato.js");
  Engine.Start();
  // Seed after window.load to avoid hydration mismatch
}
```

---

## 6. Turbulence (opt-in Hover Effect)

`feTurbulence` SVG filter is injected to DOM on first click/touch.
Applied via `StaccatoTurbulence:hover { filter: url(#StaccatoTurbulence); }`.
Heavy GPU workload: only applied on hover to keep idle cost at zero.

---

## 7. will-change Policy

```css
[style*="--StaccatoIsOrdered: 1"] {
  will-change: transform, opacity, z-index;
}
```

Only elements that need compositor promotion are marked.

---

## 8. CLS Guardrails

- No padding, gap, width, or height may be animated via Staccato.
- `contain-intrinsic-block-size` matches reserved `min-height` on `astro-island`, header, footer.
- `content-visibility: auto` on below-fold sections.
- Hero `min-h-[200dvh]` ensures breathing room for decorated hero.

---

## 9. Related Documents

- `BrandManual.md`
- `MotionPerformance.md` ← you are here
- `StaccatoSystem.md`, `Accessibility.md`, `LayoutPatterns.md`
