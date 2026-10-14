/**
 * I18n Client - browser-side i18next initialization with lazy namespace loading.
 *
 * Supports 5 locales (en, bg, de, fr, es) with 10 namespaces loaded on demand.
 * Two-phase init: starts with lng:"en", then switches to detected locale
 * post-hydration to avoid SSR/client mismatch.
 *
 */
import i18n from "i18next";

import { initReactI18next } from "react-i18next";

export const SupportedLocaleList = ["en", "bg", "de", "fr", "es"] as const;

export type SupportedLocale = (typeof SupportedLocaleList)[number];

export const LocaleLabel: Record<SupportedLocale, string> = {
	en: "English",

	bg: "Bulgarian",

	de: "Deutsch",

	fr: "Français",

	es: "Español",
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
const LoadEnglishCore = async (): Promise<
	Partial<Record<Namespace, unknown>>
> => {
	const [common, header, footer, meta] = await Promise.all([
		import("./Locale/En/Common.json"),

		import("./Locale/En/Header.json"),

		import("./Locale/En/Footer.json"),

		import("./Locale/En/Meta.json"),
	]);

	return {
		common: common.default,

		header: header.default,

		footer: footer.default,

		meta: meta.default,
	};
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

		account: async () => (await import("./Locale/En/Account.json")).default,

		verify: async () => (await import("./Locale/En/Verify.json")).default,
	},

	bg: {
		blog: async () => (await import("./Locale/Bg/Blog.json")).default,

		doc: async () => (await import("./Locale/Bg/Doc.json")).default,

		home: async () => (await import("./Locale/Bg/Home.json")).default,

		download: async () =>
			(await import("./Locale/Bg/Download.json")).default,

		account: async () => (await import("./Locale/Bg/Account.json")).default,

		verify: async () => (await import("./Locale/Bg/Verify.json")).default,
	},

	de: {
		blog: async () => (await import("./Locale/De/Blog.json")).default,

		doc: async () => (await import("./Locale/De/Doc.json")).default,

		home: async () => (await import("./Locale/De/Home.json")).default,

		download: async () =>
			(await import("./Locale/De/Download.json")).default,

		account: async () => (await import("./Locale/De/Account.json")).default,

		verify: async () => (await import("./Locale/De/Verify.json")).default,
	},

	fr: {
		blog: async () => (await import("./Locale/Fr/Blog.json")).default,

		doc: async () => (await import("./Locale/Fr/Doc.json")).default,

		home: async () => (await import("./Locale/Fr/Home.json")).default,

		download: async () =>
			(await import("./Locale/Fr/Download.json")).default,

		account: async () => (await import("./Locale/Fr/Account.json")).default,

		verify: async () => (await import("./Locale/Fr/Verify.json")).default,
	},

	es: {
		blog: async () => (await import("./Locale/Es/Blog.json")).default,

		doc: async () => (await import("./Locale/Es/Doc.json")).default,

		home: async () => (await import("./Locale/Es/Home.json")).default,

		download: async () =>
			(await import("./Locale/Es/Download.json")).default,

		account: async () => (await import("./Locale/Es/Account.json")).default,

		verify: async () => (await import("./Locale/Es/Verify.json")).default,
	},
};

/**
 * Full locale loader: fetches ALL namespaces for a locale.
 * Used by SwitchLocale() when changing language at runtime -
 * loads both core and page namespaces for the target locale.
 */
const FullLocaleLoader: Record<
	SupportedLocale,
	() => Promise<Record<Namespace, unknown>>
> = {
	en: async () => {
		const [
			blog,

			common,

			doc,

			home,

			download,

			account,

			verify,

			header,

			footer,

			meta,
		] = await Promise.all([
			import("./Locale/En/Blog.json"),

			import("./Locale/En/Common.json"),

			import("./Locale/En/Doc.json"),

			import("./Locale/En/Home.json"),

			import("./Locale/En/Download.json"),

			import("./Locale/En/Account.json"),

			import("./Locale/En/Verify.json"),

			import("./Locale/En/Header.json"),

			import("./Locale/En/Footer.json"),

			import("./Locale/En/Meta.json"),
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

			meta: meta.default,
		};
	},

	bg: async () => {
		const [
			blog,

			common,

			doc,

			home,

			download,

			account,

			verify,

			header,

			footer,

			meta,
		] = await Promise.all([
			import("./Locale/Bg/Blog.json"),

			import("./Locale/Bg/Common.json"),

			import("./Locale/Bg/Doc.json"),

			import("./Locale/Bg/Home.json"),

			import("./Locale/Bg/Download.json"),

			import("./Locale/Bg/Account.json"),

			import("./Locale/Bg/Verify.json"),

			import("./Locale/Bg/Header.json"),

			import("./Locale/Bg/Footer.json"),

			import("./Locale/Bg/Meta.json"),
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

			meta: meta.default,
		};
	},

	de: async () => {
		const [
			blog,

			common,

			doc,

			home,

			download,

			account,

			verify,

			header,

			footer,

			meta,
		] = await Promise.all([
			import("./Locale/De/Blog.json"),

			import("./Locale/De/Common.json"),

			import("./Locale/De/Doc.json"),

			import("./Locale/De/Home.json"),

			import("./Locale/De/Download.json"),

			import("./Locale/De/Account.json"),

			import("./Locale/De/Verify.json"),

			import("./Locale/De/Header.json"),

			import("./Locale/De/Footer.json"),

			import("./Locale/De/Meta.json"),
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

			meta: meta.default,
		};
	},

	fr: async () => {
		const [
			blog,

			common,

			doc,

			home,

			download,

			account,

			verify,

			header,

			footer,

			meta,
		] = await Promise.all([
			import("./Locale/Fr/Blog.json"),

			import("./Locale/Fr/Common.json"),

			import("./Locale/Fr/Doc.json"),

			import("./Locale/Fr/Home.json"),

			import("./Locale/Fr/Download.json"),

			import("./Locale/Fr/Account.json"),

			import("./Locale/Fr/Verify.json"),

			import("./Locale/Fr/Header.json"),

			import("./Locale/Fr/Footer.json"),

			import("./Locale/Fr/Meta.json"),
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

			meta: meta.default,
		};
	},

	es: async () => {
		const [
			blog,

			common,

			doc,

			home,

			download,

			account,

			verify,

			header,

			footer,

			meta,
		] = await Promise.all([
			import("./Locale/Es/Blog.json"),

			import("./Locale/Es/Common.json"),

			import("./Locale/Es/Doc.json"),

			import("./Locale/Es/Home.json"),

			import("./Locale/Es/Download.json"),

			import("./Locale/Es/Account.json"),

			import("./Locale/Es/Verify.json"),

			import("./Locale/Es/Header.json"),

			import("./Locale/Es/Footer.json"),

			import("./Locale/Es/Meta.json"),
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

			meta: meta.default,
		};
	},
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

// Load core namespaces and switch locale without a top-level await.
// A top-level await makes the entire chunk async, which races React's
// live-binding establishment on first navigation and causes createContext
// to be undefined. Components fall back to their hardcoded defaultValues
// until AddResources populates them (same visible result, no hydration crash).
const InitI18n = async (): Promise<void> => {
	const EnglishCoreBundle = await LoadEnglishCore();

	AddResources("en", EnglishCoreBundle);

	// Phase 2: switch to detected locale after hydration completes.
	if (DetectedLocale !== "en") {
		const SwitchAfterHydration = async () => {
			try {
				const FullBundle = await FullLocaleLoader[DetectedLocale]();

				AddResources(DetectedLocale, FullBundle);

				await i18n.changeLanguage(DetectedLocale);
			} catch {
				// Network or parse error - stay on English fallback silently.
			}
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
};

InitI18n();

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

	const NeedsEnglishFallback =
		TargetLocale !== "en" && !i18n.hasResourceBundle("en", NamespaceName);

	const EnglishLoader = NeedsEnglishFallback
		? PageNamespaceLoader.en[NamespaceName]
		: undefined;

	// Fetch the locale bundle and English fallback in parallel.
	const [Bundle, EnglishBundle] = await Promise.all([
		Loader ? Loader() : Promise.resolve(undefined),

		EnglishLoader ? EnglishLoader() : Promise.resolve(undefined),
	]);

	if (Bundle) {
		i18n.addResourceBundle(TargetLocale, NamespaceName, Bundle, true, true);
	}

	if (EnglishBundle) {
		i18n.addResourceBundle("en", NamespaceName, EnglishBundle, true, true);
	}
};

/**
 * Switch locale at runtime - loads ALL namespaces for the target locale
 * so that every visible section updates its text immediately.
 */
export const SwitchLocale = async (Locale: SupportedLocale) => {
	const AllLoaded = NamespaceList.every((NS) =>
		i18n.hasResourceBundle(Locale, NS),
	);

	if (!AllLoaded) {
		const Bundle = await FullLocaleLoader[Locale]();

		AddResources(Locale, Bundle);
	}

	await i18n.changeLanguage(Locale);

	document.cookie = `LOCALE=${Locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

export default i18n;
