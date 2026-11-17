/**
 * Type - the shapes the dashboard's own composites render.
 *
 * The Record layer publishes the block shapes (`Record/Type.ts`); this file
 * publishes only what a dashboard composite adds on top of them. A request
 * destination is an `Entry` verbatim - index, name, chips, one line, a link -
 * because that is exactly what a decision list is, and re-declaring it would
 * let the two drift.
 *
 * One shape here, not two: a group is a label, a sentence, its destinations,
 * and the sentence it prints when it has none. The empty sentence lives with
 * the group rather than in the template so a group can never be added without
 * one.
 */
import type { Entry } from "../Record/Type.js";

/**
 * One labelled group of destinations: the rights directory, the support
 * directory, the erasure entry.
 */
export interface RequestGroup {
	/** The group's label, at meta weight. */
	readonly label: string;

	/** One sentence: what the group is for. */
	readonly intro: string;

	/** The destinations, in the order the page offers them. */
	readonly links: readonly Entry[];

	/** What the reader is told when the group has no destination to offer. */
	readonly empty: string;

	/**
	 * The group destroys something, so its label takes `--Destruct` ink. Set
	 * on the label only: the entries inside keep the record ink, because the
	 * danger belongs to the act, not to the words around it.
	 */
	readonly danger?: boolean;
}
