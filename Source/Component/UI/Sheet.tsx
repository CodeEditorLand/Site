"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";

import * as lucide from "lucide-react";

import * as React from "react";

import { DoorContext, UseDoorRef, UseDoorReturn, UseSlipRoot } from "./Overlay";

import {
	SlipEmpty,
	SlipError,
	SlipFoot,
	SlipLoading,
	SlipRegister,
	type SlipFootItem,
	type SlipHead,
} from "./Slip";

import { cn } from "./Utility";

/**
 * Sheet - the slip that arrives from an edge.
 *
 * ─── THE SAME OBJECT, ENTERING SIDEWAYS ────────────────────────────────────
 *
 * A sheet is not a second kind of panel. It is the slip the whole family uses -
 * `.Slip`, `--Divider` frame, radius 0, no shadow, `SlipScrim` at 12 % ink - and
 * the only thing that differs is the side it is anchored to and the direction it
 * travels from. The panel and the scrim are why: the kit's `bg-background` over a
 * `bg-black/50` scrim would make the one control that opens beside the page the
 * one control that did not look like it belonged to the page.
 *
 * ─── A SHEET IS AS TALL AS ITS EDGE ───────────────────────────────────────
 *
 * The height is the edge's: a side sheet is the height of the viewport (it is a
 * column beside the page, `max-block-size: 100dvh`) and a top or bottom sheet is
 * the height of its content, bounded at 80dvh (it is a bar across the page). Both
 * are flex columns with `overflow: hidden`, so the head and the foot pin and
 * `.Slip__Body` is the only region that scrolls. Without that bound and that one
 * scroll region a long sheet overflows its own frame.
 *
 * ─── WHY THE HEAD IS NOT OPTIONAL IN PRACTICE ─────────────────────────────
 *
 * A slip never opens as an unlabelled box (`_Slip.scss`: the register line names
 * it), and an edge panel is the one overlay a reader meets without having clicked
 * anything near its subject - so it is the one that most needs to say what it is.
 * `head` is optional in the type because a sheet may carry its own `SheetTitle`
 * instead; a sheet that prints both stacks the sticky register line above the
 * panel head, and the specimen does exactly that.
 */

export type SheetSide = "top" | "right" | "bottom" | "left";

/** The adverse arm a sheet is in. `ready` is the ordinary case. */
export type SheetState = "ready" | "loading" | "empty" | "error";

function Sheet({
	open,
	defaultOpen,
	onOpenChange,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
	const Root = UseSlipRoot({ open, defaultOpen, onOpenChange });

	return (
		<DoorContext.Provider value={Root.Door}>
			<SheetPrimitive.Root
				open={Root.Open}
				onOpenChange={Root.OnOpenChange}
				{...props}
			/>
		</DoorContext.Provider>
	);
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	const Door = React.useContext(DoorContext);

	const Ref = UseDoorRef(Door);

	return (
		<SheetPrimitive.Trigger
			ref={Ref}
			data-slot="sheet-trigger"
			{...props}
		/>
	);
}

function SheetClose({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn("SlipScrim", className)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = "right",
	close = true,
	head,
	state = "ready",
	empty,
	error,
	foot,
	bare = false,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: SheetSide;

	/** The X in the corner. A sheet that states its own dismissal does not need one. */
	close?: boolean;

	/** The register line the slip opens with - `# CONTENTS / 11`. */
	head?: SlipHead | undefined;

	/** The adverse arm. `ready` renders nothing above the body. */
	state?: SheetState;

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

	foot?: readonly SlipFootItem[] | undefined;

	/** Render children directly, without the scrolling body. */
	bare?: boolean;
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
		<SheetPortal>
			<SheetOverlay />

			<SheetPrimitive.Content
				data-slot="sheet-content"
				data-side={side}
				data-body-state={state}
				aria-label={Head?.Name}
				onOpenAutoFocus={Return.OnOpenAutoFocus}
				onCloseAutoFocus={Return.OnCloseAutoFocus}
				className={cn("Slip", "Slip--panel", "Slip--sheet", className)}
				{...props}
			>
				{Head === undefined ? null : <SlipRegister head={Head} />}

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

				{bare ? children : <div className="Slip__Body">{children}</div>}

				{foot === undefined ? null : <SlipFoot Items={foot} />}

				{close ? (
					<SheetPrimitive.Close className="SlipClose">
						<lucide.X aria-hidden="true" />
						<span className="sr-only">Close</span>
					</SheetPrimitive.Close>
				) : null}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("Slip__PanelHead", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("Slip__PanelFoot", className)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("Slip__PanelTitle", className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("Slip__PanelNote", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
	SheetPortal,
	SheetOverlay,
};
