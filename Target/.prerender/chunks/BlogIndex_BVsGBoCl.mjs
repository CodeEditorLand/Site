import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$RecordFigure } from "./RecordFigure_B1B-tJH-.mjs";
import { Zt as createAstro, lt as $$Register } from "./Base_BVG1wSoZ.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { u as TrailOf } from "./Data_BOx5B_cB.mjs";
// Source/Component/Blog/BlogIndex.astro
createAstro("https://editor.land");
var $$BlogIndex = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogIndex;
	const { trail, heading, standfirst, rows, emptyTitle, emptyNote, backLabel, backHref, register, plateMeasures, plateCaption, plateSource } = Astro.props;
	const HeadingID = "BlogPostsHeading";
	const PlateState = rows.length === 0 ? "unavailable" : void 0;
	const Seed = (Position) => `--StaccatoSeed:${Position % 3};--StaccatoSeedPhase:${Position % 2}`;
	return renderTemplate`${maybeRenderHead($$result)}<div class="blog-index"> <div class="blog-index__open"> ${renderComponent($$result, "Trail", $$Trail, {
		"trail": TrailOf(trail),
		"class": "blog-index__trail"
	})} <header class="blog-index__head"> <h1 class="blog-index__heading"${addAttribute(HeadingID, "id")}> ${heading} </h1> ${standfirst ? renderTemplate`<p class="blog-index__standfirst">${standfirst}</p>` : null} </header> </div> <div class="blog-index__plate"> <div class="blog-index__plate-inner"> ${renderComponent($$result, "RecordFigure", $$RecordFigure, {
		"caption": plateCaption,
		"provenance": plateSource,
		"captionPlacement": "channel",
		"state": PlateState
	}, { "default": ($$result) => renderTemplate` <div class="blog-index__register"> ${renderComponent($$result, "Register", $$Register, {
		"register": register,
		"class": "blog-index__register-label"
	})} <dl class="blog-index__register-rows"> ${plateMeasures.map((Measure) => renderTemplate`<div class="blog-index__register-row"> <dt class="blog-index__register-key"> ${Measure.label}:
</dt> <dd class="blog-index__register-value"> ${Measure.value} ${Measure.unit ? renderTemplate`<span class="blog-index__register-unit"> ${Measure.unit} </span>` : null} </dd> </div>`)} </dl> </div> ` })} </div> </div> <div class="blog-index__archive-wrap"> ${rows.length === 0 ? renderTemplate`<div class="blog-index__empty"> <p class="blog-index__empty-title">${emptyTitle}</p> <p class="blog-index__empty-note">${emptyNote}</p> </div>` : renderTemplate`<section class="blog-index__archive"${addAttribute(HeadingID, "aria-labelledby")}>  <ul class="blog-index__grid PageShell__row"> ${rows.map((Row, Position) => renderTemplate`<li${addAttribute(["blog-index__item", Position === 0 ? "blog-index__item--lead" : null], "class:list")}> <a class="blog-index__link"${addAttribute(Row.href, "href")}> <article class="blog-index__card StaccatoCard"${addAttribute(Seed(Position), "style")}> ${Row.tags.length > 0 ? renderTemplate`<ul class="blog-index__tags"> ${Row.tags.map((Tag) => renderTemplate`<li class="blog-index__tag"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": "--jelly-fill:transparent;--jelly-label:var(--CardForeground);--jelly-badge-radius:0"
	}, { "default": ($$result) => renderTemplate` ${Tag} ` })} </li>`)} </ul>` : null} ${Position === 0 ? renderTemplate`<h2 class="blog-index__title"> ${Row.title} </h2>` : renderTemplate`<h3 class="blog-index__title"> ${Row.title} </h3>`} <p class="blog-index__summary"> ${Row.summary} </p> <p class="blog-index__foot"> <span class="blog-index__author"> ${Row.author} </span>  <span class="blog-index__foot-stamp"> <time class="blog-index__date"${addAttribute(Row.date, "datetime")}> ${Row.date} </time> <span class="blog-index__read"> ${Row.readTime} </span> </span> </p> </article> </a> </li>`)} </ul> </section>`} <p class="blog-index__back"> <a${addAttribute(backHref, "href")}> ${backLabel} <span aria-hidden="true"> ↑</span> </a> </p> </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Blog/BlogIndex.astro", void 0);
export { $$BlogIndex as t };
