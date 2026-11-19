import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, ct as $$RecordLedger, ft as RegisterOf, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$QuietHead } from "./QuietHead_B3n3c7Wf.mjs";
import { a as Intervals, c as $$MotionOrigin, f as $$MotionFold, i as Curves, n as ClassOf, o as $$MotionSpecimen, p as $$MotionExpand, r as Classes, s as $$MotionSequence, t as ClassCount } from "./Register_CYHsmqae.mjs";
import { t as $$MotionSkeleton } from "./MotionSkeleton_CcDDk36O.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$RecordMargin } from "./RecordMargin_DhcIZIHx.mjs";
import { t as $$RecordMatrix } from "./RecordMatrix_Dd20c_be.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellRail } from "./ShellRail_OrhIFjE9.mjs";
import { t as $$Fold } from "./Fold_fN1bmzGW.mjs";
import { t as $$MatrixControl } from "./MatrixControl_CcVOz1Wb.mjs";
import { _ as SortRows, a as Facts, c as HandoverRows, d as SequenceCaption, f as Sequences, g as SortFacets, h as SortColumns, i as ExpandRecords, l as RecordRows, m as SkeletonSpec, n as ArmsRows, o as FoldRules, p as SkeletonArrived, r as Bands, s as Gallery, t as ArmsColumns, u as Refusals, v as SpecimenNotes } from "./Page_C5C_LjVl.mjs";
// Source/pages/Motion.astro
var Motion_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Motion,
	file: () => $$file,
	url: () => $$url
});
var $$Motion = createComponent(($$result, $$props, $$slots) => {
	const Quad = " ";
	const MetaTitle = "Motion | Code Editor Land";
	const MetaDescription = "The paper's motion register: thirteen interaction classes, three intervals, three curves, the artifact each one is for, and the nine adverse states this document prints without moving at all.";
	const RegisterRows = Classes.map((Entry) => ({
		key: `${Entry.index} ${Entry.name}`,
		value: Entry.explains,
		note: `${Entry.intervalText}${Quad}${Entry.curve}${Quad}${Entry.relationship}${Quad}MOVES: ${Entry.moves}`
	}));
	const ImagesRegister = RegisterOf("THE TWO IMAGES", HandoverRows);
	const RecordArrivedRegister = RegisterOf("THE SAME RECORD, ARRIVED", SkeletonArrived);
	const IntervalsRegister = RegisterOf("THE INTERVALS", Intervals);
	const CurvesRegister = RegisterOf("THE CURVES", Curves);
	const Registers = [
		{
			mark: "01",
			label: "THE REGISTER",
			href: "#register",
			meta: `${String(ClassCount).padStart(2, "0")} CLASSES`
		},
		{
			mark: "02",
			label: "THE SPECIMENS",
			href: "#specimens",
			meta: "06 LIVE"
		},
		{
			mark: "03",
			label: "THE SEQUENCES",
			href: "#sequences",
			meta: `${String(Sequences.length).padStart(2, "0")} DRAWN`
		},
		{
			mark: "04",
			label: "THE FOLD",
			href: "#fold",
			meta: "03 SIZES"
		},
		{
			mark: "05",
			label: "THE ARMS",
			href: "#arms",
			meta: `${String(ArmsRows.length).padStart(2, "0")} STATES`
		},
		{
			mark: "06",
			label: "THE REFUSALS",
			href: "#refusals",
			meta: `${String(Refusals.length).padStart(2, "0")} RULES`
		},
		{
			mark: "07",
			label: "THE RECORD",
			href: "#record",
			meta: `${String(RecordRows.length).padStart(2, "0")} FILES`
		}
	];
	const RailRows = Registers.map((Register) => ({
		mark: Register.mark,
		label: Register.label,
		href: Register.href,
		meta: Register.meta
	}));
	const Contents = Registers.map((Register) => ({
		Index: Register.mark,
		Label: Register.label,
		Href: Register.href,
		Meta: Register.meta
	}));
	const TrailItems = [{
		label: "/HOME",
		href: "/"
	}, { label: "/MOTION" }];
	const ReducedNote = {
		index: "NOTE_01",
		label: "REDUCED MOTION",
		body: "Every rule in the family declares its end state unconditionally and gates only its interval, so a reader who asked for less motion gets the same document in one frame. The page handover is the one exception and it is not an exception to the promise: it is switched off at the source (`navigation: none`), because a snapshot transition that runs in 0.01ms still paints two documents in one frame, and that reader is better served by the navigation they already know.",
		source: "SOURCE/STYLESHEET/SYSTEM/MOTION/"
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# READING_10",
			"label": "THE MOTION REGISTER",
			"class": "PageShell--more",
			"measure": "full",
			"railLabel": "The page's registers",
			"marginLabel": "Apparatus"
		}, {
			"default": ($$result) => renderTemplate`     ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Register,
				id: "register"
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": RegisterRows,
				"columns": 1
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				kicker: Bands.Specimens.kicker,
				heading: Bands.Specimens.heading,
				standfirst: Bands.Specimens.standfirst,
				footnote: Bands.Specimens.footnote,
				tone: Bands.Specimens.tone,
				interval: Bands.Specimens.interval,
				id: "specimens"
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"motion": ClassOf("FOLD"),
				"note": SpecimenNotes.Fold
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MotionFold", $$MotionFold, {
				"name": "THE FOLD, IN FOUR RULES",
				"label": "KEPT",
				"leaves": FoldRules.map((Leaf) => ({ ...Leaf })),
				"empty": "This fold has no rules behind it, which would mean the stylesheet had not been written."
			})} ` })} ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"motion": ClassOf("EXPAND"),
				"variant": "flip",
				"note": SpecimenNotes.Expand
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MotionExpand", $$MotionExpand, {
				"marker": "# EXPAND / 03",
				"records": ExpandRecords.map((Record) => ({
					...Record,
					rows: [...Record.rows]
				})),
				"empty": "No record in this set carries provenance, which would mean the set was a list of claims rather than a set of records."
			})} ` })} ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"motion": ClassOf("HANDOVER"),
				"variant": "wide",
				"note": SpecimenNotes.Handover
			}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<a class="MotionSpecimen__Act" href="/Doc"> <span class="MotionSpecimen__ActMark" aria-hidden="true">
→
</span> <span>HAND OVER TO /DOC</span> </a> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": HandoverRows.map((Row) => ({ ...Row })),
				"register": ImagesRegister,
				"class": "MotionSpecimen__Ledger--stage"
			})} ` })} ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"motion": ClassOf("SORT"),
				"variant": "flip",
				"note": SpecimenNotes.Sort
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MatrixControl", $$MatrixControl, {
				"Target": "motion-sort",
				"Facets": SortFacets,
				"Name": "THE SORT",
				"Total": SortRows.length
			})} ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
				"id": "motion-sort",
				"columns": SortColumns,
				"rows": SortRows,
				"caption": "Eight classes, three columns. Narrow the facet or type in the match field: the rows travel to their new places and the table itself does not crossfade."
			})} ` })} ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"motion": ClassOf("ORIGIN"),
				"note": SpecimenNotes.Origin
			}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MotionOrigin", $$MotionOrigin, {})} ` })} ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"motion": ClassOf("SKELETON"),
				"variant": "pair",
				"note": SpecimenNotes.Skeleton
			}, { "default": ($$result) => renderTemplate` <div> ${renderComponent($$result, "MotionSkeleton", $$MotionSkeleton, {
				"marker": SkeletonSpec.marker,
				"keys": SkeletonSpec.keys,
				"waiting": SkeletonSpec.waiting,
				"age": SkeletonSpec.age
			})} </div> <div> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": SkeletonArrived.map((Row) => ({ ...Row })),
				"register": RecordArrivedRegister
			})} </div> ` })} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Sequences,
				id: "sequences"
			} }, { "default": ($$result) => renderTemplate` <div class="motion-sequences"> ${Sequences.map((Sequence) => renderTemplate`${renderComponent($$result, "MotionSequence", $$MotionSequence, { "sequence": {
				...Sequence,
				nodes: [...Sequence.nodes],
				edges: [...Sequence.edges]
			} })}`)} </div> <p class="motion-sequences__caption">${SequenceCaption}</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Fold,
				id: "fold"
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "MotionSpecimen", $$MotionSpecimen, {
				"variant": "trio",
				"note": "Three sizes of one band: three leaves, fourteen leaves with four below the frame, and none at all. The empty fold is not a failure state - it is a fold that says what it would have held."
			}, { "default": ($$result) => renderTemplate` <div> ${renderComponent($$result, "MotionFold", $$MotionFold, {
				"name": Gallery.Short.name,
				"leaves": Gallery.Short.leaves.map((Leaf) => ({ ...Leaf })),
				"empty": Gallery.Short.empty
			})} </div> <div> ${renderComponent($$result, "MotionFold", $$MotionFold, {
				"name": Gallery.Long.name,
				"leaves": Gallery.Long.leaves.map((Leaf) => ({ ...Leaf })),
				"empty": Gallery.Long.empty,
				"long": true,
				"more": Gallery.Long.more
			})} </div> <div> ${renderComponent($$result, "MotionFold", $$MotionFold, {
				"name": Gallery.Empty.name,
				"leaves": [],
				"empty": Gallery.Empty.empty
			})} </div> ` })} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Arms,
				id: "arms"
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
				"columns": ArmsColumns,
				"rows": ArmsRows,
				"caption": "Nine adverse states and the motion each one gets. Seven of them get none, which is the design: an absence, a stale reading and a refusal are facts, and a fact that moved would be a claim the page cannot support.",
				"density": "dense"
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Refusals,
				id: "refusals"
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": Refusals,
				"columns": 1
			})} ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
				...Bands.Record,
				id: "record"
			} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": RecordRows,
				"columns": 2
			})} ` })}  `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "Trail", $$Trail, {
				"slot": "head",
				"trail": TrailItems
			})}${renderComponent($$result, "QuietHead", $$QuietHead, {
				"slot": "head",
				"index": "MOTION_01",
				"label": "/STATE CHANGES WORTH WATCHING",
				"title": "What the paper moves, and what it refuses to",
				"proposition": `${ClassCount} interaction classes, three intervals and three curves. Each one is here with the artifact it is for, the interval it costs and the state change it explains - and the nine adverse states this document prints without moving at all.`,
				"rows": Facts
			})}${renderComponent($$result, "Fold", $$Fold, {
				"slot": "head",
				"Items": Contents,
				"Name": "THE REGISTERS",
				"Empty": "This page prints one subject and seven registers, so there is nothing to list. Read it top to bottom: the register, the specimens, the sequences, the fold, the arms, the refusals, the record."
			})}`,
			"rail": ($$result) => renderTemplate`${renderComponent($$result, "ShellRail", $$ShellRail, {
				"slot": "rail",
				"class": "more-rail",
				"label": "THE REGISTERS",
				"count": Registers.length,
				"items": RailRows,
				"sticky": false,
				"foot": {
					label: "THE INDEX",
					href: "/Contents"
				}
			})}`,
			"margin": ($$result) => renderTemplate`<div> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": Intervals.map((Interval) => ({
					key: Interval.key,
					value: Interval.value,
					note: Interval.note
				})),
				"register": IntervalsRegister
			})} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": Curves.map((Curve) => ({
					key: Curve.key,
					value: Curve.value,
					note: Curve.note,
					code: true
				})),
				"register": CurvesRegister,
				"class": "MotionMargin__Curves"
			})} ${renderComponent($$result, "RecordMargin", $$RecordMargin, { "note": ReducedNote })} </div>`
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
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Motion.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Motion.astro";
var $$url = "/Motion";
// \0virtual:astro:page:Source/pages/Motion@_@astro
var page = () => Motion_exports;
export { page };
