/**
 * Data - every row, label and ordering the Download page renders.
 *
 * The template composes; this module decides. Nothing here reads the DOM, holds
 * React or imports the i18n client: the band copy is a function that takes the
 * resolver, and every other table is a constant lifted verbatim out of the files
 * it came from. Each value below names its source in the comment above it, so a
 * figure on the page can be traced back to the file that states it.
 */
import type { LedgerRow, MatrixColumn } from "../../Record/Type.js";

import type {
	AvailabilityRow,
	Bands,
	ManifestPlatform,
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

// ─── Band 1: what can be installed today ──────────────────────────────────
// The three columns are the three questions a reader arrives with: can I build
// it, is there an installer, and is anything signed. Every row answers "no" to
// the last two, which is the page's whole point, and the caption says what
// "yes" and "no" are being measured against.

export const AvailabilityColumns: readonly MatrixColumn[] = [
	{ label: "SOURCE BUILD", ink: "SpinegRPCFore", align: "center" },
	{ label: "INSTALLER", ink: "SpineTCPFore", align: "center" },
	{ label: "SIGNED", ink: "SpineWASMFore", align: "center" },
];

export const Availability: readonly AvailabilityRow[] = [
	{ label: "macOS", cells: ["yes", "no", "no"] },
	{ label: "Windows", cells: ["yes", "no", "no"] },
	{ label: "Linux", cells: ["yes", "no", "no"] },
];

export const AvailabilityCaption =
	"Source build: the two-step build in the Land repository's Documentation/GitHub/Building.md. Installer and signing: the release manifest's own status for every platform.";

/**
 * The build, line for line from `Documentation/GitHub/Building.md` in the Land
 * repository: the Step 1 block, the Step 2 block and the launch line, in the
 * order that file gives them. A trailing `#` is an annotation the well prints
 * and strips from the copy payload, exactly as the document writes it.
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

// ─── Band 2: what a build needs ───────────────────────────────────────────
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
 * requirement - it is what the reader has to install before the commands in
 * band 1 can run.
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
	{ key: "PROTOBUF", value: "optional", note: "Only if modifying .proto files" },
];

// ─── Band 3: what the manifest publishes ──────────────────────────────────
// Every field is the release manifest object this page carried before the card:
// the release index, then per platform the channel, the architecture, the
// signing state, the size, the checksum and the status. Nothing is added and
// nothing is inferred - the manifest has no version and no date, and the band's
// footnote says so.

export const ReleaseIndex = "RELEASE_01";

export const ManifestPlatforms: readonly ManifestPlatform[] = [
	{
		name: "macOS",
		channel: "PUBLIC",
		arch: "AARCH64 / X86_64",
		signing: "IN PREPARATION",
		size: "-",
		checksum: "-",
		status: "active",
		downloadUrl: "https://github.com/CodeEditorLand/Land/releases",
		downloadLabel: "VIEW SOURCE BUILDS",
	},
	{
		name: "Windows",
		channel: "PUBLIC",
		arch: "X86_64",
		signing: "IN PREPARATION",
		size: "-",
		checksum: "-",
		status: "preparing",
	},
	{
		name: "Linux",
		channel: "PUBLIC",
		arch: "X86_64",
		signing: "IN PREPARATION",
		size: "-",
		checksum: "-",
		status: "preparing",
	},
];

/** One platform's manifest as ledger rows, in the manifest's own field order. */
export function ManifestRows(
	platform: ManifestPlatform,
): readonly LedgerRow[] {
	return [
		{ key: "RELEASE", value: ReleaseIndex },
		{ key: "CHANNEL", value: platform.channel },
		{ key: "ARCH", value: platform.arch },
		{ key: "SIGNING", value: platform.signing },
		{ key: "SIZE", value: platform.size },
		{ key: "CHECKSUM", value: platform.checksum },
		{ key: "STATUS", value: platform.status },
	];
}

/**
 * The verification material the page promises, verbatim from the
 * `VerificationInfo` defaults the download composition carried. Every one of the
 * three artifacts answers "Available at first public release" - the honest state
 * today, not an empty cell.
 */
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

// ─── Band 4: what has shipped before ──────────────────────────────────────
// Empty, and that is the fact. The band body says so in one line; the columns
// below are what the ledger becomes the day there is a row to put in it.

export const PreviousReleases: readonly Release[] = [];

export const ReleaseColumns: readonly MatrixColumn[] = [
	{ label: "PUBLISHED" },
	{ label: "PLATFORM" },
	{ label: "CHANGE" },
];

// ─── The bands ────────────────────────────────────────────────────────────
// Kicker, heading, standfirst and footnote for each band, in page order. The
// tone alternates surfaces - flush (the first band after the header), canvas,
// paper, canvas, paper - so no two paper bands touch and no three canvas bands
// run together.

export function Bands(T: Translate): Bands {
	return {
		Status: {
			kicker: T("download:status.kicker", {
				defaultValue: "SOURCE ACTIVE · INSTALLERS IN PROGRESS",
			}),
			heading: T("download:status.heading", {
				defaultValue:
					"Land builds from source today. There is no installer to download yet.",
			}),
			standfirst: T("download:status.standfirst", {
				defaultValue:
					"macOS, Windows and Linux all build from the repository. None of them has a published installer, a signature or a checksum, so building from source is the only way to run Land right now.",
			}),
			footnote: T("download:status.footnote", {
				defaultValue:
					"Build steps are quoted from the Land repository's Documentation/GitHub/Building.md. Installer, signing and checksum status is quoted from this page's release manifest.",
			}),
			tone: "flush",
		},

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
			tone: "canvas",
		},

		Manifest: {
			kicker: T("download:manifest.kicker", {
				defaultValue: "/RELEASE MANIFEST",
			}),
			heading: T("download:manifest.headline", {
				defaultValue:
					"RELEASE_01 lists three platforms and publishes no artifact.",
			}),
			standfirst: T("download:page.subtitle", {
				defaultValue:
					"Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.",
			}),
			footnote: T("download:manifest.footnote", {
				defaultValue:
					"The manifest carries a release index, a channel and a per-platform status. It carries no version, no release date and no artifact size.",
			}),
			tone: "paper",
		},

		Previous: {
			kicker: T("download:previousReleases.kicker", {
				defaultValue: "/PREVIOUS RELEASES",
			}),
			heading: T("download:previousReleases.heading", {
				defaultValue: "There is nothing to go back to yet.",
			}),
			tone: "canvas",
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
			tone: "paper",
		},
	};
}
