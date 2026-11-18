/**
 * Contributing - the Contributing page's own rows.
 *
 * Two lists, and the second is the reason this file exists: the page describes a
 * process, and a process is data. A step is a number, a title, one line and -
 * where the step needs one - the command it runs. The page maps the rows through
 * `T` at render time; this module holds the keys and the English defaults, never
 * the i18n client, so a locale change is a JSON change and nothing here moves.
 *
 * The four steps are the baseline render's four steps, in its order, with its
 * own titles and its own two command blocks: fork and clone, set up the
 * environment, make the changes, open the pull request. A fifth step (Test) was
 * added during the programme and is not restored - its sentence already renders
 * in `Ways to Contribute` under Testing, so the sequence reads exactly as the
 * page always read.
 */
import type { ReadingIndexItem } from "../../../Component/Reading/Type.js";

import type { LedgerRow } from "../../../Component/Record/Type.js";

export const Ledger: readonly LedgerRow[] = [
	{
		key: "VERSION:",

		value: "Current branch",

		note: "a pull request targets it",
	},

	{
		key: "APPLIES TO:",

		value: "The Land repository on GitHub",

		note: "open source and built in public",
	},
];

export const Index: readonly ReadingIndexItem[] = [
	{ number: "01", label: "Quick Links", href: "#quick-links" },

	{ number: "02", label: "How to Contribute", href: "#how-to-contribute" },

	{
		number: "03",

		label: "Fifteen Elements, One Editor",

		href: "#fifteen-elements-one-editor",
	},

	{ number: "04", label: "Ways to Contribute", href: "#ways-to-contribute" },

	{ number: "05", label: "Funding", href: "#funding" },

	{ number: "06", label: "Code of Conduct", href: "#code-of-conduct" },
];

/** One step row plus the i18n key pair the page resolves it from. */
export interface ProcessRow {
	/** The step's number, printed as the baseline printed it: `1`-`4`. */
	readonly index: string;

	/** The i18n key for the step's title. */
	readonly titleKey: string;

	/** The English default for the step's title. */
	readonly title: string;

	/** The i18n key for the step's one line. */
	readonly lineKey: string;

	/** The English default for the step's one line, already carrying its links. */
	readonly line: string;

	/** The command the step runs, where the step runs one. */
	readonly command?: string;
}

export const Process: readonly ProcessRow[] = [
	{
		index: "1",

		titleKey: "common.contributing.step1.title",

		title: "Fork and Clone",

		lineKey: "common.contributing.step1.description",

		line: "Fork the Land repository on GitHub and clone it locally with submodules:",

		command:
			"git clone --recurse-submodules https://github.com/YOUR_USERNAME/Land.git",
	},

	{
		index: "2",

		titleKey: "common.contributing.step2.title",

		title: "Set Up the Environment",

		lineKey: "common.contributing.step2.description",

		line: "Install Rust nightly and Node.js 24. Then compile the VS Code Editor submodule first (see Installation guide), then run:",

		command:
			"cd Land && pnpm install && ./Maintain/Debug/Build.sh --profile debug-electron-bundled",
	},

	{
		index: "3",

		titleKey: "common.contributing.step3.title",

		title: "Make Your Changes",

		lineKey: "common.contributing.step3.description",

		line: "Create a branch, make your changes, and follow the PascalCase naming convention used throughout the project.",
	},

	{
		index: "4",

		titleKey: "common.contributing.step4.title",

		title: "Submit a Pull Request",

		lineKey: "common.contributing.step4.description",

		line: "Push your branch and open a pull request against the Current branch.\n\nDescribe what changed and why. One sentence is enough.",
	},
];

/** One step as the page renders it: the row's own fields, already translated. */
export interface Step {
	/** The step's number, printed verbatim. */
	readonly index: string;

	/** The step's title, printed as its `h3`. */
	readonly title: string;

	/** The step's one line, carrying the site's inline term links. */
	readonly line: string;

	/** The command the step runs, where the step runs one. */
	readonly command?: string;
}

/**
 * Resolve the process rows into the page's own shape. The page passes its `T`;
 * this module never imports the i18n client, and the step order is the array's
 * order, so nothing here sorts.
 */
export const ResolveSteps = (
	Rows: readonly ProcessRow[],

	Translate: (Key: string, Default: string) => string,
): readonly Step[] =>
	Rows.map((Row) => ({
		index: Row.index,
		title: Translate(Row.titleKey, Row.title),
		line: Translate(Row.lineKey, Row.line),
		command: Row.command,
	}));
