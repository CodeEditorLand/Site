/**
 * Declared - why a module nothing reads still exists.
 *
 * The register's rule is that a file is either doing something visible or saying
 * why it exists. This table is the second half: one sentence per module that has
 * no reader, stating what it carries and what it is waiting for. The index prints
 * it as `/THE DECLARED`, and the generator (`Source/Script/Register.ts`) is what
 * decides which modules are in it - this file only explains the ones it finds, so
 * a module that gains a reader leaves this table without anyone editing it.
 *
 * The sentences are written to be checkable. Each names the file, the line or the
 * mechanism that makes the claim true, because "legacy" is not a reason and
 * "unused" is not an explanation: the point of the band is that nothing in the
 * tree is unexplained, and an explanation that could describe any file explains
 * nothing.
 *
 * A module the generator reports and this table does not describe is printed with
 * its own first sentence instead. That is the additive law applied to a report: a
 * gap in this table is a gap, not a licence to drop the row.
 */

/** One module, and the reason it exists without a reader. */
export interface DeclaredModule {
	/** The module's path, relative to `Source/` - exactly as the register prints it. */
	readonly path: string;

	/** What it carries, in one clause. */
	readonly carries: string;

	/** Why it exists anyway. The claim the band exists to make. */
	readonly reason: string;
}

/** The modules the register reports, in the order the band prints them. */
export const DeclaredModules: readonly DeclaredModule[] = [
	{
		path: "content.config.ts",

		carries: "The framework's entry point for the two content collections.",

		reason: "Astro resolves this file by name, so nothing imports it - it is a door, not a module. It re-exports `Content/Config.ts`, which is where the collections are defined.",
	},

	{
		path: "Background.tsx",

		carries: "The React island that animates the canvas images.",

		reason: "The earlier twin of `Background.astro`. `Layout/Base.astro:4` mounts the `.astro` one; this is the implementation it replaced, kept as the reference for the animation rather than deleted.",
	},

	{
		path: "Footer.tsx",

		carries:
			"The pre-programme React footer: an icon list and a copyright line.",

		reason: "Superseded by `Component/Layout/Footer.astro`, which says so in its own header and now prints the record the site closes on. This file is the record of the footer the site had.",
	},

	{
		path: "Function/Configuration/ServiceWorker.ts",

		carries: "The build switch that would disable the service worker.",

		reason: "Nothing reads it: `Function/Route/Integration.ts:227` compiles `Function/Route/ServiceWorker.ts` unconditionally. The switch is declared and unwired - recorded here rather than quietly deleted, because wiring it is a build change, not a design one.",
	},

	{
		path: "Function/Route/ServiceWorker.ts",

		carries:
			"The service worker: PascalCase normalisation, the auth gate, and the asset caches.",

		reason: "Read by path, never by an import - `Integration.ts:227` esbuild-transforms this file and writes it to the output as `Worker.js`. Its reader count is zero because no module imports it; the build is what reads it.",
	},

	{
		path: "Function/Route/Redirect.ts",

		carries:
			"The layer-three fallback: fetch `RouteMap.json`, redirect a variant to its canonical.",

		reason: "Nothing mounts it. `Visit.astro` took over unknown paths at the edge, so the 404 no longer asks for the map - the capability is declared and unwired, and it is the reason a wrong address still lands on a record rather than a redirect.",
	},

	{
		path: "Function/Scroll/Layout.astro",

		carries:
			"The specimen host for `Function/Scroll/Code`: a scroll-driven pixel field around a code sample.",

		reason: "The fifteen-element wall replaced the specimen pages that mounted it, so the whole `Scroll/Code` chain now hangs off this one file. Kept as the only caller of that chain.",
	},

	{
		path: "Function/Utility/CN.ts",

		carries: "`clsx` plus `tailwind-merge`: the class-string merger.",

		reason: "Every class string in this tree is written whole, so nothing merges. The helper is the shape a component with conditional utilities would call, and it is here for that component rather than for one that exists.",
	},

	{
		path: "Library/API/Analytics.ts",

		carries:
			"The client's analytics adapter: `Track`, `TrackBatch`, and the event contract.",

		reason: "No island tracks an event yet. The adapter is the shape the first one will call, and it is the only place the event contract is written.",
	},

	{
		path: "Library/API/Download.ts",

		carries:
			"The client's downloads adapter: binaries, the version list, one download by identifier.",

		reason: "The Download page reads a build-time manifest instead of fetching, so nothing calls this. It is the reader the page will use when releases are published.",
	},

	{
		path: "Library/API/Status.ts",

		carries:
			"The client's status adapter, with a sixty-second in-memory cache.",

		reason: "The site prints its status from its own records, and a live probe would be a second source for the same fact. The adapter exists for the surface that needs a live reading; nothing needs one today.",
	},

	{
		path: "Library/Interface/PaginatedResponse.ts",

		carries:
			"The paginated arm of `APIResponse`: `total`, `page`, `limit`, `hasMore`.",

		reason: "`WorkerClient` writes those four fields inline at each call site, and its paginated responses carry `events` and `stats` rather than a bare array, so this type does not fit them yet. It is the type the client should converge on, recorded here rather than forced into a shape it does not describe.",
	},

	{
		path: "Script/Register.ts",

		carries:
			"This generator: the script that writes `Source/Generated/Facts/`.",

		reason: "Run by hand - `node Source/Script/Register.ts` - and never imported. A generator a page imported would run inside the build, which is the one thing it must not do.",
	},
];

/** The reason for a module, or `null` when this table does not describe it. */
export const DeclaredReason = (Path: string): DeclaredModule | null =>
	DeclaredModules.find((Module) => Module.path === Path) ?? null;
