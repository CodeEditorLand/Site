/**
 * Type - the published shape of the record-card template.
 *
 * The template renders one `FieldRecord` content object - the same object
 * every element record in `Source/Content/Record/<Element>.ts` publishes - so
 * its props are that shape and nothing else. There is no second, template-only
 * shape: a card that needed one would be a card the content model cannot
 * describe, and the content model is what the F4 series is written against.
 *
 * Two derivations belong to this template rather than to the content model,
 * because both are print decisions and not data: the index marker loses its
 * leading `#` (the block prints its own), and the status value is lowercased
 * into the state the status block switches on.
 */
import type { FieldRecord as Record } from "../../../Content/Record/FieldRecord.js";

export interface Props {
	/** The record to print. */
	record: Record;

	/** Extra classes from the host, appended after the template's own. */
	className?: string;

	/** The `.astro` spelling of the same slot. */
	class?: string;
}
