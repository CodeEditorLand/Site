import React from "react";

import { cn } from "../UI/Utility";

import { ACCENT_GREEN } from "../../Function/Theme/SemanticColor";

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
 * "STATUS:" stays dark ink; the VALUE turns green for ACTIVE / VERIFIED /
 * specimen tones (the site's green accent), muted for quiet tones, and
 * stays ink otherwise. Character-level: the label and value are separate
 * spans so each reads in its own ink.
 */
const FieldRecordStatus: React.FC<FieldRecordStatusProps> = ({
	status,
	tone = "ink",
	copy,
	className,
}) => {
	const IsActive =
		status === "active" || status === "verified" || tone === "specimen";

	const ValueColor = IsActive
		? ACCENT_GREEN
		: tone === "quiet"
			? "var(--MuteForeground)"
			: "var(--CardForeground)";

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
				STATUS:
			</span>
			<span style={{ color: ValueColor }}>
				{" "}
				{CopyValue}
			</span>
		</span>
	);
};

export { FieldRecordStatus };

export default FieldRecordStatus;