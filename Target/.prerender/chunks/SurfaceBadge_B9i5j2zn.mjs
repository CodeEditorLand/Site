import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Surface/Badge.ts
/** Every tone the dashboard prints. */
var BadgeInk = {
	grpc: {
		fill: "SpinegRPCMute",
		label: "SpinegRPCFore",
		variant: "mint",
		dot: "SpinegRPC"
	},
	mute: {
		fill: "Mute",
		label: "MuteForeground",
		variant: "platinum",
		dot: "MuteForeground"
	},
	ipc: {
		fill: "SpineIPCMute",
		label: "SpineIPCFore",
		variant: "azure",
		dot: "SpineIPC"
	},
	tauri: {
		fill: "ExtensionTauriMute",
		label: "ExtensionTauriFore",
		variant: "amber",
		dot: "ExtensionTauri"
	},
	wasm: {
		fill: "SpineWASMMute",
		label: "SpineWASMFore",
		variant: "platinum",
		dot: "SpineWASM"
	},
	tcp: {
		fill: "SpineTCPMute",
		label: "SpineTCPFore",
		variant: "platinum",
		dot: "SpineTCP"
	}
};
// Source/Component/Surface/SurfaceBadge.astro
createAstro("https://editor.land");
var $$SurfaceBadge = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceBadge;
	const { label, tone = "mute", dot = false } = Astro.props;
	const Ink = BadgeInk[tone];
	const Style = [
		`--jelly-fill:var(--${Ink.fill})`,
		`--jelly-label:var(--${Ink.label})`,
		"--jelly-badge-radius:0",
		"--jelly-badge-font-size:13px"
	].join(";");
	return renderTemplate`${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"shape": "square",
		"variant": Ink.variant,
		"style": Style
	}, { "default": ($$result) => renderTemplate` ${label} ${dot ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${" "} ${maybeRenderHead($$result)}<span class="flat h-1.5 w-1.5" aria-hidden="true"${addAttribute(`background-color:var(--${Ink.dot})`, "style")}></span> ` })}` : null} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceBadge.astro", void 0);
export { $$SurfaceBadge as t };
