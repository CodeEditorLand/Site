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
 * The vertical interval a band opens at: how much air separates it from the band
 * above, and therefore how loudly it speaks in the page's sequence.
 *
 * The four are a ladder of about x1.4 and they are grouped into two registers
 * (`Source/Stylesheet/System/Layout/_Interval.scss`):
 *
 *   rest   56px   TIGHT   the band continues the subject above it
 *   beat   80px   TIGHT   a sibling subject - the default, and the step the
 *                         site paid at every seam before the ladder existed
 *   break 112px   WIDE    a new movement
 *   turn  168px   WIDE    a chapter - and the block prints the boundary rule for
 *                         it, so a chapter cannot be a chapter without one
 *
 * Two adjacent bands may share a register but never a rung: `wide, wide, tight,
 * tight, wide` is the page's shape, and the second rung inside a register is what
 * lets a page say "wide" twice at two volumes. A band that declares nothing is a
 * `beat`, so an interval is an enhancement and never a requirement.
 *
 * It is a property of the BAND, in the data, not a class on the page: a page's
 * sequence is a fact about its subject order, and a fact belongs where the
 * subjects are declared.
 */
export type Interval = "rest" | "beat" | "break" | "turn";

/**
 * RecordBand - the section grammar itself. One subject per band: a kicker and
 * a heading open it, a standfirst and an index strip may follow, a footnote
 * may close it.
 */
export interface Band {
	/**
	 * The `/SECTION LABEL` opening the band. The slash is the caller's: it is the
	 * route/category mark of the band's voice, and the block never invents it.
	 *
	 * It is not a register: a band opens a subject, it does not count a set, so
	 * there is no figure to print beside the label. A counted line is a
	 * `Register` (`Component/Record/RegisterLine.ts`), printed by the block that
	 * holds the rows it counts.
	 */
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

	/**
	 * The band's anchor, when the page's own contents links it.
	 *
	 * A table of contents that cannot link is a list of headings, so the page
	 * supplies the id and the band prints it on its `<section>`. It is optional
	 * because most bands are never linked - and a band that prints an id nothing
	 * points at is an anchor pretending to be a destination.
	 */
	id?: string;

	/**
	 * The interval the band opens at (`Interval`, above). Absent means `beat`,
	 * the site's ordinary step, so a band that does not care about the page's
	 * sequence still composes.
	 *
	 * It is printed as `data-interval` and the block adds the chapter boundary
	 * for a `turn`, because a chapter that forgot its rule would be a chapter the
	 * reader has to be told about. A `bare` band ignores it: a band inside a Jelly
	 * card is structure, and the card owns the inset.
	 */
	interval?: Interval;

	/**
	 * The band's own state, when the band has a head and no body: `empty` (the
	 * subject is not written yet) or `loading` (it is being read). The head still
	 * prints - a band that vanished would take its heading with it, and a heading
	 * is how a reader knows what is missing - and the body is replaced by the
	 * composed absence in the record grammar (`◎`, the state word, the sentence
	 * in `empty`, and the footnote's own `NEXT:` line).
	 *
	 * The state is the BAND's, not the page's: a chapter whose set is empty is a
	 * chapter, and the page around it is not in an adverse state.
	 */
	state?: "rest" | "empty" | "loading";

	/**
	 * What the band says when `state` is `empty` or `loading`: what would be here
	 * and why it is not. Required by the two adverse states, absent otherwise -
	 * a band in its resting state has a body and needs no excuse.
	 */
	empty?: string;

	/**
	 * The dense arm: the band as a section INSIDE an artifact rather than a
	 * chapter of a page. It prints the head at the heading tier one step down,
	 * the body at the frame's own inset, and no chapter interval - so a hero's
	 * evidence section, or a card's second subject, opens without spending the
	 * page's air on a heading that is not a chapter.
	 */
	dense?: boolean;
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

	/**
	 * The entry's own state, when it is not simply present: `loading` (the record
	 * is being read and its body is not here yet), `empty` (the set has this slot
	 * and no record in it), `archived` (the record is retired and keeps its name).
	 * The index, name and chips still print - a record that lost its name to a
	 * state would be a blank in a list of records - and the body is replaced by
	 * the composed absence in the entry's own grammar.
	 */
	state?: "rest" | "loading" | "empty" | "archived";

	/**
	 * What the entry says when `state` is `empty` or `loading`. Absent, the
	 * block prints its own sentence rather than a blank body: an entry in a list
	 * with nothing under its name is read as a record with no claim.
	 */
	empty?: string;

	/**
	 * The record's facts, when the entry is read as a row of them rather than as
	 * a paragraph: `TARGET:`, `LICENSE:`, `STATUS:`. They print under the body as
	 * the entry's own `<dl>` - not as a `RecordLedger`, because a leaf may not
	 * hold a block (§4.2) - at the same key/value grammar, so an entry that
	 * carries facts is still one record and not a card.
	 */
	facts?: readonly EntryFact[];

	/**
	 * One line under everything: where the record is filed, the commit it was
	 * read at, the note that qualifies it. It prints at caption weight with its
	 * own `SOURCE:` key, because the entry has no other place to say it.
	 */
	note?: string;

	/**
	 * The dense arm: the entry read as a register row - the index and the name on
	 * one line, the chips beside them, the body at the caption measure and the
	 * facts in one column. Right inside an archive's group or a card's list,
	 * where ten entries are read as a set rather than one at a time.
	 */
	dense?: boolean;
}

/** One fact an entry prints under its claim, when the record carries them. */
export interface EntryFact {
	/** The `:` label, printed verbatim (`TARGET:`). */
	readonly key: string;

	/** The value, printed at the entry's own weight. */
	readonly value: string;
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

	/**
	 * The row's state, when the record it points at is not there: `gone` prints
	 * the row as a tombstone - `◎`, the title, and the route it used to have -
	 * instead of an anchor. The archive's own adverse state, and the one the
	 * brief names: a record whose target is gone is a record, not a dead link.
	 */
	state?: "ok" | "gone";
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

	/**
	 * The archive's own state: `empty` (no record is filed yet - the header
	 * prints the counted zero and the composed absence under it, because an
	 * archive that renders a heading over nothing is a page with a hole in it)
	 * or `loading` (the set is being read).
	 */
	state?: "rest" | "empty" | "loading";

	/** What the archive says in its `empty` or `loading` state. */
	empty?: string;

	/**
	 * The too-much state: the first N rows, and the count it did not print. A
	 * blog index of two hundred entries prints the newest twelve and says
	 * `SHOWING: 12 OF 240` on its foot, so the page stays a page and the archive
	 * stays honest about its extent.
	 */
	window?: { readonly showing: number; readonly total: string };

	/**
	 * The archive's foot: what the index is, where it was built from, when it was
	 * last filed. One line at caption weight under the last row.
	 */
	note?: string;
}

/**
 * One measured figure. `value` is printed verbatim - the block never formats,
 * rounds or derives a number - and `provenance` is required, because a figure
 * without a source is the one thing the brief forbids: "every claim carries a
 * figure and every figure carries a source".
 *
 * `state` is how a measure says "not known". It is a word from the fixed STATUS
 * vocabulary printed in place of the value, never a zero and never a blank: a
 * zero is a claim that the figure is nothing, and an unknown figure is not zero.
 */
export interface Measure {
	/** What is measured, `:`-labelled: `PAGES`, `CLAUSES`, `SIZE`. */
	label: string;

	/**
	 * The figure, verbatim (`26`, `0.4`, `UNAVAILABLE`). A string rather than a
	 * number on purpose: the page owns the figure's notation (thousands
	 * separators, decimals, a leading `v`), and the block owns none of it.
	 */
	value: string;

	/** The unit, printed after the figure at meta weight (`ENTRIES`, `MB`). */
	unit?: string;

	/**
	 * Where the figure came from: a file, a manifest, a measurement, a commit.
	 * Required - this field is the block's whole reason to exist.
	 */
	provenance: string;

	/**
	 * The measure is not known. Printed instead of `value`, in the ink of the
	 * word's own tone: `UNAVAILABLE`, `PREPARING`, `ARCHIVED`.
	 */
	state?: FieldRecordStatusState;

	/** When the figure was taken, when it is older than the page (`2026-11-18`). */
	asOf?: string;

	/**
	 * The panel's one leading figure. At most one measure per instrument sets
	 * it; it takes the section role while the rest take the sub role. Never the
	 * display role - the page's one XL is its claim, not a number.
	 */
	lead?: boolean;

	/**
	 * The measure is the panel's total: the sum the measures above it add up to.
	 *
	 * A total is a different rank of figure, so it prints under the panel's own
	 * heavier rule, with its key at the register's weight and its figure at the
	 * sub role. The panel does not compute it - a block derives nothing it was
	 * not given - so the caller passes the figure and the panel prints the row
	 * that says what it is.
	 */
	total?: boolean;
}

/**
 * RecordInstrument - a measured panel: figures with their sources.
 *
 * The information type this block answers is a *measurement*, and it is the one
 * the site had no shape for: `RecordLedger` carries a figure only as a `lead`
 * row among other facts, where it has no unit and no source, and `RecordFigure`
 * carries evidence of a picture rather than a value. A panel is the artifact
 * `DESIGN-COMPLETE.md` §1.8 calls an Instrument Panel.
 */
export interface Instrument {
	/** The measures, in the order they print. The block sorts nothing. */
	measures: readonly Measure[];

	/**
	 * The panel's `/LABEL` opening. Absent, the panel is its figures alone -
	 * never an empty label line.
	 */
	label?: string;

	/** One sentence under the panel: what the panel is the extent of. */
	caption?: string;

	/**
	 * What the panel says when it has no measures: what would be here, why it is
	 * not, and what to do. Absent, an empty panel renders nothing at all - never
	 * an empty frame.
	 */
	empty?: string;

	/**
	 * The panel's own state. `rest` prints the figures; `loading` prints the same
	 * cells with their keys and their `SOURCE:` lines and a hairline bar where
	 * each figure will be - a skeleton in the record grammar, never a spinner,
	 * because the labels and the provenance are the schema and are known before
	 * the numbers are. A panel whose figures arrive after paint still says how
	 * many figures it is waiting for and where each one comes from.
	 *
	 * `empty` is the same statement as `measures: []` and is spelled as a state
	 * so a caller that has not fetched yet does not have to say the absence twice.
	 */
	state?: "rest" | "loading" | "empty";
}

/** How a matrix sets its rows: the resting rhythm, or the dense one. */
export type MatrixDensity = "rest" | "dense";

/** One key/value fact in a ledger. */
export interface LedgerRow {
	/** Mono key, e.g. `TARGET`, `LICENSE`, `SIGNAL`. */
	key: string;

	/** Ink value. */
	value: string;

	/**
	 * The value is a literal - a command, a path, an identifier, a build
	 * variable - rather than prose. The ledger's value role is already the mono
	 * face, so this changes no type; it keeps the fact in a `<code>` element so
	 * the markup still says which values are literals and which are sentences.
	 */
	code?: boolean;

	/**
	 * The value carries this row's emphasis: the one fact in the card the reader
	 * is meant to leave with. At most one row per ledger sets it - the ledger
	 * does not police the count, but a card with two emphasised facts has none.
	 */
	strong?: boolean;

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

	/**
	 * The value is not known, and says so in the vocabulary's own word.
	 *
	 * The fact is still a fact - it has a key and a place in the reading order -
	 * but its value has not arrived or cannot be measured. The block prints the
	 * state word in its tone with the mark layer's square beside it, in place of
	 * `value`, which stays required so the plain reading of the row survives for
	 * a renderer that cannot print a state (a printed page, a copied line, an
	 * `aria-label`). `UNAVAILABLE` is the arm for a fact that cannot be known -
	 * never `0`, never a blank `<dd>`.
	 *
	 * This is the brief's PARTIAL state as a row: a ledger with three known
	 * facts and one unknown is not a broken ledger, it is a ledger telling the
	 * truth about what it holds.
	 */
	state?: FieldRecordStatusState;

	/**
	 * When the value was taken, when it is older than the page (`2026-11-18`).
	 *
	 * A fact with an age prints `AS OF: <date>` after its value in the note
	 * channel, so a reader can tell a stale figure from a fresh one without
	 * leaving the row. It is the brief's OFFLINE / STALE state as a field rather
	 * than as a colour: the value stays visible and the age is stated beside it.
	 */
	asOf?: string;

	/**
	 * The row opens: its value is a summary and these facts are what the summary
	 * discloses.
	 *
	 * Progressive disclosure *inside* the block, not in a wrapper - the row is
	 * still a row, its key is still the key, and the facts it opens are the same
	 * ledger grammar one level in. It renders as a `<details>` inside the row's
	 * `<dd>`, so it works with no JavaScript at all: the browser's own disclosure
	 * is the behaviour, and the fold mark is the mark layer's.
	 *
	 * A row that opens is for a fact whose value is a name and whose detail is
	 * three more facts - the build's three flags under one `BUILD:` row. It is
	 * never a way to hide a fact the reader came for: the summary prints the
	 * value, and a closed row still states it.
	 */
	open?: readonly LedgerRow[];

	/**
	 * The row is the marked one in its set - the selected fact of a ledger that
	 * offers a choice (`DEFAULT:`, `ACTIVE:`, the row a reader picked).
	 *
	 * Selection is a state of the row, not of the reader's permission, so it
	 * prints as `aria-current` plus the mark layer's attested square: the same
	 * two signals every other selected thing on the site carries. It is not a
	 * control - the ledger has no `<script>` - so a ledger that needs a picker
	 * puts a real control in the row and states the selection here.
	 */
	selected?: boolean;

	/**
	 * The row is the set's total: the sum, the extent, the figure the rows above
	 * add up to.
	 *
	 * A total is not one more fact - it is a different rank of fact - so it
	 * prints under a heavier rule, with its key at the register's own weight and
	 * its value at the sub role. The ledger does not compute it: a block derives
	 * nothing it was not given, so the caller passes the figure it summed and the
	 * block prints the row that says so.
	 */
	total?: boolean;
}

/** One destination inside a ledger row's value. */
export interface LedgerLink {
	/** The anchor's text: the fact as it is read. */
	text: string;

	href: string;

	/** `blank` opens a second tab; absent stays in the page. */
	target?: "blank";
}

/**
 * How a ledger sets its rows.
 *
 * `rest` is the ledger the site prints almost everywhere: one fact per line, a
 * key column and a value column, the row's own hairline above it. `register` is
 * the same facts read as a table - two columns at 1024px and up, a hairline
 * between them, the key at the row register and the value under it, and a count
 * in the register line. It is not a smaller type: the value stays at the meta
 * step, because a fact that needs 12px to fit is a fact that needs a matrix.
 */
export type LedgerDensity = "rest" | "register";

/**
 * A register line's state, when the facts are not simply present.
 *
 * `loading` draws the rows as skeletons - a hairline bar in the value column and
 * the vocabulary's own word in the register line, never a spinner: a register
 * whose facts have not arrived still shows the shape of the facts it is waiting
 * for. `empty` prints the block's composed sentence instead of an empty frame.
 */
export type RegisterState = "rest" | "loading" | "empty";

/** One step of a trace: a path, and the one thing it carries. */
export interface TraceStep {
	/** `01`, `02`, `03` - printed verbatim; the block never renumbers. */
	index: string;

	/** The path or command, exactly as its source writes it. */
	path: string;

	/** What the step carries, in one line. */
	note: string;

	/** Where the step leads, when it is a place rather than a path. */
	href?: string;
}

/**
 * RecordTrace - the path a claim can be checked along.
 *
 * The information type is *provenance*: not the order a thing happens in (that
 * is a Stage) and not a set of records (that is an Archive), but the files,
 * routes or commands a reader opens, in order, to see the claim for themselves.
 * It is the shape a manual needs and the site had none for: a card said
 * `SOURCE ACTIVE` and named no source.
 *
 * `source` is required. A trace without a provenance line is a list of links,
 * and a list of links is not evidence.
 */
export interface Trace {
	/** The steps, in the order the source names them. The block sorts nothing. */
	steps: readonly TraceStep[];

	/** The `/LABEL` the trace opens on: `/BUILD`, `/CHECK`. Absent, no label line. */
	label?: string;

	/** Where the trace itself came from: the page, file or manual it was read out of. */
	source: string;

	/**
	 * `rest` prints the steps; `loading` prints them as skeletons - the index in
	 * ink, a hairline bar where the path would be, and the mark's own stand-in in
	 * the note column. A trace that is being read still shows how many steps it
	 * has, and still shows the source it is being read out of.
	 *
	 * `empty` is a trace whose source names no step at all. It is a state of its
	 * own rather than a length of zero, because the two read differently: a trace
	 * with no steps and no sentence is a hole, and a trace that says *why* it has
	 * none is a provenance statement. The component checked `empty` before this
	 * field existed, which meant a caller could not legally write the state the
	 * block already understood.
	 */
	state?: "rest" | "loading" | "empty";

	/**
	 * What the trace says when it has no steps: what would be here, why it is
	 * not, and what to do. Absent, an empty trace renders nothing at all.
	 */
	empty?: string;
}

/**
 * RecordFailure - one documented way the thing breaks.
 *
 * The information type is a *condition*: not a record (an Entry), not a fact (a
 * Ledger) and not a process (a Stage), but the state a reader is in when the
 * thing has failed, with the cause and the next step. It is the adverse state
 * the brief calls `error`, and it is a block rather than a paragraph because it
 * has three fixed fields and one vocabulary word - a failure written as prose
 * loses the next step.
 *
 * `state` is the fixed vocabulary's word for a failed action. It is not a free
 * string: a condition the site has no ink for is not a condition it can print.
 */
export interface Failure {
	/** `FAILURE_01` - printed after the `#`. */
	index: string;

	/** The failure's name, printed after the `/`: `BLANK WORKBENCH`. */
	name: string;

	/** What the reader sees. */
	symptom: string;

	/** Why it happens. */
	cause: string;

	/** The next step, as its source gives it. */
	next: string;

	/** The vocabulary's word: the action failed, and the record says so. */
	state: FieldRecordStatusState;

	/** Where the failure is documented. */
	source: string;

	/**
	 * The way back, when there is one: `→ TRY THE BLANK WORKBENCH AGAIN`. `next`
	 * is the sentence a reader is given; `recovery` is the destination that
	 * sentence names, and it prints as the block's one link. A failure with no
	 * recovery path is legal - and then the block says `NEXT: UNAVAILABLE` rather
	 * than printing a `next` that leads nowhere, because a documented dead end is
	 * a fact and a dead link is a lie.
	 */
	recovery?: { readonly label: string; readonly href: string };

	/**
	 * The long explanation, disclosed rather than printed: the log line, the
	 * trace, the conditions under which it reproduces. The three fields stay the
	 * three fields and the detail folds under them, so a failure can carry its
	 * evidence without becoming a stack trace on the page. No script: the
	 * browser's disclosure is the behaviour.
	 */
	detail?: string;
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

	/**
	 * The step's own state, when the run is not at its rest: `VERIFIED` (this
	 * step is done), `ACTIVE` (the run is here), `PREPARING` (not reached yet),
	 * `INTERRUPTED` (the run stopped at this step). The word prints in the step's
	 * own register, so a rail can be read as a run's progress without a second
	 * block - and the vocabulary stays the site's eight words, never a new one.
	 */
	state?: FieldRecordStatusState;

	/**
	 * The step's detail, disclosed rather than printed: a `<details>` whose
	 * summary is the step's line. A stage is a rail of one-line steps, so the
	 * paragraph a step may need lives one level in - present, findable by the
	 * browser's own in-page search, and closed until it is asked for. No script:
	 * the browser owns the disclosure.
	 */
	detail?: string;
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

	/**
	 * Where the command came from: the page that documents it, the file it is
	 * generated into, the manifest that prints it. Absent, the well prints no
	 * provenance line at all - a well is a command, and a command the site wrote
	 * itself needs no citation. Set, the line prints under the body at meta
	 * weight, so the reader can check the command against its source.
	 */
	source?: string;

	/**
	 * Soft-wrap the body instead of scrolling it sideways.
	 *
	 * The well's default is `white-space: pre` because a command that reflowed
	 * would be a command the reader cannot paste. But a well also carries CONFIG
	 * and OUTPUT, where a long line is a value and not a command: `wrap` turns
	 * the body into `pre-wrap` with a hanging indent, so a 300-character JSON
	 * string stays inside the frame and every character still prints. The choice
	 * is the caller's because only the caller knows whether the lines are typed
	 * or read.
	 */
	wrap?: boolean;

	/**
	 * The too-much state: a command that prints its first N lines and names the
	 * rest. A well of two hundred lines is a log; a page that rendered all of it
	 * has stopped showing a command. The foot prints `SHOWING: N OF M` in the
	 * register grammar, and the copy payload stays the whole body - the reader
	 * who copies gets the file, the reader who reads gets the part that matters.
	 */
	window?: { readonly showing: number; readonly total: string };

	/**
	 * The well's own state, when there is no body to print: `empty` (the command
	 * is not documented yet) or `loading` (it is being read). The bar still
	 * prints its label, so the reader knows what is missing, and the body prints
	 * the composed absence rather than an empty recess.
	 */
	state?: "rest" | "empty" | "loading";

	/** What the well says when `state` is `empty` or `loading`. */
	empty?: string;

	/**
	 * One line under the body and above the source: what the command assumes,
	 * which shell it wants, what it does not do. It is a note about the command,
	 * printed in the well's own foot rather than as a paragraph beside it.
	 */
	note?: string;
}

/** One pod of a pair: a title bar and a body. */
export interface PairPod {
	/** The title-bar label. */
	label: string;

	/**
	 * The pod's body - prose, rendered in the pod's own frame. Optional because
	 * a pod may instead hold **one block**, handed to the pair through its
	 * matching slot (`<RecordLedger slot="left" />`): a pair whose two sides are
	 * ledgers is one comparison of two ledgers, not two cards. A pod is prose
	 * *or* one block, never both - a pod with both would be two claims under one
	 * label.
	 */
	body?: string;

	/**
	 * This pod is the subject: the one the other pod is read against. At most
	 * one pod per pair sets it, and it is marked on the frame, not restated in
	 * the label.
	 */
	subject?: boolean;

	/**
	 * The pod's composed absence, when the side has nothing to show: `empty`
	 * prints `◎` and the sentence in the pod's own body, and the pod keeps its
	 * title bar. That is the whole point - a comparison with one side missing is
	 * still a comparison, and the reader has to see WHICH side is missing.
	 */
	empty?: string;

	/**
	 * The pod's own state, when one side is not simply present: `UNAVAILABLE`
	 * (this side cannot be read), `LOADING` (it has not arrived), `ARCHIVED` (it
	 * is retired). The word prints in the pod's bar in its vocabulary tone, and
	 * the body still prints - a pod that is waiting still has something to say.
	 */
	state?: FieldRecordStatusState;

	/**
	 * One line under the pod's body: the side's own source, the qualifier that
	 * belongs to this side and not to the pair. Printed at caption weight inside
	 * the pod, because a pair's caption is about both and cannot carry one
	 * side's provenance.
	 */
	note?: string;
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

	/**
	 * The rank of the pod labels. Absent, each label prints as a label (a
	 * `span`) - the pair is an artifact and its two sides are named, not
	 * titled. When the pair is a *section* of a page, the pod labels are that
	 * section's headings and this is the level they take, so the page's heading
	 * outline keeps its count: `h3` under an `h2`, `h4` under a region's `h3`.
	 * A pair never prints an `h1`.
	 */
	heading?: "h2" | "h3" | "h4";

	/**
	 * The relation the two pods declare, printed in the gutter between them:
	 * `↳ BOTH REQUIRE A SIGNED BUILD`. A pair is one artifact with two columns,
	 * and the thing that makes it one artifact rather than two is the statement
	 * about how they relate - today the caption makes it at the foot, and this
	 * makes it where the comparison happens. On wide screens it runs vertically
	 * in the 1px gutter's channel; on narrow it prints as a row between the
	 * stacked pods.
	 */
	relation?: string;
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
	 * Where the caption prints. `below` (the default) stacks it under the frame,
	 * which is right when the figure sits in a band that already has a measure.
	 * `channel` gives the caption a column of its own beside the plate and
	 * prints its two parts as labelled rows (`FIGURE:` / `SOURCE:`), which is
	 * right when the plate is wide: a caption under a full-width plate is read
	 * at the wrong distance from the thing it describes.
	 */
	captionPlacement?: "below" | "channel";

	/**
	 * The evidence's own state, when it is not simply present: `UNAVAILABLE`
	 * when the target is gone or the set it measures is empty, `LOADING` while a
	 * rendered diagram arrives, `INTERRUPTED` when the capture failed. The frame
	 * prints the word instead of the media - the record grammar's tombstone,
	 * never an empty box with a browser's own broken-image glyph in it.
	 */
	state?: FieldRecordStatusState;

	/**
	 * The image to frame. `src` and `alt` are set together or not at all: when
	 * both are absent the block renders its own composed children (a chart, a
	 * diagram, a rendered element) as the media instead.
	 */
	src?: string;

	/** The image's alternative text. Set with `src`, never alone. */
	alt?: string;

	/**
	 * The figure's folio, when the page numbers its evidence: `〈FIGURE 02〉`.
	 * The block still never derives one - the caption is not numbered here
	 * because only the page knows the order its figures appear in - but a page
	 * that does know can hand its number in, and the figure prints it in the
	 * containment brackets above the caption.
	 */
	folio?: string;

	/**
	 * The figure opens: its caption becomes a `<details>` - the summary is the
	 * caption itself, so nothing is lost when it is shut - and the open arm
	 * prints the figure's apparatus: the folio, the provenance as labelled rows,
	 * and `→ OPEN THE SOURCE` when there is a `src` to open at full size. The
	 * caption's measure cap is lifted while it is open, which is the arm for the
	 * caption longer than the image.
	 *
	 * A lightbox would be the one glass surface on this site; a disclosure is
	 * what the browser already knows how to open, find in the page and print.
	 */
	open?: boolean;

	/**
	 * The next step, printed only in the tombstone: what a reader can do while
	 * the evidence is not there. A tombstone with no next step is a dead end,
	 * and a dead end is not an adverse state - it is the absence of a design.
	 */
	next?: string;
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
	 * `specimen` for the attested state (the record's ink and the state square
	 * at half again the size - a shape, never the accent), `quiet` for a
	 * pending or retired state. Absent, the primitive's own default applies.
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
	/** The image. Required unless `state` says the capture is not there. */
	src?: string;

	/** Its alternative text - what the picture is evidence of. */
	alt?: string;

	/**
	 * The primitive's own `object-position`, e.g. `"right"` when the subject
	 * of the photograph sits off-centre. Defaults to `center`.
	 */
	position?: string;

	/**
	 * The evidence panel's own state, when the capture is not in the build:
	 * `UNAVAILABLE`, `LOADING`, `INTERRUPTED`, `ARCHIVED`. The panel keeps its
	 * place and its hairline gutter and prints the tombstone in the record
	 * grammar - because a hero whose evidence vanished must not collapse into a
	 * one-column record: the pair IS the artifact.
	 */
	state?: FieldRecordStatusState;

	/** The tombstone's next step: what a reader can do while the plate is absent. */
	next?: string;
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

	/**
	 * The record's `/ROUTE:VALUE` line, printed between the claim and the state:
	 * `/CHANNEL:PUBLIC` on a release, `/TRACE:/404` on a missing route. The
	 * caller supplies the whole line - the block prints it verbatim, and it is
	 * the one `/` a record carries (identity test 5).
	 */
	route?: string;

	/**
	 * The one-line proposition under the blank interval, in the `↳` grammar:
	 * `↳RETURN TO INDEX`. It is what the record asks the reader to do about
	 * itself, and it sits below the interval so it reads as a second headline -
	 * which is the interval's whole purpose.
	 */
	proposition?: string;

	/**
	 * The record's relation line, at section weight: `LAND:`, `RELEASE:`. It is
	 * the nameplate the proposition hangs from, and it prints above it.
	 */
	relation?: string;

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

/**
 * One annotation printed in the margin of the record it belongs to.
 *
 * The margin note is the site's *aside made visible*: a claim about the record
 * that is worth saying and is not worth a band - the shape of the piece, the
 * date its figures were taken, where a correction goes. It is not a callout
 * (that is a band's standfirst), not a disclosure (that is `RecordAside`, which
 * folds) and not a card: a note is a marker, one claim, one source, and it hangs
 * in the margin where the reader can take it or leave it.
 *
 * `source` is optional but its absence is *printed*: a note whose claim has no
 * provenance says `SOURCE: UNAVAILABLE` in its own row. That is the honest
 * partial state, and it is the reason the block prints the row even when it has
 * nothing to put in it - a missing source is a fact about the note.
 */
export interface MarginNote {
	/** The note's marker, `"NOTE_01"`, printed as `# NOTE_01`. */
	index: string;

	/**
	 * The note's `/LABEL`, printed after the marker: `# NOTE_02 / THE DATE`.
	 * Absent, the marker stands alone - never an empty slash.
	 */
	label?: string;

	/**
	 * The note itself: one claim, in one to three sentences. Required - a note
	 * with no claim is a blank in the margin, and a blank is worse than no note.
	 */
	body: string;

	/**
	 * Where the claim comes from: a file, a route, a date, a registry. Absent,
	 * the block prints `SOURCE: UNAVAILABLE`.
	 */
	source?: string;

	/**
	 * The destination the note names, when it names one. `state: "gone"` prints
	 * the tombstone instead of the anchor - the note's target was in the build
	 * when the note was written and is not in it now, and a dead link is worse
	 * than a record that says the record is gone.
	 */
	link?: {
		readonly label: string;

		readonly href: string;

		readonly state?: "ok" | "gone";
	};

	/**
	 * The note's own state, when it is not simply present: `LOADING` while the
	 * fact it reports is still being read, `UNAVAILABLE` when it cannot be read.
	 * The word is printed in its vocabulary tone, and the body still prints -
	 * a note that is waiting still has something to say.
	 */
	state?: FieldRecordStatusState;

	/**
	 * When the note's claim was true. A note is a dated annotation - "the figures
	 * were taken at this commit" - and a note that does not print its date is a
	 * claim with no age, which the brief's stale state forbids. It prints as an
	 * `AS OF:` row beside the state, in the same vocabulary.
	 */
	asOf?: string;
}

/**
 * RecordAside - a folded aside: a claim the record keeps but does not lead with.
 *
 * The information type is *disclosure*: what this record does not carry, what a
 * clause excludes, which assumptions a command makes. It is longer than a margin
 * note and shorter than a band, and the reader should be able to skip it - so it
 * is a `<details>`: closed by default, opened without JavaScript, printed in the
 * same register grammar as everything else.
 *
 * `rows` is the aside's facts when its content is a set of facts, `body` its
 * prose when it is a paragraph. Both is two claims under one label; neither is
 * the empty state, which says why the aside has nothing in it rather than
 * drawing a closed frame over nothing.
 */
export interface Aside {
	/** The aside's marker, `"ASIDE_01"`, printed as `# ASIDE_01`. */
	index: string;

	/** The aside's `/LABEL`: `WHAT THIS DOES NOT COVER`. Required - it is the summary's text. */
	label: string;

	/** The `↳` line under the summary, when the aside opens with a proposition. */
	line?: string;

	/** The aside's prose. A blank line starts a paragraph. */
	body?: string;

	/** The aside's facts, when its content is a set. Rendered as a `RecordLedger`. */
	rows?: readonly LedgerRow[];

	/** Where the aside's claim comes from. Absent, no source row is printed. */
	source?: string;

	/** Open on first paint. Defaults to closed: an aside is what the reader chose to read. */
	open?: boolean;

	/**
	 * What the aside says when it has neither prose nor rows. Absent, an empty
	 * aside renders nothing at all - never a closed frame over nothing.
	 */
	empty?: string;

	/**
	 * The aside's own state, when its body has not arrived: `loading` prints the
	 * summary with `STATUS: LOADING` and the body as a skeleton at the aside's
	 * own measure, so a folded section being read still shows its shape. `rest`
	 * is the default and prints nothing extra.
	 */
	state?: "rest" | "loading";

	/**
	 * What the summary counts, printed in the containment brackets at the bar's
	 * far end: `〈04〉`. Absent, the block counts what it holds - the rows when
	 * the body is a set, the paragraphs when it is prose - because a disclosure
	 * whose summary says how much is behind it is a disclosure a reader can
	 * decide about without opening. A caller that knows the set's real extent
	 * (the aside prints four of nine) passes its own string.
	 */
	count?: string;
}

/**
 * One stop on a comparison rail.
 *
 * A stop is a *position*, not a cell: it carries the one value that places it on
 * the axis, and optionally the state that says whether the position is reached
 * today. That is the difference between this block and the matrix - the matrix
 * answers "what is true in each column", the rail answers "how far along this
 * one axis is each thing".
 */
export interface CompareStop {
	/** The stop's name, printed under its tick: `LOCAL-FIRST`, `SIGNED`. */
	label: string;

	/** The one fact that places it: who holds the account, what is published. */
	value: string;

	/** A second line, when the position needs qualifying. */
	note?: string;

	/**
	 * The stop's state, when the position is not reached today: `UNAVAILABLE`
	 * prints above the value in its vocabulary tone, and the tick is hollow
	 * rather than filled. Absent, the stop is reached and its tick is ink.
	 */
	state?: FieldRecordStatusState;

	/** Where the stop leads, when it is a place rather than a position. */
	href?: string;

	/**
	 * This stop carries the same value as the stop before it.
	 *
	 * The caller's assertion, not the block's deduction: a rail that compared two
	 * values to decide they were equal would be deriving a fact it was not given.
	 * The rail draws the interval between the two ticks as one continuous bar, so
	 * a run of equal positions reads as a plateau - two things that sit at the
	 * same place on this axis - instead of as two marks that happen to be
	 * neighbours. That is the "the two sides are equal" case, and it is a shape
	 * rather than a sentence: a reader sees the tie before reading the caption.
	 *
	 * The first stop cannot set it - there is nothing before it to be equal to -
	 * and the block ignores it there rather than printing a bar into the axis's
	 * own end.
	 */
	equal?: boolean;
}

/**
 * RecordCompare - one axis, its stops, and where each thing sits on it.
 *
 * The comparison rail answers a question the site could not previously ask:
 * *along this one axis, in what order do these things sit, and which of them
 * exists today?* The four authentication tiers sit on one axis of who holds the
 * identity; a release's artifacts sit on one axis of what is published. A matrix
 * would answer neither - it compares states across columns, and it has no ends.
 *
 * The axis is required and it has two ends: `from` and `to` are printed at the
 * rail's own ends, so a reader knows which direction the order runs. A rail
 * without ends is a row of columns pretending to be a progression.
 */
export interface Comparison {
	/** The rail's `/LABEL` opening: `/POSITION`. Absent, the rail opens on its axis. */
	label?: string;

	/** The axis's left end: what the first stop is furthest from. */
	from: string;

	/** The axis's right end. */
	to: string;

	/** The stops, in the order they sit on the axis. The block sorts nothing. */
	stops: readonly CompareStop[];

	/** The one statement made about the rail as a whole. */
	caption?: string;

	/**
	 * What the rail says when it has no stops: what would be here, why it is not,
	 * and what to do. Absent, an empty rail renders nothing - never a bare line.
	 */
	empty?: string;

	/**
	 * `rest` (the default) prints the stops. `loading` prints the rail with its
	 * stops as skeletons - hairline bars and `◎` marks in the record grammar, not
	 * a spinner: a region whose stops have not arrived still shows the axis it is
	 * waiting on, which is the one thing a spinner cannot say.
	 */
	state?: "rest" | "loading";
}

// ═══════════════════════════════════════════════════════════════════════════
// THE FIVE FORMS THE MANUAL WAS MISSING
//
// The layer answered sixteen information types with sixteen blocks. These five
// answer the five types a printed manual has and this site did not: the *plate*
// (evidence at plate scale, with a caption channel), the *stamp* (a mark that
// says the record is what it claims), the *inset* (a marginal note that can
// carry a figure), the *transcript* (a session, with turn markers) and the
// *plate-set* (a set of figures of one subject).
//
// Each is deliberately NOT a variant of the block nearest to it, and each
// partial says why in its GRAMMAR header. The short form:
//
//   PLATE       not a Figure: a figure is evidence inside a record's column, a
//               plate is the evidence the record is about, numbered, with its
//               caption in a channel rather than under it.
//   STAMP       not a Ledger: a ledger is what is true of an object; a stamp is
//               one mark and the authority that makes it true.
//   INSET       not a Margin: a margin note is a claim beside the record; an
//               inset is that note with a figure, and the figure is the reason
//               the note could not be a margin note.
//   TRANSCRIPT  not a Well: a well is one command; a transcript is a session -
//               turns, speakers, and what each answered.
//   PLATE-SET   not a Matrix: a matrix compares values across columns; a
//               plate-set is many figures of one subject, read as a field.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * RecordPlate - the evidence the record is about, at plate scale.
 *
 * A figure sits in a column and is read after the paragraph it illustrates. A
 * plate is the thing the page is evidence *of*: it runs the width of its
 * container, it is numbered (`PLATE_01`), and its caption is a channel - a
 * column of its own beside the plate, printing the capture's own manifest facts
 * and the file they were read out of.
 *
 * `subject` and `source` are required. A plate with no subject is decoration and
 * a plate with no source is a picture: the two fields are the block's reason to
 * exist. `state` is how a plate says the capture is not there - the frame stays,
 * the word prints, and `next` says what to do about it.
 */
export interface Plate {
	/** `PLATE_01` - printed as `# PLATE_01`. */
	index: string;

	/** What the plate shows, in one sentence. Required. */
	subject: string;

	/**
	 * The capture's `/LABEL`, printed after the index: `# PLATE_01 / THE
	 * WORKBENCH`. Absent, the marker stands alone - never an empty slash.
	 */
	label?: string;

	/**
	 * The longer caption, when the channel can hold it: what the reader should
	 * see in the plate, in two or three sentences. The `subject` is the claim;
	 * this is the reading.
	 */
	caption?: string;

	/** The image. Set with `alt`; absent both, the block renders its slot. */
	src?: string;

	/** What the picture is evidence of. Set with `src`, never alone. */
	alt?: string;

	/** The primitive's own `object-position` (`right` when the subject sits off-centre). */
	position?: string;

	/**
	 * The capture's own facts, as its manifest records them: `SUBJECT`, `MODE`,
	 * `CROP`, `USAGE`, `STATUS`. Rows, not prose - a plate's apparatus is a
	 * register, and a register is what makes two plates comparable.
	 */
	facts?: readonly LedgerRow[];

	/** Where the plate came from: the manifest, the capture directory, the commit. Required. */
	source: string;

	/** When the capture was taken, when it is older than the page. */
	asOf?: string;

	/**
	 * The capture's state when it is not simply present: `UNAVAILABLE` when the
	 * build carries no plate, `LOADING` while it is being taken, `INTERRUPTED`
	 * when the capture failed, `ARCHIVED` when it belongs to a retired edition.
	 * The frame prints the word instead of the media - the record grammar's
	 * tombstone, never a broken-image glyph.
	 */
	state?: FieldRecordStatusState;

	/**
	 * The next step, printed only in the absent arm: what a reader can do while
	 * the plate is not there. A tombstone with no next step is a dead end.
	 */
	next?: string;

	/**
	 * Where the caption prints. `channel` (the default) gives it a column beside
	 * the plate on wide screens; `foot` stacks it under the plate at the reading
	 * measure, for a plate that is already narrow.
	 */
	placement?: "channel" | "foot";

	/**
	 * `wide` lets the plate take the whole width of its container (a band's
	 * inner width, not the 72ch measure) - the plate's own reading of
	 * full-bleed. `measure` keeps it on the column it was given. Defaults to
	 * `wide`: a plate that is the same width as the paragraph beside it is a
	 * figure.
	 */
	span?: "measure" | "wide";

	/**
	 * The frame's aspect ratio, as a CSS ratio (`16 / 9`, `4 / 3`, `21 / 9`).
	 * Absent, the block uses the wide plate's own (21 / 9 at `wide`, 16 / 9 at
	 * `measure`). A caller that knows its capture's shape says so rather than
	 * cropping it into the default.
	 */
	ratio?: string;

	/**
	 * The plate opens: its channel becomes a `<details>` - the summary is the
	 * claim and the facts, so the manifest is not lost when it is shut - and the
	 * open arm prints the reading in full plus `→ OPEN THE CAPTURE` when there is
	 * a `src`. The frame keeps its ratio either way: the plate is the evidence,
	 * and the apparatus is what folds.
	 */
	open?: boolean;
}

/**
 * RecordStamp - the mark that says this record is what it claims to be.
 *
 * The information type is *authentication*: an edition's mark, a document's
 * version stamp, a route's own seal. It is one mark at section size, the route
 * it is issued under, the facts that bound it, and - required - the authority
 * that makes it true (`VERIFY:`, `BASIS:`, `ISSUED BY:`). A stamp without an
 * authority is a decoration that looks like a guarantee, which is worse than no
 * stamp at all.
 *
 * `revoked` is the mark's own adverse state: a stamp that was true and is not
 * any more prints `◎ WITHDRAWN:` with the reason, and keeps its facts - a
 * withdrawn mark is still a record of what was issued.
 */
export interface Stamp {
	/** `STAMP_01` - printed as `# STAMP_01`. */
	index: string;

	/** The mark itself, verbatim: `〈EDITION 01〉`, `〈TERMS 2026-11〉`. Required. */
	mark: string;

	/** The `/LABEL` after the index: `# STAMP_01 / EDITION`. */
	label?: string;

	/** The route the mark is issued under: `/CHANNEL:PUBLIC`, `/LEGAL`. */
	route?: string;

	/** The facts that bound the mark: `ISSUED:`, `HOLDING:`, `REACHES:`. */
	rows: readonly LedgerRow[];

	/**
	 * What makes the mark true, in one line: the verification route, the basis,
	 * the holder. Required - this is the field the block exists for.
	 */
	authority: string;

	/** The mark's state, when it is not simply in force. */
	state?: FieldRecordStatusState;

	/** One line under the mark: what it does not cover. */
	note?: string;

	/** The mark was withdrawn: the reason. Prints the tombstone instead of the route. */
	revoked?: string;

	/**
	 * When the mark's window closes. A stamp is issued for a period - an edition,
	 * a term, a release - and a mark that does not print its expiry is a mark
	 * with no boundary. It prints as an `EXPIRES:` row beside the other rows.
	 */
	expires?: string;

	/**
	 * Where the mark can be checked: `→ VERIFY`. The authority line says what
	 * makes the mark true; this says where the reader can confirm it, and it is
	 * the stamp's one action. It prints as a link under the authority, never as a
	 * button - a stamp is not a call to action.
	 */
	verify?: { readonly label: string; readonly href: string };
}

/** One bar of an inset's measure figure: a label, its printed value, its share. */
export interface InsetBar {
	/** `SECTIONS`, `WORDS`, `MINUTES`. */
	label: string;

	/** The figure, verbatim (`09`, `1,240`). */
	value: string;

	/** Its share of the bar, 0-1. The page computes it; the block draws it. */
	share: number;
}

/**
 * The figure an inset may hold: a capture, a measure figure drawn in the record
 * grammar, or both. `caption` and `source` are required either way - an inset
 * that holds an uncaptioned figure is a picture in a margin.
 */
export interface InsetFigure {
	/** What the figure shows, in one line. */
	caption: string;

	/** Where it came from. */
	source: string;

	/** A capture. Set with `alt`. */
	src?: string;

	/** The capture's alternative text. Set with `src`. */
	alt?: string;

	/** The capture's state, when it is not present. */
	state?: FieldRecordStatusState;

	/**
	 * The measure figure: labelled bars, drawn from `--Divider` fills in the
	 * block's own grammar. This is the figure an inset can hold when the
	 * evidence is a number rather than a picture - the shape of a piece, the
	 * extent of a page - and it is the reason the inset is not a margin note.
	 */
	bars?: readonly InsetBar[];

	/**
	 * The measure figure's total, printed under its bars on the divider's rule:
	 * `TOTAL 09`. Three bars that sum to nine sections read as three claims until
	 * the sum is printed, and a sum the block derived would be arithmetic the page
	 * did not do - so it is the caller's, in the caller's own words.
	 */
	total?: InsetBar;

	/**
	 * The next step, printed only when the figure's state says it is absent: what
	 * a reader can do while the capture or the measurement is not there.
	 */
	next?: string;

	/** When the figure's figures were taken. */
	asOf?: string;
}

/**
 * RecordInset - a marginal note that can hold a figure.
 *
 * The margin is where this document annotates itself. A note (`RecordMargin`)
 * is a claim; an inset is that claim *with its evidence*, which is a different
 * object: it is taller, it needs a caption, and on a narrow screen it cannot be
 * a marginalium at all - it becomes an inset in the flow, after the paragraph it
 * annotates.
 *
 * `body` is required and `figure` is optional: a note with no figure is a
 * margin note and should be one. The block does not police that; it prints what
 * it is given, and the routing table says which block answers.
 */
export interface Inset {
	/** `INSET_01` - printed as `# INSET_01`. */
	index: string;

	/** The `/LABEL` after the index: `/THE SHAPE`. */
	label?: string;

	/** The note's claim, in one to three sentences. Required. */
	body: string;

	/** Where the claim comes from. Absent, the block prints `SOURCE: UNAVAILABLE`. */
	source?: string;

	/** The figure the note holds. Absent, the inset is a margin note in an inset's frame. */
	figure?: InsetFigure;

	/** The note's state, when it is not simply present. */
	state?: FieldRecordStatusState;

	/** The destination the note names, with the tombstone arm when it is gone. */
	link?: {
		readonly label: string;

		readonly href: string;

		readonly state?: "ok" | "gone";
	};

	/** What the inset says when it has neither a claim nor a figure. */
	empty?: string;
}

/** One turn of a session: who spoke, what they said, and when. */
export interface Turn {
	/**
	 * The turn's mark, from the grammar: `→` what the reader did, `↳` what
	 * answered, `#` the session's own note, `◎` a turn that did not arrive.
	 * Printed verbatim - the block never chooses a mark for the caller.
	 */
	mark: string;

	/** Who spoke: `READER`, `SHELL`, `BUILD`, `DESK`. */
	speaker: string;

	/** What was said or printed, verbatim. One turn, one line. */
	line: string;

	/** The turn's stamp: `01`, `00:04`, `STEP 3`. */
	stamp?: string;

	/** The turn's state, when it failed or never arrived. */
	state?: FieldRecordStatusState;

	/**
	 * Why the turn failed, printed under its line when `state` is set. A failed
	 * turn with no cause is a red word; the cause is what makes the transcript a
	 * record of a session rather than a log with a hole in it.
	 */
	cause?: string;

	/**
	 * What a reader can do about a failed turn, printed under the cause. The
	 * transcript is a session, not a form, so this is a line of instruction
	 * (`NEXT:`) rather than a control - the block's one action is the copy.
	 */
	next?: string;
}

/**
 * RecordTranscript - a session, printed as it happened.
 *
 * The information type is a *session*: what was typed, what answered, in order,
 * with the speakers named. It is not a Well (one command, copied as a block) and
 * it is not a Stage (the order a process happens in, abstracted): a transcript
 * is verbatim and it has two sides.
 *
 * `source` is required - a transcript with no provenance is a story. `window` is
 * the too-much state: a session of two hundred turns prints its first twelve and
 * the count it did not print, because a page that renders two hundred turns has
 * stopped being readable and started being an archive.
 */
export interface Transcript {
	/** `TRANSCRIPT_01` - printed as `# TRANSCRIPT_01`. */
	index: string;

	/** The `/LABEL` after the index: `/BUILD`, `/SETUP`. */
	label?: string;

	/** The turns, in the order they happened. The block sorts nothing. */
	turns: readonly Turn[];

	/** Where the session was read out of. Required. */
	source: string;

	/** When the session was recorded. */
	asOf?: string;

	/**
	 * `rest` prints the turns; `loading` prints them as skeletons (mark and
	 * speaker in ink, a hairline bar where the line would be - a session being
	 * read still shows how many turns it has); `empty` prints `empty` instead of
	 * a frame.
	 */
	state?: "rest" | "loading" | "empty";

	/** What the transcript says when it has no turns. */
	empty?: string;

	/**
	 * The too-much state: `showing` turns printed of `total` (`240`). The foot
	 * prints `SHOWING 12 OF 240` and the rest of the session is named, not
	 * dropped silently.
	 */
	window?: { readonly showing: number; readonly total: string };

	/** One line under the session: what it does not record. */
	note?: string;

	/** Show the copy control in the bar. Defaults to `true`. */
	copy?: boolean;

	/**
	 * The session's way back, when a turn failed: `→ RE-RUN THE BUILD`. A failed
	 * turn prints its own cause and next step, but the session's recovery is one
	 * destination and belongs on the foot, once - not repeated under every turn
	 * that stopped at the same place.
	 */
	retry?: { readonly label: string; readonly href: string };
}

/** One figure in a plate-set: a numbered cell of the set. */
export interface PlateCell {
	/** `01` - the cell's number, printed verbatim. */
	index: string;

	/** What this plate shows, in one line. */
	subject: string;

	/** The capture. Set with `alt`. */
	src?: string;

	/** The capture's alternative text. Set with `src`. */
	alt?: string;

	/** The cell's state: `UNAVAILABLE` when the build carries no plate for it. */
	state?: FieldRecordStatusState;

	/**
	 * The reason, or the next step, printed under the cell's subject. A cell
	 * that is absent says why in the same line the present ones use for their
	 * caption - the set does not have two grammars.
	 */
	note?: string;

	/**
	 * Where the full capture lives, when the cell's frame is a way to it.
	 *
	 * A set is scanned at one size; the capture at that size is a thumbnail of a
	 * claim, and the reader who wants to check it needs the plate. The frame
	 * becomes an anchor - the whole 4:3 frame, not a "view" link beside it - so
	 * the picture is the control, and it takes the focus ring every other link on
	 * the site takes. A cell with no `href` keeps its frame as a frame: a set of
	 * figures is not a gallery of doors, and most of its cells lead nowhere.
	 */
	href?: string;
}

/**
 * RecordPlateSet - many figures of one subject, read as a field.
 *
 * The information type is *evidence as a set*: fifteen element plates, three
 * platform plates, the captures one edition would carry. A matrix compares
 * values across columns and an archive files records as rows; a plate-set is
 * pictures, and the only way to compare pictures is to see them side by side at
 * one size.
 *
 * The set prints its own register line (`# PLATES_01 / ELEMENT EVIDENCE`,
 * `PLATES␁15`) and one caption under the field. `window` is the too-much state,
 * exactly as the transcript's.
 */
export interface PlateSet {
	/** `PLATES_01` - printed as `# PLATES_01`. */
	index: string;

	/** The `/LABEL` after the index: `/ELEMENT EVIDENCE`. */
	label?: string;

	/** The plates, in the order they print. The block sorts nothing. */
	plates: readonly PlateCell[];

	/**
	 * How many across on wide screens: `2` or `3`. Defaults to `3` - a set of
	 * figures is a field, and two across reads as a pair.
	 */
	columns?: 2 | 3;

	/** The one statement made about the set as a whole. */
	caption?: string;

	/** Where the set came from: the manifests, the directory, the register. */
	source?: string;

	/** `rest` prints the cells; `loading` prints them as skeletons. */
	state?: "rest" | "loading" | "empty";

	/** What the set says when it has no plates. */
	empty?: string;

	/** The too-much state: cells printed of the total. */
	window?: { readonly showing: number; readonly total: string };
}
