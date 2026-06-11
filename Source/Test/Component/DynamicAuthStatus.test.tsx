import { cleanup, render, screen } from "@testing-library/react";

import UserEvent from "@testing-library/user-event";

import React from "react";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import DynamicAuthStatus from "../../Component/Dynamic/DynamicAuthStatus";

// ─── Auth0 mock ───

const LogoutMock = vi.fn();

const Auth0State = {
	IsLoading: false,

	IsAuthenticated: false,

	User: null as Record<string, unknown> | null,
};

vi.mock("@auth0/auth0-react", () => ({
	useAuth0: () => ({
		isLoading: Auth0State.IsLoading,
		isAuthenticated: Auth0State.IsAuthenticated,
		user: Auth0State.User,
		logout: LogoutMock,
	}),
}));

// ─── react-i18next mock ───

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (Key: string, Options?: { defaultValue?: string }) =>
			Options?.defaultValue ?? Key,
	}),
}));

// ─── UI mocks ───

vi.mock("../../Component/UI/Avatar", () => ({
	Avatar: ({
		children,
		className,
	}: {
		children: React.ReactNode;

		className?: string;
	}) => (
		<div data-testid="avatar" className={className}>
			{children}
		</div>
	),
	AvatarImage: ({ src, alt }: { src?: string; alt?: string }) => (
		<img data-testid="avatar-image" src={src} alt={alt} />
	),
	AvatarFallback: ({
		children,
		className,
	}: {
		children: React.ReactNode;

		className?: string;
	}) => (
		<span data-testid="avatar-fallback" className={className}>
			{children}
		</span>
	),
}));

vi.mock("../../Component/UI/DropdownMenu", () => ({
	DropdownMenu: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="dropdown-menu">{children}</div>
	),
	DropdownMenuTrigger: ({
		children,
		asChild,
	}: {
		children: React.ReactNode;

		asChild?: boolean;
	}) => <div data-testid="dropdown-trigger">{children}</div>,
	DropdownMenuContent: ({
		children,
		align,
		className,
	}: {
		children: React.ReactNode;

		align?: string;

		className?: string;
	}) => (
		<div data-testid="dropdown-content" className={className}>
			{children}
		</div>
	),
	DropdownMenuItem: ({
		children,
		onClick,
		asChild,
		variant,
		...Rest
	}: {
		children: React.ReactNode;

		onClick?: () => void;

		asChild?: boolean;

		variant?: string;

		[Key: string]: unknown;
	}) => (
		<div
			data-testid="dropdown-item"
			onClick={onClick}
			data-variant={variant}
			{...Rest}
		>
			{children}
		</div>
	),
	DropdownMenuSeparator: () => <hr data-testid="dropdown-separator" />,
}));

vi.mock("../../Component/UI/Skeleton", () => ({
	Skeleton: ({
		className,
		...Rest
	}: {
		className?: string;

		[Key: string]: unknown;
	}) => <div data-testid="skeleton" className={className} {...Rest} />,
}));

beforeEach(() => {
	Auth0State.IsLoading = false;

	Auth0State.IsAuthenticated = false;

	Auth0State.User = null;

	LogoutMock.mockClear();
});

afterEach(() => {
	cleanup();

	vi.restoreAllMocks();
});

describe("DynamicAuthStatus", () => {
	it("shows loading skeleton when isLoading is true", () => {
		Auth0State.IsLoading = true;

		render(<DynamicAuthStatus />);

		const SkeletonElement = screen.getByTestId("skeleton");

		expect(SkeletonElement).toBeInTheDocument();

		expect(SkeletonElement).toHaveAttribute("aria-label", "Loading\u2026");
	});

	it("shows Sign In link when not authenticated", () => {
		Auth0State.IsAuthenticated = false;

		Auth0State.User = null;

		render(<DynamicAuthStatus />);

		const SignInLink = screen.getByText("Sign In");

		expect(SignInLink).toBeInTheDocument();

		expect(SignInLink.closest("a")).toHaveAttribute(
			"href",

			"/Account/SignIn",
		);
	});

	it("uses custom SignInHref when provided", () => {
		Auth0State.IsAuthenticated = false;

		Auth0State.User = null;

		render(<DynamicAuthStatus SignInHref="/Custom/SignIn" />);

		const SignInLink = screen.getByText("Sign In");

		expect(SignInLink.closest("a")).toHaveAttribute(
			"href",

			"/Custom/SignIn",
		);
	});

	it("shows user avatar when authenticated", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Nikola Petrov",
			email: "nikola@editor.land",
			picture: "https://example.com/avatar.png",
		};

		render(<DynamicAuthStatus />);

		const AvatarImage = screen.getByTestId("avatar-image");

		expect(AvatarImage).toHaveAttribute(
			"src",

			"https://example.com/avatar.png",
		);
	});

	it("shows initials fallback when authenticated", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Nikola Petrov",
			email: "nikola@editor.land",
		};

		render(<DynamicAuthStatus />);

		const Fallback = screen.getByTestId("avatar-fallback");

		expect(Fallback).toHaveTextContent("NI");
	});

	it("renders Dashboard link in dropdown when authenticated", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Test User",
			email: "test@example.com",
		};

		render(<DynamicAuthStatus />);

		const DashboardLink = screen.getByText("Dashboard");

		expect(DashboardLink).toBeInTheDocument();

		expect(DashboardLink.closest("a")).toHaveAttribute(
			"href",

			"/Dashboard",
		);
	});

	it("renders Account link in dropdown when authenticated", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Test User",
			email: "test@example.com",
		};

		render(<DynamicAuthStatus />);

		const AccountLink = screen.getByText("Account");

		expect(AccountLink).toBeInTheDocument();

		expect(AccountLink.closest("a")).toHaveAttribute("href", "/Account");
	});

	it("renders Sign Out item in dropdown when authenticated", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Test User",
			email: "test@example.com",
		};

		render(<DynamicAuthStatus />);

		const SignOutItem = screen.getByText("Sign Out");

		expect(SignOutItem).toBeInTheDocument();
	});

	it("calls logout when Sign Out is clicked", async () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Test User",
			email: "test@example.com",
		};

		const User = UserEvent.setup();

		render(<DynamicAuthStatus />);

		const SignOutItem = screen.getByText("Sign Out");

		await User.click(SignOutItem);

		expect(LogoutMock).toHaveBeenCalledTimes(1);
	});

	it("uses nickname fallback when name equals email", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "test@example.com",
			email: "test@example.com",
			nickname: "TestNick",
		};

		render(<DynamicAuthStatus />);

		const Fallback = screen.getByTestId("avatar-fallback");

		// DisplayName is "TestNick", initials are "TE"
		expect(Fallback).toHaveTextContent("TE");
	});

	it("uses email prefix when no name or nickname", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			email: "developer@example.com",
		};

		render(<DynamicAuthStatus />);

		const Fallback = screen.getByTestId("avatar-fallback");

		// DisplayName is "developer", initials are "DE"
		expect(Fallback).toHaveTextContent("DE");
	});

	it("uses custom DashboardHref and AccountHref when provided", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Custom User",
			email: "custom@example.com",
		};

		render(
			<DynamicAuthStatus
				DashboardHref="/Custom/Dashboard"
				AccountHref="/Custom/Account"
			/>,
		);

		const DashboardLink = screen.getByText("Dashboard");

		const AccountLink = screen.getByText("Account");

		expect(DashboardLink.closest("a")).toHaveAttribute(
			"href",

			"/Custom/Dashboard",
		);

		expect(AccountLink.closest("a")).toHaveAttribute(
			"href",

			"/Custom/Account",
		);
	});

	it("renders user menu button with aria-label", () => {
		Auth0State.IsAuthenticated = true;

		Auth0State.User = {
			name: "Accessible User",
			email: "a11y@example.com",
		};

		render(<DynamicAuthStatus />);

		const MenuButton = screen.getByRole("button", { name: "User menu" });

		expect(MenuButton).toBeInTheDocument();
	});
});
