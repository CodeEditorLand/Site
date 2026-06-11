import type Interface from "./Interface/Override.js";

export default (async () => {
	const ParseBoolean = (await import("./Parse/Boolean.js")).default;

	const ParseNumber = (await import("./Parse/Number.js")).default;

	const Source = process.env;

	const Result: Record<string, unknown> = {};

	if (Source["SITE_URL"]) Result["Site"] = Source["SITE_URL"];

	const PortValue = ParseNumber(Source["PORT"]);

	if (PortValue !== undefined) Result["Port"] = PortValue;

	const CompressHTMLValue = ParseBoolean(Source["COMPRESS_HTML"]);

	if (CompressHTMLValue !== undefined)
		Result["CompressHTML"] = CompressHTMLValue;

	const DevToolbarValue = ParseBoolean(Source["DEV_TOOLBAR"]);

	if (DevToolbarValue !== undefined) Result["DevToolbar"] = DevToolbarValue;

	if (Source["PREFETCH_STRATEGY"]) {
		const StrategyResult = (
			await import("./Schema/Prefetch.js")
		).default.safeParse(Source["PREFETCH_STRATEGY"]);

		if (StrategyResult.success)
			Result["PrefetchStrategy"] = StrategyResult.data;
	}

	const PrefetchAllValue = ParseBoolean(Source["PREFETCH_ALL"]);

	if (PrefetchAllValue !== undefined)
		Result["PrefetchAll"] = PrefetchAllValue;

	const ConcurrencyValue = ParseNumber(Source["BUILD_CONCURRENCY"]);

	if (ConcurrencyValue !== undefined)
		Result["BuildConcurrency"] = ConcurrencyValue;

	const SourcemapValue = ParseBoolean(Source["SOURCEMAP"]);

	if (SourcemapValue !== undefined) Result["Sourcemap"] = SourcemapValue;

	const ManifestValue = ParseBoolean(Source["MANIFEST"]);

	if (ManifestValue !== undefined) Result["Manifest"] = ManifestValue;

	if (Source["MINIFY"]) {
		if (Source["MINIFY"] === "false") {
			Result["Minify"] = false;
		} else {
			const MinifyResult = (
				await import("./Schema/Minification.js")
			).default.safeParse(Source["MINIFY"]);

			if (MinifyResult.success) Result["Minify"] = MinifyResult.data;
		}
	}

	if (Source["CSS_MINIFY"]) {
		if (Source["CSS_MINIFY"] === "false") {
			Result["CSSMinify"] = false;
		} else {
			const CSSMinifyResult = (
				await import("./Schema/CSSMinification.js")
			).default.safeParse(Source["CSS_MINIFY"]);

			if (CSSMinifyResult.success)
				Result["CSSMinify"] = CSSMinifyResult.data;
		}
	}

	const ClientPrerenderValue = ParseBoolean(Source["CLIENT_PRERENDER"]);

	if (ClientPrerenderValue !== undefined)
		Result["ClientPrerender"] = ClientPrerenderValue;

	const ContentIntellisenseValue = ParseBoolean(
		Source["CONTENT_INTELLISENSE"],
	);

	if (ContentIntellisenseValue !== undefined)
		Result["ContentIntellisense"] = ContentIntellisenseValue;

	if (Source["CSS_TRANSFORMER"]) {
		const TransformerResult = (
			await import("./Schema/CSSTransformation.js")
		).default.safeParse(Source["CSS_TRANSFORMER"]);

		if (TransformerResult.success)
			Result["CSSTransformer"] = TransformerResult.data;
	}

	const PreserveSymlinksValue = ParseBoolean(Source["PRESERVE_SYMLINKS"]);

	if (PreserveSymlinksValue !== undefined)
		Result["PreserveSymlinks"] = PreserveSymlinksValue;

	const ServiceWorkerValue = ParseBoolean(Source["SERVICE_WORKER"]);

	if (ServiceWorkerValue !== undefined)
		Result["ServiceWorker"] = ServiceWorkerValue;

	const InlineCSSValue = ParseBoolean(Source["INLINE_CSS"]);

	if (InlineCSSValue !== undefined) Result["InlineCSS"] = InlineCSSValue;

	const CompressValue = ParseBoolean(Source["COMPRESS"]);

	if (CompressValue !== undefined) Result["Compress"] = CompressValue;

	return Result;
}) satisfies Interface as Interface;
