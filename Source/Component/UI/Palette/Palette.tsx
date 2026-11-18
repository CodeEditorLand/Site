"use client";

import * as React from "react";

import { Chord, Segmented, SlipEmpty } from "../Slip";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../Command";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../Dialog";

import { FilterEntries } from "./Match";

import type { PaletteEntry, PaletteRegister, PaletteScope } from "./Type";

/**
 * The command palette - the site's index, opened by a chord.
 *
 * ─── WHAT IT IS: A ROUTE INDEX, NOT A SEARCH BOX ────────────────────────────
 *
 * This is a documentation site about an editor, so the reader's question is *take
 * me to the page about X*, not *search my words*. Every row is a `/` destination
 * or a `→` action, never a snippet, never a "0 results on this site" apology.
 * That decision is why the palette has no content index behind it: a static site
 * that offers to search prose and then finds nothing has made a promise it cannot
 * keep, and the manual's own pages are the index.
 *
 * ─── THE TWO REGISTERS ARE THE SITE'S OWN ───────────────────────────────────
 *
 * `ROUTES` is `FrameSections` - the ten parts the running head prints and the
 * margin rail indexes. The manual's groups are the same `DocSection[]` tree the
 * rail renders. One source each, so the palette and the furniture around it can
 * never disagree about what the site contains.
 *
 * ─── THE COUNT IS LIVE, AND IT IS PRINTED IN THE GRAMMAR ────────────────────
 *
 * `# FIND / 03`. The head of a slip prints its own record header; here the number
 * is what the current query and scope matched, in the grammar's two digits. A
 * palette that says "3 results" is a search field; a palette that says
 * `# FIND / 03` is this document's index.
 *
 * ─── THE KEYBOARD PATH, STATED ──────────────────────────────────────────────
 *
 * `⌘K` / `Ctrl+K` opens and closes. `↑↓` move, `Home`/`End` jump, `Enter` opens,
 * `Esc` closes and returns focus to whatever opened it. Every one of those is
 * Radix Dialog's or cmdk's - the palette adds nothing to the model, and states it
 * in the foot so a reader who has never used it can use it.
 */

const Scopes: readonly { Value: PaletteScope; Label: string }[] = [
	{ Value: "all", Label: "ALL" },
	{ Value: "doc", Label: "DOC" },
	{ Value: "site", Label: "SITE" },
];

const IsApple = () =>
	typeof navigator !== "undefined" &&
	/^Mac|iPhone|iPad/.test(navigator.platform ?? "");

/** Two digits, as the grammar prints a count. */
const Pad = (Value: number) => String(Value).padStart(2, "0");

const Navigate = (Href: string) => {
	try {
		window.location.assign(Href);
	} catch {
		// A document with no navigable location (a test runner, a preview frame)
		// still gets the row's own `<a href>`, which is the real destination.
	}
};

const Row = ({
	Entry,
	OnNavigate,
}: {
	Entry: PaletteEntry;
	OnNavigate: (Href: string) => void;
}) => (
	<CommandItem
		key={Entry.Id}
		value={`${Entry.Id} ${Entry.Label}`}
		mark={Entry.Kind === "action" ? "→" : "/"}
		meta={
			Entry.Meta ??
			(Entry.Kind === "route" ? Entry.Part : Entry.Section) ??
			undefined
		}
		onSelect={() => OnNavigate(Entry.Href ?? "/")}
	>
		{Entry.Label}
	</CommandItem>
);

export interface PaletteProps {
	Register: PaletteRegister;

	/** A test or a preview hands in its own navigation; the site never does. */
	OnNavigate?: ((Href: string) => void) | undefined;
}

const Palette = ({ Register, OnNavigate }: PaletteProps) => {
	const [Open, SetOpen] = React.useState(false);
	const [Query, SetQuery] = React.useState("");
	const [Scope, SetScope] = React.useState<PaletteScope>("all");
	const [Copied, SetCopied] = React.useState(false);
	const [Modifier, SetModifier] = React.useState("⌘K");

	// A mirror of `Open` for the document-level key listener, which must not be
	// torn down and rebuilt every time the palette opens.
	const OpenRef = React.useRef(Open);

	React.useEffect(() => {
		OpenRef.current = Open;
	}, [Open]);

	const CopyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const TriggerRef = React.useRef<HTMLButtonElement | null>(null);

	/**
	 * Where focus goes when the palette closes.
	 *
	 * Radix restores focus to a `DialogTrigger` it owns, and this palette's door is
	 * a sibling button rather than a trigger - so the rule is stated here: return to
	 * whatever had focus when the palette opened, and fall back to the trigger when
	 * that was the document body (a chord pressed with nothing focused). Dismissal
	 * that dumps the reader at the top of the document is dismissal they have to
	 * recover from.
	 */
	const ReturnRef = React.useRef<HTMLElement | null>(null);

	const OnOpenChange = React.useCallback((Next: boolean) => {
		SetOpen(Next);

		if (Next) return;

		const Target = ReturnRef.current;

		// A tick, because Radix's own close-autofocus runs after this render and
		// would otherwise land on the body and undo the return.
		setTimeout(() => {
			if (
				Target &&
				document.contains(Target) &&
				Target !== document.body
			) {
				Target.focus();
			} else {
				TriggerRef.current?.focus();
			}
		}, 0);
	}, []);

	// The chord is printed, not guessed at render: the first client render must
	// match the server's, or hydration flips the cap in front of the reader.
	React.useEffect(() => {
		SetModifier(IsApple() ? "⌘K" : "CTRL K");
	}, []);

	const OpenWith = React.useCallback((Next?: string) => {
		if (typeof Next === "string") SetQuery(Next);

		ReturnRef.current = document.activeElement as HTMLElement | null;

		SetOpen(true);
	}, []);

	// The chord. One listener for the whole document, because the palette is one
	// control on every page rather than a widget per surface.
	React.useEffect(() => {
		const OnKey = (Event: KeyboardEvent) => {
			if (Event.key.toLowerCase() !== "k") return;

			if (!Event.metaKey && !Event.ctrlKey) return;

			Event.preventDefault();

			if (OpenRef.current) {
				OnOpenChange(false);
			} else {
				OpenWith();
			}
		};

		window.addEventListener("keydown", OnKey);

		return () => window.removeEventListener("keydown", OnKey);
	}, [OnOpenChange, OpenWith]);

	// The rail's handoff: a local index that found nothing opens the global one
	// with the same query. `detail.query` is the reader's words, unchanged.
	React.useEffect(() => {
		const OnOpen = (Event: Event) => {
			const Detail = (Event as CustomEvent<{ query?: string }>).detail;

			OpenWith(Detail?.query);
		};

		window.addEventListener("palette:open", OnOpen);

		return () => window.removeEventListener("palette:open", OnOpen);
	}, [OpenWith]);

	React.useEffect(
		() => () => {
			if (CopyTimer.current) clearTimeout(CopyTimer.current);
		},
		[],
	);

	// ── the whole index, matched once ──────────────────────────────────────
	//
	// The four registers are filtered before the scope is applied, because the
	// scope's own adverse state needs to know what it excluded: a reader who has
	// narrowed to `DOC`, typed a word, and found nothing has not found nothing -
	// they have found nothing *here*. The control can say how many matches sit
	// outside the scope, and that number is the difference between a dead end and
	// a wrong door.
	const AllRoutes = FilterEntries(Query, Register.Routes);

	const AllRecords = FilterEntries(Query, Register.Records);

	const AllTerms = FilterEntries(Query, Register.Terms);

	const AllDoc = Register.Doc.map((Group) => ({
		...Group,
		Pages: FilterEntries(Query, Group.Pages),
	})).filter((Group) => Group.Pages.length > 0);

	const AllActions = FilterEntries(Query, Register.Actions);

	const DocCount = AllDoc.reduce(
		(Total, Group) => Total + Group.Pages.length,
		0,
	);

	const Routes = Scope === "doc" ? [] : AllRoutes;

	const Records = Scope === "doc" ? [] : AllRecords;

	const Terms = Scope === "doc" ? [] : AllTerms;

	const Doc = Scope === "site" ? [] : AllDoc;

	const Actions = Scope === "doc" ? [] : AllActions;

	/** What the current scope is hiding. `0` when nothing is hidden. */
	const Outside =
		Scope === "doc"
			? AllRoutes.length +
				AllRecords.length +
				AllTerms.length +
				AllActions.length
			: Scope === "site"
				? DocCount
				: 0;

	const Count =
		Routes.length +
		Records.length +
		Terms.length +
		Doc.reduce((Total, Group) => Total + Group.Pages.length, 0) +
		Actions.length;

	const Copy = () => {
		const Address = window.location.href;

		void navigator.clipboard?.writeText(Address).catch(() => {});

		SetCopied(true);

		if (CopyTimer.current) clearTimeout(CopyTimer.current);

		CopyTimer.current = setTimeout(() => SetCopied(false), 1800);
	};

	const Go = OnNavigate ?? Navigate;

	return (
		<>
			{/*
				The document's second focus-revealed control - the skip link is the
				first. It sits in the same corner and replaces it on the second Tab, so
				the two never fight for it, and it prints its own chord because a way in
				that does not say how to use it is a door with no handle.
			*/}
			<button
				type="button"
				ref={TriggerRef}
				className="PaletteTrigger"
				data-palette-trigger
				onClick={() => OpenWith()}
			>
				<span>Find a record</span>
				<Chord Ink>{Modifier}</Chord>
			</button>

			<Dialog open={Open} onOpenChange={OnOpenChange}>
				<DialogContent className="Palette" close={false}>
					<DialogTitle className="sr-only">Find a record</DialogTitle>
					<DialogDescription className="sr-only">
						The site&apos;s parts, the record heads its pages print,
						the words the lexicon defines, the manual&apos;s
						sections and pages, and the palette&apos;s own actions.
					</DialogDescription>

					<Command shouldFilter={false} label="Find a record">
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
								{Pad(Count)}
							</span>

							<CommandInput
								value={Query}
								onValueChange={SetQuery}
								placeholder="a part, a section, a record, a word"
								aria-label="Filter the index"
							/>

							<Segmented
								className="Palette__Scope"
								Items={Scopes}
								Value={Scope}
								OnChange={SetScope}
								Label="Scope"
							/>
						</div>

						<CommandList>
							{/*
								The empty state, in two readings. A query that matches nothing at all
								says so and offers the other words to try; a query that matches
								nothing *inside the chosen scope* says how many rows the scope is
								hiding and offers to widen it. A control that printed the first
								sentence for the second case would be telling the reader the site
								does not have a page it does have.
							*/}
							<CommandEmpty>
								{Outside > 0 ? (
									<SlipEmpty
										Mark="NOT IN THIS SCOPE"
										Line={`${Pad(Outside)} ${Outside === 1 ? "ROW" : "ROWS"} MATCH OUTSIDE IT`}
									>
										<button
											type="button"
											className="SlipAction"
											onClick={() => SetScope("all")}
										>
											<span aria-hidden="true">→</span>{" "}
											SEARCH EVERYTHING
										</button>
									</SlipEmpty>
								) : (
									<SlipEmpty
										Mark="NO RECORD"
										Line="TRY A PART, A SECTION, A RECORD, OR A WORD"
									/>
								)}
							</CommandEmpty>

							{Routes.length > 0 ? (
								<CommandGroup heading="ROUTES">
									{Routes.map((Entry) => (
										<Row
											key={Entry.Id}
											Entry={Entry}
											OnNavigate={Go}
										/>
									))}
								</CommandGroup>
							) : null}

							{Records.length > 0 ? (
								<CommandGroup heading="RECORDS">
									{Records.map((Entry) => (
										<Row
											key={Entry.Id}
											Entry={Entry}
											OnNavigate={Go}
										/>
									))}
								</CommandGroup>
							) : null}

							{Terms.length > 0 ? (
								<CommandGroup heading="TERMS">
									{Terms.map((Entry) => (
										<Row
											key={Entry.Id}
											Entry={Entry}
											OnNavigate={Go}
										/>
									))}
								</CommandGroup>
							) : null}

							{Doc.map((Group) => (
								<CommandGroup
									key={Group.Id}
									heading={Group.Label}
								>
									{Group.Pages.map((Entry) => (
										<Row
											key={Entry.Id}
											Entry={Entry}
											OnNavigate={Go}
										/>
									))}
								</CommandGroup>
							))}

							{Actions.length > 0 ? (
								<CommandGroup heading="ACTIONS">
									{Actions.map((Entry) => (
										<CommandItem
											key={Entry.Id}
											value={`${Entry.Id} ${Entry.Label}`}
											mark="→"
											meta={Copied ? "COPIED" : undefined}
											onSelect={Copy}
										>
											{Entry.Label}
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
							<span className="Slip__FootItem Slip__FootEnd">
								<Chord Ink>{Modifier}</Chord>
							</span>
						</div>
					</Command>
				</DialogContent>
			</Dialog>
		</>
	);
};

export { Palette };

export default Palette;
