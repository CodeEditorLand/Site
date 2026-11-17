/**
 * The auth surface contract.
 *
 * Eight routes render the same frame: sign-in, sign-up, forgot-password,
 * reset-password, the account index, the OAuth landing and the two Verify
 * entry modes (pending and result). They are visited under stress, so the
 * shape is fixed here rather than re-decided per page.
 *
 * Field names are lower camel to match the Record block layer
 * (`Source/Component/Record/Type.ts`); the legacy content layer
 * (`Source/Content/Record/*`) stays PascalCase and is not renamed here.
 */

/** The eight surfaces the shell frames. */
export type AuthSurface =
	| "account"
	| "signIn"
	| "signUp"
	| "forgotPassword"
	| "resetPassword"
	| "oauthSuccess"
	| "verify";

/**
 * How an outcome reads. `quiet` is an in-progress state, `success` and
 * `failure` are the two reportable endings - a report always carries one of
 * the three, so no state is ever rendered without saying what it is.
 */
export type AuthTone = "quiet" | "success" | "failure";

/** The one action a surface or a state offers. Never more than one. */
export interface AuthAction {
	readonly label: string;
	readonly href: string;
}

/**
 * The static frame: what the page is, above the form.
 *
 * `heading` is the page's single `h1`. `sentence` is the one supporting
 * line - a second sentence belongs in the form's own copy, not here.
 */
export interface AuthFrame {
	readonly kicker: string;
	readonly heading: string;
	readonly sentence?: string;
	readonly action?: AuthAction;
}

/**
 * What happened, inside the frame. Used by every state that reports an
 * outcome: `SIGNED IN`, `EMAIL VERIFIED`, `LINK EXPIRED`.
 */
export interface AuthReport {
	readonly status: string;
	readonly sentence: string;
	readonly action: AuthAction;
	readonly tone: AuthTone;
}

/**
 * The i18n resolver, taken as a value.
 *
 * BRIDGE 2.2: a `.ts` module may export a function that takes `T` but must
 * not import the i18n client itself - so this module never resolves a key.
 */
export type Translate = (
	Key: string,
	Options: { readonly defaultValue: string },
) => string;
