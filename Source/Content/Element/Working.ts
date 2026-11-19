/**
 * The working behind each element record - the facts a claim is checked against.
 *
 * A record card states what an element is and what it is called. It does not
 * state what the element is made of, how a call reaches it, what it needs to
 * run, where the claim is documented or what evidence the build carries for it.
 * Those six facts are the working, and they are one register per element with
 * the same six keys in the same order - which is what makes fifteen records
 * comparable rather than fifteen paragraphs.
 *
 * THE KEYS ARE THE SCHEMA, NOT A LABEL SET. `FORM`, `WRITTEN IN`, `BOUNDARY`,
 * `DEPENDS ON`, `MANUAL` and `EVIDENCE` answer what, on what, reached how, with
 * what, documented where and evidenced how. A key that only some elements could
 * answer would make the register a prose list with gaps; every one of the six is
 * answerable for all fifteen, and the answer is `UNAVAILABLE` when the tree does
 * not carry it.
 *
 * THE TRACE IS THE PATH THE CLAIM CAN BE CHECKED ALONG. Three files the
 * element's own manual names, in the order the manual names them, each with the
 * one thing it carries. It is not a build transcript and it is not invented
 * output: every path below is quoted from the element's manual page
 * (`Content/doc/deep-dive-<element>.md`, or the bare `output.md` where the manual
 * files the element under its own name) and every note is the file's own role, so
 * a reader can open the file and the manual and find both saying the same thing.
 *
 * EVIDENCE IS THE HONEST COLUMN. Seven of the fifteen elements have an
 * `Evidence/<Element>/manifest.yaml` in the build and none of those manifests
 * has a plate beside it yet (`status: placeholder`); the other eight have no
 * manifest at all. The register prints exactly that, per element, instead of a
 * path that would 404: `MANIFEST␁PLACEHOLDER` with `PLATE NOT IN BUILD`, or
 * `UNAVAILABLE` with `NO MANIFEST IN THE BUILD`. That is the partial state the
 * brief asks for, and it is the reason the row is printed rather than omitted.
 *
 * The separator is U+2001, the site's only separator. Nothing here is copy: it
 * is a fact table, and a fact table is data.
 */

/** One fact of the working: a `:`-less key, an ink value, an optional qualifier. */
export interface WorkingRow {
	/** `FORM`, `WRITTEN IN`, `BOUNDARY`, `DEPENDS ON`, `MANUAL`, `EVIDENCE`. */
	readonly Label: string;

	/** The fact itself, in the record grammar's upper case. */
	readonly Value: string;

	/** A qualifier printed under the value at caption weight, when the fact needs one. */
	readonly Note?: string;

	/** The value is a route or a path rather than prose. */
	readonly Code?: boolean;

	/** Where the fact leads, when it is a place the reader can open. */
	readonly Href?: string;
}

/** One step of the trace: a file the manual names, and the one thing it carries. */
export interface WorkingStep {
	/** `01`, `02`, `03` - printed verbatim. */
	readonly Index: string;

	/** The path, exactly as the manual writes it. */
	readonly Path: string;

	/** What the file carries, in one line. */
	readonly Note: string;
}

/** One element's working: six register rows and a three-step trace. */
export interface Working {
	readonly Register: readonly WorkingRow[];

	readonly Trace: readonly WorkingStep[];
}

/** The manifest the build carries, when it carries one. */
const Manifest = (Note: string): WorkingRow => ({
	Label: "EVIDENCE",
	Value: "MANIFEST\u2001PLACEHOLDER",
	Note,
});

/** No manifest and no plate: the honest partial, never a path that would 404. */
const NoManifest: WorkingRow = {
	Label: "EVIDENCE",

	Value: "UNAVAILABLE",

	Note: "NO MANIFEST IN THE BUILD",
};

/** One register row, spelled once so the six keys cannot drift per element. */
const Row = (
	Label: string,

	Value: string,

	Note?: string,

	Code?: boolean,
): WorkingRow => ({ Label, Value, Note, Code });

/** The manual route for an element: one page, in the manual's own grammar. */
const Manual = (Slug: string): WorkingRow => ({
	Label: "MANUAL",
	Value: `/DOC/${Slug}`,
	Code: true,
	Href: `/Doc/${Slug.toLowerCase()}`,
});

/**
 * The fifteen elements, in the architecture band's order.
 *
 * Keyed by the record's `Id`, which is also the locale key the band resolves its
 * copy against, so a card and its working cannot be matched to the wrong
 * element by position.
 */
export const ElementWorking: Readonly<Record<string, Working>> = {
	air: {
		Register: [
			Row("FORM", "BACKGROUND SERVICE"),

			Row("WRITTEN IN", "RUST"),

			Row("BOUNDARY", "LOOPBACK\u2001DAEMON"),

			Row("DEPENDS ON", "MOUNTAIN"),

			Manual("DEEP-DIVE-AIR"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{
				Index: "01",

				Path: "Source/Binary.rs",

				Note: "THE DAEMON BINARY",
			},

			{
				Index: "02",

				Path: "Source/HTTP/Client.rs",

				Note: "THE UPDATE CLIENT",
			},

			{
				Index: "03",

				Path: "Source/Library.rs",

				Note: "WHAT THE CRATE EXPORTS",
			},
		],
	},

	cocoon: {
		Register: [
			Row("FORM", "EXTENSION HOST\u2001SIDECAR"),

			Row("WRITTEN IN", "TYPESCRIPT\u2001EFFECT-TS"),

			Row("BOUNDARY", "VINE GRPC\u2001PORT 50052"),

			Row("DEPENDS ON", "MOUNTAIN\u2001VINE"),

			Manual("DEEP-DIVE-COCOON"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{
				Index: "01",

				Path: "Effect/Bootstrap.ts",

				Note: "THE BOOTSTRAP ORDER",
			},

			{
				Index: "02",

				Path: "Core/RequireInterceptor.ts",

				Note: "THE VSCODE MODULE PATCH",
			},

			{ Index: "03", Path: "Service/Ipc.ts", Note: "THE GRPC CLIENT" },
		],
	},

	common: {
		Register: [
			Row("FORM", "CONTRACT CRATE"),

			Row("WRITTEN IN", "RUST"),

			Row("BOUNDARY", "TRANSPORT AGNOSTIC"),

			Row("DEPENDS ON", "NONE", "NO TAURI\u2001NO GRPC"),

			Manual("DEEP-DIVE-COMMON"),

			NoManifest,
		],

		Trace: [
			{
				Index: "01",

				Path: "Error/CommonError.rs",

				Note: "THE ONE ERROR ENUM",
			},

			{ Index: "02", Path: "Vine.proto", Note: "THE WIRE CONTRACT" },

			{ Index: "03", Path: "Cargo.toml", Note: "ITS DEPENDENCIES" },
		],
	},

	echo: {
		Register: [
			Row("FORM", "TASK SCHEDULER"),

			Row("WRITTEN IN", "RUST"),

			Row("BOUNDARY", "IN-PROCESS"),

			Row("DEPENDS ON", "COMMON"),

			Manual("DEEP-DIVE-ECHO"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{
				Index: "01",

				Path: "Source/Scheduler/Scheduler.rs",

				Note: "THE SCHEDULER",
			},

			{
				Index: "02",

				Path: "Source/Queue/StealingQueue.rs",

				Note: "THE WORK-STEALING QUEUE",
			},

			{
				Index: "03",

				Path: "Source/Task/Priority.rs",

				Note: "THE THREE PRIORITIES",
			},
		],
	},

	grove: {
		Register: [
			Row("FORM", "WASM RUNTIME"),

			Row("WRITTEN IN", "RUST\u2001WASM"),

			Row("BOUNDARY", "CAPABILITY HOST"),

			Row("DEPENDS ON", "COMMON"),

			Manual("DEEP-DIVE-GROVE"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{
				Index: "01",

				Path: "Source/Host/Activation.rs",

				Note: "ACTIVATION",
			},

			{
				Index: "02",

				Path: "Source/Host/APIBridge.rs",

				Note: "THE API BRIDGE",
			},

			{
				Index: "03",

				Path: "Source/Host/Lifecycle.rs",

				Note: "LIFECYCLE",
			},
		],
	},

	maintain: {
		Register: [
			Row("FORM", "BUILD ORCHESTRATOR"),

			Row("WRITTEN IN", "RUST\u2001RHAI"),

			Row("BOUNDARY", "COMMAND LINE"),

			Row("DEPENDS ON", "CARGO\u2001TAURI"),

			Manual("DEEP-DIVE-MAINTAIN"),

			NoManifest,
		],

		Trace: [
			{ Index: "01", Path: "Debug/Build.sh", Note: "THE BUILD ENTRY" },

			{ Index: "02", Path: "Debug/Run.sh", Note: "THE RUN ENTRY" },

			{ Index: "03", Path: "Debug/All.sh", Note: "EVERY PROFILE" },
		],
	},

	mist: {
		Register: [
			Row("FORM", "DNS SANDBOX"),

			Row("WRITTEN IN", "RUST"),

			Row("BOUNDARY", "LOOPBACK\u2001SOCKET"),

			Row("DEPENDS ON", "MOUNTAIN"),

			Manual("DEEP-DIVE-MIST"),

			NoManifest,
		],

		Trace: [
			{ Index: "01", Path: "Source/Resolver.rs", Note: "THE RESOLVER" },

			{
				Index: "02",

				Path: "Source/Server.rs",

				Note: "THE LOOPBACK SERVER",
			},

			{
				Index: "03",

				Path: "Source/ForwardSecurity.rs",

				Note: "THE ALLOWLIST",
			},
		],
	},

	mountain: {
		Register: [
			Row("FORM", "NATIVE BACKEND"),

			Row("WRITTEN IN", "RUST"),

			Row("BOUNDARY", "VINE GRPC\u2001TAURI IPC"),

			Row("DEPENDS ON", "COMMON\u2001VINE"),

			Manual("DEEP-DIVE-MOUNTAIN"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{ Index: "01", Path: "Binary.rs", Note: "THE TAURI ENTRY" },

			{
				Index: "02",

				Path: "IPC/WindServiceHandlers/mod.rs",

				Note: "THE WIND IPC SURFACE",
			},

			{
				Index: "03",

				Path: "ApplicationState/Internal/ExtensionScanner/LoadFromCache.rs",

				Note: "THE EXTENSION SCAN",
			},
		],
	},

	output: {
		Register: [
			Row("FORM", "BUILD PIPELINE"),

			Row("WRITTEN IN", "TYPESCRIPT"),

			Row("BOUNDARY", "ESBUILD PLUGIN"),

			Row("DEPENDS ON", "REST"),

			Manual("OUTPUT"),

			NoManifest,
		],

		Trace: [
			{
				Index: "01",

				Path: "Source/ESBuild/Output.ts",

				Note: "THE ESBUILD OUTPUT",
			},

			{
				Index: "02",

				Path: "Source/Plugin/Apply.ts",

				Note: "THE APPLY PLUGIN",
			},

			{ Index: "03", Path: "Polyfill/Index.ts", Note: "THE POLYFILLS" },
		],
	},

	rest: {
		Register: [
			Row("FORM", "COMPILER PIPELINE"),

			Row("WRITTEN IN", "RUST\u2001OXC"),

			Row("BOUNDARY", "IN-PROCESS"),

			Row("DEPENDS ON", "NONE"),

			Manual("DEEP-DIVE-REST"),

			NoManifest,
		],

		Trace: [
			{
				Index: "01",

				Path: "Source/Fn/OXC/Compiler.rs",

				Note: "THE COMPILER",
			},

			{ Index: "02", Path: "Source/Fn/OXC/Codegen.rs", Note: "CODEGEN" },

			{ Index: "03", Path: "Source/Fn/Bundle.rs", Note: "THE BUNDLE" },
		],
	},

	sidecar: {
		Register: [
			Row("FORM", "PREBUILT BINARY"),

			Row("WRITTEN IN", "NODE.JS"),

			Row("BOUNDARY", "PROCESS\u2001SPAWN"),

			Row("DEPENDS ON", "COCOON"),

			Manual("DEEP-DIVE-SIDECAR"),

			NoManifest,
		],

		Trace: [
			{ Index: "01", Path: "Source/Download.rs", Note: "THE DOWNLOAD" },

			{
				Index: "02",

				Path: "SideCar/Cache.json",

				Note: "THE CHECKSUM CACHE",
			},

			{
				Index: "03",

				Path: "GetTauriTargetTriple.rs",

				Note: "THE TARGET TRIPLE",
			},
		],
	},

	sky: {
		Register: [
			Row("FORM", "UI LAYER"),

			Row("WRITTEN IN", "ASTRO"),

			Row("BOUNDARY", "TAURI WEBVIEW"),

			Row("DEPENDS ON", "WIND"),

			Manual("DEEP-DIVE-SKY"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{ Index: "01", Path: "Browser.astro", Note: "THE BROWSER ENTRY" },

			{ Index: "02", Path: "Electron.astro", Note: "THE ELECTRON SHIM" },

			{ Index: "03", Path: "InstallCommands.ts", Note: "THE COMMANDS" },
		],
	},

	vine: {
		Register: [
			Row("FORM", "IPC BACKBONE"),

			Row("WRITTEN IN", "PROTOBUF"),

			Row("BOUNDARY", "GRPC\u2001TONIC"),

			Row("DEPENDS ON", "COMMON"),

			Manual("DEEP-DIVE-VINE"),

			NoManifest,
		],

		Trace: [
			{
				Index: "01",

				Path: "Element/Mountain/Proto/Vine.proto",

				Note: "THE CANONICAL PROTO",
			},

			{
				Index: "02",

				Path: "Cocoon/Source/Services/gRPC/Server/Service.ts",

				Note: "THE SERVER",
			},

			{
				Index: "03",

				Path: "Cocoon/Source/Services/Mountain/gRPC/Client.ts",

				Note: "THE CLIENT",
			},
		],
	},

	wind: {
		Register: [
			Row("FORM", "SERVICE LAYER"),

			Row("WRITTEN IN", "TYPESCRIPT\u2001EFFECT-TS"),

			Row("BOUNDARY", "IN-PROCESS"),

			Row("DEPENDS ON", "COCOON"),

			Manual("DEEP-DIVE-WIND"),

			Manifest("PLATE NOT IN BUILD"),
		],

		Trace: [
			{
				Index: "01",

				Path: "Effect/Configuration.ts",

				Note: "CONFIGURATION",
			},

			{
				Index: "02",

				Path: "Effect/Editor.ts",

				Note: "THE EDITOR SERVICE",
			},

			{ Index: "03", Path: "Effect/Clipboard.ts", Note: "THE CLIPBOARD" },
		],
	},

	worker: {
		Register: [
			Row("FORM", "SERVICE WORKER"),

			Row("WRITTEN IN", "TYPESCRIPT"),

			Row("BOUNDARY", "HTTP\u2001CACHE"),

			Row("DEPENDS ON", "SKY"),

			Manual("DEEP-DIVE-WORKER"),

			NoManifest,
		],

		Trace: [
			{
				Index: "01",

				Path: "Source/Worker/Register.ts",

				Note: "REGISTRATION",
			},

			{
				Index: "02",

				Path: "Source/Worker/Policy.ts",

				Note: "THE CACHE POLICY",
			},

			{
				Index: "03",

				Path: "Source/Worker/CSS/Load.ts",

				Note: "CSS LOADING",
			},
		],
	},
};

/** One element's working, or the empty state's reason when the key is unknown. */
export const WorkingOf = (Id: string): Working | undefined =>
	ElementWorking[Id];
