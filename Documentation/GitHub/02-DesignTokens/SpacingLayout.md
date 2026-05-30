# Spacing & Layout
**Source:** `Source/Stylesheet/Base.css`, component usage across `Source/`  
**Constraint:** Flat-white, zero-radius default, no shadows.

---

## 1. Spacing System

### 1.1 Base Unit

`--Spacing: 0.25rem` (4 px). Tailwind’s default spacing scale is used throughout.

### 1.2 Container Widths

| Token | Value | Typical use |
|-------|-------|-------------|
| `--ContainerExtraSmall` | `20rem` | Modal, narrow form |
| `--ContainerMedium` | `28rem` | Auth forms |
| `--ContainerTwoExtraLarge` | `42rem` | Article body |
| `--ContainerFourExtraLarge` | `56rem` | Dashboard grids |
| `--ContainerFiveExtraLarge` | `64rem` | Wide documentation |
| `--ContainerSixExtraLarge` | `72rem` | Full marketing rows |

In practice, components use Tailwind utilities directly:
- `max-w-2xl` - centered text/forms.
- `max-w-4xl` - hero heading max.
- `max-w-6xl` / `max-w-7xl` - framework / feature grids.

---

## 2. Grid Patterns

### 2.1 Responsive Card Grids

Common pattern in feature/pricing/testimonial sections:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

- Gap: `4` (`1rem`) is standard.
- Gap class may be overridden by `StaccatoMorphGap` (note: actual gap morphing is disabled to prevent CLS; class is present for compatibility).

### 2.2 Masonry Testimonials

`MasonryCard` uses CSS grid column span computed via `--masonry-col`:

```css
.MasonryCard {
  grid-column: span 1;
}
@media (min-width: 1024px) {
  .MasonryCard {
    grid-column: span var(--masonry-col, 6);
  }
}
```

Col-span is set inline via JS to achieve masonry-like reflow.

---

## 3. Common Layout Containers

| Pattern | Class | Use |
|---------|-------|-----|
| Page max | `mx-auto max-w-2xl` | Forms, centered prose |
| Wide page | `mx-auto max-w-7xl` | Landing feature list |
| Full bleed | no max-width | Background/hero sections |

---

## 4. Pad & Gap Conventions

| Context | Padding | Gap |
|---------|---------|-----|
| Card default | `p-6` | `gap-4` / `gap-6` |
| Compact card | `p-5` | - |
| Feature card | `p-8` | `space-y-6` |
| Hero CTA | `px-5 py-3` | `gap-3` |
| Button | `px-4 py-2` | `gap-2` |

---

## 5. Section Vertical Rhythm

- Between major sections: `mb-24` on wrapper / `mx-auto max-w-2xl text-center` intro.
- Between card rows: `space-y-4` or `space-y-8`.
- Dashboard uses `space-y-6` and `space-y-8`.

---

## 6. Layout Policy

- Cards should not carry large decorative shadows; elevation is flat.
- Grid is the primary layout primitive; avoid `float`.
- Use `flex` for row-aligned items and `space-x-*` for gap.
- `items-center` / `items-start` control vertical alignment in flex rows.

---

## 7. Related Documents

- `BrandManual.md` - design philosophy
- `SpacingLayout.md` ← you are here
- `ShapeEdgeSystem.md`, `ComponentReference.md`, `LayoutPatterns.md`
