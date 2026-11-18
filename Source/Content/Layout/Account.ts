/**
 * Account - the account workspace, as data.
 *
 * The route was a frame over a column of cards. A workspace is the honest form
 * for it: the reader is operating something, the ways in and out of the account
 * are destinations, and the profile is the instrument. Three things live here:
 *
 * - `Rail` - the seven destinations this workspace holds. The account's five
 *   routes plus the two surfaces that read the account (the dashboard and the
 *   portal). The current row is marked by the page, not computed.
 * - `Access` - what the profile is and what it is not, as a ledger. The pane
 *   beside the instrument: it says which session the record comes from and which
 *   facts the record does not hold at all.
 * - `Aside` - the folded disclosure under both panes: what the profile does not
 *   carry, and the route that does carry it.
 *
 * Every string is copy the surface was missing. The account route printed a
 * breadcrumb and an island; it never said what the workspace held.
 */
import type { TFunction } from "i18next";

import type { Aside, LedgerRow } from "../../Component/Record/Type.js";

/** One rail row, in the shell rail's own shape. */
export interface AccountRailItem {
	readonly mark: string;

	readonly label: string;

	readonly meta?: string;

	readonly href?: string;

	readonly current?: boolean;

	readonly note?: string;
}

/** The account workspace's parts, resolved. */
export interface AccountSurface {
	/** The seven destinations, in the order a reader needs them. */
	readonly rail: readonly AccountRailItem[];

	/** The register line above the rail. */
	readonly railLabel: string;

	/** The access ledger beside the instrument. */
	readonly access: readonly LedgerRow[];

	/** The register's label: the access ledger prints `# ACCESS / 05` from it. */
	readonly accessLabel: string;

	/** The folded disclosure under both panes. */
	readonly aside: Aside;

	/** The `denied` state: what this workspace is, and what it needs. */
	readonly denied: {
		readonly statement: string;

		readonly cause: string;

		readonly next: { readonly label: string; readonly href: string };
	};
}

/** Resolve the workspace through the page's translator. */
export const AccountWorkspace = (T: TFunction): AccountSurface => ({
	railLabel: T("layout.account.rail", { defaultValue: "ACCOUNT" }),

	rail: [
		{
			mark: "01",
			label: T("layout.account.route.here", { defaultValue: "/ACCOUNT" }),
			meta: T("layout.account.meta.here", { defaultValue: "HERE" }),
			href: "/Account",
			current: true,
			note: T("layout.account.note.here", {
				defaultValue: "Profile, session and the editor connection",
			}),
		},
		{
			mark: "02",
			label: T("layout.account.route.signIn", {
				defaultValue: "/SIGN IN",
			}),
			href: "/Account/SignIn",
		},
		{
			mark: "03",
			label: T("layout.account.route.signUp", {
				defaultValue: "/CREATE ACCOUNT",
			}),
			meta: T("layout.account.meta.planned", {
				defaultValue: "PREPARING",
			}),
			href: "/Account/SignUp",
		},
		{
			mark: "04",
			label: T("layout.account.route.forgot", {
				defaultValue: "/FORGOT PASSWORD",
			}),
			href: "/Account/ForgotPassword",
		},
		{
			mark: "05",
			label: T("layout.account.route.reset", {
				defaultValue: "/RESET PASSWORD",
			}),
			href: "/Account/ResetPassword",
		},
		{
			mark: "06",
			label: T("layout.account.route.dashboard", {
				defaultValue: "/DASHBOARD",
			}),
			href: "/Dashboard",
		},
		{
			mark: "07",
			label: T("layout.account.route.portal", {
				defaultValue: "/PORTAL",
			}),
			href: "/Portal",
			note: T("layout.account.note.portal", {
				defaultValue: "The four tiers this account can be held in",
			}),
		},
	],

	accessLabel: "ACCESS",

	access: [
		{
			key: "SESSION:",
			value: T("layout.account.access.session", {
				defaultValue: "AUTH0",
			}),
		},
		{
			key: "SCOPE:",
			value: T("layout.account.access.scope", {
				defaultValue: "PROFILE",
			}),
		},
		{
			key: "WORKSPACE:",
			value: T("layout.account.access.workspace", {
				defaultValue: "LAND",
			}),
		},
		{
			key: "EDITOR:",
			value: T("layout.account.access.editor", {
				defaultValue: "NOT CONNECTED",
			}),
			note: T("layout.account.access.editorNote", {
				defaultValue: "A connection this page does not make",
			}),
		},
		{
			key: "SIGNED IN:",
			value: T("layout.account.access.state", {
				defaultValue: "CLIENT STATE",
			}),
			note: T("layout.account.access.stateNote", {
				defaultValue: "The island answers; the page does not claim it",
			}),
		},
		{
			key: "SOURCE:",
			value: T("layout.account.access.source", {
				defaultValue: "AUTH0 SESSION",
			}),
			code: true,
		},
	],

	aside: {
		index: "ASIDE_01",
		label: T("layout.account.aside.label", {
			defaultValue: "/ WHAT THE PROFILE DOES NOT CARRY",
		}),
		line: T("layout.account.aside.line", {
			defaultValue:
				"Three facts about this workspace live on other records; this one does not restate them.",
		}),
		rows: [
			{
				key: "DOWNLOADS:",
				value: T("layout.account.aside.downloads", {
					defaultValue: "NOT A PROFILE FACT",
				}),
				note: "/Download",
			},
			{
				key: "BILLING:",
				value: T("layout.account.aside.billing", {
					defaultValue: "NOT RECORDED",
				}),
				note: "No tier is priced yet",
			},
			{
				key: "EDITOR LINK:",
				value: T("layout.account.aside.editor", {
					defaultValue: "NOT CONNECTED",
				}),
				note: "The dashboard's editor region",
			},
		],
		source: T("layout.account.aside.source", {
			defaultValue: "SOURCE: ACCOUNT SURFACE",
		}),
	},

	denied: {
		statement: T("layout.account.denied.statement", {
			defaultValue:
				"This workspace holds a profile: the fields, the session it came from, and the editor connection it can reach.",
		}),
		cause: T("layout.account.denied.cause", {
			defaultValue:
				"Signed out. The rail, the access ledger and the disclosure print for every reader; the profile itself is the island's, and it answers only with a session.",
		}),
		next: {
			label: T("layout.account.denied.next", { defaultValue: "SIGN IN" }),
			href: "/Account/SignIn",
		},
	},
});
