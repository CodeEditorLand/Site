/**
 * Origin - the command palette's lean, from the direction it was invoked.
 *
 * ─── THE ONE CONTROL WITH NO SIDE ─────────────────────────────────────────
 * A menu, a select and a popover all arrive from their own trigger, and
 * `Motion/_Origin.scss` reads that from the `data-side` Radix already prints - no
 * script, no measurement, correct on the first frame. The command palette has no
 * side: it is a modal, centred, and it can be invoked three ways:
 *
 *   ⌘K / Ctrl+K          no origin at all
 *   the palette trigger   a real control, in the document's top-left corner
 *   a handoff row         `→ FIND ALL RECORDS` in the manual's rail, or the
 *                         matrix control's void state, both of which dispatch
 *                         `palette:open` with the reader's own words
 *
 * ─── A MODAL THAT FLEW WOULD BE A LIE ABOUT MASS ──────────────────────────
 * Travelling the real distance from a rail row to the centre of the screen would
 * be a flight of four hundred pixels: the surface would arrive with momentum it
 * does not have, and the reader would wait for it. So the palette *leans*: the
 * vector from the centre of the viewport toward the invocation point, capped at
 * 24px, on the arrive curve. It is the same idea as the slip's 8px, at the scale
 * a modal can carry - enough to say *this came from there*, not enough to be a
 * journey.
 *
 * ─── WHY THE POINTER IS RECORDED, AND NOT THE TRIGGER ─────────────────────
 * The three invocation paths have three different targets, and only two of them
 * are elements this file could recognise. The pointer's own position is the one
 * thing all three share: a click on the trigger, a click on a handoff row, and -
 * for the chord - nothing, which is the default. So the last pointer position is
 * kept (for two seconds, so a keyboard invocation after a click does not inherit
 * a stale lean), and the vector is computed from it.
 *
 * ─── WITH NO SCRIPT ───────────────────────────────────────────────────────
 * The palette keeps the 4px rise it always had: `--motion-origin-x` and
 * `--motion-origin-y` fall back to their own defaults in the keyframe.
 */

/** The cap, in pixels. Matches `--motion-origin-travel`'s scale for a modal. */
const Cap = 24;

/** How long a recorded pointer position is trusted. */
const Window = 2000;

type Point = { x: number; y: number; at: number };

let Last: Point | null = null;

const Clamp = (Value: number): number =>
	Math.round(Math.max(-Cap, Math.min(Cap, Value)));

const Root = (): HTMLElement => document.documentElement;

const Clear = (): void => {
	Root().style.removeProperty("--motion-origin-x");
	Root().style.removeProperty("--motion-origin-y");
};

/**
 * Write the lean. The vector points from the centre of the viewport - where the
 * palette lands - toward the invocation point, so the palette starts *at* that
 * point's direction and settles into the centre.
 */
const Lean = (): void => {
	if (!Last || Date.now() - Last.at > Window) {
		Clear();

		return;
	}

	const X = Clamp(Last.x - window.innerWidth / 2);
	const Y = Clamp(Last.y - window.innerHeight / 2);

	Root().style.setProperty("--motion-origin-x", `${X}px`);
	Root().style.setProperty("--motion-origin-y", `${Y}px`);
};

/** Record where the pointer was, on every press. */
const Remember = (Event: PointerEvent): void => {
	Last = { x: Event.clientX, y: Event.clientY, at: Date.now() };
};

/** Forget it, on every key press: a chord has no origin. */
const Forget = (Event: KeyboardEvent): void => {
	if (Event.key === "k" || Event.key === "K") {
		Last = null;

		Clear();
	}
};

/**
 * Mount. Three listeners, no polling and no DOM writes until a palette opens:
 *
 * - `pointerdown` (capture, passive) records the point.
 * - `palette:open` - the event the palette already listens for - writes the lean
 *   before the dialog's first frame.
 * - `keydown` clears it, so the chord keeps the plain rise.
 */
export const Origin = (): void => {
	if (typeof window === "undefined") return;

	window.addEventListener("pointerdown", Remember, {
		capture: true,
		passive: true,
	});

	window.addEventListener("keydown", Forget, { passive: true });

	window.addEventListener("palette:open", Lean);

	/* A lean belongs to one arrival. Once the dialog has opened, the vector is
	   spent - keeping it would make the next chord invocation lean from wherever
	   the last click happened. */
	window.addEventListener("palette:close", Clear);
};
