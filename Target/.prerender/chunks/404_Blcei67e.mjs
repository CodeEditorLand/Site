import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$RecordFigure } from "./RecordFigure_B1B-tJH-.mjs";
import { t as $$RecordHero } from "./RecordHero_CG7tGgqQ.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellPlate } from "./ShellPlate_CgGj6t1n.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { i as NotFoundOnwardCopy, r as NotFoundOnward } from "./Page_Cfrn8iZS.mjs";
// Source/Content/Layout/NotFound.ts
/** Resolve the route's copy through the page's translator. */
var NotFoundPage = (T) => ({
	plate: {
		figure: T("layout.notFound.figure", { defaultValue: "THE PATH THAT WAS ASKED FOR" }),
		source: T("layout.notFound.source", { defaultValue: "REQUEST URL" }),
		state: "UNAVAILABLE",
		proposition: T("layout.notFound.proposition", { defaultValue: "No record is filed at this address, and no redirect covers it." }),
		mark: "◎",
		note: T("layout.notFound.note", { defaultValue: "REQUESTED PATH" })
	},
	missing: {
		statement: T("layout.notFound.missing.statement", { defaultValue: "A record was requested at this address. The build emits no route here; the redirect table carries no entry for it." }),
		cause: T("layout.notFound.missing.cause", { defaultValue: "The address is well formed; nothing was ever filed under it. A moved page would have left a redirect, a renamed one a tombstone." }),
		next: {
			label: T("layout.notFound.missing.next", { defaultValue: "OPEN THE INDEX" }),
			href: "/Contents"
		}
	},
	tooLong: {
		statement: T("layout.notFound.tooLong.statement", { defaultValue: "The requested path is longer than the plate prints on one line." }),
		cause: T("layout.notFound.tooLong.cause", { defaultValue: "The plate wraps it and stays inside its field, so nothing is lost - only the line count changes." }),
		limit: T("layout.notFound.tooLong.limit", { defaultValue: "ONE LINE AT THE L TIER" }),
		next: {
			label: T("layout.notFound.tooLong.next", { defaultValue: "BACK TO LAND" }),
			href: "/"
		}
	}
});
// Source/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$404;
	const T = GetI18n();
	const MetaTitle = T("common.error.404", { defaultValue: "404: No Record At This Address" });
	const MetaDescription = T("common.error.pageNotFound", { defaultValue: "No record is filed at this address, and no redirect covers it. The address is well formed; nothing was ever filed under it.\n\n/Contents lists every route the build emits, so a link that used to work can be found there by name.\n\nIf a page of this site sent you here, /Contact takes the report and the path you came from." });
	const RequestedPath = Astro.url.pathname;
	const IsLongPath = RequestedPath.length > 64;
	const Copy = NotFoundPage(T);
	const Record = {
		index: "ROUTE_404",
		claim: "NOT FOUND",
		route: `/TRACE:${RequestedPath}`,
		status: {
			state: "interrupted",
			tone: "ink"
		},
		seal: "Land",
		metadata: [{
			key: "SIGNAL:",
			value: "ABSENT"
		}, {
			key: "ROUTE:",
			value: "UNRESOLVED"
		}],
		relation: "LAND:",
		proposition: "RETURN TO INDEX",
		action: {
			label: "BACK TO LAND",
			href: "/",
			variant: "button"
		}
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"noIndex": true
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# PLATE_01",
			"label": "THE MISSING RECORD"
		}, {
			"default": ($$result) => renderTemplate`  ${renderComponent($$result, "ShellPlate", $$ShellPlate, {
				"index": "01",
				"figure": Copy.plate.figure,
				"source": Copy.plate.source,
				"state": Copy.plate.state,
				"proposition": Copy.plate.proposition,
				"trace": {
					mark: Copy.plate.mark,
					value: RequestedPath,
					note: Copy.plate.note
				},
				"bleed": "viewport",
				"height": "clamp(15rem, 32vh, 24rem)"
			})} ${IsLongPath ? renderTemplate`${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "too-long",
				"index": "TRACE / 01",
				"value": RequestedPath,
				"limit": Copy.tooLong.limit,
				"statement": Copy.tooLong.statement,
				"cause": Copy.tooLong.cause,
				"next": Copy.tooLong.next,
				"note": `CHARACTERS: ${RequestedPath.length}\u2001LIMIT: ${Copy.tooLong.limit}`
			})}` : null}${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "missing",
				"index": "RECORD / 01",
				"statement": Copy.missing.statement,
				"cause": Copy.missing.cause,
				"next": Copy.missing.next,
				"rows": [
					{
						key: "WAS:",
						value: RequestedPath,
						code: true
					},
					{
						key: "TARGET:",
						value: "UNRESOLVED"
					},
					{
						key: "SIGNAL:",
						value: "ABSENT"
					}
				],
				"note": "SOURCE: REQUEST URL FILED: NEVER"
			})} ${renderComponent($$result, "Onward", $$Onward, {
				"rows": NotFoundOnward,
				"copy": NotFoundOnwardCopy
			})} `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "RecordHero", $$RecordHero, {
				...Record,
				"slot": "head"
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordFigure", $$RecordFigure, {
				"src": "/Evidence/Land/NightGlass-01.png",
				"alt": "Rain-speckled glass reflecting a green light at night",
				"caption": "A 404 has no evidence of its own, so the record prints the site's plate.",
				"provenance": "/EVIDENCE/LAND/NIGHTGLASS-01.PNG"
			})} ` })}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/404.astro";
var $$url = "/404";
// \0virtual:astro:page:Source/pages/404@_@astro
var page = () => _404_exports;
export { page };
