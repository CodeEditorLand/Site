"use client";

import {
	LocaleLabel,
	SupportedLocaleList,
	SwitchLocale,
	type SupportedLocale,
} from "@/Library/I18n/Client.js";
import { useTranslation } from "react-i18next";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../UI/Select.js";

const LocaleSwitcher = () => {
	const { i18n } = useTranslation();

	const CurrentLocale = (i18n.language || "en") as SupportedLocale;

	const HandleChange = (Value: string) => {
		SwitchLocale(Value as SupportedLocale);
	};

	return (
		<Select value={CurrentLocale} onValueChange={HandleChange}>
			<SelectTrigger
				className="h-9 w-auto min-w-[6rem] border border-[var(--Border)] bg-white text-sm font-medium text-[var(--Foreground)]"
				aria-label="Select language">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{SupportedLocaleList.map((Locale) => (
					<SelectItem
						key={Locale}
						value={Locale}
						aria-current={
							Locale === CurrentLocale ? "true" : undefined
						}>
						{LocaleLabel[Locale]}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export { LocaleSwitcher };

export default LocaleSwitcher;
