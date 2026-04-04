// Layer 3 fallback - client-side redirect for 404 page.
// Fetches RouteMap.json and redirects to PascalCase canonical if match found.
// Runs when SW isn't installed and Cloudflare _redirects didn't catch the path.

const RedirectFromRouteMap = async (): Promise<void> => {
	const CurrentPath = window.location.pathname.replace(/\/+$/, "") || "/";

	// Already on root - nothing to redirect
	if (CurrentPath === "/") {
		return;
	}

	try {
		const Response = await fetch("/RouteMap.json");

		if (!Response.ok) {
			return;
		}

		const RouteMap = await Response.json();

		// If already on a PascalCase canonical URL, no redirect needed
		if (RouteMap.Canonical.includes(CurrentPath)) {
			return;
		}

		// Try exact match first
		let CanonicalPath = RouteMap.Variant[CurrentPath];

		// Try lowercase
		if (!CanonicalPath) {
			CanonicalPath = RouteMap.Variant[CurrentPath.toLowerCase()];
		}

		// Try stripped hyphens/underscores
		if (!CanonicalPath) {
			const Stripped = CurrentPath.toLowerCase().replace(/[-_]/g, "");

			CanonicalPath = RouteMap.Variant[Stripped];
		}

		// Try without trailing 's' (plural → singular)
		if (!CanonicalPath) {
			const Singular = CurrentPath.toLowerCase().replace(/s$/, "");

			CanonicalPath = RouteMap.Variant[Singular];
		}

		if (CanonicalPath && CanonicalPath !== CurrentPath) {
			const Target = new URL(CanonicalPath, window.location.origin);

			Target.search = window.location.search;
			Target.hash = window.location.hash;

			window.location.replace(Target.href);

			return;
		}
	} catch {
		// RouteMap not available - show 404 as-is
	}
};

export default RedirectFromRouteMap;
