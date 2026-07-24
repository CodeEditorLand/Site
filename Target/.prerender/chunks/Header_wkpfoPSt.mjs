import { a as cn, i as IconTooltip, o as ThemeImage } from "./Base_DhBMo2T1.mjs";
import React, { useEffect, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import { ChevronDown } from "lucide-react";
import { initReactI18next, useTranslation } from "react-i18next";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import i18n from "i18next";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
//#region Source/Component/UI/Button.tsx
var ButtonVariants = cva("inline-flex items-center justify-center gap-0 whitespace-nowrap select-none touch-manipulation rounded-[var(--RadiusButton)] font-medium transition-[background-color,color,transform] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--Ring)]/40 focus-visible:ring-[2px] aria-invalid:ring-[var(--Destruct)]/20", {
	variants: {
		variant: {
			default: "bg-foreground text-bg hover:bg-foreground/85",
			destructive: "bg-destruct text-destruct-fg hover:bg-destruct/85 focus-visible:ring-[var(--Destruct)]/20",
			outline: "bg-background text-fg hover:bg-mute",
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
			...JellySizeOverride[size ?? "default"],
			...JellyColorOverride[variant]
		},
		...props,
		children
	});
});
Button.displayName = "Button";
//#endregion
//#region Source/Component/UI/ThemeToggle.tsx
/**
* ThemeToggle - switches between the flat-white light theme and the
* cyberpunk terminal-HUD dark theme by toggling the `.dark` class on
* <html>. The pre-paint script in Source/Layout/Base.astro sets the
* initial class (stored preference → OS color scheme) to avoid a flash;
* this control only handles user-driven changes after hydration.
*
* See .claude/skills/land-design/Reference/Theme.md
*/
var SyncPictureSources = (IsDark) => {
	document.querySelectorAll("source[data-theme-dark]").forEach((Source) => {
		Source.media = IsDark ? "all" : "(prefers-color-scheme: dark)";
	});
};
var SyncJellyTheme = (IsDark) => {
	document.querySelectorAll("jelly-theme").forEach((Theme) => {
		Theme.setAttribute("mode", IsDark ? "dark" : "light");
	});
};
var ThemeToggle = ({ ClassName }) => {
	const [IsDark, SetIsDark] = useState(false);
	useEffect(() => {
		const CurrentlyDark = document.documentElement.classList.contains("dark");
		SetIsDark(CurrentlyDark);
		SyncPictureSources(CurrentlyDark);
		SyncJellyTheme(CurrentlyDark);
	}, []);
	const Toggle = () => {
		const Next = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", Next);
		document.documentElement.style.colorScheme = Next ? "dark" : "light";
		try {
			localStorage.setItem("Theme", Next ? "dark" : "light");
		} catch (_) {}
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", Next ? "#0a0a0c" : "#ffffff");
		SyncPictureSources(Next);
		SyncJellyTheme(Next);
		SetIsDark(Next);
	};
	return /* @__PURE__ */ jsxs(Button, {
		variant: "ghost",
		size: "icon",
		onClick: Toggle,
		"aria-label": IsDark ? "Switch to light theme" : "Switch to dark theme",
		title: IsDark ? "Light" : "Dark",
		className: ClassName,
		children: [/* @__PURE__ */ jsx(lucide.Sun, { className: "hidden h-4 w-4 dark:block" }), /* @__PURE__ */ jsx(lucide.Moon, { className: "block h-4 w-4 dark:hidden" })]
	});
};
//#endregion
//#region Source/Library/I18n/Client.ts
/**
* I18n Client - browser-side i18next initialization with lazy namespace loading.
*
* Supports 5 locales (en, bg, de, fr, es) with 10 namespaces loaded on demand.
* Two-phase init: starts with lng:"en", then switches to detected locale
* post-hydration to avoid SSR/client mismatch.
*
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
var CoreNamespaceList = [
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
		import("./Common_Dsgcjlha.mjs"),
		import("./Header_Ckd4vnxH.mjs"),
		import("./Footer_CmwyN3jd.mjs"),
		import("./Meta_DVDrFyO5.mjs")
	]);
	return {
		common: common.default,
		header: header.default,
		footer: footer.default,
		meta: meta.default
	};
};
/**
* Full locale loader: fetches ALL namespaces for a locale.
* Used by SwitchLocale() when changing language at runtime -
* loads both core and page namespaces for the target locale.
*/
var FullLocaleLoader = {
	en: async () => {
		const [blog, common, doc, home, download, account, verify, header, footer, meta] = await Promise.all([
			import("./Blog_DDvf5T0L.mjs"),
			import("./Common_Dsgcjlha.mjs"),
			import("./Doc_IYmJNx56.mjs"),
			import("./Home_u0dm_gjW.mjs"),
			import("./Download_CRTUxiEc.mjs"),
			import("./Account_53dwTIdL.mjs"),
			import("./Verify_u3VfkxmI.mjs"),
			import("./Header_Ckd4vnxH.mjs"),
			import("./Footer_CmwyN3jd.mjs"),
			import("./Meta_DVDrFyO5.mjs")
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
			import("./Blog_BjsTvVU7.mjs"),
			import("./Common_C8ToXEry.mjs"),
			import("./Doc_B-6XXZDZ.mjs"),
			import("./Home_BxDvR1ut.mjs"),
			import("./Download_C7I3S4th.mjs"),
			import("./Account_Dt1cdq-c.mjs"),
			import("./Verify_BHA9M60g.mjs"),
			import("./Header_Dr0lKIIl.mjs"),
			import("./Footer_D1UuT4a8.mjs"),
			import("./Meta_BVsgJiwZ.mjs")
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
			import("./Blog_Deda29I9.mjs"),
			import("./Common_CyK7wEFs.mjs"),
			import("./Doc_Bv-TbO4s.mjs"),
			import("./Home_CFjeVKhq.mjs"),
			import("./Download_DmL8KzU_.mjs"),
			import("./Account_DK8mVJ6n.mjs"),
			import("./Verify_CxVVKJr1.mjs"),
			import("./Header_B-P3N2As.mjs"),
			import("./Footer_J_cacqeo.mjs"),
			import("./Meta_C3YB44cZ.mjs")
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
			import("./Blog_BFGAw5Go.mjs"),
			import("./Common_N1YIpV13.mjs"),
			import("./Doc_DFarme8t.mjs"),
			import("./Home_DvfbqZH4.mjs"),
			import("./Download_CjjYjYiz.mjs"),
			import("./Account_UEEvFG2A.mjs"),
			import("./Verify_DsgiEk2W.mjs"),
			import("./Header_CtzO1tEO.mjs"),
			import("./Footer_CJk5ZcOr.mjs"),
			import("./Meta_BH5WG71J.mjs")
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
			import("./Blog_DLIvKXhA.mjs"),
			import("./Common_DasOZ78B.mjs"),
			import("./Doc_BjBjpGRb.mjs"),
			import("./Home_Bse3SNjI.mjs"),
			import("./Download_DchkNZIN.mjs"),
			import("./Account_Hu2MPJQY.mjs"),
			import("./Verify_CrIEnJxQ.mjs"),
			import("./Header_BedC152h.mjs"),
			import("./Footer_bqc1QyqI.mjs"),
			import("./Meta_B1dtIurx.mjs")
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
	ns: [...CoreNamespaceList],
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
* Switch locale at runtime - loads ALL namespaces for the target locale
* so that every visible section updates its text immediately.
*/
var SwitchLocale = async (Locale) => {
	if (!NamespaceList.every((NS) => i18n.hasResourceBundle(Locale, NS))) AddResources(Locale, await FullLocaleLoader[Locale]());
	await i18n.changeLanguage(Locale);
	document.cookie = `LOCALE=${Locale};path=/;max-age=${3600 * 24 * 365};SameSite=Lax`;
};
//#endregion
//#region Source/Component/UI/DropdownMenu.tsx
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
		"data-slot": "dropdown-menu-content",
		sideOffset,
		className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden flat border bg-popover p-1 text-popover-foreground", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:*:[svg]:!text-destructive outline-hidden relative flex cursor-default select-none items-center gap-2 flat px-2 py-1.5 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:text-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
//#endregion
//#region Source/Component/Layout/LocaleSwitcher.tsx
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
		children: [/* @__PURE__ */ jsxs(DropdownMenuTrigger, {
			className: "flex h-9 items-center gap-1.5 rounded-md bg-card px-3 font-medium text-fg outline-none ring-offset-white hover:bg-mute focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 data-[state=open]:bg-mute",
			"aria-label": "Select language",
			children: [/* @__PURE__ */ jsx("span", { children: LocaleLabel[CurrentLocale] }), /* @__PURE__ */ jsx(ChevronDown, {
				size: 14,
				className: "text-muted transition-transform duration-200 [[data-state=open]_&]:rotate-180"
			})]
		}), /* @__PURE__ */ jsx(DropdownMenuContent, {
			align: "end",
			className: "min-w-[8rem]",
			children: SupportedLocaleList.map((Locale) => /* @__PURE__ */ jsx(DropdownMenuItem, {
				onClick: () => HandleChange(Locale),
				className: Locale === CurrentLocale ? "font-semibold text-fg" : "text-muted",
				children: LocaleLabel[Locale]
			}, Locale))
		})]
	});
};
//#endregion
//#region Source/Component/Layout/Header.tsx
/**
* Icon registry:maps string keys to Lucide components.
* Used by both sub-header and mobile menu.
*/
var IconRegistry = {
	Sparkles: lucide.Sparkles,
	Download: lucide.Download,
	BookOpen: lucide.BookOpen,
	GitFork: lucide.GitFork,
	ExternalLink: lucide.ExternalLink,
	Newspaper: lucide.Newspaper,
	Users: lucide.Users,
	LayoutDashboard: lucide.LayoutDashboard,
	HelpCircle: lucide.HelpCircle,
	LogIn: lucide.LogIn,
	Monitor: lucide.Monitor
};
var Header = ({ Content, AuthSlot }) => {
	const { t: T } = useTranslation("header");
	const [NavMenuOpen, SetNavMenuOpen] = useState(false);
	const [MobileMenuOpen, SetMobileMenuOpen] = useState(false);
	const HeaderData = Content || {
		Logo: { Text: T("logo", "Land") },
		Navigation: [
			{
				Label: T("nav.features", "Features"),
				Href: "/#features"
			},
			{
				Label: T("nav.download", "Download"),
				Href: "/Download"
			},
			{
				Label: T("nav.docs", "Documentation"),
				Href: "/Doc"
			},
			{
				Label: T("nav.github", "GitHub"),
				Href: "https://github.com/CodeEditorLand/Land"
			}
		],
		Actions: [
			{
				Text: T("actions.signIn", "Sign In"),
				Variant: "ghost",
				Size: "default",
				Href: "/Account/SignIn"
			},
			{
				Text: T("actions.editorPortal", "Portal"),
				Variant: "ghost",
				Size: "default",
				Href: "/Portal"
			},
			{
				Text: T("actions.getStarted", "Get Land"),
				Variant: "default",
				Size: "default",
				Href: "/Download",
				Icon: "Download"
			}
		]
	};
	const RenderActionIcon = (IconName, Label, Tooltip) => {
		if (!IconName) return null;
		const Icon = IconRegistry[IconName];
		if (!Icon) return null;
		return /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx(IconTooltip, {
			Label: Tooltip || Label || IconName,
			Icon,
			SizeClass: "h-4 w-4"
		})] });
	};
	const NavLinks = ({ OnClick }) => /* @__PURE__ */ jsx(Fragment$1, { children: HeaderData.Navigation?.map((Link, Index) => /* @__PURE__ */ jsx("a", {
		href: Link.Href,
		className: "StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
		onClick: OnClick,
		...Link.Href.startsWith("http") ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: /* @__PURE__ */ jsx("span", {
			className: "HeaderLinkLabel font-mono text-xs font-medium uppercase tracking-widest",
			children: Link.Label
		})
	}, Index)) });
	const ActionButtons = ({ OnClick, FullWidth }) => /* @__PURE__ */ jsx(Fragment$1, { children: AuthSlot ? /* @__PURE__ */ jsxs(Fragment$1, { children: [AuthSlot, HeaderData.Actions?.filter((Action) => Action.Href !== "/Account/SignIn").map((Action, Index) => {
		const variant = Action.Variant || "default";
		const size = Action.Size || "default";
		const cls = FullWidth ? "StaccatoButton w-full justify-start" : "StaccatoButton";
		if (variant === "ghost" || variant === "link") return /* @__PURE__ */ jsx(Button, {
			variant,
			size,
			className: cls,
			asChild: true,
			children: /* @__PURE__ */ jsxs("a", {
				href: Action.Href,
				onClick: OnClick,
				children: [Action.Text, RenderActionIcon(Action.Icon, Action.Text, Action.Tooltip)]
			})
		}, Index);
		return /* @__PURE__ */ jsxs(Button, {
			variant,
			size,
			className: cls,
			onClick: () => {
				window.location.href = Action.Href;
			},
			children: [Action.Text, RenderActionIcon(Action.Icon, Action.Text, Action.Tooltip)]
		}, Index);
	})] }) : HeaderData.Actions?.map((Action, Index) => {
		const variant = Action.Variant || "default";
		const size = Action.Size || "default";
		const cls = FullWidth ? "StaccatoButton w-full justify-start" : "StaccatoButton";
		if (variant === "ghost" || variant === "link") return /* @__PURE__ */ jsx(Button, {
			variant,
			size,
			className: cls,
			asChild: true,
			children: /* @__PURE__ */ jsxs("a", {
				href: Action.Href,
				onClick: OnClick,
				children: [Action.Text, RenderActionIcon(Action.Icon, Action.Text, Action.Tooltip)]
			})
		}, Index);
		return /* @__PURE__ */ jsxs(Button, {
			variant,
			size,
			className: cls,
			onClick: () => {
				window.location.href = Action.Href;
			},
			children: [Action.Text, RenderActionIcon(Action.Icon, Action.Text, Action.Tooltip)]
		}, Index);
	}) });
	return /* @__PURE__ */ jsxs("header", {
		className: "Header sticky top-0 z-50 w-full",
		role: "banner",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "container mx-auto flex h-16 items-center justify-between px-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ jsxs("a", {
							href: "/",
							className: "StaccatoLogo HeaderLogo flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
							"aria-label": `${HeaderData.Logo?.Text || "Land"} - Go to homepage`,
							children: [/* @__PURE__ */ jsx("div", {
								className: "LogoBox relative flex h-8 w-8 items-center justify-center overflow-hidden",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx(ThemeImage, {
									src: "/Asset/Logo/Glyph/Land.svg",
									alt: "Code Editor Land",
									title: "Code Editor Land",
									width: 32,
									height: 32,
									className: "h-full w-full"
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: HeaderData.Logo?.Text || "Land"
							})]
						}),
						/* @__PURE__ */ jsx("nav", {
							className: "ml-2 hidden items-center lg:flex",
							"aria-label": "Main navigation",
							children: HeaderData.Navigation?.map((Link, Index) => /* @__PURE__ */ jsx("a", {
								href: Link.Href,
								className: "StaccatoNavLink HeaderSubLink relative flex items-center px-4 py-2 text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
								...Link.Href.startsWith("http") ? {
									target: "_blank",
									rel: "noopener noreferrer"
								} : {},
								children: /* @__PURE__ */ jsx("span", {
									className: "HeaderLinkLabel font-mono text-xs font-medium uppercase tracking-widest",
									children: Link.Label
								})
							}, Index))
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "icon",
							className: "hidden md:flex lg:hidden",
							onClick: () => SetNavMenuOpen(!NavMenuOpen),
							"aria-label": "Toggle navigation",
							"aria-expanded": NavMenuOpen,
							children: NavMenuOpen ? /* @__PURE__ */ jsx(lucide.X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(lucide.Menu, { className: "h-5 w-5" })
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "hidden items-center gap-3 md:flex",
						children: [
							/* @__PURE__ */ jsx(ThemeToggle, {}),
							/* @__PURE__ */ jsx(LocaleSwitcher, {}),
							/* @__PURE__ */ jsx(ActionButtons, {})
						]
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "icon",
						className: "md:hidden",
						onClick: () => SetMobileMenuOpen(!MobileMenuOpen),
						"aria-label": "Toggle menu",
						"aria-expanded": MobileMenuOpen,
						children: MobileMenuOpen ? /* @__PURE__ */ jsx(lucide.X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(lucide.Menu, { className: "h-5 w-5" })
					})]
				})]
			}),
			NavMenuOpen && /* @__PURE__ */ jsx("div", {
				className: "NavDropdown hidden bg-card md:block lg:hidden",
				role: "dialog",
				"aria-label": "Navigation menu",
				children: /* @__PURE__ */ jsx("nav", {
					className: "container mx-auto flex flex-col gap-1 px-4 py-4",
					"aria-label": "Site navigation",
					children: /* @__PURE__ */ jsx(NavLinks, { OnClick: () => SetNavMenuOpen(false) })
				})
			}),
			MobileMenuOpen && /* @__PURE__ */ jsx("div", {
				className: "bg-card md:hidden",
				role: "dialog",
				"aria-label": "Mobile navigation menu",
				children: /* @__PURE__ */ jsxs("nav", {
					className: "container mx-auto flex flex-col gap-1 px-4 py-4",
					"aria-label": "Mobile navigation",
					children: [
						/* @__PURE__ */ jsx(NavLinks, { OnClick: () => SetMobileMenuOpen(false) }),
						/* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
						/* @__PURE__ */ jsx("div", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ jsx(LocaleSwitcher, {})
						}),
						/* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
						/* @__PURE__ */ jsx(ActionButtons, {
							OnClick: () => SetMobileMenuOpen(false),
							FullWidth: true
						})
					]
				})
			})
		]
	});
};
//#endregion
export { DropdownMenuSeparator as a, DropdownMenuItem as i, DropdownMenu as n, DropdownMenuTrigger as o, DropdownMenuContent as r, Button as s, Header as t };
