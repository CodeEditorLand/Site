import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$DocArticle } from "./DocArticle_C120auSM.mjs";
import { t as $$RustViewer } from "./RustViewer_aUVrBbc-.mjs";
import { St as Header, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellPanes } from "./ShellPanes_By4EddmM.mjs";
import { t as $$ShellRail } from "./ShellRail_OrhIFjE9.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as BuildDocStrip } from "./BuildDocStrip_CxvQ5LLQ.mjs";
import { t as LinkMentions } from "./CodeMentions_B67lao4t.mjs";
// Source/Component/Doc/Rust/Data.ts
/** The nine rustdoc sites, in tab order. */
var RustCrates = [
	{
		Id: "Mountain",
		Label: "Mountain",
		Url: "https://Rust.Documentation.Mountain.editor.land",
		Description: "Native Rust/Tauri backend: window management, file system, process lifecycle, gRPC server"
	},
	{
		Id: "Common",
		Label: "Common",
		Url: "https://Rust.Documentation.Common.editor.land",
		Description: "Shared traits, DTOs, configuration helpers, and cross-element contracts"
	},
	{
		Id: "Echo",
		Label: "Echo",
		Url: "https://Rust.Documentation.Echo.editor.land",
		Description: "Lock-free work-stealing scheduler built on crossbeam-deque"
	},
	{
		Id: "Air",
		Label: "Air",
		Url: "https://Rust.Documentation.Air.editor.land",
		Description: "Background services for updates, downloads, integrity checks, authentication, and indexing"
	},
	{
		Id: "SideCar",
		Label: "SideCar",
		Url: "https://Rust.Documentation.SideCar.editor.land",
		Description: "Node.js binary distribution compiled per target triple"
	},
	{
		Id: "Mist",
		Label: "Mist",
		Url: "https://Rust.Documentation.Mist.editor.land",
		Description: "Embedded DNS resolver for local-first hostname resolution"
	},
	{
		Id: "Rest",
		Label: "Rest",
		Url: "https://Rust.Documentation.Rest.editor.land",
		Description: "OXC-based TypeScript transform work for the output pipeline"
	},
	{
		Id: "Maintain",
		Label: "Maintain",
		Url: "https://Rust.Documentation.Maintain.editor.land",
		Description: "Build orchestrator, configuration, and release profile tooling"
	},
	{
		Id: "Land",
		Label: "Land",
		Url: "https://Rust.Documentation.Land.editor.land",
		Description: "Top-level workspace that ties the Rust element crates together"
	}
];
// Source/Content/Layout/Rust.ts
/** Resolve the surface's copy through the page's translator. */
var RustWorkspace = (T) => ({
	railLabel: T("layout.rust.rail", { defaultValue: "CRATES" }),
	railFoot: {
		label: T("layout.rust.railFoot", { defaultValue: "THE MANUAL" }),
		href: "/Doc"
	},
	panes: {
		index: {
			mark: "# REGISTER_01",
			label: T("layout.rust.pane.index", { defaultValue: "REGISTER" })
		},
		frame: {
			mark: "# FRAME_01",
			label: T("layout.rust.pane.frame", { defaultValue: "FRAME" })
		}
	},
	drawer: {
		label: T("layout.rust.drawer.label", { defaultValue: "WHAT THE FRAME IS" }),
		note: T("layout.rust.drawer.note", { defaultValue: "FOLDED" }),
		statement: T("layout.rust.drawer.statement", { defaultValue: "The frame is generated rustdoc output, served from each crate's own documentation host and framed here unchanged. It is not a summary this site wrote, and not styled by this site." }),
		source: T("layout.rust.drawer.source", { defaultValue: "SOURCE: COMPONENT/DOC/RUST/DATA.TS" })
	},
	partial: {
		statement: T("layout.rust.partial.statement", { defaultValue: "The frame carries no as-of date: the rustdoc build does not record when it was generated, so the page cannot say how current it is." }),
		cause: T("layout.rust.partial.cause", { defaultValue: "AS OF is UNAVAILABLE rather than today's date. A date the page invented would be the one figure on this surface with no source." }),
		next: {
			label: T("layout.rust.partial.next", { defaultValue: "READ THE CRATE SOURCE" }),
			href: "https://github.com/CodeEditorLand"
		}
	},
	empty: {
		statement: T("layout.rust.empty.statement", { defaultValue: "A crate with no published rustdoc site prints a tombstone in the register rather than a link." }),
		cause: T("layout.rust.empty.cause", { defaultValue: "◎ TARGET GONE, with the crate's name and the host it would have had. A dead link is not a record; the tombstone is." }),
		next: {
			label: T("layout.rust.empty.next", { defaultValue: "OPEN THE MANUAL" }),
			href: "/Doc"
		}
	}
});
// Source/pages/Doc/Rust.astro
var Rust_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Rust,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Rust = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Rust;
	const T = GetI18n();
	const MetaTitle = T("meta.docs.rust.title", { defaultValue: "Rust API Documentation | Code Editor Land" });
	const MetaDescription = T("meta.docs.rust.description", { defaultValue: "Browse the generated Rust API documentation for Land's core crates." });
	const Heading = T("rust.heading", {
		ns: "doc",
		defaultValue: "Rust API Documentation"
	});
	const Standfirst = "Generated <code>rustdoc</code> output for Land's Rust crates. Select a crate below, or open directly in a new tab.";
	const Home = T("common.breadcrumb.home", { defaultValue: "Home" });
	const Documentation = T("common.docs.pageTitle", { defaultValue: "Documentation" });
	const Crumb = T("rust.crumb", {
		ns: "doc",
		defaultValue: "Rust API"
	});
	const PageStrip = BuildDocStrip({
		Layer: Crumb,
		Source: "RUSTDOC",
		Extras: [{
			Label: T("strip.crates", {
				ns: "doc",
				defaultValue: "CRATES:"
			}),
			Value: String(RustCrates.length)
		}]
	}, T);
	const Surface = RustWorkspace(T);
	const CrateRail = RustCrates.map((Crate, Position) => ({
		mark: String(Position + 1).padStart(2, "0"),
		label: Crate.Label.toUpperCase(),
		meta: "↗",
		href: Crate.Url
	}));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# WORKSPACE_05",
			"label": "THE RUST API"
		}, {
			"default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="doc-rust"> ${renderComponent($$result, "DocArticle", $$DocArticle, {
				"title": Heading,
				"standfirstHtml": LinkMentions(Standfirst),
				"strip": PageStrip,
				"crumbs": [
					{
						label: Home,
						href: "/"
					},
					{
						label: Documentation,
						href: "/Doc"
					},
					{ label: Crumb }
				],
				"measure": false
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "ShellPanes", $$ShellPanes, {
				"layout": "stack",
				"class": "doc-rust__instrument",
				"primary": {
					mark: Surface.panes.index.mark,
					label: Surface.panes.index.label,
					meta: `${RustCrates.length}\u2001HOSTS`
				},
				"secondary": {
					mark: Surface.panes.frame.mark,
					label: Surface.panes.frame.label,
					meta: "RUSTDOC"
				},
				"drawer": {
					label: Surface.drawer.label,
					note: Surface.drawer.note
				}
			}, {
				"primary": ($$result) => renderTemplate`<div> <ul class="doc-crates"> ${RustCrates.map((Crate) => renderTemplate`<li class="doc-crates__item"> <a class="doc-crate"${addAttribute(Crate.Url, "href")} target="_blank" rel="noopener noreferrer"> <span class="doc-crate__label"> ${Crate.Label} </span> <span class="doc-crate__arrow" aria-hidden="true">
↗
</span> <span class="doc-crate__note"> ${Crate.Description} </span> </a> </li>`)} </ul> </div>`,
				"secondary": ($$result) => renderTemplate`<div> ${renderComponent($$result, "RustViewer", $$RustViewer, {
					"crates": RustCrates,
					"label": T("rust.viewer.label", {
						ns: "doc",
						defaultValue: "Rust crate group"
					}),
					"title": T("rust.viewer.title", {
						ns: "doc",
						defaultValue: "Rust API Documentation"
					})
				})} </div>`,
				"drawer": ($$result) => renderTemplate`<div> <p class="doc-rust__contract"> ${Surface.drawer.statement} </p> <p class="doc-rust__contract-source"> ${Surface.drawer.source} </p> <div class="PageShell__row" style="--row-tracks:2"> ${renderComponent($$result, "ShellState", $$ShellState, {
					"kind": "partial",
					"index": "GAP / 01",
					"statement": Surface.partial.statement,
					"cause": Surface.partial.cause,
					"next": Surface.partial.next,
					"rows": [
						{
							key: "SOURCE:",
							value: "RUSTDOC"
						},
						{
							key: "AS OF:",
							value: "UNAVAILABLE"
						},
						{
							key: "CRATES:",
							value: String(RustCrates.length)
						}
					],
					"note": "SOURCE: THE BUILD RECORDS NO RUSTDOC DATE"
				})} ${renderComponent($$result, "ShellState", $$ShellState, {
					"kind": "empty",
					"index": "GAP / 02",
					"statement": Surface.empty.statement,
					"cause": Surface.empty.cause,
					"next": Surface.empty.next,
					"note": "SOURCE: REGISTER POLICY"
				})} </div> </div>`
			})} <p class="doc-rust__back"> <a href="/Doc"> ${Documentation} ${" "} <span aria-hidden="true">←</span> </a> </p> ` })} </div> `,
			"rail": ($$result) => renderTemplate`${renderComponent($$result, "ShellRail", $$ShellRail, {
				"slot": "rail",
				"label": Surface.railLabel,
				"count": RustCrates.length,
				"items": CrateRail,
				"current": "page",
				"foot": Surface.railFoot
			})}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:idle": { timeout: 2e3 },
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "idle",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc/Rust.astro";
var $$url = "/Doc/Rust";
// \0virtual:astro:page:Source/pages/Doc/Rust@_@astro
var page = () => Rust_exports;
export { page };
