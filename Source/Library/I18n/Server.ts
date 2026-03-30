import i18n from "i18next";

// Bulgarian
import bgAccount from "./Locale/Bg/account.json";
import bgCommon from "./Locale/Bg/common.json";
import bgDownload from "./Locale/Bg/download.json";
import bgFooter from "./Locale/Bg/footer.json";
import bgHeader from "./Locale/Bg/header.json";
import bgHome from "./Locale/Bg/home.json";
import bgMeta from "./Locale/Bg/meta.json";
import bgVerify from "./Locale/Bg/verify.json";
// German
import deAccount from "./Locale/De/account.json";
import deCommon from "./Locale/De/common.json";
import deDownload from "./Locale/De/download.json";
import deFooter from "./Locale/De/footer.json";
import deHeader from "./Locale/De/header.json";
import deHome from "./Locale/De/home.json";
import deMeta from "./Locale/De/meta.json";
import deVerify from "./Locale/De/verify.json";
// English
import enAccount from "./Locale/En/account.json";
import enCommon from "./Locale/En/common.json";
import enDownload from "./Locale/En/download.json";
import enFooter from "./Locale/En/footer.json";
import enHeader from "./Locale/En/header.json";
import enHome from "./Locale/En/home.json";
import enMeta from "./Locale/En/meta.json";
import enVerify from "./Locale/En/verify.json";
// Spanish
import esAccount from "./Locale/Es/account.json";
import esCommon from "./Locale/Es/common.json";
import esDownload from "./Locale/Es/download.json";
import esFooter from "./Locale/Es/footer.json";
import esHeader from "./Locale/Es/header.json";
import esHome from "./Locale/Es/home.json";
import esMeta from "./Locale/Es/meta.json";
import esVerify from "./Locale/Es/verify.json";
// French
import frAccount from "./Locale/Fr/account.json";
import frCommon from "./Locale/Fr/common.json";
import frDownload from "./Locale/Fr/download.json";
import frFooter from "./Locale/Fr/footer.json";
import frHeader from "./Locale/Fr/header.json";
import frHome from "./Locale/Fr/home.json";
import frMeta from "./Locale/Fr/meta.json";
import frVerify from "./Locale/Fr/verify.json";

const supportedLocales = ["en", "bg", "de", "fr", "es"];

export async function getLocale(request?: Request): Promise<string> {
	if (!request) {
		return "en";
	}

	const url = new URL(request.url);
	const cookie = request.headers.get("cookie");
	const acceptLanguage = request.headers.get("accept-language");

	// Priority: URL param > cookie > Accept-Language header
	const urlParam = url.searchParams.get("lng");
	if (urlParam && supportedLocales.includes(urlParam)) return urlParam;

	if (cookie) {
		const match = cookie.match(/LOCALE=([^;]+)/);
		if (match?.[1] && supportedLocales.includes(match[1])) return match[1];
	}

	if (acceptLanguage) {
		const languages = acceptLanguage
			.split(",")
			.map((lang) => lang.split(";")[0]?.trim());
		for (const lang of languages) {
			if (lang && supportedLocales.includes(lang)) return lang;
		}
	}

	return "en";
}

export function getI18n(req?: Request) {
	if (!i18n.isInitialized) {
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
				bg: {
					common: bgCommon,
					home: bgHome,
					download: bgDownload,
					account: bgAccount,
					verify: bgVerify,
					header: bgHeader,
					footer: bgFooter,
					meta: bgMeta,
				},
				de: {
					common: deCommon,
					home: deHome,
					download: deDownload,
					account: deAccount,
					verify: deVerify,
					header: deHeader,
					footer: deFooter,
					meta: deMeta,
				},
				fr: {
					common: frCommon,
					home: frHome,
					download: frDownload,
					account: frAccount,
					verify: frVerify,
					header: frHeader,
					footer: frFooter,
					meta: frMeta,
				},
				es: {
					common: esCommon,
					home: esHome,
					download: esDownload,
					account: esAccount,
					verify: esVerify,
					header: esHeader,
					footer: esFooter,
					meta: esMeta,
				},
			},
			lng: "en",
			fallbackLng: "en",
			defaultNS: "common",
			ns: [
				"common",
				"home",
				"download",
				"account",
				"verify",
				"header",
				"footer",
				"meta",
			],
			interpolation: { escapeValue: false },
		});
	}

	if (import.meta.env["PRERENDER"]) {
		return i18n.getFixedT("en");
	}

	if (!req) {
		return i18n.getFixedT("en");
	}

	try {
		const url = new URL(req.url);
		const urlParam = url.searchParams.get("lng");
		if (urlParam && supportedLocales.includes(urlParam)) {
			return i18n.getFixedT(urlParam);
		}

		const cookie = req.headers.get("cookie");
		if (cookie) {
			const match = cookie.match(/LOCALE=([^;]+)/);
			if (match?.[1] && supportedLocales.includes(match[1])) {
				return i18n.getFixedT(match[1]);
			}
		}

		const acceptLanguage = req.headers.get("accept-language");
		if (acceptLanguage) {
			const languages = acceptLanguage
				.split(",")
				.map((lang) => lang.split(";")[0]?.trim());
			for (const lang of languages) {
				if (lang && supportedLocales.includes(lang)) {
					return i18n.getFixedT(lang);
				}
			}
		}
	} catch (error) {
		console.warn("i18n locale detection failed:", error);
	}

	return i18n.getFixedT("en");
}
