"use client";

import {
	LocaleLabel,
	SupportedLocaleList,
	SwitchLocale,
	type SupportedLocale,
} from "@/Library/I18n/Client.js";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../UI/DropdownMenu.js";

// ─── Why DropdownMenu instead of Select ──────────────────────────────────────
//
// @radix-ui/react-select (any version) unconditionally wraps its content with
// react-remove-scroll, which injects `overflow: hidden` on <body> via CSS.
// In Chrome, this silently transfers the scroll container from <body> to <html>
// (which has scrollTop=0), resetting window.scrollY to 0 without firing any
// scroll event - making it impossible to detect or counteract.
//
// @radix-ui/react-dropdown-menu is built on @radix-ui/react-menu which does
// NOT use react-remove-scroll. Confirmed via source: no "remove-scroll" import.
// ─────────────────────────────────────────────────────────────────────────────

const LocaleSwitcher = () => {
	const { i18n } = useTranslation();

	const CurrentLocale = (i18n.language || "en") as SupportedLocale;

	// ─── Locale selection ─────────────────────────────────────────────────────
	//
	// The scroll guard here handles React 18's deferred re-renders after
	// i18n.changeLanguage() resolves. Two rAFs ensure the guard outlasts any
	// layout-triggered drift from the new locale's content dimensions.
	//
	const HandleChange = (Value: SupportedLocale) => {
		const ScrollY = window.scrollY;
		const Guard = () => {
			if (window.scrollY !== ScrollY) {
				window.scrollTo({ top: ScrollY, behavior: "instant" });
			}
		};
		window.addEventListener("scroll", Guard, { passive: true });
		SwitchLocale(Value).then(() => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					window.removeEventListener("scroll", Guard);
					window.scrollTo({ top: ScrollY, behavior: "instant" });
				});
			});
		});
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger
				className="flex h-9 items-center gap-1.5 rounded-md border border-[var(--Border)] bg-white px-3 text-sm font-medium text-[var(--Foreground)] outline-none ring-offset-white hover:bg-[var(--Muted)] focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 data-[state=open]:bg-[var(--Muted)]"
				aria-label="Select language">
				<span>{LocaleLabel[CurrentLocale]}</span>
				<ChevronDown
					size={14}
					className="text-[var(--MutedForeground)] transition-transform duration-200 [[data-state=open]_&]:rotate-180"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[8rem]">
				{SupportedLocaleList.map((Locale) => (
					<DropdownMenuItem
						key={Locale}
						onClick={() => HandleChange(Locale)}
						className={
							Locale === CurrentLocale
								? "font-semibold text-[var(--Foreground)]"
								: "text-[var(--MutedForeground)]"
						}>
						{LocaleLabel[Locale]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { LocaleSwitcher };
export default LocaleSwitcher;
