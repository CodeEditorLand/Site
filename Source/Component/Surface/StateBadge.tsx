/**
 * StateBadge - one state word, as a Jelly badge, inside a React island.
 *
 * The Astro twin is `SurfaceBadge.astro`; this is the same block for the places
 * that render in the browser (`DynamicStateReport`, `AuthReport`). An Astro
 * component cannot run inside a hydrated island, so the family has two
 * renderers - but only one grammar, and only one table behind it.
 *
 * **The tone is not a prop.** It is read from `State.ts` by the word the label
 * carries, so a route cannot hand in a tone of its own. That is the rule this
 * component exists to enforce: `STATUS: INTERRUPTED` is `ink` because §1.5 says
 * INTERRUPTED is ink, not because the branch that renders it is an error
 * branch. The four-tone table this replaces (`ink`, `specimen`, `quiet`,
 * `strong`) was the one place a route could print a state in a colour the
 * vocabulary does not own; `strong` is gone and nothing can pass a fifth tone.
 *
 * A word outside the eight prints in `ink` and stays a state of its record: a
 * label the page chose to print is not re-worded here, only tinted.
 *
 * The badge is the house surface (`<jelly-badge>`), square, at the design
 * system's 13px, painted from tokens through its own `--jelly-*` properties -
 * set, never repainted by a lane class. The 2px marker before the word is the
 * register's own (`surface__mark`, `currentColor`), so a badge and a register
 * row show the same shape and the state survives greyscale.
 *
 * The whole label - key, colon and word - carries the tone's ink: on a badge
 * the label is one field of the record, and the key it is stated under is part
 * of what the reader is being told. Where the register splits the two columns
 * (`SurfaceState.astro`) it is because the register is a table; a badge is not.
 *
 * No script and no hydration of its own: it renders inside the island that
 * owns it.
 */
import type { CSSProperties } from "react";

import { Tone } from "./State.js";

import type { StatusTone } from "../../Content/Record/FieldRecord.js";

/** One tone as the Jelly badge's two properties. Both are tokens. */
const ToneStyle: Readonly<Record<StatusTone, Record<string, string>>> = {
	ink: {
		"--jelly-fill": "var(--Mute)",

		"--jelly-label": "var(--Foreground)",
	},

	specimen: {
		"--jelly-fill": "var(--SpinegRPCMute)",

		"--jelly-label": "var(--SpinegRPCFore)",
	},

	quiet: {
		"--jelly-fill": "var(--Mute)",

		"--jelly-label": "var(--MuteForeground)",
	},
};

/** The badge's own variant name for a tone; the fill above is what paints it. */
const ToneVariant: Readonly<Record<StatusTone, "mint" | "platinum">> = {
	ink: "platinum",

	specimen: "mint",

	quiet: "platinum",
};

interface Props {
	/** The label, verbatim: `STATUS: LOADING`, `RECORD: EMPTY`. */
	Label: string;
}

const StateBadge = ({ Label }: Props) => {
	const Resolved = Tone(Label) ?? "ink";

	return (
		<jelly-badge
			shape="square"
			variant={ToneVariant[Resolved]}
			style={
				{
					...ToneStyle[Resolved],
					"--jelly-badge-radius": "0",
					"--jelly-badge-font-size": "13px",
				} as CSSProperties
			}
		>
			<span className="surface__mark" aria-hidden="true"></span>
			{Label}
		</jelly-badge>
	);
};

export { StateBadge };

export default StateBadge;
