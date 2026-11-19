"use client";

import * as React from "react";

/**
 * Overlay - the family's one dismissal contract, and the door a slip came
 * through.
 *
 * ─── WHY A CONTRACT AND NOT ONE SET OF DEFAULTS PER PRIMITIVE ─────────────
 *
 * The overlay primitives each do the five dismissals slightly differently, and
 * the differences are invisible until they bite: a dialog returns focus to its
 * trigger because Radix owns the trigger; the palette's door is a sibling
 * button, so its focus return is hand-written; a menu whose trigger is
 * removed while open stays open with nothing to return to, in every primitive.
 * A reader does not experience "eight correct implementations" - they
 * experience one document that sometimes forgets where they were.
 *
 * So the five are stated once, here, as one object:
 *
 *   ESCAPE        the keyboard's exit, always available, never a surprise
 *   OUTSIDE       the pointer's exit - on a modal, the scrim; on a slip, the page
 *   FOCUS         the return: back to the door, or to whatever had focus
 *   SCROLL        locked when the overlay is modal, untouched when it is not
 *   TRIGGER       the door was removed while the slip was open - close, and do
 *                 not leave a surface with no way back
 *
 * ─── WHAT LIVES HERE AND WHAT DOES NOT ────────────────────────────────────
 *
 * Here: the hooks. `UseSlipRoot` owns open state and the door; `UseDoorReturn`
 * is the focus rule; `UseTriggerGuard` is the removed-trigger rule;
 * `UseScrollLock` is the scroll rule. Each is called *inside* the component
 * that needs it - `Dialog.tsx`, `Popover.tsx`, `Sheet.tsx`, `Drawer.tsx`,
 * `DropdownMenu.tsx`, `ContextMenu.tsx` - because a behaviour that lives in a
 * wrapper is a behaviour a caller can forget to wrap with. The palette is built
 * on `Dialog`, so it gets the door through it rather than calling the hooks
 * itself.
 *
 * Not here: any surface. Not one class name is written in this file; the slip
 * is drawn by `Stylesheet/System/UI/_Slip.scss` and this file only decides what
 * happens, never what it looks like.
 */

/**
 * One line of the contract, as the specimen prints it.
 *
 * `Held` is the honest part: which primitive actually does this, and whether the
 * family had to add it. A contract table that claimed all five everywhere would
 * be a table nobody could check.
 */
export interface Dismissal {
	/** The field label - `ESCAPE:`, `OUTSIDE:`, `FOCUS:`, `SCROLL:`, `TRIGGER:`. */
	readonly key: string;

	/** What happens, in the document's voice. */
	readonly value: string;

	/** Which component holds the rule, and how. */
	readonly held: string;
}

/**
 * The five dismissals. Read down, this is the whole family's behaviour; read
 * across, it is one row per question a reader can ask of any overlay.
 */
export const Dismissals: readonly Dismissal[] = [
	{
		key: "ESCAPE:",

		value: "CLOSE, AND RETURN FOCUS TO THE DOOR",

		held: "Radix, on every primitive; the family adds the return when the door is not a `*Trigger` (`UseDoorReturn`).",
	},

	{
		key: "OUTSIDE:",

		value: "CLOSE ON THE SCRIM WHEN MODAL, ON THE PAGE WHEN NOT",

		held: "Radix's `onInteractOutside`. A modal draws `SlipScrim` (12 % ink); a non-modal slip has no scrim at all, so the page stays readable behind it.",
	},

	{
		key: "FOCUS:",

		value: "RETURN TO THE ELEMENT THAT HAD IT, ELSE TO THE TRIGGER",

		held: "`UseDoorReturn`, shared by the palette and every slip. Radix restores only to a `DialogTrigger` it owns, and half this family's doors are sibling buttons.",
	},

	{
		key: "SCROLL:",

		value: "LOCKED WHILE A MODAL IS OPEN, UNTOUCHED WHILE A SLIP IS",

		held: "Radix Dialog and vaul lock and set `data-scroll-locked` on `<html>`; the family's CSS compensates the scrollbar from that attribute rather than from a second lock.",
	},

	{
		key: "TRIGGER:",

		value: "REMOVED WHILE OPEN - THE SLIP CLOSES",

		held: "`UseTriggerGuard`: a `MutationObserver` on `document.body` that lives only while a slip is open, and closes when the door leaves the tree. No primitive does this.",
	},
];

/** The door a slip came through: its element, whether it is open, and how it closes. */
export interface Door {
	/** The element that opened the slip - a trigger, a button, a right-click region. */
	readonly Element: React.RefObject<HTMLElement | null>;

	/** Whether the slip is open. Read by the guard, not by the surface. */
	readonly Open: boolean;

	/** Close it. The guard calls this; the surface never does. */
	readonly Close: () => void;
}

/**
 * The door, as context.
 *
 * A `Root` provides it and a `Trigger` fills it, because that is the only place
 * the two meet: the primitive owns the open state, the trigger owns the
 * element, and the guard needs both. `null` is the default for a trigger with no
 * `Root` above it; what can be absent inside a root is the element the trigger
 * writes, and `UseTriggerGuard` reads an absent element as a door that has gone.
 */
export const DoorContext = React.createContext<Door | null>(null);

/** Read the door. `null` when the slip has none. */
export const UseDoor = (): Door | null => React.useContext(DoorContext);

/**
 * Fill a door from a trigger.
 *
 * Returns the `ref` a `*Trigger` should carry. Radix's `asChild` forwards the
 * ref to the caller's element, so this works for a `<button>`, an `<a>` and a
 * `<jelly-button>` alike - the last of which is why it is a callback and not an
 * object ref.
 */
export const UseDoorRef = (DoorValue: Door | null) =>
	React.useCallback(
		(Node: HTMLElement | null) => {
			if (DoorValue === null) return;

			DoorValue.Element.current = Node;
		},

		[DoorValue],
	);

/**
 * The removed-trigger rule.
 *
 * While a slip is open, watch the tree for the door leaving it. The observer is
 * created on open and disconnected on close, so it costs nothing while the
 * page is being read - which is the only way this rule can be honest, because
 * an observer that lived for the life of the page would be a permanent tax on
 * every DOM write for a case that happens when a form re-renders under an open
 * menu.
 *
 * The slip closes rather than re-anchoring: a menu floating over the place a
 * button used to be is a menu with no subject.
 */
export const UseTriggerGuard = (
	Open: boolean,

	Element: React.RefObject<HTMLElement | null>,

	Close: () => void,
): void => {
	React.useEffect(() => {
		if (!Open || typeof MutationObserver === "undefined") return;

		const Observer = new MutationObserver(() => {
			if (!Element.current || !Element.current.isConnected) Close();
		});

		Observer.observe(document.body, { childList: true, subtree: true });

		return () => Observer.disconnect();
	}, [Open, Element, Close]);
};

/**
 * Open state, controlled or not, plus the door the guard watches.
 *
 * Radix's `Root` already implements controlled/uncontrolled open state; this
 * hook mirrors it so the guard can read it, and hands the same props back. It
 * is a mirror, not a second source of truth: the value the primitive is given
 * is the value the guard reads.
 */
export interface SlipRootProps {
	open?: boolean | undefined;

	defaultOpen?: boolean | undefined;

	onOpenChange?: ((Open: boolean) => void) | undefined;
}

export interface SlipRoot {
	/** The value to hand the primitive. */
	readonly Open: boolean;

	/** The handler to hand the primitive. */
	readonly OnOpenChange: (Next: boolean) => void;

	/** The door, for the provider and the trigger. */
	readonly Door: Door;
}

export const UseSlipRoot = ({
	open,
	defaultOpen,
	onOpenChange,
}: SlipRootProps): SlipRoot => {
	const [Internal, SetInternal] = React.useState<boolean>(
		defaultOpen ?? false,
	);

	const Controlled = open !== undefined;

	const Open = Controlled ? open : Internal;

	const Element = React.useRef<HTMLElement | null>(null);

	const OnOpenChange = React.useCallback(
		(Next: boolean) => {
			if (!Controlled) SetInternal(Next);

			onOpenChange?.(Next);
		},

		[Controlled, onOpenChange],
	);

	const Close = React.useCallback(() => OnOpenChange(false), [OnOpenChange]);

	UseTriggerGuard(Open, Element, Close);

	const Door = React.useMemo<Door>(
		() => ({ Element, Open, Close }),

		[Open, Close],
	);

	return { Open, OnOpenChange, Door };
};

/**
 * The focus rule: capture the door on the way in, restore it on the way out.
 *
 * Radix calls `onOpenAutoFocus` before it moves focus and `onCloseAutoFocus`
 * before it restores. Capturing at the first and restoring at the second is the
 * whole rule, and it is stated once for the slips that need it rather than
 * written by hand at each surface, where the copies drift.
 *
 * The fallback matters: a chord pressed with nothing focused has
 * `document.body` as its door, and restoring focus to the body is a return to
 * the top of the document. So the rule refuses the body and lets Radix fall
 * back to the trigger, which is the element the reader actually used.
 */
export const UseDoorReturn = () => {
	const Return = React.useRef<HTMLElement | null>(null);

	const OnOpenAutoFocus = React.useCallback(() => {
		const Active = document.activeElement;

		Return.current =
			Active instanceof HTMLElement && Active !== document.body
				? Active
				: null;
	}, []);

	const OnCloseAutoFocus = React.useCallback((Event: Event) => {
		const Target = Return.current;

		Return.current = null;

		if (Target === null || !Target.isConnected) return;

		// Radix would otherwise move focus to the trigger. Both are defensible;
		// the reader's own last position is the one that is not a guess.
		Event.preventDefault();

		// A tick, because Radix's close-autofocus runs after this handler and
		// would land on the body and undo the return.
		setTimeout(() => {
			if (Target.isConnected) Target.focus();
		}, 0);
	}, []);

	return { OnOpenAutoFocus, OnCloseAutoFocus };
};

/**
 * The scroll rule, for a surface that is not Radix Dialog.
 *
 * Radix Dialog and vaul already lock, through `react-remove-scroll`. This exists
 * for the one case they do not cover - a non-modal slip that the caller has asked
 * to lock, because it holds a form the page must not scroll behind - and it
 * writes the same `data-scroll-locked` name they write, on `<html>` rather than
 * on `<body>`, so the family has one attribute name for one condition.
 */
export const UseScrollLock = (Locked: boolean): void => {
	React.useEffect(() => {
		if (!Locked) return;

		const Root = document.documentElement;

		Root.setAttribute("data-scroll-locked", "1");

		return () => Root.removeAttribute("data-scroll-locked");
	}, [Locked]);
};
