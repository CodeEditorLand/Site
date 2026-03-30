import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "../../Components/ErrorBoundary";

// Component that throws an error for testing
function ThrowingComponent({ ShouldThrow }: { ShouldThrow: boolean }) {
	if (ShouldThrow) {
		throw new Error("Test error message");
	}
	return <div>Normal content</div>;
}

afterEach(() => {
	cleanup();
});

describe("ErrorBoundary", () => {
	let ConsoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		// Suppress console.error output during error boundary tests
		ConsoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
	});

	afterEach(() => {
		ConsoleErrorSpy.mockRestore();
	});

	it("renders children when no error occurs", () => {
		render(
			<ErrorBoundary>
				<div>Safe content</div>
			</ErrorBoundary>,
		);

		const SafeContent = screen.getByText("Safe content");

		expect(SafeContent).toBeInTheDocument();
	});

	it("displays default fallback when error occurs", () => {
		render(
			<ErrorBoundary>
				<ThrowingComponent ShouldThrow={true} />
			</ErrorBoundary>,
		);

		const ErrorHeading = screen.getByText("Something went wrong");
		const ErrorDescription = screen.getByText(
			"An unexpected error occurred. Please try again.",
		);
		const RetryButton = screen.getByRole("button", { name: "Try again" });

		expect(ErrorHeading).toBeInTheDocument();
		expect(ErrorDescription).toBeInTheDocument();
		expect(RetryButton).toBeInTheDocument();
	});

	it("displays custom fallback when provided", () => {
		const CustomFallback = <div>Custom error display</div>;

		render(
			<ErrorBoundary fallback={CustomFallback}>
				<ThrowingComponent ShouldThrow={true} />
			</ErrorBoundary>,
		);

		const CustomErrorDisplay = screen.getByText("Custom error display");

		expect(CustomErrorDisplay).toBeInTheDocument();
		expect(
			screen.queryByText("Something went wrong"),
		).not.toBeInTheDocument();
	});

	it("recovers when retry button is clicked", async () => {
		const User = UserEvent.setup();

		// We need a stateful wrapper to control the throwing behavior
		function TestWrapper() {
			const [ShouldThrow, SetShouldThrow] = React.useState(true);

			return (
				<div>
					<button onClick={() => SetShouldThrow(false)}>
						Fix Error
					</button>
					<ErrorBoundary>
						<ThrowingComponent ShouldThrow={ShouldThrow} />
					</ErrorBoundary>
				</div>
			);
		}

		render(<TestWrapper />);

		// Error boundary should show the default fallback
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();

		// Fix the error source first
		const FixButton = screen.getByRole("button", { name: "Fix Error" });
		await User.click(FixButton);

		// Click retry
		const RetryButton = screen.getByRole("button", { name: "Try again" });
		await User.click(RetryButton);

		// After retry with the error fixed, normal content should show
		expect(screen.getByText("Normal content")).toBeInTheDocument();
		expect(
			screen.queryByText("Something went wrong"),
		).not.toBeInTheDocument();
	});

	it("logs error to console when error occurs", () => {
		render(
			<ErrorBoundary>
				<ThrowingComponent ShouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(ConsoleErrorSpy).toHaveBeenCalled();
	});

	it("catches errors in deeply nested children", () => {
		function DeepNested() {
			return (
				<div>
					<div>
						<ThrowingComponent ShouldThrow={true} />
					</div>
				</div>
			);
		}

		render(
			<ErrorBoundary>
				<DeepNested />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});
});
