import React from "react";

/**
 * DynamicStateReport - the one shape every account, verify and dashboard state
 * branch renders.
 *
 * `DesignSystem-Components.md` §7 fixes the vocabulary and the presentation:
 * a coded label (`STATUS: <TERM>`, `/ACCESS: ...`, `RECORD: ...`), one plain
 * sentence saying what happened, and the one action that is actually available.
 * §8 fixes the rest: the label is a Jelly badge, so the state is carried by a
 * design-system element rather than a styled span, and a loading state may show
 * a restrained linear indicator because motion is a signal there.
 *
 * Two rules this file exists to keep:
 *
 * - The label is never written at a call site. `StateLabel` below is the only
 *   place the vocabulary appears, so a branch cannot invent a status string.
 * - Tone is a value, not a branch. `ToneStyle` resolves a tone to the two Jelly
 *   properties it needs, and the component reads that table - it never decides
 *   a colour.
 *
 * A caller owns the sentence and the action, because only the caller knows what
 * happened and what the reader can do next. This component owns the grammar.
 */

/** The eight terms of the status vocabulary, plus the two edge labels. */
export const StateLabel = {
	Ready: "STATUS: READY",
	Active: "STATUS: ACTIVE",
	Loading: "STATUS: LOADING",
	Preparing: "STATUS: PREPARING",
	Verified: "STATUS: VERIFIED",
	Unavailable: "STATUS: UNAVAILABLE",
	Interrupted: "STATUS: INTERRUPTED",
	Archived: "STATUS: ARCHIVED",
	Empty: "RECORD: EMPTY",
	SignInRequired: "/ACCESS: SIGN IN REQUIRED",
} as const;

/**
 * The four tones §7 assigns: `ink` for READY/LOADING/UNAVAILABLE/INTERRUPTED,
 * `specimen` for ACTIVE/VERIFIED, `quiet` for PREPARING/ARCHIVED, and `strong`
 * for the error that must not read as an ordinary note.
 */
export type StateTone = "ink" | "specimen" | "quiet" | "strong";

/** One tone as the Jelly badge's own two properties. Both are tokens. */
const ToneStyle: Record<StateTone, Record<string, string>> = {
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

	strong: {
		"--jelly-fill": "var(--Foreground)",
		"--jelly-label": "var(--Background)",
	},
};

/** The badge's own variant name for a tone; the fill above is what paints it. */
const ToneVariant: Record<StateTone, "mint" | "platinum" | "graphite"> = {
	ink: "platinum",
	specimen: "mint",
	quiet: "platinum",
	strong: "graphite",
};

export interface StateReportProps {
	/** One of `StateLabel`'s values - never a literal written here. */
	readonly Label: string;

	/** Defaults to `ink`, the weight READY/LOADING/UNAVAILABLE use. */
	readonly Tone?: StateTone;

	/** What happened, in one sentence, in plain language. */
	readonly Sentence: React.ReactNode;

	/** The one action available from this state. */
	readonly Action?: React.ReactNode;

	/** `status` for a report, `alert` for a failure the reader must notice. */
	readonly Role?: "status" | "alert";

	/** Draw the restrained linear indicator §7 asks of a loading state. */
	readonly Loading?: boolean;
}

/** The indicator: a 1px ink rule with one accent segment tracking along it. */
const Indicator = () => (
	<span
		aria-hidden="true"
		style={{
			display: "block",
			blockSize: "2px",
			inlineSize: "100%",
			background:
				"color-mix(in srgb, var(--Foreground) 20%, transparent)",
		}}
	>
		<span
			className="motion-safe:animate-pulse"
			style={{
				display: "block",
				blockSize: "2px",
				inlineSize: "33%",
				background: "var(--Accent)",
			}}
		/>
	</span>
);

const DynamicStateReport = ({
	Label,
	Tone = "ink",
	Sentence,
	Action,
	Role = "status",
	Loading = false,
}: StateReportProps) => (
	<div className="auth-shell__report" role={Role}>
		<div className="auth-shell__status">
			<jelly-badge
				shape="square"
				variant={ToneVariant[Tone]}
				style={
					{
						...ToneStyle[Tone],
						"--jelly-badge-radius": "0",
						"--jelly-badge-font-size": "13px",
					} as React.CSSProperties
				}
			>
				{Label}
			</jelly-badge>
		</div>

		{Loading ? <Indicator /> : null}

		<p className="auth-shell__report-sentence">{Sentence}</p>

		{Action}
	</div>
);

export { DynamicStateReport };

export default DynamicStateReport;
