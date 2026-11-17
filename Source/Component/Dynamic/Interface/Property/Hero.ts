import type { HeroBand } from "../../Hero/Type.js";

import type Interface from "../Content/Hero.js";

export default interface Property {
	Content: Interface;

	/**
	 * The band's own copy, rows and destinations, resolved by the page from
	 * `Hero/Data.ts`. Optional so the prop surface stays additive: a caller that
	 * hands only `Content` still renders the band's real English copy.
	 */
	Band?: HeroBand;

	ClassName?: string;
}
