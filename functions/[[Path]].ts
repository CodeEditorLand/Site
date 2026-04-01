/**
 * Cloudflare Pages Function — PascalCase Route Redirect (Edge Layer)
 *
 * Catch-all function that intercepts requests before they hit static assets.
 * If the path matches a known variant (lowercase, hyphenated, plural, etc.),
 * responds with a 301 redirect to the PascalCase canonical URL.
 *
 * This is Layer 1 of the 3-layer routing system:
 *   1. CF Pages Function (this file) — edge, before static files
 *   2. Service Worker — browser, after first page load
 *   3. 404 Page Script — fallback when SW not installed
 */

// SYNC: These must match Source/Function/Route/Map.ts CanonicalPath + SemanticAlias.
// CF Workers cannot import from the build system, so duplication is required.
const CanonicalPath = new Set([
	"/Download",
	"/Doc",
	"/Blog",
	"/Portal",
	"/Dashboard",
	"/Contributing",
	"/License",
	"/Verify",
	"/Contact/Sale",
	"/Account/SignIn",
	"/Account/SignUp",
	"/Account/ForgotPassword",
	"/Account/ResetPassword",
	"/Legal/Term",
	"/Legal/Privacy",
	"/OAuth/Success",
]);

const SemanticAlias: Record<string, string> = {
	"/downloads": "/Download",
	"/down": "/Download",
	"/get": "/Download",
	"/fetch": "/Download",
	"/install": "/Download",
	"/setup": "/Download",
	"/documentation": "/Doc",
	"/reference": "/Doc",
	"/help": "/Doc",
	"/guide": "/Doc",
	"/manual": "/Doc",
	"/api": "/Doc",
	"/login": "/Account/SignIn",
	"/log-in": "/Account/SignIn",
	"/sign-in": "/Account/SignIn",
	"/authenticate": "/Account/SignIn",
	"/auth": "/Account/SignIn",
	"/register": "/Account/SignUp",
	"/sign-up": "/Account/SignUp",
	"/join": "/Account/SignUp",
	"/create-account": "/Account/SignUp",
	"/forgot-password": "/Account/ForgotPassword",
	"/forgot": "/Account/ForgotPassword",
	"/password-reset": "/Account/ForgotPassword",
	"/recover": "/Account/ForgotPassword",
	"/recover-password": "/Account/ForgotPassword",
	"/reset-password": "/Account/ResetPassword",
	"/reset": "/Account/ResetPassword",
	"/new-password": "/Account/ResetPassword",
	"/change-password": "/Account/ResetPassword",
	"/tos": "/Legal/Term",
	"/terms-of-service": "/Legal/Term",
	"/eula": "/Legal/Term",
	"/conditions": "/Legal/Term",
	"/privacy-policy": "/Legal/Privacy",
	"/gdpr": "/Legal/Privacy",
	"/data-policy": "/Legal/Privacy",
	"/sale": "/Contact/Sale",
	"/sales-contact": "/Contact/Sale",
	"/contact-sales": "/Contact/Sale",
	"/pricing": "/Contact/Sale",
	"/enterprise": "/Contact/Sale",
	"/buy": "/Contact/Sale",
	"/contribute": "/Contributing",
	"/contributors": "/Contributing",
	"/dev": "/Contributing",
	"/develop": "/Contributing",
	"/opensource": "/Contributing",
	"/open-source": "/Contributing",
	"/home": "/",
	"/main": "/",
	"/index": "/",
	"/start": "/",
	"/welcome": "/",
	"/verify-email": "/Verify",
	"/email-verification": "/Verify",
	"/confirm": "/Verify",
	"/confirm-email": "/Verify",
	"/activate": "/Verify",
	"/app": "/Portal",
	"/launch": "/Portal",
	"/open": "/Portal",
	"/panel": "/Dashboard",
	"/admin": "/Dashboard",
	"/overview": "/Dashboard",
	"/mit": "/License",
	"/licensing": "/License",
	"/news": "/Blog",
	"/articles": "/Blog",
	"/posts": "/Blog",
	"/updates": "/Blog",
	"/changelog": "/Blog",
	"/callback": "/OAuth/Success",
	"/oauth-callback": "/OAuth/Success",
	"/auth-callback": "/OAuth/Success",
};

const NormalizePath = (Path: string): string => {
	const Decoded = decodeURIComponent(Path).toLowerCase();
	const Stripped = Decoded === "/" ? "/" : Decoded.replace(/\/+$/, "");

	return Stripped.startsWith("/") ? Stripped : "/" + Stripped;
};

const ResolvePath = (RequestPath: string): string | null => {
	const Normalized = NormalizePath(RequestPath);

	if (CanonicalPath.has(RequestPath) || RequestPath === "/") {
		return null;
	}

	for (const Canonical of CanonicalPath) {
		if (Normalized === Canonical.toLowerCase()) {
			return Canonical;
		}
	}

	if (SemanticAlias[Normalized]) {
		return SemanticAlias[Normalized];
	}

	const Stripped = Normalized.replace(/[-_]/g, "");

	for (const Canonical of CanonicalPath) {
		if (Stripped === Canonical.toLowerCase().replace(/[-_]/g, "")) {
			return Canonical;
		}
	}

	return null;
};

export const onRequest: PagesFunction = async (Context) => {
	const URL = new globalThis.URL(Context.request.url);
	const Path = URL.pathname;

	if (
		Path.startsWith("/_astro/") ||
		Path.startsWith("/Asset/") ||
		Path.startsWith("/Favicon/") ||
		Path.startsWith("/Image/") ||
		Path.includes(".")
	) {
		return Context.next();
	}

	const Canonical = ResolvePath(Path);

	if (Canonical) {
		URL.pathname = Canonical;

		return new Response(null, {
			status: 301,
			headers: { Location: URL.toString() },
		});
	}

	return Context.next();
};
