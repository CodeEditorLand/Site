import i18n from "i18next";

// Bulgarian
import BgAccount from "./Locale/Bg/Account.json";
import BgCommon from "./Locale/Bg/Common.json";
import BgDownload from "./Locale/Bg/Download.json";
import BgFooter from "./Locale/Bg/Footer.json";
import BgHeader from "./Locale/Bg/Header.json";
import BgHome from "./Locale/Bg/Home.json";
import BgMeta from "./Locale/Bg/Meta.json";
import BgVerify from "./Locale/Bg/Verify.json";
// German
import DeAccount from "./Locale/De/Account.json";
import DeCommon from "./Locale/De/Common.json";
import DeDownload from "./Locale/De/Download.json";
import DeFooter from "./Locale/De/Footer.json";
import DeHeader from "./Locale/De/Header.json";
import DeHome from "./Locale/De/Home.json";
import DeMeta from "./Locale/De/Meta.json";
import DeVerify from "./Locale/De/Verify.json";
// English
import EnAccount from "./Locale/En/Account.json";
import EnCommon from "./Locale/En/Common.json";
import EnDownload from "./Locale/En/Download.json";
import EnFooter from "./Locale/En/Footer.json";
import EnHeader from "./Locale/En/Header.json";
import EnHome from "./Locale/En/Home.json";
import EnMeta from "./Locale/En/Meta.json";
import EnVerify from "./Locale/En/Verify.json";
// Spanish
import EsAccount from "./Locale/Es/Account.json";
import EsCommon from "./Locale/Es/Common.json";
import EsDownload from "./Locale/Es/Download.json";
import EsFooter from "./Locale/Es/Footer.json";
import EsHeader from "./Locale/Es/Header.json";
import EsHome from "./Locale/Es/Home.json";
import EsMeta from "./Locale/Es/Meta.json";
import EsVerify from "./Locale/Es/Verify.json";
// French
import FrAccount from "./Locale/Fr/Account.json";
import FrCommon from "./Locale/Fr/Common.json";
import FrDownload from "./Locale/Fr/Download.json";
import FrFooter from "./Locale/Fr/Footer.json";
import FrHeader from "./Locale/Fr/Header.json";
import FrHome from "./Locale/Fr/Home.json";
import FrMeta from "./Locale/Fr/Meta.json";
import FrVerify from "./Locale/Fr/Verify.json";

/**
 * Server-side i18n for Astro prerendered pages.
 * Always returns English — locale switching happens client-side
 * via react-i18next in hydrated React components.
 */
export function GetI18n() {
	if (!i18n.isInitialized) {
		i18n.init({
			resources: {
				en: {
					common: EnCommon,
					home: EnHome,
					download: EnDownload,
					account: EnAccount,
					verify: EnVerify,
					header: EnHeader,
					footer: EnFooter,
					meta: EnMeta,
				},
				bg: {
					common: BgCommon,
					home: BgHome,
					download: BgDownload,
					account: BgAccount,
					verify: BgVerify,
					header: BgHeader,
					footer: BgFooter,
					meta: BgMeta,
				},
				de: {
					common: DeCommon,
					home: DeHome,
					download: DeDownload,
					account: DeAccount,
					verify: DeVerify,
					header: DeHeader,
					footer: DeFooter,
					meta: DeMeta,
				},
				fr: {
					common: FrCommon,
					home: FrHome,
					download: FrDownload,
					account: FrAccount,
					verify: FrVerify,
					header: FrHeader,
					footer: FrFooter,
					meta: FrMeta,
				},
				es: {
					common: EsCommon,
					home: EsHome,
					download: EsDownload,
					account: EsAccount,
					verify: EsVerify,
					header: EsHeader,
					footer: EsFooter,
					meta: EsMeta,
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

	return i18n.getFixedT("en");
}
