/**
 * Data - the record action's two arms and the ink the button arm hands the
 * jelly element.
 *
 * A record action is either a RECORD (`/LABEL`, a mono route line) or a
 * BUTTON (a squish jelly element carrying the same label). The difference is
 * not a style: the record arm is a text link and the button arm is a control,
 * so the variant is a two-value union and the markup is a branch on it -
 * never a class the caller can pass to make one look like the other.
 *
 * `BUTTON_INK` is the jelly element's own custom-property surface, moved here
 * as data rather than left inline so a second button arm cannot drift from
 * this one. It is a serialized style string: the jelly element reads custom
 * properties, not React props.
 */

/** The two arms of a record action. */
export type Variant = "record" | "button";

/** The published shape of a record action. */
export interface Props {
	/** The action's label, printed verbatim (the record arm prefixes `/`). */
	label: string;

	/** Where the action leads. Absent means the arm still prints, but inert. */
	href?: string;

	/** Which arm to render. Defaults to `record`. */
	variant?: Variant;

	/** Extra classes from the host, appended after the block's own. */
	className?: string;
}

/**
 * The button arm's jelly ink: radius, height, inline padding, min width, and
 * the accent pair the element fills with. Values are the site's own tokens
 * wherever a token exists; 44px / 2.6rem are the button arm's own geometry.
 */
export const BUTTON_INK =
	"--jelly-button-radius:var(--RadiusButton);" +
	"--jelly-button-height:44px;" +
	"--jelly-button-padding-inline:2.6rem;" +
	"--jelly-button-min-width:0px;" +
	"--jelly-color-background-accent:var(--Foreground);" +
	"--jelly-color-foreground-on-accent:var(--Background)";

/**
 * The link attributes an external action carries, and nothing at all for an
 * internal one: `target` without `rel` would leak the opener, so the pair is
 * one value that is either present together or absent.
 */
export const ExternalLink = (
	href: string | undefined,
): Record<string, string> =>
	href?.startsWith("http")
		? { target: "_blank", rel: "noopener noreferrer" }
		: {};
