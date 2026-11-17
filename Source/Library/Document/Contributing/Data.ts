/**
 * Contributing - the Contributing page's own rows.
 *
 * Three lists, and the third is the reason this file exists: the page describes
 * a process in prose, and a process is data. A stage is a label and one line; a
 * well is a command and its label. The page maps them through `T` at render
 * time - this module holds the keys and the English defaults, never the i18n
 * client, so a locale change is a JSON change and nothing here moves.
 *
 * The four stages are the page's own four steps, in the page's own order, with
 * the page's own titles. The command blocks are the two `<pre>` blocks the page
 * already carried, in the stages that own them.
 *
 * The test step is the page's own sentence, promoted to a step: `Ways to
 * Contribute` already tells a reader "Write tests, reproduce reported bugs, or
 * help triage open issues", and the sequence the page describes (fork, build,
 * change, submit) only reads as a sequence once the reader knows what to run
 * before opening the pull request. It carries no command block, because the page
 * carries no test command - inventing one would be inventing a procedure.
 */
import type { ReadingIndexItem } from "../../../Component/Reading/Type.js";
import type { LedgerRow, Stage } from "../../../Component/Record/Type.js";

export const Ledger: readonly LedgerRow[] = [
	{
		key: "VERSION",
		value: "Current branch",
		note: "a pull request targets it",
	},
	{
		key: "APPLIES TO",
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

/** One stage row plus the i18n key pair the page resolves it from. */
export interface ProcessRow {
	readonly index: string;
	readonly titleKey: string;
	readonly title: string;
	readonly lineKey: string;
	readonly line: string;
}

/** One command block plus the i18n key pair its bar label is resolved from. */
export interface WellRow {
	readonly titleKey: string;
	readonly title: string;
	readonly language: string;
	readonly lines: readonly string[];
}

export const Process: readonly ProcessRow[] = [
	{
		index: "01",
		titleKey: "common.contributing.step1.title",
		title: "Fork and Clone",
		lineKey: "common.contributing.step1.description",
		line: "Fork the Land repository on GitHub and clone it locally with submodules:",
	},
	{
		index: "02",
		titleKey: "common.contributing.step2.title",
		title: "Set Up the Environment",
		lineKey: "common.contributing.step2.description",
		line: "Install Rust nightly and Node.js 24. Then compile the VS Code Editor submodule first (see Installation guide), then run:",
	},
	{
		index: "03",
		titleKey: "common.contributing.step3.title",
		title: "Make Your Changes",
		lineKey: "common.contributing.step3.description",
		line: "Create a branch, make your changes, and follow the PascalCase naming convention used throughout the project.",
	},
	{
		index: "04",
		titleKey: "common.contributing.stepTest.title",
		title: "Test",
		lineKey: "common.contributing.stepTest.description",
		line: "Write tests, reproduce reported bugs, or help triage open issues.",
	},
	{
		index: "05",
		titleKey: "common.contributing.step4.title",
		title: "Submit a Pull Request",
		lineKey: "common.contributing.step4.description",
		line: "Push your branch and open a pull request against the Current branch.\n\nDescribe what changed and why. One sentence is enough.",
	},
];

export const Wells: readonly WellRow[] = [
	{
		titleKey: "common.contributing.step1.title",
		title: "Fork and Clone",
		language: "sh",
		lines: [
			"git clone --recurse-submodules https://github.com/YOUR_USERNAME/Land.git",
		],
	},
	{
		titleKey: "common.contributing.step2.title",
		title: "Set Up the Environment",
		language: "sh",
		lines: [
			"cd Land && pnpm install && ./Maintain/Debug/Build.sh --profile debug-electron-bundled",
		],
	},
];

/**
 * Resolve the process rows into the block's own shape. The page passes its `T`;
 * this module never imports the i18n client, and the stage order is the array's
 * order, so nothing here sorts.
 */
export const ResolveStages = (
	Rows: readonly ProcessRow[],
	Translate: (Key: string, Default: string) => string,
): readonly Stage[] =>
	Rows.map((Row) => ({
		index: Row.index,
		label: Translate(Row.titleKey, Row.title),
		line: Translate(Row.lineKey, Row.line),
	}));
