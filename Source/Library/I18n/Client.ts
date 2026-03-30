import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
