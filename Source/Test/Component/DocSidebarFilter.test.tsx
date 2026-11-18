import { render, screen, waitFor } from "@testing-library/react";

import UserEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { DynamicDocSidebar } from "../../Component/Dynamic/DynamicDocSidebar";

import type { DocSection } from "../../Component/Dynamic/Interface/Content/Page/Doc";

/**
 * The rail as a control, exercised rather than described.
 *
 * Three assertions, one per thing this card added to the tree:
 *
 *   the count    a closed section prints how many pages are behind it
 *   the filter   a query prunes the tree and keeps the sections as headings
 *   the handoff  a query with no match is a way out, not a dead end - and the
 *                way out carries the reader's own words to the palette
 */

const Sections: DocSection[] = [
	{
		Id: "start",
		Label: "Start",
		Children: [
			{ Id: "install", Label: "Install" },
			{ Id: "first-run", Label: "First Run" },
		],
	},
	{
		Id: "deep-dive",
		Label: "Deep Dive",
		Children: [
			{
				Id: "deep-dive-mountain",
				Label: "Mountain",
				Children: [
					{ Id: "mountain-ipc", Label: "IPC Layer" },
					{ Id: "mountain-fs", Label: "Filesystem Footprint" },
				],
			},
			{ Id: "deep-dive-wind", Label: "Wind" },
		],
	},
];

const Counts = () =>
	Array.from(document.querySelectorAll(".doc-sidebar__count")).map(
		(Node) => Node.textContent,
	);

describe("DynamicDocSidebar", () => {
	it("prints how many pages sit behind a closed section", () => {
		render(<DynamicDocSidebar Sections={Sections} />);

		// Start holds 2, Deep Dive holds 3 - the group's two leaves and Wind.
		expect(Counts()).toEqual(["02", "03"]);
	});

	it("filters the tree and keeps the sections as headings", async () => {
		const User = UserEvent.setup();

		render(<DynamicDocSidebar Sections={Sections} />);

		await User.type(
			screen.getByLabelText(/filter documentation pages/i),
			"ipc",
		);

		await waitFor(() =>
			expect(screen.getByText("IPC Layer")).toBeInTheDocument(),
		);

		// The matching leaf's section and group survive as context; everything else
		// leaves the tree.
		expect(screen.getByText("Deep Dive")).toBeInTheDocument();
		expect(screen.getByText("Mountain")).toBeInTheDocument();
		expect(screen.queryByText("Install")).toBeNull();
		expect(screen.queryByText("Filesystem Footprint")).toBeNull();
	});

	it("matches a slug as well as a label", async () => {
		const User = UserEvent.setup();

		render(<DynamicDocSidebar Sections={Sections} />);

		await User.type(
			screen.getByLabelText(/filter documentation pages/i),
			"first-run",
		);

		await waitFor(() =>
			expect(screen.getByText("First Run")).toBeInTheDocument(),
		);

		expect(screen.queryByText("Install")).toBeNull();
	});

	it("hands off to the palette with the reader's own query", async () => {
		const User = UserEvent.setup();

		render(<DynamicDocSidebar Sections={Sections} />);

		const Listener = vi.fn();

		window.addEventListener("palette:open", Listener);

		await User.type(
			screen.getByLabelText(/filter documentation pages/i),
			"zzzz",
		);

		await waitFor(() =>
			expect(screen.getByText("NO PAGE")).toBeInTheDocument(),
		);

		expect(
			screen.getByText(/nothing in the manual matches/i),
		).toBeInTheDocument();

		await User.click(
			screen.getByRole("button", { name: /find all records/i }),
		);

		expect(Listener).toHaveBeenCalledTimes(1);

		expect(
			(Listener.mock.calls[0]![0] as CustomEvent<{ query: string }>)
				.detail.query,
		).toBe("zzzz");

		window.removeEventListener("palette:open", Listener);
	});
});
