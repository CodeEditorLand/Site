/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// PUBLIC_* vars - exposed to the browser via import.meta.env
// Server-only vars (AUTH0_*, SITE_ENVIRONMENT, etc.) - available via
// import.meta.env on the server only, never included in client bundles.
interface ImportMetaEnv {
	readonly PUBLIC_AUTH_WORKER_URL: string;

	readonly PUBLIC_DOWNLOAD_WORKER_URL: string;

	readonly PUBLIC_ANALYTICS_WORKER_URL: string;

	readonly PUBLIC_STATUS_WORKER_URL: string;

	readonly PUBLIC_FRONTEND_URL: string;

	readonly PUBLIC_ANALYTICS_KEY?: string;

	// Server-only - Auth0 SPA (no client secret)
	readonly AUTH0_DOMAIN?: string;

	readonly AUTH0_CLIENT_ID?: string;

	readonly AUTH0_ORGANIZATION?: string;

	readonly AUTH0_CONNECTION?: string;

	readonly OKTA_DOMAIN?: string;

	readonly SITE_ENVIRONMENT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Server-only vars - read via process.env in Astro frontmatter / config files.
// Never exposed to the browser. Auth0 SPA type uses PKCE - no client secret.
declare namespace NodeJS {
	interface ProcessEnv {
		// Auth0 SPA application (Single Page Application type - no client secret)
		AUTH0_DOMAIN?: string;

		AUTH0_CLIENT_ID?: string;

		// Enterprise SSO (optional)
		AUTH0_ORGANIZATION?: string;

		AUTH0_CONNECTION?: string;

		OKTA_DOMAIN?: string;

		// Build / deploy
		SITE_ENVIRONMENT?: string;
	}
}
