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
	"common",
	"home",
	"download",
	"account",
	"verify",
	"header",
	"footer",
	"meta",
] as const;

type Namespace = (typeof NamespaceList)[number];

function DetectLocale(): SupportedLocale {
	if (typeof window === "undefined") return "en";

	const Parameter = new URL(window.location.href).searchParams.get("lng");

	if (
		Parameter &&
		SupportedLocaleList.includes(Parameter as SupportedLocale)
	)
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
 * Dynamically import all namespace JSON files for a given locale.
 * Vite resolves these to separate chunks that are only fetched when needed.
 */
const LocaleLoader: Record<
	SupportedLocale,
	() => Promise<Record<Namespace, unknown>>
> = {
	en: async () => ({
		common: (await import("./Locale/En/Common.json")).default,
		home: (await import("./Locale/En/Home.json")).default,
		download: (await import("./Locale/En/Download.json")).default,
		account: (await import("./Locale/En/Account.json")).default,
		verify: (await import("./Locale/En/Verify.json")).default,
		header: (await import("./Locale/En/Header.json")).default,
		footer: (await import("./Locale/En/Footer.json")).default,
		meta: (await import("./Locale/En/Meta.json")).default,
	}),
	bg: async () => ({
		common: (await import("./Locale/Bg/Common.json")).default,
		home: (await import("./Locale/Bg/Home.json")).default,
		download: (await import("./Locale/Bg/Download.json")).default,
		account: (await import("./Locale/Bg/Account.json")).default,
		verify: (await import("./Locale/Bg/Verify.json")).default,
		header: (await import("./Locale/Bg/Header.json")).default,
		footer: (await import("./Locale/Bg/Footer.json")).default,
		meta: (await import("./Locale/Bg/Meta.json")).default,
	}),
	de: async () => ({
		common: (await import("./Locale/De/Common.json")).default,
		home: (await import("./Locale/De/Home.json")).default,
		download: (await import("./Locale/De/Download.json")).default,
		account: (await import("./Locale/De/Account.json")).default,
		verify: (await import("./Locale/De/Verify.json")).default,
		header: (await import("./Locale/De/Header.json")).default,
		footer: (await import("./Locale/De/Footer.json")).default,
		meta: (await import("./Locale/De/Meta.json")).default,
	}),
	fr: async () => ({
		common: (await import("./Locale/Fr/Common.json")).default,
		home: (await import("./Locale/Fr/Home.json")).default,
		download: (await import("./Locale/Fr/Download.json")).default,
		account: (await import("./Locale/Fr/Account.json")).default,
		verify: (await import("./Locale/Fr/Verify.json")).default,
		header: (await import("./Locale/Fr/Header.json")).default,
		footer: (await import("./Locale/Fr/Footer.json")).default,
		meta: (await import("./Locale/Fr/Meta.json")).default,
	}),
	es: async () => ({
		common: (await import("./Locale/Es/Common.json")).default,
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
	Bundles: Record<Namespace, unknown>,
) {
	for (const NS of NamespaceList) {
		if (Bundles[NS]) {
			i18n.addResourceBundle(Locale, NS, Bundles[NS], true, true);
		}
	}
}

const DetectedLocale = DetectLocale();

// Always load English (fallback) first, then the detected locale.
const EnglishBundle = await LocaleLoader.en();
i18n.use(initReactI18next).init({
	resources: {},
	lng: DetectedLocale,
	fallbackLng: "en",
	defaultNS: "common",
	ns: [...NamespaceList],
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

AddResources("en", EnglishBundle);

if (DetectedLocale !== "en") {
	const LocaleBundle = await LocaleLoader[DetectedLocale]();
	AddResources(DetectedLocale, LocaleBundle);
}

/**
 * Switch locale at runtime — loads the target locale bundle on demand.
 */
export const SwitchLocale = async (Locale: SupportedLocale) => {
	if (!i18n.hasResourceBundle(Locale, "common")) {
		const Bundle = await LocaleLoader[Locale]();
		AddResources(Locale, Bundle);
	}

	await i18n.changeLanguage(Locale);

	document.cookie = `LOCALE=${Locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

export default i18n;
