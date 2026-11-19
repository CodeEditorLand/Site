/**
 * Families - the sheet's own index: every band on `/Specimen`, what it argues,
 * and the figures its matrix counts.
 *
 * ─── WHY THE SHEET NEEDED AN INDEX OF ITSELF ──────────────────────────────
 * Ten family bands, four opening bands, the material strip and the closing
 * register: sixteen sections in one scroll, and until this card no way to see
 * them. The sheet's own argument is that a design frame becomes real when its
 * worst combinations are printed - and a reader who cannot survey the frame is
 * reading a list of sections rather than a document.
 *
 * So the index is not a table of contents in the ordinary sense. Each row states
 * three things: what the band is, the figures its matrix counted, and the one
 * sentence that says what the family ARGUES. A reader scanning the index learns
 * the sheet's shape - nine families, each with its own question - before reading
 * a single cell of it.
 *
 * ─── EVERY FIGURE IS THE FAMILY'S OWN ─────────────────────────────────────
 * The counts come from the family modules themselves, not from this file. A
 * component added to `Reading.ts` moves the index's figure in the same edit, and
 * an index that could disagree with the matrix it points at is worse than no
 * index: it would be a second claim about the same set.
 *
 * ─── THE OPENING BANDS HAVE NO MATRIX, AND SAY SO ─────────────────────────
 * `/THE SHEET`, `/THE PLATES`, `/THE ABSENCES`, `/THE STATES`, `/THE MATERIAL`
 * and `/THE REGISTER` are the sheet's own apparatus: a contact sheet, seven
 * plates, three stated absences, nine composed conditions, six specimens of stock
 * and the closing ledger. They have no state matrix because they are not a family
 * of components - so their figure is a count of what they print, and their
 * `argues` line says what the band is for instead of what it proves.
 */
import {
	BuiltCount as CompositionBuilt,
	CellCount as CompositionCells,
	Rows as CompositionRows,
	Specimens as CompositionSpecimens,
} from "./Composition.js";

import {
	BuiltCount as DisplayBuilt,
	CellCount as DisplayCells,
	Rows as DisplayRows,
	Specimens as DisplaySpecimens,
} from "./Display.js";

import {
	BuiltCount as FieldBuilt,
	CellCount as FieldCells,
	Rows as FieldRows,
	Specimens as FieldSpecimens,
} from "./Field.js";

import {
	BuiltCount as FrameBuilt,
	CellCount as FrameCells,
	Rows as FrameRows,
	Specimens as FrameSpecimens,
} from "./Frame.js";

import {
	BuiltCount as NarrativeBuilt,
	CellCount as NarrativeCells,
	Rows as NarrativeRows,
	Specimens as NarrativeSpecimens,
} from "./Narrative.js";

import {
	BuiltCount as OverlayBuilt,
	CellCount as OverlayCells,
	Rows as OverlayRows,
	Specimens as OverlaySpecimens,
} from "./Overlay.js";

import {
	BuiltCount as ReadingBuilt,
	CellCount as ReadingCells,
	Rows as ReadingRows,
	Specimens as ReadingSpecimens,
} from "./Reading.js";

import {
	BuiltCount as RecordBuilt,
	CellCount as RecordCells,
	Rows as RecordRows,
	Specimens as RecordSpecimens,
} from "./Record.js";

import {
	BuiltCount as SmallBuilt,
	CellCount as SmallCells,
	Rows as SmallRows,
	Specimens as SmallSpecimens,
} from "./Small.js";

import {
	BuiltCount as ApparatusBuilt,
	CellCount as ApparatusCells,
	Rows as ApparatusRows,
	Specimens as ApparatusSpecimens,
} from "./Apparatus.js";

import {
	AbsentCount,
	FoldedCount,
	PartCount,
	PrintedCount,
	PrintedParts,
} from "./Parts.js";

import { Material } from "./Page.js";

import { StateCount, Vocabulary } from "./States.js";

/** One band on the sheet, as the index states it. */
export interface Family {
	/** `01` - the row's own position, printed after the `#`. */
	readonly index: string;

	/** The band's kicker, exactly as the band prints it: `/THE FIELD`. */
	readonly label: string;

	/** The band's anchor, including the `#`. */
	readonly href: string;

	/** The matrix's figure, or the band's own count where it has no matrix. */
	readonly figure: string;

	/** What the band argues, in one sentence. */
	readonly argues: string;

	/** What it is read for: the second line, at caption weight. */
	readonly read: string;

	/**
	 * Which set the band belongs to. The index prints a heavier rule where the
	 * sheet's own apparatus becomes a family and where the families give way to
	 * the stock - three different jobs, and a reader scanning the index should
	 * see where one set ends.
	 */
	readonly group: "sheet" | "family" | "stock";
}

/** A family's figure, in the sheet's own register: `16 × 24 / 384 / 47`. */
const Figure = (
	Rows: number,
	Cells: number,
	Built: number,
	Specimens: number,
) =>
	`${Rows} × ${Cells / Rows} / ${Cells} CELLS / ${Built} BUILT / ${Specimens} ROWS`;

/**
 * The sixteen bands, in the order they are read.
 *
 * The first six are the sheet's own apparatus, the next ten are the families,
 * and the last two are the stock and the closing ledger. The index's order IS the
 * page's order: a reader who uses it as a table of contents and a reader who uses
 * it as a map are reading the same sequence.
 */
export const Families: readonly Family[] = [
	{
		index: "01",

		label: "/THE SHEET",

		href: "#sheet",

		figure: `${PartCount} PARTS / ${PrintedCount} PRINTED / ${AbsentCount} ABSENT / ${FoldedCount} FOLDED`,

		argues: "A contact sheet is the one page where equal cells are right: the parts are genuinely equal, and the reader is choosing between them rather than reading them.",

		read: "Every part of the document as one cell, with a printed part linking to its plate and an absent one printing its reason in place of a link.",

		group: "sheet",
	},

	{
		index: "02",

		label: "/THE PLATES",

		href: "#plates",

		figure: `${PrintedParts.length} PRINTED PARTS / 1:1`,

		argues: "A plate's stage is 1:1. Nothing on this sheet is scaled to fit: a part that could not be shown at its own size is stated in THE ABSENCES instead.",

		read: "Nine parts are printed and seven of them stand on a plate at 1:1 - a stage that is the surface the part will be printed on, the white insert for a flat part and the creme field for a part that is itself a surface. The other two are printed on the bands they belong to.",

		group: "sheet",
	},

	{
		index: "03",

		label: "/THE ABSENCES",

		href: "#absences",

		figure: `${AbsentCount} STATED`,

		argues: "An absence is a composition, not a gap: what would be here, why it is not, and where to read the thing itself.",

		read: "The parts that cannot stand on a plate, in the same three rows every absence on this site uses.",

		group: "sheet",
	},

	{
		index: "04",

		label: "/THE STATES",

		href: "#states",

		figure: `${StateCount} CONDITIONS / ${Vocabulary.length} WORDS`,

		argues: "A page without its adverse states is half a page, and the eight words are the whole vocabulary: empty, loading, partial, error, stale, too much, too long, missing.",

		read: "The nine conditions the document's own surfaces survive, composed live, each naming where it happens.",

		group: "sheet",
	},

	{
		index: "05",

		label: "/THE FIELD",

		href: "#field",

		figure: Figure(
			FieldRows.length,
			FieldCells,
			FieldBuilt,
			FieldSpecimens.length,
		),

		argues: "A control's states are the design: what it is when it is empty, when it is refused, when it is read-only, and when the reader cannot see it at all.",

		read: "The input family's matrix and its live rows - the fields, the labels, the selects, the toggles and the one control that is a paragraph.",

		group: "family",
	},

	{
		index: "06",

		label: "/THE OVERLAY",

		href: "#overlay",

		figure: Figure(
			OverlayRows.length,

			OverlayCells,

			OverlayBuilt,

			OverlaySpecimens.length,
		),

		argues: "An overlay is judged in the two seconds after a click: what it covers, what it returns to, and the five ways out.",

		read: "The overlay family's matrix, its five-rule dismissal contract, and every state printed live - a slip, a drawer, a modal, a menu and a command well.",

		group: "family",
	},

	{
		index: "07",

		label: "/THE DISPLAY",

		href: "#display",

		figure: Figure(
			DisplayRows.length,

			DisplayCells,

			DisplayBuilt,

			DisplaySpecimens.length,
		),

		argues: "A display is read rather than used: its worst state is not a failed action but a figure that lies about its own extent.",

		read: "The display family's matrix, its verdict on the two components no page mounts, and every state a chart, a calendar, a table or a figure is read in.",

		group: "family",
	},

	{
		index: "08",

		label: "/THE RECORD",

		href: "#record",

		figure: Figure(
			RecordRows.length,

			RecordCells,

			RecordBuilt,

			RecordSpecimens.length,
		),

		argues: "A ledger is believed, not used. A fact that has lost its adverse state is a fact that lies, and a lie is the one defect this family cannot survive.",

		read: "The ledger, the matrix, the stage, the well, the figure, the pair, the archive and the register - every form the document states a fact in.",

		group: "family",
	},

	{
		index: "09",

		label: "/THE NARRATIVE",

		href: "#narrative",

		figure: Figure(
			NarrativeRows.length,

			NarrativeCells,

			NarrativeBuilt,

			NarrativeSpecimens.length,
		),

		argues: "A narrative block is the thing a reader is TOLD: a band opens a subject, a stage explains an order, a figure shows evidence, a well hands over a command, and a failure explains a dead end.",

		read: "The narrative family's matrix, the three behaviours the brief named by hand, and sixty-two rows of bands, stages, figures, wells, transcripts and failures.",

		group: "family",
	},

	{
		index: "10",

		label: "/THE FRAME",

		href: "#frame",

		figure: Figure(
			FrameRows.length,

			FrameCells,

			FrameBuilt,

			FrameSpecimens.length,
		),

		argues: "The frame decides whether content can be read at all - and its one law is that nothing here is a card: a shell holds tracks, a track holds bands, a band holds records, and a card is a record's surface.",

		read: "The shell, the rail, the seam, the plate and the surface states, plus the five compositions a page shell has to survive - no rail, two rails, a shell inside a shell, a pane pair at 640px, and a plate with no image.",

		group: "family",
	},

	{
		index: "11",

		label: "/THE READING",

		href: "#reading",

		figure: Figure(
			ReadingRows.length,

			ReadingCells,

			ReadingBuilt,

			ReadingSpecimens.length,
		),

		argues: "Furniture fails by losing the reader: a rail that does not say where you are, a contents list that does not say where you are in the page, a folio that does not say how far you have got.",

		read: "The rail, the contents, the index card, the article, the appendix, the folio, the see-also and the leader - a document with one section, with ninety, a heading wider than the rail, and a strip at 640px.",

		group: "family",
	},

	{
		index: "12",

		label: "/THE COMPOSITION",

		href: "#composition",

		figure: Figure(
			CompositionRows.length,

			CompositionCells,

			CompositionBuilt,

			CompositionSpecimens.length,
		),

		argues: "The marketing layer is a LAYER, not a block: thirty-five `Dynamic/*` parts were built to be the schema between content and surface, and a part with no importer is a decision the owner has not made yet.",

		read: "The hero, the bands, the cards, the manifest, the marks, the verdict on every `Dynamic/*` part, and sixty-six live compositions - a hero with no evidence image, a proof band of three, nine tiles in a narrow card, a seal at 16px and at 240px.",

		group: "family",
	},

	{
		index: "13",

		label: "/THE SMALL SURFACES",

		href: "#small",

		figure: Figure(
			SmallRows.length,

			SmallCells,

			SmallBuilt,

			SmallSpecimens.length,
		),

		argues: "A small surface fails by being ABANDONED: the page a reader reaches when they are locked out, their session expired, their request did not send - and the page nobody designed a second state for.",

		read: "The credential frame and its report, the account directory, the licence's clause apparatus, a request route, the reference blocks, and the seven ways these pages are read.",

		group: "family",
	},

	{
		index: "14",

		label: "/THE APPARATUS",

		href: "#apparatus",

		figure: Figure(
			ApparatusRows.length,

			ApparatusCells,

			ApparatusBuilt,

			ApparatusSpecimens.length,
		),

		argues: "Apparatus fails by being absent and unnoticed: a motion that does not fire, a card with no image, a provider that was never configured, a trail with no crumbs - none of them throws, and every one of them is a lie about the state of the world.",

		read: "Motion, the specimen surface's own blocks and this index, the head, the runtime providers, the trail and the blog - the reduced-motion reader, the motion with no trigger, the specimen at one and at forty, the card with no image and the provider with no logo.",

		group: "family",
	},

	{
		index: "15",

		label: "/THE MATERIAL",

		href: "#material",

		figure: `${Material.length} SPECIMENS`,

		argues: "Six things and no seventh: a seventh colour would be a second identity, and the sheet is where that would show.",

		read: "The paper, the insert, two inks, the one accent and the one hairline - shown rather than described, painted with the token itself.",

		group: "stock",
	},

	{
		index: "16",

		label: "/THE REGISTER",

		href: "#register",

		figure: `${PartCount} PARTS COUNTED`,

		argues: "A sheet that could disagree with itself would be two claims about one document, so every figure on this page is counted from the table it prints.",

		read: "What the sheet counted and the file it counted from, then the four doors out.",

		group: "stock",
	},
];

/** How many bands the index lists. */
export const FamilyCount = Families.length;

/** How many of the bands carry a state matrix. */
export const MatrixFamilies = Families.filter(
	(Family) => Family.group === "family",
).length;

/** How many cells the ten matrices print, counted from the families themselves. */
export const MatrixCellCount =
	FieldCells +
	OverlayCells +
	DisplayCells +
	RecordCells +
	NarrativeCells +
	FrameCells +
	ReadingCells +
	CompositionCells +
	SmallCells +
	ApparatusCells;

/** How many rows the ten plates print, counted from the families themselves. */
export const MatrixRowCount =
	FieldSpecimens.length +
	OverlaySpecimens.length +
	DisplaySpecimens.length +
	RecordSpecimens.length +
	NarrativeSpecimens.length +
	FrameSpecimens.length +
	ReadingSpecimens.length +
	CompositionSpecimens.length +
	SmallSpecimens.length +
	ApparatusSpecimens.length;
