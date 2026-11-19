"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Collapsible - one region, one trigger, no stack.
 *
 * ─── WHY IT IS NOT AN ACCORDION ──────────────────────────────────────────
 * The family keeps the two apart: an accordion is a set of siblings where opening
 * one may close another, and a collapsible is a single region that is either
 * there or not. That is why `Collapsible` has no `many items` state - a set of
 * regions is the accordion, and a component that did both would be one component
 * pretending to be two.
 *
 * ─── THE MARK THE TRIGGER CARRIES ────────────────────────────────────────
 * A collapsible trigger is a button with no icon of its own, so the kit's markup
 * says nothing about which way the panel is going. The grammar answers that with
 * two glyphs: `→` while the region is closed (there is more, that way) and `↳`
 * while it is open (this is the content of the line above).
 * `CollapsibleTrigger` prints the slot and `System/UI/_Display.scss` draws the
 * glyph from `data-state`, so no caller has to remember which one goes where and
 * the two states cannot be swapped by a page.
 *
 * ─── THE SAME REDUCED-MOTION PATH AS THE ACCORDION ───────────────────────
 * Radix publishes `--radix-collapsible-content-height`, the stylesheet animates
 * from nothing to it, and `prefers-reduced-motion: reduce` removes the interval
 * and keeps the end state. One grammar, two components.
 */

function Collapsible({
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
	className,
	children,
	mark = true,
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
	/**
	 * Whether the trigger prints the disclosure mark. Default `true`; a caller
	 * that already carries a mark of its own (a register line, a count) turns it
	 * off rather than printing two.
	 */
	mark?: boolean;
}) {
	return (
		<CollapsiblePrimitive.CollapsibleTrigger
			data-slot="collapsible-trigger"
			className={cn(
				"flex w-full items-baseline justify-between gap-4",
				className,
			)}
			{...props}
		>
			{children}
			{mark ? (
				<span data-slot="disclosure-mark" aria-hidden="true" />
			) : null}
		</CollapsiblePrimitive.CollapsibleTrigger>
	);
}

function CollapsibleContent({
	className,
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
	return (
		<CollapsiblePrimitive.CollapsibleContent
			data-slot="collapsible-content"
			className={cn("overflow-hidden", className)}
			{...props}
		/>
	);
}

interface CollapsibleEmptyProps {
	/** What would be here. */
	statement: string;

	/** Why it is not. */
	cause?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * CollapsibleEmpty - the region that has nothing in it.
 *
 * A region whose content has not arrived is not an empty collapsible: it is a
 * collapsible with a busy panel, and the busy grammar is the panel's. This is the
 * other case - the region exists and holds nothing - and it says so rather than
 * opening onto a ruled void.
 */
function CollapsibleEmpty({
	statement,
	cause,
	className,
}: CollapsibleEmptyProps) {
	return (
		<div className={cn("DisplayAbsent", className)}>
			<span className="DisplayAbsent__Mark" aria-hidden="true">
				◎
			</span>
			<span className="DisplayAbsent__Word">NO REGION</span>
			<p className="DisplayAbsent__Statement">
				{statement}
				{cause === undefined ? null : ` ${cause}`}
			</p>
		</div>
	);
}

export {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
	CollapsibleEmpty,
};
