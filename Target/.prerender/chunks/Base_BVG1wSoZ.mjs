import { E as addAttribute, S as createRenderInstruction, b as maybeRenderHead, d as renderComponent, g as renderSlot, k as unescapeHTML, p as Fragment$2, r as spreadAttributes, x as renderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { G as UnavailableAstroGlobal, Y as AstroError } from "./errors-data_DzKpkiVr.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { t as getCollection } from "./_astro_content_DQt8W2iZ.mjs";
import { a as ClaimsPath, n as CanonicalizePath } from "./Map_ChnMuG2V.mjs";
import { i as Served, n as Lab } from "./Lab_C7Fe6NZ4.mjs";
import { t as Account_default } from "./Account_DkHApT95.mjs";
import { t as Common_default } from "./Common_DqiiiQME.mjs";
import { t as Download_default } from "./Download_Bv-REu47.mjs";
import { t as Footer_default } from "./Footer_KU83IGQg.mjs";
import { t as Header_default } from "./Header_C7iOtyYF.mjs";
import { t as Home_default } from "./Home_B6-Vtaf-.mjs";
import { t as Meta_default } from "./Meta_Cwv4m9VM.mjs";
import { t as Verify_default } from "./Verify_0TRUgXYP.mjs";
import { t as Account_default$1 } from "./Account_DT-OXHCN.mjs";
import { t as Common_default$1 } from "./Common_CdPdV538.mjs";
import { t as Download_default$1 } from "./Download_CUunMaCs.mjs";
import { t as Footer_default$1 } from "./Footer_Daq6mPgi.mjs";
import { t as Header_default$1 } from "./Header_BA_bRSu9.mjs";
import { t as Home_default$1 } from "./Home_x1zRs4t4.mjs";
import { t as Meta_default$1 } from "./Meta_DBmHKBI1.mjs";
import { t as Verify_default$1 } from "./Verify_pFxMY0rn.mjs";
import { t as Account_default$2 } from "./Account_BNfVoZlT.mjs";
import { t as Blog_default } from "./Blog_CmgU6V3o.mjs";
import { t as Common_default$2 } from "./Common_B39QRECb.mjs";
import { t as Doc_default } from "./Doc_fjZivRFx.mjs";
import { t as Download_default$2 } from "./Download_Dh1rjS_A.mjs";
import { t as Footer_default$2 } from "./Footer_B1ln_Ykx.mjs";
import { t as Header_default$2 } from "./Header_B0Igtia-.mjs";
import { t as Home_default$2 } from "./Home_CMDi8mxV.mjs";
import { t as Meta_default$2 } from "./Meta_BAkh3xSR.mjs";
import { t as Verify_default$2 } from "./Verify_P-7gPHwL.mjs";
import { t as Account_default$3 } from "./Account_B0V3MIvw.mjs";
import { t as Common_default$3 } from "./Common_HKN6j4uB.mjs";
import { t as Download_default$3 } from "./Download_voVzV4aN.mjs";
import { t as Footer_default$3 } from "./Footer_ngdGAG6o.mjs";
import { t as Header_default$3 } from "./Header_DS3vBUyb.mjs";
import { t as Home_default$3 } from "./Home_CvFMPvEM.mjs";
import { t as Meta_default$3 } from "./Meta_D289X13U.mjs";
import { t as Verify_default$3 } from "./Verify_CpH9LHgk.mjs";
import { t as Account_default$4 } from "./Account_Bu7sHrMc.mjs";
import { t as Common_default$4 } from "./Common_BTNIcvfe.mjs";
import { t as Download_default$4 } from "./Download_Df3hwH42.mjs";
import { t as Footer_default$4 } from "./Footer_aqtqMRqw.mjs";
import { t as Header_default$4 } from "./Header_CqoLKaFF.mjs";
import { t as Home_default$4 } from "./Home_C68o_5Oa.mjs";
import { t as Meta_default$4 } from "./Meta_DKuZmaWA.mjs";
import { t as Verify_default$4 } from "./Verify_HIbMmMv9.mjs";
import { l as Requests, n as ContactPurposeFor, r as ContactPurposeOf, t as ContactPurposeAt } from "./Purpose_DgbipYwf.mjs";
import { r as ElementRepos } from "./Links_CUZs8crr.mjs";
import { t as PageMetadata } from "./PageMetadata_ChwFHD7t.mjs";
import * as React$1 from "react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { initReactI18next, useTranslation } from "react-i18next";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import i18n from "i18next";
import * as lucide from "lucide-react";
import { ChevronDown } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Command } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
// node_modules/@astrojs/runtime/dist/internal/server/astro-global.js
var ASTRO_GENERATOR = `Astro v7.4.13`;
function createError(name) {
	return new AstroError({
		...UnavailableAstroGlobal,
		message: UnavailableAstroGlobal.message(name)
	});
}
function createAstro(site) {
	return {
		get site() {
			console.warn(`Astro.site inside getStaticPaths is deprecated and will be removed in a future major version of Astro. Use import.meta.env.SITE instead`);
			return site ? new URL(site) : void 0;
		},
		get generator() {
			console.warn(`Astro.generator inside getStaticPaths is deprecated and will be removed in a future major version of Astro.`);
			return ASTRO_GENERATOR;
		},
		get callAction() {
			throw createError("callAction");
		},
		get clientAddress() {
			throw createError("clientAddress");
		},
		get cookies() {
			throw createError("cookies");
		},
		get csp() {
			throw createError("csp");
		},
		get currentLocale() {
			throw createError("currentLocale");
		},
		get getActionResult() {
			throw createError("getActionResult");
		},
		get isPrerendered() {
			throw createError("isPrerendered");
		},
		get locals() {
			throw createError("locals");
		},
		get originPathname() {
			throw createError("originPathname");
		},
		get params() {
			throw createError("params");
		},
		get preferredLocale() {
			throw createError("preferredLocale");
		},
		get preferredLocaleList() {
			throw createError("preferredLocaleList");
		},
		get props() {
			throw createError("props");
		},
		get redirect() {
			throw createError("redirect");
		},
		get request() {
			throw createError("request");
		},
		get response() {
			throw createError("response");
		},
		get rewrite() {
			throw createError("rewrite");
		},
		get routePattern() {
			throw createError("routePattern");
		},
		get self() {
			throw createError("self");
		},
		get slots() {
			throw createError("slots");
		},
		get url() {
			throw createError("url");
		},
		get session() {
			throw createError("session");
		},
		get cache() {
			throw createError("cache");
		},
		get logger() {
			throw createError("logger");
		}
	};
}
// node_modules/@astrojs/runtime/dist/internal/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
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
// Source/Component/UI/Utility.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
// Source/Component/UI/Button.tsx
var ButtonVariants = cva("inline-flex items-center justify-center gap-0 whitespace-nowrap select-none touch-manipulation rounded-none font-mono text-sm font-medium uppercase tracking-wider transition-[background-color,color,transform] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[color-mix(in_srgb,var(--Ring)_40%,transparent)] focus-visible:ring-[2px] aria-invalid:ring-[color-mix(in_srgb,var(--Destruct)_20%,transparent)]", {
	variants: {
		variant: {
			default: "bg-foreground text-bg hover:bg-[color-mix(in_srgb,var(--Foreground)_85%,transparent)]",
			destructive: "bg-destruct text-destruct-fg hover:bg-[color-mix(in_srgb,var(--Destruct)_85%,transparent)] focus-visible:ring-[color-mix(in_srgb,var(--Destruct)_20%,transparent)]",
			outline: "bg-background text-fg border border-divider hover:bg-mute",
			secondary: "bg-secondary text-secondary-fg hover:bg-surface3",
			ghost: "text-fg hover:bg-mute",
			link: "text-fg underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-[2.1rem] py-2 has-[>svg]:px-[1.8rem]",
			sm: "h-9 gap-0 px-3 has-[>svg]:px-2.5",
			lg: "h-11 px-[2.6rem] has-[>svg]:px-[2.2rem]",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var JellyColorOverride = {
	default: {
		"--jelly-color-background-accent": "var(--Foreground)",
		"--jelly-color-foreground-on-accent": "var(--Background)"
	},
	destructive: {
		"--jelly-color-background-rose": "var(--Destruct)",
		"--jelly-color-foreground-on-emphasis": "var(--DestructForeground)"
	},
	outline: {
		"--jelly-color-background-neutral": "var(--Background)",
		"--jelly-color-foreground-on-neutral": "var(--Foreground)"
	},
	secondary: {
		"--jelly-color-background-neutral-emphasis": "var(--Secondary)",
		"--jelly-color-foreground-on-emphasis": "var(--SecondaryForeground)"
	}
};
var JellySizeOverride = {
	default: {
		"--jelly-button-height": "40px",
		"--jelly-button-padding-inline": "2.1rem",
		"--jelly-button-min-width": "0px"
	},
	sm: {
		"--jelly-button-height": "36px",
		"--jelly-button-padding-inline": "0.75rem",
		"--jelly-button-min-width": "0px"
	},
	lg: {
		"--jelly-button-height": "44px",
		"--jelly-button-padding-inline": "2.6rem",
		"--jelly-button-min-width": "0px"
	},
	icon: { "--jelly-icon-button-size": "40px" }
};
var JellyVariantAttribute = {
	destructive: "rose",
	outline: "platinum",
	secondary: "graphite"
};
var JellySizeAttribute = {
	default: "md",
	sm: "sm",
	lg: "lg"
};
var Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
	if (asChild) return /* @__PURE__ */ jsx(Slot, {
		"data-slot": "button",
		ref,
		className: cn(ButtonVariants({
			variant,
			size,
			className
		})),
		...props,
		draggable: false,
		children
	});
	if (variant === "ghost" || variant === "link" || props.style) return /* @__PURE__ */ jsx("button", {
		"data-slot": "button",
		ref,
		className: cn(ButtonVariants({
			variant,
			size,
			className
		})),
		...props,
		children
	});
	const JellyRef = ref;
	if (size === "icon") return /* @__PURE__ */ jsx("jelly-icon-button", {
		"data-slot": "button",
		ref: JellyRef,
		variant: JellyVariantAttribute[variant],
		label: props["aria-label"],
		className,
		style: {
			"--jelly-icon-button-radius": "var(--RadiusButton)",
			"--jelly-ring": "var(--Ring)",
			...JellySizeOverride.icon,
			...JellyColorOverride[variant]
		},
		...props,
		children
	});
	return /* @__PURE__ */ jsx("jelly-button", {
		"data-slot": "button",
		ref: JellyRef,
		variant: JellyVariantAttribute[variant],
		size: JellySizeAttribute[size ?? "default"],
		block: className?.includes("w-full") || void 0,
		className,
		style: {
			"--jelly-button-radius": "var(--RadiusButton)",
			"--jelly-ring": "var(--Ring)",
			...JellySizeOverride[size ?? "default"],
			...JellyColorOverride[variant]
		},
		...props,
		children
	});
});
Button.displayName = "Button";
// Source/Component/Layout/Frame/Data.ts
/**
* The ten parts, in the order a dossier is read: the cover, the offer, the
* manual, the notes, the way in, then the legal back matter, then the two app
* surfaces. Nothing here is a new destination - each `Href` is a route the site
* already serves.
*/
var FrameSections = [
	{
		Index: "01",
		Key: "home",
		Label: "HOME",
		Href: "/",
		Prefixes: ["/", "/Compare"]
	},
	{
		Index: "02",
		Key: "download",
		Label: "DOWNLOAD",
		Href: "/Download",
		Prefixes: ["/Download", "/Status"]
	},
	{
		Index: "03",
		Key: "doc",
		Label: "DOCUMENTATION",
		Href: "/Doc",
		Prefixes: [
			"/Doc",
			"/Glossary",
			"/Motion"
		]
	},
	{
		Index: "04",
		Key: "blog",
		Label: "BLOG",
		Href: "/Blog",
		Prefixes: ["/Blog"]
	},
	{
		Index: "05",
		Key: "contact",
		Label: "CONTACT",
		Href: "/Contact",
		Prefixes: ["/Contact"]
	},
	{
		Index: "06",
		Key: "license",
		Label: "LICENSE",
		Href: "/License",
		Prefixes: ["/License"]
	},
	{
		Index: "07",
		Key: "contributing",
		Label: "CONTRIBUTING",
		Href: "/Contributing",
		Prefixes: ["/Contributing"]
	},
	{
		Index: "08",
		Key: "legal",
		Label: "LEGAL",
		Href: "/Legal/Privacy",
		Prefixes: ["/Legal"]
	},
	{
		Index: "09",
		Key: "portal",
		Label: "PORTAL",
		Href: "/Portal",
		Prefixes: ["/Portal", "/Dashboard"]
	},
	{
		Index: "10",
		Key: "account",
		Label: "ACCOUNT",
		Href: "/Account",
		Prefixes: [
			"/Account",
			"/Verify",
			"/OAuth"
		]
	}
];
/**
* The index itself, printed after the ten.
*
* `/Contents` is the document's table of contents, and a table of contents is not
* an eleventh part: it is the index *of* the ten. So it is deliberately not in
* `FrameSections` - the extent stays `10`, the rail keeps its ten numbered tabs,
* and the top-level nav keeps its ten parts - and it is printed as a closing row
* instead, carrying the grammar's relation mark (`↳`) where a part carries a
* series index.
*
* The frame still has to place a page that is open at the index, or the running
* head would print `◎ UNFILED` on the one page that files everything: `Index`
* therefore holds the mark, and `FrameSectionOf` resolves `/Contents` to this
* record. It is the only entry the extent does not count.
*/
var FrameClosing = {
	Index: "↳",
	Key: "contents",
	Label: "CONTENTS",
	Href: "/Contents",
	Prefixes: ["/Contents"]
};
/**
* The fallback part. `◎` is the grammar's mark for a thing with no glyph, and it
* is the right mark here: a 404 or a visit record is genuinely unfiled, and
* printing `◎␁UNFILED` says so instead of pretending the page is part of a
* section it is not.
*/
var FrameUnfiled = {
	Index: "◎",
	Key: "unfiled",
	Label: "UNFILED",
	Href: "/",
	Prefixes: []
};
/** The extent of the document, as the running head prints it (`03␁/␁10`). */
var FrameExtent = String(FrameSections.length).padStart(2, "0");
/** A path without its trailing slash, with `/` kept for the root, lowercased. */
var Normalize$2 = (Path) => {
	const Trimmed = Path.replace(/\/+$/, "");
	return (Trimmed === "" ? "/" : Trimmed).toLowerCase();
};
/** Does the reader stand on this prefix, or under it? `/` matches exactly. */
var OnPrefix = (Prefix, Current) => {
	const Normalized = Normalize$2(Prefix);
	return Normalized === "/" ? Current === "/" : Current === Normalized || Current.startsWith(`${Normalized}/`);
};
/**
* The part a path belongs to, the closing index record, or the unfiled record.
* First match wins, so the table's order is the resolution order and no two
* entries may claim one prefix. The extent (`FrameExtent`) is still
* `FrameSections.length`: the closing record is a position in the frame, not a
* part of the count.
*/
var FrameSectionOf = (Path) => {
	const Current = Normalize$2(Path);
	return [...FrameSections, FrameClosing].find((Section) => Section.Prefixes.some((Prefix) => OnPrefix(Prefix, Current))) ?? FrameUnfiled;
};
/** The label a section prints, with the locale file able to override it. */
var FrameLabel = (Section, T) => T(`index.${Section.Key}`, { defaultValue: Section.Label });
// Source/Component/Layout/Frame/Rail.tsx
var Rail = ({ Translate }) => /* @__PURE__ */ jsxs("nav", {
	className: "FrameRail",
	id: "FrameRail",
	"aria-label": Translate("index.label", { defaultValue: "Dossier index" }),
	children: [
		/* @__PURE__ */ jsxs("p", {
			className: "FrameRailLabel",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "FrameRailMark",
					"aria-hidden": "true",
					children: "#"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "FrameRailWord",
					children: Translate("index.field", { defaultValue: "INDEX:" })
				}),
				/* @__PURE__ */ jsx("span", {
					className: "FrameRailSep",
					"aria-hidden": "true",
					children: " "
				}),
				/* @__PURE__ */ jsx("span", {
					className: "FrameRailCount",
					children: FrameExtent
				})
			]
		}),
		FrameSections.map((Section) => {
			const Label = FrameLabel(Section, Translate);
			return /* @__PURE__ */ jsxs("a", {
				className: "FrameRailTab",
				href: Section.Href,
				"data-section": Section.Key,
				title: `${Section.Index}\u2001/\u2001${Label}`,
				"aria-label": `${Section.Index} ${Label}`,
				children: [/* @__PURE__ */ jsx("span", {
					className: "FrameRailIndex",
					children: Section.Index
				}), /* @__PURE__ */ jsx("span", {
					className: "FrameRailName",
					children: Label
				})]
			}, Section.Key);
		}),
		/* @__PURE__ */ jsxs("a", {
			className: "FrameRailTab FrameRailTabClosing",
			href: FrameClosing.Href,
			"data-section": FrameClosing.Key,
			title: `${FrameClosing.Index}\u2001/\u2001${FrameLabel(FrameClosing, Translate)}`,
			"aria-label": FrameLabel(FrameClosing, Translate),
			children: [/* @__PURE__ */ jsx("span", {
				className: "FrameRailIndex",
				"aria-hidden": "true",
				children: FrameClosing.Index
			}), /* @__PURE__ */ jsx("span", {
				className: "FrameRailName",
				children: FrameLabel(FrameClosing, Translate)
			})]
		})
	]
});
// Source/Component/Layout/Frame/RunningHead.tsx
var RunningHead = ({ Logo, Translate }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("p", {
	className: "HeaderRunningHead",
	children: [
		/* @__PURE__ */ jsx("span", {
			className: "HeaderRecordMarker",
			"aria-hidden": "true",
			children: "#"
		}),
		/* @__PURE__ */ jsx("a", {
			className: "HeaderRecordName",
			href: "/",
			children: Logo
		}),
		/* @__PURE__ */ jsx("span", {
			className: "HeaderSectionDivider",
			"aria-hidden": "true",
			children: "/"
		}),
		[
			...FrameSections,
			FrameClosing,
			FrameUnfiled
		].map((Section) => /* @__PURE__ */ jsxs("span", {
			className: "HeaderSection",
			"data-section": Section.Key,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "HeaderSectionIndex",
					children: Section.Index
				}),
				" ",
				FrameLabel(Section, Translate)
			]
		}, Section.Key)),
		/* @__PURE__ */ jsx("span", {
			className: "HeaderLayoutDivider",
			"aria-hidden": "true",
			children: "/"
		}),
		/* @__PURE__ */ jsx("span", {
			className: "HeaderLayout",
			children: [
				"reading",
				"workspace",
				"audit",
				"plate",
				"record"
			].map((Key) => /* @__PURE__ */ jsx("span", {
				className: "HeaderLayoutWord",
				"data-layout": Key,
				children: Key.toUpperCase()
			}, Key))
		})
	]
}), /* @__PURE__ */ jsx("p", {
	className: "HeaderPosition",
	"aria-hidden": "true",
	children: [
		...FrameSections,
		FrameClosing,
		FrameUnfiled
	].map((Section) => /* @__PURE__ */ jsxs("span", {
		"data-section": Section.Key,
		children: [
			Section.Index,
			" / ",
			FrameExtent
		]
	}, Section.Key))
})] });
// Source/Component/Layout/Header/Data.ts
/**
* The destinations the header has always carried, in the order they are read.
* `Section` marks an in-page anchor: that link is active only while its own
* section is the one in view on the page the anchor belongs to.
*/
var HeaderLinkList = [
	{
		Key: "nav.features",
		Label: "Features",
		Href: "/#features",
		Section: "features"
	},
	{
		Key: "nav.download",
		Label: "Download",
		Href: "/Download"
	},
	{
		Key: "nav.docs",
		Label: "Documentation",
		Href: "/Doc"
	},
	{
		Key: "nav.github",
		Label: "GitHub",
		Href: "https://github.com/CodeEditorLand/Land",
		Target: "blank"
	}
];
/**
* The action row the bar has always carried. No destination is added and none is
* dropped - the bar states where the reader can go, it does not invent a CTA.
*/
var HeaderActionList = [
	{
		Key: "actions.signIn",
		Label: "Sign In",
		Href: "/Account/SignIn",
		Variant: "ghost"
	},
	{
		Key: "actions.editorPortal",
		Label: "Editor Portal",
		Href: "/Portal",
		Variant: "ghost"
	},
	{
		Key: "actions.getStarted",
		Label: "Get Land",
		Href: "/Download",
		Variant: "default"
	}
];
/** The section ids the nav watches, in document order. */
var HeaderSections = (Links) => Links.flatMap((Link) => Link.Section === void 0 ? [] : [Link.Section]);
/**
* The status line is the product's own state in the vocabulary the design
* system fixes (`DesignSystem-Components.md` §7: `STATUS:` plus one term from
* `READY`/`ACTIVE`/`LOADING`/`PREPARING`/`VERIFIED`/`UNAVAILABLE`/
* `INTERRUPTED`/`ARCHIVED`). `ACTIVE` is the record's tone as well
* (`Source/Content/Record/Land.ts` `Status.Tone` is `specimen`), and
* `PRE-RELEASE` is the homepage's `softwareVersion`, kept as the qualifier after
* the em quad so a reader landing on any page learns this is not a shipped
* installer. U+2001 is the only separator the grammar allows - never a middle
* dot.
*/
var HeaderStatus = `STATUS: ACTIVE\u2001PRE-RELEASE`;
/** Resolve the default labels: one translator in, the same rows out. */
var ResolveLinks = (T) => HeaderLinkList.map((Link) => ({
	...Link,
	Label: T(Link.Key ?? Link.Label, { defaultValue: Link.Label })
}));
/** Resolve the default action labels the same way. */
var ResolveActions = (T) => HeaderActionList.map((Action) => ({
	...Action,
	Label: T(Action.Key ?? Action.Label, { defaultValue: Action.Label })
}));
/** An href that leaves this site opens in a second tab. */
var TargetOf = (Href) => Href.startsWith("http") ? "blank" : "self";
/** The in-page anchor an href names, when it names one. */
var SectionOf = (Href) => {
	const Anchor = Href.split("#")[1];
	return Anchor === void 0 || Anchor === "" ? void 0 : Anchor;
};
/** The button variants the bar may wear; anything else is the default weight. */
var ActionVariant = (Variant) => Variant === "ghost" || Variant === "outline" ? Variant : "default";
/** A caller's destination, in the same row shape the defaults use. */
var ContentLink = (Link) => {
	const Section = SectionOf(Link.Href);
	return {
		Label: Link.Label,
		Href: Link.Href,
		...Section === void 0 ? {} : { Section },
		...TargetOf(Link.Href) === "self" ? {} : { Target: "blank" }
	};
};
/** A caller's action, in the same row shape the defaults use. */
var ContentAction = (Action) => {
	const Href = Action.Href ?? "#";
	return {
		Label: Action.Text,
		Href,
		Variant: ActionVariant(Action.Variant),
		...TargetOf(Href) === "self" ? {} : { Target: "blank" }
	};
};
/**
* The bar's content, resolved once: a caller's `Content` when it has that part,
* the site's own rows otherwise. Both arms return the same shapes, so the
* component has one nav to render and one action row - never a second copy for
* the other breakpoint, and never a branch inside the markup.
*/
var HeaderView = (Content, T) => ({
	Logo: Content?.Logo?.Text ?? T("logo", { defaultValue: "Land" }),
	Links: Content?.Navigation === void 0 ? ResolveLinks(T) : Content.Navigation.map(ContentLink),
	Actions: Content?.Actions === void 0 ? ResolveActions(T) : Content.Actions.map(ContentAction)
});
/** A path without its trailing slash, with `/` kept for the root. */
var Normalize$1 = (Path) => {
	const Trimmed = Path.replace(/\/+$/, "");
	return Trimmed === "" ? "/" : Trimmed;
};
/** Does the reader stand on this route, or under it? */
var OnRoute = (Route, Current) => Route === "/" ? Current === "/" : Current === Route || Current.startsWith(`${Route}/`);
/**
* Active state, computed from the current path and - for an in-page anchor - the
* section in view. A section link is never active on another page, and an
* off-site link is never active at all: an href comparison alone cannot tell the
* two apart, which is why the path and the section are separate inputs.
*/
var HeaderLinkState = (Link, Path, Section) => {
	if (Link.Target === "blank") return "idle";
	const [Base = "/", Anchor] = Link.Href.split("#");
	if (!OnRoute(Normalize$1(Base), Normalize$1(Path))) return "idle";
	return Anchor === void 0 || Anchor === Section ? "active" : "idle";
};
/** The attributes an off-site link needs; a same-tab link needs none. */
var HeaderLinkAttributes = (Target) => Target === "blank" ? {
	target: "_blank",
	rel: "noopener noreferrer"
} : {};
// Source/Library/I18n/Client.ts
/**
* I18n Client - browser-side i18next initialization with lazy namespace loading.
*
* Supports 5 locales (en, bg, de, fr, es) over 10 namespaces: the four core
* ones load eagerly on every page, the other six on demand.
* Two-phase init: starts with lng:"en", then switches to detected locale
* post-hydration to avoid SSR/client mismatch.
*/
var SupportedLocaleList = [
	"en",
	"bg",
	"de",
	"fr",
	"es"
];
var LocaleLabel = {
	en: "English",
	bg: "Bulgarian",
	de: "Deutsch",
	fr: "Français",
	es: "Español"
};
var NamespaceList = [
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
];
/**
* Core namespaces loaded eagerly on every page (common UI chrome).
* Page-specific namespaces (blog, doc, home, download, account, verify)
* are loaded lazily when a component calls useTranslation("blog") etc.
*/
var CoreNamespaceList$1 = [
	"common",
	"header",
	"footer",
	"meta"
];
function DetectLocale() {
	if (typeof window === "undefined") return "en";
	const Parameter = new URL(window.location.href).searchParams.get("lng");
	if (Parameter && SupportedLocaleList.includes(Parameter)) return Parameter;
	const Cookie = document.cookie.match(/LOCALE=([^;]+)/);
	if (Cookie?.[1] && SupportedLocaleList.includes(Cookie[1])) return Cookie[1];
	return "en";
}
/**
* Core namespace loader: only common, header, footer, meta.
* These load eagerly on every page for the global UI chrome.
*/
var LoadEnglishCore = async () => {
	const [common, header, footer, meta] = await Promise.all([
		import("./Common_DpbvXc3U.mjs"),
		import("./Header_BT01FD8q.mjs"),
		import("./Footer_SlxG-68k.mjs"),
		import("./Meta_DzI2pXdX.mjs")
	]);
	return {
		common: common.default,
		header: header.default,
		footer: footer.default,
		meta: meta.default
	};
};
/**
* Page-specific namespace loaders: blog, doc, home, download, account, verify.
* These are fetched lazily when a page component calls LoadNamespace().
* Vite resolves each import to a separate chunk fetched only when needed.
*/
var PageNamespaceLoader = {
	en: {
		blog: async () => (await import("./Blog_D-wF_OgM.mjs")).default,
		doc: async () => (await import("./Doc_CKrIbHva.mjs")).default,
		home: async () => (await import("./Home_e72DcWUn.mjs")).default,
		download: async () => (await import("./Download_DpfENbyA.mjs")).default,
		account: async () => (await import("./Account_BLtof3tj.mjs")).default,
		verify: async () => (await import("./Verify_CyK_h9C2.mjs")).default
	},
	bg: {
		blog: async () => (await import("./Blog_DvqZsvP1.mjs")).default,
		doc: async () => (await import("./Doc_Cl451sEv.mjs")).default,
		home: async () => (await import("./Home_BwUuP6rY.mjs")).default,
		download: async () => (await import("./Download_BTviD6NV.mjs")).default,
		account: async () => (await import("./Account_CUfzgMgc.mjs")).default,
		verify: async () => (await import("./Verify_DCh9KDu_.mjs")).default
	},
	de: {
		blog: async () => (await import("./Blog_JVIERipw.mjs")).default,
		doc: async () => (await import("./Doc_r-mzV8eU.mjs")).default,
		home: async () => (await import("./Home_B6xgr4-1.mjs")).default,
		download: async () => (await import("./Download_ydKFuYUz.mjs")).default,
		account: async () => (await import("./Account_B9VWJ5Gv.mjs")).default,
		verify: async () => (await import("./Verify_jRjGNXF8.mjs")).default
	},
	fr: {
		blog: async () => (await import("./Blog_eo1_Av1X.mjs")).default,
		doc: async () => (await import("./Doc_DjwsK_1c.mjs")).default,
		home: async () => (await import("./Home_DY3CZrUZ.mjs")).default,
		download: async () => (await import("./Download_CkPo_Yeu.mjs")).default,
		account: async () => (await import("./Account_6ERv6MEd.mjs")).default,
		verify: async () => (await import("./Verify_ChpoUIzW.mjs")).default
	},
	es: {
		blog: async () => (await import("./Blog_7o49_y6D.mjs")).default,
		doc: async () => (await import("./Doc_BlQ9dpU4.mjs")).default,
		home: async () => (await import("./Home_CYZfu_vO.mjs")).default,
		download: async () => (await import("./Download_DN84RHaV.mjs")).default,
		account: async () => (await import("./Account_Cb-H3IhM.mjs")).default,
		verify: async () => (await import("./Verify_Bbs8aAye.mjs")).default
	}
};
/**
* Full locale loader: fetches ALL namespaces for a locale.
* Used by SwitchLocale() when changing language at runtime -
* loads both core and page namespaces for the target locale.
*/
var FullLocaleLoader = {
	en: async () => {
		const [blog, common, doc, home, download, account, verify, header, footer, meta] = await Promise.all([
			import("./Blog_D-wF_OgM.mjs"),
			import("./Common_DpbvXc3U.mjs"),
			import("./Doc_CKrIbHva.mjs"),
			import("./Home_e72DcWUn.mjs"),
			import("./Download_DpfENbyA.mjs"),
			import("./Account_BLtof3tj.mjs"),
			import("./Verify_CyK_h9C2.mjs"),
			import("./Header_BT01FD8q.mjs"),
			import("./Footer_SlxG-68k.mjs"),
			import("./Meta_DzI2pXdX.mjs")
		]);
		return {
			blog: blog.default,
			common: common.default,
			doc: doc.default,
			home: home.default,
			download: download.default,
			account: account.default,
			verify: verify.default,
			header: header.default,
			footer: footer.default,
			meta: meta.default
		};
	},
	bg: async () => {
		const [blog, common, doc, home, download, account, verify, header, footer, meta] = await Promise.all([
			import("./Blog_DvqZsvP1.mjs"),
			import("./Common_3Nji7ono.mjs"),
			import("./Doc_Cl451sEv.mjs"),
			import("./Home_BwUuP6rY.mjs"),
			import("./Download_BTviD6NV.mjs"),
			import("./Account_CUfzgMgc.mjs"),
			import("./Verify_DCh9KDu_.mjs"),
			import("./Header_DfDexrlO.mjs"),
			import("./Footer_BN_FVNNc.mjs"),
			import("./Meta_Bhf-Volq.mjs")
		]);
		return {
			blog: blog.default,
			common: common.default,
			doc: doc.default,
			home: home.default,
			download: download.default,
			account: account.default,
			verify: verify.default,
			header: header.default,
			footer: footer.default,
			meta: meta.default
		};
	},
	de: async () => {
		const [blog, common, doc, home, download, account, verify, header, footer, meta] = await Promise.all([
			import("./Blog_JVIERipw.mjs"),
			import("./Common_C8-p12ps.mjs"),
			import("./Doc_r-mzV8eU.mjs"),
			import("./Home_B6xgr4-1.mjs"),
			import("./Download_ydKFuYUz.mjs"),
			import("./Account_B9VWJ5Gv.mjs"),
			import("./Verify_jRjGNXF8.mjs"),
			import("./Header_D8_npIHo.mjs"),
			import("./Footer_6k1cu-4L.mjs"),
			import("./Meta_BoObqvo_.mjs")
		]);
		return {
			blog: blog.default,
			common: common.default,
			doc: doc.default,
			home: home.default,
			download: download.default,
			account: account.default,
			verify: verify.default,
			header: header.default,
			footer: footer.default,
			meta: meta.default
		};
	},
	fr: async () => {
		const [blog, common, doc, home, download, account, verify, header, footer, meta] = await Promise.all([
			import("./Blog_eo1_Av1X.mjs"),
			import("./Common_DuAu7fE2.mjs"),
			import("./Doc_DjwsK_1c.mjs"),
			import("./Home_DY3CZrUZ.mjs"),
			import("./Download_CkPo_Yeu.mjs"),
			import("./Account_6ERv6MEd.mjs"),
			import("./Verify_ChpoUIzW.mjs"),
			import("./Header_BGURQUf8.mjs"),
			import("./Footer_C2yswWyE.mjs"),
			import("./Meta_Clx0rPLO.mjs")
		]);
		return {
			blog: blog.default,
			common: common.default,
			doc: doc.default,
			home: home.default,
			download: download.default,
			account: account.default,
			verify: verify.default,
			header: header.default,
			footer: footer.default,
			meta: meta.default
		};
	},
	es: async () => {
		const [blog, common, doc, home, download, account, verify, header, footer, meta] = await Promise.all([
			import("./Blog_7o49_y6D.mjs"),
			import("./Common_DaoNk7q3.mjs"),
			import("./Doc_BlQ9dpU4.mjs"),
			import("./Home_CYZfu_vO.mjs"),
			import("./Download_DN84RHaV.mjs"),
			import("./Account_Cb-H3IhM.mjs"),
			import("./Verify_Bbs8aAye.mjs"),
			import("./Header_DeFdllP2.mjs"),
			import("./Footer_BB8SoJEM.mjs"),
			import("./Meta_Die-nSEx.mjs")
		]);
		return {
			blog: blog.default,
			common: common.default,
			doc: doc.default,
			home: home.default,
			download: download.default,
			account: account.default,
			verify: verify.default,
			header: header.default,
			footer: footer.default,
			meta: meta.default
		};
	}
};
function AddResources(Locale, Bundles) {
	for (const NS of NamespaceList) if (Bundles[NS]) i18n.addResourceBundle(Locale, NS, Bundles[NS], true, true);
}
var DetectedLocale = DetectLocale();
i18n.use(initReactI18next).init({
	resources: {},
	lng: "en",
	fallbackLng: "en",
	defaultNS: "common",
	ns: [...CoreNamespaceList$1],
	partialBundledLanguages: true,
	interpolation: { escapeValue: false },
	react: { useSuspense: false }
});
var InitI18n = async () => {
	AddResources("en", await LoadEnglishCore());
	if (DetectedLocale !== "en") {
		const SwitchAfterHydration = async () => {
			try {
				AddResources(DetectedLocale, await FullLocaleLoader[DetectedLocale]());
				await i18n.changeLanguage(DetectedLocale);
			} catch {}
		};
		if (typeof requestIdleCallback !== "undefined") requestIdleCallback(() => {
			SwitchAfterHydration();
		});
		else setTimeout(() => {
			SwitchAfterHydration();
		}, 0);
	}
};
InitI18n();
/**
* Lazily load a page-specific namespace for the current (or given) locale.
* Call this from page components: `await LoadNamespace("home")`
* If the namespace is already loaded, this is a no-op.
*/
var LoadNamespace = async (NamespaceName, Locale) => {
	const TargetLocale = Locale ?? i18n.language ?? "en";
	if (i18n.hasResourceBundle(TargetLocale, NamespaceName)) return;
	const Loader = PageNamespaceLoader[TargetLocale]?.[NamespaceName];
	const EnglishLoader = TargetLocale !== "en" && !i18n.hasResourceBundle("en", NamespaceName) ? PageNamespaceLoader.en[NamespaceName] : void 0;
	const [Bundle, EnglishBundle] = await Promise.all([Loader ? Loader() : Promise.resolve(void 0), EnglishLoader ? EnglishLoader() : Promise.resolve(void 0)]);
	if (Bundle) i18n.addResourceBundle(TargetLocale, NamespaceName, Bundle, true, true);
	if (EnglishBundle) i18n.addResourceBundle("en", NamespaceName, EnglishBundle, true, true);
};
/**
* Switch locale at runtime - loads ALL namespaces for the target locale
* so that every visible section updates its text immediately.
*/
var SwitchLocale = async (Locale) => {
	if (!NamespaceList.every((NS) => i18n.hasResourceBundle(Locale, NS))) AddResources(Locale, await FullLocaleLoader[Locale]());
	await i18n.changeLanguage(Locale);
	document.cookie = `LOCALE=${Locale};path=/;max-age=31536000;SameSite=Lax`;
};
// Source/Component/UI/Overlay.tsx
/**
* The five dismissals. Read down, this is the whole family's behaviour; read
* across, it is one row per question a reader can ask of any overlay.
*/
var Dismissals = [
	{
		key: "ESCAPE:",
		value: "CLOSE, AND RETURN FOCUS TO THE DOOR",
		held: "Radix, on every primitive; the family adds the return when the door is not a `*Trigger` (`UseDoorReturn`)."
	},
	{
		key: "OUTSIDE:",
		value: "CLOSE ON THE SCRIM WHEN MODAL, ON THE PAGE WHEN NOT",
		held: "Radix's `onInteractOutside`. A modal draws `SlipScrim` (12 % ink); a non-modal slip has no scrim at all, so the page stays readable behind it."
	},
	{
		key: "FOCUS:",
		value: "RETURN TO THE ELEMENT THAT HAD IT, ELSE TO THE TRIGGER",
		held: "`UseDoorReturn`, shared by the palette and every slip. Radix restores only to a `DialogTrigger` it owns, and half this family's doors are sibling buttons."
	},
	{
		key: "SCROLL:",
		value: "LOCKED WHILE A MODAL IS OPEN, UNTOUCHED WHILE A SLIP IS",
		held: "Radix Dialog and vaul lock and set `data-scroll-locked` on `<html>`; the family's CSS compensates the scrollbar from that attribute rather than from a second lock."
	},
	{
		key: "TRIGGER:",
		value: "REMOVED WHILE OPEN - THE SLIP CLOSES",
		held: "`UseTriggerGuard`: a `MutationObserver` on `document.body` that lives only while a slip is open, and closes when the door leaves the tree. No primitive does this."
	}
];
/**
* The door, as context.
*
* A `Root` provides it and a `Trigger` fills it, because that is the only place
* the two meet: the primitive owns the open state, the trigger owns the
* element, and the guard needs both. `null` is the default for a trigger with no
* `Root` above it; what can be absent inside a root is the element the trigger
* writes, and `UseTriggerGuard` reads an absent element as a door that has gone.
*/
var DoorContext = React$1.createContext(null);
/**
* Fill a door from a trigger.
*
* Returns the `ref` a `*Trigger` should carry. Radix's `asChild` forwards the
* ref to the caller's element, so this works for a `<button>`, an `<a>` and a
* `<jelly-button>` alike - the last of which is why it is a callback and not an
* object ref.
*/
var UseDoorRef = (DoorValue) => React$1.useCallback((Node) => {
	if (DoorValue === null) return;
	DoorValue.Element.current = Node;
}, [DoorValue]);
/**
* The removed-trigger rule.
*
* While a slip is open, watch the tree for the door leaving it. The observer is
* created on open and disconnected on close, so it costs nothing while the
* page is being read - which is the only way this rule can be honest, because
* an observer that lived for the life of the page would be a permanent tax on
* every DOM write for a case that happens when a form re-renders under an open
* menu.
*
* The slip closes rather than re-anchoring: a menu floating over the place a
* button used to be is a menu with no subject.
*/
var UseTriggerGuard = (Open, Element, Close) => {
	React$1.useEffect(() => {
		if (!Open || typeof MutationObserver === "undefined") return;
		const Observer = new MutationObserver(() => {
			if (!Element.current || !Element.current.isConnected) Close();
		});
		Observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		return () => Observer.disconnect();
	}, [
		Open,
		Element,
		Close
	]);
};
var UseSlipRoot = ({ open, defaultOpen, onOpenChange }) => {
	const [Internal, SetInternal] = React$1.useState(defaultOpen ?? false);
	const Controlled = open !== void 0;
	const Open = Controlled ? open : Internal;
	const Element = React$1.useRef(null);
	const OnOpenChange = React$1.useCallback((Next) => {
		if (!Controlled) SetInternal(Next);
		onOpenChange?.(Next);
	}, [Controlled, onOpenChange]);
	const Close = React$1.useCallback(() => OnOpenChange(false), [OnOpenChange]);
	UseTriggerGuard(Open, Element, Close);
	return {
		Open,
		OnOpenChange,
		Door: React$1.useMemo(() => ({
			Element,
			Open,
			Close
		}), [Open, Close])
	};
};
/**
* The focus rule: capture the door on the way in, restore it on the way out.
*
* Radix calls `onOpenAutoFocus` before it moves focus and `onCloseAutoFocus`
* before it restores. Capturing at the first and restoring at the second is the
* whole rule, and it is stated once for the slips that need it rather than
* written by hand at each surface, where the copies drift.
*
* The fallback matters: a chord pressed with nothing focused has
* `document.body` as its door, and restoring focus to the body is a return to
* the top of the document. So the rule refuses the body and lets Radix fall
* back to the trigger, which is the element the reader actually used.
*/
var UseDoorReturn = () => {
	const Return = React$1.useRef(null);
	return {
		OnOpenAutoFocus: React$1.useCallback(() => {
			const Active = document.activeElement;
			Return.current = Active instanceof HTMLElement && Active !== document.body ? Active : null;
		}, []),
		OnCloseAutoFocus: React$1.useCallback((Event) => {
			const Target = Return.current;
			Return.current = null;
			if (Target === null || !Target.isConnected) return;
			Event.preventDefault();
			setTimeout(() => {
				if (Target.isConnected) Target.focus();
			}, 0);
		}, [])
	};
};
// Source/Component/UI/Slip.tsx
/**
* The register line. `aria-hidden` on purpose: the same information reaches a
* screen reader through the surface's own `aria-label`, and a `role="menu"` may
* not carry loose text children. The count is a fact about the slip, not an
* announcement to make every time the list changes.
*/
var SlipRegister = ({ head, className, children }) => /* @__PURE__ */ jsxs("div", {
	className: cn("Slip__Head", className),
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ jsx("span", {
			className: "Slip__Mark",
			children: "#"
		}),
		/* @__PURE__ */ jsx("span", {
			className: "Slip__Name",
			children: head.Name
		}),
		(head.Trail ?? []).map((Step, Index) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [/* @__PURE__ */ jsx("span", {
			className: "Slip__TrailMark",
			children: "↳"
		}), /* @__PURE__ */ jsx("span", {
			className: "Slip__Trail",
			children: Step
		})] }, `${Step}-${Index}`)),
		/* @__PURE__ */ jsx("span", {
			className: "Slip__Rule",
			children: "/"
		}),
		head.State === void 0 ? /* @__PURE__ */ jsx("span", {
			className: "Slip__Count",
			children: String(head.Count ?? 0).padStart(2, "0")
		}) : /* @__PURE__ */ jsx("span", {
			className: "Slip__Count Slip__Count--state",
			"data-state": head.State,
			children: head.State
		}),
		children
	]
});
/**
* The empty state. The mark line says *nothing is here* in the grammar's fallback
* glyph, the second line says what would have been here, and the children are the
* way out - which is the difference between an empty list and a dead end.
*/
var SlipEmpty = ({ Mark = "NO RECORD", Line, children, className }) => /* @__PURE__ */ jsxs("div", {
	className: cn("Slip__Empty", className),
	children: [
		/* @__PURE__ */ jsxs("p", {
			className: "Slip__EmptyMark",
			children: [/* @__PURE__ */ jsx("b", {
				"aria-hidden": "true",
				children: "◎"
			}), /* @__PURE__ */ jsx("span", { children: Mark })]
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "Slip__EmptyLine",
			children: [/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				children: "↳"
			}), /* @__PURE__ */ jsx("span", { children: Line })]
		}),
		children
	]
});
/**
* The loading state: ruled skeleton rows, in the rhythm the loaded rows will land
* on.
*
* The head is the caller's: a slip in this state hands `SlipRegister` a
* `SlipHead` with `State="LOADING"`, so the count cell prints the word instead of
* a figure and this component draws only the body.
*
* ─── NO SPINNER WHERE A SKELETON WOULD DO ──────────────────────────────────
*
* The brief is exact: *no spinner where a skeleton would do; the skeleton is
* drawn in the record grammar.* So the skeleton is not grey pills - it is the
* row rhythm the loaded slip will have, at the same `2rem` pitch, with the mark
* column and the meta column reserved and empty. The block that arrives fills
* exactly the space the skeleton held, which is the whole reason to draw it:
* the slip does not jump when the rows land.
*
* `Rows` is a count of rows to hold open, not a figure the slip claims. It is
* `aria-hidden` and the surface carries `aria-busy`, so a screen reader is told
* the one true thing - that this region is working - instead of being read
* three empty rows.
*/
var SlipLoading = ({ Rows = 3, Line = "THE ROWS HAVE NOT ARRIVED", className }) => /* @__PURE__ */ jsxs("div", {
	className: cn("Slip__Loading", className),
	"aria-hidden": "true",
	children: [Array.from({ length: Math.max(1, Rows) }, (_, Index) => /* @__PURE__ */ jsxs("p", {
		className: "Slip__Skeleton",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "Slip__SkeletonMark",
				children: "#"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "Slip__SkeletonBar",
				style: { inlineSize: `${[
					92,
					74,
					84,
					61,
					88
				][Index % 5]}%` }
			}),
			/* @__PURE__ */ jsx("span", { className: "Slip__SkeletonMeta" })
		]
	}, Index)), /* @__PURE__ */ jsxs("p", {
		className: "Slip__EmptyLine",
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			children: "↳"
		}), /* @__PURE__ */ jsx("span", { children: Line })]
	})]
});
/**
* The error state: `STATUS: INTERRUPTED`, the cause, the next step, the retry.
*
* The vocabulary is §1.5's and it is fixed - `INTERRUPTED` is the word for an
* action that was cut off, and it takes ink. The three field labels are the
* record's own (`CAUSE:`, `NEXT:`), so a failed action inside a slip reads as a
* record with a bad line rather than as a browser alert. The retry is a
* `SlipAction` - the same row the palette's empty state uses for its way out -
* because an action that arrived with the error must not look like a new kind
* of object.
*/
var SlipError = ({ Mark = "INTERRUPTED", Line, Cause, Next, OnRetry, Retry = "TRY AGAIN", className }) => /* @__PURE__ */ jsxs("div", {
	className: cn("Slip__Error", className),
	role: "alert",
	children: [
		/* @__PURE__ */ jsxs("p", {
			className: "Slip__EmptyMark",
			children: [
				/* @__PURE__ */ jsx("b", {
					"aria-hidden": "true",
					children: "◎"
				}),
				/* @__PURE__ */ jsx("span", { children: "STATUS:" }),
				/* @__PURE__ */ jsx("span", {
					className: "Slip__ErrorMark",
					children: Mark
				})
			]
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "Slip__EmptyLine",
			children: [/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				children: "↳"
			}), /* @__PURE__ */ jsx("span", { children: Line })]
		}),
		Cause === void 0 ? null : /* @__PURE__ */ jsxs("p", {
			className: "Slip__ErrorRow",
			children: [/* @__PURE__ */ jsx("span", {
				className: "Slip__ErrorKey",
				children: "CAUSE:"
			}), /* @__PURE__ */ jsx("span", {
				className: "Slip__ErrorValue",
				children: Cause
			})]
		}),
		Next === void 0 ? null : /* @__PURE__ */ jsxs("p", {
			className: "Slip__ErrorRow",
			children: [/* @__PURE__ */ jsx("span", {
				className: "Slip__ErrorKey",
				children: "NEXT:"
			}), /* @__PURE__ */ jsx("span", {
				className: "Slip__ErrorValue",
				children: Next
			})]
		}),
		OnRetry === void 0 ? null : /* @__PURE__ */ jsx(SlipAction, {
			Mark: "→",
			OnSelect: OnRetry,
			children: Retry
		})
	]
});
/**
* The `↳` proposition: the one line a panel says about itself.
*
* A popover that holds a figure needs a sentence saying what the figure is, and
* that sentence is the same mark every record uses for its proposition. It is
* here rather than in each panel so the indent, the mark's ink and the measure
* are one decision.
*/
var SlipNote = ({ children, className }) => /* @__PURE__ */ jsxs("p", {
	className: cn("Slip__Note", className),
	children: [/* @__PURE__ */ jsx("span", {
		className: "Slip__NoteMark",
		"aria-hidden": "true",
		children: "↳"
	}), /* @__PURE__ */ jsx("span", {
		className: "Slip__NoteBody",
		children
	})]
});
/**
* The foot: the slip's keyboard path, stated in the grammar's own caps.
*
* It belongs to the family rather than to the palette, because the claim it
* makes - *this control can be driven from the keyboard, and here is how* - is
* either true of every slip or it is true of one. The order is the grammar's:
* what moves, what opens, what closes.
*/
var SlipFoot = ({ Items, End, className }) => /* @__PURE__ */ jsxs("div", {
	className: cn("Slip__Foot", className),
	children: [Items.map((Item) => /* @__PURE__ */ jsxs("span", {
		className: "Slip__FootItem",
		children: [/* @__PURE__ */ jsx(Chord, { children: Item.Chord }), /* @__PURE__ */ jsx("span", { children: Item.Label })]
	}, `${Item.Chord}-${Item.Label}`)), End === void 0 ? null : /* @__PURE__ */ jsx("span", {
		className: "Slip__FootItem Slip__FootEnd",
		children: End
	})]
});
/**
* The way out of a state, drawn as a row rather than as a button.
*
* A mark and a label, no fill, no frame. The class is what the palette's empty
* state, the matrix band's note line and a failed slip's retry share, so a reader
* who learns the gesture in one control recognises it in the other; this component
* is the same row for the callers that have no markup of their own. It is a real
* `<button>`; the class is the only thing that makes it a row.
*/
var SlipAction = ({ children, Mark, OnSelect, className, ...props }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	className: cn("SlipAction", className),
	onClick: OnSelect,
	...props,
	children: [Mark === void 0 ? null : /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		children: Mark
	}), /* @__PURE__ */ jsx("span", { children })]
});
/**
* A key chord in the grammar's containment mark.
*
* `〈 〉` is the record grammar's bracket for *a literal* - `〈RUST + TAURI〉`,
* `〈MACOS / AARCH64〉` - and the characters a reader presses are exactly that. The
* bracket is not a new mark; using it for a chord is using the mark for the thing
* it was always for. A chord printed anywhere that does not listen for the key is
* decoration, and a decoration that claims a key is a lie.
*/
var Chord = ({ children, Ink = false, className }) => /* @__PURE__ */ jsxs("span", {
	className: cn("Chord", Ink && "Chord--ink", className),
	children: [
		/* @__PURE__ */ jsx("span", {
			className: "Chord__Bracket",
			"aria-hidden": "true",
			children: "〈"
		}),
		/* @__PURE__ */ jsx("span", {
			className: "Chord__Key",
			children
		}),
		/* @__PURE__ */ jsx("span", {
			className: "Chord__Bracket",
			"aria-hidden": "true",
			children: "〉"
		})
	]
});
/**
* The scope control: one true value out of the set it is given, so it is a radio
* group and not a row of buttons. Arrow keys move between cells, which is what a
* reader who has just tabbed into a radio group expects; the roving tabindex is
* the group's rule, written as `tabIndex={0}` on the chosen cell and `-1` on the
* rest.
*/
var Segmented = ({ Items, Value, OnChange, Label, className }) => {
	const Refs = React$1.useRef([]);
	const Move = (From, Delta) => {
		const Next = (From + Delta + Items.length) % Items.length;
		const Target = Items[Next];
		if (!Target) return;
		OnChange(Target.Value);
		Refs.current[Next]?.focus();
	};
	return /* @__PURE__ */ jsx("div", {
		role: "radiogroup",
		"aria-label": Label,
		className: cn("Segmented", className),
		onKeyDown: (Event) => {
			const From = Items.findIndex((Item) => Item.Value === Value);
			if (Event.key === "ArrowRight" || Event.key === "ArrowDown") {
				Event.preventDefault();
				Move(From, 1);
			}
			if (Event.key === "ArrowLeft" || Event.key === "ArrowUp") {
				Event.preventDefault();
				Move(From, -1);
			}
		},
		children: Items.map((Item, Index) => {
			const Checked = Item.Value === Value;
			return /* @__PURE__ */ jsx("button", {
				ref: (Node) => {
					Refs.current[Index] = Node;
				},
				type: "button",
				role: "radio",
				"aria-checked": Checked,
				tabIndex: Checked ? 0 : -1,
				className: "Segmented__Cell",
				onClick: () => OnChange(Item.Value),
				children: Item.Label
			}, Item.Value);
		})
	});
};
// Source/Component/UI/DropdownMenu.tsx
/**
* DropdownMenu - the menu primitive, wearing the slip.
*
* Behaviour is Radix's and is not restated here: arrow keys, Home/End, typeahead,
* Escape, outside-click, focus return to the trigger, the roving tabindex. The
* family adds the door and nothing else - `UseSlipRoot` in the root, `UseDoorRef`
* on the trigger - so a menu whose trigger is removed closes rather than floats
* over the place a button used to be (`./Overlay`). What this file decides is the
* *surface* and the *row grammar*, and it decides them by handing the site's
* classes and four data attributes to the primitive:
*
*   `data-mark`  the row's leading glyph - `→` action, `/` route, `◎`
*                unavailable. The stylesheet draws it in the reserved 1.25rem
*                column, so no caller can misalign a label.
*   `data-meta`  the row's trailing cell - a chord, a section, a STATUS word.
*   `data-reason` the STATUS word a disabled row owes the reader; it wins over
*                `data-meta`.
*   `data-current` the value in force - the stylesheet prints `✓` and the 2px
*                leading accent rule over whatever `data-mark` said.
*
* The attributes rather than spans are what let `asChild` keep working: an item
* whose body is the caller's own `<a>` cannot have children injected into it, and
* forking the primitive to add two spans is how five controls become five
* grammars. See `Stylesheet/System/UI/_Item.scss`.
*/
/**
* The root: Radix's open state, mirrored, plus the door the trigger fills.
*
* `UseSlipRoot` hands the primitive the same `open`/`onOpenChange` it was given
* and builds the `Door` this root provides; the trigger writes its element into
* it, and `UseTriggerGuard` closes the slip when that element leaves the tree.
*/
function DropdownMenu({ open, defaultOpen, onOpenChange, ...props }) {
	const Root = UseSlipRoot({
		open,
		defaultOpen,
		onOpenChange
	});
	return /* @__PURE__ */ jsx(DoorContext.Provider, {
		value: Root.Door,
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, {
			"data-slot": "dropdown-menu",
			open: Root.Open,
			onOpenChange: Root.OnOpenChange,
			...props
		})
	});
}
function DropdownMenuTrigger({ ...props }) {
	const Ref = UseDoorRef(React$1.useContext(DoorContext));
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, {
		ref: Ref,
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
/**
* `children` is destructured here, and that is load-bearing, not style.
*
* The register line is written as a JSX child in the element body, and a body
* child is a `createElement` argument of its own - React assigns it over the
* `children` that `{...props}` carried (`react.development.js`: `if (1 ===
* childrenLength) props.children = children;`). A caller's rows arriving through
* the spread would be replaced by the one register line, and the slip would open
* on `# LOCALE / 05` and nothing else. Destructuring `children` and rendering it
* explicitly after the head is what keeps the rows, and it is also the grammar's
* order: the register line is the slip's first line and its rows follow it.
*/
function DropdownMenuContent({ className, sideOffset = 4, dense = false, head, empty, foot, children, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsxs(DropdownMenuPrimitive.Content, {
		"data-slot": "dropdown-menu-content",
		"data-density": dense ? "dense" : void 0,
		sideOffset,
		"aria-label": head?.Name,
		className: cn("Slip", className),
		...props,
		children: [
			head ? /* @__PURE__ */ jsx(SlipRegister, { head }) : null,
			children,
			empty === void 0 ? null : /* @__PURE__ */ jsx(SlipEmpty, {
				Mark: empty.Mark ?? "NO RECORD",
				Line: empty.Line
			}),
			foot === void 0 ? null : /* @__PURE__ */ jsx(SlipFoot, { Items: foot })
		]
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", mark = "→", meta, reason, current, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		"data-mark": mark,
		"data-meta": meta,
		"data-reason": reason,
		"data-current": current ? "true" : void 0,
		className: cn("Slip__Row", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("Slip__Rule-H", className),
		...props
	});
}
function DropdownMenuSub({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Sub, {
		"data-slot": "dropdown-menu-sub",
		...props
	});
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": inset,
		"data-meta": "›",
		className: cn("Slip__Row", className),
		...props,
		children
	});
}
function DropdownMenuSubContent({ className, head, children, ...props }) {
	return /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		"aria-label": head?.Name,
		className: cn("Slip", className),
		...props,
		children: [head === void 0 ? null : /* @__PURE__ */ jsx(SlipRegister, { head }), children]
	});
}
// Source/Component/Layout/LocaleSwitcher.tsx
var LocaleSwitcher = () => {
	const { i18n } = useTranslation();
	const CurrentLocale = i18n.language || "en";
	const HandleChange = (Value) => {
		const ScrollY = window.scrollY;
		const MainContent = document.getElementById("main-content");
		const PreviousMinHeight = MainContent?.style.minHeight ?? "";
		if (MainContent) MainContent.style.minHeight = `${MainContent.offsetHeight}px`;
		const Guard = () => {
			if (window.scrollY !== ScrollY) window.scrollTo({
				top: ScrollY,
				behavior: "instant"
			});
		};
		window.addEventListener("scroll", Guard, { passive: true });
		const ReleasePinnedLayout = () => {
			window.removeEventListener("scroll", Guard);
			window.scrollTo({
				top: ScrollY,
				behavior: "instant"
			});
			if (MainContent) MainContent.style.minHeight = PreviousMinHeight;
		};
		SwitchLocale(Value).then(() => {
			requestAnimationFrame(() => {
				requestAnimationFrame(ReleasePinnedLayout);
			});
		}).catch(() => {
			ReleasePinnedLayout();
		});
	};
	return /* @__PURE__ */ jsxs(DropdownMenu, {
		modal: false,
		children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx("jelly-button", {
				squish: true,
				"aria-label": "Select language",
				style: {
					"--jelly-button-height": "36px",
					"--jelly-button-padding-inline": "12px",
					"--jelly-button-min-width": "0px",
					"--jelly-button-radius": "0px",
					"--jelly-fill": "transparent",
					"--jelly-ring": "var(--Accent)",
					"--jelly-label": "var(--HeaderFg, var(--Foreground))"
				},
				children: /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1.5 font-medium",
					children: [/* @__PURE__ */ jsx("span", { children: LocaleLabel[CurrentLocale] }), /* @__PURE__ */ jsx(ChevronDown, {
						size: 14,
						className: "opacity-60 transition-transform duration-200 [[data-state=open]_&]:rotate-180"
					})]
				})
			})
		}), /* @__PURE__ */ jsx(DropdownMenuContent, {
			align: "end",
			head: {
				Name: "LOCALE",
				Count: SupportedLocaleList.length
			},
			children: SupportedLocaleList.map((Locale) => /* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: () => HandleChange(Locale),
				current: Locale === CurrentLocale,
				children: LocaleLabel[Locale]
			}, Locale))
		})]
	});
};
// Source/Component/Layout/Header.tsx
/**
* The variants that have no filled-blob equivalent in Jelly UI. They render as a
* plain CSS button wrapping an anchor; every other variant renders as the Jelly
* element itself. `link` is listed because the button surface accepts it even
* though the header's own data never emits it - the rule belongs to the shape,
* not to today's rows.
*/
var PlainVariant = /* @__PURE__ */ new Set(["ghost", "link"]);
/**
* Where an action sends the reader. The Jelly path has no anchor to carry the
* href, so the destination is honoured here instead: an off-site action opens in
* the second tab its `Target` asks for, and everything else replaces the page
* the way the anchor would have.
*/
var Navigate$1 = (Action) => {
	if (Action.Target === "blank") {
		window.open(Action.Href, "_blank", "noopener,noreferrer");
		return;
	}
	window.location.href = Action.Href;
};
var Header = ({ Content, AuthSlot, Mode = "minimal" }) => {
	const { t: T } = useTranslation("header");
	const [Path, SetPath] = useState("/");
	const [Section, SetSection] = useState("");
	const [Open, SetOpen] = useState(false);
	const [Scrolled, SetScrolled] = useState(false);
	/** The in-page sections currently inside the reading band. */
	const Visible = useRef(/* @__PURE__ */ new Set());
	const View = HeaderView(Content, T);
	/** The ids to watch, as a stable dependency rather than a fresh array. */
	const SectionKey = HeaderSections(View.Links).join(",");
	/**
	* The scroll path.
	*
	* `scroll` fires several times per frame on a long document, and a state
	* update per event is a setState per event. The value the header renders
	* only changes when the reader crosses the 8px line, so the event itself
	* does nothing but ask for a frame: the frame reads `scrollY` once, and the
	* state is written only when the boolean differs from the one already
	* committed - which is also the only case that can repaint the header.
	*
	* That is one layout read and at most one write per frame, and the write
	* never happens on the frames where the answer is the same as the last one.
	* `Committed` is the effect's own record of what it last wrote, so the read
	* is not compared against React state (which lags a commit behind).
	*/
	useEffect(() => {
		let Frame = 0;
		let Committed = false;
		const Read = () => {
			Frame = 0;
			const Next = window.scrollY > 8;
			if (Next === Committed) return;
			Committed = Next;
			SetScrolled(Next);
		};
		const OnScroll = () => {
			if (Frame !== 0) return;
			Frame = requestAnimationFrame(Read);
		};
		const OnHash = () => SetSection(window.location.hash.replace(/^#/, ""));
		SetPath(window.location.pathname);
		SetSection(window.location.hash.replace(/^#/, ""));
		Read();
		window.addEventListener("scroll", OnScroll, { passive: true });
		window.addEventListener("hashchange", OnHash);
		return () => {
			if (Frame !== 0) cancelAnimationFrame(Frame);
			window.removeEventListener("scroll", OnScroll);
			window.removeEventListener("hashchange", OnHash);
		};
	}, []);
	useEffect(() => {
		Visible.current.clear();
		const Ids = SectionKey === "" ? [] : SectionKey.split(",");
		const Sections = Ids.map((Id) => document.getElementById(Id)).filter((Element) => Element !== null);
		if (Sections.length === 0 || typeof IntersectionObserver === "undefined") return;
		const Observer = new IntersectionObserver((Entries) => {
			Entries.forEach((Entry) => Entry.isIntersecting ? Visible.current.add(Entry.target.id) : Visible.current.delete(Entry.target.id));
			SetSection(Ids.find((Id) => Visible.current.has(Id)) ?? "");
		}, { rootMargin: "-25% 0px -60% 0px" });
		Sections.forEach((Element) => Observer.observe(Element));
		return () => Observer.disconnect();
	}, [Path, SectionKey]);
	const Actions = AuthSlot === void 0 ? View.Actions : View.Actions.filter((Action) => Action.Href !== "/Account/SignIn");
	/**
	* The status line under the bar.
	*
	* `status.value` is the key `En/Header.json` carries; `HeaderStatus` is the
	* module's own English default, so the strip prints on a page whose locale
	* file has not caught up rather than printing an empty band. The string is
	* `STATUS: ACTIVE␁PRE-RELEASE` - the em quad is the grammar's only
	* separator, and the label keeps its colon.
	*/
	const Status = T("status.value", { defaultValue: HeaderStatus });
	/** The shell's classes: the base, the surface, and the scrolled state. */
	const Shell = [
		"Header",
		Mode === "functional" ? "HeaderFunctional" : "HeaderMinimal",
		Scrolled ? "HeaderScrolled" : null
	].filter((Name) => Name !== null);
	return /* @__PURE__ */ jsxs("header", {
		className: Shell.join(" "),
		role: "banner",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "HeaderBar",
			children: [
				/* @__PURE__ */ jsxs("a", {
					className: "HeaderLogo",
					href: "/",
					"aria-label": `${View.Logo} - Go to homepage`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "HeaderLogoGlyph",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("img", {
							src: "/Asset/Logo/Glyph/Land.svg",
							alt: "Code Editor Land",
							title: "Code Editor Land",
							width: 28,
							height: 28
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "HeaderLogoText",
						children: View.Logo
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "HeaderToggle",
					"aria-controls": "HeaderPanel",
					"aria-expanded": Open,
					"aria-label": T("menu", { defaultValue: "Menu" }),
					onClick: () => SetOpen(!Open),
					children: /* @__PURE__ */ jsxs("svg", {
						viewBox: "0 0 24 24",
						width: 20,
						height: 20,
						fill: "none",
						stroke: "currentColor",
						strokeWidth: 2,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						focusable: "false",
						children: [
							/* @__PURE__ */ jsx("path", { d: "M4 5h16" }),
							/* @__PURE__ */ jsx("path", { d: "M4 12h16" }),
							/* @__PURE__ */ jsx("path", { d: "M4 19h16" })
						]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "HeaderPanel",
					id: "HeaderPanel",
					"data-open": Open,
					children: [
						/* @__PURE__ */ jsx("nav", {
							className: "HeaderNav",
							id: "HeaderNav",
							"aria-label": "Main navigation",
							children: View.Links.map((Link) => {
								const State = HeaderLinkState(Link, Path, Section);
								return /* @__PURE__ */ jsx("a", {
									className: "HeaderNavLink",
									href: Link.Href,
									"aria-current": State === "active" ? "page" : void 0,
									...HeaderLinkAttributes(Link.Target),
									onClick: () => SetOpen(false),
									children: /* @__PURE__ */ jsxs("span", {
										className: "HeaderLinkLabel",
										children: ["/", Link.Label.toUpperCase()]
									})
								}, Link.Href);
							})
						}),
						/* @__PURE__ */ jsx(Rail, { Translate: T }),
						/* @__PURE__ */ jsxs("div", {
							className: "HeaderAux",
							children: [/* @__PURE__ */ jsx(LocaleSwitcher, {}), /* @__PURE__ */ jsxs("div", {
								className: "HeaderActions",
								children: [AuthSlot, Actions.map((Action) => PlainVariant.has(Action.Variant) ? /* @__PURE__ */ jsx(Button, {
									variant: Action.Variant,
									size: "default",
									className: "HeaderActionButton",
									asChild: true,
									children: /* @__PURE__ */ jsx("a", {
										href: Action.Href,
										...HeaderLinkAttributes(Action.Target),
										onClick: () => SetOpen(false),
										children: /* @__PURE__ */ jsx("span", {
											className: "HeaderActionLabel",
											children: Action.Label
										})
									})
								}, Action.Href) : /* @__PURE__ */ jsx(Button, {
									variant: Action.Variant,
									size: "default",
									className: "HeaderActionButton",
									onClick: () => {
										SetOpen(false);
										Navigate$1(Action);
									},
									children: /* @__PURE__ */ jsx("span", {
										className: "HeaderActionLabel",
										children: Action.Label
									})
								}, Action.Href))]
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "HeaderStrip",
			children: [/* @__PURE__ */ jsx(RunningHead, {
				Logo: View.Logo,
				Translate: T
			}), /* @__PURE__ */ jsx("p", {
				className: "HeaderStatus",
				children: Status
			})]
		})]
	});
};
// Source/Component/Mark/Type.ts
/** The class each kind prints. One renderer, one class per form. */
var MarkClass = {
	square: "MarkSquare",
	tick: "MarkTick",
	arrow: "MarkArrow",
	fold: "MarkFold",
	bullet: "MarkBullet",
	glyph: "MarkGlyph",
	fallback: "MarkFallback"
};
var $$Mark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Mark;
	const { kind, size = "rest", fill = "known", tone = "ink", ink, src, alt = "", open = false, place = "trail", reached = true, class: Class } = Astro.props;
	const Kind = MarkClass[kind];
	const Square = kind === "square" ? {
		"data-mark-size": size,
		"data-mark-fill": fill,
		"data-mark-tone": tone
	} : {};
	const Ink = kind === "square" && ink ? `--mark-ink-state:${ink}` : void 0;
	return renderTemplate`${kind === "glyph" ? renderTemplate`${maybeRenderHead($$result)}<img${addAttribute([Kind, Class], "class:list")}${addAttribute(src, "src")}${addAttribute(alt, "alt")} width="14" height="14"${addAttribute(alt ? void 0 : "true", "aria-hidden")}>` : kind === "tick" ? renderTemplate`<span${addAttribute([Kind, Class], "class:list")}${addAttribute(String(reached), "data-reached")} aria-hidden="true"></span>` : kind === "fold" ? renderTemplate`<span${addAttribute([Kind, Class], "class:list")}${addAttribute(String(open), "data-open")} aria-hidden="true"></span>` : kind === "arrow" ? renderTemplate`<span${addAttribute([Kind, Class], "class:list")}${addAttribute(place, "data-place")} aria-hidden="true"></span>` : renderTemplate`<span${addAttribute([Kind, Class], "class:list")}${spreadAttributes(Square)}${addAttribute(Ink, "style")} aria-hidden="true"></span>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Mark/Mark.astro", void 0);
// Source/Component/Surface/State.ts
/** §1.5's tone per state word. The table is total over the eight, and closed. */
var ToneByWord = {
	READY: "ink",
	ACTIVE: "specimen",
	LOADING: "ink",
	PREPARING: "quiet",
	VERIFIED: "specimen",
	UNAVAILABLE: "ink",
	INTERRUPTED: "ink",
	ARCHIVED: "quiet"
};
/**
* The word inside a label, or the label itself when it states no key.
*
* A label prints in the site's grammar as `KEY: WORD` (`STATUS: LOADING`,
* `RECORD: EMPTY`). The tone belongs to the word, never to the key - so the one
* split lives here and every renderer reads it, rather than each renderer
* deciding for itself where a label stops being a key.
*/
var Word = (Label) => {
	const Colon = Label.indexOf(":");
	return (Colon === -1 ? Label : Label.slice(Colon + 1)).trim();
};
/**
* The tone of a state word, or `undefined` when the word is not a state.
* Matching is case-insensitive and whitespace-trimmed, so `Not Connected` and
* `NOT CONNECTED` are the same word - and `STATUS: LOADING` is `LOADING`.
*/
var Tone = (Label) => ToneByWord[Word(Label).toUpperCase()];
/**
* One row, composed from a key and a term, with the term's tone looked up - so
* a page that states `STATUS: LOADING` cannot state it in a tone of its own
* choosing. A term outside the eight prints in `ink` and is not a state: the
* caller's word is never re-cased or re-worded, only tinted.
*
* `Term` may be the word alone (`LOADING`) or the whole label a locale file
* carries (`STATUS: LOADING`); the key prefix is stripped, because the key is
* the first argument and a row that printed it twice would read
* `STATUS: STATUS: LOADING`.
*/
var Row$1 = (Key, Term) => ({
	key: Key,
	value: Word(Term),
	tone: Tone(Term) ?? "ink"
});
/**
* The lifecycle vocabulary - five words, one per surface.
*
* `StateTerms` says what a surface is DOING (`LOADING`, `INTERRUPTED`); this
* table says how far along it is, which is a different question and one that
* needs its own vocabulary. Answered in a page's own adjectives - "Coming Soon",
* "Feature Gated", "Disabled", "Beta" - it is five adjectives for one fact: a
* reader cannot compare two pages, and a page cannot be counted.
*
* The five are the whole life of a surface, in order:
*
*   LIVE          open to every reader, facts current       `specimen`
*   BETA          open, and the behaviour may still change   `ink`
*   PLANNED       named and specified, not built             `quiet`
*   RETIRED       was live, is closed, kept for the record   `quiet`
*   UNAVAILABLE   the build cannot state which of the four   `ink`
*
* The tone is the same three §1.5 tones, because a lifecycle is a state and the
* site has one state ink. `UNAVAILABLE` appears in both tables on purpose: in
* `StateTerms` it means the surface is not answering, and here it means the
* BUILD does not know how far along the surface is - in both cases the honest
* word is the same one, and never `0`.
*/
var LifeTerms = [
	"LIVE",
	"BETA",
	"PLANNED",
	"RETIRED",
	"UNAVAILABLE"
];
/**
* The five, with the sentence that decides between them.
*
* The glosses are part of the vocabulary, not documentation for it: the block
* that prints the register prints them under each term, so a page that reaches
* for "Coming Soon" can read what the word it wants actually means.
*/
var Life = {
	LIVE: {
		term: "LIVE",
		tone: "specimen",
		gloss: "Open to every reader, and every fact on it is current."
	},
	BETA: {
		term: "BETA",
		tone: "ink",
		gloss: "Open to every reader, and the behaviour may still change under them."
	},
	PLANNED: {
		term: "PLANNED",
		tone: "quiet",
		gloss: "Named and specified, not built: nothing on it can be used yet."
	},
	RETIRED: {
		term: "RETIRED",
		tone: "quiet",
		gloss: "Was live, is closed: kept for the record, not for use."
	},
	UNAVAILABLE: {
		term: "UNAVAILABLE",
		tone: "ink",
		gloss: "The build cannot state how far along the surface is, and does not guess."
	}
};
/**
* The lifecycle word a caller's string names, or `undefined` when it names none.
*
* Case-insensitive and trimmed, like `Tone`; a word outside the five is not a
* lifecycle and the block that prints it prints `UNAVAILABLE` rather than
* inventing a sixth - an adjective is not a vocabulary.
*/
var LifeOf = (Word) => Life[Word.trim().toUpperCase()];
// Source/Component/Record/RegisterLine.ts
/**
* Zero-pad a count the way the site pads: `7` -> `07`, `26` -> `26`, `120` ->
* `120`. Two digits is the register's floor, not its ceiling - a set of a
* hundred is printed honestly rather than truncated to its last two digits.
*/
var Padded = (Count) => String(Count).padStart(2, "0");
/**
* The register of a set the block holds: the count is `rows.length`, so the line
* and the rows under it cannot disagree. This is the constructor a page uses for
* a ledger, a leader, an archive - any register whose rows the block prints.
*/
var RegisterOf = (label, rows, options = {}) => ({
	label: label.trim(),
	count: Padded(rows.length),
	...options
});
/**
* The register of a set whose count the block does not hold: a figure read from
* a generated fact file, a total the page already measured, a count that is a
* word. A number is zero-padded; a string is printed exactly as given, so
* `UNAVAILABLE` stays `UNAVAILABLE`.
*/
var RegisterCount = (label, count, options = {}) => ({
	label: label.trim(),
	count: typeof count === "number" ? Padded(count) : count.trim(),
	...options
});
/**
* The register of a set whose count cannot be known. The word is the STATUS
* vocabulary's own, and it is never `0`: a zero claims the set is empty, and an
* unknown set is not an empty one.
*/
var RegisterUnavailable = (label, options = {}) => ({
	label: label.trim(),
	count: "UNAVAILABLE",
	...options
});
/**
* The register of a set that is too large to print: the count is the window and
* the set it was cut from - `12 OF 240`.
*
* This is the too-much state as a line rather than as a note. A block that
* prints `SHOWING: 12 OF 240` in a foot of its own has invented a second
* vocabulary for the one state that most needs its figure: a window is still a
* count - the count of what the reader is holding plus the count of what exists -
* and it is stated in the register's own grammar.
*
* `total` is a string for the same reason `Register.count` is: a figure the
* block does not hold may arrive as text, and a total that cannot be known is
* `UNAVAILABLE` rather than a guess. Neither part is padded, because `12 OF
* 240` is a proportion and zero-padding the first half of a proportion invents
* a leading figure.
*/
var RegisterWindow = (label, showing, total, options = {}) => ({
	label: label.trim(),
	count: `${showing} OF ${typeof total === "number" ? String(total) : total.trim()}`,
	...options
});
/** The separator's printed form, spaces included. */
var RegisterSeparatorText = (register) => register.separator === "quad" ? " " : " / ";
/**
* The count a register prints in a given state. A loading register prints
* `LOADING` where the figure will be - the vocabulary's word, never a spinner
* and never a zero - and every other state prints the count it was built with.
*/
var RegisterCountText = (register, state = "rest") => state === "loading" ? "LOADING" : register.count;
/**
* The whole line as one string: mark, label, separator, count, unit. For a place
* that prints text rather than markup - a document title, an `aria-label`, a
* generated page. Markup goes through `Register.astro`, which prints the same
* four parts as separate spans so the line can be read character by character.
*/
var RegisterText = (register, state = "rest") => `# ${register.label}${RegisterSeparatorText(register)}${RegisterCountText(register, state)}${register.unit === void 0 ? "" : ` ${register.unit}`}`;
/**
* The whole line as it is SPOKEN: the same statement, punctuated for the ear.
*
* The printed line is `# WHAT CHANGES / 08`, and both the `#` and the `/` are
* punctuation - the mark says "this is an index entry" and the separator says
* "the figure follows". A screen reader does not read punctuation as structure;
* it reads the characters, so handing it `RegisterText` produces "number sign
* what changes slash zero eight", which is neither the printed line nor a
* sentence. The spoken form states the same two facts in the order a person
* would say them - the name, then the figure - with a comma where the eye gets
* a mark and a slash.
*
* It is the announcement `Register.astro` prints into its visually hidden run,
* and it is here rather than in the renderer because composing the line is this
* module's whole job: two renderers that each spelled the line out could
* disagree, and one of them would be the one a reader who cannot see the page
* gets.
*/
var RegisterSpokenText = (register, state = "rest") => `${register.label}, ${RegisterCountText(register, state)}${register.unit === void 0 ? "" : ` ${register.unit}`}`;
var $$Register = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Register;
	const { register, state = "rest", class: Class } = Astro.props;
	const Separator = RegisterSeparatorText(register);
	const Count = RegisterCountText(register, state);
	const Spoken = RegisterSpokenText(register, state);
	return renderTemplate`${maybeRenderHead($$result)}<p${addAttribute([Class], "class:list")}${addAttribute(state, "data-state")}> <span class="register-line__spoken">${Spoken}</span> <span class="register-line__printed" aria-hidden="true"> <span class="register-line__mark">#</span>${" "} <span class="register-line__label">${register.label}</span> <span class="register-line__separator">${Separator}</span> <span class="register-line__count">${Count}</span> ${register.unit === void 0 ? null : renderTemplate`<span class="register-line__unit"> ${register.unit}</span>`} </span> </p>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/Register.astro", void 0);
var $$LedgerValue = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LedgerValue;
	const { row: Row } = Astro.props;
	const Tint = Row.state === void 0 ? void 0 : Tone(Row.state) ?? "ink";
	const Fill = Row.state === "loading" ? "loading" : Row.state === "archived" || Row.state === "preparing" ? "stale" : "unknown";
	return renderTemplate`${Row.state !== void 0 ? renderTemplate`${maybeRenderHead($$result)}<span${addAttribute(["record-ledger__state", `record-ledger__state--${Tint}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"fill": Fill,
		"tone": Tint
	})} ${Row.value} </span>` : Row.links !== void 0 && Row.links.length > 0 ? Row.links.map((Link, Index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate` ${Index > 0 && renderTemplate`<span class="record-ledger__separator">${" / "}</span>`} <a class="record-ledger__link"${addAttribute(Link.href, "href")}${addAttribute(Link.target === "blank" ? "_blank" : void 0, "target")}${addAttribute(Link.target === "blank" ? "noopener noreferrer" : void 0, "rel")}> ${Link.text} </a> ` })}`) : Row.code ? renderTemplate`<code class="record-ledger__code">${Row.value}</code>` : Row.strong ? renderTemplate`<strong class="record-ledger__strong">${Row.value}</strong>` : Row.value}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/LedgerValue.astro", void 0);
var $$LedgerRow = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LedgerRow;
	const { row: Row } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"record-ledger__row",
		Row.lead && "record-ledger__row--lead",
		Row.total && "record-ledger__row--total",
		Row.open !== void 0 && "record-ledger__row--open",
		Row.selected && "record-ledger__row--selected"
	], "class:list")}${addAttribute(Row.selected ? "true" : void 0, "aria-current")}> <dt class="record-ledger__key"> ${Row.selected ? renderTemplate`${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"size": "attested",
		"tone": "specimen",
		"class": "record-ledger__selected-mark"
	})}` : null} ${Row.key} </dt> <dd class="record-ledger__value"> ${Row.open !== void 0 ? renderTemplate`<details class="record-ledger__disclosure"> <summary class="record-ledger__summary"> <span class="record-ledger__summary-value"> ${Row.value} </span> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "fold",
		"class": "record-ledger__fold"
	})} </summary> <dl class="record-ledger__nested"> ${Row.open.map((Child) => renderTemplate`<div class="record-ledger__row record-ledger__row--nested"> <dt class="record-ledger__key">${Child.key}</dt> <dd class="record-ledger__value"> ${renderComponent($$result, "LedgerValue", $$LedgerValue, { "row": Child })} ${Child.note ? renderTemplate`<span class="record-ledger__note"> ${Child.note} </span>` : null} ${Child.asOf ? renderTemplate`<span class="record-ledger__as-of"> <span class="record-ledger__as-of-key">
AS OF:
</span> ${` `} ${Child.asOf} </span>` : null} </dd> </div>`)} </dl> </details>` : renderTemplate`${renderComponent($$result, "LedgerValue", $$LedgerValue, { "row": Row })}`} ${Row.note ? renderTemplate`<span class="record-ledger__note">${Row.note}</span>` : null} ${Row.asOf ? renderTemplate`<span class="record-ledger__as-of"> <span class="record-ledger__as-of-key">AS OF:</span> ${` `} ${Row.asOf} </span>` : null} </dd> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/LedgerRow.astro", void 0);
var $$RecordLedger = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordLedger;
	const { rows, columns = 1, surface = "quiet", register, pinned = false, density = "rest", state = "rest", empty, class: Class } = Astro.props;
	const Shell = [
		"record-ledger",
		`record-ledger--${columns}`,
		`record-ledger--${density}`,
		surface === "standard" ? "emphasis-standard" : null,
		Class
	];
	const Count = Padded(rows.length);
	const Line = register === void 0 ? void 0 : {
		...register,
		count: Count
	};
	const SkeletonRows = rows.length > 0 ? rows : Array.from({ length: 6 }, (_, Index) => ({
		key: `FACT_${String(Index + 1).padStart(2, "0")}`,
		value: ""
	}));
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"record-ledger-block",
		pinned && "record-ledger-block--pinned",
		`record-ledger-block--${density}`
	], "class:list")}> ${Line && renderTemplate`${renderComponent($$result, "Register", $$Register, {
		"register": Line,
		"state": state,
		"class": "record-ledger-block__register"
	})}`} ${state === "empty" ? empty && renderTemplate`<p class="record-ledger-block__empty">${empty}</p>` : renderTemplate`<dl${addAttribute(Shell, "class:list")}${addAttribute(state === "loading" ? "true" : void 0, "aria-busy")}> ${state === "loading" ? SkeletonRows.map((Row) => renderTemplate`<div class="record-ledger__row record-ledger__row--skeleton"> <dt class="record-ledger__key">${Row.key}</dt> <dd class="record-ledger__value"> <span class="record-ledger__bar" aria-hidden="true"></span> </dd> </div>`) : rows.map((Row) => renderTemplate`${renderComponent($$result, "LedgerRowView", $$LedgerRow, { "row": Row })}`)} </dl>`} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordLedger.astro", void 0);
// Source/Component/Shell/Language.ts
/**
* Language - the four composition languages, and the register that files a route
* under one of them.
*
* ─── WHY A LANGUAGE AND NOT A GRID ────────────────────────────────────────
* One grid used everywhere reads as a template. The dossier has four kinds of
* page and they are not four skins of one column:
*
*   READING    a document read top to bottom: one measure, a rail beside it,
*              a margin for apparatus. The prose is the page.
*   WORKSPACE  a place the reader operates: a rail of destinations, panes that
*              hold the instrument, and a drawer for the third instrument that
*              fits neither pane.
*   AUDIT      a claim being checked: a ledger column of the facts, the matrix
*              they are read across, and wells for the things you can act on.
*   PLATE      one artifact at full bleed with a caption channel beside it. The
*              figure is the argument and the caption is its provenance.
*
* A language is a *contract*, not a class: it names the tracks a page gets, and
* the things the page must hand the shell to get them. A page that hands in a
* matrix and no ledger has not composed an audit - it has a table on a page.
*
* ─── HOW A PAGE DECLARES ONE ──────────────────────────────────────────────
* A page declares its language by being filed here, and nowhere else. There is
* no `layout:` frontmatter, no prop threaded through two files, and no page
* that can disagree with the frame:
*
* - `Base.astro` reads this register and writes `data-layout` on `<html>`, so
*   the running head can print the language beside the part (`# LAND /
*   03␁DOCUMENTATION␁/␁READING`), at first paint, with JavaScript off.
* - `PageShell.astro` reads the same register for its own `data-layout` and its
*   grid, so the shell and the frame cannot drift.
* - A page that composes a *second* language inside itself (a plate band in a
*   reading page) passes `language` to the inner shell; the outer declaration is
*   still the register's.
*
* The register is the one place to change a page's language, which is what makes
* the answer to "what does a page have to declare" a single sentence: *its
* route, filed under a language in this file*.
*
* ─── THE FIFTH ANSWER: ◎ RECORD ───────────────────────────────────────────
* Not every page has a language, and pretending otherwise is the drift this file
* exists to prevent. A credential card, the manual's index, the register wall,
* the dispatch trampoline - these are one artifact, and a one-artifact page has
* no tracks to distribute. They are filed as `record`, the declaration prints
* `◎ RECORD` (U+25CE is the grammar's mark for a thing with no glyph), and the
* page composes itself. An unfiled route also prints `◎ RECORD` rather than
* guessing: a page that has not been filed is a page whose composition has not
* been decided, and the frame says so.
*/
/**
* The lab switch. The register below files `/Specimen`, and a production build
* does not contain that page (`Function/Configuration/Lab.mjs`), so the register
* is filtered by the same predicate the build uses.
*/
/** The four languages and the fifth answer, keyed by their own word. */
var Languages = {
	reading: {
		key: "reading",
		name: "READING",
		gives: "RAIL MEASURE MARGIN",
		about: "A document read top to bottom: one measure, a rail beside it, and a margin for the apparatus that would otherwise interrupt the prose.",
		declares: [
			"a rail (the document's own contents, or the set it belongs to)",
			"a measure (72-88ch of prose, or `full` for a page that also carries grids)",
			"a margin (the notes, the facts, the aside) - or nothing, and then the measure takes the rail's side"
		],
		measure: "72-88CH"
	},
	workspace: {
		key: "workspace",
		name: "WORKSPACE",
		gives: "RAIL PANES DRAWER",
		about: "A place the reader operates: a rail of destinations, panes that hold the instrument, and a drawer when a pane is too wide for the container.",
		declares: [
			"a rail (the destinations this workspace holds)",
			"at least two panes, one of them the instrument the reader came to use",
			"a drawer for anything that does not fit the pane's own measure"
		],
		measure: "NONE"
	},
	audit: {
		key: "audit",
		name: "AUDIT",
		gives: "LEDGER MATRIX WELLS",
		about: "A claim being checked: a ledger column of the facts that scope it, the matrix those facts are read across, and wells for the commands that verify it.",
		declares: [
			"a ledger (what the audit is of, and where each fact comes from)",
			"a matrix (the comparison itself, one row per claim)",
			"a well (the command or token that makes the audit repeatable) - or the audit is a table, not a check"
		],
		measure: "MATRIX"
	},
	plate: {
		key: "plate",
		name: "PLATE",
		gives: "PLATE CHANNEL HEAD",
		about: "One artifact at full bleed with a caption channel beside it: the figure is the argument, the channel is its provenance, and the head is a record, not a poster.",
		declares: [
			"a plate (the one artifact the page is about)",
			"a caption channel (`FIGURE:`, `SOURCE:`, `STATE:`) - a plate without provenance is decoration",
			"a record head, so the page states what it is before it shows it"
		],
		measure: "PLATE + CHANNEL"
	},
	record: {
		key: "record",
		name: "RECORD",
		gives: "◎",
		about: "One artifact and nothing else: a credential card, an index, a register wall, a dispatch trampoline. These pages have no tracks to distribute, and a language imposed on them would be a skin.",
		declares: ["nothing - the page composes itself"],
		measure: "NONE"
	}
};
/**
* The register this build reads.
*
* A filed route is kept only if the build serves it. `/Specimen` is a lab surface -
* served by `dum Run`, absent from production (`Function/Configuration/Lab.mjs`) -
* and `/Contents` counts the register's entries per language, so an entry for a
* page the host does not hold would print a figure the build cannot answer for.
* `LanguageOf` already answers `record` for an unfiled path, so removing the entry
* changes nothing else.
*/
var RouteRegister = [
	["/", "plate"],
	["/404", "plate"],
	["/OAuth/Success", "plate"],
	["/License", "reading"],
	["/Contributing", "reading"],
	["/Legal/Term", "reading"],
	["/Legal/Privacy", "reading"],
	["/Contact/Sale", "reading"],
	["/Doc/Rust", "workspace"],
	["/Doc/*", "reading"],
	["/Blog/*", "reading"],
	["/Glossary", "reading"],
	["/Motion", "reading"],
	["/Dashboard", "workspace"],
	["/Account", "workspace"],
	["/Contact/*", "workspace"],
	["/Compare", "workspace"],
	["/Download", "audit"],
	["/Contents", "audit"],
	["/Verify", "audit"],
	["/Portal", "audit"],
	["/Status", "audit"],
	["/Doc", "record"],
	["/Blog", "record"],
	["/Contact", "record"],
	["/Visit", "record"],
	["/Specimen", "record"],
	["/Specimen/States", "record"],
	["/Account/SignIn", "record"],
	["/Account/SignUp", "record"],
	["/Account/ForgotPassword", "record"],
	["/Account/ResetPassword", "record"]
].filter(([Pattern]) => Served(Pattern));
/** The route as the register stores it: no trailing slash, `/` stays `/`. */
var Normalise = (Path) => Path === "/" ? "/" : Path.replace(/\/+$/, "");
/**
* The language a route is composed in.
*
* An unfiled route answers `record` - not a guess and not an error. The
* declaration strip then prints `◎ RECORD`, which is the grammar saying what is
* true: this page has no tracks, or nobody has decided its composition yet.
*/
var LanguageOf = (Path) => {
	const Normal = Normalise(Path);
	for (const [Pattern, Key] of RouteRegister) {
		if (Pattern.endsWith("*")) {
			const Prefix = Pattern.slice(0, -1);
			if (Normal === Prefix.replace(/\/$/, "") || Normal.startsWith(Prefix)) return Languages[Key];
			continue;
		}
		if (Normal === Pattern) return Languages[Key];
	}
	return Languages.record;
};
/** How many routes the register files under one language. */
var CountOf = (Key) => RouteRegister.filter(([, Entry]) => Entry === Key).length;
// Source/Background.astro
var $$Background = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="Layout" data-astro-cid-bqpd3p24> <!-- Topographic contour map - the product is called "Land" --><svg id="TopoMap" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" data-astro-cid-bqpd3p24> <!-- Main peak - upper right --><ellipse cx="1080" cy="260" rx="100" ry="58" transform="rotate(-18 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.12" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="200" ry="118" transform="rotate(-14 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.09" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="320" ry="192" transform="rotate(-10 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.07" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="460" ry="278" transform="rotate(-6 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.05" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="620" ry="370" transform="rotate(-3 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.03" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="1080" cy="260" rx="800" ry="474" transform="rotate(-1 1080 260)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.02" data-astro-cid-bqpd3p24></ellipse> <!-- Secondary peak - lower left --> <ellipse cx="280" cy="680" rx="75" ry="48" transform="rotate(22 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.10" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="160" ry="102" transform="rotate(17 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.08" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="270" ry="170" transform="rotate(12 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.06" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="400" ry="248" transform="rotate(7 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.04" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="280" cy="680" rx="550" ry="336" transform="rotate(3 280 680)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.02" data-astro-cid-bqpd3p24></ellipse> <!-- Tertiary saddle - center bottom --> <ellipse cx="720" cy="820" rx="60" ry="30" transform="rotate(5 720 820)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.07" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="720" cy="820" rx="140" ry="68" transform="rotate(3 720 820)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.05" data-astro-cid-bqpd3p24></ellipse> <ellipse cx="720" cy="820" rx="260" ry="124" transform="rotate(1 720 820)" fill="none" stroke="currentColor" stroke-width="1" opacity="0.03" data-astro-cid-bqpd3p24></ellipse> </svg> </div>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro", void 0);
// Source/Library/I18n/Server.ts
/** The English bundle of each namespace, by the name the lookup uses. */
var EnglishBundle = {
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
};
/** The four namespaces every page's chrome reads; they are always present. */
var CoreNamespaceList = [
	"common",
	"header",
	"footer",
	"meta"
];
/**
* Register a page-specific namespace's English bundle on the shared instance.
*
* `Client.ts` initialises this same `i18next` instance at import time - it is in
* every page's module graph through `Footer` -> `LocaleSwitcher` - so by the
* time a route's frontmatter calls `GetI18n()` the instance is already
* initialised and `GetI18n()`'s own `init` never runs. That init is where the
* page-specific bundles are declared, so a `home:`, `download:`, `account:` or
* `verify:` key resolved in a namespace with no resource bundle and fell
* through to the caller's `defaultValue` - silently, on every prerendered
* route.
*
* A route that reads a page-specific namespace declares it here, before the
* first `GetI18n()` call, and its keys then resolve from
* `Locale/En/<Namespace>.json`; the `defaultValue` becomes the missing-key arm
* rather than the copy. The four core namespaces need no declaration.
*
* The declaration is per route and not automatic for every namespace: a page
* that never reads `home:` should not pay for `Home.json` in its server
* render, and making every namespace live at once would move the homepage and
* the download page onto copy that has not been read against their defaults.
*/
function LoadServerNamespace(...NamespaceList) {
	for (const Namespace of NamespaceList) if (!i18n.hasResourceBundle("en", Namespace)) i18n.addResourceBundle("en", Namespace, EnglishBundle[Namespace], true, true);
}
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
	LoadServerNamespace(...CoreNamespaceList);
	return i18n.getFixedT("en");
}
// Source/Content/Edge/Copy.ts
/**
* The day the build rendered this page, ISO. Module scope, so it is evaluated
* once per build and every sheet in one build prints the same date.
*/
var EdgeBuildDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
/** Whole days between two `YYYY-MM-DD` dates, later minus earlier. */
var EdgeDaysBetween = (Earlier, Later) => {
	const From = Date.parse(`${Earlier}T00:00:00Z`);
	const To = Date.parse(`${Later}T00:00:00Z`);
	if (Number.isNaN(From) || Number.isNaN(To)) return 0;
	return Math.max(0, Math.round((To - From) / 864e5));
};
/** Resolve the edges' copy through the page's translator. */
var EdgePage = (T) => ({
	leaf: {
		sheet: T("edge.leaf.sheet", { defaultValue: "SHEET" }),
		of: T("edge.leaf.of", { defaultValue: "OF" }),
		part: T("edge.leaf.part", { defaultValue: "PART:" }),
		asOf: T("edge.leaf.asOf", { defaultValue: "AS OF:" }),
		circulation: T("edge.leaf.circulation", { defaultValue: "CIRCULATION:" }),
		source: T("edge.leaf.source", { defaultValue: "SOURCE:" }),
		circulationPublic: T("edge.leaf.circulationPublic", { defaultValue: "PUBLIC" }),
		circulationDenied: T("edge.leaf.circulationDenied", { defaultValue: "◎ NOT INDEXED" }),
		unavailable: T("edge.leaf.unavailable", { defaultValue: "UNAVAILABLE" }),
		unfiled: T("edge.leaf.unfiled", { defaultValue: "◎ NOT FILED" }),
		noPart: T("edge.leaf.noPart", { defaultValue: "◎ NONE" }),
		requestUrl: T("edge.leaf.requestUrl", { defaultValue: "REQUEST URL" }),
		unfiledProposition: T("edge.leaf.unfiledProposition", { defaultValue: "THIS ADDRESS IS NOT IN THE COLLATION: NO SHEET, NO PART, AND NO NEXT" }),
		stale: T("edge.leaf.stale", { defaultValue: "◎ STALE" }),
		age: T("edge.leaf.age", { defaultValue: "AGE:" }),
		staleNote: T("edge.leaf.staleNote", { defaultValue: "THE FIGURES ON THIS SHEET CARRY THEIR OWN DATE, AND IT IS OLDER THAN THIS BUILD" }),
		waitingOn: T("edge.leaf.waitingOn", { defaultValue: "BUILD" }),
		tooLongNote: T("edge.leaf.tooLongNote", { defaultValue: "THE ROUTE IS PRINTED IN FULL AND WRAPS" }),
		tooMuchNote: T("edge.leaf.tooMuchNote", { defaultValue: "THE DOCUMENT HAS OUTGROWN TWO DIGITS" })
	},
	turn: {
		next: T("edge.turn.next", { defaultValue: "NEXT:" }),
		recordEnd: T("edge.turn.recordEnd", { defaultValue: "LAND / RECORD END" }),
		noNext: T("edge.turn.noNext", { defaultValue: "◎ NO NEXT SHEET" }),
		indexRoute: T("edge.turn.indexRoute", { defaultValue: "/CONTENTS" }),
		missing: T("edge.turn.missing", { defaultValue: "◎ TARGET GONE" }),
		was: T("edge.turn.was", { defaultValue: "WAS:" }),
		interrupted: T("edge.turn.interrupted", { defaultValue: "INTERRUPTED" }),
		retry: T("edge.turn.retry", { defaultValue: "RETRY:" }),
		retryLabel: T("edge.turn.retryLabel", { defaultValue: "THE INDEX AT /CONTENTS" }),
		unfiledPart: T("edge.turn.unfiledPart", { defaultValue: "/UNFILED" }),
		emptyNote: T("edge.turn.emptyNote", { defaultValue: "THIS IS THE LAST SHEET THE DOCUMENT FILES, AND THE COLOPHON CLOSES IT" })
	}
});
// Source/Content/Edge/Register.ts
/**
* The Edge register - every sheet this document files, in the order it is read.
*
* ─── WHY THIS FILE EXISTS ─────────────────────────────────────────────────
* A running head says which PART of the document the reader stands in, and
* nothing says which SHEET. A part is ten pages of a dossier; a sheet is one of
* them, and a reader who wants to know whether to stay needs the sheet, not the
* part: what it is, where in the document it sits, when it was last read,
* whether it is indexed, and what it was set from.
*
* So this is the document's collation: the sheets in reading order, each with the
* one sentence that says what it is for and the file it was set from. It is the
* table a printed book's binder would have kept, and it is the only place the
* ordinal `SHEET 05 / 41` can come from - a page cannot number itself, because a
* page does not know what is before it.
*
* ─── THE TWO RULES ────────────────────────────────────────────────────────
* 1. **The extent is the list's own length.** `EdgeExtent` is
*    `EdgeSheets.length`, never a typed figure. Adding a sheet renumbers the
*    document and the footer's colophon in the same build, because both read
*    this number.
* 2. **A route that is not here is `◎ UNFILED`.** `/404` and `/Visit` are
*    deliberately absent: neither is a sheet of the document, and the leaf of
*    each says so in the grammar's fallback mark rather than inventing a place
*    for a page that has none. A page added to `Source/pages` and forgotten here
*    prints the same arm, which is the defect made visible instead of silent.
*
* ─── THE PROPOSITIONS ─────────────────────────────────────────────────────
* The `↳` line is the sheet's purpose, not its argument: the page's own `h1` and
* standfirst make the argument, and a second copy of it would be a poster. These
* are written once, here, in the voice the grammar keeps - fragments, no full
* stop, no adjective that is not a fact.
*
* On `/Contact` the sentence is NOT written here: it is `ContactPurposeAt`'s
* `Purpose`, the subtitle the route's own page prints, so a link and a leaf
* cannot describe one route two ways.
*
* ─── THE TURN ─────────────────────────────────────────────────────────────
* `EdgeNextOf` answers what comes after a sheet, and it answers at the PART's
* granularity: every sheet of `/DOCUMENTATION` closes by handing the reader
* `/BLOG`, and the entry sheet of `/BLOG` opens on the same three facts. That is
* the whole design - the closing gesture of one sheet and the opening gesture of
* the next are one seam, and a reader can check it by turning the page.
*
* No DOM, no JSX, no i18n import: a register is data.
*/
/**
* The document, sheet by sheet, in the order a dossier is read: the cover and
* its substitution table, the offer and the status board, the manual with its
* glossary and motion notes, the notes, the desk and its fourteen request
* routes, the licence and the contributor's way in, the legal back matter, the
* two app surfaces, the account routes, and then the index of all of it.
*
* The order inside a part is the order of a reader's use, not the alphabet: a
* part opens on its index, then its children, then the reference pages that
* belong to the same subject.
*/
var EdgeSheets = [
	{
		Path: "/",
		Part: "home",
		Proposition: "THE EDITOR'S CLAIM, AND THE FOUR STAGES IT IS BUILT IN",
		Source: "pages/index.astro"
	},
	{
		Path: "/Compare",
		Part: "home",
		Proposition: "WHERE THIS EDITOR SUBSTITUTES ITS PARTS, AND WHERE IT CANNOT",
		AsOf: "2026-05-23",
		Source: "pages/Compare.astro"
	},
	{
		Path: "/Download",
		Part: "download",
		Proposition: "WHAT CAN BE INSTALLED TODAY, AND WHAT CANNOT",
		Source: "pages/Download.astro"
	},
	{
		Path: "/Status",
		Part: "download",
		Proposition: "EVERY RECORD THE DOCUMENT CARRIES, SORTED BY ITS STATE",
		Source: "pages/Status.astro"
	},
	{
		Path: "/Doc",
		Part: "doc",
		Proposition: "THE MANUAL: THE EDITOR, ITS ELEMENTS, ITS BOUNDARIES",
		Source: "pages/Doc.astro"
	},
	{
		Path: "/Doc/:Slug",
		Part: "doc",
		Proposition: "ONE CHAPTER OF THE MANUAL, WITH ITS FIGURES AND ITS SOURCES",
		Family: "/Doc",
		Source: "pages/Doc/[...Slug].astro"
	},
	{
		Path: "/Doc/Rust",
		Part: "doc",
		Proposition: "THE RUST CORE, ITS BOUNDARIES, AND WHAT IT DOES NOT OWN",
		Source: "pages/Doc/Rust.astro"
	},
	{
		Path: "/Glossary",
		Part: "doc",
		Proposition: "THE WORDS THIS DOCUMENT USES, AND THE ONES IT RETIRED",
		Source: "pages/Glossary.astro"
	},
	{
		Path: "/Motion",
		Part: "doc",
		Proposition: "HOW A CHANGE OF STATE IS DRAWN, AND WHEN IT IS NOT",
		Source: "pages/Motion.astro"
	},
	{
		Path: "/Blog",
		Part: "blog",
		Proposition: "NOTES FROM THE BUILD, NEWEST FIRST",
		Source: "pages/Blog.astro"
	},
	{
		Path: "/Blog/:Slug",
		Part: "blog",
		Proposition: "ONE NOTE FROM THE BUILD, AND WHAT IT DOES NOT COVER",
		Family: "/Blog",
		Source: "pages/Blog/[Slug].astro"
	},
	{
		Path: "/Contact",
		Part: "contact",
		Proposition: "THE DESK: THIRTEEN ROUTES, ONE FOR EACH THING YOU NEED",
		Source: "pages/Contact/index.astro"
	},
	{
		Path: "/Contact/Amend",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Amend.astro"
	},
	{
		Path: "/Contact/Claim",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Claim.astro"
	},
	{
		Path: "/Contact/Deals",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Deals.astro"
	},
	{
		Path: "/Contact/Erase",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Erase.astro"
	},
	{
		Path: "/Contact/Guard",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Guard.astro"
	},
	{
		Path: "/Contact/Hails",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Hails.astro"
	},
	{
		Path: "/Contact/Leave",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Leave.astro"
	},
	{
		Path: "/Contact/Legal",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Legal.astro"
	},
	{
		Path: "/Contact/Lodge",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Lodge.astro"
	},
	{
		Path: "/Contact/Pause",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Pause.astro"
	},
	{
		Path: "/Contact/Query",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Query.astro"
	},
	{
		Path: "/Contact/Reach",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Reach.astro"
	},
	{
		Path: "/Contact/Sale",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Sale.astro"
	},
	{
		Path: "/Contact/Scout",
		Part: "contact",
		Proposition: "",
		Source: "pages/Contact/Scout.astro"
	},
	{
		Path: "/License",
		Part: "license",
		Proposition: "WHAT YOU MAY DO WITH THIS WORK, IN PLAIN CLAUSES",
		Source: "pages/License.astro"
	},
	{
		Path: "/Contributing",
		Part: "contributing",
		Proposition: "HOW A CHANGE REACHES THIS TREE, AND WHAT IT MUST PASS",
		Source: "pages/Contributing.astro"
	},
	{
		Path: "/Legal/Privacy",
		Part: "legal",
		Proposition: "WHAT THIS SITE COLLECTS, AND WHAT IT NEVER DOES",
		Source: "pages/Legal/Privacy.astro"
	},
	{
		Path: "/Legal/Term",
		Part: "legal",
		Proposition: "THE TERMS THIS SITE IS OFFERED UNDER",
		Source: "pages/Legal/Term.astro"
	},
	{
		Path: "/Portal",
		Part: "portal",
		Proposition: "THE PROVIDER PORTAL, AND WHO HOLDS EACH ACCOUNT",
		Source: "pages/Portal.astro"
	},
	{
		Path: "/Dashboard",
		Part: "portal",
		Proposition: "THE OPERATOR'S PANEL: THE RECORD'S OWN LIVE VALUES",
		Source: "pages/Dashboard.astro"
	},
	{
		Path: "/Account",
		Part: "account",
		Proposition: "YOUR RECORD: WHAT IT HOLDS, AND WHAT IT NEVER WILL",
		Source: "pages/Account/index.astro"
	},
	{
		Path: "/Account/SignIn",
		Part: "account",
		Proposition: "THE ONE DOOR INTO AN ACCOUNT",
		Source: "pages/Account/SignIn.astro"
	},
	{
		Path: "/Account/SignUp",
		Part: "account",
		Proposition: "WHY REGISTRATION IS CLOSED, AND WHAT OPENS IT",
		Source: "pages/Account/SignUp.astro"
	},
	{
		Path: "/Account/ForgotPassword",
		Part: "account",
		Proposition: "HOW A LOST PASSWORD IS REPLACED",
		Source: "pages/Account/ForgotPassword.astro"
	},
	{
		Path: "/Account/ResetPassword",
		Part: "account",
		Proposition: "HOW A REPLACEMENT PASSWORD IS SET",
		Source: "pages/Account/ResetPassword.astro"
	},
	{
		Path: "/Verify",
		Part: "account",
		Proposition: "THE THREE ANSWERS A VERIFICATION LINK CAN GIVE",
		Source: "pages/Verify.astro"
	},
	{
		Path: "/OAuth/Success",
		Part: "account",
		Proposition: "THE CALLBACK: WHAT IT WRITES, AND WHEN IT FAILS",
		Source: "pages/OAuth/Success.astro"
	},
	{
		Path: "/Contents",
		Part: "contents",
		Proposition: "EVERY SHEET THIS DOCUMENT FILES, IN ONE INDEX",
		Source: "pages/Contents.astro"
	},
	{
		Path: "/Specimen",
		Part: "contents",
		Proposition: "THE DOCUMENT'S OWN PARTS, PRINTED AT ONE TO ONE",
		Source: "pages/Specimen.astro"
	}
];
/** The document's extent, as every edge prints it: `41`. Two digits, zero-padded. */
var EdgeExtent = String(EdgeSheets.length).padStart(2, "0");
/** A path without its trailing slash, with `/` kept for the root, lowercased. */
var Normalize = (Path) => {
	const Trimmed = Path.replace(/\/+$/, "");
	return (Trimmed === "" ? "/" : Trimmed).toLowerCase();
};
/** A sheet's own key for matching: its pattern, lowercased. */
var KeyOf$1 = (Sheet) => Normalize(Sheet.Path);
/** The place a path holds in the document, or `undefined` when it is unfiled. */
var EdgePlaceOf = (Path) => {
	const Current = Normalize(Path);
	const Position = EdgeSheets.findIndex((Sheet) => KeyOf$1(Sheet) === Current);
	if (Position !== -1) return {
		Sheet: EdgeSheets[Position],
		Ordinal: String(Position + 1).padStart(2, "0"),
		Of: EdgeExtent,
		Position
	};
	const FamilyPosition = EdgeSheets.findIndex((Sheet) => {
		if (Sheet.Family === void 0) return false;
		const Prefix = Normalize(Sheet.Family);
		return Current.startsWith(`${Prefix}/`) && Current.length > Prefix.length + 1;
	});
	if (FamilyPosition === -1) return void 0;
	return {
		Sheet: EdgeSheets[FamilyPosition],
		Ordinal: String(FamilyPosition + 1).padStart(2, "0"),
		Of: EdgeExtent,
		Position: FamilyPosition
	};
};
/**
* The sheet's proposition.
*
* The `/Contact` routes carry no sentence in the table above because their
* sentence already exists: `ContactPurposeAt` reads it out of `Request.ts`, which
* is the same string the route's page and its share card print. A second copy
* here would be the fourth place to change when a route is renamed.
*/
var EdgePropositionOf = (Sheet) => {
	if (Sheet.Proposition !== "") return Sheet.Proposition;
	return ContactPurposeOf(Sheet.Path)?.Purpose ?? "";
};
/** The part of the document a sheet belongs to, resolved through the frame. */
var EdgePartOf = (Sheet) => [...FrameSections, FrameClosing].find((Section) => Section.Key === Sheet.Part) ?? FrameClosing;
/** The index, as the unfiled page's only exit and the colophon's door. */
var IndexNext = {
	Kind: "index",
	Route: "/Contents",
	Part: FrameClosing,
	Proposition: "EVERY SHEET THIS DOCUMENT FILES, IN ONE INDEX"
};
/** The entry sheet of a part: its first sheet in reading order. */
var EntryOfPart = (Part) => {
	const Path = EdgeSheets.find((Sheet) => Sheet.Part === Part.Key)?.Path;
	return Path === void 0 ? void 0 : EdgePlaceOf(Path);
};
/**
* What comes after this sheet.
*
* The answer is the PART's, not the sheet's: a sheet's foot hands the reader the
* next chapter, which is what a catchword does. Every sheet of `/DOCUMENTATION`
* therefore closes on `/BLOG`, and `/BLOG`'s own leaf opens on the same route,
* the same part and the same sentence - so the two edges of a navigation are one
* printed seam.
*/
var EdgeNextOf = (Path) => {
	const Place = EdgePlaceOf(Path);
	if (Place === void 0) return IndexNext;
	const Part = EdgePartOf(Place.Sheet);
	if (Part.Key === FrameClosing.Key) return {
		Kind: "record-end",
		Route: "/Contents",
		Part: FrameClosing,
		Proposition: "THE COLOPHON BELOW, AND THE INDEX OF EVERY SHEET AT /CONTENTS"
	};
	const After = FrameSections[FrameSections.findIndex((Section) => Section.Key === Part.Key) + 1];
	if (After === void 0) return {
		Kind: "record-end",
		Route: "/Contents",
		Part: FrameClosing,
		Proposition: "THE COLOPHON BELOW, AND THE INDEX OF EVERY SHEET AT /CONTENTS"
	};
	const Entry = EntryOfPart(After);
	return {
		Kind: "part",
		Route: Entry?.Sheet.Path ?? After.Href,
		Part: After,
		Proposition: Entry ? EdgePropositionOf(Entry.Sheet) : ""
	};
};
var $$Folio = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Folio;
	const { index, part, figure, count, asOf, source, class: Class } = Astro.props;
	const Facts = [
		count !== void 0 ? {
			kind: "count",
			text: count
		} : void 0,
		figure ? {
			kind: "figure",
			text: `${figure.value} ${figure.unit}`
		} : void 0,
		asOf ? {
			kind: "as-of",
			text: `AS OF: ${asOf}`
		} : void 0,
		source ? {
			kind: "source",
			text: `SOURCE: ${source}`
		} : void 0
	].filter((Entry) => Entry !== void 0);
	return renderTemplate`${maybeRenderHead($$result)}<p${addAttribute(["detail-folio", Class], "class:list")}> <span class="detail-folio__place"> <span class="detail-folio__index">${`〈${index}〉`}</span>  <span class="detail-folio__part"> ${part.split("/").map((Segment, Position, Segments) => Position < Segments.length - 1 ? [
		Segment,
		"/",
		renderTemplate`<wbr>`
	] : [Segment])} </span> </span> ${Facts.length > 0 && renderTemplate`<span class="detail-folio__facts"> ${Facts.map((Field) => renderTemplate`<span${addAttribute(["detail-folio__fact", `detail-folio__${Field.kind}`], "class:list")}> ${Field.kind === "source" ? Field.text.split("/").map((Segment, Position, Segments) => Position < Segments.length - 1 ? [
		Segment,
		"/",
		renderTemplate`<wbr>`
	] : [Segment]) : Field.text} </span>`)} </span>`} </p>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Detail/Folio.astro", void 0);
// Source/Component/Layout/Footer/Data.ts
/**
* The document's one separator, U+2001. A compact label joins its fields with
* it and nothing else - not a middot, not a slash, not a space.
*/
var Quad$2 = " ";
/** An off-site destination: the reader leaves this site in a second tab. */
var Offsite = (Label, Href) => ({
	Label,
	Href,
	Target: "blank"
});
/**
* The band as data. Every fact, every label and every destination here existed in
* the hand-written footer this replaces - nothing is added and nothing is
* dropped.
*
* The colophon is the one addition: the record's *making* rather than its facts.
* Every row is verifiable in this repository and nowhere else - `IBM PLEX MONO` is
* the face `Base.astro` loads, `ASTRO STATIC` is the build `astro.config.ts`
* declares (no `output` key), `F2EDE3` and `1C1C1E` are `--Background` and
* `--Foreground` in `_Token.scss`, and the extent is the length of
* `Frame/Data.ts`'s table. A colophon that guessed would be decoration.
*/
var FooterData = (T, Year = (/* @__PURE__ */ new Date()).getFullYear()) => ({
	Ledger: [
		{
			key: T("footer:record.source.key", { defaultValue: "SOURCE" }),
			value: T("footer:record.source.value", { defaultValue: "CODEEDITORLAND" })
		},
		{
			key: T("footer:record.license.key", { defaultValue: "LICENSE" }),
			value: T("footer:record.license.value", { defaultValue: "CC0" }),
			links: [{
				text: T("footer:record.license.value", { defaultValue: "CC0" }),
				href: "/License"
			}]
		},
		{
			key: T("footer:record.maintained.key", { defaultValue: "MAINTAINED BY" }),
			value: T("footer:record.maintained.value", { defaultValue: "PLAYFORM" }),
			links: [{
				text: T("footer:record.maintained.value", { defaultValue: "PLAYFORM" }),
				href: "https://PlayForm.Cloud",
				target: "blank"
			}]
		},
		{
			key: T("footer:record.support.key", { defaultValue: "SUPPORT" }),
			value: `${T("footer:record.support.nlnet", { defaultValue: "NLNET" })} / ${T("footer:record.support.ngi", { defaultValue: "NGI0" })}`,
			links: [{
				text: T("footer:record.support.nlnet", { defaultValue: "NLNET" }),
				href: "https://nlnet.nl",
				target: "blank"
			}, {
				text: T("footer:record.support.ngi", { defaultValue: "NGI0" }),
				href: "https://nlnet.nl/commonsfund",
				target: "blank"
			}]
		},
		{
			key: T("footer:record.status.key", { defaultValue: "STATUS" }),
			value: T("footer:record.status.value", { defaultValue: "ACTIVE" }),
			note: T("footer:record.status.note", { defaultValue: "PUBLIC SOURCE" })
		}
	],
	Colophon: [
		{
			key: T("footer:colophon.type.key", { defaultValue: "TYPE" }),
			value: T("footer:colophon.type.value", { defaultValue: "IBM PLEX MONO" })
		},
		{
			key: T("footer:colophon.setin.key", { defaultValue: "SET IN" }),
			value: T("footer:colophon.setin.value", { defaultValue: `13-72PX${Quad$2}WEIGHT 400-500` })
		},
		{
			key: T("footer:colophon.build.key", { defaultValue: "BUILD" }),
			value: T("footer:colophon.build.value", { defaultValue: `ASTRO${Quad$2}STATIC` })
		},
		{
			key: T("footer:colophon.impression.key", { defaultValue: "IMPRESSION" }),
			value: T("footer:colophon.impression.value", { defaultValue: EdgeBuildDate })
		},
		{
			key: T("footer:colophon.field.key", { defaultValue: "FIELD" }),
			value: T("footer:colophon.field.value", { defaultValue: "F2EDE3" })
		},
		{
			key: T("footer:colophon.ink.key", { defaultValue: "INK" }),
			value: T("footer:colophon.ink.value", { defaultValue: "1C1C1E" })
		},
		{
			key: T("footer:colophon.rule.key", { defaultValue: "RULE" }),
			value: T("footer:colophon.rule.value", { defaultValue: `8%${Quad$2}DIVIDER 20%` })
		},
		{
			key: T("footer:colophon.extent.key", { defaultValue: "EXTENT" }),
			value: T("footer:colophon.extent.value", { defaultValue: `${FrameExtent}${Quad$2}SECTIONS` })
		},
		{
			key: T("footer:colophon.sheets.key", { defaultValue: "SHEETS" }),
			value: T("footer:colophon.sheets.value", { defaultValue: EdgeExtent === "00" ? "◎ NO SHEETS FILED" : `${EdgeExtent}${Quad$2}FILED` })
		},
		{
			key: T("footer:colophon.edition.key", { defaultValue: "EDITION" }),
			value: T("footer:colophon.edition.value", { defaultValue: String(Year) })
		},
		{
			key: T("footer:colophon.errata.key", { defaultValue: "ERRATA" }),
			value: T("footer:colophon.errata.value", { defaultValue: `/STATUS${Quad$2}EVERY UNFINISHED RECORD` }),
			links: [{
				text: T("footer:colophon.errata.value", { defaultValue: `/STATUS${Quad$2}EVERY UNFINISHED RECORD` }),
				href: "/Status"
			}]
		},
		{
			key: T("footer:colophon.cite.key", { defaultValue: "CITE AS" }),
			value: T("footer:colophon.cite.value", { defaultValue: `CODEEDITORLAND${Quad$2}FIELD MANUAL${Quad$2}${Year}` })
		}
	],
	Quick: [
		{
			Label: T("footer:record.docs", { defaultValue: "/DOCS" }),
			Href: "/Doc"
		},
		{
			Label: T("footer:record.download", { defaultValue: "/DOWNLOAD" }),
			Href: "/Download"
		},
		Offsite(T("footer:record.github", { defaultValue: "/GITHUB" }), "https://github.com/CodeEditorLand/Land"),
		{
			Label: T("footer:record.contact", { defaultValue: "/CONTACT" }),
			Href: "/Contact"
		},
		{
			Label: T("footer:record.blog", { defaultValue: "/BLOG" }),
			Href: "/Blog"
		}
	],
	Legal: [
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
		},
		{
			Label: T("footer:columns.company.contributing", { defaultValue: "Contributing" }),
			Href: "/Contributing"
		},
		Offsite(T("footer:columns.company.issues", { defaultValue: "Issues" }), "https://github.com/CodeEditorLand/Land/issues"),
		{
			Label: T("footer:columns.product.blog", { defaultValue: "Blog" }),
			Href: "/Blog"
		},
		{
			Label: T("footer:columns.company.enterprise", { defaultValue: "Enterprise" }),
			Href: "/Contact/Sale"
		}
	],
	/**
	* The index, as the band's closing field.
	*
	* ROUTES and LEGAL name categories of destination; `/Contents` is not another
	* category - it is the page that lists every one of them, and the only page a
	* reader can arrive at to see the whole document. A printed dossier's last
	* line points back at its contents, so this one gets its own `INDEX:` label
	* and one door, printed in the rows' own `/LABEL` grammar. It is also the
	* placement that makes the index reachable at every width: the rail is
	* `display: none` between 1024px and 1280px, the footer never is.
	*/
	Index: [{
		Label: T("footer:record.contents", { defaultValue: "/CONTENTS" }),
		Href: "/Contents"
	}]
});
/** The attributes an off-site link needs; a same-tab link needs none. */
var FooterLinkAttributes = (Target) => Target === "blank" ? {
	target: "_blank",
	rel: "noopener noreferrer"
} : {};
var $$PrintRecord = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PrintRecord;
	const { class: Class } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["FooterPrint", Class], "class:list")}> <p class="FooterPrint__register"> <span class="FooterPrint__mark" aria-hidden="true">
#
</span> <span class="FooterPrint__index">PRINT_01</span> </p> <div class="FooterPrint__body"> <button class="FooterPrint__action" type="button" data-print-action hidden> <span class="FooterPrint__arrow" aria-hidden="true">
→
</span> <span class="FooterPrint__word">PRINT THIS SHEET</span> <span class="FooterPrint__chord">〈⌘P〉</span> </button> <p class="FooterPrint__note"> <span class="FooterPrint__note-mark" aria-hidden="true">
↳
</span> ${"THE SHEET AS A DOCUMENT: CHROME DROPPED, LINK TARGETS PRINTED, THE RECORD WHOLE."} </p> <noscript> <p class="FooterPrint__fallback">${"PRINT: THE BROWSER'S OWN COMMAND (⌘P / CTRL+P) PRINTS THIS SHEET THE SAME WAY."}</p> </noscript> <p class="FooterPrint__status" data-print-status hidden></p>  <p class="FooterPrint__printed"> <span class="FooterPrint__printed-key">PRINTED:</span> <span class="FooterPrint__blank" aria-hidden="true"></span> <span class="FooterPrint__copy"> <span aria-hidden="true">↳</span> ${"A COPY IS ALWAYS OLDER THAN THE SHEET THE FOLIO BELOW STATES ITS AS-OF."} </span> </p> </div> </div> <script crossorigin=\"anonymous\">
	(() => {
		const Button = document.querySelector("[data-print-action]");
		const Status = document.querySelector("[data-print-status]");

		if (!(Button instanceof HTMLButtonElement)) return;

		/*
		 * The error arm first. A browser without \`print\` is rare, but a dead
		 * control is not an acceptable fallback: the row states the condition
		 * and the next step instead of leaving a button that answers nothing.
		 */
		if (typeof window.print !== "function") {
			if (Status instanceof HTMLElement) {
				Status.hidden = false;
				Status.textContent =
					"◎ PRINT UNAVAILABLE\\u2001NEXT: USE THE BROWSER'S OWN PRINT COMMAND.";
			}
			return;
		}

		Button.hidden = false;
		Button.addEventListener("click", () => window.print());
	})();
<\/script>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Print/PrintRecord.astro", void 0);
// Source/Component/Layout/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const T = GetI18n();
	const Year = (/* @__PURE__ */ new Date()).getFullYear();
	const Data = FooterData(T, Year);
	const Copyright = T("footer:bottomBar.copyright", {
		year: Year,
		defaultValue: `© ${Year} Code Editor Land. CC0 1.0 Universal: no rights reserved.`
	});
	return renderTemplate`${maybeRenderHead($$result)}<footer class="Footer" role="contentinfo" aria-label="Site footer"> <div class="FooterRecord"> <div class="FooterRule" aria-hidden="true"></div> <div class="FooterRecordHeader"> <p class="FooterRecordEnd"> <span class="FooterRecordMarker" aria-hidden="true">
#
</span> ${T("footer:record.end", { defaultValue: "LAND / RECORD END" })} </p> <div class="FooterRecordLocale"> ${renderComponent($$result, "LocaleSwitcher", LocaleSwitcher, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/LocaleSwitcher.tsx",
		"client:component-export": "LocaleSwitcher"
	})} </div> </div>  ${renderComponent($$result, "PrintRecord", $$PrintRecord, {})}  <div class="FooterBody"> <div class="FooterFacts"> <p class="FooterField"> ${T("footer:field.facts", { defaultValue: "FACTS:" })} </p> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": Data.Ledger,
		"class": "FooterLedger"
	})} </div> <div class="FooterColophon"> <p class="FooterField"> ${T("footer:field.colophon", { defaultValue: "COLOPHON:" })} </p> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": Data.Colophon,
		"class": "FooterColophonLedger"
	})} </div> </div> <div class="FooterRows"> <div class="FooterRow"> <p class="FooterField"> ${T("footer:field.routes", { defaultValue: "ROUTES:" })} </p> <nav class="FooterQuickLinks" aria-label="Routes"> ${Data.Quick.map((Link) => renderTemplate`<a class="FooterQuickLink"${addAttribute(Link.Href, "href")}${spreadAttributes(FooterLinkAttributes(Link.Target))}> ${Link.Label} </a>`)} </nav> </div> <div class="FooterRow"> <p class="FooterField"> ${T("footer:field.legal", { defaultValue: "LEGAL:" })} </p> <nav class="FooterLegal" aria-label="Legal"> ${Data.Legal.map((Link) => renderTemplate`<a class="FooterLegalLink"${addAttribute(Link.Href, "href")}${spreadAttributes(FooterLinkAttributes(Link.Target))}> ${Link.Label} </a>`)} </nav> </div>  <div class="FooterRow"> <p class="FooterField"> ${T("footer:field.index", { defaultValue: "INDEX:" })} </p> <nav class="FooterQuickLinks" aria-label="Index"> ${Data.Index.map((Link) => renderTemplate`<a class="FooterQuickLink"${addAttribute(Link.Href, "href")}${spreadAttributes(FooterLinkAttributes(Link.Target))}> ${Link.Label} </a>`)} </nav> </div> </div> <div class="FooterBottom">  <div class="FooterFolio"> ${renderComponent($$result, "Folio", $$Folio, {
		"index": "↳",
		"part": "/COLOPHON",
		"figure": {
			value: EdgeExtent,
			unit: "SHEETS"
		},
		"asOf": EdgeBuildDate,
		"source": "Source/Content/Edge/Register.ts"
	})} </div> <span class="FooterCopyright">${Copyright}</span> <a class="FooterTop" href="#" aria-label="Back to top"> ${T("footer:bottomBar.top", { defaultValue: "Back to top ↑" })} </a> <span class="FooterTauri"> <a class="FooterTauriLink" href="https://tauri.app" target="_blank" rel="noopener noreferrer"> <img src="/Image/GitHub/Made/Tauri.svg" alt="Made with Tauri" width="160" height="32" loading="lazy" decoding="async"> </a> </span> </div> </div> </footer>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer.astro", void 0);
var $$EdgeLeaf = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EdgeLeaf;
	const { path, canonical, noIndex = false, description, section, state: ForcedState, class: Class } = Astro.props;
	const Copy = EdgePage(GetI18n());
	const Place = EdgePlaceOf(canonical);
	const Part = Place === void 0 ? section : EdgePartOf(Place.Sheet);
	const AsOf = Place?.Sheet.AsOf ?? EdgeBuildDate;
	const Age = EdgeDaysBetween(AsOf, EdgeBuildDate);
	const IsStale = Place !== void 0 && Place.Sheet.AsOf !== void 0 && Age > 90;
	const RouteText = (Place?.Sheet.Path === "/" ? "/LAND" : Place?.Sheet.Path ?? path).toUpperCase();
	const RegisterProposition = Place ? EdgePropositionOf(Place.Sheet) : "";
	const OwnDescription = description?.trim() ?? "";
	const Proposition = Place === void 0 ? Copy.leaf.unfiledProposition : Place.Sheet.Family !== void 0 && OwnDescription !== "" ? OwnDescription : RegisterProposition !== "" ? RegisterProposition : OwnDescription !== "" ? OwnDescription : Copy.leaf.unavailable;
	const State = ForcedState ?? (Place === void 0 ? "unfiled" : IsStale ? "stale" : RouteText.length > 48 ? "too-long" : "rest");
	const IsTooMuch = Place !== void 0 && EdgeExtent.length > 2;
	const Ordinal = State === "unfiled" ? Copy.leaf.unfiled : Place?.Ordinal ?? Copy.leaf.unfiled;
	const Extent = State === "unfiled" ? "" : `${Copy.leaf.of}\u2001${EdgeExtent}`;
	const PartValue = State === "unfiled" ? Copy.leaf.noPart : `${Part.Index}\u2001${Part.Label}`;
	const Circulation = noIndex ? Copy.leaf.circulationDenied : Copy.leaf.circulationPublic;
	const Source = State === "unfiled" ? Copy.leaf.requestUrl : Place?.Sheet.Source ?? Copy.leaf.unavailable;
	const FactOrder = [
		"part",
		"circulation",
		"source",
		"as-of",
		"age"
	];
	const Facts = [
		{
			key: Copy.leaf.part,
			value: PartValue,
			kind: "part"
		},
		{
			key: Copy.leaf.asOf,
			value: IsStale && State !== "unfiled" ? `${AsOf}\u2001${Copy.leaf.stale}` : AsOf,
			kind: "as-of"
		},
		...IsStale && State !== "unfiled" ? [{
			key: Copy.leaf.age,
			value: `${Age}\u2001DAYS`,
			kind: "age"
		}] : [],
		{
			key: Copy.leaf.circulation,
			value: Circulation,
			kind: "circulation"
		},
		{
			key: Copy.leaf.source,
			value: Source,
			kind: "source"
		}
	].sort((A, B) => FactOrder.indexOf(A.kind) - FactOrder.indexOf(B.kind));
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["EdgeLeaf", Class], "class:list")}${addAttribute(State, "data-state")}${addAttribute(Part.Key, "data-part")}${addAttribute(noIndex ? "denied" : "public", "data-circulation")}> <div class="EdgeLeaf__row"> <div class="EdgeLeaf__head"> <p class="EdgeLeaf__folio"> <span class="EdgeLeaf__mark" aria-hidden="true">
#
</span> <span class="EdgeLeaf__sheet">${Copy.leaf.sheet}</span> <span class="EdgeLeaf__ordinal">${Ordinal}</span> ${Extent !== "" ? renderTemplate`<span class="EdgeLeaf__of">${Extent}</span>` : null} </p>  <p class="EdgeLeaf__route"${addAttribute(RouteText, "data-route")}> ${RouteText.split("/").map((Segment, Position, Segments) => Position < Segments.length - 1 ? [
		Segment,
		"/",
		renderTemplate`<wbr>`
	] : [Segment])} </p> </div> <dl class="EdgeLeaf__facts"> ${Facts.map((Fact) => renderTemplate`<div class="EdgeLeaf__fact"${addAttribute(Fact.kind, "data-kind")}> <dt class="EdgeLeaf__key">${Fact.key}</dt> <dd class="EdgeLeaf__value"${addAttribute(Fact.kind === "age" ? "" : void 0, "data-figure")}> ${State === "loading" ? renderTemplate`<span class="EdgeLeaf__bar" aria-hidden="true"></span>` : Fact.kind === "source" ? Fact.value.split("/").map((Segment, Position, Segments) => Position < Segments.length - 1 ? [
		Segment,
		"/",
		renderTemplate`<wbr>`
	] : [Segment]) : Fact.value} </dd> </div>`)} </dl> </div> <p class="EdgeLeaf__proposition"> <span class="EdgeLeaf__proposition-mark" aria-hidden="true">
↳
</span> <span class="EdgeLeaf__proposition-text">${Proposition}</span> </p> ${State === "loading" ? renderTemplate`<p class="EdgeLeaf__note">${`WAITING ON: ${Copy.leaf.waitingOn}`}</p>` : null} ${State === "stale" ? renderTemplate`<p class="EdgeLeaf__note">${Copy.leaf.staleNote}</p>` : null} ${State === "too-long" ? renderTemplate`<p class="EdgeLeaf__note">${Copy.leaf.tooLongNote}</p>` : null} ${State === "too-much" || IsTooMuch ? renderTemplate`<p class="EdgeLeaf__note">${Copy.leaf.tooMuchNote}</p>` : null} ${State === "partial" ? renderTemplate`<p class="EdgeLeaf__note">${`${Copy.leaf.source}\u2001${Copy.leaf.unavailable}`}</p>` : null} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Edge/EdgeLeaf.astro", void 0);
var $$EdgeTurn = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EdgeTurn;
	const { canonical, state: ForcedState, class: Class } = Astro.props;
	const Copy = EdgePage(GetI18n());
	const Place = EdgePlaceOf(canonical);
	const Next = EdgeNextOf(canonical);
	const AsOf = Place?.Sheet.AsOf ?? EdgeBuildDate;
	const SheetsInNextPart = EdgeSheets.filter((Sheet) => Sheet.Part === Next.Part.Key).length;
	const IsTooMuch = Next.Kind === "part" && SheetsInNextPart > 12;
	const State = ForcedState ?? (Next.Kind === "index" ? "error" : Next.Kind === "record-end" ? "record-end" : IsTooMuch ? "too-much" : Next.Route.length > 32 ? "too-long" : "rest");
	const RouteText = Next.Route.toUpperCase();
	const PartText = `${Next.Part.Index}\u2001${Next.Part.Label}`;
	const Ordinal = Place?.Ordinal ?? "◎";
	const FolioPart = Place === void 0 ? Copy.turn.unfiledPart : Place.Sheet.Path === "/" ? "/LAND" : Place.Sheet.Path.toUpperCase();
	const IsLink = State === "rest" || State === "too-much" || State === "too-long";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["EdgeTurn", Class], "class:list")}${addAttribute(State, "data-state")}${addAttribute(Next.Kind, "data-kind")}> <div class="EdgeTurn__row"> <div class="EdgeTurn__hand"> ${State === "record-end" ? renderTemplate`<p class="EdgeTurn__next"> <span class="EdgeTurn__mark" aria-hidden="true">
→
</span> <span class="EdgeTurn__key">${Copy.turn.next}</span> <span class="EdgeTurn__end">${Copy.turn.recordEnd}</span> </p>` : State === "error" || State === "empty" || State === "missing" ? renderTemplate`<p class="EdgeTurn__next"> <span class="EdgeTurn__mark" aria-hidden="true">
◎
</span> <span class="EdgeTurn__key"> ${State === "missing" ? Copy.turn.missing : Copy.turn.noNext} </span> ${State === "missing" ? renderTemplate`<span class="EdgeTurn__was">${`${Copy.turn.was}\u2001${RouteText}`}</span>` : null} </p>` : renderTemplate`<p class="EdgeTurn__next"> <span class="EdgeTurn__mark" aria-hidden="true">
→
</span> <span class="EdgeTurn__key">${Copy.turn.next}</span> ${IsLink ? renderTemplate`<a class="EdgeTurn__route"${addAttribute(Next.Route, "href")}> ${RouteText} </a>` : renderTemplate`<span class="EdgeTurn__route">${RouteText}</span>`} <span class="EdgeTurn__part">${PartText}</span> </p>`} <p class="EdgeTurn__proposition"> <span class="EdgeTurn__proposition-mark" aria-hidden="true">
↳
</span> <span class="EdgeTurn__proposition-text"> ${State === "missing" || State === "empty" ? Copy.turn.emptyNote : Next.Proposition !== "" ? Next.Proposition : Copy.turn.retryLabel} </span> </p> ${State === "error" ? renderTemplate`<p class="EdgeTurn__receipt"> <span class="EdgeTurn__receipt-key">${`STATUS: ${Copy.turn.interrupted}`}</span> <span class="EdgeTurn__receipt-key">${Copy.turn.retry}</span> <a class="EdgeTurn__route" href="/Contents"> ${Copy.turn.retryLabel} </a> </p>` : null} ${State === "too-much" ? renderTemplate`<p class="EdgeTurn__note"> ${`${SheetsInNextPart}\u2001SHEETS IN THIS PART\u2001THE TURN HANDS OVER THE PART, NOT ONE SHEET`} </p>` : null} ${State === "loading" ? renderTemplate`<p class="EdgeTurn__note">${`WAITING ON: ${Copy.leaf.waitingOn}`}</p>` : null} </div> ${renderComponent($$result, "Folio", $$Folio, {
		"class": "EdgeTurn__folio",
		"index": Ordinal,
		"part": FolioPart,
		"figure": {
			value: EdgeExtent,
			unit: "SHEETS"
		},
		"asOf": AsOf
	})} </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Edge/EdgeTurn.astro", void 0);
// Source/Function/Doc/BuildDocSidebar.ts
var SectionOrder = [
	"Start",
	"Guide",
	"Elements",
	"Deep Dive",
	"Workflows",
	"Why Land",
	"Reference",
	"Development",
	"Telemetry",
	"Low-Level Shim",
	"Coverage"
];
/**
* The one slug rule for a doc surface: lower case, runs of whitespace to a
* single hyphen. Section ids and the index's band anchors both come from here,
* so `/Doc#deep-dive` addresses the same section the sidebar calls `Deep Dive`.
*/
var Slugify = (Value) => Value.toLowerCase().replace(/\s+/g, "-");
var BuildDocSidebar = (Entries) => {
	const EntriesBySection = /* @__PURE__ */ new Map();
	for (const Entry of Entries) {
		const Section = Entry.data.section ?? "Other";
		if (!EntriesBySection.has(Section)) EntriesBySection.set(Section, []);
		EntriesBySection.get(Section).push(Entry);
	}
	return SectionOrder.filter((Section) => EntriesBySection.has(Section)).map((Section) => {
		const Items = [];
		const GroupsByLabel = /* @__PURE__ */ new Map();
		for (const Entry of EntriesBySection.get(Section)) {
			const Label = Entry.data.navTitle ?? Entry.data.title;
			const Group = Entry.data.group;
			if (!Group) {
				Items.push({
					Id: Entry.id,
					Label
				});
				continue;
			}
			let GroupItem = GroupsByLabel.get(Group);
			if (!GroupItem) {
				GroupItem = {
					Id: Slugify(Group),
					Label: Group,
					Children: []
				};
				GroupsByLabel.set(Group, GroupItem);
				Items.push(GroupItem);
			}
			GroupItem.Children.push({
				Id: Entry.id,
				Label
			});
		}
		return {
			Id: Slugify(Section),
			Label: Section,
			Children: Items
		};
	});
};
// Source/Component/UI/Dialog.tsx
var SizeClass = {
	sm: "Slip--sm",
	md: "Slip--md",
	lg: "Slip--lg",
	full: ""
};
function Dialog({ open, defaultOpen, onOpenChange, ...props }) {
	const Root = UseSlipRoot({
		open,
		defaultOpen,
		onOpenChange
	});
	return /* @__PURE__ */ jsx(DoorContext.Provider, {
		value: Root.Door,
		children: /* @__PURE__ */ jsx(DialogPrimitive.Root, {
			open: Root.Open,
			onOpenChange: Root.OnOpenChange,
			...props
		})
	});
}
function DialogTrigger({ ...props }) {
	const Ref = UseDoorRef(React$1.useContext(DoorContext));
	return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, {
		ref: Ref,
		"data-slot": "dialog-trigger",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(DialogPrimitive.Portal, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
		"data-slot": "dialog-overlay",
		className: cn("SlipScrim", className),
		...props
	});
}
function DialogContent({ className, children, close = true, size = "md", head, state = "ready", empty, error, foot, bare = false, ...props }) {
	const Return = UseDoorReturn();
	const Head = head === void 0 ? void 0 : state === "loading" ? {
		...head,
		State: "LOADING"
	} : state === "error" ? {
		...head,
		State: "INTERRUPTED"
	} : head;
	return /* @__PURE__ */ jsxs(DialogPortal, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
			"data-slot": "dialog-content",
			"data-size": size,
			"data-body-state": state,
			"aria-label": Head?.Name,
			onOpenAutoFocus: Return.OnOpenAutoFocus,
			onCloseAutoFocus: Return.OnCloseAutoFocus,
			className: cn("Slip", "Slip--panel", "Slip--dialog", SizeClass[size], className),
			...props,
			children: [
				Head === void 0 ? null : /* @__PURE__ */ jsx(SlipRegister, { head: Head }),
				state === "loading" ? /* @__PURE__ */ jsx(SlipLoading, {}) : null,
				state === "empty" ? /* @__PURE__ */ jsx(SlipEmpty, {
					Mark: empty?.Mark ?? "NO RECORD",
					Line: empty?.Line ?? "NOTHING IS FILED HERE YET"
				}) : null,
				state === "error" ? /* @__PURE__ */ jsx(SlipError, {
					Mark: error?.Mark ?? "INTERRUPTED",
					Line: error?.Line ?? "THE ACTION DID NOT COMPLETE",
					...error?.Cause === void 0 ? {} : { Cause: error.Cause },
					...error?.Next === void 0 ? {} : { Next: error.Next },
					OnRetry: error?.OnRetry,
					...error?.Retry === void 0 ? {} : { Retry: error.Retry }
				}) : null,
				bare ? children : /* @__PURE__ */ jsx(DialogBody, { children }),
				foot === void 0 ? null : /* @__PURE__ */ jsx(SlipFoot, { Items: foot }),
				close ? /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
					className: "SlipClose",
					children: [/* @__PURE__ */ jsx(lucide.XIcon, { "aria-hidden": "true" }), /* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: "Close"
					})]
				}) : null
			]
		})]
	});
}
/**
* The body - the one region of a dialog that scrolls.
*
* It is a named part rather than a `<div>` at each call site because the rule
* it carries is structural: the panel is `overflow: hidden` so its frame stays
* whole, the head and the foot are `flex: none`, and this is the only element
* allowed to move. A dialog that scrolled as a whole would scroll its own
* register line away, which is exactly what a slip's sticky head exists to
* prevent.
*/
function DialogBody({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-body",
		className: cn("Slip__Body", className),
		...props
	});
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-header",
		className: cn("Slip__PanelHead", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogPrimitive.Title, {
		"data-slot": "dialog-title",
		className: cn("Slip__PanelTitle", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(DialogPrimitive.Description, {
		"data-slot": "dialog-description",
		className: cn("Slip__PanelNote", className),
		...props
	});
}
// Source/Component/UI/Command.tsx
/**
* Command - cmdk's engine in the slip's clothes.
*
* cmdk owns the hard part and none of it is restated here: the roving selection
* over rendered items, ArrowUp/ArrowDown, Home/End, Enter, the `data-selected`
* flag the row grammar reads, and the scroll-into-view of the selected row. This
* file decides what a command row *is* - the same `[mark] [label] [meta]` row a
* menu item is, with the same five states - so a palette result and a menu item
* are visibly the same object.
*
* `shouldFilter` passes through `Command` untouched; `CommandDialog` sets it
* `false`, because the palette filters its own register (it matches a page
* against its section and its slug as well as its label, which cmdk's flat string
* match cannot) and cmdk still owns the selection over whatever is rendered -
* which is the whole reason to use it.
*/
function Command$1({ className, dense = false, ...props }) {
	return /* @__PURE__ */ jsx(Command, {
		"data-slot": "command",
		"data-density": dense ? "dense" : void 0,
		className: cn("Palette__Command", className),
		...props
	});
}
/**
* The query input. It renders bare - no wrapper, no magnifier icon, no bottom
* rule - because in this site the input lives *inside* the slip's register line,
* and a second frame there would be a card inside a card. The head draws the
* focus state for the whole line.
*/
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Input, {
		"data-slot": "command-input",
		className: cn("Palette__Input", className),
		...props
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.List, {
		"data-slot": "command-list",
		className: cn("Palette__List", className),
		...props
	});
}
/**
* The empty state. `◎` is the grammar's fallback mark and `↳` is its
* proposition: *nothing here*, then *here is what to do*. A palette that prints
* "No results found" and stops is a dead end; this one names the way out.
*/
function CommandEmpty({ Mark = "NO RECORD", Line = "TRY A PART, A SECTION, OR A PAGE NAME", children, className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Empty, {
		"data-slot": "command-empty",
		className: cn("Slip__Empty", className),
		...props,
		children: children ?? /* @__PURE__ */ jsx(SlipEmpty, {
			Mark,
			Line
		})
	});
}
function CommandGroup({ className, heading, children, ...props }) {
	return /* @__PURE__ */ jsxs(Command.Group, {
		"data-slot": "command-group",
		className: cn("Slip__Section", className),
		...props,
		children: [heading ? /* @__PURE__ */ jsx("p", {
			className: "Slip__Group",
			children: heading
		}) : null, children]
	});
}
function CommandItem({ className, mark = "/", meta, ...props }) {
	return /* @__PURE__ */ jsx(Command.Item, {
		"data-slot": "command-item",
		"data-mark": mark,
		"data-meta": meta,
		className: cn("Slip__Row", className),
		...props
	});
}
// Source/Component/UI/Palette/Match.ts
var MatchEntry = (Query, Entry) => {
	/**
	* The site prints every route with a leading `/` (`/DOC`, `/CONTENTS`), so a
	* reader who types the grammar must not be told there is no such row: the
	* marker is the grammar, not part of the name. Strip it before matching, and
	* `/contents` ranks exactly as `contents` does.
	*/
	const Needle = Query.trim().toLowerCase().replace(/^\/+/, "");
	if (Needle === "") return 1;
	const Label = Entry.Label.toLowerCase();
	const Section = (Entry.Section ?? "").toLowerCase();
	const Slug = Entry.Id.replace(/^(page|part|record|term|action)-/, "").toLowerCase();
	if (Label === Needle) return 100;
	if (Label.startsWith(Needle)) return 80;
	if (Label.includes(Needle)) return 60;
	if (Label.split(/[\s/]+/).some((Word) => Word.startsWith(Needle))) return 70;
	if (Section.startsWith(Needle)) return 40;
	if (Section.includes(Needle)) return 30;
	if (Slug.includes(Needle)) return 20;
	return Subsequence(Needle, `${Label} ${Section} ${Slug}`) ? 10 : 0;
};
/**
* Every character of the needle, in order, somewhere in the haystack. Cheap, and
* enough for a register of under two hundred rows: it catches "fsfp" for
* "Filesystem Footprint" without pulling a scoring library into the island.
*/
var Subsequence = (Needle, Haystack) => {
	let At = 0;
	for (const Character of Haystack) {
		if (Character === Needle[At]) At += 1;
		if (At === Needle.length) return true;
	}
	return Needle.length === 0;
};
/** Filter and order one group's rows. */
var FilterEntries = (Query, Entries) => Entries.map((Entry, Index) => ({
	Entry,
	Index,
	Rank: MatchEntry(Query, Entry)
})).filter(({ Rank }) => Rank > 0).sort((A, B) => B.Rank - A.Rank || A.Index - B.Index).map(({ Entry }) => Entry);
// Source/Component/UI/Palette/Palette.tsx
/**
* The command palette - the site's index, opened by a chord.
*
* ─── WHAT IT IS: A ROUTE INDEX, NOT A SEARCH BOX ────────────────────────────
*
* This is a documentation site about an editor, so the reader's question is *take
* me to the page about X*, not *search my words*. Every row is a `/` destination
* or a `→` action, never a snippet, never a "0 results on this site" apology.
* That decision is why the palette has no content index behind it: a static site
* that offers to search prose and then finds nothing has made a promise it cannot
* keep, and the manual's own pages are the index.
*
* ─── THE TWO REGISTERS ARE THE SITE'S OWN ───────────────────────────────────
*
* `ROUTES` is `FrameSections` - the ten parts the running head prints and the
* margin rail indexes - plus the five pages the frame files beside them: the
* Rust API, the status board, the lexicon, the comparison and the index. The
* manual's groups are the same `DocSection[]` tree the rail renders. One source
* each, so the palette and the furniture around it can never disagree about
* what the site contains.
*
* ─── THE COUNT IS LIVE, AND IT IS PRINTED IN THE GRAMMAR ────────────────────
*
* `# FIND / 03`. The head prints the record header a slip opens with, and the
* number is what the current query and scope matched, in the grammar's two
* digits. A palette that says "3 results" is a search field; a palette that
* says `# FIND / 03` is this document's index.
*
* ─── THE KEYBOARD PATH, STATED ──────────────────────────────────────────────
*
* `⌘K` / `Ctrl+K` opens and closes, and that chord is this island's own
* document listener: the palette is one control on every page rather than a
* widget per surface. `↑↓` move, `Home`/`End` jump and `Enter` opens - cmdk's
* list. `Esc` closes through Radix Dialog, and returning focus to whatever
* opened the palette is this island's rule, because the door is a sibling
* button rather than a trigger. All of it is stated in the foot, so a reader
* who has never used it can.
*/
var Scopes = [
	{
		Value: "all",
		Label: "ALL"
	},
	{
		Value: "doc",
		Label: "DOC"
	},
	{
		Value: "site",
		Label: "SITE"
	}
];
var IsApple = () => typeof navigator !== "undefined" && /^Mac|iPhone|iPad/.test(navigator.platform ?? "");
/**
* The foot's three chords, in the grammar's order: what moves, what opens, what
* closes. They are the family's `SlipFootItem`, so a menu that states its own
* keyboard path prints the identical line - one foot, one implementation.
*/
var FootItems = [
	{
		Chord: "↑↓",
		Label: "MOVE"
	},
	{
		Chord: "ENTER",
		Label: "OPEN"
	},
	{
		Chord: "ESC",
		Label: "CLOSE"
	}
];
/** Two digits, as the grammar prints a count. */
var Pad = (Value) => String(Value).padStart(2, "0");
var Navigate = (Href) => {
	try {
		window.location.assign(Href);
	} catch {}
};
var Row = ({ Entry, OnNavigate }) => /* @__PURE__ */ jsx(CommandItem, {
	value: `${Entry.Id} ${Entry.Label}`,
	mark: Entry.Kind === "action" ? "→" : "/",
	meta: Entry.Meta ?? (Entry.Kind === "route" ? Entry.Part : Entry.Section) ?? void 0,
	onSelect: () => OnNavigate(Entry.Href ?? "/"),
	children: Entry.Label
}, Entry.Id);
var Palette = ({ Register, OnNavigate }) => {
	const [Open, SetOpen] = React$1.useState(false);
	const [Query, SetQuery] = React$1.useState("");
	const [Scope, SetScope] = React$1.useState("all");
	const [Copied, SetCopied] = React$1.useState(false);
	const [Modifier, SetModifier] = React$1.useState("⌘K");
	const OpenRef = React$1.useRef(Open);
	React$1.useEffect(() => {
		OpenRef.current = Open;
	}, [Open]);
	const CopyTimer = React$1.useRef(null);
	const TriggerRef = React$1.useRef(null);
	/**
	* Where focus goes when the palette closes.
	*
	* Radix restores focus to a `DialogTrigger` it owns, and this palette's door is
	* a sibling button rather than a trigger - so the rule is stated here: return to
	* whatever had focus when the palette opened, and fall back to the trigger when
	* that was the document body (a chord pressed with nothing focused). Dismissal
	* that dumps the reader at the top of the document is dismissal they have to
	* recover from.
	*/
	const ReturnRef = React$1.useRef(null);
	const OnOpenChange = React$1.useCallback((Next) => {
		SetOpen(Next);
		if (Next) return;
		const Target = ReturnRef.current;
		setTimeout(() => {
			if (Target && document.contains(Target) && Target !== document.body) Target.focus();
			else TriggerRef.current?.focus();
		}, 0);
	}, []);
	React$1.useEffect(() => {
		SetModifier(IsApple() ? "⌘K" : "CTRL K");
	}, []);
	const OpenWith = React$1.useCallback((Next) => {
		if (typeof Next === "string") SetQuery(Next);
		ReturnRef.current = document.activeElement;
		SetOpen(true);
	}, []);
	React$1.useEffect(() => {
		const OnKey = (Event) => {
			if (Event.key.toLowerCase() !== "k") return;
			if (!Event.metaKey && !Event.ctrlKey) return;
			Event.preventDefault();
			if (OpenRef.current) OnOpenChange(false);
			else OpenWith();
		};
		window.addEventListener("keydown", OnKey);
		return () => window.removeEventListener("keydown", OnKey);
	}, [OnOpenChange, OpenWith]);
	React$1.useEffect(() => {
		const OnOpen = (Event) => {
			const Detail = Event.detail;
			OpenWith(Detail?.query);
		};
		window.addEventListener("palette:open", OnOpen);
		return () => window.removeEventListener("palette:open", OnOpen);
	}, [OpenWith]);
	React$1.useEffect(() => () => {
		if (CopyTimer.current) clearTimeout(CopyTimer.current);
	}, []);
	const AllRoutes = FilterEntries(Query, Register.Routes);
	const AllRecords = FilterEntries(Query, Register.Records);
	const AllTerms = FilterEntries(Query, Register.Terms);
	const AllDoc = Register.Doc.map((Group) => ({
		...Group,
		Pages: FilterEntries(Query, Group.Pages)
	})).filter((Group) => Group.Pages.length > 0);
	const AllActions = FilterEntries(Query, Register.Actions);
	const DocCount = AllDoc.reduce((Total, Group) => Total + Group.Pages.length, 0);
	const Routes = Scope === "doc" ? [] : AllRoutes;
	const Records = Scope === "doc" ? [] : AllRecords;
	const Terms = Scope === "doc" ? [] : AllTerms;
	const Doc = Scope === "site" ? [] : AllDoc;
	const Actions = Scope === "doc" ? [] : AllActions;
	/** What the current scope is hiding. `0` when nothing is hidden. */
	const Outside = Scope === "doc" ? AllRoutes.length + AllRecords.length + AllTerms.length + AllActions.length : Scope === "site" ? DocCount : 0;
	const Count = Routes.length + Records.length + Terms.length + Doc.reduce((Total, Group) => Total + Group.Pages.length, 0) + Actions.length;
	const Copy = () => {
		const Address = window.location.href;
		navigator.clipboard?.writeText(Address).catch(() => {});
		SetCopied(true);
		if (CopyTimer.current) clearTimeout(CopyTimer.current);
		CopyTimer.current = setTimeout(() => SetCopied(false), 1800);
	};
	const Go = OnNavigate ?? Navigate;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("button", {
		type: "button",
		ref: TriggerRef,
		className: "PaletteTrigger",
		"data-palette-trigger": true,
		onClick: () => OpenWith(),
		children: [/* @__PURE__ */ jsx("span", { children: "Find a record" }), /* @__PURE__ */ jsx(Chord, {
			Ink: true,
			children: Modifier
		})]
	}), /* @__PURE__ */ jsx(Dialog, {
		open: Open,
		onOpenChange: OnOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "Palette",
			close: false,
			bare: true,
			children: [
				/* @__PURE__ */ jsx(DialogTitle, {
					className: "sr-only",
					children: "Find a record"
				}),
				/* @__PURE__ */ jsx(DialogDescription, {
					className: "sr-only",
					children: "The site's parts, the record heads its pages print, the words the lexicon defines, the manual's sections and pages, and the palette's own actions."
				}),
				/* @__PURE__ */ jsxs(Command$1, {
					shouldFilter: false,
					label: "Find a record",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "Palette__Head",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "Slip__Mark",
									"aria-hidden": "true",
									children: "#"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "Slip__Name",
									"aria-hidden": "true",
									children: "FIND"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "Slip__Rule",
									"aria-hidden": "true",
									children: "/"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "Palette__Count",
									"data-empty": Count === 0,
									"aria-hidden": "true",
									children: Pad(Count)
								}),
								/* @__PURE__ */ jsx(CommandInput, {
									value: Query,
									onValueChange: SetQuery,
									placeholder: "a part, a section, a record, a word",
									"aria-label": "Filter the index"
								}),
								/* @__PURE__ */ jsx(Segmented, {
									className: "Palette__Scope",
									Items: Scopes,
									Value: Scope,
									OnChange: SetScope,
									Label: "Scope"
								})
							]
						}),
						/* @__PURE__ */ jsxs(CommandList, { children: [
							/* @__PURE__ */ jsx(CommandEmpty, { children: Outside > 0 ? /* @__PURE__ */ jsx(SlipEmpty, {
								Mark: "NOT IN THIS SCOPE",
								Line: `${Pad(Outside)} ${Outside === 1 ? "ROW" : "ROWS"} MATCH OUTSIDE IT`,
								children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									className: "SlipAction",
									onClick: () => SetScope("all"),
									children: [
										/* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											children: "→"
										}),
										" ",
										"SEARCH EVERYTHING"
									]
								})
							}) : /* @__PURE__ */ jsx(SlipEmpty, {
								Mark: "NO RECORD",
								Line: "TRY A PART, A SECTION, A RECORD, OR A WORD"
							}) }),
							Routes.length > 0 ? /* @__PURE__ */ jsx(CommandGroup, {
								heading: "ROUTES",
								children: Routes.map((Entry) => /* @__PURE__ */ jsx(Row, {
									Entry,
									OnNavigate: Go
								}, Entry.Id))
							}) : null,
							Records.length > 0 ? /* @__PURE__ */ jsx(CommandGroup, {
								heading: "RECORDS",
								children: Records.map((Entry) => /* @__PURE__ */ jsx(Row, {
									Entry,
									OnNavigate: Go
								}, Entry.Id))
							}) : null,
							Terms.length > 0 ? /* @__PURE__ */ jsx(CommandGroup, {
								heading: "TERMS",
								children: Terms.map((Entry) => /* @__PURE__ */ jsx(Row, {
									Entry,
									OnNavigate: Go
								}, Entry.Id))
							}) : null,
							Doc.map((Group) => /* @__PURE__ */ jsx(CommandGroup, {
								heading: Group.Label,
								children: Group.Pages.map((Entry) => /* @__PURE__ */ jsx(Row, {
									Entry,
									OnNavigate: Go
								}, Entry.Id))
							}, Group.Id)),
							Actions.length > 0 ? /* @__PURE__ */ jsx(CommandGroup, {
								heading: "ACTIONS",
								children: Actions.map((Entry) => /* @__PURE__ */ jsx(CommandItem, {
									value: `${Entry.Id} ${Entry.Label}`,
									mark: "→",
									meta: Copied ? "COPIED" : void 0,
									onSelect: Copy,
									children: Entry.Label
								}, Entry.Id))
							}) : null
						] }),
						/* @__PURE__ */ jsx(SlipFoot, {
							Items: FootItems,
							End: /* @__PURE__ */ jsx(Chord, {
								Ink: true,
								children: Modifier
							})
						})
					]
				})
			]
		})
	})] });
};
// Source/Content/Record/Air.ts
var Air = {
	Id: "air",
	Category: "Element",
	Title: "AIR",
	Href: ElementRepos.Air.Base,
	Index: "# AIR_01",
	Stamp: ["BACKGROUND SERVICES", "DAEMON"],
	Route: ["/CHANNEL:AIR", "UPDATE SERVICE"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "CHANNEL",
			Value: "OPEN"
		},
		{
			Label: "PORT",
			Value: "SECURE"
		},
		{
			Label: "PRESSURE",
			Value: "STABLE"
		},
		{
			Label: "STATUS",
			Value: "NOMINAL"
		}
	],
	Evidence: {
		Src: "/Evidence/Air/Vapor-01.webp",
		Alt: "Vapor in low light macro",
		Position: "center"
	},
	Seal: "Air"
};
// Source/Content/Record/Cocoon.ts
var Cocoon = {
	Id: "cocoon",
	Category: "Element",
	Title: "COCOON",
	Href: ElementRepos.Cocoon.Base,
	Index: "# COCOON_01",
	Stamp: ["EXTENSION HOST", "DUAL-TRACK"],
	Route: ["/HOST:COCOON", "EFFECT-TS"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "ROLE",
			Value: "SHELL"
		},
		{
			Label: "STATE",
			Value: "RUNNING"
		},
		{
			Label: "COMPAT",
			Value: "VS CODE"
		},
		{
			Label: "TRACKS",
			Value: "A + B"
		}
	],
	Evidence: {
		Src: "/Evidence/Cocoon/FiberShell-01.webp",
		Alt: "Woven fiber in macro detail",
		Position: "center"
	},
	Seal: "Cocoon"
};
// Source/Content/Record/Common.ts
var Common = {
	Id: "common",
	Category: "Element",
	Title: "COMMON",
	Href: ElementRepos.Common.Base,
	Index: "# COMMON_01",
	Stamp: ["PURE ABSTRACT", "CONTRACT CRATE"],
	Route: ["/TRANSPORT:ANY", "GRPC / IPC / WASM / MIST"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "CONTRACT",
			Value: "PURE"
		},
		{
			Label: "TRAIT",
			Value: "ASYNC"
		},
		{
			Label: "EFFECT",
			Value: "DECLARATIVE"
		},
		{
			Label: "TRANSPORT",
			Value: "AGNOSTIC"
		}
	],
	Evidence: {
		Src: "/Evidence/Common/Lexicon-01.webp",
		Alt: "Shared vocabulary across service boundaries",
		Position: "center"
	},
	Seal: "Common"
};
// Source/Content/Record/Echo.ts
var Echo = {
	Id: "echo",
	Category: "Element",
	Title: "ECHO",
	Href: ElementRepos.Echo.Base,
	Index: "# ECHO_01",
	Stamp: ["WORK-STEALING", "SCHEDULER"],
	Route: ["/FREQUENCY:ECHO", "TASK POOL"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "FREQUENCY",
			Value: "HIGH"
		},
		{
			Label: "RESPONSE",
			Value: "FAST"
		},
		{
			Label: "NOISE",
			Value: "LOW"
		},
		{
			Label: "RETURN",
			Value: "QUICK"
		}
	],
	Evidence: {
		Src: "/Evidence/Echo/RippleGrain-01.webp",
		Alt: "Ripple in grainy water",
		Position: "center"
	},
	Seal: "Echo"
};
// Source/Content/Record/Grove.ts
var Grove = {
	Id: "grove",
	Category: "Element",
	Title: "GROVE",
	Href: ElementRepos.Grove.Base,
	Index: "# GROVE_01",
	Stamp: ["WASM SANDBOX", "CAPABILITY HOST"],
	Route: ["/NODE:GROVE", "WASM RUNTIME"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "ink"
	},
	Metadata: [
		{
			Label: "NODE",
			Value: "ACTIVE"
		},
		{
			Label: "BRANCH",
			Value: "WASM"
		},
		{
			Label: "SYNC",
			Value: "ASYNC"
		},
		{
			Label: "DENSITY",
			Value: "LOW"
		},
		{
			Label: "PHASE",
			Value: "STABILIZING"
		}
	],
	Evidence: {
		Src: "/Evidence/Grove/RootNetwork-01.webp",
		Alt: "Root network in macro detail",
		Position: "center"
	},
	Seal: "Grove"
};
// Source/Content/Record/Maintain.ts
var Maintain = {
	Id: "maintain",
	Category: "Element",
	Title: "MAINTAIN",
	Href: ElementRepos.Maintain.Base,
	Index: "# MAINTAIN_01",
	Stamp: ["DETERMINISTIC", "BUILD ORCHESTRATOR"],
	Route: ["/PROFILE:DUAL", "CARGO / JSON5 / PLIST"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "CONFIG",
			Value: "RHAI"
		},
		{
			Label: "CARGO",
			Value: "TYPE-SAFE"
		},
		{
			Label: "PROFILE",
			Value: "DUAL"
		},
		{
			Label: "OUTPUT",
			Value: "REPRODUCIBLE"
		}
	],
	Evidence: {
		Src: "/Evidence/Maintain/Blueprint-01.webp",
		Alt: "Blueprint in high contrast line work",
		Position: "center"
	},
	Seal: "Maintain"
};
// Source/Content/Record/Mist.ts
var Mist = {
	Id: "mist",
	Category: "Element",
	Title: "MIST",
	Href: ElementRepos.Mist.Base,
	Index: "# MIST_01",
	Stamp: ["LOCAL AUTHORITY", "DNS SANDBOX"],
	Route: ["/ZONE:EDITOR.LAND", "ALLOWLIST FORWARD"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "ZONE",
			Value: "LOOPBACK"
		},
		{
			Label: "SOCKET",
			Value: "SHARED-SECRET"
		},
		{
			Label: "FORWARD",
			Value: "ALLOWLIST"
		},
		{
			Label: "DNSSEC",
			Value: "PLANNED"
		}
	],
	Evidence: {
		Src: "/Evidence/Mist/Veil-01.webp",
		Alt: "Low fog bank in soft light",
		Position: "center"
	},
	Seal: "Mist"
};
// Source/Content/Record/Mountain.ts
var Mountain = {
	Id: "mountain",
	Category: "Element",
	Title: "MOUNTAIN",
	Href: ElementRepos.Mountain.Base,
	Index: "# MOUNTAIN_01",
	Stamp: ["NATIVE BACKEND", "RUST + TAURI"],
	Route: ["/HOST:MOUNTAIN", "RUST SERVICES"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "ROLE",
			Value: "FOUNDATION"
		},
		{
			Label: "BOUNDARY",
			Value: "SYSTEM"
		},
		{
			Label: "LOAD",
			Value: "HEAVY"
		},
		{
			Label: "PHASE",
			Value: "CORE"
		}
	],
	Evidence: {
		Src: "/Evidence/Mountain/StoneTrace-01.webp",
		Alt: "Stone strata in low light",
		Position: "center"
	},
	Seal: "Mountain"
};
// Source/Content/Record/Output.ts
var Output = {
	Id: "output",
	Category: "Element",
	Title: "OUTPUT",
	Href: ElementRepos.Output.Base,
	Index: "# OUTPUT_01",
	Stamp: ["ESBUILD PRIMARY", "REST SELECTABLE"],
	Route: ["/PIPELINE:PLUGIN", "NODE POLYFILLS"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "ENGINE",
			Value: "DUAL"
		},
		{
			Label: "PLUGIN",
			Value: "ROUTED"
		},
		{
			Label: "ARTIFACT",
			Value: "SHARED"
		},
		{
			Label: "BUILD",
			Value: "DETERMINISTIC"
		}
	],
	Evidence: {
		Src: "/Evidence/Output/Forge-01.webp",
		Alt: "Forged metal surface in macro",
		Position: "center"
	},
	Seal: "Output"
};
// Source/Content/Record/Rest.ts
var Rest = {
	Id: "rest",
	Category: "Element",
	Title: "REST",
	Href: ElementRepos.Rest.Base,
	Index: "# REST_01",
	Stamp: ["OXC PIPELINE", "RUST-NATIVE"],
	Route: ["/COMPILE:OXC", "PARALLEL CORES"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "ENGINE",
			Value: "OXC"
		},
		{
			Label: "HOT-PATH",
			Value: "NO-NODE"
		},
		{
			Label: "SYNTAX",
			Value: "DECORATORS+JSX"
		},
		{
			Label: "CORES",
			Value: "PARALLEL"
		}
	],
	Evidence: {
		Src: "/Evidence/Rest/Parallel-01.webp",
		Alt: "Parallel tool paths in macro",
		Position: "center"
	},
	Seal: "Rest"
};
// Source/Content/Record/SideCar.ts
var SideCar = {
	Id: "sidecar",
	Category: "Element",
	Title: "SIDECAR",
	Href: ElementRepos.SideCar.Base,
	Index: "# SIDECAR_01",
	Stamp: ["PREBUILT BINARY", "PER TARGET TRIPLE"],
	Route: ["/SOURCE:NODEJS.ORG", "CHECKSUM VERIFIED"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "SELECT",
			Value: "COMPILE-TIME"
		},
		{
			Label: "CHECKSUM",
			Value: "SHA-256"
		},
		{
			Label: "HOST",
			Value: "COCOON"
		},
		{
			Label: "CACHE",
			Value: "INCREMENTAL"
		}
	],
	Evidence: {
		Src: "/Evidence/SideCar/Track-01.webp",
		Alt: "Rail track in low light",
		Position: "center"
	},
	Seal: "SideCar"
};
// Source/Content/Record/Sky.ts
var Sky = {
	Id: "sky",
	Category: "Element",
	Title: "SKY",
	Href: ElementRepos.Sky.Base,
	Index: "# SKY_01",
	Stamp: ["ASTRO UI", "WEBVIEW BRIDGE"],
	Route: ["/SCOPE:SKY", "UI LAYER"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "SCOPE",
			Value: "GLOBAL"
		},
		{
			Label: "VISIBILITY",
			Value: "HIGH"
		},
		{
			Label: "SIGNAL",
			Value: "CLEAR"
		},
		{
			Label: "ALT",
			Value: "SURFACE"
		}
	],
	Evidence: {
		Src: "/Evidence/Sky/NightSky-01.webp",
		Alt: "Night sky with distant light",
		Position: "top"
	},
	Seal: "Sky"
};
// Source/Content/Record/Vine.ts
var Vine = {
	Id: "vine",
	Category: "Element",
	Title: "VINE",
	Href: ElementRepos.Vine.Base,
	Index: "# VINE_01",
	Stamp: ["GRPC BACKBONE", "CONTRACT-FIRST"],
	Route: ["/PROTO:VINE.PROTO", "TONIC / PROST"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "PROTO",
			Value: "CANONICAL"
		},
		{
			Label: "BIND",
			Value: "TYPE-SAFE"
		},
		{
			Label: "MIRROR",
			Value: "TYPESCRIPT"
		},
		{
			Label: "MULTIPLEX",
			Value: "EXPANDING"
		}
	],
	Evidence: {
		Src: "/Evidence/Vine/Trellis-01.webp",
		Alt: "Trellis lattice in soft focus",
		Position: "center"
	},
	Seal: "Vine"
};
// Source/Content/Record/Wind.ts
var Wind = {
	Id: "wind",
	Category: "Element",
	Title: "WIND",
	Href: ElementRepos.Wind.Base,
	Index: "# WIND_01",
	Stamp: ["WORKBENCH", "EFFECT-TS LAYERS"],
	Route: ["/FLOW:WIND", "SERVICE LAYER"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "FLOW",
			Value: "CONTROLLED"
		},
		{
			Label: "DIRECTION",
			Value: "SOUTH"
		},
		{
			Label: "LATENCY",
			Value: "LOW"
		},
		{
			Label: "RANGE",
			Value: "FULL"
		}
	],
	Evidence: {
		Src: "/Evidence/Wind/WetCable-01.webp",
		Alt: "Wet cable in long exposure",
		Position: "left"
	},
	Seal: "Wind"
};
// Source/Content/Record/Worker.ts
var Worker = {
	Id: "worker",
	Category: "Element",
	Title: "WORKER",
	Href: ElementRepos.Worker.Base,
	Index: "# WORKER_01",
	Stamp: ["SERVICE WORKER", "OFFLINE SHELL"],
	Route: ["/NAVIGATION:FIRST", "CACHE-FIRST ASSETS"],
	Status: {
		Label: "STATUS",
		Value: "ACTIVE",
		Tone: "specimen"
	},
	Metadata: [
		{
			Label: "NAVIGATION",
			Value: "NETWORK-FIRST"
		},
		{
			Label: "ASSETS",
			Value: "CACHE-FIRST"
		},
		{
			Label: "CSS",
			Value: "LINK-TAG"
		},
		{
			Label: "VERSION",
			Value: "AUTO-RELOAD"
		}
	],
	Evidence: {
		Src: "/Evidence/Worker/Loom-01.webp",
		Alt: "Threads on a loom in macro",
		Position: "center"
	},
	Seal: "Worker"
};
// Source/Content/More/Glossary.ts
/**
* Glossary - the document's own words, in three runs.
*
* ─── WHY A LEXICON AND NOT A PAGE OF DEFINITIONS ──────────────────────────
* This project names its parts after weather and landscape: Air, Mist, Vine,
* Wind, Grove, Mountain. It also uses ordinary English words - record, form,
* band, ledger, matrix - in senses that are not ordinary, because the site's
* grammar gives each one a job. A reader arriving from the manual meets fifteen
* capitalised nouns and twenty-one lower-case ones that look like English and are
* not, and this page is where either is looked up.
*
* ─── THE THREE RUNS ARE THREE KINDS OF WORD ───────────────────────────────
*   /THE ELEMENTS          the fifteen named parts, defined from the records
*   /THE DOCUMENT'S WORDS  the grammar's own nouns, defined from its rules
*   /THE RETIRED WORDS     words this site used and does not any more
*
* The third run is the one a glossary usually omits and the one a reader needs
* most: a manual that quietly stops using a word leaves every document that
* still quotes it unreadable. Each retired word states what it was, why it is
* not one of the site's words, and what replaced it - so a reader who finds
* `Coming Soon` in an old blog post can find out what it became.
*
* ─── EVERY DEFINITION HAS A SOURCE ────────────────────────────────────────
* An element's definition is its own record's description, read out of
* `Library/I18n/Locale/En/Home.json` - the same string the architecture wall
* prints, not a paraphrase. A grammar word's definition is the rule as the
* stylesheet or the block writes it, and its `WHERE:` row names the route where
* a reader can see the thing itself. Nothing here is invented; where the tree
* does not define a word, the entry prints `UNAVAILABLE` rather than a guess.
*
* The separator is U+2001, the site's only one.
*/
/** The field-record separator: U+2001, never U+00B7. */
var Quad$1 = " ";
/** The fifteen element records, in the architecture band's order. */
var Elements = [
	Air,
	Cocoon,
	Common,
	Echo,
	Grove,
	Maintain,
	Mist,
	Mountain,
	Output,
	Rest,
	SideCar,
	Sky,
	Vine,
	Wind,
	Worker
];
/** The architecture copy, as the homepage's own module reads it. */
var ElementCopy = Home_default$2.architecture;
/**
* A description as a definition.
*
* The wall's description is three lines separated by newlines, with U+2001
* between a sentence and the clause that qualifies it. A definition is the same
* copy set as one paragraph: the newlines become sentence breaks and the em quad
* becomes the space it stands for. Nothing is dropped - the entry prints the
* whole description, because a glossary that shortened the record's own words
* would be a second, worse copy of the record.
*/
var Definition = (Text) => Text.split("\n").map((Line) => Line.trim()).filter((Line) => Line.length > 0).join(" ").replace(/\u2001/g, " ");
/** The role chips, joined the way the index joins a language's tracks. */
var Expansion = (Subtitle) => Subtitle.split(" ").map((Chip) => Chip.trim()).filter((Chip) => Chip.length > 0).join(" / ");
/** The element run: fifteen words, each defined by its own record. */
var ElementTerms = Elements.map((Record) => {
	const Copy = ElementCopy[Record.Id] ?? {
		subtitle: "",
		description: ""
	};
	return {
		term: Record.Title,
		expansion: Expansion(Copy.subtitle),
		definition: Definition(Copy.description),
		record: Record.Index,
		route: {
			label: `/DOC/${Record.Id.toUpperCase()}`,
			href: `/Doc/${Record.Id}`
		},
		source: `SOURCE/CONTENT/RECORD/${Record.Id.toUpperCase()}.TS`,
		state: Record.Status.Value
	};
});
/**
* The document's own words.
*
* Each definition is the rule as the layer writes it, and the `WHERE:` row is a
* page where the word's thing is on the page rather than described - a glossary
* that only defined its terms would be a dictionary of a language nobody speaks.
*
* These are the nouns a reader meets in the first two pages and cannot look up:
* the site says "record", "form", "band" and "artifact" as if they were obvious,
* and to a reader who has just arrived they are not.
*/
var GrammarTerms = [
	{
		term: "ARTIFACT",
		expansion: "THE UNIT A PAGE IS MADE OF",
		definition: "One physical form for one kind of information: a record, a matrix, a plate, a well. A page is a sequence of artifacts, not a stack of bands - and two artifacts on one page are two objects, never one object drawn twice.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/COMPONENT/SHELL/LANGUAGE.TS"
	},
	{
		term: "BAND",
		expansion: "ONE SUBJECT, SEPARATED BY SPACE",
		definition: "A band opens a subject with a kicker, an `h2` and one sentence, and separates it from its neighbour with air rather than a border. A band that needs a rule to be a band is a box.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDBAND.ASTRO"
	},
	{
		term: "BLOCK",
		expansion: "THE SMALLEST THING THAT ANSWERS ONE KIND OF INFORMATION",
		definition: "A block is chosen by the information type first and the register second, and when two blocks could answer, the narrower one wins: a fact that fits a ledger row never gets a matrix, and a set that fits an archive never becomes a band of entries.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/STYLESHEET/SYSTEM/RECORD/_INDEX.SCSS"
	},
	{
		term: "FIGURE",
		expansion: "A NUMBER, WITH ITS SOURCE",
		definition: "A figure is a claim, so it is printed with the file it was counted in. A figure this site could not measure prints `UNAVAILABLE`; a known absence prints `0`. The difference is the whole discipline: zero is a measurement, and unavailable is the truth about not having one.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/RECORD/TYPE.TS"
	},
	{
		term: "FORM",
		expansion: "ONE INFORMATION TYPE'S SHAPE",
		definition: "Thirteen information types resolve to eleven forms, because two of them ride another form: a person is a credit row and a licence is a ledger row, never a card. The index counts the mapping rather than claiming it.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/CONTENT/INDEX/FORMS.TS"
	},
	{
		term: "GRAMMAR",
		expansion: "THE EIGHT MARKS",
		definition: "`#` series, `〈 〉` containment, `/` route, `→` progression, `↳` proposition, `:` field label, `◎` fallback, and U+2001 as the only separator. The grammar is level one: no card, no page and no later decision overrules it, and a middle dot is a defect rather than a variant.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/CONTENT/INDEX/PAGE.TS"
	},
	{
		term: "KEEPER",
		expansion: "A TREATMENT THE OWNER ENDORSED",
		definition: "A later card may add to a keeper, compose with it or extend it. It may not delete it, replace it, or reduce it to something invisible - and a card that touched one says what it did in its own report.",
		route: {
			label: "/",
			href: "/"
		},
		source: ".HERMES/TMP/STITCH/KEEPERS.MD"
	},
	{
		term: "LANGUAGE",
		expansion: "READING / WORKSPACE / AUDIT / PLATE",
		definition: "A composition contract, not a skin: reading gives a rail, a measure and a margin; workspace gives a rail, panes and a drawer; audit gives a ledger, a matrix and wells; plate gives a plate, a channel and a head. A page declares one by being filed in one register, and the frame prints the declaration.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/COMPONENT/SHELL/LANGUAGE.TS"
	},
	{
		term: "LEDGER",
		expansion: "A SET OF FACTS ABOUT ONE OBJECT",
		definition: "Rows with `:`-labelled keys, one value each, and at most one emphasised figure. A set of facts is a ledger, never a grid of equal cards - and a ledger with two emphasised rows has none.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDLEDGER.ASTRO"
	},
	{
		term: "MATRIX",
		expansion: "ONE STATE, ACROSS N COLUMNS",
		definition: "A comparison read across columns: a header row carrying one ink per column, hairline rows, and a row label that pins on a narrow screen so a five-column comparison is read one row at a time with the row's name still attached.",
		route: {
			label: "/COMPARE",
			href: "/Compare"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDMATRIX.ASTRO"
	},
	{
		term: "MEASURE",
		expansion: "THE WIDTH A PAGE READS AT",
		definition: "Seventy-two characters for a document, `none` for a workspace (a pane is as wide as the instrument in it), `matrix` for an audit, and `plate + channel` for a plate. One measure per language, so one 72ch means one width everywhere.",
		route: {
			label: "/LICENSE",
			href: "/License"
		},
		source: "SOURCE/COMPONENT/SHELL/LANGUAGE.TS"
	},
	{
		term: "PROVENANCE",
		expansion: "WHERE A CLAIM CAN BE CHECKED",
		definition: "Every figure, every well and every plate carries the file, route or command it came from. A block whose provenance is missing prints `SOURCE: UNAVAILABLE` rather than omitting the row, because a missing source is itself a fact about the claim.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/RECORD/TYPE.TS"
	},
	{
		term: "RECORD",
		expansion: "THE SITE'S UNIT OF CLAIM",
		definition: "One marker, one route, one seal, one status word and a ledger of facts. A record states what a thing is and what is true of it; it is not a card, and a record inside a record is a card inside a card.",
		route: {
			label: "/",
			href: "/"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDHERO.ASTRO"
	},
	{
		term: "REGISTER",
		expansion: "A LEDGER THAT NAMES ITSELF",
		definition: "The same facts as a ledger, with a register line above them: `# SUMMARY / 04`. A register is what a summary becomes when it sits in a page's margin and has to say what it is without a heading.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/COMPONENT/RECORD/TYPE.TS"
	},
	{
		term: "SEAL",
		expansion: "THE ELEMENT A RECORD STANDS FOR",
		definition: "One per artifact, named by the element it stands for. It is a mark, not a logo: it authenticates the record the way a stamp authenticates a page, and an artifact with two seals has none.",
		route: {
			label: "/",
			href: "/"
		},
		source: "SOURCE/COMPONENT/BRAND/FIELDRECORDSEAL"
	},
	{
		term: "SPECIMEN",
		expansion: "THE ONE GREEN",
		definition: "`#1E742A`, used rarely, and only where it authenticates: a seal, a live state, a focus ring, the active route. A page with five green things has none, which is why the tone column of the state vocabulary has exactly two specimen words.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/STYLESHEET/SYSTEM/_TOKEN.SCSS"
	},
	{
		term: "STAGE",
		expansion: "AN ORDER A READER MUST HOLD",
		definition: "Numbered steps, each one line. A step that needs a paragraph is not a step, and a process written as prose is a process the reader has to reconstruct.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDSTAGE.ASTRO"
	},
	{
		term: "STAMP",
		expansion: "WHAT MAKES A RECORD WHAT IT CLAIMS",
		definition: "A mark, the route it is issued under, the facts that bound it, and the one line saying what makes it true. A stamp without its authority line is decoration, which is why the block requires the field.",
		route: {
			label: "/CONTENTS",
			href: "/Contents"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDSTAMP.ASTRO"
	},
	{
		term: "TONE",
		expansion: "INK / SPECIMEN / QUIET",
		definition: "The ink a state word carries, looked up from the word rather than chosen by the page. A page that picks a tone has started a second vocabulary, and the second one always falls behind.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/SURFACE/STATE.TS"
	},
	{
		term: "TRACE",
		expansion: "THE PATH A CLAIM CAN BE CHECKED ALONG",
		definition: "Files, routes or commands a reader opens, in order, to see the claim for themselves. Not a build log and not a link list: a trace has a source line, and a list of links does not.",
		route: {
			label: "/STATUS",
			href: "/Status"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDTRACE.ASTRO"
	},
	{
		term: "WELL",
		expansion: "A COMMAND YOU ACT ON",
		definition: "A command, a config block or a transcript in a recessed mono body under a title bar, with the copy control and its provenance. A command printed as a paragraph is a command the reader retypes.",
		route: {
			label: "/DOWNLOAD",
			href: "/Download"
		},
		source: "SOURCE/COMPONENT/RECORD/RECORDWELL.ASTRO"
	}
];
/**
* The words this site used and does not any more.
*
* Each one is documented in the tree as a correction: a word that was printed as
* a status and was not one of the eight, or a phrase that stood where a
* measurement belongs. The run exists because a reader who finds one of these
* words in a blog post or a screenshot has no way to tell whether the site
* changed or they misread it.
*
* The state is `ARCHIVED` for every entry: the word is retired, and retirement is
* the one thing the vocabulary has a word for.
*/
var RetiredTerms = [
	{
		term: "STABILIZING",
		expansion: "WAS: AN ELEMENT STATUS",
		definition: "It was printed on the Grove record, where the other fourteen elements printed `ACTIVE`. It is not one of the eight words, so the state table could not read it and any block that asked for its tone fell back to ink - a state that renders as a fact.",
		state: "ARCHIVED",
		rows: [
			{
				key: "WAS:",
				value: "GROVE / STATUS: STABILIZING",
				code: true
			},
			{
				key: "WHY NOT:",
				value: "Not one of the eight. A ninth word has no tone."
			},
			{
				key: "NOW:",
				value: "ACTIVE",
				note: "the record's own word today"
			}
		],
		source: "SOURCE/CONTENT/RECORD/GROVE.TS"
	},
	{
		term: "vPRE-RELEASE",
		expansion: "WAS: A VERSION STRING",
		definition: "It stood in the platform card's `VERSION:` row. The record grammar uppercases a value, so it printed `VPRE-RELEASE` - a version that names no release, in a row whose job is to name one. The Download page's own register said `VERSION: UNAVAILABLE` for the same release, so the two surfaces contradicted each other about the same fact.",
		state: "ARCHIVED",
		rows: [
			{
				key: "WAS:",
				value: "VERSION: vPre-release",
				code: true
			},
			{
				key: "WHY NOT:",
				value: "A version string for a version that does not exist."
			},
			{
				key: "NOW:",
				value: "UNAVAILABLE",
				note: "nothing has been published to version"
			}
		],
		source: "SOURCE/CONTENT/HOME/PLATFORM.TS"
	},
	{
		term: "COMING SOON",
		expansion: "WAS: A SIZE",
		definition: "It stood in the `SIZE:` row, where a measurement belongs. A promise in a measurement's place is worse than an absence: it reads as a figure to a reader who is scanning and as a commitment to a reader who is deciding.",
		state: "ARCHIVED",
		rows: [
			{
				key: "WAS:",
				value: "SIZE: Coming Soon",
				code: true
			},
			{
				key: "WHY NOT:",
				value: "A marketing phrase in a measured field."
			},
			{
				key: "NOW:",
				value: "UNAVAILABLE",
				note: "no artifact, so nothing to measure"
			}
		],
		source: "SOURCE/CONTENT/HOME/PLATFORM.TS"
	},
	{
		term: "RELEASE PREPARATION",
		expansion: "WAS: A STATUS",
		definition: "Two words, no state among them, in the `STATUS:` row of every platform card. Because it was not a state, the state table could not read it, and the card's status printed in ink like an ordinary fact. `PREPARING` is the word that was always meant.",
		state: "ARCHIVED",
		rows: [
			{
				key: "WAS:",
				value: "STATUS: Release Preparation",
				code: true
			},
			{
				key: "WHY NOT:",
				value: "Two words, and neither of them is a state."
			},
			{
				key: "NOW:",
				value: "PREPARING",
				note: "quiet tone, the word for announced and not started"
			}
		],
		source: "SOURCE/CONTENT/HOME/PLATFORM.TS"
	},
	{
		term: "PLANNED",
		expansion: "WAS: A STATUS",
		definition: "It is not retired from the site, and it is retired from the status row. The portal's tiers print `STATUS: PREPARING` and then `PLAN: PLANNED` beside it: the state is the vocabulary's, and the plan is a declaration about the state. Keeping the word as a declaration is how a fact survives a vocabulary that has no room for it.",
		state: "ARCHIVED",
		rows: [
			{
				key: "WAS:",
				value: "STATUS: PLANNED",
				code: true
			},
			{
				key: "WHY NOT:",
				value: "A plan is not a state. Nothing is planned *in*; it is planned *for*."
			},
			{
				key: "NOW:",
				value: "PLAN: PLANNED",
				note: "a declaration beside STATUS: PREPARING",
				code: true
			}
		],
		source: "SOURCE/CONTENT/SURFACE/PORTAL.TS"
	}
];
/** The three runs, in reading order: the names, the grammar, then the graves. */
var Lexicon = [
	{
		key: "elements",
		label: "/THE ELEMENTS",
		note: "Fifteen named parts. Each definition is the record's own description, and each entry links to the record and to its manual.",
		empty: "No element record is filed. The architecture wall on the homepage would be empty too, which is a different site than this one.",
		terms: ElementTerms
	},
	{
		key: "words",
		label: "/THE DOCUMENT'S WORDS",
		note: "The grammar's own nouns, defined as the layer defines them. Each `WHERE:` row is a page where the thing itself is printed, not described.",
		empty: "The document uses no word it does not define. That is the state this run exists to reach, and it has never been true: the run prints the terms it carries rather than closing, so a noun the grammar layer does not define appears here as a row, not as silence.",
		terms: GrammarTerms
	},
	{
		key: "retired",
		label: "/THE RETIRED WORDS",
		note: "Words this site used and does not any more. Each one states what it was, why it is not a word here, and what replaced it - so a quotation of an old page stays readable.",
		empty: "No word has been retired. Every word this site has ever printed is still in use, which would make this run a claim rather than a record.",
		terms: RetiredTerms
	}
];
/** Every term, across every run - the figure the head prints. */
var TermCount = Lexicon.reduce((Total, Run) => Total + Run.terms.length, 0);
/**
* A term's anchor: the run, then the word, lower-cased and dashed.
*
* One function owns the string, so the entry's `id`, the rail's link and the
* palette's row cannot disagree about where a word lives. A page or a control
* that spelled the slug itself would be the second place the address exists -
* and the first thing to drift when a word gains a hyphen.
*/
var TermId = (Run, Term) => `term-${Run}-${Term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
/** The letters a run's terms begin with, in alphabetical order. */
var LettersOf = (Run) => [...new Set(Run.terms.map((Entry) => Entry.term.charAt(0).toUpperCase()))].sort();
/** Every letter used anywhere, for the head's count. */
var LetterCount = new Set(Lexicon.flatMap((Run) => Run.terms.map((Entry) => Entry.term.charAt(0).toUpperCase()))).size;
/** The rail's rows: three runs, then the five retired words. */
var RailRows = [
	{
		mark: "/",
		label: "ELEMENTS",
		meta: String(ElementTerms.length),
		href: "#run-elements"
	},
	{
		mark: "/",
		label: "DOCUMENT'S WORDS",
		meta: String(GrammarTerms.length),
		href: "#run-words"
	},
	{
		mark: "/",
		label: "RETIRED WORDS",
		meta: String(RetiredTerms.length),
		href: "#run-retired"
	},
	...RetiredTerms.map((Entry) => ({
		mark: "◎",
		label: Entry.term,
		href: `#term-retired-${Entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
	}))
];
/**
* The head's facts.
*
* A glossary has no state and no seal: it has an extent. The three rows are the
* extent, and the fourth is the one fact a reader needs before trusting it -
* where the definitions come from.
*/
var Facts = [
	{
		key: "TERMS:",
		value: String(TermCount),
		note: `in ${Lexicon.length} runs`
	},
	{
		key: "LETTERS:",
		value: String(LetterCount),
		note: "in use across the three runs"
	},
	{
		key: "RETIRED:",
		value: String(RetiredTerms.length),
		note: "words this site no longer prints"
	},
	{
		key: "SOURCE:",
		value: "THE RECORDS AND THE LAYER",
		note: "every definition cites its file"
	}
];
/** The page's bands: the two runs that are not the element list, and the limits
*  band that closes the page. */
var Bands = {
	Words: {
		kicker: "/THE DOCUMENT'S WORDS",
		interval: "break",
		heading: "The nouns this document uses as if they were obvious",
		standfirst: "Record, form, band, artifact, register: ordinary English words doing a specific job here, and a reader who has just arrived has no way to tell which sense is meant.",
		footnote: `EACH DEFINITION IS THE RULE AS THE LAYER WRITES IT${Quad$1}A TERM WITH NO RULE PRINTS UNAVAILABLE, NEVER A PARAPHRASE`,
		tone: "canvas"
	},
	Retired: {
		kicker: "/THE RETIRED WORDS",
		interval: "rest",
		heading: "Five words this site used, and what replaced them",
		standfirst: "A manual that quietly stops using a word leaves every document that still quotes it unreadable. These are the corrections, stated as corrections rather than hidden.",
		footnote: `SOURCE: THE COMMENTS IN THE MODULES THAT PRINTED THEM${Quad$1}RETIRED IS NOT A STATE: EACH WORD'S ENTRY STATES ARCHIVED`,
		tone: "paper"
	},
	Limits: {
		kicker: "/THE LIMITS",
		interval: "turn",
		heading: "What this lexicon does not cover",
		standfirst: "A reference work that only listed what it had would be a list, not a reference. These are the two gaps this page knows about: one word that has left the build, and two words the document uses that the runs do not define.",
		tone: "canvas"
	}
};
var Routes_default = {
	_Generated: {
		"By": "Source/Script/Register.ts",
		"From": [
			"Source/pages/**",
			"Source/Component/Record/**",
			"Source/Function/Route/Registry.ts"
		],
		"Transform": ["Facts"],
		"Note": "One row per route Astro builds, the forms its tree mounts, and the drift between the built routes and the registry that declares them.",
		"Rule": "Generated. Change the tree or the page, then run `node Source/Script/Register.ts` - never this file."
	},
	Routes: [
		{
			"Path": "/",
			"File": "pages/index.astro",
			"Title": "Code Editor Land | Rust and Tauri Editor Stack",
			"Forms": [
				"RecordStage",
				"RecordLedger",
				"RecordTrace",
				"RecordFailure"
			],
			"Lines": 273,
			"NoIndex": false
		},
		{
			"Path": "/404",
			"File": "pages/404.astro",
			"Title": "404: No Record At This Address",
			"Forms": [
				"RecordHero",
				"RecordLedger",
				"RecordFigure"
			],
			"Lines": 225,
			"NoIndex": true
		},
		{
			"Path": "/Account",
			"File": "pages/Account/index.astro",
			"Title": "Account | Code Editor Land",
			"Forms": ["RecordAside", "RecordLedger"],
			"Lines": 187,
			"NoIndex": false
		},
		{
			"Path": "/Account/ForgotPassword",
			"File": "pages/Account/ForgotPassword.astro",
			"Title": "Forgot Password - Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 43,
			"NoIndex": false
		},
		{
			"Path": "/Account/ResetPassword",
			"File": "pages/Account/ResetPassword.astro",
			"Title": "Reset Password - Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 43,
			"NoIndex": false
		},
		{
			"Path": "/Account/SignIn",
			"File": "pages/Account/SignIn.astro",
			"Title": "Sign In - Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 54,
			"NoIndex": false
		},
		{
			"Path": "/Account/SignUp",
			"File": "pages/Account/SignUp.astro",
			"Title": "Registration Is Not Open | Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 52,
			"NoIndex": false
		},
		{
			"Path": "/Blog",
			"File": "pages/Blog.astro",
			"Title": "Blog | Code Editor Land",
			"Forms": ["RecordLedger", "RecordFigure"],
			"Lines": 134,
			"NoIndex": false
		},
		{
			"Path": "/Blog/:Slug",
			"File": "pages/Blog/[Slug].astro",
			"Title": "/Blog/:Slug",
			"Forms": [
				"RecordAside",
				"RecordLedger",
				"RecordMargin",
				"RecordInset"
			],
			"Lines": 150,
			"NoIndex": false
		},
		{
			"Path": "/Compare",
			"File": "pages/Compare.astro",
			"Title": "Compare | Code Editor Land",
			"Forms": [
				"RecordHero",
				"RecordBand",
				"RecordMatrix",
				"RecordCompare",
				"RecordLedger",
				"RecordTrace",
				"RecordWell"
			],
			"Lines": 275,
			"NoIndex": false
		},
		{
			"Path": "/Contact",
			"File": "pages/Contact/index.astro",
			"Title": "Contact | Code Editor Land",
			"Forms": ["RecordStage", "RecordLedger"],
			"Lines": 192,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Amend",
			"File": "pages/Contact/Amend.astro",
			"Title": "/Contact/Amend",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Claim",
			"File": "pages/Contact/Claim.astro",
			"Title": "/Contact/Claim",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Deals",
			"File": "pages/Contact/Deals.astro",
			"Title": "/Contact/Deals",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Erase",
			"File": "pages/Contact/Erase.astro",
			"Title": "/Contact/Erase",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Guard",
			"File": "pages/Contact/Guard.astro",
			"Title": "/Contact/Guard",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Hails",
			"File": "pages/Contact/Hails.astro",
			"Title": "/Contact/Hails",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Leave",
			"File": "pages/Contact/Leave.astro",
			"Title": "/Contact/Leave",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Legal",
			"File": "pages/Contact/Legal.astro",
			"Title": "/Contact/Legal",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Lodge",
			"File": "pages/Contact/Lodge.astro",
			"Title": "/Contact/Lodge",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Pause",
			"File": "pages/Contact/Pause.astro",
			"Title": "/Contact/Pause",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Query",
			"File": "pages/Contact/Query.astro",
			"Title": "/Contact/Query",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Reach",
			"File": "pages/Contact/Reach.astro",
			"Title": "/Contact/Reach",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Sale",
			"File": "pages/Contact/Sale.astro",
			"Title": "Enterprise Inquiries | Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 357,
			"NoIndex": false
		},
		{
			"Path": "/Contact/Scout",
			"File": "pages/Contact/Scout.astro",
			"Title": "/Contact/Scout",
			"Forms": [
				"RecordAside",
				"RecordStage",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 6,
			"NoIndex": false
		},
		{
			"Path": "/Contents",
			"File": "pages/Contents.astro",
			"Title": "Contents | Code Editor Land",
			"Forms": [
				"RecordHero",
				"RecordBand",
				"RecordArchive",
				"RecordMatrix",
				"RecordStage",
				"RecordInstrument",
				"RecordPlateSet",
				"RecordLedger",
				"RecordStamp"
			],
			"Lines": 574,
			"NoIndex": false
		},
		{
			"Path": "/Contributing",
			"File": "pages/Contributing.astro",
			"Title": "Contributing | Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 673,
			"NoIndex": false
		},
		{
			"Path": "/Dashboard",
			"File": "pages/Dashboard.astro",
			"Title": "Dashboard | Code Editor Land",
			"Forms": ["RecordMatrix", "RecordLedger"],
			"Lines": 627,
			"NoIndex": false
		},
		{
			"Path": "/Doc",
			"File": "pages/Doc.astro",
			"Title": "Documentation | Code Editor Land",
			"Forms": [
				"RecordBand",
				"RecordArchive",
				"RecordEntry",
				"RecordLedger",
				"RecordPlate"
			],
			"Lines": 195,
			"NoIndex": false
		},
		{
			"Path": "/Doc/:Slug",
			"File": "pages/Doc/[...Slug].astro",
			"Title": "/Doc/:Slug",
			"Forms": [
				"RecordLedger",
				"RecordMargin",
				"RecordPlate",
				"RecordInset",
				"RecordTranscript"
			],
			"Lines": 359,
			"NoIndex": false
		},
		{
			"Path": "/Doc/Rust",
			"File": "pages/Doc/Rust.astro",
			"Title": "Rust API Documentation | Code Editor Land",
			"Forms": ["RecordLedger", "RecordPlate"],
			"Lines": 255,
			"NoIndex": false
		},
		{
			"Path": "/Download",
			"File": "pages/Download.astro",
			"Title": "Download Code Editor Land | Source Builds and Public Release Prep",
			"Forms": [
				"RecordPair",
				"RecordAside",
				"RecordMatrix",
				"RecordCompare",
				"RecordInstrument",
				"RecordPlateSet",
				"RecordLedger",
				"RecordWell",
				"RecordPlate",
				"RecordStamp",
				"RecordTranscript"
			],
			"Lines": 238,
			"NoIndex": false
		},
		{
			"Path": "/Glossary",
			"File": "pages/Glossary.astro",
			"Title": "Glossary | Code Editor Land",
			"Forms": [
				"RecordBand",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 231,
			"NoIndex": false
		},
		{
			"Path": "/Legal/Privacy",
			"File": "pages/Legal/Privacy.astro",
			"Title": "Privacy Policy | Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 916,
			"NoIndex": false
		},
		{
			"Path": "/Legal/Term",
			"File": "pages/Legal/Term.astro",
			"Title": "Terms of Service | Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 993,
			"NoIndex": false
		},
		{
			"Path": "/License",
			"File": "pages/License.astro",
			"Title": "License | Code Editor Land",
			"Forms": ["RecordLedger", "RecordWell"],
			"Lines": 459,
			"NoIndex": false
		},
		{
			"Path": "/Motion",
			"File": "pages/Motion.astro",
			"Title": "Motion | Code Editor Land",
			"Forms": [
				"RecordBand",
				"RecordMatrix",
				"RecordLedger",
				"RecordMargin"
			],
			"Lines": 476,
			"NoIndex": false
		},
		{
			"Path": "/OAuth/Success",
			"File": "pages/OAuth/Success.astro",
			"Title": "Authentication Successful - Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 348,
			"NoIndex": true
		},
		{
			"Path": "/Portal",
			"File": "pages/Portal.astro",
			"Title": "Editor Portal | Code Editor Land",
			"Forms": ["RecordLedger"],
			"Lines": 356,
			"NoIndex": false
		},
		{
			"Path": "/Specimen",
			"File": "pages/Specimen.astro",
			"Title": "Specimen | Code Editor Land",
			"Forms": [
				"RecordBand",
				"RecordEntry",
				"RecordLedger"
			],
			"Lines": 522,
			"NoIndex": false
		},
		{
			"Path": "/Status",
			"File": "pages/Status.astro",
			"Title": "Status | Code Editor Land",
			"Forms": [
				"RecordBand",
				"RecordCompare",
				"RecordStage",
				"RecordInstrument",
				"RecordLedger",
				"RecordTrace",
				"RecordWell"
			],
			"Lines": 283,
			"NoIndex": false
		},
		{
			"Path": "/Verify",
			"File": "pages/Verify.astro",
			"Title": "Verify Email - Code Editor Land",
			"Forms": [
				"RecordMatrix",
				"RecordLedger",
				"RecordWell"
			],
			"Lines": 228,
			"NoIndex": true
		},
		{
			"Path": "/Visit",
			"File": "pages/Visit.astro",
			"Title": "/Visit",
			"Forms": [],
			"Lines": 285,
			"NoIndex": false
		}
	],
	Registry: {
		"Declared": [
			"/",
			"/404",
			"/Download",
			"/Doc",
			"/Doc/[...Slug]",
			"/Doc/Rust",
			"/Blog",
			"/Blog/[Slug]",
			"/Portal",
			"/Dashboard",
			"/Verify",
			"/License",
			"/Contributing",
			"/Legal/Term",
			"/Legal/Privacy",
			"/Contact",
			"/Contact/Sale",
			"/Contact/Amend",
			"/Contact/Claim",
			"/Contact/Deals",
			"/Contact/Erase",
			"/Contact/Guard",
			"/Contact/Hails",
			"/Contact/Leave",
			"/Contact/Legal",
			"/Contact/Lodge",
			"/Contact/Pause",
			"/Contact/Query",
			"/Contact/Reach",
			"/Contact/Scout",
			"/Account",
			"/Account/SignIn",
			"/Account/SignUp",
			"/Account/ForgotPassword",
			"/Account/ResetPassword",
			"/OAuth/Success",
			"/Visit",
			"/Specimen",
			"/Motion",
			"/Compare",
			"/Contents",
			"/Glossary",
			"/Status"
		],
		"Count": 43,
		"Canonical": 24,
		"Collections": 2,
		"Missing": [],
		"Extra": []
	}
};
var Forms_default = {
	_Generated: {
		"By": "Source/Script/Register.ts",
		"From": ["Source/pages/**", "Source/Component/Record/**"],
		"Transform": ["Facts"],
		"Note": "The artifact set, measured: for each of the fourteen blocks, the routes whose import tree mounts it.",
		"Rule": "Generated. Change the tree or the page, then run `node Source/Script/Register.ts` - never this file."
	},
	Forms: [
		{
			"Block": "RecordHero",
			"Routes": [
				"/404",
				"/Compare",
				"/Contents"
			],
			"Count": 3
		},
		{
			"Block": "RecordBand",
			"Routes": [
				"/Compare",
				"/Contents",
				"/Doc",
				"/Glossary",
				"/Motion",
				"/Specimen",
				"/Status"
			],
			"Count": 7
		},
		{
			"Block": "RecordPair",
			"Routes": ["/Download"],
			"Count": 1
		},
		{
			"Block": "RecordAside",
			"Routes": [
				"/Account",
				"/Blog/:Slug",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Scout",
				"/Download"
			],
			"Count": 16
		},
		{
			"Block": "RecordArchive",
			"Routes": ["/Contents", "/Doc"],
			"Count": 2
		},
		{
			"Block": "RecordMatrix",
			"Routes": [
				"/Compare",
				"/Contents",
				"/Dashboard",
				"/Download",
				"/Motion",
				"/Verify"
			],
			"Count": 6
		},
		{
			"Block": "RecordCompare",
			"Routes": [
				"/Compare",
				"/Download",
				"/Status"
			],
			"Count": 3
		},
		{
			"Block": "RecordStage",
			"Routes": [
				"/",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Scout",
				"/Contents",
				"/Status"
			],
			"Count": 17
		},
		{
			"Block": "RecordInstrument",
			"Routes": [
				"/Contents",
				"/Download",
				"/Status"
			],
			"Count": 3
		},
		{
			"Block": "RecordPlateSet",
			"Routes": ["/Contents", "/Download"],
			"Count": 2
		},
		{
			"Block": "RecordEntry",
			"Routes": ["/Doc", "/Specimen"],
			"Count": 2
		},
		{
			"Block": "RecordLedger",
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			],
			"Count": 42
		},
		{
			"Block": "RecordTrace",
			"Routes": [
				"/",
				"/Compare",
				"/Status"
			],
			"Count": 3
		},
		{
			"Block": "RecordFailure",
			"Routes": ["/"],
			"Count": 1
		},
		{
			"Block": "RecordWell",
			"Routes": [
				"/Compare",
				"/Download",
				"/License",
				"/Status",
				"/Verify"
			],
			"Count": 5
		},
		{
			"Block": "RecordFigure",
			"Routes": ["/404", "/Blog"],
			"Count": 2
		},
		{
			"Block": "RecordMargin",
			"Routes": [
				"/Blog/:Slug",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Scout",
				"/Doc/:Slug",
				"/Glossary",
				"/Motion"
			],
			"Count": 17
		},
		{
			"Block": "RecordPlate",
			"Routes": [
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download"
			],
			"Count": 4
		},
		{
			"Block": "RecordStamp",
			"Routes": ["/Contents", "/Download"],
			"Count": 2
		},
		{
			"Block": "RecordInset",
			"Routes": ["/Blog/:Slug", "/Doc/:Slug"],
			"Count": 2
		},
		{
			"Block": "RecordTranscript",
			"Routes": ["/Doc/:Slug", "/Download"],
			"Count": 2
		}
	]
};
var Modules_default = {
	_Generated: {
		"By": "Source/Script/Register.ts",
		"From": ["Source/**"],
		"Transform": ["Facts"],
		"Note": "One row per module outside the bulk trees: what it carries, how many files read it, and whether the build reaches it.",
		"Rule": "Generated. Change the tree or the page, then run `node Source/Script/Register.ts` - never this file."
	},
	Modules: [
		{
			"Path": "Background.astro",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 187,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Background.tsx",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 92,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Component/Auth/AuthShell.astro",
			"Kind": "component",
			"Carries": "AuthShell - the one frame every account, OAuth and verify route renders.",
			"Lines": 207,
			"Readers": 5,
			"ReadBy": [
				"pages/Account/ForgotPassword.astro",
				"pages/Account/ResetPassword.astro",
				"pages/Account/SignIn.astro",
				"pages/Account/SignUp.astro",
				"pages/OAuth/Success.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Auth/Content.ts",
			"Kind": "component",
			"Carries": "The account and verify content tables, as data.",
			"Lines": 210,
			"Readers": 3,
			"ReadBy": [
				"pages/Account/ForgotPassword.astro",
				"pages/Account/ResetPassword.astro",
				"pages/Verify.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Auth/Data.ts",
			"Kind": "component",
			"Carries": "The eight frames, as data.",
			"Lines": 173,
			"Readers": 7,
			"ReadBy": [
				"pages/Account/ForgotPassword.astro",
				"pages/Account/ResetPassword.astro",
				"pages/Account/SignIn.astro",
				"pages/Account/SignUp.astro",
				"pages/Account/index.astro",
				"pages/OAuth/Success.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Auth/Report.tsx",
			"Kind": "component",
			"Carries": "AuthReport - one state inside the auth card.",
			"Lines": 159,
			"Readers": 3,
			"ReadBy": [
				"Component/Dynamic/DynamicEmailVerification.tsx",
				"Component/Dynamic/DynamicResetPassword.tsx",
				"Component/Dynamic/VerifyPage.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Auth/Type.ts",
			"Kind": "component",
			"Carries": "The auth surface contract.",
			"Lines": 79,
			"Readers": 3,
			"ReadBy": [
				"Component/Auth/AuthShell.astro",
				"Component/Auth/Content.ts",
				"Component/Auth/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Blog/BlogArticle.astro",
			"Kind": "component",
			"Carries": "BlogArticle - the reading surface an article is read on.",
			"Lines": 283,
			"Readers": 1,
			"ReadBy": ["pages/Blog/[Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Component/Blog/BlogIndex.astro",
			"Kind": "component",
			"Carries": "BlogIndex - the blog's archive page: a centred header, a full-bleed plate of the archive's extent, and the articles in a three-column grid.",
			"Lines": 246,
			"Readers": 1,
			"ReadBy": ["pages/Blog.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Blog/Data.ts",
			"Kind": "component",
			"Carries": "Blog - the derivations the blog surface needs, in one module.",
			"Lines": 336,
			"Readers": 2,
			"ReadBy": ["pages/Blog.astro", "pages/Blog/[Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Component/Blog/Type.ts",
			"Kind": "component",
			"Carries": "Blog - the shapes the blog surface renders.",
			"Lines": 85,
			"Readers": 3,
			"ReadBy": [
				"Component/Blog/BlogArticle.astro",
				"Component/Blog/BlogIndex.astro",
				"Component/Blog/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/CornerMarks.astro",
			"Kind": "component",
			"Carries": "CornerMarks - picture-frame corner crosshairs for white card surfaces (C19).",
			"Lines": 81,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecordDataCard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Brand/CornerMarks/Data.ts",
			"Kind": "component",
			"Carries": "Data - the corner-mark geometry, as values rather than as markup.",
			"Lines": 205,
			"Readers": 2,
			"ReadBy": ["Component/Brand/CornerMarks.astro", "Component/Dynamic/DynamicHeroSection.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecord.astro",
			"Kind": "component",
			"Carries": "FieldRecord - canonical record-card template.",
			"Lines": 138,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Brand/FieldRecord/Type.ts",
			"Kind": "component",
			"Carries": "Type - the published shape of the record-card template.",
			"Lines": 27,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecord.astro"],
			"Reached": false
		},
		{
			"Path": "Component/Brand/FieldRecordAction.astro",
			"Kind": "component",
			"Carries": "FieldRecordAction - the one action a record card offers, in the two arms a field record uses: a mono route line (`/LABEL`) or a squish jelly button.",
			"Lines": 55,
			"Readers": 4,
			"ReadBy": [
				"Component/Brand/FieldRecord.astro",
				"Component/Dynamic/Download/Install.astro",
				"Component/Record/RecordHero.astro",
				"pages/Portal.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordAction/Data.ts",
			"Kind": "component",
			"Carries": "Data - the record action's two arms and the ink the button arm hands the jelly element.",
			"Lines": 59,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecordAction.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordDataCard.astro",
			"Kind": "component",
			"Carries": "FieldRecordDataCard - the frame every field record is printed in: a white card, picture-frame corner marks at the card level, and one padded body.",
			"Lines": 44,
			"Readers": 3,
			"ReadBy": [
				"Component/Brand/FieldRecord.astro",
				"Component/Record/RecordHero.astro",
				"pages/Portal.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordDataCard/Type.ts",
			"Kind": "component",
			"Carries": "Type - the published shape of a record data card.",
			"Lines": 18,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecordDataCard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordEvidence.tsx",
			"Kind": "component",
			"Carries": "Exports FieldRecordEvidenceProps.",
			"Lines": 44,
			"Readers": 7,
			"ReadBy": [
				"Component/Dynamic/DynamicHeroSection.tsx",
				"Component/Record/RecordFigure.astro",
				"Component/Record/RecordHero.astro",
				"Component/Record/RecordInset.astro",
				"Component/Record/RecordPlate.astro",
				"Component/Record/RecordPlateSet.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordIndex.astro",
			"Kind": "component",
			"Carries": "FieldRecordIndex - the record's own marker, printed as `# MARKER` at field weight: mono, uppercase, wide-tracked, in the card's foreground ink.",
			"Lines": 31,
			"Readers": 4,
			"ReadBy": [
				"Component/Brand/FieldRecord.astro",
				"Component/Dynamic/Download/Record.astro",
				"Component/Record/RecordArchive.astro",
				"Component/Record/RecordHero.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordIndex/Type.ts",
			"Kind": "component",
			"Carries": "Type - the published shape of a record index.",
			"Lines": 19,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecordIndex.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordMetadata.astro",
			"Kind": "component",
			"Carries": "FieldRecordMetadata - the key/value run under a record's title block: `TARGET: Linux`, `LICENSE: CC0`, `SIGNAL: ABSENT`.",
			"Lines": 42,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecord.astro"],
			"Reached": false
		},
		{
			"Path": "Component/Brand/FieldRecordMetadata/Type.ts",
			"Kind": "component",
			"Carries": "Type - the published shape of a record metadata list.",
			"Lines": 35,
			"Readers": 1,
			"ReadBy": ["Component/Brand/FieldRecordMetadata.astro"],
			"Reached": false
		},
		{
			"Path": "Component/Brand/FieldRecordSeal.tsx",
			"Kind": "component",
			"Carries": "Exports FieldRecordElement, FieldRecordSealProps, SealSize.",
			"Lines": 417,
			"Readers": 10,
			"ReadBy": [
				"Component/Brand/FieldRecord.astro",
				"Component/Brand/SpecimenLabel.tsx",
				"Component/Dynamic/Download/Record.astro",
				"Component/Dynamic/DynamicHeroSection.tsx",
				"Component/Home/ElementCard.astro",
				"Component/Home/FeatureCard.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecordStatus.tsx",
			"Kind": "component",
			"Carries": "Exports FieldRecordStatusState, FieldRecordStatusTone, FieldRecordStatusProps.",
			"Lines": 94,
			"Readers": 8,
			"ReadBy": [
				"Component/Blog/BlogIndex.astro",
				"Component/Brand/FieldRecord.astro",
				"Component/Dynamic/Download/Install.astro",
				"Component/Dynamic/Download/Record.astro",
				"Component/Dynamic/DynamicHeroSection.tsx",
				"Component/Record/RecordHero.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/SemanticLedger.tsx",
			"Kind": "component",
			"Carries": "Exports StampTextProps, StampText, RouteTextProps, RouteText.",
			"Lines": 179,
			"Readers": 6,
			"ReadBy": [
				"Component/Brand/FieldRecord.astro",
				"Component/Brand/SpecimenLabel.tsx",
				"Component/Dynamic/Download/Install.astro",
				"Component/Dynamic/Download/Record.astro",
				"Component/Dynamic/DynamicHeroSection.tsx",
				"Component/Record/RecordHero.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Brand/SpecimenLabel.tsx",
			"Kind": "component",
			"Carries": "Exports SpecimenLabelProps.",
			"Lines": 183,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Contact/ContactBreadcrumb.astro",
			"Kind": "component",
			"Carries": "ContactBreadcrumb - the absorbed trail, kept as the bridge the Blog still uses.",
			"Lines": 48,
			"Readers": 2,
			"ReadBy": ["Component/Blog/BlogArticle.astro", "Component/Blog/BlogIndex.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Contact/ContactPage.astro",
			"Kind": "component",
			"Carries": "ContactPage - the page chrome every Contact route shares.",
			"Lines": 156,
			"Readers": 3,
			"ReadBy": [
				"Component/Contact/ContactShell.astro",
				"pages/Contact/Sale.astro",
				"pages/Contact/index.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Contact/ContactShell.astro",
			"Kind": "component",
			"Carries": "ContactShell - one request route, in one file, composed as a record beside its form.",
			"Lines": 185,
			"Readers": 13,
			"ReadBy": [
				"pages/Contact/Amend.astro",
				"pages/Contact/Claim.astro",
				"pages/Contact/Deals.astro",
				"pages/Contact/Erase.astro",
				"pages/Contact/Guard.astro",
				"pages/Contact/Hails.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Contact/Register.ts",
			"Kind": "component",
			"Carries": "Register - the hub's index as records, with the two facts a reader chooses by.",
			"Lines": 118,
			"Readers": 2,
			"ReadBy": ["Component/Contact/ContactShell.astro", "pages/Contact/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Contact/Type.ts",
			"Kind": "component",
			"Carries": "Type - the Contact surface's own shapes.",
			"Lines": 43,
			"Readers": 1,
			"ReadBy": ["Component/Contact/ContactPage.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dashboard/Data.ts",
			"Kind": "component",
			"Carries": "Data - the dashboard's privacy and data-rights directory, as data.",
			"Lines": 147,
			"Readers": 1,
			"ReadBy": ["Component/Dashboard/PrivacyRequests.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dashboard/PrivacyRequests.astro",
			"Kind": "component",
			"Carries": "PrivacyRequests - the dashboard's data-rights directory: the six statutory rights, the four support channels, and the one entry that ends the account.",
			"Lines": 129,
			"Readers": 1,
			"ReadBy": ["pages/Dashboard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dashboard/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the dashboard's privacy directory renders.",
			"Lines": 86,
			"Readers": 1,
			"ReadBy": ["Component/Dashboard/Data.ts"],
			"Reached": true
		},
		{
			"Path": "Component/Detail/BandFoot.astro",
			"Kind": "component",
			"Carries": "BandFoot - the band's colophon: one rule, the references, the folio.",
			"Lines": 96,
			"Readers": 7,
			"ReadBy": [
				"pages/Contents.astro",
				"pages/Contributing.astro",
				"pages/Download.astro",
				"pages/Glossary.astro",
				"pages/Legal/Privacy.astro",
				"pages/Legal/Term.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Detail/Folio.astro",
			"Kind": "component",
			"Carries": "Folio - where in the document the reader has got to, and what is here.",
			"Lines": 118,
			"Readers": 3,
			"ReadBy": [
				"Component/Detail/BandFoot.astro",
				"Component/Layout/Edge/EdgeTurn.astro",
				"Component/Layout/Footer.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Detail/Leader.astro",
			"Kind": "component",
			"Carries": "Leader - the printed index entry: name, leader, figure, hanging note.",
			"Lines": 212,
			"Readers": 1,
			"ReadBy": ["pages/Contents.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Detail/See.astro",
			"Kind": "component",
			"Carries": "See - the cross-reference: `↳ SEE`, then a route and why it is worth following.",
			"Lines": 76,
			"Readers": 1,
			"ReadBy": ["Component/Detail/BandFoot.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Detail/Type.ts",
			"Kind": "component",
			"Carries": "The Detail layer's data shapes.",
			"Lines": 65,
			"Readers": 4,
			"ReadBy": [
				"Component/Detail/BandFoot.astro",
				"Component/Detail/Folio.astro",
				"Component/Detail/Leader.astro",
				"Component/Detail/See.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Doc/Contents.ts",
			"Kind": "component",
			"Carries": "Contents - the page's own contents list, marked as the reader scrolls.",
			"Lines": 161,
			"Readers": 1,
			"ReadBy": ["Component/Doc/DocContents.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocAppendix.astro",
			"Kind": "component",
			"Carries": "DocAppendix - one of the three artifacts that close the documentation index.",
			"Lines": 125,
			"Readers": 1,
			"ReadBy": ["pages/Doc.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocArticle.astro",
			"Kind": "component",
			"Carries": "DocArticle - the reading shell every documentation surface shares: the page-level breadcrumb, then kicker, the page's only `h1`, standfirst, the metadata strip, then the body.",
			"Lines": 245,
			"Readers": 3,
			"ReadBy": [
				"pages/Doc.astro",
				"pages/Doc/Rust.astro",
				"pages/Doc/[...Slug].astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocCard.astro",
			"Kind": "component",
			"Carries": "DocCard - one card of the documentation index: a title, the page's `description` under it, and the whole card as the way in.",
			"Lines": 54,
			"Readers": 1,
			"ReadBy": ["pages/Doc.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocContents.astro",
			"Kind": "component",
			"Carries": "DocContents - the page's own contents: the sections of this document, or the sections of this index, as a list of in-page anchors that marks where the reader is.",
			"Lines": 94,
			"Readers": 2,
			"ReadBy": ["Component/Doc/DocArticle.astro", "Component/Doc/DocLayout.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocContentsList.astro",
			"Kind": "component",
			"Carries": "DocContentsList - the rows of the page's own contents: one anchor per section, its position in the page as the marker column, its heading as the name.",
			"Lines": 45,
			"Readers": 1,
			"ReadBy": ["Component/Doc/DocContents.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocIndex.astro",
			"Kind": "component",
			"Carries": "DocIndex - one chapter of the documentation index: a `RecordBand` at `tone=\"bare\"` wrapping the chapter's card grid, and one `RecordEntry` per card inside the `jelly-card` that...",
			"Lines": 113,
			"Readers": 1,
			"ReadBy": ["pages/Doc.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocLayer.astro",
			"Kind": "component",
			"Carries": "DocLayer - the layer this page belongs to, as a map: every page in the same section, in the order the collection puts them, with the current page marked.",
			"Lines": 95,
			"Readers": 1,
			"ReadBy": ["pages/Doc/[...Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/DocLayout.astro",
			"Kind": "component",
			"Carries": "DocLayout - the documentation column: a sticky navigation rail beside the content column, and the same navigation collapsed into a panel above it on narrow viewports.",
			"Lines": 156,
			"Readers": 2,
			"ReadBy": ["pages/Doc.astro", "pages/Doc/[...Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/Rust/Data.ts",
			"Kind": "component",
			"Carries": "Data - the Rust API surface's crate list.",
			"Lines": 113,
			"Readers": 1,
			"ReadBy": ["pages/Doc/Rust.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/Rust/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the Rust API surface renders.",
			"Lines": 26,
			"Readers": 2,
			"ReadBy": ["Component/Doc/Rust/Data.ts", "Component/Doc/RustViewer.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/RustViewer.astro",
			"Kind": "component",
			"Carries": "RustViewer - the rustdoc frame and the crate switcher above it.",
			"Lines": 115,
			"Readers": 1,
			"ReadBy": ["pages/Doc/Rust.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Doc/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the documentation surfaces render.",
			"Lines": 187,
			"Readers": 10,
			"ReadBy": [
				"Component/Doc/DocAppendix.astro",
				"Component/Doc/DocArticle.astro",
				"Component/Doc/DocCard.astro",
				"Component/Doc/DocContents.astro",
				"Component/Doc/DocContentsList.astro",
				"Component/Doc/DocIndex.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Doc/Well.ts",
			"Kind": "component",
			"Carries": "Well - turn the document's fenced blocks into the site's own wells.",
			"Lines": 456,
			"Readers": 1,
			"ReadBy": ["Component/Doc/DocArticle.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/AccountPage.tsx",
			"Kind": "component",
			"Carries": "AccountPage - orchestrates sign-in, sign-up, forgot-password, and reset-password views as a single-page flow.",
			"Lines": 352,
			"Readers": 2,
			"ReadBy": ["pages/Account/ForgotPassword.astro", "pages/Account/ResetPassword.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Architecture/Data.ts",
			"Kind": "component",
			"Carries": "Data - every label, family and derivation the architecture record prints.",
			"Lines": 366,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/Roadmap/Data.ts"],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Architecture/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the architecture record renders.",
			"Lines": 57,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/Architecture/Data.ts"],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Auth0Account.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 50,
			"Readers": 2,
			"ReadBy": ["pages/Account/SignIn.astro", "pages/Account/SignUp.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Auth0AccountGate.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 338,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/Auth0Account.tsx", "Test/Component/Auth0AccountGate.test.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Auth0CallbackHandler.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 127,
			"Readers": 1,
			"ReadBy": ["pages/OAuth/Success.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Data.ts",
			"Kind": "component",
			"Carries": "Data - every row, label and ordering the Download page renders.",
			"Lines": 1316,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Install.astro",
			"Kind": "component",
			"Carries": "Install - the only install path that exists today: the source build.",
			"Lines": 111,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/PlatformMatrix.astro",
			"Kind": "component",
			"Carries": "PlatformMatrix - the record's platform ledger: three targets under the architecture and the four artifact fields a public release fills in.",
			"Lines": 89,
			"Readers": 2,
			"ReadBy": ["Test/Component/RecordGrammar.test.ts", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/PreviousReleases.astro",
			"Kind": "component",
			"Carries": "PreviousReleases - the releases that came before this one, as a disclosure.",
			"Lines": 76,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Record.astro",
			"Kind": "component",
			"Carries": "Record - the Download page's one artifact: `# RELEASE_01`.",
			"Lines": 111,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Region.astro",
			"Kind": "component",
			"Carries": "Region - one region of the Download page's `# RELEASE_01` artifact.",
			"Lines": 56,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Requirements.astro",
			"Kind": "component",
			"Carries": "Requirements - what a build needs, and what the source build needs first.",
			"Lines": 132,
			"Readers": 2,
			"ReadBy": ["Test/Component/RecordGrammar.test.ts", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the Download page hands to its record.",
			"Lines": 278,
			"Readers": 8,
			"ReadBy": [
				"Component/Dynamic/Download/Data.ts",
				"Component/Dynamic/Download/Install.astro",
				"Component/Dynamic/Download/PlatformMatrix.astro",
				"Component/Dynamic/Download/PreviousReleases.astro",
				"Component/Dynamic/Download/Record.astro",
				"Component/Dynamic/Download/Region.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Download/Verify.astro",
			"Kind": "component",
			"Carries": "Verify - the checksum and signature record.",
			"Lines": 48,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DownloadMasthead.astro",
			"Kind": "component",
			"Carries": "DownloadMasthead - the page's one level-one heading, the sentence that answers \"can I install this today\", and the eight marks the page has always carried.",
			"Lines": 79,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicAccountProfile.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 1099,
			"Readers": 1,
			"ReadBy": ["pages/Account/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicAuthHeader.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 44,
			"Readers": 2,
			"ReadBy": ["pages/Account/index.astro", "pages/Dashboard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicAuthStatus.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 162,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/DynamicAuthHeader.tsx", "Test/Component/DynamicAuthStatus.test.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicBadge.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 79,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicBlogCard.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 34,
			"Readers": 2,
			"ReadBy": ["Test/Component/DynamicBlogCard.test.tsx", "pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicButton.tsx",
			"Kind": "component",
			"Carries": "Exports DynamicButtonProps.",
			"Lines": 175,
			"Readers": 10,
			"ReadBy": [
				"Component/Dynamic/Auth0AccountGate.tsx",
				"Component/Dynamic/DynamicEmailVerification.tsx",
				"Component/Dynamic/DynamicForgotPassword.tsx",
				"Component/Dynamic/DynamicResetPassword.tsx",
				"Component/Dynamic/DynamicSignIn.tsx",
				"Component/Dynamic/DynamicSignUp.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicCard.tsx",
			"Kind": "component",
			"Carries": "Exports SimpleCard.",
			"Lines": 121,
			"Readers": 2,
			"ReadBy": ["Test/Component/DynamicCard.test.tsx", "pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicCheckbox.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 103,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/DynamicSignUp.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicContactForm.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 862,
			"Readers": 1,
			"ReadBy": ["Component/Contact/ContactShell.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicDashboardUser.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 657,
			"Readers": 1,
			"ReadBy": ["pages/Dashboard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicDocSidebar.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 631,
			"Readers": 2,
			"ReadBy": ["Component/Doc/DocLayout.astro", "Test/Component/DocSidebarFilter.test.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicEmailVerification.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 297,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/VerifyPage.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicFooter.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 191,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/DynamicForgotPassword.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 167,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/AccountPage.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicHeader.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 90,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/DynamicHeroSection.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 655,
			"Readers": 2,
			"ReadBy": ["Test/Component/DynamicHeroSection.test.tsx", "pages/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicInput.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 113,
			"Readers": 7,
			"ReadBy": [
				"Component/Dynamic/DynamicEmailVerification.tsx",
				"Component/Dynamic/DynamicForgotPassword.tsx",
				"Component/Dynamic/DynamicPortal.tsx",
				"Component/Dynamic/DynamicResetPassword.tsx",
				"Component/Dynamic/DynamicSignIn.tsx",
				"Component/Dynamic/DynamicSignUp.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicLabel.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 37,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicLocalFirstScan.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 380,
			"Readers": 1,
			"ReadBy": ["pages/Dashboard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicPortal.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 1557,
			"Readers": 1,
			"ReadBy": ["Test/Component/DynamicPortal.test.tsx"],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/DynamicResetPassword.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 357,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/AccountPage.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicRichText.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 18,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicSignIn.tsx",
			"Kind": "component",
			"Carries": "DynamicSignIn - the credential form for the Cloud tier.",
			"Lines": 255,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/AccountPage.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicSignUp.tsx",
			"Kind": "component",
			"Carries": "DynamicSignUp - the account registration form for the Cloud tier.",
			"Lines": 343,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/AccountPage.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicStateReport.tsx",
			"Kind": "component",
			"Carries": "Exports StateLabel, StateVocabulary, StateReportProps.",
			"Lines": 132,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Auth0AccountGate.tsx",
				"Component/Dynamic/DynamicAccountProfile.tsx",
				"Component/Dynamic/DynamicDashboardUser.tsx",
				"Component/Dynamic/DynamicEmailVerification.tsx",
				"Component/Dynamic/DynamicForgotPassword.tsx",
				"Component/Dynamic/DynamicResetPassword.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicTable.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 80,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicTransparency.tsx",
			"Kind": "component",
			"Carries": "DynamicTransparency - build transparency section showing SBOM, dependency tree, and build reproducibility information.",
			"Lines": 523,
			"Readers": 1,
			"ReadBy": ["pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/DynamicVerificationInfo.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 242,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Hero/Data.ts",
			"Kind": "component",
			"Carries": "Data - the homepage hero band, as data.",
			"Lines": 279,
			"Readers": 3,
			"ReadBy": [
				"Component/Dynamic/DynamicHeroSection.tsx",
				"Component/Home/FeatureBand.astro",
				"pages/index.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Hero/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the homepage hero band hands to its own anatomy.",
			"Lines": 179,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/Hero/Data.ts", "Component/Dynamic/Interface/Property/Hero.ts"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/MermaidFallback.astro",
			"Kind": "component",
			"Carries": "Client-side Mermaid fallback renderer.",
			"Lines": 127,
			"Readers": 2,
			"ReadBy": ["pages/Blog/[Slug].astro", "pages/Doc/[...Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Password/Strength.ts",
			"Kind": "component",
			"Carries": "Password strength, as data.",
			"Lines": 45,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/DynamicResetPassword.tsx", "Component/Dynamic/DynamicSignUp.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Platform/Data.ts",
			"Kind": "component",
			"Carries": "Data - the columns, rows and source lines of the platform matrix.",
			"Lines": 115,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Platform/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shape the platform matrix renders as.",
			"Lines": 26,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/Platform/Data.ts"],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Properties/Data.ts",
			"Kind": "component",
			"Carries": "Data - the six properties as records, and the band's own words.",
			"Lines": 267,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/DynamicHeroSection.tsx",
				"Component/Dynamic/Properties/Grid.astro",
				"Component/Home/FeatureBand.astro",
				"Test/Component/PropertiesGrid.test.tsx",
				"pages/Specimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Properties/Grid.astro",
			"Kind": "component",
			"Carries": "Grid - the six properties as records: three claims, and the three the layer files against the pages that argue them.",
			"Lines": 121,
			"Readers": 2,
			"ReadBy": ["Test/Component/PropertiesGrid.test.tsx", "pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Properties/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shape a property renders as, and the shape the proof band splits it into.",
			"Lines": 31,
			"Readers": 3,
			"ReadBy": [
				"Component/Dynamic/Properties/Data.ts",
				"Component/Dynamic/Properties/Grid.astro",
				"Test/Component/PropertiesGrid.test.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Roadmap/Data.ts",
			"Kind": "component",
			"Carries": "Data - every row, label and derivation the roadmap band prints.",
			"Lines": 212,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Roadmap/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes a release phase renders as.",
			"Lines": 56,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/Roadmap/Data.ts"],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Type.ts",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 3,
			"ReadBy": [
				"Test/Component/DynamicButton.test.tsx",
				"Test/Component/DynamicCard.test.tsx",
				"Test/Component/DynamicInput.test.tsx"
			],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Type/Route/Account.ts",
			"Kind": "component",
			"Carries": "Exports Type.",
			"Lines": 4,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Type/Route/Verify.ts",
			"Kind": "component",
			"Carries": "Exports Type.",
			"Lines": 4,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Type/State/Reset.ts",
			"Kind": "component",
			"Carries": "Exports Type.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/DynamicResetPassword.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/Type/State/Verification.ts",
			"Kind": "component",
			"Carries": "Exports Type.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/DynamicEmailVerification.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Dynamic/VerifyPage.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 193,
			"Readers": 1,
			"ReadBy": ["pages/Verify.astro"],
			"Reached": true
		},
		{
			"Path": "Component/ErrorBoundary.tsx",
			"Kind": "component",
			"Carries": "Exports ErrorBoundary.",
			"Lines": 135,
			"Readers": 1,
			"ReadBy": ["Test/Component/ErrorBoundary.test.tsx"],
			"Reached": false
		},
		{
			"Path": "Component/Home/ArchitectureBand.astro",
			"Kind": "component",
			"Carries": "ArchitectureBand - `#testimonials`: all fifteen element records, as a wall.",
			"Lines": 31,
			"Readers": 1,
			"ReadBy": ["pages/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/Arrow.astro",
			"Kind": "component",
			"Carries": "Arrow - the external-link mark that follows a record's own name.",
			"Lines": 26,
			"Readers": 2,
			"ReadBy": ["Component/Home/ElementCard.astro", "Component/Home/FeatureCard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/Band.astro",
			"Kind": "component",
			"Carries": "Band - one page band's shell: its record head, and the body below.",
			"Lines": 139,
			"Readers": 5,
			"ReadBy": [
				"Component/Home/ArchitectureBand.astro",
				"Component/Home/FeatureBand.astro",
				"Component/Home/PlatformBand.astro",
				"Component/Home/RoadmapBand.astro",
				"Component/Home/WorkingBand.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Home/ElementCard.astro",
			"Kind": "component",
			"Carries": "ElementCard - one of the fifteen element records in the architecture band.",
			"Lines": 178,
			"Readers": 1,
			"ReadBy": ["Component/Home/ArchitectureBand.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/FeatureBand.astro",
			"Kind": "component",
			"Carries": "FeatureBand - `# OBSERVATION_01`: the six element records that carry the claim.",
			"Lines": 63,
			"Readers": 2,
			"ReadBy": ["Test/Component/DynamicFeatures.test.tsx", "pages/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/FeatureCard.astro",
			"Kind": "component",
			"Carries": "FeatureCard - one of the six records in the features band.",
			"Lines": 71,
			"Readers": 1,
			"ReadBy": ["Component/Home/FeatureBand.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/PlatformBand.astro",
			"Kind": "component",
			"Carries": "PlatformBand - `# ACTION_01`: the three platform artefacts, as one manifest.",
			"Lines": 36,
			"Readers": 1,
			"ReadBy": ["pages/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/PlatformCard.astro",
			"Kind": "component",
			"Carries": "PlatformCard - one artefact row of the download manifest.",
			"Lines": 143,
			"Readers": 1,
			"ReadBy": ["Component/Home/PlatformBand.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/RecordAnatomy.astro",
			"Kind": "component",
			"Carries": "RecordAnatomy - the middle of every record card on the homepage.",
			"Lines": 79,
			"Readers": 2,
			"ReadBy": ["Component/Home/ElementCard.astro", "Component/Home/FeatureCard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/ReleaseCard.astro",
			"Kind": "component",
			"Carries": "ReleaseCard - one of the two release records in the roadmap manifest.",
			"Lines": 151,
			"Readers": 1,
			"ReadBy": ["Component/Home/RoadmapBand.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/RoadmapBand.astro",
			"Kind": "component",
			"Carries": "RoadmapBand - `# CONDITIONS_01`: the two release records, as one manifest.",
			"Lines": 49,
			"Readers": 2,
			"ReadBy": ["Test/Component/DynamicPricing.test.tsx", "pages/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/Tone.ts",
			"Kind": "component",
			"Carries": "Tone - the STATUS vocabulary's three tones, resolved from the value.",
			"Lines": 35,
			"Readers": 2,
			"ReadBy": ["Component/Home/PlatformCard.astro", "Component/Home/RecordAnatomy.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Home/WorkingBand.astro",
			"Kind": "component",
			"Carries": "WorkingBand - `# METHOD_01`: how the claim on this page is checked.",
			"Lines": 120,
			"Readers": 1,
			"ReadBy": ["pages/index.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Edge/EdgeLeaf.astro",
			"Kind": "component",
			"Carries": "EdgeLeaf - the first band: the sheet's headnote, printed by the frame.",
			"Lines": 300,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Edge/EdgeTurn.astro",
			"Kind": "component",
			"Carries": "EdgeTurn - the last band: the catchword, and the sheet's folio.",
			"Lines": 215,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Footer.astro",
			"Kind": "component",
			"Carries": "Footer - the record's closing band, read as a colophon.",
			"Lines": 200,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Footer/Data.ts",
			"Kind": "component",
			"Carries": "Footer data - the record's closing facts, the destinations behind the linked ones, and the two link rows the footer has always carried.",
			"Lines": 348,
			"Readers": 1,
			"ReadBy": ["Component/Layout/Footer.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Footer/Type.ts",
			"Kind": "component",
			"Carries": "Footer - the shapes its data module publishes.",
			"Lines": 59,
			"Readers": 1,
			"ReadBy": ["Component/Layout/Footer/Data.ts"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Frame/Data.ts",
			"Kind": "component",
			"Carries": "Frame data - the dossier's ten parts, and the route-to-part lookup the frame is composed from.",
			"Lines": 266,
			"Readers": 8,
			"ReadBy": [
				"Component/Layout/Edge/EdgeLeaf.astro",
				"Component/Layout/Footer/Data.ts",
				"Component/Layout/Frame/Rail.tsx",
				"Component/Layout/Frame/RunningHead.tsx",
				"Component/UI/Palette/Data.ts",
				"Content/Edge/Register.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Frame/Rail.tsx",
			"Kind": "component",
			"Carries": "FrameRail - the dossier's thumb index.",
			"Lines": 104,
			"Readers": 1,
			"ReadBy": ["Component/Layout/Header.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Frame/RunningHead.tsx",
			"Kind": "component",
			"Carries": "RunningHead - the strip under the bar, read as a printed running head.",
			"Lines": 126,
			"Readers": 1,
			"ReadBy": ["Component/Layout/Header.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Header.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 416,
			"Readers": 31,
			"ReadBy": [
				"Component/Contact/ContactPage.astro",
				"Component/Dynamic/DynamicAuthHeader.tsx",
				"Component/Dynamic/DynamicHeader.tsx",
				"Component/Dynamic/Interface/Content/Page/Account.ts",
				"Component/Dynamic/Interface/Content/Page/Download.ts",
				"Component/Dynamic/Interface/Content/Page/Home.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Header/Data.ts",
			"Kind": "component",
			"Carries": "Header data - the four destinations, the three actions and the status line, plus the two derivations the bar needs: translated labels and active state.",
			"Lines": 227,
			"Readers": 1,
			"ReadBy": ["Component/Layout/Header.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Header/Type.ts",
			"Kind": "component",
			"Carries": "Header - the shapes its data module publishes.",
			"Lines": 97,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/DynamicHeader.tsx",
				"Component/Layout/Frame/Data.ts",
				"Component/Layout/Frame/Rail.tsx",
				"Component/Layout/Frame/RunningHead.tsx",
				"Component/Layout/Header.tsx",
				"Component/Layout/Header/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Layout/LocaleSwitcher.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 120,
			"Readers": 2,
			"ReadBy": ["Component/Layout/Footer.astro", "Component/Layout/Header.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Layout/Print/PrintRecord.astro",
			"Kind": "component",
			"Carries": "PrintRecord - the sheet's own print action, printed as a colophon row.",
			"Lines": 132,
			"Readers": 1,
			"ReadBy": ["Component/Layout/Footer.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Mark/Mark.astro",
			"Kind": "component",
			"Carries": "Mark - the site's small set of signs, rendered once.",
			"Lines": 156,
			"Readers": 20,
			"ReadBy": [
				"Component/Auth/AuthShell.astro",
				"Component/Detail/Leader.astro",
				"Component/Dynamic/Download/PreviousReleases.astro",
				"Component/Dynamic/DownloadMasthead.astro",
				"Component/More/LexiconEntry.astro",
				"Component/More/Onward.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Mark/SealNeutral.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 98,
			"Readers": 2,
			"ReadBy": ["Component/Brand/FieldRecordSeal.tsx", "Component/UI/SpecimenSeal.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Mark/Type.ts",
			"Kind": "component",
			"Carries": "Type - the mark set's vocabulary, as values.",
			"Lines": 96,
			"Readers": 1,
			"ReadBy": ["Component/Mark/Mark.astro"],
			"Reached": true
		},
		{
			"Path": "Component/More/Lexicon.astro",
			"Kind": "component",
			"Carries": "Lexicon - one run of the glossary: a letter index, then the words filed under each letter.",
			"Lines": 139,
			"Readers": 1,
			"ReadBy": ["pages/Glossary.astro"],
			"Reached": true
		},
		{
			"Path": "Component/More/LexiconEntry.astro",
			"Kind": "component",
			"Carries": "LexiconEntry - one word, defined: the term in the margin, the definition on the measure, and the citations under it.",
			"Lines": 142,
			"Readers": 1,
			"ReadBy": ["Component/More/Lexicon.astro"],
			"Reached": true
		},
		{
			"Path": "Component/More/Onward.astro",
			"Kind": "component",
			"Carries": "Onward - the routing register: what the reader wanted, and where it is.",
			"Lines": 94,
			"Readers": 6,
			"ReadBy": [
				"pages/404.astro",
				"pages/Compare.astro",
				"pages/Contents.astro",
				"pages/Glossary.astro",
				"pages/Specimen.astro",
				"pages/Status.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/More/QuietHead.astro",
			"Kind": "component",
			"Carries": "QuietHead - the opening of a reference document: a marker, a bare `h1`, one proposition, and the extent as a white facts strip.",
			"Lines": 84,
			"Readers": 2,
			"ReadBy": ["pages/Glossary.astro", "pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/More/StatusBoard.astro",
			"Kind": "component",
			"Carries": "StatusBoard - a set of records partitioned by the state each one states.",
			"Lines": 190,
			"Readers": 1,
			"ReadBy": ["pages/Status.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionExpand.astro",
			"Kind": "component",
			"Carries": "MotionExpand - a record that opens in place, revealing the facts its row was summarising.",
			"Lines": 145,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionFold.astro",
			"Kind": "component",
			"Carries": "MotionFold - a disclosure with content behind it, opening like a fold.",
			"Lines": 181,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionOrigin.astro",
			"Kind": "component",
			"Carries": "MotionOrigin - the server half of the origin specimen.",
			"Lines": 15,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionOrigin.tsx",
			"Kind": "component",
			"Carries": "Exports MotionOrigin.",
			"Lines": 84,
			"Readers": 1,
			"ReadBy": ["Component/Motion/MotionOrigin.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionSequence.astro",
			"Kind": "component",
			"Carries": "MotionSequence - a state change drawn: the states a record moves through, and the motion that carries it from one to the next.",
			"Lines": 142,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionSkeleton.astro",
			"Kind": "component",
			"Carries": "MotionSkeleton - the loading arm, printed in the record grammar.",
			"Lines": 94,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/MotionSpecimen.astro",
			"Kind": "component",
			"Carries": "MotionSpecimen - one motion, stated on one side of a hairline and shown on the other.",
			"Lines": 129,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Motion/Type.ts",
			"Kind": "component",
			"Carries": "Type - the shapes the motion layer's components render.",
			"Lines": 183,
			"Readers": 4,
			"ReadBy": [
				"Component/Motion/MotionExpand.astro",
				"Component/Motion/MotionFold.astro",
				"Component/Motion/MotionSequence.astro",
				"Component/Motion/MotionSpecimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Provider/AnalyticsProvider.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 100,
			"Readers": 2,
			"ReadBy": ["Component/Provider/PageviewTracker.tsx", "Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Provider/Auth0Provider.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 50,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Auth0Account.tsx",
				"Component/Dynamic/Auth0CallbackHandler.tsx",
				"Component/Dynamic/DynamicAccountProfile.tsx",
				"Component/Dynamic/DynamicAuthHeader.tsx",
				"Component/Dynamic/DynamicContactForm.tsx",
				"Component/Dynamic/DynamicDashboardUser.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Provider/PageviewTracker.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 98,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Reading/ReadingDocument.astro",
			"Kind": "component",
			"Carries": "ReadingDocument - the reading surface: the facts that date and scope a document, an index into it, and one measure to read it on.",
			"Lines": 188,
			"Readers": 4,
			"ReadBy": [
				"pages/Contributing.astro",
				"pages/Legal/Privacy.astro",
				"pages/Legal/Term.astro",
				"pages/License.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Reading/Type.ts",
			"Kind": "component",
			"Carries": "Reading - the shapes the reading surface renders.",
			"Lines": 35,
			"Readers": 7,
			"ReadBy": [
				"Component/Reading/ReadingDocument.astro",
				"Component/Trust/TrustContents.astro",
				"Component/Trust/TrustContentsList.astro",
				"Library/Document/Contributing/Data.ts",
				"Library/Document/License/Data.ts",
				"Library/Document/Privacy/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordArchive.astro",
			"Kind": "component",
			"Carries": "RecordArchive - many records in one physical form: the archive index.",
			"Lines": 168,
			"Readers": 2,
			"ReadBy": ["pages/Contents.astro", "pages/Doc.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordAside.astro",
			"Kind": "component",
			"Carries": "RecordAside - a folded aside: what the record keeps but does not lead with.",
			"Lines": 132,
			"Readers": 4,
			"ReadBy": [
				"Component/Blog/BlogArticle.astro",
				"Component/Contact/ContactShell.astro",
				"pages/Account/index.astro",
				"pages/Download.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordBand.astro",
			"Kind": "component",
			"Carries": "RecordBand - the section grammar itself.",
			"Lines": 81,
			"Readers": 7,
			"ReadBy": [
				"Component/Doc/DocIndex.astro",
				"pages/Compare.astro",
				"pages/Contents.astro",
				"pages/Glossary.astro",
				"pages/Motion.astro",
				"pages/Specimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordCompare.astro",
			"Kind": "component",
			"Carries": "RecordCompare - one axis, its stops, and where each thing sits on it.",
			"Lines": 178,
			"Readers": 3,
			"ReadBy": [
				"pages/Compare.astro",
				"pages/Download.astro",
				"pages/Status.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordEntry.astro",
			"Kind": "component",
			"Carries": "RecordEntry - one record in a set (element, edition, article, doc): index marker, optional glyph, name, chip row, one-paragraph body, optional link.",
			"Lines": 72,
			"Readers": 2,
			"ReadBy": ["Component/Doc/DocIndex.astro", "Component/Dynamic/Properties/Grid.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordFailure.astro",
			"Kind": "component",
			"Carries": "RecordFailure - one documented way the thing breaks: its name, the state word, what the reader sees, why, and the next step.",
			"Lines": 91,
			"Readers": 1,
			"ReadBy": ["Component/Home/WorkingBand.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordFigure.astro",
			"Kind": "component",
			"Carries": "RecordFigure - evidence, not illustration: a framed figure, a caption at caption weight, and the provenance line that says what the picture is evidence *of*.",
			"Lines": 205,
			"Readers": 3,
			"ReadBy": [
				"Component/Blog/BlogIndex.astro",
				"Test/Component/RecordGrammar.test.ts",
				"pages/404.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordHero.astro",
			"Kind": "component",
			"Carries": "RecordHero - the site's signature artifact as one block: the field record beside its evidence, one hairline between them, and the record's mandatory blank interval inside the card.",
			"Lines": 206,
			"Readers": 4,
			"ReadBy": [
				"Test/Component/RecordGrammar.test.ts",
				"pages/404.astro",
				"pages/Compare.astro",
				"pages/Contents.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordInset.astro",
			"Kind": "component",
			"Carries": "RecordInset - a marginal note that can hold a figure.",
			"Lines": 267,
			"Readers": 2,
			"ReadBy": ["Component/Blog/BlogArticle.astro", "pages/Doc/[...Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordInstrument.astro",
			"Kind": "component",
			"Carries": "RecordInstrument - a measured panel: figures with their sources.",
			"Lines": 133,
			"Readers": 4,
			"ReadBy": [
				"Component/Dynamic/Download/PlatformMatrix.astro",
				"Test/Component/RecordGrammar.test.ts",
				"pages/Contents.astro",
				"pages/Status.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordLedger.astro",
			"Kind": "component",
			"Carries": "RecordLedger - the site's factual spine as rows: a mono key, an ink value, an optional qualifier under the value, and at most one row at display weight.",
			"Lines": 254,
			"Readers": 23,
			"ReadBy": [
				"Component/Blog/BlogArticle.astro",
				"Component/Contact/ContactShell.astro",
				"Component/Dynamic/Download/Record.astro",
				"Component/Dynamic/Download/Requirements.astro",
				"Component/Dynamic/Download/Verify.astro",
				"Component/Home/ElementCard.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordMargin.astro",
			"Kind": "component",
			"Carries": "RecordMargin - one annotation, printed in the margin of the record it belongs to.",
			"Lines": 132,
			"Readers": 5,
			"ReadBy": [
				"Component/Blog/BlogArticle.astro",
				"Component/Contact/ContactShell.astro",
				"pages/Doc/[...Slug].astro",
				"pages/Glossary.astro",
				"pages/Motion.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordMatrix.astro",
			"Kind": "component",
			"Carries": "RecordMatrix - comparison across columns: a header row carrying one ink per column, hairline rows and an optional caption.",
			"Lines": 200,
			"Readers": 7,
			"ReadBy": [
				"Component/Dynamic/Download/PlatformMatrix.astro",
				"Component/Dynamic/Download/PreviousReleases.astro",
				"pages/Compare.astro",
				"pages/Contents.astro",
				"pages/Dashboard.astro",
				"pages/Motion.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordPair.astro",
			"Kind": "component",
			"Carries": "RecordPair - two things read against each other.",
			"Lines": 184,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/Download/Requirements.astro", "Test/Component/RecordGrammar.test.ts"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordPlate.astro",
			"Kind": "component",
			"Carries": "RecordPlate - the evidence the record is about, at plate scale.",
			"Lines": 188,
			"Readers": 2,
			"ReadBy": ["Component/Doc/DocArticle.astro", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordPlateSet.astro",
			"Kind": "component",
			"Carries": "RecordPlateSet - many figures of one subject, read as a field.",
			"Lines": 223,
			"Readers": 2,
			"ReadBy": ["pages/Contents.astro", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordStage.astro",
			"Kind": "component",
			"Carries": "RecordStage - an ordered process: a rail of numbered steps, or a field of numbered plates.",
			"Lines": 100,
			"Readers": 5,
			"ReadBy": [
				"Component/Contact/ContactShell.astro",
				"pages/Contact/index.astro",
				"pages/Contents.astro",
				"pages/Status.astro",
				"pages/index.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordStamp.astro",
			"Kind": "component",
			"Carries": "RecordStamp - the mark that says this record is what it claims to be.",
			"Lines": 143,
			"Readers": 2,
			"ReadBy": ["pages/Contents.astro", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordTrace.astro",
			"Kind": "component",
			"Carries": "RecordTrace - the path a claim can be checked along: a numbered run of files, routes or commands, each with the one thing it carries, closed by the source the trace itself was r...",
			"Lines": 104,
			"Readers": 4,
			"ReadBy": [
				"Component/Home/ElementCard.astro",
				"Component/Home/WorkingBand.astro",
				"pages/Compare.astro",
				"pages/Status.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordTranscript.astro",
			"Kind": "component",
			"Carries": "RecordTranscript - a session, printed as it happened.",
			"Lines": 231,
			"Readers": 2,
			"ReadBy": ["pages/Doc/[...Slug].astro", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Record/RecordWell.astro",
			"Kind": "component",
			"Carries": "RecordWell - a command, config block or transcript: a recessed mono body in a hairline frame, under a title bar carrying the label and the copy control.",
			"Lines": 126,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Download/Install.astro",
				"Component/Dynamic/Download/Verify.astro",
				"pages/Compare.astro",
				"pages/License.astro",
				"pages/Status.astro",
				"pages/Verify.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/Register.astro",
			"Kind": "component",
			"Carries": "Register - the register line, printed once for every block that has one.",
			"Lines": 75,
			"Readers": 3,
			"ReadBy": [
				"Component/Blog/BlogIndex.astro",
				"Component/Detail/Leader.astro",
				"Component/Record/RecordLedger.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/RegisterLine.ts",
			"Kind": "component",
			"Carries": "RegisterLine - the one shape a register takes, and the one place its line is composed.",
			"Lines": 180,
			"Readers": 18,
			"ReadBy": [
				"Component/Blog/BlogArticle.astro",
				"Component/Blog/BlogIndex.astro",
				"Component/Contact/ContactShell.astro",
				"Component/Detail/Leader.astro",
				"Component/Home/ElementCard.astro",
				"Component/Home/WorkingBand.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Record/Type.ts",
			"Kind": "component",
			"Carries": "Type - the data shapes the Record layer's ten blocks render.",
			"Lines": 1353,
			"Readers": 66,
			"ReadBy": [
				"Component/Blog/BlogArticle.astro",
				"Component/Blog/Data.ts",
				"Component/Contact/ContactShell.astro",
				"Component/Detail/Leader.astro",
				"Component/Doc/DocArticle.astro",
				"Component/Doc/Type.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Route/Trail.astro",
			"Kind": "component",
			"Carries": "Trail - the site's one breadcrumb grammar.",
			"Lines": 61,
			"Readers": 16,
			"ReadBy": [
				"Component/Auth/AuthShell.astro",
				"Component/Contact/ContactBreadcrumb.astro",
				"Component/Contact/ContactPage.astro",
				"pages/Account/index.astro",
				"pages/Compare.astro",
				"pages/Contents.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Route/Type.ts",
			"Kind": "component",
			"Carries": "The Route surface's contract.",
			"Lines": 23,
			"Readers": 5,
			"ReadBy": [
				"Component/Auth/AuthShell.astro",
				"Component/Auth/Data.ts",
				"Component/Contact/ContactBreadcrumb.astro",
				"Component/Route/Trail.astro",
				"Library/Contact/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Component/Shell/Language.ts",
			"Kind": "component",
			"Carries": "Language - the four composition languages, and the register that files a route under one of them.",
			"Lines": 399,
			"Readers": 3,
			"ReadBy": [
				"Component/Shell/PageShell.astro",
				"Layout/Base.astro",
				"pages/Contents.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Shell/PageShell.astro",
			"Kind": "component",
			"Carries": "PageShell - the shell every composed page wears, in one of four languages.",
			"Lines": 234,
			"Readers": 10,
			"ReadBy": [
				"pages/404.astro",
				"pages/Account/index.astro",
				"pages/Compare.astro",
				"pages/Contact/Sale.astro",
				"pages/Doc/Rust.astro",
				"pages/Glossary.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Shell/ShellPanes.astro",
			"Kind": "component",
			"Carries": "ShellPanes - the workspace's panes: two instruments side by side with the site's hairline between them, and a drawer for what does not fit either.",
			"Lines": 165,
			"Readers": 3,
			"ReadBy": [
				"pages/Account/index.astro",
				"pages/Compare.astro",
				"pages/Doc/Rust.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Shell/ShellPlate.astro",
			"Kind": "component",
			"Carries": "ShellPlate - the plate language's one artifact: a full-bleed figure with a caption channel beside it.",
			"Lines": 196,
			"Readers": 2,
			"ReadBy": ["pages/404.astro", "pages/OAuth/Success.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Shell/ShellRail.astro",
			"Kind": "component",
			"Carries": "ShellRail - the rail primitive: a register line and rows, in a track beside the page's main column.",
			"Lines": 193,
			"Readers": 6,
			"ReadBy": [
				"pages/Account/index.astro",
				"pages/Compare.astro",
				"pages/Contact/Sale.astro",
				"pages/Doc/Rust.astro",
				"pages/Glossary.astro",
				"pages/Motion.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Shell/ShellState.astro",
			"Kind": "component",
			"Carries": "ShellState - the nine adverse states, composed in the record grammar.",
			"Lines": 335,
			"Readers": 11,
			"ReadBy": [
				"pages/404.astro",
				"pages/Account/index.astro",
				"pages/Compare.astro",
				"pages/Contact/Sale.astro",
				"pages/Contact/index.astro",
				"pages/Doc/Rust.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Social/MetaTags.tsx",
			"Kind": "component",
			"Carries": "The document head - the one place a route's metadata is written.",
			"Lines": 190,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Social/Title.ts",
			"Kind": "component",
			"Carries": "The site's one document-title pattern.",
			"Lines": 70,
			"Readers": 1,
			"ReadBy": ["Component/Social/MetaTags.tsx"],
			"Reached": true
		},
		{
			"Path": "Component/Specimen/SpecimenMaterial.astro",
			"Kind": "component",
			"Carries": "SpecimenMaterial - the stock and the inks, printed as specimens.",
			"Lines": 123,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Specimen/SpecimenPlate.astro",
			"Kind": "component",
			"Carries": "SpecimenPlate - one part, printed at its own size, beside its contract.",
			"Lines": 154,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Specimen/SpecimenSheet.astro",
			"Kind": "component",
			"Carries": "SpecimenSheet - the contact sheet: every part as one cell, on one page.",
			"Lines": 146,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/Badge.ts",
			"Kind": "component",
			"Carries": "Badge - the ink table for the dashboard's state words.",
			"Lines": 101,
			"Readers": 2,
			"ReadBy": ["Component/Surface/SurfaceBadge.astro", "Content/Surface/Dashboard.ts"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/State.ts",
			"Kind": "component",
			"Carries": "State - the state register of every surface that states one.",
			"Lines": 177,
			"Readers": 27,
			"ReadBy": [
				"Component/Auth/AuthShell.astro",
				"Component/Dynamic/DynamicStateReport.tsx",
				"Component/More/LexiconEntry.astro",
				"Component/More/StatusBoard.astro",
				"Component/Record/RecordCompare.astro",
				"Component/Record/RecordFailure.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Surface/StateBadge.tsx",
			"Kind": "component",
			"Carries": "StateBadge - one state word, as a Jelly badge, inside a React island.",
			"Lines": 118,
			"Readers": 4,
			"ReadBy": [
				"Component/Auth/Report.tsx",
				"Component/Dynamic/DynamicForgotPassword.tsx",
				"Component/Dynamic/DynamicResetPassword.tsx",
				"Component/Dynamic/DynamicStateReport.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceAbsent.astro",
			"Kind": "component",
			"Carries": "SurfaceAbsent - the honest empty state of an app surface.",
			"Lines": 94,
			"Readers": 2,
			"ReadBy": ["pages/Dashboard.astro", "pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceBadge.astro",
			"Kind": "component",
			"Carries": "SurfaceBadge - one state word on a Jelly badge.",
			"Lines": 58,
			"Readers": 2,
			"ReadBy": ["pages/Dashboard.astro", "pages/Portal.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceChips.astro",
			"Kind": "component",
			"Carries": "SurfaceChips - a record's state chips, as Jelly badges.",
			"Lines": 80,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceHead.astro",
			"Kind": "component",
			"Carries": "SurfaceHead - the instrument's nameplate, designed once for every app surface.",
			"Lines": 112,
			"Readers": 6,
			"ReadBy": [
				"Component/Surface/SurfaceShell.astro",
				"pages/Account/index.astro",
				"pages/Dashboard.astro",
				"pages/Portal.astro",
				"pages/Status.astro",
				"pages/Verify.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceRegion.astro",
			"Kind": "component",
			"Carries": "SurfaceRegion - one region of an app surface's main column.",
			"Lines": 54,
			"Readers": 1,
			"ReadBy": ["pages/Dashboard.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceShell.astro",
			"Kind": "component",
			"Carries": "SurfaceShell - the shell both app surfaces wear: the instrument head, then the page's own bands.",
			"Lines": 76,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceState.astro",
			"Kind": "component",
			"Carries": "SurfaceState - the state register of an app surface.",
			"Lines": 69,
			"Readers": 2,
			"ReadBy": ["Component/Surface/SurfaceStatusLine.astro", "pages/OAuth/Success.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Surface/SurfaceStatusLine.astro",
			"Kind": "component",
			"Carries": "SurfaceStatusLine - the one row every app surface states its state in.",
			"Lines": 60,
			"Readers": 3,
			"ReadBy": [
				"Component/Auth/AuthShell.astro",
				"Component/Surface/SurfaceHead.astro",
				"pages/Portal.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Trust/Facts.ts",
			"Kind": "component",
			"Carries": "Facts - the three facts a legal document must answer before its first clause, and that no single document's own data carries: who maintains it, where to ask for help, and where...",
			"Lines": 132,
			"Readers": 4,
			"ReadBy": [
				"pages/Contributing.astro",
				"pages/Legal/Privacy.astro",
				"pages/Legal/Term.astro",
				"pages/License.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Trust/TrustClause.astro",
			"Kind": "component",
			"Carries": "TrustClause - one clause of a legal document, and the fact that its number is a place you can link to.",
			"Lines": 73,
			"Readers": 4,
			"ReadBy": [
				"pages/Contributing.astro",
				"pages/Legal/Privacy.astro",
				"pages/Legal/Term.astro",
				"pages/License.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Trust/TrustContents.astro",
			"Kind": "component",
			"Carries": "TrustContents - the clause rail: the document's own index, beside the text rather than above it, and marked as the reader moves.",
			"Lines": 82,
			"Readers": 1,
			"ReadBy": ["Component/Reading/ReadingDocument.astro"],
			"Reached": true
		},
		{
			"Path": "Component/Trust/TrustContents.ts",
			"Kind": "component",
			"Carries": "TrustContents - the clause rail's marking and its position figure.",
			"Lines": 205,
			"Readers": 4,
			"ReadBy": [
				"pages/Contributing.astro",
				"pages/Legal/Privacy.astro",
				"pages/Legal/Term.astro",
				"pages/License.astro"
			],
			"Reached": true
		},
		{
			"Path": "Component/Trust/TrustContentsList.astro",
			"Kind": "component",
			"Carries": "TrustContentsList - the clause list itself: one row per clause, `§NN  name`.",
			"Lines": 33,
			"Readers": 1,
			"ReadBy": ["Component/Trust/TrustContents.astro"],
			"Reached": true
		},
		{
			"Path": "content.config.ts",
			"Kind": "other",
			"Carries": "content.config.ts - the entry point Astro loads.",
			"Lines": 14,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Content/Artifact/Inset.ts",
			"Kind": "content",
			"Carries": "Inset - the margin's figures, derived from the page they annotate.",
			"Lines": 171,
			"Readers": 2,
			"ReadBy": ["pages/Blog/[Slug].astro", "pages/Doc/[...Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Content/Artifact/Plate.ts",
			"Kind": "content",
			"Carries": "Plate - the copy behind the two plate artifacts, as data.",
			"Lines": 392,
			"Readers": 3,
			"ReadBy": [
				"pages/Contents.astro",
				"pages/Doc/[...Slug].astro",
				"pages/Download.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/Artifact/Session.ts",
			"Kind": "content",
			"Carries": "Session - the two transcripts the document can honestly print.",
			"Lines": 362,
			"Readers": 2,
			"ReadBy": ["pages/Doc/[...Slug].astro", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Artifact/Stamp.ts",
			"Kind": "content",
			"Carries": "Stamp - the two marks the document issues, as data.",
			"Lines": 111,
			"Readers": 2,
			"ReadBy": ["pages/Contents.astro", "pages/Download.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Config.ts",
			"Kind": "content",
			"Carries": "Config - the two content collections, defined once.",
			"Lines": 68,
			"Readers": 1,
			"ReadBy": ["content.config.ts"],
			"Reached": true
		},
		{
			"Path": "Content/Edge/Copy.ts",
			"Kind": "content",
			"Carries": "Edge copy - the words the two page edges print when the world is unkind.",
			"Lines": 227,
			"Readers": 4,
			"ReadBy": [
				"Component/Layout/Edge/EdgeLeaf.astro",
				"Component/Layout/Edge/EdgeTurn.astro",
				"Component/Layout/Footer.astro",
				"Component/Layout/Footer/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Edge/Register.ts",
			"Kind": "content",
			"Carries": "The Edge register - every sheet this document files, in the order it is read.",
			"Lines": 735,
			"Readers": 4,
			"ReadBy": [
				"Component/Layout/Edge/EdgeLeaf.astro",
				"Component/Layout/Edge/EdgeTurn.astro",
				"Component/Layout/Footer.astro",
				"Component/Layout/Footer/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Element/Working.ts",
			"Kind": "content",
			"Carries": "The working behind each element record - the facts a claim is checked against.",
			"Lines": 655,
			"Readers": 3,
			"ReadBy": [
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Working.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Home/Architecture.ts",
			"Kind": "content",
			"Carries": "The architecture band: all fifteen elements, one record card each.",
			"Lines": 287,
			"Readers": 1,
			"ReadBy": ["Component/Home/ArchitectureBand.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Home/Band.ts",
			"Kind": "content",
			"Carries": "The five bands' openings, in the order the page prints them.",
			"Lines": 142,
			"Readers": 6,
			"ReadBy": [
				"Component/Home/ArchitectureBand.astro",
				"Component/Home/FeatureBand.astro",
				"Component/Home/PlatformBand.astro",
				"Component/Home/RoadmapBand.astro",
				"Component/Home/WorkingBand.astro",
				"Content/Index/Rhythm.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Home/Feature.ts",
			"Kind": "content",
			"Carries": "The features band: six element records, one card each.",
			"Lines": 82,
			"Readers": 1,
			"ReadBy": ["Component/Home/FeatureBand.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Home/Platform.ts",
			"Kind": "content",
			"Carries": "The download band: three platform records, one card each.",
			"Lines": 151,
			"Readers": 2,
			"ReadBy": ["Component/Home/PlatformBand.astro", "Content/More/Status.ts"],
			"Reached": true
		},
		{
			"Path": "Content/Home/Roadmap.ts",
			"Kind": "content",
			"Carries": "The roadmap band: two release records, one card each.",
			"Lines": 347,
			"Readers": 2,
			"ReadBy": ["Component/Home/RoadmapBand.astro", "Content/More/Status.ts"],
			"Reached": true
		},
		{
			"Path": "Content/Home/Stack.ts",
			"Kind": "content",
			"Carries": "The hero's tech-stack strip: the eight technologies the editor is made of.",
			"Lines": 32,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/DynamicHeroSection.tsx"],
			"Reached": true
		},
		{
			"Path": "Content/Home/Type.ts",
			"Kind": "content",
			"Carries": "The homepage bands, as data.",
			"Lines": 278,
			"Readers": 13,
			"ReadBy": [
				"Component/Home/Band.astro",
				"Component/Home/ElementCard.astro",
				"Component/Home/FeatureCard.astro",
				"Component/Home/PlatformCard.astro",
				"Component/Home/RecordAnatomy.astro",
				"Component/Home/ReleaseCard.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/Home/Working.ts",
			"Kind": "content",
			"Carries": "The working band - the mechanism, its release, and what stops it.",
			"Lines": 263,
			"Readers": 1,
			"ReadBy": ["Component/Home/WorkingBand.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Index/Chapters.ts",
			"Kind": "content",
			"Carries": "Chapters - how the document is divided, for the index's route register.",
			"Lines": 152,
			"Readers": 1,
			"ReadBy": ["Library/Index/Register.ts"],
			"Reached": true
		},
		{
			"Path": "Content/Index/Declared.ts",
			"Kind": "content",
			"Carries": "Declared - why a module nothing reads still exists.",
			"Lines": 232,
			"Readers": 1,
			"ReadBy": ["Library/Index/Register.ts"],
			"Reached": true
		},
		{
			"Path": "Content/Index/Forms.ts",
			"Kind": "content",
			"Carries": "Forms - the artifact set: one information type, one physical form.",
			"Lines": 373,
			"Readers": 2,
			"ReadBy": ["Content/Index/Page.ts", "pages/Contents.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Index/Page.ts",
			"Kind": "content",
			"Carries": "Page - the index's copy, and nothing else.",
			"Lines": 552,
			"Readers": 2,
			"ReadBy": ["Content/Index/Rhythm.ts", "pages/Contents.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Index/Rhythm.ts",
			"Kind": "content",
			"Carries": "Rhythm - the document's own vertical system, printed.",
			"Lines": 451,
			"Readers": 1,
			"ReadBy": ["pages/Contents.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Layout/Account.ts",
			"Kind": "content",
			"Carries": "Account - the account workspace, as data.",
			"Lines": 231,
			"Readers": 1,
			"ReadBy": ["pages/Account/index.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Layout/NotFound.ts",
			"Kind": "content",
			"Carries": "NotFound - the copy for the 404's plate and its adverse states.",
			"Lines": 106,
			"Readers": 1,
			"ReadBy": ["pages/404.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Layout/OAuth.ts",
			"Kind": "content",
			"Carries": "OAuth - the callback's four outcomes, as copy.",
			"Lines": 159,
			"Readers": 1,
			"ReadBy": ["pages/OAuth/Success.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Layout/Rust.ts",
			"Kind": "content",
			"Carries": "Rust - the API surface's workspace copy.",
			"Lines": 127,
			"Readers": 1,
			"ReadBy": ["pages/Doc/Rust.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Layout/Verify.ts",
			"Kind": "content",
			"Carries": "Verify - the verification route, as an audit.",
			"Lines": 263,
			"Readers": 1,
			"ReadBy": ["pages/Verify.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Layout/Visit.ts",
			"Kind": "content",
			"Carries": "Visit - the tombstone the catch-all route prints when it cannot send the reader on.",
			"Lines": 95,
			"Readers": 1,
			"ReadBy": ["pages/Visit.astro"],
			"Reached": true
		},
		{
			"Path": "Content/More/Compare.ts",
			"Kind": "content",
			"Carries": "Compare - Land against the editor it replaces, in the site's own words.",
			"Lines": 611,
			"Readers": 3,
			"ReadBy": [
				"Content/Index/Rhythm.ts",
				"pages/Compare.astro",
				"pages/Specimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/More/Glossary.ts",
			"Kind": "content",
			"Carries": "Glossary - the document's own words, in three runs.",
			"Lines": 879,
			"Readers": 5,
			"ReadBy": [
				"Component/More/Lexicon.astro",
				"Component/More/LexiconEntry.astro",
				"Component/UI/Palette/Data.ts",
				"Content/Index/Rhythm.ts",
				"pages/Glossary.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/More/Page.ts",
			"Kind": "content",
			"Carries": "Page - the copy the three \"more\" surfaces share: the onward register, and the one sentence each register opens on.",
			"Lines": 284,
			"Readers": 6,
			"ReadBy": [
				"Component/More/Onward.astro",
				"Content/Index/Page.ts",
				"pages/404.astro",
				"pages/Compare.astro",
				"pages/Glossary.astro",
				"pages/Status.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/More/Status.ts",
			"Kind": "content",
			"Carries": "Status - the status board's data: every record the site files with a state, grouped by the state it states, and the facts the board is read against.",
			"Lines": 726,
			"Readers": 3,
			"ReadBy": [
				"Component/More/StatusBoard.astro",
				"Content/Index/Rhythm.ts",
				"pages/Status.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/Motion/Page.ts",
			"Kind": "content",
			"Carries": "Page - the motion register's copy: bands, facts, sequences, arms, refusals.",
			"Lines": 990,
			"Readers": 2,
			"ReadBy": ["Content/Index/Rhythm.ts", "pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Motion/Register.ts",
			"Kind": "content",
			"Carries": "Register - the site's interaction classes, as data.",
			"Lines": 485,
			"Readers": 1,
			"ReadBy": ["pages/Motion.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Record/Air.ts",
			"Kind": "content",
			"Carries": "Exports Air.",
			"Lines": 48,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Feature.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Cocoon.ts",
			"Kind": "content",
			"Carries": "Exports Cocoon.",
			"Lines": 48,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Feature.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Common.ts",
			"Kind": "content",
			"Carries": "Exports Common.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Echo.ts",
			"Kind": "content",
			"Carries": "Exports Echo.",
			"Lines": 48,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Feature.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/FieldRecord.ts",
			"Kind": "content",
			"Carries": "Exports RecordCategory, RecordStatus, StatusTone, FieldRecord.",
			"Lines": 81,
			"Readers": 28,
			"ReadBy": [
				"Component/Brand/FieldRecord/Type.ts",
				"Component/Brand/SpecimenLabel.tsx",
				"Component/Dynamic/Architecture/Data.ts",
				"Component/Surface/State.ts",
				"Component/Surface/StateBadge.tsx",
				"Component/Surface/SurfaceChips.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Grove.ts",
			"Kind": "content",
			"Carries": "Exports Grove.",
			"Lines": 60,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Land.ts",
			"Kind": "content",
			"Carries": "Exports Land.",
			"Lines": 54,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/Architecture/Data.ts", "pages/OpenGraph.svg.ts"],
			"Reached": true
		},
		{
			"Path": "Content/Record/Maintain.ts",
			"Kind": "content",
			"Carries": "Exports Maintain.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Mist.ts",
			"Kind": "content",
			"Carries": "Exports Mist.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Mountain.ts",
			"Kind": "content",
			"Carries": "Exports Mountain.",
			"Lines": 48,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Feature.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Output.ts",
			"Kind": "content",
			"Carries": "Exports Output.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Rest.ts",
			"Kind": "content",
			"Carries": "Exports Rest.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/SideCar.ts",
			"Kind": "content",
			"Carries": "Exports SideCar.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Sky.ts",
			"Kind": "content",
			"Carries": "Exports Sky.",
			"Lines": 48,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Feature.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Vine.ts",
			"Kind": "content",
			"Carries": "Exports Vine.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Wind.ts",
			"Kind": "content",
			"Carries": "Exports Wind.",
			"Lines": 48,
			"Readers": 6,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/Home/Feature.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Record/Worker.ts",
			"Kind": "content",
			"Carries": "Exports Worker.",
			"Lines": 48,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/Architecture/Data.ts",
				"Content/Artifact/Plate.ts",
				"Content/Home/Architecture.ts",
				"Content/More/Glossary.ts",
				"Content/More/Status.ts"
			],
			"Reached": true
		},
		{
			"Path": "Content/Specimen/Page.ts",
			"Kind": "content",
			"Carries": "Page - the sheet's copy, and nothing else.",
			"Lines": 351,
			"Readers": 3,
			"ReadBy": [
				"Component/Specimen/SpecimenMaterial.astro",
				"Content/Index/Rhythm.ts",
				"pages/Specimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/Specimen/Parts.ts",
			"Kind": "content",
			"Carries": "Parts - the document's own parts, filed as records.",
			"Lines": 740,
			"Readers": 3,
			"ReadBy": [
				"Component/Specimen/SpecimenPlate.astro",
				"Component/Specimen/SpecimenSheet.astro",
				"pages/Specimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Content/Specimen/States.ts",
			"Kind": "content",
			"Carries": "States - the nine adverse states, as this sheet's own specimens.",
			"Lines": 310,
			"Readers": 1,
			"ReadBy": ["pages/Specimen.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Surface/Dashboard.ts",
			"Kind": "content",
			"Carries": "Dashboard - the dashboard page's content table.",
			"Lines": 690,
			"Readers": 1,
			"ReadBy": ["pages/Dashboard.astro"],
			"Reached": true
		},
		{
			"Path": "Content/Surface/Portal.ts",
			"Kind": "content",
			"Carries": "Portal - the portal page's content table.",
			"Lines": 672,
			"Readers": 1,
			"ReadBy": ["pages/Portal.astro"],
			"Reached": true
		},
		{
			"Path": "env.d.ts",
			"Kind": "type",
			"Carries": "/ <reference path=\"../.astro/types.d.ts\" /> / <reference types=\"astro/client\" /> `.astro` components as modules.",
			"Lines": 74,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Footer.tsx",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 100,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Function/Configuration/Auth.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 5,
			"ReadBy": [
				"Component/Contact/ContactShell.astro",
				"pages/Account/SignIn.astro",
				"pages/Account/SignUp.astro",
				"pages/Account/index.astro",
				"pages/Dashboard.astro"
			],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Auth0ClientIdentifier.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Auth.ts", "pages/OAuth/Success.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Auth0Domain.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Auth.ts", "pages/OAuth/Success.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/BuildConcurrency.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/ClientPrerender.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Compress.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/CompressHTML.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/ContentIntellisense.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/CSSMinify.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/CSSTransformer.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/DevToolbar.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Environment.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 22,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/InlineCSS.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Interface/Load.ts",
			"Kind": "function",
			"Carries": "Exports Interface.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Load.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Interface/Override.ts",
			"Kind": "function",
			"Carries": "Exports Interface.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Override.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Interface/Parse/Boolean.ts",
			"Kind": "function",
			"Carries": "Exports Interface.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Parse/Boolean.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Interface/Parse/Number.ts",
			"Kind": "function",
			"Carries": "Exports Interface.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Parse/Number.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Lab.mjs",
			"Kind": "function",
			"Carries": "Lab - the one switch that decides whether this build carries the site's exploratory surfaces.",
			"Lines": 134,
			"Readers": 10,
			"ReadBy": [
				"Component/Shell/Language.ts",
				"Component/UI/Palette/Data.ts",
				"Content/Index/Page.ts",
				"Content/Index/Rhythm.ts",
				"Function/Route/Lab.ts",
				"Function/Route/LabOutput.mjs"
			],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Load.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 44,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Resolve.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Manifest.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Minify.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Noise.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 33,
			"Readers": 1,
			"ReadBy": ["Function/Noise/Staccato.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/On.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 11,
			"ReadBy": [
				"Function/Configuration/CSSMinify.ts",
				"Function/Configuration/Compress.ts",
				"Function/Configuration/CompressHTML.ts",
				"Function/Configuration/DevToolbar.ts",
				"Function/Configuration/Environment.ts",
				"Function/Configuration/InlineCSS.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Override.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 120,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Resolve.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Parse/Boolean.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 14,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Override.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Parse/Number.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 10,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Override.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Port.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/PrefetchAll.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/PrefetchStrategy.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/PreserveSymlinks.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Preset.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 40,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Resolve.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Resolve.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 24,
			"Readers": 18,
			"ReadBy": [
				"Function/Configuration/BuildConcurrency.ts",
				"Function/Configuration/CSSMinify.ts",
				"Function/Configuration/CSSTransformer.ts",
				"Function/Configuration/ClientPrerender.ts",
				"Function/Configuration/Compress.ts",
				"Function/Configuration/CompressHTML.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Schema.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 23,
			"Readers": 3,
			"ReadBy": [
				"Function/Configuration/Load.ts",
				"Function/Configuration/Resolve.ts",
				"Function/Configuration/Type/Configuration.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Schema/CSSMinification.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Override.ts", "Function/Configuration/Schema.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Schema/CSSTransformation.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 2,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Override.ts", "Function/Configuration/Schema.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Schema/Environment.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 8,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Environment.ts", "Function/Configuration/Type/Environment.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Schema/Minification.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Override.ts", "Function/Configuration/Schema.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Schema/Prefetch.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 10,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Override.ts", "Function/Configuration/Schema.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/ServiceWorker.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Site.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Sourcemap.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Type/Configuration.ts",
			"Kind": "function",
			"Carries": "Exports Type.",
			"Lines": 8,
			"Readers": 2,
			"ReadBy": ["Function/Configuration/Preset.ts", "Function/Configuration/Resolve.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Configuration/Type/Environment.ts",
			"Kind": "function",
			"Carries": "Exports Type.",
			"Lines": 8,
			"Readers": 1,
			"ReadBy": ["Function/Configuration/Environment.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Doc/BuildDocIndex.ts",
			"Kind": "function",
			"Carries": "BuildDocIndex - the documentation index's complete data.",
			"Lines": 601,
			"Readers": 1,
			"ReadBy": ["pages/Doc.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Doc/BuildDocSidebar.ts",
			"Kind": "function",
			"Carries": "Exports SectionOrder, Slugify.",
			"Lines": 96,
			"Readers": 4,
			"ReadBy": [
				"Component/UI/Palette/Palette.astro",
				"Function/Doc/BuildDocIndex.ts",
				"pages/Doc.astro",
				"pages/Doc/[...Slug].astro"
			],
			"Reached": true
		},
		{
			"Path": "Function/Doc/BuildDocStrip.ts",
			"Kind": "function",
			"Carries": "BuildDocStrip - the mono metadata strip above documentation prose.",
			"Lines": 102,
			"Readers": 3,
			"ReadBy": [
				"pages/Doc.astro",
				"pages/Doc/Rust.astro",
				"pages/Doc/[...Slug].astro"
			],
			"Reached": true
		},
		{
			"Path": "Function/Doc/BuildDocToc.ts",
			"Kind": "function",
			"Carries": "BuildDocToc - the in-page table of contents, from the page's own `##` headings.",
			"Lines": 98,
			"Readers": 1,
			"ReadBy": ["pages/Doc/[...Slug].astro"],
			"Reached": true
		},
		{
			"Path": "Function/Markdown/Callout.ts",
			"Kind": "function",
			"Carries": "Exports remarkCallout.",
			"Lines": 88,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Markdown/CodeMentions.ts",
			"Kind": "function",
			"Carries": "The AST-level code-mention pass for markdown content - the Aphrodite/Site pattern wired as a remark plugin (alongside Callout.ts / Mermaid.ts in this directory).",
			"Lines": 220,
			"Readers": 2,
			"ReadBy": ["Test/Markdown/CodeMentions.test.ts", "astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Markdown/Heading.ts",
			"Kind": "function",
			"Carries": "remarkHeading - the page owns the level-one heading, and the markdown never renders a second one.",
			"Lines": 59,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Markdown/Mermaid.ts",
			"Kind": "function",
			"Carries": "Exports remarkMermaid.",
			"Lines": 180,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Noise/Attention.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 526,
			"Readers": 1,
			"ReadBy": ["Component/Dynamic/DynamicPortal.tsx"],
			"Reached": true
		},
		{
			"Path": "Function/Noise/Staccato.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 151,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/DynamicPortal.tsx", "Component/Dynamic/DynamicTransparency.tsx"],
			"Reached": true
		},
		{
			"Path": "Function/Noise/Turbulence.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 57,
			"Readers": 1,
			"ReadBy": ["Function/Noise/Staccato.ts"],
			"Reached": true
		},
		{
			"Path": "Function/OpenGraph.ts",
			"Kind": "function",
			"Carries": "OpenGraph SVG template generator - the Daylight Field Record artifact card.",
			"Lines": 256,
			"Readers": 1,
			"ReadBy": ["pages/OpenGraph/[...Slug].svg.ts"],
			"Reached": true
		},
		{
			"Path": "Function/OpenGraph/Ink.ts",
			"Kind": "function",
			"Carries": "OpenGraph ink - the share image's copy of the design tokens.",
			"Lines": 228,
			"Readers": 3,
			"ReadBy": [
				"Function/OpenGraph.ts",
				"Function/OpenGraph/Run.ts",
				"pages/OpenGraph.svg.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/OpenGraph/PageMetadata.ts",
			"Kind": "function",
			"Carries": "Static page metadata for OpenGraph image generation.",
			"Lines": 480,
			"Readers": 2,
			"ReadBy": ["Layout/Base.astro", "pages/OpenGraph/[...Slug].svg.ts"],
			"Reached": true
		},
		{
			"Path": "Function/OpenGraph/Run.ts",
			"Kind": "function",
			"Carries": "OpenGraph runs - the record grammar as SVG text runs.",
			"Lines": 113,
			"Readers": 2,
			"ReadBy": ["Function/OpenGraph.ts", "pages/OpenGraph.svg.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Integration.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 570,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Interface/RouteMap.ts",
			"Kind": "function",
			"Carries": "Exports RouteMap.",
			"Lines": 12,
			"Readers": 1,
			"ReadBy": ["Function/Route/Map.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Lab.ts",
			"Kind": "function",
			"Carries": "Lab - the build step that keeps the exploratory surfaces out of production.",
			"Lines": 75,
			"Readers": 1,
			"ReadBy": ["astro.config.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Route/LabOutput.mjs",
			"Kind": "function",
			"Carries": "LabOutput - remove the lab surfaces from a built site.",
			"Lines": 110,
			"Readers": 1,
			"ReadBy": ["Function/Route/Lab.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Map.ts",
			"Kind": "function",
			"Carries": "Exports CanonicalPath, PascalCaseCanonical, SemanticAlias, CanonicalizePath.",
			"Lines": 543,
			"Readers": 7,
			"ReadBy": [
				"Function/Route/Integration.ts",
				"Layout/Base.astro",
				"Test/Route/Blog.test.ts",
				"Test/Route/EndToEnd.test.ts",
				"Test/Route/Integration.test.ts",
				"Test/Route/Map.test.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Route/Normalize.ts",
			"Kind": "function",
			"Carries": "Path normalization shared between service worker, 404 page, and build-time route map generation.",
			"Lines": 57,
			"Readers": 1,
			"ReadBy": ["Test/Route/Register.test.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Policy.ts",
			"Kind": "function",
			"Carries": "Exports RouteWorkerPolicy, PublicRoutes.",
			"Lines": 139,
			"Readers": 2,
			"ReadBy": ["Function/Route/Register.ts", "Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Redirect.ts",
			"Kind": "function",
			"Carries": "Layer 3 fallback - client-side redirect for 404 page.",
			"Lines": 66,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Route/Register.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 225,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Route/Registry.ts",
			"Kind": "function",
			"Carries": "The route registry - the site's route set, in one file.",
			"Lines": 1024,
			"Readers": 2,
			"ReadBy": ["Function/Route/Map.ts", "Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Route/ServiceWorker.ts",
			"Kind": "function",
			"Carries": "ServiceWorker - route redirector, auth gate, and cache manager.",
			"Lines": 1125,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code.tsx",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 253,
			"Readers": 1,
			"ReadBy": ["Function/Scroll/Layout.astro"],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code/Pixel.tsx",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 177,
			"Readers": 1,
			"ReadBy": ["Function/Scroll/Code.tsx"],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code/Pixel/Animation.ts",
			"Kind": "function",
			"Carries": "Exports Noise, Lerp, Layer, Spectrum.",
			"Lines": 49,
			"Readers": 3,
			"ReadBy": [
				"Function/Scroll/Code/Pixel.tsx",
				"Function/Scroll/Code/Pixel/Dimensional.ts",
				"Function/Scroll/Code/Pixel/Style.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code/Pixel/Animation/Constant.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 30,
			"Readers": 4,
			"ReadBy": [
				"Function/Scroll/Code/Pixel.tsx",
				"Function/Scroll/Code/Pixel/Animation.ts",
				"Function/Scroll/Code/Pixel/Dimensional.ts",
				"Function/Scroll/Code/Pixel/Style.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code/Pixel/Dimensional.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 132,
			"Readers": 1,
			"ReadBy": ["Function/Scroll/Code/Pixel.tsx"],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code/Pixel/Style.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 501,
			"Readers": 1,
			"ReadBy": ["Function/Scroll/Code/Pixel.tsx"],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Code/Ticker.ts",
			"Kind": "function",
			"Carries": "The field's clock.",
			"Lines": 96,
			"Readers": 3,
			"ReadBy": [
				"Function/Scroll/Code.tsx",
				"Function/Scroll/Code/Pixel.tsx",
				"Function/Scroll/Code/Pixel/Style.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Layout.astro",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 12,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Type.ts",
			"Kind": "function",
			"Carries": "Exports Mouse, MovementDimensional, MatrixType, PixelComponent.",
			"Lines": 56,
			"Readers": 5,
			"ReadBy": [
				"Function/Scroll/Code.tsx",
				"Function/Scroll/Code/Pixel.tsx",
				"Function/Scroll/Code/Pixel/Animation.ts",
				"Function/Scroll/Code/Pixel/Dimensional.ts",
				"Function/Scroll/Code/Pixel/Style.ts"
			],
			"Reached": true
		},
		{
			"Path": "Function/Theme/SemanticColor.ts",
			"Kind": "function",
			"Carries": "C17 semantic color system (Daylight Field Record).",
			"Lines": 385,
			"Readers": 2,
			"ReadBy": ["Component/Brand/SemanticLedger.tsx", "Component/Dynamic/Interface/Card/Jelly.ts"],
			"Reached": true
		},
		{
			"Path": "Function/Utility/CN.ts",
			"Kind": "function",
			"Carries": "Exports CN.",
			"Lines": 11,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Utility/CopyCommand.ts",
			"Kind": "function",
			"Carries": "─── Copy command blocks ───────────────────────────────────────────────────── Wires <jelly-icon-button data-copy> buttons (each sitting next to a <pre> in a flex row) to copy th...",
			"Lines": 160,
			"Readers": 3,
			"ReadBy": [
				"Layout/Base.astro",
				"pages/Contributing.astro",
				"pages/License.astro"
			],
			"Reached": true
		},
		{
			"Path": "Generated/Facts/Forms.json",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 234,
			"Readers": 1,
			"ReadBy": ["Library/Index/Register.ts"],
			"Reached": true
		},
		{
			"Path": "Generated/Facts/Modules.json",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 5100,
			"Readers": 1,
			"ReadBy": ["Library/Index/Register.ts"],
			"Reached": true
		},
		{
			"Path": "Generated/Facts/Records.json",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 958,
			"Readers": 1,
			"ReadBy": ["Library/Index/Register.ts"],
			"Reached": true
		},
		{
			"Path": "Generated/Facts/Routes.json",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 542,
			"Readers": 1,
			"ReadBy": ["Library/Index/Register.ts"],
			"Reached": true
		},
		{
			"Path": "Layout/Base.astro",
			"Kind": "layout",
			"Carries": "No leading comment and no exports.",
			"Lines": 396,
			"Readers": 28,
			"ReadBy": [
				"Component/Contact/ContactPage.astro",
				"pages/404.astro",
				"pages/Account/ForgotPassword.astro",
				"pages/Account/ResetPassword.astro",
				"pages/Account/SignIn.astro",
				"pages/Account/SignUp.astro"
			],
			"Reached": true
		},
		{
			"Path": "Library/API/Analytics.ts",
			"Kind": "library",
			"Carries": "Exports AnalyticsAPI.",
			"Lines": 264,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/API/Authentication.ts",
			"Kind": "library",
			"Carries": "Exports AuthAPI.",
			"Lines": 137,
			"Readers": 2,
			"ReadBy": ["Component/Dynamic/AccountPage.tsx", "Component/Dynamic/VerifyPage.tsx"],
			"Reached": true
		},
		{
			"Path": "Library/API/Download.ts",
			"Kind": "library",
			"Carries": "Exports DownloadsAPI.",
			"Lines": 210,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/API/Status.ts",
			"Kind": "library",
			"Carries": "Exports StatusCheck, StatusResponse, StatusAPI.",
			"Lines": 174,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/CodeMentions.ts",
			"Kind": "library",
			"Carries": "The code-mention pass for the CodeEditorLand site - the Aphrodite/Site pattern adapted to the C15 link registry (Source/Library/Links.ts).",
			"Lines": 125,
			"Readers": 2,
			"ReadBy": ["pages/Contributing.astro", "pages/Doc/Rust.astro"],
			"Reached": true
		},
		{
			"Path": "Library/Contact/Data.ts",
			"Kind": "library",
			"Carries": "Data - the Contact hub's index, derived from the purpose table.",
			"Lines": 159,
			"Readers": 6,
			"ReadBy": [
				"Component/Contact/ContactPage.astro",
				"Component/Contact/ContactShell.astro",
				"Component/Contact/Register.ts",
				"Content/Index/Chapters.ts",
				"pages/Contact/Sale.astro",
				"pages/Contact/index.astro"
			],
			"Reached": true
		},
		{
			"Path": "Library/Contact/Purpose.ts",
			"Kind": "library",
			"Carries": "Purpose - what each Contact route is *for*, as data.",
			"Lines": 431,
			"Readers": 9,
			"ReadBy": [
				"Component/Dashboard/Data.ts",
				"Component/Trust/Facts.ts",
				"Content/Edge/Register.ts",
				"Function/OpenGraph/PageMetadata.ts",
				"Function/Route/Registry.ts",
				"Library/Contact/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Library/Contact/Request.ts",
			"Kind": "library",
			"Carries": "Exports IncomeCode, FormField, RequestConfig, Requests.",
			"Lines": 1545,
			"Readers": 8,
			"ReadBy": [
				"Component/Contact/ContactShell.astro",
				"Component/Contact/Register.ts",
				"Component/Dashboard/Data.ts",
				"Component/Dynamic/DynamicContactForm.tsx",
				"Function/OpenGraph/PageMetadata.ts",
				"Library/Contact/Data.ts"
			],
			"Reached": true
		},
		{
			"Path": "Library/Document/Contributing/Data.ts",
			"Kind": "library",
			"Carries": "Contributing - the Contributing page's own rows.",
			"Lines": 167,
			"Readers": 1,
			"ReadBy": ["pages/Contributing.astro"],
			"Reached": true
		},
		{
			"Path": "Library/Document/License/Data.ts",
			"Kind": "library",
			"Carries": "License - the License page's own rows.",
			"Lines": 72,
			"Readers": 1,
			"ReadBy": ["pages/License.astro"],
			"Reached": true
		},
		{
			"Path": "Library/Document/Privacy/Data.ts",
			"Kind": "library",
			"Carries": "Privacy - the Privacy Policy page's own rows.",
			"Lines": 106,
			"Readers": 1,
			"ReadBy": ["pages/Legal/Privacy.astro"],
			"Reached": true
		},
		{
			"Path": "Library/Document/Term/Data.ts",
			"Kind": "library",
			"Carries": "Term - the Terms of Service page's own rows.",
			"Lines": 152,
			"Readers": 1,
			"ReadBy": ["pages/Legal/Term.astro"],
			"Reached": true
		},
		{
			"Path": "Library/Document/WireWells.ts",
			"Kind": "library",
			"Carries": "Wire the copy control inside RecordWell blocks.",
			"Lines": 130,
			"Readers": 3,
			"ReadBy": [
				"Component/Doc/Well.ts",
				"Component/Record/RecordTranscript.astro",
				"Component/Record/RecordWell.astro"
			],
			"Reached": true
		},
		{
			"Path": "Library/I18n/Client.ts",
			"Kind": "library",
			"Carries": "I18n Client - browser-side i18next initialization with lazy namespace loading.",
			"Lines": 682,
			"Readers": 2,
			"ReadBy": ["Component/Layout/LocaleSwitcher.tsx", "Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Library/I18n/Server.ts",
			"Kind": "library",
			"Carries": "Exports GetI18n.",
			"Lines": 175,
			"Readers": 35,
			"ReadBy": [
				"Component/Doc/DocIndex.astro",
				"Component/Doc/DocLayout.astro",
				"Component/Home/ArchitectureBand.astro",
				"Component/Home/FeatureBand.astro",
				"Component/Home/PlatformBand.astro",
				"Component/Home/RoadmapBand.astro"
			],
			"Reached": true
		},
		{
			"Path": "Library/Index/Register.ts",
			"Kind": "library",
			"Carries": "Register - the reader for the generated facts behind `/Contents`.",
			"Lines": 344,
			"Readers": 4,
			"ReadBy": [
				"Component/UI/Palette/Data.ts",
				"Content/Index/Page.ts",
				"pages/Contents.astro",
				"pages/Specimen.astro"
			],
			"Reached": true
		},
		{
			"Path": "Library/Interface/AnalyticsEvent.ts",
			"Kind": "library",
			"Carries": "Exports AnalyticsEvent.",
			"Lines": 14,
			"Readers": 2,
			"ReadBy": ["Library/API/Analytics.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/APIResponse.ts",
			"Kind": "library",
			"Carries": "Exports APIResponse.",
			"Lines": 10,
			"Readers": 2,
			"ReadBy": ["Library/Interface/PaginatedResponse.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/Download.ts",
			"Kind": "library",
			"Carries": "Exports Download.",
			"Lines": 24,
			"Readers": 2,
			"ReadBy": ["Library/API/Download.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/DownloadEvent.ts",
			"Kind": "library",
			"Carries": "Exports DownloadEvent.",
			"Lines": 20,
			"Readers": 2,
			"ReadBy": ["Library/API/Download.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/GitHubActionRun.ts",
			"Kind": "library",
			"Carries": "Exports GitHubActionRun.",
			"Lines": 38,
			"Readers": 2,
			"ReadBy": ["Library/API/Status.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/GitHubCommit.ts",
			"Kind": "library",
			"Carries": "Exports GitHubCommit.",
			"Lines": 30,
			"Readers": 2,
			"ReadBy": ["Library/API/Status.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/GitHubIssue.ts",
			"Kind": "library",
			"Carries": "Exports GitHubIssue.",
			"Lines": 38,
			"Readers": 2,
			"ReadBy": ["Library/API/Status.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/PaginatedResponse.ts",
			"Kind": "library",
			"Carries": "Exports PaginatedResponse.",
			"Lines": 12,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/Interface/Session.ts",
			"Kind": "library",
			"Carries": "Exports Session.",
			"Lines": 12,
			"Readers": 2,
			"ReadBy": ["Library/API/Authentication.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Interface/User.ts",
			"Kind": "library",
			"Carries": "Exports User.",
			"Lines": 22,
			"Readers": 2,
			"ReadBy": ["Library/API/Authentication.ts", "Library/WorkerClient.ts"],
			"Reached": true
		},
		{
			"Path": "Library/LinkIndex.ts",
			"Kind": "library",
			"Carries": "The runtime link index for the markdown pass - the full term -> URL map, split (Phase 3f) into one granular file per unique composed URL under ./LinkIndex/, NESTED by repo famil...",
			"Lines": 76,
			"Readers": 3,
			"ReadBy": [
				"Function/Markdown/CodeMentions.ts",
				"Library/CodeMentions.ts",
				"Library/LinkMatcher.ts"
			],
			"Reached": true
		},
		{
			"Path": "Library/LinkMatcher.ts",
			"Kind": "library",
			"Carries": "The compiled matcher cache for the link passes - the \"cache inside ./WebSite/\".",
			"Lines": 145,
			"Readers": 3,
			"ReadBy": [
				"Function/Markdown/CodeMentions.ts",
				"Library/CodeMentions.ts",
				"Test/Markdown/CodeMentions.test.ts"
			],
			"Reached": true
		},
		{
			"Path": "Library/Links.ts",
			"Kind": "library",
			"Carries": "The canonical link registry for the CodeEditorLand site - the single source for every internal route and external URL the pages emit.",
			"Lines": 253,
			"Readers": 1336,
			"ReadBy": [
				"Content/Record/Air.ts",
				"Content/Record/Cocoon.ts",
				"Content/Record/Common.ts",
				"Content/Record/Echo.ts",
				"Content/Record/Grove.ts",
				"Content/Record/Land.ts"
			],
			"Reached": true
		},
		{
			"Path": "Library/Theme/index.ts",
			"Kind": "library",
			"Carries": "No leading comment and no exports.",
			"Lines": 8,
			"Readers": 5,
			"ReadBy": [
				"Component/Dynamic/DynamicAccountProfile.tsx",
				"Component/Dynamic/DynamicDashboardUser.tsx",
				"Component/Dynamic/DynamicLocalFirstScan.tsx",
				"Component/Dynamic/DynamicPortal.tsx",
				"Footer.tsx"
			],
			"Reached": true
		},
		{
			"Path": "Library/Theme/ThemeIcon.tsx",
			"Kind": "library",
			"Carries": "Exports ThemeIconProps, ThemeIcon.",
			"Lines": 40,
			"Readers": 1,
			"ReadBy": ["Library/Theme/index.ts"],
			"Reached": true
		},
		{
			"Path": "Library/Theme/ThemeImage.tsx",
			"Kind": "library",
			"Carries": "Exports ThemeImageProps, ThemeImage.",
			"Lines": 46,
			"Readers": 1,
			"ReadBy": ["Library/Theme/index.ts"],
			"Reached": true
		},
		{
			"Path": "Library/WorkerClient.ts",
			"Kind": "library",
			"Carries": "WorkerClient - typed HTTP client for all Cloudflare Worker APIs.",
			"Lines": 1142,
			"Readers": 6,
			"ReadBy": [
				"Component/Provider/AnalyticsProvider.tsx",
				"Library/API/Analytics.ts",
				"Library/API/Authentication.ts",
				"Library/API/Download.ts",
				"Library/API/Status.ts",
				"Test/Library/WorkerClient.test.ts"
			],
			"Reached": true
		},
		{
			"Path": "pages/404.astro",
			"Kind": "route",
			"Carries": "The 404: the canonical small record (`DesignSystem-Pages.md` §3), and the site's second plate page.",
			"Lines": 225,
			"Readers": 1,
			"ReadBy": ["Test/Page/NotFound.test.ts"],
			"Reached": true
		},
		{
			"Path": "pages/Account/ForgotPassword.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 43,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Account/index.astro",
			"Kind": "route",
			"Carries": "Account - the account workspace.",
			"Lines": 187,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Account/ResetPassword.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 43,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Account/SignIn.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 54,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Account/SignUp.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 52,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Blog.astro",
			"Kind": "route",
			"Carries": "The blog index: what exists, newest first.",
			"Lines": 134,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Blog/[Slug].astro",
			"Kind": "route",
			"Carries": "One article, on the reading surface.",
			"Lines": 150,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Compare.astro",
			"Kind": "route",
			"Carries": "Compare - Land against the editor it replaces, in the site's own words.",
			"Lines": 275,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Amend.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Claim.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Deals.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Erase.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Guard.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Hails.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/index.astro",
			"Kind": "route",
			"Carries": "The Contact hub - the desk's register: one index of request routes.",
			"Lines": 192,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Leave.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Legal.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Lodge.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Pause.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Query.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Reach.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Sale.astro",
			"Kind": "route",
			"Carries": "Enterprise inquiries - the sale route, read as a READING page.",
			"Lines": 357,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contact/Scout.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 6,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contents.astro",
			"Kind": "route",
			"Carries": "Contents - the index.",
			"Lines": 574,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Contributing.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 673,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Dashboard.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 627,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Doc.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 195,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Doc/[...Slug].astro",
			"Kind": "route",
			"Carries": "Exports getStaticPaths.",
			"Lines": 359,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Doc/Rust.astro",
			"Kind": "route",
			"Carries": "The Rust API surface, composed as a WORKSPACE.",
			"Lines": 255,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Download.astro",
			"Kind": "route",
			"Carries": "Download - the installation contract: can I install this today, and if not, what can I do instead? The page is one artifact, opened by the keeper masthead: 1.",
			"Lines": 238,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Glossary.astro",
			"Kind": "route",
			"Carries": "Glossary - the document's own words: the fifteen elements, the grammar's nouns, and the five words this site retired.",
			"Lines": 231,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/index.astro",
			"Kind": "route",
			"Carries": "The home page - the opening spread of the dossier, and four parts after it.",
			"Lines": 273,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Legal/Privacy.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 916,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Legal/Term.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 993,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/License.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 459,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Motion.astro",
			"Kind": "route",
			"Carries": "Motion - the register: what this paper moves, why, and what it refuses to.",
			"Lines": 476,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/OAuth/Success.astro",
			"Kind": "route",
			"Carries": "No leading comment and no exports.",
			"Lines": 348,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/OpenGraph.svg.ts",
			"Kind": "route",
			"Carries": "Home page OpenGraph SVG endpoint.",
			"Lines": 253,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/OpenGraph/[...Slug].svg.ts",
			"Kind": "route",
			"Carries": "OpenGraph SVG image endpoint.",
			"Lines": 213,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Portal.astro",
			"Kind": "route",
			"Carries": "Portal - the authentication gateway, in the baseline's three movements.",
			"Lines": 356,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Specimen.astro",
			"Kind": "route",
			"Carries": "The specimen sheet: the document's own parts, printed.",
			"Lines": 522,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Status.astro",
			"Kind": "route",
			"Carries": "Status - the status board.",
			"Lines": 283,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Verify.astro",
			"Kind": "route",
			"Carries": "Verify - the verification link, composed as an AUDIT.",
			"Lines": 228,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "pages/Visit.astro",
			"Kind": "route",
			"Carries": "─── Visit - Universal Dispatch Center ─────────────────────────────────────── This page is the catch-all landing target for ALL unresolved paths on Cloudflare Pages.",
			"Lines": 285,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Script/Firebase.ts",
			"Kind": "script",
			"Carries": "No leading comment and no exports.",
			"Lines": 13,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Script/Motion/Handover.ts",
			"Kind": "script",
			"Carries": "Handover - the direction of a page change, printed on `<html>`.",
			"Lines": 72,
			"Readers": 1,
			"ReadBy": ["Script/Motion/Index.ts"],
			"Reached": true
		},
		{
			"Path": "Script/Motion/Index.ts",
			"Kind": "script",
			"Carries": "Motion - the client half of the motion layer.",
			"Lines": 63,
			"Readers": 1,
			"ReadBy": ["Layout/Base.astro"],
			"Reached": true
		},
		{
			"Path": "Script/Motion/Origin.ts",
			"Kind": "script",
			"Carries": "Origin - the command palette's lean, from the direction it was invoked.",
			"Lines": 119,
			"Readers": 1,
			"ReadBy": ["Script/Motion/Index.ts"],
			"Reached": true
		},
		{
			"Path": "Script/Motion/Sort.ts",
			"Kind": "script",
			"Carries": "Sort - a matrix re-ordering, as a view transition.",
			"Lines": 150,
			"Readers": 1,
			"ReadBy": ["Script/Motion/Index.ts"],
			"Reached": true
		},
		{
			"Path": "Script/Register.ts",
			"Kind": "script",
			"Carries": "Register - the index's generator.",
			"Lines": 934,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Type/JellyUI.d.ts",
			"Kind": "type",
			"Carries": "No leading comment and no exports.",
			"Lines": 278,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Variable/JellyUIVersion.ts",
			"Kind": "variable",
			"Carries": "Auto-generated by BuildJellyUIVendor.sh - do not edit.",
			"Lines": 3,
			"Readers": 1,
			"ReadBy": ["pages/Contents.astro"],
			"Reached": true
		},
		{
			"Path": "Variable/Scroll/Matrix.ts",
			"Kind": "variable",
			"Carries": "No leading comment and no exports.",
			"Lines": 520,
			"Readers": 1,
			"ReadBy": ["Function/Scroll/Code.tsx"],
			"Reached": true
		}
	],
	Orphans: [
		{
			"Path": "Background.tsx",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 92,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Component/Brand/FieldRecord.astro",
			"Kind": "component",
			"Carries": "FieldRecord - canonical record-card template.",
			"Lines": 138,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Brand/SpecimenLabel.tsx",
			"Kind": "component",
			"Carries": "Exports SpecimenLabelProps.",
			"Lines": 183,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/DynamicFooter.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 191,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/DynamicHeader.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 90,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/DynamicVerificationInfo.tsx",
			"Kind": "component",
			"Carries": "No leading comment and no exports.",
			"Lines": 242,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Platform/Data.ts",
			"Kind": "component",
			"Carries": "Data - the columns, rows and source lines of the platform matrix.",
			"Lines": 115,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Roadmap/Data.ts",
			"Kind": "component",
			"Carries": "Data - every row, label and derivation the roadmap band prints.",
			"Lines": 212,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Type/Route/Account.ts",
			"Kind": "component",
			"Carries": "Exports Type.",
			"Lines": 4,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Component/Dynamic/Type/Route/Verify.ts",
			"Kind": "component",
			"Carries": "Exports Type.",
			"Lines": 4,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "content.config.ts",
			"Kind": "other",
			"Carries": "content.config.ts - the entry point Astro loads.",
			"Lines": 14,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Footer.tsx",
			"Kind": "other",
			"Carries": "No leading comment and no exports.",
			"Lines": 100,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Function/Configuration/ServiceWorker.ts",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 4,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Route/Redirect.ts",
			"Kind": "function",
			"Carries": "Layer 3 fallback - client-side redirect for 404 page.",
			"Lines": 66,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Route/ServiceWorker.ts",
			"Kind": "function",
			"Carries": "ServiceWorker - route redirector, auth gate, and cache manager.",
			"Lines": 1125,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Scroll/Layout.astro",
			"Kind": "function",
			"Carries": "No leading comment and no exports.",
			"Lines": 12,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Function/Utility/CN.ts",
			"Kind": "function",
			"Carries": "Exports CN.",
			"Lines": 11,
			"Readers": 0,
			"ReadBy": [],
			"Reached": true
		},
		{
			"Path": "Library/API/Analytics.ts",
			"Kind": "library",
			"Carries": "Exports AnalyticsAPI.",
			"Lines": 264,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/API/Download.ts",
			"Kind": "library",
			"Carries": "Exports DownloadsAPI.",
			"Lines": 210,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/API/Status.ts",
			"Kind": "library",
			"Carries": "Exports StatusCheck, StatusResponse, StatusAPI.",
			"Lines": 174,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Library/Interface/PaginatedResponse.ts",
			"Kind": "library",
			"Carries": "Exports PaginatedResponse.",
			"Lines": 12,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		},
		{
			"Path": "Script/Register.ts",
			"Kind": "script",
			"Carries": "Register - the index's generator.",
			"Lines": 934,
			"Readers": 0,
			"ReadBy": [],
			"Reached": false
		}
	],
	Totals: {
		"Files": 2378,
		"Routes": 43,
		"Documents": 81,
		"Entries": 8,
		"Elements": 15,
		"Blocks": 21,
		"Modules": 448,
		"Read": 380,
		"Declared": 22
	}
};
var Records_default = {
	_Generated: {
		"By": "Source/Script/Register.ts",
		"From": ["Source/**"],
		"Transform": ["Facts"],
		"Note": "One row per record head the tree prints: the `# NAME_NN` literal, the modules that print it, and the routes whose import tree reaches them.",
		"Rule": "Generated. Change the tree or the page, then run `node Source/Script/Register.ts` - never this file."
	},
	Records: [
		{
			"Id": "ACCESS_01",
			"File": "pages/Account/index.astro",
			"Files": ["pages/Account/index.astro"],
			"Routes": ["/Account"]
		},
		{
			"Id": "ACCOUNT_01",
			"File": "pages/Account/index.astro",
			"Files": ["pages/Account/index.astro"],
			"Routes": ["/Account"]
		},
		{
			"Id": "AIR_01",
			"File": "Content/Record/Air.ts",
			"Files": ["Content/Record/Air.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "ARCHIVE_01",
			"File": "Component/Record/RecordArchive.astro",
			"Files": ["Component/Record/RecordArchive.astro"],
			"Routes": ["/Contents", "/Doc"]
		},
		{
			"Id": "AUDIT_02",
			"File": "pages/Verify.astro",
			"Files": ["pages/Verify.astro"],
			"Routes": ["/Verify"]
		},
		{
			"Id": "AUDIT_05",
			"File": "pages/Status.astro",
			"Files": ["pages/Status.astro"],
			"Routes": ["/Status"]
		},
		{
			"Id": "COCOON_01",
			"File": "Content/Record/Cocoon.ts",
			"Files": ["Content/Record/Cocoon.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "COMMON_01",
			"File": "Content/Record/Common.ts",
			"Files": ["Content/Record/Common.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "DASHBOARD_02",
			"File": "pages/Dashboard.astro",
			"Files": ["pages/Dashboard.astro"],
			"Routes": ["/Dashboard"]
		},
		{
			"Id": "ECHO_01",
			"File": "Content/Record/Echo.ts",
			"Files": ["Content/Record/Echo.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "FRAME_01",
			"File": "Content/Layout/Rust.ts",
			"Files": ["Content/Layout/Rust.ts"],
			"Routes": ["/Doc/Rust"]
		},
		{
			"Id": "GROVE_01",
			"File": "Content/Record/Grove.ts",
			"Files": ["Content/Record/Grove.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "LAND_01",
			"File": "Component/Dynamic/Hero/Data.ts",
			"Files": [
				"Component/Dynamic/Hero/Data.ts",
				"Component/Record/RecordHero.astro",
				"Component/Record/Type.ts",
				"Content/Record/Land.ts",
				"Library/I18n/Locale/En/Home.json"
			],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "MAINTAIN_01",
			"File": "Content/Record/Maintain.ts",
			"Files": ["Content/Record/Maintain.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "MIST_01",
			"File": "Content/Record/Mist.ts",
			"Files": ["Content/Record/Mist.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "MOUNTAIN_01",
			"File": "Component/Dynamic/Architecture/Type.ts",
			"Files": [
				"Component/Dynamic/Architecture/Type.ts",
				"Component/Record/Type.ts",
				"Content/Record/Mountain.ts"
			],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "OUTPUT_01",
			"File": "Content/Record/Output.ts",
			"Files": ["Content/Record/Output.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "PANE_01",
			"File": "pages/Compare.astro",
			"Files": ["pages/Compare.astro"],
			"Routes": ["/Compare"]
		},
		{
			"Id": "PANE_02",
			"File": "pages/Compare.astro",
			"Files": ["pages/Compare.astro"],
			"Routes": ["/Compare"]
		},
		{
			"Id": "PLATE_01",
			"File": "pages/404.astro",
			"Files": ["pages/404.astro"],
			"Routes": ["/404"]
		},
		{
			"Id": "PLATE_03",
			"File": "pages/OAuth/Success.astro",
			"Files": ["pages/OAuth/Success.astro"],
			"Routes": ["/OAuth/Success"]
		},
		{
			"Id": "PROFILE_01",
			"File": "pages/Account/index.astro",
			"Files": ["pages/Account/index.astro"],
			"Routes": ["/Account"]
		},
		{
			"Id": "READING_04",
			"File": "pages/Contact/Sale.astro",
			"Files": ["pages/Contact/Sale.astro"],
			"Routes": ["/Contact/Sale"]
		},
		{
			"Id": "READING_09",
			"File": "pages/Glossary.astro",
			"Files": ["pages/Glossary.astro"],
			"Routes": ["/Glossary"]
		},
		{
			"Id": "READING_10",
			"File": "pages/Motion.astro",
			"Files": ["pages/Motion.astro"],
			"Routes": ["/Motion"]
		},
		{
			"Id": "REGISTER_01",
			"File": "Content/Layout/Rust.ts",
			"Files": ["Content/Layout/Rust.ts"],
			"Routes": ["/Doc/Rust"]
		},
		{
			"Id": "RELEASE_01",
			"File": "Component/Dynamic/Roadmap/Type.ts",
			"Files": [
				"Component/Dynamic/Roadmap/Type.ts",
				"Component/Home/ReleaseCard.astro",
				"Content/Home/Platform.ts",
				"Content/Home/Roadmap.ts"
			],
			"Routes": [
				"/",
				"/Contents",
				"/Status"
			]
		},
		{
			"Id": "RELEASE_02",
			"File": "Content/Home/Roadmap.ts",
			"Files": ["Content/Home/Roadmap.ts"],
			"Routes": [
				"/",
				"/Contents",
				"/Status"
			]
		},
		{
			"Id": "REST_01",
			"File": "Content/Record/Rest.ts",
			"Files": ["Content/Record/Rest.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "SIDECAR_01",
			"File": "Content/Record/SideCar.ts",
			"Files": ["Content/Record/SideCar.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "SKY_01",
			"File": "Content/Record/Sky.ts",
			"Files": ["Content/Record/Sky.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "SPECIMEN_01",
			"File": "Content/Specimen/Page.ts",
			"Files": ["Content/Specimen/Page.ts"],
			"Routes": ["/Contents", "/Specimen"]
		},
		{
			"Id": "STATUS_01",
			"File": "pages/Status.astro",
			"Files": ["pages/Status.astro"],
			"Routes": ["/Status"]
		},
		{
			"Id": "VERIFY_01",
			"File": "pages/Verify.astro",
			"Files": ["pages/Verify.astro"],
			"Routes": ["/Verify"]
		},
		{
			"Id": "VINE_01",
			"File": "Content/Record/Vine.ts",
			"Files": ["Content/Record/Vine.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "WIND_01",
			"File": "Content/Record/Wind.ts",
			"Files": ["Content/Record/Wind.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "WORKER_01",
			"File": "Content/Record/Worker.ts",
			"Files": ["Content/Record/Worker.ts"],
			"Routes": [
				"/",
				"/404",
				"/Account",
				"/Account/ForgotPassword",
				"/Account/ResetPassword",
				"/Account/SignIn",
				"/Account/SignUp",
				"/Blog",
				"/Blog/:Slug",
				"/Compare",
				"/Contact",
				"/Contact/Amend",
				"/Contact/Claim",
				"/Contact/Deals",
				"/Contact/Erase",
				"/Contact/Guard",
				"/Contact/Hails",
				"/Contact/Leave",
				"/Contact/Legal",
				"/Contact/Lodge",
				"/Contact/Pause",
				"/Contact/Query",
				"/Contact/Reach",
				"/Contact/Sale",
				"/Contact/Scout",
				"/Contents",
				"/Contributing",
				"/Dashboard",
				"/Doc",
				"/Doc/:Slug",
				"/Doc/Rust",
				"/Download",
				"/Glossary",
				"/Legal/Privacy",
				"/Legal/Term",
				"/License",
				"/Motion",
				"/OAuth/Success",
				"/Portal",
				"/Specimen",
				"/Status",
				"/Verify"
			]
		},
		{
			"Id": "WORKSPACE_03",
			"File": "pages/Account/index.astro",
			"Files": ["pages/Account/index.astro"],
			"Routes": ["/Account"]
		},
		{
			"Id": "WORKSPACE_05",
			"File": "pages/Doc/Rust.astro",
			"Files": ["pages/Doc/Rust.astro"],
			"Routes": ["/Doc/Rust"]
		},
		{
			"Id": "WORKSPACE_06",
			"File": "pages/Compare.astro",
			"Files": ["pages/Compare.astro"],
			"Routes": ["/Compare"]
		}
	],
	Totals: { "Records": 40 }
};
// Source/Library/Contact/Data.ts
/**
* The hub's trail. Two crumbs in the site's one breadcrumb grammar
* (`DESIGN.md` §9 Q3): the mono `/LABEL` form, the leading slash the only
* separator, so the strip reads `/HOME  /CONTACT` and no second `/` is drawn
* between the two.
*/
var ContactHubTrail = [{
	label: "/HOME",
	href: "/"
}, { label: "/CONTACT" }];
/**
* The hub prints one sentence per card. A code whose route page carries a
* longer standfirst keeps that longer copy on its own page; the shorter
* sentence the grid prints for it is carried here rather than inherited - the
* grid stays even and nothing the route prints is lost.
*/
var HubSubtitle = { LODGE: "Lodge a formal complaint about how we have handled your personal data under GDPR Article 77." };
/**
* One request as a card: the route's own record, read once.
*
* The slug, the title, the sentence and the href all come from the purpose table
* now - the same record a link elsewhere reads - so a card cannot print one
* purpose and link to a route that answers another.
*/
var EntryOf = (code) => {
	const Record = ContactPurposeFor(code);
	return {
		slug: `/${Record.Code}`,
		title: Record.Title,
		subtitle: HubSubtitle[code] ?? Record.Purpose,
		href: Record.Href
	};
};
/**
* The SALE page as a card.
*
* It is not in the request registry - it is a page, not an income code - so
* there is nothing to derive its title and subtitle from. They are carried here
* verbatim: the grid prints both, and dropping them would lose copy, not
* remove duplication.
*/
var SaleEntry = {
	slug: "/SALE",
	title: "Enterprise Inquiries",
	subtitle: "Contact the Code Editor Land team for enterprise licensing, support, and deployment options.",
	href: ContactPurposeAt("/Contact/Sale").Href
};
/** The hub, in reading order: one flat grid of fourteen records. */
var ContactEntries = [...[
	"AMEND",
	"CLAIM",
	"DEALS",
	"ERASE",
	"GUARD",
	"HAILS",
	"LEAVE",
	"LEGAL",
	"LODGE",
	"PAUSE",
	"QUERY",
	"REACH",
	"SCOUT"
].map(EntryOf), SaleEntry];
/**
* The address that closes the page: the one contact that does not go through a
* form. `Community@PlayForm.Cloud` is a working mailbox, not a placeholder.
*
* It is a link, not an action - an address is not something the page performs -
* so the hub prints it as one quiet line and spends its emphasis nowhere.
*/
var ContactDirect = {
	label: "Prefer email",
	address: "Community@PlayForm.Cloud"
};
// Source/Content/Index/Chapters.ts
/**
* Chapters - how the document is divided, for the index's route register.
*
* A route list is only readable if it is filed. These eight chapters are the
* divisions this site actually has - not a taxonomy invented for the index: each
* one names a job a reader arrives with (decide whether the thing is real, learn
* how it works, get it, act on an account, ask for something, read the terms),
* and every route the build emits belongs to exactly one of them.
*
* Two rules this table keeps:
*
* - **The prefix is matched by segment, never by string.** `/Doc` claims
*   `/Doc/Rust` and `/Doc/:Slug`, and would not claim a future `/Documentation`
*   - which is why the matcher below compares whole segments.
* - **The longest prefix wins.** `/Contact/Sale` is a front-desk page, not a
*   back-matter one, because `/Contact` is longer than the root it also matches;
*   and `/Legal/Term` is back matter on its `/Legal` prefix, which no other
*   chapter claims.
*
* The order of the list is the reading order of the index, not the alphabet:
* a reader moves from the argument to the document to the edition to the
* instruments, and only then to the front desk, the back matter and the traps.
*/
/** The eight chapters, in reading order. */
var Chapters = [
	{
		label: "THE ARGUMENT",
		answers: "What the editor is, on one page: the claim, the architecture, the platform, the road.",
		prefixes: ["/"]
	},
	{
		label: "THE DOCUMENT",
		answers: "How it works, in articles: the reference, the deep dives, the workflows, and the filed entries.",
		prefixes: [
			"/Doc",
			"/Blog",
			"/Glossary"
		]
	},
	{
		label: "THE EDITION",
		answers: "What can be had today, what is still being prepared, and what a build from source takes.",
		prefixes: ["/Download", "/Status"]
	},
	{
		label: "THE INSTRUMENTS",
		answers: "Where a reader acts on their own account: sign in, register, recover, verify, and the portal.",
		prefixes: [
			"/Portal",
			"/Dashboard",
			"/Account",
			"/OAuth",
			"/Verify"
		]
	},
	{
		label: "THE FRONT DESK",
		answers: `Where a reader asks for something: the hub and its ${ContactEntries.length} request routes.`,
		prefixes: ["/Contact"]
	},
	{
		label: "THE BACK MATTER",
		answers: "The licence, the terms, the privacy policy, and the way in for a contributor.",
		prefixes: [
			"/License",
			"/Contributing",
			"/Legal"
		]
	},
	{
		label: "THE TRAPS",
		answers: "Where a wrong address lands: a record that says so, and a trampoline that does not.",
		prefixes: ["/404", "/Visit"]
	},
	{
		label: "THE INDEX",
		answers: "This page: the document's own contents, derived from the tree rather than kept by hand.",
		prefixes: ["/Contents"]
	}
];
/**
* The chapter a route belongs to.
*
* The root prefix is `/` and it claims the root alone, so it never competes with
* a longer prefix: a route matches the longest prefix that claims it, and only
* an unmatched route falls through to the argument - which is where the home page
* itself lives.
*/
var ChapterOf = (Path) => {
	let Best = null;
	let Longest = -1;
	for (const Chapter of Chapters) for (const Prefix of Chapter.prefixes) if ((Prefix === "/" ? Path === "/" : Path === Prefix || Path.startsWith(Prefix + "/")) && Prefix.length > Longest) {
		Longest = Prefix.length;
		Best = Chapter;
	}
	return Best ?? Chapters[0];
};
/** The chapters in reading order, with the routes that belong to each. */
var GroupByChapter = (Routes) => Chapters.map((chapter) => ({
	chapter,
	routes: Routes.filter((Route) => ChapterOf(Route.Path) === chapter)
})).filter((Group) => Group.routes.length > 0);
// Source/Content/Index/Declared.ts
/** The modules the register reports, in the order the band prints them. */
var DeclaredModules$1 = [
	{
		path: "content.config.ts",
		carries: "The framework's entry point for the two content collections.",
		reason: "Astro resolves this file by name, so nothing imports it - it is a door, not a module. It re-exports `Content/Config.ts`, which is where the collections are defined."
	},
	{
		path: "Component/Brand/FieldRecord.astro",
		carries: "The Daylight Field Record template: the record card assembled from its six parts in one file.",
		reason: "It is the orchestrator, and the two compositions that could have used it build the card themselves: `DynamicHeroSection` renders the two-panel pair directly, and `/Portal` composes `FieldRecordDataCard` by hand. Kept as the template the parts were designed against, so the contract is written somewhere other than its call sites."
	},
	{
		path: "Component/Brand/SpecimenLabel.tsx",
		carries: "A record reduced to one label: seal, index, stamp, route and status in a single row.",
		reason: "The React form of the record's own header. Every page that prints one composes it in the record layer instead - `RecordHero` on the index, `SurfaceHead` on the app surfaces, `RecordBand`'s index strip inside a band - so this is the shape the layer was designed from, and nothing mounts it."
	},
	{
		path: "Component/Dynamic/DynamicHeader.tsx",
		carries: "The legacy schema-driven header, reduced to an adapter over `Layout/Header`.",
		reason: "An adapter nothing adapts: every route mounts `Component/Layout/Header` directly. Kept because it is the only written account of the header it replaced - its own bar, its own mobile panel, and a theme toggle on a site with exactly one theme."
	},
	{
		path: "Component/Dynamic/DynamicFooter.tsx",
		carries: "The schema-driven footer: an icon list, a social row and a copyright line.",
		reason: "`Component/Layout/Footer.astro` is the footer every route mounts, and it prints the colophon where this printed an icon row. Kept whole, because it is the record of what the site's closing band was before the colophon."
	},
	{
		path: "Component/Dynamic/DynamicVerificationInfo.tsx",
		carries: "A verification panel: SHA-256 checksums and release signatures, with the copy control for each.",
		reason: "It renders a checksum and a signature for a release, and the build has no published release to verify - `/Download`'s `/POSITION` rail prints `UNAVAILABLE` for CHECKSUM and SIGNATURE instead. Kept as the shape the panel takes on the day one is signed."
	},
	{
		path: "Component/Dynamic/Platform/Data.ts",
		carries: "The columns, rows and source lines of the platform matrix.",
		reason: "Superseded by `Content/Home/Platform.ts`, which `Component/Home/PlatformBand.astro` reads now that the band's copy lives in the content layer. The derivation it documents - a size and a checksum only when a file exists, a signature only when that file is signed - is the one the content module keeps."
	},
	{
		path: "Component/Dynamic/Roadmap/Data.ts",
		carries: "Every row, label and derivation the roadmap band printed.",
		reason: "Superseded by `Content/Home/Roadmap.ts` and `Content/Home/Band.ts`. Kept because its header is the argument for the band's shape - one offer in two states, a ledger per state rather than a matrix across editions - and that argument is written nowhere else."
	},
	{
		path: "Component/Dynamic/Type/Route/Account.ts",
		carries: "The four credential routes as one union: `signin | signup | forgot-password | reset-password`.",
		reason: "A three-line type with no importer: `Component/Auth/Type.ts` declares the frame contract those routes read, and `Auth0Account`'s `Route` prop takes the literal at each call site. Kept because it is the only place the four are listed as one set."
	},
	{
		path: "Component/Dynamic/Type/Route/Verify.ts",
		carries: "The verify route's four arms as one union: `pending | verify | success | failure`.",
		reason: "`/Verify` reads its arms from `Content/Layout/Verify.ts` and its interior from `Auth0AccountGate`, so this union has no importer. Kept as the enumeration the page's own register prints."
	},
	{
		path: "Background.tsx",
		carries: "The React island that animates the canvas images.",
		reason: "The earlier twin of `Background.astro`. `Layout/Base.astro:4` mounts the `.astro` one; this is the implementation it replaced, kept as the reference for the animation rather than deleted."
	},
	{
		path: "Footer.tsx",
		carries: "The pre-programme React footer: an icon list and a copyright line.",
		reason: "Superseded by `Component/Layout/Footer.astro`, which says so in its own header and now prints the record the site closes on. This file is the record of the footer the site had."
	},
	{
		path: "Function/Configuration/ServiceWorker.ts",
		carries: "The build switch that would disable the service worker.",
		reason: "Nothing reads it: `Function/Route/Integration.ts:227` compiles `Function/Route/ServiceWorker.ts` unconditionally. The switch is declared and unwired - recorded here rather than quietly deleted, because wiring it is a build change, not a design one."
	},
	{
		path: "Function/Route/ServiceWorker.ts",
		carries: "The service worker: PascalCase normalisation, the auth gate, and the asset caches.",
		reason: "Read by path, never by an import - `Integration.ts:227` esbuild-transforms this file and writes it to the output as `Worker.js`. Its reader count is zero because no module imports it; the build is what reads it."
	},
	{
		path: "Function/Route/Redirect.ts",
		carries: "The layer-three fallback: fetch `RouteMap.json`, redirect a variant to its canonical.",
		reason: "Nothing mounts it. `Visit.astro` took over unknown paths at the edge, so the 404 no longer asks for the map - the capability is declared and unwired, and it is the reason a wrong address still lands on a record rather than a redirect."
	},
	{
		path: "Function/Scroll/Layout.astro",
		carries: "The specimen host for `Function/Scroll/Code`: a scroll-driven pixel field around a code sample.",
		reason: "The fifteen-element wall replaced the specimen pages that mounted it, so the whole `Scroll/Code` chain now hangs off this one file. Kept as the only caller of that chain."
	},
	{
		path: "Function/Utility/CN.ts",
		carries: "`clsx` plus `tailwind-merge`: the class-string merger.",
		reason: "Every class string in this tree is written whole, so nothing merges. The helper is the shape a component with conditional utilities would call, and it is here for that component rather than for one that exists: a conditional utility is the one case `clsx` and `tailwind-merge` answer that a written class string cannot."
	},
	{
		path: "Library/API/Analytics.ts",
		carries: "The client's analytics adapter: `Track`, `TrackBatch`, and the event contract.",
		reason: "No island tracks an event yet. The adapter is the shape the first one will call, and it is the only place the event contract is written."
	},
	{
		path: "Library/API/Download.ts",
		carries: "The client's downloads adapter: binaries, the version list, one download by identifier.",
		reason: "The Download page reads a build-time manifest instead of fetching, so nothing calls this. It is the reader the page will use when releases are published."
	},
	{
		path: "Library/API/Status.ts",
		carries: "The client's status adapter, with a sixty-second in-memory cache.",
		reason: "The site prints its status from its own records, and a live probe would be a second source for the same fact. The adapter exists for the surface that needs a live reading; nothing needs one today."
	},
	{
		path: "Library/Interface/PaginatedResponse.ts",
		carries: "The paginated arm of `APIResponse`: `total`, `page`, `limit`, `hasMore`.",
		reason: "`WorkerClient` writes those four fields inline at each call site, and its paginated responses carry `events` and `stats` rather than a bare array, so this type does not fit them yet. It is the type the client should converge on, recorded here rather than forced into a shape it does not describe."
	},
	{
		path: "Script/Register.ts",
		carries: "This generator: the script that writes `Source/Generated/Facts/`.",
		reason: "Run by hand - `node Source/Script/Register.ts` - and never imported. A generator a page imported would run inside the build, which is the one thing it must not do."
	}
];
/** The reason for a module, or `null` when this table does not describe it. */
var DeclaredReason = (Path) => DeclaredModules$1.find((Module) => Module.path === Path) ?? null;
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/**
* The routes this build answers on.
*
* `Source/Generated/Facts/Routes.json` is one file for every build, because the
* generator walks `Source/pages/**` and the tree holds the lab's page all year.
* The build is what differs: `/Specimen` is served by `dum Run` and absent from
* the production output (`Function/Configuration/Lab.mjs`), so the archive, the
* chapter counts and every figure counted from this array read the facts through
* the same switch the build uses. A page listed here is a page `Target/` holds -
* that is the rule the index's archive promises, and this is where it is kept.
*/
var Routes = Routes_default.Routes.filter((Route) => Served(Route.Path));
/**
* The hand-kept registry, and where it disagrees with the build.
*
* `Missing` is filtered for the same reason as `Routes`: a path the build does not
* emit cannot be a path the registry fails to declare, and the footnote that
* prints this list names every entry in it.
*/
var Registry = Lab ? Routes_default.Registry : {
	...Routes_default.Registry,
	Missing: Routes_default.Registry.Missing.filter((Path) => Served(Path))
};
var Forms = Forms_default.Forms;
var RecordHeads = Records_default.Records;
var Modules = Modules_default.Modules;
/**
* The document's extent.
*
* `Routes` is recomposed from the array above rather than read from the fact
* file: `Modules.json` counted the tree, and the tree's route count includes the
* lab's page all year. The figure the index prints has to be the number of
* addresses *this build* answers on, so it is the length of the filtered array -
* the same array the archive prints, so the register and the archive cannot
* disagree about how many there are.
*/
var Totals = Lab ? Modules_default.Totals : {
	...Modules_default.Totals,
	Routes: Routes.length
};
/** The modules nothing imports, as the generator found them. */
var Unread = Modules_default.Orphans;
/** The short name a route's marker column prints for a block. */
var ShortName = (Block) => Block.replace(/^Record/, "").toUpperCase();
/**
* A route's marker: the forms its tree mounts, joined by ` + `.
*
* The join is the claim grammar's own (`〈RUST + TAURI〉`), not a separator the
* record layer invented - U+2001 is the site's one separator, and it is too wide
* for a column that holds three short words.
*/
var MarkerOf = (Route) => Route.Forms.length > 0 ? Route.Forms.map(ShortName).join(" + ") : "◎";
/**
* A route's destination.
*
* A dynamic route (`/Doc/:Slug`) has no single address to link, so the row links
* the index it is filed under - the page that lists every one of its addresses.
* A row that linked a literal `:Slug` would be a dead link dressed as a live one.
*/
var HrefOf = (Path) => {
	const Parameter = Path.indexOf(":");
	if (Parameter === -1) return Path;
	return Path.slice(0, Parameter).replace(/\/$/, "") || "/";
};
/** The site's name, as every page's metadata title ends with it. */
var SiteSuffix = /\s*[|\-]\s*Code Editor Land\s*$/;
/**
* A route's one-line note: what the page says it is.
*
* Three sources, in order, and none of them invented here: the contact registry
* for a request route, the page's own metadata title for everything else, and no
* note at all when the page states its title only at render time (`/Doc/:Slug`
* takes its title from the article it renders).
*/
var NoteOf = (Route) => {
	const Request = Route.Path.match(/^\/Contact\/([A-Z]+)$/);
	if (Request) {
		const Code = Request[1];
		const Entry = Requests[Code];
		if (Entry) return Entry.Title;
	}
	const Title = Route.Title.replace(SiteSuffix, "");
	return Title === Route.Path ? void 0 : Title;
};
var RouteGroups = GroupByChapter(Routes);
/**
* The routes that answer on a form, as a count the matrix prints.
*
* `◎` for a type with no block of its own: a person and a licence are ledger
* rows, and a zero would be a claim that the type is nothing rather than a claim
* that it has no form.
*/
var RouteCountFor = (Block) => {
	if (Block === void 0) return "◎";
	const Form = Forms.find((Entry) => Entry.Block === Block);
	return Form ? String(Form.Count) : "◎";
};
/** One fact-carrying module: a data module, a content table, a variable. */
var IsFactModule = (Module) => Module.Readers > 0 && (Module.Kind === "content" || Module.Kind === "variable" || Module.Kind === "library" && /(?:^|\/)Data\.ts$/.test(Module.Path));
/** The module's family, for the archive's group labels: `/CONTENT`, `/LIBRARY`. */
var FamilyOf = (Module) => "/" + Module.Path.split("/")[0].toUpperCase();
Modules.filter(IsFactModule).map((Module) => ({
	Path: Module.Path,
	Carries: Module.Carries,
	Readers: Module.Readers,
	Marker: `${Module.Readers}${Quad}${Module.Readers === 1 ? "READER" : "READERS"}`,
	Group: FamilyOf(Module)
}));
var DeclaredModules = Unread.map((Module) => {
	const Declared = DeclaredReason(Module.Path);
	return {
		Path: Module.Path,
		Carries: Declared?.carries ?? Module.Carries,
		Reason: Declared?.reason ?? Module.Carries,
		Explained: Declared !== null
	};
});
// Source/Component/UI/Palette/Data.ts
/**
* The lab switch: a record's door is resolved from the facts, and the facts name
* a lab route for the parts the specimen sheet prints. A production build does not
* hold that page, so the palette asks the build before it offers the door.
*/
/**
* The palette's register, built once on the server.
*
* ─── ONE SOURCE, TWO CONTROLS ───────────────────────────────────────────────
*
* The manual half is `DocSection[]` - the exact tree `BuildDocSidebar` hands the
* rail. The palette does not read the collection a second way, because two
* readers of one tree eventually disagree about it, and a reader who finds a page
* in the palette and not in the rail (or the reverse) has been told the site is
* two sites.
*
* The part half is `FrameSections` - the same ten the running head prints and the
* frame rail indexes. The palette's `ROUTES` register and the margin rail are the
* same list, so `/03` means one thing everywhere. Five pages are appended beside
* the ten for the same reason: the Rust API, the status board, the lexicon, the
* comparison and the index are served, no part holds them, and a page that is
* in neither the parts nor the manual is a page with no door.
*
* ─── WHY AN ACTION IS A ROW ─────────────────────────────────────────────────
*
* `COPY ADDRESS` is real: clipboard, `COPIED` for 1800 ms - the contract the
* site's wired copy controls use. Nothing else is listed. A palette of commands
* that do not exist is a mockup with a search field on it, and the one honest
* action is worth more than six plausible ones.
*/
var BuildPaletteRegister = (Sections) => {
	const Routes = FrameSections.map((Section) => ({
		Id: `part-${Section.Key}`,
		Label: Section.Label,
		Href: Section.Href,
		Part: Section.Index,
		Kind: "route"
	}));
	Routes.push({
		Id: "part-rust",
		Label: "RUST API",
		Href: "/Doc/Rust",
		Part: "03",
		Kind: "route"
	});
	Routes.push({
		Id: "part-status",
		Label: "STATUS",
		Href: "/Status",
		Part: "02",
		Kind: "route"
	}, {
		Id: "part-glossary",
		Label: "GLOSSARY",
		Href: "/Glossary",
		Part: "03",
		Kind: "route"
	}, {
		Id: "part-compare",
		Label: "COMPARE",
		Href: "/Compare",
		Part: "01",
		Kind: "route"
	});
	Routes.push({
		Id: "part-contents",
		Label: "CONTENTS",
		Href: "/Contents",
		Meta: "/Contents",
		Kind: "route"
	});
	const Doc = Sections.map((Section) => ({
		Id: `doc-${Section.Id}`,
		Label: Section.Label,
		Pages: (Section.Children ?? []).flatMap((Item) => "Children" in Item ? Item.Children.map((Leaf) => ({
			Id: `page-${Leaf.Id}`,
			Label: Leaf.Label,
			Href: `/Doc/${Leaf.Id}`,
			Section: Section.Label,
			Kind: "page"
		})) : [{
			Id: `page-${Item.Id}`,
			Label: Item.Label,
			Href: `/Doc/${Item.Id}`,
			Section: Section.Label,
			Kind: "page"
		}])
	}));
	return {
		Routes,
		Records: RecordHeads.flatMap((Head) => {
			const Static = Head.Routes.filter((Route) => !Route.includes(":") && Served(Route));
			if (Static.length === 0) return [];
			const Href = Static.includes("/") ? "/" : [...Static].sort((A, B) => A.length - B.length || A.localeCompare(B))[0];
			return [{
				Id: `record-${Head.Id.toLowerCase()}`,
				Label: Head.Id,
				Href,
				Section: Static.join(" "),
				Meta: Href,
				Kind: "record"
			}];
		}),
		Terms: Lexicon.flatMap((Run) => Run.terms.map((Entry) => ({
			Id: `term-${Run.key}-${Entry.term.toLowerCase()}`,
			Label: Entry.term,
			Href: `/Glossary#${TermId(Run.key, Entry.term)}`,
			Section: Run.label.replace(/^\//, ""),
			Meta: Run.label.replace(/^\//, ""),
			Kind: "term"
		}))),
		Doc,
		Actions: [{
			Id: "action-copy",
			Label: "COPY ADDRESS",
			Kind: "action"
		}]
	};
};
// Source/Component/UI/Palette/Palette.astro
var $$Palette = createComponent(async ($$result, $$props, $$slots) => {
	const Register = BuildPaletteRegister(BuildDocSidebar((await getCollection("doc")).sort((A, B) => A.data.order - B.data.order)));
	return renderTemplate`${renderComponent($$result, "Palette", Palette, {
		"client:idle": true,
		"Register": Register,
		"client:component-hydration": "idle",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Palette/Palette.tsx",
		"client:component-export": "Palette"
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Palette/Palette.astro", void 0);
// Source/Library/WorkerClient.ts
var PostAuthToServiceWorker = (Token, UserId) => {
	try {
		if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller) return;
		navigator.serviceWorker.controller.postMessage({
			Type: "Auth:Write",
			Token,
			ExpiresAt: Date.now() + 6048e5,
			UserId
		});
	} catch {}
};
var ClearAuthFromServiceWorker = () => {
	try {
		if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller) return;
		navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
	} catch {}
};
var MAX_RETRIES = 3;
var RETRY_DELAY = 1e3;
function Delay(Millisecond) {
	return new Promise((Resolve) => setTimeout(Resolve, Millisecond));
}
function WithRetry(Function, Retries = MAX_RETRIES) {
	return Function().catch(async (Error) => {
		if (Retries > 0) {
			console.warn(`Retrying request... (${Retries} retries left)`, Error.message);
			await Delay(RETRY_DELAY);
			return WithRetry(Function, Retries - 1);
		}
		return {
			success: false,
			error: Error.message
		};
	});
}
function GetAuthToken() {
	try {
		const SessionCookie = document.cookie.split(";").find((Cookie) => Cookie.trim().startsWith("session="));
		if (SessionCookie) return SessionCookie.split("=")[1] ?? null;
	} catch {}
	return localStorage.getItem("session_token");
}
function CreateWorkerClient(BaseURL) {
	const FetchWithAuthentication = async (Endpoint, Option = {}) => {
		const Token = GetAuthToken();
		const Header = {
			"Content-Type": "application/json",
			...Token ? { Authorization: `Bearer ${Token}` } : {},
			...Option.headers
		};
		const Response = await fetch(`${BaseURL}${Endpoint}`, {
			...Option,
			headers: Header
		});
		const Data = await Response.json().catch(() => ({
			success: false,
			error: "Invalid response"
		}));
		if (!Response.ok || !Data.success) return {
			success: false,
			error: Data.error || Data.message || `HTTP ${Response.status}`
		};
		return Data;
	};
	return {
		Authentication: {
			Login: (Email, Password) => WithRetry(() => FetchWithAuthentication("/auth/login", {
				method: "POST",
				body: JSON.stringify({
					email: Email,
					password: Password
				})
			})).then(async (Result) => {
				if (Result.success && Result.data?.session) PostAuthToServiceWorker(Result.data.session.token, Result.data.user.id);
				return Result;
			}),
			Register: (Email, Password, Username, DisplayName) => WithRetry(() => FetchWithAuthentication("/auth/register", {
				method: "POST",
				body: JSON.stringify({
					email: Email,
					password: Password,
					username: Username,
					displayName: DisplayName
				})
			})).then(async (Result) => {
				if (Result.success && Result.data?.session) PostAuthToServiceWorker(Result.data.session.token, Result.data.user.id);
				return Result;
			}),
			Logout: () => WithRetry(() => FetchWithAuthentication("/auth/logout", { method: "POST" })).then((Result) => {
				ClearAuthFromServiceWorker();
				try {
					localStorage.removeItem("session_token");
					document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				} catch {}
				return Result;
			}),
			Refresh: (Token) => WithRetry(() => FetchWithAuthentication("/auth/refresh", {
				method: "POST",
				headers: { Authorization: `Bearer ${Token}` }
			})),
			VerifyEmail: (Token) => WithRetry(() => FetchWithAuthentication(`/auth/verify-email/${Token}`, { method: "GET" })),
			ResendVerification: () => WithRetry(() => FetchWithAuthentication("/auth/resend-verification", { method: "POST" })),
			ForgotPassword: (Email) => WithRetry(() => FetchWithAuthentication("/auth/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email: Email })
			})),
			ResetPassword: (Token, Password) => WithRetry(() => FetchWithAuthentication(`/auth/reset-password/${Token}`, {
				method: "POST",
				body: JSON.stringify({ password: Password })
			})),
			GetSession: () => WithRetry(() => FetchWithAuthentication("/auth/session")),
			OAuth: (Provider) => {
				const RedirectURL = `${BaseURL}/auth/oauth/${Provider}`;
				window.location.href = RedirectURL;
				return Promise.resolve({ success: true });
			},
			HandleOAuthCallback: () => {
				throw new Error("HandleOAuthCallback should not be called as a fetch. OAuth callback redirects to frontend URL with token parameter.");
			}
		},
		Download: {
			GetBinaries: (Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture) Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/downloads${Query ? `?${Query}` : ""}`));
			},
			GetVersionList: (Limit) => {
				const Query = Limit ? `?limit=${Limit}` : "";
				return WithRetry(() => FetchWithAuthentication(`/downloads${Query}`));
			},
			GetDownload: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}`)),
			GetSHA256: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/sha256`)),
			GetSignature: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/signature`)),
			GetInfo: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/info`)),
			GetByVersion: (Version, Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture) Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/downloads/version/${Version}${Query ? `?${Query}` : ""}`));
			},
			GetLatest: (Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture) Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/downloads/latest${Query ? `?${Query}` : ""}`));
			},
			TrackDownload: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/track`, { method: "POST" })),
			GetAnalytics: (Limit, Offset) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				if (Offset) Parameter.append("offset", Offset.toString());
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/analytics/downloads${Query ? `?${Query}` : ""}`));
			}
		},
		Analytics: {
			Track: (Type, Properties = {}) => WithRetry(() => FetchWithAuthentication("/track", {
				method: "POST",
				body: JSON.stringify({
					type: Type,
					properties: Properties
				})
			})),
			TrackBatch: (Events) => WithRetry(() => FetchWithAuthentication("/track/batch", {
				method: "POST",
				body: JSON.stringify({ events: Events })
			})),
			TrackPageView: (Path, Title, Referrer) => WithRetry(() => FetchWithAuthentication("/pageview", {
				method: "POST",
				body: JSON.stringify({
					path: Path,
					title: Title,
					referrer: Referrer
				})
			})),
			GetEvents: (Type, Limit, Offset, StartDate, EndDate) => {
				const Parameter = new URLSearchParams();
				if (Type) Parameter.append("type", Type);
				if (Limit) Parameter.append("limit", Limit.toString());
				if (Offset) Parameter.append("offset", Offset.toString());
				if (StartDate) Parameter.append("start", StartDate);
				if (EndDate) Parameter.append("end", EndDate);
				return WithRetry(() => FetchWithAuthentication(`/events?${Parameter.toString()}`));
			},
			GetEvent: (Id) => WithRetry(() => FetchWithAuthentication(`/events/${Id}`)),
			GetSummary: (Days, Type) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Type) Parameter.append("type", Type);
				return WithRetry(() => FetchWithAuthentication(`/summary?${Parameter.toString()}`));
			},
			GetTimeline: (Days, Type) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Type) Parameter.append("type", Type);
				return WithRetry(() => FetchWithAuthentication(`/timeline?${Parameter.toString()}`));
			},
			GetPageViewStats: (Days, Limit) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/stats/pageviews?${Parameter.toString()}`));
			},
			GetEventStats: (Days) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				return WithRetry(() => FetchWithAuthentication(`/stats/events?${Parameter.toString()}`));
			},
			GetSessionStats: (Days) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				return WithRetry(() => FetchWithAuthentication(`/stats/sessions?${Parameter.toString()}`));
			}
		},
		Status: {
			GetOverallStatus: () => WithRetry(() => FetchWithAuthentication("/status")),
			GetChecks: () => WithRetry(() => FetchWithAuthentication("/status/checks")),
			GetCheck: (Id) => WithRetry(() => FetchWithAuthentication(`/status/checks/${Id}`)),
			GetHistory: (Limit, CheckId) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				if (CheckId) Parameter.append("checkId", CheckId);
				return WithRetry(() => FetchWithAuthentication(`/status/history?${Parameter.toString()}`));
			},
			GetGitHubCommits: (Branch, Limit) => {
				const Parameter = new URLSearchParams();
				if (Branch) Parameter.append("branch", Branch);
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/status/github/commits?${Parameter.toString()}`));
			},
			GetGitHubActions: (Limit) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/status/github/actions?${Parameter.toString()}`));
			},
			GetGitHubIssues: (State, Limit) => {
				const Parameter = new URLSearchParams();
				if (State) Parameter.append("state", State);
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/status/github/issues?${Parameter.toString()}`));
			}
		}
	};
}
var ClientInstance = null;
function GetWorkersClient() {
	if (ClientInstance) return ClientInstance;
	const AuthenticationURL = "http://localhost:8787";
	const DownloadURL = "http://localhost:8788";
	const AnalyticsURL = "http://localhost:8789";
	ClientInstance = {
		Authentication: CreateWorkerClient(AuthenticationURL).Authentication,
		Download: CreateWorkerClient(DownloadURL).Download,
		Analytics: CreateWorkerClient(AnalyticsURL).Analytics,
		Status: CreateWorkerClient(AnalyticsURL).Status
	};
	return ClientInstance;
}
// Source/Component/Provider/AnalyticsProvider.tsx
var AnalyticsContext = createContext(null);
var AnalyticsProvider = ({ children }) => {
	const [Client, SetClient] = useState(null);
	const [Availability, SetAvailability] = useState("PENDING");
	useEffect(() => {
		try {
			SetClient(GetWorkersClient());
			SetAvailability("LIVE");
		} catch {
			SetAvailability("BLOCKED");
		}
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
		identify: Identify,
		available: Availability === "LIVE",
		reason: Availability
	};
	return /* @__PURE__ */ jsx(AnalyticsContext.Provider, {
		value: Value,
		children
	});
};
var UseAnalytics = () => useContext(AnalyticsContext);
// Source/Component/Provider/PageviewTracker.tsx
var Subscribers = /* @__PURE__ */ new Set();
var Installed = false;
var OriginalPushState = null;
var OriginalReplaceState = null;
/** The location the last event was published for, so a mount cannot repeat it. */
var LastPublished = null;
var KeyOf = () => `${window.location.pathname}\u2001${document.title}`;
/** One event for the location the reader is on now. */
var Publish = () => {
	const Path = window.location.pathname;
	const Title = document.title;
	LastPublished = `${Path}\u2001${Title}`;
	for (const Send of Subscribers) Send(Path, Title);
};
/**
* One event for the location, unless it has already been published.
*
* A tracker that mounts after a route change would otherwise send the same
* pageview twice - and a tracker whose effect re-runs (the analytics context's
* value is rebuilt on every provider render) would send it again on every pass.
*/
var PublishOnce = () => {
	if (LastPublished === KeyOf()) return;
	Publish();
};
var Install = () => {
	if (Installed) return;
	Installed = true;
	OriginalPushState = history.pushState;
	OriginalReplaceState = history.replaceState;
	history.pushState = function(...Arguments) {
		OriginalPushState?.apply(this, Arguments);
		Publish();
	};
	history.replaceState = function(...Arguments) {
		OriginalReplaceState?.apply(this, Arguments);
		Publish();
	};
	window.addEventListener("popstate", Publish);
};
var Remove = () => {
	if (!Installed || Subscribers.size > 0) return;
	Installed = false;
	if (OriginalPushState) history.pushState = OriginalPushState;
	if (OriginalReplaceState) history.replaceState = OriginalReplaceState;
	window.removeEventListener("popstate", Publish);
	OriginalPushState = null;
	OriginalReplaceState = null;
};
var PageviewTracker = () => {
	const Analytics = UseAnalytics();
	const [IsMounted, SetIsMounted] = useState(false);
	/** Whether this tracker has already sent the page it mounted on. */
	const HasTrackedReference = useRef(false);
	useEffect(() => {
		SetIsMounted(true);
	}, []);
	useEffect(() => {
		if (!Analytics || !IsMounted) return;
		const Send = (Path, Title) => {
			Analytics.trackPageView(Path, Title).catch((TrackError) => {
				if (process.env.NODE_ENV !== "production") console.error("Failed to track page view:", TrackError);
			});
		};
		Subscribers.add(Send);
		Install();
		if (!HasTrackedReference.current) {
			HasTrackedReference.current = true;
			PublishOnce();
		}
		return () => {
			Subscribers.delete(Send);
			Remove();
		};
	}, [IsMounted, Analytics]);
	return null;
};
// Source/Component/Social/Title.ts
/**
* The site's one document-title pattern.
*
* Every route prints `<page title> | Code Editor Land`, and the pattern is
* applied HERE, once, rather than by each page that appends a suffix and hopes
* they agree. Four title shapes reach this function, and all four leave in the
* one pattern:
*
*   Documentation | Code Editor Land          (the `|` pages)
*   404 - Page Not Found                     (no suffix at all)
*   Code Editor Land | Rust and Tauri …      (the home page, name first)
*   Verify Email - Code Editor Land          (the `-` pages)
*
* The rule is idempotent. A page that already appended the suffix - the contact
* routes build `${Config.Title} | Code Editor Land`, the doc and blog entries do
* the same - keeps exactly one, in the site's separator, so a page and the frame
* cannot produce `Foo | Code Editor Land | Code Editor Land`.
*
* The home page is the one exception: its title LEADS with the record name and
* carries the product's tagline after it, which is the baseline's own form
* (`Target/index.html` at `57c16c23f`). A title that names the site without a
* suffix is left alone.
*/
/** The site name, as the head prints it. */
var SiteName = "Code Editor Land";
/**
* The document title for a page.
*
* @param Raw - the title the page passed, with or without its own suffix
* @returns the title to print, in the site's one pattern
*/
var NormalizeTitle = (Raw, Name = SiteName) => {
	const Trimmed = Raw.trim();
	if (!Trimmed) return Name;
	const Escape = Name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const Suffix = new RegExp(`\\s*[|·—–-]\\s*${Escape}\\s*$`, "i");
	if (Suffix.test(Trimmed)) {
		const Bare = Trimmed.replace(Suffix, "").trim();
		if (!Bare || Bare.toLowerCase() === Name.toLowerCase()) return Name;
		return `${Bare} | ${Name}`;
	}
	if (Trimmed.toLowerCase().includes(Name.toLowerCase())) return Trimmed;
	return `${Trimmed} | ${Name}`;
};
// Source/Component/Social/Tags.ts
/**
* Tags - the document head, as data.
*
* ─── WHY THE HEAD IS A MODULE AND NOT A JSX RETURN ────────────────────────
* A function that builds and prints its tags in the same expression can only be
* read by rendering it, and only inside `<head>` - so the one part of the site a
* reader meets before the page is the one part a specimen sheet cannot print: a
* sheet cannot mount a head in a body.
*
* This module decides; `MetaTags.tsx` renders. The list is the contract, and the
* sheet prints it as a register, so the head's tags are inspectable without a
* browser and a tag added here appears on the sheet with no second edit.
*
* ─── THE TWO ABSENCES THE SHAPE CARRIES ───────────────────────────────────
* A default cannot state an absence: an `image` that fell back to the site's card
* would make a page with no image print `og:image` as the bare origin plus three
* sub-tags describing it, and a `url` that fell back to `""` would print
* `<link rel="canonical" href="">` - a page that canonically lives nowhere. Both
* are absences the shape carries explicitly:
*
*   image: null   omits `og:image`, its three sub-tags and `twitter:image`
*                 together, because they describe one image
*   url: ""       omits the canonical and `og:url` rather than printing an
*                 empty target
*
* ─── ONE OF EACH, AND THE TWO THAT ARE NOT DUPLICATES ─────────────────────
* One canonical, one title, one description per route, one `og:` pair per fact.
* The two `og:locale:alternate` rows are the languages the site publishes, not
* duplicates of `og:locale` (which is the page's own language) - and they are
* `AlternateLocales` here rather than two literals in a JSX block, so the list
* has one home.
*
* `theme-color` is not in this list: the frame writes it once as the field's
* `#F2EDE3` (`Layout/Base.astro`), never `#000000` or `#ffffff`, and there is no
* `prefers-color-scheme` block anywhere - the site has one theme.
*/
/** The languages the site publishes, other than the page's own. */
var AlternateLocales = ["bg", "de"];
/** The default card, used when a caller passes no `image` at all. */
var DefaultImage = "/Favicon/og-image.png";
/** The authors the head credits when a piece does not name one. */
var Organisations = (SiteOrigin) => [
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
/**
* The head's facts, as the list of tags that state them.
*
* @param facts - what the route handed the head
* @returns every tag, in the order the document writes them
*/
var TagsOf = ({ title, description, image, url = "", type = "website", lang = "en", siteName = SiteName, publishedTime, author, noIndex = false }) => {
	const SafeTitle = NormalizeTitle(title || siteName, siteName);
	const SafeDescription = description || "Rust and Tauri editor stack with VS Code API compatibility in progress.";
	/**
	* `undefined` is the default card; `null` and `""` are the absence. A page
	* that has no card says so once, here, and the whole image family follows.
	*/
	const Card = image === void 0 ? DefaultImage : image;
	const HasImage = Card !== null && Card.trim().length > 0;
	const SiteOrigin = url.startsWith("http") ? new URL(url).origin : "";
	const JSONLD = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url,
		description: SafeDescription
	};
	if (type === "article" && publishedTime) JSONLD["datePublished"] = publishedTime;
	JSONLD["author"] = author ? {
		"@type": "Organization",
		name: author
	} : Organisations(SiteOrigin);
	const Tags = [
		{
			kind: "title",
			key: "title",
			value: SafeTitle
		},
		{
			kind: "meta",
			attribute: "name",
			key: "description",
			value: SafeDescription
		},
		{
			kind: "meta",
			attribute: "name",
			key: "author",
			value: "Nikola R. Hristov, Code Editor Land, PlayForm"
		},
		{
			kind: "meta",
			attribute: "name",
			key: "robots",
			value: noIndex ? "noindex, nofollow" : "index, follow"
		}
	];
	/**
	* The canonical is the one link tag, and it is written only when the frame
	* resolved a target: an empty `href` is a claim that the page lives nowhere.
	*/
	if (url.length > 0) Tags.push({
		kind: "link",
		key: "canonical",
		value: url
	});
	Tags.push({
		kind: "meta",
		attribute: "property",
		key: "og:type",
		value: type
	});
	if (url.length > 0) Tags.push({
		kind: "meta",
		attribute: "property",
		key: "og:url",
		value: url
	});
	Tags.push({
		kind: "meta",
		attribute: "property",
		key: "og:title",
		value: SafeTitle
	}, {
		kind: "meta",
		attribute: "property",
		key: "og:description",
		value: SafeDescription
	});
	/**
	* The image family is one image described four times: the URL, the two
	* dimensions and the type. They arrive together or not at all.
	*/
	if (HasImage) {
		const CardURL = Card.startsWith("http") ? Card : `${SiteOrigin}${Card}`;
		Tags.push({
			kind: "meta",
			attribute: "property",
			key: "og:image",
			value: CardURL
		}, {
			kind: "meta",
			attribute: "property",
			key: "og:image:width",
			value: "1200"
		}, {
			kind: "meta",
			attribute: "property",
			key: "og:image:height",
			value: "675"
		}, {
			kind: "meta",
			attribute: "property",
			key: "og:image:type",
			value: Card.endsWith(".svg") ? "image/svg+xml" : "image/png"
		});
	}
	Tags.push({
		kind: "meta",
		attribute: "property",
		key: "og:site_name",
		value: siteName
	}, {
		kind: "meta",
		attribute: "property",
		key: "og:locale",
		value: lang
	}, {
		kind: "meta",
		attribute: "name",
		key: "twitter:card",
		value: "summary_large_image"
	});
	if (url.length > 0) Tags.push({
		kind: "meta",
		attribute: "name",
		key: "twitter:url",
		value: url
	});
	Tags.push({
		kind: "meta",
		attribute: "name",
		key: "twitter:title",
		value: SafeTitle
	}, {
		kind: "meta",
		attribute: "name",
		key: "twitter:description",
		value: SafeDescription
	});
	if (HasImage) {
		const CardURL = Card.startsWith("http") ? Card : `${SiteOrigin}${Card}`;
		Tags.push({
			kind: "meta",
			attribute: "name",
			key: "twitter:image",
			value: CardURL
		});
	}
	Tags.push({
		kind: "meta",
		attribute: "name",
		key: "twitter:site",
		value: "@CodeEditorLand"
	}, {
		kind: "meta",
		attribute: "name",
		key: "twitter:creator",
		value: "@CodeEditorLand"
	});
	/**
	* No `<meta name="viewport">` here. `Layout/Base.astro` writes it once,
	* before this block; a second copy is a duplicate the validator flags and
	* the browser ignores.
	*/
	for (const Locale of AlternateLocales) Tags.push({
		kind: "meta",
		attribute: "property",
		key: "og:locale:alternate",
		value: Locale
	});
	Tags.push({
		kind: "meta",
		attribute: "name",
		key: "format-detection",
		value: "telephone=no"
	}, {
		kind: "jsonld",
		key: "application/ld+json",
		value: JSON.stringify(JSONLD)
	});
	return Tags;
};
// Source/Component/Social/MetaTags.tsx
/**
* The document head - the one place a route's metadata is written.
*
* ─── THE CONTRACT ─────────────────────────────────────────────────────────
* `Layout/Base.astro` owns the shell and passes the route's facts here: the
* title, the description, the card image, the canonical URL, the type, the
* language and the noindex flag. This module is the only writer of `<title>`,
* `<meta name="description">`, `<link rel="canonical">` and the `og:` /
* `twitter:` families, and it writes each of them ONCE:
*
*   - one canonical, and it is the canonical path, not the request URL;
*   - one title, in one pattern (`<page> | Code Editor Land`), normalised here so
*     a page cannot invent a second pattern by passing its own suffix;
*   - one description per route, from the page or the frame's default;
*   - one `og:` pair per fact - `og:title`/`og:description`/`og:url`/`og:image`
*     each appear once, and `og:image:*` describes the one image;
*   - NO `<meta name="viewport">`: the frame writes it (`Base.astro`), and a
*     second copy in the head is a duplicate the validator flags.
*
* ─── THIS FILE RENDERS; `Tags.ts` DECIDES ────────────────────────────────
* The list of tags is `TagsOf()`'s, and it is data: the specimen sheet prints it
* as a register, so the head's contract is inspectable without a browser. This
* file's whole job is to turn that list into elements - which is what lets the
* head express two absences a JSX return cannot: no card image (the `og:image`
* family is omitted rather than pointed at nothing) and no canonical target (no
* `href=""`).
*
* The two `og:locale:alternate` rows are the languages the site publishes, not
* duplicates of `og:locale` (which is the page's own language).
*/
var MetaTags_default = (Facts) => {
	const Tags = TagsOf(Facts);
	return /* @__PURE__ */ jsx(Fragment$1, { children: Tags.map((Tag, Index) => Tag.kind === "title" ? /* @__PURE__ */ jsx("title", { children: Tag.value }, `title:${Index}`) : Tag.kind === "link" ? /* @__PURE__ */ jsx("link", {
		rel: Tag.key,
		href: Tag.value
	}, `link:${Tag.key}:${Index}`) : Tag.kind === "jsonld" ? /* @__PURE__ */ jsx("script", {
		type: Tag.key,
		dangerouslySetInnerHTML: { __html: Tag.value }
	}, `jsonld:${Index}`) : /* @__PURE__ */ jsx("meta", {
		[Tag.attribute ?? "name"]: Tag.key,
		content: Tag.value
	}, `meta:${Tag.attribute}:${Tag.key}:${Index}`)) });
};
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const RawPath = Astro.url.pathname === "/" ? "/" : Astro.url.pathname.replace(/\/$/, "");
	const CanonicalPath = CanonicalizePath(RawPath);
	const SiteOrigin = Astro.site ?? Astro.url.origin;
	const { Title, Description, Language = "en", Direction = "ltr", Image, Url, Type = "website", NoIndex = false } = Astro.props;
	const CanonicalURL = ClaimsPath(CanonicalPath) ? new URL(CanonicalPath, SiteOrigin).href : Url ?? Astro.url.href;
	const OpenGraphSlug = CanonicalPath === "/" ? "" : CanonicalPath.replace(/^\//, "");
	const SectionSlug = OpenGraphSlug.includes("/") ? OpenGraphSlug.slice(0, OpenGraphSlug.indexOf("/")) : "";
	const DefaultOpenGraphImage = OpenGraphSlug === "" || OpenGraphSlug in PageMetadata || CanonicalPath.startsWith("/Doc/") || CanonicalPath.startsWith("/Blog/") ? OpenGraphSlug ? `/OpenGraph/${OpenGraphSlug}.svg` : "/OpenGraph.svg" : SectionSlug && SectionSlug in PageMetadata ? `/OpenGraph/${SectionSlug}.svg` : "/OpenGraph.svg";
	const ResolvedImage = Image ?? DefaultOpenGraphImage;
	const T = GetI18n();
	const FrameSection = FrameSectionOf(RawPath);
	const LayoutSpec = LanguageOf(RawPath);
	return renderTemplate`<html${addAttribute(Language, "lang")}${addAttribute(Direction, "dir")}${addAttribute(FrameSection.Key, "data-section")}${addAttribute(LayoutSpec.key, "data-layout")}> <head><meta charset="utf-8">${renderComponent($$result, "MetaTags", MetaTags_default, {
		"title": Title || T("meta.title", { defaultValue: "Land" }),
		"description": Description || T("meta.description", { defaultValue: "Code Editor" }),
		"image": ResolvedImage,
		"url": CanonicalURL,
		"type": Type,
		"lang": Language,
		"noIndex": NoIndex
	})}<meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#F2EDE3"><!-- Fonts: the site's own two files, preloaded. The \`@font-face\` rules are
		 in \`Stylesheet/System/Type/_Face.scss\` and the decision to ship the face
		 rather than name a fallback is written at \`--FontMono\` in \`_Token.scss\`;
		 this is only the fetch, and it has no third-party origin to preconnect to.

		 BOTH weights, not just the body: 500 is the system's weight ceiling - every
		 label, every register, every heading, the header nav and the fourth mark of
		 the current-item vocabulary - so a page that preloaded only the 400 would
		 paint its first screen at one weight and then change the weight of the text
		 the reader is already reading.

		 \`crossorigin\` is required even though the file is same-origin: a font fetch
		 is a CORS request, and a preload without it does not match the face's own
		 fetch - the browser downloads the file twice and discards the preload. --><link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/Font/IBM-Plex-Mono/IBMPlexMono-Regular.woff2" crossorigin=\"anonymous\"><link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/Font/IBM-Plex-Mono/IBMPlexMono-Medium.woff2" crossorigin=\"anonymous\"><link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/Font/Land-Symbol/LandSymbol-Medium.woff2" crossorigin=\"anonymous\"><style>
			/* Mermaid diagrams render ink-on-white via the Base.css token
			   overrides (var(--CardForeground) / var(--Card)) - no invert
			   filter on the daylight canvas. */
		</style><script crossorigin=\"anonymous\">
			/*
			 * Density, before first paint.
			 *
			 * The matrix control writes \`data-density\` on <html> and remembers the
			 * choice in localStorage; this line applies the remembered value before
			 * the sheet paints, so a reader who chose compact never sees a page
			 * arrive comfortable and then jump. Five lines, no framework, and the
			 * page is complete without it: the attribute's absence is the
			 * comfortable default the site is built at.
			 */
			try {
				var Density = localStorage.getItem("land:density");
				if (Density === "compact")
					document.documentElement.setAttribute(
						"data-density",
						"compact",
					);
			} catch (Error) {
				/* Storage refused: the density holds for this visit, in the control. */
			}
		<\/script><script crossorigin=\"anonymous\">
			/*
			 * The clipboard gate, before first paint - and before the element.
			 *
			 * A Jelly host that upgrades inside \`display: none\` has no box: it
			 * builds a 0x0 canvas and no physics body, parks itself out of the
			 * shared loop, and is inert under the pointer for the rest of the
			 * session while looking perfectly correct at rest. So the copy
			 * controls (\`.record-well__copy\`, \`.record-transcript__copy\`) ship
			 * VISIBLE in the markup and their sheets hide them until this line
			 * un-gates them - which happens while the document is still being
			 * parsed, before any module (the Jelly bundle included) can upgrade
			 * them. \`is:inline\` is the whole point: a bundled Astro script is
			 * deferred, and deferred is already too late.
			 *
			 * No clipboard, no gate: the controls stay \`display: none\` - absent
			 * from layout and from the tab order rather than dead in it.
			 */
			try {
				if (navigator.clipboard && navigator.clipboard.writeText)
					document.documentElement.setAttribute(
						"data-clipboard",
						"ready",
					);
			} catch (Error) {
				/* No clipboard object (an insecure context): the controls stay absent. */
			}
		<\/script>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=0&lang.ts")}<script crossorigin=\"anonymous\" type="application/ld+json">${unescapeHTML(JSON.stringify({
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
	}))}<\/script>${renderSlot($$result, $$slots["Head"])}<link rel="icon" type="image/png" href="/Favicon/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/Favicon/favicon.svg"><link rel="shortcut icon" href="/Favicon/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="Code Editor Land"><link rel="manifest" href="/Favicon/site.webmanifest">${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=1&lang.ts")}${renderHead($$result)}</head> <body> <a href="#main-content" class="text-primary-fg sr-only fixed left-2 top-2 z-[100] -translate-y-full bg-primary px-4 py-2 font-medium transition-transform focus:not-sr-only focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Ring)]">
Skip to main content
</a> <!--
			The document's second focus-revealed control. The palette's trigger is
			server-rendered inside this island, so it is in the HTML and in the tab
			order before hydration; the chord starts answering on idle. It sits in the
			same corner as the skip link and replaces it on the second Tab, so the two
			never fight for it.
		--> ${renderComponent($$result, "Palette", $$Palette, {})} ${renderComponent($$result, "jelly-theme", "jelly-theme", {
		"id": "JellyTheme",
		"mode": "light"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Background", $$Background, {})} ${renderComponent($$result, "AnalyticsProvider", AnalyticsProvider, {}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageviewTracker", PageviewTracker, {})}  ${renderSlot($$result, $$slots["Header"])} <main id="main-content" class="grow" tabindex="-1"> <!--
						No React error boundary here, on purpose. It was
						\`<ErrorBoundary client:load><slot /></ErrorBoundary>\`
						and it cost two things it could not repay:

						1. It cannot catch anything. The page body reaches a
						   framework component as \`<astro-slot>\` innerHTML, never
						   as React nodes, so \`getDerivedStateFromError\` can
						   never fire for page content and the boundary's "Try
						   again" fallback is unreachable.
						2. It gated every island on the page. Astro's
						   \`astro-island.hydrate()\` returns early when
						   \`parentElement.closest("astro-island[ssr]")\` matches
						   and waits for that ancestor's \`astro:hydrate\` event -
						   and this boundary wrapped the whole of \`<slot />\`, so
						   every island below it waited for a React root that
						   provided no coverage. Measured on
						   \`/Doc/deep-dive-mountain/\`: removing it is what lets
						   the doc rail hydrate on its own directive.
					--> ${renderComponent($$result, "EdgeLeaf", $$EdgeLeaf, {
		"path": RawPath,
		"canonical": CanonicalPath,
		"noIndex": NoIndex,
		"description": Description,
		"section": FrameSection
	})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "EdgeTurn", $$EdgeTurn, { "canonical": CanonicalPath })} </main> ` })} <div id="Footer" class="shrink"> ${renderComponent($$result, "Footer", $$Footer, {})} </div> ` })} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=2&lang.ts")} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=3&lang.ts")} <a class="absolute left-0 top-0 hidden" rel="me" href="https://x.com/CodeEditorLand" aria-hidden="true" tabindex="-1"></a> </body> </html>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro", void 0);
export { $$EdgeTurn as $, Mountain as A, DropdownMenuTrigger as At, CommandGroup as B, DoorContext as Bt, Worker as C, DropdownMenu as Ct, SideCar as D, DropdownMenuSub as Dt, Sky as E, DropdownMenuSeparator as Et, Common as F, SlipFoot as Ft, DialogContent as G, LoadNamespace as Gt, CommandItem as H, UseDoorReturn as Ht, Cocoon as I, SlipLoading as It, DialogTitle as J, ButtonVariants as Jt, DialogDescription as K, FrameSections as Kt, Air as L, SlipNote as Lt, Maintain as M, Segmented as Mt, Grove as N, SlipEmpty as Nt, Rest as O, DropdownMenuSubContent as Ot, Echo as P, SlipError as Pt, Slugify as Q, Command$1 as R, SlipRegister as Rt, TermId as S, Header as St, Vine as T, DropdownMenuItem as Tt, CommandList as U, UseSlipRoot as Ut, CommandInput as V, UseDoorRef as Vt, Dialog as W, UseTriggerGuard as Wt, BuildDocSidebar as X, renderScript as Xt, DialogTrigger as Y, cn as Yt, SectionOrder as Z, createAstro as Zt, Facts as _, LifeOf as _t, HrefOf as a, CountOf as at, RailRows as b, Tone as bt, Registry as c, $$RecordLedger as ct, Routes as d, RegisterCount as dt, $$EdgeLeaf as et, Totals as f, RegisterOf as ft, Bands as g, Life as gt, ContactHubTrail as h, RegisterWindow as ht, DeclaredModules as i, LoadServerNamespace as it, Mist as j, Chord as jt, Output as k, DropdownMenuSubTrigger as kt, RouteCountFor as l, $$Register as lt, ContactEntries as m, RegisterUnavailable as mt, TagsOf as n, $$Folio as nt, MarkerOf as o, LanguageOf as ot, ContactDirect as p, RegisterText as pt, DialogHeader as q, Button as qt, GetWorkersClient as r, GetI18n as rt, NoteOf as s, Languages as st, $$Base as t, $$PrintRecord as tt, RouteGroups as u, Padded as ut, LettersOf as v, LifeTerms as vt, Wind as w, DropdownMenuContent as wt, TermCount as x, $$Mark as xt, Lexicon as y, Row$1 as yt, CommandEmpty as z, Dismissals as zt };
