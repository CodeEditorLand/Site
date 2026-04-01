/**
 * Build-time route map generator. Scans the Astro output directory for all
 * HTML pages and generates a canonical route map with variant keys for
 * case-insensitive, plural/singular, and semantic alias resolution.
 */

import type { RouteMap } from "./Interface/RouteMap.js";

const SemanticAlias: Record<string, string> = {
	login: "/account/signin",
	"sign-in": "/account/signin",
	register: "/account/signup",
	"sign-up": "/account/signup",
	tos: "/legal/terms",
	"terms-of-service": "/legal/terms",
	"privacy-policy": "/legal/privacy",
	documentation: "/docs",
	doc: "/docs",
	contribute: "/contributing",
	download: "/downloads",
	home: "/",
	main: "/",
	"forgot-password": "/account/forgot-password",
	"reset-password": "/account/reset-password",
	sale: "/contact/sales",
	"sales-contact": "/contact/sales",
	"contact-sales": "/contact/sales",
	verify: "/verify",
	"verify-email": "/verify",
	"email-verification": "/verify",
};

const GenerateRouteMap = async (OutputDirectory: string): Promise<RouteMap> => {
	const { readdir: ReadDirectory } = await import("node:fs/promises");
	const { join: Join, relative: Relative } = await import("node:path");

	const Canonical: string[] = [];

	const ScanDirectory = async (Directory: string): Promise<void> => {
		const Entry = await ReadDirectory(Directory, { withFileTypes: true });

		for (const Item of Entry) {
			const FullPath = Join(Directory, Item.name);

			if (Item.isDirectory()) {
				await ScanDirectory(FullPath);
			} else if (Item.name === "index.html") {
				const RelativePath = Relative(OutputDirectory, Directory);

				const CanonicalPath =
					RelativePath === "" ? "/" : "/" + RelativePath;

				Canonical.push(CanonicalPath);
			} else if (
				Item.name.endsWith(".html") &&
				Item.name !== "index.html"
			) {
				const RelativePath = Relative(OutputDirectory, Directory);

				const BaseName = Item.name.replace(/\.html$/, "");

				const CanonicalPath =
					RelativePath === ""
						? "/" + BaseName
						: "/" + RelativePath + "/" + BaseName;

				Canonical.push(CanonicalPath);
			}
		}
	};

	await ScanDirectory(OutputDirectory);

	const Variant: Record<string, string> = {};

	const { default: Normalize } = await import("./Normalize.js");

	for (const Path of Canonical) {
		const NormalizedKey = Normalize.NormalizePath(Path);

		if (NormalizedKey !== Path) {
			Variant[NormalizedKey] = Path;
		}

		const SegmentVariant = Normalize.GenerateSegmentVariant(Path);

		for (const Key of SegmentVariant) {
			if (Key !== NormalizedKey && Key !== Path) {
				Variant[Key] = Path;
			}
		}
	}

	for (const [Alias, Target] of Object.entries(SemanticAlias)) {
		if (Canonical.includes(Target)) {
			const NormalizedAlias = Normalize.NormalizePath("/" + Alias);

			Variant[NormalizedAlias] = Target;

			Variant["/" + Alias] = Target;
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
