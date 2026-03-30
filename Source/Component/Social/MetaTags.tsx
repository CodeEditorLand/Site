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
	const SafeTitle = title || siteName;
	const SafeDescription = description || "The next-generation code editor";

	const BaseURL = "https://editor.land";
	const SiteURL = url.startsWith("http")
		? url
		: url.startsWith("/")
			? `${BaseURL}${url}`
			: BaseURL;

	const JSONLD: any = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": siteName,
		"url": SiteURL,
		"description": SafeDescription,
	};

	if (type === "article" && publishedTime) {
		JSONLD.datePublished = publishedTime;
	}

	if (author) {
		JSONLD.author = {
			"@type": "Organization",
			"name": author,
		};
	}

	return (
		<>
			<title>{SafeTitle}</title>
			<meta name="description" content={SafeDescription} />
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
					image.startsWith("http")
						? image
						: `https://editor.land${image}`
				}
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
					image.startsWith("http")
						? image
						: `https://editor.land${image}`
				}
			/>
			<meta name="twitter:site" content="@CodeEditorLand" />
			<meta name="twitter:creator" content="@CodeEditorLand" />

			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta name="theme-color" content="var(--color-background)" />
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
