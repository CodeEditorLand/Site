import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, k as unescapeHTML, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Xt as renderScript, Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$RecordPlate } from "./RecordPlate_C1AbjEnc.mjs";
// Source/Component/Doc/DocContentsList.astro
createAstro("https://editor.land");
var $$DocContentsList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocContentsList;
	const { items, class: Class } = Astro.props;
	const Marker = (Position) => String(Position + 1).padStart(2, "0");
	return renderTemplate`${maybeRenderHead($$result)}<ol${addAttribute(["doc-contents__list", Class], "class:list")}> ${items.map((Item, Position) => renderTemplate`<li class="doc-contents__item"> <a class="doc-contents__link"${addAttribute(Item.Href, "href")}> <span class="doc-contents__marker" aria-hidden="true"> ${Marker(Position)} </span> <span class="doc-contents__name">${Item.Label}</span> </a> </li>`)} </ol>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocContentsList.astro", void 0);
// Source/Component/Doc/DocContents.astro
createAstro("https://editor.land");
var $$DocContents = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocContents;
	const { toc, variant = "rail", collapsible = false, dense = false, class: Class } = Astro.props;
	const Items = toc?.Items ?? [];
	const Label = toc?.Label ?? "";
	const Count = String(Items.length).padStart(2, "0");
	const RootClass = (Base) => [
		"doc-contents",
		Base,
		collapsible ? "doc-contents--fold" : null,
		dense ? "doc-contents--dense" : null,
		Class
	].filter((Part) => Part !== null).join(" ");
	return renderTemplate`${Items.length > 0 ? variant === "disclosure" ? renderTemplate`${maybeRenderHead($$result)}<details${addAttribute(RootClass("doc-contents--disclosure"), "class")} data-doc-contents> <summary class="doc-contents__summary"> <span class="doc-contents__label">${Label}</span> <span class="doc-contents__count">${Count}</span> <span class="doc-contents__marker" aria-hidden="true">
›
</span> </summary> <nav class="doc-contents__nav"${addAttribute(Label, "aria-label")}> ${renderComponent($$result, "DocContentsList", $$DocContentsList, { "items": Items })} </nav> </details>` : collapsible ? renderTemplate`<details${addAttribute(RootClass("doc-contents--rail"), "class")} open data-doc-contents> <summary class="doc-contents__summary"> <span class="doc-contents__label">${Label}</span> <span class="doc-contents__count">${Count}</span> <span class="doc-contents__marker" aria-hidden="true">
›
</span> </summary> <nav class="doc-contents__nav"${addAttribute(Label, "aria-label")}> ${renderComponent($$result, "DocContentsList", $$DocContentsList, { "items": Items })} </nav> </details>` : renderTemplate`<nav${addAttribute(RootClass("doc-contents--rail"), "class")}${addAttribute(Label, "aria-label")} data-doc-contents> <p class="doc-contents__label"> <span class="doc-contents__label-text">${Label}</span> <span class="doc-contents__count">${Count}</span> </p> ${renderComponent($$result, "DocContentsList", $$DocContentsList, { "items": Items })} </nav>` : null}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocContents.astro", void 0);
// Source/Component/Doc/DocArticle.astro
createAstro("https://editor.land");
var $$DocArticle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocArticle;
	const { kicker, title, standfirst, standfirstHtml, strip, contents, measure = true, plate, crumbs, source, class: Class, state = "rest", empty, keys } = Astro.props;
	const LoadingKeys = keys ?? [
		"SECTION",
		"HEADING",
		"BLOCK"
	];
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(["doc-article", Class], "class:list")}> ${crumbs?.length ? renderTemplate`<nav class="doc-article__crumbs" aria-label="Breadcrumb"> <ol class="doc-article__crumb-list"> ${crumbs.map((Crumb) => renderTemplate`<li class="doc-article__crumb"> ${Crumb.href ? renderTemplate`<a class="doc-article__crumb-link"${addAttribute(Crumb.href, "href")}> ${Crumb.label} </a>` : renderTemplate`<span class="doc-article__crumb-current" aria-current="page"> ${Crumb.label} </span>`} </li>`)} </ol> </nav>` : null} <header class="doc-article__header"> ${kicker ? renderTemplate`<p class="doc-article__kicker">${kicker}</p>` : null} <h1 class="doc-article__title">${title}</h1> ${standfirst ? renderTemplate`<p class="doc-article__standfirst">${standfirst}</p>` : null} ${standfirstHtml && renderTemplate`<p class="doc-article__standfirst">${unescapeHTML(standfirstHtml)}</p>`} </header> ${strip?.length ? renderTemplate`<p class="doc-article__strip"> ${strip.map((Item, Position) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${Position > 0 ? renderTemplate`<span class="doc-article__separator" aria-hidden="true"> ${" "} </span>` : null} <span class="doc-article__field"> <span class="doc-article__label">${Item.Label}</span> <span${addAttribute(["doc-article__value", Item.Tone ? `doc-article__value--${Item.Tone}` : null], "class:list")}> ${Item.Value} </span> </span> ` })}`)} </p>` : null} ${plate ? renderTemplate`<div class="doc-article__plate"> ${renderComponent($$result, "RecordPlate", $$RecordPlate, { "plate": plate })} </div>` : null} ${contents && contents.Items.length > 0 ? renderTemplate`<div class="doc-article__contents"> ${renderComponent($$result, "DocContents", $$DocContents, {
		"toc": contents,
		"variant": "disclosure"
	})} </div>` : null} <div${addAttribute(["doc-article__body", measure ? "doc-article__body--measure" : null], "class:list")}${addAttribute(source, "data-doc-source")}${addAttribute(state, "data-state")}> ${state === "empty" ? renderTemplate`<div class="doc-article__absent" data-state="empty"> <p class="doc-article__absent-mark" aria-hidden="true">
◎
</p> <p class="doc-article__absent-value"> ${empty ?? "This page has no prose in this build: its source has not been set, so there is nothing to read here yet."} </p> <p class="doc-article__absent-note">
STATUS:${" "}UNAVAILABLE
</p> </div>` : state === "loading" ? renderTemplate`<dl class="doc-article__keys" aria-busy="true"> ${LoadingKeys.map((Key) => renderTemplate`<div class="doc-article__key"> <dt class="doc-article__key-label">${Key}:</dt> <dd class="doc-article__key-value"> <span class="doc-article__bar" aria-hidden="true"></span> </dd> </div>`)} </dl>` : renderTemplate`${renderSlot($$result, $$slots["default"])}`} </div> </article>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocArticle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocArticle.astro", void 0);
export { $$DocContents as n, $$DocContentsList as r, $$DocArticle as t };
