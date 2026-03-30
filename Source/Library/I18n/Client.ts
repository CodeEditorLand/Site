import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

export const SupportedLocaleList = ["en", "bg", "de", "fr", "es"] as const;
export type SupportedLocale = (typeof SupportedLocaleList)[number];

export const LocaleLabel: Record<SupportedLocale, string> = {
	en: "English",
	bg: "Bulgarian",
	de: "Deutsch",
	fr: "Francais",
	es: "Espanol",
};

i18n.use(initReactI18next).init({
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
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

export default i18n;
