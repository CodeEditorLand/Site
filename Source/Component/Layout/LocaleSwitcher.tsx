"use client";

import {
	LocaleLabel,
	SupportedLocaleList,
	SwitchLocale,
	type SupportedLocale,
} from "@/Library/I18n/Client.js";
import * as lucide from "lucide-react";
import { useTranslation } from "react-i18next";

const LocaleSwitcher = () => {
	const { i18n } = useTranslation();

	const CurrentLocale = (i18n.language || "en") as SupportedLocale;

	const HandleChange = (Event: React.ChangeEvent<HTMLSelectElement>) => {
		const NewLocale = Event.target.value as SupportedLocale;

		SwitchLocale(NewLocale);
	};

	return (
		<div className="relative inline-flex items-center">
			<select
				value={CurrentLocale}
				onChange={HandleChange}
				aria-label="Select language"
				className="h-9 appearance-none border border-[var(--Border)] bg-white bg-none py-1 pl-3 pr-7 text-sm font-medium text-[var(--Foreground)] transition-colors hover:bg-[var(--Secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--Foreground)]"
				style={{
					borderRadius: 0,
					WebkitAppearance: "none",
					MozAppearance: "none",
					backgroundImage: "none",
				}}>
				{SupportedLocaleList.map((Locale) => (
					<option key={Locale} value={Locale}>
						{LocaleLabel[Locale]}
					</option>
				))}
			</select>
			<lucide.Globe
				className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-[var(--MuteForeground)]"
				aria-hidden="true"
			/>
		</div>
	);
};

export { LocaleSwitcher };

export default LocaleSwitcher;
