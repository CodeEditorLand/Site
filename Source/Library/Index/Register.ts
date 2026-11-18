/**
 * Register - the reader for the generated facts behind `/Contents`.
 *
 * The index does not count anything itself. `Source/Script/Register.ts` walks the
 * tree and writes `Source/Generated/Facts/`, and this module is the one place
 * those files are read: it types them, resolves the few facts that live in a
 * registry rather than in a page, and hands the page rows it can print. A page
 * that imported the JSON directly would be a second place for the shapes to
 * drift, and a page that counted its own rows would be a second place for the
 * numbers to be wrong.
 *
 * Three resolutions happen here, and each one replaces a copy that would
 * otherwise be retyped:
 *
 * - **A contact route's name** comes from `Library/Contact/Request.ts`, the
 *   registry the hub and the shell already read. The thirteen request pages are
 *   one-line shells (`<ContactShell code="AMEND" />`), so their titles are not in
 *   the page - they are in the registry, and that is where this reads them.
 * - **A route's marker column** is the forms its import tree mounts, named
 *   shortly (`HERO + LEDGER`). `◎` is the grammar's fallback and it is what a
 *   route with no block prints - never an empty cell.
 * - **A declared module's reason** comes from `Content/Index/Declared.ts`. A
 *   module the generator reports and that table does not describe keeps the
 *   generator's own sentence, so a gap in the table is visible rather than
 *   silently dropped.
 */
import { Requests, type IncomeCode } from "../Contact/Request.js";

import RoutesJson from "../../Generated/Facts/Routes.json";

import FormsJson from "../../Generated/Facts/Forms.json";

import ModulesJson from "../../Generated/Facts/Modules.json";

import RecordsJson from "../../Generated/Facts/Records.json";

import {
	ChapterOf,
	GroupByChapter,
	type Chapter,
} from "../../Content/Index/Chapters.js";

import { DeclaredReason } from "../../Content/Index/Declared.js";

/** The fallback mark: no form here, and never a blank. */
export const Fallback = "◎";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** One route, as the generator measured it. */
export interface RouteFact {
	readonly Path: string;

	readonly File: string;

	readonly Title: string;

	readonly Forms: readonly string[];

	readonly Lines: number;

	readonly NoIndex: boolean;
}

/** The hand-kept registry, and where it disagrees with the build. */
export interface RegistryFact {
	readonly Declared: readonly string[];

	readonly Count: number;

	readonly Missing: readonly string[];

	readonly Extra: readonly string[];
}

/** One block, and the routes that mount it. */
export interface FormFact {
	readonly Block: string;

	readonly Routes: readonly string[];

	readonly Count: number;
}

/** One module outside the bulk trees. */
export interface ModuleFact {
	readonly Path: string;

	readonly Kind: string;

	readonly Carries: string;

	readonly Lines: number;

	readonly Readers: number;

	readonly ReadBy: readonly string[];

	readonly Reached: boolean;
}

/** The document's own extent, as the generator counted it. */
export interface TotalsFact {
	readonly Files: number;

	readonly Routes: number;

	readonly Documents: number;

	readonly Entries: number;

	readonly Elements: number;

	readonly Blocks: number;

	readonly Modules: number;

	readonly Read: number;

	readonly Declared: number;
}

export const Routes: readonly RouteFact[] = RoutesJson.Routes;

export const Registry: RegistryFact = RoutesJson.Registry;

export const Forms: readonly FormFact[] = FormsJson.Forms;

/**
 * One record head the tree prints: its `# NAME_NN`, the modules that print it,
 * and the routes whose import tree reaches them.
 *
 * This is the palette's `RECORDS` register and nothing else reads it - a record
 * head is not an address, so `/Contents` prints routes and this prints the heads
 * a reader can go to from one. A head with no static route is kept here and
 * dropped by the palette, because "no door" is a fact about the tree and the
 * control's job is to offer the doors that exist.
 */
export interface RecordFact {
	readonly Id: string;

	readonly File: string;

	readonly Files: readonly string[];

	readonly Routes: readonly string[];
}

export const RecordHeads: readonly RecordFact[] = RecordsJson.Records;

export const Modules: readonly ModuleFact[] = ModulesJson.Modules;

export const Totals: TotalsFact = ModulesJson.Totals;

/** The modules nothing imports, as the generator found them. */
export const Unread: readonly ModuleFact[] = ModulesJson.Orphans;

/** The short name a route's marker column prints for a block. */
const ShortName = (Block: string): string =>
	Block.replace(/^Record/, "").toUpperCase();

/**
 * A route's marker: the forms its tree mounts, joined by ` + `.
 *
 * The join is the claim grammar's own (`〈RUST + TAURI〉`), not a separator the
 * record layer invented - U+2001 is the site's one separator, and it is too wide
 * for a column that holds three short words.
 */
export const MarkerOf = (Route: RouteFact): string =>
	Route.Forms.length > 0 ? Route.Forms.map(ShortName).join(" + ") : Fallback;

/**
 * A route's destination.
 *
 * A dynamic route (`/Doc/:Slug`) has no single address to link, so the row links
 * the index it is filed under - the page that lists every one of its addresses.
 * A row that linked a literal `:Slug` would be a dead link dressed as a live one.
 */
export const HrefOf = (Path: string): string => {
	const Parameter = Path.indexOf(":");

	if (Parameter === -1) return Path;

	return Path.slice(0, Parameter).replace(/\/$/, "") || "/";
};

/** The site's name, as every page's metadata title ends with it. */
const SiteSuffix = /\s*[|\-]\s*Code Editor Land\s*$/;

/**
 * A route's one-line note: what the page says it is.
 *
 * Three sources, in order, and none of them invented here: the contact registry
 * for a request route, the page's own metadata title for everything else, and no
 * note at all when the page states its title only at render time (`/Doc/:Slug`
 * takes its title from the article it renders).
 */
export const NoteOf = (Route: RouteFact): string | undefined => {
	const Request = Route.Path.match(/^\/Contact\/([A-Z]+)$/);

	if (Request) {
		const Code = Request[1] as IncomeCode;

		const Entry = Requests[Code];

		if (Entry) return Entry.Title;
	}

	const Title = Route.Title.replace(SiteSuffix, "");

	return Title === Route.Path ? undefined : Title;
};

/** One chapter with its routes, in reading order. */
export interface RouteGroup {
	readonly chapter: Chapter;

	readonly routes: readonly RouteFact[];
}

export const RouteGroups: readonly RouteGroup[] = GroupByChapter(Routes);

/** The chapter a single route belongs to - the band's index strip reads this. */
export const ChapterFor = ChapterOf;

/**
 * The routes that answer on a form, as a count the matrix prints.
 *
 * `◎` for a type with no block of its own: a person and a licence are ledger
 * rows, and a zero would be a claim that the type is nothing rather than a claim
 * that it has no form.
 */
export const RouteCountFor = (Block?: string): string => {
	if (Block === undefined) return Fallback;

	const Form = Forms.find((Entry) => Entry.Block === Block);

	return Form ? String(Form.Count) : Fallback;
};

/** One fact-carrying module: a data module, a content table, a variable. */
const IsFactModule = (Module: ModuleFact): boolean =>
	Module.Readers > 0 &&
	(Module.Kind === "content" ||
		Module.Kind === "variable" ||
		(Module.Kind === "library" && /(?:^|\/)Data\.ts$/.test(Module.Path)));

/** The module's family, for the archive's group labels: `/CONTENT`, `/LIBRARY`. */
const FamilyOf = (Module: ModuleFact): string =>
	"/" + Module.Path.split("/")[0]!.toUpperCase();

/** One row of the register: the module, what it carries, and how many read it. */
export interface FactModuleRow {
	readonly Path: string;

	readonly Carries: string;

	readonly Readers: number;

	readonly Marker: string;

	readonly Group: string;
}

export const FactModules: readonly FactModuleRow[] = Modules.filter(
	IsFactModule,
).map((Module) => ({
	Path: Module.Path,
	Carries: Module.Carries,
	Readers: Module.Readers,
	Marker: `${Module.Readers}${Quad}${Module.Readers === 1 ? "READER" : "READERS"}`,
	Group: FamilyOf(Module),
}));

/** One declared module: what it carries and why it exists with no reader. */
export interface DeclaredRow {
	readonly Path: string;

	readonly Carries: string;

	readonly Reason: string;

	/** The reason came from `Content/Index/Declared.ts`; false means the generator's sentence. */
	readonly Explained: boolean;
}

export const DeclaredModules: readonly DeclaredRow[] = Unread.map((Module) => {
	const Declared = DeclaredReason(Module.Path);

	return {
		Path: Module.Path,
		Carries: Declared?.carries ?? Module.Carries,
		Reason: Declared?.reason ?? Module.Carries,
		Explained: Declared !== null,
	};
});
