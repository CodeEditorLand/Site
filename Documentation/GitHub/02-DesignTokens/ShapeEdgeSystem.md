# Shape & Edge System

**Authority:** `Source/Stylesheet/Base.css`, `tailwind.config.js`

---

## 1. Border Policy

- Width: `1px` (`--BorderWidth: 1px`).
- Style: solid (`--BorderStyle: solid`).
- Color: `--Border` (`rgba(0, 0, 0, 0.08)` for neutral; override with semantic
  palette for states).

Enforced globally:

```css
* {
	border-color: var(--Border);
}
```

Inputs and selects override with `border-[var(--Border)]` in JSX.

---

## 2. Border-Radius System

### 2.1 Global Default

```css
:root {
	--BorderRadius: 0; /* flat */
	--RadiusButton: 6px;
	--RadiusInput: 6px;
}
```

Applied via:

```css
.Card {
	border-radius: var(--BorderRadius) !important;
}
.Input,
.Textarea,
.Select,
.SelectTrigger {
	border-radius: var(--RadiusInput) !important;
}
.Button {
	border-radius: var(--RadiusButton) !important;
}
.Badge,
[class*="Badge"] {
	border-radius: 9999px !important;
}
.Avatar,
[class*="Avatar"] {
	border-radius: 9999px !important;
}
```

### 2.2 Allowed Exceptions

| Element  | Radius          | Rationale                   |
| -------- | --------------- | --------------------------- |
| Buttons  | `6px`           | Echoes logo curve           |
| Inputs   | `6px`           | Consistent with buttons     |
| Badges   | `9999px` (pill) | Tighter signal for chips    |
| Avatars  | `9999px` (pill) | Tighter signal for identity |
| Spinners | `9999px`        | Circular indicator          |

Everything else stays flat (`0`).

---

## 3. Shadow & Elevation Policy

- **No drop shadows** on cards, buttons, or popovers in the flat-white theme.
- `StaccatoShadowLift` exists as a CSS hook but is intentionally a no-op
  (`/* no box-shadow on flat white */`).
- Elevation is communicated via surface layer (neutral zinc) and Staccato
  motion.

---

## 4. Inputs & Controls

```css
.Input {
	background-color: var(--Mute);
	padding: 0.375rem 0.75rem; /* py-1.5 px-3 */
	font-size: 0.875rem; /* text-sm */
	line-height: 1.25rem; /* leading-5 */
	ring-offset-color: var(--Background);
}
.Input::placeholder {
	color: var(--MuteForeground);
}
.Input:focus-visible {
	outline: none;
	box-shadow: 0 0 0 2px var(--Ring);
}
.Input:disabled {
	cursor: not-allowed;
	opacity: 0.5;
}
```

Focus ring: Tailwind convention `focus:outline-2 focus:outline-[var(--Primary)]`
is used in JSX for buttons/inputs.

---

## 5. Badges

```css
.Badge {
	display: inline-flex;
	align-items: center;
	border-radius: 9999px;
	border: 1px solid transparent;
	padding: 0.125rem 0.625rem; /* py-0.5 px-2.5 */
	font-size: 0.75rem; /* text-xs */
	line-height: 1rem; /* leading-4 */
	font-weight: 600; /* font-semibold */
	transition-property: opacity;
	transition-duration: 150ms;
}
```

Variant classes:

- `.BadgePrimary` - primary text on primary bg.
- `.BadgeSecondary` - secondary text on secondary bg.
- `.BadgeDestructive` - destructive styling.
- `.BadgeOutline` - transparent bg, foreground text, border fallback.

Dynamic `StaccatoBadge` extends with noise motion:

- seed micro-scale + opacity pulse.
- dot indicator: `StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none`.

---

## 6. Avatar

```css
.Avatar,
[class*="Avatar"] {
	border-radius: 9999px !important;
}
```

- Staccato: `StaccatoAvatar` - seed scatter via translate + scale.
- Hover resets transform.

---

## 7. Buttons

Radius: `6px` (`--RadiusButton`).

Size conventions:

- `px-4 py-2` - standard.
- `px-5 py-3` - large CTA.
- `px-8 py-2` - wide hero actions.

Hover behavior:

- Primary: opacity fade to 85%.
- Secondary: bg shifts to `--Surface3`.
- Outline: bg shifts to `--Mute`.
- Ghost: bg shifts to `--Accent`, text to `--AccentForeground`.

---

## 8. Cards

Flat corners. Interior is `var(--Card)` (white) or `var(--Mute)` (zinc-50).

Padding matrix:

- `p-4` - compact card.
- `p-5` - default card in grids.
- `p-6` - standard content card.
- `p-8` - feature card.

---

## 9. Separators & Dividers

- `StaccatoSeparator` - opacity pulse, micro `scaleX`.
- `StaccatoDivider` - similar but slower.
- Visual border: `w-full border-t`.

---

## 10. Related Documents

- `BrandManual.md` - philosophy
- `ShapeEdgeSystem.md` ← you are here
- `ComponentReference.md`, `StaccatoSystem.md`, `Accessibility.md`
