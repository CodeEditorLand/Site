# Typography

**Source:** `Source/Stylesheet/Base.css`, `Source/Stylesheet/Global.css`,
`tailwind.config.js`

---

## 1. Font Stack

### 1.1 Primary (Sans)

```css
--font-sans:
	"Albert Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"Helvetica Neue", Arial, sans-serif;
```

Applied globally via `@tailwind base`.

Weights used: `400` (body), `500` (labels), `600` (badges/medium), `700`
(headings).

Preloading strategy in `Base.astro`:

- `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`.
- Preload stylesheet with `display=optional` (reduces CLS).
- `font-size-adjust: 0.48` on `html` matches Albert Sans x-height ratio and
  stabilizes line height during fallback swap.

### 1.2 Monospace

```css
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

Used for: codes (Pair IDs, income codes), emails, slugs, file paths, CLI
references.

### 1.3 Emoji / Star Rating

```css
.StarRatingSymbol {
	font-family:
		"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji",
		"Android Emoji", "EmojiSymbols", sans-serif;
}
```

Applied explicitly via `StarRatingSymbol` class - never via broad attribute
selectors.

---

## 2. Sizing Conventions

There is no single enforced title pad system. Size is semantic per component:

| Context            | Typical Tailwind                | Example sources                     |
| ------------------ | ------------------------------- | ----------------------------------- |
| H1 / hero headline | `text-5xl` → `lg:text-8xl`      | `DynamicHeroSection.tsx`            |
| H2 / section       | `text-3xl` / `text-4xl`         | `DynamicFeatures.tsx`               |
| H3 / card title    | `text-lg` / `text-xl`           | `DynamicPricing.tsx`                |
| Body copy          | `text-sm`                       | Forms, cards, dashboard             |
| Helper / metadata  | `text-xs`                       | Hint text, SLA tags, error captions |
| Badge / chip       | `text-xs` inside `0.75rem` base | `DynamicBadge.tsx`                  |
| Monospace body     | `font-mono text-sm`             | Pair IDs, codes                     |

Rule: prefer `text-sm` for body, `text-xs` for metadata and form helper text.

---

## 3. Weight & Tracking

| Use             | Tailwind                       | Example                     |
| --------------- | ------------------------------ | --------------------------- |
| Body            | `font-normal` / implicit `400` | paragraphs                  |
| Labels, buttons | `font-medium` / `500`          | `StaccatoButton`            |
| Badges, bold    | `font-semibold` / `600`        | `StaccatoBadge`             |
| Headings        | `font-bold` / implicit `700`   | `DynamicHeroSection.tsx` H1 |
| Tight headings  | `tracking-tight`               | hero, section titles        |

---

## 4. Line Height & Measure

- Default body line-height: implicit Tailwind leading-normal.
- Form fields: `leading-snug` on labels, `leading-relaxed` on card descriptions.
- Measure cap: `max-w-2xl` for centered text columns.

---

## 5. Link Underline Policy (accessibility)

Body content links (excluding nav, logo, icon, social, button classes) are
underlined by default in `Global.css`:

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

Hover shifts underline to `--Primary`.

---

## 6. Selection Highlight

```css
*::selection {
	background: #fbbf24;
	color: #000;
}
```

High-visibility yellow-on-black to match flat-white aesthetic.

---

## 7. Tabular & Mono Contexts

- `tabular-nums` is applied to `body` globally for consistent numeric alignment.
- Numbers in code context (version strings, IDs) use `font-mono` or inherit via
  `.font-mono`.

---

## 8. Related Documents

- `BrandManual.md` - design philosophy
- `ColorSystem.md` - token mapping and palette
- `ComponentReference.md` - where typography is applied in components
