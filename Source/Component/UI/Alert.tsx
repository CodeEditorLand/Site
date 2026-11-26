import { cva, type VariantProps } from "class-variance-authority";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Alert - a state the reader must read before acting.
 *
 * ─── A STATE STATEMENT, NOT A CARD WITH A COLOUR ─────────────────────────
 * The kit's alert is a bordered box in two variants. The family's is the same
 * four parts `ShellState` prints - the mark, the vocabulary's word, the cause, the
 * next step - at the size of a paragraph inside a band.
 *
 * The `state` prop takes the eight words of the status vocabulary (`READY`,
 * `ACTIVE`, `LOADING`, `PREPARING`, `VERIFIED`, `UNAVAILABLE`, `INTERRUPTED`,
 * `ARCHIVED`) plus the two the family needs and the vocabulary does not spell:
 * `error` and `stale`. The tone is carried by the rule at the leading edge and by
 * the word's ink - never by a filled background, because a page with a red box on
 * it is a page shouting, and this document does not shout.
 *
 * ─── THE ACTION ROW IS SEPARATE ON PURPOSE ───────────────────────────────
 * An alert with an action but no next step is an alert that complains. So the
 * action lives on its own line under a hairline, in the `↳` / `→` grammar the
 * matrix bar uses: `↳ READ THE CAUSE`, `→ RETRY`. `AlertAction` is that row, and
 * it takes the two doors an alert actually has.
 */

/** The words an alert may print. Eight vocabulary words and two family states. */
type AlertState =
	| "ready"
	| "active"
	| "loading"
	| "preparing"
	| "verified"
	| "unavailable"
	| "interrupted"
	| "archived"
	| "error"
	| "stale";

const AlertVariants = cva(
	"relative w-full rounded-none border px-4 py-3 grid has-[>svg]:grid-cols-[calc(var(--Spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",

	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				destructive:
					"text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-[color-mix(in_srgb,var(--Destruct)_90%,transparent)]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

interface AlertProps
	extends React.ComponentProps<"div">, VariantProps<typeof AlertVariants> {
	/**
	 * The state the alert reports. The word is printed by the caller in the title
	 * (`STATUS: UNAVAILABLE`); this prop is what the surface answers, so the edge
	 * and the tone follow the word rather than the other way round.
	 */
	state?: AlertState;
}

function Alert({ className, variant, state, ...props }: AlertProps) {
	return (
		<div
			data-slot="alert"
			data-state={state}
			role="alert"
			className={cn(AlertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"col-start-2 grid justify-items-start gap-1 text-card-foreground [&_p]:leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}

interface AlertActionProps {
	/** The next step: where to read the thing itself. */
	next?: { label: string; href: string };

	/** The retry: the action that failed, offered again. */
	retry?: { label: string; onClick: () => void };

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * AlertAction - the two doors an alert has.
 *
 * `↳` for the next step (read the cause) and `→` for the retry (try the action
 * again), which is the grammar's own distinction between "the content of this
 * line" and "onward". Neither is an `emphasis-expressive`: an alert is not the one
 * action of an artifact, and the page's expressive moment belongs elsewhere.
 */
function AlertAction({ next, retry, className }: AlertActionProps) {
	if (next === undefined && retry === undefined) return null;

	return (
		<div className={cn("AlertAction", className)}>
			{next === undefined ? null : (
				<a className="AlertAction__Next" href={next.href}>
					<span className="MarkRelation" aria-hidden="true" />
					{next.label}
				</a>
			)}

			{retry === undefined ? null : (
				<button
					type="button"
					className="AlertAction__Retry"
					onClick={retry.onClick}
				>
					<span aria-hidden="true">→</span> {retry.label}
				</button>
			)}
		</div>
	);
}

export { type AlertState, Alert, AlertTitle, AlertDescription, AlertAction };
