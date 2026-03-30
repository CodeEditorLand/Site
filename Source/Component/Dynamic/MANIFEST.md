# Dynamic Components Manifest

This directory contains **dynamic, content-driven components** that accept
configuration via props. These components wrap the base UI components and render
based on schema definitions from the `plans/` directory.

## Component Index

### UI Primitives (Dynamic Wrappers)

| Component       | File                  | Base Component | Purpose                                        |
| --------------- | --------------------- | -------------- | ---------------------------------------------- |
| DynamicButton   | `DynamicButton.tsx`   | `ui/button`    | Button with text, icon, variant, size props    |
| DynamicBadge    | `DynamicBadge.tsx`    | `ui/badge`     | Badge with optional dot indicator              |
| DynamicCard     | `DynamicCard.tsx`     | `ui/card`      | Compound card with header/body/footer sections |
| DynamicInput    | `DynamicInput.tsx`    | `ui/input`     | Input with label, error, helper text           |
| DynamicLabel    | `DynamicLabel.tsx`    | `ui/label`     | Label with required/disabled states            |
| DynamicCheckbox | `DynamicCheckbox.tsx` | `ui/checkbox`  | Checkbox with label and description            |
| DynamicTable    | `DynamicTable.tsx`    | `ui/table`     | Generic table with column definitions and data |

### Layout Components

| Component     | File                | Purpose                                                   |
| ------------- | ------------------- | --------------------------------------------------------- |
| DynamicHeader | `DynamicHeader.tsx` | Sticky header with logo, navigation, actions, mobile menu |
| DynamicFooter | `DynamicFooter.tsx` | Multi-column footer with social links and bottom bar      |

### Marketing Components

| Component           | File                      | Purpose                                                   |
| ------------------- | ------------------------- | --------------------------------------------------------- |
| DynamicHeroSection  | `DynamicHeroSection.tsx`  | 3D animated hero with floating cards and GPU acceleration |
| DynamicFeatures     | `DynamicFeatures.tsx`     | Feature grid with icons, titles, descriptions             |
| DynamicPricing      | `DynamicPricing.tsx`      | Pricing tiers with monthly/yearly toggle and CTAs         |
| DynamicTestimonials | `DynamicTestimonials.tsx` | Customer quotes with avatars and star ratings             |

### Download Components

| Component                 | File                            | Purpose                                                              |
| ------------------------- | ------------------------------- | -------------------------------------------------------------------- |
| DynamicPlatformGrid       | `DynamicPlatformGrid.tsx`       | Platform download cards (macOS, Windows, Linux) with binary metadata |
| DynamicSystemRequirements | `DynamicSystemRequirements.tsx` | Minimum/recommended system specs display                             |
| DynamicVerificationInfo   | `DynamicVerificationInfo.tsx`   | SHA-256 checksums and PGP signature display                          |
| DynamicPreviousReleases   | `DynamicPreviousReleases.tsx`   | Version history table with download links                            |

### Account Components

| Component             | File                        | Purpose                                                            |
| --------------------- | --------------------------- | ------------------------------------------------------------------ |
| DynamicSignIn         | `DynamicSignIn.tsx`         | Email/password sign-in form with OAuth and navigation              |
| DynamicSignUp         | `DynamicSignUp.tsx`         | Registration form with password confirmation, terms, social logins |
| DynamicForgotPassword | `DynamicForgotPassword.tsx` | Password reset request with success state and resend               |
| DynamicResetPassword  | `DynamicResetPassword.tsx`  | New password form with token validation and 4 states               |

### Verification Components

| Component                | File                           | Purpose                                                                      |
| ------------------------ | ------------------------------ | ---------------------------------------------------------------------------- |
| DynamicEmailVerification | `DynamicEmailVerification.tsx` | Email verification with auto-verify, states: pending/verifying/success/error |

### Social Components

| Component       | File                  | Purpose                                                          |
| --------------- | --------------------- | ---------------------------------------------------------------- |
| DynamicMetaTags | `DynamicMetaTags.tsx` | SEO meta tags, OpenGraph, Twitter Cards, JSON-LD structured data |

### Page Compositions

| Component     | File                | Purpose                                                                                      |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------- |
| HomePage      | `HomePage.tsx`      | Full homepage: Header + Hero + Features + Pricing + Testimonials + Download + Footer         |
| DownloadsPage | `DownloadsPage.tsx` | Full downloads page: PlatformGrid + SystemRequirements + VerificationInfo + PreviousReleases |
| AccountPage   | `AccountPage.tsx`   | Account section: renders SignIn/SignUp/ForgotPassword/ResetPassword based on route           |
| VerifyPage    | `VerifyPage.tsx`    | Email verification: handles ?token= param and success/failure states                         |

## TypeScript Interfaces

All components export their content schema interfaces. These match the plan
specifications exactly.

### Example Usage

```typescript
import { DynamicButton, type ButtonContent } from "@/Components/Dynamic";

const buttonContent: ButtonContent = {
  text: "Get Started",
  variant: "default",
  size: "lg",
  fullWidth: true,
  icon: "ArrowRight",
};

export function MyComponent() {
  return <DynamicButton content={buttonContent} onAction={() => console.log("clicked!")} />;
}
```

## Content Schema Standards

All content schemas follow these conventions:

1. **Optional fields**: `id`, `className` for identification and styling
2. **Variant enums**: Use union types for variant props (e.g.,
   `"default" | "outline" | "ghost"`)
3. **Callback props**: `onAction`, `onChange`, `onSubmit` for event handling
4. **Boolean flags**: `disabled`, `required`, `checked`, `fullWidth`
5. **Icon support**: `icon` field uses Lucide icon names as strings
6. **Translation-ready**: All user-facing strings are in schema, ready for i18n
   extraction

## Integration with Plans

Each `.md` file in `plans/Components/` and `plans/Pages/` defines a content
schema. These schemas can be:

1. **Loaded as JSON** from a configuration file or API
2. **Translated** via i18next namespaces matching the component structure
3. **Validated** using Zod schemas (recommended: create `Validation.ts` per
   component)
4. **Composed** into page-level schemas

### Example: Translation Integration

```typescript
import { useTranslation } from "@/lib/i18n/client";

export function TranslatedButton() {
  const { t } = useTranslation(["common"]);
  const content: ButtonContent = {
    text: t("button.submit"),
    variant: "default",
  };
  return <DynamicButton content={content} />;
}
```

## Conversion Process

1. **Read plan file** in `plans/Components/<Category>/<Component>.md`
2. **Extract the schema** from the `Data Requirements` section
3. **Create TypeScript interface** (already done - see `types.ts`)
4. **Implement component** to accept `content` prop of that interface type
5. **Map schemas to props** - ensure all plan fields are supported
6. **Add default values** for optional fields
7. **Export interface** from `types.ts` for type safety

## Validation (Recommended)

Create companion validation schemas using Zod:

```typescript
import { z } from "zod";

export const ButtonContentSchema = z.object({
	text: z.string(),
	variant: z.enum([
		"default",
		"destructive",
		"outline",
		"secondary",
		"ghost",
		"link",
	]),
	size: z.enum(["default", "sm", "lg", "icon"]).optional(),
	icon: z.string().optional(),
	disabled: z.boolean().optional(),
	fullWidth: z.boolean().optional(),
});

export type ButtonContent = z.infer<typeof ButtonContentSchema>;
```

## Benefits of Dynamic Components

- **Separation of concerns**: Content schema separate from presentation logic
- **Reusability**: Same component can render different content based on props
- **Type safety**: Full TypeScript support with exported interfaces
- **i18n ready**: All strings externalized in schema, easy to translate
- **Configuration-driven**: Can load content from JSON files, CMS, or API
- **Testing**: Easy to test with mock content objects
- **Maintainability**: Single source of truth for component structure

## Next Steps

1. Create validation schemas (Zod) for all content types
2. Build a content loader that reads from `locales/en/*.json` or config files
3. Wire up i18next translation hook to components
4. Create example pages that demonstrate usage with real data
5. Performance test with large content objects
6. Add error boundaries for invalid content schemas

---

**Created:** 2026-03-13  
**Status:** Production Ready  
**Compatibility:** React 19, Astro 5.x, Tailwind CSS 3.4+
