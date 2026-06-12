import type { RouteMap } from "./Interface/RouteMap.js";

// Pre-import at module evaluation time (while Vite module runner is alive).
// GenerateRouteMap runs in astro:build:done AFTER Vite closes.
const { readdir: ReadDirectory } = await import("node:fs/promises");

const { join: Join, relative: Relative } = await import("node:path");

// ─── Canonical paths ───
// Authoritative set of PascalCase canonical URLs.
// Page files are named PascalCase, so Astro builds these paths directly.
// Everything else (variants, aliases, redirects) is derived from this set.

export const CanonicalPath: Set<string> = new Set([
	"/Download",

	"/Doc",

	"/Blog",

	"/Portal",

	"/Dashboard",

	"/Contributing",

	"/License",

	"/Verify",

	"/Contact/Sale",

	"/Account",

	"/Account/SignIn",

	"/Account/SignUp",

	"/Account/ForgotPassword",

	"/Account/ResetPassword",

	"/Legal/Term",

	"/Legal/Privacy",

	"/OAuth/Success",
]);

// ─── Built-path → PascalCase mapping ───
// Maps what Astro historically built (lowercase) to PascalCase canonical.
// Used by Integration.ts for dev redirects, sitemap rewriting, and directory copies.

export const PascalCaseCanonical: Record<string, string> = Object.fromEntries(
	[...CanonicalPath].map((PascalPath) => [
		PascalPath.toLowerCase(),

		PascalPath,
	]),
);

// ─── Semantic aliases (human-curated, cannot be auto-derived) ───
// These are alternate names, abbreviations, or synonyms that map to canonicals.

export const SemanticAlias: Record<string, string> = {
	// Download
	"/downloads": "/Download",

	"/down": "/Download",

	"/get": "/Download",

	"/fetch": "/Download",

	"/install": "/Download",

	"/setup": "/Download",

	// Doc aliases - alternate names for doc pages
	"/doc/webassembly": "/Doc/why-wasm",
	"/doc/why-webassembly": "/Doc/why-wasm",

	// Doc
	"/documentation": "/Doc",

	"/reference": "/Doc",

	"/help": "/Doc",

	"/guide": "/Doc",

	"/manual": "/Doc",

	"/api": "/Doc",

	// Auth - SignIn
	"/login": "/Account/SignIn",

	"/log-in": "/Account/SignIn",

	"/sign-in": "/Account/SignIn",

	"/authenticate": "/Account/SignIn",

	"/auth": "/Account/SignIn",

	// Auth - SignUp
	"/register": "/Account/SignUp",

	"/sign-up": "/Account/SignUp",

	"/join": "/Account/SignUp",

	"/create-account": "/Account/SignUp",

	// Auth - ForgotPassword
	"/forgot-password": "/Account/ForgotPassword",

	"/forgot": "/Account/ForgotPassword",

	"/password-reset": "/Account/ForgotPassword",

	"/recover": "/Account/ForgotPassword",

	"/recover-password": "/Account/ForgotPassword",

	// Auth - ResetPassword
	"/reset-password": "/Account/ResetPassword",

	"/reset": "/Account/ResetPassword",

	"/new-password": "/Account/ResetPassword",

	"/change-password": "/Account/ResetPassword",

	// Legal - Term
	"/tos": "/Legal/Term",

	"/terms-of-service": "/Legal/Term",

	"/eula": "/Legal/Term",

	"/conditions": "/Legal/Term",

	// Legal - Privacy
	"/privacy-policy": "/Legal/Privacy",

	"/gdpr": "/Legal/Privacy",

	"/data-policy": "/Legal/Privacy",

	// Contact
	"/sale": "/Contact/Sale",

	"/sales-contact": "/Contact/Sale",

	"/contact-sales": "/Contact/Sale",

	"/pricing": "/Contact/Sale",

	"/enterprise": "/Contact/Sale",

	"/buy": "/Contact/Sale",

	// Contributing
	"/contribute": "/Contributing",

	"/contributors": "/Contributing",

	"/dev": "/Contributing",

	"/develop": "/Contributing",

	"/opensource": "/Contributing",

	"/open-source": "/Contributing",

	// Home - also catches /Visit when SW is active (skips the dispatch page)
	"/home": "/",

	"/main": "/",

	"/index": "/",

	"/start": "/",

	"/welcome": "/",

	"/visit": "/",

	// Verify
	"/verify-email": "/Verify",

	"/email-verification": "/Verify",

	"/confirm": "/Verify",

	"/confirm-email": "/Verify",

	"/activate": "/Verify",

	// Portal
	"/app": "/Portal",

	"/launch": "/Portal",

	"/open": "/Portal",

	// Dashboard
	"/panel": "/Dashboard",

	"/admin": "/Dashboard",

	"/overview": "/Dashboard",

	// License
	"/mit": "/License",

	"/licensing": "/License",

	// Blog
	"/news": "/Blog",

	"/articles": "/Blog",

	"/posts": "/Blog",

	"/updates": "/Blog",

	"/changelog": "/Blog",

	// OAuth
	"/callback": "/OAuth/Success",

	"/oauth-callback": "/OAuth/Success",

	"/auth-callback": "/OAuth/Success",
};

// ─── Simplified variant generation ───
// Generates the practically useful URL variants:
//   - lowercase  (most common non-canonical form typed by users / crawlers)
//   - UPPERCASE  (protocol-level or legacy clients)
//   - PascalCase (the canonical form - excluded as "not a variant")
//   - TitleCase  (first-letter-upper, rest-lower - same as PascalCase for one-word segments)
//   - kebab-case, snake_case, concatenated  (for compound PascalCase segments like ForgotPassword)
//   - flat forms for multi-segment paths  (/accountsignin, /account-signin)
//
// Deliberately omitted (no real user ever types these):
//   - Progressive-case mixing  (ACcount, aCCOUNT, …)
//   - Abbreviation prefixes    (/ac, /acc, /acco → /Account)

// Case variants for one segment: lower, UPPER, PascalCase, TitleCase
const SegmentCases = (Segment: string): string[] => {
	const Lower = Segment.toLowerCase();

	const Upper = Segment.toUpperCase();

	const Title =
		Segment.charAt(0).toUpperCase() + Segment.slice(1).toLowerCase();

	return [...new Set([Lower, Upper, Segment, Title])];
};

// Singular ↔ plural for one lowercase segment
const SegmentNumber = (Lower: string): string[] => {
	const Result = new Set([Lower]);

	if (Lower.endsWith("ies") && Lower.length > 4)
		Result.add(Lower.slice(0, -3) + "y");
	else if (/(?:ses|xes|zes|ches|shes)$/.test(Lower))
		Result.add(Lower.slice(0, -2));
	else if (
		Lower.endsWith("s") &&
		!/(?:ss|us|is)$/.test(Lower) &&
		Lower.length > 2
	)
		Result.add(Lower.slice(0, -1));

	if (!Lower.endsWith("s")) Result.add(Lower + "s");

	return [...Result];
};

// Compound variants for a PascalCase segment: kebab, snake, concat, dot
// e.g. "ForgotPassword" → ["forgot-password", "forgot_password", "forgotpassword", "forgot.password"]
const SegmentCompound = (Segment: string): string[] => {
	const Words = Segment.match(/[A-Z][a-z]*/g);

	if (!Words || Words.length < 2) return [];

	const Lower = Words.map((W) => W.toLowerCase());

	return [Lower.join("-"), Lower.join("_"), Lower.join(""), Lower.join(".")];
};

// Generate all variants for a full canonical path (excluding the canonical itself).
export const GeneratePathVariant = (CanonicalPath: string): string[] => {
	if (CanonicalPath === "/") return [];

	const Segments = CanonicalPath.slice(1).split("/");

	const Result = new Set<string>();

	if (Segments.length === 1) {
		const Seg = Segments[0]!;

		const Lower = Seg.toLowerCase();

		// lowercase, UPPERCASE, TitleCase
		for (const C of SegmentCases(Seg)) Result.add("/" + C);

		// singular/plural of the lowercase form
		for (const N of SegmentNumber(Lower)) {
			Result.add("/" + N);

			Result.add("/" + N.toUpperCase());
		}

		// compound variants (only relevant for multi-word segments)
		for (const V of SegmentCompound(Seg)) Result.add("/" + V);
	} else {
		const LowerSegs = Segments.map((S) => S.toLowerCase());

		// Full lowercase - most important
		Result.add("/" + LowerSegs.join("/"));

		// Full UPPERCASE
		Result.add("/" + Segments.map((S) => S.toUpperCase()).join("/"));

		// For each segment position, vary that segment while the rest stay lowercase
		for (let I = 0; I < Segments.length; I++) {
			const Seg = Segments[I]!;

			// case variants of this segment
			for (const C of SegmentCases(Seg)) {
				const Parts = [...LowerSegs];

				Parts[I] = C;

				Result.add("/" + Parts.join("/"));
			}

			// compound variants (kebab etc.) for this segment
			for (const V of SegmentCompound(Seg)) {
				const Parts = [...LowerSegs];

				Parts[I] = V;

				Result.add("/" + Parts.join("/"));
			}
		}

		// Flat forms: /accountsignin, /account-signin, /account_signin
		Result.add("/" + LowerSegs.join(""));

		Result.add("/" + LowerSegs.join("-"));

		Result.add("/" + LowerSegs.join("_"));
	}

	// Trailing-slash duplicates for every entry found so far
	for (const Path of [...Result]) {
		if (!Path.endsWith("/")) Result.add(Path + "/");
	}

	// The canonical itself is not a variant
	Result.delete(CanonicalPath);

	return [...Result];
};

// ─── Route map generator ───

const GenerateRouteMap = async (OutputDirectory: string): Promise<RouteMap> => {
	const BuiltPath: string[] = [];

	const ScanDirectory = async (Directory: string): Promise<void> => {
		const Entry = await ReadDirectory(Directory, {
			withFileTypes: true,
		});

		for (const Item of Entry) {
			const FullPath = Join(Directory, Item.name);

			if (Item.isDirectory()) {
				await ScanDirectory(FullPath);
			} else if (Item.name === "index.html") {
				const RelativePath = Relative(OutputDirectory, Directory);

				const Path = RelativePath === "" ? "/" : "/" + RelativePath;

				BuiltPath.push(Path);
			} else if (
				Item.name.endsWith(".html") &&
				Item.name !== "index.html"
			) {
				const RelativePath = Relative(OutputDirectory, Directory);

				const BaseName = Item.name.replace(/\.html$/, "");

				const Path =
					RelativePath === ""
						? "/" + BaseName
						: "/" + RelativePath + "/" + BaseName;

				BuiltPath.push(Path);
			}
		}
	};

	await ScanDirectory(OutputDirectory);

	// Build canonical set: PascalCase URLs
	const Canonical: string[] = ["/"];

	// Map: variant key → PascalCase canonical
	const Variant: Record<string, string> = {};

	for (const Built of BuiltPath) {
		if (Built === "/") continue;

		if (Built === "/404") continue;

		if (CanonicalPath.has(Built)) {
			Canonical.push(Built);

			// Generate simplified variants
			for (const VariantPath of GeneratePathVariant(Built)) {
				if (!Variant[VariantPath]) {
					Variant[VariantPath] = Built;
				}
			}
		} else {
			Canonical.push(Built);
		}
	}

	// Add semantic aliases (lowercase + trailing slash only - they are already lowercase)
	for (const [Alias, Target] of Object.entries(SemanticAlias)) {
		if (Canonical.includes(Target) || Target === "/") {
			Variant[Alias] = Target;

			Variant[Alias + "/"] = Target;
		}
	}

	return {
		Version: 1,

		Generated: new Date().toISOString(),

		Canonical,

		Variant,
	};
};

export default GenerateRouteMap;
