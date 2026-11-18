import type { DocSection } from "../../Dynamic/Interface/Content/Page/Doc.js";

import { Lexicon, TermId } from "../../../Content/More/Glossary.js";

import { RecordHeads } from "../../../Library/Index/Register.js";

/**
 * The lab switch: a record's door is resolved from the facts, and the facts name
 * a lab route for the parts the specimen sheet prints. A production build does not
 * hold that page, so the palette asks the build before it offers the door.
 */
import { Served } from "../../../Function/Configuration/Lab.mjs";

import { FrameSections } from "../../Layout/Frame/Data.js";

import type {
	PaletteEntry,
	PaletteRegister,
	PaletteRegisterGroup,
} from "./Type.js";

/**
 * The palette's register, built once on the server.
 *
 * ─── ONE SOURCE, TWO CONTROLS ───────────────────────────────────────────────
 *
 * The manual half is `DocSection[]` - the exact tree `BuildDocSidebar` hands the
 * rail. The palette does not read the collection a second way, because two
 * readers of one tree eventually disagree about it, and a reader who finds a page
 * in the palette and not in the rail (or the reverse) has been told the site is
 * two sites.
 *
 * The part half is `FrameSections` - the same ten the running head prints and the
 * frame rail indexes. The palette's `ROUTES` register and the margin rail are the
 * same list, so `/03` means one thing everywhere. Three reference surfaces and
 * the document's own index are appended beside the ten for the same reason: the
 * site serves them, no part holds them, and a page that is in neither the parts
 * nor the manual is a page with no door.
 *
 * ─── WHY AN ACTION IS A ROW ─────────────────────────────────────────────────
 *
 * `COPY ADDRESS` is real: it uses the same clipboard contract as every copy
 * control on the site. Nothing else is listed. A palette of commands that do not
 * exist is a mockup with a search field on it, and the one honest action is worth
 * more than six plausible ones.
 */
export const BuildPaletteRegister = (
	Sections: DocSection[],
): PaletteRegister => {
	const Routes: PaletteEntry[] = FrameSections.map((Section) => ({
		Id: `part-${Section.Key}`,
		Label: Section.Label,
		Href: Section.Href,
		Part: Section.Index,
		Kind: "route" as const,
	}));

	// The Rust API is a page the site serves and the collection does not hold, so
	// it is a route beside the ten parts rather than a leaf of the manual.
	Routes.push({
		Id: "part-rust",
		Label: "RUST API",
		Href: "/Doc/Rust",
		Part: "03",
		Kind: "route",
	});

	// The three reference surfaces, filed the same way and for the same reason:
	// the site serves them, the ten parts do not hold them, and a page that is in
	// neither the parts nor the manual is a page with no door. The `Part` is the
	// division the page belongs to in the frame's own register, not a new one -
	// the status board is the edition's state, the lexicon is reference matter,
	// and the comparison is the argument.
	Routes.push(
		{
			Id: "part-status",
			Label: "STATUS",
			Href: "/Status",
			Part: "02",
			Kind: "route",
		},

		{
			Id: "part-glossary",
			Label: "GLOSSARY",
			Href: "/Glossary",
			Part: "03",
			Kind: "route",
		},

		{
			Id: "part-compare",
			Label: "COMPARE",
			Href: "/Compare",
			Part: "01",
			Kind: "route",
		},
	);

	// The index itself, filed the same way: the site serves `/Contents` and no
	// part holds it. It is not an eleventh part - the rail prints it as a closing
	// row and the frame's extent stays ten - so it carries no series index and
	// the meta cell prints the address instead, the way a record row does. This
	// is what makes `contents` (or `/contents`, which is how the site writes a
	// route) a row in the palette rather than a page with no door.
	Routes.push({
		Id: "part-contents",
		Label: "CONTENTS",
		Href: "/Contents",
		Meta: "/Contents",
		Kind: "route",
	});

	const Doc: PaletteRegisterGroup[] = Sections.map((Section) => ({
		Id: `doc-${Section.Id}`,
		Label: Section.Label,
		Pages: (Section.Children ?? []).flatMap((Item) =>
			"Children" in Item
				? Item.Children.map((Leaf) => ({
						Id: `page-${Leaf.Id}`,
						Label: Leaf.Label,
						Href: `/Doc/${Leaf.Id}`,
						Section: Section.Label,
						Kind: "page" as const,
					}))
				: [
						{
							Id: `page-${Item.Id}`,
							Label: Item.Label,
							Href: `/Doc/${Item.Id}`,
							Section: Section.Label,
							Kind: "page" as const,
						},
					],
		),
	}));

	/**
	 * The record register.
	 *
	 * Every `# NAME_NN` head the tree prints, read from `Generated/Facts/
	 * Records.json` - the generator's own reading of the tree, not a list kept
	 * here. The row goes to the page that prints the head: a record is not an
	 * address, so the control offers the door rather than inventing a route for
	 * it. A head whose only route is dynamic (`/Doc/:Slug`) has no single address
	 * and is dropped, because a row that linked a literal `:Slug` would be a dead
	 * link dressed as a live one - the same rule `/Contents` applies to its
	 * archive. A lab route is dropped for the same reason one step earlier: the
	 * facts name `/Specimen` for the parts the specimen sheet prints, and a
	 * production build does not hold that page (`Function/Configuration/Lab.mjs`).
	 */
	const Records: PaletteEntry[] = RecordHeads.flatMap((Head) => {
		const Static = Head.Routes.filter(
			(Route) => !Route.includes(":") && Served(Route),
		);

		if (Static.length === 0) return [];

		// The shortest static route, with `/` winning outright: a record the home
		// page prints is most usefully reachable from the home page.
		const Href = Static.includes("/")
			? "/"
			: [...Static].sort(
					(A, B) => A.length - B.length || A.localeCompare(B),
				)[0]!;

		return [
			{
				Id: `record-${Head.Id.toLowerCase()}`,
				Label: Head.Id,
				Href,
				Section: Static.join(" "),
				Meta: Href,
				Kind: "record" as const,
			},
		];
	});

	/**
	 * The term register.
	 *
	 * The lexicon's own runs, anchored with the one function that owns a term's
	 * address (`TermId`), so a row and its definition cannot disagree. The meta
	 * cell prints the run, which is the disambiguator a word needs: `RECORD` is
	 * in `/THE DOCUMENT'S WORDS`, and `AIR` is in `/THE ELEMENTS`.
	 */
	const Terms: PaletteEntry[] = Lexicon.flatMap((Run) =>
		Run.terms.map((Entry) => ({
			Id: `term-${Run.key}-${Entry.term.toLowerCase()}`,
			Label: Entry.term,
			Href: `/Glossary#${TermId(Run.key, Entry.term)}`,
			Section: Run.label.replace(/^\//, ""),
			Meta: Run.label.replace(/^\//, ""),
			Kind: "term" as const,
		})),
	);

	const Actions: PaletteEntry[] = [
		{
			Id: "action-copy",
			Label: "COPY ADDRESS",
			Kind: "action",
		},
	];

	return { Routes, Records, Terms, Doc, Actions };
};

/**
 * The filter, re-exported from `Match.ts` so the island can reach it without
 * this module - which reads the tree - being pulled into the client bundle.
 */
export { FilterEntries, MatchEntry } from "./Match.js";
