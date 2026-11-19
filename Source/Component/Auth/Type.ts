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
 * One fact a report states beside its sentence.
 *
 * A state's sentence says what happened; the facts say what the reader can
 * check and what happens next - the window a link was open for, the cause the
 * provider returned, the route the retry goes to. They print in the record
 * grammar (`KEY: value`), because that is the grammar every other fact on this
 * surface is stated in, and a report that could only print prose was the one
 * place on the auth surface where a fact had no shape.
 */
export interface AuthFact {
	/** The label, colon included: `WINDOW:`, `CAUSE:`, `RETRY:`. */
	readonly key: string;

	/** The value, verbatim. */
	readonly value: string;

	/** Print the value in the mono face - a route, a command, an address. */
	readonly code?: boolean;
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
