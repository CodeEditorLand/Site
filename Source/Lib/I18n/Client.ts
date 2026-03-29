import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Bulgarian
import bgAccount from "./Locales/Bg/account.json";
import bgCommon from "./Locales/Bg/common.json";
import bgDownload from "./Locales/Bg/download.json";
import bgFooter from "./Locales/Bg/footer.json";
import bgHeader from "./Locales/Bg/header.json";
import bgHome from "./Locales/Bg/home.json";
import bgMeta from "./Locales/Bg/meta.json";
import bgVerify from "./Locales/Bg/verify.json";
// German
import deAccount from "./Locales/De/account.json";
import deCommon from "./Locales/De/common.json";
import deDownload from "./Locales/De/download.json";
import deFooter from "./Locales/De/footer.json";
import deHeader from "./Locales/De/header.json";
import deHome from "./Locales/De/home.json";
import deMeta from "./Locales/De/meta.json";
import deVerify from "./Locales/De/verify.json";
// English
import enAccount from "./Locales/En/account.json";
import enCommon from "./Locales/En/common.json";
import enDownload from "./Locales/En/download.json";
import enFooter from "./Locales/En/footer.json";
import enHeader from "./Locales/En/header.json";
import enHome from "./Locales/En/home.json";
import enMeta from "./Locales/En/meta.json";
import enVerify from "./Locales/En/verify.json";
// Spanish
import esAccount from "./Locales/Es/account.json";
import esCommon from "./Locales/Es/common.json";
import esDownload from "./Locales/Es/download.json";
import esFooter from "./Locales/Es/footer.json";
import esHeader from "./Locales/Es/header.json";
import esHome from "./Locales/Es/home.json";
import esMeta from "./Locales/Es/meta.json";
import esVerify from "./Locales/Es/verify.json";
// French
import frAccount from "./Locales/Fr/account.json";
import frCommon from "./Locales/Fr/common.json";
import frDownload from "./Locales/Fr/download.json";
import frFooter from "./Locales/Fr/footer.json";
import frHeader from "./Locales/Fr/header.json";
import frHome from "./Locales/Fr/home.json";
import frMeta from "./Locales/Fr/meta.json";
import frVerify from "./Locales/Fr/verify.json";

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
