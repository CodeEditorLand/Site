import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordMatrix.astro
createAstro("https://editor.land");
var $$RecordMatrix = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordMatrix;
	const { columns, rows, caption, density = "rest", class: Class, id, state = "rest", empty } = Astro.props;
	const shellClass = [
		"record-matrix",
		density === "dense" ? "record-matrix--dense" : null,
		Class
	].filter(Boolean).join(" ");
	const valueAt = (row, index) => row.cells?.[index] ?? "";
	const markOf = (value) => {
		const normalised = value.trim().toLowerCase();
		if (normalised === "yes") return " record-matrix__cell--yes";
		if (normalised === "no") return " record-matrix__cell--no";
		const tone = Tone(value);
		return tone === void 0 ? "" : ` record-matrix__cell--state record-matrix__cell--${tone}`;
	};
	const isState = (value) => Tone(value) !== void 0;
	const columnClass = (column) => `record-matrix__column${column.align === "center" ? " record-matrix__column--center" : ""}`;
	const cellClass = (column, value) => `record-matrix__cell${column.align === "center" ? " record-matrix__cell--center" : ""}${markOf(value)}`;
	const stateTone = (value) => Tone(value) ?? "ink";
	const EmptyText = empty ?? "No row is recorded for this comparison yet. The head prints because the columns are still the schema - what is being compared is known before the values are - and the body states the absence rather than leaving a blank.";
	const Skeleton = [
		0,
		1,
		2
	];
	const Span = columns.length + 1;
	const Busy = state === "loading";
	const Empty = state === "empty" || !Busy && rows.length === 0;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(shellClass, "class")}${addAttribute(id, "id")}> <table class="record-matrix__table"${addAttribute(Busy ? "true" : void 0, "aria-busy")}> ${caption && renderTemplate`<caption class="record-matrix__caption">${caption}</caption>`} <thead> <tr class="record-matrix__head"> <td class="record-matrix__corner"></td> ${columns.map((column) => renderTemplate`<th scope="col"${addAttribute(columnClass(column), "class")}${addAttribute(column.ink ? `--col-ink:var(--${column.ink})` : void 0, "style")}> ${column.label} </th>`)} </tr> </thead> <tbody> ${Busy ? Skeleton.map((Index) => renderTemplate`<tr class="record-matrix__row record-matrix__row--skeleton"> <th scope="row" class="record-matrix__label">
FACT_${String(Index + 1).padStart(2, "0")} </th> ${columns.map((column) => renderTemplate`<td${addAttribute(cellClass(column, ""), "class")}> <span class="record-matrix__bar" aria-hidden="true"></span> </td>`)} </tr>`) : Empty ? renderTemplate`<tr class="record-matrix__row record-matrix__row--empty"> <td class="record-matrix__empty"${addAttribute(Span, "colspan")}> <span class="record-matrix__empty-mark" aria-hidden="true">
◎
</span>${" "} ${EmptyText} </td> </tr>` : rows.map((row) => renderTemplate`<tr${addAttribute(["record-matrix__row", row.total && "record-matrix__row--total"], "class:list")}> <th scope="row" class="record-matrix__label"> ${row.label} </th>  ${row.total === true && row.cells.length === 1 && columns.length > 1 ? renderTemplate`<td class="record-matrix__cell"${addAttribute(columns.length, "colspan")}> ${valueAt(row, 0)} </td>` : columns.map((column, index) => {
		const value = valueAt(row, index);
		return renderTemplate`<td${addAttribute(cellClass(column, value), "class")}> ${isState(value) ? renderTemplate`<span class="record-matrix__state"> ${renderComponent($$result, "Mark", $$Mark, {
			"kind": "square",
			"fill": value.trim().toLowerCase() === "loading" ? "loading" : "unknown",
			"tone": stateTone(value)
		})} ${value} </span>` : value} </td>`;
	})} </tr>`)} </tbody> </table> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordMatrix.astro", void 0);
export { $$RecordMatrix as t };
