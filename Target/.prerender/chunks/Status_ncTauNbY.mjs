import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, ct as $$RecordLedger, ft as RegisterOf, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$StatusBoard } from "./StatusBoard_Ud_jN4sR.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$RecordCompare } from "./RecordCompare_C-4S1U2R.mjs";
import { t as $$RecordInstrument } from "./RecordInstrument_fvdZRdXs.mjs";
import { t as $$RecordStage } from "./RecordStage_Gz3AmIfZ.mjs";
import { t as $$RecordTrace } from "./RecordTrace_C2mmJiIp.mjs";
import { t as $$RecordWell } from "./RecordWell_DwPpyOpV.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as $$SurfaceHead } from "./SurfaceHead_epMIyR7B.mjs";
import { t as $$SurfaceLife } from "./SurfaceLife_Ci25FCf-.mjs";
import { a as Publication, c as Surfaces, i as Measures, l as TotalRows, n as Board, o as Reading, r as Check, s as Stages, t as Bands, u as Vocabulary } from "./Status_DmpaXQPk.mjs";
import { a as StatusOnward } from "./Page_Cfrn8iZS.mjs";
// Source/pages/Status.astro
var Status_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Status,
	file: () => $$file,
	url: () => $$url
});
var $$Status = createComponent(($$result, $$props, $$slots) => {
	const AsOf = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const MetaTitle = "Status | Code Editor Land";
	const MetaDescription = "Every record this site files with a state, under the four columns of the state vocabulary: what is in force, what is on the way, what is retired, and what is claimed but not yet measured.";
	const CountOf = (Key) => Board.find((Column) => Column.key === Key)?.rows.length ?? 0;
	const ColumnLinks = Board.map((Column) => ({
		label: `${Column.label} ${Column.rows.length}`,
		href: `#board-${Column.key}`
	}));
	const Scope = [
		{
			key: "RECORDS:",
			value: String(TotalRows),
			note: "on the board"
		},
		{
			key: "COLUMNS:",
			value: String(Board.length),
			note: "of the eight words"
		},
		{
			key: "VOCABULARY:",
			value: String(Vocabulary.length),
			note: "words, closed"
		},
		{
			key: "AS OF:",
			value: AsOf,
			note: "this build"
		}
	];
	const ScopeRegister = RegisterOf("SCOPE", Scope);
	const States = [{
		key: "STATUS",
		value: "ACTIVE",
		tone: "specimen"
	}, {
		key: "EVIDENCE",
		value: "UNAVAILABLE",
		tone: "ink"
	}];
	const Declarations = [
		{
			key: "ROUTE",
			value: "/STATUS"
		},
		{
			key: "SOURCE",
			value: "SOURCE/CONTENT/RECORD/*.TS"
		},
		{
			key: "AS OF",
			value: AsOf
		},
		{
			key: "VOCABULARY",
			value: "EIGHT WORDS"
		}
	];
	const Facts = [
		{
			key: "IN FORCE:",
			value: String(CountOf("in-force"))
		},
		{
			key: "ON THE WAY:",
			value: String(CountOf("on-the-way"))
		},
		{
			key: "RETIRED:",
			value: String(CountOf("retired"))
		},
		{
			key: "NOT MEASURED:",
			value: String(CountOf("not-measured"))
		}
	];
	const TrailItems = [{
		label: "/HOME",
		href: "/"
	}, { label: "/STATUS" }];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# AUDIT_05",
			"label": "THE STATUS BOARD",
			"class": "PageShell--more"
		}, {
			"default": ($$result) => renderTemplate`   ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"register": ScopeRegister,
				"rows": Scope,
				"columns": 2
			})} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Board,
				index: ColumnLinks
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "StatusBoard", $$StatusBoard, {
				"columns": Board,
				"caption": `Every row was read from the module named in its band's footnote. A column that held nothing prints the sentence saying so, because "nothing is retired" and "retirement is not recorded" are different claims.`
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Axis }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordCompare", $$RecordCompare, { "compare": Publication })} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Vocabulary }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": Vocabulary,
				"columns": 2
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Surfaces }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="PageShell__row" style="--row-tracks:5;--row-floor:11rem"> ${Surfaces.map((Surface) => renderTemplate`<div> <p class="font-mono type-meta uppercase tracking-rule text-[var(--Mark)]"> ${Surface.route} </p> ${renderComponent($$result, "SurfaceLife", $$SurfaceLife, {
				"dense": true,
				"term": Surface.term
			})} </div>`)} </div> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Figures }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordInstrument", $$RecordInstrument, {
				"measures": Measures(AsOf),
				"caption": "Every figure is computed from the rows on this page, and every figure names the file it was counted in. A figure the page could not compute would print UNAVAILABLE, never a zero.",
				"empty": "The board has no rows, so there is nothing to count. That is a state this page cannot reach while the element records exist, and it is stated rather than left as an empty panel."
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Reading }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordTrace", $$RecordTrace, { "trace": Reading })} ${renderComponent($$result, "RecordStage", $$RecordStage, {
				"stages": Stages,
				"orientation": "row"
			})} ${renderComponent($$result, "RecordWell", $$RecordWell, {
				"label": Check.label,
				"language": Check.language,
				"lines": Check.lines,
				"source": Check.source
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": Bands.Limits }, { "default": ($$result) => renderTemplate` <div class="more-states"> ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "partial",
				"index": "LIMIT / 01",
				"statement": "Every element record states ACTIVE. Eight of the fifteen also carry a manifest in the build, and every one of those manifests is a placeholder with no plate beside it.",
				"cause": "The record's status is a claim about the code. The evidence is a claim about the capture, and the capture has not been made.",
				"next": {
					label: "READ THE PLATE SET",
					href: "/Contents"
				},
				"rows": [{
					key: "KNOWN:",
					value: "15 RECORDS, 15 STATUSES"
				}, {
					key: "UNAVAILABLE:",
					value: "8 PLATES, 7 MANIFESTS"
				}],
				"note": "SOURCE: SOURCE/CONTENT/ELEMENT/WORKING.TS"
			})} ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "stale",
				"index": "LIMIT / 02",
				"statement": "The last reading of these records is the build this page was rendered in.",
				"cause": "The records carry no date of their own.",
				"asOf": AsOf,
				"age": "THIS BUILD",
				"rows": [{
					key: "LAST KNOWN:",
					value: AsOf
				}, {
					key: "RECORD DATES:",
					value: "UNAVAILABLE"
				}],
				"note": "SOURCE: SOURCE/CONTENT/RECORD/*.TS"
			})} ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "missing",
				"index": "LIMIT / 03",
				"statement": "Three platform records point at the Download page, and the Download page has no artifact for any of them.",
				"cause": "Every platform row's action leads to a record whose VERSION and SIZE print UNAVAILABLE.",
				"next": {
					label: "BUILD FROM SOURCE",
					href: "/Doc/installation"
				},
				"rows": [
					{
						key: "TARGETS:",
						value: "3"
					},
					{
						key: "ARTIFACTS:",
						value: "0"
					},
					{
						key: "ROUTE:",
						value: "/DOWNLOAD",
						code: true
					}
				],
				"note": "SOURCE: SOURCE/COMPONENT/DYNAMIC/DOWNLOAD/DATA.TS"
			})} </div> ` })}  `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "Trail", $$Trail, {
				"slot": "head",
				"trail": TrailItems
			})}${renderComponent($$result, "SurfaceHead", $$SurfaceHead, {
				"slot": "head",
				"index": "# STATUS_01",
				"title": "The state of every record",
				"proposition": "Twenty-one records, four columns, and the one word each record states about itself. This page decides no state: it reads the modules that do.",
				"states": States,
				"declarations": Declarations,
				"rows": Facts
			})}`,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "Onward", $$Onward, {
				"slot": "foot",
				"rows": StatusOnward.rows,
				"copy": StatusOnward.copy
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
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Status.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Status.astro";
var $$url = "/Status";
// \0virtual:astro:page:Source/pages/Status@_@astro
var page = () => Status_exports;
export { page };
