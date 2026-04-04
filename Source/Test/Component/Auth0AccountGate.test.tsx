import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ─── Auth0 mock ───

const LoginWithRedirectMock = vi.fn();
const LogoutMock = vi.fn();

const Auth0State = {
	IsLoading: false,
	IsAuthenticated: false,
	Error: null as Error | null,
	User: null as Record<string, unknown> | null,
};

vi.mock("@auth0/auth0-react", () => ({
	useAuth0: () => ({
		isLoading: Auth0State.IsLoading,
		isAuthenticated: Auth0State.IsAuthenticated,
		error: Auth0State.Error,
		loginWithRedirect: LoginWithRedirectMock,
		logout: LogoutMock,
		user: Auth0State.User,
	}),
}));

// ─── react-i18next mock ───

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (Key: string, Options?: { defaultValue?: string }) =>
			Options?.defaultValue ?? Key,
	}),
}));

// ─── Layout/Header mock ───

vi.mock("../../Component/Layout/Header", () => ({
	Header: () => <header data-testid="header">Header</header>,
}));

// ─── UI/Button mock ───

vi.mock("../../Component/UI/Button", () => ({
	Button: ({
		children,
		onClick,
		variant,
		className,
		asChild,
		...Rest
	}: {
		children: React.ReactNode;
		onClick?: () => void;
		variant?: string;
		className?: string;
		asChild?: boolean;
		[Key: string]: unknown;
	}) => (
		<button onClick={onClick} data-variant={variant} {...Rest}>
			{children}
		</button>
	),
}));

import Auth0AccountGate from "../../Component/Dynamic/Auth0AccountGate";

beforeEach(() => {
	Auth0State.IsLoading = false;
	Auth0State.IsAuthenticated = false;
	Auth0State.Error = null;
	Auth0State.User = null;
	LoginWithRedirectMock.mockClear();
	LogoutMock.mockClear();
});

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe("Auth0AccountGate", () => {
	it("shows loading state when isLoading is true", () => {
		Auth0State.IsLoading = true;

		render(<Auth0AccountGate Route="signin" />);

		const LoadingText = screen.getByText("Loading...");

		expect(LoadingText).toBeInTheDocument();
		expect(screen.getByTestId("header")).toBeInTheDocument();
	});

	it("shows error state with retry button when error occurs", () => {
		Auth0State.Error = new Error("Connection failed");

		render(<Auth0AccountGate Route="signin" />);

		const ErrorText = screen.getByText(/Authentication error/);
		const ErrorMessage = screen.getByText(/Connection failed/);
		const RetryButton = screen.getByText("Try again");

		expect(ErrorText).toBeInTheDocument();
		expect(ErrorMessage).toBeInTheDocument();
		expect(RetryButton).toBeInTheDocument();
	});

	it("calls loginWithRedirect when retry button is clicked on error", async () => {
		Auth0State.Error = new Error("Connection failed");
		const User = UserEvent.setup();

		render(<Auth0AccountGate Route="signin" />);

		const RetryButton = screen.getByText("Try again");

		await User.click(RetryButton);

		expect(LoginWithRedirectMock).toHaveBeenCalledTimes(1);
	});

	it("renders authenticated user profile when isAuthenticated is true", () => {
		Auth0State.IsAuthenticated = true;
		Auth0State.User = {
			name: "Nikola Petrov",
			email: "nikola@playform.cloud",
			picture: "https://example.com/avatar.png",
			email_verified: true,
		};

		render(<Auth0AccountGate Route="signin" />);

		const DisplayName = screen.getByText("Nikola Petrov");
		const Email = screen.getByText("nikola@playform.cloud");
		const DashboardLink = screen.getByText("Go to Dashboard");
		const LogoutButton = screen.getByText("Logout");

		expect(DisplayName).toBeInTheDocument();
		expect(Email).toBeInTheDocument();
		expect(DashboardLink).toBeInTheDocument();
		expect(LogoutButton).toBeInTheDocument();
	});

	it("shows email not verified warning when email_verified is false", () => {
		Auth0State.IsAuthenticated = true;
		Auth0State.User = {
			name: "Test User",
			email: "test@example.com",
			email_verified: false,
		};

		render(<Auth0AccountGate Route="signin" />);

		const VerificationWarning = screen.getByText(
			"Email not verified. Check your inbox.",
		);

		expect(VerificationWarning).toBeInTheDocument();
	});

	it("uses nickname fallback when name equals email", () => {
		Auth0State.IsAuthenticated = true;
		Auth0State.User = {
			name: "test@example.com",
			email: "test@example.com",
			nickname: "TestNickname",
		};

		render(<Auth0AccountGate Route="signin" />);

		const DisplayName = screen.getByText("TestNickname");

		expect(DisplayName).toBeInTheDocument();
	});

	it("shows redirecting message when not authenticated and not loading", () => {
		Auth0State.IsLoading = false;
		Auth0State.IsAuthenticated = false;

		render(<Auth0AccountGate Route="signin" />);

		const RedirectingText = screen.getByText("Redirecting to sign in...");

		expect(RedirectingText).toBeInTheDocument();
	});

	it("calls loginWithRedirect on mount for signin route", () => {
		Auth0State.IsLoading = false;
		Auth0State.IsAuthenticated = false;

		render(<Auth0AccountGate Route="signin" />);

		expect(LoginWithRedirectMock).toHaveBeenCalledTimes(1);
		expect(LoginWithRedirectMock).toHaveBeenCalledWith(
			expect.objectContaining({
				authorizationParams: expect.any(Object),
			}),
		);
	});

	it("calls loginWithRedirect with screen_hint signup for signup route", () => {
		Auth0State.IsLoading = false;
		Auth0State.IsAuthenticated = false;

		render(<Auth0AccountGate Route="signup" />);

		expect(LoginWithRedirectMock).toHaveBeenCalledTimes(1);
		expect(LoginWithRedirectMock).toHaveBeenCalledWith(
			expect.objectContaining({
				authorizationParams: expect.objectContaining({
					screen_hint: "signup",
				}),
			}),
		);
	});

	it("does not redirect when isLoading is true", () => {
		Auth0State.IsLoading = true;

		render(<Auth0AccountGate Route="signin" />);

		expect(LoginWithRedirectMock).not.toHaveBeenCalled();
	});

	it("does not redirect when already authenticated", () => {
		Auth0State.IsAuthenticated = true;
		Auth0State.User = {
			name: "Existing User",
			email: "user@example.com",
		};

		render(<Auth0AccountGate Route="signin" />);

		expect(LoginWithRedirectMock).not.toHaveBeenCalled();
	});

	it("renders user avatar when picture is provided", () => {
		Auth0State.IsAuthenticated = true;
		Auth0State.User = {
			name: "Avatar User",
			email: "avatar@example.com",
			picture: "https://example.com/photo.jpg",
		};

		render(<Auth0AccountGate Route="signin" />);

		const AvatarImage = screen.getByRole("img");

		expect(AvatarImage).toHaveAttribute(
			"src",
			"https://example.com/photo.jpg",
		);
		expect(AvatarImage).toHaveAttribute("alt", "Avatar User");
	});

	it("calls logout when logout button is clicked", async () => {
		Auth0State.IsAuthenticated = true;
		Auth0State.User = {
			name: "Logout User",
			email: "logout@example.com",
		};
		const User = UserEvent.setup();

		render(<Auth0AccountGate Route="signin" />);

		const LogoutButton = screen.getByText("Logout");

		await User.click(LogoutButton);

		expect(LogoutMock).toHaveBeenCalledTimes(1);
	});
});
