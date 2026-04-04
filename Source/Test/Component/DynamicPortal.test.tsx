import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DynamicPortal } from "../../Component/Dynamic/DynamicPortal";
import type PortalContent from "../../Component/Dynamic/Interface/Content/Page/Portal.js";
import type TierContent from "../../Component/Dynamic/Interface/Content/Portal/Tier.js";

// ─── lucide-react mock (icons used by DynamicPortal → null) ───

vi.mock("lucide-react", () => {
	const Null = () => null;
	return {
		Activity: Null,
		AlertTriangle: Null,
		Blocks: Null,
		Box: Null,
		BrainCircuit: Null,
		Building2: Null,
		Check: Null,
		CheckCircle: Null,
		ChevronRight: Null,
		CirclePlay: Null,
		Cloud: Null,
		Code: Null,
		Cpu: Null,
		Database: Null,
		Download: Null,
		ExternalLink: Null,
		FileText: Null,
		Fingerprint: Null,
		FlaskConical: Null,
		FolderGit: Null,
		GitBranch: Null,
		GitCommit: Null,
		GitFork: Null,
		GitPullRequest: Null,
		Globe: Null,
		Hammer: Null,
		HardDrive: Null,
		Hash: Null,
		Info: Null,
		Key: Null,
		KeyRound: Null,
		Laptop: Null,
		Layers: Null,
		LifeBuoy: Null,
		Link2: Null,
		Lock: Null,
		Monitor: Null,
		Network: Null,
		Package: Null,
		PackageOpen: Null,
		Puzzle: Null,
		Radio: Null,
		RefreshCcw: Null,
		RefreshCw: Null,
		Rocket: Null,
		RotateCcw: Null,
		Search: Null,
		Server: Null,
		Settings: Null,
		Shield: Null,
		Sliders: Null,
		Terminal: Null,
		Timer: Null,
		Unplug: Null,
		UserPlus: Null,
		Users: Null,
		Wifi: Null,
		WifiOff: Null,
		Wrench: Null,
		Zap: Null,
	};
});

// ─── react-i18next mock ───

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (_Key: string, Options?: { defaultValue?: string }) =>
			Options?.defaultValue ?? _Key,
	}),
}));

// ─── DynamicInput mock ───

vi.mock("../../Component/Dynamic/DynamicInput", () => ({
	DynamicInput: ({
		Content,
		Id,
	}: {
		Content: {
			Label?: string;
			Placeholder?: string;
			OnChange?: (Value: string) => void;
		};
		Id: string;
	}) => (
		<input
			id={Id}
			placeholder={Content.Placeholder}
			aria-label={Content.Label}
			onChange={(Event) => Content.OnChange?.(Event.target.value)}
		/>
	),
}));

// ─── UI mocks ───

vi.mock("../../Component/UI/Button", () => ({
	Button: ({
		children,
		onClick,
		type,
		...Rest
	}: {
		children: React.ReactNode;
		onClick?: () => void;
		type?: string;
		[Key: string]: unknown;
	}) => (
		<button type={(type as "button" | "submit") ?? "button"} onClick={onClick}>
			{children}
		</button>
	),
}));

vi.mock("../../Component/UI/Card", () => ({
	Card: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CardContent: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CardHeader: ({
		children,
		className,
	}: {
		children: React.ReactNode;
		className?: string;
	}) => <div className={className}>{children}</div>,
	CardTitle: ({
		children,
		className,
	}: {
		children: React.ReactNode;
		className?: string;
	}) => <h3 className={className}>{children}</h3>,
}));

vi.mock("../../Component/UI/IconTooltip.js", () => ({
	IconTooltip: ({
		Label,
		children,
	}: {
		Label?: string;
		children?: React.ReactNode;
	}) => <span aria-label={Label}>{children}</span>,
}));

// ─── Noise module mocks (dynamic imports in useEffect) ───

vi.mock("../../Function/Noise/Attention.js", () => ({
	default: { ApplyToElement: vi.fn() },
}));

vi.mock("../../Function/Noise/Staccato.js", () => ({
	default: { Start: vi.fn(), Stop: vi.fn(), SeedSelector: vi.fn() },
}));

// ─── window.matchMedia stub ───

beforeEach(() => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((Query: string) => ({
			matches: false,
			media: Query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});

	Object.defineProperty(window, "location", {
		writable: true,
		value: { href: "" },
	});
});

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

// ─── Mock data ───

const MockTierBase = (
	Identifier: TierContent["Identifier"],
	Title: string,
	Color: string,
): TierContent => ({
	Identifier,
	Title,
	Subtitle: `${Title} subtitle`,
	Color,
	BorderColor: Color,
	Icon: "Shield",
	Feature: [],
	Capability: [],
});

const MockContent: PortalContent = {
	Title: "Portal",
	Subtitle: "Choose your plan",
	Cloud: MockTierBase("Cloud", "Cloud", "#3b82f6"),
	Provider: MockTierBase("Provider", "Provider", "#8b5cf6"),
	LocalFirst: MockTierBase("LocalFirst", "Local-First", "#f97316"),
	Enterprise: MockTierBase("Enterprise", "Enterprise", "#374151"),
};

// ─── Tests ───

describe("DynamicPortal — Enterprise SSO tier", () => {
	it("renders Auth0 Organization ID input", () => {
		render(<DynamicPortal Content={MockContent} />);

		const OrgInput = screen.getByPlaceholderText("org_xxxxxxxxxxxxxxxx");

		expect(OrgInput).toBeInTheDocument();
	});

	it("renders Okta domain input", () => {
		render(<DynamicPortal Content={MockContent} />);

		const OktaInput = screen.getByPlaceholderText("your-org.okta.com");

		expect(OktaInput).toBeInTheDocument();
	});

	it("renders Continue with Okta button", () => {
		render(<DynamicPortal Content={MockContent} />);

		const OktaButton = screen.getByText("Continue with Okta");

		expect(OktaButton).toBeInTheDocument();
	});

	it("renders Okta brand SVG in the Okta button", () => {
		render(<DynamicPortal Content={MockContent} />);

		const OktaImage = screen.getByAltText("Okta");

		expect(OktaImage).toBeInTheDocument();
		expect(OktaImage).toHaveAttribute("src", "/Image/Okta.svg");
	});

	it("renders Continue with Azure AD button", () => {
		render(<DynamicPortal Content={MockContent} />);

		const AzureButton = screen.getByText("Continue with Azure AD");

		expect(AzureButton).toBeInTheDocument();
	});

	it("renders Continue with SAML button", () => {
		render(<DynamicPortal Content={MockContent} />);

		const SamlButton = screen.getByText("Continue with SAML");

		expect(SamlButton).toBeInTheDocument();
	});

	it("clicking Okta button sets location.href with connection=okta", async () => {
		const User = UserEvent.setup();

		render(<DynamicPortal Content={MockContent} />);

		const OktaButton = screen.getByText("Continue with Okta");

		await User.click(OktaButton);

		expect(window.location.href).toContain("/Account/SignIn");
		expect(window.location.href).toContain("connection=okta");
	});

	it("clicking Okta button includes organization param when org ID is filled", async () => {
		const User = UserEvent.setup();

		render(<DynamicPortal Content={MockContent} />);

		const OrgInput = screen.getByPlaceholderText("org_xxxxxxxxxxxxxxxx");

		await User.type(OrgInput, "org_abc123");

		const OktaButton = screen.getByText("Continue with Okta");

		await User.click(OktaButton);

		expect(window.location.href).toContain("connection=okta");
		expect(window.location.href).toContain("organization=org_abc123");
	});

	it("does not render Enterprise tier when Enterprise content is absent", () => {
		const ContentWithoutEnterprise: PortalContent = {
			...MockContent,
			Enterprise: undefined,
		};

		render(<DynamicPortal Content={ContentWithoutEnterprise} />);

		expect(screen.queryByText("Continue with Okta")).not.toBeInTheDocument();
	});
});
