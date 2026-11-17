import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DynamicPricing } from "../../Component/Dynamic/DynamicPricing";

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

/**
 * One state of the release manifest.
 *
 * The band prints one offer in two states, so a tier is a state rather than an
 * edition: `Identifier` selects the phase vocabulary in `Roadmap/Data.ts`, and
 * `Element` and `Feature` are the two ledgers it prints. Both are required by
 * the component's own `PhasesOf` - a tier without a `Feature` array has nothing
 * to print.
 */
const MakePhase = (
	Identifier: string,
	Name: string,
	Extra: Record<string, unknown> = {},
) => ({
	Identifier,

	Name,

	Price: { Monthly: 0, Yearly: 0 },

	Feature: [
		"Installed extensions run unmodified through Cocoon",

		"Tauri desktop path uses the operating system WebView",
	],

	CTA: { Text: "Build from source", Href: "/Download" },

	...Extra,
});

describe("DynamicPricing", () => {
	it("prints one manifest carrying one state per tier", () => {
		const { container } = render(
			<DynamicPricing
				Content={{
					Tier: [
						MakePhase("free", "ACTIVE NOW"),

						MakePhase("progress", "V1.0"),
					],
				}}
			/>,
		);

		expect(screen.getByText("# RELEASE_01")).toBeInTheDocument();

		expect(screen.getByText("# RELEASE_02")).toBeInTheDocument();

		expect(
			screen.getByRole("heading", { name: "ACTIVE NOW" }),
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", { name: "V1.0" }),
		).toBeInTheDocument();

		// The budget is one manifest: both states sit on one surface, not on
		// two cards (DesignSystem-Grammar §8).
		expect(container.querySelectorAll("jelly-card")).toHaveLength(1);

		// And the band opens on the conditions layer of the escalation order.
		expect(
			screen.getByText("# CONDITIONS_01 /RELEASE STATE"),
		).toBeInTheDocument();
	});

	it("states the release conditions the hero no longer prints", () => {
		render(
			<DynamicPricing
				Content={{ Tier: [MakePhase("free", "ACTIVE NOW")] }}
			/>,
		);

		// The record's own status line, and the three qualifiers that say what
		// is still missing - moved here from the hero card.
		expect(screen.getByText("STATUS:")).toBeInTheDocument();

		expect(screen.getByText("SOURCE ACTIVE")).toBeInTheDocument();

		expect(screen.getByText("PRE-RELEASE")).toBeInTheDocument();

		expect(screen.getByText("INSTALLERS PENDING")).toBeInTheDocument();

		expect(
			screen.getByText("EXTENSION COVERAGE IN PROGRESS"),
		).toBeInTheDocument();
	});

	it("prints each state's standing as labelled facts", () => {
		render(
			<DynamicPricing
				Content={{ Tier: [MakePhase("free", "ACTIVE NOW")] }}
			/>,
		);

		expect(screen.getByText("PHASE: ACTIVE SOURCE")).toBeInTheDocument();

		expect(screen.getByText("STATUS: ACTIVE")).toBeInTheDocument();

		expect(
			screen.getByText("TARGET: NATIVE DESKTOP PATH"),
		).toBeInTheDocument();

		expect(
			screen.getByText("SIGNAL: NO CHROMIUM / NO ELECTRON / CC0"),
		).toBeInTheDocument();
	});

	it("keeps the content's own status word over the manifest's", () => {
		render(
			<DynamicPricing
				Content={{
					Tier: [MakePhase("progress", "V1.0", { Status: "WIP" })],
				}}
			/>,
		);

		// The V1.0 tier states WIP, so the manifest's LOADING never prints -
		// the qualifier a reader sees is the one the content asserts.
		expect(screen.getByText("STATUS: WIP")).toBeInTheDocument();

		expect(screen.queryByText("STATUS: LOADING")).toBeNull();
	});

	it("prints an element string as a row split at its line breaks", () => {
		render(
			<DynamicPricing
				Content={{
					Tier: [
						MakePhase("free", "ACTIVE NOW", {
							Element: [
								"Mountain\nNative Backend\nReplaces Electron main process, no bundled Chromium",
							],
						}),
					],
				}}
			/>,
		);

		// Name, role and detail are the row's key, value and note - and the
		// key links to the element's own documentation page.
		const Key = screen.getByRole("link", { name: "Mountain" });

		expect(Key).toHaveAttribute("href", "/Doc/mountain");

		expect(screen.getByText("Native Backend")).toBeInTheDocument();

		expect(
			screen.getByText(
				"Replaces Electron main process, no bundled Chromium",
			),
		).toBeInTheDocument();
	});

	it("prints each capability sentence under the label the manifest gave it", () => {
		render(
			<DynamicPricing
				Content={{
					Tier: [
						MakePhase("free", "ACTIVE NOW", {
							Feature: [
								"Installed extensions run unmodified through Cocoon",
							],
						}),
					],
				}}
			/>,
		);

		// Both halves survive: the label the manifest rows carried, and the
		// whole sentence it was condensed from.
		expect(screen.getByText("EXTENSIONS")).toBeInTheDocument();

		expect(
			screen.getByText(
				"Installed extensions run unmodified through Cocoon",
			),
		).toBeInTheDocument();
	});

	it("marks a capability the manifest has no label for by its position", () => {
		render(
			<DynamicPricing
				Content={{
					Tier: [
						MakePhase("unmapped", "ACTIVE NOW", {
							Feature: [
								"One sentence with no label in the manifest",
							],
						}),
					],
				}}
			/>,
		);

		expect(screen.getByText("# 01")).toBeInTheDocument();

		expect(
			screen.getByText("One sentence with no label in the manifest"),
		).toBeInTheDocument();
	});

	it("prints the subtitle as one paragraph per block", () => {
		render(
			<DynamicPricing
				Content={{
					Title: "Roadmap",

					Subtitle:
						"Land is CC0.\n\nThe three labels are active source, integration work in progress, and release preparation.",

					Tier: [MakePhase("free", "ACTIVE NOW")],
				}}
			/>,
		);

		expect(
			screen.getByRole("heading", { level: 2, name: "Roadmap" }),
		).toBeInTheDocument();

		expect(screen.getByText("Land is CC0.")).toBeInTheDocument();

		expect(
			screen.getByText(
				"The three labels are active source, integration work in progress, and release preparation.",
			),
		).toBeInTheDocument();
	});

	it("prints no price, no billing toggle and no popular badge", () => {
		render(
			<DynamicPricing
				Content={{
					Tier: [
						MakePhase("free", "ACTIVE NOW", {
							Currency: "$",

							Popular: true,

							Highlighted: true,
						}),
					],
				}}
			/>,
		);

		// A price of nothing is not a price: the band prints what the two
		// states are, not what they cost.
		expect(screen.queryByText(/Most Popular/i)).toBeNull();

		expect(screen.queryByText(/\/month/i)).toBeNull();

		expect(screen.queryByText(/Monthly/i)).toBeNull();

		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});
});
