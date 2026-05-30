# Accessibility
**Authority:** `Source/Stylesheet/Base.css`, `Source/Stylesheet/Global.css`, `Source/Layout/Base.astro`

---

## 1. Skip-to-Content

Every page includes a skip link as first meaningful focus target:

```astro
<a href="#main-content"
   class="sr-only fixed left-2 top-2 z-[100] -translate-y-full bg-[var(--Primary)] px-4 py-2 font-medium text-white transition-transform focus:not-sr-only focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">
  Skip to main content
</a>
```

---

## 2. Focus Ring Policy

Global rule in `Base.css`:

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--Primary);
  outline-offset: 2px;
}
```

Tailwind convention in JSX:
```
focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]
```

Staccato-specific:
```css
.StaccatoButton:focus-visible {
  outline: 2px solid var(--Primary);
  outline-offset: 3px;
}
.StaccatoFocus { ... } /* JS-driven attention focus */
```

---

## 3. Link Underlines

Body content links are underlined unless they are a nav, logo, icon, social, button, or aria-labeled card.

```css
a:not([class*="Button"]):not([class*="Logo"]):not([class*="Icon"]):not(
  [class*="Social"]
):not([class*="StaccatoLogo"]):not([class*="StaccatoSocial"]):not(
  [class*="NavLink"]
):not([class*="StaccatoCard"]):not([aria-label]) {
  text-decoration: underline;
  text-decoration-color: var(--Border);
  text-underline-offset: 2px;
}
```

Hover state: `text-decoration-color: var(--Primary)`.

---

## 4. Text Selection

```css
*::selection {
  background: #fbbf24;
  color: #000;
  text-shadow: none;
}
```

High-contrast yellow for discoverability.

---

## 5. Reduced Motion

Customer choice respected at engine level:

```css
@media (prefers-reduced-motion: reduce) {
  .StaccatoTranslate, .StaccatoScale, .StaccatoSkew, .StaccatoJitter,
  .StaccatoFloat, .StaccatoRotate, .StaccatoHeroButton, .StaccatoCard,
  .StaccatoButton, .StaccatoBadge, .StaccatoNavLink, .StaccatoIcon,
  .StaccatoAvatar, .StaccatoPrice, .StaccatoCheckmark, .StaccatoSocial,
  .StaccatoRhythmBeat, .StaccatoToggle, .StaccatoDivider, .StaccatoSeparator,
  .StaccatoSpinner, .StaccatoParallaxNear, .StaccatoParallaxMid,
  .StaccatoParallaxFar {
    transform: none !important;
    transition: none !important;
  }
  .StaccatoOpacity, .StaccatoBreath, .StaccatoPulse, .StaccatoRhythmDot,
  .StaccatoStar, .StaccatoCheckmark, .StaccatoIcon, .StaccatoSocial {
    opacity: 1 !important;
    filter: none !important;
  }
  .StaccatoColorShift, .StaccatoTurbulence:hover { filter: none !important; }
  .StaccatoVisible { animation: none !important; }
  .StaccatoHover, .StaccatoFocus {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  .StaccatoCursor { display: none !important; }
}
```

`Base.astro` initializes the engine only when the media query is false:

```ts
const ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!ReducedMotion) { Engine.Start(); }
```

---

## 6. Semantic HTML & ARIA

- `nav[aria-label="Breadcrumb"]` hidden in print.
- Buttons use `aria-hidden="true"` on decorative icons.
- Header links include `aria-label` for logo destination.
- Cards with navigation include explicit `href` anchors.

---

## 7. Scroll Behavior

- `html { scroll-behavior: smooth; }` (`Global.css`).
- Thin custom scrollbar aids orientation without obscuring content.

---

## 8. Screen-reader Visibility

- `sr-only` used only for the skip link. It becomes visible on keyboard focus.

---

## 9. Related Documents

- `BrandManual.md`
- `Accessibility.md` ← you are here
- `LayoutPatterns.md`, `StaccatoSystem.md`, `MotionPerformance.md`,
  `Typography.md`
