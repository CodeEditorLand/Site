import i18n from "i18next";

// Import translation resources
import enCommon from "./Locales/En/common.json";
import enHome from "./Locales/En/home.json";
import enDownload from "./Locales/En/download.json";
import enAccount from "./Locales/En/account.json";
import enVerify from "./Locales/En/verify.json";
import enHeader from "./Locales/En/header.json";
import enFooter from "./Locales/En/footer.json";
import enMeta from "./Locales/En/meta.json";

// Server-side i18n initialization for SSR
// This would be used in Astro middleware or layout

export async function getLocale(request?: Request): Promise<string> {
	// If no request (static generation), return default locale
	if (!request) {
		return "en";
	}

	// Detect locale from Accept-Language header, URL, or cookie
	const acceptLanguage = request.headers.get("accept-language");
	const url = new URL(request.url);
	const cookie = request.headers.get("cookie");

	// Priority: URL param > cookie > header
	const urlParam = url.searchParams.get("lng");
	if (urlParam) return urlParam;

	if (cookie) {
		const match = cookie.match(/NEXT_LOCALE=([^;]+)/);
		if (match && match[1]) return match[1];
	}

	if (acceptLanguage) {
		const languages = acceptLanguage
			.split(",")
			.map((lang) => lang.split(";")[0]);
		const defaultLangs = ["en", "es", "fr", "de"];
		for (const lang of languages) {
			if (lang && defaultLangs.includes(lang)) return lang;
		}
	}

	return "en";
}

export function getI18n(req?: Request) {
	// Ensure i18n is initialized with resources before use
	if (!i18n.isInitialized) {
		// Initialize with available resources
		i18n.init({
			resources: {
				en: {
					common: enCommon,
					home: enHome,
					download: enDownload,
					account: enAccount,
					verify: enVerify,
					header: enHeader,
					footer: enFooter,
					meta: enMeta,
				},
			},
			lng: "en",
			fallbackLng: "en",
			interpolation: { escapeValue: false },
		});
	}

	// If we're in prerender mode (static generation), return fixed t function
	if (import.meta.env['PRERENDER']) {
		return i18n.getFixedT("en");
	}

	// SSR mode (non-prerender) - if no request provided, return default
	if (!req) {
		return i18n.getFixedT("en");
	}

	// Safe to access request properties in SSR mode
	try {
		const url = new URL(req.url);
		const urlParam = url.searchParams.get("lng");
		if (urlParam && typeof urlParam === "string" && urlParam.length > 0) {
			return i18n.getFixedT(urlParam);
		}

		const cookie = req.headers.get("cookie");
		if (cookie) {
			const match = cookie.match(/NEXT_LOCALE=([^;]+)/);
			if (match && match[1]) {
				const locale = match[1] as string;
				return i18n.getFixedT(locale);
			}
		}

		const acceptLanguage = req.headers.get("accept-language");
		if (acceptLanguage) {
			const languages = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);
			const defaultLangs = ["en", "es", "fr", "de"];
			for (const lang of languages) {
				if (lang && typeof lang === "string" && defaultLangs.includes(lang)) {
					return i18n.getFixedT(lang);
				}
			}
		}
	} catch (error) {
		// If URL parsing or other operations fail, fallback to default
		console.warn("i18n locale detection failed:", error);
	}

	return i18n.getFixedT("en");
}
