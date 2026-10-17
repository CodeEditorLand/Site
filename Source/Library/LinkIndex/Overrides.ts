/**
 * Per-page overrides for the markdown pass (Phase 3c): keyed by the .md
 * basename (no extension) of the page being rendered. false -> never link
 * this term on this page; string -> pin this exact URL. Consulted by the
 * remark plugin (Source/Function/Markdown/CodeMentions.ts) via the vfile
 * path after a term resolves through the matcher. Phase 3d split: this is
 * a separate page-keyed file, re-exported by the LinkIndex aggregator.
 */

export const LinkIndexOverrides: Record<
	string,
	Record<string, string | false>
> = {
	ApplicationStartupHandshake: {
		Editor: false,

		Electron: "https://www.electronjs.org",

		Process: false,

		Workspace: false,
	},

	BuildSystemDesign: {
		Cargo: false,

		Configuration: false,

		Electron: false,

		Embedded: false,

		IPC: false,

		JavaScript: false,

		Native: false,

		Tier: false,
	},

	EffectTypeScriptArchitecture: {
		Effect: false,

		Electron: "https://www.electronjs.org",

		High: false,

		IPC: false,

		Layer: false,

		Low: false,

		Normal: false,

		On: false,

		Promise: false,

		Runtime: false,

		Scope: false,

		Update: false,
	},

	ExtensionHostDeepDive: {
		ApiFactory: false,

		CommandsProvider: false,

		Core: false,

		DTO: false,

		Dependency: false,

		ExtensionHostHandler: false,

		ExtensionProvider: false,

		Extensions: false,

		LanguageProviderHandler: false,

		Main: false,

		MountainConnection:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

		Node: false,

		PTY: false,

		Promise: false,

		SIGINT: false,

		SIGTERM: false,

		WindowProvider: false,

		initExtensionHost:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization/InitExtensionHost.rs",
	},

	LocalFirstPhilosophy: {
		Browser: false,

		Core: false,

		IPC: false,

		JavaScript: false,

		PTY: false,

		WASMtime: "https://wasmtime.dev",
	},

	TauriDesktopIntegration: {
		ApplicationRunTime:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Effect/ApplicationRunTime.rs",

		Effect: false,

		Electron: false,

		IPC: false,

		Node: false,
	},

	VSCodeCompatibility: {
		Core: false,

		Extensions: false,

		PTY: false,

		Terminal: false,
	},

	air: {
		Cache: false,

		CheckForUpdate:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Updates/UpdateManager.rs",

		DATA_DIR: "https://github.com/CodeEditorLand/Air/tree/Current/",

		IPC: false,

		Main: false,

		Parallel: false,

		Range: false,

		Replace: false,

		Runtime: false,

		Telemetry: false,

		Tokio: false,

		UPDATE_CHECK_INTERVAL:
			"https://github.com/CodeEditorLand/Air/tree/Current/",

		Update: false,
	},

	"api-reference": {
		Core: false,

		Environment: false,

		FailureCount:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L67",

		HTTPS_PROXY:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/NativeHost/ResolveProxy.rs#L1",

		HTTP_PROXY:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/NativeHost/ResolveProxy.rs#L1",

		IPC: false,

		Install: false,

		LastActivity:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Source/Client/Shared.rs#L64",

		Layer: false,

		Native: false,

		Node: false,

		NodeDeferred:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L618",

		None: false,

		OpenChannelFromCocoon:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L28",

		OpenChannelFromMountain:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L48",

		PTY: false,

		ProcessCocoonRequest:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L8",

		ProcessMountainRequest:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L34",

		SendCocoonNotification:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L11",

		SendMountainNotification:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L37",

		Spine: false,

		TierSearch:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs#L84",

		TierStorage:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs#L93",

		TierTerminal:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs#L75",
	},

	architecture: {
		Clipboard: false,

		Core: false,

		Dialog: false,

		ESBuild: "https://esbuild.github.io",

		Editor: false,

		Electron: false,

		FileSystem: false,

		Full: false,

		High: false,

		Hyper: false,

		IPC: false,

		Layer: false,

		Layer2: false,

		Layer3: false,

		Layer4: false,

		Layer5: false,

		Low: false,

		MountainConnection:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

		Native: false,

		Node: false,

		NodeDeferred: false,

		Normal: false,

		PTY: false,

		Process: false,

		SharedMemory: false,

		SkyBridge: false,

		Standard: false,

		Terminal: false,

		Tier: false,

		TierAuth: false,

		TierDebug: false,

		TierLanguageFeatures: false,

		TierSCM: false,

		TierTasks: false,

		TierTerminal: false,

		Track: false,

		Transport: false,

		WASMtime: "https://wasmtime.dev",

		Window: false,

		effect: false,
	},

	"build-matrix": {
		ESBuild: false,

		IPC: false,

		None: false,

		Profile: false,

		Runtime: false,

		Shared: false,

		Telemetry: false,

		Tier: false,

		Transport: false,

		beforeBundleCommand: false,
	},

	"build-pipeline": {
		Browser: false,

		Bundled: false,

		Cache: false,

		Cargo: false,

		Core: false,

		ESBuild: "https://esbuild.github.io",

		Editor: false,

		Effect: false,

		Electron: false,

		Extensions: false,

		Full: false,

		JavaScript: false,

		Native: false,

		Node: false,

		None: false,

		Production: false,

		Profile: false,

		Rollup: false,

		ServiceWorker: false,

		Workbench: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",
	},

	"ci-cd-pipeline": {
		Browser: false,

		Bundled: false,

		Core: false,

		ESBuild: "https://esbuild.github.io",

		Effect: false,

		Electron: false,

		Extensions: false,

		JavaScript: false,

		Native: false,

		Node: false,

		None: false,

		Production: false,

		Profile: false,

		Rollup: false,

		Workbench: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",
	},

	cocoon: {
		Browser: false,

		Configuration: false,

		Effect: false,

		Electron: false,

		Full: false,

		IPC: false,

		Layer: false,

		Main: false,

		Native: false,

		Node: false,

		PTY: false,

		Process: false,

		Profile: false,

		Runtime: false,

		Search: false,

		Task: false,

		Track: false,

		Webview: false,

		Window: false,

		WindowProvider:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Window.ts",

		Workbench: false,

		Workspace: false,

		createDirectory: false,

		effect: false,

		"index.astro":
			"https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro",

		readDirectory: false,
	},

	"cocoon-vscode-validation": {
		Clean: false,

		Dependency: false,

		Document: false,

		Effect: false,

		Extensions: false,

		Full: false,

		High: false,

		Hover: false,

		IPC: false,

		JavaScript: false,

		Layer: false,

		Process: false,

		Standard: false,

		Task: false,

		Terminal: false,

		Webview: false,

		Window: false,

		Workspace: false,
	},

	common: {
		DTO: false,

		PTY: false,

		PostHog: false,

		TCapability:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Effect/ActionEffect.rs#L21",

		TELEMETRY_DISABLE:
			"https://github.com/CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md#L314",

		TELEMETRY_OTLP_ENDPOINT:
			"https://github.com/CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md#L315",

		TELEMETRY_POSTHOG_KEY:
			"https://github.com/CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md#L314",

		Task: false,
	},

	configuration: {
		Cargo: false,

		Clean: false,

		Electron: false,

		Empty: false,

		Environment: false,

		Production: false,

		Terminal: false,

		Window: false,

		"build.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

		effect: false,
	},

	contributing: {
		IPC: false,

		Smoke: false,
	},

	coverage: {
		Core: false,

		Full: false,

		IPC: false,

		LandDiagnostics:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/Service/CEL/Land/Shim/Diagnostics/LandDiagnostics.ts",

		Level: false,

		Low: false,

		Native: false,

		None: false,

		OTLP: false,

		On: false,

		Own: false,

		PTY: false,

		Pick: false,

		PostHog: false,

		Preempt: false,

		Replace: false,

		Ring: false,

		Task: false,

		Telemetry: false,
	},

	"deep-dive-air": {
		Configuration: false,

		Download: false,

		Runtime: false,

		Telemetry: false,

		Tokio: false,

		Update: false,
	},

	"deep-dive-cocoon": {
		Buffer: false,

		Electron: false,

		Empty: false,

		Extensions: false,

		Full: false,

		High: false,

		IPC: false,

		Process: false,

		Runtime: false,

		Task: false,

		URI: false,

		effect: false,
	},

	"deep-dive-common": {
		ApplicationRunTime: false,

		Cache: false,

		DTO: false,

		Effect: false,

		Full: false,

		IPC: false,

		Layer: false,

		Parallel: false,

		Runtime: false,

		Sequential: false,

		TCapability: false,

		effect: false,
	},

	"deep-dive-echo": {
		ApplicationRunTime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RunTime/ApplicationRunTime/mod.rs",

		Batch: false,

		Cache: false,

		Full: false,

		High: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Low: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Native: false,

		Normal: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Worker: false,
	},

	"deep-dive-grove": {
		Cargo: false,

		Extensions: false,

		IPC: false,

		Main: false,

		Shared: false,

		Spine: "https://github.com/CodeEditorLand/Grove/tree/Current/Source/Protocol/SpineConnection.rs",

		WASMtime: "https://wasmtime.dev",

		wasm: false,
	},

	"deep-dive-maintain": {
		Configuration: false,

		Core: false,

		Full: false,
	},

	"deep-dive-mist": {
		Environment: false,

		Transport: false,
	},

	"deep-dive-mountain": {
		ApplicationRunTime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RunTime/ApplicationRunTime/mod.rs",

		Boot: false,

		Buffer: false,

		Clean: false,

		Core: false,

		DTO: false,

		IPC: false,

		On: false,

		OnceLock: false,

		PTY: false,

		Report: false,

		beforeBundleCommand: false,

		"context.secrets":
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

		effect: false,

		languageModelsResource: false,

		mainPid: false,

		"mod.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",
	},

	"deep-dive-rest": {
		Configuration: false,

		JavaScript: false,

		Main: false,

		Process: false,

		Worker: false,
	},

	"deep-dive-sidecar": {
		Cache: false,

		Cargo: false,

		Main: false,

		Runtime: false,

		Shared: false,

		"Source/Library.rs": false,

		"Source/main.rs":
			"https://github.com/CodeEditorLand/SideCar/tree/Current/Source/main.rs",

		Standard: false,

		Tokio: false,

		"build.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

		node: false,
	},

	"deep-dive-sky": {
		CustomEvent: false,

		Effect: false,

		Electron: false,

		IPC: false,

		Production: false,

		Shared: false,

		Task: false,
	},

	"deep-dive-vine": {
		Core: false,

		IPC: false,

		OpenChannelFromCocoon:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		OpenChannelFromMountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		ProcessCocoonRequest:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		Range: false,

		SendCocoonNotification:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		SendMountainNotification:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		Spine: false,

		URI: false,

		Update: false,

		__textDocuments: false,

		"mod.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",
	},

	"deep-dive-wind": {
		Bundle: false,

		CustomEvent: false,

		Dependency: false,

		Effect: false,

		Full: false,

		High: false,

		IPC: false,

		Layer: false,

		Low: false,

		MockClipboardLayer:
			"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md#L213",

		Native: false,

		Node: false,

		NodeDeferred: false,

		Tag: false,

		TierAuth: false,

		TierDebug: false,

		TierEncryption: false,

		TierLanguageFeatures: false,

		TierModel: false,

		TierSCM: false,

		TierSearch: false,

		TierStorage: false,

		TierTasks: false,

		TierTerminal: false,

		TierWebSocket: false,

		extensionHostStarter: false,

		localGit: false,

		localPty: false,
	},

	"deep-dive-worker": {
		Cache: false,

		ESBuild: "https://esbuild.github.io",

		On: false,

		PostHog: false,

		SKIP_WAITING:
			"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker.ts",

		Telemetry: false,

		Workbench: false,

		_LOAD_CSS_WORKER:
			"https://github.com/CodeEditorLand/Worker/tree/Current/Source/Worker/CSS/Load.ts",
	},

	"dependency-management": {
		Cargo: false,

		Full: false,

		Node: false,

		Skip: false,

		"build.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",
	},

	"development-history": {
		"Bootstrap.ts":
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

		Effect: false,

		IPC: false,

		MountainConnection:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

		Node: false,

		NodeDeferred: false,

		On: false,

		Window: false,

		Workspace: false,

		beforeBundleCommand: false,

		"console.error": false,

		"console.log": false,

		"console.warn": false,

		effect: false,
	},

	echo: {
		ApplicationRunTime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RunTime/ApplicationRunTime/mod.rs",

		Builder: false,

		Empty: false,

		High: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Low: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Main: false,

		Normal: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Worker: false,

		effect: false,
	},

	"extension-development": {
		Configuration: false,

		Extensions: false,

		IPC: false,

		Install: false,

		Lodge: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L45",

		On: false,

		Secret: false,

		acceptInputCommand:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Scm/Namespace.ts#L531",

		activationEvents: false,
	},

	"filesystem-footprint": {
		Browser: false,

		Bundle: false,

		Bundled: false,

		PostHog: false,

		Update: false,

		distinctId: false,

		effect: false,

		extensionStorage: false,

		localStorage: false,
	},

	"filesystem-footprint-cleanup": {
		Normal: false,

		Secret: false,

		Webview: false,

		Workbench: false,
	},

	"filesystem-footprint-encapsulation": {
		Boot: false,

		Dependency: false,

		Extend: false,

		None: false,

		PostHog: false,

		Profile: false,

		Replace: false,

		Tier: false,

		Webview: false,

		Workbench: false,
	},

	"filesystem-footprint-environment-variables": {
		AIR_LOG_DIR:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		AIR_LOG_FILE:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		AIR_LOG_JSON:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		Ask: false,

		Cap: false,

		Capture: false,

		Effect: false,

		Extend: false,

		LAND_: false,

		Lodge: false,

		MountainDir: false,

		Node: false,

		NodeDeferred: false,

		None: false,

		Off: false,

		On: false,

		PostHog: false,

		Record: false,

		Report: false,

		Smoke: false,

		Throttle: false,

		VSCODE_COCOON_GLOBAL_STORAGE:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

		effect: false,

		localStorage: false,
	},

	"filesystem-footprint-per-element": {
		AIR_LOG_DIR:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		AIR_LOG_FILE:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		Batch: false,

		Cap: false,

		Capture: false,

		ESBuild: false,

		IPC: false,

		Node: false,

		PostHog: false,

		Report: false,

		Smoke: false,

		Throttle: false,

		Update: false,

		Webview: false,

		Workbench: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

		distinctId:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/DistinctId.rs",

		localStorage: false,

		"process.env": false,
	},

	"filesystem-footprint-platform-paths": {
		Bundled: false,

		Empty: false,

		Process: false,

		Profile: false,

		Resources: false,

		ServiceWorker: false,

		Window: false,

		globalState: false,

		localStorage: false,
	},

	"filesystem-footprint-user-dotfile": {
		Effect: false,

		Extend: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L46",

		Lodge: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L45",

		Node: false,

		VSCODE_COCOON_GLOBAL_STORAGE:
			"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L49",

		extensionStorage: false,
	},

	"getting-started": {
		Buffer: false,

		Download:
			"https://github.com/CodeEditorLand/SideCar/tree/Current/README.md",

		Editor: "https://github.com/DependencyCodeEditorLand/Editor",

		Electron: "https://www.electronjs.org",

		Full: false,

		IPC: false,

		Install: false,

		Layer2: false,

		Layer4: false,

		Native: false,

		NetworkCocoonPort: false,

		NetworkMountainPort: false,

		Node: false,

		NodeDeferred: false,

		None: false,

		Profile: false,

		Rollup: false,

		TierFileSystem: false,

		TierFileWatcher: false,

		TierRemoteProcedureCall: false,

		Workbench: false,
	},

	grove: {
		Cargo: false,

		Full: false,

		IPC: false,

		JavaScript: false,

		Level: false,

		Process: false,

		Requires: false,

		Runtime: false,

		Shared: false,

		Spine: false,

		Transport: false,
	},

	installation: {
		Editor: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current",

		Electron: "https://www.electronjs.org",

		Install: false,

		Node: false,

		None: false,

		Profile: false,
	},

	introduction: {
		Core: false,

		Editor: false,

		Electron: "https://www.electronjs.org",

		Extensions: false,

		Full: false,

		IPC: false,

		Native: false,

		Node: false,

		NodeDeferred: false,

		PTY: false,

		Process: false,

		Replace: false,

		TierAuth: false,

		TierSCM: false,

		TierTerminal: false,

		Window: false,

		Workspace: false,
	},

	"local-first-protocol": {
		Ask: false,

		Editor: "https://github.com/CodeEditorLand/Land",

		Extensions: false,

		FileSystemProvider: false,

		IPC: false,

		Layer2: false,

		Layer4: false,

		PostHog: false,

		Telemetry: false,

		TierFileSystem: false,

		Update: false,

		"context.globalState": false,
	},

	"low-level-shim": {
		JavaScript: false,

		Layer: false,

		Level: false,

		Low: false,

		OTLP: false,

		PostHog: false,

		Production: false,

		Tier: false,
	},

	maintain: {
		Cache: false,

		Configuration: false,

		Core: false,

		Embedded: false,

		Full: false,

		Parallel: false,

		Task: false,

		effect: false,
	},

	mist: {
		Dependency: false,

		IPC: false,

		On: false,

		Tokio: false,

		Wire: false,
	},

	mountain: {
		Environment: false,

		PTY: false,

		SIGTERM: false,

		VSCODE_PARENT_PID: false,
	},

	"mountain-naming-conventions": {
		Buffer: false,

		Document: false,

		High: false,

		Low: false,

		Runtime: false,

		Standard: false,

		Update: false,
	},

	output: {
		ESBuild: "https://esbuild.github.io",

		Full: false,

		IPC: false,

		JavaScript: false,

		Native: false,

		Node: false,

		Process: false,

		Shared: false,
	},

	polyfills: {
		Cache: false,

		Electron: false,

		FileSystem: false,

		IPC: false,

		JavaScript: false,

		Layer: false,

		Node: false,

		None: false,

		Normal: false,

		OTLP: false,

		PostHog: false,

		Process: false,

		Production: false,

		Replace: false,

		Runtime: false,

		Skip: false,

		Standard: false,

		Tag: false,

		Workbench: false,

		"index.html": false,
	},

	"project-structure": {
		BundleLevel: false,

		Cargo: false,

		Core: false,

		Editor: "https://github.com/DependencyCodeEditorLand/Editor",

		Electron: false,

		High: false,

		HotReload: false,

		IPC: false,

		Low: false,

		Native: false,

		Normal: false,

		TierFileSystem: false,

		TierSCM: false,

		TierTerminal: false,

		Update: false,
	},

	quickstart: {
		Bundled: false,

		Editor: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current",

		Electron: false,

		Full: false,

		Profile: false,
	},

	rest: {
		Full: false,

		JavaScript: false,

		REST_CLASS_FIELDS:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L194",

		REST_DECORATORS:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L193",

		REST_ENTRY:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L187",

		REST_MINIFY:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L191",

		REST_OUT_DIR:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L188",

		REST_SOURCEMAP:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L190",

		REST_TARGET:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L189",

		REST_WORKERS:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md#L192",
	},

	sidecar: {
		Cache: false,

		Main: false,

		downloaded_at:
			"https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",

		sha256: "https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",
	},

	sky: {
		Electron: false,

		FileSystem: false,

		IPC: false,

		Profile: false,

		Proxy: false,

		v8: false,
	},

	troubleshooting: {
		Common: false,

		On: false,

		URI: false,
	},

	vine: {
		Core: false,

		Full: false,

		IPC: false,

		NetworkCocoonPort: false,

		NetworkMountainPort: false,

		OpenChannelFromCocoon:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		OpenChannelFromMountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		ProcessCocoonRequest:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		ProcessMountainRequest:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		RegisterInlineCompletionItemProvider:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		SendCocoonNotification:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		SendMountainNotification:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		Transport: false,
	},

	"vscode-api-coverage": {
		Batch: false,

		CustomEvent: false,

		Electron: false,

		High: false,

		IPC: false,

		Native: false,

		Node: false,

		PTY: false,

		PostHog: false,

		Process: false,

		Requires: false,

		Stub: false,

		Task: false,

		Track: false,

		Update: false,

		__activeDebugSession:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Debug/Namespace.ts",

		createDirectory:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostFileSystemConsumer.ts",

		effect: false,

		readDirectory:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostFileSystemConsumer.ts",

		register_debug_configuration_provider:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Debug/Namespace.ts",

		register_file_system_provider:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Providers.ts",

		register_notebook_serializer:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Providers.ts",

		register_text_document_content_provider:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Workspace/Namespace/Providers.ts",

		register_uri_handler:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Window/Namespace.ts",

		writeText:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostClipboard.ts",
	},

	"why-effect-ts": {
		Effect: false,

		JavaScript: false,

		LandWorkbenchRuntime:
			"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/DeepDive.md",

		Layer: false,

		Promise: false,

		Scope: false,
	},

	"why-grpc": {
		Full: false,

		IPC: false,

		Node: false,

		NodeDeferred:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs#L618",

		OpenChannelFromMountain:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L48",

		SendMountainNotification:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L37",

		Terminal: false,
	},

	"why-rust": {
		Electron: "https://www.electronjs.org",

		High: false,

		JavaScript: false,

		Low: false,

		Terminal: false,
	},

	"why-tauri": {
		Bundled: false,

		Electron: "https://www.electronjs.org",

		IPC: false,

		JavaScript: false,

		Main: false,

		None: false,

		Terminal: false,
	},

	"why-wasm": {
		Extensions: false,

		Full: false,

		Process: false,
	},

	wind: {
		Electron: "https://www.electronjs.org",

		IPC: false,

		PostHog: false,

		Synchronous: false,

		effect: "https://effect.website",
	},

	worker: {
		Bundle: false,

		JavaScript: false,

		Native: false,

		Requires: false,
	},

	"workflow-command-palette": {
		CommandsProvider: false,

		Document: false,

		IPC: false,

		IpcProvider:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/IPCProvider.rs#L16",

		JavaScript: false,

		Pick: false,

		Promise: false,

		Window: false,
	},

	"workflow-extension-tests": {
		Main: false,
	},

	"workflow-hover-provider": {
		DTO: false,

		Editor: false,

		IPC: false,

		URI: false,

		effect: false,
	},

	"workflow-open-file": {
		Editor: false,

		Effect: false,

		FileSystem:
			"https://github.com/CodeEditorLand/Wind/tree/Current/Source/FileSystem",

		IPC: false,

		TauriDiskFileSystemProvider: false,

		URI: false,

		effect: false,
	},

	"workflow-overview": {
		Editor: false,

		IPC: false,

		Native: false,

		PTY: false,

		Task: false,

		Workbench: false,

		node: false,
	},

	"workflow-save-participants": {
		URI: false,
	},

	"workflow-scm": {
		CustomEvent: false,

		DTO: false,

		"InstallScm.ts":
			"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts",

		On: false,

		ScmProvider:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Scm/Namespace.ts",

		URI: false,

		sendRequest: false,
	},

	"workflow-startup": {
		Builder: false,

		Configuration: false,

		Editor: false,

		Electron: "https://www.electronjs.org",

		Environment: false,

		ExtensionHostProvider: false,

		FullAppInitialization: false,

		IPC: false,

		InitDataLayer: false,

		Layer: false,

		LiveClipboardService: false,

		LiveDialogService: false,

		LiveEditorService: false,

		On: false,

		Runtime: false,

		Tokio: false,

		VSCODE_PARENT_PID: false,

		Workbench:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/browser/workbench.ts",

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

		"index.html": false,

		initExtensionHost: false,

		mainPid: false,

		"settings.json": false,
	},

	"workflow-tier-gated-implementation-selection": {
		Batched: false,

		Boot: false,

		Cache: false,

		Cargo: false,

		Delta: false,

		ESBuild: false,

		Eager: false,

		Embedded: false,

		Extend: false,

		Full: false,

		HandRolled: false,

		Hybrid: false,

		Hyper: false,

		IPC: false,

		IWTNMMMMMM: false,

		JavaScript: false,

		Layer2: false,

		Layer3: false,

		Layer4: false,

		Layer5: false,

		Lazy: false,

		Native: false,

		Node: false,

		NodeDeferred: false,

		Off: false,

		On: false,

		PTY: false,

		Parallel: false,

		Parallel16: false,

		Parallel4: false,

		Parallel8: false,

		Process: false,

		ProductFlavor: false,

		Ring: false,

		Runtime: false,

		Sequential: false,

		Shared: false,

		SharedMemory: false,

		Simple: false,

		Standard: false,

		Stub: false,

		Synchronous: false,

		TierAuth: false,

		TierClipboard: false,

		TierConfiguration: false,

		TierDebug: false,

		TierDiagnostics: false,

		TierDocumentMirror: false,

		TierEncryption: false,

		TierExtensionActivation: false,

		TierExtensionScan: false,

		TierFileSystem: false,

		TierFileWatcher: false,

		TierFindFiles: false,

		TierGlob: false,

		TierHTTPProxy: false,

		TierLanguageFeatures: false,

		TierLogger: false,

		TierModel: false,

		TierModuleCache: false,

		TierOpenExternal: false,

		TierRemoteProcedureCall: false,

		TierSCM: false,

		TierSearch: false,

		TierStorage: false,

		TierTasks: false,

		TierTelemetry: false,

		TierTerminal: false,

		TierWebSocket: false,

		Tokio: false,

		Update: false,

		Wire: false,

		__LandTiers: false,

		"build.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

		effect: false,

		globalEnv: false,

		"mod.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",
	},

	"workflow-user-data-sync": {
		Configuration: false,

		Effect: false,

		Extensions: false,

		IPC: false,

		Node: false,

		On: false,

		URI: false,

		globalState: false,

		"settings.json": false,
	},

	"workflow-webview": {
		DTO: false,

		IpcProvider: false,

		Webview: false,

		effect: false,
	},
};
