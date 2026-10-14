/**
 * Path normalization shared between service worker, 404 page, and build-time
 * route map generation. Must be self-contained (no external imports) since it
 * runs in the SW context.
 */

const StripTrailingSlash = (Path: string): string =>
	Path === "/" ? "/" : Path.replace(/\/+$/, "");

const StripLeadingSlash = (Path: string): string => Path.replace(/^\/+/, "");

const NormalizePath = (Path: string): string =>
	StripTrailingSlash(
		"/" + StripLeadingSlash(decodeURIComponent(Path)).toLowerCase(),
	);

const GenerateVariantKey = (Segment: string): string =>
	Segment.toLowerCase().replace(/[-_]/g, "");

const GenerateSegmentVariant = (Path: string): string[] => {
	const Segment = StripLeadingSlash(StripTrailingSlash(Path))
		.split("/")
		.map(GenerateVariantKey);

	const Result: string[] = ["/" + Segment.join("/")];

	for (const [Index, Part] of Segment.entries()) {
		if (Part.endsWith("s") && Part.length > 2) {
			const Singular = [...Segment];

			Singular[Index] = Part.slice(0, -1);

			Result.push("/" + Singular.join("/"));
		}

		if (!Part.endsWith("s")) {
			const Plural = [...Segment];

			Plural[Index] = Part + "s";

			Result.push("/" + Plural.join("/"));
		}
	}

	return Result;
};

export default {
	NormalizePath,

	GenerateVariantKey,

	GenerateSegmentVariant,

	StripTrailingSlash,
};
