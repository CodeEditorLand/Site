/**
 * Type - the published shape of a record metadata list.
 *
 * A metadata list is a run of key/value rows under a card's title block:
 * `TARGET: Linux`, `LICENSE: CC0`, `SIGNAL: ABSENT`. The rows are printed in
 * the order given and never sorted - the order is the record's own reading
 * order, and a card that re-ordered them would be writing the record.
 *
 * Two prop names carry the same rows: `pairs` and `rows`. The block reads
 * `pairs` first and falls back to `rows` - the order the React card read them
 * in, kept so a call site that sets both keeps printing the same list - and a
 * caller that writes neither gets no list at all rather than an empty `dl`.
 */
export interface Pair {
	/** Mono key, e.g. `TARGET`, `LICENSE`, `SIGNAL`. Printed with its colon. */
	label: string;

	/** Ink value, printed at the same weight as the key. */
	value: string;
}

export interface Props {
	/** The rows, in reading order. The published prop. */
	rows?: readonly Pair[];

	/** The rows, in reading order. The older prop name. */
	pairs?: readonly Pair[];

	/** Extra classes from the host, appended after the block's own. */
	className?: string;

	/** The `.astro` spelling of the same slot. */
	class?: string;
}
