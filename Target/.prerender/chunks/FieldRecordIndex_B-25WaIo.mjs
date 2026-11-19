import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Brand/FieldRecordIndex.astro
createAstro("https://editor.land");
var $$FieldRecordIndex = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FieldRecordIndex;
	const { index, className, class: Class } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute([
		"text-field-s font-mono uppercase tracking-widest",
		className,
		Class
	], "class:list")} style="color:var(--CardForeground)">
# ${index} </span>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Brand/FieldRecordIndex.astro", void 0);
export { $$FieldRecordIndex as t };
