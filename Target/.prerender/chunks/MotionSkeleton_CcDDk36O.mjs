import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Motion/MotionSkeleton.astro
createAstro("https://editor.land");
var $$MotionSkeleton = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MotionSkeleton;
	const { marker: Marker, keys: Keys, waiting: Waiting, age: Age, empty: Empty = "The record's own field names have not arrived either, so this block can state that it is waiting and not what it is waiting for.", class: Class } = Astro.props;
	const WidthOf = (Key) => Math.min(72, Math.max(24, 24 + Key.length * 3));
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["MotionSkeleton", Class], "class:list")} data-motion="skeleton" aria-busy="true"> <p class="MotionSkeleton__Marker">${Marker}</p> ${Keys.length === 0 ? renderTemplate`<p class="MotionSkeleton__Empty"> <span class="MotionSkeleton__EmptyMark" aria-hidden="true">
◎
</span> ${Empty} </p>` : renderTemplate`<dl class="MotionSkeleton__Rows"> ${Keys.map((Key) => renderTemplate`<div class="MotionSkeleton__Row"> <dt class="MotionSkeleton__Key">${Key}</dt> <dd class="MotionSkeleton__Value" aria-hidden="true"> <span class="MotionSkeleton__Bar"${addAttribute(`--bar: ${WidthOf(Key)}%`, "style")}></span> </dd> </div>`)} </dl>`} <p class="MotionSkeleton__Wait"> <span aria-hidden="true">↳</span> WAITING ON: ${Waiting} ${Age ? renderTemplate`<span class="MotionSkeleton__Age"> / ${Age}</span>` : null} </p> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionSkeleton.astro", void 0);
export { $$MotionSkeleton as t };
