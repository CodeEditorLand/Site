import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro, rt as GetI18n } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$RecordBand } from "./RecordBand_-2ERi8bg.mjs";
// Source/Component/Doc/DocAppendix.astro
createAstro("https://editor.land");
var $$DocAppendix = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocAppendix;
	const { appendix, state = "rest", empty, keys } = Astro.props;
	const Panel = appendix.Kind;
	const LoadingKeys = keys ?? [
		"DESTINATION",
		"ROUTE",
		"NOTE"
	];
	const Badges = appendix.Index ?? [];
	const StripAbsent = state === "rest" && Panel === "architecture" && Badges.length === 0;
	return renderTemplate`${maybeRenderHead($$result)}<section class="doc-appendix"${addAttribute(appendix.Id, "id")}> <h2 class="doc-section__heading">${appendix.Heading}</h2> <div class="doc-appendix__panel"${addAttribute(state, "data-state")}> <p class="doc-appendix__lede">${appendix.Lede}</p> ${state === "empty" ? renderTemplate`<p class="doc-appendix__absent" data-state="empty"> <span class="doc-appendix__absent-mark" aria-hidden="true">
◎
</span> ${empty ?? "The destinations this panel lists have not been read in this build, so it states what would be here rather than printing an empty body."} </p>` : state === "loading" ? renderTemplate`<dl class="doc-appendix__keys" aria-busy="true"> ${LoadingKeys.map((Key) => renderTemplate`<div class="doc-appendix__key"> <dt class="doc-appendix__key-label">${Key}:</dt> <dd class="doc-appendix__key-value"> <span class="doc-appendix__bar" aria-hidden="true"></span> </dd> </div>`)} </dl>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${Panel === "architecture" ? StripAbsent ? renderTemplate`<p class="doc-appendix__absent" data-state="empty"> <span class="doc-appendix__absent-mark" aria-hidden="true">
◎
</span>
STATUS:${" "}UNAVAILABLE
</p>` : renderTemplate`<ul class="doc-badges"> ${Badges.map((Entry) => renderTemplate`<li class="doc-badges__item"> <a class="doc-badge"${addAttribute(Entry.href, "href")}> ${Entry.label} </a> </li>`)} </ul>` : null} ${Panel === "backend" ? renderTemplate`<ul class="doc-services"> ${appendix.Rows.map((Row) => renderTemplate`<li class="doc-services__item"> <a class="doc-services__link"${addAttribute(Row.Href, "href")}${addAttribute(Row.Blank ? "_blank" : void 0, "target")}${addAttribute(Row.Blank ? "noopener noreferrer" : void 0, "rel")}> ${Row.Label} <span class="doc-appendix__arrow" aria-hidden="true">
↗
</span> </a>${" "} <span class="doc-services__note">- ${Row.Note}</span> </li>`)} </ul>` : null} ${Panel === "deployments" ? renderTemplate`<ul class="doc-tiles"> ${appendix.Rows.map((Row) => renderTemplate`<li class="doc-tiles__item"> <a class="doc-tile"${addAttribute(Row.Href, "href")}${addAttribute(Row.Blank ? "_blank" : void 0, "target")}${addAttribute(Row.Blank ? "noopener noreferrer" : void 0, "rel")}> <span class="doc-tile__label"> ${Row.Label} <span class="doc-appendix__arrow" aria-hidden="true">
↗
</span> </span> ${Row.Note ? renderTemplate`<span class="doc-tile__note">${Row.Note}</span>` : null} </a> </li>`)} </ul>` : null} ${Panel === "architecture" ? renderTemplate`<div class="doc-appendix__foot"> ${appendix.Rows.map((Row) => renderTemplate`<a class="doc-appendix__link"${addAttribute(Row.Href, "href")}${addAttribute(Row.Blank ? "_blank" : void 0, "target")}${addAttribute(Row.Blank ? "noopener noreferrer" : void 0, "rel")}> ${Row.Label} <span class="doc-appendix__arrow" aria-hidden="true">
↗
</span> </a>`)} </div>` : null} ` })}`} </div> </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocAppendix.astro", void 0);
// Source/Component/Doc/DocCard.astro
createAstro("https://editor.land");
var $$DocCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocCard;
	const { card, level = 3, absent = "DESCRIPTION: UNAVAILABLE" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li${addAttribute(["doc-card", level === 2 ? "doc-card--feature" : null], "class:list")}> ${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "doc-card__surface",
		"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0"
	}, { "default": ($$result) => renderTemplate` <a class="doc-card__link"${addAttribute(card.Href, "href")}${addAttribute(card.Blank ? "_blank" : void 0, "target")}${addAttribute(card.Blank ? "noopener noreferrer" : void 0, "rel")}> ${level === 2 ? renderTemplate`<h2 class="doc-card__title">${card.Label}</h2>` : renderTemplate`<h3 class="doc-card__title">${card.Label}</h3>`} ${card.Note ? renderTemplate`<p class="doc-card__note">${card.Note}</p>` : renderTemplate`<p class="doc-card__note doc-card__note--absent" data-state="empty"> <span class="doc-card__mark" aria-hidden="true">
◎
</span> ${absent} </p>`} </a> ` })} </li>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocCard.astro", void 0);
// Source/Component/Record/RecordEntry.astro
createAstro("https://editor.land");
var $$RecordEntry = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordEntry;
	const { index, name, glyph, chips, body, href, state, empty, facts, note, dense, class: ClassName, surface = "card" } = Astro.props;
	const State = state ?? "rest";
	const Absent = State === "empty" || State === "loading";
	const Absence = empty ?? "UNAVAILABLE";
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute([
		"record-entry",
		`record-entry--${surface}`,
		dense && "record-entry--dense",
		Absent && "record-entry--absent",
		State === "archived" && "record-entry--archived",
		ClassName
	], "class:list")}${addAttribute(State, "data-state")}> <p class="record-entry__index">${index}</p> ${glyph ? renderTemplate`<span class="record-entry__glyph" aria-hidden="true"> ${glyph} </span>` : null} <h3 class="record-entry__name"> ${href ? renderTemplate`<a class="record-entry__link"${addAttribute(href, "href")}> <span class="record-entry__arrow" aria-hidden="true">
→
</span> ${" "} ${name} </a>` : name} </h3> ${chips?.length ? renderTemplate`<ul class="record-entry__chips"> ${chips.map((chip) => renderTemplate`<li class="record-entry__chip">${chip}</li>`)} </ul>` : null} ${State !== "rest" ? renderTemplate`<p${addAttribute(["record-entry__state", `record-entry__state--${Absent ? "ink" : "quiet"}`], "class:list")}> <span class="record-entry__state-key">STATUS:</span> ${State.toUpperCase()} </p>` : null} ${Absent ? renderTemplate`<p class="record-entry__absent"> <span class="record-entry__absent-mark" aria-hidden="true">
&#9678;
</span> ${Absence} </p>` : renderTemplate`<p class="record-entry__body">${body}</p>`} ${facts && facts.length > 0 ? renderTemplate`<dl class="record-entry__facts"> ${facts.map((Fact) => renderTemplate`<div class="record-entry__fact"> <dt class="record-entry__fact-key">${Fact.key}</dt> <dd class="record-entry__fact-value">${Fact.value}</dd> </div>`)} </dl>` : null} ${note ? renderTemplate`<p class="record-entry__note"> <span class="record-entry__note-key">SOURCE:</span> ${note} </p>` : null} </article>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordEntry.astro", void 0);
// Source/Component/Doc/DocIndex.astro
createAstro("https://editor.land");
var $$DocIndex = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocIndex;
	const { section } = Astro.props;
	const T = GetI18n();
	const Pages = T("archive.pages", { defaultValue: "PAGES" });
	const Kicker = `/${section.Heading.toUpperCase()}\u2001${section.Rows.length}\u2001${Pages}`;
	const Absent = `◎ ${T("index.note.absent", {
		ns: "doc",
		defaultValue: "DESCRIPTION: UNAVAILABLE"
	})}`;
	const Marker = (Position) => String(Position + 1).padStart(2, "0");
	return renderTemplate`${maybeRenderHead($$result)}<div class="doc-section"${addAttribute(section.Id, "id")}> ${renderComponent($$result, "RecordBand", $$RecordBand, { "band": {
		kicker: Kicker,
		heading: section.Heading,
		tone: "bare"
	} }, { "default": ($$result) => renderTemplate` <ul class="doc-grid"> ${section.Rows.map((Card, Position) => renderTemplate`<li class="doc-card"> ${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "doc-card__surface",
		"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:0;--jelly-card-padding-inline:0"
	}, { "default": ($$result) => renderTemplate` <a class="doc-card__link"${addAttribute(Card.Href, "href")}${addAttribute(Card.Blank ? "_blank" : void 0, "target")}${addAttribute(Card.Blank ? "noopener noreferrer" : void 0, "rel")}> ${renderComponent($$result, "RecordEntry", $$RecordEntry, {
		"index": Marker(Position),
		"name": Card.Label,
		"glyph": Card.Blank ? "↗" : "→",
		"body": Card.Note ?? Absent,
		"surface": "bare"
	})} </a> ` })} </li>`)} </ul> ` })} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocIndex.astro", void 0);
export { $$DocAppendix as i, $$RecordEntry as n, $$DocCard as r, $$DocIndex as t };
