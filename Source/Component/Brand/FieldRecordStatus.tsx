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
 * THE ATTESTED TONE IS A SHAPE, NOT A HUE. `DESIGN-COMPLETE.md` §1.5 asks
 * ACTIVE and VERIFIED to carry a marker beside the word, because a status that
 * renders exactly like an ordinary fact has lost its state. The marker used to
 * be a hue - `specimen` printed the value in `--Accent` - which spent the site's
 * authentication colour on a value on every page that carried a record head, and
 * vanished for a reader who cannot see green. It is a 6px square now (half again
 * the 4px square the Record blocks print for a reporting state, via
 * `--state-mark-scale-attested`), in the value's own ink: one shape for a state
 * everywhere on the site, and one that survives greyscale.
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
			<span style={{ color: "var(--CardForeground)" }}>STATUS:</span>
			<span style={{ color: ValueColor }}>
				{" "}
				{IsAttested ? (
					<span
						aria-hidden="true"
						style={{
							display: "inline-block",
							inlineSize: "6px",
							blockSize: "6px",
							marginInlineEnd: "0.4em",
							background: "currentColor",
						}}
					/>
				) : null}
				{CopyValue}
			</span>
		</span>
	);
};

export { FieldRecordStatus };

export default FieldRecordStatus;
