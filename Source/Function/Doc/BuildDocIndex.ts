/**
 * BuildDocIndex - the documentation index's complete band stack.
 *
 * The index is a map, not a card wall: one band per section, the section name
 * as the heading and the page count in the kicker (`/ELEMENTS` U+2001
 * `16 PAGES`), then one dense row per page - `navTitle` (or `title`), the
 * page's `description` as the row's note, in `order`.
 *
 * Three things this module decides so the page does not have to:
 *
 * - **Order.** Entries arrive already sorted by `order` (the page sorts the
 *   collection once) and are grouped by `section` in `SectionOrder` order. No
 *   row is ever re-sorted here, so a page's position is the position the
 *   collection gave it, and `order` ties stay in collection order.
 * - **Group runs.** A page that carries `group` (only `Filesystem Footprint`
 *   does today) starts or extends a run, so the seven pages read under one
 *   sub-label instead of repeating it seven times.
 * - **No surface.** A band is a section of one artifact, so it carries no
 *   tone: the page paints one surface for the whole index and the bands render
 *   `bare` inside it (DESIGN.md §5 A5, §9 Q1). An alternation chosen here was
 *   a surface rhythm borrowed from another site, and it made one map read as a
 *   stack of chapters.
 *
 * The four appendix bands (where to start, architecture, backend services,
 * live deployments) are built here too: they are the same `DocBand` shape as a
 * section, so the page maps ONE component over ONE array.
 *
 * Copy stays at the call site: every label and sentence below comes from an
 * existing i18n key, read through the `T` the page passes in. This module never
 * imports the i18n client.
 */
import type { CollectionEntry } from "astro:content";

import type { DocBand, DocGroupRun, DocLink, DocTranslate } from "../../Component/Doc/Type.js";

import { SectionOrder, Slugify } from "./BuildDocSidebar.js";

/** A run of rows under one sub-label, built in encounter order. */
const ToRuns = (Entries: CollectionEntry<"doc">[]): DocGroupRun[] => {
	const Runs: { Label: string | null; Rows: DocLink[] }[] = [];

	for (const Entry of Entries) {
		const Label = Entry.data.group ?? null;

		const Row: DocLink = {
			Id: Entry.id,
			Label: Entry.data.navTitle ?? Entry.data.title,
			Href: `/Doc/${Entry.id}`,
		};

		if (Entry.data.description) Row.Note = Entry.data.description;

		const Last = Runs[Runs.length - 1];

		if (Last && Last.Label === Label) {
			Last.Rows.push(Row);

			continue;
		}

		Runs.push({ Label, Rows: [Row] });
	}

	return Runs;
};

/**
 * `/${SECTION}` U+2001 `<count> PAGES`. The count word is copy and comes from
 * `T`; the section name is data and is upper-cased here, because the kicker's
 * voice is the design's, not the collection's.
 *
 * The separator is U+2001 EM QUAD, the only visual separator the grammar allows
 * (`DesignSystem-Grammar.md` §3, DESIGN.md §1.5) - the centre dot this string
 * used to carry is forbidden on a public surface.
 */
const ToKicker = (Section: string, Count: number, T: DocTranslate): string => {
	const Pages = T(Count === 1 ? "index.page" : "index.pages", {
		ns: "doc",
		defaultValue: Count === 1 ? "PAGE" : "PAGES",
	});

	return `/${Section.toUpperCase()}\u2001${Count} ${Pages}`;
};

/** The fifteen elements, as the architecture band's index strip. */
const Element = [
	"Mountain",
	"Cocoon",
	"Wind",
	"Sky",
	"Air",
	"Echo",
	"Common",
	"Vine",
	"Mist",
	"Rest",
	"Output",
	"Grove",
	"Worker",
	"SideCar",
	"Maintain",
];

/**
 * The appendix: the three ways in, the architecture summary, the backend
 * workers and the live deployments. Every row below existed on the page before
 * this module did - the hrefs, labels and descriptions are the page's own, moved
 * into data.
 */
const BuildAppendix = (T: DocTranslate): DocBand[] => {
	const Row = (
		Id: string,
		Label: string,
		Href: string,
		Note?: string,
		Blank?: boolean,
	): DocLink => ({
		Id,
		Label,
		Href,
		...(Note ? { Note } : {}),
		...(Blank ? { Blank } : {}),
	});

	const Workers = [
		{
			Id: "worker-auth",
			Label: "Auth",
			Href: "https://codeeditorland-auth.playform.workers.dev",
			Note: T("common.docs.workers.auth", {
				defaultValue: "OAuth 2.0, JWT session tokens, and Auth0 integration",
			}),
		},
		{
			Id: "worker-download",
			Label: "Download",
			Href: "https://codeeditorland-download.playform.workers.dev",
			Note: T("common.docs.workers.download", {
				defaultValue: "Binary distribution, release metadata, and update checks",
			}),
		},
		{
			Id: "worker-status",
			Label: "Status",
			Href: "https://codeeditorland-status.playform.workers.dev",
			Note: T("common.docs.workers.status", {
				defaultValue: "Health checks and uptime monitoring",
			}),
		},
		{
			Id: "worker-analytics",
			Label: "Analytics",
			Href: "https://codeeditorland-analytics.playform.workers.dev",
			Note: T("common.docs.workers.analytics", {
				defaultValue:
					"Privacy-first usage telemetry routed through Cloudflare Analytics Engine",
			}),
		},
	].map((Worker) => Row(Worker.Id, Worker.Label, Worker.Href, Worker.Note, true));

	const Deployment = [
		{
			Id: "deployment-website",
			Label: T("common.docs.deployments.website", {
				defaultValue: "editor.land",
			}),
			Href: "/",
			Note: T("common.docs.deployments.website.description", {
				defaultValue: "Marketing website (Cloudflare Pages)",
			}),
			Blank: true,
		},
		{
			Id: "deployment-status",
			Label: T("common.docs.deployments.status", { defaultValue: "Status" }),
			Href: "https://Status.editor.land",
			Note: T("common.docs.deployments.status.description", {
				defaultValue: "Uptime dashboard (Cloudflare Pages)",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-mountain",
			Label: T("common.docs.deployments.rustMountain", {
				defaultValue: "Rust API: Mountain",
			}),
			Href: "https://Rust.Documentation.Mountain.editor.land",
			Note: T("common.docs.deployments.rustMountain.description", {
				defaultValue: "rustdoc for Mountain, Echo, Common, Air, SideCar",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-rest",
			Label: T("common.docs.deployments.rustRest", {
				defaultValue: "Rust API: Rest",
			}),
			Href: "https://Rust.Documentation.Rest.editor.land",
			Note: T("common.docs.deployments.rustRest.description", {
				defaultValue: "rustdoc for OXC-powered TypeScript compiler",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-maintain",
			Label: T("common.docs.deployments.rustMaintain", {
				defaultValue: "Rust API: Maintain",
			}),
			Href: "https://Rust.Documentation.Maintain.editor.land",
			Note: T("common.docs.deployments.rustMaintain.description", {
				defaultValue: "rustdoc for build orchestrator",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-common",
			Label: T("common.docs.deployments.rustCommon", {
				defaultValue: "Rust API: Common",
			}),
			Href: "https://Rust.Documentation.Common.editor.land",
			Note: T("common.docs.deployments.rustCommon.description", {
				defaultValue: "rustdoc for abstract traits and DTOs",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-echo",
			Label: T("common.docs.deployments.rustEcho", {
				defaultValue: "Rust API: Echo",
			}),
			Href: "https://Rust.Documentation.Echo.editor.land",
			Note: T("common.docs.deployments.rustEcho.description", {
				defaultValue: "rustdoc for work-stealing scheduler",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-air",
			Label: T("common.docs.deployments.rustAir", {
				defaultValue: "Rust API: Air",
			}),
			Href: "https://Rust.Documentation.Air.editor.land",
			Note: T("common.docs.deployments.rustAir.description", {
				defaultValue: "rustdoc for background daemon",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-sidecar",
			Label: T("common.docs.deployments.rustSideCar", {
				defaultValue: "Rust API: SideCar",
			}),
			Href: "https://Rust.Documentation.SideCar.editor.land",
			Note: T("common.docs.deployments.rustSideCar.description", {
				defaultValue: "rustdoc for Node.js binary distribution",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-land",
			Label: T("common.docs.deployments.rustLand", {
				defaultValue: "Rust API: Land (Workspace)",
			}),
			Href: "https://Rust.Documentation.Land.editor.land",
			Note: T("common.docs.deployments.rustLand.description", {
				defaultValue: "rustdoc for the top-level workspace",
			}),
			Blank: true,
		},
		{
			Id: "deployment-knowledge",
			Label: T("common.docs.deployments.knowledge", {
				defaultValue: "Knowledge Base",
			}),
			Href: "https://Knowledge.editor.land",
			Note: T("common.docs.deployments.knowledge.description", {
				defaultValue: "Architecture knowledge graph (Cloudflare Pages)",
			}),
			Blank: true,
		},
		{
			Id: "deployment-rust-interactive",
			Label: T("common.docs.deployments.rustInteractive", {
				defaultValue: "Rust API (Interactive)",
			}),
			Href: "/Doc/Rust",
			Note: T("common.docs.deployments.rustInteractive.description", {
				defaultValue: "Browse all rustdoc sites with embedded iframes",
			}),
		},
	].map((Entry) =>
		Row(Entry.Id, Entry.Label, Entry.Href, Entry.Note, Entry.Blank ?? false),
	);

	return [
		{
			Id: "start-here",
			Kicker: "/START HERE",
			Heading: T("index.start.heading", { ns: "doc", defaultValue: "Where to Start" }),
			Groups: [
				{
					Label: null,
					Rows: [
						Row(
							"start-readme",
							T("common.docs.gettingStarted.title", {
								defaultValue: "Get Started in Minutes",
							}),
							"https://github.com/CodeEditorLand/Land#readme",
							T("common.docs.gettingStarted.description", {
								defaultValue:
									"The README walks you through installation, first build, and the fifteen-element architecture. No prior Rust or Tauri knowledge required.",
							}),
							true,
						),
						Row(
							"start-issues",
							T("common.docs.issueTracker.title", {
								defaultValue: "Report a Bug or Request a Feature",
							}),
							"https://github.com/CodeEditorLand/Land/issues",
							T("common.docs.issueTracker.description", {
								defaultValue:
									"Open an issue on GitHub. The team monitors daily and labels good-first-issue tasks for new contributors.",
							}),
							true,
						),
						Row(
							"start-rust",
							T("common.docs.rustApi.title", {
								defaultValue: "Rust API Reference",
							}),
							"/Doc/Rust",
							T("common.docs.rustApi.description", {
								defaultValue:
									"Browse generated rustdoc output for Mountain, Echo, Air, and 7 more Rust crates.",
							}),
						),
					],
				},
			],
		},
		{
			Id: "architecture",
			Kicker: "/ARCHITECTURE",
			Heading: T("common.docs.architecture.heading", {
				defaultValue: "How Land Replaces VS Code's Electron Stack",
			}),
			Lede: T("common.docs.architecture.intro", {
				defaultValue:
					"VS Code runs on Electron: a Chromium browser, a Node.js runtime, and an extension-host model. Land replaces those pieces with independent elements while preserving the VS Code extension API as the compatibility target. Browse individual elements in the Element section above, or explore the workspace on GitHub.",
			}),
			Index: Element.map((Name) => ({
				label: Name,
				href: `/Doc/${Name.toLowerCase()}`,
			})),
			Groups: [
				{
					Label: null,
					Rows: [
						Row(
							"architecture-repositories",
							T("common.docs.repositories.viewAll", {
								defaultValue: "View all repositories",
							}),
							"https://github.com/CodeEditorLand",
							undefined,
							true,
						),
					],
				},
			],
		},
		{
			Id: "backend",
			Kicker: "/BACKEND",
			Heading: T("common.docs.workers.heading", { defaultValue: "Backend Services" }),
			Lede: T("common.docs.workers.intro", {
				defaultValue: "Four Cloudflare Workers power the Land backend infrastructure:",
			}),
			Groups: [{ Label: null, Rows: Workers }],
		},
		{
			Id: "deployments",
			Kicker: "/DEPLOYMENTS",
			Heading: T("common.docs.deployments.heading", {
				defaultValue: "Live Deployments",
			}),
			Lede: T("common.docs.deployments.intro", {
				defaultValue:
					"Public website and documentation surfaces are deployed separately from the local editor runtime:",
			}),
			Groups: [{ Label: null, Rows: Deployment }],
		},
	];
};

/**
 * The whole index: the ten section bands in `SectionOrder`, then the four
 * appendix bands. No band carries a surface - the page paints one card for the
 * index and one per appendix, and every band renders `bare` inside it.
 *
 * A section that no entry declares is dropped rather than rendered empty -
 * `Telemetry` is in `SectionOrder` but the four telemetry pages carry
 * `section: Development`, so its band must not appear as a heading with no
 * rows under it.
 */
const BuildDocIndex = (
	Entries: CollectionEntry<"doc">[],
	T: DocTranslate,
): DocBand[] => {
	const BySection = new Map<string, CollectionEntry<"doc">[]>();

	for (const Entry of Entries) {
		const Section = Entry.data.section ?? "Other";

		if (!BySection.has(Section)) BySection.set(Section, []);

		BySection.get(Section)!.push(Entry);
	}

	const Sections = SectionOrder.filter((Section) => BySection.has(Section)).map(
		(Section): DocBand => {
			const Group = BySection.get(Section)!;

			return {
				Id: Slugify(Section),
				Kicker: ToKicker(Section, Group.length, T),
				Heading: Section,
				Groups: ToRuns(Group),
			};
		},
	);

	return [...Sections, ...BuildAppendix(T)];
};

export default BuildDocIndex;
