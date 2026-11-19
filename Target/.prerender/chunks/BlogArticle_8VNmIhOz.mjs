import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$RecordAside } from "./RecordAside_DoIExEdG.mjs";
import { t as $$RecordInset } from "./RecordInset_BKsvqiTM.mjs";
import { Zt as createAstro, ct as $$RecordLedger } from "./Base_BVG1wSoZ.mjs";
import { t as $$RecordMargin } from "./RecordMargin_DhcIZIHx.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { u as TrailOf } from "./Data_BOx5B_cB.mjs";
// Source/Component/Blog/BlogArticle.astro
createAstro("https://editor.land");
var $$BlogArticle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogArticle;
	const { title, summary, tags, author, date, readTime, toc, trail, backLabel, backHref, summaryRows, summaryRegister, notes, insets = [], aside, registerEmpty } = Astro.props;
	const Meta = [
		{
			kind: "text",
			value: author
		},
		{
			kind: "separator",
			value: " "
		},
		{
			kind: "date",
			value: date
		},
		{
			kind: "separator",
			value: " "
		},
		{
			kind: "text",
			value: readTime
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<article class="blog-article"> ${renderComponent($$result, "Trail", $$Trail, {
		"trail": TrailOf(trail),
		"class": "blog-article__trail"
	})} <header class="blog-article__head"> ${tags.length > 0 ? renderTemplate`<ul class="blog-article__tags"> ${tags.map((Tag) => renderTemplate`<li class="blog-article__tag"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": "--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
	}, { "default": ($$result) => renderTemplate` ${Tag} ` })} </li>`)} </ul>` : null} <h1 class="blog-article__title">${title}</h1> <p class="blog-article__standfirst">${summary}</p> <p class="blog-article__meta"> ${Meta.map((Part) => Part.kind === "date" ? renderTemplate`<time class="blog-article__date"${addAttribute(Part.value, "datetime")}> ${Part.value} </time>` : Part.kind === "separator" ? renderTemplate`<span class="blog-article__separator" aria-hidden="true"> ${Part.value} </span>` : renderTemplate`<span class="blog-article__fact">${Part.value}</span>`)} </p> </header> <div class="blog-article__workspace"> <div class="blog-article__main"> <div class="blog-article__body prose-flow"> ${renderSlot($$result, $$slots["default"])} </div> <p class="blog-article__back"> <a${addAttribute(backHref, "href")}> ${backLabel} ${" "} <span aria-hidden="true">←</span> </a> </p> </div> <div class="blog-article__gutter" aria-hidden="true"></div> <aside class="blog-article__margin" aria-label="Margin: summary and notes">  <div class="blog-article__pinned"> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": summaryRows,
		"register": summaryRegister
	})} ${toc ? renderTemplate`<nav class="blog-article__register"${addAttribute(toc.label, "aria-label")}> <p class="blog-article__register-label">${toc.label}</p> <ol class="blog-article__register-list"> ${toc.items.map((Item) => renderTemplate`<li class="blog-article__register-item"> <a class="blog-article__register-link"${addAttribute(Item.href, "href")}> ${Item.label} </a> </li>`)} </ol> </nav>` : renderTemplate`<p class="blog-article__register-empty"> <span class="blog-article__register-mark" aria-hidden="true">
&#9678;
</span> ${registerEmpty} </p>`} </div> ${insets.map((Inset) => renderTemplate`${renderComponent($$result, "RecordInset", $$RecordInset, { "inset": Inset })}`)} ${notes.map((Note) => renderTemplate`${renderComponent($$result, "RecordMargin", $$RecordMargin, { "note": Note })}`)} ${aside ? renderTemplate`${renderComponent($$result, "RecordAside", $$RecordAside, { "aside": aside })}` : null} </aside> </div> </article>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Blog/BlogArticle.astro", void 0);
export { $$BlogArticle as t };
