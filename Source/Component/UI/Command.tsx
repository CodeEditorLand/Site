"use client";

import { Command as CommandPrimitive } from "cmdk";

import * as React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./Dialog";

import { SlipEmpty, SlipFoot, SlipLoading, type SlipFootItem } from "./Slip";

import { cn } from "./Utility";

/**
 * Command - cmdk's engine in the slip's clothes.
 *
 * cmdk owns the hard part and none of it is restated here: the roving selection
 * over rendered items, ArrowUp/ArrowDown, Home/End, Enter, the `data-selected`
 * flag the row grammar reads, and the scroll-into-view of the selected row. This
 * file decides what a command row *is* - the same `[mark] [label] [meta]` row a
 * menu item is, with the same five states - so a palette result and a menu item
 * are visibly the same object.
 *
 * `shouldFilter` is left to the caller. The palette filters its own register (it
 * matches a page against its section and its slug as well as its label, which
 * cmdk's flat string match cannot), and cmdk still owns the selection over
 * whatever is rendered - which is the whole reason to use it.
 */

function Command({
	className,
	dense = false,
	...props
}: React.ComponentProps<typeof CommandPrimitive> & {
	/**
	 * The tight rhythm - `data-density="dense"`, read by the row grammar.
	 *
	 * The palette is the family's densest list by nature: a route index read by
	 * scanning rather than a five-row menu read by picking. `dense` states that
	 * in the one vocabulary the whole family uses, so a dense menu and a dense
	 * palette are the same stride rather than two opinions about tightness.
	 */
	dense?: boolean;
}) {
	return (
		<CommandPrimitive
			data-slot="command"
			data-density={dense ? "dense" : undefined}
			className={cn("Palette__Command", className)}
			{...props}
		/>
	);
}

/**
 * The query input. It renders bare - no wrapper, no magnifier icon, no bottom
 * rule - because in this site the input lives *inside* the slip's register line,
 * and a second frame there would be a card inside a card. The head draws the
 * focus state for the whole line.
 */
function CommandInput({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
	return (
		<CommandPrimitive.Input
			data-slot="command-input"
			className={cn("Palette__Input", className)}
			{...props}
		/>
	);
}

function CommandList({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={cn("Palette__List", className)}
			{...props}
		/>
	);
}

/**
 * The empty state. `◎` is the grammar's fallback mark and `↳` is its
 * proposition: *nothing here*, then *here is what to do*. A palette that prints
 * "No results found" and stops is a dead end; this one names the way out.
 */
function CommandEmpty({
	Mark = "NO RECORD",
	Line = "TRY A PART, A SECTION, OR A PAGE NAME",
	children,
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
	Mark?: string;

	Line?: string;
}) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={cn("Slip__Empty", className)}
			{...props}
		>
			{children ?? <SlipEmpty Mark={Mark} Line={Line} />}
		</CommandPrimitive.Empty>
	);
}

function CommandGroup({
	className,
	heading,
	children,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group> & {
	/** The register's name - `ROUTES`, `DOCUMENTATION`, `ACTIONS`. */
	heading?: string;
}) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn("Slip__Section", className)}
			{...props}
		>
			{heading ? <p className="Slip__Group">{heading}</p> : null}
			{children}
		</CommandPrimitive.Group>
	);
}

function CommandSeparator({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn("Slip__Rule-H", className)}
			{...props}
		/>
	);
}

function CommandItem({
	className,
	mark = "/",
	meta,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
	/** The leading glyph. `/` navigates, `→` acts. */
	mark?: string | undefined;

	/** The trailing cell - the section a page belongs to, a chord. */
	meta?: string | undefined;
}) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			data-mark={mark}
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		/>
	);
}

function CommandShortcut({
	className,
	children,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn("Slip__Meta", className)}
			{...props}
		>
			〈{children}〉
		</span>
	);
}

/**
 * The loading state, inside the list.
 *
 * cmdk owns selection and the list's scroll, so a loading body is drawn *in*
 * the list rather than over it: the same three ruled rows every other slip
 * holds open, at the same `2rem` pitch the results will land on, so the panel
 * does not jump when the register arrives. The head above it counts `LOADING`
 * (see `SlipHead.State`), which is the only honest thing a count can say while
 * the set is still being read.
 */
function CommandLoading({
	Rows = 3,
	Line,
	className,
	...props
}: React.ComponentProps<"div"> & {
	Rows?: number;

	Line?: string;
}) {
	return (
		<div data-slot="command-loading" className={className} {...props}>
			<SlipLoading
				Rows={Rows}
				{...(Line === undefined ? {} : { Line })}
			/>
		</div>
	);
}

/** The foot, for a command surface that is not the palette. */
function CommandFoot({
	Items,
	End,
	className,
	...props
}: React.ComponentProps<"div"> & {
	Items: readonly SlipFootItem[];

	End?: React.ReactNode;
}) {
	return (
		<div data-slot="command-foot" className={className} {...props}>
			<SlipFoot Items={Items} {...(End === undefined ? {} : { End })} />
		</div>
	);
}

/**
 * The modal arm: a scrim and a slip. `SlipScrim` is the site's overlay - ink at
 * 12 %, no blur - and the panel is the palette's own size, not the dialog's
 * generic one, because a palette is a document index opened wide and a centred
 * card is not that shape.
 */
function CommandDialog({
	title = "Find a record",
	description = "Search the site's parts, sections and pages.",
	children,
	...props
}: React.ComponentProps<typeof Dialog> & {
	title?: string;

	description?: string;
}) {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent className="Palette" close={false} bare>
				<Command label={title} shouldFilter={false}>
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
}

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandFoot,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandLoading,
	CommandSeparator,
	CommandShortcut,
};
