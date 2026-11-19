import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, _t as LifeOf, gt as Life, vt as LifeTerms, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Surface/SurfaceLife.astro
createAstro("https://editor.land");
var $$SurfaceLife = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceLife;
	const { term, note, dense = false, class: ClassName } = Astro.props;
	const Resolved = LifeOf(term);
	const Word = Resolved ?? Life.UNAVAILABLE;
	const Position = String(LifeTerms.indexOf(Word.term) + 1).padStart(2, "0");
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"surface__life",
		dense && "surface__life--dense",
		ClassName
	], "class:list")} role="group"${addAttribute(`LIFECYCLE: ${Word.term}`, "aria-label")}> <p class="surface__life-register"> <span class="surface__life-mark" aria-hidden="true">#</span> <span class="surface__life-word">LIFECYCLE</span> <span class="surface__life-sep" aria-hidden="true">${" / "}</span> <span class="surface__life-index">${Position}</span> <span class="surface__life-sep" aria-hidden="true">${" / "}</span> <span class="surface__life-total">${String(LifeTerms.length).padStart(2, "0")}</span> </p> <p${addAttribute(["surface__life-status", `surface__life-status--${Word.tone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": Word.tone,
		"size": Word.tone === "specimen" ? "attested" : "rest"
	})} <span class="surface__life-key">LIFECYCLE:</span> <span class="surface__life-term">${Word.term}</span> </p> <ol class="surface__life-scale"> ${LifeTerms.map((Term) => renderTemplate`<li${addAttribute([
		"surface__life-step",
		Term === Word.term && "surface__life-step--inforce",
		`surface__life-step--${Life[Term].tone}`
	], "class:list")}${addAttribute(Term === Word.term ? "true" : void 0, "aria-current")}> <span class="surface__life-step-mark" aria-hidden="true"> ${Term === Word.term ? "▪" : "·"} </span> <span class="surface__life-step-word">${Term}</span> </li>`)} </ol> ${!dense ? renderTemplate`<p class="surface__life-gloss">↳ ${Word.gloss}</p>` : null} ${Resolved === void 0 ? renderTemplate`<p class="surface__life-note"> <strong class="surface__life-note-key">NOTE:</strong> ${` `}The word handed in was not one of the five, so the block prints the
			honest one. \`PLANNED\` is the word "Coming Soon" was reaching for;
			\`RETIRED\` is the one "Disabled" was.
</p>` : null} ${note ? renderTemplate`<p class="surface__life-note">${note}</p>` : null} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceLife.astro", void 0);
export { $$SurfaceLife as t };
