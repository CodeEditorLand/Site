import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, ct as $$RecordLedger, ft as RegisterOf, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$RecordCompare } from "./RecordCompare_C-4S1U2R.mjs";
import { t as $$RecordHero } from "./RecordHero_CG7tGgqQ.mjs";
import { t as $$RecordMatrix } from "./RecordMatrix_Dd20c_be.mjs";
import { t as $$RecordTrace } from "./RecordTrace_C2mmJiIp.mjs";
import { t as $$RecordWell } from "./RecordWell_DwPpyOpV.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellPanes } from "./ShellPanes_By4EddmM.mjs";
import { t as $$ShellRail } from "./ShellRail_OrhIFjE9.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as $$MatrixControl } from "./MatrixControl_CcVOz1Wb.mjs";
import { a as Columns, c as Measurements, d as Rows, f as Show, i as Check, l as Rail, n as Carries, o as MeasureColumns, r as Changes, s as Measured, t as Bands, u as Record } from "./Compare_BdgkRQ4A.mjs";
import { t as CompareOnward } from "./Page_Cfrn8iZS.mjs";
// Source/pages/Compare.astro
var Compare_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Compare,
	file: () => $$file,
	url: () => $$url
});
var $$Compare = createComponent(($$result, $$props, $$slots) => {
	const MetaTitle = "Compare | Code Editor Land";
	const MetaDescription = "Land against the editor it replaces, aspect by aspect: eight substitutions quoted from the project's own document, what carries over, and the five figures nobody has measured.";
	const RowCells = Rows.map((Row) => ({
		label: Row.aspect,
		cells: [Row.land, Row.other]
	}));
	const MeasureCells = Measurements.map((Row) => ({
		label: Row.measure,
		cells: [
			Row.land,
			Row.other,
			Row.source
		]
	}));
	const Dated = Measurements.find((Row) => Row.asOf !== void 0)?.asOf ?? "UNAVAILABLE";
	const ChangesRegister = RegisterOf("WHAT CHANGES", Changes);
	const TrailItems = [{
		label: "/HOME",
		href: "/"
	}, { label: "/COMPARE" }];
	const SubstitutionFacets = Columns.map((Column, Index) => ({
		Key: String(Index),
		Label: Column.label
	}));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# WORKSPACE_06",
			"label": "THE SUBSTITUTION",
			"class": "PageShell--more",
			"railLabel": "The citations"
		}, {
			"default": ($$result) => renderTemplate`    ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Rows }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MatrixControl", $$MatrixControl, {
				"Target": "substitution-matrix",
				"Facets": SubstitutionFacets,
				"Name": "THE SUBSTITUTION",
				"Total": RowCells.length,
				"PageSize": 6
			})} ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
				"id": "substitution-matrix",
				"columns": Columns,
				"rows": RowCells,
				"caption": "SOURCE: SOURCE/CONTENT/DOC/COCOON.MD. Both columns are that document's table, verbatim."
			})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"register": ChangesRegister,
				"rows": Changes,
				"columns": 1
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Carries }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "ShellPanes", $$ShellPanes, {
				"layout": "stack",
				"primary": {
					mark: "# PANE_01",
					label: "WHAT CARRIES OVER",
					meta: `1 OF ${Carries.stops.length}`,
					note: "One claim with a source. The other four are not stated anywhere in this tree, and the rail prints that rather than a verdict."
				},
				"secondary": {
					mark: "# PANE_02",
					label: "THE CHECK",
					meta: `${Check.steps.length} FILES`,
					note: "The three documents this page quotes, in the order a reader would open them."
				},
				"drawer": {
					label: "THE COMMAND",
					note: "show the substitution in the tree"
				}
			}, {
				"primary": ($$result) => renderTemplate`${renderComponent($$result, "RecordCompare", $$RecordCompare, {
					"slot": "primary",
					"compare": Carries
				})}`,
				"secondary": ($$result) => renderTemplate`${renderComponent($$result, "RecordTrace", $$RecordTrace, {
					"slot": "secondary",
					"trace": Check
				})}`,
				"drawer": ($$result) => renderTemplate`${renderComponent($$result, "RecordWell", $$RecordWell, {
					"slot": "drawer",
					"label": Show.label,
					"language": Show.language,
					"lines": Show.lines,
					"source": Show.source
				})}`
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Measure }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
				"class": "more-measured",
				"columns": MeasureColumns,
				"rows": MeasureCells,
				"caption": `${Measured} of ${Measurements.length} measures exist. The one that does is weighted coverage across the measured \`vscode.*\` namespaces; the four that do not are stated as \`UNAVAILABLE\` in both columns, because this site does not measure other people's software.`
			})} ${maybeRenderHead($$result)}<div class="more-states"> ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "stale",
				"index": "MEASURE / 01",
				"statement": "The one figure on this page was measured in May 2026, and the document that states it has not been re-run since.",
				"cause": "A coverage figure ages with the API surface, not with the page.",
				"asOf": Dated,
				"age": "THE DOCUMENT'S OWN DATE",
				"rows": [{
					key: "FIGURE:",
					value: "88% WEIGHTED COVERAGE"
				}, {
					key: "DOCUMENT:",
					value: "/BLOG/VSCODE-COMPATIBILITY",
					code: true
				}],
				"note": "SOURCE: SOURCE/CONTENT/BLOG/VSCODECOMPATIBILITY.MD"
			})} ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "partial",
				"index": "MEASURE / 02",
				"statement": "Four of the five measurements a reader wants before switching do not exist on this site: startup time, memory, installer size and a public build.",
				"cause": "Three are unmeasured and one has no artifact to measure. The table prints `UNAVAILABLE` in both columns rather than borrowing a number from a benchmark nobody here ran.",
				"next": {
					label: "BUILD FROM SOURCE",
					href: "/Doc/installation"
				},
				"rows": [{
					key: "MEASURED:",
					value: "1 OF 5"
				}, {
					key: "UNAVAILABLE:",
					value: "STARTUP, MEMORY, SIZE, BUILD"
				}],
				"note": "SOURCE: SOURCE/CONTENT/MORE/COMPARE.TS"
			})} </div> ` })}  `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "Trail", $$Trail, {
				"slot": "head",
				"trail": TrailItems
			})}${renderComponent($$result, "RecordHero", $$RecordHero, {
				"slot": "head",
				...Record
			})}`,
			"rail": ($$result) => renderTemplate`${renderComponent($$result, "ShellRail", $$ShellRail, {
				"slot": "rail",
				"label": "THE CITATIONS",
				"count": Rail.length,
				"items": Rail,
				"current": "page",
				"sticky": false
			})}`,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "Onward", $$Onward, {
				"slot": "foot",
				"rows": CompareOnward.rows,
				"copy": CompareOnward.copy
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
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Compare.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Compare.astro";
var $$url = "/Compare";
// \0virtual:astro:page:Source/pages/Compare@_@astro
var page = () => Compare_exports;
export { page };
