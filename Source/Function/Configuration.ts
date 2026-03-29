/**
 * Configuration — Three-layer environment-based configuration for the WebSite.
 *
 * Resolution order (highest precedence first):
 *   1. Environment variables (set in Cloudflare Pages, CI, or shell)
 *   2. Configuration.json (repository defaults, checked in)
 *   3. Hardcoded preset values (fallback of last resort)
 *
 * The SITE_ENVIRONMENT variable selects which deployment context is active:
 *   - "Production"  → Site = Configuration.Site  (https://Editor.Land)
 *   - "Preview"     → Site = Configuration.PreviewSite (https://Preview.Editor.Land)
 *   - "Development" → Site = "http://localhost" (local dev server)
 *
 * Each Cloudflare Pages project sets SITE_ENVIRONMENT in its dashboard:
 *   - editor-land project:         SITE_ENVIRONMENT=Production
 *   - preview-editor-land project: SITE_ENVIRONMENT=Preview
 *
 * Environment variables:
 *   NODE_ENV            — "development" | "production" (standard, set by tooling)
 *   SITE_ENVIRONMENT    — "Production" | "Preview" | "Development"
 *   SITE_URL            — Explicit full override for the site URL
 *   PREVIEW_SITE_URL    — Explicit full override for the preview site URL
 *   PORT                — Dev server port
 *   COMPRESS_HTML       — "true" | "false"
 *   DEV_TOOLBAR         — "true" | "false"
 *   PREFETCH_STRATEGY   — "hover" | "tap" | "viewport" | "load"
 *   PREFETCH_ALL        — "true" | "false"
 *   BUILD_CONCURRENCY   — Number
 *   SOURCEMAP           — "true" | "false"
 *   MANIFEST            — "true" | "false"
 *   MINIFY              — "terser" | "esbuild" | "false"
 *   CSS_MINIFY          — "esbuild" | "lightningcss" | "false"
 *   CLIENT_PRERENDER    — "true" | "false"
 *   CONTENT_INTELLISENSE — "true" | "false"
 *   CSS_TRANSFORMER     — "postcss" | "lightningcss"
 *   PRESERVE_SYMLINKS   — "true" | "false"
 *   SERVICE_WORKER      — "true" | "false"
 *   INLINE_CSS          — "true" | "false"
 *   COMPRESS            — "true" | "false"
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { z } from "zod";

// ---------------------------------------------------------------------------
// 1. Zod Schema — validates both Configuration.json and the final merged result
// ---------------------------------------------------------------------------

const SiteEnvironmentSchema = z.enum(["Production", "Preview", "Development"]);

const PrefetchStrategySchema = z.enum(["hover", "tap", "viewport", "load"]);

const MinifySchema = z.union([z.enum(["terser", "esbuild"]), z.literal(false)]);

const CSSMinifySchema = z.union([
	z.enum(["esbuild", "lightningcss"]),
	z.literal(false),
]);

const CSSTransformerSchema = z.enum(["postcss", "lightningcss"]);

export const ConfigurationSchema = z.object({
	Site: z.string().url(),
	PreviewSite: z.string().url(),
	Port: z.number().int().min(1).max(65535),
	CompressHTML: z.boolean(),
	DevToolbar: z.boolean(),
	PrefetchStrategy: PrefetchStrategySchema,
	PrefetchAll: z.boolean(),
	BuildConcurrency: z.number().int().min(1),
	Sourcemap: z.boolean(),
	Manifest: z.boolean(),
	Minify: MinifySchema,
	CSSMinify: CSSMinifySchema,
	ClientPrerender: z.boolean(),
	ContentIntellisense: z.boolean(),
	CSSTransformer: CSSTransformerSchema,
	PreserveSymlinks: z.boolean(),
	ServiceWorker: z.boolean(),
	InlineCSS: z.boolean(),
	Compress: z.boolean(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;

// ---------------------------------------------------------------------------
// 2. Hardcoded preset — fallback of last resort
// ---------------------------------------------------------------------------

const Preset: Configuration = {
	Site: "https://Editor.Land",
	PreviewSite: "https://Preview.Editor.Land",
	Port: 9999,
	CompressHTML: true,
	DevToolbar: false,
	PrefetchStrategy: "hover",
	PrefetchAll: true,
	BuildConcurrency: 9999,
	Sourcemap: false,
	Manifest: true,
	Minify: "terser",
	CSSMinify: "esbuild",
	ClientPrerender: true,
	ContentIntellisense: true,
	CSSTransformer: "postcss",
	PreserveSymlinks: false,
	ServiceWorker: true,
	InlineCSS: true,
	Compress: true,
};

// ---------------------------------------------------------------------------
// 3. Configuration.json loader — layer 2
// ---------------------------------------------------------------------------

function StripUndefined(
	Source: Record<string, unknown>,
): Record<string, unknown> {
	const Result: Record<string, unknown> = {};

	for (const [Key, Value] of Object.entries(Source)) {
		if (Value !== undefined) {
			Result[Key] = Value;
		}
	}

	return Result;
}

function LoadConfigurationFile(): Record<string, unknown> {
	const ConfigurationFilePath = resolve(
		import.meta.dirname ?? process.cwd(),
		"../../Configuration.json",
	);

	if (!existsSync(ConfigurationFilePath)) {
		return {};
	}

	const RawContent = readFileSync(ConfigurationFilePath, "utf-8");
	const ParsedJSON = JSON.parse(RawContent);

	const ValidationResult =
		ConfigurationSchema.partial().safeParse(ParsedJSON);

	if (!ValidationResult.success) {
		console.warn(
			"[Configuration] Configuration.json validation failed:",
			ValidationResult.error.format(),
		);
		console.warn("[Configuration] Falling back to preset values.");
		return {};
	}

	return StripUndefined(ValidationResult.data);
}

// ---------------------------------------------------------------------------
// 4. Environment variable parser — layer 1 (highest precedence)
// ---------------------------------------------------------------------------

function ParseBoolean(Value: string | undefined): boolean | undefined {
	if (Value === undefined) return undefined;

	const Normalized = Value.trim().toLowerCase();

	if (Normalized === "true" || Normalized === "1") return true;
	if (Normalized === "false" || Normalized === "0") return false;

	return undefined;
}

function ParseNumber(Value: string | undefined): number | undefined {
	if (Value === undefined) return undefined;

	const Parsed = Number.parseInt(Value, 10);

	return Number.isNaN(Parsed) ? undefined : Parsed;
}

function LoadEnvironmentOverride(): Record<string, unknown> {
	const Environment = process.env;

	const Override: Record<string, unknown> = {};

	if (Environment["SITE_URL"]) Override["Site"] = Environment["SITE_URL"];
	if (Environment["PREVIEW_SITE_URL"])
		Override["PreviewSite"] = Environment["PREVIEW_SITE_URL"];

	const PortValue = ParseNumber(Environment["PORT"]);
	if (PortValue !== undefined) Override["Port"] = PortValue;

	const CompressHTMLValue = ParseBoolean(Environment["COMPRESS_HTML"]);
	if (CompressHTMLValue !== undefined)
		Override["CompressHTML"] = CompressHTMLValue;

	const DevToolbarValue = ParseBoolean(Environment["DEV_TOOLBAR"]);
	if (DevToolbarValue !== undefined) Override["DevToolbar"] = DevToolbarValue;

	if (Environment["PREFETCH_STRATEGY"]) {
		const StrategyResult = PrefetchStrategySchema.safeParse(
			Environment["PREFETCH_STRATEGY"],
		);
		if (StrategyResult.success)
			Override["PrefetchStrategy"] = StrategyResult.data;
	}

	const PrefetchAllValue = ParseBoolean(Environment["PREFETCH_ALL"]);
	if (PrefetchAllValue !== undefined)
		Override["PrefetchAll"] = PrefetchAllValue;

	const ConcurrencyValue = ParseNumber(Environment["BUILD_CONCURRENCY"]);
	if (ConcurrencyValue !== undefined)
		Override["BuildConcurrency"] = ConcurrencyValue;

	const SourcemapValue = ParseBoolean(Environment["SOURCEMAP"]);
	if (SourcemapValue !== undefined) Override["Sourcemap"] = SourcemapValue;

	const ManifestValue = ParseBoolean(Environment["MANIFEST"]);
	if (ManifestValue !== undefined) Override["Manifest"] = ManifestValue;

	if (Environment["MINIFY"]) {
		if (Environment["MINIFY"] === "false") {
			Override["Minify"] = false;
		} else {
			const MinifyResult = z
				.enum(["terser", "esbuild"])
				.safeParse(Environment["MINIFY"]);
			if (MinifyResult.success) Override["Minify"] = MinifyResult.data;
		}
	}

	if (Environment["CSS_MINIFY"]) {
		if (Environment["CSS_MINIFY"] === "false") {
			Override["CSSMinify"] = false;
		} else {
			const CSSMinifyResult = z
				.enum(["esbuild", "lightningcss"])
				.safeParse(Environment["CSS_MINIFY"]);
			if (CSSMinifyResult.success)
				Override["CSSMinify"] = CSSMinifyResult.data;
		}
	}

	const ClientPrerenderValue = ParseBoolean(Environment["CLIENT_PRERENDER"]);
	if (ClientPrerenderValue !== undefined)
		Override["ClientPrerender"] = ClientPrerenderValue;

	const ContentIntellisenseValue = ParseBoolean(
		Environment["CONTENT_INTELLISENSE"],
	);
	if (ContentIntellisenseValue !== undefined)
		Override["ContentIntellisense"] = ContentIntellisenseValue;

	if (Environment["CSS_TRANSFORMER"]) {
		const TransformerResult = CSSTransformerSchema.safeParse(
			Environment["CSS_TRANSFORMER"],
		);
		if (TransformerResult.success)
			Override["CSSTransformer"] = TransformerResult.data;
	}

	const PreserveSymlinksValue = ParseBoolean(
		Environment["PRESERVE_SYMLINKS"],
	);
	if (PreserveSymlinksValue !== undefined)
		Override["PreserveSymlinks"] = PreserveSymlinksValue;

	const ServiceWorkerValue = ParseBoolean(Environment["SERVICE_WORKER"]);
	if (ServiceWorkerValue !== undefined)
		Override["ServiceWorker"] = ServiceWorkerValue;

	const InlineCSSValue = ParseBoolean(Environment["INLINE_CSS"]);
	if (InlineCSSValue !== undefined) Override["InlineCSS"] = InlineCSSValue;

	const CompressValue = ParseBoolean(Environment["COMPRESS"]);
	if (CompressValue !== undefined) Override["Compress"] = CompressValue;

	return Override;
}

// ---------------------------------------------------------------------------
// 5. Merge layers: Preset ← Configuration.json ← Environment variables
// ---------------------------------------------------------------------------

const FileConfiguration = LoadConfigurationFile();
const EnvironmentOverride = LoadEnvironmentOverride();

const Merged = {
	...Preset,
	...FileConfiguration,
	...EnvironmentOverride,
};

// Final validation of the merged result
const FinalValidation = ConfigurationSchema.safeParse(Merged);

if (!FinalValidation.success) {
	console.error(
		"[Configuration] Final merged configuration is invalid:",
		FinalValidation.error.format(),
	);
	throw new Error(
		"[Configuration] Cannot start with invalid configuration. Check Configuration.json and environment variables.",
	);
}

const ValidatedConfiguration: Configuration = FinalValidation.data;

// ---------------------------------------------------------------------------
// 6. Resolve deployment context
// ---------------------------------------------------------------------------

/**
 * On — Development mode flag.
 * True when NODE_ENV is "development".
 */
export const On: boolean = process.env["NODE_ENV"] === "development";

/**
 * SiteEnvironment — Which deployment context is active.
 *
 * Resolution:
 *   1. SITE_ENVIRONMENT env var (set per Cloudflare Pages project)
 *   2. Inferred from NODE_ENV ("development" → "Development")
 *   3. Default: "Production"
 */
export const SiteEnvironment: z.infer<typeof SiteEnvironmentSchema> = (() => {
	const EnvironmentValue = process.env["SITE_ENVIRONMENT"];

	if (EnvironmentValue) {
		const Result = SiteEnvironmentSchema.safeParse(EnvironmentValue);

		if (Result.success) return Result.data;

		console.warn(
			`[Configuration] Invalid SITE_ENVIRONMENT="${EnvironmentValue}", expected Production|Preview|Development.`,
		);
	}

	return On ? "Development" : "Production";
})();

/**
 * Site — The resolved site URL for this build.
 *
 * - Development → "http://localhost"
 * - Preview     → ValidatedConfiguration.PreviewSite
 * - Production  → ValidatedConfiguration.Site
 */
export const Site: string = (() => {
	switch (SiteEnvironment) {
		case "Development":
			return "http://localhost";
		case "Preview":
			return ValidatedConfiguration.PreviewSite;
		case "Production":
			return ValidatedConfiguration.Site;
	}
})();

// ---------------------------------------------------------------------------
// 7. Export all resolved values
// ---------------------------------------------------------------------------

export const Port: number = ValidatedConfiguration.Port;
export const CompressHTML: boolean = On
	? false
	: ValidatedConfiguration.CompressHTML;
export const DevToolbar: boolean = On
	? true
	: ValidatedConfiguration.DevToolbar;
export const PrefetchStrategy = ValidatedConfiguration.PrefetchStrategy;
export const PrefetchAll: boolean = ValidatedConfiguration.PrefetchAll;
export const BuildConcurrency: number = ValidatedConfiguration.BuildConcurrency;
export const Sourcemap: boolean = On ? true : ValidatedConfiguration.Sourcemap;
export const EnableManifest: boolean = ValidatedConfiguration.Manifest;
export const Minify: "terser" | "esbuild" | false = On
	? false
	: ValidatedConfiguration.Minify;
export const CSSMinify: "esbuild" | "lightningcss" | false = On
	? false
	: ValidatedConfiguration.CSSMinify;
export const ClientPrerender: boolean = ValidatedConfiguration.ClientPrerender;
export const ContentIntellisense: boolean =
	ValidatedConfiguration.ContentIntellisense;
export const CSSTransformer = ValidatedConfiguration.CSSTransformer;
export const PreserveSymlinks: boolean =
	ValidatedConfiguration.PreserveSymlinks;
export const ServiceWorker: boolean = On
	? false
	: ValidatedConfiguration.ServiceWorker;
export const InlineCSS: boolean = On ? false : ValidatedConfiguration.InlineCSS;
export const Compress: boolean = On ? false : ValidatedConfiguration.Compress;
