/**
 * OAuth - the callback's four outcomes, as copy.
 *
 * The route used to print one apologetic sentence for every failure ("Something
 * went wrong during sign-in. Please try again.") and a heading that named no
 * state. Four ways the exchange can fail are four different facts, and a reader
 * deciding whether the fault is theirs, the provider's or the tenant's needs the
 * one that happened - not the average of the four.
 *
 * ─── THE FOUR ARMS ────────────────────────────────────────────────────────
 * Each arm is a `ShellState` `error` composition, so it prints the same way the
 * 404's `missing` arm and the verify route's three adverse arms print: a state
 * word from the fixed vocabulary, `WHAT FAILED:` / `CAUSE:` / `NEXT:`, and a
 * provenance note. The arms are keyed by the provider's own `error` parameter,
 * which is the only thing the callback actually knows:
 *
 *   expired   `invalid_state`  the state parameter no longer matches the session
 *   provider  `oauth_failed`   the provider refused before Land saw a code
 *   absent    no query        the page was reached without a code at all
 *   unknown   anything else    the callback produced neither session nor reason
 *
 * ─── WHAT THE COPY MAY NOT DO ─────────────────────────────────────────────
 * It may not blame the reader, and it may not promise a fix it cannot make. The
 * session is written by the provider; Land reads the answer. So every arm names
 * what the callback actually held (`STATE: NO MATCH`, `CODE: ABSENT`,
 * `QUERY: EMPTY`, `REASON: UNRECORDED`) and offers the one action that can change
 * the outcome - starting the exchange again - rather than a retry button that
 * would re-send the same spent callback. The row `SESSION: NOT WRITTEN` is the
 * arm's fact, printed once by the page rather than repeated in every note.
 *
 * `STATE:` is printed because the exchange is PKCE: the state parameter is the
 * one part of the callback a reader can see and a developer can check. A page
 * that said "expired" without naming what expired would be asking to be
 * believed.
 */
import type { TFunction } from "i18next";

/** The four ways the callback can end. */
export type OAuthFailureCode = "expired" | "provider" | "absent" | "unknown";

/** One failure arm: the state, the sentence, the cause and the way out. */
export interface OAuthFailureArm {
	/** The state word, from the fixed eight-word vocabulary. */
	readonly state: string;

	/** `WHAT FAILED:` - the one sentence the arm is about. */
	readonly statement: string;

	/** `CAUSE:` - why, in the provider's terms. */
	readonly cause: string;

	/** The provenance line under the rows. */
	readonly note: string;
}

/** The route's copy, resolved. */
export interface OAuthSurface {
	/** The card's heading when the exchange failed. */
	readonly heading: string;

	/** The one action a failed exchange offers. */
	readonly next: { readonly label: string; readonly href: string };

	/** The four arms, by the provider's own code. */
	readonly arms: Readonly<Record<OAuthFailureCode, OAuthFailureArm>>;

	/** Which arm a code that is not one of the three known ones resolves to. */
	readonly fallback: OAuthFailureCode;
}

/**
 * The arm a provider's `error` parameter names.
 *
 * Exported because the page's inline script needs the same mapping the
 * prerendered copy was built with: two mappings would let the card print one
 * arm's sentence beside another arm's code.
 */
export const FailureCodeOf = (Parameter: string | null): OAuthFailureCode => {
	if (Parameter === "invalid_state") return "expired";

	if (Parameter === "oauth_failed") return "provider";

	return "unknown";
};

/** Resolve the route's failure copy through the page's translator. */
export const OAuthResult = (T: TFunction): OAuthSurface => ({
	heading: T("common.oauth.failed", { defaultValue: "Sign-In Interrupted" }),

	next: {
		label: T("common.oauth.backToSignIn", { defaultValue: "SIGN IN AGAIN" }),
		href: "/Account/SignIn",
	},

	arms: {
		expired: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorExpired", {
				defaultValue:
					"The sign-in session expired before the provider returned.",
			}),
			cause: T("common.oauth.failure.expired.cause", {
				defaultValue:
					"The state parameter in the callback no longer matches the session that started the sign-in: the window closed, or the attempt was started in a second tab.",
			}),
			note: "STATE: NO MATCH",
		},

		provider: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorProvider", {
				defaultValue: "The provider returned an error instead of a code.",
			}),
			cause: T("common.oauth.failure.provider.cause", {
				defaultValue:
					"The identity provider refused the request before it reached Land: a cancelled consent screen, a disabled connection, or a tenant rule.",
			}),
			note: "CODE: ABSENT",
		},

		absent: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorNoToken", {
				defaultValue: "The callback carried no token and no code.",
			}),
			cause: T("common.oauth.failure.absent.cause", {
				defaultValue:
					"The address reached this page without the query string the exchange reads, so there was nothing to exchange.",
			}),
			note: "QUERY: EMPTY",
		},

		unknown: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorGeneric", {
				defaultValue:
					"The exchange did not complete, and the provider named no reason.",
			}),
			cause: T("common.oauth.failure.unknown.cause", {
				defaultValue:
					"The callback was read and produced neither a session nor an error parameter. The account is not the fault: the attempt can be repeated.",
			}),
			note: "REASON: UNRECORDED",
		},
	},

	fallback: "unknown",
});

/** The arm a provider's parameter resolves to, from a resolved surface. */
export const FailureArm = (
	Surface: OAuthSurface,
	Parameter: string | null,
): OAuthFailureArm => Surface.arms[FailureCodeOf(Parameter)];
