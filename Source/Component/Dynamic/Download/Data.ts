/**
 * Data - every row, label and ordering the Download page renders.
 *
 * The template composes; this module decides. Nothing here reads the DOM, holds
 * React or imports the i18n client: the record's copy is a function that takes
 * the resolver, and every other table is a constant lifted verbatim out of the
 * files it came from. Each value below names its source in the comment above
 * it, so a figure on the page can be traced back to the file that states it.
 *
 * The manifest is ordered by `DesignSystem-Pages.md` §2, not by the order the
 * page happened to carry: the record index, the platform and architecture as
 * one stamp, the channel as a route line, then VERSION, SIGNATURE, CHECKSUM,
 * SIZE, BUILD, then the action, then the platform's status line. LICENSE joins
 * that block from `Artifacts.md` §4, and INSTALLER from §2's own list of the
 * provenance fields a platform card keeps.
 */
import type { LedgerRow, MatrixColumn } from "../../Record/Type.js";

import type {
	Bands,
	ManifestPlatform,
	ManifestRecord,
	Mark,
	PlatformRequirements,
	Release,
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

// ─── The record: `# RELEASE_01` ───────────────────────────────────────────
// One record, three platform entries and one verification entry. The heading is
// the page's own sentence about the record and is carried verbatim; the state
// line is §7's `NO PUBLIC ARTIFACTS`, because that is the true thing - the
// release exists as a record, and nothing has been published from it.

export function Manifest(T: Translate): ManifestRecord {
	return {
		index: "RELEASE_01",

		heading: T("download:manifest.headline", {
			defaultValue:
				"RELEASE_01 lists three platforms and publishes no artifact.",
		}),

		state: {
			copy: T("download:state.noArtifacts", {
				defaultValue: "STATUS: NO PUBLIC ARTIFACTS",
			}),
			status: "unavailable",
			tone: "ink",
			note: T("download:state.noArtifactsNote", {
				defaultValue:
					"Source builds are active for all three platforms. No installer, checksum or signature has been published yet, so building from source is the only way to run Land right now.",
			}),
		},

		footnote: T("download:manifest.footnote", {
			defaultValue:
				"The manifest carries a release index, a channel and a per-platform status. It carries no version, no release date and no artifact size - those fields print UNAVAILABLE until a public installer publishes them.",
		}),

		source: T("download:status.footnote", {
			defaultValue:
				"Source build: the two-step build in the Land repository's Documentation/GitHub/Building.md. Installer, signing and checksum status is quoted from this page's release manifest.",
		}),
	};
}

/**
 * The three platforms, in the order the manifest lists them.
 *
 * Every field `DesignSystem-Pages.md` §2 names is present on every platform.
 * The values the tree cannot supply - version, checksum, size, build - print
 * §7's `UNAVAILABLE` rather than a dash, so the record says which fact is
 * missing instead of looking like a cell somebody forgot to fill.
 *
 * The state line follows §2's own division: the platform with a published
 * source-build path is `ACTIVE`, the two without one are `RELEASE PREPARATION`.
 * Both read on the record, not against it: `INSTALLER` and `SIGNATURE` say
 * `PREPARING` and `IN PREPARATION` on all three.
 */
export function ManifestPlatforms(T: Translate): readonly ManifestPlatform[] {
	/** §7's word for a field whose value has not been published. */
	const Unavailable = T("download:state.unavailable", {
		defaultValue: "UNAVAILABLE",
	});

	return [
		{
			name: "macOS",
			arch: "AARCH64 / X86_64",
			channel: "PUBLIC",
			version: Unavailable,
			signature: "IN PREPARATION",
			checksum: Unavailable,
			size: Unavailable,
			build: Unavailable,
			license: "CC0",
			installer: "PREPARING",
			state: {
				copy: T("download:state.active", {
					defaultValue: "STATUS: SOURCE ACTIVE",
				}),
				status: "active",
				tone: "specimen",
				note: T("download:state.activeNote", {
					defaultValue:
						"Builds from source today. The public installer, signature and checksum for this platform are in preparation.",
				}),
			},
			downloadUrl: "https://github.com/CodeEditorLand/Land/releases",
			downloadLabel: "VIEW SOURCE BUILDS",
		},
		{
			name: "Windows",
			arch: "X86_64",
			channel: "PUBLIC",
			version: Unavailable,
			signature: "IN PREPARATION",
			checksum: Unavailable,
			size: Unavailable,
			build: Unavailable,
			license: "CC0",
			installer: "PREPARING",
			state: {
				copy: T("download:state.preparing", {
					defaultValue: "STATUS: RELEASE PREPARATION",
				}),
				status: "preparing",
				tone: "quiet",
				note: T("download:state.preparingNote", {
					defaultValue:
						"Builds from source today. The public installer, signature and checksum for this platform are in preparation.",
				}),
			},
		},
		{
			name: "Linux",
			arch: "X86_64",
			channel: "PUBLIC",
			version: Unavailable,
			signature: "IN PREPARATION",
			checksum: Unavailable,
			size: Unavailable,
			build: Unavailable,
			license: "CC0",
			installer: "PREPARING",
			state: {
				copy: T("download:state.preparing", {
					defaultValue: "STATUS: RELEASE PREPARATION",
				}),
				status: "preparing",
				tone: "quiet",
				note: T("download:state.preparingNote", {
					defaultValue:
						"Builds from source today. The public installer, signature and checksum for this platform are in preparation.",
				}),
			},
		},
	];
}

/**
 * One platform's manifest as ledger rows, in the document's own field order.
 *
 * ARCH is not a row: §2 folds platform and architecture into one stamp, and the
 * stamp is printed above the ledger. CHANNEL is not a row either - it is a
 * route line, `/CHANNEL: PUBLIC`, and the record prints it as one.
 */
export function ManifestRows(platform: ManifestPlatform): readonly LedgerRow[] {
	return [
		{ key: "VERSION", value: platform.version },
		{ key: "SIGNATURE", value: platform.signature },
		{ key: "CHECKSUM", value: platform.checksum },
		{ key: "SIZE", value: platform.size },
		{ key: "BUILD", value: platform.build },
		{ key: "LICENSE", value: platform.license },
		{ key: "INSTALLER", value: platform.installer },
	];
}

/**
 * The build, line for line from `Documentation/GitHub/Building.md` in the Land
 * repository: the Step 1 block, the Step 2 block and the launch line, in the
 * order that file gives them. A trailing `#` is an annotation the well prints
 * and strips from the copy payload, exactly as the document writes it.
 *
 * This is the one action that exists today, so it sits inside the record
 * instead of in a section of its own: §2's `[DOWNLOAD ACTION]` slot holds the
 * source build until there is an installer to put in it.
 */
export const BuildLines: readonly string[] = [
	"cd Dependency/Microsoft/Dependency/Editor",
	"nvm use 24",
	"export NODE_ENV=development",
	"npm install",
	"npm run compile",
	"npm run compile-extensions-build",
	"cd Land # back to repository root",
	"export Trace=all Record=1 Disable=false",
	"./Maintain/Debug/Build.sh --profile debug-electron-bundled",
	"./Element/Mountain/Target/debug/Mountain",
];

// ─── Requirements: what a build needs ─────────────────────────────────────
// OS values are the ones the requirements component declares; ARCH is the
// manifest's; INSTALLER is `card.platform.*` from
// `Source/Library/I18n/Locale/En/Download.json`. The component declares one
// processor / memory / disk set for all three platforms, so those three rows are
// the same in every ledger and the recommended value travels as the row's note.

const Shared: readonly LedgerRow[] = [
	{
		key: "PROCESSOR",
		value: "64-bit processor (x86_64 or Apple Silicon)",
		note: "Recommended: Multi-core 64-bit processor (x86_64 or Apple Silicon)",
	},
	{ key: "MEMORY", value: "4 GB RAM", note: "Recommended: 8 GB RAM" },
	{ key: "DISK", value: "500 MB", note: "Recommended: 1 GB SSD" },
];

export function Requirements(T: Translate): readonly PlatformRequirements[] {
	return [
		{
			platform: "macOS",
			rows: [
				{ key: "OS", value: "macOS 10.15+" },
				{ key: "ARCH", value: "AARCH64 / X86_64" },
				{
					key: "INSTALLER",
					value: T("download:card.platform.macos.universalBadge", {
						defaultValue:
							"Universal Binary: Apple Silicon and Intel",
					}),
				},
				...Shared,
			],
		},
		{
			platform: "Windows",
			rows: [
				{ key: "OS", value: "Windows 10+" },
				{ key: "ARCH", value: "X86_64" },
				{
					key: "INSTALLER",
					value: T("download:card.platform.windows.description", {
						defaultValue: "64-bit (x64)",
					}),
				},
				...Shared,
			],
		},
		{
			platform: "Linux",
			rows: [
				{ key: "OS", value: "Ubuntu / Debian (deb) / Fedora (rpm)" },
				{ key: "ARCH", value: "X86_64" },
				{
					key: "INSTALLER",
					value: T("download:card.platform.linux.description", {
						defaultValue: "DEB, RPM, AppImage",
					}),
				},
				...Shared,
			],
		},
	];
}

/**
 * The toolchain a source build needs, from the Prerequisites section of the
 * Land repository's `Documentation/GitHub/Building.md`. This is not a runtime
 * requirement - it is what the reader has to install before the commands in the
 * record can run.
 */
export const Toolchain: readonly LedgerRow[] = [
	{
		key: "RUST",
		value: "1.95.0+",
		note: "Workspace MSRV for all Rust elements",
	},
	{
		key: "NODE.JS",
		value: "24",
		note: "Pinned 24.22.1 in Dependency/Microsoft/Dependency/Editor/.nvmrc",
	},
	{ key: "PNPM", value: "npm install -g pnpm" },
	{ key: "GIT", value: "Git with LFS support" },
	{
		key: "PROTOBUF",
		value: "optional",
		note: "Only if modifying .proto files",
	},
];

// ─── The record's verification entry ──────────────────────────────────────
// The verification material the page promises, verbatim from the
// `VerificationInfo` defaults the download composition carried. Every one of
// the three artifacts answers "Available at first public release" - the honest
// state today, not an empty cell.

export function Verification(T: Translate): readonly LedgerRow[] {
	return [
		{ key: "SHA-256", value: "Available at first public release" },
		{ key: "PGP SIGNATURE", value: "Available at first public release" },
		{ key: "SIGNING KEY ID", value: "Available at first public release" },
		{
			key: "PUBLISHED WITH",
			value: T("download:verification.description", {
				defaultValue:
					"Release downloads will publish checksum and signature material when public installers are available.",
			}),
		},
		{
			key: "INSTRUCTIONS",
			value: "Verification instructions will be published beside the installer, checksum, and signature artifacts.",
		},
		{
			key: "INTEGRITY CHECK",
			value: "Available at first public release",
			note: "Air contains checksum and integrity code. Public release verification material will be published with the installers.",
		},
	];
}

// ─── Previous releases: what has shipped before ───────────────────────────
// Empty, and that is the fact. The section says so with §7's `RECORD: EMPTY`
// and one sentence; the columns below are what the matrix becomes the day there
// is a row to put in it.

export const PreviousReleases: readonly Release[] = [];

export const ReleaseColumns: readonly MatrixColumn[] = [
	{ label: "PUBLISHED" },
	{ label: "PLATFORM" },
	{ label: "CHANGE" },
];

// ─── The three sections below the record ──────────────────────────────────
// Kicker, heading, standfirst and footnote for each, in page order. All three
// sit on the creme field and put their information in white cards, so no two
// sections alternate a surface to make a rhythm out of it: the surface follows
// the artifact, never the position on the page (DESIGN.md §5 A5).

export function Bands(T: Translate): Bands {
	return {
		Requirements: {
			kicker: T("download:requirements.kicker", {
				defaultValue: "/REQUIREMENTS",
			}),
			heading: T("download:requirements.heading", {
				defaultValue: "What each platform needs before it builds.",
			}),
			standfirst: T("download:systemRequirements.subtitle", {
				defaultValue:
					"A quick check before you download saves a reinstall later.",
			}),
			footnote: T("download:requirements.footnote", {
				defaultValue:
					"Minimum requirements, with the recommended figure noted under each value. The component's two cards were Minimum Requirements and Recommended for the Best Experience. Processor notes: your code runs at native CPU speed (minimum) and span your work across every monitor (recommended).",
			}),
		},

		Previous: {
			kicker: T("download:previousReleases.kicker", {
				defaultValue: "/PREVIOUS RELEASES",
			}),
			heading: T("download:previousReleases.heading", {
				defaultValue: "There is nothing to go back to yet.",
			}),
		},

		Transparency: {
			kicker: T("download:transparency.kicker", {
				defaultValue: "/TRANSPARENCY",
			}),
			heading: T("download:transparency.title", {
				defaultValue: "Telemetry Is Compile-Gated in Land.",
			}),
			standfirst: T("download:transparency.subtitle", {
				defaultValue:
					"Telemetry and tracing are behind named Rust feature gates in the native layer. Nothing is emitted by default. Each build profile explicitly lists which paths are compiled in.",
			}),
		},
	};
}
