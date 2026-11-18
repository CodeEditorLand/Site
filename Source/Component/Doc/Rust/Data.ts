/**
 * Data - the Rust API surface's crate list.
 *
 * The nine crates and their descriptions are the page's own content, moved out
 * of the template so the page is a composition instead of a table. Nothing here
 * is derived: every URL, label and description is the string the page printed
 * before this module existed, and the order is the order the tiles and the tabs
 * have always been in (Mountain first, because it is the crate the frame opens
 * on).
 */
import type { RustCrate } from "./Type.js";

/** The nine rustdoc sites, in tab order. */
export const RustCrates: readonly RustCrate[] = [
	{
		Id: "Mountain",

		Label: "Mountain",

		Url: "https://Rust.Documentation.Mountain.editor.land",

		Description:
			"Native Rust/Tauri backend: window management, file system, process lifecycle, gRPC server",
	},

	{
		Id: "Common",

		Label: "Common",

		Url: "https://Rust.Documentation.Common.editor.land",

		Description:
			"Shared traits, DTOs, configuration helpers, and cross-element contracts",
	},

	{
		Id: "Echo",

		Label: "Echo",

		Url: "https://Rust.Documentation.Echo.editor.land",

		Description:
			"Lock-free work-stealing scheduler built on crossbeam-deque",
	},

	{
		Id: "Air",

		Label: "Air",

		Url: "https://Rust.Documentation.Air.editor.land",

		Description:
			"Background services for updates, downloads, integrity checks, authentication, and indexing",
	},

	{
		Id: "SideCar",

		Label: "SideCar",

		Url: "https://Rust.Documentation.SideCar.editor.land",

		Description: "Node.js binary distribution compiled per target triple",
	},

	{
		Id: "Mist",

		Label: "Mist",

		Url: "https://Rust.Documentation.Mist.editor.land",

		Description:
			"Embedded DNS resolver for local-first hostname resolution",
	},

	{
		Id: "Rest",

		Label: "Rest",

		Url: "https://Rust.Documentation.Rest.editor.land",

		Description:
			"OXC-based TypeScript transform work for the output pipeline",
	},

	{
		Id: "Maintain",

		Label: "Maintain",

		Url: "https://Rust.Documentation.Maintain.editor.land",

		Description:
			"Build orchestrator, configuration, and release profile tooling",
	},

	{
		Id: "Land",

		Label: "Land",

		Url: "https://Rust.Documentation.Land.editor.land",

		Description:
			"Top-level workspace that ties the Rust element crates together",
	},
];
