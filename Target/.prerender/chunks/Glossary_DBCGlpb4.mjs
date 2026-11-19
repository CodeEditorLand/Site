import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, _ as Facts, b as RailRows, g as Bands, t as $$Base, x as TermCount, y as Lexicon } from "./Base_BVG1wSoZ.mjs";
import { t as $$BandFoot } from "./BandFoot_BGOxIJt3.mjs";
import { t as $$Lexicon } from "./Lexicon_DR0cdiQw.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$QuietHead } from "./QuietHead_B3n3c7Wf.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$RecordMargin } from "./RecordMargin_DhcIZIHx.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellRail } from "./ShellRail_OrhIFjE9.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as $$Fold } from "./Fold_fN1bmzGW.mjs";
import { n as GlossaryOnward } from "./Page_Cfrn8iZS.mjs";
// Source/pages/Glossary.astro
var Glossary_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Glossary,
	file: () => $$file,
	url: () => $$url
});
var $$Glossary = createComponent(($$result, $$props, $$slots) => {
	const MetaTitle = "Glossary | Code Editor Land";
	const MetaDescription = "The document's own words: the fifteen elements, the grammar's nouns - record, form, band, ledger, matrix - and the five words this site used and retired.";
	const Elements = Lexicon[0].terms.length;
	const Words = Lexicon[1].terms.length;
	const Retired = Lexicon[2].terms.length;
	const Note = {
		index: "NOTE_01",
		label: "THE DEFINITIONS",
		body: "An element's definition is its own record's description, printed whole rather than shortened. The grammar's words are defined as the layer defines them, and each entry's `WHERE:` row names a page where the thing itself is printed. Nothing here is a paraphrase, and a word the tree does not define prints `UNAVAILABLE` rather than a guess.",
		source: "SOURCE/CONTENT/MORE/GLOSSARY.TS"
	};
	const TrailItems = [{
		label: "/HOME",
		href: "/"
	}, { label: "/GLOSSARY" }];
	const Sections = [...Lexicon.map((Run, Index) => ({
		Index: String(Index + 1).padStart(2, "0"),
		Label: Run.label.replace(/^\//, ""),
		Href: `#run-${Run.key}`,
		Meta: `${Run.terms.length} TERMS`
	})), {
		Index: String(Lexicon.length + 1).padStart(2, "0"),
		Label: "THE LIMITS",
		Href: "#limits",
		Meta: "02 STATES"
	}];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# READING_09",
			"label": "THE LEXICON",
			"class": "PageShell--more",
			"measure": "full",
			"railLabel": "The runs and the retired words",
			"marginLabel": "Apparatus"
		}, {
			"default": ($$result) => renderTemplate`     ${renderComponent($$result, "Lexicon", $$Lexicon, {
				"run": Lexicon[0],
				"index": "RUN_01"
			})} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Words }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Lexicon", $$Lexicon, {
				"run": Lexicon[1],
				"head": false
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Retired }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Lexicon", $$Lexicon, {
				"run": Lexicon[2],
				"head": false
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Limits,
				id: "limits"
			} }, {
				"default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="more-states"> ${renderComponent($$result, "ShellState", $$ShellState, {
					"kind": "missing",
					"index": "RETIRED / 06",
					"statement": "`VERSION: vPre-release` was printed on every platform card, and no file in this build prints it.",
					"cause": "The word was replaced by `UNAVAILABLE`, which states the same fact without claiming that a version exists.",
					"next": {
						label: "READ THE EDITION",
						href: "/Download"
					},
					"rows": [
						{
							key: "WAS:",
							value: "VERSION: vPre-release",
							code: true
						},
						{
							key: "NOW:",
							value: "UNAVAILABLE"
						},
						{
							key: "FILES:",
							value: "0 PRINT IT"
						}
					],
					"note": "SOURCE: SOURCE/CONTENT/HOME/PLATFORM.TS"
				})} ${renderComponent($$result, "ShellState", $$ShellState, {
					"kind": "partial",
					"index": "COVERAGE / 01",
					"statement": "Two words the document uses are not in this lexicon: `LAND`, the repository and project name, and `FIDDEE`, the product name for the compiled application.",
					"cause": "The element run covers the fifteen parts, not the product or its binary. A definition invented for either would be this page's own prose in a run that promises the records'.",
					"next": {
						label: "READ THE INTRODUCTION",
						href: "/Doc/introduction"
					},
					"rows": [{
						key: "KNOWN:",
						value: `${TermCount} TERMS, 3 RUNS`
					}, {
						key: "UNAVAILABLE:",
						value: "LAND, FIDDEE"
					}],
					"note": "SOURCE: SOURCE/CONTENT/DOC/INTRODUCTION.MD"
				})} </div>  `,
				"foot": ($$result) => renderTemplate`${renderComponent($$result, "BandFoot", $$BandFoot, {
					"slot": "foot",
					"index": "02",
					"part": "/THE DOCUMENT",
					"see": [{
						route: "/CONTENTS",
						href: "/Contents",
						reason: "every information type, every address, and the form each one takes"
					}, {
						route: "/DOC/INTRODUCTION",
						href: "/Doc/introduction",
						reason: "`LAND` and `FIDDEE` defined in prose, where the document first uses them"
					}],
					"figure": {
						value: String(TermCount),
						unit: "TERMS"
					},
					"source": "SOURCE/CONTENT/MORE/GLOSSARY.TS"
				})}`
			})}   `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "Trail", $$Trail, {
				"slot": "head",
				"trail": TrailItems
			})}${renderComponent($$result, "QuietHead", $$QuietHead, {
				"slot": "head",
				"index": "LEXICON_01",
				"label": "/THE DOCUMENT'S OWN WORDS",
				"title": "The words this document uses",
				"proposition": `${Elements} named parts, ${Words} nouns the grammar gives a job, and ${Retired} words the site used and does not any more. Every definition cites the file it came from.`,
				"rows": Facts
			})}${renderComponent($$result, "Fold", $$Fold, {
				"slot": "head",
				"Items": Sections,
				"Name": "THE REGISTERS",
				"Empty": "This lexicon files no run, so there is nothing to list. A glossary with no words is a page that has not been written yet."
			})}`,
			"rail": ($$result) => renderTemplate`${renderComponent($$result, "ShellRail", $$ShellRail, {
				"slot": "rail",
				"class": "more-rail",
				"label": "THE REGISTERS",
				"count": RailRows.length,
				"items": RailRows,
				"current": "page",
				"sticky": false,
				"foot": {
					label: "ALL RECORDS",
					href: "/Contents"
				}
			})}`,
			"margin": ($$result) => renderTemplate`<div> ${renderComponent($$result, "RecordMargin", $$RecordMargin, { "note": Note })} </div>`,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "Onward", $$Onward, {
				"slot": "foot",
				"rows": GlossaryOnward.rows,
				"copy": GlossaryOnward.copy
			})}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Glossary.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Glossary.astro";
var $$url = "/Glossary";
// \0virtual:astro:page:Source/pages/Glossary@_@astro
var page = () => Glossary_exports;
export { page };
