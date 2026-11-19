// Source/Content/More/Compare.ts
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/**
* The eight rows of the architecture comparison.
*
* Verbatim from `Source/Content/doc/cocoon.md` § "Workbench Architecture Role",
* which is itself the site's account of the substitution. The order is the
* document's: process, then renderer, then the channel between them, then the
* preload bridge and the four things a workbench does with the operating system.
*
* `changes` is short on purpose. A matrix cell refuses to wrap - that is what
* makes a comparison scannable - so a cell holding a sentence would widen the
* table and force the reader sideways. The consequence is named in four words and
* the pattern behind all eight is the band's standfirst: every row replaces a
* Node or Chromium layer with an OS-native one.
*/
var Rows = [
	{
		aspect: "MAIN PROCESS",
		land: "MOUNTAIN (RUST)",
		other: "ELECTRON MAIN",
		changes: "NO NODE IN THE PATH",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "RENDERER",
		land: "WIND (TAURI WEBVIEW)",
		other: "ELECTRON RENDERER",
		changes: "OS WEBVIEW, NOT CHROMIUM",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "IPC MECHANISM",
		land: "TAURI INVOKE + GRPC (VINE)",
		other: "ELECTRON IPCRENDERER / IPCMAIN",
		changes: "TYPED, NOT JSON",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "PRELOAD",
		land: "WIND PRELOAD.TS",
		other: "ELECTRON PRELOAD.JS",
		changes: "SAME SHAPE, TYPED",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "EXTENSION HOST",
		land: "COCOON (NODE SIDECAR VIA GRPC)",
		other: "CHILD NODE PROCESS",
		changes: "SAME EXTENSIONS, NEW PARENT",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "FILE SYSTEM",
		land: "MOUNTAIN NATIVE RUST FS",
		other: "NODE.JS FS MODULE",
		changes: "NO V8 IN THE PATH",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "NATIVE DIALOGS",
		land: "MOUNTAIN VIA TAURI DIALOG",
		other: "ELECTRON DIALOG API",
		changes: "OS DIALOG, UNWRAPPED",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	},
	{
		aspect: "WINDOW MANAGEMENT",
		land: "TAURI WINDOW",
		other: "ELECTRON BROWSERWINDOW",
		changes: "OS WINDOW, NOT A BROWSER",
		source: "SOURCE/CONTENT/DOC/COCOON.MD"
	}
];
/**
* The comparison's two columns: this site, and the pattern it replaces.
*
* The reading of the substitution - what each row changes - is a `RecordLedger`
* under the table rather than a third column. A matrix cell refuses to wrap, so a
* third column of sentences would widen the table past the workspace's track and
* force the reader sideways; the same eight facts as ledger rows read at any
* measure, and they are a different information type anyway: the table compares
* two implementations, and the ledger says what the comparison means.
*/
var Columns = [{ label: "LAND" }, {
	label: "VS CODE (ELECTRON)",
	ink: "MuteForeground"
}];
/** What each substitution changes, as the ledger's rows. */
var Changes = Rows.map((Row) => ({
	key: `${Row.aspect}:`,
	value: Row.changes
}));
var Measurements = [
	{
		measure: "EXTENSION COVERAGE",
		land: "88%",
		other: "UNAVAILABLE",
		source: "BLOG/VSCODE-COMPATIBILITY",
		asOf: "2026-05-23"
	},
	{
		measure: "STARTUP TIME",
		land: "UNAVAILABLE",
		other: "UNAVAILABLE",
		source: "NOT MEASURED"
	},
	{
		measure: "MEMORY",
		land: "UNAVAILABLE",
		other: "UNAVAILABLE",
		source: "NOT MEASURED"
	},
	{
		measure: "INSTALLER SIZE",
		land: "UNAVAILABLE",
		other: "UNAVAILABLE",
		source: "NO ARTIFACT"
	},
	{
		measure: "PUBLIC BUILD",
		land: "UNAVAILABLE",
		other: "UNAVAILABLE",
		source: "DOWNLOAD/DATA.TS"
	}
];
/**
* The measured table's columns.
*
* `SOURCE` is a column rather than a footnote because the four absences have
* four different reasons: one is unmeasured, one has no artifact to measure, one
* is a policy decision. A single footnote would flatten them into one.
*/
var MeasureColumns = [
	{ label: "MEASURE" },
	{
		label: "LAND",
		ink: "Accent"
	},
	{
		label: "VS CODE (ELECTRON)",
		ink: "MuteForeground"
	},
	{
		label: "SOURCE",
		ink: "MuteForeground"
	}
];
/** How many of the five measures exist: the figure the band prints. */
var Measured = Measurements.filter((Row) => Row.land !== "UNAVAILABLE").length;
/**
* What carries over, as one axis.
*
* The comparison above says what changes underneath. This rail says what a
* reader keeps, which is the question they actually ask before switching - and
* it is deliberately mostly empty. `EXTENSIONS` is the one claim the tree
* supports; the other four are not stated anywhere in it, and a rail that filled
* them in would be the one page on this site with no source.
*
* The axis runs from the thing a reader has to the thing they would have to
* rebuild: their extensions, then their habits, then their account.
*/
var Carries = {
	from: "WHAT YOU HAVE",
	to: "WHAT YOU WOULD REBUILD",
	stops: [
		{
			label: "EXTENSIONS",
			value: "UNMODIFIED",
			note: "Through Cocoon, on the VS Code API surface",
			href: "/Blog/VSCodeCompatibility"
		},
		{
			label: "KEYBINDINGS",
			value: "NOT STATED",
			state: "unavailable",
			note: "No document in this tree says"
		},
		{
			label: "SETTINGS",
			value: "NOT STATED",
			state: "unavailable",
			note: "No document in this tree says"
		},
		{
			label: "MARKETPLACE",
			value: "UNDER REVIEW",
			state: "unavailable",
			note: "The release manifest's own word"
		},
		{
			label: "ACCOUNT / SYNC",
			value: "NOT STATED",
			state: "unavailable",
			note: "No document in this tree says"
		}
	],
	caption: "One of five carries over with a documented claim. The other four are not stated anywhere in this tree, and this rail prints that rather than a verdict: a comparison whose empty cells were filled with `yes` would be the only page on the site with no source."
};
/**
* The head: what this page asserts about itself.
*
* No evidence panel. A comparison has no picture of itself, and a figure
* invented to fill the second panel would be the thing this page argues against
* two screens further down.
*/
var Record = {
	index: "COMPARE_01",
	claim: "THE SAME EDITOR",
	route: "/SUBSTRATE:DIFFERENT",
	status: {
		state: "active",
		tone: "specimen"
	},
	seal: "Land",
	metadata: [
		{
			key: "ROWS:",
			value: String(Rows.length),
			note: "the substitution, aspect by aspect"
		},
		{
			key: "SOURCE:",
			value: "DOC/COCOON",
			code: true,
			links: [{
				text: "DOC/COCOON",
				href: "/Doc/cocoon"
			}]
		},
		{
			key: "MEASURED:",
			value: `${Measured} OF ${Measurements.length}`,
			note: "the rest are UNAVAILABLE"
		},
		{
			key: "CARRIES:",
			value: `1 OF ${Carries.stops.length}`,
			note: "with a documented claim"
		}
	],
	relation: "LAND:",
	proposition: "READ THE EIGHT ROWS"
};
var Rail = [
	{
		mark: "/",
		label: "DOC/COCOON",
		meta: "THE TABLE",
		href: "/Doc/cocoon",
		note: "The eight rows, in the document's own order"
	},
	{
		mark: "/",
		label: "COMPATIBILITY",
		meta: "THE 88%",
		href: "/Blog/VSCodeCompatibility",
		note: "The one measure this site has, and its date"
	},
	{
		mark: "/",
		label: "DOC/INTRODUCTION",
		meta: "THE CLAIM",
		href: "/Doc/introduction",
		note: "What the substitution is, in one page"
	},
	{
		mark: "/",
		label: "DOWNLOAD",
		meta: "THE EDITION",
		href: "/Download",
		note: "What is published today: source"
	},
	{
		mark: "/",
		label: "STATUS",
		meta: "THE BOARD",
		href: "/Status",
		note: "Every record, under the word it states"
	}
];
/**
* The drawer: how to check the comparison yourself.
*
* Three documents, in the order a reader would open them, and one command that
* shows the tree's own claim about the substitution rather than this page's
* summary of it.
*/
var Check = {
	source: "THIS PAGE QUOTES; IT DOES NOT ARGUE",
	steps: [
		{
			index: "01",
			path: "Source/Content/doc/cocoon.md",
			note: "THE EIGHT-ROW TABLE, VERBATIM"
		},
		{
			index: "02",
			path: "Source/Content/blog/VSCodeCompatibility.md",
			note: "THE COVERAGE FIGURE, AND WHAT IT EXCLUDES"
		},
		{
			index: "03",
			path: "Source/Content/doc/introduction.md",
			note: "WHAT IS REPLACED, AND WHY"
		}
	]
};
/** The command that shows the substitution in the tree. */
var Show = {
	label: "SHOW THE SUBSTITUTION",
	language: "bash",
	lines: ["grep -n 'Electron' Source/Content/doc/cocoon.md", "grep -rn 'ElectronLiveLayer' Source/Content/doc/architecture.md"],
	source: "SOURCE/CONTENT/DOC/"
};
/** The page's bands, in reading order. */
var Bands = {
	Rows: {
		kicker: "/THE SUBSTITUTION",
		interval: "turn",
		heading: "Eight aspects, and what each one became",
		standfirst: "The table's two columns are the document's own, in its own words. The ledger under it reads the substitution: what each row changes for a reader, in four words each.",
		footnote: `SOURCE: SOURCE/CONTENT/DOC/COCOON.MD${Quad}BOTH COLUMNS ARE QUOTED, NOT SUMMARISED`,
		tone: "flush"
	},
	Measure: {
		kicker: "/THE MEASUREMENTS",
		interval: "break",
		heading: "What nobody has measured",
		standfirst: "Four of the five figures a reader wants before switching do not exist on this site, and the fifth is approximate. The table prints that rather than a verdict.",
		footnote: `88% IS WEIGHTED COVERAGE ACROSS THE MEASURED vscode.* NAMESPACES, AS OF 2026-05-23${Quad}NO PUBLIC VALIDATION MATRIX EXISTS`,
		tone: "paper"
	},
	Carries: {
		kicker: "/THE CARRIES",
		interval: "rest",
		heading: "What you keep, and how to check it",
		standfirst: "A reader switching editors is not asking which is faster, but what they lose. One answer is documented, four are not stated anywhere in this tree - and the three documents the answer comes from are beside it.",
		footnote: `SOURCE: SOURCE/CONTENT/BLOG/VSCODECOMPATIBILITY.MD${Quad}A STOP WITH NO DOCUMENT PRINTS UNAVAILABLE, NEVER A YES`,
		tone: "canvas"
	}
};
export { Columns as a, Measurements as c, Rows as d, Show as f, Check as i, Rail as l, Carries as n, MeasureColumns as o, Changes as r, Measured as s, Bands as t, Record as u };
