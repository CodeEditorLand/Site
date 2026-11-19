"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import * as React from "react";

import { DoorContext, UseDoorRef, UseDoorReturn, UseSlipRoot } from "./Overlay";

import {
	SlipEmpty,
	SlipError,
	SlipFoot,
	SlipLoading,
	SlipNote,
	SlipRegister,
	type SlipFootItem,
	type SlipHead,
} from "./Slip";

import { cn } from "./Utility";

/**
 * Popover - a slip that holds content instead of rows.
 *
 * Same frame, same hairline, same arrival; the only difference is that it carries
 * prose, a figure or a form rather than a list, so it takes `Slip--panel` (the
 * slip's own inset) and no row grammar. A popover that opened as a differently
 * built box - a card, a tooltip, a rounded panel - would be the fourth surface in
 * a system that has one.
 *
 * ─── THE ARRIVAL IS THE SIDE'S, NOT THE SLIP'S ────────────────────────────
 *
 * `_Slip.scss` rises the slip 2px, which is right when the slip opens *below*
 * its trigger and wrong in every other direction: a popover that opens upward
 * and rises upward is a slip moving away from the control that opened it. So
 * the panel carries `data-side` (Radix's own attribute) and the stylesheet
 * turns the travel to face the trigger. That is the one change of state the
 * motion layer gives a name to - an affordance arriving from where it belongs -
 * and it costs one rule per side.
 *
 * ─── THE EDGE IS A PLACEMENT QUESTION, NOT A CLIPPING ONE ─────────────────
 *
 * A popover near the right edge is the state the brief names and the tree never
 * showed. Radix's collision handling is the answer and it is configured here
 * rather than at each call site: `avoidCollisions`, `collisionPadding` at the
 * page's own gutter, `sticky="always"` so a slip that scrolls with its trigger
 * keeps the same relationship, and `hideWhenDetached` so a slip whose trigger
 * has left the viewport closes rather than floating over an empty page. A
 * caller that wants to override any of them still can - they are props, with
 * defaults that are the family's contract.
 */

/** The panel's three widths. `sm` is a footnote, `md` a figure, `lg` a form. */
export type PopoverSize = "sm" | "md" | "lg";

/** The adverse arm a popover is in. `ready` is the ordinary case. */
export type PopoverState = "ready" | "loading" | "empty" | "error";

const SizeClass: Record<PopoverSize, string> = {
	sm: "Slip--sm",

	md: "Slip--md",

	lg: "Slip--lg",
};

function Popover({
	open,
	defaultOpen,
	onOpenChange,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	const Root = UseSlipRoot({ open, defaultOpen, onOpenChange });

	return (
		<DoorContext.Provider value={Root.Door}>
			<PopoverPrimitive.Root
				open={Root.Open}
				onOpenChange={Root.OnOpenChange}
				{...props}
			/>
		</DoorContext.Provider>
	);
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	const Door = React.useContext(DoorContext);

	const Ref = UseDoorRef(Door);

	return (
		<PopoverPrimitive.Trigger
			ref={Ref}
			data-slot="popover-trigger"
			{...props}
		/>
	);
}

function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	collisionPadding = 16,
	sticky = "always",
	avoidCollisions = true,
	hideWhenDetached = true,
	size = "md",
	head,
	state = "ready",
	note,
	empty,
	error,
	foot,
	children,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
	/** The register line the slip opens with, when the panel names itself. */
	head?: SlipHead | undefined;

	/** The panel's width. */
	size?: PopoverSize;

	/** The adverse arm. `ready` renders nothing above the body. */
	state?: PopoverState;

	/** The `↳` proposition under the head. */
	note?: React.ReactNode;

	empty?: { Mark?: string; Line: string } | undefined;

	error?:
		| {
				Mark?: "INTERRUPTED" | "UNAVAILABLE";

				Line: string;

				Cause?: string;

				Next?: string;

				OnRetry?: () => void;

				Retry?: string;
		  }
		| undefined;

	/** The keyboard path, when the panel can be driven from one. */
	foot?: readonly SlipFootItem[] | undefined;
}) {
	const Return = UseDoorReturn();

	const Head: SlipHead | undefined =
		head === undefined
			? undefined
			: state === "loading"
				? { ...head, State: "LOADING" }
				: state === "error"
					? { ...head, State: "INTERRUPTED" }
					: head;

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				data-size={size}
				data-body-state={state}
				align={align}
				sideOffset={sideOffset}
				collisionPadding={collisionPadding}
				sticky={sticky}
				avoidCollisions={avoidCollisions}
				hideWhenDetached={hideWhenDetached}
				aria-label={Head?.Name}
				onOpenAutoFocus={Return.OnOpenAutoFocus}
				onCloseAutoFocus={Return.OnCloseAutoFocus}
				className={cn(
					"Slip",
					"Slip--panel",
					SizeClass[size],
					className,
				)}
				{...props}
			>
				{Head === undefined ? null : <SlipRegister head={Head} />}

				{note === undefined ? null : <SlipNote>{note}</SlipNote>}

				{state === "loading" ? <SlipLoading /> : null}

				{state === "empty" ? (
					<SlipEmpty
						Mark={empty?.Mark ?? "NO RECORD"}

						Line={empty?.Line ?? "NOTHING IS FILED HERE YET"}
					/>
				) : null}

				{state === "error" ? (
					<SlipError
						Mark={error?.Mark ?? "INTERRUPTED"}

						Line={error?.Line ?? "THE ACTION DID NOT COMPLETE"}

						{...(error?.Cause === undefined
							? {}
							: { Cause: error.Cause })}

						{...(error?.Next === undefined
							? {}
							: { Next: error.Next })}

						OnRetry={error?.OnRetry}

						{...(error?.Retry === undefined
							? {}
							: { Retry: error.Retry })}
					/>
				) : null}

				{children}

				{foot === undefined ? null : <SlipFoot Items={foot} />}
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
