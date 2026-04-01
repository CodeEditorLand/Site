/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope;

declare const __DEV__: boolean;

declare const __INCREMENT__: string;

// ─── Build-time injected data ───
// The Astro integration replaces these markers at build time:
//   __ROUTE_MAP_CANONICAL__ → JSON array of canonical PascalCase paths
//   __ROUTE_MAP_VARIANT__   → JSON object of variant → canonical mappings

declare const __ROUTE_MAP_CANONICAL__: string[];

declare const __ROUTE_MAP_VARIANT__: Record<string, string>;

// ─── Version + Cache ───

const INCREMENT = __INCREMENT__ ?? "Initial";

const CACHE_ROUTE = `Route-${INCREMENT}`;

const CACHE_ASSET = `Asset-${INCREMENT}`;

const CACHE = [CACHE_ROUTE, CACHE_ASSET];

let CurrentClientVersion: string | null = null;

const BASE_REMOTE =
	new URLSearchParams(self.location.search).get("BASE_REMOTE") ||
	self.location.origin;

// ─── Logging (stripped in production) ───

const Log = __DEV__
	? (..._Message: any[]) => {
			console.log(
				`[Route ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

const ErrorLog = __DEV__
	? (..._Message: any[]) => {
			console.error(
				`[Route ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

const WarnLog = __DEV__
	? (..._Message: any[]) => {
			console.warn(
				`[Route ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

// ─── Route Map ───

const CanonicalSet: Set<string> = new Set(__ROUTE_MAP_CANONICAL__);

const VariantMap: Record<string, string> = __ROUTE_MAP_VARIANT__;

// ─── Path normalization ───

const StripTrailingSlash = (Path: string): string =>
	Path === "/" ? "/" : Path.replace(/\/+$/, "");

const NormalizePath = (Path: string): string =>
	StripTrailingSlash(
		"/" +
			Path.replace(/^\/+/, "")
				.split("/")
				.map((Segment: string) =>
					decodeURIComponent(Segment).toLowerCase(),
				)
				.join("/"),
	);

// ─── Route resolution ───
// Returns the PascalCase canonical path, or null if already canonical

const ResolveRoute = (RequestPath: string): string | null => {
	const Cleaned = StripTrailingSlash(RequestPath);

	if (CanonicalSet.has(Cleaned)) {
		return null;
	}

	const Normalized = NormalizePath(Cleaned);

	if (CanonicalSet.has(Normalized)) {
		return Normalized;
	}

	if (VariantMap[Normalized]) {
		return VariantMap[Normalized];
	}

	if (VariantMap[Cleaned]) {
		return VariantMap[Cleaned];
	}

	const Stripped =
		"/" +
		Normalized.replace(/^\/+/, "")
			.split("/")
			.map((Segment: string) => Segment.replace(/[-_]/g, ""))
			.join("/");

	if (VariantMap[Stripped]) {
		return VariantMap[Stripped];
	}

	return null;
};

// ─── Install ───

self.addEventListener("install", (Event: ExtendableEvent) => {
	__DEV__ && Log(`Installing version ${INCREMENT}...`);

	Event.waitUntil(
		caches
			.open(CACHE_ROUTE)
			.then((Cache) => {
				__DEV__ && Log("Route cache opened.");

				return Cache;
			})
			.catch(
				(_Error: unknown) =>
					__DEV__ && ErrorLog("Cache open failed:", _Error),
			)
			.then(() => {
				__DEV__ && Log("Install complete. Activating immediately.");

				return self.skipWaiting();
			}),
	);
});

// ─── Activate ───

self.addEventListener("activate", (Event: ExtendableEvent) => {
	__DEV__ && Log(`Activating version ${INCREMENT}...`);

	Event.waitUntil(
		Promise.all([
			caches
				.keys()
				.then((CacheKey) =>
					Promise.all(
						CacheKey.map((Key) => {
							if (!CACHE.includes(Key)) {
								__DEV__ && Log(`Deleting old cache: ${Key}`);

								return caches.delete(Key);
							}

							return Promise.resolve();
						}),
					),
				)
				.catch((_Error: unknown) => {
					__DEV__ && ErrorLog("Cache cleanup failed:", _Error);

					return Promise.resolve();
				}),

			self.clients
				.claim()
				.then(() => {
					__DEV__ && Log("Clients claimed successfully.");
				})
				.catch((_Error: unknown) => {
					__DEV__ && ErrorLog("self.clients.claim() failed:", _Error);

					return Promise.resolve();
				}),
		])
			.then(async () => {
				__DEV__ &&
					Log(
						`Version ${INCREMENT} activated and controlling clients.`,
					);

				const IsNewVersion = CurrentClientVersion !== INCREMENT;

				if (IsNewVersion) {
					__DEV__ &&
						Log(
							`New version detected (${CurrentClientVersion} -> ${INCREMENT}). Notifying clients.`,
						);

					CurrentClientVersion = INCREMENT;

					return (
						await self.clients.matchAll({ type: "window" })
					).forEach((Client: WindowClient) => {
						__DEV__ &&
							Log(
								`Sending New Version message to client ${Client.id}`,
							);

						Client.postMessage({ Version: "New" });
					});
				} else {
					__DEV__ &&
						Log(
							`Same version (${INCREMENT}), skipping notification.`,
						);
				}
			})
			.catch(
				(_Error: unknown) =>
					__DEV__ && ErrorLog("Activation failed overall:", _Error),
			),
	);
});

// ─── Fetch ───
// Delineated concerns:
//   1. Route Redirect — intercept navigation, redirect to PascalCase canonical
//   2. Page Cache — network-first for navigation (cache fallback for offline)
//   3. Asset Cache — cache-first for static assets (_astro/*, Asset/*, etc.)
//   4. Pass-through — everything else goes to network

self.addEventListener("fetch", (Event: FetchEvent) => {
	const Request = Event.request;

	const _URL = new URL(Request.url);

	const Path = _URL.pathname;

	__DEV__ &&
		Log(`Fetch: ${Path}`, {
			Method: Request.method,
			Destination: Request.destination,
			Mode: Request.mode,
		});

	if (
		_URL.origin === self.origin &&
		Path === new URL(self.location.href).pathname
	) {
		__DEV__ && Log("Ignoring fetch for SW script itself:", Path);

		return;
	}

	if (Request.method !== "GET") {
		__DEV__ && Log(`Ignoring non-GET: ${Request.method} ${Path}`);

		return;
	}

	// ── Concern 1: Route Redirect ──
	// Intercept ALL navigation requests and redirect variants to PascalCase

	if (Request.mode === "navigate") {
		const ResolvedPath = ResolveRoute(Path);

		if (ResolvedPath !== null) {
			__DEV__ && Log(`Redirecting ${Path} → ${ResolvedPath}`);

			const RedirectURL = new URL(ResolvedPath, _URL.origin);

			RedirectURL.search = _URL.search;

			Event.respondWith(Response.redirect(RedirectURL.href, 301));

			return;
		}

		// ── Concern 2: Page Cache (Network-First) ──
		__DEV__ && Log(`Navigation (network-first): ${Path}`);

		Event.respondWith(
			(async () => {
				try {
					const _Response = await fetch(Request);

					if (_Response && _Response.ok) {
						__DEV__ && Log(`Navigation fetched: ${Path}`);

						(await caches.open(CACHE_ROUTE)).put(
							Request,
							_Response.clone(),
						);

						return _Response;
					}

					__DEV__ &&
						WarnLog(
							`Navigation failed (${_Response.status}): ${Path}. Trying cache...`,
						);
				} catch (_Error: unknown) {
					__DEV__ &&
						WarnLog(
							`Navigation fetch failed: ${Path}. Trying cache...`,
							_Error,
						);
				}

				const _Response = await (
					await caches.open(CACHE_ROUTE)
				).match(Request);

				if (_Response) {
					__DEV__ && Log(`Serving from cache: ${Path}`);

					return _Response;
				}

				__DEV__ &&
					ErrorLog(`No cache fallback for navigation: ${Path}`);

				return new Response(
					"Network error: You appear to be offline and the page is not cached.",
					{
						status: 503,
						statusText: "Service Unavailable",
						headers: { "Content-Type": "text/plain" },
					},
				);
			})(),
		);

		return;
	}

	// ── Concern 3: Asset Cache (Cache-First) ──
	// Static assets with content hashes: _astro/*, Asset/*, Favicon/*

	if (
		Path.startsWith("/_astro/") ||
		Path.startsWith("/Asset/") ||
		Path.startsWith("/Favicon/") ||
		Path.startsWith("/Image/")
	) {
		__DEV__ && Log(`Asset (cache-first): ${Path}`);

		Event.respondWith(
			caches
				.open(CACHE_ASSET)
				.then(async (Cache) => {
					const Cached = await Cache.match(Request);

					if (Cached) {
						__DEV__ && Log(`Asset cache hit: ${Path}`);

						return Cached;
					}

					__DEV__ && Log(`Asset cache miss, fetching: ${Path}`);

					try {
						const _Response = await fetch(Request);

						if (_Response && _Response.ok) {
							__DEV__ && Log(`Caching asset: ${Path}`);

							await Cache.put(Request, _Response.clone());
						}

						return (
							_Response ||
							new Response(`Failed to fetch ${Path}`, {
								status: 504,
							})
						);
					} catch (_Error: unknown) {
						__DEV__ &&
							ErrorLog(`Asset fetch failed: ${Path}`, _Error);

						return new Response(`Offline: ${Path}`, {
							status: 503,
						});
					}
				})
				.catch((_Error: unknown) => {
					__DEV__ && ErrorLog(`Asset cache error: ${Path}`, _Error);

					return fetch(Request);
				}),
		);

		return;
	}

	// ── Concern 4: Pass-through ──
	__DEV__ && WarnLog(`Unhandled, passing through: ${Path}`);
});

// ─── Message handler ───

self.addEventListener("message", (Event: ExtendableMessageEvent) => {
	if (Event.origin !== self.location.origin && Event.origin !== BASE_REMOTE) {
		__DEV__ &&
			WarnLog(
				`Message from untrusted origin: ${Event.origin}`,
				Event.data,
			);

		return;
	}

	__DEV__ && Log("Message from client:", Event.data);
});

export default {};
