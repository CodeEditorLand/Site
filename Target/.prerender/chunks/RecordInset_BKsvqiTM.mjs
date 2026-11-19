import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordInset.astro
createAstro("https://editor.land");
var $$RecordInset = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordInset;
	const { inset, class: Class } = Astro.props;
	const StateTone = inset.state ? Tone(inset.state.toUpperCase()) ?? "ink" : void 0;
	const FigureStateTone = inset.figure?.state ? Tone(inset.figure.state.toUpperCase()) ?? "ink" : void 0;
	const Composed = Astro.slots.has("default");
	const HasFigure = inset.figure !== void 0 || Composed;
	const Bars = inset.figure?.bars ?? [];
	const Picture = inset.figure?.src !== void 0 && inset.figure.alt !== void 0 ? {
		src: inset.figure.src,
		alt: inset.figure.alt
	} : void 0;
	const Empty = inset.empty !== void 0 && !inset.body;
	return renderTemplate`${maybeRenderHead($$result)}<aside${addAttribute([
		"record-inset",
		HasFigure && "record-inset--figure",
		Class
	], "class:list")} role="note"${addAttribute(`Inset ${inset.index}${inset.label ? `: ${inset.label}` : ""}`, "aria-label")}> ${Empty ? renderTemplate`<p class="record-inset__empty"> <span class="record-inset__empty-mark" aria-hidden="true">
&#9678;
</span> ${inset.empty} </p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${HasFigure ? renderTemplate`<figure class="record-inset__figure"> ${inset.figure?.state ? renderTemplate`<div class="record-inset__frame record-inset__frame--absent"> <span class="record-inset__absent-mark" aria-hidden="true">
&#9678;
</span> <span${addAttribute(["record-inset__absent-state", `record-inset__absent-state--${FigureStateTone}`], "class:list")}> <span class="record-inset__absent-key">
STATUS:
</span> ${inset.figure.state.toUpperCase()} </span> ${inset.figure.next ? renderTemplate`<span class="record-inset__absent-next"> <span class="record-inset__absent-key">
NEXT:
</span> ${inset.figure.next} </span>` : null} </div>` : Picture ? renderTemplate`<div class="record-inset__frame"> ${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
		"src": Picture.src,
		"alt": Picture.alt,
		"className": "record-inset__picture"
	})} </div>` : Bars.length > 0 ? renderTemplate`<div class="record-inset__bars"> ${Bars.map((Bar) => renderTemplate`<div class="record-inset__bar"> <p class="record-inset__bar-head"> <span class="record-inset__bar-label"> ${Bar.label} </span> <span class="record-inset__bar-value"> ${Bar.value} </span> </p> <span class="record-inset__bar-track" aria-hidden="true"> <span class="record-inset__bar-fill"${addAttribute(`--bar-share: ${Math.max(0, Math.min(1, Bar.share))}`, "style")}></span> </span> </div>`)} ${inset.figure?.total ? renderTemplate`<p class="record-inset__total"> <span class="record-inset__total-label"> ${inset.figure.total.label} </span> <span class="record-inset__total-value"> ${inset.figure.total.value} </span> </p>` : null} </div>` : renderTemplate`<div class="record-inset__frame record-inset__frame--composed"> ${renderSlot($$result, $$slots["default"])} </div>`} ${inset.figure ? renderTemplate`<figcaption class="record-inset__figure-caption"> <span class="record-inset__figure-row"> <span class="record-inset__figure-key">
FIGURE:
</span> <span class="record-inset__figure-text"> ${inset.figure.caption} </span> </span> <span class="record-inset__figure-row"> <span class="record-inset__figure-key">
SOURCE:
</span> <span class="record-inset__figure-source"> ${inset.figure.source} </span> </span> ${inset.figure.asOf ? renderTemplate`<span class="record-inset__figure-row"> <span class="record-inset__figure-key">
AS OF:
</span> <span class="record-inset__figure-source"> ${inset.figure.asOf} </span> </span>` : null} </figcaption>` : null} </figure>` : null} <p class="record-inset__head"> <span class="record-inset__index"># ${inset.index}</span> ${inset.label ? renderTemplate`<span class="record-inset__label">/ ${inset.label}</span>` : null} </p> ${inset.state ? renderTemplate`<p${addAttribute(["record-inset__state", `record-inset__state--${StateTone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": StateTone
	})} <span class="record-inset__state-key">STATUS:</span> ${inset.state.toUpperCase()} </p>` : null} <p class="record-inset__body"> <span class="record-inset__arrow" aria-hidden="true">
&#8627;
</span> ${inset.body} </p> ${inset.link ? inset.link.state === "gone" ? renderTemplate`<p class="record-inset__gone"> <span class="record-inset__gone-mark" aria-hidden="true">
&#9678;
</span> <span class="record-inset__gone-key">TARGET GONE:</span> ${inset.link.label} <span class="record-inset__gone-route"> ${inset.link.href} </span> </p>` : renderTemplate`<p class="record-inset__link"> <a${addAttribute(inset.link.href, "href")}> <span aria-hidden="true">&#8594;</span> ${inset.link.label} </a> </p>` : null} <p${addAttribute(["record-inset__source", !inset.source && "record-inset__source--absent"], "class:list")}> <span class="record-inset__source-key">SOURCE:</span> ${inset.source ?? "UNAVAILABLE"} </p> ` })}`} </aside>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordInset.astro", void 0);
export { $$RecordInset as t };
