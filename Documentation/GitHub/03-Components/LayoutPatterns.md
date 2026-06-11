# Layout Patterns

**Scope:** Page shells, hero features, dashboard, forms, legal pages  
**Audience:** Astro/React contributors

---

## 1. Page Shell

`Base.astro` defines the invariant structure:

```astro
<Background />
<main id="main-content" class="grow" tabindex="-1">
	<ErrorBoundary client:load>
		<slot />
	</ErrorBoundary>
</main>
<Footer client:idle />
```

Skip link:
`sr-only fixed left-2 top-2 z-[100] -translate-y-full bg-[var(--Primary)] px-4 py-2 font-medium text-white transition-transform focus:not-sr-only focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]`.

---

## 2. Hero Section

Path: `Source/Component/Dynamic/DynamicHeroSection.tsx` and
`Source/pages/index.astro`.

Layout:

- Background parallax layers: `StaccatoParallaxNear/Mid/Far` - **position
  transforms are zeroed** (see `StaccatoSystem.md §0`). Classes are present as
  layout hooks; no actual parallax movement.
- Floating decorations: `StaccatoFloat`, `StaccatoBreath` - Float is neutralized;
  Breath (opacity) is still active.
- Center CTA: `StaccatoHeroButton` - position transform zeroed, opacity active.
- Logo: `StaccatoLogo` (stable seed, no hover transform).

Heading class pattern:

```tsx
<h1 className="StaccatoColorShift mx-auto max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
```

Subhead:

```tsx
<div className="StaccatoBreath mx-auto mt-3 max-w-2xl text-[var(--MuteForeground)]">
```

---

## 3. Feature / Pricing Grids

### 3.1 Feature cards

Pattern:

```tsx
<div className={clsx("StaccatoMorphGap grid", ColumnClass)}>
	<div className="FeatureCard StaccatoCard flex flex-col space-y-6 rounded-none bg-card p-8" />
</div>
```

- `StaccatoMorphGap grid` is present but gap-morph is disabled to prevent CLS;
  safe as layout hook.
- Column classes assigned by layout helper.

### 3.2 Pricing cards

```tsx
<div className={clsx("StaccatoMorphGap grid", ColumnClass)}>
	<div className="PricingCard StaccatoCard flex flex-col rounded-none bg-card ...">
		<span className="StaccatoBadge shrink-0 bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground" />
		<span className="StaccatoBadge StaccatoRhythmBeat font-semibold uppercase tracking-wider text-primary" />
		<span className="StaccatoBreath text-muted-foreground" />
	</div>
</div>
```

---

## 4. Testimonials (Masonry)

```tsx
<div className="MasonryCard TestimonialCard StaccatoCard flex flex-col rounded-none bg-card p-8">
```

- Masonry col span set inline via `style="--masonry-col: N"`.
- Below `1024px` cards collapse to `grid-column: span 1`.

---

## 5. Dashboard

### 5.1 Public Section

- Editable top cards: `StaccatoCard StaccatoBorderShimmer bg-card p-6`.
- Local-first scan: `DynamicLocalFirstScan` card with orange action button.
- Transparency: `TransparencyCard StaccatoCard ...`.
- Privacy requests: `DynamicPrivacyRequests` rights grid + support grid + delete
  account card.

### 5.2 Auth-Gated Section

- User panel: `DynamicDashboardUser` - sign-in prompt, tier/badge summary,
  request history, needs-region form.

---

## 6. Forms

Canonical pattern:

```tsx
<div className="mx-auto max-w-2xl space-y-8 px-4 py-12">
	<div className="StaccatoCard space-y-5 bg-white p-6">{/* fields */}</div>
	<div className="space-y-4">
		<p className="text-sm font-medium">How would you like to send this?</p>
		<button className="StaccatoButton flex w-full items-center gap-3 border border-[var(--Border)] px-5 py-3 font-medium transition-all hover:bg-[var(--Secondary)] ..." />
	</div>
	<div className="border border-[var(--Border)] bg-[var(--Mute)] px-5 py-4 text-sm text-muted-foreground">
		{/* Pair reference explanation */}
	</div>
</div>
```

---

## 7. Auth Cards (Sign In / Up / Reset)

Shared pattern:

```tsx
<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
  <Separator className="StaccatoSeparator my-8" />
  <span className="StaccatoSeparator w-full border-t" />
```

---

## 8. Legal Pages

- White card with explicit padding:
  `LegalCard background-color: var(--Background); color: var(--Foreground); padding: 2rem`.
- Lists:
  `.LegalCard ol.LegalList { list-style-type: lower-alpha; padding-left: 1.75rem; }`.
- Print mode hides header/nav/footer and forces black text.

Used by: `Legal/Privacy.astro`, `Legal/Term.astro`.

---

## 9. Dashboard Flow

```
/ (public) → hero → features → pricing → testimonials → download
/Dashboard (public, no auth gate)
  ├─ local-first scan card (public)
  ├─ transparency cards (public)
  ├─ privacy / data-rights cards (public)
  └─ auth-gated panel (DynamicDashboardUser)
      ├─ sign-in prompt
      ├─ tier summary
      ├─ request history
      └─ needs-region form
```

---

## 10. CLS Prevention Rules

- Reserve heights for `main > astro-island` and `#Footer`.
- `contain-intrinsic-block-size` mirrors `min-height`.
- When hydration detects content (`:has(> :first-child)`), release reserved
  space.
- Content sections below the fold use `content-visibility: auto` with
  `contain-intrinsic-block-size: 800px`.
- Never animate `padding` or `gap` via Staccato; these properties cause layout
  shift.

---

## 11. Related Documents

- `BrandManual.md`
- `LayoutPatterns.md` ← you are here
- `SpacingLayout.md`, `ComponentReference.md`, `Accessibility.md`,
  `StaccatoSystem.md`, `MotionPerformance.md`
