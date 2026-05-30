# Staccato System
**Implementation:** `Source/Function/Noise/Staccato.ts`, `Source/Function/Noise/Stylesheet.css`,  
`Source/Function/Configuration/Noise.ts`, `Source/Function/Noise/Turbulence.js`,  
`Source/Function/Noise/Parallax.js`  
**Audience:** Frontend engineers, motion designers

---

## 1. Definition

“Staccato” is the site’s personality layer: a low-cost, deterministic noise signal that makes every element feel alive without harming layout or accessibility.

---

## 2. Noise Engine (`Staccato.ts`)

Uses `simplex-noise` with `createNoise2D`.

### 2.1 Configuration

```ts
Speed:  0.0001            // 5× slower than baseline
Step:   20                // quantization levels (vs original 8)

ChannelSpeed: {
  Phase:   0.18,
  Color:   0.07,
  Rhythm:  0.6,
  Morph:   0.25,
  Border:  0.1,
  Glow:    0.28,
}
```

### 2.2 Computed Channels

| Channel | CSS custom property | Purpose |
|---------|---------------------|---------|
| Raw | `--StaccatoRaw` | Drives opacity shimmer, icon/social breathing |
| Phase | `--StaccatoPhase` | Secondary offset / timing partner to Raw |
| Color | `--StaccatoColor` | Hue shift ±4 deg |
| Rhythm | `--StaccatoRhythm` | Dots, pulses, cursor blink |
| Morph | `--StaccatoMorph` | Border radius / scale micro |
| Border | `--StaccatoBorder` | Outline weight (no CLS) |
| Glow | `--StaccatoGlow` | Focus/live glow amplitude |

These are committed every **500 ms** (COMMIT_INTERVAL) via `Root.setProperty(...)`.

---

## 3. Seed System

`SeedSelector('[class*="Staccato"]')` runs once after `window.load`:

- `--StaccatoSeed` (range ~±1)
- `--StaccatoSeedPhase`

Each element gets a deterministic, unique seed based on its index in the matched NodeList.
Seeds are **static after page load** - only the Raw/Phase/Color/Rhythm channels are live.

This ensures:
1. No duplicate-looking elements.
2. Stable per-visit signature - not random per frame.
3. Deterministic hover collapse when noise drains.

---

## 4. Motion Classes (Tier Guide)

### Tier 1 - Static Seed Offsets

Transforms driven by seed values. Hover drains noise to zero.

| Class | Transform |
|-------|-----------|
| `StaccatoTranslate` | `translate(seed*6px, seed-phase*4px)` |
| `StaccatoScale` | `scale(1 + seed*0.03)` |
| `StaccatoSkew` | `skewX(seed*1.5deg)` |
| `StaccatoJitter` | Like Translate, tighter |
| `StaccatoRotate` | `rotate(seed*1.5deg)` |
| `StaccatoCard` | Translate + rotate + scale + opacity (scroll attention) |
| `StaccatoButton` | Tiny seed translate |
| `StaccatoNavLink` | Seed translate |
| `StaccatoIcon` | Seed translate + live opacity |
| `StaccatoAvatar` | Seed translate + micro-scale |
| `StaccatoPrice` | Seed micro-scale |
| `StaccatoCheckmark` | Seed scale |
| `StaccatoToggle` | Seed micro-scale |
| `StaccatoSocial` | Seed translate + live opacity |
| `StaccatoBadge` | Seed micro-scale + live opacity pulse; dot uses `StaccatoRhythmDot` |

### Tier 2 - Live Float (Hero decorative)

Hero-only.

| Class | Signal |
|-------|--------|
| `StaccatoFloat` | `raw/phase` driven translate |
| `StaccatoHeroButton` | `raw/phase` translate + `rhythm` scale |

### Tier 3 - Flashing Lights (opacity, color, border, glow)

No position changes.

| Class | Signal |
|-------|--------|
| `StaccatoOpacity` | `raw` opacity |
| `StaccatoBreath` | `raw` opacity + `AttentionOpacity` |
| `StaccatoPulse` | `rhythm` opacity |
| `StaccatoColorShift` | `hue-rotate(4deg * color)` |
| `StaccatoColorAccent` | border-color based on `color` |
| `StaccatoBorderWeight` | outline-weight via `border` (no CLS) |
| `StaccatoOutlineGlow` | outline width / offset via `glow` |
| `StaccatoGlow` | No-op (flat-white policy) |
| `StaccatoShadowLift` | No-op (flat-white policy) |
| `StaccatoStar` | opacity + brightness via `color` |
| `StaccatoRhythmBeat` | scale via `rhythm` |
| `StaccatoSpinner` | opacity via `raw` |
| `StaccatoSeparator` / `StaccatoDivider` | opacity + scaleX via `raw/morph` |
| `StaccatoInput:focus-within` | border-color via `glow` |

### Tier 4 - Scroll-Linked Parallax

Not noise. Driven by `Parallax.js` setting `--ScrollProgress`.

| Class | Effect |
|-------|--------|
| `StaccatoParallaxNear` | `translateY(scrollProgress * -20px)` |
| `StaccatoParallaxMid` | `translateY(scrollProgress * -12px)` |
| `StaccatoParallaxFar` | `translateY(scrollProgress * -6px)` |

---

## 5. Attention / IntersectionObserver Entry

Each card-bearing element gets CSS vars set by `IntersectionObserver`:

- `--AttentionOffsetX`
- `--AttentionOffsetY`
- `--AttentionRotation`
- `--AttentionScale`
- `--AttentionDelay`
- `--AttentionOpacity`
- `--ScrollProgress` (parallax)

`StaccatoVisible` applies a `fadeIn` animation.

Hover on a `.StaccatoCard` collapses the offset/rotation/scale/anchor values - the “attention anchor” is the element’s natural resting state when interacted with.

---

## 6. Hover / Focus Parenting

```css
:is(a, button, [role="button"]):hover .StaccatoIcon,
:is(a, button, [role="button"]):hover .StaccatoBadge {
  transform: none;
  opacity: 1;
}
```

Rule: hovering a parent interaction surface always settles children.

---

## 7. Inline Separator

```css
.InlineSeparator::before {
  content: "\2001|\2001";  /* em quad · pipe · em quad */
  opacity: 0.2;
}
```

---

## 8. Reduced Motion (`@media (prefers-reduced-motion: reduce)`)

- Transforms → `none !important`.
- Transitions → `none !important`.
- Opacity → `1 !important`.
- Filters → `none !important`.
- Animations → `none !important`.
- Cursor → `display: none`.

Explicit disabled list in `Stylesheet.css` contains every public Staccato class.

---

## 9. Turbulence (opt-in hover)

- Injected by `Turbulence.js` after first user interaction.
- Activated via `StaccatoTurbulence:hover` → `filter: url(#StaccatoTurbulence)`.
- SVG filter `#StaccatoTurbulence` is added to DOM on first click.

---

## 10. Performance Defaults

| Metric | Value |
|--------|-------|
| Noise commit throttle | `500ms` |
| Card lerp | `1.2s` |
| Button lerp | `0.5s` |
| Nav lerp | `0.5s` |
| Hero lerp | `1.4s` |
| Opacity transitions | `0.6s`-`1.6s` |

---

## 11. Related Documents

- `BrandManual.md`
- `StaccatoSystem.md` ← you are here
- `ComponentReference.md`, `MotionPerformance.md`, `Accessibility.md`
