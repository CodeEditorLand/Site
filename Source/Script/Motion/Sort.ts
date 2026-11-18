/**
 * Sort - a matrix re-ordering, as a view transition.
 *
 * ─── THE PROBLEM THIS SOLVES ──────────────────────────────────────────────
 * `MatrixControl` hides rows imperatively (`row.hidden = true`) when the facet,
 * the match field or the step control changes. That is the right way to drive a
 * printed table - the table is not re-rendered, it is narrowed - but it means the
 * rows jump from one position to another in a single frame, and the one thing the
 * reader needs to see is *that the same rows are still there, in another order*.
 *
 * ─── WHY THE BROWSER HAS TO DO IT ─────────────────────────────────────────
 * A row travelling from position 9 to position 2 is a layout change CSS cannot
 * interpolate: the browser has to know where the row was. `startViewTransition`
 * is the only API that gives us that for free - it snapshots the table before the
 * mutation, applies the mutation, snapshots again, and animates each *named* row
 * between the two. No FLIP maths, no `getBoundingClientRect`, no style writes.
 *
 * ─── THE THREE GUARDS, AND WHY EACH ONE EXISTS ────────────────────────────
 * 1. **The first call per table is not a state change.** The effect that applies
 *    the rows runs once on mount to page the table; animating that would be an
 *    entrance animation at first paint, which the motion layer forbids. The
 *    first call is recorded and refused, and every call after it is the reader's.
 * 2. **Reduced motion.** The stylesheet removes the animations as well; this
 *    refuses to create the transition at all, so the reader gets one frame.
 * 3. **Sixty named rows.** A two-hundred-row table would create two hundred
 *    groups and the animation would cost more than the order it explains. Past
 *    the cap the table still re-sorts; it does it in one frame, which is what it
 *    did before this file existed.
 *
 * ─── THE NAME IS THE HANDLE ───────────────────────────────────────────────
 * `view-transition-name` must be unique in the document, so the names are
 * generated per sort (`LandRow0`, `LandRow1`, ...) and removed when the
 * transition finishes - otherwise the next page handover would try to morph
 * thirty table rows across a navigation.
 */

/** How many rows a sort may name. Past this the table re-sorts in one frame. */
const Cap = 60;

/** One sort at a time: two concurrent transitions would fight over the names. */
let Running = false;

/** Tables that have already had their mount pass, so it is never animated. */
const Seen = new WeakSet<HTMLElement>();

/**
 * Whether the reader has touched the document yet.
 *
 * The mount pass is not one effect: `MatrixControl` reads its rows on hydrate,
 * which re-runs the effect that applies them, so a table longer than one page
 * would hide its surplus rows *after* the first pass - still at first paint, and
 * still not a state change. A gesture is the only honest signal that what follows
 * is the reader's, so a sort never animates before one.
 */
let Gesture = false;

if (typeof window !== "undefined") {
	const Note = (): void => {
		Gesture = true;
	};

	window.addEventListener("pointerdown", Note, {
		capture: true,
		passive: true,
	});

	window.addEventListener("keydown", Note, { capture: true, passive: true });
}

type TransitionDocument = Document & {
	startViewTransition?: (Callback: () => void) => {
		finished?: Promise<void>;
	};
};

const Reduced = (): boolean =>
	typeof window !== "undefined" &&
	typeof window.matchMedia === "function" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run `Mutate` inside a view transition, so the rows it re-orders travel.
 *
 * Returns `true` when the mutation was performed inside a transition, `false`
 * when it was not - in which case the caller must perform it itself. That shape
 * is deliberate: the caller stays in charge of the mutation, and this module
 * never touches the table's content.
 */
export const Sort = (
	Shell: HTMLElement | null,

	Mutate: () => void,
): boolean => {
	if (!Shell) return false;

	/* The mount pass: the control's first application of the rows. Recorded, not
	   animated - a table that arrived with its rows sliding into place would be
	   the entrance animation the layer refuses. */
	if (!Seen.has(Shell)) {
		Seen.add(Shell);

		return false;
	}

	if (Running || Reduced() || !Gesture) return false;

	const Document = document as TransitionDocument;

	if (typeof Document.startViewTransition !== "function") return false;

	const Rows = [...Shell.querySelectorAll("tbody tr")].slice(
		0,

		Cap,
	) as HTMLElement[];

	const Named: HTMLElement[] = [];

	Rows.forEach((Row, Position) => {
		/* A hidden row has no box, so naming it would create a group with nothing
		   in it. The rows that are visible now are the ones that can travel. */
		if (Row.hidden) return;

		Row.style.viewTransitionName = `LandRow${Position}`;

		Named.push(Row);
	});

	Running = true;

	document.documentElement.dataset["sort"] = "running";

	const Transition = Document.startViewTransition(() => {
		Mutate();
	});

	const Done = (): void => {
		Running = false;

		delete document.documentElement.dataset["sort"];

		for (const Row of Named) Row.style.viewTransitionName = "";
	};

	if (Transition.finished) Transition.finished.then(Done, Done);
	else Done();

	return true;
};
