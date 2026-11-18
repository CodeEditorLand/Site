/**
 * NotFound - the copy for the 404's plate and its adverse states.
 *
 * The page had one sentence and a record. A plate needs a name, a source, a state
 * and a proposition; the too-long arm needs a statement, a cause and a limit. Six
 * strings that only this route prints, kept here rather than in the template so
 * the page stays a composition.
 *
 * The rule every string keeps: it says what happened and what to do, and it never
 * apologises. A 404 that says "sorry" has told the reader how to feel instead of
 * what is true.
 */
import type { TFunction } from "i18next";

/** The 404's plate and its two composed states. */
export interface NotFoundSurface {
	/** The plate's channel and its trace field. */
	readonly plate: {
		readonly figure: string;
		readonly source: string;
		readonly state: string;
		readonly proposition: string;
		readonly mark: string;
		readonly note: string;
	};

	/** The `missing` arm: the target is gone, and this is what it was. */
	readonly missing: {
		readonly statement: string;
		readonly cause: string;
		readonly next: { readonly label: string; readonly href: string };
	};

	/** The `too-long` arm: a path that will not fit the plate's one line. */
	readonly tooLong: {
		readonly statement: string;
		readonly cause: string;
		readonly limit: string;
		readonly next: { readonly label: string; readonly href: string };
	};
}

/** Resolve the route's copy through the page's translator. */
export const NotFoundPage = (T: TFunction): NotFoundSurface => ({
	plate: {
		figure: T("layout.notFound.figure", {
			defaultValue: "THE PATH THAT WAS ASKED FOR",
		}),
		source: T("layout.notFound.source", { defaultValue: "REQUEST URL" }),
		state: "UNAVAILABLE",
		proposition: T("layout.notFound.proposition", {
			defaultValue:
				"No record is filed at this address, and no redirect covers it.",
		}),
		mark: "\u25ce",
		note: T("layout.notFound.note", { defaultValue: "REQUESTED PATH" }),
	},

	missing: {
		statement: T("layout.notFound.missing.statement", {
			defaultValue:
				"A record was requested at this address. The build emits no route here and the redirect table carries no entry for it.",
		}),
		cause: T("layout.notFound.missing.cause", {
			defaultValue:
				"The address is well formed; nothing was ever filed under it. A moved page would have left a redirect, and a renamed one a tombstone.",
		}),
		next: {
			label: T("layout.notFound.missing.next", {
				defaultValue: "OPEN THE INDEX",
			}),
			href: "/Contents",
		},
	},

	tooLong: {
		statement: T("layout.notFound.tooLong.statement", {
			defaultValue:
				"The requested path is longer than the plate prints on one line.",
		}),
		cause: T("layout.notFound.tooLong.cause", {
			defaultValue:
				"The plate wraps it and stays inside its field, so nothing is lost - only the line count changes.",
		}),
		limit: T("layout.notFound.tooLong.limit", {
			defaultValue: "ONE LINE AT THE L TIER",
		}),
		next: {
			label: T("layout.notFound.tooLong.next", {
				defaultValue: "BACK TO LAND",
			}),
			href: "/",
		},
	},
});
