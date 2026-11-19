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
 * The tables are in the order the record reads them: the masthead's eight
 * marks, the record's own head, the release-level ledger, the three platform
 * targets and their matrix, the two build steps, the verification record, and
 * the six regions the artifact continues into. The record-level facts print
 * once; the platform-level facts print once per target. That division is the
 * whole of the recomposition - the baseline printed the same six fields on
 * three cards.
 */
import type TransparencyContent from "../Interface/Content/Transparency.js";

import type {
	Aside,
	Comparison,
	LedgerRow,
	MatrixColumn,
	Well,
} from "../../Record/Type.js";

import type {
	ManifestRecord,
	Mark,
	PlatformMatrix,
	PlatformTarget,
	Regions,
	Release,
	RequirementsPanel,
	SupportedOS,
	Translate,
} from "./Type.js";

// ─── The masthead strip ───────────────────────────────────────────────────
// The masthead's eight marks, in the order the page prints them.
// `Source/pages/Download.astro` supplies the words; the fill and ink token names
// are the ones that file resolves, moved here so the markup loops instead of
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

// ─── The record's head: `# RELEASE_01` ────────────────────────────────────
// One record, one index, one seal, one claim. The eyebrow keeps the band's own
// name (`Release Manifest`); the claim is the sentence the record actually
// makes, carried verbatim from `download:manifest.headline`. The state line is
// §7's `NO PUBLIC ARTIFACTS` and the note under it is the plain-language
// reading - the band's standfirst restated with every fact it carried, which is
// why the band prints no second long sentence above the same fields.

export function Manifest(T: Translate): ManifestRecord {
	return {
		index: "RELEASE_01",

		eyebrow: T("download:manifest.title", {
			defaultValue: "Release Manifest",
		}),

		heading: T("download:manifest.headline", {
			defaultValue:
				"RELEASE_01 lists three platforms and publishes no artifact.",
		}),

		channel: "PUBLIC",

		state: {
			copy: T("download:state.noArtifacts", {
				defaultValue: "STATUS: NO PUBLIC ARTIFACTS",
			}),

			status: "unavailable",

			tone: "ink",
		},

		note: T("download:state.noArtifactsNote", {
			defaultValue:
				"Source builds are active for all three platforms. No installer, checksum or signature has been published yet, so building from source is the only way to run Land right now.",
		}),

		footnote: T("download:manifest.footnote", {
			defaultValue:
				"The manifest carries a release index, a channel and a per-platform status. It carries no published version, no release date and no artifact size - those fields print UNAVAILABLE until a public installer publishes them.",
		}),

		source: T("download:status.footnote", {
			defaultValue:
				"Source build: the two-step build in the Land repository's Documentation/GitHub/Building.md. Installer, signing and checksum status is quoted from this page's release manifest.",
		}),
	};
}

/**
 * The release's own facts, printed once in the record's head.
 *
 * These are the fields that belong to the release and not to any one of its
 * three targets: when it shipped, which version and build it is, and the licence
 * it ships under. A field with no published value prints §7's `UNAVAILABLE`,
 * never a dash and never a blank cell - the reader has to be able to tell "not
 * published" from "not thought of".
 *
 * The channel is deliberately absent: it is the record's route line
 * (`/CHANNEL:PUBLIC`), printed under the claim, and a second copy in this ledger
 * would be the repetition this composition exists to remove.
 */
export function ReleaseFacts(T: Translate): readonly LedgerRow[] {
	return [
		{
			key: "RELEASED:",

			value: T("download:state.unavailable", {
				defaultValue: "UNAVAILABLE",
			}),
		},

		{
			key: "VERSION:",

			value: T("download:state.unavailable", {
				defaultValue: "UNAVAILABLE",
			}),
		},

		{
			key: "BUILD:",

			value: T("download:state.unavailable", {
				defaultValue: "UNAVAILABLE",
			}),
		},

		{
			key: "LICENSE:",

			value: "CC0",
		},
	];
}

/**
 * The three platforms, in the order the manifest lists them.
 *
 * Every value is the record's own: `AARCH64 / X86_64` for macOS and `X86_64` for
 * the other two, `PREPARING` for every installer, `IN PREPARATION` for every
 * signature, and §7's `UNAVAILABLE` for a checksum and a size that have not been
 * published.
 *
 * `size` is the fourth artifact field and it is a field, not a footnote: the
 * document prints `SIZE` on every platform beside the checksum, and a field the
 * page only mentions in prose reads as a field nobody thought of. It prints
 * `UNAVAILABLE` like the checksum, because neither value exists until an
 * installer does.
 *
 * The status division is the record's own: the platform whose source build the
 * document walks through is `SOURCE ACTIVE` at the specimen tone, and the other
 * two are `PREPARING` at the quiet tone and print in muted ink. The specimen
 * tone is a 6px square beside the word, never a hue: the page's green is spent
 * on the seal, and a status value that wore it would leave the accent with
 * nothing to authenticate.
 *
 * `run` is the command `Documentation/GitHub/Building.md` documents for that
 * platform under "Running the Application"; `absence` is the `↳` line for the
 * platform the document does not document a run command for. One or the other,
 * never both - the asymmetry is a fact about the document, and the page prints
 * it rather than inventing a path.
 */
export function Platforms(T: Translate): readonly PlatformTarget[] {
	/** §7's word for a field whose value has not been published. */
	const Unavailable = T("download:state.unavailable", {
		defaultValue: "UNAVAILABLE",
	});

	/** The two platforms whose release is still being prepared. */
	const Preparing = (
		name: string,

		run?: Well,

		absence?: string,
	): PlatformTarget => ({
		name,
		arch: "X86_64",
		installer: "PREPARING",
		signature: "IN PREPARATION",
		checksum: Unavailable,
		size: Unavailable,
		state: {
			copy: T("download:state.preparing", {
				defaultValue: "STATUS: RELEASE PREPARATION",
			}),
			status: "preparing",
			tone: "quiet",
		},
		...(run ? { run } : {}),
		...(absence ? { absence } : {}),
	});

	return [
		{
			name: "macOS",

			arch: "AARCH64 / X86_64",

			installer: "PREPARING",

			signature: "IN PREPARATION",

			checksum: Unavailable,

			size: Unavailable,

			state: {
				copy: T("download:state.active", {
					defaultValue: "STATUS: SOURCE ACTIVE",
				}),

				status: "active",

				tone: "specimen",
			},

			run: {
				label: "RUN",

				language: "sh",

				lines: [
					"open Element/Mountain/Target/debug/bundle/macos/Mountain.app",
				],
			},
		},

		Preparing(
			"Windows",

			undefined,

			"No run command is documented for Windows yet.",
		),

		Preparing("Linux", {
			label: "RUN",
			language: "sh",
			lines: ["./Element/Mountain/Target/debug/Mountain"],
		}),
	];
}

/**
 * The platform matrix's columns: the architecture, then the four artifact fields
 * a public release fills in.
 *
 * `RecordMatrix` prints its row labels in an unlabelled first column - a row
 * header, not a column of data - so the platform is the row's key and the first
 * column is `ARCH`. Naming that column `TARGET` would put the word over the
 * architecture values and leave the platform names under a blank header: the
 * table would say `TARGET: AARCH64 / X86_64` about a row it had already labelled
 * `〈MACOS〉`.
 *
 * `ARCH` leads because it is the only cell that differs between the three
 * targets today; the other four are the artifact states the release will
 * publish, and they print `PREPARING` / `IN PREPARATION` / `UNAVAILABLE` /
 * `UNAVAILABLE` on every row - which is itself the finding the three platform
 * cards hid.
 */
export const PlatformColumns: readonly MatrixColumn[] = [
	{ label: "ARCH" },

	{ label: "INSTALLER" },

	{ label: "SIGNATURE" },

	{ label: "CHECKSUM" },

	{ label: "SIZE" },
];

/** The matrix, resolved: three rows under the columns, with provenance. */
export function PlatformTable(T: Translate): PlatformMatrix {
	return {
		columns: PlatformColumns,

		rows: Platforms(T).map((platform) => ({
			label: `〈${platform.name.toUpperCase()}〉`,
			cells: [
				platform.arch,
				platform.installer,
				platform.signature,
				platform.checksum,
				platform.size,
			],
		})),

		caption: T("download:platform.matrix.caption", {
			defaultValue:
				"INSTALLER, SIGNATURE, CHECKSUM and SIZE are this page's release manifest fields. UNAVAILABLE means no public value has been published.",
		}),
	};
}

/**
 * The source build, as the two steps the document names.
 *
 * `Documentation/GitHub/Building.md` calls the build "a two-step linear flow",
 * and the wells are split where the document splits it: Step 1 compiles the
 * VS Code source in the submodule, Step 2 builds the Land application. The lines
 * are the document's own, in its order, including the trailing annotation on the
 * `cd` line - the well prints it and strips it from the copy payload.
 *
 * This is the one action that exists today, so it is the record's install
 * region rather than a button: there is nothing to download, and a reader who
 * wants to run Land has to run these.
 */
export function BuildSteps(T: Translate): readonly Well[] {
	return [
		{
			label: T("download:install.step.one", {
				defaultValue: "STEP 01 / COMPILE VS CODE SOURCE",
			}),

			language: "sh",

			lines: [
				"cd Dependency/Microsoft/Dependency/Editor",

				"nvm use 24",

				"export NODE_ENV=development",

				"npm install",

				"npm run compile",

				"npm run compile-extensions-build",
			],

			source: "Documentation/GitHub/Building.md - Step 1",
		},

		{
			label: T("download:install.step.two", {
				defaultValue: "STEP 02 / BUILD LAND APPLICATION",
			}),

			language: "sh",

			lines: [
				"cd Land # back to repository root",

				"export Trace=all Record=1 Disable=false",

				"./Maintain/Debug/Build.sh --profile debug-electron-bundled",
			],

			source: "Documentation/GitHub/Building.md - Step 2",
		},
	];
}

/**
 * The verification record: what the first installer will publish, and how it
 * will be checked.
 *
 * The six rows are the `Verification()` table the download composition carries,
 * and every artifact answers "Available at first public release" - the honest
 * state today, and a better answer than an empty cell because it says when the
 * value will exist.
 *
 * The check itself is a template, not a command: the artifact's name is not
 * known until it is published, so the well prints the two checks with
 * `<artifact>` standing in for it. The page says so in the region's footnote
 * rather than letting a reader paste a placeholder into a shell and wonder.
 */
export function Verification(T: Translate): readonly LedgerRow[] {
	return [
		{ key: "SHA-256:", value: "Available at first public release" },

		{ key: "PGP SIGNATURE:", value: "Available at first public release" },

		{ key: "SIGNING KEY ID:", value: "Available at first public release" },

		{
			key: "PUBLISHED WITH:",

			value: T("download:verification.description", {
				defaultValue:
					"Release downloads will publish checksum and signature material when public installers are available.",
			}),
		},

		{
			key: "INSTRUCTIONS:",

			value: "Verification instructions will be published beside the installer, checksum, and signature artifacts.",
		},

		{
			key: "INTEGRITY CHECK:",

			value: "Available at first public release",

			note: "Air contains checksum and integrity code. Public release verification material will be published with the installers.",
		},
	];
}

/** The check a published artifact will be held to, as a template well. */
export const VerificationWell: Well = {
	label: "VERIFICATION / WHEN PUBLISHED",

	language: "sh",

	lines: [
		"shasum -a 256 <artifact>",

		"gpg --verify <artifact>.sig <artifact>",
	],

	source: "Documentation/GitHub/Building.md - the two checks a published artifact is held to",
};

/**
 * The release ladder: one axis from source to signed artifact, and the state of
 * each position on it.
 *
 * The page could already say what is true in each platform column (the matrix)
 * and what each target needs (the pair). What it could not say is the thing a
 * sceptic actually asks first: *how far has this got?* Five positions answer it,
 * and three of them are not reached - which is the honest answer, and the one a
 * blank column would hide.
 *
 * `SOURCE` and `BUILD` carry no state because they are reached; the three
 * artifacts carry `unavailable` because they do not exist yet. The rail prints
 * both kinds as positions, so a reader sees the line rather than a gap.
 */
export function Ladder(): Comparison {
	return {
		label: "/POSITION",

		from: "SOURCE ONLY",

		to: "SIGNED ARTIFACT",

		stops: [
			{
				label: "SOURCE",

				value: "PUBLISHED",

				note: "The repository is public and the tree is readable today.",
			},

			{
				label: "BUILD",

				value: "REPRODUCIBLE",

				note: "The two steps in /INSTALL produce a running application from it.",
			},

			{
				label: "INSTALLER",

				value: "NOT PUBLISHED",

				state: "unavailable",
			},

			{
				label: "CHECKSUM",

				value: "NOT PUBLISHED",

				state: "unavailable",
			},

			{
				label: "SIGNATURE",

				value: "NOT PUBLISHED",

				state: "unavailable",
			},
		],

		caption:
			"Two of the five positions are reached today. The three that are not print the state vocabulary's word rather than a blank, because an artifact that does not exist yet still has a place on this line - and the place is what tells a reader how far the release has come.",

		empty: "No position is recorded on this axis. The rail would print the release's path from source to signed artifact; it is empty because the release record it reads is not in this build.",
	};
}

/**
 * The folded aside under the requirements: what a source build assumes.
 *
 * The requirements region prints what the machine needs; this says what the
 * *build* assumes and does not check - the toolchain the scripts expect, the
 * network they need, and the two facts nobody records (a disk figure and an
 * offline path). The last two print `UNAVAILABLE`, because a blank cell would
 * read as "no assumption" and there is one.
 */
export const SourceAssumptions: Aside = {
	index: "ASIDE_01",

	label: "WHAT A SOURCE BUILD ASSUMES",

	line: "The two steps in /INSTALL assume a machine that can already build a browser-sized TypeScript tree.",

	rows: [
		{
			key: "NODE:",

			value: "24, selected with nvm. The first step pins the major version.",
		},

		{
			key: "TOOLCHAIN:",

			value: "The application's own Rust toolchain, as /REQUIREMENTS lists it.",
		},

		{
			key: "NETWORK:",

			value: "Required. Both npm install and the extension build fetch.",
		},

		{
			key: "DISK:",

			value: "UNAVAILABLE - no figure is recorded for a full source build.",
		},

		{
			key: "OFFLINE:",

			value: "UNAVAILABLE - there is no offline build path today.",
		},
	],

	source: "Documentation/GitHub/Building.md",
};

/**
 * The record's one action.
 *
 * There is nowhere to download from, so the action goes where the source builds
 * are: the Land repository's releases page, which is the same destination the
 * baseline's macOS card offered. It is the only ink-filled control on the page,
 * and it sits at the end of `/INSTALL` because that is the region that has just
 * told the reader how to build.
 */
export const InstallAction = {
	label: "VIEW SOURCE BUILDS",

	href: "https://github.com/CodeEditorLand/Land/releases",
};

/**
 * The disclosure section's body: six telemetry policy items, nine named build
 * profiles, sixteen test permutations, four deployment strategies with their
 * commands, and the source URL.
 *
 * `Title` and `Subtitle` are deliberately absent. They are the region's heading
 * and standfirst now (`Regions().Transparency`), so the island renders its body
 * without a second `h2` and the record keeps the page's only one. Every string
 * below is the copy the page has always carried - unchanged, including the
 * inline code terms the island's `RichText` turns into chips.
 */
export function Transparency(): TransparencyContent {
	return {
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

// ─── Requirements: what a build needs ─────────────────────────────────────
// The figures are the ones both readings of the panel carry and they agree: the
// minimum is the row's value, the recommendation is the same fact stated larger,
// which is why the row carries it as a `note` ("Recommended: 8 GB RAM") and the
// panel states it as a second column. Here it is both - one panel each, so the
// reader compares two columns instead of reading a note under every row.
//
// The labels carry their colons: a compact label is `KEY:` in this grammar, and
// a bare word is not a label.

export function Requirements(T: Translate): readonly RequirementsPanel[] {
	return [
		{
			label: T("download:systemRequirements.minimum", {
				defaultValue: "Minimum Requirements",
			}),

			recommended: false,

			rows: [
				{
					key: "PROCESSOR:",

					value: "64-bit processor (x86_64 or Apple Silicon)",
				},

				{ key: "MEMORY:", value: "4 GB RAM" },

				{ key: "DISK:", value: "500 MB" },
			],
		},

		{
			label: T("download:systemRequirements.recommended", {
				defaultValue: "Recommended for the Best Experience",
			}),

			recommended: true,

			rows: [
				{
					key: "PROCESSOR:",

					value: "Multi-core 64-bit processor (x86_64 or Apple Silicon)",
				},

				{ key: "MEMORY:", value: "8 GB RAM" },

				{ key: "DISK:", value: "1 GB SSD" },
			],
		},
	];
}

/**
 * The supported-OS strip: one chip per platform, carrying the OS floor the
 * platform needs and, under it, the architectures and installer formats it
 * ships.
 *
 * The values are the per-platform cards' own, stated once each instead of in
 * three repeating ledgers. The installer phrases are the locale keys
 * (`card.platform.*`), not new copy.
 */
export function OperatingSystems(T: Translate): readonly SupportedOS[] {
	/** The one separator a compact string may use. */
	const Quad = "\u2001";

	return [
		{
			name: "macOS 10.15+",

			note: [
				"AARCH64 / X86_64",

				T("download:card.platform.macos.universalBadge", {
					defaultValue: "Universal Binary: Apple Silicon and Intel",
				}),
			].join(Quad),
		},

		{
			name: "Windows 10+",

			note: [
				"X86_64",

				T("download:card.platform.windows.description", {
					defaultValue: "64-bit (x64)",
				}),
			].join(Quad),
		},

		{
			name: "Ubuntu / Debian (deb) / Fedora (rpm)",

			note: [
				"X86_64",

				T("download:card.platform.linux.description", {
					defaultValue: "DEB, RPM, AppImage",
				}),
			].join(Quad),
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
		key: "RUST:",

		value: "1.95.0+",

		note: "Workspace MSRV for all Rust elements",
	},

	{
		key: "NODE.JS:",

		value: "24",

		note: "Pinned 24.22.1 in Dependency/Microsoft/Dependency/Editor/.nvmrc",
	},

	{ key: "PNPM:", value: "npm install -g pnpm" },

	{ key: "GIT:", value: "Git with LFS support" },

	{
		key: "PROTOBUF:",

		value: "optional",

		note: "Only if modifying .proto files",
	},
];

// ─── Previous releases: what has shipped before ───────────────────────────
// Empty, and that is the fact. The region says so with §7's `RECORD: EMPTY` and
// one sentence inside a closed disclosure; the columns below are what the
// matrix becomes the day there is a row to put in it, and the disclosure's open
// state prints them as the shape of that record.

export const PreviousReleases: readonly Release[] = [];

export const ReleaseColumns: readonly MatrixColumn[] = [
	{ label: "PUBLISHED" },

	{ label: "PLATFORM" },

	{ label: "CHANGE" },
];

/** The caption the empty matrix prints: the shape of the record to come. */
export const ReleaseCaption =
	"One row per release, newest first: the date it published, the platform it shipped for, and what changed.";

// ─── The record's regions ─────────────────────────────────────────────────
// The `# RELEASE_01` artifact continues past its own head into these six
// regions, in the order a sceptic asks: what the platforms are, what a build
// needs, how it is built and run, how it is verified, what the build discloses,
// and what shipped before it. Each one is a region of the record - a `/LABEL`,
// an `h3` and a body - not a chapter of the page, so they separate at
// `--space-group` and none of them paints a boundary or a fill.

export function Regions(T: Translate): Regions {
	return {
		Ladder: {
			id: "release-ladder",

			kicker: T("download:ladder.kicker", {
				defaultValue: "/POSITION",
			}),

			heading: T("download:ladder.heading", {
				defaultValue:
					"How far along the line from source to signed artifact.",
			}),

			standfirst: T("download:ladder.standfirst", {
				defaultValue:
					"One axis, five positions, and the state of each. A matrix compares what is true in each column; this line answers a different question - which of these things exists today.",
			}),

			footnote: T("download:ladder.footnote", {
				defaultValue:
					"The order is the release's, not the page's: source, a build from it, an installer, its checksum, its signature. Positions that are not reached print the state vocabulary's word rather than a blank, so the rail says how far the release has come without claiming it has arrived.",
			}),
		},

		Platforms: {
			id: "release-platforms",

			kicker: T("download:platforms.kicker", {
				defaultValue: "/PLATFORMS",
			}),

			heading: T("download:platforms.heading", {
				defaultValue: "What each platform's artifact state is today.",
			}),

			standfirst: T("download:platforms.standfirst", {
				defaultValue:
					"The release manifest's own fields, one row per target. The artifact columns are the ones a public release fills in; the architecture column is the one that differs today.",
			}),
		},

		Evidence: {
			id: "release-evidence",

			kicker: T("download:evidence.kicker", {
				defaultValue: "/EVIDENCE",
			}),

			heading: T("download:evidence.heading", {
				defaultValue:
					"What the release has a picture of, and what it does not.",
			}),

			standfirst: T("download:evidence.standfirst", {
				defaultValue:
					"One verified capture, printed at plate scale, beside the three screens the manual documents in full and the capture the build carries for each: none.",
			}),

			footnote: T("download:evidence.footnote", {
				defaultValue:
					"A plate is not a screenshot. The one capture in the build is a texture study of the Land element's material, and it is printed as evidence of the material rather than of the interface; the set beside it says the same thing cell by cell.",
			}),
		},

		Requirements: {
			id: "release-requirements",

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
					"Minimum requirements, with the recommended figure in the panel beside it. Processor notes: your code runs at native CPU speed (minimum) and span your work across every monitor (recommended).",
			}),
		},

		Install: {
			id: "release-install",

			kicker: T("download:install.kicker", {
				defaultValue: "/INSTALL",
			}),

			heading: T("download:install.heading", {
				defaultValue:
					"The source build is the only install path today.",
			}),

			standfirst: T("download:install.standfirst", {
				defaultValue:
					"Two steps in the Land repository, then one command to run the app. Every line is copied from the repository's own building document.",
			}),

			footnote: T("download:install.footnote", {
				defaultValue:
					"Commands are quoted from the Land repository's Documentation/GitHub/Building.md: Step 1, Step 2, and Running the Application. The well prints each line as the document writes it and copies it without the shell prompt or the trailing annotation.",
			}),
		},

		Verify: {
			id: "release-verify",

			kicker: T("download:verify.kicker", {
				defaultValue: "/VERIFY",
			}),

			heading: T("download:verification.title", {
				defaultValue: "Verification Will Ship With Public Releases.",
			}),

			standfirst: T("download:verify.standfirst", {
				defaultValue:
					"There is no artifact to check yet. These are the fields the first installer will publish, and the check that will apply to it.",
			}),

			footnote: T("download:verify.footnote", {
				defaultValue:
					"The check is the standard one for the artifacts this record promises: the digest the installer publishes, and the PGP signature the masthead marks as planned. On Linux, sha256sum prints the same digest as shasum -a 256.",
			}),
		},

		Transparency: {
			id: "release-transparency",

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

		Previous: {
			id: "release-previous",

			kicker: T("download:previousReleases.kicker", {
				defaultValue: "/PREVIOUS RELEASES",
			}),

			heading: T("download:previousReleases.heading", {
				defaultValue: "There is nothing to go back to yet.",
			}),
		},
	};
}
