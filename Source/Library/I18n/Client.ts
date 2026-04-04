import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SupportedLocaleList = ["en", "bg", "de", "fr", "es"] as const;
export type SupportedLocale = (typeof SupportedLocaleList)[number];

export const LocaleLabel: Record<SupportedLocale, string> = {
	en: "English",
	bg: "Bulgarian",
	de: "Deutsch",
	fr: "Francais",
	es: "Espanol",
};

const NamespaceList = [
	"blog",
	"common",
	"doc",
	"home",
	"download",
	"account",
	"verify",
	"header",
	"footer",
	"meta",
] as const;

type Namespace = (typeof NamespaceList)[number];

/**
 * Core namespaces loaded eagerly on every page (common UI chrome).
 * Page-specific namespaces (blog, doc, home, download, account, verify)
 * are loaded lazily when a component calls useTranslation("blog") etc.
 */
const CoreNamespaceList: readonly Namespace[] = [
	"common",
	"header",
	"footer",
	"meta",
] as const;

// Page-specific namespaces (blog, doc, home, download, account, verify)
// are defined in PageNamespaceLoader below and loaded on demand.

function DetectLocale(): SupportedLocale {
	if (typeof window === "undefined") return "en";

	const Parameter = new URL(window.location.href).searchParams.get("lng");

	if (Parameter && SupportedLocaleList.includes(Parameter as SupportedLocale))
		return Parameter as SupportedLocale;

	const Cookie = document.cookie.match(/LOCALE=([^;]+)/);

	if (
		Cookie?.[1] &&
		SupportedLocaleList.includes(Cookie[1] as SupportedLocale)
	)
		return Cookie[1] as SupportedLocale;

	return "en";
}

/**
 * Core namespace loader: only common, header, footer, meta.
 * These load eagerly on every page for the global UI chrome.
 */
const CoreLocaleLoader: Record<
	SupportedLocale,
	() => Promise<Partial<Record<Namespace, unknown>>>
> = {
	en: async () => ({
		common: (await import("./Locale/En/Common.json")).default,
		header: (await import("./Locale/En/Header.json")).default,
		footer: (await import("./Locale/En/Footer.json")).default,
		meta: (await import("./Locale/En/Meta.json")).default,
	}),
	bg: async () => ({
		common: (await import("./Locale/Bg/Common.json")).default,
		header: (await import("./Locale/Bg/Header.json")).default,
		footer: (await import("./Locale/Bg/Footer.json")).default,
		meta: (await import("./Locale/Bg/Meta.json")).default,
	}),
	de: async () => ({
		common: (await import("./Locale/De/Common.json")).default,
		header: (await import("./Locale/De/Header.json")).default,
		footer: (await import("./Locale/De/Footer.json")).default,
		meta: (await import("./Locale/De/Meta.json")).default,
	}),
	fr: async () => ({
		common: (await import("./Locale/Fr/Common.json")).default,
		header: (await import("./Locale/Fr/Header.json")).default,
		footer: (await import("./Locale/Fr/Footer.json")).default,
		meta: (await import("./Locale/Fr/Meta.json")).default,
	}),
	es: async () => ({
		common: (await import("./Locale/Es/Common.json")).default,
		header: (await import("./Locale/Es/Header.json")).default,
		footer: (await import("./Locale/Es/Footer.json")).default,
		meta: (await import("./Locale/Es/Meta.json")).default,
	}),
};

/**
 * Page-specific namespace loaders: blog, doc, home, download, account, verify.
 * These are fetched lazily when a page component calls LoadNamespace().
 * Vite resolves each import to a separate chunk fetched only when needed.
 */
const PageNamespaceLoader: Record<
	SupportedLocale,
	Record<string, () => Promise<unknown>>
> = {
	en: {
		blog: async () => (await import("./Locale/En/Blog.json")).default,
		doc: async () => (await import("./Locale/En/Doc.json")).default,
		home: async () => (await import("./Locale/En/Home.json")).default,
		download: async () =>
			(await import("./Locale/En/Download.json")).default,
		account: async () =>
			(await import("./Locale/En/Account.json")).default,
		verify: async () => (await import("./Locale/En/Verify.json")).default,
	},
	bg: {
		blog: async () => (await import("./Locale/Bg/Blog.json")).default,
		doc: async () => (await import("./Locale/Bg/Doc.json")).default,
		home: async () => (await import("./Locale/Bg/Home.json")).default,
		download: async () =>
			(await import("./Locale/Bg/Download.json")).default,
		account: async () =>
			(await import("./Locale/Bg/Account.json")).default,
		verify: async () => (await import("./Locale/Bg/Verify.json")).default,
	},
	de: {
		blog: async () => (await import("./Locale/De/Blog.json")).default,
		doc: async () => (await import("./Locale/De/Doc.json")).default,
		home: async () => (await import("./Locale/De/Home.json")).default,
		download: async () =>
			(await import("./Locale/De/Download.json")).default,
		account: async () =>
			(await import("./Locale/De/Account.json")).default,
		verify: async () => (await import("./Locale/De/Verify.json")).default,
	},
	fr: {
		blog: async () => (await import("./Locale/Fr/Blog.json")).default,
		doc: async () => (await import("./Locale/Fr/Doc.json")).default,
		home: async () => (await import("./Locale/Fr/Home.json")).default,
		download: async () =>
			(await import("./Locale/Fr/Download.json")).default,
		account: async () =>
			(await import("./Locale/Fr/Account.json")).default,
		verify: async () => (await import("./Locale/Fr/Verify.json")).default,
	},
	es: {
		blog: async () => (await import("./Locale/Es/Blog.json")).default,
		doc: async () => (await import("./Locale/Es/Doc.json")).default,
		home: async () => (await import("./Locale/Es/Home.json")).default,
		download: async () =>
			(await import("./Locale/Es/Download.json")).default,
		account: async () =>
			(await import("./Locale/Es/Account.json")).default,
		verify: async () => (await import("./Locale/Es/Verify.json")).default,
	},
};

/**
 * Full locale loader: fetches ALL namespaces for a locale.
 * Used by SwitchLocale() when changing language at runtime —
 * loads both core and page namespaces for the target locale.
 */
const FullLocaleLoader: Record<
	SupportedLocale,
	() => Promise<Record<Namespace, unknown>>
> = {
	en: async () => ({
		blog: (await import("./Locale/En/Blog.json")).default,
		common: (await import("./Locale/En/Common.json")).default,
		doc: (await import("./Locale/En/Doc.json")).default,
		home: (await import("./Locale/En/Home.json")).default,
		download: (await import("./Locale/En/Download.json")).default,
		account: (await import("./Locale/En/Account.json")).default,
		verify: (await import("./Locale/En/Verify.json")).default,
		header: (await import("./Locale/En/Header.json")).default,
		footer: (await import("./Locale/En/Footer.json")).default,
		meta: (await import("./Locale/En/Meta.json")).default,
	}),
	bg: async () => ({
		blog: (await import("./Locale/Bg/Blog.json")).default,
		common: (await import("./Locale/Bg/Common.json")).default,
		doc: (await import("./Locale/Bg/Doc.json")).default,
		home: (await import("./Locale/Bg/Home.json")).default,
		download: (await import("./Locale/Bg/Download.json")).default,
		account: (await import("./Locale/Bg/Account.json")).default,
		verify: (await import("./Locale/Bg/Verify.json")).default,
		header: (await import("./Locale/Bg/Header.json")).default,
		footer: (await import("./Locale/Bg/Footer.json")).default,
		meta: (await import("./Locale/Bg/Meta.json")).default,
	}),
	de: async () => ({
		blog: (await import("./Locale/De/Blog.json")).default,
		common: (await import("./Locale/De/Common.json")).default,
		doc: (await import("./Locale/De/Doc.json")).default,
		home: (await import("./Locale/De/Home.json")).default,
		download: (await import("./Locale/De/Download.json")).default,
		account: (await import("./Locale/De/Account.json")).default,
		verify: (await import("./Locale/De/Verify.json")).default,
		header: (await import("./Locale/De/Header.json")).default,
		footer: (await import("./Locale/De/Footer.json")).default,
		meta: (await import("./Locale/De/Meta.json")).default,
	}),
	fr: async () => ({
		blog: (await import("./Locale/Fr/Blog.json")).default,
		common: (await import("./Locale/Fr/Common.json")).default,
		doc: (await import("./Locale/Fr/Doc.json")).default,
		home: (await import("./Locale/Fr/Home.json")).default,
		download: (await import("./Locale/Fr/Download.json")).default,
		account: (await import("./Locale/Fr/Account.json")).default,
		verify: (await import("./Locale/Fr/Verify.json")).default,
		header: (await import("./Locale/Fr/Header.json")).default,
		footer: (await import("./Locale/Fr/Footer.json")).default,
		meta: (await import("./Locale/Fr/Meta.json")).default,
	}),
	es: async () => ({
		blog: (await import("./Locale/Es/Blog.json")).default,
		common: (await import("./Locale/Es/Common.json")).default,
		doc: (await import("./Locale/Es/Doc.json")).default,
		home: (await import("./Locale/Es/Home.json")).default,
		download: (await import("./Locale/Es/Download.json")).default,
		account: (await import("./Locale/Es/Account.json")).default,
		verify: (await import("./Locale/Es/Verify.json")).default,
		header: (await import("./Locale/Es/Header.json")).default,
		footer: (await import("./Locale/Es/Footer.json")).default,
		meta: (await import("./Locale/Es/Meta.json")).default,
	}),
};

function AddResources(
	Locale: SupportedLocale,
	Bundles: Partial<Record<Namespace, unknown>>,
) {
	for (const NS of NamespaceList) {
		if (Bundles[NS]) {
			i18n.addResourceBundle(Locale, NS, Bundles[NS], true, true);
		}
	}
}

const DetectedLocale = DetectLocale();

// Phase 1: Bind i18next to React *synchronously* before any awaits.
//
// i18n.init() is called here - before awaiting the locale JSON - so that
// React components which hydrate via client:idle (e.g. Footer) can call
// useTranslation() without hitting the "NO_I18NEXT_INSTANCE" error.
// Resources start empty; components fall back to their hardcoded defaultValues
// (which match SSR output) until AddResources() populates them below.
//
// Only core namespaces (common, header, footer, meta) are declared in ns[].
// Page-specific namespaces (blog, doc, home, download, account, verify) are
// loaded lazily via LoadNamespace() when page components hydrate.
// This reduces initial bundle fetches from 10 JSON files to 4.
i18n.use(initReactI18next).init({
	resources: {},
	lng: "en",
	fallbackLng: "en",
	defaultNS: "common",
	ns: [...CoreNamespaceList],
	partialBundledLanguages: true,
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

// Load only core namespaces eagerly (4 files instead of 10)
const EnglishCoreBundle = await CoreLocaleLoader.en();

AddResources("en", EnglishCoreBundle);

// Phase 2: After React hydration completes, switch to the user's detected
// locale. Uses FullLocaleLoader so all visible sections (including page-
// specific content) update simultaneously. requestIdleCallback ensures this
// runs after the initial hydration pass, preventing any mismatch.
if (DetectedLocale !== "en") {
	const SwitchAfterHydration = async () => {
		const FullBundle = await FullLocaleLoader[DetectedLocale]();
		AddResources(DetectedLocale, FullBundle);
		await i18n.changeLanguage(DetectedLocale);
	};

	if (typeof requestIdleCallback !== "undefined") {
		requestIdleCallback(() => {
			SwitchAfterHydration();
		});
	} else {
		setTimeout(() => {
			SwitchAfterHydration();
		}, 0);
	}
}

/**
 * Lazily load a page-specific namespace for the current (or given) locale.
 * Call this from page components: `await LoadNamespace("home")`
 * If the namespace is already loaded, this is a no-op.
 */
export const LoadNamespace = async (
	NamespaceName: Namespace,
	Locale?: SupportedLocale,
) => {
	const TargetLocale = Locale ?? (i18n.language as SupportedLocale) ?? "en";

	if (i18n.hasResourceBundle(TargetLocale, NamespaceName)) return;

	const Loader = PageNamespaceLoader[TargetLocale]?.[NamespaceName];

	if (Loader) {
		const Bundle = await Loader();
		i18n.addResourceBundle(TargetLocale, NamespaceName, Bundle, true, true);
	}

	// Also load for English fallback if not already present
	if (TargetLocale !== "en" && !i18n.hasResourceBundle("en", NamespaceName)) {
		const EnglishLoader = PageNamespaceLoader.en[NamespaceName];
		if (EnglishLoader) {
			const EnglishBundle = await EnglishLoader();
			i18n.addResourceBundle(
				"en",
				NamespaceName,
				EnglishBundle,
				true,
				true,
			);
		}
	}
};

/**
 * Switch locale at runtime - loads ALL namespaces for the target locale
 * so that every visible section updates its text immediately.
 */
export const SwitchLocale = async (Locale: SupportedLocale) => {
	if (!i18n.hasResourceBundle(Locale, "common")) {
		const Bundle = await FullLocaleLoader[Locale]();
		AddResources(Locale, Bundle);
	}

	await i18n.changeLanguage(Locale);

	document.cookie = `LOCALE=${Locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

export default i18n;
