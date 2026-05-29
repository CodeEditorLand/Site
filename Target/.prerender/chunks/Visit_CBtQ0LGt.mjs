import { c as createComponent } from './astro-component_BZQgjcIA.mjs';
import 'piccolore';
import { B as renderTemplate, r as defineScriptVars, y as renderHead, v as maybeRenderHead } from './prerender_tA-vfw3g.mjs';
import 'clsx';
import { C as CanonicalPath, G as GeneratePathVariant, S as SemanticAlias } from './Map_ATi1yrkS.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Visit = createComponent(($$result, $$props, $$slots) => {
  const VariantMap = {};
  for (const PascalPath of CanonicalPath) {
    const BuiltPath = PascalPath.toLowerCase();
    VariantMap[BuiltPath] = PascalPath;
    for (const Variant of GeneratePathVariant(PascalPath, BuiltPath)) {
      if (!VariantMap[Variant]) {
        VariantMap[Variant] = PascalPath;
      }
    }
  }
  for (const [Alias, Target] of Object.entries(SemanticAlias)) {
    VariantMap[Alias] = Target;
  }
  const CanonicalList = [...CanonicalPath];
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-ynoge262> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Redirecting…</title><meta name="robots" content="noindex,nofollow"><!-- Instant redirect: if JS is disabled, fall back to home after 3s -->', '<noscript><meta http-equiv="refresh" content="3;url=/"></noscript>', "</head> <body data-astro-cid-ynoge262> <script crossorigin=\"anonymous\">(function(){", `
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
		})();<\/script> </body> </html>`], ['<html lang="en" data-astro-cid-ynoge262> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Redirecting…</title><meta name="robots" content="noindex,nofollow"><!-- Instant redirect: if JS is disabled, fall back to home after 3s -->', '<noscript><meta http-equiv="refresh" content="3;url=/"></noscript>', "</head> <body data-astro-cid-ynoge262> <script crossorigin=\"anonymous\">(function(){", `
			(function () {
				// ── Read the original path ──────────────────────────────────
				// CF Pages' 200 rewrite preserves the original URL in the
				// browser, so window.location reflects the user's intended path.
				var RawPath = window.location.pathname;
				var Search = window.location.search;
				var Hash = window.location.hash;

				// Normalise: strip trailing slash, lowercase
				var Cleaned =
					RawPath === "/" ? "/" : RawPath.replace(/\\\\/+$/, "");

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
		})();<\/script> </body> </html>`])), maybeRenderHead(), renderHead(), defineScriptVars({ VariantMap, CanonicalList }));
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Visit.astro";
const $$url = "/Visit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Visit,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
