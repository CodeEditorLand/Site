import { c as createComponent, r as renderTemplate, a as renderHead, b as renderScript } from '../../chunks/astro/server__zXXJFoi.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                */
export { renderers } from '../../renderers.mjs';

const $$2 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-4qtwm35k> <head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><title>Animated Pixelated Text Display with Marquee</title>${renderHead()}</head> <body data-astro-cid-4qtwm35k> <canvas id="pixel-canvas" data-astro-cid-4qtwm35k></canvas> ${renderScript($$result, "D:/Developer/Application/CodeEditorLand/WebSite/Source/pages/scroll/2.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/Developer/Application/CodeEditorLand/WebSite/Source/pages/scroll/2.astro", void 0);

const $$file = "D:/Developer/Application/CodeEditorLand/WebSite/Source/pages/scroll/2.astro";
const $$url = "/scroll/2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$2,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
