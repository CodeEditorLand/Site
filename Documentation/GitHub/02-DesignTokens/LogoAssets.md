# Logo & Assets

**Authority:** `Source/Layout/Base.astro`, `Source/Background/Stylesheet.css`,
usage search across `Source/`

---

## 1. Logo Usage

| Asset            | Path                                                          | Usage                                |
| ---------------- | ------------------------------------------------------------- | ------------------------------------ |
| Glyph logo (SVG) | `/Asset/Logo/Glyph/Land.svg`                                  | Header, footer, dashboard, OpenGraph |
| Favicon SVG      | `/Favicon/favicon.svg`                                        | Browser tab                          |
| Favicon PNG      | `/Favicon/favicon-96x96.png`, `/Favicon/apple-touch-icon.png` | Legacy / iOS                         |
| Favicon ICO      | `/Favicon/favicon.ico`                                        | Legacy Windows                       |
| Web manifest     | `/Favicon/site.webmanifest`                                   | PWA / install                        |

LCP optimization: `Base.astro` preloads `/Asset/Logo/Glyph/Land.svg` with
`rel="preload" as="image"`.

---

## 2. Logo Component

```
StaccatoLogo
HeaderLogo
LogoBox
```

- `StaccatoLogo`: near-zero seed offset (logo stability policy); hover
  transformation commented out in Stylesheet.css.
- `LogoBox`:
  `relative flex h-8 w-8 items-center justify-center overflow-hidden`.
- Header text: `HeaderData.Logo?.Text || "Land"` - translatable, but defaults to
  `Land`.

---

## 3. OpenGraph Images

Generated per route:

- Home: `/OpenGraph.svg` (static endpoint).
- All other routes: `/OpenGraph/{Slug}.svg` via `[...Slug].svg.ts`.

Implementation: `Source/Function/OpenGraph.js` +
`Source/Function/OpenGraph/PageMetadata.js`.

---

## 4. Background Media

- `Background.astro` renders a fixed full-viewport layer behind all content.
- Layout container (`#Layout .Container`) is 200vw × 200vh, centered, and given
  Staccato transforms.
- Two layers: `#Rock` (z-index -3) and `#Background` (z-index -2).
- Image opacity: `#Rock` at `0.2`, `#Background` at `0.15`.
- Preferred media types: high-resolution landscape photography, abstract
  gradients at low saturation.

---

## 5. Asset Path Conventions

| Type        | Convention                                                        |
| ----------- | ----------------------------------------------------------------- |
| Logos       | `Asset/Logo/<Style>/<Name>.svg`                                   |
| Favicons    | `Favicon/<name>.<ext>`                                            |
| OpenGraph   | route endpoint, not static files                                  |
| Backgrounds | consumed via `Background.astro`, path resolved in component props |

---

## 6. Theme Color

`<meta name="theme-color" content="#ffffff" />` is currently set for light mode
only in `Base.astro`. For dual-theme support, use `media` variants:

```html
<meta
	name="theme-color"
	content="#ffffff"
	media="(prefers-color-scheme: light)"
/>
<meta
	name="theme-color"
	content="#0a0a0a"
	media="(prefers-color-scheme: dark)"
/>
```

`#0a0a0a` matches the dark mode `--Background` canvas token so the browser
chrome (mobile address bar, PWA title bar) follows the active theme.

---

## 7. Related Documents

- `BrandManual.md` - philosophy
- `LogoAssets.md` ← you are here
- `ComponentReference.md`, `LayoutPatterns.md`
