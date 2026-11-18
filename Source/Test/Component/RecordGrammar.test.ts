// @vitest-environment node
/**
 * The Record layer's grammar, as a test.
 *
 * Two kinds of claim, because the card makes two:
 *
 * 1. **The law holds in the tree.** Every block has a live consumer, every
 *    partial carries its slot contract, no partial sets a weight above 500, no
 *    partial carries a literal colour, and no record string separates with a
 *    middot. These are the identity tests and the "every block has at least one
 *    live consumer" reading, made checkable instead of remembered.
 * 2. **The blocks render the grammar they document.** `RecordInstrument` prints
 *    a figure with its unit and its source and a state word where the figure is
 *    not known; `RecordPair` prints one frame, two pods, one subject, one
 *    gutter; `RecordHero` prints the record in its documented order, with the
 *    blank interval between the facts and what the record asks.
 *
 * The rendering half goes through `astro/container` under the `node`
 * environment, the same harness the other `.astro` tests in this tree use, with
 * `@astrojs/react`'s server renderer registered because the instrument's state
 * word and the hero's stamp are React primitives.
 */
import fs from "node:fs";

import path from "node:path";

import Renderer from "@astrojs/react/server.js";

import { experimental_AstroContainer as AstroContainer } from "astro/container";

import { Window } from "happy-dom";

import type { Element as ParsedElement } from "happy-dom";

import { beforeAll, describe, expect, it } from "vitest";

import RecordFigure from "../../Component/Record/RecordFigure.astro";

import RecordHero from "../../Component/Record/RecordHero.astro";

import RecordInstrument from "../../Component/Record/RecordInstrument.astro";

import RecordPair from "../../Component/Record/RecordPair.astro";

import PlatformMatrix from "../../Component/Dynamic/Download/PlatformMatrix.astro";

import Requirements from "../../Component/Dynamic/Download/Requirements.astro";

const Root = process.cwd();

/** Every `.astro` block in the layer, by file name. */
const BlockFiles = (): string[] =>
	fs
		.readdirSync(path.join(Root, "Source/Component/Record"))
		.filter((Name) => Name.startsWith("Record") && Name.endsWith(".astro"))
		.sort();

/** Every partial in the layer's stylesheet directory, `_Index` excluded. */
const PartialFiles = (): string[] =>
	fs
		.readdirSync(path.join(Root, "Source/Stylesheet/System/Record"))
		.filter((Name) => Name.endsWith(".scss") && Name !== "_Index.scss")
		.sort();

/** Every file under `Source/`, so a consumer can be looked for everywhere. */
const SourceFiles = (Directory = "Source"): string[] =>
	fs
		.readdirSync(path.join(Root, Directory), { withFileTypes: true })
		.flatMap((Entry) => {
			const Relative = path.join(Directory, Entry.name);

			if (Entry.isDirectory()) {
				return Entry.name === "Test" ? [] : SourceFiles(Relative);
			}

			return /\.(astro|tsx|ts)$/.test(Entry.name) ? [Relative] : [];
		});

/** A file's text with its `//` comment lines removed, for declaration checks. */
const Declarations = (File: string): string =>
	fs
		.readFileSync(path.join(Root, File), "utf8")
		.split("\n")
		.filter((Line) => !Line.trim().startsWith("//"))
		.join("\n");

describe("the layer's law", () => {
	it("gives every block at least one live consumer", () => {
		const Consumers = SourceFiles().filter(
			(File) => !File.startsWith("Source/Component/Record/"),
		);

		const Text = Consumers.map((File) =>
			fs.readFileSync(path.join(Root, File), "utf8"),
		).join("\n");

		const Orphans = BlockFiles().filter((Name) => {
			const Base = Name.replace(/\.astro$/, "");

			return !Text.includes(`Record/${Base}.astro`);
		});

		expect(Orphans).toEqual([]);
	});

	it("documents the slot contract in every partial's header", () => {
		const Missing = PartialFiles().filter((Name) => {
			const Text = fs.readFileSync(
				path.join(Root, "Source/Stylesheet/System/Record", Name),

				"utf8",
			);

			return ["INFORMATION TYPE", "RANK", "NARROW", "DENSE"].some(
				(Key) => !Text.includes(Key),
			);
		});

		expect(Missing).toEqual([]);
	});

	it("never sets a weight above 500", () => {
		const Offenders = PartialFiles().flatMap((Name) => {
			const File = path.join("Source/Stylesheet/System/Record", Name);

			return [...Declarations(File).matchAll(/font-weight:\s*(\d+)/g)]
				.filter((Match) => Number(Match[1]) > 500)
				.map((Match) => `${File}: ${Match[0]}`);
		});

		expect(Offenders).toEqual([]);
	});

	it("never carries a literal colour", () => {
		const Offenders = PartialFiles().flatMap((Name) => {
			const File = path.join("Source/Stylesheet/System/Record", Name);

			return [...Declarations(File).matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(
				(Match) => `${File}: ${Match[0]}`,
			);
		});

		expect(Offenders).toEqual([]);
	});

	it("never separates with a middot", () => {
		const Files = [
			...BlockFiles().map((Name) => `Source/Component/Record/${Name}`),
			...PartialFiles().map(
				(Name) => `Source/Stylesheet/System/Record/${Name}`,
			),
			"Source/Component/Record/Type.ts",
		];

		const Offenders = Files.filter((File) =>
			fs.readFileSync(path.join(Root, File), "utf8").includes("\u00B7"),
		);

		expect(Offenders).toEqual([]);
	});
});

/** One render, parsed. */
const Render = async (
	Component: Parameters<typeof Container.renderToString>[0],

	Options: Parameters<typeof Container.renderToString>[1],
): Promise<ParsedElement> => {
	const Html = await Container.renderToString(Component, Options);

	const Parsed = new Window({ url: "https://editor.land/" });

	Parsed.document.body.innerHTML = Html;

	return Parsed.document.body as unknown as ParsedElement;
};

let Container: Awaited<ReturnType<typeof AstroContainer.create>>;

beforeAll(async () => {
	Container = await AstroContainer.create();

	Container.addServerRenderer({ renderer: Renderer, name: "@astrojs/react" });
});

/** Every element matching a selector, in print order. */
const All = (Selector: string, Root: ParsedElement): ParsedElement[] =>
	Array.from(Root.querySelectorAll(Selector)) as ParsedElement[];

/** One node's text, whitespace collapsed. */
const Text = (
	Node: { textContent?: string | null } | null | undefined,
): string => (Node?.textContent ?? "").replace(/\s+/g, " ").trim();

describe("RecordInstrument", () => {
	it("prints a figure with its unit and its source, and a state word where the figure is not known", async () => {
		const Page = await Render(RecordInstrument, {
			props: {
				label: "/MEASURED",
				caption: "Both figures are counted from the table under them.",
				measures: [
					{
						label: "ARTIFACTS",
						value: "0",
						unit: "PUBLISHED",
						provenance: "NO PUBLIC RELEASE EXISTS",
						lead: true,
					},
					{
						label: "SIGNATURE",
						value: "0",
						state: "unavailable",
						provenance: "NOTHING TO SIGN",
					},
				],
			},
		});

		const Measures = All(".record-instrument__measure", Page);

		expect(Measures).toHaveLength(2);

		expect(All(".record-instrument__measure--lead", Page)).toHaveLength(1);

		expect(Text(Measures[0])).toContain("ARTIFACTS:");

		expect(Text(Measures[0])).toContain("0");

		expect(Text(Measures[0])).toContain("PUBLISHED");

		expect(Text(Measures[0])).toContain("SOURCE: NO PUBLIC RELEASE EXISTS");

		// The absent figure prints the vocabulary's word, and never a unit.
		expect(Text(Measures[1])).toContain("UNAVAILABLE");

		expect(All(".record-instrument__unit", Measures[1])).toHaveLength(0);

		expect(
			Text(Page.querySelector(".record-instrument__caption")),
		).toContain("counted from the table");
	});

	it("says what would be here when it has no measures", async () => {
		const Page = await Render(RecordInstrument, {
			props: {
				measures: [],
				empty: "No figure is taken on this route yet.",
			},
		});

		expect(All(".record-instrument__measure", Page)).toHaveLength(0);

		expect(Text(Page.querySelector(".record-instrument__empty"))).toContain(
			"No figure is taken",
		);
	});
});

describe("RecordPair", () => {
	it("prints one frame, two pods, one subject and one gutter", async () => {
		const Page = await Render(RecordPair, {
			props: {
				pair: {
					left: { label: "Minimum Requirements" },
					right: { label: "Recommended", subject: true },
					caption: "The same three keys in both columns.",
					heading: "h4",
				},
			},
			slots: {
				left: "<p>minimum rows</p>",
				right: "<p>recommended rows</p>",
			},
		});

		const Pods = All(".record-pair__pod", Page);

		expect(Pods).toHaveLength(2);

		expect(All(".record-pair__gutter", Page)).toHaveLength(1);

		expect(All(".record-pair__pod--subject", Page)).toHaveLength(1);

		// The subject is the right pod, and it is marked by its title's rule.
		expect(Pods[1]?.classList.contains("record-pair__pod--subject")).toBe(
			true,
		);

		// A section-level pair prints its labels as headings at the level given.
		expect(All("h4.record-pair__label", Page)).toHaveLength(2);

		// Each pod's body is the block handed to its slot, not prose.
		expect(Text(Pods[0])).toContain("minimum rows");

		expect(Text(Pods[1])).toContain("recommended rows");

		expect(Text(Page.querySelector(".record-pair__caption"))).toContain(
			"same three keys",
		);
	});

	it("prints its labels as labels when it is an artifact, not a section", async () => {
		const Page = await Render(RecordPair, {
			props: {
				pair: {
					left: { label: "LAND", body: "Native, one process." },
					right: {
						label: "CHROMIUM",
						body: "A browser with an editor in it.",
					},
				},
			},
		});

		expect(All("h2, h3, h4", Page)).toHaveLength(0);

		expect(All(".record-pair__label", Page)).toHaveLength(2);
	});
});

describe("the layer's first consumers", () => {
	it("prints the release's figures over the table they are counted from", async () => {
		const Page = await Render(PlatformMatrix, {
			props: {
				matrix: {
					columns: [{ label: "ARCH" }, { label: "INSTALLER" }],
					rows: [
						{
							label: "〈MACOS〉",
							cells: ["AARCH64", "UNAVAILABLE"],
						},
						{
							label: "〈LINUX〉",
							cells: ["X86_64", "UNAVAILABLE"],
						},
					],
					caption:
						"Every artifact column is empty: no public release exists.",
				},
			},
		});

		// The instrument is the region's summary, above the matrix.
		expect(All(".record-instrument__measure", Page)).toHaveLength(2);

		expect(Text(Page.querySelector(".record-instrument"))).toContain(
			"ARTIFACTS:",
		);

		expect(Text(Page.querySelector(".record-instrument"))).toContain(
			"TARGETS:",
		);

		expect(Text(Page.querySelector(".record-instrument"))).toContain(
			"SOURCE:",
		);

		// The count is the table's own row count, so the two cannot disagree.
		expect(Text(Page.querySelector(".record-instrument"))).toContain("2");

		// And the matrix itself is a real table with a row label per target.
		expect(All("table tbody tr", Page)).toHaveLength(2);

		expect(All("th.record-matrix__label", Page)).toHaveLength(2);
	});

	it("reads minimum against recommended as one pair, with both ledgers inside it", async () => {
		const Page = await Render(Requirements, {
			props: {
				panels: [
					{
						label: "Minimum Requirements",
						recommended: false,
						rows: [
							{ key: "MEMORY:", value: "4 GB RAM" },
							{ key: "DISK:", value: "500 MB" },
						],
					},
					{
						label: "Recommended for the Best Experience",
						recommended: true,
						rows: [
							{ key: "MEMORY:", value: "8 GB RAM" },
							{ key: "DISK:", value: "1 GB SSD" },
						],
					},
				],
				osLabel: "Supported Operating Systems",
				operatingSystems: [
					{ name: "macOS 10.15+", note: "AARCH64 / X86_64" },
				],
				toolchain: [{ key: "RUST:", value: "1.75" }],
				toolchainLabel: "BUILD TOOLCHAIN (SOURCE)",
			},
		});

		const Pods = All(".record-pair__pod", Page);

		expect(Pods).toHaveLength(2);

		expect(All(".record-pair__gutter", Page)).toHaveLength(1);

		expect(All("h4.record-pair__label", Page)).toHaveLength(2);

		expect(Pods[1]?.classList.contains("record-pair__pod--subject")).toBe(
			true,
		);

		// Each pod's body is a real RecordLedger, not prose.
		expect(All(".record-pair__pod .record-ledger", Page)).toHaveLength(2);

		expect(Text(Pods[0])).toContain("4 GB RAM");

		expect(Text(Pods[1])).toContain("8 GB RAM");

		// The region's other two parts survive the pair.
		expect(All(".download-requirements__os-chip", Page)).toHaveLength(1);

		expect(Text(Page.querySelector(".download-requirements"))).toContain(
			"BUILD TOOLCHAIN (SOURCE)",
		);
	});

	it("frames evidence through the one fitted plate and never without a caption", async () => {
		const Page = await Render(RecordFigure, {
			props: {
				src: "/Evidence/Land/NightGlass-01.png",
				alt: "Rain-speckled glass reflecting a green light at night",
				caption: "A 404 has no evidence of its own.",
				provenance: "/EVIDENCE/LAND/NIGHTGLASS-01.PNG",
			},
		});

		expect(All(".record-figure__media img", Page)).toHaveLength(1);

		expect(All(".record-figure__caption-text", Page)).toHaveLength(1);

		expect(Text(Page.querySelector(".record-figure__provenance"))).toBe(
			"/EVIDENCE/LAND/NIGHTGLASS-01.PNG",
		);
	});

	it("gives the hero an evidence panel and its gutter when it is handed composed evidence", async () => {
		const Page = await Render(RecordHero, {
			props: {
				index: "# ROUTE_404",
				claim: "NOT FOUND",
				status: { state: "interrupted", tone: "ink" },
				metadata: [{ key: "SIGNAL:", value: "ABSENT" }],
			},
			slots: { default: "<p>composed evidence</p>" },
		});

		expect(All(".record-hero__evidence", Page)).toHaveLength(1);

		expect(All(".record-hero__gutter", Page)).toHaveLength(1);

		expect(Text(Page.querySelector(".record-hero__evidence"))).toContain(
			"composed evidence",
		);
	});
});

describe("RecordHero", () => {
	it("prints the record in its documented order, with the interval before what it asks", async () => {
		const Page = await Render(RecordHero, {
			props: {
				index: "# ROUTE_404",
				claim: "NOT FOUND",
				route: "/TRACE:/nope",
				status: { state: "interrupted", tone: "ink" },
				relation: "LAND:",
				proposition: "RETURN TO INDEX",
				metadata: [
					{ key: "SIGNAL:", value: "ABSENT" },
					{ key: "ROUTE:", value: "UNRESOLVED" },
				],
				action: { label: "BACK TO LAND", href: "/" },
			},
		});

		expect(All("h1", Page)).toHaveLength(1);

		expect(Text(Page.querySelector("h1"))).toContain("NOT FOUND");

		expect(Text(Page.querySelector(".record-hero__route"))).toContain(
			"/TRACE:/nope",
		);

		expect(Text(Page.querySelector(".record-hero__relation"))).toBe(
			"LAND:",
		);

		expect(Text(Page.querySelector(".record-hero__proposition"))).toContain(
			"RETURN TO INDEX",
		);

		// The facts come before the interval, and the interval before the ask.
		const Html = Page.innerHTML;

		expect(Html.indexOf("record-hero__facts")).toBeLessThan(
			Html.indexOf("record-hero__blank"),
		);

		expect(Html.indexOf("record-hero__blank")).toBeLessThan(
			Html.indexOf("record-hero__relation"),
		);

		// No evidence and no seal passed: no plate, no gutter, no seal.
		expect(All(".record-hero__evidence", Page)).toHaveLength(0);

		expect(All(".record-hero__gutter", Page)).toHaveLength(0);

		expect(All(".record-hero__seal", Page)).toHaveLength(0);
	});
});
