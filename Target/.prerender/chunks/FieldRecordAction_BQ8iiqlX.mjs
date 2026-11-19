import { E as addAttribute, b as maybeRenderHead, d as renderComponent, r as spreadAttributes, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Brand/FieldRecordAction/Data.ts
/**
* The button arm's jelly ink: radius, height, inline padding, min width, and
* the accent pair the element fills with. Values are the site's own tokens
* wherever a token exists; 44px / 2.6rem are the button arm's own geometry.
*/
var BUTTON_INK = "--jelly-button-radius:var(--RadiusButton);--jelly-button-height:44px;--jelly-button-padding-inline:2.6rem;--jelly-button-min-width:0px;--jelly-color-background-accent:var(--Foreground);--jelly-color-foreground-on-accent:var(--Background)";
/**
* The link attributes an external action carries, and nothing at all for an
* internal one: `target` without `rel` would leak the opener, so the pair is
* one value that is either present together or absent.
*/
var ExternalLink = (href) => href?.startsWith("http") ? {
	target: "_blank",
	rel: "noopener noreferrer"
} : {};
// Source/Component/Brand/FieldRecordAction.astro
createAstro("https://editor.land");
var $$FieldRecordAction = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FieldRecordAction;
	const { label, href, variant = "record", className } = Astro.props;
	const Link = ExternalLink(href);
	return renderTemplate`${variant === "button" ? renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${spreadAttributes(Link)}${addAttribute(["FieldRecordActionButton inline-block", className], "class:list")}> ${renderComponent($$result, "jelly-button", "jelly-button", {
		"squish": true,
		"style": BUTTON_INK
	}, { "default": ($$result) => renderTemplate` <span class="font-mono text-sm font-medium uppercase tracking-wider"> ${label} </span> ` })} </a>` : renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
		"text-field-s font-mono uppercase tracking-wider",
		"underline-offset-4 hover:underline",
		className
	], "class:list")} style="color:var(--Accent)">
/${label} </a>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Brand/FieldRecordAction.astro", void 0);
export { $$FieldRecordAction as t };
