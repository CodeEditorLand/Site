/**
 * Per-page overrides for the markdown pass (Phase 3c + 3g): keyed by
 * the .md basename (no extension) of the page being rendered. false ->
 * never link this term on this page; string -> pin this exact URL.
 * Consulted by the remark plugin (Source/Function/Markdown/CodeMentions.ts)
 * via the vfile path after a term resolves through the matcher.
 * Phase 3g: regenerated COMPLETELY by derive_defaults.py from
 * LINK-CONTEXT-REVIEW.md (every change-to row -> pin, every remove row
 * -> false) plus the verdict-derived pins (majority -> global default,
 * minority -> override).
 */

export const LinkIndexOverrides: Record<
	string,
	Record<string, string | false>
> = {
	ApplicationStartupHandshake: {
		Builder:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Request/Routing/Handler.ts#L450",

		Editor: false,

		Electron: "https://www.electronjs.org",

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		Layer: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Container.ts#L29",

		Process: false,

		Runtime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs#L534",

		Workspace: false,

		effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/Shim.rs#L25",

		mainPid: "https://github.com/CodeEditorLand/Mountain/tree/Current/",
	},

	BuildSystemDesign: {
		Any: false,

		Bundled:
			"https://github.com/DependencyCodeEditorLand/Tauri/tree/Current/crates/tauri-bundler/src/bundle/macos/dmg/mod.rs#L21",

		Cargo: false,

		Configuration: false,

		Core: "https://github.com/DependencyCodeEditorLand/SWC/tree/Current/crates/swc_ecma_minifier/benches/full/typescript.js#L141007",

		Electron: false,

		Embedded: false,

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		Git: false,

		IPC: false,

		JavaScript: false,

		Layer2: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Layer4: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Native: false,

		Node: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L75",

		PascalCase: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Production:
			"https://github.com/CodeEditorLand/Echo/tree/Current/Example/Sequence.rs#L24",

		Profile:
			"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Definition.rs#L243",

		"TargetConfig.ts":
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Configuration/ESBuild/Cocoon.ts",

		Tier: false,

		TierFileSystem: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Vite: false,

		macOS: false,

		npm: false,
	},

	EffectTypeScriptArchitecture: {
		Effect: false,

		"Effect.race": false,

		"Effect.timeout": false,

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

		__CEL_SERVICES__: false,
	},

	ExtensionHostDeepDive: {
		ApiFactory: false,

		CommandsProvider: false,

		Core: false,

		DTO: false,

		Dependency: false,

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		ExtensionHostHandler: false,

		ExtensionProvider: false,

		Extensions: false,

		IExtHostExtensions: false,

		IExtHostLanguages: false,

		LanguageProviderHandler: false,

		Layer: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Container.ts#L29",

		Main: false,

		MountainConnection:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

		Node: false,

		PTY: false,

		Promise: false,

		SIGINT: false,

		SIGTERM: false,

		Scope: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Archive/Cancellation.ts#L10",

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		URI: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization/InitExtensionHost.rs#L36",

		Webview:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L16",

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

		Linux: false,

		Node: false,

		Update: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Configuration/mod.rs#L9",

		Windows: false,

		macOS: false,
	},

	VSCodeCompatibility: {
		Core: false,

		Current: false,

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		Extensions: false,

		PTY: false,

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		Terminal: false,

		URI: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization/InitExtensionHost.rs#L36",

		Webview:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L16",
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

		Deserialize: false,

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

		SIGKILL: false,

		SendCocoonNotification:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L11",

		SendMountainNotification:
			"https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto#L37",

		Serialize: false,

		Spine: false,

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		TierSearch:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs#L84",

		TierStorage:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs#L93",

		TierTerminal:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/LandFixTier.rs#L75",

		Update: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Configuration/mod.rs#L9",

		Window: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L103",

		macOS: false,
	},

	architecture: {
		Clipboard: false,

		Core: false,

		Dialog: false,

		Disabled: false,

		ESBuild: "https://esbuild.github.io",

		Editor: false,

		Electron: false,

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		FileSystem: false,

		Full: false,

		HTTPProxy: false,

		High: false,

		Hyper: false,

		IPC: false,

		JSX: false,

		JavaScript:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/typescript-language-features/package.nls.json#L327",

		Layer: false,

		Layer2: false,

		Layer3: false,

		Layer4: false,

		Layer5: false,

		Linux: false,

		Low: false,

		MountainConnection:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Bootstrap.ts",

		Native: false,

		Node: false,

		NodeDeferred: false,

		Normal: false,

		PTY: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Process: false,

		RemoteProcedureCall: false,

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

		Vite: false,

		WASMtime: "https://wasmtime.dev",

		Window: false,

		Windows: false,

		aarch64: false,

		effect: false,

		macOS: false,

		npm: false,

		x86_64: false,
	},

	"build-matrix": {
		Boot: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Bundled:
			"https://github.com/DependencyCodeEditorLand/Tauri/tree/Current/crates/tauri-bundler/src/bundle/macos/dmg/mod.rs#L21",

		Cache: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/cache.ts#L13",

		Cargo: "https://github.com/DependencyCodeEditorLand/LandSWCDevtools/tree/Current/src/cargo/index.ts#L31",

		Core: "https://github.com/DependencyCodeEditorLand/SWC/tree/Current/crates/swc_ecma_minifier/benches/full/typescript.js#L141007",

		ESBuild: false,

		Embedded: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		Full: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Workspace/Contains/Activator.ts#L209",

		Future: false,

		IPC: false,

		Install:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L112",

		JavaScript:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/typescript-language-features/package.nls.json#L327",

		Layer2: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Layer4: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Node: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L75",

		None: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Production:
			"https://github.com/CodeEditorLand/Echo/tree/Current/Example/Sequence.rs#L24",

		Profile: false,

		Report: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/terminalContrib/chatAgentTools/browser/tools/consoleCompactor/consoleCompactor.ts#L41",

		Runtime: false,

		Shared: false,

		Standard: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Telemetry: false,

		Tier: false,

		TierFileSystem: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Transport: false,

		Vite: false,

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

		Git: false,

		JSX: false,

		JavaScript: false,

		Linux: false,

		Native: false,

		Node: false,

		None: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Production: false,

		Profile: false,

		Rollup: false,

		ServiceWorker: false,

		Vite: false,

		Windows: false,

		Workbench: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

		macOS: false,

		x86_64: false,
	},

	"ci-cd-pipeline": {
		Browser: false,

		Bundled: false,

		Core: false,

		ESBuild: "https://esbuild.github.io",

		Effect: false,

		Electron: false,

		Extensions: false,

		Git: false,

		JSX: false,

		JavaScript: false,

		Linux: false,

		Native: false,

		Node: false,

		None: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Production: false,

		Profile: false,

		Rollup: false,

		Vite: false,

		Windows: false,

		Workbench: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

		macOS: false,

		x86_64: false,
	},

	cocoon: {
		Browser: false,

		Configuration: false,

		Disabled: false,

		Effect: false,

		Electron: false,

		Full: false,

		Future: false,

		Git: false,

		IPC: false,

		Layer: false,

		Main: false,

		Native: false,

		Node: false,

		PTY: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Process: false,

		Profile: false,

		Runtime: false,

		Search: false,

		Task: false,

		TierAuth: "https://github.com/CodeEditorLand/Land/tree/Current/",

		TierDebug: "https://github.com/CodeEditorLand/Land/tree/Current/",

		TierIPC:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Utility/Tier.ts",

		TierLanguageFeatures:
			"https://github.com/CodeEditorLand/Land/tree/Current/",

		TierModel: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

		TierSCM: "https://github.com/CodeEditorLand/Land/tree/Current/",

		TierTasks: "https://github.com/CodeEditorLand/Land/tree/Current/",

		TierTerminal: "https://github.com/CodeEditorLand/Land/tree/Current/",

		TierWebSocket: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

		Track: false,

		Vite: false,

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

		macOS: false,

		readDirectory: false,

		textFile: false,
	},

	"cocoon-vscode-validation": {
		Clean: false,

		Dependency: false,

		Document: false,

		Effect: false,

		Extensions: false,

		Full: false,

		Git: false,

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

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		Global: false,

		PTY: false,

		PostHog: false,

		Requires:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Environment/mod.rs#L17",

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
		Boot: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Bundled:
			"https://github.com/DependencyCodeEditorLand/Tauri/tree/Current/crates/tauri-bundler/src/bundle/macos/dmg/mod.rs#L21",

		Cache: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/cache.ts#L13",

		Cargo: false,

		Clean: false,

		Core: "https://github.com/DependencyCodeEditorLand/SWC/tree/Current/crates/swc_ecma_minifier/benches/full/typescript.js#L141007",

		Dependency:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L9",

		Electron: false,

		Embedded: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Empty: false,

		Environment: false,

		Extend: "https://github.com/DependencyCodeEditorLand/SWC/tree/Current/crates/swc_ecma_transforms_module/src/module_decl_strip.rs#L603",

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		Full: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/Workspace/Contains/Activator.ts#L209",

		Global: false,

		Hyper: "https://github.com/CodeEditorLand/Land/tree/Current/",

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		Install:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L112",

		JavaScript:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/typescript-language-features/package.nls.json#L327",

		Layer2: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Layer4: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Layer5: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Linux: false,

		NODE_ENV: false,

		Native: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/mod.rs#L14",

		Node: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L75",

		Parallel:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/Binary/Command/Option.rs#L65",

		PascalCase: false,

		Pick: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/quickinput/browser/pickerQuickAccess.ts#L104",

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Production: false,

		Profile:
			"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Definition.rs#L243",

		Report: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/contrib/terminalContrib/chatAgentTools/browser/tools/consoleCompactor/consoleCompactor.ts#L41",

		Ring: "https://github.com/DependencyCodeEditorLand/SWC/tree/Current/crates/swc_ecma_minifier/tests/benches-full/echarts.js#L6810",

		Runtime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs#L534",

		Shared: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Client.rs#L37",

		SharedMemory: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Smoke: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Standard: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Terminal: false,

		TierFileSystem: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Vite: false,

		Window: false,

		Windows: false,

		"build.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

		effect: false,

		"index.astro":
			"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/EnvironmentVariables.md#L267",

		localStorage:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/node/agentHostCatalogSyncService.test.ts#L240",

		macOS: false,
	},

	contributing: {
		Current: false,

		Git: false,

		IPC: false,

		Linux: false,

		PascalCase: false,

		Smoke: false,

		TestClock: false,

		TestEnvironment: false,

		Windows: false,

		macOS: false,
	},

	coverage: {
		Core: false,

		Current: false,

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		Full: false,

		Git: false,

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

		PASSTHROUGH: false,

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
		Any: false,

		Buffer: false,

		Dependency:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L9",

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		Electron: false,

		Empty: false,

		Extensions: false,

		Full: false,

		High: false,

		IPC: false,

		Layer: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Container.ts#L29",

		Native: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/mod.rs#L14",

		Node: "https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L75",

		Process: false,

		Runtime: false,

		SIGTERM: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

		Task: false,

		URI: false,

		effect: false,

		globalState:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/test/common/event.test.ts#L782",

		macOS: false,

		npm: false,
	},

	"deep-dive-common": {
		Any: false,

		ApplicationRunTime: false,

		Arc: false,

		Cache: false,

		DTO: false,

		Effect: false,

		Full: false,

		Global: false,

		IDocumentService: false,

		IPC: false,

		Layer: false,

		MountainCommand: false,

		MountainConfiguration: false,

		MountainDocument: false,

		MountainFileSystem: false,

		MountainWorkspace: false,

		Parallel: false,

		PascalCase: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Requires:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Environment/mod.rs#L17",

		Runtime: false,

		Sequential: false,

		TCapability: false,

		async_trait: false,

		effect: false,

		file_creates: false,

		file_deletes: false,

		retry_backoff_ms: false,

		retry_count: false,

		shell_path: false,

		timeout_ms: false,
	},

	"deep-dive-echo": {
		ApplicationRunTime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RunTime/ApplicationRunTime/mod.rs",

		Batch: false,

		Cache: false,

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		Full: false,

		Future: false,

		High: false,

		Low: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Native: false,

		Normal: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		Worker: false,
	},

	"deep-dive-grove": {
		Cargo: false,

		Extensions: false,

		IPC: false,

		Main: false,

		Shared: false,

		"Source/main.rs":
			"https://github.com/CodeEditorLand/Grove/tree/Current/Source/main.rs",

		Spine: "https://github.com/CodeEditorLand/Grove/tree/Current/Source/Protocol/SpineConnection.rs",

		WASMtime: "https://wasmtime.dev",

		Windows: false,

		onCommand: false,

		wasm: false,
	},

	"deep-dive-maintain": {
		Configuration: false,

		Core: false,

		Full: false,

		PascalCase: false,
	},

	"deep-dive-mist": {
		DO: false,

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

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		Err: false,

		ExtensionTypeFilter: false,

		IDocumentService: false,

		IOPlatformUUID: false,

		IPC: false,

		Linux: false,

		MountainCommand: false,

		MountainConfiguration: false,

		MountainDocument: false,

		MountainFileSystem: false,

		MountainWorkspace: false,

		Native: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/mod.rs#L14",

		On: false,

		OnceLock: false,

		PTY: false,

		PascalCase: false,

		Process:
			"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Process.rs#L65",

		Report: false,

		RwLock: false,

		Shared: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Client.rs#L37",

		SystemTime: false,

		URI: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization/InitExtensionHost.rs#L36",

		"Vine.proto":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		Window: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L103",

		Windows: false,

		appSharedDataHome: false,

		beforeBundleCommand: false,

		"context.secrets":
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

		effect: false,

		join_all: false,

		languageModelsResource: false,

		macOS: false,

		mainPid: false,

		"mod.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",

		sharedDataFolderName: false,
	},

	"deep-dive-rest": {
		Configuration: false,

		JavaScript: false,

		Main: false,

		Parallel:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/Binary/Command/Option.rs#L65",

		Process: false,

		Worker: false,

		emitDecoratorMetadata: false,

		oxc_parser: false,
	},

	"deep-dive-sidecar": {
		Cache: false,

		Cargo: false,

		Git: false,

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

		NODE_ENV: false,

		PostHog:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/IsAllowed.rs#L16",

		Production: false,

		Shared: false,

		Task: false,

		Vite: false,

		manualChunks: false,

		onDidCollapse: false,

		onDidExpand: false,
	},

	"deep-dive-vine": {
		ActionRequest: false,

		BackgroundServices: false,

		Core: false,

		Disabled: false,

		IPC: false,

		OpenChannelFromCocoon:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		OpenChannelFromMountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		PATH: false,

		PerformAction: false,

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

		"Vine.proto":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		__textDocuments: false,

		__workspaceFolders: false,

		macOS: false,

		"mod.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs",

		provideInlayHints: false,

		tonic_build: false,
	},

	"deep-dive-wind": {
		Any: false,

		Bundle: false,

		CustomEvent: false,

		Dependency: false,

		Disabled: false,

		Effect: false,

		FromAsync: false,

		Full: false,

		Global: false,

		High: false,

		IPC: false,

		LandWorkbenchLayer: false,

		Layer: false,

		Low: false,

		MockClipboardLayer:
			"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md#L213",

		Native: false,

		Node: false,

		NodeDeferred: false,

		OptionalFromAsync: false,

		ServiceUpstream: false,

		Tag: false,

		TauriEmit: false,

		TierAuth: false,

		TierDebug: false,

		TierEncryption: false,

		TierLanguageFeatures: false,

		TierModel: false,

		TierNativeHost: false,

		TierOutputChannel: false,

		TierSCM: false,

		TierSearch: false,

		TierStorage: false,

		TierTasks: false,

		TierTerminal: false,

		TierTreeView: false,

		TierWebSocket: false,

		extensionHostStarter: false,

		localGit: false,

		localPty: false,

		nativeHost: false,

		npm: false,

		queryLocalFonts: false,

		textFile: false,
	},

	"deep-dive-worker": {
		Any: false,

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

		Git: false,

		Node: false,

		Skip: false,

		"build.rs":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/build.rs",

		node_modules: false,

		npm: false,
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

		Future: false,

		High: false,

		Low: false,

		Main: false,

		Normal: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Task/Priority.rs",

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		Windows: false,

		Worker: false,

		effect: false,

		macOS: false,
	},

	"extension-development": {
		Configuration: false,

		Current: false,

		Extensions: false,

		IPC: false,

		Install: false,

		Lodge: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L45",

		On: false,

		Secret: false,

		acceptInputCommand:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Scm/Namespace.ts#L531",

		activationEvents: false,

		debugServer: false,

		macOS: false,

		pipeTransport: false,
	},

	"filesystem-footprint": {
		Browser: false,

		Bundle: false,

		Bundled: false,

		Linux: false,

		PostHog: false,

		Profile:
			"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Definition.rs#L243",

		Update: false,

		Webview:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L16",

		Windows: false,

		distinctId: false,

		effect: false,

		extensionStorage: false,

		globalStorage: false,

		localStorage: false,

		macOS: false,

		read_dir: false,
	},

	"filesystem-footprint-cleanup": {
		Cleanup: false,

		Encapsulation: false,

		Linux: false,

		Normal: false,

		Secret: false,

		Webview: false,

		Windows: false,

		Workbench: false,

		macOS: false,
	},

	"filesystem-footprint-encapsulation": {
		Boot: false,

		Cache: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/cache.ts#L13",

		Cleanup: false,

		Dependency: false,

		Extend: false,

		Low: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/Utilities/PathExtraction.rs#L134",

		None: false,

		On: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/ESBuild.ts#L7",

		PostHog: false,

		Profile: false,

		Replace: false,

		Tier: false,

		Webview: false,

		Workbench: false,

		extensionStorage: "https://github.com/CodeEditorLand/Air/tree/Current/",

		localStorage:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/platform/agentHost/test/node/agentHostCatalogSyncService.test.ts#L240",

		macOS: false,
	},

	"filesystem-footprint-environment-variables": {
		AIR_LOG_DIR:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		AIR_LOG_FILE:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		AIR_LOG_JSON:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		APPDATA: false,

		Ask: false,

		Cap: false,

		Capture: false,

		Clean: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/ESBuild.ts#L3",

		Cleanup: false,

		Dependency:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L9",

		Effect: false,

		Electron:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L5",

		Extend: false,

		HOME: false,

		LAND_: false,

		LAND_SHELL_INTEGRATION_ACTIVE: false,

		LOCALAPPDATA: false,

		Level: "https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L11",

		Linux: false,

		Lodge: false,

		MountainDir: false,

		NODE_ENV: false,

		Node: false,

		NodeDeferred: false,

		None: false,

		Off: false,

		On: false,

		PascalCase: false,

		PostHog: false,

		Record: false,

		Render: false,

		Report: false,

		Smoke: false,

		TAURI_ENV_DEBUG: false,

		TMPDIR: false,

		Throttle: false,

		TierCommandEventBroadcast: false,

		USER: false,

		USERNAME: false,

		USERPROFILE: false,

		VSCODE_APP_ROOT: false,

		VSCODE_COCOON_GLOBAL_STORAGE:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Context.ts",

		Vite: false,

		Windows: false,

		XDG_CACHE_HOME: false,

		XDG_CONFIG_HOME: false,

		XDG_DATA_HOME: false,

		ZDOTDIR: false,

		effect: false,

		globalStorage: false,

		localStorage: false,

		macOS: false,
	},

	"filesystem-footprint-per-element": {
		AIR_LOG_DIR:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		AIR_LOG_FILE:
			"https://github.com/CodeEditorLand/Air/tree/Current/Source/Initialize/Configure/Log/ConfigureLog.rs",

		Batch: false,

		Cap: false,

		Capture: false,

		Clean: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/ESBuild.ts#L3",

		Cleanup: false,

		Dependency:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L9",

		ESBuild: false,

		Electron:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L5",

		Encapsulation: false,

		IPC: false,

		Level: "https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild.ts#L11",

		Linux: false,

		LocalStorageService: false,

		NODE_ENV: false,

		Node: false,

		PostHog: false,

		Report: false,

		"Service Worker": false,

		Smoke: false,

		TAURI_ENV_DEBUG: false,

		Throttle: false,

		Update: false,

		VSCODE_APP_ROOT: false,

		Webview: false,

		Windows: false,

		Workbench: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

		distinctId:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/Telemetry/DistinctId.rs",

		get_env: false,

		localStorage: false,

		macOS: false,

		"process.env": false,
	},

	"filesystem-footprint-platform-paths": {
		Bundled: false,

		Empty: false,

		FOLDERID_LocalAppData: false,

		FOLDERID_RoamingAppData: false,

		Linux: false,

		NSQuitAlwaysKeepsWindows: false,

		Process: false,

		Profile: false,

		Resources: false,

		ServiceWorker: false,

		Vite: false,

		Webview:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L16",

		Window: false,

		Windows: false,

		globalState: false,

		localStorage: false,

		macOS: false,
	},

	"filesystem-footprint-user-dotfile": {
		Cleanup: false,

		Effect: false,

		Encapsulation: false,

		Extend: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L46",

		Linux: false,

		Lodge: "https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L45",

		Node: false,

		None: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/event.ts#L51",

		VSCODE_COCOON_GLOBAL_STORAGE:
			"https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/FilesystemFootprint/EnvironmentVariables.md#L49",

		Windows: false,

		extensionStorage: false,

		globalStorage: false,

		macOS: false,
	},

	"getting-started": {
		Buffer: false,

		Download:
			"https://github.com/CodeEditorLand/SideCar/tree/Current/README.md",

		Editor: "https://github.com/DependencyCodeEditorLand/Editor",

		Electron: "https://www.electronjs.org",

		Full: false,

		Git: false,

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

		PATH: false,

		Profile: false,

		Rollup: false,

		TierFileSystem: false,

		TierFileWatcher: false,

		TierRemoteProcedureCall: false,

		Vite: false,

		Workbench: false,

		macOS: false,

		npm: false,
	},

	grove: {
		Cargo: false,

		Current: false,

		Full: false,

		IPC: false,

		JavaScript: false,

		Level: false,

		Main: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/mod.rs#L52",

		Process: false,

		Requires: false,

		Runtime: false,

		Shared: false,

		Spine: false,

		Transport: false,
	},

	installation: {
		Any: false,

		Current: false,

		Editor: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current",

		Electron: "https://www.electronjs.org",

		Git: false,

		Install: false,

		Linux: false,

		Node: false,

		None: false,

		Profile: false,

		Vite: false,

		Windows: false,

		macOS: false,

		npm: false,
	},

	introduction: {
		Core: false,

		Editor: false,

		Electron: "https://www.electronjs.org",

		Extensions: false,

		Full: false,

		Git: false,

		IPC: false,

		Linux: false,

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

		Windows: false,

		Workspace: false,

		macOS: false,
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
		Any: false,

		JavaScript: false,

		Layer: false,

		Level: false,

		Low: false,

		None: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/event.ts#L51",

		OTLP: false,

		PostHog: false,

		Production: false,

		Promise:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/extensions/vscode-colorize-perf-tests/test/colorize-fixtures/test-checker.ts#L42453",

		Replace:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalEnvCollection.rs#L86",

		Tier: false,

		Window: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L103",
	},

	maintain: {
		Cache: false,

		Configuration: false,

		Core: false,

		Embedded: false,

		Full: false,

		Parallel: false,

		PascalCase: false,

		Task: false,

		effect: false,
	},

	mist: {
		Dependency: false,

		IPC: false,

		NXDOMAIN: false,

		On: false,

		Tokio: false,

		Wire: false,
	},

	mountain: {
		Air: "https://github.com/CodeEditorLand/Air/tree/Current/Documentation/GitHub/Architecture.md",

		AirManagement: false,

		Cache: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/cache.ts#L13",

		Common: "https://github.com/CodeEditorLand/Common/tree/Current/Documentation/GitHub/Architecture.md",

		Echo: "https://github.com/CodeEditorLand/Echo/tree/Current/Documentation/GitHub/Architecture.md",

		Environment: false,

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		Install:
			"https://github.com/CodeEditorLand/Output/tree/Current/Source/Plugin/Polyfill/Workbench/Paint/Prime.ts#L112",

		Mist: "https://github.com/CodeEditorLand/Mist/tree/Current/Documentation/GitHub/Architecture.md",

		PATH: false,

		PTY: false,

		PerformAction: false,

		Process:
			"https://github.com/CodeEditorLand/Maintain/tree/Current/Source/Run/Process.rs#L65",

		SIGKILL: false,

		SIGTERM: false,

		Secret: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/mod.rs#L35",

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		VSCODE_PARENT_PID: false,

		Vine: "https://github.com/CodeEditorLand/Vine/tree/Current/Documentation/GitHub/Architecture.md",

		Window: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L103",

		get_clipboard: false,

		open_dialog: false,

		set_clipboard: false,

		set_configuration: false,

		write_terminal: false,
	},

	"mountain-naming-conventions": {
		Buffer: false,

		DTO: "https://github.com/CodeEditorLand/Common/tree/Current/Source/StatusBar/mod.rs#L19",

		Document: false,

		Global: false,

		High: false,

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		Low: false,

		PascalCase: false,

		Runtime: false,

		Standard: false,

		Update: false,

		snake_case: false,
	},

	output: {
		Cocoon: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md",

		ESBuild: "https://esbuild.github.io",

		Full: false,

		IPC: false,

		JavaScript: false,

		Native: false,

		Node: false,

		Process: false,

		Rest: "https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md",

		Shared: false,

		Sky: "https://github.com/CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md",

		Wind: "https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md",

		child_process: false,

		npm: false,
	},

	polyfills: {
		Cache: false,

		CustomEvent:
			"https://github.com/DependencyCodeEditorLand/SWC/tree/Current/crates/swc_ecma_minifier/tests/fixture/next/chakra/input.js#L387",

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
		Any: false,

		BundleLevel: false,

		Cargo: false,

		Core: false,

		Current: false,

		Editor: "https://github.com/DependencyCodeEditorLand/Editor",

		Electron: false,

		Git: false,

		High: false,

		HotReload: false,

		IPC: false,

		Low: false,

		Native: false,

		Normal: false,

		PascalCase: false,

		TierFileSystem: false,

		TierSCM: false,

		TierTerminal: false,

		Update: false,

		npm: false,
	},

	quickstart: {
		Bundled: false,

		Editor: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current",

		Electron: false,

		Full: false,

		Profile: false,

		Vite: false,

		macOS: false,

		npm: false,
	},

	rest: {
		Full: false,

		JSX: false,

		JavaScript: false,

		Output: "https://github.com/CodeEditorLand/Output/tree/Current/Documentation/GitHub/Architecture.md",

		Parallel:
			"https://github.com/CodeEditorLand/Rest/tree/Current/Source/Struct/Binary/Command/Option.rs#L65",

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

		oxc_allocator: false,

		oxc_ast: false,

		oxc_codegen: false,

		oxc_parser: false,

		oxc_semantic: false,

		oxc_span: false,

		oxc_transformer: false,
	},

	sidecar: {
		Cache: false,

		Main: false,

		Mist: "https://github.com/CodeEditorLand/Mist/tree/Current/Documentation/GitHub/Architecture.md",

		Mountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md",

		downloaded_at:
			"https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",

		sha256: "https://github.com/CodeEditorLand/SideCar/tree/Current/Cache.json",
	},

	sky: {
		Cocoon: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md",

		Electron: false,

		FileSystem: false,

		IPC: false,

		Main: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/mod.rs#L52",

		Mountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md",

		Output: "https://github.com/CodeEditorLand/Output/tree/Current/Documentation/GitHub/Architecture.md",

		Production:
			"https://github.com/CodeEditorLand/Echo/tree/Current/Example/Sequence.rs#L24",

		Profile: false,

		Proxy: false,

		Rollup: "https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro#L59",

		Shared: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Client.rs#L37",

		Vite: false,

		Wind: "https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md",

		Worker: "https://github.com/CodeEditorLand/Worker/tree/Current/Documentation/GitHub/Architecture.md",

		v8: false,
	},

	troubleshooting: {
		Cause: false,

		Common: false,

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		On: false,

		URI: false,

		Vite: false,

		macOS: false,
	},

	vine: {
		Air: "https://github.com/CodeEditorLand/Air/tree/Current/Documentation/GitHub/Architecture.md",

		CancelAction: false,

		Cocoon: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md",

		Core: false,

		Full: false,

		Grove: "https://github.com/CodeEditorLand/Grove/tree/Current/Documentation/GitHub/Architecture.md",

		IPC: false,

		Mountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md",

		NetworkAirPort: false,

		NetworkCocoonPort: false,

		NetworkMountainPort: false,

		OpenChannelFromCocoon:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		OpenChannelFromMountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",

		PerformAction: false,

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

		Shared: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Vine/Client.rs#L37",

		StreamActions: false,

		Transport: false,

		"Vine.proto":
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Proto/Vine.proto",
	},

	"vscode-api-coverage": {
		Batch: false,

		Current: false,

		CustomEvent: false,

		Electron: false,

		Git: false,

		High: false,

		IPC: false,

		Native: false,

		Node: false,

		PTY: false,

		PascalCase: false,

		PostHog: false,

		Process: false,

		Requires: false,

		Stub: false,

		Task: false,

		Track: false,

		Update: false,

		Window: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Command.ts#L103",

		__activeDebugSession:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Debug/Namespace.ts",

		child_process: false,

		createDirectory:
			"https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/workbench/api/common/extHostFileSystemConsumer.ts",

		createExtensionHostManager: false,

		effect: false,

		extHostRpcService: false,

		grep_searcher: false,

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
		AbortController: false,

		Effect: false,

		JavaScript: false,

		LandWorkbenchRuntime:
			"https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/DeepDive.md",

		Layer: false,

		Promise: false,

		Scope: false,

		acquireRelease: false,
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

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		JavaScript: false,

		Linux: false,

		Low: false,

		PTY: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

		Terminal: false,

		Tokio: "https://github.com/CodeEditorLand/Air/tree/Current/",

		Windows: false,

		macOS: false,
	},

	"why-tauri": {
		Bundled: false,

		Electron: "https://www.electronjs.org",

		IPC: false,

		JavaScript: false,

		Linux: false,

		Main: false,

		None: false,

		Terminal: false,

		Windows: false,

		macOS: false,

		nodeIntegration: false,

		showPreviousWindowTab: false,
	},

	"why-wasm": {
		Extensions: false,

		Full: false,

		Linux: false,

		Process: false,

		Windows: false,

		macOS: false,
	},

	wind: {
		Cause: false,

		Cocoon: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md",

		Electron: "https://www.electronjs.org",

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		IPC: false,

		Layer: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Container.ts#L29",

		Mountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Documentation/GitHub/Architecture.md",

		Output: "https://github.com/CodeEditorLand/Output/tree/Current/Documentation/GitHub/Architecture.md",

		PostHog: false,

		Sky: "https://github.com/CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md",

		Synchronous: false,

		URI: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/RPC/CocoonService/Initialization/InitExtensionHost.rs#L36",

		Vite: false,

		effect: "https://effect.website",

		get_clipboard: false,

		open_dialog: false,

		set_clipboard: false,

		set_configuration: false,

		write_terminal: false,
	},

	worker: {
		Bundle: false,

		Cache: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/cache.ts#L13",

		JavaScript: false,

		Main: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/mod.rs#L52",

		Native: false,

		None: "https://github.com/DependencyCodeEditorLand/Editor/tree/Current/src/vs/base/common/event.ts#L51",

		Requires: false,

		Runtime:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Binary/Main/AppLifecycle.rs#L534",

		ServiceWorker: "https://github.com/CodeEditorLand/Land/tree/Current/",
	},

	"workflow-command-palette": {
		CommandsProvider: false,

		Document: false,

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		ExecuteCommandLogic: false,

		IPC: false,

		IpcProvider:
			"https://github.com/CodeEditorLand/Common/tree/Current/Source/IPC/IPCProvider.rs#L16",

		JavaScript: false,

		Native: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/FileSystem/mod.rs#L14",

		Pick: false,

		Promise: false,

		Window: false,

		editBuilder: false,
	},

	"workflow-extension-tests": {
		Cleanup: false,

		Main: false,
	},

	"workflow-hover-provider": {
		DTO: false,

		Editor: false,

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		IPC: false,

		URI: false,

		effect: false,
	},

	"workflow-open-file": {
		DocumentContentCache: false,

		Editor: false,

		EditorGroupsService: false,

		Effect: false,

		FileSystem:
			"https://github.com/CodeEditorLand/Wind/tree/Current/Source/FileSystem",

		IPC: false,

		Layer: "https://github.com/CodeEditorLand/Common/tree/Current/Source/Container.ts#L29",

		TauriDiskFileSystemProvider: false,

		TextEditorPane: false,

		URI: false,

		effect: false,

		openEditorEffect: false,
	},

	"workflow-overview": {
		Editor: false,

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		Git: false,

		IPC: false,

		Native: false,

		PTY: false,

		Spine: "https://github.com/CodeEditorLand/Land/tree/Current/",

		Task: false,

		Vite: false,

		Workbench: false,

		node: false,
	},

	"workflow-save-participants": {
		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		URI: false,
	},

	"workflow-scm": {
		CustomEvent: false,

		DTO: false,

		Git: false,

		GitProvider: false,

		"InstallScm.ts":
			"https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts",

		On: false,

		ScmProvider:
			"https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Handler/VscodeAPI/Scm/Namespace.ts",

		URI: false,

		applyEdits: false,

		sendRequest: false,
	},

	"workflow-startup": {
		Builder: false,

		Configuration: false,

		Editor: false,

		Electron: "https://www.electronjs.org",

		Environment: false,

		ExtensionHostProvider: false,

		Extensions:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC/WindServiceHandlers/mod.rs#L20",

		FullAppInitialization: false,

		IPC: false,

		InitDataLayer: false,

		InitializeConfiguration: false,

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

		activatedExtension: false,

		beforeBundleCommand:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/tauri.conf.json",

		"index.html": false,

		initExtensionHost: false,

		join_all: false,

		mainPid: false,

		"settings.json": false,
	},

	"workflow-terminal": {
		Cocoon: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/",

		Effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L19",

		IPC: "https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/WebviewPanel/Webview/Implementation.ts#L23",

		Mountain:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/TerminalProvider.rs",

		PTY: "https://github.com/CodeEditorLand/Cocoon/tree/Current/",

		Task: "https://github.com/CodeEditorLand/Echo/tree/Current/Source/Library.rs#L55",

		Tokio: "https://github.com/CodeEditorLand/Air/tree/Current/",

		effect: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/Effect/CreateEffectForRequest/Shim.rs#L25",
	},

	"workflow-tier-gated-implementation-selection": {
		Any: false,

		Batched: false,

		Boot: false,

		Cache: false,

		Cargo: false,

		Delta: false,

		Disabled: false,

		ESBuild: false,

		Eager: false,

		Embedded: false,

		ExtHostTaskService: false,

		Extend: false,

		Full: false,

		HandRolled: false,

		Hybrid: false,

		Hyper: false,

		IF: false,

		IFTNMMMMMM: false,

		IN: false,

		INTNNNNNNN: false,

		IPC: false,

		IW: false,

		IWTAMMMMMM: false,

		IWTNMMMMMM: false,

		JavaScript: false,

		Layer2: false,

		Layer3: false,

		Layer4: false,

		Layer5: false,

		Lazy: false,

		MM: false,

		NN: false,

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

		PascalCase: false,

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

		TA: false,

		TN: false,

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

		TierNativeHost: false,

		TierOpenExternal: false,

		TierOutputChannel: false,

		TierRemoteProcedureCall: false,

		TierSCM: false,

		TierSearch: false,

		TierStorage: false,

		TierTasks: false,

		TierTelemetry: false,

		TierTerminal: false,

		TierTreeView: false,

		TierWebSocket: false,

		TierXValue: false,

		Tokio: false,

		Update: false,

		Vite: false,

		WebWorker: false,

		Webview:
			"https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Track/mod.rs#L16",

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

		TierAuth: "https://github.com/CodeEditorLand/Land/tree/Current/",

		URI: false,

		globalState: false,

		"settings.json": false,
	},

	"workflow-webview": {
		DTO: false,

		IpcProvider: false,

		TauriWebviewWindow: false,

		Webview: false,

		WebviewManagementService: false,

		WebviewPanelProvider: false,

		WebviewPanelShim: false,

		WebviewShim: false,

		WebviewStateDto: false,

		effect: false,

		localResourceRoots: false,
	},
};
