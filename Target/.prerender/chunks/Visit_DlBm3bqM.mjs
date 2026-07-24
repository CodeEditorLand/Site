import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { m as renderTemplate, x as defineScriptVars, y as renderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { i as SemanticAlias, n as GeneratePathVariant, t as CanonicalPath } from "./Map_Bsl_SrZK.mjs";
//#region Source/pages/Visit.astro
var Visit_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Visit,
	file: () => $$file,
	url: () => $$url
});
var $$Visit = createComponent(($$result, $$props, $$slots) => {
	const VariantMap = {};
	for (const PascalPath of CanonicalPath) {
		const BuiltPath = PascalPath.toLowerCase();
		VariantMap[BuiltPath] = PascalPath;
		for (const Variant of GeneratePathVariant(PascalPath, BuiltPath)) if (!VariantMap[Variant]) VariantMap[Variant] = PascalPath;
	}
	for (const [Alias, Target] of Object.entries(SemanticAlias)) VariantMap[Alias] = Target;
	const CanonicalList = [...CanonicalPath];
	return renderTemplate`<html lang="en" data-astro-cid-t4lllsio> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Redirecting…</title><meta name="robots" content="noindex,nofollow"><!-- Instant redirect: if JS is disabled, fall back to home after 3s --><noscript><meta http-equiv="refresh" content="3;url=/"></noscript>${renderHead($$result)}</head> <body data-astro-cid-t4lllsio> <script crossorigin=\"anonymous\">(function(){${defineScriptVars({
		VariantMap,
		CanonicalList
	})}
			(function () {
				// ── Read the original path ──────────────────────────────────
				// CF Pages' 200 rewrite preserves the original URL in the
				// browser, so window.location reflects the user's intended path.
				var RawPath = window.location.pathname;
				var Search = window.location.search;
				var Hash = window.location.hash;

				// Normalise: strip trailing slash, lowercase
				var Cleaned =
					RawPath === "/" ? "/" : RawPath.replace(/\\/+$/, "");

				var Lower = Cleaned.toLowerCase();

				// ── If we are literally ON /Visit with no other path ────────
				// (direct navigation or unknown path with no alias) → home
				if (
					Cleaned === "/Visit" ||
					Cleaned === "/visit" ||
					Cleaned === "/"
				) {
					window.location.replace("/" + Search + Hash);
					return;
				}

				// ── Already a known canonical - serve it directly ───────────
				// (shouldn't normally reach here when SW is active, but handle
				// the edge case where CF serves this page for a canonical path)
				if (CanonicalList.indexOf(Cleaned) !== -1) {
					window.location.replace(Cleaned + Search + Hash);
					return;
				}

				// ── Exact lowercase match ───────────────────────────────────
				var Canonical = VariantMap[Lower] || VariantMap[Cleaned];

				// ── Strip hyphens/underscores and retry ─────────────────────
				if (!Canonical) {
					var Stripped = Lower.replace(/[-_]/g, "");
					Canonical = VariantMap[Stripped];
				}

				// ── Strip trailing 's' (plural → singular) and retry ────────
				if (!Canonical && Lower.length > 2 && Lower.endsWith("s")) {
					Canonical = VariantMap[Lower.slice(0, -1)];
				}

				// ── Redirect or fall back to home ───────────────────────────
				if (Canonical) {
					// Preserve query string and hash from original navigation
					window.location.replace(Canonical + Search + Hash);
				} else {
					// Truly unknown path - send to home
					window.location.replace("/" + Search + Hash);
				}
			})();
		})();<\/script></body> </html>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro";
var $$url = "/Visit";
//#endregion
//#region \0virtual:astro:page:Source/pages/Visit@_@astro
var page = () => Visit_exports;
//#endregion
export { page };
