import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Shell/ShellPlate.astro
createAstro("https://editor.land");
var $$ShellPlate = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShellPlate;
	const { index, figure, source, state, proposition, media, trace, absence, bleed = "container", height, class: ClassName } = Astro.props;
	const Resolved = state ? Tone(state) : void 0;
	const HasSlot = Astro.slots.has("default");
	const AbsenceWord = absence?.status ?? "UNAVAILABLE";
	const AbsenceTone = Tone(AbsenceWord) ?? "ink";
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute(["ShellPlate", ClassName], "class:list")}${addAttribute(bleed, "data-bleed")}${addAttribute(height ? `--PlateHeight:${height}` : void 0, "style")}> <div class="ShellPlate__grid"> <div class="ShellPlate__media"> ${trace ? renderTemplate`<div class="ShellPlate__trace"> <p class="ShellPlate__trace-mark" aria-hidden="true"> ${trace.mark} </p> <p class="ShellPlate__trace-value">${trace.value}</p> ${trace.note ? renderTemplate`<p class="ShellPlate__trace-note">${trace.note}</p>` : null} </div>` : media ? renderTemplate`<img class="ShellPlate__image"${addAttribute(media.src, "src")}${addAttribute(media.alt, "alt")}${addAttribute(media.position ? `object-position:${media.position}` : void 0, "style")}>` : HasSlot ? renderTemplate`${renderSlot($$result, $$slots["default"])}` : absence ? renderTemplate`<div class="ShellPlate__absence"${addAttribute(AbsenceWord, "data-state")}> <p${addAttribute(["ShellPlate__absence-status", `ShellPlate__absence-status--${AbsenceTone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": AbsenceTone
	})} <span class="ShellPlate__absence-key">STATUS:</span> ${AbsenceWord} </p> <dl class="ShellPlate__absence-rows"> <div class="ShellPlate__absence-row"> <dt class="ShellPlate__absence-row-key">WOULD BE HERE:</dt> <dd class="ShellPlate__absence-row-value">${absence.wouldBe}</dd> </div> <div class="ShellPlate__absence-row"> <dt class="ShellPlate__absence-row-key">WHY NOT:</dt> <dd class="ShellPlate__absence-row-value">${absence.whyNot}</dd> </div> ${absence.next ? renderTemplate`<div class="ShellPlate__absence-row"> <dt class="ShellPlate__absence-row-key">NEXT:</dt> <dd class="ShellPlate__absence-row-value"> <a class="ShellPlate__absence-action"${addAttribute(absence.next.href, "href")}> ${absence.next.label} ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} </a> </dd> </div>` : null} </dl> </div>` : null} </div> <figcaption class="ShellPlate__channel"> <p class="ShellPlate__register"> <span class="ShellPlate__mark" aria-hidden="true">
#
</span> <span class="ShellPlate__word">PLATE</span> <span class="ShellPlate__slash" aria-hidden="true">
/
</span> <span class="ShellPlate__index">${index}</span> </p> <dl class="ShellPlate__rows"> <div class="ShellPlate__row"> <dt class="ShellPlate__key">FIGURE:</dt> <dd class="ShellPlate__value">${figure}</dd> </div> <div class="ShellPlate__row"> <dt class="ShellPlate__key">SOURCE:</dt> <dd class="ShellPlate__value">${source}</dd> </div> ${state ? renderTemplate`<div class="ShellPlate__row"> <dt class="ShellPlate__key">STATE:</dt> <dd${addAttribute([
		"ShellPlate__value",
		"ShellPlate__value--state",
		Resolved ? `ShellPlate__value--${Resolved}` : null
	], "class:list")}> ${state} </dd> </div>` : null} </dl> ${proposition ? renderTemplate`<p class="ShellPlate__proposition"> <span class="ShellPlate__proposition-mark" aria-hidden="true">
&#8627;
</span> ${proposition} </p>` : null} </figcaption> </div> </figure>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Shell/ShellPlate.astro", void 0);
export { $$ShellPlate as t };
