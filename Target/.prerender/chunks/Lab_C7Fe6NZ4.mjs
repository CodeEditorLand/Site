// Source/Function/Configuration/Lab.mjs
/**
* Lab - the one switch that decides whether this build carries the site's
* exploratory surfaces.
*
* ─── WHAT A LAB ROUTE IS ──────────────────────────────────────────────────
* `/Specimen` prints the document's own parts at 1:1 so that the owner and the
* agents can compose from primitives. It is a tool, not a chapter: a reader who
* arrives from a search engine finds a printer's sheet about the site instead of
* the site. So it is served in development and absent from production.
*
* ─── WHY ONE MODULE ───────────────────────────────────────────────────────
* Four things have to agree about that, and each one is a chance to leak the
* page if it decides for itself:
*
*   - `Function/Route/Registry.ts` - the route set every derived table reads
*     (the canonical check, the redirect table, the variant generation);
*   - `Function/Route/LabOutput.mjs` - the removal that deletes the emitted
*     directory, called by `Function/Route/Lab.ts` in `astro:build:done` and by
*     `Maintain/Script/RemoveLabRoutes.mjs` from the command line;
*   - `astro.config.ts` - the sitemap filter, which decides from the pages Astro
*     reports rather than from the output directory;
*   - every data module that can print an address or count one
*     (`Content/Index/Page.ts`, `Content/Index/Rhythm.ts`,
*     `Component/Shell/Language.ts`, `Library/Index/Register.ts`,
*     `Component/UI/Palette/Data.ts`).
*
* They all import `Lab`, `LabRoute` and `Served` from here, so a lab route is
* declared once and removed everywhere by the same predicate. A second list, or
* a second expression reading the environment, would be a second thing to keep
* in step.
*
* ─── HOW IT IS DECIDED ────────────────────────────────────────────────────
* Development keeps the lab; a build does not. `NODE_ENV` is the same signal
* `Configuration/On.ts` already reads for the dev toolbar and compression, and
* `import.meta.env` is Vite's own answer inside a bundled module - either one
* saying "development" is enough. The asymmetry is deliberate: guessing wrong
* towards "show the lab" puts a tool in a preview, and guessing wrong towards
* "hide it" takes away the surface the owner composes on.
*
* `LAB=1` / `LAB=0` overrides the default in either direction. That is how a
* production build of the lab is made on purpose (`LAB=1 dum build`), and how a
* development server can be told to behave like the reader's site.
*
* This file is plain ESM, not TypeScript, on purpose: `Maintain/Script/` runs it
* under Node with no bundler, and the site imports it through Vite. A `.ts`
* module would be readable by only one of the two.
*/
/** The environment, when this module is running under Node. */
var Environment = typeof process === "undefined" ? void 0 : process.env;
/**
* Vite's answer, when this module is being read through a bundler.
*
* The cast is a JSDoc annotation only - the expression it wraps is
* `import.meta.env` verbatim, which is what Vite replaces with the environment
* object. Writing it out and not through an alias is the whole point: the
* replacement is textual.
*/
var Bundled = Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"PUBLIC_ANALYTICS_KEY": "",
	"PUBLIC_ANALYTICS_WORKER_URL": "http://localhost:8789",
	"PUBLIC_AUTH0_CLIENT_ID": "sTv8kJI2TQPpCJjCbSvbRWKc3Lrx1TeF",
	"PUBLIC_AUTH0_DOMAIN": "dev-o5qwc17ra258xn81.eu.auth0.com",
	"PUBLIC_AUTH_WORKER_URL": "http://localhost:8787",
	"PUBLIC_DOWNLOAD_WORKER_URL": "http://localhost:8788",
	"PUBLIC_FRONTEND_URL": "http://localhost:9999",
	"PUBLIC_STATUS_WORKER_URL": "http://localhost:8790",
	"SITE": "https://editor.land",
	"SSR": true
}, {
	_: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/node_modules/.bin/astro",
	NODE_ENV: "production"
});
/** The words an operator may write in `LAB`, and what each set means. */
var Affirmative = /* @__PURE__ */ new Set([
	"1",
	"true",
	"on",
	"yes"
]);
var Negative = /* @__PURE__ */ new Set([
	"0",
	"false",
	"off",
	"no"
]);
/** What the operator asked for, if anything. */
var Override = Environment?.["LAB"]?.trim().toLowerCase();
/** The mode this module is being read in: `development` or `production`. */
var Mode = Environment?.["NODE_ENV"] ?? Bundled?.MODE;
/**
* Whether this build carries the lab.
*
* `true` in development, and in any build where `LAB` says so; `false` in a
* production build, which is the only state a reader ever sees.
*
* @type {boolean}
*/
var Lab = Override !== void 0 && Affirmative.has(Override) ? true : Override !== void 0 && Negative.has(Override) ? false : Mode === "development" || Bundled?.DEV === true;
/**
* The routes that are lab surfaces: served in development, removed from the
* production build.
*
* A route listed here is also the entry marked `Lab: true` in
* `Function/Route/Registry.ts`, and that registry compares the two at module load:
* a path in one list and not the other fails the build naming itself, so the list
* and the flag cannot drift into "the build removes a page the site still links".
*
* @type {readonly string[]}
*/
var LabRoute = Object.freeze([
	"/Specimen",
	"/Specimen/States",
	"/Specimen/Reference"
]);
/**
* The lab routes as a set of lower-cased paths.
*
* A route is written `/Specimen` and printed `/SPECIMEN`; a path's case is the
* redirect layer's business, not this predicate's, so the comparison folds it.
*
* @type {ReadonlySet<string>}
*/
var LabPath = new Set(LabRoute.map((Path) => Path.toLowerCase()));
/**
* Whether a path is a lab surface.
*
* @param {string} Path
* @returns {boolean}
*/
var IsLabRoute = (Path) => LabPath.has(Path.replace(/\/+$/, "").toLowerCase());
/**
* Whether this build serves a path: every route but a lab one, plus the lab ones
* when the lab is on.
*
* This is the predicate a link site asks - "may this address be printed in this
* build?" - and it is the same answer `Lab` gives the registry, one route at a
* time.
*
* @param {string} Path
* @returns {boolean}
*/
var Served = (Path) => Lab || !IsLabRoute(Path);
export { Served as i, Lab as n, LabRoute as r, IsLabRoute as t };
