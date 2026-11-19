import React from "react";

import { cn } from "./Utility";

/**
 * Card - a white insert lying on the creme field.
 *
 * ─── THE SURFACE IS A KEEPER ─────────────────────────────────────────────
 * `Card` is a `jelly-card` with the insert's fill, radius 0 and no padding of its
 * own. `KEEPERS.md` states the Jelly surfaces are the design system's surface family
 * and not a decoration to be replaced, so nothing here swaps one for a `<div>` and a
 * set of utilities: the fill, the radius and the padding are the element's own custom
 * properties (`--jelly-fill`, `--jelly-radius`, `--jelly-card-padding-*`), set from
 * the site's tokens.
 *
 * ─── THE CARD'S OWN STATE ────────────────────────────────────────────────
 * A card that failed to load its body, a card whose values are older than its
 * as-of, a card with nothing in it yet - all three rendered as a card that worked,
 * which is the one thing a dossier may not do. The card carries its state on
 * `data-state` (the stylesheet answers the edge and the ink), and `CardState` prints
 * the sentence at its foot:
 *
 *   loading    the body has not arrived
 *   empty      the body arrived and holds nothing
 *   error      the body failed
 *   stale      the body's values are older than their as-of
 *   archived   the record the card names is no longer current
 *
 * ─── AND THE REGISTER ITS HEADER PRINTS ─────────────────────────────────
 * `CardRegister` is `# RELEASE_01 / 04` - the mark, the name, the count - because a
 * card on this site opens the way a record opens, and a title alone is a title.
 *
 * ─── NEVER A CARD INSIDE A CARD ─────────────────────────────────────────
 * §1.3. That is a composition rule and it cannot be enforced in a component; the
 * specimen matrix's `IN A CARD` cell states it, and the card inside a card is
 * marked `NOT APPLICABLE` there with its reason.
 */

/** The states a card's body can be in. */
type CardStateKind = "loading" | "empty" | "error" | "stale" | "archived";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** The body's state. Omitted means a card at rest: no state ink, no state edge. */
	state?: CardStateKind;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, state, children, ...props }, ref) => {
		return (
			<jelly-card
				ref={ref as unknown as React.Ref<HTMLElement>}
				data-slot="card"
				data-state={state}
				className={cn("text-card-fg", className)}
				style={
					{
						"--jelly-fill": "var(--Card)",
						"--jelly-radius": "0px",
						"--jelly-card-color": "inherit",
						"--jelly-card-padding-block": "0px",
						"--jelly-card-padding-inline": "0px",
						"--jelly-card-font-size": "inherit",
					} as React.CSSProperties
				}
				{...props}
			>
				{children}
			</jelly-card>
		);
	},
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		/>
	);
});

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
	return (
		<h3
			ref={ref}
			className={cn(
				"font-mono text-sm font-medium leading-snug tracking-tight",
				className,
			)}
			{...props}
		/>
	);
});

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn("text-sm text-card-foreground opacity-70", className)}
			{...props}
		/>
	);
});

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn("flex items-center p-6 pt-0", className)}
			{...props}
		/>
	);
});

CardFooter.displayName = "CardFooter";

interface CardRegisterProps {
	/** The record's name: `RELEASE_01`. */
	label: string;

	/** A figure the card holds, when it holds one: `04`. */
	count?: string | number;

	/** What the figure counts. */
	note?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * CardRegister - the card's head line: `# RELEASE_01 / 04`.
 *
 * The same register a band and a table print, at the card's scale. It sits above the
 * title rather than replacing it: the register names the record, the title says what
 * the record is about, and the two are different sentences.
 */
function CardRegister({ label, count, note, className }: CardRegisterProps) {
	return (
		<div className={cn("CardRegister", className)}>
			<p className="DisplayRegister">
				<span className="DisplayRegister__Mark" aria-hidden="true">
					#
				</span>
				<span className="DisplayRegister__Label">{label}</span>
				{count === undefined ? null : (
					<>
						<span
							className="DisplayRegister__Rule"
							aria-hidden="true"
						>
							/
						</span>
						<span className="DisplayRegister__Value">{count}</span>
					</>
				)}
			</p>

			{note === undefined ? null : (
				<span className="DisplayRegister__Note">{note}</span>
			)}
		</div>
	);
}

interface CardStateProps {
	/** The state word, from the status vocabulary or the family's two extras. */
	word: string;

	/** The one sentence: what happened, or what is missing. */
	line: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * CardState - the card's foot: the word and the sentence.
 *
 * An adverse card keeps its frame and states the adverse thing at its foot, because
 * the insert is the artifact's surface - a missing body does not unmake the card, and
 * a card that vanished would leave the band with a hole where a record was.
 */
function CardState({ word, line, className }: CardStateProps) {
	return (
		<div className={cn("CardState", className)}>
			<span className="CardState__Word">{word}</span>
			<span className="CardState__Line">{line}</span>
		</div>
	);
}

export {
	type CardStateKind,
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	CardRegister,
	CardState,
};
