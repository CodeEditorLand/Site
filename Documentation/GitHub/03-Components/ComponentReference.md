# Component Reference
**Scope:** `Source/Component/Dynamic/`, `Source/Component/Layout/`, `Source/pages/`  
**Audience:** UI contributors, React/Astro developers

---

## 1. Cards

### 1.1 `StaccatoCard`

Base class for every content container.

```tsx
className="StaccatoCard StaccatoBorderShimmer bg-white p-6"
```

Behavior:
- Seed scatter on load via `--StaccatoSeed` / `--StaccatoSeedPhase`.
- Scroll-reveal via intersection observer applying `--Attention*` vars.
- Hover collapses motion to anchor transform.

Modifiers seen in codebase:

| Modifier | Example | Meaning |
|----------|---------|---------|
| `bg-white` | default | White interior |
| `bg-[var(--Mute)]` | subtle cards | Zinc-50 interior |
| `p-5` / `p-6` / `p-8` | grid sizing | Padding scale |
| `rounded-none` | enforced | Flat corner (default, often explicit) |
| `border border-red-200` | Delete account | Error context |
| `border border-primary` | verification | Emphasis context |

Related:
- `FeatureCard StaccatoCard ... space-y-6` - feature section.
- `PricingCard StaccatoCard ...` - pricing.
- `MasonryCard TestimonialCard StaccatoCard ...` - testimonial with `--masonry-col`.

Sources:
- `DynamicFeatures.tsx`, `DynamicPricing.tsx`, `DynamicTestimonials.tsx`,
  `DynamicLocalFirstScan.tsx`, `DynamicVerificationInfo.tsx`,
  `DynamicSystemRequirements.tsx`, `DynamicPrivacyRequests.tsx`,
  `DynamicAccountProfile.tsx`, `DynamicTransparency.tsx`,
  `Dashboard.astro`, `Doc.astro`, `Contact/Sale.astro`.

---

### 1.2 Composite Cards (page-level)

| Component | Path | Notable classes |
|-----------|------|----------------|
| `DynamicSignIn` | `DynamicSignIn.tsx` | `StaccatoCard StaccatoBorderShimmer StaccatoShadowLift` (lift is no-op) |
| `DynamicSignUp` | `DynamicSignUp.tsx` | Same |
| `DynamicResetPassword` | `DynamicResetPassword.tsx` | Same |
| `DynamicForgotPassword` | `DynamicForgotPassword.tsx` | Same |
| `DynamicEmailVerification` | `DynamicEmailVerification.tsx` | Same |
| `DynamicCard` / `FeatureCard` | `DynamicCard.tsx` | `FeatureCard StaccatoCard flex flex-col space-y-6 rounded-none bg-white p-8` |
| `DynamicBlogCard` | `DynamicBlogCard.tsx` | `StaccatoCard bg-[var(--ColorCard)] p-6` |

---

## 2. Buttons

### 2.1 `StaccatoButton`

```tsx
className="StaccatoButton inline-flex items-center justify-center
           bg-[var(--Primary)] px-4 py-2 font-medium text-white
           transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2
           focus:outline-[var(--Primary)]"
```

Behavior:
- Seed micro-scatter.
- Hover: `translateY(-1px)`.
- Active: `translateY(0)`.
- Focus ring: `outline: 2px solid var(--Primary); outline-offset: 3px`.

Variants seen in codebase:

| Variant | Class pattern | Example context |
|---------|---------------|-----------------|
| Primary | `bg-[var(--Primary)] text-white hover:opacity-90` | Auth, primary CTAs |
| Secondary / Ghost | `bg-white border border-[var(--Border)] text-foreground hover:bg-[var(--Secondary)]` | Dashboard actions |
| Destructive | `text-red-600` or `border-red-200 hover:bg-red-50` | Reset password, delete |
| Local-first scan | `border border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100` | LocalFirstScan |
| Inline hero | `text-primary hover:underline` | Documentation links |

Sources:
- `DynamicButton.tsx`, `DynamicDashboardUser.tsx`, `DynamicLocalFirstScan.tsx`,
  `DynamicAccountProfile.tsx`, `DynamicContactForm.tsx`,
  `404.astro`, `Contact/Sale.astro`, `Doc.astro`, `Doc/[...Slug].astro`.

---

## 3. Badges

### 3.1 `StaccatoBadge`

```tsx
className={`StaccatoBadge ${ClassName}`}
```

Behavior:
- Seed micro-scale + opacity pulse.
- Dot indicator: `StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none`.

Composition:
```tsx
<span className="StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-semibold uppercase tracking-wider text-muted-foreground" />
```

Or tier/tinted:
```tsx
className={`inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-xs font-medium ${TierColor.Text}`}
```

Sources:
- `DynamicBadge.tsx`, `DynamicPricing.tsx`, `DynamicAccountProfile.tsx`,
  `DynamicTransparency.tsx`, `Auth0AccountGate.tsx`.

---

## 4. Inputs & Form Fields

### 4.1 `StaccatoInput`

Wrapper class: `StaccatoInput flex flex-col gap-2`.

Field pattern:
```tsx
<input className="w-full border border-[var(--Border)] bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[var(--Primary)]" />
```

Labels:
```tsx
<label className="mb-1 block text-sm font-medium">...</label>
```

Validation feedback:
```tsx
<p className="mt-1 text-xs text-red-600">{error}</p>
<p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
```

Sources:
- `DynamicInput.tsx`, `DynamicContactForm.tsx`, `DynamicAccountProfile.tsx`.

---

## 5. Navigation

### 5.1 `StaccatoNavLink`

```tsx
className="StaccatoNavLink relative flex items-center px-4 py-3 font-medium
           text-muted-foreground transition-colors hover:text-foreground
           focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
```

Used in:
- `Header.tsx` - main nav, accordion submenus.
- `Footer.tsx` - footer links.

Submenu:
- `HeaderSubLink` shares root styling with smaller padding (`py-2`).

---

## 6. Social & Identity

### 6.1 `StaccatoSocial`

```tsx
className="StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
```

Behavior:
- Seed scatter + live opacity (`0.72 → 1`).
- Hover: `translateY(-2px) scale(1.08)`.

Used in `Footer.tsx` for X/Twitter and related links.

### 6.2 `StaccatoLogo`

```tsx
className="StaccatoLogo HeaderLogo flex items-center space-x-3 ..."
```

Behavior:
- Transition `transform 0.6s ease`.
- Hover is disabled (logo should remain stable).
- Decorative, near-zero seed offset.

---

## 7. Dividers

```tsx
<span className="StaccatoSeparator w-full border-t" />
<hr className="StaccatoDivider" />
```

- `StaccatoSeparator` - opacity + `scaleX` micro-transform.
- `StaccatoDivider` - same, slower.

---

## 8. Motion-Decorated Text & Icons

| Class | Effect | Used in |
|-------|--------|---------|
| `StaccatoBreath` | Live opacity breathing | Hero subtext, card descriptions, pricing |
| `StaccatoColorShift` | `hue-rotate(±4deg)` | Hero headline (`DynamicHeroSection.tsx`) |
| `StaccatoIcon` | Seed position + opacity shimmer | Icons in nav, cards, features |
| `StaccatoAvatar` | Seed scatter + micro scale | User avatars |
| `StaccatoCheckmark` | Seed scale + opacity shine | Verification |
| `StaccatoToggle` | Seed micro-scale | Toggles |
| `StaccatoStar` | Seed opacity + brightness | Testimonials |
| `StaccatoPrice` | Seed micro-scale | Pricing display |
| `StaccatoCursor` / `StaccatoTypewriter` | Typewriter loc-switch | RichText locale switch |

---

## 9. Composite Dynamic Components

### 9.1 `DynamicHeroSection`

- `StaccatoHeroButton` - hero CTA with `StaccatoFloat` parent.
- `StaccatoFloat` decorations for hero illustrations.
- Logo: `StaccatoLogo` centered, neutral seed.

### 9.2 `DynamicDashboardUser`

- Sign-in prompt: `StaccatoButton inline-flex items-center justify-center bg-[var(--Primary)] px-4 py-1.5 font-medium text-white ...`.
- Row actions: `StaccatoButton inline-flex flex-1 ... bg-white ...`.

### 9.3 `DynamicLocalFirstScan`

- Scan action: `StaccatoButton inline-flex items-center justify-center border border-orange-300 bg-orange-50 px-4 py-2 font-medium text-orange-700 ...`.

### 9.4 `DynamicAccountProfile`

- Save button: `StaccatoButton inline-flex items-center justify-center bg-[var(--Primary)] px-6 py-2 font-medium text-white ...`.
- Danger action: `StaccatoButton inline-flex w-full items-center justify-center border border-red-200 bg-white px-4 py-2 font-medium text-red-600 ...`.

### 9.5 `DynamicPrivacyRequests`

- Rights cards: `StaccatoCard StaccatoBorderShimmer flex flex-col bg-white p-5 transition-all hover:bg-[var(--Secondary)] focus:outline-2 ...`.
- Support channels: same with hover `focus:outline-offset-2`.

### 9.6 `DynamicTransparency`

- Status cards: `TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none bg-white p-6`.
- Status `Badge`, `StaccatoDot`, `StaccatoIcon h-5 w-5 text-primary`.

---

## 10. Naming Conventions

- Prefix all Staccato-decorated elements with `Staccato`.
- Keep JSX class order stable: `StaccatoBase StaccatoMotion <layout> <theme> <state>`.
- Composite components are `Dynamic<Feature>` (client-side content) or static page components.

---

## 11. Related Documents

- `BrandManual.md`
- `ComponentReference.md` ← you are here
- `StaccatoSystem.md`, `ShapeEdgeSystem.md`, `LayoutPatterns.md`,
  `StateFeedbackColors.md`
