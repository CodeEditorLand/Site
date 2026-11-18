"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import * as React from "react";

import { SlipRegister, type SlipHead } from "./Slip";

import { cn } from "./Utility";

/**
 * Popover - a slip that holds content instead of rows.
 *
 * Same frame, same hairline, same arrival; the only difference is that it carries
 * prose, a figure or a form rather than a list, so it takes `Slip--panel` (the
 * slip's own inset) and no row grammar. A popover that opened as a differently
 * built box - a card, a tooltip, a rounded panel - would be the fourth surface in
 * a system that has one.
 */

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	head,
	children,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
	/** The register line the slip opens with, when the panel names itself. */
	head?: SlipHead | undefined;
}) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				aria-label={head?.Name}
				className={cn("Slip", "Slip--panel", className)}
				{...props}
			>
				{head ? <SlipRegister head={head} /> : null}
				{children}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
