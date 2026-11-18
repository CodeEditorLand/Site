import { render, screen, waitFor } from "@testing-library/react";

import UserEvent from "@testing-library/user-event";

import { afterEach, describe, expect, it, vi } from "vitest";

import { Palette } from "../../Component/UI/Palette/Palette";

import type { PaletteRegister } from "../../Component/UI/Palette/Type";

// cmdk measures the list with a ResizeObserver and scrolls the selected row into
// view; jsdom has neither. Both are browser APIs the control genuinely uses, so
// the test supplies the smallest honest stand-ins rather than skipping the paths
// that touch them.
class ResizeObserverStub {
	observe() {}

	unobserve() {}

	disconnect() {}
}

globalThis.ResizeObserver =
	ResizeObserverStub as unknown as typeof ResizeObserver;

Element.prototype.scrollIntoView = () => {};

/**
 * The palette's contract, exercised rather than described.
 *
 * Four things are asserted, and each is one line of the card's acceptance
 * reading:
 *
 *   reachable by keyboard alone   the trigger is a button in the document and the
 *                                 chord opens the same dialog
 *   operable by keyboard alone    ArrowDown + Enter reaches a destination
 *   dismissal is predictable      Escape closes, and focus goes back to the door
 *   adverse states are designed   a query with no match is a composition, not a
 *                                 blank list
 *
 * The register is a fixture, not the collection: what is under test is the
 * control, and a fixture of five rows makes a count assertion readable as a
 * number rather than as arithmetic over the manual.
 */

const Register: PaletteRegister = {
	Routes: [
		{
			Id: "part-home",
			Label: "HOME",
			Href: "/",
			Part: "01",
			Kind: "route",
		},
		{
			Id: "part-doc",
			Label: "DOCUMENTATION",
			Href: "/Doc",
			Part: "03",
			Kind: "route",
		},
	],
	Doc: [
		{
			Id: "doc-start",
			Label: "Start",
			Pages: [
				{
					Id: "page-install",
					Label: "Install",
					Href: "/Doc/install",
					Section: "Start",
					Kind: "page",
				},
				{
					Id: "page-first-run",
					Label: "First Run",
					Href: "/Doc/first-run",
					Section: "Start",
					Kind: "page",
				},
			],
		},
	],
	Actions: [{ Id: "action-copy", Label: "COPY ADDRESS", Kind: "action" }],

	// The two registers the site adds, empty in the fixture: what is under test is
	// the control's behaviour over a register, and five routes plus four pages is
	// a register whose count reads as a number rather than as arithmetic.
	Records: [],
	Terms: [],
};

const Open = async () => {
	const User = UserEvent.setup();

	await User.click(screen.getByRole("button", { name: /find a record/i }));

	return User;
};

const Count = () => document.querySelector(".Palette__Count")?.textContent;

afterEach(() => {
	vi.restoreAllMocks();
});

describe("Palette", () => {
	it("is reachable without a pointer: the trigger is a button in the document", () => {
		render(<Palette Register={Register} />);

		expect(
			screen.getByRole("button", { name: /find a record/i }),
		).toBeInTheDocument();
	});

	it("opens on the chord, and the register line prints the live count", async () => {
		render(<Palette Register={Register} />);

		const User = UserEvent.setup();

		await User.keyboard("{Meta>}k{/Meta}");

		await waitFor(() =>
			expect(screen.getByRole("dialog")).toBeInTheDocument(),
		);

		// Two routes, two pages, one action.
		expect(Count()).toBe("05");
	});

	it("filters the register and prints the count of what matched", async () => {
		render(<Palette Register={Register} />);

		const User = await Open();

		await User.type(screen.getByLabelText(/filter the index/i), "install");

		await waitFor(() => expect(Count()).toBe("01"));

		expect(
			screen.getByRole("option", { name: /install/i }),
		).toBeInTheDocument();
		expect(screen.queryByRole("option", { name: /first run/i })).toBeNull();
	});

	it("keeps the section as a heading, so a result arrives with its context", async () => {
		render(<Palette Register={Register} />);

		const User = await Open();

		await User.type(screen.getByLabelText(/filter the index/i), "first");

		await waitFor(() =>
			expect(screen.getByText("Start")).toBeInTheDocument(),
		);

		expect(
			screen.getByRole("option", { name: /first run/i }),
		).toBeInTheDocument();
	});

	it("is operable by keyboard alone: ArrowDown then Enter reaches a destination", async () => {
		const OnNavigate = vi.fn();

		render(<Palette Register={Register} OnNavigate={OnNavigate} />);

		const User = await Open();

		// The first row is selected on open; one step down is the second route.
		await User.keyboard("{ArrowDown}{Enter}");

		await waitFor(() => expect(OnNavigate).toHaveBeenCalledWith("/Doc"));
	});

	it("closes on Escape and returns focus to the door it came through", async () => {
		render(<Palette Register={Register} />);

		const User = await Open();

		await waitFor(() =>
			expect(screen.getByRole("dialog")).toBeInTheDocument(),
		);

		await User.keyboard("{Escape}");

		await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: /find a record/i }),
			).toHaveFocus(),
		);
	});

	it("holds 'too much' with a scope control, not with truncation", async () => {
		render(<Palette Register={Register} />);

		const User = await Open();

		expect(
			screen.getByRole("radiogroup", { name: /scope/i }),
		).toBeInTheDocument();

		await User.click(screen.getByRole("radio", { name: "DOC" }));

		// The parts leave the register; the manual stays.
		expect(screen.queryByRole("option", { name: /home/i })).toBeNull();
		expect(
			screen.getByRole("option", { name: /install/i }),
		).toBeInTheDocument();
	});

	it("designs the empty state: what is missing, and what to do about it", async () => {
		render(<Palette Register={Register} />);

		const User = await Open();

		await User.type(screen.getByLabelText(/filter the index/i), "zzzz");

		await waitFor(() => expect(Count()).toBe("00"));

		expect(screen.getByText("NO RECORD")).toBeInTheDocument();
		expect(
			screen.getByText(/try a part, a section, or a page name/i),
		).toBeInTheDocument();
	});
});
