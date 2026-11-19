"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";

import {
	Groups,
	InGroup,
	type OverlayKind,
	type Specimen,
} from "../../Content/Specimen/Overlay.js";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../UI/Command";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../UI/ContextMenu";

import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../UI/Dialog";

import { Drawer, DrawerContent, DrawerTrigger } from "../UI/Drawer";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../UI/DropdownMenu";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../UI/HoverCard";

import { IconTooltip } from "../UI/IconTooltip";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "../UI/Menubar";

import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";

import { Sheet, SheetContent, SheetTrigger } from "../UI/Sheet";

import { Chord, SlipEmpty, SlipNote } from "../UI/Slip";

/**
 * SpecimenOverlay - the overlay family, printed live: the matrix's rows, the
 * dismissal contract, and every state the site never showed.
 *
 * ─── WHY EVERY ROW IS A REAL SLIP ────────────────────────────────────────
 * The sheet's doctrine: a part with states is shown with its states, because a
 * screenshot of a component cannot be composed with. An overlay makes that
 * argument stronger than any other part - an overlay at rest is a button, and
 * the entire subject is the two seconds after the click. So every row here
 * mounts the real primitive, and the reader opens it, dismisses it, opens it
 * again from a different scroll position, and watches what happens.
 *
 * ─── ONE ISLAND, NOT THIRTY ──────────────────────────────────────────────
 * Thirty-one rows mounted as thirty-one islands would be thirty-one hydration
 * roots on one page. The page mounts this component once with `client:visible`,
 * and every row is its child - so the family's whole specimen costs one island.
 *
 * ─── THE RENDERER DECIDES NOTHING ────────────────────────────────────────
 * `Content/Specimen/Overlay.ts` states what each row is, which part it
 * exercises, when that state is right, and which arm mounts it. This file maps
 * a row to an arm. A state added to the data appears here with no edit.
 *
 * ─── THE ONE ROW THAT REMOVES ITS OWN DOOR ───────────────────────────────
 * `TRIGGER REMOVED`. The state cannot be faked with a class: the guard watches
 * the tree. So the row's trigger unmounts itself 900 ms after the menu opens,
 * and the reader watches the slip close on its own. That is the only honest way
 * to print a rule about a trigger that is gone.
 */

/* ─── THE ROWS THE SLIPS HOLD ────────────────────────────────────────────── */

/** A route row: `/` a destination, `→` an action. */
const Routes = [
	{ Mark: "/", Label: "THE RECORD", Meta: "SHEET 01" },

	{ Mark: "/", Label: "THE INSTRUMENT", Meta: "SHEET 02" },

	{ Mark: "/", Label: "THE APPENDIX", Meta: "SHEET 03" },

	{ Mark: "→", Label: "COPY THE ADDRESS", Meta: "〈⌘L〉" },
] as const;

/** The rows a panel's body holds, at the ledger's rhythm. */
const Facts = [
	{ Key: "STATUS:", Value: "VERIFIED" },

	{ Key: "LICENSE:", Value: "CC0" },

	{ Key: "TARGET:", Value: "MACOS\u2001WINDOWS\u2001LINUX" },

	{ Key: "CHANNEL:", Value: "PUBLIC" },
] as const;

/** Forty rows - the "too much" arm, at a count a reader can feel. */
const Many = Array.from({ length: 40 }, (_, Index) => ({
	Mark: Index % 4 === 0 ? "→" : "/",
	Label: `RECORD_${String(Index + 1).padStart(2, "0")}`,
	Meta: `SHEET ${String((Index % 9) + 1).padStart(2, "0")}`,
}));

/** Sixty rows - the dialog that outgrows the viewport. */
const Tall = Array.from({ length: 60 }, (_, Index) => ({
	Key: `ROW_${String(Index + 1).padStart(2, "0")}:`,
	Value: Index % 7 === 0 ? "UNAVAILABLE" : `VALUE\u2001${Index + 1}`,
}));

/* ─── SMALL PARTS ────────────────────────────────────────────────────────── */

/** A ledger: `KEY:` at the mute, the value at ink, on the row rhythm. */
const Ledger = ({
	Rows,
}: {
	Rows: readonly { Key: string; Value: string }[];
}) => (
	<dl className="specimen-overlay__ledger">
		{Rows.map((Row) => (
			<div className="specimen-overlay__ledger-row" key={Row.Key}>
				<dt>{Row.Key}</dt>
				<dd>{Row.Value}</dd>
			</div>
		))}
	</dl>
);

/** The door: the button that opens a slip, in the specimen's own voice. */
const Door = ({
	Label,
	children,
	ref,
	...props
}: {
	Label: string;

	children?: ReactNode;

	ref?: React.Ref<HTMLButtonElement>;
} & React.ComponentProps<"button">) => (
	<button
		type="button"
		className="specimen-overlay__door"
		ref={ref}
		{...props}
	>
		<span className="specimen-overlay__door-label">{Label}</span>
		<span className="specimen-overlay__door-mark" aria-hidden="true">
			→
		</span>
		{children}
	</button>
);

/** The body a panel holds when it is not in an adverse state. */
const PanelBody = () => (
	<>
		<DialogHeader>
			<DialogTitle>A record, opened</DialogTitle>
			<DialogDescription>
				One white insert on the creme field: a register line, a body
				that scrolls, and a foot that states the keyboard path.
			</DialogDescription>
		</DialogHeader>

		<SlipNote>
			The panel is the slip at modal scale - the same frame, the same
			radius 0, the same 120 ms arrival a menu has.
		</SlipNote>

		<Ledger Rows={Facts} />
	</>
);

/* ─── THE STAGE ──────────────────────────────────────────────────────────── */

/**
 * One row's specimen.
 *
 * Every arm is the real component. The switch exists because thirty-one arms
 * are thirty-one prop sets, not because any of them is simulated.
 */
const Stage = ({ Row }: { Row: Specimen }) => {
	/* The orphan arm's own state: the door unmounts while the menu is open. */
	const [Gone, SetGone] = useState(false);

	const Timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const OnOrphanOpen = useCallback((Next: boolean) => {
		if (Timer.current) clearTimeout(Timer.current);

		if (!Next) {
			SetGone(false);

			return;
		}

		Timer.current = setTimeout(() => SetGone(true), 900);
	}, []);

	useEffect(
		() => () => {
			if (Timer.current) clearTimeout(Timer.current);
		},

		[],
	);

	const Kind: OverlayKind = Row.kind;

	switch (Kind) {
		/* ─── THE DIALOG ────────────────────────────────────────────────── */

		case "dialog":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						head={{ Name: "RECORD", Count: 4 }}
						foot={[
							{ Chord: "ESC", Label: "CLOSE" },
							{ Chord: "TAB", Label: "STAY INSIDE" },
						]}
					>
						<PanelBody />
					</DialogContent>
				</Dialog>
			);

		case "dialog-loading":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						head={{ Name: "RECORD", Count: 4 }}
						state="loading"
					>
						<Ledger Rows={Facts} />
					</DialogContent>
				</Dialog>
			);

		case "dialog-error":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						head={{ Name: "RECORD", Count: 4 }}
						state="error"
						error={{
							Line: "The record could not be written.",
							Cause: "THE DISK ANSWERED \u2001READ-ONLY\u2001",
							Next: "GRANT WRITE ACCESS, THEN TRY AGAIN",
							OnRetry: () => undefined,
						}}
					>
						<Ledger Rows={Facts.slice(0, 2)} />
					</DialogContent>
				</Dialog>
			);

		case "dialog-empty":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						head={{ Name: "RECORD", Count: 0 }}
						state="empty"
						empty={{
							Mark: "NO RECORD",
							Line: "NOTHING HAS BEEN FILED UNDER THIS MARK",
						}}
					/>
				</Dialog>
			);

		case "dialog-tall":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						head={{ Name: "RECORD", Count: Tall.length }}
						foot={[
							{ Chord: "ESC", Label: "CLOSE" },
							{ Chord: "↑↓", Label: "SCROLL THE BODY" },
						]}
					>
						<DialogHeader>
							<DialogTitle>Sixty rows</DialogTitle>
							<DialogDescription>
								The head and the foot pin; the body is the only
								thing that scrolls.
							</DialogDescription>
						</DialogHeader>

						<Ledger Rows={Tall} />
					</DialogContent>
				</Dialog>
			);

		case "dialog-narrow":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						size="sm"
						head={{ Name: "CONFIRM", Count: 1 }}
						foot={[{ Chord: "ESC", Label: "CANCEL" }]}
					>
						<DialogHeader>
							<DialogTitle>Discard the draft?</DialogTitle>
							<DialogDescription>
								The record has not been written. Closing now
								loses the last edit.
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

		case "dialog-full":
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent
						size="full"
						head={{ Name: "MATRIX", Count: 8 }}
						foot={[{ Chord: "ESC", Label: "CLOSE" }]}
					>
						<DialogHeader>
							<DialogTitle>
								The sheet, at the viewport's width
							</DialogTitle>
							<DialogDescription>
								`full` is bounded by the viewport minus the page
								gutter, so it cannot overflow at 360px.
							</DialogDescription>
						</DialogHeader>

						<Ledger Rows={Tall.slice(0, 8)} />
					</DialogContent>
				</Dialog>
			);

		/* ─── THE SHEET AND THE DRAWER ──────────────────────────────────── */

		case "sheet":
			return (
				<Sheet>
					<SheetTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</SheetTrigger>

					<SheetContent
						side="right"
						head={{ Name: "CONTENTS", Count: Routes.length }}
						foot={[{ Chord: "ESC", Label: "CLOSE" }]}
					>
						<DialogHeader>
							<DialogTitle>
								The contents, beside the page
							</DialogTitle>
							<DialogDescription>
								A sheet is the slip anchored to an edge: one
								border, on the edge that faces the page.
							</DialogDescription>
						</DialogHeader>

						<Ledger
							Rows={Routes.map((Route) => ({
								Key: Route.Mark,
								Value: Route.Label,
							}))}
						/>
					</SheetContent>
				</Sheet>
			);

		case "drawer":
			return (
				<Drawer>
					<DrawerTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DrawerTrigger>

					<DrawerContent
						head={{ Name: "RECORD", Count: 2 }}
						foot={[
							{ Chord: "ESC", Label: "CLOSE" },
							{ Chord: "↓", Label: "DRAG AWAY" },
						]}
					>
						<DialogHeader>
							<DialogTitle>Thrown away, not closed</DialogTitle>
							<DialogDescription>
								vaul owns the drag; the grip is the site's,
								drawn as a ruled cap rather than a muted pill.
							</DialogDescription>
						</DialogHeader>

						<Ledger Rows={Facts.slice(0, 2)} />
					</DrawerContent>
				</Drawer>
			);

		/* ─── THE POPOVER ───────────────────────────────────────────────── */

		case "popover":
			return (
				<Popover>
					<PopoverTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</PopoverTrigger>

					<PopoverContent
						head={{ Name: "FIGURE", Count: 1 }}
						note="The figure is the record's own, read at build time."
						foot={[{ Chord: "ESC", Label: "CLOSE" }]}
					>
						<p className="specimen-overlay__figure">
							<span className="specimen-overlay__figure-value">
								03
							</span>
							<span className="specimen-overlay__figure-unit">
								PLATFORMS
							</span>
						</p>

						<Ledger Rows={Facts.slice(0, 2)} />
					</PopoverContent>
				</Popover>
			);

		case "popover-loading":
			return (
				<Popover>
					<PopoverTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</PopoverTrigger>

					<PopoverContent
						head={{ Name: "FIGURE", Count: 1 }}
						state="loading"
					>
						<p className="specimen-overlay__figure">
							<span className="specimen-overlay__figure-value">
								03
							</span>
							<span className="specimen-overlay__figure-unit">
								PLATFORMS
							</span>
						</p>
					</PopoverContent>
				</Popover>
			);

		case "popover-error":
			return (
				<Popover>
					<PopoverTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</PopoverTrigger>

					<PopoverContent
						head={{ Name: "FIGURE", Count: 1 }}
						state="error"
						error={{
							Line: "The figure could not be read.",
							Cause: "THE REGISTER ANSWERED \u2001UNAVAILABLE\u2001",
							Next: "READ THE RECORD'S OWN PAGE",
							OnRetry: () => undefined,
						}}
					/>
				</Popover>
			);

		case "popover-edge":
			return (
				<div className="specimen-overlay__edge">
					<Popover>
						<PopoverTrigger asChild>
							<Door Label={Row.door ?? "OPEN"} />
						</PopoverTrigger>

						<PopoverContent
							align="end"
							side="bottom"
							collisionPadding={16}
							head={{ Name: "FIGURE", Count: 1 }}
							note="Opened at the right edge, the slip is pulled inside the paper by the collision padding rather than clipped by the viewport."
						>
							<Ledger Rows={Facts.slice(0, 2)} />
						</PopoverContent>
					</Popover>
				</div>
			);

		/* ─── THE HOVER CARD ────────────────────────────────────────────── */

		case "hover":
			return (
				<HoverCard>
					<HoverCardTrigger asChild>
						<Door Label={Row.door ?? "HOVER"} />
					</HoverCardTrigger>

					<HoverCardContent
						head={{ Name: "TERM", Count: 1 }}
						note="A gloss, not an action: the card appears on a pause and leaves when the pointer does."
					>
						<p className="specimen-overlay__prose">
							A slip is the site&apos;s one control surface - the
							smallest white insert that can lie on the creme
							field.
						</p>
					</HoverCardContent>
				</HoverCard>
			);

		case "hover-long":
			return (
				<HoverCard>
					<HoverCardTrigger asChild>
						<Door Label={Row.door ?? "HOVER"} />
					</HoverCardTrigger>

					<HoverCardContent
						head={{ Name: "TERM", Count: 2 }}
						note="Two paragraphs, capped at 24rem wide and 22rem tall."
					>
						<p className="specimen-overlay__prose">
							The close delay is 120 ms so the pointer can travel
							from the trigger into the card. A card whose text
							cannot be reached is a card that cannot be read.
						</p>

						<p className="specimen-overlay__prose">
							The card caps its own height and scrolls inside it,
							because a hover card that grew past the fold would
							be one the reader cannot leave by moving down.
						</p>
					</HoverCardContent>
				</HoverCard>
			);

		/* ─── THE CAPS ──────────────────────────────────────────────────── */

		case "tip":
			return (
				<span className="specimen-overlay__glyph">
					<IconTooltip Label="Local-first">
						<span
							className="specimen-overlay__glyph-mark"
							aria-hidden="true"
						>
							◎
						</span>
					</IconTooltip>
				</span>
			);

		case "tip-lines":
			return (
				<span className="specimen-overlay__glyph">
					<IconTooltip
						Label={["LOCAL-FIRST", "NO ACCOUNT", "NO TELEMETRY"]}
					>
						<span
							className="specimen-overlay__glyph-mark"
							aria-hidden="true"
						>
							◇
						</span>
					</IconTooltip>
				</span>
			);

		case "tip-detail":
			return (
				<span className="specimen-overlay__glyph">
					<IconTooltip
						Label="gRPC"
						Head={{ Name: "PROTOCOL", Count: 4 }}
						Note="One of the four the protocol spine carries."
						Detail={
							<Ledger
								Rows={[
									{ Key: "SPINE:", Value: "gRPC" },
									{ Key: "INK:", Value: "#22C55E" },
								]}
							/>
						}
					>
						<span
							className="specimen-overlay__glyph-mark"
							aria-hidden="true"
						>
							◆
						</span>
					</IconTooltip>
				</span>
			);

		case "tip-unavailable":
			return (
				<span className="specimen-overlay__glyph">
					<IconTooltip Label="Signing" State="unavailable">
						<span
							className="specimen-overlay__glyph-mark"
							aria-hidden="true"
						>
							◌
						</span>
					</IconTooltip>
				</span>
			);

		/* ─── THE MENUS ─────────────────────────────────────────────────── */

		case "context":
			return (
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<div className="specimen-overlay__region">
							<span
								className="specimen-overlay__region-mark"
								aria-hidden="true"
							>
								/
							</span>
							<span>{Row.door ?? "RIGHT-CLICK THIS ROW"}</span>
						</div>
					</ContextMenuTrigger>

					<ContextMenuContent
						head={{ Name: "RECORD", Count: 4 }}
						foot={[{ Chord: "ESC", Label: "CLOSE" }]}
					>
						{Routes.map((Route) => (
							<ContextMenuItem
								key={Route.Label}

								mark={Route.Mark}

								meta={Route.Meta}
							>
								{Route.Label}
							</ContextMenuItem>
						))}
					</ContextMenuContent>
				</ContextMenu>
			);

		case "context-empty":
			return (
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<div className="specimen-overlay__region">
							<span
								className="specimen-overlay__region-mark"
								aria-hidden="true"
							>
								◎
							</span>
							<span>{Row.door ?? "RIGHT-CLICK: NO ACTIONS"}</span>
						</div>
					</ContextMenuTrigger>

					<ContextMenuContent
						head={{ Name: "RECORD", Count: 0 }}
						empty={{
							Mark: "NO ACTION",
							Line: "THIS REGION HOLDS NO ROW THAT CAN BE ACTED ON",
						}}
					/>
				</ContextMenu>
			);

		case "menu":
			return (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align="start"
						head={{ Name: "LOCALE", Count: 5 }}
						foot={[{ Chord: "↑↓", Label: "MOVE" }]}
					>
						<DropdownMenuItem current>ENGLISH</DropdownMenuItem>
						<DropdownMenuItem>DEUTSCH</DropdownMenuItem>
						<DropdownMenuItem>ESPANOL</DropdownMenuItem>
						<DropdownMenuItem disabled reason="UNAVAILABLE">
							JAPANESE
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem mark="→" meta="〈⌘L〉">
							COPY THE ADDRESS
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

		case "menu-sub":
			return (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DropdownMenuTrigger>

					<DropdownMenuContent head={{ Name: "FILE", Count: 3 }}>
						<DropdownMenuItem>NEW</DropdownMenuItem>

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								EXPORT
							</DropdownMenuSubTrigger>

							<DropdownMenuSubContent
								head={{
									Name: "EXPORT",
									Trail: ["FILE"],
									Count: 3,
								}}
							>
								<DropdownMenuItem>AS RECORD</DropdownMenuItem>

								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										AS FIGURE
									</DropdownMenuSubTrigger>

									<DropdownMenuSubContent
										head={{
											Name: "FIGURE",
											Trail: ["FILE", "EXPORT"],
											Count: 2,
										}}
									>
										<DropdownMenuItem>SVG</DropdownMenuItem>
										<DropdownMenuItem>PNG</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>
			);

		case "menu-empty":
			return (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DropdownMenuTrigger>

					<DropdownMenuContent
						head={{ Name: "LOCALE", Count: 0 }}
						empty={{
							Mark: "NO RECORD",
							Line: "NO LOCALE IS FILED FOR THIS BUILD",
						}}
					/>
				</DropdownMenu>
			);

		case "menu-many":
			return (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DropdownMenuTrigger>

					<DropdownMenuContent
						head={{ Name: "RECORD", Count: Many.length }}
					>
						{Many.map((RowValue) => (
							<DropdownMenuItem
								key={RowValue.Label}

								mark={RowValue.Mark}

								meta={RowValue.Meta}
							>
								{RowValue.Label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			);

		case "menu-orphan":
			return (
				<div className="specimen-overlay__orphan">
					<DropdownMenu modal={false} onOpenChange={OnOrphanOpen}>
						<DropdownMenuTrigger asChild>
							{/* The door removes itself 900 ms after the menu opens. */}
							{Gone ? (
								<span className="specimen-overlay__gone">
									◎ THE DOOR IS GONE
								</span>
							) : (
								<Door Label={Row.door ?? "OPEN"} />
							)}
						</DropdownMenuTrigger>

						<DropdownMenuContent
							head={{ Name: "RECORD", Count: 2 }}
						>
							<DropdownMenuItem>/THE RECORD</DropdownMenuItem>
							<DropdownMenuItem>/THE APPENDIX</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);

		/* ─── THE MENUBAR ───────────────────────────────────────────────── */

		case "menubar":
			return (
				<Menubar>
					<MenubarMenu value="file">
						<MenubarTrigger>FILE</MenubarTrigger>

						<MenubarContent head={{ Name: "FILE", Count: 3 }}>
							<MenubarItem>NEW</MenubarItem>
							<MenubarItem mark="/">OPEN</MenubarItem>
							<MenubarSeparator />
							<MenubarItem disabled reason="READ-ONLY">
								SAVE
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu value="edit">
						<MenubarTrigger>EDIT</MenubarTrigger>

						<MenubarContent head={{ Name: "EDIT", Count: 2 }}>
							<MenubarItem>UNDO</MenubarItem>
							<MenubarItem>REDO</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu value="view">
						<MenubarTrigger>VIEW</MenubarTrigger>

						<MenubarContent head={{ Name: "VIEW", Count: 2 }}>
							<MenubarItem current>DENSE</MenubarItem>
							<MenubarItem>COMFORTABLE</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			);

		case "menubar-sub":
			return (
				<Menubar>
					<MenubarMenu value="file">
						<MenubarTrigger>FILE</MenubarTrigger>

						<MenubarContent head={{ Name: "FILE", Count: 2 }}>
							<MenubarItem>NEW</MenubarItem>

							<MenubarSub>
								<MenubarSubTrigger>EXPORT</MenubarSubTrigger>

								<MenubarSubContent
									head={{
										Name: "EXPORT",
										Trail: ["FILE"],
										Count: 2,
									}}
								>
									<MenubarItem>AS RECORD</MenubarItem>
									<MenubarItem>AS FIGURE</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			);

		/* ─── THE COMMAND PALETTE ───────────────────────────────────────── */

		case "command":
		case "command-loading":
		case "command-empty": {
			const Loading = Kind === "command-loading";

			const Empty = Kind === "command-empty";

			const Count = Empty || Loading ? 0 : Routes.length;

			return (
				<Dialog>
					<DialogTrigger asChild>
						<Door Label={Row.door ?? "OPEN"} />
					</DialogTrigger>

					<DialogContent className="Palette" close={false} bare>
						<DialogTitle className="sr-only">The index</DialogTitle>
						<DialogDescription className="sr-only">
							The specimen&apos;s own register, printed in the
							palette&apos;s body.
						</DialogDescription>

						<Command shouldFilter={false} label="The index">
							<div className="Palette__Head">
								<span className="Slip__Mark" aria-hidden="true">
									#
								</span>
								<span className="Slip__Name" aria-hidden="true">
									FIND
								</span>
								<span className="Slip__Rule" aria-hidden="true">
									/
								</span>
								<span
									className="Palette__Count"
									data-empty={Count === 0}
									aria-hidden="true"
								>
									{Loading
										? "LOADING"
										: String(Count).padStart(2, "0")}
								</span>

								<CommandInput
									placeholder="a part, a section, a record, a word"
									aria-label="Filter the index"
								/>
							</div>

							<CommandList>
								{Empty ? (
									<CommandEmpty>
										<SlipEmpty
											Mark="NO RECORD"
											Line="TRY A PART, A SECTION, A RECORD, OR A WORD"
										/>
									</CommandEmpty>
								) : null}

								{Loading ? (
									<>
										<div
											className="Slip__Loading"
											aria-hidden="true"
										>
											<p className="Slip__Skeleton">
												<span className="Slip__SkeletonMark">
													#
												</span>
												<span
													className="Slip__SkeletonBar"
													style={{
														inlineSize: "92%",
													}}
												/>
												<span className="Slip__SkeletonMeta" />
											</p>
											<p className="Slip__Skeleton">
												<span className="Slip__SkeletonMark">
													#
												</span>
												<span
													className="Slip__SkeletonBar"
													style={{
														inlineSize: "74%",
													}}
												/>
												<span className="Slip__SkeletonMeta" />
											</p>
										</div>
										<p className="Slip__EmptyLine">
											<span aria-hidden="true">↳</span>
											<span>
												THE REGISTER IS BEING READ
											</span>
										</p>
									</>
								) : null}

								{!Empty && !Loading ? (
									<CommandGroup heading="ROUTES">
										{Routes.map((Route) => (
											<CommandItem
												key={Route.Label}

												value={Route.Label}

												mark={Route.Mark}

												meta={Route.Meta}
											>
												{Route.Label}
											</CommandItem>
										))}
									</CommandGroup>
								) : null}
							</CommandList>

							<div className="Slip__Foot">
								<span className="Slip__FootItem">
									<Chord>↑↓</Chord>
									<span>MOVE</span>
								</span>
								<span className="Slip__FootItem">
									<Chord>ENTER</Chord>
									<span>OPEN</span>
								</span>
								<span className="Slip__FootItem">
									<Chord>ESC</Chord>
									<span>CLOSE</span>
								</span>
							</div>
						</Command>
					</DialogContent>
				</Dialog>
			);
		}

		default:
			return null;
	}
};

/* ─── THE ROW ────────────────────────────────────────────────────────────── */

/** One labelled row: the state, the part, when it is right, and the specimen. */
const RowView = ({ Row }: { Row: Specimen }) => (
	<article className="specimen-overlay__row" id={`overlay-${Row.mark}`}>
		<header className="specimen-overlay__spec">
			<p className="specimen-overlay__mark">
				<span
					className="specimen-overlay__mark-hash"
					aria-hidden="true"
				>
					#
				</span>
				{Row.mark}
			</p>

			<h3 className="specimen-overlay__state">{Row.state}</h3>

			<p className="specimen-overlay__part">{Row.component}</p>

			<p className="specimen-overlay__when">{Row.when}</p>
		</header>

		<div className="specimen-overlay__stage">
			<Stage Row={Row} />
		</div>
	</article>
);

export const SpecimenOverlay = () => (
	<div className="specimen-overlay">
		{Groups.map((Group) => (
			<section className="specimen-overlay__group" key={Group.key}>
				<p className="specimen-overlay__group-head">
					<span className="specimen-overlay__group-kicker">
						{Group.label}
					</span>
					<span className="specimen-overlay__group-count">
						{InGroup(Group.key).length}
					</span>
				</p>

				<p className="specimen-overlay__group-note">{Group.note}</p>

				<div className="specimen-overlay__rows">
					{InGroup(Group.key).map((Entry) => (
						<RowView Row={Entry} key={Entry.mark} />
					))}
				</div>
			</section>
		))}
	</div>
);

export default SpecimenOverlay;
