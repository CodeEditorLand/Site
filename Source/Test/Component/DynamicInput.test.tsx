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
			label: "Email Address",
			placeholder: "Enter your email",
		};

		render(<DynamicInput content={Content} id="email-field" />);

		const LabelElement = screen.getByText("Email Address");
		const InputElement = screen.getByPlaceholderText("Enter your email");

		expect(LabelElement).toBeInTheDocument();
		expect(InputElement).toBeInTheDocument();
	});

	it("renders without label when not provided", () => {
		const Content: InputContent = {
			placeholder: "Type here",
		};

		render(<DynamicInput content={Content} id="no-label" />);

		const InputElement = screen.getByPlaceholderText("Type here");

		expect(InputElement).toBeInTheDocument();
	});

	it("calls onChange when value changes", async () => {
		const ChangeHandler = vi.fn();
		const Content: InputContent = {
			label: "Name",
			placeholder: "Enter name",
			onChange: ChangeHandler,
		};
		const User = UserEvent.setup();

		render(<DynamicInput content={Content} id="name-field" />);

		const InputElement = screen.getByPlaceholderText("Enter name");

		await User.type(InputElement, "John");

		expect(ChangeHandler).toHaveBeenCalled();
		expect(ChangeHandler).toHaveBeenLastCalledWith("John");
	});

	it("displays validation error message", () => {
		const Content: InputContent = {
			label: "Email",
			placeholder: "Enter email",
			error: "Invalid email address",
		};

		render(<DynamicInput content={Content} id="error-field" />);

		const ErrorMessage = screen.getByRole("alert");

		expect(ErrorMessage).toBeInTheDocument();
		expect(ErrorMessage).toHaveTextContent("Invalid email address");
	});

	it("marks input as aria-invalid when error is present", () => {
		const Content: InputContent = {
			label: "Email",
			placeholder: "Enter email",
			error: "Required field",
		};

		render(<DynamicInput content={Content} id="invalid-field" />);

		const InputElement = screen.getByPlaceholderText("Enter email");

		expect(InputElement).toHaveAttribute("aria-invalid", "true");
	});

	it("displays helper text when no error", () => {
		const Content: InputContent = {
			label: "Password",
			placeholder: "Enter password",
			helperText: "Must be at least 8 characters",
		};

		render(<DynamicInput content={Content} id="helper-field" />);

		const HelperText = screen.getByText("Must be at least 8 characters");

		expect(HelperText).toBeInTheDocument();
	});

	it("hides helper text when error is present", () => {
		const Content: InputContent = {
			label: "Password",
			placeholder: "Enter password",
			helperText: "Must be at least 8 characters",
			error: "Password too short",
		};

		render(<DynamicInput content={Content} id="error-helper-field" />);

		const ErrorMessage = screen.getByText("Password too short");
		const HelperText = screen.queryByText("Must be at least 8 characters");

		expect(ErrorMessage).toBeInTheDocument();
		expect(HelperText).not.toBeInTheDocument();
	});

	it("renders in disabled state", () => {
		const Content: InputContent = {
			label: "Disabled Input",
			placeholder: "Cannot type here",
			disabled: true,
		};

		render(<DynamicInput content={Content} id="disabled-field" />);

		const InputElement = screen.getByPlaceholderText("Cannot type here");

		expect(InputElement).toBeDisabled();
	});

	it("renders with default value", () => {
		const Content: InputContent = {
			label: "Prefilled",
			defaultValue: "Default Text",
		};

		render(<DynamicInput content={Content} id="default-field" />);

		const InputElement = screen.getByDisplayValue("Default Text");

		expect(InputElement).toBeInTheDocument();
	});

	it("sets required attribute when required is true", () => {
		const Content: InputContent = {
			label: "Required Field",
			placeholder: "This is required",
			required: true,
		};

		render(<DynamicInput content={Content} id="required-field" />);

		const InputElement = screen.getByPlaceholderText("This is required");

		expect(InputElement).toBeRequired();
	});
});
