/**
 * The roadmap band: two release records, one card each.
 *
 * Each card is a release record in the same grammar as every other card on the
 * page - a marker, a mono stamp, an action, a title, then the two labelled lists
 * the release is read through: the `Elements` it carries and the `Manifest` it
 * declares.
 *
 * The stamp is a list of spans rather than a string because a stamp prints its
 * brackets, its keyword and its value in three different inks, and a string cannot
 * carry that.
 *
 * ─── THE PUNCTUATION IS A SEGMENT, NOT A SPACE ────────────────────────────
 * A stamp line used to spell its marks into the text - `" CHANNEL"`,
 * `": PUBLIC"`, `"/"` - so every space the line printed was decided by whoever
 * typed that string. That is how the same colon came to hang off the key in one
 * card and off the value in another, and the same slash came to float in one
 * line and sit against the word in the next.
 *
 * A mark is now a segment of its own (`{ Mark: "colon" }`), printed by
 * `Mark/Mark.astro` and spaced by `Mark/_Punctuation.scss` at `--mark-gap` on
 * one side. So there is no space in this file to get wrong: the data says WHICH
 * mark, and the mark layer says how much air it takes. `Manifest` is a list of
 * segments for the same reason - its rows print the same colon and the same
 * separator.
 */
import type { ReleaseCard, StampSpan } from "./Type.js";

/** The stamp's four inks: the brackets and separators, the keyword, the field
 *  label, and the value. */
const Ink = {
	Bracket: "var(--MuteForeground)",

	Key: "var(--SemanticSky)",

	Label: "var(--CardForeground)",

	Value: "var(--Accent)",
} as const;

/** One element row's link ink, per element.
 *
 *  A row's `Href` is the destination (the element's manual page), so the name is
 *  a link and carries an ink a reader can find. The four rows that carry one
 *  print in their own hue - Cocoon `--SpinegRPCFore`, Wind `--OSMacOSFore`, Sky
 *  `--SpineIPCFore`, Mountain `--SemanticRed` - and the rest fall back to
 *  `--CardForeground`. The site accent is not spent here: it authenticates a
 *  destination, and a green name among four would read as "this one is special"
 *  when all it means is "gRPC", while a muted label would be a destination a
 *  reader cannot find. */
const ElementInk: Readonly<Record<string, string>> = {
	Mountain: "var(--SemanticRed)",

	Cocoon: "var(--SpinegRPCFore)",

	Wind: "var(--OSMacOSFore)",

	Sky: "var(--SpineIPCFore)",
};

/** The element's documentation route: the site's own naming rule. */
const DocPath = (Name: string): string => `/Doc/${Name.toLowerCase()}`;

/**
 * One manifest row: a key, its colon, and its value's parts.
 *
 * The row is `KEY: VALUE`, and a value may be a list (`MACOS / WINDOWS /
 * LINUX`). Both marks are segments, so the row prints the mark layer's gap and
 * not a space this file typed: the key closes with the colon mark and the parts
 * are joined by the separator mark.
 */
const Row = (Key: string, ...Parts: readonly string[]): readonly StampSpan[] => [
	{ Text: Key },

	{ Mark: "colon" },

	...Parts.flatMap((Part, Index): readonly StampSpan[] =>
		Index === 0
			? [{ Text: Part }]
			: [{ Mark: "separator" }, { Text: Part }],
	),
];

/** The two release cards, in the order the band prints them. */
export const ReleaseCards: readonly ReleaseCard[] = [
	{
		Index: "# RELEASE_01",

		Stamp: [
			[
				{ Text: "〈", Ink: Ink.Bracket },

				{ Text: "ACTIVE SOURCE", Ink: "var(--SpinegRPCFore)" },

				{ Text: "〉", Ink: Ink.Bracket },
			],

			[
				{ Mark: "slash" },

				{ Text: "CHANNEL", Ink: Ink.Key },

				{ Mark: "colon", Ink: Ink.Key },

				{ Text: "PUBLIC", Ink: Ink.Label },
			],

			[
				{ Text: "STATUS", Ink: Ink.Label },

				{ Mark: "colon", Ink: Ink.Label },

				{ Mark: "square", Tone: "specimen", Ink: Ink.Value },

				{ Text: "ACTIVE", Ink: Ink.Value },
			],

			[
				{ Text: "TARGET" },

				{ Mark: "colon" },

				{ Text: "NATIVE DESKTOP PATH" },
			],

			[
				{ Text: "SIGNAL" },

				{ Mark: "colon" },

				{ Text: "NO CHROMIUM" },

				{ Mark: "separator" },

				{ Text: "NO ELECTRON" },

				{ Mark: "separator" },

				{ Text: "CC0" },
			],
		],

		Action: {
			Label: "VIEW ON GITHUB",

			Href: "https://github.com/CodeEditorLand/Land",
		},

		Title: "ACTIVE NOW",

		Elements: [
			{
				Name: "Mountain",

				Role: "Native Backend",

				Before: "Replaces",

				Badge: "Electron",

				After: "main process, no bundled Chromium",

				Href: DocPath("Mountain"),

				Ink: ElementInk.Mountain ?? "var(--CardForeground)",
			},

			{
				Name: "Cocoon",

				Role: "Extension Host",

				Before: "Unmodified VS Code extensions through",

				Badge: "Effect-TS",

				After: "routes",

				Href: DocPath("Cocoon"),

				Ink: ElementInk.Cocoon ?? "var(--CardForeground)",
			},

			{
				Name: "Wind",

				Role: "Workbench Shell",

				Before: "",

				Badge: "Effect-TS",

				After: "layers for native workbench services",

				Href: DocPath("Wind"),

				Ink: ElementInk.Wind ?? "var(--CardForeground)",
			},

			{
				Name: "Sky",

				Role: "UI Layer",

				Before: "",

				Badge: "Astro",

				After: "Workbench routes and WebView bridge",

				Href: DocPath("Sky"),

				Ink: ElementInk.Sky ?? "var(--CardForeground)",
			},

			{
				Name: "Air",

				Role: "Background Services",

				Before: "Updates, downloads, auth, indexing, and health",

				After: "",

				Href: DocPath("Air"),

				Ink: "var(--CardForeground)",
			},

			{
				Name: "Echo",

				Role: "Scheduler Primitives",

				Before: "Priority-aware work stealing for",

				Badge: "Rust",

				After: "services",

				Href: DocPath("Echo"),

				Ink: "var(--CardForeground)",
			},
		],

		Manifest: [
			Row("EXTENSIONS", "UNMODIFIED", "COCOON"),

			Row("WEBVIEW", "OS NATIVE", "TAURI"),

			Row("FIBERS", "CANCELLABLE SERVICE WORK"),

			Row("TELEMETRY", "COMPILE-GATED", "RUST"),

			Row("LICENSE", "CC0", "NO RESTRICTIONS"),

			Row("TARGETS", "MACOS", "WINDOWS", "LINUX"),
		],
	},

	{
		Index: "# RELEASE_02",

		Stamp: [
			[
				{ Text: "〈", Ink: Ink.Bracket },

				{ Text: "INTEGRATION", Ink: "var(--SpineIPCFore)" },

				{ Text: "〉", Ink: Ink.Bracket },
			],

			[
				{ Mark: "slash" },

				{ Text: "CHANNEL", Ink: Ink.Key },

				{ Mark: "colon", Ink: Ink.Key },

				{ Text: "PUBLIC", Ink: Ink.Label },
			],

			[
				{ Text: "STATUS", Ink: Ink.Label },

				{ Mark: "colon", Ink: Ink.Label },

				{ Text: "LOADING", Ink: "var(--MuteForeground)" },
			],

			[
				{ Text: "TARGET" },

				{ Mark: "colon" },

				{ Text: "V1.0" },
			],

			[
				{ Text: "SIGNAL" },

				{ Mark: "colon" },

				{ Text: "SIGNED INSTALLERS" },

				{ Mark: "separator" },

				{ Text: "VERIFIED DOWNLOADS" },
			],
		],

		Action: {
			Label: "TRACK PROGRESS",

			Href: "https://github.com/CodeEditorLand/Land/milestones",
		},

		Title: "V1.0",

		Elements: [
			{
				Name: "Vine",

				Role: "Protocol Backbone",

				Before: "Canonical contract; streaming multiplexer expanding",

				After: "",

				Href: DocPath("Vine"),

				Ink: "var(--CardForeground)",
			},

			{
				Name: "Cocoon",

				Role: "Extension Compatibility Pass",

				Before: "Long-tail VS Code API coverage",

				After: "",

				Href: DocPath("Cocoon"),

				Ink: ElementInk.Cocoon ?? "var(--CardForeground)",
			},

			{
				Name: "Grove",

				Role: "Sandbox",

				Before: "",

				Badge: "WASM",

				After: "Wasmtime capability-based isolation, active",

				Href: DocPath("Grove"),

				Ink: "var(--CardForeground)",
			},

			{
				Name: "Rest",

				Role: "Compilation Pipeline",

				Before: "",

				Badge: "OXC",

				After: "compile, bundling coverage expanding",

				Href: DocPath("Rest"),

				Ink: "var(--CardForeground)",
			},

			{
				Name: "Echo",

				Role: "Scheduler Optimization",

				Before: "Priority-aware work stealing, tuning in progress",

				After: "",

				Href: DocPath("Echo"),

				Ink: "var(--CardForeground)",
			},

			{
				Name: "Air",

				Role: "Release Delivery",

				Before: "Signing and distribution path",

				After: "",

				Href: DocPath("Air"),

				Ink: "var(--CardForeground)",
			},
		],

		Manifest: [
			Row("MARKETPLACE", "UNDER REVIEW"),

			Row("COCOON", "LONG-TAIL API COVERAGE"),

			Row("VINE", "TYPED IPC", "EXPANDING"),

			Row("INSTALLERS", "CROSS-PLATFORM", "TAURI"),

			Row("ECHO", "WORK-STEALING", "TUNING"),

			Row("DISTRIBUTION", "VERIFICATION PUBLISHING"),
		],
	},
];
