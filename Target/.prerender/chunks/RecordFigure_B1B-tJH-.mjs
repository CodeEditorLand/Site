import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordFigure.astro
createAstro("https://editor.land");
var $$RecordFigure = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordFigure;
	const { caption, provenance, position, captionPlacement = "below", state, folio, open = false, next, class: Class } = Astro.props;
	const IsPicture = (Value) => Value.src !== void 0;
	const Image = IsPicture(Astro.props) ? {
		src: Astro.props.src,
		alt: Astro.props.alt
	} : void 0;
	const Composed = Astro.slots.has("default");
	const Channel = captionPlacement === "channel";
	const StateTone = state ? Tone(state.toUpperCase()) ?? "ink" : void 0;
	const Absent = state !== void 0;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute([
		"record-figure",
		Channel && "record-figure--channel",
		Absent && "record-figure--absent",
		open && "record-figure--open",
		Class
	], "class:list")}> ${Absent ? renderTemplate`<div class="record-figure__absent"> <span class="record-figure__absent-mark" aria-hidden="true">
&#9678;
</span> <span${addAttribute(["record-figure__absent-state", `record-figure__absent-state--${StateTone}`], "class:list")}> <span class="record-figure__absent-key">STATUS:</span> ${state.toUpperCase()} </span> ${next ? renderTemplate`<span class="record-figure__absent-next"> <span class="record-figure__absent-key">NEXT:</span> ${next} </span>` : null} </div>` : Image ? renderTemplate`<div class="record-figure__media"> ${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
		"src": Image.src,
		"alt": Image.alt,
		"position": position,
		"className": "record-figure__plate"
	})} </div>` : Composed ? renderTemplate`<div class="record-figure__media"> ${renderSlot($$result, $$slots["default"])} </div>` : null} <figcaption${addAttribute([
		"record-figure__caption",
		Channel && "record-figure__caption--channel",
		open && "record-figure__caption--open"
	], "class:list")}> ${open ? renderTemplate`<details class="record-figure__apparatus"> <summary class="record-figure__summary"> ${folio ? renderTemplate`<span class="record-figure__folio">${folio}</span>` : null} ${Channel ? renderTemplate`<span class="record-figure__row"> <span class="record-figure__key">FIGURE:</span> <span class="record-figure__caption-text"> ${caption} </span> </span>` : renderTemplate`<span class="record-figure__caption-text"> ${caption} </span>`} ${renderComponent($$result, "Mark", $$Mark, { "kind": "fold" })} </summary> <div class="record-figure__apparatus-body"> <span class="record-figure__row"> <span class="record-figure__key">SOURCE:</span> <span class="record-figure__provenance"> ${provenance ?? "UNAVAILABLE"} </span> </span> ${Image ? renderTemplate`<p class="record-figure__source-link"> <a${addAttribute(Image.src, "href")} target="_blank" rel="noreferrer"> <span aria-hidden="true">→</span> ${" "}OPEN THE SOURCE
</a> </p>` : null} </div> </details>` : Channel ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${folio ? renderTemplate`<span class="record-figure__folio">${folio}</span>` : null} <span class="record-figure__row"> <span class="record-figure__key">FIGURE:</span> <span class="record-figure__caption-text">${caption}</span> </span> <span class="record-figure__row"> <span class="record-figure__key">SOURCE:</span> <span class="record-figure__provenance"> ${provenance ?? "UNAVAILABLE"} </span> </span> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${folio ? renderTemplate`<span class="record-figure__folio">${folio}</span>` : null} <span class="record-figure__caption-text">${caption}</span> ${provenance && renderTemplate`<span class="record-figure__provenance">${provenance}</span>`} ` })}`} </figcaption> </figure>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordFigure.astro", void 0);
export { $$RecordFigure as t };
