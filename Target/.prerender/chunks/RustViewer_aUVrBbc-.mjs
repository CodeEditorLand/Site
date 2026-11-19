import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Xt as renderScript, Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Doc/RustViewer.astro
createAstro("https://editor.land");
var $$RustViewer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RustViewer;
	const { crates, label, title, empty = "No crate is filed for this group, so the frame has nothing to open.", emptyNote = "The crates are read from the Rust workspace at build time; a group with none is a workspace that has not been generated yet.", id = "RustDoc" } = Astro.props;
	const First = crates.at(0);
	const FrameId = `${id}Frame`;
	return renderTemplate`${crates.length === 0 ? renderTemplate`${maybeRenderHead($$result)}<div class="doc-rust__viewer doc-rust__viewer--absent" data-state="empty"> <div class="doc-rust__absent"> <p class="doc-rust__absent-mark" aria-hidden="true">◎</p> <p class="doc-rust__absent-value">${empty}</p> <p class="doc-rust__absent-note">${emptyNote}</p> </div> </div>` : renderTemplate`<div class="doc-rust__viewer" data-state="loading" data-rust-viewer> <div class="doc-rust__bar" role="tablist"${addAttribute(label, "aria-label")}> ${crates.map((Crate, Index) => renderTemplate`<button type="button" role="tab"${addAttribute(Index === 0 ? "true" : "false", "aria-selected")}${addAttribute(FrameId, "aria-controls")}${addAttribute(Index === 0 ? 0 : -1, "tabindex")}${addAttribute(Crate.Id, "data-id")}${addAttribute(Crate.Url, "data-rustdoc-url")}${addAttribute(["doc-rust__tab", Index === 0 ? "doc-rust__tab--active" : null], "class:list")}> ${Crate.Label} </button>`)} </div>  <p class="doc-rust__state" data-rust-state> <span class="doc-rust__state-key">STATUS:</span>
LOADING
</p>  <iframe${addAttribute(FrameId, "id")} class="doc-rust__frame"${addAttribute(First?.Url, "src")}${addAttribute(title, "title")} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe> </div>`}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/RustViewer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/RustViewer.astro", void 0);
export { $$RustViewer as t };
