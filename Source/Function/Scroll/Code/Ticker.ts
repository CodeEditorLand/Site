/**
 * The field's clock.
 *
 * One `requestAnimationFrame` loop for the whole pixel field, owned here rather
 * than by the React tree. Three rules, and every one of them was broken by the
 * version this replaces:
 *
 * - **One loop.** `Code.tsx` used to start its own loop and push a new
 *   `CurrentTime` into React state on every frame, so the field re-rendered
 *   sixty times a second for as long as the page was open. Here the loop calls
 *   the subscribers directly; React is not in the per-frame path at all.
 *
 * - **One frame, one pass.** Subscribers are called in insertion order inside a
 *   single frame callback.
 *
 * - **Paused when nobody can see it.** A field below the fold, or in a
 *   background tab, costs nothing: `SetOnScreen(false)` and
 *   `visibilitychange` both cancel the pending frame, and nothing reschedules
 *   until it is visible again. The old loop ran forever.
 *
 * The loop stops itself when the last subscriber leaves, so an unmounted field
 * leaves no frame behind.
 */

/** One pixel's per-frame work: read the clock, roll the element. */
type Subscriber = (Time: number) => void;

const Subscribers = new Set<Subscriber>();

/** The pending frame, or `null` when the loop is stopped. */
let Frame: number | null = null;

/** Whether the field is inside the viewport. `false` parks the loop. */
let OnScreen = true;

const Pump = (Time: number): void => {
	Frame = null;

	/* A hidden tab still fires one last frame; do not schedule another. */
	if (!OnScreen || document.hidden) return;

	for (const Subscriber of Subscribers) Subscriber(Time);

	if (Subscribers.size > 0) Frame = requestAnimationFrame(Pump);
};

const Start = (): void => {
	if (Frame !== null) return;

	if (Subscribers.size === 0) return;

	if (!OnScreen || document.hidden) return;

	Frame = requestAnimationFrame(Pump);
};

/** Cancel the pending frame. Called when the field is off-screen or hidden. */
export const Stop = (): void => {
	if (Frame === null) return;

	cancelAnimationFrame(Frame);

	Frame = null;
};

/**
 * Put one pixel on the clock. The returned function takes it off again, and
 * the last one off stops the loop.
 */
export const Subscribe = (Subscriber: Subscriber): (() => void) => {
	Subscribers.add(Subscriber);

	Start();

	return () => {
		Subscribers.delete(Subscriber);

		if (Subscribers.size === 0) Stop();
	};
};

/** The field entered or left the viewport. */
export const SetOnScreen = (Visible: boolean): void => {
	OnScreen = Visible;

	if (Visible) Start();
	else Stop();
};

if (typeof document !== "undefined") {
	document.addEventListener("visibilitychange", () => {
		if (document.hidden) Stop();
		else Start();
	});
}
