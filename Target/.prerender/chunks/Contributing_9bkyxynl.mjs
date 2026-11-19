import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, k as unescapeHTML, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, Xt as renderScript, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as LinkMentions } from "./CodeMentions_B67lao4t.mjs";
import { n as $$ReadingDocument, t as $$TrustClause } from "./TrustClause_UOPkhFiy.mjs";
import { t as $$BandFoot } from "./BandFoot_BGOxIJt3.mjs";
import { t as ComposeFacts } from "./Facts_DxRmgaUe.mjs";
import { a as LinkFor } from "./Purpose_DgbipYwf.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
// Source/Library/Document/Contributing/Data.ts
var Ledger = [{
	key: "VERSION:",
	value: "Current branch",
	note: "a pull request targets it"
}, {
	key: "APPLIES TO:",
	value: "The Land repository on GitHub",
	note: "open source and built in public"
}];
var Index = [
	{
		number: "01",
		label: "Quick Links",
		href: "#quick-links"
	},
	{
		number: "02",
		label: "How to Contribute",
		href: "#how-to-contribute"
	},
	{
		number: "03",
		label: "Fifteen Elements, One Editor",
		href: "#fifteen-elements-one-editor"
	},
	{
		number: "04",
		label: "Ways to Contribute",
		href: "#ways-to-contribute"
	},
	{
		number: "05",
		label: "Funding",
		href: "#funding"
	},
	{
		number: "06",
		label: "Code of Conduct",
		href: "#code-of-conduct"
	}
];
var Process = [
	{
		index: "1",
		titleKey: "common.contributing.step1.title",
		title: "Fork and Clone",
		lineKey: "common.contributing.step1.description",
		line: "Fork the Land repository on GitHub and clone it locally with submodules:",
		command: "git clone --recurse-submodules https://github.com/YOUR_USERNAME/Land.git"
	},
	{
		index: "2",
		titleKey: "common.contributing.step2.title",
		title: "Set Up the Environment",
		lineKey: "common.contributing.step2.description",
		line: "Install Rust nightly and Node.js 24. Then compile the VS Code Editor submodule first (see Installation guide), then run:",
		command: "cd Land && pnpm install && ./Maintain/Debug/Build.sh --profile debug-electron-bundled"
	},
	{
		index: "3",
		titleKey: "common.contributing.step3.title",
		title: "Make Your Changes",
		lineKey: "common.contributing.step3.description",
		line: "Create a branch, make your changes, and follow the PascalCase naming convention used throughout the project."
	},
	{
		index: "4",
		titleKey: "common.contributing.step4.title",
		title: "Submit a Pull Request",
		lineKey: "common.contributing.step4.description",
		line: "Push your branch and open a pull request against the Current branch.\n\nDescribe what changed and why. One sentence is enough."
	}
];
/**
* Resolve the process rows into the page's own shape. The page passes its `T`;
* this module never imports the i18n client, and the step order is the array's
* order, so nothing here sorts.
*/
var ResolveSteps = (Rows, Translate) => Rows.map((Row) => ({
	index: Row.index,
	title: Translate(Row.titleKey, Row.title),
	line: Translate(Row.lineKey, Row.line),
	command: Row.command
}));
// Source/pages/Contributing.astro
var Contributing_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contributing,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Contributing = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Contributing;
	const T = GetI18n();
	const Steps = ResolveSteps(Process, (Key, Default) => T(Key, { defaultValue: Default }));
	const MetaTitle = T("meta.contributing.title", { defaultValue: "Contributing | Code Editor Land" });
	const MetaDescription = T("meta.contributing.description", { defaultValue: "An open source code editor built with Rust and Tauri.\nLearn how to contribute to Code Editor Land." });
	const Card = "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:var(--space-group);--jelly-card-padding-inline:var(--space-group)";
	const Talk = LinkFor("talk");
	const Support = LinkFor("support");
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="trust-page"> <!-- Breadcrumbs -->${renderComponent($$result, "Trail", $$Trail, {
			"class": "trust-page__trail",
			"trail": [{
				label: "/HOME",
				href: "/"
			}, { label: "/CONTRIBUTING" }]
		})} ${renderComponent($$result, "ReadingDocument", $$ReadingDocument, {
			"kicker": "/CONTRIBUTING",
			"heading": T("common.contributing.pageTitle", { defaultValue: "Contributing" }),
			"standfirstHtml": LinkMentions(T("common.contributing.pageSubtitle", { defaultValue: "Land is CC0 and built in public.\n\nA change is a branch, a test and one sentence about why. The guide names the files, the toolchain and the branch convention; the four ways in are code, documentation, testing and design." })),
			"rows": ComposeFacts(Ledger),
			"index": Index,
			"indexLabel": "Parts",
			"layout": "rail",
			"ledgerSurface": "standard",
			"ledgerColumns": 2,
			"measure": "full"
		}, { "default": ($$result) => renderTemplate`  <section class="reading-document__part" data-interval="beat"> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "01",
			"id": "quick-links",
			"class": "sr-only"
		}, { "default": ($$result) => renderTemplate`${T("common.contributing.quickLinks.heading", { defaultValue: "Quick Links" })}` })} <div class="grid grid-cols-1 gap-6 md:grid-cols-2"> <a href="https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer block bg-card p-6 transition-colors hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <h3 class="text-card-foreground mb-2 type-sub font-medium" id="contributing-guide"> ${T("common.contributing.guide.title", { defaultValue: "Contributing Guide" })} <span class="InlineSeparator">→</span> </h3> <p class="whitespace-pre-line text-card-foreground"> ${T("common.contributing.guide.description", { defaultValue: "Read CONTRIBUTING.md on GitHub for the full setup walkthrough: environment, branch conventions, and how to submit changes." })} </p> </a> <a href="https://github.com/CodeEditorLand/Land/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer block bg-card p-6 transition-colors hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> <h3 class="text-card-foreground mb-2 type-sub font-medium" id="good-first-issues"> ${T("common.contributing.goodFirstIssues.title", { defaultValue: "Good First Issues" })} <span class="InlineSeparator">→</span> </h3> <p class="whitespace-pre-line text-card-foreground"> ${T("common.contributing.goodFirstIssues.description", { defaultValue: "Browse issues labeled \"good first issue\" to find approachable tasks for new contributors." })} </p> </a> </div> </section>  <section class="reading-document__part" data-interval="rest"> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "02",
			"id": "how-to-contribute"
		}, { "default": ($$result) => renderTemplate`${T("common.contributing.howToContribute.heading", { defaultValue: "How to Contribute" })}` })} <div class="contributing-steps"> <ol class="contributing-steps__list"> ${Steps.map((Step) => renderTemplate`<li class="contributing-steps__step"> <span class="contributing-steps__index"> ${Step.index} </span> <div class="contributing-steps__body"> <h3 class="contributing-steps__title"> ${Step.title} </h3> <p class="contributing-steps__line">${unescapeHTML(LinkMentions(Step.line))}</p> ${Step.command ? renderTemplate`<div class="contributing-steps__command"> <pre class="contributing-steps__pre">${Step.command}</pre> ${renderComponent($$result, "jelly-icon-button", "jelly-icon-button", {
			"data-copy": true,
			"aria-label": "Copy to clipboard",
			"label": "Copy to clipboard",
			"title": "Copy to clipboard",
			"shape": "square",
			"size": "small",
			"style": "--jelly-fill: var(--Mute); --jelly-label: var(--Foreground); --jelly-icon-button-radius: 0px; --jelly-ring: var(--Accent);"
		}, { "default": ($$result) => renderTemplate` <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" style="color: var(--jelly-label)"> <rect height="14" rx="2" ry="2" width="14" x="8" y="8"></rect> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path> </svg> ` })} </div>` : null} </div> </li>`)} </ol> </div> </section>  <section class="reading-document__part" data-interval="beat"> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "03",
			"id": "fifteen-elements-one-editor"
		}, { "default": ($$result) => renderTemplate`${T("common.contributing.elements.heading", { defaultValue: "Fifteen Elements, One Editor" })}` })} <p class="mb-6 whitespace-pre-line text-muted-foreground">${unescapeHTML(LinkMentions(T("common.contributing.elements.description", { defaultValue: "Land is built from fifteen modular Elements, each a standalone Rust crate or TypeScript package. Each element can be developed, tested, and published independently without touching the others." })))}</p> <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> <a href="https://github.com/CodeEditorLand/Mountain" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">
Mountain&#x2001;&#x26F0;&#xFE0F;
</span> <span class="block text-card-foreground">
Native backend
</span> </a> <a href="https://github.com/CodeEditorLand/Cocoon" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Cocoon&#x2001;&#x1F98B;</span> <span class="block text-card-foreground">
Extension host
</span> </a> <a href="https://github.com/CodeEditorLand/Wind" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Wind&#x2001;&#x1F343;</span> <span class="block text-card-foreground">
Workbench shell
</span> </a> <a href="https://github.com/CodeEditorLand/Sky" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Sky&#x2001;&#x1F30C;</span> <span class="block text-card-foreground">
UI components
</span> </a> <a href="https://github.com/CodeEditorLand/Air" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Air&#x2001;&#x1FA81;</span> <span class="block text-card-foreground">
Background daemon
</span> </a> <a href="https://github.com/CodeEditorLand/Echo" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Echo&#x2001;&#x1F4E3;</span> <span class="block text-card-foreground">
Work-stealing scheduler
</span> </a> <a href="https://github.com/CodeEditorLand/Common" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">
Common&#x2001;&#x1F468;&#x1F3FB;&#x200D;&#x1F3ED;
</span> <span class="block text-card-foreground">
Traits &amp; DTOs
</span> </a> <a href="https://github.com/CodeEditorLand/Vine" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Vine&#x2001;&#x1F33F;</span> <span class="block text-card-foreground">
gRPC protocol
</span> </a> <a href="https://github.com/CodeEditorLand/Rest" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">
Rest&#x2001;&#x26F1;&#xFE0F;
</span> <span class="block text-card-foreground">
TypeScript compiler
</span> </a> <a href="https://github.com/CodeEditorLand/Output" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Output&#x2001;&#x26AB;</span> <span class="block text-card-foreground">
Build output
</span> </a> <a href="https://github.com/CodeEditorLand/Mist" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">
Mist&#x2001;&#x1F32B;&#xFE0F;
</span> <span class="block text-card-foreground">
DNS resolver
</span> </a> <a href="https://github.com/CodeEditorLand/Grove" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Grove&#x2001;&#x1F333;</span> <span class="block text-card-foreground">
WASM sandbox
</span> </a> <a href="https://github.com/CodeEditorLand/SideCar" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">
SideCar&#x2001;&#x1F683;
</span> <span class="block text-card-foreground">
Node.js binary distributor
</span> </a> <a href="https://github.com/CodeEditorLand/Worker" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">Worker&#x2001;&#x1F369;</span> <span class="block text-card-foreground">
Web Worker pool
</span> </a> <a href="https://github.com/CodeEditorLand/Maintain" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer bg-card p-3 text-center transition-colors hover:bg-secondary"> <span class="font-medium">
Maintain&#x2001;&#x1F4AA;&#x1F3FB;
</span> <span class="block text-card-foreground">
Build orchestrator
</span> </a> </div> <p class="mt-4 whitespace-pre-line text-muted-foreground">${unescapeHTML(LinkMentions(T("common.contributing.elements.docs", { defaultValue: "Every Element has its own README with architecture details. Find them in Land/Element/" })))}</p> </section>  <section class="reading-document__part" data-interval="rest"> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "04",
			"id": "ways-to-contribute"
		}, { "default": ($$result) => renderTemplate`${T("common.contributing.ways.heading", { defaultValue: "Ways to Contribute" })}` })} <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"> ${renderComponent($$result, "jelly-card", "jelly-card", { "style": Card }, { "default": ($$result) => renderTemplate` <h3 class="text-card-foreground mb-2 font-medium" id="code"> ${T("common.contributing.ways.code.title", { defaultValue: "Code" })}
&#x2001;&#x1F4BB;
</h3> <p class="whitespace-pre-line text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.ways.code.description", { defaultValue: "Fix bugs, implement features, or improve performance in Rust or TypeScript." })))}</p> ` })} ${renderComponent($$result, "jelly-card", "jelly-card", { "style": Card }, { "default": ($$result) => renderTemplate` <h3 class="text-card-foreground mb-2 font-medium" id="documentation"> ${T("common.contributing.ways.documentation.title", { defaultValue: "Documentation" })}
&#x2001;&#x1F4D6;
</h3> <p class="whitespace-pre-line text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.ways.documentation.description", { defaultValue: "Improve guides, add examples, or translate existing content into other languages." })))}</p> ` })} ${renderComponent($$result, "jelly-card", "jelly-card", { "style": Card }, { "default": ($$result) => renderTemplate` <h3 class="text-card-foreground mb-2 font-medium" id="testing"> ${T("common.contributing.ways.testing.title", { defaultValue: "Testing" })}
&#x2001;&#x1F9EA;
</h3> <p class="whitespace-pre-line text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.ways.testing.description", { defaultValue: "Write tests, reproduce reported bugs, or help triage open issues." })))}</p> ` })} ${renderComponent($$result, "jelly-card", "jelly-card", { "style": Card }, { "default": ($$result) => renderTemplate` <h3 class="text-card-foreground mb-2 font-medium" id="design"> ${T("common.contributing.ways.design.title", { defaultValue: "Design" })}
&#x2001;&#x1F3A8;
</h3> <p class="whitespace-pre-line text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.ways.design.description", { defaultValue: "Contribute UI and UX improvements, icons, or visual design work for the editor or website." })))}</p> ` })} </div> </section>  <section class="reading-document__part" data-interval="beat"> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "05",
			"id": "funding"
		}, { "default": ($$result) => renderTemplate`${T("common.contributing.funding.heading", { defaultValue: "Funding" })}` })} ${renderComponent($$result, "jelly-card", "jelly-card", { "style": Card }, { "default": ($$result) => renderTemplate` <div class="mb-4 flex flex-wrap gap-x-4 gap-y-1"> <a href="https://nlnet.nl/project/Land/" target="_blank" rel="noopener noreferrer" class="font-medium text-card-foreground hover:underline">
NLnet Project Page
<span class="InlineSeparator">&#x1F310;</span> </a> <a href="https://nlnet.nl/commonsfund" target="_blank" rel="noopener noreferrer" class="font-medium text-card-foreground hover:underline">
NGI0 Commons Fund
<span class="InlineSeparator">&#x1F91D;</span> </a> <a href="https://nlnet.nl" target="_blank" rel="noopener noreferrer" class="font-medium text-card-foreground hover:underline">
NLnet<span class="InlineSeparator">&#x1F3E0;</span> </a> </div> <p class="mb-4 whitespace-pre-line text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.funding.nlnetIntro", { defaultValue: "Code Editor Land has been funded through the NGI0 Commons Fund, supported by NLnet." })))}</p> <p class="whitespace-pre-line text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.funding.playformInfo", { defaultValue: "The project is operated by PlayForm, a company based in Sofia, Bulgaria.\n\nPlayForm acts as the open-source steward for Code Editor Land under the NGI0 Commons Fund grant." })))}</p> ` })} </section>  <section class="reading-document__part" data-interval="rest"> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "06",
			"id": "code-of-conduct"
		}, { "default": ($$result) => renderTemplate`${T("common.contributing.conduct.heading", { defaultValue: "Code of Conduct" })}` })} ${renderComponent($$result, "jelly-card", "jelly-card", { "style": Card }, { "default": ($$result) => renderTemplate` <a href="https://github.com/CodeEditorLand/Land/tree/Current/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer" class="StaccatoButton font-medium text-card-foreground hover:underline">
Code of Conduct<span class="InlineSeparator">→</span> </a> <p class="mt-2 text-card-foreground">${unescapeHTML(LinkMentions(T("common.contributing.conduct.description", { defaultValue: "All participants in the Land community are expected to be respectful and constructive.\n\nRead the full Code of Conduct on GitHub." })))}</p> ` })} </section> ${renderComponent($$result, "BandFoot", $$BandFoot, {
			"surface": "card",
			"index": "06",
			"part": "/THE BACK MATTER",
			"see": [
				{
					route: "/LICENSE",
					href: "/License",
					reason: "what a contribution is licensed under: the same public-domain dedication as the code"
				},
				{
					route: "/DOC",
					href: "/Doc",
					reason: "the manual a documentation contribution is written against"
				},
				{
					route: Talk.Route,
					href: Talk.Href,
					reason: "a question about contributing that this guide does not answer, put to the team"
				},
				{
					route: Support.Route,
					href: Support.Href,
					reason: "technical support, when the build or the editor is what is broken"
				}
			],
			"figure": {
				value: "06",
				unit: "PARTS"
			},
			"source": "SOURCE/PAGES/CONTRIBUTING.ASTRO"
		})} ` })} <!-- Back to top --> <div class="trust-page__close"> <a href="#top" class="StaccatoButton text-primary hover:underline"> ${T("common.button.backToTop", { defaultValue: "Back to top" })} <span class="InlineSeparator">↑</span> </a> </div> </div> `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contributing.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contributing.astro?astro&type=script&index=1&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contributing.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contributing.astro";
var $$url = "/Contributing";
// \0virtual:astro:page:Source/pages/Contributing@_@astro
var page = () => Contributing_exports;
export { page };
