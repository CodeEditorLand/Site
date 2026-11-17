/**
 * Type - the data shapes the Record layer's eight blocks render.
 *
 * One exported type per concept, and no React: a block's props are these
 * shapes plus whatever the page composes around them. Field names are lower
 * camel case; arrays are `readonly`, and so are their elements, because a
 * block renders the data a page hands it and never sorts, splices or pushes
 * it.
 *
 * This module supersedes `Interface.ts`, which carried a `ReactNode` figure
 * body and two shapes that disagree with the CSS surface (a string index
 * strip, a `right` cell alignment). Three departures are deliberate and are
 * the ones a block card should read twice:
 *
 * - `Band.index` is an array of `{ label, href }`, not an array of strings:
 *   the index strip is a strip of links, so the href belongs to the item
 *   rather than to the band.
 * - `MatrixColumn.align` is `"left" | "center"`, matching the published
 *   `.record-matrix__cell` surface; there is no `right`.
 * - `MatrixColumn.ink` is a `string` - a token name the block resolves to a
 *   `var(--...)`, e.g. `"SpinegRPCFore"`. A fixed union here would have to
 *   grow every time the token sheet grows.
 *
 * A block that needs a shape this file does not carry declares a local type in
 * its own file and reports the mismatch. An honest local shape beats a forced
 * fit against a wrong shared one.
 */

/**
 * The surface a band sits on. Alternation carries the rhythm: never two
 * `paper` bands in a row, never three `canvas` bands in a row. `flush` is the
 * first band after the header - the header already ends the page, so that band
 * drops its top rule.
 */
export type Tone = "paper" | "canvas" | "flush";

/**
 * RecordBand - the section grammar itself. One subject per band: a kicker and
 * a heading open it, a standfirst and an index strip may follow, a footnote
 * may close it.
 */
export interface Band {
	/** The `/SECTION LABEL` opening the band. */
	kicker: string;

	/** The chapter claim. The band's single `h2`. */
	heading: string;

	/** One sentence, at most two lines. */
	standfirst?: string;

	/**
	 * The index strip above the body: one cell per marker. Absent means no
	 * strip at all - never an empty one.
	 */
	index?: readonly { label: string; href: string }[];

	/** Provenance, caveat or source line. */
	footnote?: string;

	/** Band surface. Defaults to `canvas`. */
	tone?: Tone;
}

/**
 * RecordEntry - one record in a set (element, edition, article, doc): index
 * marker, optional glyph, name, chip row, one-paragraph body, optional link.
 */
export interface Entry {
	/** `"# MOUNTAIN_01"` - displayed verbatim, never re-derived from `name`. */
	index: string;

	/** The record's name. The entry's own heading. */
	name: string;

	/** A leading glyph (`↳`, `〈〉`, `#`) when the record carries one. */
	glyph?: string;

	/** Chip row: short labels, rendered in the order given. */
	chips?: readonly string[];

	/** One paragraph. The entry's claim, not a summary of a summary. */
	body: string;

	/** Where the whole entry leads, when it leads anywhere. */
	href?: string;
}

/** One key/value fact in a ledger. */
export interface LedgerRow {
	/** Mono key, e.g. `TARGET`, `LICENSE`, `SIGNAL`. */
	key: string;

	/** Ink value. */
	value: string;

	/** Optional qualifier printed after the value, at caption weight. */
	note?: string;

	/**
	 * The one giant figure: this row renders at display weight instead of
	 * ledger weight. At most one row per ledger sets it.
	 */
	lead?: boolean;
}

/** One column of a matrix: its header label, its ink, its alignment. */
export interface MatrixColumn {
	/** Header label, rendered in the head row at meta weight. */
	label: string;

	/**
	 * Header ink as a token name, e.g. `"SpinegRPCFore"`, `"Accent"`,
	 * `"Foreground"`. The block resolves it to `var(--<ink>)` and hands the
	 * column a `--MatrixInk`; the stylesheet never carries a literal colour.
	 * Defaults to `Foreground`.
	 */
	ink?: string;

	/**
	 * Cell alignment. Defaults to `left`; `center` is for a short boolean or
	 * verdict column, where a centred mark reads faster than a left-aligned
	 * one.
	 */
	align?: "left" | "center";
}

/** One step on a stage's rail. */
export interface Stage {
	/** The rail number, `01`-prefixed as the page writes it. */
	index: string;

	/** The step's name. */
	label: string;

	/** One line. A stage that needs a paragraph is not a stage. */
	line: string;

	/** Where the step leads, when it leads anywhere. */
	href?: string;
}

/**
 * RecordWell - a command, config block or transcript: a recessed mono body in a
 * hairline frame, under a title bar carrying the label and the copy control.
 */
export interface Well {
	/** Title-bar label, e.g. `INSTALL`, `CONFIG`, `TRANSCRIPT`. */
	label: string;

	/**
	 * Language tag for the title bar (`bash`, `json`, `toml`). A label, not a
	 * syntax-highlighter switch: the well is mono, flat, one ink.
	 */
	language?: string;

	/** One entry per line, printed verbatim. No wrapping, no reflow. */
	lines: readonly string[];

	/** Show the copy control in the title bar. Defaults to `true`. */
	copy?: boolean;
}

/** One pod of a pair: a title bar and a body. */
export interface PairPod {
	/** The title-bar label. */
	label: string;

	/** The pod's body - prose, rendered in the pod's own frame. */
	body: string;

	/**
	 * This pod is the subject: the one the other pod is read against. At most
	 * one pod per pair sets it, and it is marked on the frame, not restated in
	 * the label.
	 */
	subject?: boolean;
}

/**
 * RecordPair - two things read against each other: two pods of equal height,
 * each with a title bar and a body, under one shared caption.
 */
export interface Pair {
	left: PairPod;

	right: PairPod;

	/** The caption shared below both pods. */
	caption?: string;
}

/**
 * RecordFigure - evidence: a framed figure, a caption at caption weight and an
 * optional provenance line. The caption is required - an uncaptioned figure is
 * decoration.
 */
export interface Figure {
	/** What the evidence shows, measure-capped. Required. */
	caption: string;

	/** Where it came from: file, manifest, measurement, commit. */
	provenance?: string;

	/**
	 * The image to frame. `src` and `alt` are set together or not at all: when
	 * both are absent the block renders its own composed children (a chart, a
	 * diagram, a rendered element) as the media instead.
	 */
	src?: string;

	/** The image's alternative text. Set with `src`, never alone. */
	alt?: string;
}
