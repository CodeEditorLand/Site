"use client";

import {
	LocaleLabel,
	SupportedLocaleList,
	type SupportedLocale,
} from "@/Library/I18n/Client.js";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LocaleSwitcher() {
	const { i18n } = useTranslation();

	const CurrentLocale = (i18n.language || "en") as SupportedLocale;

	function HandleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const NewLocale = event.target.value as SupportedLocale;

		i18n.changeLanguage(NewLocale);

		document.cookie = `LOCALE=${NewLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;

		const Url = new URL(window.location.href);

		Url.searchParams.set("lng", NewLocale);

		window.location.href = Url.toString();
	}

	return (
		<div className="relative inline-flex items-center">
			<select
				value={CurrentLocale}
				onChange={HandleChange}
				aria-label="Select language"
				className="h-9 appearance-none border border-[var(--Border)] bg-white bg-none py-1 pl-3 pr-8 text-sm font-medium text-[var(--Foreground)] transition-colors hover:bg-[var(--Secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--Foreground)]"
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
			<Globe
				className="pointer-events-none absolute right-6 h-3.5 w-3.5 text-[var(--MuteForeground)]"
				aria-hidden="true"
			/>
			<svg
				className="pointer-events-none absolute right-1.5 h-3 w-3 text-[var(--MuteForeground)]"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true">
				<path
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeWidth={2}
					d="M6 9l6 6 6-6"
				/>
			</svg>
		</div>
	);
}
