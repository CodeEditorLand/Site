"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";

import * as React from "react";

import { DoorContext, UseDoorRef } from "./Overlay";

import { SlipEmpty, SlipRegister, type SlipHead } from "./Slip";

import { cn } from "./Utility";

/**
 * Menubar - the application's own bar, wearing the slip.
 *
 * ─── THE ONE CONTROL THAT CANNOT BE THE KIT ───────────────────────────────
 *
 * A menubar is the place a reader meets a *bar of menus* - the place a desktop
 * application is most recognisable - so it is the one place the document cannot
 * stop being itself. The kit's answer is a popover surface this site does not
 * have (`flat z-50 min-w-[12rem] overflow-hidden border bg-popover p-1
 * text-popover-foreground`) with `focus:bg-accent` on its rows; neither is a
 * material or a state this document prints.
 *
 * So it is the family's instrument: the bar is `.Menubar` (a ruled strip on the
 * card fill, one hairline under it, no fill of its own), the trigger is
 * `.Menubar__Trigger` with the row grammar's own hover wash and the accent rule
 * when its menu is open, the content is `.Slip`, and every row is `.Slip__Row`
 * with `data-mark` / `data-meta` exactly as a dropdown's rows are. Radix owns the
 * arrow keys between menus, the typeahead, the Escape and the focus return; the
 * bar owns its open state and the removed-trigger rule, because that state
 * belongs to the bar rather than to one menu (below).
 *
 * ─── WHY `head` IS ON THE CONTENT AND NOT ON THE BAR ──────────────────────
 *
 * The bar is a route strip; the menu is a slip. A slip opens with its register
 * line, so `# FILE / 07` belongs to the panel that opens, not to the strip that
 * holds the doors - the same split the header rail and the palette already
 * make.
 */

function Menubar({
	className,
	value,
	defaultValue,
	onValueChange,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
	const [Mirrored, SetMirrored] = React.useState<string>(defaultValue ?? "");

	/**
	 * The bar is controlled, always.
	 *
	 * `value` may be handed in by a caller, and the bar mirrors it when it is
	 * not - but the primitive is given the resolved value either way. Without
	 * that, the removed-trigger rule below could set the mirror to `""` and the
	 * bar would go on showing an open menu: a guard that writes a flag beside a
	 * surface it cannot close. Radix's menubar reads `value` as the open menu's
	 * name, so `""` is the closed bar.
	 */
	const IsOpen = value ?? Mirrored;

	const Close = React.useCallback(() => {
		SetMirrored("");

		onValueChange?.("");
	}, [onValueChange]);

	/**
	 * The removed-trigger rule, at the bar's scale.
	 *
	 * A menubar's open state belongs to the *bar*, not to a menu - Radix
	 * coordinates it across the triggers so moving from `FILE` to `EDIT` closes
	 * one and opens the other - so the family's per-door guard cannot be used
	 * here. The rule is the same one stated at the bar: while a menu is open, if
	 * the trigger that owns it has left the tree, close. The selector is Radix's
	 * own attribute (`data-state="open"`), not a site class, so this reads the
	 * primitive's contract rather than inventing a second one.
	 *
	 * The check is deferred by one frame. A menubar's most ordinary mutation is
	 * the *swap* - `FILE` closing and `EDIT` opening in the same commit - and a
	 * synchronous read can land between the two writes and see no open trigger
	 * at all. Reading on the next frame reads the settled tree, so the rule fires
	 * on a trigger that is really gone and never on one that is being replaced.
	 */
	React.useEffect(() => {
		if (!IsOpen || typeof MutationObserver === "undefined") return;

		let Frame = 0;

		const Settled = () => {
			Frame = 0;

			const Open = document.querySelector(
				'[data-slot="menubar-trigger"][data-state="open"]',
			);

			if (Open === null) Close();
		};

		const Observer = new MutationObserver(() => {
			if (Frame !== 0) return;

			Frame = requestAnimationFrame(Settled);
		});

		Observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			Observer.disconnect();

			if (Frame !== 0) cancelAnimationFrame(Frame);
		};
	}, [IsOpen, Close]);

	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cn("Menubar", className)}
			value={IsOpen}
			onValueChange={(Next) => {
				SetMirrored(Next);

				onValueChange?.(Next);
			}}
			{...props}
		/>
	);
}

/**
 * One menu in the bar.
 *
 * It provides no door of its own: a menubar's open state is the bar's (see
 * `Menubar` above), so the guard lives there and this stays a pass-through.
 * `DoorContext` keeps its `null` default here, so `MenubarTrigger`'s ref writes
 * nowhere - the slip has no single element it came through.
 */
function MenubarMenu({
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return (
		<MenubarPrimitive.Menu data-slot="menubar-menu" {...props}>
			{children}
		</MenubarPrimitive.Menu>
	);
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
	return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return (
		<MenubarPrimitive.RadioGroup
			data-slot="menubar-radio-group"
			{...props}
		/>
	);
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
	const Door = React.useContext(DoorContext);

	const Ref = UseDoorRef(Door);

	return (
		<MenubarPrimitive.Trigger
			ref={Ref}
			data-slot="menubar-trigger"
			className={cn("Menubar__Trigger", className)}
			{...props}
		/>
	);
}

function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	dense = false,
	head,
	empty,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Content> & {
	/** The tight rhythm - `data-density="dense"`, read by the row grammar. */
	dense?: boolean;

	/** The register line the menu opens with - `# FILE / 07`. */
	head?: SlipHead | undefined;

	/** The `empty` arm: a menu with no rows says so instead of opening blank. */
	empty?: { Mark?: string; Line: string } | undefined;
}) {
	return (
		<MenubarPortal>
			<MenubarPrimitive.Content
				data-slot="menubar-content"
				data-density={dense ? "dense" : undefined}
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				aria-label={head?.Name}
				className={cn("Slip", className)}
				{...props}
			>
				{head === undefined ? null : <SlipRegister head={head} />}

				{children}

				{empty === undefined ? null : (
					<SlipEmpty
						Mark={empty.Mark ?? "NO RECORD"}

						Line={empty.Line}
					/>
				)}
			</MenubarPrimitive.Content>
		</MenubarPortal>
	);
}

function MenubarItem({
	className,
	inset,
	variant = "default",
	mark = "→",
	meta,
	reason,
	current,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
	inset?: boolean;

	variant?: "default" | "destructive";

	/** The leading glyph. `→` acts, `/` navigates. */
	mark?: string | undefined;

	/** The trailing cell - a chord, a count, a STATUS word. */
	meta?: string | undefined;

	/** Why the row cannot be used, printed in the meta cell. */
	reason?: string | undefined;

	/** This row is the value in force. */
	current?: boolean;
}) {
	return (
		<MenubarPrimitive.Item
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			data-mark={mark}
			data-meta={meta}
			data-reason={reason}
			data-current={current ? "true" : undefined}
			className={cn("Slip__Row", className)}
			{...props}
		/>
	);
}

function MenubarCheckboxItem({
	className,
	children,
	checked,
	meta,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & {
	meta?: string | undefined;
}) {
	return (
		<MenubarPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			data-meta={meta}
			className={cn("Slip__Row", className)}
			checked={checked ?? false}
			{...props}
		>
			{children}
		</MenubarPrimitive.CheckboxItem>
	);
}

function MenubarRadioItem({
	className,
	children,
	meta,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & {
	meta?: string | undefined;
}) {
	return (
		<MenubarPrimitive.RadioItem
			data-slot="menubar-radio-item"
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</MenubarPrimitive.RadioItem>
	);
}

function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.Label
			data-slot="menubar-label"
			data-inset={inset}
			className={cn("Slip__Group", className)}
			{...props}
		/>
	);
}

function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
	return (
		<MenubarPrimitive.Separator
			data-slot="menubar-separator"
			className={cn("Slip__Rule-H", className)}
			{...props}
		/>
	);
}

/**
 * The shortcut cell. A chord is printed in the grammar's containment mark -
 * `〈⌘S〉` - in the row's meta cell, the same notation the dropdown's shortcut and
 * the palette's foot print, so a reader learns it once.
 */
function MenubarShortcut({
	className,
	children,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cn("Slip__Meta", className)}
			{...props}
		>
			〈{children}〉
		</span>
	);
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.SubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			data-meta="›"
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</MenubarPrimitive.SubTrigger>
	);
}

function MenubarSubContent({
	className,
	head,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent> & {
	/** The register line, carrying the path that got here - `# FILE ↳ NEW / 03`. */
	head?: SlipHead | undefined;
}) {
	return (
		<MenubarPrimitive.SubContent
			data-slot="menubar-sub-content"
			aria-label={head?.Name}
			className={cn("Slip", className)}
			{...props}
		>
			{head === undefined ? null : <SlipRegister head={head} />}
			{children}
		</MenubarPrimitive.SubContent>
	);
}

export {
	Menubar,
	MenubarPortal,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarGroup,
	MenubarSeparator,
	MenubarLabel,
	MenubarItem,
	MenubarShortcut,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
};
