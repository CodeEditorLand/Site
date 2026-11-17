/**
 * Data - every row, label and ordering the Download page renders.
 *
 * The template composes; this module decides. Nothing here reads the DOM, holds
 * React or imports the i18n client: the page's copy arrives through a resolver
 * the caller passes in, and every other table is a constant lifted verbatim out
 * of the files it came from. Each value below names its source in the comment
 * above it, so a figure on the page can be traced back to the file that states
 * it.
 *
 * Three tables, in page order: the masthead's eight marks, the release
 * manifest's three platform entries, and the disclosure section's content. The
 * manifest is ordered by the baseline render - index, platform stamp, channel
 * route, `ARCH:`, `SIGNING:`, `SIZE:`, `CHECKSUM:`, status, action - and not by
 * the design document's longer field list, because a field the tree cannot fill
 * is a field this page would have to invent a value for.
 */
import type TransparencyContent from "../Interface/Content/Transparency.js";

import type {
	ManifestCopy,
	ManifestPlatform,
	Mark,
	Translate,
} from "./Type.js";

// ─── The masthead strip ───────────────────────────────────────────────────
// Eight marks the page carried before this card, in the order it carried them.
// `Source/pages/Download.astro` supplied the words; the fill and ink token names
// are the ones that file resolved, moved here so the markup loops instead of
// repeating eight near-identical badges.

export const Marks: readonly Mark[] = [
	{
		label: "Telemetry Feature Gated",
		variant: "mint",
		fill: "SpinegRPCMute",
		ink: "SpinegRPCFore",
		dot: "SpinegRPC",
	},
	{
		label: "CC0 Licensed",
		variant: "mint",
		fill: "SpinegRPCMute",
		ink: "SpinegRPCFore",
	},
	{
		label: "Signing Planned",
		variant: "platinum",
		fill: "Mute",
		ink: "MuteForeground",
	},
	{
		label: "Native Rust",
		variant: "azure",
		fill: "SpineIPCMute",
		ink: "SpineIPCFore",
		glyph: { src: "/Image/Rust.svg", alt: "" },
	},
	{
		label: "Tauri",
		variant: "amber",
		fill: "ExtensionTauriMute",
		ink: "ExtensionTauriFore",
		glyph: { src: "/Image/Tauri.svg", alt: "" },
	},
	{
		label: "Effect-TS",
		variant: "platinum",
		fill: "ExtensionEffectTypeScriptMute",
		ink: "ExtensionEffectTypeScriptFore",
		glyph: { src: "/Image/EffectTS.svg", alt: "" },
	},
	{
		label: "macOS + Windows + Linux Targets",
		variant: "platinum",
		fill: "Mute",
		ink: "MuteForeground",
	},
	{
		label: "Unmodified Extensions",
		variant: "platinum",
		fill: "Mute",
		ink: "MuteForeground",
	},
];

// ─── The release manifest band's opening ──────────────────────────────────
// The baseline's band header: the eyebrow and the heading carry the same two
// words, and the sentence under them states the release's condition without
// promising a download that does not exist.

export function Manifest(T: Translate): ManifestCopy {
	return {
		eyebrow: T("download:manifest.title", {
			defaultValue: "Release Manifest",
		}),

		heading: T("download:manifest.heading", {
			defaultValue: "Release Manifest",
		}),

		sentence: T("download:manifest.subtitle", {
			defaultValue:
				"Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.",
		}),
	};
}

/**
 * The four field labels a platform card prints, with their colons.
 *
 * They are labels rather than values, so they live here once and every card
 * reads the same four - a field renamed on one platform and not another is the
 * kind of drift a shared label table makes impossible. The colon is part of the
 * label because the site's grammar writes a field as `KEY:` and a label without
 * one is a word the reader has to interpret.
 */
export function FieldLabels(T: Translate): {
	readonly arch: string;
	readonly signing: string;
	readonly size: string;
	readonly checksum: string;
} {
	return {
		arch: T("download:platform.field.arch", { defaultValue: "ARCH:" }),
		signing: T("download:platform.field.signing", {
			defaultValue: "SIGNING:",
		}),
		size: T("download:platform.field.size", { defaultValue: "SIZE:" }),
		checksum: T("download:platform.field.checksum", {
			defaultValue: "CHECKSUM:",
		}),
	};
}

/**
 * The three platforms, in the order the manifest lists them.
 *
 * Every value is the baseline's own: `AARCH64 / X86_64` for macOS and `X86_64`
 * for the other two, `IN PREPARATION` for every signing row, and the baseline's
 * `-` for a size and a checksum that have not been published. The `-` is this
 * page's word for "there is no artifact yet", and it is deliberately not a
 * figure: no version, no checksum and no release date is invented here.
 *
 * The state line follows the baseline's own division: the platform with a
 * published source-build path is `ACTIVE` and prints its value in the accent
 * green; the two without one are `PREPARING` and print in ink. Those two then
 * close on a second line, the baseline's plain `STATUS: RELEASE PREPARATION`
 * sentence - the record states its state, and the sentence under it says what
 * that state means for a reader looking for an installer.
 */
export function ManifestPlatforms(T: Translate): readonly ManifestPlatform[] {
	/** The baseline's word for a field with no published value. */
	const Pending = "-";

	/**
	 * A platform with no published build path. Windows and Linux differ only in
	 * their name, so the entry is a function of it: the same `X86_64` target, the
	 * same unsigned state, the same channel, the same two-line close, and no
	 * action - because there is nowhere yet to send the reader.
	 */
	const Preparing = (name: string): ManifestPlatform => ({
		name,
		arch: "X86_64",
		signing: "IN PREPARATION",
		size: Pending,
		checksum: Pending,
		channel: "PUBLIC",
		state: {
			copy: T("download:platform.status.preparing", {
				defaultValue: "STATUS: PREPARING",
			}),
			status: "preparing",
			tone: "ink",
		},
		note: T("download:platform.note.preparation", {
			defaultValue: "STATUS: RELEASE PREPARATION",
		}),
	});

	return [
		{
			name: "macOS",
			arch: "AARCH64 / X86_64",
			signing: "IN PREPARATION",
			size: Pending,
			checksum: Pending,
			channel: "PUBLIC",
			state: {
				copy: T("download:platform.status.active", {
					defaultValue: "STATUS: ACTIVE",
				}),
				status: "active",
				tone: "specimen",
			},
			action: {
				label: "VIEW SOURCE BUILDS",
				href: "https://github.com/CodeEditorLand/Land/releases",
			},
		},
		Preparing("Windows"),
		Preparing("Linux"),
	];
}

/**
 * The disclosure section's content: six telemetry policy items, nine named build
 * profiles, sixteen test permutations, four deployment strategies with their
 * commands, and the source URL.
 *
 * It lives here rather than in the page because it is data: the island that
 * renders it (`DynamicTransparency`) is a `.tsx` component this page does not
 * own, and every string below is the copy the page has always carried -
 * unchanged, including the inline code terms the island's `RichText` turns into
 * chips.
 */
export function Transparency(T: Translate): TransparencyContent {
	return {
		Title: T("download:transparency.title", {
			defaultValue: "Telemetry Is Compile-Gated in Land.",
		}),

		Subtitle: T("download:transparency.subtitle", {
			defaultValue:
				"Telemetry and tracing are behind named Rust feature gates in the native layer. Nothing is emitted by default. Each build profile explicitly lists which paths are compiled in.",
		}),

		Policy: [
			{
				Identifier: "no-telemetry-default",
				Title: "Compile-gated by default.",
				Description:
					"Telemetry and tracing code lives behind `cfg(feature)` gates. In a standard build those paths are not compiled in - no collection, no emission, no runtime cost.",
				Icon: "EyeOff",
				Status: "Disabled",
				Detail: "Telemetry feature paths are excluded from the default build profile.",
			},
			{
				Identifier: "no-crash-reporter",
				Title: "No Microsoft endpoint dependency.",
				Description:
					"Land is built from a CC0 Code-OSS base with Microsoft service dependencies removed or replaced. The crash reporter, update service, and marketplace endpoints are all replaced with Land-owned wiring or left unconnected.",
				Icon: "Shield",
				Status: "Disabled",
				Detail: "CC0-licensed Code-OSS base with Land-owned service wiring.",
			},
			{
				Identifier: "no-phone-home",
				Title: "Three separate systems, three separate controls.",
				Description:
					"Website analytics, account authentication, and editor telemetry are independent systems. Each is controlled by its own feature flag or environment configuration - none of the three implies the others are active.",
				Icon: "Lock",
				Status: "Disabled",
			},
			{
				Identifier: "zero-cost-noop",
				Title: "Disabled feature paths stay out of the runtime.",
				Description:
					"Rust `cfg(feature)` gates eliminate disabled code paths at compile time, not just at runtime. A published build profile is a verifiable record of exactly which features were included.",
				Icon: "Zap",
				Status: "Active",
				Detail: "Rust cfg(feature) gates eliminate dead code at compile time.",
			},
			{
				Identifier: "opt-in-otel",
				Title: "Need traces? Opt in. Your infrastructure only.",
				Description:
					"OpenTelemetry tracing is available in source and activates only when a deployment explicitly enables it with a named feature flag and a configured endpoint. Trace data goes to your infrastructure.",
				Icon: "Eye",
				Status: "Optional",
				Detail: "cargo build --features Telemetry\nSub-features: MetricsCollection, DistributedTracing.",
			},
			{
				Identifier: "effect-ts-local",
				Title: "Extension host timing stays in the process.",
				Description:
					"Cocoon has internal timing and service diagnostics for extension-host work. Unless a transport is configured, that data is local process instrumentation rather than an external product-analytics claim.",
				Icon: "Layers",
				Status: "Active",
				Detail: "Effect-TS TelemetryService with TelemetryMock layer for zero-overhead testing.",
			},
		],

		Variant: [
			{
				Identifier: "debug",
				Name: "debug",
				Tier: "Debug",
				Workbench: "Browser",
				Feature: "Browser UI",
				Status: "Available",
			},
			{
				Identifier: "debug-mountain",
				Name: "debug-mountain",
				Tier: "Debug",
				Workbench: "Mountain",
				Feature: "Mountain UI",
				Status: "Recommended",
			},
			{
				Identifier: "debug-electron",
				Name: "debug-electron",
				Tier: "Debug",
				Workbench: "Electron",
				Feature: "Legacy Check",
				Status: "Legacy",
			},
			{
				Identifier: "production",
				Name: "production",
				Tier: "Release",
				Workbench: "Mountain",
				Feature: "Release Path",
				Status: "Recommended",
			},
			{
				Identifier: "release",
				Name: "release",
				Tier: "Release",
				Workbench: "Mountain",
				Feature: "Bundle Path",
				Status: "Available",
			},
			{
				Identifier: "web-browser",
				Name: "web-browser",
				Tier: "Release",
				Workbench: "Browser",
				Feature: "Web Path",
				Status: "Available",
			},
			{
				Identifier: "bundler-preparation",
				Name: "bundler-preparation",
				Tier: "Build",
				Workbench: "-",
				Feature: "-",
				Status: "Available",
			},
			{
				Identifier: "swc-bundle",
				Name: "swc-bundle",
				Tier: "Build",
				Workbench: "-",
				Feature: "-",
				Status: "Experimental",
			},
			{
				Identifier: "oxc-bundle",
				Name: "oxc-bundle",
				Tier: "Build",
				Workbench: "-",
				Feature: "-",
				Status: "Experimental",
			},
		],

		Strategy: [
			{
				Identifier: "dev-hot-reload",
				Name: "Development",
				Description:
					"Change a file, see it instantly. Hot-reload in Tauri with the Sky dev server. No manual rebuilds needed.",
				Icon: "Zap",
				Command: "bash Maintain/Dev-Mountain.sh",
				Feature: [
					"Hot Reload",
					"Instant Preview",
					"Development Server",
					"No Bundling",
				],
			},
			{
				Identifier: "debug-build",
				Name: "Debug Build",
				Description:
					"Full debug symbols for stepping through code. Three profiles: Browser, Mountain, and Electron.",
				Icon: "Code",
				Command:
					"bash Maintain/Debug/Build.sh --profile debug-mountain",
				Feature: [
					"Debug Symbols",
					"3 Profiles",
					"Source Maps",
					"File Watch",
				],
			},
			{
				Identifier: "production-release",
				Name: "Release Build",
				Description:
					"Optimized release packaging path. Public signing and verification artifacts are still being prepared.",
				Icon: "Server",
				Command: "bash Maintain/Release/Build.sh --profile production",
				Feature: [
					"Optimized",
					"Signing Planned",
					"Clean Build",
					"Packaged",
				],
			},
			{
				Identifier: "web-only",
				Name: "Web Deployment",
				Description:
					"Run Land in the browser without installing anything. No native shell needed.",
				Icon: "Layers",
				Command: "bash Maintain/Release.sh --profile web-browser",
				Feature: [
					"No Install",
					"Browser Only",
					"Web Deploy",
					"OXC Bundled",
				],
			},
		],

		MatrixPermutation: 16,

		SourceURL: "https://github.com/CodeEditorLand/Land",
	};
}
