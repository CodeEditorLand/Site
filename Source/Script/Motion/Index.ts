/**
 * Motion - the client half of the motion layer.
 *
 * ─── WHAT NEEDS JAVASCRIPT, AND WHAT DOES NOT ─────────────────────────────
 * Nine of the thirteen interaction classes are CSS only: a fold, an expand, a
 * slip's arrival from its control, the state words, the disclosure's reveal. The
 * four that are not are the ones CSS cannot know:
 *
 *   Sort       a row's previous position. `startViewTransition` is the only API
 *              that gives it to us, and the mutation has to run inside it.
 *   Handover   which way the reader moved. `pagereveal` fires early enough to
 *              print the direction before the arriving page is snapshotted.
 *   Origin     where the palette was invoked from. A modal has no `data-side`,
 *              so the invocation point is recorded from the pointer.
 *   (the fold, the expand and the slip's side need none of this.)
 *
 * ─── ONE ENTRY, THREE MOUNTS, NO FRAMEWORK ────────────────────────────────
 * This module is imported once from `Layout/Base.astro` and mounts all three. It
 * installs `window.LandMotion` so an island that owns a mutation - the matrix
 * control - can hand it to the transition without importing anything from here:
 * one guarded call, and a control that has no motion layer on the page still
 * works exactly as it did.
 *
 * ─── EVERY MOUNT IS IDEMPOTENT AND FAILURE-TOLERANT ───────────────────────
 * Each module checks its own API before doing anything (`startViewTransition`,
 * `pagereveal`, `matchMedia`), and none of them throws: a browser without view
 * transitions gets the site it had before this file existed, which is a complete
 * site. That is the contract of the whole layer - motion is additive, never
 * load-bearing.
 */
import { Handover } from "./Handover.js";
import { Origin } from "./Origin.js";
import { Sort } from "./Sort.js";

/** The bridge an island uses: `window.LandMotion?.Sort(shell, mutate)`. */
declare global {
	interface Window {
		LandMotion?: {
			readonly Sort: typeof Sort;
		};
	}
}

const Mount = (): void => {
	Handover();
	Origin();

	window.LandMotion = { Sort };
};

if (typeof window !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", Mount, { once: true });
	} else {
		Mount();
	}
}

export { Handover, Origin, Sort };
