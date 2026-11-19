import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { S as TermId, Zt as createAstro, bt as Tone, v as LettersOf, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/More/LexiconEntry.astro
createAstro("https://editor.land");
var $$LexiconEntry = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LexiconEntry;
	const { term: Entry, run: Run, class: Class } = Astro.props;
	const Id = TermId(Run, Entry.term);
	const StateTone = Entry.state ? Tone(Entry.state.toUpperCase()) ?? "ink" : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(["lexicon-entry", Class], "class:list")}${addAttribute(Id, "id")}> <div class="lexicon-entry__term"> <h3 class="lexicon-entry__name">${Entry.term}</h3> ${Entry.expansion ? renderTemplate`<p class="lexicon-entry__expansion">${Entry.expansion}</p>` : null} ${Entry.state && StateTone ? renderTemplate`<p${addAttribute(["lexicon-entry__state", `lexicon-entry__state--${StateTone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": StateTone
	})} ${Entry.state} </p>` : null} </div> <div class="lexicon-entry__body"> <p class="lexicon-entry__definition">${Entry.definition}</p> ${Entry.rows?.length ? renderTemplate`<dl class="lexicon-entry__rows"> ${Entry.rows.map((Row) => renderTemplate`<div class="lexicon-entry__row"> <dt class="lexicon-entry__row-key">${Row.key}</dt> <dd class="lexicon-entry__row-value"> ${Row.code ? renderTemplate`<code>${Row.value}</code>` : Row.value} ${Row.note ? renderTemplate`<span class="lexicon-entry__row-note"> ${Row.note} </span>` : null} </dd> </div>`)} </dl>` : null} <footer class="lexicon-entry__foot"> ${Entry.record ? renderTemplate`<p class="lexicon-entry__fact"> <span class="lexicon-entry__fact-key">RECORD:</span> <span class="lexicon-entry__fact-value"> ${Entry.record} </span> </p>` : null} ${Entry.route ? renderTemplate`<p class="lexicon-entry__fact"> <span class="lexicon-entry__fact-key">WHERE:</span> <a class="lexicon-entry__link"${addAttribute(Entry.route.href, "href")}> ${Entry.route.label} </a> </p>` : null} <p class="lexicon-entry__fact"> <span class="lexicon-entry__fact-key">SOURCE:</span> <span${addAttribute(["lexicon-entry__fact-value", Entry.source ? "lexicon-entry__fact-value--cited" : "lexicon-entry__fact-value--unavailable"], "class:list")}> ${Entry.source ?? "UNAVAILABLE"} </span> </p> </footer> </div> </article>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/More/LexiconEntry.astro", void 0);
// Source/Component/More/Lexicon.astro
createAstro("https://editor.land");
var $$Lexicon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Lexicon;
	const { run: Run, index, head = true, unit = "WORDS", class: Class } = Astro.props;
	const Letters = LettersOf(Run);
	const Label = Run.label.replace(/^\//, "");
	const Strippable = Letters.length > 1;
	return renderTemplate` ${maybeRenderHead($$result)}<div${addAttribute(["lexicon", Class], "class:list")}${addAttribute(`run-${Run.key}`, "id")}> ${head ? renderTemplate`<header class="lexicon__head"> ${index ? renderTemplate`<p class="lexicon__register"> <span class="lexicon__register-mark" aria-hidden="true">
#
</span> ${index} </p>` : null} <h2 class="lexicon__heading">${Label}</h2> <p class="lexicon__count"> ${Run.terms.length} ${unit} </p> <p class="lexicon__note">${Run.note}</p> </header>` : null} ${Run.terms.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${!head ? renderTemplate`<p class="lexicon__count"> ${Run.terms.length} ${unit} </p>` : null} ${Strippable ? renderTemplate`<nav class="lexicon__letters"${addAttribute(`${Label} letters`, "aria-label")}> ${Letters.map((Letter) => renderTemplate`<a class="lexicon__letter-link"${addAttribute(`#letter-${Run.key}-${Letter.toLowerCase()}`, "href")}> ${Letter} </a>`)} </nav>` : null} <div class="lexicon__groups"> ${Letters.map((Letter) => {
		const Terms = Run.terms.filter((Entry) => Entry.term.toUpperCase().startsWith(Letter));
		return renderTemplate`<div class="lexicon__group"${addAttribute(`letter-${Run.key}-${Letter.toLowerCase()}`, "id")}> <p class="lexicon__letter"> <span class="sr-only">
Terms beginning with${" "} </span> ${Letter} </p> <div class="lexicon__entries"> ${Terms.map((Entry) => renderTemplate`${renderComponent($$result, "LexiconEntry", $$LexiconEntry, {
			"term": Entry,
			"run": Run.key
		})}`)} </div> </div>`;
	})} </div> ` })}` : renderTemplate`<p class="lexicon__empty">${Run.empty}</p>`} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/More/Lexicon.astro", void 0);
export { $$LexiconEntry as n, $$Lexicon as t };
