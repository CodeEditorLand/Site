"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";

import {
	HeaderLinkAttributes,
	HeaderLinkState,
	HeaderSections,
	HeaderStatus,
	HeaderView,
} from "./Header/Data.js";

import type { HeaderContent } from "./Header/Type.js";

import { LocaleSwitcher } from "./LocaleSwitcher";

export type { HeaderContent };

/**
 * Header - the site chrome.
 *
 * One nav definition, rendered once: the same four `/LABEL` destinations are the
 * desktop bar and the mobile panel, because the panel is the nav. Below 1024px
 * the panel collapses behind the toggle; above it the panel is the bar's own
 * second half. Nothing about the labels is typed twice.
 *
 * The status strip under the bar states the product status on every page, so a
 * reader who lands anywhere learns the same fact the homepage prints.
 *
 * `Mode` picks the surface only: `minimal` sits on the page canvas (the
 * default), `functional` is the card surface. It does not change the anatomy.
 *
 * `Content` is the caller's own rows - the homepage and the auth header hand
 * their navigation and actions in through it. `HeaderView` resolves either arm
 * into the same shapes, so the markup below has one nav and one action row and
 * never branches on where they came from. `AuthSlot` is the auth island: when it
 * is mounted the Sign In action is dropped, because the island is that action.
 */
interface HeaderProps {
	Content?: HeaderContent;

	AuthSlot?: React.ReactNode;

	Mode?: "minimal" | "functional";
}

const Header = ({ Content, AuthSlot, Mode = "minimal" }: HeaderProps) => {
	const { t: T } = useTranslation("header");

	const [Path, SetPath] = useState("/");

	const [Section, SetSection] = useState("");

	const [Open, SetOpen] = useState(false);

	const [Scrolled, SetScrolled] = useState(false);

	/** The in-page sections currently inside the reading band. */
	const Visible = useRef<Set<string>>(new Set());

	const View = HeaderView(Content, T);

	/** The ids to watch, as a stable dependency rather than a fresh array. */
	const SectionKey = HeaderSections(View.Links).join(",");

	useEffect(() => {
		const OnScroll = () => SetScrolled(window.scrollY > 8);

		const OnHash = () => SetSection(window.location.hash.replace(/^#/, ""));

		SetPath(window.location.pathname);

		SetSection(window.location.hash.replace(/^#/, ""));

		OnScroll();

		window.addEventListener("scroll", OnScroll, { passive: true });

		window.addEventListener("hashchange", OnHash);

		return () => {
			window.removeEventListener("scroll", OnScroll);

			window.removeEventListener("hashchange", OnHash);
		};
	}, []);

	useEffect(() => {
		Visible.current.clear();

		const Ids = SectionKey === "" ? [] : SectionKey.split(",");

		const Sections = Ids.map((Id) => document.getElementById(Id)).filter(
			(Element): Element is HTMLElement => Element !== null,
		);

		if (
			Sections.length === 0 ||
			typeof IntersectionObserver === "undefined"
		)
			return;

		const Observer = new IntersectionObserver(
			(Entries) => {
				Entries.forEach((Entry) =>
					Entry.isIntersecting
						? Visible.current.add(Entry.target.id)
						: Visible.current.delete(Entry.target.id),
				);

				SetSection(Ids.find((Id) => Visible.current.has(Id)) ?? "");
			},
			{ rootMargin: "-25% 0px -60% 0px" },
		);

		Sections.forEach((Element) => Observer.observe(Element));

		return () => Observer.disconnect();
	}, [Path, SectionKey]);

	const Actions =
		AuthSlot === undefined
			? View.Actions
			: View.Actions.filter(
					(Action) => Action.Href !== "/Account/SignIn",
				);

	const Status = T("status.value", { defaultValue: HeaderStatus });

	const ModeClass =
		Mode === "functional" ? "HeaderFunctional" : "HeaderMinimal";

	/** The shell's classes: the base, the surface, and the scrolled state. */
	const Shell = [
		"Header",
		ModeClass,
		Scrolled ? "HeaderScrolled" : null,
	].filter((Name): Name is string => Name !== null);

	return (
		<header className={Shell.join(" ")} role="banner">
			<div className="HeaderBar">
				<a
					className="HeaderLogo"
					href="/"
					aria-label={`${View.Logo} - Go to homepage`}
				>
					<span className="HeaderLogoGlyph" aria-hidden="true">
						<img
							src="/Asset/Logo/Glyph/Land.svg"
							alt="Code Editor Land"
							title="Code Editor Land"
							width={28}
							height={28}
						/>
					</span>
					<span className="HeaderLogoText">{View.Logo}</span>
				</a>

				<button
					type="button"
					className="HeaderToggle"
					aria-controls="HeaderPanel"
					aria-expanded={Open}
					onClick={() => SetOpen(!Open)}
				>
					{Open
						? T("close", { defaultValue: "Close" })
						: T("menu", { defaultValue: "Menu" })}
				</button>

				<div className="HeaderPanel" id="HeaderPanel" data-open={Open}>
					<nav
						className="HeaderNav"
						id="HeaderNav"
						aria-label="Main navigation"
					>
						{View.Links.map((Link) => {
							const State = HeaderLinkState(Link, Path, Section);

							return (
								<a
									key={Link.Href}
									className="HeaderNavLink"
									href={Link.Href}
									aria-current={
										State === "active" ? "page" : undefined
									}
									{...HeaderLinkAttributes(Link.Target)}
									onClick={() => SetOpen(false)}
								>
									<span className="HeaderLinkLabel">
										/{Link.Label.toUpperCase()}
									</span>
								</a>
							);
						})}
					</nav>

					<div className="HeaderAux">
						<LocaleSwitcher />

						<div className="HeaderActions">
							{AuthSlot}

							{Actions.map((Action) => (
								<Button
									key={Action.Href}
									variant={Action.Variant}
									size="default"
									className="HeaderActionButton"
									asChild
								>
									<a
										href={Action.Href}
										{...HeaderLinkAttributes(Action.Target)}
										onClick={() => SetOpen(false)}
									>
										{Action.Label}
									</a>
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="HeaderStrip">
				<p className="HeaderStatus">{Status}</p>
			</div>
		</header>
	);
};

export { Header };

export default Header;
