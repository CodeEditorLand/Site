/**
 * The runtime link index for the markdown pass - the full term -> URL map.
 *
 * Composed at module load from exactly two sources, never hardcoded by hand:
 *  1. The C15 registry (Source/Library/Links.ts): the sixteen element repos
 *     (ElementRepos), the product links (ExternalLinks) and the curated
 *     prose symbols (MentionMap / TechnicalMentions) - registry references,
 *     so a future branch rename edits Links.ts alone.
 *  2. The Phase 2 research audit trail (.hermes/website/tasks/LINKS-INDEX.md,
 *     2026-10-17): the 2263 non-UNKNOWN entries - concrete file paths,
 *     identifier definitions and members (with #L anchors), file-like names,
 *     repo-root fallbacks and the extHost API symbols. UNKNOWN entries and
 *     the eight "anchor TBD" extHost namespace templates are skipped.
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

import { ElementRepos, ExternalLinks } from "./Links";

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
 * The full runtime index: every resolved term the markdown pass can link.
 * The researched Phase 2 entries first, then the registry-composed curated
 * maps override them for the element/product/symbol keys above.
 */
export const LinkIndex: Readonly<Record<string, string>> = {
	AIR_LOG_DIR: "https://github.com/CodeEditorLand/Air/tree/Current/",

	AIR_LOG_FILE: "https://github.com/CodeEditorLand/Air/tree/Current/",

	AIR_LOG_JSON: "https://github.com/CodeEditorLand/Air/tree/Current/",

	APPDATA: "https://github.com/CodeEditorLand/Air/tree/Current/",

	AbortController: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	AbortSignal: "https://github.com/CodeEditorLand/Air/tree/Current/",

	AcceptInputCommand: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	ActionEffect:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Effect/ActionEffect.rs#L21",

	ActionRequest: "https://github.com/CodeEditorLand/Air/tree/Current/",

	ActivateByEvent: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	ActiveDocuments: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	"Air.proto":
		"https://github.com/CodeEditorLand/Air/tree/Current/Proto/Air.proto",

	"Air/Source/Initialize/Command/HandleCommand.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Command/HandleCommand.rs",

	"Air/Source/Initialize/Configure/Log/ConfigureLog.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

	AirManagement: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Any: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts#L11019",

	ApiFactory: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ApiFactoryLayer: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	AppHandle:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/Entry.rs#L724",

	"AppHandle.emit":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/WindowUI.rs#L47",

	AppLayer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Skeleton.ts#L548",

	"AppLifecycle.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs",

	AppRuntime:
		"https://github.com/CodeEditorLand/Wind/tree/Current/README.md#L441",

	AppState:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement/FireWorkspaceContainsEvents.rs#L19",

	"AppState.ActiveScmProviders":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/SourceControlManagementSCM.md#L171",

	"AppState.ActiveTerminals":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/CreatingAndInteractingWithAnIntegratedTerminal.md#L111",

	"AppState.ActiveWebviews":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/CreatingAndInteractingWithAWebviewPanel.md#L112",

	"AppState.CommandRegistry":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/ExecutingACommandFromTheCommandPalette.md#L102",

	"AppState.Configuration":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Indexing/FileIndexer.rs#L70",

	"AppState.Extensions":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement/FireWorkspaceContainsEvents.rs#L19",

	"AppState.LanguageProviders":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/InvokingALanguageFeatureHoverProvider.md#L22",

	ApplicationRunTime:
		"https://github.com/CodeEditorLand/Air/tree/Current/Documentation/Rust/doc/type.impl/alloc/sync/struct.Arc.js#L2",

	ApplicationState:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Library.rs#L84",

	"ApplicationState.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/ApplicationState/ApplicationState.rs",

	"ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",

	"ApplicationState/Internal/Persistence/MementoSaver.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/Persistence/MementoSaver.rs",

	"ApplicationState/State/WorkspaceState/WorkspaceDelta.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/State/WorkspaceState/WorkspaceDelta.rs",

	"Apply.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Apply.ts",

	ApplyUpdate:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Client/AirServiceProvider/mod.rs#L75",

	Arc: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri/src/resources/mod.rs#L53",

	"Architecture.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Architecture.md",

	Ask: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/chat/common/chatModes.ts#L713",

	AssetMemoryMap:
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cache/Source/Library.rs#L35",

	Astro: "https://astro.build",

	AsyncFn: "https://github.com/CodeEditorLand/Land/tree/Current/",

	AsyncProxy:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts#L34",

	Auth0: "https://auth0.com",

	AuthenticationProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.authenticationChallenges.d.ts#L64",

	AuthenticationService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Authentication.ts#L72",

	Authorize:
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Telemetry/Bridge.ts#L39",

	BackgroundServices: "https://github.com/CodeEditorLand/Air/tree/Current/",

	BakeExtensionManifest:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Batch: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Find/Files.ts#L234",

	BatchSpanProcessor:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Batched: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Beam: "https://github.com/CodeEditorLand/Worker/tree/Current/Source/Telemetry/Bridge.ts#L41",

	"Binary.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary.rs",

	"Binary/Extension/ScanPathConfigure.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Extension/ScanPathConfigure.rs",

	"Binary/Main/AppLifecycle.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs",

	"Binary/Main/Entry.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Binary/Main/Entry.rs",

	Boot: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"Bootstrap.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Bootstrap.ts",

	"Bootstrap/Implementation/Cocoon/Main.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	Brand: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/DistinctId.rs#L12",

	Browser:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L3",

	"Browser.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Bundled/Browser.astro#L3",

	BrowserProxy:
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro#L31",

	"BrowserProxy.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/BrowserProxy.astro#L3",

	Buffer: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Telemetry/PostHog/Buffer.ts#L16",

	"Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh",

	"BuildMatrix.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildMatrix.md",

	Builder:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Request/Routing/Handler.ts#L450",

	BulkEditService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/bulkEdit/browser/bulkEditService.ts#L176",

	Bundle: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Configuration/ESBuild/Constant/Environment/Constant.ts#L7",

	BundleLevel: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Bundled:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri-bundler/src/bundle/macos/dmg/mod.rs#L21",

	CACHE_ASSET:
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker.ts#L14",

	CACHE_CORE:
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker.ts#L12",

	CACHE_EXT: "https://github.com/CodeEditorLand/Land/tree/Current/",

	CARGO_BUILD_TARGET:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	CARGO__: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	COCOON_GRPC_PORT:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs#L146",

	CONNECTION_TIMEOUT:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Server/Initialize.rs#L64",

	"CSS/Load.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/CSS/Load.ts",

	Cache: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/cache.ts#L13",

	"Cache.json":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",

	CacheEntry:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Build/Scheme.rs#L106",

	CancelAction:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/chat/browser/actions/chatExecuteActions.ts#L924",

	CancelOperation:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization.rs#L5",

	CancellationProxy:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts#L22",

	CancellationTokenSource:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L1675",

	Cap: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Find/Files.ts#L72",

	Capture:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/test/scenario/src/renderEvidenceChapters.ts#L23",

	Cargo: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/LandSWCDevtools/src/cargo/index.ts#L31",

	"Cargo.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/Cargo.toml",

	"Cargo.toml.Backup":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PerElement.md#L195",

	Cause: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	CheckForUpdate:
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Register.ts#L64",

	Clean: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/ESBuild.ts#L3",

	Cleanup:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts#L154",

	"Cleanup.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/Cleanup.md",

	Clipboard:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L23",

	ClipboardLive:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md#L168",

	"Cocoon/.../ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	"Cocoon/Services/Mountain/Client/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/Client/Service.ts",

	"Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	"Cocoon/Source/Platform/FiddeeRoot.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Platform/FiddeeRoot.ts",

	"Cocoon/Source/Services/Extension/Context.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

	"Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	"Cocoon/Source/Services/Handler/VscodeAPI/ROUTING.md":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/ROUTING.md",

	"Cocoon/Source/Services/Mountain/gRPC/Client.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts",

	"Cocoon/Source/Services/gRPC/Server/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts",

	"Cocoon/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts",

	CocoonClient:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/NamingConventions.md#L306",

	CocoonDevLog:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Dev/Log.ts#L52",

	CocoonEsbuildDefine: "https://github.com/CodeEditorLand/Land/tree/Current/",

	CocoonManagement:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/mod.rs#L54",

	"CocoonManagement.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs",

	CocoonService:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/mod.rs#L8",

	"CodeEditorLand/Air/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Air/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Air/tree/Current/Proto/Air.proto":
		"https://github.com/CodeEditorLand/Air/tree/Current/Proto/Air.proto",

	"CodeEditorLand/Air/tree/Current/Source/Binary.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary.rs",

	"CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs",

	"CodeEditorLand/Air/tree/Current/Source/HTTP/Client.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/HTTP/Client.rs",

	"CodeEditorLand/Air/tree/Current/Source/Initialize/Command/HandleCommand.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Command/HandleCommand.rs",

	"CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

	"CodeEditorLand/Air/tree/Current/Source/Library.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Library.rs",

	"CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Cocoon/tree/Current/Scripts/cocoon/bootstrap-fork.js":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Scripts/cocoon/bootstrap-fork.js",

	"CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Configuration/ESBuild/Cocoon.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Configuration/ESBuild/Cocoon.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Module/Interceptor.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Module/Interceptor.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Service/Mapping.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Mapping.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/API/Factory/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/API/Factory/Service.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/ROUTING.md":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/ROUTING.md",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/Client/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/Client/Service.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/TypeConverter/Task.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/TypeConverter/Task.ts",

	"CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts",

	"CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Common/tree/Current/Source/Error/CommonError.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Error/CommonError.rs",

	"CodeEditorLand/Common/tree/Current/Source/IPC/Channel.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/Channel.rs",

	"CodeEditorLand/Echo/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Echo/tree/Current/Source/Library.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs",

	"CodeEditorLand/Echo/tree/Current/Source/Queue/StealingQueue.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Queue/StealingQueue.rs",

	"CodeEditorLand/Echo/tree/Current/Source/Scheduler/Scheduler.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/Scheduler.rs",

	"CodeEditorLand/Echo/tree/Current/Source/Scheduler/SchedulerBuilder.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/SchedulerBuilder.rs",

	"CodeEditorLand/Echo/tree/Current/Source/Scheduler/Worker.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/Worker.rs",

	"CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

	"CodeEditorLand/Echo/tree/Current/Source/Task/Task.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Task.rs",

	"CodeEditorLand/Grove/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Grove/tree/Current/Source/Host/APIBridge.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/APIBridge.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionHost.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionHost.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionManager.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionManager.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Host/Lifecycle.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/Lifecycle.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Protocol/SpineConnection.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Protocol/SpineConnection.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Transport/CommonAdapter.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/CommonAdapter.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Transport/IPCTransport.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/IPCTransport.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Transport/Strategy.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/Strategy.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Transport/WASMTransport.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/WASMTransport.rs",

	"CodeEditorLand/Grove/tree/Current/Source/Transport/gRPCTransport.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/gRPCTransport.rs",

	"CodeEditorLand/Grove/tree/Current/Source/WASM/HostBridge.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/HostBridge.rs",

	"CodeEditorLand/Grove/tree/Current/Source/WASM/MemoryManager.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/MemoryManager.rs",

	"CodeEditorLand/Grove/tree/Current/Source/WASM/ModuleLoader.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/ModuleLoader.rs",

	"CodeEditorLand/Grove/tree/Current/Source/WASM/Runtime.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/Runtime.rs",

	"CodeEditorLand/Grove/tree/Current/Source/main.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/main.rs",

	"CodeEditorLand/Land/blob/main/CODE_OF_CONDUCT.md":
		"https://github.com/CodeEditorLand/Land/blob/main/CODE_OF_CONDUCT.md",

	"CodeEditorLand/Land/blob/main/SECURITY.md":
		"https://github.com/CodeEditorLand/Land/blob/main/SECURITY.md",

	"CodeEditorLand/Land/tree/Current/.vscode/land-config.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/.vscode/land-config.json",

	"CodeEditorLand/Land/tree/Current/Cargo.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/Cargo.toml",

	"CodeEditorLand/Land/tree/Current/Dependency/Microsoft/Dependency/Editor/.nvmrc":
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Microsoft/Dependency/Editor/.nvmrc",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildPipeline.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildPipeline.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/Building.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Building.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/EnvironmentVariables.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EnvironmentVariables.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PerElement.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PerElement.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PlatformPaths.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PlatformPaths.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/InterComponentProtocol.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/InterComponentProtocol.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/Polyfills.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Polyfills.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/RustInfrastructure.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/RustInfrastructure.md",

	"CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

	"CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md",

	"CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Tree-Shaking.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Tree-Shaking.md",

	"CodeEditorLand/Land/tree/Current/Element/Air/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Air/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Air/Source/Binary.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Air/Source/Binary.rs",

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Platform/FiddeeRoot.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Platform/FiddeeRoot.ts",

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Telemetry/OTLPBridge.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Telemetry/OTLPBridge.ts",

	"CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Utility/Tier.ts",

	"CodeEditorLand/Land/tree/Current/Element/Common/Source/Telemetry/Tier.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Common/Source/Telemetry/Tier.rs",

	"CodeEditorLand/Land/tree/Current/Element/Echo/Source/Library.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Echo/Source/Library.rs",

	"CodeEditorLand/Land/tree/Current/Element/Grove/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Grove/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Grove/Source/main.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Grove/Source/main.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mist/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mist/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Cargo.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Cargo.toml",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Entitlements.plist":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Entitlements.plist",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Binary/Main/AppLifecycle.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Binary/Main/AppLifecycle.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Binary/Main/Entry.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/Binary/Main/Entry.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/DevLog/EmitOTLPSpan.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/DevLog/EmitOTLPSpan.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/mod.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/mod.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/LandFixTier.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/LandFixTier.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Source/ProcessManagement/InitializationData.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/ProcessManagement/InitializationData.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/Target/debug/extensions.manifest.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Target/debug/extensions.manifest.json",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/build.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/build.rs",

	"CodeEditorLand/Land/tree/Current/Element/Mountain/tauri.conf.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/tauri.conf.json",

	"CodeEditorLand/Land/tree/Current/Element/Rest/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Rest/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Rest/Source/Main.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Rest/Source/Main.rs",

	"CodeEditorLand/Land/tree/Current/Element/SideCar/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/SideCar/README.md",

	"CodeEditorLand/Land/tree/Current/Element/SideCar/Source/Download.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/SideCar/Source/Download.rs",

	"CodeEditorLand/Land/tree/Current/Element/SideCar/Source/main.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/SideCar/Source/main.rs",

	"CodeEditorLand/Land/tree/Current/Element/Sky/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Sky/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Sky/astro.config.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Sky/astro.config.ts",

	"CodeEditorLand/Land/tree/Current/Element/Wind/README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Wind/README.md",

	"CodeEditorLand/Land/tree/Current/Element/Wind/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Wind/Source/Utility/Tier.ts",

	"CodeEditorLand/Land/tree/Current/Element/Worker/Source/Telemetry/Bridge.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Worker/Source/Telemetry/Bridge.ts",

	"CodeEditorLand/Land/tree/Current/Maintain/Debug.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Debug/All.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/All.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Dev-Mountain.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Dev-Mountain.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Profile.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Profile.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Release.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Script/GenerateRouteManifest.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/GenerateRouteManifest.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Script/PostHogCapture.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/PostHogCapture.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Script/TierEnvironment.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/TierEnvironment.sh",

	"CodeEditorLand/Land/tree/Current/Maintain/Test/TelemetryTreeShake.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Test/TelemetryTreeShake.sh",

	"CodeEditorLand/Land/tree/Current/package.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/package.json",

	"CodeEditorLand/Land/tree/Current/rust-toolchain.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/rust-toolchain.toml",

	"CodeEditorLand/Land/tree/Current/rustfmt.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/rustfmt.toml",

	"CodeEditorLand/Land/tree/Current/turbo.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/CLI/Cli.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/CLI/Cli.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Definition.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Definition.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Error.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Error.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Fn.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Fn.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/GetTauriTargetTriple.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/GetTauriTargetTriple.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/JsonEdit.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/JsonEdit.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Logger.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Logger.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Pascalize.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Pascalize.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/PlistEdit.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/PlistEdit.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ConfigLoader.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ConfigLoader.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/EnvironmentResolver.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/EnvironmentResolver.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ScriptRunner.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ScriptRunner.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Build/TomlEdit.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/TomlEdit.rs",

	"CodeEditorLand/Maintain/tree/Current/Source/Library.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Library.rs",

	"CodeEditorLand/Mist/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Mist/tree/Current/Source/ForwardSecurity.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/ForwardSecurity.rs",

	"CodeEditorLand/Mist/tree/Current/Source/Resolver.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Resolver.rs",

	"CodeEditorLand/Mist/tree/Current/Source/Server.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Server.rs",

	"CodeEditorLand/Mist/tree/Current/Source/WebSocket.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/WebSocket.rs",

	"CodeEditorLand/Mist/tree/Current/Source/Zone.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Zone.rs",

	"CodeEditorLand/Mist/tree/Current/tests/integration.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/tests/integration.rs",

	"CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/NamingConventions.md":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/NamingConventions.md",

	"CodeEditorLand/Mountain/tree/Current/Entitlements.plist":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Entitlements.plist",

	"CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/CustomDocumentStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/CustomDocumentStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/DocumentStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/DocumentStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ExtensionDescriptionStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ExtensionDescriptionStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MarkerDataDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MarkerDataDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MergedConfigurationStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MergedConfigurationStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/OutputChannelStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/OutputChannelStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ProviderRegistrationDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ProviderRegistrationDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/RPCModelContentChangeDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/RPCModelContentChangeDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TerminalStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TerminalStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TreeViewStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TreeViewStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/WindowStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/WindowStateDTO.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/Entry.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/Entry.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/CommandProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/CommandProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/CustomEditorProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/CustomEditorProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/DebugProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/DebugProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/DiagnosticProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/DiagnosticProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/FileSystemProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/FileSystemProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/IPCProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/IPCProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/KeybindingProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/KeybindingProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/Registration.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/Registration.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/MountainEnvironment.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/MountainEnvironment.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SearchProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/SearchProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SecretProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/SecretProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SourceControlManagementProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/SourceControlManagementProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/StatusBarProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/StatusBarProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/StorageProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/StorageProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/SynchronizationProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/SynchronizationProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/TestProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TestProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Environment/UserInterfaceProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/UserInterfaceProvider.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Shim/Gate.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Shim/Gate.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Shim/SwallowMap.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Shim/SwallowMap.rs",

	"CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs",

	"CodeEditorLand/Mountain/tree/Current/build.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

	"CodeEditorLand/Mountain/tree/Current/scripts/cocoon/bootstrap-fork.js":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/scripts/cocoon/bootstrap-fork.js",

	"CodeEditorLand/Mountain/tree/Current/tauri.conf.json":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

	"CodeEditorLand/Output/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Output/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Output/tree/Current/Source/Apply/Pipeline.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Apply/Pipeline.ts",

	"CodeEditorLand/Output/tree/Current/Source/ESBuild.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts",

	"CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.js":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.js",

	"CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts",

	"CodeEditorLand/Output/tree/Current/Source/Plugin/Apply.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Apply.ts",

	"CodeEditorLand/Output/tree/Current/Source/Plugin/Copy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Copy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Plugin/Index.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Index.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Index.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Index.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Init.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Init.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/Index.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/Index.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Extension/Gallery/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Extension/Gallery/Service.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Telemetry/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Telemetry/Service.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Update/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Update/Service.ts",

	"CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts",

	"CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Rest/tree/Current/Source/Binary.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Binary.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Fn/Build.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/Build.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Codegen.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Codegen.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Compiler.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Compiler.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Parser.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Parser.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Transformer.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Transformer.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Library.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Library.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Main.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Main.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Struct/CompilerConfig.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/CompilerConfig.rs",

	"CodeEditorLand/Rest/tree/Current/Source/Struct/SWC.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/SWC.rs",

	"CodeEditorLand/SideCar/tree/Current/Cache.json":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",

	"CodeEditorLand/SideCar/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/SideCar/tree/Current/Source/Download.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/Download.rs",

	"CodeEditorLand/SideCar/tree/Current/Source/Library.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/Library.rs",

	"CodeEditorLand/SideCar/tree/Current/Source/main.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/main.rs",

	"CodeEditorLand/SideCar/tree/Current/build.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/build.rs",

	"CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Build/BakeExtensionManifest.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Build/BakeExtensionManifest.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Debug.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Debug.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Shared.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Shared.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallCommands.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallCommands.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDebug.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDebug.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDiagnostics.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDiagnostics.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorOperations.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorOperations.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallFanOut.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallFanOut.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallInlineCompletions.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallInlineCompletions.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSearch.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSearch.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSimpleRelays.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSimpleRelays.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallStatusbar.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallStatusbar.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTreeView.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTreeView.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallUiRequests.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallUiRequests.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallWebview.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallWebview.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Auto/Diagnose/Input.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Auto/Diagnose/Input.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Bootstrap.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Bootstrap.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Polyfills.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Polyfills.ts",

	"CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Post/Hog/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Post/Hog/Bridge.ts",

	"CodeEditorLand/Sky/tree/Current/astro.config.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts",

	"CodeEditorLand/Vine/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Vine/tree/Current/Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto",

	"CodeEditorLand/Vine/tree/Current/Source/Error.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Error.rs",

	"CodeEditorLand/Vine/tree/Current/Source/Host.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Host.rs",

	"CodeEditorLand/Vine/tree/Current/Source/Library.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Library.rs",

	"CodeEditorLand/Vine/tree/Current/Source/Multiplexer.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Multiplexer.rs",

	"CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md",

	"CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts",

	"CodeEditorLand/Wind/tree/Current/Source/ESBuild.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/ESBuild.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Function/Install.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Function/Install.ts",

	"CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Preload.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/AsyncProxy.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/AsyncProxy.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/AuditLog.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/AuditLog.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/EventInterceptor.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/EventInterceptor.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/FullIndex.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/FullIndex.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/IPCInterceptor.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/IPCInterceptor.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/Index.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Index.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/RedirectBus.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/RedirectBus.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/SwallowMap.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/SwallowMap.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Types/Interface/IPCRenderer.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Types/Interface/IPCRenderer.ts",

	"CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts",

	"CodeEditorLand/Worker/tree/Current/Documentation/GitHub/Architecture.md":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Documentation/GitHub/Architecture.md",

	"Command.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts",

	CommandBuilder: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	CommandExecutor:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Command/mod.rs#L9",

	CommandHandler:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/CommandProvider.rs#L63",

	CommandProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/mod.rs#L40",

	"CommandProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/CommandProvider.rs",

	CommandRegistry:
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallCommands.ts#L27",

	CommandService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L164",

	"Commands/Namespace.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Wrap/Commands/Namespace.ts",

	CommandsProvider: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	CommandsQuickAccessProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/quickaccess/browser/commandsQuickAccess.ts#L44",

	"Comments/Namespace.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Comments/Namespace.ts",

	"Common/Source/IPC/Channel.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/Channel.rs",

	CommonError:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Error/mod.rs#L8",

	Compiler:
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Compiler.rs#L47",

	CompilerConfig:
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/CompilerConfig.rs#L16",

	Configuration:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L29",

	ConfigurationProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Configuration/ConfigurationProvider.rs#L23",

	"ConfigurationProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Configuration/ConfigurationProvider.rs",

	ConfigurationService:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/Configuration.rs#L8",

	ConfigurationTarget:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Configuration/DTO/mod.rs#L17",

	ConnectionMetadata:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L62",

	ConstructExtensionHostInitializationData:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L465",

	ConstructSandboxConfiguration:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L229",

	"Context.Tag":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Command.ts#L7",

	"Copy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Copy.ts",

	CopyToDesktop: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Core: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/benches/full/typescript.js#L141007",

	CreateWebviewPanel:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window/Webview/Panel.ts#L41",

	CreateWorkSpace: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	Current:
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Architecture.rs#L55",

	"CustomDocumentStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/CustomDocumentStateDTO.rs",

	"CustomEditorProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/CustomEditor/CustomEditorProvider.rs",

	CustomEvent:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/tests/fixture/next/chakra/input.js#L387",

	DATA_DIR:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/scripts/chat-simulation/common/utils.js#L23",

	DNS_OVERRIDE:
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Rust/doc/SideCar/Spawn/constant.DNS_OVERRIDE.html#L1",

	DO: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_parser/src/lexer/token.rs#L531",

	DTO: "https://github.com/CodeEditorLand/Common/tree/Current/Source/StatusBar/mod.rs#L19",

	DeactivateExtension:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"Debug.Start":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Debug/Namespace.ts#L219",

	"Debug.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug.sh",

	"Debug.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Debug.ts",

	"Debug/All.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/All.sh",

	"Debug/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh",

	"Debug/Run.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh",

	DebugProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/mod.rs#L49",

	"DebugProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/DebugProvider.rs",

	DebugServer: "https://github.com/CodeEditorLand/Air/tree/Current/",

	DebugServerPort: "https://github.com/CodeEditorLand/Air/tree/Current/",

	DebugService:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Debug/DebugService.rs#L24",

	DecorationTypeLifecycle:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Server/Notification/DecorationTypeLifecycle.rs#L6",

	"Decrypt.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Encryption/Decrypt.rs",

	"Default.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro#L23",

	Delta: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Dependency:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L9",

	"Dependency/Microsoft/Dependency/Editor/.nvmrc":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/.nvmrc",

	"DependencyCodeEditorLand/Editor":
		"https://github.com/DependencyCodeEditorLand/Editor",

	Deserialize:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/marshalling.ts#L37",

	DiagnosticManager:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Diagnostic/mod.rs#L16",

	"DiagnosticProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/DiagnosticProvider.rs",

	Dialog: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/Native/Module/Polyfill.ts#L149",

	DiffEditorInput:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/common/editor/diffEditorInput.ts#L37",

	Disable:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Telemetry/FeatureFlags/mod.rs#L24",

	DisableUIFixes: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Disabled:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/update/common/update.ts#L72",

	DisposableProxy:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts#L22",

	DisposableStore:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/lifecycle.ts#L416",

	DnsPort:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Build/Scheme.rs#L102",

	Document:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Library.rs#L95",

	"Document.Save":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Index.ts#L644",

	"Document.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Text/Document.ts",

	DocumentContentCache:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	DocumentProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Document/mod.rs#L10",

	"DocumentProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Document/DocumentProvider.rs",

	DocumentService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Document.ts#L58",

	"DocumentStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/DocumentStateDTO.rs",

	"Documentation/GitHub/BuildMatrix.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildMatrix.md",

	"Documentation/GitHub/VSCode-API-Coverage-Matrix.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md",

	Download:
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/Library.rs#L64",

	ESBuild:
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/Bundle/mod.rs#L19",

	"ESBuild.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/ESBuild.ts",

	ESRCH: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Eager: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Editor: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window/Text/Document.ts#L115",

	EditorGroupModel:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/common/editor/editorGroupModel.ts#L185",

	EditorGroupsService:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	EditorInput:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/common/editor/editorInput.ts#L61",

	EditorService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/editor/browser/editorService.ts#L39",

	Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

	"Effect.Service":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Interfaces/I/Mountain/Client/Service.ts#L62",

	"Effect.catchTag":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/PatchProcess/Loader.ts#L97",

	"Effect.fork":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/PatchProcess.ts#L322",

	"Effect.linkSpans":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md#L228",

	"Effect.race":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

	"Effect.runPromise":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/DeepDive.md#L84",

	"Effect.timeout":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

	"Effect.withSpan":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Wrap/Namespace/With/Heuristics.ts#L21",

	"Effect/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

	"Effect/Health.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Health.ts",

	"Effect/Module/Interceptor.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Module/Interceptor.ts",

	"Effect/RPCServer.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/RPCServer.ts",

	"Effect/Telemetry.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Telemetry.ts",

	Electron:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L5",

	"Electron.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Electron.astro#L3",

	ElectronLiveLayer:
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md#L382",

	"Element/Air/Proto/Air.proto":
		"https://github.com/CodeEditorLand/Air/tree/Current/Proto/Air.proto",

	"Element/Air/README.md":
		"https://github.com/CodeEditorLand/Air/tree/Current/README.md",

	"Element/Air/Source/Authentication/mod.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Authentication/mod.rs",

	"Element/Air/Source/Binary.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary.rs",

	"Element/Air/Source/Downloader/mod.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Downloader/mod.rs",

	"Element/Air/Source/Updates/mod.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Updates/mod.rs",

	"Element/Cocoon/README.md":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/README.md",

	"Element/Cocoon/Scripts/cocoon/bootstrap-fork.js":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Scripts/cocoon/bootstrap-fork.js",

	"Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	"Element/Cocoon/Source/Platform/FiddeeRoot.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Platform/FiddeeRoot.ts",

	"Element/Cocoon/Source/Services/Extension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension.ts",

	"Element/Cocoon/Source/Services/Extension/Context.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

	"Element/Cocoon/Source/Services/Handler/Extension/Host/ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	"Element/Cocoon/Source/Services/Mountain/gRPC/Client.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts",

	"Element/Cocoon/Source/Telemetry/OTLPBridge.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Telemetry/OTLPBridge.ts",

	"Element/Cocoon/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts",

	"Element/Common/Source/Telemetry/Tier.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/Tier.rs",

	"Element/Echo/Source/Library.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs",

	"Element/Grove/Proto/Grove.proto":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Proto/Grove.proto",

	"Element/Grove/README.md":
		"https://github.com/CodeEditorLand/Grove/tree/Current/README.md",

	"Element/Grove/Source/main.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/main.rs",

	"Element/Mist/README.md":
		"https://github.com/CodeEditorLand/Mist/tree/Current/README.md",

	"Element/Mountain/Cargo.toml":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Cargo.toml",

	"Element/Mountain/Entitlements.plist":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Entitlements.plist",

	"Element/Mountain/Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

	"Element/Mountain/Source/Binary/Initialize/CliParse.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Initialize/CliParse.rs",

	"Element/Mountain/Source/Binary/Main/AppLifecycle.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs",

	"Element/Mountain/Source/ExtensionManagement/Scanner.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ExtensionManagement/Scanner.rs",

	"Element/Mountain/Source/IPC/DevLog/AppDataPrefix.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/DevLog/AppDataPrefix.rs",

	"Element/Mountain/Source/IPC/DevLog/EmitOTLPSpan.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/DevLog/EmitOTLPSpan.rs",

	"Element/Mountain/Source/IPC/DevLog/WriteToFile.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/DevLog/WriteToFile.rs",

	"Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs",

	"Element/Mountain/Source/IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs",

	"Element/Mountain/Source/LandFixTier.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs",

	"Element/Mountain/Source/ProcessManagement/InitializationData.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs",

	"Element/Mountain/Source/Telemetry/Tracing/InitializeTracing.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Telemetry/Tracing/InitializeTracing.rs",

	"Element/Mountain/Target/debug/extensions.manifest.json":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Target/debug/extensions.manifest.json",

	"Element/Mountain/build.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

	"Element/Mountain/tauri.conf.json":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

	"Element/Rest/README.md":
		"https://github.com/CodeEditorLand/Rest/tree/Current/README.md",

	"Element/Rest/Source/Main.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Main.rs",

	"Element/SideCar/README.md":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/README.md",

	"Element/SideCar/Source/Download.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/Download.rs",

	"Element/SideCar/Source/main.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/main.rs",

	"Element/Sky/README.md":
		"https://github.com/CodeEditorLand/Sky/tree/Current/README.md",

	"Element/Sky/Source/Workbench/Electron/Post/Hog/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Post/Hog/Bridge.ts",

	"Element/Vine/Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto",

	"Element/Vine/Vine.proto":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto",

	"Element/Wind/README.md":
		"https://github.com/CodeEditorLand/Wind/tree/Current/README.md",

	"Element/Wind/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts",

	"Element/Worker/Source/Telemetry/Bridge.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Telemetry/Bridge.ts",

	Embedded: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"EmitServiceSchema.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts",

	EmitTierDefaults:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L439",

	Emitter:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/SkyEmit.rs#L44",

	EmitterFireProxy:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts#L40",

	Empty: "https://github.com/CodeEditorLand/Vine/tree/Current/Documentation/Rust/doc/Vine/Generated/struct.Empty.html#L1",

	Encapsulation: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"Encapsulation.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/Encapsulation.md",

	"Encrypt.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Encryption/Encrypt.rs",

	"Encryption/Key.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Encryption/Key.rs",

	EnqueueTreeViewEmit:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/TreeView.rs#L11",

	"Entitlements.plist":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Entitlements.plist",

	Envelope:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/mod.rs#L59",

	Environment:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Library.rs#L69",

	"Environment/ConfigurationProvider/UpdateValue.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/ConfigurationProvider/UpdateValue.rs",

	"Environment/FileSystemProvider/WriteOperations.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/FileSystemProvider/WriteOperations.rs",

	"Environment/FileWatcherProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/FileWatcherProvider.rs",

	"Environment/KeybindingProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/KeybindingProvider.rs",

	"Environment/StorageProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/StorageProvider.rs",

	"Environment/Terminal/ShellIntegration.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/Terminal/ShellIntegration.rs",

	"Environment/WebviewProvider/Messaging.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/WebviewProvider/Messaging.rs",

	"Environment/WorkspaceProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/WorkspaceProvider.rs",

	"EnvironmentVariables.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EnvironmentVariables.md",

	Err: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RunTime/Shutdown/Shutdown.rs#L15",

	"Error/CommonError.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Error/CommonError.rs",

	ErrorHandlerProxy:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts#L23",

	EventEmitter:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/VSCode/Type.ts#L55",

	"EventTarget.prototype.addEventListener":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/EventInterceptor.ts#L6",

	ExecuteCommandLogic:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	ExecuteContributedCommand:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Command.rs#L6",

	Executions:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts#L37",

	ExtHostApiImpl: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ExtHostAuthentication:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostAuthentication.ts#L58",

	ExtHostContext:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L4171",

	ExtHostDocumentSaveParticipant:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDocumentSaveParticipant.ts#L22",

	ExtHostRequireInterceptor:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ExtHostSaveParticipant:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/browser/mainThreadSaveParticipant.ts#L17",

	ExtHostTaskService: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Extend: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_transforms_module/src/module_decl_strip.rs#L603",

	"Extension/Context.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

	ExtensionContext:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L439",

	ExtensionDescriptionRegistry:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/extensions/common/extensionDescriptionRegistry.ts#L29",

	"ExtensionDescriptionStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ExtensionDescriptionStateDTO.rs",

	ExtensionHost:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Extension.ts#L37",

	ExtensionHostHandler:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ExtensionHostLayer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts#L319",

	ExtensionHostProvider:
		"https://github.com/CodeEditorLand/Wind/tree/Current/",

	ExtensionManagement:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Library.rs#L98",

	"ExtensionManagement/Scanner.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ExtensionManagement/Scanner.rs",

	"ExtensionManagement/VsixInstaller.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ExtensionManagement/VsixInstaller.rs",

	ExtensionManagementService:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/ExtensionManagement/mod.rs#L11",

	ExtensionManifest:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Extension.ts#L14",

	ExtensionProvider: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ExtensionService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Extension.ts#L130",

	ExtensionTypeFilter:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	Extensions:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

	ExtensionsGetInstalled:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Extensions.rs#L24",

	"ExtensionsGetInstalled.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Extensions/ExtensionsGetInstalled.rs",

	ExtensionsSynchronizer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	F8: "https://github.com/CodeEditorLand/Air/tree/Current/",

	FC: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/tests/fixture/next/asmjs/1/input.js#L26109",

	FN: "https://github.com/CodeEditorLand/Air/tree/Current/",

	FOLDERID_LocalAppData:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	FOLDERID_RoamingAppData:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	FR: "https://github.com/CodeEditorLand/Air/tree/Current/",

	FailureCount: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"FeatureMethods.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

	"FiddeeRoot.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/FiddeeRoot.rs",

	FileService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/files/common/fileService.ts#L26",

	FileStat:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/Managed/mod.rs#L20",

	FileSystem:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L41",

	"FileSystem.ReadFile":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/SideCarRequest/DispatchSideCarRequest.rs#L76",

	FileSystemProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/mod.rs#L58",

	"FileSystemProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/FileSystemProvider.rs",

	FileSystemReader:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/FileSystem/mod.rs#L10",

	FileSystemService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/File/System/Service.ts#L39",

	FileSystemWriter:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/FileSystem/mod.rs#L13",

	FileWatcher:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L44",

	FileWatcherProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/mod.rs#L62",

	FromAsync: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	FsReader: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	FsWriter: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Full: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Workspace/Contains/Activator.ts#L209",

	FullAppInitialization:
		"https://github.com/CodeEditorLand/Wind/tree/Current/",

	Future: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L2111",

	GenericNotification:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L13",

	GenericRequest:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L15",

	GetCompletions: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	GetConfigurationValue:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/ConfigurationProvider/mod.rs#L52",

	GetDefinition: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	GetDocumentSymbols:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	GetHoverAtPosition:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	GetReferences: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"GetTauriTargetTriple.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/GetTauriTargetTriple.rs",

	Git: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L47",

	GitProvider: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	Glob: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Workspace/Contains/Activator.ts#L305",

	Global: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Tauri/Drag/Region.ts#L83",

	"Grove.proto":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Proto/Grove.proto",

	HEALTH_CHECK_INTERVAL_MS:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L50",

	HOME: "https://github.com/CodeEditorLand/Air/tree/Current/",

	HTTPProxy: "https://github.com/CodeEditorLand/Land/tree/Current/",

	HTTPS_PROXY: "https://github.com/CodeEditorLand/Land/tree/Current/",

	HTTP_PROXY: "https://github.com/CodeEditorLand/Land/tree/Current/",

	HandRolled: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"HandleExec.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Git/HandleExec.rs",

	HashMap:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_allocator/src/api/mod.rs#L14",

	HealExecutableBits:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ExtensionManagement/VsixInstaller.rs#L401",

	Heartbeat: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	High: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/PathExtraction.rs#L132",

	Hive: "https://github.com/CodeEditorLand/Air/tree/Current/",

	HostBridge:
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/mod.rs#L41",

	HotReload:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Configuration/mod.rs#L93",

	Hover: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Command/Hover/Fn.rs#L57",

	HoverResultDto: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	Hybrid: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Hyper: "https://github.com/CodeEditorLand/Land/tree/Current/",

	IBulkEditService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/browser/services/bulkEditService.ts#L17",

	ICommandService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/commands/common/commands.ts#L15",

	IConfigurationService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Interfaces/I/Configuration/Service.ts#L25",

	IDocumentService: "https://github.com/CodeEditorLand/Air/tree/Current/",

	IEditorService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/editor/common/editorService.ts#L17",

	"IEditorService.activeTextEditorControl":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L73",

	IExtHostCommands:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L347",

	IExtHostDebug: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostDocuments: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostExtensions:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostLanguages: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostRpcService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostRpcService.ts#L9",

	IExtHostTerminal: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostWebview: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostWebviews: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IExtHostWindow:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWindow.ts#L115",

	IExtHostWorkspace:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L1168",

	IExtensionHostInitData:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/extensions/common/extensionHostProtocol.ts#L28",

	IExtensionService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/extensions/common/extensions.ts#L38",

	IF: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/TsParserTestRef/parser/ecmascript5/parserSyntaxWalker.generated/input.ts#L212",

	IFTNMMMMMM: "https://github.com/CodeEditorLand/Land/tree/Current/",

	IFileService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/files/common/files.ts#L26",

	ILanguageFeaturesService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/services/languageFeatures.ts#L10",

	"ILanguageFeaturesService.inlineCompletionsProvider":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallInlineCompletions.ts#L5",

	IMainProcessService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/ipc/common/mainProcessService.ts#L10",

	IN: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_parser/src/lexer/token.rs#L555",

	INTNNNNNNN: "https://github.com/CodeEditorLand/Land/tree/Current/",

	IOPlatformUUID: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

	"IPC.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Exclude/Chromium/IPC.ts",

	"IPC/DevLog/AppDataPrefix.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/DevLog/AppDataPrefix.rs",

	"IPC/DevLog/WriteToFile.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/DevLog/WriteToFile.rs",

	"IPC/WindServiceHandlers/Utilities/RecentlyOpened.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/RecentlyOpened.rs",

	"IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/UserdataDir/Ensure.rs",

	"IPC/WindServiceHandlers/mod.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",

	IPCProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/IPCProvider.rs#L16",

	"IPCProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/IPCProvider.rs",

	IPCRenderer:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Types/Interface/IPCRenderer.ts#L17",

	IPCTransport:
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/IPCTransport.rs#L24",

	IQuickInputService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/quickinput/common/quickInput.ts#L963",

	ISCMService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/scm/common/scm.ts#L35",

	ISandboxConfiguration:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Types/Interface/ISandboxConfiguration.ts#L27",

	"ISandboxConfiguration.profiles":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Types/Interface/ISandboxConfiguration.ts#L27",

	ISandboxNodeProcess:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/parts/sandbox/electron-browser/globals.ts#L13",

	ISaveParticipant: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ISearchResultProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/search/common/search.ts#L66",

	IStatusbarService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/statusbar/browser/statusbar.ts#L15",

	"ITextFileService.save":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/Workspace.rs#L206",

	ITreeItem:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/common/views.ts#L768",

	ITreeView:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/common/views.ts#L653",

	IUntypedEditorInput:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/common/editor.ts#L886",

	IW: "https://github.com/CodeEditorLand/Land/tree/Current/",

	IWTAMMMMMM: "https://github.com/CodeEditorLand/Land/tree/Current/",

	IWTNMMMMMM: "https://github.com/CodeEditorLand/Air/tree/Current/",

	IWorkingCopyFileService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/workingCopy/common/workingCopyFileService.ts#L25",

	IWorkspaceService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/platform/workspace/common/workspaceService.ts#L17",

	InProgress:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/Handler.ts#L290",

	"Index.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Index.ts",

	InflightExecution:
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts#L260",

	"Info.plist":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Info.plist",

	"Init.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Init.ts",

	InitData:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Init/Data.ts#L6",

	InitDataLayer: "https://github.com/CodeEditorLand/Wind/tree/Current/",

	InitExtensionHost:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization.rs#L8",

	InitialHandshake:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization.rs#L12",

	InitializationData:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/mod.rs#L60",

	"InitializationData.FoldersWire":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L110",

	"InitializationData.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs",

	InitializeCocoon:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs#L260",

	InitializeConfiguration:
		"https://github.com/CodeEditorLand/Wind/tree/Current/",

	InlineCompletion:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/languages.ts#L836",

	InlineCompletionList:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.inlineCompletionsAdditions.d.ts#L268",

	InlineCompletionsProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/languages.ts#L947",

	InputBoxPlaceholder: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	InputBoxValue: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	Inspect: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Install:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L112",

	"InstallCommands.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallCommands.ts",

	"InstallDeadChannelListeners.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDeadChannelListeners.ts",

	"InstallDebug.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDebug.ts",

	"InstallDiagnostics.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDiagnostics.ts",

	"InstallEditorAndOutput.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts",

	"InstallEditorOperations.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorOperations.ts",

	"InstallFanOut.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallFanOut.ts",

	"InstallInlineCompletions.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallInlineCompletions.ts",

	"InstallProgressTerminalWorkspace.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts",

	"InstallScm.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts",

	"InstallSearch.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSearch.ts",

	"InstallSimpleRelays.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSimpleRelays.ts",

	"InstallStatusbar.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallStatusbar.ts",

	"InstallTasksAndDecorations.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts",

	"InstallTreeView.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTreeView.ts",

	"InstallUiRequests.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallUiRequests.ts",

	"InstallWebview.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallWebview.ts",

	InvokeLanguageProvider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Language/Provider/Handler.ts#L336",

	IpcProvider: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	IpcProviderLayer: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	IpcRenderer:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/parts/sandbox/electron-browser/electronTypes.ts#L35",

	IsDeclaredTierFeature:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L547",

	IsDefaultTierValue:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L591",

	IsEnabled:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Telemetry/FeatureFlags/mod.rs#L48",

	IsHealthy:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/Common/HealthStatus/HealthMonitor.rs#L75",

	IsOwn: "https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts#L52",

	IsPreempt:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts#L55",

	IsProxy:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TreeViewStateDTO.rs#L211",

	IsReplace:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts#L48",

	"Isolation.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md#L91",

	"JSON.parse":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L101",

	"JSON.stringify":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/Sync.ts#L239",

	JSX: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts#L52103",

	JavaScript:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/typescript-language-features/package.nls.json#L327",

	"Key.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Encryption/Key.rs",

	KeybindingProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Keybinding/KeybindingProvider.rs#L20",

	"KeybindingProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Keybinding/KeybindingProvider.rs",

	KeybindingsSynchronizer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	LAND_: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LAND_ORIG_ZDOTDIR: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LAND_SHELL_INTEGRATION_ACTIVE:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	LOCALAPPDATA: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LOG_LEVEL: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Lair: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"Land/Cargo.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/Cargo.toml",

	"Land/Container/Up.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Container/Up.sh",

	"Land/Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	"Land/Element/Cocoon/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cocoon/Source/Utility/Tier.ts",

	"Land/Element/Mountain/Source/IPC/WindServiceHandlers/mod.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/IPC/WindServiceHandlers/mod.rs",

	"Land/Element/Mountain/Source/LandFixTier.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/Source/LandFixTier.rs",

	"Land/Element/Mountain/build.rs":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Mountain/build.rs",

	"Land/Element/Sky/astro.config.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Sky/astro.config.ts",

	"Land/Element/Wind/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Wind/Source/Utility/Tier.ts",

	"Land/Maintain/Debug/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh",

	"Land/Maintain/Release/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh",

	"Land/Maintain/Script/TierEnvironment.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/TierEnvironment.sh",

	"Land/package.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/package.json",

	"Land/rust-toolchain.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/rust-toolchain.toml",

	"Land/turbo.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json",

	LandDiagnostics: "https://github.com/CodeEditorLand/Output/tree/Current/",

	LandDnsResolver:
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Resolver.rs#L36",

	LandFixLog:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Land/Fix/Log.ts#L232",

	"LandFixLog.Info":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/TierGatedImplementationSelection.md#L303",

	LandIsProduction: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LandWorkbenchLayer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	LanguageFeatureProviderRegistry:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/LanguageFeature/LanguageFeatureProviderRegistry.rs#L39",

	LanguageFeaturesProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	LanguageProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Command/Bootstrap.rs#L216",

	LanguageProviderHandler:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	LanguageService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/services/languageService.ts#L15",

	LastActivity: "https://github.com/CodeEditorLand/Land/tree/Current/",

	LaunchAndManageCocoonSidecar:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	Layer: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Container.ts#L29",

	"Layer.effect":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Architecture.md#L172",

	"Layer.empty":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md#L69",

	"Layer.mergeAll":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md#L70",

	"Layer.succeed":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Architecture.md#L172",

	"Layer.toRuntime":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md#L233",

	Layer2: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Layer3: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Layer4: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Layer5: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"Layout.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts#L982",

	Lazy: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/lazy.ts#L12",

	Level: "https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L11",

	LifecycleWhenPhase:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/UI/mod.rs#L27",

	Linux: "https://github.com/CodeEditorLand/Land/tree/Current/",

	LiveClipboardService:
		"https://github.com/CodeEditorLand/Wind/tree/Current/",

	LiveDialogService: "https://github.com/CodeEditorLand/Wind/tree/Current/",

	LiveEditorService: "https://github.com/CodeEditorLand/Wind/tree/Current/",

	LiveReloadPort: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"LoadFromCache.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",

	"Loading.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/ConfigurationProvider/Loading.rs",

	LocalStorageService: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Lodge: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LogMaxSize: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LogPruneOnBoot: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LogRetention: "https://github.com/CodeEditorLand/Air/tree/Current/",

	LogService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/log/common/logService.ts#L10",

	Low: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/PathExtraction.rs#L134",

	MAX_CONCURRENT_DOWNLOADS:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	MAX_CONNECTIONS:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Server/Initialize.rs#L61",

	MAX_RETRY_ATTEMPTS:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L35",

	MIST_PORT: "https://github.com/CodeEditorLand/Air/tree/Current/",

	MM: "https://github.com/CodeEditorLand/Land/tree/Current/",

	MOUNTAIN_GRPC_PORT:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs#L179",

	Main: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/mod.rs#L52",

	"Main.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts",

	MainContext:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L4081",

	MainThreadBulkEdits:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/browser/mainThreadBulkEdits.ts#L20",

	"Maintain/Debug/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Build.sh",

	"Maintain/Debug/Run.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Debug/Run.sh",

	"Maintain/Release/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh",

	"Maintain/Script/GenerateRouteManifest.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/GenerateRouteManifest.sh",

	"Maintain/Script/PostHogCapture.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/PostHogCapture.sh",

	"Maintain/Script/SignBundle.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh",

	"Maintain/Script/TierEnvironment.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/TierEnvironment.sh",

	"Maintain/Test/TelemetryTreeShake.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Test/TelemetryTreeShake.sh",

	"MarkerDataDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MarkerDataDTO.rs",

	Memento:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L88",

	"MementoLoader/AttemptMementoRecovery.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/Persistence/MementoLoader/AttemptMementoRecovery.rs",

	"MementoLoader/CreateCorruptedBackup.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/Persistence/MementoLoader/CreateCorruptedBackup.rs",

	"MergedConfigurationStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/MergedConfigurationStateDTO.rs",

	MessageType:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/Common/mod.rs#L8",

	Meta: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/ESBuild.ts#L5",

	MistTransport:
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/mod.rs#L40",

	MockClipboardLayer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"Mountain.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts#L83",

	"Mountain/.../Utilities/RecentlyOpened.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/RecentlyOpened.rs",

	"Mountain/Cargo.toml":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Cargo.toml",

	"Mountain/Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

	"Mountain/Source/Binary/Main/Entry.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/Entry.rs",

	"Mountain/Source/Environment/FileSystemProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/FileSystemProvider.rs",

	"Mountain/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs",

	"Mountain/Source/Environment/LanguageFeatureProvider/Registration.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/Registration.rs",

	"Mountain/Source/IPC/WindServiceHandlers/mod.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",

	"Mountain/Source/LandFixTier.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs",

	"Mountain/Source/Shim/Gate.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Shim/Gate.rs",

	"Mountain/Source/Shim/SwallowMap.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Shim/SwallowMap.rs",

	"Mountain/build.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

	MountainCommand: "https://github.com/CodeEditorLand/Air/tree/Current/",

	MountainConfiguration:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	MountainConnectMaxAttempts:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts#L119",

	MountainConnection:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/ApplicationState/ApplicationState.rs#L297",

	MountainDir: "https://github.com/CodeEditorLand/Air/tree/Current/",

	MountainDocument: "https://github.com/CodeEditorLand/Air/tree/Current/",

	MountainEnvironment:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/MountainEnvironment.rs#L71",

	"MountainEnvironment.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/MountainEnvironment.rs",

	MountainFileSystem: "https://github.com/CodeEditorLand/Air/tree/Current/",

	MountainIPCInvoke:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/IPC/InvokeCommand.rs#L67",

	MountainProbeMaxAttempts:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts#L111",

	MountainProbeTimeoutMs:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts#L109",

	MountainService:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L2002",

	MountainWorkspace: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Mute: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"NLS.astro":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Default.astro#L2",

	NN: "https://github.com/CodeEditorLand/Land/tree/Current/",

	NODE_ENV:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWCProject.github.io/assets/js/2ea007dc.f22f21cf.js#L1",

	NODE_EXTRA_CA_CERTS: "https://github.com/CodeEditorLand/Mist/tree/Current/",

	NSQuitAlwaysKeepsWindows:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	NXDOMAIN: "https://github.com/CodeEditorLand/Mist/tree/Current/",

	Native: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/mod.rs#L14",

	"NativeHost/Quit.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/NativeHost/Quit.rs",

	"NativeHost/Relaunch.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/NativeHost/Relaunch.rs",

	NativeWorkbenchEnvironmentService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/environment/electron-browser/environmentService.ts#L59",

	"NativeWorkbenchEnvironmentService.logsHome":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L257",

	NetworkAirPort: "https://github.com/CodeEditorLand/Air/tree/Current/",

	NetworkCocoonPort: "https://github.com/CodeEditorLand/Air/tree/Current/",

	NetworkMountainPort: "https://github.com/CodeEditorLand/Air/tree/Current/",

	NlsSection:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L344",

	Node: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L75",

	"Node.js": "https://nodejs.org",

	NodeDeferred: "https://github.com/CodeEditorLand/Land/tree/Current/",

	NodePlatform:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWCDev/arch/src/lib.rs#L61",

	"NodeRuntime.runMain":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/DeepDive.md#L38",

	NodeVersion: "https://github.com/CodeEditorLand/Land/tree/Current/",

	None: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/event.ts#L51",

	Normal: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"Notification/Handler.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Notification/Handler.ts",

	NotificationHandler:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/IPC/Protocol.ts#L114",

	Notify: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Cocoon/mod.rs#L9",

	OTLP: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L28",

	OTLPEnabled: "https://github.com/CodeEditorLand/Air/tree/Current/",

	OTLPEndpoint: "https://github.com/CodeEditorLand/Air/tree/Current/",

	OTLP_TRACE_ID: "https://github.com/CodeEditorLand/Land/tree/Current/",

	OXC: "https://oxc-project.github.io",

	Off: "https://github.com/CodeEditorLand/Air/tree/Current/",

	On: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/ESBuild.ts#L7",

	OnceLock: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	OpenChannelFromCocoon:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	OpenChannelFromMountain:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	OptionalFromAsync: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	OsSection:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L360",

	"Output/ESBuild/Output.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts",

	"Output/Source/ESBuild.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts",

	"Output/Source/ESBuild/Output.js":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.js",

	"Output/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

	"Output/Source/Service/CEL/Land/Shim/Index.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Index.ts",

	"Output/Source/Service/CEL/Land/Shim/Init.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Init.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/Index.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/Index.ts",

	"Output/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts",

	"Output/Source/Service/CEL/Null/Extension/Gallery/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Extension/Gallery/Service.ts",

	"Output/Source/Service/CEL/Null/Telemetry/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Telemetry/Service.ts",

	"Output/Source/Service/CEL/Null/Update/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Null/Update/Service.ts",

	"Output/Source/Service/Tauri/Main/Process/Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts",

	"OutputChannelStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/OutputChannelStateDTO.rs",

	Own: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	PASSTHROUGH: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	PATH: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/server/node/extensionHostConnection.ts#L52",

	PTY: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Pack: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Parallel:
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/Binary/Command/Option.rs#L65",

	Parallel16: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Parallel4: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Parallel8: "https://github.com/CodeEditorLand/Air/tree/Current/",

	PascalCase: "https://github.com/CodeEditorLand/Land/tree/Current/",

	PatchProcess:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/PatchProcess.ts#L24",

	"PatchProcess/index.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/PatchProcess/index.ts",

	PathBuf:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/Native/FileDeleteNative.rs#L19",

	PathCanon:
		"https://github.com/CodeEditorLand/Land/tree/Current/Element/Cache/Source/Library.rs#L37",

	PathResolver:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L236",

	"PerElement.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PerElement.md",

	PerformAction: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Pick: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/quickinput/browser/pickerQuickAccess.ts#L104",

	"Platform/FiddeeRoot.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Platform/FiddeeRoot.ts",

	"PlatformPaths.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/PlatformPaths.md",

	"Policy.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Policy.ts",

	"Polyfills.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Polyfills.md",

	Position:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Command/Hover/Interface.rs#L23",

	PostHog:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

	Preempt: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	"Preload.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts",

	Probe: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/Utility/EnhanceShellEnvironment.rs#L30",

	Process:
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Process.rs#L65",

	ProcessCocoonRequest:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	ProcessManagement:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Library.rs#L106",

	"ProcessManagement/CocoonManagement.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/CocoonManagement.rs",

	"ProcessManagement/InitializationData.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs",

	ProcessMountainRequest:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	ProductApplicationName:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L227",

	ProductCommit:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L245",

	ProductConfig:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L350",

	ProductDataFolderName:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L233",

	ProductEmbedderIdentifier:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L273",

	ProductFlavor: "https://github.com/CodeEditorLand/Air/tree/Current/",

	ProductFlavorLong: "https://github.com/CodeEditorLand/Air/tree/Current/",

	ProductNameLong:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L221",

	ProductNameShort:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L215",

	ProductQuality:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L252",

	ProductServerApplicationName:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L266",

	ProductUrlProtocol:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L260",

	ProductVersion:
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Codegen/ResolveIdentity.ts#L239",

	Production:
		"https://github.com/CodeEditorLand/Echo/tree/Current/Example/Sequence.rs#L24",

	"Production.Bundled":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json#L19",

	"Production.Diagnostics":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json#L20",

	"Production.Extensions":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json#L21",

	"Production.Node":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json#L22",

	"Production.PostHog":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json#L23",

	Profile:
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Definition.rs#L243",

	"Profile.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Profile.sh",

	ProfilesSection:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ProcessManagement/InitializationData.rs#L336",

	ProgressReport:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/UI/mod.rs#L41",

	Promise:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts#L42453",

	"Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto",

	ProvideCallHierarchyIncomingCalls:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L27",

	ProvideCallHierarchyOutgoingCalls:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L31",

	ProvideCodeActions:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L35",

	ProvideCodeLenses:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L39",

	ProvideCompletionItems:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L33",

	ProvideDefinition:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L47",

	ProvideDocumentFormatting:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L39",

	ProvideDocumentHighlights:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L55",

	ProvideDocumentRangeFormatting:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L47",

	ProvideDocumentSymbols:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L67",

	ProvideFoldingRanges:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L75",

	ProvideHover:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L79",

	ProvideInlayHints:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L83",

	ProvideInlineCompletionItems:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L63",

	ProvideLinkedEditingRanges:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L91",

	ProvideOnTypeFormatting:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L70",

	ProvideReferences:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L99",

	ProvideRenameEdits:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L103",

	ProvideSelectionRanges:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L107",

	ProvideSemanticTokensFull:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L111",

	ProvideSignatureHelp:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L115",

	ProvideTypeHierarchySubtypes:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L119",

	ProvideTypeHierarchySupertypes:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L123",

	ProvideWorkspaceSymbols:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs#L127",

	"ProviderRegistrationDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/ProviderRegistrationDTO.rs",

	ProviderRegistrationDto:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	Proxy: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/Utilities/mod.rs#L7",

	Queue: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L51",

	QuickInputService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/QuickInput.ts#L52",

	"README.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/README.md",

	REST_BINARY_PATH:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Rest/Plugin.ts#L47",

	REST_CLASS_FIELDS: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_DECORATORS: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_ENTRY: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_MINIFY: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_OUT_DIR: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_SOURCEMAP: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_TARGET: "https://github.com/CodeEditorLand/Land/tree/Current/",

	REST_WORKERS: "https://github.com/CodeEditorLand/Land/tree/Current/",

	RETRY_BASE_DELAY_MS:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L38",

	"RPCModelContentChangeDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/RPCModelContentChangeDTO.rs",

	RPCProtocol:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/extensions/common/rpcProtocol.ts#L115",

	RPCServer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/RPCServer.ts#L162",

	RUST_LOG: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Range: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Command/Hover/Interface.rs#L26",

	ReadFile:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/FileSystem.rs#L20",

	Record: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Codegen/Run/Ext/Host/Codegen.ts#L89",

	RecordSideCarFailure:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L180",

	RedirectHandler:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts#L46",

	"Register.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Register.ts",

	RegisterCallHierarchyProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L102",

	RegisterCodeActionsProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L105",

	RegisterCodeLensProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L108",

	RegisterCommand:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Language/Provider/Registry.ts#L111",

	RegisterCompletionItemProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L112",

	RegisterDefinitionProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L115",

	RegisterDocumentFormattingProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L119",

	RegisterDocumentHighlightProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L123",

	RegisterDocumentRangeFormattingProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L127",

	RegisterDocumentSymbolProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L131",

	RegisterFoldingRangeProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L134",

	RegisterHoverProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L137",

	RegisterInlayHintsProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L140",

	RegisterInlineCompletionItemProvider:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	RegisterLinkedEditingRangeProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L144",

	RegisterOnTypeFormattingProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L148",

	RegisterReferenceProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L151",

	RegisterRenameProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L154",

	RegisterSelectionRangeProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L158",

	RegisterSemanticTokensProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L162",

	RegisterSignatureHelpProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L165",

	RegisterTypeHierarchyProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L168",

	RegisterWorkspaceSymbolProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Provider.rs#L172",

	"Release.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release.sh",

	"Release/Build.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Release/Build.sh",

	RemoteProcedureCall: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Render: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_parser/tests/tsc/jsDeclarationsReferenceToClassInstanceCrossFile.ts#L17",

	Replace:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalEnvCollection.rs#L86",

	Replay: "https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/ReplayEvents.ts#L41",

	Report: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/terminalContrib/chatAgentTools/browser/tools/consoleCompactor/consoleCompactor.ts#L41",

	RequestRoutingHandler:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts#L954",

	Require:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts#L818",

	RequireInterceptor:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/RequireInterceptor.ts#L69",

	Requires:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Environment/mod.rs#L17",

	ResolveUIRequest:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/UIRequest/mod.rs#L6",

	Resources:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary/Monitor/StartMonitoring.rs#L149",

	RestPlugin:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts#L6",

	Rhai: "https://rhai.rs",

	Ring: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/tests/benches-full/echarts.js#L6810",

	RollbackUpdate: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Rollup: "https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro#L59",

	RoutePatterns:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Request/Routing/Handler.ts#L56",

	RunTime:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Library.rs#L90",

	"RunTime/Shutdown/SaveApplicationState.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RunTime/Shutdown/SaveApplicationState.rs",

	Runtime:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs#L534",

	Rust: "https://www.rust-lang.org",

	RwLock: "https://github.com/CodeEditorLand/Air/tree/Current/Source/Indexing/Store/UpdateIndex.rs#L272",

	SIDECAR_CLIENTS:
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Rust/doc/Vine/Client/Shared/struct.SIDECAR_CLIENTS.html#L1",

	SIGINT: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	SIGKILL: "https://github.com/CodeEditorLand/Air/tree/Current/",

	SIGTERM: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	SKIP_WAITING: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"ScanAndPopulateExtensions.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/Internal/ExtensionScanner/ScanAndPopulateExtensions.rs",

	Scheduler:
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/Scheduler.rs#L26",

	SchedulerBuilder:
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/mod.rs#L11",

	ScmProvider: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	Scope: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Cancellation.ts#L10",

	"Script/SignBundle.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh",

	Search: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Library.rs#L116",

	SearchOptions:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.textSearchProvider.d.ts#L50",

	SearchProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Search/mod.rs#L6",

	"SearchProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Search/SearchProvider.rs",

	Secret: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L35",

	SecretProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Secret/SecretProvider.rs#L18",

	"SecretProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Secret/SecretProvider.rs",

	SecretStorage:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L556",

	SecretsProvider: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	SendCocoonNotification:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	SendMountainNotification:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	SendTextToTerminalLogic:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	Sequential:
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/Binary/Command.rs#L160",

	Serialize:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/testing/common/testTypes.ts#L169",

	"Server/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts",

	"Service.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Transform/Replace/Telemetry/Service.ts",

	"Service/Effect/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

	"Service/Effect/Module/Interceptor.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Module/Interceptor.ts",

	"Service/Mapping.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Mapping.ts",

	ServiceUpstream: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	ServiceWorker: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"Services/API/Factory/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/API/Factory/Service.ts",

	"Services/Configuration.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Configuration.ts",

	"Services/Extension/Context.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

	"Services/Extension/Host/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts",

	"Services/Handler/Extension/Host/ActivateExtension.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts",

	"Services/Handler/Notification/Handler.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Notification/Handler.ts",

	"Services/Mountain/Client/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/Client/Service.ts",

	"Services/Mountain/gRPC/Client.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts",

	"Services/Window.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts",

	"Services/Workspace.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Workspace.ts",

	"Services/gRPC/Server/Service.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts",

	SettingsSynchronizer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Shared: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Client.rs#L37",

	SharedMemory: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"ShellIntegration.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/Terminal/ShellIntegration.rs",

	ShimEvent:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts#L59",

	ShimLevel:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts#L12",

	Ship: "https://github.com/CodeEditorLand/Air/tree/Current/",

	ShowMessageRequest:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/mod.rs#L278",

	"SideCar/Cache.json":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",

	"SignBundle.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/SignBundle.sh",

	Simple: "https://github.com/CodeEditorLand/Maintain/tree/Current/tests/Eliminate/Integration.rs#L95",

	Skip: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"Sky/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts",

	"Sky/Function/SmokeTest/Auto/Diagnose/Input.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Auto/Diagnose/Input.ts",

	"Sky/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/SmokeTest/Run/Command/Catalog/Smoke/Test.ts",

	"Sky/Source/Function/Build/BakeExtensionManifest.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Build/BakeExtensionManifest.ts",

	"Sky/Source/Function/Sky/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts",

	"Sky/Workbench/Electron/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Bootstrap.ts",

	"Sky/Workbench/Electron/Post/Hog/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Post/Hog/Bridge.ts",

	"Sky/astro.config.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts",

	SkyBridge: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Smoke: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"Source/Apply/Pipeline.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Apply/Pipeline.ts",

	"Source/Authentication/mod.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Authentication/mod.rs",

	"Source/Binary.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary.rs",

	"Source/Binary/Binary.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Binary/Binary.rs",

	"Source/Build/CLI/Cli.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/CLI/Cli.rs",

	"Source/Build/Definition.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Definition.rs",

	"Source/Build/Error.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Error.rs",

	"Source/Build/Fn.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Fn.rs",

	"Source/Build/GetTauriTargetTriple.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/GetTauriTargetTriple.rs",

	"Source/Build/JsonEdit.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/JsonEdit.rs",

	"Source/Build/Logger.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Logger.rs",

	"Source/Build/Pascalize.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Pascalize.rs",

	"Source/Build/PlistEdit.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/PlistEdit.rs",

	"Source/Build/Rhai/ConfigLoader.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ConfigLoader.rs",

	"Source/Build/Rhai/EnvironmentResolver.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/EnvironmentResolver.rs",

	"Source/Build/Rhai/ScriptRunner.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/ScriptRunner.rs",

	"Source/Build/TomlEdit.rs":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/TomlEdit.rs",

	"Source/Codegen/Emit/EmitServiceSchema.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitServiceSchema.ts",

	"Source/Configuration/ESBuild/Config/TargetConfig.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Configuration/ESBuild/Config/TargetConfig.ts",

	"Source/DevLog.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/DevLog.rs",

	"Source/Download.rs":
		"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/Download.rs",

	"Source/Downloader/mod.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Downloader/mod.rs",

	"Source/ESBuild.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/ESBuild.ts",

	"Source/ESBuild/Output.js":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.js",

	"Source/ESBuild/Output.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts",

	"Source/ESBuild/Rest/Plugin.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Rest/Plugin.ts",

	"Source/Effect/RPCServer.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/RPCServer.ts",

	"Source/Error.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Error.rs",

	"Source/Fn/Build.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/Build.rs",

	"Source/Fn/OXC/Codegen.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Codegen.rs",

	"Source/Fn/OXC/Compiler.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Compiler.rs",

	"Source/Fn/OXC/Parser.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Parser.rs",

	"Source/Fn/OXC/Transformer.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Fn/OXC/Transformer.rs",

	"Source/ForwardSecurity.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/ForwardSecurity.rs",

	"Source/Function/Debug.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Debug.ts",

	"Source/Function/Install.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Function/Install.ts",

	"Source/Function/Shared.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Shared.ts",

	"Source/Function/Sky/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts",

	"Source/HTTP/Client.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/HTTP/Client.rs",

	"Source/Host.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Host.rs",

	"Source/Host/APIBridge.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/APIBridge.rs",

	"Source/Host/ExtensionHost.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionHost.rs",

	"Source/Host/ExtensionManager.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/ExtensionManager.rs",

	"Source/Host/Lifecycle.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Host/Lifecycle.rs",

	"Source/IPC/Channel.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/IPC/Channel.ts",

	"Source/IPC/TauriIPCServer.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs",

	"Source/Initialize/Command/HandleCommand.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Command/HandleCommand.rs",

	"Source/Initialize/Configure/Log/ConfigureLog.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

	"Source/Library.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Library.rs",

	"Source/Main.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Main.rs",

	"Source/Multiplexer.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Multiplexer.rs",

	"Source/Plugin/Apply.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Apply.ts",

	"Source/Plugin/Index.ts":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Index.ts",

	"Source/Preload.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts",

	"Source/Protocol/SpineConnection.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Protocol/SpineConnection.rs",

	"Source/Queue/StealingQueue.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Queue/StealingQueue.rs",

	"Source/Resolver.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Resolver.rs",

	"Source/Scheduler/Scheduler.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/Scheduler.rs",

	"Source/Scheduler/SchedulerBuilder.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/SchedulerBuilder.rs",

	"Source/Scheduler/Worker.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Scheduler/Worker.rs",

	"Source/Server.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Server.rs",

	"Source/Service/TauriMainProcessService.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts",

	"Source/Services/Configuration.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Configuration.ts",

	"Source/Services/ConfigurationService.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Services/ConfigurationService.rs",

	"Source/Services/Window.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts",

	"Source/Services/Workspace.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Workspace.ts",

	"Source/Struct/CompilerConfig.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/CompilerConfig.rs",

	"Source/Struct/SWC.rs":
		"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/SWC.rs",

	"Source/Task/Priority.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

	"Source/Task/Task.rs":
		"https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Task.rs",

	"Source/Telemetry/Bridge.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Telemetry/Bridge.ts",

	"Source/Telemetry/PostHog/Configuration.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHog/Configuration.ts",

	"Source/Telemetry/PostHogBridge.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts",

	"Source/Transport/CommonAdapter.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/CommonAdapter.rs",

	"Source/Transport/IPCTransport.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/IPCTransport.rs",

	"Source/Transport/Strategy.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/Strategy.rs",

	"Source/Transport/WASMTransport.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/WASMTransport.rs",

	"Source/Transport/gRPCTransport.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/gRPCTransport.rs",

	"Source/Updates/mod.rs":
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Updates/mod.rs",

	"Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts",

	"Source/WASM/HostBridge.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/HostBridge.rs",

	"Source/WASM/MemoryManager.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/MemoryManager.rs",

	"Source/WASM/ModuleLoader.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/ModuleLoader.rs",

	"Source/WASM/Runtime.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/WASM/Runtime.rs",

	"Source/WebSocket.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/WebSocket.rs",

	"Source/Workbench/BrowserProxy/Bootstrap.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Bootstrap.ts",

	"Source/Workbench/Electron/Polyfills.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Polyfills.ts",

	"Source/Worker/CSS/Load.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/CSS/Load.ts",

	"Source/Worker/Policy.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Policy.ts",

	"Source/Worker/Register.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Register.ts",

	"Source/Zone.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Zone.rs",

	"Source/main.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/main.rs",

	SourceControl:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.scmHistoryProvider.d.ts#L9",

	SourceControlManagementProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/SourceControlManagement/SourceControlManagementProvider.rs#L24",

	"SourceControlManagementProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/SourceControlManagement/SourceControlManagementProvider.rs",

	SourceControlResourceState:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/mod.rs#L296",

	SpanProcessor:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/extension/chatSessions/copilotcli/node/copilotCliBridgeSpanProcessor.ts#L40",

	Spine: "https://github.com/CodeEditorLand/Land/tree/Current/",

	StageUpdate:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Updates/UpdateManager.rs#L2059",

	Standard: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"State/WorkspaceState/WorkspaceDelta.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/State/WorkspaceState/WorkspaceDelta.rs",

	StatusBarProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/StatusBar/StatusBarProvider.rs#L25",

	"StatusBarProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/StatusBar/StatusBarProvider.rs",

	StopWatch:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/stopwatch.ts#L9",

	Storage:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L74",

	"Storage.Get":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/State.ts#L379",

	"Storage.Set":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/State.ts#L358",

	StorageProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/mod.rs#L94",

	"StorageProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Storage/StorageProvider.rs",

	StreamActions: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Stub: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Extensions/Namespace.ts#L134",

	Submit: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Queue/StealingQueue.rs#L169",

	SwallowAction:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Shim/SwallowMap.rs#L16",

	SwallowDecision:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts#L38",

	SwallowRule:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts#L22",

	SynchronizationProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Synchronization/SynchronizationProvider.rs#L15",

	"SynchronizationProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Synchronization/SynchronizationProvider.rs",

	Synchronous: "https://github.com/CodeEditorLand/Air/tree/Current/",

	SystemTime: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	TA: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/tests/fixture/next/asmjs/1/input.js#L21593",

	TAURI_ENV_DEBUG: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TCapability: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TCapabilityProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	TELEMETRY_DISABLE: "https://github.com/CodeEditorLand/Common/tree/Current/",

	TELEMETRY_OTLP_ENDPOINT:
		"https://github.com/CodeEditorLand/Common/tree/Current/",

	TELEMETRY_POSTHOG_KEY:
		"https://github.com/CodeEditorLand/Common/tree/Current/",

	TMPDIR: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TN: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Tag: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Notification/Handler.ts#L332",

	"TargetConfig.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Configuration/ESBuild/Config/TargetConfig.ts",

	Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

	"Task.Execute":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts#L110",

	"Task.Fetch":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts#L91",

	"Task.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/TypeConverter/Task.ts",

	TaskExecution:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Task.ts#L14",

	Tauri: "https://tauri.app",

	TauriDiskFileSystemProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	TauriEmit: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	TauriInvoke:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Search/Service.ts#L73",

	TauriListen:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts#L353",

	TauriLiveLayer:
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md#L372",

	TauriMainProcessService:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/Service.ts#L1383",

	"TauriMainProcessService.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts",

	TauriWebviewWindow:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	Telemetry:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Telemetry.ts#L122",

	Terminal:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L80",

	"Terminal/LocalPTYCreateProcess.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Terminal/LocalPTYCreateProcess.rs",

	TerminalId:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Terminal/ResizeTerminal.rs#L14",

	TerminalOptions:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.terminalTitle.d.ts#L10",

	TerminalProvider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/mod.rs#L106",

	"TerminalProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Terminal/TerminalProvider.rs",

	"TerminalStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TerminalStateDTO.rs",

	TerminalStateDto:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	TestClock: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TestController:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Testing/mod.rs#L9",

	TestEnvironment: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TestLayer:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md#L212",

	"TestProvider.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TestProvider.rs",

	TextDocumentContentProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L1850",

	TextEdit:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Types.ts#L57",

	TextEditor:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.textEditorDiffInformation.d.ts#L39",

	TextEditorEdit:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L1400",

	TextEditorPane: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	TextEditorService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/textfile/common/textEditorService.ts#L69",

	TextFileEditorModel:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/textfile/common/textFileEditorModel.ts#L51",

	TextFileEditorModelManager:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/textfile/common/textFileEditorModelManager.ts#L40",

	Throttle: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Tier: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/Tier.rs#L9",

	TierAuth: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierClipboard: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierClipboardLayer4: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierCommandEventBroadcast:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierConfiguration: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierConfigurationEager:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierDebug: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierDiagnostics: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierDiagnosticsDelta: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierDocumentMirror: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierEncryption: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"TierEnvironment.sh":
		"https://github.com/CodeEditorLand/Land/tree/Current/Maintain/Script/TierEnvironment.sh",

	TierExtensionActivation:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierExtensionHost:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L498",

	TierExtensionScan: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierExtensionScanParallel:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierFileSystem: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierFileSystemLayer4: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierFileWatcher: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierFileWatcherLayer4:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierFindFiles: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierFindFilesLayer4: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierGlob: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierGlobNative: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierHTTPProxy: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierHTTPProxyHyper: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierIPC:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/DispatchMatch.rs#L2544",

	TierLanguageFeatures:
		"https://github.com/CodeEditorLand/Land/tree/Current/",

	TierLogger: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierLoggerRing: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierModel: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	TierModuleCache: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierNativeHost: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	TierOpenExternal: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierOpenExternalLayer4:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierOutputChannel: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	TierRemoteProcedureCall:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierRemoteProcedureCallSharedMemory:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierSCM: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierSchemeAssets:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L74",

	TierSchemeAssetsHybrid:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	TierSearch: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierStorage: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierTasks: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierTelemetry: "https://github.com/CodeEditorLand/Air/tree/Current/",

	TierTerminal: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TierTreeView: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	TierWebSocket: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	TierXValue: "https://github.com/CodeEditorLand/Land/tree/Current/",

	TimeoutError:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Errors.ts#L38",

	TimingProxy:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts#L33",

	Tokio: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Trace: "https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/Trace.ts#L11",

	"Tracer.startSpan":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md#L239",

	Track: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Library.rs#L120",

	Transport:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Library.rs#L153",

	TransportConfig:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Transport/mod.rs#L56",

	TreeDataProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L12236",

	TreeView:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/TreeView.ts#L236",

	TreeViewProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/TreeView/mod.rs#L9",

	"TreeViewProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/TreeView/TreeViewProvider.rs",

	"TreeViewStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/TreeViewStateDTO.rs",

	Turborepo: "https://turbo.build",

	TypeConverter:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Type/Converter.ts#L89",

	TypeScript: "https://www.typescriptlang.org",

	UPDATE_CHECK_INTERVAL:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/cli/src/tunnels/agent_host.rs#L55",

	URI: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization/InitExtensionHost.rs#L36",

	USER: "https://github.com/CodeEditorLand/Air/tree/Current/",

	USERNAME: "https://github.com/CodeEditorLand/Air/tree/Current/",

	USERPROFILE: "https://github.com/CodeEditorLand/Air/tree/Current/",

	Uint8Array:
		"https://github.com/CodeEditorLand/Common/tree/Current/TypeScript/Interface/Decrypt.ts#L14",

	UnregisterCommand:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Language/Provider/Registry.ts#L143",

	Update: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Configuration/mod.rs#L9",

	UpdateSideCarActivity:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L211",

	Uri: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/mod.rs#L342",

	UserDataAutoSyncService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/userDataSync/node/userDataAutoSyncService.ts#L17",

	UserDataSyncAccountService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/userDataSync/common/userDataSyncAccount.ts#L27",

	UserDataSyncStoreService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/userDataSync/common/userDataSyncStoreService.ts#L703",

	"UserDotfile.md":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md",

	UserInterface:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/mod.rs#L86",

	UserInterfaceProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/UserInterface/UserInterfaceProvider.rs#L28",

	"UserInterfaceProvider.rs":
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/UserInterface/UserInterfaceProvider.rs",

	"Utilities/UserdataDir.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/UserdataDir.rs",

	"Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts",

	VINE_PORT: "https://github.com/CodeEditorLand/Air/tree/Current/",

	VSCODE_APP_ROOT: "https://github.com/CodeEditorLand/Air/tree/Current/",

	VSCODE_COCOON_GLOBAL_STORAGE:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	VSCODE_IPC_HOOK_CLI:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	VSCODE_PARENT_PID: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	VerifyChecksum:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Downloader/DownloadManager.rs#L969",

	"Vine.proto":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto",

	"Vine/Proto/Vine.proto":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto",

	"Vine/Source/Client/CheckSideCarHealth.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/CheckSideCarHealth.rs",

	"Vine/Source/Client/Shared.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs",

	"Vine/Source/Library.rs":
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Library.rs",

	VineError:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Vine/Error.rs#L44",

	VineHost:
		"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Host.rs#L76",

	Vite: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_parser/tests/typescript/ts-import-type/input.ts#L1",

	WASM: "https://webassembly.org",

	WASMTransport:
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/mod.rs#L37",

	WASMtime: "https://github.com/CodeEditorLand/Land/tree/Current/",

	WaitForClientConnection:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Client.rs#L49",

	Wasmtime: "https://wasmtime.dev",

	Watch: "https://github.com/CodeEditorLand/Air/tree/Current/Source/Indexing/mod.rs#L76",

	"WebSocket.rs":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/WebSocket.rs",

	WebWorker:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/webWorker/browser/webWorkerServiceImpl.ts#L141",

	Webview:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L16",

	WebviewManagementService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	WebviewPanelProvider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	WebviewPanelShim: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	WebviewProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Webview/mod.rs#L15",

	WebviewShim: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	WebviewStateDto: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	WillSaveTextDocumentEvent:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"Wind/Source/ESBuild.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/ESBuild.ts",

	"Wind/Source/IPC/Channel.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts",

	"Wind/Source/Preload.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts",

	"Wind/Source/Service/TauriMainProcessService.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Service/TauriMainProcessService.ts",

	"Wind/Source/Shim/AsyncProxy.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/AsyncProxy.ts",

	"Wind/Source/Shim/AuditLog.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/AuditLog.ts",

	"Wind/Source/Shim/EventInterceptor.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/EventInterceptor.ts",

	"Wind/Source/Shim/FullIndex.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/FullIndex.ts",

	"Wind/Source/Shim/Gate.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Gate.ts",

	"Wind/Source/Shim/IPCInterceptor.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/IPCInterceptor.ts",

	"Wind/Source/Shim/Index.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Index.ts",

	"Wind/Source/Shim/NetworkProxy.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts",

	"Wind/Source/Shim/RedirectBus.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/RedirectBus.ts",

	"Wind/Source/Shim/SwallowMap.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/SwallowMap.ts",

	"Wind/Source/Shim/Type.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/Type.ts",

	"Wind/Source/Telemetry/PostHogBridge.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts",

	"Wind/Source/Types/Interface/IPCRenderer.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Types/Interface/IPCRenderer.ts",

	"Wind/Source/Utility/Tier.ts":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts",

	"Wind/src/vs/editor/common/services/languageFeaturesService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/services/languageFeaturesService.ts",

	WindServiceHandlers:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/mod.rs#L27",

	"WindServiceHandlers/mod.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",

	Window: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L103",

	"Window.ts":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts",

	WindowProvider: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	WindowService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window/Index.ts#L64",

	"WindowStateDTO.rs":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ApplicationState/DTO/WindowStateDTO.rs",

	Windows: "https://github.com/CodeEditorLand/Land/tree/Current/",

	Wire: "https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/SkyEvent.rs#L361",

	WorkSpace: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	WorkSpaceFolderStateDTO:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/NamingConventions.md#L103",

	WorkSpaceIdentifier:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/NamingConventions.md#L339",

	Workbench:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Configuration/mod.rs#L11",

	"Workbench/Bundled/Electron/Entry.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Bundled/Electron/Entry.ts",

	"Workbench/Electron/Post/Hog/Bridge.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Post/Hog/Bridge.ts",

	"Worker.js":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Configuration/ESBuild/Worker.js",

	"Worker.ts":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker.ts",

	WorkingCopyFileService:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/workingCopy/common/workingCopyFileService.ts#L290",

	Workspace:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Library.rs#L149",

	"Workspace.SaveAll":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Text/Document.ts#L643",

	WorkspaceEdit:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/VSCode/Type.ts#L65",

	WorkspaceEditApplier:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/WorkspaceProvider.rs#L616",

	WorkspaceEditDTO:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/DTO/WorkspaceEditDTO.rs#L15",

	WorkspaceFolder:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/Workspace.rs#L9",

	WorkspaceProvider:
		"https://github.com/CodeEditorLand/Common/tree/Current/Source/Workspace/mod.rs#L12",

	WorkspaceService:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Workspace.ts#L216",

	WriteFile:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/FileSystem.rs#L35",

	XDG_CACHE_HOME: "https://github.com/CodeEditorLand/Air/tree/Current/",

	XDG_CONFIG_HOME: "https://github.com/CodeEditorLand/Air/tree/Current/",

	XDG_DATA_HOME: "https://github.com/CodeEditorLand/Air/tree/Current/",

	XMLHttpRequest:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/worker/extensionHostWorker.ts#L37",

	ZDOTDIR: "https://github.com/CodeEditorLand/Air/tree/Current/",

	_LOAD_CSS_WORKER: "https://github.com/CodeEditorLand/Land/tree/Current/",

	__CEL_SERVICES__: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"__CEL_SERVICES__.CommandRegistry.registerCommand":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L64",

	"__CEL_SERVICES__.Commands.executeCommand":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/WorkspaceProvider.rs#L581",

	"__CEL_SERVICES__.SCM":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts#L12",

	"__CEL_SERVICES__.Statusbar":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L82",

	"__CEL_SERVICES__.Statusbar.addEntry":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L82",

	__DEV__:
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/CSS/Load.ts#L8",

	__LandProduct: "https://github.com/CodeEditorLand/Air/tree/Current/",

	__LandTier_FileSystem__:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts#L44",

	__LandTier_Shim__:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Shim/NodeModuleInterceptor.ts#L33",

	__LandTiers: "https://github.com/CodeEditorLand/Air/tree/Current/",

	__activeDebugSession:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	__landDisposableId:
		"https://github.com/CodeEditorLand/Output/tree/Current/",

	__name: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Transform/Inject/Name/Shim.ts#L31",

	__terminals: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	__textDocuments: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	__workspaceFolders: "https://github.com/CodeEditorLand/Air/tree/Current/",

	_edits: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"_end._line":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/SavingAFileWithSaveParticipants.md#L193",

	_path: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/PluginsWorkspace/plugins/sql/guest-js/index.ts#L49",

	_range: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/notebook/browser/view/renderers/webviewPreloads.ts#L919",

	_scheme:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/notebook/common/notebookDocumentService.ts#L34",

	"_start._line":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorOperations.ts#L154",

	_v: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/util/common/test/result.spec.ts#L177",

	aarch64: "https://github.com/CodeEditorLand/Land/tree/Current/",

	acceptInputCommand: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	acquireRelease: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	activate:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Extension.ts#L190",

	activatedExtension: "https://github.com/CodeEditorLand/Wind/tree/Current/",

	activationEvent:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/commands/common/commandService.ts#L55",

	activationEvents:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/editor/test/browser/editorGroupsService.test.ts#L2363",

	activation_events:
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Common/Traits.rs#L47",

	activeDebugSession:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17297",

	activeStackItem:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17343",

	activeTextEditor:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11084",

	addBreakpoints:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17411",

	alias: "https://github.com/CodeEditorLand/Wind/tree/Current/Source/Codegen/Emit/EmitBridgeShape.ts#L64",

	all: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17478",

	"api.posthog.com":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Documentation/GitHub/Architecture.md#L164",

	appName:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10747",

	appRoot:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10755",

	appSharedDataHome:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	app_cache_dir:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri/src/path/android.rs#L151",

	app_config_dir:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri/src/path/android.rs#L130",

	app_data_dir:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri/src/path/android.rs#L137",

	app_log_dir:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri/src/path/android.rs#L156",

	applyEdit:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14149",

	applyEdits:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/jsonEdit.ts#L164",

	arch: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts#L139",

	asExternalUri:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10927",

	astro: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"astro.config.ts":
		"https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts",

	asyncBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L35",

	async_trait: "https://github.com/CodeEditorLand/Air/tree/Current/",

	attach: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/chat/test/browser/chatView.test.ts#L3974",

	auditBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L41",

	auth: "https://github.com/CodeEditorLand/Air/tree/Current/Source/Configuration/HotReload.rs#L1373",

	authority:
		"https://github.com/CodeEditorLand/Mist/tree/Current/tests/integration.rs#L73",

	bash: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/common/agentMetaReaders.test.ts#L413",

	beforeBundleCommand: "https://github.com/CodeEditorLand/Air/tree/Current/",

	both: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/layout/test/browser/chatLayoutOwnership.test.ts#L1188",

	branch: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Rust/doc/static.files/stringdex-2da4960a.js#L2",

	breaker:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Resilience/ResilienceOrchestrator.rs#L120",

	breakpoints:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17308",

	browser:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/chat/test/browser/sessionChatInputToolbar.test.ts#L2243",

	"build.rs": "https://github.com/CodeEditorLand/Grove/tree/Current/build.rs",

	cancelBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L29",

	cargo: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWCDev/src/util/mod.rs#L5",

	cd: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWCEcosystemCi/utils.ts#L25",

	channel:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/IPC/Channel.ts#L439",

	character:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/cursor/cursorDeleteOperations.ts#L103",

	child_process:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/html-language-features/build/bundleTypeScriptLibraries.js#L8",

	"child_process.spawn":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/ExtensionManagement/VsixInstaller.rs#L135",

	chokidar:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/Pkgs/packages/cli/src/swc/sources.ts#L116",

	clap: "https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Library.rs#L170",

	"clipboard.readText":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Tauri/Clipboard/Wrapper.ts#L23",

	"cloud.fiddee.editor":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint.md#L173",

	cocoon: "https://github.com/CodeEditorLand/Air/tree/Current/",

	"cocoon.editor.land":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Documentation/GitHub/DeepDive.md#L110",

	codesign: "https://github.com/CodeEditorLand/Air/tree/Current/",

	colorScheme:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/languages/defaultDocumentColorsComputer.ts#L111",

	colored:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/chat/test/browser/chatPetColors.test.ts#L576",

	"commands.executeCommand":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L132",

	"commands.executed":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTypeConverters.ts#L2081",

	"commands.registerCommand":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L123",

	commitTemplate:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/scm/browser/scmInput.ts#L507",

	console:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/TsParserTestRef/es6/modules/exportsAndImportsWithUnderscores4/input.ts#L5",

	"console.error":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Build/WindowBuild.rs#L189",

	"console.info":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/TierGatedImplementationSelection.md#L328",

	"console.log":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindAdvancedSync.rs#L219",

	"console.warn":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Build/WindowBuild.rs#L191",

	"context.extension.exports":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts#L1097",

	"context.globalState":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Transform/Instrument/Vscode/Git.ts#L159",

	"context.globalStorageUri":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md#L67",

	"context.logUri":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md#L68",

	"context.secrets":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/DeepDive.md#L849",

	"context.secrets.delete":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/github-authentication/src/common/enterpriseStorage.ts#L78",

	"context.secrets.get":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L192",

	"context.secrets.store":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/github-authentication/src/common/enterpriseStorage.ts#L73",

	"context.storageUri":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/UserDotfile.md#L66",

	"context.subscriptions":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts#L282",

	"context.workspaceState":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Extension/Host/ActivateExtension.ts#L864",

	copy_file:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L4080",

	createChatParticipant:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.chatParticipantAdditions.d.ts#L912",

	createCommentController:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17813",

	createDiagnosticCollection:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14822",

	createDirectory:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/benches/full/typescript.js#L118072",

	createExtensionHostManager:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	createFileSystemWatcher:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14079",

	createNotebookController:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.notebookMessaging.d.ts#L66",

	createOutputChannel:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11526",

	createQuickPick:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11502",

	createSourceControl:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.scmProviderOptions.d.ts#L42",

	createStatusBarItem:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11641",

	createTerminal:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11665",

	createTestController:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L18286",

	createTreeView:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11703",

	createWebviewPanel:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11547",

	create_directory:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L4102",

	create_terminal:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/DeepDive.md#L333",

	"crossbeam-deque": "https://docs.rs/crossbeam-deque",

	cursorMove: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	cwd: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/process.ts#L55",

	darwin: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	dataFolderName:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/mainImpl.ts#L479",

	"dc.services.visualstudio.com":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts#L26",

	deactivate:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Extension.ts#L303",

	"debug.addBreakpoints":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Debug/Namespace.ts#L252",

	"debug.didChangeActiveSession":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Debug/Namespace.ts#L288",

	"debug.didStartSession":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts#L1382",

	debugServer: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	development:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/extensions/electron-browser/cachedExtensionScanner.ts#L114",

	dirs: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/telemetry/node/telemetry.ts#L20",

	disposableBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L32",

	dispose:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer/Server.rs#L511",

	distinctId: "https://github.com/CodeEditorLand/Air/tree/Current/",

	distinct_id: "https://github.com/CodeEditorLand/Land/tree/Current/",

	downloaded_at: "https://github.com/CodeEditorLand/Land/tree/Current/",

	editBuilder: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	"editor.action.formatDocument":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/ExecutingACommandFromTheCommandPalette.md#L118",

	"editor.fiddee.binary":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint.md#L174",

	"editor.fontSize":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/ConfigurationBridge.rs#L168",

	edits: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/core/edits/lengthEdit.ts#L51",

	effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/Shim.rs#L25",

	eliminate: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	emitDecoratorMetadata:
		"https://github.com/CodeEditorLand/Rest/tree/Current/",

	emitterBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L26",

	encoding:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/File/System/Polyfill.ts#L364",

	encryption: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"env.clipboard":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md#L659",

	errorBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L23",

	es2022: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_compat_es2022/src/lib.rs#L17",

	esbuild: "https://esbuild.github.io",

	"event.payload._traceparent":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Effect-OTel.md#L228",

	exclude:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/browser/parts/editor/editorsObserver.ts#L171",

	executable:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/server/node/remoteExtensionHostAgentCli.ts#L189",

	executeCommand:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11023",

	executeTask:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L9382",

	explicit:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/test/browser/dom.test.ts#L247",

	"extHost.api.impl.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts",

	"extHost.protocol.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts",

	"extHostAuthentication.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostAuthentication.ts",

	"extHostBulkEdits.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostBulkEdits.ts",

	"extHostChatAgents2.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostChatAgents2.ts",

	"extHostClipboard.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostClipboard.ts",

	"extHostCommands.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts",

	"extHostComments.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostComments.ts",

	"extHostConfiguration.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostConfiguration.ts",

	"extHostCustomEditors.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCustomEditors.ts",

	"extHostDebugService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDebugService.ts",

	"extHostDecorations.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDecorations.ts",

	"extHostDiagnostics.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDiagnostics.ts",

	"extHostDialogs.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDialogs.ts",

	"extHostDocumentContentProviders.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDocumentContentProviders.ts",

	"extHostDocumentSaveParticipant.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDocumentSaveParticipant.ts",

	"extHostDocuments.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDocuments.ts",

	"extHostFileSystem.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostFileSystem.ts",

	"extHostFileSystemConsumer.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostFileSystemConsumer.ts",

	"extHostFileSystemEventService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostFileSystemEventService.ts",

	"extHostLanguageFeatures.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageFeatures.ts",

	"extHostLanguageModels.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageModels.ts",

	"extHostLanguages.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguages.ts",

	"extHostLocalizationService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLocalizationService.ts",

	"extHostMessageService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostMessageService.ts",

	"extHostNotebook.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebook.ts",

	"extHostNotebookDocuments.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebookDocuments.ts",

	"extHostNotebookKernels.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebookKernels.ts",

	"extHostOutput.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostOutput.ts",

	"extHostProgress.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostProgress.ts",

	"extHostQuickOpen.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostQuickOpen.ts",

	extHostRpcService: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"extHostSCM.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostSCM.ts",

	"extHostSearch.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostSearch.ts",

	"extHostSecrets.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostSecrets.ts",

	"extHostStatusBar.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostStatusBar.ts",

	"extHostStorage.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostStorage.ts",

	"extHostTask.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTask.ts",

	"extHostTerminalService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTerminalService.ts",

	"extHostTesting.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTesting.ts",

	"extHostTextEditor.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTextEditor.ts",

	"extHostTextEditors.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTextEditors.ts",

	"extHostTreeViews.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTreeViews.ts",

	"extHostUrls.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostUrls.ts",

	"extHostWebview.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWebview.ts",

	"extHostWebviewPanels.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWebviewPanels.ts",

	"extHostWebviewView.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWebviewView.ts",

	"extHostWindow.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWindow.ts",

	"extHostWorkspace.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts",

	extensionDependencies:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	extensionHostStarter:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	extensionStorage: "https://github.com/CodeEditorLand/Air/tree/Current/",

	extensionhostdebugservice:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	extensions:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Extension.ts#L171",

	fetch: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/shared-fetch-utils/common/test/advancedFetcher.spec.ts#L56",

	fetchTasks:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L9369",

	fiddee: "https://github.com/CodeEditorLand/Land/tree/Current/",

	fileUri:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/FileSystem/README.md#L77",

	file_creates: "https://github.com/CodeEditorLand/Air/tree/Current/",

	file_deletes: "https://github.com/CodeEditorLand/Air/tree/Current/",

	file_type:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Indexing/Scan/ScanDirectory.rs#L423",

	findFiles:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14098",

	findGroup:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/editor/common/editorGroupFinder.ts#L21",

	findTextInFiles:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.findTextInFiles.d.ts#L92",

	flate2: "https://github.com/CodeEditorLand/Land/tree/Current/",

	fragment:
		"https://github.com/CodeEditorLand/Air/tree/Current/Documentation/Rust/doc/static.files/main-fcd733ba.js#L24",

	"fs.isWritableFileSystem":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L120",

	"fs.readFile":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L503",

	"fs.watch":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Dual/Track.ts#L63",

	gRPC: "https://grpc.io",

	gRPCTransport:
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Transport/mod.rs#L31",

	getAccounts:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L18166",

	getCommands:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11032",

	getConfiguration:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14488",

	getHover:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/chat/test/browser/promptSyntax/languageProviders/promptHovers.test.ts#L98",

	getSession:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L18116",

	getText:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/services/editorWebWorker.ts#L357",

	getWordRangeAtPosition:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/extensions/browser/extensionsCompletionItemsProvider.ts#L29",

	getWorkspaceFolder:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L13893",

	get_clipboard: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	get_configuration:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1409",

	get_env:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri-cli/src/signer/sign.rs#L45",

	"git.commit":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md#L642",

	"git.createSourceControl":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Index.ts#L755",

	globalEnv: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	globalState:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/test/common/event.test.ts#L782",

	globalStorage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/extension/chatSessions/vscode-node/test/copilotCLINativeShim.spec.ts#L23",

	globalThis:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/worker/webWorkerBootstrap.ts#L12",

	"globalThis.__CEL_WIND_RUNTIME__":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Architecture.md#L172",

	"globalThis.__LandTiers":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts#L14",

	"globalThis.__cocoonBootstrapConfig":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/DeepDive.md#L929",

	"globalThis.__filename":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Polyfills.md#L63",

	globset: "https://github.com/CodeEditorLand/Land/tree/Current/",

	grep: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/git/src/util.ts#L216",

	grep_searcher: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	handle: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts#L1137",

	has: "https://github.com/CodeEditorLand/Grove/tree/Current/Source/API/VSCode/WorkspaceConfiguration.rs#L60",

	home: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Platform/Environment.ts#L592",

	http_parser: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	identifier:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/IPC/Message/Types.ts#L47",

	"import.meta.env":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Utility/Tier.ts#L5",

	"import.meta.env.DEV":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts#L40",

	"import.meta.env.Disable":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts#L383",

	"import.meta.env.TierFileSystem":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildPipeline.md#L301",

	include:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/model/intervalTree.ts#L742",

	"index.astro":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EnvironmentVariables.md#L267",

	"index.html":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Rust/doc/index.html",

	initExtensionHost: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	inject: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/node/agentService.test.ts#L37103",

	"inputBox.placeholder":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/contrib/find/browser/findController.ts#L848",

	"inputBox.value":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts#L694",

	installed:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/copilot_shim/src/app.rs#L1453",

	invoke: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/Tauri/Main/Process/MistWebSocketTransport.ts#L153",

	ipcRenderer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/IPC/Renderer/Shim.ts#L1265",

	isAppPortable:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10805",

	isNewAppInstall:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10795",

	join_all: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	json5: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri-utils/src/config_v1/parse.rs#L154",

	keyring: "https://github.com/CodeEditorLand/Air/tree/Current/",

	keytar: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	kwallet: "https://github.com/CodeEditorLand/Air/tree/Current/",

	languageId:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Workspace.ts#L76",

	languageModelsResource:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	languages:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/editor.api.ts#L39",

	"languages.setLanguageConfiguration":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageFeatures.ts#L3010",

	legacy: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/copilot_shim/src/candidate.rs#L483",

	lifecycle:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Server/Notification/DecorationTypeLifecycle.rs#L5",

	lineAt: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	linux: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentPlugins/common/pluginParsers.ts#L782",

	lipo: "https://github.com/CodeEditorLand/Land/tree/Current/",

	listen: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/actions/test/common/menuService.test.ts#L71",

	localGit: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	localPty: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	localResourceRoots:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	localStorage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/node/agentHostCatalogSyncService.test.ts#L240",

	loggers:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/electron-browser/sessions.main.ts#L204",

	logs: "https://github.com/CodeEditorLand/Air/tree/Current/Source/CLI/CliHandler.rs#L165",

	logsPath:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/server-main.ts#L190",

	macOS: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/examples/api/src/views/Menu.svelte#L12",

	machineId:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10783",

	mainPid: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	"mainThreadCommands.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/browser/mainThreadCommands.ts",

	"mainThreadMessageService.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/browser/mainThreadMessageService.ts",

	"mainThreadStatusBar.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/browser/mainThreadStatusBar.ts",

	manualChunks: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	"marketplace.visualstudio.com":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts#L11",

	max_results:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Indexing/Store/QueryIndex.rs#L229",

	message:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Error/CoreError.rs#L201",

	mkdir: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/File/System/Polyfill.ts#L514",

	"mod.rs":
		"https://github.com/CodeEditorLand/Grove/tree/Current/Source/Protocol/mod.rs",

	model: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Transform/Instrument/Vscode/Git.ts#L159",

	mountain: "https://github.com/CodeEditorLand/Air/tree/Current/",

	mountain_ipc_get_status:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs#L910",

	mountain_ipc_invoke:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L74",

	mountain_ipc_receive_message:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/TauriIPCServer.rs#L894",

	mpsc: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	mtime: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/textfile/common/textFileEditorModel.ts#L336",

	nativeHost:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/sessions/test/electron-browser/sessionsApplicationBadge.test.ts#L90",

	"navigator.serviceWorker":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Register.ts#L85",

	"navigator.userAgent":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/OTELBridge.ts#L126",

	nikola: "https://github.com/CodeEditorLand/Air/tree/Current/",

	node: "https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/Rust/doc/static.files/main-fcd733ba.js#L24",

	"node.exe":
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Process/Process.rs#L306",

	nodeIntegration: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	node_modules:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/NodeSWC/swc/crates/swc_ecma_loader/src/resolvers/node.rs#L398",

	npm: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri-cli/src/helpers/mod.rs#L13",

	num_cpus:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/Enhanced/ConnectionPool/Pool.rs#L366",

	nvm: "https://github.com/CodeEditorLand/Land/tree/Current/",

	offsetAt: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	onClick:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/extensions/browser/extensionsWidgets.ts#L62",

	onCommand: "https://github.com/CodeEditorLand/Grove/tree/Current/",

	onData: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/remote/node/nodeSocketFactory.ts#L26",

	onDidChange:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17484",

	onDidChangeActiveTerminal:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11177",

	onDidChangeActiveTextEditor:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11096",

	onDidChangeColorTheme:
		"https://github.com/CodeEditorLand/Sky/tree/Current/",

	onDidChangeConfiguration:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14493",

	onDidChangeEncoding:
		"https://github.com/CodeEditorLand/Output/tree/Current/",

	onDidChangeExtensions:
		"https://github.com/CodeEditorLand/Sky/tree/Current/",

	onDidChangeModelContent:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/automations/test/browser/automationInputCompletions.test.ts#L138",

	onDidChangeSelection:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebookKernels.ts#L137",

	onDidChangeStatus: "https://github.com/CodeEditorLand/Output/tree/Current/",

	onDidChangeTextDocument:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14299",

	onDidChangeWindowState:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11223",

	onDidChangeWorkspaceFolders:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L13883",

	onDidCloseTerminal:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11188",

	onDidCollapse: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	onDidDispose:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCodeInsets.ts#L59",

	onDidEndTask:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L9397",

	onDidEndTerminalShellExecution:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11212",

	onDidExecuteCommand:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/chat/test/browser/chatPetAchievementsContribution.test.ts#L158",

	onDidExecuteTerminalCommand:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.terminalExecuteCommandEvent.d.ts#L46",

	onDidExpand: "https://github.com/CodeEditorLand/Sky/tree/Current/",

	onDidOpenTerminal:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11183",

	onDidOpenTextDocument:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14280",

	onDidReceiveMessage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCodeInsets.ts#L58",

	onDidStartTask:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L9392",

	onDidStartTerminalShellExecution:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11205",

	onDidWriteData: "https://github.com/CodeEditorLand/Mountain/tree/Current/",

	onLanguage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/standalone/browser/standaloneLanguages.ts#L65",

	onWillSaveTextDocument:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14314",

	once: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/parts/ipc/node/ipc.mp.ts#L100",

	onclick: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	openEditor:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/editor/test/browser/editorService.test.ts#L636",

	openEditorEffect:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	openExternal:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.externalUriOpener.d.ts#L167",

	openTextDocument:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14175",

	open_dialog: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	opentelemetry: "https://github.com/CodeEditorLand/Common/tree/Current/",

	options:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Shim/NodeModuleInterceptor.ts#L202",

	os: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/test/common/path.test.ts#L162",

	output: "https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/Rust/doc/static.files/settings-170eb4bf.js#L1",

	oxc_allocator: "https://github.com/CodeEditorLand/Land/tree/Current/",

	oxc_ast: "https://github.com/CodeEditorLand/Land/tree/Current/",

	oxc_codegen: "https://github.com/CodeEditorLand/Land/tree/Current/",

	oxc_parser: "https://github.com/CodeEditorLand/Rest/tree/Current/",

	oxc_semantic: "https://github.com/CodeEditorLand/Land/tree/Current/",

	oxc_span: "https://github.com/CodeEditorLand/Land/tree/Current/",

	oxc_transformer: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"package.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/package.json",

	"panel.webview.onDidReceiveMessage":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/CreatingAndInteractingWithAWebviewPanel.md#L180",

	params: "https://github.com/CodeEditorLand/Air/tree/Current/Documentation/Rust/doc/static.files/main-fcd733ba.js#L1",

	payload:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/DocumentProvider/Notifications.rs#L38",

	perfMarks:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/notebook/browser/notebookEditor.ts#L452",

	permissions:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Plugins/PluginManager.rs#L210",

	phc_: "https://github.com/CodeEditorLand/Air/tree/Current/",

	phc_mvbuxcLutfZctCVwnC4TTksmtNPPVgcx7gX96tTuCKk4:
		"https://github.com/CodeEditorLand/Air/tree/Current/",

	pid: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/services/agentHostFilter/test/browser/agentHostFilterService.test.ts#L100",

	pipeTransport: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	platform:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Platform/Environment.ts#L572",

	pnpm: "https://pnpm.io",

	portpicker: "https://github.com/CodeEditorLand/Mist/tree/Current/",

	positionAt:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/chat/browser/aiCustomization/embeddedMcpServerDetail.ts#L786",

	postMessage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/worker/extensionHostWorker.ts#L23",

	"posthog.distinct_id":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Overview.md#L11",

	"posthog.event":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Overview.md#L11",

	preopened_dir: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	prepublishOnly: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"process.argv":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Build/VS/Code.ts#L141",

	"process.env":
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Microsoft/NPM/Ingress/Configuration/ESBuild.ts#L34",

	"process.env.NODE_ENV":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Module/Telemetry/Tree-Shaking.md#L43",

	"process.env.TierX":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/TierGatedImplementationSelection.md#L301",

	"process.exit":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts#L317",

	"process.kill":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/PatchProcess/Patcher.ts#L384",

	"process.platform":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts#L137",

	"process.stderr.write":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Land/Fix/Log.ts#L5",

	"process.stdout.write":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Land/Fix/Log.ts#L5",

	"process.versions":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Transform/Rewrite/Icons/Style/Sheet/URLs.ts#L64",

	"product.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/Rust/debug/product.json",

	profile:
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/CLI/Cli.rs#L140",

	profiles:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/terminal/browser/sessionsTerminalContribution.ts#L162",

	prometheus: "https://github.com/CodeEditorLand/Common/tree/Current/",

	prost: "https://github.com/CodeEditorLand/Air/tree/Current/Documentation/Rust/doc/trait.impl/prost/message/trait.Message.js#L2",

	protoc: "https://github.com/CodeEditorLand/Air/tree/Current/",

	provideInlayHints:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/benches/full/typescript.js#L148074",

	provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Command/LanguageFeature/InvokeProvider.rs#L27",

	"provider.onDidChange":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts#L644",

	publisher:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/extensionManagement/common/extensionManagementService.ts#L907",

	query: "https://github.com/CodeEditorLand/Air/tree/Current/Documentation/Rust/doc/static.files/search-fd9372ac.js#L1",

	queryLocalFonts: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	queueMicrotask:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/tests/fixture/issues/2257/full/input.js#L11315",

	rand: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/arrays.ts#L517",

	rayon: "https://github.com/CodeEditorLand/Land/tree/Current/",

	readDirectory:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/benches/full/typescript.js#L7451",

	readFile:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/File/System/Polyfill.ts#L357",

	read_dir:
		"https://github.com/CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md#L114",

	read_file:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L804",

	refresh:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/services/sessions/browser/sessionsRecentWorkspacesService.ts#L314",

	registerAuthenticationProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L18186",

	registerCodeActionsProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14879",

	registerCodeLensProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14892",

	registerCommand:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10990",

	registerCompletionItemProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14852",

	registerCompletionProvider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	registerCustomEditorProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11791",

	registerDebugAdapterDescriptorFactory:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17375",

	registerDebugAdapterTrackerFactory:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17384",

	registerDebugConfigurationProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17364",

	registerDefinitionProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14905",

	registerDocumentFormattingEditProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15096",

	registerDocumentSymbolProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15013",

	registerFileDecorationProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11835",

	registerFileSystemProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14517",

	registerFoldingRangeProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15208",

	registerHoverProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14957",

	registerInlayHintsProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15191",

	registerInlineCompletionItemProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.inlineCompletionsAdditions.d.ts#L23",

	registerLanguageModelChatProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L20853",

	registerNotebookCellStatusBarItemProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L16377",

	registerNotebookSerializer:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.notebookLiveShare.d.ts#L19",

	registerReferenceProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15038",

	registerRenameProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15051",

	registerSemanticTokensProvider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	registerSignatureHelpProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15142",

	registerTaskProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L9359",

	registerTextDocumentContentProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14266",

	registerTextEditorCommand:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11007",

	registerTreeDataProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11695",

	registerUriHandler:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11727",

	registerWebviewPanelSerializer:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11741",

	registerWebviewViewProvider:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11752",

	register_authentication_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1389",

	register_code_actions_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L708",

	register_code_lens_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1132",

	register_completion_item_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L660",

	register_debug_adapter:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L964",

	register_debug_configuration_provider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	register_definition_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L676",

	register_document_formatting_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1068",

	register_file_system_provider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	register_folding_range_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1148",

	register_hover_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L644",

	register_inlay_hints_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1196",

	register_inline_completion_item_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1276",

	register_notebook_serializer:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	register_reference_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L692",

	register_rename_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1052",

	register_scm_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L948",

	register_semantic_tokens_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1180",

	register_signature_help_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1116",

	register_task_provider:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L1365",

	register_text_document_content_provider:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	register_uri_handler:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	remoteAuthority:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.proposed.resolvers.d.ts#L472",

	remoteName:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10843",

	removeBreakpoints:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17417",

	rename_file:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L4058",

	replacePreviousChar:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	requestAnimationFrame:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/test/browser/componentFixtures/fixtureUtils.ts#L1117",

	requestIdleCallback:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/typings/base-common.d.ts#L17",

	reqwest:
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/Resolver.rs#L70",

	reserved:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/browser/dom.ts#L1707",

	"resourceGroups.Changes":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/SourceControlManagementSCM.md#L33",

	resourceStates:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/git/src/repository.ts#L1396",

	rest: "https://github.com/CodeEditorLand/Air/tree/Current/Source/Indexing/Language/ParseTypeScript.rs#L334",

	retry_backoff_ms: "https://github.com/CodeEditorLand/Air/tree/Current/",

	retry_count: "https://github.com/CodeEditorLand/Air/tree/Current/",

	rev: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/test/componentFixtures/cssOrderScan.mts#L229",

	rhai: "https://github.com/CodeEditorLand/Land/tree/Current/",

	ripgrep:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/search/node/fileSearch.ts#L200",

	rustfmt: "https://github.com/CodeEditorLand/Land/tree/Current/",

	"rustfmt.toml":
		"https://github.com/CodeEditorLand/Land/tree/Current/rustfmt.toml",

	rustup: "https://github.com/CodeEditorLand/Land/tree/Current/",

	sample: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/chat/browser/sessionWorkspacePicker.ts#L1069",

	satisfies:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/IPC/Channel.ts#L17",

	saveAll:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14130",

	saveAs: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14121",

	scheme: "https://github.com/CodeEditorLand/Wind/tree/Current/Source/Workbench/Implementation/WorkbenchIntegrationImplementation.ts#L566",

	secrets:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/github-authentication/src/test/enterpriseStorage.test.ts#L29",

	"secrets.delete":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L347",

	"secrets.get":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L277",

	"secrets.store":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts#L309",

	security:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri-utils/src/config.rs#L4372",

	selectChatModels:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L20772",

	sendRequest:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/electron-browser/agentHostProtocolClient.test.ts#L816",

	serde: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/GenericRequest/FileSystem/mod.rs#L8",

	sessionId:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10789",

	sessions:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Updates/UpdateManager.rs#L1941",

	setInterval:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/typings/base-common.d.ts#L28",

	setLanguageConfiguration:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L15303",

	setStatusBarMessage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11566",

	setTextDocumentLanguage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14746",

	setTimeout:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/typings/base-common.d.ts#L25",

	setTimeout0:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/platform.ts#L221",

	set_clipboard: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	set_configuration: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"settings.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/.vscode/settings.json",

	setup_webview_message_listener_impl:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/WebviewProvider/Messaging.rs#L92",

	sh: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/tests/fixture/issues/firebase-firestore/1/input.js#L24249",

	sha256: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/build/lib/download.ts#L17",

	sharedDataFolderName:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/",

	shell: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10850",

	"shell.open":
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/Native/Module/Polyfill.ts#L462",

	shell_path: "https://github.com/CodeEditorLand/Air/tree/Current/",

	showCommands:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/browser/parts/editor/editorGroupWatermark.ts#L35",

	showErrorMessage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11376",

	showInformationMessage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11285",

	showInputBox:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11491",

	showNotebookDocument:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11267",

	showOpenDialog:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11469",

	showPreviousWindowTab:
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	showQuickPick:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11421",

	showSaveDialog:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11478",

	showTextDocument:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11236",

	showWarningMessage:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11330",

	showWorkspaceFolderPick:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11460",

	sidecar:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/node/copilot/localModelBridge/shim/downloader.ts#L643",

	snake_case:
		"https://github.com/CodeEditorLand/Land/tree/Current/Dependency/Tauri/Dependency/Tauri/crates/tauri-cli/src/mobile/init.rs#L299",

	span_id:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/Enhanced/PerformanceDashboard/Dashboard.rs#L160",

	spdlog: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/environment/test/node/nativeModules.integrationTest.ts#L74",

	startDebugging:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L17397",

	stat: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L4744",

	statechange: "https://github.com/CodeEditorLand/Land/tree/Current/",

	stderr: "https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Rest/Plugin.ts#L416",

	stdout: "https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Rest/Plugin.ts#L418",

	storage:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceAdapters/WindServiceAdapter.rs#L98",

	store: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Transform/Patch/Local/Terminal/Backend.ts#L84",

	strings:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/php-language-features/src/features/validationProvider.ts#L72",

	structuredClone: "https://github.com/CodeEditorLand/Air/tree/Current/",

	suppressSuggestions:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/contrib/suggest/browser/suggestModel.ts#L115",

	tao: "https://github.com/CodeEditorLand/Land/tree/Current/",

	tar: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/cli/src/util.rs#L22",

	"task.didEnd":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts#L1203",

	"task.didEndProcess":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts#L144",

	"task.didStart":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts#L1186",

	"task.didStartProcess":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Tasks/Namespace.ts#L143",

	taskExecutions:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L9387",

	tasks: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/async.ts#L1092",

	"tasks.json":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/.vscode/tasks.json",

	tauri: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs#L298",

	"tauri.conf.json":
		"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

	temp: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/mermaid-markdown-features/preview-src/notebook/index.ts#L44",

	temp_dir:
		"https://github.com/CodeEditorLand/Air/tree/Current/Source/Downloader/DownloadManager.rs#L1780",

	terminal:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/DeepDive.md#L337",

	textDocuments:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L14154",

	textEditor:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/contrib/editor/test/browser/diffEditor.sessions.contribution.test.ts#L229",

	textFile:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/platform/workspaceChunkSearch/test/node/externalIngest.spec.ts#L434",

	"this.productService.dataFolderName":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/environment/common/environmentService.ts#L101",

	thiserror: "https://github.com/CodeEditorLand/Common/tree/Current/",

	tier_routes_to_node:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/DispatchMatch.rs#L344",

	timeout_ms: "https://github.com/CodeEditorLand/Air/tree/Current/",

	timingBuffer:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts#L38",

	title: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Debug/WebkitServer.rs#L454",

	tmpdir: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/cli/src/commands/serve_web.rs#L816",

	tokio: "https://github.com/CodeEditorLand/Air/tree/Current/",

	toml_edit: "https://github.com/CodeEditorLand/Land/tree/Current/",

	tonic: "https://github.com/CodeEditorLand/Air/tree/Current/Source/Vine/Generated/air.rs#L450",

	tonic_build: "https://github.com/CodeEditorLand/Air/tree/Current/",

	trace_id:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/Enhanced/PerformanceDashboard/Dashboard.rs#L158",

	traceparent:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/mcp/test/common/mcpServerRequestHandler.test.ts#L390",

	tracing:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/copilot/src/extension/xtab/node/xtabProvider.ts#L212",

	track: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/browser/widget/diffEditor/features/movedBlocksLinesFeature.ts#L107",

	tree: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/RefactoringStrategy.md#L260",

	"tree.register":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/Client/Service.ts#L835",

	"turbo.json":
		"https://github.com/CodeEditorLand/Land/tree/Current/turbo.json",

	turborepo: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"update.editor.land":
		"https://github.com/CodeEditorLand/Mist/tree/Current/Source/ForwardSecurity.rs#L23",

	updatefound: "https://github.com/CodeEditorLand/Land/tree/Current/",

	uriScheme:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10768",

	useDefineForClassFields:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts#L1496",

	userData:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/userDataSync/browser/userDataSyncInit.ts#L232",

	v8: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/TsParserTestRef/expressions/optionalChaining/optionalChainingInference/input.ts#L30",

	vars: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/SWC/crates/swc_ecma_minifier/src/option/mod.rs#L503",

	viewColumn:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/common/cursor/cursorMoveCommands.ts#L644",

	viewType:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebook.ts#L228",

	visibleTextEditors:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11089",

	vite: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	"vortex.data.microsoft.com":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Shim/NetworkProxy.ts#L28",

	"vscode.Memento":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostMemento.ts#L12",

	"vscode.Notebook":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebook.ts#L43",

	"vscode.Uri":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L1439",

	"vscode.WebviewPanel":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L10086",

	"vscode.authentication":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostAuthentication.ts#L58",

	"vscode.chat":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostChatAgents2.ts#L488",

	"vscode.chat.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostChatAgents2.ts#L488",

	"vscode.commands":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L46",

	"vscode.commands.executeCommand":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L132",

	"vscode.commands.registerCommand":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostCommands.ts#L123",

	"vscode.commands.registerTextEditorCommand":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L380",

	"vscode.comments":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostComments.ts#L34",

	"vscode.d.ts":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L6",

	"vscode.debug":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDebugService.ts#L64",

	"vscode.debug.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDebugService.ts#L64",

	"vscode.debug.registerDebugConfigurationProvider":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDebugService.ts#L56",

	"vscode.debug.startDebugging":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostDebugService.ts#L54",

	"vscode.env":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L421",

	"vscode.env.appRoot":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L431",

	"vscode.env.machineId":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L422",

	"vscode.env.openExternal":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L470",

	"vscode.extensions":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostExtensionService.ts#L81",

	"vscode.extensions.getExtension":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L2078",

	"vscode.git":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostGitExtensionService.ts#L177",

	"vscode.l10n":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLocalizationService.ts#L16",

	"vscode.languages":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageFeatures.ts#L2163",

	"vscode.languages.registerHoverProvider":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageFeatures.ts#L2354",

	"vscode.languages.registerInlineCompletionItemProvider":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L757",

	"vscode.lm":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageModels.ts#L123",

	"vscode.lm.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostLanguageModels.ts#L123",

	"vscode.notebook.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebook.ts#L43",

	"vscode.notebooks":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostNotebook.ts#L43",

	"vscode.open":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts#L289",

	"vscode.postMessage":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWebview.ts#L129",

	"vscode.scm":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostSCM.ts#L971",

	"vscode.scm.createSourceControl":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostSCM.ts#L1031",

	"vscode.tasks":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTask.ts#L751",

	"vscode.tasks.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTask.ts#L751",

	"vscode.tasks.executeTask":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTask.ts#L47",

	"vscode.tests":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTesting.ts#L55",

	"vscode.tests.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTesting.ts#L55",

	"vscode.window":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWindow.ts#L17",

	"vscode.window.createTerminal":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L687",

	"vscode.window.createWebviewPanel":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L1130",

	"vscode.window.showInformationMessage":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L909",

	"vscode.window.showQuickPick":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L918",

	"vscode.workspace":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L194",

	"vscode.workspace.fs":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L1396",

	"vscode.workspace.fs.stat":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L2026",

	"vscode.workspace.getConfiguration":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L259",

	"vscode.workspace.onDidChangeConfiguration":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostConfiguration.ts#L156",

	"vscode.workspace.openTextDocument":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L840",

	"vscode.workspace.registerFileSystemProvider":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L2022",

	"vscode.workspace.textDocuments":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L1292",

	waiting:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/services/policies/test/browser/accountPolicyService.test.ts#L1215",

	wasm: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/test/browser/componentFixtures/fixtureSyntaxHighlighting.ts#L215",

	webFrame:
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts#L387",

	webview:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWebviewView.ts#L193",

	willSave: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	win32: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/path.ts#L207",

	"window.ISandboxConfiguration":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Types/Sandbox.ts#L105",

	"window._LOAD_CSS_WORKER":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/CSS/Load.ts#L30",

	"window._WORKER":
		"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/Register.ts#L24",

	"window.createWebviewPanel":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L1130",

	"window.didCloseTerminal":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTerminalService.ts#L443",

	"window.didOpenTerminal":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTerminalService.ts#L445",

	"window.onDidEndTerminalShellExecution":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L900",

	"window.onDidExecuteTerminalCommand":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostTerminalService.ts#L48",

	"window.onDidStartTerminalShellExecution":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L897",

	"window.posthog":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts#L4",

	"window.posthog.capture":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Telemetry/PostHogBridge.ts#L4",

	"window.process":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Polyfills.ts#L6",

	"window.showInformationMessage":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L909",

	"window.vscode":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Function/Install/Function/Install.ts#L5",

	"window.vscode.ipcRenderer":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts#L103",

	"window.vscode.ipcRenderer.invoke":
		"https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts#L134",

	withProgress:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L11622",

	workbench:
		"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Build/Rhai/EnvironmentResolver.rs#L63",

	"workbench.action.applyThemeFromFile":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/VSCode-API-Coverage-Matrix.md#L117",

	"workbench.action.authentication.signIn":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Workflow/UserDataSynchronization.md#L30",

	"workbench.action.files.openFile":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md#L641",

	"workbench.action.files.save":
		"https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md#L466",

	"workbench.action.files.saveAll":
		"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts#L304",

	"workbench.action.showCommands":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/editor/browser/controller/editContext/screenReaderUtils.ts#L121",

	"workbench.action.terminal.new":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/terminal/electron-browser/terminalRemote.ts#L18",

	"workbench.action.terminal.toggleTerminal":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md#L640",

	"workbench.action.toggleSidebar":
		"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EditorCore.md#L640",

	workspace:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/sessions/services/sessions/common/sessionContextKeys.ts#L168",

	"workspace.applyEdit":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L1280",

	"workspace.findFiles":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L498",

	"workspace.fs.":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L194",

	"workspace.fs.readFile":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.protocol.ts#L2028",

	"workspace.openTextDocument":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L840",

	"workspace.save":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L918",

	"workspace.saveAll":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L930",

	"workspace.saveAs":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostWorkspace.ts#L919",

	"workspace.textDocuments":
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHost.api.impl.ts#L1292",

	workspaceFolders:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vscode-dts/vscode.d.ts#L13830",

	workspaceState:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostExtensionService.ts#L505",

	writeClipboard: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	writeFile:
		"https://github.com/CodeEditorLand/Output/tree/Current/Source/Polyfill/File/System/Polyfill.ts#L386",

	writeText:
		"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/node/e2e/suites/clientFilesystemSuite.ts#L74",

	write_file:
		"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Generated/vine.rs#L4722",

	write_terminal: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

	wry: "https://github.com/CodeEditorLand/Land/tree/Current/",

	x86_64: "https://github.com/CodeEditorLand/Land/tree/Current/",

	yarn: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/NodeSWC/swc/crates/swc/tests/exec.rs#L65",

	yes: "https://github.com/CodeEditorLand/Land/tree/Current/Dependency/SWC/Dependency/TsParserTestRef/internalModules/codeGeneration/exportCodeGen/input.ts#L28",

	zip: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/node/zip.ts#L258",

	zod: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",
	...MentionMap,
	...TechnicalMentions,
};
