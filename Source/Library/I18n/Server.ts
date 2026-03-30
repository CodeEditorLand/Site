import i18n from "i18next";

// Bulgarian
import bgAccount from "./Locale/Bg/Account.json";
import bgCommon from "./Locale/Bg/Common.json";
import bgDownload from "./Locale/Bg/Download.json";
import bgFooter from "./Locale/Bg/Footer.json";
import bgHeader from "./Locale/Bg/Header.json";
import bgHome from "./Locale/Bg/Home.json";
import bgMeta from "./Locale/Bg/Meta.json";
import bgVerify from "./Locale/Bg/Verify.json";
// German
import deAccount from "./Locale/De/Account.json";
import deCommon from "./Locale/De/Common.json";
import deDownload from "./Locale/De/Download.json";
import deFooter from "./Locale/De/Footer.json";
import deHeader from "./Locale/De/Header.json";
import deHome from "./Locale/De/Home.json";
import deMeta from "./Locale/De/Meta.json";
import deVerify from "./Locale/De/Verify.json";
// English
import enAccount from "./Locale/En/Account.json";
import enCommon from "./Locale/En/Common.json";
import enDownload from "./Locale/En/Download.json";
import enFooter from "./Locale/En/Footer.json";
import enHeader from "./Locale/En/Header.json";
import enHome from "./Locale/En/Home.json";
import enMeta from "./Locale/En/Meta.json";
import enVerify from "./Locale/En/Verify.json";
// Spanish
import esAccount from "./Locale/Es/Account.json";
import esCommon from "./Locale/Es/Common.json";
import esDownload from "./Locale/Es/Download.json";
import esFooter from "./Locale/Es/Footer.json";
import esHeader from "./Locale/Es/Header.json";
import esHome from "./Locale/Es/Home.json";
import esMeta from "./Locale/Es/Meta.json";
import esVerify from "./Locale/Es/Verify.json";
// French
import frAccount from "./Locale/Fr/Account.json";
import frCommon from "./Locale/Fr/Common.json";
import frDownload from "./Locale/Fr/Download.json";
import frFooter from "./Locale/Fr/Footer.json";
import frHeader from "./Locale/Fr/Header.json";
import frHome from "./Locale/Fr/Home.json";
import frMeta from "./Locale/Fr/Meta.json";
import frVerify from "./Locale/Fr/Verify.json";

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
