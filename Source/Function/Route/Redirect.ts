/**
 * Client-side route redirect script. Embedded inline in 404.astro.
 * Fetches RouteMap.json and redirects if a match is found.
 *
 * This is the Layer 3 fallback — runs when the service worker hasn't
 * been installed yet and the Cloudflare _redirects didn't catch the path.
 */

const RedirectFromRouteMap = async (): Promise<void> => {
	const CurrentPath = window.location.pathname.replace(/\/+$/, "") || "/";
	const NormalizedPath = CurrentPath.toLowerCase();

	try {
		const Response = await fetch("/RouteMap.json");

		if (!Response.ok) {
			return;
		}

		const RouteMap = await Response.json();

		// Check variant map
		const CanonicalPath =
			RouteMap.Variant[NormalizedPath] ||
			RouteMap.Variant[
				NormalizedPath.replace(/[-_]/g, "").replace(/s$/, "")
			] ||
			RouteMap.Variant[NormalizedPath.replace(/[-_]/g, "")];

		if (CanonicalPath && CanonicalPath !== CurrentPath) {
			// Preserve query string and hash
			const Target = new URL(CanonicalPath, window.location.origin);

			Target.search = window.location.search;
			Target.hash = window.location.hash;

			window.location.replace(Target.href);

			return;
		}

		// Check if lowercase version is canonical
		if (
			RouteMap.Canonical.includes(NormalizedPath) &&
			NormalizedPath !== CurrentPath
		) {
			const Target = new URL(NormalizedPath, window.location.origin);

			Target.search = window.location.search;
			Target.hash = window.location.hash;

			window.location.replace(Target.href);

			return;
		}
	} catch {
		// RouteMap not available — show 404 as-is
	}
};

export default RedirectFromRouteMap;
