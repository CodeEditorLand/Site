import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { C as $$RecordPair, _ as Transparency, a as Marks, b as Badge, c as Platforms, d as ReleaseCaption, f as ReleaseColumns, g as Toolchain, h as SourceAssumptions, i as Manifest, l as PreviousReleases, m as Requirements, n as InstallAction, o as OperatingSystems, p as ReleaseFacts, r as Ladder, s as PlatformTable, t as BuildSteps, u as Regions, v as Verification, w as $$DownloadMasthead, y as VerificationWell } from "./Data_DwMmaB-2.mjs";
import { t as $$FieldRecordAction } from "./FieldRecordAction_BQ8iiqlX.mjs";
import { t as FieldRecordStatus } from "./FieldRecordStatus_Ch02EVPq.mjs";
import { n as StampText, t as RouteText } from "./SemanticLedger_yaZHo2du.mjs";
import { t as $$RecordWell } from "./RecordWell_DwPpyOpV.mjs";
import { t as $$RecordInstrument } from "./RecordInstrument_fvdZRdXs.mjs";
import { t as $$RecordMatrix } from "./RecordMatrix_Dd20c_be.mjs";
import { St as Header, Zt as createAstro, ct as $$RecordLedger, it as LoadServerNamespace, rt as GetI18n, t as $$Base, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
import { t as $$FieldRecordIndex } from "./FieldRecordIndex_B-25WaIo.mjs";
import { t as FieldRecordSeal } from "./FieldRecordSeal_BQ3rw_aG.mjs";
import { t as $$RecordAside } from "./RecordAside_DoIExEdG.mjs";
import { t as $$RecordCompare } from "./RecordCompare_C-4S1U2R.mjs";
import { t as $$BandFoot } from "./BandFoot_BGOxIJt3.mjs";
import { t as $$RecordPlate } from "./RecordPlate_C1AbjEnc.mjs";
import { n as $$RecordPlateSet, t as $$RecordStamp } from "./RecordStamp_CsxbHwZe.mjs";
import { t as $$RecordTranscript } from "./RecordTranscript_DS6MtuSE.mjs";
import { i as ReleasePlateSet, r as ReleasePlate } from "./Plate_29FE9-EQ.mjs";
import { t as BuildSession } from "./Session_DEaFV_ie.mjs";
import { n as ReleaseStamp } from "./Stamp_CjQLUvWY.mjs";
import { t as RichText } from "./RichText_DN4L2Omf.mjs";
import { t as SurfaceLives } from "./Life_BQ93jaTL.mjs";
import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Code, Copy, Cpu, Eye, EyeOff, Layers, Lock, Server, Shield, Zap } from "lucide-react";
// Source/Component/Dynamic/Download/Install.astro
createAstro("https://editor.land");
var $$Install = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Install;
	const { steps, platforms, action } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="download-install"> <div class="download-install__steps"> ${steps.map((step) => renderTemplate`${renderComponent($$result, "RecordWell", $$RecordWell, {
		"label": step.label,
		"language": step.language,
		"lines": step.lines,
		"source": step.source,
		"class": "download-install__well"
	})}`)} </div> <div class="download-install__runs"> ${platforms.map((platform) => renderTemplate`<div class="download-install__run"> <div class="download-install__identity"> <p class="download-install__stamp"> ${renderComponent($$result, "StampText", StampText, { "Line": platform.name.toUpperCase() })} </p> <p class="download-install__state"> ${renderComponent($$result, "FieldRecordStatus", FieldRecordStatus, {
		"status": platform.state.status,
		"tone": platform.state.tone,
		"copy": platform.state.copy
	})} </p> </div> ${platform.run ? renderTemplate`${renderComponent($$result, "RecordWell", $$RecordWell, {
		"label": platform.run.label,
		"language": platform.run.language,
		"lines": platform.run.lines,
		"class": "download-install__command"
	})}` : renderTemplate`<p class="download-install__absence"> <span class="download-install__absence-mark" aria-hidden="true">
↳
</span> ${platform.absence} </p>`} </div>`)} </div> <p class="download-install__action"> ${renderComponent($$result, "FieldRecordAction", $$FieldRecordAction, {
		"variant": "button",
		"label": action.label,
		"href": action.href
	})} </p> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/Install.astro", void 0);
// Source/Component/Dynamic/Download/PlatformMatrix.astro
createAstro("https://editor.land");
var $$PlatformMatrix = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PlatformMatrix;
	const { matrix } = Astro.props;
	const Measured = {
		label: "/MEASURED",
		measures: [{
			label: "ARTIFACTS",
			value: "0",
			unit: "PUBLISHED",
			provenance: "NO PUBLIC RELEASE EXISTS; THE RELEASE MANIFEST CARRIES NONE",
			lead: true
		}, {
			label: "TARGETS",
			value: String(matrix.rows.length),
			unit: "PLATFORMS",
			provenance: "THE MATRIX BELOW, ONE ROW PER TARGET"
		}],
		caption: "Both figures are counted from the table under them, so a count and the rows it counts cannot disagree."
	};
	return renderTemplate`${maybeRenderHead($$result)}<div class="download-matrix"> ${renderComponent($$result, "RecordInstrument", $$RecordInstrument, {
		"measures": Measured.measures,
		"label": Measured.label,
		"caption": Measured.caption,
		"class": "download-matrix__measured"
	})} ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
		"columns": matrix.columns,
		"rows": matrix.rows,
		"caption": matrix.caption
	})} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/PlatformMatrix.astro", void 0);
// Source/Component/Dynamic/Download/PreviousReleases.astro
createAstro("https://editor.land");
var $$PreviousReleases = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PreviousReleases;
	const { releases, columns, label, empty, caption } = Astro.props;
	const Rows = releases.map((release) => ({
		label: release.version,
		cells: [
			release.published,
			release.platform,
			release.change
		]
	}));
	return renderTemplate`${maybeRenderHead($$result)}<details class="download-releases"> <summary class="download-releases__summary"> <span class="download-releases__label">${label}</span> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "fold",
		"class": "download-releases__marker"
	})} </summary> <div class="download-releases__body"> <p class="download-releases__sentence">${empty}</p> ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
		"columns": columns,
		"rows": releases.length === 0 ? [] : Rows,
		"caption": caption,
		"class": "download-releases__matrix"
	})} </div> </details>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/PreviousReleases.astro", void 0);
// Source/Component/Dynamic/Download/Record.astro
createAstro("https://editor.land");
var $$Record = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Record;
	const { record, release } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section id="release-manifest" class="download-record" aria-labelledby="release-manifest-heading"> <div class="download-record__inner"> <div class="download-record__head"> <div class="download-record__marker"> ${renderComponent($$result, "FieldRecordIndex", $$FieldRecordIndex, {
		"index": record.index,
		"className": "download-record__index"
	})} ${renderComponent($$result, "FieldRecordSeal", FieldRecordSeal, {
		"element": "Land",
		"size": "m"
	})} </div> <div class="download-record__opening"> <p class="download-record__eyebrow">${record.eyebrow}</p> <h2 class="download-record__heading" id="release-manifest-heading"> ${record.heading} </h2> </div> <div class="download-record__head-grid"> <div class="download-record__claim"> <p class="download-record__channel"> ${renderComponent($$result, "RouteText", RouteText, { "Line": `/CHANNEL:${record.channel}` })} </p> <p class="download-record__state"> ${renderComponent($$result, "FieldRecordStatus", FieldRecordStatus, {
		"status": record.state.status,
		"tone": record.state.tone,
		"copy": record.state.copy
	})} </p> <p class="download-record__note">${record.note}</p> </div> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"class": "download-record__ledger",
		"rows": release
	})} </div> </div> ${renderSlot($$result, $$slots["default"])} <div class="download-record__colophon"> <p class="download-record__footnote">${record.footnote}</p> <p class="download-record__source">${record.source}</p> </div>  ${Astro.slots.has("foot") ? renderTemplate`${renderSlot($$result, $$slots["foot"])}` : null} </div> </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/Record.astro", void 0);
// Source/Component/Dynamic/Download/Region.astro
createAstro("https://editor.land");
var $$Region = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Region;
	const { region } = Astro.props;
	const HeadingId = `${region.id}-heading`;
	return renderTemplate`${maybeRenderHead($$result)}<section class="download-region"${addAttribute(region.id, "id")}${addAttribute(HeadingId, "aria-labelledby")}> <p class="download-region__kicker">${region.kicker}</p> <h3 class="download-region__heading"${addAttribute(HeadingId, "id")}> ${region.heading} </h3> ${region.standfirst ? renderTemplate`<p class="download-region__standfirst">${region.standfirst}</p>` : null} <div class="download-region__body"> ${renderSlot($$result, $$slots["default"])} </div> ${region.footnote ? renderTemplate`<p class="download-region__footnote">${region.footnote}</p>` : null} </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/Region.astro", void 0);
// Source/Component/Dynamic/Download/Requirements.astro
createAstro("https://editor.land");
var $$Requirements = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Requirements;
	const { panels, osLabel, operatingSystems, toolchain, toolchainLabel } = Astro.props;
	const [Minimum, Recommended] = panels;
	return renderTemplate`${maybeRenderHead($$result)}<div class="download-requirements"> ${Minimum && Recommended ? renderTemplate`${renderComponent($$result, "RecordPair", $$RecordPair, {
		"class": "download-requirements__pair",
		"pair": {
			left: { label: Minimum.label },
			right: {
				label: Recommended.label,
				subject: true
			},
			caption: "The same three keys in both columns; only the figures differ. Values from Download/Data.ts.",
			heading: "h4"
		}
	}, {
		"left": ($$result) => renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"slot": "left",
			"rows": Minimum.rows
		})}`,
		"right": ($$result) => renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"slot": "right",
			"rows": Recommended.rows
		})}`
	})}` : null} <div class="download-requirements__os"> <h4 class="download-requirements__os-label">${osLabel}</h4> <ul class="download-requirements__os-list"> ${operatingSystems.map((operatingSystem) => renderTemplate`<li class="download-requirements__os-chip"> <p class="download-requirements__os-name"> ${operatingSystem.name} </p> <p class="download-requirements__os-note"> ${operatingSystem.note} </p> </li>`)} </ul> </div> ${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "download-requirements__group download-requirements__group--wide",
		"style": "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:var(--space-group);--jelly-card-padding-inline:var(--space-group)"
	}, { "default": ($$result) => renderTemplate` <h4 class="download-requirements__platform">${toolchainLabel}</h4> ${renderComponent($$result, "RecordLedger", $$RecordLedger, { "rows": toolchain })} ` })} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/Requirements.astro", void 0);
// Source/Component/Dynamic/Download/Verify.astro
createAstro("https://editor.land");
var $$Verify = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Verify;
	const { rows, well } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="download-verify"> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": rows,
		"class": "download-verify__ledger"
	})} ${renderComponent($$result, "RecordWell", $$RecordWell, {
		"label": well.label,
		"language": well.language,
		"lines": well.lines,
		"class": "download-verify__well"
	})} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Download/Verify.astro", void 0);
// Source/Component/Dynamic/DynamicTransparency.tsx
/**
* DynamicTransparency - build transparency section showing SBOM,
* dependency tree, and build reproducibility information.
*
* Renders categorized items with copy-to-clipboard and expandable
* details. Content is driven by the Transparency interface.
*
* **What it costs, and when.** The section is the download page's closing
* disclosure: everything in it is below the manifest band, so nothing here is
* needed at first paint. Its only client work is four copy-to-clipboard
* buttons, and its `client:load` directive is the page's to change.
*
* Inside the island, two things are this file's: the icon import, ten named
* icons rather than a namespace import of the whole set, and the noise engine,
* which is gated on the section approaching the viewport rather than on mount.
* The gate is defensive rather than a saving - see the note on the effect, which
* records that the ref it reads is attached to no element, so the engine has
* never been fetched at all.
*
* The markup, the centred heading, the three sub-blocks and the
* `Verify in source code` link are this file's content and are printed as
* `Content` hands them over.
*/
var TransparencyIconRegistry = {
	Shield,
	Eye,
	EyeOff,
	Lock,
	Server,
	Cpu,
	Code,
	Layers,
	Zap
};
var StatusColor = {
	Active: "bg-green-500",
	Disabled: "bg-green-500",
	Optional: "bg-yellow-500",
	Recommended: "bg-blue-500"
};
var StatusTone = {
	Active: "grpc",
	Disabled: "quiet",
	Optional: "ipc",
	Recommended: "accent",
	Available: "grpc",
	Legacy: "tcp",
	Experimental: "wasm",
	Ready: "grpc",
	Preparing: "quiet",
	Unavailable: "tcp",
	Verified: "accent"
};
var FeatureToneCycle = [
	"tcp",
	"ipc",
	"grpc",
	"wasm",
	"rust",
	"tauri",
	"effect",
	"electron",
	"accent",
	"quiet"
];
var FeatureTone = {
	"Hot Reload": "tcp",
	"Instant Preview": "ipc",
	"Development Server": "grpc",
	"Bundle-free": "wasm",
	"No Bundling": "wasm"
};
var VariantStatusColor = {
	Recommended: "bg-blue-500",
	Available: "bg-green-500",
	Legacy: "bg-yellow-500",
	Experimental: "bg-purple-500",
	Development: "bg-orange-500"
};
var DynamicTransparency = ({ Content, ClassName }) => {
	const { Title, Subtitle, Policy, Variant, Strategy, MatrixPermutation, SourceURL } = Content;
	const SectionReference = useRef(null);
	useEffect(() => {
		const Section = SectionReference.current;
		if (!Section) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let Cancelled = false;
		/**
		* The engine is fetched when the section is about to be read, not when
		* the island hydrates.
		*
		* `Function/Noise/Staccato` is three chunks (`Staccato` 1.7 kB,
		* `Noise` 0.2 kB, `simplex-noise` 0.9 kB), and it writes CSS custom
		* properties from a global frame loop - so it is worth fetching late
		* and worth fetching only once. The root margin starts the fetch a
		* viewport early, so the drift is already running by the time the
		* section is on screen.
		*
		* **This effect never runs, and nothing here makes it run.**
		* `SectionReference` is attached to no element - the `<section>` below
		* carries no `ref` - so the guard returns on every mount. Wiring it is
		* one attribute, and it is deliberately absent: `Staccato` writes to
		* `document.documentElement` from its own `requestAnimationFrame` loop,
		* so turning it on would *add* a per-frame cost to `/Download` on a page
		* whose subject is removing one. The gate is kept because it is the only
		* version of this effect that is safe to wire.
		*/
		const ApplyNoise = async () => {
			const Engine = await (await import("./Staccato_CuNyZu2b.mjs")).default;
			if (Cancelled) return;
			Engine.SeedSelector(".TransparencyCard");
		};
		if (typeof IntersectionObserver === "undefined") {
			ApplyNoise();
			return;
		}
		const Observer = new IntersectionObserver((Entries) => {
			for (const Entry of Entries) {
				if (!Entry.isIntersecting) continue;
				Observer.disconnect();
				ApplyNoise();
			}
		}, { rootMargin: "100% 0px" });
		Observer.observe(Section);
		return () => {
			Cancelled = true;
			Observer.disconnect();
		};
	}, []);
	const GetIcon = (IconName) => {
		return TransparencyIconRegistry[IconName] || null;
	};
	return /* @__PURE__ */ jsx("section", {
		id: "Transparency",
		"aria-label": "Build Transparency",
		className: `w-full py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [
				(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
					className: "StaccatoBreath mb-16 text-center",
					children: [Title && /* @__PURE__ */ jsx("h2", {
						className: "type-section mb-4",
						children: Title
					}), Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mx-auto max-w-3xl text-lg text-muted-foreground opacity-70",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-2 text-foreground",
							children: "Telemetry Policy"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-8 text-muted-foreground",
							children: "Full disclosure on what Land collects - and what it does not."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
							children: Policy.map((Item) => {
								const Icon = GetIcon(Item.Icon);
								return /* @__PURE__ */ jsxs("div", {
									className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flat flex flex-col space-y-4 bg-card p-6",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-mono text-sm font-medium text-card-foreground",
												children: Item.Title
											}), /* @__PURE__ */ jsxs("div", {
												className: "ml-4 flex items-center gap-3",
												children: [/* @__PURE__ */ jsxs(Badge, {
													tone: StatusTone[Item.Status] ?? "quiet",
													className: "StaccatoBadge",
													children: [
														Item.Status,
														" ",
														/* @__PURE__ */ jsx("span", {
															className: `StaccatoDot StaccatoRhythmDot flat h-2 w-2 ${StatusColor[Item.Status]}`,
															"aria-hidden": "true"
														})
													]
												}), Icon && /* @__PURE__ */ jsx("div", {
													className: "flat flex h-10 w-10 shrink-0 items-center justify-center bg-secondary",
													"aria-hidden": "true",
													children: /* @__PURE__ */ jsx(Icon, {
														className: "StaccatoIcon text-secondary-fg h-5 w-5",
														"aria-hidden": "true"
													})
												})]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "StaccatoBreath text-card-foreground opacity-70",
											children: /* @__PURE__ */ jsx(RichText, { Text: Item.Description })
										}),
										Item.Detail && /* @__PURE__ */ jsx("div", {
											className: "text-card-foreground opacity-50",
											children: /* @__PURE__ */ jsx(RichText, {
												Text: Item.Detail,
												Terms: true
											})
										})
									]
								}, Item.Identifier);
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-2 text-foreground",
							children: "Build Variants"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mb-8 text-foreground opacity-70",
							children: [
								Variant.length,
								" named profiles across",
								" ",
								MatrixPermutation,
								" test permutations. Every combination verified."
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full border-collapse",
								children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-[var(--Border)]",
									children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground",
											children: "Profile"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground",
											children: "Tier"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground",
											children: "Workbench"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground",
											children: "Features"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ jsx("tbody", { children: Variant.map((Item) => /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-[var(--Border)] last:border-b-0",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 font-mono text-foreground",
											children: Item.Name
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-foreground",
											children: /* @__PURE__ */ jsx(Badge, {
												tone: StatusTone[Item.Tier] ?? "quiet",
												className: "StaccatoBadge",
												children: Item.Tier
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-foreground",
											children: Item.Workbench
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-foreground opacity-70",
											children: Item.Feature
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-foreground",
											children: /* @__PURE__ */ jsxs(Badge, {
												className: "StaccatoBadge",
												children: [
													Item.Status,
													" ",
													/* @__PURE__ */ jsx("span", {
														className: `StaccatoDot flat h-2 w-2 ${VariantStatusColor[Item.Status]}`,
														"aria-hidden": "true"
													})
												]
											})
										})
									]
								}, Item.Identifier)) })]
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-2 text-foreground",
							children: "Deployment Strategies"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-8 text-foreground opacity-70",
							children: "Four deployment modes from development to production."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-6 md:grid-cols-2",
							children: Strategy.map((Item) => {
								const Icon = GetIcon(Item.Icon);
								return /* @__PURE__ */ jsxs("div", {
									className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flat flex flex-col space-y-4 bg-card p-6",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-mono text-sm font-medium text-card-foreground",
												children: Item.Name
											}), Icon && /* @__PURE__ */ jsx("div", {
												className: "flat ml-4 flex h-10 w-10 shrink-0 items-center justify-center bg-secondary",
												"aria-hidden": "true",
												children: /* @__PURE__ */ jsx(Icon, {
													className: "StaccatoIcon text-secondary-fg h-5 w-5",
													"aria-hidden": "true"
												})
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "StaccatoBreath text-card-foreground opacity-70",
											children: /* @__PURE__ */ jsx(RichText, { Text: Item.Description })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flat flex items-baseline bg-secondary px-3 py-2",
											children: [/* @__PURE__ */ jsx("code", {
												className: "text-secondary-fg font-mono",
												children: Item.Command
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: async () => {
													try {
														await navigator.clipboard.writeText(Item.Command);
													} catch {}
												},
												"aria-label": "Copy command",
												title: "Copy command",
												className: "flat RichTextCopyButton ml-2 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center opacity-50 transition-opacity hover:opacity-100",
												children: /* @__PURE__ */ jsx(Copy, {
													className: "h-[0.65em] w-[0.65em]",
													"aria-hidden": "true"
												})
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2",
											children: Item.Feature.map((FeatureName, Index) => /* @__PURE__ */ jsx(Badge, {
												tone: FeatureTone[FeatureName] ?? FeatureToneCycle[Index % FeatureToneCycle.length],
												className: "StaccatoBadge",
												children: FeatureName
											}, Index))
										})
									]
								}, Item.Identifier);
							})
						})
					]
				}),
				SourceURL && /* @__PURE__ */ jsx("div", {
					className: "text-center",
					children: /* @__PURE__ */ jsxs("a", {
						href: SourceURL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center text-foreground underline underline-offset-4 opacity-70 hover:opacity-100",
						children: ["Verify in source code", /* @__PURE__ */ jsx("span", {
							className: "InlineSeparator",
							children: /* @__PURE__ */ jsx(Code, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})
						})]
					})
				})
			]
		})
	});
};
// Source/pages/Download.astro
var Download_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Download,
	file: () => $$file,
	url: () => $$url
});
var $$Download = createComponent(($$result, $$props, $$slots) => {
	LoadServerNamespace("download");
	const T = GetI18n();
	const RegionCopy = Regions(T);
	const MetaTitle = T("meta.downloads.title", { defaultValue: "Download Code Editor Land | Source Builds and Public Release Prep" });
	const MetaDescription = T("meta.downloads.description", { defaultValue: "Code Editor Land source builds target macOS, Windows, and Linux. Public installers, signing, and verification artifacts are still being prepared." });
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "DownloadMasthead", $$DownloadMasthead, {
			"title": T("download:page.title", { defaultValue: "Download Land" }),
			"sentence": T("download:status.sentence", { defaultValue: "Nothing here is downloadable yet. Land builds from source on macOS, Windows and Linux; public installers, signing and verification artifacts are still in preparation." }),
			"marks": Marks,
			"life": SurfaceLives.DOWNLOAD.term,
			"lifeNote": SurfaceLives.DOWNLOAD.source
		})} ${renderComponent($$result, "Record", $$Record, {
			"record": Manifest(T),
			"release": ReleaseFacts(T)
		}, {
			"default": ($$result) => renderTemplate` ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Ladder }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "RecordCompare", $$RecordCompare, { "compare": Ladder() })} ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Platforms }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PlatformMatrix", $$PlatformMatrix, { "matrix": PlatformTable(T) })} ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Evidence }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="record-spread"> <div class="record-spread__plate"> ${renderComponent($$result, "RecordPlate", $$RecordPlate, { "plate": ReleasePlate })} </div> <div class="record-spread__gutter" aria-hidden="true"></div> <div class="record-spread__set"> ${renderComponent($$result, "RecordPlateSet", $$RecordPlateSet, { "set": ReleasePlateSet })} </div> </div> ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Requirements }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Requirements", $$Requirements, {
				"panels": Requirements(T),
				"osLabel": T("download:systemRequirements.supportedOS", { defaultValue: "Supported Operating Systems" }),
				"operatingSystems": OperatingSystems(T),
				"toolchain": Toolchain,
				"toolchainLabel": T("download:requirements.toolchain", { defaultValue: "BUILD TOOLCHAIN (SOURCE)" })
			})} ${renderComponent($$result, "RecordAside", $$RecordAside, { "aside": SourceAssumptions })} ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Install }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Install", $$Install, {
				"steps": BuildSteps(T),
				"platforms": Platforms(T),
				"action": InstallAction
			})} <div class="download-region__apparatus"> ${renderComponent($$result, "RecordTranscript", $$RecordTranscript, { "transcript": BuildSession })} </div> ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Verify }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Verify", $$Verify, {
				"rows": Verification(T),
				"well": VerificationWell
			})} <div class="download-region__apparatus"> ${renderComponent($$result, "RecordStamp", $$RecordStamp, { "stamp": ReleaseStamp })} </div> ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Transparency }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "DynamicTransparency", DynamicTransparency, {
				"Content": Transparency(),
				"ClassName": "download-transparency",
				"client:load": true,
				"client:component-hydration": "load",
				"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
				"client:component-export": "DynamicTransparency"
			})} ` })} ${renderComponent($$result, "Region", $$Region, { "region": RegionCopy.Previous }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PreviousReleases", $$PreviousReleases, {
				"releases": PreviousReleases,
				"columns": ReleaseColumns,
				"label": T("download:previousReleases.state", { defaultValue: "RECORD: EMPTY" }),
				"empty": T("download:previousReleases.description", { defaultValue: "No public releases yet. Older versions will appear here once public releases ship." }),
				"caption": ReleaseCaption
			})} ` })}  `,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "BandFoot", $$BandFoot, {
				"slot": "foot",
				"index": "03",
				"part": "/THE EDITION",
				"see": [
					{
						route: "/STATUS",
						href: "/Status",
						reason: "the same edition read as a board: every record's state, in the vocabulary"
					},
					{
						route: "/DOC",
						href: "/Doc",
						reason: "the manual for building from source, which is what this edition offers today"
					},
					{
						route: "/CONTENTS",
						href: "/Contents",
						reason: "the index: where this record sits in the document, and what else is in it"
					}
				],
				"figure": {
					value: "0",
					unit: "ARTIFACTS"
				},
				"source": "SOURCE/COMPONENT/DYNAMIC/DOWNLOAD/DATA.TS"
			})}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro";
var $$url = "/Download";
// \0virtual:astro:page:Source/pages/Download@_@astro
var page = () => Download_exports;
export { page };
