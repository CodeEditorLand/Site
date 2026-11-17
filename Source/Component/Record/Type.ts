/**
 * Type - the data shapes the Record layer's ten blocks render.
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
 *
 * Two of the shapes below name a union the Brand layer owns - the status
 * vocabulary and the seal's element - and they import it rather than restate
 * it. A second copy of a status word would be a second place to teach the ink
 * register, and the copy that falls behind prints a state nothing has a colour
 * for. These are `import type` lines: erased at build, no React at runtime.
 */

import type {
	FieldRecordStatusState,
	FieldRecordStatusTone,
} from "../Brand/FieldRecordStatus";

import type { FieldRecordElement } from "../Brand/FieldRecordSeal";

/**
 * The surface a band sits on. Surface follows the artifact (DESIGN.md §5 A5):
 * there is no alternation down a page, so `paper` is the white information box
 * and `canvas` the creme field, each chosen because the subject is one or the
 * other. `flush` is the first band after the header - the header already ends
 * the page, so that band drops a top rule it would otherwise paint.
 *
 * `bare` is the tone of a band that is a *section of an artifact already on a
 * Jelly surface* (DESIGN.md §4.1, §9 Q1): no border, no fill, no padding of
 * its own and no ink of its own. The surface and the inset belong to the card,
 * and the band is structure inside it.
 */
export type Tone = "paper" | "canvas" | "flush" | "bare";

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

/**
 * One filed record in an archive. Three parts, and no fourth: the title is the
 * link's text, the note is the summary printed beside it, and the marker is the
 * one value the row prints in its leading column.
 *
 * Every field but `title` and `href` is optional, because the two surfaces that
 * need an archive carry different facts: the blog rows have a date and a
 * reading time, the doc rows have a section and a note, and a shape that
 * required all of them would make each surface invent the other's.
 */
export interface ArchiveEntry {
	/** The entry's name - the row's link text, and the only text a row must carry. */
	title: string;

	/** Where the row leads. */
	href: string;

	/** The summary printed under the title. Absent, the row is its title alone. */
	note?: string;

	/**
	 * The leading marker column: a date, a section, a reading time, printed
	 * verbatim. One value, because the row has one marker column - a surface
	 * that wants two facts composes one string.
	 */
	marker?: string;

	/**
	 * The sub-label this entry files under, e.g. `"/ELEMENTS"`. Entries that
	 * carry the same label and sit next to each other are one run: the block
	 * prints the label once, above them. Absent, the entry belongs to an
	 * unlabelled run.
	 *
	 * It is a field of the entry rather than a second array of groups so that
	 * `entries` stays the one list the header's count is derived from - two
	 * arrays would be two places for the number and the rows under it to
	 * disagree. Both surfaces already carry the label in their own data (the doc
	 * index groups its rows, the blog has no groups at all), so nothing here is
	 * a field the data does not have.
	 */
	group?: string;
}

/**
 * RecordArchive - many records in one physical form: the archive index. A
 * record header that names the archive and counts its entries, then one row per
 * entry - the title as the link, the summary as its note, an optional marker
 * column.
 *
 * `entries` alone is a complete archive: the header's count is derived from the
 * list, so the number and the rows under it cannot disagree. `index`, `heading`
 * and `count` are the header's copy, and they belong to the page.
 */
export interface Archive {
	/** Every entry, in the order it prints. The block sorts nothing. */
	entries: readonly ArchiveEntry[];

	/**
	 * The record's marker, e.g. `"ARCHIVE_01"`, printed as `# ARCHIVE_01`.
	 * Absent, the header opens with the heading alone.
	 */
	index?: string;

	/**
	 * The archive's name - the block's one `h2`, printed in the record header's
	 * nameplate voice. Absent, the header carries no heading.
	 */
	heading?: string;

	/**
	 * The count at the far end of the header, printed verbatim (`"52 ENTRIES"`).
	 * Absent, the block prints the length of `entries` alone, so the default
	 * cannot drift from the rows under it.
	 */
	count?: string;
}

/** One key/value fact in a ledger. */
export interface LedgerRow {
	/** Mono key, e.g. `TARGET`, `LICENSE`, `SIGNAL`. */
	key: string;

	/** Ink value. */
	value: string;

	/**
	 * The value as destinations, when the fact is a link.
	 *
	 * `value` stays the row's plain text, so the fact survives without the
	 * markup; `links` is what turns it into anchors, and it is a list because
	 * one fact can name more than one destination - the footer's support row
	 * names two funders under one key.
	 */
	links?: readonly LedgerLink[];

	/** Optional qualifier printed after the value, at caption weight. */
	note?: string;

	/**
	 * The one giant figure: this row renders at display weight instead of
	 * ledger weight. At most one row per ledger sets it.
	 */
	lead?: boolean;
}

/** One destination inside a ledger row's value. */
export interface LedgerLink {
	/** The anchor's text: the fact as it is read. */
	text: string;

	href: string;

	/** `blank` opens a second tab; absent stays in the page. */
	target?: "blank";
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

/** The hero's status line: the state word, its ink, and the copy it prints. */
export interface HeroStatus {
	/**
	 * The state word, e.g. `"active"`, `"interrupted"`, printed uppercase
	 * after `STATUS:`. The vocabulary is `FieldRecordStatus`'s own, imported
	 * above: a state the primitive has no ink for is not a state this block
	 * can print.
	 */
	state: FieldRecordStatusState;

	/**
	 * The ink register: `ink` for a fault (plain explanation plus recovery),
	 * `specimen` for the green accent, `quiet` for a pending or retired state.
	 * Absent, the primitive's own default applies.
	 */
	tone?: FieldRecordStatusTone;

	/**
	 * The value the page prints when it is more than the state word, e.g.
	 * `"STATUS: SOURCE ACTIVE"`. Absent, the state word is the value.
	 */
	copy?: string;
}

/**
 * The evidence panel's image. `src` and `alt` are one pair: a hero with a
 * picture and no alternative text is a decoration, so the two are set together.
 */
export interface HeroEvidence {
	/** The image. */
	src: string;

	/** Its alternative text - what the picture is evidence of. */
	alt: string;

	/**
	 * The primitive's own `object-position`, e.g. `"right"` when the subject
	 * of the photograph sits off-centre. Defaults to `center`.
	 */
	position?: string;
}

/** The artifact's one action: what it says, where it leads, which arm prints it. */
export interface HeroAction {
	/** Printed verbatim - uppercase in the button arm, after `/` in the record arm. */
	label: string;

	/** Where it leads. An external target opens in its own tab. */
	href: string;

	/**
	 * `button` (this block's default) is the artifact's single control;
	 * `record` prints a `/LABEL` route line instead, for a hero whose one
	 * destination is a reference rather than a call to action.
	 */
	variant?: "record" | "button";
}

/**
 * RecordHero - the site's signature artifact as one block: the field record
 * beside its evidence, one hairline between them, and the record's mandatory
 * blank interval inside the card.
 *
 * Four parts, in the order they render: the data card, the blank interval, the
 * evidence panel, the seal. The interval is not a prop - it is mandatory, so
 * the block owns it and a page cannot drop it by forgetting to pass something.
 * The same goes for the ratio between the panels and the seal's uniqueness
 * (one per artifact): neither is a knob, because both are the identity of the
 * artifact rather than a choice a page makes.
 *
 * `index`, `claim`, `status` and `metadata` are the record; `evidence`, `seal`
 * and `action` are optional, and an artifact without evidence renders its card
 * alone at the full width instead of leaving a gap where a picture would be.
 */
export interface Hero {
	/**
	 * The record's marker as the page writes it, e.g. `"# LAND_01"`. The `#`
	 * is the block's to print (`FieldRecordIndex` owns the glyph), so a page
	 * that passes it bare gets the same `# MARKER` either way.
	 */
	index: string;

	/**
	 * The runtime claim - the artifact's one `h1`, printed in the stamp
	 * grammar `〈RUST + TAURI〉`. The claim is what the record asserts, not
	 * what it is called.
	 */
	claim: string;

	/** The state line. */
	status: HeroStatus;

	/** The record's facts, in the order they are read. */
	metadata: readonly LedgerRow[];

	/**
	 * The evidence image. Absent, the block renders its default slot as
	 * composed evidence instead (a `RecordFigure`, a chart, a rendered
	 * element); absent both, the artifact is its card alone.
	 */
	evidence?: HeroEvidence;

	/**
	 * The artifact's one seal, named by the element it stands for. Absent, the
	 * artifact carries none - never two.
	 */
	seal?: FieldRecordElement;

	/** The artifact's one action. Absent, the record closes on its facts. */
	action?: HeroAction;
}
