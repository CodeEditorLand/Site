# State & Feedback Colors

**Scope:** Exception tokens that do not fit the semantic `/Mute/Surface/Fore`
triplet  
**Audience:** Frontend contributors

---

## 1. When to Use Direct State Colors

Semantic tokens (`--Destruct`, etc.) cover system states. For richer context -
validation, status, warnings, local-first CTAs - use these curated palettes:

| State               | Palette               | Where it appears                  |
| ------------------- | --------------------- | --------------------------------- |
| Error / destructive | `red-*`               | Form validation, destructive CTAs |
| Success / verified  | `green-*`             | Tick marks, verified email        |
| Warning             | `yellow-*`            | Account warnings                  |
| Local-first / scan  | `orange-*`            | Local-first scan action           |
| Star rating         | `yellow-400`          | `StaccatoStar`                    |
| Scrollbar           | `rgba(26,26,26,0.18)` | WebKit/Firefox thumb              |
| Selection           | `#fbbf24 text-black`  | `*::selection`                    |

---

## 2. Error / Destructive

| Tailwind                               | Hex       | Applied to               |
| -------------------------------------- | --------- | ------------------------ |
| `border-red-200`                       | `#fecaca` | Input borders on error   |
| `bg-red-50`                            | `#fef2f2` | Field / card tint        |
| `text-red-600`                         | `#dc2626` | Error text               |
| `text-red-700`                         | `#b91c1c` | Badge / strong emphasis  |
| `hover:bg-red-50` / `hover:bg-red-100` | -         | Destructive button hover |

System token path:

- `--Destruct` = `#dc2626`.
- `--DestructForeground` = `#ffffff`.
- Badge variant: `.BadgeDestructive`.

Examples in code:

- `DynamicAccountProfile.tsx` - danger action button.
- `DynamicResetPassword.tsx` - destructive path.
- `DynamicContactForm.tsx` - validation messages.

---

## 3. Success / Verification

| Tailwind                   | Hex       | Applied to                  |
| -------------------------- | --------- | --------------------------- |
| `border-green-200`         | `#bbf7d0` | Verification borders        |
| `bg-green-50`              | `#f0fdf4` | Success panel               |
| `text-green-600` `#16a34a` | -         | Success text                |
| `text-green-700` `#15803d` | -         | Emphasis for verified items |

Examples:

- `DynamicAccountProfile.tsx` - verification success panel.
- `DynamicSystemRequirements.tsx` - green verification card.

---

## 4. Warning

| Tailwind            | Hex                   | Applied to        |
| ------------------- | --------------------- | ----------------- |
| `bg-yellow-50`      | `#fefce8`             | Warning panel     |
| `border-yellow-200` | `#fde68a`             | Warning border    |
| `text-yellow-700`   | `#92400e` / `#b45309` | Warning text tone |

Example: `DynamicAccountProfile.tsx` - region/data warning banner.

---

## 5. Local-First / Scan Action

Intentionally uses orange to signal “local tool action”.

| Tailwind              | Hex       | Applied to                    |
| --------------------- | --------- | ----------------------------- |
| `border-orange-300`   | `#fdba74` | Local-first button border     |
| `bg-orange-50`        | `#fff7ed` | Local-first button background |
| `text-orange-700`     | `#c2410c` | Local-first button text       |
| `hover:bg-orange-100` | `#ffedd5` | Hover                         |

Example: `DynamicLocalFirstScan.tsx`, `Dashboard.astro`.

---

## 6. Star Rating

```tsx
<span className="StaccatoStar StarRatingSymbol text-yellow-400">★</span>
```

- Emoji font for the glyph.
- `StaccatoStar`: opacity + brightness driven by `--StaccatoColor`.

---

## 7. Scrollbar & Selection

```css
/* Thin, transparent, cross-browser */
::-webkit-scrollbar-thumb {
	background: rgba(26, 26, 26, 0.18);
}
html {
	scrollbar-color: rgba(26, 26, 26, 0.18) transparent;
}

*::selection {
	background: #fbbf24;
	color: #000;
}
```

---

## 8. Related Documents

- `BrandManual.md`
- `StateFeedbackColors.md` ← you are here
- `ColorSystem.md`, `ComponentReference.md`, `Accessibility.md`
