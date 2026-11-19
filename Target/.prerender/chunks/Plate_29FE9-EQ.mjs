import { t as ElementWorking } from "./Working_g109gLqv.mjs";
import { A as Mountain, C as Worker, D as SideCar, E as Sky, F as Common, I as Cocoon, L as Air, M as Maintain, N as Grove, O as Rest, P as Echo, T as Vine, j as Mist, k as Output, w as Wind } from "./Base_BVG1wSoZ.mjs";
// Source/Content/Artifact/Plate.ts
/**
* Plate - the copy behind the two plate artifacts, as data.
*
* The Record layer prints what it is given; a page decides order. This module is
* the third thing: the words and the facts, read once, so no page hand-writes a
* caption and no figure is invented in markup.
*
* ─── WHAT IS IN HERE ──────────────────────────────────────────────────────
* - **The element plate-set** (`ElementPlateSet`) - fifteen cells, one per
*   element record the architecture wall carries, each printing its own manifest
*   state. Seven of the fifteen have an `Evidence/<Element>/manifest.yaml` with
*   `status: placeholder`; the other eight have no manifest at all; **none** of
*   the fifteen has a capture in the build. The set says that, per cell, instead
*   of drawing fifteen empty frames.
* - **The release plate** (`ReleasePlate`) - the one capture that *is* in the
*   build (`Public/Evidence/Land/NightGlass-01.png`, `status: verified`), printed
*   at plate scale with its manifest's own facts. It is evidence of the Land
*   element's material, not of the editor's interface, and its caption says so -
*   the site may not let a texture plate stand in for a screenshot.
* - **The release plate-set** (`ReleasePlateSet`) - the three screens the manual
*   documents in full, each with the capture the build carries for it: none. This
*   is a different subject from the platform matrix (which is artifacts and
*   signatures), so the two can sit on one page without repeating each other.
* - **The element plate** (`ElementPlate`) - one element's plate, for the page
*   that is about that element. It is the same record as the set's cell, one
*   scale up, with the working register's evidence row as its state.
*
* ─── THE ONE RULE ─────────────────────────────────────────────────────────
* A plate's `source` is always a file that exists in the repository. The
* manifest path is derived from the record's own `Evidence.Src` rather than from
* its id, because the directories are not uniformly cased (`SideCar`, `Output`)
* and a derived path that guesses would print a 404 as a citation.
*/
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/**
* The fifteen element records, in the architecture wall's order.
*
* The wall's order is the document's order - a reader who has scrolled the wall
* meets the plates in the same sequence - and it is spelled here rather than
* derived from the filesystem because a directory listing has no order and the
* set's cell numbers are positions.
*/
var Elements = [
	Air,
	Cocoon,
	Common,
	Echo,
	Grove,
	Maintain,
	Mist,
	Mountain,
	Output,
	Rest,
	SideCar,
	Sky,
	Vine,
	Wind,
	Worker
];
/**
* The evidence directory a record's capture would live in, taken from the
* record's own `Src` (`/Evidence/SideCar/Track-01.webp` -> `SideCar`).
*
* Derived rather than cased from the id: `sidecar` -> `SideCar` and `output` ->
* `Output` are two different rules, and a manifest path that guesses is a
* citation to a file that is not there.
*/
var DirectoryOf = (Record) => Record.Evidence.Src.split("/")[2] ?? Record.Title;
/** One element's manifest path, whether or not the file exists. */
var ManifestOf = (Record) => `Public/Evidence/${DirectoryOf(Record)}/manifest.yaml`;
/** The record's working register's `EVIDENCE` row: the state and its reason. */
var EvidenceOf = (Record) => ElementWorking[Record.Id]?.Register.find((Row) => Row.Label === "EVIDENCE");
/**
* The plate-set the index prints.
*
* `columns: 3` is the field's own reading - fifteen cells at three across are
* five rows, which is a page of plates; at two across they are a list of pairs.
*/
var ElementPlateSet = {
	index: "PLATES_01",
	label: "ELEMENT EVIDENCE",
	plates: Elements.map((Record, Position) => {
		const Evidence = EvidenceOf(Record);
		const Note = Evidence === void 0 ? "UNAVAILABLE" : `${Evidence.Value}${Quad}${Evidence.Note ?? "NO REASON RECORDED"}`;
		return {
			index: String(Position + 1).padStart(2, "0"),
			subject: `${Record.Title}${Quad}${Record.Evidence.Alt}`,
			state: "unavailable",
			note: Note
		};
	}),
	columns: 3,
	caption: "Fifteen element records, fifteen manifest states, not one capture: eight manifests are `placeholder` with no plate beside them, seven elements have no manifest at all, and the set prints each cell's own state rather than a gallery of empty frames. The one verified capture in the build belongs to the product record; it prints as PLATE_01 on /Download.",
	source: `PUBLIC/EVIDENCE/*/MANIFEST.YAML${Quad}SOURCE/CONTENT/ELEMENT/WORKING.TS`,
	empty: "No element record carries an evidence row in this build, so there is no set to print. The cells would name each element's manifest and its state; the register has not been run against this tree."
};
/**
* One element's plate, for the page that is about that element.
*
* The same facts as the set's cell, at plate scale: the manifest path as the
* source, the record's own `alt` as the subject, and the working register's
* evidence row as the state and the next step. A page whose element has no
* manifest gets a plate that says so - which is the honest plate, not a missing
* one.
*/
var ElementPlate = (Record) => {
	const Evidence = EvidenceOf(Record);
	const HasManifest = Evidence?.Value.startsWith("MANIFEST") ?? false;
	return {
		index: "PLATE_01",
		label: Record.Title,
		subject: `The capture this record's evidence would show: ${Record.Evidence.Alt.toLowerCase()}.`,
		caption: HasManifest ? `The manifest is in the build and the plate beside it is not. The capture it describes is a texture study of the element's material, not a screenshot of its interface.` : `This element has no evidence manifest in the build, so there is no capture to describe. The record above still prints its working - form, boundary, dependencies, manual and trace - and none of those fields is a picture.`,
		facts: [
			{
				key: "SUBJECT",
				value: Record.Evidence.Alt.toUpperCase()
			},
			{
				key: "MANIFEST",
				value: HasManifest ? ManifestOf(Record) : "UNAVAILABLE"
			},
			{
				key: "STATE",
				value: Evidence?.Value ?? "UNAVAILABLE"
			},
			{
				key: "PLATE",
				value: "UNAVAILABLE"
			}
		],
		source: HasManifest ? ManifestOf(Record) : "SOURCE/CONTENT/ELEMENT/WORKING.TS",
		state: "unavailable",
		next: "OPEN THE ELEMENT'S MANUAL - IT DESCRIBES THE THING THE CAPTURE WOULD HAVE SHOWN.",
		placement: "foot",
		span: "measure"
	};
};
/**
* The release's plate: the one verified capture in the build.
*
* Its facts are the manifest's, word for word (`subject`, `mode`, `crop`,
* `usage`, `status`), and the caption refuses the reading the picture invites:
* this is a texture plate of the Land element's material, not a photograph of the
* editor. A release page that printed it as "the workbench" would be the exact
* pretence the brief forbids.
*/
var ReleasePlate = {
	index: "PLATE_01",
	label: "LAND, NIGHT GLASS",
	subject: "The one verified capture in the build: rain-speckled glass reflecting a green light at night.",
	caption: "A texture plate for the Land element's material, not a screenshot of the editor. No capture of the interface is in the build; the three screens the manual documents in full are listed beside this plate with the capture the build carries for each: none.",
	src: "/Evidence/Land/NightGlass-01.png",
	alt: "Rain-speckled glass reflecting a green light at night",
	position: "right",
	facts: [
		{
			key: "SUBJECT",
			value: "RAIN-SPECKLED GLASS WITH REFLECTED GREEN LIGHT"
		},
		{
			key: "MODE",
			value: "FLASH-OBSERVATION"
		},
		{
			key: "CROP",
			value: `RIGHT-EDGE${Quad}SUBJECT EXCEEDS TOP AND RIGHT FRAME`
		},
		{
			key: "USAGE",
			value: `HOMEPAGE-HERO${Quad}LAND-ELEMENT-PAGE`
		},
		{
			key: "STATUS",
			value: "VERIFIED"
		}
	],
	source: "PUBLIC/EVIDENCE/LAND/MANIFEST.YAML",
	placement: "foot",
	span: "wide",
	ratio: "4 / 3"
};
/**
* The release's plate-set: the three screens the manual documents in full, and
* the capture the build carries for each.
*
* The subjects are the three screens the manual documents in full
* (`workflow-open-file`, `workflow-command-palette`, `workflow-terminal`), not
* invented screens, and the note on each cell is the same fact: the manual
* describes it, the build has no picture of it. This is the release's evidence gap
* stated as a set of three, which is a different claim from the platform matrix's
* "no installer exists".
*/
var ReleasePlateSet = {
	index: "PLATES_02",
	label: "RELEASE EVIDENCE",
	plates: [
		{
			index: "01",
			subject: `THE WORKBENCH${Quad}THE EDITOR ON AN OPEN FILE`,
			state: "unavailable",
			note: "NO CAPTURE IN THE BUILD"
		},
		{
			index: "02",
			subject: `THE COMMAND PALETTE${Quad}THE ROUTE INDEX OVER THE EDITOR`,
			state: "unavailable",
			note: "NO CAPTURE IN THE BUILD"
		},
		{
			index: "03",
			subject: `THE TERMINAL${Quad}THE PANEL UNDER THE WORKBENCH`,
			state: "unavailable",
			note: "NO CAPTURE IN THE BUILD"
		}
	],
	columns: 3,
	caption: "Three screens the manual documents in full - /Doc/workflow-open-file, /Doc/workflow-command-palette, /Doc/workflow-terminal - and no capture of any. A release that printed its interface as a drawing would be illustrating; this set says what the build has and what it does not.",
	source: `SOURCE/CONTENT/DOC/WORKFLOW-*.MD${Quad}PUBLIC/EVIDENCE/*/MANIFEST.YAML`,
	empty: "The manual does not document a screen in this build, so there is no release evidence to list. The set would name each documented screen and the capture the build carries for it."
};
/**
* The element record a manual slug is about, when it is one of the fifteen.
*
* Two spellings are accepted - `deep-dive-air` (the manual's own page) and `air`
* (the element's name) - because the manual files its element pages under
* `deep-dive-*` and a page about the element need not be a deep dive. The record
* list is the wall's, so a plate can only ever be printed for a record the wall
* carries.
*/
var ElementForSlug = (Slug) => Elements.find((Record) => Slug === `deep-dive-${Record.Id}` || Slug === Record.Id);
/**
* The plate a manual page carries, when the page is about an element.
*
* `undefined` for every other page - the manual has 78 documents and 29 of them
* are about an element (fifteen element pages and fourteen deep dives). Returning
* `undefined` rather than a default plate is what keeps the shell honest: a page
* with no plate prints no plate.
*/
var ElementPlateForSlug = (Slug) => {
	const Record = ElementForSlug(Slug);
	return Record === void 0 ? void 0 : ElementPlate(Record);
};
export { ReleasePlateSet as i, ElementPlateSet as n, ReleasePlate as r, ElementPlateForSlug as t };
