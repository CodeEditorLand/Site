import { E as addAttribute, b as maybeRenderHead, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, ot as LanguageOf, st as Languages } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Shell/PageShell.astro
createAstro("https://editor.land");
var $$PageShell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageShell;
	const { index, language, label, measure = "prose", railLabel, marginLabel, class: ClassName } = Astro.props;
	const Spec = language ? Languages[language] : LanguageOf(Astro.url.pathname);
	const HasRail = Astro.slots.has("rail");
	const HasMargin = Astro.slots.has("margin");
	const HasHead = Astro.slots.has("head");
	const HasFoot = Astro.slots.has("foot");
	const GivesKey = Spec.key === "record" ? "DECLARES:" : "GIVES:";
	const GivesValue = Spec.key === "record" ? "NOTHING" : Spec.gives;
	const Tracks = [
		HasRail ? "RAIL" : null,
		"PAPER",
		HasMargin ? "MARGIN" : null
	].filter((Track) => Track !== null).join(" ");
	const HasSideTracks = HasRail || HasMargin;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["PageShell", ClassName], "class:list")}${addAttribute(Spec.key, "data-layout")}${addAttribute(measure, "data-measure")}> <div class="PageShell__declaration"> <p class="PageShell__record"> <span class="PageShell__mark" aria-hidden="true">
#
</span> <span class="PageShell__word">LAYOUT</span> <span class="PageShell__slash" aria-hidden="true">
/
</span> <span class="PageShell__name">${Spec.name}</span> </p> <dl class="PageShell__facts"> <div class="PageShell__fact"> <dt class="PageShell__key">${GivesKey}</dt> <dd class="PageShell__tracks">${GivesValue}</dd> </div> ${label ? renderTemplate`<div class="PageShell__fact"> <dt class="PageShell__key">FOR:</dt> <dd class="PageShell__label">${label}</dd> </div>` : null} ${HasSideTracks ? renderTemplate`<div class="PageShell__fact PageShell__fact--tracks"> <dt class="PageShell__key">TRACKS:</dt> <dd class="PageShell__tracks PageShell__tracks--given">${Tracks}</dd> </div>` : null} </dl> ${index ? renderTemplate`<p class="PageShell__index">${index}</p>` : null} <ol class="PageShell__declares"> ${Spec.declares.map((Clause) => renderTemplate`<li class="PageShell__clause"> <span class="PageShell__clause-mark" aria-hidden="true">
↳
</span> <span class="PageShell__clause-text">${Clause}</span> </li>`)} </ol> </div> ${HasHead ? renderTemplate`<div class="PageShell__head"> ${renderSlot($$result, $$slots["head"])} </div>` : null} <div class="PageShell__grid"> ${HasRail ? renderTemplate`<aside class="PageShell__rail"${addAttribute(railLabel ?? `${Spec.name} rail`, "aria-label")}> ${renderSlot($$result, $$slots["rail"])} </aside>` : null} <div class="PageShell__main"> ${renderSlot($$result, $$slots["default"])} </div> ${HasMargin ? renderTemplate`<div class="PageShell__margin"${addAttribute(marginLabel ?? `${Spec.name} margin`, "aria-label")}> ${renderSlot($$result, $$slots["margin"])} </div>` : null} </div> ${HasFoot ? renderTemplate`<div class="PageShell__foot"> ${renderSlot($$result, $$slots["foot"])} </div>` : null} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Shell/PageShell.astro", void 0);
export { $$PageShell as t };
