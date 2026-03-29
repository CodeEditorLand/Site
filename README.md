# WebSite

The official marketing website for **Code Editor Land** - The Next-Generation Code Editor

[![License](https://img.shields.io/github/license/CodeEditorLand/WebSite?style=flat-square&logo=github)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D53?style=flat-square&logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.0.0-000000?style=flat-square&logo=shadcn-ui)](https://ui.shadcn.com)

---

## Overview

WebSite is the official marketing and download portal for Code Editor Land, a post-Electron, Rust + Tauri-powered code editor that forks VSCode. This repository contains a fully dynamic, translation-ready website built with modern web technologies.

### Key Features

- **Dynamic Component System** - Content-driven components using TypeScript schemas
- **Full i18n Support** - 8 translation namespaces with English complete
- **Design System Compliance** - Enforced 3px borders, no border-radius, strict contrast
- **Responsive Layout** - Mobile-first design with adaptive grid systems
- **SEO Optimized** - Meta tags, sitemap generation, Open Graph support
- **Fast Builds** - Astro 5 with Vite for instant HMR and optimized production builds
- **Cloudflare Workers Integration** - Full-stack backend services for auth, downloads, analytics, and status monitoring

---

## Architecture

### Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Astro | 5.x |
| **UI Library** | React | 19.2 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 3.x |
| **Components** | shadcn/ui | Latest |
| **Icons** | Lucide React | 0.487 |
| **Build Tool** | Vite | 6.x |
| **i18n** | i18next | 24.x |
| **Backend** | Cloudflare Workers | - |
| **Database** | Cloudflare KV | - |
| **Storage** | Cloudflare R2 | - |

### Design Constraints

The Code Editor Land website adheres to strict design principles:

```css
--border-width: 3px;         /* All UI elements */
--border-radius: 0;          /* No radius except badges/avatars */
--contrast: white on black   /* High contrast mode */
```

Enforced globally in [`Source/Stylesheet/Base.css`](Source/Stylesheet/Base.css:1)

---

## Project Structure

```
WebSite/
├── Source/                          # Main source code (Astro)
│   ├── Components/
│   │   ├── Dynamic/                # Dynamic content-driven components
│   │   │   ├── types.tsx          # Central TypeScript schemas
│   │   │   ├── DynamicButton.tsx
│   │   │   ├── DynamicCard.tsx
│   │   │   ├── DynamicHeroSection.tsx
│   │   │   ├── DynamicFeatures.tsx
│   │   │   ├── DynamicPricing.tsx
│   │   │   ├── DynamicTestimonials.tsx
│   │   │   ├── DynamicBadge.tsx
│   │   │   ├── DynamicInput.tsx
│   │   │   ├── DynamicLabel.tsx
│   │   │   ├── DynamicCheckbox.tsx
│   │   │   ├── DynamicTable.tsx
│   │   │   ├── DynamicPlatformGrid.tsx
│   │   │   ├── DynamicSystemRequirements.tsx
│   │   │   ├── DynamicVerificationInfo.tsx
│   │   │   ├── DynamicPreviousReleases.tsx
│   │   │   ├── DynamicSignIn.tsx
│   │   │   ├── DynamicSignUp.tsx
│   │   │   ├── DynamicForgotPassword.tsx
│   │   │   ├── DynamicResetPassword.tsx
│   │   │   ├── DynamicEmailVerification.tsx
│   │   │   └── DynamicMetaTags.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── Marketing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── Download/
│   │   │   ├── DownloadCard.tsx
│   │   │   └── PlatformGrid.tsx
│   │   ├── Auth/
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   └── EmailVerification.tsx
│   │   ├── ui/                     # shadcn/ui components (do not modify)
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (46 total)
│   │   ├── Social/
│   │   │   └── MetaTags.tsx
│   │   └── index.ts
│   ├── Lib/
│   │   ├── I18n/
│   │   │   ├── index.ts           # i18n initialization
│   │   │   ├── Client.ts
│   │   │   ├── Server.ts
│   │   │   ├── types.ts
│   │   │   └── Locales/
│   │   │       ├── En/
│   │   │       │   ├── Common.json
│   │   │       │   ├── Home.json
│   │   │       │   ├── Download.json
│   │   │       │   ├── Account.json
│   │   │       │   ├── Header.json
│   │   │       │   ├── Footer.json
│   │   │       │   ├── Meta.json
│   │   │       │   └── Verify.json
│   │   │       └── [locale]/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── downloads.ts
│   │   │   ├── status.ts
│   │   │   ├── analytics.ts
│   │   │   └── index.ts
│   │   ├── UseTranslation.ts
│   │   └── types.ts
│   ├── pages/
│   │   ├── index.astro           # Homepage (/)
│   │   ├── downloads.astro       # Downloads page (/downloads)
│   │   ├── verify.astro          # Email verification (/verify)
│   │   ├── 404.astro             # 404 page
│   │   └── account/
│   │       ├── signin.astro
│   │       ├── signup.astro
│   │       ├── forgot-password.astro
│   │       └── reset-password.astro
│   ├── Stylesheet/
│   │   └── Base.css              # Global design tokens
│   ├── Function/
│   │   ├── TailWind/Color.ts
│   │   └── Scroll/Layout.astro
│   └── env.d.ts
├── plans/                         # Design specifications & content plans
│   ├── Data/
│   │   ├── TranslationKeys.json  # Master translation key definitions
│   │   └── DesignTokens.md
│   └── Pages/
│       ├── HomePage.md
│       ├── DownloadsPage.md
│       └── AccountPage.md
├── Documentation/                 # External module documentation
├── Asset/                         # Static assets
├── .github/                       # GitHub workflows & templates
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── astro.config.mjs
├── tailwind.config.mjs
└── README.md                      # This file
```

---

## Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 9.x (recommended) or npm/yarn
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/CodeEditorLand/WebSite.git
cd WebSite

# Install dependencies
pnpm install

# Copy environment variables (if needed)
cp .env.example .env
```

### Development Server

```bash
# Start dev server with HMR
pnpm dev

# Or using npm
npm run dev

# Access at http://localhost:4321
```

### Build for Production

```bash
# Create production build
pnpm build

# Output directory: Target/
```

### Preview Production Build

```bash
# Serve built site locally
pnpm preview

# Or directly serve Target/ directory
npx serve Target
```

---

## Cloudflare Workers Integration

WebSite integrates with a suite of Cloudflare Workers to provide full-stack functionality:

| Worker | Port | Purpose |
|--------|------|---------|
| Auth Worker | 8787 | User authentication, registration, OAuth, session management |
| Download Worker | 8788 | Binary distribution, version management, file serving |
| Analytics Worker | 8789 | Event tracking, page views, statistics |
| Status Worker | 8790 | System status monitoring, GitHub integration |

### Setup

1. **Start the Workers** (in `Workers/` directory):

```bash
cd Workers
pnpm dev
```

2. **Configure environment variables** in `WebSite/.env`:

```env
PUBLIC_AUTH_WORKER_URL=http://localhost:8787
PUBLIC_DOWNLOAD_WORKER_URL=http://localhost:8788
PUBLIC_ANALYTICS_WORKER_URL=http://localhost:8789
PUBLIC_STATUS_WORKER_URL=http://localhost:8790
PUBLIC_FRONTEND_URL=http://localhost:4321
```

3. **Access the integrated website** at `http://localhost:4321`

### Features

- **Authentication**: Full sign-up, sign-in, password reset, email verification, and OAuth (GitHub, Google, GitLab)
- **Downloads**: Dynamic binary listing, version history, SHA-256 verification, PGP signatures, and download tracking
- **Analytics**: Automatic page view tracking, custom event support via `useAnalytics()` hook
- **Session Management**: Persistent sessions with automatic token refresh

### API Documentation

See [API_CONTRACT.md](../API_CONTRACT.md) for comprehensive API reference, endpoint specifications, request/response examples, and error handling.

---

## Dynamic Component System

### Core Concept

Components accept **content schemas** (TypeScript interfaces) instead of hardcoded props. This enables:

- **Content decoupling** - Change content without touching component code
- **Type safety** - Full TypeScript IntelliSense for content structures
- **i18n ready** - Content can be loaded from translation files
- **Reusability** - Same component, multiple content variations

### Example Usage

```tsx
import { DynamicButton } from "./Components/Dynamic/DynamicButton";
import type { ButtonContent } from "./Components/Dynamic/types";

const buttonContent: ButtonContent = {
  text: "Get Started",
  variant: "default",
  size: "lg",
  fullWidth: true,
  icon: "ArrowRight",
  onClick: () => console.log("Clicked!")
};

// Render
<DynamicButton content={buttonContent} />
```

### Available Dynamic Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `DynamicButton` | Action button | `text`, `variant`, `size`, `icon` |
| `DynamicBadge` | Status indicators | `text`, `variant`, `showDot` |
| `DynamicCard` | Content container | `sections` (header/body/footer) |
| `DynamicInput` | Form input | `label`, `placeholder`, `type`, `error` |
| `DynamicLabel` | Form label | `text`, `htmlFor`, `required` |
| `DynamicCheckbox` | Checkbox input | `label`, `description`, `checked` |
| `DynamicTable` | Data table | `columns`, `data`, `striped` |
| `DynamicHeroSection` | Landing hero | `title`, `cta`, `floatingCards` |
| `DynamicFeatures` | Feature grid | `items[]` with icon/title/description |
| `DynamicPricing` | Pricing tiers | `plans[]` with price/features |
| `DynamicTestimonials` | Testimonials carousel | `testimonials[]` |
| `DynamicPlatformGrid` | Download cards | `platforms[]` with metadata |
| `DynamicSystemRequirements` | System specs | `requirements` (min/recommended) |
| `DynamicVerificationInfo` | Binary verification | `sha256`, `pgpSignature` |
| `DynamicPreviousReleases` | Version history table | `releases[]` with assets |
| `DynamicSignIn` | Sign-in form | `emailField`, `passwordField` |
| `DynamicSignUp` | Sign-up form | `emailField`, `passwordField`, `termsCheckbox` |
| `DynamicForgotPassword` | Password reset request | `emailField` |
| `DynamicResetPassword` | Set new password | `passwordField`, `confirmPasswordField` |
| `DynamicEmailVerification` | Verify email | `pending`, `success`, `error` states |
| `DynamicMetaTags` | SEO meta tags | `title`, `description`, `ogImage` |

---

## Internationalization (i18n)

### Setup

Website uses **i18next** with namespace-based translation files stored in:

```
Source/Lib/I18n/Locales/{locale}/{namespace}.json
```

### Current Translation Status

| Namespace | Status | Keys |
|-----------|--------|------|
| `common` | Complete | 38 |
| `home` | Complete | 167 |
| `download` | Complete | 65 |
| `account` | Complete | 185 |
| `header` | Complete | 12 |
| `footer` | Complete | 50 |
| `meta` | Complete | 24 |
| `verify` | Complete | 46 |

**Total:** 587 translation keys across 8 namespaces (English complete)

### Adding New Translations

1. **Define keys** in `plans/Data/TranslationKeys.json`
2. **Add content** to `Source/Lib/I18n/Locales/En/{namespace}.json`
3. **Use in components**:

```tsx
import { useTranslation } from "@/Lib/UseTranslation";

function MyComponent() {
  const { t } = useTranslation("home");
  return <h1>{t("hero.title")}</h1>;
}
```

---

## Design System

### Global Constraints

All components must adhere to these design tokens defined in [`Source/Stylesheet/Base.css`](Source/Stylesheet/Base.css):

```css
:root {
  --border-width: 3px;           /* All borders */
  --border-radius: 0;            /* No rounded corners */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

/* Global enforcement */
* {
  border-radius: var(--border-radius) !important;
}

.border {
  border-width: var(--border-width);
}
```

### Component Library

We use **shadcn/ui** primitives located in [`Source/Components/ui/`](Source/Components/ui/). These are **NOT** to be modified directly. Instead:

- **DO** wrap them in dynamic components
- **DO** apply design-token classes
- **DON'T** change base component props/styles

### Responsive Breakpoints

| Alias | Tailwind | Usage |
|-------|----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large screens |

---

## Routing Structure

| Route | Astro File | Purpose |
|-------|------------|---------|
| `/` | `pages/index.astro` | Homepage with hero, features, pricing |
| `/downloads` | `pages/downloads.astro` | Downloads page with platform cards, requirements, verification |
| `/account/signin` | `pages/account/signin.astro` | User authentication |
| `/account/signup` | `pages/account/signup.astro` | New user registration |
| `/account/forgot-password` | `pages/account/forgot-password.astro` | Request password reset |
| `/account/reset-password` | `pages/account/reset-password.astro` | Set new password (with token) |
| `/verify` | `pages/verify.astro` | Email verification status |
| `/404` | `pages/404.astro` | Not found page |

### Dynamic Account Routes

Account pages use the [`<AccountPage>`](Source/Components/Dynamic/AccountPage.tsx) wrapper component that renders the appropriate form based on the `route` prop.

---

## Content Management

### Static Content

Content is embedded directly in page files (`*.astro`) as JavaScript/TypeScript objects:

```astro
---
// pages/index.astro
import { HomePage } from "../Components/Dynamic/HomePage";
import { useTranslation } from "../Lib/UseTranslation";

const { t } = useTranslation("home");

const pageContent = {
  hero: {
    title: t("hero.title"),
    subtitle: t("hero.subtitle"),
    // ...
  },
  features: {
    items: [
      {
        icon: "Zap",
        title: t("features.item.designTokens.title"),
        // ...
      },
      // ...
    ]
  },
  // ...
---

<HomePage content={pageContent} />
```

### Dynamic Content (Future)

Planned API endpoints for content management:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `GET /api/content/home` | GET | Fetch homepage content |
| `GET /api/content/download` | GET | Fetch download page |
| `POST /api/auth/signin` | POST | User authentication |
| `POST /api/auth/signup` | POST | User registration |
| `POST /api/auth/forgot-password` | POST | Request password reset |
| `POST /api/auth/reset-password` | POST | Reset with token |
| `GET /api/verify-email` | GET | Verify email address |
| `GET /api/download/:platform` | GET | Binary download (with headers) |

---

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro settings, integrations, output format |
| `tsconfig.json` | TypeScript strict mode, paths |
| `tailwind.config.mjs` | Tailwind setup, content paths, custom theme |
| `pnpm-workspace.yaml` | Monorepo workspace configuration |
| `package.json` | Dependencies and scripts |
| `.env.example` | Environment variable template |

---

## Scripts Reference

```json
{
  "scripts": {
    "dev": "astro dev --port 4321",           // Dev server
    "build": "astro build",                   // Production build
    "preview": "astro preview",              // Preview build
    "generate": "astro build --generate",    // Static generation
    "lint": "eslint . --ext .ts,.tsx,.astro",// Lint code
    "format": "prettier --write .",          // Format code
    "typecheck": "tsc --noEmit",             // Type check only
    "clean": "rm -rf Target node_modules/.cache"
  }
}
```

---

## Testing

### TypeScript Validation

```bash
pnpm typecheck
```

Current status: **Warnings only** - Build succeeds despite strict mode warnings.

### Linting

```bash
pnpm lint
```

### Visual Regression

Planned: Playwright visual tests in `tests/` directory.

---

## Deployment

### Recommended Hosts

- **Vercel** - Zero-config Astro deployment
- **Netlify** - Static site support
- **Cloudflare Pages** - Edge-optimized
- **GitHub Pages** - Free static hosting

### Build Output

```
Target/
├── index.html
├── downloads.html
├── account/
│   ├── signin.html
│   ├── signup.html
│   ├── forgot-password.html
│   └── reset-password.html
├── verify.html
├── 404.html
├── sitemap-index.xml
├── assets/
│   ├── images/
│   ├── css/
│   ├── js/
│   └── svg/
└── robots.txt
```

### Environment Variables

Required for production:

```env
PUBLIC_SITE_URL=https://Editor.Land
PUBLIC_APP_NAME=Land
```

Optional:

```env
# API endpoints (if implementing backend)
PUBLIC_API_URL=https://api.Editor.Land
PUBLIC_VERIFY_URL=https://verify.Editor.Land
```

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development workflow, coding standards, and pull request process.

Key guidelines:

- **TypeScript strict mode** - No `any`, explicit return types
- **PascalCase** - Files, components, interfaces
- **kebab-case** - URLs, CSS classes
- **Prettier** - Auto-format on commit
- **ESLint** - Follow rules in configuration files

### Component Development

1. Define interface in `types.tsx`
2. Implement component in appropriate category with `content` prop
3. Add translations to all locale files
4. Update component documentation
5. Test with real content in a page

### Pull Request Process

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open PR with description and screenshots

---

## Troubleshooting

### TypeScript Strict Mode Warnings

The project uses `strict: true` and `exactOptionalPropertyTypes: true`, which produces warnings for:

- Unused imports/variables
- Optional callback types requiring explicit `undefined`
- Index signature access patterns

These warnings do NOT block builds. Critical type errors would fail compilation.

### Workers Connection Issues

If frontend cannot connect to Workers:

1. Verify Workers are running: `cd Workers && pnpm dev`
2. Check `WebSite/.env` has correct URLs (matching Worker ports)
3. Ensure `FRONTEND_URL` is set in Worker environment
4. Check CORS configuration - Workers automatically add CORS headers based on `FRONTEND_URL`

### Build Failures

```bash
# Clean and rebuild all
cd WebSite
rm -rf .astro node_modules
pnpm install
pnpm prepublishOnly
```

Check for missing dependencies or TypeScript errors.

### Component Styling Issues

All UI components must enforce design system constraints:

- **Borders:** Use `border-[3px]` or `border border-border` - never plain `border`
- **Radius:** Use `!rounded-none` - badges are exception with `rounded-full`
- **Colors:** Use theme colors (`bg-primary`, `text-foreground`, `border-border`) for dark/light mode support

---

## Documentation

### Project Documentation

- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Complete component reference with props, i18n, status
- [API_CONTRACT.md](./API_CONTRACT.md) - Workers API specification
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development workflow and guidelines

### External Modules

Detailed documentation for third-party modules is available in [`Documentation/Module/`](Documentation/Module/):

- [radix-ui-themes](Documentation/Module/radix-ui-themes/) - Theming system

### Design Plans

High-level design and implementation plans:

- [`plans/SUMMARY.md`](plans/SUMMARY.md) - Feature overview
- [`plans/IMPLEMENTATION_TASKS.md`](plans/IMPLEMENTATION_TASKS.md) - Task breakdown
- [`plans/HANDOFF_TO_AGENT.md`](plans/HANDOFF_TO_AGENT.md) - Agent implementation guide
- [`plans/Data/TranslationKeys.json`](plans/Data/TranslationKeys.json) - Translation schema

---

## License

This project is licensed under the MIT License - see [LICENSE](../LICENSE) for details.

---

## Support

- **Documentation:** https://docs.Editor.Land
- **Issues:** https://github.com/CodeEditorLand/WebSite/issues
- **Discord:** [Land Community](https://discord.gg/land)
- **Email:** support@Editor.Land

---

**Built by the Code Editor Land team**
