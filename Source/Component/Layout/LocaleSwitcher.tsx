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
		// Preserve scroll position across language switch — i18n.changeLanguage()
		// triggers a full re-render of all translated components which can cause
		// layout recalculation and scroll drift.
		const ScrollY = window.scrollY;
		SwitchLocale(Value as SupportedLocale).then(() => {
			window.scrollTo({ top: ScrollY, behavior: "instant" });
		});
	};

	return (
		<Select value={CurrentLocale} onValueChange={HandleChange}>
			<SelectTrigger
				className="h-9 w-auto min-w-[6rem] border border-[var(--Border)] bg-white text-sm font-medium text-[var(--Foreground)]"
				aria-label="Select language">
				<SelectValue />
			</SelectTrigger>
			<SelectContent
				onCloseAutoFocus={(Event) => {
					// Prevent Radix from restoring focus to the trigger on close.
					// Without this the browser scrolls to bring the trigger into
					// view, which resets the page scroll position to the top.
					Event.preventDefault();
				}}>
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
