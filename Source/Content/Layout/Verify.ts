/**
 * Verify - the verification route, as an audit.
 *
 * The route used to be a card and a state word. An audit is the honest form for
 * it: a link is checked against a set of claims, the claims are read across the
 * states the link can be in, and the commands that make the check repeatable are
 * printed beside it.
 *
 * Four things live here, and the page composes them:
 *
 * - `Scope` - the facts that bound the check (what record, which route, what
 *   produced the link, how long the window is). The audit's ledger column.
 * - `Matrix` - the five states the link can be in, read across three questions.
 *   The audit itself. Every row is a branch the route's own state machine has,
 *   so the matrix cannot describe a state the page does not print.
 * - `Well` - the route's query contract, as a command well. The audit is
 *   repeatable because the reader can see what the link is made of.
 * - `Adverse` - the three ways the check can fail, each stated in the STATUS
 *   vocabulary with the next step. The page is prerendered, so it cannot know at
 *   build time which one a reader will meet - which is exactly why they are
 *   printed as a register rather than guessed at.
 *
 * Nothing here claims an implementation detail the tree does not carry: the
 * token, its exchange and its expiry belong to the provider, and the copy says
 * so instead of inventing a digest or a signature the site never computes.
 */
import type { TFunction } from "i18next";

import type { MatrixColumn, LedgerRow } from "../../Component/Record/Type.js";

/** One row of the audit matrix: the label, then one cell per column. */
export interface AuditRow {
	readonly label: string;
	readonly cells: readonly string[];
}

/** The audit's four parts, resolved. */
export interface VerifySurface {
	/** The audit's ledger column: the facts that bound the check. */
	readonly scope: readonly LedgerRow[];

	/** The register line above the scope ledger. */
	readonly scopeRegister: string;

	/** The audit's columns. */
	readonly columns: readonly MatrixColumn[];

	/** The audit's rows: the link's five states, read across the columns. */
	readonly rows: readonly AuditRow[];

	/** The matrix's provenance line. */
	readonly caption: string;

	/** The query contract, as a well. */
	readonly well: {
		readonly label: string;
		readonly language: string;
		readonly lines: readonly string[];
		readonly source: string;
	};

	/** The three ways the check can fail. */
	readonly adverse: {
		readonly error: {
			readonly statement: string;
			readonly cause: string;
			readonly next: { readonly label: string; readonly href: string };
		};
		readonly stale: {
			readonly statement: string;
			readonly cause: string;
			readonly next: { readonly label: string; readonly href: string };
		};
		readonly denied: {
			readonly statement: string;
			readonly cause: string;
			readonly next: { readonly label: string; readonly href: string };
		};
	};
}

/** Resolve the route's audit through the page's translator. */
export const VerifyAudit = (
	T: TFunction,
	Declarations: readonly { key: string; value: string }[],
): VerifySurface => ({
	scopeRegister: "CHECK",

	scope: [
		...Declarations.map((Row) => ({
			key: `${Row.key}:`,
			value: Row.value,
		})),
		{
			key: "WINDOW:",
			value: T("layout.verify.window", { defaultValue: "24 HOURS" }),
		},
		{
			key: "PRODUCED BY:",
			value: T("layout.verify.producer", { defaultValue: "AUTH0" }),
		},
	],

	columns: [
		{ label: T("layout.verify.column.state", { defaultValue: "STATE" }) },
		{
			label: T("layout.verify.column.means", {
				defaultValue: "WHAT IT MEANS",
			}),
		},
		{
			label: T("layout.verify.column.reader", {
				defaultValue: "WHAT THE READER DOES",
			}),
		},
	],

	rows: [
		{
			label: T("layout.verify.row.pending", { defaultValue: "PENDING" }),
			cells: [
				T("layout.verify.pending.means", {
					defaultValue: "A link was sent and has not been opened.",
				}),
				T("layout.verify.pending.reader", {
					defaultValue: "Open the link in the inbox.",
				}),
			],
		},
		{
			label: T("layout.verify.row.verifying", {
				defaultValue: "VERIFYING",
			}),
			cells: [
				T("layout.verify.verifying.means", {
					defaultValue:
						"The link carries a token and the card exchanges it.",
				}),
				T("layout.verify.verifying.reader", {
					defaultValue: "Nothing - the exchange runs on open.",
				}),
			],
		},
		{
			label: T("layout.verify.row.verified", {
				defaultValue: "VERIFIED",
			}),
			cells: [
				T("layout.verify.verified.means", {
					defaultValue: "The address is confirmed on the account.",
				}),
				T("layout.verify.verified.reader", {
					defaultValue: "Continue to the dashboard.",
				}),
			],
		},
		{
			label: T("layout.verify.row.expired", { defaultValue: "EXPIRED" }),
			cells: [
				T("layout.verify.expired.means", {
					defaultValue:
						"The window closed before the link was opened.",
				}),
				T("layout.verify.expired.reader", {
					defaultValue: "Request a new link from the card.",
				}),
			],
		},
		{
			label: T("layout.verify.row.failed", { defaultValue: "FAILED" }),
			cells: [
				T("layout.verify.failed.means", {
					defaultValue: "The provider rejected the token.",
				}),
				T("layout.verify.failed.reader", {
					defaultValue: "Request a new link from the card.",
				}),
			],
		},
	],

	caption: T("layout.verify.caption", {
		defaultValue:
			"Five states, read from the route's own state machine. No token, signature or digest is claimed here: the exchange belongs to the provider.",
	}),

	well: {
		label: T("layout.verify.well.label", { defaultValue: "THE LINK" }),
		language: "http",
		lines: [
			"GET /Verify                    -> PENDING",
			"GET /Verify?token=<token>      -> VERIFYING",
			"GET /Verify?reason=expired     -> EXPIRED",
			"GET /Verify?reason=failed      -> FAILED",
		],
		source: "SOURCE: SOURCE/PAGES/VERIFY.ASTRO",
	},

	adverse: {
		error: {
			statement: T("layout.verify.error.statement", {
				defaultValue:
					"The exchange reached the provider and came back rejected, so the token was never accepted.",
			}),
			cause: T("layout.verify.error.cause", {
				defaultValue:
					"An expired or already-used link, or a provider that could not read the request. The card names which.",
			}),
			next: {
				label: T("layout.verify.error.next", {
					defaultValue: "REQUEST A NEW LINK",
				}),
				href: "/Account/SignIn",
			},
		},
		stale: {
			statement: T("layout.verify.stale.statement", {
				defaultValue:
					"The link was issued inside a 24-hour window and the window has closed.",
			}),
			cause: T("layout.verify.stale.cause", {
				defaultValue:
					"AGE: PAST THE WINDOW. The address is unchanged and unverified; nothing was lost but the link.",
			}),
			next: {
				label: T("layout.verify.stale.next", {
					defaultValue: "ISSUE ANOTHER LINK",
				}),
				href: "/Account/SignIn",
			},
		},
		denied: {
			statement: T("layout.verify.denied.statement", {
				defaultValue:
					"This surface confirms an address on an account, so it is only readable with a session that owns one.",
			}),
			cause: T("layout.verify.denied.cause", {
				defaultValue:
					"Signed out. The route prints its contract, its states and its failures to every reader - the confirmation itself needs the session.",
			}),
			next: {
				label: T("layout.verify.denied.next", {
					defaultValue: "SIGN IN",
				}),
				href: "/Account/SignIn",
			},
		},
	},
});
