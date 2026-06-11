import { cleanup, render, screen } from "@testing-library/react";

import UserEvent from "@testing-library/user-event";

import { afterEach, describe, expect, it, vi } from "vitest";

import { DynamicButton } from "../../Component/Dynamic/DynamicButton";

import type { ButtonContent } from "../../Component/Dynamic/Type.js";

afterEach(() => {
	cleanup();
});

describe("DynamicButton", () => {
	it("renders with text content", () => {
		const Content: ButtonContent = { Text: "Click Me" };

		render(<DynamicButton Content={Content} />);

		const ButtonElement = screen.getByRole("button", { name: "Click Me" });

		expect(ButtonElement).toBeInTheDocument();

		expect(ButtonElement).toHaveTextContent("Click Me");
	});

	it("calls onAction when clicked", async () => {
		const ActionHandler = vi.fn();

		const Content: ButtonContent = { Text: "Submit" };

		const User = UserEvent.setup();

		render(<DynamicButton Content={Content} OnAction={ActionHandler} />);

		const SubmitButton = screen.getByRole("button", { name: "Submit" });

		await User.click(SubmitButton);

		expect(ActionHandler).toHaveBeenCalledTimes(1);
	});

	it("calls content onClick when clicked", async () => {
		const ClickHandler = vi.fn();

		const Content: ButtonContent = {
			Text: "Action",
			OnClick: ClickHandler,
		};

		const User = UserEvent.setup();

		render(<DynamicButton Content={Content} />);

		const ActionButton = screen.getByRole("button", { name: "Action" });

		await User.click(ActionButton);

		expect(ClickHandler).toHaveBeenCalledTimes(1);
	});

	it("renders in disabled state", () => {
		const Content: ButtonContent = {
			Text: "Disabled",
			Disabled: true,
		};

		render(<DynamicButton Content={Content} />);

		const DisabledButton = screen.getByRole("button", {
			name: "Disabled",
		});

		expect(DisabledButton).toBeDisabled();
	});

	it("does not call onAction when disabled", async () => {
		const ActionHandler = vi.fn();

		const Content: ButtonContent = {
			Text: "Disabled",
			Disabled: true,
		};

		const User = UserEvent.setup();

		render(<DynamicButton Content={Content} OnAction={ActionHandler} />);

		const DisabledButton = screen.getByRole("button", {
			name: "Disabled",
		});

		await User.click(DisabledButton);

		expect(ActionHandler).not.toHaveBeenCalled();
	});

	it("renders in loading state with spinner", () => {
		const Content: ButtonContent = { Text: "Loading" };

		render(<DynamicButton Content={Content} IsLoading={true} />);

		const LoadingButton = screen.getByRole("button", { name: "Loading" });

		expect(LoadingButton).toBeDisabled();

		expect(LoadingButton).toHaveAttribute("aria-busy", "true");
	});

	it("does not call onAction when loading", async () => {
		const ActionHandler = vi.fn();

		const Content: ButtonContent = { Text: "Loading" };

		const User = UserEvent.setup();

		render(
			<DynamicButton
				Content={Content}
				OnAction={ActionHandler}
				IsLoading={true}
			/>,
		);

		const LoadingButton = screen.getByRole("button", { name: "Loading" });

		await User.click(LoadingButton);

		expect(ActionHandler).not.toHaveBeenCalled();
	});

	it("applies full width class when fullWidth is true", () => {
		const Content: ButtonContent = {
			Text: "Full Width",
			FullWidth: true,
		};

		render(<DynamicButton Content={Content} />);

		const FullWidthButton = screen.getByRole("button", {
			name: "Full Width",
		});

		expect(FullWidthButton.className).toContain("w-full");
	});

	it("renders with different variants", () => {
		const Content: ButtonContent = {
			Text: "Destructive",
			Variant: "destructive",
		};

		render(<DynamicButton Content={Content} />);

		const DestructiveButton = screen.getByRole("button", {
			name: "Destructive",
		});

		expect(DestructiveButton).toBeInTheDocument();
	});
});
