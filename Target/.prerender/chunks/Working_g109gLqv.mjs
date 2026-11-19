// Source/Content/Element/Working.ts
/** The manifest the build carries, when it carries one. */
var Manifest = (Note) => ({
	Label: "EVIDENCE",
	Value: "MANIFEST PLACEHOLDER",
	Note
});
/** No manifest and no plate: the honest partial, never a path that would 404. */
var NoManifest = {
	Label: "EVIDENCE",
	Value: "UNAVAILABLE",
	Note: "NO MANIFEST IN THE BUILD"
};
/** One register row, spelled once so the six keys cannot drift per element. */
var Row = (Label, Value, Note, Code) => ({
	Label,
	Value,
	Note,
	Code
});
/** The manual route for an element: one page, in the manual's own grammar. */
var Manual = (Slug) => ({
	Label: "MANUAL",
	Value: `/DOC/${Slug}`,
	Code: true,
	Href: `/Doc/${Slug.toLowerCase()}`
});
/**
* The fifteen elements, in the architecture band's order.
*
* Keyed by the record's `Id`, which is also the locale key the band resolves its
* copy against, so a card and its working cannot be matched to the wrong
* element by position.
*/
var ElementWorking = {
	air: {
		Register: [
			Row("FORM", "BACKGROUND SERVICE"),
			Row("WRITTEN IN", "RUST"),
			Row("BOUNDARY", "LOOPBACK DAEMON"),
			Row("DEPENDS ON", "MOUNTAIN"),
			Manual("DEEP-DIVE-AIR"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Binary.rs",
				Note: "THE DAEMON BINARY"
			},
			{
				Index: "02",
				Path: "Source/HTTP/Client.rs",
				Note: "THE UPDATE CLIENT"
			},
			{
				Index: "03",
				Path: "Source/Library.rs",
				Note: "WHAT THE CRATE EXPORTS"
			}
		]
	},
	cocoon: {
		Register: [
			Row("FORM", "EXTENSION HOST SIDECAR"),
			Row("WRITTEN IN", "TYPESCRIPT EFFECT-TS"),
			Row("BOUNDARY", "VINE GRPC PORT 50052"),
			Row("DEPENDS ON", "MOUNTAIN VINE"),
			Manual("DEEP-DIVE-COCOON"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Effect/Bootstrap.ts",
				Note: "THE BOOTSTRAP ORDER"
			},
			{
				Index: "02",
				Path: "Core/RequireInterceptor.ts",
				Note: "THE VSCODE MODULE PATCH"
			},
			{
				Index: "03",
				Path: "Service/Ipc.ts",
				Note: "THE GRPC CLIENT"
			}
		]
	},
	common: {
		Register: [
			Row("FORM", "CONTRACT CRATE"),
			Row("WRITTEN IN", "RUST"),
			Row("BOUNDARY", "TRANSPORT AGNOSTIC"),
			Row("DEPENDS ON", "NONE", "NO TAURI NO GRPC"),
			Manual("DEEP-DIVE-COMMON"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Error/CommonError.rs",
				Note: "THE ONE ERROR ENUM"
			},
			{
				Index: "02",
				Path: "Vine.proto",
				Note: "THE WIRE CONTRACT"
			},
			{
				Index: "03",
				Path: "Cargo.toml",
				Note: "ITS DEPENDENCIES"
			}
		]
	},
	echo: {
		Register: [
			Row("FORM", "TASK SCHEDULER"),
			Row("WRITTEN IN", "RUST"),
			Row("BOUNDARY", "IN-PROCESS"),
			Row("DEPENDS ON", "COMMON"),
			Manual("DEEP-DIVE-ECHO"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Scheduler/Scheduler.rs",
				Note: "THE SCHEDULER"
			},
			{
				Index: "02",
				Path: "Source/Queue/StealingQueue.rs",
				Note: "THE WORK-STEALING QUEUE"
			},
			{
				Index: "03",
				Path: "Source/Task/Priority.rs",
				Note: "THE THREE PRIORITIES"
			}
		]
	},
	grove: {
		Register: [
			Row("FORM", "WASM RUNTIME"),
			Row("WRITTEN IN", "RUST WASM"),
			Row("BOUNDARY", "CAPABILITY HOST"),
			Row("DEPENDS ON", "COMMON"),
			Manual("DEEP-DIVE-GROVE"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Host/Activation.rs",
				Note: "ACTIVATION"
			},
			{
				Index: "02",
				Path: "Source/Host/APIBridge.rs",
				Note: "THE API BRIDGE"
			},
			{
				Index: "03",
				Path: "Source/Host/Lifecycle.rs",
				Note: "LIFECYCLE"
			}
		]
	},
	maintain: {
		Register: [
			Row("FORM", "BUILD ORCHESTRATOR"),
			Row("WRITTEN IN", "RUST RHAI"),
			Row("BOUNDARY", "COMMAND LINE"),
			Row("DEPENDS ON", "CARGO TAURI"),
			Manual("DEEP-DIVE-MAINTAIN"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Debug/Build.sh",
				Note: "THE BUILD ENTRY"
			},
			{
				Index: "02",
				Path: "Debug/Run.sh",
				Note: "THE RUN ENTRY"
			},
			{
				Index: "03",
				Path: "Debug/All.sh",
				Note: "EVERY PROFILE"
			}
		]
	},
	mist: {
		Register: [
			Row("FORM", "DNS SANDBOX"),
			Row("WRITTEN IN", "RUST"),
			Row("BOUNDARY", "LOOPBACK SOCKET"),
			Row("DEPENDS ON", "MOUNTAIN"),
			Manual("DEEP-DIVE-MIST"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Resolver.rs",
				Note: "THE RESOLVER"
			},
			{
				Index: "02",
				Path: "Source/Server.rs",
				Note: "THE LOOPBACK SERVER"
			},
			{
				Index: "03",
				Path: "Source/ForwardSecurity.rs",
				Note: "THE ALLOWLIST"
			}
		]
	},
	mountain: {
		Register: [
			Row("FORM", "NATIVE BACKEND"),
			Row("WRITTEN IN", "RUST"),
			Row("BOUNDARY", "VINE GRPC TAURI IPC"),
			Row("DEPENDS ON", "COMMON VINE"),
			Manual("DEEP-DIVE-MOUNTAIN"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Binary.rs",
				Note: "THE TAURI ENTRY"
			},
			{
				Index: "02",
				Path: "IPC/WindServiceHandlers/mod.rs",
				Note: "THE WIND IPC SURFACE"
			},
			{
				Index: "03",
				Path: "ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",
				Note: "THE EXTENSION SCAN"
			}
		]
	},
	output: {
		Register: [
			Row("FORM", "BUILD PIPELINE"),
			Row("WRITTEN IN", "TYPESCRIPT"),
			Row("BOUNDARY", "ESBUILD PLUGIN"),
			Row("DEPENDS ON", "REST"),
			Manual("OUTPUT"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/ESBuild/Output.ts",
				Note: "THE ESBUILD OUTPUT"
			},
			{
				Index: "02",
				Path: "Source/Plugin/Apply.ts",
				Note: "THE APPLY PLUGIN"
			},
			{
				Index: "03",
				Path: "Polyfill/Index.ts",
				Note: "THE POLYFILLS"
			}
		]
	},
	rest: {
		Register: [
			Row("FORM", "COMPILER PIPELINE"),
			Row("WRITTEN IN", "RUST OXC"),
			Row("BOUNDARY", "IN-PROCESS"),
			Row("DEPENDS ON", "NONE"),
			Manual("DEEP-DIVE-REST"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Fn/OXC/Compiler.rs",
				Note: "THE COMPILER"
			},
			{
				Index: "02",
				Path: "Source/Fn/OXC/Codegen.rs",
				Note: "CODEGEN"
			},
			{
				Index: "03",
				Path: "Source/Fn/Bundle.rs",
				Note: "THE BUNDLE"
			}
		]
	},
	sidecar: {
		Register: [
			Row("FORM", "PREBUILT BINARY"),
			Row("WRITTEN IN", "NODE.JS"),
			Row("BOUNDARY", "PROCESS SPAWN"),
			Row("DEPENDS ON", "COCOON"),
			Manual("DEEP-DIVE-SIDECAR"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Download.rs",
				Note: "THE DOWNLOAD"
			},
			{
				Index: "02",
				Path: "SideCar/Cache.json",
				Note: "THE CHECKSUM CACHE"
			},
			{
				Index: "03",
				Path: "GetTauriTargetTriple.rs",
				Note: "THE TARGET TRIPLE"
			}
		]
	},
	sky: {
		Register: [
			Row("FORM", "UI LAYER"),
			Row("WRITTEN IN", "ASTRO"),
			Row("BOUNDARY", "TAURI WEBVIEW"),
			Row("DEPENDS ON", "WIND"),
			Manual("DEEP-DIVE-SKY"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Browser.astro",
				Note: "THE BROWSER ENTRY"
			},
			{
				Index: "02",
				Path: "Electron.astro",
				Note: "THE ELECTRON SHIM"
			},
			{
				Index: "03",
				Path: "InstallCommands.ts",
				Note: "THE COMMANDS"
			}
		]
	},
	vine: {
		Register: [
			Row("FORM", "IPC BACKBONE"),
			Row("WRITTEN IN", "PROTOBUF"),
			Row("BOUNDARY", "GRPC TONIC"),
			Row("DEPENDS ON", "COMMON"),
			Manual("DEEP-DIVE-VINE"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Element/Mountain/Proto/Vine.proto",
				Note: "THE CANONICAL PROTO"
			},
			{
				Index: "02",
				Path: "Cocoon/Source/Services/gRPC/Server/Service.ts",
				Note: "THE SERVER"
			},
			{
				Index: "03",
				Path: "Cocoon/Source/Services/Mountain/gRPC/Client.ts",
				Note: "THE CLIENT"
			}
		]
	},
	wind: {
		Register: [
			Row("FORM", "SERVICE LAYER"),
			Row("WRITTEN IN", "TYPESCRIPT EFFECT-TS"),
			Row("BOUNDARY", "IN-PROCESS"),
			Row("DEPENDS ON", "COCOON"),
			Manual("DEEP-DIVE-WIND"),
			Manifest("PLATE NOT IN BUILD")
		],
		Trace: [
			{
				Index: "01",
				Path: "Effect/Configuration.ts",
				Note: "CONFIGURATION"
			},
			{
				Index: "02",
				Path: "Effect/Editor.ts",
				Note: "THE EDITOR SERVICE"
			},
			{
				Index: "03",
				Path: "Effect/Clipboard.ts",
				Note: "THE CLIPBOARD"
			}
		]
	},
	worker: {
		Register: [
			Row("FORM", "SERVICE WORKER"),
			Row("WRITTEN IN", "TYPESCRIPT"),
			Row("BOUNDARY", "HTTP CACHE"),
			Row("DEPENDS ON", "SKY"),
			Manual("DEEP-DIVE-WORKER"),
			NoManifest
		],
		Trace: [
			{
				Index: "01",
				Path: "Source/Worker/Register.ts",
				Note: "REGISTRATION"
			},
			{
				Index: "02",
				Path: "Source/Worker/Policy.ts",
				Note: "THE CACHE POLICY"
			},
			{
				Index: "03",
				Path: "Source/Worker/CSS/Load.ts",
				Note: "CSS LOADING"
			}
		]
	}
};
/** One element's working, or the empty state's reason when the key is unknown. */
var WorkingOf = (Id) => ElementWorking[Id];
export { WorkingOf as n, ElementWorking as t };
