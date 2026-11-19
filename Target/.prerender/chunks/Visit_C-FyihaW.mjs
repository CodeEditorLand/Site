import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { D as defineScriptVars, E as addAttribute, x as renderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { i as SemanticAlias, r as GeneratePathVariant, t as CanonicalPath } from "./Map_ChnMuG2V.mjs";
/** The tombstone, as data. */
var VisitTombstone = {
	index: "# VISIT / 00",
	route: "/UNRESOLVED",
	state: "UNAVAILABLE",
	statement: "No record is filed at this address. The site answers every unresolved path here and sends the reader on.",
	cause: "The address is well formed; the build emits no route for it and the redirect table carries no entry. A moved page would have left a redirect, and a renamed one a tombstone.",
	next: {
		label: "OPEN THE INDEX",
		href: "/Contents"
	},
	back: {
		label: "BACK TO LAND",
		href: "/"
	},
	note: `SOURCE: _REDIRECTS EVERY PATH WITHOUT A STATIC FILE IS SERVED THIS PAGE`,
	rows: [
		{
			key: "WAS:",
			value: "THE PATH IN THE ADDRESS BAR"
		},
		{
			key: "TARGET:",
			value: "UNRESOLVED"
		},
		{
			key: "SIGNAL:",
			value: "ABSENT"
		}
	]
};
// Source/pages/Visit.astro
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
	return renderTemplate`<html lang="en" data-astro-cid-t4lllsio> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Resolving This Address</title><meta name="robots" content="noindex,nofollow"><!-- Instant redirect: if JS is disabled, fall back to home after 3s --><noscript><meta http-equiv="refresh" content="3;url=/"></noscript>${renderHead($$result)}</head> <body data-astro-cid-t4lllsio>  <noscript> <div class="visit-record" data-astro-cid-t4lllsio> <p class="visit-record__head" data-astro-cid-t4lllsio> <span data-astro-cid-t4lllsio>${VisitTombstone.index}</span> <span class="visit-record__route" data-astro-cid-t4lllsio> ${VisitTombstone.route} </span> </p> <p class="visit-record__state" data-astro-cid-t4lllsio> <span aria-hidden="true" data-astro-cid-t4lllsio>◎</span> ${" "}STATUS:${" "} ${VisitTombstone.state} </p> <dl class="visit-record__rows" data-astro-cid-t4lllsio> <div data-astro-cid-t4lllsio> <dt data-astro-cid-t4lllsio>WOULD BE HERE:</dt> <dd data-astro-cid-t4lllsio>${VisitTombstone.statement}</dd> </div> <div data-astro-cid-t4lllsio> <dt data-astro-cid-t4lllsio>WHY NOT:</dt> <dd data-astro-cid-t4lllsio>${VisitTombstone.cause}</dd> </div> ${VisitTombstone.rows.map((Row) => renderTemplate`<div data-astro-cid-t4lllsio> <dt data-astro-cid-t4lllsio>${Row.key}</dt> <dd data-astro-cid-t4lllsio>${Row.value}</dd> </div>`)} <div data-astro-cid-t4lllsio> <dt data-astro-cid-t4lllsio>NEXT:</dt> <dd data-astro-cid-t4lllsio> <a${addAttribute(VisitTombstone.next.href, "href")} data-astro-cid-t4lllsio> ${VisitTombstone.next.label} ${" "} <span aria-hidden="true" data-astro-cid-t4lllsio>&rarr;</span> </a> </dd> </div> </dl> <p class="visit-record__note" data-astro-cid-t4lllsio>${VisitTombstone.note}</p> <p class="visit-record__back" data-astro-cid-t4lllsio> <a${addAttribute(VisitTombstone.back.href, "href")} data-astro-cid-t4lllsio> ${VisitTombstone.back.label} ${" "} <span aria-hidden="true" data-astro-cid-t4lllsio>&rarr;</span> </a> </p> </div> </noscript> <script crossorigin=\"anonymous\">(function(){${defineScriptVars({
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
		})();<\/script> </body> </html>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro";
var $$url = "/Visit";
// \0virtual:astro:page:Source/pages/Visit@_@astro
var page = () => Visit_exports;
export { page };
