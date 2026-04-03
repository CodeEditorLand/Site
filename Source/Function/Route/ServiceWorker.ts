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

// ─── Version + Cache names ───

const INCREMENT = __INCREMENT__ ?? "Initial";

const CACHE_ROUTE = `Route-${INCREMENT}`;
const CACHE_ASSET = `Asset-${INCREMENT}`;
const CACHE_AUTH = "Auth"; // Not versioned - persists across deploys

const CACHE = [CACHE_ROUTE, CACHE_ASSET];
// Note: CACHE_AUTH is NOT in the eviction list - it outlives route cache.

let CurrentClientVersion: string | null = null;

const BASE_REMOTE =
	new URLSearchParams(self.location.search).get("BASE_REMOTE") ||
	self.location.origin;

// ─── Logging (stripped in production) ───

const Log = __DEV__
	? (..._Message: any[]) => {
			console.log(
				`[SW ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

const ErrorLog = __DEV__
	? (..._Message: any[]) => {
			console.error(
				`[SW ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

const WarnLog = __DEV__
	? (..._Message: any[]) => {
			console.warn(
				`[SW ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

// ─── Route registry ───
// Injected at build time from the Astro route map.

const CanonicalSet: Set<string> = new Set(__ROUTE_MAP_CANONICAL__);

const VariantMap: Record<string, string> = __ROUTE_MAP_VARIANT__;

// ─── Route classification ───
// Auth-required routes - redirect to /Account/SignIn when no session cached.
// NOTE: /Portal is the auth-selection gateway (Cloud / Provider / LocalFirst /
// Enterprise tier picker). It must be publicly accessible — users land here
// BEFORE they have a session. Only post-auth destinations belong here.

const ProtectedRoute: Set<string> = new Set(["/Dashboard"]);

// Auth-bypass routes - redirect to /Dashboard when a session IS cached.
// Prevents authenticated users from seeing the sign-in/sign-up pages.

const AuthRoute: Set<string> = new Set([
	"/Account/SignIn",
	"/Account/SignUp",
	"/Account/ForgotPassword",
	"/Account/ResetPassword",
]);

// Dynamic route patterns - segments after the prefix are slug parameters.
// Each entry maps a URL prefix to the canonical base it falls under.

const DynamicRoute: Array<{ Pattern: RegExp; Base: string }> = [
	{ Pattern: /^\/Blog\/([^/]+)\/?$/, Base: "/Blog" },
	{ Pattern: /^\/Doc\/([^/]+)\/?$/, Base: "/Doc" },
];

// Workers API URL prefixes - requests to these paths are pre-processed
// to inject the SW-managed auth token before forwarding to the network.
// NOTE: full domain injection of bearer token is handled in pre-processing.
// In production these match the PUBLIC_*_WORKER_URL env vars; in dev they
// are relative /api/* paths exposed by the dev Workers.

const ApiPrefix: string[] = [
	"/api/",
	"/auth/",
	"/downloads/",
	"/track",
	"/pageview",
	"/events",
	"/summary",
	"/timeline",
	"/stats/",
	"/status",
];

// ─── Auth state ───
// Session token is stored in CACHE_AUTH as a JSON response at /auth-state.
// The token itself is a Bearer token from the Auth Worker.
// JWT/HMAC encryption of the stored payload is a follow-up task.

interface AuthState {
	Token: string;
	ExpiresAt: number; // Unix ms
	UserId: string;
}

const AUTH_STATE_KEY = "/auth-state";

const ReadAuthState = async (): Promise<AuthState | null> => {
	try {
		const Cache = await caches.open(CACHE_AUTH);
		const Cached = await Cache.match(AUTH_STATE_KEY);
		if (!Cached) return null;
		const State = (await Cached.json()) as AuthState;
		// Treat as expired if within 30 s of expiry (clock skew buffer)
		if (State.ExpiresAt - 30_000 < Date.now()) {
			await Cache.delete(AUTH_STATE_KEY);
			__DEV__ && Log("Auth token expired, cleared from cache.");
			return null;
		}
		return State;
	} catch {
		return null;
	}
};

const WriteAuthState = async (State: AuthState): Promise<void> => {
	const Cache = await caches.open(CACHE_AUTH);
	await Cache.put(
		AUTH_STATE_KEY,
		new Response(JSON.stringify(State), {
			headers: { "Content-Type": "application/json" },
		}),
	);
	__DEV__ &&
		Log("Auth state written to cache.", { ExpiresAt: State.ExpiresAt });
};

const ClearAuthState = async (): Promise<void> => {
	const Cache = await caches.open(CACHE_AUTH);
	await Cache.delete(AUTH_STATE_KEY);
	__DEV__ && Log("Auth state cleared.");
};

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
// Returns the PascalCase canonical path, or null if already canonical.
// Handles static routes AND dynamic route slugs.

const ResolveRoute = (RequestPath: string): string | null => {
	const Cleaned = StripTrailingSlash(RequestPath);

	// Already a canonical static route - no redirect needed
	if (CanonicalSet.has(Cleaned) || Cleaned === "/") return null;

	// Check dynamic route patterns - slugs are valid, no redirect needed
	for (const { Pattern } of DynamicRoute) {
		if (Pattern.test(Cleaned)) return null;
	}

	const Normalized = NormalizePath(Cleaned);

	// Normalize against known canonicals
	if (CanonicalSet.has(Normalized)) return Normalized;

	// Check variant map (auto-generated case/plural/compound permutations)
	if (VariantMap[Normalized]) return VariantMap[Normalized];
	if (VariantMap[Cleaned]) return VariantMap[Cleaned];

	// Hyphen/underscore stripped form
	const Stripped =
		"/" +
		Normalized.replace(/^\/+/, "")
			.split("/")
			.map((Segment: string) => Segment.replace(/[-_]/g, ""))
			.join("/");

	if (VariantMap[Stripped]) return VariantMap[Stripped];

	return null;
};

// ─── API request detection ───
// Returns true if a fetch request should have auth headers injected.

const IsApiRequest = (URL: URL): boolean => {
	// Same-origin /api/* relative paths
	if (URL.origin === self.location.origin) {
		return ApiPrefix.some((Prefix) => URL.pathname.startsWith(Prefix));
	}
	// Cross-origin Workers URLs (e.g. https://auth.workers.dev/…)
	// Pre-process if the host looks like a workers.dev deployment
	return URL.hostname.endsWith(".workers.dev");
};

// ─── Inject auth header ───
// Attaches Bearer token to outbound API requests from the SW cache.
// Does not modify the request if no session is active.

const InjectAuthHeader = async (Request: Request): Promise<Request> => {
	const State = await ReadAuthState();
	if (!State) return Request;

	const Headers = new Headers(Request.headers);
	Headers.set("Authorization", `Bearer ${State.Token}`);

	return new Request(Request.url, {
		method: Request.method,
		headers: Headers,
		body:
			Request.method !== "GET" && Request.method !== "HEAD"
				? Request.body
				: undefined,
		credentials: Request.credentials,
		cache: Request.cache,
		redirect: Request.redirect,
		referrer: Request.referrer,
		mode: Request.mode,
	});
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
			.catch((_Error: unknown) => {
				__DEV__ && ErrorLog("Cache open failed:", _Error);
			})
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
							// Evict old versioned caches; preserve CACHE_AUTH
							if (!CACHE.includes(Key) && Key !== CACHE_AUTH) {
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
					__DEV__ && Log("Clients claimed.");
				})
				.catch((_Error: unknown) => {
					__DEV__ && ErrorLog("clients.claim() failed:", _Error);
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
					CurrentClientVersion = INCREMENT;
					return (
						await self.clients.matchAll({ type: "window" })
					).forEach((Client: WindowClient) => {
						Client.postMessage({ Version: "New" });
					});
				}
			})
			.catch((_Error: unknown) => {
				__DEV__ && ErrorLog("Activation failed:", _Error);
			}),
	);
});

// ─── Fetch ───
// Layered request handler - mirrors a CF Pages Function / server adapter:
//
//   Layer 1  Route redirect     - normalize variant URLs → PascalCase canonical
//   Layer 2  Auth gate          - guard protected routes, bypass auth routes
//   Layer 3  API pre-process    - inject Bearer token on Workers API calls
//   Layer 4  Page cache         - network-first for navigation (offline fallback)
//   Layer 5  Asset cache        - cache-first for hashed static assets
//   Layer 6  Pass-through       - everything else → network

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

	// Ignore fetches for the SW script itself
	if (
		_URL.origin === self.origin &&
		Path === new URL(self.location.href).pathname
	) {
		return;
	}

	if (Request.method !== "GET" && Request.method !== "HEAD") {
		// ── Layer 3 (mutation): Inject auth on non-GET API requests ──
		if (IsApiRequest(_URL)) {
			__DEV__ &&
				Log(`API mutation (auth inject): ${Request.method} ${Path}`);
			Event.respondWith(
				InjectAuthHeader(Request).then((AuthedRequest) =>
					fetch(AuthedRequest),
				),
			);
		}
		// All other non-GET requests pass through unmodified
		return;
	}

	// ── Layer 1: Route redirect ──
	if (Request.mode === "navigate") {
		const ResolvedPath = ResolveRoute(Path);

		if (ResolvedPath !== null) {
			__DEV__ && Log(`Route redirect: ${Path} → ${ResolvedPath}`);
			const RedirectURL = new URL(ResolvedPath, _URL.origin);
			RedirectURL.search = _URL.search;
			Event.respondWith(Response.redirect(RedirectURL.href, 301));
			return;
		}

		// ── Layer 2: Auth gate ──
		Event.respondWith(
			(async () => {
				const AuthState = await ReadAuthState();
				const IsAuthed = AuthState !== null;

				// Protected route + no session → sign in
				if (ProtectedRoute.has(Path) && !IsAuthed) {
					__DEV__ &&
						Log(
							`Auth gate: ${Path} requires auth, redirecting to SignIn`,
						);
					const SignInURL = new URL("/Account/SignIn", _URL.origin);
					SignInURL.searchParams.set("next", Path);
					return Response.redirect(SignInURL.href, 302);
				}

				// Auth route + has session → already signed in, go to Dashboard
				if (AuthRoute.has(Path) && IsAuthed) {
					__DEV__ &&
						Log(
							`Auth bypass: ${Path} already authed, redirecting to Dashboard`,
						);
					return Response.redirect(
						new URL("/Dashboard", _URL.origin).href,
						302,
					);
				}

				// ── Layer 4: Page cache (network-first) ──
				__DEV__ && Log(`Navigation (network-first): ${Path}`);

				try {
					const NetworkResponse = await fetch(Request);
					if (NetworkResponse && NetworkResponse.ok) {
						__DEV__ && Log(`Navigation fetched: ${Path}`);
						(await caches.open(CACHE_ROUTE)).put(
							Request,
							NetworkResponse.clone(),
						);
						return NetworkResponse;
					}
					__DEV__ &&
						WarnLog(
							`Navigation failed (${NetworkResponse.status}): ${Path}. Trying cache...`,
						);
				} catch (_Error: unknown) {
					__DEV__ &&
						WarnLog(
							`Navigation fetch failed: ${Path}. Trying cache...`,
							_Error,
						);
				}

				const CachedResponse = await (
					await caches.open(CACHE_ROUTE)
				).match(Request);

				if (CachedResponse) {
					__DEV__ && Log(`Serving from cache: ${Path}`);
					return CachedResponse;
				}

				__DEV__ && ErrorLog(`No cache fallback for: ${Path}`);

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

	// ── Layer 3 (GET): Inject auth on API requests ──
	if (IsApiRequest(_URL)) {
		__DEV__ && Log(`API fetch (auth inject): ${Path}`);
		Event.respondWith(
			InjectAuthHeader(Request).then((AuthedRequest) =>
				fetch(AuthedRequest).catch((_Error: unknown) => {
					__DEV__ && ErrorLog(`API fetch failed: ${Path}`, _Error);
					return new Response(
						JSON.stringify({
							success: false,
							error: "Network error",
						}),
						{
							status: 503,
							headers: { "Content-Type": "application/json" },
						},
					);
				}),
			),
		);
		return;
	}

	// ── Layer 5: Asset cache (cache-first) ──
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
						const NetworkResponse = await fetch(Request);
						if (NetworkResponse && NetworkResponse.ok) {
							await Cache.put(Request, NetworkResponse.clone());
						}
						return (
							NetworkResponse ||
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

	// ── Layer 6: Pass-through ──
	__DEV__ && WarnLog(`Unhandled, passing through: ${Path}`);
});

// ─── Message bus ───
// Handles auth state updates posted by the app (WorkerClient calls postMessage
// after Login/Register/Refresh/Logout). The SW stores the token in CACHE_AUTH
// so it can inject it on subsequent API requests without reading from DOM APIs.
//
// Message shapes:
//   { Type: "Auth:Write",  Token: string, ExpiresAt: number, UserId: string }
//   { Type: "Auth:Clear"  }
//   { Type: "Auth:Read"   }  → SW replies with { Type: "Auth:State", State: AuthState | null }

self.addEventListener("message", (Event: ExtendableMessageEvent) => {
	if (Event.origin !== self.location.origin && Event.origin !== BASE_REMOTE) {
		__DEV__ &&
			WarnLog(
				`Message from untrusted origin: ${Event.origin}`,
				Event.data,
			);
		return;
	}

	__DEV__ && Log("Message from client:", Event.data?.Type ?? Event.data);

	const Data = Event.data as {
		Type: string;
		Token?: string;
		ExpiresAt?: number;
		UserId?: string;
	} | null;

	if (!Data || typeof Data.Type !== "string") return;

	if (Data.Type === "Auth:Write") {
		if (!Data.Token || !Data.ExpiresAt || !Data.UserId) {
			__DEV__ && ErrorLog("Auth:Write missing required fields.");
			return;
		}
		Event.waitUntil(
			WriteAuthState({
				Token: Data.Token,
				ExpiresAt: Data.ExpiresAt,
				UserId: Data.UserId,
			}).then(() => {
				Event.source?.postMessage({ Type: "Auth:Written" });
			}),
		);
		return;
	}

	if (Data.Type === "Auth:Clear") {
		Event.waitUntil(
			ClearAuthState().then(() => {
				Event.source?.postMessage({ Type: "Auth:Cleared" });
			}),
		);
		return;
	}

	if (Data.Type === "Auth:Read") {
		Event.waitUntil(
			ReadAuthState().then((State) => {
				Event.source?.postMessage({ Type: "Auth:State", State });
			}),
		);
		return;
	}

	if (Data.Type === "Version:Check") {
		Event.source?.postMessage({
			Type: "Version:Current",
			Version: INCREMENT,
		});
		return;
	}

	// Legacy: old clients post { Version: "New" }
	if (Event.data?.Version === "New") {
		__DEV__ && Log("Legacy version message received.");
	}
});

export default {};
