import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DynamicFeatures } from "../../Component/Dynamic/DynamicFeatures";

beforeEach(() => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,

		value: vi.fn().mockReturnValue({
			matches: false,

			addEventListener: vi.fn(),

			removeEventListener: vi.fn(),
		}),
	});
});

afterEach(() => {
	cleanup();

	vi.restoreAllMocks();
});

const SampleFeatures = [
	{
		Id: "performance",

		Icon: "Zap",

		Title: "Performance",

		Description: "Native speed via Rust.",
	},

	{
		Id: "compatibility",

		Icon: "Box",

		Title: "Compatibility",

		Description: "Run existing VS Code extensions.",
	},

	{
		Id: "architecture",

		Icon: "Cpu",

		Title: "Architecture",

		Description: "Effect-TS powered services.",
	},
];

const SampleContent = {
	Title: "Features",

	Subtitle: "What makes Land different.",

	Feature: SampleFeatures,
};

describe("DynamicFeatures", () => {
	it("prints one record per claim, marked by its place in the set", () => {
		render(<DynamicFeatures Content={SampleContent} />);

		// The marker is the position, zero-padded - the six properties are a
		// set, not named things, so the position is the only identity the
		// content gives them (Properties/Data.ts).
		expect(screen.getByText("# 01")).toBeInTheDocument();

		expect(screen.getByText("# 02")).toBeInTheDocument();

		expect(screen.getByText("# 03")).toBeInTheDocument();
	});

	it("prints each claim's own title and paragraph whole", () => {
		render(<DynamicFeatures Content={SampleContent} />);

		// The band exists for this copy: the properties' titles and
		// paragraphs, quoted rather than summarised.
		expect(
			screen.getByRole("heading", { name: "Performance" }),
		).toBeInTheDocument();

		expect(screen.getByText("Native speed via Rust.")).toBeInTheDocument();

		expect(
			screen.getByText("Run existing VS Code extensions."),
		).toBeInTheDocument();

		expect(
			screen.getByText("Effect-TS powered services."),
		).toBeInTheDocument();
	});

	it("names the band by its own heading, not by the content's old title", () => {
		render(<DynamicFeatures Content={SampleContent} />);

		const Heading = screen.getByRole("heading", {
			level: 2,

			name: "What the editor actually is.",
		});

		expect(Heading).toHaveAttribute("id", "FeaturesHeading");

		expect(
			screen.getByRole("region", {
				name: "What the editor actually is.",
			}),
		).toHaveAttribute("aria-labelledby", "FeaturesHeading");

		// The band opens on the observation layer of the escalation order.
		expect(screen.getByText("# OBSERVATION_01 /PROOF")).toBeInTheDocument();
	});

	it("prints the subtitle as the band's standfirst", () => {
		render(<DynamicFeatures Content={SampleContent} />);

		expect(
			screen.getByText("What makes Land different."),
		).toBeInTheDocument();
	});

	it("prints the record's own explanation even when the content has no subtitle", () => {
		render(<DynamicFeatures Content={{ Feature: SampleFeatures }} />);

		expect(screen.queryByText("What makes Land different.")).toBeNull();

		// The plain-language explanation moved here out of the hero card, so
		// the band always opens with it.
		expect(
			screen.getByText(
				"A native code editor with the soul of VS Code - and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use.",
			),
		).toBeInTheDocument();
	});

	it("puts every claim on a card filled with its element's own tint", () => {
		const { container } = render(
			<DynamicFeatures Content={SampleContent} />,
		);

		const Cards = Array.from(container.querySelectorAll("jelly-card"));

		expect(Cards).toHaveLength(SampleFeatures.length);

		// ElementOrder pairs the claims positionally with Mountain, Cocoon,
		// Wind - the same pairing HEAD used.
		expect(Cards[0].getAttribute("style")).toContain(
			"--jelly-fill: var(--ExtensionRustMute)",
		);

		expect(Cards[1].getAttribute("style")).toContain(
			"--jelly-fill: var(--SpinegRPCMute)",
		);

		expect(Cards[2].getAttribute("style")).toContain(
			"--jelly-fill: var(--OSMacOSMute)",
		);
	});

	it("prints the one architecture proof the layer is allowed", () => {
		const { container } = render(
			<DynamicFeatures Content={SampleContent} />,
		);

		const Rail = container.querySelector(".record-stage");

		expect(Rail?.querySelectorAll(".record-stage__item")).toHaveLength(4);

		expect(Rail).toHaveTextContent("Mountain");

		expect(Rail).toHaveTextContent("Cocoon");

		expect(Rail).toHaveTextContent("Sky");

		expect(Rail).toHaveTextContent("Wind");
	});

	it("prints the specimen observation the record carries", () => {
		const { container } = render(
			<DynamicFeatures Content={SampleContent} />,
		);

		expect(container).toHaveTextContent("NOCTUA PRONUBA");

		expect(container).toHaveTextContent("16.2 C");

		expect(container).toHaveTextContent("01.8 KM/H");
	});

	it("files the claims the layer cannot print instead of dropping them", () => {
		const { container } = render(
			<DynamicFeatures
				Content={{
					...SampleContent,

					Feature: [
						...SampleFeatures,

						{
							Id: "cross-platform",

							Icon: "Globe",

							Title: "One source tree, configured targets.",

							Description:
								"Tauri uses the OS WebView on each platform.",
						},
					],
				}}
			/>,
		);

		// The budget is three: the fourth is not a card.
		expect(container.querySelectorAll("jelly-card")).toHaveLength(3);

		// It is filed, with its title on the page and its paragraph in the
		// page that argues it.
		expect(
			screen.getByRole("link", {
				name: "One source tree, configured targets.",
			}),
		).toHaveAttribute("href", "/Doc/why-tauri");
	});
});
