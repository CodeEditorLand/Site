/**
 * Data - the Rust API surface's crate list and the bands it renders as.
 *
 * The nine crates and their descriptions are the page's own content, moved out
 * of the template so the page is a composition instead of a table. Nothing here
 * is derived: every URL, label and description is the string the page printed
 * before this module existed, and the order is the order the tabs have always
 * been in (Mountain first, because it is the crate the frame opens on).
 *
 * Copy stays at the call site: `RustBand` takes the page's `T`, so the labels
 * that are prose come from the `doc` namespace and this module never imports the
 * i18n client.
 */
import type { DocBand, DocLink, DocTranslate } from "../Type.js";

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

/** One crate as a documentation row: it leaves the site, so it carries `Blank`. */
const ToRow = (Crate: RustCrate): DocLink => ({
	Id: Crate.Id,
	Label: Crate.Label,
	Href: Crate.Url,
	Note: Crate.Description,
	Blank: true,
});

/**
 * The crate list as a band: the same `DocBand` shape the documentation index
 * maps over, so one component renders both and the Rust page reads like the
 * rest of the documentation.
 */
export const RustBand = (T: DocTranslate): DocBand => ({
	Id: "crates",
	Kicker: `/CRATES\u2001${RustCrates.length} ${T("rust.sets", {
		ns: "doc",
		defaultValue: "SETS",
	})}`,
	Heading: T("rust.crates.heading", {
		ns: "doc",
		defaultValue: "Rust crates",
	}),
	Groups: [{ Label: null, Rows: RustCrates.map(ToRow) }],
});

/**
 * The viewer band's heading, which the page passes to `RecordBand`. It renders
 * `bare`: the band is the only section of the appendix card the page wraps it
 * in, so the card owns the surface, the ink and the inset and the band
 * contributes structure only (DESIGN.md §4.1, §9 Q1) - a second fill inside the
 * card would paint two boundaries at one edge (§7 DR-8).
 */
export const RustViewerBand = (T: DocTranslate) => ({
	kicker: "/VIEWER",
	heading: T("rust.viewer.heading", {
		ns: "doc",
		defaultValue: "Read it here",
	}),
	footnote: T("rust.viewer.footnote", {
		ns: "doc",
		defaultValue:
			"Each crate's rustdoc site is served separately and loads in the frame below. Source builds are active; the generated output tracks the Current branch.",
	}),
	tone: "bare" as const,
});
