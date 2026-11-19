import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as FieldRecordStatus } from "./FieldRecordStatus_Ch02EVPq.mjs";
// Source/Component/Record/RecordInstrument.astro
createAstro("https://editor.land");
var $$RecordInstrument = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordInstrument;
	const { measures, label, caption, empty, class: Class, state = "rest" } = Astro.props;
	const HasFigure = (measure) => measure.state === void 0;
	const Loading = state === "loading";
	const Cells = measures.length > 0 ? measures : Array.from({ length: 3 }, (_, Index) => ({
		label: `MEASURE_${String(Index + 1).padStart(2, "0")}`,
		value: "",
		provenance: "PENDING"
	}));
	const Empty = !Loading && (state === "empty" || measures.length === 0);
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["record-instrument", Class], "class:list")}${addAttribute(state, "data-state")}${addAttribute(Loading ? "true" : void 0, "aria-busy")}> ${label ? renderTemplate`<p class="record-instrument__label">${label}</p>` : null} ${Loading ? renderTemplate`<div class="record-instrument__panel"> ${Cells.map((measure) => renderTemplate`<div${addAttribute([
		"record-instrument__measure",
		"record-instrument__measure--skeleton",
		measure.lead ? "record-instrument__measure--lead" : null
	], "class:list")}> <p class="record-instrument__key">${measure.label}:</p> <p class="record-instrument__figure" data-figure="loading"> <span class="record-instrument__bar" aria-hidden="true"></span> </p> <p class="record-instrument__source"> <span class="record-instrument__source-key">
SOURCE:
</span>${" "} ${measure.provenance} </p> </div>`)} </div>` : !Empty ? renderTemplate`<div class="record-instrument__panel"> ${measures.map((measure) => renderTemplate`<div${addAttribute([
		"record-instrument__measure",
		measure.lead ? "record-instrument__measure--lead" : null,
		measure.total ? "record-instrument__measure--total" : null
	], "class:list")}> <p class="record-instrument__key">${measure.label}:</p> <p class="record-instrument__figure"${addAttribute(HasFigure(measure) ? "value" : "state", "data-figure")}> ${HasFigure(measure) ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="record-instrument__value"> ${measure.value} </span> ${measure.unit ? renderTemplate`<span class="record-instrument__unit"> ${measure.unit} </span>` : null} ` })}` : renderTemplate`${renderComponent($$result, "FieldRecordStatus", FieldRecordStatus, { "status": measure.state })}`} </p> <p class="record-instrument__source"> <span class="record-instrument__source-key">
SOURCE:
</span>${" "} ${measure.provenance} ${measure.asOf ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="record-instrument__separator"> ${" "} </span> <span class="record-instrument__as-of">
AS OF: ${measure.asOf} </span> ` })}` : null} </p> </div>`)} </div>` : empty ? renderTemplate`<p class="record-instrument__empty"> <span class="record-instrument__empty-mark" aria-hidden="true">
◎
</span>${" "} ${empty} </p>` : null} ${caption ? renderTemplate`<p class="record-instrument__caption">${caption}</p>` : null} </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordInstrument.astro", void 0);
export { $$RecordInstrument as t };
