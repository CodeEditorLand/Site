import { cleanup, render, screen } from "@testing-library/react";

import UserEvent from "@testing-library/user-event";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Auth0AccountGate from "../../Component/Dynamic/Auth0AccountGate";

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

// ─── Layout/Header and UI/Button are not mocked ───
//
// The gate owns no page chrome any more: the header, /KICKER, h1 and alternate
// action belong to the route's AuthShell, and the one action inside a report is
// a plain <button>. Mocking either module would hide a re-introduced dependency
// rather than exercise it.

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

		// The gate renders a report, not page chrome: a status line saying
		// what this state is, one sentence saying what happened, and the one
		// action actually available from it.
		expect(screen.getByRole("status")).toBeInTheDocument();

		// The label is a term from the state vocabulary, not a bespoke string
		// (`DesignSystem-Components.md` §7).
		expect(screen.getByText("STATUS: LOADING")).toBeInTheDocument();

		expect(
			screen.getByText(/Reading the session from the identity provider/),
		).toBeInTheDocument();

		expect(
			screen.getByRole("link", { name: "Back to the editor" }),
		).toHaveAttribute("href", "/");
	});

	it("shows error state with retry button when error occurs", () => {
		Auth0State.Error = new Error("Connection failed");

		render(<Auth0AccountGate Route="signin" />);

		const ErrorText = screen.getByText(
			/The identity provider did not return a session/,
		);

		const ErrorMessage = screen.getByText(/Connection failed/);

		const RetryButton = screen.getByText("RETRY");

		expect(ErrorText).toBeInTheDocument();

		expect(ErrorMessage).toBeInTheDocument();

		expect(RetryButton).toBeInTheDocument();
	});

	it("calls loginWithRedirect when retry button is clicked on error", async () => {
		Auth0State.Error = new Error("Connection failed");

		const User = UserEvent.setup();

		render(<Auth0AccountGate Route="signin" />);

		// The useEffect also fires loginWithRedirect on mount (not loading, not authenticated).
		// Clear the mock so we can assert only the retry button click.
		LoginWithRedirectMock.mockClear();

		const RetryButton = screen.getByText("RETRY");

		await User.click(RetryButton);

		expect(LoginWithRedirectMock).toHaveBeenCalledTimes(1);
	});

	it("renders authenticated user profile when isAuthenticated is true", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Nikola Petrov",
			email: "nikola@editor.land",
			picture: "https://example.com/avatar.png",
			email_verified: true,
		};

		render(<Auth0AccountGate Route="signin" />);

		const DisplayName = screen.getByText("Nikola Petrov");

		const Email = screen.getByText("nikola@editor.land");

		const DashboardLink = screen.getByText("Go to Dashboard");

		const LogoutButton = screen.getByText("Sign Out");

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

		const RedirectingText = screen.getByText(/The sign-in page opens next/);

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

	it("shows the registration-closed report instead of redirecting for signup while registration is disabled", () => {
		// Auth0AccountGate.tsx hardcodes RegistrationEnabled = false - signup
		// is feature-flagged off site-wide, so the component short-circuits
		// to the closed report instead of calling loginWithRedirect.
		Auth0State.IsLoading = false;

		Auth0State.IsAuthenticated = false;

		render(<Auth0AccountGate Route="signup" />);

		expect(LoginWithRedirectMock).not.toHaveBeenCalled();

		expect(screen.getByText("STATUS: UNAVAILABLE")).toBeInTheDocument();

		expect(
			screen.getByText(/Account creation is disabled/),
		).toBeInTheDocument();

		expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute(
			"href",
			"/Account/SignIn",
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

		const LogoutButton = screen.getByText("Sign Out");

		await User.click(LogoutButton);

		expect(LogoutMock).toHaveBeenCalledTimes(1);
	});
});
