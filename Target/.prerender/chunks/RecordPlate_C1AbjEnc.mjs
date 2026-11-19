import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordPlate.astro
createAstro("https://editor.land");
var $$RecordPlate = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordPlate;
	const { plate, class: Class } = Astro.props;
	const Image = plate.src !== void 0 && plate.alt !== void 0 ? {
		src: plate.src,
		alt: plate.alt
	} : void 0;
	const Composed = Astro.slots.has("default");
	const Channel = (plate.placement ?? "channel") === "channel";
	const Wide = (plate.span ?? "wide") === "wide";
	const Ratio = plate.ratio ?? (Wide ? "21 / 9" : "16 / 9");
	const StateTone = plate.state ? Tone(plate.state.toUpperCase()) ?? "ink" : void 0;
	const Absent = plate.state !== void 0;
	const Id = `plate-${plate.index.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute([
		"record-plate",
		Channel && "record-plate--channel",
		Wide && "record-plate--wide",
		Absent && "record-plate--absent",
		Class
	], "class:list")}${addAttribute(Id, "id")}${addAttribute(`--plate-ratio: ${Ratio}`, "style")}> <div class="record-plate__frame"> ${Absent ? renderTemplate`<div class="record-plate__tombstone"> <span class="record-plate__tombstone-mark" aria-hidden="true">
&#9678;
</span> <span${addAttribute(["record-plate__tombstone-state", `record-plate__tombstone-state--${StateTone}`], "class:list")}> <span class="record-plate__tombstone-key">STATUS:</span> ${plate.state?.toUpperCase()} </span> ${plate.next ? renderTemplate`<span class="record-plate__tombstone-next"> <span class="record-plate__tombstone-key">NEXT:</span> ${plate.next} </span>` : renderTemplate`<span class="record-plate__tombstone-next record-plate__tombstone-next--absent"> <span class="record-plate__tombstone-key">NEXT:</span>
UNAVAILABLE
</span>`} </div>` : Image ? renderTemplate`${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
		"src": Image.src,
		"alt": Image.alt,
		"position": plate.position,
		"className": "record-plate__picture"
	})}` : Composed ? renderTemplate`<div class="record-plate__composed"> ${renderSlot($$result, $$slots["default"])} </div>` : null} </div> <figcaption${addAttribute(["record-plate__channel", plate.open && "record-plate__channel--open"], "class:list")}> <p class="record-plate__head"> <span class="record-plate__index"># ${plate.index}</span> ${plate.label ? renderTemplate`<span class="record-plate__label">/ ${plate.label}</span>` : null} ${plate.asOf ? renderTemplate`<span class="record-plate__asof"> <span class="record-plate__asof-key">AS OF:</span> ${plate.asOf} </span>` : null} </p> ${plate.open ? renderTemplate`<details class="record-plate__apparatus"> <summary class="record-plate__row record-plate__summary"> <span class="record-plate__key">FIGURE:</span> <span class="record-plate__subject"> <span class="record-plate__arrow" aria-hidden="true">
&#8627;
</span> ${plate.subject} </span> ${renderComponent($$result, "Mark", $$Mark, { "kind": "fold" })} </summary> <div class="record-plate__apparatus-body"> ${plate.caption ? renderTemplate`<p class="record-plate__caption">${plate.caption}</p>` : null} ${plate.facts && plate.facts.length > 0 ? renderTemplate`<dl class="record-plate__facts"> ${plate.facts.map((Fact) => renderTemplate`<div class="record-plate__fact"> <dt class="record-plate__fact-key"> ${Fact.key}:
</dt> <dd class="record-plate__fact-value"> ${Fact.value} </dd> </div>`)} </dl>` : null} <p class="record-plate__source"> <span class="record-plate__source-key">SOURCE:</span> ${plate.source} </p> ${Image ? renderTemplate`<p class="record-plate__capture-link"> <a${addAttribute(Image.src, "href")} target="_blank" rel="noreferrer"> <span aria-hidden="true">→</span> ${" "}OPEN THE CAPTURE
</a> </p>` : null} </div> </details>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <p class="record-plate__row"> <span class="record-plate__key">FIGURE:</span> <span class="record-plate__subject"> <span class="record-plate__arrow" aria-hidden="true">
&#8627;
</span> ${plate.subject} </span> </p> ${plate.caption ? renderTemplate`<p class="record-plate__caption">${plate.caption}</p>` : null} ${plate.facts && plate.facts.length > 0 ? renderTemplate`<dl class="record-plate__facts"> ${plate.facts.map((Fact) => renderTemplate`<div class="record-plate__fact"> <dt class="record-plate__fact-key"> ${Fact.key}:
</dt> <dd class="record-plate__fact-value"> ${Fact.value} </dd> </div>`)} </dl>` : null} <p class="record-plate__source"> <span class="record-plate__source-key">SOURCE:</span> ${plate.source} </p> ` })}`} </figcaption> </figure>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordPlate.astro", void 0);
export { $$RecordPlate as t };
