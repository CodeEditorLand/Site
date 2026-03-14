import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAccount from "./Locales/En/account.json";
// Import translation resources
import enCommon from "./Locales/En/common.json";
import enDownload from "./Locales/En/download.json";
import enFooter from "./Locales/En/footer.json";
import enHeader from "./Locales/En/header.json";
import enHome from "./Locales/En/home.json";
import enMeta from "./Locales/En/meta.json";
import enVerify from "./Locales/En/verify.json";

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
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false, // React already safes from XSS
	},
	react: {
		useSuspense: false, // We'll handle loading states manually if needed
	},
});

export default i18n;
