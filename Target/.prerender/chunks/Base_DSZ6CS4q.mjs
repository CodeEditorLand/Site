import { A as unescapeHTML, M as createAstro, S as createRenderInstruction, b as addAttribute, d as renderSlot, m as renderTemplate, o as renderComponent, v as maybeRenderHead, y as renderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { r as PascalCaseCanonical } from "./Map_Bsl_SrZK.mjs";
import { t as GetWorkersClient } from "./WorkerClient_BQ8L3cw1.mjs";
import { t as Account_default } from "./Account_BfDCTGa3.mjs";
import { t as Common_default } from "./Common_BEH6UIdo.mjs";
import { t as Download_default } from "./Download_CIhdy5zP.mjs";
import { t as Footer_default } from "./Footer_DyVCFx4B.mjs";
import { t as Header_default } from "./Header_CML1KAzK.mjs";
import { t as Home_default } from "./Home_DqBsfdgX.mjs";
import { t as Meta_default } from "./Meta_Cu-idk6q.mjs";
import { t as Verify_default } from "./Verify_vbAZF_Sx.mjs";
import { t as Account_default$1 } from "./Account_sfL-Z9tf.mjs";
import { t as Common_default$1 } from "./Common_BtEj6qhx.mjs";
import { t as Download_default$1 } from "./Download_CKn7UQBb.mjs";
import { t as Footer_default$1 } from "./Footer_afX6oLUu.mjs";
import { t as Header_default$1 } from "./Header_Bfu30W-J.mjs";
import { t as Home_default$1 } from "./Home_WojpVNrz.mjs";
import { t as Meta_default$1 } from "./Meta_DgGGtHsa.mjs";
import { t as Verify_default$1 } from "./Verify_BYmkbnaC.mjs";
import { t as Account_default$2 } from "./Account_BO66U_7h.mjs";
import { t as Blog_default } from "./Blog_B-PKW0PU.mjs";
import { t as Common_default$2 } from "./Common_BA2xbfzm.mjs";
import { t as Doc_default } from "./Doc_DSlwCl27.mjs";
import { t as Download_default$2 } from "./Download_DLxVirvo.mjs";
import { t as Footer_default$2 } from "./Footer_BHbKaLv8.mjs";
import { t as Header_default$2 } from "./Header_BQKqvkha.mjs";
import { t as Home_default$2 } from "./Home_BRQLiUNz.mjs";
import { t as Meta_default$2 } from "./Meta_DzPXinng.mjs";
import { t as Verify_default$2 } from "./Verify_bUizxHcY.mjs";
import { t as Account_default$3 } from "./Account_CxxiNEjs.mjs";
import { t as Common_default$3 } from "./Common_Bj2l0qlX.mjs";
import { t as Download_default$3 } from "./Download_DZVQI9rb.mjs";
import { t as Footer_default$3 } from "./Footer_2hn2SEE3.mjs";
import { t as Header_default$3 } from "./Header_hUDNvc6I.mjs";
import { t as Home_default$3 } from "./Home_BS0ivFgs.mjs";
import { t as Meta_default$3 } from "./Meta_BNL60cZf.mjs";
import { t as Verify_default$3 } from "./Verify_DBEKCbUo.mjs";
import { t as Account_default$4 } from "./Account_Bs2uEetJ.mjs";
import { t as Common_default$4 } from "./Common_F4k4sjqa.mjs";
import { t as Download_default$4 } from "./Download_rpLE9LFy.mjs";
import { t as Footer_default$4 } from "./Footer_CcfrnqlJ.mjs";
import { t as Header_default$4 } from "./Header_CvKYjuEF.mjs";
import { t as Home_default$4 } from "./Home_B0qUeqiP.mjs";
import { t as Meta_default$4 } from "./Meta_C1tTbfPd.mjs";
import { t as Verify_default$4 } from "./Verify_CRLByCgM.mjs";
import { clsx } from "clsx";
import { Component, createContext, useContext, useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import i18n from "i18next";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
//#region ../../../node_modules/.pnpm/astro@7.1.3_@astrojs+markdown-remark@7.2.1_supports-color@10.2.2__@emnapi+core@1.11.1_@_991f5b61dd6c75e3e019a9a5dbb5d73d/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script crossorigin=\"anonymous\" type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script crossorigin=\"anonymous\" type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region Source/Library/Theme/ThemeImage.tsx
/**
* ThemeImage - native <picture> element that serves the correct SVG for the
* active colour scheme.  The global Base.astro script syncs `data-theme-dark`
* sources during initial HTML parsing.  The mount effect below covers the gap
* for React client components that render new <source> elements after
* DOMContentLoaded (when the Base.astro MutationObserver has already
* disconnected).  Subsequent theme toggles are handled globally by
* ThemeToggle.SyncPictureSources which iterates all source[data-theme-dark].
*
* Dark-image path convention: /Image/Foo.svg → /Dark/Image/Foo.svg.
* Pass `darkSrc` explicitly to override.
*/
function ThemeImage({ src, darkSrc, alt = "", width, height, className, ...props }) {
	const Dark = darkSrc ?? src.replace(/^\/Image\//, "/Dark/Image/").replace(/^\/Asset\/(?!Dark\/)/, "/Asset/Dark/");
	const sourceRef = useRef(null);
	useEffect(() => {
		if (!sourceRef.current) return;
		const isDark = document.documentElement.classList.contains("dark");
		sourceRef.current.media = isDark ? "all" : "(prefers-color-scheme: dark)";
	}, []);
	return /* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
		ref: sourceRef,
		srcSet: Dark,
		media: "(prefers-color-scheme: dark)",
		"data-theme-dark": ""
	}), /* @__PURE__ */ jsx("img", {
		src,
		alt,
		width,
		height,
		className,
		...props
	})] });
}
//#endregion
//#region Source/Component/UI/Utility.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region Source/Component/UI/Tooltip.tsx
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, {
		"data-slot": "tooltip",
		...props
	}) });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(TooltipPrimitive.Content, {
		"data-slot": "tooltip-content",
		sideOffset,
		className: cn("animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin) pointer-events-none z-50 w-fit text-balance flat bg-primary px-3 py-1.5 text-center text-primary-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" })]
	}) });
}
//#endregion
//#region Source/Component/UI/IconTooltip.tsx
/**
* IconTooltip - single source of truth for icon accessibility across the site.
*
* Provides three layers of label exposure:
* 1. aria-label on the trigger <span> - screen readers announce the label
* 2. title on the trigger <span> - native browser tooltip fallback
* 3. Radix TooltipContent - styled hover tooltip for sighted users
*
* Usage with Lucide icon:
* <IconTooltip Label="Sync" Icon={RefreshCw} Color="#3b82f6" />
*
* Usage wrapping an <img> brand mark:
* <IconTooltip Label="GitHub">
* <img src="/Image/GitHub.svg" alt="GitHub" width="16" height="16"
* className="h-4 w-4" />
* </IconTooltip>
*
* DocHref is reserved for future documentation links - pass it now so
* the data is threaded through and the tooltip can evolve to a link
* without changing every call site.
*/
var IconTooltip = ({ Label, Icon, Color, SizeClass = "h-4 w-4", ClassName = "", DocHref: _DocHref, children }) => {
	const LabelFlat = Array.isArray(Label) ? Label.join(" ") : Label;
	if (process.env.NODE_ENV === "development" && !LabelFlat) console.warn("IconTooltip: Label (aria-label) is required");
	const Content = children ?? (Icon ? /* @__PURE__ */ jsx(Icon, {
		className: `${SizeClass} ${ClassName}`,
		style: Color ? { color: Color } : void 0,
		"aria-hidden": "true"
	}) : null);
	if (!Content) return null;
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		tabIndex: -1,
		children: /* @__PURE__ */ jsx("span", {
			className: "inline-flex items-center",
			"aria-label": LabelFlat,
			title: LabelFlat,
			role: "img",
			children: Content
		})
	}), Array.isArray(Label) ? /* @__PURE__ */ jsx(TooltipContent, {
		className: "flex flex-col items-center gap-0 bg-transparent p-0 [&>svg]:hidden",
		children: Label.map((Line, Index) => {
			const Hash = (S) => {
				let H = 0;
				for (let I = 0; I < S.length; I++) H = (H << 5) - H + S.charCodeAt(I) | 0;
				return H / 2147483647;
			};
			return /* @__PURE__ */ jsx("p", {
				className: "StaccatoCard w-fit flat bg-primary px-3 py-1 text-primary-foreground",
				style: {
					"--StaccatoSeed": Hash(`ts-${Index}`).toFixed(3),
					"--StaccatoSeedPhase": Hash(`tp-${Index}`).toFixed(3),
					transform: `translate(calc(var(--StaccatoSeed) * 7px), calc(var(--StaccatoSeedPhase) * 5px)) rotate(calc(var(--StaccatoSeed) * 1.5deg)) scale(1)`
				},
				children: Line
			}, Index);
		})
	}) : /* @__PURE__ */ jsx(TooltipContent, { children: Label })] }) });
};
//#endregion
//#region Source/Variable/JellyUIVersion.ts
var JellyUIVersion = "08f0d117ca62c1049167e949da8afba5a91b1740";
//#endregion
//#region Source/Background.astro
var $$Background = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="Layout" data-astro-cid-bqpd3p24> <!-- Topographic contour map - the product is called "Land" --> <svg id="TopoMap" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" data-astro-cid-bqpd3p24> <!-- Main peak - upper right --> <ellipse cx="1080" cy="260" rx="100" ry="58" transform="rotate(-18 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.12" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="200" ry="118" transform="rotate(-14 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.09" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="320" ry="192" transform="rotate(-10 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.07" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="460" ry="278" transform="rotate(-6 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.05" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="620" ry="370" transform="rotate(-3 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.03" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="800" ry="474" transform="rotate(-1 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.02" data-astro-cid-bqpd3p24></ellipse> <!-- Secondary peak - lower left --> <ellipse cx="280" cy="680" rx="75" ry="48" transform="rotate(22 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.10" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="160" ry="102" transform="rotate(17 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.08" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="270" ry="170" transform="rotate(12 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.06" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="400" ry="248" transform="rotate(7 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.04" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="550" ry="336" transform="rotate(3 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.02" data-astro-cid-bqpd3p24></ellipse> <!-- Tertiary saddle - center bottom --> <ellipse cx="720" cy="820" rx="60" ry="30" transform="rotate(5 720 820)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.07" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="720" cy="820" rx="140" ry="68" transform="rotate(3 720 820)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.05" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="720" cy="820" rx="260" ry="124" transform="rotate(1 720 820)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.03" data-astro-cid-bqpd3p24></ellipse> </svg> </div> ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro", void 0);
//#endregion
//#region Source/Component/ErrorBoundary.tsx
/**
* React Error Boundary that catches render errors in child components.
* Shows a flat, styled fallback UI consistent with the design system.
* Accepts a FallbackComponent prop for custom error UI (e.g. skeletons).
*/
var ErrorBoundary = class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}
	HandleRetry = () => {
		this.setState({
			hasError: false,
			error: null
		});
	};
	render() {
		if (this.state.hasError) {
			const CaughtError = this.state.error ?? /* @__PURE__ */ new Error("Unknown error");
			if (this.props.FallbackComponent) return this.props.FallbackComponent(CaughtError, this.HandleRetry);
			if (this.props.fallback) return this.props.fallback;
			return /* @__PURE__ */ jsx("div", {
				className: "flex min-h-[200px] items-center justify-center p-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-md border border-[var(--Destruct)] bg-card p-8 text-center",
					children: [
						/* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 h-1 w-8 bg-destruct" }),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-2 text-xl font-semibold text-fg",
							children: "Something went wrong"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-6 text-muted",
							children: CaughtError.message || "An unexpected error occurred. Please try again."
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: this.HandleRetry,
							className: "inline-flex h-9 items-center justify-center border border-[var(--Destruct)] bg-card px-4 py-2 font-medium text-destruct transition-all hover:bg-destruct hover:text-destruct-fg",
							children: "Try again"
						})
					]
				})
			});
		}
		return this.props.children;
	}
};
//#endregion
//#region Source/Component/UI/Separator.tsx
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
		"data-slot": "separator-root",
		decorative,
		orientation,
		className: cn("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px", className),
		...props
	});
}
//#endregion
//#region Source/Component/Layout/Footer.tsx
/**
* Footer - site-wide footer with navigation columns, social links,
* funding attribution (NLnet/NGI0), and locale switcher.
*
* Content is fully i18n-driven via useTranslation("footer").
*/
var Footer = ({ Content }) => {
	const { t: T } = useTranslation("footer");
	const FooterData = Content || {
		Brand: {
			Name: T("brand.name", { defaultValue: "Code Editor Land" }),
			Description: T("brand.description", { defaultValue: "No Electron. No Chromium. Every extension runs unchanged.\n\nOpen source and free forever." })
		},
		Columns: [
			{
				Title: T("columns.product.title", "Product"),
				Links: [
					{
						Label: T("columns.product.features", "Features"),
						Href: "/#features"
					},
					{
						Label: T("columns.product.downloads", "Downloads"),
						Href: "/Download"
					},
					{
						Label: T("columns.product.docs", "Documentation"),
						Href: "/Doc"
					},
					{
						Label: T("columns.product.blog", "Blog"),
						Href: "/Blog"
					}
				]
			},
			{
				Title: T("columns.company.title", "Community"),
				Links: [
					{
						Label: T("columns.company.issues", "Issues"),
						Href: "https://github.com/CodeEditorLand/Land/issues"
					},
					{
						Label: T("columns.company.contributing", "Contributing"),
						Href: "/Contributing"
					},
					{
						Label: T("columns.company.github", "GitHub"),
						Href: "https://github.com/CodeEditorLand/Land"
					},
					{
						Label: T("columns.company.enterprise", "Enterprise"),
						Href: "/Contact/Sale"
					}
				]
			},
			{
				Title: T("columns.legal.title", "Legal"),
				Links: [
					{
						Label: T("columns.legal.privacy", "Privacy"),
						Href: "/Legal/Privacy"
					},
					{
						Label: T("columns.legal.terms", "Terms"),
						Href: "/Legal/Term"
					},
					{
						Label: T("columns.legal.license", "License"),
						Href: "/License"
					}
				]
			}
		],
		BottomBar: { MadeWith: true }
	};
	return /* @__PURE__ */ jsx("footer", {
		className: "Footer",
		role: "contentinfo",
		"aria-label": "Site footer",
		children: /* @__PURE__ */ jsxs("div", {
			className: "FooterContent container mx-auto px-4 py-16",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "/",
							className: "mb-4 flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
							"aria-label": `${FooterData.Brand?.Name || "Land"} - Go to homepage`,
							children: [/* @__PURE__ */ jsx(ThemeImage, {
								src: "/Asset/Logo/Glyph/Land.svg",
								alt: "Code Editor Land",
								title: "Code Editor Land",
								width: 32,
								height: 32,
								className: "h-8 w-8",
								"aria-hidden": "true"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: FooterData.Brand?.Name || "Land"
							})]
						}), FooterData.Brand?.Description && /* @__PURE__ */ jsx("p", {
							className: "mb-6 max-w-md whitespace-pre-line text-sm text-muted-foreground",
							children: FooterData.Brand.Description
						})]
					}), FooterData.Columns?.map((Column, ColumnIndex) => /* @__PURE__ */ jsxs("nav", {
						"aria-label": Column.Title,
						children: [/* @__PURE__ */ jsx("h4", {
							className: "mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: Column.Title
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-2 text-muted-foreground",
							children: Column.Links.map((Link, LinkIndex) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: Link.Href,
								className: "StaccatoNavLink transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								...Link.Href.startsWith("http") ? {
									target: "_blank",
									rel: "noopener noreferrer"
								} : {},
								children: Link.Label
							}) }, LinkIndex))
						})]
					}, ColumnIndex))]
				}),
				/* @__PURE__ */ jsx(Separator, { className: "StaccatoSeparator my-8" }),
				/* @__PURE__ */ jsx("div", {
					className: "mb-6 border-l-2 py-2 pl-4",
					style: { borderLeftColor: "var(--SpinegRPC)" },
					children: /* @__PURE__ */ jsxs("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: [
							T("funding.prefix", "This project has been funded through the "),
							/* @__PURE__ */ jsx("a", {
								href: "https://nlnet.nl/commonsfund",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-primary hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								children: T("funding.ngiFund", "NGI0 Commons Fund")
							}),
							T("funding.nlnetIntro", ", a fund established by "),
							/* @__PURE__ */ jsx("a", {
								href: "https://nlnet.nl",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-primary hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								children: T("funding.nlnet", "NLnet")
							}),
							T("funding.euSupport", " with financial support from the European Commission’s Next Generation Internet programme, under grant agreement No.\xA0101135429. "),
							/* @__PURE__ */ jsx("a", {
								href: "https://nlnet.nl/project/Land/",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-primary hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								children: T("funding.projectPage", "View project page")
							}),
							"."
						]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center justify-between md:flex-row",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center gap-4 md:mb-0",
						children: [
							/* @__PURE__ */ jsx("a", {
								href: "https://github.com/CodeEditorLand",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								"aria-label": "Code Editor Land on GitHub (opens in new tab)",
								children: /* @__PURE__ */ jsx(IconTooltip, {
									Label: "GitHub",
									children: /* @__PURE__ */ jsx(ThemeImage, {
										src: "/Image/GitHub.svg",
										alt: "GitHub",
										width: 20,
										height: 20,
										className: "h-5 w-5"
									})
								})
							}),
							/* @__PURE__ */ jsx("span", {
								className: "InlineSeparator",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("a", {
								href: "https://x.com/CodeEditorLand",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								"aria-label": "Code Editor Land on X (opens in new tab)",
								children: /* @__PURE__ */ jsx(IconTooltip, {
									Label: "X (Twitter)",
									children: /* @__PURE__ */ jsx("svg", {
										viewBox: "0 0 24 24",
										fill: "currentColor",
										width: "20",
										height: "20",
										className: "h-5 w-5",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
									})
								})
							}),
							/* @__PURE__ */ jsx("span", {
								className: "InlineSeparator",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground",
								children: T("bottomBar.copyright", {
									year: (/* @__PURE__ */ new Date()).getFullYear(),
									defaultValue: `© ${(/* @__PURE__ */ new Date()).getFullYear()} Code Editor Land. All rights reserved.`
								})
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "https://PlayForm.Cloud",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
							"aria-label": "PlayForm (opens in new tab)",
							children: ["PlayForm", /* @__PURE__ */ jsx("span", {
								className: "InlineSeparator",
								children: "→"
							})]
						}), FooterData.BottomBar?.MadeWith && /* @__PURE__ */ jsx("a", {
							href: "https://tauri.app",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
							"aria-label": "Made with Tauri (opens in new tab)",
							children: /* @__PURE__ */ jsx(ThemeImage, {
								src: "/Image/GitHub/Made/Tauri.svg",
								alt: "Made with Tauri",
								width: 160,
								height: 32,
								className: "h-8",
								loading: "lazy"
							})
						})]
					})]
				})
			]
		})
	});
};
//#endregion
//#region Source/Component/Provider/AnalyticsProvider.tsx
var AnalyticsContext = createContext(null);
var AnalyticsProvider = ({ children }) => {
	const [Client, SetClient] = useState(null);
	useEffect(() => {
		try {
			SetClient(GetWorkersClient());
		} catch {}
	}, []);
	const Track = async (Event, Properties = {}) => {
		if (!Client) return;
		try {
			await Client.Analytics.Track(Event, Properties);
		} catch {}
	};
	const TrackPageView = async (Path, Title) => {
		await Track("pageview", {
			path: Path,
			title: Title,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	};
	const Identify = async (UserIdentifier, Traits = {}) => {
		await Track("user_identified", {
			userId: UserIdentifier,
			...Traits
		});
	};
	const Value = {
		track: Track,
		trackPageView: TrackPageView,
		identify: Identify
	};
	return /* @__PURE__ */ jsx(AnalyticsContext.Provider, {
		value: Value,
		children
	});
};
var UseAnalytics = () => useContext(AnalyticsContext);
//#endregion
//#region Source/Component/Provider/PageviewTracker.tsx
var PageviewTracker = () => {
	const Analytics = UseAnalytics();
	const [IsMounted, SetIsMounted] = useState(false);
	const HasTrackedReference = useRef(false);
	const TrackPageViewReference = useRef(null);
	useEffect(() => {
		SetIsMounted(true);
	}, []);
	useEffect(() => {
		if (!Analytics || !IsMounted) return;
		TrackPageViewReference.current = Analytics.trackPageView;
		const HandleRouteChange = () => {
			if (HasTrackedReference.current) return;
			HasTrackedReference.current = true;
			try {
				const CurrentPath = window.location.pathname;
				const CurrentTitle = document.title;
				TrackPageViewReference.current?.(CurrentPath, CurrentTitle).catch((TrackError) => {
					if (process.env.NODE_ENV !== "production") console.error("Failed to track page view:", TrackError);
				});
			} catch (TrackError) {
				if (process.env.NODE_ENV !== "production") console.error("Failed to track page view:", TrackError);
			}
		};
		HandleRouteChange();
		const HandlePopState = () => {
			HasTrackedReference.current = false;
			HandleRouteChange();
		};
		window.addEventListener("popstate", HandlePopState);
		const OriginalPushState = history.pushState;
		const OriginalReplaceState = history.replaceState;
		history.pushState = function(...Arguments) {
			OriginalPushState.apply(this, Arguments);
			HasTrackedReference.current = false;
			HandleRouteChange();
		};
		history.replaceState = function(...Arguments) {
			OriginalReplaceState.apply(this, Arguments);
			HasTrackedReference.current = false;
			HandleRouteChange();
		};
		return () => {
			window.removeEventListener("popstate", HandlePopState);
			history.pushState = OriginalPushState;
			history.replaceState = OriginalReplaceState;
		};
	}, [IsMounted, Analytics]);
	return null;
};
//#endregion
//#region Source/Component/Social/MetaTags.tsx
var MetaTags_default = ({ title, description, image = "/Favicon/og-image.png", url = "", type = "website", lang = "en", siteName = "Code Editor Land", publishedTime, author, noIndex = false }) => {
	const SafeTitle = title || siteName;
	const SafeDescription = description || "Rust and Tauri editor stack with VS Code API compatibility in progress.";
	const SiteURL = url;
	const SiteOrigin = SiteURL.startsWith("http") ? new URL(SiteURL).origin : "";
	const JSONLD = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url: SiteURL,
		description: SafeDescription
	};
	if (type === "article" && publishedTime) JSONLD.datePublished = publishedTime;
	JSONLD.author = author ? {
		"@type": "Organization",
		name: author
	} : [
		{
			"@type": "Person",
			name: "Nikola R. Hristov",
			url: "https://github.com/NikolaRHristov"
		},
		{
			"@type": "Organization",
			name: "Code Editor Land",
			url: SiteOrigin
		},
		{
			"@type": "Organization",
			name: "PlayForm",
			url: "https://PlayForm.Cloud"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("title", { children: SafeTitle }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: SafeDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "author",
			content: "Nikola R. Hristov, Code Editor Land, PlayForm"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: noIndex ? "noindex, nofollow" : "index, follow"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: SiteURL
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: type
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: SiteURL
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: SafeTitle
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: SafeDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: image.startsWith("http") ? image : `${SiteOrigin}${image}`
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:width",
			content: "1200"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:height",
			content: "675"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image:type",
			content: image.endsWith(".svg") ? "image/svg+xml" : "image/png"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: siteName
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale",
			content: lang
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:url",
			content: SiteURL
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: SafeTitle
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: SafeDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: image.startsWith("http") ? image : `${SiteOrigin}${image}`
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:site",
			content: "@CodeEditorLand"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:creator",
			content: "@CodeEditorLand"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "viewport",
			content: "width=device-width, initial-scale=1.0"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale:alternate",
			content: "bg"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale:alternate",
			content: "de"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "theme-color",
			content: "#ffffff"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "format-detection",
			content: "telephone=no"
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify(JSONLD) }
		})
	] });
};
//#endregion
//#region Source/Library/I18n/Server.ts
/**
* Server-side i18n for Astro prerendered pages.
* Always returns English - locale switching happens client-side
* via react-i18next in hydrated React components.
*/
function GetI18n() {
	if (!i18n.isInitialized) i18n.init({
		resources: {
			en: {
				blog: Blog_default,
				common: Common_default$2,
				doc: Doc_default,
				home: Home_default$2,
				download: Download_default$2,
				account: Account_default$2,
				verify: Verify_default$2,
				header: Header_default$2,
				footer: Footer_default$2,
				meta: Meta_default$2
			},
			bg: {
				common: Common_default,
				home: Home_default,
				download: Download_default,
				account: Account_default,
				verify: Verify_default,
				header: Header_default,
				footer: Footer_default,
				meta: Meta_default
			},
			de: {
				common: Common_default$1,
				home: Home_default$1,
				download: Download_default$1,
				account: Account_default$1,
				verify: Verify_default$1,
				header: Header_default$1,
				footer: Footer_default$1,
				meta: Meta_default$1
			},
			fr: {
				common: Common_default$4,
				home: Home_default$4,
				download: Download_default$4,
				account: Account_default$4,
				verify: Verify_default$4,
				header: Header_default$4,
				footer: Footer_default$4,
				meta: Meta_default$4
			},
			es: {
				common: Common_default$3,
				home: Home_default$3,
				download: Download_default$3,
				account: Account_default$3,
				verify: Verify_default$3,
				header: Header_default$3,
				footer: Footer_default$3,
				meta: Meta_default$3
			}
		},
		lng: "en",
		fallbackLng: "en",
		defaultNS: "common",
		ns: [
			"blog",
			"common",
			"doc",
			"home",
			"download",
			"account",
			"verify",
			"header",
			"footer",
			"meta"
		],
		interpolation: { escapeValue: false }
	});
	return i18n.getFixedT("en");
}
//#endregion
//#region Source/Layout/Base.astro
createAstro("https://editor.land");
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const RawPath = Astro.url.pathname === "/" ? "/" : Astro.url.pathname.replace(/\/$/, "");
	const CanonicalPath = PascalCaseCanonical[RawPath] ?? RawPath;
	const DefaultURL = Astro.url.href;
	const OpenGraphSlug = CanonicalPath === "/" ? "" : CanonicalPath.replace(/^\//, "");
	const DefaultOpenGraphImage = OpenGraphSlug ? `/OpenGraph/${OpenGraphSlug}.svg` : "/OpenGraph.svg";
	const { Title, Description, Language = "en", Direction = "ltr", Image = DefaultOpenGraphImage, Url = DefaultURL, Type = "website", NoIndex = false } = Astro.props;
	const T = GetI18n();
	return renderTemplate`<html${addAttribute(Language, "lang")} class="no-js"${addAttribute(Direction, "dir")}> <head><meta charset="utf-8">${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=0&lang.ts")}<!-- Theme: set the .dark class before first paint to avoid a flash.
		 Stored preference wins; otherwise fall back to the OS color scheme.
		 See .claude/skills/land-design/Reference/Theme.md --><script crossorigin=\"anonymous\">
			(() => {
				try {
					const Stored = localStorage.getItem("Theme");
					const Dark =
						Stored === "dark" ||
						(!Stored &&
							window.matchMedia("(prefers-color-scheme: dark)")
								.matches);
					const Root = document.documentElement;
					Root.classList.toggle("dark", Dark);
					// Tell the browser which color scheme is active so that
					// prefers-color-scheme media queries in <picture> evaluate
					// against the user's stored choice, not just the OS setting.
					Root.style.colorScheme = Dark ? "dark" : "light";
					const Meta = document.querySelector(
						'meta[name="theme-color"]',
					);
					if (Meta)
						Meta.setAttribute(
							"content",
							Dark ? "#0a0a0c" : "#ffffff",
						);
					// Also set source[data-theme-dark].media directly so that
					// browsers which don't propagate color-scheme to picture still
					// show the right image on first paint.
					// MutationObserver fires as each <source> is inserted during
					// HTML parsing - before the browser evaluates which source to
					// load - so no flash even when OS and stored preference differ.
					const SyncSource = (S) => {
						S.media = Dark ? "all" : "(prefers-color-scheme: dark)";
					};
					const Observer = new MutationObserver(() => {
						Root.querySelectorAll(
							"source[data-theme-dark]:not([data-ts])",
						).forEach((S) => {
							S.setAttribute("data-ts", "");
							SyncSource(S);
						});
					});
					Observer.observe(Root, {
						subtree: true,
						childList: true,
					});
					// Disconnect after full parse; also catch any sources that
					// arrived before the observer was ready.
					document.addEventListener(
						"DOMContentLoaded",
						() => {
							Root.querySelectorAll(
								"source[data-theme-dark]",
							).forEach(SyncSource);
							// <jelly-theme> defaults to mode="auto" (OS
							// preference only) - force it to match the
							// stored/resolved Dark boolean so Jelly UI buttons
							// track the same manual toggle as the rest of the
							// site instead of drifting from prefers-color-scheme.
							Root.querySelectorAll("jelly-theme").forEach(
								(T) => {
									T.setAttribute(
										"mode",
										Dark ? "dark" : "light",
									);
								},
							);
							Observer.disconnect();
						},
						{ once: true },
					);
				} catch (_) {}
			})();
		<\/script><!-- Dynamic Meta Tags -->${renderComponent($$result, "MetaTags", MetaTags_default, {
		"title": Title || T("meta.title", { defaultValue: "Land" }),
		"description": Description || T("meta.description", { defaultValue: "Code Editor" }),
		"image": Image,
		"url": Url,
		"type": Type,
		"lang": Language,
		"noIndex": NoIndex
	})}<meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#ffffff"><meta name="format-detection" content="telephone=no"><meta name="twitter:dnt" content="on"><!-- Fonts: self-hosted Geist, Geist Mono, and Instrument Serif woff2
		 files under Public/Font/, declared via @font-face in Font.css
		 (imported by Global.css below) - no requests to fonts.googleapis.com
		 or fonts.gstatic.com. Preload the primary latin subsets so the
		 highest-priority glyphs fetch immediately instead of waiting on CSS
		 parsing. font-display: swap avoids render-blocking; CLS from font
		 swap is prevented by font-size-adjust: 0.52 in Global.css (matches
		 Geist's x-height ratio). --><link rel="preload" as="font" type="font/woff2" href="/Font/Geist/Geist-Latin.woff2" crossorigin=\"anonymous\"><link rel="preload" as="font" type="font/woff2" href="/Font/GeistMono/GeistMono-Latin.woff2" crossorigin=\"anonymous\"><!-- LCP optimization: preload hero logo used in DynamicHeroSection --><link rel="preload" as="image" href="/Asset/Logo/Glyph/Land.svg"><!-- Dark-mode rules that reference selectors added dynamically by JS
		     (.dark class, Shiki --shiki-dark-* vars). PostCSS's discardUnused
		     strips them from build output because the analyzer never sees the
		     .dark class on <html>. is:inline bypasses Vite/PostCSS entirely
		     and guarantees they survive minification. --><style>
			/* Invert pre-rendered Mermaid SVGs in dark mode */
			.dark .mermaid-diagram svg {
				filter: invert(1) hue-rotate(180deg);
			}

			/* Activate Shiki dual-theme CSS variables in dark mode.
			   Shiki inlines background-color on <pre> and colors on
			   <span> elements. !important is required to beat inline
			   styles - CSS variables alone aren't enough. */
			.dark .astro-code-themes,
			.dark .astro-code-themes span {
				color: var(--shiki-dark, inherit) !important;
				background-color: var(--shiki-dark-bg, inherit) !important;
			}
		</style><!-- i18n client - must initialize before any React component hydrates -->${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=1&lang.ts")}<script crossorigin=\"anonymous\" type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Code Editor Land",
		operatingSystem: "Windows, macOS, Linux",
		applicationCategory: "DeveloperApplication",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD"
		},
		url: Astro.site?.href ?? "",
		downloadUrl: `${Astro.site?.href ?? ""}Download`,
		license: "https://creativecommons.org/publicdomain/zero/1.0/"
	}))}<\/script>${renderSlot($$result, $$slots["Head"])}<!-- Favicon --><link rel="icon" type="image/png" href="/Favicon/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/Favicon/favicon.svg"><link rel="shortcut icon" href="/Favicon/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="Code Editor Land"><link rel="manifest" href="/Favicon/site.webmanifest"><!-- Jelly UI (https://github.com/jelly-org/ui) - self-hosted from the
		 Vendor/JellyUI submodule (built by
		 Maintain/Script/BuildJellyUIVendor.sh into Public/Vendor/JellyUI/,
		 served here from our own origin) rather than the jelly-ui.com CDN,
		 so it's not a build- or runtime-time dependency on a third party.
		 Upgrades the <jelly-*> elements rendered below once it loads. --><script crossorigin=\"anonymous\" type="module"${addAttribute(`/Asset/JellyUI/jelly.js?v=${JellyUIVersion}`, "src")}><\/script>${renderHead($$result)}</head> <body> <a href="#main-content" class="sr-only fixed left-2 top-2 z-[100] -translate-y-full bg-primary px-4 py-2 font-medium text-primary-fg transition-transform focus:not-sr-only focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">
Skip to main content
</a> ${renderComponent($$result, "jelly-theme", "jelly-theme", {
		"id": "JellyTheme",
		"mode": "auto"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Background", $$Background, {})} ${renderComponent($$result, "AnalyticsProvider", AnalyticsProvider, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageviewTracker", PageviewTracker, {})} <main id="main-content" class="grow" tabindex="-1"> ${renderComponent($$result, "ErrorBoundary", ErrorBoundary, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
		"client:component-export": "ErrorBoundary"
	}, { "default": ($$result) => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })} </main> ` })} <div id="Footer" class="shrink"> ${renderComponent($$result, "Footer", Footer, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.tsx",
		"client:component-export": "Footer"
	})} </div> ` })} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=2&lang.ts")}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=3&lang.ts")}<a class="absolute left-0 top-0 hidden" rel="me" href="https://x.com/CodeEditorLand" aria-hidden="true" tabindex="-1"></a> </body> </html>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro", void 0);
//#endregion
export { cn as a, IconTooltip as i, GetI18n as n, ThemeImage as o, ErrorBoundary as r, renderScript as s, $$Base as t };
