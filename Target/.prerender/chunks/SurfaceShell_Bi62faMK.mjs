import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$SurfaceHead } from "./SurfaceHead_epMIyR7B.mjs";
// Source/Content/Specimen/Apparatus.ts
/**
* The twenty-four columns, in reading order.
*
* Nine conditions first, because they are the states any block is met in; then
* six shapes, because they are what apparatus is asked to hold; then the seven
* compositions this family's brief named by hand - the reduced-motion reader, the
* motion with no state change, the card with no image, the row with no logo, the
* head read outside the page, the runtime that is not reachable and the provider
* with no credentials; then two contexts, because they are the two a designer
* forgets: the action the block carries and the medium it is printed on.
*/
var Columns$9 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a read failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight arm",
		group: "condition"
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY",
		ask: "twenty-six or forty",
		group: "shape"
	},
	{
		key: "long",
		label: "LONG",
		ask: "a line past its column",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "shape"
	},
	{
		key: "reduced",
		label: "REDUCED",
		ask: "the reader asked for less motion",
		group: "composition"
	},
	{
		key: "notrigger",
		label: "NO TRIGGER",
		ask: "no state change to explain",
		group: "composition"
	},
	{
		key: "noimage",
		label: "NO IMAGE",
		ask: "a card with no image",
		group: "composition"
	},
	{
		key: "nologo",
		label: "NO LOGO",
		ask: "a row with no logo",
		group: "composition"
	},
	{
		key: "unfurled",
		label: "UNFURLED",
		ask: "read outside the page",
		group: "composition"
	},
	{
		key: "offline",
		label: "OFFLINE",
		ask: "the runtime is not reachable",
		group: "composition"
	},
	{
		key: "unconfigured",
		label: "UNCONFIGURED",
		ask: "no credentials",
		group: "composition"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "one thing to click",
		group: "context"
	},
	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$7 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$7 = (reason) => ({
	disposition: "na",
	reason
});
/** The reason a printed block is never a control. */
var NotAControl$4 = (what) => NotApplicable$7(`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`);
/** The reason a printed block is read-only by construction. */
var ReadOnly$4 = (what) => NotApplicable$7(`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`);
/** The reason a leaf is one thing and cannot be a set. */
var NotASet$4 = (what, set) => NotApplicable$7(`A ${what} is one object by definition; a set is ${set}, and a block that answered both would be two blocks with one name.`);
/** The reason a build-time block has no loading state. */
var BuildTime$2 = (what, why) => NotApplicable$7(`A ${what} is read at build time: ${why} so there is no state in which the block exists and its content has not arrived.`);
/** The reason a printed register carries no as-of of its own. */
var NoAsOf$2 = (what, whose) => NotApplicable$7(`A ${what} carries no as-of of its own: an age belongs to ${whose}, and a block that invented one would be the one figure on the page with no source.`);
/** The reason a page-shaped thing cannot live inside a card. */
var NotACard$1 = (what, inside) => NotApplicable$7(`A ${what} is a page's ${inside}: inside a card it would be a page inside a record, and a card inside a card is the one composition the identity forbids.`);
/** The reason a block has no tight step. */
var NoDense$1 = (what, why) => NotApplicable$7(`A ${what} has no tight step: ${why}.`);
/** The reason a printed block carries no media of its own. */
var NoMedia = (what, carries) => NotApplicable$7(`A ${what} prints ${carries}: it holds no image slot, so there is no no-image arm to build - the image a reader sees belongs to the surface around it.`);
/** The reason a block has no identity to authenticate. */
var NoLogo = (what) => NotApplicable$7(`A ${what} prints no logo: a logo is a provider's mark, and this family's rows name a file, a condition or a route rather than an organisation, so there is no mark to be missing.`);
/** The reason a block has no unfurled form. */
var NoUnfurl = (what, why) => NotApplicable$7(`A ${what} has no unfurled form: ${why} so there is nothing for a feed to read outside the page.`);
/** The reason a block reads no network. */
var NoNetwork = (what, why) => NotApplicable$7(`A ${what} reads no network: ${why}.`);
/** The reason a block has no credentials to be configured with. */
var NoCredentials = (what) => NotApplicable$7(`A ${what} takes no credentials: there is no domain, no client identifier and no key in its contract, so "unconfigured" names no arm it could have.`);
/** The reason a block prints no action. */
var NoAction = (what, why) => NotApplicable$7(`A ${what} prints no action: ${why}.`);
/** The reason a block has no printed form. */
var NoPaper = (what, why) => NotApplicable$7(`A ${what} has no printed form: ${why}.`);
/** The reason a block has no measure of its own. */
var NoMeasure = (what, why) => NotApplicable$7(`A ${what} has no measure of its own: ${why}.`);
/**
* The seventeen components, in the order a reader meets them: the six motion
* blocks, the four specimen blocks (the sheet, the plate, the material and the
* gallery index), the head, the three runtime providers, the trail, and the two
* blog surfaces.
*
* Every row's overrides are reasons. A row with no overrides would be a part that
* survives every combination, and no part does.
*/
var Rows$9 = [
	{
		name: "MOTIONFOLD",
		file: "COMPONENT/MOTION/MOTIONFOLD.ASTRO",
		note: "A disclosure with content behind it: the summary is a register line (`# OPEN QUESTIONS / 03`), the body is a run of leaves - `[index] [label] [meta]` - and the state is the browser's `open` attribute.",
		cells: {
			error: NotApplicable$7("A fold cannot fail on its own: its leaves are handed to it, so a read that failed is the page's state and the fold is not mounted. A leaf whose target is gone is the tombstone arm (`gone`), which is the closest thing to a failure this block has and is not the same fact."),
			stale: NoAsOf$2("fold", "its leaves' own `meta` cells"),
			disabled: NotAControl$4("fold"),
			readonly: ReadOnly$4("fold"),
			dense: NoDense$1("fold", "a leaf is already one row at the meta step, and the tightest honest step is the one it prints"),
			incard: Built$7("a disclosure inside a card is a disclosure inside a surface - the card is the artifact's box, not a second fold"),
			reduced: Built$7("`System/Motion/_Fold.scss` declares the end state unconditionally and gates only its interval, so a reader who asked for less motion gets the leaves in one frame rather than a shorter slide"),
			notrigger: NotApplicable$7("A fold is a trigger by definition: `details` owns `[open]`, the state change is the reader's click, and a fold with no trigger is a fold that cannot be opened - which is the one motion this layer forbids rather than one it forgot."),
			noimage: NoMedia("fold", "leaves - an index, a label, a note and a meta cell"),
			nologo: NoLogo("fold"),
			unfurled: NoUnfurl("fold", "it is an in-page disclosure over content the page already holds,"),
			offline: NoNetwork("fold", "its leaves are composed with the page, and a fold whose content never arrived is the `loading` arm rather than an offline one"),
			unconfigured: NoCredentials("fold"),
			print: NotApplicable$7("A closed disclosure prints its summary and not its body: on paper the fold is its register line. Forcing the body open in the print stylesheet would print a document the reader cannot close, so the limitation is recorded in `Observations` rather than papered over.")
		}
	},
	{
		name: "MOTIONEXPAND",
		file: "COMPONENT/MOTION/MOTIONEXPAND.ASTRO",
		note: "A set of records that open in place: the row prints `[index] [name] [one fact]`, and opening it reveals the record's register - `KEY: value` rows and the source - directly underneath, without moving the eight rows around it.",
		cells: {
			loading: NotApplicable$7("A record set prints the records it was given: the rows' names are the set, so there is no schema to print before the values arrive. The loading arm belongs to `MotionFold`, whose leaves are a run of unknown length."),
			stale: Built$7("`AS OF:` is a fact row like any other: an old measurement is the value's own date, and the block does not invent a second figure"),
			disabled: NotAControl$4("record set"),
			readonly: ReadOnly$4("record set"),
			dense: NoDense$1("record set", "one row per record at the meta step, and a record's register is its own density"),
			incard: Built$7("a record set inside a card is the card's content"),
			reduced: Built$7("`System/Motion/_Expand.scss` gates the interval and not the end state: the register arrives in one frame for a reader who asked for less motion"),
			notrigger: Built$7("a record with `missing` is not a disclosure at all - it prints `◎`, its name and `WAS:`, because a `<details>` that opens onto nothing is a lie about the state of the world. That is the no-trigger arm, and it is the tombstone."),
			noimage: NoMedia("record set", "records - an index, a name, one fact and a register"),
			nologo: NoLogo("record set"),
			unfurled: NoUnfurl("record set", "it is a set of disclosures over records the page already holds,"),
			offline: NoNetwork("record set", "its records are composed with the page, and a record whose read failed is the tombstone rather than an offline state"),
			unconfigured: NoCredentials("record set"),
			print: NotApplicable$7("Every record is a closed `<details>` on paper: the sheet prints eight rows and none of their registers. The disclosure is a screen affordance and the print stylesheet cannot open it, so the limitation is recorded rather than hidden.")
		}
	},
	{
		name: "MOTIONSEQUENCE",
		file: "COMPONENT/MOTION/MOTIONSEQUENCE.ASTRO",
		note: "A state change drawn: an ordered run of state nodes with one edge between each pair, and each edge prints the motion's name above a hairline and its interval below it.",
		cells: {
			empty: Built$7("fewer than two nodes, or an edge count that does not match the nodes, prints `◎ NO TRANSITION` and the composed sentence - the drawing refuses rather than drawing a broken run"),
			loading: NotApplicable$7("A sequence is printed from its data: the nodes are the states, so a run whose states have not arrived is the empty arm rather than a skeleton of a diagram."),
			partial: Built$7("an edge with no interval prints `UNAVAILABLE` at muted ink - never `0 MS`, which would be a measurement"),
			error: NotApplicable$7("A sequence has no failure arm: a run that cannot be drawn is the empty arm with its sentence, and an edge that is wrong is a defect in the data rather than a state the block can print."),
			stale: NoAsOf$2("sequence", "the intervals it prints"),
			disabled: NotAControl$4("sequence"),
			readonly: ReadOnly$4("sequence"),
			dense: NoDense$1("sequence", "the run is one row of nodes and edges, and compressing it would be the sentence it exists to replace"),
			one: Built$7("a one-node run is not drawable and says so: the empty arm is the one-state sequence's honest form"),
			many: Built$7("nine states and eight edges wrap at the band's measure"),
			reduced: Built$7("the `reduced` prop prints what the sequence does for a reader who asked for less motion - the state change without the interval - under the run, in the same register"),
			notrigger: NotApplicable$7("A sequence documents transitions; it performs none. There is no rule here to fire, so there is no trigger for it to be missing."),
			noimage: NoMedia("sequence", "nodes and edges - words on a hairline"),
			nologo: NoLogo("sequence"),
			unfurled: NoUnfurl("sequence", "it is a drawing of one page's own transitions,"),
			offline: NoNetwork("sequence", "it is composed with the page and describes transitions the stylesheet already carries"),
			unconfigured: NoCredentials("sequence"),
			withaction: NoAction("sequence", "it is a drawing of a state machine, not a control over one - an action inside it would be a stepper, which is the thing this block was built instead of"),
			print: Built$7("the nodes, the edges, the intervals and the source print")
		}
	},
	{
		name: "MOTIONSKELETON",
		file: "COMPONENT/MOTION/MOTIONSKELETON.ASTRO",
		note: "The loading arm, printed in the record grammar: a register line, the keys the arriving record will print with their values barred, and `WAITING ON:` naming what has not arrived. No spinner.",
		cells: {
			empty: Built$7("the `empty` arm this card added: no key prints the composed sentence instead of an empty register, which was a `LOADING` head over a `<dl>` with nothing in it"),
			partial: Built$7("`age` is optional and prints `/ 318 DAYS` when the wait is measurable; the keys are the schema and print whether or not the age is known"),
			error: Built$7("the block is what a failed read leaves on the page: the keys and `WAITING ON:` stay legible after the connection dies, which is the whole argument for a skeleton over a spinner"),
			stale: Built$7("`age` is the as-of: a wait that has been running for a year says so, and the last known keys stay visible"),
			disabled: NotAControl$4("skeleton"),
			readonly: ReadOnly$4("skeleton"),
			dense: NoDense$1("skeleton", "one row per key at the meta step, and the keys are the record's own field names"),
			incard: Built$7("a skeleton inside a card is the card's own waiting state"),
			reduced: Built$7("the skeleton does not animate at all - a pulse is a loop and a fade-in is an entrance - so reduced motion loses nothing because there was nothing to lose"),
			notrigger: NotApplicable$7("A skeleton is the family's answer to the question rather than an instance of it: it never moves on its own, and its class (`resolve`) exists for the record that replaces it. There is no trigger-less motion here to build."),
			noimage: NoMedia("skeleton", "field names and bars, both drawn in the record grammar"),
			nologo: NoLogo("skeleton"),
			unfurled: NoUnfurl("skeleton", "it is a waiting state for one page's record,"),
			offline: Built$7("this is the block an offline page keeps: the keys are still printed, the bar is still barred, and `WAITING ON:` still names what did not arrive"),
			unconfigured: NoCredentials("skeleton"),
			withaction: NoAction("skeleton", "a retry inside a waiting state is a button that promises a request the block does not own - the page owns the retry"),
			print: NotApplicable$7("A skeleton is a waiting state and a printed sheet has already waited. The block prints if a page mounts it, and no page prints it.")
		}
	},
	{
		name: "MOTIONSPECIMEN",
		file: "COMPONENT/MOTION/MOTIONSPECIMEN.ASTRO",
		note: "One motion, stated on one side of a hairline and shown on the other: a register column (`# NAME / 08`, the proposition, the interval as a bar, the curve, what moves, what it keeps) and a stage holding the live artifact.",
		cells: {
			empty: Built$7("omitting `motion` is the plate arm - the stage and its note without the register - for a band whose motion has already been stated above it"),
			loading: BuildTime$2("specimen", "its register is the interaction class's own record from `Content/Motion/Register.ts`"),
			partial: Built$7("an interval nobody measured prints `UNAVAILABLE` at muted ink, and the bar drops to its floor rather than claiming a length"),
			error: NotApplicable$7("A specimen has no failure arm: a class the register does not carry is a build that does not run, and the plate prints what the register states."),
			stale: NoAsOf$2("specimen", "the interval it prints"),
			disabled: NotAControl$4("specimen"),
			readonly: ReadOnly$4("specimen"),
			dense: Built$7("`pair` and `trio` put two or three arms of one artifact inside a single stage, divided by hairlines - the dense arm is a narrower stage, not a smaller type"),
			one: Built$7("one specimen is one register column and one stage"),
			many: Built$7("nine specimens alternate `base` and `flip` so the sheet does not read as a table"),
			incard: Built$7("the stage is a white insert by construction, so a specimen inside a card is the one composition that would be a box in a box - and the plate uses `stage=\"field\"` for exactly that reason"),
			reduced: Built$7("the specimen's bar does not animate: it is the measured interval printed, and the class it describes carries its own reduced-motion end state"),
			notrigger: NotApplicable$7("A specimen prints a motion's facts; it performs none. Nothing here fires, so nothing here can fire without a trigger."),
			noimage: Built$7("the stage holds whatever the page slots in, including a block with no image"),
			nologo: Built$7("the stage holds a row with no mark as readily as one with a mark - the register column is where identity is stated, and it names a class rather than an organisation"),
			unfurled: NoUnfurl("specimen", "it is a sheet's own instrument, not a page's,"),
			offline: NoNetwork("specimen", "the register is build-time data"),
			unconfigured: NoCredentials("specimen"),
			withaction: Built$7("the stage can hold an action - `/Motion` mounts `MotionSpecimen__Act` as the handover's live link"),
			print: Built$7("the register, the bar, the interval and the stage's contents print")
		}
	},
	{
		name: "MOTIONORIGIN",
		file: "COMPONENT/MOTION/MOTIONORIGIN.TSX",
		note: "The origin specimen: a real trigger, a real slip, and the arrival from the side the control printed - the one motion class whose subject is the relation between a trigger and the surface it opens.",
		cells: {
			empty: NotApplicable$7("The slip's four rows are the class's own four sides - bottom, top, left, right. A slip with no row is a control that opens nothing, which is the one thing this specimen exists to disprove."),
			loading: NotApplicable$7("The slip is local: Radix owns open, closed and focus return, and there is no data behind the four rows to arrive."),
			partial: NotApplicable$7("Four sides are the geometry, not a set that can be short: a slip with three of them would be a claim about a class that does not exist."),
			error: NotApplicable$7("A slip has no failure arm: the popover is the browser's, and a trigger that cannot open is a script that did not load - which the register column's note states."),
			stale: NoAsOf$2("slip", "the class it describes"),
			disabled: NotApplicable$7("A disabled trigger is a control with no destination, and this specimen's whole claim is that the slip leaves the control. The arm would demonstrate the opposite of the class."),
			readonly: ReadOnly$4("slip"),
			dense: NoDense$1("slip", "four rows at the slip's own inset"),
			one: NotASet$4("slip", "the four sides of one popover"),
			many: NotASet$4("slip", "the four sides of one popover"),
			incard: Built$7("a popover opened from inside a card is the card's own control"),
			reduced: Built$7("`System/Motion/_Origin.scss` gates the offset and the interval, not the arrival: at reduced motion the slip is simply there, in the same place"),
			notrigger: NotApplicable$7("The origin class is a trigger by definition - the slip exists because the control was pressed, and `data-state=\"open\"` on the content is the state change it explains. A motion with no trigger is the one thing this class cannot be."),
			noimage: NoMedia("slip", "four rows - a side, a label and where it comes from"),
			nologo: NoLogo("slip"),
			unfurled: NoUnfurl("slip", "it is a surface opened by a control on the page,"),
			offline: NoNetwork("slip", "the four rows are constants in the component"),
			unconfigured: NoCredentials("slip"),
			withaction: Built$7("the trigger is the action, and it is a real `<button>` with a real popover"),
			print: NotApplicable$7("A popover cannot print: the slip is a surface that exists only while it is open, and the trigger prints as a button. The register column's note is what survives on paper.")
		}
	},
	{
		name: "SPECIMENSHEET",
		file: "COMPONENT/SPECIMEN/SPECIMENSHEET.ASTRO",
		note: "The contact sheet: every part as one cell - a mark, a name, a note, a kind and a disposition - four across, with a printed part linking to its plate and an absent one printing its reason in place of a link.",
		cells: {
			loading: BuildTime$2("sheet", "its cells are `Content/Specimen/Parts.ts`, composed in the same pass as the page"),
			partial: Built$7("a part with no plate prints its cell as a statement and no link; an absent part prints `◎ ABSENT` and keeps its cell"),
			error: NotApplicable$7("A sheet has no failure arm: a part that cannot be printed is a disposition, and the sheet states it in the cell rather than failing the grid."),
			stale: NoAsOf$2("sheet", "each part's own plate and source"),
			disabled: NotAControl$4("sheet"),
			readonly: ReadOnly$4("sheet"),
			dense: Built$7("it is a contact sheet: the density is the cell's, and nothing in it is below the meta tier"),
			one: Built$7("a sheet of one part is one cell at the grid's floor"),
			many: Built$7("forty cells print at four across and the grid holds - the sheet is the one block on the site whose shape is a count"),
			incard: NotACard$1("sheet", "index, not a record's surface"),
			reduced: Built$7("a sheet does not move: it is a printed grid and there is no transition in it"),
			notrigger: NotApplicable$7("A sheet is printed: it has no motion at all, so there is no rule that could fire without a state change."),
			noimage: NoMedia("sheet", "cells - a mark, a name, a note, a kind and a disposition"),
			nologo: NoLogo("sheet"),
			unfurled: NoUnfurl("sheet", "it is this document's own index,"),
			offline: NoNetwork("sheet", "its rows are the parts table, read at build time"),
			unconfigured: NoCredentials("sheet"),
			withaction: Built$7("a printed part's cell is one link to its plate, and this card made the link follow the disposition rather than the plate reference"),
			print: Built$7("the cells, the marks and the dispositions print as a ruled grid")
		}
	},
	{
		name: "SPECIMENPLATE",
		file: "COMPONENT/SPECIMEN/SPECIMENPLATE.ASTRO",
		note: "One part, printed at its own size beside its contract: the thing itself on a stage, the four facts that make it checkable in the column beside it, and the caption that says what to look at.",
		cells: {
			empty: NotApplicable$7("`part` is required and a plate is anchored to it: a plate with no part is a picture frame, and the sheet's absent parts are stated in `/THE ABSENCES` rather than printed as an empty stage."),
			loading: BuildTime$2("plate", "the part, its contract and its source are the parts table's own record"),
			partial: Built$7("`stageNote` and `stage` are optional, and a contract row whose value is unknown prints `UNAVAILABLE` like any other ledger value"),
			error: NotApplicable$7("A plate has no failure arm: a part that cannot be printed is a part the sheet does not plate, and `/THE ABSENCES` is where that composition lives."),
			stale: NoAsOf$2("plate", "the part's own source line"),
			disabled: NotAControl$4("plate"),
			readonly: ReadOnly$4("plate"),
			dense: NoDense$1("plate", "a plate is the airiest object on the sheet, and the air is what makes the contract readable beside the part"),
			one: Built$7("a plate is one part by definition"),
			many: NotApplicable$7("A plate holds one specimen: two parts on one stage is a screenshot, and the sheet prints a second plate instead."),
			incard: NotApplicable$7("A plate's stage is already the white insert; a plate inside a card would be a card inside a card, which is the one composition the identity forbids."),
			reduced: Built$7("a plate is static: the spec column's stickiness is not motion and the stage holds the part's own disclosures"),
			notrigger: NotApplicable$7("A plate prints a part; it performs nothing. There is no rule here to fire."),
			noimage: Built$7("a plate whose part carries no image prints the part it was given - the stage is the surface, not a picture slot"),
			nologo: Built$7("a part with no mark prints its contract and its stage: the mark column is the part's own register, not an organisation's logo"),
			unfurled: NoUnfurl("plate", "it is a sheet's instrument for one part,"),
			offline: NoNetwork("plate", "its contract is the parts table's record"),
			unconfigured: NoCredentials("plate"),
			withaction: NoAction("plate", "the part inside it may carry one, and the plate itself is a figure - a control in the spec column would be a control in a caption"),
			print: Built$7("the spec column, the stage's register and the caption print")
		}
	},
	{
		name: "SPECIMENMATERIAL",
		file: "COMPONENT/SPECIMEN/SPECIMENMATERIAL.ASTRO",
		note: "The stock and the inks, printed as specimens: a fill as a swatch of the token itself, an ink as a word set in it at the L tier, a rule as the rule - six of them, and no seventh.",
		cells: {
			empty: Built$7("the strip prints its composed sentence across the full track count, under the same register line, so an empty strip is the strip rather than a cell in it"),
			loading: BuildTime$2("material strip", "the six specimens are `Content/Specimen/Page.ts`'s, composed in the same pass as the sheet"),
			partial: NotApplicable$7("A strip's rows are the token sheet's own six. A specimen whose token the sheet does not carry is a build that lost the file - which the empty arm states - rather than a partial state a reader could be shown."),
			error: NotApplicable$7("A material strip has no failure arm: it prints the token sheet, and a sheet that could not be read is a build that does not run."),
			stale: NoAsOf$2("material strip", "the token sheet it prints"),
			disabled: NotAControl$4("material strip"),
			readonly: ReadOnly$4("strip"),
			dense: Built$7("it is the densest band on the page: material is scanned rather than read"),
			one: Built$7("one specimen prints one cell of the three-column strip"),
			many: NotApplicable$7("A seventh specimen would be a second identity. The block's own contract says six, and a strip that grew a row would be the sheet inventing a colour."),
			incard: NotACard$1("material strip", "band's artifact, not a record's surface"),
			reduced: Built$7("material does not move: a swatch is a fill and an ink is a word"),
			notrigger: NotApplicable$7("A material strip is printed; nothing in it transitions, so nothing can transition without a state change."),
			noimage: NotApplicable$7("A fill specimen is painted with the token itself rather than an image: there is no image to be missing, only a value the token sheet either carries or does not."),
			nologo: NoLogo("material strip"),
			unfurled: NoUnfurl("material strip", "it is this sheet's own stock,"),
			offline: NoNetwork("material strip", "the values are the token sheet's"),
			unconfigured: NoCredentials("material strip"),
			withaction: NoAction("material strip", "it is a specimen of the stock, and a swatch that did something would stop being a swatch"),
			print: Built$7("material is what a sheet is printed with: the swatches, the inks and the rule all print")
		}
	},
	{
		name: "SPECIMENFAMILIES",
		file: "COMPONENT/SPECIMEN/SPECIMENFAMILIES.ASTRO",
		note: "The gallery's index - the block this card built: one row per family band on the sheet, its register line, its figure, and the two sentences that say what the family argues and what it is read for.",
		cells: {
			empty: Built$7("a gallery with no family prints the composed sentence: a contents list with no contents is a page that failed to load, not a page with nothing in it"),
			loading: BuildTime$2("gallery index", "its rows and its figures are the family modules' own exports, counted in the same pass as the sheet"),
			partial: Built$7("a family whose figure cannot be counted prints `UNAVAILABLE` rather than a zero, because zero is a measurement"),
			error: NotApplicable$7("A gallery index has no failure arm: a family that is not on the sheet is not a row, and a row that cannot be counted is the partial arm."),
			stale: NoAsOf$2("gallery index", "each family's own matrix"),
			disabled: NotAControl$4("gallery index"),
			readonly: ReadOnly$4("gallery index"),
			dense: Built$7("one row per family at the meta step: fourteen rows and no prose between them"),
			one: Built$7("a gallery of one family is one row and the register above it"),
			many: Built$7("fourteen families, each with its kicker, its figure and its two lines"),
			long: Built$7("a family's label wraps under its kicker; the figure stays at the row's right end"),
			narrow: Built$7("the figure goes under the label below 48rem and keeps its rule"),
			wide: Built$7("the row is a three-track grid on the band's measure"),
			incard: NotACard$1("gallery index", "index, not a record's surface"),
			reduced: Built$7("the index is a list of anchors: it has no motion at all"),
			notrigger: NotApplicable$7("A gallery index is printed navigation; nothing in it transitions."),
			noimage: NoMedia("gallery index", "rows - a kicker, a label, a figure and two sentences"),
			nologo: NoLogo("gallery index"),
			unfurled: NoUnfurl("gallery index", "it indexes one sheet's bands,"),
			offline: NoNetwork("gallery index", "its figures are the family modules' exports"),
			unconfigured: NoCredentials("gallery index"),
			withaction: Built$7("every row is an anchor to its family's band, and the anchor is the row"),
			print: Built$7("the index prints as the sheet's own contents page")
		}
	},
	{
		name: "METATAGS",
		file: "COMPONENT/SOCIAL/METATAGS.TSX",
		note: "The document head - the one place a route's title, description, canonical and card are written, and the only part of the site that is read outside it.",
		cells: {
			empty: Built$7("a page with no title prints the site name and a page with no description prints the frame's sentence, so the head always states something rather than printing an empty tag"),
			loading: BuildTime$2("head", "its facts are the route's own props, resolved by the frame before the document is written"),
			partial: Built$7("no `publishedTime` prints no `datePublished`, no `author` prints the three organisations, and - after this card - no image omits the whole `og:image` family rather than pointing at a default that may not exist"),
			error: NotApplicable$7("A head has no failure arm: a route whose metadata could not be resolved is a build that does not run, and the frame's defaults are the fallback rather than an error state."),
			stale: NoAsOf$2("head", "the article's own `publishedTime`"),
			disabled: Built$7("`noIndex` is the head's denied arm: `noindex, nofollow` on the robots tag, and the page states that it is not for a reader"),
			readonly: ReadOnly$4("head"),
			dense: NoDense$1("head", "it writes tags, not rows"),
			one: NotASet$4("head", "one document's metadata"),
			many: NotASet$4("head", "one document's metadata"),
			long: Built$7("a long title is normalised to the site's one pattern and a long description is printed verbatim - the card's own truncation belongs to the feed, which is the unfurled column"),
			narrow: NoMeasure("head", "it writes tags and renders no box, so width is the feed's business rather than the block's"),
			wide: NoMeasure("head", "it renders no box; the width a reader sees is the card's, not the head's"),
			incard: NotACard$1("head", "metadata, not a record's surface"),
			reduced: NotApplicable$7("A head writes tags; it has no motion and no transition."),
			notrigger: NotApplicable$7("A head writes tags; nothing in it can fire."),
			noimage: Built$7("the arm this card added: `image={null}` omits `og:image`, its three sub-tags and `twitter:image`, because a card that points at an image the build does not have is worse than a card with no image"),
			nologo: NoLogo("head"),
			unfurled: Built$7("this is the unfurled arm: the `og:` and `twitter:` families are exactly what a feed reads, and the sheet prints them as a register because the head cannot be mounted in a body"),
			offline: NoNetwork("head", "it is written at build time into the document"),
			unconfigured: Built$7("an empty `url` omits the canonical link and `og:url` rather than printing an empty `href` - the arm this card added, because a canonical that points nowhere is a claim the page cannot keep"),
			withaction: NoAction("head", "a tag is not a control, and an action in the head is a link the reader cannot see"),
			print: NoPaper("head", "the head is the document's metadata, and a printed sheet carries the page it describes")
		}
	},
	{
		name: "ANALYTICSPROVIDER",
		file: "COMPONENT/PROVIDER/ANALYTICSPROVIDER.TSX",
		note: "The analytics context: one client, three calls (`track`, `trackPageView`, `identify`), and the silent catch that keeps a blocked request from breaking a page.",
		cells: {
			empty: Built$7("a provider with no children renders the context and nothing in it"),
			loading: Built$7("the client arrives in an effect, so every call before it is a no-op - and after this card the context says so: `available: false, reason: \"PENDING\"`"),
			partial: Built$7("a client that never arrived leaves the three calls as no-ops; the context's `available` is the fact a consumer can print instead of guessing"),
			error: Built$7("`GetWorkersClient()` throwing is caught and the context reports `available: false, reason: \"BLOCKED\"` - the arm an ad-blocker or a dead network produces"),
			stale: NoAsOf$2("analytics context", "the events it sends"),
			disabled: Built$7("`available: false` is the disabled arm: the calls are present, they do nothing, and the context says why rather than pretending the event landed"),
			readonly: ReadOnly$4("context"),
			dense: NoDense$1("analytics context", "it renders no rows and owns no rhythm"),
			one: NotASet$4("analytics context", "one client"),
			many: NotASet$4("analytics context", "one client"),
			long: Built$7("an event name and its properties are passed through verbatim, so a deep route is one long path rather than a truncated one"),
			narrow: NoMeasure("analytics context", "it wraps children and renders no box of its own"),
			wide: NoMeasure("analytics context", "it wraps children and renders no box of its own"),
			incard: Built$7("a provider can wrap a card: it is a context, not a surface"),
			reduced: NotApplicable$7("An analytics context sends events; it has no motion."),
			notrigger: NotApplicable$7("An analytics context fires on calls the page makes; it owns no rule of its own."),
			noimage: NoMedia("analytics context", "no markup at all beyond its children"),
			nologo: NoLogo("analytics context"),
			unfurled: NoUnfurl("analytics context", "it is a client-side context with no document output,"),
			offline: Built$7("the throw arm is the offline arm: an ad-blocker or a dead network leaves the page intact and the context reporting that it is blocked"),
			unconfigured: Built$7("no client means every call is a no-op - and the arm this card added is the context saying `available: false` with the reason, instead of a `return` that a consumer cannot distinguish from a delivered event"),
			withaction: NoAction("analytics context", "it renders no control"),
			print: NoPaper("analytics context", "it is a runtime context with no document output")
		}
	},
	{
		name: "AUTH0PROVIDER",
		file: "COMPONENT/PROVIDER/AUTH0PROVIDER.TSX",
		note: "The identity context: the Auth0 SPA provider, its redirect back to `/OAuth/Success`, and the organisation parameter the enterprise SSO routes need.",
		cells: {
			empty: NotApplicable$7("`Children` is required: a provider with nothing inside it is a context no island reads, and the frame only mounts it around the surfaces that need a session."),
			loading: NotApplicable$7("The SDK owns its own loading state, and it is not this block's to print: the credential surfaces render `STATUS: LOADING` through `AuthReport` while the exchange runs."),
			partial: Built$7("`Organization` is optional and, when present, is set both on the provider and in the authorization params - the two places Auth0 requires it"),
			error: NotApplicable$7("The SDK's errors surface through the auth routes' reports; this block is a context wrapper with no error arm of its own."),
			stale: NoAsOf$2("identity context", "the session the SDK stores"),
			disabled: NotApplicable$7("A disabled identity provider is a page with no sign-in, and the surface that needs one states that itself - the wrapper renders children or it renders the unconfigured arm."),
			readonly: ReadOnly$4("context"),
			dense: NoDense$1("identity context", "it renders no rows"),
			one: NotASet$4("identity context", "one tenant"),
			many: NotASet$4("identity context", "one tenant"),
			long: Built$7("a long domain or client identifier is passed through; the redirect is built from the window's origin, so a long origin is one long string rather than a truncated one"),
			narrow: NoMeasure("identity context", "it wraps children and renders no box"),
			wide: NoMeasure("identity context", "it wraps children and renders no box"),
			incard: Built$7("a provider can wrap a card"),
			reduced: NotApplicable$7("An identity context has no motion."),
			notrigger: NotApplicable$7("An identity context has no rule to fire."),
			noimage: NoMedia("identity context", "no markup beyond its children"),
			nologo: NoLogo("identity context"),
			unfurled: NoUnfurl("identity context", "it is a client-side context,"),
			offline: NotApplicable$7("An offline provider is the SDK's own error, which the auth routes report. The wrapper cannot tell an offline browser from a refused exchange, and a state it cannot distinguish is a state it must not print."),
			unconfigured: Built$7("the arm this card added: with no domain or no client identifier the provider renders its children unwrapped, so the credential surface still prints and the page states that the provider is unconfigured instead of the SDK throwing on mount"),
			withaction: NoAction("identity context", "the sign-in control belongs to the surface inside it"),
			print: NoPaper("identity context", "it is a runtime context")
		}
	},
	{
		name: "PAGEVIEWTRACKER",
		file: "COMPONENT/PROVIDER/PAGEVIEWTRACKER.TSX",
		note: "The pageview walker: one event per route, fired on mount and on every `pushState`, `replaceState` and `popstate`, and restored on unmount.",
		cells: {
			empty: Built$7("with no analytics context above it the tracker is inert: `UseAnalytics()` returns null and the effect returns early"),
			loading: Built$7("it waits for mount before it tracks, so a server render sends nothing"),
			partial: NotApplicable$7("A pageview is one event: there is no half-sent pageview a reader or a consumer could be shown, and the tracker's own state is a ref rather than a rendering."),
			error: Built$7("a failed track is caught and logged outside production: the page is not broken by its own telemetry"),
			stale: NoAsOf$2("tracker", "the timestamp each event carries"),
			disabled: Built$7("no context, no client, no event: the tracker is disabled by the absence above it and renders `null`"),
			readonly: ReadOnly$4("tracker"),
			dense: NoDense$1("tracker", "it renders nothing"),
			one: NotASet$4("tracker", "one listener set"),
			many: NotASet$4("tracker", "one listener set"),
			long: Built$7("a long path is sent verbatim, which is what makes a deep route legible in the event"),
			narrow: NoMeasure("tracker", "it renders nothing"),
			wide: NoMeasure("tracker", "it renders nothing"),
			incard: NotApplicable$7("The tracker is mounted once by the frame, not inside a card: a tracker per card would fire a pageview per card."),
			reduced: NotApplicable$7("The tracker renders nothing and moves nothing."),
			notrigger: NotApplicable$7("The tracker fires on a route change, which is a state change the router makes. It has no rule of its own to fire."),
			noimage: NoMedia("tracker", "nothing at all"),
			nologo: NoLogo("tracker"),
			unfurled: NoUnfurl("tracker", "it renders nothing,"),
			offline: Built$7("an offline track fails into the same catch as any other: the event is dropped, the page continues, and no reader sees a pageview error"),
			unconfigured: Built$7("no provider above it means no call to make, which is the arm this card made explicit"),
			withaction: NoAction("tracker", "it renders nothing"),
			print: NoPaper("tracker", "it renders nothing")
		}
	},
	{
		name: "TRAIL",
		file: "COMPONENT/ROUTE/TRAIL.ASTRO",
		note: "The site's one breadcrumb grammar: an ordered list of locations, each printed as the caller wrote it, the last one being the page the reader is on.",
		cells: {
			empty: Built$7("no crumb prints no landmark at all - this card's fix. A breadcrumb with nothing in it was a `<nav aria-label=\"Breadcrumb\">` around an empty `<ol>`, which a screen reader announces and a reader cannot use"),
			loading: NotApplicable$7("A trail is written with the page: there is no state in which the crumbs exist and their labels have not arrived."),
			partial: Built$7("a crumb with no `href` prints as the current page, and after this card the LAST crumb is the current page whether or not the caller gave it a target - a crumb that links to itself is not a route statement"),
			error: NotApplicable$7("A trail cannot fail: a crumb whose target moved is a broken link the page prints, and the trail does not read the target so it cannot invent a tombstone for one."),
			stale: NoAsOf$2("trail", "the page it is printed on"),
			disabled: NotAControl$4("trail"),
			readonly: ReadOnly$4("trail"),
			dense: NoDense$1("trail", "one row of crumbs at the meta step"),
			one: Built$7("one crumb: the page itself, as a statement"),
			many: Built$7("five crumbs wrap between themselves and never inside the grammar"),
			long: Built$7("a long label wraps inside its own crumb; the leading slash is never separated from it"),
			incard: NotACard$1("trail", "route statement, not a record's surface"),
			reduced: Built$7("a trail is markup: it has no motion"),
			notrigger: NotApplicable$7("A trail is printed navigation; nothing in it transitions."),
			noimage: NoMedia("trail", "crumbs - a slash and a label"),
			nologo: NoLogo("trail"),
			unfurled: NoUnfurl("trail", "it states where the reader is inside one document,"),
			offline: NoNetwork("trail", "its crumbs are the page's own"),
			unconfigured: NoCredentials("trail"),
			withaction: Built$7("every crumb but the last is a link, and the last carries `aria-current=\"page\"`"),
			print: Built$7("the crumbs print; the underline is the print stylesheet's")
		}
	},
	{
		name: "BLOGINDEX",
		file: "COMPONENT/BLOG/BLOGINDEX.ASTRO",
		note: "The archive page: a centred opening, a full-bleed plate of the archive's extent, and the articles as a lead and a capacity-ruled grid.",
		cells: {
			loading: BuildTime$2("index", "its rows are the blog collection, sorted once in `Blog/Data.ts` in the same pass as the page"),
			partial: Built$7("a row with no tags prints no tag list, and the lead is the first row of the sort rather than a flag - a collection of one prints one lead and no row"),
			error: NotApplicable$7("An archive has no failure arm: a collection that could not be read is a build that does not run, and an empty collection is the composed empty arm."),
			stale: Built$7("the newest date is a row's `<time>` and the plate's own measure, so an old archive says how old it is rather than pretending to be current"),
			disabled: NotAControl$4("index"),
			readonly: ReadOnly$4("index"),
			dense: NoDense$1("index", "its density is its capacity line - two tracks where two cards fit and one where they do not - and a tighter step is a narrower card"),
			one: Built$7("a collection of one prints the lead at the full measure and no row under it"),
			many: Built$7("eight cards print as a lead and a row; forty print the same way and the page grows, which is what an archive is for"),
			long: Built$7("a long title wraps at the lead's L tier and a long summary at the card's measure; the foot's date and reading time never break apart"),
			narrow: Built$7("one card per row below the grid's floor, at the card's own inset"),
			wide: Built$7("two tracks on the shell's capacity line, never three"),
			incard: NotACard$1("index", "page, not a record's surface"),
			reduced: Built$7("the index is static: the seed scatter is placement, not motion"),
			notrigger: NotApplicable$7("The index is printed; nothing in it transitions."),
			noimage: Built$7("the cards carry no image at all - the baseline's archive is text, tags, title, summary and foot - so the no-image arm is the resting arm"),
			nologo: NoLogo("index"),
			unfurled: NoUnfurl("index", "it is a page of the document,"),
			offline: NoNetwork("index", "its rows are the collection, read at build time"),
			unconfigured: NoCredentials("index"),
			withaction: Built$7("every card is one whole-card link, and the back-to-top label closes the page"),
			print: Built$7("the opening, the plate, the cards and the foot print")
		}
	},
	{
		name: "BLOGARTICLE",
		file: "COMPONENT/BLOG/BLOGARTICLE.ASTRO",
		note: "The reading surface an article is read on: the piece at 8, a 1px divider, and the margin at 4 carrying the summary, the section register, the figures, the notes and the folded aside.",
		cells: {
			empty: NotApplicable$7("An article is its title and its summary, both required: a piece with neither is a route that does not exist, and the index is where an empty collection is stated."),
			loading: BuildTime$2("article", "the piece, its frontmatter and its rendered headings are the collection's own record"),
			partial: Built$7("`toc: null` prints the register's composed sentence instead of an empty list, no `aside` prints no aside, and no `insets` prints no figures - each part is its own condition"),
			error: NotApplicable$7("An article has no failure arm: a piece that could not be rendered is a build that does not run, and a missing target is the index's row, not the article's."),
			stale: Built$7("the date is the opening's `<time>` and the margin's `FILED:` row, printed from one source, so an old piece says how old it is twice and identically"),
			disabled: NotAControl$4("article"),
			readonly: ReadOnly$4("article"),
			dense: NoDense$1("article", "the piece's rhythm is the prose flow's and the margin's, and a tighter article is a smaller measure"),
			one: Built$7("an article with one section prints the register's composed sentence and no list"),
			many: Built$7("ninety headings print a register that scrolls inside the pinned unit, bounded by the viewport it shares with the piece"),
			long: Built$7("the title balances at the L tier, the summary caps at the opening's measure and a long word breaks anywhere rather than widening the piece"),
			narrow: Built$7("below 1024 the margin re-composes under the piece - summary, register, figures, notes, aside, in that order, nothing hidden and nothing pinned"),
			wide: Built$7("the 8 / 1px / 4 workspace on the page's measure"),
			incard: NotACard$1("article", "page, not a record's surface"),
			reduced: Built$7("the article is static; the pinned unit is position, not motion"),
			notrigger: NotApplicable$7("The article is printed; nothing in it transitions."),
			noimage: Built$7("the piece carries no image: its evidence is the margin's figures"),
			nologo: NoLogo("article"),
			unfurled: NoUnfurl("article", "it is a page of the document,"),
			offline: NoNetwork("article", "the piece and its margin are rendered at build time"),
			unconfigured: NoCredentials("article"),
			withaction: Built$7("the register's anchors, the notes' destinations and the back link are the actions - and after this card they are the site's one trail above the title"),
			print: Built$7("the piece, the margin and the foot print; nothing in the margin is pinned on paper")
		}
	}
];
/** The cell at a row and a column: the row's override, or the built default. */
var MatrixCell$9 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$8 = () => Rows$9.flatMap((row) => Columns$9.map((column) => ({
	row,
	column,
	cell: MatrixCell$9(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$9 = Rows$9.length * Columns$9.length;
/** How many cells the family builds. */
var BuiltCount$9 = MatrixCells$8().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$9 = CellCount$9 - BuiltCount$9;
/** How many cells one row builds. */
var BuiltOf$9 = (Row) => Columns$9.filter((Column) => MatrixCell$9(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$7 = (Column) => Rows$9.filter((Row) => MatrixCell$9(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$9 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$9.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$9.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$9)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$9)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$9)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$9.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/APPARATUS.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that revealed
* it. An improvement with no cell behind it would be a preference.
*/
var Improvements$6 = [
	{
		component: "TRAIL",
		from: "EMPTY / PARTIAL",
		found: "An empty trail rendered `<nav aria-label=\"Breadcrumb\"><ol></ol></nav>` - a breadcrumb landmark a screen reader announces and a reader cannot use. The previous card found it and left it to this one, because the file belongs to the route family. And the current-page rule was `href`-shaped rather than positional: a page that passed a target on its last crumb printed a link to itself, which is a route statement that lies about where the reader is.",
		built: "An empty trail now renders nothing at all: no landmark, no list. The last crumb is the current page by position, so it prints as a statement carrying `aria-current=\"page\"` even when the caller gave it a target - and a `label` prop lets the landmark name the document it belongs to (`Breadcrumb: Documentation`), defaulting to the old word."
	},
	{
		component: "METATAGS",
		from: "NO IMAGE / UNCONFIGURED",
		found: "The head could not express the absence of an image. `image` defaulted to `/Favicon/og-image.png`, so a page that had no card passed `image=\"\"` and the head printed `og:image` as the bare origin - a URL that resolves to nothing - plus three sub-tags describing it. The same shape held for `url`: an empty canonical printed `<link rel=\"canonical\" href=\"\">`, which tells a crawler the page canonically lives nowhere.",
		built: "`Social/Tags.ts` is now the one place the head's facts are decided, and `MetaTags.tsx` renders what it returns. `image={null}` omits `og:image`, `og:image:width`, `og:image:height`, `og:image:type` and `twitter:image` together, because they describe one image. An empty `url` omits the canonical and `og:url`. The specimen sheet prints the returned tags as a register, so the head's contract is inspectable without mounting a `<head>`."
	},
	{
		component: "MOTIONSKELETON",
		from: "EMPTY",
		found: "A skeleton with no key printed a register head reading `# LOADING / 04`, an empty `<dl>`, and `WAITING ON:` - a count of four over a list of nothing. The block's whole argument is that a reader waiting learns the schema; with no keys there is no schema, and the page printed the frame of a fact instead of the fact.",
		built: "`empty` is now a prop, and a skeleton with no key prints the composed sentence under the same register head - the count reads `UNAVAILABLE` rather than a number nothing supports, and `WAITING ON:` still names what has not arrived."
	},
	{
		component: "MOTIONSEQUENCE",
		from: "REDUCED",
		found: "The sequence was the one block in the family that could not state what happens to a motion at reduced motion. Every rule in `System/Motion/` declares its end state unconditionally and gates only its interval, and the block that draws transitions had no field for the promise - so the sheet could print an interval and not the condition under which it is skipped.",
		built: "`reduced` is a prop: one sentence printed under the run in the same register, saying what the state change does for a reader who asked for less motion. `/Specimen` prints it on the sequence's reduced row, and `/Motion` can pass the family's own line without a second block."
	},
	{
		component: "MOTIONFOLD",
		from: "LOADING",
		found: "`state=\"loading\"` with no `keys` printed `<ol aria-busy=\"true\">` with nothing in it - a busy list announcing nothing - and a fold whose `waiting` sentence was also absent printed a summary over white space. The empty arm existed; the loading arm did not have one.",
		built: "The loading arm falls back to the block's own `empty` sentence when there is no key and no `waiting` line, inside the busy list rather than instead of it, so the state is still announced as busy and the sentence still says what would be here."
	},
	{
		component: "MOTIONEXPAND",
		from: "PARTIAL",
		found: "A record whose register was empty printed an empty `<dl>` and its `SOURCE:` line - a provenance statement for facts that were not there. The row still opened, so the disclosure promised a register and delivered a source.",
		built: "An empty register prints `◎ NO FACT` and the source in the same grammar the block's empty arm uses, and the row stays a disclosure: the record exists, its register is what is absent, and the block says which."
	},
	{
		component: "SPECIMENSHEET",
		from: "PARTIAL",
		found: "The cell's link was decided by `Row.plate === undefined` rather than by the disposition. A part whose disposition was `absent` but which carried a plate reference - the shape the parts table allows - printed a live link to a plate that does not exist: a dead link dressed as a live one, which is exactly what the block's own docstring forbids.",
		built: "The cell links when, and only when, the disposition is `printed`. An absent or folded part keeps its cell, its mark and its word, and prints no anchor."
	},
	{
		component: "SPECIMENMATERIAL",
		from: "REST",
		found: "Both specimen strips composed their accessible name by appending a unit to a count string the caller had already written a unit into: the page passes `count=\"6 SPECIMENS\"`, and the section's `aria-label` read `MATERIAL: 6 SPECIMENS specimens`. A screen reader heard the unit twice on the one line that names the artifact, and the sheet's own `SHEET: 12 PARTS parts` had the same defect.",
		built: "The accessible name counts the rows the block is about to render (`MATERIAL: 6 specimens`, `SHEET: 12 parts`) while the visible register keeps the caller's own string. The name and the set now agree even when a caller's count carries a unit, a word or a measurement."
	},
	{
		component: "ANALYTICSPROVIDER",
		from: "ERROR / OFFLINE / UNCONFIGURED",
		found: "`GetWorkersClient()` throwing left the context with a null client and a `track` that returned early. A consumer could not tell a delivered event from a dropped one - the failure was caught, logged in development, and invisible everywhere else. The provider that exists to make the runtime's state legible was the one part of the runtime with no state to read.",
		built: "The context carries `available` and `reason` (`PENDING`, `BLOCKED`, or absent when the client is live). `track` returns the same promise either way, so no call site changes, and a surface that wants to state its own telemetry status can now print the fact instead of guessing."
	},
	{
		component: "AUTH0PROVIDER",
		from: "UNCONFIGURED",
		found: "With no domain or no client identifier the wrapper still mounted the SDK's provider with empty strings. The SDK throws on mount, which takes the whole island down - so the one surface a reader reaches when they cannot get in was the surface that failed hardest when the environment was incomplete.",
		built: "The wrapper renders its children unwrapped when either value is missing, so the credential surface still prints and the page can state that the provider is unconfigured. A configured environment renders exactly what it rendered before."
	},
	{
		component: "PAGEVIEWTRACKER",
		from: "MANY / IN A CARD",
		found: "The tracker patched `history.pushState` and `history.replaceState` at module scope from inside an effect and restored them on cleanup. Two mounted trackers - a second island, a preview, a surface that mounts its own - captured each other's patched functions, and whichever unmounted first left the other's patch in place forever: a pageview per route change became a pageview per tracker.",
		built: "The listeners and the two history patches are now installed once, by a module-level subscriber set: the first tracker installs, the last one removes, and a second tracker joins the set. One route change is one event however many trackers are mounted."
	},
	{
		component: "BLOGINDEX",
		from: "REST",
		found: "The archive's trail was `ContactBreadcrumb` - the bridge kept for compatibility after `Route/Trail` absorbed it. The blog was the last surface still reaching through a Contact-named adapter for the site's one breadcrumb grammar, which is how a bridge outlives the thing it bridged.",
		built: "`BlogIndex` and `BlogArticle` import `Route/Trail` directly and write their crumbs into the grammar through `Blog/Data.ts`'s `TrailOf` - the same one-leading-slash, upper-case rule the bridge used, so the rendered trail is byte-for-byte what it was. The bridge's markup and transform are untouched and it is still marked absorbed, so any caller that has not moved keeps rendering; its note now records that the blog has."
	},
	{
		component: "SPECIMENFAMILIES",
		from: "REST / MANY",
		found: "The sheet had ten family bands and no way to see them. A reader arrived at `/THE SHEET`, read twelve parts, and then met nine family bands in a scroll with no index - so the one surface whose subject is *the design frame* was the one surface you could not survey. The brief asked for a gallery: a nav of families, a matrix per component, the label and the 'when it is right' line. The matrices and the labels were there; the nav was not.",
		built: "`SpecimenFamilies` is the gallery's index: one row per band, its register line, its figure counted from the family's own module, and the two sentences that say what the family argues and what it is read for. It stands above the bands, so a reader can see the frame before reading it - and a family added to the sheet is a row here with no second edit."
	}
];
var Observations$6 = [
	{
		component: "MOTIONFOLD",
		found: "A closed `<details>` prints its summary and not its body, so a printed page loses every fold's content. The same is true of `MotionExpand`'s eight records. `details::details-content` can be forced visible in current browsers, but the rule is not portable and it would print a document with no way to close it.",
		owner: "The owner's reading of what a printed sheet should carry. The two candidate answers are a print rule that opens every disclosure, or a print-only register that lists the leaves - and the second is a second rendering of the same facts, which is the kind of decision this card does not take alone."
	},
	{
		component: "METATAGS",
		found: "`og:locale:alternate` prints `bg` and `de` as literals. The site's locale directory is the source of what it publishes, and the head is the one place that list is typed by hand - so a third locale would be added to `Locale/` and not to the card.",
		owner: "A card on the i18n layer: `Social/Tags.ts` should read the published locale set rather than carry two codes. It is a small change with a wide blast radius - every page's head - so it wants the locale module's own contract first."
	},
	{
		component: "PAGEVIEWTRACKER",
		found: "The tracker sends one pageview per `pushState`, which means an in-page anchor navigation (a doc heading, a legal clause) is not tracked, and a `replaceState` that only rewrites a query parameter is tracked as a new page. Neither is wrong for a route-level instrument, and both are visible in the events.",
		owner: "A card on analytics, with the owner's answer to what a 'page' is for this site. The tracker's contract says route change; a finer instrument would be a different contract, not a fixed bug."
	},
	{
		component: "MOTIONORIGIN",
		found: "With JavaScript off the specimen prints a trigger button that opens nothing. The register column's note says what the slip would have shown, so the state is legible - but the control is a control that does nothing, which is the one thing the block's own docstring argues against.",
		owner: "The owner's call on whether a no-JS page should print a disabled-looking trigger or a static register of the four sides. The second is honest and it is a different composition, so it is not this card's to choose."
	},
	{
		component: "SPECIMENPLATE",
		found: "The plate's spec column is `position: sticky` at the wide container, which is correct on the sheet and wrong the moment a plate is mounted inside a scrolling region - the specimen sheet's own matrix scroll frame is exactly such a region. No page mounts it there today.",
		owner: "A card on the specimen surface, if a plate is ever composed inside a scroll container. The fix is a container query rather than a media query, and it would change the plate's behaviour on the sheet, so it wants a composition that needs it first."
	}
];
/**
* The rows, in reading order: the six motion blocks, the four specimen blocks,
* the head, the three runtime providers, the trail, the two blog surfaces, and
* the adverse compositions.
*
* Every row is a state the site either uses or could use, and the `when` line is
* the one thing a picture of a component cannot carry: the sentence that says
* which composition is right. A row printed here that the site never needs is
* still a row: a component that survives its own worst combination is a
* component whose design frame is real.
*/
var Specimens$9 = [
	{
		mark: "APPARATUS_01",
		state_name: "THE FOLD",
		component: "MOTIONFOLD",
		when: "A run of content the reader may want and the page does not owe them: the summary is a register line with its count, and the leaves are `[index] [label] [meta]`.",
		kind: "motionfold"
	},
	{
		mark: "APPARATUS_02",
		state_name: "A FOLD WITH NO LEAF",
		component: "MOTIONFOLD",
		when: "A set that holds nothing yet: `◎ NO LEAF`, the composed sentence, and the count still printed - the empty arm is required, because a fold onto nothing is indistinguishable from a fold that failed.",
		kind: "motionfold",
		variant: "empty"
	},
	{
		mark: "APPARATUS_03",
		state_name: "A FOLD LOADING",
		component: "MOTIONFOLD",
		when: "The schema has arrived and the values have not: the keys print with their values barred and `WAITING ON:` names the request, so a reader waiting learns what is coming.",
		kind: "motionfold",
		variant: "loading"
	},
	{
		mark: "APPARATUS_04",
		state_name: "A FOLD OF TWO HUNDRED",
		component: "MOTIONFOLD",
		when: "A run longer than its frame: the body caps at 60vh with its own scroll, the summary keeps printing the whole count, and the line under it says how many there are.",
		kind: "motionfold",
		variant: "long"
	},
	{
		mark: "APPARATUS_05",
		state_name: "A LEAF THAT IS GONE",
		component: "MOTIONFOLD",
		when: "A leaf whose target has been removed: the row keeps its place, takes `◎` and muted ink, drops its link, and its meta cell says what it was.",
		kind: "motionfold",
		variant: "gone"
	},
	{
		mark: "APPARATUS_06",
		state_name: "THE RECORD SET",
		component: "MOTIONEXPAND",
		when: "Eight records whose provenance a reader checks one at a time: the row prints one fact and the register opens underneath, without moving the seven around it.",
		kind: "motionexpand"
	},
	{
		mark: "APPARATUS_07",
		state_name: "A RECORD THAT IS GONE",
		component: "MOTIONEXPAND",
		when: "A record whose target has been removed is not a disclosure: `◎`, the name and `WAS:` - because a `<details>` that opens onto nothing is a lie about the state of the world.",
		kind: "motionexpand",
		variant: "gone"
	},
	{
		mark: "APPARATUS_08",
		state_name: "A REGISTER WITH NO FACT",
		component: "MOTIONEXPAND",
		when: "A record whose register is empty: `◎ NO FACT` and the source in the block's own empty grammar, so the disclosure never promises facts it does not carry.",
		kind: "motionexpand",
		variant: "nofact"
	},
	{
		mark: "APPARATUS_09",
		state_name: "A SEQUENCE",
		component: "MOTIONSEQUENCE",
		when: "A state machine whose edges are named motions with measured intervals: one sentence per edge - this state, by this motion, in this time, becomes that state.",
		kind: "motionsequence"
	},
	{
		mark: "APPARATUS_10",
		state_name: "A SEQUENCE AT REDUCED MOTION",
		component: "MOTIONSEQUENCE",
		when: "The same sequence for a reader who asked for less motion: the `reduced` prop prints what the state change does instead of the interval, under the run, in the same register.",
		kind: "motionsequence",
		variant: "reduced"
	},
	{
		mark: "APPARATUS_11",
		state_name: "A SEQUENCE THAT CANNOT BE DRAWN",
		component: "MOTIONSEQUENCE",
		when: "One state, or an edge count that does not match the nodes: the block refuses rather than drawing a broken run, and the sentence says what a sequence is.",
		kind: "motionsequence",
		variant: "one"
	},
	{
		mark: "APPARATUS_12",
		state_name: "AN UNMEASURED INTERVAL",
		component: "MOTIONSEQUENCE",
		when: "An edge nobody has timed: `UNAVAILABLE` at muted ink - never `0 MS`, which would be a measurement.",
		kind: "motionsequence",
		variant: "unmeasured"
	},
	{
		mark: "APPARATUS_13",
		state_name: "THE SKELETON",
		component: "MOTIONSKELETON",
		when: "A record that has not arrived: the keys are its own field names, the bars are barred, and `WAITING ON:` names the request. No spinner, and no pulse.",
		kind: "motionskeleton"
	},
	{
		mark: "APPARATUS_14",
		state_name: "A SKELETON WITH NO KEY",
		component: "MOTIONSKELETON",
		when: "The schema itself has not arrived: the composed sentence prints under the register head and the count reads `UNAVAILABLE` - the arm this card added.",
		kind: "motionskeleton",
		variant: "empty"
	},
	{
		mark: "APPARATUS_15",
		state_name: "THE SPECIMEN",
		component: "MOTIONSPECIMEN",
		when: "One motion stated beside the thing it moves: the register column, the interval as a bar on one shared scale, and the live artifact on the stage.",
		kind: "motionspecimen",
		width: "wide"
	},
	{
		mark: "APPARATUS_16",
		state_name: "THE SPECIMEN AS A PLATE",
		component: "MOTIONSPECIMEN",
		when: "A band whose motion has already been stated above it: omitting `motion` drops the register column and keeps the stage and its note.",
		kind: "motionspecimen",
		variant: "plate",
		width: "wide"
	},
	{
		mark: "APPARATUS_17",
		state_name: "A SPECIMEN AT 16REM",
		component: "MOTIONSPECIMEN",
		when: "The narrow column: the register goes above the stage, the bar keeps its scale and the interval stays beside it.",
		kind: "motionspecimen",
		width: "narrow"
	},
	{
		mark: "APPARATUS_18",
		state_name: "THE ORIGIN",
		component: "MOTIONORIGIN",
		when: "The relation between a trigger and the surface it opens, shown as the thing itself: open it, close it, open it from a different scroll position - the slip leaves by the same 8px every time.",
		kind: "motionorigin"
	},
	{
		mark: "APPARATUS_19",
		state_name: "THE SHEET",
		component: "SPECIMENSHEET",
		when: "The parts of the document as one set: four equal cells across, each a mark, a name, a note, a kind and a disposition - and a printed part links to its plate.",
		kind: "sheet"
	},
	{
		mark: "APPARATUS_20",
		state_name: "A SHEET OF ONE",
		component: "SPECIMENSHEET",
		when: "A document with one part: one cell at the grid's floor, keeping its four lines and its disposition rather than becoming a row.",
		kind: "sheet",
		variant: "one"
	},
	{
		mark: "APPARATUS_21",
		state_name: "A SHEET OF FORTY",
		component: "SPECIMENSHEET",
		when: "A document of forty parts: ten rows of four, the grid holds, and nothing in a cell drops below the meta tier.",
		kind: "sheet",
		variant: "many"
	},
	{
		mark: "APPARATUS_22",
		state_name: "A SHEET WITH NO PART",
		component: "SPECIMENSHEET",
		when: "A sheet that has not been filled: the register prints its counted zero and the composed sentence says what a sheet with no parts is.",
		kind: "sheet",
		variant: "empty"
	},
	{
		mark: "APPARATUS_23",
		state_name: "A PLATE",
		component: "SPECIMENPLATE",
		when: "One part at its own size beside its contract: the spec column pinned at the wide container, the stage holding the part on the surface it will be printed on.",
		kind: "plate"
	},
	{
		mark: "APPARATUS_24",
		state_name: "A PLATE ON THE FIELD",
		component: "SPECIMENPLATE",
		when: "A part that is itself a surface: `stage=\"field\"` puts it on the creme field, because a white card on a white stage is a card inside a card.",
		kind: "plate",
		variant: "field"
	},
	{
		mark: "APPARATUS_25",
		state_name: "THE MATERIAL",
		component: "SPECIMENMATERIAL",
		when: "The six things the document is printed with, shown rather than described: a fill as a swatch of the token itself, an ink as a word set in it, a rule as the rule.",
		kind: "material"
	},
	{
		mark: "APPARATUS_26",
		state_name: "A MATERIAL STRIP WITH NOTHING IN IT",
		component: "SPECIMENMATERIAL",
		when: "A build that lost the token sheet: the sentence prints across the full track count under the same register line, so the absence is the strip rather than a cell in it.",
		kind: "material",
		variant: "empty"
	},
	{
		mark: "APPARATUS_27",
		state_name: "THE GALLERY'S INDEX",
		component: "SPECIMENFAMILIES",
		when: "The sheet's own contents page: one row per family band, its figure counted from the family's module, and the two sentences that say what it argues - the block this card built.",
		kind: "families"
	},
	{
		mark: "APPARATUS_28",
		state_name: "A GALLERY OF ONE",
		component: "SPECIMENFAMILIES",
		when: "A sheet with one family: one row, its register above it, and no prose between - the index does not become a paragraph because the set is small.",
		kind: "families",
		variant: "one",
		width: "narrow"
	},
	{
		mark: "APPARATUS_29",
		state_name: "THE HEAD",
		component: "METATAGS",
		when: "Every route's metadata, printed as the register the head writes: one canonical, one title in the site's one pattern, one description, and one `og:` pair per fact.",
		kind: "head",
		width: "wide"
	},
	{
		mark: "APPARATUS_30",
		state_name: "A CARD WITH NO IMAGE",
		component: "METATAGS",
		when: "A route that has no card image: `image={null}` omits the whole `og:image` family and `twitter:image`, because a card pointing at an image the build does not have is worse than a card with no image.",
		kind: "head",
		variant: "noimage",
		width: "wide"
	},
	{
		mark: "APPARATUS_31",
		state_name: "AN ARTICLE'S HEAD",
		component: "METATAGS",
		when: "A dated piece: `og:type` is `article`, `datePublished` joins the WebSite node, and the author is the piece's own rather than the three organisations.",
		kind: "head",
		variant: "article",
		width: "wide"
	},
	{
		mark: "APPARATUS_32",
		state_name: "A HEAD THAT IS NOT FOR A READER",
		component: "METATAGS",
		when: "A lab route or a page under construction: `noindex, nofollow` on the robots tag, and the page states that it is not for a reader rather than hiding it.",
		kind: "head",
		variant: "noindex",
		width: "wide"
	},
	{
		mark: "APPARATUS_33",
		state_name: "THE ANALYTICS CONTEXT",
		component: "ANALYTICSPROVIDER",
		when: "A live client: three calls, one client, and a context that reports `available: true` so a surface can state its own telemetry status.",
		kind: "analytics"
	},
	{
		mark: "APPARATUS_34",
		state_name: "A BLOCKED CLIENT",
		component: "ANALYTICSPROVIDER",
		when: "An ad-blocker or a dead network: the page is intact, every call is a no-op, and the context says `BLOCKED` instead of letting a consumer mistake silence for delivery.",
		kind: "analytics",
		variant: "blocked"
	},
	{
		mark: "APPARATUS_35",
		state_name: "THE IDENTITY CONTEXT",
		component: "AUTH0PROVIDER",
		when: "A configured tenant: the SPA provider, the redirect back to `/OAuth/Success`, and the organisation parameter the enterprise SSO routes need.",
		kind: "auth0"
	},
	{
		mark: "APPARATUS_36",
		state_name: "A PROVIDER WITH NO CREDENTIALS",
		component: "AUTH0PROVIDER",
		when: "An environment with no domain or client identifier: the children render unwrapped, the credential surface still prints, and the page states that the provider is unconfigured - the arm this card added.",
		kind: "auth0",
		variant: "unconfigured"
	},
	{
		mark: "APPARATUS_37",
		state_name: "THE PAGEVIEW WALKER",
		component: "PAGEVIEWTRACKER",
		when: "One event per route change, installed once by the first tracker and removed by the last - so a second island joins the set instead of patching the router twice.",
		kind: "tracker"
	},
	{
		mark: "APPARATUS_38",
		state_name: "A TRACKER WITH NO CONTEXT",
		component: "PAGEVIEWTRACKER",
		when: "A page with no analytics above it: the tracker is inert, sends nothing, and renders nothing - the absence is a state, not a crash.",
		kind: "tracker",
		variant: "inert"
	},
	{
		mark: "APPARATUS_39",
		state_name: "THE TRAIL",
		component: "TRAIL",
		when: "Where the reader is: an ordered list of locations, each printed as the caller wrote it, the last one being the page they are on.",
		kind: "trail"
	},
	{
		mark: "APPARATUS_40",
		state_name: "A TRAIL OF ONE",
		component: "TRAIL",
		when: "A page with no parent: one crumb, printed as a statement with `aria-current=\"page\"` - not a link to itself.",
		kind: "trail",
		variant: "one",
		width: "narrow"
	},
	{
		mark: "APPARATUS_41",
		state_name: "A TRAIL WITH NO CRUMB",
		component: "TRAIL",
		when: "No crumbs at all: no landmark, no list, nothing announced - a breadcrumb landmark with nothing in it is a landmark a screen reader reads and a reader cannot use.",
		kind: "trail",
		variant: "empty",
		width: "narrow"
	},
	{
		mark: "APPARATUS_42",
		state_name: "A LONG CRUMB",
		component: "TRAIL",
		when: "A label past its column: the crumb wraps inside itself, the leading slash never separates from its label, and the row wraps between crumbs.",
		kind: "trail",
		variant: "long",
		width: "narrow"
	},
	{
		mark: "APPARATUS_43",
		state_name: "THE ARCHIVE",
		component: "BLOGINDEX",
		when: "The blog's index: a centred opening, a full-bleed plate of the archive's extent, then a lead at the full measure and a capacity-ruled row.",
		kind: "blogindex",
		width: "wide"
	},
	{
		mark: "APPARATUS_44",
		state_name: "AN ARCHIVE OF ONE",
		component: "BLOGINDEX",
		when: "One entry: the lead takes the full measure, no row prints under it, and the plate's four measures still count the collection.",
		kind: "blogindex",
		variant: "one",
		width: "wide"
	},
	{
		mark: "APPARATUS_45",
		state_name: "AN ARCHIVE WITH NO ENTRY",
		component: "BLOGINDEX",
		when: "A collection that answered with nothing: the plate prints `STATUS: UNAVAILABLE` instead of four zeroes, and the archive states what it would hold.",
		kind: "blogindex",
		variant: "empty",
		width: "wide"
	},
	{
		mark: "APPARATUS_46",
		state_name: "THE ARTICLE",
		component: "BLOGARTICLE",
		when: "The piece at 8, a 1px divider, and the margin at 4: the summary, the section register, the figures, the notes and the folded aside.",
		kind: "blogarticle",
		width: "wide"
	},
	{
		mark: "APPARATUS_47",
		state_name: "AN ARTICLE WITH NO REGISTER",
		component: "BLOGARTICLE",
		when: "A piece below the heading floor: `toc: null` prints the composed sentence in the margin instead of an empty list, and the summary still stands.",
		kind: "blogarticle",
		variant: "noregister",
		width: "wide"
	},
	{
		mark: "APPARATUS_48",
		state_name: "AN ARTICLE AT 640",
		component: "BLOGARTICLE",
		when: "The narrow composition: the piece takes the full measure and the margin re-composes under it in reading order - nothing hidden, nothing pinned.",
		kind: "blogarticle",
		variant: "narrow",
		width: "narrow"
	},
	{
		mark: "APPARATUS_49",
		state_name: "A DISCLOSURE ON PAPER",
		component: "MOTIONFOLD",
		when: "The one state in this family that cannot be printed: a closed fold prints its register line and not its leaves, so the sheet states the limitation rather than forcing the body open on paper - a document the reader cannot close is not a better document.",
		kind: "absent",
		variant: "print"
	},
	{
		mark: "APPARATUS_50",
		state_name: "A MOTION WITH NO TRIGGER",
		component: "MOTIONSEQUENCE",
		when: "The brief's own question, answered as a statement: the family has no such motion, because the register law is 'name the state change, or do not write the rule' - and the three classes that are a trigger by definition are printed here as reasons.",
		kind: "absent",
		variant: "notrigger"
	}
];
/** The row's group: the family's reading order, derived from the rows above. */
var GroupOf$5 = (Row) => {
	const Mark = Number(Row.mark.replace("APPARATUS_", ""));
	if (Mark <= 18) return "motion";
	if (Mark <= 28) return "surface";
	if (Mark <= 32) return "head";
	if (Mark <= 38) return "runtime";
	if (Mark <= 42) return "route";
	if (Mark <= 48) return "blog";
	return "adverse";
};
/** The rows of one group, in the order they are printed. */
var InGroup$9 = (Group) => Specimens$9.filter((Row) => GroupOf$5(Row) === Group);
/** The groups, with the sentence that opens each one. */
var Groups$9 = [
	{
		key: "motion",
		label: "/THE MOTION",
		note: "The six blocks that answer what moves and why: a fold with leaves and a fold with none, a fold loading and a fold of two hundred, a record set and a record that is gone, a sequence and the same sequence at reduced motion, a skeleton and a skeleton with no key, a specimen as a register and as a plate, and the one class whose subject is the trigger itself."
	},
	{
		key: "surface",
		label: "/THE SURFACE",
		note: "The instrument that shows every other family: the sheet at one part, at forty and at none, a plate on the insert and on the field, the material strip and its empty arm, and the gallery's index - the block this card built."
	},
	{
		key: "head",
		label: "/THE HEAD",
		note: "The one part of the site read outside it. The head cannot be mounted in a body, so the rows print the register it writes: every route's card, a card with no image, an article's dated card, and the head of a page that is not for a reader."
	},
	{
		key: "runtime",
		label: "/THE RUNTIME",
		note: "The layer with no markup: analytics with a client and with a blocked one, identity configured and unconfigured, and the pageview walker with a context and without one. Every row states a fact the surface around it can now print."
	},
	{
		key: "route",
		label: "/THE ROUTE",
		note: "The site's one breadcrumb grammar at four widths: five crumbs, one crumb, no crumb at all, and a label longer than its column."
	},
	{
		key: "blog",
		label: "/THE BLOG",
		note: "The one dated set on the site and the surface it is read on: the archive at rest, at one entry and at none, the article at 8/1px/4, an article below the heading floor, and the same article at 640."
	},
	{
		key: "adverse",
		label: "/THE ADVERSE",
		note: "The two states this family cannot render and must state: a disclosure's leaves on paper - the fold prints its summary and not its body - and the motion the register forbids, a rule that fires without a state change."
	}
];
/** How many rows the family prints. */
var SpecimenCount$8 = Specimens$9.length;
// Source/Content/Specimen/Composition.ts
/**
* The twenty-four columns, in reading order.
*
* Nine conditions first, because they are the states a reader meets; then six
* shapes, because they are what a composition is asked to hold; then seven
* compositions, because five of them are the ones this family's brief named by
* hand and the other two - a band with one card, a record with no action - are
* the ones a composition must survive without; then two contexts, because they
* are the ones a designer forgets - the band the block is composed inside and
* the medium it is printed on.
*/
var Columns$8 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a read failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight arm",
		group: "condition"
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY",
		ask: "twelve or ninety",
		group: "shape"
	},
	{
		key: "long",
		label: "LONG",
		ask: "a line past its column",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "shape"
	},
	{
		key: "noplate",
		label: "NO PLATE",
		ask: "a hero with no evidence",
		group: "composition"
	},
	{
		key: "three",
		label: "THREE",
		ask: "a proof band of three",
		group: "composition"
	},
	{
		key: "nine",
		label: "NINE",
		ask: "nine tiles, narrow",
		group: "composition"
	},
	{
		key: "xs",
		label: "AT 16",
		ask: "a mark at 16px",
		group: "composition"
	},
	{
		key: "xl",
		label: "AT 240",
		ask: "a mark at 240px",
		group: "composition"
	},
	{
		key: "lone",
		label: "LONE",
		ask: "a band with one card",
		group: "composition"
	},
	{
		key: "noaction",
		label: "NO ACTION",
		ask: "without its action",
		group: "composition"
	},
	{
		key: "inband",
		label: "IN A BAND",
		ask: "inside a chapter",
		group: "context"
	},
	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var B = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var X = (reason) => ({
	disposition: "na",
	reason
});
/**
* A server-rendered block of markup: it ships no JavaScript, holds no input, and
* prints what it was given.
*
* The five reasons a base writes are the five states a printed block cannot have,
* and each says WHY rather than "not applicable": a build-time block has no
* loading state because its content was resolved before the page existed; a
* block with no read has no error state because there was nothing to fail.
*/
var Printed = (what, why) => ({
	loading: X(`A ${what} is printed at build time - ${why} - so there is no state in which the block exists and its content has not arrived.`),
	error: X(`A ${what} reads nothing at render time: there is no read to fail, and a failed route is stated by the shell that owns it (\`ShellState\`), not by a block that was never asked for data.`),
	stale: X(`A ${what} carries no as-of of its own: an age belongs to the fact it prints, and a block that invented one would be the one figure on the page with no source.`),
	disabled: X(`A ${what} is not a control: it ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`),
	readonly: X(`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`)
});
/**
* A printed block that is ONE object rather than a set: it cannot be asked for a
* set of one or a set of ninety, because it is not a set at all.
*/
var Leaf = (what, set) => ({
	...Printed(what, "it renders the props it is handed and nothing is resolved at render time"),
	one: X(`A ${what} is one object by definition; a set of one is ${set}, and a block that answered both would be two blocks with one name.`),
	many: X(`A ${what} is one object by definition; a set of ninety is ${set}, and the composition that holds many is the band, not the part.`)
});
/**
* A mark: a seal, a crosshair, an arrow, a glyph. It has no text state, no empty
* state and no set - it is one drawn form - so almost every condition is a
* reason, and the three that are not are the three a mark is actually asked.
*/
var Mark = (what) => ({
	...Leaf(what, "the strip or the row that repeats it"),
	empty: X(`A ${what} is a drawn form: it has no content to be empty of, and the grammar's fallback for a thing that is not here is the seal's own \`◎\` field, not an empty mark.`),
	partial: X(`A ${what} has no facts to be partial about: it is one form in one ink, and a half-drawn mark is a mark that failed to load, which is the \`absent\` arm of the plate that would hold it.`),
	dense: X(`A ${what} has no density: it is drawn at a ladder step, and the tight arm of a mark is a smaller step, which is the \`AT 16\` column rather than a second layout.`),
	long: X(`A ${what} carries no text, so there is no line to run past a column - the longest thing it can hold is its own device.`),
	incard: X(`A ${what} is not composed inside a white insert: a mark on a card is the card's, printed at the card's own step, and a mark that re-composed itself for the surface would be a second mark.`),
	noplate: X(`A ${what} is not a composition: it has no evidence panel to be missing, so the column asks a question this row cannot answer.`),
	three: X(`A ${what} is not a set: three of them is the row or the strip that repeats it, and the count belongs there.`),
	nine: X(`A ${what} is not a tile: nine tiles is the strip's composition, and a mark inside a tile is printed at \`xs\`, which is the \`AT 16\` column.`),
	lone: X(`A ${what} is not a card: a band with one card is the band's composition, and a mark in it is the same mark.`),
	noaction: X(`A ${what} is not a control and never carries an action, so there is none to remove.`),
	inband: B("a mark is printed inside whatever holds it; the band adds no rule of its own")
});
/**
* A hydrated island: it has a loading state, an error state and a set, because
* its content arrives at run time rather than at build time.
*/
var Island = (what, why) => ({
	stale: X(`A ${what} carries no as-of: ${why}, and an age it invented would be the one figure on the page with no source.`),
	dense: X(`A ${what} has no tight arm of its own: its density is the page's spacing ladder, and a component with a private density scale is a second system.`),
	incard: X(`A ${what} is a surface rather than a record: it is composed on the field, and a card inside a card is the one composition the identity forbids.`)
});
/**
* A form control: an input, a checkbox, a button, a form. Every control state is
* real, and the shapes are the ones it cannot be.
*/
var Control = (what) => ({
	empty: B("the control renders with an empty value, its label above it and its placeholder in it"),
	loading: B("the control is disabled and its label states the work in progress; there is no spinner inside a field"),
	partial: B("a field whose value the caller could not resolve prints `UNAVAILABLE` as its value, not a blank"),
	error: B("`Error` prints under the field, in the vocabulary, with the control's own `aria-invalid` and `aria-describedby`"),
	stale: X(`A ${what} is a control, not a fact: an age belongs to the value a reader is looking at, and a control that printed one would be printing a record inside a field.`),
	dense: B("the dense arm tightens the row's air and keeps the field's height"),
	one: X(`A ${what} is one control: a set of one is a form, and the form is the block that holds it.`),
	many: X(`A ${what} is one control: a set of ninety is a form or a register, and a control repeated ninety times with no form around it is not a composition.`),
	long: B("the value scrolls inside the field and the label wraps above it; neither widens the column"),
	narrow: B("the field takes its column's width and its label wraps; the control has no minimum of its own"),
	wide: B("the field takes its band's width up to its own measure, so a wide band does not make a 1200px input"),
	noplate: X(`A ${what} is not a composition: it has no evidence panel and no pair, so the column asks a question this row cannot answer.`),
	three: X(`A ${what} is not a set: three controls are a form's rows, and the count belongs to the form.`),
	nine: X(`A ${what} is not a tile: nine tiles is the strip's composition, not a control's.`),
	lone: X(`A ${what} is not a card: a band with one card is the band's composition.`),
	inband: B("the control sits in its form, the form in the band; neither re-draws the other")
});
/**
* The fifty-eight components, in the order a page meets them: the twelve
* homepage parts, the eleven brand parts, and the thirty-five `Dynamic/*`
* adapters in the order their surfaces appear.
*
* Every row's overrides are reasons or notes. A row with no overrides would be a
* part that survives every combination, and no part does.
*/
var Rows$8 = [
	{
		name: "BAND",
		file: "COMPONENT/HOME/BAND.ASTRO",
		note: "One page band's shell: the record head (`# SERIES_INDEX` / kicker / heading / standfirst / stamp) and the body below it.",
		cells: {
			...Printed("band shell", "the head and the body are server-rendered and the band holds no island of its own"),
			empty: B("a band handed no body prints its head and an empty body - which is a head with nothing under it, and the reason every band in this family supplies a body"),
			partial: B("a band with a heading and no standfirst prints the head without the sentence; the stamp slot is independent of both"),
			dense: B("the interval ladder's `beat` is the tight rung, and `rest`/`break`/`turn` are the three that open"),
			one: B("a band is one chapter; its body is what holds a set"),
			many: B("a band's body scrolls the page, not itself: ninety rows make a longer band, which is the correct answer for a chapter"),
			long: B("the heading is set at the L tier with `text-wrap: balance`; a long kicker wraps under its marker rather than widening it"),
			narrow: B("below `md` the 5/7 head collapses to one column, the claim above its qualifier"),
			wide: B("the body takes the page's measure; the head's marker rules to the right margin at every width"),
			incard: X("A band is never a card: the identity's card rule is one artifact one card, and a band is the space between artifacts. A band inside a card would print a chapter inside a record."),
			noplate: X("A band has no evidence panel: the pair belongs to the hero, and the band is the chapter after it."),
			three: B("the body is a slot; three records is the slot's composition, which is `FEATUREBAND`'s cell"),
			nine: B("the body is a slot; nine tiles is the slot's composition, which is the stack's cell"),
			xs: X("A band prints no mark at a step: the seal is the card's, and the band's own marker is type."),
			xl: X("A band prints no seal at all: the 240px arm belongs to the sheet's own study of the mark."),
			lone: B("a band with one card is a band whose body holds one artifact - the composition the roadmap prints with one release state"),
			noaction: B("a band carries no action of its own; its cards do"),
			inband: X("A band IS the band: a band inside a band is a chapter inside a chapter, and the interval ladder has no rung for it."),
			print: B("the band's head prints; its interval becomes a page break (`Print/_Index.scss`)")
		}
	},
	{
		name: "ARROW",
		file: "COMPONENT/HOME/ARROW.ASTRO",
		note: "The external-link mark that follows a record's own name: `aria-hidden`, because the link's accessible name already says where it goes.",
		cells: {
			...Mark("link mark"),
			rest: B("drawn at the link's own ink, `currentColor`, so it takes the ink of the name it follows"),
			xs: B("the arrow is set at the text's own size and inherits it; at a chip's 16px step it is a glyph in a sentence, which is what it is"),
			xl: X("A link mark is never the largest object on a surface: it is a suffix to a name, and a 240px arrow would be a signpost."),
			print: B("the arrow prints; the underline the global rule draws beside it is the medium's own")
		}
	},
	{
		name: "RECORDANATOMY",
		file: "COMPONENT/HOME/RECORDANATOMY.ASTRO",
		note: "The middle of every homepage record: the two containment stamps, the route over its service line, the status and the four-row ledger, with two slots for the two families' differences.",
		cells: {
			...Printed("record middle", "every field it prints is resolved from the card's own data at build time"),
			empty: B("a card with no stamps prints no stamp block at all - the block is conditional, so an empty set is an absent block rather than an empty box"),
			partial: B("a card with no route prints the service line without it; a card with no status prints the ledger alone"),
			dense: B("the card's density is the band's: the six-record matrix is the tight arm and the element wall is the loose one"),
			one: X("A record middle is one record's middle: it is not a set, and the set is the band that repeats it."),
			many: X("A record middle is one record's middle: ninety of them is the wall, which is `ARCHITECTUREBAND`'s cell."),
			long: B("a long value wraps under its key in the ledger; the key column is a `ch` measure, not a guess"),
			narrow: B("in a narrow column the ledger's two columns collapse to key-over-value, which is the block's own responsive arm"),
			wide: B("a wide band gives the ledger one line per fact; the block has no measure of its own"),
			incard: B("the middle is printed inside the card its host owns, which is the only surface a record middle has"),
			noplate: X("A record middle has no evidence panel: the plate is the pair's other half, not the card's."),
			three: X("A record middle is one record: three of them is the band's count, not this block's."),
			nine: X("A record middle is one record: nine tiles is the stack's composition."),
			xs: B("the card's seal is printed at `s`; the middle prints no mark of its own beyond the stamps' brackets"),
			xl: X("A record middle prints no seal: the seal is the card's head, and the 240px arm is the sheet's study."),
			lone: B("a lone card is a card with one record middle in it - the composition the 404 and the portal print"),
			noaction: B("the middle prints no action: the action is the host card's, and a record with no action is the card without its slot filled"),
			inband: B("the middle is always inside a card inside a band; it names neither")
		}
	},
	{
		name: "FEATUREBAND",
		file: "COMPONENT/HOME/FEATUREBAND.ASTRO",
		note: "`# OBSERVATION_01`: the element records that carry the claim, as one seam matrix, with the specimen observation filed under it.",
		cells: {
			...Printed("proof band", "the six records, their tints and their ledgers are all resolved at build time"),
			empty: B("`cards` of none prints `RECORDS: UNAVAILABLE` and one sentence where the matrix would be - added with this family, because an empty grid is a layout that failed quietly"),
			partial: B("a record whose own fact is unknown prints `UNAVAILABLE` in its ledger row and keeps the cell"),
			dense: B("the matrix's seam IS the tight arm: six cells at 1px, two across from 801px"),
			one: B("a set of one prints one cell across the full seam - the ceiling is one, so a one-track row is the row's whole width"),
			many: B("a set of twelve prints six rows of two; the band has no cap, the seam holds at any count, and the ceiling stays three"),
			long: B("a card's title wraps inside its cell; the cell's width is the row's, and the card's minimum is the 23rem one record needs"),
			narrow: B("below 801px the cells stack, take a real gap and their border back - a single column of tinted cells 1px apart is one tinted block, not a matrix"),
			wide: B("the matrix takes the band's measure - 67rem inside the 72rem inner - so it is exactly as wide as the head above it, and a wider band would widen both"),
			incard: X("A band is never a card: the matrix is the artifact and each cell is one of its records, so a card around the matrix would be a card around six cards."),
			noplate: X("A proof band has no evidence panel: its evidence is the six records themselves."),
			three: B("`cards` of three prints 2 + 1 with the lone record across the whole seam, and the subset's figure `# RECORDS / 03` under the grid - the short last row is answered by the row's own growth, not by a span rule"),
			nine: X("A proof band files records, not tiles: nine tiles is the stack's composition."),
			xs: B("a cell's seal is printed at `s`, which is the card-head step; the 16px arm is a chip's"),
			xl: X("A proof band prints no 240px seal: the plate's largest object is the matrix itself."),
			lone: B("a set of one is a band with one card - the arm the roadmap prints when a project has one release state"),
			noaction: B("the band's cards carry their own links; the band itself has no action to remove"),
			inband: B("the band IS a chapter: it wears `Band` and the page's interval ladder"),
			print: B("the seam prints as a 1px rule; the tints are dropped to paper ink by the print layer")
		}
	},
	{
		name: "FEATURECARD",
		file: "COMPONENT/HOME/FEATURECARD.ASTRO",
		note: "One record of the proof matrix: its marker, its engraved seal, its stamps, its route, its name as the link out, its status and its four-row ledger, on the element's own tint.",
		cells: {
			...Leaf("record card", "the matrix that holds it (`FEATUREBAND`)"),
			empty: B("a card whose record carries no stamps prints the anatomy without them; the card is never an empty box"),
			partial: B("a card with an unknown fact prints `UNAVAILABLE` in that row and keeps the row"),
			dense: B("the card takes the matrix's seam, which is the tight arm; there is no second density inside a cell"),
			long: B("the name wraps and the seal stays in its marker row; the link's arrow is a suffix and never breaks to its own line"),
			narrow: B("in a narrow column the card is one column wide and its ledger collapses to key-over-value"),
			wide: B("a wide cell does not stretch the card's type: the measure is the card's, and the fill takes the width"),
			incard: B("the card IS a Jelly surface; its content is a record inside it, which is the one composition the identity allows"),
			noplate: X("A card has no evidence panel: the plate is the hero's other half."),
			three: B("three of them is the proof band's cell, and the card's own layout is unchanged by the count"),
			nine: X("Nine tiles is the stack's composition; a record card is not a tile."),
			xs: B("the card's seal is `s` (32px); a card at a chip's step is the ledger's `xs` arm, not this card's"),
			xl: X("A card prints no 240px seal: at that size the seal is the artifact, and a card is already one."),
			lone: B("a lone card prints exactly as a cell of six: the card has no knowledge of its siblings"),
			noaction: B("the card's only action is its name's link; without it the name prints as plain text and the card still reads"),
			inband: B("the card is composed by the band; it names no band of its own"),
			print: B("the tint drops to paper, the seal prints, the link resolves to its target")
		}
	},
	{
		name: "ELEMENTCARD",
		file: "COMPONENT/HOME/ELEMENTCARD.ASTRO",
		note: "One of the fifteen element records in the wall: the feature card plus its name row, its role chips, its body and its working register.",
		cells: {
			...Leaf("element card", "the wall that holds it (`ARCHITECTUREBAND`)"),
			empty: B("a card with no chips prints no chip row and a card with no register prints `NO WORKING IS RECORDED` - the two conditional blocks the card already carries"),
			partial: B("a register row whose value is unknown prints `UNAVAILABLE` with its `quiet` tone"),
			dense: B("`data-depth` carries the card's two arms: `plate` prints the trace under the register, `record` does not - the wall is a page with four annotated entries rather than fifteen equal cards"),
			long: B("a long element name wraps under its glyph; the source arrow is `aria-label`ed and stays in the row"),
			narrow: B("below `lg` the twelve-column masonry collapses to two columns and the spans are ignored, which is the wall's own responsive arm"),
			wide: B("a wide band gives the masonry its twelve columns and each card takes its `--masonry-col` span"),
			incard: B("the card IS a Jelly surface"),
			noplate: X("A card has no evidence panel."),
			three: B("three of them is a wall of three, and the masonry's spans make it a ragged row rather than a grid"),
			nine: B("nine tiles in a narrow card is the STACK's composition, not this card's; nine element cards is a wall of nine, which the masonry already prints"),
			xs: B("the card's seal is `s`, and the one element whose record carries no device prints the neutral roundel at the same step"),
			xl: X("A card prints no 240px seal."),
			lone: B("a wall of one prints one card at its own span, and the ragged edge is the same edge"),
			noaction: B("the name's link and the source arrow are the card's actions; without a source the name prints as text and the arrow is absent"),
			inband: B("the wall is the band's body"),
			print: B("the tint drops to paper; the trace prints as a numbered list")
		}
	},
	{
		name: "ARCHITECTUREBAND",
		file: "COMPONENT/HOME/ARCHITECTUREBAND.ASTRO",
		note: "`# CLASSIFICATION_01`: all fifteen element records as one ragged wall - twelve columns from `lg`, two below it, one below `md`.",
		cells: {
			...Printed("element wall", "the fifteen records and their spans are resolved at build time"),
			empty: B("an empty set prints the band's head and no wall; the wall has no empty arm of its own because the fifteen are the content module's own array"),
			partial: B("a card with an unknown fact keeps its cell and prints `UNAVAILABLE` in it"),
			dense: B("the wall IS the tight arm of the page: fifteen cells with the seam between them"),
			one: B("a wall of one prints one card; the masonry's spans make the ragged edge a single edge"),
			many: B("the fifteen are the set; a sixteenth joins the wall without a layout change"),
			long: B("the spans are values (`--masonry-col`), so a long name changes the card's height, not the wall's columns"),
			narrow: B("below `lg` the wall is two columns and the spans are ignored"),
			wide: B("twelve columns at `lg` and up; the ragged edge is the point of the artifact"),
			incard: X("A band is never a card."),
			noplate: X("The wall has no evidence panel."),
			three: B("three cards make a ragged row of three - the wall does not require fifteen"),
			nine: X("Nine tiles is the stack's composition; the wall is cards, not tiles."),
			xs: B("each card prints its seal at `s`"),
			xl: X("The wall prints no 240px seal."),
			lone: B("a wall of one is a band with one card"),
			noaction: B("the wall's cards carry their own links"),
			inband: B("the wall IS a chapter"),
			print: B("the wall prints as a column of cards; the masonry collapses to one column on paper")
		}
	},
	{
		name: "ROADMAPBAND",
		file: "COMPONENT/HOME/ROADMAPBAND.ASTRO",
		note: "`# CONDITIONS_01`: the release states as ONE plate divided by the hero's hairline gutter, not two cards side by side.",
		cells: {
			...Printed("release manifest", "the two states and their facts are resolved at build time"),
			empty: B("no release state prints the plate's head and an empty plate - the band has no empty arm because the content module always carries two states"),
			partial: B("a state with an unknown fact prints `UNAVAILABLE` in its row"),
			dense: B("the plate's two columns are the tight arm: one plate, two states, one hairline"),
			one: B("a plate of one prints one state across the whole measure; the gutter is drawn only between states (`Index > 0`)"),
			many: B("a third state joins the plate as a third column; the gutter is drawn between each pair"),
			long: B("a long element name wraps inside its list row; the badge keeps its `nowrap` and the row wraps"),
			narrow: B("below `md` the plate's columns stack and the gutter becomes a horizontal rule"),
			wide: B("the plate caps at its own measure and centres"),
			incard: X("A band is never a card: the plate IS the card, and a card around it would be two."),
			noplate: X("The release manifest has no evidence panel."),
			three: B("three release states print three columns; the manifest is the artifact that holds a set of states"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the element badges inside the release rows are the chip-scale arm, and their seal-less names are the grammar's `jelly-badge`"),
			xl: X("The manifest prints no 240px seal."),
			lone: B("a manifest of one state is the arm the roadmap prints on a project with one release - and it is why the plate's gutter is conditional"),
			noaction: B("`# RELEASE_02` carries its destination as a route line rather than a button, which is the no-action arm already in the band"),
			inband: B("the manifest IS a chapter"),
			print: B("the two columns print side by side on paper; the gutter prints as a rule")
		}
	},
	{
		name: "RELEASECARD",
		file: "COMPONENT/HOME/RELEASECARD.ASTRO",
		note: "One release state, as a column of the manifest plate: a stamped head, one action, its name, its elements and its six manifest rows.",
		cells: {
			...Leaf("release state", "the manifest that holds it (`ROADMAPBAND`)"),
			empty: B("a state with no elements prints its `Elements` label and no list; a state with no manifest rows prints no list - both blocks are conditional"),
			partial: B("an element whose replacement is unknown prints its `Before` line with no badge and no `After`"),
			dense: B("the state's own density is the plate's: two columns, one hairline, no inner cards"),
			long: B("the state's name wraps at the L tier; the stamp lines wrap under their marker"),
			narrow: B("in a narrow column the state's two lists read one under the other and the action takes the full width"),
			wide: B("a wide column does not widen the state's type; the lists take the column's measure"),
			incard: X("A release state is a COLUMN of the manifest plate, not a card of its own: the band owns the white surface, and a card inside it would be the one composition the identity forbids."),
			noplate: X("A release state has no evidence panel."),
			three: B("three states are three columns of the plate"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the element names inside a state are `jelly-badge`s at the chip scale, which is the family's 16px arm"),
			xl: X("A release state prints no 240px seal."),
			lone: B("a lone state takes the whole plate and its action stays one action"),
			noaction: B("`# RELEASE_02` is the no-action arm already in the band: a route line at the accent instead of a filled button, which is the `emphasis-expressive` budget's one action per artifact"),
			inband: B("the state is inside the band's plate"),
			print: B("the state prints; its badges print as bracketed words")
		}
	},
	{
		name: "PLATFORMBAND",
		file: "COMPONENT/HOME/PLATFORMBAND.ASTRO",
		note: "`# ACTION_01`: the platform artefacts as one white manifest - one row per platform, a hairline between rows, one action per row.",
		cells: {
			...Printed("download manifest", "the three rows and their facts are resolved at build time"),
			empty: B("`cards` of none prints `ARTIFACTS: UNAVAILABLE` and the sentence that says builds are from source - added with this family, because an empty plate on a white surface reads as lost data rather than as nothing to ship"),
			partial: B("a row whose checksum is unknown prints `UNAVAILABLE` and its `NOTE:` row says why - the three absent rows the band already carries"),
			dense: B("the row is two lines, not eight columns: the identity on the first, the facts across the second"),
			one: B("one artefact prints one row and no divider (`+ .home-platform` draws the rule only between rows)"),
			many: B("a fourth platform joins the plate as a fourth row; the divider repeats"),
			long: B("a long platform name wraps in its identity column; the facts wrap across the second line"),
			narrow: B("below `md` the row is one column: identity, then facts, then status and action"),
			wide: B("the plate caps at 72rem and centres"),
			incard: X("A band is never a card: the plate IS the card."),
			noplate: X("The download manifest has no evidence panel."),
			three: B("three artefacts are the plate's own count, and the rows are comparable at a glance because the identity takes its own column from `md`"),
			nine: X("Nine tiles is the stack's composition; the manifest's unit is a row, not a tile."),
			xs: B("the row's platform glyph is printed at the glyph step (18px), which is the ladder's `5`"),
			xl: X("The manifest prints no 240px seal."),
			lone: B("a manifest of one is a plate of one row - the arm the family's brief named, and the shape every first release has"),
			noaction: B("a row whose artefact is not published prints its status without a button, and the row still reads as a fact"),
			inband: B("the manifest IS a chapter"),
			print: B("the rows print; the actions resolve to their targets")
		}
	},
	{
		name: "PLATFORMCARD",
		file: "COMPONENT/HOME/PLATFORMCARD.ASTRO",
		note: "One artefact row of the download manifest: its marker, its name in the platform's own ink, its architecture, seven facts, a note, a status and one action.",
		cells: {
			...Leaf("artefact row", "the manifest that holds it (`PLATFORMBAND`)"),
			empty: B("a row with no note prints no note; the seven facts are the content module's own and a row is never drawn with fewer"),
			partial: B("an unknown fact prints `UNAVAILABLE` and the row's `NOTE:` says why"),
			dense: B("the row's density is the plate's: seven facts on one wrapping line"),
			long: B("a long checksum wraps under its key; the ledger's keys are `nowrap` and its values wrap"),
			narrow: B("below `md` the row is one column and the facts wrap into as many lines as they need"),
			wide: B("a wide row gives the facts one line; the identity column is 23rem and does not grow"),
			incard: X("An artefact row is a row of the manifest plate; a card around it would be a card inside a card."),
			noplate: X("An artefact row has no evidence panel."),
			three: B("three rows are the plate's count"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the row's glyph is 18px, the ladder's glyph step"),
			xl: X("An artefact row prints no seal."),
			lone: B("a lone row is a plate of one"),
			noaction: B("the action is a Jelly button inside its own anchor; without an href the row prints its status alone and still reads"),
			inband: B("the row is inside the plate inside the band"),
			print: B("the row prints; the action resolves to its target")
		}
	},
	{
		name: "WORKINGBAND",
		file: "COMPONENT/HOME/WORKINGBAND.ASTRO",
		note: "`# METHOD_01`: the build's six-stage trace at 7 beside the release register at 5, with the three documented failures ruled under both.",
		cells: {
			...Printed("method band", "the trace, the register and the three failures are content-module arrays resolved at build time"),
			empty: B("an empty register prints `THE RELEASE RECORD IS NOT WRITTEN YET` - the ledger's own empty arm, which the band already wires"),
			partial: B("a register row whose value is unknown prints `UNAVAILABLE` and keeps its row"),
			dense: B("the band's two densities ARE the composition: a spacious trace at 7 and a tight register at 5, which is the page's first split read at two densities on purpose"),
			one: B("a trace of one step prints one line and the register takes the rest of the measure"),
			many: B("a trace of twelve steps grows the band; the register beside it does not stretch"),
			long: B("a step's note wraps under its path; the trace's two columns are `ch` measures"),
			narrow: B("below `lg` the 7/5 split stacks and the failures become one column"),
			wide: B("the band's measure is the page's; the split keeps its 7/5 ratio"),
			incard: X("A band is never a card."),
			noplate: X("The method band has no evidence panel."),
			three: B("three failures are the band's own count, ruled across the whole measure under both columns"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the trace's station marks are the ladder's tick steps"),
			xl: X("The method band prints no 240px seal."),
			lone: B("one failure prints one failure; the strip is a wrapping row and does not require three"),
			noaction: B("the band has no action: its trace's `MANUAL` row is a route, and the band is read rather than used"),
			inband: B("the band IS a chapter"),
			print: B("the trace and the register print side by side; the failures print as a list")
		}
	},
	{
		name: "FIELDRECORD",
		file: "COMPONENT/BRAND/FIELDRECORD.ASTRO",
		note: "The canonical single-card record template: index, seal, stamps, route, program, the blank interval, the title, the status, the metadata and one action.",
		cells: {
			...Leaf("record template", "the grid or band that repeats it"),
			empty: B("a record with no stamp, no route, no program, no relation, no metadata and no action prints its index, its seal, its title and its status - every block is conditional, so an empty record is a short record, not a broken one"),
			partial: B("a record whose status is `unavailable` prints the vocabulary's word and the tone's quiet ink"),
			dense: B("the card's inset is two custom properties; a host that needs a tighter card sets them, and the record's anatomy does not change"),
			long: B("the title is the L tier and wraps; the blank interval above it absorbs the difference, which is what the interval is for"),
			narrow: B("in a narrow column the card is one column and the metadata reads key-over-value"),
			wide: B("a wide host gives the card more inset, not a wider measure; the record's type is the card's"),
			incard: B("the template IS a card: `FieldRecordDataCard` is its frame, and the record is the content inside it"),
			noplate: X("A single record card has no evidence panel: the pair is the hero's composition, and this template is the card alone."),
			three: B("three of them is a row of three cards; the template has no knowledge of its siblings"),
			nine: X("Nine tiles is the stack's composition; a record card is not a tile."),
			xs: B("the card's seal is the template's own step (`l` by default, `s` at a card head)"),
			xl: B("the seal can be printed at 240px by a host that wants the mark as the artifact - which is the sheet's study, and the reason the ladder gained the step"),
			lone: B("a lone record card is the 404's and the portal's composition"),
			noaction: B("`record.Action` is optional: a record with no action prints no action block and the card closes on its metadata"),
			inband: B("the template is composed by whatever holds it"),
			print: B("the card prints as a white insert with its corner marks")
		}
	},
	{
		name: "FIELDRECORDDATACARD",
		file: "COMPONENT/BRAND/FIELDRECORDDATACARD.ASTRO",
		note: "The frame every field record is printed in: a white card, picture-frame corner marks, and one padded body that takes a slot.",
		cells: {
			...Printed("card frame", "it renders a slot and two custom properties, and resolves nothing"),
			empty: B("an empty slot prints an empty frame - a white card with its corner marks and nothing in it, which is the frame doing exactly what a frame does"),
			partial: X("A card frame prints no facts, so there is no fact for it to be partial about: the slot's content is the host's, and a frame that stated an absence would be stating something it does not know."),
			dense: B("`--card-padding-block` and `--card-padding-inline` are the frame's two published numbers; a tighter host sets them and the frame does not change"),
			one: X("A card frame is one frame: a set of one is the host's row, not the frame's."),
			many: X("A card frame is one frame: ninety of them is a grid, which is the host's composition."),
			long: B("the body grows; the corner marks are anchored to the frame's corners and stay at the top as it grows"),
			narrow: B("the frame takes its column's width and its padding is unchanged"),
			wide: B("the frame takes its host's width; it has no maximum of its own"),
			incard: X("A card frame inside a card is the one composition the identity forbids."),
			noplate: X("A card frame has no evidence panel."),
			three: X("A card frame is one frame: three of them is the row that holds them."),
			nine: X("Nine tiles is the stack's composition."),
			xs: X("A card frame prints no mark: the corner marks are the frame's, and they are not the seal's ladder."),
			xl: X("A card frame prints no seal."),
			lone: B("a lone frame is a card of one"),
			noaction: B("the frame has no action: the record inside it owns one"),
			inband: B("the frame is composed by its host")
		}
	},
	{
		name: "FIELDRECORDINDEX",
		file: "COMPONENT/BRAND/FIELDRECORDINDEX.ASTRO",
		note: "The record's own marker, printed as `# MARKER` at field weight: mono, uppercase, wide-tracked.",
		cells: {
			...Mark("record marker"),
			rest: B("printed as `# LAND_01` - the `#` is the marker's own mark and the caller passes the index already stripped of it"),
			empty: B("an empty index prints the bare `#` and a space, which is the grammar's mark with no figure - the honest form of a record that has no index"),
			xs: B("the marker is set at the `s` type step; at a chip's scale it is the same string in the same register"),
			xl: X("A record marker is never the largest object on a surface: it is a label about the record, not the record."),
			print: B("the marker prints")
		}
	},
	{
		name: "FIELDRECORDMETADATA",
		file: "COMPONENT/BRAND/FIELDRECORDMETADATA.ASTRO",
		note: "The key/value run under a record's title block: `TARGET: Linux`, `LICENSE: CC0`, `SIGNAL: ABSENT`, as a description list.",
		cells: {
			...Printed("metadata run", "the pairs are the record's own and are resolved before the page exists"),
			empty: B("no rows prints an empty `<dl>` - the block renders nothing visible rather than saying there is nothing, which is its one defect and is recorded in `Observations`; the behaviour is kept because two hosts depend on the signature"),
			partial: B("an unknown value prints `UNAVAILABLE` in the value column; the key stays"),
			dense: B("the rows are `space-y-1`; the block has no tighter arm because a metadata run is already the tightest thing in a card"),
			one: B("one pair prints one row - a metadata run of one is a single fact, which is what `TARGET:` alone is"),
			many: B("twelve pairs print twelve rows; the block has no cap and the card's blank interval absorbs the growth"),
			long: B("a long value wraps under its value column; the key column is fixed and `nowrap`"),
			narrow: B("in a narrow column the value wraps in place; the key does not move"),
			wide: B("a wide column gives the value more room; the row stays one line while it fits"),
			incard: B("the run is printed inside the card its host owns"),
			noplate: X("A metadata run has no evidence panel."),
			three: X("A metadata run is one record's facts: three of them is three records."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the run's type is the `s` step, the site's floor"),
			xl: X("A metadata run prints no seal."),
			lone: B("a lone card's metadata run prints exactly as a cell's"),
			noaction: B("the run never carries an action; the record's action is the template's"),
			inband: B("the run is inside a card inside a band")
		}
	},
	{
		name: "FIELDRECORDACTION",
		file: "COMPONENT/BRAND/FIELDRECORDACTION.ASTRO",
		note: "The one action a record offers, in the two arms a field record uses: a mono route line (`/LABEL`) or a squish Jelly button.",
		cells: {
			...Control("record action"),
			empty: B("a label of nothing prints an empty anchor - which is why the record template only mounts this block when `record.Action` exists"),
			loading: B("a record action that is working is the button arm with its label in the vocabulary; the route arm has no loading state, because a route is a destination and a destination does not load"),
			partial: B("a destination the record could not resolve prints `UNAVAILABLE` as its label and keeps its ink"),
			error: B("a failed action prints under the anchor in the record's own voice; the block owns no message of its own"),
			stale: X("An action is not a fact: it has no as-of, and a destination's age is the record's business."),
			dense: B("the two arms ARE the two densities: the route line is the tight arm and the button is the expressive one"),
			one: B("one action is the arm's own count: `.emphasis-expressive` allows one per artifact"),
			many: B("a second action is the second arm - the record's routes beside its button, which is how the hero prints its secondary destinations"),
			long: B("a long label wraps in the button and does not in the route line; the route line is one word by construction"),
			narrow: B("the button takes the column's width when its host asks (`block`), and its label wraps"),
			wide: B("the button keeps its own width; a wide band does not make a 900px button"),
			noplate: X("An action has no evidence panel."),
			three: X("An action is one control: three of them is the record's route row."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the button's label is the `s` step, the site's floor"),
			xl: X("An action prints no seal."),
			lone: B("a lone card's action prints exactly as a cell's"),
			noaction: B("this block IS the action: the no-action arm is the record template not mounting it"),
			inband: B("the action is inside a card inside a band")
		}
	},
	{
		name: "FIELDRECORDSTATUS",
		file: "COMPONENT/BRAND/FIELDRECORDSTATUS.TSX",
		note: "The STATUS ledger row: `STATUS:` in ink, the value in the record's ink, and the attested tone drawn as a square rather than a hue.",
		cells: {
			...Leaf("status row", "the record that prints it"),
			empty: B("an empty status prints `STATUS:` with no value - the caller's defect, and the block does not invent a word"),
			partial: B("`unavailable` and `interrupted` are two of the eight words: the block prints them at the ink tone, which is the vocabulary's own answer for a fact that is not what it should be"),
			dense: B("the row is one line at the `s` step; it has no tighter arm"),
			long: B("a long status value wraps under `STATUS:`; the copy prop's split is on `:` so a value with a colon keeps its second half"),
			narrow: B("the row wraps in place"),
			wide: B("the row stays one line"),
			incard: B("the row is printed inside a card"),
			noplate: X("A status row has no evidence panel."),
			three: X("A status row is one fact."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the row's mark is the state square at the badge step; at 16px the square is the ladder's `3`, which is the mark's own floor"),
			xl: X("A status row prints no seal."),
			lone: B("a lone card's status prints exactly as a cell's"),
			noaction: B("the row carries no action"),
			inband: B("the row is inside a card inside a band"),
			print: B("the row prints; the attested square prints as a filled mark and survives greyscale")
		}
	},
	{
		name: "FIELDRECORDEVIDENCE",
		file: "COMPONENT/BRAND/FIELDRECORDEVIDENCE.TSX",
		note: "The evidence plate: one photograph, `object-fit: cover`, no text on it - and, since this family, the two arms it has when there is no photograph.",
		cells: {
			...Leaf("evidence plate", "the figure or panel that holds it"),
			empty: B("`src` of nothing prints the absent arm: the plate's frame, the grammar's `◎`, `PLATE: UNAVAILABLE` and the description that would have been the alt - the composition this family's brief named, and the one that found the broken-image glyph"),
			loading: B("`state=\"loading\"` prints the same frame with three barred rules where the drawing will be - a skeleton in the record grammar, not a spinner in a 51% panel"),
			partial: B("a plate whose provenance the build could not resolve prints its caption with `UNAVAILABLE` in the provenance slot; the plate itself is unaffected"),
			error: B("a plate that failed to fetch is the absent arm: there is no difference a reader can act on between an image that is not there and one that did not arrive"),
			dense: B("the plate's density is its crop (`object-position`), not its box"),
			long: B("the plate has no text, so there is no line to run past its column - the caption below it wraps"),
			narrow: B("below `md` the plate keeps a `40dvh` floor so the caption describes an image that is there"),
			wide: B("a wide panel gives the plate more height; `object-fit: cover` crops rather than distorts"),
			incard: X("A plate inside a card is a photograph printed on a record: the plate is the pair's other half, and the figure that holds it is never a card."),
			noplate: B("this block IS the no-plate arm: the column and the block's own state are the same question, which is why the row is built here and not merely stated"),
			three: X("A plate is one image."),
			nine: X("Nine tiles is the stack's composition."),
			xs: X("A plate is never a mark: its smallest size is the panel it fills."),
			xl: X("A plate is not a seal: the 240px arm belongs to the mark, not the evidence."),
			lone: B("a lone plate is a figure of one"),
			noaction: B("the plate carries no action: the figure's caption is a fact, not a link"),
			inband: B("the plate is inside the pair or the figure"),
			print: B("the plate prints; the print layer caps its height so a photograph cannot take a page")
		}
	},
	{
		name: "FIELDRECORDSEAL",
		file: "COMPONENT/BRAND/FIELDRECORDSEAL.TSX",
		note: "The site's one engraved mark: concentric rings, four cardinal ticks and the element's device, struck in the accent - at five ladder steps since this family.",
		cells: {
			...Mark("seal"),
			rest: B("the authored drawing at `m` and up: two stroke weights, 1 and 0.5 user units, which is the engraving"),
			xs: B("the 16px arm, and the finding: at a quarter of a pixel per unit the authored drawing was a green smudge with a ring-shaped rumour - `Mark/_Seal.scss` draws `xs` at ONE weight (4 units = 1px), so the form survives and the device is still legible"),
			xl: B("the 240px arm: the authored drawing scaled, where a unit is 3.75px and the two weights are the engraving again - the seal as the artifact rather than an anchor on one"),
			s: B("the 32px arm: drawn at one weight (2 units = 1px) for the same reason `xs` is - at the card-head step the authored pair is 0.5px and 0.25px"),
			one: B("one seal per record is the grammar's rule; the block has no count of its own"),
			partial: X("A seal is one drawing: its device is the element's, and there is no half-drawn state - an element whose record carries no device prints the NEUTRAL roundel, which is a different drawing rather than a partial one."),
			print: B("the seal prints in the accent; at 32px and below the print layer inherits the one-weight correction")
		}
	},
	{
		name: "CORNERMARKS",
		file: "COMPONENT/BRAND/CORNERMARKS.ASTRO",
		note: "Picture-frame corner crosshairs for white card surfaces: eight ticks, four corners, one geometry module, one hover that separates the arms.",
		cells: {
			...Mark("corner frame"),
			rest: B("eight ticks inset from the panel's corners, at the mark ladder's inset and arm"),
			xs: B("the frame's inset and arm are the ladder's `6` and `1`; a 16px card would carry a frame wider than its corner, so the block has no xs arm and the host picks a bigger card"),
			xl: B("the frame takes whatever box its host has: on a 240px plate the arms are the same length, which is correct - a crosshair does not scale with its panel"),
			inband: B("the frame is inside the card, at the card's corners, and names no band"),
			print: B("the frame prints; the hover is dropped, because a printed sheet has no pointer")
		}
	},
	{
		name: "SEMANTICLEDGER",
		file: "COMPONENT/BRAND/SEMANTICLEDGER.TSX",
		note: "The character-level ink renderers for the record grammar: `StampText`, `RouteText`, `StatusText`, `PlatformDescriptionText`.",
		cells: {
			...Printed("ink renderer", "it is a pure function of a string and a lookup table"),
			empty: B("an empty line prints its brackets and nothing between them - `〈 〉`, which is the grammar's containment with no term"),
			partial: B("a term the ink table does not know prints in the record's ink: an unknown word is not allowed to authenticate itself"),
			dense: B("the renderers set no density: the ink is the caller's, the type is the caller's"),
			one: B("one term prints one span"),
			many: B("a line of twelve terms prints twelve spans and one pair of brackets"),
			long: B("a long line wraps in its host; the renderers are inline spans and have no measure"),
			narrow: B("the spans wrap in place"),
			wide: B("the spans stay on one line while they fit"),
			incard: B("the renderers are used inside cards"),
			noplate: X("An ink renderer has no evidence panel."),
			three: X("An ink renderer is one line: three of them is three rows."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the renderers inherit the host's type, so at a chip's scale they print at the chip's"),
			xl: X("An ink renderer prints no seal."),
			lone: B("a lone card's stamp prints exactly as a cell's"),
			noaction: B("the renderers carry no action"),
			inband: B("the renderers are used inside a card inside a band"),
			print: B("the inks print; the print layer maps the accent and the per-protocol inks to paper values")
		}
	},
	{
		name: "SPECIMENLABEL",
		file: "COMPONENT/BRAND/SPECIMENLABEL.TSX",
		note: "The element-series ledger artifact: ink directly on the creme canvas, hairline row rules, a small seal as the specimen anchor, no white box.",
		cells: {
			...Leaf("specimen label", "the index or wall that repeats it"),
			empty: B("`showHeader` and `showTitle` are the two blocks a host can suppress when it prints its own; with both off the label is its status and its metadata, which is a label of facts only"),
			partial: B("an unknown metadata value prints as given; the label never re-cases or invents one"),
			dense: B("the label IS the dense arm of the record family: `text-sm` stamps, hairline rules, no card inset"),
			long: B("the title is `text-lg` and wraps; the metadata key column is a `w-28` `nowrap` measure"),
			narrow: B("in a narrow column the metadata's key column holds and the value wraps"),
			wide: B("a wide host gives the label more measure; its rows stay one line while they fit"),
			incard: X("A specimen label is ink on the creme canvas by definition - it exists because the element series must NOT be the generic white FieldRecord box. A label inside a card would be the box it was built to replace."),
			noplate: X("A specimen label has no evidence panel."),
			three: B("three labels are three ledger rows of an index"),
			nine: B("nine labels are an index of nine; the artifact is the column, and nine is what the architecture band's own index prints"),
			xs: B("the label's seal is `s` by default and takes `xs` where a host prints it inside a row"),
			xl: X("A specimen label prints no 240px seal: the seal is the label's anchor, not its subject."),
			lone: B("a lone label is an index of one"),
			noaction: B("`action` is an optional node: a label with no action closes on its metadata"),
			inband: B("the label is composed by its host"),
			print: B("the label prints; its hairlines print as rules")
		}
	},
	{
		name: "DYNAMICHEROSECTION",
		file: "COMPONENT/DYNAMIC/DYNAMICHEROSECTION.TSX",
		note: "The homepage hero: the canonical two-panel artifact - the field record at 49 beside the evidence at 51, one hairline gutter, the runtime trace and the stack as its foot.",
		cells: {
			...Leaf("hero", "the page it opens"),
			empty: B("a hero handed no entries prints no action and no routes; a hero with no facts prints an empty ledger slot - both arms are conditional and the pair still holds"),
			loading: X("A hero is the page's first artifact and its claim is static copy: there is no state in which the pair exists and its record has not arrived, and a hero skeleton would be a page apologising before it said anything."),
			partial: B("a record whose plate has no provenance prints its caption with `UNAVAILABLE` beside it; the pair is unaffected"),
			error: B("a hero whose evidence failed to fetch prints the plate's absent arm - the frame, `◎`, `PLATE: UNAVAILABLE` and the description - rather than a broken glyph"),
			stale: X("A hero carries no as-of: its status line is the release state, which is the record's fact and not an age."),
			disabled: X("A hero is not a control."),
			readonly: X("A hero is read-only by construction."),
			dense: B("the pair's density is its ratio: 49fr 1px 51fr, with the blank interval held at 15-25% of the card"),
			one: B("one destination is one action; one fact is one ledger row - the hero has no set that cannot be one"),
			many: B("eight stack tiles and four trace steps are the foot's sets; both grow without changing the pair"),
			long: B("the claim is the page's one XL and its value is the tier's low end because the card is 49% of the pair - a claim that broke after `RUST +` would be a two-line poster"),
			narrow: B("below `md` the pair stacks card first, evidence second, and the plate keeps a `40dvh` floor"),
			wide: B("the pair caps its block size at `54rem` so the blank interval cannot pass 25%"),
			incard: X("The hero IS the artifact: its record panel is already a Jelly card, and a card around the pair would be a card around a card."),
			noplate: B("`plate.src` is optional since this family: with no source the evidence panel keeps its 51% of the pair, its height and its caption, and prints `◎` / `PLATE: UNAVAILABLE` / the description - the composition this family's brief named, and the one that found the broken-image glyph in a 40dvh panel"),
			three: X("The hero's evidence is one plate, not a set: three records is the proof band's column."),
			nine: B("the stack is the hero's legend and its count is derived (`StackTracks`): eight tiles print four across, nine print three, and a narrow card falls to two - the composition this family's brief named, and the one that found the hole in the last row"),
			xs: B("the seal at the hero's head is `m` (48px); the record's marker is type, not a mark"),
			xl: X("The hero prints no 240px seal: its largest object is the claim."),
			lone: B("a hero with one destination prints one action and no route line - `Routes` is empty and the action row holds its button"),
			noaction: B("a hero handed no entries prints no action at all; the record closes on its facts and the pair still reads"),
			inband: X("The hero is not a band: it opens the page and owns its own inset, and a hero inside a chapter would be a second opening."),
			print: B("the pair prints as two columns on paper; the blank interval collapses and the plate is capped")
		}
	},
	{
		name: "DOWNLOADMASTHEAD",
		file: "COMPONENT/DYNAMIC/DOWNLOADMASTHEAD.ASTRO",
		note: "The Download page's opening, endorsed on sight: glyph, `h1`, one sentence, then a row of marks - a record header, not a hero.",
		cells: {
			...Leaf("masthead", "the page it opens"),
			empty: B("a masthead with no marks prints the glyph, the `h1` and the sentence - the marks are the claim row and the header still opens"),
			loading: X("A masthead is static copy: its sentence is the page's own and there is nothing to wait for."),
			partial: B("a claim with no glyph prints its dot instead of its image - the block already chooses between the two"),
			error: X("A masthead reads nothing at render time."),
			stale: X("A masthead carries no as-of."),
			dense: B("the marks are `jelly-badge`s at 13px with their own protocol inks; the row wraps rather than compressing"),
			one: B("one mark prints one badge"),
			many: B("eight marks wrap onto a second row; the row is a wrapping line, not a grid"),
			long: B("a long claim wraps in its badge and the row takes another line - a squished chip row is really a row that should have wrapped"),
			narrow: B("below `md` the marks wrap and the sentence takes the full measure"),
			wide: B("the header caps at its measure and the marks stay left-aligned"),
			incard: X("The masthead is a page header, not a record: a card around it would be a card around a page."),
			noplate: X("The masthead has no evidence panel."),
			three: B("three marks print three badges"),
			nine: X("Nine tiles is the stack's composition; the masthead's unit is a badge."),
			xs: B("the marks' dots are the state square at the badge step, which is the family's smallest mark"),
			xl: X("The masthead prints no 240px seal."),
			lone: B("a masthead with one mark prints one badge"),
			noaction: B("the masthead's marks are claims, not actions; the page's action is further down"),
			inband: X("The masthead is the page's opening, not a chapter."),
			print: B("the marks print with their protocol inks mapped to paper")
		}
	},
	{
		name: "DYNAMICHEADER",
		file: "COMPONENT/DYNAMIC/DYNAMICHEADER.TSX",
		note: "The legacy schema-driven header, reduced to an adapter: it renders `Layout/Header` and adapts the old schema. ORPHANED - nothing imports it.",
		cells: {
			...Island("header adapter", "the bar it adapts is server-rendered and the auth status inside it is the island"),
			empty: B("an empty schema prints the bar with no nav and no action - the bar's own empty arm"),
			loading: B("the bar's auth status is a skeleton matching the avatar's size, so the bar does not shift"),
			partial: B("a nav item with no href prints as text; the bar's own conditional"),
			error: B("an auth read that failed prints the bar's signed-out arm; the bar never shows a failed session as a signed-in one"),
			disabled: B("a nav item can be disabled: it keeps its label and loses its target"),
			readonly: X("A header is not editable: there is nothing to change, so `read-only` names no arm."),
			dense: B("the bar has two modes - minimal and functional - which are the page's own density choice, not a control state"),
			one: B("one nav item prints one item"),
			many: B("the nav's count is the palette register's; a long nav folds into the palette below 1024px"),
			long: B("a long nav label wraps in the palette and ellipsizes in the bar"),
			narrow: B("below 1024px the nav folds into the palette and the bar keeps the mark and the toggle"),
			wide: B("the bar takes the page's full width; its measure is the shell's"),
			incard: X("A header is a page's chrome, never a record's surface."),
			noplate: X("A header has no evidence panel."),
			three: X("A header is one bar."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the bar's mark is the glyph at the ladder's `5`"),
			xl: X("The bar prints no seal."),
			lone: X("A bar with one nav item is a bar, not a lone card."),
			noaction: B("a bar with no action prints no sign-in link"),
			inband: X("The header is the frame's, not a chapter's."),
			print: B("the bar's nav resolves to a printed contents list")
		}
	},
	{
		name: "DYNAMICFOOTER",
		file: "COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX",
		note: "A schema-driven footer with its own social glyphs. ORPHANED - nothing imports it, and `Layout/Footer` plus `Footer/Data.ts` is the footer every page wears.",
		cells: {
			...Printed("footer adapter", "its content is a schema object resolved before the page exists"),
			empty: B("an empty schema prints the record's head and no rows - the footer's own empty arm"),
			partial: B("a footer fact with no value prints `UNAVAILABLE`"),
			dense: B("the footer's ledger is the register density"),
			one: B("one row prints one row"),
			many: B("the footer's five facts are a ledger; a sixth joins it"),
			long: B("a long fact wraps under its key"),
			narrow: B("below `md` the footer's columns stack"),
			wide: B("the footer caps at the page's measure"),
			incard: X("A footer is the page's closing record, never a card."),
			noplate: X("A footer has no evidence panel."),
			three: X("A footer is one record."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the social glyphs are 20px, the ladder's glyph step"),
			xl: X("The footer prints no seal."),
			lone: X("A footer is one record, not a lone card."),
			noaction: B("the footer's links are the record's rows; there is no action to remove"),
			inband: X("The footer is the frame's closing, not a chapter."),
			print: B("the footer's record prints as the document's colophon")
		}
	},
	{
		name: "DYNAMICDOCSIDEBAR",
		file: "COMPONENT/DYNAMIC/DYNAMICDOCSIDEBAR.TSX",
		note: "The documentation tree as a panel: the same sections `Doc/DocContents` prints in the rail, mounted by `DocLayout` below 1024px.",
		cells: {
			...Island("doc tree", "the tree is server-rendered and the disclosure that opens it is the browser's"),
			empty: B("a tree of no sections prints the grammar's `◎` and the sentence where the tree would be"),
			loading: B("the tree arrives with the page; its disclosure is closed by default, so a late tree is a closed panel rather than an empty one"),
			partial: B("a section with no children prints as a leaf"),
			error: B("a tree that could not be read prints the panel's absence in the record grammar"),
			stale: X("A doc tree carries no as-of: it is the manual's structure, not a fact with an age."),
			disabled: X("A doc tree is navigation: a disabled section is an absent section, and the tree prints one or the other."),
			readonly: X("A doc tree is read-only by construction."),
			dense: B("the panel's rows tighten below `md`; the rail's register is the dense arm and this is its panel form"),
			one: B("a manual with one section prints one row and the disclosure still opens"),
			many: B("an 81-row tree scrolls inside its own register with `overscroll-behavior: contain`"),
			long: B("a long section label wraps under its marker; the panel is sized in `ch`"),
			narrow: B("the panel IS the narrow arm: it exists only below 1024px, where the rail is not painted"),
			wide: X("Above 1024px the rail prints the tree and this panel is not mounted: a wide panel would be the same tree twice."),
			incard: X("A doc tree is a panel inside the page shell, never inside a record's card."),
			noplate: X("A doc tree has no evidence panel."),
			three: B("three sections print three rows"),
			nine: X("Nine tiles is the stack's composition; the tree's unit is a row."),
			xs: B("the tree's disclosure marks are the ladder's folds, not seals"),
			xl: X("The tree prints no seal."),
			lone: X("A tree of one is a tree, not a lone card."),
			noaction: B("the tree's rows are links; there is no action to remove"),
			inband: X("The tree is inside the documentation shell, not a chapter."),
			print: B("the panel prints as a contents list above the article")
		}
	},
	{
		name: "DYNAMICPORTAL",
		file: "COMPONENT/DYNAMIC/DYNAMICPORTAL.TSX",
		note: "The four connection tiers as a pricing surface, 1,556 lines. ORPHANED - no page imports it; `pages/Portal.astro` composes the tiers itself from `Content/Surface/Portal.ts`.",
		cells: {
			...Island("tier surface", "the tiers are static content and the auth state inside it is the island"),
			empty: B("a tier with no features prints its head and no list"),
			loading: B("a tier's price that has not resolved prints the barred arm; the surface has a skeleton per card"),
			partial: B("a tier with no protocol prints `UNAVAILABLE` in its badge slot"),
			error: B("a failed auth read prints the surface's signed-out arm"),
			disabled: B("a tier's action can be disabled: it keeps its label and loses its target"),
			readonly: X("A pricing surface is not editable."),
			dense: B("the tiers print one per band on the page and one card per row in the surface's own narrow arm"),
			one: B("one tier prints one card across the measure"),
			many: B("four tiers are the set; a fifth joins the row"),
			long: B("a long feature wraps under its mark"),
			narrow: B("below `lg` the tiers stack"),
			wide: B("the tiers cap at the page's measure"),
			incard: X("The surface composes its own cards; a card around the surface would be a card around four cards."),
			noplate: X("The tier surface has no evidence panel."),
			three: B("three tiers print three cards"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("each tier's seal is `s`"),
			xl: X("The tier surface prints no 240px seal."),
			lone: B("a surface of one tier is a page with one offer"),
			noaction: B("a tier with no action prints its facts alone"),
			inband: B("the tiers are printed one per band on the page"),
			print: B("the tiers print as a comparison table")
		}
	},
	{
		name: "DYNAMICTRANSPARENCY",
		file: "COMPONENT/DYNAMIC/DYNAMICTRANSPARENCY.TSX",
		note: "The telemetry-transparency panel on `/Download`: what is measured, what is not, and the switch. Live.",
		cells: {
			...Island("transparency panel", "its copy is static and its switch is the island"),
			empty: B("a panel with no items prints its head and the sentence that says nothing is measured"),
			loading: B("the panel's switch is disabled while the state resolves, with its label stating the work"),
			partial: B("an item with no value prints `UNAVAILABLE`"),
			error: B("a failed state read prints the panel's error arm in the vocabulary"),
			disabled: B("the switch can be disabled: it keeps its label and loses its target"),
			readonly: B("a read-only panel prints its items with the switch replaced by the state's word"),
			dense: B("the items are a ledger at the register density"),
			one: B("one item prints one row"),
			many: B("twelve items print twelve rows; the panel scrolls the page"),
			long: B("a long item wraps under its key"),
			narrow: B("below `md` the panel's two columns stack"),
			wide: B("the panel caps at the page's measure"),
			incard: X("The panel is a band's body, not a card."),
			noplate: X("The panel has no evidence panel."),
			three: B("three items print three rows"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the panel's state marks are the ladder's squares"),
			xl: X("The panel prints no seal."),
			lone: B("a panel of one item is a panel"),
			noaction: B("a panel whose switch is not offered prints its items alone"),
			inband: B("the panel is a band's body"),
			print: B("the panel prints; the switch prints as its state's word")
		}
	},
	{
		name: "DYNAMICVERIFICATIONINFO",
		file: "COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",
		note: "Checksums and signatures with a copy button, driven by `react-i18next`. ORPHANED - no page imports it, and `/Download` prints its checksums through `Download/Verify.astro`, which is live.",
		cells: {
			...Island("verification panel", "its checksums are content and its copy button is the island"),
			empty: B("a panel with no checksum prints `UNAVAILABLE` and the sentence that says nothing is published yet"),
			loading: B("the copy button is disabled while the clipboard is unavailable"),
			partial: B("a signature that is not published prints `UNAVAILABLE` beside the checksum that is"),
			error: B("a copy that failed prints the panel's error line - the block's `alert()` is the arm this family's matrix flags in `Observations`"),
			disabled: B("the copy button can be disabled"),
			readonly: B("a read-only panel prints the checksum as selectable text with no button"),
			dense: B("the two blocks are ledgers at the register density"),
			one: B("one checksum prints one row"),
			many: B("a release's checksums print as a list; twelve are twelve rows"),
			long: B("a 64-character checksum wraps in its own register - the one place a wrap is the correct answer"),
			narrow: B("below `md` the checksum takes its own line under its key"),
			wide: B("the panel caps at the page's measure"),
			incard: X("The panel is a band's body, not a card."),
			noplate: X("The panel has no evidence panel."),
			three: B("three checksums print three rows"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the panel's copy marks are the ladder's glyphs"),
			xl: X("The panel prints no seal."),
			lone: B("a panel of one checksum is a panel"),
			noaction: B("a panel with no copy control prints its checksum as text"),
			inband: B("the panel is a band's body"),
			print: B("the checksums print in full; the copy button is dropped")
		}
	},
	{
		name: "ACCOUNTPAGE",
		file: "COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX",
		note: "The account surface's shell: one of the four password screens chosen by route, with the same head and the same state grammar.",
		cells: {
			...Island("account shell", "the route decides which screen and the auth state is the island"),
			empty: B("a route with no screen prints the shell's head and the state report's empty arm"),
			loading: B("the shell prints its skeleton while the session resolves"),
			partial: B("a screen whose copy has no translation prints the English default; the shell never prints a key"),
			error: B("a failed auth read prints `STATUS: INTERRUPTED` with the cause and the retry"),
			disabled: B("a screen's submit is disabled while the form is invalid"),
			readonly: B("a signed-in reader's account screen prints its facts with the fields replaced by values"),
			dense: B("the shell's density is the auth surface's: one card, one measure"),
			one: B("one screen is one route"),
			many: B("the four screens are four routes, not four cards"),
			long: B("a long sentence wraps in the shell's measure"),
			narrow: B("below `md` the shell's card takes the full width"),
			wide: B("the shell caps at its measure and centres"),
			incard: X("The shell composes its own card; a card around it would be two."),
			noplate: X("The account shell has no evidence panel."),
			three: X("The shell is one surface."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the shell's status marks are the ladder's squares"),
			xl: X("The shell prints no seal."),
			lone: X("The shell is one surface, not a lone card."),
			noaction: B("a screen with no action prints its state and its sentence"),
			inband: X("The account shell is the page, not a chapter."),
			print: B("the shell prints as a form on paper")
		}
	},
	{
		name: "AUTH0ACCOUNT",
		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNT.TSX",
		note: "The Auth0 provider boundary for the two credential screens: it wraps `AccountPage` in the provider the sign-in and sign-up routes need.",
		cells: {
			...Island("auth boundary", "the provider resolves the session at run time"),
			empty: B("a boundary with no domain prints its children with the provider's own unconfigured arm"),
			loading: B("the boundary prints the shell's skeleton until the provider is ready"),
			partial: B("a boundary with a domain and no client identifier prints the provider's partial arm"),
			error: B("a provider that failed to initialise prints `STATUS: INTERRUPTED` and the cause"),
			disabled: B("the boundary can be mounted with its children disabled while the session resolves"),
			readonly: X("A provider boundary is not editable."),
			dense: X("A boundary has no density: it renders one child."),
			one: B("one child is the boundary's own count"),
			many: X("A provider boundary wraps one screen; two would be two providers."),
			long: X("A boundary renders no text of its own."),
			narrow: B("the boundary's child takes the width; the boundary has no box"),
			wide: B("the boundary's child caps at its own measure"),
			incard: X("A boundary is not a surface."),
			noplate: X("A boundary has no evidence panel."),
			three: X("A boundary is one provider."),
			nine: X("Nine tiles is the stack's composition."),
			xs: X("A boundary prints no mark."),
			xl: X("A boundary prints no seal."),
			lone: X("A boundary is not a card."),
			noaction: X("A boundary carries no action."),
			inband: X("A boundary is the page's, not a chapter's."),
			print: X("A provider boundary prints nothing: it has no markup of its own.")
		}
	},
	{
		name: "AUTH0ACCOUNTGATE",
		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",
		note: "The gate in front of the account surfaces: it decides between the sign-in prompt, the loading state and the screen, and it is where `DynamicStateReport` earns its keep.",
		cells: {
			...Island("account gate", "the session is the island's whole subject"),
			empty: B("a gate with no child prints the state report's empty arm"),
			loading: B("the gate prints the state report's loading arm - the one place on the site a restrained linear indicator is allowed"),
			partial: B("a session with an email and no profile prints the screen with `UNAVAILABLE` in the profile's rows"),
			error: B("a failed session prints `STATUS: INTERRUPTED` with the cause and the sign-in retry"),
			disabled: B("a gate can be mounted closed: the screen is not rendered and the prompt states why"),
			readonly: B("a gate in read-only mode prints the screen with its writes removed"),
			dense: B("the gate's density is the state report's: one card, one sentence, one action"),
			one: B("one child is the gate's count"),
			many: X("A gate guards one screen."),
			long: B("a long cause wraps in the state report's measure"),
			narrow: B("the gate's card takes the full width below `md`"),
			wide: B("the gate's card caps at its measure"),
			incard: X("The gate's state report is already a card."),
			noplate: X("The gate has no evidence panel."),
			three: X("A gate guards one screen."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the gate's status marks are the ladder's squares"),
			xl: X("The gate prints no seal."),
			lone: X("A gate is not a lone card."),
			noaction: B("a gate with no retry prints its state and its sentence"),
			inband: X("The gate is the page's, not a chapter's."),
			print: B("the gate prints its state; the retry is dropped")
		}
	},
	{
		name: "AUTH0CALLBACKHANDLER",
		file: "COMPONENT/DYNAMIC/AUTH0CALLBACKHANDLER.TSX",
		note: "The OAuth callback: it reads the code, exchanges it, and states the outcome - the one component on the site whose resting state is a redirect.",
		cells: {
			...Island("callback handler", "it runs on mount and has nothing to print until it has run"),
			empty: B("a callback with no code prints the state report's denied arm - a callback without a code is a link that was not authorised"),
			loading: B("the handler's resting state IS the loading arm: `STATUS: LOADING`, one sentence, no spinner in a page"),
			partial: B("a callback with a code and no state parameter prints the handler's partial arm and the reason"),
			error: B("a failed exchange prints `STATUS: INTERRUPTED` with the provider's cause and the sign-in retry"),
			disabled: X("A callback is not a control: it runs on mount and has no disabled state."),
			readonly: X("A callback is read-only by construction."),
			dense: X("A callback has no density: it prints one state report."),
			one: B("one code is the handler's count"),
			many: X("A callback handles one exchange."),
			long: B("a long provider error wraps in the state report's measure"),
			narrow: B("the report takes the full width below `md`"),
			wide: B("the report caps at its measure"),
			incard: X("The report is already a card."),
			noplate: X("A callback has no evidence panel."),
			three: X("A callback handles one exchange."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the report's status marks are the ladder's squares"),
			xl: X("A callback prints no seal."),
			lone: X("A callback is not a lone card."),
			noaction: B("a failed callback with no retry prints its cause alone"),
			inband: X("A callback is the page's, not a chapter's."),
			print: B("the callback's state prints; a printed sheet cannot complete an exchange, and the state says so")
		}
	},
	{
		name: "VERIFYPAGE",
		file: "COMPONENT/DYNAMIC/VERIFYPAGE.TSX",
		note: "The `/Verify` surface: the email-verification screen and its five outcomes, on the account shell's grammar.",
		cells: {
			...Island("verify surface", "the verification token is the island's subject"),
			empty: B("a verify route with no token prints the state report's denied arm"),
			loading: B("the surface's resting state is the loading arm while the token is checked"),
			partial: B("a token that verified an account with no profile prints the success arm with `UNAVAILABLE` in the profile's rows"),
			error: B("a failed verification prints `STATUS: INTERRUPTED` with the cause and the resend"),
			disabled: B("the resend is disabled while a send is in flight"),
			readonly: B("a verified account prints its facts with the fields replaced by values"),
			dense: B("the surface's density is the account shell's"),
			one: B("one token is the surface's count"),
			many: X("A verification is one token."),
			long: B("a long provider message wraps in the state report"),
			narrow: B("the card takes the full width below `md`"),
			wide: B("the card caps at its measure"),
			incard: X("The surface's report is already a card."),
			noplate: X("The verify surface has no evidence panel."),
			three: X("A verification is one token."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the surface's status marks are the ladder's squares"),
			xl: X("The surface prints no seal."),
			lone: X("The surface is not a lone card."),
			noaction: B("a verified account with no next step prints its state and its facts"),
			inband: X("The surface is the page, not a chapter."),
			print: B("the surface prints its state")
		}
	},
	{
		name: "DYNAMICACCOUNTPROFILE",
		file: "COMPONENT/DYNAMIC/DYNAMICACCOUNTPROFILE.TSX",
		note: "The account profile: the reader's own facts, their provider, their sessions and the two writes the surface allows.",
		cells: {
			...Island("profile surface", "the profile is fetched on mount"),
			empty: B("a profile with no facts prints the state report's empty arm"),
			loading: B("the profile prints its skeleton: the rows are barred, the labels are not"),
			partial: B("a profile with an email and no name prints `UNAVAILABLE` in the name row"),
			error: B("a failed profile read prints `STATUS: INTERRUPTED` with the cause and the retry"),
			disabled: B("a field the provider owns is disabled with the provider named beside it"),
			readonly: B("a profile with no writes prints its facts and no controls - the arm a reader with a provider-managed account gets"),
			dense: B("the profile's facts are a ledger at the register density"),
			one: B("one session prints one row"),
			many: B("twelve sessions print twelve rows and the list scrolls"),
			long: B("a long email wraps under its key; the row never widens the card"),
			narrow: B("below `md` the profile's two columns stack"),
			wide: B("the profile caps at its measure"),
			incard: X("The profile's sections are already cards; a card around them would be two."),
			noplate: X("The profile has no evidence panel."),
			three: B("three facts print three rows"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the profile's provider mark is the glyph at the ladder's `5`"),
			xl: X("The profile prints no seal."),
			lone: B("a profile of one fact is a profile"),
			noaction: B("a read-only profile prints no action"),
			inband: X("The profile is the page, not a chapter."),
			print: B("the profile prints as a record of the reader")
		}
	},
	{
		name: "DYNAMICDASHBOARDUSER",
		file: "COMPONENT/DYNAMIC/DYNAMICDASHBOARDUSER.TSX",
		note: "The dashboard's own record: the reader's identity, their scan's state and the one thing the dashboard is for.",
		cells: {
			...Island("dashboard record", "the session and the scan are both run-time"),
			empty: B("a dashboard with no scan prints the state report's empty arm and the sentence that says what would be here"),
			loading: B("the record prints its skeleton while the scan resolves"),
			partial: B("a scan with no result prints `UNAVAILABLE` in its figure"),
			error: B("a failed scan prints `STATUS: INTERRUPTED` with the cause and the rerun"),
			disabled: B("the rerun is disabled while a scan is in flight"),
			readonly: B("a dashboard for a reader who may not scan prints the record and no control"),
			dense: B("the record's facts are a ledger at the register density"),
			one: B("one scan is one figure"),
			many: B("the record's sets are small by construction; a list of many scrolls"),
			long: B("a long path wraps under its key"),
			narrow: B("below `md` the record's columns stack"),
			wide: B("the record caps at its measure"),
			incard: X("The dashboard's record is already a card."),
			noplate: X("The dashboard has no evidence panel."),
			three: B("three facts print three rows"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the record's state marks are the ladder's squares"),
			xl: X("The record prints no seal."),
			lone: B("a dashboard of one figure is a dashboard"),
			noaction: B("a dashboard with no rerun prints its record alone"),
			inband: X("The dashboard is the page, not a chapter."),
			print: B("the record prints")
		}
	},
	{
		name: "DYNAMICLOCALFIRSTSCAN",
		file: "COMPONENT/DYNAMIC/DYNAMICLOCALFIRSTSCAN.TSX",
		note: "The local-first scan: what the editor found on this machine, read as a ledger of probes with a state per probe.",
		cells: {
			...Island("scan surface", "the scan runs in the browser and every row's state arrives from it"),
			empty: B("a scan that found nothing prints `◎` and the sentence that says the machine carries none of the probes"),
			loading: B("each probe prints its own loading state - the scan is the one surface where a per-row skeleton is the design"),
			partial: B("a probe the browser cannot answer prints `UNAVAILABLE` and keeps its row - the honest arm for a capability the platform hides"),
			error: B("a probe that threw prints `STATUS: INTERRUPTED` on its own row and does not stop the scan"),
			disabled: B("the scan's rerun is disabled while it runs"),
			readonly: B("a scan whose result is cached prints its rows with no rerun"),
			dense: B("the probes are a ledger at the register density"),
			one: B("one probe prints one row"),
			many: B("twelve probes print twelve rows and the list scrolls"),
			long: B("a long probe name wraps under its mark"),
			narrow: B("below `md` each probe's state moves under its name"),
			wide: B("the scan caps at its measure"),
			incard: X("The scan is a band's body, not a card."),
			noplate: X("The scan has no evidence panel."),
			three: B("three probes print three rows"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("each probe's state mark is the ladder's square"),
			xl: X("The scan prints no seal."),
			lone: B("a scan of one probe is a scan"),
			noaction: B("a cached scan prints its rows and no rerun"),
			inband: B("the scan is a band's body"),
			print: B("the scan prints as a table of probes; a printed sheet cannot run one, and the state says so")
		}
	},
	{
		name: "DYNAMICAUTHHEADER",
		file: "COMPONENT/DYNAMIC/DYNAMICAUTHHEADER.TSX",
		note: "The header with the auth status inside it: `Layout/Header` wrapped in the provider, with `DynamicAuthStatus` as its action.",
		cells: {
			...Island("auth header", "the session is the island's subject"),
			empty: B("a header with no content prints the bar and no nav"),
			loading: B("the header's action is a skeleton matching the avatar's size, so the bar does not shift"),
			partial: B("a session with no picture prints the avatar's initials fallback"),
			error: B("a failed session prints the signed-out arm; the bar never shows a failed session as signed in"),
			disabled: B("a nav item can be disabled: it keeps its label and loses its target"),
			readonly: X("A header is not editable."),
			dense: B("the bar has its two modes; the auth status takes the bar's action slot"),
			one: B("one nav item prints one item"),
			many: B("a long nav folds into the palette below 1024px"),
			long: B("a long name ellipsizes in the bar and prints in full in the dropdown"),
			narrow: B("below 1024px the nav folds and the action stays"),
			wide: B("the bar takes the page's width"),
			incard: X("A header is chrome, never a record's surface."),
			noplate: X("A header has no evidence panel."),
			three: X("A header is one bar."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the bar's mark is the glyph at the ladder's `5`"),
			xl: X("The bar prints no seal."),
			lone: X("A bar is not a lone card."),
			noaction: B("a header with no action prints no action slot"),
			inband: X("The header is the frame's."),
			print: B("the bar's nav resolves to a contents list")
		}
	},
	{
		name: "DYNAMICAUTHSTATUS",
		file: "COMPONENT/DYNAMIC/DYNAMICAUTHSTATUS.TSX",
		note: "The header's action: avatar and dropdown when signed in, a sign-in link when not, a skeleton while the session resolves.",
		cells: {
			...Control("auth status"),
			empty: B("a session with no user prints the sign-in link - the block's own unauthenticated arm"),
			loading: B("the skeleton matches the avatar's size, which is the block's stated rule: no layout shift"),
			partial: B("a session with an email and no picture prints the initials fallback"),
			error: B("a failed session prints the sign-in link; a failed read is not a signed-in state"),
			stale: X("An auth status is a state, not a fact with an age."),
			dense: B("the status takes the bar's action slot; its density is the bar's"),
			one: B("one session is the block's subject"),
			many: X("A reader has one session per surface."),
			long: B("a long name ellipsizes in the trigger and prints in full in the dropdown"),
			narrow: B("below `md` the trigger prints the avatar alone"),
			wide: B("the trigger keeps its own width"),
			noplate: X("An auth status has no evidence panel."),
			three: X("An auth status is one control."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the avatar is the ladder's `6` (24px)"),
			xl: X("An auth status prints no seal."),
			lone: X("An auth status is not a card."),
			noaction: B("a signed-out status with no link prints the avatar's absence - the bar's own arm"),
			inband: X("The status is the bar's."),
			print: B("the status prints as the reader's name or as `SIGN IN`")
		}
	},
	{
		name: "DYNAMICSTATEPORT",
		file: "COMPONENT/DYNAMIC/DYNAMICSTATEREPORT.TSX",
		note: "The one shape every account, verify and dashboard state branch renders: a coded label, one plain sentence and the one action that is actually available.",
		cells: {
			...Leaf("state report", "the surface that branches on its state"),
			empty: B("`kind=\"empty\"` prints `STATUS: UNAVAILABLE`, the caller's sentence and the caller's next step - the block's whole subject is the adverse state"),
			loading: B("`kind=\"loading\"` prints `STATUS: LOADING` with the restrained linear indicator the design system permits in exactly this place"),
			partial: B("`kind=\"partial\"` prints the vocabulary's word and keeps the last known value visible"),
			error: B("`kind=\"error\"` prints `STATUS: INTERRUPTED`, the cause and the retry - and it sets `role=\"alert\"`, which is where a failure's urgency belongs rather than in a second colour"),
			stale: B("`kind=\"stale\"` prints the age and the last known value beside it"),
			disabled: B("the report's action can be disabled: it keeps its label and loses its target"),
			readonly: B("a report with no action prints its label and its sentence alone"),
			dense: B("the report's density is its own: one card, one sentence, one action"),
			one: B("one state is the report's subject"),
			many: B("a surface with many branches prints one report at a time; the block has no set"),
			long: B("a long cause wraps in the report's measure; the label never wraps"),
			narrow: B("the report's card takes the full width below `md`"),
			wide: B("the report's card caps at its measure"),
			incard: X("The report IS the card: a card around it would be two."),
			noplate: X("A state report has no evidence panel."),
			three: X("A state report is one state."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the report's label is a `jelly-badge` at 13px, with the state square at the badge step"),
			xl: X("A state report prints no seal."),
			lone: X("A state report is not a lone card."),
			noaction: B("a report whose next step does not exist prints its sentence alone - the arm every failed route uses"),
			inband: X("The report is the page's, not a chapter's."),
			print: B("the report prints; its action is dropped and its state stays")
		}
	},
	{
		name: "DYNAMICSIGNIN",
		file: "COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",
		note: "The sign-in form: email, password, the provider's third-party buttons and the state report's arms.",
		cells: {
			...Control("sign-in form"),
			one: X("A sign-in form is one form: a set of one is the form itself."),
			many: X("A sign-in form is one form: ninety of them is a page of forms."),
			incard: X("The form is already inside the account shell's card."),
			noplate: X("A form has no evidence panel."),
			three: X("A form is one form."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the form's labels are the `s` step, the site's floor"),
			xl: X("A form prints no seal."),
			lone: X("A form is not a lone card."),
			noaction: B("a form with no submit prints its fields and its sentence - the arm a provider-managed account gets"),
			inband: X("The form is inside the account shell."),
			print: B("the form prints as fields; the submit is dropped")
		}
	},
	{
		name: "DYNAMICSIGNUP",
		file: "COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",
		note: "The sign-up form: email, password, the strength meter, the terms checkbox and the provider's buttons.",
		cells: {
			...Control("sign-up form"),
			one: X("A sign-up form is one form."),
			many: X("A sign-up form is one form."),
			incard: X("The form is already inside the account shell's card."),
			noplate: X("A form has no evidence panel."),
			three: X("A form is one form."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the strength meter's marks are the ladder's squares"),
			xl: X("A form prints no seal."),
			lone: X("A form is not a lone card."),
			noaction: B("a form with no submit prints its fields"),
			inband: X("The form is inside the account shell."),
			print: B("the form prints as fields; the meter prints as its word")
		}
	},
	{
		name: "DYNAMICFORGOTPASSWORD",
		file: "COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",
		note: "The forgot-password screen: one field, one submit, and the state report's sent arm.",
		cells: {
			...Control("recovery form"),
			one: X("A recovery form is one form."),
			many: X("A recovery form is one form."),
			incard: X("The form is already inside the account shell's card."),
			noplate: X("A form has no evidence panel."),
			three: X("A form is one form."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the form's label is the `s` step"),
			xl: X("A form prints no seal."),
			lone: X("A form is not a lone card."),
			noaction: B("a form with no submit prints its field"),
			inband: X("The form is inside the account shell."),
			print: B("the form prints as a field")
		}
	},
	{
		name: "DYNAMICRESETPASSWORD",
		file: "COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",
		note: "The reset screen: two password fields, the strength meter and the token's three outcomes.",
		cells: {
			...Control("reset form"),
			one: X("A reset form is one form."),
			many: X("A reset form is one form."),
			incard: X("The form is already inside the account shell's card."),
			noplate: X("A form has no evidence panel."),
			three: X("A form is one form."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the meter's marks are the ladder's squares"),
			xl: X("A form prints no seal."),
			lone: X("A form is not a lone card."),
			noaction: B("a form with no submit prints its fields"),
			inband: X("The form is inside the account shell."),
			print: B("the form prints as fields")
		}
	},
	{
		name: "DYNAMICEMAILVERIFICATION",
		file: "COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",
		note: "The verification screen: the six-digit code, the resend's cooldown and the five outcomes.",
		cells: {
			...Control("verification form"),
			one: X("A verification form is one form."),
			many: X("A verification form is one form."),
			incard: X("The form is already inside the account shell's card."),
			noplate: X("A form has no evidence panel."),
			three: X("A form is one form."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the code's six fields are the `s` step"),
			xl: X("A form prints no seal."),
			lone: X("A form is not a lone card."),
			noaction: B("a form with no submit prints its fields and the resend"),
			inband: X("The form is inside the account shell."),
			print: B("the form prints as fields; the code prints in full")
		}
	},
	{
		name: "DYNAMICCONTACTFORM",
		file: "COMPONENT/DYNAMIC/DYNAMICCONTACTFORM.TSX",
		note: "The contact hub's form: the thirteen request routes, the field set and the delivery state. 836 lines, live on `/Contact`.",
		cells: {
			...Control("contact form"),
			empty: B("a form with no route selected prints the field set and the route chooser's empty arm"),
			loading: B("the submit is disabled while the send is in flight, with its label stating the work"),
			partial: B("a field the reader has not reached prints its placeholder; a route whose recipient is unknown prints `UNAVAILABLE`"),
			error: B("a failed send prints `STATUS: INTERRUPTED`, the cause and the retry - and it keeps every field's value"),
			one: B("one route prints one choice"),
			many: B("thirteen routes print thirteen choices and the chooser scrolls"),
			long: B("a long message scrolls inside its field; the form's measure does not change"),
			narrow: B("below `md` the field set is one column"),
			wide: B("the form caps at its measure; a wide band does not make a 1200px textarea"),
			incard: X("The form is already inside the contact hub's card."),
			noplate: X("A form has no evidence panel."),
			three: B("three routes print three choices"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the form's labels are the `s` step"),
			xl: X("A form prints no seal."),
			lone: X("A form is not a lone card."),
			noaction: B("a form with no submit prints its fields - the arm a static deployment gets"),
			inband: B("the form is a band's body"),
			print: B("the form prints as fields; the submit is dropped")
		}
	},
	{
		name: "DYNAMICINPUT",
		file: "COMPONENT/DYNAMIC/DYNAMICINPUT.TSX",
		note: "The field: label, input, helper text and error, composed with the two ARIA relations the error needs.",
		cells: {
			...Control("field"),
			empty: B("an empty value prints the placeholder and the label above it"),
			loading: B("the field is disabled with its label stating the work"),
			partial: B("a value the caller could not resolve prints `UNAVAILABLE` in the field"),
			error: B("`Error` prints under the field and wires `aria-invalid` and `aria-describedby` - the one thing this block exists to get right"),
			disabled: B("the field is disabled: its label keeps its ink and the input loses its fill"),
			readonly: B("the field prints its value with no caret and no border change"),
			dense: B("the dense arm tightens the row's air and keeps the field's height"),
			one: X("A field is one control."),
			many: X("A field is one control."),
			long: B("a long value scrolls inside the field; the label wraps above it"),
			narrow: B("the field takes its column's width"),
			wide: B("the field takes its band's width up to its own measure"),
			incard: X("A field is inside its form's card."),
			noplate: X("A field has no evidence panel."),
			three: X("A field is one control."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the label is the `s` step, the site's floor"),
			xl: X("A field prints no seal."),
			lone: X("A field is not a lone card."),
			noaction: B("a field with no submit is a field - the arm the specimen sheet prints"),
			inband: B("the field is inside its form"),
			print: B("the field prints as a ruled box with its value")
		}
	},
	{
		name: "DYNAMICLABEL",
		file: "COMPONENT/DYNAMIC/DYNAMICLABEL.TSX",
		note: "The label, with its two conditions stated on itself: `aria-required` and `aria-disabled` travel with the label, not only with the control.",
		cells: {
			...Mark("label"),
			rest: B("the label's text at the `s` step, wired to its control by `htmlFor`"),
			empty: B("an empty label prints the required mark alone - the caller's defect, and the block prints what it was given"),
			partial: B("`Required` and `Disabled` are the label's two states: both are printed on the label's own attributes, which is the block's whole argument"),
			xs: B("the label is the `s` step at every size"),
			xl: X("A label is never the largest object on a surface."),
			print: B("the label prints above its field")
		}
	},
	{
		name: "DYNAMICCHECKBOX",
		file: "COMPONENT/DYNAMIC/DYNAMICCHECKBOX.TSX",
		note: "The checkbox with its label and optional description, including the indeterminate state.",
		cells: {
			...Control("checkbox"),
			one: X("A checkbox is one control."),
			many: X("A checkbox is one control; a set of them is a field group."),
			long: B("a long label wraps beside the box; the box stays on the first line"),
			narrow: B("the label wraps under the box below `md`"),
			wide: B("the row keeps its measure"),
			incard: X("The checkbox is inside its form's card."),
			noplate: X("A checkbox has no evidence panel."),
			three: X("A checkbox is one control."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the box is the ladder's `2` and its label the `s` step"),
			xl: X("A checkbox prints no seal."),
			lone: X("A checkbox is not a lone card."),
			noaction: B("a checkbox with no submit is a control - the arm the specimen sheet prints"),
			inband: B("the checkbox is inside its form"),
			print: B("the box prints as a ruled square with its mark")
		}
	},
	{
		name: "DYNAMICBUTTON",
		file: "COMPONENT/DYNAMIC/DYNAMICBUTTON.TSX",
		note: "The button: four variants, three sizes, an icon registry and the loading state that keeps its width.",
		cells: {
			...Control("button"),
			empty: B("a button with no label prints its icon alone and carries an `aria-label` - the arm the icon registry exists for"),
			loading: B("the loading arm keeps the button's width and replaces its label with the vocabulary's word; the button is disabled while it runs"),
			disabled: B("the disabled arm keeps the label's ink at the muted step and drops the fill"),
			readonly: X("A button is not editable: it is a control, and `read-only` is a field's state."),
			dense: B("the three sizes ARE the density ladder: `sm`, `md`, `lg`"),
			one: X("A button is one control."),
			many: X("A button is one control; a row of them is the artifact's action row."),
			long: B("a long label wraps and the button grows; it never truncates a verb"),
			narrow: B("the button takes the column's width when its host asks (`block`)"),
			wide: B("the button keeps its own width"),
			incard: X("The button is inside the artifact's card."),
			noplate: X("A button has no evidence panel."),
			three: X("A button is one control."),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the label is the `s` step at every size"),
			xl: X("A button prints no seal."),
			lone: X("A button is not a lone card."),
			noaction: X("A button IS an action: the no-action arm is the artifact not mounting one."),
			inband: B("the button is inside the artifact"),
			print: B("the button prints as its label and its destination")
		}
	},
	{
		name: "DYNAMICBADGE",
		file: "COMPONENT/DYNAMIC/DYNAMICBADGE.TSX",
		note: "One word in a Jelly badge with an optional protocol dot. LAB ONLY - the specimen sheet is its only importer.",
		cells: {
			...Mark("badge"),
			rest: B("the word at 13px with the site's light fill and dark -700 ink; the dot is the state square at the badge step in the protocol's own ink"),
			empty: B("an empty label prints the badge's fill and the dot alone - a chip with no word is the caller's defect and the block prints what it was given"),
			partial: B("a dot whose protocol the map does not know prints no dot: an unknown protocol is not allowed to claim an ink"),
			xs: B("the badge IS the family's 16px arm: its type is 13px and its dot the ladder's `3`"),
			xl: X("A badge is never the largest object on a surface."),
			print: B("the badge prints as a bracketed word with its fill dropped")
		}
	},
	{
		name: "DYNAMICCARD",
		file: "COMPONENT/DYNAMIC/DYNAMICCARD.TSX",
		note: "A Jelly card with three optional sections. LAB ONLY - the specimen sheet is its only importer, and it is a parallel card vocabulary to the homepage's record cards.",
		cells: {
			...Printed("generic card", "its three sections are props resolved before the page exists"),
			empty: B("a card with no sections prints its Jelly surface and nothing in it - a white box on the field, which is the arm the specimen sheet prints as its own warning"),
			partial: B("a card with a header and no body prints the header and the footer; each section is conditional"),
			dense: B("the card has no density of its own: Jelly's `--jelly-card-padding-*` are the host's"),
			one: X("A card is one surface."),
			many: X("A card is one surface; a set of them is the grid that holds them."),
			long: B("the body wraps in the card's measure; the title is the `s` step and wraps"),
			narrow: B("the card takes its column's width"),
			wide: B("the card takes its host's width; it has no maximum of its own"),
			incard: X("A card inside a card is the one composition the identity forbids."),
			noplate: X("A card has no evidence panel."),
			three: X("A card is one surface."),
			nine: X("Nine tiles is the stack's composition."),
			xs: X("A card prints no mark."),
			xl: X("A card prints no seal."),
			lone: B("a lone card is a card"),
			noaction: B("a card with no footer prints two sections and closes on its body"),
			inband: B("the card is composed on the field by its host"),
			print: B("the card prints as a white insert")
		}
	},
	{
		name: "DYNAMICBLOGCARD",
		file: "COMPONENT/DYNAMIC/DYNAMICBLOGCARD.TSX",
		note: "One blog entry as a card: tags, title, three-line summary, author and read time. LAB ONLY - `/Blog` prints `BlogIndex`'s own card, which carries the same five facts and the record grammar this one lacks.",
		cells: {
			...Leaf("article card", "the index that repeats it"),
			empty: B("an entry with no tags prints no tag row; an entry with no summary prints an empty paragraph - the block does not state the absence, which is one of the reasons the live index does not use it"),
			partial: B("an entry with no read time prints `0 min read` - the block's own defect, recorded in `Observations`"),
			dense: B("the card's `line-clamp-3` on the summary IS its dense arm: the card has a fixed height at any summary length"),
			long: B("a long title wraps at the `s` step and the summary clamps; a title longer than three lines is cut by the card's own height, which is the defect the live index's card was written to avoid"),
			narrow: B("the card takes its column's width; the author and read time wrap under each other"),
			wide: B("the card takes its host's width; it has no maximum of its own"),
			incard: X("The card IS a surface; a card around it would be two."),
			noplate: X("An article card has no evidence panel."),
			three: B("three cards are a row of three"),
			nine: B("nine cards are the blog index's own grid, which is eight - a ninth joins it"),
			xs: B("the tags are the `s` step"),
			xl: X("An article card prints no seal."),
			lone: B("a lone card is an index of one"),
			noaction: B("the card's title is not a link: the live index's card is the anchor, and this block's lack of one is recorded in `Observations`"),
			inband: B("the card is composed by the index"),
			print: B("the card prints; the clamp is released on paper")
		}
	},
	{
		name: "DYNAMICTABLE",
		file: "COMPONENT/DYNAMIC/DYNAMICTABLE.TSX",
		note: "A table from a column list and a row list. LAB ONLY - the specimen sheet is its only importer, and `RecordMatrix` is the layer's own matrix.",
		cells: {
			...Printed("table", "its columns and rows are props resolved before the page exists"),
			empty: B("a table with no rows prints its head and no body - the honest arm for a set of none, and the one a `RecordMatrix` improves on with a stated absence"),
			partial: B("a cell whose value is unknown prints `UNAVAILABLE`; the block prints what the row carries"),
			dense: B("`Compact` is the block's own tight arm, and `Striped` is its second reading"),
			one: B("one row prints one row under the head"),
			many: B("twelve rows print twelve; the table has no cap and the page scrolls"),
			long: B("a long cell wraps; the table's `overflow-x-auto` keeps a wide set scrollable rather than squashed"),
			narrow: B("the table scrolls horizontally inside its own frame - the arm the specimen sheet prints"),
			wide: B("the table takes its host's width"),
			incard: X("A table is a band's body, not a card."),
			noplate: X("A table has no evidence panel."),
			three: B("three rows print three rows"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the head's labels are the `s` step"),
			xl: X("A table prints no seal."),
			lone: B("a table of one row is a table"),
			noaction: B("`OnRowClick` is optional: a table with no handler prints its rows as facts"),
			inband: B("the table is a band's body"),
			print: B("the table prints; its scroll frame becomes page breaks")
		}
	},
	{
		name: "DYNAMICRICHTEXT",
		file: "COMPONENT/DYNAMIC/DYNAMICRICHTEXT.TSX",
		note: "One string parsed: a blank line is a paragraph and a backtick is code. LAB ONLY - a one-line island around `UI/RichText`.",
		cells: {
			...Printed("rich text", "the string is a prop and the parser is pure"),
			empty: B("an empty string prints an empty block - the caller's defect, and the block prints nothing rather than a placeholder"),
			partial: B("an unclosed backtick prints as literal text; the parser never invents a close"),
			dense: B("the prose's density is its host's: the block sets no type of its own beyond the parser's roles"),
			one: B("one paragraph prints one paragraph"),
			many: B("twelve paragraphs print twelve; the block has no cap"),
			long: B("a long paragraph wraps at its host's measure"),
			narrow: B("the prose takes its column's width"),
			wide: B("the prose caps at its host's measure"),
			incard: B("the prose is printed inside whatever card its host owns"),
			noplate: X("Rich text has no evidence panel."),
			three: B("three paragraphs print three"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the code spans are the `s` step"),
			xl: X("Rich text prints no seal."),
			lone: B("one paragraph is the lone arm"),
			noaction: B("rich text carries no action"),
			inband: B("the prose is a band's body"),
			print: B("the prose prints")
		}
	},
	{
		name: "MERMAIDFALLBACK",
		file: "COMPONENT/DYNAMIC/MERMAIDFALLBACK.ASTRO",
		note: "The client-side Mermaid fallback: it catches diagram blocks the build-time plugin could not resolve and draws them in the browser. Live on the two markdown routes.",
		cells: {
			...Island("diagram fallback", "the diagrams it draws arrive as `<pre>` blocks and are rendered on the client"),
			empty: B("no unresolved block prints nothing at all - the fallback's script finds none and the page is unchanged, which is the arm 102 of the last measurement took"),
			loading: B("the block prints its own frame while the library draws; the frame is the diagram's box, so the page does not shift"),
			partial: B("a diagram whose source the library cannot parse prints the error arm with the source and the reason"),
			error: B("a failed draw prints `mermaid-fb-error` with the message - the one place in this family with a hand-typed colour (`#d1242f`), recorded in `Observations`"),
			stale: X("A diagram is a drawing, not a fact with an age."),
			disabled: X("A diagram is not a control."),
			readonly: X("A diagram is read-only by construction."),
			dense: B("the diagram's density is its own scale; the frame's padding is the block's"),
			one: B("one diagram prints one frame"),
			many: B("twelve diagrams print twelve frames"),
			long: B("a long diagram scrolls horizontally inside its frame (`overflow-x: auto`)"),
			narrow: B("the diagram scales to its frame's width (`max-width: 100%`)"),
			wide: B("the diagram caps at its frame's measure"),
			incard: B("the diagram is printed inside the prose's column"),
			noplate: X("A diagram has no evidence panel."),
			three: B("three diagrams print three frames"),
			nine: X("Nine tiles is the stack's composition."),
			xs: B("the error's type is `0.85em` of the prose's, which is the one place in this family below the `s` floor - recorded in `Observations`"),
			xl: X("A diagram prints no seal."),
			lone: B("one diagram is the lone arm"),
			noaction: B("a diagram carries no action"),
			inband: B("the diagram is inside the article's prose"),
			print: B("the fallback's frame prints; a diagram the build resolved prints as its own SVG")
		}
	}
];
/** The cell at a row and a column: the row's override, or the built default. */
var MatrixCell$8 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$7 = () => Rows$8.flatMap((row) => Columns$8.map((column) => ({
	row,
	column,
	cell: MatrixCell$8(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$8 = Rows$8.length * Columns$8.length;
/** How many cells the family builds. */
var BuiltCount$8 = MatrixCells$7().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$8 = CellCount$8 - BuiltCount$8;
/** How many cells one row builds. */
var BuiltOf$8 = (Row) => Columns$8.filter((Column) => MatrixCell$8(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$6 = (Column) => Rows$8.filter((Row) => MatrixCell$8(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$8 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$8.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$8.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$8)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$8)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$8)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$8.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/COMPOSITION.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that revealed
* it. An improvement with no cell behind it would be a preference.
*/
var Improvements$5 = [
	{
		component: "FIELDRECORDEVIDENCE",
		from: "NO PLATE",
		found: "A hero with no evidence image rendered a browser error inside a 51% panel. `Plate.src` was a required string, so the only way to say \"this evidence has not been photographed\" was to pass `src=\"\"`, and an `<img>` with an empty source draws the browser's broken-image glyph - a torn icon in a 40dvh box - while the caption underneath went on describing a photograph that was not there. The panel is half the artifact: an absence it cannot draw is an absence it cannot survive.",
		built: "`src` is optional and the block has three arms. `rest` is the photograph, unchanged. `absent` keeps the frame, the measure and the place in the pair, and prints the grammar's `◎`, the row `PLATE: UNAVAILABLE` and - under it - the description that would have been the image's alt: the sentence a reader needs is the sentence the alt already carried, so nothing is invented and nothing is lost. `loading` prints the same frame with three barred rules, drawn in the record grammar rather than as a spinner. The absence is announced with `role=\"img\"` and the description as its accessible name, so a reader who cannot see the panel gets the same sentence either way."
	},
	{
		component: "DYNAMICHEROSECTION",
		from: "NO PLATE",
		found: "The pair is the keeper: 49fr 1px 51fr with the hairline in the middle track. A missing plate collapsed the evidence panel's height to its caption and the pair became a card with a caption beside it - the ratio still declared, the artifact gone. The keeper's geometry had no adverse state because the geometry assumed a photograph.",
		built: "The pair publishes `data-plate=\"rest|absent\"` and the evidence panel keeps its 51%, its height and its caption in both arms; what changes is what the panel contains, not what it measures. The caption and the provenance are still printed under the frame, because they are the claim of what the evidence is *of*, and that claim outlives the evidence itself."
	},
	{
		component: "FEATUREBAND",
		from: "THREE",
		found: "The proof band's matrix was `repeat(3)` from `lg` and `repeat(2)` from `md` - a distribution that divides six and nothing else. Printed with three records it answered 2 + 1 at every width below `lg`: a hole in the seam where the fourth cell would have been, which reads as a plate that lost a record rather than one that files three. And a plate of three looked exactly like a plate of six to a reader who had not counted.",
		built: "`cards` is a prop and the band publishes its ceiling (`Ceiling`, as `--row-tracks` and `data-tracks`): a set that divides three is composed for three, one that divides two is composed for two. The count it actually PRINTS is the record's capacity - the grid is the shell's capacity row, and one record measures 23rem - so six records print two tracks at every desktop width and one below 801px. The grid still publishes `data-count`, `data-tracks` and `data-remainder`, but a short last line needs no rule: the row shares its free space with `flex-grow`, so a lone record closes the seam at full width and a remainder of two prints as a pair at half each. A subset also prints its figure under the grid - `# RECORDS / 03` and `SELECTION: 03 OF 06` - built from the two arrays, so the number cannot outlive the set."
	},
	{
		component: "FEATUREBAND",
		from: "EMPTY",
		found: "A set of none printed an empty grid: the band's head, then nothing, then the observation strip. A page whose content module failed to resolve looked like a page whose band had been switched off - the layout had no way to say \"there is nothing here\", which is the brief's empty rule stated exactly backwards.",
		built: "`RECORDS: UNAVAILABLE` and one sentence where the matrix would be, at the matrix's own measure and on the record layer's hairline. The band's head still prints, so the chapter is still announced; only the plate is stated rather than drawn."
	},
	{
		component: "DYNAMICHEROSECTION",
		from: "NINE",
		found: "The stack's grid was two columns below a container query and four above it, with the arithmetic in the partial's head measuring exactly the eight tiles the strip was built for. Nine tiles in four columns leaves a row of one; nine in two leaves a row of one; and nine in a narrow card left a row of one that also ellipsized five of its names. A legend with a gap in it reads as a legend that lost a tile.",
		built: "The column count is derived from the set (`Content/Home/Stack.ts:StackTracks`): four divides eight, three divides nine, one tile is one row. The partial reads that number as a CEILING rather than an assertion - `flex: 1 1 var(--stack-floor)` with `max-inline-size: var(--stack-ceil)` - so the set's own count is the most a row can hold and the width decides only whether it still fits. A short last row keeps its tiles track-wide instead of stretching an orphan across the strip. The label gained the set's figure (`TECH STACK␁08 TILES`), because a legend is a set and a set has a count."
	},
	{
		component: "FIELDRECORDSEAL",
		from: "AT 16",
		found: "The seal is drawn in a 64-unit viewBox with two stroke weights, 1 and 0.5 - user units, which scale with the box. At 64px they are a pixel and half a pixel and the mark is an engraving; at 32px they are 0.5px and 0.25px; at 16px they are 0.25px and 0.125px. The 16px arm rendered a green smudge with a ring-shaped rumour around it, and the two elements whose devices are a LINE rather than a disc - `Grove`'s trunk, `Mountain`'s peaks - disappeared entirely. The ladder's smallest step was 32px and it was already at the edge of legibility.",
		built: "The ladder gained `xs` (16px) and the two small steps are drawn at ONE weight: `Mark/_Seal.scss` sets `stroke-width: 4` at `xs` and `2` at `s` on every stroked shape inside the mark, which is 1px at both steps. The two-ring engraving becomes the form's single outline, and the seal still reads as a seal because a seal is a roundel with a device in it, not a roundel with two hairlines in it. The correction is CSS rather than a second drawing: eight elements times two weight-sets would be sixteen drawings to keep in step."
	},
	{
		component: "FIELDRECORDSEAL",
		from: "AT 240",
		found: "The ladder stopped at 64px - \"a seal at the head of a page\" - and had no step for the mark as the artifact itself. A host that wanted the roundel at display size had to pass a number, and `Step()` mapped every number above 56 to `l`, so 240px quietly became 64px. The mark could be an anchor on a page and nothing else.",
		built: "The ladder gained `xl` (240px, `--mark-size-10`) with its meaning stated: the seal AS the plate. At that size a unit is 3.75px and the authored pair of weights is the engraving again, so the step needs no correction - which is the finding: the drawing is right at every size at or above its authored one, and wrong at every size below it. The block keeps `pointer-events: none` and `aria-hidden` at `xl`: a plate-sized seal authenticates the artifact it stands in; it is not a link."
	},
	{
		component: "PLATFORMBAND",
		from: "EMPTY",
		found: "A manifest with no artefact printed an empty white plate. On the creme field a white insert with nothing on it does not read as \"nothing to ship\" - it reads as a build that lost its data, which is the opposite of what the page's own masthead says in words. The plate had no adverse state because the page always had three platforms.",
		built: "`cards` is a prop and a set of none keeps the plate - the white surface is the artifact's - and states three facts in the vocabulary at the row's own inset: `ARTIFACTS: UNAVAILABLE`, the sentence that says every build is made from source, and `CHANNEL: SOURCE`. A plate of none and a plate of three are now the same object with different contents."
	},
	{
		component: "BAND",
		from: "MANY",
		found: "The band's series index was written into the template as `_01`. Every band on the page is the first of its series, so nothing had ever gone wrong - but the grammar is `# OBSERVATION_01`, and a page that filed its observations in two movements would have printed `# OBSERVATION_01` twice: two records claiming one index, which is the register defect the brief names in §4.1.",
		built: "`index` is a prop, defaulting to `01`. The number is the caller's because a band's position in a series is a fact about the page and not about the shell; the mark and the separator stay the block's."
	},
	{
		component: "FIELDRECORDMETADATA",
		from: "EMPTY",
		found: "Given neither `pairs` nor `rows` the block renders an empty `<dl>`: no mark, no word, no sentence. It is the only block in this family whose empty arm is silence, and it is silent because two hosts pass a mapped array that may be empty and neither has ever been asked what the absence means.",
		built: "Nothing - and that is the entry's honest content. The block is read by `FieldRecord` (which only mounts it when `record.Metadata` has rows) and by the hero's card (which passes three facts), so the silent arm is unreachable from the site and reachable only from a new caller. It is recorded in `Observations` with the argument for leaving it: a block that grew an absence sentence it never prints would be a block with a third arm nothing tests."
	}
];
/**
* The five things this card did not fix.
*
* An observation is not a defect list - it is the part of the exploration that
* belongs to someone else. Three of the five are in blocks this card does not own
* (the blog card, the Mermaid fallback, the verification panel); one is a
* decision about ten files; one is a signature another host depends on.
*/
var Observations$5 = [
	{
		component: "DYNAMICBLOGCARD",
		found: "The block prints `${ReadTime} min read` and an entry with no read time therefore prints `0 min read` - a zero where the vocabulary has `UNAVAILABLE`. Its title is also not a link: the card is a `<article>` and the anchor that makes it a card is `BlogIndex`'s, which is why the live index does not use it.",
		owner: "`/Blog`'s surface owner. The fix is two lines and it belongs with the block's disposition: if the card is adopted, the read time becomes `RegisterUnavailable` and the title becomes the anchor; if it is retired, neither is worth doing."
	},
	{
		component: "MERMAIDFALLBACK",
		found: "The block carries a hand-typed colour (`#d1242f`) for its error arm and a `0.85em` type size for the same line - the one place in this family below the 13px floor and the one place a colour is typed by hand. Both are inside an Astro `<style>` block that no token reaches.",
		owner: "The block's owner, and it is a small, contained edit: `--Destruct` for the ink and `--type-meta` for the size. This card did not make it because the fallback's style block is scoped to the component and the token names are the Type and Token layers' API, which is a different card's surface."
	},
	{
		component: "DYNAMICVERIFICATIONINFO",
		found: "The copy confirmation is a `window.alert()` - a browser modal on a page that has spent four layers of design on not being a browser. It is the only `alert()` in the component tree.",
		owner: "Whoever decides the block's disposition. A copy confirmation is a state on the button (`COPIED` for two seconds, in the vocabulary) and that state is worth building only if the block is kept."
	},
	{
		component: "THE DYNAMIC LAYER",
		found: "Ten of the thirty-five `Dynamic/*` parts have no production importer: six are mounted only by this specimen sheet and four by nothing at all. Eleven duplicate a block that already exists. That is not a defect any single card can fix - it is a decision about the layer, and it is stated in `Verdicts` with each part's importers.",
		owner: "The owner. The three decisions are named in `Verdicts`: adopt (and give the part a page), fold (and give its capability to the block that already has it), or retire (and record the deletion). This card removed nothing."
	},
	{
		component: "FIELDRECORDMETADATA",
		found: "Given neither `pairs` nor `rows` the block renders an empty `<dl>`: no mark, no word, no sentence. Its own `Type.ts` says the opposite - \"a caller that writes neither gets no list at all rather than an empty `dl`\" - so the block's doc and the block's behaviour have disagreed for as long as the file has existed, and nobody noticed because both hosts always pass rows.",
		owner: "The Brand family's owner, if a caller ever passes nothing. The arm is unreachable from the site (both hosts pass a mapped array that is never empty) and reachable from any new caller, and the two honest fixes are a prop (`empty`) or a `length === 0` guard. This card did neither: the signature is another host's and the behaviour is documented in the matrix's `EMPTY` cell, so the decision stays visible without a worker changing a contract two pages depend on."
	}
];
/**
* The thirty-five `Dynamic/*` parts, in the order the matrix lists them.
*
* The uncomfortable answer, stated: twenty-five are live, six are mounted only by
* this sheet, four by nothing, and twelve duplicate a block that already exists.
* The `decision` line is an ASK, not a proposal - this card deleted nothing, and
* a file with no importer is a decision the owner has not made yet.
*/
var Verdicts$1 = [
	{
		name: "DYNAMICHEROSECTION",
		file: "COMPONENT/DYNAMIC/DYNAMICHEROSECTION.TSX",
		state: "live",
		mounted_by: ["PAGES/INDEX.ASTRO"],
		note: "The homepage hero: the keeper pair, the trace and the stack.",
		decision: "None. It is the page's opening and the programme's endorsed artifact; this card strengthened it and changed nothing a page prints."
	},
	{
		name: "DOWNLOADMASTHEAD",
		file: "COMPONENT/DYNAMIC/DOWNLOADMASTHEAD.ASTRO",
		state: "live",
		mounted_by: ["PAGES/DOWNLOAD.ASTRO"],
		note: "The Download page's opening: glyph, h1, one sentence, a row of claim marks.",
		decision: "None. It is a keeper, named in `KEEPERS.md`; this card read it and did not touch it."
	},
	{
		name: "DYNAMICHEADER",
		file: "COMPONENT/DYNAMIC/DYNAMICHEADER.TSX",
		state: "orphaned",
		mounted_by: [],
		duplicate: "LAYOUT/HEADER",
		note: "The legacy schema-driven header, reduced to an adapter that renders `Layout/Header` and nothing else.",
		decision: "Retire or adopt. It has no importer and its whole body is now a translation layer between an old schema and the bar; if no page carries the old schema, the file is a translator for a language nothing speaks."
	},
	{
		name: "DYNAMICFOOTER",
		file: "COMPONENT/DYNAMIC/DYNAMICFOOTER.TSX",
		state: "orphaned",
		mounted_by: [],
		duplicate: "LAYOUT/FOOTER + FOOTER/DATA.TS",
		note: "A schema-driven footer with its own social glyphs, 190 lines.",
		decision: "Retire. Every page wears `Layout/Footer`, whose five facts are a `RecordLedger` and whose closing is the `/Contents` part; a second footer with its own glyph set is a second closing record, and two closing records is the one thing the record grammar cannot have."
	},
	{
		name: "DYNAMICDOCSIDEBAR",
		file: "COMPONENT/DYNAMIC/DYNAMICDOCSIDEBAR.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DOC/DOCLAYOUT.ASTRO"],
		duplicate: "DOC/DOCCONTENTS (the rail's register)",
		note: "The documentation tree as a panel, mounted below 1024px where the rail is not painted.",
		decision: "Keep, and read the duplication as deliberate: the panel is the rail's own tree in a second register, which is the responsive arm rather than a copy. It is 630 lines for a tree, which is the part worth a second look."
	},
	{
		name: "DYNAMICPORTAL",
		file: "COMPONENT/DYNAMIC/DYNAMICPORTAL.TSX",
		state: "orphaned",
		mounted_by: [],
		duplicate: "PAGES/PORTAL.ASTRO + CONTENT/SURFACE/PORTAL.TS",
		note: "The four connection tiers as a pricing surface. 1,556 lines - the largest file in the family.",
		decision: "Retire, with the capability preserved: `/Portal` composes the tiers itself from `Content/Surface/Portal.ts` and prints the four protocols as a table. This is the single largest piece of dead code on the site and the one the owner should rule on first."
	},
	{
		name: "DYNAMICTRANSPARENCY",
		file: "COMPONENT/DYNAMIC/DYNAMICTRANSPARENCY.TSX",
		state: "live",
		mounted_by: ["PAGES/DOWNLOAD.ASTRO"],
		duplicate: "RECORDLEDGER (its items are a ledger)",
		note: "The telemetry-transparency panel: what is measured, what is not, and the switch.",
		decision: "Keep. The duplication is a ledger's, which is the Record layer being used rather than copied."
	},
	{
		name: "DYNAMICVERIFICATIONINFO",
		file: "COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",
		state: "orphaned",
		mounted_by: [],
		duplicate: "COMPONENT/DYNAMIC/DOWNLOAD/VERIFY.ASTRO",
		note: "Checksums and signatures with a copy button, driven by `react-i18next`.",
		decision: "Retire or fold. `/Download` prints its checksums through `Download/Verify.astro`, which is live and which already carries the copy control; this file's one distinctive fact is its `alert()` confirmation, which is the wrong shape for the site."
	},
	{
		name: "ACCOUNTPAGE",
		file: "COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX",
		state: "live",
		mounted_by: ["PAGES/ACCOUNT/FORGOTPASSWORD.ASTRO", "PAGES/ACCOUNT/RESETPASSWORD.ASTRO"],
		note: "The account surface's shell, choosing one of four password screens by route.",
		decision: "Keep. It is the shell the two password routes share and the reason they print one head."
	},
	{
		name: "AUTH0ACCOUNT",
		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNT.TSX",
		state: "live",
		mounted_by: ["PAGES/ACCOUNT/SIGNIN.ASTRO", "PAGES/ACCOUNT/SIGNUP.ASTRO"],
		note: "The Auth0 provider boundary for the two credential screens.",
		decision: "Keep. A provider boundary is not a duplicate of anything: it is the seam where a third-party session enters the page."
	},
	{
		name: "AUTH0ACCOUNTGATE",
		file: "COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/AUTH0ACCOUNT.TSX"],
		note: "The gate in front of the account surfaces: prompt, loading or screen.",
		decision: "Keep. It is where `DynamicStateReport` earns its keep."
	},
	{
		name: "AUTH0CALLBACKHANDLER",
		file: "COMPONENT/DYNAMIC/AUTH0CALLBACKHANDLER.TSX",
		state: "live",
		mounted_by: ["PAGES/OAUTH/SUCCESS.ASTRO"],
		note: "The OAuth callback: reads the code, exchanges it, states the outcome.",
		decision: "Keep. It is one route's whole body."
	},
	{
		name: "VERIFYPAGE",
		file: "COMPONENT/DYNAMIC/VERIFYPAGE.TSX",
		state: "live",
		mounted_by: ["PAGES/VERIFY.ASTRO"],
		note: "The `/Verify` surface: the email-verification screen and its five outcomes.",
		decision: "Keep."
	},
	{
		name: "DYNAMICACCOUNTPROFILE",
		file: "COMPONENT/DYNAMIC/DYNAMICACCOUNTPROFILE.TSX",
		state: "live",
		mounted_by: ["PAGES/ACCOUNT/INDEX.ASTRO"],
		note: "The reader's own facts, their provider and their sessions. 1,098 lines.",
		decision: "Keep, and note the size: it is the second-largest file in the family and the one most likely to be hiding a second surface."
	},
	{
		name: "DYNAMICDASHBOARDUSER",
		file: "COMPONENT/DYNAMIC/DYNAMICDASHBOARDUSER.TSX",
		state: "live",
		mounted_by: ["PAGES/DASHBOARD.ASTRO"],
		note: "The dashboard's record: identity, the scan's state and the one thing the page is for.",
		decision: "Keep."
	},
	{
		name: "DYNAMICLOCALFIRSTSCAN",
		file: "COMPONENT/DYNAMIC/DYNAMICLOCALFIRSTSCAN.TSX",
		state: "live",
		mounted_by: ["PAGES/DASHBOARD.ASTRO"],
		note: "The local-first scan: what the editor found on this machine, one state per probe.",
		decision: "Keep. It is the only surface on the site whose per-row loading state is the design rather than a fallback."
	},
	{
		name: "DYNAMICAUTHHEADER",
		file: "COMPONENT/DYNAMIC/DYNAMICAUTHHEADER.TSX",
		state: "live",
		mounted_by: ["PAGES/ACCOUNT/INDEX.ASTRO", "PAGES/DASHBOARD.ASTRO"],
		note: "The header with the auth status inside it.",
		decision: "Keep. It is the bar plus the provider, which is one seam rather than a second bar."
	},
	{
		name: "DYNAMICAUTHSTATUS",
		file: "COMPONENT/DYNAMIC/DYNAMICAUTHSTATUS.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/DYNAMICAUTHHEADER.TSX"],
		note: "The header's action: avatar and dropdown, a sign-in link, or a skeleton.",
		decision: "Keep."
	},
	{
		name: "DYNAMICSTATEPORT",
		file: "COMPONENT/DYNAMIC/DYNAMICSTATEREPORT.TSX",
		state: "live",
		mounted_by: [
			"COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",
			"COMPONENT/DYNAMIC/DYNAMICACCOUNTPROFILE.TSX",
			"COMPONENT/DYNAMIC/DYNAMICDASHBOARDUSER.TSX",
			"COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",
			"COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",
			"COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX"
		],
		duplicate: "SHELL/STATE (the nine adverse states)",
		note: "The one shape every account, verify and dashboard state branch renders. Six importers.",
		decision: "Keep, and read the duplication as a boundary: `ShellState` is the page's adverse state and `DynamicStateReport` is a control's. The two share a vocabulary and a tone table; they do not share a card."
	},
	{
		name: "DYNAMICSIGNIN",
		file: "COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],
		note: "The sign-in form: email, password, the provider's buttons and the report's arms.",
		decision: "Keep."
	},
	{
		name: "DYNAMICSIGNUP",
		file: "COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],
		note: "The sign-up form with the strength meter and the terms checkbox.",
		decision: "Keep."
	},
	{
		name: "DYNAMICFORGOTPASSWORD",
		file: "COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],
		note: "The recovery screen: one field, one submit, the sent arm.",
		decision: "Keep."
	},
	{
		name: "DYNAMICRESETPASSWORD",
		file: "COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/ACCOUNTPAGE.TSX"],
		note: "The reset screen: two password fields, the meter, the token's three outcomes.",
		decision: "Keep."
	},
	{
		name: "DYNAMICEMAILVERIFICATION",
		file: "COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/VERIFYPAGE.TSX"],
		note: "The verification screen: the six-digit code, the resend's cooldown, five outcomes.",
		decision: "Keep."
	},
	{
		name: "DYNAMICCONTACTFORM",
		file: "COMPONENT/DYNAMIC/DYNAMICCONTACTFORM.TSX",
		state: "live",
		mounted_by: ["COMPONENT/CONTACT/CONTACTSHELL.ASTRO"],
		note: "The contact hub's form: thirteen request routes, the field set, the delivery state. 836 lines.",
		decision: "Keep. It is the site's one form with a route chooser, and the chooser is the reason the file is long."
	},
	{
		name: "DYNAMICINPUT",
		file: "COMPONENT/DYNAMIC/DYNAMICINPUT.TSX",
		state: "live",
		mounted_by: [
			"COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",
			"COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",
			"COMPONENT/DYNAMIC/DYNAMICPORTAL.TSX",
			"COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",
			"COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",
			"COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX"
		],
		note: "The field: label, input, helper text and error, with the two ARIA relations the error needs.",
		decision: "Keep. Six importers and the only block in the tree that wires `aria-invalid` to `aria-describedby`."
	},
	{
		name: "DYNAMICLABEL",
		file: "COMPONENT/DYNAMIC/DYNAMICLABEL.TSX",
		state: "lab",
		mounted_by: ["PAGES/SPECIMEN.ASTRO"],
		note: "The label, with `aria-required` and `aria-disabled` stated on the label itself.",
		decision: "Adopt or fold. Its argument - that a label carries its control's conditions - is right and is printed nowhere in production: `DynamicInput` renders its own label inline. Folding it into `DynamicInput` is the one-line fix that would make the argument true."
	},
	{
		name: "DYNAMICCHECKBOX",
		file: "COMPONENT/DYNAMIC/DYNAMICCHECKBOX.TSX",
		state: "live",
		mounted_by: ["COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX"],
		note: "The checkbox with its label, its description and the indeterminate state.",
		decision: "Keep."
	},
	{
		name: "DYNAMICBUTTON",
		file: "COMPONENT/DYNAMIC/DYNAMICBUTTON.TSX",
		state: "live",
		mounted_by: [
			"COMPONENT/DYNAMIC/AUTH0ACCOUNTGATE.TSX",
			"COMPONENT/DYNAMIC/DYNAMICEMAILVERIFICATION.TSX",
			"COMPONENT/DYNAMIC/DYNAMICFORGOTPASSWORD.TSX",
			"COMPONENT/DYNAMIC/DYNAMICRESETPASSWORD.TSX",
			"COMPONENT/DYNAMIC/DYNAMICSIGNIN.TSX",
			"COMPONENT/DYNAMIC/DYNAMICSIGNUP.TSX",
			"COMPONENT/DYNAMIC/DYNAMICVERIFICATIONINFO.TSX",
			"COMPONENT/DYNAMIC/VERIFYPAGE.TSX"
		],
		note: "The button: four variants, three sizes, an icon registry, a loading state that keeps its width.",
		decision: "Keep. Eight importers."
	},
	{
		name: "DYNAMICBADGE",
		file: "COMPONENT/DYNAMIC/DYNAMICBADGE.TSX",
		state: "lab",
		mounted_by: ["PAGES/SPECIMEN.ASTRO"],
		duplicate: "UI/BADGE -> JELLY-BADGE",
		note: "One word in a Jelly badge with an optional protocol dot.",
		decision: "Fold. It is a fifteen-line adapter around `UI/Badge` that adds a dot and a four-entry colour map; the site prints its badges as `<jelly-badge>` with inline properties everywhere else, so this adapter's only unique fact is its dot, which is the mark layer's square."
	},
	{
		name: "DYNAMICCARD",
		file: "COMPONENT/DYNAMIC/DYNAMICCARD.TSX",
		state: "lab",
		mounted_by: ["PAGES/SPECIMEN.ASTRO"],
		duplicate: "THE RECORD LAYER'S CARD ANATOMY (FIELDRECORDDATACARD, FEATURECARD)",
		note: "A Jelly card with three optional sections.",
		decision: "Retire or adopt. It is a second card vocabulary: the homepage's records are `FeatureCard` and `ElementCard`, the brand's is `FieldRecordDataCard`, and none of them is this. A page that adopted it would print cards with no grammar in them."
	},
	{
		name: "DYNAMICBLOGCARD",
		file: "COMPONENT/DYNAMIC/DYNAMICBLOGCARD.TSX",
		state: "lab",
		mounted_by: ["PAGES/SPECIMEN.ASTRO"],
		duplicate: "BLOG/BLOGINDEX'S OWN CARD",
		note: "One blog entry as a card: tags, title, summary, author, read time.",
		decision: "Retire. `/Blog` prints `BlogIndex`'s card, which carries the same five facts plus the record grammar and the anchor; this one prints `0 min read` for an entry with no read time and its title is not a link."
	},
	{
		name: "DYNAMICTABLE",
		file: "COMPONENT/DYNAMIC/DYNAMICTABLE.TSX",
		state: "lab",
		mounted_by: ["PAGES/SPECIMEN.ASTRO"],
		duplicate: "RECORD/RECORDMATRIX",
		note: "A table from a column list and a row list.",
		decision: "Fold. `RecordMatrix` is the layer's matrix and prints the record grammar in its head; this block is a generic table with no mark, no register and an empty arm that renders a head with no body."
	},
	{
		name: "DYNAMICRICHTEXT",
		file: "COMPONENT/DYNAMIC/DYNAMICRICHTEXT.TSX",
		state: "lab",
		mounted_by: ["PAGES/SPECIMEN.ASTRO"],
		duplicate: "UI/RICHTEXT",
		note: "A one-line client island around `UI/RichText`.",
		decision: "Keep. It is the documented bridge for a translated string with `\\n\\n` and backticks, and a one-line adapter that exists because a page needs `client:visible` is a seam rather than a duplicate."
	},
	{
		name: "MERMAIDFALLBACK",
		file: "COMPONENT/DYNAMIC/MERMAIDFALLBACK.ASTRO",
		state: "live",
		mounted_by: ["PAGES/BLOG/[SLUG].ASTRO", "PAGES/DOC/[...SLUG].ASTRO"],
		duplicate: "THE BUILD-TIME REMARK MERMAID PLUGIN",
		note: "The client-side diagram fallback for blocks the build-time plugin could not resolve.",
		decision: "Keep. It is the second half of a two-stage mechanism rather than a copy of the first: 102 SVGs are vendored and none of the sixteen diagrams resolved to one at the last measurement, which is the fallback earning its place."
	}
];
/** How many parts are live. */
var LiveCount = Verdicts$1.filter((Verdict) => Verdict.state === "live").length;
/** How many are mounted only by this sheet. */
var LabCount = Verdicts$1.filter((Verdict) => Verdict.state === "lab").length;
/** How many nothing imports. */
var OrphanCount = Verdicts$1.filter((Verdict) => Verdict.state === "orphaned").length;
/** How many re-implement a block that already exists. */
var DuplicateCount = Verdicts$1.filter((Verdict) => Verdict.duplicate !== void 0).length;
/** The verdicts' own register rows, derived from the list above. */
var VerdictRegister = () => [
	{
		key: "PARTS:",
		value: String(Verdicts$1.length)
	},
	{
		key: "LIVE:",
		value: String(LiveCount)
	},
	{
		key: "LAB ONLY:",
		value: String(LabCount)
	},
	{
		key: "ORPHANED:",
		value: String(OrphanCount)
	},
	{
		key: "DUPLICATING:",
		value: String(DuplicateCount)
	}
];
/**
* The rows, in reading order: the opening, the bands, the manifest, the cards,
* the marks, the filed record, the lab, and the adverse states.
*
* Every row is a state the site either uses or could use, and the `when` line is
* the one thing a picture of a component cannot carry: the sentence that says
* which composition is right. A row printed here that the site never needs is
* still a row: a component that survives its own worst combination is a
* component whose design frame is real.
*/
var Specimens$8 = [
	{
		mark: "CMP_01",
		state_name: "THE PAIR",
		component: "DYNAMICHEROSECTION",
		when: "The homepage's opening: the record at 49, the hairline, the evidence at 51, the trace under both and the stack as its legend.",
		kind: "hero",
		width: "wide"
	},
	{
		mark: "CMP_02",
		state_name: "NO PLATE",
		component: "DYNAMICHEROSECTION",
		when: "A hero whose evidence has not been photographed: the panel keeps its 51%, its height and its caption, and states `PLATE: UNAVAILABLE` with the description under it.",
		kind: "hero",
		width: "wide",
		variant: "noplate"
	},
	{
		mark: "CMP_03",
		state_name: "PLATE LOADING",
		component: "DYNAMICHEROSECTION",
		when: "A hero whose plate has not arrived: the same frame, three barred rules, no spinner - a skeleton drawn in the record grammar.",
		kind: "hero",
		width: "wide",
		variant: "loading"
	},
	{
		mark: "CMP_04",
		state_name: "ONE DESTINATION",
		component: "DYNAMICHEROSECTION",
		when: "A page with one destination: one button and no route line, which is the arm every page but the homepage prints.",
		kind: "hero",
		width: "wide",
		variant: "lone"
	},
	{
		mark: "CMP_05",
		state_name: "NO ACTION",
		component: "DYNAMICHEROSECTION",
		when: "A record handed no entries: no button and no routes, and the card closes on its facts - the arm a page under construction gets.",
		kind: "hero",
		width: "wide",
		variant: "noaction"
	},
	{
		mark: "CMP_06",
		state_name: "THE MASTHEAD",
		component: "DOWNLOADMASTHEAD",
		when: "The Download page's opening at rest: glyph, `h1`, one sentence, then the row of claim marks with their protocol inks.",
		kind: "masthead",
		width: "wide"
	},
	{
		mark: "CMP_07",
		state_name: "LONG CLAIM",
		component: "DOWNLOADMASTHEAD",
		when: "A claim wider than its badge: the row wraps to a second line rather than compressing a chip, which is the only correct answer - a squished chip row is a row that should have wrapped.",
		kind: "masthead",
		width: "wide",
		variant: "long"
	},
	{
		mark: "CMP_08",
		state_name: "NO MARKS",
		component: "DOWNLOADMASTHEAD",
		when: "A masthead with no claims filed: the glyph, the `h1` and the sentence still open the page, because the marks are a row rather than the header's subject.",
		kind: "masthead",
		width: "band",
		variant: "empty"
	},
	{
		mark: "CMP_09",
		state_name: "SIX RECORDS",
		component: "FEATUREBAND",
		when: "The homepage's proof plate: six records, three across from `lg`, one 1px seam, the observation strip filed under it.",
		kind: "featureband",
		width: "wide"
	},
	{
		mark: "CMP_10",
		state_name: "THREE RECORDS",
		component: "FEATUREBAND",
		when: "A proof band that can only stand behind three claims: one row of three at `lg`, two-plus-a-lead below it, and the subset's figure `# RECORDS / 03` under the grid.",
		kind: "featureband",
		width: "wide",
		variant: "three"
	},
	{
		mark: "CMP_11",
		state_name: "ONE RECORD",
		component: "FEATUREBAND",
		when: "A plate of one: the record takes the full seam and the band prints `# RECORDS / 01` - the shape a project with one claim has.",
		kind: "featureband",
		width: "band",
		variant: "one"
	},
	{
		mark: "CMP_12",
		state_name: "NO RECORDS",
		component: "FEATUREBAND",
		when: "A plate handed an empty set: `RECORDS: UNAVAILABLE` and one sentence where the matrix would be, on the record layer's hairline.",
		kind: "featureband",
		width: "band",
		variant: "empty"
	},
	{
		mark: "CMP_13",
		state_name: "TWO STATES",
		component: "ROADMAPBAND",
		when: "The release manifest at rest: one plate, two states, the hero's hairline gutter between them, one ink action in the whole artifact.",
		kind: "roadmap",
		width: "wide"
	},
	{
		mark: "CMP_14",
		state_name: "ONE STATE",
		component: "ROADMAPBAND",
		when: "A project with one release state: the state takes the whole plate and the gutter is not drawn, because the rule is conditional on there being a second column.",
		kind: "roadmap",
		width: "band",
		variant: "one"
	},
	{
		mark: "CMP_15",
		state_name: "THE WALL",
		component: "ARCHITECTUREBAND",
		when: "All fifteen element records as one ragged wall: twelve columns from `lg`, two below it, the spans making the ragged edge that is the artifact's whole point.",
		kind: "architecture",
		width: "wide"
	},
	{
		mark: "CMP_16",
		state_name: "A WALL OF THREE",
		component: "ARCHITECTUREBAND",
		when: "Three element records: the masonry still works, the ragged edge is three spans instead of fifteen, and the band does not require the full set.",
		kind: "architecture",
		width: "wide",
		variant: "three"
	},
	{
		mark: "CMP_17",
		state_name: "THE METHOD",
		component: "WORKINGBAND",
		when: "The page's first 7/1px/5 split: a spacious trace beside a tight register, with the three documented failures ruled under both.",
		kind: "working",
		width: "wide"
	},
	{
		mark: "CMP_18",
		state_name: "A BAND HEAD",
		component: "BAND",
		when: "The shell on its own: `# SERIES_INDEX` ruling to the margin, the kicker, the heading and its qualifier as a 5/7 pair, and the stamp slot where a band carries one.",
		kind: "band",
		width: "wide",
		variant: "stamp"
	},
	{
		mark: "CMP_19",
		state_name: "A SECOND INDEX",
		component: "BAND",
		when: "The same series filed twice on one page: `index` is a prop since this family, so the second band prints `_02` instead of claiming the first band's mark.",
		kind: "band",
		width: "wide",
		variant: "second"
	},
	{
		mark: "CMP_20",
		state_name: "THREE ARTEFACTS",
		component: "PLATFORMBAND",
		when: "The download manifest at rest: three rows, a 20% rule between them, the identity in its own column so the three names line up.",
		kind: "platform",
		width: "wide"
	},
	{
		mark: "CMP_21",
		state_name: "ONE ARTEFACT",
		component: "PLATFORMBAND",
		when: "The day a build exists for one platform: one row and no divider, which is the shape every first release has.",
		kind: "platform",
		width: "band",
		variant: "one"
	},
	{
		mark: "CMP_22",
		state_name: "NO ARTEFACT",
		component: "PLATFORMBAND",
		when: "The day nothing is downloadable: the plate keeps its surface and states `ARTIFACTS: UNAVAILABLE`, why, and `CHANNEL: SOURCE`.",
		kind: "platform",
		width: "band",
		variant: "empty"
	},
	{
		mark: "CMP_23",
		state_name: "A ROW",
		component: "PLATFORMCARD",
		when: "One artefact row alone: seven facts on one wrapping line, the `NOTE:` that explains the three absent ones, the status and the one action.",
		kind: "platformcard",
		width: "band"
	},
	{
		mark: "CMP_24",
		state_name: "THE INK ACTION",
		component: "RELEASECARD",
		when: "`# RELEASE_01`: the state a reader can act on today, and the only filled button in the manifest.",
		kind: "releasecard",
		width: "narrow"
	},
	{
		mark: "CMP_25",
		state_name: "THE ROUTE",
		component: "RELEASECARD",
		when: "`# RELEASE_02`: the state a reader can only watch, so it carries its destination as a `/LABEL` route line - two filled buttons in one plate was two primary actions.",
		kind: "releasecard",
		width: "narrow",
		variant: "route"
	},
	{
		mark: "CMP_26",
		state_name: "A FEATURE RECORD",
		component: "FEATURECARD",
		when: "One cell of the proof matrix: marker, seal, stamps, route, the name as the link out, the status and the four-row ledger, on the element's own tint.",
		kind: "featurecard",
		width: "narrow"
	},
	{
		mark: "CMP_27",
		state_name: "LONG NAME",
		component: "FEATURECARD",
		when: "A name wider than its cell: the title wraps, the seal stays in the marker row, and the arrow never breaks to a line of its own.",
		kind: "featurecard",
		width: "narrow",
		variant: "long"
	},
	{
		mark: "CMP_28",
		state_name: "AN ELEMENT PLATE",
		component: "ELEMENTCARD",
		when: "The `plate` depth: the name row, the role chips, the body, the working register and the trace under it - the card that carries a manual page.",
		kind: "elementcard",
		width: "band"
	},
	{
		mark: "CMP_29",
		state_name: "A RECORD DEPTH",
		component: "ELEMENTCARD",
		when: "The `record` depth: the same card without the trace, which is the reading twelve of the fifteen elements get - the four the reader meets first are the `plate` cards.",
		kind: "elementcard",
		width: "narrow",
		variant: "record"
	},
	{
		mark: "CMP_30",
		state_name: "NO CHIPS",
		component: "ELEMENTCARD",
		when: "An element with no role chips: the chip row is absent rather than empty, and the card closes on its body and its register.",
		kind: "elementcard",
		width: "narrow",
		variant: "nochips"
	},
	{
		mark: "CMP_31",
		state_name: "THE ANATOMY",
		component: "RECORDANATOMY",
		when: "The record middle on its own: two containment stamps, the route over its service line, the status and the ledger - the block both card families share.",
		kind: "anatomy",
		width: "narrow"
	},
	{
		mark: "CMP_32",
		state_name: "AN EMPTY FRAME",
		component: "FIELDRECORDDATACARD",
		when: "The card frame with an empty slot: a white insert with its corner marks and nothing in it - which is a frame doing what a frame does, and the reason every host supplies a record.",
		kind: "datacard",
		width: "narrow"
	},
	{
		mark: "CMP_33",
		state_name: "AT 16",
		component: "FIELDRECORDSEAL",
		when: "The seal inside a chip or a row: drawn at one weight so the form survives - the arm that found the drawing was a smudge below 32px.",
		kind: "seal",
		variant: "xs"
	},
	{
		mark: "CMP_34",
		state_name: "AT 32",
		component: "FIELDRECORDSEAL",
		when: "The seal at the head of a card: one weight, 1px, the site's most common step.",
		kind: "seal",
		variant: "s"
	},
	{
		mark: "CMP_35",
		state_name: "AT 48",
		component: "FIELDRECORDSEAL",
		when: "The seal at the head of a record: the authored pair of weights, 1 and 0.5, which is the engraving.",
		kind: "seal",
		variant: "m"
	},
	{
		mark: "CMP_36",
		state_name: "AT 64",
		component: "FIELDRECORDSEAL",
		when: "The seal at the head of a page: a unit is a pixel and the drawing is exactly what it was drawn to be.",
		kind: "seal",
		variant: "l"
	},
	{
		mark: "CMP_37",
		state_name: "AT 240",
		component: "FIELDRECORDSEAL",
		when: "The seal as the artifact: the roundel at display size, where a unit is 3.75px and the two weights are the engraving again - still `aria-hidden`, still not a control.",
		kind: "seal",
		variant: "xl"
	},
	{
		mark: "CMP_38",
		state_name: "THE NEUTRAL SEAL",
		component: "FIELDRECORDSEAL",
		when: "The one element whose record carries no device: the roundel's own form with the grammar's `◎` in its field - the honest seal for \"no device\", and the reason the wall carries one seal form.",
		kind: "seal",
		variant: "neutral"
	},
	{
		mark: "CMP_39",
		state_name: "THE FRAME",
		component: "CORNERMARKS",
		when: "The picture-frame crosshairs on a white insert: eight ticks, four corners, one geometry module - they frame, they do not shout.",
		kind: "corners",
		width: "narrow"
	},
	{
		mark: "CMP_40",
		state_name: "ATTESTED",
		component: "FIELDRECORDSTATUS",
		when: "`ACTIVE` and `VERIFIED`: the value in the record's ink with the mark layer's square beside it - a shape, not a hue, so the state survives greyscale.",
		kind: "status",
		variant: "attested"
	},
	{
		mark: "CMP_41",
		state_name: "QUIET",
		component: "FIELDRECORDSTATUS",
		when: "`PREPARING` and `ARCHIVED`: the same row at the muted ink, with no square - a state that is deliberately not attested.",
		kind: "status",
		variant: "quiet"
	},
	{
		mark: "CMP_42",
		state_name: "THE ARROW",
		component: "ARROW",
		when: "The external-link mark after a record's own name: `currentColor`, `aria-hidden`, a suffix to a link whose name already says where it goes.",
		kind: "arrow"
	},
	{
		mark: "CMP_43",
		state_name: "THE GRAMMAR'S INKS",
		component: "SEMANTICLEDGER",
		when: "`〈RUST + TAURI〉` and `/COMPAT: VS CODE` at character level: grey brackets, the keyword in its own ink, the value in the record's ink.",
		kind: "ledger",
		width: "narrow"
	},
	{
		mark: "CMP_44",
		state_name: "THE SPECIMEN LABEL",
		component: "SPECIMENLABEL",
		when: "The element-series ledger artifact: ink on the creme canvas, hairline row rules, a 32px seal as the anchor - deliberately not the white FieldRecord box.",
		kind: "specimenlabel",
		width: "narrow"
	},
	{
		mark: "CMP_45",
		state_name: "THE RECORD",
		component: "FIELDRECORD",
		when: "The canonical single-card template at rest: index, seal, stamps, route, program, the blank interval, the title, the status, the metadata and one action.",
		kind: "fieldrecord",
		width: "narrow"
	},
	{
		mark: "CMP_46",
		state_name: "NO ACTION",
		component: "FIELDRECORD",
		when: "A record with no action: the block is not mounted and the card closes on its metadata, which is the arm the 404's record takes.",
		kind: "fieldrecord",
		width: "narrow",
		variant: "noaction"
	},
	{
		mark: "CMP_47",
		state_name: "PARTIAL",
		component: "FIELDRECORD",
		when: "A record whose status could not be resolved: `UNAVAILABLE` at the quiet tone, with the metadata still printed - the vocabulary's word rather than a blank.",
		kind: "fieldrecord",
		width: "narrow",
		variant: "partial"
	},
	{
		mark: "CMP_48",
		state_name: "A BARE MARKER",
		component: "FIELDRECORDINDEX",
		when: "A record with no index: the bare `#` and the space after it - the grammar's mark with no figure, which is the honest form of a record that has none.",
		kind: "index",
		variant: "bare"
	},
	{
		mark: "CMP_49",
		state_name: "SIX PAIRS",
		component: "FIELDRECORDMETADATA",
		when: "A metadata run of six: the key column fixed and `nowrap`, the values wrapping in place - the run has no cap and the card's interval absorbs the growth.",
		kind: "metadata",
		width: "narrow"
	},
	{
		mark: "CMP_50",
		state_name: "THE RECORD ARM",
		component: "FIELDRECORDACTION",
		when: "The route arm: `/LABEL` at the accent, inside a ledger, reading as a route rather than as a control - the secondary destination's voice.",
		kind: "action",
		variant: "record"
	},
	{
		mark: "CMP_51",
		state_name: "THE BUTTON ARM",
		component: "FIELDRECORDACTION",
		when: "The button arm: the card's single control, one per artifact, in the ink fill with the creme label.",
		kind: "action",
		variant: "button"
	},
	{
		mark: "CMP_52",
		state_name: "A PLATE",
		component: "FIELDRECORDEVIDENCE",
		when: "The evidence at rest: one photograph, `object-fit: cover`, no text on it, the caption below where the `RecordFigure` contract puts it.",
		kind: "evidence",
		width: "band"
	},
	{
		mark: "CMP_53",
		state_name: "NO PLATE",
		component: "FIELDRECORDEVIDENCE",
		when: "The plate's absent arm on its own: the frame, `◎`, `PLATE: UNAVAILABLE`, and the description that would have been the alt.",
		kind: "evidence",
		width: "band",
		variant: "absent"
	},
	{
		mark: "CMP_54",
		state_name: "PLATE LOADING",
		component: "FIELDRECORDEVIDENCE",
		when: "The plate's loading arm: the same frame, three barred rules - a skeleton in the record grammar rather than a spinner in a 51% panel.",
		kind: "evidence",
		width: "band",
		variant: "loading"
	},
	{
		mark: "CMP_55",
		state_name: "A PROTOCOL CHIP",
		component: "DYNAMICBADGE",
		when: "A badge with its protocol dot: the word at 13px on the site's light fill with the dot in the spine's own ink - the family's 16px arm. LAB ONLY.",
		kind: "badge"
	},
	{
		mark: "CMP_56",
		state_name: "AN EMPTY CARD",
		component: "DYNAMICCARD",
		when: "A Jelly card with no sections: a white box on the field with nothing in it - printed here because it is the clearest argument for the block's verdict. LAB ONLY.",
		kind: "card",
		width: "narrow",
		variant: "empty"
	},
	{
		mark: "CMP_57",
		state_name: "AN ARTICLE CARD",
		component: "DYNAMICBLOGCARD",
		when: "One blog entry as a card: tags, title, a three-line summary, the author and the read time - and no anchor on the title. LAB ONLY.",
		kind: "blogcard",
		width: "narrow"
	},
	{
		mark: "CMP_58",
		state_name: "A TABLE WITH NO ROWS",
		component: "DYNAMICTABLE",
		when: "A table handed no rows: its head prints and its body does not - the empty arm `RecordMatrix` improves on with a stated absence. LAB ONLY.",
		kind: "table",
		width: "band",
		variant: "empty"
	},
	{
		mark: "CMP_59",
		state_name: "ONE STRING",
		component: "DYNAMICRICHTEXT",
		when: "A translated string parsed: a blank line is a paragraph and a backtick is code - the one-line island that exists so a page can mount the parser lazily. LAB ONLY.",
		kind: "richtext",
		width: "band"
	},
	{
		mark: "CMP_60",
		state_name: "LOADING",
		component: "DYNAMICSTATEPORT",
		when: "The one state that may show a linear indicator: `STATUS: LOADING`, one sentence, no spinner - the account surfaces' resting state.",
		kind: "state",
		width: "band",
		variant: "loading"
	},
	{
		mark: "CMP_61",
		state_name: "INTERRUPTED",
		component: "DYNAMICSTATEPORT",
		when: "A failed read: `STATUS: INTERRUPTED`, the cause, the retry - and `role=\"alert\"`, which is where a failure's urgency belongs rather than in a second colour.",
		kind: "state",
		width: "band",
		variant: "error"
	},
	{
		mark: "CMP_62",
		state_name: "EMPTY",
		component: "DYNAMICSTATEPORT",
		when: "Nothing filed: `STATUS: UNAVAILABLE`, what would be here and why it is not - the block whose whole subject is the adverse state.",
		kind: "state",
		width: "band",
		variant: "empty"
	},
	{
		mark: "CMP_63",
		state_name: "THE SECOND FOOTER",
		component: "DYNAMICFOOTER",
		when: "Not mounted: nothing imports it, and `Layout/Footer` is the footer every page wears. The row states the absence rather than printing a block no page can reach.",
		kind: "absent",
		width: "band",
		variant: "footer"
	},
	{
		mark: "CMP_64",
		state_name: "THE SECOND BAR",
		component: "DYNAMICHEADER",
		when: "Not mounted: nothing imports it, and its whole body is a translation layer between an old schema and `Layout/Header`.",
		kind: "absent",
		width: "band",
		variant: "header"
	},
	{
		mark: "CMP_65",
		state_name: "THE PRICING SURFACE",
		component: "DYNAMICPORTAL",
		when: "Not mounted: nothing imports it, and `/Portal` composes its four tiers from `Content/Surface/Portal.ts`. 1,556 lines - the largest piece of dead code in the family.",
		kind: "absent",
		width: "band",
		variant: "portal"
	},
	{
		mark: "CMP_66",
		state_name: "THE COPY PANEL",
		component: "DYNAMICVERIFICATIONINFO",
		when: "Not mounted: nothing imports it, and `/Download` prints its checksums through `Download/Verify.astro`, which is live.",
		kind: "absent",
		width: "band",
		variant: "verification"
	}
];
/** Which group a row belongs to, from its place in the list. */
var GroupOf$4 = (Row) => {
	const At = Specimens$8.indexOf(Row);
	if (At < 8) return "opening";
	if (At < 19) return "bands";
	if (At < 25) return "manifest";
	if (At < 32) return "cards";
	if (At < 44) return "marks";
	if (At < 54) return "record";
	if (At < 59) return "lab";
	return "adverse";
};
/** The rows in one group, in reading order. */
var InGroup$8 = (Group) => Specimens$8.filter((Row) => GroupOf$4(Row) === Group);
/** The groups, in the plate's order, with the line that says what each one asks. */
var Groups$8 = [
	{
		key: "opening",
		label: "/THE OPENING",
		note: "The page's first artifact in its five arms: the resting pair, a hero with no evidence image, a plate that has not arrived, one destination and none - then the Download masthead at rest, with a claim wider than its badge, and with no claims filed at all."
	},
	{
		key: "bands",
		label: "/THE BANDS",
		note: "The chapters after the opening: the proof plate with six records, with three, with one and with none; the release manifest with two states and with one; the element wall with fifteen and with three; the method band's two densities; and the band head alone - at rest, as a second index of its series, and with its stamp."
	},
	{
		key: "manifest",
		label: "/THE MANIFEST",
		note: "The artifacts that compare facts: the download plate with three rows, with one and with none; a single artefact row; and the two release states, one carrying the ink action and one carrying its destination as a route."
	},
	{
		key: "cards",
		label: "/THE CARDS",
		note: "The record surfaces: a feature cell at rest and with a name wider than its column, an element card at both depths and with no chips, the shared record middle on its own, and the card frame with an empty slot."
	},
	{
		key: "marks",
		label: "/THE MARKS",
		note: "The mark layer, at every step it now has: the seal at 16, 32, 48, 64 and 240 pixels and the neutral roundel for the element with no device; the corner frame; the status row attested and quiet; the arrow; the grammar's character-level inks; and the specimen label. The 16px and 240px rows are the two the family's brief named by hand."
	},
	{
		key: "record",
		label: "/THE FILED RECORD",
		note: "The brand's canonical record: the template at rest, with no action and with a partial status; a bare marker; a six-pair metadata run; the action in both its arms; and the evidence plate in all three of its states - a photograph, an absence and a skeleton."
	},
	{
		key: "lab",
		label: "/THE LAB",
		note: "The parts only this sheet mounts, printed at 1:1 rather than described: a protocol chip, a Jelly card with no sections, an article card, a table with no rows and a parsed string. Five rows for six parts, because `DynamicLabel` is printed by the input family's own plate above."
	},
	{
		key: "adverse",
		label: "/THE ADVERSE",
		note: "The state report's three arms, and the four parts that cannot be printed at all: a second footer, a second bar, a pricing surface and a copy panel, each with the reason and the decision the owner is being asked for."
	}
];
/** How many rows the plate prints. */
var SpecimenCount$7 = Specimens$8.length;
// Source/Content/Specimen/Display.ts
/**
* The twenty-one columns, in reading order.
*
* Nine conditions first, because they are the states a reader meets; then seven
* shapes, because they are what a component is asked to hold; then five contexts,
* because they are the ones a designer forgets.
*/
var Columns$7 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "focus",
		label: "FOCUS",
		ask: "the cursor is in it",
		group: "condition"
	},
	{
		key: "active",
		label: "ACTIVE",
		ask: "the chosen one",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "some facts unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "the action failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "a tighter rhythm",
		group: "shape"
	},
	{
		key: "longtext",
		label: "LONG TEXT",
		ask: "will not fit",
		group: "shape"
	},
	{
		key: "oneitem",
		label: "ONE ITEM",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "manyitems",
		label: "MANY ITEMS",
		ask: "a set of two hundred",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a 16rem column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "the full band",
		group: "shape"
	},
	{
		key: "print",
		label: "PRINT",
		ask: "the printed page",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "context"
	},
	{
		key: "inband",
		label: "IN A BAND",
		ask: "on the creme field",
		group: "context"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "a control beside it",
		group: "context"
	},
	{
		key: "noaction",
		label: "NO ACTION",
		ask: "nothing to press",
		group: "context"
	},
	{
		key: "reducedmotion",
		label: "REDUCED MOTION",
		ask: "the reader asked for less",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$6 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$6 = (reason) => ({
	disposition: "na",
	reason
});
/**
* The nineteen components, in the order a page meets them: the mark, the surface,
* the reading instrument, the two disclosures, the measurement, the quiet ones.
*
* Every row's overrides are reasons. A row with no overrides would be a part that
* survives every combination, and no part does.
*/
var Rows$7 = [
	{
		name: "BADGE",
		file: "COMPONENT/UI/BADGE.TSX",
		note: "One word, one ink pair, at the scale of a label.",
		cells: {
			disabled: NotApplicable$6("A badge is not a control, so it cannot be disabled. A claim that is no longer current prints in the quiet ink, which is a state of the claim and not of the reader's permission."),
			empty: NotApplicable$6("A badge with no text is a coloured rectangle. An empty badge states nothing, so it is not printed at all - the set that would have held it prints its own absence instead."),
			error: NotApplicable$6("A badge carries no action, so it cannot fail. The refusal belongs to the control beside it, and that control is where the STATUS word goes."),
			wide: NotApplicable$6("A badge takes its content's width. A badge at full band width would be a status bar, and the site has one of those in the header."),
			reducedmotion: NotApplicable$6("A badge's only interval is a colour wash on hover, and colour is not motion. There is nothing to remove."),
			rest: Built$6("Four variants and ten ink pairs, at the kit's own size."),
			oneitem: Built$6("A group of one is legal and prints its own count."),
			manyitems: Built$6("`BadgeGroup` prints four and `+N` for the rest.")
		}
	},
	{
		name: "CARD",
		file: "COMPONENT/UI/CARD.TSX",
		note: "A white insert on the field: the surface an artifact is printed on.",
		cells: {
			incard: NotApplicable$6("A card inside a card is the one composition the identity forbids (§1.3). The card is the artifact's surface - one artifact, one card - so there is no second card to nest."),
			oneitem: Built$6("A card holding a single ledger row is legal: the card is the artifact, and an artifact may hold one fact."),
			manyitems: Built$6("Two hundred rows inside one card scroll inside the card; the frame does not grow past the band."),
			reducedmotion: Built$6("The card carries no interval at all - its states are ink and edge - so reduced motion changes nothing, which is the correct answer.")
		}
	},
	{
		name: "TABLE",
		file: "COMPONENT/UI/TABLE.TSX",
		note: "Rows against columns, with a head that names each column.",
		cells: {
			empty: Built$6("`TableEmpty` keeps the head - the schema is still true when there are no rows - and states the absence in the body."),
			oneitem: Built$6("A table of one row prints the head, the row, and the register that says the set is a set of one."),
			narrow: Built$6("`pinFirst` keeps the row's name attached to its cells while the frame scrolls sideways."),
			print: Built$6("The pin is released, the frame opens, and the head repeats on every printed page."),
			reducedmotion: NotApplicable$6("The table's only interval is the row's hover wash and the head's pin, and neither is motion. A disclosure inside a cell owns its own reduced-motion path.")
		}
	},
	{
		name: "TABS",
		file: "COMPONENT/UI/TABS.TSX",
		note: "Sibling views of one subject, one visible at a time.",
		cells: {
			oneitem: NotApplicable$6("One tab is not a choice. A single view prints its title, not a tab strip - a strip of one is a control that answers only itself."),
			wide: NotApplicable$6("A tab strip takes the width of its labels. Stretched across a band it would read as a nav, and the header already is one."),
			empty: Built$6("`TabsEmpty` prints `◎ NO VIEW` where the strip would be."),
			manyitems: Built$6("The strip scrolls and the readout counts the tabs past its trailing edge; zero hides the readout."),
			print: Built$6("The list is hidden and every panel prints under its own name - printing one panel of four would be printing a quarter of the document."),
			reducedmotion: NotApplicable$6("A tab strip has no interval: the panel swap is a state change, and the reveal on focus is `nearest`, which does not animate.")
		}
	},
	{
		name: "ACCORDION",
		file: "COMPONENT/UI/ACCORDION.TSX",
		note: "A stack of disclosures, each closed until asked.",
		cells: {
			active: NotApplicable$6("An accordion has no selected item. Open is not selected: `aria-expanded` is the state, and a stack that also carried a selection would have two states for one region."),
			empty: Built$6("`AccordionEmpty` prints `◎ NO SECTION` instead of a ruled void."),
			manyitems: Built$6("A stack of twelve keeps its rules and its one open panel; the page scrolls and the stack does not."),
			print: Built$6("Every panel prints open, because a printed page cannot be asked to click."),
			reducedmotion: Built$6("The height animation is removed and the panel is simply there: the state survives, the interval does not.")
		}
	},
	{
		name: "COLLAPSIBLE",
		file: "COMPONENT/UI/COLLAPSIBLE.TSX",
		note: "One region, one trigger, no stack.",
		cells: {
			active: NotApplicable$6("A collapsible has no selected item: the region is open or closed, and `aria-expanded` is the whole of its state."),
			manyitems: NotApplicable$6("A collapsible holds one region. Many regions are an accordion, and the family keeps the two apart on purpose - a component that did both would be one component pretending to be two."),
			empty: Built$6("`CollapsibleEmpty` prints `◎ NO REGION`."),
			print: Built$6("The region prints open."),
			reducedmotion: Built$6("The height animation is removed and the region is simply there.")
		}
	},
	{
		name: "PROGRESS",
		file: "COMPONENT/UI/PROGRESS.TSX",
		note: "How far a known job has got, printed as a figure.",
		cells: {
			focus: NotApplicable$6("A progress bar is not focusable. The job it reports owns the focus, and the bar is a figure."),
			disabled: NotApplicable$6("A job cannot be disabled; it can be paused, which is a state of the job rather than of the reader's permission."),
			empty: NotApplicable$6("An empty progress is a track at zero, which is the rest cell. There is no third thing between nothing and a figure."),
			oneitem: NotApplicable$6("One step is a completion, not a measurement: it prints `COMPLETE`, not a bar of one."),
			partial: Built$6("`07 OF UNAVAILABLE` and a stripe, because a proportion needs a denominator and a denominator that is not known is not zero."),
			manyitems: Built$6("Two hundred steps still print one figure and one bar."),
			reducedmotion: Built$6("The stripe parks at a third of the track and the fill snaps to its value.")
		}
	},
	{
		name: "SKELETON",
		file: "COMPONENT/UI/SKELETON.TSX",
		note: "The shape of a record before its data arrives.",
		cells: {
			rest: NotApplicable$6("A skeleton has one state - waiting. At rest it would be an empty shape, which is a decorative box."),
			focus: NotApplicable$6("A skeleton is not focusable. The thing it stands in for will be."),
			active: NotApplicable$6("A skeleton has no chosen state: it is replaced, not selected."),
			disabled: NotApplicable$6("Nothing can be disabled before it exists."),
			empty: NotApplicable$6("A skeleton for an empty set is a lie. If the answer is nothing, the empty state prints, not a placeholder."),
			error: NotApplicable$6("A failed load stops being a skeleton: the error state takes its place and the skeleton is unmounted."),
			stale: NotApplicable$6("A skeleton has no as-of. It is the absence of a value, not an old one."),
			print: NotApplicable$6("A skeleton is never printed. Paper has no waiting."),
			withaction: Built$6("The action's box is drawn at its measure, so the row does not jump when it arrives."),
			reducedmotion: Built$6("The bars are static by design; the only interval is the resolve that replaces them, and that belongs to the arriving record.")
		}
	},
	{
		name: "SEPARATOR",
		file: "COMPONENT/UI/SEPARATOR.TSX",
		note: "One rule, and the label it can carry.",
		cells: {
			focus: NotApplicable$6("A rule is not focusable."),
			active: NotApplicable$6("A rule separates; it is not chosen."),
			disabled: NotApplicable$6("A rule cannot be disabled. A rule that is not wanted is not printed."),
			loading: NotApplicable$6("A rule has nothing to wait for."),
			empty: NotApplicable$6("A separator with nothing on either side separates nothing; the space is the separator there."),
			partial: NotApplicable$6("A rule states no facts, so it cannot state an unknown one."),
			error: NotApplicable$6("A rule cannot fail."),
			stale: NotApplicable$6("A rule has no as-of."),
			oneitem: NotApplicable$6("A rule between one thing and itself is a box."),
			withaction: NotApplicable$6("A rule carries no action. The control that clears a filter is a button, not a separator."),
			reducedmotion: NotApplicable$6("A rule has no interval.")
		}
	},
	{
		name: "AVATAR",
		file: "COMPONENT/UI/AVATAR.TSX",
		note: "One identity at the size of a seal.",
		cells: {
			active: NotApplicable$6("An avatar is not chosen; the record it names is."),
			disabled: NotApplicable$6("An identity cannot be disabled. A record can be archived, and the avatar prints the tombstone: the mark stays and the ink goes."),
			empty: NotApplicable$6("An avatar with no identity is a blank square. The `◎` fallback is the honest form, and it is the partial cell."),
			oneitem: NotApplicable$6("An avatar is one identity by definition. A set of identities is `AvatarGroup`."),
			manyitems: Built$6("`AvatarGroup` overlaps by a quarter and prints `+N` for the identities it does not show."),
			reducedmotion: NotApplicable$6("An avatar has no interval.")
		}
	},
	{
		name: "ALERT",
		file: "COMPONENT/UI/ALERT.TSX",
		note: "A state the reader must read before acting.",
		cells: {
			active: NotApplicable$6("An alert has no chosen state. It is read, and dismissed."),
			disabled: NotApplicable$6("An alert cannot be disabled. A reader who may not act sees the `denied` composition, which is a state of the surface and not of the alert."),
			empty: NotApplicable$6("An alert with nothing in it is a rule. An empty alert states nothing, so it is not printed."),
			oneitem: Built$6("One alert is the normal case."),
			manyitems: Built$6("A stack of alerts is ruled, and each keeps its own word and its own leading edge."),
			print: Built$6("Alerts print with their words and their edges."),
			reducedmotion: Built$6("The entrance is removed; the state is printed, not animated.")
		}
	},
	{
		name: "BREADCRUMB",
		file: "COMPONENT/UI/BREADCRUMB.TSX",
		note: "Where this page sits in the document.",
		cells: {
			disabled: NotApplicable$6("A crumb is a place, not a control. A place that cannot be reached is a tombstone, which the missing state prints."),
			empty: NotApplicable$6("A trail of no crumbs is not a trail. A page with no parent prints its index instead."),
			stale: NotApplicable$6("A trail is structural: it is where the page is, not what it knows, so it has no as-of."),
			longtext: Built$6("`BreadcrumbCollapse` folds the middle into `⋯`, whose title names the places it folded."),
			manyitems: Built$6("Nine places print as first, ellipsis, last two."),
			reducedmotion: NotApplicable$6("The trail does not move.")
		}
	},
	{
		name: "PAGINATION",
		file: "COMPONENT/UI/PAGINATION.TSX",
		note: "Which slice of a long set is printed.",
		cells: {
			stale: NotApplicable$6("A page number is not a fact that ages."),
			empty: Built$6("`PAGE / 00 OF 00` and the strip states that there is no page, which is the empty set's honest figure."),
			partial: Built$6("`PAGE / 03 OF UNAVAILABLE` and the arrows still work: the next page is knowable even when the last one is not."),
			oneitem: Built$6("`PAGE / 01 OF 01` with both arrows disabled."),
			manyitems: Built$6("`PaginationRange` prints seven cells for two hundred pages, with an ellipsis at each open end."),
			print: NotApplicable$6("A pagination control prints links to pages that are not printed. The printed sheet prints all its rows."),
			reducedmotion: NotApplicable$6("A page change is a navigation, not an interval.")
		}
	},
	{
		name: "SCROLLAREA",
		file: "COMPONENT/UI/SCROLLAREA.TSX",
		note: "A window onto content taller than its frame.",
		cells: {
			active: NotApplicable$6("A viewport is not chosen."),
			disabled: NotApplicable$6("A viewport cannot be disabled. A frame that must not scroll is not a scroll area - it is a frame."),
			empty: Built$6("With nothing to scroll the thumb is not drawn, and the frame's register says the set is empty rather than showing a bar that can never move."),
			manyitems: Built$6("`ScrollAreaFrame` prints the count above the fold, where it cannot scroll away."),
			focus: Built$6("The viewport takes the inset ring, because the frame clips an outside ring in half."),
			print: Built$6("The viewport opens and every row prints."),
			oneitem: NotApplicable$6("One row does not scroll. A scroll area around one row is a box with a bar that can never move."),
			reducedmotion: NotApplicable$6("A scroll is the reader's own gesture; there is no interval to remove.")
		}
	},
	{
		name: "RESIZABLE",
		file: "COMPONENT/UI/RESIZABLE.TSX",
		note: "Two panes and the seam a reader sets.",
		cells: {
			loading: NotApplicable$6("Panes are frames; they do not wait. What waits is the content inside one, and that is the skeleton's cell."),
			oneitem: NotApplicable$6("One pane is not a seam. A single pane is a frame."),
			disabled: Built$6("A fixed seam keeps its rule and prints its ratio; it refuses the drag and says so with its cursor."),
			manyitems: Built$6("Four panes, three seams, one ratio line."),
			print: Built$6("The seam prints as a hairline at its set ratio."),
			reducedmotion: Built$6("The drag is the reader's hand; the seam's own transition is removed.")
		}
	},
	{
		name: "CAROUSEL",
		file: "COMPONENT/UI/CAROUSEL.TSX",
		note: "One of a set, one at a time, by choice.",
		cells: {
			empty: Built$6("`CarouselEmpty` prints `◎ SLIDE / 00` instead of a frame with two dead arrows."),
			oneitem: Built$6("One slide: both arrows disabled and `SLIDE / 01 OF 01`."),
			manyitems: Built$6("The dots are marks and the status prints the position, announced once."),
			print: NotApplicable$6("A carousel on paper hides every slide but one. The sheet prints the set as a matrix or a plate instead."),
			reducedmotion: Built$6("The library re-initialises with a zero duration, so the slides snap; the position still changes.")
		}
	},
	{
		name: "CHART",
		file: "COMPONENT/UI/CHART.TSX",
		note: "A figure that argues with numbers.",
		cells: {
			disabled: NotApplicable$6("A figure is not a control. There is nothing to disable; a series that cannot be read prints `UNAVAILABLE`."),
			oneitem: NotApplicable$6("One bar is a number, not a figure. The ledger prints it, at the register, without an axis."),
			empty: Built$6("`ChartEmpty` says what would be plotted and why it is not, instead of drawing a set of axes that claims a scale it does not have."),
			loading: Built$6("The axes print and the bars do not: the shape is known before the values are."),
			partial: Built$6("A gap in the series is a gap, never a zero - a zero is a measurement."),
			stale: Built$6("The frame prints the as-of and the values stay visible."),
			reducedmotion: Built$6("The bars are drawn at their final height; there is no draw-in to remove.")
		}
	},
	{
		name: "CALENDAR",
		file: "COMPONENT/UI/CALENDAR.TSX",
		note: "A month, printed or picked.",
		cells: {
			empty: Built$6("`◎ NO MARK` on the plate, and the days still print: an empty month is a fact about the period."),
			partial: Built$6("The month prints and the period's facts say `UNAVAILABLE`."),
			longtext: NotApplicable$6("A day cell holds a number and a mark. A long label belongs beside the month, not inside a day."),
			oneitem: NotApplicable$6("A calendar is a month. A set of one day is a date, and a date prints as a register line."),
			print: Built$6("The plate prints with its register."),
			reducedmotion: NotApplicable$6("A month does not move; a month change is a new plate.")
		}
	},
	{
		name: "SONNER",
		file: "COMPONENT/UI/SONNER.TSX",
		note: "A receipt for an action that has already happened.",
		cells: {
			active: NotApplicable$6("A receipt is not chosen; it is read or dismissed."),
			disabled: NotApplicable$6("A receipt cannot be disabled. The action it reports can be, and the receipt says so."),
			empty: NotApplicable$6("An empty receipt is a frame with no sentence. A receipt states an action or it is not printed."),
			manyitems: Built$6("Three receipts stack; each keeps its own edge and its own undo."),
			stale: Built$6("A receipt older than its action prints the age, and a route change dismisses it."),
			wide: NotApplicable$6("A receipt is a slip at the corner. Stretched across a band it would be an alert, and the alert is the component for that."),
			print: NotApplicable$6("A receipt is the four seconds after an action. Paper has no four seconds.")
		}
	}
];
/**
* One cell of the matrix.
*
* A row lists only its exceptions, so a missing entry is `BUILT` - and that default
* is what makes every `N/A` in this file a sentence someone had to write rather
* than a blank someone left.
*/
var MatrixCell$7 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$6 = () => Rows$7.flatMap((row) => Columns$7.map((column) => ({
	row,
	column,
	cell: MatrixCell$7(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$7 = Rows$7.length * Columns$7.length;
/** How many cells the family builds. */
var BuiltCount$7 = MatrixCells$6().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$7 = CellCount$7 - BuiltCount$7;
/** How many cells one row builds. */
var BuiltOf$7 = (Row) => Columns$7.filter((Column) => MatrixCell$7(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$5 = (Column) => Rows$7.filter((Row) => MatrixCell$7(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$7 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$7.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$7.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$7)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$7)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$7)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$7.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/DISPLAY.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The two components the document does not mount, and the verdict on each.
*
* The task's own instruction: "Chart and Calendar may be unused - if so, say whether
* they should exist at all rather than deleting them." Deleting either would be a
* deletion without instruction; keeping either without an argument would be a file
* waiting for someone. So both are argued, and both are printed on the sheet.
*/
var Verdicts = [{
	component: "CHART",
	keep: true,
	question: "Does the document make a claim that a length argues better than a ledger?",
	answer: "Yes, in one place and one only: the register counts and the four connection tiers are a comparison where the SHAPE is the claim. A ledger states `04`, `04`, `04`; a figure states that the four are equal at a glance, which is the sentence the page is making. So the chart stays - and it stays as a plate with a register, a caption and an as-of, because a figure without provenance is a picture. It is not mounted yet because no page has needed it since the matrices were built; the first page that does will find it finished rather than find a kit default.",
	mounted: "UNAVAILABLE"
}, {
	component: "CALENDAR",
	keep: true,
	question: "Is anything in the document a date the reader picks, or a period the reader reads?",
	answer: "Nothing is picked, and that is the argument against a date-picker. But three things are read: the release manifest's dates, the `as of` on every measurement, and the age of a stale record. A date's meaning is its neighbours - `14 NOV` is a fact, and a month with the 14th marked is that fact's context - so the month stays as a PLATE (`CalendarPlate`), not as an input. If the document ever asks a reader to choose a day, that is a new decision and it is not this one.",
	mounted: "UNAVAILABLE"
}];
/**
* The live rows.
*
* Ordered as the matrix's groups: what the document reads with, then how it
* discloses, then how it measures, then what it says quietly. Every one of the
* nineteen components appears at least once, and the rows that carry a context are
* the same component in two different boxes - which is the claim this family has to
* prove.
*/
var Specimens$7 = [
	{
		mark: "01",
		group: "read",
		state: "REST",
		component: "Table",
		when: "A set read across: the head names the columns, the rows are ruled above, and the caption carries the figure.",
		kind: "table",
		register: "TIERS",
		rows: 4,
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "02",
		group: "read",
		state: "DENSE",
		component: "Table",
		when: "A long comparison scanned rather than read: half the row rhythm, the same type, the same rules.",
		kind: "table",
		register: "RELEASES",
		rows: 7,
		dense: true,
		columns: [
			"RELEASE",
			"DATE",
			"CHANNEL",
			"STATUS"
		]
	},
	{
		mark: "03",
		group: "read",
		state: "STICKY HEAD",
		component: "Table",
		when: "More rows than the frame holds: the head stays at the top and the first column stays at the edge.",
		kind: "table",
		register: "ROUTES",
		rows: 14,
		sticky: true,
		columns: [
			"ROUTE",
			"LAYER",
			"STATUS"
		]
	},
	{
		mark: "04",
		group: "read",
		state: "EMPTY",
		component: "Table",
		when: "No rows yet: the head is the schema and it stays; the row says what would be here, why it is not, and where to read it.",
		kind: "table",
		register: "TIERS",
		rows: 0,
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "05",
		group: "read",
		state: "ONE ROW",
		component: "Table",
		when: "A set of one: the head and the register are what make the state legible, because a bare row cannot say it is a set.",
		kind: "table",
		register: "TIERS",
		rows: 1,
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "06",
		group: "read",
		state: "PARTIAL",
		component: "Table",
		when: "Some facts unknown: an honest UNAVAILABLE in the cell, never a zero and never a blank.",
		kind: "table",
		register: "TIERS",
		rows: 3,
		variant: "partial",
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "07",
		group: "read",
		state: "NARROW",
		component: "Table",
		when: "A five-column table in a 360px band: the frame scrolls sideways and the row's name stays attached to its cells.",
		kind: "table",
		register: "ROUTES",
		rows: 4,
		width: "narrow",
		columns: [
			"ROUTE",
			"LAYER",
			"STATUS"
		]
	},
	{
		mark: "08",
		group: "read",
		state: "REST",
		component: "Card",
		when: "One artifact on one white insert: the register names the record, the title says what it is about, the foot states the status.",
		kind: "card",
		register: "RELEASE_01",
		title: "WHAT IT CARRIES",
		note: "A header with a register and a title, a body with its sentence, and a foot that prints the state."
	},
	{
		mark: "09",
		group: "read",
		state: "EMPTY",
		component: "Card",
		when: "The body arrived and holds nothing: the insert keeps its frame and states the absence at its foot.",
		kind: "card",
		register: "RELEASE_01",
		title: "WHAT IT CARRIES",
		variant: "empty",
		note: "No row is filed against this release yet."
	},
	{
		mark: "10",
		group: "read",
		state: "STALE",
		component: "Card",
		when: "The values are older than their as-of: the card says the age and keeps the last known value visible.",
		kind: "card",
		register: "RELEASE_01",
		title: "WHAT IT CARRIES",
		variant: "stale",
		note: "The figures are as of 14 NOV 2026 - 318 days old."
	},
	{
		mark: "11",
		group: "read",
		state: "TONES",
		component: "Badge",
		when: "A claim carries its own ink: gRPC is green because it is gRPC, Tauri is amber because it is Tauri.",
		kind: "badgegroup",
		rows: 6
	},
	{
		mark: "12",
		group: "read",
		state: "MANY ITEMS",
		component: "Badge",
		when: "A set of nine claims in a narrow column: four print and the fifth cell is the count of the rest.",
		kind: "badgegroup",
		rows: 9,
		width: "narrow"
	},
	{
		mark: "13",
		group: "disclosure",
		state: "REST",
		component: "Tabs",
		when: "Three sibling views of one subject: the chosen tab is the pulled-out sheet on the track.",
		kind: "tabs",
		rows: 3
	},
	{
		mark: "14",
		group: "disclosure",
		state: "NO TABS FIT",
		component: "Tabs",
		when: "The labels are wider than the band: the strip scrolls and the readout counts what is past its edge.",
		kind: "tabs",
		rows: 9,
		width: "narrow"
	},
	{
		mark: "15",
		group: "disclosure",
		state: "EMPTY",
		component: "Tabs",
		when: "No view is filed: the strip prints `◎ NO VIEW` rather than a track with nothing on it.",
		kind: "tabs",
		rows: 0
	},
	{
		mark: "16",
		group: "disclosure",
		state: "REST",
		component: "Accordion",
		when: "A stack of three sections, one open: the open trigger is a head - 500 weight, ink, and the rule under it.",
		kind: "accordion",
		rows: 3
	},
	{
		mark: "17",
		group: "disclosure",
		state: "EMPTY",
		component: "Accordion",
		when: "A stack with no sections: `◎ NO SECTION`, because a ruled void is not a disclosure.",
		kind: "accordion",
		rows: 0
	},
	{
		mark: "18",
		group: "disclosure",
		state: "REST",
		component: "Collapsible",
		when: "One region, closed: the trigger prints `→`, which is the grammar's mark for more behind it.",
		kind: "collapsible",
		rows: 1
	},
	{
		mark: "19",
		group: "disclosure",
		state: "OPEN",
		component: "Collapsible",
		when: "One region, open: the mark turns to `↳` and the label goes to 500, so the line reads as a head.",
		kind: "collapsible",
		rows: 1,
		variant: "open"
	},
	{
		mark: "20",
		group: "disclosure",
		state: "REDUCED MOTION",
		component: "Accordion",
		when: "The reader asked for less: the panel is simply there, with no height interval - the state survives and the time does not.",
		kind: "accordion",
		rows: 2,
		variant: "reduce"
	},
	{
		mark: "21",
		group: "measure",
		state: "RUNNING",
		component: "Progress",
		when: "A job whose length is known: the bar is the picture and the register line is the figure.",
		kind: "progress",
		label: "PREPARING",
		value: 7,
		max: 12
	},
	{
		mark: "22",
		group: "measure",
		state: "INDETERMINATE",
		component: "Progress",
		when: "The length is not known: a stripe at a third of the track, and `UNAVAILABLE` for the total rather than a guess.",
		kind: "progress",
		label: "LOADING",
		value: 0,
		max: 0,
		variant: "loading"
	},
	{
		mark: "23",
		group: "measure",
		state: "FAILED",
		component: "Progress",
		when: "The job refused: the destructive ink, and the bar stops where it stopped so the work done is still visible.",
		kind: "progress",
		label: "INTERRUPTED",
		value: 4,
		max: 12,
		variant: "failed"
	},
	{
		mark: "24",
		group: "measure",
		state: "COMPLETE",
		component: "Progress",
		when: "The one thing in this family that authenticates: completion takes the accent, and nothing else does.",
		kind: "progress",
		label: "VERIFIED",
		value: 12,
		max: 12,
		variant: "complete"
	},
	{
		mark: "25",
		group: "measure",
		state: "RECORD",
		component: "Skeleton",
		when: "A record that has not arrived: the register line, the keys it will print, their values barred, and what is waited on.",
		kind: "skeleton",
		register: "# LOADING / 04",
		rows: 4,
		variant: "record"
	},
	{
		mark: "26",
		group: "measure",
		state: "MATRIX",
		component: "Skeleton",
		when: "A table that has not arrived: the head prints because the schema is already true, and the cells are bars.",
		kind: "skeleton",
		register: "# LOADING / 03",
		rows: 3,
		variant: "matrix",
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "27",
		group: "measure",
		state: "FIGURE",
		component: "Chart",
		when: "A claim where the shape is the sentence: four tiers, four equal lengths, at a glance.",
		kind: "chart",
		register: "TIERS",
		rows: 4
	},
	{
		mark: "28",
		group: "measure",
		state: "EMPTY",
		component: "Chart",
		when: "No series: the figure says what would be plotted and why it is not, instead of drawing axes that claim a scale.",
		kind: "chart",
		register: "TIERS",
		rows: 0
	},
	{
		mark: "29",
		group: "measure",
		state: "PLATE",
		component: "Calendar",
		when: "A month read rather than picked: a date's meaning is its neighbours, and the plate prints them.",
		kind: "calendar",
		register: "RELEASES",
		rows: 1
	},
	{
		mark: "30",
		group: "measure",
		state: "EMPTY",
		component: "Calendar",
		when: "A month with no mark: the days still print and the plate says the period is empty, which is a fact about the month.",
		kind: "calendar",
		register: "RELEASES",
		rows: 1,
		variant: "empty"
	},
	{
		mark: "31",
		group: "quiet",
		state: "LABELLED",
		component: "Separator",
		when: "A rule that names what it separates: the register printed in the seam, at the meta register.",
		kind: "separator",
		label: "WHAT CHANGES",
		value: 4
	},
	{
		mark: "32",
		group: "quiet",
		state: "SET",
		component: "Avatar",
		when: "A set of identities: four marks overlap by a quarter and the fifth cell is the count of the rest.",
		kind: "avatargroup",
		rows: 7
	},
	{
		mark: "33",
		group: "quiet",
		state: "UNKNOWN",
		component: "Avatar",
		when: "An identity that is not known: `◎`, which says which fallback it is, instead of a blank square.",
		kind: "avatar",
		variant: "unknown"
	},
	{
		mark: "34",
		group: "quiet",
		state: "ERROR",
		component: "Alert",
		when: "A failed action: the state word, the cause, the next step and the retry - and a rule at the edge, not a red box.",
		kind: "alert",
		label: "STATUS: UNAVAILABLE",
		variant: "error",
		note: "The verification could not reach the release record. Nothing was changed.",
		action: "RETRY"
	},
	{
		mark: "35",
		group: "quiet",
		state: "STALE",
		component: "Alert",
		when: "A figure older than its as-of: the alert keeps the value visible and states the age.",
		kind: "alert",
		label: "STATUS: ARCHIVED",
		variant: "stale",
		note: "The last known figure is as of 14 NOV 2026 - 318 days old."
	},
	{
		mark: "36",
		group: "quiet",
		state: "REST",
		component: "Breadcrumb",
		when: "Where the page sits: `/` before every place, `→` between them, and the current place marked at its foot.",
		kind: "breadcrumb",
		rows: 4
	},
	{
		mark: "37",
		group: "quiet",
		state: "COLLAPSED",
		component: "Breadcrumb",
		when: "A trail of nine places in a narrow band: first, `⋯`, last two - and the ellipsis names what it folded.",
		kind: "breadcrumb",
		rows: 9,
		width: "narrow"
	},
	{
		mark: "38",
		group: "quiet",
		state: "MANY PAGES",
		component: "Pagination",
		when: "Two hundred pages: the register prints the position and the range prints seven cells with an ellipsis at each open end.",
		kind: "pagination",
		rows: 200,
		value: 3
	},
	{
		mark: "39",
		group: "quiet",
		state: "ONE PAGE",
		component: "Pagination",
		when: "A set of one page: the control stays and states `01 OF 01`, with both arrows disabled.",
		kind: "pagination",
		rows: 1,
		value: 1
	},
	{
		mark: "40",
		group: "quiet",
		state: "FRAME",
		component: "ScrollArea",
		when: "Content taller than its frame: the register prints the count above the fold, where it cannot scroll away.",
		kind: "scrollarea",
		register: "LEDGER",
		rows: 24
	},
	{
		mark: "41",
		group: "quiet",
		state: "SEAM",
		component: "Resizable",
		when: "Two panes and a seam a reader sets: the register prints the ratio the seam is holding.",
		kind: "resizable",
		register: "PANES",
		rows: 2
	},
	{
		mark: "42",
		group: "quiet",
		state: "STATUS",
		component: "Carousel",
		when: "One of a set, one at a time: the position is printed and announced once, and the dots are marks.",
		kind: "carousel",
		register: "PLATES",
		rows: 4
	},
	{
		mark: "43",
		group: "quiet",
		state: "RECEIPT",
		component: "Sonner",
		when: "The four seconds after an action: the state word, the sentence, and the undo - printed inline, and fired for real.",
		kind: "sonner",
		label: "VERIFIED",
		note: "The release record was written.",
		action: "UNDO"
	},
	{
		mark: "44",
		group: "quiet",
		state: "FAILED",
		component: "Sonner",
		when: "A receipt for a refused action: the destructive ink on its leading edge, and no undo, because there is nothing to take back.",
		kind: "sonner",
		label: "UNAVAILABLE",
		variant: "error",
		note: "The copy control could not reach the clipboard."
	}
];
/** The rows of one group, in the sheet's order. */
var InGroup$7 = (Group) => Specimens$7.filter((Specimen) => Specimen.group === Group);
/** The four groups, in the order they are read. */
var Groups$7 = [
	{
		key: "read",
		label: "/WHAT THE DOCUMENT READS WITH",
		note: "The instruments the page carries its facts in: a table read across, a card that is one artifact, and the marks that name a claim. Every row here is a state of the same three parts, because the reading instruments are the ones whose adverse states nobody notices are missing."
	},
	{
		key: "disclosure",
		label: "/HOW IT DISCLOSES",
		note: "Four parts, two grammars: a strip of sibling views and a stack of closed sections. The states are the ones that only appear when the labels are too long, the set is empty, or the reader asked for less motion - and all three are printed here rather than assumed."
	},
	{
		key: "measure",
		label: "/HOW IT MEASURES",
		note: "A job's progress, a record that has not arrived, a figure that argues, and a month. The two components the document does not mount are here, with the verdict on whether they should exist at all - printed rather than filed away."
	},
	{
		key: "quiet",
		label: "/WHAT IT SAYS QUIETLY",
		note: "The parts that carry a page without being read: the rule that names its seam, the seal that stands for a person, the alert that states a failure, the trail, the page control, the frame, the seam, the position, and the receipt. A family is judged by these, because they are the ones a reader never notices working."
	}
];
Specimens$7.length;
// Source/Content/Specimen/Field.ts
/**
* The twenty-three columns, in reading order: what the field is doing, what it
* is asked to hold, then where it is put. Conditions first because they are the
* states a reader meets; contexts last because they are the ones a designer
* forgets.
*/
var Columns$6 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "focus",
		label: "FOCUS",
		ask: "the cursor is in it",
		group: "condition"
	},
	{
		key: "filled",
		label: "FILLED",
		ask: "holds a value",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "invalid",
		label: "INVALID",
		ask: "the value was refused",
		group: "condition"
	},
	{
		key: "valid",
		label: "VALID",
		ask: "the value passed",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be edited",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "may be quoted, not changed",
		group: "condition"
	},
	{
		key: "required",
		label: "REQUIRED",
		ask: "the form needs it",
		group: "condition"
	},
	{
		key: "hint",
		label: "HINT",
		ask: "a sentence under it",
		group: "condition"
	},
	{
		key: "counter",
		label: "COUNTER",
		ask: "a limit it can see",
		group: "condition"
	},
	{
		key: "addon",
		label: "ADDON",
		ask: "a prefix or a suffix",
		group: "condition"
	},
	{
		key: "action",
		label: "ACTION",
		ask: "one thing to do with it",
		group: "condition"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "a settings list",
		group: "shape"
	},
	{
		key: "longtext",
		label: "LONG TEXT",
		ask: "a label that will not fit",
		group: "shape"
	},
	{
		key: "oneitem",
		label: "ONE ITEM",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "manyitems",
		label: "MANY ITEMS",
		ask: "a set of forty",
		group: "shape"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "the value has not arrived",
		group: "shape"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "some of it is known",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a 16rem column",
		group: "context"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a 60rem band",
		group: "context"
	},
	{
		key: "card",
		label: "CARD",
		ask: "on a white insert",
		group: "context"
	},
	{
		key: "band",
		label: "BAND",
		ask: "on the creme field",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$5 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$5 = (reason) => ({
	disposition: "na",
	reason
});
/**
* The ten components, in the family's own order: the control, the multi-line
* control, the label that names both, then the four choice controls, then the
* two composite ones, then the form that holds them all.
*
* Every row's overrides are reasons. A row with no overrides would be a part
* that survives every combination, and no part does.
*/
var Rows$6 = [
	{
		name: "INPUT",
		file: "COMPONENT/UI/INPUT.TSX",
		note: "One line of text, in the site's field frame.",
		cells: {
			oneitem: NotApplicable$5("An input holds one value. A set of one is a Select's or a radio group's subject, not an input's."),
			manyitems: NotApplicable$5("An input has no members. The set it belongs to is the form's, and the form's row owns that column."),
			partial: Built$5("The foot prints `↳VERIFIED BY: UNAVAILABLE` - the value arrived, the fact that would confirm it did not."),
			loading: Built$5("The skeleton in the record grammar: a `LOADING` marker and one barred rule, never a spinner."),
			action: Built$5("`Field--row`: the control and its action share a line at wide and stack at narrow, on a container query."),
			counter: Built$5("The count is derived from the control's own value, and turns over-limit at the limit rather than after it.")
		}
	},
	{
		name: "TEXTAREA",
		file: "COMPONENT/UI/TEXTAREA.TSX",
		note: "A paragraph, in the same frame as one line.",
		cells: {
			oneitem: NotApplicable$5("A textarea holds one value, however many lines it takes."),
			manyitems: NotApplicable$5("Its members are lines, and lines are not items a control selects between."),
			addon: NotApplicable$5("A prefix hangs in a first-line gutter, and a multi-line box has none: the prefix would sit beside the box, not inside it. The suffix is built - it is the counter."),
			counter: Built$5("The canonical use: `180 / 240` in the foot, and the last ten characters turn the count to the error's ink."),
			partial: Built$5("The foot names the fact that did not arrive, under the value that did.")
		}
	},
	{
		name: "LABEL",
		file: "COMPONENT/UI/LABEL.TSX",
		note: "The word that names a control, and its own register.",
		cells: {
			focus: NotApplicable$5("A label is not focusable. It carries the field's focus through `for`, and a ring of its own would be a second target for one field."),
			filled: NotApplicable$5("A label has no value to fill."),
			empty: NotApplicable$5("A label is a word: it is present or it is absent. An empty label is a control with no name, which is a defect rather than a state."),
			valid: NotApplicable$5("A passed value is the control's fact. The label states what the field wants, never whether it got it."),
			readonly: Built$5("The label's meta slot prints `READ-ONLY` - the field's own register, in the label's row rather than in a note beside the box."),
			required: Built$5("The asterisk and `aria-required` travel together: the glyph is what a reader scans for, the attribute is what a screen reader is told."),
			counter: Built$5("The counter lives in the label's meta slot at wide, so the foot holds only sentences."),
			addon: NotApplicable$5("An addon belongs to the control's box. A label has no box."),
			action: Built$5("`Field__Head` takes an action: the one link that belongs to the field's name, not to its value."),
			longtext: Built$5("A label wraps at `overflow-wrap: anywhere`, so a path or an address that will not fit breaks instead of overflowing."),
			oneitem: NotApplicable$5("A label names one control; it has no set."),
			manyitems: NotApplicable$5("A label names one control; it has no set."),
			loading: NotApplicable$5("A label is printed with the skeleton, not loaded by it - the schema is the one thing a loading field already knows."),
			partial: NotApplicable$5("A label states what the field wants. What arrived is the control's sentence.")
		}
	},
	{
		name: "CHECKBOX",
		file: "COMPONENT/UI/CHECKBOX.TSX",
		note: "One mark, one sentence, and a group of both.",
		cells: {
			readonly: NotApplicable$5("HTML has no read-only checkbox. A value that must not change is `disabled` with the value printed beside it - a checkbox that looks pressable and is not is worse than one that says it cannot be pressed."),
			counter: NotApplicable$5("Nothing to count. The selection count belongs to the group, and the group's row is `MANY ITEMS`."),
			addon: NotApplicable$5("A checkbox has no box for an addon to sit in."),
			manyitems: Built$5("A group of twelve with a selection count in its head: `3 OF 12 SELECTED`, derived from the group's own state."),
			partial: NotApplicable$5("A checkbox is a boolean: it is known or it is not, and not-known is the skeleton."),
			action: Built$5("A consent row with `SELECT ALL` in the group's head.")
		}
	},
	{
		name: "RADIO GROUP",
		file: "COMPONENT/UI/RADIOGROUP.TSX",
		note: "One of a set, with the set stated.",
		cells: {
			readonly: NotApplicable$5("A radio group that cannot change is `disabled`; a read-only radio is a mark that lies about being pressable."),
			counter: NotApplicable$5("A radio group selects one, so there is no selection to count. Its size is the option count, which is `MANY ITEMS`."),
			addon: NotApplicable$5("A group has no box; its frame is its legend."),
			oneitem: Built$5("A group of one is degenerate and still a group: the legend, the one option, and the required mark."),
			manyitems: Built$5("Twelve options, ruled at the tight interval."),
			partial: NotApplicable$5("One of a set is either chosen or not. There is no half-chosen radio.")
		}
	},
	{
		name: "SWITCH",
		file: "COMPONENT/UI/SWITCH.TSX",
		note: "A boolean that takes effect at once.",
		cells: {
			readonly: NotApplicable$5("A switch that cannot be flipped is disabled. A read-only switch would be a control that looks like it will answer and will not."),
			required: NotApplicable$5("A switch has a default, so it is never empty and never missing. A gate that must be on is a required checkbox, where the mark is the consent."),
			counter: NotApplicable$5("A boolean has nothing to count."),
			addon: NotApplicable$5("A switch has no box for an addon to sit in."),
			oneitem: NotApplicable$5("A switch is one boolean; it has no set."),
			manyitems: NotApplicable$5("A row of switches is a settings list - a `FieldSet` of switches, not one switch with members."),
			partial: NotApplicable$5("A switch reports a state it holds; a state it does not know yet is the skeleton."),
			filled: Built$5("On: the thumb at the far end and the state word in the row."),
			empty: Built$5("Off: the same row, the same word, no fill - the off state is a state, not a hole.")
		}
	},
	{
		name: "SLIDER",
		file: "COMPONENT/UI/SLIDER.TSX",
		note: "A value chosen from a range, printed.",
		cells: {
			empty: NotApplicable$5("A slider cannot be empty: it starts at its minimum, and a range with no value is not a range."),
			invalid: NotApplicable$5("The track enforces its own bounds, so a value outside them is impossible. A slider that must be above a floor states the floor in its hint, not in an error."),
			valid: NotApplicable$5("There is no invalid to be the opposite of, so a valid slider would be a green mark with nothing behind it."),
			readonly: NotApplicable$5("A slider is a control; one that cannot move is disabled. A value the reader may only read is printed, not slid."),
			required: NotApplicable$5("A slider always has a value, so it is never the thing a form is missing."),
			counter: Built$5("The readout: `N / MAX` in the register beside the track, derived from the thumb's own position."),
			addon: Built$5("A unit suffix - `%`, `MB`, `PT` - printed at the track's end, in the readout."),
			oneitem: NotApplicable$5("A slider is one value; it has no members."),
			manyitems: NotApplicable$5("A range is continuous. A set of ranges is a matrix, not a slider."),
			partial: NotApplicable$5("A slider's value is always a number the reader chose; there is no half-known position.")
		}
	},
	{
		name: "SELECT",
		file: "COMPONENT/UI/SELECT.TSX",
		note: "One of a list, opened in a slip.",
		cells: {
			readonly: NotApplicable$5("A select has no read-only state. A value that must not change is printed as a value, not offered as a choice."),
			counter: Built$5("The option count in the foot - `40 OPTIONS` - not a character count: a select's limit is its list, not its text."),
			addon: NotApplicable$5("The trigger is already a frame with a `:` label and its disclosure mark. An addon would be a second frame inside the first."),
			dense: Built$5("The trigger's default height is the dense form of a field - 32px, at the meta register - so the select is the one control whose rest state is already a settings list."),
			longtext: Built$5("The value ellipses in the trigger and prints in full in the slip."),
			oneitem: Built$5("A list of one still opens, and the slip states that it holds one option."),
			manyitems: Built$5("Forty options scroll inside the slip, and the foot states the count."),
			partial: Built$5("`UNAVAILABLE` as the trigger's value: a field whose stored value is not in the list it is being offered.")
		}
	},
	{
		name: "INPUT OTP",
		file: "COMPONENT/UI/INPUTOTP.TSX",
		note: "A code, one slot at a time.",
		cells: {
			readonly: NotApplicable$5("A code that must not change is disabled once accepted, and the acceptance is a sentence under it."),
			addon: NotApplicable$5("The slots are the box. A prefix would be a seventh cell that is not part of the code."),
			longtext: NotApplicable$5("A code's length is fixed by its slots, so there is no long text - an eight-character code is `MANY ITEMS`, not a long one."),
			oneitem: NotApplicable$5("One slot is not a code; a code is a fixed set of slots."),
			manyitems: Built$5("Eight slots, grouped four and four."),
			counter: Built$5("The progress: `3 / 6`, derived from the code's own length."),
			partial: Built$5("The partial state's best example: three of six slots filled, and the count says which three of six."),
			action: Built$5("`RESEND` beside the code, in the field's action slot.")
		}
	},
	{
		name: "FORM",
		file: "COMPONENT/UI/FORM.TSX",
		note: "The fields, and the receipt of what they refused.",
		cells: {
			readonly: NotApplicable$5("A form is open or it is closed. A form the reader may not change is a receipt, and the receipt is its own block."),
			addon: NotApplicable$5("A form has no addon. The prefix of a form is its route, and the route is the page's, not the block's."),
			disabled: Built$5("Not a disabled form: an unarmed action. The primary is `aria-disabled` until every required field carries a value, and pressing it explains rather than refuses."),
			counter: Built$5("The summary's head: `3 FIELDS`, counted from the rows it prints."),
			invalid: Built$5("`INTERRUPTED`, the count, and one focusable line per refused field."),
			valid: Built$5("`READY`, and the primary action armed."),
			empty: Built$5("No field filed: the block states that it holds nothing rather than printing an empty box."),
			oneitem: Built$5("One field is a form with one field, and the summary has one row."),
			manyitems: Built$5("Twelve fields: the stack holds, and the summary counts twelve."),
			loading: Built$5("The prefill has not arrived: the fields print their skeleton, the state stays `PREPARING`."),
			partial: Built$5("One fact unknown: the field prints `UNAVAILABLE`, and the state stays `PREPARING` rather than guessing."),
			longtext: Built$5("Twenty-four fields on a narrow page: the stack scrolls and the summary stays above the first one."),
			dense: Built$5("Every field in the dense variant, on the settings interval.")
		}
	}
];
/**
* One cell of the matrix.
*
* A row lists only its exceptions, so a missing entry is `BUILT` - and that
* default is what makes every `N/A` in this file a sentence someone had to
* write rather than a blank someone left.
*/
var MatrixCell$6 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$5 = () => Rows$6.flatMap((row) => Columns$6.map((column) => ({
	row,
	column,
	cell: MatrixCell$6(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$6 = Rows$6.length * Columns$6.length;
/** How many cells the family builds. */
var BuiltCount$6 = MatrixCells$5().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$6 = CellCount$6 - BuiltCount$6;
/** How many cells one row builds. */
var BuiltOf$6 = (Row) => Columns$6.filter((Column) => MatrixCell$6(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$6 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$6.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$6.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$6)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$6)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$6)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/FIELD.TS",
		note: "every figure above is counted from the two tables above it"
	}
];
/**
* The live rows.
*
* Ordered as the matrix's columns: the field's conditions first, then the other
* nine controls, then the four contexts the same field is printed in. Every one
* of the ten components appears at least once, and the four rows that carry the
* contexts are the same control in four different boxes - which is the claim
* this family has to prove.
*/
var Specimens$6 = [
	{
		mark: "01",
		group: "states",
		state: "REST",
		component: "Input",
		when: "A field nobody has touched: the frame, the label, and the value if there is one.",
		kind: "input",
		label: "PAIR REFERENCE",
		value: "CODE-4F21A",
		hint: "The reference this request is filed under."
	},
	{
		mark: "02",
		group: "states",
		state: "FOCUS",
		component: "Input",
		when: "The reader is in the field; the ring is drawn outside the box so the frame it is in stays.",
		kind: "input",
		label: "EMAIL",
		value: "reader@editor.land",
		state: "focus",
		hint: "Printed with `data-state=\"focus\"`, because a sheet cannot hold a cursor."
	},
	{
		mark: "03",
		group: "states",
		state: "EMPTY",
		component: "Input",
		when: "Nothing typed yet: the placeholder is the only muted thing an empty field may print.",
		kind: "input",
		label: "HANDLE",
		placeholder: "your-handle",
		hint: "Lower case, no spaces."
	},
	{
		mark: "04",
		group: "states",
		state: "INVALID",
		component: "Input",
		when: "A value the form refused: the sentence names what is wrong, and the field's edge carries the ink.",
		kind: "input",
		label: "EMAIL",
		value: "reader@",
		error: "This field is required."
	},
	{
		mark: "05",
		group: "states",
		state: "VALID",
		component: "Input",
		when: "A value that passed: a mark and a sentence in ink - green never means positive in general.",
		kind: "input",
		label: "CHECKSUM",
		value: "9f2c1b7a",
		valid: "Matches the digest published with the release."
	},
	{
		mark: "06",
		group: "states",
		state: "DISABLED",
		component: "Input",
		when: "A field that cannot be edited now; the value stays readable, because a disabled field's value is still a fact.",
		kind: "input",
		label: "SIGNATURE",
		value: "UNAVAILABLE",
		disabled: true,
		hint: "Signing is planned and not yet published."
	},
	{
		mark: "07",
		group: "states",
		state: "READ-ONLY",
		component: "Input",
		when: "A value the reader may quote and copy, and may not change; the label says so in its own register.",
		kind: "input",
		label: "SUBMITTED",
		value: "2026-11-19",
		readonly: true
	},
	{
		mark: "08",
		group: "states",
		state: "REQUIRED",
		component: "Input",
		when: "A field the form will not file without; the asterisk and `aria-required` travel together.",
		kind: "input",
		label: "SUBJECT",
		placeholder: "One line, in your own words",
		required: true
	},
	{
		mark: "09",
		group: "states",
		state: "HINT",
		component: "Input",
		when: "A sentence that explains the format before the reader gets it wrong - a hint is cheaper than an error.",
		kind: "input",
		label: "ORDER",
		value: "LAND-0042",
		hint: "The order reference from your receipt, six characters after the prefix."
	},
	{
		mark: "10",
		group: "states",
		state: "COUNTER",
		component: "Textarea",
		when: "A limit the reader can see coming: the count derives from the value in the box, not from a prop beside it.",
		kind: "textarea",
		label: "WHAT CHANGED",
		value: "The print layer now resolves every link to its target before the page is handed to the printer, so a printed page cites an address a reader can follow.",
		limit: 240,
		hint: "One sentence is enough. The limit is the receipt's field, not the reader's patience."
	},
	{
		mark: "11",
		group: "states",
		state: "OVER LIMIT",
		component: "Textarea",
		when: "The count has passed its limit: the number turns to the error's ink before the form has to say anything.",
		kind: "textarea",
		label: "AMENDMENT",
		value: "Every field in the request is editable until the request is filed, and the receipt names the reference it will be filed under, which is the pair reference printed at the head of the form, and that reference is the one to quote in a reply.",
		limit: 120
	},
	{
		mark: "12",
		group: "states",
		state: "ADDON",
		component: "Input",
		when: "A prefix or a suffix that belongs to the value: a currency, a unit, a domain - the instrument is one box, not a box beside a box.",
		kind: "input",
		label: "BUDGET",
		value: "2500",
		prefix: "$",
		suffix: "USD",
		hint: "Whole units. The quote is fixed for the quarter it is issued in."
	},
	{
		mark: "13",
		group: "states",
		state: "ACTION ROW",
		component: "Input",
		when: "A field and the one thing to do with it, on one line at wide and stacked at narrow - a container query on the field, not the page.",
		kind: "input",
		label: "VERIFICATION CODE",
		value: "482913",
		action: "VERIFY",
		hint: "Six digits, from the message the registry sent."
	},
	{
		mark: "14",
		group: "states",
		state: "LOADING",
		component: "Input",
		when: "The value has not arrived: the schema is printed and the answer is barred, so the reader learns what the field is while they wait.",
		kind: "input",
		label: "PREFILLED FROM SESSION",
		loading: true,
		hint: "The skeleton does not move. What moves is the moment it ends."
	},
	{
		mark: "15",
		group: "states",
		state: "PARTIAL",
		component: "Input",
		when: "Some of the value is known: the value prints, and the fact that would confirm it prints `UNAVAILABLE` rather than a zero.",
		kind: "input",
		label: "RELEASE",
		value: "0.4.0",
		partial: "VERIFIED BY: UNAVAILABLE",
		hint: "The version is filed; the digest that would attest it has not been published."
	},
	{
		mark: "16",
		group: "controls",
		state: "LABEL",
		component: "Label",
		when: "The word that names a control, with its own register in the meta slot: `READ-ONLY`, or the counter.",
		kind: "label",
		label: "EMAIL ADDRESS",
		value: "reader@editor.land",
		required: true,
		readonly: true,
		hint: "The meta slot is the field's register, so the label can say what the box cannot."
	},
	{
		mark: "17",
		group: "controls",
		state: "CHECKBOX",
		component: "Checkbox",
		when: "One consent, checked or not - and the unchecked state is a state, not a hole.",
		kind: "checkbox",
		label: "I have read the privacy term and I agree to it.",
		checked: true,
		hint: "The sentence is the label. A consent is read, so it keeps body weight."
	},
	{
		mark: "18",
		group: "controls",
		state: "CHECKBOX GROUP",
		component: "Checkbox",
		when: "Twelve options with a selection count in the head: the set states how much of itself is chosen.",
		kind: "checkbox",
		label: "WHICH SURFACES",
		options: [
			"/Download",
			"/Verify",
			"/License",
			"/Privacy",
			"/Status",
			"/Contents",
			"/Glossary",
			"/Motion",
			"/Blog",
			"/Contact",
			"/Portal",
			"/Specimen"
		],
		hint: "Select every surface the request touches."
	},
	{
		mark: "19",
		group: "controls",
		state: "RADIO GROUP",
		component: "RadioGroup",
		when: "One of a set: the legend names the question and the group prints how many answers it holds.",
		kind: "radiogroup",
		label: "CHANNEL",
		options: [
			"PUBLIC",
			"PRE-RELEASE",
			"INTERNAL"
		],
		chosen: "PRE-RELEASE",
		required: true
	},
	{
		mark: "20",
		group: "controls",
		state: "SWITCH",
		component: "Switch",
		when: "A boolean that takes effect at once, with its state word printed beside it - the word is what survives greyscale.",
		kind: "switch",
		label: "TELEMETRY",
		checked: true,
		hint: "Feature-gated. Off by default, and the switch says which it is."
	},
	{
		mark: "21",
		group: "controls",
		state: "SLIDER",
		component: "Slider",
		when: "A value chosen from a range, with the readout beside the track: the number is the value, the track is the gesture.",
		kind: "slider",
		label: "READING SIZE",
		min: 0,
		max: 24,
		value: "18",
		unit: "PT",
		hint: "The site's floor is 13px. A slider below it would be a slider that cannot be obeyed."
	},
	{
		mark: "22",
		group: "controls",
		state: "SELECT",
		component: "Select",
		when: "One of a list, opened in a slip; the trigger is already the dense form of a field.",
		kind: "select",
		label: "SCOPE",
		options: [
			"COMPAT:VS CODE",
			"COMPAT:JETBRAINS",
			"COMPAT:ZED",
			"COMPAT:VIM"
		],
		chosen: "COMPAT:VS CODE",
		hint: "The editor the request is about."
	},
	{
		mark: "23",
		group: "controls",
		state: "MANY ITEMS",
		component: "Select",
		when: "Forty options: the slip scrolls and the foot states the count, so the list says how big it is before it opens.",
		kind: "select",
		label: "ROUTE",
		options: Array.from({ length: 40 }, (_, Index) => `/ROUTE_${String(Index + 1).padStart(2, "0")}`),
		chosen: "/ROUTE_01"
	},
	{
		mark: "24",
		group: "controls",
		state: "INPUT OTP",
		component: "InputOTP",
		when: "A code, one slot at a time, with the progress printed - the partial state's own best example.",
		kind: "otp",
		label: "SIX-DIGIT CODE",
		value: "482",
		slots: 6,
		limit: 6,
		hint: "Three of six, and the count says so.",
		action: "RESEND"
	},
	{
		mark: "25",
		group: "controls",
		state: "SUMMARY",
		component: "FormSummary",
		when: "The form's refusal as an artifact: the state word, the count, and one line per field. On the form each line is a control that moves the cursor; on this sheet the lines are printed, because there is no form here to move a cursor in.",
		kind: "summary",
		label: "INTERRUPTED",
		summary: [
			{
				field: "YOUR NAME",
				message: "This field is required."
			},
			{
				field: "EMAIL",
				message: "This field is required."
			},
			{
				field: "CONSENT",
				message: "This confirmation is required."
			}
		]
	},
	{
		mark: "26",
		group: "skins",
		state: "IN A CARD",
		component: "Input",
		when: "On a white insert: the field keeps its frame and takes the card's inset - a card is where a form lies on a page.",
		kind: "input",
		label: "EMAIL",
		value: "reader@editor.land",
		hint: "One instrument, on the surface a request is filed on.",
		skin: "card"
	},
	{
		mark: "27",
		group: "skins",
		state: "IN A BAND",
		component: "Input",
		when: "On the creme field with no box around it: the same instrument, and no second frame to separate it from the page.",
		kind: "input",
		label: "EMAIL",
		value: "reader@editor.land",
		hint: "The field does not know it is on a page; it knows what a field is.",
		skin: "band"
	},
	{
		mark: "28",
		group: "skins",
		state: "NARROW COLUMN",
		component: "Input",
		when: "A 16rem column: the label wraps, the action stacks under the control, and the value still fits - the query is on the field.",
		kind: "input",
		label: "PAIR REFERENCE",
		value: "CODE-4F21A",
		action: "COPY",
		hint: "A drawer's width, and the same field.",
		skin: "narrow"
	},
	{
		mark: "29",
		group: "skins",
		state: "WIDE BAND",
		component: "Input",
		when: "A 60rem band: the field keeps its measure instead of stretching, because a field wider than its value is a field that lost its scale.",
		kind: "input",
		label: "EMAIL",
		value: "reader@editor.land",
		hint: "The instrument has a measure; the band does not give it one.",
		skin: "wide"
	}
];
/** The rows one group prints. */
var InGroup$6 = (Group) => Specimens$6.filter((Row) => Row.group === Group);
/** The three group heads, in reading order. */
var Groups$6 = [
	{
		key: "states",
		label: "/THE CONDITIONS",
		note: "The fifteen conditions a field has to hold, in the order the state layer names them."
	},
	{
		key: "controls",
		label: "/THE CONTROLS",
		note: "The other nine parts of the family, each printed once at the state it is best known by."
	},
	{
		key: "skins",
		label: "/THE SKINS",
		note: "The same field in four boxes. A field that reads differently in a card is two components wearing one name."
	}
];
Specimens$6.length;
// Source/Content/Specimen/Frame.ts
/**
* The twenty-two columns, in reading order.
*
* Nine conditions first, because they are the states a reader meets; then six
* shapes, because they are what a frame is asked to hold; then five
* compositions, because they are the ones this family's brief named by hand; then
* two contexts, because they are the ones a designer forgets - the action a frame
* carries and the medium it is printed on.
*/
var Columns$5 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one part unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a step failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "reducedmotion",
		label: "REDUCED",
		ask: "no motion asked for",
		group: "condition"
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY",
		ask: "nine or twenty-six",
		group: "shape"
	},
	{
		key: "longtext",
		label: "LONG",
		ask: "a line past its column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight arm",
		group: "shape"
	},
	{
		key: "norail",
		label: "NO RAIL",
		ask: "a page with no rail",
		group: "composition"
	},
	{
		key: "tworails",
		label: "TWO RAILS",
		ask: "rail and register",
		group: "composition"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "a shell inside a shell",
		group: "composition"
	},
	{
		key: "at640",
		label: "AT 640",
		ask: "a pane pair at 640px",
		group: "composition"
	},
	{
		key: "noimage",
		label: "NO IMAGE",
		ask: "a plate with no plate",
		group: "composition"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "one thing to click",
		group: "context"
	},
	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$4 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$4 = (reason) => ({
	disposition: "na",
	reason
});
/** The reason a printed block is never a control. Reused, and never alone. */
var NotAControl$3 = (what) => NotApplicable$4(`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`);
/** The reason a printed block is read-only by construction. */
var ReadOnly$3 = (what) => NotApplicable$4(`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`);
/** The reason a block with no motion cannot be asked for less of it. */
var NoMotion$1 = (what) => NotApplicable$4(`A ${what} has no motion of its own: its state changes are ink, rule and space, and the two folds it prints turn through the mark layer, which is already gated on \`prefers-reduced-motion\`.`);
/** The reason a leaf is one thing and cannot be a set of one. */
var NotASet$3 = (what, set) => NotApplicable$4(`A ${what} is one object by definition; a set of one is ${set}, and a block that answered both would be two blocks with one name.`);
/** The reason a part holds no image. */
var NoImage = (what) => NotApplicable$4(`A ${what} prints no image and takes no media prop: the site's one image arm is \`ShellPlate\`'s, and a second block with a picture in it would be a second plate.`);
/** The reason the page's tracks are not a small part's context. */
var NotAPage = (what) => NotApplicable$4(`A ${what} is a word or a row on a line, not a page composition: the rail count of the page it sits on is the shell's fact, and a badge that re-composed because the page had two rails would be a badge with an opinion about layout.`);
/** The reason a part is fixed to the viewport rather than placed in a card. */
var NotInCard = (what, why) => NotApplicable$4(`A ${what} is ${why}, so a card is not a slot it has: the card's width is a container query the block would re-compose inside, and the composition it re-composed into would be a second design nobody asked for.`);
/**
* The twenty components, in the order a page meets them: the app surface's own
* ten - the shell, its head, the region, the register, the status line, the
* badge and chip runs, the absence, the state badge and the lifecycle
* vocabulary - then the page shell, the panes, the plate, the rail, the state,
* the two edges, the frame rail, the running head and the print layer.
*
* Every row's overrides are reasons. A row with no overrides would be a part that
* survives every combination, and no part does.
*/
var Rows$5 = [
	{
		name: "SHELL",
		file: "COMPONENT/SURFACE/SURFACESHELL.ASTRO",
		note: "The app surface's shell: the instrument head, then the page's own bands.",
		cells: {
			disabled: NotAControl$3("surface shell"),
			readonly: ReadOnly$3("shell"),
			reducedmotion: NoMotion$1("shell"),
			one: NotASet$3("surface shell", "one page's frame"),
			many: NotASet$3("surface shell", "one page's frame"),
			noimage: NoImage("surface shell"),
			withaction: NotApplicable$4("A surface shell prints no action of its own: the actions belong to its bands (`surface-button`, a rail's foot, an absence's `NEXT:`), and a shell that carried one would put a control in the frame itself."),
			incard: NotApplicable$4("A surface shell is the page's frame, and a card is a record's surface: the two are the same question at two ranks, and a shell inside a card would print a page's nameplate inside a record. The composition the brief asks for - a card that contains a page - is `PageShell`'s `IN A CARD` cell, because a page's grid re-composes and a page's shell does not."),
			at640: Built$4("the head is one column at every width and the bands below it own their own queries"),
			partial: Built$4("`SurfaceStatusLine` prints the states it has and `RecordLedger` the facts it has; an unknown fact is the ledger row's `UNAVAILABLE`, not the shell's"),
			stale: Built$4("the age is the leaf's `AGE:` row and the status line's `BUILT:` declaration; the shell prints both without owning either"),
			norail: Built$4("a surface shell has no rail at all - the rail is `PageShell`'s track - so the composition is its normal one"),
			tworails: Built$4("the shell is the main column of whatever frame it is placed in, so a two-rail page narrows it and the head re-composes at the track's width")
		}
	},
	{
		name: "HEAD",
		file: "COMPONENT/SURFACE/SURFACEHEAD.ASTRO",
		note: "The instrument's nameplate: `# ID`, the `h1` at L, the `↳` proposition, the status line, the lifecycle and the facts.",
		cells: {
			disabled: NotAControl$3("nameplate"),
			readonly: ReadOnly$3("nameplate"),
			reducedmotion: NoMotion$1("nameplate"),
			one: NotASet$3("nameplate", "one page's opening"),
			many: NotASet$3("nameplate", "one page's opening"),
			noimage: NoImage("nameplate"),
			withaction: NotApplicable$4("The head's `slot` is where a page puts its own opening content - a programme run, a protocol line, a badge strip - and an action in it would be a control inside a nameplate. The surface's one expressive action is `surface-button`, in a band."),
			incard: NotApplicable$4("A head is the page's `h1` and its nameplate; a card that contained one would be a page inside a record, which is the reverse of the composition the family allows (a record inside a surface)."),
			at640: Built$4("the plate row is a flex line and the title is `text-wrap: balance`, so the head stacks without a query of its own"),
			longtext: Built$4("the title is `balance` and the proposition is capped at `--MeasureOpening` with `pretty`; a `FOR:` value wraps inside the strip rather than widening it"),
			narrow: Built$4("at the narrowest width the head is one column: plate, title, proposition, status, life, facts"),
			dense: Built$4("`SurfaceHead` has no dense arm - the tight step belongs to the blocks inside it (`SurfaceState.dense`, `ShellState.dense`), because a nameplate is the one thing on a surface that may not shrink")
		}
	},
	{
		name: "REGION",
		file: "COMPONENT/SURFACE/SURFACEREGION.ASTRO",
		note: "One region of an app surface's main column: `# 04`, an `h2`, a standfirst and its records.",
		cells: {
			disabled: NotAControl$3("region"),
			readonly: ReadOnly$3("region"),
			reducedmotion: NoMotion$1("region"),
			one: Built$4("a region holds one record as readily as nine"),
			many: Built$4("the region's body is the page's slot and owns no row rhythm"),
			noimage: NoImage("region"),
			withaction: Built$4("a region's action is a `surface__action` row or a `NEXT:` link inside it"),
			incard: Built$4("`dense` is the region inside a card or a pane"),
			at640: Built$4("the region is one column below the rail breakpoint"),
			empty: Built$4("`state=\"empty\"` prints the composed absence under the same head"),
			loading: Built$4("`state=\"loading\"` prints the keys and barred values"),
			partial: Built$4("a fact the region does not have is printed by the record inside it as `UNAVAILABLE`")
		}
	},
	{
		name: "REGISTER",
		file: "COMPONENT/SURFACE/SURFACESTATE.ASTRO",
		note: "The state register: `KEY:` rows with the state square at each word's tone.",
		cells: {
			disabled: NotAControl$3("register"),
			readonly: ReadOnly$3("register"),
			reducedmotion: NoMotion$1("register"),
			one: Built$4("a head's register is usually one or two rows"),
			many: Built$4("`columns={2}` reads a legend of eight as a set"),
			noimage: NoImage("register"),
			withaction: NotApplicable$4("A register states what a surface is doing; the action that changes it is the surface's, not the register's. A register row with a link in it would be a rail row."),
			incard: Built$4("`dense` is the register inside a card"),
			at640: Built$4("the key column folds above its value at 640px, on the row's own geometry")
		}
	},
	{
		name: "STATUSLINE",
		file: "COMPONENT/SURFACE/SURFACESTATUSLINE.ASTRO",
		note: "The one row every app surface states its state in: `STATUS:` and the declarations that audit it.",
		cells: {
			disabled: NotAControl$3("status line"),
			readonly: ReadOnly$3("status line"),
			reducedmotion: NoMotion$1("status line"),
			one: Built$4("one state and no declarations prints one register row"),
			many: Built$4("eight declarations wrap at the group rhythm"),
			noimage: NoImage("status line"),
			withaction: NotApplicable$4("The status line's job is to be auditable, not actionable: the `NEXT:` a reader needs is the absence's or the failure's, and a link in the readout would make the audit trail a control strip."),
			empty: Built$4("with no states and no declarations the block renders nothing at all - an empty readout is not a readout"),
			partial: Built$4("a declaration the build cannot state prints `UNAVAILABLE` as its value, because the block invents none of its facts"),
			longtext: Built$4("a long route or source wraps inside the declaration, never widening the row"),
			incard: Built$4("the row wraps to two lines and its rules hold"),
			norail: Built$4("a status line is inside a head, so the page's tracks are not its context")
		}
	},
	{
		name: "BADGE",
		file: "COMPONENT/SURFACE/SURFACEBADGE.ASTRO",
		note: "One state word on a Jelly badge, tinted from the semantic token of the thing it describes.",
		cells: {
			disabled: NotApplicable$4("A badge reports a word; there is nothing to disable. The word `Disabled` is a badge's LABEL (the dashboard's table), not the badge's state."),
			readonly: ReadOnly$3("badge"),
			reducedmotion: NoMotion$1("badge"),
			one: NotASet$3("badge", "`SurfaceChips`, which is the set"),
			many: NotASet$3("badge", "`SurfaceChips`, which is the set"),
			noimage: NoImage("badge"),
			withaction: NotApplicable$4("A badge is a label on a surface, never a control: the Jelly button beside it is the action, and a badge that took a click would be an unlabelled button."),
			incard: NotAPage("badge"),
			norail: NotAPage("badge"),
			tworails: NotAPage("badge"),
			at640: NotAPage("badge"),
			print: Built$4("the tint is a light fill and a `-700` ink, so it survives the print palette")
		}
	},
	{
		name: "CHIPS",
		file: "COMPONENT/SURFACE/SURFACECHIPS.ASTRO",
		note: "A record's state chips as Jelly badges, each carrying the state square and the tone's ink.",
		cells: {
			disabled: NotAControl$3("chip run"),
			readonly: ReadOnly$3("chip run"),
			reducedmotion: NoMotion$1("chip run"),
			one: Built$4("one chip is a chip run of one - the legend of a single-state record"),
			many: Built$4("eight chips wrap at the tight step"),
			noimage: NoImage("chip run"),
			withaction: NotApplicable$4("A chip is a state, not a filter: the site has no chip that toggles anything, and a chip run with a click in it would be a tag input's control row."),
			incard: NotAPage("chip run"),
			norail: NotAPage("chip run"),
			tworails: NotAPage("chip run"),
			at640: Built$4("the run wraps; a chip never compresses inside its shadow tree"),
			empty: NotApplicable$4("An empty chip run prints no list at all, and a caller with no states has nothing to say: the block renders an empty `<ul>`, which is the honest zero and not an absence. `SurfaceAbsent` is the composed version.")
		}
	},
	{
		name: "ABSENT",
		file: "COMPONENT/SURFACE/SURFACEABSENT.ASTRO",
		note: "The honest empty state: what would be here, why it is not, and the way forward.",
		cells: {
			disabled: NotAControl$3("absence"),
			readonly: ReadOnly$3("absence"),
			reducedmotion: NoMotion$1("absence"),
			one: NotASet$3("absence", "one region's missing record"),
			many: NotASet$3("absence", "one region's missing record"),
			noimage: NoImage("absence"),
			incard: Built$4("`dense` is the absence inside a card or a pane"),
			norail: Built$4("an absence is placed where a record would be, so the page's tracks are not its context"),
			at640: Built$4("the key column folds above its value at 640px"),
			error: Built$4("`retry` adds the `RETRY:` row, so a failed request states both the command and the alternative"),
			partial: Built$4("`whyNot` is where a partial cause is stated; the three rows are the composition, not three fixed strings")
		}
	},
	{
		name: "STATEBADGE",
		file: "COMPONENT/SURFACE/STATEBADGE.TSX",
		note: "One state word as a Jelly badge inside a React island - the twin of `SurfaceBadge`, with the tone read from `State.ts`.",
		cells: {
			disabled: NotApplicable$4("A state badge reports a word inside an island; the island owns the control states. A badge that could be disabled would be a badge whose state was the app's, not the record's."),
			readonly: ReadOnly$3("state badge"),
			reducedmotion: NoMotion$1("state badge"),
			one: NotASet$3("state badge", "the island's own run of them"),
			many: NotASet$3("state badge", "the island's own run of them"),
			noimage: NoImage("state badge"),
			withaction: NotApplicable$4("A badge is not a control; the island's `jelly-button` beside it is."),
			incard: NotAPage("state badge"),
			norail: NotAPage("state badge"),
			tworails: NotAPage("state badge"),
			at640: NotAPage("state badge"),
			loading: Built$4("`STATUS: LOADING` is a word from the eight, and the badge prints it in ink without a spinner")
		}
	},
	{
		name: "LIFE",
		file: "COMPONENT/SURFACE/SURFACELIFE.ASTRO",
		note: "One surface's maturity in the site's one vocabulary of five: LIVE, BETA, PLANNED, RETIRED, UNAVAILABLE.",
		cells: {
			disabled: NotAControl$3("lifecycle register"),
			readonly: ReadOnly$3("lifecycle register"),
			reducedmotion: NoMotion$1("lifecycle register"),
			one: Built$4("the register is five steps by definition; `term` selects one and the other four stay printed as the scale"),
			many: Built$4("all five print at every state - that is what makes it a vocabulary"),
			noimage: NoImage("lifecycle register"),
			withaction: NotApplicable$4("A lifecycle is a fact about a surface, not an action on it: a reader cannot promote a page from BETA by clicking, and a control that implied it could would be a lie with a border."),
			incard: Built$4("`dense` drops the gloss and keeps the scale"),
			norail: NotAPage("lifecycle register"),
			tworails: NotAPage("lifecycle register"),
			at640: Built$4("the five steps wrap at the reading step"),
			empty: NotApplicable$4("A surface always has a lifecycle, even when it is `UNAVAILABLE`: the fifth word IS the empty arm, and a register that rendered nothing would be the one state the vocabulary exists to prevent."),
			partial: Built$4("a word outside the five prints `UNAVAILABLE` and the block says so in its `NOTE:` row - an adjective is not a word from the table")
		}
	},
	{
		name: "PAGESHELL",
		file: "COMPONENT/SHELL/PAGESHELL.ASTRO",
		note: "The shell every composed page wears, in one of five languages: the declaration strip, the tracks, the foot.",
		cells: {
			disabled: NotAControl$3("page shell"),
			readonly: ReadOnly$3("page shell"),
			reducedmotion: Built$4("the margin's `register-to-bar` transition is gated on `prefers-reduced-motion`, and the bar is the same element either way"),
			one: NotASet$3("page shell", "one page's composition"),
			many: NotASet$3("page shell", "one page's composition"),
			noimage: NoImage("page shell"),
			withaction: NotApplicable$4("A page shell holds tracks; the actions are the bands' inside them. The one exception is the plate language, whose action is the page's own - and it is the page's, not the shell's."),
			norail: Built$4("`:has()` drops the track: a reading page with no rail prints `desk | paper | desk | margin` and the paper centres in what is left"),
			tworails: Built$4("the reading language's rail and margin are the two rails: 13rem | desk | paper | desk | 16rem, with the margin converting to a sticky bar between 58rem and 84rem"),
			incard: Built$4("the shell is a query container (`container: shell / inline-size`), so a shell in a card re-composes at the card's width instead of overflowing - the composition the brief asks for by name"),
			at640: Built$4("below 58rem every language prints its rail as a ruled register above the main track; the panes' own seam rotates at 44rem"),
			empty: Built$4("`language=\"record\"` prints `DECLARES: NOTHING` and no tracks, which is the one-artifact page's honest empty arm"),
			dense: NotApplicable$4("A page shell's rhythm is the page's: the chapter interval is what makes a document breathe, and a dense page shell would be a page that had decided its own chapters were sections. `RecordBand.dense` is the tight arm, inside the track."),
			print: Built$4("the print layer turns every track into the page's one column and resolves the rails to their targets")
		}
	},
	{
		name: "PANES",
		file: "COMPONENT/SHELL/SHELLPANES.ASTRO",
		note: "The workspace's two instruments: `5fr 1px 7fr`, the seam, and the drawer for what neither holds.",
		cells: {
			disabled: NotAControl$3("pane pair"),
			readonly: ReadOnly$3("pane pair"),
			reducedmotion: NoMotion$1("pane pair"),
			one: NotApplicable$4("A pane pair is two panes by definition - the seam is the instrument. One pane is `PageShell`'s workspace track with no pair, and the block would have to drop its own reason for existing to print it."),
			many: NotApplicable$4("Two panes is the whole composition: a third instrument goes in the drawer, which is the block's answer to `many` and not a third column."),
			noimage: NoImage("pane pair"),
			withaction: Built$4("a pane's body is the page's slot, so the action inside it is the instrument's"),
			empty: Built$4("each pane carries its own `state`/`empty`: a pair with one absent half keeps its seam and its heads"),
			loading: Built$4("`state=\"loading\"` prints the pane's keys and barred values, under its own head"),
			norail: Built$4("the pair is placed in the workspace's main track, with or without the rail"),
			tworails: Built$4("a pair inside a two-rail shell narrows and its seam rotates at 44rem of the pair's own width"),
			incard: Built$4("`dense` is the pair inside a card"),
			at640: Built$4("`@container panes (max-width: 43.99rem)` rotates the seam: the panes stack and the 1px vertical track becomes a 1px horizontal rule at the same ink")
		}
	},
	{
		name: "PLATE",
		file: "COMPONENT/SHELL/SHELLPLATE.ASTRO",
		note: "The plate language's one artifact: a full-bleed figure with a caption channel beside it.",
		cells: {
			disabled: NotAControl$3("plate"),
			readonly: ReadOnly$3("plate"),
			reducedmotion: NoMotion$1("plate"),
			one: NotASet$3("plate", "one figure"),
			many: NotASet$3("plate", "one figure - a set of plates is a page of plates"),
			withaction: NotApplicable$4("A plate's `proposition` is a sentence, not a control: the action a plate leads to is the page's `NEXT:`, printed by the block that owns the claim."),
			noimage: Built$4("`absence` prints the composed absence inside the plate's own frame at the plate's own height - the improvement this matrix produced, and the cell the brief named"),
			norail: Built$4("a plate bleeds to the container's gutters, so the rails outside it are the page's"),
			tworails: Built$4("the plate's channel sits in its own 20rem track at 48rem of the plate's width, whatever the page's rails do"),
			incard: NotApplicable$4("A plate inside a Jelly card is a card in a card: the plate is the page's artifact and the card is a record's surface. A figure inside a card is `RecordFigure`'s, which is the same evidence at a record's scale."),
			at640: Built$4("the channel goes under the plate: `@container plate (min-width: 48rem)` is the only switch, so the caption never floats on the image"),
			empty: Built$4("with no media, no trace, no slot and no `absence`, the field is the empty frame - and that is the defect the `absence` arm removes"),
			partial: Built$4("`state` prints one of the eight words in its tone, and a word outside the eight prints in ink"),
			print: Built$4("the plate is the one artifact the print layer keeps at full width, with its channel resolved to the page's column")
		}
	},
	{
		name: "RAIL",
		file: "COMPONENT/SHELL/SHELLRAIL.ASTRO",
		note: "The rail primitive: a register line with its count, and rows of `[mark] [label] [meta]`.",
		cells: {
			disabled: NotAControl$3("rail"),
			readonly: ReadOnly$3("rail"),
			reducedmotion: NoMotion$1("rail"),
			one: Built$4("a rail of one row prints one row - the register line's count says `01`"),
			many: Built$4("twenty-six rows print: a rail is short enough to print and a disclosure would hide the only navigation"),
			noimage: NoImage("rail"),
			withaction: Built$4("`foot` is the rail's closing destination, and a row's `href` is its action"),
			empty: Built$4("`state=\"empty\"` prints the composed absence inside the rail, under the same register line"),
			loading: Built$4("`state=\"loading\"` prints the keys and barred values"),
			partial: Built$4("a row's `meta` prints `UNAVAILABLE` when the figure is not known, and the row stays"),
			longtext: Built$4("a label wraps with `pretty` and the note under it at the caption tier; the meta is `nowrap` and the row is a grid, so a long label narrows the body and never the value"),
			norail: NotApplicable$4("A rail is the rail: `NO RAIL` is the shell's composition (the track is dropped), not a state the rail can be in. The rail's own empty arm is `state=\"empty\"`, and it is a different fact - a rail that is present and has nothing to list."),
			tworails: Built$4("a rail in a two-rail page is one of the two, at 13rem"),
			incard: Built$4("`dense` is the rail inside a card, a pane or a drawer"),
			at640: Built$4("below the shell's rail breakpoint the rail becomes a ruled register above the main track - its rows still in reading order, nothing folded away"),
			print: Built$4("the print layer resolves each row's href and prints the rail as a list")
		}
	},
	{
		name: "STATE",
		file: "COMPONENT/SHELL/SHELLSTATE.ASTRO",
		note: "The nine adverse states, composed in the record grammar: one box, one register head, one STATUS row.",
		cells: {
			disabled: NotAControl$3("adverse state"),
			readonly: ReadOnly$3("adverse state"),
			reducedmotion: NoMotion$1("adverse state"),
			one: Built$4("a state prints one condition and its rows"),
			many: Built$4("a state's `rows` are a set: the last-known values, or the facts a partial reading does have"),
			noimage: NoImage("adverse state"),
			withaction: Built$4("`next` prints the one action, and `error` prints it as `RETRY:`"),
			incard: Built$4("`surface=\"bare\"` and `dense` are the state inside a card"),
			at640: Built$4("`@container state (max-width: 26rem)` folds the key column above its value"),
			norail: Built$4("a state is placed where a record would be, in whatever track the page has"),
			tworails: Built$4("the state queries its own width, not the page's"),
			empty: Built$4("`kind=\"empty\"` is one of the nine, and its three rows are what would be here, why not, and the way forward"),
			partial: Built$4("`kind=\"partial\"` prints `UNAVAILABLE` for the fact it does not have, never a zero")
		}
	},
	{
		name: "EDGE LEAF",
		file: "COMPONENT/LAYOUT/EDGE/EDGELEAF.ASTRO",
		note: "The frame's first band: the sheet's number, route, part, circulation, source and as-of, with its `↳` proposition.",
		cells: {
			disabled: NotAControl$3("headnote"),
			readonly: ReadOnly$3("headnote"),
			reducedmotion: NoMotion$1("headnote"),
			one: NotASet$3("headnote", "one sheet's opening"),
			many: NotASet$3("headnote", "one sheet's opening"),
			noimage: NoImage("headnote"),
			withaction: NotApplicable$4("A leaf states where the sheet sits; the way forward is the turn's (`→ NEXT:`), because a page's opening that also carried the next page's destination would print the seam twice."),
			incard: NotInCard("headnote", "the frame's edge, mounted once by `Base.astro` above every page's slot"),
			norail: Built$4("the leaf is above the shell, so a page with no rail prints it unchanged"),
			tworails: Built$4("the leaf is at the frame's width, outside the shell's tracks"),
			at640: Built$4("the fact rows fold to key-over-value and the `↳` proposition hangs under them"),
			empty: Built$4("the `unfiled` arm prints `◎ NOT FILED` and `PART: ◎ NONE`"),
			loading: Built$4("the `loading` arm keeps the keys and bars the values"),
			partial: Built$4("a fact this build cannot state prints `UNAVAILABLE`, never `0`"),
			stale: Built$4("`◎ STALE` plus `AGE: n DAYS`, from the sheet's own date"),
			longtext: Built$4("a route that will not fit wraps in full"),
			print: Built$4("the leaf is the printed sheet's own running head - it is already the paper's composition")
		}
	},
	{
		name: "EDGE TURN",
		file: "COMPONENT/LAYOUT/EDGE/EDGETURN.ASTRO",
		note: "The frame's last band: the catchword for the next part, and the sheet's folio.",
		cells: {
			disabled: NotAControl$3("catchword"),
			readonly: ReadOnly$3("catchword"),
			reducedmotion: NoMotion$1("catchword"),
			one: NotASet$3("catchword", "one hand-over"),
			many: NotASet$3("catchword", "one hand-over"),
			noimage: NoImage("catchword"),
			withaction: Built$4("the catchword IS the action: `→ NEXT:` is a link to the next part"),
			incard: NotInCard("catchword", "the frame's edge, the last thing on the page"),
			norail: Built$4("the turn is below the shell, so the page's tracks are not its context"),
			tworails: Built$4("the turn is at the frame's width, outside the tracks"),
			at640: Built$4("the destination and the folio stack, and the folio keeps its own order"),
			empty: Built$4("`◎ NO NEXT SHEET` plus the reason"),
			error: Built$4("`STATUS: INTERRUPTED` plus `RETRY:`"),
			missing: Built$4("`◎ TARGET GONE` plus `WAS:`"),
			loading: Built$4("the keys stay and the values bar"),
			partial: Built$4("a destination part whose count cannot be known prints `UNAVAILABLE`")
		}
	},
	{
		name: "FRAME RAIL",
		file: "COMPONENT/LAYOUT/FRAME/RAIL.TSX",
		note: "The dossier's thumb index: ten parts as cut tabs, the pulled-out tab in ink, and the index closing the rail.",
		cells: {
			disabled: NotAControl$3("thumb index"),
			readonly: ReadOnly$3("thumb index"),
			reducedmotion: Built$4("the tab's colour transition is the motion layer's `quick` interval, and the mark layer gates every transition on `prefers-reduced-motion`"),
			one: Built$4("a document with one part prints one tab and `INDEX:␁01`"),
			many: Built$4("the ten parts print, and the rail's figure is `FrameSections.length`"),
			noimage: NoImage("thumb index"),
			withaction: Built$4("every tab is a link, and the closing row is the index's own"),
			incard: NotInCard("thumb index", "fixed to the window's left edge above 1280px"),
			norail: NotApplicable$4("The frame's rail is the rail the page has whether or not the page's own shell does: `NO RAIL` is a shell's composition and this rail lives outside it, in the frame's margin."),
			tworails: Built$4("the frame's rail is the page's third rail when a reading shell prints two, and the three are at three different ranks: margin tabs, destinations, apparatus"),
			at640: Built$4("below 1024px the tabs become the rows of the header's drawer, under `# INDEX:␁10`"),
			narrow: Built$4("at 1280px the column is 2.25rem and prints digits only, with the name in the `title` and `aria-label`"),
			longtext: Built$4("a part's name is the label's, and the drawer's row wraps it")
		}
	},
	{
		name: "RUNNING HEAD",
		file: "COMPONENT/LAYOUT/FRAME/RUNNINGHEAD.TSX",
		note: "The header's strip: the record's `#`, the part in force, the composition language, and the position figure.",
		cells: {
			disabled: NotAControl$3("running head"),
			readonly: ReadOnly$3("running head"),
			reducedmotion: NoMotion$1("running head"),
			one: NotASet$3("running head", "one page's position"),
			many: NotASet$3("running head", "one page's position"),
			noimage: NoImage("running head"),
			withaction: Built$4("the record name is a link home"),
			incard: NotInCard("running head", "the header's own strip, fixed to the viewport"),
			norail: Built$4("the head prints the part and the position whatever the page's shell does"),
			tworails: Built$4("the head is above the frame, outside every track"),
			at640: Built$4("the strip keeps the part, the language and the position, and drops only what the width cannot hold"),
			longtext: Built$4("the five composition words are all rendered and one is inked; the part's label is the frame's own, at its own measure"),
			print: Built$4("the print layer drops the head and prints the leaf's running head instead - the frame's paper composition")
		}
	},
	{
		name: "PRINT",
		file: "COMPONENT/LAYOUT/PRINT/PRINTRECORD.ASTRO",
		note: "The sheet's print action as a colophon row: `# PRINT_01`, the command, its contract and its fallback.",
		cells: {
			disabled: Built$4("with no JavaScript the button is not in the layout and not in the tab order, and the `<noscript>` line names the browser's own command - the disabled arm without a disabled control"),
			readonly: ReadOnly$3("print row"),
			reducedmotion: NoMotion$1("print row"),
			one: NotASet$3("print row", "one command"),
			many: NotASet$3("print row", "one command"),
			noimage: NoImage("print row"),
			withaction: Built$4("the whole row is the action, and its `↳` line is the contract"),
			incard: NotInCard("print row", "a footer colophon fact, at the frame's foot"),
			norail: Built$4("the footer is below the shell, so the page's tracks are not its context"),
			tworails: Built$4("the footer is at the frame's width, outside the tracks"),
			at640: Built$4("the row stacks: the command, then its contract, then the fallback"),
			error: Built$4("`◎ PRINT UNAVAILABLE` plus `NEXT:`, printed by the inline line when `window.print` is missing"),
			print: Built$4("on paper the control goes and `PRINTED: ______` arrives, with a rule for the copy's own date")
		}
	}
];
/** The cell at a row and a column: the row's override, or the built default. */
var MatrixCell$5 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$4 = () => Rows$5.flatMap((row) => Columns$5.map((column) => ({
	row,
	column,
	cell: MatrixCell$5(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$5 = Rows$5.length * Columns$5.length;
/** How many cells the family builds. */
var BuiltCount$5 = MatrixCells$4().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$5 = CellCount$5 - BuiltCount$5;
/** How many cells one row builds. */
var BuiltOf$5 = (Row) => Columns$5.filter((Column) => MatrixCell$5(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$4 = (Column) => Rows$5.filter((Row) => MatrixCell$5(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$5 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$5.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$5.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$5)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$5)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$5)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$5.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/FRAME.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that revealed
* it. An improvement with no cell behind it would be a preference.
*/
var Improvements$4 = [
	{
		component: "LIFE",
		from: "PARTIAL / the whole family's vocabulary",
		found: "Four pages answered the same question in four adjectives - \"Coming Soon\" on the portal, \"Feature Gated\" on the download masthead, \"Disabled\" in the dashboard, \"Beta\" in an article - and none of them could be counted, compared or audited. The state vocabulary said what a surface was DOING and had no word for how far along it was.",
		built: "`Surface/State.ts` carries `Life`: five words (`LIVE`, `BETA`, `PLANNED`, `RETIRED`, `UNAVAILABLE`), each with its tone and the sentence that decides between them, and `SurfaceLife.astro` is its one renderer - the register head, the word in force, all five steps with the one in force marked, and the gloss. `SurfaceHead` and `SurfaceShell` take `life` + `lifeNote`, so a surface declares its maturity in the same place it declares its status. A word outside the five prints `UNAVAILABLE` and the block says so, because an adjective is not a word from the table."
	},
	{
		component: "PLATE",
		from: "NO IMAGE",
		found: "A plate with no `media`, no `trace` and no slot printed its frame as an empty white field at the plate's full height - a figure that was a hole, which reads as a page that failed rather than a plate with a fact to state. The brief named this composition by hand.",
		built: "`ShellPlate.absence` - `{ status, wouldBe, whyNot, next }` - prints the composed absence INSIDE the plate's own frame, at the plate's own height, in the record's `KEY:` grammar. The frame stays a plate: a figure does not become a card because its evidence is missing, and the three rows are the same three every absence on the site prints."
	},
	{
		component: "RAIL",
		from: "MANY / ONE",
		found: "Every page with a rail of sections built a second rail beside `ShellRail` - the manual's tree, the legal clause list, the contact record column - because the primitive could hold one flat list and no groups. Five rails became seven.",
		built: "`ShellRail.groups` - a rail of sections, each with its own sub-register line and its own count counted from its own rows, in one `<ol>` per group. The rows keep the reserved mark column across every group, which is the only reason to group a register instead of stacking two rails. `items` stays the flat form and is still what most callers pass."
	},
	{
		component: "RAIL",
		from: "EMPTY / LOADING",
		found: "A rail whose destinations had not been read printed its register line and then an empty `<ol>` - a count over nothing, which is the exact defect the register line exists to prevent.",
		built: "`ShellRail.state` (`rest` | `empty` | `loading`) with `empty` and `keys`: `empty` prints `◎ UNAVAILABLE` and the caller's sentence inside the rail; `loading` prints the keys with their values barred, `aria-hidden`, static. The register line stays either way, because the head is what names the thing that is not there."
	},
	{
		component: "RAIL",
		from: "DENSE / IN A CARD",
		found: "A rail in a drawer, a pane or a card spent the same air as a rail at the page's edge, so ten rows of a rail inside a card were taller than the card's own content.",
		built: "`ShellRail.dense` - the same rows at the tight step. The mark column, the notes and the meta all stay: a dense rail is a rail in less air, never a rail with less in it."
	},
	{
		component: "PANES",
		from: "EMPTY / LOADING",
		found: "A pane whose instrument had not arrived printed its head and then an empty body - a pane that read as failed rather than as a pane with a fact to state. The pair had no way to say \"one half is not here yet\" without dropping the half.",
		built: "Each pane takes `state`, `empty` and `keys`; a pane with no slot is `empty` by construction. The absent arm prints `STATUS:` and the pane's own sentence (or the keys and barred values), under the same head, with the seam still drawn - so a pair with one absent half is still one instrument divided."
	},
	{
		component: "REGION",
		from: "EMPTY / LOADING",
		found: "A region whose record had not arrived rendered its index, its `h2` and its standfirst and then nothing: a heading with a hole under it, which reads as a page that failed to load rather than a region with a fact to state.",
		built: "`SurfaceRegion.state` (`rest` | `empty` | `loading`) with `empty` and `keys`: the two arms every other block in the family has, printed under the same head, in the record grammar - `◎ UNAVAILABLE` and a sentence, or the keys with their values barred. `dense` is the region inside a card or a pane."
	},
	{
		component: "PAGESHELL",
		from: "NO RAIL / TWO RAILS",
		found: "The declaration strip printed what the LANGUAGE gives (`GIVES: RAIL␁MEASURE␁MARGIN`) over pages that had taken one, two or none of those tracks, so the strip could describe a page that did not exist - and the two-rail and no-rail compositions were invisible on the page itself.",
		built: "`PageShell` now prints a second fact, `TRACKS:`, counted from the slots that are actually present (`RAIL␁PAPER␁MARGIN`, `PAPER␁MARGIN`, `RAIL␁PAPER`). The language's offer and the page's take are two different facts and the strip states both. Printed only when a side track is present, because `PAPER` alone is not news."
	},
	{
		component: "FRAME RAIL",
		from: "MANY / the register's own rule",
		found: "The dossier's thumb index printed `# INDEX:` over ten tabs and no figure - a register line without its count, which is the one defect `RegisterLine.ts` exists to remove, in the frame itself.",
		built: "`FrameRailCount` prints `FrameExtent` (`FrameSections.length`) after the label, separated by U+2001. In the 2.25rem column the tabs ARE the figure, so the count is hidden there and printed in the drawer, where the list needs its extent stated."
	},
	{
		component: "REGISTER",
		from: "MANY",
		found: "A legend of eight states printed as eight stacked rows: a set read as a list, at the height of a page section, when the reader's job was to compare the words.",
		built: "`SurfaceState.columns={2}` reads the register across at 640px and above, and `dense` is its tight step. The rows keep their order - the columns fill left to right - so the array's reading order is the register's."
	},
	{
		component: "ABSENT",
		from: "ERROR",
		found: "The absence's `NEXT:` row was its only action, so a failed request could state the way forward and not the retry - and `ShellState`'s error arm has had both since it was written.",
		built: "`SurfaceAbsent.retry` prints a `RETRY:` row under `NEXT:`, so a reader whose action failed is owed the command and the alternative in the same composition. `dense` is the absence inside a card or a pane."
	}
];
var Observations$4 = [
	{
		component: "PAGESHELL",
		found: "The reading language's `margin` slot is a `<div>` with an `aria-label` and no role. A register of apparatus is a landmark a reader navigates by, and an `aria-label` on a `div` announces nothing - but making it a `<complementary>` changes the landmark map of every reading page, and this card did not want to change a document's outline in the same edit as its grid.",
		owner: "A later card on the frame, with the owner's reading of the landmark map. The fix is one element and one prop (`marginRole`), and the `TRACKS:` fact now prints the slot's presence, so the page itself would show the change."
	},
	{
		component: "SHELL",
		found: "The four app surfaces still print their maturity in their own words: the portal's `Coming Soon`, the download masthead's `Feature Gated`, the dashboard's `Disabled`. `Life` and `SurfaceLife` exist and are mounted on this sheet, but no live page declares `life` yet - the vocabulary has one renderer and no callers.",
		owner: "The four surface cards (portal, dashboard, verify, account). Each page passes `life={...}` to `SurfaceShell` and drops its adjective; the vocabulary is already there and `State.ts` is its one table."
	},
	{
		component: "PANES",
		found: "`ShellPanes` takes two panes and a drawer, and the site's three-pane case (a tree, a document and an inspector) still composes as a pair plus a drawer - which is the block's answer, but not the only defensible one. A `layout=\"triple\"` would be a second composition with its own narrow behaviour.",
		owner: "The next workspace card. The exploration found no page that needs it today: the drawer holds the third instrument, and a third column at 640px would be three stacked panes."
	},
	{
		component: "PLATE",
		found: "`ShellPlate` prints `FIGURE:` and `SOURCE:` as required props, and no page has ever mounted the `trace` arm outside `/Specimen`. The arm exists, is typed and is printed here - but a plate whose evidence is a value rather than a picture is still a composition the document has not used.",
		owner: "The 404's card and the verify surface, both of which print a value where a plate would go. The arm is ready; mounting it is a page decision."
	}
];
/**
* The rows, in reading order: the frame's compositions, then the panes, the
* rails, the plates, the surface's own parts, the adverse states and the frame's
* two edges.
*
* Every row is a state the site either uses or could use, and the `when` line is
* the one thing a picture of a component cannot carry: the sentence that says
* which composition is right. A row printed here that the site never needs is
* still a row: a component that survives its own worst combination is a
* component whose design frame is real.
*/
var Specimens$5 = [
	{
		mark: "FRAME_01",
		state_name: "NO RAIL",
		component: "PAGESHELL",
		when: "A page whose only navigation is its header: the rail's track is dropped by `:has()` and the paper centres in the desk it is given, rather than sitting off-centre beside a column of nothing.",
		kind: "pageshell",
		variant: "norail"
	},
	{
		mark: "FRAME_02",
		state_name: "TWO RAILS",
		component: "PAGESHELL",
		when: "A document read with its contents on the left and its apparatus on the right: 13rem rail, desk, paper, desk, 16rem margin, with the margin converting to a sticky bar between 58 and 84rem rather than disappearing.",
		kind: "pageshell",
		variant: "tworails",
		width: "wide"
	},
	{
		mark: "FRAME_03",
		state_name: "IN A CARD",
		component: "PAGESHELL",
		when: "A shell inside a shell - a card that contains a page. The shell is a query container, so it re-composes at the card's width instead of overflowing: the composition the brief asked the frame to survive.",
		kind: "pageshell",
		variant: "incard",
		width: "card"
	},
	{
		mark: "FRAME_04",
		state_name: "AT 640",
		component: "PAGESHELL",
		when: "The same two-rail reading page at a phone's width: both rails become ruled registers above the paper, in reading order, and nothing is folded away.",
		kind: "pageshell",
		variant: "narrow",
		width: "narrow"
	},
	{
		mark: "FRAME_05",
		state_name: "ONE ARTIFACT",
		component: "PAGESHELL",
		when: "A page that is a single record: the declaration prints `DECLARES: NOTHING` and no tracks, because that is what is true.",
		kind: "pageshell",
		variant: "record"
	},
	{
		mark: "FRAME_06",
		state_name: "WORKSPACE",
		component: "PAGESHELL",
		when: "A place the reader operates: a 14rem rail and the panes beside it, read at no measure because a pane is as wide as the instrument inside it.",
		kind: "pageshell",
		variant: "workspace",
		width: "wide"
	},
	{
		mark: "FRAME_07",
		state_name: "AUDIT",
		component: "PAGESHELL",
		when: "A claim being checked: a 19rem ledger scoping the audit, the matrix taking every pixel the ledger does not, and the wells at the foot.",
		kind: "pageshell",
		variant: "audit",
		width: "wide"
	},
	{
		mark: "FRAME_08",
		state_name: "PLATE",
		component: "PAGESHELL",
		when: "One artifact and its provenance: a record head, then a full-bleed plate with its caption channel, and the bleed clipped at the window rather than widening the document.",
		kind: "pageshell",
		variant: "plate",
		width: "wide"
	},
	{
		mark: "FRAME_09",
		state_name: "INSET",
		component: "PAGESHELL",
		when: "A page whose opening caps at 64rem (the contact surface): the shell matches the page's own opening so the declaration strip and the `h1` share one left edge.",
		kind: "pageshell",
		variant: "inset"
	},
	{
		mark: "PANE_01",
		state_name: "5/7",
		component: "SHELLPANES",
		when: "Two comparable readings, unequal: the instrument the reader came to operate takes the wider pane and the context takes the narrower, with one 1px seam between them.",
		kind: "panes",
		variant: "5-7",
		width: "wide"
	},
	{
		mark: "PANE_02",
		state_name: "7/5",
		component: "SHELLPANES",
		when: "The mirror: a workspace whose instrument IS the record - the tree, the ledger, the long list - and the thing beside it is the note.",
		kind: "panes",
		variant: "7-5",
		width: "wide"
	},
	{
		mark: "PANE_03",
		state_name: "1/1",
		component: "SHELLPANES",
		when: "Two panes that are genuinely equal - the only case where equal columns are right, and the only ratio a designer should have to justify.",
		kind: "panes",
		variant: "1-1",
		width: "wide"
	},
	{
		mark: "PANE_04",
		state_name: "STACKED BY CHOICE",
		component: "SHELLPANES",
		when: "An index above a surface: a list of N whose rows carry a note, over an embedded application that needs the column. The seam rotates at every width because the halves are not two comparable readings.",
		kind: "panes",
		variant: "stack",
		width: "wide"
	},
	{
		mark: "PANE_05",
		state_name: "AT 640",
		component: "SHELLPANES",
		when: "The pair at a phone's width: the seam rotates to a 1px horizontal rule at the same ink, the panes stack, and the primary pane stays first because it is the instrument the reader came for.",
		kind: "panes",
		variant: "narrow",
		width: "narrow"
	},
	{
		mark: "PANE_06",
		state_name: "ONE HALF ABSENT",
		component: "SHELLPANES",
		when: "A pair whose second instrument has not arrived: the pane states `STATUS: UNAVAILABLE` and why, and the seam stays drawn - a pair with one absent half is still one instrument divided.",
		kind: "panes",
		variant: "absent",
		width: "wide"
	},
	{
		mark: "PANE_07",
		state_name: "LOADING",
		component: "SHELLPANES",
		when: "A pane whose instrument is still being read: the keys are known before the values are, so the pane prints the schema and bars the values - no spinner, because a spinner says something is happening and a skeleton says what.",
		kind: "panes",
		variant: "loading",
		width: "wide"
	},
	{
		mark: "PANE_08",
		state_name: "DRAWER OPEN",
		component: "SHELLPANES",
		when: "The third instrument the reader consults rather than reads: a `<details>` spanning both panes at the foot, open when the page knows the reader came for the transcript.",
		kind: "panes",
		variant: "drawer",
		width: "wide"
	},
	{
		mark: "RAIL_01",
		state_name: "REST",
		component: "SHELLRAIL",
		when: "A register of destinations with its count: the mark column is reserved on every row, so fourteen labels line up whether or not a row carries a mark.",
		kind: "rail",
		width: "band"
	},
	{
		mark: "RAIL_02",
		state_name: "IN FORCE",
		component: "SHELLRAIL",
		when: "The reader's position: `aria-current`, ink at 500 and a 2px accent rule on the leading edge - three signals, one of them a colour, so the position survives greyscale.",
		kind: "rail",
		variant: "current",
		width: "band"
	},
	{
		mark: "RAIL_03",
		state_name: "STATEMENTS",
		component: "SHELLRAIL",
		when: "A rail whose rows are facts rather than destinations - a clause list's `§07`, a position's `03`: same grid, same mark column, no hover.",
		kind: "rail",
		variant: "statement",
		width: "band"
	},
	{
		mark: "RAIL_04",
		state_name: "ONE",
		component: "SHELLRAIL",
		when: "A rail of one: the register line's count says `01`, and the rail is still a rail rather than a link with a heading over it.",
		kind: "rail",
		variant: "one",
		width: "band"
	},
	{
		mark: "RAIL_05",
		state_name: "MANY",
		component: "SHELLRAIL",
		when: "Twenty-six rows: a rail is short enough to print, and a disclosure that hides the only navigation on a phone is a worse answer than a list.",
		kind: "rail",
		variant: "many",
		width: "narrow"
	},
	{
		mark: "RAIL_06",
		state_name: "GROUPS",
		component: "SHELLRAIL",
		when: "A rail of sections: each group carries its own sub-register line and its own count, and the labels still line up across every group - which is the only reason to group a register instead of stacking two rails.",
		kind: "rail",
		variant: "groups",
		width: "band"
	},
	{
		mark: "RAIL_07",
		state_name: "EMPTY",
		component: "SHELLRAIL",
		when: "A rail whose destinations have not been read: `STATUS: UNAVAILABLE` and the reason, inside the rail, under the register line that says how many there would be.",
		kind: "rail",
		variant: "empty",
		width: "band"
	},
	{
		mark: "RAIL_08",
		state_name: "LOADING",
		component: "SHELLRAIL",
		when: "A rail still being read: the keys with their values barred, static and `aria-hidden`, and the STATUS row carrying the announcement.",
		kind: "rail",
		variant: "loading",
		width: "band"
	},
	{
		mark: "RAIL_09",
		state_name: "DENSE",
		component: "SHELLRAIL",
		when: "A rail inside a drawer, a pane or a card: the same rows at the tight step, with the marks, the notes and the meta all still printed.",
		kind: "rail",
		variant: "dense",
		width: "narrow",
		dense: true
	},
	{
		mark: "RAIL_10",
		state_name: "LONG",
		component: "SHELLRAIL",
		when: "A label that will not fit its column: the label wraps with `pretty` and the note under it, the meta stays `nowrap`, and the row's grid narrows the body rather than the value.",
		kind: "rail",
		variant: "long",
		width: "narrow"
	},
	{
		mark: "RAIL_11",
		state_name: "FOOT",
		component: "SHELLRAIL",
		when: "The rail's closing destination: a page the rail itself does not list, at the rail's foot, on the 2px/20% rule that moves to the ink on hover.",
		kind: "rail",
		variant: "foot",
		width: "band"
	},
	{
		mark: "PLATE_01",
		state_name: "IMAGE",
		component: "SHELLPLATE",
		when: "A plate whose evidence is a photograph: the frame is the same frame it is for a trace, because a plate does not change its shape because its evidence is a picture.",
		kind: "plate",
		variant: "image",
		width: "wide"
	},
	{
		mark: "PLATE_02",
		state_name: "TRACE",
		component: "SHELLPLATE",
		when: "A plate whose evidence is a printed value - the path that was asked for, the digest that was computed: the mark above, the value at the L tier, one line under it saying what the reader is looking at.",
		kind: "plate",
		variant: "trace",
		width: "wide"
	},
	{
		mark: "PLATE_03",
		state_name: "COMPOSED",
		component: "SHELLPLATE",
		when: "A plate whose evidence is a rendered element - a diagram, a receipt, a printed trace: the page passes it through the slot and the block frames it.",
		kind: "plate",
		variant: "slot",
		width: "wide"
	},
	{
		mark: "PLATE_04",
		state_name: "NO IMAGE",
		component: "SHELLPLATE",
		when: "A plate with no evidence at all: the absence is printed INSIDE the plate's frame at the plate's height - what would be here, why it is not, and the way forward - because an empty white field is the one thing a plate may never be.",
		kind: "plate",
		variant: "absence",
		width: "wide"
	},
	{
		mark: "PLATE_05",
		state_name: "BLEED: WINDOW",
		component: "SHELLPLATE",
		when: "A plate that IS the page: the `viewport` bleed runs past both gutters to the window's edges and is clipped by the shell, used once on the 404 where there is no measure to hold.",
		kind: "plate",
		variant: "bleed",
		width: "wide"
	},
	{
		mark: "PLATE_06",
		state_name: "TALL",
		component: "SHELLPLATE",
		when: "A plate with a height of its own: a figure that is as tall as its content disappears when its content is short, so the page states the height and the evidence centres in the field.",
		kind: "plate",
		variant: "tall",
		width: "band"
	},
	{
		mark: "SURFACE_01",
		state_name: "LIVE",
		component: "SURFACESHELL",
		when: "A surface that is open to every reader with its facts current: `STATUS: VERIFIED` for what it is doing, `LIFECYCLE: LIVE` for how far along it is - two questions, two registers, one page.",
		kind: "shell",
		variant: "live",
		width: "wide"
	},
	{
		mark: "SURFACE_02",
		state_name: "BETA",
		component: "SURFACESHELL",
		when: "A surface that is open and may still change under the reader: the word is `BETA`, the scale shows it one step in, and the gloss says what the reader is agreeing to.",
		kind: "shell",
		variant: "beta",
		width: "wide"
	},
	{
		mark: "SURFACE_03",
		state_name: "PLANNED",
		component: "SURFACEHEAD",
		when: "A surface that is named and specified and not built: `PLANNED` is the word \"Coming Soon\" was reaching for, and the gloss says nothing on it can be used yet.",
		kind: "head",
		variant: "planned",
		width: "wide"
	},
	{
		mark: "SURFACE_04",
		state_name: "RETIRED",
		component: "SURFACEHEAD",
		when: "A surface that was live and is closed: `RETIRED` is the word \"Disabled\" was reaching for, and the register keeps the page's facts readable because a retired surface is still a record.",
		kind: "head",
		variant: "retired",
		width: "wide"
	},
	{
		mark: "SURFACE_05",
		state_name: "LIFECYCLE: UNAVAILABLE",
		component: "SURFACELIFE",
		when: "A surface whose maturity the build cannot state - and a caller that handed in an adjective instead of a word: the fifth word is the honest answer, and the block says which words the adjective was reaching for.",
		kind: "life",
		variant: "adjective",
		width: "band"
	},
	{
		mark: "SURFACE_06",
		state_name: "REGION: EMPTY",
		component: "SURFACEREGION",
		when: "A region whose record has not been filed: the index, the `h2` and the standfirst stay, and the body states `STATUS: UNAVAILABLE` with what would be there - a heading with a hole under it reads as a page that failed.",
		kind: "region",
		variant: "empty",
		width: "band"
	},
	{
		mark: "SURFACE_07",
		state_name: "REGION: LOADING",
		component: "SURFACEREGION",
		when: "A region whose record is still being read: the keys the region will print, their values barred, under the same head.",
		kind: "region",
		variant: "loading",
		width: "band"
	},
	{
		mark: "SURFACE_08",
		state_name: "REGISTER: TWO COLUMNS",
		component: "SURFACESTATE",
		when: "A legend of the eight state words: a set read across, in two columns above 640px, with the rows keeping their array order.",
		kind: "register",
		variant: "two",
		width: "wide"
	},
	{
		mark: "SURFACE_09",
		state_name: "STATUS LINE",
		component: "SURFACESTATUSLINE",
		when: "The readout every app surface shares: the state word, then the declarations that make it auditable - the route it is read at, the source that produced it, the date the page was built.",
		kind: "statusline",
		width: "wide"
	},
	{
		mark: "SURFACE_10",
		state_name: "BADGES",
		component: "SURFACEBADGE",
		when: "One word on a Jelly badge, tinted from the semantic token of the thing it describes: a live claim carries its dot after U+2001, and a plan or a licence carries none because nothing is running yet.",
		kind: "badges",
		width: "band"
	},
	{
		mark: "SURFACE_11",
		state_name: "CHIPS",
		component: "SURFACECHIPS",
		when: "A record's states as one run: every chip carries the state square and the tone's ink on the neutral mute fill, so five states never look like five copies of one fact.",
		kind: "chips",
		width: "band"
	},
	{
		mark: "SURFACE_12",
		state_name: "ABSENT: RETRY",
		component: "SURFACEABSENT",
		when: "A record whose read failed: `NEXT:` is the way forward and `RETRY:` is the same action tried again - a reader whose request failed is owed both, in the same composition.",
		kind: "absent",
		variant: "retry",
		width: "band"
	},
	{
		mark: "SURFACE_13",
		state_name: "ABSENT: DENSE",
		component: "SURFACEABSENT",
		when: "The same absence inside a card or a pane: the three rows at the tight step, so an absence inside an artifact does not become the artifact's largest object.",
		kind: "absent",
		variant: "dense",
		width: "card",
		dense: true
	},
	{
		mark: "STATE_01",
		state_name: "DENSE",
		component: "SHELLSTATE",
		when: "An adverse state inside a card or a pane: the same rows and the same key column at a narrower measure, one step less air, and nothing dropped.",
		kind: "state",
		variant: "dense",
		width: "card",
		dense: true
	},
	{
		mark: "STATE_02",
		state_name: "BARE, IN A CARD",
		component: "SHELLSTATE",
		when: "A state printed on a card's own surface: no fill, no frame, no padding - a white box inside a white card is a card in a card.",
		kind: "state",
		variant: "bare",
		width: "card"
	},
	{
		mark: "STATE_03",
		state_name: "PARTIAL, WITH FACTS",
		component: "SHELLSTATE",
		when: "A reading that has some of its facts: the ones it has are printed as a compact ledger, the one it does not is `UNAVAILABLE` - never a zero, because zero is a measurement.",
		kind: "state",
		variant: "partial",
		width: "band"
	},
	{
		mark: "EDGE_01",
		state_name: "UNFILED",
		component: "EDGELEAF",
		when: "A page that is not a sheet of the document: `◎ NOT FILED`, `PART: ◎ NONE`, and the route printed in full so the reader knows what they asked for.",
		kind: "edgeleaf",
		variant: "unfiled",
		width: "wide"
	},
	{
		mark: "EDGE_02",
		state_name: "STALE",
		component: "EDGELEAF",
		when: "A sheet whose facts are older than the build: `◎ STALE` and `AGE: n DAYS` under the date that is being dated - a date belongs at the end of what it dates.",
		kind: "edgeleaf",
		variant: "stale",
		width: "wide"
	},
	{
		mark: "EDGE_03",
		state_name: "NO NEXT SHEET",
		component: "EDGETURN",
		when: "The last part of the document: the catchword names the colophon, because the colophon is what actually comes next, and the folio states the extent.",
		kind: "edgeturn",
		variant: "index",
		width: "wide"
	},
	{
		mark: "EDGE_04",
		state_name: "RECORD END",
		component: "EDGETURN",
		when: "A turn whose destination has left the build: `◎ TARGET GONE` plus `WAS:` - a tombstone in the record grammar, not a dead link.",
		kind: "edgeturn",
		variant: "missing",
		width: "wide"
	},
	{
		mark: "EDGE_05",
		state_name: "PRINT",
		component: "PRINTRECORD",
		when: "The colophon's print row: the command, its `↳` contract, the no-JavaScript fallback and the paper arm - a dossier is the kind of document that gets printed.",
		kind: "print",
		width: "band"
	}
];
/**
* The group a row belongs to, read from its mark's series.
*
* The mark IS the filing: `FRAME_03` is a frame, `RAIL_07` a rail. Deriving the
* group from it means a row cannot be filed in one group and printed in another -
* the same rule the register follows, where a count cannot outlive the rows it
* counts. A mark outside the seven series is a row that has not been filed, and
* the plate would print it nowhere, which is the defect the series removes.
*/
var GroupOf$3 = (Row) => {
	switch (Row.mark.slice(0, Row.mark.indexOf("_"))) {
		case "FRAME": return "frames";
		case "PANE": return "panes";
		case "RAIL": return "rails";
		case "PLATE": return "plates";
		case "SURFACE": return "surfaces";
		case "STATE": return "states";
		case "EDGE": return "edges";
		default: return;
	}
};
/** The rows in one group, in reading order. */
var InGroup$5 = (Group) => Specimens$5.filter((Row) => GroupOf$3(Row) === Group);
/** The groups, in the plate's order, with the line that says what each one asks. */
var Groups$5 = [
	{
		key: "frames",
		label: "/THE FRAMES",
		note: "The five languages and the three compositions the brief named: no rail, two rails, a shell inside a shell, the same page at 640px, and the one-artifact page that declares nothing."
	},
	{
		key: "panes",
		label: "/THE PANES",
		note: "Two instruments with one seam: the three ratios, the stack that is a choice rather than a fallback, the pair at 640px, and the arms a pair needs when one half has not arrived."
	},
	{
		key: "rails",
		label: "/THE RAILS",
		note: "One register of destinations in every state it has: rest, in force, statements, one row, twenty-six, groups, empty, loading, dense, long and the closing foot."
	},
	{
		key: "plates",
		label: "/THE PLATES",
		note: "The plate's five arms and its two bleeds - including the one the brief named by hand: a plate with no image, which is now a composition rather than an empty frame."
	},
	{
		key: "surfaces",
		label: "/THE SURFACES",
		note: "The app surface's own parts: the lifecycle vocabulary at work, a region's two adverse arms, the register read across, the shared readout, the badge and chip runs and the absence's retry."
	},
	{
		key: "states",
		label: "/THE STATE ARMS",
		note: "The three readings of the nine adverse states the sheet's own band does not print: the dense step, the bare arm inside a card, and a partial reading that keeps the facts it has."
	},
	{
		key: "edges",
		label: "/THE EDGES",
		note: "The frame's first band and its last: the leaf's unfiled and stale arms, the turn's two dead ends, and the colophon's print row."
	}
];
Specimens$5.length;
// Source/Content/Specimen/Narrative.ts
/**
* The nineteen columns, in reading order.
*
* Nine conditions first, because they are the states a reader meets; then seven
* shapes, because they are what a narrative block is asked to hold - and this
* family's brief named five of them by hand (one step, nine steps, no image, a
* caption longer than the image, a line that overflows); then three contexts,
* because they are the ones a designer forgets.
*/
var Columns$4 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one part unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a step failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "reducedmotion",
		label: "REDUCED",
		ask: "no motion asked for",
		group: "condition"
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY",
		ask: "nine or twenty",
		group: "shape"
	},
	{
		key: "longtext",
		label: "LONG",
		ask: "a line past its column",
		group: "shape"
	},
	{
		key: "nomedia",
		label: "NO MEDIA",
		ask: "no image at all",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight arm",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a Jelly surface",
		group: "context"
	},
	{
		key: "inband",
		label: "IN A BAND",
		ask: "inside a chapter",
		group: "context"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "one thing to click",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$3 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$3 = (reason) => ({
	disposition: "na",
	reason
});
/** The reason a printed block is never a control. Reused, and never alone. */
var NotAControl$2 = (what) => `A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`;
/** The reason a printed block is read-only by construction. */
var ReadOnly$2 = (what) => `A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`;
/** The reason a block with no motion cannot be asked for less of it. */
var NoMotion = (what) => `A ${what} has no motion: its state changes are ink, rule and space, and the one fold it prints turns through the mark layer, which is already gated on \`prefers-reduced-motion\`.`;
/** The reason a leaf is one thing and cannot be a set of one. */
var NotASet$2 = (what, set) => `A ${what} is one object by definition; a set of one is ${set}, and a block that answered both would be two blocks with one name.`;
/**
* The fifteen components, in the order a page meets them: the frame, the record,
* the opening, the comparison, the disclosure, then the three sequences, then the
* three pieces of evidence, then the four pieces of apparatus.
*
* Every row's overrides are reasons. A row with no overrides would be a part that
* survives every combination, and no part does.
*/
var Rows$4 = [
	{
		name: "BAND",
		file: "COMPONENT/RECORD/RECORDBAND.ASTRO",
		note: "One subject per band: a kicker, a heading, a standfirst, an index strip and a footnote.",
		cells: {
			partial: NotApplicable$3("A band opens a subject; it holds no facts of its own, so there is nothing for `partial` to qualify. A fact that is missing is stated by the block inside the band that measured it."),
			error: NotApplicable$3("A failed action is `RecordFailure`'s three fields. A band that grew a cause and a next step would be a condition block wearing a chapter's grammar."),
			stale: NotApplicable$3("A band prints no figure and no date, so it has no as-of to be older than. A set that is stale says its age in the block that measured it, which is the block that knows the number."),
			disabled: NotApplicable$3(NotAControl$2("band")),
			readonly: NotApplicable$3(ReadOnly$2("band")),
			reducedmotion: NotApplicable$3(NoMotion("band")),
			one: NotApplicable$3("A band holds a subject, not a set. `ONE` is a count of items, and a band with one item is a band whose body happens to be short."),
			nomedia: NotApplicable$3("A band prints no media. Evidence belongs to a figure or a plate, and a band that framed a picture would be a plate with a heading over it."),
			inband: Built$3("The specimen sheet composes one band inside another to print the block at 1:1, and it renders - but a page never nests bands: §4.3 allows one sectioning level, and the sheet's outer band is the sheet's own device, not a page's chapter."),
			rest: Built$3("The chapter: kicker, heading, standfirst, body, footnote."),
			many: Built$3("The body grows; the head does not. Twenty blocks under one heading is a long chapter, and the band's interval is what keeps it one subject."),
			incard: Built$3("At `tone=\"bare\"` the band is structure inside a Jelly surface: no fill, no frame, no chapter padding - the card owns the inset."),
			withaction: Built$3("Through the `foot` slot, which is where an onward link belongs: the band's body is the subject, its foot is what to do about it.")
		}
	},
	{
		name: "ENTRY",
		file: "COMPONENT/RECORD/RECORDENTRY.ASTRO",
		note: "One record in a set: index marker, glyph, name, chips, one paragraph, optional link.",
		cells: {
			error: NotApplicable$3("An entry is a record, not a condition. Its `state` arm carries a reading state (`LOADING`, `ARCHIVED`) and deliberately not a failure: a record that failed is a `RecordFailure` beside the set."),
			stale: NotApplicable$3("An entry carries no figure and no date of its own. The age of a record belongs to the archive that filed it or the ledger that measured it, and both print their own `AS OF:`."),
			disabled: NotApplicable$3(NotAControl$2("entry")),
			readonly: NotApplicable$3(ReadOnly$2("entry")),
			reducedmotion: NotApplicable$3(NoMotion("entry")),
			one: NotApplicable$3("An entry is one record. `ONE` describes a set, and a set of one is an archive with a single row, which is where the count is printed."),
			many: NotApplicable$3("Many entries are an archive or a grid of cards, and the block prints one. A set of many is `RecordArchive`'s shape, not this block's."),
			nomedia: NotApplicable$3("An entry holds no media: its anatomy is a marker, a name, chips and a claim. A record with a picture is an entry beside a figure, not an entry holding one."),
			rest: Built$3("Index, name, chips, one paragraph, and the name as the link."),
			partial: Built$3("Through `facts`: a fact that is unknown prints the vocabulary's word in its value column, exactly as a ledger row does."),
			longtext: Built$3("The name wraps and the body is measure-capped at 62ch, so a long record name never pushes the chips off the card."),
			dense: Built$3("`dense` is the register reading: marker and name on one line, chips beside them, the body under - never a smaller type."),
			incard: Built$3("At `surface=\"bare\"` the entry is rows inside a Jelly card."),
			inband: Built$3("The ordinary context: entries in a band's body."),
			withaction: Built$3("`href` makes the name the link, and only the name.")
		}
	},
	{
		name: "STAGE",
		file: "COMPONENT/RECORD/RECORDSTAGE.ASTRO",
		note: "An ordered process: a rail of numbered steps, or a field of numbered plates.",
		cells: {
			stale: NotApplicable$3("A stage prints no as-of. A run's age is a fact about a particular run, and a particular run is a `RecordTranscript` - the stage is the process abstracted out of it."),
			disabled: NotApplicable$3(NotAControl$2("stage")),
			readonly: NotApplicable$3(ReadOnly$2("stage")),
			nomedia: NotApplicable$3("A stage is a list of steps: an index, a label and one line. A step with a picture is a plate, and a process drawn as pictures is a plate-set."),
			dense: NotApplicable$3("The stage's two axes are `orientation` and `variant`, and they already answer the two readings of the same data. A third density would be a third composition, which is a second block with one name."),
			rest: Built$3("The rail, read left to right: then, then, then."),
			loading: Built$3("The frame prints the absence and `STATUS: LOADING`."),
			empty: Built$3("A stage with no steps: the head's grammar, the word, the sentence."),
			partial: Built$3("Through a step's own `state`: a run that stopped at step three prints `INTERRUPTED` on that step and nothing on the ones after it."),
			error: Built$3("A failed run is a step with `state=\"INTERRUPTED\"` - the vocabulary's word in the step's register, not a second alarm colour."),
			reducedmotion: Built$3("A step's detail is a `<details>` whose fold mark turns; the turn is the mark layer's and it is already gated on the reader's preference."),
			one: Built$3("A stage of one step is legal and prints as a single item: a process that has one stage is still a process, and the rail does not pretend to be longer."),
			many: Built$3("Nine steps is the too-many arm: the rail wraps, the plates tile, and the numbering stays the caller's - `09` is not derived from a position."),
			longtext: Built$3("The label wraps and the line takes the step's own measure; the index column never moves, because the index is what makes a rail readable."),
			incard: Built$3("A rail inside a Jelly card, at the card's inset."),
			inband: Built$3("The ordinary context: a stage in a band's body."),
			withaction: Built$3("A step's `href` makes its label the link.")
		}
	},
	{
		name: "FIGURE",
		file: "COMPONENT/RECORD/RECORDFIGURE.ASTRO",
		note: "Evidence: a framed figure, a caption at caption weight, and the provenance it came from.",
		cells: {
			stale: NotApplicable$3("A figure's provenance is a file or a commit, not a date. A figure older than the page is a plate, which prints `AS OF:` on its head, or an instrument, which prints the age beside the figure."),
			disabled: NotApplicable$3(NotAControl$2("figure")),
			readonly: NotApplicable$3(ReadOnly$2("figure")),
			one: NotApplicable$3(NotASet$2("figure", "`RecordPlateSet`")),
			many: NotApplicable$3(NotASet$2("figure", "`RecordPlateSet`")),
			dense: NotApplicable$3("Evidence gets its size. A figure shrunk to fit a dense column is a thumbnail, and a thumbnail is a decoration - which is the one thing a figure is not."),
			rest: Built$3("The frame, the caption under it, the provenance line."),
			loading: Built$3("The tombstone prints `STATUS: LOADING` and the caption still explains what would be there."),
			empty: Built$3("`state=\"UNAVAILABLE\"` is the evidence that is not in the build."),
			partial: Built$3("A caption with no provenance prints `SOURCE: UNAVAILABLE` in the channel placement: a figure whose source is unknown is a fact about the figure."),
			error: Built$3("`state=\"INTERRUPTED\"` is the capture that failed."),
			reducedmotion: Built$3("`open` folds the caption's apparatus, and the fold mark's turn is the mark layer's - gated on the reader's preference."),
			longtext: Built$3("A caption longer than the image wraps at 62ch below, or becomes the channel's rows beside it; with `open` it takes 88ch and folds its apparatus away."),
			nomedia: Built$3("With neither `src` nor children the block prints the caption alone - a figure whose evidence is its sentence. No frame is drawn around nothing."),
			incard: Built$3("A figure inside a card's body, at the card's measure."),
			inband: Built$3("The ordinary context: a figure under the paragraph it illustrates."),
			withaction: Built$3("`open` prints `→ OPEN THE SOURCE` in the folded apparatus: the one link a figure may carry, and it leads to the evidence itself.")
		}
	},
	{
		name: "PLATE",
		file: "COMPONENT/RECORD/RECORDPLATE.ASTRO",
		note: "The evidence the record is of, at plate scale: a numbered frame and a channel of manifest facts.",
		cells: {
			disabled: NotApplicable$3(NotAControl$2("plate")),
			readonly: NotApplicable$3(ReadOnly$2("plate")),
			one: NotApplicable$3(NotASet$2("plate", "`RecordPlateSet`")),
			many: NotApplicable$3(NotASet$2("plate", "`RecordPlateSet`")),
			dense: NotApplicable$3("A plate is the size it is. A plate shrunk to fit is a thumbnail, and the whole reason this block is not a figure is that the evidence gets the width."),
			rest: Built$3("The frame, the channel, the manifest's rows, the source."),
			loading: Built$3("The tombstone prints `STATUS: LOADING` inside the frame's ratio."),
			empty: Built$3("The tombstone is the default state of this site's evidence: `UNAVAILABLE` with a `NEXT:`."),
			partial: Built$3("A plate with a state and no `next` prints `NEXT: UNAVAILABLE` rather than nothing - a dead end is not an adverse state."),
			error: Built$3("`state=\"INTERRUPTED\"` is the capture that failed, and the frame keeps its ratio."),
			stale: Built$3("`asOf` prints `AS OF:` on the channel's head, so an old capture is never silent about its age."),
			reducedmotion: Built$3("`open` folds the channel's apparatus; the fold mark's turn is gated on the reader's preference."),
			longtext: Built$3("The channel is a 20-26ch column that stacks under the plate when the container is narrow; a long reading wraps inside its own column."),
			nomedia: Built$3("The frame prints its tombstone; the channel still prints the claim, the facts and the source."),
			incard: Built$3("A plate at a card's measure: `span=\"measure\"` keeps it on the column."),
			inband: Built$3("The ordinary context: a plate in a band's body, at the band's inner width."),
			withaction: Built$3("`open` prints `→ OPEN THE CAPTURE`, which is the only destination a plate needs.")
		}
	},
	{
		name: "WELL",
		file: "COMPONENT/RECORD/RECORDWELL.ASTRO",
		note: "A command, a config block or an output: a recessed mono body under a title bar with the copy control.",
		cells: {
			partial: NotApplicable$3("A well prints what it is given, line for line. A command with a line missing is a DIFFERENT command, and the block cannot know which line was meant - so there is no honest partial arm."),
			error: NotApplicable$3("A failed command is a transcript turn or a failure block. The well prints the command and its output; an outcome with a cause and a next step is `RecordTranscript`'s failed turn."),
			stale: NotApplicable$3("A command has no date. Where it came from is its `SOURCE:` line, and a command that is out of date is a command whose source changed - a fact the source line already carries."),
			disabled: NotApplicable$3("The copy control is ABSENT when there is no clipboard, never disabled: a Jelly control upgraded inside `display: none` has no box, and an inert control is a focus stop that answers nothing."),
			readonly: NotApplicable$3(ReadOnly$2("well")),
			reducedmotion: NotApplicable$3(NoMotion("well")),
			nomedia: NotApplicable$3("A well holds text. An image in a recess is a figure, and a figure in a well is a card inside a card's body."),
			dense: NotApplicable$3("A command must not compress: the one thing a well cannot do is reflow its lines. `wrap` is not a density, it is a declaration that the lines are read rather than typed."),
			rest: Built$3("The bar, the recess, the copy control, the source line."),
			loading: Built$3("The bar keeps its label and the recess prints `STATUS: LOADING`."),
			empty: Built$3("A well with no lines is empty whatever the caller says: the recess prints the absence, never a hole."),
			one: Built$3("A well of one line is the ordinary command."),
			many: Built$3("`window` prints the first N lines and `SHOWING: N OF M` on the foot; the copy payload stays the whole body, so the reader who copies gets the file."),
			longtext: Built$3("`wrap` is the arm the exploration found: `pre-wrap` with a hanging indent, so a 300-character value prints in full instead of scrolling the recess sideways."),
			incard: Built$3("A well inside a card's body, at the card's inset."),
			inband: Built$3("The ordinary context: a command in a band's body."),
			withaction: Built$3("The copy control, wired once by `WireWells` for every consumer.")
		}
	},
	{
		name: "TRANSCRIPT",
		file: "COMPONENT/RECORD/RECORDTRANSCRIPT.ASTRO",
		note: "A session as it happened: mark, speaker, line and stamp, with the source under it.",
		cells: {
			disabled: NotApplicable$3(NotAControl$2("transcript")),
			readonly: NotApplicable$3(ReadOnly$2("transcript")),
			reducedmotion: NotApplicable$3(NoMotion("transcript")),
			nomedia: NotApplicable$3("A transcript is verbatim speech and output. A picture of a session is a capture, and a capture is a plate."),
			dense: NotApplicable$3("A transcript is verbatim: a compressed session has dropped the line that mattered. The too-much arm is `window`, which drops nothing silently."),
			rest: Built$3("Four columns on wide, two rows on narrow; the mark column never moves."),
			loading: Built$3("Mark and speaker in ink, a hairline bar where the line would be."),
			empty: Built$3("The frame's own body prints the caller's sentence."),
			partial: Built$3("`window` prints the first N turns and `SHOWING: N OF M` on the foot."),
			error: Built$3("A failed turn prints its state word in the stamp column and its `CAUSE:` and `NEXT:` under the line, spanning the grid."),
			stale: Built$3("`asOf` prints `AS OF:` on the bar: a session read out of an old build says when it was recorded."),
			one: Built$3("A session of one turn is legal: the frame, the mark column and the source still print."),
			many: Built$3("Two hundred turns is the window's own case: twelve printed, the rest named."),
			longtext: Built$3("A long line wraps inside its column; the speaker column stays fixed, so a reader can still read one speaker down the page."),
			incard: Built$3("A session inside a card's body."),
			inband: Built$3("The ordinary context: a transcript in a band's body."),
			withaction: Built$3("The copy control on the bar, and `retry` on the foot when a turn failed.")
		}
	},
	{
		name: "PAIR",
		file: "COMPONENT/RECORD/RECORDPAIR.ASTRO",
		note: "Two things read against each other: two pods, one hairline gutter, one caption.",
		cells: {
			stale: NotApplicable$3("A pair prints two claims and one caption. A date belongs to a side's own note - which is where the side's provenance prints - because the caption is about both sides and cannot carry one side's age."),
			disabled: NotApplicable$3(NotAControl$2("pair")),
			readonly: NotApplicable$3(ReadOnly$2("pair")),
			reducedmotion: NotApplicable$3(NoMotion("pair")),
			one: NotApplicable$3("A pair is two pods by definition. One pod is `RecordAside`, which is the same frame folded - and the routing table sends it there."),
			many: NotApplicable$3("A third side is a set, and a set is an archive, a matrix or a stage. Three things read against each other is a comparison, not a pair."),
			nomedia: NotApplicable$3("A pod holds prose or one leaf block, never media. A pair of two pictures is a plate-set, which is the block for many figures of one subject."),
			dense: NotApplicable$3("Two things are the minimum a comparison can be; there is nothing left to compress."),
			rest: Built$3("Two columns, one hairline gutter, the caption on the frame's floor."),
			loading: Built$3("A pod's own `state` prints `LOADING` in its bar and the body still prints."),
			empty: Built$3("A pod with no body prints the composed absence and keeps its title bar - the reader has to see WHICH side is missing."),
			partial: Built$3("One side's state is the other's comparison: `UNAVAILABLE` on the right pod is the whole point of a pair."),
			error: Built$3("A pod marked `INTERRUPTED` prints the word in its own bar; the pair's frame does not change."),
			longtext: Built$3("Both pods' bodies wrap at their own measure, and the gutter keeps its 1px whatever the two sides' heights are."),
			incard: Built$3("At `surface=\"bare\"` the pair is structure inside a surface that is already painted."),
			inband: Built$3("The ordinary context: a comparison in a band's body."),
			withaction: Built$3("A pod's slot can hold a block with a link; the pair itself never carries one, because a comparison is not an action.")
		}
	},
	{
		name: "HERO",
		file: "COMPONENT/RECORD/RECORDHERO.ASTRO",
		note: "The record opening: the data card, the blank interval, the evidence panel, one seal.",
		cells: {
			stale: NotApplicable$3("A hero prints the record's facts, and a fact's age is a property of the row (`LedgerRow.asOf`), which `RecordLedger` prints. The artifact itself has no as-of to be older than."),
			disabled: NotApplicable$3(NotAControl$2("hero")),
			readonly: NotApplicable$3(ReadOnly$2("hero")),
			reducedmotion: NotApplicable$3(NoMotion("hero")),
			one: NotApplicable$3("The hero is the page's one artifact. `ONE` describes a set, and a page has one hero because it has one opening, not because the set is short."),
			many: NotApplicable$3("Two heroes is two openings, and a page has one. A second record opening is a band."),
			dense: NotApplicable$3("The artifact gets the screen - that is what makes it the artifact. A dense hero is a band with a card in it."),
			incard: NotApplicable$3("The hero IS the Jelly card: `FieldRecordDataCard` is the surface. A hero inside a card would be two surfaces, which §1.3 forbids."),
			inband: Built$3("The specimen sheet mounts every row inside a band, and the hero renders there; no page composes it that way, because a page has one opening and it is the hero's."),
			rest: Built$3("`49fr / 1px / 51fr`: the record, the hairline gutter, the evidence."),
			loading: Built$3("`evidence.state` prints the tombstone in the evidence panel and the pair keeps its shape."),
			empty: Built$3("With neither `evidence` nor children the card stands alone at the full width - no gap where a picture would be."),
			partial: Built$3("A metadata row that is unknown prints the vocabulary's word in its value column."),
			error: Built$3("`status.state` is the vocabulary's word, and the primitive's tone carries it: `INTERRUPTED` is ink, not red."),
			longtext: Built$3("The claim is the `h1` at the display tier and wraps inside the card; the facts wrap at the card's measure."),
			nomedia: Built$3("The single-column arm: the record without its evidence."),
			withaction: Built$3("One `FieldRecordAction`, and it is the artifact's one expressive element.")
		}
	},
	{
		name: "ARCHIVE",
		file: "COMPONENT/RECORD/RECORDARCHIVE.ASTRO",
		note: "Many records in one form: a marker, a heading, a count, and a list of ruled rows.",
		cells: {
			partial: NotApplicable$3("An archive's rows are either filed or not. A row whose target is gone prints `state: \"gone\"` - a tombstone in the record grammar - which is the honest arm, and there is no third."),
			error: NotApplicable$3("An archive is a set, not an action: it cannot fail. The page that built it can, and that failure is `RecordFailure` in the band above the list."),
			disabled: NotApplicable$3(NotAControl$2("archive")),
			readonly: NotApplicable$3(ReadOnly$2("archive")),
			dense: NotApplicable$3("An archive is dense by construction: one row per record, one hairline between. A second density would be the same list with more air, and the air is the band's."),
			rest: Built$3("The header's count and the rows, one per record."),
			loading: Built$3("The header keeps its counted zero and the absence prints `STATUS: LOADING`."),
			empty: Built$3("No entries is the state this block used to print as a hole: the header's `0` now has a sentence under it."),
			stale: Built$3("The foot's `note` carries when the index was last filed; a windowed archive prints its extent on the same foot."),
			reducedmotion: Built$3("The row's hover trace is `inline-size` and its ink; both are turned off under `prefers-reduced-motion` and the row keeps its state."),
			one: Built$3("An archive with one entry is legal: the header's count prints `1`, the run prints its one row, and the block does not pretend to be a card."),
			many: Built$3("`window` prints the first N rows and `SHOWING: N OF M` on the foot."),
			longtext: Built$3("A long title wraps inside the row; the marker column stays fixed so the titles stay in one column."),
			nomedia: NotApplicable$3("An archive is an index: titles, notes and markers. A row with a picture is a card grid, which is a different artifact."),
			incard: Built$3("An archive inside a card's body, at the card's inset."),
			inband: Built$3("The ordinary context: the index of a chapter."),
			withaction: Built$3("The whole row is the anchor; a gone row is a tombstone instead.")
		}
	},
	{
		name: "ASIDE",
		file: "COMPONENT/RECORD/RECORDASIDE.ASTRO",
		note: "A folded aside: what the record keeps and does not lead with, opened by the reader.",
		cells: {
			partial: NotApplicable$3("An aside holds one claim - prose, rows or one block. A body with a part unknown is a ledger inside the aside, which is where the partial state prints."),
			error: NotApplicable$3("A disclosure cannot fail; it is a `<details>`. A failed action inside it is the block the aside holds, and that block carries the cause and the next step."),
			stale: NotApplicable$3("An aside is not dated. A date belongs to the claim it holds - the ledger's row or the note's `AS OF:` - because the aside is the frame, not the fact."),
			disabled: NotApplicable$3(NotAControl$2("aside")),
			readonly: NotApplicable$3(ReadOnly$2("aside")),
			dense: NotApplicable$3("An aside is already the compressed form of its subject; folding it further would make it unopenable."),
			rest: Built$3("The summary bar: marker, label, the count, the fold mark."),
			loading: Built$3("`state=\"loading\"` prints the state word on the bar and three hairlines in the body."),
			empty: Built$3("`empty` prints the composed absence inside the opened frame, and no body means no frame at all."),
			reducedmotion: Built$3("The fold mark's quarter turn is the mark layer's, gated on the reader's preference."),
			one: Built$3("An aside with one fact is legal: the count prints `〈01〉` and the ledger inside prints one row."),
			many: Built$3("Nine facts fold under one summary and the count says so: that is what the summary's count is for."),
			longtext: Built$3("The label wraps and the body is measure-capped; a long summary still leaves the fold mark at the line's end."),
			nomedia: NotApplicable$3("An aside holds prose, rows or one block. A disclosure that holds a picture is a figure with `open`, and that is the block the routing table sends it to."),
			incard: Built$3("An aside inside a card's body, folded, at the card's inset."),
			inband: Built$3("The ordinary context: a disclosure under the band that raised it."),
			withaction: NotApplicable$3("The summary is the aside's only control, and it is the whole mechanism. An action inside a folded body is an action nobody sees until they have already opened it.")
		}
	},
	{
		name: "MARGIN",
		file: "COMPONENT/RECORD/RECORDMARGIN.ASTRO",
		note: "One annotation in the margin: a marker, a claim, a destination and a source.",
		cells: {
			empty: NotApplicable$3("A note with no claim is a blank in the margin, and a blank is worse than no note. `body` is required and the caller does not mount the block to say nothing."),
			error: NotApplicable$3("A note states a fact beside a record; it is not an action and cannot fail. A failure in the margin is a `RecordFailure` beside the paragraph it belongs to."),
			disabled: NotApplicable$3(NotAControl$2("note")),
			readonly: NotApplicable$3(ReadOnly$2("note")),
			reducedmotion: NotApplicable$3(NoMotion("note")),
			one: NotApplicable$3("A note is one annotation. `ONE` describes a set, and the margin has no set - a second note is a second margin note."),
			many: NotApplicable$3("Many notes are many marginalia, each its own block; the margin is not a list and does not print one."),
			nomedia: NotApplicable$3("A note is a claim and a source. A note that had to carry a figure is `RecordInset`, which is the block for exactly that."),
			dense: NotApplicable$3("A note is already the densest thing that can carry a source; compressing it would remove the source."),
			rest: Built$3("The marker, the claim with its `↳`, the destination, the source."),
			loading: Built$3("`state` prints `LOADING` in the note's own register and the claim still prints."),
			partial: Built$3("No source prints `SOURCE: UNAVAILABLE` - the one place in the layer where a missing field is printed rather than skipped."),
			stale: Built$3("`asOf` prints `AS OF:` beside the state, so a note whose figures were taken a month ago says so."),
			longtext: Built$3("The claim wraps at the margin's 26ch measure; the source row wraps rather than truncating."),
			incard: Built$3("A note inside a card's margin, at the card's measure."),
			inband: Built$3("The ordinary context: a note in a band's margin column."),
			withaction: Built$3("`link` prints `→ LABEL`, or the tombstone when the target is gone.")
		}
	},
	{
		name: "INSET",
		file: "COMPONENT/RECORD/RECORDINSET.ASTRO",
		note: "A marginal note that can hold a figure: a capture, or a measure figure drawn in bars.",
		cells: {
			disabled: NotApplicable$3(NotAControl$2("inset")),
			readonly: NotApplicable$3(ReadOnly$2("inset")),
			reducedmotion: NotApplicable$3(NoMotion("inset")),
			dense: NotApplicable$3("The figure is the reason the block exists; a compressed inset is a margin note with a squashed picture."),
			rest: Built$3("The figure, its caption, the marker, the claim, the destination, the source."),
			loading: Built$3("`figure.state` prints `STATUS: LOADING` in the frame and the claim still prints."),
			empty: Built$3("`empty` prints the composed absence instead of a claim with no figure."),
			partial: Built$3("No source prints `SOURCE: UNAVAILABLE`, and a figure with a state prints `NEXT: UNAVAILABLE` when it has none."),
			error: Built$3("`figure.state=\"INTERRUPTED\"` is the capture that failed, in the frame's own grammar."),
			stale: Built$3("`figure.asOf` prints `AS OF:` under the caption, so a measure taken earlier says when."),
			one: Built$3("One bar is a legal measure figure: a single share of one, printed with its label and its value."),
			many: Built$3("Nine bars stack inside the margin's measure; each keeps its label, its value and its own rule."),
			longtext: Built$3("A bar's label and value share one line and wrap together; the caption wraps at the margin's measure."),
			nomedia: Built$3("The bars ARE the no-media arm: a figure drawn from three rules, with no picture at all."),
			incard: Built$3("An inset inside a card's margin."),
			inband: Built$3("The ordinary context: an annotation with its evidence, beside the paragraph it qualifies."),
			withaction: Built$3("`link` prints `→ LABEL`, or the tombstone when the target is gone.")
		}
	},
	{
		name: "STAMP",
		file: "COMPONENT/RECORD/RECORDSTAMP.ASTRO",
		note: "The mark that says this record is what it claims: a mark, a route, its facts, its authority.",
		cells: {
			empty: NotApplicable$3("A stamp with no mark is not a stamp: `mark` and `authority` are required, and an empty one would be a frame that looked like a guarantee and guaranteed nothing."),
			disabled: NotApplicable$3(NotAControl$2("stamp")),
			readonly: NotApplicable$3(ReadOnly$2("stamp")),
			reducedmotion: NotApplicable$3(NoMotion("stamp")),
			one: NotApplicable$3("A stamp's `rows` are the facts that bound the mark, and one fact is a legal stamp. `ONE` here would be a count of a set the stamp does not have - the mark is one."),
			many: NotApplicable$3("Six facts stack in the stamp's two columns; the count is not the stamp's subject, and the register's figure belongs to a ledger."),
			nomedia: NotApplicable$3("A stamp is a mark and a register: no picture, no figure. A seal is a glyph and belongs to the artifact, not to the stamp."),
			dense: NotApplicable$3("A stamp is four lines and a mark; there is nothing to compress, and a compressed stamp is a badge."),
			rest: Built$3("The mark at section size, the route, the facts in two columns, the authority."),
			loading: Built$3("`state` prints the vocabulary's word on the head and the rows still print - a mark being checked is still a mark."),
			partial: Built$3("A mark with a state and a `note` says what it does not cover, which is the honest partial arm."),
			error: Built$3("`state=\"INTERRUPTED\"` is the verification that did not finish; the mark stays, its route stays, the word says why."),
			stale: Built$3("`expires` prints `EXPIRES:` with the facts that bound the mark, and a mark past its window prints `ARCHIVED`."),
			longtext: Built$3("The mark steps to the heading role on a narrow measure; the rows wrap and the authority wraps under them."),
			incard: Built$3("A stamp inside a card's body, at the card's inset."),
			inband: Built$3("The ordinary context: the mark under the record it authenticates."),
			withaction: Built$3("`verify` prints `→ LABEL` under the authority: the one destination a stamp needs, and never a button.")
		}
	},
	{
		name: "FAILURE",
		file: "COMPONENT/RECORD/RECORDFAILURE.ASTRO",
		note: "One documented way the thing breaks: the state word, the symptom, the cause and the next step.",
		cells: {
			loading: NotApplicable$3("A failure is a condition that has already happened. `LOADING` is a state of a reading, and a failure that has not happened is not one - the block has no arm for a failure in progress."),
			empty: NotApplicable$3("The three fields are required. A failure with no symptom is a blank in a condition block, and a blank condition is a lie about what the reader is looking at."),
			stale: NotApplicable$3("A failure is documented at a commit, not dated: its `SOURCE:` line says where it is written, and that is the only provenance a condition can have."),
			disabled: NotApplicable$3(NotAControl$2("failure")),
			readonly: NotApplicable$3(ReadOnly$2("failure")),
			one: NotApplicable$3("A failure is one condition. `ONE` describes a set, and a set of failures is a table of them - each its own block, side by side."),
			many: NotApplicable$3("Three failures side by side align on SYMPTOM, CAUSE and NEXT because each is its own block. The block prints one; the alignment is the composition's."),
			nomedia: NotApplicable$3("A failure is four fields. A screenshot of a failure is a figure beside it, not inside it - the block's own note says a stack trace is a well beside it."),
			dense: NotApplicable$3("The three fields ARE the density. A failure with a shorter cause is a failure that stopped explaining itself."),
			rest: Built$3("The marker, the state word, the three fields, the source."),
			partial: Built$3("No recovery path prints `NEXT: UNAVAILABLE` and marks the block `--dead-end`: a documented dead end is a fact, not a blank."),
			error: Built$3("A failure is the error state, and it prints its own subject in the fixed vocabulary."),
			reducedmotion: Built$3("`detail` folds under the fields, and the fold mark's turn is gated on the reader's preference."),
			longtext: Built$3("The fields' values wrap inside their own column; the key column stays fixed so three failures align."),
			incard: Built$3("A failure inside a card's body, at the card's inset."),
			inband: Built$3("The ordinary context: the conditions under the band that documents them."),
			withaction: Built$3("`recovery` prints `→ LABEL` under the next step: the destination the sentence names.")
		}
	}
];
/** The cell at a row and a column: the row's override, or the built default. */
var MatrixCell$4 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$3 = () => Rows$4.flatMap((row) => Columns$4.map((column) => ({
	row,
	column,
	cell: MatrixCell$4(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$4 = Rows$4.length * Columns$4.length;
/** How many cells the family builds. */
var BuiltCount$4 = MatrixCells$3().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$4 = CellCount$4 - BuiltCount$4;
/** How many cells one row builds. */
var BuiltOf$4 = (Row) => Columns$4.filter((Column) => MatrixCell$4(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$3 = (Column) => Rows$4.filter((Row) => MatrixCell$4(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$4 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$4.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$4.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$4)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$4)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$4)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$4.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/NARRATIVE.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that revealed
* it. An improvement with no cell behind it would be a preference.
*/
var Improvements$3 = [
	{
		component: "BAND",
		from: "EMPTY / LOADING",
		found: "A chapter whose subject was not written yet rendered nothing: the band printed its heading and stopped, so a reader saw a title with a hole under it and no way to tell a missing set from a short one.",
		built: "`Band.state` with `Band.empty`: the head, the standfirst, the index strip and the footnote all print, and the body becomes the composed absence - `◎`, `STATUS:`, the caller's sentence. The band's own footnote is still the last thing read, so the next step sits under the absence."
	},
	{
		component: "BAND",
		from: "DENSE",
		found: "Every band spent the chapter interval and the chapter heading tier, so a band used as a section inside a hero or a card opened at the volume of a page movement.",
		built: "`Band.dense` prints the head at the heading tier and the body at the tight step, with the chapter interval dropped: a section of an artifact reads as a section, and the page's air stays the page's."
	},
	{
		component: "ENTRY",
		from: "EMPTY / LOADING / ARCHIVED",
		found: "An entry's `body` was required, so a record that was being read, or one that had been retired, could not be printed at all - the set either omitted the slot or lied with a placeholder sentence.",
		built: "`Entry.state` keeps the index, the name and the chips and replaces only the claim: `empty` and `loading` print the composed absence, `archived` prints the claim with `STATUS: ARCHIVED` above it in the quiet tone. The record is still filed, and the list still knows where it sits."
	},
	{
		component: "ENTRY",
		from: "FACTS",
		found: "An entry that carried three facts had to spell them into its paragraph, so a set of records that were comparable as facts could not be read as a register.",
		built: "`Entry.facts` prints the record's own `<dl>` under the claim - the entry's grammar, not a mounted `RecordLedger`, because a leaf may not hold a block (§4.2). `Entry.note` gives the record one `SOURCE:` line, which is the only place it had to say where it is filed."
	},
	{
		component: "ENTRY",
		from: "DENSE",
		found: "`surface=\"bare\"` removed the frame but kept the entry's tall anatomy, so ten records inside one card still read as ten cards' worth of air.",
		built: "`Entry.dense` is the register reading: marker and name on one line, chips beside them, the claim under at the body tier - a hairline between rows instead of a frame around each. Never a smaller type."
	},
	{
		component: "STAGE",
		from: "PARTIAL / ERROR",
		found: "A rail of steps said nothing about where the run was. A build that had stopped at stage three printed the same nine items as a build that had never started, so the block described a process and not a run.",
		built: "`RecordStage.current` names the step the run is at by the index the caller wrote; that step prints `aria-current=\"step\"`, the attested square and the divider's rule. A step's own `state` prints the vocabulary's word - `INTERRUPTED` on the step that stopped - so the rail carries a run's position without becoming a stepper."
	},
	{
		component: "STAGE",
		from: "LONG",
		found: "A stage's line is one line, and every step that needed a paragraph either broke that rule or lost the paragraph. The block had no level between the line and the page.",
		built: "`Stage.detail` turns the step's line into a `<details>` summary with the paragraph one level in: closed, the rail keeps its reading rhythm; open, the step explains itself. No script - the browser owns the disclosure, and its own in-page search finds the text while it is closed."
	},
	{
		component: "STAGE",
		from: "EMPTY / ONE / MANY",
		found: "A stage with no steps printed an empty `<ol>`; a stage with one step printed a rail that looked like a failure; a stage with nine wrapped into a shape nobody had composed.",
		built: "`stages.length === 0` is now the composed absence in the frame's own grammar, and one step and nine steps are both printed by the same two arms - the rail wraps, the plates tile two across, and the caller's numbering is never re-derived from a position."
	},
	{
		component: "FIGURE",
		from: "NO MEDIA / LONG",
		found: "A figure with a caption longer than its image had no answer: the caption ran to the measure cap and the provenance sat under it, so the one case the brief names by hand read as a paragraph that happened to follow a picture.",
		built: "`Figure.open` folds the caption's apparatus: the summary is the caption itself, so shutting it loses nothing, and the open arm prints the `SOURCE:` row, the `〈FIGURE〉` folio and `→ OPEN THE SOURCE` - the full-size evidence, without a lightbox. With no `src` and no children the block still prints the caption alone and draws no frame around nothing."
	},
	{
		component: "FIGURE",
		from: "PARTIAL / ERROR",
		found: "The tombstone printed its state word and stopped, so a reader told that the capture was interrupted had no next step - a dead end wearing an adverse state's grammar.",
		built: "`Figure.next` prints `NEXT:` inside the tombstone, the way a plate already did, and the channel placement's missing provenance prints `SOURCE: UNAVAILABLE` instead of omitting the row."
	},
	{
		component: "PLATE",
		from: "PARTIAL / NO MEDIA",
		found: "A plate with a state and no `next` printed the state and stopped: the same dead end as a figure, in the block whose whole subject is the capture that is not in the build.",
		built: "`plate.next` now falls back to `NEXT: UNAVAILABLE` in the quiet tone, so the row always prints and always says whether a next step exists. `Plate.open` folds the channel's apparatus - the reading, the manifest's facts, the source and `→ OPEN THE CAPTURE` - under the `FIGURE:` claim."
	},
	{
		component: "WELL",
		from: "LONG / MANY",
		found: "The body was `white-space: pre` and scrolled sideways, which is right for a command and wrong for the config and output a well also carries: a 300-character value forced a reader to scroll a recess to find the end of a line. A two-hundred-line log printed all two hundred.",
		built: "`Well.wrap` is the caller's declaration that the lines are read rather than typed: `pre-wrap` with a hanging indent, every character printed. `Well.window` prints the first N lines and `SHOWING: N OF M` on the foot while the copy payload stays whole - the reader who copies gets the file."
	},
	{
		component: "WELL",
		from: "EMPTY / PARTIAL",
		found: "A well with no lines printed an empty recess under a title bar, and there was no way to say `this command is not documented yet` - the recess was indistinguishable from a well whose content failed to load.",
		built: "`Well.state` with `Well.empty`: the bar keeps its label so the reader knows WHICH command is missing, and the recess prints `STATUS:` and the sentence. `Well.note` gives the well one line for what the command assumes, printed in its own foot rather than as a paragraph beside it."
	},
	{
		component: "TRANSCRIPT",
		from: "ERROR",
		found: "A failed turn printed `INTERRUPTED` in the stamp column and nothing else: a red word where the cause and the next step belong, and no way to say what the session could do about it.",
		built: "`Turn.cause` and `Turn.next` print under the failed turn's line in a row that spans the grid, and `Transcript.retry` prints the session's one way back on the foot - once, not repeated under every turn that stopped at the same place."
	},
	{
		component: "PAIR",
		from: "EMPTY / PARTIAL",
		found: "A pod with no body rendered a title bar over nothing, so a comparison with one side missing read as a card with a gap - and the reader could not tell which side was missing.",
		built: "`PairPod.empty` prints the composed absence inside the pod and keeps its bar; `PairPod.state` prints the side's own word in that bar; `PairPod.note` gives the side its own provenance, which the shared caption cannot carry."
	},
	{
		component: "PAIR",
		from: "REST",
		found: "The pair's caption made its statement at the foot, after both sides had been read - so the one thing that made two columns one artifact arrived last.",
		built: "`Pair.relation` prints the relation in the gutter the pair already draws: vertical on wide screens, a row between the stacked pods on narrow ones. The caption still closes the artifact; the relation now says how the two sides bear on each other where the eye is."
	},
	{
		component: "HERO",
		from: "NO MEDIA / ERROR",
		found: "A hero whose capture was not in the build either lost its evidence panel - collapsing the artifact into one column - or framed a broken image, because `HeroEvidence` required `src` and `alt` and had no absent arm.",
		built: "`HeroEvidence.state` and `.next` print the tombstone in the evidence panel: the pair keeps its `49fr / 1px / 51fr`, the hairline gutter stays, and the panel says what is missing and what to do about it."
	},
	{
		component: "ARCHIVE",
		from: "EMPTY / ONE / MANY",
		found: "An archive with no entries printed its header, its `0`, and nothing under them - the one state the brief calls `empty` was a hole. A two-hundred-entry index printed all two hundred, and a row whose target had gone printed a dead link.",
		built: "`Archive.state` with `Archive.empty` prints the counted zero and the composed absence; `Archive.window` prints the first N rows and `SHOWING: N OF M` on the foot; `ArchiveEntry.state = \"gone\"` prints a tombstone row with the route it used to have. One entry is printed by the same arms and the count says `1`."
	},
	{
		component: "ASIDE",
		from: "ONE / MANY / LOADING",
		found: "A folded section gave the reader no way to decide whether to open it: the summary was a label, and the body's extent was invisible until it had already been read.",
		built: "`Aside.count` prints `〈04〉` on the summary, derived from the rows or paragraphs the aside holds unless the caller knows the real extent. `Aside.state = \"loading\"` prints the state word on the bar and three hairlines in the body - the shape of the disclosure before its content."
	},
	{
		component: "MARGIN",
		from: "STALE",
		found: "A note could say `LOADING` or `UNAVAILABLE` but not WHEN its claim was true, so the one annotation whose job is provenance was the one that could not be dated.",
		built: "`MarginNote.asOf` prints `AS OF:` beside the state on one register row above the claim: the two facts that decide how much the note is worth arrive before the note itself."
	},
	{
		component: "INSET",
		from: "MANY / PARTIAL",
		found: "A measure figure of three bars printed three claims and never their sum, so the one figure the inset exists to draw could not be read as a whole. An absent figure had no next step.",
		built: "`InsetFigure.total` prints the caller's sum under the bars on the divider's rule - the caller's arithmetic, never the block's - and `InsetFigure.next` prints `NEXT:` inside the absent frame, falling back to `UNAVAILABLE`."
	},
	{
		component: "STAMP",
		from: "STALE / WITH ACTION",
		found: "A stamp said what made it true and never when it stopped being true, and it had no way to point at the route that checks it: the authority was a sentence the reader had to take on trust.",
		built: "`Stamp.expires` prints `EXPIRES:` with the facts that bound the mark, and `Stamp.verify` prints `→ LABEL` under the authority - the one destination a stamp needs, printed as a link and never as a button, and suppressed on a withdrawn mark because a withdrawn mark has nothing left to verify."
	},
	{
		component: "FAILURE",
		from: "PARTIAL / ERROR",
		found: "The brief's own case - a failure with no recovery path - printed an empty `NEXT:` value or a sentence pointing nowhere. The block had no way to say that the dead end was the finding.",
		built: "`next` that is empty or `UNAVAILABLE` prints the vocabulary's word in the value's place and marks the block `--dead-end`, so the absence of a next step is visibly a fact. `Failure.recovery` prints the destination the sentence names as the block's one link, and `Failure.detail` folds the reproduction under the three fields."
	}
];
/**
* Four things this card saw and did not change.
*
* A card that fixed everything it noticed would be a card that changed surfaces
* it was not given. These are recorded rather than acted on, so the next card
* starts from the finding instead of rediscovering it.
*/
var Observations$3 = [
	{
		component: "PLATE / PLATE-SET",
		found: "`RecordPlate` and `RecordPlateSet` both print a tombstone and both now print a `NEXT:` fallback, but the two tombstones are drawn by two partials with two sets of names. They should share one mark-and-word component before a third block grows a third copy.",
		owner: "a later card on the apparatus blocks"
	},
	{
		component: "WELL / TRANSCRIPT",
		found: "Both blocks mount `WireWells` from their own module script, so a page with three wells ships the wiring three times. It is idempotent and it works; it is not one script, and the duplication is invisible until a page mounts both blocks.",
		owner: "`Library/Document/WireWells`"
	},
	{
		component: "STAGE",
		found: "`RecordStage` prints a step's `state` as a `STATUS:` word, and `RecordTrace` prints a step's state as a mark. Two blocks, two registers, one vocabulary - defensible, but it is a decision nobody wrote down, and the next card should either record it or unify it.",
		owner: "the owner's reading"
	},
	{
		component: "PAIR / TRANSCRIPT / STAGE",
		found: "Every width switch in this family is a viewport media query (`@include bp(768px)`, `bp(1024px)`), not a container query. So the narrow arm only exists when the WINDOW is narrow: a block placed in a narrow column on a wide screen prints its wide composition, squeezed - which is why the plate's rows are all printed at the band width and the narrow cells of the matrix can only be seen by resizing. The fix is a `@container` on each block's own box, and it is a change to nine partials' breakpoints rather than to one block.",
		owner: "a card on the family's width contract"
	}
];
/**
* The live rows.
*
* Ordered as the matrix's groups: the frames, the sequences, the evidence, the
* apparatus. Every one of the fifteen components appears at least once, the nine
* combinations the brief named by hand each get a row of their own, and the rows
* that carry a context are the same component in two different boxes - which is
* the claim this family has to prove.
*/
var Specimens$4 = [
	{
		mark: "01",
		group: "frames",
		state_name: "REST",
		component: "Band",
		when: "The ordinary chapter: a kicker, a heading, a standfirst, a body and a footnote.",
		kind: "band",
		label: "/THE SUBSTITUTION"
	},
	{
		mark: "02",
		group: "frames",
		state_name: "EMPTY",
		component: "Band",
		when: "A chapter whose subject is not written yet: the head prints and the body states what is missing.",
		kind: "band",
		state: "empty",
		label: "/THE LEDGER",
		empty: "No fact is filed under this chapter yet. The ledger is the block that holds them, and it has nothing to hold: a chapter with a heading and no rows is a subject someone has not written."
	},
	{
		mark: "03",
		group: "frames",
		state_name: "LOADING",
		component: "Band",
		when: "A chapter being read: the head is here, the body is not, and the word says so.",
		kind: "band",
		state: "loading",
		label: "/THE TRACE",
		empty: "The trace is being read out of the build. The chapter's head is printed first because the heading is how the reader knows what has not arrived."
	},
	{
		mark: "04",
		group: "frames",
		state_name: "DENSE",
		component: "Band",
		when: "A band used as a section inside an artifact: the heading steps down and the chapter's air stays the page's.",
		kind: "band",
		label: "/SECTION OF A CARD",
		dense: true,
		width: "card"
	},
	{
		mark: "05",
		group: "frames",
		state_name: "REST",
		component: "Entry",
		when: "One record in a set: the marker, the name, the chips and one paragraph.",
		kind: "entry",
		label: "LAND"
	},
	{
		mark: "06",
		group: "frames",
		state_name: "EMPTY",
		component: "Entry",
		when: "A record that is filed and not written: the name and the chips print, the claim is the absence.",
		kind: "entry",
		state: "empty",
		label: "MOUNTAIN",
		empty: "This record has a name and no claim yet. The index is printed because the record is filed, and the body is the absence because the claim is not."
	},
	{
		mark: "07",
		group: "frames",
		state_name: "ARCHIVED",
		component: "Entry",
		when: "A retired record: it keeps its name and its claim and prints the word that says it is retired.",
		kind: "entry",
		state: "archived",
		label: "ECHO"
	},
	{
		mark: "08",
		group: "frames",
		state_name: "DENSE",
		component: "Entry",
		when: "Ten records read as a register: marker and name on one line, a hairline between, never a smaller type.",
		kind: "entry",
		label: "WIND",
		dense: true,
		surface: "bare",
		width: "card"
	},
	{
		mark: "09",
		group: "frames",
		state_name: "FACTS",
		component: "Entry",
		when: "A record whose facts are comparable: the claim first, then its own register under it.",
		kind: "entry",
		label: "SKY",
		variant: "facts"
	},
	{
		mark: "10",
		group: "frames",
		state_name: "REST",
		component: "Hero",
		when: "The page's one artifact: the record, the hairline gutter, the evidence.",
		kind: "hero"
	},
	{
		mark: "11",
		group: "frames",
		state_name: "NO EVIDENCE",
		component: "Hero",
		when: "A record whose evidence is not a picture: the card stands alone at the full width, with no gap.",
		kind: "hero",
		variant: "nofigure"
	},
	{
		mark: "12",
		group: "frames",
		state_name: "EVIDENCE ABSENT",
		component: "Hero",
		when: "The capture is not in the build: the panel keeps its place and prints the tombstone, never a broken image.",
		kind: "hero",
		state: "unavailable",
		empty: "The capture of the workbench is not in this build. The panel keeps the artifact's shape, and the plate's manifest is where the reading lives."
	},
	{
		mark: "13",
		group: "frames",
		state_name: "REST",
		component: "Pair",
		when: "Two things read against each other: two pods, one hairline gutter, one caption.",
		kind: "pair"
	},
	{
		mark: "14",
		group: "frames",
		state_name: "ONE POD EMPTY",
		component: "Pair",
		when: "A comparison with one side missing: the pod keeps its bar, so the reader sees which side is absent.",
		kind: "pair",
		state: "empty",
		empty: "No reading is filed for this side. The pod keeps its title bar because a comparison has to say which of its two sides is missing."
	},
	{
		mark: "15",
		group: "frames",
		state_name: "RELATION",
		component: "Pair",
		when: "A pair whose two sides declare how they bear on each other: the relation runs in the gutter.",
		kind: "pair",
		variant: "relation"
	},
	{
		mark: "16",
		group: "frames",
		state_name: "FOLDED",
		component: "Aside",
		when: "What the record keeps and does not lead with: closed by default, opened by the reader.",
		kind: "aside"
	},
	{
		mark: "17",
		group: "frames",
		state_name: "COUNTED",
		component: "Aside",
		when: "A disclosure whose summary says how much is behind it, so the reader can decide without opening.",
		kind: "aside",
		variant: "count"
	},
	{
		mark: "18",
		group: "frames",
		state_name: "LOADING",
		component: "Aside",
		when: "A folded section being read: the bar prints the word and the body prints its own shape.",
		kind: "aside",
		state: "loading"
	},
	{
		mark: "19",
		group: "frames",
		state_name: "OPEN",
		component: "Aside",
		when: "A disclosure printed open, for the page whose argument needs it read rather than found.",
		kind: "aside",
		variant: "open"
	},
	{
		mark: "20",
		group: "sequences",
		state_name: "RAIL",
		component: "Stage",
		when: "A process the reader follows: then, then, then, read left to right.",
		kind: "stage",
		rows: 4
	},
	{
		mark: "21",
		group: "sequences",
		state_name: "ONE STEP",
		component: "Stage",
		when: "A process with one stage is still a process: the rail does not pretend to be longer.",
		kind: "stage",
		rows: 1
	},
	{
		mark: "22",
		group: "sequences",
		state_name: "NINE STEPS",
		component: "Stage",
		when: "The too-many arm: nine steps wrap, and the caller's numbering stays the caller's.",
		kind: "stage",
		rows: 9
	},
	{
		mark: "23",
		group: "sequences",
		state_name: "THE RUN'S POSITION",
		component: "Stage",
		when: "A run that is somewhere: the current step takes the square and `aria-current`, and the rest read around it.",
		kind: "stage",
		rows: 5,
		variant: "current",
		current: "03"
	},
	{
		mark: "24",
		group: "sequences",
		state_name: "STOPPED",
		component: "Stage",
		when: "A run that stopped: the step that failed prints the vocabulary's word in its own register.",
		kind: "stage",
		rows: 5,
		state: "interrupted"
	},
	{
		mark: "25",
		group: "sequences",
		state_name: "STEP DETAIL",
		component: "Stage",
		when: "A step that needs a paragraph: the line stays the summary and the paragraph folds one level in.",
		kind: "stage",
		rows: 3,
		variant: "detail"
	},
	{
		mark: "26",
		group: "sequences",
		state_name: "PLATES",
		component: "Stage",
		when: "A process the reader refers back to: the same steps as a field of numbered instruments.",
		kind: "stage",
		rows: 4,
		variant: "plates"
	},
	{
		mark: "27",
		group: "sequences",
		state_name: "NO STEPS",
		component: "Stage",
		when: "A process with nothing in it: the frame prints the absence rather than an empty list.",
		kind: "stage",
		rows: 0,
		empty: "No stage of this process is documented yet. The pipeline is described in prose on `/Doc/Build-Pipeline`, and a rail with no steps would be a promise the page cannot keep."
	},
	{
		mark: "28",
		group: "sequences",
		state_name: "ARCHIVE",
		component: "Archive",
		when: "Many records in one form: the marker, the heading, the count, and a ruled row per record.",
		kind: "archive",
		rows: 6
	},
	{
		mark: "29",
		group: "sequences",
		state_name: "ONE ENTRY",
		component: "Archive",
		when: "A set of one: the count says `1` and the block does not pretend to be a card.",
		kind: "archive",
		rows: 1
	},
	{
		mark: "30",
		group: "sequences",
		state_name: "NO ENTRIES",
		component: "Archive",
		when: "An index with nothing filed: the counted zero and the sentence under it, not a hole.",
		kind: "archive",
		rows: 0,
		empty: "Nothing is filed under this index yet. The archive is built from the collection at build time, so an index with no rows is a collection that has not been written."
	},
	{
		mark: "31",
		group: "sequences",
		state_name: "WINDOW",
		component: "Archive",
		when: "The too-many arm: the first twelve rows print and the foot names the two hundred and forty.",
		kind: "archive",
		rows: 12,
		variant: "window"
	},
	{
		mark: "32",
		group: "sequences",
		state_name: "A ROW GONE",
		component: "Archive",
		when: "A record whose target is gone: a tombstone row with the route it used to have, never a dead link.",
		kind: "archive",
		rows: 5,
		variant: "gone"
	},
	{
		mark: "33",
		group: "sequences",
		state_name: "REST",
		component: "Transcript",
		when: "A session as it happened: the mark column, the speaker, the line and the stamp.",
		kind: "transcript",
		rows: 6
	},
	{
		mark: "34",
		group: "sequences",
		state_name: "FAILED TURN",
		component: "Transcript",
		when: "A turn that failed: the word in the stamp column and its cause and next step under the line.",
		kind: "transcript",
		rows: 6,
		state: "failed"
	},
	{
		mark: "35",
		group: "sequences",
		state_name: "WINDOW",
		component: "Transcript",
		when: "A session of two hundred turns: twelve print, and the foot says so.",
		kind: "transcript",
		rows: 12,
		variant: "window"
	},
	{
		mark: "36",
		group: "sequences",
		state_name: "LOADING",
		component: "Transcript",
		when: "A session being read: mark and speaker in ink, a hairline where the line will be.",
		kind: "transcript",
		rows: 4,
		state: "loading"
	},
	{
		mark: "37",
		group: "sequences",
		state_name: "NO TURNS",
		component: "Transcript",
		when: "A session with nothing in it: the frame's own body says why, and the source still prints.",
		kind: "transcript",
		rows: 0,
		empty: "The build was not run at the commit this page was built from, so there is no session to print. The transcript is a record of a run, and a run that did not happen leaves no record."
	},
	{
		mark: "38",
		group: "evidence",
		state_name: "REST",
		component: "Figure",
		when: "Evidence under the paragraph it illustrates: the frame, the caption, the provenance.",
		kind: "figure"
	},
	{
		mark: "39",
		group: "evidence",
		state_name: "NO IMAGE",
		component: "Figure",
		when: "A figure whose evidence is its sentence: the caption prints and no frame is drawn around nothing.",
		kind: "figure",
		variant: "nofigure"
	},
	{
		mark: "40",
		group: "evidence",
		state_name: "CAPTION LONGER THAN THE IMAGE",
		component: "Figure",
		when: "The one case the brief names: the caption is the whole reading, and it never truncates.",
		kind: "figure",
		variant: "long"
	},
	{
		mark: "41",
		group: "evidence",
		state_name: "OPENS",
		component: "Figure",
		when: "A figure that can open: the caption is the summary, the apparatus and the full-size source fold under it.",
		kind: "figure",
		variant: "open"
	},
	{
		mark: "42",
		group: "evidence",
		state_name: "ABSENT",
		component: "Figure",
		when: "Evidence that is not in the build: the tombstone, the word, and the next step under it.",
		kind: "figure",
		state: "unavailable"
	},
	{
		mark: "43",
		group: "evidence",
		state_name: "REST",
		component: "Plate",
		when: "The evidence the record is of, at plate scale: a numbered frame and a channel of manifest facts.",
		kind: "plate"
	},
	{
		mark: "44",
		group: "evidence",
		state_name: "NO CAPTURE",
		component: "Plate",
		when: "The default state of this site's evidence: the frame keeps its ratio and the channel keeps the facts.",
		kind: "plate",
		state: "unavailable"
	},
	{
		mark: "45",
		group: "evidence",
		state_name: "OPENS",
		component: "Plate",
		when: "A plate whose apparatus folds: the claim stays, the reading and the capture link open.",
		kind: "plate",
		variant: "open"
	},
	{
		mark: "46",
		group: "evidence",
		state_name: "BARS",
		component: "Inset",
		when: "A margin that holds a measure figure: three rules whose lengths are their shares, in one ink.",
		kind: "inset",
		variant: "bars"
	},
	{
		mark: "47",
		group: "evidence",
		state_name: "TOTAL",
		component: "Inset",
		when: "A measure figure whose bars add up: the sum prints under them on the divider's rule.",
		kind: "inset",
		variant: "total"
	},
	{
		mark: "48",
		group: "evidence",
		state_name: "NO FIGURE",
		component: "Inset",
		when: "An inset with no figure is a margin note in an inset's frame - the routing table says which block answers.",
		kind: "inset",
		variant: "nofigure"
	},
	{
		mark: "49",
		group: "evidence",
		state_name: "FIGURE ABSENT",
		component: "Inset",
		when: "A figure that is not there: the frame prints the word and the next step, and the claim still prints.",
		kind: "inset",
		variant: "absent"
	},
	{
		mark: "50",
		group: "apparatus",
		state_name: "REST",
		component: "Well",
		when: "A command the reader copies: the bar, the recess, the control and the source.",
		kind: "well"
	},
	{
		mark: "51",
		group: "apparatus",
		state_name: "WRAPPED",
		component: "Well",
		when: "A config or an output whose long line is a value: `pre-wrap` with a hanging indent, every character printed.",
		kind: "well",
		variant: "wrap"
	},
	{
		mark: "52",
		group: "apparatus",
		state_name: "WINDOW",
		component: "Well",
		when: "A long command: the first four lines print, the foot names the two hundred and forty, and the copy keeps every line the block holds.",
		kind: "well",
		variant: "window"
	},
	{
		mark: "53",
		group: "apparatus",
		state_name: "NO COMMAND",
		component: "Well",
		when: "A command that is not documented yet: the bar keeps its label and the recess prints the absence.",
		kind: "well",
		state: "empty",
		empty: "This command is not documented yet. The bar prints its label so the reader knows which one is missing, and the recess says why it is empty rather than showing a hole."
	},
	{
		mark: "54",
		group: "apparatus",
		state_name: "REST",
		component: "Stamp",
		when: "The mark that says the record is what it claims: a mark, a route, its facts, its authority.",
		kind: "stamp"
	},
	{
		mark: "55",
		group: "apparatus",
		state_name: "WITHDRAWN",
		component: "Stamp",
		when: "A mark that was true and is not: it keeps its facts, loses its route and prints the reason.",
		kind: "stamp",
		state: "revoked"
	},
	{
		mark: "56",
		group: "apparatus",
		state_name: "EXPIRING",
		component: "Stamp",
		when: "A mark with a window: `EXPIRES:` prints with its facts, and `→ VERIFY` is where the reader checks it.",
		kind: "stamp",
		variant: "expires"
	},
	{
		mark: "57",
		group: "apparatus",
		state_name: "REST",
		component: "Margin",
		when: "An annotation beside the record: a marker, a claim, a destination and a source.",
		kind: "margin"
	},
	{
		mark: "58",
		group: "apparatus",
		state_name: "NO SOURCE",
		component: "Margin",
		when: "A note whose claim cannot be checked: `SOURCE: UNAVAILABLE` prints - the one place a missing field is printed.",
		kind: "margin",
		variant: "nosource"
	},
	{
		mark: "59",
		group: "apparatus",
		state_name: "TARGET GONE",
		component: "Margin",
		when: "A note whose destination is not in the build: the tombstone with the route it used to have.",
		kind: "margin",
		variant: "gone"
	},
	{
		mark: "60",
		group: "apparatus",
		state_name: "REST",
		component: "Failure",
		when: "One documented way the thing breaks: the word, the symptom, the cause and the next step.",
		kind: "failure"
	},
	{
		mark: "61",
		group: "apparatus",
		state_name: "NO WAY OUT",
		component: "Failure",
		when: "The brief's own case: a failure with no recovery path says `NEXT: UNAVAILABLE` and marks the dead end.",
		kind: "failure",
		variant: "deadend"
	},
	{
		mark: "62",
		group: "apparatus",
		state_name: "WITH A WAY BACK",
		component: "Failure",
		when: "A failure that names its destination: `→` under the next step, and the reproduction folded under it.",
		kind: "failure",
		variant: "recovery"
	}
];
/** The rows of one group, in the order they were written. */
var InGroup$4 = (Group) => Specimens$4.filter((Specimen) => Specimen.group === Group);
/** The four groups, with the one line each that says what it holds. */
var Groups$4 = [
	{
		key: "frames",
		label: "/THE FRAMES",
		note: "The blocks that hold a subject: the band, the entry, the opening, the comparison and the disclosure. A frame is read before it is looked at."
	},
	{
		key: "sequences",
		label: "/THE SEQUENCES",
		note: "The blocks that hold an order: a process, an index and a session. Each one is read in the direction its data runs, and each one has a too-many arm."
	},
	{
		key: "evidence",
		label: "/THE EVIDENCE",
		note: "The blocks that show something: a figure in a column, a plate at plate scale and an inset in a margin. All three answer what a picture proves, at three distances."
	},
	{
		key: "apparatus",
		label: "/THE APPARATUS",
		note: "The blocks that let the document prove itself: the command, the mark, the note and the failure. None of them is prose, and none of them is decoration."
	}
];
Specimens$4.length;
// Source/Content/Specimen/Overlay.ts
/**
* The twenty columns, in reading order: what the overlay is doing, what it is
* asked to hold, then where it is put. States first because they are the two
* seconds a reader meets; contexts last because they are the ones a designer
* forgets.
*/
var Columns$3 = [
	{
		key: "rest",
		label: "REST",
		ask: "closed, trigger readable",
		group: "state"
	},
	{
		key: "hover",
		label: "HOVER",
		ask: "the pointer is on the door",
		group: "state"
	},
	{
		key: "focus",
		label: "FOCUS",
		ask: "the keyboard is on the door",
		group: "state"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "the door cannot open",
		group: "state"
	},
	{
		key: "current",
		label: "CURRENT",
		ask: "a row is the value in force",
		group: "state"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "the rows have not arrived",
		group: "state"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "there is nothing to hold",
		group: "state"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "the action was cut off",
		group: "state"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "some rows, some unknown",
		group: "state"
	},
	{
		key: "one",
		label: "ONE ITEM",
		ask: "a single row",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY ITEMS",
		ask: "two hundred, not six",
		group: "shape"
	},
	{
		key: "long",
		label: "LONG TEXT",
		ask: "a label that will not fit",
		group: "shape"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight rhythm",
		group: "shape"
	},
	{
		key: "submenu",
		label: "SUBMENU ×3",
		ask: "three levels of relation",
		group: "shape"
	},
	{
		key: "tall",
		label: "TALLER THAN THE VIEWPORT",
		ask: "the panel outgrows the screen",
		group: "shape"
	},
	{
		key: "edge",
		label: "NEAR THE RIGHT EDGE",
		ask: "no room to open sideways",
		group: "context"
	},
	{
		key: "card",
		label: "INSIDE A CARD",
		ask: "anchored in a white insert",
		group: "context"
	},
	{
		key: "narrow",
		label: "NARROW COLUMN",
		ask: "a 16rem column",
		group: "context"
	},
	{
		key: "wide",
		label: "WIDE BAND",
		ask: "the band's own width",
		group: "context"
	},
	{
		key: "orphan",
		label: "TRIGGER REMOVED",
		ask: "the door leaves while open",
		group: "context"
	}
];
/**
* The reasons, written once each and reused where the same fact holds.
*
* A reason repeated verbatim in two rows is one fact about the family, not two;
* writing it once is how a reader sees that `DRAWER / CURRENT` and
* `SHEET / CURRENT` are the same absence for the same cause.
*/
var Reason = {
	noRow: "a modal panel has no persistent row to mark. `current` is the item grammar's state - the value in force in a set the reader is choosing from - and a dialog, a sheet, a drawer or a popover holds no set it chooses from.",
	noDensity: "a panel takes its density from the block inside it - `RecordLedger`, the `.Slip__Row` grammar, a `RecordWell`. A second density switch on the panel would be a second source of truth for one rhythm, and the first thing it would do is disagree with the block. The slip's `data-density` is the *list* surfaces' switch - it tightens a row, and a panel has no rows of its own to tighten.",
	noSubmenu: "a panel holds content, not menu rows. A submenu three deep is a menu's problem - the slip's own `Trail` head states the path - and a panel that grew one would be a menu in a box.",
	noEdge: "a modal is centred by definition. It has no anchor to collide with, so there is no edge for it to be near.",
	noCard: "a modal portals to the body. It cannot sit inside a card - and a panel painted inside a card would be a card inside a card, which is the one composition the identity refuses.",
	noLoad: "a menu is composed with the region or the trigger that opens it: its rows exist before the gesture does. A menu whose rows had to arrive would be a menu opened before its subject existed, and the family's loading arm belongs to the slips that fetch - the palette, a dialog, a popover.",
	noError: "an action's failure belongs to the surface it acted on, not to the menu that closed on selection. The menu is gone before the request is sent, so an error body inside it would be a body nobody sees.",
	noPartial: "a menu is either composed or it is not. A row whose value has not arrived prints `◎ UNAVAILABLE` in its own meta cell - the honest per-row answer - rather than the whole slip declaring itself partial.",
	noCap: "a tooltip is a label the trigger already carries. There is nothing to arrive and nothing to fail: the announcement exists before the hover does.",
	noTipEmpty: "a tooltip with no label is not rendered at all - `IconTooltip` returns null, because an unlabelled icon is a decoration rather than a control. An empty arm here would be an arm for a state the component refuses to enter.",
	noTipWide: "a tooltip is a gloss on one control. At the band's width it would stop being a gloss; the detail arm caps at 22rem for exactly that reason.",
	noHoverLoad: "a hover card's content is the caller's children, rendered with the trigger. There is no register to arrive, so there is no loading arm - and inventing one would make a gloss wait.",
	noHoverError: "a hover card states what a thing is, not what an action did. It runs nothing, so it has nothing to fail at.",
	noHoverWide: "a hover card is a gloss. At the band's width it would be a popover that never admitted it, and the reader would lose the pointer path back to the trigger.",
	noHoverOrphan: "a hover card is dismissed by the pointer leaving the trigger. A trigger removed while the card is open has already been un-hovered, so the pointer's own exit is the rule - a second guard would close a card that is already closing.",
	noCmdError: "the palette's index is static and cannot fail. Its adverse state is `◎ NO RECORD` and the rail's handoff row, not an error body - and the `SlipError` arm belongs to the panels that run an action.",
	noCmdSubmenu: "a command list is flat by design: cmdk's model is one listbox with one selection, and the foot states `↑↓ MOVE` over that one list. A nested listbox inside it would break the arrow keys the foot promises.",
	noCmdEdge: "the palette is centred in the viewport at `12vh`. It has no anchor, so it has no edge to collide with."
};
/**
* The ten components, in the family's order: the four panels, the two cards,
* then the four list surfaces. Panels first because they are the largest object
* and the one a reader meets with a click rather than a hover.
*/
var Rows$3 = [
	{
		name: "DIALOG",
		part: "UI/Dialog.tsx",
		note: "the slip at modal scale: a head, a scrolling body, a foot",
		cells: {
			current: Reason.noRow,
			dense: Reason.noDensity,
			submenu: Reason.noSubmenu,
			edge: Reason.noEdge,
			card: Reason.noCard
		}
	},
	{
		name: "DRAWER",
		part: "UI/Drawer.tsx",
		note: "the slip that can be thrown away, on vaul's drag",
		cells: {
			current: Reason.noRow,
			dense: Reason.noDensity,
			submenu: Reason.noSubmenu,
			edge: "a drawer is anchored to an edge, so *near the edge* is its resting position rather than a collision it has to survive.",
			card: Reason.noCard
		}
	},
	{
		name: "SHEET",
		part: "UI/Sheet.tsx",
		note: "the slip that arrives from an edge, on four sides",
		cells: {
			current: Reason.noRow,
			dense: Reason.noDensity,
			submenu: Reason.noSubmenu,
			edge: "a sheet is anchored to an edge, so *near the edge* is its resting position rather than a collision it has to survive.",
			card: Reason.noCard
		}
	},
	{
		name: "POPOVER",
		part: "UI/Popover.tsx",
		note: "a slip that holds content instead of rows",
		cells: {
			current: Reason.noRow,
			dense: Reason.noDensity,
			submenu: Reason.noSubmenu,
			tall: "a popover caps at 24rem and scrolls inside that cap. It is anchored to a trigger that is on screen, so it can never be taller than the viewport - the cap is what makes the question unaskable.",
			wide: "a popover is a gloss on one control. At the band's width it would be a sheet, and the arrival from a 2px side offset would be a lie about where it came from."
		}
	},
	{
		name: "HOVERCARD",
		part: "UI/HoverCard.tsx",
		note: "a slip that arrives on a pause",
		cells: {
			disabled: "a hover card has no disabled state. Its trigger is a reference - a name, a glyph, a term - and a reference that cannot be hovered is text, not a control.",
			current: Reason.noRow,
			loading: Reason.noHoverLoad,
			empty: "a hover card's content is the caller's children. There is no register to be empty: a card with nothing in it is a caller bug, and the component does not invent an arm for it.",
			error: Reason.noHoverError,
			partial: Reason.noHoverLoad,
			dense: Reason.noDensity,
			submenu: Reason.noSubmenu,
			wide: Reason.noHoverWide,
			orphan: Reason.noHoverOrphan
		}
	},
	{
		name: "ICONTOOLTIP",
		part: "UI/IconTooltip.tsx",
		note: "a cap for a mark, a slip for a document",
		cells: {
			disabled: "a tooltip's trigger is not a control, so it cannot be disabled. Its glyph can be *unavailable*, and that is a different statement - the `◎` the cap prints before the label.",
			current: Reason.noRow,
			loading: Reason.noCap,
			empty: Reason.noTipEmpty,
			error: Reason.noCap,
			partial: Reason.noCap,
			dense: Reason.noDensity,
			submenu: Reason.noSubmenu,
			wide: Reason.noTipWide,
			orphan: Reason.noHoverOrphan
		}
	},
	{
		name: "CONTEXTMENU",
		part: "UI/ContextMenu.tsx",
		note: "the menu a right-click opens, and the same slip a left-click opens",
		cells: {
			loading: Reason.noLoad,
			error: Reason.noError,
			partial: Reason.noPartial,
			wide: "a context menu is sized by its longest row, at the pointer. At the band's width it would be a panel anchored to a click."
		}
	},
	{
		name: "DROPDOWNMENU",
		part: "UI/DropdownMenu.tsx",
		note: "the menu primitive, wearing the slip",
		cells: {
			loading: Reason.noLoad,
			error: Reason.noError,
			partial: Reason.noPartial,
			wide: "a dropdown is sized by its longest row, under its trigger. At the band's width it would be a panel rather than a menu."
		}
	},
	{
		name: "MENUBAR",
		part: "UI/Menubar.tsx",
		note: "the application's own bar, and the slips it opens",
		cells: {
			loading: Reason.noLoad,
			error: Reason.noError,
			partial: Reason.noPartial
		}
	},
	{
		name: "COMMAND",
		part: "UI/Command.tsx",
		note: "cmdk's engine in the slip's clothes - the palette's body",
		cells: {
			error: Reason.noCmdError,
			partial: Reason.noCmdError,
			submenu: Reason.noCmdSubmenu,
			edge: Reason.noCmdEdge,
			card: Reason.noCard
		}
	}
];
/**
* The cell for one row and one column.
*
* A row states only its absences; everything else is `BUILT`. That is the
* default because this matrix was written *after* the family was put on one
* surface - so the absences are the interesting cells and the built ones are
* the family.
*/
var MatrixCell$3 = (Row, ColumnValue) => {
	const ReasonText = Row.cells[ColumnValue.key];
	return ReasonText === void 0 ? { disposition: "built" } : {
		disposition: "na",
		reason: ReasonText
	};
};
/** How many of one row's cells are built. */
var BuiltOf$3 = (Row) => Columns$3.filter((ColumnValue) => MatrixCell$3(Row, ColumnValue).disposition === "built").length;
/** The matrix's own figures, derived from the two tables. */
var CellCount$3 = Rows$3.length * Columns$3.length;
/** How many cells are built. */
var BuiltCount$3 = Rows$3.reduce((Total, Row) => Total + BuiltOf$3(Row), 0);
/** How many cells are reasons. */
var ReasonCount$3 = CellCount$3 - BuiltCount$3;
/** The register the matrix prints under itself. */
var MatrixRegister$3 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$3.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$3.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$3)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$3)
	},
	{
		key: "REASONS:",
		value: String(ReasonCount$3)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/OVERLAY.TS",
		note: "every figure above is counted from the two tables in this file"
	}
];
/** The groups the live rows are printed in, in reading order. */
var Groups$3 = [
	{
		key: "panel",
		label: "/THE PANELS",
		note: "The four surfaces that take the reader's whole attention: a dialog, a drawer, a sheet, a popover. Each one is a slip with a head, a body and a foot - and each one is printed here in the four states it was never printed in: loading, empty, failed, and outgrown."
	},
	{
		key: "card",
		label: "/THE CARDS AND THE CAP",
		note: "The three small surfaces: a hover card, a tooltip's cap and a tooltip's detail arm. The rule they print is the family's size rule - a cap for a mark, a slip for a document - and the two arms are shown side by side so the difference is a size, not a mood."
	},
	{
		key: "menu",
		label: "/THE MENUS",
		note: "The four list surfaces: a context menu, a dropdown, a menubar and the command palette. They are one instrument: the same register line, the same `[mark] [label] [meta]` row, the same five states, the same foot. A submenu states its depth as a path, and a menu with no rows says so rather than opening blank."
	}
];
/**
* The live rows.
*
* Ordered so that the family is read the way it is met: the panels first (each
* in its ordinary state, then its adverse ones), then the small surfaces, then
* the lists - which end on the palette, because the palette is the same
* instrument as the menu above it and the sheet's argument is that a reader
* should be able to see it.
*
* The marks are the row's index in reading order, not in the order the array
* happens to be written, so a row added to the middle of a group is renumbered
* rather than appended as a gap.
*/
var Specimens$3 = [
	{
		mark: "01",
		state: "READY",
		component: "DIALOG",
		when: "Right when the reader must decide before the page continues - a record with a head, a body and one action.",
		kind: "dialog",
		door: "OPEN: A RECORD"
	},
	{
		mark: "02",
		state: "LOADING",
		component: "DIALOG",
		when: "Right when the panel is open and its rows have not arrived: the head counts LOADING and the skeleton holds the row pitch.",
		kind: "dialog-loading",
		door: "OPEN: STILL READING"
	},
	{
		mark: "03",
		state: "ERROR",
		component: "DIALOG",
		when: "Right when the action the panel opened for was cut off - STATUS, cause, next step and the retry, in that order.",
		kind: "dialog-error",
		door: "OPEN: A REFUSAL"
	},
	{
		mark: "04",
		state: "EMPTY",
		component: "DIALOG",
		when: "Right when the set the panel opened on holds nothing: what would be here, why it is not, and the way out.",
		kind: "dialog-empty",
		door: "OPEN: NOTHING FILED"
	},
	{
		mark: "05",
		state: "PARTIAL",
		component: "DIALOG",
		when: "Right when some of the record has been read and some cannot be: the unknown rows say UNAVAILABLE in their own cell, never a zero and never a blank.",
		kind: "dialog-partial",
		door: "OPEN: HALF THE ROWS"
	},
	{
		mark: "06",
		state: "TALLER THAN THE VIEWPORT",
		component: "DIALOG",
		when: "Right when the record is sixty rows: the head and the foot pin and the body is the only thing that scrolls.",
		kind: "dialog-tall",
		door: "OPEN: SIXTY ROWS"
	},
	{
		mark: "07",
		state: "NARROW COLUMN",
		component: "DIALOG",
		when: "Right for a confirmation - one sentence and one action, at 24rem, which is the width a decision needs.",
		kind: "dialog-narrow",
		door: "OPEN: 24REM"
	},
	{
		mark: "08",
		state: "WIDE BAND",
		component: "DIALOG",
		when: "Right when the panel holds a matrix or a table: `full` is bounded by the viewport, never by a rem.",
		kind: "dialog-full",
		door: "OPEN: THE SHEET"
	},
	{
		mark: "09",
		state: "AN EDGE",
		component: "SHEET",
		when: "Right when the reader must keep the page in view while reading the panel - the sheet arrives from the edge and leaves by it.",
		kind: "sheet",
		door: "OPEN: FROM THE RIGHT"
	},
	{
		mark: "10",
		state: "THROWN AWAY",
		component: "DRAWER",
		when: "Right on a narrow viewport, where the panel is dismissed by a gesture: the grip is drawn, Escape is the stated door.",
		kind: "drawer",
		door: "OPEN: FROM BELOW"
	},
	{
		mark: "11",
		state: "READY",
		component: "POPOVER",
		when: "Right when a control needs a figure or a sentence beside it without taking the page away.",
		kind: "popover",
		door: "OPEN: A GLOSS"
	},
	{
		mark: "12",
		state: "LOADING",
		component: "POPOVER",
		when: "Right when the figure is being read: the head counts LOADING and the last known value stays visible under it.",
		kind: "popover-loading",
		door: "OPEN: READING"
	},
	{
		mark: "13",
		state: "ERROR",
		component: "POPOVER",
		when: "Right when the control's own action failed - the popover is the only place the reader is looking.",
		kind: "popover-error",
		door: "OPEN: A FAILURE"
	},
	{
		mark: "14",
		state: "NEAR THE RIGHT EDGE",
		component: "POPOVER",
		when: "Right for a control at the page's right edge: collision padding and `sticky` keep the slip inside the paper.",
		kind: "popover-edge",
		door: "OPEN: AT THE EDGE"
	},
	{
		mark: "15",
		state: "INSIDE A CARD",
		component: "POPOVER",
		when: "Right when the control lives on a white insert: the slip arrives over the card it belongs to and the card keeps its own frame.",
		kind: "popover-card",
		door: "OPEN: FROM THE INSERT"
	},
	{
		mark: "16",
		state: "READY",
		component: "HOVERCARD",
		when: "Right when a name in prose needs a definition and the reader has not asked for one yet.",
		kind: "hover",
		door: "HOVER: A TERM"
	},
	{
		mark: "17",
		state: "LONG TEXT",
		component: "HOVERCARD",
		when: "Right when the gloss is two paragraphs: the card caps at 24rem and 22rem tall, and scrolls rather than growing past the fold.",
		kind: "hover-long",
		door: "HOVER: A LONG GLOSS"
	},
	{
		mark: "18",
		state: "A CAP",
		component: "ICONTOOLTIP",
		when: "Right for a glyph that needs two words: the ink cap, no register, no frame - the smallest thing in the family.",
		kind: "tip",
		door: "HOVER: THE GLYPH"
	},
	{
		mark: "19",
		state: "A STACK OF CAPS",
		component: "ICONTOOLTIP",
		when: "Right when the label is two or three lines: the staccato caps keep the tilt, and each line is its own mark.",
		kind: "tip-lines",
		door: "HOVER: THREE LINES"
	},
	{
		mark: "20",
		state: "A SLIP",
		component: "ICONTOOLTIP",
		when: "Right when the glyph needs a record rather than a gloss: `Detail` switches the tooltip to the slip, head and all.",
		kind: "tip-detail",
		door: "HOVER: THE DETAIL"
	},
	{
		mark: "21",
		state: "UNAVAILABLE",
		component: "ICONTOOLTIP",
		when: "Right when the glyph exists and cannot be used: `◎` before the label, in the same mark the item grammar uses.",
		kind: "tip-unavailable",
		door: "HOVER: THE GAP"
	},
	{
		mark: "22",
		state: "READY",
		component: "CONTEXTMENU",
		when: "Right when the actions belong to the region the reader is pointing at, and the region has no room for a button.",
		kind: "context",
		door: "RIGHT-CLICK THIS ROW"
	},
	{
		mark: "23",
		state: "EMPTY",
		component: "CONTEXTMENU",
		when: "Right when the region has no actions: the menu says so in the grammar rather than opening as an empty frame.",
		kind: "context-empty",
		door: "RIGHT-CLICK: NO ACTIONS"
	},
	{
		mark: "24",
		state: "READY",
		component: "DROPDOWNMENU",
		when: "Right when a control opens a set of choices: the current row is marked, the unavailable one says why.",
		kind: "menu",
		door: "OPEN: A MENU"
	},
	{
		mark: "25",
		state: "SUBMENU ×3",
		component: "DROPDOWNMENU",
		when: "Right when the set has a hierarchy: each level prints its path, so depth three reads as a route rather than as a stack.",
		kind: "menu-sub",
		door: "OPEN: THREE DEEP"
	},
	{
		mark: "26",
		state: "EMPTY",
		component: "DROPDOWNMENU",
		when: "Right when the set is empty: the head counts 00 and the empty arm says what would be here.",
		kind: "menu-empty",
		door: "OPEN: NO ROWS"
	},
	{
		mark: "27",
		state: "MANY ITEMS",
		component: "DROPDOWNMENU",
		when: "Right when the set is two hundred: the slip caps at 24rem and scrolls, and the head stays stuck to the top.",
		kind: "menu-many",
		door: "OPEN: FORTY ROWS"
	},
	{
		mark: "28",
		state: "DENSE",
		component: "DROPDOWNMENU",
		when: "Right for a set the reader scans rather than picks: forty rows at a 1.5rem stride, the type and the mark column unmoved.",
		kind: "menu-dense",
		door: "OPEN: FORTY ROWS, TIGHT"
	},
	{
		mark: "29",
		state: "TRIGGER REMOVED",
		component: "DROPDOWNMENU",
		when: "Right when the door unmounts under an open menu: the guard closes the slip rather than leaving it floating over nothing.",
		kind: "menu-orphan",
		door: "OPEN: THEN REMOVE THE DOOR"
	},
	{
		mark: "30",
		state: "READY",
		component: "MENUBAR",
		when: "Right when the surface is an application rather than a page: the bar is a ruled shelf, and each menu is the same slip.",
		kind: "menubar"
	},
	{
		mark: "31",
		state: "SUBMENU",
		component: "MENUBAR",
		when: "Right when the bar's menu has a hierarchy: the submenu prints `# FILE ↳ NEW / 03` and travels from its own side.",
		kind: "menubar-sub"
	},
	{
		mark: "32",
		state: "READY",
		component: "COMMAND",
		when: "Right when the reader knows the name of what they want: a route index, one list, one selection.",
		kind: "command",
		door: "OPEN: THE INDEX"
	},
	{
		mark: "33",
		state: "LOADING",
		component: "COMMAND",
		when: "Right when the register is being read: `# FIND / LOADING`, and the skeleton holds the pitch the results will land on.",
		kind: "command-loading",
		door: "OPEN: READING THE INDEX"
	},
	{
		mark: "34",
		state: "EMPTY",
		component: "COMMAND",
		when: "Right when the query matches nothing: `◎ NO RECORD`, the words to try, and the scope that hid the answer.",
		kind: "command-empty",
		door: "OPEN: NO MATCH"
	}
];
/** The rows of one group, in order. */
var InGroup$3 = (Key) => Specimens$3.filter((Row) => GroupOf$2(Row.kind) === Key);
/** Which group a row belongs to, from its kind. */
var GroupOf$2 = (Kind) => {
	switch (Kind) {
		case "dialog":
		case "dialog-loading":
		case "dialog-error":
		case "dialog-empty":
		case "dialog-partial":
		case "dialog-tall":
		case "dialog-narrow":
		case "dialog-full":
		case "sheet":
		case "drawer":
		case "popover":
		case "popover-loading":
		case "popover-error":
		case "popover-edge":
		case "popover-card": return "panel";
		case "hover":
		case "hover-long":
		case "tip":
		case "tip-lines":
		case "tip-detail":
		case "tip-unavailable": return "card";
		default: return "menu";
	}
};
// Source/Content/Specimen/Reading.ts
/**
* The twenty-four columns, in reading order.
*
* Nine conditions first, because they are the states a reader meets; then six
* shapes, because they are what a piece of furniture is asked to hold; then
* seven compositions, because six of them are the ones this family's brief
* named by hand and the seventh - a page with no rail - is the one the family
* must survive without; then two contexts, because they are the ones a designer
* forgets - the action the block carries and the medium it is printed on.
*/
var Columns$2 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a read failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight arm",
		group: "condition"
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY",
		ask: "ninety or twenty-six",
		group: "shape"
	},
	{
		key: "long",
		label: "LONG",
		ask: "a line past its column",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "shape"
	},
	{
		key: "onesection",
		label: "ONE SECTION",
		ask: "a document with one",
		group: "composition"
	},
	{
		key: "ninety",
		label: "NINETY",
		ask: "a document with ninety",
		group: "composition"
	},
	{
		key: "longheading",
		label: "LONG HEADING",
		ask: "wider than the rail",
		group: "composition"
	},
	{
		key: "nosummary",
		label: "NO SUMMARY",
		ask: "an article with none",
		group: "composition"
	},
	{
		key: "noxref",
		label: "NO X-REF",
		ask: "a foot with no see-also",
		group: "composition"
	},
	{
		key: "at640",
		label: "AT 640",
		ask: "a detail strip at 640px",
		group: "composition"
	},
	{
		key: "norail",
		label: "NO RAIL",
		ask: "a page with no rail",
		group: "composition"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "one thing to click",
		group: "context"
	},
	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$2 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$2 = (reason) => ({
	disposition: "na",
	reason
});
/** The reason a printed block is never a control. */
var NotAControl$1 = (what) => NotApplicable$2(`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`);
/** The reason a printed block is read-only by construction. */
var ReadOnly$1 = (what) => NotApplicable$2(`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`);
/** The reason a leaf is one thing and cannot be a set. */
var NotASet$1 = (what, set) => NotApplicable$2(`A ${what} is one object by definition; a set is ${set}, and a block that answered both would be two blocks with one name.`);
/** The reason a build-time block has no loading state. */
var BuildTime$1 = (what, why) => NotApplicable$2(`A ${what} is read at build time: ${why} so there is no state in which the block exists and its content has not arrived.`);
/** The reason a printed register carries no as-of of its own. */
var NoAsOf$1 = (what, whose) => NotApplicable$2(`A ${what} carries no as-of of its own: an age belongs to ${whose}, and a block that invented one would be the one figure on the page with no source.`);
/** The reason a summary is not this block's fact. */
var NotASummary = (whose) => NotApplicable$2(`A summary is ${whose}: this block never prints one, so its absence changes nothing here - which is the cell's answer, not an evasion.`);
/** The reason a cross-reference is not this block's fact. */
var NotAXref = (whose) => NotApplicable$2(`A cross-reference is ${whose}: the register that prints one is \`See\`, and a second block with a see-also would be a second voice saying the same sentence.`);
/**
* The fourteen components, in the order a page meets them: the shell that holds
* the reading column, the contents that say where you are in it, the index that
* files the manual, the appendices that close it, the viewer at the tree's edge,
* the reading surface the legal set wears, and the four pieces of apparatus that
* close a band.
*
* Every row's overrides are reasons. A row with no overrides would be a part that
* survives every combination, and no part does.
*/
var Rows$2 = [
	{
		name: "DOCLAYOUT",
		file: "COMPONENT/DOC/DOCLAYOUT.ASTRO",
		note: "The documentation column: the rail's two registers beside the paper, the apparatus at the page's right edge, and the same tree as a panel below 1024.",
		cells: {
			disabled: NotAControl$1("documentation shell"),
			readonly: ReadOnly$1("shell"),
			loading: BuildTime$1("documentation shell", "the rail, the paper and the margin are server-rendered and the one island inside it (the mobile tree) hydrates over rows the server already printed"),
			stale: NoAsOf$1("shell", "the page's apparatus - a folio, a ledger row"),
			empty: Built$2("`sections` empty prints `◎` and the sentence where the tree would be, in both the rail and the panel; the head prints no contents at all"),
			partial: Built$2("a page with contents and no apparatus: the margin track is added by `:has()` and never reserved, so the paper centres in the desk it has"),
			error: Built$2("the failure belongs to the paper inside it (`DocArticle.state`), and the rail is unaffected - which is the point of the shell owning no content"),
			dense: Built$2("`contentsDense` halves the contents register's air; the shell's five tracks are unchanged"),
			one: Built$2("a rail of one section: the head and the tree each hold one row"),
			many: Built$2("an 81-row tree scrolls in its own register with `overscroll-behavior: contain`; the page never grows"),
			long: Built$2("the rail is sized in `ch` (26ch), so a label wraps under its own marker instead of widening the track"),
			narrow: Built$2("below 1024 the rail is not painted; the tree is the panel above the paper"),
			wide: Built$2("at 84rem of desk the apparatus leaves the bar and becomes a third column at the page's right edge"),
			incard: NotApplicable$2("A documentation shell is a page's container, not a record's surface: inside a card it would print a page's rail inside a record. The composition the frame family prints as `IN A CARD` is `PageShell`'s, and this shell is not one."),
			onesection: Built$2("the head prints one row, the disclosure prints one row, and the tree takes the rest of the rail"),
			ninety: Built$2("the contents register folds itself (`contentsFold: auto` above 24 rows) and goes dense, so the tree keeps the rail's scroll"),
			longheading: Built$2("a heading longer than the rail wraps under its marker in both registers; the rail's width is a `ch` floor, not a guess"),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("both registers become ruled sections above the paper, in reading order, and nothing is folded away"),
			norail: NotApplicable$2("This block IS the rail: a rail's own rail count is not a composition it has. The page that has no rail is the Rust surface, and it wears `DocArticle` without this shell."),
			withaction: Built$2("the foot's `/Doc/Rust` link is the rail's one action, and the rows are the reader's"),
			print: Built$2("the rail prints; the sticky behaviour and the two scroll registers are the browser's")
		}
	},
	{
		name: "DOCARTICLE",
		file: "COMPONENT/DOC/DOCARTICLE.ASTRO",
		note: "The reading shell every documentation surface shares: breadcrumb, kicker, the page's one h1, standfirst, the metadata strip, the plate, the contents and the paper.",
		cells: {
			disabled: NotAControl$1("article shell"),
			readonly: ReadOnly$1("shell"),
			empty: Built$2("`state=\"empty\"` prints the paper's absence under the same head, strip and measure: `◎`, the page's sentence and `STATUS: UNAVAILABLE`"),
			loading: Built$2("`state=\"loading\"` prints the keys with their values barred, under the same head - the schema arrives before the prose"),
			partial: Built$2("a strip field the build cannot fill prints `UNAVAILABLE` with the `quiet` tone; the field stays, the value says so"),
			error: Built$2("a failed read is the empty arm with the page's own sentence; the strip's `STATUS:` is where the vocabulary is printed"),
			stale: Built$2("`UPDATED:` is a strip field: an old date is the field's value, not a second design"),
			dense: NotApplicable$2("A reading shell has no tight step: the measure and the prose rhythm are the article's, and a denser article is a shorter article - which is an edit, not a state."),
			one: NotASet$1("article shell", "one page's paper"),
			many: NotASet$1("article shell", "one page's paper"),
			long: Built$2("the title balances at the L tier and the standfirst is capped at `--Measure`; the strip wraps between fields, never inside one"),
			narrow: Built$2("one column below the rail's breakpoint; the contents become the disclosure between the strip and the paper"),
			wide: Built$2("`measure={false}` drops the body cap for the index's card grid and the Rust viewer, and nothing else"),
			incard: NotApplicable$2("An article shell is a page's column: inside a card it would print a page inside a record. The paper it prints is already the white insert the card would be."),
			onesection: Built$2("`BuildDocToc` returns null and the shell renders no contents at all - never an empty nav"),
			ninety: Built$2("the contents list scrolls in the rail's head; the disclosure stays one row"),
			longheading: Built$2("the `h1` balances; a heading longer than the rail wraps in the contents row instead of widening it"),
			nosummary: Built$2("with no standfirst the header prints the kicker, the title and then the strip, which becomes the opening fact - the one case where the page's first sentence is a `KEY:` row"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("one column, the disclosure above the paper, the strip wrapping between fields"),
			norail: Built$2("the Rust page's composition: the shell without `DocLayout`, owning its own container"),
			withaction: NotApplicable$2("The shell prints no action: the pager at the foot is the page's, and the shell's slot is prose. A control inside the header would be a control inside a nameplate."),
			print: Built$2("the header, the strip and the prose print; the wells keep their frames because their frame is a border, not a shadow")
		}
	},
	{
		name: "DOCCONTENTS",
		file: "COMPONENT/DOC/DOCCONTENTS.ASTRO",
		note: "The page's own contents, in two registers: the pinned head of the rail, and the CSS-only disclosure in the flow below the rail's breakpoint.",
		cells: {
			disabled: NotAControl$1("contents register"),
			readonly: ReadOnly$1("register"),
			empty: Built$2("no toc, or an empty one, renders nothing at all - an empty nav is worse than none"),
			loading: BuildTime$1("contents register", "the rows are the headings `render()` reported, so the list and the document are written in the same pass"),
			partial: Built$2("a heading the pipeline gave no id cannot enter the list: `BuildDocToc` files only headings it has slugs for, so a row cannot point at nothing"),
			error: NotApplicable$2("A contents list cannot fail on its own: its rows are the document's headings, and a page whose headings failed has no list to print - the paper's absence is `DocArticle`'s arm."),
			stale: NoAsOf$1("contents register", "the page's folio or its strip"),
			dense: Built$2("`dense` halves the row's air: 90 rows at the reading step are 4,000px of rail, at the dense step 2,600px. The marker column and the reserved 2px rule are untouched"),
			one: Built$2("a one-section document prints one row and the register counts `01`"),
			many: Built$2("ninety rows: the register counts `90`, goes dense, folds, and the marked row is scrolled into the register when it crosses out of it"),
			long: Built$2("the name wraps under its marker; the marker column is `3ch` so the names hang on one edge whatever the numbers are"),
			narrow: Built$2("below 1024 the disclosure register is the only one painted, collapsed by default"),
			wide: Built$2("the rail register is a 26ch column; the disclosure caps at `--Measure` because it sits on the paper's edge"),
			incard: NotApplicable$2("A contents register is a rail's head or a page's disclosure: inside a card it would be a second navigation inside a record, and the card is already the way in."),
			onesection: Built$2("one row in the rail, one row in the disclosure"),
			ninety: Built$2("the register folds itself above 24 rows and goes dense; `Contents.ts` keeps the marked row inside the register's box"),
			longheading: Built$2("the row wraps to two lines and the marker stays on the first, because the marker column is its own grid track"),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("the disclosure, collapsed, one row at the paper's measure"),
			norail: Built$2("the disclosure IS the no-rail register: it is what an article prints when there is no rail to pin a list to"),
			withaction: Built$2("every row is a jump link to an id the pipeline wrote"),
			print: Built$2("the disclosure prints open; the rail's register prints as the list it is")
		}
	},
	{
		name: "DOCCONTENTSLIST",
		file: "COMPONENT/DOC/DOCCONTENTSLIST.ASTRO",
		note: "The rows of the page's own contents: a two-digit marker, the heading's own words, and the id the markdown pipeline wrote.",
		cells: {
			disabled: NotAControl$1("contents list"),
			readonly: ReadOnly$1("list"),
			empty: Built$2("`items` empty prints an empty `<ol>`; the block above refuses to mount it with none, so the arm exists and is never reached by a page"),
			loading: BuildTime$1("contents list", "the rows are the document's headings and the ids are the pipeline's, written in the same pass"),
			partial: NotApplicable$2("A row is a heading: the pipeline that writes the id writes the text, so a row with a name and no target cannot be built - and a row with a target and no name would be an anchor a screen reader announces as empty."),
			error: NotApplicable$2("A list of anchors has no failure arm: a target that moved is a broken anchor the page prints, not a state the list can invent."),
			stale: NoAsOf$1("contents list", "the page's folio or its strip"),
			dense: Built$2("the tight step is the parent's class (`.doc-contents--dense .doc-contents__link`); the list's own anatomy does not change, which is why the two registers cannot drift"),
			one: Built$2("one row"),
			many: Built$2("ninety rows: the marker column holds two digits and grows to three without moving the names"),
			long: Built$2("the name wraps under its marker, never under the marker's own column"),
			narrow: Built$2("the row is a two-track grid at any width"),
			wide: Built$2("the row keeps the marker's 3ch column whatever the band's width"),
			incard: NotApplicable$2("A list of in-page anchors is a register of a document: inside a card it would be navigation inside a record."),
			onesection: Built$2("one row"),
			ninety: Built$2("ninety rows, numbered `01`..`90`, with the third digit reserved by `ch`"),
			longheading: Built$2("the row wraps to two lines"),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("the same two-track row inside the disclosure"),
			norail: Built$2("the disclosure's list"),
			withaction: Built$2("every row is an anchor"),
			print: Built$2("the list prints as an ordered list")
		}
	},
	{
		name: "DOCLAYER",
		file: "COMPONENT/DOC/DOCLAYER.ASTRO",
		note: "The layer a page belongs to, as a closed disclosure at the foot of the article: `LAYER:`, the section's name, its size and the way in.",
		cells: {
			disabled: NotAControl$1("layer map"),
			readonly: ReadOnly$1("map"),
			empty: Built$2("`entries` empty renders nothing at all: a layer with no pages is not a layer, and a disclosure over nothing is the one thing this block may not print"),
			loading: BuildTime$1("layer map", "the entries are the section's pages in collection order, passed by the page"),
			partial: Built$2("a layer whose entries the page could not read prints the count it has; the missing page is the page's own tombstone, not a row this block invents"),
			error: NotApplicable$2("A map has no failure arm: the pages either exist in the collection or they do not, and a disclosure that could not read them is the empty arm."),
			stale: NoAsOf$1("layer map", "the page's folio"),
			dense: NotApplicable$2("A disclosure row has no tight step: closed it is one line at chapter distance, and a denser row would be a row in the prose above it."),
			one: Built$2("a layer of one prints the row without the disclosure: `LAYER:`, the section and `1 PAGE`, and no glyph, because there is nothing to open"),
			many: Built$2("fifteen rows open into two columns at 1024 and up; the closed row is still one line"),
			long: Built$2("the name wraps inside its row; the count stays at the row's end"),
			narrow: Built$2("one column, and the summary wraps between its fields"),
			wide: Built$2("the opened list is two columns"),
			incard: NotApplicable$2("A layer map closes an article: inside a card it would be a map inside a record, and the article above it is the surface."),
			onesection: Built$2("the solo arm: one page, stated, with nothing to open"),
			ninety: Built$2("the opened list holds ninety rows; closed it is still one line, which is the composition decision this block exists for"),
			longheading: Built$2("the row's name wraps; the summary's fields wrap between themselves"),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("one column, closed by default"),
			norail: Built$2("the layer is the article's foot, printed with or without a rail"),
			withaction: Built$2("the summary is the action; every opened row is a link"),
			print: Built$2("the disclosure prints open, so a printed article ends on its map")
		}
	},
	{
		name: "DOCINDEX",
		file: "COMPONENT/DOC/DOCINDEX.ASTRO",
		note: "One chapter of the documentation index: a bare band with its kicker and count, then the chapter's card grid.",
		cells: {
			disabled: NotAControl$1("chapter"),
			readonly: ReadOnly$1("chapter"),
			empty: NotApplicable$2("An index section with no rows is dropped by `BuildDocIndex` before it reaches this block: an empty chapter is not a chapter, and a band with a count of zero would be a chapter that apologises for itself."),
			loading: BuildTime$1("chapter", "the rows are the collection's pages, read at build time and ordered by `SectionOrder`"),
			partial: Built$2("a card whose page has no `description` prints `◎ DESCRIPTION: UNAVAILABLE` in the card's body slot, so the grid's rows stay the same height and the missing fact is stated"),
			error: NotApplicable$2("A chapter has no failure arm: the pages it files are the collection's, and a collection that could not be read is a build that does not run."),
			stale: NoAsOf$1("chapter", "each card's page - its strip, its folio"),
			dense: NotApplicable$2("The chapter is a band and a grid: its density is the grid's capacity line (`--row-floor`), not a tight step, and a denser grid is a narrower card."),
			one: Built$2("a chapter of one card is a grid of one, at the same card floor"),
			many: Built$2("a chapter of sixteen wraps by the capacity line; the kicker's count is the chapter's own `Rows.length`"),
			long: Built$2("the card's title balances and its note wraps at 62ch; the kicker wraps between its fields"),
			narrow: Built$2("one card per row below the grid's floor"),
			wide: Built$2("three across at the desk's width; the card floor is the title's measure plus the inset"),
			incard: NotApplicable$2("A chapter is a band wrapping a grid: inside a card it would be a page's chapter inside a record, and a card inside a card is the one composition the identity forbids."),
			onesection: Built$2("the index's smallest chapter: one card under one `h2`"),
			ninety: Built$2("ten chapters holding eighty-one cards; each chapter counts itself in its kicker and the closing archive counts the sections"),
			longheading: Built$2("the chapter's `h2` balances and the kicker wraps; the count stays with its label"),
			nosummary: Built$2("the card is where a missing description is stated, so a chapter of pages without summaries prints a grid of honest cards rather than a grid of holes"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("one card per row, the chapter's kicker above it"),
			norail: Built$2("the index renders without the rail on the baseline composition: `mobile={false}`, because the card grid IS the navigation"),
			withaction: Built$2("the whole card is the anchor, so the grid is the way in"),
			print: Built$2("the grid prints; the card's hover ink is the browser's")
		}
	},
	{
		name: "DOCCARD",
		file: "COMPONENT/DOC/DOCCARD.ASTRO",
		note: "One card of the index: a title, the page's description under it, and the whole card as the way in.",
		cells: {
			disabled: NotAControl$1("card"),
			readonly: ReadOnly$1("card"),
			empty: Built$2("no `Note` prints `◎ DESCRIPTION: UNAVAILABLE` in the note's own slot, at the note's own size - the card keeps the set's row height"),
			loading: BuildTime$1("card", "the card renders one page's record, and the record is the collection's"),
			partial: Built$2("the same arm as `empty`: the title is a fact, the description is not, and the card states which is which"),
			error: NotApplicable$2("A card has no failure arm: it renders one page's label, note and href, and a page whose record failed is a page that is not in the collection."),
			stale: NoAsOf$1("card", "the page it leads to - its strip, its folio"),
			dense: NotApplicable$2("A card's density is the grid's: the capacity line decides how many fit, and a card with less air inside is a card whose note is closer to its title for no reason."),
			one: NotASet$1("card", "a chapter's grid, which is `DocIndex`'s"),
			many: Built$2("a set of sixteen is sixteen of these, at the grid's floor"),
			long: Built$2("the title balances; the note wraps at 62ch"),
			narrow: Built$2("the card is one column and its inset is the group's"),
			wide: Built$2("the feature card (`level={2}`) takes the group inset and the L title"),
			incard: NotApplicable$2("A card IS a record's surface: a card inside a card is the one composition the identity forbids, and the card's `jelly-card` is already the surface it sits on."),
			onesection: Built$2("a chapter of one is one card"),
			ninety: Built$2("the index's eighty-one cards are eighty-one of these"),
			longheading: Built$2("the title balances and wraps inside the card's inset"),
			nosummary: Built$2("a page with no description is the card's own missing-fact arm: `◎ DESCRIPTION: UNAVAILABLE`, in the note's slot, in the meta voice"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("one card per row, the note under the title"),
			norail: Built$2("a card is inside the paper, not beside the rail"),
			withaction: Built$2("the card's anchor fills the surface, so the whole card is the target"),
			print: Built$2("the card prints; the hover ink is the browser's")
		}
	},
	{
		name: "DOCAPPENDIX",
		file: "COMPONENT/DOC/DOCAPPENDIX.ASTRO",
		note: "One of the three artifacts that close the index: a heading, a lede, and a panel of destinations that print as badges, a list or a tile grid.",
		cells: {
			disabled: NotAControl$1("appendix panel"),
			readonly: ReadOnly$1("panel"),
			empty: Built$2("`state=\"empty\"` prints the panel's absence under the same heading and lede: `◎` and the sentence, in the panel's own grammar"),
			loading: Built$2("`state=\"loading\"` prints the keys with their values barred, under the same heading"),
			partial: Built$2("the architecture strip with no `Index` prints `◎ STATUS: UNAVAILABLE` instead of an empty badge run - a strip that read the panel and not its elements says so"),
			error: NotApplicable$2("A failed read is the empty arm: the panel states what would be here, and there is no retry a printed page can offer - the retry is a rebuild."),
			stale: NoAsOf$1("appendix panel", "the page's folio or the record it reads"),
			dense: NotApplicable$2("The panel is one artifact at the band's rhythm; a denser panel is a table, and the site has one of those where it means a comparison."),
			one: Built$2("the backend panel with one worker: one row, its link and its sentence"),
			many: Built$2("fifteen badges wrap; twelve tiles take two columns; four workers take one row each"),
			long: Built$2("the lede caps at 62ch; a tile's note wraps under its label"),
			narrow: Built$2("the tiles stack and the workers print one per line"),
			wide: Built$2("the tiles are two columns at the desk's width"),
			incard: NotApplicable$2("The panel IS the surface: a card inside the panel would be a card inside a card, and the appendix's `h2` above it already opens the subject."),
			onesection: Built$2("an appendix of one destination"),
			ninety: Built$2("a strip of ninety badges wraps; the tile grid takes as many rows as it needs"),
			longheading: Built$2("the `h2` balances and wraps; the panel's lede keeps its measure"),
			nosummary: NotASummary("`DocArticle`'s - the appendix's own sentence is its `Lede`, which is required"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("one column: the lede, then the panel's rows"),
			norail: Built$2("the appendices close the index, which renders without a rail panel"),
			withaction: Built$2("every badge, worker and tile is a link"),
			print: Built$2("the panel prints; the badges keep their hairlines")
		}
	},
	{
		name: "RUSTVIEWER",
		file: "COMPONENT/DOC/RUSTVIEWER.ASTRO",
		note: "The crate switcher and the rustdoc frame: one tab per crate, one frame, and the state the frame is in.",
		cells: {
			disabled: NotApplicable$2("The viewer's tabs are never disabled: a crate that cannot be shown is not a tab, and a disabled tab is a control saying \"not for you\" about a document the reader came to read."),
			readonly: NotApplicable$2("The viewer is read-only in the sense that matters - it shows a rustdoc site and edits nothing - so `read-only` names no arm it could have. The frame's sandbox is the same fact stated in markup."),
			empty: Built$2("no crate prints the frame's own absence inside the frame: `◎`, the sentence and the line that says why - not an empty bar over an iframe with no `src`"),
			loading: Built$2("`STATUS: LOADING` prints above the frame until the frame has loaded and the script removes it; with JavaScript off it stays, because the viewer cannot know and says so"),
			partial: Built$2("a crate with no `Url` leaves the frame on the previous crate: the tab does not become active, so the bar never claims a document the frame is not showing"),
			error: NotApplicable$2("A rustdoc site that fails to load fails INSIDE the frame: the viewer cannot read it (sandboxed, cross-origin), and the browser's own error page is the only honest report. Inventing an error arm would be inventing a fact."),
			stale: NotApplicable$2("The rustdoc output tracks the Current branch; its age is the crate's, and the page states the branch in its own copy above the viewer - a second as-of in the tab bar would be a second source."),
			dense: NotApplicable$2("A tab bar and a frame have no tight step: the bar is one row of labels and the frame is as tall as the viewport it is read in."),
			one: Built$2("one crate: one tab, and the frame opens on it"),
			many: Built$2("nine crates: the bar scrolls horizontally and the keyboard walks it"),
			long: Built$2("a crate name wraps inside its tab; the bar's scroll is the backstop"),
			narrow: Built$2("the bar scrolls; the frame keeps the column's width and rustdoc's own 701px breakpoint takes over inside it"),
			wide: Built$2("the frame is the column's width, bled to the page's spine"),
			incard: NotApplicable$2("The viewer is a surface with a frame in it: inside a card it would be a frame inside a frame, and the frame's own border would be the second."),
			onesection: NotApplicable$2("A crate group with one crate is the `ONE` cell; a section is not a thing the viewer holds - the register of crates is `DocIndex`'s."),
			ninety: Built$2("ninety crates: the bar scrolls and the arrow keys walk it one tab at a time"),
			longheading: NotApplicable$2("The viewer prints crate names, not headings: a heading is the page's, above it."),
			nosummary: NotASummary("`DocArticle`'s, above the viewer"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("the bar scrolls, the frame keeps its height and its own breakpoint"),
			norail: Built$2("the Rust surface has no rail: the viewer is the page's column"),
			withaction: Built$2("the tabs are the action, and the arrow keys, Home and End are the path through them"),
			print: NotApplicable$2("An `<iframe>` does not print: the viewer's frame is a live surface, and a printed page would show the tab bar over a blank rectangle. The crates are listed as links above it, which is what prints.")
		}
	},
	{
		name: "READINGDOCUMENT",
		file: "COMPONENT/READING/READINGDOCUMENT.ASTRO",
		note: "The reading surface: the facts that date and scope a document, an index into it, and one measure to read it on.",
		cells: {
			disabled: NotAControl$1("reading surface"),
			readonly: ReadOnly$1("surface"),
			empty: Built$2("`state=\"empty\"` prints the document's absence inside the same paper: the facts and the index above it are still true, and the card says why the clauses are not there"),
			loading: Built$2("`state=\"loading\"` prints the keys with their values barred, under the same head"),
			partial: Built$2("a ledger row the record cannot fill prints `UNAVAILABLE` as its value; the row stays, the value says so"),
			error: Built$2("a failed read is the empty arm with the page's sentence and `STATUS: UNAVAILABLE` - the vocabulary's word, not a new one"),
			stale: Built$2("`EFFECTIVE:` and `UPDATED:` are ledger rows: an old date is the row's value, and the surface prints it without inventing an age"),
			dense: NotApplicable$2("A document read at prose rhythm has no tight step: the measure is the surface's and the clauses are the document's. A denser document is an edit."),
			one: Built$2("a document with one clause prints an index of one row"),
			many: Built$2("twenty-six clauses: the index is two columns and the rail layout scrolls its own register"),
			long: Built$2("the heading balances, the standfirst caps at `--Measure`, and the index's names wrap under their `§NN` markers"),
			narrow: Built$2("the rail layout prints the index as a disclosure above the text, and the ledger folds to one column"),
			wide: Built$2("`measure=\"full\"` leaves the body uncapped for a document that also carries grids and cards"),
			incard: NotApplicable$2("The reading surface is the page's paper: inside a card it would be a document inside a record. The legal pages' white card is the body's own class, not a wrapper around the surface."),
			onesection: Built$2("one clause: the index is one row and the rail is not painted"),
			ninety: Built$2("ninety clauses: the rail scrolls, the disclosure is one row, and the index's two columns take as many rows as they need"),
			longheading: Built$2("the `h1` balances; a clause heading wraps in the index's name column"),
			nosummary: Built$2("with no standfirst the head prints the kicker, the title and the ledger, so the facts become the opening - the legal set's own composition"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("the rail becomes the disclosure, the ledger one column, and the index one column of `§NN` rows"),
			norail: Built$2("`layout=\"stack\"` is the composition with no rail at all: the index prints between the facts and the document"),
			withaction: Built$2("the index is the action; the print control is the page's, outside the surface"),
			print: Built$2("the clauses print; the rail's stickiness and the disclosure are the browser's")
		}
	},
	{
		name: "BANDFOOT",
		file: "COMPONENT/DETAIL/BANDFOOT.ASTRO",
		note: "The band's colophon: one rule, the cross-references at its left end and the folio at its right.",
		cells: {
			disabled: NotAControl$1("band foot"),
			readonly: ReadOnly$1("foot"),
			empty: Built$2("a foot with no facts prints its place alone: the ordinal and the part are required, and the facts row is absent rather than empty"),
			loading: Built$2("`seeState=\"loading\"` prints the register and its keys with the values barred - a foot whose references have not been read says so instead of printing a folio alone"),
			partial: Built$2("a foot with a count and no as-of prints the count: each fact is its own span, and a fact the caller did not pass is not printed at all"),
			error: NotApplicable$2("A foot is two printed registers; there is no action for an error to belong to, and the failure's composition is `ShellState`'s."),
			stale: Built$2("`AS OF:` is the foot's own fact: an old date is the value, and the age is printed where a page states one"),
			dense: NotApplicable$2("The foot is the smallest composition on the site - one rule, two registers. A denser one is a folio, which is a different block."),
			one: Built$2("one reference beside the folio"),
			many: Built$2("five references wrap; the folio keeps the row's right end"),
			long: Built$2("a long source wraps at its `/`s and a long part now wraps at its own; the strip's container query stacks the two registers at 640px"),
			narrow: Built$2("the row stacks: references above the folio, on the strip's own container query"),
			wide: Built$2("references at the left end, folio at the right, on one baseline"),
			incard: Built$2("`surface=\"card\"` keeps the rule inside the card's inset instead of bleeding it to the edge, because the card's frame is already the boundary"),
			onesection: NotApplicable$2("A foot closes one band: a document's section count is the page's figure, printed by a folio or a register, not by a foot's rows."),
			ninety: NotApplicable$2("A band's foot prints a handful of references and a folio; ninety is a document's count and it is a figure, not rows. The block that lists ninety is `Leader` or `DocContents`."),
			longheading: NotApplicable$2("A foot prints a part, a count, an as-of and references - not a heading. The band's heading is the band's."),
			nosummary: NotASummary("`DocArticle`'s, and the band's own standfirst"),
			noxref: Built$2("no `see` and the foot is a folio alone - the composition the brief named, and the one every band on the site that has nothing to cross-reference wears"),
			at640: Built$2("the strip's container query turns the row into a stack at 22rem of strip"),
			norail: Built$2("a foot closes a band, not a page: the rail is not its context"),
			withaction: Built$2("the references are links; the folio is printed"),
			print: Built$2("the rule and both registers print")
		}
	},
	{
		name: "FOLIO",
		file: "COMPONENT/DETAIL/FOLIO.ASTRO",
		note: "Where in the document the reader has got to: the contained ordinal, the part, and the count, the as-of and the source that go with it.",
		cells: {
			disabled: NotAControl$1("folio"),
			readonly: ReadOnly$1("folio"),
			empty: NotApplicable$2("A folio's place is required - an ordinal and a part. A folio with neither is not a folio; it is a line of nothing at the foot of a band, which is the defect the block exists to remove."),
			loading: NotApplicable$2("A folio prints what the page read. It has no state of its own, and a barred ordinal would be a place the reader cannot be told."),
			partial: Built$2("the as-of and the source print only when the caller has them: a folio never invents a date, and a fact it does not have is absent rather than `UNAVAILABLE` - because a folio states where you are, and that is never unknown"),
			error: NotApplicable$2("A folio is a printed line: there is no action for an error to belong to."),
			stale: Built$2("`AS OF:` is the folio's own fact. The date is the value; the age is the page's to state, because the folio cannot know what the reader considers old"),
			dense: NotApplicable$2("The folio is one line at the meta tier; there is nothing under it to tighten."),
			one: NotASet$1("folio", "one band's foot"),
			many: NotASet$1("folio", "one band's foot"),
			long: Built$2("the source breaks at its `/`s and the part breaks at its own - `overflow-wrap: anywhere` is the backstop for one segment longer than the band. Before this, a part was `nowrap` and a deep route ran past the band's edge"),
			narrow: Built$2("the two ends wrap between facts, never inside one: a count, a figure and an as-of are unbreakable groups"),
			wide: Built$2("the two ends sit on one baseline, justified to the band's edges"),
			incard: Built$2("inside a white card the same line prints at the card's inset; the foot's `surface=\"card\"` keeps the rule inside it"),
			onesection: NotApplicable$2("A folio prints a document's part and its figures; a section is a row in `DocContents`."),
			ninety: NotApplicable$2("A folio counts; it does not list. Ninety is a figure it prints (`90 SECTIONS`), not ninety rows - the block that lists ninety is `DocContents` or `Leader`."),
			longheading: NotApplicable$2("A folio prints a part, not a heading."),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: Built$2("a folio is what a foot with no cross-references is: the right end of a rule with nothing at its left"),
			at640: Built$2("the ends stack and the facts wrap between themselves; the ordinal and the part never part company"),
			norail: Built$2("a folio is printed by bands, the footer and the page edge - none of which is a rail"),
			withaction: NotApplicable$2("A folio is printed, not clicked: the ordinal and the part are text. A folio that linked would be a pager."),
			print: Built$2("a folio is the one thing on the site designed for the printed sheet")
		}
	},
	{
		name: "SEE",
		file: "COMPONENT/DETAIL/SEE.ASTRO",
		note: "The cross-reference: `↳ SEE`, then a route and the reason it is worth following.",
		cells: {
			disabled: NotAControl$1("cross-reference register"),
			readonly: ReadOnly$1("register"),
			empty: Built$2("no references renders nothing at all - not an empty frame, not a \"no related pages\" sentence. A see-also with nothing to see is noise"),
			loading: Built$2("`state=\"loading\"` prints the register and its keys with the values barred: a foot whose references were asked for and not read is a different fact from a foot with none"),
			partial: Built$2("a reference with no reason is dropped rather than printed as a bare link - a reference without a reason is a related-links widget"),
			error: NotApplicable$2("A reference list has no failure arm: a route that is gone is a tombstone the page prints, and a register that invented an error state would be inventing a fact about a link."),
			stale: NoAsOf$1("cross-reference register", "the page's folio"),
			dense: NotApplicable$2("Two rows at the foot of a band; a tight step would be a list with no air in the smallest composition on the site."),
			one: Built$2("one reference: the register and one row"),
			many: Built$2("five references wrap, each keeping its route column's floor"),
			long: Built$2("the route's column is a floor at 19ch and the reason caps at 52ch; a longer route grows and its own reason follows it"),
			narrow: Built$2("the row stacks at the strip's own container query, not at a viewport breakpoint"),
			wide: Built$2("route and reason share a baseline, the route's column holding every reason on one edge"),
			incard: Built$2("the strip is printed inside a white card on the legal pages, at the card's inset"),
			onesection: NotApplicable$2("A see-also is not a document's section: the sections are `DocContents`'."),
			ninety: NotApplicable$2("A see-also is a handful of references. Ninety is an index, and the site has `Leader` and `DocContents` for that."),
			longheading: NotApplicable$2("A register prints routes, not headings."),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: Built$2("that is the block rendering nothing: its resting arm on a band with nothing to cross-reference"),
			at640: Built$2("the row stacks; the route keeps its own line and the reason follows it"),
			norail: Built$2("the register is printed at a band's foot, with or without a rail"),
			withaction: Built$2("every route is an anchor"),
			print: Built$2("the register prints; the hover ink is the browser's")
		}
	},
	{
		name: "LEADER",
		file: "COMPONENT/DETAIL/LEADER.ASTRO",
		note: "The printed index entry: name, leader, figure, hanging note - and the register line that counts the set.",
		cells: {
			disabled: NotAControl$1("leader register"),
			readonly: ReadOnly$1("register"),
			empty: Built$2("`state=\"empty\"` prints the caller's composed sentence instead of the frame: what would be here, why it is not, what to do"),
			loading: Built$2("`state=\"loading\"` prints the entries' two cells with their values barred: the names are the schema and arrive before the figures"),
			partial: Built$2("a row whose figure is unknown prints `UNAVAILABLE` - the vocabulary's word, never a zero and never a blank cell"),
			error: NotApplicable$2("A register has no failure arm: a set that could not be read is the empty state with its sentence, which is the same composition with a truer cause."),
			stale: NotApplicable$2("A leader prints figures, not dates: an entry's date is its `meta`, and the register's age is the page's - the block derives none of it."),
			dense: NotApplicable$2("The leader's rhythm IS the leader: the dots run from the name to its figure and they are the row's rule. A tight step would close them."),
			one: Built$2("one entry: the register line prints `01` and the row keeps its dots"),
			many: Built$2("thirty-eight entries with `limit`: the first n print and a foot line states the real size and the route to all of it"),
			long: Built$2("the name wraps inside its own cell and the figure stays on the last line of the entry rather than being pushed off it"),
			narrow: Built$2("one column below 1024, with the dots floored at 1.5rem so they never close to nothing"),
			wide: Built$2("two columns at 1024 and up, filling left to right so the array's order is the register's"),
			incard: NotApplicable$2("A leader is a register on the paper: inside a card its dots would be the card's rule, and the card is a record's surface."),
			onesection: Built$2("a set of one: the register line counts it and the row prints"),
			ninety: Built$2("`limit` prints the first n and `SHOWING: 6 OF 38` states the rest, with the route to all of it"),
			longheading: Built$2("the name wraps under itself, on the name's own edge"),
			nosummary: NotASummary("`DocArticle`'s"),
			noxref: NotAXref("`BandFoot`'s"),
			at640: Built$2("one column; the dots keep their floor"),
			norail: Built$2("a register is printed on the paper, with or without a rail"),
			withaction: Built$2("an entry with an `href` is a link and one without is text, in the same row"),
			print: Built$2("the leader is a printed artifact: the dots are a border, not a background")
		}
	}
];
/** The cell at a row and a column: the row's override, or the built default. */
var MatrixCell$2 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$2 = () => Rows$2.flatMap((row) => Columns$2.map((column) => ({
	row,
	column,
	cell: MatrixCell$2(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$2 = Rows$2.length * Columns$2.length;
/** How many cells the family builds. */
var BuiltCount$2 = MatrixCells$2().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$2 = CellCount$2 - BuiltCount$2;
/** How many cells one row builds. */
var BuiltOf$2 = (Row) => Columns$2.filter((Column) => MatrixCell$2(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$2 = (Column) => Rows$2.filter((Row) => MatrixCell$2(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$2 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$2.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$2.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$2)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$2)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$2)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$2.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/READING.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that revealed
* it. An improvement with no cell behind it would be a preference.
*/
var Improvements$2 = [
	{
		component: "DOCCONTENTS",
		from: "NINETY / DENSE",
		found: "A document with ninety sections spent the rail's whole head on its contents. `Doc/_Layout.scss` caps that head at 50% of the rail, so the register was a scroll box the reader had to scroll to find the section they were already in - and the tree, which is the rail's other half, was left a slit. The block could be dense or not; it could not be folded, and a page could not choose either.",
		built: "`DocContents.collapsible` prints the rail register as a `<details open>` - one row carrying the label, the count and the way back in - and `DocLayout.contentsFold: \"auto\"` folds it above 24 rows, so the ninety-section document folds itself and the twelve-section one does not. Open by default: the fold exists so a reader can give the rail's scroll to the tree, not so a page can withhold its own contents. `dense` is the second half of the same answer - the same rows in less air."
	},
	{
		component: "DOCCONTENTS",
		from: "NINETY / the marking itself",
		found: "The register marked the section the reader was in and the mark could be forty rows below the register's edge: present in the DOM, invisible on the screen. A marking that is not on screen is the one failure a marking can have, and it was the failure the ninety-section case produced.",
		built: "`Doc/Contents.ts` gains `Reveal` - when the marked row is outside the scroll register it sits in, the register is scrolled to it, once, instantly. The register is found by walking up to the first ancestor that actually scrolls, so the rail's head and the clause rail are served by the same code and neither names the other's class. Instant, not smooth: the mark is a position, and the reader caused the change."
	},
	{
		component: "FOLIO",
		from: "LONG",
		found: "The source already broke at its `/`s, with `<wbr>` and `overflow-wrap: anywhere` behind them - and the PART did not: it was `white-space: nowrap`. A folio on a deep page prints `/DOC/DEEP-DIVE-FILESYSTEM-FOOTPRINT`, which at 13px tracked is wider than the card it closes, and a folio that runs past the band's right edge is the one thing a folio may never do: it is the mark that says the band has ended.",
		built: "`Folio` splits the part at its own `/` separators and puts a `<wbr>` after each - the same break points the source carries, for the same reason - and `Detail/_Folio.scss` sets the part to `white-space: normal` with `overflow-wrap: anywhere` as the backstop for one segment longer than the band. A short part takes no break; the ordinal and the part still never part company, because the place group stays `nowrap` between them."
	},
	{
		component: "DOCCARD",
		from: "NO SUMMARY / PARTIAL",
		found: "A page with no `description` printed a card with a title and nothing under it, in a grid where every other card had two lines. The card did not say the description was missing; it closed up, and a card two lines shorter than its neighbours reads as a card that failed to load - the exact adverse state the brief says must be designed rather than left to chance.",
		built: "`DocCard.absent` prints `◎ DESCRIPTION: UNAVAILABLE` in the note's own slot, at the note's own size, in the meta voice - so the grid's rows keep their height and the missing fact is stated in the vocabulary's word rather than as a blank. `DocIndex` passes the same sentence into the card body's `RecordEntry`, so the index grid and the feature cards answer the same way."
	},
	{
		component: "DOCCONTENTS",
		from: "REST / the grammar",
		found: "The register named itself and not its extent: `ON THIS PAGE` over twelve rows, `ON THIS PAGE` over ninety, with no figure anywhere - while every other counted line on the site prints `# LABEL / NN`. The one register a reader consults for orientation was the one register with no count.",
		built: "`DocContents` derives the count from `Items.length` (never from a prop, so it cannot outlive the rows) and prints it one U+2001 after the label in both registers - the rail's head and the disclosure's summary. The separator is drawn by the stylesheet and belongs to the figure, so a wrapped label never opens a line with an em quad."
	},
	{
		component: "DOCLAYER",
		from: "ONE SECTION / ONE",
		found: "A layer with one page printed nothing at all - `entries.length > 1` was the only arm - so the one fact this block exists to give, how big the thing the reader just finished is, was the one fact a one-page layer could not give. The reader finished a section and was told nothing about it.",
		built: "`DocLayer` renders at `entries.length >= 1`: above one it is the disclosure it always was, at exactly one it is the same row with the same label, value and count and no glyph - because there is nothing to open. `unitOne` lets the count read `01 PAGE` without the block pluralising a word it was handed."
	},
	{
		component: "RUSTVIEWER",
		from: "EMPTY / WITH ACTION",
		found: "With no crates the viewer printed an empty tab bar and an `<iframe>` with no `src`: a frame around nothing, which is the composition a reader reads as broken rather than as absent. And the bar was a `role=\"tablist\"` whose only keyboard path was Tab - the ARIA pattern it claimed was not implemented, so the arrows did nothing and a keyboard reader could not walk the crates.",
		built: "`RustViewer.empty` prints the absence inside the frame's own box - `◎`, the sentence and the line that says why - and the frame is not rendered at all. The tab bar gains the pattern it promised: roving `tabindex`, ArrowLeft/Right/Up/Down, Home and End, focus following the selection. `STATUS: LOADING` prints above the frame until it loads and the script removes it."
	},
	{
		component: "DOCARTICLE",
		from: "EMPTY / LOADING / ERROR",
		found: "An article whose prose did not render printed its breadcrumb, its kicker, its `h1`, its strip and then a white card with nothing in it. Every other block in the family had its two adverse arms; the shell that holds all of them had none, so the one page that is nothing but paper was the one page that could be blank paper.",
		built: "`DocArticle.state` (`rest` | `empty` | `loading`) with `empty` and `keys`: `empty` prints `◎`, the page's sentence and `STATUS: UNAVAILABLE` inside the paper; `loading` prints the keys with their values barred. `ReadingDocument` gains the same two arms, so the legal set cannot print a blank clause card either."
	},
	{
		component: "DOCAPPENDIX",
		from: "EMPTY / PARTIAL / LOADING",
		found: "The three closing artifacts printed their `h2`, their lede and then whatever the build had: an appendix whose rows were not read was a heading and a sentence over a hole, and the architecture panel with no `Index` printed an empty `<ul>` under a lede about the fifteen elements.",
		built: "`DocAppendix.state` with `empty`/`loading` arms under the same heading and lede, and a partial arm for the strip: an architecture panel with no `Index` prints `◎ STATUS: UNAVAILABLE` rather than an empty badge run. The panel's sentence is never dropped, because the subject is still stated when its destinations are not."
	},
	{
		component: "DOCLAYOUT",
		from: "EMPTY",
		found: "A rail with no sections printed its title and then nothing - a label over a hole, in both the rail and the narrow-viewport panel. The one navigation a documentation page has said `Documentation` and stopped.",
		built: "`DocLayout` prints `◎` and `sidebar.empty`'s sentence where the tree would be, in the rail and in the panel, at the panel's own inset. The head, the tree's slot and the foot keep their places, so the rail still reads as a rail."
	},
	{
		component: "SEE",
		from: "LOADING / NO X-REF",
		found: "The block refused the empty frame - correctly - and therefore had no way to say the other thing: that the references were asked for and not read. A foot in that state printed its folio alone, and a reader could not tell a band with no cross-references from a build that never read them.",
		built: "`See.state=\"loading\"` prints the register and its keys with the values barred; `BandFoot.seeState` forwards it, so the foot keeps its two ends and its rule. The resting arm is unchanged: no references still renders nothing at all."
	}
];
var Observations$2 = [
	{
		component: "DOCCONTENTS",
		found: "The fold threshold is 24 rows, and 24 is a measurement rather than a law: it is what a half-rail head holds at the reading step on the reference viewport. On a taller window the head holds more, and on a shorter one fewer, so a document with 22 sections folds on one screen and not on another.",
		owner: "A later card on the reading family, if the owner's reading finds the threshold wrong. The honest fix is a container query on the rail's head height, which CSS cannot ask; the next best is the threshold the owner picks after reading two documents at two window sizes."
	},
	{
		component: "DOCINDEX",
		found: "The index's cards are built twice: `DocCard` for the three ways in, and the same anatomy written inline in `DocIndex` for the chapter grids, because a chapter card carries a `RecordEntry` with an index marker and a glyph that `DocCard` has no slot for. The two answer the missing-description question with two mechanisms - a note slot and a body string - and only the string is the block's own grammar.",
		owner: "A later card on the documentation index. The fix is one card with a `RecordEntry` and an optional `level`, which would let `DocCard` and `DocIndex` share the anatomy; it changes the feature cards' markup, so it wants the owner's reading of the three ways in before it moves."
	},
	{
		component: "LEADER",
		found: "`Leader`'s `columns={2}` is a viewport step at 1024px, not a capacity line, so a leader printed inside a wide band on a narrow window prints one column although two would fit - and the same register inside a narrow pane at 1440px prints two although one would fit.",
		owner: "The next card on the detail layer, with a composition that prints a leader in a pane. The mechanism exists (`Layout/_Shell.scss`'s `.PageShell__row` capacity line); the work is proving it against the dots' 1.5rem floor."
	},
	{
		component: "FOLIO",
		found: "The folio prints `AS OF:` and never an age, deliberately - a folio cannot know what a reader considers old. But three surfaces print a date with no age at all (the footer's colophon, the page edge, and the legal set's `EFFECTIVE:` row), and the brief's stale state asks for the age beside the value.",
		owner: "The surfaces that own those dates. `ShellState`'s stale arm prints `AGE:`; the folio's row is the right place for it, and the prop would be `age` beside `asOf`."
	}
];
/**
* The rows, in reading order: the documents, the contents, the index, the
* detail apparatus, the reading surface and the adverse states.
*
* Every row is a state the site either uses or could use, and the `when` line is
* the one thing a picture of a component cannot carry: the sentence that says
* which composition is right. A row printed here that the site never needs is
* still a row: a component that survives its own worst combination is a
* component whose design frame is real.
*/
var Specimens$2 = [
	{
		mark: "READ_01",
		state_name: "THE ARTICLE",
		component: "DOCARTICLE",
		when: "The resting documentation page: breadcrumb, kicker, the page's one h1, the standfirst, the strip, and the paper at one measure.",
		kind: "article"
	},
	{
		mark: "READ_02",
		state_name: "NO SUMMARY",
		component: "DOCARTICLE",
		when: "A page with no `description`: the header prints the kicker, the title and then the strip, so the metadata becomes the opening fact instead of a gap where a sentence was.",
		kind: "article",
		variant: "nosummary"
	},
	{
		mark: "READ_03",
		state_name: "LONG HEADING",
		component: "DOCARTICLE",
		when: "A title wider than the rail: the `h1` balances at the L tier and the standfirst still ends on the prose's right edge.",
		kind: "article",
		variant: "longheading"
	},
	{
		mark: "READ_04",
		state_name: "NO RAIL",
		component: "DOCARTICLE",
		when: "The Rust page's composition: the article shell owns its own container, the contents are the disclosure, and there is no rail to pin anything to.",
		kind: "article",
		variant: "norail"
	},
	{
		mark: "READ_05",
		state_name: "ONE SECTION",
		component: "DOCLAYOUT",
		when: "A document with one section: the rail's head prints one row, the tree keeps the scroll, and nothing renders a contents list of one item twice.",
		kind: "layout",
		variant: "onesection",
		width: "wide"
	},
	{
		mark: "READ_06",
		state_name: "NINETY",
		component: "DOCLAYOUT",
		when: "A document with ninety sections: the contents register folds itself and goes dense, so the tree keeps the rail's scroll instead of a slit.",
		kind: "layout",
		variant: "ninety",
		width: "wide"
	},
	{
		mark: "READ_07",
		state_name: "NO TREE",
		component: "DOCLAYOUT",
		when: "A rail whose sections were not read: the head and the foot keep their places and the tree's slot states the absence instead of printing a label over a hole.",
		kind: "layout",
		variant: "notree",
		width: "wide"
	},
	{
		mark: "READ_08",
		state_name: "RAIL",
		component: "DOCCONTENTS",
		when: "The pinned register at the top of the sticky rail: the page's own sections, with the count the register line now carries.",
		kind: "contents",
		width: "narrow"
	},
	{
		mark: "READ_09",
		state_name: "FOLDED",
		component: "DOCCONTENTS",
		when: "The same register folded: one row with the label, the count and the way back in, open by default so the fold is the reader's choice.",
		kind: "contents",
		variant: "fold",
		width: "narrow"
	},
	{
		mark: "READ_10",
		state_name: "DENSE",
		component: "DOCCONTENTS",
		when: "Ninety rows at the tight step: the same marker column, the same reserved 2px rule, a third less air - the register a long document folds AND tightens.",
		kind: "contents",
		variant: "many",
		dense: true,
		width: "narrow"
	},
	{
		mark: "READ_11",
		state_name: "ONE SECTION",
		component: "DOCCONTENTS",
		when: "A one-section document: one row, and the register counts `01` rather than saying nothing about its extent.",
		kind: "contents",
		variant: "one",
		width: "narrow"
	},
	{
		mark: "READ_12",
		state_name: "LONG HEADING",
		component: "DOCCONTENTS",
		when: "A heading wider than the rail: the name wraps under its own marker, because the marker is a grid track and not an inline prefix.",
		kind: "contents",
		variant: "long",
		width: "narrow"
	},
	{
		mark: "READ_13",
		state_name: "DISCLOSURE",
		component: "DOCCONTENTS",
		when: "Below the rail's breakpoint: the same list as a CSS-only `<details>`, collapsed, one row at the paper's measure.",
		kind: "contents",
		variant: "disclosure"
	},
	{
		mark: "READ_14",
		state_name: "THE ROWS",
		component: "DOCCONTENTSLIST",
		when: "The list on its own: a two-digit marker, the heading's own words, and the id the pipeline wrote - nothing re-slugified, nothing re-cased.",
		kind: "contentslist",
		width: "narrow"
	},
	{
		mark: "READ_15",
		state_name: "NINETY",
		component: "DOCCONTENTSLIST",
		when: "Ninety rows: the marker column holds `01`..`90` without moving a name, because its width is a `ch` track and not a character count.",
		kind: "contentslist",
		variant: "many",
		width: "narrow"
	},
	{
		mark: "READ_16",
		state_name: "LAYER",
		component: "DOCLAYER",
		when: "The section the reader just finished: one closed row stating the layer, its size and the way in - fifteen rows only if they open it.",
		kind: "layer"
	},
	{
		mark: "READ_17",
		state_name: "ONE PAGE",
		component: "DOCLAYER",
		when: "A layer of one: the same row with the same label, value and count and no glyph, because there is nothing to open - and the size is still stated.",
		kind: "layer",
		variant: "one"
	},
	{
		mark: "READ_18",
		state_name: "LONG",
		component: "DOCLAYER",
		when: "A page name wider than the row: the name wraps and the count stays at the row's end, so the register line is still readable at a glance.",
		kind: "layer",
		variant: "long",
		width: "narrow"
	},
	{
		mark: "READ_19",
		state_name: "CHAPTER",
		component: "DOCINDEX",
		when: "One chapter of the index: a bare band with its `/NAME NN PAGES` kicker and the chapter's card grid, three across when the desk allows.",
		kind: "index"
	},
	{
		mark: "READ_20",
		state_name: "MISSING DESCRIPTION",
		component: "DOCINDEX",
		when: "A chapter holding a page with no `description`: the card states `◎ DESCRIPTION: UNAVAILABLE` in the body slot, so the grid keeps its row height and the missing fact is named.",
		kind: "index",
		variant: "absent"
	},
	{
		mark: "READ_21",
		state_name: "MANY",
		component: "DOCINDEX",
		when: "A chapter of sixteen: the grid wraps by the capacity line, so the count in the kicker and the cards on the page are the same number.",
		kind: "index",
		variant: "many",
		width: "wide"
	},
	{
		mark: "READ_22",
		state_name: "CARD",
		component: "DOCCARD",
		when: "The one card on its own: a title, the page's description, and the whole card as the way in - an anchor, not a click handler.",
		kind: "card",
		width: "narrow"
	},
	{
		mark: "READ_23",
		state_name: "NO DESCRIPTION",
		component: "DOCCARD",
		when: "A card whose page has no description: the note's slot prints `◎ DESCRIPTION: UNAVAILABLE` at the note's size, so the set's rows stay the same height.",
		kind: "card",
		variant: "absent",
		width: "narrow"
	},
	{
		mark: "READ_24",
		state_name: "FEATURE",
		component: "DOCCARD",
		when: "One of the three ways in: the card's title is its `h2`, so it takes the L tier and the group inset - a level above the chapter cards, not a bigger card.",
		kind: "card",
		variant: "feature"
	},
	{
		mark: "READ_25",
		state_name: "APPENDIX",
		component: "DOCAPPENDIX",
		when: "The architecture panel: the fifteen elements as a badge strip, then the one link out - every badge an anchor, so the element a reader taps is the element that opens.",
		kind: "appendix",
		variant: "architecture"
	},
	{
		mark: "READ_26",
		state_name: "PARTIAL STRIP",
		component: "DOCAPPENDIX",
		when: "The same panel with no `Index`: the lede stays and the strip prints `◎ STATUS: UNAVAILABLE` instead of an empty badge run.",
		kind: "appendix",
		variant: "stripabsent"
	},
	{
		mark: "READ_27",
		state_name: "WORKERS",
		component: "DOCAPPENDIX",
		when: "The backend panel: four workers, each a link and its own sentence after the baseline's `-`, because the dash is part of the row.",
		kind: "appendix",
		variant: "backend"
	},
	{
		mark: "READ_28",
		state_name: "TILES",
		component: "DOCAPPENDIX",
		when: "The deployments panel: twelve destinations as a two-column tile grid, each a name, its arrow and one line of context.",
		kind: "appendix",
		variant: "deployments"
	},
	{
		mark: "READ_29",
		state_name: "NOT READ",
		component: "DOCAPPENDIX",
		when: "A panel whose destinations were not read: the heading and the lede stand, and the body states the absence instead of leaving a hole at the foot of the index.",
		kind: "appendix",
		variant: "empty"
	},
	{
		mark: "READ_30",
		state_name: "CRATES",
		component: "RUSTVIEWER",
		when: "The crate switcher: one tab per crate, the frame opening on the first, and `STATUS: LOADING` above the frame until rustdoc arrives.",
		kind: "rust",
		width: "wide"
	},
	{
		mark: "READ_31",
		state_name: "ONE CRATE",
		component: "RUSTVIEWER",
		when: "A group with one crate: one tab, and the keyboard path still holds - arrows wrap to the same tab, Home and End go to it.",
		kind: "rust",
		variant: "one"
	},
	{
		mark: "READ_32",
		state_name: "NO CRATE",
		component: "RUSTVIEWER",
		when: "A group with no crates: the viewer keeps its frame and states the absence inside it, rather than printing a bar over an iframe with no `src`.",
		kind: "rust",
		variant: "empty"
	},
	{
		mark: "READ_33",
		state_name: "THE FOOT",
		component: "BANDFOOT",
		when: "A band's colophon at its resting shape: one rule, the cross-references at the left end, the folio at the right.",
		kind: "foot"
	},
	{
		mark: "READ_34",
		state_name: "NO X-REF",
		component: "BANDFOOT",
		when: "A band with nothing to cross-reference: the foot is a folio alone. No empty frame, no \"no related pages\" sentence.",
		kind: "foot",
		variant: "noxref"
	},
	{
		mark: "READ_35",
		state_name: "NOT READ",
		component: "BANDFOOT",
		when: "A foot whose references were asked for and not read: the register prints and its values are barred, so the two states are distinguishable.",
		kind: "foot",
		variant: "loading"
	},
	{
		mark: "READ_36",
		state_name: "IN A CARD",
		component: "BANDFOOT",
		when: "The foot inside a white insert: the rule stays inside the card's own inset, because the card's frame is already the boundary.",
		kind: "foot",
		variant: "card",
		width: "card"
	},
	{
		mark: "READ_37",
		state_name: "LONG SOURCE",
		component: "FOLIO",
		when: "A source path wider than the band: the path breaks at its own `/`s, so the folio ends where the band ends instead of running past it.",
		kind: "folio",
		variant: "source"
	},
	{
		mark: "READ_38",
		state_name: "LONG PART",
		component: "FOLIO",
		when: "A part wider than the band - a deep page's `/DOC/DEEP-DIVE-FILESYSTEM-FOOTPRINT`: the part now breaks at its own separators, and the ordinal never leaves it.",
		kind: "folio",
		variant: "part",
		width: "narrow"
	},
	{
		mark: "READ_39",
		state_name: "TWO FACTS",
		component: "FOLIO",
		when: "A folio with a count and an as-of and no source: each fact is its own span, and a fact the caller did not pass is absent rather than `UNAVAILABLE`.",
		kind: "folio",
		variant: "partial"
	},
	{
		mark: "READ_40",
		state_name: "AT 640",
		component: "BANDFOOT",
		when: "The detail strip at 640px: the strip's own container query stacks the references above the folio, and nothing is truncated to fit.",
		kind: "foot",
		variant: "narrow",
		width: "narrow"
	},
	{
		mark: "READ_41",
		state_name: "REFERENCES",
		component: "SEE",
		when: "The register at rest: `↳ SEE`, a route, and the reason it is worth following - a reference without a reason is dropped, not printed bare.",
		kind: "see"
	},
	{
		mark: "READ_42",
		state_name: "NOT READ",
		component: "SEE",
		when: "The references were asked for and not read: the register prints with its keys and barred values, which is a different fact from having none.",
		kind: "see",
		variant: "loading"
	},
	{
		mark: "READ_43",
		state_name: "NO REASON",
		component: "SEE",
		when: "Every row passed without a reason: the block renders nothing at all. That is the arm, and it is the reason the block refuses bare links.",
		kind: "see",
		variant: "bare"
	},
	{
		mark: "READ_44",
		state_name: "THE LEADER",
		component: "LEADER",
		when: "The printed index entry: name, leader, figure, and the register line that counts the set - no rules, because the dots are the rule.",
		kind: "leader"
	},
	{
		mark: "READ_45",
		state_name: "ONE",
		component: "LEADER",
		when: "A set of one: the register prints `01` and the row keeps its dots, so the shape holds at the smallest set.",
		kind: "leader",
		variant: "one"
	},
	{
		mark: "READ_46",
		state_name: "TOO MUCH",
		component: "LEADER",
		when: "Thirty-eight entries where the register prints six: `SHOWING: 6 OF 38` and the route to all of it, so the figure is never a lie about the set.",
		kind: "leader",
		variant: "many",
		width: "wide"
	},
	{
		mark: "READ_47",
		state_name: "UNAVAILABLE",
		component: "LEADER",
		when: "A row whose figure is unknown: `UNAVAILABLE` in the figure column - the vocabulary's word, never a zero and never a blank cell.",
		kind: "leader",
		variant: "unavailable"
	},
	{
		mark: "READ_48",
		state_name: "THE READING",
		component: "READINGDOCUMENT",
		when: "A legal document read with its contents beside it: the facts date and scope it, the clause rail is sticky, and the text is on one measure.",
		kind: "reading",
		variant: "rail",
		width: "wide"
	},
	{
		mark: "READ_49",
		state_name: "STACKED",
		component: "READINGDOCUMENT",
		when: "The same document with no rail: the index prints between the facts and the text, which is the composition for a page that is read straight through.",
		kind: "reading",
		variant: "stack"
	},
	{
		mark: "READ_50",
		state_name: "NO SUMMARY",
		component: "READINGDOCUMENT",
		when: "A document with no standfirst: the head prints the kicker, the title and the ledger, so the facts become the opening and the measure still holds.",
		kind: "reading",
		variant: "nosummary"
	},
	{
		mark: "READ_51",
		state_name: "EMPTY PAPER",
		component: "DOCARTICLE",
		when: "An article whose prose is not in the build: the paper keeps its shape and states the absence, in the record grammar, instead of printing white.",
		kind: "article",
		variant: "empty"
	},
	{
		mark: "READ_52",
		state_name: "LOADING PAPER",
		component: "DOCARTICLE",
		when: "A paper whose prose has not arrived: the keys print with their values barred, because the schema is what a reader can already be told.",
		kind: "article",
		variant: "loading"
	},
	{
		mark: "READ_53",
		state_name: "EMPTY DOCUMENT",
		component: "READINGDOCUMENT",
		when: "A legal document whose clauses are not set: the facts and the index above it are still true, and the card says why the text is not there.",
		kind: "reading",
		variant: "empty"
	},
	{
		mark: "READ_54",
		state_name: "LOADING DOCUMENT",
		component: "READINGDOCUMENT",
		when: "A document being read: the clause keys print with barred values, under the same head - never a spinner on a page that is a document.",
		kind: "reading",
		variant: "loading"
	},
	{
		mark: "READ_55",
		state_name: "EMPTY REGISTER",
		component: "LEADER",
		when: "A register with nothing in it: the caller's composed sentence says what would be here, why it is not, and what to do - the frame is not printed at all.",
		kind: "leader",
		variant: "empty"
	},
	{
		mark: "READ_56",
		state_name: "LOADING REGISTER",
		component: "LEADER",
		when: "A register whose figures have not arrived: the entries' two cells print with their values barred, so the names arrive first, as they do in the data.",
		kind: "leader",
		variant: "loading"
	},
	{
		mark: "READ_57",
		state_name: "AT 640",
		component: "LEADER",
		when: "The leader in a narrow column: one column, the dots floored at 1.5rem, and a name that still will not fit wraps inside its own cell.",
		kind: "leader",
		width: "narrow"
	}
];
/** Which group a row belongs to, from its mark's range. */
var GroupOf$1 = (Row) => {
	const At = Specimens$2.indexOf(Row);
	if (At < 7) return "documents";
	if (At < 18) return "contents";
	if (At < 32) return "index";
	if (At < 47) return "detail";
	if (At < 50) return "reading";
	return "adverse";
};
/** The rows in one group, in reading order. */
var InGroup$2 = (Group) => Specimens$2.filter((Row) => GroupOf$1(Row) === Group);
/** The groups, in the plate's order, with the line that says what each one asks. */
var Groups$2 = [
	{
		key: "documents",
		label: "/THE DOCUMENTS",
		note: "The shell that holds a reading column, in the four shapes the brief named: a resting article, an article with no summary, a title wider than the rail, and the same shell with no rail at all - plus the rail with one section, with ninety, and with no tree."
	},
	{
		key: "contents",
		label: "/THE CONTENTS",
		note: "The page's own contents in every register it has: the pinned rail, the fold, the dense step, one section, a heading wider than the rail, the disclosure, and the rows on their own at ninety."
	},
	{
		key: "index",
		label: "/THE INDEX",
		note: "The manual's filing: a chapter and its count, a chapter holding a page with no description, a chapter of sixteen, the card alone in its three arms, the three appendices and the crate viewer - including the one the brief asked for by name, an index card with a missing description."
	},
	{
		key: "detail",
		label: "/THE DETAIL",
		note: "The apparatus that closes a band: the foot at rest, with no cross-references, with its references unread, inside a card and at 640px; the folio under a long source and a long part; the see-also in its three arms; and the leader at one entry, at thirty-eight and in a narrow column."
	},
	{
		key: "reading",
		label: "/THE READING",
		note: "The surface the legal set wears: read with its clause rail, read straight through with no rail, and read with no standfirst, where the facts become the opening."
	},
	{
		key: "adverse",
		label: "/THE ADVERSE",
		note: "The seven compositions a reader meets when the world is unkind: an empty paper and a loading one, an empty document and a loading one, an empty register and a loading one, and the leader at 640px where the dots are the only rule it has."
	}
];
Specimens$2.length;
// Source/Content/Specimen/Record.ts
/**
* The twenty-four columns, in reading order.
*
* Nine conditions first, because they are the states a reader meets; then nine
* shapes, because they are what a ledger is asked to hold - and this family's
* brief named four of them by hand (one row, twenty rows, a long key, a value of
* three lines) plus the two new row shapes; then six contexts, because they are
* the ones a designer forgets.
*/
var Columns$1 = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "the action failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "selected",
		label: "SELECTED",
		ask: "the marked one",
		group: "condition"
	},
	{
		key: "oneitem",
		label: "ONE ITEM",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "manyitems",
		label: "MANY ITEMS",
		ask: "a set of twenty",
		group: "shape"
	},
	{
		key: "longkey",
		label: "LONG KEY",
		ask: "a key longer than its value",
		group: "shape"
	},
	{
		key: "longvalue",
		label: "LONG VALUE",
		ask: "a value of three lines",
		group: "shape"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "a tighter rhythm",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a 16rem column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "the full band",
		group: "shape"
	},
	{
		key: "totalrow",
		label: "TOTAL ROW",
		ask: "the set's sum",
		group: "shape"
	},
	{
		key: "openrow",
		label: "ROW THAT OPENS",
		ask: "a row that discloses",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "context"
	},
	{
		key: "inband",
		label: "IN A BAND",
		ask: "on the creme field",
		group: "context"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "a control beside it",
		group: "context"
	},
	{
		key: "noaction",
		label: "NO ACTION",
		ask: "nothing to press",
		group: "context"
	},
	{
		key: "print",
		label: "PRINT",
		ask: "the printed page",
		group: "context"
	},
	{
		key: "reducedmotion",
		label: "REDUCED MOTION",
		ask: "the reader asked for less",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built$1 = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable$1 = (reason) => ({
	disposition: "na",
	reason
});
/**
* The eight components, in the order a page meets them: the facts, the
* comparison, the axis, the provenance, the measurement, the field, the counted
* line and its constructor.
*
* Every row's overrides are reasons. A row with no overrides would be a part
* that survives every combination, and no part does.
*/
var Rows$1 = [
	{
		name: "LEDGER",
		file: "COMPONENT/RECORD/RECORDLEDGER.ASTRO",
		note: "What is true of one object, as rows: a mono key, an ink value, one figure at display weight.",
		cells: {
			error: NotApplicable$1("A ledger prints facts, and a failed action is not a fact about an object. Its cause, its next step and its retry are `RecordFailure`'s three fields; a ledger that grew them would be a condition block wearing a list's grammar."),
			disabled: NotApplicable$1("A ledger is not a control, so it cannot be disabled. A fact the reader may not see is a fact the page does not print, and that is a permission decision above the block - the block has nothing to withhold."),
			readonly: NotApplicable$1("A ledger is read-only by construction: it is a `<dl>`, it ships no script and it holds no input. There is no editable arm for read-only to be the absence of."),
			withaction: NotApplicable$1("A ledger has no action slot. The action belongs beside it in the artifact that holds it, which is where the tier's one `.emphasis-expressive` control goes - one action per artifact, never one per fact."),
			reducedmotion: NotApplicable$1("The ledger's only interval is the `<details>` a row opens with, and the browser opens that with no animation at all. There is nothing to remove for a reader who asked for less."),
			rest: Built$1("Four value arms: a state word, links, a literal, an emphasis."),
			loading: Built$1("`state=\"loading\"` keeps the keys - they are the schema - and bars the values; handed no rows it prints six."),
			empty: Built$1("`state=\"empty\"` prints the composed sentence and no frame, because a frame over nothing is a ruled void."),
			partial: Built$1("`LedgerRow.state` tints and marks a value that is a state word; the word itself stays the caller's."),
			stale: Built$1("`LedgerRow.asOf` prints `AS OF:` under the value."),
			selected: Built$1("`LedgerRow.selected`: `aria-current` plus the attested square and a leading rule."),
			oneitem: Built$1("One row is a ledger of one fact and prints without a top rule."),
			manyitems: Built$1("Twenty rows print as twenty ruled rows; the page scrolls and the ledger does not."),
			longkey: Built$1("The key column is `min(28ch, 40%)` and wraps; a key longer than its value pushes nothing off the line."),
			longvalue: Built$1("The value wraps inside its own column at every width; a path of three lines keeps the key beside it."),
			dense: Built$1("`density=\"register\"` reads the same facts as a table: key above value, two columns at 1024px."),
			totalrow: Built$1("`LedgerRow.total`: the divider's rule above, the sub role in the value."),
			openrow: Built$1("`LedgerRow.open`: a `<details>` whose summary is the row's value. No script, and the closed row still states the fact."),
			incard: Built$1("The `surface=\"standard\"` tier is the white insert, on the same shell."),
			print: Built$1("The `<details>` prints open on paper, because a printed page cannot be asked to click.")
		}
	},
	{
		name: "MATRIX",
		file: "COMPONENT/RECORD/RECORDMATRIX.ASTRO",
		note: "One state compared across columns: a real table, one ink per column, the row label pinned.",
		cells: {
			error: NotApplicable$1("A comparison states what each column is. A read that failed is a state word in the cell that failed - `UNAVAILABLE` in the vocabulary's tone - and a matrix-level error would be a second vocabulary for the same fact."),
			stale: NotApplicable$1("A matrix cell is a value without an age; the table's provenance is its caption, which is the block's one sentence about the whole comparison. An as-of per cell would be a fourth field in a three-field artifact."),
			disabled: NotApplicable$1("A matrix is not a control. There is no cell to disable, and a greyed-out comparison is a comparison nobody can read."),
			readonly: NotApplicable$1("A matrix is a printed table with no input and no script; read-only is not an absence it can have."),
			selected: NotApplicable$1("A matrix row is not selectable: a comparison marks a CELL, and a selection would need a script the block does not ship. A set that needs a chosen row is a ledger with `selected`."),
			partial: Built$1("A cell whose value is one of the eight state words takes the vocabulary's ink and the mark layer's square."),
			oneitem: Built$1("A comparison of one column is a value list with a head, and it is legal."),
			manyitems: Built$1("Twenty rows print as twenty ruled rows under a pinned head."),
			longkey: Built$1("The row label is `nowrap` and pinned; a long label widens the column rather than wrapping."),
			longvalue: Built$1("A cell refuses to wrap, so a long value grows the table and the shell scrolls under a pinned label - which is the block's whole narrow behaviour."),
			dense: Built$1("`density=\"dense\"` halves the row rhythm and moves nothing else."),
			totalrow: Built$1("`MatrixRow.total`: the divider's rule above the row and the sub role in its cells."),
			openrow: NotApplicable$1("A matrix row that opened would put a second artifact inside a cell, which §4.2 forbids. The detail a row discloses belongs in a ledger under the matrix, where a row may open."),
			incard: Built$1("Inside a white insert the page sets `--MatrixFill: var(--Card)` so the pinned label is opaque."),
			withaction: Built$1("The `id` prop exists so `MatrixControl` can drive the table; the action lives beside it, not in a cell."),
			print: Built$1("The pin is released and the head repeats on every printed page.")
		}
	},
	{
		name: "COMPARE",
		file: "COMPONENT/RECORD/RECORDCOMPARE.ASTRO",
		note: "One axis, its ends, and where each thing sits on it: a rail with a tick per position.",
		cells: {
			error: NotApplicable$1("A rail is a reading of positions, not an action. What fails on an axis is the link a stop points at, and a dead link is the browser's own statement."),
			stale: NotApplicable$1("A stop's position is a fact about an order, not a measurement: it has no as-of. A rail whose positions are out of date is a rail whose caption says so."),
			disabled: NotApplicable$1("A rail has no control to disable. An unreachable position is the `state` arm - a hollow tick and the vocabulary's word - which is a fact about the position and not about the reader's permission."),
			readonly: NotApplicable$1("The rail is printed: no input, no script, nothing to withhold."),
			selected: NotApplicable$1("A rail marks which positions are reached with the stop's own state. A selection would be a choice among positions, and an axis is one order rather than a menu."),
			partial: Built$1("`CompareStop.state` prints `STATUS: UNAVAILABLE` above the value and hollows the tick: the position is still a position."),
			oneitem: Built$1("One stop takes the whole measure (`--single`) and the axis still prints, because the axis is what the position is a position on."),
			manyitems: NotApplicable$1("A rail with more than six stops is a matrix. The block refuses to compress - a compressed rail is a table with the ends filed off - so a set of twenty positions is `RecordMatrix`'s work."),
			longkey: Built$1("A stop's label wraps inside its column; the value under it keeps its own line."),
			longvalue: Built$1("A stop's value is `text-wrap: pretty` and `overflow-wrap: anywhere`, so a value of three lines stays in its column."),
			dense: NotApplicable$1("Documented refusal, not an omission: a rail has one rhythm at every length, and the block that needs tighter is the matrix."),
			totalrow: NotApplicable$1("A rail has no total: its two ends are the axis's own, and a sum of positions is not a position on an axis."),
			openrow: NotApplicable$1("A stop is a position with one value, not a row with more of itself. A stop that opened would be a stage - and a stage is a different artifact."),
			narrow: Built$1("The rail rotates: the line runs down the left edge and the stops stack along it, ends first."),
			withaction: NotApplicable$1("A stop's value IS the action when it is a link. A button beside the rail would be a second order on one line, which is the thing the axis exists to prevent."),
			print: Built$1("The rail prints flat, ticks and all; nothing about it depends on hover.")
		}
	},
	{
		name: "TRACE",
		file: "COMPONENT/RECORD/RECORDTRACE.ASTRO",
		note: "Where a claim can be checked, in the order the source names it, closed by its source.",
		cells: {
			partial: NotApplicable$1("A trace step is a path or it is not a step. A trace whose source names a file the tree does not carry prints the path and lets the link fail - which is the honest reading, and better than a step that says it is half there."),
			error: NotApplicable$1("A trace has no failed arm: what fails is the link, and a trace whose source could not be read has no steps at all - which is `empty`, with the source still printed under it."),
			stale: NotApplicable$1("A trace is a reading taken at build time and its `SOURCE:` is that reading's provenance. An as-of on a path would date a file, and the file dates itself."),
			disabled: NotApplicable$1("Nothing in a trace is a control: the index is a number, the arrow is a mark, and the path is a link or it is text."),
			readonly: NotApplicable$1("The trace is printed and ships no script; there is no editable arm."),
			selected: NotApplicable$1("A trace is an order, not a set with a chosen member. The reader's place in it is the browser's scroll position, which is not the block's state."),
			loading: Built$1("Three steps with the index in ink and a hairline bar where the path and the note will be; the marker reads `LOADING`."),
			empty: Built$1("`state=\"empty\"` prints the composed sentence between the marker and the source - the marker and the source both survive, because a trace with nothing in it is still a claim about where the claim can be checked."),
			oneitem: Built$1("One step is a trace of one and prints its own count: `01 STEPS`."),
			manyitems: Built$1("Twenty steps print as twenty ruled steps; the index column is two characters and holds `20`."),
			longkey: Built$1("A path longer than its note wraps inside the path column (`overflow-wrap: anywhere`) and never pushes the note off the row."),
			longvalue: Built$1("A note of three lines sits in its own column at 768px and under the path below it."),
			dense: NotApplicable$1("Documented refusal: a trace compressed is a list of links, and a list of links is not evidence."),
			totalrow: NotApplicable$1("A trace has no total. Its count is in the marker (`06 STEPS`) and it is the steps' own length, so a total row would count the same set twice."),
			openrow: NotApplicable$1("A step is one path and the one thing it carries. A step that opened would hold a second note, and the trace's note column is already the place for the second line."),
			withaction: NotApplicable$1("The path is the action when it leads somewhere. A trace with a button beside it would be a command list, which is `RecordWell`'s job."),
			print: Built$1("The link's rule prints and the href resolves to its target, so a printed trace is still followable on paper.")
		}
	},
	{
		name: "INSTRUMENT",
		file: "COMPONENT/RECORD/RECORDINSTRUMENT.ASTRO",
		note: "A measured panel: four fields per cell - `LABEL:`, figure, `SOURCE:`, `AS OF:`.",
		cells: {
			error: NotApplicable$1("A figure that could not be measured prints `UNAVAILABLE` in its own cell, in the vocabulary's ink - the block's state arm. A second, panel-level error shape would be two ways to say one thing."),
			disabled: NotApplicable$1("A panel of printed figures has no control. A figure that is not being updated is a figure with an `AS OF:`."),
			readonly: NotApplicable$1("The panel is printed and ships no script; there is no editable arm."),
			selected: NotApplicable$1("A measure is a figure, not a choice. The panel's emphasis is `lead` - one figure set larger - and that is a rank, not a selection."),
			loading: Built$1("`state=\"loading\"` keeps the keys and the `SOURCE:` lines and bars the figure; handed no measures it prints three unnamed cells."),
			empty: Built$1("`state=\"empty\"` or no measures: the `◎` and the composed sentence, at the panel's own top rule."),
			stale: Built$1("`Measure.asOf` prints `AS OF:` after the provenance, at the caption weight."),
			oneitem: Built$1("A set of one is a set of one and still prints its own source."),
			manyitems: Built$1("Twelve measures reflow at `auto-fit`/13rem; the strip wraps rather than shrinking a figure."),
			longkey: Built$1("The key wraps above the figure; a long label never shrinks the number."),
			longvalue: Built$1("A provenance of three lines wraps under the figure at the caption weight; the figure keeps its size."),
			dense: NotApplicable$1("Documented refusal: an instrument is already the densest reading of a figure - four fields in one cell. A block that needs tighter needs fewer measures."),
			totalrow: Built$1("`Measure.total` spans the strip under the divider's rule, at the sub role: the sum the measures above add up to."),
			openrow: NotApplicable$1("A measure is four fields in one cell. A disclosure inside it would be a fifth field, and the block's contract says the panel holds nothing."),
			withaction: NotApplicable$1("A panel has no action slot. A figure that can be refreshed is a figure whose refresh belongs to the page, not to the number."),
			print: Built$1("The strip prints with its rules and its sources; a figure keeps its provenance on paper.")
		}
	},
	{
		name: "PLATE SET",
		file: "COMPONENT/RECORD/RECORDPLATESET.ASTRO",
		note: "Many figures of one subject, read as a field: numbered cells at one size.",
		cells: {
			error: NotApplicable$1("A plate-set's absent cell is a tombstone with a reason (`state` + `note`), which is the honest reading of a capture that is not there. An error arm would be a second word for the same absence."),
			stale: NotApplicable$1("A plate's age is its manifest's, and the set prints one `SOURCE:` for the field. An as-of per cell would put a date under fifteen pictures that share one capture date."),
			disabled: NotApplicable$1("Nothing in a plate-set is disabled. A cell that cannot be shown prints its state and its reason; a greyed-out frame would be a hole with a caption."),
			readonly: NotApplicable$1("The set is printed and ships no script; there is no editable arm."),
			selected: NotApplicable$1("A field of figures is scanned, not chosen. A selected cell would need a script, and the set's own selection is the reader's eye."),
			partial: Built$1("`PlateCell.state` + `note`: the frame keeps its 4:3 bed and prints `◎` with the reason, so the set reads as one register of attempts."),
			oneitem: Built$1("A set of one prints `01 PLATE` - the unit singular is derived from the set's own length."),
			manyitems: Built$1("`window` prints twelve of two hundred and names the rest on the foot, because a page of two hundred figures is a directory."),
			longkey: Built$1("A subject longer than its frame wraps under it after the `↳`; the frame never changes shape."),
			longvalue: Built$1("A note of three lines sits under the subject at the caption weight."),
			dense: NotApplicable$1("Documented refusal: a set of figures is scanned at one size, and a denser set is a smaller claim about each picture."),
			totalrow: NotApplicable$1("A set has no total row: its count is its register line (`PLATES␁15`), and a sum of pictures is not a picture."),
			openrow: NotApplicable$1("A cell does not disclose. Its frame is a door when the cell names a target (`href`) and a picture when it does not - a disclosure inside a figure would be a caption channel, which is `RecordPlate`'s job."),
			withaction: Built$1("`PlateCell.href` makes the whole 4:3 frame the anchor: the picture is the control, and it takes the focus ring."),
			print: Built$1("The frames print at 4:3 with their numbers and states; a printed field is still a field.")
		}
	},
	{
		name: "REGISTER",
		file: "COMPONENT/RECORD/REGISTER.ASTRO",
		note: "The counted line - mark, name, separator, figure - printed by every block that has one.",
		cells: {
			error: NotApplicable$1("A register states a count, and a count that did not arrive is `UNAVAILABLE` - the partial arm. There is no error arm because the line has no action that could fail."),
			stale: NotApplicable$1("A register has no age: it counts the rows under it, and if those rows are stale their own `AS OF:` says so. A register that dated itself would be a second provenance beside the block's."),
			disabled: NotApplicable$1("The line is not a control. It is the smallest complete statement the grammar has, and there is nothing on it to withhold."),
			readonly: NotApplicable$1("The register is printed and ships no script; there is no editable arm."),
			selected: NotApplicable$1("A register names a set and counts it. There is no member to select, and a selected register would be a tab."),
			loading: Built$1("`RegisterCountText` prints `LOADING` in the count slot, whole and unbroken."),
			empty: Built$1("`RegisterOf` on no rows prints `00` - an empty set is a KNOWN figure - and the line still names the set that turned out to be empty."),
			partial: Built$1("`RegisterUnavailable` prints `UNAVAILABLE` where the figure will be: a word, never a zero, because a zero claims the set is empty."),
			oneitem: Built$1("A register of one prints `01`."),
			manyitems: Built$1("`RegisterWindow` prints the too-much state as a count: `12 OF 240`, which is what the reader holds and what exists."),
			longkey: Built$1("A label longer than its margin wraps and `text-wrap: balance` keeps it to two even lines; the separator and the count stay whole."),
			longvalue: NotApplicable$1("A register's second half is a count: a figure or one word. There is no long-value arm, and a count that needed three lines would be a sentence, not a register."),
			dense: NotApplicable$1("A register line has one size. It is the smallest complete statement the grammar has, and there is no smaller step above the 13px floor."),
			totalrow: NotApplicable$1("A register IS the total: `# WHAT CHANGES / 08` is the count of the set. A total row under a total line would count the same thing twice."),
			openrow: NotApplicable$1("A register line opens nothing. It is the block's own name and extent, and what the block holds is printed under it."),
			wide: Built$1("The line sits at its own length at any width; a register stretched across a band would be a rule with a word on it."),
			withaction: NotApplicable$1("The line carries no action. A register that could be pressed would be a disclosure, and a disclosure has a fold."),
			print: Built$1("The line prints in full, unit and all; `RegisterText` is its one-string form.")
		}
	},
	{
		name: "REGISTER LINE",
		file: "COMPONENT/RECORD/REGISTERLINE.TS",
		note: "The shape and its four constructors: the only way a counted line can be built.",
		cells: {
			rest: Built$1("`RegisterOf`, `RegisterCount`, `RegisterUnavailable`, `RegisterWindow` - four questions, four answers."),
			loading: Built$1("`RegisterCountText` answers `LOADING` for the count slot."),
			empty: Built$1("`Padded(0)` is `00`, and an empty set is a known figure."),
			partial: Built$1("`RegisterUnavailable` is the arm, and it is a word rather than a figure."),
			error: NotApplicable$1("The module composes a line; it performs no action, so it has nothing that can fail. A failed read is a count the caller cannot know, which is `RegisterUnavailable`."),
			stale: NotApplicable$1("The shape carries a label and a count. An age is not part of a register - it is a fact about the rows, and the rows carry it."),
			disabled: NotApplicable$1("`RegisterLine` is a data module: it composes no markup and holds no control, so there is nothing to disable."),
			readonly: NotApplicable$1("Every register is read-only: the shape has no setter and the renderer prints it. There is no editable arm to be the absence of."),
			selected: NotApplicable$1("A register names one set. There is no second member for a selection to choose between."),
			oneitem: Built$1("`RegisterOf` on one row is `01`, and `Padded` is what makes it two characters."),
			manyitems: Built$1("`Padded(120)` is `120` - two digits is the floor, not the ceiling - and `RegisterWindow` states a window of a larger set."),
			longkey: NotApplicable$1("The module trims a label and never measures it. A long label is the RENDERER's arm, which is why REGISTER / LONG KEY is built and this row's is not."),
			longvalue: NotApplicable$1("A count is a figure or one word by construction: `Padded` pads, `RegisterUnavailable` prints `UNAVAILABLE`, and `RegisterWindow` joins two counts with `OF`."),
			dense: NotApplicable$1("A data module has no rhythm to tighten. Density is a rendering decision and belongs to the block that prints the line."),
			narrow: NotApplicable$1("The module has no width: it composes a string, and the string wraps or does not in the renderer's box."),
			wide: NotApplicable$1("The module has no width for the same reason. `RegisterText` composes one line for a title or an `aria-label`; how wide it prints is the renderer's."),
			totalrow: NotApplicable$1("The line is already the total. There is no second rank of count in the shape, and adding one would be a second register grammar."),
			openrow: NotApplicable$1("The shape has four fields and no body: there is nothing under a register to open."),
			incard: NotApplicable$1("A module composes no markup, so it cannot be inside a card. The line REGISTER prints is the part that sits in one."),
			inband: NotApplicable$1("A module composes no markup, so it cannot sit on a band either - the same answer as IN A CARD, and it is the answer for both because the question is about a surface and this row has none."),
			withaction: NotApplicable$1("The shape has no slot for a control."),
			noaction: Built$1("It is pure: a label, a count, a unit and a separator, and nothing to press."),
			print: Built$1("`RegisterText` composes the whole line as one string and `RegisterSpokenText` composes the same statement for the ear - for a document title, an `aria-label` or a generated page - which is exactly what a printed register needs."),
			reducedmotion: NotApplicable$1("The module has no interval. Motion is a rendering decision and this row renders nothing.")
		}
	}
];
/**
* One cell of the matrix.
*
* A row lists only its exceptions, so a missing entry is `BUILT` - and that
* default is what makes every `N/A` in this file a sentence someone had to
* write rather than a blank someone left.
*/
var MatrixCell$1 = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells$1 = () => Rows$1.flatMap((row) => Columns$1.map((column) => ({
	row,
	column,
	cell: MatrixCell$1(row, column)
})));
/** How many cells the matrix holds. */
var CellCount$1 = Rows$1.length * Columns$1.length;
/** How many cells the family builds. */
var BuiltCount$1 = MatrixCells$1().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount$1 = CellCount$1 - BuiltCount$1;
/** How many cells one row builds. */
var BuiltOf$1 = (Row) => Columns$1.filter((Column) => MatrixCell$1(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn$1 = (Column) => Rows$1.filter((Row) => MatrixCell$1(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister$1 = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows$1.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns$1.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount$1)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount$1)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount$1)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens$1.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/RECORD.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The twelve behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that
* revealed it. An improvement with no cell behind it would be a preference.
*/
var Improvements$1 = [
	{
		component: "LEDGER",
		from: "ROW THAT OPENS",
		found: "A build's three flags were three rows of the same rank as its target and its licence, so a ledger of six facts read as a ledger of nine. The detail existed; it had no rank.",
		built: "`LedgerRow.open` prints the row as a `<details>` whose summary is the value, with the disclosed facts as the same row grammar one level in - and through `LedgerValue`, the renderer the row's own value uses, so a link, a literal or a state word cannot print two ways on either level. No script: the browser's disclosure is the behaviour and the mark layer's fold is its sign."
	},
	{
		component: "LEDGER",
		from: "SELECTED",
		found: "A ledger that stated a default (`DEFAULT:`, `ACTIVE:`) printed it in the same ink as the other rows, so the one fact a reader needed to find was the one fact the eye had to hunt for.",
		built: "`LedgerRow.selected` prints `aria-current` plus the attested square and a leading rule at the divider's ink. The accent stays out of it: a fact is not an action."
	},
	{
		component: "LEDGER",
		from: "TOTAL ROW",
		found: "A set's sum was printed as one more row, so the reader could not tell a fact from the figure the facts add up to.",
		built: "`LedgerRow.total` prints under the divider's rule with its value at the sub role and spans the grid, so a total in a two-column register is the total of the whole register and not of one half."
	},
	{
		component: "LEDGER",
		from: "PARTIAL / STALE",
		found: "An unknown fact and a fact older than the page were both written as prose in the value column (`not yet measured`, `as of 14 Nov`), so the vocabulary's own words were the one place they were not used.",
		built: "`LedgerRow.state` tints and marks a value that is a state word - the mark layer's hollow square, the vocabulary's ink - and `LedgerRow.asOf` prints `AS OF:` in the note channel. The word stays the caller's: the block tints, it never re-cases."
	},
	{
		component: "MATRIX",
		from: "EMPTY",
		found: "A matrix with no rows printed its head over a blank body. It was the one block on the site that could print a comparison whose answer looked like nothing at all.",
		built: "`state=\"empty\"` keeps the head - the schema is still true when the values are not - and prints one cell spanning the table with the composed sentence."
	},
	{
		component: "MATRIX",
		from: "LOADING",
		found: "There was no loading arm at all: a comparison whose values had not arrived printed an empty table, which reads as a comparison of nothing.",
		built: "`state=\"loading\"` prints three skeleton rows with a bar in every cell, and the head stays. The bar is the ledger's own, so the site has one way of drawing a value that has not arrived."
	},
	{
		component: "MATRIX",
		from: "PARTIAL",
		found: "`UNAVAILABLE` in a cell read as a value that happened to be a word - the same ink and the same weight as `YES` - so the one honest answer in a compatibility table was the least visible.",
		built: "A cell whose value is one of the eight state words takes the vocabulary's ink and the mark layer's square. `yes` and `no` keep their verdict marks: an answer that was not given is not a third answer."
	},
	{
		component: "TRACE",
		from: "LOADING",
		found: "The type contract promised a skeleton and the block printed nothing: `state=\"loading\"` changed the marker to `LOADING` and left the body empty, so a trace being read looked exactly like a trace that had failed.",
		built: "Three steps with the index in ink and a bar where the path and the note will be. The index prints because the steps' order is the schema."
	},
	{
		component: "TRACE",
		from: "EMPTY",
		found: "The block checked a state its type could not express (`empty`), and a caller that passed no sentence got a marker over nothing - a hole where a provenance statement belongs.",
		built: "`Trace.state` now carries `empty`, and the block composes the sentence when the caller does not: the marker and the `SOURCE:` both survive, because a trace with nothing in it is still a claim about where the claim can be checked."
	},
	{
		component: "COMPARE",
		from: "TWO SIDES EQUAL",
		found: "Two positions carrying the same value printed as two ordinary ticks, so a tie looked exactly like a gap. The caption had to say what the rail could have shown.",
		built: "`CompareStop.equal` draws the interval between the two ticks in the rail's own ink: two positions at the same place read as one plateau, and the caption then explains it rather than announcing it."
	},
	{
		component: "INSTRUMENT",
		from: "MISSING READING / LOADING",
		found: "A panel whose figures had not arrived printed its caption and nothing else - the one block that could not say how many figures it was waiting for.",
		built: "`state=\"loading\"` keeps every `LABEL:` and every `SOURCE:` line and bars only the figure, because the labels and the provenance are the schema. A missing reading still prints the vocabulary's word in its own cell."
	},
	{
		component: "REGISTER",
		from: "PARTIAL / TOO MUCH",
		found: "The line's five parts were printed but never announced: the mark and the separator are `aria-hidden`, so a screen reader ran the label into the figure and read `WHAT CHANGES08`. And the too-much state - a set longer than the page - had no register at all: `RecordPlateSet` printed `SHOWING: 12 OF 240` in its own foot, outside the shape.",
		built: "`Register.astro` prints two runs: the five parts, and a visually hidden line carrying `RegisterSpokenText(...)` - the name, then the figure, with a comma where the eye gets a mark and a slash, because a screen reader says punctuation as characters. The earlier `aria-label` on the `<p>` was dropped by every screen reader, since ARIA prohibits naming the `paragraph` role; and `RegisterWindow(label, showing, total)` is the too-much state as a register, in the grammar every other count uses."
	}
];
var Observations$1 = [
	{
		name: "THE COLON IS THE CALLER'S",
		found: "`DESIGN-COMPLETE.md` §1.5 names the colon-less field label a live violation and points at the hero's facts ledger. The renderer cannot fix it: most of the tree's ledger keys already carry their `:` (`TARGET:`, `LICENSE:`), so a block that appended one would double it on every one of them. The keys that lack it are a content defect, and they are fixed where the data lives.",
		owner: "The content modules that own those rows - `Component/Dynamic/Hero/Data.ts` and its neighbours. This card prints the rule on the sheet so the defect is visible rather than inferred."
	},
	{
		name: "THE REGISTER'S QUAD IS 0.6em",
		found: "U+2001 is the grammar's em quad and the site's only separator, and in IBM Plex Mono it advances 0.6em like every other glyph. `Type/_Register.scss` states the argument: re-cutting the quad here would make one character two widths on one page, and `Detail/_Folio.scss` computes a folio's length in em quads.",
		owner: "A renderer change in both artifacts at once - the quad printed as an empty span whose width the stylesheet owns. Named on the sheet, not faked in a partial."
	},
	{
		name: "THE LEDGER HAS NO SOURCE SLOT",
		found: "Every block in this family can say where its content came from except the one that prints facts. `RecordInstrument` requires a `provenance` on every measure, `RecordTrace` requires `source`, `RecordMatrix` takes a `caption` and `RecordPlateSet` takes a `source`; `RecordLedger` offers `note` (a qualifier about the value) and `asOf` (the value's age) and nothing for a source. The pressure is visible where the block is used: `/STATUS` carries its scope ledger's provenance in the band caption - \"Every row was read from the module named in its band's footnote\" - because there is nowhere inside the block to put it.",
		owner: "A `LedgerRow.source` field, not a block-level `source` prop: a ledger assembled from three modules has three sources, and one line under the block would attribute all of them to one. That is a change to the row's contract, and it would print under every fact in the twenty-six files that mount a ledger - a decision for the card that owns the tree's facts, not for the one that built the row's states."
	}
];
/**
* The live rows.
*
* Ordered as the matrix's groups: the facts, the axes, the measures, the counted
* lines. Every one of the eight components appears at least once, the four
* combinations the brief named by hand each get a row of their own, and the
* rows that carry a context are the same component in two different boxes -
* which is the claim this family has to prove.
*/
var Specimens$1 = [
	{
		mark: "01",
		group: "facts",
		state_name: "REST",
		component: "Ledger",
		when: "The ordinary reading: a key, a value, one qualifier under it. Every record's facts are this.",
		kind: "ledger",
		rows: 5
	},
	{
		mark: "02",
		group: "facts",
		state_name: "ONE ROW",
		component: "Ledger",
		when: "A ledger of one fact is legal and opens without a top rule: the band heading above it already ends the page.",
		kind: "ledger",
		rows: 1
	},
	{
		mark: "03",
		group: "facts",
		state_name: "TWENTY ROWS",
		component: "Ledger",
		when: "The too-many state: twenty facts print as twenty ruled rows and the page scrolls, not the ledger.",
		kind: "ledger",
		rows: 20
	},
	{
		mark: "04",
		group: "facts",
		state_name: "LONG KEY",
		component: "Ledger",
		when: "A key longer than its value: the key column is `min(28ch, 40%)` and wraps rather than pushing the value off the line.",
		kind: "ledger",
		rows: 4,
		variant: "longkey"
	},
	{
		mark: "05",
		group: "facts",
		state_name: "LONG VALUE",
		component: "Ledger",
		when: "A value that wraps to three lines: a path or a sentence keeps the key beside it at every width.",
		kind: "ledger",
		rows: 4,
		variant: "longvalue"
	},
	{
		mark: "06",
		group: "facts",
		state_name: "PARTIAL",
		component: "Ledger",
		when: "Some facts unknown: the row prints the vocabulary's word with the mark layer's hollow square - never a blank cell, never a zero.",
		kind: "ledger",
		rows: 4,
		variant: "unavailable"
	},
	{
		mark: "07",
		group: "facts",
		state_name: "STALE",
		component: "Ledger",
		when: "A fact older than the page: the value stays visible and `AS OF:` states its age beside it.",
		kind: "ledger",
		rows: 3,
		variant: "stale"
	},
	{
		mark: "08",
		group: "facts",
		state_name: "ROW THAT OPENS",
		component: "Ledger",
		when: "A fact whose detail is three more facts: the row discloses them in a `<details>` and still states its value when shut. The disclosed facts print through the row's own value renderer, so a link, a literal or a state word reads the same one level in.",
		kind: "ledger",
		rows: 4,
		variant: "open"
	},
	{
		mark: "09",
		group: "facts",
		state_name: "SELECTED",
		component: "Ledger",
		when: "The marked row of its set: `aria-current`, the attested square and a leading rule - the two signals every selected thing on the site carries.",
		kind: "ledger",
		rows: 4,
		variant: "selected"
	},
	{
		mark: "10",
		group: "facts",
		state_name: "TOTAL ROW",
		component: "Ledger",
		when: "The set's sum: the divider's rule above it and the sub role in its value, so a total is never read as one more fact.",
		kind: "ledger",
		rows: 4,
		variant: "total"
	},
	{
		mark: "11",
		group: "facts",
		state_name: "LOADING",
		component: "Ledger",
		when: "The facts have not arrived: the keys stay because they are the schema, and each value is a hairline bar.",
		kind: "ledger",
		rows: 5,
		state: "loading"
	},
	{
		mark: "12",
		group: "facts",
		state_name: "EMPTY",
		component: "Ledger",
		when: "Nothing is recorded: one composed sentence says what would be here, why it is not, and where to read it. No frame over nothing.",
		kind: "ledger",
		rows: 0,
		state: "empty",
		empty: "No working is recorded for this element yet: its manual page names no source, so the record prints its own facts and names none. The absence is the fact."
	},
	{
		mark: "13",
		group: "facts",
		state_name: "IN A CARD",
		component: "Ledger",
		when: "A white insert on the field: the `standard` tier is the published card, worn on the same shell with only the interior padding added.",
		kind: "ledger",
		rows: 4,
		surface: "standard"
	},
	{
		mark: "14",
		group: "facts",
		state_name: "DENSE",
		component: "Ledger",
		when: "The same facts read as a table: key above value, two columns at 1024px, a hairline between them, the count in the register line.",
		kind: "ledger",
		rows: 6,
		dense: true,
		label: "WORKING"
	},
	{
		mark: "15",
		group: "facts",
		state_name: "NARROW",
		component: "Ledger",
		when: "A 16rem column: the key moves above its value and a long path wraps inside the value column instead of pushing the key off.",
		kind: "ledger",
		rows: 4,
		width: "narrow"
	},
	{
		mark: "16",
		group: "facts",
		state_name: "REST",
		component: "Matrix",
		when: "A comparison across columns: the head names each column, the row label pins to the edge, one ink per column.",
		kind: "matrix",
		rows: 4,
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "17",
		group: "facts",
		state_name: "ONE COLUMN",
		component: "Matrix",
		when: "A matrix of one column is a value list with a head, and it is legal - the comparison is of one state across one column.",
		kind: "matrix",
		rows: 3,
		columns: ["SIGNAL"]
	},
	{
		mark: "18",
		group: "facts",
		state_name: "TWELVE COLUMNS",
		component: "Matrix",
		when: "The too-wide state: twelve columns do not fit, so the shell scrolls sideways and the row label stays attached to its cells.",
		kind: "matrix",
		rows: 3,
		columns: [
			"GRPC",
			"IPC",
			"TCP",
			"WASM",
			"MCP",
			"LSP",
			"DAP",
			"OTEL",
			"FS",
			"HTTP",
			"CRDT",
			"SPINE"
		]
	},
	{
		mark: "19",
		group: "facts",
		state_name: "PARTIAL",
		component: "Matrix",
		when: "A cell that could not be measured: `UNAVAILABLE` takes the vocabulary's ink and the mark layer's square, so it never reads as a value.",
		kind: "matrix",
		rows: 3,
		variant: "unavailable",
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "20",
		group: "facts",
		state_name: "TOTAL ROW",
		component: "Matrix",
		when: "A set's sum: one figure across the whole table, under the divider's rule and at the sub role, because the rows above add up to it and the block never computes it. A total that carries a value per column prints one cell each instead.",
		kind: "matrix",
		rows: 3,
		variant: "total",
		columns: ["TIER", "FEATURES"]
	},
	{
		mark: "21",
		group: "facts",
		state_name: "LOADING",
		component: "Matrix",
		when: "The values have not arrived: the head stays - it is the schema - and every cell prints a bar.",
		kind: "matrix",
		rows: 3,
		state: "loading",
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		]
	},
	{
		mark: "22",
		group: "facts",
		state_name: "EMPTY",
		component: "Matrix",
		when: "No row is recorded: the head prints because the columns are still the schema, and one cell spanning the table states the absence.",
		kind: "matrix",
		rows: 0,
		state: "empty",
		columns: [
			"TIER",
			"PROTOCOL",
			"FEATURES"
		],
		empty: "No release is filed against these columns yet. The head prints because what is being compared is known before the values are; the body states the absence rather than leaving a blank."
	},
	{
		mark: "23",
		group: "axes",
		state_name: "REST",
		component: "Compare",
		when: "One axis with two ends and a tick per position: the order is the claim, and the ends are what make it a claim.",
		kind: "compare",
		rows: 4,
		label: "/POSITION"
	},
	{
		mark: "24",
		group: "axes",
		state_name: "TWO SIDES EQUAL",
		component: "Compare",
		when: "Two positions carrying the same value: the interval between their ticks is drawn in the rail's ink, so the tie is a plateau before the caption is read.",
		kind: "compare",
		rows: 3,
		variant: "equal",
		label: "/PARITY"
	},
	{
		mark: "25",
		group: "axes",
		state_name: "ONE STOP",
		component: "Compare",
		when: "A rail of one: the stop takes the whole measure and the axis still prints, because the axis is what the position is a position on.",
		kind: "compare",
		rows: 1,
		label: "/POSITION"
	},
	{
		mark: "26",
		group: "axes",
		state_name: "UNREACHED",
		component: "Compare",
		when: "A position nothing has arrived at: the tick hollows and `STATUS: UNAVAILABLE` prints above the value - the partial state as a shape.",
		kind: "compare",
		rows: 4,
		variant: "unreached"
	},
	{
		mark: "27",
		group: "axes",
		state_name: "LOADING",
		component: "Compare",
		when: "The stops have not arrived: the axis prints because it is already known, and three hollow stops print bars where the labels and values will be.",
		kind: "compare",
		rows: 3,
		state: "loading"
	},
	{
		mark: "28",
		group: "axes",
		state_name: "EMPTY",
		component: "Compare",
		when: "No position is recorded: the ends still print, so a reader can see which order is being asked about.",
		kind: "compare",
		rows: 0,
		state: "empty",
		empty: "No position is recorded on this axis yet. The rail prints its two ends rather than a blank line, because the order being asked about is itself a fact."
	},
	{
		mark: "29",
		group: "axes",
		state_name: "REST",
		component: "Trace",
		when: "Where a claim can be checked: numbered steps, each with the one thing it carries, closed by the source it was read out of.",
		kind: "trace",
		rows: 4,
		label: "BUILD"
	},
	{
		mark: "30",
		group: "axes",
		state_name: "TWENTY STEPS",
		component: "Trace",
		when: "The too-many state: twenty steps print as twenty ruled steps, the index column holding `20` without moving the paths.",
		kind: "trace",
		rows: 20,
		label: "CHECK"
	},
	{
		mark: "31",
		group: "axes",
		state_name: "NO EVENTS",
		component: "Trace",
		when: "A trace whose source names no step: the marker and the `SOURCE:` both survive, and one sentence says why there is nothing between them.",
		kind: "trace",
		rows: 0,
		state: "empty",
		label: "BUILD"
	},
	{
		mark: "32",
		group: "axes",
		state_name: "LONG PATH",
		component: "Trace",
		when: "A path longer than its note: it wraps inside the path column at every width and never pushes the note off the row.",
		kind: "trace",
		rows: 2,
		variant: "longpath",
		label: "CHECK"
	},
	{
		mark: "33",
		group: "axes",
		state_name: "LOADING",
		component: "Trace",
		when: "The trace is being read: the index prints in ink because the order is the schema, and a bar stands where each path and note will be.",
		kind: "trace",
		rows: 0,
		state: "loading",
		label: "BUILD"
	},
	{
		mark: "34",
		group: "measures",
		state_name: "REST",
		component: "Instrument",
		when: "A measured panel: four fields in one cell - `LABEL:`, figure, unit, `SOURCE:` - because a figure without provenance is a picture.",
		kind: "instrument",
		rows: 3,
		label: "/THE EXTENT"
	},
	{
		mark: "35",
		group: "measures",
		state_name: "MISSING READING",
		component: "Instrument",
		when: "One figure that could not be measured: the state word prints in the figure's place and the unit is dropped, because `UNAVAILABLE ENTRIES` would read as a figure.",
		kind: "instrument",
		rows: 3,
		variant: "unavailable",
		label: "/THE EXTENT"
	},
	{
		mark: "36",
		group: "measures",
		state_name: "TWELVE MEASURES",
		component: "Instrument",
		when: "The too-many state: twelve measures reflow at `auto-fit`/13rem and wrap rather than shrinking a figure, because a shrunken number is a smaller claim.",
		kind: "instrument",
		rows: 12
	},
	{
		mark: "37",
		group: "measures",
		state_name: "TOTAL",
		component: "Instrument",
		when: "The panel's sum: it spans the strip under the divider's rule at the sub role, so the total is a rank and not one more figure.",
		kind: "instrument",
		rows: 3,
		variant: "total",
		label: "/THE EXTENT"
	},
	{
		mark: "38",
		group: "measures",
		state_name: "STALE",
		component: "Instrument",
		when: "A figure older than the page: `AS OF:` prints after the provenance at the caption weight, so a stale number is never silent about being old.",
		kind: "instrument",
		rows: 2,
		variant: "stale"
	},
	{
		mark: "39",
		group: "measures",
		state_name: "LOADING",
		component: "Instrument",
		when: "The figures have not arrived: the keys and the `SOURCE:` lines print and only the figure is barred, because the schema is known.",
		kind: "instrument",
		rows: 3,
		state: "loading",
		label: "/THE EXTENT"
	},
	{
		mark: "40",
		group: "measures",
		state_name: "EMPTY",
		component: "Instrument",
		when: "Nothing has been measured: the `◎` and the composed sentence, at the panel's own top rule - never a box waiting to be filled.",
		kind: "instrument",
		rows: 0,
		state: "empty",
		empty: "The register has not been run against this tree, so there are no figures to print. Run the register and rebuild - this panel will not invent a number to fill itself."
	},
	{
		mark: "41",
		group: "measures",
		state_name: "REST",
		component: "Plate set",
		when: "Many figures of one subject: numbered cells at one size, each with its state, its subject and its reason.",
		kind: "plateset",
		rows: 6,
		label: "ELEMENT EVIDENCE"
	},
	{
		mark: "42",
		group: "measures",
		state_name: "MISSING PLATES",
		component: "Plate set",
		when: "Most of the set is absent: each cell prints its own state and reason in the grammar the present ones use, so the field reads as one register of attempts.",
		kind: "plateset",
		rows: 6,
		variant: "absent",
		label: "ELEMENT EVIDENCE"
	},
	{
		mark: "43",
		group: "measures",
		state_name: "TOO MUCH",
		component: "Plate set",
		when: "A set of two hundred: twelve print and the foot names the rest - `SHOWING: 12 OF 240` - because a page of two hundred figures is a directory.",
		kind: "plateset",
		rows: 12,
		variant: "window",
		label: "ELEMENT EVIDENCE"
	},
	{
		mark: "44",
		group: "measures",
		state_name: "EMPTY",
		component: "Plate set",
		when: "No plate is filed: the head still prints its index and its count, and one sentence says what the set would hold.",
		kind: "plateset",
		rows: 0,
		state: "empty",
		label: "ELEMENT EVIDENCE"
	},
	{
		mark: "45",
		group: "lines",
		state_name: "REST",
		component: "Register",
		when: "The counted line, in its five parts: the mark and the separator muted, the name and the figure in ink.",
		kind: "register",
		label: "WHAT CHANGES",
		count: "08"
	},
	{
		mark: "46",
		group: "lines",
		state_name: "UNIT",
		component: "Register",
		when: "A set whose count is of something: the unit is bound to the figure by one space and never separates from it.",
		kind: "register",
		label: "BLOG",
		count: "08",
		unit: "ENTRIES"
	},
	{
		mark: "47",
		group: "lines",
		state_name: "QUAD",
		component: "Register",
		when: "U+2001 as the separator: the form the rail and the specimen registers print, where the count is a column rather than a route.",
		kind: "register",
		label: "ON THIS PAGE",
		count: "07",
		separator: "quad"
	},
	{
		mark: "48",
		group: "lines",
		state_name: "UNAVAILABLE",
		component: "Register",
		when: "A count that cannot be known: the vocabulary's word where the figure will be - never a zero, because a zero claims the set is empty.",
		kind: "register",
		label: "CHECK",
		count: "UNAVAILABLE"
	},
	{
		mark: "49",
		group: "lines",
		state_name: "TOO MUCH",
		component: "Register",
		when: "A set longer than the page: `RegisterWindow` states what the reader holds and what exists, in the register's own grammar.",
		kind: "register",
		label: "PLATES",
		count: "12 OF 240"
	},
	{
		mark: "50",
		group: "lines",
		state_name: "LOADING",
		component: "Register",
		when: "The set has not been counted yet: `LOADING` prints where the figure will be, whole and unbroken, so the line does not reflow when it arrives.",
		kind: "register",
		label: "WHAT CHANGES",
		count: "08",
		state: "loading"
	},
	{
		mark: "51",
		group: "lines",
		state_name: "EMPTY",
		component: "Register",
		when: "A set with nothing in it: `00` is a figure, because an empty set is a known set - and the line still names what turned out to be empty.",
		kind: "register",
		label: "WHAT CHANGES",
		count: "00"
	},
	{
		mark: "52",
		group: "lines",
		state_name: "THE FOUR CONSTRUCTORS",
		component: "Register line",
		when: "The shape itself: four questions, four answers - a set the block holds, a count it does not, a count that cannot be known, and a window of a larger set.",
		kind: "registerline"
	}
];
/** The rows of one group, in order. */
var InGroup$1 = (Group) => Specimens$1.filter((Specimen) => Specimen.group === Group);
/** The four groups, in reading order, with the question each one answers. */
var Groups$1 = [
	{
		key: "facts",
		label: "/FACTS",
		note: "What the document states as true, and what it states as compared. These are the two blocks a reader checks the project against."
	},
	{
		key: "axes",
		label: "/AXES",
		note: "Where things sit on one line, and where a claim can be checked along one. The rail has ends and the trace has a source; both are orders."
	},
	{
		key: "measures",
		label: "/MEASURES",
		note: "How much of something, and what a set of evidence looks like at one size. A figure carries its source; a picture carries its state."
	},
	{
		key: "lines",
		label: "/LINES",
		note: "The counted line itself - the site's most-printed sentence - in every arm it has, including the two that had no shape before this card."
	}
];
Specimens$1.length;
// Source/Content/Specimen/Small.ts
/**
* The twenty-four columns, in reading order.
*
* Nine conditions first, because they are the states any block is met in; then
* six shapes, because they are what a small surface is asked to hold; then the
* seven compositions this family's brief named by hand - the states a credential
* route, a directory, a request and a licence are actually read in; then two
* contexts, because they are the two a designer forgets: the action the block
* carries and the medium it is printed on.
*/
var Columns = [
	{
		key: "rest",
		label: "REST",
		ask: "untouched",
		group: "condition"
	},
	{
		key: "empty",
		label: "EMPTY",
		ask: "holds nothing",
		group: "condition"
	},
	{
		key: "loading",
		label: "LOADING",
		ask: "has not arrived",
		group: "condition"
	},
	{
		key: "partial",
		label: "PARTIAL",
		ask: "one fact unknown",
		group: "condition"
	},
	{
		key: "error",
		label: "ERROR",
		ask: "a read failed",
		group: "condition"
	},
	{
		key: "stale",
		label: "STALE",
		ask: "older than its as-of",
		group: "condition"
	},
	{
		key: "disabled",
		label: "DISABLED",
		ask: "cannot be used",
		group: "condition"
	},
	{
		key: "readonly",
		label: "READ-ONLY",
		ask: "cannot be changed",
		group: "condition"
	},
	{
		key: "dense",
		label: "DENSE",
		ask: "the tight arm",
		group: "condition"
	},
	{
		key: "one",
		label: "ONE",
		ask: "a set of one",
		group: "shape"
	},
	{
		key: "many",
		label: "MANY",
		ask: "twenty-six or ninety",
		group: "shape"
	},
	{
		key: "long",
		label: "LONG",
		ask: "a line past its column",
		group: "shape"
	},
	{
		key: "narrow",
		label: "NARROW",
		ask: "a narrow column",
		group: "shape"
	},
	{
		key: "wide",
		label: "WIDE",
		ask: "a wide band",
		group: "shape"
	},
	{
		key: "incard",
		label: "IN A CARD",
		ask: "inside a white insert",
		group: "shape"
	},
	{
		key: "signedout",
		label: "SIGNED OUT",
		ask: "no session yet",
		group: "composition"
	},
	{
		key: "signingin",
		label: "SIGNING IN",
		ask: "the exchange is running",
		group: "composition"
	},
	{
		key: "signedin",
		label: "SIGNED IN",
		ask: "the session is written",
		group: "composition"
	},
	{
		key: "expired",
		label: "EXPIRED",
		ask: "the link closed",
		group: "composition"
	},
	{
		key: "denied",
		label: "DENIED",
		ask: "the reader may not see it",
		group: "composition"
	},
	{
		key: "failedsubmit",
		label: "FAILED SUBMIT",
		ask: "the send did not land",
		group: "composition"
	},
	{
		key: "missingclause",
		label: "MISSING CLAUSE",
		ask: "the index names it, the text does not",
		group: "composition"
	},
	{
		key: "withaction",
		label: "WITH ACTION",
		ask: "one thing to click",
		group: "context"
	},
	{
		key: "print",
		label: "ON PAPER",
		ask: "the printed sheet",
		group: "context"
	}
];
/** A cell the family renders. `note` says how, where that is not obvious. */
var Built = (note) => note === void 0 ? { disposition: "built" } : {
	disposition: "built",
	note
};
/** A cell that cannot exist, with the reason. A reason is a fact, not an apology. */
var NotApplicable = (reason) => ({
	disposition: "na",
	reason
});
/** The reason a printed block is never a control. */
var NotAControl = (what) => NotApplicable(`A ${what} is not a control: it renders props, ships no script and holds no input, so there is no control state for \`disabled\` to be the absence of.`);
/** The reason a printed block is read-only by construction. */
var ReadOnly = (what) => NotApplicable(`A ${what} is read-only by construction - it is markup and CSS with nothing to edit - so \`read-only\` names no arm this block could have.`);
/** The reason a leaf is one thing and cannot be a set. */
var NotASet = (what, set) => NotApplicable(`A ${what} is one object by definition; a set is ${set}, and a block that answered both would be two blocks with one name.`);
/** The reason a build-time block has no loading state. */
var BuildTime = (what, why) => NotApplicable(`A ${what} is read at build time: ${why} so there is no state in which the block exists and its content has not arrived.`);
/** The reason a printed register carries no as-of of its own. */
var NoAsOf = (what, whose) => NotApplicable(`A ${what} carries no as-of of its own: an age belongs to ${whose}, and a block that invented one would be the one figure on the page with no source.`);
/** The reason a page-shaped thing cannot live inside a card. */
var NotACard = (what, inside) => NotApplicable(`A ${what} is a page's ${inside}: inside a card it would be a page inside a record, and a card inside a card is the one composition the identity forbids.`);
/** The reason a block has no tight step. */
var NoDense = (what, why) => NotApplicable(`A ${what} has no tight step: ${why}.`);
/**
* The reason a public surface has no session state.
*
* The legal set, the glossary and the status board are read by anyone; the five
* session compositions name no arm they could have. The sentence is written once
* because it is the same fact about each of them, and each call says WHICH
* surface it is about - a reason is a fact about that component, not a rule
* about the family.
*/
var Public = (what) => NotApplicable(`${what} is public: it renders the same for a reader with no session and one with a session, so the five session compositions name no arm it could have.`);
/**
* The sixteen components, in the order a reader meets them: the credential
* frame and its report, the account directory, the three parts of the legal
* set's clause apparatus, the five parts of a contact route (the shell, the
* page, the opening, the workspace and the absorbed trail), and the five
* reference blocks that carry the site's own vocabulary.
*
* Every row's overrides are reasons. A row with no overrides would be a part
* that survives every combination, and no part does.
*/
var Rows = [
	{
		name: "AUTHSHELL",
		file: "COMPONENT/AUTH/AUTHSHELL.ASTRO",
		note: "The one frame every account, OAuth and verify route renders: `/KICKER`, the page's single `h1`, one supporting sentence, the state register, the route's own card, and one alternate action.",
		cells: {
			stale: NoAsOf("auth frame", "the route's declarations (`BUILT:`)"),
			disabled: NotAControl("auth frame"),
			readonly: ReadOnly("frame"),
			dense: NoDense("auth shell", "the opening distance is the chapter token and the card's inset belongs to the interior, so a tighter shell is a smaller chapter rather than a state"),
			one: NotASet("auth shell", "one route's frame"),
			many: NotASet("auth shell", "one route's frame"),
			incard: NotACard("auth shell", "container, not a record's surface"),
			empty: Built("a frameless route: the register prints on its own and the card holds the interior - the state no longer disappears with the heading (see `AUTHSHELL / SIGNED OUT`)"),
			partial: Built("`Frame.sentence` and `Frame.action` are optional: the password routes print the sentence in the card instead, and the OAuth route has no alternate action"),
			error: Built("`States` prints `INTERRUPTED` through `SurfaceStatusLine` and the interior prints the report"),
			long: Built("the heading balances at the L tier and the card fills the 28rem measure; a longer heading wraps rather than widening it"),
			narrow: Built("the measure's padding is the only fixed value; the card, the register and the alternate link re-flow inside a 16rem column"),
			wide: Built("`Measure=\"wide\"` is the account index's 64rem"),
			signedout: Built("the resting credential route: the frame above the form, the alternate action under it"),
			signingin: Built("`Align=\"center\"` places the short loading interior in the viewport it is the only thing in; the frame and the action are unchanged"),
			signedin: Built("the frame above a `VERIFIED` or `ACTIVE` report"),
			expired: Built("`STATUS: INTERRUPTED` above a card that says the link closed and offers the retry"),
			denied: Built("`STATUS: UNAVAILABLE` above a card that says what the surface is - the frame never refuses silently"),
			failedsubmit: NotApplicable("A submit failure is a state of the route's interior, and the shell prints it through `States` - the composition exists, under the name `ERROR`, and a second cell for it would be two names for one arm."),
			missingclause: NotApplicable("A missing clause is a legal document's composition: the credential shell frames a form, and a clause is not a form's subject."),
			withaction: Built("`Frame.action` is the one alternate destination"),
			print: Built("the frame, the register and the card print; the card's frame is a hairline, not a shadow")
		}
	},
	{
		name: "AUTHREPORT",
		file: "COMPONENT/AUTH/REPORT.TSX",
		note: "One state inside the auth card: the state's coded label, its title, one sentence, the facts the state is made of, and the one action the reader can take now.",
		cells: {
			empty: NotApplicable("A report is a statement about a state: `Title` and `Sentence` are required, so a report with nothing to say is unrepresentable - the empty state of this surface is the form, not the report."),
			disabled: NotAControl("report"),
			readonly: ReadOnly("report"),
			dense: NoDense("report", "its rhythm is the card's (`p-6`, `space-y-1.5`), and a denser report is a smaller card"),
			one: NotASet("report", "one state"),
			many: NotASet("report", "one state"),
			incard: Built("it is the card's interior; on a bare surface it keeps its own `p-6` inset"),
			loading: Built("`Glyph=\"loading\"` draws the busy arm - two bars in the record grammar - instead of a spinner"),
			partial: Built("no glyph prints no tile, and no facts print no rows: the sentence and the action still stand"),
			error: Built("`Glyph=\"alert\"` with `Role=\"alert\"`, and `Facts` carries `CAUSE:` and `RETRY:` in the record grammar"),
			stale: Built("`Facts` is where an as-of and a window print: `WINDOW:` and `AS OF:` are rows, and the age is the sentence's"),
			long: Built("the sentence wraps at the card's measure and a fact's value breaks anywhere, so a deep route or a long cause does not widen the card"),
			narrow: Built("the card's inset is the only fixed value"),
			wide: Built("the sentence keeps the card's measure; `text-wrap: pretty` holds the last line"),
			signedout: NotApplicable("A report is printed after an attempt. The signed-out state is the form's, and the report that follows it says `INTERRUPTED` or `VERIFIED` - it cannot say 'nobody tried'."),
			signingin: Built("`STATUS: LOADING` with the busy arm"),
			signedin: Built("`STATUS: VERIFIED` or `ACTIVE` with the check glyph"),
			expired: Built("`STATUS: INTERRUPTED` with `WINDOW:` and `RETRY:` facts - the link's age and the way back"),
			denied: Built("`STATUS: UNAVAILABLE` with the sentence that says what the surface is"),
			failedsubmit: Built("`STATUS: INTERRUPTED` with `CAUSE:` and `NEXT:` facts - the state a form reports when its send did not land"),
			missingclause: NotApplicable("A missing clause is a legal document's composition; the report states an outcome of a credential attempt."),
			withaction: Built("`Action` prints the one link-shaped action; `children` remains the form-shaped arm that carries handlers"),
			print: Built("the badge, the title, the sentence and the facts print")
		}
	},
	{
		name: "PRIVACYREQUESTS",
		file: "COMPONENT/DASHBOARD/PRIVACYREQUESTS.ASTRO",
		note: "The dashboard's data-rights directory: the six statutory rights, the five support channels, and the one erasure entry - three counted sets, each opening the form that files it.",
		cells: {
			loading: BuildTime("privacy directory", "the rights, the channels and the addresses are the contact registry's, read in the same pass as the page"),
			error: NotApplicable("A failed read is the empty arm: the grid prints its own sentence and `STATUS: UNAVAILABLE`, and a printed page has no retry - the retry is a rebuild."),
			stale: NoAsOf("directory", "the registry entry it reads"),
			disabled: NotAControl("directory"),
			readonly: ReadOnly("directory"),
			dense: NoDense("directory", "its density is its grid - three across at the band's width, one below it - and a tighter step is a narrower card"),
			incard: NotACard("directory", "band's body, not a record's surface"),
			empty: Built("each grid prints its own composed sentence from `Data.ts` under the same heading, and the register still prints its counted zero"),
			partial: Built("one grid empty and one full: the empty one states its cause and the other is unchanged - the blocks are independent"),
			one: Built("a grid of one card, at the grid's floor"),
			many: Built("six rights and five channels, three and four across"),
			long: Built("the card body takes the slack and wraps; the code and the article stay at the card's right edge"),
			narrow: Built("one card per row below the grid's floor"),
			wide: Built("three across for the rights, four for the channels"),
			signedout: Built("`state=\"denied\"` is the signed-out composition: what the directory is, why it is not listed, and the way in"),
			signingin: NotApplicable("The directory is read after the session exists. While the session is being established the dashboard's own gate prints the loading state, and a rights grid behind a spinner would be a list the reader cannot act on."),
			signedin: Built("the resting directory, under the session that owns it"),
			expired: Built("the denied arm with the expired sentence: the session is gone and the directory says which session it reads with"),
			denied: Built("`state=\"denied\"` prints `SurfaceAbsent`: `STATUS: UNAVAILABLE`, what would be here, why it is not, the way in and the retry"),
			failedsubmit: NotApplicable("Every card is a destination; the submit happens on the form the card opens, and that form owns its own failure. A failed submit in the grid would be a form inside a list."),
			missingclause: NotApplicable("A missing clause is a legal document's composition; the directory files requests, not clauses."),
			withaction: Built("every card is one anchor, and the erasure card is one more"),
			print: Built("the grids, the chips and the register print; the hover ink is the browser's")
		}
	},
	{
		name: "TRUSTCLAUSE",
		file: "COMPONENT/TRUST/TRUSTCLAUSE.ASTRO",
		note: "One clause of a legal document: `§07` as the anchor, the clause's name as the heading's words, and - when the document's index names a clause the text does not carry - the tombstone that keeps the number resolvable.",
		cells: {
			empty: NotApplicable("A clause is its name: the slot is the heading's words, and a clause with none is a number the index prints - the `MISSING CLAUSE` column is that arm."),
			loading: NotApplicable("A clause is printed with the document it belongs to: there is no state in which the heading exists and its number has not arrived."),
			stale: NoAsOf("clause", "the document's `EFFECTIVE:` row"),
			disabled: NotAControl("clause heading"),
			readonly: ReadOnly("clause"),
			dense: NoDense("clause", "a heading has no tight step"),
			one: NotASet("clause", "one clause"),
			many: NotASet("clause", "one clause"),
			incard: Built("the legal set prints its clauses inside the white card the document's body wears"),
			error: Built("a failed read is the `missing` arm: the number, the anchor and the name stay, and `STATUS: UNAVAILABLE` says the text is not here"),
			partial: Built("`state=\"missing\"` with the caller's sentence - a clause whose text is absent is the partial state this block was built for"),
			long: Built("the name balances at the clause role and wraps under its own number; the citation link is `fit-content`, so a long number does not stretch the heading"),
			narrow: Built("the number stacks above the name at any width"),
			wide: Built("the heading keeps the document's measure"),
			signedout: Public("A clause"),
			signingin: Public("A clause"),
			signedin: Public("A clause"),
			expired: Public("A clause"),
			denied: NotApplicable("The legal set is public: there is no reader this clause refuses, and a clause that pretended to hide would be a lie about a document everyone may read."),
			failedsubmit: NotApplicable("A clause has no submit: the document is read, not filled in."),
			missingclause: Built("`state=\"missing\"` prints the number, the anchor, the name and the tombstone - a citation to §NN lands on the statement rather than on the next clause"),
			withaction: Built("the number is a self-link, so the clause can be cited and copied; the accessible name now prints the number as the document wrote it"),
			print: Built("the number prints as a citation, unlinked and un-underlined, on the printed sheet")
		}
	},
	{
		name: "TRUSTCONTENTS",
		file: "COMPONENT/TRUST/TRUSTCONTENTS.ASTRO",
		note: "The clause rail: the document's own index beside the text, in two registers - the sticky rail at >= 1024px and the CSS-only disclosure below it - with the count and the reader's position.",
		cells: {
			loading: BuildTime("clause rail", "its rows are the document's index, composed in the same pass as the text"),
			error: NotApplicable("A rail cannot fail on its own: its rows are the document's index, and a document whose index failed has no rail to print - the reading surface's empty arm is that composition."),
			stale: NoAsOf("rail", "the document's `EFFECTIVE:` row"),
			disabled: NotAControl("clause rail"),
			readonly: ReadOnly("rail"),
			dense: NoDense("rail", "the rail is bounded and scrolls itself, so a tighter row would be a row in the document it indexes"),
			incard: NotACard("rail", "navigation, not a record's surface"),
			empty: Built("`empty` prints the composed sentence in both registers and the count prints `0` - a counted zero, never a blank"),
			partial: Built("a clause the index filed without a number prints `UNAVAILABLE` in the number's cell rather than a bare `§`"),
			one: Built("a rail of one row, with the count and the position cell"),
			many: Built("a 26-clause rail scrolls in its own register with the marked row kept inside it"),
			long: Built("the name wraps under its `§NN` marker; the marker column is its own track"),
			narrow: Built("below 1024 the rail is not painted and the disclosure is the only register"),
			wide: Built("the rail is a 26ch column in the page margin"),
			signedout: Public("The clause rail"),
			signingin: Public("The clause rail"),
			signedin: Public("The clause rail"),
			expired: Public("The clause rail"),
			denied: NotApplicable("The legal set is public: a rail that withheld its own document's index would be navigation that hides the page it belongs to."),
			failedsubmit: NotApplicable("The rail has no submit: it is a jump list over a printed document."),
			missingclause: Built("the row stays and points at the clause's tombstone: a missing clause keeps its place in the index"),
			withaction: Built("every row is a jump link to an id the document wrote"),
			print: NotApplicable("The rail is navigation, and the printed document carries its clauses' own numbers - `Trust/_Contents.scss` hides both registers on paper.")
		}
	},
	{
		name: "TRUSTCONTENTSLIST",
		file: "COMPONENT/TRUST/TRUSTCONTENTSLIST.ASTRO",
		note: "The clause list itself: one row per clause, `§NN  name`, rendered by both registers from the same data.",
		cells: {
			loading: BuildTime("clause list", "the rows are the document's index and the ids are the clauses' own, written in the same pass"),
			error: NotApplicable("A list of anchors has no failure arm: a target that moved is a broken anchor the page prints, not a state the list can invent."),
			stale: NoAsOf("clause list", "the document's `EFFECTIVE:` row"),
			disabled: NotAControl("clause list"),
			readonly: ReadOnly("list"),
			dense: NoDense("clause list", "the two registers' rows are set by the rail's and the disclosure's own rhythm"),
			empty: Built("no row and a caller's sentence prints the sentence; no row and none renders the empty `<ol>` the register above accounts for"),
			partial: Built("a number the document did not write prints `UNAVAILABLE`, and a name it did not write prints the same word - neither cell is ever empty"),
			one: Built("one row"),
			many: Built("26 rows, numbered by the document, not by the list"),
			long: Built("the name wraps under its marker, never under the marker's column"),
			narrow: Built("the row is a two-track grid at any width"),
			wide: Built("the row keeps the marker's column whatever the band's width"),
			incard: NotACard("clause list", "navigation, not a record's surface"),
			signedout: Public("The clause list"),
			signingin: Public("The clause list"),
			signedin: Public("The clause list"),
			expired: Public("The clause list"),
			denied: NotApplicable("The legal set is public: a list that hid its document's clauses would be navigation over a document everyone may read."),
			failedsubmit: NotApplicable("The list has no submit."),
			missingclause: Built("the missing clause keeps its row and its number, so the list and the tombstone agree about where §NN is"),
			withaction: Built("every row is an anchor"),
			print: NotApplicable("The list prints only inside a register, and both registers are hidden on paper - the clauses carry their own numbers.")
		}
	},
	{
		name: "CONTACTSHELL",
		file: "COMPONENT/CONTACT/CONTACTSHELL.ASTRO",
		note: "The route shell: the trail, the route's metadata and the document chrome, composed around the opening and the workspace - the one place the fifteen request routes agree about what a route is.",
		cells: {
			loading: BuildTime("route shell", "the trail, the metadata and the document chrome are composed at build time around the route's blocks"),
			error: Built("`state=\"interrupted\"` is passed to the workspace, so the route's condition is stated inside the composition the shell frames"),
			stale: NoAsOf("route shell", "the route's record head"),
			disabled: NotAControl("route shell"),
			readonly: ReadOnly("route shell"),
			dense: NoDense("route shell", "its rhythm is the opening's and the workspace's"),
			one: NotASet("route shell", "one route"),
			many: NotASet("route shell", "one route"),
			incard: NotACard("route shell", "document, not a record's surface"),
			empty: NotApplicable("The shell has no empty arm of its own: it composes an opening and a workspace, and a workspace with no instrument is the workspace's `empty` cell - a second arm here would be two names for one state."),
			partial: Built("a route with no statutory basis prints no `〈 〉` in its record head and `BASIS: UNAVAILABLE` in its workspace"),
			long: Built("the trail wraps and the title keeps the document's measure"),
			narrow: Built("the opening and the workspace re-compose below 1024px in reading order"),
			wide: Built("the route keeps the page's 64rem measure"),
			signedout: Built("the route is public: the shell prints for any reader"),
			signingin: NotApplicable("The shell has no session state: the session, when one is needed, belongs to the form inside the workspace."),
			signedin: Built("the same route, unchanged by the session"),
			expired: Built("the expired session is the workspace's `interrupted` state, framed by the shell"),
			denied: NotApplicable("A request route is public by design: the desk answers anyone, so the shell has no denied arm."),
			failedsubmit: Built("`state=\"interrupted\"` reaches the workspace through the shell"),
			missingclause: NotApplicable("A missing clause is a legal document's composition; the shell frames a request."),
			withaction: Built("the workspace is the action, and the trail's crumbs are the way back"),
			print: Built("the trail, the record head and both columns print")
		}
	},
	{
		name: "CONTACTWORKSPACE",
		file: "COMPONENT/CONTACT/CONTACTWORKSPACE.ASTRO",
		note: "One request route, composed as a record beside its form: the route's facts, its process, its margin note and its folded aside in the left column, the instrument in the right, divided by the site's 1px divider.",
		cells: {
			loading: NotApplicable("The shell is server-rendered and the form is the island: the loading arm belongs to the form's own states, and a status line above it would print the same fact twice."),
			stale: NoAsOf("request workspace", "the route's record"),
			disabled: NotAControl("request workspace"),
			readonly: ReadOnly("workspace"),
			dense: NoDense("workspace", "the 4/1px/8 split is the composition, and density inside it belongs to the form and the record column"),
			one: NotASet("request workspace", "one route's workspace"),
			many: NotASet("request workspace", "one route's workspace"),
			incard: NotACard("workspace", "container, not a record's surface"),
			empty: Built("the `form` slot mounted empty: the record column prints and the instrument's column is stated as absent by the caller - the seam is what makes the state printable"),
			partial: Built("`BASIS:` prints `UNAVAILABLE` for a route with no statutory basis; the row stays and the value says so"),
			error: Built("`state=\"interrupted\"` prints `STATUS: INTERRUPTED` and the route's declarations above the record"),
			long: Built("the record ledger's values wrap and the margin note caps at the measure; the form column takes the slack"),
			narrow: Built("below 1024 the form comes first and the record follows under the divider, in reading order"),
			wide: Built("the 4/1px/8 split on the page's measure"),
			signedout: Built("the record column prints for any reader; the form asks for a session when its send needs one"),
			signingin: NotApplicable("The route is read, not signed in: the form asks for a session when it needs one, and the workspace has no state between 'the record is printed' and 'the form is ready'."),
			signedin: Built("the resting route, with the session the form carries"),
			expired: Built("`state=\"interrupted\"` states the record's condition; the form states what the expired session needs next"),
			denied: NotApplicable("A request route is public by design - the desk answers anyone, including a reader with no account - so there is no reader this workspace refuses."),
			failedsubmit: Built("`state=\"interrupted\"`: the record column states the failed send, with the route, the mailbox and the window it still owes"),
			missingclause: NotApplicable("A missing clause is a legal document's composition; a request route files a request."),
			withaction: Built("the form is the action, and the `form` slot lets a caller mount a different instrument without a wrapper"),
			print: Built("both columns print; the pinned plate stands still and the gutter keeps its rule")
		}
	},
	{
		name: "CONTACTPAGE",
		file: "COMPONENT/CONTACT/CONTACTPAGE.ASTRO",
		note: "The document chrome every Contact route shares: the site header, the opening, and the route's body - and the empty arm a route whose form never mounted now has.",
		cells: {
			loading: BuildTime("page chrome", "the layout is composed at build time around the route's opening"),
			disabled: NotAControl("page chrome"),
			readonly: ReadOnly("page chrome"),
			dense: NoDense("page chrome", "a page's rhythm is its opening distance and its body's"),
			one: NotASet("page", "one route"),
			many: NotASet("page", "one route"),
			incard: NotACard("page chrome", "document, not a record's surface"),
			empty: Built("`state=\"empty\"` prints the absence under the record head: the route says what it is even when its instrument is not there"),
			partial: Built("an opening with a record and no heading, or a heading and no record: each part is its own condition"),
			error: Built("the empty arm is the failed-read arm, with the page's sentence"),
			stale: NoAsOf("page chrome", "the route's record head"),
			long: Built("the record line wraps between its cells and the heading balances at the section tier"),
			narrow: Built("one column below the grid's floor; the record cells wrap between themselves"),
			wide: Built("the opening and the body repeat the same measure"),
			signedout: Public("A Contact page"),
			signingin: Public("A Contact page"),
			signedin: Public("A Contact page"),
			expired: Public("A Contact page"),
			denied: NotApplicable("A request route is public by design: the desk answers anyone, so the page has no denied arm to print."),
			failedsubmit: Built("`state=\"empty\"` with the page's sentence: the route whose form never booted is a body that is absent, and it is stated"),
			missingclause: NotApplicable("A missing clause is a legal document's composition; a Contact page files a request."),
			withaction: NotApplicable("The page prints no action of its own: the trail's crumbs are the only links in the chrome, and the route's instrument owns its actions."),
			print: Built("the chrome prints; the header's island is the browser's")
		}
	},
	{
		name: "CONTACTHEAD",
		file: "COMPONENT/CONTACT/CONTACTHEAD.ASTRO",
		note: "The opening every Contact route shares: the trail, the route's record head - `# CODE  〈BASIS〉  /CONTACT  SLA: 30d` - and the page's heading when it has one.",
		cells: {
			loading: NotApplicable("The opening is printed with the page: there is no state in which the trail exists and the record has not arrived."),
			stale: NoAsOf("record head", "the route's registry entry"),
			disabled: NotAControl("record head"),
			readonly: ReadOnly("record head"),
			dense: NoDense("opening", "its rhythm is the page's opening distance"),
			one: NotASet("opening", "one route's record"),
			many: NotASet("opening", "one route's record"),
			incard: NotACard("opening", "page opening, not a record's surface"),
			empty: Built("`state=\"empty\"` prints `◎`, the sentence and `STATUS: UNAVAILABLE` under the record head"),
			partial: Built("no statutory basis prints no `〈 〉` bracket and no window prints no `SLA:` cell - an absent cell prints nothing rather than an empty bracket"),
			error: Built("the empty arm is the failed-read arm"),
			long: Built("a long code, a long basis and a long route wrap between cells at the U+2001 separators; the article keeps its own case"),
			narrow: Built("the record line wraps to two rows; the heading balances"),
			wide: Built("the opening keeps the page's 64rem measure"),
			signedout: Built("the record head is the route's, not the visit's: it prints for any reader"),
			signingin: NotApplicable("The opening has no signing-in state: the exchange happens in the route's instrument, below it."),
			signedin: Built("the same record, unchanged by the session"),
			expired: Built("the record prints; the expired session is the instrument's state, not the opening's"),
			denied: NotApplicable("A request route is public by design: the desk answers anyone, so the opening has no denied arm."),
			failedsubmit: Built("the empty arm states the body's absence after a form that never mounted; a failed send below it is the instrument's own report"),
			missingclause: NotApplicable("A missing clause is a legal document's composition; the opening files a request."),
			withaction: Built("the trail's crumbs are the opening's links, and the last crumb is the page"),
			print: Built("the trail, the record and the heading print")
		}
	},
	{
		name: "CONTACTBREADCRUMB",
		file: "COMPONENT/CONTACT/CONTACTBREADCRUMB.ASTRO",
		note: "The absorbed trail, kept as the bridge the Blog still imports: it writes each label into the `/LABEL` grammar and renders the site's one trail.",
		cells: {
			loading: NotApplicable("A trail is written with the page: there is no state in which the crumbs exist and their labels have not arrived."),
			error: NotApplicable("A breadcrumb has no failure arm: a crumb whose target moved is a broken link the page prints, not a state the bridge can invent."),
			stale: NoAsOf("trail", "the page it is printed on"),
			disabled: NotAControl("trail"),
			readonly: ReadOnly("trail"),
			dense: NoDense("trail", "one row of crumbs at the meta step"),
			incard: NotACard("trail", "route statement, not a record's surface"),
			empty: Built("an empty trail renders the trail's own empty `<ol>`; a page with no crumbs does not mount the bridge, and `Trail`'s empty arm is recorded as an observation"),
			partial: Built("a crumb with no `href` prints as the current page, so the last crumb is never a link to itself"),
			one: Built("one crumb: the page itself, as text"),
			many: Built("three crumbs: two links and the page"),
			long: Built("a long label wraps inside its own crumb; the row wraps between crumbs, never inside the grammar"),
			narrow: Built("the row wraps at the page's measure"),
			wide: Built("the row is one line at the page's measure"),
			signedout: Public("A trail"),
			signingin: Public("A trail"),
			signedin: Public("A trail"),
			expired: Public("A trail"),
			denied: NotApplicable("A trail states where the reader is; it cannot be a surface a reader may not see."),
			failedsubmit: NotApplicable("A trail has no submit."),
			missingclause: NotApplicable("A trail names routes, not clauses."),
			withaction: Built("every crumb but the last is a link"),
			print: Built("the crumbs print; the underline is the print stylesheet's")
		}
	},
	{
		name: "STATUSBOARD",
		file: "COMPONENT/MORE/STATUSBOARD.ASTRO",
		note: "A set of records partitioned by the state each one states: four shelves, each with its register head, its count, its note and its rows - and the empty column kept as a fact.",
		cells: {
			loading: BuildTime("status board", "its columns and rows are the record registry's, read in the same pass as the page"),
			error: NotApplicable("A board has no failure arm: a set that could not be read is a board with no column, and the composed empty arm states it."),
			stale: NoAsOf("status board", "each record's own page"),
			disabled: NotAControl("status board"),
			readonly: ReadOnly("board"),
			dense: NoDense("board", "a board compresses by counting, not by shrinking - the count is in the head, so a reader who wants the number does not read the rows"),
			incard: NotACard("status board", "band's artifact, not a record's surface"),
			empty: Built("no columns and a caller's sentence prints the sentence; no columns and none now renders nothing at all, which is what the block always documented"),
			partial: Built("a column with no row prints its own composed sentence and keeps its head, its count and its rule"),
			one: Built("a board of one column is one shelf at the band's measure"),
			many: Built("four columns, one of them holding sixteen rows"),
			long: Built("a row's name and meta wrap inside the row; the state word stays at the row's right end"),
			narrow: Built("the shelves stack in reading order and keep their heads and counts"),
			wide: Built("four shelves on the band's measure, each sized by its own content"),
			signedout: Public("A status board"),
			signingin: Public("A status board"),
			signedin: Public("A status board"),
			expired: Public("A status board"),
			denied: NotApplicable("The board states what is live for anyone who reads it; a column the reader may not see would make the site's own state unreadable."),
			failedsubmit: NotApplicable("A board has no submit: it is a printed register."),
			missingclause: NotApplicable("A missing clause is a legal document's composition; the board files records."),
			withaction: Built("a row with an `href` is a link; a row without one is a statement in the same grammar"),
			print: Built("the shelves, the rules and the counts print")
		}
	},
	{
		name: "LEXICON",
		file: "COMPONENT/MORE/LEXICON.ASTRO",
		note: "One run of the glossary: its marker, its heading, its count, its note, the letters it actually uses as links, and the words filed under each letter.",
		cells: {
			loading: BuildTime("lexicon run", "its terms are the glossary's own data, composed in the same pass as the page"),
			error: NotApplicable("A run has no failure arm: a glossary whose data could not be read is a build that does not run."),
			stale: NoAsOf("lexicon run", "each entry's `SOURCE:` row"),
			disabled: NotAControl("lexicon run"),
			readonly: ReadOnly("run"),
			dense: NoDense("run", "the density of a glossary is the number of words, and that is the content's business"),
			incard: NotACard("lexicon run", "page's body, not a record's surface"),
			empty: Built("a run with no term prints its own composed sentence and keeps its head, its marker and its note"),
			partial: Built("a term with no source prints `SOURCE: UNAVAILABLE` in the quiet ink, so a paraphrase is distinguishable from a citation"),
			one: Built("a run of one word prints one entry and no letter strip - a one-link navigation is a nav that says what the count already says"),
			many: Built("a run of ninety prints ninety entries under as many letters as it uses"),
			long: Built("the term column is 16rem and the definition takes the rest; a definition longer than three sentences is the data's defect, not the layout's"),
			narrow: Built("the term moves above its definition and keeps its rule"),
			wide: Built("the term sits in the margin of its own definition"),
			signedout: Public("A lexicon run"),
			signingin: Public("A lexicon run"),
			signedin: Public("A lexicon run"),
			expired: Public("A lexicon run"),
			denied: NotApplicable("A glossary is public: every word the document uses is a word any reader may look up."),
			failedsubmit: NotApplicable("A run has no submit."),
			missingclause: NotApplicable("A missing clause is a legal document's composition; a run files words."),
			withaction: Built("the letter strip and every `WHERE:` row are links"),
			print: Built("the letters, the terms and the definitions print")
		}
	},
	{
		name: "LEXICONENTRY",
		file: "COMPONENT/MORE/LEXICONENTRY.ASTRO",
		note: "One word, defined: the term in the margin, the sense on the measure, the extra facts it carries, and the record, route and source under it.",
		cells: {
			empty: NotApplicable("A definition is required: an entry with no sense is a word in a list, which is what the run's letter groups already are."),
			loading: NotApplicable("An entry is printed with the run: there is no state in which the word exists and its definition has not arrived."),
			error: NotApplicable("An entry has no failure arm: a definition the tree does not carry is a `SOURCE: UNAVAILABLE` row, which is the partial state."),
			stale: NoAsOf("entry", "the file its `SOURCE:` row names"),
			disabled: NotAControl("entry"),
			readonly: ReadOnly("entry"),
			dense: NoDense("entry", "a definition that is compressed is a definition that has stopped saying what the word means"),
			one: NotASet("entry", "one word"),
			many: NotASet("entry", "one word"),
			incard: Built("a leaf inside a card is allowed: the card is a surface and the entry is its content"),
			partial: Built("no source prints `SOURCE: UNAVAILABLE` in the quiet ink; no expansion prints no line; no rows print no ledger"),
			long: Built("the definition wraps at the measure, the rows' values break anywhere, and the fact strip wraps between facts"),
			narrow: Built("the term goes above its definition and keeps its rule"),
			wide: Built("the term column is 16rem; the definition takes the rest"),
			signedout: Public("A lexicon entry"),
			signingin: Public("A lexicon entry"),
			signedin: Public("A lexicon entry"),
			expired: Public("A lexicon entry"),
			denied: NotApplicable("A glossary is public: a word's definition is not a thing to withhold."),
			failedsubmit: NotApplicable("An entry has no submit."),
			missingclause: NotApplicable("An entry defines a word, not a clause."),
			withaction: Built("`WHERE:` is the one link an entry prints, and it is a route to the thing itself"),
			print: Built("the term, the definition and the facts print")
		}
	},
	{
		name: "QUIETHEAD",
		file: "COMPONENT/MORE/QUIETHEAD.ASTRO",
		note: "The opening of a reference document: a marker, a bare `h1`, one proposition, and the extent as a white facts strip - and, now, the strip's composed empty arm.",
		cells: {
			loading: NotApplicable("A head is printed with the page: there is no state in which the title exists and its facts have not arrived."),
			error: NotApplicable("A head has no failure arm: a strip that could not be read is the empty arm with its sentence."),
			disabled: NotAControl("reference head"),
			readonly: ReadOnly("head"),
			dense: NoDense("head", "one marker, one title, one proposition and one strip"),
			one: NotASet("head", "one document's opening"),
			many: NotASet("head", "one document's opening"),
			incard: NotACard("reference head", "page opening, not a record's surface"),
			empty: Built("no row prints the ledger's composed empty arm: `◎` and the caller's sentence instead of an empty frame, under the same head"),
			partial: Built("a row whose value is unknown prints `UNAVAILABLE`; the row stays, the value says so"),
			stale: Built("the strip's date row is where an age is printed: an old date is the row's value, and the head does not invent a second figure"),
			long: Built("the title balances at the L tier and the proposition caps at the measure; a long fact value wraps inside its row"),
			narrow: Built("the strip folds to one column below 1024"),
			wide: Built("the strip is two columns at 1024 and up"),
			signedout: Public("A reference head"),
			signingin: Public("A reference head"),
			signedin: Public("A reference head"),
			expired: Public("A reference head"),
			denied: NotApplicable("A reference document is public: its opening states what is inside for any reader."),
			failedsubmit: NotApplicable("A head has no submit."),
			missingclause: NotApplicable("A head opens a reference document, not a clause."),
			withaction: NotApplicable("The head prints no action: its proposition is a sentence and its strip is facts. A control inside a nameplate would be a control inside a nameplate."),
			print: Built("the marker, the title, the proposition and the strip print")
		}
	},
	{
		name: "ONWARD",
		file: "COMPONENT/MORE/ONWARD.ASTRO",
		note: "The routing register: the intent the reader arrived with, and the destination that answers it - with the reader's own row stated rather than linked.",
		cells: {
			loading: BuildTime("routing register", "its rows are the page's own copy, composed at build time"),
			error: NotApplicable("A register has no failure arm: a destination that is gone is a tombstone the page prints, and a register that invented an error state would be inventing a fact about a link."),
			stale: NoAsOf("routing register", "the page's folio"),
			disabled: NotAControl("routing register"),
			readonly: ReadOnly("register"),
			dense: NoDense("register", "one row per intent, at the reading step"),
			incard: Built("a leaf inside a card is allowed: the card is a surface and the register is its content"),
			empty: Built("no row prints the copy's required `empty` sentence"),
			partial: Built("a row with no note prints the row and no note; a row whose destination is the current page prints as a statement"),
			one: Built("one intent, one destination"),
			many: Built("six intents wrap at the band's measure"),
			long: Built("the intent takes the slack and wraps; the destination stays at the row's right end"),
			narrow: Built("the destination goes under the intent and keeps its arrow"),
			wide: Built("the intent column is the measure's own and the destination sits at the row's end"),
			signedout: Public("A routing register"),
			signingin: Public("A routing register"),
			signedin: Public("A routing register"),
			expired: Public("A routing register"),
			denied: NotApplicable("A register is a way out: withholding a destination would be withholding the exit."),
			failedsubmit: NotApplicable("A register has no submit."),
			missingclause: NotApplicable("A register files intents, not clauses."),
			withaction: Built("every row is a link except the reader's own, which is a statement carrying `aria-current=\"page\"`"),
			print: Built("the register prints; the hover fill is the browser's")
		}
	}
];
/** The cell at a row and a column: the row's override, or the built default. */
var MatrixCell = (Row, Column) => Row.cells[Column.key] ?? { disposition: "built" };
/** Every cell, in row order then column order - the matrix as a flat list. */
var MatrixCells = () => Rows.flatMap((row) => Columns.map((column) => ({
	row,
	column,
	cell: MatrixCell(row, column)
})));
/** How many cells the matrix holds. */
var CellCount = Rows.length * Columns.length;
/** How many cells the family builds. */
var BuiltCount = MatrixCells().filter(({ cell }) => cell.disposition === "built").length;
/** How many cells cannot exist, and therefore carry a reason. */
var ReasonCount = CellCount - BuiltCount;
/** How many cells one row builds. */
var BuiltOf = (Row) => Columns.filter((Column) => MatrixCell(Row, Column).disposition === "built").length;
/** How many cells one column builds. */
var BuiltIn = (Column) => Rows.filter((Row) => MatrixCell(Row, Column).disposition === "built").length;
/** The matrix's own register rows, derived from the tables above. */
var MatrixRegister = () => [
	{
		key: "COMPONENTS:",
		value: String(Rows.length)
	},
	{
		key: "CONDITIONS:",
		value: String(Columns.length)
	},
	{
		key: "CELLS:",
		value: String(CellCount)
	},
	{
		key: "BUILT:",
		value: String(BuiltCount)
	},
	{
		key: "NOT APPLICABLE:",
		value: String(ReasonCount)
	},
	{
		key: "SPECIMENS:",
		value: String(Specimens.length)
	},
	{
		key: "SOURCE:",
		value: "CONTENT/SPECIMEN/SMALL.TS",
		note: "every figure above is counted from the three tables in this file"
	}
];
/**
* The behaviours that only became obvious once the matrix existed.
*
* This section is the deliverable the brief asks for by name - "the improvements
* that came out of the exploration" - and each entry names the cell that revealed
* it. An improvement with no cell behind it would be a preference.
*/
var Improvements = [
	{
		component: "AUTHSHELL",
		from: "SIGNED OUT / EMPTY",
		found: "The state register was nested inside `{Frame && …}`. A route that stated a state and opened with no frame - a bare callback landing, a route whose heading lives in its card - handed in `States` and `Declarations` and the shell printed neither. The one block that makes four app surfaces one instrument was the one block that could lose its state to a heading.",
		built: "`SurfaceStatusLine` renders outside the frame's condition, after the header and before the card. A framed route prints exactly what it printed before - header, then register, then card - and a frameless one prints the register instead of nothing."
	},
	{
		component: "AUTHSHELL",
		from: "SIGNING IN",
		found: "A short interior - a loading arm, a signed-in ending, an expired link - sat at the top of a `100vh` column with half a screen of paper below it, because `Center` centred the card's text and nothing centred the card. The page a reader reaches when they are locked out was the page that looked unfinished.",
		built: "`Align=\"center\"` makes the shell's `flex-1` track a centred column, so the card sits in the viewport it is the only thing in. `start` is the default and is the composition every route already renders."
	},
	{
		component: "AUTHREPORT",
		from: "REST",
		found: "The block's own docstring said the title is an `h2` under the shell's `h1`; the markup printed an `h3`. Every report on every credential route skipped a heading level, and the file that documented the fix was the file that had not made it.",
		built: "`Heading` defaults to `2` and the title renders as an `h2`; `3` exists for the one nesting case. The level is a prop rather than a constant so a nested report can still go one deeper without a second block."
	},
	{
		component: "AUTHREPORT",
		from: "ERROR / EXPIRED",
		found: "A report could say what happened and not what it was made of. `STATUS: INTERRUPTED` over one sentence left the reader with no window, no cause and no route - the three facts an error state owes - and the only way to print them was to hand in a second block under the report.",
		built: "`Facts` prints `KEY: value` rows under the sentence in the record grammar, at the meta step, centred as a block with the rows start-aligned. `WINDOW:`, `CAUSE:`, `RETRY:` and `AS OF:` are the four the family uses."
	},
	{
		component: "AUTHREPORT",
		from: "WITH ACTION",
		found: "The one thing a reader can click was only expressible as React children. A report rendered outside an island - the specimen sheet, a link-shaped ending, any state whose action is a destination rather than a handler - printed no action at all, and the block's own comment says an action silently dropped is the defect it exists to prevent.",
		built: "`Action` prints the one action as a link wearing the primary tier's properties, with the U+2001 separator and the arrow the site's actions carry. `children` remains the form-shaped arm and wins when both are given: one action per report."
	},
	{
		component: "PRIVACYREQUESTS",
		from: "DENIED / SIGNED OUT",
		found: "The directory had one rendering: the full list. A dashboard surface a signed-out reader reached printed six rights and five channels as though they could act on any of them, and the page never said which session it was reading with. There was no denied arm and no empty arm - a registry that returned nothing printed a heading, an intro about six rights, and a grid of nothing.",
		built: "`state=\"denied\"` prints `SurfaceAbsent` - `STATUS: UNAVAILABLE`, what would be here, why it is not, the way in and the retry. Each grid prints its own composed `empty` sentence from `Data.ts` under the same heading when it holds no card, so a label is never printed over a hole."
	},
	{
		component: "PRIVACYREQUESTS",
		from: "MANY / ONE",
		found: "Three sets, three headings, no figure anywhere. Every other counted line on the site prints `# LABEL / NN`; the directory was the one place a reader could not tell six rights from two, and the intro's own sentence ('the following rights') was the only count on the page.",
		built: "Each block prints its register through `Register.astro`, composed with `RegisterOf` from the rows it is about to render: `# THE RIGHTS / 06`, `# THE CHANNELS / 05`, `# THE ERASURE / 01`. The line cannot outlive its set, and `erase={null}` drops the section rather than printing an erasure card for a route that does not answer."
	},
	{
		component: "TRUSTCLAUSE",
		from: "MISSING CLAUSE",
		found: "The legal set's worst state had no arm: a clause the document's index names and the text does not carry. A caller either omitted the heading - and the index's row pointed at nothing - or printed an empty one. And the accessible name read `Clause ${Number(number)}`, which prints 'Clause NaN' for any number the document writes as `07A` or `12.1`.",
		built: "`state=\"missing\"` keeps the number, the anchor and the name, and prints `STATUS: UNAVAILABLE` and the caller's sentence under them, indented to the clause's own rule - a citation to §NN lands on the statement rather than on the next clause. The accessible name prints the number as the document wrote it."
	},
	{
		component: "TRUSTCONTENTS",
		from: "EMPTY",
		found: "A document whose index is empty printed `CLAUSES 0` over an empty `<ol>`: a count with nothing under it, which reads as a list that failed to render rather than as a document with no clauses. The count was right and the sentence was missing.",
		built: "`empty` prints the composed sentence in both registers, under the same head and the same count - the count stays, because `0` is a counted zero and it is the honest figure. The rows themselves now fall back to `UNAVAILABLE` for a number or a name the document did not write, so a row is never an empty anchor."
	},
	{
		component: "CONTACTWORKSPACE",
		from: "FAILED SUBMIT",
		found: "A request route whose send failed reported it inside the form and nowhere else. The record column - the page's instrument, the column that carries the route's facts - said nothing: a reader looking at the facts could not tell a route at rest from a route whose last send was interrupted, and the page's own state vocabulary was absent from the one page that had just failed.",
		built: "`state=\"interrupted\"` prints `SurfaceStatusLine` at the top of the record column: `STATUS: INTERRUPTED` plus the three declarations that make it auditable - `ROUTE:`, `MAILBOX:`, `SLA:` - so the failure is a state of the record, in the same instrument as the rest of the site."
	},
	{
		component: "CONTACTWORKSPACE",
		from: "WITH ACTION / IN A CARD",
		found: "The shell mounted `DynamicContactForm` unconditionally, so the one island was also the one thing a caller could not replace: a specimen plate could not print the composition without hydrating a real Auth0 form, and a route with a different instrument had no seam.",
		built: "A `form` slot: absent, the island mounts exactly as before; present, the caller's instrument takes the form column and the record column is unchanged. The shell still owns the split, the gutter and the reading order."
	},
	{
		component: "CONTACTPAGE",
		from: "EMPTY / FAILED SUBMIT",
		found: "A request route's `h1` lives inside its form island, so a route whose island never booted printed a trail, a record head and nothing else: no heading, no body, and no statement that anything was missing. The page chrome had no adverse state at all.",
		built: "`state=\"empty\"` prints the absence under the record head - `◎`, the sentence and `STATUS: UNAVAILABLE` - so the route says what it is even when its instrument is not there. The opening itself is now `ContactHead`, which is what makes the state printable outside a document."
	},
	{
		component: "CONTACTHEAD",
		from: "REST / WITH ACTION",
		found: "The opening was eleven lines inside `ContactPage`, between its `<Base>` and its slot. The one part of a Contact page that carries the record grammar could not be printed anywhere but inside a document: not on a specimen sheet, not by a route that composes its own chrome.",
		built: "`ContactHead` is the opening as a block - trail, record head, heading - and `ContactPage` composes it under `Base`. The composition is byte-for-byte the same: the same measures, the same `opening` and `width` arms, the same record cells."
	},
	{
		component: "STATUSBOARD",
		from: "EMPTY / PARTIAL",
		found: "Two defects the combinations found in one block. A board with no columns printed `<p>{empty}</p>` whether or not the caller had a sentence - so the state the block documents as 'renders nothing at all' rendered a section with an empty line in it. And the row's state word was colour-only, while every other register on the site prints the square before the word, so the board was the one place a reader had to see the ink to know the state.",
		built: "The empty arm prints the sentence when there is one and nothing when there is not. The row's state now carries the mark its tone already implied, in the same 2px square the register uses, so the word survives greyscale and a row read out of its column still reads as a state."
	},
	{
		component: "LEXICON",
		from: "ONE / MANY",
		found: "The run's head named the run and not its extent: `# RUN_01`, a heading and a note, with no figure anywhere, while the alphabet strip beneath it was the reader's only clue to how much was filed. And a run of one letter printed a one-link navigation - a nav that says 'there is only one'.",
		built: "The head prints the count, composed from `Run.terms.length` and a caller's `unit` (`26 WORDS`), so the figure cannot outlive the terms. The letter strip prints only when the run uses two or more letters; the group's own letter heading is untouched."
	},
	{
		component: "LEXICONENTRY",
		from: "PARTIAL",
		found: "`SOURCE: UNAVAILABLE` printed in the same ink as `SOURCE: Content/More/Glossary.ts`. The block's own docstring exists to draw that difference - a citation versus a summary - and the difference was invisible at a glance, because the one value that is not a fact was set like the ones that are.",
		built: "The absent source takes the quiet ink and a `--unavailable` class, the same tone `SurfaceState` gives an `UNAVAILABLE` word; a cited source keeps full ink. The row was already there and nothing moved."
	},
	{
		component: "QUIETHEAD",
		from: "EMPTY",
		found: "A reference document whose facts strip could not be read printed a heading, a proposition and an empty ledger frame: a page that states its extent and then shows a box with nothing in it.",
		built: "`empty` is forwarded to `RecordLedger` with `state=\"empty\"`, so the strip prints the composed sentence instead of the frame - and the marker, the title and the proposition still print, because those are the document's and they are still true."
	},
	{
		component: "ONWARD",
		from: "REST / WITH ACTION",
		found: "A register printed on the page it routes to listed that page as a destination: 'you are here, and here is the way here'. Every row was a link, so the one row that could not be followed was the one row the register was standing on.",
		built: "`current` names the destination the reader is at; that row prints as a statement carrying `aria-current=\"page\"`, in the same grammar, with the arrow kept and `YOU ARE HERE` at its end. A register with no `current` renders exactly as it did."
	}
];
var Observations = [
	{
		component: "CONTACTBREADCRUMB",
		found: "An empty trail renders `Trail`'s empty `<ol>` inside a `nav` with an accessible name - an empty breadcrumb landmark. The bridge passes the empty array through, and no page mounts it with one, so the defect is latent rather than live.",
		owner: "The card that owns `Component/Route/Trail.astro`. The fix is one line (`trail.length ? … : null`) and it belongs to the trail's own family, not to the bridge that renders it."
	},
	{
		component: "AUTHREPORT",
		found: "Two call sites still print a report with no `State`: `Dynamic/VerifyPage.tsx`'s success and failure arms pass a title, a sentence and a glyph, so `Email verified` and `Verification failed` print without the vocabulary's word. The block made the label required; the callers were not updated in the same pass because they belong to the `Dynamic/*` layer.",
		owner: "A card on the `Dynamic/*` credential adapters. It is a two-prop change per arm, and it wants the route's own reading first - `verify.success` and `verify.error` already carry the words in `Auth/Content.ts`."
	},
	{
		component: "CONTACTPAGE",
		found: "A request route's `h1` lives inside the form island, so a route whose island never boots has no page heading even with the empty arm: the page states that its body is missing, but its accessible name is the trail's.",
		owner: "A card on the Contact routes and `DynamicContactForm`. The honest fix is an `h1` the route owns above the form (and the form's title demoted), which changes what the form prints - so it wants the owner's reading of the form's opening before it moves."
	},
	{
		component: "PRIVACYREQUESTS",
		found: "The directory's cards are composed with utilities, while `Dashboard/_PrivacyRequests.scss` publishes a `.requests*` set that no component mounts. The two shapes describe the same directory and only one of them is live.",
		owner: "A card on the dashboard, if the owner wants the block's anatomy to live in its partial rather than in utility strings. The change is mechanical but it touches every card's markup."
	},
	{
		component: "TRUSTCONTENTS",
		found: "The rail's marking is wired by `Trust/TrustContents.ts`, which looks for `.reading-document__body` before it marks anything. A rail mounted outside that surface - the specimen plate is the first - prints its rows and no position figure, because the module cannot find the body it measures.",
		owner: "A card on the reading surface, if the rail is ever mounted outside `ReadingDocument`. The module would have to take its body selector as a parameter; today the two surfaces that mount the rail are the two that carry the body."
	}
];
/**
* The rows, in reading order: the credential frame and its report, the account
* directory, the licence's clause apparatus, a request route, the reference
* blocks, and the adverse compositions.
*
* Every row is a state the site either uses or could use, and the `when` line is
* the one thing a picture of a component cannot carry: the sentence that says
* which composition is right. A row printed here that the site never needs is
* still a row: a component that survives its own worst combination is a
* component whose design frame is real.
*/
var Specimens = [
	{
		mark: "SMALL_01",
		state_name: "THE SIGN-IN FRAME",
		component: "AUTHSHELL",
		when: "The resting credential route: `/SIGN IN`, the page's one `h1`, one sentence, the card, and one alternate action under it.",
		kind: "authshell"
	},
	{
		mark: "SMALL_02",
		state_name: "SIGNING IN",
		component: "AUTHSHELL",
		when: "A short interior while the exchange runs: the card sits in the middle of the viewport it is the only thing in, with `STATUS: LOADING` above it.",
		kind: "authshell",
		variant: "signingin"
	},
	{
		mark: "SMALL_03",
		state_name: "NO FRAME",
		component: "AUTHSHELL",
		when: "A route that states its condition without opening a heading: the register prints on its own, which it could not do before this card.",
		kind: "authshell",
		variant: "frameless"
	},
	{
		mark: "SMALL_04",
		state_name: "EXPIRED LINK",
		component: "AUTHSHELL",
		when: "The reset or verification link closed: `STATUS: INTERRUPTED` in the frame, and a card that says what the window was and where the retry goes.",
		kind: "authshell",
		variant: "expired"
	},
	{
		mark: "SMALL_05",
		state_name: "DENIED",
		component: "AUTHSHELL",
		when: "A route the reader may not reach: `STATUS: UNAVAILABLE` above a card that says what the surface is, not only that it cannot be had.",
		kind: "authshell",
		variant: "denied"
	},
	{
		mark: "SMALL_06",
		state_name: "VERIFIED",
		component: "AUTHREPORT",
		when: "A state that ends well: the check glyph, `STATUS: VERIFIED`, one sentence and the one action that follows it.",
		kind: "authreport",
		variant: "verified"
	},
	{
		mark: "SMALL_07",
		state_name: "LOADING REPORT",
		component: "AUTHREPORT",
		when: "A state that has not arrived: the busy arm draws the shape of the answer instead of a spinner, and the word is already printed above it.",
		kind: "authreport",
		variant: "loading"
	},
	{
		mark: "SMALL_08",
		state_name: "INTERRUPTED, WITH FACTS",
		component: "AUTHREPORT",
		when: "A send that failed: `STATUS: INTERRUPTED` with `WINDOW:`, `CAUSE:` and `RETRY:` under the sentence - the three facts an error state owes.",
		kind: "authreport",
		variant: "interrupted"
	},
	{
		mark: "SMALL_09",
		state_name: "LONG SENTENCE",
		component: "AUTHREPORT",
		when: "A provider's own error sentence, longer than the card: the prose wraps and a fact's value breaks anywhere rather than widening the card.",
		kind: "authreport",
		variant: "long",
		width: "narrow"
	},
	{
		mark: "SMALL_10",
		state_name: "THE DIRECTORY",
		component: "PRIVACYREQUESTS",
		when: "The dashboard's data-rights directory at rest: three counted sets, eleven destinations, each opening the form that files it.",
		kind: "privacy"
	},
	{
		mark: "SMALL_11",
		state_name: "EMPTY GRIDS",
		component: "PRIVACYREQUESTS",
		when: "A registry that answered with no card: each grid prints its own composed sentence under the same heading, and the register still prints its counted zero.",
		kind: "privacy",
		variant: "empty"
	},
	{
		mark: "SMALL_12",
		state_name: "DENIED READER",
		component: "PRIVACYREQUESTS",
		when: "A signed-out reader at a dashboard surface: what the directory is, why it is not being listed, the way in and the retry - never a list the reader cannot act on.",
		kind: "privacy",
		variant: "denied"
	},
	{
		mark: "SMALL_13",
		state_name: "ONE RIGHT",
		component: "PRIVACYREQUESTS",
		when: "A registry with one right filed: one card at the grid's floor, and the register counts `01` - the set states its own size.",
		kind: "privacy",
		variant: "one",
		width: "narrow"
	},
	{
		mark: "SMALL_14",
		state_name: "THE CLAUSE",
		component: "TRUSTCLAUSE",
		when: "A clause as the document prints it: the number as the anchor, the name as the heading's words, and the paragraph under it.",
		kind: "clause"
	},
	{
		mark: "SMALL_15",
		state_name: "MISSING CLAUSE",
		component: "TRUSTCLAUSE",
		when: "A clause the index names and the text does not carry: the number, the anchor and the name stay, and `STATUS: UNAVAILABLE` says why the paragraph is not here.",
		kind: "clause",
		variant: "missing"
	},
	{
		mark: "SMALL_16",
		state_name: "THE RAIL",
		component: "TRUSTCONTENTS",
		when: "The clause rail in the page margin: the count, the reader's position cell and every clause as a `§NN  name` row.",
		kind: "contents",
		variant: "rail",
		width: "narrow"
	},
	{
		mark: "SMALL_17",
		state_name: "THE DISCLOSURE",
		component: "TRUSTCONTENTS",
		when: "The same register below 1024px: a closed `<details>` above the document, one tap from the whole list.",
		kind: "contents",
		variant: "disclosure"
	},
	{
		mark: "SMALL_18",
		state_name: "EMPTY REGISTER",
		component: "TRUSTCONTENTS",
		when: "A document whose index holds no clause: the count prints `0` and the sentence says what would be here - never a count over an empty list.",
		kind: "contents",
		variant: "empty",
		width: "narrow"
	},
	{
		mark: "SMALL_19",
		state_name: "ROWS WITHOUT NUMBERS",
		component: "TRUSTCONTENTSLIST",
		when: "A clause the index filed without a number or a name: the row prints `UNAVAILABLE` in the empty cell instead of a bare `§` or an empty anchor.",
		kind: "contentslist",
		variant: "missing",
		width: "narrow"
	},
	{
		mark: "SMALL_20",
		state_name: "ONE ROW",
		component: "TRUSTCONTENTSLIST",
		when: "A document with one clause: one row, one number, and the list's own rhythm at the rail's width.",
		kind: "contentslist",
		variant: "one",
		width: "narrow"
	},
	{
		mark: "SMALL_20A",
		state_name: "THE DOCUMENT",
		component: "TRUSTCLAUSE",
		when: "Eight clauses in a row: the document the rail indexes, printed so every row above has somewhere to land.",
		kind: "clause",
		variant: "document"
	},
	{
		mark: "SMALL_21",
		state_name: "THE REQUEST ROUTE",
		component: "CONTACTWORKSPACE",
		when: "A request route at rest: the record column - facts, process, margin note, folded aside - beside the form, divided by the site's 1px divider.",
		kind: "contactworkspace",
		variant: "rest",
		width: "wide"
	},
	{
		mark: "SMALL_22",
		state_name: "FAILED SUBMIT",
		component: "CONTACTWORKSPACE",
		when: "A send that did not land: `STATUS: INTERRUPTED` and the route's declarations at the top of the record column, beside the form that reports it.",
		kind: "contactworkspace",
		variant: "interrupted",
		width: "wide"
	},
	{
		mark: "SMALL_23",
		state_name: "NO STATUTORY BASIS",
		component: "CONTACTWORKSPACE",
		when: "A channel with no article behind it: `BASIS: UNAVAILABLE` in the record, and no `〈 〉` bracket anywhere on the page.",
		kind: "contactworkspace",
		variant: "partial",
		width: "wide"
	},
	{
		mark: "SMALL_24",
		state_name: "THE RECORD HEAD",
		component: "CONTACTHEAD",
		when: "A request's opening: the trail, `# REACH  〈GDPR Art. 15 + 20〉  /CONTACT  SLA: 30d`, and the heading when the route has one.",
		kind: "contacthead",
		variant: "rest"
	},
	{
		mark: "SMALL_25",
		state_name: "THE HUB'S HEAD",
		component: "CONTACTHEAD",
		when: "The index's opening: a record with no basis and no window, a heading and a standfirst, and `REGISTER: 14 ENTRIES` as the page's count.",
		kind: "contacthead",
		variant: "hub"
	},
	{
		mark: "SMALL_26",
		state_name: "NO BODY",
		component: "CONTACTHEAD",
		when: "A route whose form never mounted: `◎`, the sentence and `STATUS: UNAVAILABLE` under the record head - the page says what it is.",
		kind: "contacthead",
		variant: "empty"
	},
	{
		mark: "SMALL_27",
		state_name: "THE BRIDGE",
		component: "CONTACTBREADCRUMB",
		when: "The absorbed trail the Blog still imports: labels written into `/LABEL`, the last crumb as the page, every other field carried through.",
		kind: "breadcrumb"
	},
	{
		mark: "SMALL_28",
		state_name: "THE DOCUMENT",
		component: "CONTACTPAGE / CONTACTSHELL",
		when: "The two document wrappers every Contact route shares - the page chrome and the route shell. Neither can be printed here: both end in the document's `<Base>`, and a page inside a page is not a specimen. Their compositions are printed above, as `CONTACTHEAD` and `CONTACTWORKSPACE`.",
		kind: "absent"
	},
	{
		mark: "SMALL_29",
		state_name: "THE BOARD",
		component: "STATUSBOARD",
		when: "The site's own state as four shelves: one tall, one short, one empty and one waiting - the shape of what is live, in the layout.",
		kind: "board"
	},
	{
		mark: "SMALL_30",
		state_name: "ONE COLUMN",
		component: "STATUSBOARD",
		when: "A board of one column: one shelf at the band's measure, with its register head, its count and its note.",
		kind: "board",
		variant: "one"
	},
	{
		mark: "SMALL_31",
		state_name: "EMPTY COLUMN",
		component: "STATUSBOARD",
		when: "A column that holds nothing: the head, the count `0` and the composed sentence - the column the board most needs to be trusted about.",
		kind: "board",
		variant: "columnempty"
	},
	{
		mark: "SMALL_32",
		state_name: "EMPTY BOARD",
		component: "STATUSBOARD",
		when: "A board with no column at all: the caller's sentence, and nothing else - the block documents that arm and now renders it.",
		kind: "board",
		variant: "empty",
		width: "narrow"
	},
	{
		mark: "SMALL_33",
		state_name: "THE RUN",
		component: "LEXICON",
		when: "A glossary run: the marker, the heading, the count, the note, the letters the run uses as links, and the words filed under each.",
		kind: "lexicon"
	},
	{
		mark: "SMALL_34",
		state_name: "ONE WORD",
		component: "LEXICON",
		when: "A run of one word: one entry, no letter strip - a one-link navigation says only what the count already says.",
		kind: "lexicon",
		variant: "one"
	},
	{
		mark: "SMALL_35",
		state_name: "EMPTY RUN",
		component: "LEXICON",
		when: "A run that files no word: its own composed sentence under its own head, never a heading over a hole.",
		kind: "lexicon",
		variant: "empty"
	},
	{
		mark: "SMALL_36",
		state_name: "NINETY WORDS",
		component: "LEXICON",
		when: "A run long enough that the alphabet matters: the count says ninety, the strip is the navigation, and the groups run on.",
		kind: "lexicon",
		variant: "many"
	},
	{
		mark: "SMALL_37",
		state_name: "A WORD, DEFINED",
		component: "LEXICONENTRY",
		when: "The resting entry: the term in the margin, the sense on the measure, and the record, the route and the source under it.",
		kind: "entry"
	},
	{
		mark: "SMALL_38",
		state_name: "NO SOURCE",
		component: "LEXICONENTRY",
		when: "A word the tree does not define: `SOURCE: UNAVAILABLE` in the quiet ink, so a paraphrase is not mistaken for a citation.",
		kind: "entry",
		variant: "partial"
	},
	{
		mark: "SMALL_39",
		state_name: "THE HEAD",
		component: "QUIETHEAD",
		when: "A reference document's opening: `# LEXICON_01`, the bare `h1`, the `↳` proposition, and the extent as a white facts strip.",
		kind: "quiethead"
	},
	{
		mark: "SMALL_40",
		state_name: "NO FACTS",
		component: "QUIETHEAD",
		when: "A facts strip the build could not fill: the composed sentence in the strip's own box, under the same marker, title and proposition.",
		kind: "quiethead",
		variant: "empty"
	},
	{
		mark: "SMALL_41",
		state_name: "THE REGISTER",
		component: "ONWARD",
		when: "The routing register at rest: the intent the reader arrived with, the arrow, and the destination that answers it.",
		kind: "onward"
	},
	{
		mark: "SMALL_42",
		state_name: "YOU ARE HERE",
		component: "ONWARD",
		when: "A register printed on one of its own destinations: that row is a statement with `aria-current=\"page\"`, not a link to the page the reader is on.",
		kind: "onward",
		variant: "current"
	},
	{
		mark: "SMALL_43",
		state_name: "NOTHING TO ROUTE TO",
		component: "ONWARD",
		when: "A register with no destination: the copy's required `empty` sentence - the state a one-page site reaches.",
		kind: "onward",
		variant: "empty",
		width: "narrow"
	},
	{
		mark: "SMALL_44",
		state_name: "AT 640",
		component: "CONTACTWORKSPACE",
		when: "A request route in a narrow column: the form first, the record under it below the divider, in the order a phone needs.",
		kind: "contactworkspace",
		variant: "rest",
		width: "narrow"
	},
	{
		mark: "SMALL_45",
		state_name: "AT 640, THE DIRECTORY",
		component: "PRIVACYREQUESTS",
		when: "The directory in a narrow column: one card per row, the code and the article still at the card's right edge.",
		kind: "privacy",
		variant: "rest",
		width: "narrow"
	},
	{
		mark: "SMALL_46",
		state_name: "AT 640, THE CLAUSE",
		component: "TRUSTCLAUSE",
		when: "A clause in a narrow column: the number above the name, the tombstone indented to the clause's own rule.",
		kind: "clause",
		variant: "missing",
		width: "narrow"
	}
];
/** Which group a row belongs to, from its mark's range. */
var GroupOf = (Row) => {
	const At = Specimens.indexOf(Row);
	if (At < 9) return "credentials";
	if (At < 13) return "account";
	if (At < 21) return "licence";
	if (At < 29) return "request";
	if (At < 40) return "reference";
	return "adverse";
};
/** The rows in one group, in reading order. */
var InGroup = (Group) => Specimens.filter((Row) => GroupOf(Row) === Group);
/** The groups, in the plate's order, with the line that says what each one asks. */
var Groups = [
	{
		key: "credentials",
		label: "/THE CREDENTIAL",
		note: "The frame eight routes render and the report every ending prints: the sign-in route at rest, the same frame while the exchange runs and while a link has closed, a route with no frame at all, and the four reports a reader actually meets - verified, loading, interrupted with its facts, and a provider sentence longer than the card."
	},
	{
		key: "account",
		label: "/THE ACCOUNT",
		note: "The dashboard's data-rights directory in four states: the full directory with its three counted sets, a registry that answered with nothing, a signed-out reader, and one right filed on its own."
	},
	{
		key: "licence",
		label: "/THE LICENCE",
		note: "The legal set's clause apparatus: a clause and a clause the text does not carry, the rail and the disclosure, an index with no clause in it, and the two row-level partials - a clause filed without a number, and a document of one."
	},
	{
		key: "request",
		label: "/THE REQUEST",
		note: "A contact route in four compositions and three states: the workspace at rest and at 640px, a send that failed, a channel with no statutory basis, the record head on a request and on the hub, a body that never mounted, the absorbed trail, and the one part that cannot be printed here."
	},
	{
		key: "reference",
		label: "/THE REFERENCE",
		note: "The four blocks that carry the site's own vocabulary: the status board and its three arms, a glossary run at rest, at one word, at none and at ninety, an entry with and without a source, and the head of a reference document."
	},
	{
		key: "adverse",
		label: "/THE ADVERSE",
		note: "The states a small surface is abandoned in: a facts strip with nothing in it, a routing register with nothing to route to and one that names the page it is on, and the two narrow compositions where the split and the clause have to re-form."
	}
];
Specimens.length;
// Source/Component/Surface/SurfaceShell.astro
createAstro("https://editor.land");
var $$SurfaceShell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceShell;
	const { index, title, standfirst, states = [], declarations = [], rows = [], life, lifeNote, class: ClassName } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["surface", ClassName], "class:list")}> ${renderComponent($$result, "SurfaceHead", $$SurfaceHead, {
		"index": index,
		"title": title,
		"proposition": standfirst,
		"states": states,
		"declarations": declarations,
		"rows": rows,
		"life": life,
		"lifeNote": lifeNote
	})} ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceShell.astro", void 0);
export { Rows$3 as $, BuiltCount$8 as $t, BuiltCount$2 as A, Observations$6 as An, BuiltOf$6 as At, Observations$2 as B, BuiltCount$7 as Bt, InGroup$1 as C, CellCount$9 as Cn, MatrixCell$5 as Ct, ReasonCount$1 as D, InGroup$9 as Dn, Rows$5 as Dt, Observations$1 as E, Improvements$6 as En, ReasonCount$5 as Et, Groups$2 as F, MatrixCell$6 as Ft, BuiltOf$3 as G, Groups$7 as Gt, Rows$2 as H, BuiltOf$7 as Ht, Improvements$2 as I, MatrixRegister$6 as It, Groups$3 as J, MatrixRegister$7 as Jt, CellCount$3 as K, InGroup$7 as Kt, InGroup$2 as L, ReasonCount$6 as Lt, BuiltOf$2 as M, Rows$9 as Mn, Columns$6 as Mt, CellCount$2 as N, SpecimenCount$8 as Nn, Groups$6 as Nt, Rows$1 as O, MatrixCell$9 as On, Specimens$5 as Ot, Columns$2 as P, Specimens$9 as Pn, InGroup$6 as Pt, ReasonCount$3 as Q, Verdicts as Qt, MatrixCell$2 as R, Rows$6 as Rt, Improvements$1 as S, BuiltOf$9 as Sn, InGroup$5 as St, MatrixRegister$1 as T, Groups$9 as Tn, Observations$4 as Tt, Specimens$2 as U, CellCount$7 as Ut, ReasonCount$2 as V, BuiltIn$5 as Vt, BuiltCount$3 as W, Columns$7 as Wt, MatrixCell$3 as X, Rows$7 as Xt, InGroup$3 as Y, ReasonCount$7 as Yt, MatrixRegister$3 as Z, Specimens$7 as Zt, BuiltIn$1 as _, Specimens$8 as _n, BuiltOf$5 as _t, CellCount as a, Groups$8 as an, Columns$4 as at, Columns$1 as b, BuiltCount$9 as bn, Groups$5 as bt, Improvements as c, LabCount as cn, InGroup$4 as ct, MatrixRegister as d, MatrixRegister$8 as dn, Observations$3 as dt, BuiltIn$6 as en, Specimens$3 as et, Observations as f, Observations$5 as fn, ReasonCount$4 as ft, BuiltCount$1 as g, SpecimenCount$7 as gn, BuiltIn$4 as gt, Specimens as h, Rows$8 as hn, BuiltCount$5 as ht, BuiltOf as i, DuplicateCount as in, CellCount$4 as it, BuiltIn$2 as j, ReasonCount$9 as jn, CellCount$6 as jt, Specimens$1 as k, MatrixRegister$9 as kn, BuiltCount$6 as kt, InGroup as l, LiveCount as ln, MatrixCell$4 as lt, Rows as m, ReasonCount$8 as mn, Specimens$4 as mt, BuiltCount as n, CellCount$8 as nn, BuiltIn$3 as nt, Columns as o, Improvements$5 as on, Groups$4 as ot, ReasonCount as p, OrphanCount as pn, Rows$4 as pt, Columns$3 as q, MatrixCell$7 as qt, BuiltIn as r, Columns$8 as rn, BuiltOf$4 as rt, Groups as s, InGroup$8 as sn, Improvements$3 as st, $$SurfaceShell as t, BuiltOf$8 as tn, BuiltCount$4 as tt, MatrixCell as u, MatrixCell$8 as un, MatrixRegister$4 as ut, BuiltOf$1 as v, VerdictRegister as vn, CellCount$5 as vt, MatrixCell$1 as w, Columns$9 as wn, MatrixRegister$5 as wt, Groups$1 as x, BuiltIn$7 as xn, Improvements$4 as xt, CellCount$1 as y, Verdicts$1 as yn, Columns$5 as yt, MatrixRegister$2 as z, Specimens$6 as zt };
