"use client";

import * as React from "react";

import { Drawer as DrawerPrimitive } from "vaul";

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
 * Drawer - the slip that can be thrown away.
 *
 * ─── WHAT A DRAWER ADDS TO A SHEET ────────────────────────────────────────
 *
 * One thing: the drag. vaul owns it - the pointer travel, the release
 * threshold, the snap back - and nothing about it is restated here. Everything
 * else is the family's, because a drawer that painted its own scrim and its own
 * grip would be the one overlay whose dismissal looked different from every
 * other overlay's dismissal.
 *
 * ─── THE GRIP IS A MARK, NOT A PILL ───────────────────────────────────────
 *
 * The kit's handle is a `h-2 w-[100px]` muted bar, which reads as a mobile
 * affordance pasted onto a paper document. The site's grip is drawn by
 * `_Slip.scss` as a ruled cap in the row rhythm - a hairline the width of the
 * register line, on the card fill - so it says *this edge can be pulled* in the
 * same material as the rule under the head. It is `aria-hidden`: the drag is an
 * extra door, never the only one, and Escape and the close control are the
 * stated ones.
 *
 * ─── THE DRAWER'S OWN ADVERSE STATE ───────────────────────────────────────
 *
 * A bottom drawer is the surface most likely to hold a list that has not
 * loaded, because it is what a phone-width page opens to show one. `state`
 * therefore prints the same three arms every other slip prints, and the head
 * counts `LOADING` in the register's count cell rather than showing `00`.
 */

/** The adverse arm a drawer is in. `ready` is the ordinary case. */
export type DrawerState = "ready" | "loading" | "empty" | "error";

function Drawer({
	open,
	defaultOpen,
	onOpenChange,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
	const Root = UseSlipRoot({ open, defaultOpen, onOpenChange });

	return (
		<DoorContext.Provider value={Root.Door}>
			<DrawerPrimitive.Root
				open={Root.Open}
				onOpenChange={Root.OnOpenChange}
				{...props}
			/>
		</DoorContext.Provider>
	);
}

function DrawerTrigger({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
	const Door = React.useContext(DoorContext);

	const Ref = UseDoorRef(Door);

	return (
		<DrawerPrimitive.Trigger
			ref={Ref}
			data-slot="drawer-trigger"
			{...props}
		/>
	);
}

function DrawerPortal({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-overlay"
			className={cn("SlipScrim", className)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	close = true,
	head,
	state = "ready",
	empty,
	error,
	foot,
	bare = false,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
	/** The X in the corner. A drawer that states its own dismissal does not need one. */
	close?: boolean;

	/** The register line the slip opens from - `# RECORD / 04`. */
	head?: SlipHead | undefined;

	/** The adverse arm. `ready` renders nothing above the body. */
	state?: DrawerState;

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
		<DrawerPortal data-slot="drawer-portal">
			<DrawerOverlay />

			<DrawerPrimitive.Content
				data-slot="drawer-content"
				data-body-state={state}
				aria-label={Head?.Name}
				onOpenAutoFocus={Return.OnOpenAutoFocus}
				onCloseAutoFocus={Return.OnCloseAutoFocus}
				className={cn("Slip", "Slip--panel", "Slip--drawer", className)}
				{...props}
			>
				{/*
					The grip: the edge that can be pulled. It is drawn, not announced -
					the drag is an extra door and Escape is the stated one.
				*/}
				<span className="Slip__Grip" aria-hidden="true" />

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
					<DrawerPrimitive.Close className="SlipClose">
						<span aria-hidden="true">×</span>
						<span className="sr-only">Close</span>
					</DrawerPrimitive.Close>
				) : null}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn("Slip__PanelHead", className)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn("Slip__PanelFoot", className)}
			{...props}
		/>
	);
}

function DrawerTitle({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn("Slip__PanelTitle", className)}
			{...props}
		/>
	);
}

function DrawerDescription({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("Slip__PanelNote", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
