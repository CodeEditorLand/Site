import { c as createComponent, r as renderTemplate, a as renderHead, b as renderScript } from '../../chunks/astro/server__zXXJFoi.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                */
export { renderers } from '../../renderers.mjs';

const $$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-s4432i7o> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Continuous Drawing Pixelated Text Display</title>${renderHead()}</head> <body data-astro-cid-s4432i7o> <canvas id="pixel-canvas" data-astro-cid-s4432i7o></canvas> ${renderScript($$result, "D:/Developer/Application/CodeEditorLand/WebSite/Source/pages/scroll/1.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/Developer/Application/CodeEditorLand/WebSite/Source/pages/scroll/1.astro", void 0);

const $$file = "D:/Developer/Application/CodeEditorLand/WebSite/Source/pages/scroll/1.astro";
const $$url = "/scroll/1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$1,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
