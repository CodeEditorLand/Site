/**
 * The account index's breadcrumb, as data.
 *
 * The baseline prints one breadcrumb row on `/Account` and none on the other
 * account, verify or OAuth routes, so this module holds the row and nothing
 * else. The surface names, the headings and the supporting sentences live
 * inside each card (`Component/Auth/Content.ts`), because the baseline prints
 * an `h3` inside the card rather than a page-level `h1`.
 *
 * The keys and their English defaults are carried over unchanged from
 * `Source/Library/I18n/Locale/En/Account.json`; nothing here renames a key.
 */
import type { Translate } from "./Type.js";

/** One breadcrumb row. `Href` absent means the reader is already there. */
export interface AuthCrumb {
	readonly Label: string;
	readonly Href?: string;
}

/** Home / Dashboard / Account - the one row the baseline prints. */
export const AccountCrumbs = (T: Translate): readonly AuthCrumb[] => [
	{
		Label: T("common.breadcrumb.home", { defaultValue: "Home" }),
		Href: "/",
	},
	{
		Label: T("common.breadcrumb.dashboard", { defaultValue: "Dashboard" }),
		Href: "/Dashboard",
	},
	{
		Label: T("common.breadcrumb.account", { defaultValue: "Account" }),
	},
];
