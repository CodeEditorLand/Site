import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as getCollection } from "./_astro_content_DQt8W2iZ.mjs";
import { i as $$DocAppendix, r as $$DocCard, t as $$DocIndex } from "./DocIndex_3eGGoT5L.mjs";
import { t as $$DocArticle } from "./DocArticle_C120auSM.mjs";
import { t as $$DocLayout } from "./DocLayout_C6NlBbeh.mjs";
import { Q as Slugify, St as Header, X as BuildDocSidebar, Z as SectionOrder, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$RecordArchive } from "./RecordArchive_CZrMiIzl.mjs";
import { t as BuildDocStrip } from "./BuildDocStrip_CxvQ5LLQ.mjs";
// Source/Function/Doc/BuildDocIndex.ts
/** The one card constructor: every list below is built through it. */
var Row = (Id, Label, Href, Note, Blank) => ({
	Id,
	Label,
	Href,
	...Note ? { Note } : {},
	...Blank ? { Blank } : {}
});
/**
* One card per page, in the order the collection already put them.
*
* The card's label is the page's `title`, NOT its `navTitle`. The baseline made
* that distinction: the rail printed the short `navTitle` ("Sky", "Overview")
* because a rail is a list of destinations, and the index printed the full
* `title` ("Sky: UI Component Layer", "Filesystem Footprint") because a card is
* a thing a reader chooses between. Using `navTitle` here would silently rename
* every card whose two names differ.
*/
var ToCards = (Entries) => Entries.map((Entry) => Row(Entry.id, Entry.data.title, `/Doc/${Entry.id}`, Entry.data.description));
/** The fifteen elements, as the architecture panel's badge strip. */
var Element = [
	"Mountain",
	"Cocoon",
	"Wind",
	"Sky",
	"Air",
	"Echo",
	"Common",
	"Vine",
	"Mist",
	"Rest",
	"Output",
	"Grove",
	"Worker",
	"SideCar",
	"Maintain"
];
/**
* The three ways in, above the sections. Each card's title is its `h2`, because
* these three are not filed under a section - they are the masthead.
*/
var BuildFeatures = (T) => [
	Row("start-readme", T("common.docs.gettingStarted.title", { defaultValue: "Get Started in Minutes" }), "https://github.com/CodeEditorLand/Land#readme", T("common.docs.gettingStarted.description", { defaultValue: "The README walks you through installation, first build, and the fifteen-element architecture. No prior Rust or Tauri knowledge required." }), true),
	Row("start-issues", T("common.docs.issueTracker.title", { defaultValue: "Report a Bug or Request a Feature" }), "https://github.com/CodeEditorLand/Land/issues", T("common.docs.issueTracker.description", { defaultValue: "Open an issue on GitHub. The team monitors daily and labels good-first-issue tasks for new contributors." }), true),
	Row("start-rust", T("common.docs.rustApi.title", { defaultValue: "Rust API Reference" }), "/Doc/Rust", T("common.docs.rustApi.description", { defaultValue: "Browse generated rustdoc output for Mountain, Echo, Air, and 7 more Rust crates." }))
];
/**
* The closing artifacts: the architecture summary, the backend workers and the
* live deployments. Every row below existed on the page before this module did
* - the hrefs, labels and descriptions are the page's own, moved into data.
*/
var BuildAppendices = (T) => {
	const Workers = [
		{
			Id: "worker-auth",
			Label: "Auth",
			Href: "https://codeeditorland-auth.playform.workers.dev",
			Note: T("common.docs.workers.auth", { defaultValue: "OAuth 2.0, JWT session tokens, and Auth0 integration" })
		},
		{
			Id: "worker-download",
			Label: "Download",
			Href: "https://codeeditorland-download.playform.workers.dev",
			Note: T("common.docs.workers.download", { defaultValue: "Binary distribution, release metadata, and update checks" })
		},
		{
			Id: "worker-status",
			Label: "Status",
			Href: "https://codeeditorland-status.playform.workers.dev",
			Note: T("common.docs.workers.status", { defaultValue: "Health checks and uptime monitoring" })
		},
		{
			Id: "worker-analytics",
			Label: "Analytics",
			Href: "https://codeeditorland-analytics.playform.workers.dev",
			Note: T("common.docs.workers.analytics", { defaultValue: "Privacy-first usage telemetry routed through Cloudflare Analytics Engine" })
		}
	].map((Worker) => Row(Worker.Id, Worker.Label, Worker.Href, Worker.Note, true));
	const Deployment = [
		{
			Id: "deployment-website",
			Label: T("common.docs.deployments.website", { defaultValue: "editor.land" }),
			Href: "/",
			Note: T("common.docs.deployments.website.description", { defaultValue: "Marketing website (Cloudflare Pages)" }),
			Blank: true
		},
		{
			Id: "deployment-status",
			Label: T("common.docs.deployments.status", { defaultValue: "Status" }),
			Href: "https://Status.editor.land",
			Note: T("common.docs.deployments.status.description", { defaultValue: "Uptime dashboard (Cloudflare Pages)" }),
			Blank: true
		},
		{
			Id: "deployment-rust-mountain",
			Label: T("common.docs.deployments.rustMountain", { defaultValue: "Rust API: Mountain" }),
			Href: "https://Rust.Documentation.Mountain.editor.land",
			Note: T("common.docs.deployments.rustMountain.description", { defaultValue: "rustdoc for Mountain, Echo, Common, Air, SideCar" }),
			Blank: true
		},
		{
			Id: "deployment-rust-rest",
			Label: T("common.docs.deployments.rustRest", { defaultValue: "Rust API: Rest" }),
			Href: "https://Rust.Documentation.Rest.editor.land",
			Note: T("common.docs.deployments.rustRest.description", { defaultValue: "rustdoc for OXC-powered TypeScript compiler" }),
			Blank: true
		},
		{
			Id: "deployment-rust-maintain",
			Label: T("common.docs.deployments.rustMaintain", { defaultValue: "Rust API: Maintain" }),
			Href: "https://Rust.Documentation.Maintain.editor.land",
			Note: T("common.docs.deployments.rustMaintain.description", { defaultValue: "rustdoc for build orchestrator" }),
			Blank: true
		},
		{
			Id: "deployment-rust-common",
			Label: T("common.docs.deployments.rustCommon", { defaultValue: "Rust API: Common" }),
			Href: "https://Rust.Documentation.Common.editor.land",
			Note: T("common.docs.deployments.rustCommon.description", { defaultValue: "rustdoc for abstract traits and DTOs" }),
			Blank: true
		},
		{
			Id: "deployment-rust-echo",
			Label: T("common.docs.deployments.rustEcho", { defaultValue: "Rust API: Echo" }),
			Href: "https://Rust.Documentation.Echo.editor.land",
			Note: T("common.docs.deployments.rustEcho.description", { defaultValue: "rustdoc for work-stealing scheduler" }),
			Blank: true
		},
		{
			Id: "deployment-rust-air",
			Label: T("common.docs.deployments.rustAir", { defaultValue: "Rust API: Air" }),
			Href: "https://Rust.Documentation.Air.editor.land",
			Note: T("common.docs.deployments.rustAir.description", { defaultValue: "rustdoc for background daemon" }),
			Blank: true
		},
		{
			Id: "deployment-rust-sidecar",
			Label: T("common.docs.deployments.rustSideCar", { defaultValue: "Rust API: SideCar" }),
			Href: "https://Rust.Documentation.SideCar.editor.land",
			Note: T("common.docs.deployments.rustSideCar.description", { defaultValue: "rustdoc for Node.js binary distribution" }),
			Blank: true
		},
		{
			Id: "deployment-rust-land",
			Label: T("common.docs.deployments.rustLand", { defaultValue: "Rust API: Land (Workspace)" }),
			Href: "https://Rust.Documentation.Land.editor.land",
			Note: T("common.docs.deployments.rustLand.description", { defaultValue: "rustdoc for the top-level workspace" }),
			Blank: true
		},
		{
			Id: "deployment-knowledge",
			Label: T("common.docs.deployments.knowledge", { defaultValue: "Knowledge Base" }),
			Href: "https://Knowledge.editor.land",
			Note: T("common.docs.deployments.knowledge.description", { defaultValue: "Architecture knowledge graph (Cloudflare Pages)" }),
			Blank: true
		},
		{
			Id: "deployment-rust-interactive",
			Label: T("common.docs.deployments.rustInteractive", { defaultValue: "Rust API (Interactive)" }),
			Href: "/Doc/Rust",
			Note: T("common.docs.deployments.rustInteractive.description", { defaultValue: "Browse all rustdoc sites with embedded iframes" })
		}
	].map((Entry) => Row(Entry.Id, Entry.Label, Entry.Href, Entry.Note, Entry.Blank ?? false));
	return [
		{
			Id: "architecture",
			Heading: T("common.docs.architecture.heading", { defaultValue: "How Land Replaces VS Code's Electron Stack" }),
			Lede: T("common.docs.architecture.intro", { defaultValue: "VS Code runs on Electron: a Chromium browser, a Node.js runtime, and an extension-host model. Land replaces those pieces with independent elements while preserving the VS Code extension API as the compatibility target. Browse individual elements in the Element section above, or explore the workspace on GitHub." }),
			Kind: "architecture",
			Index: Element.map((Name) => ({
				label: Name,
				href: `/Doc/${Name.toLowerCase()}`
			})),
			Rows: [Row("architecture-repositories", T("common.docs.repositories.viewAll", { defaultValue: "View all repositories" }), "https://github.com/CodeEditorLand", void 0, true)]
		},
		{
			Id: "backend",
			Heading: T("common.docs.workers.heading", { defaultValue: "Backend Services" }),
			Lede: T("common.docs.workers.intro", { defaultValue: "Four Cloudflare Workers power the Land backend infrastructure:" }),
			Kind: "backend",
			Rows: Workers
		},
		{
			Id: "deployments",
			Heading: T("common.docs.deployments.heading", { defaultValue: "Live Deployments" }),
			Lede: T("common.docs.deployments.intro", { defaultValue: "Public website and documentation surfaces are deployed separately from the local editor runtime:" }),
			Kind: "deployments",
			Rows: Deployment
		}
	];
};
/**
* The closing archive: one row per section, in the order the grid prints them.
*
* The marker column carries the section's size and the title is the section's
* name, so the row reads `12␁PAGES   Elements` and jumps to the grid it counts.
* The header's count is composed from the same array - `10 SECTIONS` - so the
* number at the far end can never disagree with the ten rows under it; the
* block would derive the length on its own, and the word is what makes a bare
* `10` mean something.
*
* U+2001 is the only separator in a compact label string, so the count and the
* marker use it and never a centre dot.
*/
var BuildArchive = (Sections, T) => {
	const Pages = T("archive.pages", { defaultValue: "PAGES" });
	const SectionsWord = T("archive.sections", { defaultValue: "SECTIONS" });
	return {
		index: "ARCHIVE_01",
		heading: T("archive.heading", { defaultValue: "Documentation archive" }),
		count: `${Sections.length}\u2001${SectionsWord}`,
		entries: Sections.map((Section) => ({
			title: Section.Heading,
			href: `#${Section.Id}`,
			marker: `${Section.Rows.length}\u2001${Pages}`
		}))
	};
};
/**
* The whole index: the three ways in, the ten sections in `SectionOrder`, then
* the three closing artifacts and the archive that maps them.
*
* A section that no entry declares is dropped rather than rendered empty -
* `Telemetry` is in `SectionOrder` but the four telemetry pages carry
* `section: Development`, so its section must not appear as a heading with no
* cards under it.
*/
var BuildDocIndex = (Entries, T) => {
	const BySection = /* @__PURE__ */ new Map();
	for (const Entry of Entries) {
		const Section = Entry.data.section ?? "Other";
		if (!BySection.has(Section)) BySection.set(Section, []);
		BySection.get(Section).push(Entry);
	}
	const Sections = SectionOrder.filter((Section) => BySection.has(Section)).map((Section) => ({
		Id: Slugify(Section),
		Heading: Section,
		Rows: ToCards(BySection.get(Section))
	}));
	return {
		Features: BuildFeatures(T),
		Sections,
		Appendices: BuildAppendices(T),
		Archive: BuildArchive(Sections, T)
	};
};
// Source/pages/Doc.astro
var Doc_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Doc,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Doc = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Doc;
	const T = GetI18n();
	const DocEntries = (await getCollection("doc")).sort((A, B) => A.data.order - B.data.order);
	const SidebarSections = BuildDocSidebar(DocEntries);
	const Index = BuildDocIndex(DocEntries, T);
	const PageTitle = T("common.docs.pageTitle", { defaultValue: "Documentation" });
	const IndexStrip = BuildDocStrip({
		Layer: PageTitle,
		Source: "DOC COLLECTION",
		Extras: [{
			Label: T("strip.pages", {
				ns: "doc",
				defaultValue: "PAGES:"
			}),
			Value: String(DocEntries.length)
		}, {
			Label: T("strip.sections", {
				ns: "doc",
				defaultValue: "SECTIONS:"
			}),
			Value: String(Index.Sections.length)
		}]
	}, T);
	const MetaTitle = T("meta.docs.title", { defaultValue: "Documentation | Code Editor Land" });
	const MetaDescription = T("meta.docs.description", { defaultValue: "Browse the Code Editor Land documentation, architecture guides, and developer resources." });
	const PageStandfirst = T("common.docs.pageSubtitle", { defaultValue: `${DocEntries.length} pages in ${Index.Sections.length} sections, from /START to the deep dives. Each page names the file it describes; the strip above it prints the layer, the order and the count.` });
	const Contents = {
		Label: T("article.toc", {
			ns: "doc",
			defaultValue: "On this page"
		}),
		Items: [...Index.Sections.map((Section) => ({
			Label: Section.Heading,
			Href: `#${Section.Id}`
		})), ...Index.Appendices.map((Appendix) => ({
			Label: Appendix.Heading,
			Href: `#${Appendix.Id}`
		}))]
	};
	const Home = T("common.breadcrumb.home", { defaultValue: "Home" });
	const BackToTop = T("common.button.backToTop", { defaultValue: "Back to top" });
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "DocLayout", $$DocLayout, {
			"sections": SidebarSections,
			"mobile": false,
			"contents": Contents
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "DocArticle", $$DocArticle, {
			"title": PageTitle,
			"standfirst": PageStandfirst,
			"strip": IndexStrip,
			"contents": Contents,
			"crumbs": [{
				label: Home,
				href: "/"
			}, { label: PageTitle }],
			"measure": false
		}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<ul class="doc-features"> ${Index.Features.map((Card) => renderTemplate`${renderComponent($$result, "DocCard", $$DocCard, {
			"card": Card,
			"level": 2
		})}`)} </ul> ${Index.Sections.map((Section) => renderTemplate`${renderComponent($$result, "DocIndex", $$DocIndex, { "section": Section })}`)}${Index.Appendices.map((Appendix) => renderTemplate`${renderComponent($$result, "DocAppendix", $$DocAppendix, { "appendix": Appendix })}`)}<div class="doc-archive"> ${renderComponent($$result, "RecordArchive", $$RecordArchive, {
			"entries": Index.Archive.entries,
			"index": Index.Archive.index,
			"heading": Index.Archive.heading,
			"count": Index.Archive.count
		})} </div> <p class="doc-index__back"> <a href="#top"> ${BackToTop} <span aria-hidden="true"> ↑</span> </a> </p> ` })} ` })} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:idle": { timeout: 2e3 },
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "idle",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Doc.astro";
var $$url = "/Doc";
// \0virtual:astro:page:Source/pages/Doc@_@astro
var page = () => Doc_exports;
export { page };
