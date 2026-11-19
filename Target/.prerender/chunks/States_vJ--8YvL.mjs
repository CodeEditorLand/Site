import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, Xt as renderScript, Zt as createAstro, ct as $$RecordLedger, ft as RegisterOf, t as $$Base, tt as $$PrintRecord, xt as $$Mark, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { t as $$Onward } from "./Onward_CHlXNaLt.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { C as Wall, S as UnaskedCount, _ as ReasonCount, a as Components, b as SingleReasonCount, c as Conditions, d as FamilyCount, f as Head, g as Onward, h as Observations, i as ComponentCount, l as DistinctReasonCount, m as MatrixCellCount, n as BuiltCount, o as ConditionCount, p as Improvements, r as CellCount, s as ConditionRows, t as Bands, u as Families, v as Reasons, w as WallCount, x as Unasked, y as Register } from "./Gallery_BvfW2wuX.mjs";
import { t as DynamicLabel } from "./DynamicLabel_CT-CcEa9.mjs";
import { t as $$MotionSkeleton } from "./MotionSkeleton_CcDDk36O.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as $$SurfaceShell } from "./SurfaceShell_Bi62faMK.mjs";
// Source/Component/Specimen/SpecimenGallery.astro
createAstro("https://editor.land");
var $$SpecimenGallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SpecimenGallery;
	const { part } = Astro.props;
	const Sheet = Families.map((Family) => ({
		family: Family,
		cells: Conditions.map((Condition) => {
			const Read = Family.components.map((Component) => Component.cells[Condition.key]);
			const Built = Read.filter((Cell) => Cell.disposition === "built").length;
			const Reasons = Read.filter((Cell) => Cell.disposition === "na").length;
			return {
				condition: Condition,
				built: Built,
				reasons: Reasons,
				unasked: Read.length - Built - Reasons,
				total: Read.length
			};
		})
	}));
	const OpensGroup = (Index) => Index > 0 && Conditions[Index].group !== Conditions[Index - 1].group;
	const Marks = new Map(Components.map((Component, Index) => [Component.id, String(Index + 1).padStart(3, "0")]));
	const Anchor = (Id) => `row-${Id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
	return renderTemplate`${part === "sheet" ? renderTemplate`${maybeRenderHead($$result)}<figure class="gallery-sheet" id="gallery-sheet"> <p class="gallery-sheet__head"> <span class="gallery-sheet__head-label">THE SHEET:</span> <span class="gallery-sheet__head-figure"> ${FamilyCount} FAMILIES × ${ConditionCount} CONDITIONS / ${CellCount} CELLS
					READ
</span> </p> <div class="gallery-sheet__scroll"> <table class="gallery-sheet__table"> <thead> <tr class="gallery-sheet__head-row"> <th class="gallery-sheet__corner" scope="col"> <span class="gallery-sheet__corner-label">FAMILY</span> <span class="gallery-sheet__corner-ask">BUILT / HOLDS</span> </th> ${Conditions.map((Condition, Index) => renderTemplate`<th${addAttribute(["gallery-sheet__head", OpensGroup(Index) && "gallery-sheet__head--group"], "class:list")} scope="col"${addAttribute(Condition.group, "data-group")}> <span class="gallery-sheet__head-label"> ${Condition.label} </span> <span class="gallery-sheet__head-ask">${Condition.ask}</span> </th>`)} <th class="gallery-sheet__total-head" scope="col"> <span class="gallery-sheet__head-label">ALL</span> <span class="gallery-sheet__head-ask">built / cells</span> </th> </tr> </thead> <tbody> ${Sheet.map((Row) => renderTemplate`<tr class="gallery-sheet__row"> <th class="gallery-sheet__name" scope="row"> <a class="gallery-sheet__name-link"${addAttribute(Row.family.href, "href")}> ${Row.family.band} </a> <span class="gallery-sheet__name-subject"> ${Row.family.subject} </span> <span class="gallery-sheet__name-count"> ${Row.family.components.length} COMPONENTS
</span> </th> ${Row.cells.map((Cell, Index) => renderTemplate`<td${addAttribute(["gallery-sheet__cell", OpensGroup(Index) && "gallery-sheet__cell--group"], "class:list")}${addAttribute(Cell.unasked === Cell.total ? "unasked" : "read", "data-disposition")}> ${Cell.unasked === Cell.total ? renderTemplate`<span class="gallery-sheet__unasked">
NOT ASKED
</span>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="gallery-sheet__figure"> ${Cell.built} <span class="gallery-sheet__of">/</span> ${Cell.total} </span> ${Cell.reasons > 0 ? renderTemplate`<span class="gallery-sheet__reasons"> ${Cell.reasons} N/A
</span>` : null} ` })}`} </td>`)} <td class="gallery-sheet__total"> <span class="gallery-sheet__figure"> ${Row.family.built} <span class="gallery-sheet__of">/</span> ${Row.family.galleryCells} </span> ${Row.family.unasked > 0 ? renderTemplate`<span class="gallery-sheet__reasons"> ${Row.family.unasked} UNASKED
</span>` : null} </td> </tr>`)} </tbody> </table> </div> <figcaption class="gallery-sheet__caption"> <span class="gallery-sheet__caption-key">READ:</span> <span class="gallery-sheet__caption-value">
A cell is that family's components that BUILD the condition, over
					the number it holds, with the count that cannot exist beneath it.
					\`NOT ASKED\` is not a zero: it is a column the family's matrix does
					not carry, and /THE UNASKED names each one against the family that
					owes it. The ALL column counts the family's own cells -${" "} ${CellCount} read in all - so the sheet's last column and the
					register's CELLS figure are the same arithmetic.
</span> </figcaption> </figure>` : renderTemplate`<div class="gallery-catalog" id="gallery-catalog"> <p class="gallery-catalog__head"> <span class="gallery-catalog__head-label">THE CATALOG:</span> <span class="gallery-catalog__head-figure"> ${ComponentCount} COMPONENTS / ONE DISCLOSURE EACH / NOTHING
					TRUNCATED
</span> </p> ${Families.map((Family) => renderTemplate`<section class="gallery-catalog__family"> <p class="gallery-catalog__family-head"> <span class="gallery-catalog__family-band"> ${renderComponent($$result, "Mark", $$Mark, { "kind": "square" })} ${Family.band} </span> <span class="gallery-catalog__family-figure"> ${Family.components.length} COMPONENTS / ${Family.folded} SPINE
							CONDITIONS ASKED / ${Family.own.length} OWN
</span> <a class="gallery-catalog__family-link"${addAttribute(Family.href, "href")}>
THE FAMILY'S OWN MATRIX
<span aria-hidden="true">→</span> </a> </p> <p class="gallery-catalog__family-subject">${Family.subject}</p> ${Family.components.map((Component) => renderTemplate`<details class="gallery-row"${addAttribute(Anchor(Component.id), "id")}> <summary class="gallery-row__summary"> <span class="gallery-row__mark" aria-hidden="true">
#
</span> <span class="gallery-row__index"> ${Marks.get(Component.id)} </span> <span class="gallery-row__name">${Component.name}</span> <span class="gallery-row__file">${Component.file}</span> <span class="gallery-row__count"> ${Component.built} OF ${ConditionCount} BUILT
</span> <span class="gallery-row__strip" aria-hidden="true"> ${Conditions.map((Condition) => renderTemplate`<span class="gallery-row__cell"${addAttribute(Component.cells[Condition.key].disposition, "data-disposition")}> ${Component.cells[Condition.key].disposition === "built" ? "▪" : Component.cells[Condition.key].disposition === "na" ? "N/A" : "—"} </span>`)} </span> </summary> <div class="gallery-row__body"> <p class="gallery-row__note"> <span class="gallery-row__note-key">WHAT IT IS:</span> ${Component.note} </p> <p class="gallery-row__source"> <span class="gallery-row__note-key">FILE:</span> ${Component.file} <span class="gallery-row__note-key">FAMILY:</span> ${Family.band} <span class="gallery-row__note-key">MATRIX:</span> ${Family.source} </p> <dl class="gallery-row__ledger"> ${Conditions.map((Condition) => {
		const Cell = Component.cells[Condition.key];
		return renderTemplate`<div class="gallery-row__line"${addAttribute(Cell.disposition, "data-disposition")}> <dt class="gallery-row__line-key"> <span class="gallery-row__line-label"> ${Condition.label} </span> <span class="gallery-row__line-column"> ${Cell.column ?? Condition.ask} </span> </dt> <dd class="gallery-row__line-value"> ${Cell.disposition === "built" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="gallery-row__verdict">BUILT:</span> ${Cell.note ?? `the family's matrix renders this condition - ${Condition.ask}.`} ` })}` : Cell.disposition === "na" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="gallery-row__verdict">N/A:</span> ${Cell.reason} ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="gallery-row__verdict">
UNASKED:
</span> ${Cell.reason}${" "} <a class="gallery-row__link" href="#unasked">
READ WHY, IN /THE UNASKED
</a> ` })}`} </dd> </div>`;
	})} </dl> </div> </details>`)} </section>`)} </div>`}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenGallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenGallery.astro", void 0);
// Source/Component/Specimen/SpecimenReasons.astro
createAstro("https://editor.land");
var $$SpecimenReasons = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SpecimenReasons;
	const { part } = Astro.props;
	return renderTemplate`${part === "reasons" ? renderTemplate`${maybeRenderHead($$result)}<div class="gallery-reasons" id="gallery-reasons"> <p class="gallery-reasons__head"> <span class="gallery-reasons__head-label">THE REASONS:</span> <span class="gallery-reasons__head-figure"> ${DistinctReasonCount} DISTINCT SENTENCES / ${Reasons.length} SHARED /${" "} ${SingleReasonCount} USED ONCE
</span> </p> ${Reasons.length === 0 ? renderTemplate`<p class="gallery-reasons__empty"> <span class="gallery-reasons__empty-key">◎ UNAVAILABLE:</span>
No sentence explains more than one cell, which would mean every
			impossible cell was written from scratch. The gallery states that
			rather than printing an empty register, because a register with no
			rows is a claim about the document that this page would be making
			without evidence.
</p>` : renderTemplate`<ol class="gallery-reasons__list"> ${Reasons.map((Reason) => renderTemplate`<li class="gallery-reasons__reason"> <p class="gallery-reasons__reason-head"> <span class="gallery-reasons__mark">〈${Reason.mark}〉</span> <span class="gallery-reasons__count"> ${Reason.count} CELLS
</span> </p> <p class="gallery-reasons__text">${Reason.text}</p> <details class="gallery-reasons__cells"> <summary class="gallery-reasons__cells-summary">
THE ${Reason.count} CELLS IT EXPLAINS
</summary> <ul class="gallery-reasons__cells-list"> ${Reason.cells.map((Where) => renderTemplate`<li class="gallery-reasons__cell">${Where}</li>`)} </ul> </details> </li>`)} </ol>`} </div>` : renderTemplate`<div class="gallery-unasked" id="unasked"> <p class="gallery-unasked__head"> <span class="gallery-unasked__head-label">THE UNASKED:</span> <span class="gallery-unasked__head-figure"> ${Unasked.reduce((Total, Entry) => Total + Entry.conditions.length, 0)}${" "}
CONDITIONS ACROSS ${Unasked.filter((Entry) => Entry.conditions.length > 0).length}${" "}
FAMILIES
</span> </p> <p class="gallery-unasked__lede">
A condition a family's matrix has no column for is not built and not
		impossible - it is unanswered, and this is the list of who owes the
		answer. Each entry prints the family's own explanation of what its matrix
		asks, then the conditions it leaves out, then the number of its
		components the answer would cover.
</p> <ol class="gallery-unasked__list"> ${Unasked.map((Entry) => renderTemplate`<li${addAttribute(["gallery-unasked__entry", Entry.conditions.length === 0 ? "gallery-unasked__entry--complete" : null], "class:list")}> <p class="gallery-unasked__entry-head"> <a class="gallery-unasked__band"${addAttribute(Entry.family.href, "href")}> ${Entry.family.band} </a> <span class="gallery-unasked__entry-figure"> ${Entry.conditions.length === 0 ? "ASKS EVERY CONDITION" : `${Entry.conditions.length} UNASKED / ${Entry.cells} CELLS`} </span> </p> <p class="gallery-unasked__gap">${Entry.family.gap}</p> ${Entry.conditions.length === 0 ? renderTemplate`<p class="gallery-unasked__conditions"> <span class="gallery-unasked__conditions-key">ASKS:</span> ${Conditions.map((Condition) => Condition.label).join(" ")} </p>` : renderTemplate`<p class="gallery-unasked__conditions"> <span class="gallery-unasked__conditions-key">DOES NOT ASK:</span> ${Entry.conditions.map((Condition) => Condition.label).join(" ")} </p>`} <p class="gallery-unasked__source"> <span class="gallery-unasked__conditions-key">MATRIX:</span> ${Entry.family.source} <span class="gallery-unasked__conditions-key">COMPONENTS:</span> ${Entry.family.components.length} <span class="gallery-unasked__conditions-key">OWN COLUMNS:</span> ${Entry.family.own.length} </p> </li>`)} </ol> </div>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenReasons.astro", void 0);
// Source/Component/Specimen/SpecimenSpine.astro
var $$SpecimenSpine = createComponent(($$result, $$props, $$slots) => {
	const Rows = ConditionRows;
	return renderTemplate`${maybeRenderHead($$result)}<figure class="gallery-spine" id="gallery-spine"> <p class="gallery-spine__head"> <span class="gallery-spine__head-label">THE SPINE:</span> <span class="gallery-spine__head-figure"> ${ConditionCount} CONDITIONS ASKED OF ${ComponentCount} COMPONENTS
</span> </p> <dl class="gallery-spine__list"> ${Rows.map((Row, Index) => renderTemplate`<div${addAttribute(["gallery-spine__row", Index > 0 && Row.condition.group !== Rows[Index - 1].condition.group ? "gallery-spine__row--group" : null], "class:list")}${addAttribute(Row.condition.group, "data-group")}> <dt class="gallery-spine__term"> <span class="gallery-spine__mark" aria-hidden="true">
#
</span> <span class="gallery-spine__index"> ${String(Index + 1).padStart(2, "0")} </span> <span class="gallery-spine__label">${Row.condition.label}</span> <span class="gallery-spine__ask">${Row.condition.ask}</span> <span class="gallery-spine__status"> ${Row.condition.status === void 0 ? renderTemplate`<span class="gallery-spine__group-word"> ${Row.condition.group.toUpperCase()} </span>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="gallery-spine__status-key">STATUS:</span> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": Row.tone ?? "ink"
	})} <span${addAttribute(["gallery-spine__status-word", `gallery-spine__status-word--${Row.tone ?? "ink"}`], "class:list")}> ${Row.condition.status} </span> ` })}`} </span> <span class="gallery-spine__figures"> <span class="gallery-spine__figure"> <span class="gallery-spine__figure-key">BUILT:</span> ${Row.built} </span> <span class="gallery-spine__figure"> <span class="gallery-spine__figure-key">N/A:</span> ${Row.reasons} </span> <span class="gallery-spine__figure"> <span class="gallery-spine__figure-key">UNASKED:</span> ${Row.unasked} </span> </span> </dt> <dd class="gallery-spine__when"> <span class="gallery-spine__when-key">WHEN IT IS RIGHT:</span> ${Row.condition.when} </dd> <dd class="gallery-spine__where"> <span class="gallery-spine__when-key">ASKED BY:</span> ${Row.families.length === 0 ? "NO FAMILY MATRIX - the arm is `ShellState`'s alone" : Row.families.join(" ")} </dd> </div>`)} </dl> <figcaption class="gallery-spine__caption"> <span class="gallery-spine__caption-key">READ:</span> <span class="gallery-spine__caption-value">
A condition is \`BUILT\` where a component renders that combination,
			\`N/A\` where the family's matrix says it cannot exist and wrote the
			reason, and \`UNASKED\` where the family's matrix has no column for it
			at all. The three figures under each condition are those three
			answers, counted down the whole document rather than across one
			family - which is why a condition no matrix asks reads \`0 / 0\` here
			and is named in /THE UNASKED below.
</span> </figcaption> </figure>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenSpine.astro", void 0);
// Source/Component/Specimen/SpecimenWall.astro
var $$SpecimenWall = createComponent(($$result, $$props, $$slots) => {
	const LabelOf = (Key) => Conditions.find((Condition) => Condition.key === Key)?.label ?? Key.toUpperCase();
	return renderTemplate`${maybeRenderHead($$result)}<figure class="gallery-wall" id="gallery-wall"> <p class="gallery-wall__head"> <span class="gallery-wall__head-label">THE WALL:</span> <span class="gallery-wall__head-figure"> ${WallCount} CONDITIONS / ONE ARTIFACT EACH / MOUNTED LIVE
</span> </p> <ol class="gallery-wall__list"> ${Wall.map((Row) => renderTemplate`<li class="gallery-wall__row"${addAttribute(`wall-${Row.condition}`, "id")}> <p class="gallery-wall__row-head"> <span class="gallery-wall__mark" aria-hidden="true">
#
</span> <span class="gallery-wall__row-index">${Row.mark}</span> <span class="gallery-wall__condition">${LabelOf(Row.condition)}</span> <span class="gallery-wall__component">${Row.component}</span> </p> <p class="gallery-wall__when"> <span class="gallery-wall__when-key">WHEN IT IS RIGHT:</span> ${Row.when} </p> <div class="gallery-wall__stage"${addAttribute(Row.stage ?? "band", "data-width")}> ${Row.kind === "state" && Row.state !== void 0 ? renderTemplate`${renderComponent($$result, "ShellState", $$ShellState, {
		"kind": Row.state.kind,
		"index": Row.state.index,
		"statement": Row.state.statement,
		"cause": Row.state.cause,
		"next": Row.state.next,
		"rows": Row.state.rows,
		"shown": Row.state.shown,
		"total": Row.state.total,
		"value": Row.state.value,
		"limit": Row.state.limit,
		"asOf": Row.state.asOf,
		"keys": Row.state.keys,
		"surface": Row.state.surface,
		"dense": Row.state.dense
	})}` : null} ${Row.kind === "field" && Row.field !== void 0 ? renderTemplate`<div class="gallery-wall__field"> ${renderComponent($$result, "DynamicLabel", DynamicLabel, {
		"Content": {
			Text: Row.field.label,
			Disabled: Row.field.disabled
		},
		"HTMLFor": `wall-field-${Row.condition}`
	})} <input class="gallery-wall__input"${addAttribute(`wall-field-${Row.condition}`, "id")} type="text"${addAttribute(Row.field.value, "value")}${addAttribute(Row.field.readonly, "readonly")}${addAttribute(Row.field.disabled, "disabled")}> ${Row.field.hint ? renderTemplate`<p class="gallery-wall__hint">${Row.field.hint}</p>` : null} </div>` : null} ${Row.kind === "ledger" && Row.ledger !== void 0 ? renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": Row.ledger.rows,
		"register": RegisterOf(Row.ledger.label, Row.ledger.rows)
	})}` : null} ${Row.kind === "print" ? renderTemplate`<div class="gallery-wall__print"> ${renderComponent($$result, "PrintRecord", $$PrintRecord, {})} <p class="gallery-wall__contract"> <span class="gallery-wall__contract-key">ON PAPER:</span>
The arm is a stylesheet, not a markup state. Five failures
								are prevented in
								\`Source/Stylesheet/System/Print/_State.scss\`: a skeleton bar
								prints as redaction, a windowed list prints as the whole set,
								an ellipsis prints as a cut, a scroll container drops its
								overflow, and a colour-only state prints as no state at all.
								Link targets print beside their labels (\`Print/_Link.scss\`),
								so a printed adverse state still says where its door is.
</p> </div>` : null} ${Row.kind === "skeleton" ? renderTemplate`<div class="gallery-wall__skeleton"> ${renderComponent($$result, "MotionSkeleton", $$MotionSkeleton, {
		"marker": "# LOADING / 04",
		"keys": [
			"TARGET:",
			"LICENSE:",
			"SIGNING:",
			"CHECKSUM:"
		],
		"waiting": "THE BUILD MANIFEST",
		"age": "0 DAYS"
	})} <p class="gallery-wall__contract"> <span class="gallery-wall__contract-key">REDUCED:</span>
The arm is a media query, so the state has no screen of its
								own - what it has is a skeleton whose bars are static in both
								arms. \`prefers-reduced-motion\` changes no meaning here,
								because the bars never moved: the schema is what the block
								prints, and motion was never carrying it.
</p> </div>` : null} </div> </li>`)} </ol> <figcaption class="gallery-wall__caption"> <span class="gallery-wall__caption-key">READ:</span> <span class="gallery-wall__caption-value">
Each row is one condition on the artifact that owns it, and the \`WHEN IT
			IS RIGHT\` line is the same sentence the spine prints - read from one
			entry rather than written twice. The stage's width is the composition
			the condition is being read in, not a property of the block: a state
			inside a 16rem column and the same state across a 60rem band are two
			compositions of one state, and both are on this wall.
</span> </figcaption> </figure>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Specimen/SpecimenWall.astro", void 0);
// Source/pages/Specimen/States.astro
var States_exports = /* @__PURE__ */ __exportAll({
	default: () => $$States,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$States = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$States;
	const MetaTitle = "States | Code Editor Land";
	const MetaDescription = `Every component of the document in every state it is asked: ${ComponentCount} components against ${ConditionCount} conditions read from the ten family matrices, ${CellCount} cells of which ${BuiltCount} are built, ${ReasonCount} cannot exist and carry a written reason, and ${UnaskedCount} are conditions no matrix asks - plus the ${Reasons.length} shared sentences that explain a class, the work list per family, the ${WallCount} conditions mounted live, and the six behaviours the unified view produced.`;
	const TrailItems = [
		{
			label: "/HOME",
			href: "/"
		},
		{
			label: "/SPECIMEN",
			href: "/Specimen"
		},
		{ label: "/STATES" }
	];
	const RegisterRows = Register();
	const CountedRegister = RegisterOf("REGISTER", RegisterRows);
	const Complete = Unasked.filter((Entry) => Entry.conditions.length === 0);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "Trail", $$Trail, {
			"trail": TrailItems,
			"class": "gallery-page__trail"
		})} ${renderComponent($$result, "SurfaceShell", $$SurfaceShell, {
			"index": Head.index,
			"title": Head.title,
			"standfirst": Head.proposition,
			"states": [Row("GALLERY", "VERIFIED")],
			"rows": [
				{
					key: "COMPONENTS:",
					value: String(ComponentCount)
				},
				{
					key: "CONDITIONS:",
					value: String(ConditionCount)
				},
				{
					key: "CELLS:",
					value: String(CellCount)
				},
				{
					key: "FAMILIES:",
					value: String(FamilyCount)
				}
			]
		}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Spine,
			id: "spine"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenSpine", $$SpecimenSpine, {})} ${maybeRenderHead($$result)}<p class="gallery-page__note">
The spine is the gallery's vocabulary and its unit at once: a
				condition is a column on every other band of this page, and the
				word it answers to is §1.5's. Eight words state a record's
				condition; the twelve conditions without one are shapes and
				contexts, and the cell prints the group rather than leaving a
				blank - a blank cell in a table of dispositions is an excuse where
				a fact belongs.
${` `}The figure under each condition is the transposed view no
				family matrix can print, because a family knows its own rows and
				not the document's. It is also where an unasked condition shows
				itself: a condition reading \`0 / 0\` is one no matrix asks at all,
				and /THE UNASKED names the family that would have to.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Sheet,
			id: "sheet"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenGallery", $$SpecimenGallery, { "part": "sheet" })} <p class="gallery-page__note">
Ten families against ${ConditionCount} conditions, and every figure
				in the grid is counted from the family's own rows: a component
				added to \`Frame.ts\` moves a cell here in the same edit. The matrix
				reads the same tables the family's own matrix reads, through the
				same \`MatrixCell\`, so the two cannot disagree - which is the only
				property a term sheet has to have.
${` `}The ten matrices print ${MatrixCellCount} cells between them in
				their own column sets; this page reads ${CellCount} because it asks
				every component every condition, including the ones a family's
				matrix never put a column against.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Catalog,
			id: "catalog"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenGallery", $$SpecimenGallery, { "part": "catalog" })} <p class="gallery-page__note">
Each row is a disclosure, and that is the card's one piece of
				advanced behaviour: the browser's own \`details\` / \`summary\`
				element gives the keyboard path, the strip gives the scan, and the
				open row gives the evidence in full. A footnote per cell would be
				thousands of numbers to chase at this scale, and a reason
				truncated to fit a six-rem column would be an excuse rather than a
				fact.
${` `}The row's address is stable -${" "} <code>/Specimen/States#row-frame-shell</code> opens one component's
				ledger - because the first thing a reader does with a term sheet is
				send someone a line of it.
${` `}Each line names its condition and the family's own column it was
				read from; the sentence that says when that condition is right is
				printed once in /THE SPINE rather than four thousand times here,
				which is the difference between a term sheet and a wall of repeated
				prose.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Reasons,
			id: "reasons"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenReasons", $$SpecimenReasons, { "part": "reasons" })} <p class="gallery-page__note"> ${DistinctReasonCount} distinct sentences explain the document's
				impossible cells, and ${Reasons.length} of them explain more than
				one: those are the sentences that say what a CLASS of parts cannot
				be, and they are printed here in full. The rest are written per
				component and print inside that component's own row above, which is
				where a reader who wants one reason will look.
${` `}The grouping is exact - identical text, nothing inferred, no
				sentence shortened - so the register can be checked against the
				cells it claims.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Unasked,
			id: "unasked"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenReasons", $$SpecimenReasons, { "part": "unasked" })} <p class="gallery-page__note"> ${UnaskedCount} cells are neither built nor impossible: they are
				conditions a family's matrix has no column for, and this band is
				the work list. ${Complete.length === 0 ? "No family asks every condition on the spine, which is the finding rather than a failure - ten matrices were written for ten subjects, and each one left the other nine's questions to the others." : `${Complete.length} of the ${FamilyCount} families ask every condition on the spine.`} ${` `}The list is sorted by the size of the hole, so a card that
				picks this up starts where the most cells are unaccounted for.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Wall,
			id: "wall"
		} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "SpecimenWall", $$SpecimenWall, {})} <p class="gallery-page__note">
The wall is the page's proof that the spine is not a taxonomy: each
				condition is mounted on the artifact that owns it, and the \`WHEN IT
				IS RIGHT\` line is the same sentence the spine prints, read from one
				entry rather than written twice. Two rows - \`ON PAPER\` and
				\`REDUCED\` - cannot be photographed on screen at all, and print the
				contract they expose instead.
${` `}Nothing here is a screenshot: a picture of a state cannot be
				composed with, and this page exists so that the next composition
				can start from a state rather than from a mock.
</p> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Improvements,
			id: "changes"
		} }, { "default": ($$result) => renderTemplate` <div class="gallery-page__changes"> <p class="gallery-page__changes-head"> <span class="gallery-page__changes-label">IMPROVEMENTS:</span> <span class="gallery-page__changes-figure"> ${Improvements.length} BEHAVIOURS / EACH WITH THE CELL BEHIND IT
</span> </p> <ol class="gallery-page__changes-list"> ${Improvements.map((Improvement) => renderTemplate`<li class="gallery-page__change"> <p class="gallery-page__change-head"> <span class="gallery-page__change-component"> ${Improvement.component} </span> <span class="gallery-page__change-from">
FROM: ${Improvement.from} </span> </p> <p class="gallery-page__change-found"> <span class="gallery-page__change-key">FOUND:</span> ${Improvement.found} </p> <p class="gallery-page__change-now"> <span class="gallery-page__change-key">NOW:</span> ${Improvement.now} </p> </li>`)} </ol> <p class="gallery-page__changes-head"> <span class="gallery-page__changes-label">OBSERVATIONS:</span> <span class="gallery-page__changes-figure"> ${Observations.length} THINGS THIS CARD DID NOT FIX
</span> </p> <ol class="gallery-page__changes-list"> ${Observations.map((Observation) => renderTemplate`<li class="gallery-page__change"> <p class="gallery-page__change-head"> <span class="gallery-page__change-component"> ${Observation.subject} </span> <span class="gallery-page__change-from">
OWNER: ${Observation.owner} </span> </p> <p class="gallery-page__change-found"> <span class="gallery-page__change-key">NOTE:</span> ${Observation.note} </p> </li>`)} </ol> </div> ` })} ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
			...Bands.Register,
			id: "register"
		} }, {
			"default": ($$result) => renderTemplate` <div class="gallery-page__register"> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"rows": RegisterRows,
				"columns": 2,
				"register": CountedRegister
			})} </div>  `,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "Onward", $$Onward, {
				"slot": "foot",
				"rows": Onward.rows,
				"copy": Onward.copy
			})}`
		})} ` })} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Specimen/States.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Specimen/States.astro";
var $$url = "/Specimen/States";
// \0virtual:astro:page:Source/pages/Specimen/States@_@astro
var page = () => States_exports;
export { page };
