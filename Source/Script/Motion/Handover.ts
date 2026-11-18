/**
 * Handover - the direction of a page change, printed on `<html>`.
 *
 * ─── WHAT THE STYLESHEET CANNOT KNOW ──────────────────────────────────────
 * `Motion/_Handover.scss` switches on the browser's cross-document view
 * transition: the old page's body steps out and the new one steps in, while the
 * record's name in the running head stays where it is. What CSS cannot know is
 * which way the reader moved - forward into a new part, or back to the part they
 * came from - and a page that steps the same way in both directions is a page
 * that is not paying attention.
 *
 * ─── THE HOOK IS `pagereveal`, AND IT IS EARLY ENOUGH ─────────────────────
 * `pagereveal` fires on the arriving document *before* its snapshot is taken, so
 * the attribute is on `<html>` when the transition's pseudo-elements are styled.
 * That matters more than it looks: in a cross-document transition it is the NEW
 * page's stylesheet that styles both images, so the direction has to be printed
 * here rather than on the page being left.
 *
 * ─── THE DIRECTION COMES FROM THE BROWSER'S OWN RECORD ────────────────────
 * `performance.getEntriesByType("navigation")[0].type` is `back_forward` for a
 * back or forward button and `navigate` for everything else. That is the
 * browser's own answer, not a guess from a counter in session storage - a counter
 * gets it wrong the first time a reader arrives from a bookmark, and a page that
 * steps backwards on a fresh visit is worse than one that always steps forwards.
 *
 * ─── WITH NO SCRIPT ───────────────────────────────────────────────────────
 * The attribute is absent, the stylesheet's default is forward, and the handover
 * still runs: it is the browser's transition, not this file's. This module only
 * chooses the direction.
 */

/** The navigation types that mean the reader is retracing. */
const IsBack = (): boolean => {

	if (typeof performance === "undefined") return false;

	const [Entry] = performance.getEntriesByType(
		"navigation",
	) as PerformanceNavigationTiming[];

	return Entry?.type === "back_forward";
};

/** Print the direction, once per page. */
const Print = (): void => {

	const Root = document.documentElement;

	if (!Root) return;

	Root.dataset["handover"] = IsBack() ? "back" : "forward";
};

/**
 * Mount. Two listeners and one immediate call:
 *
 * - `pagereveal` is the cross-document hook (and the only one that fires early
 *   enough for the arriving page's snapshot).
 * - `DOMContentLoaded` covers a browser that has no `pagereveal` event; the
 *   transition is not running there, so the attribute is only for the next
 *   navigation's stylesheet - which is exactly what it is for.
 */
export const Handover = (): void => {

	Print();

	if (typeof window === "undefined") return;

	window.addEventListener("pagereveal", Print);

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", Print, { once: true });
	}
};
