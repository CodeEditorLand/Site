import type { Translation } from "i18next";

export type Namespace =
	| "common"
	| "home"
	| "download"
	| "account"
	| "verify"
	| "header"
	| "footer"
	| "meta";

export interface TranslationResources {
	common: Translation;
	home: Translation;
	download: Translation;
	account: Translation;
	verify: Translation;
	header: Translation;
	footer: Translation;
	meta: Translation;
}

export function getTranslation(namespace: Namespace) {
	return {
		[`${namespace}`]: true,
	} as const;
}
