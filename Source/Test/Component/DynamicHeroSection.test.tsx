import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, describe, expect, it, vi } from "vitest";

import { DynamicHeroSection } from "../../Component/Dynamic/DynamicHeroSection";

afterEach(() => {
	cleanup();

	vi.restoreAllMocks();
});

const MinimalContent = {
	Title: "Build the future",

	TitleHighlight: "together",

	Subtitle: "A native code editor built with Rust and TypeScript.",

	PrimaryCTA: { Text: "Download", Href: "/Download" },
};

describe("DynamicHeroSection", () => {
	it("states the claim as the page's one h1, inside the record panel", () => {
		const { container } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		const Claim = screen.getByRole("heading", { level: 1 });

		expect(Claim).toHaveTextContent("RUST + TAURI");

		expect(screen.getByText("# LAND_01")).toBeInTheDocument();

		// The stamps carry their 〈 〉 brackets as aria-hidden glyphs, so the
		// container's text is the honest assertion for them.
		expect(container).toHaveTextContent("NO ELECTRON");

		// The route is split into slash, keyword and value spans.
		expect(
			screen.getByText("COMPAT", { selector: "span" }),
		).toBeInTheDocument();

		expect(screen.getByText("EXTENSIONS / UNMODIFIED")).toBeInTheDocument();

		// The title block and its relation are two tiers, not one line:
		// `LAND:` is the subject, `↳EDITOR WITHOUT CHROMIUM` the proposition.
		expect(screen.getByText("LAND:")).toBeInTheDocument();

		// The `↳` is an aria-hidden glyph in its own span, so the relation's
		// own text node is the assertion and the container carries the pair.
		expect(screen.getByText("EDITOR WITHOUT CHROMIUM")).toBeInTheDocument();

		expect(container).toHaveTextContent("↳EDITOR WITHOUT CHROMIUM");
	});

	it("is the two-panel artifact: a framed record card beside the evidence", () => {
		const { container } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		// The record panel: one Jelly surface, the card's own corner frame,
		// and the block's ledger inside it.
		expect(container.querySelectorAll("jelly-card")).toHaveLength(1);

		expect(container.querySelector(".CornerMarkShell")).not.toBeNull();

		expect(container.querySelectorAll(".CornerMarkTick")).toHaveLength(8);

		expect(container.querySelector(".record-ledger")).not.toBeNull();

		// The evidence panel: one image, full height, text-free - the caption
		// and the provenance sit below the frame, never over it.
		const Plate = screen.getByRole("img", {
			name: "Rain-speckled glass reflecting a green light at night",
		});

		expect(Plate).toHaveAttribute(
			"src",

			"/Evidence/Land/NightGlass-01.png",
		);

		expect(Plate).toHaveStyle({ objectFit: "cover" });

		expect(
			screen.getByText(
				"Night glass: rain on the pane, one green light behind it.",
			),
		).toBeInTheDocument();

		expect(
			screen.getByText("/Evidence/Land/NightGlass-01.png"),
		).toBeInTheDocument();

		// The hero is an artifact, not one of the page's bands.
		expect(container.querySelector(".record-band")).toBeNull();
	});

	it("prints the record's three metadata rows and no fourth", () => {
		const { container } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		// The colon is part of the label (`DESIGN-COMPLETE.md` §1.5), so the
		// key is asserted as the record prints it - the earlier assertion here
		// asked for `TARGET` and had been failing since the colons were
		// restored by K4.
		expect(screen.getByText("TARGET:")).toBeInTheDocument();

		expect(screen.getByText("MACOS / WINDOWS / LINUX")).toBeInTheDocument();

		expect(screen.getByText("LICENSE:")).toBeInTheDocument();

		expect(screen.getByText("CC0")).toBeInTheDocument();

		expect(screen.getByText("SIGNAL:")).toBeInTheDocument();

		expect(screen.getByText("LOCAL-FIRST")).toBeInTheDocument();

		// The specimen observation is the observation layer's, not the card's:
		// `DESIGN.md` §3.1 gives the hero card three rows.
		expect(container).not.toHaveTextContent("NOCTUA PRONUBA");

		// And the plain-language explanation belongs to the document
		// structure, so the card carries no standfirst.
		expect(
			screen.queryByText(
				"A native code editor built with Rust and TypeScript.",
			),
		).toBeNull();
	});

	it("states the release state without the qualifiers the manifest owns", () => {
		render(<DynamicHeroSection Content={MinimalContent} />);

		// FieldRecordStatus splits the label and the value (C17).
		expect(screen.getByText("STATUS:")).toBeInTheDocument();

		expect(screen.getByText("SOURCE ACTIVE")).toBeInTheDocument();

		// What is still missing is the release layer's statement
		// (`DynamicPricing`, the `# CONDITIONS_01` manifest).
		expect(screen.queryByText("PRE-RELEASE")).toBeNull();

		expect(screen.queryByText("INSTALLERS PENDING")).toBeNull();

		expect(screen.queryByText("EXTENSION COVERAGE IN PROGRESS")).toBeNull();
	});

	it("sends the primary destination to the page's own action", () => {
		const { rerender } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		expect(
			screen.getByRole("link", { name: "/READ THE DOCUMENTATION" }),
		).toHaveAttribute("href", "/Doc");

		expect(
			screen.getByRole("link", { name: "/BUILD FROM SOURCE" }),
		).toHaveAttribute("href", "/Download");

		rerender(
			<DynamicHeroSection
				Content={{
					...MinimalContent,

					PrimaryCTA: { Text: "Install", Href: "/Install" },
				}}
			/>,
		);

		// The primary destination follows the page's own action; the
		// documentation destination does not move.
		expect(
			screen.getByRole("link", { name: "/BUILD FROM SOURCE" }),
		).toHaveAttribute("href", "/Install");

		expect(
			screen.getByRole("link", { name: "/READ THE DOCUMENTATION" }),
		).toHaveAttribute("href", "/Doc");
	});

	it("offers one primary action and no second control", () => {
		const { container } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		// One Jelly button - the primary action - and the secondary
		// destination as a route line beside it.
		expect(container.querySelectorAll("jelly-button")).toHaveLength(1);

		expect(screen.getAllByRole("button")).toHaveLength(1);

		expect(
			screen.getByRole("link", { name: "/BUILD FROM SOURCE" }),
		).toContainElement(screen.getByRole("button"));
	});

	it("carries the runtime path as the pair's foot, not inside the evidence panel", () => {
		const { container } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		// The rail is the panel's wiring: it lives in its own block under the
		// pair (`hero-band__trace`), and it is not a child of the evidence
		// figure - which is what kept the plate from being full height.
		const Trace = container.querySelector(".hero-band__trace");

		expect(Trace).not.toBeNull();

		expect(Trace?.querySelector(".record-stage")).toBeNull();

		// The steps themselves arrive through the `stage` slot, so the unit
		// render (no slot) prints the label and reserves the block; the route
		// hands it the `RecordStage` the FeatureBand used to print.
		expect(Trace).toHaveTextContent("RUNTIME PATH");

		expect(
			container.querySelector(".hero-band__evidence .record-stage"),
		).toBeNull();
	});

	it("reserves the blank interval inside the card, hidden from readers", () => {
		const { container } = render(
			<DynamicHeroSection Content={MinimalContent} />,
		);

		const Blank = container.querySelector(".hero-band__blank");

		expect(Blank).not.toBeNull();

		// It is a reserved region, not content: the system requires 15-25% of
		// the card and the reader is told nothing by it.
		expect(Blank).toHaveAttribute("aria-hidden", "true");
	});

	it("is not a click target and carries no floating cards", () => {
		render(
			<DynamicHeroSection
				Content={{
					...MinimalContent,

					FloatingCard: [
						{ Id: "card-1", Title: "Rust Core", Color: [] },
					],

					RespectReducedMotion: true,
				}}
			/>,
		);

		// The old section was role="button" and sent the whole band, image
		// included, to one guessed destination.
		expect(
			screen.getByRole("region", { name: /LAND_01/ }),
		).not.toHaveAttribute("role", "button");

		// The floating technology cards belonged to the blank zone they
		// filled; their subjects are the proof band's rail now.
		expect(screen.queryByText("Rust Core")).not.toBeInTheDocument();
	});
});
