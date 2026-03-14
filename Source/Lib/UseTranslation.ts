import { useTranslation } from "react-i18next";

/**
 * Hook for using translations in components
 * @param namespaces - Array of translation namespaces to load
 * @returns Translation function and i18n instance
 *
 * @example
 * const { t } = useAppTranslation(["home", "common"]);
 * // Use: t("hero.title")
 */
export function useAppTranslation(namespaces: string[]) {
	const { t, i18n } = useTranslation(namespaces);
	return { t, i18n };
}

/**
 * Hook for single namespace translations
 * @param namespace - Primary namespace
 * @returns Translation function
 */
export function useTranslationNS(namespace: string) {
	const { t } = useTranslation([namespace, "common"]);
	return t;
}

export type { TFunction } from "i18next";
