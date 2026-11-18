/**
 * The document head - the one place a route's metadata is written.
 *
 * ─── THE CONTRACT ─────────────────────────────────────────────────────────
 * `Layout/Base.astro` owns the shell and passes four facts here: the title, the
 * description, the canonical URL and the OpenGraph card. This module is the only
 * writer of `<title>`, `<meta name="description">`, `<link rel="canonical">` and
 * the `og:` / `twitter:` families, and it writes each of them ONCE:
 *
 *   - one canonical, and it is the canonical path, not the request URL;
 *   - one title, in one pattern (`<page> | Code Editor Land`), normalised here so
 *     a page cannot invent a second pattern by passing its own suffix;
 *   - one description per route, from the page or the frame's default;
 *   - one `og:` pair per fact - `og:title`/`og:description`/`og:url`/`og:image`
 *     each appear once, and `og:image:*` describes the one image;
 *   - NO `<meta name="viewport">`: the frame writes it (`Base.astro`), and a
 *     second copy in the head is the duplicate this module used to ship.
 *
 * The two `og:locale:alternate` rows are the languages the site publishes, not
 * duplicates of `og:locale` (which is the page's own language).
 */
import { NormalizeTitle } from "./Title";

interface MetaTagsProperty {
	title: string;

	description: string;

	image?: string;

	url?: string;

	type?: "website" | "article";

	lang?: string;

	siteName?: string;

	publishedTime?: string;

	author?: string;

	noIndex?: boolean;
}

export default ({
	title,
	description,
	image = "/Favicon/og-image.png",
	url = "",
	type = "website",
	lang = "en",
	siteName = "Code Editor Land",
	publishedTime,
	author,
	noIndex = false,
}: MetaTagsProperty) => {
	/**
	 * One title pattern for the site - see `Social/Title.ts`.
	 *
	 * The module owns the rule (strip a suffix the page appended in any
	 * separator, then print `| Code Editor Land`) and is idempotent, so a page
	 * that already built its own suffix keeps exactly one.
	 */
	const SafeTitle = NormalizeTitle(title || siteName, siteName);

	const SafeDescription =
		description ||
		"Rust and Tauri editor stack with VS Code API compatibility in progress.";

	// `url` is the CANONICAL url the frame resolved for this route - absolute,
	// on the configured site origin (`Layout/Base.astro:89`). It feeds the
	// canonical link, `og:url`, `twitter:url` and the WebSite node below, so the
	// four cannot disagree.
	const SiteURL = url;

	// Origin (scheme + host) for absolutising relative asset paths.
	const SiteOrigin = SiteURL.startsWith("http")
		? new URL(SiteURL).origin
		: "";

	const JSONLD: any = {
		"@context": "https://schema.org",

		"@type": "WebSite",

		name: siteName,

		url: SiteURL,

		description: SafeDescription,
	};

	if (type === "article" && publishedTime) {
		JSONLD.datePublished = publishedTime;
	}

	JSONLD.author = author
		? { "@type": "Organization", name: author }
		: [
				{
					"@type": "Person",

					name: "Nikola R. Hristov",

					url: "https://github.com/NikolaRHristov",
				},

				{
					"@type": "Organization",

					name: "Code Editor Land",

					url: SiteOrigin,
				},

				{
					"@type": "Organization",

					name: "PlayForm",

					url: "https://PlayForm.Cloud",
				},
			];

	return (
		<>
			<title>{SafeTitle}</title>
			<meta name="description" content={SafeDescription} />
			<meta
				name="author"
				content="Nikola R. Hristov, Code Editor Land, PlayForm"
			/>
			<meta
				name="robots"
				content={noIndex ? "noindex, nofollow" : "index, follow"}
			/>
			<link rel="canonical" href={SiteURL} />

			<meta property="og:type" content={type} />
			<meta property="og:url" content={SiteURL} />
			<meta property="og:title" content={SafeTitle} />
			<meta property="og:description" content={SafeDescription} />
			<meta
				property="og:image"
				content={
					image.startsWith("http") ? image : `${SiteOrigin}${image}`
				}
			/>
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="675" />
			<meta
				property="og:image:type"
				content={image.endsWith(".svg") ? "image/svg+xml" : "image/png"}
			/>
			<meta property="og:site_name" content={siteName} />
			<meta property="og:locale" content={lang} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:url" content={SiteURL} />
			<meta name="twitter:title" content={SafeTitle} />
			<meta name="twitter:description" content={SafeDescription} />
			<meta
				name="twitter:image"
				content={
					image.startsWith("http") ? image : `${SiteOrigin}${image}`
				}
			/>
			<meta name="twitter:site" content="@CodeEditorLand" />
			<meta name="twitter:creator" content="@CodeEditorLand" />

			{/*
				No `<meta name="viewport">` here. `Layout/Base.astro` writes it once,
				before this block; a second copy is a duplicate the validator flags
				and the browser ignores.
			*/}
			<meta property="og:locale:alternate" content="bg" />
			<meta property="og:locale:alternate" content="de" />
			<meta name="format-detection" content="telephone=no" />

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(JSONLD),
				}}
			/>
		</>
	);
};
