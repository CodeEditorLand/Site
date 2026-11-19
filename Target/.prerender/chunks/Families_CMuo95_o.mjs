import { $ as Rows$1, $t as BuiltCount$7, A as BuiltCount$6, Bt as BuiltCount$2, Cn as CellCount$9, Dt as Rows$5, H as Rows$6, K as CellCount$1, Mn as Rows$9, N as CellCount$6, O as Rows$3, Ot as Specimens$5, Pn as Specimens$9, Rt as Rows, U as Specimens$6, Ut as CellCount$2, W as BuiltCount$1, Xt as Rows$2, Zt as Specimens$2, _n as Specimens$7, a as CellCount$8, bn as BuiltCount$9, et as Specimens$1, g as BuiltCount$3, h as Specimens$8, hn as Rows$7, ht as BuiltCount$5, it as CellCount$4, jt as CellCount, k as Specimens$3, kt as BuiltCount, m as Rows$8, mt as Specimens$4, n as BuiltCount$8, nn as CellCount$7, pt as Rows$4, tt as BuiltCount$4, vt as CellCount$5, y as CellCount$3, zt as Specimens } from "./SurfaceShell_Bi62faMK.mjs";
import { r as Material } from "./Page_tkIW5-nu.mjs";
// Source/Content/Specimen/Parts.ts
/**
* The twelve parts, in the order the sheet prints them: the seven that stand on
* a plate first (a reader meets a specimen before a reason), then the two that
* are printed somewhere else on the page, then the three that are not printed at
* all.
*/
var Parts = [
	{
		mark: "01",
		name: "BADGE",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICBADGE.TSX",
		note: "A word in a Jelly badge, with an optional dot.",
		contract: [
			{
				key: "TAKES:",
				value: "Text, Variant, ShowDot, DotColor",
				code: true
			},
			{
				key: "PRINTS:",
				value: "One jelly-badge, and optionally a 6px square in the protocol ink the dot names."
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (the Jelly host pins) and _Shell.scss (.surface__chips)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 01"
			}
		],
		disposition: "printed",
		plate: "#part-badge"
	},
	{
		mark: "02",
		name: "LABEL",
		kind: "FORM",
		file: "COMPONENT/DYNAMIC/DYNAMICLABEL.TSX",
		note: "A form label that states its own two conditions.",
		contract: [
			{
				key: "TAKES:",
				value: "Text, Required, Disabled, HTMLFor",
				code: true
			},
			{
				key: "PRINTS:",
				value: "One label, with aria-required and aria-disabled stated on the label rather than left to the control."
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (the label role) and Contact/_Form.scss",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 02"
			}
		],
		disposition: "printed",
		plate: "#part-label"
	},
	{
		mark: "03",
		name: "CARD",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICCARD.TSX",
		note: "Three sections on one Jelly card.",
		contract: [
			{
				key: "TAKES:",
				value: "Sections: Header, Body, Footer, and an optional OnClick",
				code: true
			},
			{
				key: "PRINTS:",
				value: "A jelly-card whose header carries a title, a description and free content; whose body carries a second title and its prose; and whose footer carries the action."
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (radius 0, --Card fill, no shadow)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 03"
			}
		],
		disposition: "printed",
		plate: "#part-card"
	},
	{
		mark: "04",
		name: "TABLE",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/DYNAMICTABLE.TSX",
		note: "A head row and one row per record.",
		contract: [
			{
				key: "TAKES:",
				value: "Columns, Data, Striped, Hoverable, OnRowClick",
				code: true
			},
			{
				key: "PRINTS:",
				value: "A head row, then one row per record. A column may render its own cell, so a row can carry a mark, a route or a state."
			},
			{
				key: "STYLESHEET:",
				value: "Record/_Matrix.scss (the table's rule and seam)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 04, reading the four connection tiers"
			}
		],
		disposition: "printed",
		plate: "#part-table"
	},
	{
		mark: "05",
		name: "PROSE",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/DYNAMICRICHTEXT.TSX",
		note: "One string, parsed into paragraphs.",
		contract: [
			{
				key: "TAKES:",
				value: "Text, ClassName",
				code: true
			},
			{
				key: "PRINTS:",
				value: "Paragraphs from one string, through the site's own RichText parser: a blank line is a paragraph, a backtick is code."
			},
			{
				key: "STYLESHEET:",
				value: "_Global.scss (the prose measure and the code face)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 05, mounted as an island so the parser ships only where it is read"
			}
		],
		disposition: "printed",
		plate: "#part-prose"
	},
	{
		mark: "06",
		name: "ARTICLE CARD",
		kind: "CONTENT",
		file: "COMPONENT/DYNAMIC/DYNAMICBLOGCARD.TSX",
		note: "An entry, as a card.",
		contract: [
			{
				key: "TAKES:",
				value: "Post: Tags, Title, Summary, Author, ReadTime",
				code: true
			},
			{
				key: "PRINTS:",
				value: "The tags as chips, the title, three lines of the summary, then the author and the reading time on one row."
			},
			{
				key: "STYLESHEET:",
				value: "Blog/_Listing.scss (the card's face and its hover)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 06, fed by the newest entry in the collection"
			}
		],
		disposition: "printed",
		plate: "#part-article"
	},
	{
		mark: "07",
		name: "PROPERTIES",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/PROPERTIES/GRID.ASTRO",
		note: "Six claims as records: three kept, three filed.",
		contract: [
			{
				key: "TAKES:",
				value: "entries: PropertyEntry[] - marker, claim, paragraph, optional destination",
				code: true
			},
			{
				key: "PRINTS:",
				value: "One jelly-card per claim, each carrying a RecordEntry in the property's own tint, then the three the layer files as one line of destinations. The split is DesignSystem-Grammar §8's three-claim budget, applied in Data.ts rather than in the markup."
			},
			{
				key: "STYLESHEET:",
				value: "Dynamic/_Properties.scss (.properties-grid, .properties-entry, .properties-filed) and System/Record/_Entry.scss",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 07 - and nothing else: the homepage's band prints the six elements as records rather than the six claims, so the claim grid is a part no page mounts"
			}
		],
		disposition: "printed",
		plate: "#part-properties"
	},
	{
		mark: "08",
		name: "CHIPS",
		kind: "SURFACE",
		file: "COMPONENT/SURFACE/SURFACECHIPS.ASTRO",
		note: "A record's states, as chips.",
		contract: [
			{
				key: "TAKES:",
				value: "chips[]",
				code: true
			},
			{
				key: "PRINTS:",
				value: "One jelly-badge per state, each carrying the §1.5 marker and the tone's ink. The fill stays the neutral mute: a state chip is not a protocol chip and takes no spine ink."
			},
			{
				key: "STYLESHEET:",
				value: "Surface/_Shell.scss (.surface__chips, .surface__mark)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, THE STATES BAND, where it prints the vocabulary as a legend"
			}
		],
		disposition: "printed",
		plate: "#states"
	},
	{
		mark: "09",
		name: "TIER TABLE",
		kind: "CONTENT",
		file: "COMPONENT/DYNAMIC/INTERFACE/CONTENT/PAGE/PORTALDATA.TS",
		note: "Four tiers and their protocols.",
		contract: [
			{
				key: "TAKES:",
				value: "Cloud, Provider, LocalFirst, Enterprise",
				code: true
			},
			{
				key: "PRINTS:",
				value: "Each tier's protocol spine, its badge and its feature set. It is the only file in the tree that carries all four tiers' protocol lines, three terms each, and no page printed them until this sheet."
			},
			{
				key: "STYLESHEET:",
				value: "Record/_Matrix.scss, through PLATE 04",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "THIS SHEET, PLATE 04 - the table reads this table"
			}
		],
		disposition: "printed",
		plate: "#part-table"
	},
	{
		mark: "10",
		name: "HEADER",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICHEADER.TSX",
		note: "The legacy schema-driven bar.",
		contract: [
			{
				key: "TAKES:",
				value: "Navigation, Actions, Logo",
				code: true
			},
			{
				key: "PRINTS:",
				value: "`Layout/Header`, adapted from a legacy schema."
			},
			{
				key: "STYLESHEET:",
				value: "Component/_Header.scss (the one bar's rules)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "NONE, BY DESIGN - see the absence below"
			}
		],
		disposition: "absent",
		absence: {
			status: "UNAVAILABLE",
			wouldBe: "The schema-driven bar, printed at 1:1 on a plate, the way every other part on this sheet is.",
			whyNot: "It renders `Layout/Header`, and a second bar in one document is a second navigation landmark, a second mobile drawer and a second hydrated island. The frame prints the one bar, on every page; a copy of it here would be a picture of a page inside a page.",
			next: {
				label: "READ THE BAR ITSELF",
				href: "/"
			},
			note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DYNAMICHEADER.TSX CONSUMER: NONE, AND THAT IS THE DESIGN"
		}
	},
	{
		mark: "11",
		name: "FOOTER",
		kind: "SURFACE",
		file: "COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX",
		note: "The four-column closing band.",
		contract: [
			{
				key: "TAKES:",
				value: "Brand, Social, Columns, BottomBar",
				code: true
			},
			{
				key: "PRINTS:",
				value: "A `<footer>`: a brand column with its social row, then one column of links per register, then a bottom bar with the copyright."
			},
			{
				key: "STYLESHEET:",
				value: "Tailwind utilities, and `text-muted-foreground` for every link",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "NONE - the Frame's colophon carries it"
			}
		],
		disposition: "absent",
		absence: {
			status: "UNAVAILABLE",
			wouldBe: "The closing band, printed at 1:1: the brand, the four link columns and the bottom bar.",
			whyNot: "A `<footer>` inside a page is a second contentinfo landmark, and the band it draws is the one the frame replaced - four columns of links in `text-muted-foreground`, where the document now closes on a colophon of two ledgers under a hairline. The five facts it carried are the footer's ledger today, and they are printed on every page rather than copied onto this one.",
			next: {
				label: "READ THE FIVE FACTS",
				href: "/Status"
			},
			note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX SUPERSEDED BY: COMPONENT/LAYOUT/FOOTER.ASTRO"
		}
	},
	{
		mark: "12",
		name: "VERIFICATION",
		kind: "BLOCK",
		file: "COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",
		note: "Checksums and signatures, with copy.",
		contract: [
			{
				key: "TAKES:",
				value: "Title, Description, DownloadVerification, IntegrityVerification",
				code: true
			},
			{
				key: "PRINTS:",
				value: "Two blocks, each with a SHA-256 digest, a signature and a copy control on every value."
			},
			{
				key: "STYLESHEET:",
				value: "Download/_Verify.scss (the region's wells)",
				code: true
			},
			{
				key: "CONSUMER:",
				value: "NONE - /Download's /VERIFY region carries it"
			}
		],
		disposition: "absent",
		absence: {
			status: "UNAVAILABLE",
			wouldBe: "The checksum and signature block, printed at 1:1 with a live copy control.",
			whyNot: "It is superseded by the `/VERIFY` region of `/Download`, which prints the same two digests as `RecordWell` blocks with the site's one copy control - and this component copies through `alert()`, which is a browser dialog rather than a receipt in the record. Printing it would print the older of two answers to one question.",
			next: {
				label: "READ THE VERIFICATION RECORD",
				href: "/Download"
			},
			note: "SOURCE: SOURCE/COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX SUPERSEDED BY: DOWNLOAD/VERIFY.ASTRO"
		}
	}
];
/**
* The printed parts, in the sheet's order, narrowed so a plate can take one
* without a cast.
*
* The first seven are the seven plates. `CHIPS` prints in `/THE STATES` (its
* anchor is the band) and `TIER TABLE` is printed by PLATE 04, so neither stands
* on a plate of its own - which is why the sheet prints nine parts and seven
* plates.
*/
var PrintedParts = Parts.filter((Part) => Part.disposition === "printed" && Part.plate !== void 0);
/** How many parts the sheet files. */
var PartCount = Parts.length;
/** How many parts the sheet prints live. */
var PrintedCount = Parts.filter((Part) => Part.disposition === "printed").length;
/** How many parts the sheet states an absence for. */
var AbsentCount = Parts.filter((Part) => Part.disposition === "absent").length;
/** How many parts are carried by another surface. */
var FoldedCount = Parts.filter((Part) => Part.disposition === "folded").length;
/** The distinct layers the parts belong to, in the sheet's order. */
var Kinds = [...new Set(Parts.map((Part) => Part.kind))];
/**
* The sheet's cell for one part: what a reader scans before choosing a plate.
*
* Derived rather than stored, because a cell that restated its part's own fields
* would be a second copy of them - and the second copy is the one that falls
* behind.
*/
var SheetRow = (Part) => ({
	mark: Part.mark,
	name: Part.name,
	note: Part.note,
	kind: Part.kind,
	disposition: Part.disposition,
	...Part.plate === void 0 ? {} : { href: Part.plate }
});
/**
* The sheet's rows, in reading order.
*
* A printed part links to its plate; an absent one does not, because the sheet
* prints the absence in place of the plate and a link to a plate that does not
* exist is a dead link dressed as a live one.
*/
var SheetRows = Parts.map(SheetRow);
// Source/Content/Specimen/States.ts
/**
* The nine arms, in the brief's own order.
*
* The order is the brief's and not the alphabet's: a reader meets the states in
* the sequence the document describes them, so the band and `Design-Brief.md`
* §7 can be read side by side.
*/
var States = (Context) => [
	{
		kind: "empty",
		index: "EMPTY / 01",
		statement: "A set with nothing in it yet: the archive before its first entry, a rail with no rows, a release page with no artifact.",
		cause: "The arm says what would be here, why it is not, and where to read instead. It never prints a zero - a zero is a measurement, and nothing here has been measured.",
		next: {
			label: "READ THE ARCHIVE",
			href: "/Blog"
		},
		note: "OCCURS AT: /BLOG WHEN THE COLLECTION IS EMPTY"
	},
	{
		kind: "loading",
		index: "LOADING / 02",
		statement: "The keys are known before the values are: the record's own field names, printed at the label register with their values barred.",
		cause: "No spinner. A spinner says that something is happening; a skeleton says what - and the schema of a record is known the moment the record is asked for.",
		keys: [
			"SESSION:",
			"ROUTE:",
			"PROFILE:"
		],
		note: "OCCURS AT: /ACCOUNT WHILE THE SESSION IS READ"
	},
	{
		kind: "partial",
		index: "PARTIAL / 03",
		statement: "Some facts unknown. The figure that could not be counted prints UNAVAILABLE, and the ones that could print their values beside it.",
		cause: "UNAVAILABLE is the truth about not having a measurement. A zero would claim the number is nought, and a blank cell would claim the field does not exist.",
		next: {
			label: "READ THE RELEASE RECORD",
			href: "/Download"
		},
		rows: [{
			key: "KNOWN:",
			value: "PLATFORMS 3"
		}, {
			key: "UNAVAILABLE:",
			value: "VERSION, SIZE, DIGEST"
		}],
		note: "OCCURS AT: /DOWNLOAD NO ARTIFACT IS PUBLISHED"
	},
	{
		kind: "error",
		index: "ERROR / 04",
		statement: "An action failed. The page states it in the vocabulary's word for an interruption, names the cause, and offers the one way to try again.",
		cause: "INTERRUPTED is ink, not quiet: a failure stated in a hushed tone is a failure the design is apologising for. The retry is a link, because a disabled button is not a way forward.",
		next: {
			label: "READ THE FAILURE REGISTER",
			href: "/OAuth/Success"
		},
		note: "OCCURS AT: /OAUTH/SUCCESS FOUR ARMS, FOUR CAUSES"
	},
	{
		kind: "stale",
		index: "STALE / 05",
		statement: "A reading older than its as-of. The last known value stays visible, and the age prints beside it.",
		cause: "A figure with no date is a figure from an unknown year. The date is part of the figure, and hiding an old number is worse than printing an old number.",
		next: {
			label: "READ THE MEASUREMENTS",
			href: "/Compare"
		},
		asOf: Context.AsOf,
		age: Context.Age,
		note: "OCCURS AT: /COMPARE THE ONE DATED ROW"
	},
	{
		kind: "too-much",
		index: "TOO MUCH / 06",
		statement: "A set that outgrew the shape it was drawn for. The register prints how many it holds, and the band still holds them.",
		cause: "A list of two hundred is not a layout problem to hide: it is a number to print. The count goes in the register line, and the band keeps its rhythm rather than its assumed length.",
		next: {
			label: "READ THE ROUTE ARCHIVE",
			href: "/Contents"
		},
		rows: [
			{
				key: "SET:",
				value: `${Context.RouteCount} ROUTES`
			},
			{
				key: "DRAWN FOR:",
				value: "12"
			},
			{
				key: "CROP:",
				value: "NONE - THE BAND HOLDS"
			}
		],
		note: "OCCURS AT: /CONTENTS THE WHOLE TREE IN ONE ARCHIVE"
	},
	{
		kind: "too-long",
		index: "TOO LONG / 07",
		statement: "A value that will not fit the measure. It prints clipped, states how long it really is, and offers the whole of itself on hover and in the document.",
		cause: "The layout must not break for a title, and the title must not be silently shortened into a different title. Both facts print.",
		value: Context.LongestTitle,
		limit: "72CH",
		note: "OCCURS AT: /BLOG THE LONGEST TITLE IN THE COLLECTION"
	},
	{
		kind: "missing",
		index: "MISSING / 08",
		statement: "A record whose target is gone. The tombstone stands where the link was, and it says what the target was.",
		cause: "A dead link is a promise the document cannot keep. The tombstone is not an apology: it is the record of a destination that used to exist, printed where a reader would have clicked.",
		next: {
			label: "READ THE MANUAL",
			href: "/Doc"
		},
		note: "OCCURS AT: /BLOG/<SLUG> A NOTE WHOSE MANUAL PAGE IS GONE"
	},
	{
		kind: "denied",
		index: "DENIED / 09",
		statement: "A surface the reader may not see. It says what the surface is, not only that the session is not allowed to open it.",
		cause: "Denied is a condition of the reader's session, not of the record: the record exists, the session does not. A page that printed only the refusal would be describing the reader rather than the document.",
		next: {
			label: "SIGN IN",
			href: "/Account/SignIn"
		},
		note: "OCCURS AT: /ACCOUNT THE PROFILE ISLAND BEFORE SIGN-IN"
	}
];
/**
* How many conditions the band prints.
*
* Derived rather than typed: `States()` emits one cell per condition and the
* context only fills their values, so the array's length is the condition count
* whatever the page measured. The gallery index reads this figure, which is why
* a tenth condition added to the band moves the index in the same edit.
*/
var StateCount = States({
	LongestTitle: "",
	AsOf: "",
	Age: "",
	RouteCount: 0
}).length;
/**
* The vocabulary as the band's legend: one chip per word, in the register's
* order.
*
* `SurfaceChips` reads a plain `string[]` and looks the tone up in
* `Surface/State.ts`, so the legend cannot claim a tone the register does not
* give the word. `PLANNED` is deliberately not here - it is a declaration, not
* a state, and the register's eight are the whole of the vocabulary.
*/
var Vocabulary = [
	"READY",
	"ACTIVE",
	"LOADING",
	"PREPARING",
	"VERIFIED",
	"UNAVAILABLE",
	"INTERRUPTED",
	"ARCHIVED"
];
// Source/Content/Specimen/Families.ts
/**
* Families - the sheet's own index: every band on `/Specimen`, what it argues,
* and the figures its matrix counts.
*
* ─── WHY THE SHEET NEEDED AN INDEX OF ITSELF ──────────────────────────────
* Ten family bands, four opening bands, the material strip and the closing
* register: sixteen sections in one scroll, and without an index no way to see
* them. The sheet's own argument is that a design frame becomes real when its
* worst combinations are printed - and a reader who cannot survey the frame is
* reading a list of sections rather than a document.
*
* So the index is not a table of contents in the ordinary sense. Each row states
* three things: what the band is, the figures its matrix counted, and the one
* sentence that says what the family ARGUES. A reader scanning the index learns
* the sheet's shape - ten families, each with its own question - before reading
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
/** A family's figure, in the sheet's own register: `16 × 24 / 384 / 47`. */
var Figure = (Rows, Cells, Built, Specimens) => `${Rows} × ${Cells / Rows} / ${Cells} CELLS / ${Built} BUILT / ${Specimens} ROWS`;
/**
* The sixteen bands, in the order they are read.
*
* The first four are the sheet's own apparatus, the next ten are the families,
* and the last two are the stock and the closing ledger. The index's order IS the
* page's order: a reader who uses it as a table of contents and a reader who uses
* it as a map are reading the same sequence.
*/
var Families = [
	{
		index: "01",
		label: "/THE SHEET",
		href: "#sheet",
		figure: `${PartCount} PARTS / ${PrintedCount} PRINTED / ${AbsentCount} ABSENT / ${FoldedCount} FOLDED`,
		argues: "A contact sheet is the one page where equal cells are right: the parts are genuinely equal, and the reader is choosing between them rather than reading them.",
		read: "Every part of the document as one cell, with a printed part linking to its plate and an absent one printing its reason in place of a link.",
		group: "sheet"
	},
	{
		index: "02",
		label: "/THE PLATES",
		href: "#plates",
		figure: `${PrintedParts.length} PRINTED PARTS / 1:1`,
		argues: "A plate's stage is 1:1. Nothing on this sheet is scaled to fit: a part that could not be shown at its own size is stated in THE ABSENCES instead.",
		read: "Nine parts are printed and seven of them stand on a plate at 1:1 - a stage that is the surface the part will be printed on, the white insert for a flat part and the creme field for a part that is itself a surface. The other two are printed on the bands they belong to.",
		group: "sheet"
	},
	{
		index: "03",
		label: "/THE ABSENCES",
		href: "#absences",
		figure: `${AbsentCount} STATED`,
		argues: "An absence is a composition, not a gap: what would be here, why it is not, and where to read the thing itself.",
		read: "The parts that cannot stand on a plate, in the same three rows every absence on this site uses.",
		group: "sheet"
	},
	{
		index: "04",
		label: "/THE STATES",
		href: "#states",
		figure: `${StateCount} CONDITIONS / ${Vocabulary.length} WORDS`,
		argues: "A page without its adverse states is half a page, and the eight words are the whole vocabulary: empty, loading, partial, error, stale, too much, too long, missing.",
		read: "The nine conditions the document's own surfaces survive, composed live, each naming where it happens.",
		group: "sheet"
	},
	{
		index: "05",
		label: "/THE FIELD",
		href: "#field",
		figure: Figure(Rows.length, CellCount, BuiltCount, Specimens.length),
		argues: "A control's states are the design: what it is when it is empty, when it is refused, when it is read-only, and when the reader cannot see it at all.",
		read: "The input family's matrix and its live rows - the fields, the labels, the selects, the toggles and the one control that is a paragraph.",
		group: "family"
	},
	{
		index: "06",
		label: "/THE OVERLAY",
		href: "#overlay",
		figure: Figure(Rows$1.length, CellCount$1, BuiltCount$1, Specimens$1.length),
		argues: "An overlay is judged in the two seconds after a click: what it covers, what it returns to, and the five ways out.",
		read: "The overlay family's matrix, its five-rule dismissal contract, and every state printed live - a slip, a drawer, a modal, a menu and a command well.",
		group: "family"
	},
	{
		index: "07",
		label: "/THE DISPLAY",
		href: "#display",
		figure: Figure(Rows$2.length, CellCount$2, BuiltCount$2, Specimens$2.length),
		argues: "A display is read rather than used: its worst state is not a failed action but a figure that lies about its own extent.",
		read: "The display family's matrix, its verdict on the two components no page mounts, and every state a chart, a calendar, a table or a figure is read in.",
		group: "family"
	},
	{
		index: "08",
		label: "/THE RECORD",
		href: "#record",
		figure: Figure(Rows$3.length, CellCount$3, BuiltCount$3, Specimens$3.length),
		argues: "A ledger is believed, not used. A fact that has lost its adverse state is a fact that lies, and a lie is the one defect this family cannot survive.",
		read: "The ledger, the matrix, the stage, the well, the figure, the pair, the archive and the register - every form the document states a fact in.",
		group: "family"
	},
	{
		index: "09",
		label: "/THE NARRATIVE",
		href: "#narrative",
		figure: Figure(Rows$4.length, CellCount$4, BuiltCount$4, Specimens$4.length),
		argues: "A narrative block is the thing a reader is TOLD: a band opens a subject, a stage explains an order, a figure shows evidence, a well hands over a command, and a failure explains a dead end.",
		read: "The narrative family's matrix, the three behaviours the brief named by hand, and sixty-two rows of bands, stages, figures, wells, transcripts and failures.",
		group: "family"
	},
	{
		index: "10",
		label: "/THE FRAME",
		href: "#frame",
		figure: Figure(Rows$5.length, CellCount$5, BuiltCount$5, Specimens$5.length),
		argues: "The frame decides whether content can be read at all - and its one law is that nothing here is a card: a shell holds tracks, a track holds bands, a band holds records, and a card is a record's surface.",
		read: "The shell, the rail, the seam, the plate and the surface states, plus the five compositions a page shell has to survive - no rail, two rails, a shell inside a shell, a pane pair at 640px, and a plate with no image.",
		group: "family"
	},
	{
		index: "11",
		label: "/THE READING",
		href: "#reading",
		figure: Figure(Rows$6.length, CellCount$6, BuiltCount$6, Specimens$6.length),
		argues: "Furniture fails by losing the reader: a rail that does not say where you are, a contents list that does not say where you are in the page, a folio that does not say how far you have got.",
		read: "The rail, the contents, the index card, the article, the appendix, the folio, the see-also and the leader - a document with one section, with ninety, a heading wider than the rail, and a strip at 640px.",
		group: "family"
	},
	{
		index: "12",
		label: "/THE COMPOSITION",
		href: "#composition",
		figure: Figure(Rows$7.length, CellCount$7, BuiltCount$7, Specimens$7.length),
		argues: "The marketing layer is a LAYER, not a block: thirty-five `Dynamic/*` parts were built to be the schema between content and surface, and a part with no importer is a decision the owner has not made yet.",
		read: "The hero, the bands, the cards, the manifest, the marks, the verdict on every `Dynamic/*` part, and sixty-six live compositions - a hero with no evidence image, a proof band of three, nine tiles in a narrow card, a seal at 16px and at 240px.",
		group: "family"
	},
	{
		index: "13",
		label: "/THE SMALL SURFACES",
		href: "#small",
		figure: Figure(Rows$8.length, CellCount$8, BuiltCount$8, Specimens$8.length),
		argues: "A small surface fails by being ABANDONED: the page a reader reaches when they are locked out, their session expired, their request did not send - and the page nobody designed a second state for.",
		read: "The credential frame and its report, the account directory, the licence's clause apparatus, a request route, the reference blocks, and the seven ways these pages are read.",
		group: "family"
	},
	{
		index: "14",
		label: "/THE APPARATUS",
		href: "#apparatus",
		figure: Figure(Rows$9.length, CellCount$9, BuiltCount$9, Specimens$9.length),
		argues: "Apparatus fails by being absent and unnoticed: a motion that does not fire, a card with no image, a provider that was never configured, a trail with no crumbs - none of them throws, and every one of them is a lie about the state of the world.",
		read: "Motion, the specimen surface's own blocks and this index, the head, the runtime providers, the trail and the blog - the reduced-motion reader, the motion with no trigger, the specimen at one and at forty, the card with no image and the provider with no logo.",
		group: "family"
	},
	{
		index: "15",
		label: "/THE MATERIAL",
		href: "#material",
		figure: `${Material.length} SPECIMENS`,
		argues: "Six things and no seventh: a seventh colour would be a second identity, and the sheet is where that would show.",
		read: "The paper, the insert, two inks, the one accent and the one hairline - shown rather than described, painted with the token itself.",
		group: "stock"
	},
	{
		index: "16",
		label: "/THE REGISTER",
		href: "#register",
		figure: `${PartCount} PARTS COUNTED`,
		argues: "A sheet that could disagree with itself would be two claims about one document, so every figure on this page is counted from the table it prints.",
		read: "What the sheet counted and the file it counted from, then the four doors out.",
		group: "stock"
	}
];
/** How many bands the index lists. */
var FamilyCount = Families.length;
Families.filter((Family) => Family.group === "family").length;
/** How many cells the ten matrices print, counted from the families themselves. */
var MatrixCellCount = CellCount + CellCount$1 + CellCount$2 + CellCount$3 + CellCount$4 + CellCount$5 + CellCount$6 + CellCount$7 + CellCount$8 + CellCount$9;
/** How many rows the ten plates print, counted from the families themselves. */
var MatrixRowCount = Specimens.length + Specimens$1.length + Specimens$2.length + Specimens$3.length + Specimens$4.length + Specimens$5.length + Specimens$6.length + Specimens$7.length + Specimens$8.length + Specimens$9.length;
export { States as a, FoldedCount as c, Parts as d, PrintedCount as f, MatrixRowCount as i, Kinds as l, SheetRows as m, FamilyCount as n, Vocabulary as o, PrintedParts as p, MatrixCellCount as r, AbsentCount as s, Families as t, PartCount as u };
