import { cleanup, render, screen } from "@testing-library/react";

import UserEvent from "@testing-library/user-event";

import { afterEach, describe, expect, it, vi } from "vitest";

import { DynamicInput } from "../../Component/Dynamic/DynamicInput";

import type { InputContent } from "../../Component/Dynamic/Type.js";

afterEach(() => {
	cleanup();
});

describe("DynamicInput", () => {
	it("renders with label and placeholder", () => {
		const Content: InputContent = {
			Label: "Email Address",
			Placeholder: "Enter your email",
		};

		render(<DynamicInput Content={Content} Id="email-field" />);

		const LabelElement = screen.getByText("Email Address");

		const InputElement = screen.getByPlaceholderText("Enter your email");

		expect(LabelElement).toBeInTheDocument();

		expect(InputElement).toBeInTheDocument();
	});

	it("renders without label when not provided", () => {
		const Content: InputContent = {
			Placeholder: "Type here",
		};

		render(<DynamicInput Content={Content} Id="no-label" />);

		const InputElement = screen.getByPlaceholderText("Type here");

		expect(InputElement).toBeInTheDocument();
	});

	it("calls onChange when value changes", async () => {
		const ChangeHandler = vi.fn();

		const Content: InputContent = {
			Label: "Name",
			Placeholder: "Enter name",
			OnChange: ChangeHandler,
		};

		const User = UserEvent.setup();

		render(<DynamicInput Content={Content} Id="name-field" />);

		const InputElement = screen.getByPlaceholderText("Enter name");

		await User.type(InputElement, "John");

		expect(ChangeHandler).toHaveBeenCalled();

		expect(ChangeHandler).toHaveBeenLastCalledWith("John");
	});

	it("displays validation error message", () => {
		const Content: InputContent = {
			Label: "Email",
			Placeholder: "Enter email",
			Error: "Invalid email address",
		};

		render(<DynamicInput Content={Content} Id="error-field" />);

		const ErrorMessage = screen.getByRole("alert");

		expect(ErrorMessage).toBeInTheDocument();

		expect(ErrorMessage).toHaveTextContent("Invalid email address");
	});

	it("marks input as aria-invalid when error is present", () => {
		const Content: InputContent = {
			Label: "Email",
			Placeholder: "Enter email",
			Error: "Required field",
		};

		render(<DynamicInput Content={Content} Id="invalid-field" />);

		const InputElement = screen.getByPlaceholderText("Enter email");

		expect(InputElement).toHaveAttribute("aria-invalid", "true");
	});

	it("displays helper text when no error", () => {
		const Content: InputContent = {
			Label: "Password",
			Placeholder: "Enter password",
			HelperText: "Must be at least 8 characters",
		};

		render(<DynamicInput Content={Content} Id="helper-field" />);

		const HelperText = screen.getByText("Must be at least 8 characters");

		expect(HelperText).toBeInTheDocument();
	});

	it("hides helper text when error is present", () => {
		const Content: InputContent = {
			Label: "Password",
			Placeholder: "Enter password",
			HelperText: "Must be at least 8 characters",
			Error: "Password too short",
		};

		render(<DynamicInput Content={Content} Id="error-helper-field" />);

		const ErrorMessage = screen.getByText("Password too short");

		const HelperText = screen.queryByText("Must be at least 8 characters");

		expect(ErrorMessage).toBeInTheDocument();

		expect(HelperText).not.toBeInTheDocument();
	});

	it("renders in disabled state", () => {
		const Content: InputContent = {
			Label: "Disabled Input",
			Placeholder: "Cannot type here",
			Disabled: true,
		};

		render(<DynamicInput Content={Content} Id="disabled-field" />);

		const InputElement = screen.getByPlaceholderText("Cannot type here");

		expect(InputElement).toBeDisabled();
	});

	it("renders with default value", () => {
		const Content: InputContent = {
			Label: "Prefilled",
			DefaultValue: "Default Text",
		};

		render(<DynamicInput Content={Content} Id="default-field" />);

		const InputElement = screen.getByDisplayValue("Default Text");

		expect(InputElement).toBeInTheDocument();
	});

	it("sets required attribute when required is true", () => {
		const Content: InputContent = {
			Label: "Required Field",
			Placeholder: "This is required",
			Required: true,
		};

		render(<DynamicInput Content={Content} Id="required-field" />);

		const InputElement = screen.getByPlaceholderText("This is required");

		expect(InputElement).toBeRequired();
	});
});
