/**
 * The hero's tech-stack strip: the eight technologies the editor is made of.
 *
 * The grid is `aria-hidden` in the render - a legend under the hero's two panels
 * rather than a navigation aid - so it carries a name and an ink per tile and
 * nothing else, and the label above it prints the count. `Icon` names a
 * `lucide-react` glyph; the component resolves the name, because a data module
 * may not import a renderer.
 */
import type { StackTile } from "./Type.js";

/** The strip's own label, above the grid. */
export const StackLabel = "TECH STACK";

/** The eight tiles, in the order the baseline printed them. */
export const StackTiles: readonly StackTile[] = [
	{ Name: "RUST CORE", Icon: "Cpu", Ink: "var(--SpineTCP)" },

	{ Name: "TAURI UI", Icon: "Box", Ink: "var(--SpineIPC)" },

	{ Name: "EFFECT-TS SERVICES", Icon: "Layers3", Ink: "var(--SpineWASM)" },

	{ Name: "GRPC IPC", Icon: "Network", Ink: "var(--SpinegRPC)" },

	{ Name: "EXTENSION HOST", Icon: "Puzzle", Ink: "var(--SpineWASM)" },

	{ Name: "CROSS-PLATFORM", Icon: "Globe", Ink: "var(--SpineIPC)" },

	{ Name: "VS CODE API", Icon: "Server", Ink: "var(--SpinegRPC)" },

	{ Name: "OPEN SOURCE CC0", Icon: "Zap", Ink: "var(--SpineTCP)" },
];

/**
 * How many tiles one row holds: the largest count that divides the set without
 * leaving a short row, or the set itself when it is small enough to be one row.
 *
 * ─── WHY THE COUNT IS A DERIVATION AND NOT A STYLE ─────────────────────────
 * A fixed column count is right for exactly the set it was written for: nine
 * tiles in four columns leaves a row of one, and eight tiles in three leaves a
 * row of two. A legend with a gap in it reads as a legend that lost a tile.
 *
 * So the count follows the SET, and the width only decides whether the set's own
 * count still fits (`_Stack.scss` holds the floor and the arithmetic). Four
 * divides eight, three divides nine, and a set with no divisor at all - seven,
 * five, a prime - takes four and prints its short last row honestly, because a
 * short row is a fact about the set and a hole is a fact about the layout.
 *
 * The small sets come first: one tile is one row, not a quarter of one.
 */
export const StackTracks = (Tiles: readonly StackTile[]): number => {
	if (Tiles.length <= 4) return Math.max(1, Tiles.length);

	for (const Tracks of [4, 3, 2]) {
		if (Tiles.length % Tracks === 0 && Tiles.length / Tracks <= 4) {
			return Tracks;
		}
	}

	return 4;
};
