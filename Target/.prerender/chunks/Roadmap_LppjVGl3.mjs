// Source/Content/Home/Platform.ts
/** The three platform cards, in the order the band prints them. */
var PlatformCards = [
	{
		Index: "# RELEASE_01",
		Name: "macOS",
		Ink: "var(--OSMacOS)",
		Icon: "Apple",
		Architecture: "Universal Binary: Apple Silicon and Intel",
		Channel: "PUBLIC",
		Version: "UNAVAILABLE",
		Size: "UNAVAILABLE",
		Signing: "IN PREPARATION",
		Webview: "WKWEBVIEW",
		Minimum: "MACOS 10.15+",
		Checksum: "UNAVAILABLE",
		Toolchain: "RUST 1.95.0+",
		Note: "NO PUBLIC ARTIFACT: NOTHING TO VERSION, SIZE OR DIGEST.",
		Action: {
			Label: "Download for macOS",
			Href: "/Download"
		},
		Status: {
			Label: "STATUS:",
			Value: "PREPARING"
		}
	},
	{
		Index: "# RELEASE_01",
		Name: "Windows",
		Ink: "var(--OSWindows)",
		Icon: "Monitor",
		Architecture: "64-bit (x64)",
		Channel: "PUBLIC",
		Version: "UNAVAILABLE",
		Size: "UNAVAILABLE",
		Signing: "IN PREPARATION",
		Webview: "WEBVIEW2",
		Minimum: "WINDOWS 10+",
		Checksum: "UNAVAILABLE",
		Toolchain: "RUST 1.95.0+",
		Note: "NO PUBLIC ARTIFACT: NOTHING TO VERSION, SIZE OR DIGEST.",
		Action: {
			Label: "Download for Windows",
			Href: "/Download"
		},
		Status: {
			Label: "STATUS:",
			Value: "PREPARING"
		}
	},
	{
		Index: "# RELEASE_01",
		Name: "Linux",
		Ink: "var(--OSLinux)",
		Icon: "Terminal",
		Architecture: "64-bit (DEB, RPM, AppImage)",
		Channel: "PUBLIC",
		Version: "UNAVAILABLE",
		Size: "UNAVAILABLE",
		Signing: "IN PREPARATION",
		Webview: "WEBKITGTK",
		Minimum: "UBUNTU / DEBIAN / FEDORA",
		Checksum: "UNAVAILABLE",
		Toolchain: "RUST 1.95.0+",
		Note: "NO PUBLIC ARTIFACT: NOTHING TO VERSION, SIZE OR DIGEST.",
		Action: {
			Label: "Download for Linux",
			Href: "/Download"
		},
		Status: {
			Label: "STATUS:",
			Value: "PREPARING"
		}
	}
];
// Source/Content/Home/Roadmap.ts
/** The stamp's four inks: the brackets and separators, the keyword, the field
*  label, and the value. */
var Ink = {
	Bracket: "var(--MuteForeground)",
	Key: "var(--SemanticSky)",
	Label: "var(--CardForeground)",
	Value: "var(--Accent)"
};
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
var ElementInk = {
	Mountain: "var(--SemanticRed)",
	Cocoon: "var(--SpinegRPCFore)",
	Wind: "var(--OSMacOSFore)",
	Sky: "var(--SpineIPCFore)"
};
/** The element's documentation route: the site's own naming rule. */
var DocPath = (Name) => `/Doc/${Name.toLowerCase()}`;
/** The two release cards, in the order the band prints them. */
var ReleaseCards = [{
	Index: "# RELEASE_01",
	Stamp: [
		[
			{
				Text: "〈",
				Ink: Ink.Bracket
			},
			{
				Text: "ACTIVE SOURCE",
				Ink: "var(--SpinegRPCFore)"
			},
			{
				Text: "〉",
				Ink: Ink.Bracket
			}
		],
		[
			{
				Text: "/",
				Ink: Ink.Bracket
			},
			{
				Text: "CHANNEL",
				Ink: Ink.Key
			},
			{
				Text: ": PUBLIC",
				Ink: Ink.Label
			}
		],
		[{
			Text: "STATUS:",
			Ink: Ink.Label
		}, {
			Text: "ACTIVE",
			Ink: Ink.Value
		}],
		[{ Text: "TARGET: NATIVE DESKTOP PATH" }],
		[{ Text: "SIGNAL: NO CHROMIUM / NO ELECTRON / CC0" }]
	],
	Action: {
		Label: "VIEW ON GITHUB",
		Href: "https://github.com/CodeEditorLand/Land"
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
			Ink: ElementInk.Mountain ?? "var(--CardForeground)"
		},
		{
			Name: "Cocoon",
			Role: "Extension Host",
			Before: "Unmodified VS Code extensions through",
			Badge: "Effect-TS",
			After: "routes",
			Href: DocPath("Cocoon"),
			Ink: ElementInk.Cocoon ?? "var(--CardForeground)"
		},
		{
			Name: "Wind",
			Role: "Workbench Shell",
			Before: "",
			Badge: "Effect-TS",
			After: "layers for native workbench services",
			Href: DocPath("Wind"),
			Ink: ElementInk.Wind ?? "var(--CardForeground)"
		},
		{
			Name: "Sky",
			Role: "UI Layer",
			Before: "",
			Badge: "Astro",
			After: "Workbench routes and WebView bridge",
			Href: DocPath("Sky"),
			Ink: ElementInk.Sky ?? "var(--CardForeground)"
		},
		{
			Name: "Air",
			Role: "Background Services",
			Before: "Updates, downloads, auth, indexing, and health",
			After: "",
			Href: DocPath("Air"),
			Ink: "var(--CardForeground)"
		},
		{
			Name: "Echo",
			Role: "Scheduler Primitives",
			Before: "Priority-aware work stealing for",
			Badge: "Rust",
			After: "services",
			Href: DocPath("Echo"),
			Ink: "var(--CardForeground)"
		}
	],
	Manifest: [
		"EXTENSIONS: UNMODIFIED / COCOON",
		"WEBVIEW: OS NATIVE / TAURI",
		"FIBERS: CANCELLABLE SERVICE WORK",
		"TELEMETRY: COMPILE-GATED / RUST",
		"LICENSE: CC0 / NO RESTRICTIONS",
		"TARGETS: MACOS / WINDOWS / LINUX"
	]
}, {
	Index: "# RELEASE_02",
	Stamp: [
		[
			{
				Text: "〈",
				Ink: Ink.Bracket
			},
			{
				Text: "INTEGRATION",
				Ink: "var(--SpineIPCFore)"
			},
			{
				Text: "〉",
				Ink: Ink.Bracket
			}
		],
		[
			{
				Text: "/",
				Ink: Ink.Bracket
			},
			{
				Text: "CHANNEL",
				Ink: Ink.Key
			},
			{
				Text: ": PUBLIC",
				Ink: Ink.Label
			}
		],
		[{
			Text: "STATUS:",
			Ink: Ink.Label
		}, {
			Text: "LOADING",
			Ink: "var(--MuteForeground)"
		}],
		[{ Text: "TARGET: V1.0" }],
		[{ Text: "SIGNAL: SIGNED INSTALLERS / VERIFIED DOWNLOADS" }]
	],
	Action: {
		Label: "TRACK PROGRESS",
		Href: "https://github.com/CodeEditorLand/Land/milestones"
	},
	Title: "V1.0",
	Elements: [
		{
			Name: "Vine",
			Role: "Protocol Backbone",
			Before: "Canonical contract; streaming multiplexer expanding",
			After: "",
			Href: DocPath("Vine"),
			Ink: "var(--CardForeground)"
		},
		{
			Name: "Cocoon",
			Role: "Extension Compatibility Pass",
			Before: "Long-tail VS Code API coverage",
			After: "",
			Href: DocPath("Cocoon"),
			Ink: ElementInk.Cocoon ?? "var(--CardForeground)"
		},
		{
			Name: "Grove",
			Role: "Sandbox",
			Before: "",
			Badge: "WASM",
			After: "Wasmtime capability-based isolation, active",
			Href: DocPath("Grove"),
			Ink: "var(--CardForeground)"
		},
		{
			Name: "Rest",
			Role: "Compilation Pipeline",
			Before: "",
			Badge: "OXC",
			After: "compile, bundling coverage expanding",
			Href: DocPath("Rest"),
			Ink: "var(--CardForeground)"
		},
		{
			Name: "Echo",
			Role: "Scheduler Optimization",
			Before: "Priority-aware work stealing, tuning in progress",
			After: "",
			Href: DocPath("Echo"),
			Ink: "var(--CardForeground)"
		},
		{
			Name: "Air",
			Role: "Release Delivery",
			Before: "Signing and distribution path",
			After: "",
			Href: DocPath("Air"),
			Ink: "var(--CardForeground)"
		}
	],
	Manifest: [
		"MARKETPLACE: UNDER REVIEW",
		"COCOON: LONG-TAIL API COVERAGE",
		"VINE: TYPED IPC / EXPANDING",
		"INSTALLERS: CROSS-PLATFORM / TAURI",
		"ECHO: WORK-STEALING / TUNING",
		"DISTRIBUTION: VERIFICATION PUBLISHING"
	]
}];
export { PlatformCards as n, ReleaseCards as t };
