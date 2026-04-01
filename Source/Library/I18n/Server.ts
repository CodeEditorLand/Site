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

const SupportedLocaleList = ["en", "bg", "de", "fr", "es"];

const NamespaceList = new Set([
	"common",
	"home",
	"download",
	"account",
	"verify",
	"header",
	"footer",
	"meta",
]);

/**
 * Creates a T function that auto-detects the namespace from the key prefix.
 * E.g., T("home.hero.badge") resolves to namespace "home", key "hero.badge".
 * Falls back to "common" namespace if prefix is not a known namespace.
 */
function CreateT(Locale: string) {
	return (Key: string, Options?: Record<string, unknown>) => {
		const DotIndex = Key.indexOf(".");

		if (DotIndex > 0) {
			const Prefix = Key.slice(0, DotIndex);

			if (NamespaceList.has(Prefix)) {
				const NamespaceKey = Key.slice(DotIndex + 1);

				return i18n.getFixedT(Locale, Prefix)(NamespaceKey, Options);
			}
		}

		return i18n.getFixedT(Locale, "common")(Key, Options);
	};
}

export async function GetLocale(Request?: Request): Promise<string> {
	if (!Request) {
		return "en";
	}

	const URL = new globalThis.URL(Request.url);
	const Cookie = Request.headers.get("cookie");
	const AcceptLanguage = Request.headers.get("accept-language");

	const URLParameter = URL.searchParams.get("lng");
	if (URLParameter && SupportedLocaleList.includes(URLParameter))
		return URLParameter;

	if (Cookie) {
		const Match = Cookie.match(/LOCALE=([^;]+)/);
		if (Match?.[1] && SupportedLocaleList.includes(Match[1]))
			return Match[1];
	}

	if (AcceptLanguage) {
		const LanguageList = AcceptLanguage.split(",").map((Language) =>
			Language.split(";")[0]?.trim(),
		);
		for (const Language of LanguageList) {
			if (Language && SupportedLocaleList.includes(Language))
				return Language;
		}
	}

	return "en";
}

export function GetI18n(Request?: Request) {
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

	if (import.meta.env["PRERENDER"]) {
		return CreateT("en");
	}

	if (!Request) {
		return CreateT("en");
	}

	try {
		const URL = new globalThis.URL(Request.url);
		const URLParameter = URL.searchParams.get("lng");
		if (URLParameter && SupportedLocaleList.includes(URLParameter)) {
			return CreateT(URLParameter);
		}

		const Cookie = Request.headers.get("cookie");
		if (Cookie) {
			const Match = Cookie.match(/LOCALE=([^;]+)/);
			if (Match?.[1] && SupportedLocaleList.includes(Match[1])) {
				return CreateT(Match[1]);
			}
		}

		const AcceptLanguage = Request.headers.get("accept-language");
		if (AcceptLanguage) {
			const LanguageList = AcceptLanguage.split(",").map((Language) =>
				Language.split(";")[0]?.trim(),
			);
			for (const Language of LanguageList) {
				if (Language && SupportedLocaleList.includes(Language)) {
					return CreateT(Language);
				}
			}
		}
	} catch (Error) {
		console.warn("i18n locale detection failed:", Error);
	}

	return CreateT("en");
}
