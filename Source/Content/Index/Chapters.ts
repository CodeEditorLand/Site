/**
 * Chapters - how the document is divided, for the index's route register.
 *
 * A route list is only readable if it is filed. These eight chapters are the
 * divisions this site actually has - not a taxonomy invented for the index: each
 * one names a job a reader arrives with (decide whether the thing is real, learn
 * how it works, get it, act on an account, ask for something, read the terms),
 * and every route the build emits belongs to exactly one of them.
 *
 * Two rules this table keeps:
 *
 * - **The prefix is matched by segment, never by string.** `/Doc` claims
 *   `/Doc/Rust` and `/Doc/:Slug`, and would not claim a future `/Documentation`
 *   - which is why the matcher below compares whole segments.
 * - **The longest prefix wins.** `/Contact/Sale` is a front-desk page, not a
 *   back-matter one, because `/Contact` is longer than nothing it competes with;
 *   and `/Legal/Term` is back matter even though `/Legal` is also a route.
 *
 * The order of the list is the reading order of the index, not the alphabet:
 * a reader moves from the argument to the document to the edition to the
 * instruments, and only then to the front desk, the back matter and the traps.
 */

/** One division of the document. */
export interface Chapter {
	/** The chapter's name, uppercase, as the archive's group label prints it. */
	readonly label: string;

	/** One line: the job the reader arrives with, and what the chapter answers. */
	readonly answers: string;

	/** The route prefixes that belong here. `/Doc` claims `/Doc/Rust` by segment. */
	readonly prefixes: readonly string[];
}

/** The eight chapters, in reading order. */
export const Chapters: readonly Chapter[] = [
	{
		label: "THE ARGUMENT",

		answers:
			"What the editor is, on one page: the claim, the architecture, the platform, the road.",

		prefixes: ["/"],
	},

	{
		label: "THE DOCUMENT",

		answers:
			"How it works, in articles: the reference, the deep dives, the workflows, and the filed entries.",

		prefixes: ["/Doc", "/Blog", "/Glossary"],
	},

	{
		label: "THE EDITION",

		answers:
			"What can be had today, what is still being prepared, and what a build from source takes.",

		prefixes: ["/Download", "/Status"],
	},

	{
		label: "THE INSTRUMENTS",

		answers:
			"Where a reader acts on their own account: sign in, register, recover, verify, and the portal.",

		prefixes: ["/Portal", "/Dashboard", "/Account", "/OAuth", "/Verify"],
	},

	{
		label: "THE FRONT DESK",

		answers:
			"Where a reader asks for something: the hub and its fourteen request routes.",

		prefixes: ["/Contact"],
	},

	{
		label: "THE BACK MATTER",

		answers:
			"The licence, the terms, the privacy policy, and the way in for a contributor.",

		prefixes: ["/License", "/Contributing", "/Legal"],
	},

	{
		label: "THE TRAPS",

		answers:
			"Where a wrong address lands: a record that says so, and a trampoline that does not.",

		prefixes: ["/404", "/Visit"],
	},

	{
		label: "THE INDEX",

		answers:
			"This page: the document's own contents, derived from the tree rather than kept by hand.",

		prefixes: ["/Contents"],
	},
];

/**
 * The chapter a route belongs to.
 *
 * The root prefix is `/` and it is the shortest, so it is tested last: a route
 * matches the longest prefix that claims it, and only an unmatched route falls
 * through to the argument - which is where the home page itself lives.
 */
export const ChapterOf = (Path: string): Chapter => {
	let Best: Chapter | null = null;

	let Longest = -1;

	for (const Chapter of Chapters) {
		for (const Prefix of Chapter.prefixes) {
			const Claims =
				Prefix === "/"
					? Path === "/"
					: Path === Prefix || Path.startsWith(Prefix + "/");

			if (Claims && Prefix.length > Longest) {
				Longest = Prefix.length;

				Best = Chapter;
			}
		}
	}

	// Every route in the build is filed; an unfiled one would be a gap in this
	// table, and the argument chapter is the honest home for the home page.
	return Best ?? Chapters[0]!;
};

/** The chapters in reading order, with the routes that belong to each. */
export const GroupByChapter = <T extends { readonly Path: string }>(
	Routes: readonly T[],
): { chapter: Chapter; routes: T[] }[] =>
	Chapters.map((chapter) => ({
		chapter,
		routes: Routes.filter((Route) => ChapterOf(Route.Path) === chapter),
	})).filter((Group) => Group.routes.length > 0);
