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
		const Content: ButtonContent = { text: "Click Me" };

		render(<DynamicButton content={Content} />);

		const ButtonElement = screen.getByRole("button", { name: "Click Me" });

		expect(ButtonElement).toBeInTheDocument();
		expect(ButtonElement).toHaveTextContent("Click Me");
	});

	it("calls onAction when clicked", async () => {
		const ActionHandler = vi.fn();
		const Content: ButtonContent = { text: "Submit" };
		const User = UserEvent.setup();

		render(<DynamicButton content={Content} onAction={ActionHandler} />);

		const SubmitButton = screen.getByRole("button", { name: "Submit" });

		await User.click(SubmitButton);

		expect(ActionHandler).toHaveBeenCalledTimes(1);
	});

	it("calls content onClick when clicked", async () => {
		const ClickHandler = vi.fn();
		const Content: ButtonContent = {
			text: "Action",
			onClick: ClickHandler,
		};
		const User = UserEvent.setup();

		render(<DynamicButton content={Content} />);

		const ActionButton = screen.getByRole("button", { name: "Action" });

		await User.click(ActionButton);

		expect(ClickHandler).toHaveBeenCalledTimes(1);
	});

	it("renders in disabled state", () => {
		const Content: ButtonContent = {
			text: "Disabled",
			disabled: true,
		};

		render(<DynamicButton content={Content} />);

		const DisabledButton = screen.getByRole("button", {
			name: "Disabled",
		});

		expect(DisabledButton).toBeDisabled();
	});

	it("does not call onAction when disabled", async () => {
		const ActionHandler = vi.fn();
		const Content: ButtonContent = {
			text: "Disabled",
			disabled: true,
		};
		const User = UserEvent.setup();

		render(<DynamicButton content={Content} onAction={ActionHandler} />);

		const DisabledButton = screen.getByRole("button", {
			name: "Disabled",
		});

		await User.click(DisabledButton);

		expect(ActionHandler).not.toHaveBeenCalled();
	});

	it("renders in loading state with spinner", () => {
		const Content: ButtonContent = { text: "Loading" };

		render(<DynamicButton content={Content} isLoading={true} />);

		const LoadingButton = screen.getByRole("button", { name: "Loading" });

		expect(LoadingButton).toBeDisabled();
		expect(LoadingButton).toHaveAttribute("aria-busy", "true");
	});

	it("does not call onAction when loading", async () => {
		const ActionHandler = vi.fn();
		const Content: ButtonContent = { text: "Loading" };
		const User = UserEvent.setup();

		render(
			<DynamicButton
				content={Content}
				onAction={ActionHandler}
				isLoading={true}
			/>,
		);

		const LoadingButton = screen.getByRole("button", { name: "Loading" });

		await User.click(LoadingButton);

		expect(ActionHandler).not.toHaveBeenCalled();
	});

	it("applies full width class when fullWidth is true", () => {
		const Content: ButtonContent = {
			text: "Full Width",
			fullWidth: true,
		};

		render(<DynamicButton content={Content} />);

		const FullWidthButton = screen.getByRole("button", {
			name: "Full Width",
		});

		expect(FullWidthButton.className).toContain("w-full");
	});

	it("renders with different variants", () => {
		const Content: ButtonContent = {
			text: "Destructive",
			variant: "destructive",
		};

		render(<DynamicButton content={Content} />);

		const DestructiveButton = screen.getByRole("button", {
			name: "Destructive",
		});

		expect(DestructiveButton).toBeInTheDocument();
	});
});
