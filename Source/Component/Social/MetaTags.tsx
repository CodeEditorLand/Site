interface MetaTagsProps {
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

/**
 * MetaTags component for generating comprehensive meta tags
 * Includes OpenGraph, Twitter Cards, and JSON-LD structured data
 * All content is dynamically passed from pages via props
 * Works with both SSR and client-side rendering
 */
export function MetaTags({
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
}: MetaTagsProps) {
	// Ensure title and description are never empty
	const safeTitle = title || siteName;
	const safeDescription = description || "The next-generation code editor";

	// Build absolute URL
	const baseUrl = "https://editor.land";
	const siteUrl = url.startsWith("http")
		? url
		: url.startsWith("/")
			? `${baseUrl}${url}`
			: baseUrl;

	// JSON-LD structured data
	const jsonLd: any = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": siteName,
		"url": siteUrl,
		"description": safeDescription,
	};

	if (type === "article" && publishedTime) {
		jsonLd.datePublished = publishedTime;
	}

	if (author) {
		jsonLd.author = {
			"@type": "Organization",
			"name": author,
		};
	}

	return (
		<>
			{/* Basic Meta Tags */}
			<title>{safeTitle}</title>
			<meta name="description" content={safeDescription} />
			<meta
				name="robots"
				content={noIndex ? "noindex, nofollow" : "index, follow"}
			/>
			{/* Canonical URL */}
			<link rel="canonical" href={siteUrl} />

			{/* OpenGraph / Facebook */}
			<meta property="og:type" content={type} />
			<meta property="og:url" content={siteUrl} />
			<meta property="og:title" content={safeTitle} />
			<meta property="og:description" content={safeDescription} />
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

			{/* Twitter Card */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:url" content={siteUrl} />
			<meta name="twitter:title" content={safeTitle} />
			<meta name="twitter:description" content={safeDescription} />
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

			{/* Additional SEO metadata */}
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta name="theme-color" content="var(--color-background)" />
			<meta name="format-detection" content="telephone=no" />

			{/* JSON-LD structured data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd),
				}}
			/>
		</>
	);
}

export default MetaTags;
