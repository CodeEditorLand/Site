"use client";

import {
	LocaleLabel,
	SupportedLocaleList,
	SwitchLocale,
	type SupportedLocale,
} from "@/Library/I18n/Client.js";
import { useRef } from "react";
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
	const TriggerRef = useRef<HTMLButtonElement>(null);

	const HandleChange = (Value: string) => {
		const ScrollY = window.scrollY;

		// Install a guard before the locale switch starts.
		// React 18 defers i18n re-renders to the next animation frame,
		// so the naive .then() scrollTo fires too early — the deferred
		// layout reflow overwrites it. The guard snaps back any scroll
		// attempt immediately, and is held for two frames post-switch
		// to cover all deferred React work before being released.
		const Guard = () =>
			window.scrollTo({ top: ScrollY, behavior: "instant" });
		window.addEventListener("scroll", Guard, { passive: true });

		SwitchLocale(Value as SupportedLocale).then(() => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					window.removeEventListener("scroll", Guard);
					window.scrollTo({ top: ScrollY, behavior: "instant" });
				});
			});
		});
	};

	return (
		<Select value={CurrentLocale} onValueChange={HandleChange}>
			<SelectTrigger
				ref={TriggerRef}
				className="h-9 w-auto min-w-[6rem] border border-[var(--Border)] bg-white text-sm font-medium text-[var(--Foreground)]"
				aria-label="Select language">
				<SelectValue />
			</SelectTrigger>
			<SelectContent
				onCloseAutoFocus={(Event) => {
					// Return focus to the trigger without any scroll side-effect.
					// preventDefault alone drops focus to document.body on some
					// browsers, which snaps the viewport to y=0.
					Event.preventDefault();
					TriggerRef.current?.focus({ preventScroll: true });
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
