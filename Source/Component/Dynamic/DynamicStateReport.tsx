import React from "react";

import { StateBadge } from "../Surface/StateBadge";

import { StateTerms } from "../Surface/State";

import type { StateTerm } from "../Surface/State";

/**
 * DynamicStateReport - the one shape every account, verify and dashboard state
 * branch renders.
 *
 * `DESIGN-COMPLETE.md` §1.5 fixes the vocabulary and the presentation: a coded
 * label (`STATUS: <TERM>`, `/ACCESS: ...`, `RECORD: ...`), one plain sentence
 * saying what happened, and the one action that is actually available. The
 * label is a Jelly badge, so the state is carried by a design-system element
 * rather than a styled span, and a loading state may show a restrained linear
 * indicator because motion is a signal there.
 *
 * Three rules this file exists to keep:
 *
 * - The label is never written at a call site. `StateLabel` below is the only
 *   place the vocabulary appears, and it is built from `State.ts`'s eight
 *   terms - so a branch cannot invent a status string, and this file cannot
 *   drift from the table the register reads.
 * - The tone is never a prop. `StateBadge` reads it from the table by the word
 *   the label carries. The `Tone` prop this component used to take, with a
 *   fourth `strong` value for error branches, is gone: §1.5 gives INTERRUPTED
 *   `ink` like every other non-achievement, and a failure's urgency belongs to
 *   `Role="alert"`, not to a second colour.
 * - A caller owns the sentence and the action, because only the caller knows
 *   what happened and what the reader can do next. This component owns the
 *   grammar.
 */

/** `STATUS: <TERM>` - the label a state of this register prints. */
const Status = (Term: StateTerm): string => `STATUS: ${Term}`;

/** The eight terms of the status vocabulary, plus the two edge labels. */
export const StateLabel = {
	Ready: Status("READY"),

	Active: Status("ACTIVE"),

	Loading: Status("LOADING"),

	Preparing: Status("PREPARING"),

	Verified: Status("VERIFIED"),

	Unavailable: Status("UNAVAILABLE"),

	Interrupted: Status("INTERRUPTED"),

	Archived: Status("ARCHIVED"),

	/* Not states of the register: a record with nothing in it, and an access
	   condition. They print through the same badge, in `ink`, because they are
	   labels of a record and not achievements of one. */
	Empty: "RECORD: EMPTY",

	SignInRequired: "/ACCESS: SIGN IN REQUIRED",
} as const;

/** The eight values this report may print, for a caller that wants to check. */
export const StateVocabulary: readonly StateTerm[] = StateTerms;

export interface StateReportProps {
	/** One of `StateLabel`'s values - never a literal written here. */
	readonly Label: string;

	/** What happened, in one sentence, in plain language. */
	readonly Sentence: React.ReactNode;

	/** The one action available from this state. */
	readonly Action?: React.ReactNode;

	/** `status` for a report, `alert` for a failure the reader must notice. */
	readonly Role?: "status" | "alert";

	/** Draw the restrained linear indicator §1.5 asks of a loading state. */
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
	Sentence,
	Action,
	Role = "status",
	Loading = false,
}: StateReportProps) => (
	<div className="auth-shell__report" role={Role}>
		<div className="auth-shell__status">
			<StateBadge Label={Label} />
		</div>

		{Loading ? <Indicator /> : null}

		<p className="auth-shell__report-sentence">{Sentence}</p>

		{Action}
	</div>
);

export { DynamicStateReport };

export default DynamicStateReport;
