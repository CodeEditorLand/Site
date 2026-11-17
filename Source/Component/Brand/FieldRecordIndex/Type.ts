/**
 * Type - the published shape of a record index.
 *
 * A record index is one string: the record's own marker, printed as
 * `# MARKER`. It is not derived from a name and it is not a number - a record
 * that carries `ROUTE_404` prints `# ROUTE_404`, and a record that carries
 * `# MOUNTAIN_01` prints `# MOUNTAIN_01` after the caller strips the hash.
 */
export interface Props {
	/** The marker, printed verbatim after `# `. */
	index: string;

	/** Extra classes from the host, appended after the block's own. */
	className?: string;

	/** The `.astro` spelling of the same slot. */
	class?: string;
}
