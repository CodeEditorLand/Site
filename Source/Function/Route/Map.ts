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

// ─── Dynamic variant generation ───
// Generates all reasonable case permutations, singular/plural forms,
// abbreviation prefixes, and hyphenated variants for each PascalCase
// canonical path. The SW normalizes to lowercase at runtime, so these
// are primarily for _redirects (Cloudflare) and RouteMap.json (404 fallback).

// Generate case variants for a single segment.
// For "Account" → account, ACCOUNT, Account, ACcount, ACCount, ACCOunt,
// ACCOUnt, ACCOUNt, ACCOUNT, Acc, ACC, acc, acco, ACCO, etc.
const GenerateSegmentCaseVariant = (PascalSegment: string): string[] => {
	const Lower = PascalSegment.toLowerCase();
	const Upper = PascalSegment.toUpperCase();
	const Variant = new Set<string>();

	// Basic forms
	Variant.add(Lower);
	Variant.add(Upper);
	Variant.add(PascalSegment);

	// Title case (first letter upper, rest lower)
	Variant.add(
		PascalSegment.charAt(0).toUpperCase() +
			PascalSegment.slice(1).toLowerCase(),
	);

	// Progressive uppercase from start:
	// ACcount, ACCount, ACCOunt, ACCOUnt, ACCOUNt, ACCOUNT
	for (let Index = 1; Index <= PascalSegment.length; Index++) {
		Variant.add(Upper.slice(0, Index) + Lower.slice(Index));
	}

	// Progressive lowercase from start:
	// aCCOUNT, acCOUNT, accOUNT, accoUNT, accouNT, accountT
	for (let Index = 1; Index < PascalSegment.length; Index++) {
		Variant.add(Lower.slice(0, Index) + Upper.slice(Index));
	}

	return [...Variant];
};

// Generate singular/plural variants for a segment
const GenerateNumberVariant = (Segment: string): string[] => {
	const Lower = Segment.toLowerCase();
	const Result = [Lower];

	// Plural → singular
	if (Lower.endsWith("ies") && Lower.length > 4) {
		Result.push(Lower.slice(0, -3) + "y");
	} else if (
		Lower.endsWith("ses") ||
		Lower.endsWith("xes") ||
		Lower.endsWith("zes") ||
		Lower.endsWith("ches") ||
		Lower.endsWith("shes")
	) {
		Result.push(Lower.slice(0, -2));
	} else if (
		Lower.endsWith("s") &&
		!Lower.endsWith("ss") &&
		!Lower.endsWith("us") &&
		!Lower.endsWith("is") &&
		Lower.length > 2
	) {
		Result.push(Lower.slice(0, -1));
	}

	// Singular → plural
	if (!Lower.endsWith("s")) {
		Result.push(Lower + "s");
	}

	return Result;
};

// Generate abbreviation prefixes for a segment (2–4 chars)
const GenerateAbbreviationPrefix = (PascalSegment: string): string[] => {
	const Lower = PascalSegment.toLowerCase();
	const Upper = PascalSegment.toUpperCase();
	const Prefix: string[] = [];

	// Only generate prefixes if the segment is long enough (> 4 chars)
	// to avoid ambiguity with very short segments
	if (Lower.length > 4) {
		for (
			let Length = 2;
			Length <= Math.min(4, Lower.length - 1);
			Length++
		) {
			Prefix.push(Lower.slice(0, Length));
			Prefix.push(Upper.slice(0, Length));

			// Title case prefix
			Prefix.push(Upper.charAt(0) + Lower.slice(1, Length));
		}
	}

	return Prefix;
};

// Generate hyphen/underscore/concatenated variants for compound segments
const GenerateCompoundVariant = (PascalSegment: string): string[] => {
	// Find word boundaries in PascalCase: "ForgotPassword" → ["Forgot", "Password"]
	const Word = PascalSegment.match(/[A-Z][a-z]*/g);

	if (!Word || Word.length < 2) {
		return [];
	}

	const Lower = Word.map((W) => W.toLowerCase());
	const Variant: string[] = [];

	// Hyphenated: forgot-password
	Variant.push(Lower.join("-"));

	// Underscored: forgot_password
	Variant.push(Lower.join("_"));

	// Concatenated (no separator): forgotpassword
	Variant.push(Lower.join(""));

	// Dot-separated: forgot.password
	Variant.push(Lower.join("."));

	// Reversed hyphenated: password-forgot
	if (Lower.length === 2) {
		Variant.push([...Lower].reverse().join("-"));
	}

	return Variant;
};

// Generate ALL variants for a full canonical path.
// For single-segment paths like "/Download", generates all case/number/abbrev variants.
// For multi-segment paths like "/Account/SignIn", generates a selective cross-product:
//   - Each segment's case variants × other segments in lowercase
//   - Full lowercase, full uppercase
//   - Hyphenated/flat compound alternatives for each segment
export const GeneratePathVariant = (
	CanonicalPath: string,
	BuiltPath: string,
): string[] => {
	if (CanonicalPath === "/") return [];

	const CanonicalSegment = CanonicalPath.slice(1).split("/");
	const BuiltSegment = BuiltPath.slice(1).split("/");

	// Per-segment variant sets
	const SegmentVariant: string[][] = CanonicalSegment.map(
		(Segment, Index) => {
			const AllVariant = new Set<string>();

			// Case permutations
			for (const Variant of GenerateSegmentCaseVariant(Segment)) {
				AllVariant.add(Variant);
			}

			// Singular/plural
			for (const Variant of GenerateNumberVariant(Segment)) {
				AllVariant.add(Variant);

				// Also add case variants of plural/singular forms
				AllVariant.add(Variant.toUpperCase());
				AllVariant.add(
					Variant.charAt(0).toUpperCase() + Variant.slice(1),
				);
			}

			// Abbreviation prefixes
			for (const Prefix of GenerateAbbreviationPrefix(Segment)) {
				AllVariant.add(Prefix);
			}

			// Compound variants (hyphenated, underscored, etc.)
			for (const Compound of GenerateCompoundVariant(Segment)) {
				AllVariant.add(Compound);

				// Also uppercase and title-case of compound
				AllVariant.add(Compound.toUpperCase());
				AllVariant.add(
					Compound.charAt(0).toUpperCase() + Compound.slice(1),
				);
			}

			// Include original built segment
			if (BuiltSegment[Index]) {
				AllVariant.add(BuiltSegment[Index]);
			}

			return [...AllVariant];
		},
	);

	const Result = new Set<string>();

	if (SegmentVariant.length === 1) {
		// Single-segment path: all variants directly
		for (const Variant of SegmentVariant[0]!) {
			Result.add("/" + Variant);
		}
	} else {
		// Multi-segment path: selective cross-product.
		// For each segment position, vary that segment while keeping
		// all other segments at their lowercase form.
		const LowercaseSegment = CanonicalSegment.map((S) => S.toLowerCase());

		for (let Position = 0; Position < SegmentVariant.length; Position++) {
			for (const Variant of SegmentVariant[Position]!) {
				const Part = [...LowercaseSegment];
				Part[Position] = Variant;
				Result.add("/" + Part.join("/"));
			}
		}

		// Full uppercase
		Result.add(CanonicalPath.toUpperCase());

		// Full lowercase
		Result.add(CanonicalPath.toLowerCase());

		// Built path
		Result.add(BuiltPath);

		// Flat (no slashes) variant for the full path
		// e.g., /Account/SignIn → /accountsignin, /account-signin
		const FlatLower = LowercaseSegment.join("");
		const FlatHyphen = LowercaseSegment.join("-");
		const FlatUnderscore = LowercaseSegment.join("_");

		Result.add("/" + FlatLower);
		Result.add("/" + FlatHyphen);
		Result.add("/" + FlatUnderscore);
	}

	// Add trailing-slash variants for every entry
	const WithSlash: string[] = [];

	for (const Path of Result) {
		if (Path !== "/" && !Path.endsWith("/")) {
			WithSlash.push(Path + "/");
		}
	}

	for (const Path of WithSlash) {
		Result.add(Path);
	}

	// Remove the canonical itself (it's not a "variant")
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

			// Generate ALL variants dynamically
			for (const VariantPath of GeneratePathVariant(Built, Built)) {
				// Don't overwrite existing mappings (first mapping wins)
				if (!Variant[VariantPath]) {
					Variant[VariantPath] = Built;
				}
			}
		} else {
			// Not a known canonical - use as-is
			Canonical.push(Built);
		}
	}

	// Add semantic aliases
	for (const [Alias, Target] of Object.entries(SemanticAlias)) {
		if (Canonical.includes(Target) || Target === "/") {
			Variant[Alias] = Target;

			// Also add lowercase, uppercase, title-case of alias
			const Lower = Alias.toLowerCase();
			const Upper = Alias.toUpperCase();
			const Title =
				Alias.charAt(1).toUpperCase() + Alias.slice(2).toLowerCase();

			if (Lower !== Alias) Variant[Lower] = Target;
			if (Upper !== Alias) Variant[Upper] = Target;

			Variant["/" + Title] = Target;

			// Trailing slash variants
			Variant[Alias + "/"] = Target;
			Variant[Lower + "/"] = Target;
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
