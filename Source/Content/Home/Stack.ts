/**
 * The hero's tech-stack strip: the eight technologies the editor is made of.
 *
 * The strip is `aria-hidden` in the render - it is a caption under the hero's
 * two panels rather than a navigation aid - so it carries a name and an ink per
 * tile and nothing else. `Icon` names a `lucide-react` glyph; the component
 * resolves the name, because a data module may not import a renderer.
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
