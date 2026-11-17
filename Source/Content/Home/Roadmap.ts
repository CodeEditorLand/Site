/**
 * The roadmap band: two release records, one card each.
 *
 * Each card is a release record in the same grammar as every other card on the
 * page - a marker, a mono stamp, an action, a title, then the two labelled lists
 * the release is read through: the `Elements` it carries and the `Manifest` it
 * declares.
 *
 * The stamp is a list of spans rather than a string because the baseline printed
 * a stamp's brackets, its keyword and its value in three different inks, and a
 * string cannot carry that. The manifest lines are single strings: each one is a
 * complete `KEY: VALUE` row and it prints as one.
 */
import type { ReleaseCard } from "./Type.js";

/** The ink a manifest row's value is printed in - the record's own. */
const Ink = {
	Bracket: "var(--MuteForeground)",
	Key: "var(--SemanticSky)",
	Label: "var(--CardForeground)",
	Value: "var(--Accent)",
} as const;

/** One element row's link ink, per element. */
const ElementInk: Readonly<Record<string, string>> = {
	Mountain: "var(--SemanticRed)",
	Cocoon: "var(--Accent)",
	Wind: "var(--MuteForeground)",
	Sky: "var(--SpineIPCFore)",
};

/** The element's documentation route: the site's own naming rule. */
const DocPath = (Name: string): string => `/Doc/${Name.toLowerCase()}`;

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
				{ Text: "/", Ink: Ink.Bracket },
				{ Text: "CHANNEL", Ink: Ink.Key },
				{ Text: ": PUBLIC", Ink: Ink.Label },
			],
			[
				{ Text: "STATUS:", Ink: Ink.Label },
				{ Text: "ACTIVE", Ink: Ink.Value },
			],
			[{ Text: "TARGET: NATIVE DESKTOP PATH" }],
			[{ Text: "SIGNAL: NO CHROMIUM / NO ELECTRON / CC0" }],
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
			"EXTENSIONS: UNMODIFIED / COCOON",
			"WEBVIEW: OS NATIVE / TAURI",
			"FIBERS: CANCELLABLE SERVICE WORK",
			"TELEMETRY: COMPILE-GATED / RUST",
			"LICENSE: CC0 / NO RESTRICTIONS",
			"TARGETS: MACOS / WINDOWS / LINUX",
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
				{ Text: "/", Ink: Ink.Bracket },
				{ Text: "CHANNEL", Ink: Ink.Key },
				{ Text: ": PUBLIC", Ink: Ink.Label },
			],
			[
				{ Text: "STATUS:", Ink: Ink.Label },
				{ Text: "LOADING", Ink: "var(--MuteForeground)" },
			],
			[{ Text: "TARGET: V1.0" }],
			[{ Text: "SIGNAL: SIGNED INSTALLERS / VERIFIED DOWNLOADS" }],
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
			"MARKETPLACE: UNDER REVIEW",
			"COCOON: LONG-TAIL API COVERAGE",
			"VINE: TYPED IPC / EXPANDING",
			"INSTALLERS: CROSS-PLATFORM / TAURI",
			"ECHO: WORK-STEALING / TUNING",
			"DISTRIBUTION: VERIFICATION PUBLISHING",
		],
	},
];
