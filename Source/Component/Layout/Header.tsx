"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";

import { Rail } from "./Frame/Rail";
import { RunningHead } from "./Frame/RunningHead";

import {
	HeaderLinkAttributes,
	HeaderLinkState,
	HeaderSections,
	HeaderStatus,
	HeaderView,
} from "./Header/Data.js";

import type { HeaderAction, HeaderContent } from "./Header/Type.js";

import { LocaleSwitcher } from "./LocaleSwitcher";

export type { HeaderContent };

/**
 * The variants that have no filled-blob equivalent in Jelly UI. They render as a
 * plain CSS button wrapping an anchor; every other variant renders as the Jelly
 * element itself. `link` is listed because the button surface accepts it even
 * though the header's own data never emits it - the rule belongs to the shape,
 * not to today's rows.
 */
const PlainVariant: ReadonlySet<string> = new Set(["ghost", "link"]);

/**
 * Where an action sends the reader. The Jelly path has no anchor to carry the
 * href, so the destination is honoured here instead: an off-site action opens in
 * the second tab its `Target` asks for, and everything else replaces the page
 * the way the anchor would have.
 */
const Navigate = (Action: HeaderAction): void => {
	if (Action.Target === "blank") {
		window.open(Action.Href, "_blank", "noopener,noreferrer");

		return;
	}

	window.location.href = Action.Href;
};

/**
 * Header - the site chrome.
 *
 * One nav definition, rendered once: the same four `/LABEL` destinations are the
 * desktop bar and the mobile panel, because the panel is the nav. Below 1024px
 * the panel collapses behind the toggle; above it the panel is the bar's own
 * second half. Nothing about the labels is typed twice.
 *
 * The frame is read as a document, not as a bar. The bar is the masthead; the
 * strip under it is the running head, and it states two things on every page -
 * which record this is (`# LAND / 03␁DOCUMENTATION`, printed by
 * `Frame/RunningHead`) and what state the project is in
 * (`STATUS: ACTIVE␁PRE-RELEASE`, the keeper line). Between them sits the
 * reader's own status: where this page stands in the ten-part document.
 *
 * The parts themselves are the thumb index (`Frame/Rail`): rows in this panel
 * below 1024px, a fixed margin column at 1280px and up. Both are one element, and
 * both are marked by shape and weight - never by colour alone.
 *
 * `Mode` picks the surface only: `minimal` sits on the page canvas (the
 * default), `functional` is the card surface. It does not change the anatomy.
 *
 * `Content` is the caller's own rows - the homepage and the auth header hand
 * their navigation and actions in through it. `HeaderView` resolves either arm
 * into the same shapes, so the markup below has one nav and one action row and
 * never branches on where they came from. `AuthSlot` is the auth island: when it
 * is mounted the Sign In action is dropped, because the island is that action.
 *
 * An action wears one of two bodies. `ghost` and `link` have no filled-blob
 * equivalent in Jelly UI, so they stay a plain CSS button wrapping an anchor and
 * keep the anchor's own semantics. `default` and `outline` render as real
 * `jelly-button` elements - never through the Slot passthrough, so the Jelly
 * custom element is the rendered node rather than being swallowed by an anchor -
 * and navigate on click, which is what gives the header CTAs the same soft-body
 * physics as the hero buttons. The element's own shadow `<button>` is the
 * focusable, keyboard-operable control, so Enter and Space activate it exactly
 * like a native button.
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

	/**
	 * The scroll path.
	 *
	 * `scroll` fires several times per frame on a long document, and a state
	 * update per event is a setState per event. The value the header renders
	 * only changes when the reader crosses the 8px line, so the event itself
	 * does nothing but ask for a frame: the frame reads `scrollY` once, and the
	 * state is written only when the boolean differs from the one already
	 * committed - which is also the only case that can repaint the header.
	 *
	 * That is one layout read and at most one write per frame, and the write
	 * never happens on the frames where the answer is the same as the last one.
	 * `Committed` is the effect's own record of what it last wrote, so the read
	 * is not compared against React state (which lags a commit behind).
	 */
	useEffect(() => {
		let Frame = 0;

		let Committed = false;

		const Read = () => {
			Frame = 0;

			const Next = window.scrollY > 8;

			if (Next === Committed) return;

			Committed = Next;

			SetScrolled(Next);
		};

		const OnScroll = () => {
			if (Frame !== 0) return;

			Frame = requestAnimationFrame(Read);
		};

		const OnHash = () => SetSection(window.location.hash.replace(/^#/, ""));

		SetPath(window.location.pathname);

		SetSection(window.location.hash.replace(/^#/, ""));

		/* The mount is not a scroll frame: read once, directly. */
		Read();

		window.addEventListener("scroll", OnScroll, { passive: true });

		window.addEventListener("hashchange", OnHash);

		return () => {
			if (Frame !== 0) cancelAnimationFrame(Frame);

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

	/**
	 * The status line under the bar.
	 *
	 * `status.value` is the key `En/Header.json` carries; `HeaderStatus` is the
	 * module's own English default, so the strip prints on a page whose locale
	 * file has not caught up rather than printing an empty band. The string is
	 * `STATUS: ACTIVE␁PRE-RELEASE` - the em quad is the grammar's only
	 * separator, and the label keeps its colon.
	 */
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
					aria-label={T("menu", { defaultValue: "Menu" })}
					onClick={() => SetOpen(!Open)}
				>
					<svg
						viewBox="0 0 24 24"
						width={20}
						height={20}
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
						focusable="false"
					>
						<path d="M4 5h16" />
						<path d="M4 12h16" />
						<path d="M4 19h16" />
					</svg>
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

					<Rail Translate={T} />

					<div className="HeaderAux">
						<LocaleSwitcher />

						<div className="HeaderActions">
							{AuthSlot}

							{Actions.map((Action) =>
								PlainVariant.has(Action.Variant) ? (
									/* No Jelly form for this variant: the anchor is
									   the control, so it keeps its href, its target
									   and its own keyboard behaviour. */
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
								) : (
									/* The Jelly element is the rendered node -
									   not routed through the Slot passthrough,
									   so it is not swallowed by an anchor. Its
									   shadow `<button>` carries focus and
									   Enter/Space; the destination is honoured
									   by Navigate. */
									<Button
										key={Action.Href}
										variant={Action.Variant}
										size="default"
										className="HeaderActionButton"
										onClick={() => {
											SetOpen(false);

											Navigate(Action);
										}}
									>
										{Action.Label}
									</Button>
								),
							)}
						</div>
					</div>
				</div>
			</div>

			{/*
			 * The running head: one 28px band, two statuses.
			 *
			 * Left, the record and the part it is open at - `# LAND /
			 * 03␁DOCUMENTATION` - printed by CSS from the `data-section`
			 * attribute `Base.astro` writes on `<html>`, so it is correct at
			 * first paint and never shifts when this island hydrates. Then the
			 * reader's position in the document (`03␁/␁10`).
			 *
			 * Right, the keeper line: `STATUS: ACTIVE␁PRE-RELEASE`, unchanged
			 * from K4 - the element, the class and the string are the ones
			 * `KEEPERS.md` records, and `.HeaderStatus` still carries the accent
			 * square that marks it as a live state rather than a sentence.
			 *
			 * `--HeaderStrip` is the band's height and part of `--HeaderHeight`,
			 * so an anchored heading clears the bar *and* the head. Below 640px
			 * the band prints two lines and reserves `3.25rem` - the same value
			 * on every page, so the head still never jumps between pages.
			 */}
			<div className="HeaderStrip">
				<RunningHead Logo={View.Logo} Translate={T} />

				<p className="HeaderStatus">{Status}</p>
			</div>
		</header>
	);
};

export { Header };

export default Header;
