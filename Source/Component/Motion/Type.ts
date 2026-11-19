/**
 * Type - the shapes the motion layer's components render.
 *
 * Six components, four shapes, and one rule the record layer already states:
 * a block renders what a page hands it and never sorts, derives or invents. Only
 * the fold, the expand, the sequence and the specimen carry a shape here; the
 * skeleton and the origin take their props inline. The one derived value is a
 * *bar length* - the interval as a percentage of the longest interval the site
 * has - and it is derived in `MotionSpecimen` from the caller's milliseconds so
 * the page cannot print two different scales.
 *
 * Field names are lower camel case and every array is `readonly`, matching
 * `Component/Record/Type.ts`. A page that needs a field this module does not
 * carry declares a local type in its own file and says so.
 */

/** One leaf of a fold: a row that was written down and kept closed. */
export interface FoldLeaf {
	/** The row's own numbering, printed verbatim: `01`. Absent, no cell. */
	index?: string;

	/** The row's label. The only required field. */
	label: string;

	/** One line under the label - what the leaf carries. */
	note?: string;

	/** Where the leaf leads. Absent, the row is a statement. */
	href?: string;

	/** The right-hand cell: a count, a state, a source. */
	meta?: string;

	/**
	 * The leaf's target is gone. The row keeps its place, takes `◎` and muted
	 * ink, drops its link and prints `meta` as the tombstone's own note.
	 */
	gone?: boolean;
}

/** A fold's own facts: what it is called, how many leaves, and what state it is in. */
export interface FoldSpec {
	/** The register line's name: `OPEN QUESTIONS`. */
	name: string;

	/** The `/LABEL` after the name, when the fold needs one. */
	label?: string;

	/** The count printed in the summary. Defaults to the leaf count. */
	count?: string;

	/** The leaves, in reading order. */
	leaves: readonly FoldLeaf[];

	/** What the fold says with no leaves. Required - a fold onto nothing is a lie. */
	empty: string;

	/**
	 * `rest` prints the leaves; `loading` prints their keys with the values
	 * barred. The keys come from `keys`, which is the schema the record will
	 * have - known before the values are.
	 */
	state?: "rest" | "loading";

	/** `loading` only: the field names the arriving record will print. */
	keys?: readonly string[];

	/** `loading` only: what has not arrived yet. Printed as `WAITING ON:`. */
	waiting?: string;

	/** The run is longer than its frame: caps the body at 60vh with its own scroll. */
	long?: boolean;

	/** Printed under a long run: how many are in it, and that it scrolls. */
	more?: string;
}

/** One fact in an expanded record's register. */
export interface ExpandFact {
	/** `SOURCE:`, `AS OF:`, `METHOD:` - the field's label. */
	key: string;

	/** The value. `UNAVAILABLE` is the honest absence and is printed as one. */
	value: string;

	/** One line under the value. */
	note?: string;
}

/** One record in an expandable set. */
export interface ExpandRecord {
	/** `RECORD_03` - the row's marker, printed after the `#`. */
	index: string;

	/** The record's name. The row's heading. */
	name: string;

	/** The one fact the closed row prints at its right edge. */
	fact?: string;

	/** The record's full register, revealed in place. */
	rows: readonly ExpandFact[];

	/** `SOURCE:` - where the register was read out of. Required. */
	source: string;

	/**
	 * The record's target is gone: the row renders as a tombstone instead of a
	 * disclosure, and this sentence says what it was.
	 */
	missing?: string;
}

/** One state in a sequence. */
export interface SequenceNode {
	/** `01` - the node's position, printed verbatim. */
	index: string;

	/** The state word. One of the eight the vocabulary fixes. */
	state: string;

	/** One line under the state - what it means here. */
	note?: string;
}

/** One transition between two states. */
export interface SequenceEdge {
	/** The motion's name: `PRESS`, `SETTLE`, `FOLD`. */
	motion: string;

	/** `150 MS`. Absent or `UNAVAILABLE` prints the honest absence. */
	interval?: string;

	/** What the transition explains, in one line. */
	explains?: string;
}

/** A state change drawn: nodes and the edges between them. */
export interface Sequence {
	/** The register line's name: `THE COPY`. */
	name: string;

	/** The nodes, in order. Order is the content: nothing here sorts. */
	nodes: readonly SequenceNode[];

	/** The transitions, one fewer than the nodes. */
	edges: readonly SequenceEdge[];

	/** `SOURCE:` - the file or block the sequence was read out of. Required. */
	source: string;

	/**
	 * What the state change does for a reader who asked for less motion.
	 *
	 * Every rule in `System/Motion/` declares its end state unconditionally and
	 * gates only its interval, so the promise is the same document in one frame.
	 * A block that printed its intervals and not that promise would be the one block
	 * in the family that could not state it - and the reader who needs the sentence
	 * is exactly the one who will never see the transition.
	 */
	reduced?: string;

	/** What the sequence says when it has fewer than two nodes. Required. */
	empty: string;
}

/** One motion, as the specimen sheet states it. */
export interface SpecimenMotion {
	/** `08` - the motion's own position in the register. */
	index: string;

	/** The class name: `FOLD`, `EXPAND`, `HANDOVER`. */
	name: string;

	/** What it explains, in one sentence. Printed after `↳`. */
	explains: string;

	/** The interval in milliseconds, for the bar's scale and the printed value. */
	interval: number;

	/** The printed value: `200 MS`, `UNAVAILABLE`. */
	intervalText: string;

	/** The curve's name: `ARRIVE`, `LINE`, `RETURN`. */
	curve: string;

	/** The curve's literal, printed as code. */
	curveValue: string;

	/** What moves: `OPACITY + TRANSFORM`, `TRANSFORM`. */
	moves: string;

	/** The rule the class keeps, in one line. */
	keeps: string;
}
