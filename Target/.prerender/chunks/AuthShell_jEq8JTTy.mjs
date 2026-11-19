import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$SurfaceStatusLine } from "./SurfaceStatusLine_BA5-UTi2.mjs";
import { Zt as createAstro, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Auth/AuthShell.astro
createAstro("https://editor.land");
var $$AuthShell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AuthShell;
	const { Label, Trail: Crumbs, States = [], Declarations = [], Measure = "narrow", Frame, Center = false, Align = "start", Live = false, Bare = false } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"auth-shell",
		`auth-shell--${Measure}`,
		`auth-shell--${Align}`,
		"flex min-h-screen flex-col"
	], "class:list")}> <div class="auth-shell__body flex-1"> <section${addAttribute(Label, "aria-label")}> <div class="auth-shell__inner"> ${Crumbs ? renderTemplate`${renderComponent($$result, "Trail", $$Trail, { "trail": Crumbs })}` : null} ${Frame && renderTemplate`<header class="auth-shell__header"> <p class="auth-shell__kicker">${Frame.kicker}</p> <h1 class="auth-shell__heading type-section"> ${Frame.heading} </h1> ${Frame.sentence ? renderTemplate`<p class="auth-shell__sentence type-sub"> ${Frame.sentence} </p>` : null} </header>`}  ${States.length || Declarations.length ? renderTemplate`<div class="auth-shell__states"> ${renderComponent($$result, "SurfaceStatusLine", $$SurfaceStatusLine, {
		"states": States,
		"declarations": Declarations
	})} </div>` : null} <div${addAttribute([Center && "text-center"], "class:list")}${addAttribute(Live ? "polite" : void 0, "aria-live")}> ${Bare ? renderTemplate`${renderSlot($$result, $$slots["default"])}` : renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "auth-shell__surface StaccatoBorderShimmer StaccatoCard StaccatoShadowLift text-card-fg",
		"style": {
			"--jelly-fill": "var(--Card)",
			"--jelly-radius": "0px",
			"--jelly-card-color": "inherit",
			"--jelly-card-padding-block": "0px",
			"--jelly-card-padding-inline": "0px",
			"--jelly-card-font-size": "inherit"
		}
	}, { "default": ($$result) => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })}`} </div> ${Frame?.action ? renderTemplate`<a class="auth-shell__alternate"${addAttribute(Frame.action.href, "href")}> ${Frame.action.label} ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} </a>` : null} </div> </section> </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Auth/AuthShell.astro", void 0);
export { $$AuthShell as t };
