import { E as addAttribute, b as maybeRenderHead, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Record/RecordBand.astro
createAstro("https://editor.land");
var $$RecordBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordBand;
	const { band } = Astro.props;
	const tone = band.tone ?? "canvas";
	const interval = tone === "bare" ? void 0 : band.interval ?? "beat";
	const chapter = interval === "turn" ? "record-band--chapter" : void 0;
	const State = band.state ?? "rest";
	const Absent = State !== "rest";
	const AbsenceTone = State === "loading" ? "quiet" : "ink";
	const Absence = band.empty ?? "UNAVAILABLE";
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute([
		"record-band",
		`record-band--${tone}`,
		chapter,
		band.dense && "record-band--dense",
		Absent && "record-band--absent"
	], "class:list")}${addAttribute(band.id, "id")}${addAttribute(interval, "data-interval")}${addAttribute(State, "data-state")}> <div class="record-band__inner"> <p class="record-band__kicker">${band.kicker}</p> <h2 class="record-band__heading">${band.heading}</h2> ${band.standfirst ? renderTemplate`<p class="record-band__standfirst">${band.standfirst}</p>` : null} ${band.index?.length ? renderTemplate`<nav class="record-band__index"${addAttribute(band.heading, "aria-label")}> ${band.index.map((item) => renderTemplate`<a class="record-band__index-item"${addAttribute(item.href, "href")}> ${item.label} </a>`)} </nav>` : null} ${Absent ? renderTemplate`<div class="record-band__absent" role="status"> <p class="record-band__absent-head"> <span class="record-band__absent-mark" aria-hidden="true">
&#9678;
</span> <span class="record-band__absent-key">STATUS:</span> <span${addAttribute(["record-band__absent-state", `record-band__absent-state--${AbsenceTone}`], "class:list")}> ${State.toUpperCase()} </span> </p> <p class="record-band__absent-line">${Absence}</p> </div>` : renderTemplate`<div class="record-band__body"> ${renderSlot($$result, $$slots["default"])} </div>`} ${band.footnote ? renderTemplate`<p class="record-band__footnote">${band.footnote}</p>` : null} ${Astro.slots.has("foot") ? renderTemplate`<div class="record-band__foot"> ${renderSlot($$result, $$slots["foot"])} </div>` : null} </div> </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordBand.astro", void 0);
export { $$RecordBand as t };
