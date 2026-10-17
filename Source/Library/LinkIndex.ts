/**
 * The runtime link index for the markdown pass - the full term -> URL map.
 *
 * Every entry is a COMPOSED SPEC, never a URL literal:
 *   { Repo: <repo from Links.ts>, Path: "...", Line: N }  (repo deep-link)
 *   { External: "https://..." }                           (literal canonical home)
 * The matcher (LinkMatcher.ts) precomposes each spec into its URL string
 * ONCE at module load; renders never touch a hardcoded URL.
 *
 * Sources (both composed from the C15 registry, Source/Library/Links.ts):
 *  1. The registry itself - ElementRepos (the sixteen element repos), the
 *     product links (ExternalLinks) and the curated prose symbols
 *     (MentionMap / TechnicalMentions) - registry references, so a future
 *     branch rename edits Links.ts alone.
 *  2. The Phase 2 research audit trail (.hermes/website/tasks/LINKS-INDEX.md,
 *     2026-10-17): concrete file paths, identifier definitions and members
 *     (with #L anchors), file-like names, repo-root fallbacks and the
 *     extHost API symbols - each resolved to a spec by the origin-remote
 *     rule below.
 *
 * Submodule rule (gitlinks): Land's Element/ and Dependency/ trees are
 * SUBMODULES - GitHub does not render files through them. A path under
 * Land/Element/<Name>/ composes via the element's own checkout origin
 * (CodeEditorLand/<Name>); a path under Land/Dependency/<...>/ composes via
 * the innermost checkout's origin remote (the DependencyCodeEditorLand/*
 * dependency forks). UNKNOWN entries and the "anchor TBD" extHost namespace
 * templates are skipped, as are the Phase-2 noise terms (pure-lowercase
 * single-word keys that are identifier-extraction artifacts - "shell" must
 * not link).
 *
 * Curated (registry-composed) values override the researched fallbacks for
 * three terms so the prose pages and the markdown pass agree:
 *  - "editor.land"           -> ExternalLinks.Repository (the site spelling;
 *    the index researched https://editor.land)
 *  - "ManagedRuntime"        -> effect.website (Effect-TS runtime export;
 *    the index fell back to the Land repo root)
 *  - "LandWorkbenchRuntime"  -> ElementRepos.Wind.Base (the Wind workbench
 *    export; the index fell back to the Cocoon repo root)
 *
 * The compiled matcher cache (longest-first + boundary regex, built once at
 * module load) lives in Source/Library/LinkMatcher.ts - this module is the
 * pure index; renders never scan it linearly.
 */

import {
	ElementRepos,
	ExternalLinks,
	LandRepo,
	EditorRepo,
	CacheRepo,
	IngressRepo,
	LandSWCDevtoolsRepo,
	SWCRepo,
	SWCProjectGithubIoRepo,
	SWCDevRepo,
	TsParserTestRefRepo,
	TauriRepo,
	PluginsWorkSpaceRepo,
} from "./Links";

import type { LinkSpec } from "./Links";

/**
 * The mention map: term -> target URL for the hand-written prose pages,
 * composed ONLY from the C15 registry (Links.ts) - never a hardcoded URL.
 * "editor.land" is the repository's site; the element names resolve to
 * their repository homes. Same shape the prose pass has always used.
 */
export const MentionMap: Readonly<Record<string, string>> = {
	"editor.land": ExternalLinks.Repository,

	Land: ExternalLinks.Repository,

	PlayForm: ExternalLinks.PlayForm,

	Air: ElementRepos.Air.Base,

	Cocoon: ElementRepos.Cocoon.Base,

	Common: ElementRepos.Common.Base,

	Echo: ElementRepos.Echo.Base,

	Grove: ElementRepos.Grove.Base,

	Maintain: ElementRepos.Maintain.Base,

	Mist: ElementRepos.Mist.Base,

	Mountain: ElementRepos.Mountain.Base,

	Output: ElementRepos.Output.Base,

	Rest: ElementRepos.Rest.Base,

	SideCar: ElementRepos.SideCar.Base,

	Sky: ElementRepos.Sky.Base,

	Vine: ElementRepos.Vine.Base,

	Wind: ElementRepos.Wind.Base,

	Worker: ElementRepos.Worker.Base,
};

/**
 * Technical symbols in the prose that clearly denote a linkable project or
 * export: "Effect-TS" (the Effect project - anchored to
 * https://effect.website), "ManagedRuntime" (Effect-TS's runtime export,
 * same canonical home) and "LandWorkbenchRuntime" (the Wind workbench's
 * ManagedRuntime export - the Wind repository via the registry). Terms too
 * generic to add navigation value (run*, gRPC, Rust, Tauri, VS Code) are
 * deliberately not mapped.
 */
export const TechnicalMentions: Readonly<Record<string, string>> = {
	"Effect-TS": "https://effect.website",

	ManagedRuntime: "https://effect.website",

	LandWorkbenchRuntime: ElementRepos.Wind.Base,
};

/** Brand compounds that embed a mapped term but are not repository mentions. */
export const Protected = ["Code Editor Land", "CodeEditorLand"] as const;

/**
 * Identical specs used by many entries, factored into named consts so the
 * index states each common target once (commonality reduction). A const is
 * just a spec - the matcher composes it exactly like an inline one.
 */
const AirRoot: LinkSpec = { Repo: ElementRepos.Air, Path: "" };

const CocoonRoot: LinkSpec = { Repo: ElementRepos.Cocoon, Path: "" };

const SkyRoot: LinkSpec = { Repo: ElementRepos.Sky, Path: "" };

const CocoonHostActivateExtension: LinkSpec = {
	Repo: ElementRepos.Cocoon,

	Path: "Source/Services/Handler/Extension/Host/ActivateExtension.ts",
};

const MountainRoot: LinkSpec = { Repo: ElementRepos.Mountain, Path: "" };

const LandRoot: LinkSpec = { Repo: ElementRepos.Land, Path: "" };

const AirSourceBinary: LinkSpec = {
	Repo: ElementRepos.Air,

	Path: "Source/Binary.rs",
};

const CocoonCocoonMain: LinkSpec = {
	Repo: ElementRepos.Cocoon,

	Path: "Source/Bootstrap/Implementation/Cocoon/Main.ts",
};

const LandReleaseBuild: LinkSpec = {
	Repo: ElementRepos.Land,

	Path: "Maintain/Release/Build.sh",
};

const CocoonExtensionContext: LinkSpec = {
	Repo: ElementRepos.Cocoon,

	Path: "Source/Services/Extension/Context.ts",
};

const CocoonUtilityTier: LinkSpec = {
	Repo: ElementRepos.Cocoon,

	Path: "Source/Utility/Tier.ts",
};

const MountainWindServiceHandlersMod: LinkSpec = {
	Repo: ElementRepos.Mountain,

	Path: "Source/IPC/WindServiceHandlers/mod.rs",
};

const MountainProcessManagementInitializationData: LinkSpec = {
	Repo: ElementRepos.Mountain,

	Path: "Source/ProcessManagement/InitializationData.rs",
};

const MountainBuild: LinkSpec = {
	Repo: ElementRepos.Mountain,

	Path: "build.rs",
};

const SkyAstroconfig: LinkSpec = {
	Repo: ElementRepos.Sky,

	Path: "astro.config.ts",
};

const WindUtilityTier: LinkSpec = {
	Repo: ElementRepos.Wind,

	Path: "Source/Utility/Tier.ts",
};

const VineProtoVine: LinkSpec = {
	Repo: ElementRepos.Vine,

	Path: "Proto/Vine.proto",
};

const WindRoot: LinkSpec = { Repo: ElementRepos.Wind, Path: "" };

/**
 * Convert a curated string map (MentionMap / TechnicalMentions) into
 * External specs for the composed index - the registry values are already
 * final URL strings, so they spread as-is.
 */
const AsExternalSpecs = (
	Map: Readonly<Record<string, string>>,
): Readonly<Record<string, LinkSpec>> =>
	Object.fromEntries(
		Object.entries(Map).map(([Term, Url]) => [Term, { External: Url }]),
	);

/**
 * The full runtime index: every resolved term the markdown pass can link,
 * as a composed spec (never a URL literal). Noise terms are not emitted;
 * the curated registry maps are appended as External specs.
 */
export const LinkIndex: Readonly<Record<string, LinkSpec>> = {
	AIR_LOG_DIR: AirRoot,

	AIR_LOG_FILE: AirRoot,

	AIR_LOG_JSON: AirRoot,

	APPDATA: AirRoot,

	AbortController: CocoonRoot,

	AbortSignal: AirRoot,

	AcceptInputCommand: SkyRoot,

	ActionEffect: {
		Repo: ElementRepos.Common,

		Path: "Source/Effect/ActionEffect.rs",

		Line: 21,
	},

	ActionRequest: AirRoot,

	ActivateByEvent: CocoonRoot,

	"ActivateExtension.ts": CocoonHostActivateExtension,

	ActiveDocuments: MountainRoot,

	"Air.proto": { Repo: ElementRepos.Air, Path: "Proto/Air.proto" },

	"Air/Source/Initialize/Command/HandleCommand.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Initialize/Command/HandleCommand.rs",
	},

	"Air/Source/Initialize/Configure/Log/ConfigureLog.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Initialize/Configure/Log/ConfigureLog.rs",
	},

	AirManagement: AirRoot,

	Any: {
		Repo: EditorRepo,

		Path: "extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts",

		Line: 11019,
	},

	ApiFactory: CocoonRoot,

	ApiFactoryLayer: CocoonRoot,

	AppHandle: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/Entry.rs",

		Line: 724,
	},

	"AppHandle.emit": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/WindowUI.rs",

		Line: 47,
	},

	AppLayer: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Skeleton.ts",

		Line: 548,
	},

	"AppLifecycle.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/AppLifecycle.rs",
	},

	AppRuntime: { Repo: ElementRepos.Wind, Path: "README.md", Line: 441 },

	AppState: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement/FireWorkspaceContainsEvents.rs",

		Line: 19,
	},

	"AppState.ActiveScmProviders": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/SourceControlManagementSCM.md",

		Line: 171,
	},

	"AppState.ActiveTerminals": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/CreatingAndInteractingWithAnIntegratedTerminal.md",

		Line: 111,
	},

	"AppState.ActiveWebviews": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/CreatingAndInteractingWithAWebviewPanel.md",

		Line: 112,
	},

	"AppState.CommandRegistry": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/ExecutingACommandFromTheCommandPalette.md",

		Line: 102,
	},

	"AppState.Configuration": {
		Repo: ElementRepos.Air,

		Path: "Source/Indexing/FileIndexer.rs",

		Line: 70,
	},

	"AppState.Extensions": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement/FireWorkspaceContainsEvents.rs",

		Line: 19,
	},

	"AppState.LanguageProviders": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/InvokingALanguageFeatureHoverProvider.md",

		Line: 22,
	},

	ApplicationRunTime: {
		Repo: ElementRepos.Air,

		Path: "Documentation/Rust/doc/type.impl/alloc/sync/struct.Arc.js",

		Line: 2,
	},

	ApplicationState: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Library.rs",

		Line: 84,
	},

	"ApplicationState.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/ApplicationState/ApplicationState.rs",
	},

	"ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",
	},

	"ApplicationState/Internal/Persistence/MementoSaver.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/Internal/Persistence/MementoSaver.rs",
	},

	"ApplicationState/State/WorkspaceState/WorkspaceDelta.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/State/WorkspaceState/WorkspaceDelta.rs",
	},

	"Apply.ts": { Repo: ElementRepos.Output, Path: "Source/Plugin/Apply.ts" },

	ApplyUpdate: {
		Repo: ElementRepos.Air,

		Path: "Source/Client/AirServiceProvider/mod.rs",

		Line: 75,
	},

	Arc: {
		Repo: TauriRepo,

		Path: "crates/tauri/src/resources/mod.rs",

		Line: 53,
	},

	"Architecture.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Architecture.md",
	},

	Ask: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/chat/common/chatModes.ts",

		Line: 713,
	},

	AssetMemoryMap: { Repo: CacheRepo, Path: "Source/Library.rs", Line: 35 },

	Astro: { External: "https://astro.build" },

	AsyncFn: LandRoot,

	AsyncProxy: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts",

		Line: 34,
	},

	Auth0: { External: "https://auth0.com" },

	AuthenticationProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.authenticationChallenges.d.ts",

		Line: 64,
	},

	AuthenticationService: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Authentication.ts",

		Line: 72,
	},

	Authorize: {
		Repo: ElementRepos.Worker,

		Path: "Source/Telemetry/Bridge.ts",

		Line: 39,
	},

	BackgroundServices: AirRoot,

	BakeExtensionManifest: CocoonRoot,

	Batch: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Workspace/Namespace/Find/Files.ts",

		Line: 234,
	},

	BatchSpanProcessor: CocoonRoot,

	Batched: AirRoot,

	Beam: {
		Repo: ElementRepos.Worker,

		Path: "Source/Telemetry/Bridge.ts",

		Line: 41,
	},

	"Binary.rs": AirSourceBinary,

	"Binary/Extension/ScanPathConfigure.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Extension/ScanPathConfigure.rs",
	},

	"Binary/Main/AppLifecycle.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/AppLifecycle.rs",
	},

	"Binary/Main/Entry.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Binary/Main/Entry.rs",
	},

	Boot: AirRoot,

	"Bootstrap.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/BrowserProxy/Bootstrap.ts",
	},

	"Bootstrap/Implementation/Cocoon/Main.ts": CocoonCocoonMain,

	Brand: {
		Repo: ElementRepos.Common,

		Path: "Source/Telemetry/DistinctId.rs",

		Line: 12,
	},

	Browser: { Repo: ElementRepos.Output, Path: "Source/ESBuild.ts", Line: 3 },

	"Browser.astro": {
		Repo: ElementRepos.Sky,

		Path: "Source/pages/Bundled/Browser.astro",

		Line: 3,
	},

	BrowserProxy: {
		Repo: ElementRepos.Sky,

		Path: "Source/pages/index.astro",

		Line: 31,
	},

	"BrowserProxy.astro": {
		Repo: ElementRepos.Sky,

		Path: "Source/pages/BrowserProxy.astro",

		Line: 3,
	},

	Buffer: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Telemetry/PostHog/Buffer.ts",

		Line: 16,
	},

	"Build.sh": LandReleaseBuild,

	"BuildMatrix.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/BuildMatrix.md",
	},

	Builder: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Request/Routing/Handler.ts",

		Line: 450,
	},

	BulkEditService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/bulkEdit/browser/bulkEditService.ts",

		Line: 176,
	},

	Bundle: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Configuration/ESBuild/Constant/Environment/Constant.ts",

		Line: 7,
	},

	BundleLevel: AirRoot,

	Bundled: {
		Repo: TauriRepo,

		Path: "crates/tauri-bundler/src/bundle/macos/dmg/mod.rs",

		Line: 21,
	},

	CACHE_ASSET: {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker.ts",

		Line: 14,
	},

	CACHE_CORE: {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker.ts",

		Line: 12,
	},

	CACHE_EXT: LandRoot,

	CARGO_BUILD_TARGET: CocoonRoot,

	CARGO__: CocoonRoot,

	COCOON_GRPC_PORT: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement.rs",

		Line: 146,
	},

	CONNECTION_TIMEOUT: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Server/Initialize.rs",

		Line: 64,
	},

	"CSS/Load.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/CSS/Load.ts",
	},

	Cache: { Repo: EditorRepo, Path: "src/vs/base/common/cache.ts", Line: 13 },

	"Cache.json": { Repo: ElementRepos.SideCar, Path: "Cache.json" },

	CacheEntry: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Build/Scheme.rs",

		Line: 106,
	},

	CancelAction: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/chat/browser/actions/chatExecuteActions.ts",

		Line: 924,
	},

	CancelOperation: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Initialization.rs",

		Line: 5,
	},

	CancellationProxy: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts",

		Line: 22,
	},

	CancellationTokenSource: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 1675,
	},

	Cap: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Workspace/Namespace/Find/Files.ts",

		Line: 72,
	},

	Capture: {
		Repo: EditorRepo,

		Path: "test/scenario/src/renderEvidenceChapters.ts",

		Line: 23,
	},

	Cargo: { Repo: LandSWCDevtoolsRepo, Path: "src/cargo/index.ts", Line: 31 },

	"Cargo.toml": { Repo: ElementRepos.Land, Path: "Cargo.toml" },

	"Cargo.toml.Backup": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/PerElement.md",

		Line: 195,
	},

	Cause: CocoonRoot,

	CheckForUpdate: {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/Register.ts",

		Line: 64,
	},

	Clean: { Repo: ElementRepos.Cocoon, Path: "Source/ESBuild.ts", Line: 3 },

	Cleanup: { Repo: ElementRepos.Wind, Path: "Source/Preload.ts", Line: 154 },

	"Cleanup.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/Cleanup.md",
	},

	Clipboard: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 23,
	},

	ClipboardLive: {
		Repo: ElementRepos.Wind,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 168,
	},

	"Cocoon/.../ActivateExtension.ts": CocoonHostActivateExtension,

	"Cocoon/Services/Mountain/Client/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/Client/Service.ts",
	},

	"Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts": CocoonCocoonMain,

	"Cocoon/Source/Platform/FiddeeRoot.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Platform/FiddeeRoot.ts",
	},

	"Cocoon/Source/Services/Extension/Context.ts": CocoonExtensionContext,

	"Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		CocoonHostActivateExtension,

	"Cocoon/Source/Services/Handler/VscodeAPI/ROUTING.md": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/ROUTING.md",
	},

	"Cocoon/Source/Services/Mountain/gRPC/Client.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/gRPC/Client.ts",
	},

	"Cocoon/Source/Services/gRPC/Server/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",
	},

	"Cocoon/Source/Utility/Tier.ts": CocoonUtilityTier,

	CocoonClient: {
		Repo: ElementRepos.Mountain,

		Path: "Documentation/GitHub/NamingConventions.md",

		Line: 306,
	},

	CocoonDevLog: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Dev/Log.ts",

		Line: 52,
	},

	CocoonEsbuildDefine: LandRoot,

	CocoonManagement: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/mod.rs",

		Line: 54,
	},

	"CocoonManagement.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement.rs",
	},

	CocoonService: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/mod.rs",

		Line: 8,
	},

	"CodeEditorLand/Air/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Air,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Air/tree/Current/Proto/Air.proto": {
		Repo: ElementRepos.Air,

		Path: "Proto/Air.proto",
	},

	"CodeEditorLand/Air/tree/Current/Source/Binary.rs": AirSourceBinary,

	"CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Binary/Binary.rs",
	},

	"CodeEditorLand/Air/tree/Current/Source/HTTP/Client.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/HTTP/Client.rs",
	},

	"CodeEditorLand/Air/tree/Current/Source/Initialize/Command/HandleCommand.rs":
		{
			Repo: ElementRepos.Air,

			Path: "Source/Initialize/Command/HandleCommand.rs",
		},

	"CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs":
		{
			Repo: ElementRepos.Air,

			Path: "Source/Initialize/Configure/Log/ConfigureLog.rs",
		},

	"CodeEditorLand/Air/tree/Current/Source/Library.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Cocoon,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Cocoon/tree/Current/Scripts/cocoon/bootstrap-fork.js": {
		Repo: ElementRepos.Cocoon,

		Path: "Scripts/cocoon/bootstrap-fork.js",
	},

	"CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		CocoonCocoonMain,

	"CodeEditorLand/Cocoon/tree/Current/Source/Configuration/ESBuild/Cocoon.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Configuration/ESBuild/Cocoon.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",
	},

	"CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Module/Interceptor.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Service/Effect/Module/Interceptor.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Service/Mapping.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Mapping.ts",
	},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/API/Factory/Service.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Services/API/Factory/Service.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension.ts",
	},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts":
		CocoonExtensionContext,

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Services/Extension/Host/Service.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		CocoonHostActivateExtension,

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/ROUTING.md":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Services/Handler/VscodeAPI/ROUTING.md",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/Client/Service.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Services/Mountain/Client/Service.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Services/Mountain/gRPC/Client.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window.ts",
	},

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts":
		{
			Repo: ElementRepos.Cocoon,

			Path: "Source/Services/gRPC/Server/Service.ts",
		},

	"CodeEditorLand/Cocoon/tree/Current/Source/TypeConverter/Task.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/TypeConverter/Task.ts",
	},

	"CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts":
		CocoonUtilityTier,

	"CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Common,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Common/tree/Current/Source/Error/CommonError.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Error/CommonError.rs",
	},

	"CodeEditorLand/Common/tree/Current/Source/IPC/Channel.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/IPC/Channel.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Echo,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Library.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Queue/StealingQueue.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Queue/StealingQueue.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Scheduler/Scheduler.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/Scheduler.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Scheduler/SchedulerBuilder.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/SchedulerBuilder.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Scheduler/Worker.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/Worker.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Task/Priority.rs",
	},

	"CodeEditorLand/Echo/tree/Current/Source/Task/Task.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Task/Task.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Grove,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Host/APIBridge.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/APIBridge.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionHost.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/ExtensionHost.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionManager.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/ExtensionManager.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Host/Lifecycle.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/Lifecycle.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Protocol/SpineConnection.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Protocol/SpineConnection.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Transport/CommonAdapter.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/CommonAdapter.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Transport/IPCTransport.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/IPCTransport.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Transport/Strategy.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/Strategy.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Transport/WASMTransport.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/WASMTransport.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/Transport/gRPCTransport.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/gRPCTransport.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/WASM/HostBridge.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/HostBridge.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/WASM/MemoryManager.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/MemoryManager.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/WASM/ModuleLoader.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/ModuleLoader.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/WASM/Runtime.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/Runtime.rs",
	},

	"CodeEditorLand/Grove/tree/Current/Source/main.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/main.rs",
	},

	"CodeEditorLand/Land/blob/main/CODE_OF_CONDUCT.md": {
		External:
			"https://github.com/CodeEditorLand/Land/blob/main/CODE_OF_CONDUCT.md",
	},

	"CodeEditorLand/Land/blob/main/SECURITY.md": {
		External:
			"https://github.com/CodeEditorLand/Land/blob/main/SECURITY.md",
	},

	"CodeEditorLand/Land/tree/Current/.vscode/land-config.json": {
		Repo: ElementRepos.Land,

		Path: ".vscode/land-config.json",
	},

	"CodeEditorLand/Land/tree/Current/Cargo.toml": {
		Repo: ElementRepos.Land,

		Path: "Cargo.toml",
	},

	"CodeEditorLand/Land/tree/Current/Dependency/Microsoft/Dependency/Editor/.nvmrc":
		{ Repo: EditorRepo, Path: ".nvmrc" },

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildPipeline.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/BuildPipeline.md",
	},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/Building.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Building.md",
	},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",
	},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/EnvironmentVariables.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/EnvironmentVariables.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PerElement.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/FilesystemFootprint/PerElement.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PlatformPaths.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/FilesystemFootprint/PlatformPaths.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/FilesystemFootprint/UserDotfile.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/InterComponentProtocol.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/InterComponentProtocol.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/Polyfills.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Polyfills.md",
	},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/RustInfrastructure.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/RustInfrastructure.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/Module/Telemetry/Effect-OTel.md",
		},

	"CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Tree-Shaking.md":
		{
			Repo: ElementRepos.Land,

			Path: "Documentation/Module/Telemetry/Tree-Shaking.md",
		},

	"CodeEditorLand/Land/tree/Current/Element/Air/README.md": {
		Repo: ElementRepos.Air,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Air/Source/Binary.rs":
		AirSourceBinary,

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/README.md": {
		Repo: ElementRepos.Cocoon,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		CocoonCocoonMain,

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Platform/FiddeeRoot.ts":
		{ Repo: ElementRepos.Cocoon, Path: "Source/Platform/FiddeeRoot.ts" },

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		CocoonHostActivateExtension,

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Telemetry/OTLPBridge.ts":
		{ Repo: ElementRepos.Cocoon, Path: "Source/Telemetry/OTLPBridge.ts" },

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Utility/Tier.ts":
		CocoonUtilityTier,

	"CodeEditorLand/Land/tree/Current/Element/Common/Source/Telemetry/Tier.rs":
		{ Repo: ElementRepos.Common, Path: "Source/Telemetry/Tier.rs" },

	"CodeEditorLand/Land/tree/Current/Element/Echo/Source/Library.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/Land/tree/Current/Element/Grove/README.md": {
		Repo: ElementRepos.Grove,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Grove/Source/main.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/main.rs",
	},

	"CodeEditorLand/Land/tree/Current/Element/Mist/README.md": {
		Repo: ElementRepos.Mist,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Cargo.toml": {
		Repo: ElementRepos.Mountain,

		Path: "Cargo.toml",
	},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Entitlements.plist": {
		Repo: ElementRepos.Mountain,

		Path: "Entitlements.plist",
	},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Binary/Main/AppLifecycle.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Binary/Main/AppLifecycle.rs",
		},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Binary/Main/Entry.rs":
		{ Repo: ElementRepos.Mountain, Path: "Source/Binary/Main/Entry.rs" },

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/DevLog/EmitOTLPSpan.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/IPC/DevLog/EmitOTLPSpan.rs",
		},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs",
		},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/mod.rs":
		MountainWindServiceHandlersMod,

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/LandFixTier.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/LandFixTier.rs",
	},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/ProcessManagement/InitializationData.rs":
		MountainProcessManagementInitializationData,

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Target/debug/extensions.manifest.json":
		{
			Repo: ElementRepos.Mountain,

			Path: "Target/debug/extensions.manifest.json",
		},

	"CodeEditorLand/Land/tree/Current/Element/Mountain/build.rs": MountainBuild,

	"CodeEditorLand/Land/tree/Current/Element/Mountain/tauri.conf.json": {
		Repo: ElementRepos.Mountain,

		Path: "tauri.conf.json",
	},

	"CodeEditorLand/Land/tree/Current/Element/Rest/README.md": {
		Repo: ElementRepos.Rest,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Rest/Source/Main.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Main.rs",
	},

	"CodeEditorLand/Land/tree/Current/Element/SideCar/README.md": {
		Repo: ElementRepos.SideCar,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/SideCar/Source/Download.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/Download.rs",
	},

	"CodeEditorLand/Land/tree/Current/Element/SideCar/Source/main.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/main.rs",
	},

	"CodeEditorLand/Land/tree/Current/Element/Sky/README.md": {
		Repo: ElementRepos.Sky,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Sky/astro.config.ts":
		SkyAstroconfig,

	"CodeEditorLand/Land/tree/Current/Element/Wind/README.md": {
		Repo: ElementRepos.Wind,

		Path: "README.md",
	},

	"CodeEditorLand/Land/tree/Current/Element/Wind/Source/Utility/Tier.ts":
		WindUtilityTier,

	"CodeEditorLand/Land/tree/Current/Element/Worker/Source/Telemetry/Bridge.ts":
		{ Repo: ElementRepos.Worker, Path: "Source/Telemetry/Bridge.ts" },

	"CodeEditorLand/Land/tree/Current/Maintain/Debug.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Debug/All.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/All.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/Build.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/Run.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Dev-Mountain.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Dev-Mountain.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Profile.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Profile.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Release.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Release.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh":
		LandReleaseBuild,

	"CodeEditorLand/Land/tree/Current/Maintain/Script/GenerateRouteManifest.sh":
		{
			Repo: ElementRepos.Land,

			Path: "Maintain/Script/GenerateRouteManifest.sh",
		},

	"CodeEditorLand/Land/tree/Current/Maintain/Script/PostHogCapture.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/PostHogCapture.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/SignBundle.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Script/TierEnvironment.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/TierEnvironment.sh",
	},

	"CodeEditorLand/Land/tree/Current/Maintain/Test/TelemetryTreeShake.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Test/TelemetryTreeShake.sh",
	},

	"CodeEditorLand/Land/tree/Current/package.json": {
		Repo: ElementRepos.Land,

		Path: "package.json",
	},

	"CodeEditorLand/Land/tree/Current/rust-toolchain.toml": {
		Repo: ElementRepos.Land,

		Path: "rust-toolchain.toml",
	},

	"CodeEditorLand/Land/tree/Current/rustfmt.toml": {
		Repo: ElementRepos.Land,

		Path: "rustfmt.toml",
	},

	"CodeEditorLand/Land/tree/Current/turbo.json": {
		Repo: ElementRepos.Land,

		Path: "turbo.json",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/CLI/Cli.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/CLI/Cli.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Definition.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Definition.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Error.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Error.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Fn.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Fn.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/GetTauriTargetTriple.rs":
		{
			Repo: ElementRepos.Maintain,

			Path: "Source/Build/GetTauriTargetTriple.rs",
		},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/JsonEdit.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/JsonEdit.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Logger.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Logger.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Pascalize.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Pascalize.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/PlistEdit.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/PlistEdit.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ConfigLoader.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Rhai/ConfigLoader.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/EnvironmentResolver.rs":
		{
			Repo: ElementRepos.Maintain,

			Path: "Source/Build/Rhai/EnvironmentResolver.rs",
		},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ScriptRunner.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Rhai/ScriptRunner.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Build/TomlEdit.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/TomlEdit.rs",
	},

	"CodeEditorLand/Maintain/tree/Current/Source/Library.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/Mist/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Mist,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Mist/tree/Current/Source/ForwardSecurity.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/ForwardSecurity.rs",
	},

	"CodeEditorLand/Mist/tree/Current/Source/Resolver.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/Resolver.rs",
	},

	"CodeEditorLand/Mist/tree/Current/Source/Server.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/Server.rs",
	},

	"CodeEditorLand/Mist/tree/Current/Source/WebSocket.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/WebSocket.rs",
	},

	"CodeEditorLand/Mist/tree/Current/Source/Zone.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/Zone.rs",
	},

	"CodeEditorLand/Mist/tree/Current/tests/integration.rs": {
		Repo: ElementRepos.Mist,

		Path: "tests/integration.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md":
		{
			Repo: ElementRepos.Mountain,

			Path: "Documentation/GitHub/Architecture.md",
		},

	"CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/NamingConventions.md":
		{
			Repo: ElementRepos.Mountain,

			Path: "Documentation/GitHub/NamingConventions.md",
		},

	"CodeEditorLand/Mountain/tree/Current/Entitlements.plist": {
		Repo: ElementRepos.Mountain,

		Path: "Entitlements.plist",
	},

	"CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto": {
		Repo: ElementRepos.Mountain,

		Path: "Proto/Vine.proto",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/CustomDocumentStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/CustomDocumentStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/DocumentStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/DocumentStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ExtensionDescriptionStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/ExtensionDescriptionStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MarkerDataDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/MarkerDataDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MergedConfigurationStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/MergedConfigurationStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/OutputChannelStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/OutputChannelStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ProviderRegistrationDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/ProviderRegistrationDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/RPCModelContentChangeDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/RPCModelContentChangeDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TerminalStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/TerminalStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TreeViewStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/TreeViewStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/WindowStateDTO.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/DTO/WindowStateDTO.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/Entry.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/Entry.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/CommandProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/CommandProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/CustomEditorProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/CustomEditorProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/DebugProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/DebugProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/DiagnosticProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/DiagnosticProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/FileSystemProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/FileSystemProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/IPCProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/IPCProvider.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/KeybindingProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/KeybindingProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/Registration.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/LanguageFeatureProvider/Registration.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/MountainEnvironment.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/MountainEnvironment.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SearchProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/SearchProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SecretProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/SecretProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SourceControlManagementProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/SourceControlManagementProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/StatusBarProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/StatusBarProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/StorageProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/StorageProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SynchronizationProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/SynchronizationProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/TerminalProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/TestProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/TestProvider.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/UserInterfaceProvider.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/Environment/UserInterfaceProvider.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/TauriIPCServer.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs":
		MountainWindServiceHandlersMod,

	"CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/ProcessManagement/CocoonManagement.rs",
		},

	"CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs":
		MountainProcessManagementInitializationData,

	"CodeEditorLand/Mountain/tree/Current/Source/Shim/Gate.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Shim/Gate.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/Shim/SwallowMap.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Shim/SwallowMap.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/mod.rs",
	},

	"CodeEditorLand/Mountain/tree/Current/build.rs": MountainBuild,

	"CodeEditorLand/Mountain/tree/Current/scripts/cocoon/bootstrap-fork.js": {
		Repo: ElementRepos.Mountain,

		Path: "scripts/cocoon/bootstrap-fork.js",
	},

	"CodeEditorLand/Mountain/tree/Current/tauri.conf.json": {
		Repo: ElementRepos.Mountain,

		Path: "tauri.conf.json",
	},

	"CodeEditorLand/Output/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Output,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Output/tree/Current/Source/Apply/Pipeline.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Apply/Pipeline.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/ESBuild.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.js": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.js",
	},

	"CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/Plugin/Apply.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Apply.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/Plugin/Copy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Copy.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/Plugin/Index.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Index.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Index.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Index.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Init.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Init.ts",
	},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/Index.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/Index.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Extension/Gallery/Service.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Null/Extension/Gallery/Service.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Telemetry/Service.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Null/Telemetry/Service.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Update/Service.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/CEL/Null/Update/Service.ts",
		},

	"CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts":
		{
			Repo: ElementRepos.Output,

			Path: "Source/Service/Tauri/Main/Process/Service.ts",
		},

	"CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Rest,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Binary.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Binary.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Fn/Build.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/Build.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Codegen.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Codegen.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Compiler.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Compiler.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Parser.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Parser.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Transformer.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Transformer.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Library.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Main.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Main.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Struct/CompilerConfig.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Struct/CompilerConfig.rs",
	},

	"CodeEditorLand/Rest/tree/Current/Source/Struct/SWC.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Struct/SWC.rs",
	},

	"CodeEditorLand/SideCar/tree/Current/Cache.json": {
		Repo: ElementRepos.SideCar,

		Path: "Cache.json",
	},

	"CodeEditorLand/SideCar/tree/Current/Documentation/GitHub/Architecture.md":
		{
			Repo: ElementRepos.SideCar,

			Path: "Documentation/GitHub/Architecture.md",
		},

	"CodeEditorLand/SideCar/tree/Current/Source/Download.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/Download.rs",
	},

	"CodeEditorLand/SideCar/tree/Current/Source/Library.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/SideCar/tree/Current/Source/main.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/main.rs",
	},

	"CodeEditorLand/SideCar/tree/Current/build.rs": {
		Repo: ElementRepos.SideCar,

		Path: "build.rs",
	},

	"CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Sky,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Build/BakeExtensionManifest.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Build/BakeExtensionManifest.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Debug.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Debug.ts",
	},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Shared.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Shared.ts",
	},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge.ts",
	},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallCommands.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallCommands.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDebug.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallDebug.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDiagnostics.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallDiagnostics.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallEditorAndOutput.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorOperations.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallEditorOperations.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallFanOut.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallFanOut.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallInlineCompletions.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallInlineCompletions.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallScm.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSearch.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallSearch.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSimpleRelays.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallSimpleRelays.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallStatusbar.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallStatusbar.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTreeView.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallTreeView.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallUiRequests.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallUiRequests.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallWebview.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/Sky/Bridge/InstallWebview.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Auto/Diagnose/Input.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/SmokeTest/Auto/Diagnose/Input.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Bootstrap.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Workbench/BrowserProxy/Bootstrap.ts",
		},

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Bootstrap.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Bootstrap.ts",
	},

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Polyfills.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Polyfills.ts",
	},

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Post/Hog/Bridge.ts":
		{
			Repo: ElementRepos.Sky,

			Path: "Source/Workbench/Electron/Post/Hog/Bridge.ts",
		},

	"CodeEditorLand/Sky/tree/Current/astro.config.ts": SkyAstroconfig,

	"CodeEditorLand/Vine/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Vine,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Vine/tree/Current/Proto/Vine.proto": VineProtoVine,

	"CodeEditorLand/Vine/tree/Current/Source/Error.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Error.rs",
	},

	"CodeEditorLand/Vine/tree/Current/Source/Host.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Host.rs",
	},

	"CodeEditorLand/Vine/tree/Current/Source/Library.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Library.rs",
	},

	"CodeEditorLand/Vine/tree/Current/Source/Multiplexer.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Multiplexer.rs",
	},

	"CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Wind,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts":
		{
			Repo: ElementRepos.Wind,

			Path: "Source/Codegen/Emit/EmitServiceSchema.ts",
		},

	"CodeEditorLand/Wind/tree/Current/Source/ESBuild.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/ESBuild.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Function/Install.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Function/Install.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/IPC/Channel.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Preload.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Preload.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts":
		{
			Repo: ElementRepos.Wind,

			Path: "Source/Service/TauriMainProcessService.ts",
		},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/AsyncProxy.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/AsyncProxy.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/AuditLog.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/AuditLog.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/EventInterceptor.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/EventInterceptor.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/FullIndex.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/FullIndex.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Gate.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/IPCInterceptor.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/IPCInterceptor.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/Index.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Index.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/NetworkProxy.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/RedirectBus.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/RedirectBus.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/SwallowMap.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/SwallowMap.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHogBridge.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Types/Interface/IPCRenderer.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Types/Interface/IPCRenderer.ts",
	},

	"CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts": WindUtilityTier,

	"CodeEditorLand/Worker/tree/Current/Documentation/GitHub/Architecture.md": {
		Repo: ElementRepos.Worker,

		Path: "Documentation/GitHub/Architecture.md",
	},

	"Command.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Command.ts",
	},

	CommandBuilder: MountainRoot,

	CommandExecutor: {
		Repo: ElementRepos.Common,

		Path: "Source/Command/mod.rs",

		Line: 9,
	},

	CommandHandler: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/CommandProvider.rs",

		Line: 63,
	},

	CommandProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/mod.rs",

		Line: 40,
	},

	"CommandProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/CommandProvider.rs",
	},

	CommandRegistry: {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallCommands.ts",

		Line: 27,
	},

	CommandService: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Command.ts",

		Line: 164,
	},

	"Commands/Namespace.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Wrap/Commands/Namespace.ts",
	},

	CommandsProvider: CocoonRoot,

	CommandsQuickAccessProvider: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/quickaccess/browser/commandsQuickAccess.ts",

		Line: 44,
	},

	"Comments/Namespace.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Comments/Namespace.ts",
	},

	"Common/Source/IPC/Channel.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/IPC/Channel.rs",
	},

	CommonError: {
		Repo: ElementRepos.Common,

		Path: "Source/Error/mod.rs",

		Line: 8,
	},

	Compiler: {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Compiler.rs",

		Line: 47,
	},

	CompilerConfig: {
		Repo: ElementRepos.Rest,

		Path: "Source/Struct/CompilerConfig.rs",

		Line: 16,
	},

	Configuration: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 29,
	},

	ConfigurationProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Configuration/ConfigurationProvider.rs",

		Line: 23,
	},

	"ConfigurationProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Configuration/ConfigurationProvider.rs",
	},

	ConfigurationService: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/Configuration.rs",

		Line: 8,
	},

	ConfigurationTarget: {
		Repo: ElementRepos.Common,

		Path: "Source/Configuration/DTO/mod.rs",

		Line: 17,
	},

	ConnectionMetadata: {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",

		Line: 62,
	},

	ConstructExtensionHostInitializationData: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 465,
	},

	ConstructSandboxConfiguration: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 229,
	},

	"Context.Tag": {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Command.ts",

		Line: 7,
	},

	"Copy.ts": { Repo: ElementRepos.Output, Path: "Source/Plugin/Copy.ts" },

	CopyToDesktop: AirRoot,

	Core: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/benches/full/typescript.js",

		Line: 141007,
	},

	CreateWebviewPanel: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window/Webview/Panel.ts",

		Line: 41,
	},

	CreateWorkSpace: MountainRoot,

	Current: {
		Repo: ElementRepos.Maintain,

		Path: "Source/Architecture.rs",

		Line: 55,
	},

	"CustomDocumentStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/CustomDocumentStateDTO.rs",
	},

	"CustomEditorProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/CustomEditor/CustomEditorProvider.rs",
	},

	CustomEvent: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/tests/fixture/next/chakra/input.js",

		Line: 387,
	},

	DATA_DIR: {
		Repo: EditorRepo,

		Path: "scripts/chat-simulation/common/utils.js",

		Line: 23,
	},

	DNS_OVERRIDE: {
		Repo: ElementRepos.Land,

		Path: "Documentation/Rust/doc/SideCar/Spawn/constant.DNS_OVERRIDE.html",

		Line: 1,
	},

	DO: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_parser/src/lexer/token.rs",

		Line: 531,
	},

	DTO: {
		Repo: ElementRepos.Common,

		Path: "Source/StatusBar/mod.rs",

		Line: 19,
	},

	DeactivateExtension: CocoonRoot,

	"Debug.Start": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Debug/Namespace.ts",

		Line: 219,
	},

	"Debug.sh": { Repo: ElementRepos.Land, Path: "Maintain/Debug.sh" },

	"Debug.ts": { Repo: ElementRepos.Sky, Path: "Source/Function/Debug.ts" },

	"Debug/All.sh": { Repo: ElementRepos.Land, Path: "Maintain/Debug/All.sh" },

	"Debug/Build.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/Build.sh",
	},

	"Debug/Run.sh": { Repo: ElementRepos.Land, Path: "Maintain/Debug/Run.sh" },

	DebugProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/mod.rs",

		Line: 49,
	},

	"DebugProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/DebugProvider.rs",
	},

	DebugServer: AirRoot,

	DebugServerPort: AirRoot,

	DebugService: {
		Repo: ElementRepos.Common,

		Path: "Source/Debug/DebugService.rs",

		Line: 24,
	},

	DecorationTypeLifecycle: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Server/Notification/DecorationTypeLifecycle.rs",

		Line: 6,
	},

	"Decrypt.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Encryption/Decrypt.rs",
	},

	"Default.astro": {
		Repo: ElementRepos.Sky,

		Path: "Source/pages/index.astro",

		Line: 23,
	},

	Delta: AirRoot,

	Dependency: {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild.ts",

		Line: 9,
	},

	"Dependency/Microsoft/Dependency/Editor/.nvmrc": {
		Repo: EditorRepo,

		Path: ".nvmrc",
	},

	"DependencyCodeEditorLand/Editor": {
		External: "https://github.com/DependencyCodeEditorLand/Editor",
	},

	Deserialize: {
		Repo: EditorRepo,

		Path: "src/vs/base/common/marshalling.ts",

		Line: 37,
	},

	DiagnosticManager: {
		Repo: ElementRepos.Common,

		Path: "Source/Diagnostic/mod.rs",

		Line: 16,
	},

	"DiagnosticProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/DiagnosticProvider.rs",
	},

	Dialog: {
		Repo: ElementRepos.Output,

		Path: "Source/Polyfill/Native/Module/Polyfill.ts",

		Line: 149,
	},

	DiffEditorInput: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/common/editor/diffEditorInput.ts",

		Line: 37,
	},

	Disable: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Telemetry/FeatureFlags/mod.rs",

		Line: 24,
	},

	DisableUIFixes: AirRoot,

	Disabled: {
		Repo: EditorRepo,

		Path: "src/vs/platform/update/common/update.ts",

		Line: 72,
	},

	DisposableProxy: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts",

		Line: 22,
	},

	DisposableStore: {
		Repo: EditorRepo,

		Path: "src/vs/base/common/lifecycle.ts",

		Line: 416,
	},

	DnsPort: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Build/Scheme.rs",

		Line: 102,
	},

	Document: {
		Repo: ElementRepos.Common,

		Path: "Source/Library.rs",

		Line: 95,
	},

	"Document.Save": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Workspace/Namespace/Index.ts",

		Line: 644,
	},

	"Document.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Workspace/Namespace/Text/Document.ts",
	},

	DocumentContentCache: MountainRoot,

	DocumentProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Document/mod.rs",

		Line: 10,
	},

	"DocumentProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Document/DocumentProvider.rs",
	},

	DocumentService: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Document.ts",

		Line: 58,
	},

	"DocumentStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/DocumentStateDTO.rs",
	},

	"Documentation/GitHub/BuildMatrix.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/BuildMatrix.md",
	},

	"Documentation/GitHub/VSCode-API-Coverage-Matrix.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",
	},

	Download: {
		Repo: ElementRepos.SideCar,

		Path: "Source/Library.rs",

		Line: 64,
	},

	ESBuild: {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/Bundle/mod.rs",

		Line: 19,
	},

	"ESBuild.ts": { Repo: ElementRepos.Wind, Path: "Source/ESBuild.ts" },

	ESRCH: CocoonRoot,

	Eager: AirRoot,

	Editor: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window/Text/Document.ts",

		Line: 115,
	},

	EditorGroupModel: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/common/editor/editorGroupModel.ts",

		Line: 185,
	},

	EditorGroupsService: MountainRoot,

	EditorInput: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/common/editor/editorInput.ts",

		Line: 61,
	},

	EditorService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/editor/browser/editorService.ts",

		Line: 39,
	},

	Effect: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/mod.rs",

		Line: 19,
	},

	"Effect.Service": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Interfaces/I/Mountain/Client/Service.ts",

		Line: 62,
	},

	"Effect.catchTag": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/PatchProcess/Loader.ts",

		Line: 97,
	},

	"Effect.fork": {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/PatchProcess.ts",

		Line: 322,
	},

	"Effect.linkSpans": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Effect-OTel.md",

		Line: 228,
	},

	"Effect.race": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/mod.rs",

		Line: 19,
	},

	"Effect.runPromise": {
		Repo: ElementRepos.Cocoon,

		Path: "Documentation/GitHub/DeepDive.md",

		Line: 84,
	},

	"Effect.timeout": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/mod.rs",

		Line: 19,
	},

	"Effect.withSpan": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Wrap/Namespace/With/Heuristics.ts",

		Line: 21,
	},

	"Effect/Bootstrap.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",
	},

	"Effect/Health.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Health.ts",
	},

	"Effect/Module/Interceptor.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Module/Interceptor.ts",
	},

	"Effect/RPCServer.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/RPCServer.ts",
	},

	"Effect/Telemetry.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Telemetry.ts",
	},

	Electron: { Repo: ElementRepos.Output, Path: "Source/ESBuild.ts", Line: 5 },

	"Electron.astro": {
		Repo: ElementRepos.Sky,

		Path: "Source/pages/Electron.astro",

		Line: 3,
	},

	ElectronLiveLayer: {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",

		Line: 382,
	},

	"Element/Air/Proto/Air.proto": {
		Repo: ElementRepos.Air,

		Path: "Proto/Air.proto",
	},

	"Element/Air/README.md": { Repo: ElementRepos.Air, Path: "README.md" },

	"Element/Air/Source/Authentication/mod.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Authentication/mod.rs",
	},

	"Element/Air/Source/Binary.rs": AirSourceBinary,

	"Element/Air/Source/Downloader/mod.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Downloader/mod.rs",
	},

	"Element/Air/Source/Updates/mod.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Updates/mod.rs",
	},

	"Element/Cocoon/README.md": {
		Repo: ElementRepos.Cocoon,

		Path: "README.md",
	},

	"Element/Cocoon/Scripts/cocoon/bootstrap-fork.js": {
		Repo: ElementRepos.Cocoon,

		Path: "Scripts/cocoon/bootstrap-fork.js",
	},

	"Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		CocoonCocoonMain,

	"Element/Cocoon/Source/Platform/FiddeeRoot.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Platform/FiddeeRoot.ts",
	},

	"Element/Cocoon/Source/Services/Extension.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension.ts",
	},

	"Element/Cocoon/Source/Services/Extension/Context.ts":
		CocoonExtensionContext,

	"Element/Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		CocoonHostActivateExtension,

	"Element/Cocoon/Source/Services/Mountain/gRPC/Client.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/gRPC/Client.ts",
	},

	"Element/Cocoon/Source/Telemetry/OTLPBridge.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Telemetry/OTLPBridge.ts",
	},

	"Element/Cocoon/Source/Utility/Tier.ts": CocoonUtilityTier,

	"Element/Common/Source/Telemetry/Tier.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Telemetry/Tier.rs",
	},

	"Element/Echo/Source/Library.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Library.rs",
	},

	"Element/Grove/Proto/Grove.proto": {
		Repo: ElementRepos.Grove,

		Path: "Proto/Grove.proto",
	},

	"Element/Grove/README.md": { Repo: ElementRepos.Grove, Path: "README.md" },

	"Element/Grove/Source/main.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/main.rs",
	},

	"Element/Mist/README.md": { Repo: ElementRepos.Mist, Path: "README.md" },

	"Element/Mountain/Cargo.toml": {
		Repo: ElementRepos.Mountain,

		Path: "Cargo.toml",
	},

	"Element/Mountain/Entitlements.plist": {
		Repo: ElementRepos.Mountain,

		Path: "Entitlements.plist",
	},

	"Element/Mountain/Proto/Vine.proto": {
		Repo: ElementRepos.Mountain,

		Path: "Proto/Vine.proto",
	},

	"Element/Mountain/Source/Binary/Initialize/CliParse.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Initialize/CliParse.rs",
	},

	"Element/Mountain/Source/Binary/Main/AppLifecycle.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/AppLifecycle.rs",
	},

	"Element/Mountain/Source/ExtensionManagement/Scanner.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ExtensionManagement/Scanner.rs",
	},

	"Element/Mountain/Source/IPC/DevLog/AppDataPrefix.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/DevLog/AppDataPrefix.rs",
	},

	"Element/Mountain/Source/IPC/DevLog/EmitOTLPSpan.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/DevLog/EmitOTLPSpan.rs",
	},

	"Element/Mountain/Source/IPC/DevLog/WriteToFile.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/DevLog/WriteToFile.rs",
	},

	"Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs",
	},

	"Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs":
		{
			Repo: ElementRepos.Mountain,

			Path: "Source/IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs",
		},

	"Element/Mountain/Source/LandFixTier.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/LandFixTier.rs",
	},

	"Element/Mountain/Source/ProcessManagement/InitializationData.rs":
		MountainProcessManagementInitializationData,

	"Element/Mountain/Source/Telemetry/Tracing/InitializeTracing.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Telemetry/Tracing/InitializeTracing.rs",
	},

	"Element/Mountain/Target/debug/extensions.manifest.json": {
		Repo: ElementRepos.Mountain,

		Path: "Target/debug/extensions.manifest.json",
	},

	"Element/Mountain/build.rs": MountainBuild,

	"Element/Mountain/tauri.conf.json": {
		Repo: ElementRepos.Mountain,

		Path: "tauri.conf.json",
	},

	"Element/Rest/README.md": { Repo: ElementRepos.Rest, Path: "README.md" },

	"Element/Rest/Source/Main.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Main.rs",
	},

	"Element/SideCar/README.md": {
		Repo: ElementRepos.SideCar,

		Path: "README.md",
	},

	"Element/SideCar/Source/Download.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/Download.rs",
	},

	"Element/SideCar/Source/main.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/main.rs",
	},

	"Element/Sky/README.md": { Repo: ElementRepos.Sky, Path: "README.md" },

	"Element/Sky/Source/Workbench/Electron/Post/Hog/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Post/Hog/Bridge.ts",
	},

	"Element/Vine/Proto/Vine.proto": VineProtoVine,

	"Element/Vine/Vine.proto": VineProtoVine,

	"Element/Wind/README.md": { Repo: ElementRepos.Wind, Path: "README.md" },

	"Element/Wind/Source/Utility/Tier.ts": WindUtilityTier,

	"Element/Worker/Source/Telemetry/Bridge.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Telemetry/Bridge.ts",
	},

	Embedded: AirRoot,

	"EmitServiceSchema.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Codegen/Emit/EmitServiceSchema.ts",
	},

	EmitTierDefaults: {
		Repo: ElementRepos.Mountain,

		Path: "build.rs",

		Line: 439,
	},

	Emitter: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/SkyEmit.rs",

		Line: 44,
	},

	EmitterFireProxy: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts",

		Line: 40,
	},

	Empty: {
		Repo: ElementRepos.Vine,

		Path: "Documentation/Rust/doc/Vine/Generated/struct.Empty.html",

		Line: 1,
	},

	Encapsulation: AirRoot,

	"Encapsulation.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/Encapsulation.md",
	},

	"Encrypt.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Encryption/Encrypt.rs",
	},

	"Encryption/Key.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Encryption/Key.rs",
	},

	EnqueueTreeViewEmit: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/TreeView.rs",

		Line: 11,
	},

	"Entitlements.plist": {
		Repo: ElementRepos.Mountain,

		Path: "Entitlements.plist",
	},

	Envelope: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/mod.rs",

		Line: 59,
	},

	Environment: {
		Repo: ElementRepos.Common,

		Path: "Source/Library.rs",

		Line: 69,
	},

	"Environment/ConfigurationProvider/UpdateValue.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/ConfigurationProvider/UpdateValue.rs",
	},

	"Environment/FileSystemProvider/WriteOperations.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/FileSystemProvider/WriteOperations.rs",
	},

	"Environment/FileWatcherProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/FileWatcherProvider.rs",
	},

	"Environment/KeybindingProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/KeybindingProvider.rs",
	},

	"Environment/StorageProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/StorageProvider.rs",
	},

	"Environment/Terminal/ShellIntegration.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/Terminal/ShellIntegration.rs",
	},

	"Environment/WebviewProvider/Messaging.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/WebviewProvider/Messaging.rs",
	},

	"Environment/WorkspaceProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/WorkspaceProvider.rs",
	},

	"EnvironmentVariables.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EnvironmentVariables.md",
	},

	Err: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RunTime/Shutdown/Shutdown.rs",

		Line: 15,
	},

	"Error/CommonError.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Error/CommonError.rs",
	},

	ErrorHandlerProxy: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts",

		Line: 23,
	},

	EventEmitter: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/VSCode/Type.ts",

		Line: 55,
	},

	"EventTarget.prototype.addEventListener": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/EventInterceptor.ts",

		Line: 6,
	},

	ExecuteCommandLogic: MountainRoot,

	ExecuteContributedCommand: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Command.rs",

		Line: 6,
	},

	Executions: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts",

		Line: 37,
	},

	ExtHostApiImpl: CocoonRoot,

	ExtHostAuthentication: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostAuthentication.ts",

		Line: 58,
	},

	ExtHostContext: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 4171,
	},

	ExtHostDocumentSaveParticipant: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDocumentSaveParticipant.ts",

		Line: 22,
	},

	ExtHostRequireInterceptor: CocoonRoot,

	ExtHostSaveParticipant: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/browser/mainThreadSaveParticipant.ts",

		Line: 17,
	},

	ExtHostTaskService: LandRoot,

	Extend: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_transforms_module/src/module_decl_strip.rs",

		Line: 603,
	},

	"Extension/Context.ts": CocoonExtensionContext,

	ExtensionContext: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 439,
	},

	ExtensionDescriptionRegistry: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/extensions/common/extensionDescriptionRegistry.ts",

		Line: 29,
	},

	"ExtensionDescriptionStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/ExtensionDescriptionStateDTO.rs",
	},

	ExtensionHost: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Extension.ts",

		Line: 37,
	},

	ExtensionHostHandler: CocoonRoot,

	ExtensionHostLayer: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Host/Service.ts",

		Line: 319,
	},

	ExtensionHostProvider: WindRoot,

	ExtensionManagement: {
		Repo: ElementRepos.Common,

		Path: "Source/Library.rs",

		Line: 98,
	},

	"ExtensionManagement/Scanner.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ExtensionManagement/Scanner.rs",
	},

	"ExtensionManagement/VsixInstaller.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ExtensionManagement/VsixInstaller.rs",
	},

	ExtensionManagementService: {
		Repo: ElementRepos.Common,

		Path: "Source/ExtensionManagement/mod.rs",

		Line: 11,
	},

	ExtensionManifest: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Extension.ts",

		Line: 14,
	},

	ExtensionProvider: CocoonRoot,

	ExtensionService: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Extension.ts",

		Line: 130,
	},

	ExtensionTypeFilter: MountainRoot,

	Extensions: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/mod.rs",

		Line: 20,
	},

	ExtensionsGetInstalled: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Extensions.rs",

		Line: 24,
	},

	"ExtensionsGetInstalled.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Extensions/ExtensionsGetInstalled.rs",
	},

	ExtensionsSynchronizer: CocoonRoot,

	F8: AirRoot,

	FC: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/tests/fixture/next/asmjs/1/input.js",

		Line: 26109,
	},

	FN: AirRoot,

	FOLDERID_LocalAppData: CocoonRoot,

	FOLDERID_RoamingAppData: CocoonRoot,

	FR: AirRoot,

	FailureCount: LandRoot,

	"FeatureMethods.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",
	},

	"FiddeeRoot.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs",
	},

	FileService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/files/common/fileService.ts",

		Line: 26,
	},

	FileStat: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/FileSystem/Managed/mod.rs",

		Line: 20,
	},

	FileSystem: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 41,
	},

	"FileSystem.ReadFile": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/SideCarRequest/DispatchSideCarRequest.rs",

		Line: 76,
	},

	FileSystemProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/mod.rs",

		Line: 58,
	},

	"FileSystemProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/FileSystemProvider.rs",
	},

	FileSystemReader: {
		Repo: ElementRepos.Common,

		Path: "Source/FileSystem/mod.rs",

		Line: 10,
	},

	FileSystemService: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/File/System/Service.ts",

		Line: 39,
	},

	FileSystemWriter: {
		Repo: ElementRepos.Common,

		Path: "Source/FileSystem/mod.rs",

		Line: 13,
	},

	FileWatcher: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 44,
	},

	FileWatcherProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/mod.rs",

		Line: 62,
	},

	FromAsync: CocoonRoot,

	FsReader: CocoonRoot,

	FsWriter: CocoonRoot,

	Full: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Workspace/Contains/Activator.ts",

		Line: 209,
	},

	FullAppInitialization: WindRoot,

	Future: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/vine.rs",

		Line: 2111,
	},

	GenericNotification: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 13,
	},

	GenericRequest: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 15,
	},

	GetCompletions: CocoonRoot,

	GetConfigurationValue: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/ConfigurationProvider/mod.rs",

		Line: 52,
	},

	GetDefinition: CocoonRoot,

	GetDocumentSymbols: CocoonRoot,

	GetHoverAtPosition: CocoonRoot,

	GetReferences: CocoonRoot,

	"GetTauriTargetTriple.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/GetTauriTargetTriple.rs",
	},

	Git: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 47,
	},

	GitProvider: SkyRoot,

	Glob: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Workspace/Contains/Activator.ts",

		Line: 305,
	},

	Global: {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Polyfill/Tauri/Drag/Region.ts",

		Line: 83,
	},

	"Grove.proto": { Repo: ElementRepos.Grove, Path: "Proto/Grove.proto" },

	HEALTH_CHECK_INTERVAL_MS: {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",

		Line: 50,
	},

	HOME: AirRoot,

	HTTPProxy: LandRoot,

	HTTPS_PROXY: LandRoot,

	HTTP_PROXY: LandRoot,

	HandRolled: AirRoot,

	"HandleExec.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Git/HandleExec.rs",
	},

	HashMap: {
		Repo: SWCRepo,

		Path: "crates/swc_allocator/src/api/mod.rs",

		Line: 14,
	},

	HealExecutableBits: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ExtensionManagement/VsixInstaller.rs",

		Line: 401,
	},

	Heartbeat: CocoonRoot,

	High: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/PathExtraction.rs",

		Line: 132,
	},

	Hive: AirRoot,

	HostBridge: {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/mod.rs",

		Line: 41,
	},

	HotReload: {
		Repo: ElementRepos.Air,

		Path: "Source/Configuration/mod.rs",

		Line: 93,
	},

	Hover: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Command/Hover/Fn.rs",

		Line: 57,
	},

	HoverResultDto: MountainRoot,

	Hybrid: AirRoot,

	Hyper: LandRoot,

	IBulkEditService: {
		Repo: EditorRepo,

		Path: "src/vs/editor/browser/services/bulkEditService.ts",

		Line: 17,
	},

	ICommandService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/commands/common/commands.ts",

		Line: 15,
	},

	IConfigurationService: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Interfaces/I/Configuration/Service.ts",

		Line: 25,
	},

	IDocumentService: AirRoot,

	IEditorService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/editor/common/editorService.ts",

		Line: 17,
	},

	"IEditorService.activeTextEditorControl": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 73,
	},

	IExtHostCommands: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",

		Line: 347,
	},

	IExtHostDebug: CocoonRoot,

	IExtHostDocuments: CocoonRoot,

	IExtHostExtensions: CocoonRoot,

	IExtHostLanguages: CocoonRoot,

	IExtHostRpcService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostRpcService.ts",

		Line: 9,
	},

	IExtHostTerminal: CocoonRoot,

	IExtHostWebview: CocoonRoot,

	IExtHostWebviews: CocoonRoot,

	IExtHostWindow: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWindow.ts",

		Line: 115,
	},

	IExtHostWorkspace: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 1168,
	},

	IExtensionHostInitData: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/extensions/common/extensionHostProtocol.ts",

		Line: 28,
	},

	IExtensionService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/extensions/common/extensions.ts",

		Line: 38,
	},

	IF: {
		Repo: TsParserTestRefRepo,

		Path: "parser/ecmascript5/parserSyntaxWalker.generated/input.ts",

		Line: 212,
	},

	IFTNMMMMMM: LandRoot,

	IFileService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/files/common/files.ts",

		Line: 26,
	},

	ILanguageFeaturesService: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/services/languageFeatures.ts",

		Line: 10,
	},

	"ILanguageFeaturesService.inlineCompletionsProvider": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallInlineCompletions.ts",

		Line: 5,
	},

	IMainProcessService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/ipc/common/mainProcessService.ts",

		Line: 10,
	},

	IN: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_parser/src/lexer/token.rs",

		Line: 555,
	},

	INTNNNNNNN: LandRoot,

	IOPlatformUUID: MountainRoot,

	IPC: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/WebviewPanel/Webview/Implementation.ts",

		Line: 23,
	},

	"IPC.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Exclude/Chromium/IPC.ts",
	},

	"IPC/DevLog/AppDataPrefix.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/DevLog/AppDataPrefix.rs",
	},

	"IPC/DevLog/WriteToFile.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/DevLog/WriteToFile.rs",
	},

	"IPC/WindServiceHandlers/Utilities/RecentlyOpened.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/RecentlyOpened.rs",
	},

	"IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs",
	},

	"IPC/WindServiceHandlers/mod.rs": MountainWindServiceHandlersMod,

	IPCProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/IPC/IPCProvider.rs",

		Line: 16,
	},

	"IPCProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/IPC/IPCProvider.rs",
	},

	IPCRenderer: {
		Repo: ElementRepos.Wind,

		Path: "Source/Types/Interface/IPCRenderer.ts",

		Line: 17,
	},

	IPCTransport: {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/IPCTransport.rs",

		Line: 24,
	},

	IQuickInputService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/quickinput/common/quickInput.ts",

		Line: 963,
	},

	ISCMService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/scm/common/scm.ts",

		Line: 35,
	},

	ISandboxConfiguration: {
		Repo: ElementRepos.Wind,

		Path: "Source/Types/Interface/ISandboxConfiguration.ts",

		Line: 27,
	},

	"ISandboxConfiguration.profiles": {
		Repo: ElementRepos.Wind,

		Path: "Source/Types/Interface/ISandboxConfiguration.ts",

		Line: 27,
	},

	ISandboxNodeProcess: {
		Repo: EditorRepo,

		Path: "src/vs/base/parts/sandbox/electron-browser/globals.ts",

		Line: 13,
	},

	ISaveParticipant: CocoonRoot,

	ISearchResultProvider: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/search/common/search.ts",

		Line: 66,
	},

	IStatusbarService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/statusbar/browser/statusbar.ts",

		Line: 15,
	},

	"ITextFileService.save": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/Workspace.rs",

		Line: 206,
	},

	ITreeItem: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/common/views.ts",

		Line: 768,
	},

	ITreeView: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/common/views.ts",

		Line: 653,
	},

	IUntypedEditorInput: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/common/editor.ts",

		Line: 886,
	},

	IW: LandRoot,

	IWTAMMMMMM: LandRoot,

	IWTNMMMMMM: AirRoot,

	IWorkingCopyFileService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/workingCopy/common/workingCopyFileService.ts",

		Line: 25,
	},

	IWorkspaceService: {
		Repo: EditorRepo,

		Path: "extensions/copilot/src/platform/workspace/common/workspaceService.ts",

		Line: 17,
	},

	InProgress: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Extension/Host/Handler.ts",

		Line: 290,
	},

	"Index.ts": { Repo: ElementRepos.Wind, Path: "Source/Shim/Index.ts" },

	InflightExecution: {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts",

		Line: 260,
	},

	"Info.plist": { Repo: ElementRepos.Mountain, Path: "Info.plist" },

	"Init.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Init.ts",
	},

	InitData: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Init/Data.ts",

		Line: 6,
	},

	InitDataLayer: WindRoot,

	InitExtensionHost: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Initialization.rs",

		Line: 8,
	},

	InitialHandshake: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Initialization.rs",

		Line: 12,
	},

	InitializationData: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/mod.rs",

		Line: 60,
	},

	"InitializationData.FoldersWire": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 110,
	},

	"InitializationData.rs": MountainProcessManagementInitializationData,

	InitializeCocoon: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement.rs",

		Line: 260,
	},

	InitializeConfiguration: WindRoot,

	InlineCompletion: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/languages.ts",

		Line: 836,
	},

	InlineCompletionList: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.inlineCompletionsAdditions.d.ts",

		Line: 268,
	},

	InlineCompletionsProvider: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/languages.ts",

		Line: 947,
	},

	InputBoxPlaceholder: SkyRoot,

	InputBoxValue: SkyRoot,

	Inspect: AirRoot,

	Install: {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Polyfill/Workbench/Paint/Prime.ts",

		Line: 112,
	},

	"InstallCommands.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallCommands.ts",
	},

	"InstallDeadChannelListeners.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallDeadChannelListeners.ts",
	},

	"InstallDebug.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallDebug.ts",
	},

	"InstallDiagnostics.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallDiagnostics.ts",
	},

	"InstallEditorAndOutput.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallEditorAndOutput.ts",
	},

	"InstallEditorOperations.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallEditorOperations.ts",
	},

	"InstallFanOut.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallFanOut.ts",
	},

	"InstallInlineCompletions.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallInlineCompletions.ts",
	},

	"InstallProgressTerminalWorkspace.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts",
	},

	"InstallScm.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallScm.ts",
	},

	"InstallSearch.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallSearch.ts",
	},

	"InstallSimpleRelays.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallSimpleRelays.ts",
	},

	"InstallStatusbar.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallStatusbar.ts",
	},

	"InstallTasksAndDecorations.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts",
	},

	"InstallTreeView.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallTreeView.ts",
	},

	"InstallUiRequests.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallUiRequests.ts",
	},

	"InstallWebview.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallWebview.ts",
	},

	InvokeLanguageProvider: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Language/Provider/Handler.ts",

		Line: 336,
	},

	IpcProvider: MountainRoot,

	IpcProviderLayer: CocoonRoot,

	IpcRenderer: {
		Repo: EditorRepo,

		Path: "src/vs/base/parts/sandbox/electron-browser/electronTypes.ts",

		Line: 35,
	},

	IsDeclaredTierFeature: {
		Repo: ElementRepos.Mountain,

		Path: "build.rs",

		Line: 547,
	},

	IsDefaultTierValue: {
		Repo: ElementRepos.Mountain,

		Path: "build.rs",

		Line: 591,
	},

	IsEnabled: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Telemetry/FeatureFlags/mod.rs",

		Line: 48,
	},

	IsHealthy: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/Common/HealthStatus/HealthMonitor.rs",

		Line: 75,
	},

	IsOwn: { Repo: ElementRepos.Wind, Path: "Source/Shim/Gate.ts", Line: 52 },

	IsPreempt: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Gate.ts",

		Line: 55,
	},

	IsProxy: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/TreeViewStateDTO.rs",

		Line: 211,
	},

	IsReplace: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Gate.ts",

		Line: 48,
	},

	"Isolation.astro": {
		Repo: ElementRepos.Sky,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 91,
	},

	"JSON.parse": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 101,
	},

	"JSON.stringify": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/Sync.ts",

		Line: 239,
	},

	JSX: {
		Repo: EditorRepo,

		Path: "extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts",

		Line: 52103,
	},

	JavaScript: {
		Repo: EditorRepo,

		Path: "extensions/typescript-language-features/package.nls.json",

		Line: 327,
	},

	"Key.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Encryption/Key.rs",
	},

	KeybindingProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Keybinding/KeybindingProvider.rs",

		Line: 20,
	},

	"KeybindingProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Keybinding/KeybindingProvider.rs",
	},

	KeybindingsSynchronizer: CocoonRoot,

	LAND_: AirRoot,

	LAND_ORIG_ZDOTDIR: AirRoot,

	LAND_SHELL_INTEGRATION_ACTIVE: AirRoot,

	LOCALAPPDATA: AirRoot,

	LOG_LEVEL: AirRoot,

	Lair: AirRoot,

	"Land/Cargo.toml": { Repo: ElementRepos.Land, Path: "Cargo.toml" },

	"Land/Container/Up.sh": {
		Repo: ElementRepos.Land,

		Path: "Container/Up.sh",
	},

	"Land/Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		CocoonCocoonMain,

	"Land/Element/Cocoon/Source/Utility/Tier.ts": CocoonUtilityTier,

	"Land/Element/Mountain/Source/IPC/WindServiceHandlers/mod.rs":
		MountainWindServiceHandlersMod,

	"Land/Element/Mountain/Source/LandFixTier.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/LandFixTier.rs",
	},

	"Land/Element/Mountain/build.rs": MountainBuild,

	"Land/Element/Sky/astro.config.ts": SkyAstroconfig,

	"Land/Element/Wind/Source/Utility/Tier.ts": WindUtilityTier,

	"Land/Maintain/Debug/Build.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/Build.sh",
	},

	"Land/Maintain/Release/Build.sh": LandReleaseBuild,

	"Land/Maintain/Script/TierEnvironment.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/TierEnvironment.sh",
	},

	"Land/package.json": { Repo: ElementRepos.Land, Path: "package.json" },

	"Land/rust-toolchain.toml": {
		Repo: ElementRepos.Land,

		Path: "rust-toolchain.toml",
	},

	"Land/turbo.json": { Repo: ElementRepos.Land, Path: "turbo.json" },

	LandDiagnostics: { Repo: ElementRepos.Output, Path: "" },

	LandDnsResolver: {
		Repo: ElementRepos.Mist,

		Path: "Source/Resolver.rs",

		Line: 36,
	},

	LandFixLog: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Utility/Land/Fix/Log.ts",

		Line: 232,
	},

	"LandFixLog.Info": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/TierGatedImplementationSelection.md",

		Line: 303,
	},

	LandIsProduction: AirRoot,

	LandWorkbenchLayer: CocoonRoot,

	LanguageFeatureProviderRegistry: {
		Repo: ElementRepos.Common,

		Path: "Source/LanguageFeature/LanguageFeatureProviderRegistry.rs",

		Line: 39,
	},

	LanguageFeaturesProvider: MountainRoot,

	LanguageProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Command/Bootstrap.rs",

		Line: 216,
	},

	LanguageProviderHandler: CocoonRoot,

	LanguageService: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/services/languageService.ts",

		Line: 15,
	},

	LastActivity: LandRoot,

	LaunchAndManageCocoonSidecar: MountainRoot,

	Layer: { Repo: ElementRepos.Common, Path: "Source/Container.ts", Line: 29 },

	"Layer.effect": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 172,
	},

	"Layer.empty": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Effect-OTel.md",

		Line: 69,
	},

	"Layer.mergeAll": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Effect-OTel.md",

		Line: 70,
	},

	"Layer.succeed": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 172,
	},

	"Layer.toRuntime": {
		Repo: ElementRepos.Wind,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 233,
	},

	Layer2: LandRoot,

	Layer3: LandRoot,

	Layer4: LandRoot,

	Layer5: LandRoot,

	"Layout.astro": {
		Repo: ElementRepos.Sky,

		Path: "astro.config.ts",

		Line: 982,
	},

	Lazy: { Repo: EditorRepo, Path: "src/vs/base/common/lazy.ts", Line: 12 },

	Level: { Repo: ElementRepos.Output, Path: "Source/ESBuild.ts", Line: 11 },

	LifecycleWhenPhase: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/UI/mod.rs",

		Line: 27,
	},

	Linux: LandRoot,

	LiveClipboardService: WindRoot,

	LiveDialogService: WindRoot,

	LiveEditorService: WindRoot,

	LiveReloadPort: AirRoot,

	"LoadFromCache.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",
	},

	"Loading.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/ConfigurationProvider/Loading.rs",
	},

	LocalStorageService: LandRoot,

	Lodge: AirRoot,

	LogMaxSize: AirRoot,

	LogPruneOnBoot: AirRoot,

	LogRetention: AirRoot,

	LogService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/log/common/logService.ts",

		Line: 10,
	},

	Low: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/PathExtraction.rs",

		Line: 134,
	},

	MAX_CONCURRENT_DOWNLOADS: AirRoot,

	MAX_CONNECTIONS: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Server/Initialize.rs",

		Line: 61,
	},

	MAX_RETRY_ATTEMPTS: {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",

		Line: 35,
	},

	MIST_PORT: AirRoot,

	MM: LandRoot,

	MOUNTAIN_GRPC_PORT: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement.rs",

		Line: 179,
	},

	Main: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/mod.rs",

		Line: 52,
	},

	"Main.ts": CocoonCocoonMain,

	MainContext: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 4081,
	},

	MainThreadBulkEdits: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/browser/mainThreadBulkEdits.ts",

		Line: 20,
	},

	"Maintain/Debug/Build.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/Build.sh",
	},

	"Maintain/Debug/Run.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Debug/Run.sh",
	},

	"Maintain/Release/Build.sh": LandReleaseBuild,

	"Maintain/Script/GenerateRouteManifest.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/GenerateRouteManifest.sh",
	},

	"Maintain/Script/PostHogCapture.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/PostHogCapture.sh",
	},

	"Maintain/Script/SignBundle.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/SignBundle.sh",
	},

	"Maintain/Script/TierEnvironment.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/TierEnvironment.sh",
	},

	"Maintain/Test/TelemetryTreeShake.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Test/TelemetryTreeShake.sh",
	},

	"MarkerDataDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/MarkerDataDTO.rs",
	},

	Memento: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 88,
	},

	"MementoLoader/AttemptMementoRecovery.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/Internal/Persistence/MementoLoader/AttemptMementoRecovery.rs",
	},

	"MementoLoader/CreateCorruptedBackup.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/Internal/Persistence/MementoLoader/CreateCorruptedBackup.rs",
	},

	"MergedConfigurationStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/MergedConfigurationStateDTO.rs",
	},

	MessageType: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/Common/mod.rs",

		Line: 8,
	},

	Meta: { Repo: ElementRepos.Cocoon, Path: "Source/ESBuild.ts", Line: 5 },

	MistTransport: {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/mod.rs",

		Line: 40,
	},

	MockClipboardLayer: CocoonRoot,

	"Mountain.astro": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge.ts",

		Line: 83,
	},

	"Mountain/.../Utilities/RecentlyOpened.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/RecentlyOpened.rs",
	},

	"Mountain/Cargo.toml": { Repo: ElementRepos.Mountain, Path: "Cargo.toml" },

	"Mountain/Proto/Vine.proto": {
		Repo: ElementRepos.Mountain,

		Path: "Proto/Vine.proto",
	},

	"Mountain/Source/Binary/Main/Entry.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/Entry.rs",
	},

	"Mountain/Source/Environment/FileSystemProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/FileSystemProvider.rs",
	},

	"Mountain/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",
	},

	"Mountain/Source/Environment/LanguageFeatureProvider/Registration.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/Registration.rs",
	},

	"Mountain/Source/IPC/WindServiceHandlers/mod.rs":
		MountainWindServiceHandlersMod,

	"Mountain/Source/LandFixTier.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/LandFixTier.rs",
	},

	"Mountain/Source/Shim/Gate.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Shim/Gate.rs",
	},

	"Mountain/Source/Shim/SwallowMap.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Shim/SwallowMap.rs",
	},

	"Mountain/build.rs": MountainBuild,

	MountainCommand: AirRoot,

	MountainConfiguration: AirRoot,

	MountainConnectMaxAttempts: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",

		Line: 119,
	},

	MountainConnection: {
		Repo: ElementRepos.Air,

		Path: "Source/ApplicationState/ApplicationState.rs",

		Line: 297,
	},

	MountainDir: AirRoot,

	MountainDocument: AirRoot,

	MountainEnvironment: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/MountainEnvironment.rs",

		Line: 71,
	},

	"MountainEnvironment.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/MountainEnvironment.rs",
	},

	MountainFileSystem: AirRoot,

	MountainIPCInvoke: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/IPC/InvokeCommand.rs",

		Line: 67,
	},

	MountainProbeMaxAttempts: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",

		Line: 111,
	},

	MountainProbeTimeoutMs: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",

		Line: 109,
	},

	MountainService: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/vine.rs",

		Line: 2002,
	},

	MountainWorkspace: AirRoot,

	Mute: AirRoot,

	"NLS.astro": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Default.astro",

		Line: 2,
	},

	NN: LandRoot,

	NODE_ENV: {
		Repo: SWCProjectGithubIoRepo,

		Path: "assets/js/2ea007dc.f22f21cf.js",

		Line: 1,
	},

	NODE_EXTRA_CA_CERTS: { Repo: ElementRepos.Mist, Path: "" },

	NSQuitAlwaysKeepsWindows: CocoonRoot,

	NXDOMAIN: { Repo: ElementRepos.Mist, Path: "" },

	Native: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/FileSystem/mod.rs",

		Line: 14,
	},

	"NativeHost/Quit.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/NativeHost/Quit.rs",
	},

	"NativeHost/Relaunch.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/NativeHost/Relaunch.rs",
	},

	NativeWorkbenchEnvironmentService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/environment/electron-browser/environmentService.ts",

		Line: 59,
	},

	"NativeWorkbenchEnvironmentService.logsHome": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 257,
	},

	NetworkAirPort: AirRoot,

	NetworkCocoonPort: AirRoot,

	NetworkMountainPort: AirRoot,

	NlsSection: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 344,
	},

	Node: {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Polyfill/Workbench/Paint/Prime.ts",

		Line: 75,
	},

	"Node.js": { External: "https://nodejs.org" },

	NodeDeferred: LandRoot,

	NodePlatform: { Repo: SWCDevRepo, Path: "arch/src/lib.rs", Line: 61 },

	"NodeRuntime.runMain": {
		Repo: ElementRepos.Cocoon,

		Path: "Documentation/GitHub/DeepDive.md",

		Line: 38,
	},

	NodeVersion: LandRoot,

	None: { Repo: EditorRepo, Path: "src/vs/base/common/event.ts", Line: 51 },

	Normal: LandRoot,

	"Notification/Handler.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Notification/Handler.ts",
	},

	NotificationHandler: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/IPC/Protocol.ts",

		Line: 114,
	},

	Notify: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Cocoon/mod.rs",

		Line: 9,
	},

	OTLP: {
		Repo: ElementRepos.Common,

		Path: "Source/Telemetry/IsAllowed.rs",

		Line: 28,
	},

	OTLPEnabled: AirRoot,

	OTLPEndpoint: AirRoot,

	OTLP_TRACE_ID: LandRoot,

	OXC: { External: "https://oxc-project.github.io" },

	Off: AirRoot,

	On: { Repo: ElementRepos.Cocoon, Path: "Source/ESBuild.ts", Line: 7 },

	OnceLock: CocoonRoot,

	OpenChannelFromCocoon: LandRoot,

	OpenChannelFromMountain: LandRoot,

	OptionalFromAsync: CocoonRoot,

	OsSection: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 360,
	},

	"Output/ESBuild/Output.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.ts",
	},

	"Output/Source/ESBuild.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild.ts",
	},

	"Output/Source/ESBuild/Output.js": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.js",
	},

	"Output/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Index.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Index.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Init.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Init.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/Index.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/Index.ts",
	},

	"Output/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts",
	},

	"Output/Source/Service/CEL/Null/Extension/Gallery/Service.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Null/Extension/Gallery/Service.ts",
	},

	"Output/Source/Service/CEL/Null/Telemetry/Service.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Null/Telemetry/Service.ts",
	},

	"Output/Source/Service/CEL/Null/Update/Service.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Null/Update/Service.ts",
	},

	"Output/Source/Service/Tauri/Main/Process/Service.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Service/Tauri/Main/Process/Service.ts",
	},

	"OutputChannelStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/OutputChannelStateDTO.rs",
	},

	Own: MountainRoot,

	PASSTHROUGH: MountainRoot,

	PATH: {
		Repo: EditorRepo,

		Path: "src/vs/server/node/extensionHostConnection.ts",

		Line: 52,
	},

	PTY: CocoonRoot,

	Pack: AirRoot,

	Parallel: {
		Repo: ElementRepos.Rest,

		Path: "Source/Struct/Binary/Command/Option.rs",

		Line: 65,
	},

	Parallel16: AirRoot,

	Parallel4: AirRoot,

	Parallel8: AirRoot,

	PascalCase: LandRoot,

	PatchProcess: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/PatchProcess.ts",

		Line: 24,
	},

	"PatchProcess/index.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/PatchProcess/index.ts",
	},

	PathBuf: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/FileSystem/Native/FileDeleteNative.rs",

		Line: 19,
	},

	PathCanon: { Repo: CacheRepo, Path: "Source/Library.rs", Line: 37 },

	PathResolver: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 236,
	},

	"PerElement.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/PerElement.md",
	},

	PerformAction: AirRoot,

	Pick: {
		Repo: EditorRepo,

		Path: "src/vs/platform/quickinput/browser/pickerQuickAccess.ts",

		Line: 104,
	},

	"Platform/FiddeeRoot.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Platform/FiddeeRoot.ts",
	},

	"PlatformPaths.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/PlatformPaths.md",
	},

	"Policy.ts": { Repo: ElementRepos.Worker, Path: "Source/Worker/Policy.ts" },

	"Polyfills.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Polyfills.md",
	},

	Position: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Command/Hover/Interface.rs",

		Line: 23,
	},

	PostHog: {
		Repo: ElementRepos.Common,

		Path: "Source/Telemetry/IsAllowed.rs",

		Line: 16,
	},

	Preempt: MountainRoot,

	"Preload.ts": { Repo: ElementRepos.Wind, Path: "Source/Preload.ts" },

	Probe: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/Utility/EnhanceShellEnvironment.rs",

		Line: 30,
	},

	Process: {
		Repo: ElementRepos.Maintain,

		Path: "Source/Run/Process.rs",

		Line: 65,
	},

	ProcessCocoonRequest: LandRoot,

	ProcessManagement: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Library.rs",

		Line: 106,
	},

	"ProcessManagement/CocoonManagement.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/CocoonManagement.rs",
	},

	"ProcessManagement/InitializationData.rs":
		MountainProcessManagementInitializationData,

	ProcessMountainRequest: LandRoot,

	ProductApplicationName: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 227,
	},

	ProductCommit: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 245,
	},

	ProductConfig: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 350,
	},

	ProductDataFolderName: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 233,
	},

	ProductEmbedderIdentifier: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 273,
	},

	ProductFlavor: AirRoot,

	ProductFlavorLong: AirRoot,

	ProductNameLong: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 221,
	},

	ProductNameShort: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 215,
	},

	ProductQuality: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 252,
	},

	ProductServerApplicationName: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 266,
	},

	ProductUrlProtocol: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 260,
	},

	ProductVersion: {
		Repo: ElementRepos.Land,

		Path: "Maintain/Codegen/ResolveIdentity.ts",

		Line: 239,
	},

	Production: {
		Repo: ElementRepos.Echo,

		Path: "Example/Sequence.rs",

		Line: 24,
	},

	"Production.Bundled": {
		Repo: ElementRepos.Land,

		Path: "turbo.json",

		Line: 19,
	},

	"Production.Diagnostics": {
		Repo: ElementRepos.Land,

		Path: "turbo.json",

		Line: 20,
	},

	"Production.Extensions": {
		Repo: ElementRepos.Land,

		Path: "turbo.json",

		Line: 21,
	},

	"Production.Node": {
		Repo: ElementRepos.Land,

		Path: "turbo.json",

		Line: 22,
	},

	"Production.PostHog": {
		Repo: ElementRepos.Land,

		Path: "turbo.json",

		Line: 23,
	},

	Profile: {
		Repo: ElementRepos.Maintain,

		Path: "Source/Run/Definition.rs",

		Line: 243,
	},

	"Profile.sh": { Repo: ElementRepos.Land, Path: "Maintain/Profile.sh" },

	ProfilesSection: {
		Repo: ElementRepos.Mountain,

		Path: "Source/ProcessManagement/InitializationData.rs",

		Line: 336,
	},

	ProgressReport: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/UI/mod.rs",

		Line: 41,
	},

	Promise: {
		Repo: EditorRepo,

		Path: "extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts",

		Line: 42453,
	},

	"Proto/Vine.proto": VineProtoVine,

	ProvideCallHierarchyIncomingCalls: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 27,
	},

	ProvideCallHierarchyOutgoingCalls: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 31,
	},

	ProvideCodeActions: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 35,
	},

	ProvideCodeLenses: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 39,
	},

	ProvideCompletionItems: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 33,
	},

	ProvideDefinition: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 47,
	},

	ProvideDocumentFormatting: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 39,
	},

	ProvideDocumentHighlights: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 55,
	},

	ProvideDocumentRangeFormatting: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 47,
	},

	ProvideDocumentSymbols: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 67,
	},

	ProvideFoldingRanges: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 75,
	},

	ProvideHover: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 79,
	},

	ProvideInlayHints: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 83,
	},

	ProvideInlineCompletionItems: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 63,
	},

	ProvideLinkedEditingRanges: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 91,
	},

	ProvideOnTypeFormatting: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 70,
	},

	ProvideReferences: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 99,
	},

	ProvideRenameEdits: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 103,
	},

	ProvideSelectionRanges: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 107,
	},

	ProvideSemanticTokensFull: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 111,
	},

	ProvideSignatureHelp: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 115,
	},

	ProvideTypeHierarchySubtypes: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 119,
	},

	ProvideTypeHierarchySupertypes: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 123,
	},

	ProvideWorkspaceSymbols: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

		Line: 127,
	},

	"ProviderRegistrationDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/ProviderRegistrationDTO.rs",
	},

	ProviderRegistrationDto: MountainRoot,

	Proxy: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/Utilities/mod.rs",

		Line: 7,
	},

	Queue: { Repo: ElementRepos.Echo, Path: "Source/Library.rs", Line: 51 },

	QuickInputService: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/QuickInput.ts",

		Line: 52,
	},

	"README.md": { Repo: ElementRepos.Land, Path: "README.md" },

	REST_BINARY_PATH: {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Rest/Plugin.ts",

		Line: 47,
	},

	REST_CLASS_FIELDS: LandRoot,

	REST_DECORATORS: LandRoot,

	REST_ENTRY: LandRoot,

	REST_MINIFY: LandRoot,

	REST_OUT_DIR: LandRoot,

	REST_SOURCEMAP: LandRoot,

	REST_TARGET: LandRoot,

	REST_WORKERS: LandRoot,

	RETRY_BASE_DELAY_MS: {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",

		Line: 38,
	},

	"RPCModelContentChangeDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/RPCModelContentChangeDTO.rs",
	},

	RPCProtocol: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/extensions/common/rpcProtocol.ts",

		Line: 115,
	},

	RPCServer: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/RPCServer.ts",

		Line: 162,
	},

	RUST_LOG: AirRoot,

	Range: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Command/Hover/Interface.rs",

		Line: 26,
	},

	ReadFile: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/FileSystem.rs",

		Line: 20,
	},

	Record: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Codegen/Run/Ext/Host/Codegen.ts",

		Line: 89,
	},

	RecordSideCarFailure: {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",

		Line: 180,
	},

	RedirectHandler: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",

		Line: 46,
	},

	"Register.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/Register.ts",
	},

	RegisterCallHierarchyProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 102,
	},

	RegisterCodeActionsProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 105,
	},

	RegisterCodeLensProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 108,
	},

	RegisterCommand: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Language/Provider/Registry.ts",

		Line: 111,
	},

	RegisterCompletionItemProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 112,
	},

	RegisterDefinitionProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 115,
	},

	RegisterDocumentFormattingProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 119,
	},

	RegisterDocumentHighlightProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 123,
	},

	RegisterDocumentRangeFormattingProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 127,
	},

	RegisterDocumentSymbolProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 131,
	},

	RegisterFoldingRangeProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 134,
	},

	RegisterHoverProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 137,
	},

	RegisterInlayHintsProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 140,
	},

	RegisterInlineCompletionItemProvider: AirRoot,

	RegisterLinkedEditingRangeProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 144,
	},

	RegisterOnTypeFormattingProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 148,
	},

	RegisterReferenceProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 151,
	},

	RegisterRenameProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 154,
	},

	RegisterSelectionRangeProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 158,
	},

	RegisterSemanticTokensProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 162,
	},

	RegisterSignatureHelpProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 165,
	},

	RegisterTypeHierarchyProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 168,
	},

	RegisterWorkspaceSymbolProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Provider.rs",

		Line: 172,
	},

	"Release.sh": { Repo: ElementRepos.Land, Path: "Maintain/Release.sh" },

	"Release/Build.sh": LandReleaseBuild,

	RemoteProcedureCall: LandRoot,

	Render: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_parser/tests/tsc/jsDeclarationsReferenceToClassInstanceCrossFile.ts",

		Line: 17,
	},

	Replace: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/TerminalEnvCollection.rs",

		Line: 86,
	},

	Replay: {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/ReplayEvents.ts",

		Line: 41,
	},

	Report: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/terminalContrib/chatAgentTools/browser/tools/consoleCompactor/consoleCompactor.ts",

		Line: 41,
	},

	RequestRoutingHandler: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",

		Line: 954,
	},

	Require: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Extension/Host/ActivateExtension.ts",

		Line: 818,
	},

	RequireInterceptor: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/RequireInterceptor.ts",

		Line: 69,
	},

	Requires: {
		Repo: ElementRepos.Common,

		Path: "Source/Environment/mod.rs",

		Line: 17,
	},

	ResolveUIRequest: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/UIRequest/mod.rs",

		Line: 6,
	},

	Resources: {
		Repo: ElementRepos.Air,

		Path: "Source/Binary/Monitor/StartMonitoring.rs",

		Line: 149,
	},

	RestPlugin: {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.ts",

		Line: 6,
	},

	Rhai: { External: "https://rhai.rs" },

	Ring: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/tests/benches-full/echarts.js",

		Line: 6810,
	},

	RollbackUpdate: AirRoot,

	Rollup: {
		Repo: ElementRepos.Sky,

		Path: "Source/pages/index.astro",

		Line: 59,
	},

	RoutePatterns: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Request/Routing/Handler.ts",

		Line: 56,
	},

	RunTime: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Library.rs",

		Line: 90,
	},

	"RunTime/Shutdown/SaveApplicationState.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/RunTime/Shutdown/SaveApplicationState.rs",
	},

	Runtime: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/AppLifecycle.rs",

		Line: 534,
	},

	Rust: { External: "https://www.rust-lang.org" },

	RwLock: {
		Repo: ElementRepos.Air,

		Path: "Source/Indexing/Store/UpdateIndex.rs",

		Line: 272,
	},

	SIDECAR_CLIENTS: {
		Repo: ElementRepos.Land,

		Path: "Documentation/Rust/doc/Vine/Client/Shared/struct.SIDECAR_CLIENTS.html",

		Line: 1,
	},

	SIGINT: CocoonRoot,

	SIGKILL: AirRoot,

	SIGTERM: CocoonRoot,

	SKIP_WAITING: LandRoot,

	"ScanAndPopulateExtensions.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs",
	},

	Scheduler: {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/Scheduler.rs",

		Line: 26,
	},

	SchedulerBuilder: {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/mod.rs",

		Line: 11,
	},

	ScmProvider: SkyRoot,

	Scope: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Cancellation.ts",

		Line: 10,
	},

	"Script/SignBundle.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/SignBundle.sh",
	},

	Search: { Repo: ElementRepos.Common, Path: "Source/Library.rs", Line: 116 },

	SearchOptions: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.textSearchProvider.d.ts",

		Line: 50,
	},

	SearchProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Search/mod.rs",

		Line: 6,
	},

	"SearchProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Search/SearchProvider.rs",
	},

	Secret: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 35,
	},

	SecretProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Secret/SecretProvider.rs",

		Line: 18,
	},

	"SecretProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Secret/SecretProvider.rs",
	},

	SecretStorage: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 556,
	},

	SecretsProvider: CocoonRoot,

	SendCocoonNotification: LandRoot,

	SendMountainNotification: LandRoot,

	SendTextToTerminalLogic: MountainRoot,

	Sequential: {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/Binary/Command.rs",

		Line: 160,
	},

	Serialize: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/testing/common/testTypes.ts",

		Line: 169,
	},

	"Server/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",
	},

	"Service.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Transform/Replace/Telemetry/Service.ts",
	},

	"Service/Effect/Bootstrap.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",
	},

	"Service/Effect/Module/Interceptor.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Module/Interceptor.ts",
	},

	"Service/Mapping.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Mapping.ts",
	},

	ServiceUpstream: CocoonRoot,

	ServiceWorker: LandRoot,

	"Services/API/Factory/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/API/Factory/Service.ts",
	},

	"Services/Configuration.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Configuration.ts",
	},

	"Services/Extension/Context.ts": CocoonExtensionContext,

	"Services/Extension/Host/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Host/Service.ts",
	},

	"Services/Handler/Extension/Host/ActivateExtension.ts":
		CocoonHostActivateExtension,

	"Services/Handler/Notification/Handler.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Notification/Handler.ts",
	},

	"Services/Mountain/Client/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/Client/Service.ts",
	},

	"Services/Mountain/gRPC/Client.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/gRPC/Client.ts",
	},

	"Services/Window.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window.ts",
	},

	"Services/Workspace.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Workspace.ts",
	},

	"Services/gRPC/Server/Service.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",
	},

	SettingsSynchronizer: CocoonRoot,

	Shared: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Client.rs",

		Line: 37,
	},

	SharedMemory: LandRoot,

	"ShellIntegration.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/Terminal/ShellIntegration.rs",
	},

	ShimEvent: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",

		Line: 59,
	},

	ShimLevel: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",

		Line: 12,
	},

	Ship: AirRoot,

	ShowMessageRequest: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/mod.rs",

		Line: 278,
	},

	"SideCar/Cache.json": { Repo: ElementRepos.SideCar, Path: "Cache.json" },

	"SignBundle.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/SignBundle.sh",
	},

	Simple: {
		Repo: ElementRepos.Maintain,

		Path: "tests/Eliminate/Integration.rs",

		Line: 95,
	},

	Skip: AirRoot,

	"Sky/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge.ts",
	},

	"Sky/Function/SmokeTest/Auto/Diagnose/Input.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/SmokeTest/Auto/Diagnose/Input.ts",
	},

	"Sky/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts",
	},

	"Sky/Source/Function/Build/BakeExtensionManifest.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Build/BakeExtensionManifest.ts",
	},

	"Sky/Source/Function/Sky/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge.ts",
	},

	"Sky/Workbench/Electron/Bootstrap.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Bootstrap.ts",
	},

	"Sky/Workbench/Electron/Post/Hog/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Post/Hog/Bridge.ts",
	},

	"Sky/astro.config.ts": SkyAstroconfig,

	SkyBridge: LandRoot,

	Smoke: AirRoot,

	"Source/Apply/Pipeline.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Apply/Pipeline.ts",
	},

	"Source/Authentication/mod.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Authentication/mod.rs",
	},

	"Source/Binary.rs": AirSourceBinary,

	"Source/Binary/Binary.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Binary/Binary.rs",
	},

	"Source/Build/CLI/Cli.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/CLI/Cli.rs",
	},

	"Source/Build/Definition.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Definition.rs",
	},

	"Source/Build/Error.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Error.rs",
	},

	"Source/Build/Fn.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Fn.rs",
	},

	"Source/Build/GetTauriTargetTriple.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/GetTauriTargetTriple.rs",
	},

	"Source/Build/JsonEdit.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/JsonEdit.rs",
	},

	"Source/Build/Logger.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Logger.rs",
	},

	"Source/Build/Pascalize.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Pascalize.rs",
	},

	"Source/Build/PlistEdit.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/PlistEdit.rs",
	},

	"Source/Build/Rhai/ConfigLoader.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Rhai/ConfigLoader.rs",
	},

	"Source/Build/Rhai/EnvironmentResolver.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Rhai/EnvironmentResolver.rs",
	},

	"Source/Build/Rhai/ScriptRunner.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Rhai/ScriptRunner.rs",
	},

	"Source/Build/TomlEdit.rs": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/TomlEdit.rs",
	},

	"Source/Codegen/Emit/EmitServiceSchema.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Codegen/Emit/EmitServiceSchema.ts",
	},

	"Source/Configuration/ESBuild/Config/TargetConfig.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Configuration/ESBuild/Config/TargetConfig.ts",
	},

	"Source/DevLog.rs": { Repo: ElementRepos.Grove, Path: "Source/DevLog.rs" },

	"Source/Download.rs": {
		Repo: ElementRepos.SideCar,

		Path: "Source/Download.rs",
	},

	"Source/Downloader/mod.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Downloader/mod.rs",
	},

	"Source/ESBuild.ts": { Repo: ElementRepos.Wind, Path: "Source/ESBuild.ts" },

	"Source/ESBuild/Output.js": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.js",
	},

	"Source/ESBuild/Output.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Output.ts",
	},

	"Source/ESBuild/Rest/Plugin.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/ESBuild/Rest/Plugin.ts",
	},

	"Source/Effect/RPCServer.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/RPCServer.ts",
	},

	"Source/Error.rs": { Repo: ElementRepos.Vine, Path: "Source/Error.rs" },

	"Source/Fn/Build.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/Build.rs",
	},

	"Source/Fn/OXC/Codegen.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Codegen.rs",
	},

	"Source/Fn/OXC/Compiler.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Compiler.rs",
	},

	"Source/Fn/OXC/Parser.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Parser.rs",
	},

	"Source/Fn/OXC/Transformer.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Fn/OXC/Transformer.rs",
	},

	"Source/ForwardSecurity.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/ForwardSecurity.rs",
	},

	"Source/Function/Debug.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Debug.ts",
	},

	"Source/Function/Install.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Function/Install.ts",
	},

	"Source/Function/Shared.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Shared.ts",
	},

	"Source/Function/Sky/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge.ts",
	},

	"Source/HTTP/Client.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/HTTP/Client.rs",
	},

	"Source/Host.rs": { Repo: ElementRepos.Vine, Path: "Source/Host.rs" },

	"Source/Host/APIBridge.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/APIBridge.rs",
	},

	"Source/Host/ExtensionHost.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/ExtensionHost.rs",
	},

	"Source/Host/ExtensionManager.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/ExtensionManager.rs",
	},

	"Source/Host/Lifecycle.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Host/Lifecycle.rs",
	},

	"Source/IPC/Channel.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/IPC/Channel.ts",
	},

	"Source/IPC/TauriIPCServer.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/TauriIPCServer.rs",
	},

	"Source/Initialize/Command/HandleCommand.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Initialize/Command/HandleCommand.rs",
	},

	"Source/Initialize/Configure/Log/ConfigureLog.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Initialize/Configure/Log/ConfigureLog.rs",
	},

	"Source/Library.rs": { Repo: ElementRepos.Air, Path: "Source/Library.rs" },

	"Source/Main.rs": { Repo: ElementRepos.Rest, Path: "Source/Main.rs" },

	"Source/Multiplexer.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Multiplexer.rs",
	},

	"Source/Plugin/Apply.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Apply.ts",
	},

	"Source/Plugin/Index.ts": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Index.ts",
	},

	"Source/Preload.ts": { Repo: ElementRepos.Wind, Path: "Source/Preload.ts" },

	"Source/Protocol/SpineConnection.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Protocol/SpineConnection.rs",
	},

	"Source/Queue/StealingQueue.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Queue/StealingQueue.rs",
	},

	"Source/Resolver.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/Resolver.rs",
	},

	"Source/Scheduler/Scheduler.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/Scheduler.rs",
	},

	"Source/Scheduler/SchedulerBuilder.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/SchedulerBuilder.rs",
	},

	"Source/Scheduler/Worker.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Scheduler/Worker.rs",
	},

	"Source/Server.rs": { Repo: ElementRepos.Mist, Path: "Source/Server.rs" },

	"Source/Service/TauriMainProcessService.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Service/TauriMainProcessService.ts",
	},

	"Source/Services/Configuration.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Configuration.ts",
	},

	"Source/Services/ConfigurationService.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Services/ConfigurationService.rs",
	},

	"Source/Services/Window.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window.ts",
	},

	"Source/Services/Workspace.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Workspace.ts",
	},

	"Source/Struct/CompilerConfig.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Struct/CompilerConfig.rs",
	},

	"Source/Struct/SWC.rs": {
		Repo: ElementRepos.Rest,

		Path: "Source/Struct/SWC.rs",
	},

	"Source/Task/Priority.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Task/Priority.rs",
	},

	"Source/Task/Task.rs": {
		Repo: ElementRepos.Echo,

		Path: "Source/Task/Task.rs",
	},

	"Source/Telemetry/Bridge.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Telemetry/Bridge.ts",
	},

	"Source/Telemetry/PostHog/Configuration.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHog/Configuration.ts",
	},

	"Source/Telemetry/PostHogBridge.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHogBridge.ts",
	},

	"Source/Transport/CommonAdapter.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/CommonAdapter.rs",
	},

	"Source/Transport/IPCTransport.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/IPCTransport.rs",
	},

	"Source/Transport/Strategy.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/Strategy.rs",
	},

	"Source/Transport/WASMTransport.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/WASMTransport.rs",
	},

	"Source/Transport/gRPCTransport.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/gRPCTransport.rs",
	},

	"Source/Updates/mod.rs": {
		Repo: ElementRepos.Air,

		Path: "Source/Updates/mod.rs",
	},

	"Source/Utility/Tier.ts": CocoonUtilityTier,

	"Source/WASM/HostBridge.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/HostBridge.rs",
	},

	"Source/WASM/MemoryManager.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/MemoryManager.rs",
	},

	"Source/WASM/ModuleLoader.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/ModuleLoader.rs",
	},

	"Source/WASM/Runtime.rs": {
		Repo: ElementRepos.Grove,

		Path: "Source/WASM/Runtime.rs",
	},

	"Source/WebSocket.rs": {
		Repo: ElementRepos.Mist,

		Path: "Source/WebSocket.rs",
	},

	"Source/Workbench/BrowserProxy/Bootstrap.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/BrowserProxy/Bootstrap.ts",
	},

	"Source/Workbench/Electron/Polyfills.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Polyfills.ts",
	},

	"Source/Worker/CSS/Load.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/CSS/Load.ts",
	},

	"Source/Worker/Policy.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/Policy.ts",
	},

	"Source/Worker/Register.ts": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/Register.ts",
	},

	"Source/Zone.rs": { Repo: ElementRepos.Mist, Path: "Source/Zone.rs" },

	"Source/main.rs": { Repo: ElementRepos.Grove, Path: "Source/main.rs" },

	SourceControl: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.scmHistoryProvider.d.ts",

		Line: 9,
	},

	SourceControlManagementProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/SourceControlManagement/SourceControlManagementProvider.rs",

		Line: 24,
	},

	"SourceControlManagementProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/SourceControlManagement/SourceControlManagementProvider.rs",
	},

	SourceControlResourceState: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/mod.rs",

		Line: 296,
	},

	SpanProcessor: {
		Repo: EditorRepo,

		Path: "extensions/copilot/src/extension/chatSessions/copilotcli/node/copilotCliBridgeSpanProcessor.ts",

		Line: 40,
	},

	Spine: LandRoot,

	StageUpdate: {
		Repo: ElementRepos.Air,

		Path: "Source/Updates/UpdateManager.rs",

		Line: 2059,
	},

	Standard: LandRoot,

	"State/WorkspaceState/WorkspaceDelta.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/State/WorkspaceState/WorkspaceDelta.rs",
	},

	StatusBarProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/StatusBar/StatusBarProvider.rs",

		Line: 25,
	},

	"StatusBarProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/StatusBar/StatusBarProvider.rs",
	},

	StopWatch: {
		Repo: EditorRepo,

		Path: "src/vs/base/common/stopwatch.ts",

		Line: 9,
	},

	Storage: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 74,
	},

	"Storage.Get": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/WebviewPanel/State.ts",

		Line: 379,
	},

	"Storage.Set": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/WebviewPanel/State.ts",

		Line: 358,
	},

	StorageProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/mod.rs",

		Line: 94,
	},

	"StorageProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Storage/StorageProvider.rs",
	},

	StreamActions: AirRoot,

	Stub: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Extensions/Namespace.ts",

		Line: 134,
	},

	Submit: {
		Repo: ElementRepos.Echo,

		Path: "Source/Queue/StealingQueue.rs",

		Line: 169,
	},

	SwallowAction: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Shim/SwallowMap.rs",

		Line: 16,
	},

	SwallowDecision: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",

		Line: 38,
	},

	SwallowRule: {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",

		Line: 22,
	},

	SynchronizationProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Synchronization/SynchronizationProvider.rs",

		Line: 15,
	},

	"SynchronizationProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Synchronization/SynchronizationProvider.rs",
	},

	Synchronous: AirRoot,

	SystemTime: MountainRoot,

	TA: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/tests/fixture/next/asmjs/1/input.js",

		Line: 21593,
	},

	TAURI_ENV_DEBUG: AirRoot,

	TCapability: AirRoot,

	TCapabilityProvider: MountainRoot,

	TELEMETRY_DISABLE: { Repo: ElementRepos.Common, Path: "" },

	TELEMETRY_OTLP_ENDPOINT: { Repo: ElementRepos.Common, Path: "" },

	TELEMETRY_POSTHOG_KEY: { Repo: ElementRepos.Common, Path: "" },

	TMPDIR: AirRoot,

	TN: LandRoot,

	Tag: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Notification/Handler.ts",

		Line: 332,
	},

	"TargetConfig.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Configuration/ESBuild/Config/TargetConfig.ts",
	},

	Task: { Repo: ElementRepos.Echo, Path: "Source/Library.rs", Line: 55 },

	"Task.Execute": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts",

		Line: 110,
	},

	"Task.Fetch": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts",

		Line: 91,
	},

	"Task.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/TypeConverter/Task.ts",
	},

	TaskExecution: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Task.ts",

		Line: 14,
	},

	Tauri: { External: "https://tauri.app" },

	TauriDiskFileSystemProvider: MountainRoot,

	TauriEmit: CocoonRoot,

	TauriInvoke: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Search/Service.ts",

		Line: 73,
	},

	TauriListen: {
		Repo: ElementRepos.Wind,

		Path: "Source/Preload.ts",

		Line: 353,
	},

	TauriLiveLayer: {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",

		Line: 372,
	},

	TauriMainProcessService: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/Tauri/Main/Process/Service.ts",

		Line: 1383,
	},

	"TauriMainProcessService.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Service/TauriMainProcessService.ts",
	},

	TauriWebviewWindow: CocoonRoot,

	Telemetry: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Telemetry.ts",

		Line: 122,
	},

	Terminal: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 80,
	},

	"Terminal/LocalPTYCreateProcess.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Terminal/LocalPTYCreateProcess.rs",
	},

	TerminalId: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Terminal/ResizeTerminal.rs",

		Line: 14,
	},

	TerminalOptions: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.terminalTitle.d.ts",

		Line: 10,
	},

	TerminalProvider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/mod.rs",

		Line: 106,
	},

	"TerminalProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/Terminal/TerminalProvider.rs",
	},

	"TerminalStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/TerminalStateDTO.rs",
	},

	TerminalStateDto: MountainRoot,

	TestClock: LandRoot,

	TestController: {
		Repo: ElementRepos.Common,

		Path: "Source/Testing/mod.rs",

		Line: 9,
	},

	TestEnvironment: LandRoot,

	TestLayer: {
		Repo: ElementRepos.Wind,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 212,
	},

	"TestProvider.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/TestProvider.rs",
	},

	TextDocumentContentProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 1850,
	},

	TextEdit: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/gRPC/Types.ts",

		Line: 57,
	},

	TextEditor: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.textEditorDiffInformation.d.ts",

		Line: 39,
	},

	TextEditorEdit: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 1400,
	},

	TextEditorPane: MountainRoot,

	TextEditorService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/textfile/common/textEditorService.ts",

		Line: 69,
	},

	TextFileEditorModel: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/textfile/common/textFileEditorModel.ts",

		Line: 51,
	},

	TextFileEditorModelManager: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/textfile/common/textFileEditorModelManager.ts",

		Line: 40,
	},

	Throttle: AirRoot,

	Tier: {
		Repo: ElementRepos.Common,

		Path: "Source/Telemetry/Tier.rs",

		Line: 9,
	},

	TierAuth: LandRoot,

	TierClipboard: AirRoot,

	TierClipboardLayer4: AirRoot,

	TierCommandEventBroadcast: AirRoot,

	TierConfiguration: AirRoot,

	TierConfigurationEager: AirRoot,

	TierDebug: LandRoot,

	TierDiagnostics: AirRoot,

	TierDiagnosticsDelta: AirRoot,

	TierDocumentMirror: AirRoot,

	TierEncryption: CocoonRoot,

	"TierEnvironment.sh": {
		Repo: ElementRepos.Land,

		Path: "Maintain/Script/TierEnvironment.sh",
	},

	TierExtensionActivation: AirRoot,

	TierExtensionHost: {
		Repo: ElementRepos.Mountain,

		Path: "build.rs",

		Line: 498,
	},

	TierExtensionScan: AirRoot,

	TierExtensionScanParallel: AirRoot,

	TierFileSystem: AirRoot,

	TierFileSystemLayer4: AirRoot,

	TierFileWatcher: AirRoot,

	TierFileWatcherLayer4: AirRoot,

	TierFindFiles: AirRoot,

	TierFindFilesLayer4: AirRoot,

	TierGlob: AirRoot,

	TierGlobNative: AirRoot,

	TierHTTPProxy: AirRoot,

	TierHTTPProxyHyper: AirRoot,

	TierIPC: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/DispatchMatch.rs",

		Line: 2544,
	},

	TierLanguageFeatures: LandRoot,

	TierLogger: AirRoot,

	TierLoggerRing: AirRoot,

	TierModel: CocoonRoot,

	TierModuleCache: AirRoot,

	TierNativeHost: CocoonRoot,

	TierOpenExternal: AirRoot,

	TierOpenExternalLayer4: AirRoot,

	TierOutputChannel: CocoonRoot,

	TierRemoteProcedureCall: AirRoot,

	TierRemoteProcedureCallSharedMemory: AirRoot,

	TierSCM: LandRoot,

	TierSchemeAssets: {
		Repo: ElementRepos.Mountain,

		Path: "build.rs",

		Line: 74,
	},

	TierSchemeAssetsHybrid: AirRoot,

	TierSearch: LandRoot,

	TierStorage: LandRoot,

	TierTasks: LandRoot,

	TierTelemetry: AirRoot,

	TierTerminal: LandRoot,

	TierTreeView: CocoonRoot,

	TierWebSocket: CocoonRoot,

	TierXValue: LandRoot,

	TimeoutError: {
		Repo: ElementRepos.Common,

		Path: "Source/Errors.ts",

		Line: 38,
	},

	TimingProxy: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts",

		Line: 33,
	},

	Tokio: AirRoot,

	Trace: {
		Repo: ElementRepos.Wind,

		Path: "Source/Service/Trace.ts",

		Line: 11,
	},

	"Tracer.startSpan": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Effect-OTel.md",

		Line: 239,
	},

	Track: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Library.rs",

		Line: 120,
	},

	Transport: {
		Repo: ElementRepos.Common,

		Path: "Source/Library.rs",

		Line: 153,
	},

	TransportConfig: {
		Repo: ElementRepos.Common,

		Path: "Source/Transport/mod.rs",

		Line: 56,
	},

	TreeDataProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 12236,
	},

	TreeView: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/TreeView.ts",

		Line: 236,
	},

	TreeViewProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/TreeView/mod.rs",

		Line: 9,
	},

	"TreeViewProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/TreeView/TreeViewProvider.rs",
	},

	"TreeViewStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/TreeViewStateDTO.rs",
	},

	Turborepo: { External: "https://turbo.build" },

	TypeConverter: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/WebviewPanel/Type/Converter.ts",

		Line: 89,
	},

	TypeScript: { External: "https://www.typescriptlang.org" },

	UPDATE_CHECK_INTERVAL: {
		Repo: EditorRepo,

		Path: "cli/src/tunnels/agent_host.rs",

		Line: 55,
	},

	URI: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/Initialization/InitExtensionHost.rs",

		Line: 36,
	},

	USER: AirRoot,

	USERNAME: AirRoot,

	USERPROFILE: AirRoot,

	Uint8Array: {
		Repo: ElementRepos.Common,

		Path: "TypeScript/Interface/Decrypt.ts",

		Line: 14,
	},

	UnregisterCommand: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Language/Provider/Registry.ts",

		Line: 143,
	},

	Update: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Configuration/mod.rs",

		Line: 9,
	},

	UpdateSideCarActivity: {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",

		Line: 211,
	},

	Uri: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/mod.rs",

		Line: 342,
	},

	UserDataAutoSyncService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/userDataSync/node/userDataAutoSyncService.ts",

		Line: 17,
	},

	UserDataSyncAccountService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/userDataSync/common/userDataSyncAccount.ts",

		Line: 27,
	},

	UserDataSyncStoreService: {
		Repo: EditorRepo,

		Path: "src/vs/platform/userDataSync/common/userDataSyncStoreService.ts",

		Line: 703,
	},

	"UserDotfile.md": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/UserDotfile.md",
	},

	UserInterface: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/mod.rs",

		Line: 86,
	},

	UserInterfaceProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/UserInterface/UserInterfaceProvider.rs",

		Line: 28,
	},

	"UserInterfaceProvider.rs": {
		Repo: ElementRepos.Common,

		Path: "Source/UserInterface/UserInterfaceProvider.rs",
	},

	"Utilities/UserdataDir.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Utilities/UserdataDir.rs",
	},

	"Utility/Tier.ts": WindUtilityTier,

	VINE_PORT: AirRoot,

	VSCODE_APP_ROOT: AirRoot,

	VSCODE_COCOON_GLOBAL_STORAGE: AirRoot,

	VSCODE_IPC_HOOK_CLI: CocoonRoot,

	VSCODE_PARENT_PID: CocoonRoot,

	VerifyChecksum: {
		Repo: ElementRepos.Air,

		Path: "Source/Downloader/DownloadManager.rs",

		Line: 969,
	},

	"Vine.proto": VineProtoVine,

	"Vine/Proto/Vine.proto": VineProtoVine,

	"Vine/Source/Client/CheckSideCarHealth.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/CheckSideCarHealth.rs",
	},

	"Vine/Source/Client/Shared.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Client/Shared.rs",
	},

	"Vine/Source/Library.rs": {
		Repo: ElementRepos.Vine,

		Path: "Source/Library.rs",
	},

	VineError: {
		Repo: ElementRepos.Air,

		Path: "Source/Vine/Error.rs",

		Line: 44,
	},

	VineHost: { Repo: ElementRepos.Vine, Path: "Source/Host.rs", Line: 76 },

	Vite: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_parser/tests/typescript/ts-import-type/input.ts",

		Line: 1,
	},

	WASM: { External: "https://webassembly.org" },

	WASMTransport: {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/mod.rs",

		Line: 37,
	},

	WASMtime: LandRoot,

	WaitForClientConnection: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Client.rs",

		Line: 49,
	},

	Wasmtime: { External: "https://wasmtime.dev" },

	Watch: { Repo: ElementRepos.Air, Path: "Source/Indexing/mod.rs", Line: 76 },

	"WebSocket.rs": { Repo: ElementRepos.Mist, Path: "Source/WebSocket.rs" },

	WebWorker: {
		Repo: EditorRepo,

		Path: "src/vs/platform/webWorker/browser/webWorkerServiceImpl.ts",

		Line: 141,
	},

	Webview: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/mod.rs",

		Line: 16,
	},

	WebviewManagementService: CocoonRoot,

	WebviewPanelProvider: CocoonRoot,

	WebviewPanelShim: CocoonRoot,

	WebviewProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Webview/mod.rs",

		Line: 15,
	},

	WebviewShim: CocoonRoot,

	WebviewStateDto: CocoonRoot,

	WillSaveTextDocumentEvent: CocoonRoot,

	"Wind/Source/ESBuild.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/ESBuild.ts",
	},

	"Wind/Source/IPC/Channel.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/IPC/Channel.ts",
	},

	"Wind/Source/Preload.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Preload.ts",
	},

	"Wind/Source/Service/TauriMainProcessService.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Service/TauriMainProcessService.ts",
	},

	"Wind/Source/Shim/AsyncProxy.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/AsyncProxy.ts",
	},

	"Wind/Source/Shim/AuditLog.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/AuditLog.ts",
	},

	"Wind/Source/Shim/EventInterceptor.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/EventInterceptor.ts",
	},

	"Wind/Source/Shim/FullIndex.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/FullIndex.ts",
	},

	"Wind/Source/Shim/Gate.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Gate.ts",
	},

	"Wind/Source/Shim/IPCInterceptor.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/IPCInterceptor.ts",
	},

	"Wind/Source/Shim/Index.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Index.ts",
	},

	"Wind/Source/Shim/NetworkProxy.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/NetworkProxy.ts",
	},

	"Wind/Source/Shim/RedirectBus.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/RedirectBus.ts",
	},

	"Wind/Source/Shim/SwallowMap.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/SwallowMap.ts",
	},

	"Wind/Source/Shim/Type.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/Type.ts",
	},

	"Wind/Source/Telemetry/PostHogBridge.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHogBridge.ts",
	},

	"Wind/Source/Types/Interface/IPCRenderer.ts": {
		Repo: ElementRepos.Wind,

		Path: "Source/Types/Interface/IPCRenderer.ts",
	},

	"Wind/Source/Utility/Tier.ts": WindUtilityTier,

	"Wind/src/vs/editor/common/services/languageFeaturesService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/services/languageFeaturesService.ts",
	},

	WindServiceHandlers: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/mod.rs",

		Line: 27,
	},

	"WindServiceHandlers/mod.rs": MountainWindServiceHandlersMod,

	Window: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Command.ts",

		Line: 103,
	},

	"Window.ts": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window.ts",
	},

	WindowProvider: CocoonRoot,

	WindowService: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Window/Index.ts",

		Line: 64,
	},

	"WindowStateDTO.rs": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ApplicationState/DTO/WindowStateDTO.rs",
	},

	Windows: LandRoot,

	Wire: {
		Repo: ElementRepos.Common,

		Path: "Source/IPC/SkyEvent.rs",

		Line: 361,
	},

	WorkSpace: MountainRoot,

	WorkSpaceFolderStateDTO: {
		Repo: ElementRepos.Mountain,

		Path: "Documentation/GitHub/NamingConventions.md",

		Line: 103,
	},

	WorkSpaceIdentifier: {
		Repo: ElementRepos.Mountain,

		Path: "Documentation/GitHub/NamingConventions.md",

		Line: 339,
	},

	Workbench: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/Configuration/mod.rs",

		Line: 11,
	},

	"Workbench/Bundled/Electron/Entry.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Bundled/Electron/Entry.ts",
	},

	"Workbench/Electron/Post/Hog/Bridge.ts": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Post/Hog/Bridge.ts",
	},

	"Worker.js": {
		Repo: ElementRepos.Worker,

		Path: "Configuration/ESBuild/Worker.js",
	},

	"Worker.ts": { Repo: ElementRepos.Worker, Path: "Source/Worker.ts" },

	WorkingCopyFileService: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/workingCopy/common/workingCopyFileService.ts",

		Line: 290,
	},

	Workspace: {
		Repo: ElementRepos.Common,

		Path: "Source/Library.rs",

		Line: 149,
	},

	"Workspace.SaveAll": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Workspace/Namespace/Text/Document.ts",

		Line: 643,
	},

	WorkspaceEdit: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/VSCode/Type.ts",

		Line: 65,
	},

	WorkspaceEditApplier: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/WorkspaceProvider.rs",

		Line: 616,
	},

	WorkspaceEditDTO: {
		Repo: ElementRepos.Common,

		Path: "Source/DTO/WorkspaceEditDTO.rs",

		Line: 15,
	},

	WorkspaceFolder: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/Workspace.rs",

		Line: 9,
	},

	WorkspaceProvider: {
		Repo: ElementRepos.Common,

		Path: "Source/Workspace/mod.rs",

		Line: 12,
	},

	WorkspaceService: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Workspace.ts",

		Line: 216,
	},

	WriteFile: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/FileSystem.rs",

		Line: 35,
	},

	XDG_CACHE_HOME: AirRoot,

	XDG_CONFIG_HOME: AirRoot,

	XDG_DATA_HOME: AirRoot,

	XMLHttpRequest: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/worker/extensionHostWorker.ts",

		Line: 37,
	},

	ZDOTDIR: AirRoot,

	_LOAD_CSS_WORKER: LandRoot,

	__CEL_SERVICES__: CocoonRoot,

	"__CEL_SERVICES__.CommandRegistry.registerCommand": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 64,
	},

	"__CEL_SERVICES__.Commands.executeCommand": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/WorkspaceProvider.rs",

		Line: 581,
	},

	"__CEL_SERVICES__.SCM": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallScm.ts",

		Line: 12,
	},

	"__CEL_SERVICES__.Statusbar": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 82,
	},

	"__CEL_SERVICES__.Statusbar.addEntry": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 82,
	},

	__DEV__: {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/CSS/Load.ts",

		Line: 8,
	},

	__LandProduct: AirRoot,

	__LandTier_FileSystem__: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Bootstrap/Implementation/Cocoon/Main.ts",

		Line: 44,
	},

	__LandTier_Shim__: {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Shim/NodeModuleInterceptor.ts",

		Line: 33,
	},

	__LandTiers: AirRoot,

	__activeDebugSession: CocoonRoot,

	__landDisposableId: { Repo: ElementRepos.Output, Path: "" },

	__name: {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Transform/Inject/Name/Shim.ts",

		Line: 31,
	},

	__terminals: MountainRoot,

	__textDocuments: CocoonRoot,

	__workspaceFolders: AirRoot,

	_edits: CocoonRoot,

	"_end._line": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/SavingAFileWithSaveParticipants.md",

		Line: 193,
	},

	_path: {
		Repo: PluginsWorkSpaceRepo,

		Path: "plugins/sql/guest-js/index.ts",

		Line: 49,
	},

	_range: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/notebook/browser/view/renderers/webviewPreloads.ts",

		Line: 919,
	},

	_scheme: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/notebook/common/notebookDocumentService.ts",

		Line: 34,
	},

	"_start._line": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallEditorOperations.ts",

		Line: 154,
	},

	_v: {
		Repo: EditorRepo,

		Path: "extensions/copilot/src/util/common/test/result.spec.ts",

		Line: 177,
	},

	aarch64: LandRoot,

	acceptInputCommand: SkyRoot,

	acquireRelease: CocoonRoot,

	activatedExtension: WindRoot,

	activationEvent: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/commands/common/commandService.ts",

		Line: 55,
	},

	activationEvents: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/editor/test/browser/editorGroupsService.test.ts",

		Line: 2363,
	},

	activation_events: {
		Repo: ElementRepos.Grove,

		Path: "Source/Common/Traits.rs",

		Line: 47,
	},

	activeDebugSession: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17297,
	},

	activeStackItem: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17343,
	},

	activeTextEditor: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11084,
	},

	addBreakpoints: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17411,
	},

	"api.posthog.com": {
		Repo: ElementRepos.Mist,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 164,
	},

	appName: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10747,
	},

	appRoot: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10755,
	},

	appSharedDataHome: MountainRoot,

	app_cache_dir: {
		Repo: TauriRepo,

		Path: "crates/tauri/src/path/android.rs",

		Line: 151,
	},

	app_config_dir: {
		Repo: TauriRepo,

		Path: "crates/tauri/src/path/android.rs",

		Line: 130,
	},

	app_data_dir: {
		Repo: TauriRepo,

		Path: "crates/tauri/src/path/android.rs",

		Line: 137,
	},

	app_log_dir: {
		Repo: TauriRepo,

		Path: "crates/tauri/src/path/android.rs",

		Line: 156,
	},

	applyEdit: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14149,
	},

	applyEdits: {
		Repo: EditorRepo,

		Path: "src/vs/base/common/jsonEdit.ts",

		Line: 164,
	},

	asExternalUri: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10927,
	},

	astro: CocoonRoot,

	"astro.config.ts": SkyAstroconfig,

	asyncBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 35,
	},

	async_trait: AirRoot,

	auditBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 41,
	},

	beforeBundleCommand: AirRoot,

	"build.rs": { Repo: ElementRepos.Grove, Path: "build.rs" },

	cancelBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 29,
	},

	child_process: {
		Repo: EditorRepo,

		Path: "extensions/html-language-features/build/bundleTypeScriptLibraries.js",

		Line: 8,
	},

	"child_process.spawn": {
		Repo: ElementRepos.Mountain,

		Path: "Source/ExtensionManagement/VsixInstaller.rs",

		Line: 135,
	},

	"clipboard.readText": {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Tauri/Clipboard/Wrapper.ts",

		Line: 23,
	},

	"cloud.fiddee.editor": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint.md",

		Line: 173,
	},

	"cocoon.editor.land": {
		Repo: ElementRepos.Mist,

		Path: "Documentation/GitHub/DeepDive.md",

		Line: 110,
	},

	colorScheme: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/languages/defaultDocumentColorsComputer.ts",

		Line: 111,
	},

	"commands.executeCommand": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",

		Line: 132,
	},

	"commands.executed": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTypeConverters.ts",

		Line: 2081,
	},

	"commands.registerCommand": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",

		Line: 123,
	},

	commitTemplate: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/scm/browser/scmInput.ts",

		Line: 507,
	},

	"console.error": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Build/WindowBuild.rs",

		Line: 189,
	},

	"console.info": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/TierGatedImplementationSelection.md",

		Line: 328,
	},

	"console.log": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindAdvancedSync.rs",

		Line: 219,
	},

	"console.warn": {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Build/WindowBuild.rs",

		Line: 191,
	},

	"context.extension.exports": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Extension/Host/ActivateExtension.ts",

		Line: 1097,
	},

	"context.globalState": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Transform/Instrument/Vscode/Git.ts",

		Line: 159,
	},

	"context.globalStorageUri": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/UserDotfile.md",

		Line: 67,
	},

	"context.logUri": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/UserDotfile.md",

		Line: 68,
	},

	"context.secrets": {
		Repo: ElementRepos.Mountain,

		Path: "Documentation/GitHub/DeepDive.md",

		Line: 849,
	},

	"context.secrets.delete": {
		Repo: EditorRepo,

		Path: "extensions/github-authentication/src/common/enterpriseStorage.ts",

		Line: 78,
	},

	"context.secrets.get": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 192,
	},

	"context.secrets.store": {
		Repo: EditorRepo,

		Path: "extensions/github-authentication/src/common/enterpriseStorage.ts",

		Line: 73,
	},

	"context.storageUri": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint/UserDotfile.md",

		Line: 66,
	},

	"context.subscriptions": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Host/Service.ts",

		Line: 282,
	},

	"context.workspaceState": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/Extension/Host/ActivateExtension.ts",

		Line: 864,
	},

	copy_file: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/vine.rs",

		Line: 4080,
	},

	createChatParticipant: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.chatParticipantAdditions.d.ts",

		Line: 912,
	},

	createCommentController: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17813,
	},

	createDiagnosticCollection: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14822,
	},

	createDirectory: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/benches/full/typescript.js",

		Line: 118072,
	},

	createExtensionHostManager: CocoonRoot,

	createFileSystemWatcher: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14079,
	},

	createNotebookController: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.notebookMessaging.d.ts",

		Line: 66,
	},

	createOutputChannel: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11526,
	},

	createQuickPick: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11502,
	},

	createSourceControl: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.scmProviderOptions.d.ts",

		Line: 42,
	},

	createStatusBarItem: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11641,
	},

	createTerminal: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11665,
	},

	createTestController: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 18286,
	},

	createTreeView: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11703,
	},

	createWebviewPanel: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11547,
	},

	create_directory: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/vine.rs",

		Line: 4102,
	},

	create_terminal: {
		Repo: ElementRepos.Mountain,

		Path: "Documentation/GitHub/DeepDive.md",

		Line: 333,
	},

	"crossbeam-deque": { External: "https://docs.rs/crossbeam-deque" },

	cursorMove: CocoonRoot,

	dataFolderName: { Repo: EditorRepo, Path: "src/mainImpl.ts", Line: 479 },

	"dc.services.visualstudio.com": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/NetworkProxy.ts",

		Line: 26,
	},

	"debug.addBreakpoints": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Debug/Namespace.ts",

		Line: 252,
	},

	"debug.didChangeActiveSession": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Debug/Namespace.ts",

		Line: 288,
	},

	"debug.didStartSession": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",

		Line: 1382,
	},

	debugServer: CocoonRoot,

	disposableBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 32,
	},

	distinctId: AirRoot,

	distinct_id: LandRoot,

	downloaded_at: LandRoot,

	editBuilder: MountainRoot,

	"editor.action.formatDocument": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/ExecutingACommandFromTheCommandPalette.md",

		Line: 118,
	},

	"editor.fiddee.binary": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/FilesystemFootprint.md",

		Line: 174,
	},

	"editor.fontSize": {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/ConfigurationBridge.rs",

		Line: 168,
	},

	effect: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Track/Effect/CreateEffectForRequest/Shim.rs",

		Line: 25,
	},

	emitDecoratorMetadata: { Repo: ElementRepos.Rest, Path: "" },

	emitterBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 26,
	},

	"env.clipboard": {
		Repo: ElementRepos.Cocoon,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 659,
	},

	errorBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 23,
	},

	es2022: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_compat_es2022/src/lib.rs",

		Line: 17,
	},

	esbuild: { External: "https://esbuild.github.io" },

	"event.payload._traceparent": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Effect-OTel.md",

		Line: 228,
	},

	executeCommand: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11023,
	},

	executeTask: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 9382,
	},

	"extHost.api.impl.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",
	},

	"extHost.protocol.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",
	},

	"extHostAuthentication.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostAuthentication.ts",
	},

	"extHostBulkEdits.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostBulkEdits.ts",
	},

	"extHostChatAgents2.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostChatAgents2.ts",
	},

	"extHostClipboard.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostClipboard.ts",
	},

	"extHostCommands.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",
	},

	"extHostComments.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostComments.ts",
	},

	"extHostConfiguration.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostConfiguration.ts",
	},

	"extHostCustomEditors.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCustomEditors.ts",
	},

	"extHostDebugService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDebugService.ts",
	},

	"extHostDecorations.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDecorations.ts",
	},

	"extHostDiagnostics.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDiagnostics.ts",
	},

	"extHostDialogs.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDialogs.ts",
	},

	"extHostDocumentContentProviders.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDocumentContentProviders.ts",
	},

	"extHostDocumentSaveParticipant.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDocumentSaveParticipant.ts",
	},

	"extHostDocuments.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDocuments.ts",
	},

	"extHostFileSystem.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostFileSystem.ts",
	},

	"extHostFileSystemConsumer.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostFileSystemConsumer.ts",
	},

	"extHostFileSystemEventService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostFileSystemEventService.ts",
	},

	"extHostLanguageFeatures.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageFeatures.ts",
	},

	"extHostLanguageModels.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageModels.ts",
	},

	"extHostLanguages.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguages.ts",
	},

	"extHostLocalizationService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLocalizationService.ts",
	},

	"extHostMessageService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostMessageService.ts",
	},

	"extHostNotebook.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebook.ts",
	},

	"extHostNotebookDocuments.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebookDocuments.ts",
	},

	"extHostNotebookKernels.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebookKernels.ts",
	},

	"extHostOutput.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostOutput.ts",
	},

	"extHostProgress.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostProgress.ts",
	},

	"extHostQuickOpen.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostQuickOpen.ts",
	},

	extHostRpcService: CocoonRoot,

	"extHostSCM.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostSCM.ts",
	},

	"extHostSearch.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostSearch.ts",
	},

	"extHostSecrets.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostSecrets.ts",
	},

	"extHostStatusBar.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostStatusBar.ts",
	},

	"extHostStorage.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostStorage.ts",
	},

	"extHostTask.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTask.ts",
	},

	"extHostTerminalService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTerminalService.ts",
	},

	"extHostTesting.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTesting.ts",
	},

	"extHostTextEditor.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTextEditor.ts",
	},

	"extHostTextEditors.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTextEditors.ts",
	},

	"extHostTreeViews.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTreeViews.ts",
	},

	"extHostUrls.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostUrls.ts",
	},

	"extHostWebview.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWebview.ts",
	},

	"extHostWebviewPanels.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWebviewPanels.ts",
	},

	"extHostWebviewView.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWebviewView.ts",
	},

	"extHostWindow.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWindow.ts",
	},

	"extHostWorkspace.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",
	},

	extensionDependencies: CocoonRoot,

	extensionHostStarter: CocoonRoot,

	extensionStorage: AirRoot,

	fetchTasks: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 9369,
	},

	fileUri: {
		Repo: ElementRepos.Wind,

		Path: "Source/FileSystem/README.md",

		Line: 77,
	},

	file_creates: AirRoot,

	file_deletes: AirRoot,

	file_type: {
		Repo: ElementRepos.Air,

		Path: "Source/Indexing/Scan/ScanDirectory.rs",

		Line: 423,
	},

	findFiles: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14098,
	},

	findGroup: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/editor/common/editorGroupFinder.ts",

		Line: 21,
	},

	findTextInFiles: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.findTextInFiles.d.ts",

		Line: 92,
	},

	flate2: LandRoot,

	"fs.isWritableFileSystem": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 120,
	},

	"fs.readFile": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 503,
	},

	"fs.watch": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Dual/Track.ts",

		Line: 63,
	},

	gRPC: { External: "https://grpc.io" },

	gRPCTransport: {
		Repo: ElementRepos.Grove,

		Path: "Source/Transport/mod.rs",

		Line: 31,
	},

	getAccounts: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 18166,
	},

	getCommands: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11032,
	},

	getConfiguration: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14488,
	},

	getHover: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/chat/test/browser/promptSyntax/languageProviders/promptHovers.test.ts",

		Line: 98,
	},

	getSession: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 18116,
	},

	getText: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/services/editorWebWorker.ts",

		Line: 357,
	},

	getWordRangeAtPosition: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/extensions/browser/extensionsCompletionItemsProvider.ts",

		Line: 29,
	},

	getWorkspaceFolder: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 13893,
	},

	get_clipboard: CocoonRoot,

	get_configuration: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1409,
	},

	get_env: {
		Repo: TauriRepo,

		Path: "crates/tauri-cli/src/signer/sign.rs",

		Line: 45,
	},

	"git.commit": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",

		Line: 642,
	},

	"git.createSourceControl": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Workspace/Namespace/Index.ts",

		Line: 755,
	},

	globalEnv: CocoonRoot,

	globalState: {
		Repo: EditorRepo,

		Path: "src/vs/base/test/common/event.test.ts",

		Line: 782,
	},

	globalStorage: {
		Repo: EditorRepo,

		Path: "extensions/copilot/src/extension/chatSessions/vscode-node/test/copilotCLINativeShim.spec.ts",

		Line: 23,
	},

	globalThis: {
		Repo: EditorRepo,

		Path: "src/vs/base/common/worker/webWorkerBootstrap.ts",

		Line: 12,
	},

	"globalThis.__CEL_WIND_RUNTIME__": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 172,
	},

	"globalThis.__LandTiers": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Utility/Tier.ts",

		Line: 14,
	},

	"globalThis.__cocoonBootstrapConfig": {
		Repo: ElementRepos.Cocoon,

		Path: "Documentation/GitHub/DeepDive.md",

		Line: 929,
	},

	"globalThis.__filename": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Polyfills.md",

		Line: 63,
	},

	grep_searcher: CocoonRoot,

	http_parser: SkyRoot,

	"import.meta.env": {
		Repo: ElementRepos.Wind,

		Path: "Source/Utility/Tier.ts",

		Line: 5,
	},

	"import.meta.env.DEV": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHogBridge.ts",

		Line: 40,
	},

	"import.meta.env.Disable": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge.ts",

		Line: 383,
	},

	"import.meta.env.TierFileSystem": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/BuildPipeline.md",

		Line: 301,
	},

	"index.astro": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EnvironmentVariables.md",

		Line: 267,
	},

	"index.html": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Rust/doc/index.html",
	},

	initExtensionHost: CocoonRoot,

	"inputBox.placeholder": {
		Repo: EditorRepo,

		Path: "src/vs/editor/contrib/find/browser/findController.ts",

		Line: 848,
	},

	"inputBox.value": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallScm.ts",

		Line: 694,
	},

	ipcRenderer: {
		Repo: ElementRepos.Output,

		Path: "Source/Polyfill/IPC/Renderer/Shim.ts",

		Line: 1265,
	},

	isAppPortable: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10805,
	},

	isNewAppInstall: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10795,
	},

	join_all: MountainRoot,

	json5: {
		Repo: TauriRepo,

		Path: "crates/tauri-utils/src/config_v1/parse.rs",

		Line: 154,
	},

	languageId: {
		Repo: ElementRepos.Cocoon,

		Path: "Archive/Workspace.ts",

		Line: 76,
	},

	languageModelsResource: MountainRoot,

	"languages.setLanguageConfiguration": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageFeatures.ts",

		Line: 3010,
	},

	lineAt: CocoonRoot,

	localGit: CocoonRoot,

	localPty: CocoonRoot,

	localResourceRoots: CocoonRoot,

	localStorage: {
		Repo: EditorRepo,

		Path: "src/vs/platform/agentHost/test/node/agentHostCatalogSyncService.test.ts",

		Line: 240,
	},

	logsPath: { Repo: EditorRepo, Path: "src/server-main.ts", Line: 190 },

	macOS: {
		Repo: TauriRepo,

		Path: "examples/api/src/views/Menu.svelte",

		Line: 12,
	},

	machineId: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10783,
	},

	mainPid: MountainRoot,

	"mainThreadCommands.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/browser/mainThreadCommands.ts",
	},

	"mainThreadMessageService.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/browser/mainThreadMessageService.ts",
	},

	"mainThreadStatusBar.ts": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/browser/mainThreadStatusBar.ts",
	},

	manualChunks: SkyRoot,

	"marketplace.visualstudio.com": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/NetworkProxy.ts",

		Line: 11,
	},

	max_results: {
		Repo: ElementRepos.Air,

		Path: "Source/Indexing/Store/QueryIndex.rs",

		Line: 229,
	},

	"mod.rs": { Repo: ElementRepos.Grove, Path: "Source/Protocol/mod.rs" },

	mountain_ipc_get_status: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/TauriIPCServer.rs",

		Line: 910,
	},

	mountain_ipc_invoke: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/mod.rs",

		Line: 74,
	},

	mountain_ipc_receive_message: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/TauriIPCServer.rs",

		Line: 894,
	},

	nativeHost: {
		Repo: EditorRepo,

		Path: "src/vs/sessions/contrib/sessions/test/electron-browser/sessionsApplicationBadge.test.ts",

		Line: 90,
	},

	"navigator.serviceWorker": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/Register.ts",

		Line: 85,
	},

	"navigator.userAgent": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/OTELBridge.ts",

		Line: 126,
	},

	node: {
		Repo: ElementRepos.Mountain,

		Path: "Documentation/Rust/doc/static.files/main-fcd733ba.js",

		Line: 24,
	},

	"node.exe": {
		Repo: ElementRepos.Maintain,

		Path: "Source/Build/Process/Process.rs",

		Line: 306,
	},

	nodeIntegration: CocoonRoot,

	node_modules: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_loader/src/resolvers/node.rs",

		Line: 398,
	},

	npm: {
		Repo: TauriRepo,

		Path: "crates/tauri-cli/src/helpers/mod.rs",

		Line: 13,
	},

	num_cpus: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/Enhanced/ConnectionPool/Pool.rs",

		Line: 366,
	},

	offsetAt: CocoonRoot,

	onClick: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/extensions/browser/extensionsWidgets.ts",

		Line: 62,
	},

	onCommand: { Repo: ElementRepos.Grove, Path: "" },

	onData: {
		Repo: EditorRepo,

		Path: "src/vs/platform/remote/node/nodeSocketFactory.ts",

		Line: 26,
	},

	onDidChange: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17484,
	},

	onDidChangeActiveTerminal: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11177,
	},

	onDidChangeActiveTextEditor: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11096,
	},

	onDidChangeColorTheme: SkyRoot,

	onDidChangeConfiguration: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14493,
	},

	onDidChangeEncoding: { Repo: ElementRepos.Output, Path: "" },

	onDidChangeExtensions: SkyRoot,

	onDidChangeModelContent: {
		Repo: EditorRepo,

		Path: "src/vs/sessions/contrib/automations/test/browser/automationInputCompletions.test.ts",

		Line: 138,
	},

	onDidChangeSelection: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebookKernels.ts",

		Line: 137,
	},

	onDidChangeStatus: { Repo: ElementRepos.Output, Path: "" },

	onDidChangeTextDocument: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14299,
	},

	onDidChangeWindowState: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11223,
	},

	onDidChangeWorkspaceFolders: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 13883,
	},

	onDidCloseTerminal: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11188,
	},

	onDidCollapse: SkyRoot,

	onDidDispose: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCodeInsets.ts",

		Line: 59,
	},

	onDidEndTask: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 9397,
	},

	onDidEndTerminalShellExecution: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11212,
	},

	onDidExecuteCommand: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/chat/test/browser/chatPetAchievementsContribution.test.ts",

		Line: 158,
	},

	onDidExecuteTerminalCommand: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.terminalExecuteCommandEvent.d.ts",

		Line: 46,
	},

	onDidExpand: SkyRoot,

	onDidOpenTerminal: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11183,
	},

	onDidOpenTextDocument: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14280,
	},

	onDidReceiveMessage: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCodeInsets.ts",

		Line: 58,
	},

	onDidStartTask: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 9392,
	},

	onDidStartTerminalShellExecution: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11205,
	},

	onDidWriteData: MountainRoot,

	onLanguage: {
		Repo: EditorRepo,

		Path: "src/vs/editor/standalone/browser/standaloneLanguages.ts",

		Line: 65,
	},

	onWillSaveTextDocument: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14314,
	},

	openEditor: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/editor/test/browser/editorService.test.ts",

		Line: 636,
	},

	openEditorEffect: MountainRoot,

	openExternal: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.externalUriOpener.d.ts",

		Line: 167,
	},

	openTextDocument: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14175,
	},

	open_dialog: CocoonRoot,

	oxc_allocator: LandRoot,

	oxc_ast: LandRoot,

	oxc_codegen: LandRoot,

	oxc_parser: { Repo: ElementRepos.Rest, Path: "" },

	oxc_semantic: LandRoot,

	oxc_span: LandRoot,

	oxc_transformer: LandRoot,

	"package.json": { Repo: ElementRepos.Land, Path: "package.json" },

	"panel.webview.onDidReceiveMessage": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/CreatingAndInteractingWithAWebviewPanel.md",

		Line: 180,
	},

	perfMarks: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/notebook/browser/notebookEditor.ts",

		Line: 452,
	},

	phc_: AirRoot,

	phc_mvbuxcLutfZctCVwnC4TTksmtNPPVgcx7gX96tTuCKk4: AirRoot,

	pipeTransport: CocoonRoot,

	pnpm: { External: "https://pnpm.io" },

	positionAt: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/chat/browser/aiCustomization/embeddedMcpServerDetail.ts",

		Line: 786,
	},

	postMessage: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/worker/extensionHostWorker.ts",

		Line: 23,
	},

	"posthog.distinct_id": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Overview.md",

		Line: 11,
	},

	"posthog.event": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Overview.md",

		Line: 11,
	},

	preopened_dir: CocoonRoot,

	prepublishOnly: CocoonRoot,

	"process.argv": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Build/VS/Code.ts",

		Line: 141,
	},

	"process.env": {
		Repo: IngressRepo,

		Path: "Configuration/ESBuild.ts",

		Line: 34,
	},

	"process.env.NODE_ENV": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Module/Telemetry/Tree-Shaking.md",

		Line: 43,
	},

	"process.env.TierX": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/TierGatedImplementationSelection.md",

		Line: 301,
	},

	"process.exit": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Bootstrap/Implementation/Cocoon/Main.ts",

		Line: 317,
	},

	"process.kill": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/PatchProcess/Patcher.ts",

		Line: 384,
	},

	"process.platform": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Service/Effect/Bootstrap.ts",

		Line: 137,
	},

	"process.stderr.write": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Utility/Land/Fix/Log.ts",

		Line: 5,
	},

	"process.stdout.write": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Utility/Land/Fix/Log.ts",

		Line: 5,
	},

	"process.versions": {
		Repo: ElementRepos.Output,

		Path: "Source/Plugin/Transform/Rewrite/Icons/Style/Sheet/URLs.ts",

		Line: 64,
	},

	"product.json": {
		Repo: ElementRepos.Land,

		Path: "Documentation/Rust/debug/product.json",
	},

	provideInlayHints: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/benches/full/typescript.js",

		Line: 148074,
	},

	"provider.onDidChange": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallScm.ts",

		Line: 644,
	},

	queryLocalFonts: CocoonRoot,

	queueMicrotask: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/tests/fixture/issues/2257/full/input.js",

		Line: 11315,
	},

	readDirectory: {
		Repo: SWCRepo,

		Path: "crates/swc_ecma_minifier/benches/full/typescript.js",

		Line: 7451,
	},

	readFile: {
		Repo: ElementRepos.Output,

		Path: "Source/Polyfill/File/System/Polyfill.ts",

		Line: 357,
	},

	read_dir: {
		Repo: ElementRepos.Common,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 114,
	},

	read_file: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 804,
	},

	registerAuthenticationProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 18186,
	},

	registerCodeActionsProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14879,
	},

	registerCodeLensProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14892,
	},

	registerCommand: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10990,
	},

	registerCompletionItemProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14852,
	},

	registerCompletionProvider: CocoonRoot,

	registerCustomEditorProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11791,
	},

	registerDebugAdapterDescriptorFactory: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17375,
	},

	registerDebugAdapterTrackerFactory: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17384,
	},

	registerDebugConfigurationProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17364,
	},

	registerDefinitionProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14905,
	},

	registerDocumentFormattingEditProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15096,
	},

	registerDocumentSymbolProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15013,
	},

	registerFileDecorationProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11835,
	},

	registerFileSystemProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14517,
	},

	registerFoldingRangeProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15208,
	},

	registerHoverProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14957,
	},

	registerInlayHintsProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15191,
	},

	registerInlineCompletionItemProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.inlineCompletionsAdditions.d.ts",

		Line: 23,
	},

	registerLanguageModelChatProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 20853,
	},

	registerNotebookCellStatusBarItemProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 16377,
	},

	registerNotebookSerializer: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.notebookLiveShare.d.ts",

		Line: 19,
	},

	registerReferenceProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15038,
	},

	registerRenameProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15051,
	},

	registerSemanticTokensProvider: CocoonRoot,

	registerSignatureHelpProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15142,
	},

	registerTaskProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 9359,
	},

	registerTextDocumentContentProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14266,
	},

	registerTextEditorCommand: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11007,
	},

	registerTreeDataProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11695,
	},

	registerUriHandler: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11727,
	},

	registerWebviewPanelSerializer: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11741,
	},

	registerWebviewViewProvider: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11752,
	},

	register_authentication_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1389,
	},

	register_code_actions_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 708,
	},

	register_code_lens_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1132,
	},

	register_completion_item_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 660,
	},

	register_debug_adapter: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 964,
	},

	register_debug_configuration_provider: CocoonRoot,

	register_definition_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 676,
	},

	register_document_formatting_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1068,
	},

	register_file_system_provider: CocoonRoot,

	register_folding_range_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1148,
	},

	register_hover_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 644,
	},

	register_inlay_hints_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1196,
	},

	register_inline_completion_item_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1276,
	},

	register_notebook_serializer: CocoonRoot,

	register_reference_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 692,
	},

	register_rename_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1052,
	},

	register_scm_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 948,
	},

	register_semantic_tokens_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1180,
	},

	register_signature_help_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1116,
	},

	register_task_provider: {
		Repo: ElementRepos.Mountain,

		Path: "Source/RPC/CocoonService/mod.rs",

		Line: 1365,
	},

	register_text_document_content_provider: CocoonRoot,

	register_uri_handler: CocoonRoot,

	remoteAuthority: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.proposed.resolvers.d.ts",

		Line: 472,
	},

	remoteName: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10843,
	},

	removeBreakpoints: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17417,
	},

	rename_file: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/vine.rs",

		Line: 4058,
	},

	replacePreviousChar: CocoonRoot,

	requestAnimationFrame: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/test/browser/componentFixtures/fixtureUtils.ts",

		Line: 1117,
	},

	requestIdleCallback: {
		Repo: EditorRepo,

		Path: "src/typings/base-common.d.ts",

		Line: 17,
	},

	"resourceGroups.Changes": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/SourceControlManagementSCM.md",

		Line: 33,
	},

	resourceStates: {
		Repo: EditorRepo,

		Path: "extensions/git/src/repository.ts",

		Line: 1396,
	},

	retry_backoff_ms: AirRoot,

	retry_count: AirRoot,

	rhai: LandRoot,

	"rustfmt.toml": { Repo: ElementRepos.Land, Path: "rustfmt.toml" },

	saveAll: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14130,
	},

	saveAs: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14121,
	},

	"secrets.delete": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 347,
	},

	"secrets.get": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 277,
	},

	"secrets.store": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Extension/Context.ts",

		Line: 309,
	},

	selectChatModels: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 20772,
	},

	sendRequest: {
		Repo: EditorRepo,

		Path: "src/vs/platform/agentHost/test/electron-browser/agentHostProtocolClient.test.ts",

		Line: 816,
	},

	sessionId: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10789,
	},

	setInterval: {
		Repo: EditorRepo,

		Path: "src/typings/base-common.d.ts",

		Line: 28,
	},

	setLanguageConfiguration: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 15303,
	},

	setStatusBarMessage: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11566,
	},

	setTextDocumentLanguage: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14746,
	},

	setTimeout: {
		Repo: EditorRepo,

		Path: "src/typings/base-common.d.ts",

		Line: 25,
	},

	setTimeout0: {
		Repo: EditorRepo,

		Path: "src/vs/base/common/platform.ts",

		Line: 221,
	},

	set_clipboard: CocoonRoot,

	set_configuration: CocoonRoot,

	"settings.json": { Repo: ElementRepos.Land, Path: ".vscode/settings.json" },

	setup_webview_message_listener_impl: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Environment/WebviewProvider/Messaging.rs",

		Line: 92,
	},

	sha256: { Repo: EditorRepo, Path: "build/lib/download.ts", Line: 17 },

	sharedDataFolderName: MountainRoot,

	"shell.open": {
		Repo: ElementRepos.Output,

		Path: "Source/Polyfill/Native/Module/Polyfill.ts",

		Line: 462,
	},

	shell_path: AirRoot,

	showCommands: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/browser/parts/editor/editorGroupWatermark.ts",

		Line: 35,
	},

	showErrorMessage: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11376,
	},

	showInformationMessage: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11285,
	},

	showInputBox: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11491,
	},

	showNotebookDocument: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11267,
	},

	showOpenDialog: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11469,
	},

	showPreviousWindowTab: CocoonRoot,

	showQuickPick: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11421,
	},

	showSaveDialog: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11478,
	},

	showTextDocument: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11236,
	},

	showWarningMessage: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11330,
	},

	showWorkspaceFolderPick: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11460,
	},

	snake_case: {
		Repo: TauriRepo,

		Path: "crates/tauri-cli/src/mobile/init.rs",

		Line: 299,
	},

	span_id: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/Enhanced/PerformanceDashboard/Dashboard.rs",

		Line: 160,
	},

	startDebugging: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 17397,
	},

	structuredClone: AirRoot,

	suppressSuggestions: {
		Repo: EditorRepo,

		Path: "src/vs/editor/contrib/suggest/browser/suggestModel.ts",

		Line: 115,
	},

	"task.didEnd": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",

		Line: 1203,
	},

	"task.didEndProcess": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts",

		Line: 144,
	},

	"task.didStart": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/gRPC/Server/Service.ts",

		Line: 1186,
	},

	"task.didStartProcess": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts",

		Line: 143,
	},

	taskExecutions: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 9387,
	},

	"tasks.json": { Repo: EditorRepo, Path: ".vscode/tasks.json" },

	tauri: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Binary/Main/AppLifecycle.rs",

		Line: 298,
	},

	"tauri.conf.json": { Repo: ElementRepos.Mountain, Path: "tauri.conf.json" },

	temp_dir: {
		Repo: ElementRepos.Air,

		Path: "Source/Downloader/DownloadManager.rs",

		Line: 1780,
	},

	textDocuments: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 14154,
	},

	textEditor: {
		Repo: EditorRepo,

		Path: "src/vs/sessions/contrib/editor/test/browser/diffEditor.sessions.contribution.test.ts",

		Line: 229,
	},

	textFile: {
		Repo: EditorRepo,

		Path: "extensions/copilot/src/platform/workspaceChunkSearch/test/node/externalIngest.spec.ts",

		Line: 434,
	},

	"this.productService.dataFolderName": {
		Repo: EditorRepo,

		Path: "src/vs/platform/environment/common/environmentService.ts",

		Line: 101,
	},

	tier_routes_to_node: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/WindServiceHandlers/DispatchMatch.rs",

		Line: 344,
	},

	timeout_ms: AirRoot,

	timingBuffer: {
		Repo: ElementRepos.Output,

		Path: "Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Line: 38,
	},

	toml_edit: LandRoot,

	tonic_build: AirRoot,

	trace_id: {
		Repo: ElementRepos.Mountain,

		Path: "Source/IPC/Enhanced/PerformanceDashboard/Dashboard.rs",

		Line: 158,
	},

	"tree.register": {
		Repo: ElementRepos.Cocoon,

		Path: "Source/Services/Mountain/Client/Service.ts",

		Line: 835,
	},

	"turbo.json": { Repo: ElementRepos.Land, Path: "turbo.json" },

	"update.editor.land": {
		Repo: ElementRepos.Mist,

		Path: "Source/ForwardSecurity.rs",

		Line: 23,
	},

	uriScheme: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10768,
	},

	useDefineForClassFields: {
		Repo: EditorRepo,

		Path: "extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts",

		Line: 1496,
	},

	userData: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/services/userDataSync/browser/userDataSyncInit.ts",

		Line: 232,
	},

	v8: {
		Repo: TsParserTestRefRepo,

		Path: "expressions/optionalChaining/optionalChainingInference/input.ts",

		Line: 30,
	},

	viewColumn: {
		Repo: EditorRepo,

		Path: "src/vs/editor/common/cursor/cursorMoveCommands.ts",

		Line: 644,
	},

	viewType: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebook.ts",

		Line: 228,
	},

	visibleTextEditors: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11089,
	},

	"vortex.data.microsoft.com": {
		Repo: ElementRepos.Wind,

		Path: "Source/Shim/NetworkProxy.ts",

		Line: 28,
	},

	"vscode.Memento": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostMemento.ts",

		Line: 12,
	},

	"vscode.Notebook": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebook.ts",

		Line: 43,
	},

	"vscode.Uri": {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 1439,
	},

	"vscode.WebviewPanel": {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 10086,
	},

	"vscode.authentication": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostAuthentication.ts",

		Line: 58,
	},

	"vscode.chat": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostChatAgents2.ts",

		Line: 488,
	},

	"vscode.chat.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostChatAgents2.ts",

		Line: 488,
	},

	"vscode.commands": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",

		Line: 46,
	},

	"vscode.commands.executeCommand": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",

		Line: 132,
	},

	"vscode.commands.registerCommand": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostCommands.ts",

		Line: 123,
	},

	"vscode.commands.registerTextEditorCommand": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 380,
	},

	"vscode.comments": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostComments.ts",

		Line: 34,
	},

	"vscode.d.ts": {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 6,
	},

	"vscode.debug": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDebugService.ts",

		Line: 64,
	},

	"vscode.debug.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDebugService.ts",

		Line: 64,
	},

	"vscode.debug.registerDebugConfigurationProvider": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDebugService.ts",

		Line: 56,
	},

	"vscode.debug.startDebugging": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostDebugService.ts",

		Line: 54,
	},

	"vscode.env": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 421,
	},

	"vscode.env.appRoot": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 431,
	},

	"vscode.env.machineId": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 422,
	},

	"vscode.env.openExternal": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 470,
	},

	"vscode.extensions": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostExtensionService.ts",

		Line: 81,
	},

	"vscode.extensions.getExtension": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 2078,
	},

	"vscode.git": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostGitExtensionService.ts",

		Line: 177,
	},

	"vscode.l10n": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLocalizationService.ts",

		Line: 16,
	},

	"vscode.languages": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageFeatures.ts",

		Line: 2163,
	},

	"vscode.languages.registerHoverProvider": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageFeatures.ts",

		Line: 2354,
	},

	"vscode.languages.registerInlineCompletionItemProvider": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 757,
	},

	"vscode.lm": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageModels.ts",

		Line: 123,
	},

	"vscode.lm.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostLanguageModels.ts",

		Line: 123,
	},

	"vscode.notebook.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebook.ts",

		Line: 43,
	},

	"vscode.notebooks": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostNotebook.ts",

		Line: 43,
	},

	"vscode.open": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallEditorAndOutput.ts",

		Line: 289,
	},

	"vscode.postMessage": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWebview.ts",

		Line: 129,
	},

	"vscode.scm": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostSCM.ts",

		Line: 971,
	},

	"vscode.scm.createSourceControl": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostSCM.ts",

		Line: 1031,
	},

	"vscode.tasks": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTask.ts",

		Line: 751,
	},

	"vscode.tasks.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTask.ts",

		Line: 751,
	},

	"vscode.tasks.executeTask": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTask.ts",

		Line: 47,
	},

	"vscode.tests": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTesting.ts",

		Line: 55,
	},

	"vscode.tests.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTesting.ts",

		Line: 55,
	},

	"vscode.window": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWindow.ts",

		Line: 17,
	},

	"vscode.window.createTerminal": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 687,
	},

	"vscode.window.createWebviewPanel": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 1130,
	},

	"vscode.window.showInformationMessage": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 909,
	},

	"vscode.window.showQuickPick": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 918,
	},

	"vscode.workspace": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 194,
	},

	"vscode.workspace.fs": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 1396,
	},

	"vscode.workspace.fs.stat": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 2026,
	},

	"vscode.workspace.getConfiguration": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 259,
	},

	"vscode.workspace.onDidChangeConfiguration": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostConfiguration.ts",

		Line: 156,
	},

	"vscode.workspace.openTextDocument": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 840,
	},

	"vscode.workspace.registerFileSystemProvider": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 2022,
	},

	"vscode.workspace.textDocuments": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 1292,
	},

	wasm: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/test/browser/componentFixtures/fixtureSyntaxHighlighting.ts",

		Line: 215,
	},

	webFrame: { Repo: ElementRepos.Wind, Path: "Source/Preload.ts", Line: 387 },

	willSave: CocoonRoot,

	win32: { Repo: EditorRepo, Path: "src/vs/base/common/path.ts", Line: 207 },

	"window.ISandboxConfiguration": {
		Repo: ElementRepos.Wind,

		Path: "Source/Types/Sandbox.ts",

		Line: 105,
	},

	"window._LOAD_CSS_WORKER": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/CSS/Load.ts",

		Line: 30,
	},

	"window._WORKER": {
		Repo: ElementRepos.Worker,

		Path: "Source/Worker/Register.ts",

		Line: 24,
	},

	"window.createWebviewPanel": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 1130,
	},

	"window.didCloseTerminal": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTerminalService.ts",

		Line: 443,
	},

	"window.didOpenTerminal": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTerminalService.ts",

		Line: 445,
	},

	"window.onDidEndTerminalShellExecution": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 900,
	},

	"window.onDidExecuteTerminalCommand": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostTerminalService.ts",

		Line: 48,
	},

	"window.onDidStartTerminalShellExecution": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 897,
	},

	"window.posthog": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHogBridge.ts",

		Line: 4,
	},

	"window.posthog.capture": {
		Repo: ElementRepos.Wind,

		Path: "Source/Telemetry/PostHogBridge.ts",

		Line: 4,
	},

	"window.process": {
		Repo: ElementRepos.Sky,

		Path: "Source/Workbench/Electron/Polyfills.ts",

		Line: 6,
	},

	"window.showInformationMessage": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 909,
	},

	"window.vscode": {
		Repo: ElementRepos.Wind,

		Path: "Source/Function/Install/Function/Install.ts",

		Line: 5,
	},

	"window.vscode.ipcRenderer": {
		Repo: ElementRepos.Wind,

		Path: "Source/Preload.ts",

		Line: 103,
	},

	"window.vscode.ipcRenderer.invoke": {
		Repo: ElementRepos.Wind,

		Path: "Source/Preload.ts",

		Line: 134,
	},

	withProgress: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 11622,
	},

	"workbench.action.applyThemeFromFile": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

		Line: 117,
	},

	"workbench.action.authentication.signIn": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/Workflow/UserDataSynchronization.md",

		Line: 30,
	},

	"workbench.action.files.openFile": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",

		Line: 641,
	},

	"workbench.action.files.save": {
		Repo: ElementRepos.Cocoon,

		Path: "Documentation/GitHub/Architecture.md",

		Line: 466,
	},

	"workbench.action.files.saveAll": {
		Repo: ElementRepos.Sky,

		Path: "Source/Function/Sky/Bridge/InstallEditorAndOutput.ts",

		Line: 304,
	},

	"workbench.action.showCommands": {
		Repo: EditorRepo,

		Path: "src/vs/editor/browser/controller/editContext/screenReaderUtils.ts",

		Line: 121,
	},

	"workbench.action.terminal.new": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/contrib/terminal/electron-browser/terminalRemote.ts",

		Line: 18,
	},

	"workbench.action.terminal.toggleTerminal": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",

		Line: 640,
	},

	"workbench.action.toggleSidebar": {
		Repo: ElementRepos.Land,

		Path: "Documentation/GitHub/EditorCore.md",

		Line: 640,
	},

	"workspace.applyEdit": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 1280,
	},

	"workspace.findFiles": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 498,
	},

	"workspace.fs.": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 194,
	},

	"workspace.fs.readFile": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.protocol.ts",

		Line: 2028,
	},

	"workspace.openTextDocument": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 840,
	},

	"workspace.save": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 918,
	},

	"workspace.saveAll": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 930,
	},

	"workspace.saveAs": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostWorkspace.ts",

		Line: 919,
	},

	"workspace.textDocuments": {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHost.api.impl.ts",

		Line: 1292,
	},

	workspaceFolders: {
		Repo: EditorRepo,

		Path: "src/vscode-dts/vscode.d.ts",

		Line: 13830,
	},

	workspaceState: {
		Repo: EditorRepo,

		Path: "src/vs/workbench/api/common/extHostExtensionService.ts",

		Line: 505,
	},

	writeClipboard: CocoonRoot,

	writeFile: {
		Repo: ElementRepos.Output,

		Path: "Source/Polyfill/File/System/Polyfill.ts",

		Line: 386,
	},

	writeText: {
		Repo: EditorRepo,

		Path: "src/vs/platform/agentHost/test/node/e2e/suites/clientFilesystemSuite.ts",

		Line: 74,
	},

	write_file: {
		Repo: ElementRepos.Mountain,

		Path: "Source/Vine/Generated/vine.rs",

		Line: 4722,
	},

	write_terminal: CocoonRoot,

	x86_64: LandRoot,
	...AsExternalSpecs(MentionMap),
	...AsExternalSpecs(TechnicalMentions),
};
