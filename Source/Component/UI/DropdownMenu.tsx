"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import * as React from "react";

import { SlipRegister, type SlipHead } from "./Slip";

import { cn } from "./Utility";

/**
 * DropdownMenu - the menu primitive, wearing the slip.
 *
 * Behaviour is Radix's and is not restated here: arrow keys, Home/End, typeahead,
 * Escape, outside-click, focus return to the trigger, the roving tabindex. What
 * this file decides is the *surface* and the *row grammar*, and it decides them
 * by handing the site's classes and two data attributes to the primitive:
 *
 *   `data-mark`  the row's leading glyph - `→` action, `/` route, `✓` current,
 *                `◎` unavailable. The stylesheet draws it in the reserved
 *                1.25rem column, so no caller can misalign a label.
 *   `data-meta`  the row's trailing cell - a chord, a section, a STATUS word.
 *
 * The attributes rather than spans are what let `asChild` keep working: an item
 * whose body is the caller's own `<a>` cannot have children injected into it, and
 * forking the primitive to add two spans is how five controls become five
 * grammars. See `Stylesheet/System/UI/_Item.scss`.
 */

/**
 * The register line a slip opens with: `# LOCALE / 05`.
 *
 * `SlipRegister` and the `SlipHead` shape live in `./Slip` with the rest of the
 * grammar's small parts, so the palette, the select and the menu print the same
 * line from one implementation.
 */

function DropdownMenu({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
	return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
	return (
		<DropdownMenuPrimitive.Portal
			data-slot="dropdown-menu-portal"
			{...props}
		/>
	);
}

function DropdownMenuTrigger({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	);
}

function DropdownMenuContent({
	className,
	sideOffset = 4,
	head,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
	/** The register line the slip opens with. Omitted only by a slip with no rows. */
	head?: SlipHead | undefined;
}) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				aria-label={head?.Name}
				className={cn("Slip", className)}
				{...props}
			>
				{head ? <SlipRegister head={head} /> : null}
			</DropdownMenuPrimitive.Content>
		</DropdownMenuPrimitive.Portal>
	);
}

function DropdownMenuGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return (
		<DropdownMenuPrimitive.Group
			data-slot="dropdown-menu-group"
			{...props}
		/>
	);
}

function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	mark = "→",
	meta,
	current,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean;

	variant?: "default" | "destructive";

	/** The leading glyph. `→` acts, `/` navigates. */
	mark?: string | undefined;

	/** The trailing cell - a chord, a count, a STATUS word. */
	meta?: string | undefined;

	/**
	 * This row is the value in force - the locale the reader is on, the route they
	 * are at. It draws the leading accent rule and the `✓` the stylesheet owns,
	 * rather than asking the caller to pick a colour class that only works on a
	 * white surface.
	 */
	current?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			data-mark={mark}
			data-meta={meta}
			data-current={current ? "true" : undefined}
			className={cn("Slip__Row", className)}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	meta,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
	meta?: string | undefined;
}) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			// No `data-mark`: an unchecked box has no mark, and the reserved column
			// keeps the label aligned with the rows that do. `✓` is drawn by
			// `[data-state="checked"]` in the stylesheet.
			data-meta={meta}
			className={cn("Slip__Row", className)}
			checked={checked ?? false}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

function DropdownMenuRadioItem({
	className,
	children,
	meta,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
	meta?: string | undefined;
}) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

/**
 * A label *inside* a slip - a register divider, not a row. It is the site's
 * `Slip__Group`: 13px, tracked, muted, with a rule above it when another group
 * precedes it. The kit's `font-medium px-2 py-1.5` is a row's metrics applied to
 * something that is not a row.
 */
function DropdownMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={cn("Slip__Group", className)}
			{...props}
		/>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("Slip__Rule-H", className)}
			{...props}
		/>
	);
}

/**
 * The shortcut cell. A chord is printed in the grammar's containment mark -
 * `〈⌘K〉` - so it is the same object the palette's foot uses, and a reader learns
 * the notation once.
 */
function DropdownMenuShortcut({
	className,
	children,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn("Slip__Meta", className)}
			{...props}
		>
			〈{children}〉
		</span>
	);
}

function DropdownMenuSub({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
	return (
		<DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
	);
}

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			data-meta="›"
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.SubTrigger>
	);
}

function DropdownMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			className={cn("Slip", className)}
			{...props}
		/>
	);
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
};
