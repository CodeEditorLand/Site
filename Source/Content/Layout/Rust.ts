/**
 * Rust - the API surface's workspace copy.
 *
 * The page was a crate grid over a frame. A workspace is the honest form: the
 * nine crates are destinations, the frame is the instrument, and what the frame
 * *is* - its source, its as-of, its failure modes - is a drawer the reader opens.
 *
 * The crate names, URLs and descriptions are NOT here: they are
 * `Component/Doc/Rust/Data.ts`'s, and the rail and the register both read them.
 * This module carries only the copy the surface was missing - the two gaps the
 * page never stated (the rustdoc's as-of is not recorded, and a crate with no
 * published site prints a tombstone rather than a dead link).
 */
import type { TFunction } from "i18next";

/** The Rust workspace's gaps and its drawer's copy. */
export interface RustSurface {
	/** The rail's register word and its closing destination. */
	readonly railLabel: string;

	readonly railFoot: { readonly label: string; readonly href: string };

	/** The two panes' heads. */
	readonly panes: {
		readonly index: { readonly mark: string; readonly label: string };

		readonly frame: { readonly mark: string; readonly label: string };
	};

	/** The drawer. */
	readonly drawer: {
		readonly label: string;

		readonly note: string;

		readonly statement: string;

		readonly source: string;
	};

	/** The `partial` state: the rustdoc's as-of is not recorded. */
	readonly partial: {
		readonly statement: string;

		readonly cause: string;

		readonly next: { readonly label: string; readonly href: string };
	};

	/** The `empty` state: a crate with no published site. */
	readonly empty: {
		readonly statement: string;

		readonly cause: string;

		readonly next: { readonly label: string; readonly href: string };
	};
}

/** Resolve the surface's copy through the page's translator. */
export const RustWorkspace = (T: TFunction): RustSurface => ({
	railLabel: T("layout.rust.rail", { defaultValue: "CRATES" }),
	railFoot: {
		label: T("layout.rust.railFoot", { defaultValue: "THE MANUAL" }),
		href: "/Doc",
	},

	panes: {
		index: {
			mark: "# REGISTER_01",
			label: T("layout.rust.pane.index", { defaultValue: "REGISTER" }),
		},
		frame: {
			mark: "# FRAME_01",
			label: T("layout.rust.pane.frame", { defaultValue: "FRAME" }),
		},
	},

	drawer: {
		label: T("layout.rust.drawer.label", {
			defaultValue: "WHAT THE FRAME IS",
		}),
		note: T("layout.rust.drawer.note", { defaultValue: "FOLDED" }),
		statement: T("layout.rust.drawer.statement", {
			defaultValue:
				"The frame is generated rustdoc output, served from each crate's own documentation host and framed here unchanged. It is not a summary this site wrote, and not styled by this site.",
		}),
		source: T("layout.rust.drawer.source", {
			defaultValue: "SOURCE: COMPONENT/DOC/RUST/DATA.TS",
		}),
	},

	partial: {
		statement: T("layout.rust.partial.statement", {
			defaultValue:
				"The frame carries no as-of date: the rustdoc build does not record when it was generated, so the page cannot say how current it is.",
		}),
		cause: T("layout.rust.partial.cause", {
			defaultValue:
				"AS OF is UNAVAILABLE rather than today's date. A date the page invented would be the one figure on this surface with no source.",
		}),
		next: {
			label: T("layout.rust.partial.next", {
				defaultValue: "READ THE CRATE SOURCE",
			}),
			href: "https://github.com/CodeEditorLand",
		},
	},

	empty: {
		statement: T("layout.rust.empty.statement", {
			defaultValue:
				"A crate with no published rustdoc site prints a tombstone in the register rather than a link.",
		}),
		cause: T("layout.rust.empty.cause", {
			defaultValue:
				"◎ TARGET GONE, with the crate's name and the host it would have had. A dead link is not a record; the tombstone is.",
		}),
		next: {
			label: T("layout.rust.empty.next", {
				defaultValue: "OPEN THE MANUAL",
			}),
			href: "/Doc",
		},
	},
});
