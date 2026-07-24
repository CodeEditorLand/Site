import { _ as slash, a as collapseDuplicateSlashes, c as hasFileExtension, d as joinPaths, f as prependForwardSlash, g as removeTrailingForwardSlash, i as collapseDuplicateLeadingSlashes, l as isInternalPath, m as removeLeadingForwardSlash, n as server_default$1, o as collapseDuplicateTrailingSlashes, r as appendForwardSlash, s as fileExtension, v as trimSlashes } from "./chunks/Vendor/React_ByMJWGvJ.mjs";
import { n as matchPattern } from "./chunks/remote_iH9Q9l33.mjs";
import { $ as i18nNoLocaleFoundInPath, D as MiddlewareNotAResponse, E as MiddlewareNoDataOrNextCalled, F as NoMatchingStaticPathFound, G as SessionStorageInitError, H as ReservedSlotName, J as UnableToLoadLogger, K as SessionStorageSaveError, L as PageNumberParamNotFound, R as PrerenderClientAddressNotAvailable, T as LocalsReassigned, U as ResponseSentError, W as RewriteWithBodyUsed, _ as GetStaticPathsRequired, a as AstroResponseHeadersReassigned, b as InvalidGetStaticPathsEntry, g as GetStaticPathsInvalidRouteParam, h as GetStaticPathsExpectedParams, i as ActionsReturnedInvalidDataError, n as AstroUserError, o as CacheNotEnabled, p as ForbiddenRewrite, q as StaticClientAddressNotAvailable, r as ActionNotFoundError, s as ClientAddressNotAvailable, t as AstroError, w as LocalsNotAnObject, x as InvalidGetStaticPathsReturn, z as PrerenderDynamicEndpointPathCollide } from "./chunks/errors_D0X6889C.mjs";
import { B as appSymbol, C as isRenderInstruction, D as isAstroComponentFactory, F as ASTRO_ERROR_HEADER, G as responseSentSymbol$1, H as fetchStateSymbol, I as ASTRO_GENERATOR, L as DEFAULT_404_COMPONENT, N as isRoute404, O as AstroJSX, P as isRoute500, R as REDIRECT_STATUS_CODES, T as pushDirective, U as originPathnameSymbol, V as clientAddressSymbol, W as pipelineSymbol, _ as generateCspDigest, a as renderJSX, f as renderSlotToString, g as decryptString, h as decodeKey, i as renderPage, j as renderEndpoint, k as createVNode, l as chunkToString, m as renderTemplate, o as renderComponent, p as isRenderTemplateResult, s as renderStreaming, u as createSlotValueFromString, w as normalizeCspResourceEntry, z as REROUTABLE_STATUS_CODES } from "./chunks/server_CE33w8TD.mjs";
import colors from "piccolore";
import { escape } from "html-escaper";
import { parseCookie, stringifySetCookie } from "cookie";
import { parse, stringify, unflatten } from "devalue";
import "es-module-lexer";
import { createStorage } from "unstorage";
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/i18n/path.js
function pathHasLocale(path, locales) {
	const segments = path.split("/").map(normalizeThePath);
	for (const segment of segments) for (const locale of locales) if (typeof locale === "string") {
		if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) return true;
	} else if (segment === locale.path) return true;
	return false;
}
function normalizeTheLocale(locale) {
	return locale.replaceAll("_", "-").toLowerCase();
}
function normalizeThePath(path) {
	return path.endsWith(".html") ? path.slice(0, -5) : path;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/i18n/domain.js
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		let host = request.headers.get("X-Forwarded-Host");
		let protocol = request.headers.get("X-Forwarded-Proto");
		if (protocol) protocol = protocol + ":";
		else protocol = url.protocol;
		if (!host) host = request.headers.get("Host");
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? removeBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (requestPathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
function removeBase(pathname, base) {
	pathname = collapseDuplicateLeadingSlashes(pathname);
	if (pathname.startsWith(base)) return pathname.slice(removeTrailingForwardSlash(base).length + 1);
	return pathname;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/i18n/error-routes.js
function isLocalizedErrorRoute(route, status, locales) {
	if (!locales) return false;
	const suffix = `/${status}`;
	if (!route.endsWith(suffix)) return false;
	const localeSegment = route.slice(0, -suffix.length);
	if (!localeSegment || localeSegment.includes("/", 1)) return false;
	return pathHasLocale(localeSegment, locales);
}
function getErrorRoutePath(pathname, status, routes, locales, appendTrailingSlash = false) {
	const suffix = appendTrailingSlash ? "/" : "";
	if (locales) {
		const firstSegment = pathname.split("/").find(Boolean);
		if (firstSegment && pathHasLocale(`/${firstSegment}`, locales)) {
			const localized = `/${firstSegment}/${status}`;
			if (routes.some((route) => route.route === localized)) return `${localized}${suffix}`;
		}
	}
	return `/${status}${suffix}`;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/middleware/defineMiddleware.js
function defineMiddleware(fn) {
	return fn;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/app/origin-check.js
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const isSameOrigin = request.headers.get("origin") === url.origin;
	if (request.headers.has("content-type")) return hasFormLikeHeader(request.headers.get("content-type")) && !isSameOrigin;
	return !isSameOrigin;
}
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/core.js
var dateTimeFormat = new Intl.DateTimeFormat([], {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false
});
var levels = {
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	silent: 90
};
function log(opts, level, label, message, newLine = true) {
	const logLevel = opts.level;
	const dest = opts.destination;
	const event = {
		label,
		level,
		message,
		newLine
	};
	if (!isLogLevelEnabled(logLevel, level)) return;
	dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
	return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
	return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
	return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
	return log(opts, "error", label, message, newLine);
}
function debug(...args) {
	if ("_astroGlobalDebug" in globalThis) globalThis._astroGlobalDebug(...args);
}
function getEventPrefix({ level, label }) {
	const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
	const prefix = [];
	if (level === "error" || level === "warn") {
		prefix.push(colors.bold(timestamp));
		prefix.push(`[${level.toUpperCase()}]`);
	} else prefix.push(timestamp);
	if (label) prefix.push(`[${label}]`);
	if (level === "error") return colors.red(prefix.join(" "));
	if (level === "warn") return colors.yellow(prefix.join(" "));
	if (prefix.length === 1) return colors.dim(prefix[0]);
	return colors.dim(prefix[0]) + " " + colors.blue(prefix.splice(1).join(" "));
}
var AstroLogger = class {
	options;
	constructor(options) {
		this.options = options;
	}
	info(label, message, newLine = true) {
		info(this.options, label, message, newLine);
	}
	warn(label, message, newLine = true) {
		warn(this.options, label, message, newLine);
	}
	error(label, message, newLine = true) {
		error(this.options, label, message, newLine);
	}
	debug(label, ...messages) {
		debug(label, ...messages);
	}
	level() {
		return this.options.level;
	}
	forkIntegrationLogger(label) {
		return new AstroIntegrationLogger(this.options, label);
	}
	setDestination(destination) {
		this.options.destination = destination;
	}
	/**
	* It calls the `close` function of the provided destination, if it exists.
	*/
	close() {
		if (this.options.destination.close) this.options.destination.close();
	}
	/**
	* It calls the `flush` function of the provided destination, if it exists.
	*/
	flush() {
		if (this.options.destination.flush) this.options.destination.flush();
	}
};
var AstroIntegrationLogger = class AstroIntegrationLogger {
	options;
	label;
	constructor(logging, label) {
		this.options = logging;
		this.label = label;
	}
	/**
	* Creates a new logger instance with a new label, but the same log options.
	*/
	fork(label) {
		return new AstroIntegrationLogger(this.options, label);
	}
	info(message) {
		info(this.options, this.label, message);
	}
	warn(message) {
		warn(this.options, this.label, message);
	}
	error(message) {
		error(this.options, this.label, message);
	}
	debug(message) {
		debug(this.label, message);
	}
	/**
	* It calls the `flush` function of the provided destination, if it exists.
	*/
	flush() {
		if (this.options.destination.flush) this.options.destination.flush();
	}
	/**
	* It calls the `close` function of the provided destination, if it exists.
	*/
	close() {
		if (this.options.destination.close) this.options.destination.close();
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/helpers.js
function routeIsRedirect(route) {
	return route?.type === "redirect";
}
function routeIsFallback(route) {
	return route?.type === "fallback";
}
function getFallbackRoute(route, routeList) {
	const fallbackRoute = routeList.find((r) => {
		if (route.route === "/" && r.routeData.route === "/") return true;
		return r.routeData.fallbackRoutes.find((f) => {
			return f.route === route.route;
		});
	});
	if (!fallbackRoute) throw new Error(`No fallback route found for route ${route.route}`);
	return fallbackRoute.routeData;
}
function getCustom404Route(manifestData) {
	return manifestData.routes.find((r) => isRoute404(r.route));
}
function routeHasHtmlExtension(route) {
	return route.segments.some((segment) => segment.some((part) => !part.dynamic && part.content.includes(".html")));
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/generator.js
function sanitizeParams(params) {
	return Object.fromEntries(Object.entries(params).map(([key, value]) => {
		if (typeof value === "string") return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
		return [key, value];
	}));
}
function getParameter(part, params) {
	if (part.spread) return params[part.content.slice(3)] ?? "";
	if (part.dynamic) {
		if (params[part.content] === void 0) throw new TypeError(`Missing parameter: ${part.content}`);
		return params[part.content];
	}
	return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
	const segmentPath = segment.map((part) => getParameter(part, params)).join("");
	return segmentPath ? collapseDuplicateLeadingSlashes("/" + segmentPath) : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
	return (params) => {
		const sanitizedParams = sanitizeParams(params);
		let trailing = "";
		if (addTrailingSlash === "always" && segments.length) trailing = "/";
		return segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing || "/";
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/internal/validation.js
var VALID_PARAM_TYPES = ["string", "undefined"];
function validateGetStaticPathsParameter([key, value], route) {
	if (!VALID_PARAM_TYPES.includes(typeof value)) throw new AstroError({
		...GetStaticPathsInvalidRouteParam,
		message: GetStaticPathsInvalidRouteParam.message(key, value, typeof value),
		location: { file: route }
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/params.js
function stringifyParams(params, route, trailingSlash) {
	if (route.type === "endpoint" && hasFileExtension(route.route)) trailingSlash = "never";
	const validatedParams = {};
	for (const [key, value] of Object.entries(params)) {
		validateGetStaticPathsParameter([key, value], route.component);
		if (value !== void 0) validatedParams[key] = trimSlashes(value);
	}
	return getRouteGenerator(route.segments, trailingSlash)(validatedParams);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/validation.js
function validateDynamicRouteModule(mod, { ssr, route }) {
	if ((!ssr || route.prerender) && route.origin !== "internal" && !mod.getStaticPaths) throw new AstroError({
		...GetStaticPathsRequired,
		location: { file: route.component }
	});
}
function validateGetStaticPathsResult(result, route) {
	if (!Array.isArray(result)) throw new AstroError({
		...InvalidGetStaticPathsReturn,
		message: InvalidGetStaticPathsReturn.message(typeof result),
		location: { file: route.component }
	});
	result.forEach((pathObject) => {
		if (typeof pathObject === "object" && Array.isArray(pathObject) || pathObject === null) throw new AstroError({
			...InvalidGetStaticPathsEntry,
			message: InvalidGetStaticPathsEntry.message(Array.isArray(pathObject) ? "array" : typeof pathObject)
		});
		if (pathObject.params === void 0 || pathObject.params === null || pathObject.params && Object.keys(pathObject.params).length === 0) throw new AstroError({
			...GetStaticPathsExpectedParams,
			location: { file: route.component }
		});
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/render/paginate.js
function generatePaginateFunction(routeMatch, base, trailingSlash) {
	return function paginateUtility(data, args = {}) {
		const generate = getRouteGenerator(routeMatch.segments, trailingSlash);
		let { pageSize: _pageSize, params: _params, props: _props, format: _format } = args;
		const pageSize = _pageSize || 10;
		const paramName = "page";
		const additionalParams = _params || {};
		const additionalProps = _props || {};
		const formatUrl = _format || ((url) => url);
		let includesFirstPageNumber;
		if (routeMatch.params.includes(`...${paramName}`)) includesFirstPageNumber = false;
		else if (routeMatch.params.includes(`${paramName}`)) includesFirstPageNumber = true;
		else throw new AstroError({
			...PageNumberParamNotFound,
			message: PageNumberParamNotFound.message(paramName)
		});
		const lastPage = Math.max(1, Math.ceil(data.length / pageSize));
		return [...Array(lastPage).keys()].map((num) => {
			const pageNum = num + 1;
			const start = pageSize === Number.POSITIVE_INFINITY ? 0 : (pageNum - 1) * pageSize;
			const end = Math.min(start + pageSize, data.length);
			const params = {
				...additionalParams,
				[paramName]: includesFirstPageNumber || pageNum > 1 ? String(pageNum) : void 0
			};
			const current = formatUrl(addRouteBase(generate({ ...params }), base));
			const next = pageNum === lastPage ? void 0 : formatUrl(addRouteBase(generate({
				...params,
				page: String(pageNum + 1)
			}), base));
			const prev = pageNum === 1 ? void 0 : formatUrl(addRouteBase(generate({
				...params,
				page: !includesFirstPageNumber && pageNum - 1 === 1 ? void 0 : String(pageNum - 1)
			}), base));
			const first = pageNum === 1 ? void 0 : formatUrl(addRouteBase(generate({
				...params,
				page: includesFirstPageNumber ? "1" : void 0
			}), base));
			const last = pageNum === lastPage ? void 0 : formatUrl(addRouteBase(generate({
				...params,
				page: String(lastPage)
			}), base));
			return {
				params,
				props: {
					...additionalProps,
					page: {
						data: data.slice(start, end),
						start,
						end: end - 1,
						size: pageSize,
						total: data.length,
						currentPage: pageNum,
						lastPage,
						url: {
							current,
							next,
							prev,
							first,
							last
						}
					}
				}
			};
		});
	};
}
function addRouteBase(route, base) {
	let routeWithBase = joinPaths(base, route);
	if (routeWithBase === "") routeWithBase = "/";
	return routeWithBase;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/render/route-cache.js
async function callGetStaticPaths({ mod, route, routeCache, ssr, base, trailingSlash }) {
	const cached = routeCache.get(route);
	if (!mod) throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
	if (cached?.staticPaths && cached.mod === mod) return cached.staticPaths;
	validateDynamicRouteModule(mod, {
		ssr,
		route
	});
	if (ssr && !route.prerender || route.origin === "internal") {
		const entry = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
		routeCache.set(route, {
			...cached,
			mod,
			staticPaths: entry
		});
		return entry;
	}
	let staticPaths = [];
	if (!mod.getStaticPaths) throw new Error("Unexpected Error.");
	staticPaths = await mod.getStaticPaths({
		paginate: generatePaginateFunction(route, base, trailingSlash),
		routePattern: route.route
	});
	validateGetStaticPathsResult(staticPaths, route);
	const keyedStaticPaths = staticPaths;
	keyedStaticPaths.keyed = /* @__PURE__ */ new Map();
	for (const sp of keyedStaticPaths) {
		const paramsKey = stringifyParams(sp.params, route, trailingSlash);
		keyedStaticPaths.keyed.set(paramsKey, sp);
	}
	routeCache.set(route, {
		...cached,
		mod,
		staticPaths: keyedStaticPaths
	});
	return keyedStaticPaths;
}
var RouteCache = class {
	logger;
	cache = {};
	runtimeMode;
	constructor(logger, runtimeMode = "production") {
		this.logger = logger;
		this.runtimeMode = runtimeMode;
	}
	/** Clear the cache. */
	clearAll() {
		this.cache = {};
	}
	set(route, entry) {
		const key = this.key(route);
		if (this.runtimeMode === "production" && this.cache[key]?.staticPaths) this.logger.warn(null, `Internal Warning: route cache overwritten. (${key})`);
		this.cache[key] = entry;
	}
	get(route) {
		return this.cache[this.key(route)];
	}
	key(route) {
		return `${route.route}_${route.component}`;
	}
};
function findPathItemByKey(staticPaths, params, route, logger, trailingSlash) {
	const paramsKey = stringifyParams(params, route, trailingSlash);
	const matchedStaticPath = staticPaths.keyed.get(paramsKey);
	if (matchedStaticPath) return matchedStaticPath;
	logger.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${paramsKey}`);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/render/params-and-props.js
async function getProps(opts) {
	const { logger, mod, routeData: route, routeCache, pathname, serverLike, base, trailingSlash } = opts;
	if (!route || route.pathname) return {};
	if (routeIsRedirect(route) || routeIsFallback(route) || route.component === "astro-default-404.astro") return {};
	const staticPaths = await callGetStaticPaths({
		mod,
		route,
		routeCache,
		ssr: serverLike,
		base,
		trailingSlash
	});
	const params = getParams(route, pathname);
	const matchedStaticPath = findPathItemByKey(staticPaths, params, route, logger, trailingSlash);
	if (!matchedStaticPath && route.origin !== "internal" && (serverLike ? route.prerender : true)) throw new AstroError({
		...NoMatchingStaticPathFound,
		message: NoMatchingStaticPathFound.message(pathname),
		hint: NoMatchingStaticPathFound.hint([route.component])
	});
	if (mod) validatePrerenderEndpointCollision(route, mod, params);
	return matchedStaticPath?.props ? { ...matchedStaticPath.props } : {};
}
function getParams(route, pathname) {
	if (!route.params.length) return {};
	const hasHtmlSuffix = pathname.endsWith(".html") && !routeHasHtmlExtension(route);
	const path = hasHtmlSuffix && route.type === "page" ? pathname.slice(0, -5) : pathname;
	const allPatterns = [route, ...route.fallbackRoutes].map((r) => r.pattern);
	let paramsMatch = allPatterns.map((pattern) => pattern.exec(path)).find((x) => x);
	if (!paramsMatch && hasHtmlSuffix && route.type !== "page") {
		const strippedPath = pathname.endsWith("/index.html") ? pathname.slice(0, -11) || "/" : pathname.slice(0, -5);
		paramsMatch = allPatterns.map((pattern) => pattern.exec(strippedPath)).find((x) => x);
	}
	if (!paramsMatch) return {};
	const params = {};
	route.params.forEach((key, i) => {
		if (key.startsWith("...")) params[key.slice(3)] = paramsMatch[i + 1] ? paramsMatch[i + 1] : void 0;
		else params[key] = paramsMatch[i + 1];
	});
	return params;
}
function validatePrerenderEndpointCollision(route, mod, params) {
	if (route.type === "endpoint" && mod.getStaticPaths) {
		const lastSegment = route.segments[route.segments.length - 1];
		const paramValues = Object.values(params);
		const lastParam = paramValues[paramValues.length - 1];
		if (lastSegment.length === 1 && lastSegment[0].dynamic && lastParam === void 0) throw new AstroError({
			...PrerenderDynamicEndpointPathCollide,
			message: PrerenderDynamicEndpointPathCollide.message(route.route),
			hint: PrerenderDynamicEndpointPathCollide.hint(route.component),
			location: { file: route.component }
		});
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		return chunkToString(result, await renderSlotToString(result, this.#slots[name]));
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/build/util.js
function shouldAppendForwardSlash(trailingSlash, buildFormat) {
	switch (trailingSlash) {
		case "always": return true;
		case "never": return false;
		case "ignore": switch (buildFormat) {
			case "directory": return true;
			case "preserve":
			case "file": return false;
		}
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/request.js
function createRequest({ url, headers, method = "GET", body = void 0, logger, isPrerendered = false, routePattern, init }) {
	const headersObj = isPrerendered ? void 0 : headers instanceof Headers ? headers : new Headers(Object.entries(headers).filter(([name]) => !name.startsWith(":")));
	if (typeof url === "string") url = new URL(url);
	if (isPrerendered) url.search = "";
	const request = new Request(url, {
		method,
		headers: headersObj,
		body: isPrerendered ? null : body,
		...init
	});
	if (isPrerendered) {
		let _headers = request.headers;
		const { value, writable, ...headersDesc } = Object.getOwnPropertyDescriptor(request, "headers") || {};
		Object.defineProperty(request, "headers", {
			...headersDesc,
			get() {
				logger.warn(null, `\`Astro.request.headers\` was used when rendering the route \`${routePattern}'\`. \`Astro.request.headers\` is not available on prerendered pages. If you need access to request headers, make sure that the page is server-rendered using \`export const prerender = false;\` or by setting \`output\` to \`"server"\` in your Astro config to make all your pages server-rendered by default.`);
				return _headers;
			},
			set(newHeaders) {
				_headers = newHeaders;
			}
		});
	}
	return request;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/util/pathname.js
var MultiLevelEncodingError = class extends Error {
	constructor() {
		super("URL encoding depth exceeded the maximum number of decode iterations");
		this.name = "MultiLevelEncodingError";
	}
};
var MAX_DECODE_ITERATIONS = 10;
function validateAndDecodePathname(pathname) {
	let decoded;
	try {
		decoded = decodeURI(pathname);
	} catch (_e) {
		throw new Error("Invalid URL encoding");
	}
	let iterations = 0;
	while (decoded !== pathname) {
		if (iterations >= MAX_DECODE_ITERATIONS) throw new MultiLevelEncodingError();
		pathname = decoded;
		try {
			decoded = decodeURI(pathname);
		} catch {
			break;
		}
		iterations++;
	}
	return decoded;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/template/4xx.js
function template({ title, pathname, statusCode = 404, tabTitle, body }) {
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/internal/astro-designed-error-pages.js
var DEFAULT_404_ROUTE = {
	component: DEFAULT_404_COMPONENT,
	params: [],
	pattern: /^\/404\/?$/,
	prerender: false,
	pathname: "/404",
	segments: [[{
		content: "404",
		dynamic: false,
		spread: false
	}]],
	type: "page",
	route: "/404",
	fallbackRoutes: [],
	isIndex: false,
	origin: "internal",
	distURL: []
};
async function default404Page({ pathname }) {
	return new Response(template({
		statusCode: 404,
		title: "Not found",
		tabTitle: "404: Not Found",
		pathname
	}), {
		status: 404,
		headers: { "Content-Type": "text/html" }
	});
}
default404Page.isAstroComponentFactory = true;
var default404Instance = { default: default404Page };
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/rewrite.js
function findRouteToRewrite({ payload, routes, request, trailingSlash, buildFormat, base, outDir }) {
	let newUrl = void 0;
	if (payload instanceof URL) newUrl = payload;
	else if (payload instanceof Request) newUrl = new URL(payload.url);
	else newUrl = new URL(collapseDuplicateSlashes(payload), new URL(request.url).origin);
	const { pathname, resolvedUrlPathname } = normalizeRewritePathname(newUrl.pathname, base, trailingSlash, buildFormat);
	newUrl.pathname = resolvedUrlPathname;
	const decodedPathname = validateAndDecodePathname(pathname);
	if (isRoute404(decodedPathname)) {
		const errorRoute = routes.find((route) => route.route === "/404");
		if (errorRoute) return {
			routeData: errorRoute,
			newUrl,
			pathname: decodedPathname
		};
	}
	if (isRoute500(decodedPathname)) {
		const errorRoute = routes.find((route) => route.route === "/500");
		if (errorRoute) return {
			routeData: errorRoute,
			newUrl,
			pathname: decodedPathname
		};
	}
	let foundRoute;
	for (const route of routes) if (route.pattern.test(decodedPathname)) {
		if (route.params && route.params.length !== 0 && route.distURL && route.distURL.length !== 0) {
			if (!route.distURL.find((url) => url.href.replace(outDir.toString(), "").replace(/(?:\/index\.html|\.html)$/, "") === trimSlashes(pathname))) continue;
		}
		foundRoute = route;
		break;
	}
	if (foundRoute) return {
		routeData: foundRoute,
		newUrl,
		pathname: decodedPathname
	};
	else {
		const custom404 = routes.find((route) => route.route === "/404");
		if (custom404) return {
			routeData: custom404,
			newUrl,
			pathname
		};
		else return {
			routeData: DEFAULT_404_ROUTE,
			newUrl,
			pathname
		};
	}
}
function copyRequest(newUrl, oldRequest, isPrerendered, logger, routePattern) {
	if (oldRequest.bodyUsed) throw new AstroError(RewriteWithBodyUsed);
	return createRequest({
		url: newUrl,
		method: oldRequest.method,
		body: oldRequest.body,
		isPrerendered,
		logger,
		headers: isPrerendered ? {} : oldRequest.headers,
		routePattern,
		init: {
			referrer: oldRequest.referrer,
			referrerPolicy: oldRequest.referrerPolicy,
			mode: oldRequest.mode,
			credentials: oldRequest.credentials,
			cache: oldRequest.cache,
			redirect: oldRequest.redirect,
			integrity: oldRequest.integrity,
			signal: oldRequest.signal,
			keepalive: oldRequest.keepalive,
			duplex: "half"
		}
	});
}
function setOriginPathname(request, pathname, trailingSlash, buildFormat) {
	if (!pathname) pathname = "/";
	const shouldAppendSlash = shouldAppendForwardSlash(trailingSlash, buildFormat);
	let finalPathname;
	if (pathname === "/") finalPathname = "/";
	else if (shouldAppendSlash) finalPathname = appendForwardSlash(pathname);
	else finalPathname = removeTrailingForwardSlash(pathname);
	Reflect.set(request, originPathnameSymbol, encodeURIComponent(finalPathname));
}
function getOriginPathname(request) {
	const origin = Reflect.get(request, originPathnameSymbol);
	if (origin) return decodeURIComponent(origin);
	return new URL(request.url).pathname;
}
function normalizeRewritePathname(urlPathname, base, trailingSlash, buildFormat) {
	let pathname = collapseDuplicateSlashes(urlPathname);
	const shouldAppendSlash = shouldAppendForwardSlash(trailingSlash, buildFormat);
	if (base !== "/") {
		if (urlPathname === base || urlPathname === removeTrailingForwardSlash(base)) pathname = "/";
		else if (urlPathname.startsWith(base)) {
			pathname = shouldAppendSlash ? appendForwardSlash(urlPathname) : removeTrailingForwardSlash(urlPathname);
			pathname = pathname.slice(base.length);
		}
	}
	if (!pathname.startsWith("/") && shouldAppendSlash && urlPathname.endsWith("/")) pathname = prependForwardSlash(pathname);
	if (buildFormat === "file") pathname = pathname.replace(/\.html$/, "");
	let resolvedUrlPathname;
	if (base !== "/" && (pathname === "" || pathname === "/") && !shouldAppendSlash) resolvedUrlPathname = removeTrailingForwardSlash(base);
	else resolvedUrlPathname = joinPaths(...[base, pathname].filter(Boolean));
	return {
		pathname,
		resolvedUrlPathname
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/middleware/sequence.js
function sequence(...handlers) {
	const filtered = handlers.filter((h) => !!h);
	const length = filtered.length;
	if (!length) return defineMiddleware((_context, next) => {
		return next();
	});
	return defineMiddleware((context, next) => {
		let carriedPayload = void 0;
		return applyHandle(0, context);
		function applyHandle(i, handleContext) {
			const handle = filtered[i];
			return handle(handleContext, async (payload) => {
				if (i < length - 1) {
					if (payload) {
						let newRequest;
						if (payload instanceof Request) newRequest = payload;
						else if (payload instanceof URL) newRequest = new Request(payload, handleContext.request.clone());
						else newRequest = new Request(new URL(payload, handleContext.url.origin), handleContext.request.clone());
						const oldPathname = handleContext.url.pathname;
						const pipeline = Reflect.get(handleContext, pipelineSymbol);
						const { routeData, pathname } = await pipeline.tryRewrite(payload, handleContext.request);
						if (pipeline.manifest.serverLike === true && handleContext.isPrerendered === false && routeData.prerender === true) throw new AstroError({
							...ForbiddenRewrite,
							message: ForbiddenRewrite.message(handleContext.url.pathname, pathname, routeData.component),
							hint: ForbiddenRewrite.hint(routeData.component)
						});
						carriedPayload = payload;
						handleContext.request = newRequest;
						handleContext.url = new URL(newRequest.url);
						handleContext.params = getParams(routeData, pathname);
						handleContext.routePattern = routeData.route;
						setOriginPathname(handleContext.request, oldPathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
					}
					return applyHandle(i + 1, handleContext);
				} else return next(payload ?? carriedPayload);
			});
		}
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/redirects/component.js
var RedirectComponentInstance = { default() {
	return new Response(null, { status: 301 });
} };
var RedirectSinglePageBuiltModule = {
	page: () => Promise.resolve(RedirectComponentInstance),
	onRequest: (_, next) => next()
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/request-body.js
async function readBodyWithLimit(request, limit) {
	const contentLengthHeader = request.headers.get("content-length");
	if (contentLengthHeader) {
		const contentLength = Number.parseInt(contentLengthHeader, 10);
		if (Number.isFinite(contentLength) && contentLength > limit) throw new BodySizeLimitError(limit);
	}
	if (!request.body) return /* @__PURE__ */ new Uint8Array();
	const reader = request.body.getReader();
	const chunks = [];
	let received = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (value) {
			received += value.byteLength;
			if (received > limit) throw new BodySizeLimitError(limit);
			chunks.push(value);
		}
	}
	const buffer = new Uint8Array(received);
	let offset = 0;
	for (const chunk of chunks) {
		buffer.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return buffer;
}
var BodySizeLimitError = class extends Error {
	limit;
	constructor(limit) {
		super(`Request body exceeds the configured limit of ${limit} bytes`);
		this.name = "BodySizeLimitError";
		this.limit = limit;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/server-islands/endpoint.js
var SERVER_ISLAND_ROUTE = "/_server-islands/[name]";
var SERVER_ISLAND_COMPONENT = "_server-islands.astro";
function badRequest(reason) {
	return new Response(null, {
		status: 400,
		statusText: "Bad request: " + reason
	});
}
var DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024;
async function getRequestData(request, bodySizeLimit = DEFAULT_BODY_SIZE_LIMIT) {
	switch (request.method) {
		case "GET": {
			const params = new URL(request.url).searchParams;
			if (!params.has("s") || !params.has("e") || !params.has("p")) return badRequest("Missing required query parameters.");
			const encryptedSlots = params.get("s");
			return {
				encryptedComponentExport: params.get("e"),
				encryptedProps: params.get("p"),
				encryptedSlots
			};
		}
		case "POST": try {
			const body = await readBodyWithLimit(request, bodySizeLimit);
			const raw = new TextDecoder().decode(body);
			const data = JSON.parse(raw);
			if (Object.hasOwn(data, "slots") && typeof data.slots === "object") return badRequest("Plaintext slots are not allowed. Slots must be encrypted.");
			if (Object.hasOwn(data, "componentExport") && typeof data.componentExport === "string") return badRequest("Plaintext componentExport is not allowed. componentExport must be encrypted.");
			return data;
		} catch (e) {
			if (e instanceof BodySizeLimitError) return new Response(null, {
				status: 413,
				statusText: e.message
			});
			if (e instanceof SyntaxError) return badRequest("Request format is invalid.");
			throw e;
		}
		default: return new Response(null, { status: 405 });
	}
}
function createEndpoint(manifest) {
	const page = async (result) => {
		const params = result.params;
		if (!params.name) return new Response(null, {
			status: 400,
			statusText: "Bad request"
		});
		const componentId = params.name;
		const data = await getRequestData(result.request, manifest.serverIslandBodySizeLimit);
		if (data instanceof Response) return data;
		let imp = (await (await manifest.serverIslandMappings?.())?.serverIslandMap)?.get(componentId);
		if (!imp) return new Response(null, {
			status: 404,
			statusText: "Not found"
		});
		const key = await manifest.key;
		let componentExport;
		try {
			componentExport = await decryptString(key, data.encryptedComponentExport, `export:${componentId}`);
		} catch (_e) {
			return badRequest("Encrypted componentExport value is invalid.");
		}
		const encryptedProps = data.encryptedProps;
		let props = {};
		if (encryptedProps !== "") try {
			const propString = await decryptString(key, encryptedProps, `props:${componentId}`);
			props = JSON.parse(propString);
		} catch (_e) {
			return badRequest("Encrypted props value is invalid.");
		}
		let decryptedSlots = {};
		const encryptedSlots = data.encryptedSlots;
		if (encryptedSlots !== "") try {
			const slotsString = await decryptString(key, encryptedSlots, `slots:${componentId}`);
			decryptedSlots = JSON.parse(slotsString);
		} catch (_e) {
			return badRequest("Encrypted slots value is invalid.");
		}
		let Component = (await imp())[componentExport];
		const slots = {};
		for (const prop in decryptedSlots) slots[prop] = createSlotValueFromString(decryptedSlots[prop]);
		result.response.headers.set("X-Robots-Tag", "noindex");
		if (isAstroComponentFactory(Component)) {
			const ServerIsland = Component;
			Component = function(...args) {
				return ServerIsland.apply(this, args);
			};
			Object.assign(Component, ServerIsland);
			Component.propagation = "self";
		}
		return renderTemplate`${renderComponent(result, "Component", Component, props, slots)}`;
	};
	page.isAstroComponentFactory = true;
	return {
		default: page,
		partial: true
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/default.js
function createDefaultRoutes(manifest) {
	const root = new URL(manifest.rootDir);
	return [{
		instance: default404Instance,
		matchesComponent: (filePath) => filePath.href === new URL(DEFAULT_404_COMPONENT, root).href,
		route: DEFAULT_404_ROUTE.route,
		component: DEFAULT_404_COMPONENT
	}, {
		instance: createEndpoint(manifest),
		matchesComponent: (filePath) => filePath.href === new URL(SERVER_ISLAND_COMPONENT, root).href,
		route: SERVER_ISLAND_ROUTE,
		component: SERVER_ISLAND_COMPONENT
	}];
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => route.route === "/404")) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/priority.js
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/router.js
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
//#endregion
//#region ../../../node_modules/.pnpm/@astrojs+internal-helpers@0.10.1/node_modules/@astrojs/internal-helpers/dist/object.js
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/public.js
function matchesLevel(messageLevel, configuredLevel) {
	return levels[messageLevel] >= levels[configuredLevel];
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/impls/node.js
function nodeLogDestination(config = {}) {
	const { level = "info" } = config;
	return { write(event) {
		let dest = process.stderr;
		if (levels[event.level] < levels["error"]) dest = process.stdout;
		if (!matchesLevel(event.level, level)) return;
		let trailingLine = event.newLine ? "\n" : "";
		if (event.label === "SKIP_FORMAT") dest.write(event.message + trailingLine);
		else dest.write(getEventPrefix(event) + " " + event.message + trailingLine);
	} };
}
function node_default(options) {
	return nodeLogDestination(options);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/impls/console.js
function consoleLogDestination(config = {}) {
	const { level = "info" } = config;
	return { write(event) {
		let dest = console.error;
		if (levels[event.level] < levels["error"]) dest = console.info;
		if (!matchesLevel(event.level, level)) return;
		if (event.label === "SKIP_FORMAT") dest(event.message);
		else dest(getEventPrefix(event) + " " + event.message);
	} };
}
function createConsoleLogger({ level }) {
	return new AstroLogger({
		level,
		destination: consoleLogDestination()
	});
}
function console_default(options) {
	return consoleLogDestination(options);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/impls/json.js
var SGR_REGEX = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");
function jsonLoggerDestination(config = {}) {
	const { pretty = false, level = "info" } = config;
	return { write(event) {
		if (!matchesLevel(event.level, level)) return;
		const dest = levels[event.level] >= levels["error"] ? console.error : console.info;
		const message = event.message.replace(SGR_REGEX, "");
		dest(pretty ? JSON.stringify({
			message,
			label: event.label,
			level: event.level
		}, null, 2) : JSON.stringify({
			message,
			label: event.label,
			level: event.level
		}));
	} };
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/impls/compose.js
function compose(destinations) {
	return {
		write(chunk) {
			for (const logger of destinations) logger.write(chunk);
		},
		flush() {
			for (const logger of destinations) if (logger.flush) logger.flush();
		},
		close() {
			for (const logger of destinations) if (logger.close) logger.close();
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/logger/load.js
function normalizeEntrypoint(entrypoint) {
	return entrypoint instanceof URL ? entrypoint.href : entrypoint;
}
async function loadLoggerDestination(config) {
	let cause = void 0;
	const entrypoint = normalizeEntrypoint(config.entrypoint);
	try {
		switch (config.entrypoint) {
			case "astro/logger/node": return node_default(config.config);
			case "astro/logger/console": return console_default(config.config);
			case "astro/logger/json": return jsonLoggerDestination(config.config);
			case "astro/logger/compose": {
				let destinations = [];
				if (config.config?.loggers) {
					const loggers = config.config?.loggers;
					destinations = await Promise.all(loggers.map(async (loggerConfig) => {
						return (await import(
							/* @vite-ignore */
							normalizeEntrypoint(loggerConfig.entrypoint)
)).default(loggerConfig.config);
					}));
				}
				return compose(destinations);
			}
			default: return (await import(
				/* @vite-ignore */
				entrypoint
)).default(config.config);
		}
	} catch (e) {
		if (e instanceof Error) cause = e;
	}
	const error = new AstroError({
		...UnableToLoadLogger,
		message: UnableToLoadLogger.message(entrypoint)
	});
	if (cause) error.cause = cause;
	throw error;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/base-pipeline.js
var PipelineFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
var ALL_PIPELINE_FEATURES = PipelineFeatures.redirects | PipelineFeatures.sessions | PipelineFeatures.actions | PipelineFeatures.middleware | PipelineFeatures.i18n | PipelineFeatures.cache;
var Pipeline = class {
	internalMiddleware;
	resolvedMiddleware = void 0;
	resolvedLogger = false;
	resolvedActions = void 0;
	resolvedSessionDriver = void 0;
	resolvedCacheProvider = void 0;
	compiledCacheRoutes = void 0;
	/**
	* Bit mask of pipeline features activated by handler classes.
	* Each handler sets its bit via `|=`. Only meaningful when a
	* custom `src/fetch.ts` fetch handler is in use.
	*/
	usedFeatures = 0;
	logger;
	manifest;
	/**
	* "development" or "production" only
	*/
	runtimeMode;
	renderers;
	resolve;
	streaming;
	/**
	* Used to provide better error messages for `Astro.clientAddress`
	*/
	adapterName;
	clientDirectives;
	inlinedScripts;
	compressHTML;
	i18n;
	middleware;
	routeCache;
	/**
	* Used for `Astro.site`.
	*/
	site;
	/**
	* Array of built-in, internal, routes.
	* Used to find the route module
	*/
	defaultRoutes;
	actions;
	sessionDriver;
	cacheProvider;
	cacheConfig;
	serverIslands;
	/** Route data derived from the manifest, used for route matching. */
	manifestData;
	/** Pattern-matching router built from manifestData. */
	#router;
	constructor(logger, manifest, runtimeMode, renderers, resolve, streaming, adapterName = manifest.adapterName, clientDirectives = manifest.clientDirectives, inlinedScripts = manifest.inlinedScripts, compressHTML = manifest.compressHTML, i18n = manifest.i18n, middleware = manifest.middleware, routeCache = new RouteCache(logger, runtimeMode), site = manifest.site ? new URL(manifest.site) : void 0, defaultRoutes = createDefaultRoutes(manifest), actions = manifest.actions, sessionDriver = manifest.sessionDriver, cacheProvider = manifest.cacheProvider, cacheConfig = manifest.cacheConfig, serverIslands = manifest.serverIslandMappings) {
		this.logger = logger;
		this.manifest = manifest;
		this.runtimeMode = runtimeMode;
		this.renderers = renderers;
		this.resolve = resolve;
		this.streaming = streaming;
		this.adapterName = adapterName;
		this.clientDirectives = clientDirectives;
		this.inlinedScripts = inlinedScripts;
		this.compressHTML = compressHTML;
		this.i18n = i18n;
		this.middleware = middleware;
		this.routeCache = routeCache;
		this.site = site;
		this.defaultRoutes = defaultRoutes;
		this.actions = actions;
		this.sessionDriver = sessionDriver;
		this.cacheProvider = cacheProvider;
		this.cacheConfig = cacheConfig;
		this.serverIslands = serverIslands;
		this.manifestData = { routes: (manifest.routes ?? []).map((route) => route.routeData) };
		ensure404Route(this.manifestData);
		this.#router = new Router(this.manifestData.routes, {
			base: manifest.base,
			trailingSlash: manifest.trailingSlash,
			buildFormat: manifest.buildFormat
		});
		this.internalMiddleware = [];
	}
	/**
	* Low-level route matching against the manifest routes. Returns the
	* matched `RouteData` or `undefined`. Does not filter prerendered
	* routes or check public assets — use `BaseApp.match()` for that.
	*/
	matchRoute(pathname) {
		const match = this.#router.match(pathname, { allowWithoutBase: true });
		if (match.type !== "match") return void 0;
		return match.route;
	}
	/**
	* Returns all routes matching the given pathname, in priority order.
	* Used when the first match cannot serve the request (e.g. a
	* prerendered dynamic route that doesn't cover this specific path)
	* and the caller needs to try subsequent matches.
	*/
	matchAllRoutes(pathname) {
		return this.#router.matchAll(pathname, { allowWithoutBase: true });
	}
	/**
	* Rebuilds the internal router after routes have been added or
	* removed (e.g. by the dev server on HMR).
	*/
	rebuildRouter() {
		this.#router = new Router(this.manifestData.routes, {
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash,
			buildFormat: this.manifest.buildFormat
		});
	}
	/**
	* Resolves the middleware from the manifest, and returns the `onRequest` function. If `onRequest` isn't there,
	* it returns a no-op function
	*/
	async getMiddleware() {
		if (this.resolvedMiddleware) return this.resolvedMiddleware;
		if (this.middleware) {
			const internalMiddlewares = [(await this.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
			if (this.manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
			this.resolvedMiddleware = sequence(...internalMiddlewares);
			return this.resolvedMiddleware;
		} else {
			this.resolvedMiddleware = NOOP_MIDDLEWARE_FN;
			return this.resolvedMiddleware;
		}
	}
	/**
	* Clears the cached middleware so it is re-resolved on the next request.
	* Called via HMR when middleware files change during development.
	*/
	clearMiddleware() {
		this.resolvedMiddleware = void 0;
	}
	/**
	* Resolves the logger destination from the manifest and updates the pipeline logger.
	* If the user configured `logger`, the bundled logger factory is loaded
	* and replaces the default console destination. This is lazy and only resolves once.
	*/
	async getLogger() {
		if (this.resolvedLogger) return this.logger;
		this.resolvedLogger = true;
		if (this.manifest.loggerConfig) this.logger = new AstroLogger({
			destination: await loadLoggerDestination(this.manifest.loggerConfig),
			level: this.manifest.logLevel
		});
		return this.logger;
	}
	async getActions() {
		if (this.resolvedActions) return this.resolvedActions;
		else if (this.actions) {
			this.resolvedActions = await this.actions();
			return this.resolvedActions;
		}
		return NOOP_ACTIONS_MOD;
	}
	async getSessionDriver() {
		if (this.resolvedSessionDriver !== void 0) return this.resolvedSessionDriver;
		if (this.sessionDriver) {
			const driverModule = await this.sessionDriver();
			this.resolvedSessionDriver = driverModule?.default || null;
			return this.resolvedSessionDriver;
		}
		this.resolvedSessionDriver = null;
		return null;
	}
	async getCacheProvider() {
		if (this.resolvedCacheProvider !== void 0) return this.resolvedCacheProvider;
		if (this.cacheProvider) {
			const factory = (await this.cacheProvider())?.default || null;
			this.resolvedCacheProvider = factory ? factory(this.cacheConfig?.options) : null;
			return this.resolvedCacheProvider;
		}
		this.resolvedCacheProvider = null;
		return null;
	}
	async getServerIslands() {
		if (this.serverIslands) return this.serverIslands();
		return {
			serverIslandMap: /* @__PURE__ */ new Map(),
			serverIslandNameMap: /* @__PURE__ */ new Map()
		};
	}
	async getAction(path) {
		const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
		let { server } = await this.getActions();
		if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
		for (const key of pathKeys) {
			if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
				...ActionNotFoundError,
				message: ActionNotFoundError.message(pathKeys.join("."))
			});
			if (!Object.hasOwn(server, key)) throw new AstroError({
				...ActionNotFoundError,
				message: ActionNotFoundError.message(pathKeys.join("."))
			});
			server = server[key];
		}
		if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
		return server;
	}
	async getModuleForRoute(route) {
		for (const defaultRoute of this.defaultRoutes) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
		if (route.type === "redirect") return RedirectSinglePageBuiltModule;
		else {
			if (this.manifest.pageMap) {
				const importComponentInstance = this.manifest.pageMap.get(route.component);
				if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
				return await importComponentInstance();
			} else if (this.manifest.pageModule) return this.manifest.pageModule;
			throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
		}
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	constructor(request) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) {
			const warning = /* @__PURE__ */ new Error("Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
			warning.name = "Warning";
			console.warn(warning);
		}
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": "https://editor.land",
			"SSR": true
		}, {})?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/actions/runtime/server.js
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const pipeline = Reflect.get(context, pipelineSymbol);
			const callerInfoName = shouldAppendForwardSlash(pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await pipeline.getAction(callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = pipeline.manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": "https://editor.land",
			"SSR": true
		}, {})?.DEV) actionResultErrorStack.set(res.error.stack);
		let body2;
		if (res.error instanceof ActionInputError) body2 = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body2 = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body2)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/i18n/fallback.js
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy, base } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const urlLocale = pathname.split("/").find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") if (pathname.includes(`${base}`)) newPathname = pathname.replace(`/${urlLocale}`, ``);
	else newPathname = pathname.replace(`/${urlLocale}`, `/`);
	else newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/i18n/router.js
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		if (pathname.includes("/404") || pathname.includes("/500")) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/i18n/handler.js
var I18n = class {
	#i18n;
	#base;
	#trailingSlash;
	#format;
	#router;
	constructor(i18n, base, trailingSlash, format) {
		this.#i18n = i18n;
		this.#base = base;
		this.#trailingSlash = trailingSlash;
		this.#format = format;
		this.#router = new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		});
	}
	async finalize(state, response) {
		state.pipeline.usedFeatures |= PipelineFeatures.i18n;
		const i18n = this.#i18n;
		if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
		if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
		const url = state.url;
		const currentLocale = state.computeCurrentLocale();
		const isPrerendered = state.routeData.prerender;
		const routerContext = {
			currentLocale,
			currentDomain: url.hostname,
			routeType: state.responseRouteType,
			isReroute: false
		};
		const routeDecision = this.#router.match(url.pathname, routerContext);
		switch (routeDecision.type) {
			case "redirect": {
				let location = routeDecision.location;
				if (shouldAppendForwardSlash(this.#trailingSlash, this.#format)) location = appendForwardSlash(location);
				return new Response(null, {
					status: routeDecision.status ?? 302,
					headers: { Location: location }
				});
			}
			case "notFound": {
				if (isPrerendered) {
					const prerenderedRes = new Response(response.body, {
						status: 404,
						headers: response.headers
					});
					state.skipErrorReroute = true;
					if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
					return prerenderedRes;
				}
				const headers = new Headers();
				if (routeDecision.location) headers.set("Location", routeDecision.location);
				return new Response(null, {
					status: 404,
					headers
				});
			}
			case "continue": break;
		}
		if (i18n.fallback && i18n.fallbackType) {
			const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
			const fallbackDecision = computeFallbackRoute({
				pathname: url.pathname,
				responseStatus: effectiveStatus,
				currentLocale,
				fallback: i18n.fallback,
				fallbackType: i18n.fallbackType,
				locales: i18n.locales,
				defaultLocale: i18n.defaultLocale,
				strategy: i18n.strategy,
				base: this.#base
			});
			switch (fallbackDecision.type) {
				case "redirect": return new Response(null, {
					status: 302,
					headers: { Location: fallbackDecision.pathname + url.search }
				});
				case "rewrite": return await state.rewrite(fallbackDecision.pathname + url.search);
				case "none": break;
			}
		}
		return response;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/i18n/index.js
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		if (a.qualityValue && b.qualityValue) return Math.sign(b.qualityValue - a.qualityValue);
		return 0;
	});
}
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (code === browserLocale.locale) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/middleware/callMiddleware.js
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) if (typeof value !== "undefined") {
			if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
			return value;
		} else if (responseFunctionPromise) return responseFunctionPromise;
		else throw new AstroError(MiddlewareNotAResponse);
		else if (typeof value === "undefined") throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cache/runtime/noop.js
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/middleware/astro-middleware.js
var AstroMiddleware = class {
	#pipeline;
	constructor(pipeline) {
		this.#pipeline = pipeline;
	}
	async handle(state, renderRouteCallback) {
		state.pipeline.usedFeatures |= PipelineFeatures.middleware;
		const pipeline = this.#pipeline;
		await state.getProps();
		const apiContext = state.getAPIContext();
		state.counter++;
		if (state.counter === 4) return new Response("Loop Detected", {
			status: 508,
			statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
		});
		const next = async (ctx, payload) => {
			if (payload) {
				pipeline.logger.debug("router", "Called rewriting to:", payload);
				applyRewriteToState(state, payload, await pipeline.tryRewrite(payload, state.request));
			}
			return renderRouteCallback(state, ctx);
		};
		let response;
		if (state.skipMiddleware) response = await next(apiContext);
		else {
			const pipelineMiddleware = await pipeline.getMiddleware();
			response = await callMiddleware(sequence(...pipeline.internalMiddleware, pipelineMiddleware), apiContext, next);
		}
		response = this.#finalize(state, response);
		state.response = response;
		return response;
	}
	/**
	* Like `handle`, but mirrors the app-level error handling that
	* `AstroHandler` provides on the standard path, the same way
	* `PagesHandler.handleWithErrorFallback` does for `pages()`. When no
	* route matched it returns a 404 marked with `X-Astro-Error` for the
	* app's post-check; when Astro's own middleware chain throws it logs the
	* error and renders the custom `500.astro`.
	*
	* Errors surfaced through `renderRouteCallback` (the host framework's
	* `next`, e.g. host middleware mounted below `middleware()`) are
	* re-thrown instead, so the host's own error handling still runs rather
	* than being swallowed into Astro's 500 page. A sentinel tells the two
	* apart.
	*
	* Used by the composable `astro/fetch` `middleware()` entry point, where
	* there is no surrounding `AstroHandler` to supply this fallback.
	*/
	async handleWithErrorFallback(app, state, renderRouteCallback) {
		if (!state.routeData) return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		let nextError;
		try {
			return await this.handle(state, async (s, ctx) => {
				try {
					return await renderRouteCallback(s, ctx);
				} catch (err) {
					nextError = err;
					throw err;
				}
			});
		} catch (err) {
			if (err === nextError) throw err;
			app.logger.error(null, err.stack || err.message || String(err));
			return app.renderError(state.request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		}
	}
	#finalize(state, response) {
		attachCookiesToResponse(response, state.cookies);
		return response;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
var PagesHandler = class {
	#pipeline;
	constructor(pipeline) {
		this.#pipeline = pipeline;
	}
	async handle(state, ctx) {
		const { logger, streaming } = this.#pipeline;
		state.resetResponseMetadata();
		let response;
		const componentInstance = await state.loadComponentInstance();
		switch (state.routeData.type) {
			case "endpoint":
				response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
				break;
			case "page": {
				const props = await state.getProps();
				const actionApiContext = state.getActionAPIContext();
				const result = await state.createResult(componentInstance, actionApiContext);
				try {
					response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
				} catch (e) {
					result.cancelled = true;
					throw e;
				}
				state.responseRouteType = "page";
				if (state.routeData.route === "/404" || state.routeData.route === "/500") state.skipErrorReroute = true;
				break;
			}
			case "redirect": return new Response(null, {
				status: 404,
				headers: { [ASTRO_ERROR_HEADER]: "true" }
			});
			case "fallback":
				state.responseRouteType = "fallback";
				return new Response(null, { status: 500 });
		}
		const responseCookies = getCookiesFromResponse(response);
		if (responseCookies) state.cookies.merge(responseCookies);
		state.response = response;
		return response;
	}
	/**
	* Like `handle`, but mirrors the app-level error handling that
	* `AstroHandler` provides on the standard path: unmatched routes
	* return a 404 marked with `X-Astro-Error` for the app's post-check
	* to render the 404 error page, and render-time errors are logged
	* and render the 500 error page instead of propagating to the host
	* framework.
	*
	* Used by the composable `astro/fetch` `pages()` entry point, where
	* there is no surrounding `AstroHandler` to supply this fallback.
	*/
	async handleWithErrorFallback(app, state) {
		if (!state.routeData) return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		const ctx = state.getAPIContext();
		if (this.#pipeline.manifest.checkOrigin && isForbiddenCrossOriginRequest(ctx.request, ctx.url, ctx.isPrerendered)) return createCrossOriginForbiddenResponse(ctx.request);
		try {
			return await this.handle(state, ctx);
		} catch (err) {
			app.logger.error(null, err.stack || err.message || String(err));
			return app.renderError(state.request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		}
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/util/normalized-url.js
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
function normalizeUrl(url) {
	try {
		url.pathname = validateAndDecodePathname(url.pathname);
	} catch {
		try {
			url.pathname = decodeURI(url.pathname);
		} catch {}
	}
	url.pathname = collapseDuplicateSlashes(url.pathname);
	return url;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/rewrites/handler.js
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const pipeline = state.pipeline;
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (pipeline.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, pipeline.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
	state.invalidateContexts();
}
var Rewrites = class {
	async execute(state, payload) {
		const pipeline = state.pipeline;
		pipeline.logger.debug("router", "Calling rewrite: ", payload);
		applyRewriteToState(state, payload, await pipeline.tryRewrite(payload, state.request), { mergeCookies: true });
		const middleware = new AstroMiddleware(pipeline);
		const pagesHandler = new PagesHandler(pipeline);
		return middleware.handle(state, pagesHandler.handle.bind(pagesHandler));
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/match.js
function matchRoute(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/app/render-options.js
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/app/validate-headers.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
function parseHost(host) {
	const parts = host.split(":");
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const { hostname, port } = parseHost(sanitized);
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		if (sanitized) {
			const { hostname, port: portFromHost } = parseHost(sanitized);
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/fetch/fetch-state.js
var FetchState = class {
	pipeline;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `AstroHandler` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `AstroHandler` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	*/
	status = 200;
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Rewrites handler instance. Lazy-initialized on first rewrite(). */
	#rewrites;
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(pipeline, request, options) {
		this.pipeline = pipeline;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		url.pathname = publicPathname;
		url.pathname = collapseDuplicateSlashes(url.pathname);
		const domainPathname = computePathnameFromDomain(request, url, pipeline.manifest.i18n, pipeline.manifest.base, pipeline.manifest.trailingSlash, pipeline.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request);
		if (pipeline.manifest.allowedDomains && pipeline.manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the Rewrites handler.
	*/
	rewrite(payload) {
		return (this.#rewrites ??= new Rewrites()).execute(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const pipeline = this.pipeline;
		const { clientDirectives, inlinedScripts, compressHTML, manifest, renderers, resolve } = pipeline;
		const routeData = this.routeData;
		const { links, scripts, styles } = await pipeline.headElements(routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await pipeline.getServerIslands()).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const astroComponentPartial = {
			props,
			self: null
		};
		const Astro = Object.assign(Object.create(astroPagePartial), astroComponentPartial);
		let _slots;
		Object.defineProperty(Astro, "slots", { get: () => {
			if (!_slots) _slots = new Slots(result, slotValues, this.pipeline.logger);
			return _slots;
		} });
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, pipeline, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: pipeline.site,
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						pipeline.logger.info(null, msg);
					},
					warn(msg) {
						pipeline.logger.warn(null, msg);
					},
					error(msg) {
						pipeline.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { pipeline, clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (pipeline.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(pipeline.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		const { pipeline } = this;
		if (!pipeline.manifest.csp) {
			if (pipeline.runtimeMode === "production") pipeline.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			pipeline.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, pipeline: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { pipeline: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { pipeline: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = this.pipeline.getComponentByRoute(this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.pipeline.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
	}
	#resolveRouteData() {
		const pipeline = this.pipeline;
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = pipeline.matchRoute(this.pathname);
		if (matched && matched.prerender && pipeline.manifest.serverLike) if (matched.params.length > 0) {
			const allMatches = pipeline.matchAllRoutes(this.pathname);
			this.routeData = allMatches.find((r) => !r.prerender);
		} else this.routeData = void 0;
		else this.routeData = matched;
		pipeline.logger.debug("router", "Astro matched the following route for " + this.request.url);
		pipeline.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(pipeline.manifestData);
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			pipeline.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			pipeline.logger.debug("router", "Here's the available routes:\n", pipeline.manifestData);
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the pipeline's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`, including the
	* `collapseDuplicateLeadingSlashes` fix that prevents middleware
	* authorization bypass when the URL starts with `//`.
	*/
	#computePathname(normalizedPathname) {
		let pathname = collapseDuplicateLeadingSlashes(normalizedPathname);
		const base = this.pipeline.manifest.base;
		if (pathname.startsWith(base)) {
			const baseWithoutTrailingSlash = removeTrailingForwardSlash(base);
			pathname = pathname.slice(baseWithoutTrailingSlash.length + 1);
		}
		return prependForwardSlash(pathname);
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.pipeline.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.pipeline.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		const oldRequest = this.request;
		this.request = new Request(this.url, oldRequest);
		const app = Reflect.get(oldRequest, appSymbol);
		if (app !== void 0) Reflect.set(this.request, appSymbol, app);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const pipeline = this.pipeline;
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: pipeline.routeCache,
			pathname: this.pathname,
			logger: pipeline.logger,
			serverLike: pipeline.manifest.serverLike,
			base: pipeline.manifest.base,
			trailingSlash: pipeline.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: this.pipeline.site,
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						state.pipeline.logger.info(null, msg);
					},
					warn(msg) {
						state.pipeline.logger.warn(null, msg);
					},
					error(msg) {
						state.pipeline.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Callers must ensure `getProps()` has resolved at least once before
	* calling this.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		Reflect.set(actionApiContext, pipelineSymbol, this.pipeline);
		actionApiContext[fetchStateSymbol] = this;
		this.apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		return this.apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/actions/handler.js
var ActionHandler = class {
	/**
	* Run action handling for the current request. Expects the APIContext
	* that is already being used by the render pipeline.
	*
	* Returns a `Response` when the action fully handles the request (RPC),
	* or `undefined` when the caller should continue processing the
	* request (form actions or non-action requests).
	*/
	handle(apiContext, state) {
		state.pipeline.usedFeatures |= PipelineFeatures.actions;
		if (apiContext.isPrerendered) return;
		const { action, setActionResult } = getActionContext(apiContext);
		if (!action) return;
		if (state.pipeline.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
		return this.#executeAction(action, setActionResult);
	}
	async #executeAction(action, setActionResult) {
		const serialized = serializeActionResult(await action.handler());
		if (action.calledFrom === "rpc") {
			if (serialized.type === "empty") return new Response(null, { status: serialized.status });
			return new Response(serialized.body, {
				status: serialized.status,
				headers: { "Content-Type": serialized.contentType }
			});
		}
		setActionResult(action.name, serialized);
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/trailing-slash-handler.js
var TrailingSlashHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	/**
	* Returns a redirect `Response` if the request pathname needs
	* normalization, or `undefined` if no redirect is required.
	*/
	handle(state) {
		const url = new URL(state.request.url);
		const redirect = this.#redirectTrailingSlash(url.pathname);
		if (redirect === url.pathname) return;
		const addCookieHeader = state.renderOptions.addCookieHeader;
		const status = state.request.method === "GET" ? 301 : 308;
		const response = new Response(redirectTemplate({
			status,
			relativeLocation: url.pathname,
			absoluteLocation: redirect,
			from: state.request.url
		}), {
			status,
			headers: { location: redirect + url.search }
		});
		prepareResponse(response, { addCookieHeader });
		return response;
	}
	#redirectTrailingSlash(pathname) {
		const { trailingSlash } = this.#app.manifest;
		if (pathname === "/" || isInternalPath(pathname)) return pathname;
		const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
		if (path !== pathname) return path;
		if (trailingSlash === "ignore") return pathname;
		if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
		if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
		return pathname;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const pipeline = state.pipeline;
	if (!pipeline.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(pipeline.logger) });
		return;
	}
	if (pipeline.runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, pipeline);
}
async function provideCacheAsync(state, pipeline) {
	const cacheProvider = await pipeline.getCacheProvider();
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (pipeline.cacheConfig?.routes) {
			if (!pipeline.compiledCacheRoutes) pipeline.compiledCacheRoutes = compileCacheRoutes(pipeline.cacheConfig.routes, pipeline.manifest.base, pipeline.manifest.trailingSlash);
			const matched = matchCacheRoute(state.pathname, pipeline.compiledCacheRoutes);
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
var CacheHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	async handle(state, next) {
		this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
		if (!this.#app.pipeline.cacheProvider) return next();
		const cache = state.resolve(CACHE_KEY);
		const cacheProvider = await this.#app.pipeline.getCacheProvider();
		if (cacheProvider?.onRequest) {
			const response2 = await cacheProvider.onRequest({
				request: state.request,
				url: new URL(state.request.url),
				waitUntil: state.renderOptions.waitUntil
			}, async () => {
				const res = await next();
				applyCacheHeaders(cache, res, state.request);
				return res;
			});
			response2.headers.delete("CDN-Cache-Control");
			response2.headers.delete("Cache-Tag");
			return response2;
		}
		const response = await next();
		applyCacheHeaders(cache, response, state.request);
		return response;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") if (redirectIsExternal(redirect)) return redirect;
	else {
		let target = redirect;
		for (const param of Object.keys(params)) {
			const paramValue = params[param];
			target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
		}
		return target;
	}
	else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.redirects;
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.pipeline.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) if (typeof redirect === "string") return Response.redirect(redirect, status);
	else return Response.redirect(redirect.destination, status);
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var unflatten$1 = (parsed, _) => {
	return unflatten(parsed, { URL: (href) => new URL(href) });
};
var stringify$1 = (data, _) => {
	return stringify(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage }) {
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten$1(JSON.parse(stringify$1(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			console.error("Failed to load session data during regeneration:", err);
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			console.error("Failed to remove old session data:", err);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key2) => data.delete(key2));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify$1(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				console.error("Failed to clean up session %s:", sessionId, err);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten$1(raw);
			if (!(storedMap instanceof Map)) {
				await this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			await this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
function provideSession(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.sessions;
	const config = state.pipeline.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const pipeline = state.pipeline;
	const driverFactory = await pipeline.getSessionDriver();
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: pipeline.runtimeMode,
				driverFactory,
				mockStorage: null
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/routing/handler.js
var AstroHandler = class {
	#app;
	#trailingSlashHandler;
	#actionHandler;
	#astroMiddleware;
	#pagesHandler;
	#cacheHandler;
	/** Bound callback for the middleware chain — created once, reused per request. */
	#renderRouteCallback;
	/**
	* i18n post-processor. Only set when the app has i18n configured and
	* the strategy is not `manual` — for the manual strategy users wire
	* `astro:i18n.middleware(...)` into their own `onRequest`.
	*/
	#i18n;
	/** Whether sessions are configured on the manifest. */
	#hasSession;
	constructor(app) {
		this.#app = app;
		this.#trailingSlashHandler = new TrailingSlashHandler(app);
		this.#actionHandler = new ActionHandler();
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
		this.#cacheHandler = new CacheHandler(app);
		this.#renderRouteCallback = this.#actionsAndPages.bind(this);
		this.#hasSession = !!app.manifest.sessionConfig;
		const i18n = app.manifest.i18n;
		if (i18n && i18n.strategy !== "manual") this.#i18n = new I18n(i18n, app.manifest.base, app.manifest.trailingSlash, app.manifest.buildFormat);
	}
	/**
	* Runs actions then pages — the callback at the bottom of the
	* middleware chain. Bound once in the constructor to avoid
	* per-request closure allocation.
	*/
	#actionsAndPages(state, ctx) {
		if (!state.skipMiddleware) {
			const actionResult = this.#actionHandler.handle(ctx, state);
			if (actionResult) return actionResult.then((response) => response ?? this.#pagesHandler.handle(state, ctx));
		}
		return this.#pagesHandler.handle(state, ctx);
	}
	async handle(state) {
		state.pipeline.usedFeatures |= ALL_PIPELINE_FEATURES;
		if (state.invalidEncoding) return new Response(null, {
			status: 400,
			statusText: "Bad Request"
		});
		const trailingSlashRedirect = this.#trailingSlashHandler.handle(state);
		if (trailingSlashRedirect) return trailingSlashRedirect;
		if (!state.routeData) return this.#app.renderError(state.request, {
			...state.renderOptions,
			status: 404,
			pathname: state.pathname
		});
		return this.render(state);
	}
	/**
	* Renders a response for the given `FetchState`. Assumes
	* trailing-slash redirects and routeData resolution have already run.
	*
	* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
	* `Rewrites.execute` on the current `FetchState` — they mutate the
	* existing state in place and re-run middleware + page dispatch.
	*/
	async render(state) {
		const routeData = state.routeData;
		const pathname = state.pathname;
		const request = state.request;
		const { addCookieHeader } = state.renderOptions;
		state.status = this.#app.getDefaultStatusCode(routeData, pathname);
		let response;
		try {
			const sessionP = this.#hasSession ? provideSession(state) : void 0;
			const cacheP = provideCache(state);
			if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
			state.pipeline.usedFeatures |= PipelineFeatures.sessions;
			if (routeData.type === "redirect") {
				const redirectResponse = await renderRedirect(state);
				this.#app.logThisRequest({
					pathname,
					method: request.method,
					statusCode: redirectResponse.status,
					isRewrite: false,
					timeStart: state.timeStart
				});
				prepareResponse(redirectResponse, { addCookieHeader });
				this.#app.pipeline.logger.flush();
				return redirectResponse;
			}
			if (!this.#app.pipeline.cacheProvider) {
				this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
				response = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
				if (this.#i18n) response = await this.#i18n.finalize(state, response);
			} else {
				const runPipeline = async () => {
					let res = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
					if (this.#i18n) res = await this.#i18n.finalize(state, res);
					return res;
				};
				response = await this.#cacheHandler.handle(state, runPipeline);
			}
			this.#app.logThisRequest({
				pathname,
				method: request.method,
				statusCode: response.status,
				isRewrite: state.isRewriting,
				timeStart: state.timeStart
			});
		} catch (err) {
			this.#app.logger.error(null, err.stack || err.message || String(err));
			return this.#app.renderError(request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		} finally {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		}
		if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return this.#app.renderError(request, {
			...state.renderOptions,
			response,
			status: response.status,
			error: response.status === 500 ? null : void 0,
			pathname: state.pathname
		});
		prepareResponse(response, { addCookieHeader });
		this.#app.pipeline.logger.flush();
		return response;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#app;
	#handler;
	constructor(app) {
		this.#app = app ?? null;
		this.#handler = app ? new AstroHandler(app) : null;
	}
	/**
	* Fast path: called directly by `BaseApp.render()` with pre-resolved
	* options, avoiding the `Reflect.set/get` round-trip through the request.
	*/
	renderWithOptions(request, options) {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request, options);
		return this.#handler.handle(state);
	}
	fetch = (request) => {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request);
		if (!this.#handler) throw new Error("No fetch handler provided.");
		return this.#handler.handle(state);
	};
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/output-filename.js
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set(["/404", "/500"]);
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/errors/default-handler.js
var DefaultErrorHandler = class {
	#app;
	#astroMiddleware;
	#pagesHandler;
	constructor(app) {
		this.#app = app;
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
	}
	async renderError(request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
		const app = this.#app;
		const resolvedPathname = pathname ?? new FetchState(app.pipeline, request).pathname;
		const errorRouteData = matchRoute(getErrorRoutePath(resolvedPathname, status, app.manifestData.routes, app.manifest.i18n?.locales, app.manifest.trailingSlash === "always"), app.manifestData);
		const url = new URL(request.url);
		if (errorRouteData) {
			if (errorRouteData.prerender) {
				const allowedDomains = app.manifest.allowedDomains;
				const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
				const statusURL = new URL(`${app.baseWithoutTrailingSlash}${getOutputFilename(app.manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
				if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
					const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
						status,
						removeContentEncodingHeaders: true
					});
					prepareResponse(newResponse, resolvedRenderOptions);
					return newResponse;
				} catch {
					const response2 = mergeResponses(new Response(null, { status }), originalResponse);
					prepareResponse(response2, resolvedRenderOptions);
					return response2;
				}
			}
			const mod = await app.pipeline.getComponentByRoute(errorRouteData);
			const errorState = new FetchState(app.pipeline, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.routeData = errorRouteData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = mod;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			try {
				await provideSession(errorState);
				const newResponse = mergeResponses(await this.#astroMiddleware.handle(errorState, this.#pagesHandler.handle.bind(this.#pagesHandler)), originalResponse);
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				if (skipMiddleware === false) return this.renderError(request, {
					...resolvedRenderOptions,
					status,
					error,
					response: originalResponse,
					skipMiddleware: true,
					pathname: resolvedPathname
				});
			} finally {
				await errorState.finalizeAll();
			}
		}
		const response = mergeResponses(new Response(null, { status }), originalResponse);
		prepareResponse(response, resolvedRenderOptions);
		return response;
	}
};
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) if (!seen.has(name.toLowerCase())) newHeaders.append(name, value);
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) for (const cookieValue of newCookies.consume()) originalResponse.headers.append("set-cookie", cookieValue);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	manifestData;
	pipeline;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return this.pipeline.logger;
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true, ...args) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.pipeline = this.createPipeline(streaming, manifest, ...args);
		this.manifestData = this.pipeline.manifestData;
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler strategy used by this app. Override to
	* provide environment-specific behavior (dev overlay, build-time throws, etc.).
	*/
	createErrorHandler() {
		return new DefaultErrorHandler(this);
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		this.manifestData = newManifestData;
		this.pipeline.manifestData = newManifestData;
		this.pipeline.rebuildRouter();
	}
	removeBase(pathname) {
		pathname = collapseDuplicateLeadingSlashes(pathname);
		if (pathname.startsWith(this.manifest.base)) return pathname.slice(this.baseWithoutTrailingSlash.length + 1);
		return pathname;
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		const url = new URL(request.url);
		if (this.manifest.assets.has(url.pathname)) return void 0;
		let pathname = this.computePathnameFromDomain(request);
		if (!pathname) pathname = prependForwardSlash(this.removeBase(url.pathname));
		const routeData = this.pipeline.matchRoute(this.safeDecodeURI(pathname));
		if (!routeData) return void 0;
		if (allowPrerenderedRoutes) return routeData;
		if (routeData.prerender) {
			if (routeData.params.length > 0) return this.pipeline.matchAllRoutes(this.safeDecodeURI(pathname)).find((r) => !r.prerender);
			return;
		}
		return routeData;
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await this.pipeline.getLogger();
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = this.pipeline.matchRoute(this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) {
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.renderWithOptions(request, resolvedOptions);
		} else {
			setRenderOptions(request, resolvedOptions);
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = this.pipeline.usedFeatures;
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & PipelineFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & PipelineFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & PipelineFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & PipelineFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & PipelineFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & PipelineFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless you add it to your fetch.ts pipeline.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		if (!routeData.pattern.test(pathname)) {
			for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(pathname)) return 302;
		}
		const route = removeTrailingForwardSlash(routeData.route);
		const locales = this.manifest.i18n?.locales;
		if (isRoute404(route) || isLocalizedErrorRoute(route, 404, locales)) return 404;
		if (isRoute500(route) || isLocalizedErrorRoute(route, 500, locales)) return 500;
		return 200;
	}
	getManifest() {
		return this.pipeline.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/assets/utils/getAssetsPrefix.js
function getAssetsPrefix(fileExtension, assetsPrefix) {
	let prefix = "";
	if (!assetsPrefix) prefix = "";
	else if (typeof assetsPrefix === "string") prefix = assetsPrefix;
	else prefix = assetsPrefix[fileExtension.slice(1)] || assetsPrefix.fallback;
	return prefix;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/render/ssr-element.js
var URL_PARSE_BASE = "https://astro.build";
function splitAssetPath(path) {
	const parsed = new URL(path, URL_PARSE_BASE);
	return {
		pathname: !URL.canParse(path) && !path.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname,
		suffix: `${parsed.search}${parsed.hash}`
	};
}
function appendQueryParams(path, queryParams) {
	const queryString = queryParams.toString();
	if (!queryString) return path;
	const hashIndex = path.indexOf("#");
	const basePath = hashIndex === -1 ? path : path.slice(0, hashIndex);
	const hash = hashIndex === -1 ? "" : path.slice(hashIndex);
	return `${basePath}${basePath.includes("?") ? "&" : "?"}${queryString}${hash}`;
}
function createAssetLink(href, base, assetsPrefix, queryParams) {
	const { pathname, suffix } = splitAssetPath(href);
	let url = "";
	if (assetsPrefix) url = joinPaths(getAssetsPrefix(fileExtension(pathname), assetsPrefix), slash(pathname)) + suffix;
	else if (base) url = prependForwardSlash(joinPaths(base, slash(pathname))) + suffix;
	else url = href;
	if (queryParams) url = appendQueryParams(url, queryParams);
	return url;
}
function createStylesheetElement(stylesheet, base, assetsPrefix, queryParams) {
	if (stylesheet.type === "inline") return {
		props: {},
		children: stylesheet.content
	};
	else return {
		props: {
			rel: "stylesheet",
			href: createAssetLink(stylesheet.src, base, assetsPrefix, queryParams)
		},
		children: ""
	};
}
function createStylesheetElementSet(stylesheets, base, assetsPrefix, queryParams) {
	return new Set(stylesheets.map((s) => createStylesheetElement(s, base, assetsPrefix, queryParams)));
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@astrojs+mdx@7.0.3_@astrojs+markdown-satteri@0.3.4_astro@7.1.3_@astrojs+markdown-remark_86e0a26939ffcfbf5799df9157b0fcf4/node_modules/@astrojs/mdx/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
	if (typeof Component !== "function") return false;
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = value;
	}
	try {
		return (await Component({
			...props,
			...slots,
			children
		}))[AstroJSX];
	} catch (e) {
		throwEnhancedErrorIfMdxComponent(e, Component);
	}
	return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = value;
	}
	const { result } = this;
	try {
		let html = "";
		const destination = { write(chunk) {
			if (chunk instanceof Response) return;
			html += chunkToString(result, chunk);
		} };
		await renderStreaming(createVNode(Component, {
			...props,
			...slots,
			children
		}), result, destination);
		return { html };
	} catch (e) {
		throwEnhancedErrorIfMdxComponent(e, Component);
		throw e;
	}
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
	if (Component[/* @__PURE__ */ Symbol.for("mdx-component")]) {
		if (AstroUserError.is(error)) return;
		error.title = error.name;
		error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
		throw error;
	}
}
var server_default = {
	name: "astro:jsx",
	check,
	renderToStaticMarkup
};
//#endregion
//#region \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "@astrojs/react",
	"clientEntrypoint": "@astrojs/react/client.js",
	"serverEntrypoint": "@astrojs/react/server.js"
}, { ssr: server_default$1 }), Object.assign({
	"name": "astro:jsx",
	"serverEntrypoint": "file:///Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@astrojs+mdx@7.0.3_@astrojs+markdown-satteri@0.3.4_astro@7.1.3_@astrojs+markdown-remark_86e0a26939ffcfbf5799df9157b0fcf4/node_modules/@astrojs/mdx/dist/server.js"
}, { ssr: server_default })];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404\\/?$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/404.astro",
			"pathname": "/404",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Account/ForgotPassword",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Account\\/ForgotPassword\\/?$",
			"segments": [[{
				"content": "Account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "ForgotPassword",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Account/ForgotPassword.astro",
			"pathname": "/Account/ForgotPassword",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Account/ResetPassword",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Account\\/ResetPassword\\/?$",
			"segments": [[{
				"content": "Account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "ResetPassword",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Account/ResetPassword.astro",
			"pathname": "/Account/ResetPassword",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Account/SignIn",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Account\\/SignIn\\/?$",
			"segments": [[{
				"content": "Account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "SignIn",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Account/SignIn.astro",
			"pathname": "/Account/SignIn",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Account/SignUp",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Account\\/SignUp\\/?$",
			"segments": [[{
				"content": "Account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "SignUp",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Account/SignUp.astro",
			"pathname": "/Account/SignUp",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Account",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/Account\\/?$",
			"segments": [[{
				"content": "Account",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Account/index.astro",
			"pathname": "/Account",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Blog/[Slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Blog\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "Blog",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["Slug"],
			"component": "Source/pages/Blog/[Slug].astro",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Blog",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Blog\\/?$",
			"segments": [[{
				"content": "Blog",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Blog.astro",
			"pathname": "/Blog",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Amend",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Amend\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Amend",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Amend.astro",
			"pathname": "/Contact/Amend",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Claim",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Claim\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Claim",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Claim.astro",
			"pathname": "/Contact/Claim",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Deals",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Deals\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Deals",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Deals.astro",
			"pathname": "/Contact/Deals",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Erase",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Erase\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Erase",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Erase.astro",
			"pathname": "/Contact/Erase",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Guard",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Guard\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Guard",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Guard.astro",
			"pathname": "/Contact/Guard",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Hails",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Hails\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Hails",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Hails.astro",
			"pathname": "/Contact/Hails",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Leave",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Leave\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Leave",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Leave.astro",
			"pathname": "/Contact/Leave",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Legal",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Legal\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Legal",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Legal.astro",
			"pathname": "/Contact/Legal",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Lodge",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Lodge\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Lodge",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Lodge.astro",
			"pathname": "/Contact/Lodge",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Pause",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Pause\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Pause",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Pause.astro",
			"pathname": "/Contact/Pause",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Query",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Query\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Query",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Query.astro",
			"pathname": "/Contact/Query",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Reach",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Reach\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Reach",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Reach.astro",
			"pathname": "/Contact/Reach",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Sale",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Sale\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Sale",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Sale.astro",
			"pathname": "/Contact/Sale",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contact/Scout",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contact\\/Scout\\/?$",
			"segments": [[{
				"content": "Contact",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Scout",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contact/Scout.astro",
			"pathname": "/Contact/Scout",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Contributing",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Contributing\\/?$",
			"segments": [[{
				"content": "Contributing",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Contributing.astro",
			"pathname": "/Contributing",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Dashboard",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Dashboard\\/?$",
			"segments": [[{
				"content": "Dashboard",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Dashboard.astro",
			"pathname": "/Dashboard",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Doc/Rust",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Doc\\/Rust\\/?$",
			"segments": [[{
				"content": "Doc",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Rust",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Doc/Rust.astro",
			"pathname": "/Doc/Rust",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Doc",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Doc\\/?$",
			"segments": [[{
				"content": "Doc",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Doc.astro",
			"pathname": "/Doc",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Doc/[...Slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Doc(?:\\/(.*?))?\\/?$",
			"segments": [[{
				"content": "Doc",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...Slug",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...Slug"],
			"component": "Source/pages/Doc/[...Slug].astro",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Download",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Download\\/?$",
			"segments": [[{
				"content": "Download",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Download.astro",
			"pathname": "/Download",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Legal/Privacy",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Legal\\/Privacy\\/?$",
			"segments": [[{
				"content": "Legal",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Privacy",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Legal/Privacy.astro",
			"pathname": "/Legal/Privacy",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Legal/Term",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Legal\\/Term\\/?$",
			"segments": [[{
				"content": "Legal",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Term",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Legal/Term.astro",
			"pathname": "/Legal/Term",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/License",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/License\\/?$",
			"segments": [[{
				"content": "License",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/License.astro",
			"pathname": "/License",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/OAuth/Success",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/OAuth\\/Success\\/?$",
			"segments": [[{
				"content": "OAuth",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "Success",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/OAuth/Success.astro",
			"pathname": "/OAuth/Success",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/OpenGraph/[...Slug].svg",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/OpenGraph\\/(.*?)\\.svg$",
			"segments": [[{
				"content": "OpenGraph",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...Slug",
				"dynamic": true,
				"spread": true
			}, {
				"content": ".svg",
				"dynamic": false,
				"spread": false
			}]],
			"params": ["...Slug"],
			"component": "Source/pages/OpenGraph/[...Slug].svg.ts",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/OpenGraph.svg",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/OpenGraph\\.svg$",
			"segments": [[{
				"content": "OpenGraph.svg",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/OpenGraph.svg.ts",
			"pathname": "/OpenGraph.svg",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Portal",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Portal\\/?$",
			"segments": [[{
				"content": "Portal",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Portal.astro",
			"pathname": "/Portal",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Verify",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Verify\\/?$",
			"segments": [[{
				"content": "Verify",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Verify.astro",
			"pathname": "/Verify",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/Visit",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/Visit\\/?$",
			"segments": [[{
				"content": "Visit",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "Source/pages/Visit.astro",
			"pathname": "/Visit",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "Source/pages/index.astro",
			"pathname": "/",
			"prerender": true,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/404_DjoHEfNm.mjs");
var _page1 = () => import("./chunks/ForgotPassword_CwepuZg5.mjs");
var _page2 = () => import("./chunks/ResetPassword_M6GZzHQZ.mjs");
var _page3 = () => import("./chunks/SignIn_Bd7gJQO_.mjs");
var _page4 = () => import("./chunks/SignUp_C2WVuslX.mjs");
var _page5 = () => import("./chunks/index_DAMc6y26.mjs");
var _page6 = () => import("./chunks/_Slug__BzpgKldZ.mjs");
var _page7 = () => import("./chunks/Blog_C4dC7Nne.mjs");
var _page8 = () => import("./chunks/Amend_Dl_62vtM.mjs");
var _page9 = () => import("./chunks/Claim_BIh96QzM.mjs");
var _page10 = () => import("./chunks/Deals_7oY8i7Z8.mjs");
var _page11 = () => import("./chunks/Erase_gwa68cvw.mjs");
var _page12 = () => import("./chunks/Guard_BUMuBHXI.mjs");
var _page13 = () => import("./chunks/Hails_BU-WI3s0.mjs");
var _page14 = () => import("./chunks/Leave_s0aU1pqc.mjs");
var _page15 = () => import("./chunks/Legal_Di3sku_9.mjs");
var _page16 = () => import("./chunks/Lodge_D7E_-gxt.mjs");
var _page17 = () => import("./chunks/Pause_DGlv6V7h.mjs");
var _page18 = () => import("./chunks/Query_BucMzJ05.mjs");
var _page19 = () => import("./chunks/Reach_nwXOmenP.mjs");
var _page20 = () => import("./chunks/Sale_BTdVhMQn.mjs");
var _page21 = () => import("./chunks/Scout_Bl7Td_mc.mjs");
var _page22 = () => import("./chunks/Contributing_DnOQbuGd.mjs");
var _page23 = () => import("./chunks/Dashboard_HMOdKBo1.mjs");
var _page24 = () => import("./chunks/Rust_DX2UtuW3.mjs");
var _page25 = () => import("./chunks/Doc_BAI7Impe.mjs");
var _page26 = () => import("./chunks/_..__fRGjPS-.mjs");
var _page27 = () => import("./chunks/Download_69vbF_tH.mjs");
var _page28 = () => import("./chunks/Privacy_C580BqlS.mjs");
var _page29 = () => import("./chunks/Term_DAzMSZ1q.mjs");
var _page30 = () => import("./chunks/License_dzBMgG8-.mjs");
var _page31 = () => import("./chunks/Success_BTGuZOzY.mjs");
var _page32 = () => import("./chunks/_...Slug__B50BnPhy.mjs");
var _page33 = () => import("./chunks/OpenGraph_Dkc4HWmf.mjs");
var _page34 = () => import("./chunks/Portal_O28wyi6X.mjs");
var _page35 = () => import("./chunks/Verify_BbsrCOrl.mjs");
var _page36 = () => import("./chunks/Visit_DlBm3bqM.mjs");
var _page37 = () => import("./chunks/index_zLhVFqJ7.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["Source/pages/404.astro", _page0],
	["Source/pages/Account/ForgotPassword.astro", _page1],
	["Source/pages/Account/ResetPassword.astro", _page2],
	["Source/pages/Account/SignIn.astro", _page3],
	["Source/pages/Account/SignUp.astro", _page4],
	["Source/pages/Account/index.astro", _page5],
	["Source/pages/Blog/[Slug].astro", _page6],
	["Source/pages/Blog.astro", _page7],
	["Source/pages/Contact/Amend.astro", _page8],
	["Source/pages/Contact/Claim.astro", _page9],
	["Source/pages/Contact/Deals.astro", _page10],
	["Source/pages/Contact/Erase.astro", _page11],
	["Source/pages/Contact/Guard.astro", _page12],
	["Source/pages/Contact/Hails.astro", _page13],
	["Source/pages/Contact/Leave.astro", _page14],
	["Source/pages/Contact/Legal.astro", _page15],
	["Source/pages/Contact/Lodge.astro", _page16],
	["Source/pages/Contact/Pause.astro", _page17],
	["Source/pages/Contact/Query.astro", _page18],
	["Source/pages/Contact/Reach.astro", _page19],
	["Source/pages/Contact/Sale.astro", _page20],
	["Source/pages/Contact/Scout.astro", _page21],
	["Source/pages/Contributing.astro", _page22],
	["Source/pages/Dashboard.astro", _page23],
	["Source/pages/Doc/Rust.astro", _page24],
	["Source/pages/Doc.astro", _page25],
	["Source/pages/Doc/[...Slug].astro", _page26],
	["Source/pages/Download.astro", _page27],
	["Source/pages/Legal/Privacy.astro", _page28],
	["Source/pages/Legal/Term.astro", _page29],
	["Source/pages/License.astro", _page30],
	["Source/pages/OAuth/Success.astro", _page31],
	["Source/pages/OpenGraph/[...Slug].svg.ts", _page32],
	["Source/pages/OpenGraph.svg.ts", _page33],
	["Source/pages/Portal.astro", _page34],
	["Source/pages/Verify.astro", _page35],
	["Source/pages/Visit.astro", _page36],
	["Source/pages/index.astro", _page37]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/","cacheDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/node_modules/.astro/","outDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/","srcDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/","publicDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Public/","buildClientDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/client/","buildServerDir":"file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/server/","adapterName":"","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Account/ForgotPassword","isIndex":false,"type":"page","pattern":"^\\/Account\\/ForgotPassword\\/?$","segments":[[{"content":"Account","dynamic":false,"spread":false}],[{"content":"ForgotPassword","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Account/ForgotPassword.astro","pathname":"/Account/ForgotPassword","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Account/ResetPassword","isIndex":false,"type":"page","pattern":"^\\/Account\\/ResetPassword\\/?$","segments":[[{"content":"Account","dynamic":false,"spread":false}],[{"content":"ResetPassword","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Account/ResetPassword.astro","pathname":"/Account/ResetPassword","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Account/SignIn","isIndex":false,"type":"page","pattern":"^\\/Account\\/SignIn\\/?$","segments":[[{"content":"Account","dynamic":false,"spread":false}],[{"content":"SignIn","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Account/SignIn.astro","pathname":"/Account/SignIn","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Account/SignUp","isIndex":false,"type":"page","pattern":"^\\/Account\\/SignUp\\/?$","segments":[[{"content":"Account","dynamic":false,"spread":false}],[{"content":"SignUp","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Account/SignUp.astro","pathname":"/Account/SignUp","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Account","isIndex":true,"type":"page","pattern":"^\\/Account\\/?$","segments":[[{"content":"Account","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Account/index.astro","pathname":"/Account","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Blog/[Slug]","isIndex":false,"type":"page","pattern":"^\\/Blog\\/([^/]+?)\\/?$","segments":[[{"content":"Blog","dynamic":false,"spread":false}],[{"content":"Slug","dynamic":true,"spread":false}]],"params":["Slug"],"component":"Source/pages/Blog/[Slug].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Blog","isIndex":false,"type":"page","pattern":"^\\/Blog\\/?$","segments":[[{"content":"Blog","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Blog.astro","pathname":"/Blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Amend","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Amend\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Amend","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Amend.astro","pathname":"/Contact/Amend","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Claim","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Claim\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Claim","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Claim.astro","pathname":"/Contact/Claim","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Deals","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Deals\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Deals","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Deals.astro","pathname":"/Contact/Deals","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Erase","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Erase\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Erase","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Erase.astro","pathname":"/Contact/Erase","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Guard","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Guard\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Guard","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Guard.astro","pathname":"/Contact/Guard","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Hails","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Hails\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Hails","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Hails.astro","pathname":"/Contact/Hails","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Leave","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Leave\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Leave","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Leave.astro","pathname":"/Contact/Leave","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Legal","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Legal\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Legal","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Legal.astro","pathname":"/Contact/Legal","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Lodge","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Lodge\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Lodge","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Lodge.astro","pathname":"/Contact/Lodge","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Pause","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Pause\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Pause","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Pause.astro","pathname":"/Contact/Pause","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Query","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Query\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Query","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Query.astro","pathname":"/Contact/Query","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Reach","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Reach\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Reach","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Reach.astro","pathname":"/Contact/Reach","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Sale","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Sale\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Sale","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Sale.astro","pathname":"/Contact/Sale","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contact/Scout","isIndex":false,"type":"page","pattern":"^\\/Contact\\/Scout\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}],[{"content":"Scout","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contact/Scout.astro","pathname":"/Contact/Scout","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Contributing","isIndex":false,"type":"page","pattern":"^\\/Contributing\\/?$","segments":[[{"content":"Contributing","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Contributing.astro","pathname":"/Contributing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Dashboard","isIndex":false,"type":"page","pattern":"^\\/Dashboard\\/?$","segments":[[{"content":"Dashboard","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Dashboard.astro","pathname":"/Dashboard","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Doc/Rust","isIndex":false,"type":"page","pattern":"^\\/Doc\\/Rust\\/?$","segments":[[{"content":"Doc","dynamic":false,"spread":false}],[{"content":"Rust","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Doc/Rust.astro","pathname":"/Doc/Rust","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Doc","isIndex":false,"type":"page","pattern":"^\\/Doc\\/?$","segments":[[{"content":"Doc","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Doc.astro","pathname":"/Doc","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"inline","content":".mermaid-fb[data-astro-cid-uxa46hqi]{background:#f6f8fa;border-radius:6px;margin:1.5rem 0;overflow-x:auto;padding:1rem}.dark .mermaid-fb[data-astro-cid-uxa46hqi]{background:#1e1e1e}.mermaid-fb[data-astro-cid-uxa46hqi] svg[data-astro-cid-uxa46hqi]{height:auto;max-width:100%}.mermaid-fb-error[data-astro-cid-uxa46hqi]{color:#d1242f;font-family:monospace;font-size:.85em;padding:.5rem}\n"},{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Doc/[...Slug]","isIndex":false,"type":"page","pattern":"^\\/Doc(?:\\/(.*?))?\\/?$","segments":[[{"content":"Doc","dynamic":false,"spread":false}],[{"content":"...Slug","dynamic":true,"spread":true}]],"params":["...Slug"],"component":"Source/pages/Doc/[...Slug].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Download","isIndex":false,"type":"page","pattern":"^\\/Download\\/?$","segments":[[{"content":"Download","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Download.astro","pathname":"/Download","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Legal/Privacy","isIndex":false,"type":"page","pattern":"^\\/Legal\\/Privacy\\/?$","segments":[[{"content":"Legal","dynamic":false,"spread":false}],[{"content":"Privacy","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Legal/Privacy.astro","pathname":"/Legal/Privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Legal/Term","isIndex":false,"type":"page","pattern":"^\\/Legal\\/Term\\/?$","segments":[[{"content":"Legal","dynamic":false,"spread":false}],[{"content":"Term","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Legal/Term.astro","pathname":"/Legal/Term","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/License","isIndex":false,"type":"page","pattern":"^\\/License\\/?$","segments":[[{"content":"License","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/License.astro","pathname":"/License","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/OAuth/Success","isIndex":false,"type":"page","pattern":"^\\/OAuth\\/Success\\/?$","segments":[[{"content":"OAuth","dynamic":false,"spread":false}],[{"content":"Success","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/OAuth/Success.astro","pathname":"/OAuth/Success","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[],"routeData":{"route":"/OpenGraph/[...Slug].svg","isIndex":false,"type":"endpoint","pattern":"^\\/OpenGraph\\/(.*?)\\.svg$","segments":[[{"content":"OpenGraph","dynamic":false,"spread":false}],[{"content":"...Slug","dynamic":true,"spread":true},{"content":".svg","dynamic":false,"spread":false}]],"params":["...Slug"],"component":"Source/pages/OpenGraph/[...Slug].svg.ts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[],"routeData":{"route":"/OpenGraph.svg","isIndex":false,"type":"endpoint","pattern":"^\\/OpenGraph\\.svg$","segments":[[{"content":"OpenGraph.svg","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/OpenGraph.svg.ts","pathname":"/OpenGraph.svg","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Portal","isIndex":false,"type":"page","pattern":"^\\/Portal\\/?$","segments":[[{"content":"Portal","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Portal.astro","pathname":"/Portal","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/Verify","isIndex":false,"type":"page","pattern":"^\\/Verify\\/?$","segments":[[{"content":"Verify","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Verify.astro","pathname":"/Verify","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"inline","content":"body,html{background:#fff;margin:0;padding:0}\n"}],"routeData":{"route":"/Visit","isIndex":false,"type":"page","pattern":"^\\/Visit\\/?$","segments":[[{"content":"Visit","dynamic":false,"spread":false}]],"params":[],"component":"Source/pages/Visit.astro","pathname":"/Visit","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.L0oq0VJb.js"}],"styles":[{"type":"external","src":"_astro/Base.DMcQQQCY.css"},{"type":"inline","content":".Header{backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);background:color-mix(in srgb,var(--Background) 78%,transparent);border-bottom:1px solid var(--Border)}.Header .LogoBox{background-color:transparent}.HeaderLogo span{color:var(--Foreground)}.HeaderSubLink .HeaderLinkLabel{text-decoration:underline;text-decoration-color:var(--Border);text-underline-offset:2px;transition:text-decoration-color .15s ease}.HeaderSubLink:hover .HeaderLinkLabel{text-decoration-color:var(--Primary)}.NavDropdown{background:var(--Background);border-bottom:1px solid var(--Border)}.HeaderSubLink{position:relative;z-index:1}.HeaderSubLink:before{background:var(--Mute);content:\"\";inset:0;opacity:0;position:absolute;transition:opacity .12s ease;z-index:-1}.HeaderSubLink:hover:before{opacity:1}.HeaderSubLink:active:before{background:var(--Accent);opacity:.8}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"Source/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":false,"middlewareMode":"classic","site":"https://editor.land","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ForgotPassword.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/ResetPassword.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignIn.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Blog/[Slug].astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Amend.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Claim.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Deals.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Erase.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Guard.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Hails.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Leave.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Legal.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Lodge.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Pause.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Query.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Reach.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Sale.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Scout.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contributing.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/[...Slug].astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Privacy.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Term.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/License.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Portal.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro",{"propagation":"none","containsHead":true}],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.CTwfKHUK.mjs","\u0000virtual:astro:page:Source/pages/404@_@astro":"chunks/404_DjoHEfNm.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Account.json":"_astro/Account.C728AosG.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Account.json":"_astro/Account.fyZQCrSR.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Account.json":"_astro/Account.CTNd6tQO.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Account.json":"_astro/Account.u6sGFQx5.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Account.json":"_astro/Account.Xwr5xVO3.js","\u0000virtual:astro:page:Source/pages/Contact/Amend@_@astro":"chunks/Amend_Dl_62vtM.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Noise/Attention.ts":"_astro/Attention.Dm1ex0Hg.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Configuration/Auth.ts":"chunks/Auth_CyM7bDBq.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Blog.json":"_astro/Blog.CNAbDKfV.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Blog.json":"_astro/Blog.siYrppmo.js","\u0000virtual:astro:page:Source/pages/Blog@_@astro":"chunks/Blog_C4dC7Nne.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Blog.json":"_astro/Blog.BRUf3tci.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Blog.json":"_astro/Blog.FIg_TdQ_.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Blog.json":"_astro/Blog.DNAdmUb5.js","\u0000virtual:astro:page:Source/pages/Contact/Claim@_@astro":"chunks/Claim_BIh96QzM.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Common.json":"_astro/Common.CH8XAqgQ.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Common.json":"_astro/Common.m_ZYN8ug.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Common.json":"_astro/Common.DXZarQiU.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Common.json":"_astro/Common.CIy_2tfn.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Common.json":"_astro/Common.Bq33MV98.js","\u0000virtual:astro:page:Source/pages/Contributing@_@astro":"chunks/Contributing_DnOQbuGd.mjs","\u0000virtual:astro:page:Source/pages/Dashboard@_@astro":"chunks/Dashboard_HMOdKBo1.mjs","\u0000virtual:astro:page:Source/pages/Contact/Deals@_@astro":"chunks/Deals_7oY8i7Z8.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Doc.json":"_astro/Doc.DwCpJfYu.js","\u0000virtual:astro:page:Source/pages/Doc@_@astro":"chunks/Doc_BAI7Impe.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Doc.json":"_astro/Doc.Cpu1xNKw.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Doc.json":"_astro/Doc.DMV41Quk.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Doc.json":"_astro/Doc.LTZvLR0B.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Doc.json":"_astro/Doc.DDzEbCim.js","\u0000virtual:astro:page:Source/pages/Download@_@astro":"chunks/Download_69vbF_tH.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Download.json":"_astro/Download.CbVBisGd.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/API/Download.ts":"_astro/Download.BLN-lyFI.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Download.json":"_astro/Download.BC6RU38_.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Download.json":"_astro/Download.rQ6rxD1M.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Download.json":"_astro/Download.Dp2XUs28.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Download.json":"_astro/Download.dnCctNVd.js","\u0000virtual:astro:page:Source/pages/Contact/Erase@_@astro":"chunks/Erase_gwa68cvw.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Footer.json":"_astro/Footer.DoQNdewU.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Footer.json":"_astro/Footer.Cn-B2E1J.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Footer.json":"_astro/Footer.C-ygymXv.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Footer.json":"_astro/Footer.Ce5o_682.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Footer.json":"_astro/Footer.BwGZ2I3S.js","\u0000virtual:astro:page:Source/pages/Account/ForgotPassword@_@astro":"chunks/ForgotPassword_CwepuZg5.mjs","\u0000virtual:astro:page:Source/pages/Contact/Guard@_@astro":"chunks/Guard_BUMuBHXI.mjs","\u0000virtual:astro:page:Source/pages/Contact/Hails@_@astro":"chunks/Hails_BU-WI3s0.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Header.json":"_astro/Header.qXdGJLCs.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Header.json":"_astro/Header.Cr_MVpHX.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Header.json":"_astro/Header.DAjSut7h.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Header.json":"_astro/Header.BexAwDLi.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Header.json":"_astro/Header.BsbysgWK.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Home.json":"_astro/Home.C01443DG.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Home.json":"_astro/Home.DlhmltHJ.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Home.json":"_astro/Home.DpJ_RHLv.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Home.json":"_astro/Home.DkmaS674.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Home.json":"_astro/Home.y0B4J4--.js","\u0000virtual:astro:page:Source/pages/Contact/Leave@_@astro":"chunks/Leave_s0aU1pqc.mjs","\u0000virtual:astro:page:Source/pages/Contact/Legal@_@astro":"chunks/Legal_Di3sku_9.mjs","\u0000virtual:astro:page:Source/pages/License@_@astro":"chunks/License_dzBMgG8-.mjs","\u0000virtual:astro:page:Source/pages/Contact/Lodge@_@astro":"chunks/Lodge_D7E_-gxt.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Meta.json":"_astro/Meta.C-2wJEUz.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Meta.json":"_astro/Meta.DC153HPo.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Meta.json":"_astro/Meta.CIyzqOad.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Meta.json":"_astro/Meta.qtK_-r2P.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Meta.json":"_astro/Meta.BfeCHSnm.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Configuration/Noise.ts":"_astro/Noise.DUhVeS1G.js","\u0000virtual:astro:page:Source/pages/OpenGraph.svg@_@ts":"chunks/OpenGraph_Dkc4HWmf.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/OpenGraph.ts":"chunks/OpenGraph_F2BapDZi.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/OpenGraph/PageMetadata.ts":"chunks/PageMetadata_D7x3NTV-.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Noise/Parallax.ts":"_astro/Parallax.kJkkzSGY.js","\u0000virtual:astro:page:Source/pages/Contact/Pause@_@astro":"chunks/Pause_DGlv6V7h.mjs","\u0000virtual:astro:page:Source/pages/Portal@_@astro":"chunks/Portal_O28wyi6X.mjs","\u0000virtual:astro:page:Source/pages/Legal/Privacy@_@astro":"chunks/Privacy_C580BqlS.mjs","\u0000virtual:astro:page:Source/pages/Contact/Query@_@astro":"chunks/Query_BucMzJ05.mjs","\u0000virtual:astro:page:Source/pages/Contact/Reach@_@astro":"chunks/Reach_nwXOmenP.mjs","\u0000virtual:astro:page:Source/pages/Account/ResetPassword@_@astro":"chunks/ResetPassword_M6GZzHQZ.mjs","\u0000virtual:astro:page:Source/pages/Doc/Rust@_@astro":"chunks/Rust_DX2UtuW3.mjs","\u0000virtual:astro:page:Source/pages/Contact/Sale@_@astro":"chunks/Sale_BTdVhMQn.mjs","\u0000virtual:astro:page:Source/pages/Contact/Scout@_@astro":"chunks/Scout_Bl7Td_mc.mjs","\u0000virtual:astro:page:Source/pages/Account/SignIn@_@astro":"chunks/SignIn_Bd7gJQO_.mjs","\u0000virtual:astro:page:Source/pages/Account/SignUp@_@astro":"chunks/SignUp_C2WVuslX.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Noise/Staccato.ts":"_astro/Staccato.BMbtV9pf.js","\u0000virtual:astro:page:Source/pages/OAuth/Success@_@astro":"chunks/Success_BTGuZOzY.mjs","\u0000virtual:astro:page:Source/pages/Legal/Term@_@astro":"chunks/Term_DAzMSZ1q.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Noise/Turbulence.ts":"_astro/Turbulence.D31SJNK4.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Bg/Verify.json":"_astro/Verify.CNUDGAlF.js","\u0000virtual:astro:page:Source/pages/Verify@_@astro":"chunks/Verify_BbsrCOrl.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Es/Verify.json":"_astro/Verify.Dgy3aHL8.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/De/Verify.json":"_astro/Verify.CIl4YKBe.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/Fr/Verify.json":"_astro/Verify.CFsSCAFC.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/I18n/Locale/En/Verify.json":"_astro/Verify.BUL7axwh.js","\u0000virtual:astro:page:Source/pages/Visit@_@astro":"chunks/Visit_DlBm3bqM.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/WorkerClient.ts":"_astro/WorkerClient.CvRsU-sG.js","\u0000virtual:astro:page:Source/pages/OpenGraph/[...Slug].svg@_@ts":"chunks/_...Slug__B50BnPhy.mjs","\u0000virtual:astro:page:Source/pages/Doc/[...Slug]@_@astro":"chunks/_..__fRGjPS-.mjs","\u0000virtual:astro:page:Source/pages/Blog/[Slug]@_@astro":"chunks/_Slug__BzpgKldZ.mjs","\u0000astro:content":"chunks/_astro_content_Dw24iOTP.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B832pNVj.mjs","\u0000noop-middleware":"chunks/_noop-middleware_CQ50ikAJ.mjs","\u0000virtual:astro:get-image":"chunks/_virtual_astro_get-image_GT9PhmxT.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_C-PI1Pas.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/.astro/content-assets.mjs":"chunks/content-assets_DXqEyLLP.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/.astro/content-modules.mjs":"chunks/content-modules_I7QRxwaA.mjs","\u0000virtual:astro:page:Source/pages/Account/index@_@astro":"chunks/index_DAMc6y26.mjs","\u0000virtual:astro:page:Source/pages/index@_@astro":"chunks/index_zLhVFqJ7.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Cnb0YGN3.mjs","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@astrojs+react@6.0.1_@types+node@26.1.1_@types+react-dom@19.2.3_@types+react@19.2.17__@_d3cac6f44eb1377562055cce2f774d5a/node_modules/@astrojs/react/dist/vnode-children.js":"chunks/vnode-children_CCum6TIR.mjs","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro?astro&type=script&index=0&lang.ts":"_astro/404.astro_astro_type_script_index_0_lang.Br5WTdY6.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account.tsx":"_astro/Auth0Account.B99SeYUV.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0CallbackHandler.tsx":"_astro/Auth0CallbackHandler.p0o-kA3t.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro?astro&type=script&index=0&lang.ts":"_astro/Background.astro_astro_type_script_index_0_lang.C2ci7KkB.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=0&lang.ts":"_astro/Base.astro_astro_type_script_index_0_lang.ECVgzPwf.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=1&lang.ts":"_astro/Base.astro_astro_type_script_index_1_lang.BTfBupLo.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=2&lang.ts":"_astro/Base.astro_astro_type_script_index_2_lang.BmiQy9EC.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=3&lang.ts":"_astro/Base.astro_astro_type_script_index_3_lang.Br1P4TNj.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx":"_astro/DynamicAccountProfile.DK1_PJjP.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx":"_astro/DynamicAuthHeader.DCGAXDbh.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx":"_astro/DynamicContactForm.BxqLJaQI.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx":"_astro/DynamicDashboardUser._PCkNlpa.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx":"_astro/DynamicDocSidebar.CIHIW60t.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx":"_astro/DynamicLocalFirstScan.pHN1LL-l.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPortal.tsx":"_astro/DynamicPortal.Dk-Rncn5.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx":"_astro/DynamicPrivacyRequests.7xz-bfoB.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicRichText.tsx":"_astro/DynamicRichText.crQEGR0o.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx":"_astro/DynamicTransparency.D-AXd4W3.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx":"_astro/ErrorBoundary.9-GAMZJ1.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx":"_astro/Footer.BLi27kQ4.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx":"_astro/Header.QulUrcCK.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx":"_astro/HomePage.C4fEskPE.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/MermaidFallback.astro?astro&type=script&index=0&lang.ts":"_astro/MermaidFallback.astro_astro_type_script_index_0_lang.EX8HSACp.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro?astro&type=script&index=0&lang.ts":"_astro/Rust.astro_astro_type_script_index_0_lang.Cn7r4Mc-.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro?astro&type=script&index=0&lang.ts":"_astro/Success.astro_astro_type_script_index_0_lang.gWvMksVU.js","@astrojs/react/client.js":"_astro/client.DtfbB2B1.js","astro:scripts/page.js":"_astro/page.L0oq0VJb.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Route/Policy.ts":"_astro/Policy.XU9raM0x.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Route/Redirect.ts":"_astro/Redirect.DzjdGxw0.js","/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Function/Route/Register.ts":"_astro/Register.C5wl3xdS.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/abnfDiagram-VRR7QNED.mjs":"_astro/abnfDiagram-VRR7QNED.DPALYjLg.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/architecture-TIHT7OUA.mjs":"_astro/architecture-TIHT7OUA.BKcMtXuU.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/architectureDiagram-ZJ3FMSHR.mjs":"_astro/architectureDiagram-ZJ3FMSHR.DPaJua8l.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/blockDiagram-677ZJIJ3.mjs":"_astro/blockDiagram-677ZJIJ3.BvmmZSnw.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/c4Diagram-LMCZKHZV.mjs":"_astro/c4Diagram-LMCZKHZV.NOtSuujA.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/classDiagram-OUVF2IWQ.mjs":"_astro/classDiagram-OUVF2IWQ.CuBb9mff.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/classDiagram-v2-EOCWNBFH.mjs":"_astro/classDiagram-v2-EOCWNBFH.CuBb9mff.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/cose-bilkent-JH36ORCC.mjs":"_astro/cose-bilkent-JH36ORCC.jHTt822D.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/cynefin-VYW2F7L2.mjs":"_astro/cynefin-VYW2F7L2.BDCqcqHR.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/cynefinDiagram-TSTJHNR4.mjs":"_astro/cynefinDiagram-TSTJHNR4.4YBcLUsG.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/dagre-VKFMJZFB.mjs":"_astro/dagre-VKFMJZFB.BqBMMWEZ.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-FQU43EPY.mjs":"_astro/diagram-FQU43EPY.Dtdm6Vzm.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-G47NLZAW.mjs":"_astro/diagram-G47NLZAW.DCVRophg.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-NH7WQ7WH.mjs":"_astro/diagram-NH7WQ7WH.Uk7bI4GD.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-OA4YK3LP.mjs":"_astro/diagram-OA4YK3LP.DIKxYnXr.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/diagram-WEI45ONY.mjs":"_astro/diagram-WEI45ONY.CBkCa_8s.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/ebnfDiagram-CCIWWBDH.mjs":"_astro/ebnfDiagram-CCIWWBDH.BLHgx6Nx.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/erDiagram-Q63AITRT.mjs":"_astro/erDiagram-Q63AITRT.BzIANBhG.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/eventmodeling-45OFAUF4.mjs":"_astro/eventmodeling-45OFAUF4.DsKCt5-P.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/flowDiagram-23GEKE2U.mjs":"_astro/flowDiagram-23GEKE2U.Cltb6969.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/ganttDiagram-NO4QXBWP.mjs":"_astro/ganttDiagram-NO4QXBWP.tf4dd_Mb.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/gitGraph-TEB2WS4Q.mjs":"_astro/gitGraph-TEB2WS4Q.Dlk-n_3O.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/gitGraphDiagram-IHSO6WYX.mjs":"_astro/gitGraphDiagram-IHSO6WYX.CbGcaeOx.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/firebase@12.16.0/node_modules/firebase/app/dist/esm/index.esm.js":"_astro/index.esm.tJDTaxSo.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/info-DKCQHKI2.mjs":"_astro/info-DKCQHKI2.BsLLh9m4.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-FWYZ7A6U.mjs":"_astro/infoDiagram-FWYZ7A6U.BPnSW44W.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/ishikawaDiagram-FXEZZL3T.mjs":"_astro/ishikawaDiagram-FXEZZL3T.9AS-YYmA.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/journeyDiagram-5HDEW3XC.mjs":"_astro/journeyDiagram-5HDEW3XC._2gRDGwi.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/kanban-definition-HUTT4EX6.mjs":"_astro/kanban-definition-HUTT4EX6.TEkfvD4N.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/katex@0.16.47/node_modules/katex/dist/katex.mjs":"_astro/katex.B2dLhOqi.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/mindmap-definition-LN4V7U3C.mjs":"_astro/mindmap-definition-LN4V7U3C.CZsMLauG.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/packet-7NZHBO7P.mjs":"_astro/packet-7NZHBO7P.CnL8sCjR.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/pegDiagram-2B236MQR.mjs":"_astro/pegDiagram-2B236MQR.DGVLL8Gz.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/pie-RZYD4A2V.mjs":"_astro/pie-RZYD4A2V.hpFnIehl.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/pieDiagram-ENE6RG2P.mjs":"_astro/pieDiagram-ENE6RG2P.2q2nM6Iv.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/quadrantDiagram-ABIIQ3AL.mjs":"_astro/quadrantDiagram-ABIIQ3AL.BlcvkRHT.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/radar-I7S5WNFK.mjs":"_astro/radar-I7S5WNFK.kpT3t0dg.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/railroad-3IZDKUUU.mjs":"_astro/railroad-3IZDKUUU.B5P6_xOn.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/railroad-abnf-AHOZXSZD.mjs":"_astro/railroad-abnf-AHOZXSZD.DJgmBF4L.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/railroad-ebnf-EBAXGLYW.mjs":"_astro/railroad-ebnf-EBAXGLYW._Ca2v9Uj.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/railroad-peg-LSFZ7HO6.mjs":"_astro/railroad-peg-LSFZ7HO6.CZVzDyvQ.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/railroadDiagram-RFXS5EU6.mjs":"_astro/railroadDiagram-RFXS5EU6.BcMlPI7F.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/requirementDiagram-TGXJPOKE.mjs":"_astro/requirementDiagram-TGXJPOKE.DMcUpJIf.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/sankeyDiagram-HTMAVEWB.mjs":"_astro/sankeyDiagram-HTMAVEWB.C4WWocbK.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/sequenceDiagram-DBY2YBRQ.mjs":"_astro/sequenceDiagram-DBY2YBRQ.BOFfQ7QQ.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/simplex-noise@4.0.3/node_modules/simplex-noise/dist/esm/simplex-noise.js":"_astro/simplex-noise.Dq3WWTld.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/sizeCapture-X5ZJPWSS.mjs":"_astro/sizeCapture-X5ZJPWSS.D32Nu0bH.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-2N3HPSRC.mjs":"_astro/stateDiagram-2N3HPSRC.BZGJ5fDd.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-v2-6OUMAXLB.mjs":"_astro/stateDiagram-v2-6OUMAXLB.BzQCmdho.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/swimlanes-5IMT3BWC.mjs":"_astro/swimlanes-5IMT3BWC.B9qCrjKV.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/swimlanesDiagram-G3AALYLV.mjs":"_astro/swimlanesDiagram-G3AALYLV.DLLkyV3s.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/timeline-definition-FHXFAJF6.mjs":"_astro/timeline-definition-FHXFAJF6.C8hWAqW0.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/treeView-QDETBFTQ.mjs":"_astro/treeView-QDETBFTQ.B2V33tXz.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/treemap-6X3UGDF4.mjs":"_astro/treemap-6X3UGDF4.DxTRmD3R.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/vennDiagram-L72KCM5P.mjs":"_astro/vennDiagram-L72KCM5P.ztsDxhjv.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/@mermaid-js+parser@1.2.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/wardley-OPB4EBWU.mjs":"_astro/wardley-OPB4EBWU.g9aR7Ui-.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/wardleyDiagram-EHGQE667.mjs":"_astro/wardleyDiagram-EHGQE667.BlEbgUbr.js","/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/mermaid@11.16.0/node_modules/mermaid/dist/chunks/mermaid.core/xychartDiagram-FW5EYKEG.mjs":"_astro/xychartDiagram-FW5EYKEG.DAJM8WZx.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro?astro&type=script&index=0&lang.ts","(()=>{const o=document.querySelector(\"#Layout\");o&&o.classList.add(\"Load\")})();"],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=0&lang.ts","document.documentElement.classList.remove(\"no-js\"),document.documentElement.classList.add(\"js\");"],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro?astro&type=script&index=0&lang.ts","var r=document.querySelectorAll(\".RustDocTab\"),e=document.getElementById(\"RustDocFrame\");r.forEach(t=>{t.addEventListener(\"click\",()=>{const o=t.dataset.rustdocUrl,a=t.dataset.id;var c;o&&e&&(e.src=o,c=t,r.forEach(r=>{const e=r===c;r.setAttribute(\"aria-selected\",e?\"true\":\"false\"),r.className=\"RustDocTab border px-3 py-1 font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)] \"+(e?\"border-[var(--Primary)] bg-primary text-primary-fg\":\"border-[var(--Border)] bg-card text-muted-foreground hover:bg-secondary\")}),a&&history.replaceState(null,\"\",`#${a}`))})});var t=window.location.hash.slice(1);if(t){const e=Array.from(r).find(r=>r.dataset.id===t);e&&e.click()}"],["/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro?astro&type=script&index=0&lang.ts","!function(){const e=new URLSearchParams(window.location.search),t=e.get(\"token\"),r=e.get(\"code\"),o=e.get(\"error\");if(r&&!t)return;const a=document.getElementById(\"LoadingState\"),n=document.getElementById(\"SuccessState\"),s=document.getElementById(\"ErrorState\"),i=document.getElementById(\"ErrorMessage\");if(o||!t)return a&&a.classList.add(\"hidden\"),s&&s.classList.remove(\"hidden\"),void(i&&(i.textContent=\"invalid_state\"===o?\"Authentication session expired. Please try again.\":\"oauth_failed\"===o?\"OAuth provider returned an error. Please try again.\":\"No authentication token received.\"));try{document.cookie=`session=${t}; path=/; max-age=604800; SameSite=Strict`}catch{}localStorage.setItem(\"session_token\",t),a&&a.classList.add(\"hidden\"),n&&(n.classList.remove(\"hidden\"),n.classList.add(\"flex\")),new Promise(e=>{if(!navigator.serviceWorker?.controller)return void e();let r=\"\";try{const e=JSON.parse(atob(t.split(\".\")[1]??\"e30=\"));r=e.sub||e.user_id||\"\"}catch{}const o=setTimeout(e,5e3),a=t=>{\"Auth:Written\"===t.data?.Type&&(clearTimeout(o),navigator.serviceWorker.removeEventListener(\"message\",a),e())};navigator.serviceWorker.addEventListener(\"message\",a),navigator.serviceWorker.controller.postMessage({Type:\"Auth:Write\",Token:t,ExpiresAt:Date.now()+6048e5,UserId:r})}).then(()=>{window.location.href=\"/Dashboard\"})}();"]],"assets":["/_astro/Base.DMcQQQCY.css","/_astro/page.L0oq0VJb.js","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/404.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Account/ForgotPassword/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Account/ResetPassword/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Account/SignIn/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Account/SignUp/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Account/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Blog/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Amend/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Claim/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Deals/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Erase/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Guard/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Hails/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Leave/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Legal/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Lodge/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Pause/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Query/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Reach/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Sale/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contact/Scout/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Contributing/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Dashboard/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Doc/Rust/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Doc/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Download/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Legal/Privacy/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Legal/Term/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/License/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/OAuth/Success/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/OpenGraph.svg","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Portal/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Verify/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/Visit/index.html","/file:///Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Target/index.html"],"buildFormat":"directory","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"+KJbsg5YZBW7Y0xKrScqr8DzpCcjutenoDwxIruNPxE=","image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./chunks/_noop-middleware_CQ50ikAJ.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_C-PI1Pas.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/vite-plugin-pages/const.js
var VIRTUAL_PAGE_RESOLVED_MODULE_ID = "\0virtual:astro:page:";
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/vite-plugin-pages/util.js
var ASTRO_PAGE_EXTENSION_POST_PATTERN = "@_@";
function getVirtualModulePageName(virtualModulePrefix, path) {
	const extension = fileExtension(path);
	return virtualModulePrefix + (extension.startsWith(".") ? path.slice(0, -extension.length) + extension.replace(".", ASTRO_PAGE_EXTENSION_POST_PATTERN) : path);
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/vite-plugin-scripts/index.js
var SCRIPT_ID_PREFIX = `astro:scripts/`;
var BEFORE_HYDRATION_SCRIPT_ID = `${SCRIPT_ID_PREFIX}before-hydration.js`;
var PAGE_SCRIPT_ID = `${SCRIPT_ID_PREFIX}page.js`;
`${SCRIPT_ID_PREFIX}`;
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/build/plugins/util.js
var ASTRO_PAGE_KEY_SEPARATOR = "&";
function makePageDataKey(route, componentPath) {
	return route + ASTRO_PAGE_KEY_SEPARATOR + componentPath;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/build/runtime.js
function getPageData(internals, route, component) {
	let pageData = internals.pagesByKeys.get(makePageDataKey(route, component));
	if (pageData) return pageData;
}
function cssOrder(a, b) {
	let depthA = a.depth, depthB = b.depth, orderA = a.order, orderB = b.order;
	if (orderA === -1 && orderB >= 0) return 1;
	else if (orderB === -1 && orderA >= 0) return -1;
	else if (orderA > orderB) return 1;
	else if (orderA < orderB) return -1;
	else if (depthA === -1) return -1;
	else if (depthB === -1) return 1;
	else return depthA > depthB ? -1 : 1;
}
function mergeInlineCss(acc, current) {
	const lastAdded = acc.at(acc.length - 1);
	const lastWasInline = lastAdded?.type === "inline";
	const currentIsInline = current?.type === "inline";
	if (lastWasInline && currentIsInline) {
		const currentHasImport = current.content.includes("@import");
		const lastHasImport = lastAdded.content.includes("@import");
		if (!currentHasImport && !lastHasImport) {
			const merged = {
				type: "inline",
				content: lastAdded.content + current.content
			};
			acc[acc.length - 1] = merged;
			return acc;
		}
	}
	acc.push(current);
	return acc;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/build/pipeline.js
var BuildPipeline = class BuildPipeline extends Pipeline {
	internals;
	options;
	manifest;
	defaultRoutes;
	getName() {
		return "BuildPipeline";
	}
	/**
	* This cache is needed to map a single `RouteData` to its file path.
	* @private
	*/
	#routesByFilePath = /* @__PURE__ */ new WeakMap();
	getSettings() {
		if (!this.options) throw new Error("No options defined");
		return this.options.settings;
	}
	getOptions() {
		if (!this.options) throw new Error("No options defined");
		return this.options;
	}
	getInternals() {
		if (!this.internals) throw new Error("No internals defined");
		return this.internals;
	}
	constructor(manifest, defaultRoutes = createDefaultRoutes(manifest)) {
		const resolveCache = /* @__PURE__ */ new Map();
		async function resolve(specifier) {
			if (resolveCache.has(specifier)) return resolveCache.get(specifier);
			const hashedFilePath = manifest.entryModules[specifier];
			if (typeof hashedFilePath !== "string" || hashedFilePath === "") {
				if (specifier === BEFORE_HYDRATION_SCRIPT_ID) {
					resolveCache.set(specifier, "");
					return "";
				}
				throw new Error(`Cannot find the built path for ${specifier}`);
			}
			const assetLink = createAssetLink(hashedFilePath, manifest.base, manifest.assetsPrefix);
			resolveCache.set(specifier, assetLink);
			return assetLink;
		}
		const logger = createConsoleLogger({ level: manifest.logLevel });
		super(logger, manifest, "production", manifest.renderers, resolve, manifest.serverLike);
		this.manifest = manifest;
		this.defaultRoutes = defaultRoutes;
	}
	getRoutes() {
		return this.getOptions().routesList.routes;
	}
	static create({ manifest }) {
		return new BuildPipeline(manifest);
	}
	setInternals(internals) {
		this.internals = internals;
	}
	setOptions(options) {
		this.options = options;
	}
	headElements(routeData) {
		const { manifest: { assetsPrefix, base } } = this;
		const settings = this.getSettings();
		const internals = this.getInternals();
		const links = /* @__PURE__ */ new Set();
		const pageBuildData = getPageData(internals, routeData.route, routeData.component);
		const scripts = /* @__PURE__ */ new Set();
		const sortedCssAssets = pageBuildData?.styles.sort(cssOrder).map(({ sheet }) => sheet).reduce(mergeInlineCss, []);
		const styles = createStylesheetElementSet(sortedCssAssets ?? [], base, assetsPrefix);
		if (settings.scripts.some((script) => script.stage === "page")) {
			const hashedFilePath = internals.entrySpecifierToBundleMap.get(PAGE_SCRIPT_ID);
			if (typeof hashedFilePath !== "string") throw new Error(`Cannot find the built path for ${PAGE_SCRIPT_ID}`);
			const src = createAssetLink(hashedFilePath, base, assetsPrefix);
			scripts.add({
				props: {
					type: "module",
					src
				},
				children: ""
			});
		}
		for (const script of settings.scripts) if (script.stage === "head-inline") scripts.add({
			props: {},
			children: script.content
		});
		return {
			scripts,
			styles,
			links
		};
	}
	componentMetadata() {}
	/**
	* It collects the routes to generate during the build.
	* It returns a map of page information and their relative entry point as a string.
	*/
	retrieveRoutesToGenerate() {
		const pages = /* @__PURE__ */ new Set();
		const defaultRouteComponents = new Set(this.defaultRoutes.map((route) => route.component));
		for (const { routeData } of this.manifest.routes) {
			if (routeIsRedirect(routeData)) {
				pages.add(routeData);
				continue;
			}
			if (routeIsFallback(routeData) && i18nHasFallback(this.manifest)) {
				pages.add(routeData);
				continue;
			}
			if (defaultRouteComponents.has(routeData.component)) continue;
			pages.add(routeData);
			const moduleSpecifier = getVirtualModulePageName(VIRTUAL_PAGE_RESOLVED_MODULE_ID, routeData.component);
			const filePath = this.internals?.entrySpecifierToBundleMap.get(moduleSpecifier);
			if (filePath) this.#routesByFilePath.set(routeData, filePath);
		}
		return pages;
	}
	async getComponentByRoute(routeData) {
		return (await this.getModuleForRoute(routeData)).page();
	}
	async getModuleForRoute(route) {
		for (const defaultRoute of this.defaultRoutes) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
		let routeToProcess = route;
		if (routeIsRedirect(route)) if (route.redirectRoute) routeToProcess = route.redirectRoute;
		else return RedirectSinglePageBuiltModule;
		else if (routeIsFallback(route)) routeToProcess = getFallbackRoute(route, this.manifest.routes);
		if (this.manifest.pageMap) {
			const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
			if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
			return await importComponentInstance();
		} else if (this.manifest.pageModule) return this.manifest.pageModule;
		throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
	}
	async tryRewrite(payload, request) {
		const { routeData, pathname, newUrl } = findRouteToRewrite({
			payload,
			request,
			routes: this.manifest.routes.map((routeInfo) => routeInfo.routeData),
			trailingSlash: this.manifest.trailingSlash,
			buildFormat: this.manifest.buildFormat,
			base: this.manifest.base,
			outDir: this.manifest.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
		});
		return {
			routeData,
			componentInstance: await this.getComponentByRoute(routeData),
			newUrl,
			pathname
		};
	}
};
function i18nHasFallback(manifest) {
	if (manifest.i18n && manifest.i18n.fallback) return Object.keys(manifest.i18n.fallback).length > 0;
	return false;
}
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/errors/build-handler.js
var BuildErrorHandler = class {
	#default;
	constructor(app) {
		this.#default = new DefaultErrorHandler(app);
	}
	async renderError(request, options) {
		if (options.status === 500) {
			if (options.response) return options.response;
			throw options.error;
		}
		return this.#default.renderError(request, {
			...options,
			prerenderedErrorPageFetch: void 0
		});
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/core/build/app.js
var BuildApp = class extends BaseApp {
	createPipeline(_streaming, manifest, ..._args) {
		return BuildPipeline.create({ manifest });
	}
	isDev() {
		return true;
	}
	setInternals(internals) {
		this.pipeline.setInternals(internals);
	}
	setOptions(options) {
		this.pipeline.setOptions(options);
		this.logger.setDestination(options.logger.options.destination);
		this.resetAdapterLogger();
	}
	getOptions() {
		return this.pipeline.getOptions();
	}
	getSettings() {
		return this.pipeline.getSettings();
	}
	createErrorHandler() {
		return new BuildErrorHandler(this);
	}
	logRequest(_options) {}
};
//#endregion
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/entrypoints/prerender.js
var app = new BuildApp(manifest);
//#endregion
export { app, manifest };
