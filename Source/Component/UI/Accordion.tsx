"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

import * as lucide from "lucide-react";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Accordion - a stack of disclosures, each closed until asked.
 *
 * ─── WHAT WAS MISSING ────────────────────────────────────────────────────
 * Two states and one interval. The interval is the one the file already tried to
 * use: `animate-accordion-up` / `animate-accordion-down` were never declared
 * anywhere, so the panel snapped open and the class names were decoration. The
 * real disclosure is in `System/UI/_Display.scss`, driven by Radix's own
 * `--radix-accordion-content-height`, with the reduced-motion branch that keeps
 * the end state and removes the time.
 *
 * The states are the two the stack meets on a page:
 *
 *   EMPTY        an accordion with no items. It is not an accordion, it is an
 *                absence, and `AccordionEmpty` says so in the family's grammar
 *                instead of rendering a ruled void.
 *   UNAVAILABLE  a section that cannot open (`disabled` on the item, which Radix
 *                carries as `data-disabled`). It stays in the stack - a stack
 *                that hides an option lies about the set - and its trigger loses
 *                its ink and its cursor.
 *
 * ─── OPEN IS A STATE, NOT A SWITCH ───────────────────────────────────────
 * `System/State/_Disclosure.scss` states the site's rule for a `<summary>`: when a
 * disclosure opens, the label goes to 500 and the mark goes to the ink, because
 * the summary has stopped being a row and become a head. Radix writes
 * `data-state="open"` instead of `[open]`, and `_Display.scss` answers it, so the
 * kit's stack and the site's `<details>` read as one grammar.
 */

function Accordion({
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("border-b last:border-b-0", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"flex flex-1 items-start justify-between gap-4 rounded-none py-4 text-left font-medium outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_srgb,var(--Ring)_50%,transparent)] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<lucide.ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
			{...props}
		>
			<div className={cn("pb-4 pt-0", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

interface AccordionEmptyProps {
	/** What would be here. */
	statement: string;

	/** Why it is not. */
	cause?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * AccordionEmpty - the stack with nothing in it.
 *
 * An accordion with no items has no trigger to open and no panel to hide, so
 * rendering the root alone would print a ruled void. The empty arm is the
 * family's absence: `◎ NO SECTION`, the statement, the cause.
 */
function AccordionEmpty({ statement, cause, className }: AccordionEmptyProps) {
	return (
		<div className={cn("DisplayAbsent", className)}>
			<span className="DisplayAbsent__Mark" aria-hidden="true">
				◎
			</span>
			<span className="DisplayAbsent__Word">NO SECTION</span>
			<p className="DisplayAbsent__Statement">
				{statement}
				{cause === undefined ? null : ` ${cause}`}
			</p>
		</div>
	);
}

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	AccordionEmpty,
};
