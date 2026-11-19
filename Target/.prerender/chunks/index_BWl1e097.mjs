import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, k as unescapeHTML, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { c as $$ArchitectureBand, i as $$PlatformBand, m as HeroBandFor, n as $$RoadmapBand, o as $$FeatureBand, p as DynamicHeroSection, t as $$WorkingBand } from "./WorkingBand_CXLuw9WY.mjs";
import { St as Header, Zt as createAstro, ct as $$RecordLedger, it as LoadServerNamespace, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$RecordStage } from "./RecordStage_Gz3AmIfZ.mjs";
// Source/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://editor.land");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	LoadServerNamespace("home", "download");
	const T = GetI18n();
	const MetaTitle = T("meta.home.title", { defaultValue: "Code Editor Land | Rust and Tauri Editor Stack" });
	const MetaDescription = T("meta.home.description", { defaultValue: "Code Editor Land is an open-source editor stack built with Rust, Tauri, and a VS Code-compatible extension host. Source builds are active while public installers and full extension coverage are still in progress." });
	const SiteURL = Astro.site?.href ?? "";
	const HeroBand = HeroBandFor(T);
	const HeroContent = { PrimaryCTA: { Href: "/Download" } };
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`   ${renderComponent($$result, "DynamicHeroSection", DynamicHeroSection, {
			"client:load": true,
			"Content": HeroContent,
			"Band": HeroBand,
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicHeroSection.tsx",
			"client:component-export": "DynamicHeroSection"
		}, {
			"ledger": ($$result) => renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"slot": "ledger",
				"rows": HeroBand.facts,
				"class": "hero-band__facts"
			})}`,
			"stage": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="hero-band__trace-stage"> ${renderComponent($$result, "RecordStage", $$RecordStage, {
				"stages": HeroBand.steps,
				"orientation": "row"
			})} </div>`
		})} ${renderComponent($$result, "FeatureBand", $$FeatureBand, {})} ${renderComponent($$result, "RoadmapBand", $$RoadmapBand, {})} ${renderComponent($$result, "ArchitectureBand", $$ArchitectureBand, {})} ${renderComponent($$result, "WorkingBand", $$WorkingBand, {})} ${renderComponent($$result, "PlatformBand", $$PlatformBand, {})} <div class="home-band__inner"> <div class="home-close"> <p class="home-close__label">/MARKS</p> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="20" height="20"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "mint",
			"shape": "square",
			"style": "--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
		}, { "default": ($$result) => renderTemplate`
Telemetry Feature Gated&#x2001;
<span class="home-close__dot" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "mint",
			"shape": "square",
			"style": "--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
		}, { "default": ($$result) => renderTemplate`
CC0 Licensed&#x2001;
<img src="/Image/CC0.svg" alt="" width="12" height="12" aria-hidden="true"> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "azure",
			"shape": "square",
			"style": "--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
		}, { "default": ($$result) => renderTemplate`
Rust&#x2001;
<img src="/Image/Rust.svg" alt="" width="12" height="12" aria-hidden="true">
&#x2001;+&#x2001;Tauri&#x2001;
<img src="/Image/Tauri.svg" alt="" width="12" height="12" aria-hidden="true"> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "platinum",
			"shape": "square",
			"outline": true,
			"style": "--jelly-label:var(--Foreground);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
		}, { "default": ($$result) => renderTemplate`
VS Code API In Progress
` })} <a class="home-close__link" href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "platinum",
			"shape": "square",
			"outline": true,
			"style": "--jelly-label:var(--Foreground);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
		}, { "default": ($$result) => renderTemplate`
PlayForm
` })} </a> <a class="home-close__link" href="/"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "platinum",
			"shape": "square",
			"outline": true,
			"style": "--jelly-label:var(--Foreground);--jelly-badge-radius:0;--jelly-badge-font-size:13px"
		}, { "default": ($$result) => renderTemplate`
CodeEditorLand
` })} </a> </div> </div> `,
		"Head": ($$result) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "Head" }, { "default": ($$result) => renderTemplate` <script crossorigin=\"anonymous\" type="application/ld+json">${unescapeHTML(JSON.stringify({
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			name: "Code Editor Land",
			alternateName: "Land",
			description: "An open-source editor stack built with Rust, Tauri, and a VS Code-compatible extension host. Source builds are active while public installers and full extension coverage are still in progress.",
			url: SiteURL,
			applicationCategory: "DeveloperApplication",
			operatingSystem: "macOS, Windows, Linux",
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD"
			},
			license: "https://creativecommons.org/publicdomain/zero/1.0/",
			softwareVersion: "Pre-release",
			downloadUrl: `${SiteURL}Download`,
			screenshot: `${SiteURL}Favicon/og-image.png`,
			author: [
				{
					"@type": "Person",
					name: "Nikola R. Hristov",
					url: "https://github.com/NikolaRHristov"
				},
				{
					"@type": "Organization",
					name: "Code Editor Land",
					url: SiteURL
				},
				{
					"@type": "Organization",
					name: "PlayForm",
					url: "https://PlayForm.Cloud"
				}
			],
			publisher: {
				"@type": "Organization",
				name: "Code Editor Land",
				url: SiteURL,
				logo: {
					"@type": "ImageObject",
					url: `${SiteURL}Favicon/favicon.svg`
				}
			},
			featureList: [
				"Native Rust backend with gRPC IPC",
				"VS Code API compatibility through Cocoon",
				"Effect-TS type-safe UI services",
				"Source build targets for macOS, Windows, and Linux",
				"Open source under CC0 license"
			],
			isAccessibleForFree: true
		}))}<\/script>` })}`,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro";
// \0virtual:astro:page:Source/pages/index@_@astro
var page = () => pages_exports;
export { page };
