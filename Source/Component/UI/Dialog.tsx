"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

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
 * Dialog - the slip at modal scale, with a head, a body and a foot.
 *
 * ─── WHAT THIS FILE DECIDES, AND WHAT RADIX KEEPS ─────────────────────────
 *
 * Radix owns the modal: the focus trap, the scroll lock, Escape, outside-click,
 * the `aria-modal` and the `data-state` every rule below reads. Nothing about
 * that is restated here. What this file decides is that a dialog is a *slip* -
 * the same white insert a menu is, with the same `--Divider` frame, the same
 * radius 0, the same 120 ms arrival - and that it therefore opens with the same
 * register line, carries the same adverse arms, and states the same keyboard
 * path in the same foot. A dialog that arrived as a differently built box would
 * be the fourth surface in a system that has one.
 *
 * ─── THE TALL DIALOG IS THE REASON FOR THE THREE REGIONS ──────────────────
 *
 * The kit centres a dialog with `top-50%` + `translate-y-[-50%]` and gives it no
 * internal scroll. A dialog taller than the viewport therefore overflows off
 * both edges, and the top of it - which holds the title and the first field -
 * is the part that goes off-screen first and the part a reader cannot reach.
 * The fix is structural rather than a size cap: the panel is a flex column at
 * `min(90vh, …)`, the head and the foot are `flex: none`, and the body is the
 * only thing that scrolls. Then a dialog can be two rows or two hundred, and
 * the title stays on screen while the middle moves - which is the same device
 * the plate's pinned spec column uses, at modal scale.
 *
 * ─── THE ADVERSE ARMS ARE ABOVE THE CHILDREN, NOT INSTEAD OF THEM ─────────
 *
 * `state` prints the arm *over* the body and leaves the children rendered
 * underneath. That is deliberate and it is §7's "offline / stale" state: a
 * dialog that is reloading should keep the last known rows visible, say they
 * are stale, and not blank the panel the reader is reading. A dialog that
 * replaced its content with a skeleton would be a dialog that made the reader
 * lose their place twice.
 */

/**
 * The panel's four widths.
 *
 * `sm` is a confirmation, `md` is the default record, `lg` is a table or a
 * matrix, `full` is the sheet - and `full` is bounded by the viewport minus the
 * page gutter rather than by a fixed rem, so it cannot overflow at 360px.
 */
export type DialogSize = "sm" | "md" | "lg" | "full";

/** The adverse arm a dialog is in. `ready` is the ordinary case. */
export type DialogState = "ready" | "loading" | "empty" | "error";

const SizeClass: Record<DialogSize, string> = {
	sm: "Slip--sm",

	md: "Slip--md",

	lg: "Slip--lg",

	// `full` is a width, not a floor: `[data-size="full"]` sets `inline-size` to
	// the viewport minus the page gutter, and a `min-inline-size` here would
	// override it upward at 360px and push the panel off both edges.
	full: "",
};

function Dialog({
	open,
	defaultOpen,
	onOpenChange,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	const Root = UseSlipRoot({ open, defaultOpen, onOpenChange });

	return (
		<DoorContext.Provider value={Root.Door}>
			<DialogPrimitive.Root
				open={Root.Open}
				onOpenChange={Root.OnOpenChange}
				{...props}
			/>
		</DoorContext.Provider>
	);
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	const Door = React.useContext(DoorContext);

	const Ref = UseDoorRef(Door);

	return (
		<DialogPrimitive.Trigger
			ref={Ref}
			data-slot="dialog-trigger"
			{...props}
		/>
	);
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn("SlipScrim", className)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	close = true,
	size = "md",
	head,
	state = "ready",
	empty,
	error,
	foot,
	bare = false,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	/** The X in the corner. A slip that states its own dismissal does not need one. */
	close?: boolean;

	/** The panel's width. `md` is the record; `full` is the sheet. */
	size?: DialogSize;

	/** The register line the slip opens with - `# RECORD / 04`. */
	head?: SlipHead | undefined;

	/** The adverse arm. `ready` renders nothing above the body. */
	state?: DialogState;

	/** The `empty` arm's two lines. */
	empty?: { Mark?: string; Line: string } | undefined;

	/** The `error` arm: what failed, why, and the retry. */
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

	/** The keyboard path, stated in the slip's own foot. */
	foot?: readonly SlipFootItem[] | undefined;

	/**
	 * Render the children directly in the panel, without the scrolling body.
	 *
	 * For the one dialog that is its own layout: the palette is a flex column
	 * whose list is the scroll region, and a body wrapper around it would put a
	 * scroll inside a scroll. `bare` is the honest name for that - the panel is
	 * still a slip, it just is not a three-region one.
	 */
	bare?: boolean;
}) {
	const Return = UseDoorReturn();

	// The head's own count cannot be a figure while the rows are arriving, and a
	// `00` in that cell would be a false statement rather than an unknown one.
	const Head: SlipHead | undefined =
		head === undefined
			? undefined
			: state === "loading"
				? { ...head, State: "LOADING" }
				: state === "error"
					? { ...head, State: "INTERRUPTED" }
					: head;

	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />

			<DialogPrimitive.Content
				data-slot="dialog-content"
				data-size={size}
				data-body-state={state}
				aria-label={Head?.Name}
				onOpenAutoFocus={Return.OnOpenAutoFocus}
				onCloseAutoFocus={Return.OnCloseAutoFocus}
				className={cn(
					"Slip",
					"Slip--panel",
					"Slip--dialog",
					SizeClass[size],
					className,
				)}
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

				{bare ? children : <DialogBody>{children}</DialogBody>}

				{foot === undefined ? null : <SlipFoot Items={foot} />}
				{close ? (
					<DialogPrimitive.Close className="SlipClose">
						<lucide.XIcon aria-hidden="true" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				) : null}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

/**
 * The body - the one region of a dialog that scrolls.
 *
 * It is a named part rather than a `<div>` at each call site because the rule
 * it carries is structural: the panel is `overflow: hidden` so its frame stays
 * whole, the head and the foot are `flex: none`, and this is the only element
 * allowed to move. A dialog that scrolled as a whole would scroll its own
 * register line away, which is exactly what a slip's sticky head exists to
 * prevent.
 */
function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-body"
			className={cn("Slip__Body", className)}
			{...props}
		/>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("Slip__PanelHead", className)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("Slip__PanelFoot", className)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("Slip__PanelTitle", className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("Slip__PanelNote", className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
