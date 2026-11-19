"use client";

import { Header } from "../Layout/Header";

import type { HeaderContent } from "../Layout/Header";

import type {
	HeaderContentAction,
	HeaderNavigationLink,
} from "../Layout/Header/Type.js";

import type Property from "./Interface/Property/Header.js";

/**
 * DynamicHeader - the legacy schema-driven header, as an adapter.
 *
 * It is an adapter, not a header: `Layout/Header` owns the bar markup, the
 * mobile panel and the two modes, and this file adapts the old schema to it. A
 * header of its own would be a third variant beside the two the design system
 * defines, and the one it used to draw carried a theme toggle on a site with
 * exactly one theme (`DESIGN.md` §1.1, `DesignSystem.md` §6.9).
 *
 * It renders `Layout/Header` and nothing else, so there is one bar, two modes
 * and one nav on the whole site. The legacy schema is adapted here rather than
 * in the bar, because the bar must not know that an old schema exists.
 *
 * `Sticky` and `ShowMobileMenu` are dropped, not lost: the bar is always sticky
 * and always owns its own toggle - a caller could only ever turn those off by
 * removing the chrome a page needs.
 */

/** One legacy action row, in either schema shape, as the bar's own row. */
const AdaptAction = (Action: unknown): readonly HeaderContentAction[] => {
	const Row = Action as {
		Type?: string;

		Text?: string;

		Href?: string;

		Variant?: string;

		Content?: { Text?: string; Href?: string; Variant?: string };
	};

	// The mobile-menu entry was never an action: the bar draws its own toggle.
	if (Row.Type === "mobile-menu") return [];

	const Text = Row.Text ?? Row.Content?.Text ?? "";

	if (Text === "") return [];

	const Href = Row.Href ?? Row.Content?.Href;

	const Variant = Row.Variant ?? Row.Content?.Variant;

	return [
		{
			Text,
			...(Href === undefined ? {} : { Href }),
			...(Variant === undefined ? {} : { Variant }),
		},
	];
};

/** One legacy nav row, as the bar's own row. A row with no href is dropped. */
const AdaptLink = (Link: unknown): readonly HeaderNavigationLink[] => {
	const Row = Link as { Label?: string; Href?: string };

	if (Row.Label === undefined || Row.Href === undefined) return [];

	return [{ Label: Row.Label, Href: Row.Href }];
};

const DynamicHeader = ({ Content }: Property) => {
	const Adapted: HeaderContent = {
		Logo: { Text: Content.Logo.Text },

		Navigation: Content.Navigation.flatMap(AdaptLink),

		Actions: Content.Actions.flatMap(AdaptAction),
	};

	return <Header Content={Adapted} Mode="minimal" />;
};

export { DynamicHeader };

export default DynamicHeader;
