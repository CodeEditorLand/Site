import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, r as spreadAttributes, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { n as CornerTicks, t as CORNER_GEOMETRY } from "./Data_MnhqTNdc.mjs";
// Source/Component/Brand/CornerMarks.astro
createAstro("https://editor.land");
var $$CornerMarks = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CornerMarks;
	const { Inset = CORNER_GEOMETRY.Inset, Horizontal = CORNER_GEOMETRY.Horizontal, Vertical = CORNER_GEOMETRY.Vertical, Thickness = CORNER_GEOMETRY.Thickness, StemWidth = CORNER_GEOMETRY.StemWidth, Color = CORNER_GEOMETRY.Color, Opacity = CORNER_GEOMETRY.Opacity, className, ...Rest } = Astro.props;
	const Ticks = CornerTicks({
		Inset,
		Horizontal,
		Vertical,
		Thickness,
		StemWidth,
		Color,
		Opacity
	});
	return renderTemplate`${maybeRenderHead($$result)}<div aria-hidden="true"${addAttribute(["CornerMarks pointer-events-none absolute inset-0", className], "class:list")}${spreadAttributes(Rest)}> ${Ticks.map((Tick) => renderTemplate`<span class="CornerMarkTick"${addAttribute(Tick.corner, "data-corner")}${addAttribute(Tick.axis, "data-axis")}${addAttribute(Tick.style, "style")}></span>`)} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Brand/CornerMarks.astro", void 0);
// Source/Component/Brand/FieldRecordDataCard.astro
createAstro("https://editor.land");
var $$FieldRecordDataCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FieldRecordDataCard;
	const { className, class: Class, ...Rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"CornerMarkShell text-card-fg relative bg-card",
		className,
		Class
	], "class:list")} style="--card-padding-block:2.75rem;--card-padding-inline:1.5rem"${spreadAttributes(Rest)}> ${renderComponent($$result, "CornerMarks", $$CornerMarks, {})} <div style="padding:var(--card-padding-block) var(--card-padding-inline)"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Brand/FieldRecordDataCard.astro", void 0);
export { $$CornerMarks as n, $$FieldRecordDataCard as t };
