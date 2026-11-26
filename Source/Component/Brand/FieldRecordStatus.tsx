import React from "react";

import { cn } from "../UI/Utility";

export type FieldRecordStatusState =
	| "ready"
	| "active"
	| "loading"
	| "preparing"
	| "verified"
	| "unavailable"
	| "interrupted"
	| "archived";

export type FieldRecordStatusTone = "ink" | "specimen" | "quiet";

export interface FieldRecordStatusProps {
	status: FieldRecordStatusState;

	tone?: FieldRecordStatusTone;

	/** Optional full status copy, e.g. "STATUS: SOURCE ACTIVE" (hero). */
	copy?: string;

	className?: string;
}

/**
 * FieldRecordStatus - the STATUS ledger row (C17 split).
 *
 * "STATUS:" stays dark ink; the VALUE is the fact and is set in the record's own
 * ink, muted for a quiet (pending or retired) state.
 *
 * ─── THE MARK IS THE MARK LAYER'S, INCLUDING ITS AIR ──────────────────────
 * The row is a key, a colon and a value, and the two marks between them are the
 * grammar's:
 *
 *   `STATUS`  +  `<span class="MarkColon"/>`  +  `▮`  +  `SOURCE ACTIVE`
 *
 * The colon is `Mark/_Punctuation.scss`'s and prints `--mark-gap` after itself;
 * the square is `Mark/_Square.scss`'s and prints the same `--mark-gap` after
 * itself (`data-mark-inline`). So the square sits between the key and the value
 * with the same 0.5ch of air on each side, and this file writes no space, no
 * margin and no `gap` - it cannot, because there is nothing here to tune. The
 * hero used to print `STATUS: ▮SOURCE ACTIVE` because the space was typed here
 * and the square's margin was an inline style; that is the defect the mark layer
 * now makes impossible.
 *
 * THE ATTESTED TONE IS A SHAPE, NOT A HUE. `DESIGN-COMPLETE.md` §1.5 asks
 * ACTIVE and VERIFIED to carry a marker beside the word, because a status that
 * renders exactly like an ordinary fact has lost its state. The marker used to
 * be a hue - `specimen` printed the value in `--Accent` - which spent the site's
 * authentication colour on a value on every page that carried a record head, and
 * vanished for a reader who cannot see green. It is the mark layer's square
 * (`Mark/_Square.scss`) at the attested step - half again the 4px a reporting
 * state prints - in the value's own ink: one shape for a state everywhere on the
 * site, and one that survives greyscale. The box and its gap are the ladder's
 * and the token's (`MarkSquare`, `--mark-gap`), never an inline style here,
 * because a mark set that lives in seven inline styles is seven marks.
 */
const FieldRecordStatus: React.FC<FieldRecordStatusProps> = ({
	status,
	tone = "ink",
	copy,
	className,
}) => {
	const IsAttested =
		status === "active" || status === "verified" || tone === "specimen";

	const ValueColor =
		tone === "quiet" ? "var(--MuteForeground)" : "var(--CardForeground)";

	const CopyValue = copy
		? (copy.split(":")[1] ?? status.toUpperCase()).trim()
		: status.toUpperCase();

	return (
		<span
			className={cn(
				"text-field-s font-mono uppercase tracking-wider",
				className,
			)}
		>
			<span style={{ color: "var(--CardForeground)" }}>
				STATUS<span className="MarkColon" aria-hidden="true" />
			</span>
			<span style={{ color: ValueColor }}>
				{IsAttested ? (
					<span
						className="MarkSquare"
						data-mark-tone="specimen"
						data-mark-inline="true"
						style={{ color: ValueColor }}
						aria-hidden="true"
					/>
				) : null}
				{CopyValue}
			</span>
		</span>
	);
};

export { FieldRecordStatus };

export default FieldRecordStatus;
