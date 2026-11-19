/**
 * Tags - the document head, as data.
 *
 * ─── WHY THE HEAD IS A MODULE AND NOT A JSX RETURN ────────────────────────
 * The head was one function that built and printed its tags in the same
 * expression, which meant the only way to know what a route's head would write
 * was to render it - and the only place it could be read was `<head>`. A
 * specimen sheet cannot mount a head in a body, so the one part of the site a
 * reader meets before the page was also the one part the sheet could not print.
 *
 * This module decides; `MetaTags.tsx` renders. The list is the contract, and the
 * sheet prints it as a register, so the head's tags are inspectable without a
 * browser and a tag added here appears on the sheet with no second edit.
 *
 * ─── THE FOUR ABSENCES THE OLD SHAPE COULD NOT EXPRESS ────────────────────
 * `image` defaulted to the site's card, so a page with no image passed `""` and
 * the head printed `og:image` as the bare origin plus three sub-tags describing
 * it. `url` defaulted to `""`, so an unresolved canonical printed
 * `<link rel="canonical" href="">` - a page that canonically lives nowhere.
 * Both are now absences the shape can carry:
 *
 *   image: null   omits `og:image`, its three sub-tags and `twitter:image`
 *                 together, because they describe one image
 *   url: ""       omits the canonical and `og:url` rather than printing an
 *                 empty target
 *
 * ─── ONE OF EACH, AND THE TWO THAT ARE NOT DUPLICATES ─────────────────────
 * One canonical, one title, one description per route, one `og:` pair per fact.
 * The two `og:locale:alternate` rows are the languages the site publishes, not
 * duplicates of `og:locale` (which is the page's own language) - and they are
 * `AlternateLocales` here rather than two literals in a JSX block, so the list
 * has one home.
 */
import { NormalizeTitle, SiteName } from "./Title.js";

/** The languages the site publishes, other than the page's own. */
export const AlternateLocales: readonly string[] = ["bg", "de"];

/** The default card, used when a caller passes no `image` at all. */
export const DefaultImage = "/Favicon/og-image.png";

/** The frame's sentence, used when a route passes no description. */
export const DefaultDescription =
	"Rust and Tauri editor stack with VS Code API compatibility in progress.";

/** One thing the head writes. */
export interface Tag {
	/** `title` is the document title; `meta` a meta tag; `link` a link tag. */
	readonly kind: "title" | "meta" | "link" | "jsonld";

	/** The tag's name, property or relation. */
	readonly key: string;

	/** What it carries. */
	readonly value: string;

	/**
	 * For a `meta` tag: which attribute carries the key. `property` is the Open
	 * Graph family's; `name` is everything else's. Absent on the other kinds.
	 */
	readonly attribute?: "name" | "property";
}

/** What a route hands the head. */
export interface HeadFacts {
	readonly title: string;

	readonly description: string;

	/**
	 * The card image. `undefined` uses `DefaultImage`; `null` prints no image
	 * family at all - the absence, rather than a card pointing at nothing.
	 */
	readonly image?: string | null;

	/**
	 * The canonical URL, absolute on the configured origin. An empty string
	 * prints no canonical and no `og:url`.
	 */
	readonly url?: string;

	readonly type?: "website" | "article";

	readonly lang?: string;

	readonly siteName?: string;

	readonly publishedTime?: string;

	readonly author?: string;

	readonly noIndex?: boolean;
}

/** The authors the head credits when a piece does not name one. */
const Organisations = (
	SiteOrigin: string,
): readonly Record<string, string>[] => [
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

/**
 * The head's facts, as the list of tags that state them.
 *
 * @param facts - what the route handed the head
 * @returns every tag, in the order the document writes them
 */
export const TagsOf = ({
	title,
	description,
	image,
	url = "",
	type = "website",
	lang = "en",
	siteName = SiteName,
	publishedTime,
	author,
	noIndex = false,
}: HeadFacts): readonly Tag[] => {
	const SafeTitle = NormalizeTitle(title || siteName, siteName);

	const SafeDescription = description || DefaultDescription;

	/**
	 * `undefined` is the default card; `null` and `""` are the absence. A page
	 * that has no card says so once, here, and the whole image family follows.
	 */
	const Card = image === undefined ? DefaultImage : image;

	const HasImage = Card !== null && Card.trim().length > 0;

	const SiteOrigin = url.startsWith("http") ? new URL(url).origin : "";

	const JSONLD: Record<string, unknown> = {
		"@context": "https://schema.org",

		"@type": "WebSite",

		name: siteName,

		url,

		description: SafeDescription,
	};

	if (type === "article" && publishedTime) {
		JSONLD["datePublished"] = publishedTime;
	}

	JSONLD["author"] = author
		? { "@type": "Organization", name: author }
		: Organisations(SiteOrigin);

	const Tags: Tag[] = [
		{ kind: "title", key: "title", value: SafeTitle },

		{
			kind: "meta",
			attribute: "name",
			key: "description",
			value: SafeDescription,
		},

		{
			kind: "meta",

			attribute: "name",

			key: "author",

			value: "Nikola R. Hristov, Code Editor Land, PlayForm",
		},

		{
			kind: "meta",

			attribute: "name",

			key: "robots",

			value: noIndex ? "noindex, nofollow" : "index, follow",
		},
	];

	/**
	 * The canonical is the one link tag, and it is written only when the frame
	 * resolved a target: an empty `href` is a claim that the page lives nowhere.
	 */
	if (url.length > 0) {
		Tags.push({ kind: "link", key: "canonical", value: url });
	}

	Tags.push({
		kind: "meta",
		attribute: "property",
		key: "og:type",
		value: type,
	});

	if (url.length > 0) {
		Tags.push({
			kind: "meta",
			attribute: "property",
			key: "og:url",
			value: url,
		});
	}

	Tags.push(
		{
			kind: "meta",
			attribute: "property",
			key: "og:title",
			value: SafeTitle,
		},

		{
			kind: "meta",
			attribute: "property",
			key: "og:description",
			value: SafeDescription,
		},
	);

	/**
	 * The image family is one image described four times: the URL, the two
	 * dimensions and the type. They arrive together or not at all.
	 */
	if (HasImage) {
		const CardURL = Card.startsWith("http") ? Card : `${SiteOrigin}${Card}`;

		Tags.push(
			{
				kind: "meta",
				attribute: "property",
				key: "og:image",
				value: CardURL,
			},

			{
				kind: "meta",
				attribute: "property",
				key: "og:image:width",
				value: "1200",
			},

			{
				kind: "meta",
				attribute: "property",
				key: "og:image:height",
				value: "675",
			},

			{
				kind: "meta",
				attribute: "property",
				key: "og:image:type",
				value: Card.endsWith(".svg") ? "image/svg+xml" : "image/png",
			},
		);
	}

	Tags.push(
		{
			kind: "meta",
			attribute: "property",
			key: "og:site_name",
			value: siteName,
		},

		{ kind: "meta", attribute: "property", key: "og:locale", value: lang },

		{
			kind: "meta",
			attribute: "name",
			key: "twitter:card",
			value: "summary_large_image",
		},
	);

	if (url.length > 0) {
		Tags.push({
			kind: "meta",
			attribute: "name",
			key: "twitter:url",
			value: url,
		});
	}

	Tags.push(
		{
			kind: "meta",
			attribute: "name",
			key: "twitter:title",
			value: SafeTitle,
		},

		{
			kind: "meta",
			attribute: "name",
			key: "twitter:description",
			value: SafeDescription,
		},
	);

	if (HasImage) {
		const CardURL = Card.startsWith("http") ? Card : `${SiteOrigin}${Card}`;

		Tags.push({
			kind: "meta",
			attribute: "name",
			key: "twitter:image",
			value: CardURL,
		});
	}

	Tags.push(
		{
			kind: "meta",
			attribute: "name",
			key: "twitter:site",
			value: "@CodeEditorLand",
		},

		{
			kind: "meta",
			attribute: "name",
			key: "twitter:creator",
			value: "@CodeEditorLand",
		},
	);

	/**
	 * No `<meta name="viewport">` here. `Layout/Base.astro` writes it once,
	 * before this block; a second copy is a duplicate the validator flags and
	 * the browser ignores.
	 */
	for (const Locale of AlternateLocales) {
		Tags.push({
			kind: "meta",
			attribute: "property",
			key: "og:locale:alternate",
			value: Locale,
		});
	}

	Tags.push(
		{
			kind: "meta",
			attribute: "name",
			key: "format-detection",
			value: "telephone=no",
		},

		{
			kind: "jsonld",
			key: "application/ld+json",
			value: JSON.stringify(JSONLD),
		},
	);

	return Tags;
};
