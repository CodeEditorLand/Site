import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
// Source/Component/Contact/ContactHead.astro
createAstro("https://editor.land");
var $$ContactHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactHead;
	const { trail, record, heading, standfirst, width = "wide", opening = "page", state = "rest", empty, class: Class } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"contact-page__open",
		`contact-page__open--${width}`,
		`contact-page__open--${opening}`,
		Class
	], "class:list")}> ${renderComponent($$result, "Trail", $$Trail, { "trail": trail })} ${record && renderTemplate`<p class="contact-page__record"> <span class="contact-page__record-code">
# ${record.code} </span> ${record.article ? renderTemplate`<span class="contact-page__record-article">
〈${record.article}〉
</span>` : null} <span class="contact-page__record-route"> ${record.route} </span> ${record.window ? renderTemplate`<span class="contact-page__record-window">
SLA: ${record.window}d
</span>` : null} ${record.count ? renderTemplate`<span class="contact-page__record-count">
REGISTER: ${record.count} ENTRIES
</span>` : null} </p>`} ${heading && renderTemplate`<header class="contact-page__header"> <h1 class="contact-page__heading">${heading}</h1> ${standfirst ? renderTemplate`<p class="contact-page__standfirst">${standfirst}</p>` : null} </header>`} ${state === "empty" ? renderTemplate`<p class="contact-page__absent"> <span class="contact-page__absent-mark" aria-hidden="true">
◎
</span> <span class="contact-page__absent-sentence"> ${empty ?? "This route's form has not been mounted in this build, so the instrument the page exists for is not here. The record above is the route's own and is unchanged."} </span> <span class="contact-page__absent-status">STATUS: UNAVAILABLE</span> </p>` : null} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Contact/ContactHead.astro", void 0);
export { $$ContactHead as t };
