# Contributing Guidelines

## Code of Conduct

We are committed to creating a welcoming and inclusive environment for all
contributors. Please read and abide by our Code of Conduct below. By
participating in this community, you agree to uphold these standards.

### Our Pledge

We pledge to make participation in our community a harassment-free experience
for everyone, regardless of age, body size, visible or invisible disability,
ethnicity, sex characteristics, gender identity and expression, level of
experience, education, socio-economic status, nationality, personal appearance,
race, caste, color, religion, or sexual identity and orientation.

### Our Standards

We strive to create a positive environment. Examples of behavior that
contributes to this include:

- Demonstrating empathy and kindness
- Being respectful of differing opinions and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility for mistakes and learning from them
- Focusing on the best interests of the community

Unacceptable behavior includes harassment, derogatory comments, personal
attacks, publishing private information without permission, and other
unprofessional conduct.

### Enforcement

Instances of abusive or unacceptable behavior may be reported to
Community@editor.land. All complaints will be reviewed and investigated fairly.
Community leaders will enforce these standards and may take corrective action,
including warning, temporary banning, or permanent banning from the community.

The full Code of Conduct is adapted from the
[Contributor Covenant](https://www.contributor-covenant.org/).

---

## How to Contribute

We welcome contributions from the community. See our
development workflow, coding standards, and pull request process.

### Getting Started

#### Prerequisites

- **Node.js 24+** - Download from [nodejs.org](https://nodejs.org/)
- **pnpm 9+** (recommended) or npm/yarn
- **Git** for version control
- **Wrangler CLI** (for Workers development): `npm install -g wrangler`

#### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/CodeEditorLand.git
    cd CodeEditorLand
    ```
3. Add the upstream remote:
    ```bash
    git remote add upstream https://github.com/CodeEditorLand/CodeEditorLand.git
    ```

#### Install Dependencies

```bash
# Install frontend dependencies
cd WebSite
pnpm install

# Install backend dependencies
cd ../Workers
pnpm install
cd ..
```

### Development Workflow

#### Frontend (WebSite)

```bash
cd WebSite

# Start development server with HMR
pnpm dev
# Access at http://localhost:4321

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build for production
pnpm prepublishOnly
# Output in Target/ directory

# Preview production build
pnpm preview
```

#### Backend (Workers)

```bash
cd Workers

# Start all workers in development mode
pnpm dev
# Auth: http://localhost:8787
# Download: http://localhost:8788
# Status: http://localhost:8789
# Analytics: http://localhost:8790

# Build all workers
pnpm build

# Type check all workers
pnpm typecheck

# Deploy all workers to production
pnpm deploy
```

#### Environment Configuration

Copy the example and fill in your Auth0 credentials:

```bash
cp WebSite/.env.example WebSite/.env
```

**WebSite/.env** - minimum required for local dev:

```env
PUBLIC_AUTH_WORKER_URL=http://localhost:8787
PUBLIC_DOWNLOAD_WORKER_URL=http://localhost:8788
PUBLIC_ANALYTICS_WORKER_URL=http://localhost:8789
PUBLIC_STATUS_WORKER_URL=http://localhost:8790
PUBLIC_FRONTEND_URL=http://localhost:4321

# Auth0 - create a Single Page Application at manage.auth0.com
# No client secret needed: SPA type uses PKCE (secret-free by design)
AUTH0_DOMAIN=<your-tenant>.eu.auth0.com
AUTH0_CLIENT_ID=<your-client-id>
```

In your Auth0 application settings, add these for local development:

| Field                 | Value                                 |
| --------------------- | ------------------------------------- |
| Allowed Callback URLs | `http://localhost:4321/OAuth/Success` |
| Allowed Logout URLs   | `http://localhost:4321`               |
| Allowed Web Origins   | `http://localhost:4321`               |

See `.env.example` for the full reference including enterprise SSO and
production Cloudflare Pages setup.

**Workers/.env** (for local development with wrangler):

```env
# Auth Worker
JWT_SECRET=your-secret-key-change-this
SMTP_HOST=localhost
SMTP_PORT=1025
OAUTH_GITHUB_CLIENT_ID=your-github-client-id
OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret
# ... other OAuth and SMTP settings
```

For development, you can use [MailHog](https://github.com/mailhog/MailHog) to
catch outgoing emails without actually sending them.

### Code Style

We enforce consistent code style across the project:

- **TypeScript Strict Mode:** All code uses `strict: true` and
  `exactOptionalPropertyTypes: true`
- **PascalCase:** Files, components, interfaces, classes, type definitions
- **camelCase:** Variables, functions, methods, properties
- **kebab-case:** URLs, CSS classes, file names for assets
- **UPPER_SNAKE_CASE:** Constants, environment variables, configuration keys
- **Imports:** Grouped by external (Node, third-party) then internal,
  alphabetized within groups
- **Formatting:** Use Prettier with default configuration (auto-format on
  commit)

#### TypeScript Rules

- No use of `any` type without explicit justification
- All function parameters and return types must be typed
- All React component props must have proper interface definitions
- Use `unknown` instead of `any` for values of unknown type
- Prefer `type` for union types, `interface` for object shapes
- All async functions must have proper error handling with try/catch

#### Component Standards

All UI components must:

- Use shadcn/ui primitives as base (do not modify directly)
- Enforce design system constraints: `border-[3px]`, `!rounded-none`
- Support dark/light mode through CSS variables
- Be accessible: proper ARIA labels, keyboard navigation, color contrast
- Include proper TypeScript interfaces for props
- Use `className` prop for style extension (passed to root element)
- Avoid inline styles, use Tailwind utility classes

### Project Structure

```
CodeEditorLand/
├── WebSite/                    # Astro + React frontend
│   ├── Source/
│   │   ├── Components/
│   │   │   ├── ui/            # shadcn base components (do not modify)
│   │   │   ├── Dynamic/       # Dynamic schema-driven components
│   │   │   ├── Layout/        # Header, Footer
│   │   │   ├── Marketing/     # Hero, Features, Pricing, Testimonials
│   │   │   ├── Auth/          # Authentication pages
│   │   │   ├── Download/      # Download-related components
│   │   │   ├── Utility/       # Helper components
│   │   │   ├── Social/        # Meta tags, sharing
│   │   │   └── index.ts       # Main exports
│   │   ├── Lib/
│   │   │   ├── I18n/          # Internationalization
│   │   │   │   ├── Locales/{locale}/  # Translation JSON files
│   │   │   │   ├── Client.ts  # Client-side i18n setup
│   │   │   │   ├── Server.ts  # Server-side i18n setup
│   │   │   │   └── types.ts   # i18n type definitions
│   │   │   ├── api/           # API client wrappers (auth.ts, downloads.ts, etc.)
│   │   │   └── UseTranslation.ts  # i18n hook
│   │   ├── pages/             # Astro page routes
│   │   └── Stylesheet/
│   │       └── Base.css       # Global CSS and design tokens
│   ├── package.json
│   ├── astro.config.mjs
│   ├── tailwind.config.mjs
│   └── tsconfig.json
├── Workers/                    # Cloudflare Workers backend
│   ├── shared/
│   │   └── src/
│   │       └── types.ts       # Shared TypeScript types
│   ├── workers/
│   │   ├── auth/              # Authentication Worker
│   │   ├── download/          # Download Worker
│   │   ├── status/            # Status Worker
│   │   └── analytics/         # Analytics Worker
│   ├── package.json
│   ├── turbo.json
│   └── tsconfig.json
├── Documentation/              # External module documentation
├── Land/                      # Editor core (separate project)
├── plans/                     # Design specifications and content plans
│   ├── Data/
│   │   ├── TranslationKeys.json  # Master translation key definitions
│   │   └── DesignTokens.md
│   └── Pages/
│       ├── HomePage.md
│       ├── DownloadsPage.md
│       └── AccountPage.md
├── pnpm-workspace.yaml
├── ARCHITECTURE.md            # System architecture overview
├── DEPLOYMENT.md              # Deployment guide
├── API_CONTRACT.md            # API specification (this document)
└── README.md                  # Project README
```

### Adding New Components

When creating new components:

1. **Determine category:**
    - `ui/` - Base primitives extending shadcn (rare)
    - `Dynamic/` - Content-driven components with schemas
    - `Layout/` - Page layout components (Header, Footer)
    - `Marketing/` - Landing page sections
    - `Auth/` - Authentication flows
    - `Download/` - Download-related components
    - `Utility/` - Helper utilities
    - `Social/` - Social sharing, meta tags

2. **Use PascalCase** for filename: `MyComponent.tsx`

3. **Define TypeScript interface** for props/content:

    ```typescript
    interface MyComponentProps {
    	title: string;
    	items?: string[];
    }

    export function MyComponent({ title, items = [] }: MyComponentProps) {
    	// Component implementation
    }
    ```

4. **Implement with shadcn primitives** (if UI component):

    ```typescript
    import { Button } from "../ui/button";
    import { Card } from "../ui/card";
    ```

5. **Add translations** to appropriate namespace JSON files:

    ```json
    // Source/Lib/I18n/Locales/En/mycomponent.json
    {
    	"title": "My Title",
    	"description": "My description"
    }
    ```

6. **Export from index.ts** in component category:

    ```typescript
    // Components/MyCategory/index.ts
    export { MyComponent } from "./MyComponent";
    ```

7. **Update COMPONENT_CATALOG.md** with component details (this file)

### Adding New Translations

Translation keys are namespace-based:

1. **Define keys** in `plans/Data/TranslationKeys.json` (for planning) and add
   to actual JSON files
2. **Add translations** to each locale file:
    ```json
    // Source/Lib/I18n/Locales/En/home.json
    {
    	"myComponent": {
    		"title": "English Title",
    		"description": "English description"
    	}
    }
    ```
3. **Create corresponding file** for other locales (e.g., `Es/`, `Fr/`, etc.)
4. **Use in component:**
    ```typescript
    const { t } = useTranslation('home');
    return <h1>{t('myComponent.title')}</h1>;
    ```

### Translation Namespaces

| Namespace  | Purpose                                                  | Location        |
| ---------- | -------------------------------------------------------- | --------------- |
| `common`   | Shared button/label/error texts                          | `common.json`   |
| `home`     | Homepage content (hero, features, pricing, testimonials) | `home.json`     |
| `download` | Download page content                                    | `download.json` |
| `account`  | Authentication forms                                     | `account.json`  |
| `header`   | Navigation labels                                        | `header.json`   |
| `footer`   | Footer text and links                                    | `footer.json`   |
| `meta`     | Page meta titles/descriptions                            | `meta.json`     |
| `verify`   | Email verification states                                | `verify.json`   |

### Design System Compliance

All UI components must adhere to the Code Editor Land design tokens:

```css
/* Source/Stylesheet/Base.css */
:root {
	--border-width: 3px; /* All borders exactly 3px */
	--border-radius: 0; /* No border-radius (except badges) */
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

**Border enforcement:** All components using borders must include `border-[3px]`
(or `border border-border`) class. Do not use plain `border` without width.

**Radius enforcement:** All components must use `!rounded-none` to enforce zero
radius. The only exception is badges which may use `rounded-full`.

**Colors:** Use theme colors from Tailwind config (`bg-primary`,
`text-foreground`, `border-border`, etc.) to support light/dark modes.

### Working with Workers

The backend consists of 4 specialized Cloudflare Workers:

- **Auth** - Authentication, registration, OAuth, session management
- **Download** - Binary distribution, version management, file serving
- **Status** - System status monitoring, GitHub integration
- **Analytics** - Event tracking, page views, statistics

All Workers share a common type definitions from `Workers/shared/src/types.ts`.

#### Worker Architecture

Each Worker uses:

- **itty-router** for routing
- **Cloudflare KV** for key-value storage
- **Cloudflare R2** for object storage (binaries)
- Middleware for CORS, auth, validation

#### Calling Worker APIs from Frontend

Use the API client wrappers in `WebSite/Source/Lib/api/`:

```typescript
import { authAPI } from "@/Lib/api/auth";

// Example: login
const { data, error } = await authAPI.login(email, password);
if (data) {
	console.log("Logged in as", data.user.username);
}
```

Available API modules:

- `auth.ts` - Authentication endpoints
- `downloads.ts` - Download and binary endpoints
- `status.ts` - Status monitoring endpoints
- `analytics.ts` - Analytics tracking endpoints

#### Adding New API Endpoints

1. **Define types** in `Workers/shared/src/types.ts` (if new data structures)
2. **Implement endpoint** in appropriate Worker (`workers/auth/src/index.ts`
   etc.)
3. **Add handler** using router:
    ```typescript
    router.post("/my-endpoint", async (req) => {
    	const data = await req.json();
    	// Validation
    	// Business logic
    	return json({ success: true, data: result });
    });
    ```
4. **Add CORS headers** automatically handled by middleware
5. **Update API_CONTRACT.md** with endpoint documentation
6. **Create frontend client** in `WebSite/Source/Lib/api/` if needed
7. **Add tests** (Vitest) for the endpoint

### Testing

#### Frontend Testing

```bash
cd WebSite

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build verification
pnpm prepublishOnly
```

#### Backend Testing

```bash
cd Workers

# Type check all workers
pnpm typecheck

# Build all workers
pnpm build

# Run dev servers (manual testing)
pnpm dev
```

#### Integration Testing

1. Start all Workers: `cd Workers && pnpm dev`
2. Start frontend: `cd WebSite && pnpm dev`
3. Test full user flows:
    - Registration → email verification → login → logout
    - Download flow (after uploading binaries to R2)
    - Pageview tracking → analytics queries
    - OAuth (with valid OAuth app credentials)

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Formatting, missing semicolons, etc. (no code change)
- `refactor` - Code restructuring (no functional change)
- `perf` - Performance improvement
- `test` - Adding or fixing tests
- `build` - Build system, dependencies, CI changes
- `ci` - CI/CD changes
- `chore` - Other changes (no production code impact)
- `revert` - Revert a previous commit

**Examples:**

```
feat(auth): add OAuth support for Google and GitLab

fix(button): add missing border-[3px] class to Button component

docs(catalog): update COMPONENT_CATALOG.md with all 48 UI components

chore(deps): update TypeScript to 5.9.3
```

### Pull Request Process

1. **Create a feature branch** from `main`:

    ```bash
    git checkout -b feat/my-feature
    ```

2. **Make your changes** following code style guidelines.

3. **Test your changes** locally:
    - Frontend builds without errors
    - Workers type-check and build
    - All linting passes
    - Manual testing of affected features

4. **Commit your changes** with conventional commit message:

    ```bash
    git add .
    git commit -m "feat(component): add new DynamicCard with schema validation"
    ```

5. **Push to your fork**:

    ```bash
    git push origin feat/my-feature
    ```

6. **Open a Pull Request** against the `main` branch of the upstream repository.

7. **PR Description:**
    - Explain what the change does and why
    - Reference related issues (e.g., "Closes #123")
    - Include screenshots for UI changes
    - Note any breaking changes

8. **Code Review:**
    - Maintainers will review your code
    - Address review comments (request changes if needed)
    - Squash commits before merging (maintain clean history)

9. **Merge:**
    - After approval, maintainers will merge your PR
    - We use "Squash and merge" to keep history clean

### Issue Reporting

Found a bug or have a feature request?

1. **Search existing issues** to avoid duplicates
2. **Open a new issue** using the appropriate template
3. **Provide detailed information:**
    - Steps to reproduce (for bugs)
    - Expected vs actual behavior
    - Screenshots if applicable
    - Environment details (OS, browser, Node version)
    - Logs or error messages

Issue templates are available for:

- Bug report
- Feature request
- Documentation improvement

### Community

- **GitHub Discussions:** For questions, ideas, and general discussion
- **Discord:** [Land Community](https://discord.gg/land) for real-time chat
- **Email:** support@editor.land for sensitive matters

---

## Additional Resources

- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Complete component reference
- [API_CONTRACT.md](./API_CONTRACT.md) - Workers API specification
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide
- [Workers/README.md](./Workers/README.md) - Workers-specific documentation
- [WebSite/README.md](./WebSite/README.md) - Frontend-specific documentation

---

## Thank You

Your contributions make Code Editor Land possible. We appreciate your time and
effort in improving this project for everyone.

**Built with gratitude by the Code Editor Land team**
