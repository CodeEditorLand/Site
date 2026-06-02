# TODO — Design Overhaul

Tracking the cyberpunk-HUD + dual-theme redesign. Design language and conventions live in
the [`land-design` skill](.claude/skills/land-design/SKILL.md) — read it before touching
typography, tokens, themes, or components.

## ✅ Done

- [x] Fix dev errors — declared missing peers `@testing-library/dom` + `react-is`
      (`.npmrc` `legacy-peer-deps=true` skips peers).
- [x] `land-design` project skill (SKILL + Typography / Theme / Architecture / Copy refs),
      kept updated with implementation learnings.
- [x] Type system: **Geist** (body) · **Geist Mono** (HUD chrome) · **Instrument Serif**
      (display). Albert Sans dropped; tokens + Tailwind `fontFamily` wired.
- [x] Dual theme: refined flat-white **light** + cyberpunk-HUD **dark** (`.dark` token block
      in `Base.css`), no-flash pre-paint script, persisted theme toggle in the header.
- [x] Hero: Instrument Serif "Land", `// TECH STACK` mono eyebrow, blueprint-grid backdrop,
      orbital diagram → modern HUD tile grid (accent bar + lucide icon + mono label).
- [x] Calm/static motion: removed Staccato tilt, scatter, and scroll-parallax.
- [x] Cards: `bg-white` → `bg-card` sweep (~110 sites) + hairline border + hover-only glow.
- [x] Header: frosted theme-aware bar; nav consolidated 7 → 4 (Features/Docs/Download/GitHub).
- [x] Section spacing: removed forced `100dvh` / `200dvh` bands.
- [x] Hardcoded colors: `bg-white` + CSS `#ffffff` literals tokenized
      (only intentional Auth0 `#EB5424` remains).
- [x] Emojis → lucide everywhere (footer, element cards, dashboard, tooltips, docs).
- [x] Serif display on marketing section headings.
- [x] **Logo** — replaced semi-transparent parallelogram pair with a 32×32 black-square /
      white-L mark (`Public/Asset/Logo/Glyph/Land.svg`). Self-contained light+dark; no
      CSS filter needed.
- [x] **Section `//` eyebrows** — mono `// Section` labels (green `//` + uppercase tracking)
      added before every section `<h2>`: Features, Roadmap, Architecture, Download.
      Matches the hero `// TECH STACK` pattern. Pattern established in `land-design` skill.
- [x] **No alternating section backgrounds** — removed `bg-[var(--Mute)]` from Features
      and Architecture sections; all sections now share the flat white canvas.
- [x] **Feature card accent system** — colored left-border + `*Mute` tinted icon container
      per spine token; matches the testimonial/masonry card pattern.
- [x] **Footer refinement** — `Layout/Footer.tsx` column headers → mono uppercase; NLnet
      notice → green left-border accent; brand description → `whitespace-pre-line`.
      `DynamicFooter.tsx` gray bg removed. `index.astro` badge strip fully tokenized.
- [x] **`DynamicBadge` dot colors** — replaced theme-blind `bg-green-500` etc. with spine
      CSS variable tokens via inline style.

## 🔴 Remaining — high priority

- [ ] **Theme-blind status colors (~140 utilities remaining).** `bg-green-50`, `text-red-600`,
      `border-blue-200`, `bg-yellow-50`, etc. are light-only and look wrong in dark.
      `pages/index.astro` badge strip is **done** (spine tokens). Still outstanding:
      `Source/pages/Dashboard.astro` (65), `DynamicAccountProfile` (48),
      `DynamicLocalFirstScan` (31), `UI/RichText.tsx` (19), `DynamicContactForm` (17),
      `pages/Download.astro` (13), `DynamicPrivacyRequests`, `DynamicDashboardUser`,
      `DynamicTransparency`, `pages/Portal.astro`.
      **Fix:** add semantic status tokens (Success / Info / Warning / Danger with
      surface / fore / border, theme-aware) in `Base.css`, then replace the palette
      utilities — or use `dark:` variants. See [Theme.md](.claude/skills/land-design/Reference/Theme.md).

## 🟡 Remaining — medium priority

- [ ] **Copy pass.** Rewrite hero/features/pricing strings to the marketing-led voice and move
      deep-technical prose to docs; mirror across all five locales. Spec + before/after
      examples in [Copy.md](.claude/skills/land-design/Reference/Copy.md).
      Files: `Source/Library/I18n/Locale/<Lang>/{Home,Header,Footer,Meta}.json`.
- [ ] **Serif headings on inner pages** — extend the display-serif treatment to Docs,
      Dashboard, Account, Contact, Legal section titles (marketing sections done).
- [ ] **Validate dark mode on inner pages** — Dashboard, Account, Portal, Docs, Contact
      (homepage + features validated; these depend on the status-color fix above).

## 🟢 Polish / follow-ups

- [ ] Remove now-unused `Emoji` field from architecture data (`HomePage.tsx`) and the
      `Testimonial` interface, plus the unused `IconTooltip` import in `DynamicHeroSection`.
- [ ] Re-measure `font-size-adjust` (currently `0.52`) against Geist's actual x-height for CLS.
- [ ] Add the theme toggle to the mobile menu (currently desktop action cluster only).
- [ ] Star-rating glyphs (`★`/`☆` in `DynamicTestimonials`) are functional, not emoji — leave,
      or swap to a lucide `Star` if a consistent icon system is wanted there too.
- [ ] Theme-aware `<meta name="theme-color">` is handled by the toggle + pre-paint script;
      confirm it updates on system-theme change while on the default (no stored pref).
