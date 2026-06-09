# Typography

Three faces, each with one job. Distinctive without being decorative.

| Face                 | Role              | Where                                                                        | Notes                                                                    |
| -------------------- | ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Instrument Serif** | Display headlines | Hero H1, section H1/H2 marketing titles                                      | High-contrast, "fancy". 400 + italic only. Used **large and sparingly**. |
| **Geist Mono**       | HUD chrome        | Eyebrows, labels, tags, badges, metadata, code, CLI output                   | The technical/terminal voice. Often uppercase + tracked `+0.04–0.08em`.  |
| **Geist** (sans)     | Body + UI         | Paragraphs, buttons, nav, form text, small component/card/dashboard headings | Replaces Albert Sans.                                                    |

All three are on **Google Fonts**, so the existing loading pattern in
`Source/Layout/Base.astro` extends cleanly — no self-hosting or `@vercel/font`
needed.

## 1. Font loading (`Source/Layout/Base.astro`)

Replace the single Albert Sans request with one combined `css2` request. Keep
the existing
`preconnect → preload as style → media="print" onload swap → noscript` pattern
and `display=optional` (it prevents CLS, which this repo deliberately optimizes
for).

```html
<link href="https://fonts.googleapis.com" rel="preconnect" />
<link crossorigin href="https://fonts.gstatic.com" rel="preconnect" />
<link
	as="style"
	href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=optional"
	rel="preload" />
<link
	href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=optional"
	media="print"
	onload="this.media='all'"
	rel="stylesheet" />
<noscript>
	<link
		href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=optional"
		rel="stylesheet" />
</noscript>
```

## 2. Tokens (`Source/Stylesheet/Base.css`, `:root`)

```css
--FontSans:
	"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--FontMono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
--FontSerif: "Instrument Serif", Georgia, "Times New Roman", serif;
```

## 3. Tailwind mapping (`tailwind.config.js`, `theme.extend.fontFamily`)

```js
fontFamily: {
  sans:  ["var(--FontSans)"],
  mono:  ["var(--FontMono)"],
  serif: ["var(--FontSerif)"],
},
```

This makes `font-mono` (already used in `RichText.tsx`, `Chart.tsx`,
`DynamicVerificationInfo.tsx`) and `font-serif` resolve to the new stack
automatically.

## 4. Global base (`Source/Stylesheet/Global.css`)

- Swap the `html { font-family: "Albert Sans", … }` declaration to
  `var(--FontSans)`.
- `font-size-adjust: 0.48` is tuned to Albert Sans's x-height. Geist's x-height
  differs — **re-measure or remove** this value when swapping, or CLS tuning
  will be off.
- Update the emoji-fallback comment that references Albert Sans.

## 5. Heading rollout strategy — do NOT blanket-serif

There are ~55 `<h1>–<h6>` tags. Serif is for **display**, not every heading. A
global `h1,h2,h3 { font-family: var(--FontSerif) }` rule would put serif on
small dashboard/card titles where it reads wrong.

**Rule:** serif is opt-in for display headings; everything else stays Geist
sans.

- Marketing **display** headings (hero H1, section H1/H2) → add `font-serif`
  (and pair with a Geist Mono eyebrow above them). Consider a `.Display` helper
  class for consistency.
- Small component/card/dashboard headings (`text-lg/text-xl font-semibold`) →
  leave on sans.
- Eyebrows / kickers / tags / metadata → `font-mono`, uppercase, tracked.

Current hero (`DynamicHeroSection.tsx:167`) is
`text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl` — this is the
prime serif target: switch to `font-serif`, drop to `font-normal` (Instrument
Serif is a 400 display face), loosen `tracking-tight` (serifs don't want
negative tracking at display size).

## Mono cleanup

`Source/Component/Dynamic/Portal/Stylesheet.css:242` hard-codes
`"JetBrains Mono", "Fira Code", monospace`. Replace with `var(--FontMono)` so
the portal matches the system mono.
