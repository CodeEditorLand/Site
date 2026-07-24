import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as unescapeHTML, M as createAstro, c as Fragment$2, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { i as IconTooltip, n as GetI18n, o as ThemeImage, r as ErrorBoundary, t as $$Base } from "./Base_DhBMo2T1.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_wkpfoPSt.mjs";
import { t as DynamicButton } from "./DynamicButton_BZmnCNU8.mjs";
import { i as SkeletonPricingTier, n as SkeletonCard, r as SkeletonFeatureCard } from "./Skeleton_Ch27QRaB.mjs";
import { t as RichText } from "./RichText_DBA558mF.mjs";
import { n as DynamicPlatformGrid, t as Badge } from "./Badge_MJAvnnQ8.mjs";
import { useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import { useTranslation } from "react-i18next";
//#region Source/Component/Dynamic/DynamicFeatures.tsx
/**
* Icon registry: direct imports so icons render in initial HTML,
* not after a dynamic import resolves on the client.
*/
var FeatureIconRegistry = {
	Zap: lucide.Zap,
	Box: lucide.Box,
	Cpu: lucide.Cpu,
	Globe: lucide.Globe,
	Wrench: lucide.Wrench,
	Heart: lucide.Heart,
	Sparkles: lucide.Sparkles,
	Code: lucide.Code,
	Layers: lucide.Layers,
	Package: lucide.Package,
	Puzzle: lucide.Puzzle,
	Server: lucide.Server,
	Shield: lucide.Shield,
	Database: lucide.Database
};
/**
* Semantic color map per feature ID - maps each feature to its design token.
* Used for the card header icon color and the icon stack in the description.
*/
var FeatureColorMap = {
	performance: "var(--ExtensionRust)",
	compatibility: "var(--SpineWASM)",
	architecture: "var(--ExtensionEffectTypeScript)",
	"cross-platform": "var(--ExtensionTauri)",
	tooling: "var(--ToolBiome)",
	opensource: "var(--SpinegRPC)"
};
/** 12% tinted backgrounds for icon containers - matches the *Mute token convention. */
var FeatureColorMuteMap = {
	performance: "var(--ExtensionRustMute)",
	compatibility: "var(--SpineWASMMute)",
	architecture: "var(--ExtensionEffectTypeScriptMute)",
	"cross-platform": "var(--ExtensionTauriMute)",
	tooling: "var(--ToolBiomeMute)",
	opensource: "var(--SpinegRPCMute)"
};
/**
* Human-readable labels for every icon in the registry.
* These flow into aria-label, title, and Radix tooltip text via IconTooltip.
*/
var FeatureIconLabelMap = {
	Zap: "Mountain runs native services through Tauri outside the WebView, dispatched via the ActionEffect system",
	Box: "Cocoon hosts VS Code extensions with Effect-TS across a dual-track architecture",
	Cpu: "Rust services run at native speed without Electron overhead",
	Globe: "One Tauri source tree compiles to macOS, Windows, and Linux",
	Wrench: "Rust, Tauri, Effect-TS, Biome, and OXC form the toolchain",
	Heart: "CC0 public domain - free to use, fork, and ship",
	Layers: "Effect-TS provides typed errors and dependency injection across Wind and Cocoon service layers",
	Puzzle: "Extensions run unmodified through Cocoon where their APIs are implemented",
	Server: "gRPC connects Mountain, Cocoon, Air, and Grove via typed protocol contracts",
	Shield: "Verified request path where implemented",
	Sparkles: "Active development across all element repos",
	Code: "Rust and TypeScript across native and service layers",
	Package: "Tauri bundles to native platform packages with no Chromium"
};
/**
* Per-icon semantic color - each icon has its OWN color based on what it
* represents in the technology stack, independent of which feature card
* it appears in. This ensures visual delineation across the color matrix.
*/
var IconSemanticColorMap = {
	Zap: "var(--ExtensionRust)",
	Cpu: "var(--LanguageRust)",
	Server: "var(--SpinegRPC)",
	Box: "var(--SpineWASM)",
	Puzzle: "var(--ExtensionEffectTypeScript)",
	Code: "var(--LanguageTypeScript)",
	Layers: "var(--SpineTCP)",
	Shield: "var(--ExtensionTauri)",
	Globe: "var(--ExtensionTauri)",
	Package: "var(--ToolEsBuild)",
	Database: "var(--SpineTCP)",
	Wrench: "var(--ToolBiome)",
	Heart: "var(--ExtensionRust)",
	Sparkles: "var(--ToolOxc)"
};
/**
* Dynamic Features with simplex noise integration.
* Cards get StaccatoCard + Attention scatter for organic layout.
* Icons render immediately via direct imports (no dynamic import delay).
* All icons are wrapped in IconTooltip - aria-label, title, and hover tooltip.
*/
var DynamicFeatures = ({ Content, ClassName }) => {
	const { Title, Subtitle, Features, Columns = 3, Gap = "lg" } = Content;
	const GridReference = useRef(null);
	const GapClass = {
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
		xl: "gap-12"
	};
	const ColumnClass = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
	};
	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyScatter = async () => {
			const Attention = await (await import("./Attention_zLx5VfOw.mjs")).default;
			Grid.querySelectorAll(".FeatureCard").forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 6, 4);
			});
			(await (await import("./Staccato_CIruj3za.mjs")).default).SeedSelector(".FeatureCard");
		};
		ApplyScatter();
	}, [Features]);
	const GetIcon = (IconName) => FeatureIconRegistry[IconName] || null;
	return /* @__PURE__ */ jsx("section", {
		id: "features",
		"aria-labelledby": "FeaturesHeading",
		className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-grpc",
								children: "//"
							}),
							" ",
							"Features"
						]
					}),
					Title && /* @__PURE__ */ jsx("h2", {
						id: "FeaturesHeading",
						className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
						children: Title
					}),
					Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mt-3 text-muted",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				ref: GridReference,
				className: `StaccatoMorphGap grid min-h-0 items-start ${ColumnClass[Columns]} ${GapClass[Gap]} mx-auto max-w-6xl`,
				children: Features.map((Feature) => {
					const Icon = GetIcon(Feature.Icon);
					const IconLabel = FeatureIconLabelMap[Feature.Icon] ?? Feature.Title;
					const FeatureColor = FeatureColorMap[Feature.Id] ?? "var(--Primary)";
					const FeatureColorMute = FeatureColorMuteMap[Feature.Id] ?? "var(--Mute)";
					return /* @__PURE__ */ jsx("jelly-card", {
						title: Feature.Id === "performance" ? "Mountain and Echo run native Rust services\nthrough Tauri outside the WebView,\ndispatched via ActionEffect." : Feature.Id === "compatibility" ? "Cocoon extension host runs\nunmodified VS Code extensions\nvia Effect-TS across a dual-track architecture." : Feature.Id === "architecture" ? "Effect-TS Layer stacks provide:\n• Typed errors\n• Structured concurrency\n• Compile-time dependency tracking" : Feature.Id === "cross-platform" ? "Tauri compiles one codebase\nto native macOS, Windows, and Linux apps\nvia platform WebViews." : Feature.Id === "tooling" ? "Built on:\n• Rust\n• Tauri\n• Effect-TS\n• Biome\n• OXC\n\nFor modern developer tooling." : Feature.Id === "opensource" ? "CC0 1.0 Universal\npublic domain dedication.\n\nFunded by NLnet NGI0 Commons Fund." : void 0,
						className: "FeatureCard min-h-0 flat p-8",
						style: {
							"--jelly-fill": "var(--Card)",
							"--jelly-radius": "0",
							"--jelly-card-padding-block": "0",
							"--jelly-card-padding-inline": "0",
							"--jelly-color-border-default": FeatureColor,
							"--jelly-card-font-size": "inherit"
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-mono text-sm font-semibold leading-snug",
									children: Feature.Title
								}), /* @__PURE__ */ jsx("div", {
									className: "ml-4 flex h-9 w-9 shrink-0 items-center justify-center flat",
									style: { backgroundColor: FeatureColorMute },
									children: /* @__PURE__ */ jsx(IconTooltip, {
										Label: IconLabel,
										Icon: Icon ?? lucide.Sparkles,
										Color: FeatureColor,
										SizeClass: "h-4 w-4",
										ClassName: "StaccatoIcon"
									})
								})]
							}), /* @__PURE__ */ jsxs("p", {
								className: "StaccatoBreath text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ jsx(RichText, { Text: Feature.Description }),
									/* @__PURE__ */ jsx("br", {}),
									Feature.Icons && Feature.Icons.length > 0 && /* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center align-middle",
										role: "img",
										"aria-label": `${Feature.Title} technology stack`,
										children: Feature.Icons.map((IconName, IconIndex) => {
											const IsBrandSvg = IconName.startsWith("/");
											const StackIcon = IsBrandSvg ? null : FeatureIconRegistry[IconName];
											const StackLabel = FeatureIconLabelMap[IconName] ?? IconName.replace(/^\/Image\/|\.svg$/g, "");
											const StackColor = IconSemanticColorMap[IconName] ?? FeatureColor;
											if (!IsBrandSvg && !StackIcon) return null;
											return /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center",
												children: [IconIndex === 0 ? " " : /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", " "] }), IsBrandSvg ? /* @__PURE__ */ jsx(IconTooltip, {
													Label: StackLabel,
													children: /* @__PURE__ */ jsx(ThemeImage, {
														src: IconName,
														alt: StackLabel,
														width: 16,
														height: 16,
														className: "inline h-4 w-4",
														"aria-hidden": "true"
													})
												}) : /* @__PURE__ */ jsx(IconTooltip, {
													Label: StackLabel,
													Icon: StackIcon,
													Color: StackColor,
													SizeClass: "h-4 w-4"
												})]
											}, IconIndex);
										})
									})
								]
							})]
						})
					}, Feature.Id);
				})
			})]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicBadge.tsx
/**
* Dynamic Badge with simplex noise integration.
* Wraps the base Badge with StaccatoBadge for breathing scale.
* The status dot pulses with StaccatoRhythm for a heartbeat effect.
*/
var DynamicBadge = ({ Content, ClassName }) => {
	const { Text, Variant = "default", ShowDot = false, DotColor = "green", ClassName: ContentClassName, ...props } = Content;
	const DotColorTokenMap = {
		green: "var(--SpinegRPC)",
		yellow: "var(--SpineTCP)",
		red: "var(--Destruct)",
		blue: "var(--SpineIPC)"
	};
	return /* @__PURE__ */ jsxs(Badge, {
		variant: Variant,
		className: `${ContentClassName || ""} ${ClassName || ""}`,
		...props,
		children: [Text, ShowDot && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx("span", {
			className: "StaccatoDot StaccatoRhythmDot h-2 w-2 flat",
			style: { backgroundColor: DotColorTokenMap[DotColor] ?? "var(--SpinegRPC)" },
			"aria-hidden": "true"
		})] })]
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicHeroSection.tsx
/**
* Dynamic HeroSection with simplex noise integration.
* Desktop: orbital layout with staccato float animation.
* The entire hero can act as a button (clickable CTA surface).
* Floating cards are noise-seeded for organic staccato movement.
*/
var DynamicHeroSection = ({ Content, ClassName }) => {
	const SceneReference = useRef(null);
	const SectionReference = useRef(null);
	const { Title, TitleHighlight, Subtitle, PrimaryCta: PrimaryCTA, SecondaryCta: SecondaryCTA, FloatingCards: FloatingCard = [], ...HeroConfiguration } = Content;
	useEffect(() => {
		SceneReference.current;
	}, [HeroConfiguration.RespectReducedMotion]);
	const HandleHeroClick = () => {
		if (PrimaryCTA?.Href) window.location.href = PrimaryCTA.Href;
	};
	return /* @__PURE__ */ jsxs("section", {
		ref: SectionReference,
		id: "hero",
		"aria-label": "Hero",
		className: `StaccatoHeroButton relative flex min-h-0 w-full items-start overflow-hidden pb-12 pt-20 lg:items-center lg:pb-24 lg:pt-32 ${ClassName || ""}`,
		onClick: HandleHeroClick,
		onKeyDown: (Event) => {
			if (Event.key === "Enter" || Event.key === " ") {
				Event.preventDefault();
				HandleHeroClick();
			}
		},
		role: "button",
		tabIndex: 0,
		children: [/* @__PURE__ */ jsx("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-0 hidden dark:block",
			style: {
				backgroundImage: "linear-gradient(var(--Border) 1px, transparent 1px), linear-gradient(90deg, var(--Border) 1px, transparent 1px)",
				backgroundSize: "48px 48px",
				maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
				WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)"
			}
		}), /* @__PURE__ */ jsxs("div", {
			className: "container relative mx-auto px-4 text-center",
			children: [
				Content.Badge && /* @__PURE__ */ jsx(DynamicBadge, {
					Content: Content.Badge,
					ClassName: "StaccatoBadge mb-8"
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "StaccatoColorShift mx-auto max-w-4xl font-serif text-6xl font-normal leading-[0.95] tracking-[-0.01em] md:text-8xl lg:text-9xl",
					children: [
						Title,
						Title && TitleHighlight ? " " : "",
						TitleHighlight && /* @__PURE__ */ jsx("span", {
							className: "italic text-ipc",
							children: TitleHighlight
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "StaccatoBreath mx-auto mt-3 max-w-2xl text-muted",
					children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16 mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:[&>button]:w-auto",
					children: [/* @__PURE__ */ jsx(DynamicButton, { Content: PrimaryCTA }), SecondaryCTA && /* @__PURE__ */ jsx(DynamicButton, { Content: SecondaryCTA })]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-grpc",
						children: "//"
					}), " Tech Stack"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-5xl px-6 py-10 lg:px-10",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
						children: FloatingCard.map((Card, Index) => {
							const GetIcon = () => {
								const Title = Card.Title.toLowerCase();
								if (Title.includes("rust") || Title.includes("core")) return lucide.Cpu;
								if (Title.includes("tauri") || Title.includes("ui")) return lucide.Box;
								if (Title.includes("effect") || Title.includes("service")) return lucide.Layers;
								if (Title.includes("grpc") || Title.includes("ipc")) return lucide.Network;
								if (Title.includes("extension")) return lucide.Puzzle;
								if (Title.includes("cross") || Title.includes("platform")) return lucide.Globe;
								if (Title.includes("vs code") || Title.includes("api")) return lucide.Server;
								if (Title.includes("open") || Title.includes("source")) return lucide.Zap;
								return lucide.Cpu;
							};
							const IconComponent = GetIcon();
							const GetIconColor = () => {
								const Title = Card.Title.toLowerCase();
								if (Title.includes("rust") || Title.includes("core")) return "var(--SpineTCP)";
								if (Title.includes("tauri") || Title.includes("ui")) return "var(--SpineIPC)";
								if (Title.includes("effect") || Title.includes("service")) return "var(--SpineWASM)";
								if (Title.includes("grpc") || Title.includes("ipc")) return "var(--SpinegRPC)";
								if (Title.includes("extension")) return "var(--SpineWASM)";
								if (Title.includes("cross") || Title.includes("platform")) return "var(--SpineIPC)";
								if (Title.includes("vs code") || Title.includes("api")) return "var(--SpinegRPC)";
								if (Title.includes("open") || Title.includes("source")) return "var(--SpineTCP)";
								return "var(--SpineIPC)";
							};
							return /* @__PURE__ */ jsx("jelly-card", {
								squish: true,
								className: "group relative p-4",
								style: {
									"--jelly-fill": "var(--Card)",
									"--jelly-radius": "0",
									"--jelly-card-font-size": "inherit",
									"--jelly-card-padding-block": "0",
									"--jelly-card-padding-inline": "0",
									"--jelly-color-border-default": GetIconColor()
								},
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(IconComponent, {
										className: "h-5 w-5 shrink-0",
										strokeWidth: 1.5,
										style: { color: GetIconColor() }
									}), /* @__PURE__ */ jsx("span", {
										className: "truncate font-mono text-xs uppercase tracking-wider text-foreground",
										children: Card.Title
									})]
								})
							}, Card.Id);
						})
					})
				})
			]
		})]
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicPricing.tsx
/**
* Semantic color map for the six core elements.
* Extracts the element name from the first segment before the emoji.
*/
var ElementColorMap = {
	Mountain: "var(--ExtensionRust)",
	Cocoon: "var(--ExtensionEffectTypeScript)",
	Wind: "var(--LanguageTypeScript)",
	Sky: "var(--ExtensionAstro)",
	Air: "var(--ExtensionTauri)",
	Echo: "var(--SpineTCP)",
	Common: "var(--LanguageRust)",
	Vine: "var(--SpinegRPC)",
	Grove: "var(--SpineWASM)",
	Mist: "var(--SpineIPC)",
	Rest: "var(--ToolOxc)",
	Output: "var(--ToolEsBuild)",
	SideCar: "var(--RuntimeNode)",
	Worker: "var(--LanguageJavaScript)",
	Maintain: "var(--ToolBiome)"
};
var GetElementColor = (Line) => {
	return ElementColorMap[Line.split(/[\s\u2001]/)[0]] ?? "var(--Primary)";
};
/** Doc page paths for each element - used for quick links in pricing tiers. */
var ElementDocPath = {
	Mountain: "/Doc/mountain",
	Cocoon: "/Doc/cocoon",
	Wind: "/Doc/wind",
	Sky: "/Doc/sky",
	Air: "/Doc/air",
	Echo: "/Doc/echo",
	Vine: "/Doc/vine",
	Common: "/Doc/common",
	Grove: "/Doc/grove",
	Mist: "/Doc/mist",
	Rest: "/Doc/rest",
	Output: "/Doc/output",
	SideCar: "/Doc/sidecar",
	Maintain: "/Doc/maintain",
	Worker: "/Doc/worker"
};
/**
* Dynamic Pricing - two-column layout (Free + Future).
* Each tier card shows:
* Elements section - colored multi-line rows (name / descriptor / detail)
* Separator
* Features section - icon checklist
*/
var DynamicPricing = ({ Content, ClassName }) => {
	const { t: T } = useTranslation("home");
	const GridReference = useRef(null);
	const { Title, Subtitle, Tiers, ShowMonthlyYearlyToggle = false, DefaultYearly = false, Labels = {} } = Content;
	const PopularLabel = Labels.Popular ?? T("pricing.labels.popular", { defaultValue: "Most Popular" });
	const [IsYearly, SetIsYearly] = useState(DefaultYearly);
	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyScatter = async () => {
			const Attention = await (await import("./Attention_zLx5VfOw.mjs")).default;
			Grid.querySelectorAll(".PricingCard").forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 4, 3);
			});
		};
		ApplyScatter();
	}, [Tiers]);
	const DisplayTier = Tiers.map((Tier) => ({
		...Tier,
		currentPrice: IsYearly ? Tier.Price.Yearly : Tier.Price.Monthly
	}));
	return /* @__PURE__ */ jsx("section", {
		id: "pricing",
		"aria-labelledby": "PricingHeading",
		className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-grpc",
								children: "//"
							}),
							" ",
							"Roadmap"
						]
					}),
					Title && /* @__PURE__ */ jsx("h2", {
						id: "PricingHeading",
						className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
						children: Title
					}),
					Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mt-3 text-muted",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				ref: GridReference,
				className: "mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2",
				children: DisplayTier.map((Tier) => /* @__PURE__ */ jsx("jelly-card", {
					className: `PricingCard flat ${Tier.Highlighted || Tier.Popular ? "" : ""} ${Tier.Status && Tier.Status !== "Ready" ? "opacity-75" : ""}`,
					style: {
						"--jelly-fill": "var(--Card)",
						"--jelly-radius": "0",
						"--jelly-card-padding-block": "0",
						"--jelly-card-padding-inline": "0"
					},
					"aria-disabled": Tier.Status && Tier.Status !== "Ready" ? true : void 0,
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "border-b border-[var(--Border)] p-8",
							children: [
								Tier.Popular && /* @__PURE__ */ jsx("div", {
									className: "mb-3",
									children: /* @__PURE__ */ jsxs("jelly-badge", {
										variant: "mint",
										shape: "square",
										style: {
											"--jelly-fill": "var(--SpinegRPCMute)",
											"--jelly-label": "var(--SpinegRPCFore)",
											"--jelly-badge-radius": "0px",
											"--jelly-badge-font-size": "10px"
										},
										children: [/* @__PURE__ */ jsx("span", {
											className: "StaccatoRhythmDot mr-1.5 h-1.5 w-1.5 flat",
											style: { backgroundColor: "var(--SpinegRPC)" },
											"aria-hidden": "true"
										}), PopularLabel]
									})
								}),
								Tier.Status && Tier.Status !== "Ready" && /* @__PURE__ */ jsx("div", {
									className: "mb-2",
									children: /* @__PURE__ */ jsx("jelly-badge", {
										variant: "platinum",
										shape: "square",
										style: {
											"--jelly-fill": "var(--Mute)",
											"--jelly-label": "var(--MuteForeground)",
											"--jelly-badge-radius": "0px",
											"--jelly-badge-font-size": "0.625rem"
										},
										children: Tier.Status === "WIP" ? "WIP" : "Coming Soon"
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mb-4",
									children: /* @__PURE__ */ jsx(DynamicButton, { Content: {
										...Tier.CTA,
										FullWidth: true
									} })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mb-2 text-2xl font-bold",
									children: Tier.Name
								}),
								Tier.Description && /* @__PURE__ */ jsx("div", {
									className: "StaccatoBreath text-muted-foreground",
									children: /* @__PURE__ */ jsx(RichText, { Text: Tier.Description })
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-1 flex-col p-8",
							children: [Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [
								/* @__PURE__ */ jsx("p", {
									className: "mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Elements"
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "space-y-3",
									children: Tier.Elements.map((Element, Index) => {
										const Parts = Element.split("\n");
										const NameLine = Parts[0] ?? "";
										const Sub1 = Parts[1];
										const Sub2 = Parts[2];
										const AccentColor = GetElementColor(NameLine);
										return /* @__PURE__ */ jsxs("li", {
											className: `flex flex-col gap-0.5 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
											children: [
												/* @__PURE__ */ jsx("a", {
													href: ElementDocPath[NameLine] ?? `/Doc/${NameLine.toLowerCase()}`,
													className: "font-mono text-sm font-semibold transition-colors hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
													style: { color: AccentColor },
													children: /* @__PURE__ */ jsx(RichText, {
														Text: NameLine,
														Terms: true
													})
												}),
												Sub1 && /* @__PURE__ */ jsx("span", {
													className: "font-mono text-xs text-foreground",
													children: /* @__PURE__ */ jsx(RichText, {
														Text: Sub1,
														Terms: true
													})
												}),
												Sub2 && /* @__PURE__ */ jsx("span", {
													className: "font-mono text-xs text-muted-foreground",
													children: /* @__PURE__ */ jsx(RichText, {
														Text: Sub2,
														Terms: true
													})
												})
											]
										}, Index);
									})
								}),
								Tier.Features.length > 0 && /* @__PURE__ */ jsx("hr", { className: "my-5 border-[var(--Border)]" })
							] }), Tier.Features.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [Tier.Elements && Tier.Elements.length > 0 && /* @__PURE__ */ jsx("p", {
								className: "mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Roadmap"
							}), /* @__PURE__ */ jsx("ul", {
								className: "space-y-3",
								children: Tier.Features.map((Feature, FeatureIndex) => /* @__PURE__ */ jsxs("li", {
									className: `flex items-start justify-between gap-2 ${Tier.Status && Tier.Status !== "Ready" ? "opacity-70" : ""}`,
									children: [/* @__PURE__ */ jsx("span", {
										className: "min-w-0 flex-1",
										children: /* @__PURE__ */ jsx(RichText, {
											Text: Feature,
											Terms: true
										})
									}), Tier.Status && Tier.Status !== "Ready" ? /* @__PURE__ */ jsx("jelly-badge", {
										variant: "platinum",
										shape: "square",
										className: "shrink-0",
										style: {
											"--jelly-fill": "var(--Mute)",
											"--jelly-label": "var(--MuteForeground)",
											"--jelly-badge-radius": "0px",
											"--jelly-badge-font-size": "0.625rem"
										},
										children: Tier.Status === "WIP" ? "WIP" : "Coming Soon"
									}) : /* @__PURE__ */ jsx(IconTooltip, {
										Label: "Included",
										Icon: lucide.Check,
										SizeClass: "h-4 w-4 shrink-0",
										ClassName: "StaccatoCheckmark mt-0.5 text-primary"
									})]
								}, FeatureIndex))
							})] })]
						})]
					})
				}, Tier.Id))
			})]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicTestimonials.tsx
/**
* Architecture-element glyph: maps a codename to a lucide icon so the cards
* use the project icon system instead of sprinkled emoji. Falls back to a
* neutral square for unknown names. See .claude/skills/land-design.
*/
var ElementGlyph = ({ Name }) => {
	const Key = (Name ?? "").toLowerCase();
	return /* @__PURE__ */ jsx({
		mountain: lucide.Mountain,
		cocoon: lucide.Box,
		wind: lucide.Wind,
		sky: lucide.Cloud,
		air: lucide.Wind,
		echo: lucide.Radio,
		grove: lucide.Trees,
		vine: lucide.Sprout,
		rest: lucide.Umbrella,
		worker: lucide.HardHat,
		common: lucide.Boxes,
		maintain: lucide.Wrench,
		mist: lucide.CloudFog,
		output: lucide.FileOutput,
		sidecar: lucide.Container
	}[Key] ?? lucide.Square, {
		"aria-hidden": "true",
		strokeWidth: 1.5,
		className: "ml-2 inline h-4 w-4 align-[-3px] text-muted"
	});
};
/**
* Semantic color map per architecture element ID.
* Rust backends: ExtensionRust. Effect-TS layer: ExtensionEffectTypeScript.
* TypeScript workbench: LanguageTypeScript/LanguageJavaScript.
* Astro UI: ExtensionAstro. WASM sandbox: SpineWASM.
* gRPC contracts: SpinegRPC. Network: SpineIPC.
* Toolchain: ToolOxc/ToolEsBuild/ToolBiome. Node runtime: RuntimeNode.
*/
var TestimonialColorMap = {
	Mountain: "var(--ExtensionRust)",
	Cocoon: "var(--ExtensionEffectTypeScript)",
	Wind: "var(--LanguageTypeScript)",
	Sky: "var(--ExtensionAstro)",
	Air: "var(--ExtensionTauri)",
	Echo: "var(--SpineTCP)",
	Common: "var(--LanguageRust)",
	Vine: "var(--SpinegRPC)",
	Grove: "var(--SpineWASM)",
	Mist: "var(--SpineIPC)",
	Rest: "var(--ToolOxc)",
	Output: "var(--ToolEsBuild)",
	SideCar: "var(--RuntimeNode)",
	Worker: "var(--LanguageJavaScript)",
	Maintain: "var(--ToolBiome)"
};
/**
* Halton base-2 low-discrepancy sequence.
* Deterministic, covers [0,1) evenly, never truly repeats a value.
* Used instead of simplex noise here because it guarantees all ratio
* buckets are visited across a small number of rows.
*/
var Halton = (Index) => {
	let F = 1;
	let R = 0;
	let I = Index;
	while (I > 0) {
		F /= 2;
		R += F * (I % 2);
		I = Math.floor(I / 2);
	}
	return R;
};
/**
* Returns the [left, right] column-span pair for a given row.
* Indexing pre-computed via Halton to guarantee unique-ratio spread.
*/
var GetRowRatio = (RowIndex) => {
	const Noise = Halton(RowIndex + 1);
	return [
		[6, 6],
		[7, 5],
		[5, 7],
		[8, 4],
		[4, 8]
	][Math.min(Math.floor(Noise * 5), 4)];
};
var DynamicTestimonials = ({ Content, ClassName }) => {
	const { Title, Subtitle, Testimonials, Columns = 3 } = Content;
	const GridReference = useRef(null);
	const IsMasonry = Columns === "masonry";
	const ColumnClass = {
		1: "grid-cols-1 max-w-3xl",
		2: "grid-cols-1 md:grid-cols-2 max-w-5xl",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",
		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",
		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl"
	};
	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyScatter = async () => {
			const Attention = await (await import("./Attention_zLx5VfOw.mjs")).default;
			Grid.querySelectorAll(".TestimonialCard").forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 5, 3);
			});
			(await (await import("./Staccato_CIruj3za.mjs")).default).SeedSelector(".TestimonialCard");
		};
		ApplyScatter();
	}, [Testimonials]);
	if (IsMasonry) return /* @__PURE__ */ jsx("section", {
		id: "testimonials",
		"aria-label": "Architecture",
		className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-grpc",
								children: "//"
							}),
							" ",
							"Architecture"
						]
					}),
					Title && /* @__PURE__ */ jsx("h2", {
						className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
						children: Title
					}),
					Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mt-3 text-muted",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				ref: GridReference,
				className: "mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12",
				children: Testimonials.map((Testimonial, Index) => {
					const Row = Math.floor(Index / 2);
					const IsLeft = Index % 2 === 0;
					const IsLastOdd = Index === Testimonials.length - 1 && Testimonials.length % 2 === 1;
					const [ColA, ColB] = GetRowRatio(Row);
					const ColSpan = IsLastOdd ? 12 : IsLeft ? ColA : ColB;
					const AccentColor = TestimonialColorMap[Testimonial.Id] ?? "var(--Primary)";
					return /* @__PURE__ */ jsx("jelly-card", {
						className: "MasonryCard TestimonialCard flat p-5",
						style: {
							"--jelly-fill": "var(--Card)",
							"--jelly-radius": "0",
							"--jelly-card-font-size": "inherit",
							"--jelly-card-padding-block": "0",
							"--jelly-card-padding-inline": "0",
							"--jelly-color-border-default": AccentColor,
							"--masonry-col": ColSpan
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-mono text-sm font-bold",
											style: { color: AccentColor },
											children: Testimonial.Href ? /* @__PURE__ */ jsx("a", {
												href: Testimonial.Href,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "hover:underline",
												children: Testimonial.Author
											}) : Testimonial.Author
										}), Testimonial.Author && /* @__PURE__ */ jsx(ElementGlyph, { Name: Testimonial.Author })]
									}), Testimonial.Href && /* @__PURE__ */ jsx(lucide.ExternalLink, {
										className: "text-muted-foreground/40 h-3 w-3 shrink-0",
										"aria-hidden": "true"
									})]
								}),
								Testimonial.Role && /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-1",
									children: Testimonial.Role.split(" - ").map((Tag, TagIndex) => /* @__PURE__ */ jsx("span", {
										className: "bg-mute px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground",
										children: Tag
									}, TagIndex))
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: Testimonial.Quote.split("\n")[0]
								})
							]
						})
					}, Testimonial.Id);
				})
			})]
		})
	});
	return /* @__PURE__ */ jsx("section", {
		id: "testimonials",
		"aria-label": "Architecture",
		className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-grpc",
								children: "//"
							}),
							" ",
							"Architecture"
						]
					}),
					Title && /* @__PURE__ */ jsx("h2", {
						className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
						children: Title
					}),
					Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mt-3 text-muted",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				ref: GridReference,
				className: `StaccatoMorphGap grid ${ColumnClass[Columns] ?? ColumnClass[3]} mx-auto gap-12`,
				children: Testimonials.map((Testimonial) => {
					const AccentColor = TestimonialColorMap[Testimonial.Id] ?? "var(--Primary)";
					return /* @__PURE__ */ jsx("jelly-card", {
						className: "TestimonialCard flat p-5",
						style: {
							"--jelly-fill": "var(--Card)",
							"--jelly-radius": "0",
							"--jelly-card-padding-block": "0",
							"--jelly-card-padding-inline": "0",
							"--jelly-color-border-default": AccentColor
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-mono text-sm font-bold",
											style: { color: AccentColor },
											children: Testimonial.Href ? /* @__PURE__ */ jsx("a", {
												href: Testimonial.Href,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "hover:underline",
												children: Testimonial.Author
											}) : Testimonial.Author
										}), Testimonial.Author && /* @__PURE__ */ jsx(ElementGlyph, { Name: Testimonial.Author })]
									}), Testimonial.Href && /* @__PURE__ */ jsx(lucide.ExternalLink, {
										className: "text-muted-foreground/40 h-3 w-3 shrink-0",
										"aria-hidden": "true"
									})]
								}),
								Testimonial.Role && /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-1",
									children: Testimonial.Role.split(" - ").map((Tag, TagIndex) => /* @__PURE__ */ jsx("span", {
										className: "bg-mute px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground",
										children: Tag
									}, TagIndex))
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: Testimonial.Quote.split("\n")[0]
								})
							]
						})
					}, Testimonial.Id);
				})
			})]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/HomePage.tsx
/**
* Dynamic HomePage composition
* Assembles Header, Hero, Features, Pricing, Testimonials, Download, Footer
* Content driven by translations (useTranslation) or explicit props
*/
var HomePage = ({ Content, ClassName }) => {
	const { t: T } = useTranslation([
		"home",
		"common",
		"download",
		"footer"
	]);
	const TArr = (Key, Fallback) => T(Key, {
		returnObjects: true,
		defaultValue: Fallback
	});
	const { Hero, Features, Pricing, Testimonials, Download, Header: HeaderContent } = Content || {
		Hero: {
			Badge: {
				Text: T("home:hero.badge", { defaultValue: "No Electron No Chromium CC0" }),
				Variant: "secondary"
			},
			Title: T("home:hero.title", { defaultValue: "" }),
			TitleHighlight: T("home:hero.titleHighlight", { defaultValue: "Land" }),
			Subtitle: T("home:hero.subtitle", { defaultValue: "A native code editor with the soul of VS Code - and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use." }),
			PrimaryCta: {
				Text: T("common:button.download", { defaultValue: "Download Land Free" }),
				Variant: "default",
				Size: "lg",
				Icon: "Download",
				Href: "/Download"
			},
			SecondaryCta: {
				Text: T("common:button.learnMore", { defaultValue: "See What Makes Land Different" }),
				Variant: "ghost",
				Size: "lg",
				Icon: "ExternalLink",
				Href: "https://github.com/CodeEditorLand/Land#readme"
			},
			FloatingCards: [
				{
					Id: "1",
					Title: T("home:hero.scene.cards.1.title", { defaultValue: "Rust Core" }),
					Tooltip: TArr("home:hero.scene.cards.1.tooltip", [
						"Mountain implements Common traits in Rust via Tauri.",
						"Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol.",
						"The ActionEffect system treats every operation as declarative data dispatched across layers."
					]),
					Colors: ["var(--ExtensionRust)", "var(--Mute)"]
				},
				{
					Id: "2",
					Title: T("home:hero.scene.cards.2.title", { defaultValue: "Tauri UI" }),
					Tooltip: TArr("home:hero.scene.cards.2.tooltip", ["Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs.", "Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron."]),
					Colors: [
						"var(--ExtensionTauri)",
						"var(--Primary)",
						"var(--Secondary)",
						"var(--Mute)"
					]
				},
				{
					Id: "3",
					Title: T("home:hero.scene.cards.3.title", { defaultValue: "Effect-TS Services" }),
					Tooltip: TArr("home:hero.scene.cards.3.tooltip", ["Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.", "Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target."]),
					Colors: [
						"var(--ExtensionEffectTypeScript)",
						"var(--ExtensionEffectTypeScriptFore)",
						"var(--ExtensionEffectTypeScriptMute)"
					]
				},
				{
					Id: "4",
					Title: T("home:hero.scene.cards.4.title", { defaultValue: "gRPC IPC" }),
					Tooltip: TArr("home:hero.scene.cards.4.tooltip", [
						"Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove.",
						"Proto definitions currently live in Mountain and Cocoon while Vine consolidates.",
						"Every gRPC call is a typed contract - the wire format is the interface."
					]),
					Colors: ["var(--SpinegRPC)", "var(--SpineIPC)"]
				},
				{
					Id: "5",
					Title: T("home:hero.scene.cards.5.title", { defaultValue: "Extension Host" }),
					Tooltip: TArr("home:hero.scene.cards.5.tooltip", [
						"Cocoon runs VS Code extensions via dual-track architecture:",
						"Track A loads unmodified extHost sources for maximum compatibility,",
						"Track B routes I/O-heavy operations to Mountain through gRPC.",
						"Effect-TS services implement the vscode API shim across both tracks."
					]),
					Colors: ["var(--TierProvider)"]
				},
				{
					Id: "6",
					Title: T("home:hero.scene.cards.6.title", { defaultValue: "Cross-Platform" }),
					Tooltip: TArr("home:hero.scene.cards.6.tooltip", ["Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium.", "Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts."]),
					Colors: [
						"var(--OSMacOS)",
						"var(--OSWindows)",
						"var(--OSLinux)"
					]
				},
				{
					Id: "7",
					Title: T("home:hero.scene.cards.7.title", { defaultValue: "VS Code API" }),
					Tooltip: TArr("home:hero.scene.cards.7.tooltip", ["Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics.", "The dual-track architecture preserves compatibility with published extension APIs while routing through native services."]),
					Colors: ["var(--SpineIPC)"]
				},
				{
					Id: "8",
					Title: T("home:hero.scene.cards.8.title", { defaultValue: "Open Source CC0" }),
					Tooltip: TArr("home:hero.scene.cards.8.tooltip", [
						"All 15 element repos are under CC0 1.0 Universal public domain.",
						"No attribution required, no compliance restrictions.",
						"Funded by NLnet NGI0 Commons Fund."
					]),
					Colors: ["var(--SpinegRPC)", "var(--ExtensionTauri)"]
				}
			],
			ShowConnectingLines: true,
			ShowParticles: true,
			RespectReducedMotion: true
		},
		Features: {
			Title: T("home:features.title", { defaultValue: "VS Code. Without Electron." }),
			Subtitle: T("home:features.subtitle", { defaultValue: "Native speed. VS Code compatibility. No Chromium, no compromises." }),
			Features: [
				{
					Id: "performance",
					Icon: "Zap",
					Icons: [
						"/Image/Rust.svg",
						"/Image/Tauri.svg",
						"Zap"
					],
					Title: T("home:features.item.designTokens.title", { defaultValue: "Native services where they count." }),
					Description: T("home:features.item.designTokens.description", { defaultValue: "Heavy editor work runs natively - not trapped in a web view. Window management, file I/O, and terminal IPC go straight through a Rust + Tauri services layer." })
				},
				{
					Id: "compatibility",
					Icon: "Box",
					Icons: [
						"/Image/EffectTS.svg",
						"Box",
						"Puzzle"
					],
					Title: T("home:features.item.componentLibrary.title", { defaultValue: "Unmodified extensions, no fork path." }),
					Description: T("home:features.item.componentLibrary.description", { defaultValue: "Your VS Code extensions run unmodified - no forks, no rewrites. A compatibility host speaks the VS Code extension API directly." })
				},
				{
					Id: "architecture",
					Icon: "Cpu",
					Icons: [
						"/Image/EffectTS.svg",
						"/Image/TypeScript.svg",
						"Layers"
					],
					Title: T("home:features.item.documentation.title", { defaultValue: "Fibers, not Promises." }),
					Description: T("home:features.item.documentation.description", { defaultValue: "Failures are typed, traceable, and cancellable - so the editor fails loudly in development instead of silently in production." })
				},
				{
					Id: "cross-platform",
					Icon: "Globe",
					Icons: [
						"/Image/Tauri.svg",
						"Globe",
						"Package"
					],
					Title: T("home:features.item.versionControl.title", { defaultValue: "One source tree, configured targets." }),
					Description: T("home:features.item.versionControl.description", { defaultValue: "Tauri uses the OS WebView on each platform - no bundled Chromium. One codebase compiles to native macOS, Windows, and Linux packages." })
				},
				{
					Id: "tooling",
					Icon: "Wrench",
					Icons: [
						"/Image/Rust.svg",
						"/Image/Biome.svg",
						"/Image/EffectTS.svg"
					],
					Title: T("home:features.item.cicdIntegration.title", { defaultValue: "Background daemon, always running." }),
					Description: T("home:features.item.cicdIntegration.description", { defaultValue: "Updates, indexing, signing, and health checks run in a persistent daemon - survives when the main window closes." })
				},
				{
					Id: "opensource",
					Icon: "Heart",
					Icons: [
						"/Image/CC0.svg",
						"/Image/NLnet.svg",
						"Heart"
					],
					Title: T("home:features.item.collaboration.title", { defaultValue: "CC0. No restrictions." }),
					Description: T("home:features.item.collaboration.description", { defaultValue: "Fork it, ship it, build commercial products on top of it. The entire codebase is CC0 public domain - no attribution required, no compliance headaches." })
				}
			],
			Columns: 3,
			Gap: "lg"
		},
		Pricing: {
			Title: T("home:roadmap.title", { defaultValue: "The Architecture Is Built. Here Is What Comes Next." }),
			Subtitle: T("home:roadmap.subtitle", { defaultValue: "Funded by NLnet NGI0 Commons Fund.\n\nEach milestone is labelled by what it represents: active source, integration work in progress, or release preparation." }),
			Tiers: [{
				Id: "free",
				Name: T("home:roadmap.tiers.current.name", { defaultValue: "Active Now" }),
				Description: T("home:roadmap.tiers.current.description", { defaultValue: "A native editor built on Rust and Tauri - no Chromium, no Electron. The active desktop path spans Mountain (backend), Cocoon (extensions), Sky (UI), and Wind (workbench), supported by Vine, Common, Echo, Air, Mist, Rest, Output, SideCar, and Maintain. Grove and Worker are present with integration scope that differs by build profile." }),
				Price: {
					Monthly: 0,
					Yearly: 0
				},
				Elements: [
					T("home:roadmap.tiers.current.elements.mountain", { defaultValue: "Mountain\nNative Backend\nReplaces Electron main process, no bundled Chromium" }),
					T("home:roadmap.tiers.current.elements.cocoon", { defaultValue: "Cocoon\nExtension Host\nUnmodified VS Code extensions through Effect-TS routes" }),
					T("home:roadmap.tiers.current.elements.wind", { defaultValue: "Wind\nWorkbench Shell\nEffect-TS layers for native workbench services" }),
					T("home:roadmap.tiers.current.elements.sky", { defaultValue: "Sky\nAstro UI Layer\nWorkbench routes and WebView bridge" }),
					T("home:roadmap.tiers.current.elements.air", { defaultValue: "Air\nBackground Services\nUpdates, downloads, auth, indexing, and health" }),
					T("home:roadmap.tiers.current.elements.echo", { defaultValue: "Echo\nScheduler Primitives\nBounded background work for Rust services" })
				],
				Features: [
					T("home:roadmap.tiers.current.features.1", { defaultValue: "Installed extensions run unmodified through Cocoon" }),
					T("home:roadmap.tiers.current.features.2", { defaultValue: "Tauri desktop path uses the operating system WebView" }),
					T("home:roadmap.tiers.current.features.3", { defaultValue: "Effect fibers for cancellable service work" }),
					T("home:roadmap.tiers.current.features.4", { defaultValue: "Telemetry features are compile-gated in Rust" }),
					T("home:roadmap.tiers.current.features.5", { defaultValue: "CC0 public domain no restrictions" }),
					T("home:roadmap.tiers.current.features.6", { defaultValue: "macOS, Windows, and Linux build targets in source" })
				],
				CTA: {
					Text: T("home:roadmap.tiers.current.button", { defaultValue: "View on GitHub" }),
					Variant: "default",
					Href: "https://github.com/CodeEditorLand/Land"
				},
				Popular: true
			}, {
				Id: "progress",
				Name: T("home:roadmap.tiers.future.name", { defaultValue: "v1.0" }),
				Status: "WIP",
				Description: T("home:roadmap.tiers.future.description", { defaultValue: "Signed installers, verified downloads, and broad extension compatibility are the v1.0 target. Vine consolidates cross-element protocols. Grove adds WASM sandboxing for extensions. Rest and Echo tighten the build pipeline and scheduler. Long-tail VS Code API coverage rounds out the Cocoon compatibility pass." }),
				Price: {
					Monthly: 0,
					Yearly: 0
				},
				Elements: [
					T("home:roadmap.tiers.future.elements.vine", { defaultValue: "Vine\nProtocol In Progress\nMountain, Cocoon, Air, and Grove contracts" }),
					T("home:roadmap.tiers.future.elements.cocoon", { defaultValue: "Cocoon\nExtension Compatibility Pass\nLong-tail VS Code API coverage" }),
					T("home:roadmap.tiers.future.elements.grove", { defaultValue: "Grove\nWASM Host Stabilizing\nCapability-based extension isolation path" }),
					T("home:roadmap.tiers.future.elements.rest", { defaultValue: "Rest\nSource Map Support\nOXC transformer integration in progress" }),
					T("home:roadmap.tiers.future.elements.echo", { defaultValue: "Echo\nScheduler Optimization\nFaster steal, lower latency" }),
					T("home:roadmap.tiers.future.elements.air", { defaultValue: "Air\nRelease Delivery\nSigning and distribution path" })
				],
				Features: [
					T("home:roadmap.tiers.future.features.1", { defaultValue: "Marketplace installation path under review" }),
					T("home:roadmap.tiers.future.features.2", { defaultValue: "Grove Wasmtime host integration" }),
					T("home:roadmap.tiers.future.features.3", { defaultValue: "Vine typed IPC coverage expanding" }),
					T("home:roadmap.tiers.future.features.4", { defaultValue: "Cross-platform public installers via Tauri" }),
					T("home:roadmap.tiers.future.features.5", { defaultValue: "Source map generation via OXC" }),
					T("home:roadmap.tiers.future.features.6", { defaultValue: "Download distribution and verification publishing" })
				],
				CTA: {
					Text: T("home:roadmap.tiers.future.button", { defaultValue: "Track Progress" }),
					Variant: "outline",
					Href: "https://github.com/CodeEditorLand/Land/milestones"
				},
				Popular: false
			}]
		},
		Testimonials: {
			Title: T("home:architecture.title", { defaultValue: "Under the Hood" }),
			Subtitle: T("home:architecture.subtitle", { defaultValue: "Each element replaces one piece of the Electron stack. All inspectable in source." }),
			Testimonials: [
				{
					Id: "Air",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Air",
					Author: "Air",
					Role: T("home:architecture.air.subtitle", { defaultValue: "Background Services Downloader Workspace Indexer" }),
					Quote: T("home:architecture.air.description", { defaultValue: "Background daemon that runs independently - updates, indexing, signing, and health checks, all outside the main window.\n• Update downloads with staged atomic rollback\n• File indexing and symbol extraction\n• Cryptographic signing and authentication\n• Health monitoring with multi-level checks\n\nPrometheus-compatible metrics and distributed tracing with sampling." })
				},
				{
					Id: "Cocoon",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Cocoon",
					Author: "Cocoon",
					Role: T("home:architecture.cocoon.subtitle", { defaultValue: "Extension Host Unmodified VS Code Extensions Effect-TS Services" }),
					Quote: T("home:architecture.cocoon.description", { defaultValue: "Node.js sidecar that hosts and executes VS Code extensions.\n\nDual-track architecture:\n• Track A loads unmodified extHost sources for maximum compatibility\n• Track B routes I/O-heavy operations to Mountain through gRPC\n\nEffect-TS provides typed errors, scoped resources, and supervised concurrency across all services.\n\nCodegen pipeline walks VS Code extHost source to emit type schemas.\n\nCore API surfaces:\n• Commands\n• Workspace\n• Window\n• Terminal\n• Webview\n• Language providers\n• Diagnostics" })
				},
				{
					Id: "Common",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Common",
					Author: "Common",
					Role: T("home:architecture.common.subtitle", { defaultValue: "Shared Foundation Traits Cross-Element Types" }),
					Quote: T("home:architecture.common.description", { defaultValue: "Pure abstract library - defines the contracts that all Rust components implement, not the implementations themselves.\n\nAsync traits for every service domain:\n• FileSystem\n• Terminal\n• Clipboard\n• Window\n• Configuration\n• Storage\n• Search\n• and more\n\nThe ActionEffect system treats every operation as declarative data - commands, events, and queries share a single type hierarchy across all layers.\n\nTransport-agnostic: supports gRPC, IPC, and WASM strategies.\n\nDual-pipe telemetry (PostHog + OTLP)." })
				},
				{
					Id: "Echo",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Echo",
					Author: "Echo",
					Role: T("home:architecture.echo.subtitle", { defaultValue: "Work-Stealing Scheduler crossbeam-deque Supervised Worker Pool" }),
					Quote: T("home:architecture.echo.description", { defaultValue: "Work-stealing task scheduler with lock-free queues for bounded background execution.\n\nPriority tiers:\n• High\n• Normal\n• Low\n\nEnsures UI responsiveness stays predictable under I/O load.\n\nWorkers consume from local queues and steal from peers when idle.\n\nIntegrates with the ActionEffect system for cancelable, supervised tasks.\n\nGraceful shutdown paths keep resources from leaking when services terminate." })
				},
				{
					Id: "Grove",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Grove",
					Author: "Grove",
					Role: T("home:architecture.grove.subtitle", { defaultValue: "WASM Sandbox Wasmtime Runtime Capability-Based Isolation" }),
					Quote: T("home:architecture.grove.description", { defaultValue: "WebAssembly sandbox for running extensions in capability-isolated environments.\n\nWASMtime provides:\n• Memory limits\n• Resource controls\n• Fine-grained capability gates\n\nExtensions cannot access host APIs unless explicitly granted.\n\nMultiple transport strategies:\n• gRPC\n• IPC\n• Direct WASM host function calls\n\nShares the same VS Code API surface as Cocoon.\n\nComplements Cocoon's Node.js path with a sandboxed execution alternative." })
				},
				{
					Id: "Maintain",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Maintain",
					Author: "Maintain",
					Role: T("home:architecture.maintain.subtitle", { defaultValue: "Build Orchestrator Configuration Release Profiles" }),
					Quote: T("home:architecture.maintain.description", { defaultValue: "Build system using an embedded Rhai scripting engine for flexible cross-element orchestration.\n\nManages build profiles across the Land ecosystem:\n• Development\n• Debug\n• Release\n\nType-safe editing of Cargo.toml and project configuration through scriptable resolvers.\n\nRelease pipeline preparation - signing, artifact publication, and distribution - is in progress." })
				},
				{
					Id: "Mist",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Mist",
					Author: "Mist",
					Role: T("home:architecture.mist.subtitle", { defaultValue: "Local DNS Sandbox *.editor.land Resolution Network Boundary" }),
					Quote: T("home:architecture.mist.description", { defaultValue: "Local DNS server authoritative for the editor.land zone - all subdomains resolve to loopback, keeping internal services off the network.\n\nForward allowlisting controls which external domains sidecar processes can reach; everything else is blocked at the DNS layer.\n\nSecurity model:\n• ECDSA DNSSEC signing verifies zone integrity\n• Loopback binding only - no external port exposure\n\nProvides network isolation for Cocoon and Air processes so they cannot leak data to arbitrary hosts." })
				},
				{
					Id: "Mountain",
					Emoji: "⛰️",
					Href: "https://github.com/CodeEditorLand/Mountain",
					Author: "Mountain",
					Role: T("home:architecture.mountain.subtitle", { defaultValue: "Native Rust Backend Tauri Replaces Electron Main Process" }),
					Quote: T("home:architecture.mountain.description", { defaultValue: "Primary native backend and Tauri application shell - replaces the Electron main process entirely.\n\nImplements all service traits from Common through the declarative ActionEffect system:\n• Windows\n• Files\n• Terminals\n• Clipboard\n• Dialogs\n• Process control\n• OS keychain\n\nHosts the gRPC server for cross-process communication with Cocoon, Air, and Grove.\n\nOrchestrates sidecar lifecycle and manages application state across all connected processes." })
				},
				{
					Id: "Output",
					Emoji: "⚫",
					Href: "https://github.com/CodeEditorLand/Output",
					Author: "Output",
					Role: T("home:architecture.output.subtitle", { defaultValue: "Compilation Pipeline Plugin-Routed Deterministic Checksum" }),
					Quote: T("home:architecture.output.description", { defaultValue: "Build orchestration for VS Code platform source code.\n\nDual-compiler pipeline:\n• Primary ESBuild\n• Optional Rust-native compiler path for faster TypeScript compilation\n\nPlugin-routed transforms handle:\n• Module resolution remapping\n• Define substitution\n• CSS import interception\n• Dead code elimination\n\nEnvironment-variable-driven compiler selection.\n\nPlatform code markers separate platform-specific and cross-platform code at the source level.\n\nConsumed by Cocoon, Sky, and Wind as the shared compilation output." })
				},
				{
					Id: "Rest",
					Emoji: "⛱️",
					Href: "https://github.com/CodeEditorLand/Rest",
					Author: "Rest",
					Role: T("home:architecture.rest.subtitle", { defaultValue: "TypeScript Transform Pipeline OXC Rust-Native" }),
					Quote: T("home:architecture.rest.description", { defaultValue: "Rust-native TypeScript compilation pipeline built on the OXC toolchain - parser, transformer, and codegen in one process.\n\nHandles:\n• Decorator metadata emission\n• Legacy class field semantics\n• JSX\n• Parallel compilation\n\nSelectable as an alternative compiler to reduce reliance on Node-hosted compilation paths.\n\nSource map output and measured pipeline benchmarks are in active development." })
				},
				{
					Id: "SideCar",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/SideCar",
					Author: "SideCar",
					Role: T("home:architecture.sidecar.subtitle", { defaultValue: "Binary Distributor Compile-Time Target Triple Selection Per-Platform Node.js" }),
					Quote: T("home:architecture.sidecar.description", { defaultValue: "Manages pre-compiled platform-specific Node.js binaries for each target platform.\n\nCompile-time binary selection ensures the right runtime is available without runtime detection or download delays.\n\nIntegrity verification and cache management keep sidecar deployments deterministic and reproducible across build environments." })
				},
				{
					Id: "Sky",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Sky",
					Author: "Sky",
					Role: T("home:architecture.sky.subtitle", { defaultValue: "Visual UI Layer Astro Components Three Workbench Layouts" }),
					Quote: T("home:architecture.sky.description", { defaultValue: "Renders the editor interface in the OS WebView using Astro component islands for efficient rendering.\n\nSkyBridge routes Tauri events to VS Code workbench APIs, translating runtime channels into workbench calls.\n\nSupports multiple workbench layouts that adapt the UI layer to different runtimes:\n• Browser proxy\n• Mountain-native\n• Electron\n\nSmart variant selection with conditional imports and tree-shaking keeps the bundle size target-specific." })
				},
				{
					Id: "Vine",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Vine",
					Author: "Vine",
					Role: T("home:architecture.vine.subtitle", { defaultValue: "gRPC Backbone Contract-First .proto Definitions" }),
					Quote: T("home:architecture.vine.description", { defaultValue: "Protocol definitions for gRPC communication between Mountain, Cocoon, Air, and Grove.\n\nCurrent proto contracts live in Mountain/Proto/ and Cocoon:\n• Vine.proto - editor-host IPC\n• Spine.proto - extension coordination\n• Grove.proto - WASM extension protocols\n\nCentralized consolidation into the Vine element is planned as the protocol surface stabilizes." })
				},
				{
					Id: "Wind",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Wind",
					Author: "Wind",
					Role: T("home:architecture.wind.subtitle", { defaultValue: "Workbench Services Effect-TS Layers Native Bridges" }),
					Quote: T("home:architecture.wind.description", { defaultValue: "UI service layer that recreates the VS Code workbench environment inside the Tauri WebView.\n\nEffect-TS services cover:\n• IPC\n• Configuration\n• Editor\n• Terminal\n• Clipboard\n• Dialog\n• FileSystem\n• Window\n• Search\n\nEach with explicit typed error handling and compile-time dependency tracking.\n\nComposed into Layer stacks that target specific runtimes:\n• Tauri (native)\n• Electron (compatibility)\n• Test (isolated)\n\nPreload shim establishes the bridge between VS Code workbench expectations and the Tauri runtime environment." })
				},
				{
					Id: "Worker",
					Emoji: "",
					Href: "https://github.com/CodeEditorLand/Worker",
					Author: "Worker",
					Role: T("home:architecture.worker.subtitle", { defaultValue: "Service Worker Offline Cache CSS Import Support" }),
					Quote: T("home:architecture.worker.description", { defaultValue: "Service worker that provides offline caching and dynamic CSS import handling for the web shell.\n\nCaching strategy:\n• Network-first for navigation requests\n• Cache-first for static assets\n\nIntercepts JavaScript imports of CSS files and injects them as <link> tags - handles VS Code's pattern of importing stylesheets as JS modules.\n\nAutomatic update detection with client reload when a new version is available." })
				}
			],
			Columns: "masonry"
		},
		Download: {
			Title: T("download:title", { defaultValue: "Download Land" }),
			Subtitle: T("download:subtitle", { defaultValue: "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared." }),
			Platforms: [
				{
					Id: "macos",
					Name: T("download:card.platform.macos.title", { defaultValue: "macOS" }),
					Icon: "Apple",
					Description: T("download:card.platform.macos.universalBadge", { defaultValue: "Universal Binary: Apple Silicon and Intel" }),
					Version: "Pre-release",
					Size: "Coming Soon"
				},
				{
					Id: "windows",
					Name: T("download:card.platform.windows.title", { defaultValue: "Windows" }),
					Icon: "Monitor",
					Description: T("download:card.platform.windows.description", { defaultValue: "64-bit (x64)" }),
					Version: "Pre-release",
					Size: "Coming Soon"
				},
				{
					Id: "linux",
					Name: T("download:card.platform.linux.title", { defaultValue: "Linux" }),
					Icon: "Terminal",
					Description: T("download:card.platform.linux.description", { defaultValue: "DEB, RPM, AppImage" }),
					Version: "Pre-release",
					Size: "Coming Soon"
				}
			],
			ShowVerification: true,
			OnDownload: async (Platform) => {
				if (Platform.id) try {
					const { default: DownloadAPI } = await import("./Download_CLeuVBt7.mjs");
					const Information = await DownloadAPI.GetInfo(Platform.id);
					window.open(Information.downloadUrl, "_blank");
					await DownloadAPI.TrackDownload(Platform.id);
				} catch (DownloadError) {
					console.error("Download failed:", DownloadError);
					alert(T("download:labels.downloadFailed", { defaultValue: "Download failed. Please try again." }));
				}
			}
		},
		Footer: {
			Brand: {
				Name: T("common:brand.name", { defaultValue: "Code Editor Land" }),
				Description: T("footer:brand.description", { defaultValue: "No Electron. No Chromium. Every extension runs unchanged.\n\nOpen source and free forever." })
			},
			Social: { GitHub: "https://github.com/CodeEditorLand/Land" },
			Columns: [
				{
					Title: T("footer:columns.product.title", { defaultValue: "Product" }),
					Links: [
						{
							Label: T("footer:columns.product.features", { defaultValue: "Features" }),
							Href: "/#features"
						},
						{
							Label: T("footer:columns.product.downloads", { defaultValue: "Downloads" }),
							Href: "/Download"
						},
						{
							Label: T("footer:columns.product.docs", { defaultValue: "Documentation" }),
							Href: "https://github.com/CodeEditorLand/Land#readme"
						}
					]
				},
				{
					Title: T("footer:columns.company.title", { defaultValue: "Community" }),
					Links: [
						{
							Label: T("footer:columns.company.github", { defaultValue: "GitHub" }),
							Href: "https://github.com/CodeEditorLand/Land"
						},
						{
							Label: T("footer:columns.company.issues", { defaultValue: "Issues" }),
							Href: "https://github.com/CodeEditorLand/Land/issues"
						},
						{
							Label: T("footer:columns.company.contributing", { defaultValue: "Contributing" }),
							Href: "https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md"
						}
					]
				},
				{
					Title: T("footer:columns.legal.title", { defaultValue: "Legal" }),
					Links: [
						{
							Label: T("footer:columns.legal.privacy", { defaultValue: "Privacy" }),
							Href: "/Legal/Privacy"
						},
						{
							Label: T("footer:columns.legal.terms", { defaultValue: "Terms" }),
							Href: "/Legal/Term"
						},
						{
							Label: T("footer:columns.legal.license", { defaultValue: "License" }),
							Href: "/License"
						}
					]
				}
			],
			BottomBar: { MadeWith: true }
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `flex min-h-screen flex-col ${ClassName || ""}`,
		children: [HeaderContent !== void 0 && /* @__PURE__ */ jsx(Header, { content: HeaderContent }), /* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			role: "region",
			"aria-label": "Page content",
			children: [
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonFeatureCard, { className: "min-h-[60dvh]" }),
					children: /* @__PURE__ */ jsx(DynamicHeroSection, { Content: Hero })
				}),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx("div", {
						className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3",
						children: [
							1,
							2,
							3,
							4,
							5,
							6
						].map((Index) => /* @__PURE__ */ jsx(SkeletonFeatureCard, {}, Index))
					}),
					children: /* @__PURE__ */ jsx(DynamicFeatures, { Content: Features })
				}),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx("div", {
						className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3",
						children: [
							1,
							2,
							3
						].map((Index) => /* @__PURE__ */ jsx(SkeletonPricingTier, {}, Index))
					}),
					children: /* @__PURE__ */ jsx(DynamicPricing, { Content: Pricing })
				}),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx("div", {
						className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3",
						children: [
							1,
							2,
							3
						].map((Index) => /* @__PURE__ */ jsx(SkeletonCard, {}, Index))
					}),
					children: /* @__PURE__ */ jsx(DynamicTestimonials, { Content: Testimonials })
				}),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonCard, { className: "min-h-[30dvh]" }),
					children: /* @__PURE__ */ jsx(DynamicPlatformGrid, { Content: Download })
				})
			]
		})]
	});
};
//#endregion
//#region Source/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://editor.land");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const T = GetI18n();
	const MetaTitle = T("meta.home.title", { defaultValue: "Code Editor Land | Rust and Tauri Editor Stack" });
	const MetaDescription = T("meta.home.description", { defaultValue: "Code Editor Land is an open-source editor stack built with Rust, Tauri, and a VS Code-compatible extension host. Source builds are active while public installers and full extension coverage are still in progress." });
	const SiteUrl = Astro.site?.href ?? "";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})} ${renderComponent($$result, "HomePage", HomePage, {
			"client:load": true,
			"MetaTitle": MetaTitle,
			"MetaDescription": MetaDescription,
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/HomePage.tsx",
			"client:component-export": "HomePage"
		})} ${maybeRenderHead($$result)}<div class="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 py-10 text-muted-foreground"> <picture> <source srcset="/Asset/Dark/Logo/Glyph/Land.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="20" height="20"> </picture> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "mint",
			"shape": "square",
			"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
		}, { "default": ($$result) => renderTemplate`
Telemetry Feature Gated&#x2001;<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "mint",
			"shape": "square",
			"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
		}, { "default": ($$result) => renderTemplate`
CC0 Licensed&#x2001;<picture class="inline-flex align-middle"> <source srcset="/Dark/Image/CC0.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img src="/Image/CC0.svg" alt="" width="12" height="12" class="opacity-70" aria-hidden="true"> </picture> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "azure",
			"shape": "square",
			"style": `--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
		}, { "default": ($$result) => renderTemplate`
Rust&#x2001;<picture class="inline-flex align-middle"> <source srcset="/Dark/Image/Rust.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img src="/Image/Rust.svg" alt="" width="12" height="12" class="opacity-70" aria-hidden="true"> </picture>&#x2001;+&#x2001;Tauri&#x2001;<picture class="inline-flex align-middle"> <source srcset="/Dark/Image/Tauri.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img src="/Image/Tauri.svg" alt="" width="12" height="12" class="opacity-70" aria-hidden="true"> </picture> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "platinum",
			"shape": "square",
			"outline": true,
			"style": `--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
		}, { "default": ($$result) => renderTemplate`
VS Code API In Progress
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "platinum",
			"shape": "square",
			"outline": true,
			"style": `--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px;cursor:pointer`,
			"onclick": "window.open('https://PlayForm.Cloud','_blank','noopener noreferrer')"
		}, { "default": ($$result) => renderTemplate`
PlayForm
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
			"variant": "platinum",
			"shape": "square",
			"outline": true,
			"style": `--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px;cursor:pointer`,
			"onclick": "location.href='/'"
		}, { "default": ($$result) => renderTemplate`
CodeEditorLand
` })} </div> `,
		"Head": ($$result) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, { "slot": "Head" }, { "default": ($$result) => renderTemplate` <script crossorigin=\"anonymous\" type="application/ld+json">${unescapeHTML(JSON.stringify({
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			name: "Code Editor Land",
			alternateName: "Land",
			description: "An open-source editor stack built with Rust, Tauri, and a VS Code-compatible extension host. Source builds are active while public installers and full extension coverage are still in progress.",
			url: SiteUrl,
			applicationCategory: "DeveloperApplication",
			operatingSystem: "macOS, Windows, Linux",
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD"
			},
			license: "https://creativecommons.org/publicdomain/zero/1.0/",
			softwareVersion: "Pre-release",
			downloadUrl: `${SiteUrl}Download`,
			screenshot: `${SiteUrl}Favicon/og-image.png`,
			author: [
				{
					"@type": "Person",
					name: "Nikola R. Hristov",
					url: "https://github.com/NikolaRHristov"
				},
				{
					"@type": "Organization",
					name: "Code Editor Land",
					url: SiteUrl
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
				url: SiteUrl,
				logo: {
					"@type": "ImageObject",
					url: `${SiteUrl}Favicon/favicon.svg`
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
		}))}<\/script>` })}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:Source/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
