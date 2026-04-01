import type { RouteMap } from "./Interface/RouteMap.js";

// Pre-import at module evaluation time (while Vite module runner is alive).
// GenerateRouteMap runs in astro:build:done AFTER Vite closes.
const { readdir: ReadDirectory } = await import("node:fs/promises");

const { join: Join, relative: Relative } = await import("node:path");

// PascalCase canonical → all lowercase/variant forms that should reach it
// The ACTUAL built path (from Astro) maps to its PascalCase canonical URL.
// E.g., Astro builds /downloads/index.html → actual path is /downloads
//       PascalCase canonical is /Download
//       Variants: /downloads, /Downloads, /DOWNLOADS, /down, /get → /Download

// Maps: actual built path (lowercase) → PascalCase canonical URL
export const PascalCaseCanonical: Record<string, string> = {
	"/downloads": "/Download",
	"/docs": "/Doc",
	"/blog": "/Blog",
	"/portal": "/Portal",
	"/dashboard": "/Dashboard",
	"/contributing": "/Contributing",
	"/license": "/License",
	"/verify": "/Verify",
	"/contact/sales": "/Contact/Sale",
	"/account/signin": "/Account/SignIn",
	"/account/signup": "/Account/SignUp",
	"/account/forgot-password": "/Account/ForgotPassword",
	"/account/reset-password": "/Account/ResetPassword",
	"/legal/terms": "/Legal/Term",
	"/legal/privacy": "/Legal/Privacy",
	"/oauth/success": "/OAuth/Success",
};

// Extra semantic aliases → PascalCase canonical
export const SemanticAlias: Record<string, string> = {
	// Download variants
	"/down": "/Download",
	"/get": "/Download",
	"/download": "/Download",
	"/downloads": "/Download",
	"/Downloads": "/Download",
	"/DOWNLOADS": "/Download",
	"/DOWNLOAD": "/Download",
	// Doc variants
	"/documentation": "/Doc",
	"/doc": "/Doc",
	"/Docs": "/Doc",
	// Auth variants
	"/login": "/Account/SignIn",
	"/sign-in": "/Account/SignIn",
	"/signin": "/Account/SignIn",
	"/register": "/Account/SignUp",
	"/sign-up": "/Account/SignUp",
	"/signup": "/Account/SignUp",
	"/forgot-password": "/Account/ForgotPassword",
	"/forgotpassword": "/Account/ForgotPassword",
	"/reset-password": "/Account/ResetPassword",
	"/resetpassword": "/Account/ResetPassword",
	// Legal variants
	"/tos": "/Legal/Term",
	"/terms": "/Legal/Term",
	"/terms-of-service": "/Legal/Term",
	"/privacy-policy": "/Legal/Privacy",
	"/privacy": "/Legal/Privacy",
	// Other
	"/contribute": "/Contributing",
	"/home": "/",
	"/main": "/",
	"/sale": "/Contact/Sale",
	"/sales": "/Contact/Sale",
	"/sales-contact": "/Contact/Sale",
	"/contact-sales": "/Contact/Sale",
	"/verify-email": "/Verify",
	"/email-verification": "/Verify",
};

const GenerateRouteMap = async (
	OutputDirectory: string,
): Promise<RouteMap> => {
	const BuiltPath: string[] = [];

	const ScanDirectory = async (Directory: string): Promise<void> => {
		const Entry = await ReadDirectory(Directory, { withFileTypes: true });

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
	// "/" stays as-is, everything else gets a PascalCase canonical
	const Canonical: string[] = ["/"];

	// Map: variant key → PascalCase canonical
	const Variant: Record<string, string> = {};

	for (const Built of BuiltPath) {
		if (Built === "/") continue;

		// Skip non-page paths (404 is handled by Astro/CF directly)
		if (Built === "/404") continue;

		const PascalCase = PascalCaseCanonical[Built];

		if (PascalCase) {
			Canonical.push(PascalCase);

			// The actual built lowercase path redirects to PascalCase
			Variant[Built] = PascalCase;

			// Also add trailing-slash variant
			Variant[Built + "/"] = PascalCase;
			Variant[PascalCase + "/"] = PascalCase;

			// Lowercase of PascalCase
			const LowerPascal = PascalCase.toLowerCase();

			if (LowerPascal !== Built) {
				Variant[LowerPascal] = PascalCase;
			}

			// Uppercase
			Variant[Built.toUpperCase()] = PascalCase;
		} else {
			// No explicit PascalCase mapping — use as-is (shouldn't happen
			// for known pages, but handles future pages gracefully)
			Canonical.push(Built);
		}
	}

	// Add semantic aliases
	for (const [Alias, Target] of Object.entries(SemanticAlias)) {
		if (Canonical.includes(Target) || Target === "/") {
			Variant[Alias] = Target;

			// Also add lowercase variant if alias has mixed case
			const Lower = Alias.toLowerCase();

			if (Lower !== Alias) {
				Variant[Lower] = Target;
			}
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
