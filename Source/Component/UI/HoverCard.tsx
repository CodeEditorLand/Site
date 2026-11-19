"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import * as React from "react";

import { SlipNote, SlipRegister, type SlipHead } from "./Slip";

import { cn } from "./Utility";

/**
 * HoverCard - a slip that arrives on a pause.
 *
 * ─── IT WAS THE ONE OVERLAY THAT WAS NOT THE SLIP ─────────────────────────
 *
 * The kit's hover card was `rounded-none border bg-popover p-4 text-popover-
 * foreground` at a fixed `w-64`: a box the site had never seen anywhere else,
 * with the kit's `zoom-in-95` arrival (which emits nothing - there is no
 * `tailwindcss-animate` in this tree) and no register line. It was the fourth
 * surface in a system that has one, and it was invisible as such because a
 * hover card is small and nobody compares it with a menu.
 *
 * It is a slip now: `.Slip`, `.Slip--panel`, the family's `--Divider` frame,
 * the family's 120 ms arrival from the side it opened on, and the same register
 * line - which matters more here than anywhere else, because a hover card
 * appears without a click and is the surface a reader is least prepared to
 * identify.
 *
 * ─── THE DELAYS ARE PART OF THE DESIGN, NOT A DEFAULT ─────────────────────
 *
 * `openDelay` is 240 ms: a card that opens on the first pixel of a pass is a
 * card that opens while the pointer is on its way somewhere else. `closeDelay`
 * is 120 ms so the pointer can travel from the trigger into the card - which is
 * the one thing a hover card must allow, because a card whose text cannot be
 * reached is a card that cannot be read. Both are props with the family's
 * defaults, so a caller that needs a different rhythm can state it.
 */

/** The card's two widths. `sm` is a gloss, `md` is a record's opening. */
export type HoverCardSize = "sm" | "md";

const SizeClass: Record<HoverCardSize, string> = {
	sm: "Slip--sm",

	md: "Slip--md",
};

function HoverCard({
	openDelay = 240,
	closeDelay = 120,
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
	return (
		<HoverCardPrimitive.Root
			data-slot="hover-card"
			openDelay={openDelay}
			closeDelay={closeDelay}
			{...props}
		/>
	);
}

function HoverCardTrigger({
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
	return (
		<HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}

function HoverCardContent({
	className,
	align = "center",
	sideOffset = 4,
	collisionPadding = 16,
	size = "md",
	head,
	note,
	children,
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> & {
	/** The register line the card opens with - `# ELEMENT / 08`. */
	head?: SlipHead | undefined;

	/** The `↳` proposition under the head. */
	note?: React.ReactNode;

	size?: HoverCardSize;
}) {
	return (
		<HoverCardPrimitive.Portal data-slot="hover-card-portal">
			<HoverCardPrimitive.Content
				data-slot="hover-card-content"
				data-size={size}
				align={align}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				aria-label={head?.Name}
				className={cn(
					"Slip",
					"Slip--panel",
					"Slip--hover",
					SizeClass[size],
					className,
				)}
				{...props}
			>
				{head === undefined ? null : <SlipRegister head={head} />}

				{note === undefined ? null : <SlipNote>{note}</SlipNote>}

				{children}
			</HoverCardPrimitive.Content>
		</HoverCardPrimitive.Portal>
	);
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
