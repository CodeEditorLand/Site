"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

import * as React from "react";

import { SlipRegister, type SlipHead } from "./Slip";

import { cn } from "./Utility";

/**
 * ContextMenu - the menu a right-click opens, and the same slip a left-click
 * opens.
 *
 * A context menu is where a site most often stops being software: it is the
 * surface with no visible trigger, so the only thing that tells the reader it
 * belongs to this document is what it looks like. It is the same `.Slip` a
 * dropdown is - same register line, same row grammar, same states - because it is
 * the same object arriving by a different gesture.
 *
 * Radix owns the behaviour: the pointer position, arrow keys, Escape, focus
 * return. Nothing about it is restated here.
 */

function ContextMenu({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			{...props}
		/>
	);
}

function ContextMenuGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
	return (
		<ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
	);
}

function ContextMenuPortal({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
	return (
		<ContextMenuPrimitive.Portal
			data-slot="context-menu-portal"
			{...props}
		/>
	);
}

function ContextMenuSub({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
	return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			{...props}
		/>
	);
}

function ContextMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.SubTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset}
			data-meta="›"
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</ContextMenuPrimitive.SubTrigger>
	);
}

function ContextMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
	return (
		<ContextMenuPrimitive.SubContent
			data-slot="context-menu-sub-content"
			className={cn("Slip", className)}
			{...props}
		/>
	);
}

function ContextMenuContent({
	className,
	head,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content> & {
	/** The register line the slip opens with - `# RECORD / 04`. */
	head?: SlipHead | undefined;
}) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				data-slot="context-menu-content"
				aria-label={head?.Name}
				className={cn("Slip", className)}
				{...props}
			>
				{head ? <SlipRegister head={head} /> : null}
				{children}
			</ContextMenuPrimitive.Content>
		</ContextMenuPrimitive.Portal>
	);
}

function ContextMenuItem({
	className,
	inset,
	variant = "default",
	mark = "→",
	meta,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
	inset?: boolean;

	variant?: "default" | "destructive";

	/** The leading glyph. `→` acts, `/` navigates. */
	mark?: string | undefined;

	/** The trailing cell - a chord, a count, a STATUS word. */
	meta?: string | undefined;
}) {
	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			data-inset={inset}
			data-variant={variant}
			data-mark={mark}
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		/>
	);
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	meta,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> & {
	meta?: string | undefined;
}) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			data-meta={meta}
			className={cn("Slip__Row", className)}
			checked={checked ?? false}
			{...props}
		>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	);
}

function ContextMenuRadioItem({
	className,
	children,
	meta,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> & {
	meta?: string | undefined;
}) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</ContextMenuPrimitive.RadioItem>
	);
}

function ContextMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.Label
			data-slot="context-menu-label"
			data-inset={inset}
			className={cn("Slip__Group", className)}
			{...props}
		/>
	);
}

function ContextMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("Slip__Rule-H", className)}
			{...props}
		/>
	);
}

function ContextMenuShortcut({
	className,
	children,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn("Slip__Meta", className)}
			{...props}
		>
			〈{children}〉
		</span>
	);
}

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuGroup,
	ContextMenuPortal,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuRadioGroup,
};
