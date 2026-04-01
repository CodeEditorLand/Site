/**
 * Custom service worker with route-redirect interception + Workbox precaching.
 *
 * At build time, the Astro integration replaces the placeholder markers:
 *   __ROUTE_MAP_CANONICAL__ → JSON array of canonical paths
 *   __ROUTE_MAP_VARIANT__   → JSON object of variant → canonical mappings
 *   __PRECACHE_MANIFEST__   → Workbox precache manifest entries
 *
 * This file is NOT imported at runtime — it is read as a text template by
 * Integration.ts, transformed, and written to the build output.
 */

declare const self: ServiceWorkerGlobalScope;

// Injected at build time
const CanonicalSet: Set<string> = new Set(__ROUTE_MAP_CANONICAL__);
const VariantMap: Record<string, string> = __ROUTE_MAP_VARIANT__;

// ─── Path normalization (inlined from Normalize.ts for SW context) ───

const StripTrailingSlash = (Path: string): string =>
	Path === "/" ? "/" : Path.replace(/\/+$/, "");

const NormalizePath = (Path: string): string =>
	StripTrailingSlash(
		"/" +
			Path.replace(/^\/+/, "")
				.split("/")
				.map((Segment) => decodeURIComponent(Segment).toLowerCase())
				.join("/"),
	);

// ─── Route resolution ───

const ResolveRoute = (RequestPath: string): string | null => {
	const Cleaned = StripTrailingSlash(RequestPath);

	// Already canonical — no redirect needed
	if (CanonicalSet.has(Cleaned)) {
		return null;
	}

	// Normalize and check canonical set
	const Normalized = NormalizePath(Cleaned);

	if (CanonicalSet.has(Normalized)) {
		return Normalized;
	}

	// Check variant map (case-insensitive, plural/singular, aliases)
	if (VariantMap[Normalized]) {
		return VariantMap[Normalized];
	}

	// Strip hyphens/underscores and retry
	const Stripped =
		"/" +
		Normalized
			.replace(/^\/+/, "")
			.split("/")
			.map((Segment) => Segment.replace(/[-_]/g, ""))
			.join("/");

	if (VariantMap[Stripped]) {
		return VariantMap[Stripped];
	}

	return null;
};

// ─── Fetch event handler ───

self.addEventListener("fetch", (Event: FetchEvent) => {
	const Request = Event.request;

	// Only intercept navigation requests (page loads, not assets)
	if (Request.mode !== "navigate") {
		return;
	}

	const URL = new self.URL(Request.url);
	const ResolvedPath = ResolveRoute(URL.pathname);

	if (ResolvedPath !== null) {
		// Redirect to canonical path, preserving query string and hash
		const RedirectURL = new self.URL(ResolvedPath, URL.origin);

		RedirectURL.search = URL.search;

		Event.respondWith(Response.redirect(RedirectURL.href, 301));

		return;
	}

	// Fall through — let the browser handle the request normally
	// (Workbox precache will serve cached assets if available)
});

// ─── Service worker lifecycle ───

self.addEventListener("install", () => {
	// Activate immediately — don't wait for old SW to release clients
	self.skipWaiting();
});

self.addEventListener("activate", (Event: ExtendableEvent) => {
	// Claim all open tabs immediately so routing starts without refresh
	Event.waitUntil(self.clients.claim());
});

// ─── Workbox precache (injected at build time) ───
// The integration reads the existing astrojs-service-worker manifest
// and appends Workbox precaching calls here.
// __WORKBOX_PRECACHE_PLACEHOLDER__
